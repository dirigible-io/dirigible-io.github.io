---
layout: samples
title: XML to JSON
icon: fa-code
group: simple
---

XML to JSON and vice-versa
===

Create new project or use existing one.

Create new *Scripting Service*

Choose *Blank Server-Side JavaScript Service* from the list of available templates

![Mail Service 2](images/mail_service/mail_service_2.png)

Give it some meaningful name (e.g *xml_usage.js*)

Replace the generated code in *xml_usage.js* with the following:

<pre><code>var jsonObject = {};
jsonObject.root = {};
jsonObject.root.a = 5;
jsonObject.root.b = "test1";

var xmlString = xml.fromJson(JSON.stringify(jsonObject));

response.getWriter().println(xmlString);

response.setContentType("application/xml");
response.getWriter().flush();
response.getWriter().close();
</code></pre>

Select *Preview* tab.
Click on *xml_usage.js* from the *Workspace Explorer* and check the raw result:
<pre><code>
< root >< b >test1< /b >< a >5< /a >< /root >
</code></pre>

> toJson(xmlString) - converts XML content to JSON

> fromJson(jsonString) - converts JSON content to XML
