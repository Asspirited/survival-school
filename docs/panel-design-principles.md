# Panel Design Principles — Survival School
# Status: Canonical — governs all panel mode design decisions
# Established: 2026-03-28
# Authority: Rod (product), confirmed in session

---

## The Core Principle

Panel behaviour is consistent by default.
A panel mode is only allowed to deviate from the defaults when the topic or feature
genuinely benefits from a different structure — not for novelty, not for variety's sake.

If you cannot name the specific reason a mode needs a structural difference, it doesn't need one.

---

## Default Panel Behaviour (applies to all modes unless overridden)

### Character pool
- All characters in `PANEL_POOL` are eligible per session
- 4–5 characters drawn per session (see SS-065)
- Attenborough is not in the pool — he is always the closer
- Selection is random unless an archetype is active (see SS-063)

### Response structure
- **Attenborough bookend:** opening above panel cards, verdict below — always
- **Triage order (SS-034):** IMMEDIATE tier responds before COMEDY tier
  - IMMEDIATE: Ray, Fox — direct, clinical, practical first
  - COMEDY/OBSERVATION: Bear, Hales, Cody, Stroud — once stakes are established
  - The comedy only lands if the immediate layer has set the stakes first
- **Attenborough closes:** always last, never in the panel card array

### Character behaviour
- Characters are sincere. They do not perform comedy. The comedy is structural.
- Characters do not know they are in a named mode or mechanic. They are simply being themselves.
- The contradiction between a character's register and the situation is the engine — not the character winking at it.

### Rendering
- Full name displayed for all characters — no abbreviations (e.g. "David Attenborough" not "DA")
- Per-character card with avatar, name, role, text
- Attenborough bookend uses a distinct visual treatment (italic, muted, no avatar abbreviation)

---

## When Deviation Is Justified

A mode may override the defaults when the **function of the feature** requires it.

| Feature type | Justified deviation | Reason |
|---|---|---|
| Crisis/decision modes (How Screwed Am I, reaction) | IMMEDIATE tier weighted higher | User needs practical answer before comedy; stakes are real |
| Discussion/Q&A modes (Panel Q&A) | Triage order relaxed — emotion/context drives sequence | Conversation format; no urgent practical answer required |
| RegisterContract modes (The Rooms — BL-166) | Per-contract ordering and terminal conditions | The contract defines the mechanic; that IS the feature |
| Terminal states (Attenborough Eulogy, death) | Attenborough only, no panel | Terminal state is a closer, not a discussion |

**Not justified:**
- Different order just because a mode is thematically different
- Removing Attenborough bookend for visual variety
- Changing triage order to make a mode feel "fresh"

---

## Fish-Out-of-Water Characters (SS-064)

When a fish-out-of-water character (Cox, Faldo, others) is in the panel:
- They do not replace a tier — they are added into the COMEDY/OBSERVATION slot
- They are sincere about their wrong expertise. They do not know they are wrong.
- They do not override the triage order
- Maximum one fish-out-of-water character per panel session

---

## Panel Archetypes (SS-063)

Named archetypes are curated draws from the pool — not overrides of the default behaviour.
An archetype selects *who* is in the panel. The default behaviour still applies to how they respond.
Archetype casting and default panel behaviour are independent concerns.

---

## Independent Engine Systems — Wave Interference Model

The panel prompt can contain multiple independent engines running simultaneously.
Each engine has its own probability gate and its own output field.
**They do not know about each other. They must never be coupled.**

### Current engines

| Engine | Output field | Mode(s) | Gate | What it governs |
|--------|-------------|---------|------|-----------------|
| CONTRADICTION ENGINE | `panel_dynamic` | Panel Q&A | ~40% | Factual disagreement — who is right about survival knowledge |
| SOCIAL DYNAMICS ENGINE (SS-059) | `panel_tension` | All panel modes | ~35% | Interpersonal dynamics — wounds, lies, calling each other out |

### Why independent, not coupled

If an engine checked whether another had fired before deciding to fire, the system would produce
orchestrated behaviour — predetermined, legible, mechanical. The comedy would be visible in the
machinery.

Independent gates produce **interference patterns** that emerge from the situation, not from code:

- **Constructive (amplify):** Both fire on the same character in the same response. Bear is
  factually wrong (CONTRADICTION ENGINE) AND is citing a wound he has embellished (SOCIAL DYNAMICS).
  The double hit lands harder than either alone.

- **Destructive (offset):** One fires, one doesn't. The panel reaches factual consensus but the
  social tension fires underneath. Everyone agrees what to do. The silence about *why* Bear is
  quiet is louder than the agreement.

- **Out of phase:** The engines fire on different characters simultaneously. Two separate dramas,
  neither aware of the other, running in the same response.

### Rule for all future engines

> Every new engine is independent. Its own gate. Its own field. No coupling.
> The interaction between engines is the product. Do not engineer the interaction.

### Implications for prompt design

- Each engine gets its own named instruction block in the system prompt.
- Each engine gets its own field in the OUTPUT schema.
- Probability gates are fixed — do not adjust one gate based on the state of another.
- Characters respond to their own engine instructions. The emergent interference is the AI's work.

---

## The Single Most Important Thing to Preserve

> Characters must not know they are in an interaction mode.
> They are sincere. The comedy is structural, not performed.
> — ss_domain_model_handoff.md, section 6

This applies to every mode, every feature, every prompt engineering decision.
The moment a prompt says "now escalate this" or "be funnier here" or "play up the contradiction",
the engine breaks. The instruction goes to the structure, not to the character.

---

## Relationship to Other Docs

| Doc | Relationship |
|---|---|
| `docs/backlog.md` | SS-034, SS-063, SS-064, SS-065, SS-006 are the backlog items this governs |
| `js/characters.js` | Source of truth for character voices, pool, and triage |
| `the_rooms_design_brief.md` | RegisterContract modes — BL-166/167/168 implement the justified deviations |
| `ss_domain_model_handoff.md` | Call stack, crack profiles, three-layer character model |
| `docs/panel-integrity-spectrum.md` | Who would throw the spear in the pool — related but distinct |
