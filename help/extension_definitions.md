---
layout: help
title: Extension Definitions
icon: none
group: help-features
---

Extension Definitions
===

Extensibility is an important requirement for business applications built to follow custom processes in Line of Business(LoB) areas. In the cloud toolkit, a generic description of the extension points and extensions is provided without explicitly defining the contract. This a simple but powerful way to define extensions.

Extension Points
---

An *Extension Point* is the place in the core module, which is expected to be enhanced by particular custom created modules. It is a simple JSON formated **\*.extensionpoint** file and is placed in the *Extension_Definitions* project folder.

```javascript
	{
	  "extension-point":"/project1/extensionPoint1",
	  "description":"description for extension point 1"
	}
```

Extensions
---

An *Extension* is the plug-in in the custom module, which extends the core functionality. It is a simple JSON formated **\*.extension** file and can be found in the *Extension_Definitions* project folder.

```javascript
	{
	  "extension":"/project1/extension1",
	  "extension-point":"/project1/extensionPoint1",
	  "description":"description for extension 1"
	}
```

> The *"extension"* parameter above should point to a valid [Scripting Service](scripting_services.html) in the same language.


Calling Extensions
---

Within the core module, you can iterate over the defined extensions and call theirs functions:

```javascript
	var extensions = extensionManager.getExtensions("/project1/extensionPoint1");
	for (var i=0; i < extensions.length; i++) {
	    var extension = require(extensions[i]);
	    response.getWriter().println(extension.enhanceProcess());
	}
```

In the code above, the extension is a JavaScript Service Library (*extension1.jslib*) within the same project, and it has exposed an  *enhanceProcess()* function.
