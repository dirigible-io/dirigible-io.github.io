---
title: Settings
description: Branding, locale, theme, and personal preferences.
---

# Settings

`perspective-settings` is the user-level configuration surface for the IDE shell. Changes are persisted in the browser (per user / per device).

## Sections

- **Branding** - active product name, logo, prefix surfaced through `platform-branding`. See [Shell and branding](/help/ide/shell-and-branding).
- **Locale** - UI language picked up from `settings-locale` + `resources-locale`.
- **Theme** - active theme switcher: BlimpKit (default), Classic, High-Contrast, Mystic. See [Themes](/help/ide/themes).
- **Preferences** - editor defaults, keyboard layout, confirmations, telemetry opt-in.

## Persistence

Settings are stored under the `${prefix}.*` namespace in `localStorage`, where `prefix` is the branding prefix. Clearing browser storage resets to defaults.

## Related

- [Shell and branding](/help/ide/shell-and-branding)
- [Themes](/help/ide/themes)
- [Keyboard shortcuts](/help/ide/keyboard-shortcuts)
