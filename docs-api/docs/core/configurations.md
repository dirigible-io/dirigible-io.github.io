---
title: Configurations
---

Configurations
===

=== "Overview"
- Module: `core/configurations`
- Source: [/core/configurations.js](https://github.com/eclipse/dirigible/blob/master/components/api-core/src/main/resources/META-INF/dirigible/core/configurations.js)
- Status: `stable`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { response } from "@dirigible/http";
    import { configurations } from "@dirigible/core";

    configurations.set("ENV_VAR_1", "ENV_VAR_1");
    configurations.set("ENV_VAR_2", "ENV_VAR_2");

    let credentials = {
        envVar1: configurations.get("ENV_VAR_1"),
        envVar2: configurations.get("ENV_VAR_2")
    };

    response.println(JSON.stringify(credentials));
    ```

=== "CommonJS"

    ```javascript
    const response = require("http/response");
    const configurations = require("core/configurations");

    configurations.set("ENV_VAR_1", "ENV_VAR_1");
    configurations.set("ENV_VAR_2", "ENV_VAR_2");

    let credentials = {
        envVar1: configurations.get("ENV_VAR_1"),
        envVar2: configurations.get("ENV_VAR_2")
    };

    response.println(JSON.stringify(credentials));
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key, defaultValue)()** | Returns the value for the specified key, or the default value | *string*
**set(key, value)** | Sets a value, for the specified key | *-*
**getKeys()** | Returns an arrays of keys | *array of string*
**load(path)** | Loads a configuration from a properties file at *path* | *-* 
**update()** | Updates the loaded configurations | *-*
