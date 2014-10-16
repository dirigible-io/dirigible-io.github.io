---
layout: samples
title: Storage Sample
icon: fa-camera
group: simple
---

Storage
===

1. Create a new project or use an existing one.
2. Create a new *Scripting Service*
3. Choose **Blank Server-Side JavaScript Service** from the list of available templates.
<br></br>
![Mail Service 2](images/mail_service/mail_service_2.png)
<br></br>
4. Give the service a meaningful name (e.g **storage_usage.js**).
5. Replace the generated code in *storage_usage.js* with the following:
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
6. Select the *Preview* tab.
<br></br>
7. Click on *storage_usage.js* from the *Workspace Explorer* and check the result.

> put(path, data) - add binary data at given path

> get(path) - retrieves binary data by given path

> delete(path) - removes binary data by given path

> clear() - removes all the data from the storage
