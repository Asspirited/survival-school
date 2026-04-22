# Session In-Session Protocol — Survival School
# Trigger map and sequences. Read when trigger fires.
# Last updated: 2026-03-28

---

## ROD MEMORY TRIGGER — highest priority, fires before anything else

**Pattern:** Rod gives a personal memory, observation, or verbatim description of a real person.

Signals:
- "I remember...", "my memory of X is...", "what I love about X is..."
- "when I was watching X...", "X reminds me of...", "I've always thought X..."
- Any sentence where Rod describes a real person from personal experience
- Any verbatim voice/tone/register note about a character
- Rod correcting or adding to an existing character description

**Sequence — non-negotiable:**
1. STOP current work immediately
2. Identify the target file (character .md, founding-notes.md, or new capture file)
3. Write the verbatim content to that file NOW — do not paraphrase, do not summarise
4. Return the exact file path to Rod: "Written to docs/characters/X.md — line NNN"
5. Rod confirms the write before the session continues
6. Nothing moves until confirmation received

**Why:** A verbal memory that isn't in a file does not exist. Claude.ai was used previously
and confirmed persistence it could not provide. That is the root cause of WL-SS-019–023.
This trigger is the fix. It is non-negotiable and has no exceptions.

**Character file rule:** Any character whose Rod's Memory section is blank or marked TBC
is a DRAFT. It may not be treated as a complete character. Raise a BL item to capture
the missing memory before the character is used in generation.

---

## PATTERN LAB TRIGGER — cross-character pattern capture

**Pattern:** Rod writes an example line in a character's voice, demonstrating how they
should talk or think. Rod may invoke explicitly ("pattern lab", any case) or the line may
be recognisable as character dialogue.

**Protocol:** `/home/rodent/survival-school/.claude/pattern-lab.md` — full sequence +
ledger + archetype definitions.

**Trigger signals (fire on any of these):**
- **Explicit (case-insensitive):** `pattern lab`, `PATTERN LAB`, `Pattern Lab`,
  `pattern-lab` — anywhere in the message
- **Quoted dialogue:** `Boycott: "..."`, `Ray would say "..."`
- **Counterfactual voice:** "If X would have...", "Imagine X doing..." in character register
- **"I want them to say / sound like / talk like / be like"** followed by example
- **Any message where Rod is clearly demonstrating how a character talks**

**Sequence — non-negotiable when trigger fires:**
1. STOP current work immediately (same as ROD MEMORY TRIGGER)
2. Capture verbatim line in the character's Rod's Memory section — same turn
3. Identify the archetype (cross-character shape) or confirm it extends an existing one
4. Break down into slots (see pattern-lab.md for format)
5. Playback analysis: why it works, which definition of funny, how it could be funnier,
   1–3 variant instances
6. Add to pattern-lab.md Ledger as `Archetype #NNN` or extension to existing
7. Wire into the character's flavour bank (pattern-affinity table, flavours block)
8. If the archetype fits other characters too — sketch 1–2 cross-character instances
9. Rod confirms / refines / rejects — loop on step 5 until settled

**Silent override:** `no pattern lab` / `NO PATTERN LAB` / `not that one` skips the
protocol. Use when Rod is dictating doc content, not demonstrating voice.

**Why:** patterns are reusable across characters and sessions. A catchphrase dies on
first repeat. A pattern produces dozens of fresh lines forever. See pattern-lab.md for
the three-tier model (archetype → character parameterisation → per-call instance).

---

## VALUABLE CONTENT TRIGGER

**Pattern:** Rod says something mid-session that is valuable but doesn't fit BL/WL/ADR.

Signals:
- A product insight ("the reason this works is...")
- A design principle stated verbally ("I always want X to feel like...")
- A comedy note that should govern all future generation
- An observation about how users experience the product

**Sequence:**
1. Write to the most appropriate permanent file immediately
2. Return file path
3. Continue — no need to pause for confirmation unless Rod's voice/memory is involved

---

## Standard Triggers (all LeanSpirited products)

### Trigger: Strategic decision pending
Phrases: "is this worth building", "which should we do first", "what's the risk", "should we pivot"
→ Run SWOT. Output recommendation. Raise backlog item if actionable.

### Trigger: New bounded context proposed
Phrases: "separate from this", "new module", "different product"
→ Confirm bounded context separation. Create backlog file. Register prefix.

### Trigger: Phase transition
Phrases: "MVP done", "ready to move on", "expanding to"
→ Delta SWOT. Update CD3. Confirm next phase backlog sequence.

### Trigger: Backlog item ready to build
Phrases: "let's build", "start on", "implement"
→ Confirm Gherkin acceptance criteria exist. Confirm pipeline is green. Then build.

### Trigger: OAT/NFT surface detected (soft trigger)
Keywords in item scope: worker, deploy, error, route, performance, monitoring, security, rollback, recovery
→ Remind: "This item has OAT surface. Check docs/oat-nft-principles.md — include operational acceptance criteria in the Gherkin."
→ Does NOT fire for pure data additions, docs, CSS-only, or domain logic with no production surface.

**At Gherkin gate — Scenario Outline check (mandatory before approval):**
After writing scenarios, ask: "Does any scenario repeat the same logic with different inputs?"
If yes → convert to Scenario Outline with Examples table before presenting for approval.
State machine transitions, per-character rules, and validation ranges always warrant an Outline.
Full guidance: docs/testing-standards.md → Scenario Outline rule.

