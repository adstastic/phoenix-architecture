# CLAIMS — Corpus Claim Inventory

Source: *The Phoenix Architecture* by Chad Fowler.
Source URL: aicoding.leaflet.pub.
Purpose: Restate each prescriptive corpus Claim in our own words.
Purpose: Record each Claim disposition in the seed.
Deletion test: CLAIMS.md, SYSTEM.md Decisions, and drills.md can regenerate SKILL.md.

## Status grammar

`adopted`: The seed contains the Claim.
`partial`: The seed keeps the function in a compressed form.
`deferred`: The seed omits the Claim and a Ledger watch tracks it.
`rejected`: The seed deliberately diverges and records a reason.
`context`: The Claim is descriptive and needs no action.
Deferred and partial Claims reference Ledger rows in SYSTEM.md.

### 01 — Regenerative Software (intro) · /3majnyfydzs2y

### C-01
Statement: Durable systems are built from code meant to die.
Statement: Permanence shifts to interfaces.
Statement: Permanence shifts to behavior.
Statement: Permanence shifts to evaluations.
Statement: Permanence shifts to stewardship.
Status: adopted.
Seed location: Premise.

### C-02
Statement: The system is the asset.
Statement: Code is a consumable input.
Status: adopted.
Seed location: Premise.

### C-03
Statement: Using AI as a faster typist inside old mental models accelerates entropy.
Status: context.

### 02 — The Death and Rebirth of Programming · /3malrv6poy22a

### C-04
Statement: Producing code is cheap.
Statement: Knowing what code does is costly.
Statement: Comprehension is the bottleneck.
Status: adopted.
Seed location: Premise.

### C-05
Statement: Disposability becomes the default.
Statement: Mutation accumulates entropy.
Status: adopted.
Seed location: Regenerate and remember.

### C-06
Statement: The n=1 developer is an indicator species.
Statement: Systems should fit one mind.
Status: partial.
Disposition: The deletion test keeps this function.
Disposition: Size budgets keep this function.
Disposition: The named n=1 diagnostic dropped.
Ledger: L-1.

### 03 — Pace Layers and AI Integration · /3maob46kbz22v

### C-07
Statement: Different layers must change at different rates.
Statement: Confusing them is destructive.
Status: adopted.
Seed location: Pace calibration.

### C-08
Statement: AI regenerates freely only where change frequency is high.
Statement: AI regenerates freely only where blast radius is low.
Statement: AI regenerates freely only where outcomes are verifiable.
Status: adopted.
Seed location: Pace table.

### C-09
Statement: Layer heuristics include blast radius.
Statement: Layer heuristics include recovery time.
Statement: Layer heuristics include dependency direction.
Status: partial.
Disposition: Loop §2 keeps the blast-radius heuristic.
Disposition: Loop §2 keeps the recovery-time heuristic.
Disposition: Dependency-direction heuristic dropped.
Ledger: L-2.

### C-10
Statement: "False layers": hard-to-change code masquerading as foundational.
Statement: Test with "what must a replacement preserve?".
Status: deferred.
Ledger: L-2.

### C-11
Statement: Regeneration cadence matches layer pace.
Statement: Separation is encoded in architecture.
Statement: Separation is encoded in pipelines.
Status: partial.
Disposition: Cadence stays in the Pace table.
Disposition: Architectural encoding is compressed.
Disposition: Pipeline encoding is compressed.
Ledger: L-2.

### 04 — Code Was Never the Asset · /3maqpvianlc2a

### C-12
Statement: Code-as-capital is a myth.
Statement: Legacy is expensive to understand.
Statement: Legacy lines are not valuable by themselves.
Status: adopted.
Seed location: Premise.

### C-13
Statement: The economic question includes reducing long-term comprehension cost.
Statement: The economic question includes reducing long-term evaluation cost.
Statement: The economic question includes reducing long-term replacement cost.
Status: adopted.
Seed location: Premise.

### 05 — Compaction Is a Financial Strategy · /3may5niwoyk2n

### C-14
Statement: Kept code carries hidden cognitive cost.
Statement: Kept code carries hidden token cost.
Statement: Deletion has measurable ROI.
Status: adopted.
Seed location: Loop §8.

### C-15
Statement: Bigger context windows do not fix excessive context.
Statement: Attention degrades with noise.
Statement: Smaller inputs reason better.
Status: context.
Role: Rationale for size budgets.

