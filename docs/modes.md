# Mode Architecture — Survival School
# SS-048
# Status: Design complete — pending BDD feature build

---

## The Six Modes

Each mode changes: the input structure, the user's framing, the panel's role, the response schema, and the comedy register.

| Mode | You are | Panel role | Output | Comedy register |
|------|---------|-----------|--------|-----------------|
| **CASEVAC** | The casualty — compromised, possibly dying | Triage team deciding if you're worth extracting | Survival probability, extraction options, who does what | Panel debates whether to send the helicopter. Cody notes a better option that was right there. |
| **EXFIL** | Fit, alone, compromised, need to get yourself out | Mission briefing team | Escape route, what to abandon, how to move | Chris Ryan. 300km. One chocolate bar. Trust no one. |
| **SITREP** | Pre-situation — walking into something | Intelligence briefing | Threat assessment before you commit | Ray notes the exits. Bear has been here before. |
| **INFIL** | Need to get in somewhere undetected | Insertion planning team | Approach, cover, risks, abort criteria | Infiltrating a Waitrose. Bear goes through the skylight. |
| **EYES ON** | Observing before committing | Recce debrief team | What you're looking at, danger signs, go/no-go | "I'm approaching the Tesco car park on Christmas Eve. What am I looking at?" |
| **CHUCK NORRIS MODE** | Already unstoppable — not the concern | Assessing the threat to everyone else | What the jaguar should do now you've arrived | Attenborough narrates you as apex predator. Cody nods quietly. Coyote rates the jaguar's anticipated encounter at 3.2. |

---

## Mode Mapping — Existing Features

| Feature | Mode | Notes |
|---------|------|-------|
| How Screwed Am I | CASEVAC | You are the casualty. Panel assesses your survival probability. |
| I've Been Bit, Guys | CASEVAC | You are the casualty — already compromised. Panel reacts to your decision. |
| Mundane Mode | CASEVAC (modified) | Same casualty framing. Situation is mundane. Panel doesn't know this. |
| Will You Eat It? | SITREP (pre-decision) | Threat assessment before you commit your mouth. |
| Animal Deathmatch | EYES ON | Panel observes the encounter. You are not in it. |
| Bear Fact-Checker | — | Standalone — not a mode feature. |
| The Coyote Index | — | Standalone — not a mode feature. Pain scale only. |

---

## CASEVAC — Full Spec

**Input:**
- Location (cascading chips — see SS-042/043)
- Event/situation (location-specific + universal absurdity)
- Context: time of day, visibility, mental state, kit, company

**System prompt role:** Triage team. Panel member roles as defined in characters.js.

**Response schema:** `survival_probability`, `attenborough_opening`, `panel[]`, `attenborough_verdict`, `next_actions[]`

**Panel:** Ray, Bear, Cody, Hales, Fox, Stroud (+ optional new characters per mode)

---

## EXFIL — Full Spec ("One Man In")

**Named after:** Christian Craighead's banned memoir. See SS-054.

**Input:**
- Situation (you are fit, alone, need to get yourself out)
- What you have (kit chips)
- What you cannot do (constraints)

**System prompt role:** Mission briefing team. Craighead runs the brief. No chain of command.

**Panel composition:** Craighead (lead), Billy (standards), Fox (tactics), Ollie (asks if you're sure), Attenborough (narrates your approach as apex predator entering territory)

**Response schema:** `exfil_probability`, `route[]`, `what_to_abandon[]`, `movement_order`, `abort_criteria`, `attenborough_narration`, `panel[]`

**Comedy register:** The operational gravity applied to: IKEA car park extraction, Pret a Manger hostile environment, last train connection under fire.

---

## SITREP — Full Spec

**Input:**
- Where you're about to go
- What you know so far
- What you don't know

**System prompt role:** Intelligence brief before commit. Panel assesses what you're walking into.

**Response schema:** `threat_level` (0–10), `known_threats[]`, `unknown_threats[]`, `recommended_approach`, `abort_threshold`, `panel[]`, `attenborough_opening`

---

## INFIL — Full Spec

**Input:**
- Target location (where you're infiltrating)
- Objective (what you're trying to do)
- Cover story (optional)

**System prompt role:** Insertion planning. How do you get in undetected.

**Comedy register:** Infiltrating the Waitrose cheese counter. Bear goes through the skylight. Billy assesses the cover story as professionally sound or not.

**Response schema:** `approach`, `cover_story_assessment`, `risks[]`, `abort_criteria`, `panel[]`

---

## EYES ON — Full Spec

**Input:**
- What you're looking at (describe the situation you're observing)
- Your position (safe observation point / exposed / uncertain)

**System prompt role:** Recce debrief. Panel assesses what you're seeing before you commit.

**Response schema:** `danger_signs[]`, `go_no_go` (go/no-go/wait), `panel[]`, `attenborough_narration`

---

## CHUCK NORRIS MODE — Full Spec

**The premise:** You are not the concern. The jaguar is.

**Input:**
- What you've arrived at
- (Optional) what you intend to do about it

**System prompt role:** The panel assesses the threat you pose to everything else in the scenario. Attenborough narrates you as apex predator.

**Response schema:** `threat_level_you_pose` (0–10, to the jaguar), `jaguar_survival_probability`, `panel[]`, `attenborough_narration`

**Comedy engine:** The reversal. Cody notes the jaguar had a better option. Ray observes that you didn't need to escalate but here we are. Coyote rates the encounter from the jaguar's perspective: 4.1.

---

## New Characters Per Mode

| Mode | Lead | Panel additions |
|------|------|-----------------|
| CASEVAC | — | Standard panel |
| EXFIL / INFIL | Craighead | Billy, Fox, Ollie |
| SITREP | Billy | Fox, standard panel |
| EYES ON | Fox | Standard panel |
| CHUCK NORRIS | Attenborough | All (Coyote rates the jaguar) |
| Coyote Index | Coyote | Standard panel reacts |

---

## Implementation Order (BDD items to raise)

1. SS-048 modes.md (this doc) — DONE
2. SS-054 One Man In (EXFIL feature) — next BDD sprint
3. Mode selector UI (new BL item — not yet raised)
4. SITREP / EYES ON / CHUCK NORRIS — later BDD sprints

---

*Last updated: 2026-03-27*
