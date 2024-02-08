---
title: Extensions
---

Extensions
===

=== "Overview"
- Module: `extensions/extensions`
- Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18)
- Source: [/extensions/extensions.js](https://github.com/eclipse/dirigible/blob/master/components/api-extensions/src/main/resources/META-INF/dirigible/extensions/extensions.js)
- Status: `stable`
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { extensions } from "sdk/extensions";
    import { response } from "sdk/http";

    const mainmenu = [];
    const menuExtensions = extensions.getExtensions("ide-menu");
    for (let i = 0; i < menuExtensions.length; i++) {
        const extensionPath = menuExtensions[i];
        
        // To require CommonJS extension
        // const menuExtension = require(extensionPath);
        // const menu = menuExtension.getMenu();


        // Note: ECMA6 imports are always relative, thus providing the relative path to the project root folder.
        // In this sample it's assumed that the file is located at "my-project/myFolder/file.mjs"
        const { getMenu } = await import(`../../${extensionPath}`);
        const menu = getMenu();
        mainmenu.push(menu);
    }

    response.println(JSON.stringify(mainmenu));
    ```

<!-- === "CommonJS"

    ```javascript
    const extensions = require("core/extensions");
    const response = require("http/response");

    const mainmenu = [];
    const menuExtensions = extensions.getExtensions("ide-menu");
    for (let i = 0; i < menuExtensions.length; i++) {
        const extensionPath = menuExtensions[i];
        const menuExtension = require(extensionPath);
        const menu = menuExtension.getMenu();
        mainmenu.push(menu);
    }

    response.println(JSON.stringify(mainmenu));
    ``` -->


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getExtensionPoints()** | Returns an array of the extension points names | *array of string*
**getExtensions(extensionPoint)**   | Returns an array of the extensions names for the specified extension point | *array of string*
