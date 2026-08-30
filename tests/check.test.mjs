// RED self-test for scripts/check.mjs: a checker whose failure mode is
// false-green is worse than none, so prove it fails on known damage.
// Run: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const checker = resolve(import.meta.dirname, "../scripts/check.mjs");

function fixtureRun(mutate) {
  const root = mkdtempSync(join(tmpdir(), "phoenix-fixture-"));
  try {
    const px = join(root, ".phoenix");
    mkdirSync(join(px, "decisions"), { recursive: true });
    mkdirSync(join(px, "releases"), { recursive: true });
    writeFileSync(
      join(px, "graph.md"),
      `# Graph

### CLAIM-CORE-001: One claim

Body.
Command example: \`printf x; exit 0\`.

Owner boundary: \`BOUNDARY-CORE\`.

### BOUNDARY-CORE

Owns everything.

Pace: slow.
Regeneration policy: oracle_gated.
`,
    );
    writeFileSync(
      join(px, "oracles.md"),
      `# Oracles

## ORACLE-CORE-001 — Judges the claim

Claim IDs: \`CLAIM-CORE-001\`.

Owner boundary: \`BOUNDARY-CORE\`.

Kind: contract_test

Pass criteria: it passes.
`,
    );
    writeFileSync(join(px, "releases", "r1.md"), "# R1\n\n`ORACLE-CORE-001` `CLAIM-CORE-001` `D-CORE-001`\n");
    writeFileSync(
      join(px, "decisions", "core.md"),
      `# Core Decisions

### D-CORE-001 — A decision

Recorded: 2026-07-14.
Former ID: none.
Status: current.
Horizon: durable.
Pace: slow.
Revisit when: never needed again.

Chose: x.
Rejected: y.
Because: z.
`,
    );
    writeFileSync(join(px, "evidence.md"), "# Evidence\n\n| ORACLE-CORE-001 | dated output | implemented |\n");
    mutate?.(root, px);
    return spawnSync("node", [checker, root], { encoding: "utf8" });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("passes on a minimal valid tree", () => {
  const result = fixtureRun();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Phoenix check passed/);
});

test("fails when a Decision packs fields onto one source line", () => {
  const result = fixtureRun((root, px) => {
    const path = join(px, "decisions", "core.md");
    const content = readFileSync(path, "utf8").replace(
      "Status: current.\nHorizon: durable.\nPace: slow.",
      "Status: current. Horizon: durable. Pace: slow.",
    );
    writeFileSync(path, content);
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /multiple fields on one source line/);
});

for (const [record, fields] of [
  ["Claim", "Statement: one. Owner boundary: `BOUNDARY-CORE`."],
  ["Boundary", "Purpose: one. Sole writer: `items`."],
  ["Oracle", "Kind: contract_test. Pass criteria: it passes."],
  ["Evidence", "Rendering/commit: abc123. Result: pass."],
  ["Ledger", "Type: watch. Check by: 2026-12-01."],
]) {
  test(`fails when ${record} fields share one source line`, () => {
    const result = fixtureRun((root, px) => {
      appendFileSync(join(px, "graph.md"), `\n${fields}\n`);
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /multiple fields on one source line/);
  });
}

test("fails when SYSTEM.md uses a table for mutable records", () => {
  const result = fixtureRun((root, px) => {
    writeFileSync(join(px, "SYSTEM.md"), "# SYSTEM\n\n## Ledger ###  \n\n| ID | Status |\n|---|---|\n| L-1 | open |\n");
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /uses a table for mutable records/);
});

test("allows SYSTEM.md tables outside mutable record sections", () => {
  const result = fixtureRun((root) => {
    writeFileSync(join(root, "SYSTEM.md"), "# SYSTEM\n\n## Pace calibration\n\n| Layer | Pace |\n|---|---|\n| UI | fast |\n");
  });
  assert.equal(result.status, 0, result.stderr);
});

test("fails when record prose joins clauses with a semicolon", () => {
  const result = fixtureRun((root, px) => {
    appendFileSync(join(px, "graph.md"), "\nOne fact; another fact.\n");
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /semicolon joins record prose/);
});

test("fails on a malformed record heading instead of silently dropping it", () => {
  const result = fixtureRun((root, px) => {
    appendFileSync(join(px, "graph.md"), "\n### CLAIM-CORE-999 heading missing its colon\n\nBody.\n");
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /CLAIM-CORE-999/);
});

test("fails when a Claim loses Oracle coverage", () => {
  const result = fixtureRun((root, px) => {
    appendFileSync(
      join(px, "graph.md"),
      "\n### CLAIM-CORE-002: Uncovered claim\n\nBody.\n\nOwner boundary: `BOUNDARY-CORE`.\n",
    );
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /coverage/);
});

test("fails when an Oracle has neither marker nor evidence entry", () => {
  const result = fixtureRun((root, px) => {
    writeFileSync(join(px, "evidence.md"), "# Evidence\n\nNo table here.\n");
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /no source marker and no evidence entry/);
});

test("honors checks.json strictness", () => {
  const result = fixtureRun((root, px) => {
    writeFileSync(join(px, "checks.json"), JSON.stringify({ forbidden_paths: ["LEGACY.md"] }));
    writeFileSync(join(root, "LEGACY.md"), "should not exist\n");
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /forbidden path/);
});
