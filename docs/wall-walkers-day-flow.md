# Wall Walkers — Day Flow Design

## Overview

A Wall Walkers day has **5 phases**, each with clear triggers, formats, and expert involvement.
Both players (Telemicus & Ivanhoe) experience the same flow on separate phones.
State syncs via KV when signal available.

---

## THE DASHBOARD (Landing page after identity selected)

The dashboard is the home screen. It shows the current state of the walk:

```
┌──────────────────────────────────────┐
│  WALL WALKERS                    [?] │
│  Day 3 — Banks → Once Brewed        │
│  Status: WALKING / DAY CLOSED        │
├──────────────────────────────────────┤
│                                      │
│  ┌─────────┐  ┌─────────┐           │
│  │Telemicus │  │Ivanhoe  │           │
│  │   42     │  │   38    │           │
│  └─────────┘  └─────────┘           │
│                                      │
│  TODAY'S ROUNDS                      │
│  ✓ Morning Briefing                  │
│  ✓ Location: Banks (3/3 questions)   │
│  ● Walking Round 2 (in progress)     │
│  ○ Location: Gilsland (upcoming)     │
│  ○ Pub Round (evening)               │
│  ○ End of Day                        │
│                                      │
│  ──────────────────────────────       │
│  ALWAYS AVAILABLE                    │
│  [Ask the Panel]  [Legends]          │
│  [Collection]     [Route]            │
│  ──────────────────────────────       │
│                                      │
│  PREVIOUS DAYS                       │
│  Day 1 ✓  Day 2 ✓                   │
│                                      │
└──────────────────────────────────────┘
```

**Round-based features** (Quiz, Challenges, Walking Rounds) are gated by day state.
**Non-round features** (Ask the Panel, Legends, Collection, Route) are always available.

---

## PHASE 1: MORNING BRIEFING

### Trigger
Automatic on first app open of the day (or manual "Start Day" button).

### Format
```
TOP:    Bede opens — scholarly briefing on today's route, what you'll see,
        what he wrote about it. Real Ecclesiastical History quotes.
MIDDLE: Attenborough bridges — narrates the day ahead with documentary gravitas.
        Expert predictions — each expert predicts who will win today and why.
        (Recorded for fireside review. They will be wrong.)
TAIL:   Challenges revealed — 7 expert challenges for the day.
        Bede closes — "Walk well. Try not to disappoint me."
```

### Both players see
SAME content. Predictions are the same. Challenges are the same.

### State change
Day status → WALKING

---

## PHASE 2: WALKING ROUNDS (active during the walk)

### Trigger
GPS location + timer. Multiple round types fire throughout the day.

### Round Types

#### 2a. Location Round (GPS-triggered at POIs)
```
TRIGGER: Enter GPS zone of a POI
TOP:     Bede commentary on this location (real history/quotes)
         Attenborough bridges
MIDDLE:  3-5 location-specific quiz questions (both players answer)
         Panel reacts to answers
TAIL:    Expert challenge relevant to this spot (if applicable)
```

#### 2b. Walking Round — "Whose Wall Is It Anyway?" (~every 20 mins)
```
TRIGGER: Timer between POIs
TOP:     Bede presents three "facts" about something nearby
MIDDLE:  Two are real. One is Bear's lie. Players spot the lie.
TAIL:    Bear defends all three. Ray's face does something.
```

#### 2c. Walking Round — "Bear vs Ray" (alternates with 2b)
```
TRIGGER: Timer between POIs
TOP:     Bear and Ray give contradictory advice
MIDDLE:  Players bet on who's right
TAIL:    Reveal. Panel piles on whoever was wrong.
```

#### 2d. "Marcus Says" (~2 per day)
```
TRIGGER: Specific GPS points or timer
TOP:     Marcus Cocceius Firmus gives an order (channelled by panel)
MIDDLE:  Physical task. Photo evidence required.
TAIL:    Named expert judges at fireside.
```

#### 2e. Rest Point Commentary (at break stops)
```
TRIGGER: GPS at rest points between main stops
TOP:     Bede or panel commentary on the location
MIDDLE:  Historical nonsense, Marcus/Biggus references
TAIL:    Brief — doesn't interrupt the walk
```

