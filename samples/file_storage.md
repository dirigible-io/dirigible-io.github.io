---
layout: samples
title: File Storage Sample
icon: fa-file-word-o
group: simple
---

File Storage Sample
===

Create new project and name it *file_storage*.

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

![Mail Service 2](images/mail_service/mail_service_2.png)

Give it some meaningful name (e.g *upload.js*)

Replace the generated code in *upload.js* with the following:

<pre><code>var uploadLib = require("upload");
if(request.getMethod()=="POST"){
    var files = uploadLib.consumeFiles(request);
	var storedFiles = [];
    for(var i = 0 ; i < files.length; i++){
        var file = files[i];
        fileStorage.put(file.name, file.data, file.contentType);
		
		storedFiles.push({"fileName": file.name});
    }
	response.setContentType("text/json");
	response.getWriter().println(JSON.stringify(storedFiles));
}
</code></pre>

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

Give it some meaningful name (e.g *download.js*)

Replace the generated code in *download.js* with the following:

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

Create new file in *WebContent* folder and name it *index.html*

Please inside the following code

<pre><code>< !DOCTYPE html>
< html>
< body>

< form action="/dirigible/js/file_storage/upload.js" method="post" enctype="multipart/form-data">
< label for="file">Filename:</label>
< input type="file" name="file" id="file" multiple>
< br>
< input type="submit" name="submit" value="Submit">
< /form>

< /body>
< /html>

</code></pre>
