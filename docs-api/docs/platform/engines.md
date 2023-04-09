---
title: Engines
---

Engines
===

Engines object is used for executing a scripting service programmatically.

=== "Overview"
- Module: `platform/engines`
- Definition: [https://github.com/eclipse/dirigible/issues/234](https://github.com/eclipse/dirigible/issues/234)
- Source: [/platform/engines.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/engines.js)
- Status: `stable`
- Group: `platform`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { engines } from "@dirigible/platform";
    import { response } from "@dirigible/http";

    let result = engines.getEngine("javascript").execute("project1/hello", {});

    response.println(JSON.stringify(result));
    response.flush();
    response.close();
    ```

=== "CommonJS"

    ```javascript
    const engines = require("platform/engines");
    const response = require("http/response");

    let result = engines.getEngine("javascript").execute("project1/hello", {});

    response.println(JSON.stringify(result));
    response.flush();
    response.close();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getEngine(type)**   | Returns the engine object per type provided | *Engine*
**getTypes()**   | Returns the list of the registered engine types | *array of strings*

### Objects

---

#### Engine

Function     | Description | Returns
------------ | ----------- | --------
**execute(module, context)**   | Executes a given module with a given context | *object*
**executeCode(source, context)**   | Executes a given source code with a given context | *object*
