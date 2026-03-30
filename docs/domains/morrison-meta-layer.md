# Morrison Meta-Layer — Design Document
# SS-162 — Unreliable narrator who introduces unverifiable information
# Status: Design v1
# Created: 2026-03-30
# Depends on: SS-083 (Morrison interruption), SS-099 (contextual trigger)
# Session A (Design + Docs + Domain) — no worker.js or HTML changes

---

## What Is This?

Morrison currently does two things:
1. **Corridor guide** — sends protagonists through The Doors
2. **Random interrupter** — appears ~20% per round, warm-hostile flip

Both are structural. Neither generates new information. Morrison reacts
to what's happening. He doesn't introduce anything the panel doesn't
already know.

The meta-layer changes that. Morrison becomes an **unreliable narrator**
who introduces information that may or may not be true. The panel must
deal with the claim without knowing if it's real. The user doesn't know
either. Sometimes Morrison is right. Sometimes he's completely fabricating.
The ambiguity is the mechanic.

"I heard Gordon brought a snake to a wedding."
Did he? Gordon's face suggests maybe. But Morrison heard this from
someone who heard it from someone who may have been Morrison himself.
The source is unverifiable. The panel must now navigate around a claim
that could be true.

This is comedy infrastructure no other product has attempted.

---

## Why This Matters

### The current Morrison gap
Morrison arrives, says something cryptic, panel flips, he leaves.
The cycle is entertaining but self-contained. Nothing Morrison says
changes the trajectory of the panel conversation. He's a weather
system — he passes through and things return to normal.

### What the meta-layer adds
Morrison's claims STICK. When he says "I heard Gordon brought a snake
to a wedding," the panel can't unhear it. Gordon must now either
confirm, deny, or deflect. Other characters form opinions about whether
it's true. The claim becomes a new axis of tension. Morrison leaves.
The tension from his claim stays.

This makes Morrison load-bearing in a way he isn't currently. His
interruptions have consequences. They change what the panel talks about.

---

## The Three Types of Morrison Claim

### 1. THE RUMOUR (probably true)

Morrison introduces something that sounds like gossip but is grounded
in the character's actual backstory or escalation pools.

```
"I heard Ray once spent three days making a single cup of tea.
The footage was four hours long. Nobody watched it."
```

This is roughly true. Ray's patience is legendary. The specific claim
is fabricated but character-consistent. The panel half-believes it
because it SOUNDS like Ray.

**Design rule:** Rumours draw from the character's reference pools
(SS-147) but distort them. Take a real pool item and stretch it.
The character recognises the seed of truth but not the version
Morrison is telling.

### 2. THE INVENTION (definitely not true)

Morrison introduces something that has no basis in anything. He has
generated it from nothing. It is a complete fabrication delivered
with the same certainty as the rumour.

```
"Bear once tried to open a restaurant. It was called 'Grylls.'
The only item on the menu was 'whatever I found this morning.'
It closed in three days."
```

Bear did not try to open a restaurant. Morrison did not hear this
from anyone. The claim is pure Morrison. But it sounds exactly as
plausible as the rumour. The panel cannot tell the difference.

**Design rule:** Inventions are character-consistent but event-false.
They reference the character's known traits but describe events that
never happened. The comedy is that they COULD have happened.

### 3. THE ORACLE (accidentally true about something else)

Morrison introduces something that sounds like nonsense but maps
to a real event the panel hasn't discussed yet. Morrison doesn't
know this. He's just saying words. But the words accidentally predict
or reference something that the panel will encounter.

```
"Someone here has a secret about a bathtub."
```

Morrison is riffing. He doesn't know about Morrison's wound (the
Paris bathtub). But he just said it. The panel goes quiet. Morrison
doesn't understand why.

**Design rule:** Oracles reference wounds (SS-147) or sacred exchanges
from OTHER characters. Morrison doesn't know the reference pool — he
stumbles into it. The comedy is the accidental collision between
Morrison's nonsense and someone's real secret.

---

## Domain Model

```
MorrisonClaim {
  type:        'rumour' | 'invention' | 'oracle'
  target:      string          // charId the claim is about
  claim:       string          // what Morrison says
  seed:        string | null   // the real reference pool item it's based on (rumour/oracle)
  verifiable:  boolean         // can the panel verify this? (rumour: maybe, invention: no, oracle: accidentally)
}

MORRISON_CLAIM_TEMPLATES {
  rumour:     Template[]       // templates with {char} and {distorted_item} slots
  invention:  Template[]       // templates with {char} and {fabricated_event} slots
  oracle:     Template[]       // templates with {wound_hint} slots
}
```

---

## How Claims Are Generated

Claims are NOT pre-written. They are generated at prompt time by
combining Morrison's voice with a claim type and a target character.

### Rumour generation (prompt-time)
1. Pick a character in the current panel
2. Pick a reference pool item from their ESCALATION_PROFILES
3. Inject into system prompt: "Morrison has heard a rumour about
   {char.name}. The rumour is based on: '{pool_item}' but Morrison
   has distorted it through multiple retellings. Morrison delivers
   the distorted version as fact."

### Invention generation (prompt-time)
1. Pick a character in the current panel
2. Inject: "Morrison has invented a completely false story about
   {char.name}. The story must be character-consistent (it SOUNDS
   like something {char.name} might do) but is entirely fabricated.
   Morrison does not know it's false."

### Oracle generation (prompt-time)
1. Pick a character in the current panel who has a wound (SS-147)
2. Inject: "Morrison says something that accidentally references
   {char.name}'s wound topic: '{wound.name}'. Morrison does not know
   about the wound. The reference is coincidental. The panel notices.
   {char.name} notices. Morrison does not notice that anyone noticed."

---

## Claim Templates (for buildMorrisonClaimInjection)

