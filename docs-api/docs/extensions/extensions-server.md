---
title: Extensions (Server)
---

Extensions (Server)
===

=== "Overview"
- Module: `extensions/extensions`
- Definition: [https://github.com/eclipse/dirigible/issues/18](https://github.com/eclipse/dirigible/issues/18)
- Source: [/extensions/extensions.js](https://github.com/eclipse/dirigible/blob/master/components/api-extensions/src/main/resources/META-INF/dirigible/extensions/extensions.js)
- Status: `stable`
- Group: `core`

### Extension files

Extensions are used for creating custom modules and extend the functionality of the platform. They can be used both for client and server modules.

An extension must first be registered with an [extension point](../extension-point/). It is a simple JSON formatted `*.extension` file and can be placed anywhere in your project, although it's recommended to place it inside an `extensions` folder, in the root of your project.

```json
{
    "module": "module.js",
    "extensionPoint": "extension-point-name",
    "description": "Example extension"
}
```

The module is a simple JavaScript file that exports functions and/or data.

```javascript
exports.getFunc = () => ({
	id: 'id-data',
	path: '/uri/path/to/an/api/',
	...
});
```

### Basic Usage

Here are two examples of an extension service that can be used to retrieve extension information.

=== "Example"

    ```javascript
    import { response } from "sdk/http";
    import { extensions } from "sdk/extensions";

    const customExtensions = await Promise.resolve(extensions.loadExtensionModules('extension-point-name'));
    const extensionConfigs = [];

    for (let i = 0; i < customExtensions?.length; i++) {
        extensionConfigs.push(customExtensions[i].getFunc());
    }

    response.setContentType("application/json");
    response.println(JSON.stringify(extensionConfigs));
    response.flush();
    response.close();
    ```

=== "ECMA6"

    ```javascript
    import { extensions } from "sdk/extensions";
    import { response } from "sdk/http";

    const mainmenu = [];
    const menuExtensions = extensions.getExtensions("example-menu");
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

    response.setContentType("application/json");
    response.println(JSON.stringify(mainmenu));
    response.flush();
    response.close();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getExtensionPoints()** | Returns an array of the extension points names | *array of string*
**getExtensions(extensionPoint)**   | Returns an array of the extensions names for the specified extension point | *array of string*
