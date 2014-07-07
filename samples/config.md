---
layout: samples
title: Config Sample
icon: fa-cog
group: simple
---

Config Sample
===

Create new project or use existing one.

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

![Mail Service 2](images/mail_service/mail_service_2.png)

Give it some meaningful name (e.g *config.js*)

Replace the generated code in *file_storage_upload.js* with the following:

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
