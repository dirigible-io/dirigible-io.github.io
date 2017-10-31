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

var helloApi = rs.api();
helloApi
  .resource("")
    .get()
      .serve(function(ctx, request, response){
         response.println("Hello there!");
       });

helloApi.service().execute();
```


### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**api()**   | Returns the API configuration object | *RsApi*




#### Objects

---

##### RsApi


Property     | Description | Type
------------ | ----------- | --------
**resource()**   | Returns the *resource* configuration object | *RsResource*


##### RsResource


Property     | Description | Type
------------ | ----------- | --------
**get()**   | Returns the *get* method configuration object | *RsVerb*


##### RsVerb


Property     | Description | Type
------------ | ----------- | --------
**serve(function)**   | Assign a handler function for this verb | -


### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---


Version 2.x
---

Not available.
