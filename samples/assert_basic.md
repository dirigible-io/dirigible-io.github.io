---
layout: samples
title: Assert Basic
icon: fa-caret-right
group: simple
---

Assert Basic
===

Develop
--

1. Create a new project and name it **assert_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **assert_basic.js**).
6. Replace the generated code in **assert_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var assert = require('core/assert');
	var response = require('net/http/response');
	
	assert.assertTrue(true, "Failed assertTrue");
	try {
		assert.assertTrue(false, "Failed assertTrue");
	} catch(e) {
	    response.println(e.message);
	}
	
	assert.assertFalse(false, "Failed assertFalse");
	try {
		assert.assertFalse(true, "Failed assertFalse");
	} catch(e) {
	    response.println(e.message);
	}
	
	assert.assertEquals("string", "string", "Failed assertEquals string");
	try {
		assert.assertEquals("string1", "string2", "Failed assertEquals string");
	} catch(e) {
	    response.println(e.message);
	}
	
	assert.assertEquals({"key": "value"}, {"key": "value"}, "Failed assertEquals object");
	try {
		assert.assertEquals({"key1": "value1"}, {"key2": "value2"}, "Failed assertEquals object");
	} catch(e) {
	    response.println(e.message);
	}
	
	assert.assertNull(null, "Failed assertNull");
	try {
		assert.assertNull("", "Failed assertNull");
	} catch(e) {
	    response.println(e.message);
	}
	
	assert.assertNotNull("", "Failed assertNotNull");
	try {
		assert.assertNotNull(null, "Failed assertNotNull");
	} catch(e) {
	    response.println(e.message);
	}
	
	try {
		assert.fail("Failed fail");
	} catch(e) {
	    response.println(e.message);
	}
	
	response.flush();
	response.close();

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_core_assert_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/assert.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
