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
<pre><code>var ioLib = require("io");
var method = request.getMethod();
if (method == "POST") {
    var input = ioLib.read(request.getReader());
    var message = JSON.parse(input);
    if(message.path && message.key && message.value){
        config.putProperty(message.path, message.key, message.value);
    }
} else if (method == "GET") {
    var list = xss.escapeSql(request.getParameter("list"));
    var path = xss.escapeSql(request.getParameter("path"));
    var key = xss.escapeSql(request.getParameter("key"));   
    if(list && path){
        var properties = config.getProperties(path);
        if (properties) {
            properties.list(response.getWriter());
        } else {
            response.getWriter().println("No configs found on path '" + path +"'");
        }
    } else if(path && key){
        response.getWriter().println("" + config.getProperty(path, key));
    }    
} else if (method == "DELETE") {
    config.clear();
    response.getWriter().println("Config cleared!");
}
response.getWriter().flush();
response.getWriter().close();
</code></pre>

> getProperty(path, key) - get property value by given path

> getProperties(path) - retrieves properties by given path

> putProperty(path, key, value) - add property at given path

> putProperties(path, properties) - add properties at given path

> delete(path) - removes properties by given path

> clear() - removes all properties from the storage

With REST client, send a **POST** request to the service, with the following body:
<pre><code>{  
   "path": "properties",
   "key": "key",
   "value": "test"
}
</code></pre>

Then access the **config.js** service in the following manner:
**http //<host>:<port>/dirigible/services/js/<project-name>/<scripting-service-name>?path=properties&list=true**