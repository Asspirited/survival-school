# Character Learning — Design Document
# SS-154 — Per-user encounter history injected into character prompts
# Status: Design v1
# Created: 2026-03-30
# Depends on: SS-152 (User Reputation — encounter log + tiers)
# Session A (Design + Docs + Domain) — no worker.js or HTML changes

---

## What Is This?

The system that makes individual characters remember THIS user.

SS-152 gives the panel awareness that you're a returning user.
SS-154 gives each CHARACTER their own memory of you.

Bear doesn't just know "this person has been here before." Bear knows
"this person claimed a seagull was a credible threat. I've been to
Brighton since. They were right."

The difference:
- **SS-152 (reputation):** "This is a REGULAR user (5 encounters)."
- **SS-154 (character learning):** "Bear has met this user 3 times.
  Last time, Bear's wound fired. Bear is wary of this user."

---

## The Problem It Solves

SS-152 tells characters you're a regular. But it doesn't tell Bear
specifically what happened between Bear and you. All characters get
the same reputation injection.

With character learning:
- Bear remembers the pigeon incident and is defensive about it
- Fox remembers that you didn't listen last time
- Gordon remembers you were there when the snake bit him again
- Attenborough adjusts his narration: "Our subject, a known quantity..."
- Morrison doesn't remember anything (this IS his character learning)

---

## Domain Model

Character learning is computed FROM the existing SS-152 encounter log.
No new data store. It's a view over the same data, filtered per character.

```
CharacterMemory {
  charId:              string          // the character doing the remembering
  encountersWith:      number          // how many times this character has been
                                       // in a panel with this user
  lastEncounter:       Encounter | null // most recent encounter with this user
  highlightsInvolved:  EncounterHighlight[] // highlights where this charId was the actor
  sentiment:           CharacterSentiment   // computed tone toward this user
  callbackLine:        string | null   // pre-formatted one-liner for prompt injection
}

// CharacterSentiment — how the character feels about this user
// Computed from encounter history, not stored
CharacterSentiment:
  'neutral'    — no history, or history is unremarkable
  'wary'       — character's wound fired in a previous encounter with this user
  'familiar'   — 3+ encounters, no wound fired
  'grudging'   — character's lie was exposed by/in front of this user
  'warm'       — character had a sacred exchange in this user's presence
  'oblivious'  — character doesn't remember (Morrison, Jim Carrey)
```

---

## How Character Learning Works

### Step 1: Filter encounters per character

From the SS-152 encounter log, extract encounters where this charId
was present. Already stored — `encounter.charIds` contains who was there.

```javascript
function getCharacterEncounters(reputation, charId) {
  if (!reputation || !reputation.encounters) return [];
  return reputation.encounters.filter(e =>
    e.charIds && e.charIds.includes(charId)
  );
}
```

### Step 2: Compute character sentiment

Based on what happened in those encounters:

```javascript
function computeCharacterSentiment(charId, encounters) {
  // Some characters are always oblivious
  const OBLIVIOUS_CHARS = ['morrison', 'carrey'];
  if (OBLIVIOUS_CHARS.includes(charId)) return 'oblivious';

  if (encounters.length === 0) return 'neutral';

  const highlights = encounters.flatMap(e => e.highlights || [])
    .filter(h => h.charId === charId);

  // Wound fired = wary
  if (highlights.some(h => h.type === 'wound_fired')) return 'wary';

  // Lie exposed = grudging
  if (highlights.some(h => h.type === 'lie_exposed')) return 'grudging';

  // Sacred exchange = warm
  if (highlights.some(h => h.type === 'sacred_exchange')) return 'warm';

  // 3+ encounters with nothing dramatic = familiar
  if (encounters.length >= 3) return 'familiar';

  return 'neutral';
}
```

### Step 3: Build callback line

A one-liner the character can reference naturally:

```javascript
function buildCharacterCallback(charId, encounters, sentiment) {
  if (sentiment === 'oblivious') return null;
  if (encounters.length === 0) return null;

  const last = encounters[encounters.length - 1];
  const char = CHARACTERS[charId];
  if (!char) return null;

  if (sentiment === 'wary') {
    const woundHighlight = encounters
      .flatMap(e => e.highlights || [])
      .find(h => h.charId === charId && h.type === 'wound_fired');
    return `${char.name} remembers something painful happened last time this user was present. Be guarded.`;
  }

  if (sentiment === 'grudging') {
    return `${char.name} was caught in a lie in front of this user before. Slightly more careful with claims.`;
  }

  if (sentiment === 'warm') {
    return `${char.name} had a genuine moment with this user present. Slightly warmer baseline.`;
  }

  if (sentiment === 'familiar') {
    return `${char.name} has seen this user ${encounters.length} times. Less preamble, more shorthand.`;
  }

  return null;
}
```

