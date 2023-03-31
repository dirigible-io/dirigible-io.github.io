---
title: RS
---

RS
===

HTTP RESTful services framework.

=== "Overview"
- Module: `http/rs`
- Definition: [https://github.com/eclipse/dirigible/issues/85](https://github.com/eclipse/dirigible/issues/85)
- Source: [/http/rs.js](https://github.com/eclipse/dirigible/blob/master/components/api-http/src/main/resources/META-INF/dirigible/http/rs.js)
- Status: `stable`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { rs } from "@dirigible/http";

    rs.service()
        .resource("")
        .get(function (_ctx, _request, response) {
            response.println("Hello there!");
        })
        .execute();
    ```

=== "CommonJS"

    ```javascript
    var rs = require("http/rs");

    rs.service()
        .resource("")
            .get(function(ctx, request, response){
                response.println("Hello there!");
            })
    .execute();
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**service(mappings?)**   | Creates an HttpController instance, optionally initialized with a JS configuration or ResourceMappings object| *HttpController*


### Objects

---



#### HttpController


Property     | Description | Returns
------------ | ----------- | --------
**execute(request?, response?)**   | processes HTTP requests, to match path, method and constraints to resource mappings and invoke callback handler functions accordingly and generate response.  | *---*
**mappings()**   | Returns the mappings configured for this controller instance.  | *ResourceMapppngs*




#### ResourceMappings


Property     | Description | Returns
------------ | ----------- | --------
**resource(configuration?)**   | Returns the *resource* configuration object optionally initialized with oConfiguration | *Resource*
**configuration()**   | Returns the configuration for this *ResourceMappings* object | *Object*
**readonly()**   | Disables all but GET requests to this API | *ResourceMappings*
**disable(sPath, verb, arrConsumes, arrProduces)**   | Disables the handling of requests sent to path path with HTTP method verb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMappings*
**find(path, verb, arrConsumes, arrProduces)**   | Finds a request handler for requests sent to path path with HTTP method verb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMethod*
**execute(request?, response?)**  | Executes the service | *----*


#### Resource


Property     | Description | Returns
------------ | ----------- | --------
**get(serveCallback?)**   | Returns the *get* method configuration object, optionally configured with serveCallback for serving requests | *ResourceMethod*
**post(serveCallback?)**   | Returns the *post* method configuration object, optionally configured with serveCallback for serving requests | *ResourceMethod*
**put(serveCallback?)**   | Returns the *put* method configuration object, optionally configured with serveCallback for serving requests | *ResourceMethod*
**delete(serveCallback?)**   | Returns the *delete* method configuration object, optionally configured with serveCallback for serving requests | *ResourceMethod*
**remove(serveCallback?)**   | Same as delete() | *ResourceMethod*
**method(httpVerb, configuration?)**   | Returns the a method configuration object for the sHttpVerb HTTP method name and optionally initialized with configuration object  | *ResourceMethod*
**configuration()**   | Returns the configuration for this *Resource* object | *Object*
**readonly()**   | Disables all but GET requests to this resource | *ResourceMappings*
**disable(verb, arrConsumes, arrProduces)**   | Disables the handling of requests sent to this resource path with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMappings*
**find(verb, arrConsumes, arrProduces)**   | Finds a request handler for requests sent to this resource path with HTTP method sVerb and with consumes media type arrConsumes and produces media type arrProduces media type constraints | *ResourceMethod*
**execute(request?, response?)**  | Executes the service | *----*

#### ResourceMethod


Property     | Description | Returns
------------ | ----------- | --------
**configuration()**   | Returns the configuration for this *ResourceMethod* object | *Object*
**consumes(arrMediaTypeStrings)**   | Assigns a consumes constraint for this verb handler configuration. | *ResourceMethod*
**produces(arrMediaTypeStrings)**   | Assigns a produces constraint for this verb handler configuration. | *ResourceMethod*
**before(function)**   | Assign a before callback function for this verb handler configuration | *ResourceMethod*
**serve(function)**   | Assign a verb handler function for this verb handler configuration | *ResourceMethod*
**catch(function)**   | Assign a catch on error callback function for this verb handler configuration | *ResourceMethod*
**finally(function)**   | Assign a finally callback function for this verb handler configuration | *ResourceMethod*
**execute(request?, response?)**  | Executes the service | *----*
