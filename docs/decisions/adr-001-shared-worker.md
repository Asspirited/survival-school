# ADR-001 — Shared Cloudflare Worker: Survival School + Cusslab

**Date:** 2026-03-26
**Status:** Accepted
**Owner:** LeanSpirited

---

## Decision

Survival School uses the existing Cusslab Cloudflare Worker via a new
`/survival-school/assess` route. Both apps share the same Worker and
the same underlying model infrastructure.

---

## Rationale

- Fastest path to live
- Model improvements benefit both apps immediately
- No duplication of Worker setup, deployment, or API key management
- Cusslab Worker pattern is proven and deployed

---

## Fork Trigger Conditions

Do not fork until at least one of these is true:

1. **Schema divergence** — Survival School response schema needs fields
   that would break or confuse Cusslab (e.g. survival_probability,
   domain skill ratings, temporal lens state)

2. **Character state conflict** — Survival School character state
   management (relationship matrix, override mechanics, temporal lens)
   becomes incompatible with Cusslab's panel state model

3. **Performance divergence** — Survival School needs different model,
   different token limits, or different rate limiting from Cusslab

4. **Deployment cadence conflict** — Changes to one app are blocked
   by the other's release cycle

5. **Audience divergence** — Product find different engines of growth
   requiring different infrastructure (e.g. SS goes viral/high volume,
   Cusslab stays sticky/low volume)

---

## Fork Decision Protocol

When a trigger condition is detected:

1. Raise as a backlog item with the trigger condition named explicitly
2. Three Amigos before forking — confirm the trigger is real not anticipated
3. ADR-002 documents the fork decision and which trigger fired
4. Shared improvements made before fork get cherry-picked to both branches

---

## What stays shared after a fork

- Character file format and schema
- Comedy engine design patterns (Telephone Game, Temporal Lens, Override mechanics)
- Session protocol and delivery framework
- Cross-panel mechanics (generateRumour equivalent, relationship state)

---

## Review

Revisit this decision when Survival School has its first real users.
HDD-001 validation is the natural checkpoint.
