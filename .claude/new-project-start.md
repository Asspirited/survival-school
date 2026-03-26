# New Project Start Protocol — LeanSpirited
# Fetch and run this completely before any other work on a new project.
# Trigger phrase (fuzzy match): "new project" / "new project start" / "New Project: [name]"
# This protocol runs ONCE per project. Outputs become the files session protocol operates on.
# Lives at: .claude/new-project-start.md (alongside session protocol files)

---

## What This Is

This is the scaffolding that builds the scaffolding.
It runs exactly once per project. When it's done, the outputs it produces are what
session-startup.md, session-insession.md, and session-closedown.md operate on thereafter.

Do not skip sections. Do not reorder. Mark completion checklist at the end.

---

## Section 1: Name and Register the Project

1. Confirm the project name (no abbreviations yet — full name)
2. Assign a backlog prefix (two or three capital letters — check `.claude/projects.md` for conflicts)
3. Assign the local path: `/home/rodent/[project-slug]/`
4. Assign the GitHub repo: `github.com/Asspirited/[project-slug]`
5. Add a row to `.claude/projects.md` immediately

---

## Section 2: Create Directory Structure

```bash
mkdir -p /home/rodent/[project-slug]/.claude/{scripts,practices,principles,history,specs,retrospectives}
mkdir -p /home/rodent/[project-slug]/docs/decisions
```

Copy standard scripts from cusslab:
```bash
cp /home/rodent/cusslab/.claude/scripts/append-section.sh /home/rodent/[project-slug]/.claude/scripts/
```

---

## Section 3: Capture the Founding Idea (verbatim)

Before any polish or structure — write down Rod's actual words about the project.

**What is it?** (one sentence, Rod's words)

**Why now?** (what prompted this)

**Who is it for?** (target user, as described today)

**What's the core experience?** (what does a user actually do?)

**What would success look like in 3 months?**

Save to: `docs/founding-notes.md` (raw, unpolished — this is the texture we can't recover later)

---

## Section 4: Write the Project Brief

Based on Section 3, write `.claude/project-brief.md`:
- What is the product?
- Core features (phase 1 only)
- Target users
- Tech stack (placeholder if not decided — raise ADR-001 to decide it)
- Engine of growth (sticky / viral / paid — best guess, confirm with HDD)
- Phase map

---

## Section 5: Define the HDD Hypothesis

Before any backlog items, state the falsifiable hypothesis:

```
Persona: [who]
Problem: [what pain]
Solution bet: [what we're building]
Falsifier: [what would prove us wrong]
Validation method: [how we'll find out]
```

Save to `docs/founding-notes.md` under `## HDD Hypothesis`.

---

## Section 6: Write the Founding Backlog

Capture everything discussed as BL items. Format: `SS-NNN` (or project prefix).

For each item:
- One-line title
- Status: Open
- CD3 score (rough — refine next session)
- Loop: HDD / DDD / BDD / TDD

Aim: 5–20 items. Don't force completeness — capture what's real today.

---

## Section 7: Create Protocol Files

Create these files (copy from standards, adapt for project):
- `.claude/CLAUDE.md`
- `.claude/session-startup.md`
- `.claude/session-insession.md`
- `.claude/session-closedown.md`
- `.claude/shared-session-state.md` (initial state)

Each file must reference the correct project prefix and paths.

---

## Section 8: Create Logs

- `docs/backlog.md` — with items from Section 6
- `docs/waste-log.md` — empty, format only
- `docs/decisions/README.md` — empty index

---

## Section 9: Write First ADR (if stack decided)

If the tech stack is known: write `docs/decisions/YYYYMMDD-001-tech-stack.md`.
If not: raise `SS-NNN — ADR: tech stack decision` as a backlog item.

---

## Section 10: Initialise Repo and Push

```bash
cd /home/rodent/[project-slug]
git init
git add .
git commit -m "chore: new project scaffolding — Survival School"
```

Create GitHub repo in GitHub (github.com/Asspirited) — New repository → [project-slug] → Private/Public → Create.
Then:
```bash
git remote add origin git@github.com:Asspirited/[project-slug].git
git push -u origin main
```

---

## Completion Checklist

- [ ] Project registered in `.claude/projects.md`
- [ ] Directory structure created
- [ ] Founding notes captured (raw, verbatim)
- [ ] Project brief written
- [ ] HDD hypothesis stated
- [ ] Founding backlog written (min 5 items)
- [ ] Protocol files created
- [ ] Logs created (backlog, waste log, decisions index)
- [ ] First ADR written or raised as BL item
- [ ] Repo initialised and pushed to GitHub

When all 10 are checked: New Project Start is complete.
Next session: open with standard session-startup.md. New project check will confirm this file has run.

---

## Trigger Behaviour (for Claude Code)

Fuzzy match on: "new project" (case-insensitive)
Also triggers on: "New Project Start", "new project please", "starting a new project"

On trigger:
1. Fetch `.claude/new-project-start.md` immediately
2. Read it completely
3. Ask Rod: "What is the project name?" if not already stated
4. Run all 10 sections in order
5. Do not start any product work until completion checklist has 10 checks
