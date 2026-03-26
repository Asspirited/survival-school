# Waste Log — Survival School
# Prefix: WL-SS-NNN
# What goes here: defects, waits, over-processing, complexity, risks (potential waste)
# What does NOT go here: feature requests, planned work, hypotheses (those are BL items)

---

## OPEN ITEMS (update this block each session)

| ID | Title | Status |
|----|-------|--------|
| WL-SS-001 | GitHub push auth broken in WSL terminal | Closed |
| WL-SS-002 | Shared state claimed GitHub repo existed — it didn't | Open |

---

## WL-SS-001 — GitHub push auth broken in WSL terminal

**Status:** Open
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-26

**Observation:** `git push` to github.com/Asspirited/survival-school fails with `fatal: could not read Username for 'https://github.com': No such device or address`. Remote is correctly configured. Issue is credential auth in the WSL environment.

**Waste impact:** Every commit requires a workaround or manual PAT injection. Blocks clean close-down of every session.

**Action:** Configure Git credential store or SSH key for GitHub in WSL. Recommended fix: set up SSH key (in your terminal: `ssh-keygen`, add public key to GitHub → Settings → SSH keys, change remote to `git@github.com:Asspirited/survival-school.git`).

---

## Format

```
## WL-SS-NNN — [Short title]

**Status:** Open | Closed | Accepted (won't fix)
**Category:** Defect | Wait | Over-processing | Complexity | Risk (potential waste)
**Severity:** High | Medium | Low
**Raised:** YYYY-MM-DD
**Closed:** YYYY-MM-DD (if applicable)

**Observation:** What was seen — specific, factual, no opinion.

**Waste impact:** What this costs per occurrence or over time.

**Action:** What to do — or "Accepted: [reason]" if deliberately leaving it.
```

---

## WL-SS-002 — Shared state claimed GitHub repo existed — it didn't

**Status:** Open
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-26

**Observation:** shared-session-state.md written in setup session stated "GitHub repo: github.com/Asspirited/survival-school" as created. Repo does not exist. Claude Code reported it as fact at startup without verifying.

**Waste impact:** Wasted push attempts, auth debugging, Rod's time and trust.

**Action:** Add repo existence check to session-startup.md. Never report shared state facts as verified without checking.
