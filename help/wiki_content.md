---
layout: help
title: Wiki Content
icon: fa-quote-right
group: help-features
---

Wiki Content
===

### Overview

An integral part of every application is the user documentation. For this purpose, we introduced a special type of artifacts which are placed in a predefined sub-folder of a project. This type of artifacts follows the actual standards format nowadays for documenting behavior and algorithms of applications, as well as general information about the program itself - wiki. 

The supported markup language as of now is [Confluence](https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup) - well accepted by the community. The wiki pages have to be placed under the *WikiContent* folder of a project with **\*.wiki** file extension. Once they are requested by GET request, underground transformation has been triggered, which converts the confluence format to HTML and sends well-formed Web content back.

Exemplary wiki page in confluence format:

<pre><code>
h4. Confluence Markup
 
Ideally, the markup should be _readable_ and even *clearly understandable* when editing it. Inserting formatting should require few keystrokes and little thought.
 
After all, we want people to concentrate on words, not on where the angle-brackets should go.
 
Kinds of Markup:
* Text Effects
* Headings
* Text Breaks
* Links
* Other
</code></pre>

After the rendering, you will get:

----

#### Confluence Markup
 
Ideally, the markup should be *readable* and even **clearly understandable** when editing it. Inserting formatting should require few keystrokes and little thought.
 
After all, we want people to concentrate on words, not on where the angle-brackets should go.
 
Kinds of Markup:

* Text Effects
* Headings
* Text Breaks
* Links
* Other

----

### Sample Pages

Sample header and footer, as well as navigation page could look like:

*	[header.html](wiki_sample_header.txt)
*	[footer.html](wiki_sample_footer.txt)
*	navigation.wiki

<pre><code>
* [Home|index.wiki]
* [Project|project.wiki]
...
</code></pre>

And of course, some custom CSS for the wiki content:  [wiki.css](wiki_sample_css.txt)


### Batch of Wiki Pages

Sometimes it is helpful to combine several already existing pages into a single page. 
For this purpose, you have to create a file with extension **\*.wikis** and to list in it all wiki pages that you want to merge.

File: *single.wikis*

<pre><code>part1.wiki
part2.wiki
</code></pre>
