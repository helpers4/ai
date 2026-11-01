# Tool presets (`@helpers4/presets`)

Replace hand-written tool configuration with the shared presets of helpers4: tsconfig, oxlint, oxfmt,
Vitest, Stryker, cspell, EditorConfig and git-cliff. Report first, edit only after the user agrees.

## 0. Before anything

- Read the package README, the source of truth for what each preset does:
  https://github.com/helpers4/typescript/tree/main/presets . The table below is a guide.
- Install it as a dev dependency with the project's package manager (`@helpers4/presets`). The same
  files are reachable from the unified package as `helpers4/presets/…` if the project already depends
  on `helpers4`.
- Presets are **extended**, never pasted: local settings always win, so only the project's own
  differences stay in its config file.
- `@helpers4/presets` is released with every `@helpers4/*` package, under the same version. A stricter
  rule can make an existing lint or type check fail: read the changelog before proposing an upgrade.

## 1. Find candidates

| Look for | Replace with |
| --- | --- |
| a `tsconfig.json` that repeats `strict`, `noUnusedLocals`, `noUnusedParameters`, bundler module resolution | `@helpers4/presets/tsconfig/lib.json` (published library: declarations) or `tsconfig/app.json` (application: DOM, JSX, `noEmit`); both extend `tsconfig/base.json` |
| an `.oxlintrc.json` or an ESLint setup that forbids `any` outside tests, with the usual correctness rules | `@helpers4/presets/oxlint/strict.json`, or `oxlint/app.json` for an application (adds the Vitest and accessibility plugins) |
| a formatter configuration used with oxfmt | `@helpers4/presets/oxfmt.json` |
| a `vitest.config.ts` with coverage thresholds and include patterns | `@helpers4/presets/vitest` (`vitestConfig`) |
| a `stryker.config.*` for mutation testing | `@helpers4/presets/stryker` (`strykerConfig`) |
| a `cspell.json` with a long list of common technical words | `@helpers4/presets/cspell.json`, imported with `"import": [...]` |
| a hand-made `.editorconfig`, a `cliff.toml` for git-cliff | `editorconfig` and `cliff.toml`: copy once from the package (the tools cannot read a file from a package), then replace `OWNER/REPO` in `cliff.toml` |

## 2. Report before editing

| Where (`file:line`) | Current setting | Preset | Gain | Risk |
| --- | --- | --- | --- | --- |

`Risk`: a stricter rule that makes the project's lint, type check or tests fail (say which rule, from
the preset's own file, and how many findings it produces if you ran it), a formatter change that
rewrites many files (oxfmt is not Prettier: do not propose switching formatter just to use a preset),
a setting of the project that the preset does not allow.

## 3. Apply, after the user agrees

- One tool at a time. Extend the preset, delete only the settings it now provides, keep the project's
  differences.
- For Vitest, pass file lists as options to `vitestConfig`: `mergeConfig` **concatenates** arrays, so
  merging two include lists silently runs both.
- Run the project's typecheck, lint and tests after each tool. If a preset rule produces new
  findings, report them and let the user decide: do not silence the rule or loosen the preset to get
  a green run.
- Copied files (`editorconfig`, `cliff.toml`) are snapshots: say so, since they do not update with the
  package.

## 4. Do not

- Replace a project's configuration by a preset that targets another kind of project (a library
  preset for an application).
- Add the package to a project that does not use the tool.
- Edit files inside `node_modules/@helpers4/presets`.
