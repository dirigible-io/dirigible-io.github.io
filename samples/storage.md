---
layout: samples
title: Storage Sample
icon: fa-camera
group: simple
---

Storage Sample
===

Create new project or use existing one.

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

![Mail Service 2](images/mail_service/mail_service_2.png)

Give it some meaningful name (e.g *storage_usage.js*)

Replace the generated code in *storage_usage.js* with the following:

<pre><code>function toString(bytes) {
    var s = "";
    for(var i=0, l=bytes.length; i < l; i++) {
        s += String.fromCharCode(bytes[i]);
    }
    return s;
}

var byteArray = [49,50,51]; // string "123"
storage.put("/a/b/c", byteArray);
var retrievedData = storage.get("/a/b/c");
var result = toString(retrievedData);

response.getWriter().println(result);

response.setContentType("text/html");
response.getWriter().flush();
response.getWriter().close();
</code></pre>

Select *Preview* tab.
Click on *storage_usage.js* from the *Workspace Explorer* and check the result.

> put(path, data) - add binary data at given path

> get(path) - retrieves binary data by given path

> delete(path) - removes binary data by given path

> clear() - removes all the data from the storage
