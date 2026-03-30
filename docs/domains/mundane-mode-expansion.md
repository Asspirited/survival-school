# Mundane Mode Expansion — Design Document
# SS-170 — Ideas for deeper Mundane Mode functionality
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain)

---

## What Is This?

Mundane Mode is currently single-shot: submit a mundane situation, get a
panel response with full survival gravity, screenshot it, done. It's the
most shareable feature. It's also the shallowest.

This document explores how to deepen Mundane Mode without losing what
makes it work: the contrast between expert gravity and ordinary situations.

---

## What Works Now

The core joke: "Ray Mears treating a Wetherspoons queue as a survival
scenario." The panel's sincere gravity applied to the mundane is the
product. It works because:

1. **The panel never breaks.** They genuinely believe this is serious.
2. **The contrast is the comedy.** The more mundane the situation, the
   funnier the survival analysis.
3. **Screenshot-ready.** One response. One image. Shareable.

Any expansion must preserve all three.

---

## Expansion Ideas

### 1. MULTI-TURN ESCALATION — "It Gets Worse"

After the initial response, the user adds a complication:
"...and now the printer is on fire."

The panel re-assesses. The survival probability drops. The gravity
increases. Each complication deepens the comedy because the panel
adjusts their assessment with complete sincerity.

**Mechanic:** Same as IHW's protagonist_response. User adds context.
Panel responds. Repeat up to 5 rounds. Each round uses composure
engine — by round 4, Bear is suggesting emergency protocols for a
broken vending machine.

**Why this works:** The single-shot response is funny. Watching the
panel get increasingly invested in a mundane situation is funnier.
By round 3, Fox is suggesting exfiltration routes from IKEA.

### 2. MUNDANE SURVIVAL GUIDE — "The Field Manual"

After the panel response, a "FIELD MANUAL" section appears:
a sincere, formatted survival guide for the mundane situation.

```
FIELD MANUAL: WETHERSPOONS, FRIDAY, 5:30PM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Threat Assessment: ELEVATED
Estimated Duration: 2-4 hours (longer if table secured)

Phase 1: APPROACH (0-5 min)
- Identify entry points. The main entrance will be crowded.
  Consider the side door if available.
- Visual sweep for available tables. Look for coats-on-chairs
  without occupants — these are traps.

Phase 2: ESTABLISH BASE (5-15 min)
- Secure a table with line-of-sight to the bar.
- Send one member to order while others hold position.
- DO NOT leave bags unattended. This is not a trust environment.

Phase 3: SUSTAIN (15 min - 2 hrs)
- Maintain hydration (pint per 30 minutes, adjust for temperature).
- Monitor group morale. The 90-minute mark is critical.
- Resupply runs must be coordinated. Never two at the bar.

Phase 4: EXTRACTION (final 30 min)
- Establish a hard extraction time BEFORE settling in.
- The phrase "one more" is the leading cause of extended deployment.
```

**Why this works:** It extends the joke from "the panel said something
funny" to "there's an entire operational document for getting a table
at Wetherspoons." The field manual is inherently shareable — it's a
stand-alone comedy artefact.

### 3. CATEGORY DEPTH — Mundane Scenario Packs

Current chips are generic ("Wetherspoons," "IKEA," "M25"). Expand
into deep category libraries like SS-168 (Will You Eat It):

**RETAIL**
- Self-checkout, unexpected item in bagging area, no staff
- Trying to return something to Primark without a receipt
- Aldi checkout speed — items arriving faster than bagging
- Lost in IKEA, been walking for 40 minutes, children restless
- B&Q on a Bank Holiday Saturday, looking for a specific screw

**TRANSPORT**
- National Rail replacement bus service, wrong platform
- M25 J15-16 at 5pm on a Friday, no hard shoulder
- Ryanair middle seat, 9 hours, person in front reclined
- Trying to use a ticket machine that doesn't accept cards
- Parking in a multi-storey that charges by the half hour

**WORKPLACE**
- Printer jammed, presentation in 10 minutes, IT "aware of the issue"
- Monday standup that's become a 45-minute meeting
- Reply-all incident, cannot be unreplied
- Someone's eaten your lunch from the fridge
- Hot-desking: arrived late, only seats near the toilet

**SOCIAL**
- Been at a party for 3 hours, don't know anyone, phone at 4%
- Pub quiz, your team is losing, the other team is celebrating
- Wedding seating plan puts you next to the one person
- Someone's told a joke and you didn't laugh in time
- Group text planning an event, 47 messages, no decision

**DOMESTIC**
- Spider in the bath, no glass, partner watching from doorway
- Smoke alarm chirping at 3am, can't find which one
- Washing machine has eaten a sock, again
- Neighbour's cat has brought in a mouse, mouse is alive
- Boiler has stopped, it's February, engineer can come Thursday

### 4. EXPERT PANEL VARIANT — "Mundane Expert Witness"

Combine Mundane Mode with Expert Witness: a fish-out-of-water character
is presented as the expert for the mundane situation.

"Nick Faldo is the expert on navigating IKEA."

The real experts defer to Faldo on IKEA strategy. Faldo doesn't know
anything about IKEA but approaches it with the same methodical precision
he applied to rebuilding his swing. "You need to commit to the showroom
path. People who deviate to the marketplace lose focus."

### 5. MUNDANE DEATHMATCH — "Which Is Worse?"

Two mundane situations. The panel debates which is worse.

"Aldi checkout speed vs. Wetherspoons toilet at midnight."

The panel applies survival metrics. Ray assesses which environment is
more hostile. Bear has been to both (unnecessarily). Fox calculates
exit routes for each. Attenborough narrates the comparison as a
nature documentary about apex mundane predators.

---

## Recommended Priority

| Idea | CD3 | Why |
|------|-----|-----|
| Category Depth (3) | 12 | Data-only, no new code paths, deepens immediately |
| Multi-turn (1) | 14 | Uses existing IHW pattern, highest comedy return |
| Field Manual (2) | 10 | New response format, medium build, high shareability |
| Expert Variant (4) | 8 | Combines two existing mechanics, needs wiring |
| Mundane Deathmatch (5) | 8 | New mechanic, fun but not urgent |

---

## Sub-Items to Raise

If Rod confirms these ideas, each becomes its own backlog item:
- SS-171 — Mundane multi-turn escalation ("It Gets Worse")
- SS-172 — Mundane Field Manual response format
- SS-173 — Mundane scenario category depth (50+ chips)
- SS-174 — Mundane Expert Witness variant
- SS-175 — Mundane Deathmatch ("Which Is Worse?")

These are suggestions for Rod to score, not commitments.
