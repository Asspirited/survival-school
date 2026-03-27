# Waste Log — Survival School
# Prefix: WL-SS-NNN
# What goes here: defects, waits, over-processing, complexity, risks (potential waste)
# What does NOT go here: feature requests, planned work, hypotheses (those are BL items)

---

## OPEN ITEMS (update this block each session)

| ID | Title | Status |
|----|-------|--------|
| WL-SS-001 | GitHub push auth broken in WSL terminal | Closed — SSH was already working, never broken |
| WL-SS-011 | SSH auth declared broken without checking — hours wasted | Open |
| WL-SS-012 | Claude declared "I'll fix it permanently" on auth — never checks what already works | Open |
| WL-SS-002 | Shared state claimed GitHub repo existed — it didn't | Open |
| WL-SS-003 | wrangler.jsonc at /home/rodent/ routes deploys to wrong worker | Open |
| WL-SS-004 | iframe height not applied to new panels — tiny box delivery | Closed |
| WL-SS-005 | No pipeline built for SS — features shipped with zero automated testing | Closed — L0-L3 pipeline live 2026-03-27 |
| WL-SS-006 | Session startup protocol skipped repeatedly — work started before startup complete | Open |
| WL-SS-007 | Deathmatch and Fact-Checker broken — asked 6 sessions, never fixed until 2026-03-27 | Closed |
| WL-SS-008 | Missing iframe CSS for Fact-Checker and Deathmatch — rendered as zero-height boxes | Closed |
| WL-SS-009 | Missing State/UI/API object declarations in How Screwed and I've Been Bit — JS ReferenceError on all user actions | Closed |
| WL-SS-010 | Acceptance tests checked page load and nav badges only — structural integrity and JS wiring invisible to pipeline | Closed |
| WL-SS-013 | Deploy instruction treated as auth event — sent user to Cloudflare dashboard when token already in hand from same session | Open |

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

---

## WL-SS-003 — wrangler.jsonc at /home/rodent/ routes deploys to wrong worker

**Status:** Open
**Category:** Defect / Risk
**Severity:** High
**Raised:** 2026-03-27

**Observation:** `/home/rodent/wrangler.jsonc` exists with `name: "rodent"` and `assets: { directory: "cusslab" }`. Wrangler walks up the directory tree to find config. Any deploy from inside `/home/rodent/**` without `--config` uses this file instead of the project's own `wrangler.toml`. This caused multiple deploys to go to the wrong worker silently (no error).

**Waste impact:** Silent wrong-worker deploys. Time spent debugging what appeared to be missing deployments. Changes deployed to "rodent" worker not "cusslab-api". High risk of repeat.

**Action:** All cusslab-api deploys must use `CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy --config /home/rodent/cusslab/wrangler.toml`. Memory updated. Could also delete /home/rodent/wrangler.jsonc if it's not needed — check first.

---

## WL-SS-005 — No pipeline built for SS — features shipped with zero automated testing

**Status:** Closed — L0-L3 pipeline live 2026-03-27
**Category:** Risk / Defect
**Severity:** High
**Raised:** 2026-03-27

**Observation:** Survival School has no pipeline at all. No unit tests, no contract tests, no Gherkin acceptance tests, no UI tests, no NFT/OAT layer. Every feature shipped has been tested manually (if at all) and only after deploy. YGW has a full 5-layer pipeline (auth canary → unit → contract → acceptance → UI → OAT). SS has none of this.

**Waste impact:** Every session risks shipping broken features. Every deploy is a gamble. Bugs only discovered by Rod after deploy. Estimated cost: hours of rework per session, plus trust erosion.

**Action:** Build SS pipeline matching YGW pattern (scripts/pipeline-report.sh, tests/domain.test.js, tests/contract.verify.test.js, tests/acceptance/, tests/ui/). Wire into deploy.sh as a gate. This must be the FIRST item next session before any feature work.

---

## WL-SS-006 — In-session protocol skipped repeatedly — 4 loops not followed

**Status:** Open
**Category:** Defect / Process
**Severity:** High
**Raised:** 2026-03-27

