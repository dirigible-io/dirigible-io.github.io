---
layout: help
title: Test Cases
icon: fa-flask
group: help-features
---

Test Cases
===

Overview
---

Following the best practices, unit tests are always an integral part of the application code itself. For this reason, in the cloud toolkit there is a predefined place for them and kind of deep integration with the scripting services.

The language supported for test cases is the same as of the target scripting service you want to test. Technically, the unit tests are not different than the services, hence the separation in this regard is only semantical. You can code in the test cases everything the way you do in scripting services. All API objects, the context, and the usage of libraries are supported transparently.

Writing a Test Case
---

1. Select a project and, from the context menu, choose an action. 
2. Choose *New* -> *Test Case*.
3. Select a test case from the list of predefined templates.
4. You can use the following APIs, which can help you write more standardized and comprehensible unit tests:

*	*assertTrue*
	*	message - the error message
	*	condition - the condition usually contains the inspecting values
*	*assertFalse*
	*	message - the error message
	*	condition - the condition usually contains the inspecting values
*	*assertEquals*
	*	message - the error message
	*	o1 - the expecting object
	*	o2 - the actual object
*	*assertNull*
	*	message - the error message
	*	o - the inspecting object
*	*assertNotNull*
	*	message - the error message
	*	o - the inspecting object
*	*fail*
	*	message - the error message

Sample code:

```javascript

	var assert = require('assert');
	...
	assert.assertNotNull('value is null', value);
	...

```

For a more comprehensive sample, refer to [Sample Test Case](../samples/test_case.html).
