# CLAUDE.md — Survival School

**Project:** Survival School
**Prefix:** `SS-`
**Path:** `/home/rodent/survival-school/`
**Repo:** github.com/Asspirited/survival-school

---

## Session Protocol

- Startup: read `.claude/session-startup.md` IN FULL before any work
- In-session: use `.claude/session-insession.md` trigger map
- Closedown: run `.claude/session-closedown.md` IN FULL — no exceptions

## Delivery Cycle (non-negotiable)

1. **Three Amigos** — agree behaviour before any code
2. **Gherkin gate** — write scenario, output full text, STOP and wait for Rod's approval
3. **Outside-in design** — interface before implementation
4. **Failing test** — write test, confirm red, STOP
5. **Minimum implementation** — least code to pass
6. **Pipeline** — green before commit
7. **Commit + push** — every change, never leave session with unpushed work

BDD gate: previous session approval does not count. Re-approve each session.

## Backlog

- Items: `docs/backlog.md`
- Prefix: `SS-NNN`
- CD3 scoring on all items

## Waste Log

- Items: `docs/waste-log.md`
- Prefix: `WL-SS-NNN`

## ADRs

- Location: `docs/decisions/YYYYMMDD-NNN-short-title.md`
- Index: `docs/decisions/README.md`
- Format: see leanspirited-standards ADR format

## Scripts

- `bash .claude/scripts/append-section.sh <target> <section>` — append markdown section

## Auth / Cloudflare

- Never `wrangler login`
- Token always via dash.cloudflare.com → My Profile → API Tokens
- Always prefix: `CLOUDFLARE_API_TOKEN=<token> wrangler ...`

## System Naming Rule

EVERY instruction to Rod names the system explicitly:
"In GitHub (github.com/Asspirited/survival-school)" / "In your terminal" / "In Cloudflare (dash.cloudflare.com)"
Never "on that page" or "in the dashboard" alone.
