# Shared Session State — Survival School
# Written: 2026-03-29 (Claude Code Stream B close — pipeline + mechanics + Irwin)
# Supersedes: Session B 2026-03-29 (character doc completion)

---

## What shipped this session (Stream B)

### SS-040 — L5 OAT pipeline (DONE)
- L5 Operational Acceptance Testing: 26 tests covering liveness (all 13 GET routes), schema (POST /assess + /ive-had-worse), performance (<5s GET, <30s POST), security (no secrets in responses)
- Wired into pipeline-report.sh — pipeline now L0–L5, 647 tests total

### SS-091 — Cox+Faldo ARGUMENT mechanic (DONE)
- When both Cox and Faldo in panel with NO expert present, they argue (not agree)
- Expert charIds: ray, bear, fox, hales, cody, stroud, stevens, jeremy
- MUTUAL AGREEMENT now gated on expert presence

### SS-012 — Irwin Memorial Encounter (DONE)
- New page at /survival-school/irwin-memorial
- Steve finds the animal, user watches, panel rates nerve (nerve_score 1-10)
- Stingray Rule fires client-side. Tribute framing enforced. Homepage tile LIVE.

### SS-020 — Cody Override mechanic (DONE)
- Fires when Cody in panel + dangerously wrong survival advice
- Simultaneous Packham override: Ray silent, Bear does it anyway, Hales correct version

### SS-047 — App footer (DONE)
- Footer on homepage: wordmark, tagline, attribution

### SS-077 — Room-specific guiding copy (DONE)
- IHW: "Think small" hint. IMD: "Pick something indefensible" hint.
- Remaining rooms pending SS-068.

### SS-099 — Morrison contextual trigger (DONE)
- Trigger words (door, death, snake, the end, desert, poetry etc.) → ~80% Morrison appearance
- Both IHW and IMD

---

## Worker state
- Last deployed hash: 128fdb6
- Worker: cusslab-api.leanspirited.workers.dev
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L0-L5 GREEN. 647 tests, 0 failures. Known Haiku flake on L2 (passes on rerun).

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: Irwin Memorial adds shareable mode. Morrison contextual trigger improves comedy timing.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- Expert charIds for argument/agreement gating: ray, bear, fox, hales, cody, stroud, stevens, jeremy
- SS-077 partially done — IHW/IMD only, remaining rooms when SS-068 ships
- SS-013 (Packham) still blocked — needs character profile in characters.js first

---

## Top 3 for next session
1. SS-054 — "One Man In" EXFIL/INFIL mode (CD3=12, new feature)
2. SS-060 — Cross-character panel references (CD3=8)
3. SS-013 — Packham Ethical Override (CD3=12, BLOCKED by character profile)

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- SS-013 blocked: needs Packham character profile in characters.js

---

## Live features
| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live — footer added |
| How Screwed Am I? | /survival-school/app | Live |
| I've Been Bit, Guys | /survival-school/worst | Live |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live |
| Bear Fact-Checker | /survival-school/fact-checker | Live |
| The Coyote Index | /survival-school/coyote | Live |
| Panel Q&A | /survival-school/panel-qa | Live |
| The Doors (corridor) | /survival-school/rooms | Live |
| I've Had Worse (Room 13) | /survival-school/ive-had-worse | Live — all mechanics |
| In My Defence (Room 14) | /survival-school/in-my-defence | Live — all mechanics |
| Irwin Memorial Encounter | /survival-school/irwin-memorial | Live — NEW this session |
