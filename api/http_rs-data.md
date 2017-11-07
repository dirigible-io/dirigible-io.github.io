---
layout: api
title: HTTP RS Data
icon: fa-ellipsis-h
---

{{ page.title }}
===

HTTP RESTful Data Services framework.


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
var rsdata = require('http/v3/rs-data'); 

rsdata
	.service()
	.dao({
	  "table": "COMMENT",
	  "properties": [{
		  "name": "id",
		  "column": "ID",
		  "type": "Long",
		  "id": true
		}, {
		  "name": "topicId",
		  "column": "TOPIC_ID",
		  "type": "Long",
		  "required": true
		},{
		  "name": "text",
		  "column": "TEXT",
		  "type": "String",
		  "size": 255,
		  "required": false
	   }]
	})
	.execute();
```


### Definition


#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**service(oConfiguration?, oProtocolHandlersAdapter?, oDataProtocolDefinition?)**   | Creates a new Data Service instance ready to be further configured and executed | *DataService*



#### Objects

---

##### DataService


Property     | Description | Returns
------------ | ----------- | --------
**mappings()**   | Returns the mapping REST mappings for this data service. The protocol mappings are already setup and the returned object can be used to configure additional mappings or override protocol standard ones. The returned object is of type RestAPI (see (http-rs)[http://www.dirigible.io/api/http_rs.html] for details) | *RestAPI*
**execute(oResquest?, oResponse?)**   | Creates an http controller instance for the mappings in htis data service instance and executes it, with the provided request/response arguments if any | *---*


### Compatibility


Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ✅


---

---


Version 2.x
---

Not available.
