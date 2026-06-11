---
title: Themes
description: Built-in themes and BlimpKit CSS variables for view authors.
---

# Themes

Themes ship as resource modules under `components/resources/resources-theme-*`. The active theme is selected from the [Settings](/help/ide/perspectives/settings) perspective and persisted in the browser; reload to apply.

## Built-in themes

| Module                            | Notes                                                |
|-----------------------------------|------------------------------------------------------|
| `resources-theme-blimpkit`        | Default. Light + dark variants, BlimpKit palette.    |
| `resources-theme-classic`         | The pre-BlimpKit look, preserved for users used to it. |
| `resources-theme-high-contrast`   | Accessibility-focused contrast ratios.               |
| `resources-theme-mystic`          | Dark variant with adjusted accents.                  |

## CSS variables for view authors

When writing custom views or perspectives, drive colors through BlimpKit theme variables so the result adapts to whichever theme the user picks. Do not hard-code hex values.

```css
.my-warning   { color: var(--negative); }
.my-success   { color: var(--positive); }
.my-highlight { color: var(--accent); }
```

Common variables:

- `--accent`   - brand accent (links, primary buttons).
- `--positive` - success, healthy state.
- `--negative` - error, destructive state.
- `--critical` - blocking warnings.
- `--informative` - neutral info.

The full catalogue lives in each theme's stylesheet under `components/resources/resources-theme-*/src/main/resources/`.

## Authoring custom themes

A theme is a resource module that ships CSS variable overrides plus optional assets. Drop a new module under `components/resources/resources-theme-<name>` mirroring the structure of `resources-theme-blimpkit` and it will appear in the theme switcher. See [Extending themes](/help/extend/themes) for the full authoring guide.
