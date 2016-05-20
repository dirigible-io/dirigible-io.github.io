---
layout: samples
title: Multiple Datasources
icon: fa-database
group: simple
---

Multiple Datasources
===

Prerequisites
====

1. First you have to have pre-configured datasources in the web-xml of your custom Dirigible build e.g.

```xml

	...
	<init-param>
		<param-name>jndiCustomDataSource-MyCustomDB</param-name>
		<param-value>java:comp/env/jdbc/XXX</param-value>
	</init-param>
	...

```
		
2. You have to register them via Preferences -> Data Sources in Dirigible IDE

	Id=MyCustomDB
	Name=My DB
	Type=JNDI
	Location=java:comp/env/jdbc/XXX
		
Steps
====

1. Create a new project and name it **multidb**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.

<br>

![Mail Service 2](images/mail_service/mail_service_2.png)

<br>

5. Give it a meaningful name (e.g **multidb.js**).
6. Replace the generated code in **multidb.js** with the following:

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	$.getResponse().setContentType("text/html; charset=UTF-8");
	$.getResponse().setCharacterEncoding("UTF-8");
	
	var ds = $.getNamedDatasources().get("MyCustomDB");
	
	var conn = ds.getConnection();
	try {
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery("select * from <MY_TABLE>");
		while (rs.next()) {
			$.getResponse().getWriter().println(rs.getString(1) + '<br>');
		}
	} finally {
	   conn.close();
	}
	
	$.getResponse().getWriter().flush();
	$.getResponse().getWriter().close();

```

In this way instead of getting the default datasource with **$.getDatasource()** you can choose one of the many pre-configured datasources that you can have by name **$.getNamedDatasources().get("MyCustomDB")**

