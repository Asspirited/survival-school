# Backlog — Survival School
# Prefix: SS-NNN
# CD3 scoring: Confidence × Desirability × Deliverability (max 27)
# Last updated: 2026-04-22 (Panel voice rebuild — all 8 characters on the pattern, standard published)

---

## OPEN ITEMS INDEX

| CD3 | Item | Status | Loop |
|-----|------|--------|------|
| 27 | SS-040 — Build full test pipeline (L0–L5, YGW pattern) | DONE (L5 OAT live 2026-03-29, 625 tests green) | TDD |
| 27 | SS-015 — Survival Skills Taxonomy | DONE (docs/domains/index.md 2026-03-27) | DDD |
| 27 | SS-029 — Shareability / screenshot | DONE (SHARE button + Web Share API + clipboard fallback on ive-had-worse 2026-03-28) | BDD |
| 18 | SS-021 — Panel integrity spectrum | DONE (design doc + all 13 character files 2026-03-27) | DDD |
| 18 | SS-023 — Logo integration into app | DONE (bowie knife SVG live 2026-03-27) | BDD |
| 18 | SS-009 — Mode A: Panel Q&A | DONE (panel-qa live 2026-03-28, Contradiction Engine) | BDD |
| 18 | SS-006 — Temporal Lens mechanic | DONE (design doc + characters.js + 25 domain tests 2026-03-29) | DDD |
| 18 | SS-016 — Domain Knowledge Files | DONE (animal-encounters.md 2026-03-27 — first domain) | DDD |
| 18 | SS-018 — Remaining character files | DONE (temporal lens, stingray rule, telephone game 2026-03-27) | DDD |
| 18 | SS-031 — Animal database — first 20 entries | DONE (animals.js + ANIMAL_DB 2026-03-27) | Feature |
| 18 | SS-033 — Animal Deathmatch data layer | DONE (stat bars + prompt enrichment 2026-03-27) | Feature |
| 18 | SS-034 — Panel response logic | DONE (triage order in reaction mode 2026-03-27) | Feature |
| 18 | SS-012 — Irwin Memorial Encounter | DONE (live at /survival-school/irwin-memorial 2026-03-29, Stingray Rule, tribute framing) | BDD |
| 18 | SS-014 — Attenborough Eulogy | DONE (death fail state eulogy live 2026-03-27) | BDD |
| 12 | SS-054 — Feature: "One Man In" — EXFIL/INFIL mode, Craighead framing, solo entry, no chain of command | DONE (live 2026-03-29, homepage tile, 8 acceptance tests) | BDD |
| 12 | SS-013 — Packham Ethical Override | DONE (wired into IHW, IMD, OMI, Irwin; expert charId; PACKHAM ETHICAL OVERRIDE mechanic 2026-03-29) | BDD |
| 12 | SS-020 — Cody Override mechanic | DONE (IHW + IMD system prompts, deployed 2026-03-29) | BDD |
| 12 | SS-045 — Nav category: "The Colosseum" → Animal Deathmatch | DONE (tile-cat live 2026-03-27) | BDD |
| 12 | SS-046 — Nav category: "The Panel" → Irwin Memorial (+ future panel features) | DONE (tile-cat + title live 2026-03-27) | BDD |
| 12 | SS-047 — App footer: logo, stamp, About link | DONE (homepage footer live 2026-03-29) | BDD |
| 8 | SS-044 — Homepage redesign: tiled category nav (Cusslab pattern), no About tile | DONE (tile grid live 2026-03-27) | BDD |
| 8 | SS-043 — Cascading input redesign: Location → Event → Context | DONE (cascade live 2026-03-27) | BDD |
| 8 | SS-042 — Location chip library: full sub-categorised expansion | DONE (scenarios.js 2026-03-27) | DDD |
| 8 | SS-032 — Archetypal scenarios | DONE (10 chips live, generic categories removed 2026-03-27) | Feature |
| 18 | SS-063 — Panel archetypes: design who goes together and why | DONE (design doc, 6 archetypes 2026-03-29) | DDD |
| 18 | SS-064 — Cross-product fish-out-of-water characters: Cox, Faldo, others | DONE (Cox + Faldo in I've Had Worse panel rotation 2026-03-28) | DDD |
| 18 | SS-065 — Panel pool: random 4–5 character selection across all panel modes | DONE (PANEL_POOL + drawPanel live 2026-03-28) | BDD |
| 7.3 | SS-066 — "I've Had Worse": walking skeleton, protagonist selection, escalating panel | DONE (live 2026-03-28) | BDD |
| 5.7 | SS-067 — The Rooms corridor: door tiles, comedic name + domain sub-header | DONE (live 2026-03-28 as /survival-school/rooms) | BDD |
| 3.2 | SS-068 — The Rooms: Dead Parrot Survival / Barney Rubble / Special Air Counsellors / Yes But Then What? / The 4th Wall | Open | BDD |
| 4 | SS-069 — User panel member selection (choose who's in the room) | Open | BDD |
| 18 | SS-070 — Character: Ant Middleton ("Madhouse") — former SAS, TV survival host, full voice profile | DONE (characters.js + domain tests 2026-03-28) | DDD |
| 18 | SS-071 — Character: Andy McNab — Bravo Two Zero author, former SAS, drily factual, operational | DONE (characters.js + domain tests 2026-03-28) | DDD |
| 18 | SS-072 — Character: Chris Ryan — Bravo Two Zero survivor, contradicts McNab, selective memory | DONE (characters.js + domain tests 2026-03-28) | DDD |
| 12 | SS-073 — Jim Morrison corridor guide: sends characters through The Doors with sage/doom advice | DONE (per-door quotes + 25 rotating corridor quotes live 2026-03-28) | BDD |
| 16 | SS-074 — Expert Over-Reach mechanic: characters one-up expertise claims, escalate into making things up | DONE (system prompt mechanic live 2026-03-28) | BDD |
| 18 | SS-083 — Jim Morrison mid-session interruption: wanders in, helps or hinders, panel doesn't know what to do with him | DONE (IHW + IMD, ~20% random, warm→hostile flip, morrison_present state 2026-03-28) | BDD |
| 8 | SS-075 — Corrupted door quotes: rotating list of Morrison + corrupted motivational banalities | DONE (25 quotes live 2026-03-28) | BDD |
| 10 | SS-076 — Scenario predicament chips: airplane aisle, shandy, badger, pigeon, tortoise | DONE (5 chips live 2026-03-28) | BDD |
| 12 | SS-077 — Room-specific guiding copy: freetext prompt hints congruent with each room's mechanic | DONE (IHW + IMD guiding copy live 2026-03-29, remaining rooms when SS-068 ships) | BDD |
| 14 | SS-078 — Corridor send-off messages: banal good-luck wishes alongside Morrison's prophecy | DONE (per-protagonist send-offs live 2026-03-28) | BDD |
| 8 | SS-079 — Roy Keane character: dismissive survival mode, "this is nothing compared to selection" | DONE (characters.js + character doc 2026-03-29) | DDD |
| 18 | SS-080 — Character: Mark O'Shea — herpetologist, taxonomically forensic, urn incident origin | DONE (in PANEL_POOL 2026-03-28) | DDD |
| 18 | SS-081 — Character: Austin Stevens — Snakemaster, casualness about injury, "I've Been Bit Guys" origin | DONE (in PANEL_POOL 2026-03-28) | DDD |
| 27 | SS-082 — Character: Gordon Lyons — amateur herpetologist, bitten twice by same snake, friend poured beer and urinated on his head as first aid | DONE (on I've Been Bit panel 2026-03-28) | DDD |
| 18 | SS-058 — Per-character colored card backgrounds (Cusslab pattern, survival palette) | DONE (CHAR_COLOURS + char-{id} CSS live 2026-03-28) | BDD |
| 18 | SS-084 — Predicament chip: "why did Bear end up forcing the teacher to drink his urine out of a dead snake" | DONE (chip live on worst page 2026-03-28) | BDD |
| 27 | SS-085 — Per-character roast + inversion chips: real embarrassing moments + out-of-character scenarios they must defend (The Doors) | DONE (10 chips + ConspireEngine system prompt 2026-03-28) | DDD |
| 12 | SS-086 — Review SS-085 material as stimulus for chips on other features (How Screwed, I've Had Worse, etc.) | DONE (review doc, SS-115/116 raised 2026-03-29) | DDD |
| 27 | SS-093 — New door: "In My Defence" (Room 14) — Roast/Inversion mode, protagonist chips expand per-person incidents, aggressive interrogation panel | DONE (live 2026-03-28) | BDD |
| 18 | SS-094 — Fix I've Had Worse: remove roast chips, fix panel interaction (SOCIAL_DYNAMICS_ENGINE, panel_tension, random order, escalation) | DONE (2026-03-28) | BDD |
| 27 | SS-088 — Panel emotional state model: port LieEngine + composure from Cusslab, characters shift register mid-session | DONE (2026-03-28) | BDD |
| 27 | SS-087 — Cusslab crossover: Hawking + Bruce Lee as fish-out-of-water characters (same pattern as Cox/Faldo) | DONE (characters.js + domain tests 2026-03-28) | DDD |
| 27 | SS-100 — Port composure engine to SS characters.js (COMPOSURE_PROFILES, init, compute deltas, tier, injection) | DONE (characters.js + 21 domain tests 2026-03-28) | DDD |
| 18 | SS-101 — Wire composure engine into SS worker.js (accept composureState, inject, return updated state) | DONE (IHW + IMD routes + client, contract tests green 2026-03-28) | BDD |
| 27 | SS-089 — The Doors predicament chips: Steve Irwin (snake wall, croc ring, snake ring let-slip) + Stevens (snake pit, O'Shea's paper) | DONE (2026-03-28) | BDD |
| 18 | SS-092 — Fish-out-of-water character: Jim Carrey — cycles Ace Ventura / The Mask / Liar Liar / all other modes, red rag to the panel, funny and also not funny, just fuck off Jim | DONE 2026-03-28 | BDD |
| 18 | SS-095 — New character: Jeremy Wade — Freshwater Biologist, River Monsters, protagonist + panel rotation, notebook/translator/tuning out/Cowabunga mechanics | DONE 2026-03-28 | BDD |
| 12 | SS-096 — Wade predicament chips: River Monsters scenarios, freshwater predator experiences, Congo/Mekong incidents, candiru, witchcraft accusation | DONE (5 chips in worker.js 2026-03-28) | BDD |
| 6 | SS-099 — Morrison contextual trigger: Morrison interrupts when panel conversation touches something he'd respond to (doors, poetry, snakes, death, the end) | DONE (contextual trigger in IHW + IMD, ~80% on trigger words, deployed 2026-03-29) | BDD |
| 18 | SS-097 — New character: Eric Bristow — darts legend, survival commentary + darts panel crossover (Cusslab) | DONE (characters.js + character doc + domain tests 2026-03-29) | DDD |
| 27 | SS-098 — Fish Disposition Engine: arrival mode for fish-out-of-water characters (EXCITABLE_NOVICE, CORRECTOR, CHECKED_OUT, CONTEMPTUOUS, CONVERT) — dependency of SS-087, SS-090, SS-091 | DONE (design doc + characters.js + domain tests 2026-03-28) | DDD |
| 18 | SS-090 — Fish-out-of-water pair: Cox + Faldo both in panel — vehement mutual agreement on something both are completely wrong about, experts looking on in horror | DONE (MUTUAL AGREEMENT mechanic in IHW + IMD, acceptance tests green 2026-03-28) | BDD |
| 18 | SS-091 — Fish-out-of-water pair: Cox + Faldo argue with each other when neither knows anything — escalating confident wrongness, no expert present to correct them | DONE (ARGUMENT mechanic in IHW + IMD system prompts, deployed 2026-03-29) | BDD |
| 18 | SS-059 — Character interaction dynamics: wounds, lies, calling each other out | DONE (SOCIAL DYNAMICS ENGINE live, panel_tension in all modes, ADR-002 2026-03-28) | DDD |
| 8 | SS-005 — Telephone Game mechanic | DONE (system prompt mechanic live 2026-03-28) | DDD |
| 8 | SS-039 — Latin / indigenous naming layer in panel responses | DONE (design doc + NAMING_CONVENTIONS + 13 domain tests 2026-03-29) | DDD |
| 12 | SS-115 — "Complicating factors" chip type for How Screwed Am I | DONE (Gherkin + UI + wiring 2026-03-29) | BDD |
| 8 | SS-116 — Data-only chip additions from SS-086 review (IHW, PQA, Fact-Checker) | DONE (6 chips across 3 features 2026-03-29) | BDD |
| 8 | SS-117 — Gordon Lyons missing CHARACTERS entry (SS-082 gap fix) | DONE (characters.js entry + naming convention 2026-03-29) | DDD |
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
| 12 | SS-102 — Character doc: Billy Billingham — full schema (Rod's Memory, Facts, Comedy Engine, Register, Voice) | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-103 — Character doc: Ollie Ollerton — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-104 — Character doc: Coyote Peterson — full schema | DONE (full schema + WAC 2026-03-29) | DDD |
| 12 | SS-105 — Character doc: Chris Ryan — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-106 — Character doc: Andy McNab — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-107 — Character doc: Christian Craighead (Obi-Wan Nairobi) — full schema | DONE (full schema + WAC 2026-03-29) | DDD |
| 12 | SS-108 — Character doc: Ant Middleton — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-109 — Character doc: Jim Carrey — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-110 — Character doc: Stephen Hawking — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-111 — Character doc: Bruce Lee — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-112 — Character doc: Jim Morrison (corridor guide) — full schema | DONE (created from scratch 2026-03-29) | DDD |
| 12 | SS-113 — Character doc: Brian Cox — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 12 | SS-114 — Character doc: Nick Faldo — full schema | DONE (full schema + Comedy Engine + WAC 2026-03-29) | DDD |
| 8 | SS-115 — Rod's Memory: Billy Billingham — verbatim personal memories | DONE (verbatim + research + Eastwood/Cruise/hostage stories 2026-03-29) | DDD |
| 8 | SS-116 — Rod's Memory: Ollie Ollerton — verbatim personal memories | DONE (verbatim + research + Iraq/trafficking/break point 2026-03-29) | DDD |
| 8 | SS-117 — Rod's Memory: Coyote Peterson — verbatim personal memories | DONE (verbatim + research + sting progression/hot dogs 2026-03-29) | DDD |
| 8 | SS-118 — Rod's Memory: Chris Ryan — verbatim personal memories | DONE (verbatim + research + escape detail/300km 2026-03-29) | DDD |
| 8 | SS-119 — Rod's Memory: Andy McNab — verbatim personal memories | DONE (verbatim + research + Harrods bag/torture/literacy 2026-03-29) | DDD |
| 8 | SS-120 — Rod's Memory: Christian Craighead — verbatim personal memories | DONE (verbatim + research + DusitD2/MoD trolling/Mutineer watch 2026-03-30) | DDD |
| 8 | SS-121 — Rod's Memory: Ant Middleton — verbatim personal memories | DONE (verbatim + research + decline arc/fear bubble/right-wing pipeline 2026-03-30) | DDD |
| 8 | SS-122 — Rod's Memory: Jim Carrey — verbatim personal memories | DONE (verbatim + research + Man on Moon/Venice/cheque story 2026-03-30) | DDD |
| 8 | SS-123 — Rod's Memory: Stephen Hawking — verbatim personal memories | DONE (verbatim + research + time travel party/bets/zero-g/John Oliver 2026-03-30) | DDD |
| 8 | SS-124 — Rod's Memory: Bruce Lee — verbatim personal memories | DONE (verbatim + research + JKD/private fights/Wong Jack Man/cha-cha 2026-03-30) | DDD |
| 8 | SS-125 — Rod's Memory: Jim Morrison — verbatim personal memories | DONE (verbatim + research + Miami/Ed Sullivan/drinking/father/death 2026-03-30) | DDD |
| 8 | SS-126 — Rod's Memory: Brian Cox — verbatim personal memories | DONE (verbatim + research + D:Ream/Culshaw/Sagan/LHC twat/Stewart Lee 2026-03-30) | DDD |
| 8 | SS-127 — Rod's Memory: Nick Faldo — verbatim personal memories | DONE (verbatim + research + swing rebuild/Sandwich Gate/envelope system/18 pars 2026-03-30) | DDD |
| 12 | SS-128 — Banner/logo clickable link back to homepage from all pages | DONE (homepage banner + 9 sub-page nav-back links 2026-03-29) | BDD |
| 10 | SS-129 — Chip category tiles for non-Doors panel features (HSAI, Mundane, etc.) | DONE (chip-cat tiles across all 10 features 2026-03-30) | BDD |
| TBD | SS-130 — Room: The Apology Tour — character apologises for something they did, panel never accepts | Open | BDD |
| 12 | SS-131 — Room: The Alibi — two characters, one event, two stories, adversarial storytelling, panel as judge/jury | DONE (live at /survival-school/the-alibi, Room 15, multi-turn CROSS-EXAMINE 2026-03-30) | BDD |
| TBD | SS-132 — Room: The Intervention — panel stages an intervention for one character's worst habit | Open | BDD |
| 12 | SS-133 — Room: The Expert Witness — fish-out-of-water presented as expert, real experts defer, deference cracks | DONE (live at /survival-school/the-expert-witness, Room 16, multi-turn PRESS FURTHER 2026-03-30) | BDD |
| TBD | SS-134 — Room: The Pitch — character pitches worst survival idea as Dragon's Den presentation | Open | BDD |
| TBD | SS-135 — Room: If You Had To... — hyper-specific scenarios forcing operational responses in absurd civilian contexts | Open | BDD |
| TBD | SS-136 — Room: Which Is Worse — panel compares two unrelated incidents, argues which is worse | Open | BDD |
| TBD | SS-137 — Room: Who Would Die First — panel rates each other's survival chances in same situation | Open | BDD |
| 12 | SS-138 — Doors corridor UI redesign: Jim as carnival barker, gold Crimson Text teasers, room names replace numbers | DONE (Jim welcome, room names, gold teasers, Crimson Text 2026-03-30) | BDD |
| 12 | SS-139 — Steve Backshall: add voice profile to characters.js (character doc exists at docs/characters/steve-backshall.md, not in code) | DONE (characters.js + COMPOSURE + NAMING + relationships + 12 domain tests 2026-03-29) | DDD |
| 12 | SS-140 — Character parity audit: matrix of every character vs every attribute (voice, integrity, composure, fish disposition, temporal lens, Rod's Memory, character doc, CHAR_COLOUR). Identify and close gaps. | DONE (audit doc + billy/ollie/craighead incidents + Jim Carrey relationships 2026-03-29) | DDD |
| 10 | SS-141 — Panel member categories: tag each character (Survivalist, Naturalist, Herpetologist, Armed Forces, Fish-Out-of-Water, Wildcard). Powers future selection UI (SS-069). | DONE (PANEL_CATEGORIES + getCharacterCategories + getCharactersByCategory + 9 domain tests 2026-03-29) | DDD |
| 12 | SS-142 — Character: Bryan Grieg Fry — American venomologist at UQ, bitten 26+ times, Curse of Snake Island, naturally camp and funny, venom evolution specialist | DONE (full profile + composure + naming + relationships + category + 12 domain tests 2026-03-29) | DDD |
| 18 | SS-143 — Common quotes attribute: add `quotes` array to all characters — concrete catchphrases/verbal tics the LLM anchors on (Wade's "Cowabunga", Stevens' "look at its hood", Billy's "you're a prat", etc.) | DONE (28 characters, 3–7 quotes each, 31 domain tests 2026-03-29) | DDD |
| 12 | SS-144 — Invented catchphrases mechanic: characters confidently attribute quotes to themselves that don't exist. "As I always say..." — they have never said it. Other characters know. ConspireEngine gold. Rod's idea. | DONE (INVENTED_CATCHPHRASES + buildInventedCatchphraseInjection + 8 domain tests + drift mode 2026-03-30) | DDD |
| 14 | SS-145 — Armed forces distinction map: one handle per SF character to prevent voice blur (Assessor/Admitter/Tactician/Reporter/Competitor/Evangelist/Autonomous). Rod confirmed handles. | DONE (design doc 2026-03-29) | DDD |
| 18 | SS-146 — Character: Robin Williams — fish-out-of-water, Temporal Lens eligible (deceased 2014). Way better than Carrey — real depth, natural warmth. Good Will Hunting masterpiece performance. Good character actor. Rod knows him from films only but loves him. Similar to Carrey in abstract (energetic, madcap humour) but with genuine heart. Contrast with Carrey is the comedy engine: both manic, but Williams had soul underneath. | DONE (full profile + Temporal Lens + escalation + 16 domain tests 2026-03-30) | DDD |
| 8.0 | SS-060 — Cross-character panel references (reacts_to schema field) | DONE (reacts_to schema + thread indicators in IHW, IMD, OMI 2026-03-30) | BDD |
| 6.3 | SS-061 — Decision loop: multi-turn auto-escalation for Doors features | DONE (protagonist_response + LET THEM DIG loop in IHW + IMD 2026-03-30) | BDD |
| 18 | SS-147 — Per-character escalation mechanics: reference pools, wound fire-thresholds, round-gated escalation, named relational axes (Cusslab parity) | DONE (design doc + ESCALATION_PROFILES 28 chars + RELATIONAL_AXES 30 axes + buildEscalationInjection + 32 domain tests 2026-03-30) | DDD |
| 14.0 | SS-062 — Panel triage order consistency across all panel features | DONE (assessment + mundane fixed, ADR-002 written 2026-03-28) | BDD |
| 18 | SS-148 — Wire relational map into live system prompts: sacred exchanges, THE DISAGREEMENT, the looks, character-pair dynamics documented in docs/characters/ but not injected into IHW/IMD/OMI prompts. 31 chars with deep relational maps — most unfired. | DONE (server-side injection: ESCALATION_PROFILES + RELATIONAL_AXES + buildEscalationInjection at worker scope, called from all 5 POST handlers. Prior session wired client-side calls without defining the function — fixed 2026-03-30) | BDD |
| 18 | SS-149 — Decompose monolith system prompts: IHW/IMD prompts carry 8-10 mechanics in one block (Social Dynamics, Composure, Telephone Game, Expert Over-Reach, Morrison, Cody/Packham Overrides, Cox/Faldo, protagonist auto-response, cross-char refs). Mechanics compete for attention as complexity grows. Refactor into composable prompt modules, injected per-panel based on which chars/mechanics are active. | DONE (7 named constants + ROOM_MECHANICS config + buildMechanicsInjection. Conditional: Cody/Packham overrides omitted when char absent, Cox/Faldo mechanics omitted when neither present, Expert Over-Reach omitted when <2 experts. Server-side injection in all 5 POST handlers 2026-03-30) | BDD |
| 14 | SS-150 — Move system prompt assembly server-side: prompts currently built in browser JS and sent to worker. Full comedy engine visible in page source. Harder to version, test, iterate independently. Move prompt construction into worker, client sends only user input + charIds + state. | IN PROGRESS (Morrison injection consolidated server-side 2026-03-30. Remaining: move CHARACTER VOICES + THE MECHANIC + OUTPUT schema server-side for each room.) | BDD |
| 18 | SS-151 — World Log: persistent cross-session event store. Append-only ledger of canonically occurred panel events (Gordon's snake, THE DISAGREEMENT firing, sacred exchanges used). Inject recent events into system prompts so characters reference shared history. Design doc exists, not implemented. Biggest gap between design vision and shipped product. | DONE (design doc v1 2026-03-30) | DDD |
| 14 | SS-152 — User reputation/history: returning users get same experience as new users. Track user's past panels, scenarios, characters encountered. Unlock repeat-visit mechanics — characters recognise "you again", reference user's previous predicaments, escalate familiarity. Differentiate returning users from first-timers. | DONE (design doc + REPUTATION_TIERS + getReputationTier + computeReputationStats + buildReputationInjection + 27 domain tests 2026-03-30) | DDD |
| 12 | SS-153 — Audience mechanic: other users can't watch/react to a panel in progress. Shared URL where someone triggers a panel and friends watch it unfold near-real-time. Spectator comedy — the viral loop is watching someone else's panel cascade, not just screenshots. | DONE (design doc + AUDIENCE_FEATURES + AUDIENCE_CONFIG + buildSpectatorView + buildSpectatorCard + 17 domain tests 2026-03-30) | DDD |
| 14 | SS-154 — Character learning: characters don't remember previous encounters with this user. Per-user encounter history injected into prompts — "Last time you were here, you claimed a pigeon attacked you. We remember." Panel callbacks to user's own history. Deepens repeat engagement. | DONE (design doc + OBLIVIOUS_CHARACTERS + getCharacterEncounters + computeCharacterSentiment + buildCharacterCallback + buildCharacterLearningInjection + 29 domain tests 2026-03-30) | DDD |
| 14 | SS-155 — Curated panel archetype selector: 6 documented archetypes (Core Four, Contradictors, Authority Room, Enthusiasts, Darwin Round, Pub Panel) each with guaranteed tension axis. Let users pick an archetype instead of individual characters. More reliable comedy, showcases design work already done. | DONE (5 archetypes live on IHW, PANEL_ARCHETYPES at worker scope, buildArchetypeInjection, 4 acceptance tests 2026-03-30. Darwin Round blocked — missing Darwin character.) | BDD |
| 18 | SS-156 — RegisterContract as platform: parameterise the Room mechanic. "Must exceed previous claim" is one contract, "nobody accepts explanation" is another, "everyone agrees on something wrong" is a third. New Rooms become data not code. Path to community Room editor where users create contracts. | DONE (design doc v1 2026-03-30) | DDD |
| 10 | SS-157 — Character packs as content drops: architecture already supports it (PANEL_POOL is lookup). Adding a character is a content event not a code change. "Robin Williams joins the panel this week" is a marketing moment. Define the content-drop pipeline: character doc → characters.js → announce. | DONE (design doc + CHARACTER_PACKS 6 packs + getPackById + getPacksForCharacter + getReleasedPacks + isNewCharacter + 15 domain tests 2026-03-30) | DDD |
| 18 | SS-158 — Audio output: TTS with character-appropriate voices. Ray's "Don't." in measured baritone, Bear's breathless urgency, Attenborough's geological calm. Comedy is 70% delivery. ElevenLabs Voice Design for 30+ distinct voices, cache in R2. Transforms the experience. High cost, high payoff. | Open | BDD |
| 12 | SS-159 — User as panel member: pick "I'm Bear" and system generates everyone else while you try to stay in character. Panel calls you out when you break register. Inverts product from spectator comedy to participatory improv. | DONE (Play As room live at /survival-school/play-as, Doors Room 17, two-phase system prompt, register evaluation 0-100, 5 acceptance tests 2026-03-30) | BDD |
| 14 | SS-160 — Cross-product universe: Cusslab + SS share characters (Hawking, Bruce Lee already in both). Fish-Out-of-Water means any character can cross over. Jim Carrey's SS appearance references Cusslab events. Shared comedy universe across products — metaverse without cringe. | Open | DDD |
| 12 | SS-161 — Adversarial panels: two users each pick a character. AI generates both sides, each user chooses what their character doubles down on. Competitive comedy, audience votes on who's funnier. Debate/roast format powered by existing character engine. | DONE (The Debate room live at /survival-school/debate, Doors Room 18, two corners + escalation, solo mode v1, 4 acceptance tests 2026-03-30. Multi-user + audience votes = future.) | BDD |
| 14 | SS-162 — Morrison meta-layer: expand Morrison from random interrupter to unreliable narrator who introduces information that may or may not be true. "I heard Gordon brought a snake to a wedding" — panel must deal with unverifiable claim. Comedy infrastructure no other product has attempted. | DONE (design doc + MORRISON_CLAIM_TEMPLATES + pickClaimTarget + buildMorrisonClaimInjection + 17 domain tests 2026-03-30) | DDD |
| 8 | SS-163 — Thin features risk: Tier 3 features (Eat It, Fact-Checker, Coyote, Mundane, Deathmatch, Irwin Memorial, One Man In) are single-shot with no escalation/multi-turn/composure. They dilute perception of what the deep Rooms features actually are. Either deepen them with RegisterContracts or funnel users toward Rooms first. | DONE (risk assessment doc + 4 options + recommendation 2026-03-30) | DDD |
| 18 | SS-164 — In My Defence design pivot: panel WEREN'T there, court-case interrogation — dig into facts, pick apart fact from fiction. Comedy from not knowing, not being in on the joke. Update sub-header, system prompt voice instructions, mechanic framing. | DONE (court-case pivot in worker.js commit a2baca2 2026-03-30) | BDD |
| 14 | SS-165 — The Alibi: fix protagonist selection — mechanic requires two protagonists, UI only allows one. Two characters, one event, two conflicting stories. | DONE (two-protagonist UI + worker.js commit a2baca2 2026-03-30) | BDD |
| 12 | SS-166 — Remove Alibi + Expert Witness standalone nav tiles from homepage — these are Doors rooms only, not standalone features. Remove tiles and left-nav entries. | DONE (tiles removed commit a2baca2 2026-03-30) | BDD |
| 12 | SS-167 — How Screwed Am I chip UI: chips are a tangled mess. Group under category tiles (remove ALL button, show only category groups by default). Same pattern as other features. | DONE (chip categories commit a2baca2 2026-03-30) | BDD |
| 12 | SS-168 — Will You Eat It deep content: catalogue species per category (mushrooms, berries, insects, etc.) with edibility levels (safe → poisonous → deadly), describe in survival context, ask "would you eat it from this info?" Replace high-level items with specific species. | DONE (design doc + eat-it-species.js 52 species + EAT_IT_CATEGORIES + getSpeciesByCategory + getEdibilityLevel + buildEatItPromptContext + 21 domain tests 2026-03-30) | DDD |
| 10 | SS-169 — Expert Witness content: add scenario chips and predicament content. Categories exist but are empty. Populate with fish-out-of-water expert scenarios. | DONE (design doc 37 scenarios across 5 categories 2026-03-30) | DDD |
| 10 | SS-170 — Mundane Mode expansion: explore ideas for deeper functionality — multi-turn, escalation, category depth. Raise sub-items once ideas are shaped. | DONE (design doc 5 expansion ideas + 50+ scenario chips + sub-items SS-171–175 2026-03-30) | DDD |
| 6 | SS-171 — Rename pipeline layer labels: L1 = Unit Test, L2 = Contract / Integration Test, L3 = Logic / Acceptance Test, L4 = UI / UX Test, L5 = Para-Functional / Operational Test. Update pipeline-report.sh and any docs that reference current names. | Open | TDD |
| 27 | SS-172 — Wall Walkers: quiz data layer — question bank (12 categories, 13 GPS stops, 80+ pre-loaded questions), flora/fauna collection DB with rarity tiers (bronze/silver/gold/legendary) | Open | DDD | Epic: "Wall Walkers"
| 27 | SS-173 — Wall Walkers: worker route GET /survival-school/wall-walkers — mobile-first HTML, GPS trigger logic, quiz UI, two-player sync via shared game code, offline pre-loaded core | Open | BDD | Epic: "Wall Walkers"
| 27 | SS-174 — Wall Walkers: homepage tile (top position) + left-nav banner — Ivan must find it instantly on his phone | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-175 — Wall Walkers: flora/fauna collection mechanic — spot and collect species, rarity tiers, SS characters comment on sightings (Bear misidentifies, Ray corrects) | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-176 — Wall Walkers: two-player sync — shared game code, both phones see same question, first correct answer scores, live leaderboard | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-177 — Wall Walkers: SS character commentary on quiz answers — Expert Over-Reach on history/nature, ConspireEngine on wrong answers, characters talk shit about things they don't know | Open | BDD | Epic: "Wall Walkers"
| 12 | SS-178 — Wall Walkers: AI bonus rounds — when signal available, generate location-specific questions using SS character engine via worker POST route | Open | BDD | Epic: "Wall Walkers"
| 12 | SS-179 — Wall Walkers: daily summary / pub review — end-of-day scoreboard + character roast of the day's performance, designed for reading over a pint | Open | BDD | Epic: "Wall Walkers"
| 8 | SS-180 — Wall Walkers: Twice Brewed special pub quiz round — dedicated round when GPS triggers near Twice Brewed Inn | Open | BDD | Epic: "Wall Walkers"
| 8 | SS-181 — Wall Walkers: aesthetic — worn stone, Roman carved relief, earthy Northumberland palette, weathered military dispatch scroll meets field guide | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-182 — Wall Walkers: end-of-day fireside summary — both players confirm day close, panel roasts performance, reviews scores/answers/collectibles, cosy pub chat tone with Spinal Tap 11 banter | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-183 — Wall Walkers: common + individual questions — shared core questions both players answer (compare), plus individual questions unique to each player per round | Open | BDD | Epic: "Wall Walkers"
| 12 | SS-184 — Wall Walkers: more questions — expand question bank beyond 77, add lateral thinking riddles, logic puzzles, true/false rapid fire, estimation rounds, legends round | Open | DDD | Epic: "Wall Walkers"
| 14 | SS-185 — Wall Walkers: round structure — morning briefing (3q), location rounds (3-5q), walking rounds (timer), pub rounds (10q double points, mixed format), daily cap ~30 | Open | BDD | Epic: "Wall Walkers"
| 12 | SS-186 — Wall Walkers: local legends deep content — research crimes, myths, scary stories, phenomena for all 13 stops. Pre-loaded for offline. | IN PROGRESS | DDD | Epic: "Wall Walkers"
| 18 | SS-187 — Wall Walkers: daily expert challenges — each panel member sets a task at morning briefing matching their expertise. Fox: tactical. Ray: bushcraft. Bear: endurance/absurd. Irwin: wildlife. Attenborough: narration. Cody: barefoot. Les: practical. Reviewed at fireside. | DONE (deployed 2026-04-22) | BDD | Epic: "Wall Walkers"
| 18 | SS-188 — Wall Walkers: Bede as anchorman — rebuild app voice with Venerable Bede as host/anchor, Attenborough as co-host. Bede opens/closes days, judges performance, sets harder questions, comments on locations from his Ecclesiastical History. Detectorists register. | Open | BDD | Epic: "Wall Walkers"
| 12 | SS-189 — Wall Walkers: Expert React — after quiz answers, experts claim personal involvement with the real fact, teach it at inappropriate venues, amplify/reject using their expertise. Pre-loaded offline + AI "Ask the Panel" button online. | Open | BDD | Epic: "Wall Walkers"
| 10 | SS-190 — Wall Walkers: metal detecting finds research — what has been / could be found at each location along the route. Roman coins, brooches, military equipment, Celtic artefacts. Feed into quiz questions and collection mechanic. Detectorists tie-in. | Open | DDD | Epic: "Wall Walkers"
| 18 | SS-191 — Wall Walkers: Bede character doc — full character file with real Ecclesiastical History excerpts, known views on Wall locations, theological positions, personality from historical sources, comedy engine, myths about Bede. New character doc at docs/characters/venerable-bede.md | Open | DDD | Epic: "Wall Walkers"
| 18 | SS-192 — Wall Walkers: POI design — design break stops along route at good points for rest, refuelling, scenery, wildlife, architecture, events, history, weird topics, expert challenges. Each POI gets Bede commentary, panel discussion, "Would Bede approve?" mechanic. | Open | DDD | Epic: "Wall Walkers"
| 14 | SS-193 — Wall Walkers: interactive Bede — players can challenge Bede's writings, ask Bede questions, "Would Bede approve?" voting mechanic on panel responses. Multi-turn Bede conversations via AI. | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-194 — Wall Walkers: end-of-day processing flow — separate process events for closing the day, scoring, summary, expert commentary. Both players see same/different comments. Linear flow from quiz complete → end-of-day click → scores → expert interaction → Bede summary → fireside round. Triggers, formats, top/middle/tail for each stage. | Open | DDD | Epic: "Wall Walkers"
| 14 | SS-195 — Wall Walkers: post-close features — features available after day closes but not round-based (Ask the Panel, Legends, collection review). Separate tiles on dashboard. Fireside-adjacent activities. | Open | BDD | Epic: "Wall Walkers"
| 18 | SS-196 — Wall Walkers: day flow design doc — complete flow from morning briefing through rounds through end-of-day through fireside. Triggers, transitions, formats, expert involvement at each stage. Reflected in landing page/dashboard. | DONE (docs/wall-walkers-day-flow.md) | DDD | Epic: "Wall Walkers"
| 14 | SS-199 — Wall Walkers: collectibles deep dive — explore collection mechanic beyond photo proof. Categories, achievements, rare sighting bonuses, daily collection challenges, expert commentary on evidence quality, end-of-day collectibles review with panel roasting. | Open | BDD | Epic: "Wall Walkers"
| 14 | SS-198 — "Bede Shredding" — panel forensically dismantles Bede's quotes, facts, reliability, personal acts, beliefs, sources. Real Bede claim presented, panel tears it apart, reveal of actual truth, Bede gets right of reply. Rich veins: wrong builder, never left Jarrow, miracle cherry-picking, "worms" quote, Gildas/Orosius as dodgy sources, half a bottle of wine daily — was any of it written sober? Affectionate destruction. Could be round type or subsection of Bede Wilderment. | DONE (live, own tab + dashboard tile 2026-04-22) | BDD | Epic: "Wall Walkers"
| 14 | SS-197 — "Bede's Wilderment" — standalone feature/tile. Bede discusses topics using 8th-century knowledge while experts use contemporary knowledge. Both sides try to explain using each other's language and understanding, reaching into each other's worlds and fucking it up. Others join in to help or hinder (through wit, incompetence, or confident ignorance). Fox explains SAS to a monk. Bede explains angels to Fox. Bear explains urine to a man with a guaranteed daily wine ration. Marcus Cocceius Firmus compares Roman vs modern warfare. Vikings vs Rules of Engagement. | DONE (live, own tab + dashboard tile, 5-round escalation 2026-04-22) | BDD | Epic: "Wall Walkers"
| 27 | SS-200 — Panel voice principles: cross-project standard defining mannerisms vs flavours split, character-agnostic patterns (eyewitness_self_correct, non_sequitur_animal, etc.), reacts_to interaction schema. Canonical at leanspirited-standards/standards/panel-voice-principles.md. Pointer files in survival-school and cusslab docs. | DONE (pushed to GitHub 2026-04-22) | DDD | Epic: "Wall Walkers"
| 27 | SS-201 — Wall Walkers panel voice rebuild: flavour banks for all 8 panelists (Bear, Ray, Fox, Les, Attenborough, Irwin, Cody, Bede). Mannerisms constant, flavours sampled per call, locale-constrained (no Borneo/saltwater crocodile). Wired into all 4 panel endpoints (shredding, ask, wilderment, predictions). | DONE (deployed 2026-04-22, verified 8 distinct voices) | BDD | Epic: "Wall Walkers"
| 27 | SS-202 — Bede Wilderment / Bede Shredding structural split — previously embedded in a single tab, now separate tabs + separate dashboard tiles. Also fixed chip-clobber bug where the generic .filter-btn handler was overwriting inline onclick on every action chip across Wilderment, Shredding, Ask the Panel (all three were silently broken). | DONE (deployed 2026-04-22) | BDD | Epic: "Wall Walkers"
| 18 | SS-203 — Wall Walkers chip categorisation: native HTML <details>/<summary> accordion for Ask the Panel (6 cats), Wilderment (3 cats), Shredding (3 cats). Collapsed by default, count badges. Zero JS. | DONE (deployed 2026-04-22) | BDD | Epic: "Wall Walkers"
| 12 | SS-204 — Fireside dashboard tile: 16-bit pixel-art inline SVG (two chairs, log pile, flickering fire, dimpled tankards, book on chair seat). CSS-animated fire flicker via three layered keyframe groups. | DONE (deployed 2026-04-22) | BDD | Epic: "Wall Walkers"
| 8 | SS-205 — Wall Walkers: enrich dashboard tile text. Rod loves the tiles but wants more descriptive text on each to bring them to life. | Open | BDD | Epic: "Wall Walkers"
| 8 | SS-206 — Wall Walkers: notes alongside photos in Collection. When capturing a species sighting, user can attach a free-text note stored with the photo + GPS + timestamp. | Open | BDD | Epic: "Wall Walkers"
| 12 | SS-207 — Cusslab port of panel-voice-principles: apply mannerisms/flavours split to Cusslab panels (Long Room, 19th Hole, etc.). Cusslab already has ~40% (rich character docs, typed reacts_to in HSA, ConspireEngine spec). Missing: formal flavour banks per character. | Open | DDD | Epic: "Cross-product Standards"
| 10 | SS-208 — Wall Walkers: remaining character voice banks — panel rebuild covers 8 primary characters. If Rod brings in Faldo, Cox, Ramsay as panel drop-ins (carry-forward), they need banks too. Same template. | Open | DDD | Epic: "Wall Walkers"
| 27 | SS-209 — Wall Walkers Legends endpoint missed in 2026-04-22 voice rebuild. Port flavour banks + mannerism/pattern model to `/survival-school/wall-walkers-legends` (cusslab/worker.js:17265). Regression marker: Bear's "Bede said Severus built it" line — that shape should be impossible after fix. | DONE (cusslab commit bb2cbd0, deployed 2026-04-22; live verification: Ray 2 short sentences, Les 4 full stops in 6 words, Bear eyewitness_self_correct firing on Sycamore Gap test topic) | BDD | Epic: "Voice rebuild"
| 24 | SS-210 — Voice rebuild porting: extend flavour-bank/mannerism/pattern model from the 4 Wall Walkers endpoints to ALL remaining SS panel endpoints (How Screwed Am I, I've Had Worse, In My Defence, Panel Q&A, Mundane, Deathmatch, Fact-Checker, Coyote, One Man In, Alibi, Expert Witness, Debate, Irwin Memorial). Per-character length tokens in each schema — no more uniform `<2-3 sentences>`. | Open | BDD | Epic: "Voice rebuild"
| 24 | SS-211 — Fish-Out-of-Water Pack Two: wire David Mitchell, Louis Theroux, Jeremy Clarkson, Geoffrey Boycott (Cusslab crossover) into js/characters.js. Character docs complete (2026-04-22). Needs: CHARACTERS entries, CHAR_COLOURS, FISH_DISPOSITIONS, escalation profiles, pack definition in CHARACTER_PACKS, pattern-affinity wiring. | Open | DDD | Epic: "Fish-out-of-water"
| 21 | SS-212 — Mis-quoting attribute: per-character `misquote_propensity` modulated by situation and emotional state. Targets: history, Bede, each other's catchphrases, what was literally said a minute ago. Fires in multi-round features. Extends ConspireEngine pattern. Rod's core comedy preference (feedback_character_comedy). | Open | DDD | Epic: "Voice rebuild"
| 21 | SS-213 — Character comment colour borders (Heckler-style): each speaker's bubble bordered/tinted with their CHAR_COLOURS value in all panel features. User speech gets distinct border when SS-215 ships. Lightweight CSS — no new JS. | Open | BDD | Epic: "UI polish"
| 20 | SS-214 — User intervention between rounds: freetext field appears at end of each round (challenge / agree / summarise / continue). Submission triggers next round. User becomes sixth unreliable narrator — panel misquotes user's intervention in next round (pairs with SS-212). Empty submission = "continue, no comment." | Open | BDD | Epic: "Panel interaction"
| 18 | SS-215 — Multi-round cycling with persistent in-session context: rich conversation across rounds; each round's panel output references previous rounds' content, corrupted. Per-session history payload grows each round. Paired with SS-212 (misquoting) and SS-214 (user intervention). | Open | BDD | Epic: "Panel interaction"
| 18 | SS-216 — Per-round character state display (Heckler-style): visible state change rendered after each round — disposition shift, composure delta, wound fired, relational axis moved. Source: existing state engines (FISH_DISPOSITIONS, COMPOSURE_PROFILES, RELATIONAL_AXES). UI surface missing. | Open | BDD | Epic: "Panel interaction"
| 15 | SS-217 — "Tell Me More" button in Legends. Extends the Legends panel exchange into a deeper multi-round conversation. Blocked by SS-212/214/215 (misquoting + intervention + cycling). | Blocked by SS-212/214/215 | BDD | Epic: "Wall Walkers"
| 12 | SS-218 — Panel Voice Principles Lever 0 audit: Lever 0 (Reactive Model — model the people, not the content) added to canonical standard 2026-04-22. Audit all 33 existing character files for: experience, lie/bullshit propensity, stonewall propensity, feelings about topic, feelings about specific other characters. Add missing dimensions where absent. | Open | DDD | Epic: "Voice rebuild"
| 24 | SS-219 — Slot-type registry + per-character slot banks + archetype generation pipeline. Turn Pattern Lab (.claude/pattern-lab.md) from design-artefact into generation-code. Needs: (a) central slot-type registry file naming HISTORICAL_FIGURE / FEARSOME_OPPONENT / CAREER_ANCHOR / RANDOM_PERSON / SURVIVAL_CONCERN / EXPERTISE_ACTION / HUMILIATION_VERB / CLAIM_STRENGTH_RUNG / RESCUE_FRAME etc.; (b) per-character banks keyed by slot type; (c) archetype definitions as structured data (consumes: [slot types], scalar ladders, rarity rules); (d) buildArchetypeInjection(archetype, character, context) samples banks + builds prompt fragment; (e) regression test per archetype (Bear/Bede/Severus is one benchmark, others per archetype). Multi-session refactor. Unlocks Pattern Lab archetypes #001–#011 as generation-grade (currently design-grade only). | Open | DDD | Epic: "Voice rebuild"

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

SS-102–SS-114: 13 additional character docs completed 2026-03-29.
- Billy Billingham, Ollie Ollerton, Coyote Peterson, Chris Ryan, Andy McNab,
  Christian Craighead, Ant Middleton, Jim Carrey, Stephen Hawking, Bruce Lee,
  Jim Morrison (created from scratch), Brian Cox, Nick Faldo
- All enriched with Comedy Engine + Wrong Answer Commentary sections
- Rod's Memory sections left as TBC — separate backlog items SS-115–SS-127

---

## ROD'S MEMORY RICHNESS (capture when Rod gives verbatim memories)

---

### SS-115 — Rod's Memory: Billy Billingham

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Billy Billingham. When Rod provides them, write immediately to docs/characters/billy-billingham.md § Rod's Memory. Confirm file path before Rod continues.

---

### SS-116 — Rod's Memory: Ollie Ollerton

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Ollie Ollerton. Target: docs/characters/ollie-ollerton.md § Rod's Memory.

---

### SS-117 — Rod's Memory: Coyote Peterson

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Coyote Peterson. Target: docs/characters/coyote-peterson.md § Rod's Memory.

---

### SS-118 — Rod's Memory: Chris Ryan

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Chris Ryan. Target: docs/characters/chris-ryan.md § Rod's Memory.

---

### SS-119 — Rod's Memory: Andy McNab

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Andy McNab. Target: docs/characters/andy-mcnab.md § Rod's Memory.

---

### SS-120 — Rod's Memory: Christian Craighead

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Christian Craighead. Target: docs/characters/christian-craighead.md § Rod's Memory.

---

### SS-121 — Rod's Memory: Ant Middleton

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Ant Middleton. Target: docs/characters/ant-middleton.md § Rod's Memory.

---

### SS-122 — Rod's Memory: Jim Carrey

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Jim Carrey. Target: docs/characters/jim-carrey.md § Rod's Memory.

---

### SS-123 — Rod's Memory: Stephen Hawking

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Stephen Hawking. Target: docs/characters/stephen-hawking.md § Rod's Memory.

---

### SS-124 — Rod's Memory: Bruce Lee

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Bruce Lee. Target: docs/characters/bruce-lee.md § Rod's Memory.

---

### SS-125 — Rod's Memory: Jim Morrison

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Jim Morrison. Target: docs/characters/jim-morrison.md § Rod's Memory.

---

### SS-126 — Rod's Memory: Brian Cox

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Brian Cox. Target: docs/characters/brian-cox.md § Rod's Memory.

---

### SS-127 — Rod's Memory: Nick Faldo

**Status:** Open
**Loop:** DDD
**CD3:** C=2 D=2 D=2 → **CD3=8**
**Raised:** 2026-03-29

Rod's verbatim personal memories for Nick Faldo. Target: docs/characters/nick-faldo.md § Rod's Memory.

---

### SS-128 — Banner/logo clickable link back to homepage from all pages

**Status:** DONE
**Loop:** BDD
**CD3:** C=3 D=2 D=2 → **CD3=12**
**Raised:** 2026-03-29
**Closed:** 2026-03-29

Homepage banner wrapped in `<a href="/survival-school">`. 9 sub-pages that had no back navigation now have `← SURVIVAL SCHOOL` inline link at top of `#app`. IHW, IMD, and Rooms already had nav-back links. Pipeline GREEN (647 tests).

**Acceptance Criteria:**
```gherkin
Scenario: Banner links to homepage
  Given a user is on any Survival School page
  Then the banner/logo at the top is a clickable link to /survival-school
```

---

### SS-129 — Chip category tiles for non-Doors panel features

**Status:** Open
**Loop:** BDD
**CD3:** C=2 D=3 D=2 → **CD3=12** → normalised **10** (design + build)
**Raised:** 2026-03-29

Panel features that use chips (How Screwed Am I, Mundane, Will You Eat It, etc.) currently present chips as a flat list — messy, confusing, ugly. Copy the Doors corridor tile pattern: group chips into category tiles (e.g. "Animal Encounters", "Environmental", "Human Error" for HSAI). User taps a tile to see chips in that category. Same grid layout, same visual language as the Doors.

**Acceptance Criteria:**
```gherkin
Scenario: Chip categories displayed as tiles
  Given a user opens a panel feature with chips
  Then chips are grouped into labelled category tiles
  And tapping a tile reveals only chips in that category
```

---

### SS-130 — Room: The Apology Tour

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Character apologises for something they actually did. Panel decides if the apology is accepted. It never is. Each attempt reveals new information that makes the original thing worse. User picks the character and the incident.

RegisterContract: surfacePosition=sincere_remorse, deepMechanic=making_it_worse_by_explaining

Jim's sell: *"They're sorry. They're going to tell you how sorry they are. By the end you'll wish they hadn't."*

---

### SS-131 — Room: The Alibi

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Two characters were at the same event. Stories don't match. Panel cross-examines. Neither changes their version. User picks the event and the two characters. Diverging memory mechanic as the whole room.

RegisterContract: surfacePosition=honest_recollection, deepMechanic=two_truths_that_cannot_both_be_true

Jim's sell: *"Two people. One event. Two completely different versions. Both of them were there. Neither of them is lying. That's the problem."*

---

### SS-132 — Room: The Intervention

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Panel stages an intervention for one character's worst habit. Target doesn't see the problem. Others pile on with examples. Therapeutic framing ("we care") from people constitutionally unequipped to care therapeutically.

RegisterContract: surfacePosition=compassionate_concern, deepMechanic=public_destruction_with_good_intentions

Jim's sell: *"They've gathered because they care. They're going to tell someone the truth. It's going to go badly for everyone."*

---

### SS-133 — Room: The Expert Witness

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Fish-out-of-water character presented as the survival expert. Real experts defer to them. Cox explaining river crossings. Faldo applying golf course management to Dartmoor. The fish doesn't know they're wrong.

RegisterContract: surfacePosition=deference_to_expertise, deepMechanic=the_expert_knows_nothing

Jim's sell: *"Someone in this room knows nothing. Everyone else has to pretend they do. Nobody's sure which way round it is."*

---

### SS-134 — Room: The Pitch

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Character pitches their worst survival idea as Dragon's Den / Shark Tank presentation. Panel asks investor questions. "What's your exit strategy?" "From the jungle?" "From the business." Bear pitching urine filtration. Cody pitching barefoot hiking boots (just feet).

RegisterContract: surfacePosition=serious_business_proposition, deepMechanic=the_idea_is_terrible_and_everyone_knows

Jim's sell: *"Someone has an idea. It's a bad idea. They're going to present it like it's a good idea. The panel has questions."*

---

### SS-135 — Room: If You Had To...

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

User feeds in hyper-specific scenarios forcing operational/expert responses in absurd civilian contexts. "Foxy, how would you take out key people quietly in a crowded motorway service station on Easter bank holiday weekend?" Characters must answer seriously in their domain. The specificity of the setting IS the comedy.

RegisterContract: surfacePosition=operational_briefing, deepMechanic=expertise_applied_to_the_wrong_universe

Jim's sell: *"Ask them how they'd do it. Be specific. They will answer you seriously. That is the problem."*

---

### SS-136 — Room: Which Is Worse

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Panel compares two often completely unrelated incidents and argues which is worse. "Being stuck in a lift with Cody for 48 hours, or being chased by a cassowary through a Tesco car park?" Distinct from IHW — this is judgement and comparison, not escalation. Panel splits. Arguments reveal character.

RegisterContract: surfacePosition=objective_assessment, deepMechanic=entirely_subjective_and_they_all_know_it

Jim's sell: *"Two things. Which is worse. They all know the answer. None of them agree."*

---

### SS-137 — Room: Who Would Die First

**Status:** Open
**Loop:** BDD
**CD3:** TBD (Three Amigos)
**Raised:** 2026-03-29
**Epic:** The Rooms

Panel rates *each other's* chances of surviving the same situation. Turns the panel inward. Fox assessing Bear with tactical honesty. Bear insisting he'd be fine. Billy not engaging because the question is beneath The Standard. Attenborough narrating it like a nature documentary about the panel itself.

RegisterContract: surfacePosition=honest_peer_assessment, deepMechanic=settling_scores_under_professional_cover

Jim's sell: *"Same situation. All of them. Who goes first. They've been thinking about this longer than you have."*

---

### SS-138 — Doors corridor UI redesign

**Status:** Open
**Loop:** BDD
**CD3:** TBD
**Raised:** 2026-03-29

Jim Morrison as carnival barker — conversational welcome, not block caps. Gold Crimson Text italic for room teasers. Door tiles show room names instead of numbers. Locked doors tease what's coming. Better text contrast against dark background. Jim's voice sells each room.

Design decisions:
- Jim's welcome: conversational, warm-but-ominous, not a rotating quote
- Door tiles: room name (bold) + Jim's teaser (gold serif italic)
- Locked doors: visible with teaser, greyed but readable
- Font: Crimson Text (Google Fonts) for teasers — literary, Morrison's poet energy
- Colour: gold on dark background for maximum contrast

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

**Status:** DONE
**Priority:** Medium — depends on SS-048 mode architecture
**Loop:** BDD
**Raised:** 2026-03-27
**Closed:** 2026-03-29
**Depends on:** SS-048 (mode architecture), SS-052 (Craighead character)

**The concept:** EXFIL/INFIL mode named after Craighead's banned memoir. You receive a phone call. Situation described. No orders. No chain of command. Panel briefs your solo entry — approach, exit, speed/aggression/surprise. You make the calls. Panel assesses whether you make it out.

**The framing:** Attenborough narrates your approach as a nature documentary. Craighead is the briefing officer. Billy assesses whether your plan meets the standard. Foxy notes the thing you missed. Ollie asks if you're sure you want to do this and respects the answer.

**Applies to:** Any EXFIL/INFIL scenario — DusitD2, IKEA car park on a Sunday, hostile Pret a Manger, actual combat.

**Shipped:** Live at /survival-school/one-man-in. Homepage tile LIVE. 8 situation chips (DusitD2, IKEA, Pret, embassy, mountain, wedding, self-checkout, Bravo Two Zero). Kit chips. EXFIL probability meter, route, abandon list, movement order, abort criteria. Craighead lead + Billy/Fox/Ollie + rotating pool. Morrison integration. Composure engine. Share button. 8 acceptance tests, L5 OAT green.

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

---

### SS-060 — Cross-character panel references (reacts_to schema field)

**Status:** Open
**Priority:** High
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** BDD
**Raised:** 2026-03-28
**Epic:** Panel Interaction Model

**The problem:** Panel characters respond to the user's situation independently. They do not
acknowledge, contradict, or build on what another panellist said. The relationship matrix
(Bear/Ray silence, Billy/Ollie exchange, Fox/Hales endorsement) exists in SHARED_CONTEXT
but has no schema slot to express it in panel output.

**The fix:** Add an optional `reacts_to` field to each panel card in the JSON response schema.

```json
{
  "charId": "fox",
  "text": "Technically correct. I'd add — what are the exit options.",
  "reacts_to": {
    "charId": "ray",
    "register": "endorsement"
  }
}
```

**Register options:** endorsement | quiet_disagreement | silence_noted | deflation | builds_on

**Rendering:** When `reacts_to` is present, the card gets a subtle visual treatment —
a thin left-border accent in the referenced character's colour, or a small "↳ re: Ray" tag.
Not a quote. Not a speech bubble. A thread indicator. Quiet.

**Prompt instruction to add to buildSystemPrompt():**
"Where a character has a strong established relationship with another panellist who has already
spoken, they may reference that panellist directly — once, briefly, in their natural register.
Bear never directly contradicts Ray; silence and contrast do the work. Fox endorses Hales with
one word. Billy's reference to Bear's TA service fires once per session maximum.
The relationship does not need to be explained."

**Applies to:** How Screwed Am I (assessment + reaction), How Bad Is This, Mundane Mode,
The Coyote Index, Panel Q&A (SS-009). All panel features.

**Backwards compatible:** `reacts_to` is optional. Existing renders ignore it gracefully.
No schema migration needed.

**Cusslab port:** BL-163 is the equivalent item for Cusslab panels.

**Acceptance Criteria:**
```gherkin
Feature: Cross-character panel references

  Scenario: Fox endorses Ray in character
    Given the panel has responded to a bushcraft-relevant situation
    When Fox's card includes a reacts_to field referencing Ray
    Then the UI renders a visual thread indicator on Fox's card
    And the indicator references Ray's name
    And Fox's text is consistent with his one-word endorsement register

  Scenario: Billy references Bear's TA service at most once per session
    Given Billy and Bear are both on the panel
    When Billy's reacts_to references Bear
    Then the text is brief and stays in Billy's flat authoritative register
    And if the panel is called again in the same session
    Then Billy's reacts_to for Bear does not fire again

  Scenario: reacts_to is absent on most cards
    Given any panel response
    Then fewer than half the panel cards contain a reacts_to field
    And Attenborough never has a reacts_to field

  Scenario: Missing reacts_to renders without error
    Given a panel card with no reacts_to field
    Then the card renders identically to current behaviour
    And no visual thread indicator is shown
```

---

### SS-061 — Decision loop: Fighting Fantasy mechanic for panel features

**Status:** Open
**Priority:** High
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** BDD
**Raised:** 2026-03-28
**Epic:** Panel Interaction Model

**Context:** SS already has this mechanic in How Screwed Am I (state object, decision loop,
next_actions, probability shifts). This item formalises the pattern for all SS panel features
so the mechanic is consistent and the code is not duplicated.

**State object (already live in How Screwed Am I):**
```javascript
{
  situation: null,
  turnCount: 0,
  history: [],
  pressureAccumulation: {}
}
```

**Cusslab port:** BL-164 is the equivalent item to bring this mechanic to Cusslab panels.
Once both ship, the two products share the same interaction model.

**Acceptance Criteria:**
```gherkin
Feature: Panel decision loop across SS panel features

  Scenario: Panel generates next_actions after assessment response
    Given I have submitted a situation to How Screwed Am I
    When the panel responds
    Then three next_action options are shown below the panel cards
    And a freetext field is available for a custom action
    And the state persists across subsequent turns

  Scenario: Choosing an action triggers a reaction round
    Given the panel has responded and shown three next_actions
    When I select one of the offered actions
    And I press Confirm
    Then the panel reacts specifically to that action
    And the reaction builds on the prior exchange
    And survival_probability shifts accordingly

  Scenario: State accumulates correctly across turns
    Given I have made three action choices
    Then the history array contains three entries
    And survival_probability reflects cumulative decisions

  Scenario: Terminal state fires Attenborough Eulogy
    Given my decisions have driven survival_probability to zero
    Then is_terminal is set to true
    And the Attenborough Eulogy renders
    And no further actions are offered
```

---

### SS-062 — Panel triage order formalised (SS-034 port to all panel features)

**Status:** Open
**Priority:** Medium
**CD3:** 12 (Confidence 3 × Desirability 2 × Deliverability 2)
**Loop:** BDD
**Raised:** 2026-03-28
**Epic:** Panel Interaction Model

**Context:** SS-034 baked triage order (IMMEDIATE first, COMEDY second) into the reaction
mode buildSystemPrompt(). This item ensures the pattern is applied consistently to all
panel features — including any new ones added after SS-034.

**Triage structure for SS panels:**
1. IMMEDIATE (Ray, Fox) — direct survival relevance, establish stakes
2. COMEDY (Bear, Hales, Cody, Stroud) — human cost, deflation, absurdity
3. CLOSER (Attenborough) — always last, geological calm

**Note:** SS-034 already ships the core of this. This item tracks audit + consistency across
all panel features (CASEVAC, EXFIL, Coyote Index, etc.) as the feature set grows.

**Cusslab port:** BL-165 is the equivalent triage order formalisation for Cusslab panels.

**Acceptance Criteria:**
```gherkin
Feature: Panel triage order across all SS features

  Scenario: IMMEDIATE tier responds before COMEDY tier
    Given any SS panel feature is invoked
    When the panel responds
    Then Ray and Fox cards appear before Bear and Hales cards

  Scenario: Attenborough always closes
    Given any SS panel response
    Then Attenborough's card is always the final card rendered
    And his register is distinct from all preceding cards

  Scenario: New panel features inherit triage order
    Given a new panel feature is added to SS
    Then buildSystemPrompt() for that feature applies IMMEDIATE → COMEDY → CLOSER ordering
```

---

### SS-063 — Panel archetypes: design who goes together and why

**Status:** Open
**Priority:** High — unblocks panel pool, Darwin, cross-product characters, The Rooms casting
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** DDD
**Raised:** 2026-03-28
**Epic:** Panel Design

**The task:** Design 4–6 named panel archetypes. Each archetype is a curated group of characters with a rationale — why these people in a room together produce the best comedy. The archetype name and its casting logic become the panel selection system.

**Design principles:**
- Chemistry over completeness — a panel of 4 well-chosen characters beats 7 randomly assigned ones
- Archetypes are about contrast, not consensus — the tension between character types is the engine
- Each archetype has a flavour: some are heavier on expertise, some on comedy, some on disagreement
- Fish-out-of-water characters (see SS-064) slot into specific archetypes, not all of them

**Candidate archetype directions (to be designed, not decided):**
- The Core Four: Ray, Fox, Bear, Attenborough — expertise anchor, tactical, chaos, close
- The Contradictors: characters chosen for maximum factual disagreement (Ray correcting Bear, Cody noting the obvious thing nobody else saw)
- The Authority Room: Billy, Fox, Stroud — minimal words, maximum judgment, nobody is enthusiastic
- The Enthusiasts: Bear, Cody, Hales, Cox (fish-out-of-water guest) — high energy, high wrongness
- The Darwin Round: Darwin + any two survivors — deceased expert meets living field operators. What does he make of modern kit?
- The Pub Panel: characters who would actually end up in a pub after — looser, more comedy-forward

**Output:** A design doc (`docs/panel-archetypes.md`) with:
- 4–6 named archetypes
- Casting per archetype (character IDs)
- One-line rationale per archetype
- Which archetype each new character (Darwin, Cox, Faldo etc.) naturally belongs in
- Which archetypes support fish-out-of-water casting

**Three Amigos needed before writing the doc:** How many archetypes? Can the user choose, or is it panel-of-the-day? Does The Rooms (BL-166) share archetypes with SS or maintain its own casting?

---

### SS-064 — Cross-product fish-out-of-water characters: Cox, Faldo, and others

**Status:** Open
**Priority:** High — new comedy register, significant product differentiation
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** DDD
**Raised:** 2026-03-28
**Epic:** Panel Design

**The idea:** Bring characters from Cusslab (and beyond) into SS panels as fish-out-of-water guests. These characters are brilliant in their own domain, completely wrong in the survival context, and entirely sincere about it. The comedy is structural — their expertise is real, their application of it is catastrophically off.

**Character archetypes available (four modes, not one):**

1. **Enthusiastic amateur** — genuinely excited, gets it mostly wrong, no self-awareness
   - Prof Brian Cox: explains the thermodynamics of fire with full accuracy while you freeze to death
   - Coyote Peterson (already in SS, but this mode suits him): clinically excited about the danger

2. **Know-it-all, also wrong** — confident, dismissive of nuance, wrong in a specific way
   - Sir Nick Faldo: the survival equivalent of hitting out of the rough — he has a method, it's wrong
   - Candidates from Cusslab Boardroom: Harold, Roy — standards applied to wrong domain

3. **Dismissive** — doesn't think this constitutes a real emergency, compares unfavourably to their world
   - Keane: this is nothing compared to selection, stop complaining
   - Candidates: any character whose world has genuine extremity that makes survival seem trivial

4. **Lateral** — offers something true and specific but from a completely different angle
   - Attenborough already does this (he's the closer)
   - Darwin: genuine expertise, different century, wrong tools
   - Cox: the physics is correct, the application is irrelevant

**Characters confirmed by Rod:** Prof Brian Cox, Sir Nick Faldo. Others TBD at Three Amigos.

**What each character needs:**
- Character file (`docs/characters/[name].md`) with voice, wounds, and fish-out-of-water mode
- Which archetype mode they inhabit (enthusiastic/know-it-all/dismissive/lateral)
- death_flash eligibility (deceased only — Cox and Faldo alive, Darwin deceased)
- Which panel archetypes (SS-063) they slot into
- Whether they cross-exist in Cusslab panels too (Cox and Faldo already do)

**Three Amigos needed:** How many fish-out-of-water per panel? One guest maximum, or can you have two? Does the guest know they're out of their depth, or are they entirely confident?

---

### SS-065 — Panel pool: random 4–5 character selection across all panel modes

**Status:** Open
**Priority:** High — unblocks Darwin, Cox, Faldo and all future character additions
**CD3:** 18 (Confidence 3 × Desirability 2 × Deliverability 3)
**Loop:** BDD
**Raised:** 2026-03-28
**Epic:** Panel Design

**The change:** Replace per-page hardcoded CHARACTERS objects with a single `PANEL_POOL` — all available characters. Each panel mode draws 4–5 at random per session. Attenborough is not in the pool — he is always the closer.

**Applies to all SS panel modes:** Panel Q&A, How Screwed Am I (assessment + reaction), Mundane Mode, I've Been Bit Guys, The Coyote Index, Will You Eat It, Bear Fact-Checker. Any new mode added after this ships inherits the pool automatically.

**Rules:**
- Pool size: all characters except Attenborough
- Draw size: 4–5 (randomly chosen between 4 and 5 each session, or fixed at 5 — Three Amigos)
- Attenborough: always bookends, never in pool
- Triage order (SS-034): IMMEDIATE characters (Ray, Fox) should be weighted to appear more often in crisis modes — pure random may underweight them. Three Amigos on whether to weight or purely random.

**Depends on:** SS-063 (archetypes) for the longer-term curated version. This item is the random pool MVP — "choose your panel" is a future item.

**Files to change:**
- `js/characters.js` — add all characters to pool, expose `PANEL_POOL` export
- Worker `buildSystemPrompt()` — accept `selectedChars` array, inject only those voices
- All panel pages in worker.js — pass random selection to system prompt on each call

**Note:** Darwin, Cox, Faldo join the pool as they are built (SS-006, SS-064). Pool grows without further architectural changes.

---

### SS-066 — "I've Had Worse" (The Rooms, walking skeleton)

**Epic:** The Rooms
**Room number:** 13 (decorative — not in URL)
**URL:** `/survival-school/ive-had-worse`
**Comedic name:** I've Had Worse
**Domain concept:** I've Had Worse (name IS the concept — the British shrug)

**What it is:** Walking skeleton of the RegisterContract engine. User describes a predicament and selects a protagonist character. The panel escalates — each character must top the previous one. Protagonist's escalation is the centrepiece. Attenborough closes at the absurdity ceiling.

**Key principle:** Characters must not know they're in an interaction mode. Sincerity under absurd constraint is the engine — never winking at the audience.

**Setup mechanic:**
- User enters predicament (freetext + chips)
- User selects protagonist character (chip selector — all panel members available)
- Random panel drawn around the protagonist
- Protagonist's escalation is the most extreme

**Escalation flavours per character:**
- Ray: specific conditions, specific technique, quietly worse
- Bear: always abroad, always fine in the end, always unnecessary
- Fox: classified, probably
- Hales: forty thousand years. The animal is named.
- Cody: had the resource thirty feet away. Chose not to use it. Made it worse.
- Billy: "We trained for this." One sentence. Moves on.
- Attenborough: geological calm. Terminal closer.

**ADR:** docs/decisions/20260328-001-the-rooms-corridor-design.md
**Full spec:** /mnt/c/Users/roden/Downloads/the_rooms_design_brief.md and ss_domain_model_handoff.md

**CD3:** UBV=9 TC=7 RR=6 → CoD=22, Dur=3, **CD3=7.3**
**Status:** OPEN — raised 2026-03-28. Three Amigos complete. Gherkin approved. Tests next.

---

### SS-067 — The Rooms: corridor navigation + room selection UI

**Epic:** The Rooms
**URL:** `/survival-school/rooms` (the corridor)

**What it is:** One homepage tile ("The Rooms") links to the corridor. The corridor page shows all six door tiles. Each door tile: comedic name (header), domain concept (sub-header), one-line description. User picks a door and enters that room. Individual rooms are not directly linked from the homepage — only via the corridor.

**Door tile structure (per ADR-001):**
```
[Comedic Name]           ← door sign / header
[Domain Concept]         ← sub-header
[One-line description]   ← what happens inside
[Room number]            ← decorative, not structural
```

**Wrong-room gag:** One room always labelled something that sounds relevant but isn't. Candidates: "The Complaint Room" (character in charge is complaining about their shoes; user's complaint not addressed), "The Sympathy Room" (staffed by Billy/Fox/Cody — constitutionally incapable of sympathy; they try, it goes poorly).

**Outstanding Three Amigos:** Wrong-room gag always present or toggleable; drama setting slider (deferred).

**CD3:** UBV=8 TC=5 RR=4 → CoD=17, Dur=3, **CD3=5.7**
**Status:** OPEN — raised 2026-03-28. Depends on SS-066.

---

### SS-068 — The Rooms: remaining five contracts (Rooms 12, 12A, 14, 15, 16)

**Epic:** The Rooms

**What it is:** Once the walking skeleton (SS-066) is proven, implement the other five rooms using the same RegisterContract schema.

- **Room 12 — Denial Loop** ("Pining for the Fjords"): panel interrogates a claim; target character defends with total sincerity; crack profile determines terminal condition
- **Room 12A — The Argument**: panel takes opposing position; argument collapses into argument about whether this IS an argument
- **Room 14 — The Reasonable One**: one designated character maintains perfect calm; everyone else escalates; terminal when The Reasonable One runs out of reasonable things to say
- **Room 15 — Going With It** (Yes-And): panel accepts user's premise and builds on it; no pushback; reality becomes unrecognisable; Attenborough narrates
- **Room 16 — The Detail**: panel latches onto one specific thing the user said and keeps returning to it; the detail accumulates weight; terminal when it means more than the original situation

**Session persistence note (Room 16):** Does The Detail carry into the next session? That is the world log concept. Powerful if yes. Complex if yes. Deferred decision.

**Full spec:** /mnt/c/Users/roden/Downloads/the_rooms_design_brief.md

**CD3:** UBV=8 TC=4 RR=4 → CoD=16, Dur=5, **CD3=3.2**
**Status:** OPEN — raised 2026-03-28. Depends on SS-066 + SS-067.

---

### SS-069 — User panel member selection (choose who's in the room)

**Epic:** The Rooms / Panel Design

**What it is:** Future item. Allow the user to configure which characters are in a room before submitting their setup. Extends SS-065 (random pool MVP) with explicit user selection.

**Note from SS-065:** "choose your panel is a future item" — this is that item. Walking skeleton first (SS-066 random panel), user selection second (this item).

**Outstanding Three Amigos:** Full replacement of random draw, or override layer on top of it? Per-room configuration or global? Persists across sessions or per-session only?

**CD3:** UBV=7 TC=4 RR=3 → CoD=14, Dur=4, **CD3=3.5** *(rescored when SS-066 ships)*
**Status:** OPEN — raised 2026-03-28. Depends on SS-066.

---

### SS-070 — Character: Ant Middleton

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Full voice profile and character file for Ant Middleton. Former SAS soldier, TV survival host (SAS: Who Dares Wins). Self-styled "Madhouse" — extreme, confrontational, turns every situation into a mental battle. Probably disagrees with Ray, probably agrees with Bear while secretly thinking he could do it better.

**Voice notes:** Aggressive optimism. Everything is a mindset problem. "You've just got to embrace the chaos." Likely to call others out for being soft while delivering genuinely bad advice with total conviction.

**What to build:** docs/characters/ant-middleton.md following the existing character template. Add to characters.js CHARACTERS object once voice is locked. Add to PANEL_IDS when UI integration is ready.

**CD3:** TBD pending Three Amigos.
**Status:** OPEN — raised 2026-03-28.

---

### SS-071 — Character: Andy McNab

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Full voice profile for Andy McNab. Former SAS, Bravo Two Zero author. Dry, operational, forensically specific about things that went wrong. Probably disagrees with Chris Ryan about exactly what happened on that patrol. Never dramatises — doesn't need to.

**Voice notes:** Short sentences. Active voice. Technical detail that makes Ray look like he's waffling. Will reference Bravo Two Zero as context for almost anything. May subtly correct things Chris Ryan says.

**What to build:** docs/characters/andy-mcnab.md. Add to characters.js and PANEL_IDS when voice is locked.

**CD3:** TBD pending Three Amigos.
**Status:** OPEN — raised 2026-03-28.

---

### SS-072 — Character: Chris Ryan

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Full voice profile for Chris Ryan. Bravo Two Zero survivor, only one to escape. Sole survivor framing. Selective memory. His version of events differs from McNab's on the key details — this is the comedy engine. Will be slightly defensive when McNab is also in the panel.

**Voice notes:** Measured, a little proud. Describes his escape with understated pride. Contradicts McNab via omission rather than confrontation — "That's one way of putting it." Genuinely heroic but cannot quite help mentioning he was the only one who made it out.

**What to build:** docs/characters/chris-ryan.md. Add to characters.js and PANEL_IDS when voice is locked. Note: when both McNab and Ryan are in a panel, the Bravo Two Zero disagreement mechanic should activate.

**CD3:** TBD pending Three Amigos.
**Status:** OPEN — raised 2026-03-28.

---

### SS-073 — Jim Morrison corridor guide

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** Jim Morrison as the guide who sends characters through their door. Not a panel member. His role is the corridor — he greets you, assesses your protagonist, and sends them through the door with a piece of sage-but-foreboding advice. Particularly funny because he's sending hardened survival experts to their fates with the gravity of a rock prophet who has never spent a night outdoors.

**Comedy engine:** The gap between Morrison's cosmic-doorway-of-destiny register and the banality of what he's sending Bear into. "You're about to find out something about yourself." (Bear is about to explain to a paper cut panel why he once ate a goat.)

**What it sounds like:**
- "The doors of perception open for those who stop asking if they're ready."
- "Bear. You're up. And for what it's worth — I'd have made the same choice. The goat looked at me the same way."
- "The panel's waiting, Jason. They already know how this ends."

**Outstanding Three Amigos:** Is Morrison a pre-submit framing only, or does he also close the room? Does his commentary adapt to the protagonist chosen, or is it universal?

**CD3:** TBD pending Three Amigos.
**Status:** OPEN — raised 2026-03-28.

---

### SS-074 — Expert Over-Reach mechanic

**Status:** Open
**Loop:** BDD
**Epic:** Panel Interaction Model

**What it is:** Characters competitively over-reach into each other's areas of expertise. One names a plant (valid knowledge). Another, not wanting to be outdone, names a better plant — possibly real, possibly not. Back and forth escalates: polite one-upmanship, then passive-aggressive correction, then inventing increasingly confident nonsense. The other doubles down on the invented thing, agrees enthusiastically, adds a fabricated detail. Nobody calls it. The comedy is the collapse of expertise under social pressure.

**The structure (Rod's words):** "One names a plant, the other names a better plant, they go back and forth passive aggressively, make shit up, the other agrees and says they actually know more about the imaginary thing, doubling down on bullshit — a magical comedy structure."

**Design notes:** Sincere characters. They do not know they are bullshitting. This is a panel interaction pattern, not a standalone mechanic — it activates when two characters with overlapping domains are both in the panel. Strong candidates: Ray Mears vs Cody Lundin (both bushcraft/plants), Bear vs Ant Middleton (survival fitness overlap), McNab vs Ryan (operational memory disagreement).

**Outstanding Three Amigos:** Mode-specific trigger or works in any mode? Fixed two-character pair, or can involve three? Does Attenborough notice?

**CD3:** TBD pending Three Amigos.
**Status:** OPEN — raised 2026-03-28.


---

### SS-077 — Room-specific guiding copy

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** Each room's input prompt includes guiding copy that helps the user construct a statement congruent with that room's mechanic. For Room 13 (I've Had Worse), the user needs a trivial predicament — the current placeholder copy hints at this. For Room 12 (Denial Loop), they'd need a claim the protagonist will defend. For Room 12A (The Argument), they'd need a topic to argue about.

**Why it matters:** Without guidance, users under-use the mechanic. The right prompt copy conspires with the user against the protagonist from the first moment they type.

**Outstanding Three Amigos:** Per-room static copy (fast) or dynamic copy that updates based on protagonist selected (richer)? Should the copy reference the protagonist by name ("Bear needs to defend something")?

**CD3:** C=3 D=2 D=2 → **CD3=12**
**Status:** OPEN — raised 2026-03-28. Depends on SS-068.

---

### SS-078 — Corridor send-off messages

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** When the user enters a room, they receive a send-off from Jim Morrison AND one or two banal good-luck messages from other sources. The comedy is the contrast: Morrison's cosmic-poetic prophecy alongside "You got this!", "Go Bear!", "Give 'em hell kid" — completely out of register, clumsy, cheerful, utterly useless as preparation for what's behind the door.

**Design principle (Three Amigos resolved 2026-03-28):**
The send-off SOURCE reveals the character. Not generic well-wishes — protagonist-specific voices from people who would plausibly be in that corridor. The comedy is the gap between Morrison's cosmic register and whoever is standing behind the protagonist with a tin of beer.

**Per-protagonist send-off sources (locked):**

| Protagonist | Send-off source | Notes |
|---|---|---|
| Gordon | Doug | Wheelchair. VB. Calls him Bruce first. Still waving. |
| Bear | Baying crowd of fans + TV producer + Boy Scouts + SAS mates | Layered. See below. |
| Ray | One man who did a 2009 weekend bushcraft course | Quiet. Has been wanting to say thank you ever since. That's enough. |
| Fox | Nobody. Jim nods once. | The corridor is empty. This is correct. |
| Hales | Group of Australian soldiers from 1985 | They never left the corridor. "Beauty, Les." No further explanation. |
| Cody | Barefoot student offering to come in too | Also barefoot. Also inadvisable. Cody doesn't discourage him. |
| Stroud | His own camera on a tripod | He set it up before he went in. Nobody else is there. The camera is rolling. |

**Bear-specific send-offs (locked 2026-03-28):**

Bear has multiple send-off sources. All present simultaneously. This is correct — Bear always has an audience.

*The fans (baying):*
- "YOU GOT THIS BEAR" / "WHOOOOOP" / "WE LOVE YOU BEAR"
- The TV producer, somewhere behind them, counting him in: "Rolling... and action, Bear!" Bear waves at the crowd. Bear always waves at the crowd.

*The Boy Scouts (earnest, wholesome, neckerchiefs, absolutely no idea what's behind the door):*
- "We believe in you, Akela Bear!"
- A row of small faces giving the scout salute with complete sincerity
- One of them has made a card. It has a drawing of a bear on it. It is not a good drawing.

*The SAS mates — framed as Selection:*

They are not wishing Bear good luck. They are watching him approach the door the way the DS watch a candidate tab up Pen y Fan. Assessing. Impassive. He either makes it or he doesn't. The door is the hill.

- *[clipboard. stopwatch. no expression.]* "Move."
- "We've seen worse get through. We've seen better not make it."
- "If you feel like stopping — don't." *[beat]* "Actually, do what you want."
- "Name. Number. Next of kin." *[Bear gives them. DS writes nothing down.]*
- One of them slowly crosses something off a list. Nobody confirms what was crossed off.
- *[as the door closes behind Bear]* "Time." *[writes it down]*

**Design note:** Selection: they go alone. Jim is waffling on at them — cosmic, prophetic, going on a bit. The DS are stony-faced behind him, clipboards up, not listening to Jim, assessing the candidate. Jim doesn't notice the DS. The DS have noticed Jim. The DS have written something down about Jim. The candidate goes through the door alone.

Jim waffles. The DS time it. The door closes.

**SAS entry modes (Rod, 2026-03-28) — two modes, never announced in advance:**

*Dynamic entry:* They burst through the door. Jim is mid-sentence — "the doors of percep—" — and they're already through. Jim finishes the sentence anyway. To nobody. The door is swinging.

*Tactical approach:* They don't burst. They creep. Gun raised. Sight on the door. Stacked against the frame. Jim is still going. They are not listening to Jim. They have never listened to Jim. They make entry on their own timeline. Jim's counsel is noted and set aside.

The comedy: Jim has been giving the same speech since 1967. These men have been doing dynamic entries since 1980. Neither party has ever acknowledged the other's existence. Both proceed with complete conviction.

**The same instinct, different venue (I've Had Worse predicament chips, live 2026-03-28):**
The SAS dynamic entry mode is not contextual. It is the only mode. This is why Fox and Billy are now explaining to the headmaster of St Cuthbert's:
- Why they used live rounds in the Year 10 Stay Safe talk ("it added authenticity")
- Why they made entry by abseiling through the window and briefly incapacitating the teacher ("controlled restraint hold")

The children appeared engaged. The teacher has questions that cannot be answered. The headmaster has also been informed that Jim Morrison was in the corridor. Nobody knows what Jim was doing there.

**Gordon-specific send-offs (canonical, Rod 2026-03-28):**
- "What a guy."
- "You got this one Gordon!"
- "hope there's no fucking snakes in there Gordo!"
- "don't put your fecking hand in the bag this time Bruce, sorry Gordo, you fucking twat" — Doug, self-correcting
- Doug, from the corridor, waving, tin of VB: "shout if you need me to come in"

**Entrance design (Gordon, canonical):** Jim pushes the wheelchair. This is the only entrance where Jim has to push. Nobody mentions it. The door closes. Doug is still waving.

**Rod's general examples:** "Good luck Bear", "you'll be fine......right?", "you got this", "Whoooop, go Bear", "Give em hell kid"

**Outstanding Three Amigos:** Send-offs before entering (door click) or after (room page)? Static per-protagonist list or LLM-generated protagonist-aware? Jim's line: cosmic/generic or protagonist-aware too?

**CD3:** C=3 D=3 D=2 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.

---

### SS-079 — Character: Roy Keane

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion / Fish-out-of-water

**What it is:** Roy Keane in the Dismissive archetype (SS-064). Survival scenarios are nothing compared to what he's been through. He does not complain. He does not celebrate. He assesses your performance and finds it wanting.

**Voice notes:** The panel describes your situation. Keane says one sentence. It contains the word "not good enough." Or it doesn't — but it still means that. He has no interest in your predicament. He has seen actual adversity. You have not.

"I've been in Old Trafford at 3-0 down with ten men and a manager who's lost the dressing room. I don't know what you call this."

**Comedy engine:** The dismissive juxtaposition — real emotional intensity applied to a trivial predicament. Bear is wrong; Keane thinks Bear is soft. Nobody has a good time.

**CD3:** C=3 D=3 D=2 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.


---

### SS-080 — Character: Mark O'Shea

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Mark O'Shea — British herpetologist, TV presenter (O'Shea's Big Adventure), serious snake and reptile expert. Where Coyote Peterson performs the danger, O'Shea documents it clinically. He is not performing. He is genuinely interested in the animal that is currently killing him.

**Voice notes:** Measured British delivery. Taxonomically correct. Will name the species, subspecies, and geographic variant before addressing the threat. Finds Coyote Peterson's approach "enthusiastic." Has opinions about misidentification. The grandmother's urn incident needs explaining. He can explain it. He will explain it with full sincerity and some reference to hydration requirements in the field.

**Comedy engine:** Forensic calm applied to escalating absurdity. The urge to classify the situation before addressing it. His "worse" in I've Had Worse involves a reptile, taxonomy, and a deeply undignified outcome he presents as a field observation.

**Predicament of origin:** He was a protagonist for the grandmother's urn incident (2026-03-28 session). The panel was not surprised. Attenborough closed with geological calm.

**CD3:** C=3 D=3 D=2 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.


---

### SS-081 — Character: Austin Stevens

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Austin Stevens — South African herpetologist, photographer, TV presenter (Austin Stevens: Snakemaster). The inspiration for "I've Been Bit, Guys." Gets bitten. Keeps going. The comedy engine is his absolute casualness about injury severity. He was bitten by a black mamba once and filed it under "interesting."

**Voice notes:** South African accent (written register: direct, slightly theatrical). Uses indigenous regional names when known. Adds a slight spiritual register — he respects the animal even as it is killing him. Will not say "this was bad." Will say "this was a significant encounter." He is always fine, eventually.

**Design notes:** O'Shea and Stevens as a pair in the same panel would be interesting — taxonomically correct meets regionally indigenous. Neither thinks the other is wrong. They don't quite overlap but neither defers to the other.

**Triage position:** Medical tier alongside O'Shea. These two read the situation for actual threat assessment before the comedy tier (Bear, Cody, Hales) arrive.

**"I've Had Worse" energy:** He has been bitten by a black mamba, a gaboon viper, a king cobra, and a reticulated python in the same month. Your predicament is a paper cut. He does not say this with sarcasm. He says it with genuine curiosity about what qualifies as worse.

**CD3:** C=3 D=3 D=2 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.


---

### SS-082 — Character: Gordon Lyons

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Gordon Lyons — amateur herpetologist, committed enthusiast, legendarily resilient. Not a TV presenter. Not a trained professional. Absolutely in the room anyway.

**Defining incident (canonical origin story):**
Got bitten several times by a venomous snake. While waiting for help, forgot the snake was in his bag. Put his hand back into the bag to see what was in there. Found the snake again. Got bitten again. His mate, in a field improvisation that remains medically unverified but emotionally sound, poured beer on him and urinated on his head to keep him conscious until the paramedics arrived. Gordon survived. He has thoughts about what he would do differently. None of them involve leaving the bag alone.

**Canonical voice (Rod's verbatim, 2026-03-28):**
> "so, and you'll love this one Doug, I forgot it was fuckin in there, and I put me hand back in the bag, and well you know, that fella was all wound up like a honey badger"

**Voice notes:** Regional accent ("me hand"). Conspiratorial — always addressed to Doug, his mate. No self-pity, no performance. Just recounting a sequence of events as if they form a reasonable narrative. Affectionate about the snake ("that fella"). Honey badger is a reasonable comparison in his view. Doug will love this one.

**Register archetype:** Les Hiddins (Bush Tucker Man) — but an idiot. Specifically: a bogan. Same sincerity. Same matter-of-fact delivery. Completely different outcome. Hiddins knew what was in the bag. Gordon did not, and then forgot, and then found out again. Hiddins would have words. Gordon would ask if Hiddins wanted a beer.

**What he says instead of "I was in danger":** He tells Doug about it. Doug was there. Gordon is telling him anyway.

**Comedy engine:** The gap between O'Shea's forensic taxonomy and Gordon's methodology. Stevens is calm about getting bitten because he's been trained to be. Gordon is calm about it because he has simply never considered the alternative.

**Panel dynamics:**
- With O'Shea: O'Shea names the species. Gordon confirms. Gordon also confirms he put his hand back in.
- With Stevens: Stevens respects Gordon in a way he struggles to articulate. Gordon doesn't notice.
- With Bear: Bear claims he has been in worse situations. Gordon asks clarifying questions about Bear's situation that suggest he has not.
- With Ray: Ray is quiet for a moment. Then he asks about the bag.
- Attenborough closes with the kind of sentence that implies Gordon is a force of nature rather than a victim of one.

**Doug:** Gordon's mate. Poured beer on Gordon and urinated on his head to keep him conscious. This was not medically advised. It worked. Doug is not in the panel. Doug is the corridor. Every time Gordon walks in, Doug is behind him going "yeah, mate, you got this." Doug does not fully understand what is happening. Doug is always there.

**Gordon's entrance (canonical, Rod 2026-03-28):**
Jim Morrison pushes Gordon through the door in his wheelchair. Doug helps from behind, waving, tin of VB in hand: *"shout if you need me to come in."* Jim says nothing about the wheelchair. He has seen things. Gordon thanks Jim. Doug is already opening another tin.

This is the only entrance in The Doors where Jim has to push. Everyone else walks. Gordon is wheeled. The comedy is that nobody mentions this. Jim pushes him through with the same cosmic gravity he applies to everyone. The door closes. Doug is still waving.

**Send-off energy (SS-078):**
- "What a guy."
- "You got this one Gordon!"
- "hope there's no fucking snakes in there Gordo!" — Doug, from the corridor
- "shout if you need me to come in" — Doug, still waving, tin of VB
- "don't put your fecking hand in the bag this time Bruce, sorry Gordo, you fucking twat" — Doug, correcting himself mid-send-off, still waving

These are not sarcastic. Gordon would agree with all of them. There might be snakes. Gordon is fine with that.

**Note on "Bruce":** Doug calls Gordon "Bruce" first. Corrects himself to "Gordo." Apologises by calling him a fucking twat. This is affection. Gordon knows this.

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Status:** OPEN — raised 2026-03-28.


---

### SS-083 — Jim Morrison mid-session interruption

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** Jim Morrison wanders into the session mid-panel. Not announced. Not invited. He either helps the celebrity or makes things considerably worse — and not necessarily on purpose. He is following his own logic. The panel does not know what to do with him.

**Trigger:** Random, or at a specific structural moment (e.g. after the third panel card, when the protagonist's position is weakest). The celebrity does not control when Jim appears.

**Jim's modes:**
- *Helps (accidentally or deliberately):* Offers a cryptic observation that somehow reframes the celebrity's position. The panel is briefly confused. The celebrity doesn't understand it either but benefits from the pause.
- *Hinders:* Validates the panel's position in terms so cosmic they sound like support for the celebrity. The panel agrees with Jim. The celebrity is worse off.
- *Neutral chaos:* Says something that has nothing to do with the situation. Everyone stops. Nobody knows what to do. Attenborough eventually closes it.

**Panel reactions:**
- Ray: does not acknowledge Jim. Continues.
- Bear: briefly excited. Tries to agree with Jim. Jim does not notice.
- Fox: still has the sight picture. On Jim now.
- Cody: nods. He has been expecting this.
- Hales: offers Jim something to eat. Jim declines. Three words.
- Stroud: had a similar experience, alone, in Manitoba. Jim wasn't there but it felt like he was.
- Attenborough: acknowledges Jim with one sentence. The sentence is perfect. Jim doesn't hear it — he's already leaving.

**Outstanding Three Amigos:** Random trigger or structural? Does Jim speak to the celebrity directly or to the room? Can he appear more than once? Does the celebrity get to invoke Jim deliberately (at a cost)?

**CD3:** C=3 D=3 D=2 → **CD3=18**
**Status:** DONE — deployed 2026-03-28.
**Closed:** 2026-03-28

**Implementation:** Random ~20% probability per round. morrison_interruption object in response JSON (quote, panel_reaction, tone, morrison_present). morrison_present boolean carries across rounds — Morrison stays if topic interests him or panel engages, drifts off otherwise. Panel baseline is warm (WARM/AMUSED/ENGAGED). Flips to HOSTILE when he crosses a line — at least two panellists attack, Morrison doesn't understand. Gold card (warm) / red card (hostile) rendering. Live on IHW (Room 13) and In My Defence (Room 14). Gherkin: features/morrison-interruption.feature. Acceptance test: tests/acceptance/acceptance.test.js.

---

### SS-058 — Per-character colored card backgrounds (Cusslab pattern, survival palette)

**Status:** Open
**Loop:** BDD
**Epic:** Panel Design

**What it is:** Each character's panel card gets a distinct background colour — matching the pattern already used in Cusslab. Not generic; the palette should be congruent with survival/outdoors aesthetics (earthy, muted, natural tones — not the comedy brights of Cusslab).

**Three Amigos (partially resolved 2026-03-28):**
- Copy the Cusslab per-character CSS class pattern directly (charId → CSS class → background-color)
- Use a survival palette: field greens, canvas khaki, bark brown, slate, sand, dusk orange — not primaries
- One colour per character, consistent across all panel modes (assessment, mundane, reaction, worst, panel-qa)

**Outstanding Three Amigos:** Exact colours per character? Confirm palette before Gherkin.

**CD3:** C=3 D=3 D=2 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.

---

### SS-084 — Predicament chip: Bear / teacher / urine / dead snake

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** A predicament chip for the I've Had Worse page (or equivalent predicament chip surface). The scenario: Bear, in a survival context, ended up requiring a teacher to drink his urine out of a dead snake. Chip title: *"why did Bear end up forcing the teacher to drink his urine out of a dead snake"*

**Comedy engine:** Extends SS-076's established absurd predicament set (airplane aisle, shandy, badger, pigeon, tortoise). The panel must account for: (1) the dead snake, (2) the teacher's presence, (3) why this was Bear's idea, (4) whether it helped.

**Panel dynamics:** Bear defends it. Cody has done something comparable but with a live snake. Ray is quiet. Fox still has the sight picture. Hales has questions about the snake species. Stroud was alone when this happened to him. Nobody had a teacher present.

**Outstanding Three Amigos:** Which room/page — I've Had Worse (/worst), How Screwed (/app), or The Rooms? Data-only addition once confirmed — no new code paths.

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Status:** OPEN — raised 2026-03-28.

---

### SS-085 — Per-character roast + inversion chips

**Status:** Open
**Loop:** DDD
**Epic:** The Doors

**What it is:** Two comedy engines using real character research, activated inside The Doors rooms. Not chips — this is what the characters bring through the door with them.

**Engine 1 — Roast chips:** Chips that surface real, documented embarrassing or controversial moments from the character's actual life. The character must discuss it in front of the panel. The panel knows. The character knows the panel knows.

*Examples:*
- Bear: the time he was exposed drinking from a staged "river" that was actually a hotel pool
- Bear: peed in his own wetsuit on camera and announced it was warming him up
- Bear: the hotel incident — presented as roughing it, was not
- Les: voluntarily spent months alone in the wilderness for TV but has expressed opinions about airports

**Engine 2 — Inversion chips:** Chips that describe the character doing something completely incongruent with their identity. They must explain and rationalise it — in full survival-expert voice. The more earnest and thorough the rationalisation, the funnier it is.

*Examples:*
- "Bear, your review of a Mayfair spa weekend"
- "Les Stroud, your thoughts on all-inclusive Caribbean resort buffets"
- "Ray Mears, why you ordered a Deliveroo"
- "Cody Lundin, footwear choices at the Ritz"
- "Hales, your experience of a climate-controlled hotel room"

**Comedy engine (ConspireEngine applied):** The characters are unreliable narrators of their own identity. They don't lie — they rationalise. Every Mayfair spa becomes a controlled field assessment of thermal regulation. Every Deliveroo order was a test of modern logistics infrastructure. The panel does not buy it. The panel calls it out. The character redoubles.

**Design notes:**
- Requires per-character research to surface real documented incidents (not invented ones)
- Inversion scenarios are fictional but must be congruent with the character's real known positions and voice
- Both engines feed the ConspireEngine pattern (SS-059 sibling item)
- How this material might feed chips on other features is a separate item: SS-086

**Outstanding Three Amigos:** Which rooms trigger which characters' material? Does the panel see the embarrassing incident text or does it emerge through the session? Do other panel members pile on or is it one-on-one scrutiny?

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Status:** OPEN — raised 2026-03-28.

---

### SS-086 — Review SS-085 material as chip stimulus on other features

**Status:** Open
**Loop:** DDD
**Epic:** Character Expansion

**What it is:** Once SS-085 per-character roast + inversion material is researched and written up for The Doors, review whether any of it can serve as stimulus for chips on other feature surfaces (How Screwed Am I, I've Had Worse, predicament chip sets, etc.). Design review item — not a build item.

**Dependency:** SS-085 must be researched first. This item fires once SS-085 material exists.

**CD3:** C=3 D=2 D=2 → **CD3=12**
**Status:** OPEN — raised 2026-03-28. Blocked on SS-085.

---

### SS-087 — Cusslab crossover: Hawking + Bruce Lee as fish-out-of-water characters

**Status:** DONE (characters.js + domain tests 2026-03-28)
**Loop:** DDD
**Epic:** The Doors

**What it is:** Add Stephen Hawking and Bruce Lee to characters.js as fish-out-of-water characters. Same pattern as Cox and Faldo — full voice profile, integrity, fish disposition tags, CHAR_COLOURS, domain tests. They join the panel pool and are available as protagonists on any existing room. No dedicated crossover room needed.

**Three Amigos resolved 2026-03-28:**
- No dedicated room — they enter existing rooms like any other fish character
- Panel adapts regardless of protagonist (existing mechanic)
- Hawking and Bruce Lee confirmed as the two crossover characters this round

**Characters:**
- **Hawking** — theoretical physics applied to survival. The wheelchair is in the room. The panel must deal with the wheelchair. Attenborough is the only one who knows what to do. Fish disposition: CONVERT (default) — his actual knowledge converts him fast, then he's confidently wrong about survival applications of physics.
- **Bruce Lee** — the panel considers whether they are being assessed. Fish disposition: CONTEMPTUOUS_EXPERT (default) — wrong domain, has a plan, plan doesn't need the panel. Water metaphor applied to everything. The panel cannot teach him because he is already teaching them.

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Raised:** 2026-03-28.

---

### SS-100 — Port composure engine to SS characters.js

**Status:** DONE (characters.js + 21 domain tests 2026-03-28)
**Loop:** DDD
**Epic:** Mechanics port

**What it is:** Port COMPOSURE_PROFILES, initComposureState(), computeComposureDeltas(), composureTier(), buildComposureInjection() from Cusslab worker.js to SS characters.js. Add composure profiles for all SS characters (including fish-out-of-water). Add domain tests. SS-088 wrote the Gherkin and the design but the functions only exist in Cusslab's worker — this ports them to SS's own codebase.

**Session A work:** characters.js + domain tests only. Worker wiring is SS-101.

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Raised:** 2026-03-28.

---

### SS-101 — Wire composure engine into SS worker.js

**Status:** Open
**Loop:** BDD
**Epic:** Mechanics port
**Depends on:** SS-100

**What it is:** Accept composureState in POST request body, inject into system prompt via buildComposureInjection(), compute deltas from panel_tension, return updated composureState in response. Client-side: init composureState on first call, persist across rounds, send with each request. Same pattern as Cusslab worker.js lines 7664-7688.

**Session B work:** worker.js + acceptance/UI tests.

**CD3:** C=3 D=2 D=3 → **CD3=18**
**Raised:** 2026-03-28.


---

### SS-089 — The Doors predicament chips: Steve Irwin (snake wall, croc fighting ring, snake fighting ring let-slip)

**Status:** DONE (2026-03-28)
**CD3:** 27 (Confidence 3 × Desirability 3 × Deliverability 3)
**Loop:** BDD

**What:** Three predicament chips where Steve Irwin must defend himself to the panel.

1. **Snake wall** — smashed a highly agitated taipan repeatedly against a wall until it stopped. Maintains this was field improvisation, not the textbook definition of what happened.
2. **Croc fighting ring** — Queensland Wildlife Services have found a reinforced pit, bleacher seating, and fourteen crocodiles with fight records. It's an educational facility. The betting slips were left by a previous tenant.
3. **Snake fighting ring let-slip** — was explaining, passionately and in operational detail, how one fights a snake, and may have accidentally disclosed the existence of an underground snake fighting circuit he definitely does not run.
4. **Austin Stevens: snake pit (O'Shea's paper)** — has been sleeping in snake pits for research since 1987. German documentary producer is concerned. O'Shea has written a paper about it. Stevens hasn't read it. Assumes it's mostly positive.
5. **Irwin: croc leather on-camera** — several episodes of The Crocodile Hunter show him wearing a croc leather belt and wallet. He was not aware this was being filmed. The crocs noticed.
6. **O'Shea: snake jacket (self-identified on-air)** — three BBC episodes show him wearing a jacket he later identified on screen, live, as king cobra skin. Did not stop filming.
7. **Stevens: snakeskin boots (RSPCA report)** — seventeen episodes of Snakemaster show him in snakeskin boots. Adds gravitas. The snakes disagree. RSPCA report confirms this.

**Chips live in:** `/home/rodent/cusslab/worker.js` — predicament chips section (~line 5984)

**Done:** 2026-03-28

---

### SS-092 — Fish-out-of-water character: Jim Carrey

**Status:** DONE — 2026-03-28
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** BDD
**Epic:** Fish-out-of-water

**What:** Jim Carrey as a panel member. He cycles through his roles — Ace Ventura (pet detective energy applied to survival, talks to animals, arrives through wrong entrance), The Mask (Cuban Pete, chaotic good, physically impossible solutions stated with complete confidence), Liar Liar (cannot stop saying exactly what is true about the situation, which is worse than lying), and every other Jim Carrey mode as appropriate.

**The comedy engine:** He is a red rag. The panel — people who have genuinely been bitten by black mambas and crossed Siberia alone — have no framework for him. He is funny and also not funny. He is relentless. He does not stop. The panel's escalating collective desire for him to stop is the engine. "Just fuck off Jim" is the internal state of every other panel member by response three.

**AWARENESS MODE:** Blissfully, completely unaware. He is helping. He is absolutely certain he is helping. The Ace Ventura approach to the taipan bite is the correct approach. He has sources.

**Voice notes:**
- Shifts register mid-response (Ace → Mask → Liar Liar) without warning or acknowledgement
- Physical comedy must translate to text: describes impossible actions as if they are happening
- Liar Liar mode activates when the predicament is obviously catastrophic — he cannot stop stating the actual severity
- Never winks. Never breaks. Fully committed to whichever Jim he currently is.

**Panel reaction:**
- Ray: silent. Has encountered many things. Has not encountered this.
- Fox: assessing whether Jim constitutes a threat. Conclusion: unclear.
- Stevens: mildly interested. Has been bitten by worse than Jim Carrey.
- Attenborough closes with geological calm and does not mention Jim at all.

**Three Amigos needed:** Is Jim a permanent rotation member or a special trigger? Does he appear as protagonist too, or panel-only?

---

### SS-090 — Fish-out-of-water pair: mutual vehement agreement on something both are completely wrong about

**Status:** Open
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** BDD
**Epic:** Fish-out-of-water

**What:** Cox and Faldo are both in the panel. They find a point of apparent overlap and agree with each other with complete conviction about something both are entirely wrong about. The actual experts (Ray, Stevens, Fox) watch in silence. Nobody intervenes. The comedy is the gap between their mutual confidence and their total incorrectness — and the experts' decision not to say anything.

**Three Amigos needed:** What is the mechanism for triggering "both in panel"? Random chance, or user-selectable? Do the experts visually react, or is it purely in text?

---

### SS-091 — Fish-out-of-water pair: Cox vs Faldo — escalating confident wrongness with no expert to correct them

**Status:** Open
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** BDD
**Epic:** Fish-out-of-water

**What:** Cox and Faldo are both in the panel and they disagree. Each escalates their confident wrongness. Neither has any relevant expertise. Neither knows this. The argument is polite, sincere, detailed, and completely fabricated. No expert is present or available to resolve it. The panel is just these two, plus Attenborough bookending, who chooses not to get involved.

**Three Amigos needed:** Same as SS-090 — trigger mechanism and expert-presence rules.

---

### SS-088 — Panel emotional state model

**Status:** DONE (2026-03-28)
**Loop:** DDD
**Epic:** Panel Interaction Model

**What it is:** Port the Cusslab `LieEngine` and composure/temperament primitives into the SS panel system, so characters shift register mid-session based on what is happening in the room. Non-linear speaking order driven by emotional state. Characters cope — or don't — in character.

**The angle:** Gordon remains completely unaffected by everything. O'Shea doubles down on credentials the worse it gets. Bear gets defensive when called out. Ray gets quieter. Fox gets more tactical. Stevens gets more mystical. The register shift IS the comedy — not the content but the character under pressure.

**Cusslab primitives to port:**
- `src/logic/lie-engine.js` — lie profiles, threat levels, wound activation (browser sessionStorage → worker state)
- `golf-service/temperament-service.js` — composure delta model (golf-specific now, needs generalising)
- `src/logic/ff-engine.js` — game state primitives (history, turnCount) — already panel-agnostic

**What needs building:**
- Per-character emotional profile (baseline composure, wound threshold, lie ceiling, tell phrase)
- Composure state tracked across turns in session
- Speaking order determined by composure ranking (lowest composure speaks first — or last, Three Amigos)
- System prompt injection per character adjusted by current composure tier

**Dependency:** SS-065 (pool) must ship first — composure state is per-character in the drawn pool.

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Status:** OPEN — raised 2026-03-28.

---

### SS-093 — New door: "In My Defence" (Room 14)

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** Second live door in The Doors corridor. Roast/Inversion mechanic — protagonist walks in to defend an indefensible thing they did. The panel is an interrogating committee, not a support group.

**Mechanic:** Select protagonist → their personal incidents appear (per-person chips) + general pool always visible. Pick incident → panel convenes. Panel digs in: specific questions, won't accept vague justifications, each member presses a different detail, nobody says "I can see why you thought that." SOCIAL_DYNAMICS_ENGINE live. panel_tension in output.

**UX:** Protagonist tiles → click to reveal their incidents inline. General pool (Irwin, O'Shea, Stay Safe incidents) always visible regardless of protagonist.

**Chip split from I've Had Worse:** All roast chips move here. Generic chips stay in I've Had Worse.

**Three Amigos — agreed 2026-03-28:**
- Option B: protagonist tiles → inline expand (consistent with I've Had Worse UX)
- General pool: O'Shea/Irwin/Stay Safe chips — any protagonist can take them
- Separate door, separate route, separate system prompt

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Status:** OPEN — raised 2026-03-28.

---

### SS-094 — Fix I've Had Worse: chips + panel interaction

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** Bug-fix + interaction upgrade for existing Room 13.

**Changes:**
1. Remove all roast chips (moved to SS-093 / In My Defence)
2. Remaining generic chips always visible (paper cut, stubbed toe etc.) — no grouping needed
3. Inject SOCIAL_DYNAMICS_ENGINE into system prompt
4. Add panel_tension to output schema
5. Remove fixed triage-order instruction — speaking order random, characters may reference/build on previous entry
6. Tighten escalation instruction: each entry more specific + more implausible + more sincere; protagonist entry must be structurally alarming

**Root cause:** SOCIAL_DYNAMICS_ENGINE never injected into this mode. Fixed speaking order. Roast chips polluting the chip list.

**CD3:** C=3 D=2 D=3 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.

---

### SS-096 — Wade predicament chips

**Status:** Open
**Loop:** BDD

**What it is:** Predicament chips for Jeremy Wade across the features that support chips.
Wade's chip set draws from his documented history — all sourced from real events.

**Chip candidates:**

*I've Had Worse (protagonist chips):*
- "I was arrested as a spy on the Mekong. I had a fishing rod. I explained the rod. They did not accept the explanation."
- "I was accused of witchcraft in the Congo. A man had disappeared from the village. I was fishing. He came back that night. I resumed fishing."
- "I found a man the candiru had visited. I took him to the science faculty. I showed him the specimen. He did not want to touch it."

*The Doors predicament chips (for Wade as protagonist entering a door):*
- "I held the candiru specimen in front of the man who had already had the candiru experience. I may have waggled it. I was trying to help."
- "I told the traumatised man 'Cowabunga.' I meant it well. I had moved on before he responded."
- "I wrote 'Robson Green would not last one afternoon here' in the notebook. The notebook was open on the table. The translator saw it. The translator did not translate it."

*General pool chips (any protagonist):*
- "I nodded at what the local elder was saying for forty minutes. I wrote 'I have no clue what this lady is saying' in the notebook. The notebook was on the table."
- "I reached into the river without looking to feel for the fish before the line came up."

**CD3:** C=2 D=2 D=2 → **CD3=12**
**Status:** DONE — 5 chips added to IHW_CHIPS.jeremy in worker.js 2026-03-28. candiru (the waggle), Congo witchcraft accusation, Mekong spy arrest, terrible recreation (bite angle), Cowabunga (the widow).
**Closed:** 2026-03-28

---

### SS-099 — Morrison contextual trigger

**Status:** Open
**Loop:** BDD
**Epic:** The Doors

**What it is:** In addition to random-probability Morrison interruptions (SS-083), Morrison also triggers when the panel conversation touches something contextually relevant to him — doors, poetry, snakes, death, endings, the desert, "the end." The worker parses panel output for trigger words/phrases and injects a Morrison interjection into the next round.

**Why it matters:** Random interruptions are funny. Contextually triggered interruptions are funnier — the panel says "death" and Morrison appears as if summoned. The timing creates the joke.

**Dependency:** SS-083 (random Morrison interruption must exist first — this adds a second trigger path).

**CD3:** C=2 D=2 D=1.5 → **CD3=6**
**Status:** OPEN — raised 2026-03-28.

---

### SS-097 — New character: Eric Bristow

**Status:** Open
**Loop:** DDD

**What it is:** Eric Bristow as a panel character for Survival School. Darts legend.
Five-time World Darts Champion. Brash, Cockney, absolutely certain, completely wrong
domain. The comedy: Bristow applies darts logic to survival with total conviction.
Throw, trajectory, checkout — everything is a checkout.

Also shared with the Cusslab darts panel (BL to be raised separately as BL-166).

**Comedy engine (initial hypothesis):**
Darts is the framework for everything. A bear attack is a checkout. The target is the
bear's weak point. You need to hit double top under pressure. Has advice on grip, stance,
follow-through for every survival situation. The survival experts look on in silence.

**Register:**
Bristow was famous for being brash, confident, dismissive, gloriously un-self-aware
about the gap between darts expertise and any other domain. "Five times World Champion,
son." This applies to the survival situation. The situation is not a darts board.
Bristow has not noticed this.

**Fish-out-of-water awareness mode:** Blissfully unaware. Same mode as Cox.

**Shared with Cusslab darts panel:** Raise BL-166 to build the darts panel. Bristow
anchors both products. Character file: docs/characters/eric-bristow.md to be written.

**Rod's memory:** [CAPTURE ROD'S MEMORY — not yet recorded verbatim]

**CD3:** C=3 D=2 D=3 → **CD3=18**
**Status:** OPEN — raised 2026-03-28.

---

### SS-098 — Fish Disposition Engine

**Status:** Open
**Loop:** DDD
**Epic:** Fish-out-of-water
**Dependency of:** SS-087, SS-090, SS-091

**What it is:** A shared primitive that assigns an **arrival disposition** to any fish-out-of-water character when they are drawn into the panel. The disposition defines their relationship to being in the room — independent of their expertise domain (Cox is always physics, Faldo is always golf). Disposition varies per session, injected into the system prompt alongside composure tier, held client-side in the same state blob.

**The five dispositions:**

| ID | Name | Behaviour |
|----|------|-----------|
| `EXCITABLE_NOVICE` | Thrilled to be here | Asks questions. Gets things slightly wrong with full commitment. Ray is patient. Fox is not. |
| `CONFIDENT_IGNORAMUS` | Knows nothing, knows it all | When corrected by an expert, absorbs it and re-emits it as their own conclusion one beat too late. "Yes — the, ah, the friction of the — yes. That's what I —" Panel sees it. Nobody says anything. Next thing they say is also wrong. |
| `RELUCTANT_CONSCRIPT` | Unhappy to be here | Makes this known. Repeatedly. Has other things to do. Panel treats reluctance as atmospheric data, not actionable content. "Whether or not you wish to be here, the situation you are in will very likely result in certain death." The reluctance is noted. It will not help them. |
| `CONTEMPTUOUS_EXPERT` | Wrong domain, total confidence | Applies their actual expertise with conviction. "I've navigated Augusta in a playoff. This is not dissimilar." It is completely dissimilar. Bear may engage sincerely — he sees the credential. This makes it worse. |
| `CONVERT` | Became a believer — then became an expert | Phase 1: started skeptical, now fully in. Enthusiastic. Absorbing. Phase 2: takes domain knowledge + new "survival understanding," combines into confident false conclusions delivered as expert synthesis. The experts — who have been ignoring the fish until now — have to intervene. Fish being wrong and ignored is one thing. Fish being wrong, confident, and requiring active correction mid-crisis is structurally different and funnier. |
| `TOTAL_DENIAL` | Cheerfully refuses to see any danger | "I think this is fine." It is not fine. Panel knows. Protagonist does not. Panel's death warnings slide off. "...will very likely result in certain death." "No, I think it'll be fine." Pause. Panel continues. |

**Mechanics:**

- **Draw at panel-assembly time** — disposition rolled alongside the character draw. Worker receives it in the request body alongside composureState.
- **System prompt injection** — buildFishDispositionInjection(dispositionMap, panelCharIds) appends per-character disposition instructions to system prompt. Same pattern as buildComposureInjection.
- **Composure interaction** — disposition can shift under panel pressure. EXCITABLE_NOVICE under sustained pressure → CORRECTOR (embarrassment triggers save-face reflex). CONTEMPTUOUS under pressure → CHECKED_OUT (retreat to disengagement). Shifts are one-way per session.
- **Two fish in the room** — when both Cox and Faldo are drawn, dispositions are independent. EXCITABLE_NOVICE Cox + CONTEMPTUOUS Faldo is a different room from CORRECTOR Cox + CORRECTOR Faldo (both claiming each other's correct answers simultaneously).

**Per-character canon base dispositions (default + user override):**
- Cox: EXCITABLE_NOVICE (default) — blissfully unaware, genuinely thinks he's helping
- Faldo: CONTEMPTUOUS_EXPERT (default) — wrong domain, total conviction, golf methodology
- Jim Carrey: EXCITABLE_NOVICE (fixed — cannot be anything else)
- Jeremy Wade: RELUCTANT_CONSCRIPT shading to TOTAL_DENIAL (fish is the foreground; this is not fish)
- Hawking (SS-087): CONFIDENT_IGNORAMUS or CONVERT — his actual knowledge would convert him fast
- Bruce Lee (SS-087): CONTEMPTUOUS_EXPERT — wrong domain, has a plan, plan doesn't need the panel
- Politician (SS-087): RELUCTANT_CONSCRIPT (default) / CONFIDENT_IGNORAMUS (when on form)

**Implementation:**
1. `FISH_DISPOSITIONS` constant — five entries, name + system prompt text per disposition
2. `drawDisposition(charId)` — weighted random draw using per-character canon weights
3. `buildFishDispositionInjection(dispositionState, panelCharIds)` — builds system prompt appendix for fish chars present
4. Client: `dispositionState` blob alongside `composureState`, same lifecycle
5. Worker: accept `dispositionState` in request body, inject, return updated `dispositionState`

**Removes:** The "never both in the same panel" restriction on Cox+Faldo. Both can appear through normal rotation. The disposition engine handles the dynamic when they land together.

**CD3:** C=3 D=3 D=3 → **CD3=27**
**Status:** OPEN — raised 2026-03-28.


### SS-147 — Per-character escalation mechanics (Cusslab parity)

**Status:** Open
**Priority:** High
**CD3:** 18 (Confidence 3 × Desirability 3 × Deliverability 2)
**Loop:** DDD → BDD
**Raised:** 2026-03-30
**Epic:** Panel Interaction Model

**The problem:** SS characters interact via generic mechanics (any character can telephone-game,
any can over-reach). Cusslab characters interact via specific documented behaviours (only Radar
corrupts by round, only Faldo has theological altitude). SS characters feel like they're in the
same system. Cusslab characters feel like themselves.

**The fix:** Port the Cusslab per-character escalation pattern to SS characters:

1. **Reference pools per character** — hard-coded pools that widen by round (round 1: items 1-3,
   round 5: anywhere including strange end). Ray's pool: craft techniques → specific woodlands →
   particular fire he built in 1998. Bear's pool: expeditions → near-death → hydration unprompted.

2. **Wound fire-thresholds** — each character has a named wound with a numeric trigger. When
   panel_tension targets them or composure drops below threshold, the wound surfaces. Cody's
   wound: the spear pool incident. Stevens: the RSPCA report. Bear: the Travelodge.

3. **Round-gated escalation** — delivery stays identical across rounds but content corrupts
   (Radar pattern). Ray's precision doesn't change — what he's precise ABOUT changes. Fox's
   threat assessment doesn't soften — the things he assesses as threats change.

4. **Named relational axes** — like Jesus/Moses in Cusslab. Candidates:
   - Ray/Bear axis: craft vs spectacle (Bear never directly contradicts Ray; the silence IS the axis)
   - Fox/Billy axis: operational mutual respect, one-word confirmations
   - Stevens/O'Shea axis: herpetological one-upmanship, neither acknowledges the other's expertise
   - Packham/everyone axis: conservation override changes the room's register

**Applies to:** All panel features (IHW, IMD, assessment, mundane, panel-qa, One Man In).

**Session A work:** Design doc + reference pools + wound definitions in characters.js.
**Session B work:** Wire into worker.js system prompts, round-gate the prompt instructions.

**Acceptance Criteria:**
```gherkin
Feature: Per-character escalation mechanics

  Scenario: Character reference pool widens by round
    Given Ray is in the panel on round 1
    Then his references draw from items 1-3 of his pool
    Given the same panel on round 5
    Then his references draw from anywhere in the pool including strange end

  Scenario: Wound fires at composure threshold
    Given Bear's composure drops below his wound threshold
    Then the Travelodge reference surfaces in his response

  Scenario: Named relational axis shapes interaction
    Given both Ray and Bear are in the panel
    Then Bear never directly contradicts Ray
    And the silence between them is structurally significant
```
