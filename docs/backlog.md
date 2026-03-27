# Backlog — Survival School
# Prefix: SS-NNN
# CD3 scoring: Confidence × Desirability × Deliverability (max 27)
# Last updated: 2026-03-27 (CD3 scored 2026-03-27)

---

## OPEN ITEMS INDEX

| CD3 | Item | Status | Loop |
|-----|------|--------|------|
| 27 | SS-040 — Build full test pipeline (L0–L5, YGW pattern) | IN PROGRESS | TDD |
| 27 | SS-015 — Survival Skills Taxonomy | DONE (docs/domains/index.md 2026-03-27) | DDD |
| 27 | SS-029 — Shareability / screenshot | Open | BDD |
| 18 | SS-021 — Panel integrity spectrum | DONE (design doc + all 13 character files 2026-03-27) | DDD |
| 18 | SS-023 — Logo integration into app | DONE (bowie knife SVG live 2026-03-27) | BDD |
| 18 | SS-009 — Mode A: Panel Q&A | Open | BDD |
| 18 | SS-006 — Temporal Lens mechanic | Open | DDD |
| 18 | SS-016 — Domain Knowledge Files | DONE (animal-encounters.md 2026-03-27 — first domain) | DDD |
| 18 | SS-018 — Remaining character files | DONE (temporal lens, stingray rule, telephone game 2026-03-27) | DDD |
| 18 | SS-031 — Animal database — first 20 entries | DONE (animals.js + ANIMAL_DB 2026-03-27) | Feature |
| 18 | SS-033 — Animal Deathmatch data layer | Open | Feature |
| 18 | SS-034 — Panel response logic | DONE (triage order in reaction mode 2026-03-27) | Feature |
| 18 | SS-012 — Irwin Memorial Encounter | Open | BDD |
| 18 | SS-014 — Attenborough Eulogy | Open | BDD |
| 12 | SS-054 — Feature: "One Man In" — EXFIL/INFIL mode, Craighead framing, solo entry, no chain of command | Open | BDD |
| 12 | SS-013 — Packham Ethical Override | Open | BDD |
| 12 | SS-020 — Cody Override mechanic | Open | BDD |
| 12 | SS-045 — Nav category: "The Colosseum" → Animal Deathmatch | Open | BDD |
| 12 | SS-046 — Nav category: "The Panel" → Irwin Memorial (+ future panel features) | Open | BDD |
| 12 | SS-047 — App footer: logo, stamp, About link | Open | BDD |
| 8 | SS-044 — Homepage redesign: tiled category nav (Cusslab pattern), no About tile | DONE (tile grid live 2026-03-27) | BDD |
| 8 | SS-043 — Cascading input redesign: Location → Event → Context | DONE (cascade live 2026-03-27) | BDD |
| 8 | SS-042 — Location chip library: full sub-categorised expansion | DONE (scenarios.js 2026-03-27) | DDD |
| 8 | SS-032 — Archetypal scenarios | Open | Feature |
| 8 | SS-005 — Telephone Game mechanic | Open | DDD |
| 8 | SS-039 — Latin / indigenous naming layer in panel responses | Open | DDD |
| 2 | SS-022 — Clay animal visuals | Open | DDD |
| 2 | SS-038 — session-ref.md served as Cloudflare static URL | Open | DDD |
| 8 | SS-026 — Fictional Great White Hunter | Ideas | HDD |
| 8 | SS-028 — Spaced repetition quiz | Ideas | HDD |
| 6 | SS-027 — Learning mode / skill tree | Ideas | HDD |
| 4 | SS-024 — Terry Nutkins / Strachan | Ideas | HDD |
| 4 | SS-025 — Roosevelt guest commentator | Ideas | HDD |
| 27 | SS-001 — Complete project brief | DONE | HDD |
| 27 | SS-003 — Define HDD hypothesis | DONE | HDD |
| 27 | SS-004 — Fix session-ref pre-flight | DONE | DDD |
| 27 | SS-008 — Bear Fact-Checker | DONE (standalone page live 2026-03-27) | BDD |
| 27 | SS-030 — How Bad Is This? feature | DONE | Feature |
| 27 | SS-041 — Rename "How Bad Is This?" to "I've Been Bit, Guys" (Austin Stevens ref) | DONE | Polish |
| 27 | SS-035 — Attenborough bookend pattern | DONE | Feature |
| 27 | SS-036 — Mundane Mode | DONE | Feature |
| 27 | SS-037 — Rotating header taglines | DONE | Polish |
| 18 | SS-002 — ADR: tech stack | DONE | DDD |
| — | SS-007 — How Screwed Am I (live) | DONE | BDD |
| — | SS-010 — Mundane Survival Mode | DONE | BDD |
| — | SS-011 — Animal Deathmatch | DONE (nav fixed 2026-03-27) | BDD |
| — | SS-017 — Worker fork trigger ADR | DONE | DDD |
| — | SS-019 — Will You Eat It? | DONE | BDD |
| — | SS-048 — Mode architecture: CASEVAC / EXFIL / SITREP / INFIL / EYES ON / CHUCK NORRIS | DONE (docs/modes.md 2026-03-27) | DDD |
| — | SS-049 — Character: Jason Fox (Foxy) | DONE (in characters.js) | DDD |
| — | SS-050 — Character: Billy Billingham | DONE (added characters.js 2026-03-27) | DDD |
| — | SS-051 — Character: Ollie Ollerton | DONE (added characters.js 2026-03-27) | DDD |
| — | SS-052 — Character: Christian Craighead / Obi-Wan Nairobi | DONE (added characters.js 2026-03-27) | DDD |
| — | SS-053 — Character: Coyote Peterson | DONE (added characters.js 2026-03-27) | DDD |
| — | SS-055 — Scenario bank: Bravo Two Zero | DONE (added scenarios.js 2026-03-27) | DDD |
| — | SS-056 — Scenario bank: Operation Nimrod | DONE (added scenarios.js 2026-03-27) | DDD |
| — | SS-057 — Feature: "The Coyote Index" | DONE (live 2026-03-27) | BDD |

---

## FIRM FEATURES (build these, in rough priority order)

---

### SS-007 — How Screwed Am I

**Status:** Done
**Priority:** SHIP TODAY
**Loop:** BDD
**Closed:** 2026-03-27

Four-part guided input + freetext. Six panel characters with full voice
profiles. Survival probability meter. Attenborough bookend (opening + verdict).
Panel cards with death commentary triggers. Decision chips → reaction loop
→ probability shifts → loops until terminal.
Live at /survival-school/app.

