---
name: phoenix-review-rendering
description: Review code, configuration, schemas, prompts, infrastructure, UI, pipelines, runbooks, or generated artifacts against Phoenix durable system definition. Use to decide whether a Rendering correctly realizes its Claims, Boundary, contracts, Oracles, and current Evidence.
---

# Phoenix Review: Rendering

Review whether a Rendering is correct to the durable definition of the system.
Rendering includes code, configuration, prompts, schemas, migrations, infrastructure, UI, pipelines, generated artifacts, and runbooks.
Remain read-only unless the user explicitly asks for fixes.

## Inputs

Establish these inputs before review:

- Rendering target and fixed baseline when the review is diff-scoped.
- Repository instructions.
- Adopted durable state from root `SYSTEM.md`, `.phoenix/`, ADRs, specifications, contracts, and evaluation documents.
- Relevant source, tests, history, and current diff.
- Commands or Oracles that can disprove conformance.

Load `phoenix-architecture` before review.
Load `review-baseline` when it is installed.
Use this skill as the complete review procedure when `review-baseline` is unavailable.
Do not infer the system definition from the Rendering under review.
If durable state is internally inconsistent, stop the affected conclusion and route that state to `phoenix-review-system`.

## Review method

### 1. Fix scope and definition

Name each Rendering in scope.
Name the baseline or repository snapshot.
Read durable system definition before detailed implementation.
Extract affected Claims, owning Boundaries, logical datasets, contracts, non-goals, pace, Oracles, and required Evidence.
Mark missing definition as uncertainty.
Do not silently promote current code behavior into a Claim.

### 2. Build traceability in the two directions

For each changed or reviewed Rendering, map:

```text
Rendering -> Boundary -> Claims -> contracts/data -> Oracles -> Evidence
```

For each affected Claim, map back:

```text
Claim -> Boundary -> Rendering -> Oracle -> current Evidence
```

Flag each unmapped Rendering, Claim, contract, Oracle, and Evidence item.
Flag a changed file that crosses a Boundary without a recorded Boundary change.
Flag a changed mutation path outside the dataset's sole writer.

### 3. Review conformance

Check that the Rendering:

- Implements each affected Claim completely.
- Preserves each invariant and non-goal.
- Stays inside the owning Boundary.
- Uses the recorded mutation owner for each logical dataset.
- Preserves public contracts and version rules.
- Stays within the operational envelope.
- Applies the recorded slow-layer decision.
- Adds no durable behavior that lacks a Claim.
- Adds no interface, state, mode, or dependency that the system definition does not justify.
- Removes no behavior that remains a current Claim.

Treat undocumented behavior as a finding or explicit uncertainty.
Do not call scope expansion harmless because tests pass.

### 4. Inspect implementation memory

Inspect retries, timeouts, fallbacks, validation, feature flags, compatibility shims, migrations, ordering, manual overrides, and incident comments.
Map each touched scar to a Claim and Oracle.
Flag deletion or simplification of unexplained scar tissue.
Flag new special cases that encode hidden Claims.

### 5. Evaluate Oracles and Evidence

Run the smallest relevant baseline Oracle when the environment permits it.
Inspect what each Oracle proves at the Boundary.
Do not trust an Oracle that only repeats implementation details.
Check that each affected durable Claim has a durable Oracle.
Check that each Oracle has explicit pass criteria and a failure action.
Check that Evidence identifies the reviewed Rendering or commit.
Check Evidence source, window, observed value, threshold, result, freshness, and invalidation target.
Treat stale, missing, unrelated, or implementation-coupled Evidence as insufficient.
A green suite is not conformance when it does not exercise the affected Claim.

### 6. Check provenance and recovery

Check that the change records its reason.
Check that consequential rejected alternatives remain recoverable.
Check that hidden Claims found during implementation entered durable state.
Check that rollback, migration, or recovery matches the Boundary pace and blast radius.
Block a slow-layer acceptance when an unresolved tradeoff lacks an explicit human decision.

### 7. Verify findings

Trace each candidate finding through source, state, tests, and Evidence.
Reject a candidate finding when an existing Claim, contract, or Oracle resolves it.
Distinguish these failures:

- Rendering contradicts current system definition.
- System definition is incomplete.
- System definition is internally inconsistent.
- Oracle does not prove the Claim.
- Evidence is stale or unrelated.

Do not rewrite the system definition to make incorrect code appear conformant.

## Finding bar

Report a finding only when it has:

- Exact Rendering path and durable record.
- Violated Claim, Boundary, contract, or Oracle.
- Concrete trigger or mismatch.
- Impact on behavior, ownership, replacement, or recovery.
- Supporting source and Evidence.
- Smallest credible correction.
- Confidence and unresolved assumptions.

Put blockers first.
Omit generic code-quality findings that do not affect system conformance.

## Output

```markdown
# Phoenix Rendering Review

Verdict: conformant | non-conformant | insufficient definition | insufficient evidence
Scope: <Rendering and baseline>

## Traceability
| Rendering | Boundary | Claims | Oracles | Evidence |
|---|---|---|---|---|
| <path> | <Boundary> | <Claims> | <Oracles> | <Evidence> |

## Findings
### <severity> — <short title>
Rendering: <path>
System definition: <record and Claim>
Evidence: <verified source>
Mismatch: <concrete divergence>
Impact: <failure mode>
Correction: <smallest fix>

## Oracle results
- <command or review gate>: <result>

## Residual uncertainty
- <unverified fact or none>
```

If no finding survives verification, say so.
A conformant verdict means the reviewed Rendering matches the current system definition in scope.
It does not prove that the system definition is complete or correct.
