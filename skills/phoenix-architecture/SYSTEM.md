# SYSTEM

> Scope note: this file describes **the phoenix-architecture skill itself** — it is the skill
> dogfooding its own state protocol. It is not the SYSTEM.md of any repo you are working in.

## Map
One component: the `phoenix-architecture` skill — a single always-loaded SKILL.md plus self-hosting
siblings (CLAIMS.md its spec, drills.md its evals, improve.md its regeneration procedure).
Consumers: coding agents in Claude Code, pi, and Codex (any harness implementing the Agent Skills
standard). Pace layer: **slow** — its blast radius is every future session, so changes require an
explicit human decision.

## Spec
### Requirements
R1. A cold agent with only SKILL.md, a target repo, and a human must complete the full work loop
    end to end — no access to the source corpus required at runtime.
R2. SKILL.md loads whole when triggered; frontmatter description ≤1024 chars.
R3. Every prescriptive corpus claim in CLAIMS.md carries a status (adopted / partial / deferred /
    rejected / context); no silent drops.
R4. All drills in drills.md pass before any released change to SKILL.md.
### Invariants
I1. Skill changes are slow-layer: evidence-attributed, drill-gated, human-signed, recorded as a
    Decision here.
I2. No speculative rules: every addition cites a transcript event or drill failure (first
    occurrence → Ledger watch; second → change). Corpus fidelity gaps count as evidence via CLAIMS.
I3. SKILL.md is the implementation; CLAIMS.md + Decisions + drills.md are the durable layer.
    SKILL.md should be regenerable from them (this skill's own deletion test).
I4. Deletions from SKILL.md respect load-bearing marks: lines exercised by drills or "worked"
    transcript events are protected from compaction.
### Operational envelope
E1. SKILL.md ≤ 250 lines (~3K tokens always-in-context on trigger). On breach: shed
    deliberate-procedure content to a reference file; reactive invariants stay inline (D-005).
### Contracts
The Agent Skills standard (SKILL.md folder, name+description frontmatter) is the distribution
contract with all harnesses. Repo-facing contract: the SYSTEM.md template and Why-trailer format
defined in SKILL.md — changing either is a boundary change for every repo using the skill.
### Non-goals
Bundling the source essays (claims + URLs only). Harness-specific features. CI enforcement of the
skill's own rules (revisit per growth rules). Prescribing models or tools.
### Scar tissue
None yet — v0.1 has no production incidents. Expected to populate via improve.md.

## Decisions (append-only)
### D-001 — 2026-07-08 — Compress to a single-file seed
Chose: one ~215-line SKILL.md. Rejected: 8-file skill + separate state-layer design (~1,100
lines). Because: iteration speed and rule salience beat progressive disclosure at this maturity;
deleted elaboration is re-derivable from principle. Clauses: E1, R1.
### D-002 — 2026-07-08 — Self-host the improvement machinery in-folder
Chose: CLAIMS.md, drills.md, improve.md, and this file as siblings. Rejected: bare seed with
ad-hoc auditing. Because: siblings cost zero runtime context and make the loop mechanical from
day one. Clauses: I3.
### D-003 — 2026-07-08 — Restore exclusive mutation ownership inline
Chose: one-sentence invariant in loop §2. Rejected: waiting for drill evidence. Because: the
claims audit (C-65) showed an unrecorded drop of one of the corpus's most operational rules, and
it is a reactive invariant by the firing-mode test. Clauses: I2 (CLAIMS gap as evidence), C-65.
### D-004 — 2026-07-08 — Bundle a claim inventory, not the corpus
Chose: CLAIMS.md (original synthesis + source URLs). Rejected: bundling essay texts. Because: the
seed must stand alone at runtime; needing the corpus mid-task is a drill failure to fix; full-text
redistribution of the essays isn't ours to do. Clauses: R1, R3, Non-goals.
### D-005 — 2026-07-08 — Split criterion is firing mode, not SDLC phase
Chose: reactive invariants stay always-loaded; deliberate procedures may move to references on
budget breach. Rejected: per-phase reference files (the v1 axis). Because: phases interleave
mid-session; always-loaded rules can't fail to load, only to fire. Clauses: E1.
### D-006 — 2026-07-08 — Manual improvement cadence first
Chose: run improve.md on demand per transcript. Rejected: automated every-N-sessions loop.
Because: automate only what has become boring; the protocol needs its own drift shaken out first.
Clauses: I1.
### D-007 — 2026-07-08 — Distribute as one standards-compliant skill folder
Chose: Agent Skills standard folder + thin Claude Code plugin manifest. Rejected: per-harness
builds. Because: Claude Code, pi, and Codex all implement the same SKILL.md standard (verified
2026-07-08); one artifact, three installs. Clauses: Contracts.
### D-008 — 2026-07-08 — Rename package to Phoenix Architecture
Chose: `phoenix-architecture` for repo, package, plugin, and skill names. Rejected:
`regenerative-sdlc` as too bland and under-attributed, and `phoenix` as overloaded. Because: the
name should point to Chad Fowler's Phoenix Architecture while remaining specific enough for package
and skill discovery. Clauses: Contracts.

## Ledger (review every boot of the improvement loop)
| ID   | Type       | Statement                                                                  | Check by   | Status |
|------|------------|----------------------------------------------------------------------------|------------|--------|
| L-1  | watch      | Named n=1 diagnostic dropped (C-06/C-47); restore on 2nd evidence           | 2026-10-08 | open |
| L-2  | watch      | False-layers + dependency heuristic + pipeline-per-layer dropped (C-09/10/11)| 2026-10-08 | open |
| L-3  | watch      | Gradient of trust / quarantine-messy-code shaping dropped (C-20/21)         | 2026-10-08 | open |
| L-4  | watch      | Rewrite-in-a-day component size heuristic dropped (C-32)                    | 2026-10-08 | open |
| L-5  | watch      | Dumb-architecture guidance: few interaction models, no shared tables (C-37/66)| 2026-10-08 | open |
| L-6  | watch      | Yield metrics tracking dropped (C-58)                                       | 2026-10-08 | open |
| L-7  | watch      | Four of five grain tests compressed away (C-61/62, C-18)                    | 2026-10-08 | open |
| L-8  | watch      | Explicit architecture-as-compilation-target layer (C-64)                    | 2026-10-08 | open |
| L-9  | watch      | Multi-candidate generation, multi-representation specs, LLM-as-judge (C-72/73/75) | 2026-10-08 | open |
| L-10 | watch      | Boundary-change protocol: additive, versioned, slow deprecation (C-78)      | 2026-10-08 | open |
| L-11 | watch      | Implementation graph + selective invalidation (C-82)                        | 2026-10-08 | open |
| L-12 | planned    | Run the full drill set (drills.md) against a real repo with a cold agent    | 2026-08-08 | open |
| L-13 | assumption | ~3K tokens always-loaded is net-positive vs. on-demand loading — verify via waste events in transcripts | 2026-10-08 | open |
