---
title: BlimpKit UI primer
description: The five rules + the gotchas for authoring IDE views.
---

# BlimpKit UI primer

The IDE chrome - sidebars, dialogs, tabs, menus, toolbars, forms - renders through **BlimpKit**, a thin AngularJS-on-Fundamental-Styles component library. Module name `blimpKit` (camelCase). Bundle path: `/webjars/blimpkit__blimpkit/dist/blimpkit.min.js`.

Read this once before writing a custom perspective, view, or editor.

## The five immutable rules

1. **Perspective icons have no internal padding.** The SVG content extends to the edges of the `viewBox`. The BlimpKit icon slot draws its own spacing.

2. **No em-dashes.** Use the standard hyphen-minus only. Sweep copied text before saving.

3. **Custom CSS classes only when there is no other option.** Reach for, in order:
   1. A BlimpKit utility class (`bk-text--subtitle`, `bk-font--small`, `bk-vbox`, `bk-box--gap`, `bk-padding--tiny`).
   2. A Fundamental-Styles class (`fd-*`).
   3. A custom class scoped to the view - only if 1 and 2 don't express what you need.

4. **Never hard-code colors. Prefer BlimpKit variables over SAP-legacy ones.** Lookup order:
   1. A BlimpKit utility class that maps to a theme variable (`bk-color--negative`, `bk-color--positive`, `bk-color--critical`, `bk-color--informative`).
   2. A BlimpKit theme variable (`var(--negative)`, `var(--positive)`, `var(--warning)`, `var(--information)`, `var(--background)`, `var(--foreground)`, `var(--muted)`, `var(--accent)`, `var(--border)`, `var(--card)`, `var(--font-sans)`, `var(--font-mono)`, ...).
   3. A `--sap*` legacy variable, only when nothing above matches. These are being phased out.

5. **Use BlimpKit components instead of building view-local equivalents.** A `<div class="my-tile">` shell with custom CSS is the canonical anti-pattern - `bk-card`, `bk-object-status`, `bk-progress-indicator`, `bk-list`, `bk-message-page`, `bk-popover` almost certainly already cover the need.

6. **For dialogs, use `DialogHub`.** Never put `<bk-dialog>` markup in a view. Every view holds a `new DialogHub()` instance and calls `Dialogs.showAlert(...)` / `Dialogs.showDialog(...)` / `Dialogs.showFormDialog(...)` / `Dialogs.showWindow(...)` / `Dialogs.showBusyDialog(...)`.

## Gotchas

- **`<bk-checkbox>` is invisible without `<bk-checkbox-label>`.** Pair them: `<bk-checkbox id="x" ng-model="...">` followed by `<bk-checkbox-label for="x" empty="true">...</bk-checkbox-label>`.

- **`<bk-dialog>` has an isolate scope.** Can't put `ng-controller=` on the dialog element. Wrap with a thin `<div ng-controller="...">` and put `<bk-dialog visible="...">` inside.

- **`<bk-select>` doesn't support `ng-options`.** Use `<bk-option ng-repeat>`. For selects in dialogs / sidebars add `dropdown-fixed="true"` so the menu floats via `position:fixed`.

- **`<bk-option>` `text` is interpolation (`'@'`), `value` is one-way (`'<'`).** Use `text` with double-curly interpolation around an expression (e.g. opt.name) and `value="opt.id"`. Mixing them up is the canonical bug for this directive.

- **Perspective SVG icons inherit `fill` from CSS - don't hard-code `fill` on the path.** Strip the `fill` attribute or use `fill="currentColor"`.

- **`<bk-input>` / `<bk-textarea>` / `<bk-button>` use `replace:true`.** The attributes you write on the directive (`ng-model`, `ng-blur`, custom directives) end up on the underlying native element.

- **Don't put `ng-class` on a `replace:true` directive element that already has its own `ng-class`.** Angular string-concatenates them and the parser throws. Push the conditional class onto a child element instead.

- **`<meta name="platform-links" category="...">` auto-injects scripts + stylesheets.** Categories: `ng-view`, `ng-perspective`, `ng-editor` (defined in `components/engine/engine-web/src/main/resources/platform-links.json`). Add platform-wide UI dependencies there, not to every perspective HTML.

- **SAP-icons + the 72 body font live in platform-core's `fonts.css`.** Every BlimpKit-using page needs `<link rel="stylesheet" href="/services/web/platform-core/ui/styles/fonts.css">`. The shell loads it automatically; standalone iframes need to add it.

- **`<bk-dialog>` toggles visibility via the `visible` binding.** Flip `scope.modal.visible = false` inside an `$apply`. Allow ~300 ms for the close animation before tearing down the scope.

## See also

- [Custom view](/help/extend/custom-view)
- [Custom editor](/help/extend/custom-editor)
- [Themes](/help/extend/themes)
