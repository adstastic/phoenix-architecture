# SYSTEM

> Scope note: this file describes **the phoenix-architecture skill itself**.
> It is the skill dogfooding its own state protocol.
> It is not the SYSTEM.md of a repository that uses the skill.

## Map
Component: `phoenix-architecture` package.
Runtime discipline: `phoenix-architecture`.
System review gate: `phoenix-review-system`.
Rendering review gate: `phoenix-review-rendering`.
Self-hosted state: CLAIMS.md, drills.md, improve.md, and this file.
Consumers: Coding agents in Claude Code, pi, and Codex.
Consumer contract: Any harness that implements the Agent Skills standard.
Pace: slow.
Reason: Each change affects future sessions.
Approval: Each change requires an explicit human decision.

## Spec

### Requirements
R1. A cold agent must complete the full work loop with only SKILL.md, a target repository, and a human.
R1. The agent must not need the source corpus at runtime.
R2. SKILL.md loads in full when triggered.
R2. The frontmatter description is no more than 1,024 characters.
R3. Each prescriptive corpus Claim in CLAIMS.md has a status.
R3. Permitted statuses are adopted, partial, deferred, rejected, and context.
R3. No corpus Claim disappears silently.
R4. A source migration anchors the predecessor repository and commit.
R4. Git preserves exact source bytes and content hashes.
R4. Each consuming repository records its own ID rename map.
R4. Each consuming repository records notable semantic transformations.
R5. The skill adopts existing durable state such as `.phoenix/`, ADRs, specifications, and evaluations.
R5. The skill does not copy existing state into a competing SYSTEM.md.
R6. Repository state makes data ownership first-class.
R6. Repository state makes dated Evidence first-class.
R6. Stable IDs encode record type and owner.
R6. Release, date, horizon, and pace stay as metadata.
R7. Phoenix records put each independently reviewable clause or field on a separate physical Markdown line.
R8. The package ships an agent review of durable-state consistency and Phoenix doctrine conformance.
R9. The package ships an agent review of Rendering conformance to durable system definition.

### Invariants
I1. Skill changes are slow-layer.
I1. Skill changes pass a source-fidelity gate.
I1. Skill changes state behavioral uncertainty.
I1. Skill changes require human approval.
I1. Skill changes produce a Decision in this file.
I2. No speculative rule enters the skill.
I2. Each addition cites a transcript event or drill failure.
I2. A first event creates a Ledger watch.
I2. A second event permits a change.
I2. A CLAIMS.md fidelity gap counts as Evidence.
I3. SKILL.md is the implementation.
I3. CLAIMS.md, Decisions, Git source anchors, migration fidelity records, and recorded observations form the durable layer.
I3. The durable layer must permit regeneration of SKILL.md.
I4. Repeated worked transcript events mark load-bearing lines.
I4. Behavioral probes mark load-bearing lines.
I4. These signals do not prove correctness by themselves.
I5. State updates are proportional.
I5. Provenance updates are proportional.
I5. Tiny or covered work creates no empty Decision, Ledger, or trailer ceremony.
I6. The work loop has exactly eight ordered steps.
I6. The steps are Orient, Calibrate, Grill proportionally, Specify, Evals first, Choose change mode, Verify, and Record and compact.
I6. Boot reads durable state and runs a baseline Oracle.
I6. Exit updates only changed durable state.
I7. Agent review judges semantic Phoenix properties.
I7. The deterministic checker judges structural grammar and cross-references only.

### Operational envelope
E1. SKILL.md is no more than 250 lines.
E1. The budget is approximately 3,000 always-loaded tokens.
E1. A budget breach moves deliberate procedure to a reference file.
E1. Reactive invariants stay inline under D-005.

### Contracts
Distribution contract: Agent Skills standard SKILL.md folder with name and description frontmatter.
Supported harnesses: Claude Code, pi, and Codex.
Repository contract: Durable-state adoption rules in SKILL.md.
Repository contract: SYSTEM.md index template in SKILL.md.
Repository contract: Repository-selected provenance forms in SKILL.md.
Boundary rule: A contract change affects each repository that uses the skill.

### Non-goals
Non-goal: Bundle source essays.
Non-goal: Add harness-specific features.
Non-goal: Claim behavioral correctness from prompt probes.
Non-goal: Prescribe models or tools.

