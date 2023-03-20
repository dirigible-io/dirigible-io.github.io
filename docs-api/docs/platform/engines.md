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

### Basic Usage

```javascript
var engines = require("platform/engines");
var response = require("http/response");

var result = engines.getEngine("javascript").execute("project1/hello", {});

response.println(result);
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
