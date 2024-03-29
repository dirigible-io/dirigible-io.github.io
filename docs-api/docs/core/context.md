---
title: Context
---

Context
===

Context object is used to store and manage properties for a single execution flow (with or without HTTP request)

=== "Overview"
- Module: `core/context`
- Definition: [https://github.com/eclipse/dirigible/issues/31](https://github.com/eclipse/dirigible/issues/31)
- Source: [/core/context.ts](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/core/context.ts)
- Status: `stable`
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { context } from "sdk/core";
    import { response } from "sdk/http";

    context.set("attr1", "value1");
    let attr = context.get("attr1");

    response.println("[Attribute]: " + attr);
    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const context = require('core/context');
    const response = require('http/response');

    context.set("attr1", "value1");
    let attr = context.get("attr1");

    response.println("[Attribute]: " + attr);
    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the context parameters | *string*
**set(key, value)**   | Sets the value per key to the context parameters | -
