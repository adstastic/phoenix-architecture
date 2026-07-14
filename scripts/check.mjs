#!/usr/bin/env node
// Phoenix record-convention checker. Processing lives in the plugin; the
// consuming repo only holds state. Run against any repo with a .phoenix/ dir:
//
//   node scripts/check.mjs [repo-root]
//
// In CI, fetch pinned by tag:
//   curl -fsSL https://raw.githubusercontent.com/adstastic/phoenix-architecture/<tag>/scripts/check.mjs | node - .
//
// Every check is feature-detected: a record file that does not exist is
// skipped, a record file that exists is held to the full grammar. This checker
// validates structure and cross-references only — semantic truth belongs to
// Oracles and their evidence.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? ".");
const phoenix = join(root, ".phoenix");
if (!existsSync(phoenix)) fail(`no .phoenix directory under ${root}`);
const read = (path) => readFileSync(join(phoenix, path), "utf8");
const has = (path) => existsSync(join(phoenix, path));

function fail(message) {
  console.error(`Phoenix check failed: ${message}`);
  process.exit(1);
}

function equalSets(left, right, label) {
  const missing = [...left].filter((item) => !right.has(item));
  const extra = [...right].filter((item) => !left.has(item));
  if (missing.length || extra.length) {
    fail(`${label}; missing=[${missing.join(", ")}], extra=[${extra.join(", ")}]`);
  }
}

function blocks(content, headingPattern) {
  const matches = [...content.matchAll(headingPattern)];
  return matches.map((match, index) => ({
    id: match[1],
    owner: match[2],
    text: content.slice(match.index, matches[index + 1]?.index ?? content.length),
  }));
}

const scanned = []; // [file, content] pairs for the loose-heading safety net
const capturedIds = new Set();

