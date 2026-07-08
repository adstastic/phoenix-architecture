---
name: regenerative-sdlc
description: >-
  Full-lifecycle discipline for building software with AI coding agents, from Chad Fowler's
  "Phoenix Architecture" (regenerative software). Premise: when code is cheap to generate it stops
  being the asset — specs, evaluations, contracts, provenance, and data are the durable artifacts;
  implementations are regenerated, not patched. Also defines SYSTEM.md, the state file fresh agents
  read on arrival and update on exit. Use whenever specifying or planning software, clarifying
  requirements, interrogating vague or solution-shaped requests, extracting tribal knowledge,
  designing architecture or boundaries, generating or reviewing code, writing tests or evals,
  deploying, refactoring, compacting bloat, modernizing legacy, debugging drift, deciding whether
  to rewrite or delete code, or arriving fresh at any codebase — even if the user never says
  "regenerative" or "Phoenix".
---

# Regenerative SDLC — Seed

This is a deliberately minimal seed: one skill file plus one state file per repo (`SYSTEM.md`). It
is designed to be iterated — it carries its own evolution rules (end of file) and is subject to its
own discipline. The target output is minimal, reliable, elegant systems shipped by a human–agent
pair operating with rigor in both directions: neither vague human intent nor plausible agent output
is accepted unexamined.

## Premise

Generation is cheap; comprehension, verification, and safe replacement are the bottleneck. So the
system — its behavior, boundaries, data, and invariants — is the asset, and code is a regenerable
cache of current understanding. Five artifacts must survive deletion of any implementation:
**specification** (executable intent), **evaluations** (runnable contracts), **boundaries**
(versioned interfaces and schemas), **provenance** (why things are the way they are), and **data**.
Producing and maintaining those is the job; code is a byproduct. The master diagnostic is the
**deletion test**: if the implementation were deleted, what would tell you a regenerated version is
correct? If the honest answer is "the old code," stop and fix that first.

## SYSTEM.md — the state file

Lives at repo root. It is how fresh agents engage with the system's present (Spec), past
(Decisions), and future (Ledger).

**Boot:** read SYSTEM.md → review Ledger for expired items → run the durable evals to verify the
present (trust green evals over any prose) → then work. **If SYSTEM.md is missing**, create it
before significant work by extraction: mine the code, git history, and tests; grill the human for
what only they know; mark unverified content as assumptions. **Exit:** append a Decision entry for
any significant choice, update the Ledger, keep Spec current with what you shipped, and end your
commit message with a one-line trailer: `Why: D-014 / R3,I1 — <reason in a few words>`.

Template:

```markdown
# SYSTEM

## Map
What this software is and for whom (one paragraph). Then one line per
component: name — purpose — pace layer (fast/mid/slow).

## Spec
Clauses get stable IDs; evals reference them.
### Requirements (R1, R2…)
Observable behaviors, one per clause, testable as written.
### Invariants (I1, I2…)
Properties that must hold for all inputs and all implementations, ever.
### Operational envelope (E1, E2…)
Latency ceilings, cost/token budgets, availability, quality thresholds.
### Contracts
Pointers to the versioned schemas/interfaces others depend on.
### Non-goals
What this system deliberately does not do.
### Scar tissue (S1, S2…)
Odd-looking but load-bearing behavior + its origin story (or UNKNOWN-ORIGIN:
preserved, pinned by a characterization eval, never silently deleted).

## Decisions (append-only)
### D-001 — 2026-07-08 — <title>
Chose: … | Rejected: … | Because: … | Clauses: R2, I1

## Ledger (review every boot; every row has an expiry or verify-by date)
| ID  | Type (assumption/evidence/planned) | Statement | Check by | Status |
```

Start with one SYSTEM.md for the whole repo. Split a component into `system/<name>.md` only when
its section exceeds ~100 lines or the deletion test says the grain is wrong. Prose about the
present is a cache — keep it minimal; enforcement lives in the evals.

## The work loop

1. **Orient.** Boot per above. Never begin from a failing baseline — fix or flag it first.
2. **Calibrate.** Place what you're touching in a pace layer (table below). This sets grilling
   depth, your autonomy, and verification weight. Blast radius and recovery time reveal the true
   layer; boundary placement is itself a slow-layer decision. One invariant to enforce at every
   boundary: each logical dataset has exactly one writing component — shared write authority is
   the hidden coupling that makes regeneration unsafe, so treat it as a boundary bug to fix before
   regenerating either side.
3. **Grill.** Extract the latent context (section below) at the calibrated depth. Route every
   yield into Spec clauses, eval fixtures, Decisions, or the Ledger — unrecorded extraction
   evaporates.
4. **Specify.** Turn the yield into clauses with IDs. Every clause must be mechanically checkable
   or it's an aspiration, not a requirement. The unit of change is a *reason*: requirement changes
   edit the clause first, then regenerate downstream.
