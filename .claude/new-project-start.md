# New Project Start Protocol
# Lives at: .claude/new-project-start.md
# Version: 1.0 — March 2026
# Author: LeanSpirited

---

## TRIGGER

This protocol fires when the conversation contains a fuzzy match on:
- "new project" (primary trigger — last two words sufficient)
- "new project start"
- "start a new project"
- "new project please" / "new project pls"

When triggered: fetch this file in full and run every section in order.
Do not begin any creative, technical or design work until this protocol is complete.
This protocol runs ONCE per project. Session protocol takes over thereafter.

---

## WHAT THIS IS

New Project Start is the scaffolding that builds the scaffolding.

It runs before the first session. It produces the documents that session protocol
will operate on for every session after. Get this right and everything downstream
has solid ground. Skip it and every session is rebuilding context from scratch.

It is not a checklist to rush through. It is a conversation to have properly.

---

## SECTION 1 — PROJECT IDENTITY

Establish immediately:

1. **Project name** — working title, final title if known
2. **Backlog prefix** — two or three letters, unique across all projects (SS-, TBT-, V- etc)
3. **Repository location** — branch or folder in Asspirited/cusslab, or standalone repo
4. **Entry point** — the file a user or developer would open first
5. **Relationship to existing projects** — standalone bounded context or connected to Cusslab

Write these to the project registry at `.claude/projects.md` before proceeding.

---

## SECTION 2 — THE FOUNDING MOMENT

Before research. Before design. Before anything.

Ask Rod: **"What's the scene, story or image that made you want to build this?"**

This is the Cody spear-in-the-pool question. The biscuit tin question.
There is always one. It contains the entire product philosophy if you look at it right.

Write it down verbatim. Exactly as said. Do not paraphrase.
This becomes the opening of the founding philosophy document.

If Rod can't name one yet — the project is not ready to start.
Park it in the backlog. Come back when the moment exists.

---

## SECTION 3 — PERSONAL MEMORY CAPTURE

Before any research happens — ask Rod what he actually remembers.

**The rule:** Rod's memories set the register. Research fills the gaps.
Never reverse this order. Wikipedia gives facts. Rod gives texture.
Texture is what makes characters human rather than entries.

For each character, entity or concept central to the project — ask:
- What do you remember about them?
- What made you laugh?
- What made you wince?
- What made you trust or distrust them?
- Any specific moment or scene that stays with you?

Capture responses **verbatim**. Not summarised. The specific phrase survives.
The paraphrase does not.

*"Witchetty grub goes down like a Rich Tea"* — survives.
*"Hales is understated about food"* — does not.

These verbatim notes go into:
`/[project]/docs/character-notes-raw.md`

---

## SECTION 4 — RESEARCH PROTOCOL

For each character, domain or concept requiring external knowledge:

1. Rod introduces — what he knows, what he remembers, what he suspects
2. Claude researches — web search with the lens of the comedy register Rod has set
3. Rod validates — confirms, corrects, adds what research missed

**The Wayne Riley / Les Hales Rule** (formalised):
Claude never assumes biographical accuracy from training memory alone.
All character facts are verified by research before entering a character file.
All character *registers* are validated by Rod before the file is considered complete.

Research findings that contradict Rod's memory: surface immediately, discuss,
resolve explicitly. Do not silently prefer either source.

---

**STANDING RULE — PERSONAL MEMORY COMES FIRST. EVERY CHARACTER. NO EXCEPTIONS.**

Rod has spent years watching these people. Decades in some cases.
These are intimate, one-way relationships built from hundreds of hours of observation.
That is not a casual viewer's opinion. That is primary source material.

Rod's memories set the register. Research fills the gaps. Wikipedia gives facts.
Rod gives texture. Texture is what makes the comedy land.

The specific phrase Rod uses about a character — verbatim, unpolished, exactly as said —
is more valuable than any biographical summary Claude can produce. It contains the
comedy engine in seed form. Paraphrasing it loses the seed.

**For every new character introduced, Claude must ask Rod first:**
- "What do you remember about them?"
- "What made you laugh?"
- "What made you wince?"
- "What made you trust or distrust them?"
- "Any specific moment or scene that stays with you?"

Rod's answers go into character-notes-raw.md verbatim BEFORE any research begins.

This is not optional. This is not skippable when Rod seems confident about a character.
This is the protocol. Every character. Every time.

The stalker relationship is the product. Rod's love for these people — genuine,
long-standing, slightly obsessive, always looking for the comedy that shouldn't be there
— is what separates Survival School from a Wikipedia panel app.

