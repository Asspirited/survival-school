# Testing Standards — Survival School
# Informed by: Adzic, North, Fowler, Cunningham, Beck, Marick, Crispin, Hendrickson, Rose, Bach, Bolton
# Last updated: 2026-03-27
# Read when: designing any test, choosing test types, reviewing coverage, diagnosing false greens

---

## The Testing Philosophy

> "Testing is not a phase. It is a continuous activity of learning about the product." — James Bach

Testing for Survival School has one job: **give us confidence that the features work as users experience them** — not just that the code compiles. Given LLM responses are non-deterministic, we test schema and structure, not content. Given the worker is a Cloudflare edge function, we test routes and response shape. Given the UI is browser HTML, we test DOM behaviour.

---

## The Authorities and What They Teach Us

### Kent Beck — Test-Driven Development
> Write a failing test. Make it pass. Refactor.

**Applied to SS:**
- Every new behaviour gets a failing test BEFORE implementation.
- The test is the specification. If you can't write the test, you don't understand the behaviour.
- For LLM features: the test specifies the JSON schema, not the LLM output content.

**The rule:** No implementation without a failing test. Gherkin before code. Test before function.

---

### Dan North — Behaviour-Driven Development
> BDD is about conversations, not tools. Gherkin exists to capture the outcome of a Three Amigos conversation.

**Applied to SS:**
- Every new panel mode (How Screwed Am I, Deathmatch, Fact-Checker etc.) starts with a Three Amigos conversation: what is the user trying to achieve, what is the behaviour, what would make it fail?
- Gherkin scenarios live in `features/`. One feature file per mode.
- The scenario is the source of truth for the acceptance test.

**The Three Amigos:** Rod (business), Claude (tech), and the feature under test (the thing that can go wrong).

---

### Gojko Adzic — Specification by Example
> A test that cannot be read as a specification is checking implementation, not behaviour.

**Applied to SS:**
- Every acceptance test should read like a user story: *Given / When / Then*.
- The Gherkin scenario for Bear Fact-Checker: "Given a user submits a Bear claim, When the panel responds, Then the accuracy score is 0–100 and the verdict is one of CONFIRMED / DISPUTED / EMBELLISHED / MYTH."
- This IS a specification. It tells a new developer exactly what the feature must do.

**Impact mapping first (for new features):** Why are we building this? Who benefits? What behaviour do we want to change? If we can't answer these, the test will test the wrong thing.

---

### Brian Marick + Lisa Crispin — Agile Testing Quadrants

```
                  BUSINESS-FACING
                        │
       Q2               │              Q3
   Acceptance/BDD       │         Exploratory
   Gherkin scenarios    │         Manual, charter-driven
   Feature files        │         Rod's session-start test
                        │
   ─────── TEAM-SUPPORTING ──── PRODUCT-CRITIQUING ───
                        │
       Q1               │              Q4
   Unit tests           │         Non-functional
   domain.test.js       │         Schema, contract, load,
   domain-worst.test.js │         browser compat
                        │
                  TECHNOLOGY-FACING
```

**Q1 (unit):** `tests/domain.test.js`, `tests/domain-worst.test.js`
**Q2 (BDD):** `tests/acceptance/acceptance.test.js`, derived from `features/`
**Q3 (exploratory):** Rod's eyes-on-product session-start test
**Q4 (non-functional):** `tests/contract.verify.test.js` (schema), `tests/ui/` (Playwright)

We must have all four. Q4 is where we currently have the most gaps.

---

### Elisabeth Hendrickson — Exploratory Testing and Heuristics
> The spec says "panel responds." The spec doesn't say "panel responds when the API returns an empty string."

**Applied to SS:**
- Rod's exploratory test at session start is not optional. It catches what automated tests miss.
- For each new mode shipped, add a charter to the session-start exploratory test:
  - "Explore what happens when Bear Fact-Checker is submitted with an empty claim."
  - "Explore what happens when Animal Deathmatch is submitted with the same animal on both sides."
  - "Explore what the Stingray Rule does when 'stingray' appears in a longer animal name."

**Heuristic for LLM features:** The edge case is rarely the empty input. It is the *almost-valid* input — a claim that is one word, a situation that is only special characters, a match with two identical animals.

---

### Martin Fowler — Test Pyramid and Continuous Integration
> A test suite that takes 10 minutes to run is a test suite that will be skipped.

**Applied to SS:**
- L0 (auth) + L1 (unit) must complete in < 5 seconds. They run first. If they fail, stop.
- L2 (contract) calls the live worker. This takes ~20 seconds per interaction. Run after L1 green.
- L3 (acceptance) calls live routes. ~15 seconds. Run after L2.
- L4 (UI/Playwright) is slowest. Run last. Can be skipped in fast mode.
- False greens are waste-log entries, not acceptable trade-offs.

