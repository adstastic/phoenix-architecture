# SYSTEM

## Spec
CLAIM-PAYMENTS-001: A captured idempotency key returns the prior capture without creating another charge.
Owner boundary: BOUNDARY-PAYMENTS.
Oracle: ORACLE-PAYMENTS-001.

## Boundaries
BOUNDARY-PAYMENTS owns payment capture and writes payment_attempts.

## Oracles
ORACLE-PAYMENTS-001 checks CLAIM-PAYMENTS-001.
Pass criteria: Duplicate requests return the prior capture and leave charge count unchanged.
Failure action: Block merge.

## Evidence
Oracle: ORACLE-PAYMENTS-001.
Rendering: payments.js candidate.
Source: node payments.test.js.
Window: Synthetic fixture on 2026-08-30.
Observed value: Test passed.
Threshold: Test passes.
Result: pass.
Observed at: 2026-08-30.
Valid until: payments.js or payments.test.js changes.
Invalidates: payments.js candidate.
