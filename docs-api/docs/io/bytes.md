---
title: Bytes
---

Bytes
===

Bytes module provides utility functions for working with bytes.

=== "Overview"
- Module: `io/bytes`
- Definition: n/a
- Source: [/io/bytes.js](https://github.com/eclipse/dirigible/blob/master/components/api-io/src/main/resources/META-INF/dirigible/io/bytes.js)
- Status: `stable`


### Basic Usage

```javascript
var bytes = require("io/bytes");

console.log(bytes.textToByteArray("Hello World"));
console.log(bytes.byteArrayToText([72,101,108,108,111,32,87,111,114,108,100]));
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**textToByteArray(text)**   | Converts a text to a byte array | *array of bytes*
**byteArrayToText(bytes)**   | Converts a byte array to text | *string*
**toJavaBytes(bytes)**   | Convert the native JavaScript byte array to Java one, to be used internally by the API layer | *array of Java bytes*
**toJavaScriptBytes(bytes)**   | Convert the Java byte array to a native JavaScript one, to be used internally by the API layer | *array of JavaScript bytes*
