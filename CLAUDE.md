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
│   ├── help/                             # 241 doc pages - rebuilt June 2026, 11 top-level sections
│   ├── help_old/                         # archived original help tree (115 pages); on disk, out of nav
│   ├── sdks/                             # combined SDKs landing page (single index.md)
│   │   └── index.md                      # describes both SDKs, links to /api/ and /sdk/
│   ├── api/                              # TypeScript/JavaScript SDK — 129 pages (from codbex/aerokit)
│   ├── sdk/                              # Java SDK — 105 pages (org.eclipse.dirigible.sdk.*)
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
Home | Documentation (/help/) | SDK (/sdks/) | Blog (/blogs/) | More ▾
                                                                ├ Releases (/releases/)
                                                                ├ Downloads (external)
                                                                └ GitHub (external)
```

- The single top-nav **SDK** entry intentionally points at `/sdks/` (the combined overview), not at `/api/` or `/sdk/`. The overview page is the canonical landing for "the SDK" — it briefs the polyglot model and links to both language-specific indexes.
- `helpSidebar()` in `config.mts` — 11 top-level sections (Get Started, Concepts, IDE, Develop, Artefacts, Tutorials, Setup, Operate, Extend, Reference, Contributing) for the rebuilt `/help/` tree. Mounted at `/help/`. The old MkDocs-mirrored nav was dropped when the tree was rewritten.
- `apiSidebar()` in `config.mts` — matches `codbex/aerokit` modules (`@aerokit/sdk/http`, `@aerokit/sdk/db`, etc.), full submodule listings. Mounted at `/api/`.
- `sdkSidebar()` in `config.mts` — Java SDK packages (`org.eclipse.dirigible.sdk.http`, `org.eclipse.dirigible.sdk.db`, etc.), one collapsible group per module. Mounted at `/sdk/`.
- `/sdks/` itself has no sidebar — it's a single landing page with side-by-side cards for each SDK.
- `/help_old/` has no sidebar either — it's archived content kept on disk for URL stability; out of nav by design.

## Help portal organisation (rebuilt June 2026)

The `/help/` tree was rebuilt around the **current** platform (client Java, native apps, decorator-driven model, Karavan, Messaging + Monitoring perspectives, Java debugger, polyglot framing). 241 pages across 11 top-level sections, each with a real `index.md`:

```
help/
├── get-started/          # install -> first app -> IDE tour
├── concepts/             # synchronizer model, polyglot runtime, multi-tenancy, ...
├── ide/                  # shell, perspectives (12), editors (11), modelers (5), views (22), menus, themes
├── develop/              # decorator model, REST APIs, entities, DI, jobs, listeners, debugging, testing
├── artefacts/            # one page per file extension - scripting, data, process, services, security, extensibility, docs
├── tutorials/            # bookstore, scheduled-job, file-upload, kafka, BPMN, REST-with-decorators, native-app, custom-stack
├── setup/                # Docker, JAR, K8s (Helm + cluster guides + addons), Cloud Foundry, native image, databases, authentication
├── operate/              # observability, OpenTelemetry, logging, health, tenants, transfer, anonymisation, backups, secrets, troubleshooting
├── extend/               # custom perspective/view/editor/menu/synchronizer/engine/API/dialect/CMS/auth, BlimpKit primer, themes
├── reference/            # HTTP endpoints, URL patterns, ports, env vars, artefact extensions, roles, glossary, FAQ
└── contributing/         # build from source, code style, testing, docs, community, credits, license
```

The Monitoring perspective is at `ide/perspectives/monitoring.md` + three views (`monitoring-metrics`, `jvm-monitoring`, `jvm-threads`); it surfaces the `/services/ide/monitoring/{metrics,threads,counts}` REST endpoints.

### Help portal style rules

- **Terse and technical** — match the voice of `/api/` and `/sdk/` (precise, code-first, no marketing fluff, no hand-holding).
- **No em-dashes or en-dashes** anywhere in source. Use plain hyphens. Bulk swept; recheck before merging copy-pasted content.
- **No MkDocs syntax** in source. `=== "Tab"` → `**Tab**`. `!!! type "Title"` → `::: type Title ... :::`. `??? type "Title"` → `::: details Title ... :::`. `hl_lines="..."` stripped from code fences. See "MkDocs -> VitePress conversion" below.
- **Inside fenced code blocks**, `&lt;` / `&gt;` / `&amp;` are decoded to literal `<` `>` `&` so XML samples render correctly. Outside code blocks the structural entities (`&lt;`, `&gt;`, `&amp;`, `&#123;`, `&#125;`) are preserved; everything else (arrows, dashes, ellipses, nbsp, etc.) is decoded to ASCII.
- **Cross-links are absolute** — `/help/...`, `/api/...`, `/sdk/...`, `/sdks/...`. `ignoreDeadLinks: true` is on; that masks broken links at build time, so run the dead-link scanner manually (see "Operational scripts" below) before publishing significant changes.
- **Frontmatter on every page** — `---\ntitle: ...\ndescription: ...\n---`. If `description` starts with `@` (e.g. `@Inject`) quote it: `description: "@Inject + @Repository"`. Bare `@` at the start of a YAML scalar fails to parse.

