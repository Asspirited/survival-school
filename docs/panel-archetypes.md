# Panel Archetypes — Design Document
# SS-063
# Status: Draft v1 — 2026-03-29
# Purpose: Define curated panel groupings — who goes together and why
# Depends on: SS-065 (PANEL_POOL, drawPanel), SS-064 (fish-out-of-water), SS-098 (dispositions)

---

## What This Is

The panel archetypes are named groupings of characters with a rationale:
why these people in a room together produce the best comedy. Currently,
`drawPanel()` selects 4–5 characters at random from `PANEL_POOL`. Archetypes
give the system a curated alternative — panels designed for chemistry,
not chance.

Both modes should coexist: random draw for variety, archetypes for
guaranteed dynamics. The user doesn't need to choose — the system could
default to random and weight toward archetypes when certain character
combinations are drawn.

---

## Design Principles

1. **Chemistry over completeness.** A panel of 4 well-chosen characters
   beats 7 randomly assigned ones. The comedy lives in the gaps between
   specific people, not in headcount.

2. **Contrast, not consensus.** Every archetype needs at least one tension
   axis — the thing the panel disagrees about, or the gap between how two
   characters see the same situation. Panels that agree are panels that bore.

3. **Each archetype has a flavour.** Some are expertise-heavy, some are
   comedy-forward, some are disagreement engines. The user should feel
   the difference between panels without being told.

4. **Fish-out-of-water characters slot into specific archetypes.** Not
   every guest fits every room. Cox in the Authority Room is wrong. Cox
   in the Enthusiasts is perfect.

5. **Attenborough always closes.** He is never in the archetype cast.
   He bookends every panel regardless of archetype. This is permanent.

---

## The Archetypes

### 1. THE CORE FOUR
**Cast:** Ray, Fox, Bear, Cody
**Flavour:** Expertise anchor — the founding panel
**Tension axis:** Ray/Cody (quiet competence) vs Bear (loud confidence).
Fox cuts through both with tactical assessment.

**Why it works:** These four are the product's bedrock. Ray corrects with
silence. Bear is wrong with conviction. Cody notes the obvious thing
right there. Fox assesses the exit. The comedy is structural — no guest
needed, no gimmick. The knowledge differential does the work.

**Fish-out-of-water:** No. This panel earns its comedy from genuine
expertise gaps, not domain mismatch.

**Best for:** Assessment modes, I've Been Bit, How Screwed Am I.
The panel that takes survival seriously.

---

### 2. THE CONTRADICTORS
**Cast:** Ray, Bear, McNab, Ryan
**Flavour:** Maximum factual disagreement — nothing is settled
**Tension axis:** Ray correcting Bear (survival technique), McNab
contradicting Ryan (Bravo Two Zero account), and the cross-pollination
when both disputes happen simultaneously.

**Why it works:** Two independent disagreement engines running in
parallel. Ray and Bear disagree about what to do. McNab and Ryan
disagree about what happened. When the two disputes cross over —
Bear citing an experience McNab disputes — the room becomes
unmanageable and the comedy compounds.

**Fish-out-of-water:** Optional — one guest maximum. Cox is ideal:
he adjudicates factual disputes with physics, which resolves nothing
but is technically correct. Faldo also works: he arbitrates with
golf metaphors, which resolves even less.

**Best for:** Panel Q&A, any scenario with ambiguous survival strategy.

---

### 3. THE AUTHORITY ROOM
**Cast:** Billy, Fox, Craighead, Stroud
**Flavour:** Minimal words, maximum judgment — nobody is enthusiastic
**Tension axis:** None visible. That is the tension. Four operators
who agree with each other in fewer and fewer words until the response
is essentially silence with assessment. The comedy is in the
compression — the user gets a verdict that feels like a military
debrief. The feeling of having disappointed four people simultaneously.

**Why it works:** Billy: one word. Fox: threat assessment. Craighead:
already at the exit. Stroud: was thinking about this alone and
arrived at the same conclusion. The panel dynamic is agreement
delivered as judgment. No warmth. No explanation beyond what is
strictly necessary.

**Fish-out-of-water:** Middleton is the natural guest — he talks
like authority but with more words and more volume, which the
actual operators find noteworthy. Cox is catastrophically wrong here.
Faldo is also wrong but doesn't know it.

**Best for:** I've Had Worse, In My Defence, any scenario where
the user has done something tactically stupid.

---

