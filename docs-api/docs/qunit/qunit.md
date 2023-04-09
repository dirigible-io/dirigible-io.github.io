---
title: QUnit
---

QUnit
===

QUnit object is used in unit tests.

=== "Overview"
- Module: `qunit/qunit`
- Definition: N/A
- Source: [/qunit/qunit.js](https://github.com/eclipse/dirigible/blob/master/components/api-qunit/src/main/resources/META-INF/dirigible/qunit/qunit.js)
- Status: `stable`
- Group: `platform`

### Basic Usage

```javascript
const qunit = require("qunit/qunit");

qunit.module('Module 1:');

qunit.test("Test 1", function(assert) {
	assert.ok(true, 'Passing assertion');
	assert.ok(false, 'Failing assertion');
});

require("qunit/runner").run();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**module(name)**   | Register a module by `name` | *string*
**test(title, group)**   | Register a group of tests | *string*