**CI rule:** Pipeline must run with `bash scripts/pipeline-report.sh`. Zero manual steps between passing tests and deploying.

---

### Seb Rose — BDD in Practice (with Adzic and Nagy)
> BDD is not about the scenarios. It is about the conversations that produce the scenarios.

**Applied to SS:**
- The Gherkin gate is not a checkbox. It is evidence that we talked about the behaviour before building it.
- A scenario written by Claude without Rod's input is not BDD. It is test theatre.
- Every new feature: Three Amigos first, Gherkin second, test third, code fourth.

**Format for SS Gherkin (in `features/`):**
```gherkin
Feature: Bear Fact-Checker

  Scenario: Submitted claim returns structured panel response
    Given a user submits the claim "I once made fire with a piece of ice"
    When the panel responds
    Then the accuracy_score is an integer between 0 and 100
    And the verdict is one of CONFIRMED, DISPUTED, EMBELLISHED, MYTH
    And Ray's panel card has a non-empty fact_check field
    And Bear's panel card has no fact_check field
    And the attenborough_verdict is a non-empty string
```

**Scenario Outline rule — apply at Gherkin gate, before approval:**

After writing scenarios, ask: *"Does any scenario repeat the same logic with different inputs?"*
If yes → convert to Scenario Outline with an Examples table. This is not optional.

Parametric variations written as separate scenarios are missed coverage — the table makes
the full input space explicit and the gap obvious.

```gherkin
  Scenario Outline: Disposition shifts under sustained panel pressure
    Given dispositionState has <char>: <from>
    And panel_tension type is <tension>
    When the worker computes disposition shifts
    Then dispositionState has <char>: <to>

    Examples:
      | char  | from             | tension   | to                  |
      | cox   | EXCITABLE_NOVICE | callout   | CONFIDENT_IGNORAMUS |
      | faldo | CONTEMPTUOUS_EXPERT | callout | RELUCTANT_CONSCRIPT |
```

Use Scenario Outline when:
- Same When/Then logic runs across multiple characters, modes, or input states
- A state machine has defined transitions to test (dispositions, composure tiers, cascade steps)
- A validation rule applies to a list of values (valid charIds, valid disposition names)

Do NOT use Scenario Outline when:
- Scenarios have meaningfully different Given context (different setup, not just different data)
- The table would have only one row

---

### Ward Cunningham — Technical Debt
> Shipping code you're not confident in is borrowing against future velocity. The debt compounds.

**Applied to SS:**
- WL-SS-005 (no pipeline) was technical debt accumulated from session 1. Six sessions of rework = the interest payment.
- Every feature shipped without tests is debt. The pipeline is the repayment plan.
- The acceptance test that confirms Deathmatch and Fact-Checker show LIVE (not SOON) in the nav is the regression guard that prevents re-accruing this debt.

---

### James Bach + Michael Bolton — Rapid Software Testing and the Checking/Testing Distinction
> Checking is running a script to see if you get the expected output. Testing is using your mind to find problems the script can't see.

**Applied to SS:**
- `tests/domain.test.js` is *checking*. It verifies that `setProbability(150)` clamps to 100. Useful, not sufficient.
- Rod's session-start exploratory test is *testing*. It finds problems that weren't in the spec.
- "The system passed all checks" does not mean "the system has been tested."
- Both are required. Neither replaces the other.

**Michael Bolton's heuristic:** Test the things that matter to users, not the things that are easy to automate. For SS, what matters to users: does the panel feel like those characters? Does Attenborough close every scene? Does the Stingray Rule fire? These require judgment, not automation.

---

## Test Layer Definitions

### L0 — Auth Canary
**What:** Cloudflare token present and valid. Worker endpoint reachable.
**Script:** `scripts/check-auth.sh`
**When:** First. Always. If RED, stop pipeline. No point testing features if the worker is unreachable.
**Pass criterion:** Exit 0. Worker returns HTTP 200 on GET /survival-school.

---

### L1 — Unit Tests (Domain Layer)
**What:** Pure functions tested in isolation. No DOM. No API. No network.
**Files:** `tests/domain.test.js` (js/state.js), `tests/domain-worst.test.js` (js/state-worst.js)
**When:** After L0. Fast (< 2 seconds).
**Coverage target:** 100% statement and branch — the four-loops.md standard.
**Pass criterion:** 0 failures. Coverage ≥ 100% on all domain files.
**What is NOT tested at L1:** DOM manipulation (ui.js, ui-worst.js), API calls (api.js), character prompts (characters.js — these are data, not logic).

---

