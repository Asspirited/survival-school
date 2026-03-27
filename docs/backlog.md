# Backlog — Survival School
# Prefix: SS-NNN
# CD3 scoring: Confidence (1-3) × Desirability (1-3) × Deliverability (1-3) = max 27

---

## OPEN ITEMS INDEX (update this block each session)

| CD3 | Item | Status |
|-----|------|--------|
| TBD | SS-001 — Complete project brief | Open |
| TBD | SS-002 — ADR: tech stack decision | Open |
| TBD | SS-003 — Define HDD hypothesis | Open |
| 27  | SS-004 — Pre-flight covers all founding/character docs | Done |
| 27  | SS-005 — Telephone Game mechanic | Open |
| 27  | SS-006 — Temporal Lens mechanic | Open |
| 27  | SS-030 — How Bad Is This? feature | Done |
| TBD | SS-031 — Animal database — first 20 entries | Open |
| TBD | SS-032 — Archetypal scenarios SS-INCIDENT-001 to SS-INCIDENT-010 | Open |
| TBD | SS-033 — Animal Deathmatch data layer integration | Open |
| TBD | SS-034 — Panel response logic: triage order, medical/comedy split | Open |
| 27  | SS-035 — Attenborough bookend pattern | Done |
| 27  | SS-036 — Mundane Mode | Done |
| 27  | SS-037 — Rotating header taglines | Done |

---

## SS-001 — Complete project brief

**Status:** Open
**Priority:** Critical
**Loop:** HDD
**Raised:** 2026-03-26

### User Story
As Rod,
I want a clear, agreed project brief for Survival School,
So that all subsequent decisions are grounded in a shared understanding of what we're building.

### Acceptance Criteria

```gherkin
Feature: Project brief

  Scenario: Brief is complete
    Given the Survival School concept has been discussed
    When the project brief is reviewed
    Then it describes the target user, core problem, and phase 1 scope
    And it contains a falsifiable HDD hypothesis
```

### Notes
- Rod discussing content with Claude.ai — output from that session feeds this item.

---

## SS-002 — ADR: tech stack decision

**Status:** Open
**Priority:** High
**Loop:** DDD
**Raised:** 2026-03-26

### User Story
As the team,
I want an explicit decision on the tech stack,
So that we build consistently from day one.

### Acceptance Criteria

```gherkin
Feature: Tech stack ADR

  Scenario: Stack is decided
    Given the product requirements are understood
    When the tech stack decision is made
    Then an ADR is written to docs/decisions/
    And the stack is recorded in the project brief
```

### Notes
- Needs project brief (SS-001) before this can be decided meaningfully.

---

## SS-003 — Define HDD hypothesis

**Status:** Open
**Priority:** Critical
**Loop:** HDD
**Raised:** 2026-03-26

### User Story
As Rod,
I want a written, falsifiable hypothesis for phase 1,
So that we know what we're trying to learn and what would prove us wrong.

### Acceptance Criteria

```gherkin
Feature: HDD hypothesis

  Scenario: Hypothesis is defined
    Given the project brief is complete
    When the hypothesis is defined
    Then it names a specific persona
    And it states a specific problem
    And it states a specific solution bet
    And it states a falsifier (what would prove us wrong)
```

### Notes
- Depends on SS-001.

---

## SS-004 — Pre-flight covers all founding/character docs

**Status:** Done
**Priority:** Critical
**Loop:** Protocol
**Raised:** 2026-03-26
**Closed:** 2026-03-26

### What was fixed

Pre-flight command in `session-startup.md` Step 0 updated to include:
- `docs/founding-docs-raw.md`
- `docs/founding-notes.md`
- `$(find docs/characters/ -name "*.md" 2>/dev/null | sort)` — auto-picks up all future character files

Pre-close check added to `session-closedown.md` Step 8b — requires verifying pre-flight covers any new files before closing.

### Root cause

Original pre-flight only pulled 5 files. Founding docs and character notes written in a previous session were not included, causing Claude.ai to start the next session blind.

---

## SS-030 — How Bad Is This? feature

**Status:** Done
**Priority:** High
**Loop:** Feature
**Raised:** 2026-03-26 (Claude.ai session)
**Closed:** 2026-03-26

Three-input incident assessment: what happened, animal/hazard, circumstances.
8-character panel (Ray, Fox, O'Shea, Stevens, Bear, Hales, Attenborough, Cody).
Doom percentage meter (inverted — red=bad). Cody action line.
O'Shea and Stevens defined as first-class characters.
Live at /survival-school/worst.

---

## SS-031 — Animal database — first 20 entries

**Status:** Open
**Priority:** High
**Loop:** Feature / Data
**Raised:** 2026-03-26

Schema defined in docs/survival-incidents.md. Start with 20 animals.
Same data to feed How Bad Is This?, Animal Deathmatch, Panel Q&A, Will You Eat It?
See docs/survival-incidents.md for schema format.

---

## SS-032 — Archetypal scenarios SS-INCIDENT-001 to SS-INCIDENT-010

**Status:** Open
**Priority:** Medium
**Loop:** Feature
**Raised:** 2026-03-26

10 pre-loaded scenarios defined in docs/survival-incidents.md:
001 King Cobra, 002 Grizzly, 003 Great White, 004 Brazilian wandering spider on chest,
005 Hyena pack, 006 Roy Sullivan (7th lightning strike), 007 Komodo bite,
008 Manatee (comedy), 009 Swan attack, 010 Andes (cannibalism framing).
Implement as chip options in How Bad Is This?.

---

## SS-033 — Animal Deathmatch data layer integration

**Status:** Open
**Priority:** Low (depends on SS-031)
**Loop:** Feature
**Raised:** 2026-03-26

Animal database from SS-031 feeds Animal Deathmatch UI.
Single data source, multiple consuming features.

---

## SS-034 — Panel response logic: triage order, medical/comedy split

**Status:** Open
**Priority:** Medium
**Loop:** Feature
**Raised:** 2026-03-26

Formalise the panel response order from docs/survival-incidents.md:
Ray + Fox immediate, O'Shea/Stevens medical, Bear/Hales/Attenborough comedy layer.
Implement in How Bad Is This? system prompt (partially done).

---

## SS-035 — Attenborough bookend pattern

**Status:** Done
**Priority:** High
**Loop:** Feature
**Raised:** 2026-03-27
**Closed:** 2026-03-27

Attenborough removed from panel array. Opens above meter (attenborough_opening),
closes below last card with 400ms delayed fade (attenborough_verdict).
Applied to How Screwed Am I (assessment + reaction), How Bad Is This?, Mundane Mode.
Reaction turns each get their own bookend pair.

---

## SS-036 — Mundane Mode

**Status:** Done
**Priority:** High
**Loop:** Feature
**Raised:** 2026-03-27
**Closed:** 2026-03-27

Full survival gravity applied to everyday problems. Chips: missed bus, printer ink,
locked out, wifi down, self-checkout assist, etc.
6-character panel + Attenborough bookends. One-shot (no interaction loop).
Live at /survival-school/mundane. Homepage nav updated: LIVE.

---

## SS-037 — Rotating header taglines

**Status:** Done
**Priority:** Low
**Loop:** Polish
**Raised:** 2026-03-27
**Closed:** 2026-03-27

8 lines cycling every 3.5s with CSS fade animation.
Mix of originals and mashed brand slogans.
"Finger lickin' fatality. FINISH HIM." — user's addition.
