# helpers4/ai

AI assistant skills and plugins for [helpers4](https://helpers4.dev): the TypeScript helpers, the
Rust crate, the Dev Container features and the GitHub Actions.

## Claude Code

```text
/plugin marketplace add helpers4/ai
/plugin install helpers4@helpers4
```

| Skill | What it does |
| ----- | ------------ |
| `replace-with-helpers4` | Scans your project for code, devcontainer setup, CI steps or tool configuration (tsconfig, oxlint, Vitest, ...) that helpers4 already provides, and proposes the replacement. Reports first, edits only after you agree. |
| `ci-guidelines` | Audits a GitHub Actions CI against the [helpers4 CI guide](https://helpers4.dev/guides/ci/) and proposes fixes workflow by workflow. |

Contributing a helper to a library is a different job and stays in each library's own repository
(`.claude/skills/add-helper`).

## Layout

```text
.claude-plugin/marketplace.json     # the Claude Code marketplace
plugins/helpers4/                   # the plugin
├── .claude-plugin/plugin.json
└── skills/
    ├── replace-with-helpers4/      # SKILL.md routes to references/<front>.md (typescript, rust, devcontainer, action, presets)
    └── ci-guidelines/
```

Skills are plain `SKILL.md` folders, so they can be packaged for other assistants later without
rewriting them. The reference tables are a guide; every skill reads the live index at
https://helpers4.dev/llms.txt first.

## License

LGPL-3.0-or-later.
