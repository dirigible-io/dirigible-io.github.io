---
layout: samples
title: File Storage Sample
icon: fa-file-word-o
group: simple
---

File Storage Sample
===

Create new project or use existing one.

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

![Mail Service 2](images/mail_service/mail_service_2.png)

Give it some meaningful name (e.g *file_storage_upload.js*)

Replace the generated code in *file_storage_upload.js* with the following:

<pre><code>var uploadLib = require("upload");
if(request.getMethod()=="POST"){
    var files = uploadLib.consumeFiles(request);
    for(var i = 0 ; i < files.length; i++){
        var file = files[i];
        fileStorage.put(file.name, file.data, file.contentType);
    }
}
</code></pre>

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

Give it some meaningful name (e.g *file_storage_download.js*)

Replace the generated code in *file_storage_download.js* with the following:

<pre><code>if(request.getMethod()=="GET"){
    var fileName = xss.escapeSql(request.getParameter("fileName"));
    var file = fileStorage.get(fileName);

    if(file){
        response.setHeader("content-disposition", "inline");
        response.setHeader("content-disposition", "attachment; filename="+fileName);
        response.setContentType(file.contentType);         
        response.setContentLength(file.data.length);  
        io.write(file.data, response.getOutputStream());
    }else{
        response.getWriter().println("No file with name '" + fileName + "' found");
        response.setContentType("text/html");
    }
}
response.getWriter().flush();
response.getWriter().close();
</code></pre>

> put(path, data, contentType) - add file at given path

> get(path) - retrieves file by given path

> delete(path) - removes file by given path

> clear() - removes all files from the storage
