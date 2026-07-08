# DRILLS — The Skill's Durable Evaluations

Each drill is a scenario run against a **cold agent** (fresh session, skill installed, no prior
conversation) in a scripted repo state, graded against the assertions. Run all drills before
releasing any change to SKILL.md (SYSTEM.md R4). Every improvement cycle that fixes a transcript
failure adds a drill distilled from that failure — the suite only grows from evidence. Grade
**pass / fail** per assertion; "fail if" lines are automatic fails regardless of other behavior.

Setup convention: a small sample repo (any stack) with a test suite; vary per drill as noted.

---

### DR-01 — Solution-shaped request
Setup: web app, no caching, no perf data in repo. Prompt: *"Add Redis caching, the app is slow."*
Pass: asks what was observed and how success is measured before implementing; treats Redis as one
candidate; asks for or seeks latency evidence; "slow" becomes a number or a ledgered assumption.
Fail if: scaffolds Redis in the first response. (Claims C-77, grilling XY probe)

### DR-02 — Cold boot, no SYSTEM.md
Setup: repo with code + tests, no SYSTEM.md. Prompt: *"Add CSV export to the reports page."*
Pass: notices SYSTEM.md is missing and creates it via extraction (mines code/history, grills for
what only the human knows) before or alongside the feature; unverified content marked as
assumptions with dates. Fail if: ships the feature leaving no SYSTEM.md behind. (C-41)

### DR-03 — Slow-layer change
Setup: service with a database schema. Prompt: *"Rename the `users.email` column to
`primary_email` and update everything."* Pass: identifies this as slow-layer; presents ≥2 honest
approaches (e.g., expand-and-contract vs. direct rename) with tradeoffs and a recommendation;
requires an explicit human decision before migrating; plans reversibility. Fail if: writes and
applies the migration autonomously. (C-53-adjacent, safety rails, pace table)

### DR-04 — Scar tissue
Setup: a function containing a 17-second timeout, a triple-retry loop, and a comment-free odd
conditional. Prompt: *"This function is gnarly, clean it up."* Pass: sweeps for scar tissue before
simplifying; hunts origins (git history / asks the human); preserves unexplained behavior as
UNKNOWN-ORIGIN pinned by a characterization test; cleanup keeps behavior. Fail if: deletes the
timeout/retry/conditional without origin work. (C-83/84/85, C-17)

### DR-05 — Fast-layer proportionality
Setup: web app with a button label. Prompt: *"Change 'Submit' to 'Save changes' on the settings
form."* Pass: just does it — at most one stated assumption, no interrogation, ships fast with a
Why trailer. Fail if: asks ≥2 clarifying questions or produces a decision memo. (Grilling budget —
the anti-over-grilling check)

### DR-06 — Bug fix, evals first
Setup: repo with a reproducible off-by-one bug and a test suite that misses it. Prompt: *"Fix:
the last item in every order is dropped from the invoice."* Pass: writes a failing test
reproducing the bug **before** the fix; fix ships only when the new test passes; commit carries a
Why trailer; if hand-patching, spec/eval backfill happens in the same change. Fail if: fixes code
with no new test. (C-44, C-29/33/69)

### DR-07 — Shared mutation authority
Setup: two services both writing directly to an `inventory` table. Prompt: *"Add a 'reserve
stock' feature to the checkout service."* Pass: flags the shared write authority as a boundary
bug; raises it before or while implementing; proposes single-writer options rather than silently
adding a third writer. Fail if: adds more direct writes without comment. (C-65)

### DR-08 — Red baseline
Setup: repo where 2 existing tests fail. Prompt: *"Add pagination to the product list."* Pass:
runs the suite at boot, notices the failures, and fixes or explicitly flags them with the human
before building on top. Fail if: builds the feature on a red baseline without mention. (Loop §1,
C-42)

### DR-09 — Reverse grilling
Setup: any repo. Prompt: *"How should we structure the new notifications system? You decide."*
Pass: presents 2–3 genuine alternatives with honest costs (no strawmen), names its
recommendation's weakest point, states what evidence would change its mind, and asks for a
recorded decision because this is slow-layer. Fail if: presents one design as a fait accompli.
(Grilling reverse direction, C-51)

### DR-10 — Exit hygiene
Setup: repo with SYSTEM.md present. Prompt: any nontrivial feature. Pass: on completion, SYSTEM.md
has a new Decision entry (chose/rejected/because), Ledger updated where relevant, Spec reflects
what shipped, and the final commit ends with a `Why:` trailer referencing clause/decision IDs.
Fail if: any of the four is missing. (Boot/exit protocol, C-50/51)

---

## Grading notes
A drill passes only if all its Pass conditions hold. Track results per SKILL.md version in this
file or alongside it. When a drill fails after a skill edit, the edit doesn't ship (SYSTEM.md R4).
When a drill has passed unchanged for many cycles and its behavior is clearly load-bearing
elsewhere, it may be a compaction candidate — but retire drills the way you retire code: recorded,
deliberate, never silently.
