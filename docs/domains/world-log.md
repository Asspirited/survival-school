# World Log — Design Document
# SS-151 — Persistent cross-session event store
# Status: Design v1
# Created: 2026-03-30

---

## What Is the World Log?

An append-only ledger of things that have canonically occurred in the panel world.
Characters know about them. The world has a history.

This is what makes long-running improv feel real — performers remember what happened
last week. The audience feels the weight of accumulated events.

---

## The Problem It Solves

Every panel session starts from zero. Characters have voice profiles, escalation
pools, wounds, composure — all the machinery for a single session. But they don't
remember what happened last time.

- Gordon got bitten by the same snake AGAIN — but the panel doesn't know that.
- THE DISAGREEMENT fired between McNab and Ryan — but next session it's gone.
- Hawking calculated the probability and it was devastating — but no one carries it.
- A sacred exchange happened between Fox and Billy — it's gone.

The World Log makes panel history accumulate. Characters reference prior events.
Users who return feel the world has moved. Users who don't return don't notice
anything missing (entries are injected as "recent events" not prerequisites).

---

## Domain Model

```
WorldLogEntry {
  id:          string        // wl-001, wl-002, etc.
  timestamp:   ISO 8601      // when the event was logged
  session:     string        // session identifier (date or hash)
  event:       string        // what happened — one line, factual
  characters:  string[]      // charIds involved
  type:        EventType     // 'wound_fire' | 'sacred_exchange' | 'disagreement' |
                             // 'lie_exposed' | 'escalation_peak' | 'temporal_lens' |
                             // 'morrison_interruption' | 'composure_gone' | 'custom'
  weight:      number        // 1-5 — how significant (affects injection priority)
  active:      boolean       // true = injected into prompts, false = archived
  rodNote:     string | null // Rod's editorial note (optional, curated)
}
```

---

## What Gets Logged

Not everything. The World Log is curated, not comprehensive. Only events that
characters would plausibly remember and reference.

### Auto-log candidates (from existing mechanics)

| Mechanic | Event type | Example |
|----------|-----------|---------|
| Wound fires | `wound_fire` | "Ray's wound ('The Show') fired in Round 3 of IHW" |
| Sacred exchanges | `sacred_exchange` | "Fox and Billy: THE EXCHANGE happened" |
| THE DISAGREEMENT | `disagreement` | "McNab and Ryan: Bravo Two Zero surfaced again" |
| Temporal Lens | `temporal_lens` | "Hiddins' reckoning fired — Aboriginal knowledge attribution" |
| Composure GONE | `composure_gone` | "Gordon hit GONE (composure 0) after round 4" |
| Lie exposed | `lie_exposed` | "Bear's lie about Everest conditions was called out by Fox" |
| Morrison interruption | `morrison_interruption` | "Morrison wandered in during IHW Round 2, mentioned doors" |
| Escalation peak | `escalation_peak` | "Cody accessed deep pool items (round 5 gate)" |

### Manual log (Rod curated)

Rod can add entries directly — things that happened in sessions that the auto-log
wouldn't catch. "The moment when Hawking and Williams both went quiet at the same
time and the panel didn't know who to look at" — that's a World Log entry.

---

## Injection Rules

1. **Recency:** Most recent 3-5 active entries injected into system prompt.
2. **Character relevance:** Entries involving characters on the current panel
   are prioritised over entries involving absent characters.
3. **Weight:** Higher weight entries survive longer in the injection window.
4. **Staleness:** Entries older than N sessions (configurable, default 10)
   auto-archive (active → false). They happened but they're fading.
5. **Format:** Injected as a "RECENT EVENTS" block in the system prompt.

