---
layout: samples
title: XML to JSON
icon: fa-code
group: simple
---

XML to JSON and vice-versa
===

Develop
--
1. Create a new project or use an existing one.
2. Select the **ScriptingServices** sub-folder of the project and open the pop-up menu.
3. Choose **New** -> **Scripting Service**.
4. From the list of available templates choose **Server-Side JavaScript Service**.

	![Mail Service 2](images/mail_service/mail_service_2.png)

5. Give it a meaningful name (e.g **xml_usage.js**).
6. Replace the generated code in **xml_usage.js** with the following one:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var xml = require('api/utils/xml');
var response = require('api/http/response');

var jsonInput = {
	'firstName': 'John',
	'lastName': 'Doe',
	'bio': {
		'age': 24,
		'sex': 'male'
	}
};

var xmlInput = 
	"<firstName>John</firstName>" +
	"<lastName>Doe</lastName>" + 
	"<bio>" + 
	"<age>24</age>" +
	"<sex>male</sex>" +
	"</bio>";

response.println(xml.fromJson(jsonInput));
response.println(xml.toJson(xmlInput));

response.flush();
response.close();
```

7. Select the **Preview** tab.
8. Click on **xml_usage.js** from the *Workspace Explorer* and check the raw result:

```xml
<firstName>John</firstName><lastName>Doe</lastName><bio><sex>male</sex><age>24</age></bio>
{"firstName":"John","lastName":"Doe","bio":{"sex":"male","age":24}}
```

> toJson(xmlString) - converts XML content to JSON

> fromJson(jsonString) - converts JSON content to XML

Discover
--
To discover all available services, you can go to the [Registry](../help/registry.html).

1. From the main menu, choose **Window** -> **Show Perspective** -> **Registry**.
2. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose **Discover** -> **JavaScript** to open the currently available server-side JavaScript service endpoints.
3. You can see the list of available endpoints, where you can find yours by naming convention: **{project}/{service path}**