// --- graph.md: Boundaries and Claims -----------------------------------------
let boundaryIds = new Set();
let claimIds = new Set();
let claimRecords = [];
if (has("graph.md")) {
  const graph = read("graph.md");
  scanned.push(["graph.md", graph]);
  const boundaryRecords = blocks(graph, /^### (BOUNDARY-([A-Z]+(?:-[A-Z]+)*))$/gm);
  boundaryIds = new Set(boundaryRecords.map((record) => record.id));
  if (boundaryIds.size !== boundaryRecords.length) fail("duplicate Boundary ID");
  for (const boundary of boundaryRecords) {
    capturedIds.add(boundary.id);
    const pace = boundary.text.match(/^Pace: ([a-z_]+)\./m)?.[1];
    if (!new Set(["very_slow", "slow", "medium", "fast"]).has(pace)) {
      fail(`${boundary.id} has invalid Pace`);
    }
    const policies = boundary.text.match(/Regeneration policy: ([a-z_, ]+)\./)?.[1]?.split(", ") ?? [];
    const allowedPolicies = new Set(["human_reviewed", "oracle_gated", "rare"]);
    if (!policies.length || policies.some((policy) => !allowedPolicies.has(policy))) {
      fail(`${boundary.id} has invalid Regeneration policy`);
    }
  }
  claimRecords = blocks(graph, /^### (CLAIM-([A-Z]+(?:-[A-Z]+)*)-\d{3}):/gm);
  claimIds = new Set(claimRecords.map((record) => record.id));
  if (claimIds.size !== claimRecords.length) fail("duplicate Claim ID");
  for (const claim of claimRecords) {
    capturedIds.add(claim.id);
    const owner = claim.text.match(/Owner boundary: `(BOUNDARY-[A-Z]+(?:-[A-Z]+)*)`\./)?.[1];
    if (!owner) fail(`${claim.id} has no primary Owner boundary`);
    if (!boundaryIds.has(owner)) fail(`${claim.id} references missing ${owner}`);
    if (owner !== `BOUNDARY-${claim.owner}`) fail(`${claim.id} owner token disagrees with ${owner}`);
  }
}

// --- oracles.md ---------------------------------------------------------------
let oracleIds = new Set();
if (has("oracles.md")) {
  const oracles = read("oracles.md");
  scanned.push(["oracles.md", oracles]);
  const oracleRecords = blocks(oracles, /^## (ORACLE-([A-Z]+(?:-[A-Z]+)*)-\d{3}) —/gm);
  oracleIds = new Set(oracleRecords.map((record) => record.id));
  if (oracleIds.size !== oracleRecords.length) fail("duplicate Oracle ID");
  const claimsCovered = new Set();
  for (const oracle of oracleRecords) {
    capturedIds.add(oracle.id);
    const owner = oracle.text.match(/Owner boundary: `(BOUNDARY-[A-Z]+(?:-[A-Z]+)*)`\./)?.[1];
    if (boundaryIds.size && owner !== `BOUNDARY-${oracle.owner}`) {
      fail(`${oracle.id} owner token disagrees with ${owner ?? "missing owner"}`);
    }
    const references = [...oracle.text.matchAll(/CLAIM-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)].map((match) => match[0]);
    if (!references.length) fail(`${oracle.id} names no Claims`);
    const kinds = oracle.text.match(/^Kind: (.+)$/m)?.[1]?.split(", ") ?? [];
    const allowedKinds = new Set([
      "contract_test",
      "static_check",
      "snapshot_or_golden",
      "integration_smoke",
      "live_smoke",
      "manual_review_gate",
    ]);
    if (!kinds.length || kinds.some((kind) => !allowedKinds.has(kind))) {
      fail(`${oracle.id} has invalid Kind: ${kinds.join(", ")}`);
    }
    for (const claimId of references) {
      if (claimIds.size && !claimIds.has(claimId)) fail(`${oracle.id} references missing ${claimId}`);
      claimsCovered.add(claimId);
    }
  }
  if (claimIds.size) equalSets(claimIds, claimsCovered, "Claim↔Oracle coverage drifted");
}

// --- releases/*.md ------------------------------------------------------------
const releaseFiles = has("releases")
  ? readdirSync(join(phoenix, "releases")).filter((name) => name.endsWith(".md"))
  : [];
const releaseOracles = new Set();
const releaseClaims = new Set();
const releaseDecisions = new Set();
for (const file of releaseFiles) {
  const release = read(`releases/${file}`);
  scanned.push([`releases/${file}`, release]);
  for (const id of release.matchAll(/ORACLE-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)) {
    if (oracleIds.size && !oracleIds.has(id[0])) fail(`releases/${file} references missing ${id[0]}`);
    releaseOracles.add(id[0]);
  }
  for (const id of release.matchAll(/CLAIM-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)) {
    if (claimIds.size && !claimIds.has(id[0])) fail(`releases/${file} references missing ${id[0]}`);
    releaseClaims.add(id[0]);
  }
  for (const id of release.matchAll(/D-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)) releaseDecisions.add(id[0]);
}
if (releaseFiles.length) {
  for (const claim of claimRecords.filter((record) => /Horizon: release_scoped\./.test(record.text))) {
    if (!releaseClaims.has(claim.id)) fail(`${claim.id} is release-scoped but absent from releases/`);
  }
}

// --- decisions/*.md -----------------------------------------------------------
const decisionIds = new Set();
if (has("decisions")) {
  const decisionFiles = readdirSync(join(phoenix, "decisions")).filter(
    (name) => name.endsWith(".md") && name !== "README.md",
  );
  const formerDecisionIds = new Set();
  for (const file of decisionFiles) {
    const expectedOwner = file.replace(/\.md$/, "").replace(/-/g, "-").toUpperCase();
    const content = read(`decisions/${file}`);
    scanned.push([`decisions/${file}`, content]);
    const records = blocks(content, /^### (D-([A-Z]+(?:-[A-Z]+)*)-\d{3}) —/gm);
    if (!records.length) fail(`decisions/${file} has no Decisions`);
    for (const decision of records) {
      capturedIds.add(decision.id);
      if (decision.owner !== expectedOwner) {
        fail(`${decision.id} is in decisions/${file}, expected owner ${expectedOwner}`);
      }
      if (decisionIds.has(decision.id)) fail(`duplicate Decision ID ${decision.id}`);
      decisionIds.add(decision.id);
      for (const field of ["Recorded:", "Former ID:", "Status:", "Horizon:", "Pace:", "Revisit when:"]) {
        if (!decision.text.includes(field)) fail(`${decision.id} missing ${field}`);
      }
      const formerMatch = decision.text.match(/Former ID: (?:`([^`]+)`|(none))\./);
      const formerId = formerMatch?.[1] ?? formerMatch?.[2];
      if (!formerId || (formerId !== "none" && formerDecisionIds.has(formerId))) {
        fail(`${decision.id} has missing/duplicate Former ID`);
      }
      if (formerId !== "none") formerDecisionIds.add(formerId);
      const status = decision.text.match(/Status: ([a-z_]+)\./)?.[1];
      if (!new Set(["current", "deferred", "historical", "superseded"]).has(status)) {
        fail(`${decision.id} has invalid Status`);
      }
      const horizon = decision.text.match(/Horizon: ([a-z_]+)\./)?.[1];
      if (!new Set(["release_scoped", "until_trigger", "durable", "exploratory"]).has(horizon)) {
        fail(`${decision.id} has invalid Horizon`);
      }
      const pace = decision.text.match(/Pace: ([a-z_]+)\./)?.[1];
      if (!new Set(["very_slow", "slow", "medium", "fast"]).has(pace)) {
        fail(`${decision.id} has invalid Pace`);
      }
      if (horizon === "release_scoped" && releaseFiles.length && !releaseDecisions.has(decision.id)) {
        fail(`${decision.id} is release-scoped but absent from releases/`);
      }
      if (boundaryIds.size && decision.owner !== "STATE" && !boundaryIds.has(`BOUNDARY-${decision.owner}`)) {
        fail(`${decision.id} has no owning Boundary`);
      }
    }
  }
}

// --- evidence.md ---------------------------------------------------------------
if (has("evidence.md")) {
  const evidence = read("evidence.md");
  scanned.push(["evidence.md", evidence]);
  for (const oracleId of evidence.matchAll(/ORACLE-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)) {
    if (oracleIds.size && !oracleIds.has(oracleId[0])) fail(`Evidence references missing ${oracleId[0]}`);
  }
  for (const claimId of evidence.matchAll(/CLAIM-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)) {
    if (claimIds.size && !claimIds.has(claimId[0])) fail(`Evidence references missing ${claimId[0]}`);
  }
  const evidencedOracles = new Set(
    [...evidence.matchAll(/^\| (ORACLE-[A-Z]+(?:-[A-Z]+)*-\d{3}) \|/gm)].map((match) => match[1]),
  );
  if (oracleIds.size && evidencedOracles.size) {
    equalSets(oracleIds, evidencedOracles, "Oracle↔Evidence status map drifted");
  } else if (oracleIds.size) {
    // No hand-written map: coverage is derived from source markers plus evidence mentions.
    const markerCovered = new Set();
    const skip = new Set(["node_modules", ".git", "dist", "build", ".phoenix", ".wrangler"]);
    (function scan(dir) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          if (!skip.has(entry.name)) scan(join(dir, entry.name));
        } else if (/\.(ts|mjs|js|py|go|rs|swift)$/.test(entry.name)) {
          const content = readFileSync(join(dir, entry.name), "utf8");
          for (const id of content.matchAll(/ORACLE-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)) markerCovered.add(id[0]);
        }
      }
    })(root);
    const mentioned = new Set([...evidence.matchAll(/ORACLE-[A-Z]+(?:-[A-Z]+)*-\d{3}/g)].map((m) => m[0]));
    const uncovered = [...oracleIds].filter((id) => !markerCovered.has(id) && !mentioned.has(id));
    if (uncovered.length) fail(`Oracles with no source marker and no evidence entry: ${uncovered.join(", ")}`);
  }
  // ponytail: cited-path resolution tries repo root then one workspace level
  // (services/*/, apps/*/, packages/*/); repos with deeper layouts should cite
  // root-relative paths.
  for (const cited of evidence.matchAll(/`((?:src|sdk|scripts|test|tests)\/[^`]+\.[a-z]+)`/g)) {
    const candidates = [join(root, cited[1])];
    for (const ws of ["services", "apps", "packages"]) {
      const wsDir = join(root, ws);
      if (existsSync(wsDir)) {
        for (const entry of readdirSync(wsDir)) candidates.push(join(wsDir, entry, cited[1]));
      }
    }
    if (!candidates.some((candidate) => existsSync(candidate))) {
      fail(`Evidence cites missing file ${cited[1]}`);
    }
  }
}

// --- loose-heading safety net ---------------------------------------------------
// Strict block patterns require exact punctuation; a malformed record heading
// must fail loudly instead of silently escaping validation (false-green is the
// checker's worst failure mode).
const looseHeading = /^#{2,3} +((?:CLAIM|ORACLE|BOUNDARY|D)-[A-Z]+(?:-[A-Z]+)*(?:-\d{3})?)/gm;
for (const [file, content] of scanned) {
  for (const match of content.matchAll(looseHeading)) {
    if (!capturedIds.has(match[1])) fail(`loose scan found uncaptured record heading ${match[1]} in ${file}`);
  }
}

console.log(
  `Phoenix check passed: ${boundaryIds.size} Boundaries, ${claimIds.size} Claims, ${oracleIds.size} Oracles, ${decisionIds.size} Decisions`,
);