5. **Evals first.** Write or extend the durable eval for each clause you're about to implement.
   If the tests don't pass, the code doesn't ship — which only means something if the tests exist
   before the code.
6. **Generate.** Regenerate the unit from spec rather than patching in place. Resist bloat: no
   unearned patterns (a Strategy/Factory where an `if` would do), no speculative generality,
   root-cause over special-case, minimal public surface, no commented-out survivors. Every new
   concept must justify its existence.
7. **Verify.** Durable evals gate shipping — "it runs" is not acceptance. When replacing something
   live, diff behavior and cost against the incumbent (shadow/canary for mid+ layers) before
   cut-over, with rollback armed.
8. **Record and compact.** Decision entry, Ledger updates, `Why:` trailer. Then delete what
   stopped earning its keep — old implementations after the rollback window, dead flags, merged
   duplicate concepts. Deletion is a first-class, recorded event; if capability grew but
   conceptual mass grew faster, you lost this round.

## Pace calibration

| Layer | Examples | Grilling | Autonomy | Verification |
|---|---|---|---|---|
| Fast | UI internals, glue, copy, content | State assumptions inline, proceed | Full | Evals + instant rollback |
| Mid | Domain logic, business rules | Targeted: invariants, envelope, edge cases | Generate freely, human spot-review | Full durable suite, property tests |
| Slow | Schemas, boundaries, security, data models, migrations, public APIs, ledgers | Full interrogation | Propose only — explicit recorded human decision required | Staged rollout, human sign-off, migration plans |

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

Three tiers: **ephemeral** (implementation-coupled unit tests — write freely, delete without guilt
on regeneration), **durable** (invariants, contract tests, property-based tests, behavioral checks,
performance/cost bounds — specified at boundaries, versioned, they gate every ship), **live**
(monitoring and drift signals — evaluation running continuously against reality; Ledger evidence
rows with verify-by dates are its minimal form). The **boundary test** sorts the first two: would
rewriting the component in another language invalidate the test? Then it's ephemeral. One invariant
= one canonical eval asserted across all implementations — five modules each passing their own copy
is how systems rot while green. Traceability runs both ways: every clause has ≥1 eval; every
durable eval names its clause.

## Regenerate and remember

Never patch what you can regenerate: in-place edits entangle intent with edit history and
manufacture legacy code in days. Manual edits are an escape hatch (hotfixes, debugging) — pay the
debt immediately by backfilling the spec clause and eval, or the next regeneration silently erases
the fix. If regeneration keeps failing to reproduce needed behavior, the spec was incomplete;
that's the feedback — fix the spec.

**Extract before you delete.** Working code remembers incidents the organization forgot: magic
numbers, weird timeouts, retries, defensive branches. Before simplifying or regenerating anything
live, sweep for scar tissue and interview the humans in parallel — code remembers what the org
forgot; people remember what code can't express. Origin found → Spec clause + eval with the story.
Not found → `UNKNOWN-ORIGIN`, preserve, pin with a characterization eval. Chesterton's Fence, with
teeth. Legacy modernization is extraction first, then bounded replacement behind a stable contract,
one seam at a time — never big-bang. Incidents: roll back first, then encode the lesson as clause +
eval (not just a patch) and add the missing signal to the Ledger.

## Safety rails

Slow-layer changes require an explicit recorded human decision — silence isn't consent where
reversal is expensive. Never blind-regenerate cryptography, protocol parsers, auth/security
boundaries, data models, migrations, or systems of record. Evals gate shipping, always. Unexplained
code is a research task, not a deletion target.

## Growth rules — how this seed evolves

This file and SYSTEM.md are governed by their own discipline: size budgets, compaction, the
deletion test. Expand only on evidence, and record each expansion as a Decision:

- Split SYSTEM.md per component when a section passes ~100 lines or its grain fails the deletion
  test.
- Add a CI check only after the same gap bites twice (start: zero automation).
- Add a SQLite index over SYSTEM.md only when a real query hurts — generated from the text, never
  the source of truth.
- Re-expand a section of this skill into a reference file only after its compression demonstrably
  causes repeated failures; a capable agent can re-derive elaboration from principle on demand.
- Run the **fresh-agent drill** as this system's own eval: give a cold agent a real task with only
  this skill and SYSTEM.md; every stumble or unnecessary human question is the next iteration,
  logged in the Ledger. Starter drill set: `drills.md`.
- **This folder self-hosts.** Siblings: `SYSTEM.md` (this skill's own state), `CLAIMS.md` (its spec
  — every prescriptive claim from the source corpus, traced to an adopted/deferred/rejected
  status), `drills.md` (its durable evals), `improve.md` (its regeneration procedure). To improve
  the skill from a real session, run the `improve.md` protocol on the transcript. Skill changes
  are slow-layer: evidence-attributed, drill-gated, human-signed, recorded as Decisions.

*Synthesized from "The Phoenix Architecture" by Chad Fowler (aicoding.leaflet.pub, 2025–2026).*
