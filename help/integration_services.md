---
layout: help
---

Integration Services
===

Overview
---

Integration Services are the connection points between the application logic and the external services - 3-thd party cloud services, 
On-Premise services, public services, etc. There are support for in-bound as well as the out-bound services - consumption and provisioning. 
By utilizing one of the most mature and well known framework as underlying technology - 
[Apache Camel](http://camel.apache.org/), there are lots of ready-to-use integration patterns.

Routes
---

The term *Route* is directly taken from the Apache Camel's context and refers to *definition of routing rules*. The extension of the definition file is "\*.routes"

Sample route descriptor looks like this:

<pre><code><routes xmlns="http://camel.apache.org/schema/spring">
    <route id="simple_routing">
        <from uri="servlet:///simple_routing_endpoint" />
        <choice>
            <when>
                <header>name_parameter</header>
                <transform>
                    <simple>Hello ${header.name_parameter} how are you?</simple>
                </transform>
            </when>
            <otherwise>
                <transform>
                    <constant>Add a name parameter to uri, eg ?name_parameter=foo</constant>
                </transform>
            </otherwise>
        </choice>
    </route>
</routes>
</code></pre>

The original source is [here](http://camel.apache.org/content-based-router.html)

Once you [activate|activation.wiki] or [publish|publishing.wiki] the project the route descriptor is read by the runtime agent and the route is enabled in the container.
The end-point of such an integration service is exposed by the Camel container at the location constructed by the following pattern:

The pattern for the endpoint location of routes:

> *http //[host]:[port]/dirigible/camel/[servlet name - (from uri="servlet:///XXX")]*

e.g.

> *http //[host]:[port]/dirigible/camel/simple_routing_endpoint*

More information about the supported integration patterns can be found at the [samples](../samples/index.wiki) portal.

