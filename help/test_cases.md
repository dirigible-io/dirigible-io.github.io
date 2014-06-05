---
layout: help
title: Help
---

Test Cases
===

Overview
---

Following the best practices unit tests are always integral part of the application code itself. For this reason in the cloud toolkit there is a predefined place for them and kind of deep integration with the scripting services.
The language supported for test cases is the same as of the target scripting service you want to tests. Technically the unit tests are not different than the services, hence the separation in this regard is only semantical. You can code in the test cases everything as you can do also in scripting services. All the API objects and context as well as usage of libraries are supported transparently.

Writing a Test Case
---

You start by using the action from the pop-up menu while selecting a project. Choose the New->Test Case and select from the list of the predefined templates.
You can use the following APIs which can help you to write more standardized yet comprehensible unit tests:

*	*assertTrue*
	*	message - the error message
	*	condition - the condition usually containing the inspecting values
*	*assertFalse*
	*	message - the error message
	*	condition - the condition usually containing the inspecting values
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

Some sample code should look like:
<pre><code>var assert = require('assert');
...
assert.assertNotNull('value is null', value);
...
</code></pre>

For more comprehensive sample you can refer to [sample test case](../samples/test_case.html).