### 4. THE ENTHUSIASTS
**Cast:** Bear, Coyote, Middleton, Gordon
**Flavour:** High energy, high wrongness — everyone is confident,
nobody agrees, competence varies wildly
**Tension axis:** Bear (wrong with credentials), Coyote (rating the
pain), Middleton (conviction is the technique), Gordon (has been
bitten twice by the same snake and would like to tell Doug about it).
Four different registers of enthusiasm, all pointed at the same
situation, all arriving at different conclusions.

**Why it works:** Nobody in this room will tell you the correct
thing to do. Bear will tell you what he did (abroad, fine in the end).
Coyote will rate your experience on the pain scale. Middleton will
explain why this is actually the moment. Gordon will ask Doug if
this reminds him of the thing with the bag. The comedy is that all
four believe they are helping. None of them are.

**Fish-out-of-water:** Cox — EXCITABLE_NOVICE or CONVERT disposition.
He explains the physics of why you're dying with genuine enthusiasm.
The Enthusiasts don't notice this is unhelpful because they are also
unhelpful.

**Best for:** Mundane mode (peak comedy when applied to a Tesco car
park), I've Been Bit.

---

### 5. THE DARWIN ROUND
**Cast:** Darwin, Hiddins, Ray, Cody
**Flavour:** Deep knowledge across centuries — the quiet panel
**Tension axis:** Darwin (19th century natural history, today's
morality) meets three field operators whose knowledge is practical,
not academic. Darwin asks seventeen questions. Hiddins answers in
three words. Ray demonstrates. Cody notes the thing that was
right there the whole time.

**Why it works:** Darwin's curiosity meets operational knowledge.
He is fascinated by everything. He takes notes. He asks follow-up
questions. The comedy is in the register gap — Darwin discussing
the taxonomy of the snake that just bit the user while Cody and
Hiddins have already solved the problem and moved on.

**Temporal Lens potential:** High. Darwin's reckoning topic
(the tortoises) can surface naturally in this company. Hiddins's
reckoning topic (indigenous attribution) is adjacent to Darwin's
questions about knowledge transmission. Two lenses in one room.

**Fish-out-of-water:** Darwin IS the fish (wrong century). No
additional guest needed. If one is added, Hawking pairs well —
two deceased polymaths in a survival context, both completely
unequipped for it.

**Best for:** Panel Q&A, Will You Eat It?, any scenario where
knowledge matters more than action.

**Blocked by:** Darwin not yet in characters.js. Design doc exists
(`docs/characters/charles-darwin.md`). Character build is a
prerequisite.

---

### 6. THE PUB PANEL
**Cast:** Fox, Gordon, Ollie, Stroud
**Flavour:** Looser, more comedy-forward — characters who would
actually end up in a pub after
**Tension axis:** Fox and Ollie (SBS brothers, slight preferential
agreement), Gordon (who has brought Doug and a story about a snake),
Stroud (who is thinking about something else and has a harmonica).
The panel dynamic is the gap between Fox/Ollie's professional
shorthand and Gordon's absolute refusal to be embarrassed by anything.

**Why it works:** This is the panel that happens after the serious
panel has gone home. Fox is warm and self-deprecating. Ollie is
circling something he might say. Gordon is telling Doug about it.
Stroud was alone in the wilderness thinking about exactly this and
has arrived at a conclusion he will share once. The comedy is
companionable — these people like each other. The danger is still
real. They're just not performing about it.

**Fish-out-of-water:** Keane — dismissive archetype. He does not
think this pub counts as adversity. He has been in Old Trafford at
3-0 down with ten men. Nobody asked. He said it anyway. Fox finds
this interesting but not relevant.

