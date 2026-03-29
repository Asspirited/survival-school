# Shared Session State — Survival School
# Written: 2026-03-29 (Session A close — Packham + Doors design)
# Supersedes: 2026-03-29 (Stream B close — pipeline + mechanics + Irwin)

---

## What shipped this session (Session A)

### Packham character profile (unblocks SS-013)
- Full CHARACTERS entry in js/characters.js: voice, integrity (NEGOTIATE-THROW), incidents, deathLine
- CHAR_COLOURS: #2D5A27 (punk green)
- COMPOSURE_PROFILES: baseline 8, punk surfaces under pressure
- NAMING_CONVENTIONS: common name + conservation status, naming is advocacy
- 10 relationship entries in SHARED_CONTEXT
- 12 domain tests, all green
- No fish property (expert, not fish-out-of-water)
- SS-013 Ethical Override is now UNBLOCKED for Session B wiring

### SS-130–SS-137 — 8 new room concepts (backlog)
- SS-130: The Apology Tour
- SS-131: The Alibi
- SS-132: The Intervention
- SS-133: The Expert Witness
- SS-134: The Pitch
- SS-135: If You Had To...
- SS-136: Which Is Worse
- SS-137: Who Would Die First
- All need Three Amigos + CD3 scoring

### SS-138 — Doors corridor UI redesign (design doc)
- Design doc at docs/doors-ui-redesign.md
- Jim Morrison as "off-piste carnival barker" — conversational, warm-but-ominous
- Door tiles: room names replace numbers, gold Crimson Text italic teasers
- Locked doors visible with teasers
- The Argument (12A) and Going With It (15) flagged as potentially weaker rooms

---

## Worker state
- Last deployed hash: 128fdb6 (unchanged — Session A is docs/domain only)
- Worker: cusslab-api.leanspirited.workers.dev
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L0-L5 GREEN. 269 L1 domain tests (up from 257). L2 known Haiku flake (passes on rerun).

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: 8 new room concepts expand shareable comedy range. Doors UI redesign improves discoverability.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- Jim Morrison = "off-piste carnival barker" for Doors corridor (not a quote rotator)
- Door tiles show room names + gold Crimson Text italic teasers (numbers removed)
- The Argument + Going With It flagged as potentially weaker — may be replaced after Three Amigos
- 8 new room concepts raised, all need CD3 scoring
- Packham is an expert character, not fish-out-of-water (no fish property)

---

## Top 3 for next session
1. SS-013 — Wire Packham Ethical Override into worker.js system prompts (Session B)
2. SS-138 — Build Doors corridor UI redesign (Session B)
3. Three Amigos — Score SS-130–SS-137, decide which rooms make the corridor

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- Rod's Memory items SS-115–SS-127: 13 characters need verbatim personal memories
- Doors UI: design doc ready, Session B to build (worker.js HTML)
- Pre-flight updated: docs/doors-ui-redesign.md added to cat command

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
| Irwin Memorial Encounter | /survival-school/irwin-memorial | Live |
