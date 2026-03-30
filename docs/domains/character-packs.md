# Character Packs as Content Drops — Design Document
# SS-157 — Adding a character is a content event, not a code change
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain) — no worker.js or HTML changes

---

## What Is This?

"Robin Williams joins the panel this week."

That sentence is a marketing moment. Currently it's invisible — Robin
gets added to characters.js, pushed, deployed, and nobody knows unless
they happen to notice a new name in the panel. There's no announcement,
no discovery, no event.

Character packs make new characters (and groups of characters) into
content drops — planned, announced, discoverable. The architecture
already supports it. PANEL_POOL is a lookup. Adding a character is
adding an entry. The pipeline is the gate. The missing piece is the
content-drop structure around the addition.

---

## Why This Matters

### Characters ARE the content
Survival School has 28+ characters. Each one is a comedy engine with
voice profiles, escalation pools, wounds, composure, catchphrases,
relationships, and category tags. A new character isn't a feature —
it's content. And content drops drive engagement in every product
that has ever sustained an audience.

### The current gap
New characters arrive silently. No announcement. No "new" badge. No
discovery moment. No reason for a user to come back specifically
because someone new is on the panel. The architecture is ready.
The marketing wrapper is missing.

---

## The Content-Drop Pipeline

### Phase 1: Character Creation (Session A — existing process)
1. Character doc in `docs/characters/{name}.md`
2. Rod's Memory section (verbatim, captured same turn)
3. Research section (Claude researches, Rod adds)
4. Voice profile in `characters.js`
5. Escalation profile, composure, quotes, naming conventions
6. Domain tests
7. Category tag (Survivalist, Naturalist, etc.)

This is what we already do. No change needed.

### Phase 2: Pack Definition (NEW)
A character pack groups one or more characters into a themed drop.

```
CharacterPack {
  id:           string          // 'pack-armed-forces' | 'pack-herps' | etc.
  name:         string          // "The Armed Forces Pack"
  tagline:      string          // "Five operators. One panel. God help them."
  characters:   string[]        // charIds included in this pack
  releaseDate:  ISO 8601 | null // when this pack goes live (null = unreleased)
  category:     string          // 'themed' | 'crossover' | 'solo' | 'seasonal'
  announcement: string          // one-paragraph description for the drop
}
```

### Phase 3: Discovery (Session B — UI)
- Homepage badge: "NEW" on character tiles for 7 days after release
- Pack announcement modal on first visit after release
- Panel selection UI (SS-069) shows pack groupings

### Phase 4: Announcement (external — Rod)
- Social post template generated from pack metadata
- One-line hook + character names + tagline

---

## Pack Types

### THEMED — characters united by a domain
```
"The Armed Forces Pack"
tagline: "Five operators. One panel. God help them."
characters: [fox, billy, ollie, middleton, craighead, mcnab, ryan]
category: 'themed'
```

### CROSSOVER — characters from other products
```
"The Cusslab Crossover"
tagline: "They don't belong here. They know. The panel knows. Nobody cares."
characters: [hawking, bruce_lee]
category: 'crossover'
```

### SOLO — single character drop
```
"Robin Williams Has Entered the Building"
tagline: "Way better than Carrey. Real depth. Natural warmth."
characters: [robin]
category: 'solo'
```

### SEASONAL — event-driven drops
```
"The Halloween Special"
tagline: "Morrison is already here. He was always here."
characters: [] // no new chars — seasonal mechanic activation
category: 'seasonal'
```

---

## Domain Model

```javascript
const CHARACTER_PACKS = [
  {
    id: 'pack-founding',
    name: 'The Founding Panel',
    tagline: 'The originals. The ones who were there from the start.',
    characters: ['ray', 'bear', 'stroud', 'cody', 'hales', 'irwin', 'packham', 'attenborough'],
    releaseDate: '2026-03-26',
    category: 'themed',
    announcement: 'The eight characters who launched Survival School. Ray\'s silence, Bear\'s confidence, Cody\'s stillness, and Attenborough watching it all.'
  },
  {
    id: 'pack-herps',
    name: 'The Herpetologists',
    tagline: 'Three men. Thousands of bites. No regrets.',
    characters: ['stevens', 'oshea', 'gordon', 'fry', 'wade'],
    releaseDate: '2026-03-28',
    category: 'themed',
    announcement: 'Austin Stevens, Mark O\'Shea, Gordon Lyons, Bryan Fry, and Jeremy Wade. The men who made being bitten a career choice.'
  },
  {
    id: 'pack-armed-forces',
    name: 'The Armed Forces',
    tagline: 'Five operators. One panel. God help them.',
    characters: ['fox', 'billy', 'ollie', 'middleton', 'craighead', 'mcnab', 'ryan'],
    releaseDate: '2026-03-28',
    category: 'themed',
    announcement: 'Fox, Billy, Ollie, Middleton, Craighead, McNab, and Ryan. Seven former special forces. At least three distinct versions of every story.'
  },
  {
    id: 'pack-crossover',
    name: 'The Cusslab Crossover',
    tagline: 'They don\'t belong here. They know. The panel knows. Nobody cares.',
    characters: ['hawking', 'bruce_lee'],
    releaseDate: '2026-03-28',
    category: 'crossover',
    announcement: 'Stephen Hawking and Bruce Lee. Neither has any survival credentials. Both have opinions. The panel\'s reaction is the product.'
  },
  {
    id: 'pack-fish-out-of-water',
    name: 'The Fish Out of Water',
    tagline: 'Confident. Wrong. Unbothered.',
    characters: ['cox', 'faldo', 'carrey', 'keane'],
    releaseDate: '2026-03-29',
    category: 'themed',
    announcement: 'Brian Cox, Nick Faldo, Jim Carrey, and Roy Keane. Not one of them should be here. All of them think they should.'
  },
  {
    id: 'pack-robin',
    name: 'Robin Williams Has Entered the Building',
    tagline: 'Way better than Carrey. Real depth. Natural warmth.',
    characters: ['robin'],
    releaseDate: '2026-03-30',
    category: 'solo',
    announcement: 'Robin Williams joins the panel. Temporal Lens eligible. The manic energy of Carrey with genuine soul underneath. Good Will Hunting was a masterpiece. Rod loves him.'
  }
];
```

---

## Functions

```javascript
function getPackById(packId) { ... }
function getPacksForCharacter(charId) { ... }
function getReleasedPacks() { ... }
function getNewPacks(sinceDate) { ... }  // packs released after sinceDate
function isNewCharacter(charId, sinceDate) { ... }  // character in a pack released after sinceDate
```

---

## Integration Points

### With Panel Selection (SS-069)
When users pick panel members, packs provide themed groups:
"Pick from The Herpetologists" or "Try The Armed Forces Pack."
Faster than scrolling 28+ individual characters.

### With User Reputation (SS-152)
Track which packs the user has encountered. "You've never met
The Herpetologists" is a discovery prompt.

### With Homepage (Session B)
Pack drops show on the homepage as announcements. "NEW: Robin
Williams Has Entered the Building" with the tagline and a
CTA to try a panel with the new character.

---

## What Session A Builds Now

1. `CHARACTER_PACKS` — pack definitions (data)
2. `getPackById(packId)` — lookup
3. `getPacksForCharacter(charId)` — which packs include this char
4. `getReleasedPacks()` — packs with releaseDate ≤ now
5. `isNewCharacter(charId, sinceDate)` — is this char in a recently released pack
6. Domain tests

**What Session A does NOT build:**
- UI badges (Session B)
- Announcement modal (Session B)
- Social post templates (Rod's domain)
