---
layout: api
title: Bytes
icon: fa-ellipsis-h
---

{{ page.title }}
===

Bytes module provides utility functions for working with bytes.


Version 4.x
---


- Module: **io/v4/bytes**
- Alias: **io/bytes**
- Definition: n/a
- Source: [/io/v4/bytes.js](https://github.com/dirigiblelabs/api-io/blob/master/io/v4/bytes.js)
- Facade: n/a
- Status: **stable**


### Basic Usage

```javascript
var bytes = require("io/v4/bytes");

console.log(bytes.textToByteArray("Hello World"));
console.log(bytes.byteArrayToText([72,101,108,108,111,32,87,111,114,108,100]));
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**textToByteArray(text)**   | Converts a text to a byte array | *array of bytes*
**byteArrayToText(bytes)**   | Converts a byte array to text | *string*
**toJavaBytes(bytes)**   | Convert the native JavaScript byte array to Java one, to be used internally by the API layer | *array of Java bytes*
**toJavaScriptBytes(bytes)**   | Convert the Java byte array to a native JavaScript one, to be used internally by the API layer | *array of JavaScript bytes*

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
