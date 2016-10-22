---
layout: samples
title: SOAP Server
icon: fa-caret-right
group: simple
---

SOAP Server
===

Develop
--

1. Create a new project and name it **soap_server_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **soap_server_basic.js**).
6. Replace the generated code in **soap_server_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var soap = require("net/soap");
	var request = require('net/http/request');
	var response = require('net/http/response');

	// Parse SOAP request
	var message = soap.parseRequest();

	// More fine grained
	//var input = request.getInput();
	//var mimeHeaders = soap.createMimeHeaders();
	//var message = soap.parseMessage(mimeHeaders, input);

	var requestPart = message.getPart();
	var requestEnvelope = requestPart.getEnvelope();
	var requestBody = requestEnvelope.getBody();
	var childElements = requestBody.getChildElements();
	printElements(childElements);

	response.println(message.getText());

	response.flush();
	response.close();

	function printElements(childElements) {
		childElements.forEach(function(element) {
			if (element.isSOAPElement()) {
				var name = element.getElementName();
				console.log(name.getLocalName() + ": " + element.getValue());
				printElements(element.getChildElements());
			}
		});
	}

```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/web/registry/anonymous.html?git=https://github.com/dirigiblelabs/sample_net_soap_soap_server_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/soap.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
