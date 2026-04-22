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
