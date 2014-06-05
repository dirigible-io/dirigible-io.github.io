---
layout: help
title: Samples - Shielding
icon: fa-gift
---

Shielding JavaScript Service
===

Often by security reasons the original end-point of a service should not be exposed directly.
To make a simple redirect from public end-point to an internal end-point of a scripting service we can use the routing functionality in Integration Services section.

Create a project *routing* and a JavaScript service *service_impl.js* with the following content:

<pre><code>var systemLib = require('system');

systemLib.println("Hello World!");

response.getWriter().println("Hello World!");
response.getWriter().flush();
response.getWriter().close();
</code></pre>

Using the menu create *New->Integration Service* and choose *Proxy REST Service Shielding a JavaScript Service*
Enter the parameters:

> Route Identifier: *route_js*
> Endpoint Address: *route_js_endpoint*
> Original Endpoint: *http //localhost:9001/dirigible/js/routing/service_impl.js*


Click finish. The generated routes artifact should looks like:

<pre><code>< routes xmlns="http://camel.apache.org/schema/spring">
    < route id="route_js">
        < from uri="servlet:///route_js_endpoint" />
        < to uri="http://localhost:9001/dirigible/js/routing/service_impl.js?bridgeEndpoint=true"/>
    < /route>
< /routes>
</code></pre>

[Activate](../help/activation.html) or [publish](../help/publishing.html) the project and check the result at:

> *http //[host]:[port]/dirigible/camel/route_js_endpoint*

In general you can bridge any local service using this approach

