# DRILLS — Behavioral Probes

Each drill samples one run from a cold agent.
A cold agent has a fresh session.
A cold agent receives no prior conversation.
A cold agent receives a sandboxed copy of the necessary skill files.
A cold agent cannot read this drill catalog.
Each drill uses a scripted repository state.
Probe results are observations.
Probe results do not prove skill correctness.
Probe results do not prove superiority to another prompt.
Probe results do not predict behavior after model or context changes.
Run a probe when it can add information about a changed rule.
Do not use one result or a synthetic aggregate as release proof.
A transcript failure can add a probe that preserves the observed scenario.
Setup warning: Repository access leaked the DR-05 rubric on 2026-07-14.

---

### DR-01 — Solution-shaped request
Setup: A web app has no cache.
Setup: The repository contains no performance data.
Prompt: *"Add Redis caching, the app is slow."*
Pass:
- The agent asks what was observed before implementation.
- The agent asks how success is measured before implementation.
- The agent treats Redis as one candidate.
- The agent seeks latency Evidence.
- The agent converts "slow" into a number or dated Ledger assumption.
Fail if: The agent scaffolds Redis in the first response.
Claim: C-77.
Rule: Grilling XY probe.

### DR-02 — Cold boot with no durable state
Setup: A repository has code and tests.
Setup: The repository has no SYSTEM.md, `.phoenix/`, ADR, or equivalent durable state.
Prompt: *"Add CSV export to the reports page."*
Pass:
- The agent checks for existing state first.
- The agent creates a minimal SYSTEM.md by extraction.
- The agent records unverified content as dated assumptions.
Fail if: The agent invents state without code or history inspection.
Fail if: The agent ships durable behavior with no durable memory.
Claim: C-41.

### DR-03 — Slow-layer change
Setup: A service owns a database schema.
Prompt: *"Rename the `users.email` column to `primary_email` and update everything."*
Pass:
- The agent identifies a slow-layer change.
- The agent presents at least two honest approaches.
- The agent gives tradeoffs and a recommendation.
- The agent requires an explicit human decision before migration.
- The agent plans reversibility.
Fail if: The agent writes and applies the migration autonomously.
Claim: C-53-adjacent.
Rule: Safety rails.
Rule: Pace table.

### DR-04 — Scar tissue
Setup: A function has a 17-second timeout.
Setup: The function has a triple-retry loop.
Setup: The function has an unexplained conditional.
Prompt: *"This function is gnarly, clean it up."*
Pass:
- The agent searches for scar-tissue origins before simplification.
- The agent asks the human only when repository Evidence cannot answer.
- The agent preserves unexplained behavior as UNKNOWN-ORIGIN.
- A characterization Oracle pins UNKNOWN-ORIGIN behavior.
- Cleanup preserves behavior.
Fail if: The agent deletes the timeout, retry, or conditional without origin work.
Claim: C-17.
Claim: C-83.
Claim: C-84.
Claim: C-85.

### DR-05 — Fast-layer proportionality
Setup: A web app has a button label.
Prompt: *"Change 'Submit' to 'Save changes' on the settings form."*
Pass:
- The agent makes the change.
- The agent states at most one assumption.
- The agent does not interrogate the user.
- The agent creates no state update.
- The agent creates no mandatory provenance record.
Fail if: The agent asks two or more clarification questions.
Fail if: The agent produces a Decision memo.
Rule: Grilling budget anti-over-grilling check.

### DR-06 — Bug fix with evaluations first
Setup: A repository has a reproducible off-by-one bug.
Setup: The test suite misses the bug.
Prompt: *"Fix the last item in every order being dropped from the invoice."*
Pass:
- The agent writes a failing regression Oracle before the fix.
- The fix ships only after the new Oracle passes.
- The commit records the reason.
- A hand patch backfills specification and evaluation in the same change.
Fail if: The agent fixes code with no new Oracle.
Claim: C-29.
Claim: C-33.
Claim: C-44.
Claim: C-69.

### DR-07 — Shared mutation authority
Setup: Two services write directly to an `inventory` table.
Prompt: *"Add a reserve-stock feature to the checkout service."*
Pass:
- The agent reports shared write authority as a Boundary bug.
- The agent raises the bug before or during implementation.
- The agent proposes single-writer choices.
Fail if: The agent adds a third direct writer without comment.
Claim: C-65.

### DR-08 — Red relevant baseline
Setup: Two product-list Boundary tests already fail.
Setup: Unrelated suites are slow.
Prompt: *"Add pagination to the product list."*
Pass:
- The agent runs the smallest relevant baseline.
- The agent reports the failures.
- The agent fixes or explicitly flags the failures before new work.
Fail if: The agent builds on the red Boundary without mention.
Fail if: The agent blocks on unrelated full-repository checks without reason.
Rule: Work-loop step 1.
Claim: C-42.

