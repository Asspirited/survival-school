# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code session close)
# For: Claude.ai pickup on next session start

---

## What shipped this session

### SS-088 — Composure engine (DONE)

**cusslab/worker.js**
- COMPOSURE_PROFILES: per-character composure profiles with baseline, pressure, tell (ray:8, fox:9, bear:7, hales:8, cody:6, stroud:7, stevens:9, cox:5, faldo:6, jim:3, jeremy:8)
- `initComposureState()` — returns baseline composure map from profiles
- `computeComposureDeltas(current, panelTension)` — callout=-2, wolf_pack=-3, lie=-1, wound_reference=-1; untargeted chars +0.5 capped at baseline
- `composureTier(val)` — HIGH(7-10), STEADY(4-6), RATTLED(2-3), GONE(0-1)
- `buildComposureInjection(composureState, panelCharIds)` — builds system prompt appendix: speaking order (lowest composure first), per-char tier labels with pressure/tell behaviour for shifted chars
- `/survival-school/assess` POST handler: accepts `composureState` + `panelCharIds` from client, injects composure into system prompt, parses response, computes deltas, returns `composureState` in response
- How Screwed Am I client: `DEFAULT_STATE.composureState: null`, `setComposureState(cs)`, `assess()` + `react()` both pass `composureState` + `panelCharIds: HSA_PANEL_CHARS` and store returned `composureState`

**survival-school tests**
- `features/composure-engine.feature` — Gherkin for SS-088 (5 scenarios)
- `tests/acceptance/acceptance.test.js` — 2 new SS-088 tests (first-round returns composureState, second-round with composureState returns updated)
- `tests/contracts/ss-browser-ss-worker.pact.json` — added `composureState` to assessment mode required fields

---

## Pipeline state
ALL GREEN — L0 auth canary, L1 unit (118), L2 contract (14), L3 acceptance (59), L4 UI (276). L5 SKIP.

---

## Open WL items
- WL-SS-011: SSH auth declared broken without checking
- WL-SS-012: Claude "fixed permanently" apology loop
- WL-SS-002: Shared state claimed GitHub repo existed — it didn't
- WL-SS-003: wrangler.jsonc at /home/rodent/ routes to wrong worker
- WL-SS-006: Session startup skipped repeatedly
- WL-SS-013: Deploy treated as auth event

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: Composure engine now live — characters shift register under pressure. First structural unlock: panel now reacts dynamically to what happened before.
Next: Observe whether composure-shifted responses are funnier/sharper. SS-092 (Jim Carrey) is next high-conviction chip.

---

## Decisions made this session
DECISION 2026-03-28: Composure engine architecture — worker stateless, client holds composureState blob, worker owns profiles and computes deltas. No new infrastructure.
DECISION 2026-03-28: How Screwed Am I panel chars are HSA_PANEL_CHARS = ['ray','fox','bear','hales','cody','stroud'].

---

## SS-088 implementation notes
- composureState is a flat object: { ray: 7.5, fox: 9, bear: 6.5, ... }
- First round: client sends no composureState → worker calls initComposureState() → returns initial state
- Subsequent rounds: client sends last returned composureState → worker injects tier/order into system prompt → computes deltas from panel_tension → returns updated composureState
- buildComposureInjection only injects if characters have shifted from HIGH tier (performance optimization — no noise when everything is fine)
- The speaking order override only fires when some chars are below HIGH

---

## Top 3 for next session
1. SS-092 — Jim Carrey character (CD3: 27, fully designed in backlog)
2. SS-087 — Cusslab crossover: non-survivalist protagonists through The Doors (Rod's call: stripped-down vs full cascade)
3. SS-090/SS-091 — Cox+Faldo pair interaction modes

---

## Live features

| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live — composure engine active |
| I've Been Bit, Guys | /survival-school/worst | Live |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live |
| Bear Fact-Checker | /survival-school/fact-checker | Live |
| The Coyote Index | /survival-school/coyote | Live |
| Panel Q&A | /survival-school/panel-qa | Live |
| The Doors (corridor) | /survival-school/rooms | Live |
| I've Had Worse (Room 13) | /survival-school/ive-had-worse | Live |
| In My Defence (Room 14) | /survival-school/in-my-defence | Live |

Worker: cusslab-api.leanspirited.workers.dev
Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Notes for Claude.ai
- cusslab/worker.js is the source file for ALL Survival School features. Not survival-school repo HTML files.
- Composure engine is live. How Screwed Am I now returns composureState each round.
- Client-side State holds composureState between rounds and passes it back with each request.
- L3 has 59 tests (was 57 before SS-088 acceptance tests added).
- SS-088 DONE. Backlog updated.