These are prompt fragments, not pre-written Morrison lines. The LLM
generates Morrison's actual words.

```javascript
const MORRISON_CLAIM_TEMPLATES = {
  rumour: [
    'Morrison has heard a rumour about {charName}. Based on: "{seed}". Morrison\'s version is distorted through retellings — the core is recognisable but the details are wrong. {charName} recognises the seed but not the version.',
    'Morrison claims to have been told something about {charName} by someone who may not exist. The claim is loosely based on: "{seed}". Morrison presents it as established fact.',
    'Morrison heard from "a reliable source" (Morrison does not have reliable sources) that {charName} once did something related to: "{seed}". The story has been corrupted in transit.'
  ],
  invention: [
    'Morrison has invented a completely false story about {charName}. The story must sound plausible for {charName}\'s character but is entirely fabricated. Morrison delivers it as fact and does not know it is false.',
    'Morrison claims {charName} was involved in an incident that never happened. The incident is character-consistent but event-false. Morrison genuinely believes it.',
    'Morrison describes something {charName} supposedly did that is entirely a product of Morrison\'s imagination. It sounds like it could be true. It is not. Morrison cannot tell the difference.'
  ],
  oracle: [
    'Morrison says something cryptic that accidentally maps to {charName}\'s wound: "{woundName}". Morrison does not know about the wound. The reference is coincidental. When the room reacts, Morrison is confused by the reaction.',
    'Morrison, while drifting, mentions something that touches {charName}\'s deepest topic: "{woundName}". Morrison is not targeting {charName}. He is just saying words. The words happen to land on the exact wrong thing.',
    'Morrison introduces a vague observation that accidentally references "{woundName}". The panel freezes. {charName} freezes. Morrison does not notice. He continues talking about something else entirely.'
  ]
};
```

---

## Panel Reaction Rules

The meta-layer only works if the panel reacts correctly.

### To a RUMOUR:
- Target character: recognises the seed, denies the version
- Other characters: some believe Morrison, some don't
- Tension: the panel splits on whether the rumour is true
- Morrison: confused that anyone cares. "I'm just saying what I heard."

### To an INVENTION:
- Target character: flatly denies it. "That never happened."
- Other characters: some think the denial is suspicious
- Morrison: does not understand why the character is upset
- The comedy: the more the character denies, the more suspicious it looks

### To an ORACLE:
- Target character: goes quiet. Possibly too quiet.
- Other characters: notice the reaction, not the claim
- Morrison: has already moved on. Does not understand the silence.
- The comedy: Morrison has accidentally detonated a wound and has
  no idea. The panel watches the target character. The target character
  watches Morrison leave. The silence is louder than the claim.

---

## Integration Points

### With Escalation Profiles (SS-147)
Rumours draw from reference pools. The pool provides the seed.
Morrison distorts it. The character recognises the seed but not
the version. This uses existing pool data — no new data needed.

### With Wounds (SS-147)
Oracles accidentally reference wounds. The wound name and topic
are already in ESCALATION_PROFILES. Morrison doesn't access the
wound directly — the prompt tells the LLM what the wound is about
and asks Morrison to accidentally reference it.

### With Composure Engine (SS-100)
An oracle that hits a wound should affect the target character's
composure. This is the only Morrison claim type that has mechanical
consequences beyond the conversation. Session B wires this.

### With Character Learning (SS-154)
If Morrison made a claim about Bear in a previous encounter, and
this user returns with Bear in the panel, Bear might reference
the previous claim: "Morrison is going to say something about a
restaurant again. He always does." This requires SS-154 character
learning to inject the history.

### With World Log (SS-151)
Morrison claims that become canonical (the panel treated it as true)
could be logged as World Log entries. "Morrison's restaurant rumour
about Bear" becomes a world event. Future panels reference it.
Whether it's true is never resolved.

---

## What Session A Builds Now (characters.js)

1. `MORRISON_CLAIM_TEMPLATES` — prompt templates per claim type
2. `buildMorrisonClaimInjection(panelCharIds, claimType)` — generates
   the prompt injection for a Morrison claim
3. `pickClaimTarget(panelCharIds)` — selects which character gets
   the claim (excludes Morrison, prefers chars with rich pools)
4. Domain tests for all functions

**What Session A does NOT build:**
- Worker prompt wiring (Session B)
- Random claim triggering logic (Session B — extends SS-083)
- Panel reaction prompt engineering (Session B)

---

## Claim Frequency

Morrison already appears ~20% per round. Not every appearance should
include a claim. The meta-layer is a subset of Morrison appearances.

```
Morrison appearance (20% per round)
  ├── Standard warm-hostile flip (60% of appearances)
  └── Meta-layer claim (40% of appearances)
        ├── Rumour (50% of claims)
        ├── Invention (30% of claims)
        └── Oracle (20% of claims)
```

So: ~8% of rounds have a Morrison appearance with a claim.
~1.6% of rounds have an accidental oracle hit on a wound.
These are rare enough to be surprising, common enough to be anticipated.

---

## The Comedy Principle

Morrison is the only character who can introduce information from
outside the conversation. Every other character responds to what's
in front of them. Morrison brings things in that nobody asked about.

The meta-layer turns this from a quirk into a mechanic. Morrison
is a chaos agent with a specific type of chaos: unverifiable claims
about other characters. The panel's inability to verify creates
tension. The tension creates comedy. The comedy is structural —
it works regardless of which character is targeted or what the
claim is about.

The oracle variant is the deepest layer. Morrison doesn't know about
wounds. He doesn't know about sacred exchanges. He doesn't know about
anything that happened before he arrived. He just says words. And
sometimes the words are exactly the wrong ones. The silence after
an oracle hit is the loudest moment in the product.
