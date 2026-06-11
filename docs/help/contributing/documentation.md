---
title: Editing the docs
description: How to contribute to this documentation portal.
---

# Editing the docs

This portal lives in its own repository: [`dirigible-io/dirigible-io.github.io`](https://github.com/dirigible-io/dirigible-io.github.io).

## Stack

- **VitePress 1.6** + Vue 3.5.
- Markdown sources under `docs/`.
- Build output under `docs/.vitepress/dist/`.
- Deployed to GitHub Pages via the `.github/workflows/deploy.yaml` workflow.

## Local development

```bash
npm install
npm run docs:dev
```

Opens a hot-reloading preview at `http://localhost:8080`.

To produce a production build locally:

```bash
npm run docs:build
npm run docs:preview
```

## Tree layout

| Path | Content |
| ---- | ------- |
| `docs/help/` | The user-facing help portal (this site). |
| `docs/api/` | TypeScript / JavaScript SDK reference. |
| `docs/sdk/` | Java SDK reference. |
| `docs/sdks/` | Combined SDK landing. |
| `docs/blogs/` | Blog posts. |
| `docs/releases/` | Release notes. |
| `docs/help_old/` | The pre-rewrite help portal kept for URL stability. Do not edit. |

## Adding a page

1. Create the markdown file under the right tree (`docs/help/<section>/<name>.md`).
2. Add it to the sidebar in `docs/.vitepress/config.mts` - find the `helpSidebar()` / `apiSidebar()` / `sdkSidebar()` function and insert your entry.
3. Run `npm run docs:dev` and verify the page renders and the sidebar entry resolves.
4. Open a PR.

## Conventions

- **Frontmatter** - every page has `---\ntitle: ...\ndescription: ...\n---`.
- **One H1 per page** - matches the frontmatter `title`.
- **Cross-links are absolute** - `/help/...`, `/api/...`, `/sdk/...`.
- **Lists use hyphens** (`-`), not asterisks.
- **No em-dashes or en-dashes**. Use the standard hyphen-minus throughout. Sweep copied text before saving.
- **No emojis**.
- **Code blocks are fenced** with a language tag.
- **Match the tone of `/api/` and `/sdk/`** - direct, technical, code-first.

## Adding cross-links and verifying them

`docs/.vitepress/config.mts` has `ignoreDeadLinks: true` - the build does not fail on broken cross-references. That's a feature for incremental rewriting, but check your links in the dev server before opening a PR.

## See also

- [Building from source](/help/contributing/building-from-source) (platform)
- [Community](/help/contributing/community)
