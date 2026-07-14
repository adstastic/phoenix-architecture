# IMPROVE — Transcript-Driven Skill Regeneration

This is the skill's own regeneration procedure: production-as-compiler-input, where agent
sessions are production and transcripts are telemetry. Run it as an agent given (a) one or more
session transcripts from an agent using this skill, and (b) this skill folder. The output is
Ledger updates, and — when evidence warrants — a drilled, human-signed change to SKILL.md.

Do not skip to editing. Raw transcript + "make the skill better" is vibe-improving; the value is
in the canonicalization and attribution steps.

## Step 1 — Canonicalize the transcript into evidence events

Read the transcript end to end. Extract discrete events into this table (append to a scratch file
or the review output):

| ID | Type | What happened (1–2 lines, quote turn refs) | Attribution | Skill section / claim |
|----|------|--------------------------------------------|-------------|------------------------|

**Types:** `steering` (human had to correct course) · `violation` (an existing rule didn't fire)
· `dead-end` (work discarded) · `impedance` (skill prescribed something the environment can't do)
· `waste` (effort disproportionate to layer — e.g., over-grilling a fast-layer change) ·
`worked` (a rule visibly earned its keep — capture these too; they mark load-bearing lines that
compaction must protect, per SYSTEM.md I4).

**Attributions:** `skill-content` (rule missing or wrong) · `skill-salience` (rule present but
not noticed/followed) · `repo-state` (target repo's adopted durable state was stale, thin, or
forked) · `model` (capability limit) · `human` (input error/withheld context) · `hard-task`
(genuinely difficult; no process fix). Attribute honestly — the loop dies if the skill absorbs
blame for one-off quirks. Only skill-attributed events, or repeated `repo-state` failures caused by
the generic boot/template contract, may drive SKILL.md changes.

## Step 2 — Route each skill-attributed event

- **First occurrence** of a gap → add a Ledger watch row in SYSTEM.md (or increment an existing
  one). No edit yet.
- **Second occurrence** (this or a prior transcript / an open watch, including CLAIMS.md fidelity
  gaps L-1…L-11) → propose a change.
- `skill-salience` events get salience fixes, not more words: reword for punch, move earlier,
  promote from a subsection into the work loop or safety rails, or add a trigger phrase to the
  frontmatter description. Adding length to fix salience usually worsens it.
- `repo-state` events → fix the target repo state; change the generic state template/boot rule only
  when the same failure recurs across repos.
- `impedance` events → generalize the prescription (e.g., "shadow or canary" → "compare against
  the incumbent by whatever means the environment allows") rather than adding environment
  special-cases.

## Step 3 — Preserve the scenario as a probe

Before editing, add a probe to drills.md when the transcript exposes a reusable scenario. Record
setup, prompt, expected behavior, and failure signal. The probe preserves why wording exists; it is
not proof that one prompt caused or fixed behavior.

## Step 4 — Edit within budget

Make the minimal SKILL.md change that would have prevented the event. Respect E1 (≤250 lines): if
the change breaches budget, shed a deliberate-procedure passage to a reference file per D-005 —
reactive invariants stay inline. Check CLAIMS.md: if the change adopts a deferred claim, flip its
status and close the Ledger watch; if it diverges from the corpus, record the divergence as
`rejected` with the reason.

## Step 5 — Fidelity gate and behavioral observation

For skill changes, rely on this repository's Git history as the source anchor; consuming-repo
migrations record their own fidelity maps in their own state. Run relevant cold-agent probes when they add information;
record model, context, repo snapshot, transcript, and observed misses. Probe output informs human
judgment but does not mechanically validate the skill.

## Step 6 — Sign and record

The skill is slow-layer: present the human the diff, source-fidelity map, observed transcript events,
and rejected alternatives; get an explicit decision. Then append a Decision entry to SYSTEM.md
(chose / rejected / because / evidence IDs / claims touched), update the Ledger, bump the version
in the plugin manifest, and note any probe observations without claiming proof.

## Step 7 — Compaction pass (every few cycles)

Using repeated transcript evidence plus probe history, identify passages that may no longer earn
runtime weight. Delete only after source content is recoverable and its disposition is recorded;
absence from a probe is not evidence that a rule is useless. The skill obeys its own loop §8.

---

**Failure modes of this protocol itself** (watch for these in its early runs): absorbing
`model`/`human` events into skill rules; fixing salience with length; migrating without archived
source and complete mapping; treating a probe as proof; skipping the human gate because the diff
"looks obviously right." Each of these is itself an evidence event — this file is
regenerable by the same procedure.
