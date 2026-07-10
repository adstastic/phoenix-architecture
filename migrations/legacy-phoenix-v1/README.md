# Legacy Phoenix skill fidelity archive

Purpose: make migration from installed `phoenix` skill to `phoenix-architecture` recoverable and reviewable. This directory is inert provenance, not another live skill.

## Source

- Captured: 2026-07-10
- Source root: `/Users/adi/.pi/agent/skills/phoenix`
- Source files: `SKILL.md`, `FRAME.md`, `BOUND.md`, `PROVE.md`, `RENDER.md`, `COMPACT.md`, `CARDS.md`
- Source repository metadata: unavailable; `manifest.tsv` records independently verified SHA-256
  hashes after byte-for-byte copy.
- Initial target commit: `9e2264f3428cc0d3ccf711ba46a0aa649bb5d942`
- Initial target skill tree: `bcf8ce96d34df2ff44fb3f6f490b6fd31ceae551`

`source/` preserves exact source bytes. Do not edit it. Disable the installed legacy skill after adoption, but retain this archive for recovery and future migrations.

## Mapping

`mapping.tsv` maps every source file and every Markdown heading outside fenced examples to one live
or archived target. `semantic-changes.tsv` separately checks notable mechanics hidden inside those
sections, including graph primitives, mutation ownership, Oracle/Evidence detail, Rendering modes,
compaction, and archived card fields. Dispositions:

- `preserved`: meaning remains live.
- `superseded`: a named target replaces the old shape or wording.
- `deferred`: intentionally postponed and still recoverable.
- `rejected`: intentionally not adopted; rationale required.
- `archive-only`: retained exactly but removed from runtime policy.

The checker proves byte integrity, mapping completeness, source/target markers, and target
existence. It cannot prove semantic equivalence; both maps are the human-review surface for that
judgment.

## Check

From repository root:

```bash
node migrations/legacy-phoenix-v1/check.mjs
```

Expected result: 7 files, 44 source units, and 28 notable semantic changes mapped with no hash or target failure.
