---
layout: help
title: Wiki Content
icon: none
group: help-features
---

{{ page.title }}
===

Overview
---

The supported markup language as of now is [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup), which is well accepted by the community. The wiki pages have to be placed in the *WikiContent* folder of a project with **\*.wiki** file extension. Once they are requested by a GET request, underground transformation has been triggered. It converts the confluence format to HTML and sends well-formed Web content back.

Example wiki page in confluence format:

<pre><code>
h4. Confluence Markup
 
Ideally, the markup should be _readable_ and even *clearly understandable* when editing it. 
Inserting formatting should require few keystrokes and little thought.
 
After all, we want people to concentrate on words, not on where the angle-brackets should go.
 
Kinds of Markup:
* Text Effects
* Headings
* Text Breaks
* Links
* Other
</code></pre>

#After the rendering, you will get:

----

Confluence Markup
----
 
Ideally, the markup should be *readable* and even **clearly understandable** when editing it. Inserting formatting should require few keystrokes and little thought.
 
After all, we want people to concentrate on words, not on where the angle-brackets should go.
 
Kinds of Markup:

* Text Effects
* Headings
* Text Breaks
* Links
* Other

----

Sample Pages
---

Sample header, footer, and navigation pages:

*	[header.html](wiki_sample_header.txt)
*	[footer.html](wiki_sample_footer.txt)
*	navigation.wiki

<pre><code>
* [Home|index.wiki]
* [Project|project.wiki]
...
</code></pre>

Some custom CSS for the wiki content:  [wiki.css](wiki_sample_css.txt)


Batch of Wiki Pages
---

In order to combine several already existing pages into a single page, you have to create a file with extension **\*.wikis** and to list in it all wiki pages that you want to merge.

File: *single.wikis*

<pre><code>part1.wiki
part2.wiki
</code></pre>
