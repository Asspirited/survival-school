# RegisterContract as Platform — Design Document
# SS-156 — Parameterise the Room mechanic so new Rooms become data, not code
# Status: Design v1
# Created: 2026-03-30

---

## What Is This?

RegisterContract is already a mature design concept (see docs/the-rooms-design-brief.md).
Six contracts exist. One is live (I've Had Worse). This document designs the
architecture for making RegisterContract a **platform** — new Rooms become data
entries, not new code paths.

The end state: a community Room editor where users create contracts.

---

## The Problem

Currently, each Room is a separate code path in worker.js:
- Separate route handler
- Separate system prompt template
- Separate HTML page
- Separate acceptance + UI tests

This means every new Room requires:
1. Worker.js route (30-100 lines)
2. System prompt (500-2000 chars)
3. HTML standalone page (200-400 lines)
4. Homepage tile + nav entry
5. Acceptance tests
6. UI tests

Six Rooms = six copies of roughly the same pattern with different parameters.
Twelve Rooms = unsustainable.

---

## The Solution: RegisterContract as Data

A RegisterContract defines the **rules of engagement** for a Room. The engine
is shared. The contract is the variable.

```javascript
// RegisterContract schema
{
  id: 'ive_had_worse',
  name: "I've Had Worse",
  roomNumber: 13,
  urlSlug: 'ive-had-worse',

  // The mechanic
  surfacePosition: 'competitive_sympathy',
  deepMechanic: 'status_competition_via_suffering',
  socialContract: 'must_exceed_previous',

  // Prompt rules
  panelInstruction: `Each character MUST top the previous character's claim.
    The claim must be credible for that character but more extreme than what
    came before. This is compulsory — the contract does not allow equal or
    lesser claims.`,
  protagonistRole: 'submitter',  // 'submitter' | 'defender' | 'accused' | 'expert'
  protagonistInstruction: 'User submits a predicament. Panel escalates.',

  // Turn structure
  turnType: 'multi',              // 'single' | 'multi'
  maxTurns: 5,
  userActionLabel: 'LET THEM DIG', // button text for next turn
  userActionInstruction: 'User can respond, adding detail or pushing back.',

  // Terminal condition
  breakCondition: 'absurdity_ceiling',
  terminalDescription: 'Panel reaches absurdity ceiling — claims become physically impossible.',
  closerBehaviour: 'geological_calm',  // Attenborough's closing register

  // Character behaviour overrides
  orderingRule: 'escalating',     // 'escalating' | 'adversarial' | 'collaborative' | 'default'
  factCheckerFires: true,         // Bear auto-annotated
  morrisonEligible: true,         // Morrison can interrupt
  composureActive: true,          // Composure engine runs
  escalationActive: true,         // Escalation profiles fire

  // Protagonist chips
  chipType: 'predicament',        // 'predicament' | 'roast' | 'claim' | 'scenario'
  chipCategories: [
    { id: 'general', label: 'General predicaments' },
    { id: 'personal', label: 'Personal to protagonist', perProtagonist: true }
  ],

  // Guiding copy
  guidingCopy: 'Tell the panel what happened. They will have had worse.',
  subHeader: 'Room 13 — competitive sympathy, compulsory escalation'
}
```

---

## What Changes

### Before (current architecture)

```
Route: /survival-school/ive-had-worse
  → worker.js: SURVIVAL_SCHOOL_IVE_HAD_WORSE template literal (unique)
  → HTML: ive-had-worse standalone page (unique)
  → System prompt: hardcoded per-room rules (unique)
```

### After (platform architecture)

```
Route: /survival-school/rooms/:slug
  → worker.js: ROOM_ENGINE (shared) + RegisterContract[slug] (data)
  → HTML: room.html (shared template) + RegisterContract[slug] (data)
  → System prompt: buildRoomPrompt(contract, panel, state) (shared)
```

One route handler. One HTML template. One prompt builder. N contracts.

---

## The Room Engine

```javascript
// Shared room engine — replaces per-room route handlers
function buildRoomPrompt(contract, panelCharIds, state) {
  const base = `You are running a panel under the following social contract:

CONTRACT: "${contract.name}"
SURFACE: ${contract.surfacePosition} — this is what the characters APPEAR to be doing.
DEEP: ${contract.deepMechanic} — this is what they are ACTUALLY doing.
RULE: ${contract.socialContract} — this is COMPULSORY. Characters cannot opt out.

PANEL INSTRUCTION:
${contract.panelInstruction}

PROTAGONIST ROLE: ${contract.protagonistRole}
${contract.protagonistInstruction}

TERMINAL CONDITION: ${contract.breakCondition}
${contract.terminalDescription}
When terminal is reached, Attenborough closes with ${contract.closerBehaviour}.`;

  // Inject active mechanics based on contract flags
  let mechanics = '';
  if (contract.composureActive) {
    mechanics += buildComposureInjection(panelCharIds, state.composureState);
  }
  if (contract.escalationActive) {
    mechanics += buildEscalationInjection(panelCharIds, state.round);
  }
  if (contract.morrisonEligible) {
    mechanics += buildMorrisonInjection(state);
  }
  if (contract.factCheckerFires) {
    mechanics += FACT_CHECKER_INSTRUCTION;
  }

  return base + mechanics;
}
```

---

## Data Location

### Phase 1: contracts in characters.js (or new contracts.js)

RegisterContract definitions live as a JS object, exported alongside CHARACTERS.
Worker.js imports them. No KV needed yet.

```javascript
// js/contracts.js
export const REGISTER_CONTRACTS = {
  ive_had_worse: { ... },
  in_my_defence: { ... },
  the_alibi: { ... },
  the_expert_witness: { ... },
  // Future rooms:
  dead_parrot: { ... },
  barney_rubble: { ... },
  special_air_counsellors: { ... },
  yes_but_then_what: { ... },
  the_fourth_wall: { ... },
};
```

### Phase 2: contracts in KV (user-created rooms)

When users can create rooms, contracts move to KV.
Worker reads contract at request time. Rod approves new contracts before they go live.

### Phase 3: community editor

Web UI for creating a RegisterContract:
- Name the room
- Define the social contract (one sentence)
- Define the surface position and deep mechanic
- Set terminal condition
- Choose which mechanics are active
- Preview with a test panel

---

## Migration Path

The four live Rooms (IHW, IMD, Alibi, Expert Witness) each have hardcoded
routes and system prompts. Migration:

1. **Extract** each room's rules into a RegisterContract data object.
2. **Build** the shared Room Engine alongside existing routes (not replacing).
3. **Test** the Room Engine produces equivalent prompts to the hardcoded versions.
4. **Switch** each room to use the engine, one at a time.
5. **Delete** the hardcoded route once the engine version is confirmed equivalent.

This is not a rewrite. It's extraction and generalisation of what already works.

---

## Shared HTML Template

Currently each Room has its own HTML page. Platform version:

```html
<!-- room.html — shared template, parameterised by contract -->
<div class="room-header">
  <h1>${contract.name}</h1>
  <p class="room-sub">${contract.subHeader}</p>
</div>

<div class="room-guiding">${contract.guidingCopy}</div>

<!-- Protagonist selection (shared) -->
<div id="protagonists" class="chip-grid">
  <!-- Generated from PANEL_POOL or contract.allowedProtagonists -->
</div>

<!-- Chip categories (from contract.chipCategories) -->
<div id="chips">
  <!-- Generated from contract chips data -->
</div>

<!-- Freetext input (shared) -->
<textarea id="freetext" placeholder="${contract.guidingCopy}"></textarea>

<!-- Action button -->
<button id="submit">${contract.userActionLabel || 'SUBMIT'}</button>

<!-- Panel response area (shared) -->
<div id="panel-response"></div>

<!-- Multi-turn continue button (if turnType === 'multi') -->
<button id="continue" style="display:none">${contract.userActionLabel}</button>
```

One template. Contract data fills the blanks.

---

## What This Enables

1. **New Rooms as data:** SS-068 (Dead Parrot, Barney Rubble, etc.) become
   config entries, not code. Estimate: 30 minutes per room instead of 3 hours.

2. **Room variants:** "I've Had Worse but everyone is lying" is a contract
   tweak, not a new feature.

3. **User-created rooms:** The editor writes a contract. Rod approves. Room goes live.
   No deploy needed (KV write).

4. **A/B testing contracts:** Same room, two contract variants. Which is funnier?

5. **Cross-product rooms:** Cusslab rooms and SS rooms share the same engine.
   Different contracts, same platform.

---

## Relationship to Other Systems

| System | Relationship |
|--------|-------------|
| SS-149 (Decompose prompts) | RegisterContract platform IS the decomposition. Shared engine replaces monolith prompts. |
| SS-150 (Server-side prompts) | Contract data lives server-side. Client sends slug + state, server builds prompt. |
| SS-151 (World Log) | World Log entries tagged with contract ID. "This happened in The Alibi." |
| SS-068 (Remaining rooms) | Build on platform, not as new code paths. |
| SS-160 (Cross-product) | Shared engine means Cusslab rooms use the same RegisterContract schema. |

---

## Open Questions (Three Amigos)

1. **Contract immutability:** Once a contract is live and users have history with it,
   can it change? Or does a changed contract become a new room?
   **Recommendation:** Version contracts. `ive_had_worse_v1`, `ive_had_worse_v2`.
   Old sessions reference old version. New sessions use latest.

2. **Character restrictions per room:** Can a contract restrict which characters
   are eligible? e.g., "The Alibi requires exactly 2 protagonists" or
   "Special Air Counsellors requires at least one armed_forces character."
   **Recommendation:** Yes. Add `panelConstraints` to contract schema.

3. **Chip data location:** Currently chips are hardcoded in worker.js template
   literals. Platform version: chips live in the contract data or in scenarios.js
   keyed by contract ID.
   **Recommendation:** scenarios.js, keyed by contract slug.

4. **Community moderation:** If users create contracts, who moderates?
   Rod approves before live. Unapproved contracts are draft-only (creator can
   test but nobody else sees them).
