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

## Skill internals

```text
skills/phoenix-architecture/
  SKILL.md     runtime seed
  SYSTEM.md    skill state: spec, decisions, ledger
  CLAIMS.md    corpus claim inventory
  drills.md    cold-agent eval scenarios
  improve.md   transcript-driven improvement protocol
```

## Improvement loop

1. Work normally with the skill.
2. Export a session transcript.
3. Ask a fresh agent to run `skills/phoenix-architecture/improve.md` on the transcript.
4. Record evidence, add/adjust drills, make minimal skill edits, validate, tag release.
