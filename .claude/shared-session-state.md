# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code session close)
# For: Claude.ai pickup on next session start

---

## What shipped this session

### WL-SS-017 — Animal Deathmatch non-functional (FIXED)
Root cause found and fixed: `statLines.join('\n')` inside the outer template literal
`SURVIVAL_SCHOOL_DEATHMATCH`. The `\n` in the template literal is an escape sequence
that produces a literal newline character — which appeared inside a single-quoted JS
string in the browser output. SyntaxError: Invalid or unexpected token. Script crashed
before `buildChips()` ran. Chips never rendered. Fight never fired.

Fix: `'\n'` → `'\\n'`. Browser now receives `'\n'` (correct escape). Deployed.

### WL-SS-018 — 54 L4 Playwright failures (ALL FIXED)
Three root causes:
1. Deathmatch JS syntax error (see WL-SS-017 above)
2. Cascade test: expected step-evt visible after location click — wrong. Location click
   shows step-cond. Condition click shows step-evt. Test fixed.
3. Worst page: animal chips removed (SS-032). Test still checked #chips-animal. Removed.
4. CLEAR didn't clear #chips-scenario. clearAll() now includes clearChips('scenario').

Pipeline: L0-L4 all GREEN. 201 UI tests passing, 0 failing.

### Also deployed this session
- charId schema: explicit charIds in assessment/mundane/reaction OUTPUT prompts (WL-SS-014 permanently fixed)
- Mobile logo CSS: height 18px, width auto
- LOCATION_GROUPS escape fix: `\'` → `\\'` in template literal strings
- animal/circ chips removed from worst page (SS-032 properly done)
- tests/ui/ui.test.js committed to survival-school repo for first time (was in filesystem, not git)

---

## Backlog items DONE this session
None (diagnostic + bug fix session)

---

## Pipeline state
GREEN — L0 auth canary, L1 unit (55), L2 contract (9), L3 acceptance (30), L4 UI (201). L5 SKIP.
WL-SS-017 closed. WL-SS-018 closed.

---

## Open backlog (top items by CD3)

| CD3 | Item |
|-----|------|
| 27 | SS-029 — Shareability / screenshot |
| 18 | SS-009 — Mode A: Panel Q&A |
| 18 | SS-006 — Temporal Lens mechanic |
| 18 | SS-012 — Irwin Memorial Encounter (standalone page) |
| 12 | SS-047 — App footer: logo, stamp, About link |
| 12 | SS-054 — One Man In (Craighead) |
| 12 | SS-013 — Packham Ethical Override |
| 12 | SS-020 — Cody Override mechanic |

---

## Open WL items
- WL-SS-011: SSH auth declared broken without checking
- WL-SS-012: Claude "I'll fix it permanently" apology loop
- WL-SS-002: Shared state claimed GitHub repo existed — it didn't
- WL-SS-003: wrangler.jsonc at /home/rodent/ routes to wrong worker
- WL-SS-006: Session startup skipped repeatedly
- WL-SS-013: Deploy treated as auth event

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with
specific people in mind."
Status: OPEN / Advancing.
Evidence unchanged since last session. No new HDD evidence this session (diagnostic only).
Next: SS-029 shareability — screenshot + share. Measures actual sharing behaviour.

---

## Decisions made this session

DECISION 2026-03-28: Playwright failures investigated at session start before any feature
work — correct priority. Pipeline GREEN is a pre-condition for building.

DECISION 2026-03-28: statLines.join fix deployed without Gherkin gate — this is a bug fix
on a broken feature (deathmatch was non-functional). Existing L4 tests cover chip rendering.

---

## Top 3 for next session

1. SS-029 — Shareability: screenshot + share link. Highest CD3 open, most direct HDD evidence.
2. SS-047 — App footer: logo, stamp, About link.
3. SS-012 — Irwin Memorial Encounter. Steve finds the animal. Panel rates your nerve.

---

## Session goal for next session

Get a share mechanic live (SS-029). Let someone share something and observe the response.

---

## Live features

| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live |
| I've Been Bit, Guys | /survival-school/worst | Live |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live — FIXED (was broken since deploy) |
| Bear Fact-Checker | /survival-school/fact-checker | Live |
| The Coyote Index | /survival-school/coyote | Live |

Worker: cusslab-api.leanspirited.workers.dev
Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Notes for Claude.ai

- Deathmatch is now properly functional. Category tabs, chip selection, FIGHT should all work.
- tests/ui/ui.test.js is now committed to survival-school repo.
- The debug-deathmatch.test.js is still in tests/ui/ (it's a useful diagnostic tool — keep it).
- Two copies of buildSystemPrompt in worker.js (APP + WORST). Any system prompt change
  must use replace_all: true or edit both explicitly.
- SS-047 (footer) not done — deferred again.
- Irwin Memorial tile is SOON — the standalone /survival-school/irwin page doesn't exist yet.
