---
layout: app
title: Enterprise JavaScript
icon: gear
category: apps
tags:
- core
brief: Enterprise JavaScript is a set of API modules that aims at standardization of the usage of the common capabilities in the cloud based business applications  
git: https://github.com/dirigiblelabs/core_api
info: apps/2016/07/12/app_core_api.html
---

{{ page.title }}
---


### Description

Enterprise JavaScript is a set of API modules that aims at
standardization of the usage of http client and server, database access, files
operations, websockets and even threads and streams manipulations for
JavaScript.

For instance:

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
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git={{ page.git }}.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/index.html">API</a>
</div>

<br><br>

### Info

Parameter     | Value 
------------ | ----------- 
Author     | [DirigibleLabs](https://github.com/dirigiblelabs)
Repository | [dirigiblelabs/core_api](https://github.com/dirigiblelabs/core_api)
License    | [Eclipse Public License - v 1.0](https://www.eclipse.org/legal/epl-v10.html)
Version    | 0.2
Download   | [v0.2-beta.zip](https://github.com/dirigiblelabs/core_api/archive/v0.2-beta.zip)


<br><br>