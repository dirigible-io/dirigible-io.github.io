---
title: RS-Data
---

RS-Data
===

HTTP RESTful Data Services framework.

=== "Overview"
- Module: `http/v4/rs-data`
- Alias: `http/rs-data`
- Definition: [https://github.com/eclipse/dirigible/issues/85](https://github.com/eclipse/dirigible/issues/85)
- Source: [/http/v4/rs-data.js](https://github.com/dirigiblelabs/api-http/blob/master/http/v4/rs-data.js)
- Facade: none
- Status: `stable`


### Basic Usage

```javascript
var rsdata = require("http/v4/rs-data"); 

rsdata
    .service()
        .dao({
            table: "CUSTOMERS",
            properties: [{
                name: "id",
                column: "ID",
                type: "BIGINT",
                id: true
            }, {
                name: "orgName",
                column: "ORG_NAME",
                type: "VARCHAR",
                size: 255,
                required: true
            }, {
                name: "orgDescription",
                column: "ORG_DESCR",
                type: "VARCHAR",
                size: 255,
                required: false
            }]
        })
.execute();
```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**service(oConfiguration?, oProtocolHandlersAdapter?, oDataProtocolDefinition?, sLoggerName?)**   | Creates a new Data Service instance ready to be further configured and executed. Optionally, the instance could be supplied with: configuration (oConfiguration) that will be merged after protocol mappings are initiallized; oProtocolHandlersAdapter object for data-to-protocol mapping; oDataProtocolDefinition object for  protocol mappings definition; sLoggerName string to provide logger name for an instance. | *DataService*



### Objects

---

##### DataService


Property     | Description | Returns
------------ | ----------- | --------
**mappings()**   | Returns the mapping REST mappings for this data service. The protocol mappings are already setup and the returned object can be used to configure additional mappings or override protocol standard ones. The returned object is of type RestAPI (see [http/rs](http://www.dirigible.io/api/http_rs.html) for details) | *RestAPI*
**dao(ormConfig?)**   | This is an optional method provided by the default protocol handler adapter in this data service instance. Note that a data service instance can be initialized with various adapters. An adapter can contribute methods to the DataService API that are specific to their configuration needs. The defualt adapter is based on the dao framework (see [db/dao](http://www.dirigible.io/api/db_dao.html) for details) and exposes this mehtod as a getter/setter for the dao ORM configuraiton that will be used to setup dao backend used by this data service verb handlers. If no argument is provided the method acts like getter and returns the ORM configuration if any. If an ORM config object is supplied as argument, it will use it to create the backing dao for this data service instance and return the data service instance for method chaining. | *DataService or Object*
**logger**   | the logger instance used by this data service. Defaults to logger with name 'http.rs.data.service' and can be provided with an argument provided to the module service method.| *---*
**execute(oResquest?, oResponse?)**   | Creates an http controller instance for the mappings in htis data service instance and executes it, with the provided request/response arguments if any | *---*
