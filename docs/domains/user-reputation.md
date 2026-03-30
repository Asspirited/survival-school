# User Reputation & History — Design Document
# SS-152 — Track returning users, differentiate from first-timers
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain) — no worker.js or HTML changes

---

## What Is This?

The system that makes the panel remember you.

Right now every user gets the same experience every time. The panel has
no idea if you've been here before, which characters you've met, what
scenarios you survived, or what wounds fired. A first-time visitor and
someone on their 20th panel are identical.

User reputation changes that. Characters recognise returning users.
They reference your past predicaments. They escalate familiarity.
"Oh, it's you again. Weren't you the one with the pigeon?"

This is the difference between a toy and a world.

---

## The Problem It Solves

1. **No repeat depth.** Returning users get zero acknowledgement.
2. **No character memory.** Characters can't callback to user history.
3. **No progression.** There's no sense of "you've been through this before."
4. **No differentiation.** Power users and tourists get the same prompts.

The World Log (SS-151) tracks what happened in the panel world.
User reputation tracks what happened to THIS user specifically.
They're complementary — World Log is shared canon, reputation is personal.

---

## Design Principles

### 1. No login. No accounts. No PII.
Identity is a random UUID stored in browser localStorage. The user never
sees it. There's no sign-up, no email, no name. If they clear their browser,
they start fresh. That's fine.

### 2. localStorage first, server optional.
All reputation data lives in the browser. Zero infrastructure. Zero cost.
The worker receives a reputation summary as part of the request payload —
it never stores user data. If we later want cross-device persistence
(Cloudflare KV), the schema is ready, but it's not needed to ship v1.

### 3. Inject, don't gate.
Reputation enriches prompts — it doesn't gate content. A returning user
sees the same features. Characters just treat them differently. No
unlockables. No progression walls. No gamification traps.

### 4. Graceful absence.
If there's no reputation data (new user, cleared storage, different device),
everything works exactly as it does today. Reputation is additive only.

---

## Domain Model

```
UserReputation {
  userId:      string          // random UUID, generated on first visit
  created:     ISO 8601        // first visit timestamp
  encounters:  Encounter[]     // append-only log of panel interactions
  stats:       ReputationStats // computed summary for prompt injection
}

Encounter {
  id:          string          // enc-001, enc-002, etc.
  timestamp:   ISO 8601        // when this encounter happened
  feature:     string          // 'ive-had-worse' | 'in-my-defence' | 'the-alibi' | etc.
  room:        string | null   // room slug if Doors feature, null for standalone
  charIds:     string[]        // characters present in this panel
  protagonist: string | null   // protagonist charId if applicable
  scenario:    string          // one-line summary of what the user submitted
  chips:       string[]        // chip IDs the user selected (if any)
  rounds:      number          // how many rounds the multi-turn conversation lasted
  highlights:  EncounterHighlight[]  // notable events during this encounter
}

EncounterHighlight {
  type:        HighlightType   // what happened
  charId:      string          // who it happened to
  detail:      string          // one-line description
}

// HighlightType enum:
// 'wound_fired'        — a character's wound was triggered
// 'sacred_exchange'    — a sacred exchange occurred between two characters
// 'composure_gone'     — a character hit composure tier 'gone'
// 'morrison_appeared'  — Morrison interrupted
// 'temporal_lens'      — a deceased character's ghost mechanic fired
// 'lie_exposed'        — a character's lie was called out
// 'escalation_peak'    — a character hit their deepest pool item
// 'catchphrase_used'   — an invented catchphrase was deployed
// 'ethical_override'   — Packham or Cody override fired

ReputationStats {
  totalEncounters:     number          // how many panels this user has done
  uniqueCharacters:    string[]        // charIds they've encountered (deduped)
  favouriteFeature:    string | null   // most-used feature slug
  lastVisit:           ISO 8601        // most recent encounter timestamp
  daysSinceFirst:      number          // computed: days since userId created
  woundsSeen:          string[]        // character wounds they've witnessed
  sacredExchangesSeen: string[]        // sacred exchanges they've been present for
  notableCallbacks:    string[]        // pre-formatted callback lines for injection
}
```

---

## Reputation Tiers

Not gamification. Not badges. Just prompt context.

The tier determines how characters talk to the user — not what content
they see. All content is always available. Tiers shape tone, not access.

