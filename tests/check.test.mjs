// RED self-test for scripts/check.mjs: a checker whose failure mode is
// false-green is worse than none, so prove it fails on known damage.
// Run: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, mkdirSync, rmSync, writeFileSync, appendFileSync } from "node:fs";
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

Owner boundary: \`BOUNDARY-CORE\`.

### BOUNDARY-CORE

Owns everything.

Pace: slow. Regeneration policy: oracle_gated.
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

Recorded: 2026-07-14. Former ID: none.
Status: current. Horizon: durable. Pace: slow.
Revisit when: never needed again.

Chose: x. Rejected: y. Because: z.
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
