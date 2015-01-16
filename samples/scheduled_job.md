---
layout: samples
title: Scheduled Job
icon: fa-clock-o
group: simple
---

Scheduled Job
===

In real-world applications, there is need of some tasks to be executed in the background without user interaction.
For this purpose, we use the well accepted term Job and this example shows how to schedule it to be executed periodically.

1. Create a project **routing**.
2. From the menu, go to *New* -> *Integration Service*.
3. Choose **Scheduled Job Triggering a JavaScript Service**.
4. Enter the following parameters:
<br></br>

> Route Identifier: *job*

> Endpoint Address: *endpoint*
<br></br>

Now click *Finish*.

Under the *IntegrationServices* and *ScriptingServices* folders, *job_name.job* and *endpoint.js* files are generated.

The generated **job_name.job** artifact should looks like:
<pre><code>{
  "name":"job",
  "description":"job Description",
  "expression":"0/5 * * * * ?",
  "type":"javascript",
  "module":"/routing/endpoint.js"
}
</code></pre>
