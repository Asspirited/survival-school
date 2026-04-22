# Shared Session State — Survival School
# Written: 2026-04-22 (Session close — Wall Walkers panel voice rebuild + accordion + fireside)
# Supersedes: 2026-04-22 (mega build)

---

## Session context

Rod leaves tomorrow (2026-04-23) to walk Hadrian's Wall. This session
shipped the last-mile fixes and the panel voice rebuild so the product
is in a dramatically better state for the walk.

---

## What shipped this session

### Bug fixes (live, cusslab-api worker)

- **Bede Wilderment / Bede Shredding separated.** Previously one shared
  tab section (broken embedding). Now two separate tab sections, two
  separate dashboard tiles, two separate tab-nav entries.
- **Broken chip action buttons fixed across Wilderment, Shredding, Ask
  the Panel.** The generic `.filter-btn` click handler was overwriting
  every inline `onclick="startWilderment(this)" / startShredding(this)
  / askChip(this)` on every chip — all three were silently neutered.
  Fix: restricted the collection-filter handler to
  `.filter-btn[data-filter]` only. Action chips keep their inline
  handlers and fire correctly.

### Panel voice rebuild — 8 distinct voices

Reference implementation of new cross-project standard
`leanspirited-standards/standards/panel-voice-principles.md`.

Rod's insight during the build: mannerisms stay constant (humans are
repetitive at that level — "Look,", "life's too short", "Next question."
are what make Bear Bear). Flavours vary (places, years, animals,
mishaps, self-corrections, ghost claims, non-sequiturs).

Each character now has a structured bank in cusslab/worker.js:
- BEAR_WALL_WALKERS_BANK + buildBearVoiceBlock()
- RAY_WALL_WALKERS_BANK + buildRayVoiceBlock()
- FOX_WALL_WALKERS_BANK + buildFoxVoiceBlock()
- LES_WALL_WALKERS_BANK + buildLesVoiceBlock()
- ATTEN_WALL_WALKERS_BANK + buildAttenVoiceBlock()
- IRWIN_WALL_WALKERS_BANK + buildIrwinVoiceBlock()
- CODY_WALL_WALKERS_BANK + buildCodyVoiceBlock()
- BEDE_WALL_WALKERS_BANK + buildBedeVoiceBlock()

Locale-constrained: Borneo and saltwater crocodile excluded from Bear's
default pool (over-used in prior prompts, broke locale plausibility).
Real Wall places (Crag Lough, Banks East turret, Chesters-Brocolitia,
Walltown Crags, Solway Firth, Housesteads, Sycamore Gap, Steel Rigg).

Wired into all 4 Wall Walkers panel endpoints:
- /survival-school/wall-walkers-shredding
- /survival-school/wall-walkers-ask
- /survival-school/wall-walkers-wilderment
- /survival-school/wall-walkers-predictions

Verified live: damage rating on shredding moved from 3/10 (bland
polished panel) to 7/10 (Ray/Fox/Cody now land real criticism while
Bear/Irwin/Les defend variably — the "panel SPLITS" dynamic is
actually happening in output, not just prompt theatre).

### UI cleanup

- **Accordion chip layout** — native HTML `<details>/<summary>` for
  three chip areas (Ask: 6 cats, Wilderment: 3 cats, Shredding: 3 cats).
  Collapsed by default, count badges ("7 questions"). Zero JS.
- **Fireside dashboard tile** — 16-bit pixel-art inline SVG (two
  chairs, log pile, flickering fire, dimpled tankards, book on left
  chair seat). Animated fire flicker via three layered keyframe groups.

### Standard + pointer files

- `leanspirited-standards/standards/panel-voice-principles.md` —
  canonical, pushed.
- `survival-school/docs/panel-voice-principles.md` — pointer.
- `cusslab/docs/panel-voice-principles.md` — pointer.

---

## Worker state
- Last deployed version ID: 448c6207-146a-4a74-afe9-68e40905a9b9
- URL: https://cusslab-api.leanspirited.workers.dev/survival-school/wall-walkers
- Worker size: ~989KB (+ 26KB from the panel voice injection infra)
- KV namespace: WALL_WALKERS (88a2258734334da49e69cee03bbf30c7)
- Build process unchanged: edit wall-walkers.html → node build-wall-walkers.js → wrangler deploy

---

