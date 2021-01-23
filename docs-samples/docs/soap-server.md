---
title: SOAP - Server
hide:
  - toc
---

SOAP - Server
===

### Steps

1. Create a project `soap-project`.
2. Create a JavaScript service with the name `soap-server.js`.
3. Enter the following content:

```javascript

var soap = require("net/v4/soap");
var request = require('http/v4/request');
var response = require('http/v4/response');
var xml = require("utils/v4/xml");

// Parse SOAP request
var message = soap.parseRequest();

var requestPart = message.getPart();
var requestEnvelope = requestPart.getEnvelope();
var requestBody = requestEnvelope.getBody();
var childElements = requestBody.getChildElements();
printElements(childElements);

response.setContentType("text/xml; charset=utf-8");

var json = {
   "soap:Envelope":{
      "-xmlns:soap":"http://schemas.xmlsoap.org/soap/envelope/",
      "-xmlns:xsd":"http://www.w3.org/2001/XMLSchema",
      "-xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
      "soap:Body":{
         "ResolveIPResponse":{
            "-xmlns":"http://ws.cdyne.com/",
            "ResolveIPResult":{
               "Country":"Germany",
               "Organization":{
               },
               "Latitude":"51.2993",
               "Longitude":"9.490997",
               "AreaCode":"0",
               "TimeZone":{
               },
               "HasDaylightSavings":"false",
               "Certainty":"90",
               "RegionName":{
               },
               "CountryCode":"DE"
            }
         }
      }
   }
};

var payload = xml.fromJson(JSON.stringify(json))

response.println(payload);

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

---

> For more information, see the *[API](../api/)* documentation.
