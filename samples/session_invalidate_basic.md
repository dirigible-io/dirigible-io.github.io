---
layout: samples
title: Session Invalidate
icon: none
group: simple
---

Session Invalidate
===

Develop
--

1. Create a new project and name it **session_invalidate_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **session_invalidate_basic.js**).
6. Replace the generated code in **session_invalidate_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var session = require('net/http/session');
	var response = require('net/http/response');

	session.setAttribute("attr1", "Value1");
	session.setAttribute("attr2", "Value2");

	session.invalidate();

	var names = session.getAttributeNames();

	response.println("[Attribute Names]: " + JSON.stringify(names));
	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_net_http_session_invalidate_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/http_session.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
