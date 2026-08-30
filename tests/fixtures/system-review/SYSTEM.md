# SYSTEM

## Spec
CLAIM-PAYMENTS-001: Duplicate payment
capture is rejected.
Owner boundary: BOUNDARY-PAYMENTS.
Oracle: unknown.

## Data and mutation ownership
BOUNDARY-PAYMENTS writes payment_attempts.
BOUNDARY-AUDIT also writes payment_attempts.

## Decisions
D-PAYMENTS-001: Keep capture idempotent.
Because: retries repeat requests; duplicate charges break customer trust.