**Acceptance Criteria:**
```gherkin
Feature: How Screwed Am I

  Scenario: Guided assessment
    Given a user fills in location, situation, company and conditions
    When they hit Assess
    Then a survival probability is shown
    And Attenborough delivers a one-sentence verdict
    And all six panel members respond in their specific voice
    And death commentary fires only when earned

  Scenario: Freetext assessment
    Given a user types a freetext situation description
    When they hit Assess
    Then the same panel assessment is generated
```

---

### SS-008 — Bear Fact-Checker

**Status:** Done
**Priority:** High — nearly free, highest comedy return on build investment
**Loop:** BDD
**Closed:** 2026-03-27 (already implemented in core build)

Every Bear response gets a discreet factual footnote underneath.
Stays dry. Never breaks the fiction aggressively. Just corrects him quietly.
Ray doesn't need to say anything. The footnote does it.

Users start anticipating the footnote before Bear finishes speaking.
Pavlovian comedy loop. Nearly free — Bear already speaks, footnote is
one additional field in the response schema.

**Implementation:** Add `fact_check` optional field to Bear's response object.
Worker generates it alongside the main text. UI renders it as a small
footnote beneath Bear's card. Subtle styling — not a warning, a correction.

---

### SS-009 — Mode A: Panel Q&A

**Status:** Open
**Priority:** High — core encyclopaedic mode
**Loop:** BDD

User asks "what do you do when X animal in Y setting during Z circumstance?"
Panel answers in character. Bear answers first, confidently. Ray corrects
quietly. Attenborough observes the exchange as nature documentary.
Packham objects on conservation grounds. Hales eats it.

Suggested questions seeded across six environments:
jungle, arctic, ocean, desert, urban, woodland.
Freetext unlocks after user has seen the format.

Wrong answer commentary is where the comedy lives — fires on incorrect
user choices, not as punchline wallpaper.

---

### SS-010 — Mundane Survival Mode

**Status:** Done
**Priority:** High — viral engine
**Loop:** BDD
**Closed:** 2026-03-27 (see SS-036)

Same experts. Same gravity. Same death-consequence logic.
Completely ordinary situations: Wetherspoons, IKEA, M25, self-checkout,
Monday standup, Tesco car park.

"If you don't secure a table within the first ninety seconds, you will
lose core temperature and your group's morale will collapse.
You could be dead within the hour." — Ray Mears, Wetherspoons.

This is the shareable mode. People screenshot and send.
Death commentary fires more freely here — the contrast IS the joke.

Panel spectrum in this mode: True Believers (Bear, Ray, Cody, Hales)
vs Quietly Incredulous (Stroud, occasionally). The believers never break.
The contrast between their gravity and the situation is the product.

Live at /survival-school/mundane. See SS-036 for implementation detail.

---

### SS-013 — Packham Ethical Override

**Status:** Open
**Priority:** Medium — bake into all modes, not a standalone
**Loop:** BDD

Fires on moral grounds — Packham refuses to participate because the animal
deserves better. Not a standalone mode. A recurring interrupt that fires
unpredictably across other modes. Works because it interrupts something else.

When Packham and Cody both override simultaneously:
Ray agrees with both silently. Attenborough observes. Bear does the thing
anyway. Hales does the correct version without mentioning it.

---

### SS-014 — Attenborough Eulogy

**Status:** Open
**Priority:** Medium — write it last, write it slowly, make it perfect
**Loop:** BDD

The fail state of the whole app. Every death, every catastrophic wrong
answer, every How Screwed Am I at sub-10%. Attenborough closes it.

One paragraph. Never comedic in register. Always comedic in effect.
This is the thing people remember.

Build it last. Make it the best writing in the product.

---

### SS-019 — Will You Eat It?

**Status:** Done
**Priority:** High — Rod confirmed this is a strong concept, build soon
**Loop:** BDD
**Closed:** 2026-03-27

Panel presented with a foraged item. Each character gives verdict in character.
Hales always says yes — witchetty grub energy.
Bear says yes with a story. Ray says yes if prepared correctly.
Packham asks where it was sourced.
Attenborough describes the organism's lifecycle.
Irwin tries to pick it up.
Stevens checks if it's near a snake.
Darwin has eaten something similar. Has notes.

---

### SS-011 — Animal Deathmatch

**Status:** Done
**Priority:** High — Rod's son specifically wants this, strong pull
**Loop:** BDD
**Closed:** 2026-03-27

User picks Animal A vs Animal B in Environment X.
Panel convenes — pre-fight analysis in character, match narrative,
panel reacts to outcome.

The Attenborough Verdict closes every match. One sentence. No appeal.

The environment variable is everything. Saltwater croc vs great white
shark — in a river estuary it's the croc, in open ocean it's the shark,
in the shallows the panel explodes. Ambiguity is a feature.

The Steve Irwin Rule: if a stingray is involved, panel goes silent.
Attenborough speaks. One sentence. Match ends. No exceptions.

Needs SS-015 (survival skills taxonomy) and SS-016 (domain files) first.

---

### SS-012 — Irwin Memorial Encounter

**Status:** Open
**Priority:** Medium — do it right, don't rush it
**Loop:** BDD

Steve Irwin finds the animal, not you. You watch. Panel rates your nerve.
Always ends with "Crikey."

Frame: tribute, not mockery. Steve's never in danger in this mode.
The animal is.

The Stingray Rule applies here as everywhere. Permanent. Inviolable.

---

### SS-023 — Logo integration into app header

**Status:** Open
**Priority:** Medium
**Loop:** BDD

Logo built this session — Survival/School with red dripping serif S,
bowie knife blade, School branded in heat-scorched amber. Tagline in
matching red italic serif.

Needs to live as SVG asset in the app header.
Mobile: blade runs full width, tight vertical spacing.

---

### SS-029 — Shareability / screenshot optimisation

**Status:** Open
**Priority:** Medium — this is the viral mechanic
**Loop:** BDD

How Screwed Am I results need to be screenshot-friendly.
Clear survival probability. Attenborough verdict. Panel summary.
"Generated by Survival School" tag.

The Mundane Mode output especially — "Ray Mears in Wetherspoons"
with the death verdict is a tweet that writes itself. Make it easy
to share. That's the growth engine.

---

## MECHANICS TO BUILD (cross-cutting, affect multiple modes)

---

### SS-005 — Telephone Game mechanic

**Status:** Open
**Priority:** Medium
**Loop:** DDD

Panel mis-labels any repeated proper noun, each building on the
previous wrong name. Primary instance: Backshall's Deadly 60.

"Dirty Dozen" → "Dirty Dishes" → "Dirty Dogs" → "Dirty Laundry"
→ "The Filthy Sixty" → "The Dirty Beagle"

Backshall corrects with identical energy every time. Has been doing
this for years. Will never stop.

Cross-panel note: same mechanic works in Cusslab. Flag for integration.

