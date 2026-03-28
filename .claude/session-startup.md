# Session Startup — Survival School
# Read this first. Everything else is referenced from here.
# Last updated: 2026-03-26

---

## SEQUENCE — follow in order, do not skip or reorder

---

### 0. PRE-FLIGHT — build full project context snapshot (run first, no exceptions)

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
  docs/oat-nft-principles.md \
  docs/panel-integrity-spectrum.md \
  docs/the-rooms-design-brief.md \
  $(find docs/domains/ -name "*.md" 2>/dev/null | sort) \
  $(find docs/characters/ -name "*.md" 2>/dev/null | sort) \
  $(find features/ -name "*.feature" 2>/dev/null | sort) \
  > /mnt/c/Users/roden/Downloads/session-ref.md && echo "session-ref.md ready"
```

This creates `/mnt/c/Users/roden/Downloads/session-ref.md` — full project context in one file.
Claude Code reads the source files directly. session-ref.md is a convenience snapshot only.

NOTE: Claude.ai is no longer used in this workflow. Claude Code (this terminal) runs the same
model and has file access. All session work happens here. session-ref.md is kept for reference
and as a recoverable snapshot, not for uploading to a separate tool.

### Pre-close check (run before any commit at session end)

Confirm every file created or modified this session is listed in the cat command above.
If any new file type was created: add it to the cat command, commit, push — then close.

---

### 1. LIVE BUG CHECK (ask Rod before any feature work)

Ask Rod: **"Any live bugs since last session? Anything broken or wrong in the product right now?"**

If yes: treat as a live bug — INVESTIGATE AND RESOLVE before any planned work. Log a WL entry immediately.
If no: proceed.

---

### 1b. GIT AUTH CHECK (run before assuming anything is broken)

```bash
ls ~/.ssh/ && ssh -T git@github.com 2>&1 && git -C /home/rodent/survival-school remote -v
```

Expected: `id_ed25519` present, `Hi Asspirited!`, remote is `git@github.com`.
If all three pass: git push works. Do NOT investigate further. Do NOT declare auth broken.

---

### 2. PIPELINE (confirm green before any work)

```bash
cd /home/rodent/survival-school && bash scripts/pipeline-report.sh
```

If any check fails: root cause before proceeding.

---

### 3. SHARED STATE (cross-Claude sync)

Read `.claude/shared-session-state.md` — written by whichever Claude closed last.
Report: what shipped, open WL items, carry-forward notes.
If file doesn't exist: note it and continue.

---

### 4. BACKLOG + WASTE LOG REVIEW

Read `docs/backlog.md` and `docs/waste-log.md`.

**Step 1 — Full CD3 table:** List ALL open backlog items sorted by CD3 descending.
Flag any items marked Critical, SHIP TODAY, or In Progress.
Report all open WL items.

**Step 2 — Parallel session work packages:** Read `.claude/parallel-sessions.md` for the
partition rules, then split the open items into two non-overlapping work packages:

| Session A (Design + Docs + Domain) | Session B (Build + Wire + Test) |
|-------------------------------------|----------------------------------|
| Owns: docs/, js/characters.js, js/scenarios.js, js/animals.js, domain tests | Owns: worker.js, HTML pages, acceptance tests, UI tests |

For each item, assign to A or B based on which files it touches.
Items that span both partitions: flag as "FULL-STACK — one session only, do not split."
Items blocked by a dependency: flag as "BLOCKED by SS-NNN".

Present as two tables, CD3 descending within each:

```
SESSION A (Design + Docs + Domain)
| CD3 | Item | Notes |
|-----|------|-------|

SESSION B (Build + Wire + Test)
| CD3 | Item | Notes |
|-----|------|-------|

FULL-STACK (assign to one session only)
| CD3 | Item | Notes |
|-----|------|-------|
```

Rod confirms the split before work begins. Sessions must not touch each other's files.

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
