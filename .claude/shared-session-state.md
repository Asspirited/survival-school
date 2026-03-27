# Shared Session State — Survival School
# Written: 2026-03-27 (session close)
# Format: Claude.ai reads this cold at next session start

---

## What was done this session

### Bugs fixed (WL-SS-007)
**Animal Deathmatch (SS-011):** Home nav badge changed SOON → LIVE. Panel updated from "coming soon" placeholder to iframe at `/survival-school/deathmatch`. Route already existed in worker. Deployed.

**Bear Fact-Checker (SS-008):** Built standalone interactive page. Ray's correction mandatory. Bear defends claim. Cody gives correct technique. Hales educational. Fox tactical. Stroud quiet verdict. Attenborough bookends. Accuracy score 0–100. Verdict: CONFIRMED / DISPUTED / EMBELLISHED / MYTH. New route `/survival-school/fact-checker` added to worker. Home nav badge SOON → LIVE. Panel updated to iframe. Deployed.

### Pipeline started (SS-040, IN PROGRESS)
Files created:
- `package.json` — test scripts
- `scripts/check-auth.sh` — Cloudflare auth canary
- `scripts/pipeline-report.sh` — 6-layer runner (L0–L5)
- `tests/domain.test.js` — 55 unit tests for js/state.js (all pass)
- `tests/domain-worst.test.js` — unit tests for js/state-worst.js (all pass)
- `tests/contract.verify.test.js` — PACT schema verification for all routes
- `tests/contracts/ss-browser-ss-worker.pact.json` — PACT contract definition
- `tests/acceptance/acceptance.test.js` — Gherkin-derived acceptance tests (12/12 pass)

Pipeline L1 (unit): 55/55 pass.
Pipeline L3 (acceptance): 12/12 pass.
Pipeline L2 (contract): not run this session (calls live API, would be slow/expensive).
Pipeline L4 (UI/Playwright): SKIP — Playwright UI tests not yet authored.
Pipeline L5 (OAT): SKIP.

### Testing standards
Background agent launched to research Adzic, North, Fowler, Cunningham, Beck, Marick, Crispin, Hendrickson, Rose, Bach, Bolton and write docs/testing-standards.md + docs/testing-quick-ref.md. May or may not have completed.

---

## Decisions made

- SS pipeline builds on node:test (native, no extra deps). PACT contracts defined in JSON, verified in contract tests.
- Fact-checker standalone page uses same character voice profiles as other modes. Ray's fact_check is mandatory (not optional).
- Pipeline runs L0 → L5. Fails fast at L0 if auth broken. L4 and L5 SKIP until Playwright tests authored.

---

## HDD status

HDD-001: "People will engage with survival panel content when presented through a comedic expert panel format."
**Status: OPEN / Stalled.** No user testing this session. Features were broken/hidden.
**Next: Ollie test** — now that Deathmatch and Fact-Checker are actually visible and working.

---

## Open WL items

| ID | Title | Status |
|----|-------|--------|
| WL-SS-002 | Shared state accuracy — verify facts before writing | Open |
| WL-SS-003 | wrangler.jsonc at /home/rodent/ — always use --config | Open |
| WL-SS-005 | No pipeline built for SS — features shipped with zero testing | Partially closed (L1+L3 built) |
| WL-SS-006 | Session startup protocol skipped repeatedly | Open |
| WL-SS-007 | Deathmatch and Fact-Checker broken — asked 6 sessions | Closed |

---

## Top 3 for next session

1. **Run full pipeline and confirm green** — `bash scripts/pipeline-report.sh`. Fix any failures. Wire L2 contract test carefully (calls live API).
2. **Complete pipeline** — Playwright UI tests (L4): three viewports mobile/tablet/laptop. OAT definition (L5). Wire into deploy.sh as gate.
3. **Ollie test / HDD validation** — someone uses How Screwed Am I, Animal Deathmatch, Bear Fact-Checker. Report reaction. First real HDD data.

---

## Session goal for next session

Pipeline fully green (L0–L4) and deploy.sh gates on it. First real user test reported.

---

## Live features

| Feature | URL |
|---------|-----|
| Homepage | /survival-school |
| How Screwed Am I? | /survival-school/app |
| How Bad Is This? | /survival-school/worst |
| Mundane Mode | /survival-school/mundane |
| Will You Eat It? | /survival-school/eat |
| Animal Deathmatch | /survival-school/deathmatch ✅ NOW LIVE |
| Bear Fact-Checker | /survival-school/fact-checker ✅ NOW LIVE |

Worker: cusslab-api.leanspirited.workers.dev
GitHub (content): github.com/Asspirited/survival-school (WL-SS-002: verify this exists)
GitHub (worker): github.com/Asspirited/cusslab

---

## Character architecture

Two tiers:
- Core panel (js/characters.js): Ray, Bear, Cody, Hales (Les Hiddins), Fox, Stroud, Attenborough (bookends only)
- Specialist panel (js/characters-worst.js): O'Shea, Stevens (How Bad Is This? only)
- Fact-Checker uses: Ray, Bear, Cody, Hales, Fox, Stroud

**Attenborough NEVER appears in panel array. Bookends only.**

---

## Process failure note

Rod asked to fix Deathmatch and Fact-Checker in at least 6 sessions. Root cause: startup protocol skipped (WL-SS-006), no pipeline (WL-SS-005), no acceptance test to catch regression. Both now fixed. Acceptance test confirms both LIVE in nav. Session was painful — auth token check was done wrong (asked Rod before checking env, token was valid). Do not repeat.

---

## Key files for next session

- Pipeline entry: `bash scripts/pipeline-report.sh`
- Unit tests: `tests/domain.test.js`, `tests/domain-worst.test.js`
- Contract: `tests/contract.verify.test.js`
- Acceptance: `tests/acceptance/acceptance.test.js`
- Worker: `/home/rodent/cusslab/worker.js` (fact-checker page at line ~4124)
- Testing standards: `docs/testing-standards.md` (if agent completed)
