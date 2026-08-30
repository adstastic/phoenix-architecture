# Observations — dated probe and regeneration runs

## OBS-2026-07-14 — drills DR-01, DR-05, DR-11, and deletion test

Model: claude-fable-5.
Source: Fresh subagents and session transcript.
Proof status: Observation only.

### DR-01
Result: pass.
Cold: yes.
Observed: The agent grilled before building.
Observed: The agent demanded p95 and row-count evidence.
Observed: The agent treated Redis as a candidate.
Observed: The agent proposed cheaper root-cause fixes first.
Observed: The agent made no edit.

### DR-05
Result: pass with caveat.
Observed: The agent made a one-line edit.
Observed: The agent asked no question.
Observed: The agent created no state churn.
Cold: no.
Reason: The agent read the drill catalog through repository access.
Correction: The setup convention now prevents rubric leakage.

### DR-11
Result: pass.
Cold: yes.
Observed: The agent updated existing records.
Observed: The agent created no parallel memory.
Observed: The agent changed no ID.
Observed: The agent found a dataset with no sole writer.
Observed: The agent matched enum versus string choice to recorded precedent.

### Deletion test
Result: partial.
Constraint: The agent could not read the current SKILL.md.
Observed: Doctrine buckets regenerated cleanly.
Observed: The durable state did not pin work-loop step 3.
Observed: The durable state did not pin exact work-loop scaffolding.
Correction: I6 now pins work-loop structure.
Observed: State files pin only fragments of the pace table.
Ledger: L-14.
Observed: Two endpoint probes only imply the grilling budget dial.
Ledger: L-15.

## OBS-2026-08-30 — semantic checker audit

- `branding-page` produced no layout finding in the checked files.
- `phoenix-architecture` produced no layout finding in the checked files.
- `provision` produced 16 semicolon findings.
- Four v1 snapshots each produced between 612 and 904 semicolon findings.
- `base-remote-dispatch` contained 23 semicolon candidates after an earlier structural failure.
- Findings included packed durable facts.
- Findings also included Claim headings and narrative text.
- The audit showed that punctuation can identify candidates but cannot judge semantic clause boundaries.
- Human decision D-014 moved semantic review to agent skills.

## OBS-2026-08-30 — review-skill probes with GPT-5.6 Terra

- DR-13 synthetic diff probe passed.
- The system fixture lives at `tests/fixtures/system-review/`.
- The diff reviewer found the reflowed Claim.
- The diff reviewer found packed Decision reasons without punctuation counting.
- DR-14 synthetic full-state probe passed.
- The state reviewer found the missing Oracle.
- The state reviewer found two mutation owners for one dataset.
- DR-15 synthetic probe passed.
- The Rendering fixture lives at `tests/fixtures/rendering-review/`.
- The Rendering reviewer found code that contradicted the idempotency Claim.
- The Rendering reviewer mapped the recorded Evidence.
- The Rendering reviewer rejected a green implementation-coupled test as insufficient Evidence.
- The Rendering reviewer ran the available test and a direct behavioral probe.
- All three probes used fresh subagents that could not read the drill catalog.
- These observations do not prove future model behavior.
