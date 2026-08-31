# Phoenix record grammar

This grammar applies when an agent writes or reviews `.phoenix/` records.
The repository holds state.
The plugin owns this grammar and its checker at `scripts/check.mjs`.

## Source layout

Phoenix Markdown uses semantic source lines.
Put one independently reviewable clause or field on each physical line.
Keep a field label and one value on the same line.
Use one bullet or repeated field for each value when a field has multiple values.
Do not connect clauses with semicolons.
Do not reflow unchanged clauses when you update a record.
Do not use tables for records whose fields can change independently.
Fenced code blocks and literal command output are exempt.

Use `phoenix-review-system` as the agent `manual_review_gate` for this semantic rule.
The deterministic checker validates structural grammar and cross-references only.
The deterministic checker does not judge English clauses.

## IDs

Stable IDs encode record type and owner.
Stable IDs do not encode release, date, pace, or descriptive wording.

```text
BOUNDARY-<OWNER>
CLAIM-<OWNER>-<NNN>
ORACLE-<OWNER>-<NNN>
D-<OWNER>-<NNN>
```

Owner tokens come from Boundary IDs.
`STATE` is the repository-state owner.
Titles carry semantics.
Release membership lives under `.phoenix/releases/`.
Dates and pace are metadata.

## Core records

A Boundary owns Claims.
A Boundary owns mutation for each listed logical dataset.
An Oracle judges one or more Claims.
A Rendering identifies the current implementation by path, version, or commit.
Evidence records dated Oracle output.
A Decision preserves choices, rejected alternatives, and reasons.
A Ledger entry tracks one temporary assumption, drift item, or planned check.
Contracts, datasets, pace, non-goals, and assumptions are fields or Claim types.
They do not form more ID families.

### Claim

```markdown
### CLAIM-PAYMENTS-001: Reject duplicate capture
Statement: A payment request with a captured idempotency key returns the prior result.
Owner boundary: `BOUNDARY-PAYMENTS`.
Status: current.
Horizon: durable.
```

### Boundary

```markdown
### BOUNDARY-PAYMENTS
Purpose: Own payment capture behavior.
Writes: `payment_attempts`.
Pace: slow.
Regeneration policy: human_reviewed, oracle_gated.
```

### Oracle

```markdown
## ORACLE-PAYMENTS-001 — Reject duplicate capture
Owner boundary: `BOUNDARY-PAYMENTS`.
Claim IDs: `CLAIM-PAYMENTS-001`.
Kind: contract_test
Pass criteria: A duplicate request returns the original capture result.
Failure action: Block merge.
```

### Evidence

```markdown
### ORACLE-PAYMENTS-001 — 2026-08-30
Oracle: `ORACLE-PAYMENTS-001`.
Rendering: `abc1234`.
Source: `node --test tests/payments.test.mjs`.
Window: Test run on 2026-08-30.
Observed value: 12 tests passed.
Threshold: All tests pass.
Result: pass.
Observed at: 2026-08-30.
Valid until: Payment capture Rendering changes.
Invalidates: Payment capture Rendering.
```

### Decision

```markdown
### D-PAYMENTS-001 — Keep capture idempotent
Recorded: 2026-08-30.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: The payment provider supplies equivalent idempotency guarantees.
Chose: Store capture results by idempotency key.
Rejected: Trust callers to prevent duplicate requests.
Because: Network retries can repeat a valid request.
```

### Ledger entry

```markdown
### Ledger item L-1
Type: assumption.
Statement: Provider retry latency remains less than 30 seconds.
Check by: 2026-11-30.
Status: open.
```

## Fields

Write each Decision field shown in the Decision example.
Write `Pace:` on each Boundary.
Write `Pass criteria:` and `Failure action:` on each Oracle.
For records owned by a Boundary, Status defaults to `current`.
For records owned by a Boundary, Horizon defaults to `durable`.
For records owned by a Boundary, Pace defaults to the Boundary pace.
For records owned by a Boundary, `Applies from:` defaults to the current release.
Write only metadata overrides inline on records owned by a Boundary.

- Status: `current | deferred | historical | superseded`
- Horizon: `release_scoped | until_trigger | durable | exploratory`
- Pace: `very_slow | slow | medium | fast`
- Regeneration policy uses one or more of `human_reviewed | oracle_gated | rare`.
- Oracle Kind: `contract_test | static_check | snapshot_or_golden | integration_smoke | live_smoke | manual_review_gate`

A superseding Decision gets a new ID.
The superseded Decision and new Decision reference each other.
Do not rewrite superseded rationale silently.
Superseded IDs stay recoverable through each repository's migration fidelity record.

## Coverage and evidence

The checker derives executable Oracle coverage from `// Oracle renderings: ORACLE-…` markers in source files.
The checker fails an Oracle that has no marker and no Evidence entry.
Evidence files hold dated Oracle output.
Evidence files can also hold a non-executable coverage list.
Claim linkage lives on Oracles.
Derive facts from code when code can supply them.
Do not copy derived facts into records.
