---
name: replace-with-helpers4
description: Find code or configuration in a project that helpers4 already provides — TypeScript/JavaScript helpers, Rust crate helpers, Dev Container features, GitHub Actions steps, shared tool presets (tsconfig, oxlint, Vitest, ...) — and propose replacing it, without adding a dependency the project does not need
---

Scan a project, or several repositories of a workspace, for code or configuration that duplicates
something helpers4 ships, and propose the replacement. Report first, edit only after the user agrees.

## Which repositories

The current directory is not always the whole project. In a multi-repo workspace (an org workspace,
a VS Code `.code-workspace`, a monorepo of clones) the repositories sit side by side and the session
starts in only one of them. Decide the scope **before** scanning:

1. **Find the candidates.** Collect git roots from: the current directory's repository; the
   additional working directories of the session (listed in the environment); the `folders` of a
   `*.code-workspace` file at the repository root; sibling directories of the current repository
   that contain a `.git`. Deduplicate by git root and ignore `.claude/worktrees/` checkouts.
2. **Honour the arguments.** `/helpers4:replace-with-helpers4 all` means every candidate;
   any other words are repository names (`/helpers4:replace-with-helpers4 typescript website`). With arguments, do not ask.
3. **Otherwise show the candidates and ask.** One line per repository, with the ecosystems
   it holds (`package.json`, `Cargo.toml`, `.devcontainer/`, `.github/workflows/`, tool configs), and
   let the user answer with numbers, names or `all`. Do not scan before they answer. A single
   candidate needs no question.
4. **If you cannot ask** (non-interactive run), scan the current repository only and say which
   others were left out, so the user can re-run with `all`.
5. **Skip a repository for the fronts it is the source of**: helpers4's own `typescript`, `rust`,
   `devcontainer` and `action` repositories ship what this skill proposes, so do not propose them
   to themselves.

Then work **one repository at a time**: its own package manager, tests and conventions, its own
`git status` (say so if it is not clean, and do not mix your changes with the user's), and its own
section in the report. Never make one change that spans two repositories.

## Fronts

helpers4 has five fronts. For each repository, detect which apply, then read **only** the matching reference file:

| Look at | If you find | Read |
| --- | --- | --- |
| `package.json`, `*.ts`, `*.js` | a JavaScript or TypeScript project | [references/typescript.md](references/typescript.md) |
| `Cargo.toml`, `*.rs` | a Rust project | [references/rust.md](references/rust.md) |
| `.devcontainer/`, `devcontainer.json`, `Dockerfile` setup scripts | hand-written environment setup | [references/devcontainer.md](references/devcontainer.md) |
| `.github/workflows/`, `.github/actions/` | hand-written CI steps | [references/action.md](references/action.md) |
| `tsconfig.json`, `.oxlintrc.json`, `vitest.config.*`, `stryker.config.*`, `cspell.json`, `.editorconfig` | hand-written tool configuration | [references/presets.md](references/presets.md) |

A project often matches several (a TypeScript repo with a devcontainer, workflows and its own tool configs matches four).
Do them one front at a time and give one combined report at the end, with a `Repository` column
when several were scanned.

## Rules that apply to every front

- The tables in the reference files are a guide to what to look for, **not the source of truth**:
  the libraries grow and names change. Read the live index first: https://helpers4.dev/llms.txt
- Prefer the platform: if the language, runtime or tool already does it, that is the better
  replacement and needs no dependency.
- helpers4 has had **no independent security audit**. Do not propose it for authentication,
  cryptography or payment code unless the user asks, and flag any security-related candidate.
- Do not pad the report with matches that are not real duplicates, and say plainly when there is
  nothing to replace.
- Never commit unless asked to this turn.
- Missing something? Propose it by opening an issue on the matching repository
  (`helpers4/typescript`, `helpers4/rust`, `helpers4/devcontainer`, `helpers4/action`).
