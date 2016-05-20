---
layout: samples
title: Shielding
icon: fa-shield
group: simple
---

Shielding JavaScript Service
===

Often, by security reasons, the original endpoint of a service should not be exposed directly.
To make simple redirect from a public endpoint to an internal end-point of a scripting service, we can use the shielding functionality from the "**Integration Services**" section.

1. Create a project **routing**.
2. Using the menu create *New->Integration Service* and choose *Shielding a JavaScript Service*
Enter the parameters:

> Route Identifier: *shiled*

> Endpoint Address: *endpoint*

Click *Finish*. The generated routes artifact should look like:

```javascript

	{
	   "name":"shiled",
	   "properties":{
	      "myKey1":"myValue1",
	      "myKey2":"myValue2"
	   },
	   "steps":[  
	      {  
	         "type":"javascript",
	         "module":"/routing/endpoint.js",
	         "name":"1",
	         "properties":{
	            "step1Key1":"step1Value1",
	            "step1Key2":"step1Value2"
	         }
	      }
	   ]
	}

```

Under the *IntegrationServices* and *ScriptingServices* folders, *flow_name.flow* and *endpoint.js* files are generated.
Now *Activate* ot *Publish* the project. (See [Activate](../help/activation.html) or [Publish](../help/publishing.html))

<br>

Then, check the result at:

> *http //[host]:[port]/dirigible/services/flow/routing/flow_name.flow*

In general, you can bridge any local service using this approach.

