---
title: Custom perspective
description: Author a new IDE perspective.
---

# Custom perspective

A perspective is a configured set of editors + views for a single task. Add one with a small WebJar module under `components/ui/perspective-<name>/`.

## Module layout

```
components/ui/perspective-<name>/
  pom.xml
  src/main/resources/META-INF/dirigible/perspective-<name>/
    index.html
    project.json
    configs/
      <name>.js
      perspective-menu.js
    extensions/
      perspective.extension
      perspective-menu.extension
    images/<name>.svg
```

## perspective config (`configs/<name>.js`)

```js
const perspectiveData = {
    id: 'reports',
    label: 'Reports',
    path: '/services/web/perspective-reports/index.html',
    order: 1200,
    icon: '/services/web/perspective-reports/images/reports.svg'
};
if (typeof exports !== 'undefined') {
    exports.getPerspective = () => perspectiveData;
}
```

Pick an unused `order` slot - existing perspectives use 100, 200, ... 1100, 1200.

## perspective.extension

```json
{
    "module": "perspective-reports/configs/reports.js",
    "extensionPoint": "platform-perspectives",
    "description": "Reports Perspective"
}
```

## index.html shell

Use the standard `<meta name="platform-links" category="ng-perspective">` to pull in the platform-wide scripts and stylesheets. See [`/help/extend/blimpkit-ui`](/help/extend/blimpkit-ui).

## Register with the group aggregator

Add the module to `components/group/group-ide/pom.xml` so the assembly picks it up.

## See also

- [Custom view](/help/extend/custom-view)
- [Custom menu](/help/extend/custom-menu)
- [BlimpKit primer](/help/extend/blimpkit-ui)