### Step 4: Build per-character injection

```javascript
function buildCharacterLearningInjection(reputation, panelCharIds) {
  if (!reputation || !reputation.encounters || reputation.encounters.length === 0) return '';

  const memories = panelCharIds.map(charId => {
    const encounters = getCharacterEncounters(reputation, charId);
    if (encounters.length === 0) return null;

    const sentiment = computeCharacterSentiment(charId, encounters);
    const callback = buildCharacterCallback(charId, encounters, sentiment);
    if (!callback) return null;

    return { charId, encounterCount: encounters.length, sentiment, callback };
  }).filter(Boolean);

  if (memories.length === 0) return '';

  const lines = ['CHARACTER-SPECIFIC MEMORY (SS-154) — characters remember this user individually:'];
  for (const m of memories) {
    lines.push(`  ${m.charId} [${m.sentiment}, ${m.encounterCount} prior]: ${m.callback}`);
  }
  lines.push('Rule: Character memories are subtle. No "welcome back" speeches. The memory shows in HOW they talk, not THAT they remember.');

  return lines.join('\n');
}
```

---

## Sentiment × Character Comedy

### Wary (wound fired before)
**Bear:** Over-corrects. Avoids the topic that triggered him last time.
If the user's scenario is anywhere near the same topic, Bear steers away
harder than necessary. The avoidance IS the tell.

**Ray:** No change. Ray doesn't get wary. Ray adjusts nothing. If his
wound fired, that's the user's problem, not Ray's.

**Fox:** Direct about it. "Last time you were here, we went somewhere
I'd rather not go again. So don't."

**Morrison:** Oblivious. Cannot be wary. May reference the wound
topic as if it's his own dream.

### Grudging (lie exposed)
**Bear:** More careful with specific claims. Still confident. But pauses
before the big ones. "I've done this — and yes, I HAVE done this."

**McNab/Ryan:** More entrenched. Being caught makes them double down,
not retreat. "I stand by what I said. Regardless of what HE claims."

### Warm (sacred exchange witnessed)
**Attenborough:** The bookend narration softens 2%. Almost imperceptible.
"Our subject returns. We recall them fondly. We should not."

**Fox + Billy:** The warmth shows in NOT roasting the user immediately.
A beat of recognition before the normal dynamic kicks in.

### Oblivious
**Morrison:** Has no memory. May say something that accidentally maps
to a previous encounter: "I dreamed about a pigeon." He didn't dream
about a pigeon. But the user had a pigeon encounter. Coincidence.
Comedy from false pattern-matching.

**Jim Carrey:** Too busy being three characters at once to remember
any previous user. May occasionally lock eyes with the user and say
something weirdly specific that sounds like memory but is just Carrey
being Carrey.

---

## Integration With SS-152

Character learning is a LAYER on top of reputation, not a replacement.

The injection order in a system prompt:
1. **Reputation injection** (SS-152): tier, overall encounter count, recent summaries
2. **Character learning injection** (SS-154): per-character sentiment and callbacks
3. **Escalation injection** (SS-147): pools, wounds, axes
4. **Composure injection** (SS-100): current composure state

This means a VETERAN user with Bear in the panel gets:
- "This user is VETERAN (12 encounters)" — reputation
- "Bear [wary, 8 prior]: remembers something painful" — character learning
- "Bear's escalation pools [round 1]" — escalation
- "Bear composure: CONTROLLED" — composure

The character has full context: who the user is, how Bear feels about
them, what Bear can draw from this round, and Bear's current emotional
state. All four layers.

---

## What Session A Builds Now (characters.js)

1. `getCharacterEncounters(reputation, charId)` — filter encounters
2. `computeCharacterSentiment(charId, encounters)` — derive sentiment
3. `buildCharacterCallback(charId, encounters, sentiment)` — one-liner
4. `buildCharacterLearningInjection(reputation, panelCharIds)` — full injection
5. `OBLIVIOUS_CHARACTERS` — list of chars that never remember
6. Domain tests for all functions

**What Session A does NOT build:**
- Worker prompt wiring (Session B)
- Client-side encounter logging changes (Session B)
- HTML changes (Session B)

---

## What Does NOT Ship in v1

- **Per-character tone presets.** v1 uses the generic sentiment system.
  Character-specific tone adjustments (Bear avoids topic, Fox is direct)
  are prompt engineering, done when Session B wires this in.
- **Encounter decay.** Old encounters never expire in v1. If needed
  later, a sliding window (last 20 encounters only) is trivial.
- **Character grudges.** Characters don't hold multi-session grudges
  beyond the sentiment. "Fox has been wary of this user for 6 sessions"
  is v2. v1 just says "wary."
