# The Rooms — Design Brief
# Status: NEXT SESSION — Three Amigos required before any Gherkin
# Raised: 2026-03-28
# Relates to: RegisterContract domain concept, BL-163/164/165, SS-058/059/060/061
# Source: Claude.ai design session 2026-03-28, written to permanent file 2026-03-28

---

## The Core Idea

The user chooses a room. Each room runs the panel under a specific RegisterContract —
a named social obligation that overrides how characters respond. The user sets up the
situation. The panel operates under the room's rules. Everyone in the room knows the rules.

**Reference:** Monty Python's Argument Clinic (Series 3, 1972). A clinic where unpleasant
experiences are available as paid services — abuse, argument, being hit on the head.
Customer navigates to the right room. The room has a social contract. The staff honour it.

**The inversion:** In the Argument Clinic, the customer is navigating blind. In The Rooms,
the user *chooses* the room knowingly. That foreknowledge is what amplifies the comedy —
the user walked in understanding the rules, so when Bear maintains he absolutely commando-rolled
from 250 feet and is pining for the fjords, it lands harder because everyone chose this.

**The wrong-room gag:** The Argument Clinic opens with the customer in the wrong office
(Abuse instead of Argument). One room in the corridor is always labelled something that
sounds relevant but isn't. This is not a bug — it is a feature baked into the source material.

---

## The RegisterContract Domain Model

Each room is an instance of RegisterContract:

```javascript
{
  id: 'sequential_escalation',
  name: "I've Had Worse",
  surfacePosition: 'competitive_sympathy',   // what characters appear to be doing
  deepMechanic: 'status_competition',         // what they are actually doing
  socialContract: 'must_exceed_previous',     // the compulsory rule
  breakCondition: 'absurdity_ceiling',
  closerBehaviour: 'geological_calm'
}
```

The comedy lives in the gap between surfacePosition and deepMechanic.
The larger the gap, the funnier. The characters never acknowledge the gap.

**The key insight from session:** This is not just a list of modes. All six structures —
Four Yorkshiremen, Dead Parrot, Rule of Three, Yes-And, Straight Man/Foil, Callback/Runner —
share the same engine: what is said vs what is meant. RegisterContract names that gap
and makes it compulsory. Once you have RegisterContract as a domain concept, every new
room is just a new instance with different parameters.

---

## The Rooms — Six Rooms, One for Each RegisterContract

### Room 12 — The Denial Loop
*("Pining for the Fjords")*

**RegisterContract:** surfacePosition=defending_the_claim,
deepMechanic=maintaining_fiction_against_evidence

**What happens:** User sets up a claim — specifically, something a character said or did
that is obviously wrong, dangerous, or implausible. The panel responds in two postures:
- INTERROGATORS: ask increasingly pointed questions the target character must deflect
- DEFENDERS: the target maintains the position with total sincerity, finding new angles
  of defence as each one collapses