**Observation:** In-session delivery cycle (4 loops: HDD → DDD → BDD → TDD) not followed across multiple sessions. Features built without Gherkin gate, without failing tests, without pipeline green check. Steps skipped silently, not reported. Pipeline never built as part of project setup (new-project-start.md Section 6). This is not just a startup issue — it's an in-session issue every time.

**Waste impact:** Every session requires Rod to re-correct behaviour. ~10 corrections given. Time wasted. Trust eroded. Features shipped untested.

**Action:** Every step in the 4 loops requires explicit confirmation from Rod before proceeding — no autonomous skipping. Claude must ask if a step seems skippable. Self-report any skip immediately when it happens.

---

## WL-SS-004 — iframe height not applied to new panels — tiny box delivery

**Status:** Closed
**Category:** Defect
**Severity:** Medium
**Raised:** 2026-03-27
**Closed:** 2026-03-27

**Observation:** index.html only had iframe height CSS for `#panel-screwed`. When `#panel-worst` and `#panel-mundane` were added, they had no height rule and rendered at browser default (~150px). Delivered live in this state.

**Waste impact:** User saw broken layout on two new features. Trust impact.

**Action:** Fixed — shared rule covering all three iframe panels. Root cause: pattern not documented when first implemented for How Screwed Am I.

---

## WL-SS-007 — Deathmatch and Fact-Checker broken — asked 6 sessions

**Status:** Closed
**Category:** Defect / Process
**Severity:** High
**Raised:** 2026-03-27
**Closed:** 2026-03-27

**Observation:** Animal Deathmatch and Bear Fact-Checker showed "coming soon" in the home nav and panel despite being listed as DONE in the backlog. Deathmatch: route existed in worker, standalone page existed, but home panel still showed "coming soon" placeholder instead of iframe. Fact-Checker: no standalone page existed (SS-008 implemented footnotes only), home panel showed "coming soon". Rod raised this in at least 6 consecutive sessions.

**Waste impact:** 6+ sessions of unresolved bugs. Trust eroded. Rod's time wasted. Significant frustration.

**Action:** Fixed 2026-03-27. Deathmatch: panel updated to iframe. Fact-Checker: standalone interactive page built, route added, panel updated to iframe. Both nav badges changed to LIVE. Deployed.

**Root cause:** Session protocol skipped (WL-SS-006 pattern). No pipeline to catch regression. Live features confirmed by acceptance test: 12/12 pass.

---

## WL-SS-008 — Missing iframe CSS for Fact-Checker and Deathmatch

**Status:** Open
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-27

**Observation:** When Fact-Checker and Deathmatch were shipped as live iframes (WL-SS-007 fix), the home page CSS selector for iframe height/width was not updated. Only `#panel-screwed`, `#panel-worst`, `#panel-mundane` had iframe styles. `#panel-fact-checker` and `#panel-deathmatch` had no width, height, or display CSS — iframes rendered as zero-height invisible boxes.

**Waste impact:** Both features shipped visually broken. User could not interact with them at all.

**Action:** Added `#panel-fact-checker` and `#panel-deathmatch` to both the base iframe CSS selector and the mobile `@media (max-width: 480px)` override. Fixed 2026-03-27. Awaiting deploy.

---

## WL-SS-009 — Missing State/UI/API object declarations — JS ReferenceError on all user actions

**Status:** Open
**Category:** Defect
**Severity:** Critical
**Raised:** 2026-03-27

**Observation:** How Screwed Am I and How Bad Is This pages use `State.xxx()`, `UI.xxx()`, `API.xxx()` in their `// === main ===` sections, but `const State`, `const UI`, `const API` were never declared. Every user action (chip click, button press, text input) threw `ReferenceError: State is not defined` or similar. How Screwed Am I also had an orphaned `};` with no matching open — likely a SyntaxError crashing the entire script.

**Waste impact:** How Screwed Am I: 100% non-functional. How Bad Is This: chips appeared to visually work (DOM manipulation before the State call) but state was never updated and the assess button did nothing.

**Action:** Added `const State = { ... }`, `const UI = { ... }`, `const API = { ... }` declarations to both pages, matching the functions defined in each module section. Fixed 2026-03-27. Awaiting deploy.

