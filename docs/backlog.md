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
