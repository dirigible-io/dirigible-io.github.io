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
<br></br>
![Mail Service 2](images/mail_service/mail_service_2.png)  
<br></br>
5. Give the service a meaningful name (e.g **config.js**).
6. Replace the generated code in <samp>config.js</samp> with the following:
<br></br>

		var ioLib = require("io");
		var method = $.getRequest().getMethod();
		if (method == "POST") {
		    var input = ioLib.read(request.getReader());
		    var message = JSON.parse(input);
		    if(message.path && message.key && message.value){
		        $.getConfigurationStorage().putProperty(message.path, message.key, message.value);
		    }
		} else if (method == "GET") {
		    var list = $.getXssUtils().escapeSql(request.getParameter("list"));
		    var path = $.getXssUtils().escapeSql(request.getParameter("path"));
		    var key = $.getXssUtils().escapeSql(request.getParameter("key"));   
		    if(list && path){
		        var properties = $.getConfigurationStorage().getProperties(path);
		        if (properties) {
		            properties.list(response.getWriter());
		        } else {
		            $.getResponse().getWriter().println("No configs found on path '" + path +"'");
		        }
		    } else if(path && key){
		        $.getResponse().getWriter().println("" + config.getProperty(path, key));
		    }    
		} else if (method == "DELETE") {
		    $.getConfigurationStorage().clear();
		    $.getResponse().getWriter().println("Config cleared!");
		}
		$.getResponse().getWriter().flush();
		$.getResponse().getWriter().close();


> getProperty(path, key) - get property value by given path

> getProperties(path) - retrieves properties by given path

> putProperty(path, key, value) - add property at given path

> putProperties(path, properties) - add properties at given path

> delete(path) - removes properties by given path

> clear() - removes all properties from the storage

With REST client, send a **POST** request to the service, with the following body:

		{  
		   "path": "properties",
		   "key": "key",
		   "value": "test"
		}

Then access the **config.js** service in the following manner:

> http //[host]:[port]/dirigible/services/js/[project-name]/[scripting-service-name]?path=properties&list=true