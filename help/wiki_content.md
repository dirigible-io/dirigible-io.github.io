---
layout: help
---

Wiki Content
===

Overview
---

An integral part of every application is the user documentation. For this purpose we introduced a special type of artifacts which are placed in a predefined sub-folder of a project. This type of artifacts follows the de-facto standard nowadays format for documenting behaviors and algorithms of applications as well as general information about the program itself - wiki. The supported markup language as of now is [confluence|https://confluence.atlassian.com/display/DOC/Confluence+Wiki+Markup] - well accepted by the community.

The wiki pages have to be placed under WikiContent folder of a project with *.wiki file extension. Once they are requested by GET request, underground transformation has been triggered which convert the confluence format to HTML and send the well formed web content back.

Sample of a wiki page in confluence format looks like as following:

{code}
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
{code}

and after the rendering you will get:
----
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

----

h2. Templating

Simple templating is also supported similar to [web content|web_content.wiki]:

{info}
* *header.html* is a special page, which is recognized as a static header, so that, if exists, it is rendered in the beginning of a requested regular page
* *footer.html* is a special page, which is recognized as a static footer, so that, if exists, it is rendered in the end of a requested regular page
* *nohf* is a parameter, which can be added to the request URL to disable adding of header and footer
{info}

h3. Sample Pages

Sample header and footer as well as navigation page could look like:

* header.html
{code}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>YOUR TITLE HERE</title>
    
    <!-- Bootstrap core CSS -->
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>      
    <![endif]-->
    <link href="wiki.css" rel="stylesheet">
  </head>

  <body>

<div id="container">
<div id="header">YOUR HEADER TEXT HERE</div>
<div id="wrapper">
<div id="content">
{code}

* footer.html
{code}
</div>
<div id="navigation">
    
</div>

<script src="https://code.jquery.com/jquery.min.js"></script>
<script>
    $( document ).ready(function() {
        $( "#navigation" ).load('navigation.wiki?nohf');
    });
</script>            

<div id="footer"><p>Copyright &copy; YOUR COPYRIGHT AND LICENSE HERE</p></div>
</div>
</body>
</html>
{code}

* navigation.wiki
{code}
* [Home|index.wiki]
* [Project|project.wiki]
...
{code}

and of course some custom css for the wiki content

* wiki.css
{code}
html, body {
    margin:0;
    padding:0;
    height: 100%;    
}
body {
    color: gray;
}
p {
    margin:0 10px 10px;
}
a {
    color: #555;
	padding:2px;
}
pre {
    margin: 20px;
    background: #e3ffcf;
}

#header {
    position: fixed;
    width: 100%;
    background: black;
    border-bottom: 4px solid #f0ab00;
    box-shadow: 2px 2px 5px rgba(116, 107, 61, 0.4);
    color: #E6AB19;
    font-size: 120%;
    text-shadow: 1px 1px 2px rgba(116, 107, 61, 0.74);
}
#extra {
    background: #f0ab00;
    position: fixed;
    right: 0;
    top: 160px;
    width: 200px;
    height: 100px;
    border-radius: 5px;
    border-color: #f0ab00;
    border-width: 3px;
    border-style: solid;
    padding: 10px;
    margin: 10px;
}
#extra a {
    font-weight: bold;
    text-decoration: none;
}

#wrapper {
    float:left;
    width:100%;
}

#content {
    float: left;
    margin-left: 280px;
    margin-top: 30px;
    margin-right: 250px;
    margin-bottom: 30px;
    display: inline;
    padding: 10px;
    line-height: 20px;
}
#content a {
    color: #f0ab00;
    padding:0px;
}

#navigation {
    position: fixed;
    top: 38px;
    width: 250px;
    border-right: solid 1px #ddd;
    height: 100%;
    padding: 10px;
    overflow:auto;
    background-color: #efefef;
    color: black;
}

#footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: black;
    color: lightgray;
    text-align: center;
    height: 20px;
}
#footer p {
    margin:0;
    padding: 0px 10px;
    font-size: 90%;
}
#footer a {
    color: white;
    display: initial;
}

.info {
    border-radius: 4px;
    padding: 20px;
}
.warning {
    border-radius: 4px;
    padding: 20px;
}
.error {
    border-radius: 4px;
    padding: 20px;
}
{code}

h2. Batch of Wiki Pages

Sometimes it is helpful to combine several already existing pages to a single page. 
For this purpose you have to create a file with extension *.wikis and to list in it all the wiki pages that you want to merge.

File: *single.wikis*

{code}
part1.wiki
part2.wiki
{code}
