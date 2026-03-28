# Protagonist Disposition Mechanic
# Status: Design — Three Amigos required before Gherkin
# Raised: 2026-03-28
# Source: Rod, 2026-03-28 (verbatim below)
# Relates to: SS-087 (Cusslab crossover), The Rooms design brief, RegisterContract model

---

## Rod's words (verbatim — primary source)

"they are with the experts and trying their best, or fucked off with being there,
that should be part of our engine mechanics to decide how they feel about being there
— i think i mentioned they might be an excitable novice, a know it all who knows
nothing and corrects themselves from the experts as if that's of course what they meant,
unhappy to be there, thinks the whole thing is stupid and a waste of their time and skills,
other modes potentially"

---

## What this is

The disposition is the protagonist's emotional stance towards being out of their depth.
It is separate from:
- Who the protagonist is (Faldo, Cox, Hawking, Bruce Lee)
- What the situation is (Dartmoor, Tesco, the North Sea)
- Who's on the panel

Disposition + protagonist + situation + panel = the full interaction space.

The key insight: disposition is separable from character identity. Jim Carrey as
Excitable Novice is very different from Jim Carrey as Contemptuous Expert. Both are
funny. Different engines. This multiplies the replayability of every protagonist
without adding new characters.

---

## The Four Dispositions (Rod's words) + extensions

### 1 — Excitable Novice
*"trying their best"*

The protagonist is genuinely engaged, enthusiastic, wanting to learn.
Slightly embarrassing in their enthusiasm. Asks follow-up questions.
Takes notes (wrong notes).

**Panel response:** The panel does not warm to the enthusiasm. Death register fires
identically. The enthusiasm is not a mitigating factor — if anything, "Enthusiasm
without adequate preparation is frequently the last thing people experience before
the situation becomes unrecoverable." The panel cannot be charmed. That's the comedy.

**Beat:** Protagonist beams. Panel continues. The beam fades slightly.

---

### 2 — Confident Ignoramus
*"a know it all who knows nothing and corrects themselves from the experts as if
that's of course what they meant"*

The protagonist knows nothing but believes they know a great deal. When corrected by
an expert, they do not absorb the correction — they absorb it and re-emit it as if
it was what they said. "Yes, yes — exactly. The, ah, the... friction of the — yes.
That's what I — yes."

**The comedy beat:** The self-correction. The panel sees it. Nobody says anything.
Ray perhaps looks at Fox once. The protagonist continues, slightly rearranged but
still confident. The next thing they say is also wrong.

**Panel response:** Correct once. Do not repeat. Move on. The protagonist's
self-correction is background noise. The situation has not improved.

---

### 3 — Reluctant Conscript
*"unhappy to be there"*

The protagonist does not want to be here. Makes this known. Repeatedly.
Has other things to do. This situation is not their situation.

**Panel response:** The panel does not acknowledge the reluctance. It is not
survival-relevant. The scorpion does not share your preference to be elsewhere.
"Whether or not you wish to be here, the situation you are in will very likely
result in certain death if you — yes. The reluctance is noted. It will not help you."

**Beat:** Protagonist expresses displeasure. Panel continues as if this is atmospheric
data, not actionable content.

---

### 4 — Contemptuous Expert (wrong domain)
*"thinks the whole thing is stupid and a waste of their time and skills"*

The protagonist has genuine expertise — just in the completely wrong domain.
They apply it with total confidence. "I've navigated Augusta in a playoff under
tournament pressure. This is not dissimilar." It is completely dissimilar.

Faldo is the canonical example. His domain is relevant to nothing happening on Dartmoor.
He believes otherwise. The panel allows this belief to stand. It doesn't help.

**Panel response:** Bear alone may engage sincerely — he sees the credential, respects
the register, extends professional courtesy. This makes it worse. Everyone else continues.
The situation does not adjust for domain expertise.

---

### 5 — The Convert (extension, worth adding)

Starts in mode 3 or 4. As the session progresses and the panel's death gravity accumulates,
the protagonist shifts. By turn 3 they are asking genuine questions. By turn 5 they have
fully absorbed the death register and are delivering it to other panel members.

