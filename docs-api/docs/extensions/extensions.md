---
title: Extensions
---

Extensions
===

=== "Overview"
- Module: `extensions/extensions`
- Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18)
- Source: [/core/extensions.js](https://github.com/eclipse/dirigible/blob/master/components/api-extensions/src/main/resources/META-INF/dirigible/extensions/extensions.js)
- Status: `stable`

### Basic Usage

#### ECMA6

```javascript
import { extensions } from "@dirigible/extensions";
import { response } from "@dirigible/http";

let mainmenu = [];
let menuExtensions = extensions.getExtensions("ide-menu");
for (let i = 0; i < menuExtensions.length; i++) {
    let module = menuExtensions[i];
    menuExtension = require(module);
    let menu = menuExtension.getMenu();
    mainmenu.push(menu);
}

response.println(JSON.stringify(mainmenu));
```

#### Require

```javascript
var extensions = require("core/extensions");
var response = require("http/response");

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
