# ADR-002 — Wave Interference Engine Model: Independent Panel Engines

**Date:** 2026-03-28
**Status:** Accepted
**Owner:** LeanSpirited
**Raised by:** Session design conversation (SS-059 + CONTRADICTION ENGINE co-existence)

---

## Context

The Panel Q&A mode contains a CONTRADICTION ENGINE (`panel_dynamic`) that fires on ~40% of
responses and governs factual disagreement between characters.

SS-059 introduces a SOCIAL DYNAMICS ENGINE (`panel_tension`) governing interpersonal behaviour —
wounds, lies, calling each other out — to be applied across all panel modes.

The design question: should these engines be coupled (one checks the other before firing) or
independent (each has its own gate, no knowledge of the other)?

---

## Decision

**Independent engines. No coupling. Ever.**

Each engine has:
- Its own probability gate (fixed, not conditional on other engines)
- Its own named instruction block in the system prompt
- Its own output field in the JSON schema
- No awareness of whether any other engine has fired

---

## Rationale

Coupled engines produce orchestrated behaviour — the comedy is visible in the machinery.
Two characters disagree factually AND socially because the code decided they should.
The pattern becomes legible. The surprise drains out.

Independent engines produce **wave interference**: emergent interaction patterns that arise
from the situation, the characters, and the AI — not from explicit wiring.

Three interference patterns occur naturally:

**Constructive (amplify):**
Both engines fire on the same character. Bear is factually wrong about snake bite treatment
(CONTRADICTION ENGINE) and is defending the wound that gave him his false authority
(SOCIAL DYNAMICS). Ray corrects the fact. Fox notes the history. Neither system knew the
other would fire. The double hit is more devastating than either alone.

**Destructive (offset):**
One fires, one doesn't. Factual consensus (CONTRADICTION ENGINE = `none`).
But social tension fires beneath it. Every character agrees on the answer.
The restraint about *why* Bear is being careful is its own comedy.

**Out of phase:**
The engines fire on different characters in the same response. Stevens is citing his bite
count while Ray and Bear are having a factual disagreement about extraction routes.
Two separate dramas. Neither knows about the other.

The interference is not engineered. It is the product.

---

## Consequences

### Positive
- Emergent behaviour: interactions the designers didn't anticipate appear naturally
- Simple to extend: new engines follow the same pattern without touching existing engines
- Easier to test: each engine tested in isolation against its own output field
- Harder to game: the comedy is in the interaction, not the individual engine

### Negative / Accepted tradeoffs
- Interaction patterns are not testable at L1 (non-deterministic by design)
- Probability gates require tuning by observation (Q3 — Rod's exploratory test)
- Two engines firing on the same character may occasionally produce incoherence
  (accepted: this is rare and the AI corrects naturally in most cases)

---

## Rule for Future Engines

> Every new engine is independent.
> Its own gate. Its own field. No coupling.
> The interaction between engines is the product. Do not engineer the interaction.

---

## Applies To

- `panel_dynamic` (CONTRADICTION ENGINE) — Panel Q&A, `qa` mode
- `panel_tension` (SOCIAL DYNAMICS ENGINE) — all panel modes (SS-059)
- All future engines added to the panel system

---

## Relationship to Other Docs

| Doc | Relationship |
|-----|-------------|
| `docs/panel-design-principles.md` | Canonical principle: "Independent Engine Systems" section |
| `js/characters.js` | buildSystemPrompt() — engine instruction blocks |
| `docs/backlog.md` | SS-059 (SOCIAL DYNAMICS ENGINE), SS-060 (cross-character references) |
| `ADR-001` | Worker architecture — both engines run in the shared Cusslab worker |
