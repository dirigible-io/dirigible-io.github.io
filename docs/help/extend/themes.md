---
title: Themes
description: Author a new IDE theme.
---

# Themes

Each theme ships as a WebJar module under `components/ui/resources-theme-<name>/`. The platform's built-in themes are `blimpkit` (default), `classic`, `mystic`, and `high-contrast`.

## Module layout

```
components/ui/resources-theme-<name>/
  pom.xml
  src/main/resources/META-INF/dirigible/resources-theme-<name>/
    theme-<name>.css
    theme-<name>-dark.css        (optional)
    extensions/theme.extension
    configs/theme.js
```

## Theme config

```js
const themeData = {
    id: 'forest',
    label: 'Forest',
    type: 'light',                      // 'light' | 'dark' | 'auto'
    css: '/services/web/resources-theme-forest/theme-forest.css'
};
if (typeof exports !== 'undefined') {
    exports.getTheme = () => themeData;
}
```

## Theme stylesheet

Override BlimpKit theme variables - **not** raw colors or `--sap*` legacy vars.

```css
:root {
    --background: #f4f7f5;
    --foreground: #122019;
    --muted: #6b8074;
    --accent: #2f7a4d;
    --border: #ccd9d2;
    --card: #ffffff;

    --positive: #2f7a4d;
    --negative: #b03a2e;
    --warning:  #c98b21;
    --information: #2b6cb0;

    --font-sans: "72", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "72Mono-Regular", "JetBrains Mono", monospace;
}
```

Every BlimpKit component reads from these variables, so the whole IDE recolors without further work.

## Dark variant

Ship a paired `theme-<name>-dark.css`. The platform's theme switcher honours the system preference if `type: 'auto'` is set in the theme config.

## Activation

The theme is registered through the `theme.extension` artefact. Once published it appears in the theme switcher under the [Settings perspective](/help/ide/perspectives/settings).

## Group registration

Add the module to `components/group/group-ui/pom.xml`.

## See also

- [BlimpKit primer](/help/extend/blimpkit-ui)
- [Settings perspective](/help/ide/perspectives/settings)
