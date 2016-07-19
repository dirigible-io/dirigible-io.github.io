---
layout: samples
title: SOAP Client
icon: none
group: simple
---

SOAP Client
===

Develop
--

1. Create a new project and name it **soap_client_basic**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
5. Give it a meaningful name (e.g **soap_client_basic.js**).
6. Replace the generated code in **soap_client_basic.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */

	var soap = require("net/soap");
	var response = require('net/http/response');

	response.setContentType("text/plain; charset=UTF-8");

	var requestMessage = soap.createMessage();
	var part = requestMessage.getPart();
	var envelope = part.getEnvelope();
	envelope.addNamespaceDeclaration("ws", "http://ws.cdyne.com/");
	var body = envelope.getBody();
	var resolveIPElement = body.addChildElement("ResolveIP", "ws");
	var ipAddressElement = resolveIPElement.addChildElement("ipAddress", "ws");
	ipAddressElement.addTextNode("213.239.203.158");
	var licenseKeyElement = resolveIPElement.addChildElement("licenseKey", "ws");
	licenseKeyElement.addTextNode("");

	var mimeHeaders = requestMessage.getMimeHeaders();
	mimeHeaders.addHeader("SOAPAction", "http://ws.cdyne.com/ResolveIP");

	requestMessage.save();
	response.println("Request: " + requestMessage.getText());

	var responseMessage = soap.call(requestMessage, "http://ws.cdyne.com/ip2geo/ip2geo.asmx");

	response.println("Response: " + responseMessage.getText());

	response.println("------");

	var responsePart = responseMessage.getPart();
	var responseEnvelope = responsePart.getEnvelope();
	var responseBody = responseEnvelope.getBody();
	var childElements = responseBody.getChildElements();
	printElements(childElements);

	response.flush();
	response.close();

	function printElements(childElements) {
		childElements.forEach(function(element) {
			if (element.isSOAPElement()) {
				var name = element.getElementName();
				response.print(name.getLocalName());
				response.print(": ");
				response.println(element.getValue());
				printElements(element.getChildElements());
			}
		});
	}

	
```

<div class="btn-toolbar pull-right">
	<a class="btn btn-warning" href="http://dirigible.eclipse.org/services/ui/anonymous.html?git=https://github.com/dirigiblelabs/sample_net_soap_soap_client_basic.git">Run</a>
	<a class="btn btn-info" href="http://www.dirigible.io/api/soap.html">API</a>
</div>

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