**Best for:** Mundane mode, The Rooms (especially I've Had Worse),
any scenario where the user's predicament is not life-threatening
but is socially awkward.

---

## Archetype Selection Logic

### Current state (SS-065)
`drawPanel()` picks 4–5 at random from `PANEL_POOL`. This is the MVP.
It works. It produces variety. Sometimes the combinations are perfect.
Sometimes they're flat.

### Future state (post SS-063 implementation)
Two modes:

1. **Random draw with archetype detection:** drawPanel() draws randomly,
   then checks if the drawn set matches (or near-matches) a named
   archetype. If it does, inject the archetype's tension axis as a
   generation hint. If it doesn't, proceed as-is.

2. **Archetype selection:** The system (or user) selects an archetype.
   Characters are drawn from that archetype's cast. Fish-out-of-water
   guests are drawn from the archetype's guest list with appropriate
   disposition.

**Three Amigos decision needed:** Does the user choose the archetype
(explicit), or does the system select based on the scenario type
(implicit), or is it always random with archetype hints when they
land (hybrid)?

Rod's answer determines the implementation path.

---

## Character → Archetype Mapping

| Character | Primary archetype | Secondary | Fish-out-of-water? |
|-----------|------------------|-----------|-------------------|
| Ray | Core Four, Contradictors, Darwin Round | — | No |
| Bear | Core Four, Contradictors, Enthusiasts | — | No |
| Fox | Core Four, Authority Room, Pub Panel | — | No |
| Cody | Core Four, Darwin Round | — | No |
| Hiddins | Darwin Round | Pub Panel | No |
| Stroud | Authority Room, Pub Panel | — | No |
| Billy | Authority Room | — | No |
| Ollie | Pub Panel | Authority Room | No |
| Craighead | Authority Room | — | No |
| McNab | Contradictors | Authority Room | No |
| Ryan | Contradictors | — | No |
| Middleton | Enthusiasts | Authority Room (guest) | No |
| Coyote | Enthusiasts | — | No |
| Gordon | Enthusiasts, Pub Panel | — | No |
| Darwin | Darwin Round | — | Yes (wrong century) |
| Cox | Enthusiasts (guest), Contradictors (guest) | — | Yes |
| Faldo | Contradictors (guest) | — | Yes |
| Hawking | Darwin Round (guest) | — | Yes |
| Lee | Authority Room (guest) | — | Yes |
| Jim (Carrey) | Enthusiasts (guest) | Pub Panel (guest) | Yes |
| Keane | Pub Panel (guest) | — | Yes (when built) |
| Jeremy (Wade) | Core Four (alt), Darwin Round | — | No |
| Stevens | Darwin Round | — | No |
| O'Shea | Darwin Round | — | No |
| Jim (Morrison) | Not in archetypes — corridor guide / interruption only | — | N/A |

---

## Data Structure (characters.js — future)

```javascript
const PANEL_ARCHETYPES = {
  CORE_FOUR:     { name: 'The Core Four',     cast: ['ray', 'fox', 'bear', 'cody'],               fish_guests: [],                        flavour: 'expertise anchor' },
  CONTRADICTORS: { name: 'The Contradictors', cast: ['ray', 'bear', 'mcnab', 'ryan'],             fish_guests: ['cox', 'faldo'],          flavour: 'maximum disagreement' },
  AUTHORITY:     { name: 'The Authority Room', cast: ['billy', 'fox', 'craighead', 'stroud'],     fish_guests: ['middleton', 'lee'],      flavour: 'minimal words, maximum judgment' },
  ENTHUSIASTS:   { name: 'The Enthusiasts',    cast: ['bear', 'coyote', 'middleton', 'gordon'],   fish_guests: ['cox', 'jim'],            flavour: 'high energy, high wrongness' },
  DARWIN_ROUND:  { name: 'The Darwin Round',   cast: ['darwin', 'hales', 'ray', 'cody'],          fish_guests: ['hawking'],               flavour: 'deep knowledge across centuries' },
  PUB_PANEL:     { name: 'The Pub Panel',      cast: ['fox', 'gordon', 'ollie', 'stroud'],        fish_guests: ['keane'],                 flavour: 'companionable, comedy-forward' },
};
```

This is a design spec only. Implementation (adding to characters.js,
wiring into drawPanel, generation hints) is a separate BDD item.

---

## Open Questions for Three Amigos

1. **User choice vs system selection:** Does the user pick an archetype,
   or does the system assign one? Or hybrid — random default, user can
   lock in a favourite?

2. **The Rooms casting:** Do The Rooms (I've Had Worse, In My Defence,
   future rooms) use archetypes, or do they always use the random pool?
   Some rooms feel like they want a specific archetype (Authority Room
   for In My Defence).

3. **Archetype-aware generation:** When an archetype is active, does the
   system prompt include the archetype's tension axis as a hint? e.g.,
   "This is The Contradictors panel — lean into factual disagreement."

4. **Guest probability:** When an archetype allows fish-out-of-water,
   what's the probability of a guest appearing? Always? 30%? User toggle?

5. **Archetype growth:** As more characters are added, do existing
   archetypes expand, or do new archetypes get created? Both?
