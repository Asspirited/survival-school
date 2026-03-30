# Shared Session State — Survival School
# Written: 2026-03-30 (Session close — SS-147 escalation mechanics)
# Supersedes: 2026-03-30 (Session close — two new Doors rooms)

---

## What shipped this session

### SS-147 — Per-character escalation mechanics (CD3 18)
- Design doc: docs/domains/per-character-escalation.md (v2, literal pools)
- ESCALATION_PROFILES in characters.js — all 28 characters with:
  - 2–4 named pools per character, 6–18 literal items per pool
  - Round-gated access: gate array [r1, r2, r3, r4, r5]
  - Named wound with fire threshold and pivot behaviour
  - Round shape description
- RELATIONAL_AXES — 30 named directional axes (20 load-bearing, 10 situational)
- Helper functions: getAxesForCharacter, getActiveAxes, buildEscalationInjection
- 32 new domain tests (L1: 373 total)
- Key design decisions:
  - Literal pool items, not rules (prevents LLM repetition — "cheese and pickle" fix)
  - Every character has a wound, no exceptions
  - Hiddins wound is "The Nothing" — Crocodile Dundee in New York pattern
  - Morrison wound is "The Admiral's Son" — father, Paris, bathtub, 27
  - Gordon wound is "The Arm and the Chair" — visible, enormous, never discussed
  - Attenborough wound is "The Footage He Can't Use" — "I filmed the last one"

### Also committed
- Untracked files from prior session: session-b-handoff.md, character-parity-audit.md, bryan-fry.md

---

## Worker state
- Last deployed hash: b324c70 (prior session)
- No deploy this session (design + domain only, no worker.js changes)
- Worker: cusslab-api.leanspirited.workers.dev

---

## Pipeline state
L0-L5 GREEN. 822 tests (373 L1 + 20 L2 + 119 L3 + 276 L4 + 34 L5).

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: OPEN / Advancing. Per-character escalation designed and built in characters.js.
Next action: Wire buildEscalationInjection into worker.js system prompts.

---

## Decisions made this session
- Literal pool items over rule-based descriptions (prevents LLM repetition)
- Every character has a wound — no exceptions (Rod: "we all have skeletons")
- Hiddins wound: "The Nothing" — Crocodile Dundee in NYC, could be cancelled any time
- Per-character gate speeds: Ray slow (precision), Bear fast (obliviousness)
- Wounds persist once fired (Cusslab pattern — once said, it's in the room)

---

## Top 3 for next session
1. Wire buildEscalationInjection into worker.js system prompts (all panel features)
2. SS-146 — Robin Williams character
3. SS-130–137 — Three Amigos scoring for remaining room concepts

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim "Rod's Memory" section + wound TBD
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js charIds
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- Faldo needs "Cowabunga"-style catchphrase anchors
- Robin Williams: Rod loves him, knows from films only, Good Will Hunting masterpiece
- buildEscalationInjection ready but NOT wired into any worker.js route yet

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
