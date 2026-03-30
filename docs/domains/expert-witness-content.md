# Expert Witness — Deep Content Catalogue
# SS-169 — Scenario chips and predicament content for The Expert Witness
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain) — chip wiring is Session B (worker.js)

---

## What Is This?

The Expert Witness (Room 16) has 8 scenario chips across 3 categories.
The mechanic is rich — a fish-out-of-water character presented as the
expert while real experts defer — but the scenario library is thin.
Users run out of interesting situations quickly.

This document designs a deep scenario library that maximises the gap
between the "expert's" confidence and their actual knowledge. The wider
the gap, the funnier the deference.

---

## Current State

| Category | Chips | Scenarios |
|----------|-------|-----------|
| Medical | 3 | snake bite, hypothermia, spinal injury |
| Survival | 3 | shelter, river crossing, plant ID |
| Tactical | 2 | hostage rescue, jungle navigation |
| **Total** | **8** | |

---

## Design Principle

The best Expert Witness scenarios have three properties:
1. **Genuine expertise required** — the scenario NEEDS a real expert
2. **Surface plausibility** — the fish-out-of-water character could
   sound confident for about 30 seconds
3. **Inevitable collapse** — the deeper you dig, the less they know,
   and the funnier the real experts' silence becomes

"Brian Cox explaining river crossing" works because Cox is confident,
articulate, and completely wrong. The real experts (Fox, Ray, Bear)
defer with increasing discomfort.

---

## Expanded Scenario Library

### MEDICAL (existing 3 + 6 new = 9)

**Existing:**
- Snake bite treatment (outback)
- Hypothermia rewarming (fell through ice)
- Spinal injury extraction (cliff fall)

**New:**
- **Anaphylaxis in the field** — severe allergic reaction, no EpiPen, nearest
  hospital 4 hours. The "expert" must improvise. Real experts know exactly
  what to do with a knife and a pen barrel. Or they don't. Either way.
- **Tourniquet application** — arterial bleed from a machete slip. The
  "expert" must decide where, how tight, and when to release. Nick Faldo
  explaining tourniquet technique is peak Expert Witness.
- **Drowning victim resuscitation** — pulled from a river, not breathing.
  The "expert" must lead CPR. Jim Carrey leading CPR is exactly the
  right kind of catastrophic.
- **Tropical disease identification** — fever, sweats, shaking after
  jungle exposure. The "expert" must differentiate malaria from dengue
  from something else entirely. Roy Keane diagnosing tropical disease
  as "a lack of mental toughness."
- **Dehydration assessment** — three days without water, confusion setting
  in. The "expert" must assess severity and advise on rehydration. Bear
  in the audience knowing the answer involves drinking things.
- **Venomous vs non-venomous snake** — two snakes, one is lethal, one is
  harmless. The "expert" must identify which is which from markings,
  head shape, and pupil shape. Eric Bristow studying snake pupils.

### SURVIVAL (existing 3 + 6 new = 9)

**Existing:**
- Shelter construction (freezing rain)
- River crossing (strong current)
- Plant identification (six species)

**New:**
- **Fire from nothing** — no matches, no lighter, no magnifying glass. The
  "expert" must demonstrate fire-starting from friction. Faldo explaining
  the physics of bow drills while demonstrating he cannot use one.
- **Water purification** — only source is stagnant pond water with visible
  organisms. The "expert" must advise on purification methods. Hawking
  calculating the probability of parasitic infection.
- **Animal tracking** — fresh prints, scat, broken vegetation. The "expert"
  must identify the animal, its direction, its speed, and how long ago.
  Cox confidently identifying deer tracks as "evidence of gravitational
  compression patterns."
- **Knot tying masterclass** — five essential survival knots. The "expert"
  must demonstrate each one. Jim Carrey's approach to knot tying is
  physically energetic and structurally catastrophic.
- **Trap building** — catch a rabbit for food using only sticks and
  cordage. The "expert" must design the trap. Bristow designing a
  trap based on darts scoring zones.
- **Signal fire construction** — plane crashed, rescuers searching.
  The "expert" must build a signal fire that's visible from the air.
  Keane's signal fire is efficient, joyless, and somehow still wrong.

### TACTICAL (existing 2 + 6 new = 8)

