# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code session close — Fish Disposition Engine + 3 characters)
# Supersedes: Jim Carrey + Jeremy Wade session state

---

## What shipped this session

### SS-098 — Fish Disposition Engine (DONE)
- `docs/domains/fish-disposition.md`: full design doc — 6 dispositions, shift mechanic, per-character canon
- `js/characters.js`: FISH_DISPOSITIONS constant, DISPOSITION_SHIFTS, drawDisposition(), buildDispositionState(), buildFishDispositionInjection(), shiftDisposition() — all exported
- Cox tagged fish: default EXCITABLE_NOVICE, weights 50/30/20
- Faldo tagged fish: default CONTEMPTUOUS_EXPERT, weights 50/30/20
- Jim tagged fish: fixed EXCITABLE_NOVICE
- Jeremy tagged fish: default RELUCTANT_CONSCRIPT, weights 60/40 with TOTAL_DENIAL
- 42 new domain tests — all passing

### SS-070 — Ant Middleton (DONE)
- `js/characters.js`: full voice profile, "Madhouse" chaos engine, aggressive optimism
- av=AM, avClass=av-bark, CHAR_COLOURS=#5C4033
- Integrity: ENJOY-ADJACENT (would throw the spear but needs everyone to know why)
- Relationships: Bear ally, Billy has a position, Ray quietly appalled
- Domain tests added

### SS-071 — Andy McNab (DONE)
- `js/characters.js`: full voice profile, Bravo Two Zero patrol commander
- av=McN, avClass=av-green, CHAR_COLOURS=#3B3B3B
- Integrity: GONE (operational extraction)
- Comedy engine: forensic specificity, grid references, corrects Ryan's account flat
- THE DISAGREEMENT mechanic with Ryan: "That's not quite how it went."
- Domain tests added

### SS-072 — Chris Ryan (DONE)
- `js/characters.js`: full voice profile, sole survivor framing
- av=CR, avClass=av-blue, CHAR_COLOURS=#4A5D3A
- Integrity: GONE (300km gone — the furthest gone of anyone on the panel)
- Comedy engine: every predicament, he's been in a worse one. Alone. At night. In Iraq.
- Counter-McNab: "That depends on which account you read." Small smile. Matter open.
- Domain tests added

### Cox + Faldo added to characters.js (previously worker-only)
- Full voice profiles, av/avClass, CHAR_COLOURS, fish properties
- Cox: napkin deployment, thermodynamic irrelevance, D:Ream keyboard player
- Faldo: golf methodology, "address the problem, head down, follow through", grip pressure tell

### Parallel session protocol
- `.claude/parallel-sessions.md`: instructions for running two Claude Code sessions without collision
- Split by layer: Session A owns characters.js/docs/domain tests, Session B owns worker.js/HTML/UI tests

---

## Worker state
- Last deployed hash: 1d3527c1 (unchanged — this session was domain-only)
- Worker: cusslab-api.leanspirited.workers.dev
- Valid charIds in worker: ray, bear, fox, hales, cody, stroud, stevens, cox, faldo, jim, jeremy
- New charIds in characters.js NOT yet in worker: middleton, mcnab, ryan
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L1 domain: 180 tests, 0 failures. L2-L4 not run this session (Session A partition — domain only).
Full pipeline was GREEN at session start (467 tests).

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: McNab/Ryan disagreement mechanic + Fish Disposition Engine = richer shareable dynamics.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- DECISION 2026-03-28: Parallel session protocol — split by layer, not feature
- DECISION 2026-03-28: Cox + Faldo added to characters.js (previously worker-only)
- DECISION 2026-03-28: TOTAL_DENIAL added as 6th disposition (backlog listed 5)

---

## Top 3 for next session
1. SS-087 — Cusslab crossover: non-survivalists through The Doors (CD3=27, now unblocked)
2. SS-090 — Cox + Faldo vehement mutual agreement (CD3=18, now unblocked)
3. SS-097 — Eric Bristow character (CD3=18)

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Jim character doc: docs/characters/jim.md not yet created
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js — Session B needs to wire them
- Fish Disposition Engine: characters.js functions ready, worker.js integration pending (dispositionState in request/response)
- L2 contract test: known occasional Haiku flake (non-JSON first call, passes on rerun)
- Cox + Faldo: now in both characters.js AND worker.js (worker had them already for IHW)

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
