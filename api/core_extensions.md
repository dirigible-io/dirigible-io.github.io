---
layout: api
title: Extensions
icon: fa-ellipsis-h
---

{{ page.title }}
===

Version 4.x
---

- Module: **core/v4/extensions**
- Alias: **core/extensions**
- Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18)
- Source: [/core/v4/extensions.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/extensions.js)
- Facade: [ExtensionsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ExtensionsServiceFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var extensions = require("core/v4/extensions");
var response = require("http/v4/response");

var mainmenu = [];
var menuExtensions = extensions.getExtensions("ide-menu");
for (var i = 0; i < menuExtensions.length; i++) {
    var module = menuExtensions[i];
    menuExtension = require(module);
    var menu = menuExtension.getMenu();
    mainmenu.push(menu);
}
response.println(JSON.stringify(mainmenu));

```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getExtensionPoints()** | Returns an array of the extension points names | *array of string*
**getExtensions(extensionPoint)**   | Returns an array of the extensions names for the specified extension point | *array of string*



Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **core/v3/extensions**
- Alias: **core/extensions**
- Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18)
- Source: [/core/v3/extensions.js](https://github.com/dirigiblelabs/api-v3-core/blob/master/core/v3/extensions.js)
- Facade: [ExtensionsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ExtensionsServiceFacade.java)
- Status: **alpha**

### Basic Usage

```javascript
var extensions = require("core/v3/extensions");
var response = require("http/v3/response");

var mainmenu = [];
var menuExtensions = extensions.getExtensions("ide-menu");
for (var i = 0; i < menuExtensions.length; i++) {
    var module = menuExtensions[i];
    menuExtension = require(module);
    var menu = menuExtension.getMenu();
    mainmenu.push(menu);
}
response.println(JSON.stringify(mainmenu));

```



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getExtensionPoints()** | Returns an array of the extension points names | *array of string*
**getExtensions(extensionPoint)**   | Returns an array of the extensions names for the specified extension point | *array of string*



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---


Version 2.x
---

Extensions module provides classes and utilities for working with extension points and extensions.

- Module: **core/extensions**
- Definition: [/core_api/issues/13](https://github.com/dirigiblelabs/core_api/issues/13)
- Source: [/core/extensions.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/core/extensions.js)
- Status: **beta**

### Basic Usage

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var extensions = require('core/extensions');

processRequest();

function processRequest() {
	var info = {
		'Extensions': getExtensions(),
		'ExtensionPoints': getExtensionPoints(),
		'ExtensionPointDescription': getExtensionPoint().getDescription()
	};

	response.println(JSON.stringify(info, null, 2));
	response.flush();
	response.close();
}

function getExtensions() {
	return extensions.getExtensions('/registry/extension_points/routes');
}

function getExtensionPoints() {
	return extensions.getExtensionPoints();
}

function getExtensionPoint() {
	return extensions.getExtensionPoint('/registry/routes');
}
```




### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getExtensions(extensionPoint)**   | Returns an array of the extensions names for the specified extension point | *array of string*
**getExtension(extension, extensionPoint)** | Returns an extension definition | *ExtensionDefinition*
**getExtensionPoints()** | Returns an array of the extension points names | *array of string*
**getExtensionPoint(extensionPoint)** | Returns an extension point definition | *ExtensionPointDefinition*
**createExtension(extension, extensionPoint, description)** | Creates an extension | -
**updateExtension(extension, extensionPoint, description)** | Updates an extension | -
**createExtensionPoint(extensionPoint, description)** | Creates an extension point | -
**updateExtensionPoint(extensionPoint, description)** | Updates an extension point | -
**removeExtension(extension, extensionPoint)** | Removes an extension | -
**removeExtensionPoint(extensionPoint)** | Removes an extension point | -

#### Objects

---

##### ExtensionDefinition

Function     | Description | Returns
------------ | ----------- | --------
**getLocation()** | Returns the location of the extension | *string*
**getExtensionPoint()** | Returns the name of the extension point | *string*
**getDescription()** | Returns the description of the extension | *string*
**getCreatedBy()** | Returns the Id of the user, who've created the extension | *string*
**getCreatedAt()** | Returns the creation date information | *Date*

##### ExtensionPointDefinition

Function     | Description | Returns
------------ | ----------- | --------
**getLocation()** | Returns the location of the extension point | *string*
**getDescription()** | Returns the description of the extension point | *string*
**getCreatedBy()** | Returns the Id of the user, who've created the extension point | *string*
**getCreatedAt()** | Returns the creation date information | *Date*


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
 
---

