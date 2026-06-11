---
title: Custom view
description: Author a new IDE view.
---

# Custom view

A view is a reusable side / centre / bottom panel. Add one with a WebJar module under `components/ui/view-<name>/`.

## Module layout

```
components/ui/view-<name>/
  pom.xml
  src/main/resources/META-INF/dirigible/view-<name>/
    <name>.html
    configs/
      <name>-view.js
```

## View config

```js
const viewData = {
    id: 'reports-summary',
    label: 'Summary',
    region: 'center',          // 'left' | 'center' | 'right' | 'bottom'
    lazyLoad: true,
    autoFocusTab: false,
    path: '/services/web/view-reports-summary/summary.html'
};
if (typeof exports !== 'undefined') {
    exports.getView = () => viewData;
}
```

## Wire to a perspective

Inside the perspective's `index.html`, reference the view by id. The platform's layout engine reads the config and positions the view in the named region.

## HTML

Use BlimpKit components throughout. See [`/help/extend/blimpkit-ui`](/help/extend/blimpkit-ui) for the rules - no hard-coded colors, no custom CSS that replicates a BlimpKit utility class.

## DialogHub

Never embed `<bk-dialog>` markup in a view. Instead use the platform's `DialogHub` API:

```js
const dialogs = new DialogHub();
dialogs.showAlert({
    type: 'confirmation',
    title: 'Confirm',
    message: 'Delete this report?',
    buttons: [{ id: 'b1', label: 'Delete' }, { id: 'b2', label: 'Cancel' }]
});
```

## Register with the group aggregator

Add the module to the matching `components/group/group-*/pom.xml`.

## See also

- [Custom perspective](/help/extend/custom-perspective)
- [BlimpKit primer](/help/extend/blimpkit-ui)
- [Themes](/help/extend/themes)
