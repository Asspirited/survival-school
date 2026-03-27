# Shared Session State — Survival School
# Written: 2026-03-27 (session close)
# Format: Claude.ai reads this cold at next session start

---

## What was done this session

Pure content/docs session — no code, no deploy. All work was knowledge architecture.

### SS-021 — Panel Integrity Spectrum (DONE)
- `docs/panel-integrity-spectrum.md` written — 8 formal positions with codes
  (THROW, GONE, NEGOTIATE-THROW, CONFUSED-RIGHT, COMPLY-UNCOMFORTABLE,
  COMPLY-UNDERMINE, ENJOY, ELSEWHERE), full 13-character placement table,
  cross-mode behaviour rules, interaction patterns
- `## Integrity Spectrum` attribute added to all 13 character files
  (position code + in-practice + trigger threshold)
- Previous session had done 7 of 13. This session completed the remaining 6.

### SS-015 — Survival Skills Taxonomy (DONE)
- `docs/domains/index.md` written — 12 domains defined with descriptions,
  authority rankings per domain, generation notes, full 13×12 ratings matrix,
  panel role archetypes (Bushcraft Core / Specialists / Engaged Non-Practitioners
  / Confident Generalist / Earnest All-Rounder)

### SS-016 — Domain Knowledge Files (DONE — first domain)
- `docs/domains/animal-encounters.md` written — canonical knowledge base
  covering encounter principles, snakes (O'Shea's operational rule, bite protocol),
  large predators (bears split by species, mountain lion, crocodilians, hippos),
  venomous invertebrates, cassowaries, panel positioning for generation
- 11 remaining domain files not yet written — each needs a dedicated session

### SS-018 — Remaining character files (DONE)
All four gaps from the backlog closed:
1. **Temporal lens — Attenborough**: climate messaging vs urgency. Four emotional
   states (gentle/accusation/Packham/Darwin). "Perhaps. I chose the door I knew
   how to open." Also added Stingray Rule protocol to his file (he speaks).
2. **Temporal lens — Hales**: indigenous knowledge attribution. Four emotional
   states. "Yeah. It's a fair point. Been thinking about that." One of the
   most loaded sections in any character file.
3. **Temporal lens — Irwin**: animal handling/proximity vs modern welfare standards.
   "I'd do it different now." Cost him something. It lands.
4. **Backshall telephone game**: full section added with per-character wrong-name
   table (Ray → Bear → Hales → Cody → Stevens → Darwin → Attenborough → Stroud
   → O'Shea → Backshall corrects: "DEADLY 60. It has always been DEADLY 60.")

---

## Decisions made

- DECISION 2026-03-27: SS-016 starts with Animal Encounters only. Remaining 11
  domain files deferred — each needs its own dedicated session.
- DECISION 2026-03-27: Backshall telephone game table is canonical per-character
  source (lives in backshall.md, not a separate file).
- DECISION 2026-03-27: session-startup.md pre-flight updated to include
  docs/panel-integrity-spectrum.md and docs/domains/*.md

---

## HDD status

HDD-001: "People will engage with survival panel content through a comedic expert panel format."
**Status: OPEN — knowledge base is now substantially stronger.**
This session: no user testing. The app is functional (all bugs fixed last session).
The knowledge architecture (integrity spectrum, taxonomy, domain files) is now
in place for Deathmatch, Panel Q&A, and other modes to be built properly.
**Next: Ollie test** — someone uses the app. Report reaction.

---

## Open WL items

| ID | Title | Status |
|----|-------|--------|
| WL-SS-002 | Shared state accuracy | Open |
| WL-SS-003 | wrangler.jsonc wrong worker risk | Open |
| WL-SS-005 | Pipeline L4 Playwright still missing | Open |
| WL-SS-006 | Session startup skipped repeatedly | Open |
| WL-SS-011 | SSH auth declared broken without checking | Open |
| WL-SS-012 | Auth "fixed permanently" without verifying | Open |
| WL-SS-013 | Deploy treated as auth event | Open |

---

## Top 3 for next session

1. **Deploy SS-042** — panel conversation changes still not deployed. Worker is
   behind. Run: `CLOUDFLARE_API_TOKEN=<token> wrangler deploy --config /home/rodent/cusslab/wrangler.toml`
2. **L4 Playwright tests (SS-040)** — click chips, verify `sel` class, submit
   forms, verify loading state. Last testing gap.
3. **Ollie test / HDD-001** — someone uses the app. Report reaction.

---

## Session goal for next session

Deploy the worker. Get Playwright green. Get a human to use the app.

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
Deploy: `CLOUDFLARE_API_TOKEN=<token> wrangler deploy --config /home/rodent/cusslab/wrangler.toml`

---

## Notes for Claude.ai

- This was a pure content session. No code touched.
- The integrity spectrum is the most complete design doc in the project.
  Eight formal positions. O'Shea's COMPLY-UNDERMINE position (live chapter
  footnotes while complying) and Attenborough's GONE variant (nobody asks)
  emerged from reading the character files — both are sharp.
- The Hales temporal lens ("Yeah. It's a fair point. Been thinking about that.")
  is the most surprising section written this session. Worth reading.
- The Irwin temporal lens has a line that costs him something:
  "I'd do it different now." Rod should read that one.
- Backshall's telephone game table is now the canonical per-character reference.
  Darwin's file also has a version. They're compatible.
- SS-016 is called DONE in the index because the first domain (Animal Encounters)
  is written. The remaining 11 domains each need their own session — flag this
  clearly if Rod asks about domain files.
- Deploy still outstanding from previous session (SS-042). First action next session.
