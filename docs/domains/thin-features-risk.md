# Thin Features Risk Assessment — Design Document
# SS-163 — Are Tier 3 features diluting the product?
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain)

---

## The Question

Survival School has 16 live features. Four are deep multi-turn Rooms
with escalation, composure, wounds, and multi-round panels. Seven are
single-shot: submit once, get one response, done.

Do the thin features make the product look shallow?

---

## Feature Depth Matrix

| Feature | Turns | Composure | Escalation | Wounds | Morrison | Depth |
|---------|-------|-----------|------------|--------|----------|-------|
| I've Had Worse | Multi | Yes | Yes | Yes | Yes | DEEP |
| In My Defence | Multi | Yes | Yes | Yes | Yes | DEEP |
| The Alibi | Multi | Yes | Yes | Yes | Yes | DEEP |
| The Expert Witness | Multi | Yes | Yes | Yes | Yes | DEEP |
| One Man In | Multi | Yes | Yes | Yes | No | DEEP |
| Panel Q&A | Single | No | No | No | No | THIN |
| How Screwed Am I | Single | No | No | No | No | THIN |
| I've Been Bit | Single | No | No | No | No | THIN |
| Mundane Mode | Single | No | No | No | No | THIN |
| Will You Eat It | Single | No | No | No | No | THIN |
| Animal Deathmatch | Single | No | No | No | No | THIN |
| Bear Fact-Checker | Single | No | No | No | No | THIN |
| The Coyote Index | Single | No | No | No | No | THIN |
| Irwin Memorial | Single | No | No | No | No | SPECIAL |
| The Doors (corridor) | Nav | No | No | No | Morrison | NAV |
| Homepage | Nav | No | No | No | No | NAV |

**5 DEEP. 8 THIN. 1 SPECIAL. 2 NAV.**

---

## The Risk

### Perception dilution
A user tries Mundane Mode first. They get a funny one-shot response.
They think "that's the product." They never discover I've Had Worse,
where the panel escalates across 5 rounds, wounds fire, Morrison
wanders in, and the comedy deepens with every exchange.

The thin features are a CORRECT first impression — the product IS
funny. But they're an INCOMPLETE first impression — the product is
also deep. Users who only see the thin layer miss the architecture.

### Navigation noise
16 tiles on the homepage. The deep features are buried among the thin
ones. A user scanning the grid can't tell which features have 5
minutes of content and which have 5 seconds. The tiles look identical.

### Quality perception
A user who tries 3 thin features and thinks they've seen the product
will tell their friends "it's funny but shallow." A user who tries
one deep feature will say "it's incredible." The thin features are
creating word-of-mouth about the wrong version of the product.

---

## The Counter-Argument

### Thin features are entry points
Not everyone wants a 5-round panel. Some users want a quick laugh.
Mundane Mode → screenshot → share → friend visits → discovers Rooms.
The thin features are the funnel. The deep features are the destination.

### Thin features demonstrate range
"This product does 16 things" is more impressive than "this product
does 5 things deeply." The breadth shows ambition. The depth rewards
exploration.

### Removal destroys content
Every thin feature has chips, panel responses, comedy moments. Removing
them loses content. Users who love Mundane Mode specifically would
lose their feature.

---

## Options

### Option A: Do Nothing
Keep all 16 features. Accept that some users will only see the thin
layer. The product is still funny at every level.

**Risk:** Perception dilution continues. Deep features under-discovered.

### Option B: Deepen Thin Features with RegisterContracts
Give thin features multi-turn mechanics using the RegisterContract
platform (SS-156). "It Gets Worse" for Mundane Mode (SS-170).
Multi-round Deathmatch. Bear Fact-Checker with escalating claims.

**Benefit:** Everything becomes deep. No features removed.
**Cost:** Significant build time. Some features may not benefit
from depth (Coyote Index is a joke format that works as one-shot).

### Option C: Funnel Users Toward Rooms First
Redesign the homepage to feature The Doors prominently. Move thin
features to a secondary "Quick Panel" section. Users see the deep
features first, thin features as extras.

**Benefit:** Deep features get discovered. No content removed.
**Cost:** Homepage redesign. May reduce thin feature usage.

### Option D: Hybrid — Deepen Some, Funnel Others
- **Deepen:** Mundane Mode (multi-turn), How Screwed (multi-turn),
  Will You Eat It (species depth, multi-turn), Panel Q&A (follow-ups)
- **Funnel:** Keep Deathmatch, Fact-Checker, Coyote, I've Been Bit
  as "Quick Panel" entries below The Doors
- **Irwin Memorial:** Leave as-is (special category, works perfectly)

**Benefit:** Best features get depth. Quick features stay accessible.
  Homepage guides users to the right entry point.
**Cost:** Moderate build time. Homepage redesign.

---

## Recommendation

**Option D (Hybrid)** is the strongest path.

The thin features that benefit most from depth are the ones with
the strongest comedy premise:
1. **Mundane Mode** — "It Gets Worse" multi-turn (SS-170/171)
2. **How Screwed Am I** — already has the panel, just add rounds
3. **Will You Eat It** — species depth (SS-168) + multi-round debate

The thin features that work fine as single-shot:
- **Bear Fact-Checker** — the joke IS the footnote, one shot
- **The Coyote Index** — pain rating, works as a moment
- **Animal Deathmatch** — one fight, decisive
- **I've Been Bit** — single reaction panel

Homepage redesign (Session B) to feature The Doors first, then
"Deep Panel" features, then "Quick Panel" features.

---

## Sub-Items (if Rod confirms)

- SS-176 — Homepage: feature The Doors prominently above fold
- SS-177 — Homepage: "Quick Panel" secondary section for thin features
- SS-171 — Mundane multi-turn (from SS-170)
- SS-178 — How Screwed multi-turn escalation
- SS-168 — Will You Eat It depth (already in backlog)
