---
layout: help
title: Extension Definitions
icon: none
group: help-features
---

Extension Definitions
===

Extensibility is an important requirement for business applications built to follow custom processes in Line of Business (LoB) areas. In the cloud toolkit, a generic description of the extension points and extensions is provided without explicitly defining the contract. This a simple but powerful way to define extensions.

Extension Points
---

An extension point is the place in the core module, which is expected to be enhanced by particular custom created modules. It is a simple JSON formated `*.extensionpoint` file and can be placed anywhere in your project.

```json
{
	"extension-point": "/project1/extensionPoint1",
	"description": "Description for Extension Point 1"
}
```

Extensions
---

An extension is the plug-in in the custom module, which extends the core functionality. It is a simple JSON formated `*.extension` file and can be placed anywhere in your project.

```json
{
	"extension": "/project1/extension1",
	"extension-point": "/project1/extensionPoint1",
	"description": "Description for Extension 1"
}
```

!!! Note
	The 'extension' parameter above should point to a valid JavaScript module.


Calling Extensions
---

Within the core module, you can iterate over the defined extensions and call theirs functions:

```javascript
let extensions = extensionManager.getExtensions("/project1/extensionPoint1");
for (let i = 0; i < extensions.length; i++) {
	let extension = require(extensions[i]);
	response.println(extension.enhanceProcess());
}
```

In the code above, the extension is a JavaScript module (`extension1.js`) within the same project, and it has exposed an  `enhanceProcess()` function.
