# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project

**Eclipse Dirigible** website (`www.dirigible.io`). VitePress 1.5 + Vue 3.5 site, deployed to GitHub Pages.

Migrated June 2026 from a Jekyll root + 6 separate MkDocs Material instances (`docs-api/`, `docs-help/`, `docs-blogs/`, `docs-news/`, `docs-releases/`, `docs-home/`) that previously lived in this same repo. The pre-migration history is reachable via `git log` before the squash-merge of PR #126.

## Commands

```bash
npm install          # vitepress + vue
npm run docs:dev     # dev server → http://localhost:8080
npm run docs:build   # production build → docs/.vitepress/dist/
npm run docs:preview # preview built site → http://localhost:8080
```

## Build & deploy model (read this before touching CI)

- **GitHub Pages source: GitHub Actions** (`build_type: workflow`). Verify with `gh api repos/dirigible-io/dirigible-io.github.io/pages`.
- **Workflow:** `.github/workflows/deploy.yaml` — triggers on push to `master` (or `main`) and on `workflow_dispatch`. Steps: checkout → setup-node 20 → `actions/configure-pages@v4` → `npm ci` → `npm run docs:build` → upload `docs/.vitepress/dist` as a pages-artifact → `actions/deploy-pages@v4`.
- **Custom domain `www.dirigible.io`**:
  - `CNAME` file at repo root (informational + legacy).
  - `docs/public/CNAME` (bundled into the artifact under `docs/.vitepress/dist/CNAME`).
  - Pages `cname` field in repo settings — this is the load-bearing one. **`gh api repos/dirigible-io/dirigible-io.github.io/pages --jq .cname` must return `"www.dirigible.io"`**.
- **Noisy legacy runs:** GitHub still triggers the auto-Jekyll "pages build and deployment" workflow on every push to master. It fails because there's no Jekyll content. Harmless — our `deploy.yaml` runs right after and succeeds. GitHub usually stops triggering it eventually.

### Deployment gotchas (lessons learned 2026-06-04)

1. **Switching Pages source from "legacy/branch" to "workflow" wipes the cname.** Restore with:
   ```
   gh api -X PUT /repos/dirigible-io/dirigible-io.github.io/pages -f cname=www.dirigible.io
   ```
2. **After restoring cname, re-trigger the deploy workflow.** The first artifact published while `cname: null` leaves stale routing on the apex `/`. Sub-routes (`/help/`, `/api/`) may return 200 while `/` still 404s. Fix: `gh workflow run deploy.yaml --repo dirigible-io/dirigible-io.github.io --ref master`. After the rerun, `/` resolves.
3. **HTTPS cert + `https_enforced` persist across source switches**, but the cert is tied to the cname — once cname is restored, cert continues working without re-provisioning.

## Repository layout

```
.
├── CNAME                                 # www.dirigible.io (root copy)
├── package.json                          # vitepress ^1.5.0, vue ^3.5.13
├── .github/workflows/deploy.yaml         # VitePress build → Pages
├── docs/
│   ├── index.md                          # home (layout: home)
│   ├── .vitepress/
│   │   ├── config.mts                    # site config, nav, sidebars, head injection
│   │   └── theme/
│   │       ├── index.ts                  # extends DefaultTheme, slots PostHeader into doc-before
│   │       ├── style.css                 # brand vars + listing/header/section-icon CSS
│   │       ├── PostHeader.vue            # renders frontmatter title+meta on /blogs/* and /releases/* posts
│   │       └── utils/
│   │           └── cookie-banner.js      # DOM-injected EU-style cookie banner
│   ├── data/
│   │   ├── blogs.data.ts                 # createContentLoader for /blogs/**/*.md, sorted desc by publish_date
│   │   └── releases.data.ts              # createContentLoader for /releases/**/*.md, sorted desc by publish_date OR url-derived date
│   ├── public/                           # static assets served at /
│   │   ├── CNAME                         # www.dirigible.io (bundled into dist)
│   │   ├── favicon.png
│   │   └── img/logo/                     # dirigible.svg (yellow) + PNG variants
│   ├── images/                           # shared image dir (relative-path resolves here)
│   ├── help/                             # 113 doc pages (from old docs-help)
│   ├── api/                              # 129 SDK pages (from codbex/aerokit June 2026)
│   ├── blogs/                            # ~103 posts (YYYY/MM/DD/slug.md)
│   │   └── index.md                      # blog listing
│   └── releases/                         # 59 release notes (4 new for v10–v13)
│       └── index.md                      # condensed year-grouped listing
```

## Brand

- **Hero name colour:** `#ffb300` (amber/yellow). Used as `--vp-home-hero-name-color`.
- **Brand vars:** `--vp-c-brand-* = --vp-c-yellow-*`.
- **Logo:** `/img/logo/dirigible.svg` (recoloured from `#fecc04` to `#ffb300`). The `dirigible-horizontal.svg` and the PNG variants still use the old yellow — re-export from `dirigible-horizontal.psd` to update.
- **Fonts:** Montserrat (UI), Space Grotesk (fallback), Space Mono (code).
- **Default theme:** `appearance.initialValue: 'dark'` in `config.mts`.

