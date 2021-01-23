---
title: Extensions
---

Extensions
===

=== "Overview"
- Module: `core/v4/extensions`
- Alias: `core/extensions`
- Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18)
- Source: [/core/v4/extensions.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/extensions.js)
- Facade: [ExtensionsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/ExtensionsServiceFacade.java)
- Status: `stable`

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


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getExtensionPoints()** | Returns an array of the extension points names | *array of string*
**getExtensions(extensionPoint)**   | Returns an array of the extensions names for the specified extension point | *array of string*
