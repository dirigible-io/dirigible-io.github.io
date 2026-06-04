# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project

VitePress 1.5.0 site for **Eclipse Dirigible** (`www.dirigible.io`). Migrated from a Jekyll root + 6 separate MkDocs Material instances that lived in the repo `https://github.com/dirigible-io/dirigible-io.github.io.git`.

## Commands

```bash
npm install          # install deps (vitepress + vue)
npm run docs:dev     # dev server on http://localhost:8080
npm run docs:build   # production build → docs/.vitepress/dist/
npm run docs:preview # preview built site on http://localhost:8080
```

## Repository layout

```
.
├── package.json                     # vitepress ^1.5.0, vue ^3.5.13
├── docs/
│   ├── index.md                     # home page (layout: home)
│   ├── .vitepress/
│   │   ├── config.mts               # site config, nav, sidebars
│   │   └── theme/
│   │       ├── index.ts             # extends DefaultTheme
│   │       └── style.css            # brand colors + blog listing CSS
│   ├── data/
│   │   ├── blogs.data.ts            # createContentLoader for /blogs/**/*.md
│   │   └── releases.data.ts         # createContentLoader for /releases/**/*.md
│   ├── public/                      # static assets (served at /)
│   │   ├── favicon.png
│   │   └── img/                     # logo, posts images, home screenshots
│   ├── images/                      # shared image dir (see Image paths below)
│   ├── help/                        # docs-help — 113 pages
│   ├── api/                         # docs-api — 129 pages (from codbex/aerokit)
│   ├── blogs/                       # docs-blogs — 154 posts + 27 merged-in news posts (YYYY/MM/DD/slug.md)
│   │   └── index.md                 # blog listing page
│   └── releases/                    # docs-releases — 55 entries
│       └── index.md                 # releases listing page
```

## Brand

- **Primary blue:** `#2b7bb9`
- **Secondary blue:** `#3592d8`
- **Dark blue:** `#1a5f96`
- Font: Open Sans (Google Fonts)
- Logo: `/img/logo/dirigible-logo.png` (in `docs/public/`)

## Navigation

```
Home | Documentation (/help/) | API (/api/) | Blog (/blogs/) | More ▾
                                                                  Releases (/releases/)
                                                                  Downloads (external)
                                                                  GitHub (external)
```

Sidebars are defined in `config.mts` — `helpSidebar()` and `apiSidebar()` functions. The help sidebar is fully structured (matches the original MkDocs nav). The API sidebar lists top-level categories only; individual API pages within each category are auto-navigated.

## Blog / News / Releases listing pages

Each listing page uses `layout: home` with an inline `<script setup>` that imports from the data loader and renders posts with `v-for`. The pattern:

```md
---
layout: home
hero:
  name: Blog
  ...
editLink: false
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../data/blogs.data'
</script>

<section class="blog-posts">
  <ul class="post-list">
    <li class="post-item" v-for="post of posts" :key="post.url">
      <h4 class="post-title"><a :href="withBase(post.url)">{{ post.frontmatter.title }}</a></h4>
    </li>
  </ul>
</section>
```

**CRITICAL:** The `{{ }}` expression escaping script (see below) will corrupt these listing pages if re-run. Always rewrite `blogs/index.md`, `news/index.md`, `releases/index.md` from scratch after running bulk escape scripts.

## Frontmatter conventions (blog posts)

Blog posts use **non-ISO** publish dates:

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

The data loaders parse `publish_date` with `new Date(value)` which handles `"October 30, 2025"` correctly. Newer posts should follow the same format for consistency.

## Image paths

VitePress resolves relative image paths from the **filesystem path** of the markdown file (not the URL path). The image layout was designed so that relative paths used in the original MkDocs content resolve correctly:

| Markdown file depth | Relative prefix | Resolves to |
|---|---|---|
| `docs/blogs/YYYY/MM/DD/post.md` | `../../../../images/` (4 up) | `docs/images/` |
| `docs/help/developer-resources/page.md` | `../../images/` (2 up) | `docs/images/` |
| `docs/help/development/ide/page.md` | `../../../images/` (3 up) | `docs/images/` |

All section images are merged into `docs/images/` (not the `public/` folder). Absolute paths like `/img/posts/...` are served from `docs/public/img/`.

When adding new blog posts with images:
- Put images in `docs/images/<post-slug>/`
- Reference them as `../../../../images/<post-slug>/image.png`

## Known issues / TODO

- **213 dead links** — `ignoreDeadLinks: true` is set in `config.mts`. These are cross-section links from the original MkDocs multi-site setup (e.g. `/help/` linking to `/api/` with MkDocs-relative paths). Fix gradually by updating hrefs to the new absolute VitePress paths.
- **MkDocs tab syntax** (`=== "Tab Name"`) — a few blog posts still use this. VitePress doesn't support it natively; either remove or rewrite as separate sections or use a VitePress tabs plugin.
- **Admonition indented inside list items** — the bulk admonition converter strips indent and puts `:::` at column 0, which can break the containing list. Review pages with nested admonitions manually.

## Bulk migration scripts (for reference)

These Python/Perl one-liners were used during the initial migration. Re-run only on NEW content, not on already-converted files.

```bash
# Remove MkDocs attribute list syntax {: .class }
find docs -name "*.md" | xargs perl -i -pe 's/\{:\s*[^}]+\}//g'

# Strip hl_lines from code fences
find docs -name "*.md" | xargs perl -i -pe 's/^(```\s*\w*)\s+hl_lines="[^"]*"/$1/g'

# Replace <B>..</B>, <I>..</I>, <U>..</U> with markdown
find docs -name "*.md" | xargs perl -i -0pe '
  s|<B><I>(.*?)</B></I>|***$1***|gsi;
  s|<B>(.*?)</B>|**$1**|gsi;
  s|<I>(.*?)</I>|*$1*|gsi;
  s|<U>(.*?)</U>|__$1__|gsi;
'
```

The Python scripts for escaping non-HTML angle brackets and `{{ }}` patterns (and the admonition converter) are longer — refer to the session transcript if needed.

## VitePress quirks discovered during migration

1. **`{{ }}` in markdown text** is evaluated as Vue template expressions, even inside `<code>` tags rendered from backtick spans. VitePress escapes them in code fences and inline code automatically, but NOT if the markdown structure is broken (e.g. admonition inside a list item breaks the list, exposing text nodes to Vue).

2. **`<PLACEHOLDER>` angle brackets** (like `<DB_NAME>`, `<Type>`) are parsed by Vue as unknown HTML/component tags and fail the build. Escape to `&lt;PLACEHOLDER&gt;`.

3. **Image resolution**: Vite imports images as modules. Relative paths must point to files that exist at build time. Absolute paths (`/img/...`) are served from `docs/public/`.

4. **MkDocs admonitions inside list items**: Converting `!!! tip` to `::: tip` inside an indented list item puts the `:::` at column 0, breaking the list. Wrap in a blockquote or fix manually.

5. **`layout: home` pages with `<script setup>`**: The `v-for` loop runs at SSR time and renders all items into static HTML. If data loader returns correct data, all posts appear in the initial HTML (good for SEO).

6. **Blog posts with Jinja2/MkDocs template content** (the post about Material for MkDocs blogging): wrap the body in `<div v-pre>...</div>` immediately after the frontmatter to prevent Vue from evaluating the template expressions.
