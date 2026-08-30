---
name: phoenix-review-system
description: Review Phoenix durable state for internal consistency, semantic source-line quality, and conformance to Phoenix Architecture doctrine. Use for SYSTEM.md, .phoenix/, ADR, Claim, Boundary, Oracle, Evidence, Decision, Ledger, provenance, or deletion-test audits.
---

# Phoenix Review: System

Review durable system definition before trusting or regenerating a Rendering.
This is an agent `manual_review_gate` for semantic properties that deterministic parsers cannot judge.
Remain read-only unless the user explicitly asks for fixes.

## Inputs

Establish these inputs before review:

- Review target and fixed baseline when the review is diff-scoped.
- Repository instructions.
- Adopted durable state from root `SYSTEM.md`, `.phoenix/`, ADRs, specifications, contracts, and evaluation documents.
- Current Phoenix Architecture skill and repository-specific record grammar.
- Available deterministic record checker.

Load `phoenix-architecture` before review.
Load `review-baseline` when it is installed.
Use this skill as the complete review procedure when `review-baseline` is unavailable.
Do not create a parallel state model when the repository already has one.

## Review method

### 1. Inventory durable state

List each Claim, Boundary, logical dataset, Oracle, Rendering, Evidence item, Decision, Ledger item, contract, and adopted state location.
Mark missing record families only when the system needs them.
Distinguish an intentional omission from an unknown omission.

### 2. Check graph consistency

Check each relationship in the two directions:

- Each durable Claim has one owning Boundary.
- Each logical dataset has one mutation owner.
- Each durable Claim names at least one Oracle.
- Each Oracle names all Claims that it judges.
- Each Oracle has explicit pass criteria and a failure action.
- Each Rendering names its Boundary, Claims, and Oracles.
- Each Evidence item names its Oracle and observed Rendering.
- Each Evidence item records source, window, value, threshold, result, freshness, and invalidation target.
- Each current Decision has clear chose, rejected, and because records.
- Each superseded Decision links in the two directions.
- Each open Ledger item has an observable check date or trigger.

Flag missing, dangling, duplicate, conflicting, and circular records.
Flag parallel memory that describes the same durable fact in competing locations.

### 3. Check semantic source lines

Review changed Phoenix Markdown as source text and as a diff.
Apply this rule to Claims, Boundary facts, Oracle criteria, Evidence observations, Decisions, Ledger items, assumptions, and non-goals:

- Put one independently reviewable clause or field on each physical source line.
- Keep one clause on one line.
- Use one bullet or repeated field for each independently changeable value.
- Do not hide separate facts in a semicolon, paragraph, or mutable table row.
- Do not reflow unchanged clauses.
- Exempt fenced code, literal command output, and immutable data tables.

This check is semantic.
Do not replace it with punctuation counting.

### 4. Check Phoenix doctrine

Check that durable state preserves these properties:

- Specification, evaluations, Boundaries, provenance, and data survive implementation deletion.
- Claims are observable and not implementation-shaped aspirations.
- Boundaries own Claims and mutation.
- Oracles judge Claims at stable interfaces.
- Evidence can age and invalidate a specific Rendering or Claim.
- Slow-layer choices have explicit human decisions and revisit triggers.
- Regeneration is bounded, Oracle-covered, and reversible.
- Mature implementation scar tissue is extracted before deletion.
- UNKNOWN-ORIGIN behavior stays pinned by characterization.
- Current-state prose does not substitute for enforcement.
- Conceptual mass does not grow faster than capability.

Run the deletion test.
Ask what remains if each current Rendering disappears.
Fail doctrine conformance when the honest answer depends on reading deleted implementation.

### 5. Verify findings

Treat checker output, green tests, names, comments, and record status as untrusted leads.
Inspect source evidence before reporting a finding.
Reject a candidate finding when an existing record or Oracle resolves it.
Do not infer semantic truth from structural validity.

## Finding bar

Report a finding only when it has:

- Exact record or path.
- Violated relationship or doctrine rule.
- Concrete contradiction, omission, or drift path.
- Impact on comprehension, verification, replacement, or recovery.
- Supporting evidence.
- Smallest credible correction.
- Confidence and unresolved assumptions.

Put blockers first.
Do not report style preferences as doctrine failures.

## Output

```markdown
# Phoenix System Review

Verdict: consistent | inconsistent | insufficient evidence
Scope: <state and baseline>

## Findings
### <severity> — <short title>
Location: <path and record>
Rule: <consistency or doctrine rule>
Evidence: <verified evidence>
Impact: <failure mode>
Correction: <smallest fix>

## Coverage
Claims reviewed: <count or list>
Boundaries reviewed: <count or list>
Oracles reviewed: <count or list>
Evidence freshness: <current, stale, or unknown>

## Residual uncertainty
- <unverified fact or none>
```

If no finding survives verification, say so.
A clean review means no verified inconsistency was found in scope.
It does not prove the system definition is complete or true.