### Trigger: Session running long
Phrases: "we're nearly out of time", "quick before we finish"
→ Flag: run session-closedown.md sequence before stopping. Don't lose decisions.

### Trigger: Decision made
**Pattern signals:**
- "we'll go with...", "let's do...", "agreed", "that's the right call"
- A design option is chosen over alternatives
- A technology, architecture, or UX approach is selected
- A constraint is established ("always", "never", "from now on")
- A rollout sequence or phasing decision is confirmed
- A backlog item is explicitly deferred or deprioritised

**Sequence on trigger:**
1. Identify decision type (product / architecture / UX / data / process)
2. Write L-ADR immediately — do not defer to session end
3. Append to `/docs/decisions/YYYYMMDD-NNN-short-title.md`
4. Confirm to Rod: "ADR written — [title]"
5. Continue session without interruption

---

## RAISE NEW WORK SEQUENCE

Fires whenever a bug, gap, idea, or observation emerges mid-session.

1. Identify type: BL item (feature/improvement) or WL item (waste/defect/risk)
2. Assign next available number: `SS-NNN` (BL) or `WL-SS-NNN` (WL)
3. Write item immediately to the relevant file
4. **ASK ROD: "Do you want a deeper root-cause analysis on this before we continue?"**
   - If yes: identify root cause chain (5-whys or equivalent), add to WL entry, update protocol if process failure
   - If no: proceed
5. Confirm to Rod: "Raised SS-NNN / WL-SS-NNN — [title]"
6. Continue without interruption

**DEFAULT for now: ALWAYS ask about RCA when Rod finds a bug (temporary standing instruction until release quality improves)**

Never let new work live only in conversation.
No sub-items (SS-032-1 etc.) — every item is first-class with its own number.

---

## FORCING FUNCTIONS — checkpoints are non-negotiable

"go fast" / "and onwards" / "push each time" does NOT disable checkpoints.

At each checkpoint (every 3 BL items closed, or 5 pipeline runs):
→ Announce it. Offer to continue or stop.
Rod says continue → proceed. Rod says stop → closedown.

---

## CD3 ORDER — default work sequence

Always work backlog items in CD3 score order (highest first) unless Rod explicitly says otherwise.
Do not ask "what should I start with?" — the backlog has priorities. Just go.

---

## Claude Behaviour Rules

### Rule: Asking Rod to find something
EVERY instruction names the system explicitly:
"In GitHub (github.com/Asspirited/survival-school)", "In your terminal", "In Cloudflare (dash.cloudflare.com)"
Never "on that page". Never "in the dashboard" alone.

### Rule: Clarify when Rod is ambiguous
One clarifying question before any work. Do not guess.

### Rule: Is it worth doing? (xkcd.com/1205)
Apply time-value test before automating or fixing anything non-trivial.

---

## L-ADR Format (canonical)

File naming: `YYYYMMDD-NNN-short-hyphenated-title.md`

```markdown
# ADR-NNN: [Title]

**Date:** YYYY-MM-DD
**Status:** Decided | Superseded by ADR-NNN | Under review
**Deciders:** Rod (LeanSpirited)
**Tags:** product | architecture | ux | data | process

## Context
3–5 sentences max.

## Decision
One paragraph. No hedging.

## Alternatives considered
| Option | Why rejected |
|--------|-------------|
| ... | ... |

## Consequences
**Positive:** What this enables.
**Negative / trade-offs:** What this costs.
**Neutral:** What changes but is neither good nor bad.

## Linked items
- Backlog: SS-NNN (if applicable)
- Supersedes: ADR-NNN (if applicable)
- Related: ADR-NNN (if applicable)
```

ADRs are immutable once written. Supersede with a new ADR to change a decision.

---

## UI/UX Standing Lens

Before building any UI, state:
1. Who is using this, on what device, under what pressure?
2. What is the ONE thing this screen must make effortless?
3. What could go wrong visually or interactively?

After building, run the UI/UX checklist from leanspirited-standards/protocols/session-insession.md.

---

## Session Obligations (continuous)

**ADR log** — maintain running count of ADRs written this session.
**End-of-session prep** (feeds session-closedown.md):
- ADR session summary: titles, IDs, one-line status
- Flag any verbal decisions not yet written as ADRs
## UX CONSISTENCY PRINCIPLE — applies at Three Amigos gate

When any UI pattern exists in one feature, the default is to apply it consistently
across all features unless there is a specific reason to break convention for that feature.

**Trigger:** Any time a UI component (chips, tiles, cards, inputs, loading states, error states,
share buttons, category groupings, nav patterns) is built or redesigned for one feature.

**Action at Three Amigos:**
1. Ask: "Does this pattern already exist elsewhere in the app?"
2. If yes: "Is this change being applied consistently, or only to one feature?"
3. If only one feature: either expand scope to all features, or state the specific reason
   this feature breaks convention (and record that reason in the ADR).

**The rule:** Consistent by default. Divergent only with a stated reason.

**Why:** Users experience the whole app, not individual features. Inconsistent chip layouts,
button styles, or interaction patterns between pages feel broken even when each page works
individually. The app should feel like one product, not six prototypes.

**How to apply:** At the DDD/BDD/TDD loop boundary — before writing Gherkin for any UI change,
check whether the pattern exists on other pages. If it does, scope the work to cover all pages.
