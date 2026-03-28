# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code session close)
# For: Claude.ai pickup on next session start

---

## What shipped this session

### SS-065 — PANEL_POOL + drawPanel (DONE)
PANEL_POOL and drawPanel() added to js/characters.js. Pool = all characters except Attenborough. Draw = 4 or 5 at random. Tested in L1 (85 pass). domain-characters.test.js added to pipeline L1.

### SS-082 — Gordon Lyons on I've Been Bit panel (DONE)
Character doc: docs/characters/gordon-lyons.md. Added to CHARACTERS_WORST. Panel order now: Ray, Fox, O'Shea, Stevens, Bear, Gordon, Hales, Cody. L1 tests added to domain-worst.test.js.

### SS-084 — Bear/teacher/dead snake chip (DONE)
Chip added to #chips-scenario in whats-the-worst.html. Data-only.

### SS-080 + SS-081 — O'Shea and Stevens on main panel (DONE)
Both added to CHARACTERS in js/characters.js. Auto-included in PANEL_POOL. Eligible for random draw on all main panel modes.

### SS-058 — Per-character coloured card backgrounds (DONE)
CHAR_COLOURS map exported from js/characters.js. char-${charId} class applied in ui.js and ui-worst.js. CSS (rgba tints) added to all 3 panel sections in cusslab/worker.js. Both repos pushed.

---

## Backlog items DONE this session
SS-065, SS-082, SS-084, SS-080, SS-081, SS-058

## New items raised this session
SS-084 (done), SS-085 (The Doors roast+inversion research), SS-086 (chip stimulus review, blocked on SS-085), SS-087 (Cusslab crossover protagonists), SS-088 (panel emotional state model — LieEngine port)

---

## Pipeline state
GREEN — L0, L1 (85), L2 (14), L3 (49), L4 (240), L5 SKIP.

---

## Open backlog (top items by CD3)

| CD3 | Item |
|-----|------|
| 27 | SS-029 — Shareability / screenshot |
| 27 | SS-085 — Roast + inversion (The Doors) |
| 27 | SS-087 — Cusslab crossover protagonists |
| 27 | SS-088 — Panel emotional state model |
| 18 | SS-078 — Corridor send-offs (parallel session) |
| 18 | SS-012 — Irwin Memorial Encounter |
| 18 | SS-006 — Temporal Lens mechanic |

---

## Open WL items
WL-SS-011, WL-SS-012, WL-SS-002, WL-SS-003, WL-SS-006, WL-SS-013

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing. Panel now richer (Gordon, O'Shea, Stevens in pool). Characters have colour identity.
Next: SS-029 shareability.

---

## Architecture notes for Claude.ai

- PANEL_POOL is canonical for panel-eligible characters (js/characters.js). PANEL_IDS kept for compat.
- characters-worst.js has its own fixed panel — Gordon is there. O'Shea + Stevens were already there.
- characters.js main panel — oshea and stevens now in PANEL_POOL.
- worker.js is in /home/rodent/cusslab/ — all SS HTML inlined there. SS source files are dev source of truth.
- SS-088: Cusslab primitives identified: lie-engine.js, temperament-service.js, ff-engine.js. None ported yet.
- SS-078/085/087 were in a parallel session. Check that session's state too.

---

## Decisions made this session

DECISION 2026-03-28: SS-065 pool before character adds — avoids hardcoded panel debt.
DECISION 2026-03-28: SS-088 deferred — LieEngine port needs dedicated session.
DECISION 2026-03-28: Card colours use rgba tints (12-20% opacity) — survival aesthetic.

---

## Top 3 for next session

1. SS-029 — Shareability: screenshot + share link. Direct HDD evidence.
2. SS-085 — Roast + inversion research (The Doors). No code — character research.
3. SS-088 — Panel emotional state model design session.

---

## Session goal for next session

Get a share mechanic live (SS-029). Let someone share something and observe the response.

---

## Live features

| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live |
| I've Been Bit, Guys | /survival-school/worst | Live — Gordon now on panel |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live |
| Bear Fact-Checker | /survival-school/fact-checker | Live |
| The Coyote Index | /survival-school/coyote | Live |
| Panel Q&A | /survival-school/panel-qa | Live |
| I've Had Worse | /survival-school/ive-had-worse | Live |
| The Rooms | /survival-school/rooms | Live |

Worker: cusslab-api.leanspirited.workers.dev
Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml
