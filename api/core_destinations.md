---
layout: api
title: Destinations
icon: fa-check
---

{{ page.title }}
===

Destinations object is used to access properties usually stored and managed by external service. 

Version 4.x
---

- Module: **core/v4/destinations**
- Alias: **core/destinations**
- Definition: [https://github.com/eclipse/dirigible/issues/445](https://github.com/eclipse/dirigible/issues/445)
- Source: [/core/v4/destinations.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/destinations.js)
- Facade: [DestinationsFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/DestinationsFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var destinations = require("core/v4/destinations");

var destination = {};
destination.name1 = "value1";
destinations.set("destination1", destination);
var result = destinations.get("destination1");

result.name1 === "value1";
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get(name)**   | Returns an object representing the destination | *object*
**set(name, destination)**   | Sets the destination object under the given name | -



### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |
 
 
 ---
 
  ---
 
 
 Version 3.x
---
 
N/A

 ---
 
 
 Version 2.x
---
 
N/A

---
