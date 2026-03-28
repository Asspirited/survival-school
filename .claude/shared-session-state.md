# Shared Session State — Survival School
# Written: 2026-03-28 (Claude Code session close — Jim Carrey + Jeremy Wade session)
# Supersedes: SS-088 composure engine state (still live — see below)

---

## What shipped this session

### SS-092 — Jim Carrey (DONE)
- `js/characters.js`: full voice profile, Three Amigos rotation, protagonist, all panels
- av=JC, avClass=av-yellow (mustard #d4a017)
- Comedy engine: genuine animal knowledge, wrong register, panel winces and groans, Bear engages sincerely making things worse
- IHW chips: snake understanding, wilderness tracking, bear negotiation (Fox dispute)
- CORRIDOR_SENDOFF: enters backwards through service entrance, believes this is going extremely well
- worker.js: IHW character object, protagonist chip, predicament chips, system prompt section
- All tests added: domain, acceptance, UI — pipeline green

### SS-095 — Jeremy Wade (DONE)
- `js/characters.js`: Freshwater Biologist, River Monsters presenter
- av=JW, avClass=av-teal (#2e9e8a)
- Comedy engines:
  - Notebook mechanic: cock and balls (trademark) + OWY vertical + inner monologue
    ("I'm fucking starving, Maccies", "Am I going to be expected to eat the fish that guy is molesting", "I have to stop thinking about getting an erection")
  - Translator reactions: frowns but says nothing / wry grin / wide-eyed / laughs at a 2-year-old with dysentery
  - Multinational language detritus: fragments from 50 countries fired as background process regardless of location — Olé, Santa Maria, Ándale, Sayonara, El Dorado
  - Cowabunga: says it to bereaved widow with solemn frown. Well-intended. That's what makes it work.
  - Tuning out: human conversation not about fish — ends by shading cock and balls in 3D
  - 3D shading development arc: skill Jeremy is honing across sessions
  - Instant death register: ARAPAIMA CONTACT | GOONCH | IMMEDIATE EXTRACTION REQUIRED
  - Terrible recreations: "I will demonstrate the bite angle. Please stand over here."
  - Real incidents: Congo witchcraft accusation, Mekong spy arrest, Goonch, arapaima bruised heart, candiru waggle
- IHW chips: Goonch second time, Arojubtria incident, arapaima bruised heart
- CORRIDOR_SENDOFF: already in waders, thermal flask, notebook. Translator frowns but says nothing.
- worker.js: IHW character object, protagonist chip, predicament chips, system prompt section
- All tests added: domain, acceptance, UI — pipeline green

### Previously shipped (still live)
- SS-088 — Composure engine: DONE
- SS-093 — In My Defence (Room 14): DONE
- SS-094 — IHW panel interaction fix: DONE

---

## Worker state
- Last deployed hash: 1d3527c1 (tuning out + 3D shading + language mechanics — Jeremy Wade final)
- Worker: cusslab-api.leanspirited.workers.dev
- Valid charIds: ray, bear, fox, hales, cody, stroud, stevens, cox, faldo, jim, jeremy
- Deploy: source /home/rodent/.cf-deploy-token && CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" CLOUDFLARE_ACCOUNT_ID="ce5ebfc99d1b37a7537a039d0b09d0b6" npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml

---

## Pipeline state
L0 auth canary, L1 unit (60 domain chars), L2 contract (known occasional flake — Haiku non-JSON first call, always passes on rerun), L3 acceptance (51), L4 UI (258 tests, 3 browsers). Pipeline green at close.

---

## WL items raised this session
- WL-SS-019 — Claude.ai falsely confirmed it had persisted Rod's verbatim memories for Jeremy Wade
- WL-SS-020 — Claude.ai falsely confirmed a record when asked again
- WL-SS-021 — Claude.ai falsely claimed memories were in Downloads session-ref file
- WL-SS-022 — Every verbatim personal memory Rod gave for panel characters: lost in full
- WL-SS-023 — 1+ hour of Rod's time giving personal memories for characters he loves: unrecoverable

**Action taken:** Rod Memory Trigger added to session-insession.md — Claude Code writes verbatim to file immediately on receipt, returns file path, waits for confirmation before continuing. Claude.ai removed from session workflow.

---

## Open WL items (cumulative)
- WL-SS-002: Shared state claimed GitHub repo existed — it didn't
- WL-SS-003: wrangler.jsonc at /home/rodent/ routes to wrong worker
- WL-SS-006: Session startup skipped repeatedly
- WL-SS-011: SSH auth declared broken without checking
- WL-SS-012: Claude "fixed permanently" apology loop
- WL-SS-013: Deploy treated as auth event
- WL-SS-019 to WL-SS-023: Claude.ai memory loss incidents (new this session)

---

## HDD status
HDD-001: "Panel comedy and survival expertise together create content people share with specific people in mind."
Status: OPEN / Advancing.
Evidence this session: Jim's panel wince/groan mechanic and Jeremy's Cowabunga-to-widow are exactly the kind of moment a user thinks "X needs to see this." Not confirmed in the wild yet.
Next action: Get a real person to share a panel output with someone specific in mind.

---

## Decisions made this session
- DECISION 2026-03-28: Jim Carrey — standard panel + protagonist, all panels
- DECISION 2026-03-28: Jeremy Wade voice = multinational detritus mechanic (NOT single catchphrase — single phrase = ninja turtle)
- DECISION 2026-03-28: av-yellow = mustard #d4a017; av-teal = #2e9e8a
- DECISION 2026-03-28: Claude.ai removed from session workflow — Claude Code has file access and same model

---

## Top 3 for next session
1. SS-087 — Cusslab crossover: non-survivalists through The Doors (CD3=27, highest priority)
2. SS-096 — Wade predicament chips: River Monsters scenarios (BDD, natural follow-on)
3. SS-090 — Cox + Faldo: vehement mutual agreement, experts look on in horror (BDD)

---

## Carry-forward notes
- Jeremy Wade verbatim Rod quote: MISSING. Rod needs to give one verbatim sentence for jeremy-wade.md "Rod's Memory" section. Other founding characters all have this. Wade is the only gap.
- Jim character doc: `docs/characters/jim.md` not yet created. Low priority but needed for completeness.
- L2 contract test: known occasional flake (Haiku returns non-JSON on first call). Always passes clean on rerun. Not structural.

---

## Live features
| Feature | URL | Status |
|---------|-----|--------|
| Homepage | /survival-school | Live |
| How Screwed Am I? | /survival-school/app | Live — composure engine active |
| I've Been Bit, Guys | /survival-school/worst | Live |
| Mundane Mode | /survival-school/mundane | Live |
| Will You Eat It? | /survival-school/eat | Live |
| Animal Deathmatch | /survival-school/deathmatch | Live |
| Bear Fact-Checker | /survival-school/fact-checker | Live |
| The Coyote Index | /survival-school/coyote | Live |
| Panel Q&A | /survival-school/panel-qa | Live |
| The Doors (corridor) | /survival-school/rooms | Live |
| I've Had Worse (Room 13) | /survival-school/ive-had-worse | Live |
| In My Defence (Room 14) | /survival-school/in-my-defence | Live |
