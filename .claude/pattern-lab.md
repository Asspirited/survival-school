# Pattern Lab — Character Voice Sharpening Protocol
# Owner: Rod + Claude (collaborative)
# Created: 2026-04-22
# Canonical trigger: see "Trigger" section below
# Related: leanspirited-standards/standards/panel-voice-principles.md

---

## What this is

A collaborative game for building character voice without repetition
traps like Bear's salty-croc / Borneo line. Rod writes an example
line in a character's voice; Claude breaks it down into a reusable
grammatical formula; both parties refine it; the formula feeds a
cross-character pattern bank as a *pattern*, never as a catchphrase.

**The four-tier model (Rod's extension, 2026-04-22):**

1. **Archetype** — the cross-character shape. A pattern of bullshit,
   reasoning, or refusal that could fit many characters.
   E.g. *Counterfactual humiliation with expertise-frame anchor*.
   The archetype defines which **slot types** it consumes.

2. **Slot type** — a named grammatical parameter with semantic
   meaning. Domain vocabulary of the generation system.
   E.g. `HISTORICAL_FIGURE`, `FEARSOME_OPPONENT`, `CAREER_ANCHOR`,
   `HUMILIATION_VERB`, `ORIGIN_PLACE`, `EXPERTISE_ACTION`.
   Slot types are **character-agnostic**. The same slot type
   (e.g. `FEARSOME_OPPONENT`) appears in many archetypes and is
   populated per-character from their slot bank.

3. **Slot bank** — a character-scoped, topic-scoped pool of
   examples for a given slot type.
   E.g. `Boycott.FEARSOME_OPPONENT = ["Lillee and Thomson in '74",
   "the Windies pace battery of '84", "Warne and McGrath in '99",
   ...]`.
   Banks can be large — Boycott's cricket-sides bank might span
   1810–1978 with 30+ entries. Banks are **character knowledge
   surface** — what Boycott can credibly cite. They grow over time
   as more Rod memories land.

4. **Instance** — the specific sample values drawn this call.
   One value from each slot bank, combined via the archetype's
   formula. Each call samples fresh.
   E.g. Napoleon (HISTORICAL_FIGURE) + Lillee/Thomson/'74
   (FEARSOME_OPPONENT) + crying (HUMILIATION_VERB) + France
   (ORIGIN_PLACE) + Randall/Trent Bridge (CAREER_ANCHOR).

**Why this matters (architectural).** The "grammatical parameters"
aren't slots in a template — they are the **vocabulary of the
generation system**. `FEARSOME_OPPONENT` is a domain concept.
Each character has a bank for it. The archetype is character-
agnostic; the slot types are character-agnostic; the banks are
deeply character-scoped.

**What this unlocks:**
- One archetype deploys across many characters with zero code
  change — just different banks.
- Combinatorial variation: 6 slots × 8 samples each = 262,144
  distinct instances per archetype per character. Non-repeating
  output by construction.
- The prompt becomes: "Here's archetype #3 + Boycott's bank for
  each slot + current context. Generate one sentence by sampling."
  The model has nowhere to reach for LLM-verbose filler — every
  choice is constrained.
- Banks are finite, composable, and content-authorable. Rod's
  memories of a character's knowledge surface populate directly
  into their banks.

**Implementation shape (target):** each character in
`js/characters.js` ships with a typed `slot_banks` object keyed by
slot type. The existing Wall Walkers banks (`places`, `years`,
`animals`) are the halfway-there version — they need promotion to
the shared slot-type vocabulary. The Wall Walkers voice rebuild
(commit 6cc1e2f) is the reference implementation for lever 1 and
partially lever 2 of this architecture. What's missing is a formal
slot-type registry that all characters use the same keys for.

---

### Parameter ladders — a special kind of slot (Rod's extension, 2026-04-23)

Not every slot is a sample-from-bank or a categorical choice. Some
are **scalar ladders** — the same semantic slot has degrees of
intensity, and which rung fires is driven by character state +
panel pressure + plausibility checks.

**Examples across existing archetypes (retroactively annotated):**

| Archetype | Scalar slot | Ladder |
|---|---|---|
| #001 Counterfactual Humiliation | HUMILIATION_VERB | mildly disappointed → limping → crying → sobbing → inconsolable |
| #003 Phrase Echo | ECHO_FIDELITY | faithful → styled → misquoted → mangled |
| #004 False-Attribution Anecdote | ABSURD_DURATION | a fortnight → 17 days → three weeks → a full year → "still ongoing" |
| #006 Dodgy Expat Anecdote | PLACE_GARBLED-NESS | slightly-off → garbled-plausible → fully fictional → wasn't a place |
| #007 Wistful Person Reference | DETAIL_BRACKET | detail-less → mid-detail → full-detail → exposition-bloat |
| #008 "I Was There" | CLAIM_STRENGTH | "I was there" → "I walked the same path" → "I saw the documentary" → "my mate Gary said..." → silence |

**Why this matters.** Ladders encode the *graceful retreat* or
*graceful escalation* dynamics — a character doesn't just deploy
an archetype, they deploy it at a **rung**, and the rung can shift
within a single turn under panel pressure. Archetype #008 is pure
ladder: the comedy IS the retreat down rungs. Other archetypes
use ladders as a dial — #007's detail bracket has a sweet spot
(full-detail), and over-shooting into exposition-bloat breaks the
form. The ladder tells you where the spot is.

**Implementation note.** Scalar slots need:
- Ordered rung labels
- Per-character rung-preference (Boycott starts high, never
  retreats; Mitchell starts low, never climbs; Bear starts high,
  retreats gracefully under pressure)
- Pressure-driven transition logic (at generation time, evaluate
  whether the current rung is still plausible; if not, retreat/
  climb one or two rungs)

This is a future architectural item — tracked implicitly under
SS-210 (voice rebuild porting) and SS-216 (per-round character
state display). Character state tracks current rung per scalar
slot across a multi-round session.

**The goal:** every Rod-written example becomes an archetype +
character parameterisation that produces fresh surface lines per
call, and is portable across characters, panels, situations.

**The wider goal:** a permanent cross-product bank of "the different
patterns of bullshit Rod comes up with." Each archetype is reusable.
Each character inherits the archetypes that fit their voice, with
parameters that make them contextually right.

---

## Why this works (the theory)

Rod has internalised each character's voice over years. When he
writes a one-off example, he's compressing rules he can't always
state. Claude's job is to *reverse-engineer the rule set* from the
example, then playback the rule set so Rod can refine it.

The compression goes:
1. Rod writes a line — the **instance**.
2. Claude extracts the **pattern** — which grammatical slots are
   load-bearing, which are variable.
3. Claude proposes **variants** — fresh instances sampled from the
   pattern.
4. Rod keeps / edits / rejects — refining the pattern.
5. Both commit the pattern to the character's flavour bank.

Each new pattern from Rod becomes a permanent piece of character
infrastructure. Each session builds on the last.

---

## Trigger

Both paths accepted — whichever Rod reaches for.

### Path A — explicit (case-insensitive)
Any of these, anywhere in the message:
- `pattern lab`
- `PATTERN LAB`
- `Pattern Lab`
- `pattern-lab`

Works as start-of-message or inline (e.g. "pattern lab this: ...").
Rod has said he'll use it verbatim until it's habitual — treat this
as the primary trigger during the learning phase.

### Path B — automatic detection
Claude fires Pattern Lab when a Rod message contains a line styled
as character speech. Signals:

- **Quoted text** attributed to a character: `Boycott: "..."` or
  `Ray would say "..."`
- **"I want them to say / talk like / be like / sound like"**
  followed by an example
- **"X would..." counterfactual dialogue** (e.g. the Napoleon line —
  not explicitly quoted, but clearly an example, preceded by
  "If [character] would have...")
- **Freestyle dialogue snippet** in a recognisable character register

When ambiguous (is this dialogue or direct dictation?), prefer to
fire and let Rod veto with `no pattern lab` / `not that`. Missing
a pattern is worse than over-firing.

### Silent override
`no pattern lab` / `NO PATTERN LAB` / `not that one` — skip the
protocol even if an example looks like dialogue. Use when Rod is
dictating content directly to a doc rather than demonstrating
voice.

---

## Protocol (the six steps)

When triggered:

### 1. Capture verbatim
Record Rod's example line verbatim in the character's `Rod's Memory`
section of `docs/characters/[name].md`. Date it. This is the canonical
instance. WL-SS-022/023/026 applies — capture in the same turn,
never at session close.

### 2. Identify the pattern
Break the line into grammatical slots:
- **Constants:** words that carry the character's voice (e.g.
  Boycott's cricket verbs, Faldo's "address the problem")
- **Variables:** slots that should be sampled fresh per call (names,
  years, places, verbs of specific emotional register)
- **Structure:** the order / rhythm / punctuation that makes the
  shape recognisable

Name the pattern. Example: `historical_cricket_matchup`,
`eyewitness_self_correct`, `augusta_specificity`.

### 3. Playback + analysis
Claude writes back:
- The pattern formula (with slot labels)
- Why it works (or why it might not)
- Whether Claude finds it funny, and by what definition of funny
- How it could be funnier (1–3 tighter variants)

Use plain language. No grammar-textbook jargon unless it sharpens
the breakdown.

### 4. Refine with Rod
Rod responds: keep / edit / reject. Claude updates the pattern
doc. This step may loop — each refinement is one more turn.

### 5. Wire into the character's flavour bank
Once settled, Claude:
- Adds the pattern to the character's `Pattern Affinity` table in
  `docs/characters/[name].md`
- Adds sampling slots to the character's `Flavours` block
- Updates `never_touch` if the pattern has a version that breaks
  character
- Notes in `Generation Notes` the rarity (once per scene / session /
  etc.)