```
TIER 0: STRANGER (0 encounters)
  - Default experience. No reputation injection.
  - Characters address "you" generically.
  - This is what everyone gets today.

TIER 1: FAMILIAR (1-3 encounters)
  - Characters may note "you've been here before" if charIds overlap
    with previous encounters.
  - No specific callbacks — just awareness of return visits.
  - Injection: "This user has visited [N] times. They have previously
    encountered [charId list]. Do not explicitly welcome them back —
    just treat them with slightly less preamble than a total stranger."

TIER 2: REGULAR (4-9 encounters)
  - Characters reference the user's past scenarios by name.
  - "Weren't you the one who got stuck in IKEA?"
  - Injection includes 1-2 specific encounter summaries.
  - Characters who were present in previous encounters act like they
    remember. Characters who weren't may have "heard about" the user
    from the others.

TIER 3: VETERAN (10+ encounters)
  - Characters have opinions about the user.
  - "Oh god, not you again. Last time you were here, Fox had to be
    physically restrained."
  - Injection includes up to 3 encounter summaries + highlight callbacks.
  - Characters may pre-judge the user's predicament: "Let me guess —
    it's another bird, isn't it?"
  - Familiarity breeds contempt (Bear), affection (Irwin memorial
    references), wariness (characters whose wounds fired last time).
```

---

## How Reputation Reaches the Prompt

### Client Side (Session A territory — characters.js)

```javascript
// In characters.js — Session A can build this

function buildReputationInjection(reputation) {
  if (!reputation || reputation.stats.totalEncounters === 0) return '';

  const tier = getReputationTier(reputation.stats.totalEncounters);
  const lines = [];

  // Tier awareness
  lines.push(`USER REPUTATION TIER: ${tier.name} (${reputation.stats.totalEncounters} prior encounters)`);

  // Characters they know
  if (reputation.stats.uniqueCharacters.length > 0) {
    lines.push(`Characters previously encountered: ${reputation.stats.uniqueCharacters.join(', ')}`);
  }

  // Recent encounter callbacks (Tier 2+)
  if (tier.level >= 2 && reputation.encounters.length > 0) {
    const recent = reputation.encounters.slice(-3);
    lines.push('Recent encounters this user has had:');
    for (const enc of recent) {
      lines.push(`  - ${enc.feature}: "${enc.scenario}" with ${enc.charIds.join(', ')} (${enc.rounds} rounds)`);
    }
  }

  // Highlight callbacks (Tier 3)
  if (tier.level >= 3 && reputation.stats.notableCallbacks.length > 0) {
    lines.push('Notable events from past encounters (characters may reference these):');
    for (const cb of reputation.stats.notableCallbacks.slice(0, 5)) {
      lines.push(`  - ${cb}`);
    }
  }

  // Tone instruction
  lines.push(tier.toneInstruction);

  return lines.join('\n');
}

function getReputationTier(count) {
  if (count >= 10) return {
    level: 3, name: 'VETERAN',
    toneInstruction: 'This user is a regular. Characters know them. Treat with familiarity — affection, contempt, or wariness depending on character. Reference their past encounters naturally. Do NOT explicitly say "welcome back" — just act like you know them.'
  };
  if (count >= 4) return {
    level: 2, name: 'REGULAR',
    toneInstruction: 'This user has been here a few times. Characters who were in previous encounters vaguely remember them. Keep it subtle — a half-recognition, not a reunion.'
  };
  if (count >= 1) return {
    level: 1, name: 'FAMILIAR',
    toneInstruction: 'This user has visited before. Slightly less preamble than a stranger, but no specific callbacks. Just a hint of "you again."'
  };
  return { level: 0, name: 'STRANGER', toneInstruction: '' };
}
```

### Client Side — Encounter Logging

```javascript
// After each panel response, the client appends to localStorage

function logEncounter(feature, charIds, protagonist, scenario, chips, rounds, highlights) {
  const rep = getReputation();
  const encounter = {
    id: `enc-${String(rep.encounters.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    feature,
    room: feature.startsWith('room-') ? feature : null,
    charIds,
    protagonist: protagonist || null,
    scenario,
    chips: chips || [],
    rounds: rounds || 1,
    highlights: highlights || []
  };
  rep.encounters.push(encounter);
  rep.stats = computeStats(rep);
  localStorage.setItem('ss-reputation', JSON.stringify(rep));
}

function getReputation() {
  const stored = localStorage.getItem('ss-reputation');
  if (stored) return JSON.parse(stored);
  return {
    userId: crypto.randomUUID(),
    created: new Date().toISOString(),
    encounters: [],
    stats: { totalEncounters: 0, uniqueCharacters: [], favouriteFeature: null,
             lastVisit: null, daysSinceFirst: 0, woundsSeen: [], sacredExchangesSeen: [],
             notableCallbacks: [] }
  };
}

