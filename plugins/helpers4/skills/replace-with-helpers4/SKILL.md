---
name: replace-with-helpers4
description: Find code or configuration in a project that helpers4 already provides — TypeScript/JavaScript helpers, Rust crate helpers, Dev Container features, GitHub Actions steps — and propose replacing it, without adding a dependency the project does not need
---

Scan the current project for code or configuration that duplicates something helpers4 ships, and
propose the replacement. Report first, edit only after the user agrees.

helpers4 has four fronts. Detect which apply, then read **only** the matching reference file:

| Look at | If you find | Read |
| --- | --- | --- |
| `package.json`, `*.ts`, `*.js` | a JavaScript or TypeScript project | [references/typescript.md](references/typescript.md) |
| `Cargo.toml`, `*.rs` | a Rust project | [references/rust.md](references/rust.md) |
| `.devcontainer/`, `devcontainer.json`, `Dockerfile` setup scripts | hand-written environment setup | [references/devcontainer.md](references/devcontainer.md) |
| `.github/workflows/`, `.github/actions/` | hand-written CI steps | [references/action.md](references/action.md) |

A project often matches several (a TypeScript repo with a devcontainer and workflows matches three).
Do them one front at a time and give one combined report at the end.

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
