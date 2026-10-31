# Dev Container features

Replace hand-written devcontainer setup with a [helpers4 feature](https://helpers4.dev/devcontainer/)
(`ghcr.io/helpers4/devcontainer/<name>:1`). Report first, edit only after the user agrees.

## 0. Before anything

- Read the live list: https://helpers4.dev/devcontainer/ and each feature's README, which documents
  its options. The table below is a guide, not the source of truth.
- Read the whole `.devcontainer/` folder (`devcontainer.json`, `Dockerfile`, `postCreateCommand`
  scripts, `devcontainer-lock.json`) before judging.
- Features are pinned by major (`:1`). If the project locks features, keep the lock file in step:
  tell the user it updates on the next rebuild or with `devcontainer upgrade`.

## 1. Find candidates

| Look for | Replace with |
| --- | --- |
| a `mounts` entry or script that shares the pnpm store between containers, a stray `.pnpm-store` in repos | `pnpm-store` |
| a `postCreateCommand` that runs `npm/yarn/pnpm install` on creation | `package-auto-install` |
| a script copying `~/.gitconfig`, `~/.ssh`, `~/.npmrc` into the container | `dotfiles-sync` |
| a volume or mount keeping shell history across rebuilds | `shell-history` |
| installing the `anthropic.claude-code` extension or the `claude` CLI, persisting `~/.claude` | `claude-dev` |
| installing the Cline, Kimi, Mistral Vibe or Copilot extensions or CLIs by hand | `cline-dev`, `kimi-dev`, `mistral-dev`, `copilot-dev` |
| installing `gh` and the GitHub VS Code extensions | `github-dev` |
| installing `git-absorb`, the Graphite CLI | `git-absorb`, `graphite-dev` |
| installing the Bitwarden Secrets Manager CLI (`bws`) | `bitwarden-secrets-manager` |
| `playwright install-deps` and browser binaries in a Dockerfile | `playwright-dev` |
| a hand-written VS Code header/licence snippet setup | `auto-header` |
| a list of TypeScript/JavaScript or Angular VS Code extensions and settings | `typescript-dev`, `angular-dev`, `essential-dev` |
| installing Vite+ (`vp`), Vitest, Oxlint, Oxfmt by hand | `vite-plus` |
| installing nub, or a script cloning several repos of an org side by side | `nub`, `org-workspace` |

## 2. Report before editing

| Where (`file:line`) | Current setup | Feature | Gain | Risk |
| --- | --- | --- | --- | --- |

`Risk`: an option the hand-written version set that the feature does not expose (read the feature's
README), a base image that already provides it, a feature that adds extra behaviour (the helpers4
features also repair broken host paths in the git config and restore the SSH signing key — say so).

## 3. Apply, after the user agrees

- Add the feature to `features` in `devcontainer.json` with the options it documents, then remove
  the code it replaces. One feature at a time.
- If a feature declares `dependsOn` (for example `nub` needs the official `node` feature), tell the
  user what is pulled in.
- Validate with `devcontainer build` if the CLI is installed; otherwise say it was not run.

## 4. Do not

- Add a feature for something the base image already does.
- Replace a customisation with a feature that cannot express it.
- Touch `devcontainer-lock.json` by hand.
