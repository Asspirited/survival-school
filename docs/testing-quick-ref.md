# Testing Quick Reference — Survival School
# One-page summary. Full detail in docs/testing-standards.md.

---

## Test Pyramid

| Layer | Name | Tool | Target | Done when |
|-------|------|------|--------|-----------|
| L0 | Auth canary | `scripts/check-auth.sh` | Exit 0 | Worker reachable, token valid |
| L1 | Unit (domain) | `node --test --experimental-test-coverage` | 100% stmt + branch | 0 failures, full coverage |
| L2 | Contract (PACT) | `node --test tests/contract.verify.test.js` | All routes in PACT | Schema matches live worker |
| L3 | Acceptance (BDD) | `node --test tests/acceptance/acceptance.test.js` | All DONE features | Gherkin scenarios pass live |
| L4 | UI (Playwright) | `npx playwright test` | Key journeys × 3 viewports | Mobile/tablet/laptop pass |
| L5 | OAT | TBD | Post-deploy smoke | Not yet defined |

Run all: `bash scripts/pipeline-report.sh`

---

## Agile Testing Quadrants

```
         BUSINESS-FACING
  Q2 BDD/Acceptance │ Q3 Exploratory (Rod)
  ──────────────────┼──────────────────
  Q1 Unit tests     │ Q4 Contract, schema, UI
         TECHNOLOGY-FACING
```

All four quadrants required. Q4 is where SS gaps are.

---

## Definition of Done (feature)

- [ ] Three Amigos conversation done
- [ ] Gherkin scenario written
- [ ] Failing acceptance test written first
- [ ] L1 unit tests cover new domain logic (100%)
- [ ] L2 PACT updated if new route added
- [ ] L3 acceptance test passes on live worker
- [ ] Pipeline green
- [ ] Nav badge = LIVE (not SOON)
- [ ] Committed + pushed

---

## Testing LLM Responses — What We CAN Assert

- Schema fields present (`survival_probability`, `panel`, `attenborough_verdict`)
- Types correct (number, array, string)
- Range valid (`survival_probability` 0–100)
- Constraints met (Ray `fact_check` mandatory in Fact-Checker; Bear `fact_check` absent)
- Panel non-empty

What we CANNOT assert automatically: character voice, comedy quality, verdict tone.
Those are Q3 — Rod's session-start exploratory test.

---

## The One Rule

> Gherkin before code. Failing test before implementation. Pipeline green before deploy.

No exceptions. The six-session WL-SS-007 debt started with skipping this.
