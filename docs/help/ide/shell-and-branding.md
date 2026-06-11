---
title: Shell and Branding
description: The IDE shell, branding hooks, and the platform-links injection mechanism.
---

# Shell and Branding

The browser IDE is rendered by `shell-ide`, the top-level frame served at `/services/web/shell-ide/`. It is the default entrypoint reached by `/` and is configurable via `DIRIGIBLE_HOME_URL`.

## Shell

`shell-ide` composes the active perspective with the global toolbar, perspective rail, and status bar. Perspectives mount as child views; switching the rail swaps the central region without reloading the shell.

```bash
# Default
DIRIGIBLE_HOME_URL=services/web/shell-ide/
```

Set `DIRIGIBLE_HOME_URL` to a custom path to land users on a different starting page (custom shell, dedicated perspective, external app).

## Branding

`platform-branding` exposes logos, titles, prefixes, and product metadata to the shell and to every BlimpKit-using page. Branded properties:

- product name and short name
- header and favicon logos
- color accents picked up by the active theme
- the `prefix` used to namespace `localStorage` keys (e.g. `${prefix}.workspace.selected`)

Override by deploying a `platform-branding` replacement module that ships its own assets and metadata. Cross-link: [Themes](/help/ide/themes), [Settings](/help/ide/perspectives/settings).

## `platform-links` injection

Every non-iframe page declares a single meta tag in the head:

```html
<meta name="platform-links" category="ng-view,ng-perspective">
```

`HtmlPlatformLinksInjector` (server-side) reads the tag at request time, looks up each category in `platform-links.json`, and replaces the meta with the bundle of `<link>` and `<script>` tags registered for those categories. The bundles ship the AngularJS runtime, BlimpKit, Fundamental-Styles, fonts, the platform hubs, and so on - one source of truth for shared front-end assets.

Built-in categories:

- `ng-view` - jQuery, AngularJS, BlimpKit, Fundamental-Styles, fonts, platform hubs (the heavyweight base bundle).
- `ng-perspective` - everything in `ng-view` plus split panes and layout.
- `ng-editor` - everything in `ng-view` plus workspace and repository hubs.

Adding a shared script or stylesheet means editing `platform-links.json`, not every HTML page. Standalone iframes (embedded editors, isolated views) that need SAP-icons or BlimpKit chrome must include the relevant category tag - otherwise icons render as tofu and Angular bindings stay empty.

## Related

- [Themes](/help/ide/themes)
- [Menus](/help/ide/menus)
- [Settings perspective](/help/ide/perspectives/settings)
