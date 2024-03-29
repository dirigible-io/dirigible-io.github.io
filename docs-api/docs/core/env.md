---
title: Env
---

Env
===

Env object is used for access of the environment variables.

=== "Overview"
- Module: `core/env`
- Definition: [https://github.com/eclipse/dirigible/issues/29](https://github.com/eclipse/dirigible/issues/29)
- Source: [/core/env.js](https://github.com/eclipse/dirigible/blob/master/components/api-core/src/main/resources/META-INF/dirigible/core/env.js)
- Status: `stable`
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { env } from "sdk/core";
    import { response } from "sdk/http";

    let os = env.get("os.name");
    response.println("[OS]: " + os);

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const env = require("core/env");
    const response = require("http/response");

    let os = env.get("os.name");
    response.println("[OS]: " + os);

    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key)**   | Returns the value per key from the environments variables | *string*
**list()**   | Returns the list of the environments variables in JSON formatted string | *string*
