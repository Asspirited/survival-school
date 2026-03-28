# OAT & NFT Principles — Survival School
# Operational Acceptance Testing + Non-Functional Testing
# Read when: the Three Amigos OAT/NFT gate question triggers (item touches production behaviour)
# Last updated: 2026-03-28

---

## Why This Document Exists

OAT and NFT concerns are not afterthoughts bolted on post-deploy. They are baked into design
from the first conversation about a feature, but validated in their own layer (L5) after deployment.

This document is the reference for **why** L5 exists and **what** operational concerns to design for.
It is triggered by the OAT/NFT gate question in the Three Amigos step of the delivery cycle.

---

## The Authorities

### Dan Ashby — Continuous Testing in DevOps (2016)

Testing is not a stage. It is an activity at **every stage** of the DevOps infinity loop:

| Stage | Testing activity |
|-------|-----------------|
| Idea | Test the idea itself — investigate, question, refine |
| Plan/Design | Exploratory testing of the design, risks as heuristics |
| Code | Code review, unit checks, pair programming |
| Build | Test the build process + exploratory in spun-up env |
| Merge | Integration risk monitoring |
| Release/Deploy | Test the deployment process, smoke/sanity, exploratory |
| Monitor | Test what's being monitored, explore the metrics |

**Applied to SS:** OAT concerns surface at Plan/Design (Three Amigos), are built into the
implementation, and are validated post-deploy (L5). They are not a separate workflow.

### DORA — Accelerate Research (Forsgren, Humble, Kim)

DORA's multi-year research across thousands of teams establishes:

1. **Speed and stability are NOT tradeoffs.** "The real trade-off is between *better software
   faster* and *worse software slower*." Elite teams win on all metrics simultaneously.
2. **Monitoring and observability positively predict continuous delivery performance.**
   Teams with comprehensive observability ship faster AND break less.
3. **Change failure rate correlates with rework rate.** Poor testability causes both.
   Fix testability, fix both metrics.
4. **Failed deployment recovery time** separates elite (< 1 hour) from low performers
   (> 6 months). The difference: observability (see it fast) + testability (isolate it fast)
   + operational readiness (know the remedial action).
5. **Symptom-based alerting** (user-facing impact) over cause-based alerting (noise).

**Applied to SS:** Every feature that touches production routes should be designed so that
failures are visible, diagnosable, and recoverable without Rod having to guess what broke.

### SRE — Site Reliability Engineering (Google)

SRE is the practical implementation of DevOps. Core concepts:

- **SLIs** (Service Level Indicators): what you measure (latency, error rate, throughput)
- **SLOs** (Service Level Objectives): what you promise (99.5% uptime, < 3s response)
- **Error budgets**: the noncompliance tolerance — when exceeded, stop shipping and fix
- **Toil reduction**: automate repetitive operational work
- **Self-healing**: systems that recover without human intervention

**Applied to SS:** A Cloudflare Worker with no persistent state has a narrow SRE surface,
but the principles apply: clear error messages, graceful degradation, known rollback path.

### Eric Evans — Domain-Driven Design

Bounded contexts create the architectural seams that make testability and observability possible:

- **Change isolation:** Each context evolves independently. A change in `characters.js`
  doesn't ripple into `worker.js` or HTML pages.
- **Testability by design:** Domain logic tests independently from infrastructure (L1 = 219
  tests, no network, no DOM).
- **Observability by design:** Monitor at the boundaries between contexts. For SS: worker
  response schema (L2), route liveness (L3), DOM behaviour (L4).

### Robert C. Martin — Clean Code + SOLID

SOLID principles explain why testable code is maintainable code:

| Principle | Testability effect | Observability effect |
|-----------|-------------------|---------------------|
| Single Responsibility | One test scope per component | One thing to monitor per component |
| Open/Closed | Extend without breaking tests | New instrumentation doesn't touch existing code |
| Liskov Substitution | Mockable boundaries | Swappable monitoring implementations |
| Interface Segregation | Focused tests on narrow contracts | Precise metrics per interface |
| Dependency Inversion | Testable in isolation | Inject monitoring at the boundary |

### Rob Meaney — 10 Ps of Testability

People, Philosophy, Product, Process, Problem, Project, Pipeline, Productivity, **Production**,
and Proactivity. Production is explicitly in the testability model — what happens after deploy
IS a testability concern, not a separate discipline.

---

## The Virtuous Cycle

Observability and testability reinforce each other:

- **Observability supports testability:** When you can see inside the system, you know what
  to test and where tests are missing.
- **Testability enhances observability:** When code is modular and decoupled, it is inherently
  easier to instrument. Boundaries exist, so you can observe at them.
- **Both drive quality outcomes:** Fewer defects, faster diagnosis, faster recovery, easier
  change over time.

This is not theory. DORA's research confirms: teams with high observability AND high testability
outperform on all four delivery metrics. They ship faster, break less, recover quicker, and
have lower rework rates.

---

## OAT Areas for Survival School

| Area | What it validates | When to design for it |
|------|-------------------|----------------------|
| **Liveness** | Every route responds correctly post-deploy | Any new route or route change |
| **Performance** | Response times within acceptable thresholds | Any worker logic change |
| **Error messages** | User-facing failures are clear and actionable | Any error path or API call |
| **Recovery** | Graceful degradation on transient failure | Any network-dependent feature |
| **Self-correction** | UI resets to usable state after errors | Any interactive feature |
| **Monitoring** | Health endpoint exists, errors are visible | Any deployment change |
| **Alerting** | Symptom-based: user impact, not internal noise | Any new failure mode |
| **Security** | No exposed secrets, safe input handling | Any user input or API key usage |
| **Rollback** | Known path to revert a bad deploy | Any deployment |
| **Supportability** | Clear remedial actions for known failure modes | Any new failure mode |

---

## The Gate Question

At Three Amigos, ask: **"Does this item touch production behaviour?"**

Signals that the answer is YES:
- New or changed worker route
- New or changed API call from browser to worker
- New or changed error handling
- New or changed user input processing
- Deployment procedure change
- Any item with keywords: worker, deploy, error, route, performance, monitoring

If YES: design for the relevant OAT areas above. Include operational acceptance criteria
in the Gherkin alongside the functional criteria.

If NO (pure data additions, docs, CSS-only, domain logic with no production surface):
move on. No overhead.

---

## L5 in the Pipeline

L5 is the automated validation layer for OAT concerns. It runs post-deploy and confirms:

1. Every live route responds with correct status and content-type
2. POST endpoints return valid JSON with required schema fields
3. Response times are within acceptable thresholds
4. Error responses are structured and user-friendly, not raw stack traces
5. No secrets are exposed in client-facing responses

L5 is distinct from L2 (contract tests) because L2 runs pre-commit against whatever is
currently deployed. L5 runs after a fresh deploy against the just-released version.

---

## References

- Dan Ashby, "Continuous Testing in DevOps" (2016) — danashby.co.uk
- Forsgren, Humble, Kim, "Accelerate" (2018) — DORA research
- DORA Capabilities: Monitoring and Observability — dora.dev
- Eric Evans, "Domain-Driven Design" (2003)
- Robert C. Martin, "Clean Code" (2008), SOLID principles
- Rob Meaney, "10 Ps of Testability" — via Xray blog
- Wikipedia, "Operational Acceptance Testing"
- AWS, "What is SRE?"
