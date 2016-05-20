---
layout: samples
title: XML to JSON
icon: fa-code
group: simple
---

XML to JSON and vice-versa
===

1. Create a new project or use an existing one.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.

<br>

![Mail Service 2](images/mail_service/mail_service_2.png)

<br>

5. Give it a meaningful name (e.g **xml_usage.js**).
6. Replace the generated code in **xml_usage.js** with the following:

```javascript

	var jsonObject = {};
	jsonObject.root = {};
	jsonObject.root.a = 5;
	jsonObject.root.b = "test1";
	
	var xmlString = $.getXmlUtils().fromJson(JSON.stringify(jsonObject));
	
	$.getResponse().getWriter().println(xmlString);
	
	$.getResponse().setContentType("application/xml");
	$.getResponse().getWriter().flush();
	$.getResponse().getWriter().close();

```

7. Select the *Preview* tab.
8. Click on **xml_usage.js** from the *Workspace Explorer* and check the raw result:

```xml

	<root><b>test1</b><a>5</a></root>

```

> toJson(xmlString) - converts XML content to JSON

> fromJson(jsonString) - converts JSON content to XML
