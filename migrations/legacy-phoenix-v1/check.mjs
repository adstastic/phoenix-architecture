#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const sourceRoot = join(here, "source");
const allowedDispositions = new Set([
  "preserved",
  "superseded",
  "deferred",
  "rejected",
  "archive-only",
]);

function fail(message) {
  console.error(`fidelity check failed: ${message}`);
  process.exit(1);
}

function portable(path) {
  return path.split(sep).join("/");
}

function walk(directory) {
  return readdirSync(directory)
    .sort()
    .flatMap((name) => {
      const path = join(directory, name);
      return statSync(path).isDirectory() ? walk(path) : [path];
    });
}

function markdownHeadings(path) {
  if (!path.endsWith(".md")) return [];
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  let fence = null;
  const headings = [];

  lines.forEach((line, index) => {
    const marker = line.match(/^\s*(```+|~~~+)/)?.[1]?.[0];
    if (marker) {
      fence = fence === marker ? null : fence ?? marker;
      return;
    }
    if (!fence && /^#{1,6} /.test(line)) headings.push(`L${index + 1}:${line}`);
  });

  return headings;
}

const manifestLines = readFileSync(join(here, "manifest.tsv"), "utf8")
  .trimEnd()
  .split("\n");
if (manifestLines.shift() !== "sha256\tsource_file") fail("invalid manifest header");

const manifest = new Map();
for (const line of manifestLines) {
  const [hash, sourceFile, ...extra] = line.split("\t");
  if (!/^[0-9a-f]{64}$/.test(hash) || !sourceFile || extra.length) {
    fail(`invalid manifest row: ${line}`);
  }
  if (manifest.has(sourceFile)) fail(`duplicate manifest file: ${sourceFile}`);
  manifest.set(sourceFile, hash);
}

const archivedFiles = walk(sourceRoot).map((path) => portable(relative(sourceRoot, path)));
for (const sourceFile of archivedFiles) {
  if (!manifest.has(sourceFile)) fail(`archive file missing from manifest: ${sourceFile}`);
}
for (const sourceFile of manifest.keys()) {
  if (!archivedFiles.includes(sourceFile)) fail(`manifest file missing from archive: ${sourceFile}`);
  const bytes = readFileSync(join(sourceRoot, sourceFile));
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== manifest.get(sourceFile)) fail(`hash mismatch: ${sourceFile}`);
}

const expectedUnits = new Set();
for (const sourceFile of archivedFiles) {
  expectedUnits.add(`${sourceFile}\t@file`);
  for (const heading of markdownHeadings(join(sourceRoot, sourceFile))) {
    expectedUnits.add(`${sourceFile}\t${heading}`);
  }
}

const mappingLines = readFileSync(join(here, "mapping.tsv"), "utf8")
  .trimEnd()
  .split("\n");
const expectedHeader =
  "source_file\tsource_unit\tdisposition\ttarget_file\ttarget_unit\trationale";
if (mappingLines.shift() !== expectedHeader) fail("invalid mapping header");

const mappedUnits = new Set();
const counts = new Map();
for (const line of mappingLines) {
  if (!line.trim()) continue;
  const columns = line.split("\t");
  if (columns.length !== 6) fail(`mapping row must have six tab-separated columns: ${line}`);
  const [sourceFile, sourceUnit, disposition, targetFile, targetUnit, rationale] = columns;
  const key = `${sourceFile}\t${sourceUnit}`;

  if (!expectedUnits.has(key)) fail(`mapping references unknown source unit: ${key}`);
  if (mappedUnits.has(key)) fail(`source unit mapped more than once: ${key}`);
  if (!allowedDispositions.has(disposition)) fail(`invalid disposition for ${key}: ${disposition}`);
  if (!rationale.trim()) fail(`missing rationale for ${key}`);

  const targetPath = resolve(repoRoot, targetFile);
  if (targetPath !== repoRoot && !targetPath.startsWith(`${repoRoot}${sep}`)) {
    fail(`target escapes repository: ${targetFile}`);
  }
  if (!existsSync(targetPath) || !statSync(targetPath).isFile()) {
    fail(`target file missing for ${key}: ${targetFile}`);
  }
  if (targetUnit !== "@file") {
    const targetHeadings = new Set(markdownHeadings(targetPath).map((unit) => unit.replace(/^L\d+:/, "")));
    if (!targetHeadings.has(targetUnit)) {
      fail(`target heading missing for ${key}: ${targetFile} ${targetUnit}`);
    }
  }

  mappedUnits.add(key);
  counts.set(disposition, (counts.get(disposition) ?? 0) + 1);
}

const missing = [...expectedUnits].filter((unit) => !mappedUnits.has(unit));
if (missing.length) fail(`unmapped source units:\n${missing.join("\n")}`);

const semanticLines = readFileSync(join(here, "semantic-changes.tsv"), "utf8")
  .trimEnd()
  .split("\n");
const semanticHeader =
  "source_file\tsource_prefix\tdisposition\ttarget_file\ttarget_prefix\trationale";
if (semanticLines.shift() !== semanticHeader) fail("invalid semantic-change header");

for (const line of semanticLines) {
  const columns = line.split("\t");
  if (columns.length !== 6) fail(`semantic-change row must have six columns: ${line}`);
  const [sourceFile, sourcePrefix, disposition, targetFile, targetPrefix, rationale] = columns;
  if (!manifest.has(sourceFile)) fail(`semantic change references unknown source: ${sourceFile}`);
  if (!allowedDispositions.has(disposition)) {
    fail(`invalid semantic-change disposition for ${sourceFile}: ${disposition}`);
  }
  if (!rationale.trim()) fail(`missing semantic-change rationale for ${sourceFile}: ${sourcePrefix}`);
  const sourceLines = readFileSync(join(sourceRoot, sourceFile), "utf8").split(/\r?\n/);
  if (!sourceLines.some((sourceLine) => sourceLine.startsWith(sourcePrefix))) {
    fail(`semantic source prefix missing: ${sourceFile} ${sourcePrefix}`);
  }
  const targetPath = resolve(repoRoot, targetFile);
  if (targetPath !== repoRoot && !targetPath.startsWith(`${repoRoot}${sep}`)) {
    fail(`semantic target escapes repository: ${targetFile}`);
  }
  if (!existsSync(targetPath) || !statSync(targetPath).isFile()) {
    fail(`semantic target file missing: ${targetFile}`);
  }
  const targetLines = readFileSync(targetPath, "utf8").split(/\r?\n/);
  if (!targetLines.some((targetLine) => targetLine.startsWith(targetPrefix))) {
    fail(`semantic target prefix missing: ${targetFile} ${targetPrefix}`);
  }
}

const summary = [...counts.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([name, count]) => `${name}=${count}`)
  .join(", ");
console.log(
  `fidelity check passed: ${archivedFiles.length} files, ${expectedUnits.size} units (${summary}), ${semanticLines.length} notable semantic changes`,
);
