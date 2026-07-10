---
name: phoenix-architecture
description: >-
  Phoenix Architecture discipline for non-trivial software work with AI coding agents, inspired by
  Chad Fowler's regenerative software writing. Use for system/product design, durable behavior,
  boundaries and data ownership, tests/evals, legacy extraction, refactors or rewrites, production
  drift, deletion, regeneration, or arrival in a codebase whose durable intent must be understood.
  Specs, evaluations, contracts, provenance, and data outlive implementations. Skip for tiny local
  edits whose intent, boundary, and check are already obvious.
---

# Phoenix Architecture — Seed

Minimal runtime discipline plus optional durable state (`SYSTEM.md` or an existing equivalent such
as `.phoenix/`, ADRs, or contract/eval docs). It targets minimal, reliable systems built by a
human–agent pair: neither vague intent nor plausible output is accepted unexamined.

## Premise

Generation is cheap; comprehension, verification, and safe replacement are the bottleneck. The
system — behavior, boundaries, data, and invariants — is the asset; code is its current Rendering.
Five artifacts must survive implementation deletion: **specification**, **evaluations**,
**boundaries**, **provenance**, and **data**.

Working vocabulary: a **Claim** is an atomic specification clause; a **Boundary** owns Claims and
mutation; an **Oracle** evaluates Claims; a **Rendering** is the current implementation; and
**Evidence** is dated Oracle output that can age or invalidate a Rendering. No meaningful Rendering
change proceeds until Claim, Boundary, and minimum Oracle are clear enough for its risk.

Master diagnostic: if the implementation vanished, what would tell you a regenerated version is
correct? If the honest answer is "the old code," extract its hidden knowledge before replacing it.

## Durable state

At boot, read existing durable memory in this order: root `SYSTEM.md`, an existing state system
such as `.phoenix/`, then scoped ADRs/specs/contracts/evals. Review expired assumptions and run the
smallest relevant baseline Oracle for the Boundary being changed. Trust current Evidence over
prose. Never create parallel memory merely because its filename differs.

If no equivalent state exists and the work creates durable knowledge, create a minimal root
`SYSTEM.md` by extracting code, history, tests, and human-only context. Mark unverified content as
dated assumptions. At exit, update state only when a durable Claim, Boundary, Evidence item,
Decision, or Ledger item changed. Tiny and already-covered work skips state churn. Record why in
the repo's adopted form: Decision ID, ADR/issue link, commit body, or optional `Why:` trailer.

Template:

```markdown
# SYSTEM

## Map
What this software is and for whom. One line per component: purpose, pace, and
pointer to detailed state. In a monorepo this file is an index, not a duplicate.

## Spec
Use namespaced stable IDs (PAY-R1, PAY-I1, PAY-E1); Oracles reference them.
### Requirements / Invariants / Operational envelope / Non-goals / Scar tissue
Observable Claims; UNKNOWN-ORIGIN behavior stays pinned by characterization.
### Contracts
Pointers to versioned schemas and interfaces.

## Data and mutation ownership
Dataset | sole writer | durability | migration/retention contract

## Evidence
Oracle | rendering/commit | result | observed at | valid until | invalidates

## Decisions
Links to dated ADRs/decision records; keep only current summary here.

## Ledger
ID | assumption/planned/drift | statement | check by | status
```

Keep root state short. Split by regenerative grain or monorepo component before it becomes a
catalog; existing `.phoenix/` or ADR trees may remain the detailed state. Prose about the present is
a cache — enforcement lives in Oracles and Evidence.

## The work loop

1. **Orient.** Read durable state and run the relevant baseline Oracle. Fix or explicitly flag a
   failing baseline before building on it.
2. **Calibrate.** Name active Claim, Boundary, Oracle, Rendering, pace, blast radius, recovery, and
   rollback. Each logical dataset has one writer; shared mutation is a boundary bug.
3. **Grill proportionally.** Extract only context the repo cannot answer. Route durable yield into
   Claims, fixtures, Decisions, or the Ledger; do not turn reversible work into process theater.
4. **Specify.** Give changed durable Claims namespaced IDs. Each needs a deterministic, live, or
   explicit human-review Oracle; otherwise mark it as an assumption or aspiration.
5. **Evals first.** Add the smallest Oracle that fails for the changed Claim, then change the
   Rendering. Implementation-coupled tests are fine; durable Claims also need boundary-level gates.
6. **Choose change mode.** Patch mature or slow-layer Renderings. Regenerate only a bounded grain
   with sufficient specification, durable Oracles, isolated mutation, and rollback. Use wrap or
   strangler replacement when direct replacement risks hidden knowledge. In every mode: root cause
   over special-case, minimal public surface, no speculative abstractions.
7. **Verify.** Oracles gate shipping; "it runs" is not acceptance. For live replacement, compare
   behavior and cost against the incumbent by whatever mechanism the environment supports, with
   rollback armed.
8. **Record and compact.** Update only durable state that changed, then remove dead Renderings,
   flags, and duplicate concepts after their rollback window. If conceptual mass grew faster than
   capability, compact before continuing.

## Pace calibration

| Layer | Examples | Grilling | Autonomy | Verification |
|---|---|---|---|---|
| Fast | UI internals, glue, copy, content | State assumptions inline, proceed | Full | Evals + instant rollback |
| Mid | Domain logic, business rules | Targeted: invariants, envelope, edge cases | Generate freely, human spot-review | Full durable suite, property tests |
| Slow | Schemas, boundaries, security, data models, migrations, public APIs, ledgers | Full interrogation | Resolve unapproved tradeoffs with a human; an explicit request may already decide | Staged rollout, human sign-off where needed, migration plans |

