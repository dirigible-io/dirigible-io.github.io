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
on-premise service, public service, etc). Both inbound and outbound services are supported, through consumption and provisioning.

###Flow###

The term *Flow* is used for simplicity to separate this kind of integration services.

The descriptor of the flow looks like this:

<pre><code>{  
   "name":"id",
   "properties":{
      "myKey2":"myValue2",
      "myKey1":"myValue1"
   },
   "steps":[  
      {  
         "type":"condition",
         "name":"1",
         "cases":[  
            {  
               "key":"name",
               "value":"Joe",
               "flow":{
                  "name":"WelcomeJoe",
                  "steps":[  
                     {  
                     	"name":"4",
                        "type":"output",
                        "message":"Welcome Joe"
                     }
                  ]
               }
            },
            {  
               "key":"name",
               "value":"null",
               "flow":{  
			      "name":"NoName",
                  "steps":[  
                     {  
                     	"name":"5",
                        "type":"output",
                        "message":"Add to the request URL '?name=Joe'"
                     }
                  ]
               }
            }
         ]
      }
   ]
}
</code></pre>

Once you [Activate](activation.wiki) or [Publish](publishing.wiki) the project, the flow descriptor is read by the runtime agent, and the route is enabled in the container. 

The endpoint of such an integration service is exposed and can be consumed by the following pattern:

> *http //[host]:[port]/[dirigible application context]/services/flow/[flow-name]*

For example:

> *http //example.com/dirigible/services/flow/example.flow*

For more information about the supported integration patterns, see [Samples](../samples).

