# Shared Session State — Survival School
# Written: 2026-03-30 (Session close — Robin Williams + design docs)
# Supersedes: 2026-03-30 (Session close — Session A: 9 design + domain items)

---

## What shipped this session

### SS-146 — Robin Williams character (CD3 18)
- Character doc: docs/characters/robin-williams.md
- Full characters.js profile: voice (THE SHIFT engine, 5 register modes, total awareness)
- All 10 data structures: CHAR_COLOURS, COMPOSURE_PROFILES, NAMING_CONVENTIONS,
  INVENTED_CATCHPHRASES, PANEL_CATEGORIES (fish_out_of_water + wildcard),
  ESCALATION_PROFILES (performance pool, 14 items, "The Underneath" wound),
  RELATIONAL_AXES (5 axes), TEMPORAL_LENS (eligible, depression reckoning)
- 16 domain tests, all green
- Character #29

### SS-151 — World Log design doc
- docs/domains/world-log.md
- Persistent cross-session event store: domain model, injection rules,
  storage (KV recommended), 3-phase implementation, auto-log candidates

### SS-156 — RegisterContract as platform design doc
- docs/domains/register-contract-platform.md
- Parameterise Room mechanic: shared Room Engine, shared HTML template,
  contract schema, 3-phase migration (extract → engine → KV → community editor)

### WL-SS-026 — Robin Williams memories lost (CRITICAL)
- Rod gave Robin Williams memories in prior session with explicit instruction to log
- File was not written in that session
- New session wrote character doc with "AWAITING INPUT" — memories gone
- Same failure pattern as WL-SS-022/023
- Rod's Memory section still needs re-giving

---

## Worker state
- Last deployed hash: b324c70 (prior session)
- No deploy this session (Session A: design + domain only, no worker.js changes)

---

## Pipeline state
L0-L5 functionally GREEN. 845 tests (389 L1 + 20 L2 + 126 L3 + 276 L4 + 34 L5).
L2 has known Haiku flake on IMD route (passes on rerun, large prompt).

---

## WL items
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023, 025, 026
New this session: WL-SS-026 (Robin memories lost again)

---

## HDD status
HDD-001: OPEN / Advancing. 29 characters. Escalation wired into all 5 multi-turn features.
World Log and RegisterContract platform designed but not implemented.
Next action: World Log Phase 1 (manual entries + prompt injection).

---

## Decisions made this session
- Robin Williams Temporal Lens: depression/Lewy body gap, not accusatory
- World Log storage: Cloudflare KV, Phase 1 = manual file
- RegisterContract platform: shared Room Engine, contracts as data

---

## Top 3 for next session
1. SS-152 — User reputation/history design doc (Session A)
2. SS-154 — Character learning design doc (Session A)
3. Robin Williams Rod's Memory recovery (WL-SS-026)

---

## Carry-forward notes
- Robin Williams Rod's Memory: NOT captured. Rod must re-give. Write to file IN THE SAME TURN.
- Jeremy Wade: still missing Rod's verbatim memories + wound TBD
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js charIds
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known Haiku flake on IMD (passes on rerun)
- buildEscalationInjection: wired into all 5 multi-turn features (SS-148 done prior session)
- Untracked file: features/audio-output.feature (not committed, not from this session)

---

## Feedback logged this session
- Don't trail completed items with options lists — just start next item
- When you don't know why something failed, say "I don't know" directly

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
| The Doors (corridor) | /survival-school/rooms | Live (redesigned) |
| I've Had Worse (Room 13) | /survival-school/ive-had-worse | Live (multi-turn) |
| In My Defence (Room 14) | /survival-school/in-my-defence | Live (multi-turn) |
| The Alibi (Room 15) | /survival-school/the-alibi | Live (multi-turn) |
| The Expert Witness (Room 16) | /survival-school/the-expert-witness | Live (multi-turn) |
| Irwin Memorial Encounter | /survival-school/irwin-memorial | Live |
| One Man In | /survival-school/one-man-in | Live |
