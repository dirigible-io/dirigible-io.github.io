
---
layout: samples
title: Confluence to HTML
icon: fa-picture-o
group: simple
---

Confluence to HTML
===

Nowadays is already de-facto standard approach to write the application related documentation in some [Wiki](http://en.wikipedia.org/wiki/Wiki) markup language.
Using such a simplified language gives to the document writer, in this case usually a developer, the freedom to focus on the content instead of formatting.
We choose to support [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) format in scripting services. 

<pre><code>
response.getWriter().println(wiki.toHtml("h1. Hello World!\n Confluence Rulez!"));

response.setContentType("text/html");
response.getWriter().flush();
response.getWriter().close();
</code></pre>

> wiki.toHtml([some confluence text here]); does the trick
