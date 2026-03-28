# Fish Disposition Engine — Domain Design
# SS-098
# Created: 2026-03-28
# Dependency of: SS-087, SS-090, SS-091

---

## What This Is

A shared primitive that assigns an **arrival disposition** to any fish-out-of-water
character when they are drawn into the panel. The disposition defines their relationship
to being in the room — independent of their expertise domain.

Cox is always physics. Faldo is always golf. Jim is always Jim. But *how they relate
to being in a survival panel* varies per session. That's the disposition.

---

## The Six Dispositions

| ID | Name | Behaviour | Comedy Engine |
|----|------|-----------|---------------|
| `EXCITABLE_NOVICE` | Thrilled to be here | Asks questions. Gets things slightly wrong with full commitment. Ray is patient. Fox is not. | Gap between enthusiasm and competence. Panel tolerance eroding. |
| `CONFIDENT_IGNORAMUS` | Knows nothing, knows it all | Absorbs expert answers, re-emits them as own conclusion one beat too late. "Yes — the friction of the — yes." Panel sees it. Nobody says anything. | The re-emit. Panel watching. Silence. |
| `RELUCTANT_CONSCRIPT` | Unhappy to be here | Makes this known. Repeatedly. Has other things to do. Panel treats reluctance as atmospheric data, not actionable. | "Whether or not you wish to be here, the situation will very likely result in certain death." |
| `CONTEMPTUOUS_EXPERT` | Wrong domain, total confidence | Applies their actual expertise with conviction. "I've navigated Augusta in a playoff. This is not dissimilar." It is completely dissimilar. | Bear may engage sincerely — he sees the credential. This makes it worse. |
| `CONVERT` | Became a believer, then an expert | Phase 1: started skeptical, now fully in. Phase 2: combines domain knowledge + new "survival understanding" into confident false conclusions. Experts must intervene. | Fish being wrong and ignored is one thing. Fish being wrong, confident, and requiring active correction is structurally different and funnier. |
| `TOTAL_DENIAL` | Cheerfully refuses to see danger | "I think this is fine." It is not fine. Panel knows. Protagonist does not. Death warnings slide off. "...will very likely result in certain death." "No, I think it'll be fine." Pause. Panel continues. | The bounce. Nothing sticks. Panel's gravity is irrelevant. |

---

## Disposition Shifts (one-way per session, under sustained panel pressure)

| From | To | Trigger |
|------|----|---------|
| `EXCITABLE_NOVICE` | `CONFIDENT_IGNORAMUS` | Embarrassment triggers save-face reflex |
| `CONTEMPTUOUS_EXPERT` | `RELUCTANT_CONSCRIPT` | Repeated correction triggers retreat |
| `CONVERT` | `CONFIDENT_IGNORAMUS` | Over-absorption, nobody corrects fast enough |
| `TOTAL_DENIAL` | `EXCITABLE_NOVICE` | Something finally registers — now thrilled by the danger |
| `RELUCTANT_CONSCRIPT` | `TOTAL_DENIAL` | Retreats so far they disengage entirely |

Shifts are **one-way per session**. A character cannot shift back. This mirrors
the composure engine — ratchet, not pendulum.

---

## Per-Character Canon Dispositions

Each fish-out-of-water character has a **default disposition** (most likely draw)
and **weighted alternatives** (less likely but valid).

| charId | Default | Alternatives | Fixed? | Notes |
|--------|---------|-------------|--------|-------|
| `cox` | `EXCITABLE_NOVICE` | `CONVERT`, `CONFIDENT_IGNORAMUS` | No | Blissfully unaware, genuinely thinks he's helping |
| `faldo` | `CONTEMPTUOUS_EXPERT` | `RELUCTANT_CONSCRIPT`, `CONFIDENT_IGNORAMUS` | No | Wrong domain, total conviction, golf methodology |
| `jim` | `EXCITABLE_NOVICE` | — | **Yes** | Cannot be anything else. Fixed disposition. |
| `jeremy` | `RELUCTANT_CONSCRIPT` | `TOTAL_DENIAL` | No | Fish is the foreground; this is not fish |

Future characters (SS-087 crossovers) will add entries here.

---

## Implementation in characters.js

### Data Structure

