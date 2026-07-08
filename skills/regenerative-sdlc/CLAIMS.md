# CLAIMS — Corpus Claim Inventory

Every prescriptive claim from the source corpus (*The Phoenix Architecture*, Chad Fowler,
aicoding.leaflet.pub), stated in our own words, with its status in the seed. This file is the
skill's fidelity spec: the seed passes its own deletion test when SKILL.md could be regenerated
from this file plus SYSTEM.md Decisions plus drills.md.

Statuses: **adopted** (→ seed location) · **partial** (function kept, form compressed) ·
**deferred** (dropped; Ledger watch, restore on evidence) · **rejected** (deliberate divergence,
reason given) · **context** (descriptive, no action required). Deferred/partial items map to
Ledger rows (L-n) in SYSTEM.md.

### 01 — Regenerative Software (intro) · /3majnyfydzs2y
- C-01 Durable systems are built from code meant to die; permanence shifts to interfaces,
  behavior, evaluations, stewardship. — **adopted** → Premise
- C-02 The system is the asset; code is a consumable input. — **adopted** → Premise
- C-03 Using AI as a faster typist inside old mental models accelerates entropy. — **context**

### 02 — The Death and Rebirth of Programming · /3malrv6poy22a
- C-04 Producing code is cheap; knowing what it does is not — comprehension is the bottleneck. —
  **adopted** → Premise
- C-05 Disposability becomes the default; mutation accumulates entropy. — **adopted** →
  Regenerate and remember
- C-06 The n=1 developer is an indicator species: systems should fit one mind. — **partial** —
  function folded into deletion test + size budgets; the named n=1 diagnostic dropped (L-1)

### 03 — Pace Layers and AI Integration · /3maob46kbz22v
- C-07 Different layers must change at different rates; confusing them is destructive. —
  **adopted** → Pace calibration
- C-08 AI regenerates freely only where change frequency is high, blast radius low, outcomes
  verifiable. — **adopted** → Pace table
- C-09 Layer heuristics: blast radius, recovery time, dependency direction. — **partial** — first
  two in loop §2; dependency-direction heuristic dropped (L-2)
- C-10 "False layers": hard-to-change code masquerading as foundational; test with "what must a
  replacement preserve?" — **deferred** (L-2)
- C-11 Regeneration cadence matches layer pace; separation encoded in architecture and pipelines.
  — **partial** — cadence in Pace table; architectural/pipeline encoding compressed (L-2)

### 04 — Code Was Never the Asset · /3maqpvianlc2a
- C-12 Code-as-capital is a myth; legacy = expensive to understand, not valuable lines. —
  **adopted** → Premise
- C-13 The economic question is reducing long-term cost of comprehension, evaluation,
  replacement. — **adopted** → Premise

### 05 — Compaction Is a Financial Strategy · /3may5niwoyk2n
- C-14 Kept code carries hidden cognitive + token cost; deletion has measurable ROI. — **adopted**
  → loop §8
- C-15 Bigger context windows don't fix it: attention degrades with noise; smaller inputs reason
  better. — **context** (rationale for size budgets)
- C-16 Target accidental complexity, never essential; goal is minimum semantic complexity. —
  **adopted** → loop §6
- C-17 Deletion politics + Chesterton's Fence: unexplained code is research, not a deletion
  target. — **adopted** → Safety rails
- C-18 Deletable systems need clear seams; loose coupling is a prerequisite for deletion. —
  **partial** → loop §2 mutation ownership + SYSTEM.md split rule; fuller seam guidance (L-7)
- C-19 Replacement beats refactoring; regeneration replaces maintenance. — **adopted** →
  Regenerate and remember

### 06 — The Gradient of Trust · /3mb2qb6odxc2d
- C-20 Shape systems so most code is trustworthy by construction (small, pure, typed, no hidden
  state). — **deferred** (L-3)
- C-21 Quarantine irreducibly messy code at the edges: small, monitored, failures cheap and
  reversible. — **deferred** (L-3)
- C-22 Architectural trust beats code trust; better shapes beat better prompts. — **context**
  (rationale for L-3)

### 07 — Evaluations Are the Real Codebase · /3mb526js42k26
- C-23 Code is a cache — a materialized view of understanding. — **adopted** → Premise
- C-24 Three eval tiers: ephemeral, durable, live. — **adopted** → Evaluations
- C-25 Boundary test: if reimplementation in another language invalidates the suite, the tests
  are at the wrong boundary. — **adopted** → Evaluations
- C-26 Durable eval types: invariants, contracts, property-based, end-to-end behavioral. —
  **adopted** → Evaluations
