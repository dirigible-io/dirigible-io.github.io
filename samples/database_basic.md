---
layout: samples
title: Database
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

Version 2.x
---

### Develop


1. Create a new project and name it **database_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **database_basic.js**).
6. Replace the generated code in **database_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var database = require('db/database');
	var response = require('net/http/response');

	var datasource = database.getDatasource(); // default
	//var datasource = db.getNamedDatasource("name-of-the-datasource");

	var connection = datasource.getConnection();
	try {
		var statement = connection.prepareStatement("select * from DGB_FILES where FILE_PATH like ?");
		var i = 0;
		statement.setString(++i, "%");
		var resultSet = statement.executeQuery();
		while (resultSet.next()) {
			response.println("[path]: " + resultSet.getString("FILE_PATH"));
		}
		resultSet.close();
		statement.close();
	} catch(e) {
		console.trace(e);
		response.println(e.message);
	} finally {
		connection.close();
	}

	response.flush();
	response.close();

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_db_database_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/database.html">API</a>
</div>

### Discover

To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
