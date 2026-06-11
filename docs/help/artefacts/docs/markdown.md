---
title: Markdown artefact
description: Markdown pages rendered by the runtime. Synchronizer MarkdownSynchronizer.
---

# Markdown - `*.md`

Markdown files placed in a published project are rendered to HTML by `engine-wiki` and served at `/services/wiki/<project>/<path>.html`. Synchronizer: `MarkdownSynchronizer`.

## When to use it

- In-app help / documentation embedded in the platform.
- README-style overviews for the IDE [Preview view](/help/ide/views/preview).
- Lightweight wiki without leaving the platform.

For project-internal developer notes that don't need to be served, drop the Markdown file outside `/registry/public/` (the workspace), or set its rendered URL behind `*.access`.

## Supported syntax

CommonMark plus the standard fenced-code-block extension. Mermaid diagrams, math, and other extensions are not enabled by default. Front matter is **not** required - the page title is taken from the first `# H1`.

## See also

- [Confluence artefact](/help/artefacts/docs/confluence)
- [Preview view](/help/ide/views/preview)