Research confirms and fills gaps. Rod's memory sets the soul.

---

Character files are not complete until:
- [ ] Rod's personal memory captured verbatim FIRST
- [ ] Biographical facts verified by research
- [ ] Register validated by Rod's memory
- [ ] Comedy engine named and agreed — must trace back to something Rod said
- [ ] Panel dynamics with at least two other characters drafted

---

## SECTION 5 — FOUNDING PHILOSOPHY DOCUMENT

One page. Written before any technical or design work.

Contains:
- The founding moment (from Section 2) — verbatim
- What this product is
- What this product is not (explicit — the things that would dilute it)
- Why the comedy is real (the knowledge/integrity foundation)
- The single sentence that everything else gets checked against

**Template structure:**

```
[The founding moment — verbatim, unadorned]

That is what this is.

[What it is — two or three sentences]

[What it is not — explicit list]

[The line everything gets checked against — one sentence]
```

File lives at: `/[project]/docs/founding-philosophy.md`

This document does not get updated lightly. It is the constitution.
Design decisions that contradict it require an explicit decision to amend it,
not a silent drift away from it.

---

## SECTION 6 — DOMAIN / KNOWLEDGE ARCHITECTURE

Before any code — decide what files this product needs to exist.

For knowledge-based products (Survival School, Veritas, Cusslab panels):
- What are the knowledge domains?
- One file per domain or combined registry?
- Character files: voice layer or knowledge layer or both?
- What does the app query when a question comes in?

**The Anti-Corruption Layer rule:**
Knowledge lives in files. Not in the model's training memory.
Not in the internet. In files the app controls and can verify.

Produce a file architecture diagram — even a simple tree — before the first
line of code is written. Agree it explicitly. It is hard to change later.

---

## SECTION 7 — PANEL / CAST REGISTRY (if applicable)

Full roster with for each character:
- Name
- One-line register description
- Comedy engine (the specific tension or gap that generates humour)
- Status: Confirmed / Backlog / Ruled Out

Ruled Out entries must include reason. Knowing what is NOT in the product
is as important as knowing what is.

File lives at: `/[project]/docs/panel-registry.md`

---

## SECTION 8 — FOUNDING BACKLOG

Every idea generated during New Project Start that is not the first build.

Format: `[PREFIX]-NNN: [Title]` with one-line description and status.

Status options:
- `FOUNDING` — core to the product, build sequence TBD
- `NEXT` — clearly the next thing after first build
- `IDEAS` — worth considering, not yet committed
- `PARKED` — good idea, wrong time, revisit explicitly

All backlog items from this session get this prefix from day one.
No orphaned ideas. Everything is either in the backlog or ruled out.

---

## SECTION 9 — FIRST BUILD DECISION

One thing. Decided explicitly. Written down.

Not drifted into. Not the most exciting thing. The thing that:
- Tests the founding philosophy fastest
- Requires the least build effort to be meaningful
- Produces something a real user could interact with
- Generates validated learning (HDD loop — does this solve the right problem?)

Write the first build as a BDD scenario:

```gherkin
Given [a user in this context]
When [they do this one thing]
Then [they experience this founding philosophy moment]
```

If you cannot write this scenario cleanly — the first build is not yet defined.
Keep talking until it is.

---

## SECTION 10 — NEW PROJECT START COMPLETION CHECK

New Project Start is complete when ALL of the following exist:

- [ ] Project registered in `.claude/projects.md`
- [ ] Founding moment captured verbatim
- [ ] Founding philosophy document written and agreed
- [ ] Character/entity raw notes captured verbatim
- [ ] Research protocol applied to at least the first character or domain
- [ ] File architecture decided and documented
- [ ] Panel/cast registry populated (confirmed + backlog + ruled out)
- [ ] Founding backlog written with correct prefix
- [ ] First build defined as a BDD scenario
- [ ] Session protocol updated if needed

When all boxes are checked: New Project Start is done.
Session protocol takes over. First proper session can begin.

---

## APPENDIX — TRIGGER INTEGRATION WITH SESSION STARTUP

Session startup should include the following check at the top:

```
Is this the first session on a new project?
→ YES: Fetch .claude/new-project-start.md and run completely before proceeding.
       Do not continue session startup until New Project Start is complete.
→ NO: Continue session startup as normal.
```

The "new project" fuzzy trigger in conversation bypasses session startup entirely
and goes straight to this protocol. Session startup runs after New Project Start
completes, at the start of the first working session proper.

---

*The scaffolding that builds the scaffolding.*
*Run it once. Run it properly. Everything else follows.*
