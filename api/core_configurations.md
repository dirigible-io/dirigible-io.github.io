---
layout: api
title: Configurations
icon: fa-cog
---

{{ page.title }}
===

Version 4.x
---

- Module: **core/v4/configurations**
- Alias: **core/configurations**
- Definition: N/A
- Source: [/core/v4/configurations.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/configurations.js)
- Facade: [ConfigurationFacade](https://github.com/eclipse/dirigible/blob/master/modules/commons/commons-config/src/main/java/org/eclipse/dirigible/commons/config/Configuration.java)
- Status: **stable**

### Basic Usage

```javascript
var rs = require("http/v4/rs");
var configurations = require("core/v4/configurations");

rs.service()
    .resource("")
        .get(function(ctx, request, response) {
            let credentials = {
                envVar1: configurations.get("ENV_VAR_1"),
                envVar2: configurations.get("ENV_VAR_2")
            };
            response.println(JSON.stringify(credentials));
        })
        .put(function(ctx, request, response) {
            let credentials = request.getJSON();
            configurations.set("ENV_VAR_1", credentials.envVar1);
            configurations.set("ENV_VAR_2", credentials.envVar2);
        })
.execute();

```



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key, defaultValue)()** | Returns the value for the specified key, or the default value | *string*
**set(key, value)** | Sets a value, for the specified key | *-*
**getKeys()** | Returns an arrays of keys | *array of string*
**load(path)** | Loads a configuration from a properties file at *path* | *-* 
**update()** | Updates the loaded configurations | *-*


Compatibility
---

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---

Version 3.x
---

- Module: **core/v3/configurations**
- Alias: **core/configurations**
- Definition: N/A
- Source: [/core/v3/configurations.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v3/configurations.js)
- Facade: [ConfigurationFacade](https://github.com/eclipse/dirigible/blob/master/modules/commons/commons-config/src/main/java/org/eclipse/dirigible/commons/config/Configuration.java)
- Status: **alpha**

### Basic Usage

```javascript
var rs = require("http/v3/rs");
var configurations = require("core/v3/configurations");

rs.service()
    .resource("")
        .get(function(ctx, request, response) {
            let credentials = {
                envVar1: configurations.get("ENV_VAR_1"),
                envVar2: configurations.get("ENV_VAR_2")
            };
            response.println(JSON.stringify(credentials));
        })
        .put(function(ctx, request, response) {
            let credentials = request.getJSON();
            configurations.set("ENV_VAR_1", credentials.envVar1);
            configurations.set("ENV_VAR_2", credentials.envVar2);
        })
.execute();

```



Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(key, defaultValue)()** | Returns the value for the specified key, or the default value | *string*
**set(key, value)** | Sets a value, for the specified key | *-*
**getKeys()** | Returns an arrays of keys | *array of string*
**load(path)** | Loads a configuration from a properties file at *path* | *-* 
**update()** | Updates the loaded configurations | *-*


Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅

---
