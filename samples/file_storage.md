---
layout: samples
title: File Storage Sample
icon: fa-file-word-o
group: simple
---

File Storage
===

1. Create a new project and name it **file_storage**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
<br></br>
![Mail Service 2](images/mail_service/mail_service_2.png)
<br></br>
5. Give it a meaningful name (e.g **upload.js**).
6. Replace the generated code in **upload.js** with the following:
<br></br>
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
7. Repeat steps **2**, **3** and **4**. Enter a name for the new service, for example, **download.js**.
8. Replace the generated code in **download.js** with the following:
<br></br>
<pre><code>if(request.getMethod()=="GET"){
    var fileName = xss.escapeSql(request.getParameter("fileName"));
    if(fileName) {
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
        
    } else {
        response.getWriter().println("Please add 'fileName' query parameter.")
    }
}
response.getWriter().flush();
response.getWriter().close()
</code></pre>

> put(path, data, contentType) - add file at given path

> get(path) - retrieves file by given path

> delete(path) - removes file by given path

> clear() - removes all files from the storage

Now, create a new file in the **WebContent** folder and name it **index.html**.

Then, enter the following code inside in the file:

<pre><code>< !DOCTYPE html>
< html>
< body>

< form action="/dirigible/services/js/file_storage/upload.js" method="post" enctype="multipart/form-data">
< label for="file">Filename:< /label>
< input type="file" name="file" id="file" multiple>
< br>
< input type="submit" name="submit" value="Submit">
< /form>

< /body>
< /html>
</code></pre>


