# Shared Session State — Survival School
# Written: 2026-03-29 (Session A close — quotes + character memories)
# Supersedes: 2026-03-29 (Session A close — Packham + Doors design)

---

## What shipped this session (Session A)

### SS-143 — Common quotes attribute (CD3 18)
- `quotes` arrays added to all 28 characters in js/characters.js
- 3–7 quotes per character, 140+ total
- Verbal tics, sentence openers, signature phrases — not just catchphrases
- Variety per Rod's steer: multiple per character, usable in good and bad contexts
- 31 new domain tests, all green
- Gherkin at features/common-quotes.feature

### SS-115–119 — Rod's Memory: 5 characters (Billy, Ollie, Coyote, Ryan, McNab)
- New pattern established: Claude researches stories, Rod adds memories, compare notes
- Billy: Rod's verbatim + Eastwood encounter, Tom Cruise headlock, hostage rescue, upbringing
- Ollie: Rod's verbatim + Iraq contract work, child trafficking, break point, grey man
- Coyote: Rod's verbatim (careful replacement IS the character) + sting progression, hot dogs
- Ryan: Rod's verbatim ("insane endurance, books meh") + 300km escape detail, four contradictory accounts
- McNab: Rod's verbatim ("black tape across eyes", hard as nails) + Harrods bag, torture, literacy

### SS-145 — Armed forces distinction map (new design doc)
- docs/armed-forces-distinction-map.md
- One HANDLE per SF character to prevent voice blur:
  - Billy = THE ASSESSOR (grades against a standard)
  - Ollie = THE ADMITTER (says what nobody else will)
  - Fox = THE TACTICIAN (maps threats everywhere)
  - McNab = THE REPORTER (files everything flat)
  - Ryan = THE COMPETITOR (had less, walked further)
  - Middleton = THE EVANGELIST (MINDSET is the technique)
  - Craighead = THE AUTONOMOUS OPERATOR (no chain of command)
- Rod confirmed handles, noted need to amplify/exaggerate for comedy

### SS-144 — Invented catchphrases mechanic (RAISED, open)
- Rod's idea: characters confidently quoting things they never said
- "As I always say: sweaty onion bags." Panel: "You've never said that."
- Pure ConspireEngine — Rod's favourite comedy pattern
- Idea snapshot at /mnt/c/Users/roden/Downloads/idea-invented-catchphrases-2026-03-29.md

---

## Worker state
- Last deployed hash: 128fdb6 (unchanged — Session A is docs/domain only)
- Worker: cusslab-api.leanspirited.workers.dev

---

## Pipeline state
L0-L5 GREEN at startup. L1: 333 tests (up from 302, +31 quotes tests). Session A only ran L1.

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: Quotes give LLM concrete anchors. Distinction map sharpens SF voices. Both improve shareability.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- Character memory pattern: research first, Rod adds, compare notes, both into doc
- SF distinction map: seven handles to prevent voice blur (Rod confirmed)
- Invented catchphrases mechanic: ConspireEngine feature, Rod's idea (SS-144)

---

## Top 3 for next session
1. SS-120–127 — Rod's Memory: remaining 8 characters (same research+memory pattern)
2. SS-013 — Packham Ethical Override (Session B, CD3 12)
3. SS-144 — Invented catchphrases mechanic design (Session A, CD3 12)

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- Doors UI: design doc ready, Session B to build (worker.js HTML)
- Pre-flight updated: docs/armed-forces-distinction-map.md added to cat command
- Character research+memory pattern confirmed as standard workflow

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
| One Man In | /survival-school/one-man-in | Live |
