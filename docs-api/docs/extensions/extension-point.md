---
title: Extension Point
---

Extension Point
===

=== "Overview"
<!-- - Module: `extensions/extensions` -->
<!-- - Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18) -->
<!-- - Source: [/extensions/extensions.js](https://github.com/eclipse/dirigible/blob/master/components/api-extensions/src/main/resources/META-INF/dirigible/extensions/extensions.js) -->
- Status: `stable`
- Group: `core`

### Extension points

Extension points are used to group extensions by type. It is a simple JSON formatted `*.extensionpoint` file and can be placed anywhere in your project, although it's recommended to place it inside an `extensionpoints` folder, in the root of your project.

```json
{
	"name": "extension-point-name",
	"description": "Description for Extension Point 1"
}
```