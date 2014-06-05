---
layout: help
---

Wiki Content
===

Overview
---

An integral part of every application is the user documentation. For this purpose we introduced a special type of artifacts which are placed in a predefined sub-folder of a project. This type of artifacts follows the de-facto standard nowadays format for documenting behaviors and algorithms of applications as well as general information about the program itself - wiki. 
The supported markup language as of now is [confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) - well accepted by the community.

The wiki pages have to be placed under WikiContent folder of a project with *.wiki file extension. Once they are requested by GET request, underground transformation has been triggered which convert the confluence format to HTML and send the well formed web content back.

Sample of a wiki page in confluence format looks like as following:

<pre><code>
h4. Confluence Markup
 
Ideally, the markup should be _readable_ and even *clearly understandable* when you are
editing it. Inserting formatting should require few keystrokes, and little thought.
 
After all, we want people to be concentrating on the words, not on where the angle-brackets
should go.
 
* Kinds of Markup
** Text Effects
** Headings
** Text Breaks
** Links
** Other
</code></pre>

and after the rendering you will get:

----

Confluence Markup
---
 
Ideally, the markup should be _readable_ and even *clearly understandable* when you are
editing it. Inserting formatting should require few keystrokes, and little thought.
 
After all, we want people to be concentrating on the words, not on where the angle-brackets
should go.
 
*	Kinds of Markup
	*	Text Effects
	*	Headings
	*	Text Breaks
	*	Links
	*	Other

----

Templating
---

Simple templating is also supported similar to [web content](web_content.html):

*	*header.html* is a special page, which is recognized as a static header, so that, if exists, it is rendered in the beginning of a requested regular page
*	*footer.html* is a special page, which is recognized as a static footer, so that, if exists, it is rendered in the end of a requested regular page
*	*nohf* is a parameter, which can be added to the request URL to disable adding of header and footer

Sample Pages
---

Sample header and footer as well as navigation page could look like:

*	[header.html](wiki_sample_header.txt)
*	footer.html
*	navigation.wiki

<pre><code>
* [Home|index.wiki]
* [Project|project.wiki]
...
</code></pre>

and of course some custom css for the wiki content

* wiki.css

Batch of Wiki Pages
---

Sometimes it is helpful to combine several already existing pages to a single page. 
For this purpose you have to create a file with extension \*.wikis and to list in it all the wiki pages that you want to merge.

File: *single.wikis*

<pre><code>
part1.wiki
part2.wiki
</code></pre>
