# Phoenix Architecture

Multi-harness agent skill for Chad Fowler's *Phoenix Architecture* / regenerative software discipline.

Inspired by Chad Fowler's *The Phoenix Architecture* (https://aicoding.leaflet.pub). Not affiliated with or endorsed by Chad Fowler.

The core artifact is one standards-compliant Agent Skill at `skills/phoenix-architecture/SKILL.md`. Harness-specific manifests make the same skill installable in Claude Code, Codex, and Pi without copying it.

## Layout

```text
.claude-plugin/plugin.json          Claude Code plugin manifest
.claude-plugin/marketplace.json     Claude Code marketplace catalog
.codex-plugin/plugin.json           Codex plugin manifest
.agents/plugins/marketplace.json    Codex marketplace catalog
package.json                        Pi package manifest
skills/phoenix-architecture/        Shared Agent Skill
scripts/check.mjs                   Record-convention checker for consuming repos
```

## Install

### Claude Code

```bash
claude plugin marketplace add adstastic/phoenix-architecture
claude plugin install phoenix-architecture@phoenix-tools
```

For local development:

```bash
claude --plugin-dir .
claude plugin validate .
```

### Codex

```bash
codex plugin marketplace add adstastic/phoenix-architecture
codex plugin add phoenix-architecture@phoenix-tools
```

For direct skill development, symlink the shared skill:

```bash
ln -s "$(pwd)/skills/phoenix-architecture" ~/.agents/skills/phoenix-architecture
```

### Pi

```bash
pi install git:github.com/adstastic/phoenix-architecture@v0.1.2
```

For local development:

```bash
pi install .
```

## Layout

The repo applies the plugin to itself: processing ships in `skills/` and `scripts/`; the plugin's
own state lives in `.phoenix/`, and CI runs `node scripts/check.mjs .` against it.

```text
skills/phoenix-architecture/
  SKILL.md     runtime seed (the only file agents auto-load)
  records.md   record grammar reference for consuming repos
.phoenix/
  SYSTEM.md    skill state: spec, decisions, ledger
  CLAIMS.md    corpus claim inventory
  drills.md    cold-agent behavioral probes
  improve.md   transcript-driven improvement protocol
```

## Improvement loop

1. Work normally with the skill.
2. Export a session transcript.
3. Ask a fresh agent to run `.phoenix/improve.md` on the transcript.
4. Make minimal skill edits, record uncertainty as Decisions, and get human review.
5. Treat behavioral probes as observations, not proof; validate package structure, then tag release.

## Repo contract

The plugin owns Phoenix processing; a consuming repo only records state (`.phoenix/` records) for
the plugin to process. The repo's `AGENTS.md` should ensure the plugin is installed:

```markdown
Durable state lives in `.phoenix/` and is processed by the phoenix-architecture plugin:
`claude plugin marketplace add adstastic/phoenix-architecture && claude plugin install phoenix-architecture@phoenix-tools`
```

Validate a consuming repo's records locally or in CI (pin a tag in CI):

```bash
node scripts/check.mjs /path/to/repo
curl -fsSL https://raw.githubusercontent.com/adstastic/phoenix-architecture/<tag>/scripts/check.mjs | node - .
```

## Predecessor

This skill supersedes the v1 phoenix skill. Its exact source lives in its own repository —
[`adstastic/agent-skills` `phoenix/` @ `c9d81b35b2d4`](https://github.com/adstastic/agent-skills/tree/c9d81b35b2d4/phoenix)
— which is the recovery anchor; no bytes are duplicated here. Repos migrating from it record their
own migration fidelity (commit anchors, ID rename maps, notable semantic changes) in their own
state, as Phoenix prescribes.
