# Session Closedown — Survival School
# Run this in full before ending any session.
# Last updated: 2026-03-26

---

## SEQUENCE — follow in order, no exceptions

---

### Step 1: Pipeline check

Is the pipeline green? If not: fix or explicitly park with a blocked backlog item before closing.

---

### Step 2: Backlog and Waste Log update

For every BL item touched this session:
- Update status (Open → In Progress → Done / Blocked / Deferred)
- Add any new items surfaced during the session
- Note any acceptance criteria changes

**Display the full backlog report** per `leanspirited-standards/standards/backlog-display.md`:
- Three tables: Open (N items), Closed Today (N items), Closed Prior (N items)
- Closed Today includes push time (HH:MM UK time) from git log
- Each table shows: ID, Title, Description, CD3, [Pushed/Closed date]
- Summary line with totals
- This display is mandatory at every closedown

For WL (`docs/waste-log.md`):
- Close any WL items resolved this session
- Add any new waste observations (defects, waits, risks surfaced)

---

### Step 3: ADR session summary

List every ADR written this session: title, ID, one-line status.
Flag any decisions made verbally but not yet written as ADRs.
Confirm `docs/decisions/README.md` index is current.

---

### Step 4: HDD advancement check

Answer before closing:
1. Did today's session advance the open HDD hypothesis? Yes / No / Partial
2. If yes — what specifically moved forward?
3. If no — what was the reason?
4. What is the next concrete action that would advance the hypothesis?
5. Who owns that action and by when?

---

### Step 5: Decisions log

List every significant decision made this session not captured in an ADR or backlog item.
Format: `DECISION [date]: [what was decided] — [why]`

---

### Step 6: SWOT update (if applicable)

If the session produced strategic learning:
- Note which SWOT quadrant(s) are affected
- Update product SWOT or create a delta SWOT
- Re-run CD3+SWOT prioritisation if priorities shifted

---

### Step 7: Next session setup

State the top 3 items for next session, in priority order.
State the session goal in one sentence.
Note any blockers that need resolving before next session.

---

### Step 8: Shared session state

Write `.claude/shared-session-state.md`:
- What was done this session
- Decisions made
- HDD status
- Top 3 for next session
- Any carry-forward notes for Claude.ai

Format so Claude.ai can read it cold in the next session.

---

### Step 8b: Pre-flight sync check

Before writing shared state, verify the pre-flight command in `session-startup.md` Step 0
covers every content file created this session.

Check:
- Any new files in `docs/` not already in the cat command? Add them.
- Any new `docs/characters/*.md` files? The `find` glob picks these up automatically.
- Any new founding or notes files? Add explicitly.

If changes needed: update the cat command in Step 0 now, before closing.

---

### Step 9: Commit reminder

List files that need committing:
- New/changed source files
- Updated backlog (`docs/backlog.md`)
- Updated waste log (`docs/waste-log.md`)
- New ADRs (`docs/decisions/`)
- Updated session protocol files (if changed)
- Updated project brief (if changed)