### C-16
Statement: Target accidental complexity.
Statement: Do not target essential complexity.
Statement: Goal is minimum semantic complexity.
Status: adopted.
Seed location: Loop §6.

### C-17
Statement: Deletion politics follows Chesterton's Fence.
Statement: Unexplained code requires research.
Statement: Unexplained code is not a deletion target.
Status: adopted.
Seed location: Safety rails.

### C-18
Statement: Deletable systems need clear seams.
Statement: Loose coupling is a prerequisite for deletion.
Status: partial.
Seed location: Loop §2 mutation ownership.
Seed location: SYSTEM.md split rule.
Disposition: Fuller seam guidance.
Ledger: L-7.

### C-19
Statement: Replacement beats refactoring.
Statement: Regeneration replaces maintenance.
Status: adopted.
Seed location: Regenerate and remember.

### 06 — The Gradient of Trust · /3mb2qb6odxc2d

### C-20
Statement: Shape systems so most code is small.
Statement: Shape systems so most code is pure.
Statement: Shape systems so most code is typed.
Statement: Shape systems so most code has no hidden state.
Status: deferred.
Ledger: L-3.

### C-21
Statement: Quarantine irreducibly messy code at the edges.
Statement: Keep quarantined code small.
Statement: Monitor quarantined code.
Statement: Keep quarantined failures cheap.
Statement: Keep quarantined failures reversible.
Status: deferred.
Ledger: L-3.

### C-22
Statement: Architectural trust beats code trust.
Statement: Better shapes beat better prompts.
Status: context.
Role: Rationale for L-3.

### 07 — Evaluations Are the Real Codebase · /3mb526js42k26

### C-23
Statement: Code is a cache — a materialized view of understanding.
Status: adopted.
Seed location: Premise.

### C-24
Statement: The evaluation tiers include ephemeral evaluations.
Statement: The evaluation tiers include durable evaluations.
Statement: The evaluation tiers include live evaluations.
Status: adopted.
Seed location: Evaluations.

### C-25
Statement: Boundary test: if reimplementation in another language invalidates the suite, the tests are at the wrong boundary.
Status: adopted.
Seed location: Evaluations.

### C-26
Statement: Durable evaluation types include invariants.
Statement: Durable evaluation types include contracts.
Statement: Durable evaluation types include property-based evaluations.
Statement: Durable evaluation types include end-to-end behavioral evaluations.
Status: adopted.
Seed location: Evaluations.

### C-27
Statement: Monitoring is continuous evaluation.
Statement: Monitoring includes business metrics.
Statement: Monitoring includes inference cost.
Status: adopted.
Seed location: Evaluations live tier.
Seed location: Ledger Evidence rows.

### C-28
Statement: Confidence is the product.
Statement: Code is a byproduct.
Status: adopted.
Seed location: Premise.

### 08 — Immutable Infrastructure, Immutable Code · /3mbaguyrjek2g

### C-29
Statement: Never upgrade code in place when you can regenerate.
Statement: Every in-place edit is a drift event.
Status: partial.
Seed location: Regenerate and remember.
Disposition: Regeneration requires a bounded grain.
Disposition: Regeneration requires a specified grain.
Disposition: Regeneration requires an Oracle-covered grain.
Disposition: Mature code can be patched to preserve hidden knowledge.
Disposition: Slow code can be patched to preserve hidden knowledge.
Decision: D-009.

### C-30
Statement: Regeneration requires a specification.
Statement: Regeneration requires evaluations.
Statement: Failed regeneration shows an incomplete specification.
Statement: Failed regeneration supplies feedback.
Status: adopted.
Seed location: Regenerate and remember.

### C-31
Statement: Interfaces survive replacement.
Statement: Contracts survive replacement.
Statement: Evaluations survive replacement.
Statement: Monitoring survives replacement.
Statement: Data survives replacement.
Status: adopted.
Seed location: Premise.

### C-32
Statement: Keep components small enough that rewriting one is trivial (roughly a day).
Status: deferred.
Ledger: L-4.

### C-33
Statement: Manual edits are a last resort.
Statement: Manual edits are a debugging activity.
Statement: Manual edits are not a development activity.
Status: partial.
Seed location: Regenerate and remember.
Disposition: Unrecorded reasons are treated as debt.
Disposition: Hand editing itself is not treated as debt.
Because: Mature slow-layer patches can be safer than replacement.
Decision: D-009.

