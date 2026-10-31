# AGENTS.md — ai

→ [Org-wide rules](https://github.com/helpers4/.dev/blob/main/AGENTS.md): restrictions · commit format · license headers

## This Repository

**Purpose:** AI assistant skills and plugins for helpers4 — currently one Claude Code marketplace
with one plugin (`helpers4`).

```text
ai/
├── .claude-plugin/marketplace.json
└── plugins/helpers4/
    ├── .claude-plugin/plugin.json
    └── skills/<name>/SKILL.md      # + references/ for progressive disclosure
```

**Rules for skills**

- Report first, edit only after the user agrees. Never commit unless asked.
- The tables of helper names are a guide, never the source of truth: skills must send the reader to
  https://helpers4.dev/llms.txt first.
- Keep `SKILL.md` short and move per-front detail to `references/`.
- A helper name in a table must exist. Spot-check names against the target repository when editing.
- Contributing to a library (`add-helper`) belongs in that library's `.claude/skills`, not here.
