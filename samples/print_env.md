---
layout: samples
title: Print Environment Variables
icon: fa-list
group: simple
---

Print Environment Variables
===

1. Create a new project and name it **env_var**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
<br></br>
![Mail Service 2](images/mail_service/mail_service_2.png)
<br></br>
5. Give it a meaningful name (e.g **printenv.js**).
6. Replace the generated code in **printenv.js** with the following:
<br></br>
<pre><code>response.setContentType("text/html");

var p = java.lang.System.getProperties();
var keys = p.keys();
while (keys.hasMoreElements()) {
  var key = keys.nextElement();
  var value = p.get(key);
  response.getWriter().println(key + ": " + value + "<br>");
}

response.getWriter().flush();
response.getWriter().close();
</code></pre>

