---
layout: help
title: Web Content
icon: fa-globe
group: help-features
---

Web Content
===

###Overview###

Web Content includes all the static client-side resources, such as HTML files, CSS, and related theme ingredients, as well as dynamic scripts (e.g. JavaScript) and images. In general, the Web content adapter plays a role of a tunnel, which takes the desired resource location from the request path, loads the corresponding content from the repository, and sends it back without any modification.

The default behavior of the adapter on a request to collection (instead of particular resource) is to send back an error code to indicate that folder listing is forbidden. 

> If the specific "application/json" *Accept* header is supplied with the request itself, then a JSON formatted array with sub-folders and resources will be returned.

###Templates###

Common pattern in user interfaces of Web-based business applications is simplified templating - usually static header and footer.
To support this feature, we introduced a special handling of HTML pages:

*	*header.html* - a special page, which is recognized as a static header so that, if exists, it is rendered in the beginning of a requested regular page.
*	*footer.html* - a special page, which is recognized as a static footer so that, if exists, it is rendered at the end of a requested regular page.
*	*index.html* - a special page, which is recognized as a welcome page so that no header and footer are added to it.
*	*nohf* - a parameter, which can be added to the request URL to disable adding of header and footer.

To boost developer productivity in the most common cases, we provide a set of templates, which can help during UI creation. There is a set of templates, which can be used with [entity services](entity_service.html), a list of entities, master-detail, input form, and so on. For more information, see [Entity User Interface](../samples/entity_ui.html).

The other templates can be used as utilities, e.g. for creation application shell in **index.html** with main menu, or as samples that show the most common controls on different AJAX UI frameworks - 
[jQuery](http://jquery.com/), [Bootstrap](http://getbootstrap.com/), [AngularJS](https://angularjs.org/), [OpenUI5](http://sap.github.io/openui5/).
