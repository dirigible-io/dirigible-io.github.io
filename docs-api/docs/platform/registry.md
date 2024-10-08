---
title: Registry
---

Registry
===

Registry object gives access to the content in the repository and also the pre-delivered content

=== "Overview"
- Module: `platform/registry`
- Definition: [https://github.com/eclipse/dirigible/issues/508](https://github.com/eclipse/dirigible/issues/508)
- Source: [/platform/registry.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/registry.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { registry } from "sdk/platform";
    import { response } from "sdk/http";

    let text = registry.getText("modules/src/platform/registry.ts");

    response.println(text);
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const response = require("http/response");
    const registry = require("platform/registry");

    let text = registry.getText("platform/registry.js");

    response.println(text);
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getContent(path)**   | Gets the content of resource by path, as byte array | *array of bytes*
**getContentNative(path)**   | Gets the content of resource by path, as array of Java bytes | *array of Java bytes*
**getText(path)**   | Gets the content of resource by path, as text | *string*
**find(path, pattern)**   | Find resources under certain path (e.g. /) by pattern (e.g. *.js) | *array of strings*