### Scar tissue
State: None.
Reason: The package has no recorded production incident.
Source: Future incidents populate this section through improve.md.

## Boundaries

### BOUNDARY-STATE
Purpose: Own Phoenix package doctrine, durable state, and review gates.
Writes: `.phoenix/` package state.
Pace: slow.
Regeneration policy: human_reviewed, oracle_gated.

## Oracles

### ORACLE-STATE-001 — Phoenix system review
Owner boundary: `BOUNDARY-STATE`.
Claim: R7.
Claim: R8.
Claim: I7.
Kind: manual_review_gate.
Rendering: `skills/phoenix-review-system/SKILL.md`.
Pass criteria: The reviewer finds each seeded state inconsistency and reports no false blocker.
Failure action: Block merge.

### ORACLE-STATE-002 — Phoenix Rendering review
Owner boundary: `BOUNDARY-STATE`.
Claim: R9.
Claim: I7.
Kind: manual_review_gate.
Rendering: `skills/phoenix-review-rendering/SKILL.md`.
Pass criteria: The reviewer finds each seeded Rendering contradiction and insufficient Oracle.
Failure action: Block merge.

### ORACLE-STATE-003 — Packaged skill discovery
Owner boundary: `BOUNDARY-STATE`.
Claim: R2.
Claim: R8.
Claim: R9.
Kind: static_check.
Rendering: `tests/package.test.mjs`.
Pass criteria: Each packaged skill has valid frontmatter and appears in the npm artifact.
Failure action: Block merge.

## Evidence

### ORACLE-STATE-001 — 2026-08-30
Oracle: `ORACLE-STATE-001`.
Rendering: `skills/phoenix-review-system/SKILL.md` v0.2.0 candidate.
Source: Fresh GPT-5.6 Terra subagent against `tests/fixtures/system-review/SYSTEM.md`.
Source: Review output is recorded in `.phoenix/probes/2026-08-30-review-skills.md`.
Window: One DR-13 diff scenario and one DR-14 full-state scenario on 2026-08-30.
Observed value: The DR-13 reviewer found the reflowed Claim and packed Decision reasons.
Observed value: The DR-14 reviewer found the missing Oracle and duplicate mutation owner.
Threshold: Each reviewer finds all seeded failures without a false blocker.
Result: pass.
Observed at: 2026-08-30.
Valid until: The system review skill or model behavior changes.
Invalidates: `skills/phoenix-review-system/SKILL.md`.

### ORACLE-STATE-002 — 2026-08-30
Oracle: `ORACLE-STATE-002`.
Rendering: `skills/phoenix-review-rendering/SKILL.md` v0.2.0 candidate.
Source: Fresh GPT-5.6 Terra subagent against `tests/fixtures/rendering-review/`.
Source: Review output is recorded in `.phoenix/probes/2026-08-30-review-skills.md`.
Window: One DR-15 scenario on 2026-08-30.
Observed value: The reviewer found the seeded Claim contradiction and insufficient test Oracle.
Threshold: The reviewer finds the two seeded failures despite a green test.
Result: pass.
Observed at: 2026-08-30.
Valid until: The Rendering review skill or model behavior changes.
Invalidates: `skills/phoenix-review-rendering/SKILL.md`.

### ORACLE-STATE-003 — 2026-08-30
Oracle: `ORACLE-STATE-003`.
Rendering: Phoenix package v0.2.0 candidate.
Source: `node --test tests/*.test.mjs` and `npm pack --dry-run --json`.
Window: Local candidate working tree on 2026-08-30.
Observed value: Thirteen tests passed and eleven intended files entered the npm artifact.
Threshold: All tests pass and no `.worktrees/` path enters the artifact.
Result: pass.
Observed at: 2026-08-30.
Valid until: Package layout, tests, or manifests change.
Invalidates: Phoenix package v0.2.0 candidate.

## Decisions

### D-001 — Compress to a single-file seed
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A drill or transcript disproves the stated reasons.
Chose: Use one approximately 215-line SKILL.md.
Rejected: Use an eight-file skill and separate state-layer design of approximately 1,100 lines.
Because: Iteration speed and rule salience beat progressive disclosure at this maturity.
Because: Deleted elaboration is re-derivable from principle.
Clause: E1.
Clause: R1.

