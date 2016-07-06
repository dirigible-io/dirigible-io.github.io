---
layout: help
title: Web Content
icon: fa-globe
group: help-features
---

Web Content
===

Overview
---

The Web content includes all the static client-side resources, such as HTML files, CSS, and related theme ingredients, as well as the dynamic scripts and the images. In general, the Web content adapter plays the role of a tunnel, which takes the desired resource location from the request path, loads the corresponding content from the repository, and sends it back without any modification.

The default behavior of the adapter on a request to a whole collection and not to a particular resource is to send back an error code, indicating that folder listing is forbidden. 

> If the specific "application/json" *Accept* header is supplied with the request itself, then a JSON formatted array with sub-folders and resources will be returned.

To boost developer productivity in the most common cases, we provide a set of templates, which can help during UI creation. There is a set of templates, which can be used with the [entity services](entity_service.html), a list of entities, master-detail, input form, and so on. For more information, see the [Entity User Interface](../samples/entity_ui.html).

The other templates can be used as utilities for creation application shell in **index.html** with main menu or as samples that show the most common controls on different AJAX UI frameworks, such as
[jQuery](http://jquery.com/), [Bootstrap](http://getbootstrap.com/), [AngularJS](https://angularjs.org/), and [OpenUI5](http://sap.github.io/openui5/).
