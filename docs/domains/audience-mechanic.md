# Audience Mechanic — Design Document
# SS-153 — Shared spectator URL for watching someone else's panel unfold
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain) — no worker.js or HTML changes

---

## What Is This?

Someone triggers a panel. Their friends watch it unfold. Near-real-time.
The viral loop isn't screenshots — it's watching someone else's panel
cascade live.

Right now Survival School is single-player. You submit a scenario, the
panel responds, you read it. Nobody else can see it happening. The
shareability (SS-029) is a screenshot AFTER the fact — a static record
of something that already happened.

The audience mechanic makes the panel a spectator event. Someone sends
a link. Their friends open it. They watch the panel roast their friend
in real time. They see Bear say the thing. They see Fox react. They
see Morrison wander in. They can't intervene. They can only watch.

The comedy of watching someone else get roasted is different from being
roasted yourself. It's funnier. You're safe. They're not. You can see
it coming. They can't.

---

## Why This Matters

### The screenshot problem
Screenshots are funny. But they're dead. The person reading the
screenshot missed the build-up. They missed the tension. They missed
the moment Bear said the thing and the room went quiet. They got the
punchline without the setup.

### What live spectating adds
The audience sees the whole arc. The scenario submission. The loading.
The panel assembling. The first response. The escalation. The wound
firing. The Morrison interruption. The composure collapse. They
experience the comedy as a story, not a screenshot.

The spectator doesn't control anything. They watch. The comedy is
watching someone else's predicament unfold. This is why panel shows
have studio audiences. The audience's reaction is part of the product.

---

## Architecture

### The URL model
Every panel session gets a unique session ID. The session ID is in
the URL fragment (not the path — no server routing needed).

```
/survival-school/ive-had-worse#session=abc123
```

The protagonist shares this link. Anyone who opens it sees the panel
unfold. The protagonist's view and the spectator's view are the same
content, different chrome.

### Data flow
No WebSockets. No server push. No real-time infrastructure.

The mechanic uses **polling with Cloudflare KV** as the shared state:

```
1. Protagonist submits scenario → worker processes → response stored in KV
2. Spectator polls KV via lightweight GET endpoint → receives latest state
3. Each round: protagonist submits follow-up → worker processes → KV updated
4. Spectator polls → sees new round appear
```

Polling interval: 3 seconds. KV TTL: 1 hour (sessions expire).
No persistent storage. No user accounts. No auth.

### Session state in KV

```
AudienceSession {
  sessionId:     string          // random UUID
  feature:       string          // 'ive-had-worse' | 'in-my-defence' | etc.
  protagonist:   string          // protagonist charId (if applicable)
  scenario:      string          // what the user submitted
  chips:         string[]        // chips selected
  rounds:        AudienceRound[] // append-only list of panel responses
  status:        'active' | 'complete'  // is the protagonist still going?
  created:       ISO 8601
  lastUpdated:   ISO 8601
}

AudienceRound {
  roundNumber:   number
  responses:     PanelResponse[] // the full panel response for this round
  composureState: object | null  // composure snapshot (for spectator display)
  morrisonPresent: boolean       // did Morrison appear this round?
  timestamp:     ISO 8601
}
```

### Spectator UI
The spectator view is read-only. No input fields. No buttons except
"Share" (to invite more spectators).

What the spectator sees:
1. **Header:** "{Protagonist name}'s predicament" + feature name
2. **Scenario:** What the protagonist submitted
3. **Panel cards:** Appear one at a time with a staggered reveal
   (500ms between cards — mimics real-time arrival)
4. **Round indicator:** "Round 1 of..." with live count
5. **Status:** "Panel is deliberating..." between rounds
6. **Morrison alert:** When Morrison appears, spectators see a
   distinctive alert: "Morrison has entered the room."