**Root cause:** Code assembled from inline module sections (characters.js, state.js, ui.js, api.js, main) but the module-to-object wiring was missing. No test existed to catch this — pipeline acceptance tests check nav badges but not feature functionality. WL-SS-005 and WL-SS-010 (testing gap) are the systemic causes.

---

## WL-SS-011 — SSH auth declared broken without checking — hours wasted

**Status:** Open
**Category:** Defect / Process
**Severity:** Critical
**Raised:** 2026-03-27

**Observation:** WL-SS-001 was logged as "GitHub push auth broken in WSL". SSH key (`id_ed25519`) existed. Remote was already `git@github.com`. `ssh -T git@github.com` returned "Hi Asspirited!" immediately. Auth was never broken. Claude declared it broken without running a single check. Hours wasted last session and this session on a non-existent problem.

**Waste impact:** Hours of Rod's time across two sessions. Massive trust damage.

**Action:** BEFORE declaring any auth broken: run `ssh -T git@github.com` and `git remote -v`. If SSH responds and remote is `git@`, push will work. Check first. Always.

---

## WL-SS-012 — Claude repeatedly declares auth "fixed permanently" without verifying what already exists

**Status:** Open
**Category:** Process / Recurring
**Severity:** Critical
**Raised:** 2026-03-27

**Observation:** Pattern across all projects: Claude declares auth broken → spends sessions "fixing" it → it was never broken, or the fix doesn't persist. Root cause every time: Claude acts before reading what's already in place. SSH keys, tokens, remotes — all checked AFTER wasting time, not before.

**Waste impact:** Cumulative 18+ hours, ~£1,900 across all projects. This instance: 2+ sessions on SSH that worked from the start.

**Action:** Auth check sequence before ANY git or deploy complaint:
1. `ls ~/.ssh/` — key exists?
2. `ssh -T git@github.com` — auth works?
3. `git remote -v` — remote is SSH not HTTPS?
4. Only if all three fail: investigate further.

---

## WL-SS-013 — Deploy instruction treated as auth event

**Status:** Open
**Category:** Over-processing / Recurring
**Severity:** High
**Raised:** 2026-03-27

**Observation:** After a successful deploy at session start with a known working token, Claude issued the next deploy instruction with "In Cloudflare, dash.cloudflare.com → API token if needed" — implying the user might need to go get a new token. Token was already in hand. This is the same pattern as WL-SS-011/012: treating each deploy as a fresh auth problem rather than recognising a working token was just used.

**Waste impact:** Frustration, broken flow, unnecessary auth theatre during active build work.

**Action:** When a deploy was completed in the same session, next deploy instruction must say "same token as before" and give only the command. Never mention the Cloudflare dashboard unless the previous deploy explicitly failed with auth error.

---

## WL-SS-010 — Acceptance tests blind to structural integrity and JS wiring

**Status:** Open
**Category:** Risk (potential waste)
**Severity:** High
**Raised:** 2026-03-27

**Observation:** The L3 acceptance test suite (tests/acceptance/acceptance.test.js) checked: page returns 200, page contains certain HTML element IDs, nav badge shows LIVE. It did NOT check: (a) that all live iframe panels have CSS height applied, (b) that interactive pages declare their State/UI/API module objects. Both WL-SS-008 and WL-SS-009 were invisible to the pipeline. Features were visually broken (tiny box, no response) while the pipeline showed green.

**Waste impact:** Every deployment could ship silently broken features. Pipeline provides false confidence. Rod discovers bugs manually on his phone at bedtime.

**Action:** Added two new L3 describe blocks to tests/acceptance/acceptance.test.js:
1. `Feature: Live iframe panels have CSS height applied in home page` — iterates LIVE_IFRAME_PANELS and asserts the CSS selector `#panel-xxx iframe` exists in the home HTML. New live panels must be added to this array before going live.
2. `Feature: Interactive pages declare State, UI, and API module objects` — checks each interactive page HTML for `const State = {`, `const UI = {`, `const API = {`. Catches missing module wiring immediately.

**Next gap to close:** L4 Playwright tests that actually click a chip and verify the `sel` class is added, submit a form and verify loading state appears. These are the only tests that catch JavaScript execution failures in the browser context. Tracked as SS-040 (pipeline build, in progress).
