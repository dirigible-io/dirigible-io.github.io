---
layout: help
title: Integration Services
icon: fa-puzzle-piece
group: help-features
---

Integration Services
===

###Overview###

An _Integration Service_ is the connection point between the application logic and an external service (third party cloud service, 
on-premise service, public service, etc). Both inbound and outbound services are supported, through consumption and provisioning. By utilizing one of the most mature and well known framework as underlying technology - 
[Apache Camel](http://camel.apache.org/), there are lots of ready-to-use integration patterns.

###Routes###

The term *Route* is directly taken from the Apache Camel context and refers to *definition of routing rules*. The extension of the definition file is ***.routes**.

Sample route descriptor looks like this:

<pre><code>< routes xmlns="http://camel.apache.org/schema/spring">
    < route id="simple_routing">
        < from uri="servlet:///simple_routing_endpoint" />
        < choice>
            < when>
                < header>name_parameter</header>
                < transform>
                    < simple>Hello ${header.name_parameter} how are you?</simple>
                < /transform>
            < /when>
            < otherwise>
                < transform>
                    < constant>Add a name parameter to uri, eg ?name_parameter=foo</constant>
                < /transform>
            < /otherwise>
        < /choice>
    < /route>
< /routes>
</code></pre>

You can find the original source [here](http://camel.apache.org/content-based-router.html).

Once you [Activate](activation.wiki) or [Publish](publishing.wiki) the project, the route descriptor is read by the runtime agent, and the route is enabled in the container. 

The endpoint of such an integration service is exposed by the Camel container at the location constructed by the following pattern:

> *http //<host>:<port>/dirigible/camel/<servlet name - (from uri="servlet:///XXX")>*

For example:

> *http //my.dev.host:12345/dirigible/camel/simple_routing_endpoint*

For more information about the supported integration patterns, see [Samples](../samples).