What the spectator does NOT see:
- Input fields (they can't submit anything)
- The protagonist's follow-up text (until the round completes)
- Composure numbers (they see the EFFECT, not the stat)

---

## Domain Model (characters.js — Session A territory)

The audience mechanic needs domain functions for:
1. Generating session IDs
2. Building spectator-safe response views (strip internal state)
3. Determining what's shareable vs private

```
AudienceConfig {
  features:        string[]     // which features support audience mode
  pollIntervalMs:  number       // how often spectators poll (3000)
  sessionTtlMs:    number       // how long sessions live in KV (3600000 = 1hr)
  maxSpectators:   number       // soft cap for display purposes (no enforcement)
  staggerDelayMs:  number       // delay between card reveals for spectators (500)
}

SpectatorView {
  sessionId:       string
  feature:         string
  scenario:        string
  rounds:          SpectatorRound[]
  status:          'active' | 'complete'
  protagonistName: string | null
}

SpectatorRound {
  roundNumber:     number
  cards:           SpectatorCard[]
  morrisonPresent: boolean
}

SpectatorCard {
  charId:          string
  charName:        string
  text:            string       // the panel member's response
  colour:          string       // CHAR_COLOURS for card styling
}
```

---

## Which Features Support Audience Mode?

Not all features benefit from spectating. Single-shot features
(submit once, get response) don't have enough arc.

### SUPPORTED (multi-turn, escalation, narrative arc):
- **I've Had Worse** — protagonist escalates, panel escalates back. 5+ rounds.
- **In My Defence** — interrogation, digging, exposing. Multiple rounds.
- **The Alibi** — two stories, cross-examination. Inherently dramatic.
- **The Expert Witness** — deference cracks over time. Multi-round.
- **One Man In** — solo entry, panel watches. Audience watches the watcher.

### NOT SUPPORTED (single-shot, no arc):
- How Screwed Am I — one submission, one response
- I've Been Bit — one submission, one response
- Mundane Mode — one submission, one response
- Will You Eat It — one submission, one response
- Animal Deathmatch — one fight
- Bear Fact-Checker — one claim
- The Coyote Index — one rating
- Panel Q&A — one question

These could be added later if they gain multi-turn mechanics.

---

## The Spectator Comedy Layer

### What spectators experience differently

**The build-up.** The protagonist is typing their scenario. The spectator
sees "typing..." for 10 seconds. The anticipation IS the comedy. What
are they going to say? The spectator is already laughing before the
panel responds.

**The reaction delay.** The spectator sees the panel's response cards
appear one at a time (staggered 500ms). This mimics a live panel.
Bear speaks first. Then Ray. Then Fox. Each card's appearance is a
mini-event. The spectator watches the responses accumulate.

**Morrison alerts.** When Morrison appears, spectators get a distinctive
notification. They know what Morrison does. They're waiting for the
flip. The protagonist might not notice Morrison's arrival as an event.
The spectator does.

**The wound moment.** When a character's wound fires, the spectator
sees the card appear with the wound content. They don't see the
composure numbers. They see the CHARACTER break. The spectator
understands the significance because they've been watching the
escalation. The protagonist is inside it. The spectator can see
the shape of it.

---

## Integration Points

### With World Log (SS-151)
Audience sessions could be logged as world events. "Bear's wound
fired during a live session with 4 spectators" is a world event
with witnesses. The World Log doesn't just record what happened —
it records who was watching.

### With User Reputation (SS-152)
Spectating doesn't count as an encounter. You didn't participate.
You watched. But spectating COULD track separately: "This user has
spectated 8 panels. They know what happens." Future: spectators
who become protagonists get a different intro — "Ah, you've been
watching. Now it's your turn."

### With RegisterContract (SS-156)
When Rooms become data-driven, audience mode auto-extends to all
new Rooms. The spectator view is generic — it displays cards from
any Room contract. No per-Room spectator code needed.

---

## What Session A Builds Now (characters.js)

1. `AUDIENCE_CONFIG` — which features support audience mode, timing constants
2. `AUDIENCE_FEATURES` — list of feature slugs that support spectating
3. `buildSpectatorView(sessionData)` — converts internal session state
   to spectator-safe view (strips composure numbers, internal state)
4. `buildSpectatorCard(response, charId)` — formats a single panel
   response for spectator display with char name and colour
5. Domain tests for all functions

**What Session A does NOT build:**
- KV storage/retrieval (Session B — worker.js)
- Polling endpoint (Session B — worker.js)
- Spectator HTML page (Session B)
- Session ID generation at API level (Session B)

---

## What Does NOT Ship in v1

- **Spectator reactions.** Spectators can't react (emojis, comments).
  Pure passive viewing. Reactions are v2 if demand exists.
- **Spectator count display.** "4 people are watching" is nice but
  requires more KV reads. Skip in v1.
- **Replay.** Completed sessions aren't replayable. They expire after
  1 hour. If we want replay, sessions move to R2 (persistent storage).
- **Spectator notifications.** No push notifications when a friend
  starts a panel. Share the link manually.
- **Private sessions.** All sessions with a session ID are public
  (to anyone with the link). No password protection. Obscurity
  via UUID is sufficient for comedy, not for secrets.