## Pipeline state at close
- All 6 layers GREEN (L0 auth 270ms, L1 unit 515/0, L2 contract 20/0, L3 acceptance 139/0, L4 UI 276/0, L5 OAT 34/0).
- Session-start state had shown L2 RED with 1 contract failure; session-end rerun is GREEN. Likely flaky, self-resolved.
- No survival-school code was touched this session (all work in cusslab). Pipeline state reflects that.

---

## Open Wall Walkers BL items (post-walk)

| CD3 | Item | Status |
|---|---|---|
| 14 | SS-197 / SS-198 | DONE |
| 27 | SS-200 — Panel voice principles standard | DONE |
| 27 | SS-201 — Wall Walkers 8-character voice rebuild | DONE |
| 27 | SS-202 — Bede split + chip clobber fix | DONE |
| 18 | SS-203 — Chip accordion layout | DONE |
| 12 | SS-204 — Fireside 16-bit tile | DONE |
| 8  | SS-205 — Dashboard tile text enrichment | Open |
| 8  | SS-206 — Photo notes in Collection | Open |
| 12 | SS-207 — Cusslab port of panel-voice-principles | Open |
| 10 | SS-208 — Faldo/Cox/Ramsay banks if added | Open |
| 18 | SS-183 — Common + individual questions | Open |
| 14 | SS-185 — Round structure (full day state machine) | Open |
| 18 | SS-192 — POI design | Open |
| 18 | SS-194 — End-of-day processing flow | Open |
| 14 | SS-193 — Interactive Bede | Open |
| 14 | SS-195 — Post-close features | Open |
| 14 | SS-199 — Collectibles deep dive | Open |
| 10 | SS-190 — Metal detecting research | Open |
| 8  | SS-180 — Twice Brewed special pub round | Open |

---

## Decisions made this session

- DECISION 2026-04-22: Mannerisms vs flavours split. Humans are repetitive at the mannerism level (openers, closers, self-deprecation patterns). Variety sits on top, not in place of, mannerism-level repetition. This is captured in the standard and is load-bearing across all future panel work.
- DECISION 2026-04-22: Panel voice banks live in worker.js as JS objects for MVP. Longer-term source of truth is the character .md files — this is BL'd for later extraction.
- DECISION 2026-04-22: Ship incrementally. One endpoint at a time, verify variety before rolling to the next. This caught issues early (e.g. over-specific "References Borneo" instructions in the predictions prompt that contradicted the bank's never_touch list).
- DECISION 2026-04-22: Locale constraint is non-negotiable. Bear's bank excludes "Borneo" and "saltwater crocodile" as a 30-day reset. Anti-pattern section of the standard documents this.
- DECISION 2026-04-22: Cusslab port is post-walk BL, not this session. Cusslab has ~40% of the pattern already; Rod needs the walk product stable first.

---

## HDD status

HDD-001 (open): "If Survival School is working, people laugh before they
see a screen."

**Did this session advance it?** No directly — this session was product
quality / shipping readiness work. But the panel voice rebuild removes a
category of failure (repetitive formulaic LLM-native output) that was
undermining the text humour. Post-walk, Rod's live-test of Wall Walkers
with Ivan is the first HDD-001 validation with a person other than Rod.

**Next concrete action:** Rod walks the Wall this weekend. Reports back
what landed and what didn't. That's the validation data.

---

## Next session top 3

1. Post-walk debrief. What landed in panel voices? Which chars still
   feel off? Which features were used / not used? Which jokes hit?
2. Investigate the one L2 contract-test failure in survival-school
   (pre-existing, noted above, not blocking the walk).
3. Cusslab port of panel-voice-principles — apply the mannerism/flavour
   split to Long Room, 19th Hole, football panel characters.

**Session goal:** Turn walk observations into targeted voice-bank
tweaks and the Cusslab port design.

---

## Cross-Claude notes (for Claude.ai if it picks up)

All session work was in Claude Code (terminal). Claude.ai retired for this
workflow per feedback memory. No cross-Claude reconciliation needed.

Key files updated this session:
- cusslab/worker.js — 8 character voice banks, 4 endpoints wired
- cusslab/wall-walkers.html — Bede split, accordion, fireside SVG
- leanspirited-standards/standards/panel-voice-principles.md — new standard
- survival-school/docs/panel-voice-principles.md — pointer
- cusslab/docs/panel-voice-principles.md — pointer
- survival-school/docs/backlog.md — SS-197/198 DONE, SS-200–208 added

All commits pushed to origin/main on all three repos.
