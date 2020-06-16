---
layout: api
title: Java
icon: fa-check
---

{{ page.title }}
===

> ⚠ Deprecated

Java module is used for the interconnection between the Javascript engines and the underlying JVM. 


Version 3.x
---

- Module: **core/v3/java**
- Alias: **core/java**
- Definition: [https://github.com/eclipse/dirigible/issues/47](https://github.com/eclipse/dirigible/issues/47)
- Source: [/core/v3/java.js](https://github.com/dirigiblelabs/api-v3-core/blob/master/core/v3/java.js)
- Facade: [JavaFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/JavaFacade.java)
- Status: **alpha**

### Basic Usage

```javascript
var java = require('core/v3/java');

var uuid = java.call('org.eclipse.dirigible.api.v3.utils.UuidFacade', 'random', []);
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**call(className, methodName, params, deep)**   | Calls a static method with primitive arguments. Can return either a primitive or serialized array of primitives or object reference (deep=true). | primitive, serialized array or an object reference
**instantiate(className, params)**   | Creates an instance of an object on the JVM side and returns its reference for further use. | object reference
**invoke(uuid, methodName, params, deep)**   | Invokes a method of an object by its reference (uuid) with the given parameters. Can return either a primitive or serialized array of primitives or object reference (deep=true). | primitive, serialized array or an object reference


### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅



---

---


Version 2.x
---

Not available.