- C-27 Monitoring is continuous evaluation, including business metrics and inference cost. —
  **adopted** → Evaluations (live tier) + Ledger evidence rows
- C-28 Confidence is the product; code is a byproduct. — **adopted** → Premise

### 08 — Immutable Infrastructure, Immutable Code · /3mbaguyrjek2g
- C-29 Never upgrade code in place when you can regenerate; every in-place edit is a drift event.
  — **adopted** → Regenerate and remember
- C-30 If a component can't be regenerated from spec + evals, the spec is incomplete — the
  failure is the feedback. — **adopted** → Regenerate and remember
- C-31 What survives replacement: interfaces, contracts, evaluations, monitoring, data. —
  **adopted** → Premise
- C-32 Keep components small enough that rewriting one is trivial (roughly a day). — **deferred**
  (L-4)
- C-33 Manual edits are a last resort — a debugging activity, not a development one. — **adopted**
  → Regenerate and remember

### 09 — Conceptual Mass and the Compaction Discipline · /3mbhnolyzds2d
- C-34 Track conceptual mass (concepts, invariants, interfaces, dependencies, exception paths),
  not lines. — **adopted** → loop §8
- C-35 AI silently increases mass; accumulation is the default failure mode. — **adopted** →
  loop §6
- C-36 Compaction is continuous structural pressure, not cleanup; every concept must pay rent. —
  **adopted** → loop §6, §8
- C-37 Deliberately dumb architecture: nouns over verbs, boring CRUD, few communication
  mechanisms, nowhere for bloat to hide. — **deferred** (L-5)

### 10 — The System Is the Asset · /3mbp5ukeuzs22
- C-38 A system is behavior + interfaces + data + invariants; identity lives outside code. —
  **adopted** → Premise
- C-39 Regeneration is local replacement behind stable boundaries, never global amnesia. —
  **adopted** → Regenerate and remember
- C-40 For legacy, the first act is extraction, not rewriting. — **adopted** → Regenerate and
  remember
- C-41 System memory must be explicit and executable, not social (why outsourcing failed). —
  **adopted** → SYSTEM.md protocol
- C-42 Fresh code isn't the risk; unobserved change is. Age isn't stability — visibility is. —
  **adopted** → boot protocol ("trust green evals over prose") + loop §7

### 11 — Relocating Rigor · /3mbrvhyye4k2e
- C-43 Removed constraints must be replaced by relocated rigor; always ask "where did the rigor
  go?" — **adopted** → intro
- C-44 Humans write the evals, machines write the implementation; failing tests don't ship. —
  **adopted** → loop §5
- C-45 Probabilistic inside, deterministic at the edges. — **adopted** → Evaluations framing
- C-46 As generation gets easier, judgment must get stricter. — **adopted** → intro

### 12 — n=1 Is a Design Constraint · /3mbuc4mohwc2k
- C-47 One competent engineer should be able to understand, modify, and regenerate any component
  from spec. — **partial** — folded into deletion test + budgets; named test deferred (L-1)
- C-48 Meaning must be externalized: evals define behavior, contracts live at interfaces,
  monitoring catches drift. — **adopted** → Premise + Evaluations
- C-49 Teams form around interfaces, not around compensating for opacity. — **context**

### 13 — Provenance Is the New Version Control · /3mcbiyal7jc2y
- C-50 The unit of change is a reason; diffs record outcomes, not decisions. — **adopted** →
  loop §4 + Why trailer
- C-51 The decision record (chosen strategy, rejected alternatives, forcing constraints) is part
  of the implementation. — **adopted** → SYSTEM.md Decisions
- C-52 Content-addressed intent graphs as versioning infrastructure. — **rejected** for the seed:
  git trailers + the Decisions log are the minimal working form; graph infra only if querying
  intent ever hurts (growth rules)

### 14 — UI Is a Conservation Layer · /3mcxo5ojob22c
- C-53 UI is the human protocol: slow-layer regardless of how cheap regeneration is. — **adopted**
  → Pace calibration
- C-54 UI changes are rare, deliberate, additive, reversible; absorb volatility internally. —
  **adopted** → Pace calibration

### 15 — The Deletion Test · /3md5ftetaes2e
- C-55 The deletion test: fear of deletion means missing evaluations, not missing courage. —
  **adopted** → Premise
- C-56 Keep oracles, not artifacts: correctness must be distinguishable without reference to
  history. — **adopted** → Evaluations completeness check
- C-57 The goal state is deletion being boring. — **adopted** → Premise

### 16 — The Industrialization of Regenerative Software · /3men54inhes2d
- C-58 Optimize yield (what survives) over throughput; industrialize forgetting. — **partial** —
  principle in loop §8; yield-metrics tracking deferred (L-6)
