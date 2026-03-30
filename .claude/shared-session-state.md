# Shared Session State — Survival School
# Written: 2026-03-30 (Session close — Session A: 9 design + domain items)
# Supersedes: 2026-03-30 (Session close — SS-147 escalation mechanics)

---

## What shipped this session

### Session A (Design + Docs + Domain) — 9 items closed

**SS-152 — User reputation/history (CD3 14)**
- Design doc: docs/domains/user-reputation.md
- characters.js: REPUTATION_TIERS, getReputationTier, computeReputationStats, buildReputationInjection
- 27 domain tests
- Tiers: STRANGER (0), FAMILIAR (1-3), REGULAR (4-9), VETERAN (10+)
- localStorage-first, no login, no PII, graceful absence

**SS-154 — Character learning (CD3 14)**
- Design doc: docs/domains/character-learning.md
- characters.js: OBLIVIOUS_CHARACTERS, getCharacterEncounters, computeCharacterSentiment, buildCharacterCallback, buildCharacterLearningInjection
- 29 domain tests
- Sentiments: neutral, wary, grudging, warm, familiar, oblivious
- Morrison and Carrey are always oblivious

**SS-162 — Morrison meta-layer (CD3 14)**
- Design doc: docs/domains/morrison-meta-layer.md
- characters.js: MORRISON_CLAIM_TEMPLATES, pickClaimTarget, buildMorrisonClaimInjection
- 17 domain tests
- Three claim types: rumour (distorted pool item), invention (fabricated), oracle (accidental wound hit)

**SS-153 — Audience mechanic (CD3 12)**
- Design doc: docs/domains/audience-mechanic.md
- characters.js: AUDIENCE_FEATURES, AUDIENCE_CONFIG, isAudienceFeature, buildSpectatorCard, buildSpectatorView
- 17 domain tests
- Supported features: ive-had-worse, in-my-defence, the-alibi, the-expert-witness, one-man-in

**SS-157 — Character packs (CD3 10)**
- Design doc: docs/domains/character-packs.md
- characters.js: CHARACTER_PACKS (6 packs), getPackById, getPacksForCharacter, getReleasedPacks, isNewCharacter
- 15 domain tests

**SS-168 — Will You Eat It deep content (CD3 12)**
- Design doc: docs/domains/eat-it-deep-content.md
- New file: js/eat-it-species.js — 52 species across 6 categories
- New test file: tests/domain-eat-it.test.js — 21 tests
- Pipeline updated: domain-eat-it.test.js added to L1 runner

**SS-169 — Expert Witness content (CD3 10)**
- Design doc: docs/domains/expert-witness-content.md — 37 scenarios across 5 categories
- No code (chip wiring is Session B)

**SS-170 — Mundane Mode expansion (CD3 10)**
- Design doc: docs/domains/mundane-mode-expansion.md — 5 expansion ideas, 50+ chips
- Sub-items suggested: SS-171–175

**SS-163 — Thin features risk (CD3 8)**
- Design doc: docs/domains/thin-features-risk.md
- Risk assessment + 4 options + recommendation (Option D: Hybrid)

### Also committed (from prior Session B, uncommitted)
- Acceptance test refactor for SS-149 (mechanics moved server-side)
- Backlog updates: SS-164, 165, 166, 167 marked DONE
- Audio output feature file (untracked from prior session)

---

## Worker state
- Last deployed hash: b324c70 (prior session — Session B may have deployed since)
- No deploy this session (Session A: design + domain only, no worker.js changes)

---

## Pipeline state
L1 GREEN — 515 tests (was 389 at session start, +126 new). L2-L5 not re-run (Session A: domain only).
Full pipeline at session start: L0-L5 GREEN, 845 tests.

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023, 025, 026 (unchanged)

---

## HDD status
HDD-001: OPEN / Advancing. Per-character escalation wired into worker.js (SS-148).
User reputation, character learning, Morrison meta-layer designed and domain-tested.
Next action: Session B wires reputation + character learning into worker.js prompts.

---

## Decisions made this session
- User reputation: localStorage-first, no login, no PII, 4 tiers
- Character learning: sentiment-based (wary/grudging/warm/familiar/oblivious), computed from encounter history
- Morrison meta-layer: 3 claim types, oracle variant accidentally hits wounds
- Audience mechanic: KV polling (no WebSockets), multi-turn features only
- Character packs: 6 packs defined, content-drop pipeline designed
- Will You Eat It: 52 species across 6 categories, SAFE→DEADLY edibility levels
- Thin features: recommend Hybrid approach (deepen some, funnel others)

---

## Top 3 for next session
1. Wire buildReputationInjection + buildCharacterLearningInjection into worker.js (Session B)
2. Wire buildMorrisonClaimInjection into Morrison interruption logic (Session B)
3. Will You Eat It chip redesign: 52 species chips replacing 12 generic chips (Session B)

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim "Rod's Memory" section + wound TBD
- Robin Williams: memories given by Rod, WL-SS-026 — written as "AWAITING INPUT"
- Mundane expansion sub-items (SS-171–175) need Rod scoring
- Thin features recommendation (Option D) needs Rod confirmation
- Expert Witness 37 scenarios ready for Session B chip wiring
- SS-150 (move prompt assembly server-side) still open
- Irwin is NOT in CHARACTERS (memorial encounter only) — not in any pack
- Morrison is NOT in CHARACTERS (corridor guide only)
- features/audio-output.feature exists from prior session (untracked)

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