### 09 — Conceptual Mass and the Compaction Discipline · /3mbhnolyzds2d

### C-34
Statement: Track concepts as conceptual mass.
Statement: Track invariants as conceptual mass.
Statement: Track interfaces as conceptual mass.
Statement: Track dependencies as conceptual mass.
Statement: Track exception paths as conceptual mass.
Statement: Do not use line count as conceptual mass.
Status: adopted.
Seed location: Loop §8.

### C-35
Statement: AI silently increases mass.
Statement: Accumulation is the default failure mode.
Status: adopted.
Seed location: Loop §6.

### C-36
Statement: Compaction is continuous structural pressure.
Statement: Compaction is not cleanup.
Statement: Every concept must pay rent.
Status: adopted.
Seed location: Loop §6.
Seed location: Loop §8.

### C-37
Statement: Deliberately dumb architecture prefers nouns over verbs.
Statement: Deliberately dumb architecture prefers boring CRUD.
Statement: Deliberately dumb architecture uses few communication mechanisms.
Statement: Deliberately dumb architecture gives bloat no hiding place.
Status: deferred.
Ledger: L-5.

### 10 — The System Is the Asset · /3mbp5ukeuzs22

### C-38
Statement: A system includes behavior.
Statement: A system includes interfaces.
Statement: A system includes data.
Statement: A system includes invariants.
Statement: Identity lives outside code.
Status: adopted.
Seed location: Premise.

### C-39
Statement: Regeneration is local replacement behind stable Boundaries.
Statement: Regeneration is not global amnesia.
Status: adopted.
Seed location: Regenerate and remember.

### C-40
Statement: For legacy, the first act is extraction.
Statement: For legacy, the first act is not rewriting.
Status: adopted.
Seed location: Regenerate and remember.

### C-41
Statement: System memory must be explicit.
Statement: System memory must be executable.
Statement: System memory must not be social.
Status: adopted.
Seed location: SYSTEM.md protocol.

### C-42
Statement: Fresh code isn't the risk.
Statement: Unobserved change is the risk.
Statement: Age is not stability.
Statement: Visibility produces stability.
Status: adopted.
Seed location: Boot protocol at "trust green evals over prose".
Seed location: Loop §7.

### 11 — Relocating Rigor · /3mbrvhyye4k2e

### C-43
Statement: Removed constraints must be replaced by relocated rigor.
Statement: Always ask "where did the rigor go?".
Status: adopted.
Seed location: Intro.

### C-44
Statement: Humans write the evaluations.
Statement: Machines write the implementation.
Statement: Failing tests don't ship.
Status: adopted.
Seed location: Loop §5.

### C-45
Statement: The system can be probabilistic inside.
Statement: The system is deterministic at the edges.
Status: adopted.
Seed location: Evaluations framing.

### C-46
Statement: As generation gets easier, judgment must get stricter.
Status: adopted.
Seed location: Intro.

### 12 — n=1 Is a Design Constraint · /3mbuc4mohwc2k

### C-47
Statement: One competent engineer can understand any component from specification.
Statement: One competent engineer can modify any component from specification.
Statement: One competent engineer can regenerate any component from specification.
Status: partial.
Disposition: The deletion test keeps this function.
Disposition: Budgets keep this function.
Disposition: Named test deferred.
Ledger: L-1.

### C-48
Statement: Meaning must be externalized.
Statement: Evaluations define behavior.
Statement: Contracts live at interfaces.
Statement: Monitoring catches drift.
Status: adopted.
Seed location: Premise.
Seed location: Evaluations.

### C-49
Statement: Teams form around interfaces.
Statement: Teams do not form to compensate for opacity.
Status: context.

### 13 — Provenance Is the New Version Control · /3mcbiyal7jc2y

### C-50
Statement: The unit of change is a reason.
Statement: Diffs record outcomes.
Statement: Diffs do not record decisions.
Status: partial.
Seed location: Loop §4.
Seed location: Repository-adopted provenance.
Disposition: Exact Why trailer is optional to avoid empty ceremony.
Decision: D-009.

### C-51
Statement: The chosen strategy is part of the Decision record.
Statement: Rejected alternatives are part of the Decision record.
Statement: Forcing constraints are part of the Decision record.
Statement: The Decision record is part of the implementation.
Status: adopted.
Seed location: SYSTEM.md Decisions.