**Existing:**
- Hostage rescue briefing
- Jungle navigation

**New:**
- **Ambush response** — convoy hit, incoming fire from treeline. The
  "expert" must direct the immediate response. Cox's instinct to
  discuss the physics of ballistics while under fire.
- **Night patrol leadership** — lead a 4-person patrol through hostile
  territory using only a map and compass. No NVGs. The "expert" must
  navigate and maintain noise discipline. Faldo maintaining noise
  discipline is surprisingly good. His navigation is not.
- **Casualty extraction under fire** — a team member is down in the
  open. The "expert" must direct the extraction. Carrey's approach
  to military extraction borrows from Ace Ventura more than SOP.
- **Perimeter defence setup** — establish a defensive position with
  4 people, limited ammo, and 6 possible approach routes. The "expert"
  must allocate resources. Hawking's resource allocation is mathematically
  optimal and operationally insane.
- **Vehicle breakdown in hostile territory** — engine dead, 40km to
  safety, hostiles potentially nearby. The "expert" must decide:
  stay, walk, or cannibalise the vehicle. Bristow staying with the
  vehicle because "you never leave the oche."
- **Building clearance** — clear a three-storey building, room by room,
  unknown occupants. The "expert" must direct the team. Keane clearing
  a building with the same intensity as the Saipan incident.

### ENVIRONMENTAL (NEW category — 6 scenarios)

- **Avalanche burial** — team member buried under 2 metres of snow.
  The "expert" must direct the probe search and excavation. Time
  critical. Faldo's golf course measurement skills are not transferable.
- **Flash flood response** — water rising fast, group on wrong side of
  the river, 15 minutes before the gorge fills. The "expert" must
  choose the escape route. Cox explaining fluid dynamics while the
  water reaches his waist.
- **Lightning storm on exposed ridge** — caught in the open, metal
  equipment, nearest shelter 2km. The "expert" must advise the group.
  Hawking's analysis of electromagnetic discharge is correct and
  unhelpful at the speed required.
- **Quicksand extraction** — person sinking, waist-deep, panicking.
  The "expert" must direct the rescue. Carrey's experience with
  quicksand is entirely cinematic.
- **Bear encounter management** — grizzly sow with cubs, 30 metres,
  group has no bear spray. The "expert" must decide: back away,
  play dead, or make noise. Bristow's approach: "Stand your ground.
  That's what I'd do at the oche."
- **Volcanic ash response** — eruption 20km away, ash cloud approaching.
  The "expert" must advise on respiratory protection, shelter, and
  evacuation. Keane: "Get on with it."

### MARITIME (NEW category — 5 scenarios)

- **Man overboard** — someone falls from a boat in cold open water.
  The "expert" must direct the rescue. Faldo calculating the optimal
  approach angle like it's a chip shot.
- **Shark in the water** — spotted while swimming, 50 metres from shore.
  The "expert" must advise the group. Cox's enthusiasm for the shark's
  evolutionary biology is poorly timed.
- **Liferaft survival** — boat sunk, 6 people in a 4-person raft, no
  food, no water, shipping lane 200km away. The "expert" must allocate
  resources and set a survival plan. Hawking's rationing model is
  efficient and terrifying.
- **Rip current escape** — caught in a rip current, being pulled out.
  The "expert" must advise from the beach. Carrey demonstrating the
  correct swimming technique from dry land.
- **Capsized kayak in rapids** — upside down, water moving fast,
  paddle lost. The "expert" must talk through the wet exit. Bristow:
  "Just flip it. Like when you flip the dart."

---

## Summary

| Category | Existing | New | Total |
|----------|----------|-----|-------|
| Medical | 3 | 6 | 9 |
| Survival | 3 | 6 | 9 |
| Tactical | 2 | 6 | 8 |
| Environmental | 0 | 6 | 6 |
| Maritime | 0 | 5 | 5 |
| **Total** | **8** | **29** | **37** |

---

## Integration

This is a data-only change. The chip HTML in worker.js (Session B) adds
the new scenario chips to the existing category groups. No new code paths.
No new mechanics. The RegisterContract and system prompt are unchanged.

Each scenario chip carries a `data-scn` attribute with the scenario text.
Session B adds the chips. The content is defined here.
