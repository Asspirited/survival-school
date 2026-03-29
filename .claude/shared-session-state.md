# Shared Session State — Survival School
# Written: 2026-03-29 (Claude Code Session A close — Design + Docs + Domain)
# Supersedes: 2026-03-28 Session C close (OAT/NFT + character doc gap)

---

## What shipped this session (Session A — 2026-03-29)

### SS-006 — Temporal Lens mechanic (DONE)
- `docs/domains/temporal-lens.md` + TEMPORAL_LENS in characters.js
- Eligible: hales, attenborough. Candidates: hawking, lee, bristow.
- 25 domain tests

### SS-063 — Panel archetypes (DONE)
- `docs/panel-archetypes.md`: 6 archetypes (Core Four, Contradictors, Authority Room, Enthusiasts, Darwin Round, Pub Panel)
- 5 open Three Amigos questions for Rod

### SS-097 — Eric Bristow (DONE)
- characters.js + character doc. Fish: CONFIDENT_IGNORAMUS. Temporal Lens candidate (sensitive — not activated).

### SS-079 — Roy Keane (DONE)
- characters.js + character doc. Fish: CONTEMPTUOUS_EXPERT. Dismissive archetype.

### SS-039 — Latin/indigenous naming (DONE)
- `docs/domains/latin-indigenous-naming.md` + NAMING_CONVENTIONS for 24 chars + buildNamingConventionInjection()
- 13 domain tests

### SS-086 — Roast review (DONE)
- `docs/ss-086-roast-review.md`. SS-115/116 raised.

### SS-115 — Complicating factors (DONE)
- Gherkin + UI in worker.js (How Screwed Am I). 6 chips, multi-select. Needs deploy.

### SS-116 — Data-only chips (DONE)
- 2 IHW + 3 PQA + 1 Fact-Checker chips in worker.js. Needs deploy.

### SS-117 — Gordon Lyons gap fix (DONE)
- CHARACTERS entry added. Was missing despite SS-082 DONE.

### 12 character docs (background agents)
- billy, ollie, craighead, coyote, middleton, mcnab, ryan, cox, faldo, hawking, lee, jim-carrey
- Rod's Memory NOT YET CAPTURED on all

---

## Pipeline state
L1: 257 tests, 0 failures (GREEN)
L2: Haiku flake on IHW — GREEN on re-run

---

## Open WL items (unchanged)
WL-SS-002, WL-SS-003, WL-SS-006, WL-SS-011, WL-SS-012, WL-SS-013, WL-SS-019–023

---

## HDD status
HDD-001: OPEN / Advancing.
Next: Get a real person to share a panel output with someone specific in mind.

---

## Decisions
- Bristow Temporal Lens: candidate, NOT activated (2015 comments sensitive)
- Attenborough in Temporal Lens despite not deceased — Rod to confirm
- Gordon gap fixed silently (data oversight)

---

## Top 3 for next session
1. SS-102–114 — Character docs review (12 written)
2. SS-068 — New Rooms
3. SS-054 — "One Man In"

---

## Carry-forward
- Wade, Bristow, Keane: Rod's verbatim memories not yet captured
- Darwin + Irwin: not in characters.js yet
- NAMING_CONVENTIONS + TEMPORAL_LENS: not yet wired into worker system prompts
- Complicating factors + SS-116 chips: in worker.js, need deploy to go live
- Middleton, McNab, Ryan, Hawking, Lee: in characters.js, NOT in worker.js
- L2: known occasional Haiku flake
