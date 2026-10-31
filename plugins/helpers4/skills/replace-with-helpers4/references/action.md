# GitHub Actions

Replace hand-written workflow steps with a [helpers4 action](https://helpers4.dev/action/)
(`helpers4/action/<name>@<ref>`). Report first, edit only after the user agrees.

## 0. Before anything

- Read the live list: https://helpers4.dev/action/ and the action's README for its inputs. The table
  below is a guide, not the source of truth.
- Read every workflow in `.github/workflows/` and each local action in `.github/actions/`.
- Pin the action the way the repository pins others: a full commit SHA with the tag in a trailing
  comment, never a moving branch (see the `ci-guidelines` skill).

## 1. Find candidates

| Look for | Replace with |
| --- | --- |
| `actions/setup-node` followed by `pnpm/action-setup` and `pnpm install`, with the version read from `packageManager` | `setup-pnpm` |
| a `commitlint` job, or a shell loop validating commit messages or PR titles against Conventional Commits | `conventional-commits` |
| `actions/github-script` or `gh pr comment` creating a comment per run, or a hand-rolled "sticky" comment that tabulates job results | `pr-status-comment` |
| `curl`/`gh api` calls to `/dispatches` with a GitHub App token, with a retry on a second identity | `dispatch-with-fallback` |

## 2. Report before editing

| Where (`file:line`) | Current steps | Action | Gain | Risk |
| --- | --- | --- | --- | --- |

`Risk`: an input the hand-written steps set that the action does not expose, a different caching or
install behaviour (`setup-pnpm` installs dependencies by default: say so), permissions the action
needs (for example `pull-requests: write` for the comment actions).

## 3. Apply, after the user agrees

- Replace one workflow at a time and keep the job names, so required checks do not change.
- Set the job's `permissions` to what the action needs, no wider.
- Validate with `actionlint` if installed; otherwise say it was not run. Never claim a workflow
  passes without a run.

## 4. Do not

- Replace a step whose behaviour the action does not cover.
- Pin to a branch such as `@main` in a workflow that publishes or has write permissions.
