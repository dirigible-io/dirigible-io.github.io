---
title: Preview
description: Inline preview for HTML, Markdown, and served URLs.
---

# Preview

Inline preview pane. Renders the currently selected resource (or a custom URL) inside an iframe and auto-refreshes on workspace save.

## What it renders

- **HTML resources** - served from the project (typically via `expose`) and reloaded on save.
- **Markdown** - `*.md` artefacts rendered by `engine-wiki` (`MarkdownSynchronizer`).
- **Confluence wiki** - `*.confluence` artefacts rendered by `engine-wiki` (`ConfluenceSynchronizer`).
- **Arbitrary URLs** - any served path (`/services/...`, `/public/...`, external).

## Refresh behaviour

The view listens for workspace save events. On every save:

- The current source path is resolved against `/services/web/<project>/...` (or `/services/wiki/...` for Markdown / Confluence).
- The iframe reloads.

Pin the URL to lock the preview to a fixed target while editing unrelated files.

## Limits

- Server-rendered output only - the view does not transpile or bundle anything. JS/TS that needs to execute must be served by the platform (`/services/js/...`).
- Cross-origin URLs follow standard iframe restrictions.

## Related

- [Web artefacts (`expose`)](/help/artefacts/services/expose)
- [Wiki artefacts](/help/artefacts/docs/markdown)
- [Projects view](/help/ide/views/projects)
