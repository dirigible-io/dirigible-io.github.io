---
layout: samples
title: Env Basic
icon: fa-tree
group: simple
---

Env Basic
===

Develop
--

1. Create a new project and name it **env_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **env_basic.js**).
6. Replace the generated code in **env_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var env = require('core/env');
	var response = require('net/http/response');

	var os = env.get("os.name");
	response.println("[OS]: " + os);
	response.println("[OS Name]: " + env.getOperatingSystemName());
	response.println("[OS Arch]: " + env.getOperatingSystemArchitecture());
	response.println("[OS Version]: " + env.getOperatingSystemVersion());
	response.println("[File Separator]: " + env.getFileSeparator());
	response.println("[Path Seprator]: " + env.getPathSeparator());
	response.println("[Line Seprator]: " + env.getLineSeparator());
	response.println("[User Dir]: " + env.getUserDirectory());
	response.println("[User Home]: " + env.getUserHome());
	response.println("[User Name]: " + env.getUserName());

	response.println("[All]: " + env.getAll());

	response.flush();
	response.close();

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_core_env_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/env.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
