# Phoenix record grammar

Prescribed for consuming repos; load when writing or reviewing `.phoenix/` records. The repo holds
state only — this grammar and its checker (`scripts/check.mjs`) live in the plugin.

## IDs

Stable IDs encode record type and owner, never release, date, pace, or descriptive wording:

```text
BOUNDARY-<OWNER>
CLAIM-<OWNER>-<NNN>
ORACLE-<OWNER>-<NNN>
D-<OWNER>-<NNN>
```

Owner tokens come from Boundary IDs; `STATE` is the repository-state owner. Titles carry
semantics. Release membership lives under `.phoenix/releases/`; dates and pace are metadata.

## Core records

Boundaries own Claims and mutation (each Boundary lists the logical datasets it exclusively
writes); Oracles judge Claims; Renderings are current implementations identified by
path/version/commit; Evidence is dated Oracle output; Decisions preserve chose/rejected/because;
Ledger rows track temporary assumptions, drift, and planned checks. Contracts, datasets, pace,
non-goals, and assumptions are fields or Claim types, not separate ID families.

## Fields

Defaults are `Status: current`, `Horizon: durable`, `Applies from:` the current release, and
Boundary pace. Only overrides are written inline.

- Status: `current | deferred | historical | superseded`
- Horizon: `release_scoped | until_trigger | durable | exploratory`
- Pace: `very_slow | slow | medium | fast`
- Regeneration policy (Boundaries): combines `human_reviewed`, `oracle_gated`, `rare`
- Oracle Kind: `contract_test | static_check | snapshot_or_golden | integration_smoke | live_smoke | manual_review_gate`

Required Decision fields:

```text
Recorded: <date>. Former ID: <id or none>.
Status: … Horizon: … Pace: …
Revisit when: <observable trigger>.
```

Keep chose/rejected/because prose under those fields. A superseding record gets a new ID and links
both directions; never rewrite old rationale silently. Old IDs remain recoverable through each
repo's migration fidelity record.

## Coverage and evidence

Executable Oracle coverage is derived from `// Oracle renderings: ORACLE-…` markers in source
files; the checker fails any Oracle with neither a marker nor an evidence entry. Evidence files
hold dated Oracle output and the non-executable coverage list only — Claim linkage lives on the
Oracles, and anything derivable from code is derived, not hand-written.
