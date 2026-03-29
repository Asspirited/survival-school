# Doors Corridor UI Redesign — SS-138
# Status: Design agreed, ready for Session B build
# Raised: 2026-03-29
# Relates to: SS-068 (new rooms), SS-130–SS-137 (room concepts)

---

## The Problem

Current corridor page (/survival-school/rooms) has:
- Text hard to see against dark background (`--text-muted: #6a6480` on `#0a0b0f`)
- Bland — doors show numbers (12, 12A, 13, 14, 15, 16) + "locked"/"enter"
- No description of what each room does
- Doesn't sell the experience — user can't tell they're about to stitch up a celebrity
- Jim Morrison is a rotating quote block, not a character welcoming you in

---

## Design Decisions

### 1. Jim as Carnival Barker

Jim Morrison welcomes the user in conversational tone. Not block caps. Not a
rotating quote rotator. A proper greeting — warm, slightly ominous, poetic
but doing a hype man's job his own way.

He's not a hype man. He's a poet who ended up doing a hype man's job and is
doing it his way. Sincere and slightly cosmic. Not entirely sure why you'd
want to go through these doors. Also not entirely sure what's in some of them.

**Welcome text (Jim's voice, conversational):**

> "You found the corridor. I don't know how. Behind these doors are people
> who know things about survival, or say they do. You choose the room. You
> choose who walks in. What happens after that is between them and whatever
> they've decided to believe about themselves. I'll be here. I'm always here."

### 2. Door Tiles — Room Names Replace Numbers

Each door tile shows:
- **Room name** (bold, structural font — Bebas Neue or Barlow Condensed)
- **Jim's teaser** (gold, Crimson Text italic — literary, Morrison's poet energy)
- Status badge (LIVE / COMING SOON)

No door numbers visible. The name IS the door.

### 3. Jim's Per-Door Teasers (gold Crimson Text italic)

| Room | Jim's Teaser |
|------|-------------|
| I've Had Worse | *Someone had it worse. Someone always had it worse. They'll keep going until the story eats itself.* |
| In My Defence | *Put someone in the chair. Ask them about the thing they did. Watch them try to explain it to people who were there.* |
| The Denial Loop | *Someone said something. The evidence disagrees. They are not backing down. Neither is the evidence.* |
| The Argument | *Pick a side. They'll pick the other. Eventually it stops being about what you said.* |
| Going With It | *Say something wrong. They'll agree. That's when it gets dangerous.* |
| The Detail | *You'll tell them what happened. They'll find the one thing you didn't mention. That's all they'll talk about.* |

**Note:** These are v1 teasers. The Denial Loop opener ("Someone said something") is flat —
needs a specific image. Going With It closer ("That's when it gets dangerous") is
generic thriller, not Jim. Both flagged for revision.

Additional rooms (SS-130–SS-137) will need teasers when Three Amigos scores them.

### 4. Locked Doors Show What's Coming

Locked doors are visible, greyed but readable. Teaser text visible.
User can see what's behind every door. Builds anticipation.

### 5. Typography

- **Room names:** Bebas Neue or Barlow Condensed (existing fonts, structural)
- **Jim's teasers:** Crimson Text italic (new Google Font — literary, Morrison energy)
- **Jim's welcome:** Same Crimson Text italic, larger, prominent
- **NOT block caps** — conversational, like Jim is talking to you

### 6. Colour — Gold Serif on Dark

- Teaser text: gold (`--gold` / `--gold-bright`) — pops against `--bg: #0a0b0f`
- Bump `--text-muted` contrast for door states and labels
- Room names: full `--text` colour, not muted

### 7. Corridor Quotes

Jim's rotating corridor quotes (25 currently in the page) move to a smaller
secondary line underneath the welcome, or cycle on a timer. The welcome block
is the primary content — quotes are texture, not the main event.

Per-door Morrison quotes (data-morrison attributes) remain on hover/tap.

---

## What's NOT Changing

- Dark background palette stays
- Grid layout stays (3-col desktop, 2-col mobile, 1-col tiny)
- Back link to /survival-school stays
- Morrison attribution stays

---

## Implementation Notes (for Session B)

1. Add `Crimson Text` italic to Google Fonts link
2. Replace door-number divs with door-name + teaser structure
3. Jim's welcome block replaces or augments the current morrison-block
4. Corridor quotes become secondary (smaller, below welcome, or rotating)
5. Bump contrast on all muted text
6. Locked doors: show name + teaser, greyed but readable
7. This is worker.js HTML (SURVIVAL_SCHOOL_ROOMS template) — Session B owns

---

## Open Questions for Three Amigos

1. Which of the 8 new room concepts (SS-130–SS-137) make the corridor?
   Currently 6 doors. Could expand. Or some replace The Argument / Going With It.
2. Should locked doors link to anything (e.g. "notify me")?
3. Mobile: should Jim's welcome be shorter on small screens?
