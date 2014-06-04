---
layout: help
---

Web Content
===

Overview
---

Web Content includes all the static client-side resources such as HTML files, CSS and related theming ingredients as well as dynamic scripts (e.g. JavaScript) and images.
In general, the web content adapter is playing a role of a tunnel, which takes the desired resource location from the request path, loads the corresponding content from the repository and send it back without any modification.

The default behavior of the adapter on a request to a collection (instead of particular resource) is to send back an error code to indicate that the listing of folders is forbidden. 

{info}
If the specific "application/json" *Accept* header is supplied with the request itself, then a JSON formatted array with the sub-folders and resources will be returned.
{info}

Templating
---

Common pattern in user interfaces of web based business applications is simplified templating - usually static header and footer.
To support this we introduced a special handling of HTML pages:

{info}
* *header.html* is a special page, which is recognized as a static header, so that, if exists, it is rendered in the beginning of a requested regular page
* *footer.html* is a special page, which is recognized as a static footer, so that, if exists, it is rendered in the end of a requested regular page
* *index.html* is a special page, which is recognized as a welcome page, so that no header and footer are added to it
* *nohf* is a parameter, which can be added to the request URL to disable adding of header and footer
{info}

To boost the developer productivity in the most common cases, we provide a set of templates, which can help in user interface creation.
There are set of templates, which can be used with [entity services|entity_service.wiki] - list of entities, master-detail, input form, etc. More information can be found at [samples|../samples/entity_ui.wiki] area.
The other templates can be used as utilities e.g. for creation application shell in index.html with main menu or as samples showing most common controls on different AJAX user interface frameworks - [jQuery|http://jquery.com/], [Bootstrap|http://getbootstrap.com/], [OpenUI5|http://sap.github.io/openui5/].
