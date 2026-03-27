# Shared Session State — Survival School
# Written: 2026-03-27 (session close)
# Format: Claude.ai reads this cold at next session start

---

## What was done this session

Nothing shipped. Session started with context summary continuation, then Rod
identified that SS has no pipeline whatsoever and has never had one.

The question raised: "how the fucking fuck have we not deployed a test pipeline
as part of project setup — every project has that — we need the full pipeline
as per YGW project."

Answer: correct. SS has no pipeline. This is WL-SS-005.

Two WL items raised:
- WL-SS-005: No pipeline built for SS — features shipped with zero automated testing
- WL-SS-006: Session startup protocol skipped repeatedly

Session closed without any feature work. Rod ended the session.

---

## Decisions made

- Pipeline must be built BEFORE any feature work in next session. Non-negotiable.
- SS pipeline must match YGW pattern: L0 auth canary → L1 unit → L2 contract → L3 acceptance → L4 UI → L5 OAT
- Session startup is a hard gate. Task waits. Startup runs first. Claude must self-report any skip immediately.

---

## HDD status

HDD hypothesis: "People will engage with survival panel content when presented through a comedic expert panel format."
**Status: Stalled.** No advancement this session. Features exist but no user testing yet.
**Next: Ollie test** — get real user reaction before building more.

---

## Open WL items

| ID | Title | Status |
|----|-------|--------|
| WL-SS-002 | Shared state accuracy — verify facts before writing | Open |
| WL-SS-003 | wrangler.jsonc at /home/rodent/ — always use --config | Open |
| WL-SS-005 | No pipeline built for SS — features shipped with zero testing | Open |
| WL-SS-006 | Session startup protocol skipped repeatedly | Open |

---

## Top 3 for next session

1. **Build SS pipeline** — scripts/pipeline-report.sh matching YGW. tests/domain.test.js for state.js + characters.js domain logic. tests/contract.verify.test.js for worker routes. tests/acceptance/ for Gherkin scenarios. tests/ui/ for Playwright at mobile/tablet/laptop. Wire into deploy.sh.
2. **Wire pipeline into deploy.sh** — gate before wrangler deploy. No green pipeline = no deploy.
3. **Live bug check** — ask Rod before any feature work.

---

## Session goal for next session

Build the SS pipeline from scratch (L0–L5, YGW pattern). Green pipeline before any feature work is touched.

---

## Live features

| Feature | URL |
|---------|-----|
| Homepage | /survival-school |
| How Screwed Am I? | /survival-school/app |
| How Bad Is This? | /survival-school/worst |
| Mundane Mode | /survival-school/mundane |
| Will You Eat It? | /survival-school/eat |
| Animal Deathmatch | /survival-school/deathmatch |

Worker: cusslab-api.leanspirited.workers.dev
GitHub (content): github.com/Asspirited/survival-school
GitHub (worker): github.com/Asspirited/cusslab

---

## Character architecture

Two tiers:
- Core panel (js/characters.js): Ray, Bear, Cody, Hales (Les Hiddins), Fox, Stroud, Attenborough (bookends only)
- Specialist panel (js/characters-worst.js): O'Shea, Stevens (How Bad Is This? only)

**Attenborough NEVER appears in panel array. Bookends only.**
**Les Hiddins — correct name. Not Les Hales. Updated across all files.**

---

## Key files for pipeline build

- Domain logic to test: js/state.js, js/characters.js (buildSystemPrompt, buildSituation, setProbability etc.)
- Worker routes to contract-test: POST /survival-school/assess, GET /survival-school/eat, GET /survival-school/deathmatch, GET /survival-school/worst, GET /survival-school/mundane
- YGW pipeline to copy pattern from: /home/rodent/your-green-gardening-wizard/scripts/pipeline-report.sh
- YGW unit tests to copy pattern from: /home/rodent/your-green-gardening-wizard/tests/domain.test.js