### C-52
Statement: Content-addressed intent graphs as versioning infrastructure.
Status: rejected.
Disposition: Git trailers are part of the seed's minimal working form.
Disposition: The Decisions log is part of the seed's minimal working form.
Disposition: Graph infrastructure is deferred.
Revisit when: Querying intent hurts.
Seed location: Growth rules.

### 14 — UI Is a Conservation Layer · /3mcxo5ojob22c

### C-53
Statement: UI is the human protocol.
Statement: UI is slow-layer regardless of regeneration cost.
Status: adopted.
Seed location: Pace calibration.

### C-54
Statement: UI changes are rare.
Statement: UI changes are deliberate.
Statement: UI changes are additive.
Statement: UI changes are reversible.
Statement: Absorb volatility internally.
Status: adopted.
Seed location: Pace calibration.

### 15 — The Deletion Test · /3md5ftetaes2e

### C-55
Statement: Fear of deletion means missing evaluations.
Statement: Fear of deletion does not mean missing courage.
Status: adopted.
Seed location: Premise.

### C-56
Statement: Keep Oracles instead of artifacts.
Statement: Correctness must be distinguishable without history.
Status: adopted.
Seed location: Evaluations completeness check.

### C-57
Statement: The goal state is deletion being boring.
Status: adopted.
Seed location: Premise.

### 16 — The Industrialization of Regenerative Software · /3men54inhes2d

### C-58
Statement: Optimize yield (what survives) over throughput.
Statement: Industrialize forgetting.
Status: partial.
Disposition: Principle in loop §8.
Disposition: Yield-metrics tracking deferred.
Ledger: L-6.

### C-59
Statement: Duplicated logic can pass tests for each copy.
Statement: A shared invariant can fork across copies.
Statement: This condition is silent rot.
Status: adopted.
Seed location: Evaluations (one invariant, one eval).

### 17 — The Regenerative Grain · /3mfai4nqg6224

### C-60
Statement: Small means safe to delete.
Statement: Small does not mean only easy to understand.
Status: adopted.
Seed location: Premise.
Seed location: Split rule.

### C-61
Statement: A grain supports approximately ten-minute comprehension.
Statement: A grain supports Boundary-isolated verification.
Statement: A grain has exclusive mutation ownership.
Statement: A grain uses versioned contracts.
Statement: A grain passes the gut check.
Status: partial.
Disposition: Mutation ownership restored inline (loop §2).
Disposition: Ten-minute comprehension is deferred.
Disposition: Boundary-isolated verification is deferred.
Disposition: Versioned contracts are deferred.
Disposition: The gut check is deferred.
Ledger: L-7.

### C-62
Statement: A grain that is too fine fragments meaning.
Statement: A grain that is too coarse explodes verification.
Status: partial.
Seed location: Split guidance.
Disposition: Component-grain judgment deferred with C-61.
Ledger: L-7.

### C-63
Statement: Cryptography regeneration is deliberate.
Statement: Cryptography regeneration is gated.
Statement: Parser regeneration is deliberate.
Statement: Parser regeneration is gated.
Statement: Hot-path regeneration is deliberate.
Statement: Hot-path regeneration is gated.
Statement: Regulated-component regeneration is deliberate.
Statement: Regulated-component regeneration is gated.
Status: adopted.
Seed location: Safety rails.

### 18 — Compile to Architecture · /3mgfsrk75ac2l

### C-64
Statement: Spec → architecture → regenerable components → implementations.
Statement: Architecture is the stable compilation target (ISA analogy).
Status: partial.
Disposition: Implicit in the spec-first loop.
Disposition: Explicit architecture layer deferred.
Ledger: L-8.

### C-65
Statement: Exclusive mutation authority per logical dataset.
Status: adopted.
Seed location: Loop §2.
Decision: D-003.

### C-66
Statement: Use few interaction models.
Statement: Use consistent interaction models.
Statement: Do not use ad-hoc endpoints.
Statement: Do not use shared tables.
Status: deferred.
Ledger: L-5.

### C-67
Statement: Evaluation surfaces at every boundary.
Status: adopted.
Seed location: Evaluations.

### 19 — The Conversation Is the Commit · /3mhxvpam4z22z