### Both players see
SAME questions for Location Rounds (compare answers later).
Walking rounds may differ (different timers on different phones).
Marcus Says challenges are the same.

### State
Day status remains WALKING throughout.

---

## PHASE 3: PUB ROUND (evening, at accommodation)

### Trigger
Manual — player taps "Start Pub Round" on dashboard.
Available once at least 10 questions have been answered during the day.

### Format
```
TOP:    Bede introduces the evening quiz.
        "You have walked. You have answered. Now you drink.
        The questions will be harder. The points will be doubled."

MIDDLE: 10 questions. Mixed format:
        - 6 harder trivia from today's locations
        - 2 lateral thinking riddles
        - 2 estimation battles (both guess, closest wins)

        TWIST: Experts also answer. Their wrong answers are shown.
        "Bear answered: 127 miles. Bear is confident. Bear is wrong."

        Panel argues about answers between questions.

TAIL:   Bede gives pub round verdict.
        Scores updated. Pub round complete.
```

### Both players see
SAME questions. Both answer independently. Compare after each question.
Expert wrong answers are the same for both.

### State change
Pub Round status → COMPLETE

---

## PHASE 4: END OF DAY (triggers the evening ceremony)

### Trigger
Both players tap "Wall Walker End of Day" button.
Can undo if tapped by mistake.
When BOTH have confirmed → ceremony begins.

### Pre-ceremony: Score Processing
```
AUTOMATIC (no display yet):
- Calculate day's scores per player
- Calculate category breakdown
- Identify highlights (fastest answer, worst answer, best collection)
- Compare with expert morning predictions
- Compile collectibles evidence
- Package everything for the ceremony
```

### The Ceremony Flow

#### Act 1 — THE PREDICTIONS (blind)
```
TOP:    Bede: "I have watched from Jarrow. I have not seen today's scores.
        But I have thirteen centuries of judgement."
MIDDLE: Each expert reviews their morning prediction.
        They commit or change their pick — WITHOUT seeing scores.
        If they change: funny reason. Others react to the change.
TAIL:   Attenborough: "The predictions are locked. The truth awaits."
```
→ Player taps "Continue..."

#### Act 2 — THE GLIMPSES
```
TOP:    Bede: "Before the scores, some... observations."
MIDDLE: 3-4 hints without revealing numbers:
        "Someone got the Vindolanda question wrong. I'm not saying who."
        "There was a suspiciously fast answer on the wildlife round."
        "Someone photographed a sheep. I have concerns."
TAIL:   Tension building. No scores yet.
```
→ Player taps "Continue..."

#### Act 3 — THE VERDICT (scores revealed)
```
TOP:    Bede: "Very well. The scores."
        SCORE REVEAL — animated, dramatic.
MIDDLE: Experts react.
        Those who predicted wrong: excuses. Others pile on.
        Those who predicted right: unbearable smugness.
        Wolf pack if multiple experts were wrong.
TAIL:   Bede's verdict on the day. One devastating line.
```
→ Player taps "Continue..."

#### Act 4 — THE EVIDENCE (collectibles review)
```
TOP:    Bede: "Now. The evidence you have gathered."
MIDDLE: Review today's sightings.
        Panel comments on each photo.
        Suspicious claims challenged (sheep ≠ golden eagle).
        Bear validates everything. Ray challenges everything.
TAIL:   Collection stats update.
```
→ Player taps "Mock the Day"

#### Act 5 — MOCK THE DAY
```
TOP:    Two creative closing questions (from the pool of 30).
MIDDLE: Both players answer verbally (not in-app — pub conversation).
TAIL:   "The fire fades. Tomorrow, the wall continues."
```

### Both players see
SAME ceremony. Synced via KV — both phones show identical content.
Scores are merged from both players' data.

### State change
Day status → CLOSED

---

## PHASE 5: POST-CLOSE (fireside and beyond)

### Trigger
Day status = CLOSED

### Available features (non-round, always accessible)

