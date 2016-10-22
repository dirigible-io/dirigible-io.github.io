---
layout: samples
title: Config Basic
icon: fa-caret-right
group: simple
---

Config Basic
===

Develop
--

1. Create a new project and name it **config_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **config_basic.js**).
6. Replace the generated code in **config_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var config = require('core/config');
	var response = require('net/http/response');
	
	var properties = {
			"property1": "value1",
			"property2": "value2"
		}
	
	config.set("/path/to/property", "key1", "value1");
	config.setJson("/path/to/properties", JSON.stringify(properties));
	
	response.println(config.get("/path/to/property", "key1"));
	var result = JSON.parse(config.getJson("/path/to/properties"));
	response.println(result.property2);
	
	config.delete("/path/to/property");
	config.delete("/path/to/properties");
	
	response.println(config.get("/path/to/property"));
	response.println(config.get("/path/to/properties"));
	
	response.flush();
	response.close();

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_core_config_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/config.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