- C-59 Duplicated logic passing per-copy tests while the shared invariant forks is silent rot. —
  **adopted** → Evaluations (one invariant, one eval)

### 17 — The Regenerative Grain · /3mfai4nqg6224
- C-60 Small means safe to delete, not merely easy to understand. — **adopted** → Premise +
  split rule
- C-61 Grain tests: ~10-minute comprehension, boundary-isolated verification, exclusive mutation
  ownership, versioned contracts, gut check. — **partial** — mutation ownership restored inline
  (loop §2); the other four deferred (L-7)
- C-62 Grain sweet spot: too fine fragments meaning, too coarse explodes verification. —
  **partial** → split guidance; component-grain judgment deferred with C-61 (L-7)
- C-63 Crypto, parsers, hot paths, regulated components: regeneration deliberate and gated. —
  **adopted** → Safety rails

### 18 — Compile to Architecture · /3mgfsrk75ac2l
- C-64 spec → architecture → regenerable components → implementations; architecture is the stable
  compilation target (ISA analogy). — **partial** — implicit in the spec-first loop; explicit
  architecture layer deferred (L-8)
- C-65 Exclusive mutation authority per logical dataset. — **adopted** → loop §2 (restored,
  Decision D-003)
- C-66 Few, consistent interaction models; no ad-hoc endpoints or shared tables. — **deferred**
  (L-5)
- C-67 Evaluation surfaces at every boundary. — **adopted** → Evaluations

### 19 — The Conversation Is the Commit · /3mhxvpam4z22z
- C-68 The conversation plus execution context is the source; code is compiled output. —
  **adopted** (distilled form) → Decisions entries + Why trailer
- C-69 Manual edits are provenance debt: an escape hatch requiring immediate backfill. —
  **adopted** → Regenerate and remember
- C-70 Agent-mediated change makes process enforceable: every change carries a reason and tests,
  and the verification can itself be automated. — **adopted** → the loop as a whole
- C-71 Conversations need a durable substrate tied to the code they produce. — **partial** —
  distillation into Decisions is the minimal form; full transcript storage rejected as sprawl,
  transcripts kept as optional cold storage feeding improve.md

### 20 — The Generative Stack · /3miwhqqvwxc2x
- C-72 Redundant representations per layer catch non-overlapping blind spots. — **partial** —
  multi-strategy evals adopted; multi-representation specs deferred (L-9)
- C-73 Generate multiple candidates; let evaluations arbitrate. — **deferred** (L-9)
- C-74 Stay tool- and model-agnostic; design layers as composition points. — **adopted** → growth
  rules + the plugin's standards-based packaging
- C-75 LLM-as-judge and property tests coexist; each catches what the other misses. — **deferred**
  (L-9; seed's eval list omits LLM-as-judge)

### 21 — The Phoenix Primitives · /3mjfruwwuck2d
- C-76 The primitives that survive deletion: specification, evaluation, context boundary,
  provenance (plus data). — **adopted** → Premise (five artifacts)
- C-77 The spec is the generative source of truth, not documentation; vague specs produce
  unpredictably wrong implementations. — **adopted** → loop §4 + SYSTEM.md Spec
- C-78 Boundaries are the conservation layer; you can't refactor a context boundary like a class.
  — **partial** → loop §2; boundary-change protocol (additive, versioned, slow deprecation)
  deferred (L-10)

### 22 — Production Is a Compiler Input · /3mjx4erlboc2l
- C-79 Evidence decays: a component can fail its spec with zero code change because the world
  changed. — **adopted** → Ledger verify-by rows
- C-80 Requirements include operational and business constraints, not just behavior. — **adopted**
  → Spec envelope (E clauses)
- C-81 Canonicalize raw signals into evidence statements tied to requirements. — **partial** →
  Ledger evidence rows are the minimal form
- C-82 Implementation graph + selective invalidation: regenerate only the stale subgraph, with a
  concrete objective. — **deferred** (L-11)

### 23 — The Implementation Remembers · /3mobohx4fq22x
- C-83 Mature code carries scar tissue: undocumented lessons encoded as retries, timeouts,
  checks, special cases. — **adopted** → Spec scar-tissue section + Regenerate and remember
- C-84 Before cleanup ask: what does this implementation know that we have forgotten? —
  **adopted** → Regenerate and remember
- C-85 Cleanliness and correctness are different properties. — **adopted** → Regenerate and
  remember

## Tally (v0.1)
adopted 55 · partial 13 · deferred 11 · rejected 1 · context 5. Deferred/partial gaps are Ledger
watches L-1…L-11; each restores on the second piece of transcript or drill evidence, per
improve.md.
