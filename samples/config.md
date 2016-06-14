---
layout: samples
title: Configuration Sample
icon: fa-cog
group: simple
---

Configuration
===


1. Create a new project and name it **config_project**
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.

<br>

![Mail Service 2](images/mail_service/mail_service_2.png)  

<br>

5. Give the service a meaningful name (e.g **config.js**).
6. Replace the generated code in <samp>config.js</samp> with the following:


```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	processRequest();
	
	function processRequest() {
		var request = require('net/http/request');
		var response = require('net/http/response');
		var xss = require('utils/xss');
		var config = require('core/config');
		
		var method = request.getMethod();
		
		if (method === "GET") {
		    var list = xss.escapeSql(request.getParameter("list"));
		    var path = xss.escapeSql(request.getParameter("path"));
		    var key = xss.escapeSql(request.getParameter("key"));   
		
			if (list) {
				response.println(readConfiguration(config, path));
			} else {
				response.println(readConfigurationProperty(config, path, key));
			}
		} else if (method === "POST") {
		    var data = JSON.parse(request.readInputText());
			storeConfiguration(config, data)
			response.println("Configuration stored");
		} else if (method === "DELETE") {
		   	config.clear();
		    response.println("Config cleared!");
		}
	
		response.flush();
		response.close();
	}
	
	
	function readConfiguration(config, path) {
		return config.getJson(path);
	}
	
	function readConfigurationProperty(config, path, key) {
		return config.get(path, key);
	}
	function storeConfiguration(config, data) {
		config.set(data.path, data.key, data.value);
	}

```

> get(path, key) - get property value by given path

> getJson(path) - retrieves properties by given path in a JSON format

> set(path, key, value) - add property at given path

> setJson(path, properties) - add properties at given path

> delete(path) - removes properties by given path

> clear() - removes all properties from the storage

With REST client, send a **POST** request to the service, with the following body:

```javascript

	{
	   "path": "properties",
	   "key": "key",
	   "value": "test"
	}

```

Then access the **config.js** service in the following manner:

> http //[host]:[port]/services/js/[project-name]/[scripting-service-name]?path=properties&list=true
