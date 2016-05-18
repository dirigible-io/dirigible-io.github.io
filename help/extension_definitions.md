---
layout: help
title: Extension Definitions
icon: fa-external-link
group: help-features
---

Extension Definitions
===

Extensibility is an important requirement for business applications built to follow custom processes in LoB areas. There are patterns already well known in the most popular languages and frameworks, such as plugins in Eclipse, BAdIs in ABAP, services in Java, etc. In the cloud toolkit, we have chosen the simplest and most powerful way to define extensions. It provides just a generic description of the extension points and extensions, without explicitly defining the contract.

Extension Points
---

An *Extension Point* is the place in the core module where it is expected to be enhanced by the custom created modules. It is a simple JSON formated file with extension **\*.extensionpoint** placed in project folder *Extension_Definitions*.

```javascript
	{
	  "extension-point":"/project1/extensionPoint1",
	  "description":"description for the extension point 1"
	}
```

Extensions
---

An *Extension* is the actual plug-in in the custom module which extends the core functionality. It is a simple JSON formated file with extension **\*.extension**, again in project folder *Extension_Definitions*.

```javascript
	{
	  "extension":"/project1/extension1",
	  "extension-point":"/project1/extensionPoint1",
	  "description":"description for the extension 1"
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

In the code above, the extension is a JavaScript Service Library (*extension1.jslib*) within the same project, which has exposed function *enhanceProcess()*.
