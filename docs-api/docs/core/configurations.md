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

#### ECMA6

```javascript
import { rs } from "@dirigible/http";
import { configurations } from "@dirigible/core";

rs.service()
    .resource("")
    .get(function (_ctx, _request, response) {
        let credentials = {
            envVar1: configurations.get("ENV_VAR_1"),
            envVar2: configurations.get("ENV_VAR_2")
        };
        response.println(JSON.stringify(credentials));
    })
    .put(function (_ctx, request, _response) {
        let credentials = request.getJSON();
        configurations.set("ENV_VAR_1", credentials.envVar1);
        configurations.set("ENV_VAR_2", credentials.envVar2);
    })
    .execute();

```

#### Require

```javascript
var rs = require("http/rs");
var configurations = require("core/configurations");

rs.service()
    .resource("")
        .get(function(ctx, request, response) {
            var credentials = {
                envVar1: configurations.get("ENV_VAR_1"),
                envVar2: configurations.get("ENV_VAR_2")
            };
            response.println(JSON.stringify(credentials));
        })
        .put(function(ctx, request, response) {
            var credentials = request.getJSON();
            configurations.set("ENV_VAR_1", credentials.envVar1);
            configurations.set("ENV_VAR_2", credentials.envVar2);
        })
.execute();

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
