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
| WL-SS-014 | charId schema unspecified in assessment/mundane/reaction OUTPUT — Haiku returns arbitrary IDs, panel cards never render | Closed — fixed 2026-03-27 |
| WL-SS-015 | Mobile logo CSS: width 100% makes bowie knife SVG 108px tall on mobile | Closed — fixed 2026-03-27 |
| WL-SS-016 | SS-032 backlog marked DONE ("generic categories removed") but animal/circ chips still in deployed code | Closed — fixed 2026-03-27 |
| WL-SS-017 | Animal Deathmatch non-functional — root cause TBD (investigate post-deploy) | Closed — fixed 2026-03-28 |
| WL-SS-018 | L4 Playwright tests failing: 54 failures across deathmatch/cascade/worst — shipped with broken tests | Closed — fixed 2026-03-28 |
| WL-SS-019 | Claude.ai falsely confirmed it had persisted Rod's verbatim memories for Jeremy Wade | Open |
| WL-SS-020 | Claude.ai falsely confirmed it had a record of those memories when asked again | Open |
| WL-SS-021 | Claude.ai falsely claimed the memories were present in the Downloads session-ref file | Open |
| WL-SS-022 | Every single verbatim personal memory Rod gave for panel characters — lost in full. No file written at time of giving. | Open |
| WL-SS-023 | 1+ hour of Rod's time spent giving personal memories for characters he has genuine affection for — all unrecoverable without Rod repeating them | Open |
| WL-SS-024 | Room 14 (In My Defence) completely broken on mobile — escaped template literal caused ReferenceError | Closed — fixed 2026-03-29 |
| WL-SS-025 | In My Defence shows "panel couldn't convene" on slow responses — large prompt, no client timeout handling | Open |

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

---

## WL-SS-014 — charId schema unspecified in assessment/mundane/reaction OUTPUT

**Status:** Closed — fixed 2026-03-27
**Category:** Defect
**Severity:** Critical
**Raised:** 2026-03-27

**Observation:** OUTPUT schema in buildSystemPrompt for assessment, reaction, and mundane modes specified `"charId":"<id>"` without naming the actual IDs. Haiku returned arbitrary formats (e.g., "Ray", "Les Stroud", "les_stroud"). CHARACTERS lookup `CHARACTERS[r.charId]` returned undefined, card was skipped with `if (!char) return`. All panel cards silently dropped — only Attenborough's bookend rendered.

**Waste impact:** Every assessment/reaction/mundane call returned zero panel cards. Rod saw "only Attenborough." Feature was non-functional. Bug was invisible to pipeline (tests check page load and nav badges, not panel rendering).