| Feature | Format | Notes |
|---------|--------|-------|
| **Ask the Panel** | Q&A with Bede + panel | Suggested questions + freetext |
| **Legends** | Multi-turn panel discussion | 5-round escalation, confession |
| **Collection** | Browse/review sightings | Photo evidence, rarity stats |
| **Route** | Elevation profile + stops | GPS tracker, distance display |
| **Previous Days** | Review past ceremonies | Scores, highlights, expert predictions |

### Fireside extras (post-close only)

| Feature | Format | Notes |
|---------|--------|-------|
| **Expert Campfire Tales** | Legends round, pub atmosphere | Pre-loaded + AI when online |
| **Bede's Evening Reading** | A Bede quote or passage relevant to today | Real Ecclesiastical History |
| **Tomorrow's Preview** | Bede previews next day's route | Sets up anticipation |

### Both players see
Non-round features are independent (each phone runs its own).
Ceremony replay is the same (from KV).

---

## STATE MACHINE

```
                    ┌─────────────┐
                    │  NOT STARTED │
                    └──────┬──────┘
                           │ Open app / "Start Day"
                    ┌──────▼──────┐
                    │   MORNING   │
                    │  BRIEFING   │
                    └──────┬──────┘
                           │ Briefing complete
                    ┌──────▼──────┐
            ┌───────│   WALKING   │───────┐
            │       │  (rounds)   │       │
            │       └──────┬──────┘       │
            │              │              │
     GPS triggers    Timer triggers   Manual "Random Q"
     Location Rnds   Walking Rnds
            │              │              │
            └───────┬──────┘──────────────┘
                    │ "Start Pub Round"
                    │ (requires 10+ questions answered)
                    │
                    ▼
            ┌──────────────┐
            │  PUB ROUND   │
            └──────┬───────┘
                   │ Pub round complete
                   ▼
            ┌──────────────┐
            │  END OF DAY  │
            │ (both confirm)│
            └──────┬───────┘
                   │ Both players ready
                   ▼
            ┌──────────────┐
            │  CEREMONY    │
            │ (5 acts)     │
            └──────┬───────┘
                   │ Ceremony complete
                   ▼
            ┌──────────────┐
            │  DAY CLOSED  │
            │ (fireside)   │
            └──────────────┘
```

---

## EXPERT INVOLVEMENT SUMMARY

| Phase | Bede | Attenborough | Panel |
|-------|------|--------------|-------|
| Morning | Opens + closes | Bridges | Predictions |
| Walking | Location commentary | Bridges at POIs | Quiz reactions, challenges |
| Pub Round | Opens + verdict | Narrates | Answer wrong, argue |
| End of Day | Opens each act, closes ceremony | Bridges acts | Predictions, reactions, roasting |
| Post-close | Evening reading, preview | Narrates | Legends, Q&A |

---

## DASHBOARD STATES

### Day NOT STARTED
- Show: "Start Day" button, previous day summaries
- Available: Ask Panel, Legends, Collection, Route
- Not available: Quiz, Challenges, Pub Round, End of Day

### Day WALKING
- Show: Today's rounds progress, current score, challenges
- Available: Everything except Pub Round and End of Day
- Pub Round unlocks at 10+ questions

### Day PUB ROUND
- Show: Pub round in progress
- Available: Pub round. Other features paused.

### Day CLOSED
- Show: Day summary, ceremony replay, fireside features
- Available: Ask Panel, Legends, Collection, Route, Previous Days, Tomorrow Preview
- Not available: Quiz rounds (day is done)

---

## WHAT BOTH PLAYERS SEE — SYNC RULES

| Content | Same or Different? |
|---------|-------------------|
| Morning briefing | SAME |
| Location round questions | SAME questions, independent answers |
| Walking round questions | MAY DIFFER (timer-based, GPS differs) |
| Challenges | SAME |
| Pub round questions | SAME questions, independent answers |
| Ceremony | SAME (from merged KV data) |
| Ask the Panel responses | DIFFERENT (separate API calls) |
| Legends conversations | DIFFERENT (separate API calls) |
| Collection | DIFFERENT (each phone's local photos) |
