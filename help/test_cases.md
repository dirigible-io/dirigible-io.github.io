---
layout: help
title: Test Cases
icon: none
group: help-features
---

{{ page.title }}
===

Overview
---

The language supported for test cases is the same as the one used for the target scripting service, which you want to test. Technically, the unit tests are not different from the services, hence the separation in this regard is only semantical. You can code in the test cases everything the way you do it in the scripting services. All API objects, the context, and the usage of libraries are supported transparently.

Writing a Test Case
---

1. Select a project and choose an action from the context menu. 
2. Choose *New* and select *Test Case*.
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