**The canonical Bear Grylls example (Rod's setup, verbatim):**
"Bear Grylls has claimed he once jumped from a helicopter at 250 feet onto land and
commando-rolled away with no broken bones."

Ray: asks quietly what altitude the helicopter was actually at. Bear: insists 250 feet,
adds a detail about the angle of the roll. Fox: notes 250 feet is not survivable by any
documented technique. Bear: says it was the adrenaline. Hales: produces a contrary example
from 40,000 years of accumulated knowledge. Fact-checker footnote fires automatically —
the claim is not supported by any documented record of the event. Bear: says the records
were classified.

**Terminal condition:** The claim collapses so completely that even Bear can no longer
maintain it, OR the claim survives every challenge and Attenborough notes this is
more alarming than if it hadn't.

**Crack profile activated:** Bear = Confidence Spiral. Pressure makes him more certain,
not less. The fact-checker footnote becomes a paragraph.

---

### Room 12A — The Argument
*("Is this a five-minute argument or the full half-hour?")*

**RegisterContract:** surfacePosition=structured_disagreement,
deepMechanic=nobody_actually_wants_to_be_right

**What happens:** User submits a position. The panel takes the opposing position.
Each character argues from their specific domain expertise. The comedy is that the argument
keeps collapsing into a meta-argument about whether this IS an argument.

**Character argument styles:**
- Ray: patient, evidence-based, building to a point. Frustrating because he's usually right.
- Bear: energetic, personal anecdote, slightly adjacent to the actual point. Very confident.
- Fox: operational assessment. Is this argument worth having? (Usually: no. He continues anyway.)
- Billy: three sentences. The first states the position. Second is the only evidence required.
  The third closes it. No fourth sentence.
- Ollie: the admission you didn't ask for that undermines the whole exchange.
- Attenborough: observes that both positions are geologically indistinguishable.

**Terminal condition:** The argument becomes about whether this is an argument.

---

### Room 13 — I've Had Worse
*("We lived in a rolled-up newspaper in a septic tank")*

**RegisterContract:** surfacePosition=competitive_sympathy,
deepMechanic=status_competition_via_suffering

**Source structure:** Four Yorkshiremen sketch (At Last the 1948 Show, 1967).
Written by Brooke-Taylor, Cleese, Chapman, Feldman. Origin: Stephen Leacock,
"Self-Made Men." NOT a Monty Python original — though Python performed it live.

**What happens:** User submits a predicament, ailment, injury, ordeal.
Each character must top the previous one. Compulsory escalation — the social contract
of the room makes backing down impossible. Each character's "worse" story draws on
their specific expertise and history, making it credible *just long enough*.

**Order matters:** Ray goes first (measured, credible, sets the baseline). Bear goes
second (immediately implausible, total conviction). Fox goes somewhere unexpected
and military. Hales produces something from the Australian wilderness involving an
animal nobody else has heard of. Attenborough closes.

**Character-specific escalation flavours:**
- Ray: specific conditions, specific technique, quietly worse
- Bear: always abroad, always fine in the end, always unnecessary
- Fox: classified, probably
- Hales: "Have a look at that." Forty thousand years. The animal is named.
- Cody: he had the cattails thirty feet away. He chose not to use them. Made it worse.
- Billy: "We trained for this." One sentence. Moves on.
- Attenborough: geological calm. What they describe is a Tuesday for the organism involved.

**Fact-checker:** Bear's entry fires automatically on his claim.

**Terminal condition:** Absurdity ceiling reached. Attenborough closes.

**Walking skeleton candidate:** This is the first room to build. Proves RegisterContract
before the other five are attempted.

---

### Room 14 — The Reasonable One
*("That is not a recoverable position. And you caused it.")*

**RegisterContract:** surfacePosition=rational_assessment,
deepMechanic=the_world_is_not_rational_and_everyone_knows_it

**What happens:** User submits a chaotic, emotional, or absurd situation.
One character is designated The Reasonable One. They maintain perfect calm and clinical
rationality throughout. Everyone else operates at their maximum.
The comedy is the contrast — not the escalation.

**The Reasonable One by character:**
- Fox: default. Tactical reframe. Threat assessment. Lines of sight. Exit routes.
  "What is actually happening here?" Never flustered.
- Billy: applies The Standard to everything. The Standard does not change.
- Ray: the craft read. What would you do right now with what you have?
- Attenborough: always available. Geological calm is permanent.

**Terminal condition:** The Reasonable One runs out of reasonable things to say.
This is the rarest terminal condition. Also the funniest.

---

### Room 15 — Going With It
*("Yes — and?")*

**RegisterContract:** surfacePosition=collaborative_world-building,
deepMechanic=making_things_worse_by_agreeing

**What happens:** User submits a premise — including a wrong one, a dangerous one, or
an obviously false one. The panel does not correct it. They accept it as true and build
on it. The situation gets worse because the panel is agreeing with you.

**This is the inverse of the Denial Loop.** Denial Loop: panel pushes back against
false claim. Going With It: panel accepts false claim and consequences unfold.
Both are funny. Different mechanisms.

**Example:** User says "I've decided the best way to navigate a fog bank on the North Sea
is to go faster." Ray: notes speed will reduce reaction time, which is interesting.
Bear: has done this off Norway, went fine. Fox: assesses the new threat landscape the
speed creates. Nobody has said it's wrong.

**Terminal condition:** The premise has been so thoroughly accepted that reversing it
would require acknowledging everything the panel said was wrong. Nobody will. Attenborough
narrates the consequences.

---

### Room 16 — The Detail
*("That is a non-recoverable situation. And you caused it.")*

**RegisterContract:** surfacePosition=comprehensive_assessment,
deepMechanic=one_specific_thing_is_all_that_matters

**What happens:** User submits a situation. The panel responds. But one detail from
the user's input — chosen by the panel, not the user — becomes a runner. Each character
returns to it across turns. Each return adds weight. The detail is never the main point.

**Example:** User submits a Dartmoor survival scenario in October, phone at 4%.
Ray notes the user is wearing trainers. This becomes the detail. Fox returns to it.
Bear mentions trainers in a story about somewhere abroad. Hales notes what Aboriginal
peoples of the Australian desert wear. Billy: "Wrong footwear. Start there."
The detail accumulates. Attenborough's verdict includes the trainers.

**The mechanic:** The detail is chosen by the model from the user's input — not user-selected.
The user discovers which detail the panel fixated on. This is the surprise.

**World log hook:** The terminal condition notes the detail has been so thoroughly explored
it now carries more weight than the original situation. If session persistence is implemented
(world log concept), this detail would carry into future sessions. That is the world log
concept. See Three Amigos Q7.

---

## Navigation — The Corridor

The user experience is a corridor with numbered doors. Each door has:
- A name (The Denial Loop, I've Had Worse, etc.)
- A one-line description of what happens inside
- The panel configuration currently in that room

The numbering is a deliberate continuation of the Argument Clinic: Room 12 (Denial Loop)
picks up where the clinic left off. 12A is the Argument. 13 onwards are new rooms.

**The wrong-room gag candidates:**
- "The Complaint Room" — the character in charge is complaining about their shoes.
  The user's complaint is not addressed.
- "The Sympathy Room" — staffed by characters constitutionally incapable of sympathy
  (Billy, Fox, Cody). They try. It goes poorly.
- "Hitting on the Head Lessons" — reserved for future use.

---

## Setup Mechanic

Each room has a setup input — the user primes the situation before the panel responds.

**Denial Loop setup:** "What is the claim? Who made it?"
- Attributed to a panel member (Bear, most often), or the user, or left open.
- Target character's crack profile activates.

**I've Had Worse setup:** "Describe your predicament."
- Simple freetext. Chips available.
- The panel does the rest.

**The Argument setup:** "State your position."
- Simple freetext. Panel takes the other side.
- Advanced: user selects which character argues against them directly.

---

## Crack Profiles (domain model extension, developed this session)

Per-character crack trajectories — not just a threshold but a direction.
Currently Eventually Cracks fires the same way for everyone. This replaces that.

- Bear: **Confidence Spiral** — pressure makes him more certain, not less,
  until the fact-checker footnote becomes a paragraph
- Ray: **Graceful Admission** — reaches a point where he just says the true thing
  quietly and moves on
- Faldo: **Defensive Withdrawal** — stops engaging, becomes monosyllabic,
  then the sandwich reference slips out
- Ollie: **The Admission** — has been circling the thing for turns; pressure makes him say it
- Billy: **The Standard** — doesn't crack at all; simply repeats the standard and means it more

These are character attributes, not room-specific. They apply wherever pressure accumulates
(decision loop, I've Had Worse, Denial Loop). Raise as BL item per panel.

---

## Unreliable Narrator / Diverging Memory (future concept, noted this session)

Characters have diverging factual accounts of shared past events. Not lying — they
watched different things through their own lens.

Domain model extension: each character gets a `memory` object — their version of
canonical events. When a user submits a topic that touches a known event, each character
draws from their memory, not a shared truth.

This is the Telephone Game mechanic (SS-005) generalised. Not just mis-labelling
Backshall's show — sincere factual divergence on anything in the shared canon.

---

## World Log (future concept, noted this session)

An append-only ledger of things that have canonically occurred in the panel world.
Small, curated, editable by Rod. Panel prompt includes most recent 3-5 entries.
Characters know about them. The world has a history.

This is what makes long-running improv feel real — performers remember what happened
last week. The audience feels the weight of accumulated events.

Domain model: `world_log` — append-only, in the product state layer.
See The Detail (Room 16) terminal condition for the first natural hook.

---

## Relationship to Existing Products

**Survival School:** The Rooms is the natural evolution of How Screwed Am I.
HSAI has one RegisterContract (sequential assessment → decision loop).
The Rooms offers six. The corridor nav could replace or augment the current sidebar.

**Cusslab:** The Rooms can live in Comedy Room (new mode alongside Into The Room,
Roast Room, Writing Room) OR as its own top-level nav item. Three Amigos to decide.
Panel inside each room can be curated per room rather than using default rotation.

**Walking skeleton:** Room 13 (I've Had Worse) + Bear Grylls canonical setup.
Build this first. If it works, corridor and five other rooms follow.

---

## Outstanding Three Amigos Questions

1. Is The Rooms a Cusslab feature, a SS feature, or both simultaneously?
2. Does each room have a fixed panel or does the user configure it?
3. Is the corridor a visual/nav metaphor or literally styled as doors?
4. Wrong-room gag: always present, or toggleable?
5. Can the user be *in* the room (first person) or are they always the audience watching?
   (If the user IS Bear in the Denial Loop, the mechanic changes significantly.)
6. Drama setting: suggested as a future slider — high drama vs deadpan. Deferred.
7. Session persistence: does The Detail (Room 16) carry the detail into the next session?
   That is the world log concept. Powerful if yes. Complex if yes.

---

## Backlog Items to Raise (Three Amigos first)

- **BL-NNN / SS-NNN** — RegisterContract as domain concept + walking skeleton (I've Had Worse)
  CD3 est: ~7.3
- **BL-NNN+1 / SS-NNN+1** — The Rooms corridor nav + room selection UI
  CD3 est: ~5.7
- **BL-NNN+2 / SS-NNN+2** — Remaining five rooms once walking skeleton proven
  CD3 est: ~4.0

Note: I've Had Worse already exists as SS-094 (Fix I've Had Worse: chips + panel interaction).
Three Amigos will determine whether SS-094 becomes the walking skeleton or whether
The Rooms is a separate feature wrapping it.

---

## Source Material
- Argument Clinic: Monty Python's Flying Circus Series 3 (1972), Cleese/Chapman
- Four Yorkshiremen: At Last the 1948 Show (1967), Brooke-Taylor/Cleese/Chapman/Feldman
  (origin: Stephen Leacock, "Self-Made Men" — NOT a Python original)
- RegisterContract model: developed 2026-03-28 session
- Crack profiles, unreliable narrator, world log: developed 2026-03-28 session
- "I've Had Worse" — Rod's phrase, Rod's concept, Rod named it
- Bear Grylls canonical Denial Loop example — Rod's setup verbatim: 250 feet, helicopter,
  commando roll, no broken bones. Rod also said "pining for the fjords."
- "miniature Fighting Fantasy experience" — Rod's phrase for the SS decision loop
- "accidentally made something way better than I intended" — Rod on SS design
