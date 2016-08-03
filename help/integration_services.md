---
layout: help
title: Integration Services
icon: none
group: help-features
---

{{ page.title }}
===

Overview
---

The *Integration Service* is the connection point between the application logic and an external service, such as a third party cloud service, on-premise service, public service and so on. Both in-bound and out-bound services are supported through consumption and provisioning.

There are three types of Integration Services provided by Eclipse Dirigible - Flows, Jobs and Listeners.

Flow
---

The *Flow* represents declaratively an ordered list of steps that have to be executed. It supports also a sub-flow as a step definition.

The descriptor of the flow looks like this:

```javascript

	{  
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
```

Once you [Activate](activation.html) or [Publish](publishing.html) the project, the flow descriptor is read by the runtime agent, and the route is enabled in the container. 

The endpoint of such an integration service is exposed and can be consumed by the following pattern:

> *http //[host]:[port]/[dirigible application context]/services/flow/[flow-name]*

For example:

> *http //example.com/dirigible/services/flow/example.flow*

For more information about the supported integration patterns, see [Samples](../samples).


Job
---

In case you want to execute a given service or a flow regularly, you can use the Job definition. The expression used for the scheduler is so called "Cron" syntax.

An example of a Job looks like this:

```javascript

	{
	  "name":"my_job",
	  "description":"my_job Description",
	  "expression":"0/5 * * * * ?",
	  "type":"javascript",
	  "module":"/my_project/my_job.js"
	}
```

Listener
---

The third way of declarative integration is via the callback mechanism supported by Dirigible - *Listener*. There are several built-in adapters supported. If you want to execute an action once a message is received in a given topic in the Messaging Service, you can do the following:

```javascript

	{
		"name":"my_listener",
		"description":"my_listener Description",
		"trigger":"message",
		"type":"javascript",
		"module":"/my_project/message_listener_callback.js",
		"params":{
			"client": "client1",
			"topic": "topic1"
		}
	}

```  

The above listener will trigger the service *my_listener_callback.js*

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var context = require("core/context");
	
	var recievedMessage = context.get("message");
	if(recievedMessage !== null) {
		console.info(JSON.stringify({
			"id": recievedMessage.getId(),
			"topic": recievedMessage.getTopic(),
			"subject": recievedMessage.getSubject(),
			"body": recievedMessage.getBody(),
			"sender": recievedMessage.getSender(),
			"createdBy": recievedMessage.getCreatedBy(),
			"createdAt": recievedMessage.getCreatedAt().getTime()
		}));
	} else {
		console.info("Health Check");
	}
```

To test the above mechanism you can use the following service:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	var messaging = require('service/messaging');
	var response = require('net/http/response');
	
	var clientName = "clinet1";
	var topicName = "topic1";
	
	if (!messaging.isClientExists(clientName)) {
		messaging.registerClient(clientName);
	}
	
	if (!messaging.isTopicExists(topicName)) {
		messaging.registerTopic(topicName);
	}
	
	messaging.send("Message Sender", topicName, "Message Subject", "Message Body");
	
	// print in response
	response.setContentType("text/html; charset=UTF-8");
	response.setCharacterEncoding("UTF-8");
	response.println("Message Trigger Activated");
	response.flush();
	response.close();
```