## Navigation & sidebars

```
Home | Documentation (/help/) | API (/api/) | Blog (/blogs/) | More ▾
                                                              ├ Releases (/releases/)
                                                              ├ Downloads (external)
                                                              └ GitHub (external)
```

- `helpSidebar()` in `config.mts` — full nested structure mirroring the legacy MkDocs nav.
- `apiSidebar()` in `config.mts` — matches `codbex/aerokit` modules (`@aerokit/sdk/http`, `@aerokit/sdk/db`, etc.), full submodule listings.

## Post header injection

`docs/.vitepress/theme/PostHeader.vue` is mounted into the DefaultTheme `doc-before` slot. It reads `useData()` and renders only on pages whose `page.relativePath` matches `^(blogs|releases)\/` and **isn't** the listing `index.md`. Renders:

- `<h1>` from `frontmatter.title`
- For posts that have them: avatar + author + publish_date + read_time meta row

Listing pages (`/blogs/`, `/releases/`) use `layout: home`, so the slot is hidden there.

## Blog post frontmatter

```yaml
---
title: "Post title"
description: "One-line description"
author: Author Name
author_gh_user: github_username
author_avatar: https://avatars.githubusercontent.com/u/XXXXX?v=4
read_time: 5 min
publish_date: October 30, 2025
---
```

- `publish_date` is parsed with `new Date()` — non-ISO format like `"October 30, 2025"` works.
- The 27 ex-news posts that were merged into blogs use `author: Eclipse Dirigible` + `author_avatar: /img/logo/dirigible.svg`.

## Release frontmatter

```yaml
---
title: Release X.Y
category: release
tag: release
publish_date: February 18, 2024
---
```

- Older release files lack `publish_date`. `releases.data.ts` falls back to `YYYY/MM/DD` parsed from the URL when `publish_date` is missing.
- `docs/releases/index.md` groups by year and renders a tight one-line-per-release listing (no avatar/author meta).

## Image paths

VitePress resolves relative image paths from the **filesystem path** of the markdown file:

| Markdown file depth                       | Relative prefix          | Resolves to    |
|---|---|---|
| `docs/blogs/YYYY/MM/DD/post.md`           | `../../../../images/` (4 up) | `docs/images/` |
| `docs/help/developer-resources/page.md`   | `../../images/` (2 up)   | `docs/images/` |
| `docs/help/development/ide/page.md`       | `../../../images/` (3 up) | `docs/images/` |

- Section images are consolidated in `docs/images/`.
- Absolute paths like `/img/posts/...` serve from `docs/public/img/`.
- New blog post images: put them in `docs/images/<post-slug>/`, reference as `../../../../images/<post-slug>/file.png`.

## VitePress quirks

1. **`{{ }}` in markdown text** — Vue evaluates these. VitePress escapes in code fences/spans automatically, but broken structure can expose text nodes. The `escapeMdAngleBrackets` Vite plugin in `config.mts` runs at transform time.
2. **`<Placeholder>` / `<Type>` angle brackets** outside code fences — Vue treats them as unknown component tags. The same Vite plugin escapes these to `&lt;...&gt;` for unknown tag names; HTML-element names pass through. Inside code fences/inline-code: untouched (renders as-is).
3. **MkDocs admonitions inside list items** — converting `!!! tip` to `::: tip` at column 0 breaks the containing list. Review pages with nested admonitions manually.
4. **MkDocs tab syntax** (`=== "Tab Name"`) — not supported. A few legacy posts still use this; either remove or rewrite.
5. **Jinja2/MkDocs template content** — wrap body in `<div v-pre>...</div>` immediately after frontmatter to prevent Vue evaluation. The post about Material for MkDocs blogging needs this.
6. **`{{ }}` escape script will corrupt listing pages** (`blogs/index.md`, `releases/index.md`) if re-run. Rewrite listings from scratch after any bulk escape pass.

## External assets loaded via CDN

- **Unicons line icons** — `https://cdn.jsdelivr.net/npm/@iconscout/unicons@4.0.8/css/line.css`, loaded once in `config.mts` head. Section icons on the home page use `<i class="uil uil-<name> section-icon">`.
- **Google Fonts** — Montserrat, Space Grotesk, Space Mono via `@import url(...)` in `style.css`.

## Cookie banner

DOM-injected on `DOMContentLoaded` from `theme/utils/cookie-banner.js`. Sets a 1-year `cookie_consent=true` cookie on accept. Privacy policy link → `https://www.eclipse.org/legal/privacy/`. Styled with VitePress CSS vars so it adapts to dark mode.

## Bulk migration scripts (for reference)

Use only on NEW content, not on already-converted files.

```bash
# Remove MkDocs attribute lists {: .class }
find docs -name "*.md" | xargs perl -i -pe 's/\{:\s*[^}]+\}//g'

# Strip hl_lines from code fences
find docs -name "*.md" | xargs perl -i -pe 's/^(```\s*\w*)\s+hl_lines="[^"]*"/$1/g'

