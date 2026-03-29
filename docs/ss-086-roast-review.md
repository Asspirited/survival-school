# SS-086 — Review: SS-085 Roast + Inversion Material as Chip Stimulus
# Status: Complete (review)
# Created: 2026-03-29

---

## What SS-085 shipped (In My Defence, Room 14)

10 general incident chips + per-protagonist personal chips that load
dynamically when a protagonist is selected. The general chips:

1. **O'Shea: grandmother's urn** — incontinent at formal event, urn confusion
2. **Stay Safe: live rounds** — delivered school talk with live ammunition
3. **Stay Safe: abseil entry** — abseiled through school window, restrained teacher
4. **Irwin: snake wall** — subdued taipan by smashing it against wall
5. **Irwin: croc fighting ring** — reinforced pit, bleacher seating, betting slips
6. **Irwin: snake ring let-slip** — accidentally disclosed underground snake circuit
7. **Irwin: croc leather on-camera** — wearing crocodile belt/wallet on Crocodile Hunter
8. **O'Shea: snake jacket** — self-identified king cobra skin jacket on-air
9. **Stevens: snake pit** — sleeping in snake pits since 1987, O'Shea wrote a paper
10. **Stevens: snakeskin boots** — wearing snakeskin boots on Snakemaster, RSPCA report

Plus the ConspireEngine system prompt that makes characters unreliable
narrators who rationalise their documented incidents.

---

## Review: What transfers to other features?

### How Screwed Am I / Assessment modes

**Verdict: Limited direct transfer, but one clear mechanism.**

The assessment modes ask "how screwed am I in this situation?" The roast
material isn't a situation — it's a character's past. However:

**Mechanism: Character credential undermining chips.** A chip that says
"Bear is advising you, but he was recently exposed sleeping in a hotel
during what was supposed to be a wilderness shoot" changes the assessment
dynamic. The panel knows. Bear doesn't know they know. His advice is
now filtered through the credibility gap.

**Candidate chips for How Screwed Am I:**
- "Bear is your lead advisor. He was recently seen at a Travelodge 400m from the filming location."
- "Cody is your advisor but he has just thrown the only fire-making kit into a swimming pool."
- "The panel's snake expert has been wearing the snake."

These are not predicament chips — they're **advisor credibility chips**
that modify the panel dynamic rather than the scenario. New chip type
needed. Suggests a new chip section: "Complicating factors."

### I've Had Worse (Room 13)

**Verdict: Strong transfer. Partially already there.**

I've Had Worse already has predicament chips (paper cut, shandy, badger,
pigeon, tortoise, Bear/urine/snake). The roast material extends this
naturally:

**Candidate predicament chips (adapted from SS-085 incidents):**
- "You are Mark O'Shea and a vessel you used has turned out to contain ashes. You need to contextualise this as field sanitation."
- "You delivered a Stay Safe talk using methods the school board considers excessive."
- "You are wearing something made from the species you claim to protect."

These work as-is. Data-only addition — no new code paths. Add to the
`#chips-predicament` section in the I've Had Worse HTML.

### I've Been Bit, Guys (Worst)

**Verdict: Moderate transfer. Incident-specific.**

The snake material specifically (Stevens sleeping in pits, O'Shea's
jacket, Irwin's wall) is directly relevant to "I've been bitten."

**Candidate chips:**
- "You are Austin Stevens and you were asleep in a snake pit when this happened."
- "You are Steve Irwin and the snake you're dealing with is wearing a leather jacket you recognise."

These need character-specific chip rendering (the chip names the
protagonist). Currently the worst page doesn't assign characters to
scenarios. Would need a `data-protagonist` attribute on the chip.
Suggests a small code change — flag for Session B.

### Panel Q&A

**Verdict: Strong. Reframe as questions.**

The roast material becomes questions when inverted:
- "Is it ethical to wear a belt made from the species you're filming a documentary about?"
- "At what point does sleeping in a snake pit stop being research?"
- "Should school survival talks include live demonstrations?"

These are genuinely good Panel Q&A chips — they trigger the
Contradiction Engine (experts disagree), the Social Dynamics Engine
(wound references fire), and the Temporal Lens (deceased characters
reckon with their own practices).

**Add directly to Panel Q&A chip set.** Data-only — no new code paths.

### Will You Eat It?

**Verdict: One strong candidate.**

- "The tortoise question" already exists on I've Had Worse (Darwin
  reference). Will You Eat It? could have: "You've caught a crocodile.
  The croc leather goods department would also like a word."

Low priority. One chip.

### Animal Deathmatch

**Verdict: No transfer.** Deathmatch is about animal stats, not
character embarrassment. Wrong surface.

### Bear Fact-Checker

**Verdict: One natural fit.**

Fact-checker is about verifying Bear's claims. The hotel incident is
PERFECT fact-checker material:
- "Bear claims he roughed it for 72 hours in the Highlands with nothing
  but a knife and his instincts. Fact-check this."

The fact-checker already exists as a feature. This is a chip suggestion
for the question input, not a code change.

---

## Summary: Recommended new chips

| Feature | Chip | Type | Code change? |
|---------|------|------|-------------|
| How Screwed Am I | "Bear is your advisor. He was recently seen at a Travelodge." | New type: "Complicating factors" | Yes — new chip section |
| How Screwed Am I | "The panel's snake expert has been wearing the snake." | Complicating factor | Same as above |
| I've Had Worse | "You are wearing something made from the species you protect." | Predicament | No — data only |
| I've Had Worse | "You delivered a Stay Safe talk the school board considers excessive." | Predicament | No — data only |
| Panel Q&A | "Is it ethical to wear a belt made from the species you're filming about?" | Question chip | No — data only |
| Panel Q&A | "At what point does sleeping in a snake pit stop being research?" | Question chip | No — data only |
| Panel Q&A | "Should school survival talks include live demonstrations?" | Question chip | No — data only |
| Bear Fact-Checker | "Bear roughed it for 72 hours. Fact-check this." | Question chip | No — data only |

**New backlog items to raise:**
- SS-115: "Complicating factors" chip type for How Screwed Am I (code change — new chip section + system prompt awareness)
- SS-116: Data-only chip additions from SS-086 review (I've Had Worse, Panel Q&A, Fact-Checker)

---

## Decision

SS-086 is a review item, not a build item. The review is complete.
The roast/inversion material from SS-085 generates 8 candidate chips
across 4 features, plus one new chip type ("Complicating factors").

Two new backlog items raised: SS-115 (code change), SS-116 (data-only).