## SDK organisation

The two SDKs are siblings, not parent/child:

- **`/api/`** — TypeScript/JavaScript SDK (Aerokit). Imports `@aerokit/sdk/*`. The original SDK.
- **`/sdk/`** — Java SDK. Imports `org.eclipse.dirigible.sdk.*`. Same capabilities, written in Java; sources live in `dirigible/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/`.
- **`/sdks/`** — Combined overview only. Links to both SDK indexes plus their Get Started pages.

Framing rule: both SDKs are first-class surfaces of Dirigible's polyglot runtime — they share the in-process platform services, the same broker, the same data sources, the same security context. **Do not frame the Java SDK as "a mirror of the TypeScript SDK"** (that language was scrubbed). When cross-language symmetry matters factually (e.g. cross-runtime cache visibility), describe it as a property of the platform, not as one SDK copying another.

Old "API" landing-page references throughout the site (home, `/help/`, blogs, releases) now point to `/sdks/`. Deep TS-SDK module links (e.g. `/api/messaging/consumer/`, `/api/http/rs/`) were intentionally left pointing at `/api/` because those URLs still resolve to the right pages.

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
3. **MkDocs admonitions inside list items** — converting `!!! tip` to `::: tip` at column 0 breaks the containing list. The MkDocs-to-VitePress converter (see "Operational scripts") preserves the marker's indent so the surrounding list still works. Already cleaned across the site; recheck after any legacy import.
4. **MkDocs tab syntax** (`=== "Tab Name"`) — not supported by VitePress. Already converted site-wide to `**Tab**` headings; recheck after any legacy import.
5. **Jinja2/MkDocs template content** — wrap body in `<div v-pre>...</div>` immediately after frontmatter to prevent Vue evaluation. The post about Material for MkDocs blogging needs this.
6. **`{{ }}` escape script will corrupt listing pages** (`blogs/index.md`, `releases/index.md`) if re-run. Rewrite listings from scratch after any bulk escape pass.
7. **Mustache `{{` and `}}` inside inline backticks still trip Vue's tokenizer.** Counter-intuitively, ``` `{{` ``` and ``` `}}` ``` in the same paragraph break the build with `Error parsing JavaScript expression`. Workaround: phrase the prose without the literal braces (e.g. "double curly braces"); braces inside fenced code blocks are fine.

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
find docs -name "*.md" -not -path "*/help_old/*" -not -path "*/.vitepress/*" -print0 \
  | xargs -0 perl -i -pe 's/^(\s*```\s*\w*)\s+hl_lines="[^"]*"/$1/g'

# Replace <B>/<I>/<U> with markdown
find docs -name "*.md" | xargs perl -i -0pe '
  s|<B><I>(.*?)</B></I>|***$1***|gsi;
  s|<B>(.*?)</B>|**$1**|gsi;
  s|<I>(.*?)</I>|*$1*|gsi;
  s|<U>(.*?)</U>|__$1__|gsi;
'

