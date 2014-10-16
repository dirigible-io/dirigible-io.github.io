---
layout: samples
title: Config Sample
icon: fa-cog
group: simple
---

Config
===


1. Create a new project or use an existing one.
2. Create a new *Scripting Service* . 
3. Choose **Blank Server-Side JavaScript Service** from the list of available templates.
<br></br>
![Mail Service 2](images/mail_service/mail_service_2.png)  
<br></br>
4. Give the service a meaningful name (e.g **config.js**).
5. Replace the generated code in <samp>file\_storage\_upload.js</samp> with the following:
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


