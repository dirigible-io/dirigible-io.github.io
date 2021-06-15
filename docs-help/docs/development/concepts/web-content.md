---
title: Web Content
---

Web Content
===

## Overview
---

The Web content includes all the static client-side resources, such as HTML files, CSS, and related theme ingredients, as well as the dynamic scripts and the images. In general, a Web content adapter plays the role of a tunnel that takes the desired resource location from the request path, loads the corresponding content from the repository, and sends it back without any modification.

By default, the Web content adapter accepts requests to particular resources and responds with an error code to requests to whole collections. This way, the Web content adapter indicates that folder listing is forbidden.  

!!! Note
	If the specific `application/json` Accept header is supplied with the request itself, then a JSON formatted array with sub-folders and resources will be returned.

To boost developer productivity in the most common cases, we provide a set of templates that can help during UI creation. There is a set of templates that can be used with the [entity services](../entity-service/), a list of entities, master-detail, input form, and so on.

The other templates can be used as utilities for the creation an application shell in *index.html* with main menu or as samples that show the most common controls on different AJAX UI frameworks, such as
[jQuery](http://jquery.com/), [Bootstrap](http://getbootstrap.com/), [AngularJS](https://angularjs.org/), and [OpenUI5](http://sap.github.io/openui5/).
