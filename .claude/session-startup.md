# Session Startup — Survival School
# Read this first. Everything else is referenced from here.
# Last updated: 2026-03-26

---

## SEQUENCE — follow in order, do not skip or reorder

---

### 0. PRE-FLIGHT — prime Downloads for Claude.ai (run first, no exceptions)

```bash
cd /home/rodent/survival-school && cat \
  .claude/session-startup.md \
  .claude/shared-session-state.md \
  .claude/project-brief.md \
  docs/backlog.md \
  docs/waste-log.md \
  docs/founding-docs-raw.md \
  docs/founding-notes.md \
  docs/testing-standards.md \
  $(find docs/characters/ -name "*.md" 2>/dev/null | sort) \
  > /mnt/c/Users/roden/Downloads/session-ref.md && echo "session-ref.md ready"
```

This creates `/mnt/c/Users/roden/Downloads/session-ref.md` — one file Claude.ai uploads to get
full context (startup, shared state from last session, project brief, backlog, waste log).

### Pre-close check (run before any commit at session end)

Confirm every file created or modified this session is listed in the cat command above.
If any new file type was created: add it to the cat command, commit, push — then close.

---

### 1. LIVE BUG CHECK (ask Rod before any feature work)

Ask Rod: **"Any live bugs since last session? Anything broken or wrong in the product right now?"**

If yes: treat as a live bug — INVESTIGATE AND RESOLVE before any planned work. Log a WL entry immediately.
If no: proceed.

---

### 2. PIPELINE (confirm green before any work)

```bash
# Add pipeline command here once tech stack is decided
```

If any check fails: root cause before proceeding.

---

### 3. SHARED STATE (cross-Claude sync)

Read `.claude/shared-session-state.md` — written by whichever Claude closed last.
Report: what shipped, open WL items, carry-forward notes.
If file doesn't exist: note it and continue.

---

### 4. BACKLOG + WASTE LOG REVIEW

Read `docs/backlog.md` — report top 3 open items by CD3 score.
Read `docs/waste-log.md` — report all open WL items.

Identify:
- Any items marked Critical or SHIP TODAY
- Any items In Progress from last session
- Top 3 open items by priority

---

### 5. HDD HYPOTHESIS STATUS

State all open HDD hypotheses and their current status.

```
HDD-NNN: [Hypothesis statement]
Status:   OPEN / CONFIRMED / REFUTED / PIVOTED
Evidence: [What we have so far, or "None yet"]
Next validation action: [Specific next step]
```

---

### 6. CONFIRM SESSION GOAL

State the one thing that would make this session a success.
Confirm with Rod before starting work.

---

### 7. PRODUCT CONTEXT

Read `.claude/project-brief.md` for full context.

---

### 8. WAYS OF WORKING (delivery cycle — non-negotiable)

Full detail in `.claude/CLAUDE.md`. Summary:
1. Three Amigos → 2. Gherkin gate → 3. Outside-in design → 4. Failing test → 5. Minimum implementation → 6. Pipeline → 7. Commit + push

---

## NON-NEGOTIABLE RULES (violation = waste log entry)

- Gherkin before code. Every time. Previous session approval does not count.
- Failing test before implementation. Every time.
- Pipeline green before commit.
- Commit + push after every change. No session ends with unpushed work.
- Waste log entry for every bug and every failure.
- Never `wrangler login`.