### 6. Log in pattern-lab ledger
Append to this file's Ledger section below:
- `### Pattern #NNN — [name]`
- Character
- Verbatim instance (Rod's line)
- Formula
- Variants
- Status (LIVE / DEPRECATED / EVOLVING)

The ledger is the cross-character index. Over time it becomes the
shared vocabulary for character-writing.

---

## Claude's thinking on "funny"

When Claude assesses why a Rod line works, Claude should name what
definition of funny is in play. Three rough categories:

**Compression humour** — large matter forced into small frame.
Napoleon as a cricket tailender. Faldo describing a bear via the
14th at Augusta. This is Stewart Lee / early Mitchell & Webb
territory. The form is the payload.

**Character-reveal humour** — the joke only works because the
audience knows the character. Boycott blaming modern softness is
funny because Boycott. Someone else saying the same thing is just
a grumpy man. This is the character-comedy Rod flagged in
`feedback_character_comedy.md`.

**Juxtaposition humour** — two registers collide. Mitchell's
pedantry vs a crocodile. Theroux's polite follow-up to Clarkson's
rant. The gap between the two registers is the laugh.

Most Rod lines operate on two or three of these at once. Claude
should name which are in play and which is load-bearing.

---

## Ledger

### Archetype #001 — Counterfactual Humiliation With Expertise-Frame Anchor
**First captured via:** Geoffrey Boycott, 2026-04-22
**Status:** LIVE
**Fits characters:** Boycott, Faldo, Clarkson, Mitchell, Bristow,
possibly Cox (with awareness-mode twist)
**Does not fit:** Ray (no expertise-bragging), Wade (flat not
performative), Attenborough (observer register, no humiliation
framing), Keane (too clipped)

**Rod's verbatim instance (via Boycott):**
> "If Napoleon would have opened the batting against that Aussie
> side of (insert whatever year) he'd have lost hands down....he'd
> have been crying his way back to France....bit like Derek Randall
> when I ran him out at his home ground"

**Abstract formula (cross-character):**
```
[IF-counterfactual]
  If [HISTORICAL OR CURRENT FIGURE] would have [EXPERTISE-FRAME
  ACTION] against [FEARSOME OPPONENT/CONTEXT in expertise domain,
  specific named]
[outcome clause in expertise idiom]
  he'd have [domain-idiom humiliation outcome]
[emotional retreat]
  he'd have been [HUMILIATION VERB] his way back to [ORIGIN place]
[tie-back-to-self chain — expertise career anchor]
  bit like [CHARACTER'S PERSONAL CAREER ANCHOR — specific opponent
  or moment from their actual life]
```

**Character parameterisation:**

### Boycott-parameterisation (the source instance)
| Slot | Character-specific pool |
|---|---|
| EXPERTISE FRAME | cricket |
| EXPERTISE ACTION | opened the batting / walked out at number three / taken strike / faced the new ball |
| FEARSOME OPPONENT | Lillee and Thomson in '74, the Windies pace of '84, Warne and McGrath in '99, Holding and Marshall |
| DOMAIN-IDIOM OUTCOME | lost hands down / back in the hutch before lunch / didn't see the new ball / played across the line |
| HUMILIATION VERB | crying, limping, sulking, dragging his heels, whimpering |
| ORIGIN | France, Macedonia, Rome, Corsica, the Reich, a monastery in Jarrow |
| CAREER ANCHOR | Randall at Trent Bridge, a tailender dismissed, a county game |

### Faldo-parameterisation (sketch — cross-character port)
| Slot | Character-specific pool |
|---|---|
| EXPERTISE FRAME | golf |
| EXPERTISE ACTION | teed off / addressed the ball / took his stance / played the approach |
| FEARSOME OPPONENT | the 14th at Augusta in '96 with pin tucked left / the Road Hole at St Andrews in a 30mph crosswind / Norman at his peak |
| DOMAIN-IDIOM OUTCOME | taken a triple bogey / failed to find the fairway / couldn't commit to the shot |
| HUMILIATION VERB | limping, trudging, sulking, dragging his bag |
| ORIGIN | same as Boycott (historical figure's origin) |
| CAREER ANCHOR | the 1996 Masters (Norman collapse), sandwich-gate, the 1987 Open |

**Faldo instance (sketch):**
> "If Napoleon had teed off on the 14th at Augusta in '96, pin
> tucked left, wind off the water — he'd have taken a triple bogey
> at minimum. Committed to the wrong shot. Hazard right, bunker
> short. He'd have trudged back to France picking up his ball. Bit
> like Norman the same year — addressed the problem, didn't follow
> through."

### Clarkson-parameterisation (sketch)
| Slot | Character-specific pool |
|---|---|
| EXPERTISE FRAME | cars |
| EXPERTISE ACTION | driving across [long distance] / at the wheel of / behind the wheel of a [bad car] |
| FEARSOME OPPONENT | the Stig in a GT3 / Hammond in the jet car / the M25 at 4pm Friday |
| DOMAIN-IDIOM OUTCOME | blown the gearbox / DNF'd / been back in the pits before the first lap |
| HUMILIATION VERB | crawling, limping, sobbing |
| ORIGIN | (as source) |
| CAREER ANCHOR | Reliant Robin rolls, Argentina H982 FKL plates, Burma, Kaleb's field |

**Clarkson instance (sketch):**
> "If Napoleon had driven a SKODA YETI across the Alps in 1812,
> right — he'd have DNF'd before Geneva. Absolute disaster. Been
> towed back to France in tears behind a Peugeot. A PEUGEOT. Bit
> like Hammond in the Zonda. Except Hammond at least made it to
> the crash."

### Mitchell-parameterisation (sketch)
| Slot | Character-specific pool |
|---|---|
| EXPERTISE FRAME | grammar / English usage / reasoning |
| EXPERTISE ACTION | attempting a subordinate clause / navigating a dangling modifier / addressing a dinner party |
| FEARSOME OPPONENT | a particularly forensic copy-editor / Lynne Truss / a Radio 4 continuity announcer / the Observer sub-desk |
| DOMAIN-IDIOM OUTCOME | misplaced his apostrophe / lost the antecedent / split his infinitive |
| HUMILIATION VERB | scurrying, retreating, apologising |
| ORIGIN | (as source) |
| CAREER ANCHOR | his column, a specific radio gaffe, a Peep Show scene, a losing argument with Lee Mack |

**Mitchell instance (sketch):**
> "I mean, imagine — imagine Napoleon trying to get through a
> particularly forensic dinner party conversation in — well, in
> English — he'd have — he'd have split infinitives left and right,
> I think. Dangling modifiers. He'd have retreated to France in a
> state of grammatical collapse. Bit like me, actually, on Just A
> Minute that time. I'm not — I'm not saying it's the same. But
> it's related."

**Claude's analysis:**

*Why it works.* Three-layer compression. A historical absurdity is
anchored to a cricket fact, which is then anchored to Boycott's
self-mythology. Each layer makes the next one more absurd but more
grounded — the compression is intellectually satisfying first, funny
second.

*Which definition of funny.* Primarily **compression humour** (big
thing in small frame — Napoleon as a tailender), with a strong
**character-reveal** layer (only Boycott thinks this way) and a
light **juxtaposition** between historical gravity and Yorkshire
cricket-post-mortem register.

*Why it might not land.* Cricket literacy is load-bearing. A reader
who doesn't know Lillee/Thomson/Randall gets 60% of it. The
historical figure needs to be famous enough that the humiliation
contrast registers — "Steve from accounts vs Lillee" wouldn't work.

*The emotional verb is the dial.* "Crying" is the sweet spot — too
strong ("sobbing") turns cruel; too weak ("mildly disappointed") has
no jolt. "Crying" reduces Napoleon to a schoolboy, which is the
image-contrast laugh.

*How it could be funnier (three directions):*

1. **Specify the year.** "That Aussie side of '74" beats "that Aussie
   side" every time. The specificity is the craft. Fill the slot,
   don't leave it blank.

2. **Add a Yorkshire-moral dismissal.** Boycott's core mechanic is
   the moral taxonomy — Napoleon's failure isn't just technical,
   it's *cultural*. "Corsican. Didn't even play for Yorkshire. Bit
   like Randall at Trent Bridge — but Randall was at least English."

3. **Use cricket-specific humiliation timing.** "Back in the hutch
   before lunch" or "wouldn't have seen the new ball" is denser
   than "lost hands down."

**Variant samples (fresh instances from the formula):**

> "If Caesar had walked out at number three against Marshall and
> Holding in '84, he'd have been back in the hutch before tea. Not
> a proper batsman, him. Roman. Didn't even play for Yorkshire. Bit
> like Gower at Lord's — but Gower at least had a cover drive."

> "Henry VIII opening the batting against Warne and McGrath? He'd
> have been limping back to Hampton Court in three overs flat.
> Couldn't play spin. Never could. Bit like that tailender I saw
> off in '75 — same face when the ball turned."

> "Hadrian taking strike against Lillee in '74 — he'd have been
> sulking back to Rome before drinks. Built a wall to hide behind,
> didn't he. No discipline. No technique. Bit like Randall at Trent
> Bridge — Randall at least had the decency to run, pal, before I
> ran him out."

**Wiring status:** Pattern added to
`docs/characters/geoffrey-boycott.md` → Pattern Affinity table
(`historical_cricket_matchup`: **very high**). Rarity: once per
scene; once per session for the tie-back chain. Every deployment
samples a fresh historical figure + fresh era + fresh anchor.

---

#### Rod's calibration — the PERFECT Boycott instance

Rod endorsed this variant (proposed by Claude as "how it could be
funnier" #2) as the reference standard for Boycott voice:

> "Corsican. Didn't even play for Yorkshire. Bit like Randall at Trent
> Bridge — but Randall was at least English."

Rod's verbatim (2026-04-22):
> "2 abov is perfect Boycott — in tone, length of line, scathing words
> and conviction in his belief about Yorks and symptom of his era —
> PERFECT balance that one"

**The four balance qualities (Rod-named):**

1. **Tone** — scathing throughout
2. **Length of line** — short, clipped, verdict-register (fragment
   sentences, not explanations)
3. **Scathing words + conviction in belief about Yorkshire** —
   "didn't even play for Yorkshire" delivered as moral fact, not
   performance
4. **Symptom of his era** — "Randall was at least English" as
   authentically period-register. Do not modernise.

**Implication for the archetype.** When Boycott deploys Archetype #001,
the target output is this shape. Not the full Napoleon line — that was
Rod's setup. The tightened verdict-register is the finished product.
Future Boycott deployments across any archetype should aim for this
balance: short, scathing, Yorkshire-moral, period-authentic.

**For other characters parameterising Archetype #001:** the
calibration qualities translate but differ. Faldo: measured analytical
wrongness, not scathing — his equivalent is over-specific
commentary-booth precision. Clarkson: hyperbolic volume, not clipped.
Mitchell: articulate collapse, not conviction. Each character's
calibration point is their own character file. Boycott's standard does
not apply to them — only the four-tier structure of the archetype does.

---

### Archetype #002 — Tactless Reduction of Historical Loss via Expertise-Frame Idiom
**First captured via:** Geoffrey Boycott, 2026-04-22
**Status:** LIVE
**Fits characters:** Boycott (primary — cricket idiom is the reference),
Faldo (golf elimination idiom), Clarkson (car-crash / motoring DNF),
Keane (football-management dismissal), Bristow (darts-miss idiom),
possibly McNab (operational-report idiom — dryer register)
**Does not fit:** Attenborough (observer register, not dismissal),
Theroux (would ask about it, not reduce it), Mitchell (would apologise
for the reduction), Ray (silence)

**Rod's verbatim instance (via Boycott, 2026-04-22):**
> "'Back in the hutch' and 'back in the shed' need to be used a lot —
> maybe also to describe tragic deaths and historical losses with the
> lack of tact we all find funny"

**Abstract formula (cross-character):**
```
[HISTORICAL CATASTROPHE or TRAGIC LOSS — named, recognisable]
→ [EXPERTISE-FRAME DISMISSAL IDIOM — flat delivery, no concession
   to the scale of the loss]
→ (optional) [brief technical diagnosis in the expertise frame]
→ (optional) [comparative aside — "bit like X" from career anchor]
```

The essential quality: **the tactlessness is the engine.** The
dismissal must be delivered flat — no solemnity, no irony, no
knowing wink. The character is genuinely applying their frame
to a tragedy that doesn't fit, and the gap between the scale of
the event and the banality of the verdict is the laugh.

**Character parameterisations:**

### Boycott (cricket dismissal — the source)
| Slot | Character-specific pool |
|---|---|
| DISMISSAL IDIOM | "back in the hutch", "back in the shed", "back in the hutch before tea", "straight back in the hutch", "played across the line", "rush of blood, that" |
| TECHNICAL DIAGNOSIS | "Poor technique. No discipline. Played across the line." |
| COMPARATIVE ANCHOR | Randall, Gooch, a tailender, a Test-match collapse |

**Boycott instances (sketches):**
> "Custer at Little Bighorn? Back in the hutch before tea. Played
> across the line, hadn't he. Rush of blood. No discipline."

> "The Titanic? Straight back in the shed, that lot. Whole side
> out. Bit like the '48 Ashes — bowled out for 52. Same face on
> the captain, mind."

> "Light Brigade? All back in the hutch. Every one of 'em. Not a
> single proper batsman among 'em."

### Faldo (golf elimination)
| Slot | Character-specific pool |
|---|---|
| DISMISSAL IDIOM | "missed the cut", "took a double bogey", "in the rough by the 4th", "didn't commit to the shot", "couldn't find the fairway" |
| TECHNICAL DIAGNOSIS | "Didn't address the problem. Follow-through was all wrong." |
| COMPARATIVE ANCHOR | 14th at Augusta, Norman's collapse, sandwich-gate |

**Faldo instance (sketch):**
> "Custer at Little Bighorn. Mmm. He didn't read the lie, did he.
> Hazard left, hazard right, and he went STRAIGHT at it. Missed
> the cut by about, oh, two-hundred-and-seventy. Like Norman in
> '96 — addressed the problem, didn't follow through."

### Clarkson (car-crash register)
| Slot | Character-specific pool |
|---|---|
| DISMISSAL IDIOM | "DNF", "written off", "blew a gearbox", "rolled it at the first corner", "towed home behind a Peugeot" |
| TECHNICAL DIAGNOSIS | "Wrong vehicle for the terrain. ABSOLUTE wrong vehicle." |
| COMPARATIVE ANCHOR | Hammond's crash, Reliant Robin rolls, Burma bikes |

**Clarkson instance (sketch):**
> "The Titanic? Oh for GOD'S sake. That's a DNF, isn't it. Hit an
> iceberg. That's — that's like driving a SKODA into a WALL.
> Towed home? No. NO. The whole thing went DOWN. Absolute write-
> off. Bit like Hammond in the Zonda, except Hammond at least made
> the hospital."

### Keane (football dismissal)
| Slot | Character-specific pool |
|---|---|
| DISMISSAL IDIOM | "should've been subbed", "red card, that", "out of the derby", "wouldn't have started for us", "lost the dressing room" |
| TECHNICAL DIAGNOSIS | "Weak. Soft. Lacked bottle." |
| COMPARATIVE ANCHOR | Leeds '00, Cantona, a name he won't say |

**Keane instance (sketch):**
> "Custer? Lost the dressing room. Should've been subbed at
> half-time. Red card, that."

### Bristow (darts miss register)
| Slot | Character-specific pool |
|---|---|
| DISMISSAL IDIOM | "missed the double", "bust", "3-dart average was rubbish", "couldn't hit the treble" |
| TECHNICAL DIAGNOSIS | "Chalked his hand for that one, did he. Daft." |
| COMPARATIVE ANCHOR | Eric the Crafty Cockney, a big-stage choke |

**Bristow instance (sketch):**
> "Titanic? Bust. Whole ship. Missed the iceberg double. Leave it
> OUT. That's a 3-dart average of rubbish, son."

**Wiring status:** Boycott mannerisms updated with
`signature_dismissal_idioms` high-frequency pool
(`back in the hutch` / `back in the shed` + variants). Pattern
added as `tactless_tragedy_dismissal` to his affinity table.
Cross-character sketches above are reference material for when
Faldo / Clarkson / Keane / Bristow are wired into SS
(SS-211 / SS-208).

---

#### Sub-pattern #002-a — Equipment-Selection Diagnosis

Rod's verbatim instance (2026-04-22):
> "'no, no, no, no, no, you can't expect to make it out of the 20s
> or 30s using a decapitated head, poor equipment selection'"

**Shape (within #002):**
```
[5-deep "no, no, no, no, no" refusal opener]
→ [cricket-innings-milestone framing: "make it out of the 20s/30s"]
→ [body part OR misfortune as LITERAL equipment — the pivot]
→ [flat coaching verdict: "poor equipment selection"]
```

**The engine.** Three frame-shifts in one sentence: historical
bodily event → stuck-in-the-twenties cricket innings → equipment
malfunction → coach's post-mortem verdict. The pivot is treating
a body part (or lack thereof) as kit — "decapitated head" read
as *equipment the batter was using*. Boycott's cricket-brain
genuinely maps bodies onto technique.

**Dial.** The literalness. Softer ("used his head") = clever;
full literal ("using a decapitated head") = devastating because
it's factually true and cricket-frame-absurd simultaneously.

**Why it might not land.** Cricket-innings-milestone idiom
("make it out of the 20s or 30s") is parseable in TMS-register
but opaque to non-cricket audiences. Loses ~30% of impact
without that.

**Tightening variants (Boycott):**
> "Anne Boleyn? No, no, no, no, no. You can't expect to make it
> out of the 20s or 30s using a decapitated head. Poor equipment
> selection. Wouldn't have happened in Yorkshire — we'd have kept
> our heads."

> "Marie Antoinette? Same problem. Took strike without her head.
> What was she thinking. Back in the hutch before lunch."

> "Mary Queen of Scots batted above her average for two decades,
> mind. Then lost her head. Same way Randall lost his at Trent
> Bridge — though Randall at least kept it attached."

**Cross-character parameterisations of sub-pattern #002-a:**

**Faldo — wrong club:**
> "Custer? Wrong club, wasn't it. He went at it with a driver
> when the course demanded a 5-iron. You can't attack the 14th
> at Little Bighorn with a driver. Pin's tucked left. Wind off
> the water. Shape the approach."

**Clarkson — wrong vehicle:**
> "The Light Brigade? Oh for GOD'S sake. Wrong VEHICLE, wasn't
> it. They should've been in DISCOVERIES. They were on HORSES.
> HORSES. Absolute DNF. Whole brigade TOWED home."

**Keane — wrong substitution:**
> "Mary Queen of Scots should've had a centre-back on. Went into
> extra time with a weak midfield. Should've been subbed at
> half-time. Red card, that."

**Bristow — wrong flights:**
> "Custer? Wrong flights, son. He was using standards when he
> needed slims. Dart was wobbling all the way to the board. No
> wonder he missed the double. Bust."

**Mitchell — wrong grammatical mood:**
> "If Anne Boleyn had — and I'm — I'm not saying it was her
> fault, exactly — but if she'd — she'd have been better served
> by the subjunctive. 'If I were to keep my head.' Conditional.
> She — she committed to the indicative. That's where — that's
> where it went wrong, I think. I'm sorry. I know."

**Wiring status:** Added to Boycott mannerisms as 5-deep "no"
opener. Sub-pattern catalogued here. Cross-character sketches
are reference material.

---

### Archetype #004 — False-Attribution Self-Anecdote With Absurd Inflation
**First captured via:** Geoffrey Boycott, 2026-04-22
**Status:** LIVE
**Fits characters:** Boycott (primary), Faldo, Clarkson, Mitchell,
possibly Bristow. Requires ego-driven register.
**Does not fit:** Theroux, Ray, Wade, Attenborough (wrong register —
self-erasing or observer, not hijacking).

**Rod's verbatim instance (via Boycott, 2026-04-22):**
> "'it's funny you mention Headingley, 1970(-whatever date)' when
> no-one has mentioned it 'I went on to score a ton there, in just
> 645 balls, and the cheering and adulation from the crowd for
> me....just the sheer cheering...it went on for 17 days'"

**Abstract formula (cross-character):**
```
[FALSE-ATTRIBUTION OPENER — "it's funny you mention X" where X
 was NOT mentioned]
→ [REAL CAREER ANCHOR — specific place + year, verifiable]
→ [SELF-DEPRECATING-AS-BRAGGING STAT — a number that reads as
 modest to outsiders but as pride to insiders]
→ [GRANDIOSE ADULATION CLAIM]
→ [ABSURDLY-SPECIFIC INFLATED DURATION OR QUANTITY]
```

**The triple-stack engine.**
1. **Hijack comedy** — false-attribution opener reveals the
   character as someone who forces their own anecdotes in.
   Nobody mentioned the career moment. The character pretends
   they did. Character-reveal in the first clause.
2. **Real-mixed-with-unreal** — the career anchor is genuine
   (checkable). The inflated duration is nonsense. Audience
   can't tell where the truth ends, which amplifies both.
3. **Self-unaware narcissism** — the crowd cheering *for me*
   is the peak. No irony. The character genuinely believes it.

**The dial.** The absurd number. Sweet spot is *specific and
weird*: 17 days (not "for ages"), 47 times (not "loads"), "a
fortnight" (not "a while"). Specificity sells the lie; weirdness
reveals it.

**"Just" as the bragging tell.** "In just 645 balls" is the
masterclass. 645 balls for a Test century is extraordinarily
slow — but Boycott considers it an exemplary innings. The "just"
pretends modesty. It is the opposite. This pattern requires a
character-stat that WOULD look bad to outsiders but which the
character considers their best work.

**Character parameterisations:**

### Boycott
| Slot | Pool |
|---|---|
| CAREER ANCHOR | Headingley 1977 (100th century), Trent Bridge 1977, various Tests '67–'82, Yorkshire Championship moments |
| PROUD-MODEST STAT | "in just 645 balls", "off only 420 deliveries", "over just 6 sessions", "for just a 1.4 strike rate" |
| ABSURD DURATION | "17 days", "three full weeks", "a fortnight of standing ovation" |

### Faldo
| Slot | Pool |
|---|---|
| CAREER ANCHOR | 1996 Masters, 1987 Open, various Ryder Cups |
| PROUD-MODEST STAT | "I shot a 67 that Sunday" (Masters closing round is good; Faldo would consider it a benchmark), "took just one practice swing", "dropped only two shots over the back nine" |
| ABSURD DURATION | "14 days", "a full tournament week of applause", "three sponsor's dinners' worth" |

**Faldo instance:**
> "It's funny you mention the '96 Masters — (*no one has*) — I shot
> a 67 that Sunday. Just one practice swing. Dropped two shots
> over the back nine. Norman's reaction, though — Norman's reaction
> lasted 14 days on its own."

### Clarkson
| Slot | Pool |
|---|---|
| CAREER ANCHOR | Reliant Robin rolls, Argentina H982 FKL, Burma bikes, Diddly Squat wheat harvest |
| PROUD-MODEST STAT | "I rolled that thing 47 times", "it only caught fire twice", "I drove the whole thing on just one wheel for, oh, 40 minutes" |
| ABSURD DURATION | "a full WEEK of applause", "an actual fortnight", "the emails went on for a solid YEAR" |

**Clarkson instance:**
> "It's funny you mention the Reliant Robin — (*no one did*) — I
> rolled that thing FORTY-SEVEN times in one afternoon. The
> applause went on for a WEEK. An actual WEEK."

### Mitchell
| Slot | Pool |
|---|---|
| CAREER ANCHOR | Observer column topics, QI appearances, WILTY rounds, The Unbelievable Truth episodes |
| PROUD-MODEST STAT | "I wrote that in just seven hours", "fact-checked only twice", "under 1,200 words" |
| ABSURD DURATION | "a fortnight of emails", "I think the Twitter-feed lasted three days", "my wife handled most of them" |

**Mitchell instance:**
> "It's funny you mention my Observer column from 2011 — (*no? — no
> one did*) — well, anyway. Wrote that in, I think, seven hours.
> Fact-checked twice. The email fallout went on for, oh, a
> fortnight. My wife handled most of them, actually. I'm — I'm not
> saying I'm proud of that but — I'm not NOT."

### Bristow
| Slot | Pool |
|---|---|
| CAREER ANCHOR | World titles '80/'81/'84/'85/'86, specific nine-dart attempts |
| PROUD-MODEST STAT | "I was averaging, what, just 97 per 3 darts", "hit the double 16 on the first attempt", "finished on the bull" |
| ABSURD DURATION | "Leicester was cheering for a full week", "the pub wouldn't let me leave for three days" |

**Bristow instance:**
> "It's funny you mention the '85 Embassy — (*no one has*) — I was
> averaging just 97. Just 97. Hit the double 16 on the first
> attempt, left-handed mind. Leicester cheered for a full week.
> The pub wouldn't let me leave for three days. Son."

**Wiring status:** Pattern added to Boycott's affinity table
(`false_attribution_self_anecdote`: **very high**). Cross-
character sketches above are reference material for SS-211
(Pack Two wiring) and SS-208 (existing character bank
extensions). Rarity: once or twice per session — the false-
attribution loses force if overused.

---

### Archetype #005 — Improvised Visual Aid That Undermines Itself + Lost-Thread Derailment
**First captured via:** Prof Brian Cox, 2026-04-22
**Status:** LIVE
**Fits characters:** Cox (primary), Robin Williams, Jim Carrey,
Clarkson, Bear (with re-framing twist). Needs a character who
reaches for a prop and doesn't self-edit.
**Does not fit:** Ray (silent), Wade (flat), Keane (clipped),
Theroux (observer, does not teach), Boycott (never admits a
metaphor is wrong), Mitchell (would abandon the attempt the
moment the prop failed), Attenborough (too controlled, narrates
rather than demonstrates).

**Rod's verbatim instance (via Brian Cox, 2026-04-22):**
> "Brian is trying to teach others something and likes to use visual
> examples to aid his lessons (that no-one asked for and is either
> part interested, waningly interested over time to apathetic),, so
> grabs a paperweight and a something smaller, or maybe even better
> grabs a stapler and it doesn't fit a smaller star and is weird
> shape so has to call that out and ruin the spell of his visual by
> saying like the stapler, just totally different, round and much
> smaller (runing the point of using the prop) 'you see the most
> single most dead great magnificent thing...about the way that
> stars are formed....inside dense nebulae that have themselves been
> forming over millenia...is that...' and then either talk utter
> bullshit, non-sequitur, or loevely ones, have talked too much and
> gone down a completely separate thread, or just trail off having
> forgotten what the fuck they were talking about"

**Abstract formula (cross-character):**
```
[GRANDIOSE PREAMBLE — over-escalated register promising revelation]
  "you see, the most single most dead great magnificent thing
   about [cosmic/spiritual/profound topic] is..."
→ [PROP GRAB — reaches for object to demonstrate, unprompted]
  stapler / paperweight / coffee cup / whatever is to hand
→ [PROP CALLOUT — acknowledges object doesn't fit the metaphor,
   ruining the spell while still holding the object]
  "like the stapler, just totally different, round and much smaller"
→ [MAIN POINT ATTEMPT — "is that..."]
→ [DERAILMENT — one of four endings, sample fresh per call]:
    (a) confident bullshit — speaker plausibly continues with
        content that is factually wrong or empty
    (b) non-sequitur — sudden unrelated thought takes over
    (c) lovely divergence — wanders into a genuinely interesting
        separate thread that is not the point
    (d) trail-off — loses the thread mid-sentence; "... and ...
        I've forgotten what I was saying. Hmm. What was the
        question?"
```

**Panel dynamic overlay (part of the archetype):** other panel
members tune out on a decay curve while he monologues. Part-
interested → waning → apathetic. He does not notice. This is not
decoration — it is load-bearing. The comedy requires us to see
the panel disengaging while the speaker remains earnestly
committed.

**The engine.** Four-layer self-sabotage, plus panel-attention
decay as background music. Grandiose preamble promises revelation.
Wrong prop breaks the metaphor before it starts. Prop-callout
ruins whatever spell remained. The ending doesn't land the point
it set up. And nobody is listening except the character, who is
rapt.

**The dial.** The prop callout. Silent failure = just a bad
demonstration. Calling out the mismatch aloud ("like the stapler,
just totally different, round and much smaller") and continuing
anyway is the Cox-specific move. The earnestness survives the
self-defeat.

**Which definition of funny.** Primarily **character-reveal** —
this is Cox's TV-presenter register compressed into a sentence-
level mechanic. The audience recognition ("yes, he does exactly
this") is the laugh. Secondary **compression** (cosmic topic →
stapler) and **juxtaposition** (speaker's rapture vs panel's
apathy).

**Character parameterisations:**

### Cox (primary)
| Slot | Pool |
|---|---|
| GRANDIOSE PREAMBLE | "the most single most dead great magnificent thing", "the absolutely phenomenal fact is", "the really rather astonishing thing about" |
| TOPIC | stellar formation, quantum entanglement, the LHC, dark matter, black-hole thermodynamics, the speed of light in a medium |
| PROP | stapler, paperweight, coffee mug, pen, a boot, a rolled-up napkin |
| PROP-CALLOUT PHRASING | "though obviously [prop is] the wrong shape — [prop] is [differences]", "ignore the fact that it's [colour/shape/size] — imagine it's [corrected attribute]" |
| DERAILMENT TYPE | (sample a/b/c/d per call) |

**Cox instance (sketch, derailment type d — trail off):**
> "You see, the most single most *dead great* magnificent thing
> about the way that stars are formed — inside dense nebulae that
> have themselves been forming over millenia — [*grabs stapler*]
> — though obviously this is a stapler, it's the wrong shape, it's
> not even vaguely the right density — just imagine it's hot
> hydrogen — and — and what happens inside the nebula, gravity
> begins to, to, ah — [*looks at stapler*] — actually this is a
> really rather well-engineered stapler. Swingline? [*pause*]
> What was I saying?"

**Cox instance (sketch, type b — non-sequitur):**
> "The absolutely astonishing fact about stellar nucleosynthesis is
> that — [*grabs paperweight*] — though this is obviously a
> paperweight, it's glass, it's completely cold, it's not hot
> hydrogen — but, crucially, the heavier elements in a star are
> forged under immense pressure, and I saw a tortoise in Chester
> once that had the most remarkable shell pattern, it was
> practically a Fibonacci sequence, and — and that's really
> connected to this, if you think about it at the right level of
> abstraction."

### Robin Williams (chaotic prop-adoption)
| Slot | Pool |
|---|---|
| PROP | stapler (becomes 15 things in succession — spaceship, microphone, handgun, baby, weapon, dance partner) |
| DERAILMENT | improv chain — prop triggers character voices, stapler becomes the star of its own show |

**Williams instance (sketch):**
> "The star is formed in a — [*grabs stapler*] — [*Schwarzenegger
> voice*] I AM ZEE STAPLER — [*Mrs Doubtfire voice*] oh deary me
> dear it's a stellar formation now — [*jazz scat*] and nebulae,
> ba-ba-BA, nebulae — [*suddenly quiet, Good Will Hunting register*]
> it's not your fault. It's not your fault. [*normal*] and THAT
> is what stars are made of."

### Jim Carrey (physical-prop comedy)
| Slot | Pool |
|---|---|
| PROP | stapler becomes a body extension — staples own hand, fires it across the room, mimes being devoured by it |
| DERAILMENT | physical; verbal content is minimal; the prop IS the whole thing |

### Clarkson (derailed into prop-critique)
| Slot | Pool |
|---|---|
| PROP | stapler |
| PROP CALLOUT BECOMES 3-MINUTE RANT | ABOUT stapler design itself |
| DERAILMENT | type c — lovely divergence into stapler engineering, forgets the original topic entirely |

**Clarkson instance (sketch):**
> "The star? Yeah. So — so — [*grabs stapler*] — WAIT. NO. This
> is the SWINGLINE 747. They don't MAKE these any more. I had one
> of these in the Top Gear office. The ACTION on this is — it's
> like a — it's like a WATCH. Swiss. LISTEN. [*staples*] THAT
> is engineering. What were we talking about?"

### Bear (survival-reframing)
| Slot | Pool |
|---|---|
| PROP | stapler IS reframed as a survival implement immediately |
| DERAILMENT | type a — confident bullshit about stapler as weapon / firestarter / first-aid tool |

**Bear instance (sketch):**
> "Look — stellar formation, fascinating. Quick note though —
> [*grabs stapler*] — this stapler. In the Rockies. Broken leg.
> Staple your own trouser leg as an improvised splint. I've done
> this. There's no time in a survival scenario to find a proper
> splint. The staples rust, fine, but by then you've hiked out.
> Hydration?"

**Wiring status:** Cox character file updated with verbatim Rod
memory. Pattern added to pattern-lab.md. Needs wiring into
character affinity tables for Cox, Williams, Carrey, Clarkson,
Bear when Pack Two ships (SS-211). Rarity: once per session per
character maximum. The set-piece quality of the derailment
protects it from overuse.

**Panel-level rendering note:** because this archetype has a
panel-dynamic overlay (attention decay), the output format
should include per-character engagement/attention deltas across
the speech turn. Connects to SS-216 (per-round character state
display). Render as panel reaction notes: "Ray: glazed",
"Keane: staring at the ceiling", "Mitchell: has started
correcting Cox's grammar silently to himself."

---

### Archetype #006 — The Dodgy Expat Anecdote
**First captured via:** Bear Grylls, 2026-04-22
**Status:** LIVE
**Fits characters:** Bear (primary), Faldo, Clarkson, Robin
Williams, possibly Cox (different register — would be sincere
rather than tall-tale)
**Does NOT fit:** Boycott (never admits doubt about a fact), Ray
(silent, not anecdotal), Wade (flat, factual), Mitchell (too
honest — would say "I'm not sure, let me check"), Attenborough
(observer, narrates others not self), Keane (too clipped),
Theroux (observer), McNab/Ryan/Billingham/Ollie (their travel
experience is real — wrong register).

**Rod's verbatim instance (via Bear, 2026-04-22):**
> "'Back in Boodan Garn....was it Boodan Garn, that is a place
> right, that's what they told me...lovely people, full of laughter
> as they sent me to Boodan Garn....wasn't a nice place...got shot
> at by natives who thought I'd slept with the chieftan's wife'
> something like that but not quite"

**Rod's extension (same day):**
> "now either the locals fucked him over coz he's a prick, or they
> just wanted to see him eaten in a tribes pot - maybe Boodan Garn
> was the chieftans wife of the other village - or meant he wanted
> to buy her or something"

**Abstract formula (cross-character):**
```
[OPENER — "Back in [garbled / fabricated place name]"]
  Place name is phonetically plausible for a real exotic location
  but either wildly wrong or completely fictional.
→ [SELF-DOUBT — "was it [Place]? That is a place, right? That's
   what they told me"]
  Outsources attribution. Plausible deniability built in.
→ [LOCALS AS WARM — "lovely people, full of laughter"]
  Crowd initially positive in the memory.
→ [TONAL PIVOT — warmth reinterpretable as malice or mockery]
  "...as they sent me to..." / "...as they watched me leave..."
  / "...as they pointed me toward..."
→ [FLAT CONTRADICTORY VERDICT — "wasn't a nice place"]
  Sudden judgement-flip after warmth. No explanation.
→ [PASSIVE-VICTIM SCANDALOUS CLIMAX]
  Speaker is accidental protagonist of a romantic, cultural, or
  political misunderstanding. Victim-of-circumstance framing.
  Colonial-register scandal or fish-out-of-water offence.
```

**Five layers of unreliability stacked in one anecdote:**
1. Garbled place name (spatial unreliability)
2. Self-doubt about the name (memory unreliability)
3. Outsourced attribution ("they told me") (source unreliability)
4. Warmth→malice pivot (emotional unreliability)
5. Victim-of-misunderstanding framing (agency unreliability)

**The dial.** The place name. "Boodan Garn" is the sweet spot:
plausible enough to pass as real (Burmese? Sudanese?
West-African?), garbled enough to be suspect. Too-real ("Kathmandu")
= no joke. Too-silly ("Wibble-Wibble") = broken tone. Garbled-
plausible = comedy gold.

**Which definition of funny.** Primarily **character-reveal** (only
Bear constructs anecdotes this unreliable this confidently).
Secondary **compression** (whole dodgy anecdote in 30 words) and
**juxtaposition** (warmth→malice→scandal compressed into three
clauses).

---

#### Sub-pattern #006-a — The Garbled Term That IS the Incident

Rod's killer extension. The garbled "place name" was never a
place at all — it was a CRITICAL WORD the speaker misheard, and
that mishearing *is the root cause of the whole incident.*
Possibilities:

- Not a place — the name of someone's wife
- Not a place — a phrase meaning "I want to buy your wife"
- Not a place — a proposition to which the speaker gave the
  wrong answer
- Not a place — a dish, and the speaker was being invited to
  BECOME it
- Not a place — a slur the speaker accidentally repeated
- Not a place — a dare

When sub-pattern fires, the anecdote is restructured to reveal
the mishearing as the engine:
> "...oh — oh, I see now — Boodan Garn wasn't the place, was it.
> It was what the chieftain CALLED his wife. They thought I was
> — well — offering to buy her. Hence the shots."

The locals' laughter is retroactively explicable (they KNEW).
Bear is still the victim, but now the victim of his own error.
This is more Bear-authentic than simple local malice — the
self-confident Brit causes the catastrophe by never hearing the
word correctly in the first place.

**Boycott anti-compatibility:** this sub-pattern fundamentally
cannot fire for Boycott — he would never admit he'd heard
anything wrong. His anecdotes have zero linguistic unreliability.
Every detail is confidently correct.

---

**Character parameterisations:**

### Bear (primary)
| Slot | Pool |
|---|---|
| GARBLED PLACE | Boodan Garn, Shimbé (not a real place), Neb-Halla, the Luqwok Delta, West Farkistan, the outer Grasslands of Pentchen |
| CREDENTIAL ANCHOR | training exercise / SAS recce / documentary shoot / "liaison role" |
| LOCAL WARMTH DETAIL | laughter, hand-gestures, food offered, drumming, children pointing |
| WARMTH PIVOT | "as they sent me to...", "as they stopped laughing", "right up until they told me to run" |
| VICTIM SCANDAL | slept with chieftain's wife / misread a political flag / ate the sacred goat / wore the wrong colour / turned up at a funeral in board shorts |

**Bear instance (sketch, with sub-pattern #006-a):**
> "Back in Boodan Garn — was it Boodan Garn? That's a place, right?
> That's what the liaison told me. Lovely people. Full of laughter
> when I arrived. Singing at dinner. Wasn't a nice place though. Got
> shot at, day three. Apparently — and the translator told me this
> later — Boodan Garn wasn't the place. Boodan Garn was the
> chieftain's wife. They thought I'd — look, I hadn't. I just kept
> SAYING the word. Thought it was a town name. Hydration?"

### Faldo
| Slot | Pool |
|---|---|
| GARBLED PLACE | garbled golf-course name — "Brooklime"? "Perryvale"? "Saint-Somewhere-Les-Deux"? |
| CREDENTIAL ANCHOR | invitational / pro-am / Ryder Cup practice round |
| WARMTH | members, caddies, clubhouse applause |
| SCANDAL | accepted a trophy that wasn't his / misheard a dinner invitation / played through when he shouldn't have |

**Faldo instance (sketch):**
> "Back in Brookline — is it Brookline? Course outside Boston
> somewhere. Lovely members. Dinner. Applauded me in. Then followed
> me to the hotel and left a note saying 'enjoy your trophy.' I
> hadn't won the trophy. They thought I had. Thought I'd taken it.
> Long story."

### Clarkson
| Slot | Pool |
|---|---|
| GARBLED PLACE | dodgy road, wrong side of a border, a town name he can't be bothered to pronounce |
| CREDENTIAL ANCHOR | Top Gear special / Grand Tour / a ferry he wasn't supposed to be on |
| WARMTH | locals pointing and laughing at the car |
| WARMTH PIVOT | "right up until they realised what was written on the plates" |
| SCANDAL | H982 FKL plates in Argentina, unflattering car slogan, refused border crossing |

**Clarkson instance (sketch):**
> "Back in — what was it — Ushuaia? USHUAIA. It's a real place. It
> IS. The locals were WAVING. Smiling. Right up until they saw
> what was written on the number plate. FKL something. We didn't
> know. WE DIDN'T KNOW. Had to leave at two in the morning in
> separate vehicles. Hammond cried."

### Robin Williams
| Slot | Pool |
|---|---|
| GARBLED PLACE | improvised fake place names rendered in three local accents |
| CLIMAX | becomes a scene played out by Robin himself as every character |

**Wiring status:** Bear character file updated with verbatim Rod
memory. Archetype added to pattern-lab.md. Wiring into Bear's
existing `unnecessary_personal_experience` + `eyewitness_self_
correct` patterns — not a replacement, an extension. Sub-pattern
#006-a is the high-leverage variant — deploy when the archetype
fires and the panel-dynamic supports a third-act reveal. Rarity:
once per session maximum — the stack of unreliability needs
distance between deployments to retain its bite.

---

### Archetype #007 — The Wistful Random Person Reference
**First captured via:** Rod's cross-references (Wayne's World Heston,
Al from Quantum Leap, Blues Brothers "Minnie"), 2026-04-22/23
**Status:** LIVE
**Fits characters:** Bear (stacks with #006), Gordon Lyons (PEAK
fit — his existing register), Boycott, Faldo, Clarkson, Les
Hiddins, Robin Williams, Jim Carrey, Attenborough (mode c only —
genuine), McNab/Ryan (mode c only — genuine), Billingham/Ollie
(mode c — real contacts).
**Does NOT fit:** Ray (silent, no anecdotes), Wade (factual),
Mitchell (would clarify acquaintance depth immediately), Theroux
(observer), Keane (too clipped).

**Rod's verbatim instance (2026-04-22):**
> "I'd like our panel members to reference random people they know
> that relate to the location, event, story and people in the
> conversation - often for no good reason, or just looking away
> wistfully (like in waynes world 'I once knew a girl in...' line
> - look it up Charlton Heston) - or maybe the thought just
> triggered - or it turns out they actually do know them- they
> mention them - like Al in QUantum Leap 'I once knew a ten dollar
> hooker named ...' or Blues Brothers Minnie the Moocher ('I knew
> a hooker called Minni MIssola' etc"

**Cultural reference points (three anchor examples):**
1. **Wayne's World Heston** — gas-station wistful monologue. Exact
   scene unverified (likely WW2), but the MODE is clear: an old
   man, eyes soft, voice softening, "I once knew a girl in [X]..."
   — the emotional weight of the memory against the mundane scene.
2. **Al from Quantum Leap (Dean Stockwell)** — repeatedly drops
   anecdotes about women he's known during operational advice to
   Sam. Always oddly specific. Often untimely.
3. **Blues Brothers / Minnie the Moocher** — ("Minnie Missola"
   appears to be Rod's conflation / variant of the Cab Calloway
   character-lyric). The *pattern* is named-female + occupation +
   city + faint backstory, delivered with musical intimacy.

**Abstract formula (three delivery modes — pick one per call):**

```
[TRIGGER — something in the current conversation (location /
 event / object / person / vice) sets off the memory]
→ [DELIVERY MODE]:

   MODE (a) — WISTFUL GAZE
   Looks away, voice softens, register drops half an octave
   "I once knew a [ROLE + NAME?] in [SPECIFIC PLACE]..."
   Often trails. Rarely completes the thought.

   MODE (b) — THOUGHT-TRIGGERED NON-SEQUITUR
   Delivered at current conversational register, no softening
   "I once knew a [OCCUPATION + PRICE OR QUALIFIER] named [NAME]"
   Lands fast. Derails the urgent scene. Can be left hanging.

   MODE (c) — GENUINE NAME-DROP
   Panel expects (a) or (b). Gets actual acquaintance
   "Yeah — I knew her. [SPECIFIC PLACE], [YEAR]. [CONCISE DETAIL]"
   The surprise IS the comedy. Panel has to reconcile.

→ [SUSPICIOUS SPECIFICITY — always]:
   one surprising adjective + name + specific place
   (one beat too many, one detail too vivid)

→ [OPTIONAL TRAIL-OFF]:
   memory takes over; thought never completes
```

**The engine.** Suspicious specificity is the payload. "A prostitute"
is nothing; "a ten-dollar hooker named Minnie, Cicero, 1967,
ran a numbers game out of a laundromat" is a whole relationship
compressed into a sentence. The specificity forces the listener
to wonder whether it's real, fabricated, or confused memory.
That uncertainty IS the comedy.

**The dial.** Detail bracket.
- Detail-less ("I knew a girl once") = nothing
- Mid-detail ("a girl in Iowa") = a little
- Full-detail ("a ten-dollar hooker named Minnie Missola, Cicero,
  '67") = comedy gold
- Too much ("...who ran a numbers game out of a laundromat on
  75th, partnered with a guy named Russo who'd been in the 506th
  in Korea...") = tips into exposition, breaks the form

Sweet spot: **one surprising adjective + named + specific place**.

**Mode breakdown:**

- **Mode (a)** needs earned wistfulness. Pair with a location-
  trigger. Quiet register. Works best when the panel has just
  mentioned a city, country, or physical place and the speaker
  softens.
- **Mode (b)** needs speed. The non-sequitur lands because it
  derails the urgent scene. Inappropriate timing is the point.
  Can be left hanging — the panel doesn't get the follow-up.
- **Mode (c)** needs SETUP. The panel expects (a) or (b). Gets
  actual acquaintance. The funniest version because it subverts
  the archetype expectation — turns "random unreliable anecdote"
  into "wait, that was real?"

**Which definition of funny.** Primarily **character-reveal**
(each character's random-person references reveal their
priorities — Bear's are hookers/chieftains' wives, Boycott's are
tailenders, Faldo's are caddies). Secondary **compression**
(whole relationship in one sentence) and **juxtaposition**
(inappropriate emotional weight dropped into urgent scene).

**Integration with Archetype #003 (Echo Mechanic):** a character
invoking a random person can trigger another character to claim
*they* know the same person. Chains into the Marcus Cocceius
Firmus mechanic already live in Legends. "A ten-dollar hooker
named Minnie Missola? Funnily enough, *I* knew a Minnie Missola
in Wakefield. Different Minnie, mind. Possibly."

**Character parameterisations:**

### Gordon Lyons (Cusslab — PEAK fit)
| Slot | Pool |
|---|---|
| NAMED PERSON | a fella / a bloke / a mate of mine / a lad I used to know |
| OCCUPATION / VICE | fire brigade, amateur herpetologist, mechanic, pub landlord, snake breeder |
| PLACE | Belfast, Lisburn, Ballyclare, Templepatrick |
| DELIVERY | addressed to Doug; mode (b) with a warm Northern Irish lilt |

**Gordon instance:**
> "You'll love this one Doug — I once knew a lad in Lisburn, kept
> a lowland copperhead in his downstairs loo. Called her Pam.
> Lovely wee snake. Bit him twice. Lovely fella, Darren."

### Boycott (mode b with false-attribution pairing)
| Slot | Pool |
|---|---|
| NAMED PERSON | tailenders, county journeymen, umpires, MCC members |
| PLACE | Featherstone, Pontefract, Wakefield, Fitzwilliam |
| DELIVERY | mode (b) — no wistfulness, flat verdict-register |

**Boycott instance:**
> "It's funny you mention the Alps — I once knew a tailender from
> Featherstone, went skiing in the Alps, broke both his wrists.
> Played the rest of the season with bandages on. Not a proper
> batsman. Not from Yorkshire either — Derbyshire, pal. That'll
> teach you."

### Al-mode universal (for any character with randy register)
| Slot | Pool |
|---|---|
| DELIVERY | mode (b), one line, never elaborated |

**Bear instance (stacking with #006 Boodan Garn):**
> "Hydration was the issue. Also — funnily enough — I once knew a
> girl in Tegucigalpa. Ten dollars. Called herself Blanca though
> I'm not sure that was her actual name. Anyway. The filter. Point
> is, the water filter was the issue."

### Attenborough (mode c — genuine)
| Slot | Pool |
|---|---|
| NAMED PERSON | real naturalists, filmmakers, tribal leaders he's met |
| PLACE | specific filming locations |
| DELIVERY | mode (c) — it turns out he really does know the person |

**Attenborough instance:**
> "It may be relevant to mention — I once knew a man in Ghana, in
> '71, a beekeeper named Kwame. Lost both hands to a lorry on the
> Cape Coast road. Still kept bees. Called them his 'girls.' He is
> the reason I know what I know about nocturnal pollination. The
> bees are a little beside the point, but the man was real."

### McNab / Ryan (mode c — also genuine, but operational)
| Slot | Pool |
|---|---|
| NAMED PERSON | operators, contacts, regiment alumni |
| PLACE | Hereford, Kenya deployment, specific ops |
| DELIVERY | mode (c) — they genuinely knew someone |

**McNab instance:**
> "Firm. Spent three months with him in the Brecons. Broke his nose
> on a rope. Still operational. Point is — the river crossing is
> the issue."

**Wiring status:** Added to pattern-lab.md. Each character's
random-person-reference pool is a dedicated slot bank
(`RANDOM_PERSON_BANK`) — typed slot that all characters populate
from their own context. The Attenborough-mode-c pool must be
factually grounded (real people he's worked with). Other
characters' pools can be fabricated. Marked for wiring into
character.js during SS-211 (Pack Two) and follow-up extension
SS-NEW (to be raised: RANDOM_PERSON_BANK slot type registry
across all characters).

**Rarity:** mode (a) once per session, mode (b) up to twice per
session, mode (c) once per campaign — saving the real-acquaintance
reveal for high-impact moments.

---

### Archetype #008 — "I Was There" With Graceful Retreat Ladder
**First captured via:** Bear Grylls (Rod's note on over-deployment), 2026-04-23
**Status:** LIVE
**Fits characters:** Bear (primary — the retreat is his specific
move), Faldo, Clarkson, Cox (with "I filmed there" frame),
Robin Williams, Jim Carrey, Gordon Lyons (lives at rungs 3-4
permanently)
**Does NOT fit:** McNab/Ryan/Billingham/Ollie (they WERE there —
no walk-back needed), Attenborough (wouldn't fabricate rung 1),
Mitchell (lives at rungs 4-5 permanently — no climb, no retreat).
**ANTI-FIT:** **Boycott.** He never retreats. Would die on rung 1.
Capturing his refusal-to-walk-back AS a character-defining pattern
(see below).

**Rod's verbatim instance (2026-04-23):**
> "Bear doesn't always talk memories tho or we are back to him
> always saying he was there (it works as a regular but not
> always, and we need to turn that into a pattern lab pattern too
> 'I was there...' either because he can;t have been in Romain
> Britain in person, or he then has to say 'Well I...' but that
> can also be played with as a pattern parameter of different
> strength - 'Well I walked the same path' 'Well I saw a tv
> documentary' 'Well, my mate Gary down the Red Lion said...' etc"

**The rarity rule (Rod's core point):** claiming "I was there" at
full strength ("I was in Roman Britain / the Boer War / medieval
Jarrow") is a regular Bear move but not the DEFAULT. If deployed
too often it becomes the Grylls/Salty-croc catchphrase trap. Cap:
once per session at full strength. Retreats deploy more freely but
each walk-back must start at a different rung.

**Abstract formula:**
```
[FULL-STRENGTH CLAIM] — "I was there"
  Delivered sincerely, with specifics where possible.
→ (triggered by: temporal impossibility / panel challenge /
   specificity probe / obvious contradiction):
[GRACEFUL RETREAT LADDER — descending strength rungs]:
   Rung 1 (strongest):   "Well I walked the same path"
   Rung 2:               "Well I've been to a place like it"
   Rung 3:               "Well I saw the documentary"
   Rung 4 (weakest):     "Well, my mate Gary down the Red Lion said..."
   Rung 5 (collapse):    silence / topic change / "Hydration?"

The comedy is the RETREAT, not the original claim. We watch
credibility shed rung by rung. Strong setup, weak punchline.
```

**Which definition of funny.** Primarily **character-reveal** —
the retreat shape is Bear-specific (confident claim → earnest
weaker claim → weaker still → pub-mate). Secondary **compression**
(entire credibility arc in four sentences).

**The dial.** The *pace* of retreat. Too-fast retreat (Rung 1 →
Rung 4 in one line) = obvious joke, breaks the character. Too-slow
(each retreat is a full sentence of protest) = loses the comedy.
Sweet spot: 1-2 rungs per challenge, with each rung delivered as
if it's still a credible claim.

**Parameter ladder (this archetype IS a ladder):**

| Rung | Label | Example | Plausibility |
|---|---|---|---|
| 1 | SAME PATH | "Well I walked the same path" | High (same location) |
| 2 | SIMILAR PLACE | "I've been somewhere like it" | Medium |
| 3 | DOCUMENTED | "I saw the documentary" | Low — indirect |
| 4 | PUB-MATE | "My mate Gary / an old squadron leader / a bloke I knew in Hereford said..." | Very low — second-hand, suspect mate |
| 5 | COLLAPSE | "Hydration?" / silence / topic change | Zero — abandons the claim entirely |

**Character parameterisations:**

### Bear (primary — full ladder, retreats gracefully)
| Slot | Pool |
|---|---|
| ORIGINAL CLAIM | "I was there in 2014" (when discussing Roman Britain) |
| RUNG 1 | "walked the same path", "camped on the same ground" |
| RUNG 2 | "been to Vindolanda — well, Housesteads" |
| RUNG 3 | "saw the Time Team episode" |
| RUNG 4 | "Gary at the Red Lion / my old CO / the Eurostar man" |
| RUNG 5 | "Hydration?" |

**Bear instance (with ladder firing under challenge):**
> Panel mentions Roman Britain.
> Bear: "I was there. 2014 reconnaissance. The Wall looks smaller in person."
> Mitchell: "In Roman Britain."
> Bear: "— well, I WALKED the same path. The Vindolanda stretch."
> Mitchell: "In Roman Britain."
> Bear: "— look, I've SEEN the documentary. Simon Schama's. I think. Or maybe the BBC one."
> Mitchell: [silence]
> Bear: "Gary at the Red Lion has a coin. Actual Roman coin. Gary said the legion was based —"
> Ray: "Bear."
> Bear: "— hydration?"

### Faldo
| Slot | Pool |
|---|---|
| ORIGINAL CLAIM | "I played there" |
| RUNG 1 | "commentated the year" |
| RUNG 2 | "walked the course in '05 for Sky" |
| RUNG 3 | "watched the replay" |
| RUNG 4 | "Norman told me about it / Langer mentioned it at dinner" |
| RUNG 5 | silence, adjusts grip |

### Clarkson
| Slot | Pool |
|---|---|
| ORIGINAL CLAIM | "I drove that" |
| RUNG 1 | "I was IN the car. Hammond was driving." |
| RUNG 2 | "I was on the production" |
| RUNG 3 | "I saw the cut" |
| RUNG 4 | "Richard told me about it over a pint" |
| RUNG 5 | "Where's Kaleb?" |

### Gordon Lyons (lives at Rungs 3–4 by default)
| Slot | Pool |
|---|---|
| ORIGINAL CLAIM | "I knew a fella who was there" (starts low) |
| (no rung 1 or 2 — doesn't claim first-hand) | |
| DEFAULT | "I knew a lad in Lisburn who was at Slieve Donard the week it happened" |

### Mitchell (lives at Rungs 4–5 permanently)
| Slot | Pool |
|---|---|
| ORIGINAL CLAIM | NEVER. "I'm not saying I was there, obviously —" |
| DEFAULT | "I have *heard* of the place, obviously. There's a very good Observer piece on it." |

---

#### Anti-fit: Boycott — the refusal to walk back

Boycott is the structural opposite of this archetype. He deploys
original-strength claims ("I was there") but **never retreats**
under challenge. The ladder doesn't fire. His response to
impossibility is denial, not walk-back. This is a character-
defining feature worth naming as its own pattern:

**`refuse_to_walk_back`** — high affinity, Boycott-specific.

When challenged: "Rubbish. I've been there. Wouldn't have happened
on my watch. Move on, pal."

He does not produce Rungs 2-5. He stays on Rung 1 and gets louder.
This pairs with his `not_on_my_watch` ego and his
`false_attribution_self_anecdote` (#004) — Boycott's whole
character refuses graceful retreat in any form.

For OTHER characters, the anti-fit would mean: "this character
escalates rather than retreats under challenge." Rarely funny —
usually just abrasive. Boycott is the exception because the
Yorkshire moral frame makes the refusal land.

**Wiring status:** Added to pattern-lab.md as Archetype #008.
Bear rarity rule ("I was there" = once per session at full
strength) added. Parameter-ladder meta-model extension captured
earlier in this file. Needs wiring into Bear's character file
(follow-up), Faldo/Clarkson parameterisations for SS-211 (Pack
Two), and Boycott's anti-fit pattern (`refuse_to_walk_back`) into
his character file.

---

### Principle: Signature Concern Rotation (2026-04-23, Rod)

Any character with **multiple signature expertise domains** must
rotate across them per deployment. Hammering one domain becomes
the Grylls/Borneo / Grylls/Salty-croc catchphrase trap — the
signature move devalues the more it fires.

Rod's verbatim (2026-04-23):
> "Bear in the app talks way too much about hydration - that is a
> pattern, and whilst hydration is key obvs, you have water, fire,
> shelter, food"

**Bear's signature concerns (canonical four):**
- **Water / Hydration** — "Hydration?", "Water source identified?", "Gone a bit dry"
- **Fire** — "Fire discipline?", "Fuel situation?", "Spark source?"
- **Shelter** — "Shelter sorted?", "Cover from the wind?", "Bivvy location?"
- **Food / Rations** — "Rations checked?", "Calories-in?", "Foraged anything?"

**The rotation rule:** per generation call, sample ONE survival-
concern callout from the full four-domain pool — not three from a
pool where half are water-related. Each deployment picks a
different domain than the previous one when memory allows.

**Generalisation beyond Bear:**
- Faldo: course management / swing mechanics / mental game /
  equipment — rotate, don't hammer grip pressure every line
- Cox: physics / cosmology / engineering / evolution — rotate
- Boycott: technique / discipline / Yorkshire / mother-rhubarb —
  HE ALREADY ROTATES (and he deploys each frequently, which is
  why the Rod-validated Boycott calibration lands — it doesn't
  feel hammered because the four concerns take turns)
- Clarkson: cars / farming / pub / Kaleb — rotate
- McNab/Ryan: regiment / Hereford / op history / specific
  operators — rotate

**Implementation shape for the Wall Walkers banks:** split the
current `closers` or `signature_callouts` pool into named
domain-scoped sub-pools; buildXVoiceBlock samples one per domain
per call OR one across the full rotation with a bias against
recently-used domains.

**Bear bank fix (live action item):**
Current state (cusslab/worker.js line ~78): `closers` pool has
`"Hydration?"` as 1/6 options, AND `non_sequiturs` has
`"speaking of, hydration?"` as another 1/6. With `pick(closers, 3)`
sampling, Hydration appears in ~50% of calls. That's why Rod sees
it so often.

Fix: remove `"Hydration?"` from closers; add a dedicated
`survival_concern_callouts` pool spanning water/fire/shelter/food
with ~2-3 variants each; `buildBearVoiceBlock` samples ONE per
call from the full pool. Net effect: hydration appears ~1/12
calls instead of 3/6. **Deployed in cusslab commit 0dffc2b,
2026-04-23.**

---

### Archetype #009 — The Analogy That Walks Into A Minefield
**First captured via:** Bear Grylls, 2026-04-23
**Status:** LIVE
**Fits characters:** Bear (primary carrier), Ron Atkinson (Cusslab —
PEAK REAL-WORLD FIT but handle with care), Bristow (era-register
carries unintended mines), Clarkson (fires the analogy, can't
exit), Robin Williams (chaotic — would pivot to a character voice).
**Does NOT fit:** Ray (doesn't volunteer analogies), Wade (factual,
no metaphor), Theroux (observer, not analogy-maker), Attenborough
(too careful), Cox (too warm — safer physics-adjacent metaphors),
Faldo (golf-specific, not culturally-loaded), Mitchell (catches
the error EARLIER than mid-sentence and abandons the whole
analogy).
**ANTI-FIT:** Boycott. His `refuse_to_walk_back` fires — he
doubles down via Yorkshire moral frame instead of retreating.

**Rod's verbatim instance (via Bear, 2026-04-23):**
> "'it's like trying to use a poncho to wrestle an eskimo....err I
> mean...'"

**Abstract formula:**
```
[CONFIDENT ANALOGY OPENER — "it's like trying to [X] to/with [Y]"]
  Tool/target pair confidently stated.
→ [THE ANALOGY GOES WRONG]:
   (a) CULTURAL MINEFIELD — outdated term, stereotype, era-
       inappropriate reference ("eskimo" — the specific mine)
   (b) IMPOSSIBLE COMBINATION — wrong tool for the task
       (exposes ignorance of the domain)
   (c) REVEALING — shows the speaker's worldview unflatteringly
→ [MID-SENTENCE REALISATION — "...err I mean..." /
   "...well, not 'eskimo' obviously..."]
  Catches it too late to rescue cleanly. The character HEARD
  themselves. Audience sees them hear themselves.
→ [NO CLEAN RECOVERY — one of four exits]:
   exit-a: trail off into silence
   exit-b: over-correct and make it worse
   exit-c: hard pivot to a different subject
   exit-d: double down hoping no-one noticed
```

**The engine.** Confidence → mid-sentence catch → failed rescue.
Three register-shifts in one sentence. The "err I mean..." is the
money shot — it tells the audience the character *heard
themselves*, which is both worse and funnier than if they'd
sailed on obliviously. They know. They're stuck. The poncho is
still in play.

**The dial.** The walk-back attempt itself.
- Too clean = no comedy ("err — I mean, Inuit. Sorry. Anyway.")
- Too long = becomes painful (full minute of apology)
- Sweet spot: **one "err I mean" + trail-off**. Panicked
  graceful abandonment.

**Which definition of funny.** Primarily **character-reveal**
(confident reach → fumble) + **compression** (whole
"out-of-date speaker" arc in one sentence) + **juxtaposition**
(two registers shift mid-sentence).

**Cousin archetypes.**
- #008 (I Was There retreat ladder) — retreating from a factual
  claim
- #005 (Visual Aid Derailment) — lost-thread after prop-grab
- #009 (this) — retreating from a cultural analogy
All three are retreat shapes. Different triggers, same abandonment
mechanic.

**Exit choice carries character information:**
- exit-a (trail off) = Bear under pressure, Faldo uncommitted
- exit-b (over-correct, worse) = Clarkson can't resist elaborating
- exit-c (hard pivot) = Bear survival-callout deflection —
  "anyway, hydration" — connects to signature concern rotation
- exit-d (double down) = Boycott anti-fit refusal, Bristow era-
  register, Ron Atkinson

**Character parameterisations:**

### Bear (primary)
| Slot | Pool |
|---|---|
| ANALOGY OPENER | "it's like trying to [X] to/with [Y]" |
| TOOL | poncho, paracord, hexi-block, bush knife, hyperbaric chamber |
| TARGET | specific-but-problematic — cultural-ish, era-ish (keep cautious) |
| REALISATION CUE | "err I mean...", "well, sorry, not —", "oh, that's —" |
| EXIT | exit-a (trail off) or exit-c (pivot to signature concern rotation) |

**Bear instance (sketch):**
> "It's like trying to use a poncho to wrestle — well, a large
> animal, say — err, I mean — [*trails off*] — speaking of, fire
> discipline? Got a spark source?"

### Ron Atkinson (Cusslab — handle with care)
| Slot | Pool |
|---|---|
| ANALOGY OPENER | "It's a bit like..." / "You've got to look at this like..." |
| TOOL/TARGET | era-register sport clichés that have aged badly |
| REALISATION CUE | "little eyebrows" energy — noticing heat without quite knowing why |
| EXIT | exit-d (double down, pretends not to notice) |

**Important handling note for Ron Atkinson:** the archetype fires
because he IS this pattern in real life (his sacking was this).
Authenticity requires the register; decency requires that the
specific real-world incident not be reproduced or referenced.
Mine the register without recreating the crime. Stay in
football-cliché adjacency — spatial metaphors, crowd references,
manager-speak — and let the realisation-cue land without
re-running the offensive content itself.

### Clarkson (exit-b — over-correct, worse)
| Slot | Pool |
|---|---|
| ANALOGY OPENER | "It's like driving a —" |
| TOOL/TARGET | car comparisons that spiral into era-inappropriate territory |
| REALISATION | no mid-sentence catch — the over-correction IS the realisation |
| EXIT | exit-b — keeps talking, makes it worse |

**Clarkson instance (sketch):**
> "It's like trying to drive a SKODA in — well — in a place
> where they don't really have roads. Which is most of — NO, sorry,
> I KNOW, that's — that's patronising — what I MEANT was that
> Skodas are bad cars, which is — also — which isn't the — where's
> Kaleb."

### Mitchell (anti-fit on the mid-sentence catch — catches EARLIER)
| Slot | Pool |
|---|---|
| ANALOGY OPENER | "I suppose it's a little like —" |
| REALISATION | PRE-SENTENCE, catches before uttering |
| EXIT | abandonment — refuses to complete the analogy |

**Mitchell instance (sketch):**
> "I suppose it's a little like — no, actually, I'm not going to
> finish that one. I could see where it was going and I don't
> think any of us want to be there. Scrap it. Next."

### Boycott (full anti-fit — doesn't walk back)
| Slot | Pool |
|---|---|
| ANALOGY OPENER | same register |
| REALISATION | registers no alarm |
| EXIT | exit-d, Yorkshire-moral double-down |

**Boycott instance (sketch):**
> "It's like trying to bat without a bat. Doesn't matter where
> they're from, pal — not from Yorkshire, either of 'em, the
> Eskimo or the poncho. Different thing entirely. Village green
> stuff."

**Bear bank addition (mannerism):**
New mannerism pool for Bear (and Clarkson, Ron Atkinson) — the
**realisation-cue phrases**:
- "err I mean..."
- "well, not —"
- "oh, that's —"
- "sorry, I — sorry —"
- "obviously not literally —"
- "not in — not in that way obviously —"

These are the mid-sentence catch. Deploy with care — one per
scene maximum. Over-deployment becomes verbal tic.

**Wiring status:** Pattern added to pattern-lab.md. Cusslab Bear
bank needs extension (realisation-cue pool). Ron Atkinson cross-
character variant is a Cusslab-side integration, not immediate SS
concern. Rarity: **once per session max** for Bear on Archetype
#009 — the archetype's power depends on its rarity. If it fires
twice in a session it becomes the pattern rather than the
incident.

---

### Cross-reference: the retreat family

Archetypes #008, #005, and #009 are a related family, all
about characters exiting an over-committed moment.

|  | Over-commitment type | Walk-back mechanism |
|---|---|---|
| #005 | Visual aid + teaching | Lost-thread derailment |
| #008 | Factual first-person claim | Strength-rung retreat ladder |
| #009 | Cultural/metaphorical analogy | Mid-sentence realisation + failed rescue |

Characters tend to have coherent carriage across the family —
if a character fires #009's exit-a (trail off), they likely fire
#008's rung-5 collapse ("Hydration?" topic change). Bear is the
canonical carrier of all three retreat shapes. Boycott is the
canonical anti-fit for all three — his
`refuse_to_walk_back` is the structural opposite.

---

#### Sub-pattern #009-a — The Cornered Dig-In (Entrenchment Under Challenge)

Rod verbatim (2026-04-23):
> "Or when they get backed a bit into a corner with their bad
> examples, but decide to dig in that would be good"

**When character is challenged on a bad example/analogy, instead
of walking back (exits a-c of #009), they entrench.** The core
retreat family cousin: same trigger as #009, inverted response.

Shape:
```
[ORIGINAL FLAWED CLAIM/ANALOGY — fired at full confidence]
→ [CHALLENGE — panel member pushes back, raises eyebrow, says "mate..."]
→ [DIG-IN RESPONSE — one of]:
   - Escalate the claim ("AND ANOTHER THING —")
   - Shift blame to challenger ("typical of you — can't take a
     direct comparison")
   - Moralise about modern life ("the problem with this generation —")
   - Attack political correctness ("you can't say anything any more")
   - Invoke authority ("I've been doing this 40 years, pal")
   - Yorkshire-moral dismissal ("not from round these parts, are they")
→ [NO RESOLUTION — scene moves on with tension unresolved, or
   challenger gives up visibly]
```

**Character fits:**
- **Boycott (canonical)** — already named `refuse_to_walk_back`.
  Yorkshire-moral dismissal is his default dig-in shape.
- **Clarkson** — PC-escalation flavour ("you can't say anything
  these days") + louder-volume double-down.
- **Bristow** — "leave it out, son" + era-register entrenchment.
- **Ron Atkinson** — doubles down on era cliché, acts wounded
  that anyone objected.
- **Keane** — digs in via contempt not escalation. "Is that
  supposed to be a problem?" Silent stare.

**Anti-fits:**
- **Bear** — usually retreats; dig-in feels false for him
  (exception: SAS credentials challenged → "I served, mate,"
  once, then pivot)
- **Mitchell** — catastrophic admission spiral; cannot dig in
- **Theroux** — doesn't dig in; asks another question
- **Cox** — doesn't register the challenge as a challenge

**Comedy engine.** The gap between the obvious indefensibility
of the original claim and the speaker's confidence in defending
it. This is pure character-reveal. Escalates the panel tension
in multi-round scenes.

**Dial.** The dig-in VERB.
- Mild escalation ("well, I think it's fine") = weak comedy
- Full moralise ("the problem with this generation —") =
  Rod-gold, if it fits the era-register
- Attack-the-challenger ("typical of you") = high-tension
- Silent-contempt stare = Keane-register, works when paired
  with a verbose opponent

**Pairs with Archetype #008 (I Was There retreat) as the
opposite shape.** Some characters walk down the ladder, some
refuse the ladder. Character file `pattern_affinity.refuse_to_
walk_back` vs `claim_strength_ladder` should be mutually
exclusive — a character is one or the other at their core.

---

### Archetype #010 — Expert-Register Deployed Against Innocuous Target With Total Commitment
**First captured via:** research into Rod's Partridge reference, 2026-04-23
**Reference scene:** Mid-Morning Matters with Alan Partridge,
"Tora Bora Alan" (2011). Ex-special-forces "Tommy Gaskell" walks
Alan through clearing a cave of "neo-fundamentalist RSPB
insurgents radicalised by Bill Oddie" at Wookey Hole — signature
line "the neck opens up like a Muppet's mouth," Alan later
reassures a child caller that "no muppets were hurt, he simply
dispatched some terrorists from a radicalised RSPB in Wookey
Hole."
**Status:** LIVE
**Fits characters:** Fox (PRIMARY — his tactical register IS this,
already deployed in Legends against ghosts/werewolves but
under-formalised), Bear (chaotic cousin — urine-bait-for-ghosts
SAS-manual claim), McNab (dry report register), Ryan (operational
calm), possibly Clarkson (car-engineering gravitas applied to
innocuous).
**Does NOT fit:** Mitchell (cannot maintain straight face),
Theroux (would ask questions instead), Cox (too warm, too
genuine), Attenborough (observer register, not tactical),
Boycott (different register entirely — cricket-frame rather
than tactical-frame), Mears (silent, doesn't brief), Wade (too
factual).

**Abstract formula:**
```
[EXPERT REGISTER ASSUMED — tactical/military/operational
 briefing format adopted without preamble]
  "standard extraction protocol", "lines of sight",
  "the neck opens up like a Muppet's mouth"
→ [TARGET — ostensibly innocuous real-world figure, organisation,
   or location reframed as serious threat]
  Bill Oddie, RSPB, a local wildlife trust, a garden centre,
  a WI chapter, the British Trust for Ornithology
→ [GRAPHIC OR TECHNICAL DETAIL delivered flat, no concession
   to absurdity]
  The character does not wink. They are not joking. The
  register is indistinguishable from genuine expert briefing.
→ [THIRD-PARTY SOFTENING — someone on the scene worries about
   the wrong thing, confirming they've entirely missed the
   register]
  Alan worried about muppets (not violence). A panel member
  asks whether the wildlife trust had been given warning.
```

**The four non-negotiables:**
1. **Total commitment.** The character plays it completely
   straight. No comedy-aware wink. The register matches genuine
   tactical briefing.
2. **Innocuous target.** The target must be real-world and
   genuinely innocuous — Bill Oddie, the Women's Institute, a
   pub quiz team, the Chelsea Flower Show. Fictional or violent
   targets break the pattern.
3. **Graphic/technical register.** The violence or technical
   detail must be specific and flat. "Neck opens up like a
   Muppet's mouth" is the benchmark: visceral + specific +
   Monty-Python-adjacent metaphor delivered as operational
   terminology.
4. **Third-party missed-register pivot.** Someone else in the
   scene worries about the wrong thing. This IS the
   confirmation that the archetype fired — the pivot shows the
   register-mismatch landing on someone inside the scene, not
   just the audience.

**Which definition of funny.** **Juxtaposition** primary — expert
register vs innocuous target. Secondary **compression** (full
military scene compressed into a sentence). Secondary
**character-reveal** — only certain characters carry total-
straight-face expert-register.

**The dial.** The target's INNOCUOUSNESS. Too harmless (a
specific baby) = too dark. Too-threat-adjacent (a protest group)
= the register becomes plausible, loses absurdity. Sweet spot:
**a real-world figure or organisation famous for being
gentle/wholesome/harmless** — Bill Oddie, David Attenborough,
Mary Berry, the RSPB, the WI, a specific quiz team, the Bake
Off crew.

**Character parameterisations:**

### Fox (primary — his existing Legends register formalised)
| Slot | Pool |
|---|---|
| EXPERT REGISTER | tactical briefing, cover/concealment, extraction protocols, RV points |
| INNOCUOUS TARGET | RSPB, National Trust, WI, Bake Off crew, Chris Packham's camera team |
| GRAPHIC DETAIL | specific-but-operational violence phrasing |
| THIRD-PARTY PIVOT | Alan-type worried-about-the-wrong-thing response |

**Fox instance (sketch — Wall Walkers Legends extension):**
> "Right so — if the RSPB had been operating from Wookey Hole,
> standard extraction is a two-team flank. Front and dorsal. You
> want to cut off the egress — the cave has three natural
> chokepoints — and you neutralise the central cluster before
> they can fragment. Minimum collateral."
> [Bear: "Packham wasn't actually there, was he?"]
> [Fox: "Not in my scenario. But yeah. Could've been."]

### Bear (chaotic cousin — existing ghost-urine register)
Already fires this in current Legends output. Formalisation here
strengthens the pattern: Bear's version is looser (he cites the
SAS manual for ghost-urine-bait), Fox's is clean operational.

### McNab (dry report register)
| Slot | Pool |
|---|---|
| EXPERT REGISTER | operational report format, "was on the ground", timings |
| INNOCUOUS TARGET | similar pool |
| DELIVERY | flat. No upspeak. No dramatic beats. |

**McNab instance (sketch):**
> "If the Women's Institute had been insurgents — hypothetical —
> at Wookey Hole — the extraction would have been bloody. Two of
> my regiment would have gone in through the tourist entrance.
> One through the gift shop. That's what the training is for."

### Clarkson (car-engineering gravitas variant)
Applies motoring-journalist seriousness to innocuous targets.
"The Chelsea Flower Show is, fundamentally, a LOGISTICS problem
— you've got fourteen thousand visitors per day, approach routes
constrained by the Embankment, the Royal Hospital gardens have a
SINGLE egress point — it's a tactical NIGHTMARE, Kaleb."

**Wiring status:** Pattern added. Fox's existing Legends tactical
register is already this archetype partially — the rebuild just
needs the **third-party missed-register pivot** added as a
rendering note (a panel member reacts to the wrong part of the
briefing, confirming the register-mismatch lands in-scene).
Links to SS-216 (per-round state display) — other panel
members' reactions to expert-register become renderable state.

**Rarity:** once per scene for Fox, once per session for Bear's
cousin version. The archetype's power depends on the rest of
the panel's straight-faced reception. Over-deployment makes the
register performative.

Sources for research on the Partridge scene:
- [Alan Partridge, Bill Oddie & RSPB Terrorism (YouTube)](https://www.youtube.com/watch?v=9_xCZHC83qk)
- ["Mid Morning Matters with Alan Partridge" Tora Bora Alan (IMDb)](https://www.imdb.com/title/tt1927617/movieconnections/)
- [Mid Morning Matters: Alan Partridge on the RSPB and Bill Oddie (YouTube)](https://www.youtube.com/watch?v=KfY_7jPCfdQ)
- [Like a Muppet's Mouth — Mid Morning Matters / Baby Cow (YouTube)](https://www.youtube.com/watch?v=kYE2h-2BABU)

---

### Archetype #011 — Anthropological Rationalisation of Personal Indignity
**First captured via:** Ray Mears, 2026-04-23
**Status:** LIVE
**Fits characters:** Ray Mears (PRIMARY — his bushcraft-anthropology
register is the canonical carrier), Les Hiddins (bush tucker man
equivalent), Cody Lundin (barefoot-ancestral analogue), Bruce Lee
(martial-philosophy analogue, rarer), Jeremy Wade (fish-
investigation frame, rare).
**Does NOT fit:** Bear (different rescue shape — SAS-manual
rationalisation, Archetype #010 cousin), Fox (tactical-briefing
rescue, #010), Clarkson (car-comparison rescue), Mitchell (admits
immediately, cannot rationalise), Theroux (would ask questions
about his own behaviour), Attenborough (observer, does not
self-rationalise), Boycott (Yorkshire-moral rescue — different
frame, same structure).
**ANTI-FIT (structural):** any character without a cultural-authority
register to retreat into.

**Rod's verbatim instance (via Ray Mears, 2026-04-23):**
> "Ray Mears caught masturbating off camera into a dried up ravine
> tries to explain it away as something the tribal people of this
> area have done for tens of thousands of years as a 'rain dance'
> of sorts"

**Abstract formula:**
```
[CAUGHT IN COMPROMISING / UNDIGNIFIED / PRIVATE ACT]
  Public witness required. Alone doesn't fire the archetype.
→ [ASSUME AUTHORITATIVE TEACHING REGISTER — no acknowledgement
   of the compromise]
  Voice drops half-octave, measured, educational cadence adopted.
→ [INVOKE TRIBAL / ANCIENT / INDIGENOUS PRACTICE as frame]
  "The X people have done this for [implausibly long period]"
  "In [remote region], this is how they [euphemism]"
  "You'll find this practice across [broad geographic sweep]"
→ [REFRAME THE ACT AS RITUAL / CULTURAL WISDOM]
  "a rain dance of sorts"
  "a form of communion with the land"
  "an ancestral practice linking [body thing] and [land thing]"
  "what our ancestors would have understood as [invented term]"
→ [COMMIT TO THE LIE — earnest, zero concession to absurdity,
   full teaching posture]
  Ray will sketch a diagram if allowed to.
```

**The key distinguishing move:** the ESCAPE is into *authority*,
not into silence. The character uses their genuine expertise
(bushcraft / anthropology / martial philosophy) as a shield. The
expertise is real; its application to the compromising act is
fabricated on the fly. The audience can't easily rebut because
the register is indistinguishable from genuine teaching.

**The comedy engine.** Three-layer compression: banal indignity →
serious anthropological frame → specific implausible attribution
to real peoples. The third layer — naming actual tribal peoples
as the authority for the invented practice — is what makes it
land AND what makes it uncomfortable. The character is willing
to throw real cultures under the bus to rescue themselves.

**Which definition of funny.** Primarily **character-reveal** — the
specific rescue-frame is Ray's register. Secondary **compression**
(banal act → cosmological frame) and **juxtaposition** (teaching
voice → undignified context).

**Dial.** The specificity of the invoked tradition. Vague
("some ancient peoples") = weak. Medium-specific ("the Yanomami,
broadly") = medium. Full-specific ("the Walpiri of central
Australia, specifically the northern group near Yuendumu") =
Rod-gold but tips into genuine offence territory if not handled
carefully. Sweet spot: **specific enough to sound authoritative,
vague enough to be plausibly deniable** — "the Aboriginal
peoples of this region", "tribes across the Kimberley",
"practitioners of bushcraft across the southern hemisphere."

**Handle-with-care note.** This archetype mines real-world
cultures as comedy infrastructure. Executed well, the joke is
AT THE CHARACTER'S EXPENSE — Ray is the idiot for claiming the
tradition, not the tradition itself. Executed poorly, the joke
becomes at the culture's expense. The distinction:
- **Good:** Ray's attribution is absurd on the face of it. The
  implausibility of the "rain dance" framing is the signal that
  he's fabricating. Cultures are dignified; Ray is undignified.
- **Bad:** the actual practice gets mocked, or the "tribal
  people" are positioned as gullible, primitive, or foolish.
  Never do this.

Keep the comedy on the character's fabrication, not the culture.

**Sibling archetype: the EXPERTISE RESCUE family.** Every
character has a domain they retreat to under threat. Formalising:

| Character | Rescue frame |
|---|---|
| Ray Mears | Anthropological-bushcraft ("the X people have always...") |
| Les Hiddins | Bush tucker authority ("in the outback, you see this...") |
| Cody Lundin | Barefoot-ancestral ("feet-on-earth is older than civilisation...") |
| Bear | SAS-manual ("this is in the SAS survival guide — page...") |
| Fox | Tactical ("standard extraction protocol...") |
| McNab | Operational report ("was on the ground — timing was...") |
| Clarkson | Automotive ("it's the equivalent of a Skoda...") |
| Cox | Physics ("interestingly, thermodynamically...") |
| Faldo | Golf ("it's like the 14th at Augusta...") |
| Boycott | Yorkshire-cricket-moral ("in my day, pal...") |
| Mitchell | Cannot rescue — admits immediately |

This is a character dimension that modulates Archetype #011
(and many others). Each character's rescue frame IS their
pattern_affinity bias. When challenged or compromised, they
retreat into the frame listed above. Boycott's
`refuse_to_walk_back` fires from this bias. Mitchell's
inability to rescue fires from his honesty.

**Character parameterisations:**

### Ray Mears (primary)
| Slot | Pool |
|---|---|
| INDIGNITY | (context-driven — sampled from scene) |
| CULTURAL AUTHORITY | "the Aboriginal peoples of this region", "Inuit elders I've met", "tribal practitioners across the southern hemisphere", "the San of the Kalahari", "indigenous bushcraft tradition" |
| DURATION | "tens of thousands of years", "since before the ice retreated", "longer than written history records" |
| RITUAL FRAME | "a form of rain communion", "land-calling", "the dry-season invocation", "a practice deeply rooted in their connection to the water cycle" |
| COMMITMENT CUE | sketches a diagram, adopts his TV-teaching voice, moves to a different position to demonstrate |

**Ray instance (sketch):**
> "What you're observing is — and this is poorly documented in
> Western anthropology, deliberately — a practice common to the
> peoples of the Kimberley for tens of thousands of years. They
> call it, broadly, a land-calling. It's a ritual response to
> prolonged dry conditions. Read [*any book we won't name*]
> for the formal account. You can see the specific physical
> orientation — east-facing, into the ravine — mirrors the
> ancestral path of the wet season's first rains. I'm not —
> I wouldn't have attempted the full version, obviously, we're
> only two days into the dry. But a short invocation, yes.
> Common practice. Widespread."

### Les Hiddins (bush tucker variant)
| Slot | Pool |
|---|---|
| CULTURAL AUTHORITY | "Aboriginal people up north", "Top End tribes", "blokes out in the gulf country" |
| DURATION | "forty thousand years", "longer than we've been recording" |
| RITUAL FRAME | "a welcome to the dry", "standard bush practice", "you do this when you've been on the land a while" |

**Les instance (sketch — maximum two sentences):**
> "Aboriginal people up north have done that for forty thousand
> years. Rain dance, they call it. Nothing strange about it."

### Cody Lundin (barefoot-ancestral variant)
| Slot | Pool |
|---|---|
| CULTURAL AUTHORITY | "ancestral humans", "the original barefoot peoples", "pre-agricultural societies" |
| RITUAL FRAME | "grounding ritual", "feet-to-earth communion", "a practice connecting the human body to the soil electromagnetically" |
| COMMITMENT | usually involves removing footwear |

**Wiring status:** Pattern added. Bank of rescue-frames across
the full character roster sketched as sibling concept — needs
formalising as a `RESCUE_FRAME` slot-type on every character
(follow-up for SS-219). Rarity: once per campaign — the
archetype's power depends on rarity. Over-deployment makes the
character's rescue-frame feel performative. Also gated on
threshold: the character must actually be compromised / caught /
challenged. Firing pre-emptively doesn't work.

---

### Archetype #003 — Cross-Character Phrase Echo (the panel callback)
**First captured via:** Rod's instruction for Boycott, 2026-04-22
**Status:** LIVE
**Fits:** any character pair; triggers when a memorable signature
phrase has landed in a prior round
**Mechanic type:** panel-dynamics (Lever 3 extension), not a
character-standalone archetype

**Rod's verbatim instances (2026-04-22):**
> "maybe also other panel members could reference someone elses
> quote 'as you said Geoffrey, back in the hutch'"

> "but also get it wron sometimes too 'as you said Geoffrey, back
> of the crotch' etc - thats a pattern too for pattern lab"

**The mechanic.** When one panel member has deployed a memorable
signature phrase, other panel members can echo it back within the
next round or two. Four flavours, differentiated by fidelity:

#### Flavour A — Faithful echo
The phrase is quoted accurately, attributed, deployed in agreement.
```
"As you said, [Character] — [exact phrase]."
```
> "As you said, Geoffrey — back in the hutch."

Use: agreement / rapport / building consensus around a verdict.
Register: sincere.

#### Flavour B — Character-styled echo (translation)
The phrase is acknowledged, then translated into the echoing
character's own expertise-frame idiom.
```
"As [Character] says, [exact phrase] — though for my money it's
more of a [own-frame equivalent]."
```
> "As Geoff says, BACK IN THE HUTCH — though for my money it's
> more of a DNF, isn't it." (Clarkson)
> "As you'd have it, Geoffrey — back in the hutch. Though I'd
> call it missing the cut." (Faldo)
> "As Mr Boycott — well — the hutch, yes. Though technically,
> grammatically, it's more — I don't know. Sorry." (Mitchell)
> "And... mm... back in the hutch, was he? Is that — is that
> the right idiom, Geoffrey?" (Theroux — pattern becomes
> repeat-back-as-question, his signature)

Use: character-voicing each recognises the phrase but routes it
through their own frame. Highlights the pattern-lab architecture.

#### Flavour C — Misquoted echo (plausibly wrong)
The phrase is remembered imperfectly. Attribution intact, content
drifted. Ties directly into **SS-212 (mis-quoting attribute)**.
```
"Like [Character] said — [plausible misremembering]."
```
> "Like Geoffrey says, back in the kennel."
> "As Boycott put it — back in the shed, back in the barn, one
> of those."

Use: the mis-rememberer is themselves unreliable (Clarkson, Jim
Carrey, Robin Williams), OR memory has been corrupted by rounds
of tension. Rod's favourite mechanic per
`feedback_character_comedy`.

#### Flavour D — Mangled echo (phonetic corruption)
Phrase is echoed with phonetic near-neighbour substitution,
producing absurd or filthy nonsense. Attribution intact.
```
"As you said, [Character] — [phonetically-adjacent corruption]."
```
> "As you said, Geoffrey — back of the crotch." (Rod's example)
> "Like Geoffrey said, back in the butch."
> "Back in the hatch, was it?"
> "Back in the stutch, you said."
> "Back in the hitch."

Use: high-chaos characters (Carrey, Robin Williams, Clarkson when
drunk, Bristow), OR deliberate misdirection from a character who
knows what they're doing (Theroux, rarely — he'd only do this if
the original phrase merited it). Works ONLY when the original
phrase is recent enough that the audience remembers the correct
version — the corruption is perceived as corruption.

**Boycott's reaction to corruption (Flavours C and D)** is its own
comedy engine:
> "Hutch, pal. HUTCH. Not kennel. Kennel's for a dog."
> "Crotch? CROTCH? Get out. Get OUT."
> "You what? You WHAT? It's hutch. As in the pavilion. Where you
> go when you're out, pal. Rubbish."

The reaction is scathing, period-register, Yorkshire-moral —
i.e. perfect Boycott (see calibration point in his character
file). Character responding to their signature-phrase being
mangled is a set-piece.

**Wiring status:**
- Mechanism noted in Boycott's file (signature_dismissal_idioms
  pool) as high-frequency deployment material.
- Echo-callback mechanic cross-references Lever 3 of
  `leanspirited-standards/standards/panel-voice-principles.md`
  (Interaction Schema → `reacts_to` field). Proposed extension:
  `reacts_to.register` gains values `echo_faithful`,
  `echo_styled`, `echo_misquote`, `echo_mangled`, each
  optionally with `phrase` and `correction` fields.
- Feeds SS-212 (mis-quoting attribute). When a phrase has been
  used in a prior round, the `echo_misquote` and `echo_mangled`
  flavours are candidate corruptions.

**The 5-second rule for echo timing.** An echo must be deployed
within 1–2 rounds of the original. Beyond that, the audience no
longer remembers the phrase clearly and the callback fails. If a
phrase is important enough to callback 3+ rounds later, it has
become a recurring character signature (like Bear's "Hydration?")
and should be treated as a mannerism, not an archetype callback.

---

## Ledger template (copy per new pattern)

### Pattern #NNN — pattern_name
**Character:** [name]
**Date captured:** YYYY-MM-DD
**Status:** LIVE / EVOLVING / DEPRECATED

**Rod's verbatim instance:**
> "..."

**Formula:**
```
[stage 1 — with slot labels]
[stage 2 — with slot labels]
...
```

**Slots:**
| Slot | Type | Samples |
|---|---|---|
| ... | ... | ... |

**Claude's analysis:**
- Why it works
- Which definition of funny
- Why it might not land
- The dial / the knob (the one variable that controls the comedy)
- How it could be funnier

**Variant samples:**
> "..."
> "..."

**Wiring status:** [which character file / which section updated]