User-facing UI behavior is slow-layer regardless of how cheap the pixels are: change it rarely,
additively, reversibly — regenerate behind the interface, not the interface.

## Grilling — extracting latent context from humans

The human is the highest-bandwidth spec input and the lossiest: intent arrives incomplete,
solution-shaped, and silent about "obvious" constraints. Interrogation depth ∝ cost of being wrong
× cost of reversal (the pace table). Never ask what the codebase, history, or telemetry can answer
— lead with what you inferred and ask for corrections, since humans correct far better than they
recall. Core moves:

- **Problem behind the solution.** A requested implementation ("add Redis") is a hypothesis. Ask
  what was observed and how success would be measured; spec the problem, log the request as one
  candidate.
- **Why-chase each "must"** until you hit a real constraint (regulatory, contractual, physical,
  economic) or discover habit. First answers are rationalizations; the constraint lives a level
  down.
- **Negative space + failure walk.** What must this never do? What happens when the dependency
  dies, the input is garbage, volume is 100×? Acceptable degradation vs. unacceptable failure →
  invariants and envelope.
- **Quantify every adjective.** "Fast," "large," "soon" → numbers, or a Ledger assumption to
  verify.
- **Force three examples** — typical, nasty edge, must-reject. They become eval fixtures directly.
- **Restate-and-diff.** Play back your understanding *plus its unstated implications* ("this makes
  Y impossible — right?"). People recognize wrong far better than they specify right.
- **Tradeoff-force slow-layer choices.** Two or three honest candidates (no strawmen), your
  recommendation and its weakest point named, then a recorded human decision. Rubber-stamping the
  agent is vibe coding too.
- **Tribal-knowledge sweep** on existing systems: weirdest thing here? what breaks when new people
  touch it? which incident still haunts you? what was tried and abandoned, and why?
- **Assumption ledger.** Proceeding unconfirmed is fine on fast layers *if* the assumption is
  logged, visible, and dated. Silent assumptions are drift seeds.

Batch ≤3 questions per round; show work between rounds. Grilling a reversible tweak is process
theater; skipping it on a schema is malpractice.

## Evaluations

Three tiers: **ephemeral** (implementation-coupled tests), **durable** (invariants, contracts,
properties, behavioral checks, performance/cost bounds at stable boundaries), and **live**
(monitoring and drift signals against reality). The **boundary test** sorts the first two: would a
rewrite in another language invalidate the test? Then it is ephemeral. One invariant gets one
canonical Oracle across implementations; duplicated private copies allow green rot. Traceability
runs both ways: every durable Claim names an Oracle and every Oracle names its Claims.

Evidence records Oracle, observed Rendering/commit, source and window, observed value, threshold,
result, freshness/valid-until, and invalidation target. A monitor without a failure action is a
dashboard, not an Oracle.

## Regenerate and remember

Regenerate when the grain is bounded, specified, oracle-covered, and reversible. Patch mature or
slow-layer code when replacement would risk hidden knowledge; the debt is not hand editing but an
unrecorded reason. Hotfixes and debugging may bypass the normal path, but backfill the Claim and
Oracle before the next regeneration can erase the lesson. Repeated regeneration failure means the
specification or boundary is incomplete.

**Extract before you delete.** Working code remembers incidents the organization forgot: magic
numbers, weird timeouts, retries, defensive branches. Before simplifying or regenerating anything
live, sweep for scar tissue and interview the humans in parallel — code remembers what the org
forgot; people remember what code can't express. Origin found → Spec clause + eval with the story.
Not found → `UNKNOWN-ORIGIN`, preserve, pin with a characterization eval. Chesterton's Fence, with
teeth. Legacy modernization is extraction first, then bounded replacement behind a stable contract,
one seam at a time — never big-bang. Incidents: roll back first, then encode the lesson as clause +
eval (not just a patch) and add the missing signal to the Ledger.

## Safety rails

Unresolved slow-layer tradeoffs require an explicit recorded human decision; a direct request that
clearly chooses the approach counts. Never blind-regenerate cryptography, protocol parsers,
auth/security boundaries, data models, migrations, or systems of record. Oracles gate shipping.
Unexplained code is a research task, not a deletion target.

## Growth rules — how this seed evolves

This file and SYSTEM.md are governed by their own discipline: size budgets, compaction, the
deletion test. Expand only on evidence, and record each expansion as a Decision:

- Keep root `SYSTEM.md` as an index; split detailed state by component/grain, or adopt an existing
  state tree instead of copying it.
- Add a CI check only after the same gap bites twice (start: zero automation).
- Add a SQLite index over SYSTEM.md only when a real query hurts — generated from the text, never
  the source of truth.
- Re-expand a section of this skill into a reference file only after its compression demonstrably
  causes repeated failures; a capable agent can re-derive elaboration from principle on demand.
- Run the **fresh-agent drill** as this system's own eval: give a cold agent a real task with this
  skill and the repo's adopted durable state; every stumble or unnecessary human question is the
  next iteration, logged in the Ledger. Starter drill set: `drills.md`.
- **This folder self-hosts.** Siblings: `SYSTEM.md` (this skill's own state), `CLAIMS.md` (its spec
  — every prescriptive claim from the source corpus, traced to an adopted/deferred/rejected
  status), `drills.md` (its durable evals), `improve.md` (its regeneration procedure). To improve
  the skill from a real session, run the `improve.md` protocol on the transcript. Skill changes
  are slow-layer: evidence-attributed, drill-gated, human-signed, recorded as Decisions.

*Synthesized from "The Phoenix Architecture" by Chad Fowler (aicoding.leaflet.pub, 2025–2026).*
