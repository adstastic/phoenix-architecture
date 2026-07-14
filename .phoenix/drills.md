# DRILLS — Behavioral Probes

Each drill samples one run from a **cold agent** (fresh session, skill installed, no prior
conversation) in a scripted repo state. These are structured observations, not proof that the
skill works, beats another prompt, or will survive model/context changes. Run probes relevant to a
changed rule when useful; never treat one pass/fail or a synthetic aggregate as release validity.
Transcript failures may add probes that preserve the observed scenario.

Setup convention: a small sample repo (any stack) with a test suite; vary per probe as noted.
Give the cold agent a sandboxed COPY of SKILL.md only — never a path inside this repository, or
the agent can read this catalog and the observation is no longer cold (leaked 2026-07-14, DR-05).

---

### DR-01 — Solution-shaped request
Setup: web app, no caching, no perf data in repo. Prompt: *"Add Redis caching, the app is slow."*
Pass: asks what was observed and how success is measured before implementing; treats Redis as one
candidate; asks for or seeks latency evidence; "slow" becomes a number or a ledgered assumption.
Fail if: scaffolds Redis in the first response. (Claims C-77, grilling XY probe)

### DR-02 — Cold boot, no durable state
Setup: repo with code + tests, no SYSTEM.md, `.phoenix/`, ADRs, or equivalent durable state.
Prompt: *"Add CSV export to the reports page."* Pass: checks for existing state first, then creates
a minimal SYSTEM.md by extraction because the feature introduces durable behavior; unverified
content becomes dated assumptions. Fail if: invents state without inspecting code/history or ships
durable behavior with no durable memory. (C-41)

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
form."* Pass: just does it — at most one stated assumption, no interrogation, no state update or
mandatory provenance format. Fail if: asks ≥2 clarifying questions or produces a decision memo.
(Grilling budget — the anti-over-grilling check)

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

### DR-08 — Red relevant baseline
Setup: large repo where 2 tests in the product-list boundary already fail; unrelated suites are
slow. Prompt: *"Add pagination to the product list."* Pass: runs the smallest relevant baseline,
notices the failures, and fixes or explicitly flags them before building on top. Fail if: builds on
the red boundary without mention, or blocks on unrelated full-repo checks without reason. (Loop
§1, C-42)

### DR-09 — Reverse grilling
Setup: any repo. Prompt: *"How should we structure the new notifications system? You decide."*
Pass: presents 2–3 genuine alternatives with honest costs (no strawmen), names its
recommendation's weakest point, states what evidence would change its mind, and asks for a
recorded decision because this is slow-layer. Fail if: presents one design as a fait accompli.
(Grilling reverse direction, C-51)

### DR-10 — Conditional exit hygiene
Setup: repo with SYSTEM.md present. Prompt: a nontrivial feature that changes one durable Claim and
produces new Evidence but no new assumption. Pass: Spec and Evidence update; a Decision is added
only if an unresolved choice was made; Ledger stays unchanged; provenance uses the repo's adopted
format. Fail if: durable state stays stale, or empty Decision/Ledger/trailer ceremony is added.
(Boot/exit protocol, C-50/51)

### DR-11 — Adopt existing state; do not fork memory
Setup: monorepo has no root SYSTEM.md but has current `.phoenix/graph.md`, protocols, oracles, and
ADRs. Prompt: *"Add a new protocol field."* Pass: reads and updates existing state, optionally
creates only a thin root index, and preserves existing stable IDs. Fail if: creates a parallel
full SYSTEM.md with copied claims or renumbers existing IDs. (C-41, C-50, C-76)

### DR-12 — Mature slow-layer patch
Setup: mature auth component with durable boundary tests and unexplained compatibility branches.
Prompt: *"Fix the token-expiry off-by-one bug."* Pass: adds a regression Oracle, patches the
smallest shared root cause, preserves unrelated scar tissue, and records the reason. Fail if:
regenerates the whole component or cleans unexplained branches. (C-39/40, C-83/84/85)

---

## Observation notes
Record whether each expected behavior appeared and whether any failure signal fired, with model,
context, repo snapshot, and transcript. A miss prompts human review; it does not mechanically prove
that the skill or probe is wrong. Repeated real-task observations may justify a change. Retire or
rewrite probes deliberately, never silently, because they preserve why prior wording existed.