```
RECENT EVENTS (World Log — things that have canonically happened):
- [wl-003] Fox and Billy: THE EXCHANGE happened. Neither has mentioned it since.
- [wl-007] Gordon hit composure 0 in I've Had Worse. The snake story got to him.
- [wl-012] Morrison wandered into The Alibi mid-cross-examination. Nobody asked him to leave.

Characters MAY reference these events as shared history. They do not HAVE to.
References should be oblique — "as we saw last time" not "according to World Log entry 7."
A character referencing a past event they were not present for has heard about it.
This is gossip. It is imprecise. That is correct.
```

---

## Storage Options

### Option A: Cloudflare KV (recommended)

- Append-only writes from worker.js after each panel response.
- Read at prompt build time.
- KV namespace: `WORLD_LOG`
- Key format: `wl-{timestamp}` or sequential `wl-001`
- Value: JSON WorldLogEntry
- List operation to get recent entries.
- Free tier: 100k reads/day, 1k writes/day — more than sufficient.

### Option B: Durable Objects

- Overkill for append-only ledger. KV is simpler.
- Would matter if concurrent writes were a concern (they're not — one user at a time).

### Option C: R2 (object storage)

- Single JSON file, read-modify-write.
- Race condition risk on concurrent sessions.
- Not recommended.

**Decision: KV.** Simplest, cheapest, purpose-built for key-value lookups.

---

## Implementation Phases

### Phase 1: Manual log + injection (minimum viable)

- `world-log.json` file in repo (or KV entries seeded manually).
- Rod adds entries after sessions.
- Worker reads log at prompt build time, injects top 3-5.
- No auto-logging. Just injection.
- **Value:** Characters reference shared history immediately.

### Phase 2: Auto-logging from wound/sacred/composure events

- Worker detects when wound fires, composure hits GONE, sacred exchange
  matches a pattern.
- Writes WorldLogEntry to KV automatically.
- Rod reviews and curates (can archive or annotate).

### Phase 3: User-facing history

- "What happened in your world" — a page showing the user's panel history.
- Each entry is a moment. The moments accumulate.
- Social sharing: "In my world, Gordon got bitten AGAIN."

---

## What the World Log Is NOT

- **Not a save file.** It doesn't restore a session. It adds context to a new one.
- **Not mandatory.** A user who has never visited before gets a fresh panel.
  World Log entries are flavour, not prerequisites.
- **Not a transcript.** It doesn't store the full panel response. It stores
  one line: what happened.
- **Not permanent.** Entries archive after N sessions. The world moves on.
  Only the most recent events feel alive.

---

## Relationship to Other Systems

| System | Relationship |
|--------|-------------|
| ESCALATION_PROFILES | Wound fires are auto-log candidates |
| COMPOSURE_PROFILES | GONE state is an auto-log candidate |
| RELATIONAL_AXES | Sacred exchanges are auto-log candidates |
| SOCIAL_DYNAMICS_ENGINE | Lies exposed are auto-log candidates |
| TEMPORAL_LENS | Reckoning fires are auto-log candidates |
| SS-152 (User reputation) | World Log is per-world. User reputation is per-user. Both inject context. |
| SS-154 (Character learning) | World Log is what happened. Character learning is per-user recognition. |

---

## Open Questions (Three Amigos needed)

1. **Per-user or global?** Does each user get their own World Log, or is there
   one shared world? Per-user is simpler and more personal. Global is more
   "the world has a history" but requires handling concurrent users.
   **Recommendation:** Per-user. Each user's world is their world.

2. **How many entries before staleness?** Default 10 sessions. Too few and the
   world feels amnesiac. Too many and the prompt gets heavy.

3. **Rod curation workflow:** How does Rod add/edit entries? Direct KV edit?
   Admin page? JSON file in repo? Phase 1 is file-in-repo (simplest).

4. **Cross-product:** Does the Cusslab World Log share with SS? Characters
   cross over (Hawking, Bruce Lee). If Hawking's wound fires in Cusslab,
   does SS know? **Recommendation:** Not yet. Same characters, separate worlds.
   Cross-product is SS-160.
