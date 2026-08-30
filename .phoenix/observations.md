# Observations — dated probe and regeneration runs

## OBS-2026-07-14 — drills DR-01/DR-05/DR-11 + deletion test (claude-fable-5 cold subagents)

- DR-01 (solution-shaped request): PASS, cold. Grilled before building; demanded p95/row counts;
  Redis treated as candidate; proposed cheaper root-cause fixes first; no edits.
- DR-05 (fast-layer proportionality): PASS with caveat. One-line edit, zero interrogation, no state
  churn. NOT fully cold: agent had repo access and read this drill catalog (rubric leak — setup
  convention amended).
- DR-11 (adopt existing state, run against a real .phoenix monorepo, plan-only): PASS, cold.
  Updated existing records, no parallel memory, no ID churn; also surfaced sole-writer violation
  (field with no writer) and matched enum-vs-string to the repo's recorded precedent unprompted.
- Deletion test (regenerate SKILL.md outline from CLAIMS + SYSTEM + drills + improve, real file
  forbidden): PARTIAL. Doctrine buckets regenerated cleanly; loop step 3 and the loop's exact
  scaffolding were unpinned (fixed: I6), pace-table rows/columns only fragmentarily pinned
  (watch L-14), grilling budget dial inferred from two endpoints only (watch L-15).

Per drills.md: observations, not proof. Model claude-fable-5; scenarios in session transcript.
