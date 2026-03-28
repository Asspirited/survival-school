# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code Session A close — Hawking + Lee + Composure Engine)
# Supersedes: Session B close (Wade chips + Morrison interruption, same date)

---

## What shipped this session (Session A — late 2026-03-28)

### SS-087 — Cusslab crossover: Hawking + Bruce Lee (DONE)
- `js/characters.js`: Stephen Hawking + Bruce Lee full voice profiles, integrity, incidents, fish dispositions, CHAR_COLOURS, SHARED_CONTEXT relationships
- Hawking: av=SH, avClass=av-blue, CHAR_COLOURS=#0d0d2b, fish default=CONVERT
- Lee: av=BL, avClass=av-yellow, CHAR_COLOURS=#8B6914, fish default=CONTEMPTUOUS_EXPERT
- 18 new domain tests — all passing
- No dedicated crossover room — they join existing panel pool like Cox/Faldo

### SS-100 — Composure Engine ported to characters.js (DONE)
- `js/characters.js`: COMPOSURE_PROFILES for all 24 characters, initComposureState(), computeComposureDeltas(), composureTier(), buildComposureInjection() — all exported
- Ported from Cusslab worker.js plus 13 new profiles for SS-only characters
- 21 new domain tests — all passing
- Worker wiring pending as SS-101 (Session B work)

### New backlog items raised
- SS-100 — Port composure engine to characters.js (DONE this session)
- SS-101 — Wire composure into worker.js (Open, Session B, depends on SS-100)

---

## What shipped earlier today (Session B — same date)
- SS-096: Wade predicament chips (5 chips in worker.js)
- SS-083: Jim Morrison mid-session interruption (~20% chance, IHW + IMD)
- SS-098: Fish Disposition Engine (Session A, earlier)
- SS-070/071/072: Middleton, McNab, Ryan characters (Session A, earlier)

---

## Worker state
- Last deployed hash: e90469c (Session B — Wade chips + Morrison)
- Worker: cusslab-api.leanspirited.workers.dev
- Valid charIds in worker: ray, bear, fox, hales, cody, stroud, stevens, cox, faldo, jim, jeremy
- New charIds in characters.js NOT yet in worker: middleton, mcnab, ryan, hawking, lee
- Composure engine functions in characters.js, NOT yet wired into worker (SS-101)
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L1 domain: 219 tests, 0 failures (Session A partition).
Session B reported: L1 37, L2 14, L3 60, L4 276 — GREEN.
Full pipeline GREEN at session start (529 tests).

---

## Open WL items (unchanged)
WL-SS-002, WL-SS-003, WL-SS-006, WL-SS-011, WL-SS-012, WL-SS-013, WL-SS-019–023

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: Hawking + Lee crossover, composure engine, Morrison flip, Wade chips = richer shareable dynamics.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- DECISION 2026-03-28: SS-087 simplified — no dedicated crossover room, characters join existing pool
- DECISION 2026-03-28: Composure port split: SS-100 (characters.js, Session A) + SS-101 (worker.js, Session B)
- DECISION 2026-03-28: SS-088 stays DONE; composure functions tracked as SS-100/101

---

## Top 3 for next session
1. SS-101 — Wire composure into worker.js (Session B)
2. SS-097 — Eric Bristow character (Session A, CD3=18)
3. SS-063 — Panel archetypes design (Session A, CD3=18)

---

## Carry-forward
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Jim character doc: docs/characters/jim.md not yet created
- Middleton, McNab, Ryan, Hawking, Lee: in characters.js but NOT in worker.js
- Composure engine: characters.js ready, worker.js integration pending (SS-101)
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- Morrison mechanic live on IHW + IMD only
- L2 contract test: known occasional Haiku flake

---

## Live features
| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live |
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
