
h1. Scheduled Job

In the real-world applications there is a need of some tasks to be executed in the background, without user interaction.
For this purpose we use the well accepted term Job and this example shows how to schedule it to be executed periodically.

Create a project *routing* and a JavaScript service *service_job.js* with the following content:

{code}
var systemLib = require('system');

systemLib.println('Scheduled Job Triggered at: '  + new Date());
{code}

Using the menu create *New->Integration Service* and choose *Scheduling Job Triggering a JavaScript Service*
Enter the parameters:

{panel}
Route Identifier: *route_js*
Endpoint Address: *http //localhost:9001/dirigible/js/routing/service_job.js*
{panel}

Click finish. The generated routes artifact should looks like:

{code}
<routes xmlns="http://camel.apache.org/schema/spring">
    <route id="route_job">
        <from uri="timer://route_job?period=10000&amp;repeatCount=10&amp;fixedRate=true" />
        <to uri="http://localhost:9001/dirigible/js/routing/service_job.js"/>
    </route>
</routes>
{code}