```javascript
// Fish Disposition Engine — SS-098
const FISH_DISPOSITIONS = {
  EXCITABLE_NOVICE: {
    id: 'EXCITABLE_NOVICE',
    name: 'Thrilled to be here',
    prompt: `DISPOSITION: EXCITABLE_NOVICE — thrilled to be here. Asks questions. Gets things slightly wrong with full commitment. Genuinely believes they are helping. When corrected, absorbs it enthusiastically and immediately gets the next thing wrong. The enthusiasm is sincere. The competence is not.`
  },
  CONFIDENT_IGNORAMUS: {
    id: 'CONFIDENT_IGNORAMUS',
    name: 'Knows nothing, knows it all',
    prompt: `DISPOSITION: CONFIDENT_IGNORAMUS — absorbs expert answers and re-emits them as own conclusion one beat too late. "Yes — the, ah, the friction of the — yes. That's what I was going to say." Panel sees it. Nobody says anything. Next statement is also wrong. The re-emit is the comedy engine — the beat of silence before re-emission is critical.`
  },
  RELUCTANT_CONSCRIPT: {
    id: 'RELUCTANT_CONSCRIPT',
    name: 'Unhappy to be here',
    prompt: `DISPOSITION: RELUCTANT_CONSCRIPT — makes displeasure known. Repeatedly. Has other things to do. "I have a thing at—" "Whether or not you wish to be here, the situation will very likely result in certain death." The reluctance is noted. It will not help them. Panel treats it as atmospheric data, not actionable content.`
  },
  CONTEMPTUOUS_EXPERT: {
    id: 'CONTEMPTUOUS_EXPERT',
    name: 'Wrong domain, total confidence',
    prompt: `DISPOSITION: CONTEMPTUOUS_EXPERT — applies their actual expertise domain with total conviction to a survival situation where it does not apply. "I've navigated Augusta in a playoff. This is not dissimilar." It is completely dissimilar. Bear may engage sincerely with the credential. This makes it worse. The contempt is for the situation, not the people.`
  },
  CONVERT: {
    id: 'CONVERT',
    name: 'Became a believer',
    prompt: `DISPOSITION: CONVERT — started skeptical, now fully in. Enthusiastic. Absorbing everything. Then: combines domain knowledge + new "survival understanding" into confident false conclusions delivered as expert synthesis. "What you're describing is essentially the second law of thermodynamics applied to — well, I'd call it thermal shelter dynamics." The experts have to intervene. Fish being wrong and ignored is one thing. Fish being wrong, confident, and requiring active correction mid-crisis is structurally different and funnier.`
  },
  TOTAL_DENIAL: {
    id: 'TOTAL_DENIAL',
    name: 'Cheerfully refuses to see danger',
    prompt: `DISPOSITION: TOTAL_DENIAL — "I think this is fine." It is not fine. Panel knows. Protagonist does not. Panel death warnings slide off like rain. "...will very likely result in certain death." "No, I think it'll be fine." Pause. Panel continues. The bounce is the comedy — nothing sticks. Panel's gravity is irrelevant to this person.`
  }
};
```

### Character Fish Status

Characters are tagged as fish-out-of-water in their character object:

```javascript
// Added to character objects for fish-out-of-water characters:
fish: {
  default: 'EXCITABLE_NOVICE',       // most likely draw
  weights: {                           // probability weights (must sum to 1.0)
    EXCITABLE_NOVICE: 0.5,
    CONVERT: 0.3,
    CONFIDENT_IGNORAMUS: 0.2
  },
  fixed: false                         // true = always default, ignore weights
}
```

Characters without a `fish` property are survivalists — they don't get dispositions.

### Functions

```javascript
// Draw a disposition for a fish character
function drawDisposition(charId) {
  const char = CHARACTERS[charId];
  if (!char || !char.fish) return null;         // not a fish
  if (char.fish.fixed) return char.fish.default; // fixed disposition (Jim)

  const weights = char.fish.weights;
  const roll = Math.random();
  let cumulative = 0;
  for (const [disposition, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (roll < cumulative) return disposition;
  }
  return char.fish.default; // fallback
}

// Build disposition state for all fish characters in the drawn panel
function buildDispositionState(panelCharIds) {
  const state = {};
  for (const id of panelCharIds) {
    const disposition = drawDisposition(id);
    if (disposition) state[id] = disposition;
  }
  return state;
}

// Build system prompt injection for fish dispositions (same pattern as composure)
function buildFishDispositionInjection(dispositionState) {
  const lines = Object.entries(dispositionState).map(([charId, dispId]) => {
    const char = CHARACTERS[charId];
    const disp = FISH_DISPOSITIONS[dispId];
    if (!char || !disp) return '';
    return `${char.name.toUpperCase()} — ${disp.prompt}`;
  }).filter(Boolean);

  if (lines.length === 0) return '';

  return `\nFISH-OUT-OF-WATER DISPOSITIONS (this session):\n${lines.join('\n\n')}\n\nDisposition rules:\n- Fish characters respond through their disposition lens AT ALL TIMES.\n- Disposition is independent of expertise domain — Cox is always physics, but HOW he relates to the room varies.\n- Survivalist characters may react to the fish's disposition (patience, irritation, engagement) but do not have dispositions themselves.\n- When two fish are present, their dispositions interact independently — the comedy of two fish is multiplicative, not additive.\n`;
}
```

### Disposition Shift Logic

```javascript
// One-way disposition shifts under panel pressure
const DISPOSITION_SHIFTS = {
  EXCITABLE_NOVICE:   'CONFIDENT_IGNORAMUS',
  CONTEMPTUOUS_EXPERT: 'RELUCTANT_CONSCRIPT',
  CONVERT:            'CONFIDENT_IGNORAMUS',
  TOTAL_DENIAL:       'EXCITABLE_NOVICE',
  RELUCTANT_CONSCRIPT: 'TOTAL_DENIAL',
  CONFIDENT_IGNORAMUS: null  // terminal — no further shift
};

// Apply shift if panel pressure warrants it
function shiftDisposition(charId, dispositionState, panelTension) {
  const current = dispositionState[charId];
  if (!current) return dispositionState;

  const next = DISPOSITION_SHIFTS[current];
  if (!next) return dispositionState; // terminal state

  // Shift triggers: callout or wolf_pack targeting this character
  if (panelTension &&
      panelTension.subject === charId &&
      (panelTension.type === 'callout' || panelTension.type === 'wolf_pack')) {
    return { ...dispositionState, [charId]: next };
  }

  return dispositionState;
}
```

---

## Interaction with Existing Engines

| Engine | Relationship |
|--------|-------------|
| **Composure Engine (SS-088)** | Independent. A fish character has both a composure tier AND a disposition. Composure = emotional state under pressure. Disposition = relationship to the room. Both fire. |
| **Social Dynamics Engine (SS-059)** | Disposition influences what social dynamic types fire. A CONTEMPTUOUS_EXPERT is more likely to trigger a `callout` from an expert. A CONVERT is more likely to trigger a `wolf_pack` correction. |
| **Contradiction Engine** | Fish dispositions create natural contradiction fuel. CONFIDENT_IGNORAMUS + any expert = `one_wrong`. Two fish = `both_wrong`. |
| **Expert Over-Reach (SS-074)** | CONVERT disposition IS expert over-reach for fish characters. They overlap by design. |

---

## Exports

```javascript
export {
  FISH_DISPOSITIONS,
  DISPOSITION_SHIFTS,
  drawDisposition,
  buildDispositionState,
  buildFishDispositionInjection,
  shiftDisposition
};
```

---

## Test Coverage (L1 domain)

| Test | What it verifies |
|------|-----------------|
| `FISH_DISPOSITIONS has all six entries` | Data completeness |
| `drawDisposition returns null for non-fish character` | Survivalist exclusion |
| `drawDisposition returns fixed disposition for Jim` | Fixed disposition |
| `drawDisposition returns valid disposition for Cox` | Weighted random draw |
| `buildDispositionState returns state only for fish chars` | Panel assembly |
| `buildFishDispositionInjection returns empty for no fish` | No-fish panel |
| `buildFishDispositionInjection returns prompt text for fish` | Prompt injection |
| `shiftDisposition shifts under callout pressure` | Shift mechanic |
| `shiftDisposition does not shift without pressure` | Stability |
| `shiftDisposition returns same state for terminal disposition` | Terminal state |
| `Disposition Outline: all valid shifts produce valid dispositions` | State machine integrity |
