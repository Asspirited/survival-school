# Shared Session State — Survival School
# Written: 2026-03-27 (session close, late)
# Format: Claude.ai reads this cold at next session start

---

## What was done this session

### Live bug fixes (all deployed, 23/23 tests green)

**WL-SS-008 — iframe CSS missing for Fact-Checker and Deathmatch:**
`#panel-fact-checker` and `#panel-deathmatch` were absent from the home page iframe CSS selectors. Both rendered as zero-height invisible boxes. Fixed: added to both base and mobile `@media` selectors.

**WL-SS-009 — Missing State/UI/API declarations (How Screwed Am I + I've Been Bit, Guys):**
`const State`, `const UI`, `const API` were never declared in either page. Every chip click and button press threw `ReferenceError: State is not defined`. How Screwed Am I also had an orphaned `};`. Fixed: added all three object declarations to both pages.

**WL-SS-010 — Pipeline blind to structural integrity:**
Added two new L3 acceptance test suites:
1. CSS integrity — every panel in `LIVE_IFRAME_PANELS` must have its CSS selector in home HTML. New live panels must be added to this array before going live.
2. JS module wiring — every interactive page must declare `const State = {`, `const UI = {`, `const API = {`.

### SS-041 — Renamed "How Bad Is This?" → "I've Been Bit, Guys"
Austin Stevens reference (bitten by cobra on Animal Planet, delivered news casually). Renamed throughout: nav badge, page title, heading, button. Route `/survival-school/worst` unchanged. Acceptance tests updated.

### Character enhancements — Stevens + O'Shea (I've Been Bit, Guys panel)
Both voice profiles expanded:
- Stevens: 107-day cage, day-96 cobra bite, "I've been bit guys" on camera, boomslang, spiritual reframing, O'Shea contempt
- O'Shea: Sleeping Beauty cobra (his own pet, bit him), Golden Rule violation record, Blood Sweat and Snakebites, Ready Steady Cook alumnus, WHO credentials vs personal bite count
Panel dynamics added to system prompt: O'Shea/Stevens cold war, how Ray/Fox/Cody/Bear/Hales reference each of them.

### Process
- Apology loop counter started. 2 this session. Memory file: `feedback_apology_loop.md`
- `wrangler` (not `npx wrangler`) confirmed on PATH — shorter, no line-wrap risk

---

## Decisions made

- DECISION 2026-03-27: Use `wrangler` directly — on PATH, avoids terminal line-wrap split of `wrang|ler`
- DECISION 2026-03-27: "I've Been Bit, Guys" — domain name drives all layers (DDD)
- DECISION 2026-03-27: L3 structural integrity tests are permanent pipeline layer

---

## HDD status

HDD-001: "People will engage with survival panel content when presented through a comedic expert panel format."
**Status: OPEN — stalled on user testing.**
This session: discovered 80%+ of app was completely broken. Now fixed.
**Next: Ollie test** — features actually work now. This is the moment.

---

## Open WL items

| ID | Title | Status |
|----|-------|--------|
| WL-SS-002 | Shared state accuracy | Open |
| WL-SS-003 | Always use `--config /home/rodent/cusslab/wrangler.toml` | Open |
| WL-SS-005 | Pipeline incomplete — L4 Playwright still missing | Open |
| WL-SS-006 | Session startup skipped repeatedly | Open |

---

## Top 3 for next session

1. **L4 Playwright tests (SS-040)** — click chips, verify `sel` class, submit forms, verify loading state. The last testing gap.
2. **Ollie test / HDD-001** — someone uses the app. Report reaction. First real HDD data.
3. **Austin Stevens/O'Shea additional source material** — Rod shared URLs this session. More may be in Claude.ai context from last session's research agent.

---

## Session goal for next session

Playwright L4 tests green. Ollie test done and reported.

---

## Live features

| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live ✅ FIXED this session |
| I've Been Bit, Guys | /survival-school/worst | Live ✅ FIXED + RENAMED this session |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live ✅ FIXED this session |
| Bear Fact-Checker | /survival-school/fact-checker | Live ✅ FIXED this session |

Worker: cusslab-api.leanspirited.workers.dev
Deploy: `CLOUDFLARE_API_TOKEN=<token> wrangler deploy --config /home/rodent/cusslab/wrangler.toml`

---

## Notes for Claude.ai

- Rod was supposed to be in bed. Session ran late due to live bugs found on phone.
- "I've Been Bit, Guys" is the Austin Stevens moment — cobra on Animal Planet, casual delivery.
- The apology loop counter is a new memory file. Rod wants it tracked per session.
- The yaks were very bald tonight.
