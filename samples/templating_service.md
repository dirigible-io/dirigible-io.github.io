---
layout: samples
title: Templating Service
icon: fa-paint-brush
group: simple
---

Templating Service
===

1. Create a new project and name it **templating**.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.

<br>

![New JavaScript service Wizard](images/new_javascript_service_wizard.png)

<br>

5. Give it a meaningful name (e.g **generator.js**).
6. Replace the generated code in **generator.js** with the following:

<br>

```javascript

	$.getResponse().setContentType("text/html; charset=UTF-8");
	$.getResponse().setCharacterEncoding("UTF-8");
	
	// create a parameter object
	var parameters = $.getTemplatingService().createParameters();
	
	// put a parameter
	parameters.put("caption", "Hello World!");
	
	// define source of the template (can be load from remote location as well)
	var template = "<html><body><h1>${caption}</h1></body></html>";
	
	// tag to be used by the logging as name of the template in case of failure
	var log_tag = "sample";
	
	// generate the output based on the template and parameters
	var generated = $.getTemplatingService().generate(template, parameters, log_tag);
	
	// print the generated output
	$.getResponse().getWriter().println(generated);
	
	$.getResponse().getWriter().flush();
	$.getResponse().getWriter().close();

```
