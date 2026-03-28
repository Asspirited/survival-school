# ADR-001: The Rooms — Corridor Design and Room Naming Convention

**Date:** 2026-03-28
**Status:** Decided
**Deciders:** Rod (LeanSpirited)
**Tags:** product, ux, architecture

## Context

SS-066 through SS-068 implement "The Rooms" — a set of RegisterContract interaction modes for the Survival School panel. Six rooms, each running the panel under a distinct social contract. The corridor (SS-067) is the navigation layer that lets users choose a room.

Design decisions needed: how rooms are named, how the corridor tile UI works, and how room identity is expressed in code, URLs, and UI.

## Decision

**Room naming:** Each room has two names:
- A **comedic name** — the sign on the door. Derived from panel character identities or British comedy references. This is what the user sees first.
- A **domain concept sub-header** — the RegisterContract name. This tells the user what the mechanic is.

**Corridor tile design:** Each tile IS a door. Door styling. The door shows only a **room number** — no name, no sub-header, no description visible before entering. The user picks a number blind. The wrong-room gag is a natural consequence of the mystery: you don't know what's behind the door until you open it. Optional: a sliver of muffled dialogue leaking under each door as a hint.

The comedic names and domain concepts are known internally (in code and backlog) but are revealed to the user only *after* they enter — as the room's header once inside. The visual metaphor is the Argument Clinic hallway (Monty Python, Series 3, 1972) — the joke is that the customer doesn't know which room they're choosing until they're already in it.

**The six rooms and their names:**

| Room | Comedic Name | Domain Concept |
|------|-------------|----------------|
| 12 | Dead Parrot Survival | The Denial Loop |
| 12A | Barney Rubble | The Argument |
| 13 | I've Had Worse | I've Had Worse |
| 14 | Special Air Counsellors | The Reasonable One |
| 15 | Yes, But Then What? | Going With It |
| 16 | The 4th Wall | The Detail |

**URL convention:** Domain-concept-slugified, not room-numbered.
- `/survival-school/ive-had-worse`
- `/survival-school/dead-parrot-survival`
- etc.
Room numbers are decorative (door labels in the corridor UI) — not structural.

**Protagonist selection (Room 13 specific):** For "I've Had Worse", the user selects which panel character is the protagonist — the one whose ordeal must top everyone else's. The remaining panel is drawn randomly. This is not a global pattern — other rooms determine their protagonist differently.

**Room-specific input prompts:** Each room's input prompt (label, placeholder, chips) must be designed to drive the comedy from the first interaction — before the panel responds. The prompt tells the user what kind of input the room wants, in the register of the room. Trivial chips in "I've Had Worse" (paper cut, lukewarm tea) amplify the escalation. Pompous chips in "Special Air Counsellors" set a different register. Input prompts are specified per-room in the individual backlog items and are part of the walking skeleton delivery.

**Protagonist setup framing ("I've Had Worse" specific):** The input prompt conspires with the user against the protagonist. Once a protagonist is selected, the copy shifts to name them and invite the user to set them up: "Bear's warming up. What's your sorry little predicament?" The user feels like they're laying the trap. The comedy starts before submit is pressed. This dynamic copy (changes on protagonist chip selection) is part of SS-066's walking skeleton.

## Alternatives considered

| Option | Why rejected |
|--------|-------------|
| Room numbers as URLs (`/rooms/13`) | Numbers are Argument Clinic decoration, not domain concepts. URL should reflect domain. |
| One name per room (no dual naming) | Lost the comedic layer. The sub-header grounds it; the header creates the hook. |
| Fixed panel per room | Random panel with protagonist selection gives more replayability at lower complexity. |

## Consequences

**Positive:** URLs are readable and memorable. Room names create immediate personality. Domain concept sub-header prevents confusion about what each room does. Door metaphor creates the corridor UX naturally.

**Negative / trade-offs:** Two names per room adds cognitive overhead in code (comedic name for display, domain concept for logic). Manageable — display name lives in the page constant, domain concept lives in the RegisterContract object.

**Neutral:** Room numbers remain as visual decoration in SS-067 (corridor) — they do not drive routing or logic.

## Linked items

- Backlog: SS-066 (walking skeleton — I've Had Worse)
- Backlog: SS-067 (corridor navigation)
- Backlog: SS-068 (remaining five contracts)
- Related: the_rooms_design_brief.md (Downloads)