# Replace <B>/<I>/<U> with markdown
find docs -name "*.md" | xargs perl -i -0pe '
  s|<B><I>(.*?)</B></I>|***$1***|gsi;
  s|<B>(.*?)</B>|**$1**|gsi;
  s|<I>(.*?)</I>|*$1*|gsi;
  s|<U>(.*?)</U>|__$1__|gsi;
'
```

Longer Python scripts (angle-bracket escape, `{{ }}` escape, admonition converter) lived in the original migration session — re-derive from scratch if needed.

## Session log (what landed in the migration)

This list captures the changes made in the June 2026 migration session so the rationale survives.

1. **API section replaced** with content from `https://github.com/codbex/aerokit` (`docs/sdk/*`). Sidebar (`apiSidebar()`) restructured into `@aerokit/sdk/*` groupings with full submodule listings. 129 pages.
2. **Theme switched** from blue + Open Sans to yellow + Montserrat (modeled on `/Users/delchev/Data/GitHub/dirigible.io/dirigible.io.new`). Cookie banner added. Dark theme set as default.
3. **Home page rebuilt** with 9 feature sections (Unified Modeling Workspace → Enterprise-Grade Debugging & Observability). Each section paired with a Unicons line icon (`uil-sitemap`, `uil-brackets-curly`, `uil-bolt`, `uil-process`, `uil-plug`, `uil-table`, `uil-puzzle-piece`, `uil-shield-check`, `uil-chart-line`) in brand yellow.
4. **Logo recoloured** — three SVGs (`dirigible.svg`, `dirigible-logo-2Kx2K.svg`, `dirigible-logo-2Kx2K-square.svg`) changed from `#fecc04` to `#ffb300`. The base64 PNG "lines" inside the SVGs replaced with plain `<rect>` elements. Navbar logo + home hero image now point to `dirigible.svg`.
5. **Cookie banner privacy link** points to `https://www.eclipse.org/legal/privacy/`.
6. **Dark-mode text fixes** — `.post-title`, `.post-meta`, `.partner-list` links, `blockquote:before` switched from hard-coded greys/blues to CSS vars/brand vars. Cookie banner uses CSS vars (was hard `background: white`).
7. **Post header injection** — `PostHeader.vue` slotted into `doc-before` so blog/release pages show their frontmatter title without editing 200+ markdown files.
8. **News merged into blogs** — the 27 `/news/` posts were identical duplicates of files already in `/blogs/`. Enriched the blog versions with `author: Eclipse Dirigible` + `author_avatar: /img/logo/dirigible.svg` + `publish_date` derived from the path. Deleted `/news/`, the news data loader, and the News nav entry.
9. **Releases isolated from blogs** — 54 release-tagged files in `/blogs/` were identical duplicates of `/releases/` files. Deleted from `/blogs/`. `releases.data.ts` falls back to URL-derived date for sorting. `/releases/index.md` rewritten as a condensed year-grouped listing.
10. **Releases v10–v13 added** — new pages at `docs/releases/{2024/02/18,2025/02/21,2025/07/11,2026/05/22}/`. Content sourced from GitHub milestones #53–#56 (v13 isn't tagged yet — sourced from the milestone description).
11. **Two new blog posts migrated** from the legacy `dirigible-io.github.io` repo: `2026/05/19/dirigible-java-decorators.md` and `2026/06/02/dirigible-native-apps.md`. Images for the first already present at `docs/images/decorators/`.
12. **Cross-repo move** — content moved into this repo on the `vitepress-migration` branch. PR #126 squash-merged into `master`. Old Jekyll/MkDocs scaffolding deleted in the same PR.
13. **Pages source flipped** to `build_type: workflow`. CNAME wiped as a side-effect; restored via `gh api -X PUT ... -f cname=www.dirigible.io`. First artifact had stale apex routing; re-running `deploy.yaml` fixed it. All 5 top-level routes verified 200.

## Known issues / TODO

- **~213 dead links** — `ignoreDeadLinks: true` in `config.mts`. Cross-section links from the original MkDocs multi-site setup (e.g. `/help/` linking to `/api/` with MkDocs-relative paths). Fix gradually.
- **MkDocs tab syntax** — a few legacy blog posts still use `=== "Tab"`. Rewrite or remove.
- **Admonitions inside list items** — bulk converter put `:::` at column 0; manually fix any list-breaking pages.
- **~54 MB asset** in `docs/` exceeds GitHub's 50 MB recommended limit (push warned, accepted). Trim or move to release downloads.
- **Logo PNG/horizontal SVG** still use the old `#fecc04` yellow. Re-export from `dirigible-horizontal.psd` to update.
- **Legacy "pages build and deployment"** auto-runs on every push and fails (Jekyll on non-Jekyll content). Harmless. May stop on its own after some time; otherwise leave it.
- **One `<54 MB binary` warned during push.** Find it with `git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '$1 == "blob" && $3 > 40000000 {print substr($0, index($0,$4)) " " $3}' | sort -k 2 -n`. Either trim or move out of the repo.
