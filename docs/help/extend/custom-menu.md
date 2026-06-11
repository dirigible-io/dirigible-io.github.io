---
title: Custom menu
description: Add a top-bar menu to a perspective.
---

# Custom menu

Each perspective can declare its own top-bar menu via a WebJar module under `components/ui/menu-<name>/`.

## Module layout

```
components/ui/menu-<name>/
  pom.xml
  src/main/resources/META-INF/dirigible/menu-<name>/
    configs/menu.js
    extensions/menu.extension
```

## Menu config

```js
const menuData = {
    perspective: 'reports',
    items: [
        {
            label: 'File',
            items: [
                { label: 'New report...', event: 'reports.new' },
                { label: 'Refresh',       event: 'reports.refresh' }
            ]
        },
        {
            label: 'Help',
            items: [
                { label: 'Reports help', link: '/services/web/help/reports' }
            ]
        }
    ]
};
if (typeof exports !== 'undefined') {
    exports.getMenu = () => menuData;
}
```

## Wiring

The menu is bound to a perspective by `perspective: '<id>'`. When that perspective is active, the platform shell renders the menu in the top bar.

## Events

Menu items can either:

- Emit a platform message (`event: 'reports.new'`) - handled by views that subscribe via `MessageHub`.
- Open a link (`link: '/services/web/...'`) - direct navigation.

## Register with the group aggregator

Add to `components/group/group-ide/pom.xml`.

## See also

- [Custom perspective](/help/extend/custom-perspective)
- [Custom view](/help/extend/custom-view)
