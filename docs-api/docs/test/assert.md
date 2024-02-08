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
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { base64 } from "sdk/utils";
    import { assert } from "sdk/test";

    const input = "test"
    const result = base64.encode(input);

    assert.assertEquals(result, 'dGVzdA==', "check if match");
    ```

<!-- === "CommonJS"

    ```javascript
    const base64 = require('utils/base64');
    const assertEquals = require('test/assert').assertEquals;

    const input = "test"
    const result = base64.encode(input);

    assertEquals(result, 'dGVzdA==', "check if match");
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**assertTrue(condition, message)**   | Assert as `true` | *-*
**assertFalse(condition, message)**   | Assert as `false` | *-*
**assertNull(object, message)**   | Assert if object is `null` | *-*
**assertNotNull(object, message)**   | Assert if object is `not null` | *-*
**assertEquals(actual, expected, message)**   | Assert if `actual` object is the same as the `expected` one | *-*
