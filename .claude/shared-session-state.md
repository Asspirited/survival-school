# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code session close)
# For: Claude.ai pickup on next session start

---

## What shipped this session

### Predicament chips (cusslab/worker.js)
- SS-089: Irwin snake wall, croc fighting ring, snake ring let-slip
- SS-089: Irwin croc leather on-camera, O'Shea snake jacket self-ID'd on-air, Stevens snakeskin boots (RSPCA report)
- SS-085 (roast): Bear hotel, Bear pool, Bear wetsuit disclosure, Cody Dual Survival exit
- SS-085 (inversion): Bear Mayfair spa, Stroud all-inclusive cruise, Ray Deliveroo, Cody shoes at the Ritz, Hales Las Vegas minibar, Fox corporate paintball
- SS-076 additions: O'Shea grandmother's urn, Stay Safe talk (live rounds + abseil entry)

### Panel mechanics (I've Had Worse — system prompt)
- SS-081: Austin Stevens added as protagonist + panel member (Snakemaster, indifferent to severity)
- SS-064: Cox (blissfully unaware) + Faldo (painfully aware, committed to wrong tool) as permanent panel rotation
- SS-074: Expert Over-Reach in system prompt
- SS-005: Telephone Game in system prompt
- SS-085: Roast/Inversion mechanic — panel questions the rationalisation, protagonist doubles down

### UI (I've Had Worse)
- SS-078: Corridor send-offs per protagonist (Bear/crowd/producer, Ray/one man 2009, Fox/empty corridor, Hales/1985 soldiers, Cody/barefoot student, Stroud/own camera, Stevens/holding a snake)
- SS-029: SHARE button — Web Share API (mobile) + clipboard copy (desktop), 2s COPIED feedback

### Backlog (other session)
- SS-059: Character interaction dynamics — DONE
- SS-062: Panel triage order consistency — DONE
- SS-058: Per-character card colours — DONE

### Raised this session
- SS-090, SS-091: Fish-out-of-water pair interaction modes
- SS-092: Jim Carrey — cycles all roles, red rag, just fuck off Jim

---

## Pipeline state
ALL GREEN — L0 auth canary, L1 unit (95), L2 contract (14), L3 acceptance (49), L4 UI (240). L5 SKIP.
Note: L3 showed 1 flaky failure on first run, passed clean on rerun. Monitor.

---

## Open WL items
- WL-SS-011: SSH auth declared broken without checking
- WL-SS-012: Claude "fixed permanently" apology loop
- WL-SS-002: Shared state claimed GitHub repo existed — it didn't
- WL-SS-003: wrangler.jsonc at /home/rodent/ routes to wrong worker
- WL-SS-006: Session startup skipped repeatedly
- WL-SS-013: Deploy treated as auth event

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence: Roast/inversion chips (Deliveroo, shoes at the Ritz) have the "send to a specific person" quality.
SHARE button now live — observe whether anyone actually uses it.
Next: SS-092 (Jim Carrey) is next high-conviction chip set. SS-088 (LieEngine) is the structural unlock.

---

## Decisions made this session
DECISION 2026-03-28: Cox + Faldo permanent panel rotation. One at a time, never both.
DECISION 2026-03-28: Fish-out-of-water awareness modes: blissfully unaware / painfully aware but committed / eager-expert / indifferent-anti — per character.
DECISION 2026-03-28: SS-029 delivered on I've Had Worse first. Extension to other features separate.

---

## Top 3 for next session
1. SS-088 — LieEngine port: characters react to each other. The structural unlock.
2. SS-092 — Jim Carrey character.
3. SS-087 — Cusslab crossover: non-survivalist protagonists through The Doors.

Session goal: get characters reacting to each other (SS-088). Turns the product from a party trick into something people return to.

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
| I've Had Worse (Room 13) | /survival-school/ive-had-worse | Live — share button added |

Worker: cusslab-api.leanspirited.workers.dev
Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Notes for Claude.ai
- cusslab/worker.js is the source file for ALL Survival School features. Not survival-school repo HTML files.
- SHARE button live on I've Had Worse. Watch for actual sharing behaviour.
- Jim Carrey (SS-092) fully designed in backlog. High priority, high confidence funny.
- Roast chips (Bear hotel/pool/wetsuit) are most shareable content currently live.
- L3 had one flaky test this session — watch for recurrence.
