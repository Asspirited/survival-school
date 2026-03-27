# Backlog — Survival School
# Prefix: SS-NNN
# CD3 scoring: Confidence × Desirability × Deliverability (max 27)
# Last updated: 2026-03-27

---

## OPEN ITEMS INDEX

| CD3 | Item | Status | Loop |
|-----|------|--------|------|
| 27 | SS-040 — Build full test pipeline (L0–L5, YGW pattern) | IN PROGRESS | TDD |
| 27 | SS-001 — Complete project brief | DONE | HDD |
| 27 | SS-003 — Define HDD hypothesis | DONE | HDD |
| 18 | SS-002 — ADR: tech stack | DONE | DDD |
| 27 | SS-004 — Fix session-ref pre-flight | DONE | DDD |
| TBD | SS-005 — Telephone Game mechanic | Open | DDD |
| TBD | SS-006 — Temporal Lens mechanic | Open | DDD |
| TBD | SS-007 — How Screwed Am I (live) | DONE | BDD |
| 27 | SS-008 — Bear Fact-Checker | DONE (standalone page live 2026-03-27) | BDD |
| TBD | SS-009 — Mode A: Panel Q&A | Open | BDD |
| TBD | SS-010 — Mundane Survival Mode | DONE | BDD |
| TBD | SS-011 — Animal Deathmatch | DONE (nav fixed 2026-03-27) | BDD |
| TBD | SS-012 — Irwin Memorial Encounter | Open | BDD |
| TBD | SS-013 — Packham Ethical Override | Open | BDD |
| TBD | SS-014 — Attenborough Eulogy | Open | BDD |
| TBD | SS-015 — Survival Skills Taxonomy | Open | DDD |
| TBD | SS-016 — Domain Knowledge Files | Open | DDD |
| TBD | SS-017 — Worker fork trigger ADR | DONE | DDD |
| TBD | SS-018 — Remaining character files | Open | DDD |
| TBD | SS-019 — Will You Eat It? | DONE | BDD |
| TBD | SS-020 — Cody Override mechanic | Open | BDD |
| TBD | SS-021 — Panel integrity spectrum | Open | DDD |
| TBD | SS-022 — Clay animal visuals | Open | DDD |
| TBD | SS-023 — Logo integration into app | Open | BDD |
| TBD | SS-024 — Terry Nutkins / Strachan | Ideas | HDD |
| TBD | SS-025 — Roosevelt guest commentator | Ideas | HDD |
| TBD | SS-026 — Fictional Great White Hunter | Ideas | HDD |
| TBD | SS-027 — Learning mode / skill tree | Ideas | HDD |
| TBD | SS-028 — Spaced repetition quiz | Ideas | HDD |
| TBD | SS-029 — Shareability / screenshot | Open | BDD |
| 27 | SS-030 — How Bad Is This? feature | DONE | Feature |
| 27 | SS-041 — Rename "How Bad Is This?" to "I've Been Bit, Guys" (Austin Stevens ref) | DONE | Polish |
| TBD | SS-038 — session-ref.md served as Cloudflare static URL | Open | DDD |
| TBD | SS-039 — Latin / indigenous naming layer in panel responses | Open | DDD |
| TBD | SS-031 — Animal database — first 20 entries | Open | Feature |
| TBD | SS-032 — Archetypal scenarios | Open | Feature |
| TBD | SS-033 — Animal Deathmatch data layer | Open | Feature |
| TBD | SS-034 — Panel response logic | Open | Feature |
| 27 | SS-035 — Attenborough bookend pattern | DONE | Feature |
| 27 | SS-036 — Mundane Mode | DONE | Feature |
| 27 | SS-037 — Rotating header taglines | DONE | Polish |

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

**Status:** Open
**Priority:** High — load-bearing for Deathmatch and Q&A
**Loop:** DDD

Twelve domains:
1. Shelter, 2. Fire, 3. Water, 4. Plant Knowledge, 5. Hunting & Trapping,
6. Animal Encounters, 7. Navigation, 8. Terrain & Weather,
9. Tool-making & Kit, 10. Psychology, 11. Endurance, 12. First Aid

Panel skill ratings per domain already drafted in character files.
Needs formalising as domain/index.json and per-domain .md knowledge files.

---

### SS-016 — Domain Knowledge Files

**Status:** Open
**Priority:** High — start with Animal Encounters
**Loop:** DDD

One .md file per domain. Canonical knowledge base — what the app queries
when a question comes in. Not the internet. Not the model's training.
This file.

Start with Animal Encounters — every character has strong opinions,
most immediately testable, Stevens and O'Shea earn their place here.

---

### SS-018 — Remaining character files

**Status:** Open
**Priority:** High — needed before full panel Q&A
**Loop:** DDD

Built this session: Cody, Bear, Ray, Hales, Backshall, Irwin,
Attenborough, Packham, Stevens, O'Shea, Stroud, Darwin.

Still needed:
- Darwin temporal lens emotional states formally documented
- Backshall wrong-name telephone game variants per character
- Irwin Stingray Rule formally documented in all relevant files
- Panel integrity spectrum attribute added to all files

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