# Em-dash / en-dash sweep to plain hyphen (site-wide, excluding archived + build output)
find docs -name "*.md" -not -path "*/help_old/*" -not -path "*/.vitepress/*" -print0 \
  | xargs -0 perl -CSD -i -pe 's/\x{2014}/-/g; s/\x{2013}/-/g'
```

### MkDocs -> VitePress conversion

`=== "Tab"` -> `**Tab**` with body de-indented; `!!! type "Title"` -> `::: type Title ... :::` with the closing `:::` at the marker's indent; `??? type "Title"` -> `::: details Title ... :::`. Type-name mapping when the MkDocs type has no direct VitePress equivalent:

| MkDocs                                                | VitePress  |
|-------------------------------------------------------|------------|
| `note`                                                | `info`     |
| `abstract`, `summary`, `tldr`                         | `details`  |
| `hint`                                                | `tip`      |
| `important`, `attention`, `caution`, `missing`        | `warning`  |
| `failure`, `fail`, `error`, `bug`                     | `danger`   |
| `example`, `quote`, `cite`                            | `info`     |
| `tip`, `info`, `warning`, `danger`, `details`         | unchanged  |
| (unknown)                                             | `info`     |

The converter must handle indented markers (inside list items): the body baseline is "indent strictly greater than the marker's indent", and the body is de-indented to the marker's indent. Closing `:::` is emitted at the marker's indent. Re-derive the converter as needed; the working Python sits at `/tmp/fix_mkdocs2.py` for the duration of the rebuild session.

## Operational scripts

These were one-off but are likely to be re-run after any future legacy import or major content move. Each lived under `/tmp/` during the rebuild session; re-derive if needed.

- **Dead-link scanner** (`/tmp/check_links_all.py`): walks every `.md` under `docs/` (excluding `help_old`, `.vitepress`, `node_modules`), extracts `](/help|/api|/sdk|/sdks)/*` link targets, and reports any that don't resolve to either `<path>.md` or `<path>/index.md` on disk. Use before publishing significant content moves; the build won't catch them because `ignoreDeadLinks: true`.
- **MkDocs syntax converter** (`/tmp/fix_mkdocs2.py`): converts `=== "Tab"` / `!!! type` / `??? type` markers (including indented ones inside list items) to VitePress equivalents.
- **Entity decoder for code blocks** (`/tmp/fix_code_entities.py`): inside fenced code blocks only, decodes `&lt;` / `&gt;` / `&amp;` to literal characters. **Heads-up:** the SDK escape docs (`/api/utils/escape.md`, `/sdk/utils/escape.md`) intentionally show entity-encoded output in their example comments; restore those by hand if the script over-decodes them.
- **HTML entity decoder for prose** (`/tmp/fix_entities.py`): decodes ASCII-equivalent entities (`&#8594;`, `&hellip;`, `&nbsp;`, `&mdash;`, etc.) site-wide. Preserves structural entities `&lt;`, `&gt;`, `&amp;`, `&#123;`, `&#125;`.

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

## Session log (Java SDK + combined SDKs overview, June 2026)

Subsequent work after the initial migration.

1. **Java SDK added at `/sdk/`** — 105 pages mirroring `dirigible/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/*`. One subdirectory per Java package (`http/`, `db/`, `core/`, `bpm/`, `io/`, `utils/`, `platform/`, `messaging/`, `kafka/`, `rabbitmq/`, `cms/`, `etcd/`, `mongodb/`, `redis/`, `qldb/`, `pdf/`, `extensions/`, `git/`, `indexing/`, `integrations/`, `template/`, `security/`, `component/`, `job/`, `mail/`, `net/`, `log/`, `junit/`, `cache/`). Per-module `index.md` plus one page per class; annotations grouped into a `decorators.md` per module.
2. **`sdkSidebar()` added to `config.mts`**, mounted at `/sdk/`. Format mirrors `apiSidebar()` — one collapsible group per `org.eclipse.dirigible.sdk.*` package.
3. **Combined overview at `/sdks/index.md`** — describes the polyglot model, two cards (TypeScript/JavaScript → `/api/`, Java → `/sdk/`), pick-a-language table, shared development model. No sidebar.
4. **Top nav restructured** — removed standalone `API` and `SDK` entries; replaced with a single `SDK → /sdks/` entry.
5. **TS-mirror language scrubbed** from every `/sdk/` page. "Mirror of the TypeScript SDK", "same shape as the TS surface", "TS / JS handler", "@aerokit/sdk" cross-references, "TS/JS script" all rewritten in terms of the platform's polyglot runtime.
6. **Landing-page `/api/` references redirected to `/sdks/`** across the home page, `/help/index.md`, `/help/development/index.md`, two release notes, and six blog posts. Deep TS-SDK page links (e.g. `/api/messaging/consumer/`) intentionally left alone.

## Session log (help portal rebuild, June 2026)

The `/help/` portal was rewritten end-to-end to match the current platform.

1. **`git mv docs/help -> docs/help_old`** — 115 legacy pages preserved on disk for URL stability; out of nav.
2. **New `/help/` scaffold** — 11 sections, 27 directories, one `index.md` per section. `helpSidebar()` in `config.mts` rewritten to mount the new tree.
3. **Pass 2 content** (Get Started, Concepts, IDE shell + perspectives + editors + modelers + views) — 67 pages. Dispatched as six parallel agents.
4. **Monitoring perspective added** — `ide/perspectives/monitoring.md` + `ide/views/{monitoring-metrics,jvm-monitoring,jvm-threads}.md`. Backs `/services/ide/monitoring/{metrics,threads,counts}`.
5. **Pass 3-5 content** (Develop, Artefacts, Tutorials, Setup, Operate, Extend, Reference, Contributing) — 130+ pages. Dispatched in parallel agents (most hit per-agent session limits before reaching their quota; remaining pages written directly).
6. **Tutorials**: legacy bodies brought across from `help_old` where still accurate (bookstore, scheduled-job, file-upload, shell-command, listener-of-a-queue, kafka, BPMN, EDM/DSM generation, ide-create-view/perspective, custom-stack). Image folders copied with their parent dirs. Three new tutorials for the decorator era (REST-with-TypeScript-decorators, REST-with-Java-controllers, native-app integration).
7. **Dead-link sweep** — 68 broken targets across 31 files inside `/help/` plus 5 in one blog post. Fixed via a single Python rewrite mapping every dead pattern to the closest current page (e.g. `/help/development/ide/perspectives/database` -> `/help/ide/perspectives/database`, `/api/sdk/bpm/process` -> `/api/bpm/process`, `setup-environment-variables` -> `environment-variables`, K8s slug variants normalised).
8. **MkDocs syntax sweep** — every `=== "Tab"`, `!!! type "Title"`, `??? type "Title"`, and `hl_lines="..."` removed or converted across the whole `docs/` tree. Indented markers (inside list items) handled.
9. **HTML entity sweep** — entities decoded to ASCII in prose (`&#8594;` -> `->`, etc.) and inside fenced code blocks (`&lt;` -> `<` for XML samples). The SDK escape docs had their intended entity-encoded output restored by hand.
10. **Em-dashes / en-dashes** — swept site-wide to plain hyphens.

Build verified clean (`npx vitepress build docs`) at every milestone.

## Known issues / TODO

- **`ignoreDeadLinks: true`** stays on in `config.mts`. The site has zero dead links right now (verified by `/tmp/check_links_all.py`), but the flag is kept so future legacy imports can be merged incrementally.
- **~54 MB asset** in `docs/` exceeds GitHub's 50 MB recommended limit (push warned, accepted). Trim or move to release downloads.
- **Logo PNG / horizontal SVG** still use the old `#fecc04` yellow. Re-export from `dirigible-horizontal.psd` to update.
- **Legacy "pages build and deployment"** auto-runs on every push and fails (Jekyll on non-Jekyll content). Harmless.
- **One `<54 MB binary` warned during push.** Find it with `git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '$1 == "blob" && $3 > 40000000 {print substr($0, index($0,$4)) " " $3}' | sort -k 2 -n`. Either trim or move out of the repo.
- **`/help_old/` will rot.** Pages there still have MkDocs syntax, old cross-links, etc. by design - they're frozen for URL stability. If a specific page needs to be promoted back, treat it as a fresh page and apply the style rules above.
