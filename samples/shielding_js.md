
h1. Shielding JavaScript Service

Often by security reasons the original endpoint of a service should not be exposed directly. To make a simple redirect from public endpoint to an internal endpoint of a scripting service we can use the routing functionality in Integration Services section.

Create a project *routing* and a JavaScript service *service_impl.js* with the following content:

{code}
var systemLib = require('system');

systemLib.println("Hello World!");

response.getWriter().println("Hello World!");
response.getWriter().flush();
response.getWriter().close();
{code}

Using the menu create *New->Integration Service* and choose *Proxy REST Service Shielding a JavaScript Service*
Enter the parameters:

{panel}
Route Identifier: *route_js*
Endpoint Address: *route_js_endpoint*
Original Endpoint: *http //localhost:9001/dirigible/js/routing/service_impl.js*
{panel}

Click finish. The generated routes artifact should looks like:

{code}
<routes xmlns="http://camel.apache.org/schema/spring">
    <route id="route_js">
        <from uri="servlet:///route_js_endpoint" />
        <to uri="http://localhost:9001/dirigible/js/routing/service_impl.js?bridgeEndpoint=true"/>
    </route>
</routes>
{code}

[Activate|../help/activation.wiki] or [publish|../help/publishing.wiki] the project and check the result at:

{panel}
*http //<host>:<port>/dirigible/camel/route_js_endpoint*
{panel}

In general you can bridge any local service using this approach

