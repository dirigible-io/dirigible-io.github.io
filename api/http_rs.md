---
layout: api
title: HTTP RS
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP RESTful services utility.


Version 3.x
---


- Module: **http/v3/rs**
- Alias: **http/rs**
- Definition: [https://github.com/eclipse/dirigible/issues/85](https://github.com/eclipse/dirigible/issues/85)
- Source: [/http/v3/rs.js](https://github.com/dirigiblelabs/api-v3-http/blob/master/http/v3/rs.js)
- Facade: none
- Status: **alpha**


### Basic Usage

```javascript
var rs = require('http/v3/rs');

var helloApiMappings = rs.mappings();
helloApiMappings.resource("")
                  .get()
                    .serve(function(ctx, request, response){
                       response.println("Hello there!");
                     });

rs.service(helloApiMappings).execute();
```


### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**mappings(oConfiguration?)**   | Returns a new API configuration object, optionally initialized with oConfiguration | *RestApi*
**service(oMappings)**   | Creates an HttpController instance with the supplied mappings. The `oMappings` argument can be a RestApi object created with the `rs.mappings()` method or a JS configuration object such as the one created by the RestAPI `configuration()` method | *HttpController*




#### Objects

---

##### RestApi


Property     | Description | Returns
------------ | ----------- | --------
**resource(oConfiguration?)**   | Returns the *resource* configuration object optionally initialized with oConfiguration | *Resource*
**configuration()**   | Returns the configuration for this *RestApi* object | *Object*
**readonly()**   | Disables all but GET requests to this API | *RestAPI*
**disable(sPath, sVerb, arrConsumes, arrProduces)**   | Disables the handling of requests sent to path sPath with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *RestAPI*
**find(sPath, sVerb, arrConsumes, arrProduces)**   | Finds a request handler for requests sent to path sPath with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceVerbHandler*


##### RsResource


Property     | Description | Returns
------------ | ----------- | --------
**get()**   | Returns the *get* method configuration object | *RsVerb*
**post()**   | Returns the *post* method configuration object | *RsVerb*
**put()**   | Returns the *put* method configuration object | *RsVerb*
**delete()**   | Returns the *delete* method configuration object | *RsVerb*
**remove()**   | Same as delete() | *RsVerb*
**method(sHttpVerb, oConfiguration?)**   | Returns the a method configuration object for the sHttpVerb HTTP method name and optionally initialized with oConfiguration object  | *RsVerb*
**configuration()**   | Returns the configuration for this *Resource* object | *Object*
**readonly()**   | Disables all but GET requests to this resource | *RestAPI*
**disable(sVerb, arrConsumes, arrProduces)**   | Disables the handling of requests sent to this resource path with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *RestAPI*
**find(sVerb, arrConsumes, arrProduces)**   | Finds a request handler for requests sent to this resource path with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceVerbHandler*


##### RsVerb


Property     | Description | Returns
------------ | ----------- | --------
**configuration()**   | Returns the configuration for this *ResourceVerbHandler* object | *Object*
**consumes(arrMediaTypeStrings)**   | Assigns a consumes constraint for this verb handler configuration. | *RsVerb*
**produces(arrMediaTypeStrings)**   | Assigns a produces constraint for this verb handler configuration. | *RsVerb*
**before(function)**   | Assign a before callback function for this verb handler configuration | *RsVerb*
**serve(function)**   | Assign a verb handler function for this verb handler configuration | *RsVerb*
**catch(function)**   | Assign a catch on error callback function for this verb handler configuration | *RsVerb*
**finally(function)**   | Assign a finally callback function for this verb handler configuration | *RsVerb*



##### HttpController


Property     | Description | Returns
------------ | ----------- | --------
**execute(oRequest?, oResponse?)**   | processes HTTP requests, to match path, method and constraints to resource mappings and invoke callback handler functions accordingly and generate response.  | *---*


### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---


Version 2.x
---

Not available.
