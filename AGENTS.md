# Agent instructions — charan-portfolio

Guidance for AI agents and automation working in this repository.

## Project overview

Static portfolio site for Charan Kotturi (Android developer). No build step — `index.html`, `styles.css`, and `script.js` at the repo root. Deploy via GitHub Pages or any static host.

## Git branching and pull requests

**Read the full standard:** [`docs/git-branching.md`](docs/git-branching.md)

### Branch flow

```
feat/*, fix/*, chore/*, docs/*, …  ──PR──▶  staging  ──PR──▶  main
```

- **`main`** — production; GitHub Pages live site.
- **`staging`** — integration branch; all day-to-day work merges here first.
- Never open a PR from a feature branch directly into `main`.

### Creating a branch

1. Branch from **`staging`** (or from `main` only if `staging` does not exist yet — then create `staging` from `main`).
2. Use a **conventional prefix** that describes the change:

| Prefix | Example |
|--------|---------|
| `feat/` | `feat/add-projects-section` |
| `fix/` | `fix/mobile-nav-overlap` |
| `chore/` | `chore/update-dependencies` |
| `docs/` | `docs/git-branching-standard` |

3. **Forbidden prefixes** — never use tool-generated names:

   - `cursor/*`, `copilot/*`, `agent/*`, `ai/*`, `claude/*`, `codegen/*`

4. Keep names lowercase, hyphen-separated, and descriptive.

### Opening a pull request

| Your branch | PR base | Allowed |
|-------------|---------|---------|
| `feat/*`, `fix/*`, `chore/*`, `docs/*`, … | **`staging`** | Yes |
| `staging` | **`main`** | Yes (production promotion) |
| Any dev branch | `main` | **No** |

**Agent checklist before opening a PR:**

- [ ] Branch name uses an allowed prefix (`feat/`, `fix/`, etc.) — not `cursor/*`
- [ ] PR targets **`staging`**, not `main` (unless promoting `staging` → `main`)
- [ ] Commits authored as Charan Kotturi with `70359198+charankotturi@users.noreply.github.com`
- [ ] No `Co-authored-by:` trailers on commits
- [ ] Changes are committed and pushed before creating/updating the PR

### Production promotion (`staging` → `main`)

Only merge `staging` into `main` when the site is ready to go live. This repo has no mobile app version files — `release/*` branches are optional and only needed if versioned releases are introduced later.

### Commit authorship

```bash
git config user.name "Charan Kotturi"
git config user.email "70359198+charankotturi@users.noreply.github.com"
```

Do not add AI co-author trailers.

## Code conventions

- Match existing HTML/CSS/JS style in the repo.
- Keep diffs focused — no unrelated refactors.
- Store project assets under `assets/` (e.g. `assets/projects/`).
- Relative paths for local assets; external links use `target="_blank"` and `rel="noopener noreferrer"`.

## Local preview

```bash
python3 -m http.server 8080
# http://localhost:8080
```