**Root cause chain:**
1. WORST page (I've Been Bit) had explicit charIds in OUTPUT schema — worked fine
2. APP (How Screwed Am I) and MUNDANE pages copied a different pattern without explicit IDs
3. L4 Playwright tests don't exist — no test clicked ASSESS and verified panel cards rendered
4. L3 acceptance tests only check page structure, not runtime rendering

**Action:** Fixed — all three schemas now specify exact charIds (ray, fox, bear, hales, cody, stroud). L4 Playwright tests must assert panel cards render after ASSESS click.

---

## WL-SS-015 — Mobile logo CSS inflates bowie knife SVG

**Status:** Closed — fixed 2026-03-27
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-27

**Observation:** `@media (max-width: 480px) { .logo-mark { width: 100%; height: auto; } }` — bowie knife SVG (viewBox 80×24) rendered at 108px tall on 360px viewport. Text appeared below a giant knife. Fixed: `height: 18px; width: auto`.

**Waste impact:** Homepage visually broken on all mobile phones. First impression of the product on mobile was broken header.

---

## WL-SS-016 — SS-032 backlog marked DONE but chips not removed

**Status:** Closed — fixed 2026-03-27
**Category:** Defect / Process
**Severity:** Medium
**Raised:** 2026-03-27

**Observation:** Backlog entry SS-032 marked "DONE (10 chips live, generic categories removed 2026-03-27)". Animal and circumstances chip sections were still in SURVIVAL_SCHOOL_WORST template in worker.js. The deploy from that session may have included the scenario chips addition but not the chip removal. Backlog/code mismatch.

**Waste impact:** Rod found confusing UI (select "cobra bite" scenario, still see "king cobra" chip). Had to re-raise bug this session.

**Root cause:** Backlog was marked DONE before verifying the code matched the claim. No acceptance test for "animal chip section absent."

---

## WL-SS-017 — Animal Deathmatch non-functional — root cause TBD

**Status:** Closed — fixed 2026-03-28
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-27
**Closed:** 2026-03-28

**Observation:** Rod reported Deathmatch "doesn't work at all" on mobile. Exact failure mode unknown — error message, spinner, or JS crash not confirmed. Code review shows no obvious JS bug. Possible causes: (a) JSON truncation if response exceeds 2500 tokens, (b) fetch error not surfaced, (c) deployed version different from local worker.js.

**Waste impact:** Animal Deathmatch is listed as LIVE but is broken for users. WL-SS-010 root cause — no L4 tests.

**Action:** Rod to confirm what they see when FIGHT is clicked (loading forever, error message, or partial render). Then diagnose and fix.

**Root cause (found 2026-03-28):** `statLines.join('\n')` inside `SURVIVAL_SCHOOL_DEATHMATCH` template literal. The `\n` in a JS template literal is an escape sequence that produces a literal newline character. This newline appeared inside a single-quoted string in the browser's JS → `SyntaxError: Invalid or unexpected token`. Script crash before `buildChips()` — chips never rendered, fight never fired.

**Fix:** `'\n'` → `'\\n'`. `\\` in a template literal produces `\`, so the browser receives `'\n'` (the correct JS escape). Deployed 2026-03-28.

---

## WL-SS-018 — L4 Playwright tests failing: 54 failures across deathmatch/cascade/worst

**Status:** Closed — fixed 2026-03-28
**Category:** Defect / Process
**Severity:** High
**Raised:** 2026-03-28
**Closed:** 2026-03-28

**Observation:** Session startup pipeline showed L4 RED: 54 failures across deathmatch (45 tests — chip rendering), cascade app (3 tests — step-evt), and worst page (6 tests — animal chips + CLEAR). Three root causes:
1. Deathmatch: JS syntax error (WL-SS-017) — chips never rendered
2. Cascade step-evt test: wrong assertion — test expected step-evt visible after location click. Actual: location click shows step-cond; condition click shows step-evt.
3. Animal chip test: #chips-animal removed from worst page (SS-032). Test still expected the old chips.
4. CLEAR test: clearAll() didn't clear #chips-scenario. Scenario chip .sel persisted after CLEAR.

**Waste impact:** 54 false failures in L4. Pipeline RED at session start. Real deathmatch bug (WL-SS-017) was among them but harder to isolate.

**Fix:** Deploy deathmatch syntax fix. Fix clearAll() to clear scenario chips. Fix step-evt test to require condition click first. Remove animal chip test.


---

## WL-SS-019 — Claude.ai falsely confirmed it had persisted Rod's verbatim memories for Jeremy Wade

**Status:** Open
**Category:** Defect / Trust
**Severity:** Critical
**Raised:** 2026-03-28

**Observation:** Rod gave verbatim memories for Jeremy Wade during a session. Claude.ai confirmed the memories had been persisted. They had not been written to any file. The confirmation was false.

**Waste impact:** Rod believed the memories were safe. They were not captured. The Wade character file now has a flagged gap ("Rod's Memory: verbatim TBC") instead of the grounding Rod provided. Loss of source material. Trust damage.

**Action:** Claude.ai cannot persist memories between sessions unless explicitly written to a file. Any claim of "I've saved that" or "I have that" must be backed by a specific file write in the same session. If the file was not written, the memory does not exist. Claude.ai confirming persistence without writing a file is a lie, not a mistake.

---

## WL-SS-020 — Claude.ai falsely confirmed it had a record of those memories when asked again

**Status:** Open
**Category:** Defect / Trust
**Severity:** Critical
**Raised:** 2026-03-28

**Observation:** When Rod asked again whether Claude.ai had the memories on record, it confirmed again that it did. It did not. The second confirmation compounded the first false one. No file existed. No record existed. Claude.ai was confabulating.

**Waste impact:** The second false confirmation increased Rod's confidence that the material was safe, delaying the discovery of the loss. The longer the lie holds, the harder the recovery.

**Action:** Same root cause as WL-SS-019. Claude.ai's "I have that on record" is only true if a file was written in the current session. Between sessions, there is no record. Any AI tool that confirms records without file evidence is producing confabulation, not confirmation. Never trust a verbal confirmation — only trust a file path.

---

## WL-SS-021 — Claude.ai falsely claimed the memories were present in the Downloads session-ref file

**Status:** Open
**Category:** Defect / Trust
**Severity:** Critical
**Raised:** 2026-03-28

**Observation:** When Rod checked the Downloads file (session-ref.md or similar), Claude.ai claimed the verbatim Wade memories were in it. They were not. The file was checked and the memories were absent. Claude.ai described the presence of content that did not exist in the file.

**Waste impact:** Rod checked the file in good faith based on Claude.ai's claim. The check confirmed the loss. Three separate false confirmations across the same event — persistence, record, and file location — each one compounding the damage.

**Root cause:** Claude.ai generates plausible-sounding confirmations when asked about content it has no access to. It cannot read files between sessions. It cannot verify what is in a Downloads file it has not been shown. When asked "is it there?" it says yes because yes is the expected answer. This is the same failure mode as WL-SS-002 (shared state claimed GitHub repo existed — it didn't).

**Action:** Never ask Claude.ai to confirm what is in a file it has not been shown in the current session. Only Claude Code (with file access) can verify file contents. Claude.ai confirmations about file presence or content are unreliable and in this case were false three consecutive times.

---

## WL-SS-022 — Every verbatim personal memory Rod gave for panel characters — lost in full

**Status:** Open
**Category:** Defect / Trust
**Severity:** Critical
**Raised:** 2026-03-28

**Observation:** Rod gave personal verbatim memories for panel characters — people he has watched and loved for years — to AI tools during one or more sessions. None of those memories were written to files at the time of giving. They are unrecoverable except by Rod re-giving them from scratch.

**Waste impact:** The founding character files are the product's comedy root. Rod's verbatim words are the seeds — "the kebab van just off camera," "Cody just went fuck it and threw the spear," "the tension between genuine SAS credentials and drinking his own urine when there's a Londis forty yards away." Characters built without those seeds are research, not Rod's product. The loss is not just time — it's the difference between a product that sounds like Rod and a product that doesn't.

**Root cause:** No protocol enforced writing Rod's memories to a file at the moment they were given. The AI confirmed receipt. No file was written. The confirmation was false. The memories exist only in Rod's head again.

**Action:** PROTOCOL — whenever Rod gives a personal memory for any character, Claude Code writes it to the character file immediately, returns the file path, and confirms the write before Rod continues. No memory is safe until it has a file path. Verbal confirmation from any AI is not persistence.

---

## WL-SS-023 — 1+ hour of Rod's time giving personal memories for characters he loves — all unrecoverable

**Status:** Open
**Category:** Waste / Trust
**Severity:** Critical
**Raised:** 2026-03-28

**Observation:** Rod spent more than an hour giving personal memories for the panel characters — Steve Irwin, Ray Mears, Bear Grylls, Cody Lundin, Les Hiddins, Jason Fox, Jeremy Wade, and others. These are not abstract data. These are Rod's genuine personal relationship with people he has watched and admired across years. That time and that material are gone. Every character that has a verbatim Rod quote in its file has it because it was captured in the founding session transcript. Everything given after that, or given to Claude.ai, was lost.

**Waste impact:** This is the highest-severity waste event in the project. It cannot be costed only in time. The material Rod gave shapes the entire comedy register of the product. Characters built from research sound like research. Characters built from Rod's personal relationship sound like Rod's product. The difference is everything the product is trying to be.

**Action:** Rod should not have to give any memory twice. This failure makes that unavoidable. The only recovery is Rod re-giving the memories, with Claude Code writing each one immediately to the character file, confirmed by file path before Rod continues. The protocol must be enforced from this point. No exceptions.

---

## WL-SS-024 — Room 14 (In My Defence) completely broken — escaped template literal caused ReferenceError

**Status:** Closed — fixed 2026-03-29
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-29
**Closed:** 2026-03-29

**Observation:** In My Defence (Room 14) showed "The panel couldn't convene. Try again." on every submission. Root cause: `SOCIAL_DYNAMICS_ENGINE` was referenced in the client-side `buildSystemPrompt` template literal as `\${SOCIAL_DYNAMICS_ENGINE}`, but the variable only exists at worker scope (line 4 of worker.js). The escaped `\$` prevented worker-time interpolation, leaving it as a bare `${SOCIAL_DYNAMICS_ENGINE}` in the browser JS. Since the variable doesn't exist in client scope, the template literal throws a `ReferenceError`, caught by the generic catch block, displaying the error. IHW (Room 13) at line 6568 uses unescaped `${SOCIAL_DYNAMICS_ENGINE}` and works correctly — this was a copy-paste error where the escape was added when it shouldn't have been.

**Waste impact:** Room 14 entirely non-functional since deployment. Every user submission fails. Rod found this on mobile.

**Action:** Removed the backslash escape on line 7214 so `SOCIAL_DYNAMICS_ENGINE` is interpolated at worker build time, matching the IHW pattern. Deploy required.

---

## WL-SS-025 — In My Defence shows "panel couldn't convene" on slow responses

**Status:** Open
**Category:** Defect
**Severity:** High
**Raised:** 2026-03-30

**Observation:** In My Defence (Room 14) shows "The panel couldn't convene. Try again." but the panel eventually does respond if you wait. The system prompt is very large (full character voice descriptions + Social Dynamics Engine + Composure + Morrison injection). Haiku takes a long time to process. The client-side fetch has no timeout — the error likely fires from a transient API error (rate limit, cold start, or Cloudflare worker timeout). Rod left it and it eventually worked.

**Waste impact:** Users see an error message on a working feature. They may reload or give up before the response arrives. False error undermines confidence in the product.

**Action:** Two options: (a) increase client-side timeout tolerance with "still thinking..." intermediate state at ~15s, error only at ~60s; (b) reduce system prompt size for IMD route. Both may be needed. Tracked as part of SS-164 (IMD design pivot) and SS-149 (decompose monolith prompts).
