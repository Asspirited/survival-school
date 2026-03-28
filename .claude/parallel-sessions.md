# Parallel Sessions — Survival School
# How two Claude Code sessions work simultaneously without collision
# Created: 2026-03-28

---

## THE PROBLEM

Two Claude Code sessions editing the same files will produce git conflicts,
broken tests, and wasted time. This document defines how to partition work
so two sessions can run in parallel safely.

---

## COLLISION MAP — files that cause conflicts

These are the files where most work lands. Two sessions editing the same
file = guaranteed merge conflict.

### HIGH COLLISION RISK (never edit from both sessions simultaneously)
| File | What it contains | Who touches it |
|------|-----------------|----------------|
| `js/characters.js` | All character voice profiles, PANEL_POOL, CHAR_COLOURS | Any character or panel work |
| `index.html` | Homepage tiles, nav, CSS | Any new feature or UI change |
| `tests/ui/ui.test.js` | All Playwright UI tests (276 tests) | Any feature that needs UI tests |
| `tests/acceptance/acceptance.test.js` | All L3 acceptance tests | Any new route or feature |
| `tests/domain.test.js` | Domain unit tests | Any character or mechanic change |
| `docs/backlog.md` | Backlog status updates | Both sessions at close |

### MEDIUM RISK (edit from both only if touching different sections)
| File | What it contains |
|------|-----------------|
| `js/scenarios.js` | Chip data per feature |
| `js/animals.js` | Animal database entries |

### SHARED WORKER (lives in /home/rodent/cusslab/)
| File | What it contains |
|------|-----------------|
| `/home/rodent/cusslab/worker.js` | Cloudflare Worker — system prompts, routes, all server logic |

**worker.js is the single biggest collision risk.** It contains every feature's
system prompt, every character's IHW object, every route handler. Two sessions
editing worker.js simultaneously = disaster.

---

## THE RULE: SPLIT BY LAYER, NOT BY FEATURE

**Wrong approach:** Session A does "SS-098 Fish Disposition Engine end-to-end"
while Session B does "SS-096 Wade chips end-to-end." Both touch worker.js,
characters.js, tests — collision.

**Right approach:** Split by what files each session owns.

---

## PARTITION STRATEGY

### SESSION A: "Design + Docs + Domain" (DDD loop items)
**Owns:** docs/, js/characters.js, js/scenarios.js, js/animals.js, domain tests
**Does NOT touch:** worker.js, HTML pages, UI tests, acceptance tests

Session A works on:
- Design docs (docs/domains/, docs/characters/)
- Character voice profiles in js/characters.js
- Chip data in js/scenarios.js
- Domain unit tests (tests/domain*.test.js)
- Backlog/waste-log updates for its own items

**Good items for Session A (DDD loop, no worker/HTML):**
| CD3 | Item | Why safe |
|-----|------|----------|
| 27 | SS-098 — Fish Disposition Engine (design doc + characters.js dispositions) | New mechanic design, touches characters.js only |
| 18 | SS-063 — Panel archetypes design doc | Pure docs |
| 18 | SS-070 — Ant Middleton character | characters.js + domain test + character doc |
| 18 | SS-071 — Andy McNab character | characters.js + domain test + character doc |
| 18 | SS-072 — Chris Ryan character | characters.js + domain test + character doc |
| 18 | SS-097 — Eric Bristow character | characters.js + domain test + character doc |
| 18 | SS-006 — Temporal Lens mechanic (design doc) | Pure docs |
| 12 | SS-086 — Review SS-085 roast material for chip stimulus | Pure docs/data review |
| 8 | SS-079 — Roy Keane character | characters.js + domain test + character doc |

### SESSION B: "Build + Wire + Test" (BDD/TDD loop items)
**Owns:** worker.js, HTML pages, acceptance tests, UI tests
**Does NOT touch:** js/characters.js, docs/characters/, domain tests

Session B works on:
- Worker routes and system prompts in worker.js
- HTML pages (new or existing)
- Acceptance tests (tests/acceptance/)
- UI/Playwright tests (tests/ui/)
- Backlog/waste-log updates for its own items

**Good items for Session B (BDD/TDD, worker + HTML):**
| CD3 | Item | Why safe |
|-----|------|----------|
| 27 | SS-087 — Cusslab crossover: wire into The Doors | worker.js routes + HTML |
| 18 | SS-083 — Morrison mid-session interruption | worker.js system prompt mechanic |
| 12 | SS-096 — Wade predicament chips | worker.js chips (data-only, no new code paths) |
| 12 | SS-077 — Room-specific guiding copy | HTML page updates |
| 12 | SS-054 — One Man In feature | New route + HTML + worker |
| 12 | SS-013 — Packham Ethical Override | worker.js system prompt |
| 12 | SS-047 — App footer | HTML + CSS only |
| 8 | SS-060 — Cross-character panel references | worker.js schema |
| 3.2 | SS-068 — New Rooms (Dead Parrot etc.) | New HTML pages + worker routes |

---

## HANDOFF PROTOCOL

### Before starting parallel sessions:
1. Both sessions pull latest: `git -C /home/rodent/survival-school pull`
2. Agree which session is A (design/domain) and which is B (build/wire)
3. Each session states which files it will touch — Rod confirms no overlap

### During parallel work:
- **Session A commits and pushes first** when both are ready
- Session B pulls after A pushes, resolves any minor conflicts, then pushes
- If either session discovers it needs a file owned by the other: **STOP and tell Rod**
- Never silently edit a file outside your partition

### The characters.js → worker.js dependency:
New characters need voice profiles (Session A: characters.js) AND worker IHW objects
(Session B: worker.js). This is the most common cross-partition dependency.

**Resolution:** Session A lands the character in characters.js + domain tests first.
Session A pushes. Session B pulls, then wires the character into worker.js.
They do NOT work on the same character simultaneously.

### Backlog + waste log:
- Each session updates status for its own items only
- Session that pushes last is responsible for resolving any backlog.md conflicts
- Conflicts in backlog.md are always additive (status changes) — safe to merge both

### Pipeline:
- Each session runs its own layer of tests before pushing:
  - Session A: L1 domain tests (`npm test -- tests/domain`)
  - Session B: L2 contract + L3 acceptance + L4 UI
- Full pipeline (L0–L4) runs after both have pushed, before declaring session green

---

## WHAT TO DO WHEN THE SPLIT DOESN'T FIT

Some items span both partitions (e.g., SS-090 Cox+Faldo needs characters.js AND
worker.js AND new tests). For these:

1. **Don't split the item across sessions.** One session does it end-to-end.
2. The other session works on items that don't touch the same files.
3. If both sessions need worker.js: one session pauses or works on docs/data until
   the other has pushed its worker.js changes.

---

## RECOMMENDED FIRST PARALLEL SESSION

**Session A (you're reading this):**
- SS-098 — Fish Disposition Engine design doc (docs/domains/fish-disposition.md)
- SS-098 — Add disposition field to Cox, Faldo, Jim, Jeremy in js/characters.js
- SS-070 — Ant Middleton character (characters.js + docs/characters/middleton.md + domain test)
- SS-071 — Andy McNab character (same pattern)
- SS-072 — Chris Ryan character (same pattern)

**Session B (other terminal):**
- SS-096 — Wade predicament chips (worker.js only — data addition, no new code paths)
- SS-077 — Room-specific guiding copy (HTML pages only)
- SS-047 — App footer (index.html + CSS — Session A must NOT touch index.html)
- SS-040 — L5 OAT definition (tests/ only, new file)

**No file overlap. Both can commit and push independently.**