### D-002 — Self-host the improvement machinery in-folder
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A drill or transcript disproves the stated reasons.
Chose: Keep CLAIMS.md, drills.md, improve.md, and this file as siblings.
Rejected: Use a bare seed with ad-hoc auditing.
Because: Siblings cost zero runtime context.
Because: Siblings make the loop mechanical from day one.
Clause: I3.

### D-003 — Restore exclusive mutation ownership inline
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A drill or transcript disproves the stated reasons.
Chose: Add a one-sentence invariant in loop step 2.
Rejected: Wait for drill evidence.
Because: The claims audit at C-65 showed an unrecorded drop of an operational corpus rule.
Because: The firing-mode test classifies the rule as a reactive invariant.
Evidence: The CLAIMS gap counts as Evidence under I2.
Clause: I2.
Clause: C-65.

### D-004 — Bundle a Claim inventory, not the corpus
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A drill or transcript disproves the stated reasons.
Chose: Bundle CLAIMS.md with the original synthesis and source URLs.
Rejected: Bundle essay texts.
Because: The seed must stand alone at runtime.
Because: A need for the corpus during work is a drill failure.
Because: We do not own the right to redistribute the full essay texts.
Clause: R1.
Clause: R3.
Clause: Non-goals.

### D-005 — Split on firing mode, not SDLC phase
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A drill or transcript disproves the stated reasons.
Chose: Keep reactive invariants always loaded.
Chose: Move deliberate procedures to references when the runtime budget requires it.
Rejected: Use reference files for each SDLC phase.
Because: Phases interleave during a session.
Because: An always-loaded rule can fail to fire but cannot fail to load.
Clause: E1.

### D-006 — Start with manual improvement cadence
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A drill or transcript disproves the stated reasons.
Chose: Run improve.md on demand for each transcript.
Rejected: Automate the loop after every fixed number of sessions.
Because: Automate only a process that has become boring.
Because: The protocol must expose its own drift first.
Clause: I1.

### D-007 — Distribute one standards-compliant skill folder
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: A supported harness stops using the Agent Skills standard.
Chose: Use one Agent Skills standard folder with a thin Claude Code plugin manifest.
Rejected: Create builds for each harness.
Because: Claude Code, pi, and Codex implement the same SKILL.md standard.
Because: One artifact supports three installs.
Evidence: Harness support verified on 2026-07-08.
Clause: Contracts.

### D-008 — Rename package to Phoenix Architecture
Recorded: 2026-07-08.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: The name no longer identifies the discipline or package clearly.
Chose: Use `phoenix-architecture` for repository, package, plugin, and skill names.
Rejected: Use `regenerative-sdlc` because it is bland and under-attributed.
Rejected: Use `phoenix` because it is overloaded.
Because: The name points to Chad Fowler's Phoenix Architecture.
Because: The name is specific enough for package and skill discovery.
Clause: Contracts.

### D-009 — Adopt existing state and calibrate regeneration
Recorded: 2026-07-10.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: Production use disproves the adopted-state or regeneration rules.
Chose: Treat SYSTEM.md as an optional thin index over existing durable state.
Chose: Restore Claim, Boundary, Oracle, Rendering, and Evidence vocabulary.
Chose: Require data ownership and full Evidence fields.
Chose: Patch mature or slow Renderings.
Chose: Regenerate only bounded and Oracle-covered grains.
Chose: Keep state updates and provenance proportional.
Rejected: Create SYSTEM.md unconditionally.
Rejected: Run the full suite at boot.
Rejected: Regenerate before patching.
Rejected: Require Decision, Ledger, and Why records for every change.
Because: Complete corpus review showed a duplicate-memory risk.
Because: Production state review showed missing Evidence and data structure.
Because: Immutable-code rhetoric conflicted with the later Implementation Remembers warning.
Evidence: Review included a 2,767-line production `.phoenix/` state.
Human decision: Requested directly in the 2026-07-10 review session.
Clause: R5.
Clause: R6.
Clause: I5.
Clause: C-31.
Clause: C-39.
Clause: C-40.
Clause: C-79.
Clause: C-83.