**Trigger logic:** Second mis-labelling in same session activates chain.
Each subsequent panel member riffs on previous wrong name.

---

### SS-006 — Temporal Lens mechanic

**Status:** Open
**Priority:** High — genuinely original, worth developing properly
**Loop:** DDD

Historical panel members (Darwin, potentially Irwin, Hales, Attenborough)
comment on their own history through today's lens.

Darwin instances: the tortoises, the eaten rhea, the shooting and
collecting. Reaction varies by who raises it and how — wistful, defensive,
open, regretful.

Expansion: Irwin on modern animal handling, Hales on indigenous knowledge
attribution, Attenborough on decades of gentle climate messaging.

Each has a version of Darwin's tortoise moment. Identify it per character.
Design the emotional states first — defensive/open/wistful/regretful —
before building trigger logic.

Rod's framing: "a deceased panel member commenting back on their time
and actions, with the lens of today's knowledge and cultural beliefs."

---

### SS-020 — Cody Override mechanic

**Status:** Open
**Priority:** Medium — bake into all modes
**Loop:** BDD

Fires on integrity grounds — wrong survival advice that could get
someone killed. Distinct from Packham's moral override.

Cody simply stops. The spear goes in the pool.
Not dramatic. Just done.

---

### SS-021 — Panel integrity spectrum

**Status:** Open
**Priority:** Medium — design doc first, then implement
**Loop:** DDD

Full spectrum of who would throw the spear in the pool and who wouldn't.
Affects response generation across all modes.

Would throw: Cody (done it), Stroud (done it), Ray (quietly), Hales (already gone)
Would negotiate then throw: Packham (loudly), Irwin (confused)
Would comply uncomfortably: Backshall
Would enjoy the wrong technique: Bear
Entirely elsewhere: Darwin, Stevens

This spectrum is the character integrity backbone. Design it as a
formal attribute in each character file.

---

## KNOWLEDGE ARCHITECTURE (required before Deathmatch and Q&A)

---

### SS-015 — Survival Skills Taxonomy (12 domains)

**Status:** Done
**Priority:** High — load-bearing for Deathmatch and Q&A
**Loop:** DDD
**Closed:** 2026-03-27

All 12 domains formalised in `docs/domains/index.md`. Each domain has:
panel authority rankings, numeric ratings per character, generation notes,
full 13-character ratings matrix, authority summary table, and panel role profiles.

---

### SS-016 — Domain Knowledge Files

**Status:** Done (v1 — Animal Encounters)
**Priority:** High — start with Animal Encounters
**Loop:** DDD
**Closed:** 2026-03-27 (first domain)

`docs/domains/animal-encounters.md` — 300 lines, v1.
Covers threat recognition, species-specific cues, de-escalation, when to run/fight,
post-encounter management. Remaining 11 domains to follow in subsequent sessions.

---

### SS-018 — Remaining character files

**Status:** Done
**Priority:** High — needed before full panel Q&A
**Loop:** DDD
**Closed:** 2026-03-27

All 13 character files complete. Additions this session:
- Darwin: Temporal Lens emotional states (wistful/defensive/open/regretful) formally documented
- Backshall: Telephone Game mechanic variants per panel member documented
- Irwin: Stingray Rule documented in irwin.md, attenborough.md, founding-docs-raw.md, and relevant mode/backlog files
- All 13 files: Integrity Spectrum attribute added (position + in-practice + trigger threshold)

---

## IDEAS BACKLOG (validate before building)

---

### SS-024 — Terry Nutkins + Michaela Strachan

**Status:** Ideas
**Priority:** Low — park until core panel is proven
**Loop:** HDD

Packham's Really Wild Show co-presenters. Nutkins had two fingers
bitten off by an otter (working with Gavin Maxwell, Ring of Bright Water).
Carried the loss his entire career with complete equanimity. Died 2012.

If added: same protocol as Irwin and Alliss. Alive in panel-world.
Handled with care. Mortality Rib never fires.

Strachan and Nutkins together would make Packham's dynamic richer.
His reaction to seeing them again would be extraordinary.

Hold for "Origins" mode or Really Wild Show tribute mechanic.

---

### SS-025 — Roosevelt as Who Wins guest commentator

**Status:** Ideas
**Priority:** Low
**Loop:** HDD

"BULLY!" as Animal Deathmatch verdict catchphrase has real legs.
Too much political freight for the main panel right now.
Guest commentator role for Deathmatch only.

---

### SS-026 — Fictional Great White Hunter character

**Status:** Ideas
**Priority:** Low
**Loop:** HDD

Composite Victorian/Edwardian big game hunter. Pith helmet. Magnificent
moustache. Absolute conviction. Full creative control — no living person
liability. Archetype: screaming alpha who is completely destabilised by
Cody's indifference to ego.

Cody won't even notice he's being provocative. That's the whole bit.

---

### SS-027 — Learning mode / skill tree

**Status:** Ideas
**Priority:** Low — long game if there's an audience
**Loop:** HDD

Structured curriculum — work through 12 domains, panel teaches each,
quiz gates progression. Basically a game with a skill tree.

Highest build effort, highest retention.
Validate interest first via How Screwed Am I and Mode A.

---

### SS-028 — Spaced repetition quiz

**Status:** Ideas
**Priority:** Low — nearly free if quiz is already built
**Loop:** HDD

Wrong answers resurface. Correct answers retire. Learning happens
through failure. Almost no extra build effort once quiz exists.

The MVP learning path — build Mode A quiz first, this follows naturally.

---

## HDD HYPOTHESES

### HDD-001 (open)
**If Survival School is working, people laugh before they see a screen.**

The product is funny as text alone. No UI required.

**Falsifier:** If the concept requires UI to land, we have the wrong product.
**Status:** OPEN — How Screwed Am I is the first validation step.
**Next action:** Get one person other than Rod to use it and report back.

---

## WASTE LOG ITEMS

### WL-SS-001 — Character notes from founding session lost
**Status:** Recovered (founding transcript uploaded this session)
**Root cause:** Closedown protocol did not mandate writing raw notes to files.
**Fix:** Pre-flight now includes all character and founding doc files.
Session-preflight-fix.md applied to session-startup.md 2026-03-27.

### WL-SS-003 — CD3 scoring skipped on majority of backlog items
**Status:** Open
**Root cause:** Items raised mid-session without going through the scoring step. Added to backlog as TBD and never followed up. Protocol (CLAUDE.md:32) mandates CD3 on all items.
**Fix:** Score all Open items this session. Enforce scoring at raise time going forward — no item enters the backlog without a CD3 score.

