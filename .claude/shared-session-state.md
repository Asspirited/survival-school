# Shared Session State — Survival School
# Written: 2026-03-30 (Session close — two new Doors rooms)
# Supersedes: 2026-03-30 (Session B close — Build + Wire + Test)

---

## What shipped this session

### SS-131 — The Alibi (Room 15)
- Live at /survival-school/the-alibi
- Two protagonists, same event, contradictory stories
- Dynamic adversarial storytelling: probe holes, concede ground, score points, redirect
- Panel as judge and jury — cross-examine, take sides, argue amongst themselves
- Multi-turn CROSS-EXAMINE button (up to 5 rounds)
- Pre-built event chips: Bravo Two Zero, SAS selection, the fire, the snake, the kebab van
- 16 selectable characters including McNab, Ryan, Billy, Ollie
- Morrison interruption wired in
- Corridor door + homepage tile

### SS-133 — The Expert Witness (Room 16)
- Live at /survival-school/the-expert-witness
- Fish-out-of-water character presented as the survival expert
- 7 expert characters: Cox, Faldo, Jim Carrey, Hawking, Lee, Bristow, Keane
- Real experts defer painfully — DEFERRING/CRACKING badge system
- Multi-turn PRESS FURTHER (up to 5 rounds, deference erodes, someone breaks)
- Per-expert voice: Cox applies physics, Faldo applies golf, Keane runs it like selection
- Corridor door + homepage tile

---

## Worker state
- Last deployed hash: bff3516
- Worker: cusslab-api.leanspirited.workers.dev
- Deploy token refreshed this session (previous had expired)

---

## Pipeline state
L0-L5 GREEN. 790 tests total.
- L1: 341 unit, L2: 20 contract, L3: 119 acceptance, L4: 276 Playwright, L5: 34 OAT

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: OPEN / Advancing.
Evidence: Two new room types with distinct comedy engines increase content variety and shareability.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- The Alibi is dynamic adversarial storytelling, not static retelling (Rod's steer)
- Panel in The Alibi are active judge/jury who argue amongst themselves (Rod's steer)
- Room build order: Alibi then Expert Witness (Rod's pick)

---

## Top 3 for next session
1. SS-146 — Robin Williams character (CD3 18)
2. SS-147 — Per-character escalation mechanics (CD3 18)
3. SS-069 — User panel member selection (CD3 4)

---

## Carry-forward notes
- Jeremy Wade: still missing Rod's verbatim "Rod's Memory" section
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js CHARACTERS objects (only in The Alibi page)
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- The Doors corridor now has 8 doors: 4 live + 4 coming soon
- Homepage has 11 feature tiles
- Deploy token at /home/rodent/.cf-deploy-token was refreshed this session
- Robin Williams: Rod loves him, knows from films only, Good Will Hunting masterpiece

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
| The Alibi (Room 15) | /survival-school/the-alibi | Live |
| The Expert Witness (Room 16) | /survival-school/the-expert-witness | Live |
| Irwin Memorial Encounter | /survival-school/irwin-memorial | Live |
| One Man In | /survival-school/one-man-in | Live |