### C-68
Statement: The conversation is the source.
Statement: Execution context is the source.
Statement: Code is compiled output.
Status: adopted.
Form: Distilled.
Seed location: Decision entries.
Seed location: Why trailer.

### C-69
Statement: Manual edits are provenance debt.
Statement: Manual edits are an escape hatch.
Statement: Manual edits require immediate backfill.
Status: adopted.
Seed location: Regenerate and remember.

### C-70
Statement: Agent-mediated change makes process enforceable.
Statement: Every change carries a reason.
Statement: Every change carries tests.
Statement: Verification can be automated.
Status: adopted.
Seed location: The loop as a whole.

### C-71
Statement: Conversations need a durable substrate tied to the code they produce.
Status: partial.
Disposition: Distillation into Decisions is the minimal form.
Disposition: Full transcript storage is rejected as sprawl.
Disposition: Optional cold transcript storage feeds improve.md.

### 20 — The Generative Stack · /3miwhqqvwxc2x

### C-72
Statement: Redundant representations per layer catch non-overlapping blind spots.
Status: partial.
Disposition: Multi-strategy evals adopted.
Disposition: Multi-representation specs deferred.
Ledger: L-9.

### C-73
Statement: Generate multiple candidates.
Statement: Let evaluations arbitrate.
Status: deferred.
Ledger: L-9.

### C-74
Statement: Stay tool-agnostic.
Statement: Stay model-agnostic.
Statement: Design layers as composition points.
Status: adopted.
Seed location: Growth rules.
Seed location: Plugin standards-based packaging.

### C-75
Statement: LLM-as-judge and property tests coexist.
Statement: Each catches what the other misses.
Status: deferred.
Ledger: L-9.
Disposition: The seed evaluation list omits LLM-as-judge.

### 21 — The Phoenix Primitives · /3mjfruwwuck2d

### C-76
Statement: Specification survives deletion.
Statement: Evaluation survives deletion.
Statement: Context Boundary survives deletion.
Statement: Provenance survives deletion.
Statement: Data survives deletion.
Status: adopted.
Seed location: Premise (five artifacts).

### C-77
Statement: The specification is the generative source of truth.
Statement: The specification is not documentation.
Statement: Vague specs produce unpredictably wrong implementations.
Status: adopted.
Seed location: Loop §4.
Seed location: SYSTEM.md Spec.

### C-78
Statement: Boundaries are the conservation layer.
Statement: You can't refactor a context boundary like a class.
Status: partial.
Seed location: Loop §2.
Disposition: Additive Boundary change is deferred.
Disposition: Versioned Boundary change is deferred.
Disposition: Slow Boundary deprecation is deferred.
Ledger: L-10.

### 22 — Production Is a Compiler Input · /3mjx4erlboc2l

### C-79
Statement: Evidence decays.
Statement: A component can fail its specification with no code change.
Statement: A world change can cause specification failure.
Status: adopted.
Seed location: Ledger verify-by rows.

### C-80
Statement: Requirements include operational constraints.
Statement: Requirements include business constraints.
Statement: Requirements include more than behavior.
Status: adopted.
Seed location: Spec envelope (E clauses).

### C-81
Statement: Canonicalize raw signals into evidence statements tied to requirements.
Status: partial.
Seed location: Ledger Evidence rows.
Disposition: Ledger Evidence rows are the minimal form.

### C-82
Statement: Maintain an implementation graph.
Statement: Use selective invalidation.
Statement: Regenerate only the stale subgraph.
Statement: Regeneration requires a concrete objective.
Status: deferred.
Ledger: L-11.

### 23 — The Implementation Remembers · /3mobohx4fq22x

### C-83
Statement: Mature code carries scar tissue: undocumented lessons encoded as retries, timeouts, checks, special cases.
Status: adopted.
Seed location: Specification scar-tissue section.
Seed location: Regenerate and remember.

### C-84
Statement: Before cleanup ask: what does this implementation know that we have forgotten?
Status: adopted.
Seed location: Regenerate and remember.

### C-85
Statement: Cleanliness and correctness are different properties.
Status: adopted.
Seed location: Regenerate and remember.

## Tally for v0.2.0 candidate

Adopted: 55.
Partial: 16.
Deferred: 9.
Rejected: 1.
Context: 4.
Ledger coverage: Compression gaps map to L-1 through L-11.
Calibration: C-29, C-33, and C-50 follow D-009.
Calibration status: These are deliberate choices and not missing content.
