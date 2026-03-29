# Shared Session State — Survival School
# Written: 2026-03-29 (Claude Code session close)
# Supersedes: Stream B 2026-03-29

---

## What shipped this session

### WL-SS-024 — Room 14 (In My Defence) ReferenceError fix
- `\${SOCIAL_DYNAMICS_ENGINE}` was escaped in IMD template literal — variable doesn't exist in client scope → ReferenceError on every submission
- Removed backslash, SDE now interpolated at worker build time (matching IHW pattern)
- Mobile cache caused stale page — `?v=2` busted it

### SS-128 — Banner/logo clickable link to homepage (DONE)
- Homepage banner wrapped in `<a href="/survival-school">`
- 9 sub-pages that had no back navigation now have `← SURVIVAL SCHOOL` inline link
- IHW, IMD, and Rooms already had nav-back links — untouched

### SS-054 — One Man In EXFIL/INFIL mode (DONE)
- New page at /survival-school/one-man-in
- Craighead leads briefing. Billy/Fox/Ollie core panel. Rotating pool for extras.
- 8 situation chips: DusitD2, IKEA car park, hostile Pret, embassy compound, mountain pass, wedding speech, self-checkout, Bravo Two Zero
- Kit selection: sidearm, knife, phone, first aid, torch, nothing, car keys, bag of shopping, loyalty card, expired coupon
- Response: EXFIL probability meter, route steps, abandon list, movement order, abort criteria
- Morrison integration, composure engine, share button
- Homepage tile upgraded from SOON to LIVE
- 8 acceptance tests, L5 OAT route added

### SS-129 — Chip category tiles (RAISED, not built)
- BL item raised for grouping chips into category tiles across HSAI, Mundane, Eat It etc.
- Copy the Doors corridor tile pattern — user taps category tile, sees only those chips

---

## Worker state
- Last deployed hash: cd603489
- Worker: cusslab-api.leanspirited.workers.dev
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7295a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L0-L5 GREEN. 657 tests, 0 failures.

---

## WL items
- WL-SS-024 closed (Room 14 ReferenceError)
- Open: WL-SS-002, 003, 006, 011, 012, 013, 019–023 (unchanged)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: One Man In adds shareable EXFIL briefings. Mundane situations (IKEA, Pret, wedding) are highly shareable.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- One Man In is a standalone homepage tile, not a Door — different mode category
- SS-129 raised: chip category tiles to replace flat chip lists across panel features

---

## Top 3 for next session
1. SS-013 — Packham Ethical Override (CD3=12, BLOCKED by character profile)
2. SS-129 — Chip category tiles (CD3=10, new feature)
3. SS-060 — Cross-character panel references (CD3=8)

---

## Carry-forward notes
- SS-013 blocked: needs Packham character profile in characters.js first
- Jeremy Wade: still missing Rod's verbatim quote for "Rod's Memory" section
- Middleton, McNab, Ryan: in characters.js but NOT in worker.js
- Fish Disposition Engine: characters.js ready, worker.js integration pending
- L2 contract test: known occasional Haiku flake (passes on rerun)
- Rod's Memory items SS-115–127: waiting on Rod for verbatim memories

---

## Live features
| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live — banner clickable |
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
| In My Defence (Room 14) | /survival-school/in-my-defence | Live — fixed this session |
| Irwin Memorial Encounter | /survival-school/irwin-memorial | Live |
| One Man In (EXFIL) | /survival-school/one-man-in | Live — NEW this session |
