---
layout: api
title: SOAP
icon: fa-check
---

{{ page.title }}
===

SOAP utility exposes web services frameowrk for manipulating SOAP messages, making calls to external end-points and creating simple web services

Version 4.x
---

- Module: **net/v4/soap**
- Alias: **net/soap**
- Definition: [https://github.com/eclipse/dirigible/issues/390](https://github.com/eclipse/dirigible/issues/390)
- Source: [/net/v4/soap.js](https://github.com/dirigiblelabs/api-net/blob/master/net/v4/soap.js)
- Facade: none
- Status: **stable**

Basic Usage
---

```javascript
var soap = require("net/v4/soap");
var response = require('http/v4/response');

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

response.flush();
response.close();
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createMessage()**   | Creates an empty SOAP Message | *Message*
**parseMessage(mimeHeaders, inputStream)**    | Creates a message by a given MIME Headers and by parsing of the provided input stream | *Message*
**parseRequest()**  | Creates a message by parsing the standard Request input and empty headers | *Message*
**createMimeHeaders()**  | Creates an empty MimeHeaders | *MimeHeaders*
**call(request, url)**  | Calls an end-point of a SOAP Web Service with a request Message and returns the response Message | *Message*


### Objects

---

#### Message


Function     | Description | Returns
------------ | ----------- | --------
**getMimeHeaders()**   | Returns the MimeHeaders object of this Message | *MimeHeaders*
**getPart()**   | Returns the Part object of this Message | *Part*
**save()**   | Save the changes made on the Message and its components | -
**getText()**  | Returns a text representation of the Message | *string*


#### MimeHeaders

Function     | Description | Returns
------------ | ----------- | --------
**addHeader(name, value)**   | Creates and add a new MIME header | *-*


#### Part

Function     | Description | Returns
------------ | ----------- | --------
**getEnvelope()**   | Returns the Envelope object of this Part | *Envelope*


#### Envelope

Function     | Description | Returns
------------ | ----------- | --------
**getBody()**   | Returns the Body object of this Envelope | *Body*
**getHeader()**   | Returns the Header object of this Envelope | *Header*
**addNamespaceDeclaration(prefix, uri)**   | Creates and add a namespace attribute | -
**createName(localName, prefix, uri)**   | Creates a Name object to be used further | *Name*


#### Body

Function     | Description | Returns
------------ | ----------- | --------
**getChildElements()**   | Returns an array of the child Elements | *[Element]*
**addChildElement(localName, prefix)**   | Creates and add a child Element | *Element*


#### Header

Function     | Description | Returns
------------ | ----------- | --------
**addHeaderElement(name)**   | Creates and add a Header Element with a Name | *Element*


#### Name

Function     | Description | Returns
------------ | ----------- | --------
**getLocalName()**   | Returns the Local Name of the Name object | *string*
**getPrefix()**   | Returns the Prefix of the Name object | *string*
**getQualifiedName()**   | Returns the Qualified Name of the Name object | *string*
**getURI()**   | Returns the URI of the Name object | *string*


#### Element

Function     | Description | Returns
------------ | ----------- | --------
**getChildElements()**   | Returns an array of the child Elements | *[Element]*
**getElementName()**   | Returns the name of the Element | *Name*
**getValue()**   | Returns the value of the Element if any | *string*
**addChildElement(localName, prefix)**   | Creates and add a child Element | *Element*
**addTextNode(text)**   | Creates and add a text node | *Element*
**addAttribute(name, value)**   | Creates and add an attribute | *Element*
**isSOAPElement()**   | Returns true if the Element is SOAP Element and false otherwise (e.g. CDATA, PDATA, etc.) | *string*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

Version 3.x
---

Not officially supported.

---


Version 2.x
---

- Module: **net/soap**
- Definition: [/core_api/issues/37](https://github.com/dirigiblelabs/core_api/issues/37)
- Source: [/net/soap.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/net/soap.js)
- Status: **beta**

Basic Usage
---

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

response.flush();
response.close();
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createMessage()**   | Creates an empty SOAP Message | *Message*
**parseMessage(mimeHeaders, inputStream)**    | Creates a message by a given MIME Headers and by parsing of the provided input stream | *Message*
**parseRequest()**  | Creates a message by parsing the standard Request input and empty headers | *Message*
**createMimeHeaders()**  | Creates an empty MimeHeaders | *MimeHeaders*
**call(request, url)**  | Calls an end-point of a SOAP Web Service with a request Message and returns the response Message | *Message*


### Objects

---

#### Message


Function     | Description | Returns
------------ | ----------- | --------
**getMimeHeaders()**   | Returns the MimeHeaders object of this Message | *MimeHeaders*
**getPart()**   | Returns the Part object of this Message | *Part*
**save()**   | Save the changes made on the Message and its components | -
**getText()**  | Returns a text representation of the Message | *string*


#### MimeHeaders

Function     | Description | Returns
------------ | ----------- | --------
**addHeader(name, value)**   | Creates and add a new MIME header | *-*


#### Part

Function     | Description | Returns
------------ | ----------- | --------
**getEnvelope()**   | Returns the Envelope object of this Part | *Envelope*


#### Envelope

Function     | Description | Returns
------------ | ----------- | --------
**getBody()**   | Returns the Body object of this Envelope | *Body*
**getHeader()**   | Returns the Header object of this Envelope | *Header*
**addNamespaceDeclaration(prefix, uri)**   | Creates and add a namespace attribute | -
**createName(localName, prefix, uri)**   | Creates a Name object to be used further | *Name*


#### Body

Function     | Description | Returns
------------ | ----------- | --------
**getChildElements()**   | Returns an array of the child Elements | *[Element]*
**addChildElement(localName, prefix)**   | Creates and add a child Element | *Element*


#### Header

Function     | Description | Returns
------------ | ----------- | --------
**addHeaderElement(name)**   | Creates and add a Header Element with a Name | *Element*


#### Name

Function     | Description | Returns
------------ | ----------- | --------
**getLocalName()**   | Returns the Local Name of the Name object | *string*
**getPrefix()**   | Returns the Prefix of the Name object | *string*
**getQualifiedName()**   | Returns the Qualified Name of the Name object | *string*
**getURI()**   | Returns the URI of the Name object | *string*


#### Element

Function     | Description | Returns
------------ | ----------- | --------
**getChildElements()**   | Returns an array of the child Elements | *[Element]*
**getElementName()**   | Returns the name of the Element | *Name*
**getValue()**   | Returns the value of the Element if any | *string*
**addChildElement(localName, prefix)**   | Creates and add a child Element | *Element*
**addTextNode(text)**   | Creates and add a text node | *Element*
**addAttribute(name, value)**   | Creates and add an attribute | *Element*
**isSOAPElement()**   | Returns true if the Element is SOAP Element and false otherwise (e.g. CDATA, PDATA, etc.) | *string*




Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌

