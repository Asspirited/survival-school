# Shared Session State — Survival School
# Written: 2026-03-28 (Session C close — OAT/NFT infrastructure + character doc gap)
# Supersedes: Stream B close (composure wiring + mutual agreement, same date)

---

## What shipped this session (Session C — late 2026-03-28)

### OAT/NFT Principles & Delivery Cycle Integration (infrastructure)
- `docs/oat-nft-principles.md`: full reference doc — Ashby, DORA, SRE, DDD, SOLID, Meaney
- `.claude/CLAUDE.md`: OAT/NFT gate added to Three Amigos step (delivery cycle step 1)
- `.claude/session-insession.md`: soft trigger on OAT keywords
- `.claude/session-startup.md`: pre-flight cat updated
- `leanspirited-standards/standards/backlog-display.md`: shared closedown backlog display (3 tables, push times, totals)
- `.claude/session-closedown.md`: Step 2 references shared display standard

### Backlog items raised
- SS-102 through SS-114: 13 missing character doc files (in characters.js, no docs/characters/*.md)

---

## What shipped earlier today (Sessions A + B)

### Stream B
- SS-101: Wire composure into worker.js (IHW + IMD routes + client)
- SS-090: Cox+Faldo mutual agreement mechanic
- SS-096: Wade predicament chips
- SS-083: Morrison mid-session interruption

### Session A
- SS-087: Hawking + Bruce Lee crossover
- SS-100: Composure engine port to characters.js
- SS-098: Fish Disposition Engine
- SS-070/071/072: Middleton, McNab, Ryan characters

---

## Worker state
- Last deployed hash: 86078dd (Stream B — composure wiring + mutual agreement)
- Worker: cusslab-api.leanspirited.workers.dev
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L0-L4 GREEN. 574 tests, 0 failures. L5 OAT not yet defined (SS-040).

---

## WL items — no new items this session
Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- DECISION 2026-03-28: OAT/NFT gate in Three Amigos step, not separate loop (Ashby/DORA/SRE)
- DECISION 2026-03-28: Backlog display standard (3 tables + push times + totals) shared cross-project
- SS-013 (Packham) blocked — needs character in characters.js first
- Deploy token: /home/rodent/.cf-deploy-token — never ask Rod, just source and deploy

---

## Top 3 for next session (Session C stream)
1. SS-040 — L5 OAT definition (CD3=27, Three Amigos ready)
2. SS-047 — App footer (CD3=12, HTML)
3. SS-077 — Room-specific guiding copy (CD3=12, room HTML)

---

## Carry-forward
- 13 character doc files missing (SS-102–SS-114) — Session A territory
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Middleton, McNab, Ryan, Hawking, Lee: in characters.js but NOT in worker.js
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- Morrison mechanic live on IHW + IMD only
- L2 contract test: known occasional Haiku flake
- L5 OAT: principles doc written, pipeline layer not yet defined
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
