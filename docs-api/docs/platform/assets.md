---
layout: help
title: PlatformAssets
icon: help-features
---

# PlatformAssets

PlatformAssets is a system service that scans all HTML files in the registry and replaces `<meta>` tags with the name attribute set to `platform-links` by injecting the corresponding `<script>` and `<link>` (CSS) tags defined in the `platform-links.json` configuration file.

=== "Overview"

- Module: `engine-web`
- Source: [watcher/PlatformAssetsJsonLoader.java](https://github.com/eclipse/dirigible/blob/master/components/engine/engine-web/src/main/java/org/eclipse/dirigible/components/engine/web/watcher/PlatformAssetsJsonLoader.java)
- Platform Links: [/components/engine/engine-web/src/main/resources/platform-links.json](https://github.com/eclipse/dirigible/blob/master/components/engine/engine-web/src/main/resources/platform-links.json)
- Status: `stable`
- Group: `platform`

## Configuration

---

The configuration file is defined as a JSON object with a prescribed structure.

Each top-level property represents a category name. The value associated with each category is an array of link configuration objects.

Two link types are supported: `SCRIPT` and `CSS`.

For `SCRIPT` entries, two optional boolean properties may be specified:

- `module` — When set to `true`, the generated `<script>` tag will use `type="module"`.
- `defer` — When set to `true`, the generated `<script>` tag will include the `defer` attribute.

The following example illustrates the expected structure:

```json
{
  "category-name": [
    {
      "type": "SCRIPT",
      "path": "/path/to/javascript.js"
    },
    {
      "type": "SCRIPT",
      "path": "/path/to/module.js",
      "module": true
    },
    {
      "type": "SCRIPT",
      "path": "/path/to/javascript.js",
      "defer": true
    },
    {
      "type": "CSS",
      "path": "/path/to/style.css"
    }
  ]
}
```

## Categories

---

Links are organized into categories to simplify configuration and reuse.

| Category Name          | Description                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **ng-view**            | Provides all required assets for rendering a standard view.                                                                     |
| **ng-editor**          | Extends the base `ng-view` bundle with additional assets required for editor views. Must be used in combination with `ng-view`. |
| **ng-perspective**     | Extends the base `ng-view` bundle with assets required for perspective views. Must be used in combination with `ng-view`.       |
| **ng-shell**           | Extends the base `ng-view` bundle with assets required for shell views. Must be used in combination with `ng-view`.             |
| **ng-file-upload**     | Includes the `angular-file-upload` module.                                                                                      |
| **ng-split**           | Provides the Split.js library and the `<split>` directive.                                                                      |
| **ng-code-editor**     | Provides an embeddable Monaco editor exposed through the `<code-editor>` directive.                                             |
| **ng-cookies**         | Includes the AngularJS cookies module.                                                                                          |
| **ng-jstree**          | Includes the JSTree library with an indicator plugin and custom styles.                                                         |
| **ng-editors-service** | Provides an AngularJS module for retrieving available editors and their associated file types.                                  |

## Example

Basic view:

```html
<head>
  ...
  <meta name="platform-links" category="ng-view" />
  ...
</head>
```

Perspective:

```html
<head>
  ...
  <meta name="platform-links" category="ng-view,ng-perspective" />
  ...
</head>
```
