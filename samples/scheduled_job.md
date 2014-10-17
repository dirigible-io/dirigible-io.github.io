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
2. Then create a JavaScript service named **service_job.js**.
3. Within the service code, enter the following content:
<br></br>
<pre><code>var systemLib = require('system');
<br></br>
systemLib.println('Scheduled Job Triggered at: '  + new Date());
</code></pre>
4. From the menu, go to *New* -> *Integration Service*.
5. Choose **Scheduling Job Triggering a JavaScript Service**.
6. Enter the following parameters:
<br></br>
> Route Identifier: *route_js*
> Endpoint Address: *http //localhost:9001/dirigible/js/routing/service_job.js*
<br></br>
7. Click *Finish*. The generated routes artifact should looks like:
<pre><code>
< routes xmlns="http://camel.apache.org/schema/spring">
    < route id="route_job">
        < from uri="timer://route_job?period=10000&amp;repeatCount=10&amp;fixedRate=true" />
        < to uri="http://localhost:9001/dirigible/js/routing/service_job.js"/>
    < /route>
< /routes>
</code></pre>
