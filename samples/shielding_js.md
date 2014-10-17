---
layout: samples
title: Shielding
icon: fa-shield
group: simple
---

Shielding JavaScript Service
===

Often, by security reasons, the original endpoint of a service should not be exposed directly.
To make simple redirect from a public endpoint to an internal end-point of a scripting service, we can use the routing functionality from the **Integration Services** section.

1. Create a project **routing**.
2. Then create a JavaScript service named **service_impl.js**.
3. Within the service code, enter the following content:
<pre><code>var systemLib = require('system');
systemLib.println("Hello World!");
response.getWriter().println("Hello World!");
response.getWriter().flush();
response.getWriter().close();
</code></pre>
4. Using the menu create *New->Integration Service* and choose *Proxy REST Service Shielding a JavaScript Service*
Enter the parameters:

> Route Identifier: *route_js*

> Endpoint Address: *route_js_endpoint*

> Original Endpoint: *http //localhost:9001/dirigible/js/routing/service_impl.js*

Click *Finish*. The generated routes artifact should look like:
<pre><code>< routes xmlns="http://camel.apache.org/schema/spring">
    < route id="route_js">
        < from uri="servlet:///route_js_endpoint" />
        < to uri="http://localhost:9001/dirigible/js/routing/service_impl.js?bridgeEndpoint=true"/>
    < /route>
< /routes>
</code></pre>

Now *Activate* ot *Publish* the project. (See [Activate](../help/activation.html) or [Publish](../help/publishing.html))
<br></br>
Then, check the result at:

> *http //[host]:[port]/dirigible/camel/route_js_endpoint*

In general, you can bridge any local service using this approach.

