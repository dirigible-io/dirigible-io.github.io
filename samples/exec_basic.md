---
layout: samples
title: Exec
icon: none
group: simple
---

Exec
===

Develop
--

1. Create a new project and name it **exec_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **exec_basic.js**).
6. Replace the generated code in **exec_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var exec = require('service/exec');
	var response = require('net/http/response');

	var context = {"input_param": "input_param_value"};

	// Test execution
	var result = exec.test("/service/exec_target_test.js", context);

	response.println("Printing output parameter: " + result.context.output_param);

	// use also exec.js(), exec.flow(), exec.job(), exec.sql(), exec.command() ...

	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_service_exec_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/exec.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