function computeStats(rep) {
  const allChars = [...new Set(rep.encounters.flatMap(e => e.charIds))];
  const featureCounts = {};
  for (const e of rep.encounters) {
    featureCounts[e.feature] = (featureCounts[e.feature] || 0) + 1;
  }
  const fav = Object.entries(featureCounts).sort((a, b) => b[1] - a[1])[0];

  // Build notable callbacks from highlights
  const callbacks = rep.encounters
    .flatMap(e => e.highlights.map(h => ({
      ...h,
      feature: e.feature,
      scenario: e.scenario,
      timestamp: e.timestamp
    })))
    .filter(h => ['wound_fired', 'sacred_exchange', 'composure_gone', 'morrison_appeared'].includes(h.type))
    .slice(-10)
    .map(h => {
      switch (h.type) {
        case 'wound_fired': return `${h.charId}'s wound fired during "${h.detail}"`;
        case 'sacred_exchange': return `Sacred exchange: ${h.detail}`;
        case 'composure_gone': return `${h.charId} lost composure completely during "${h.detail}"`;
        case 'morrison_appeared': return `Morrison appeared uninvited: "${h.detail}"`;
        default: return h.detail;
      }
    });

  return {
    totalEncounters: rep.encounters.length,
    uniqueCharacters: allChars,
    favouriteFeature: fav ? fav[0] : null,
    lastVisit: rep.encounters.length > 0
      ? rep.encounters[rep.encounters.length - 1].timestamp : null,
    daysSinceFirst: Math.floor(
      (Date.now() - new Date(rep.created).getTime()) / 86400000),
    woundsSeen: [...new Set(
      rep.encounters.flatMap(e => e.highlights)
        .filter(h => h.type === 'wound_fired')
        .map(h => h.charId))],
    sacredExchangesSeen: [...new Set(
      rep.encounters.flatMap(e => e.highlights)
        .filter(h => h.type === 'sacred_exchange')
        .map(h => h.detail))],
    notableCallbacks: callbacks
  };
}
```

---

## Integration Points

### With World Log (SS-151)
World Log tracks canonical events across ALL users.
Reputation tracks THIS user's personal encounters.
They don't overlap — World Log is the panel's shared memory,
reputation is the user's personal relationship with the panel.

When both are live:
- World Log injection: "Recently in the panel world: Gordon was bitten again."
- Reputation injection: "This user was there when Gordon was bitten."

The combination is powerful: characters know the event (World Log)
AND know this user witnessed it (reputation). "You were there when
Gordon... you SAW what happened. Don't pretend you didn't."

### With Escalation Profiles (SS-147)
Characters whose wounds fired in a previous encounter with this user
may be more guarded. "Last time you were here, someone brought up
the bathtub. We're not doing that again." (Morrison wound = The Doors,
Paris, bathtub, 27.)

### With Composure Engine (SS-100)
A veteran user may push characters to lower composure faster — the
panel knows this user causes trouble. Starting composure could be
adjusted down by 1 tier for characters who've had difficult encounters
with this user before.

### With RegisterContract (SS-156)
When Rooms become data-driven, the encounter log naturally extends to
new Rooms without code changes. The Encounter schema already tracks
`feature` and `room` — any new RegisterContract room is automatically
tracked.

---

## What Session A Can Build Now (characters.js)

1. `getReputationTier(count)` — tier lookup
2. `buildReputationInjection(reputation)` — prompt injection builder
3. `computeStats(rep)` — stats calculator
4. Domain tests for all three functions

These live in characters.js alongside buildEscalationInjection,
buildComposureInjection, etc. Same pattern. Session B wires them
into the worker and HTML pages later.

**What Session A does NOT build:**
- localStorage read/write (that's client-side HTML — Session B)
- Worker route changes (Session B)
- Encounter logging from API responses (Session B)

---

## What Does NOT Ship in v1

- **Cross-device sync.** localStorage only. Different device = new user.
  Cloudflare KV integration is a v2 item if there's demand.
- **Explicit reputation display.** No "You've been here 12 times" counter.
  Reputation is felt, not shown. Characters act differently. The user
  notices without being told.
- **Opt-out.** Clearing localStorage resets reputation. No UI needed.
- **Social reputation.** No leaderboards, no "most survived" lists.
  This is personal, not competitive.
- **Encounter editing.** Users can't curate their history. The log
  is append-only from the client's perspective.

---

## Comedy Opportunities

The real value is in what characters DO with the reputation:

**Bear (Tier 3):** "Right. You. The one who claimed a seagull was
a credible threat. I've thought about that. I've been to Brighton
since. You were right."

**Ray (Tier 2):** Doesn't acknowledge the user explicitly. Just
treats the scenario with less preamble. Gets to the point faster.
"You know the drill."

**Fox (Tier 3):** "Last time you were here, I told you exactly
what to do. You're back. Which means you didn't listen."

**Morrison (any tier):** Morrison doesn't recognise anyone. He barely
recognises himself. But he might reference the user's scenario
as if it were a dream he had: "I dreamed about pigeons last night.
Someone was being attacked. It wasn't a dream, was it?"

**Attenborough (Tier 3):** The bookend narrator acknowledges the
user's history in the framing: "Our subject returns to the panel.
Scarred, perhaps. Certainly no wiser."

**Hawking (Tier 2+):** Calculates the probability of the user
returning: "There is a 73% chance this individual will return
within 48 hours. The survival instinct is clearly subordinate
to the entertainment instinct."
