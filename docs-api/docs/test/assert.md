---
title: Assert
---

Assert
===

Assert object is used in unit tests.

=== "Overview"
- Module: `test/assert`
- Definition: N/A
- Source: [/test/assert.js](https://github.com/eclipse/dirigible/blob/master/components/api-test/src/main/resources/META-INF/dirigible/test/assert.js)
- Status: `stable`

### Basic Usage

```javascript
var base64 = require('utils/base64');
var assertEquals = require('test/assert').assertEquals;

var input = [61, 62, 63];
var result = base64.encode(input);

assertEquals(result, 'PT4/');
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**assertTrue(condition, message)**   | Assert as `true` | *-*
**assertFalse(condition, message)**   | Assert as `false` | *-*
**assertNull(object, message)**   | Assert if object is `null` | *-*
**assertNotNull(object, message)**   | Assert if object is `not null` | *-*
**assertEquals(actual, expected, message)**   | Assert if `actual` object is the same as the `expected` one | *-*
