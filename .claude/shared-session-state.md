# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code Stream B close — composure wiring + mutual agreement)
# Supersedes: Session A close (Hawking + Lee + Composure Engine, same date)

---

## What shipped this session (Stream B)

### SS-101 — Wire composure engine into worker.js (DONE)
- Worker routes `/ive-had-worse` and `/in-my-defence`: accept composureState, inject into prompt, parse JSON, compute deltas, return updated state
- Client-side IHW + IMD: State.composureState added, sent in fetch, persisted across rounds
- PACT contract updated: composureState required in IHW + IMD schema
- IMD POST interaction added to PACT contract

### SS-090 — Cox+Faldo mutual agreement mechanic (DONE)
- Replaced "never both in the same panel" with MUTUAL AGREEMENT mechanic
- When both cox and faldo drawn: they agree on something both are completely wrong about
- Experts observe in visible discomfort, do not intervene
- Fires on both IHW and IMD system prompts

### Session A (parallel) also shipped:
- SS-087 — Hawking + Bruce Lee crossover (characters.js + domain tests)
- SS-100 — Composure engine port to characters.js (COMPOSURE_PROFILES + 21 domain tests)

---

## Worker state
- Last deployed hash: 86078dd
- Worker: cusslab-api.leanspirited.workers.dev
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L0-L4 GREEN. 574 tests, 0 failures. L5 OAT not yet defined.

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: Composure engine live across IHW/IMD/assess. Mutual agreement mechanic adds shareable comedy.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- SS-013 (Packham) blocked — needs character in characters.js first
- Deploy token: /home/rodent/.cf-deploy-token — never ask Rod, just source and deploy

---

## Top 3 for next session
1. SS-099 — Morrison contextual trigger (CD3=6, worker-only)
2. SS-091 — Cox+Faldo argue with no expert (CD3=18)
3. SS-097 — Eric Bristow character (CD3=18, DDD)

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- SS-013 blocked: needs Packham character profile

---

## Live features
| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live — composure active |
| I've Been Bit, Guys | /survival-school/worst | Live |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live |
| Bear Fact-Checker | /survival-school/fact-checker | Live |
| The Coyote Index | /survival-school/coyote | Live |
| Panel Q&A | /survival-school/panel-qa | Live |
| The Doors (corridor) | /survival-school/rooms | Live |
| I've Had Worse (Room 13) | /survival-school/ive-had-worse | Live — composure + mutual agreement |
| In My Defence (Room 14) | /survival-school/in-my-defence | Live — composure + mutual agreement |
