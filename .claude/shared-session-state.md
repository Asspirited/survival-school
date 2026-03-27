# Shared Session State — Survival School
# Written: 2026-03-27 (Claude Code session close)
# For: Claude.ai pickup on next session start

---

## What shipped this session

### SS-043 — Cascading input redesign (deployed)
Location → Event → Context cascade. Location chip library (scenarios.js) wired in.

### SS-044 — Homepage tile grid
Replaced sidebar nav + iframe panels with tile grid. 7 LIVE tiles, 4 SOON.
Section labels: "Assessment" and "Scenarios". No About tile.
Acceptance tests updated.

### SS-021 — Panel integrity spectrum (code)
`integrity: { position, practice, threshold }` added to all 11 characters in characters.js.
Design doc: docs/panel-integrity-spectrum.md.
THROW (Ray, Cody), GONE (Stroud/Fox/Hales/Attenborough/Billy/Ollie/Craighead),
NEGOTIATE-THROW (Packham), CONFUSED-RIGHT (Irwin), ENJOY (Bear), ELSEWHERE (Darwin/Stevens).

### SS-023 — Logo integration
Bowie knife SVG. S blood red, SCHOOL amber. Mobile full-width. Live on all pages.

### SS-031 — Animal database
20 animals in js/animals.js with full schema (lethality, aggression, speed, venom, death_mins,
irwin_note, stevens_note, oshea_note, panel_comedy_trigger etc.).

### SS-033 — Animal Deathmatch data layer
Stat bars on animal selection. Prompt enrichment with biological ground truth.

### SS-034 — Panel triage order
Reaction mode: Ray+Fox IMMEDIATE first, comedy layer second. Both buildSystemPrompt copies.

### SS-032 — Archetypal scenarios (worst page)
10 archetypal scenario chips. Removed generic "What happened?" categories (too obvious).
Freetext-only event input replaces them.

### SS-014 — Attenborough Eulogy
Death fail state (is_terminal true + survival_probability 0): one paragraph, geological calm.
Field: attenborough_eulogy in JSON. Fades in 800ms after terminal card.
Wired in SURVIVAL_SCHOOL_APP only (worst page is one-shot, no terminal state).

### SS-045/SS-046 — Tile categories
SS-045: "The Colosseum" tile-cat on Animal Deathmatch — already live.
SS-046: Irwin Memorial tile: cat → "Irwin Memorial", title → "You're alright mate..."

---

## Backlog items DONE this session
SS-043, SS-044, SS-021, SS-023, SS-031, SS-033, SS-034, SS-032, SS-014, SS-042, SS-045, SS-046

---

## Pipeline state
GREEN — L0 auth canary, L1 unit (55), L2 contract (9), L3 acceptance (30). L4/L5 SKIP.
WL-SS-005 closed — pipeline is live.

---

## Open backlog (top items by CD3)

| CD3 | Item |
|-----|------|
| 27 | SS-029 — Shareability / screenshot |
| 18 | SS-009 — Mode A: Panel Q&A |
| 18 | SS-006 — Temporal Lens mechanic |
| 18 | SS-012 — Irwin Memorial Encounter (standalone page) |
| 12 | SS-047 — App footer: logo, stamp, About link |
| 12 | SS-054 — One Man In (Craighead) |
| 12 | SS-013 — Packham Ethical Override |
| 12 | SS-020 — Cody Override mechanic |

---

## Open WL items
- WL-SS-011: SSH auth declared broken without checking
- WL-SS-012: Claude "I'll fix it permanently" apology loop
- WL-SS-002: Shared state claimed GitHub repo existed — it didn't
- WL-SS-003: wrangler.jsonc at /home/rodent/ routes to wrong worker
- WL-SS-006: Session startup skipped repeatedly
- WL-SS-013: Deploy treated as auth event

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with
specific people in mind."
Status: OPEN / Advancing.
Evidence this session: Irwin tile copy ("You're alright mate..."), eulogy death state
(comedy + expertise combo), animal stat bars in deathmatch (expertise grounds the comedy).
Next: SS-029 shareability — screenshot + share. Measures actual sharing behaviour.

---

## Decisions made this session

DECISION 2026-03-27: Worst page has no terminal state. Eulogy applies to app page only
(multi-turn decision tree hits is_terminal). One-shot assessments don't need it.

DECISION 2026-03-27: "You're alright mate..." as Irwin tile title — tribute, not mockery.
Correct register for the Irwin Memorial feature.

DECISION 2026-03-27: SS-032 generic chip categories removed — too obvious and pointless.
Only 10 archetypal scenario chips remain on worst page.

---

## Top 3 for next session

1. SS-029 — Shareability: screenshot + share link. Highest CD3 open, most direct HDD evidence.
2. SS-047 — App footer: logo, stamp, About link. Multi-page surgery, deferred from this session.
3. SS-012 — Irwin Memorial Encounter. Steve finds the animal. Panel rates your nerve.

---

## Session goal for next session

Get a share mechanic live (SS-029). Let someone share something and observe the response.

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

Worker: cusslab-api.leanspirited.workers.dev
Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Notes for Claude.ai

- Two copies of buildSystemPrompt in worker.js (APP + WORST). Any system prompt
  change must use replace_all: true or edit both explicitly.
- SS-047 (footer) not done — multi-page surgery, deferred.
- Irwin Memorial tile is SOON — the standalone /survival-school/irwin page doesn't exist yet.
  The tile copy is updated. SS-012 is the next step.
- Animal DB (ANIMAL_DB) is inline in the deathmatch script, not imported from animals.js
  (worker.js is a monolith). animals.js is the canonical reference/test fixture.
