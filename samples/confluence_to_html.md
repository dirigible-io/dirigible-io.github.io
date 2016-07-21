---
layout: samples
title: Confluence to HTML
icon: fa-caret-right
group: simple
---

Confluence to HTML
===

Nowadays it is already a default standard approach to write the application-related documentation in some [wiki](http://en.wikipedia.org/wiki/Wiki) markup language. The use of such a simplified language gives the document writer, in this case a developer, the freedom to focus on the dev content instead of formatting.

We choose to support [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) format in scripting services. 

```javascript

	/* globals $ */
	/* eslint-env node, dirigible */
	
	$.getResponse().getWriter().println($.get("wiki").toHtml("h1. Hello World!\n Confluence Rulez!"));
			
	$.getResponse().setContentType("text/html");
	$.getResponse().getWriter().flush();
	$.getResponse().getWriter().close();

```

> wiki.toHtml([some confluence text here]); does the trick
