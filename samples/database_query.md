---
layout: samples
title: Database Query
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

Version 3.x
---

### Develop


1. Create a new project and name it **database_query**.
2. Choose *New* -> *Scripting Service*.
3. Choose **Server-Side JavaScript Service** from the list of available templates.
4. Give it a meaningful name (e.g **database_query.js**).
5. Replace the generated code in **database_query.js** with the following:

```javascript

	var query = require('db/v3/query');
	var response = require('http/v3/response');
	
	var sql = "SELECT * FROM MY_TABLE WHERE MY_COLUMN = ?";
	var resultset = query.execute(sql, [1]);
	
	response.println(JSON.stringify(resultset));
	
	response.flush();
	response.close();
	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_db_database_query.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/database_query.html">API</a>
</div>