### D-010 — Preserve migration sources and treat drills as probes
Recorded: 2026-07-10.
Former ID: none.
Status: superseded.
Horizon: durable.
Pace: slow.
Revisit when: D-012 no longer supplies a valid source-recovery path.
Superseded by: D-012.
Chose: Archive the exact legacy skill bytes with SHA-256 hashes.
Chose: Create a complete heading-level map.
Chose: Record explicit semantic changes.
Chose: Use drills only as behavioral observations.
Rejected: Delete the old capture after compression.
Rejected: Rely on Git reachability alone.
Rejected: Treat one model run as proof.
Because: Semantic equivalence is not mechanically provable.
Because: Irrecoverable source loss is preventable.
Because: Unmapped units are preventable.
Human decision: Preserve fidelity and data under future automated migrations.
Surviving choice: Drills remain behavioral probes.
Reversed choice: D-012 reversed the byte archive.
Clause: R3.
Clause: R4.
Clause: I1.
Clause: I3.
Clause: I4.

### D-011 — Use owner-based IDs with release and pace metadata
Recorded: 2026-07-10.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: Stable retrieval no longer follows Boundary ownership.
Chose: Use `TYPE-OWNER-NNN` IDs.
Chose: Keep Decision files with their owning component.
Chose: Use stable Oracle catalogs.
Chose: Use separate release manifests.
Rejected: Use date-named Decision files.
Rejected: Put release-specific topic slugs such as `ORACLE-R1-NATIVE-001` in IDs.
Because: Identity must survive wording and release changes.
Because: Owner is the stable retrieval axis.
Because: Applicability, horizon, pace, and revisit triggers change independently.
Human decision: Simplify and harden the migrated state convention.
Clause: R6.

### D-012 — Repo records state, plugin owns processing, and Git is the archive
Recorded: 2026-07-14.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: Git can no longer recover the predecessor source accurately.
Chose: Delete the in-tree legacy byte archive.
Chose: Anchor the predecessor at `adstastic/agent-skills` `phoenix/` commit `c9d81b35b2d4`.
Chose: Ship a generic record-convention checker in `scripts/check.mjs`.
Chose: Make consuming repositories run the checker against their own `.phoenix/` state.
Chose: Make consuming repositories record their own migration fidelity.
Rejected: Keep in-tree source snapshots.
Rejected: Keep SHA-256 manifests.
Rejected: Keep mapping TSV files for each unit.
Rejected: Keep a standing archive checker.
Because: All archived bytes stay reachable in the predecessor repository.
Because: Git already content-addresses the bytes.
Because: An archive checker that validates live targets rots after skill edits.
Because: C-56 requires correctness to be decidable without history.
Human decision: 2026-07-14 review of PR #1.

### D-013 — Use semantic source lines
Recorded: 2026-08-30.
Former ID: none.
Status: superseded.
Superseded by: D-014.
Horizon: durable.
Pace: slow.
Revisit when: Reviewers cannot isolate changed Phoenix facts in source diffs.
Chose: Put each independently reviewable clause or field on a separate physical Markdown line.
Chose: Put the rule in the always-loaded skill and the detailed record grammar.
Chose: Make the checker reject packed fields and semicolon-joined record prose.
Chose: Migrate self-hosted records to the new source layout.
Rejected: Duplicate the format rule across agent-skills consumers.
Rejected: Parse English to count clauses.
Because: The Phoenix Architecture repository owns the installed record format.
Because: Structural checks can reject objective violations without guessing sentence meaning.
Because: A behavioral probe covers the broader semantic outcome.
Evidence: Direct human report that packed Decision, Claim, and Boundary prose obscured source diffs.
Human decision: Direct request on 2026-08-30 to fix the format and open a pull request.
Clause: R7.