### L2 — Contract Tests (PACT Schema Verification)
**What:** Live worker routes verified against the PACT contract. Schema shape, not LLM content.
**Files:** `tests/contract.verify.test.js`, `tests/contracts/ss-browser-ss-worker.pact.json`
**When:** After L1 green. Calls live worker — network required.
**Pass criterion:** All GET routes return HTTP 200 with text/html. POST /assess returns JSON with all required fields. survival_probability is 0–100.
**What is NOT tested at L2:** LLM response quality (non-deterministic), character voice accuracy (Q3 — exploratory), load time (Q4 — future).

---

### L3 — Acceptance Tests (Gherkin-Derived)
**What:** Observable user behaviour tested via live routes.
**Files:** `tests/acceptance/acceptance.test.js`
**When:** After L2. Calls live routes — network required.
**Pass criterion:** All scenarios pass. This confirms that features listed as LIVE in the nav actually return real content, not "coming soon" placeholders.
**Gherkin source:** `features/` directory. One file per feature.

---

### L4 — UI Tests (Playwright)
**What:** Browser-level behaviour at three viewport sizes.
**Files:** `tests/ui/` (not yet authored)
**Viewports:** Mobile 390×844, Tablet 768×1024, Laptop 1440×900.
**When:** After L3. Slowest layer — headless Chromium.
**Pass criterion:** Key interactions work at all three sizes. Panel cards render. Fact-checker form submits.

**Playwright rules:**
- Never use `page.waitForTimeout()` or `sleep`. These are timing-dependent and create flaky tests.
- Block or poll for the actual thing: `await expect(locator).toBeVisible()`, `await expect(locator).toHaveText(...)`, `page.waitForSelector()`, `page.waitForFunction()`.
- If a state change is driven by JS, assert the changed state directly — Playwright's auto-retry handles the wait.
- `hover()` for testing JS interaction is valid but fragile; prefer asserting data attributes or resulting DOM state.
**Priority scenarios for first implementation:**
1. How Screwed Am I — guided mode assessment renders panel cards
2. Animal Deathmatch — FIGHT button triggers loading state
3. Bear Fact-Checker — claim submits and accuracy meter appears
4. Nav switching — clicking each nav item shows correct panel

---

### L5 — OAT (Operational Acceptance Testing)
**What:** Post-deploy confirmation that the live system behaves as expected.
**Not yet defined.** Placeholder in pipeline runner.

---

## Testing LLM-Dependent Features

LLM responses are non-deterministic. We cannot assert "Bear says X." We CAN assert:

1. **Schema:** The response JSON has the expected fields.
2. **Types:** survival_probability is a number, not a string. panel is an array.
3. **Range:** survival_probability is 0–100. accuracy_score is 0–100.
4. **Constraints:** Bear's fact_check is absent in Fact-Checker mode (he IS the subject). Ray's fact_check is present in Fact-Checker mode (mandatory).
5. **Length:** attenborough_verdict is a non-empty string. panel has at least one card.

What we do NOT test automatically:
- Whether Ray sounds like Ray.
- Whether the comedy is funny.
- Whether Attenborough's verdict is appropriately geological.
These are Q3 (exploratory) — Rod's judgment.

---

## Definition of Done (per feature)

A feature is DONE when:
1. Gherkin scenario written and reviewed (Three Amigos)
2. Acceptance test written from the Gherkin (failing first)
3. L1 unit tests cover all new domain functions (100% coverage)
4. L2 contract updated if new route added
5. L3 acceptance test passes against live worker
6. Pipeline green (all layers green or SKIP)
7. Nav badge is LIVE (not SOON)
8. Committed and pushed

A feature is NOT done if:
- It has no test
- It shows "coming soon" in the nav
- The pipeline is RED
- It was never deployed

---

## Coverage Targets

| Layer | Coverage target | Tool |
|-------|----------------|------|
| L1 Unit | 100% statement + branch | `node --experimental-test-coverage` |
| L2 Contract | All live routes in PACT | Manual PACT JSON |
| L3 Acceptance | All DONE features | node:test, one scenario per Gherkin |
| L4 UI | Key journeys × 3 viewports | Playwright |

---

## When to Read This File

| Situation | Section |
|-----------|---------|
| Starting a new feature | Three Amigos, Gherkin gate, BDD section |
| Writing a unit test | L1 definition, coverage target |
| Writing a contract test | L2 definition, PACT contract format |
| Testing an LLM feature | Testing LLM-Dependent Features |
| Debugging a false green | Fowler section, pipeline layer definitions |
| Rod's exploratory session test | Hendrickson section, Q3 quadrant |
| Pipeline RED, no code changed | Marick quadrant — check Q4 (non-functional) |
| Deciding if a feature is done | Definition of Done |
