# Shared Session State — Survival School
# Written: 2026-03-27 (session close)
# Format: Claude.ai reads this cold at next session start

---

## What was done this session

### Features shipped (all live)

**How Screwed Am I — v2 interaction loop**
Assessment → decision chips → panel reacts → probability shifts → loops until terminal.
7 characters (Fox added). Live at /survival-school/app.

**How Bad Is This?**
3-input incident assessment: event, animal/hazard, circumstances.
8-character panel: Ray, Fox, O'Shea, Stevens, Bear, Hales, Attenborough (bookends), Cody.
Doom meter (inverted — red=bad). Cody always closes with action line.
O'Shea and Stevens defined as first-class characters this session.
Live at /survival-school/worst.

**Mundane Mode**
Full survival gravity on everyday problems (missed bus, printer ink, etc.).
6-character panel + Attenborough bookends. One-shot (no interaction loop).
Live at /survival-school/mundane.

**Attenborough bookend pattern**
Attenborough removed from panel array across ALL features.
Now bookends every response: `attenborough_opening` (above meter) + `attenborough_verdict` (below last card, 400ms fade-in).
Reaction loop turns each get their own bookend pair.
Applied to: How Screwed Am I, How Bad Is This?, Mundane Mode.
Schema: characters.js, characters-worst.js, all UI files, all bundles updated.

**Rotating taglines**
8 lines cycling every 3.5s with CSS fade. Mix of originals and mashed brand slogans.
"Finger lickin' fatality. FINISH HIM." — "Just (don't) do it." etc.

### Infrastructure

**docs/survival-incidents.md** — real survival stories reference database + How Bad Is This? feature spec.
Stories: Ralston, Simpson/Yates, Andes crash, Hugh Glass, Mawson, Todd Orr, Roy Sullivan.
Animal DB schema defined. 10 archetypal scenarios (SS-INCIDENT-001 to 010).
Backlog items SS-030 to SS-034 defined here.

**wrangler.jsonc bug** — `/home/rodent/wrangler.jsonc` (name: "rodent") shadows all bare wrangler deploys.
Fix: ALWAYS `CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml`
WL-SS-003 raised. Memory updated.

---

## Decisions made

- Attenborough is Ewen Murray — the container, not a participant. This is the standard going forward.
- "How Bad Is This?" chosen as feature name
- Mundane Mode: one-shot (no interaction loop) — contrast is the mechanic
- All wrangler deploys: token + --config. Both required.
- pre-flight now includes docs/survival-incidents.md

---

## HDD status

HDD hypothesis: "People will engage with survival panel content when presented through a comedic expert panel format."
**Status: Partial advance.** Three features live. No user testing yet — built, not validated.
**Next: Ollie test.** Get real user reaction before building more.

---

## Open backlog (priority for next session)

1. SS-031 — Animal database, first 20 entries (schema in docs/survival-incidents.md)
2. SS-032 — Archetypal scenarios as chip options in How Bad Is This?
3. User testing / Ollie test of live features

---

## Live features

| Feature | URL |
|---------|-----|
| Homepage | /survival-school |
| How Screwed Am I? | /survival-school/app |
| How Bad Is This? | /survival-school/worst |
| Mundane Mode | /survival-school/mundane |

Worker: cusslab-api.leanspirited.workers.dev
GitHub (content): github.com/Asspirited/survival-school
GitHub (worker): github.com/Asspirited/cusslab

---

## Character architecture (critical context)

Two tiers:
- Core panel (js/characters.js): Ray, Bear, Cody, Hales, Fox, Stroud, Attenborough (bookends only)
- Specialist panel (js/characters-worst.js): O'Shea, Stevens (How Bad Is This? only)

**Attenborough NEVER appears in panel array. Bookends only. Standard going forward.**

---

## Open WL items

- WL-SS-002: Shared state accuracy — verify facts before writing. Open.
- WL-SS-003: wrangler.jsonc at /home/rodent/ — always use --config. Open.
