# Git branching standard

Repo-agnostic branching, release, and commit rules for all projects. Copy this file to a shared location outside individual repositories (for example `~/org-standards/git-branching.md`) and link to it from each project's `AGENTS.md` or `docs/git-branching.md`.

## Promotion flow

```
feat/*, fix/*, chore/*, …  ──PR──▶  staging  ──PR──▶  main
release/*                  ──PR──▶  staging  ──(required before main PR)──┘
```

1. Day-to-day work merges into **`staging`** through a pull request.
2. Before promoting to **`main`**, open a **`release/*`** pull request into **`staging`** that bumps the app version (mobile apps).
3. Only **`staging`** may open a pull request into **`main`**.

Direct pushes to `staging` or `main` are not allowed when branch protection is enabled.

## Branch naming

Use a **descriptive conventional prefix**. The branch name should explain intent without reading the diff.

| Prefix | Use for |
|--------|---------|
| `feat/` | New functionality |
| `fix/` | Bug fixes |
| `chore/` | Maintenance, tooling, deps |
| `docs/` | Documentation only |
| `refactor/` | Behaviour-preserving code changes |
| `test/` | Tests only |
| `ci/` | CI / automation |
| `release/` | Version bump before production promotion |
| `perf/` | Performance improvements |

### Forbidden prefixes

Do **not** use AI-agent or tool-generated branch prefixes, including:

- `cursor/*`
- `copilot/*`
- `agent/*`
- `ai/*`
- `claude/*`
- `codegen/*`

### Release branches

Release branches **must** follow:

```
release/v<major>.<minor>.<patch>
```

The version in the branch name must match the version bumped in the release pull request.

## Pull request targets

| Head branch | Base branch | Allowed |
|-------------|-------------|---------|
| `feat/*`, `fix/*`, `chore/*`, … | `staging` | Yes |
| `release/*` | `staging` | Yes (version bump) |
| `staging` | `main` | Yes (production promotion) |
| Any development branch | `main` | **No** |
| `main` | `staging` | **No** |
| `staging` | `staging` | **No** |

All merges into `staging` and `main` must go through a pull request.

## Mobile app version rules

Applies when the repository ships a mobile app (Android, iOS, or both).

### `release/*` → `staging` (required before `main`)

Before opening `staging` → `main`, merge a **`release/*`** pull request into **`staging`** that:

- Increments **`versionCode`** (Android build number / iOS `CURRENT_PROJECT_VERSION`)
- Updates **`versionName`** / marketing version (semver)
- Keeps platform version fields in sync

### `staging` → `main`

When promoting to production:

- **`versionCode` on `staging` must be greater than on `main`**
- **`versionName` must differ from `main`**
- A version bump from a merged `release/*` branch must already be on `staging`

CI should fail the pull request when these checks are not met.

## Commit authorship

All commits in a pull request must:

- List **you** as the sole author
- Use your GitHub noreply email: `70359198+charankotturi@users.noreply.github.com`
- **Not** include `Co-authored-by:` trailers (no AI co-authors)

Configure Git locally:

```bash
git config user.name "Charan Kotturi"
git config user.email "70359198+charankotturi@users.noreply.github.com"
```

## CI enforcement

Each repository should include a **PR branch rules** GitHub Actions workflow and validation script that check:

- Pull request base branch rules
- Branch naming (allowed / forbidden prefixes)
- Release branch naming pattern
- Mobile version bumps on `release/*` → `staging` and `staging` → `main`
- Commit author email and absence of co-author trailers

Set `PROJECT_TYPE=mobile` and point at your version files when copying the workflow into a new repository.

## GitHub rulesets (when available)

Rulesets require **GitHub Pro**, **GitHub Team**, or a **public** repository. On GitHub Free private repos, rulesets are visible but **not enforced** — rely on the CI workflow and local discipline until you upgrade.

Import ruleset JSON from your project's `docs/github-rulesets/` directory (or equivalent):

| Ruleset | Protects | Purpose |
|---------|----------|---------|
| `main.ruleset.json` | `main` | PR-only, required CI check |
| `staging.ruleset.json` | `staging` | PR-only, required CI check |

After the first workflow run, confirm the required status check name in the GitHub UI and update the JSON `context` field if it differs.

## Reference in other projects

1. Copy this file to `~/org-standards/git-branching.md` (sibling to your project folders).
2. In each repo, add a short `docs/git-branching.md` with project-specific version file paths.
3. Point `AGENTS.md` and `README.md` at the org standard.
4. Copy the workflow and validation script; set project-specific variables.

**Canonical org path:** `~/org-standards/git-branching.md`

---

## This repository (`charan-portfolio`)

- **Project type:** static website (HTML/CSS/JS) — mobile version rules do not apply.
- **Production branch:** `main` (GitHub Pages deploy target).
- **Integration branch:** `staging` — all feature/fix/chore PRs merge here first.
- **No version files** — skip `release/*` branches unless you add a site version in the future.