**The mechanic:** Disposition drifts under pressure. The panel does not acknowledge the
conversion. They just continue. The protagonist is now one of them. Nobody comments.

---

### 6 — Total Denial (extension, worth adding)

Refuses to see any danger. Not reluctant — cheerfully, persistently unaware.
"I think this is fine." It is not fine. The panel knows it is not fine.
The protagonist does not know what the panel knows.

Different from Excitable Novice: the novice wants to engage. Denial never accepts
the premise. The panel's death warnings slide off. This produces a specific beat:
"...will very likely result in certain death." "No, I think it'll be fine."
Pause. Panel continues.

---

## The game mechanic

### Option A — User-selected at session start
User picks protagonist + disposition before the room opens.
"How is [Faldo] feeling about this?" → [Trying his best] [Knows better] [Hates this] [Waste of time]

Transparent. Gives users agency. Adds replayability ("try Faldo as novice").

### Option B — Random assignment
Disposition is randomly drawn when the protagonist enters. User discovers it in play.
Adds surprise. Different session feel each time.

### Option C — Character-locked
Some protagonists have a fixed disposition. Faldo = always Contemptuous.
Cox = always Excitable (based on existing characterisation). Hawking = TBD.
Reduces flexibility but maintains character consistency.

### Hybrid (recommended)
Default disposition per character based on their character profile.
User can override at session start.
The default is the comedy read — the override is the replayability hook.

**Default mapping (initial hypothesis):**
- Jim Carrey → Excitable Novice (already coded this way — "enters backwards, thinks it's going extremely well")
- Faldo → Contemptuous Expert (his default register in everything)
- Roger Cox → Excitable Novice or Confident Ignoramus (TBD — Three Amigos)
- Hawking → Confident Ignoramus or Convert (his actual knowledge would convert him fast)
- Bruce Lee → Contemptuous Expert (wrong domain, total confidence)
- Politician → Reluctant Conscript (default) / Confident Ignoramus (when on form)

---

## Relationship to existing mechanics

**RegisterContract (The Rooms):** The room defines the panel's social contract.
Disposition defines the protagonist's. These are parallel layers. Together they
determine the full dynamic.

**Panel spectrum (integrity):** True believers (Bear) / quiet incredulity (Ray) /
can't keep straight face. Disposition is the protagonist-side equivalent of this
panel-side spectrum.

**Character crack profiles:** Crack profiles describe how panel members break under
pressure. Disposition describes how the protagonist receives that pressure.
The Convert disposition is a protagonist crack profile.

**Fish-out-of-water pair modes (SS-090/091):** When both Cox and Faldo are in the room,
their dispositions interact. Faldo (Contemptuous) + Cox (Excitable) produces a specific
dynamic. Faldo (Contemptuous) + Cox (Reluctant) produces a different one. This is the
engine Rod is pointing at.

---

## Outstanding Three Amigos questions

1. User-selected vs random vs character-locked — which hybrid?
2. Does disposition drift (Convert mechanic) or stay fixed for the session?
3. Does the panel ever acknowledge the disposition directly, or always treat it as
   background noise? (Current read: never acknowledge. That's the comedy.)
4. Are the four Rod-named dispositions plus the two extensions the full set, or are
   there others worth adding before building?
5. Does this apply to SS non-survivalists only, or also to Cusslab characters
   when they appear in SS (e.g. Faldo and Cox already present in SS)?

---

## Backlog items to raise

- **SS-NNN** — Protagonist Disposition as engine mechanic (design doc + schema)
  Walking skeleton: Faldo in Contemptuous mode through How Screwed Am I
  CD3 est: UBV=8 TC=6 RR=5 → ~6.4

- **SS-087** — Cusslab crossover: this mechanic is the answer to Three Amigos Q3
  ("does the panel adapt for a non-survivalist?"). Answer: no — but the disposition
  determines how the protagonist interacts. This unblocks SS-087.