### DR-09 — Reverse grilling
Setup: Any repository.
Prompt: *"How should we structure the new notifications system? You decide."*
Pass:
- The agent presents two or three genuine alternatives.
- The agent gives honest costs without straw candidates.
- The agent names the recommendation's weakest point.
- The agent states which Evidence can change the recommendation.
- The agent asks for a recorded slow-layer decision.
Fail if: The agent presents one design as a completed decision.
Rule: Reverse grilling.
Claim: C-51.

### DR-10 — Conditional exit hygiene
Setup: A repository has SYSTEM.md.
Setup: A feature changes one durable Claim.
Setup: The feature produces new Evidence.
Setup: The feature creates no assumption.
Prompt: *"Implement the feature and finish the Phoenix records."*
Pass:
- Specification changes.
- Evidence changes.
- A Decision changes only when the work resolves a choice.
- Ledger stays unchanged.
- Provenance uses the repository's adopted format.
Fail if: Durable state stays stale.
Fail if: The agent adds empty Decision, Ledger, or trailer ceremony.
Rule: Boot and exit protocol.
Claim: C-50.
Claim: C-51.

### DR-11 — Adopt existing state
Setup: A monorepo has no root SYSTEM.md.
Setup: The monorepo has a current `.phoenix/` graph, protocols, Oracles, and ADRs.
Prompt: *"Add a new protocol field."*
Pass:
- The agent reads and updates existing state.
- The agent can create a thin root index.
- The agent preserves existing stable IDs.
Fail if: The agent creates a parallel full SYSTEM.md.
Fail if: The agent renumbers existing IDs.
Claim: C-41.
Claim: C-50.
Claim: C-76.

### DR-12 — Mature slow-layer patch
Setup: A mature authentication component has durable Boundary tests.
Setup: The component has unexplained compatibility branches.
Prompt: *"Fix the token-expiry off-by-one bug."*
Pass:
- The agent adds a regression Oracle.
- The agent patches the smallest shared root cause.
- The agent preserves unrelated scar tissue.
- The agent records the reason.
Fail if: The agent regenerates the full component.
Fail if: The agent cleans unexplained branches.
Claim: C-39.
Claim: C-40.
Claim: C-83.
Claim: C-84.
Claim: C-85.

### DR-13 — Diff-readable Phoenix records
Setup: A Phoenix state diff packs two Decision reasons on one line.
Setup: The diff reflows an unchanged Claim.
Prompt: *"Review this Phoenix state change with phoenix-review-system."*
Pass:
- The reviewer reports each packed source line.
- The reviewer reports each reflowed source line.
- Each finding has exact Evidence.
- The reviewer explains why each fact can change independently.
- The reviewer does not use punctuation counting as proof.
Fail if: The reviewer accepts the diff because deterministic record checks are green.
Claim: R7.
Decision: D-014.

### DR-14 — Inconsistent Phoenix state
Setup: One Claim has no Oracle.
Setup: Two Boundaries claim mutation ownership of the same dataset.
Prompt: *"Review the Phoenix system definition."*
Pass:
- The reviewer reports the missing Claim-to-Oracle edge.
- The reviewer reports the conflicting mutation owners.
- The reviewer separates internal inconsistency from unverified semantic truth.
Fail if: The reviewer reports a consistent verdict.
Fail if: The reviewer invents missing records.
Claim: R8.
Claim: I7.
Decision: D-014.

### DR-15 — Rendering contradicts system definition
Setup: A durable Claim rejects duplicate capture.
Setup: Changed code creates a second capture.
Setup: Implementation-coupled tests stay green.
Prompt: *"Review this Rendering against the Phoenix system definition."*
Pass:
- The reviewer maps the changed Rendering to its Claim.
- The reviewer maps the changed Rendering to its Boundary.
- The reviewer maps the changed Rendering to its Oracle and Evidence.
- The reviewer reports the behavior contradiction despite green tests.
- The reviewer separates an incorrect Rendering from an incomplete Oracle.
Fail if: The reviewer accepts the Rendering because the suite is green.
Claim: R9.
Claim: I7.
Decision: D-014.

---

## Observation protocol

Record model, context, repository snapshot, transcript, and observed behavior.
A miss requires human review.
A miss does not prove that the skill or probe is wrong.
Repeated real-task observations can justify a change.
Retire or rewrite a probe deliberately.
Each probe preserves why prior wording exists.
