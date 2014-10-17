
---
layout: samples
title: Confluence to HTML
icon: fa-picture-o
group: simple
---

Confluence to HTML
===

Nowadays it is already a defult standard approach to write the application-related documentation in some [wiki](http://en.wikipedia.org/wiki/Wiki) markup language. The use of such a simplified language gives the document writer, in this case a developer, the freedom to focus on the dev content instead of formatting.

We choose to support [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) format in scripting services. 

<pre><code>
response.getWriter().println(wiki.toHtml("h1. Hello World!\n Confluence Rulez!"));

response.setContentType("text/html");
response.getWriter().flush();
response.getWriter().close();
</code></pre>

> wiki.toHtml([some confluence text here]); does the trick
