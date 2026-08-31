import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const skills = ["phoenix-architecture", "phoenix-review-system", "phoenix-review-rendering"];

test("package exposes the shared skills directory", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.deepEqual(pkg.pi.skills, ["./skills"]);
});

test("npm artifact includes skills and excludes linked worktrees", () => {
  const result = spawnSync("npm", ["pack", "--dry-run", "--json"], { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const files = JSON.parse(result.stdout)[0].files.map((file) => file.path);
  for (const name of skills) assert.ok(files.includes(`skills/${name}/SKILL.md`), `missing ${name}`);
  assert.ok(files.every((file) => !file.startsWith(".worktrees/")), "artifact contains linked worktree");
});

for (const name of skills) {
  test(`ships ${name} with valid frontmatter`, () => {
    const content = readFileSync(join(root, "skills", name, "SKILL.md"), "utf8");
    const frontmatter = content.match(/^---\n([\s\S]+?)\n---/);
    assert.ok(frontmatter, `${name} has no frontmatter`);
    assert.match(frontmatter[1], new RegExp(`^name: ${name}$`, "m"));
    const description = frontmatter[1].match(/^description: (.+)$/m)?.[1];
    assert.ok(description, `${name} has no description`);
    assert.ok(description.length <= 1024, `${name} description exceeds 1024 characters`);
  });
}
