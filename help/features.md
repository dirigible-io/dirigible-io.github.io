---
layout: help
title: Help
---

Features
===

* [*Data Structures*](data_structures.html)
	* Creation of *Table Model* (JSON formatted *.table descriptor) and actual creation of the corresponding database table during activation.
	* Creation of *View Model* (JSON formatted *.view descriptor) and actual creation of the corresponding database view during activation.
	* Creation of Delimiter Separated Values *data files* (*.dsv) and populating the corresponding database table during activation.
	* *Importing of data* files (*.dsv) on the fly as direct update to corresponding table.
	* *Automatic altering* of existing tables from the models on compatible changes (adding new columns)
* [*Extension Definitions*](extension_definitions.html)
	* Creation of *Extension Points* (JSON formatted descriptor)
	* Creation of *Extensions* by a given extension point (JSON formatted descriptor)
* [*Scripting Services*](scripting_services.html)
	* Support of *JavaScript* language by using Mozilla Rhino as runtime container (*.js)
	* Support of *CommonJS* based *modularization* of JavaScript services (*.jslib)
	* Support of *Ruby* language by using jRuby as runtime container along with the standard for the language modularization
	* Support of *Groovy* language by using Groovy as runtime container along with the standard for the language modularization
	* Support of predefined API as *injected global objects* such as request, response, datasource, httpclient, repository, etc. for all supported languages
* [*WebContent*](web_content.html)
	* Support of *client side web* related artifacts such as html, css, js, pictures
* [*WikiContent*](wiki_content.html)
	* Support of *Confluence* format of Wiki pages
	* Support of customizable *header, footer and css* for wiki pages
* [*Integration Services*](integration_services.html)
	* Support of dynamic routes by using Apache *Camel*
	* Support of *JavaScript* breakouts in routes
* [*Tooling*](tooling.html)
	* *Workspace* perspective for full support of project management (new, cut, copy, paste, delete, refresh, etc.)
	* *Database* perspective for RDBMS management including SQL Console
	* Enhanced *Code Editor* with highlight support for JavaScript, Ruby, Groovy, HTML, JSON, XML, etc.
	* *Web Viewer* for easy testing of changes in web, wiki and scripting services
	* Configurable *Log Viewer* providing the server side logs and traces
	* Lots of *template based wizards* for creating new content and services
	* *Import* and *Export* of project(s) content
	* *Import of binary* files for external documents and pictures
	* *Repository* perspective for low level repository content management
* [*Security*](security.html)
	* *Role based* access management
	* *Security Constraints Model* (JSON formatted *.access) support
	* Few predefined roles which can be used out-of-the-box Everyone, Administrator, Manager, PowerUser, User, ReadWrite, ReadOnly
* [*Registry*](registry.html)
	* *Activation* support - exposing the artifacts from the user's workspace publicly 
	* *Auto-Activation* support for usability
	* User-Interface for *Browsing and Searching* of the activated content
	* Separate *lists of endpoints* and viewers per type of services - JavaScript, Ruby, Groovy, Routes
	* Separate browse user interface for *web and wiki* content

and more...