### D-014 — Ship Phoenix agent reviews
Recorded: 2026-08-30.
Former ID: none.
Status: current.
Supersedes: D-013.
Horizon: durable.
Pace: slow.
Revisit when: Agent reviews cannot detect known state or Rendering inconsistencies.
Chose: Use `phoenix-review-system` for durable-state consistency and doctrine conformance.
Chose: Use `phoenix-review-rendering` for Rendering conformance to durable system definition.
Chose: Use agent review as the semantic source-layout Oracle.
Chose: Keep `scripts/check.mjs` limited to deterministic structure and cross-references.
Chose: Make zero-record checker output route SYSTEM.md state to `phoenix-review-system`.
Chose: Reuse the historical COMPACT, CARDS, RENDER, and PROVE review knowledge.
Rejected: Use punctuation or field regexes as a semantic clause Oracle.
Rejected: Duplicate adopted SYSTEM.md state into checker-specific record files.
Retained choice: Phoenix records use semantic source lines.
Retained choice: The always-loaded skill and record grammar define the source-layout rule.
Retained choice: Self-hosted records use the source layout.
Reversed choice: The deterministic checker does not judge semantic source layout.
Because: Independently reviewable clauses are a natural-language property.
Because: Phoenix already runs inside an agent that can judge that property in context.
Because: Deterministic structure and semantic review have different failure modes.
Because: Parallel durable state can drift.
Evidence: PR #4 review questioned whether semantic clause checks were deterministic.
Evidence: The semicolon checker reported 16 findings in the provision repository.
Evidence: The semicolon checker reported 612 to 904 findings in each inspected v1 snapshot.
Evidence: Some findings were Claim headings and narrative rather than mutable record fields.
Human decision: Direct request on 2026-08-30 to ship the two Phoenix review skills.
Clause: R7.
Clause: R8.
Clause: R9.
Clause: I7.

## Ledger
Review cadence: Each boot of the improvement loop.
Evidence source: `observations.md`.

### L-1
Type: watch.
Statement: The named n=1 diagnostic is absent.
Claim: C-06.
Claim: C-47.
Revisit when: A second Evidence event supports restoration.
Check by: 2026-10-08.
Status: open.

### L-2
Type: watch.
Statement: The false-layers heuristic is absent.
Statement: The dependency-direction heuristic is absent.
Statement: The pipeline-for-each-layer heuristic is absent.
Claim: C-09.
Claim: C-10.
Claim: C-11.
Check by: 2026-10-08.
Status: open.

### L-3
Type: watch.
Statement: Gradient-of-trust guidance is absent.
Statement: Guidance to quarantine messy code is absent.
Claim: C-20.
Claim: C-21.
Check by: 2026-10-08.
Status: open.

### L-4
Type: watch.
Statement: The rewrite-in-a-day component-size heuristic is absent.
Claim: C-32.
Check by: 2026-10-08.
Status: open.

### L-5
Type: watch.
Statement: Guidance for few interaction models is absent.
Statement: Guidance against shared tables is absent.
Claim: C-37.
Claim: C-66.
Check by: 2026-10-08.
Status: open.

### L-6
Type: watch.
Statement: Yield-metric tracking is absent.
Claim: C-58.
Check by: 2026-10-08.
Status: open.

### L-7
Type: watch.
Statement: Four of five grain tests are absent.
Claim: C-18.
Claim: C-61.
Claim: C-62.
Check by: 2026-10-08.
Status: open.

### L-8
Type: watch.
Statement: The explicit architecture-as-compilation-target layer is absent.
Claim: C-64.
Check by: 2026-10-08.
Status: open.

### L-9
Type: watch.
Statement: Multi-candidate generation is absent.
Statement: Multi-representation specifications are absent.
Statement: LLM-as-judge guidance is absent.
Claim: C-72.
Claim: C-73.
Claim: C-75.
Check by: 2026-10-08.
Status: open.

### L-10
Type: watch.
Statement: The Boundary-change protocol is absent.
Expected behavior: Additive and versioned change with slow deprecation.
Claim: C-78.
Check by: 2026-10-08.
Status: open.

### L-11
Type: watch.
Statement: The implementation graph and selective invalidation are absent.
Claim: C-82.
Check by: 2026-10-08.
Status: open.

### L-12
Type: superseded.
Statement: A mandatory drill gate overstated prompt certainty.
Because: D-010 treats drills as probes.
Check by: 2026-07-10.
Status: closed.

### L-13
Type: assumption.
Statement: Approximately 3,000 tokens on non-trivial triggers produce a net benefit.
Revisit when: Transcript waste events disprove the assumption.
Check by: 2026-10-08.
Status: open.

### L-14
Former ID: L-12.
Type: watch.
Statement: State files do not pin pace-table rows and columns.
Evidence: Deletion test on 2026-07-14.
Check by: 2026-10-14.
Status: open.

### L-15
Former ID: L-13.
Type: watch.
Statement: Only probe results imply the pace-to-question-count budget.
Check by: 2026-10-14.
Status: open.
