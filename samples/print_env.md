---
layout: samples
title: Print Environment Variables
icon: fa-list
group: simple
---

Print Environment Variables
===

Develop
---

1. Create a new project and name it **env_var**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.

<br>

![New JavaScript service Wizard](images/new_javascript_service_wizard.png)

<br>

5. Give it a meaningful name (e.g **printenv.js**).
6. Replace the generated code in **printenv.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var env = require('core/env');
	var response = require('net/http/response');
	
	var allEnvVars = env.getAll();
	allEnvVars.forEach(function (envVar) {
		response.println(envVar.key + "=" + envVar.value);
	});
	
	response.flush();
	response.close();
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_env_print_all.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/env.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**