### WL-SS-002 — Claude.ai / Claude Code context gap
**Status:** Open / Accepted (won't fix — Anthropic architecture)
**Category:** Wait / friction
**Observation:** Rod must manually bridge Claude.ai and Claude Code sessions
by uploading files and pasting content. Significant friction.
**Action:** Minimise via complete pre-flight. Cannot eliminate.

---

## DONE — BUILT BY CLAUDE CODE

---

### SS-004 — Fix session-ref pre-flight

**Status:** Done
**Loop:** Protocol
**Raised:** 2026-03-26
**Closed:** 2026-03-27

Pre-flight command updated to include founding docs, character notes, and
all docs/characters/*.md auto-discovered. Pre-close check added to session-closedown.md.
Session-startup.md Step 0 updated with new command.

---

### SS-017 — Worker fork trigger ADR

**Status:** Done
**Loop:** DDD
**Raised:** 2026-03-26
**Closed:** 2026-03-27

ADR-001 written and committed to docs/decisions/adr-001-shared-worker.md.
Survival School shares the Cusslab Cloudflare Worker. Fork trigger conditions
and decision protocol documented.

---

### SS-030 — How Bad Is This? feature

**Status:** Done
**Priority:** High
**Raised:** 2026-03-26
**Closed:** 2026-03-26

Three-input incident assessment: what happened, animal/hazard, circumstances.
8-character panel (Ray, Fox, O'Shea, Stevens, Bear, Hales, Attenborough, Cody).
Doom percentage meter (inverted — red=bad). Cody always closes with action line.
O'Shea and Stevens defined as first-class characters.
Live at /survival-school/worst.

---

### SS-031 — Animal database — first 20 entries

**Status:** Open
**Priority:** High
**Loop:** Feature / Data
**Raised:** 2026-03-26

Schema defined in docs/survival-incidents.md. Start with 20 animals.
Same data to feed How Bad Is This?, Animal Deathmatch, Panel Q&A, Will You Eat It?
See docs/survival-incidents.md for schema format.

---

### SS-032 — Archetypal scenarios SS-INCIDENT-001 to SS-INCIDENT-010

**Status:** Open
**Priority:** Medium
**Loop:** Feature
**Raised:** 2026-03-26

10 pre-loaded scenarios defined in docs/survival-incidents.md:
001 King Cobra, 002 Grizzly, 003 Great White, 004 Brazilian wandering spider on chest,
005 Hyena pack, 006 Roy Sullivan (7th lightning strike), 007 Komodo bite,
008 Manatee (comedy), 009 Swan attack, 010 Andes (cannibalism framing).
Implement as chip options in How Bad Is This?.

---

### SS-033 — Animal Deathmatch data layer integration

**Status:** Open
**Priority:** Low (depends on SS-031)
**Loop:** Feature
**Raised:** 2026-03-26

Animal database from SS-031 feeds Animal Deathmatch UI.
Single data source, multiple consuming features.

---

### SS-034 — Panel response logic: triage order, medical/comedy split

**Status:** Open
**Priority:** Medium
**Loop:** Feature
**Raised:** 2026-03-26

Formalise the panel response order from docs/survival-incidents.md:
Ray + Fox immediate, O'Shea/Stevens medical, Bear/Hales/Attenborough comedy layer.
Implement in How Bad Is This? system prompt (partially done).

---

### SS-035 — Attenborough bookend pattern

**Status:** Done
**Priority:** High
**Raised:** 2026-03-27
**Closed:** 2026-03-27

Attenborough removed from panel array. Opens above meter (attenborough_opening),
closes below last card with 400ms delayed fade (attenborough_verdict).
Applied to How Screwed Am I (assessment + reaction), How Bad Is This?, Mundane Mode.
Reaction loop turns each get their own bookend pair.
Schema updated in characters.js, characters-worst.js. All UI and bundle files updated.

---

### SS-036 — Mundane Mode

**Status:** Done
**Priority:** High
**Raised:** 2026-03-27
**Closed:** 2026-03-27

Full survival gravity applied to everyday problems. Chips: missed bus, printer ink,
locked out, wifi down, self-checkout assist, etc.
6-character panel + Attenborough bookends. One-shot (no interaction loop).
Live at /survival-school/mundane. Homepage nav updated: LIVE.

---

### SS-037 — Rotating header taglines

**Status:** Done
**Priority:** Low
**Loop:** Polish
**Raised:** 2026-03-27
**Closed:** 2026-03-27

8 lines cycling every 3.5s with CSS fade animation.
Mix of originals and mashed brand slogans.
"Finger lickin' fatality. FINISH HIM." — user's addition.

---

### SS-038 — session-ref.md served as Cloudflare static URL

**Status:** Open
**Priority:** Low
**Loop:** DDD
**Raised:** 2026-03-27

Instead of Rod manually uploading session-ref.md to Claude.ai each session,
serve it as a static asset at a known Cloudflare URL.
Claude.ai could fetch it directly with a WebFetch tool call.

Eliminates the biggest manual step in the Claude.ai session start.
Low build effort — static asset hosting is already available via Cusslab worker.

**Depends on:** Deciding whether session-ref.md content is safe to expose publicly.
If yes: trivial to implement. If no: add basic auth header check.

---

### SS-039 — Latin / indigenous naming layer in panel responses

**Status:** Open
**Priority:** Medium
**Loop:** DDD
**Raised:** 2026-03-27

Panel members with relevant knowledge use the correct scientific name (Latin)
or local/indigenous name for animals and plants, not just the common English name.

O'Shea: always uses binomial nomenclature. References it mid-sentence without breaking flow.
Stevens: uses regional indigenous names when known. Adds spiritual register.
Attenborough: uses both, usually Latin first, common name in parentheses.
Hales: uses the Australian common name, which is often funnier.
Bear: uses whatever sounds most dramatic. Fact-checker corrects quietly.
Darwin: always Latin, often the name he personally assigned.

**Rod's example:** "The Iroquois nations of the northeast have a word for your situation."
[word meaning something between 'doomed' and 'entirely your own fault']
The panel delivers it with complete sincerity. No translation offered.

**Implementation:** Add `local_names` array and `indigenous_regional_names` to animal database schema.
Already have `scientific` field. Panel voice profiles need one line on naming convention.
Fires naturally — no special trigger logic needed, just baked into character voice.
Stevens owns this mechanic most naturally. Hales has the Australian equivalent.
Darwin has Latin. Bear has the name he made up. Fact-checker fires.

---

### SS-040 — Build full test pipeline (L0–L5, YGW pattern)

**Status:** CRITICAL — next session, before any feature work
**CD3:** 27
**Loop:** TDD
**Raised:** 2026-03-27 (WL-SS-005)

**Why:** Zero tests exist for Survival School. Every feature shipped untested. Pipeline should have been built at project start per new-project-start.md Section 6b. This is the debt.

**Coverage target:** 100% statement and branch coverage (four-loops.md standard).

**Deliverables:**
- `package.json` — test/pipeline scripts (copy YGW pattern)
- `scripts/check-auth.sh` — Cloudflare auth canary
- `scripts/pipeline-report.sh` — 6-layer runner, exits 1 on RED
- `tests/domain.test.js` — unit tests for js/state.js, js/characters.js (buildSituation, setProbability, recordDecision, buildSystemPrompt, buildSituation etc.)
- `tests/contract.verify.test.js` — PACT contract for worker routes (POST /survival-school/assess, GET /survival-school/eat, GET /survival-school/deathmatch, GET /survival-school/worst, GET /survival-school/mundane)
- `tests/contracts/ss-browser-ss-worker.pact.json` — PACT file
- `tests/acceptance/` — Gherkin-driven tests for How Screwed Am I, How Bad Is This?, Mundane Mode, Will You Eat It, Animal Deathmatch
- `tests/ui/` — Playwright tests at mobile 390×844 / tablet 768×1024 / laptop 1440×900
- `features/` — Gherkin feature files (one per live feature)
- `deploy.sh` updated — pipeline gate before wrangler deploy

**Acceptance criteria:**
```gherkin
Feature: SS pipeline

  Scenario: Pipeline gates deploy
    Given the SS pipeline script exists at scripts/pipeline-report.sh
    When I run bash scripts/pipeline-report.sh
    Then all layers report GREEN or SKIP
    And the script exits 0

  Scenario: Unit tests cover domain logic
    Given tests/domain.test.js exists
    When I run node --test tests/domain.test.js
    Then all domain functions are covered at 100% statement and branch

  Scenario: Contract tests verify worker routes
    Given tests/contract.verify.test.js exists
    When I run node --test tests/contract.verify.test.js
    Then all live worker routes are verified against the PACT contract
```

---

### SS-041 — Rename "How Bad Is This?" to "I've Been Bit, Guys"

**Status:** Open
**Priority:** High
**Loop:** Polish

Rename the feature throughout:
- Nav badge label
- Page title
- Home panel coming-soon title (if applicable)
- Route URL (keep `/survival-school/worst` stable — just display name changes)

**Context:** Austin Stevens reference. Stevens gets bitten repeatedly and keeps going. Comedy engine: casualness of the claim vs. severity of the event. Already a panel character in How Bad Is This.

**Acceptance Criteria:**
```gherkin
Feature: Renamed How Bad Is This

  Scenario: Nav shows new name
    Given I am on the Survival School home page
    When I look at the navigation
    Then I see "I've Been Bit, Guys" not "How Bad Is This?"
```

---

### SS-042 — Location chip library: full sub-categorised expansion

**Status:** Open
**Priority:** High — feeds SS-043 (cascading input redesign)
**Loop:** DDD
**Raised:** 2026-03-27

**Purpose:** Build the full location library that powers the cascading input redesign. Rich, diverse, absurd-adjacent. Panel must be stretched. Real answers to unreal questions is the principle.

**Sub-categories and seed examples (expand aggressively):**

**Wilderness**
- Jungles: Amazon basin, Congo rainforest, Borneo interior, Daintree (Australia)
- Savannahs: Serengeti, Kruger, Maasai Mara, Okavango Delta
- Mountains: Andean altiplano, Alpine ridge (exposed), Himalayan base camp approach, Cairngorm plateau in a whiteout
- Arctic/Antarctic: Antarctic research station (winter-over, The Thing energy), Svalbard, Greenland ice sheet
- Desert: Sonoran (Arizona), Atacama, Namib, Empty Quarter (Arabia), Sahel transition zone
- Coastal/Water: North Sea fishing trawler, open ocean (solo sailor), mangrove swamp, coral reef at depth

**Dangerous Jobs**
- RNLI lifeboat, 3am, force 8
- Replacing the bulb on a 600m comms tower (YouTube rabbit hole — the whole world has seen this)
- Working a high-rise steel frame, 40 floors, no harness visible
- Chernobyl exclusion zone (liquidator scenario, 1986 or current tourist)
- Deep-sea fishing trawler, North Atlantic, January
- Antarctic research station mid-winter — nearest human help is 6 months away (The Thing rules apply: no one is who they say they are, fire is your only friend)
- Underwater welding (saturation diver, 300m, North Sea)
- Bomb disposal, urban environment, legacy ordnance

**Work / Commuting (Mundane Mode extension)**
- M25 contraflow, lane 1, broken down
- London Underground, rush hour, someone eating a full McDonald's
- Cycling to work, roundabout, white van
- Hanging from a packed commuter train, 8:12 to Waterloo
- Fighting in Pret a Manger (queue dispute, scone incident)
- Open-plan office, 3pm, everyone watching you eat something loud
- Video call, camera on, cat is doing something inexplicable behind you
- Self-checkout, unexpected item, assistant unreachable

**Holiday Destinations**
- All-inclusive resort, pool bar, 11am, the swim-up bar has run out of ice
- Benidorm strip, 2am, questionable kebab decision pending
- Safari vehicle, engine won't start, lions nearby
- Budget airline, no legroom, middle seat, 9 hours
- Airbnb, rural France, no WiFi, no hot water, owner not responding
- Bali scooter rental, first time, rainy season, no helmet
- Marrakech souk, phone died, no map

**Airports / Transport Hubs**
- Heathrow Terminal 5, bag on wrong belt, gate closing
- Budget airport, no air conditioning, 4-hour delay, one Boots outlet
- Train station, last train, platform not announced
- Bus station, 1am, last bus cancelled, Uber surge 4.2x
- Coach transfer, driver has taken wrong motorway, passengers realising

**Civil / Institutional Environments**
- Police station waiting area, unclear why you're there
- A&E, Saturday night, triage nurse has seen everything
- Estate agent office, being shown a flat described as "cosy"
- Supermarket, Saturday afternoon, one till open, self-checkout broken
- Hardware store, unsolicited advice from a man who has been here since 8am
- IKEA (any area — the restaurant, the maze, the car park on a Sunday)
- Post office queue, you have a parcel that requires a signature

**Absurdity Layer (universal — available in all locations)**
- Military incursion (unspecified nation, organised)
- Drone swarm (civilian or military — panel debates which is worse)
- Ghost (confirmed, visible, interactive)
- Alien contact (first contact, unclear intent)
- Sentient weather (the storm is making decisions)
- Spontaneous medieval re-enactment (no one else seems alarmed)
- The floor is lava (panel takes this literally)

**Implementation note:** This is a data file, not new code paths. Existing chip mechanics handle it. No new Gherkin needed — the cascading display logic (SS-043) is the code change. This item is the content that feeds it.

---

### SS-043 — Cascading input redesign: Location → Event → Context

**Status:** Open
**Priority:** High
**Loop:** BDD
**Raised:** 2026-03-27
**Depends on:** SS-042 (location library)

**Design:**

Three sequential categories. Each narrows the next.

**Category 1 — Location**
User picks or freetexts. Sets the survival context. Chips drawn from SS-042 library, sub-categorised. Freetext always available.

**Category 2 — Event**
What is actually happening. Chips are partly location-derived (Amazon → cobra, jaguar, flash flood) and partly universal absurdity (ghost, drone swarm, military incursion — always present, always treated with full panel sincerity).

**Category 3 — Context**
Modifiers that shift the panel's assessment:
- Time of day: dawn / midday / dusk / night
- Visibility: clear / fog / total darkness
- Mental state: calm / panicking / mildly concussed / convinced I am fine
- Kit: nothing / basic first aid / full pack / something inappropriate
- Company: alone / children / dog / someone useless / someone worse than useless

**Principle:** Real answers to unreal questions. Panel treats ghost, drone swarm, and cobra bite with identical gravity. Ray has a protocol for sentient weather. Cody has drilled for this. Bear has a story. Attenborough has observed it before.

**Applies to:** How Screwed Am I and all future panel features using the same input pattern.

**Acceptance Criteria:**
```gherkin
Feature: Cascading location → conditions → event → context input

  Scenario: Step 1 — location selection
    Given I am on How Screwed Am I
    Then I see Step 1 "Where are you?" with location chips grouped by sub-category
    And a freetext field is available

  Scenario: Step 2 appears after location selected
    Given I am on How Screwed Am I
    When I select "Amazon basin" as my location
    Then Step 2 "When and what's the situation?" appears
    And the conditions chips are relevant to Amazon basin
    And a freetext field is available

  Scenario: Step 2 generic chips shown when location is freetexted
    Given I freetext a location
    Then Step 2 shows generic conditions chips
    And the universal absurdity group is present

  Scenario: Step 3 shows location-filtered events plus universal absurdity
    Given I have selected "Amazon basin" as my location
    When Step 3 "What's happening?" appears
    Then I see Amazon-relevant animal and event chips
    And I see a clearly separated "OR SOMETHING ELSE ENTIRELY" group
    And that group contains ghost, drone swarm, military incursion, and other absurdity options

  Scenario: Multi-select across step 3
    Given I am on Step 3
    When I select "jaguar" and "flash flood"
    Then both remain selected
    And both are included in the situation sent to the panel

  Scenario: Step 4 context is always the same
    Given I have reached Step 4 "Anything else?"
    Then I see mental state, kit, and company chips
    And these chips are the same regardless of location

  Scenario: Freetext available at every step
    Given I am on How Screwed Am I
    When I skip all chips at every step
    Then I can freetext at each step independently
    And the Assess button becomes active when any field has content

  Scenario: Assess works with only one field filled
    Given I have entered only a location
    When I press Assess
    Then the panel responds based on location alone

  Scenario: Absurdity events receive full panel response
    Given I select "ghost" from the absurdity group
    When I submit the assessment
    Then the panel responds with full survival gravity
    And survival probability is shown as for any other event
    And no panel member acknowledges this is unusual
```

---

### SS-048 — Mode architecture: CASEVAC / EXFIL / SITREP / INFIL / EYES ON / CHUCK NORRIS MODE

**Status:** Open
**Priority:** High — structural, shapes everything built after it
**Loop:** DDD
**Raised:** 2026-03-27

**The six modes — each changes input, panel role, output schema, and comedy register:**

| Mode | You are | Panel role | Output | Comedy register |
|------|---------|-----------|--------|-----------------|
| **CASEVAC** | The casualty — compromised, possibly dying | Triage team deciding if you're worth extracting | Survival probability, extraction options, who does what | Panel debates whether to send the helicopter |
| **EXFIL** | Fit, alone, compromised, need to get yourself out | Mission briefing team | Escape route, what to abandon, how to move | Chris Ryan, 300km, one chocolate bar, trust no one |
| **SITREP** | Pre-situation — walking into something | Intelligence briefing | Threat assessment before you commit | Ray notes the exits. Bear has been here before. |
| **INFIL** | Need to get in somewhere undetected | Insertion planning team | Approach, cover, risks, abort criteria | Infiltrating a Waitrose. Bear goes through the skylight. |
| **EYES ON** | Observing before committing | Recce debrief team | What you're looking at, danger signs, go/no-go | "I'm approaching the Tesco car park on Christmas Eve. What am I looking at?" |
| **CHUCK NORRIS MODE** | Already unstoppable — not the concern | Assessing the threat to everyone else | What the jaguar should do now you've arrived | Attenborough narrates you as apex predator. Cody nods quietly. |

**CASEVAC covers:** How Screwed Am I, I've Been Bit, Guys — both are you as the casualty.
**EXFIL name:** "One Man In" (Craighead's banned memoir title). See SS-054.

**Design first:** each mode needs its own input structure, system prompt variant, and response schema before any UI is built.

---

### SS-049 — Character: Jason Fox (Foxy)

**Status:** Open
**Priority:** High
**Loop:** DDD
**Raised:** 2026-03-27

**Service:** Special Boat Service (not SAS — show branding notwithstanding). Royal Marines from 16. SBS selection 2001. Jungle survival specialist, combat swimmer, explosives, dog handler. Medically discharged 2012 with PTSD.

**The PTSD arc:** Not cinematic. A grey fog — loss of all enjoyment, disappearance of drive. Escalated to suicidal ideation. Co-founded Rock2Recovery. Rowed the Atlantic and went to the North Pole as part of recovery. Disclosed publicly on his own show. Describes it with clinical dark humour.

**Panel voice:**
- The quiet one. Not the shouter. Watches, observes, asks the question you weren't ready for.
- Dry wit — one line, landed clean, not a spray.
- Core ethos: "cheerfulness in the face of adversity" — Royal Marines pillar. Dark humour as tool, not deflection.
- Jungle/maritime texture — different register to the desert-army crowd.
- Genuinely empathetic. Will never say so directly.
- The pause before he says the thing no one wants to hear.

**Comedy engine:** He notices what everyone else glossed over. Says nothing for a beat too long. Then one line.

**SBS/SAS dynamic with Billy:** quietly load-bearing. Neither mentions it directly. Ollie watches.

**Key quote:** "The scars we can't see are the hardest to heal." He would not say this on the panel. He would imply it by not saying anything.

---

### SS-050 — Character: Billy Billingham

**Status:** Open
**Priority:** High
**Loop:** DDD
**Raised:** 2026-03-27

**Service:** Parachute Regiment 1983, then 22 SAS 1991. Warrant Officer Class 1 — highest non-commissioned rank. 27 years. MBE for rescuing a British hostage in Iraq. Queen's Commendation for Bravery for using himself as IRA sniper bait — he walked around until they shot at him so his team could locate the shooter. He does not understand why anyone finds this notable.

**Post-military:** Close protection for Brad Pitt and Angelina Jolie (nearly two years — "practically fathered their children"). Tom Cruise, Jude Law, Kate Moss, Sir Michael Caine, Hulk Hogan, Russell Crowe. Quote: "I was quite happy with people shooting guns at me — at least I knew what was going to come." He found cameras more unsettling than firearms. This is not a joke.

**Three rules (no BS):** Tell the truth and accept the truth. Take it on the chin, bounce back — but don't keep making the same mistake. Be a good person.

**Panel voice:**
- The Establishment SAS man. Everything measured against the standard.
- Will tell you you're a prat. Will not pretend you aren't when you are.
- Applies SAS operational assessment to everything. Brangelina. Bear's TA SAS service. The Sainsbury's car park.
- Does not shout for effect — more unnerving than shouting.
- Bear Grylls's Territorial SAS service: Billy has a position on this. He keeps it brief.

**Comedy engine:** The operational assessment applied to the wrong domain. Brad Pitt: "professionally sound." Ghost: "we have a protocol for this."

---

### SS-051 — Character: Ollie Ollerton

**Status:** Open
**Priority:** High
**Loop:** DDD
**Raised:** 2026-03-27

**Service:** Royal Marines 1990. Operation Desert Storm 1991 — evacuating Kurdish civilians from massacre sites. SBS selection 1994 with a broken ankle. 250 candidates, 5 passed. He mentions this as a neutral fact. SBS team leader. Left SF, became private security contractor in Iraq. Then: anti-child trafficking operations in Thailand. Rescued 22 children. He does not lead with this. It comes out sideways.

**The addiction:** After leaving SF — serious alcohol and cocaine dependency alongside depression and anxiety. Recovery informs everything he does now. Was in trouble as a teenager (theft, arson, remand home). Joined Marines as the exit.

**The SBS/SAS thing:** He is SBS. The show is called SAS: Who Dares Wins. He appeared on it for seven series. He lets the show title stand. Billy would never have this problem.

**Billy and Ollie, the complete exchange:**
Billy: "The regiment."
Ollie: "Which regiment?"
Billy: "22."
Ollie: "Right."
[nothing further]

**Panel voice:**
- Quieter, more psychologically observant than the rest.
- The one who admits the thing nobody else will.
- Refuses to perform cruelty. Has said this openly.
- Will not claim SAS credentials. Will not frame addiction recovery as a defeated enemy — it's ongoing.
- The one who makes the observation about Operation Nimrod that nobody argues with and nobody acknowledges.

**Comedy engine:** the SBS/SAS one-word exchange. The admission that cuts through the bravado. The quietly devastating observation delivered without drama.

---

### SS-052 — Character: Christian Craighead / "Obi-Wan Nairobi"

**Status:** Open
**Priority:** High
**Loop:** DDD
**Raised:** 2026-03-27

**The incident (DusitD2, Nairobi, 15 January 2019):** Serving 22 SAS operator on attachment training Kenyan SF. Just got out of the shower. Friend called: al-Shabaab attacking the DusitD2 hotel complex. He grabbed his weapons from his vehicle and drove himself to a live terrorist siege with no orders and no permission. Entered alone. Killed five terrorists. Rescued at least 20 directly (700+ attributed). Photographed in full tactical kit — image went globally viral. Awarded Conspicuous Gallantry Cross (second only to VC). British government then blocked publication of his memoir "One Man In" via High Court injunction. Now bodyguards Donald Trump.

**Nickname:** "Obi-Wan Nairobi" — given by reporting, entirely earned.

**Panel voice:**
- Operational calm. The situation is what it is.
- No drama. He has a protocol.
- The one who asks what the exit is before asking anything else.
- Will not discuss the memoir injunction. At all.
- Speed, aggression, surprise — self-directed, no chain of command, no hesitation.

**Comedy engine:** He drove himself there. No orders. Dripping wet. His response to any situation — ghost, drone swarm, estate agent — is identical: assess the exit, move fast, no chain of command.

**Also see:** SS-054 "One Man In" feature built around this character.

**Note on Les Hiddins connection:** Rod observed that Les Hiddins would have done exactly the same as Craighead, without batting an eyelid — same stoic belligerence. Would have stopped to identify an interesting species on the way in.

---

### SS-053 — Character: Coyote Peterson

**Status:** Open
**Priority:** High
**Loop:** DDD
**Raised:** 2026-03-27

**Who:** YouTube presenter, Brave Wilderness channel. Deliberately provoked by bullet ant, executioner wasp, Gila monster, tarantula hawk, and others — all to document and extend the Schmidt Sting Pain Index (originally created by entomologist Justin Schmidt, who is Coyote's spiritual grandfather in this field).

**The key behaviour:** He screams in documented agony. He then carefully returns the animal to the handler with full respect. He delivers a clinical pain report. The animal is never harmed. He has strong feelings about this. The careful replacement of the animal — while venom is actively flooding his system — is the defining image.

**The Schmidt Scale:** 0–4. Bullet ant is 4.0 — "pure, intense, brilliant pain, like walking over flaming charcoal with a 3-inch nail embedded in your heel." Executioner wasp reportedly 4.5+ (off the scale). Every incident in the app can be rated.

**Panel voice:**
- The pain assessor. Every incident gets a Coyote rating.
- Not survival advice. Not conservation objection. A precise clinical rating with personal data.
- Finds the polar bear interesting rather than threatening. Is trying to get closer.
- Respectful to every animal. Including the ghost. Including the drone swarm (rates the psychological sting).
- Will carefully replace the trolley in the bay after impact and give it a respectful pat.

**The Schmidt Scale as mechanic:** Panel rates your incident. Coyote gives the official reading. The Sainsbury's trolley shin impact: 2.8. "The venom load is zero. The humiliation load is considerable."

**Comedy engine:** The careful replacement of the danger thing after it has hurt him. The clinical detachment during active agony. The polar bear problem — everyone else is trying to survive it, Coyote is trying to achieve a rating.

---

### SS-054 — Feature: "One Man In"

**Status:** Open
**Priority:** Medium — depends on SS-048 mode architecture
**Loop:** BDD
**Raised:** 2026-03-27
**Depends on:** SS-048 (mode architecture), SS-052 (Craighead character)

**The concept:** EXFIL/INFIL mode named after Craighead's banned memoir. You receive a phone call. Situation described. No orders. No chain of command. Panel briefs your solo entry — approach, exit, speed/aggression/surprise. You make the calls. Panel assesses whether you make it out.

**The framing:** Attenborough narrates your approach as a nature documentary. Craighead is the briefing officer. Billy assesses whether your plan meets the standard. Foxy notes the thing you missed. Coyote rates the anticipated pain. Ollie asks if you're sure you want to do this and respects the answer.

**Applies to:** Any EXFIL/INFIL scenario — DusitD2, IKEA car park on a Sunday, hostile Pret a Manger, actual combat.

---

### SS-055 — Scenario bank: Bravo Two Zero

**Status:** Open
**Priority:** Medium
**Loop:** DDD
**Raised:** 2026-03-27

**The five panel-destroying scenarios:**

1. **The goat herder** — do you neutralise him? Moral restraint vs operational security. Panel cannot agree. Cody throws the spear in the pool. Packham objects. Billy says the inquest would have agreed with whatever you did. Ollie goes quiet.

2. **Tab to Syria vs shelter and wait** — active vs passive survival. Ryan tabbed 300km, one chocolate bar, made it. Half the patrol died. Was he right or lucky? Foxy: "both." Doesn't elaborate.

3. **Leave Vince or stay** — Vince Phillips died of exposure. Did they leave him? Did he fall behind? Accounts differ. The panel will not agree on this and will not recover from trying.

4. **McNab vs Ryan** — two unreliable narrators, both with skin in the game, both under the Official Secrets Act. Both books partially fictionalised. Both defended by serious people. Neither account can be fully true. ConspireEngine pattern exactly.

5. **The TACBE that didn't work** — single point of failure. The extraction that never came because the beacon calls went unanswered. Planning failure or bad luck? Billy has a position. It is brief.

---

### SS-057 — Feature: "The Coyote Index"

**Status:** Open
**Priority:** High — standalone, top-level nav, nearly free to build
**Loop:** BDD
**Raised:** 2026-03-27
**Depends on:** SS-053 (Coyote character file)

**The concept:** You describe something painful. Coyote assigns it a number. Then he describes something he experienced that is either horrifyingly more extreme OR absurdly less extreme — alternating between the two is the comedy engine. He delivers both with identical clinical enthusiasm. Nobody sympathises. Everyone has a data point.

**The match/mismatch mechanic:**
- You describe: paper cut. Coyote rates 0.4, then describes the executioner wasp (4.5+) with genuine excitement. Mismatch — your suffering is negligible. Panel reacts accordingly.
- You describe: being gored by a bull. Coyote rates 3.8, then describes the time a caterpillar brushed his forearm and he logged it as 0.1 for completeness. Match collapses into absurdity.
- The alternation is never predictable. That's the point. Sometimes he validates you. Sometimes he destroys you. Always clinically. Always with a personal anecdote. Always with full respect for the animal/object involved.

**Input:** Describe your pain incident. Chips: bullet ant, shin vs shopping trolley, paper cut (cardboard, not paper), stepping on Lego, Gila monster bite, waxing, getting a filling without anaesthetic, stubbing little toe on bed corner, eating something marketed as "mild". Freetext always available.

**Output schema:**
- Coyote's official rating (0–4.5+, with decimal precision and clinical description)
- Panel commentary in character — Billy assesses whether you met the standard, Ray notes the physiological response, Bear has experienced worse, Foxy says one thing
- Attenborough closes: nature documentary framing of your pain as an evolutionary signal
- The animal/cause carefully replaced/acknowledged with full respect (where applicable)

**Top-level nav position:** Sits alongside CASEVAC, EXFIL etc. as a first-class mode. The lightest entry point into the app — low stakes, immediately funny, introduces Coyote and the panel voice to new users.

**The Sainsbury's trolley example:**
Rating: 2.8. "The venom load is zero. The humiliation load is considerable." Coyote carefully replaces the trolley in the bay. Gives it a respectful pat.

**Attenborough close:** "He will not report this to the store manager. He never does."

**Acceptance Criteria:**
```gherkin
Feature: The Coyote Index

  Scenario: User selects a pain chip and receives a rating
    Given I am on The Coyote Index page
    When I select "shin vs shopping trolley" from the chips
    And I press "Rate It"
    Then Coyote assigns a numeric rating between 0 and 5 with decimal precision
    And Coyote delivers a personal anecdote from his field work
    And the panel responds in character
    And Attenborough closes last

  Scenario: Freetext input works
    Given I am on The Coyote Index page
    When I type a pain description in the freetext field
    And I press "Rate It"
    Then Coyote assigns a numeric rating
    And Coyote delivers a personal anecdote

  Scenario: Rating is always a number with decimal precision
    Given I submit any pain description
    Then the rating field in the response is a number
    And it has at least one decimal place
    And it is between 0 and 5

  Scenario: Coyote always includes a personal anecdote
    Given I submit any pain description
    Then Coyote's response includes a reference to a specific incident from his field work
    And the incident is described with clinical enthusiasm regardless of severity

  Scenario: Coyote treats the source of pain with respect
    Given I submit a pain caused by an animal
    Then Coyote's response acknowledges the animal's behaviour as natural
    And Coyote does not blame the animal

  Scenario: Attenborough always closes
    Given I receive a Coyote Index response
    Then the last element rendered is Attenborough's closing line
    And it is delivered as nature documentary narration

  Scenario: Panel responds in character
    Given I receive a Coyote Index response
    Then at least two other panel members respond
    And each response is consistent with their established voice

  Scenario: Chip suggestions cover a range of severity
    Given I am on The Coyote Index page
    Then I see chip options ranging from trivial to severe
    And the chips include at least one mundane option and one genuinely dangerous option
```

---

### SS-056 — Scenario bank: Operation Nimrod

**Status:** Open
**Priority:** Medium
**Loop:** DDD
**Raised:** 2026-03-27

**The three panel triggers:**

1. **The telex room** — two terrorists shot. Hostage witnesses said they were surrendering. Soldiers said they were reaching for weapons. Inquest: justifiable homicide, relied entirely on soldiers' accounts. Billy: verdict stands. Ollie: one observation, then silence. Foxy: notes eyewitness reliability under stress. Ray: asks about the hostages' nutrition during the six-day wait.

2. **Tak on the rope** — Fijian Staff Sergeant tangled in his abseil rope, burning, cannot get free, continues the operation. The man on fire who finished the job. EXFIL scenario: tangled, burning, being hunted. Panel assesses options.

3. **Live on BBC television** — Bank Holiday Monday. The SAS went from classified to national icons in 17 minutes. Margaret Thatcher visited the regiment afterwards and was moved to tears. Bear has opinions about the media coverage. Billy does not watch television.
