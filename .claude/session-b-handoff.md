# Session B Handoff — 2026-03-29
# Read this AFTER completing session-startup.md
# Written by: Session A (same session, took over both roles)

---

## You are SESSION B — Build + Wire + Test

**Owns:** worker.js (at /home/rodent/cusslab/worker.js), HTML pages, acceptance tests, UI tests
**Does NOT touch:** js/characters.js, docs/characters/, domain tests — Session A owns those

---

## Your work packages (CD3 order)

| CD3 | Item | Status | Notes |
|-----|------|--------|-------|
| 12 | SS-013 — Packham Ethical Override wiring | UNBLOCKED | Packham's character profile is in characters.js (landed this session). Wire Ethical Override into worker.js system prompts — IHW, IMD, and all panel modes. Packham intervenes when animal welfare is compromised. Check docs/characters/chris-packham.md for voice/integrity spec. |
| TBD | SS-138 — Doors corridor UI redesign | Ready to build | Design doc at docs/doors-ui-redesign.md. Jim Morrison as carnival barker welcome text. Room names replace door numbers. Gold Crimson Text italic teasers per door. Locked doors visible with teasers. All changes in worker.js HTML for /survival-school/rooms route. |
| 10 | SS-129 — Chip category tiles | Open | Group chips into tappable category tiles on non-Doors features (HSAI, Mundane, Eat It etc.). Copy the Doors corridor tile pattern. |
| 8 | SS-060 — Cross-character panel references | Open | reacts_to schema field in worker.js. |

---

## Pipeline state at handoff

L0-L5 GREEN. 657 tests, 0 failures. L2 has a known occasional Haiku flake (passes on rerun).

---

## Key files you'll need

- `/home/rodent/cusslab/worker.js` — all routes, system prompts, server logic
- `docs/doors-ui-redesign.md` — SS-138 design spec
- `docs/characters/chris-packham.md` — Packham voice/integrity for SS-013
- `js/characters.js` — read-only for you, but reference for character IDs and voice profiles
- `docs/testing-standards.md` — read before writing any test

---

## Deploy command (do not modify)

```bash
source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml
```

---

## What Session A is doing in parallel

- SS-139 — Backshall voice profile (characters.js)
- SS-140 — Character parity audit
- SS-141 — Panel member categories

Session A will NOT touch worker.js, HTML, or acceptance/UI tests. No collision risk.

---

## Parallel session rules

- Pull before starting: `git -C /home/rodent/survival-school pull`
- If you need a file Session A owns: STOP and tell Rod
- Session A commits and pushes first when both ready
- You pull after A pushes, then push yours
- Full protocol: .claude/parallel-sessions.md
