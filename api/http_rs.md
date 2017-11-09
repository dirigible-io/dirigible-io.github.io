---
layout: api
title: HTTP RS
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP RESTful services framework.


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

rs.service()
    .resource("")
      .get(function(ctx, request, response){
         response.println("Hello there!");
      })
  .execute();
```


### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**service(oMappings?)**   | Creates an HttpController instance, optionally initialized with a JS configuration or ResourceMappings object| *HttpController*




#### Objects

---



##### HttpController


Property     | Description | Returns
------------ | ----------- | --------
**execute(oRequest?, oResponse?)**   | processes HTTP requests, to match path, method and constraints to resource mappings and invoke callback handler functions accordingly and generate response.  | *---*
**mappings()**   | Returns the mappings configured for this controller instance.  | *ResourceMapppngs*




##### ResourceMappings


Property     | Description | Returns
------------ | ----------- | --------
**resource(oConfiguration?)**   | Returns the *resource* configuration object optionally initialized with oConfiguration | *Resource*
**configuration()**   | Returns the configuration for this *ResourceMappings* object | *Object*
**readonly()**   | Disables all but GET requests to this API | *ResourceMappings*
**disable(sPath, sVerb, arrConsumes, arrProduces)**   | Disables the handling of requests sent to path sPath with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMappings*
**find(sPath, sVerb, arrConsumes, arrProduces)**   | Finds a request handler for requests sent to path sPath with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMethod*
**execute(oRequest?, oResponse?)**  | Executes the service | *----*


##### Resource


Property     | Description | Returns
------------ | ----------- | --------
**get(fServeCallback?)**   | Returns the *get* method configuration object, optionally configured with fServeCallback for serving requests | *ResourceMethod*
**post(fServeCallback?)**   | Returns the *post* method configuration object, optionally configured with fServeCallback for serving requests | *ResourceMethod*
**put(fServeCallback?)**   | Returns the *put* method configuration object, optionally configured with fServeCallback for serving requests | *ResourceMethod*
**delete(fServeCallback?)**   | Returns the *delete* method configuration object, optionally configured with fServeCallback for serving requests | *ResourceMethod*
**remove(fServeCallback?)**   | Same as delete() | *ResourceMethod*
**method(sHttpVerb, oConfiguration?)**   | Returns the a method configuration object for the sHttpVerb HTTP method name and optionally initialized with oConfiguration object  | *ResourceMethod*
**configuration()**   | Returns the configuration for this *Resource* object | *Object*
**readonly()**   | Disables all but GET requests to this resource | *ResourceMappings*
**disable(sVerb, arrConsumes, arrProduces)**   | Disables the handling of requests sent to this resource path with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMappings*
**find(sVerb, arrConsumes, arrProduces)**   | Finds a request handler for requests sent to this resource path with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMethod*
**execute(oRequest?, oResponse?)**  | Executes the service | *----*

##### ResourceMethod


Property     | Description | Returns
------------ | ----------- | --------
**configuration()**   | Returns the configuration for this *ResourceMethod* object | *Object*
**consumes(arrMediaTypeStrings)**   | Assigns a consumes constraint for this verb handler configuration. | *ResourceMethod*
**produces(arrMediaTypeStrings)**   | Assigns a produces constraint for this verb handler configuration. | *ResourceMethod*
**before(function)**   | Assign a before callback function for this verb handler configuration | *ResourceMethod*
**serve(function)**   | Assign a verb handler function for this verb handler configuration | *ResourceMethod*
**catch(function)**   | Assign a catch on error callback function for this verb handler configuration | *ResourceMethod*
**finally(function)**   | Assign a finally callback function for this verb handler configuration | *ResourceMethod*
**execute(oRequest?, oResponse?)**  | Executes the service | *----*



### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---


Version 2.x
---

Not available.
