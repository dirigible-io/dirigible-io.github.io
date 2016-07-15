---
layout: help
title: Overview
icon: fa-home
group: help-features
---

Features
===

* [*Data Structures*](data_structures.html)
	* Creation of table model (JSON formatted **\*.table** descriptor) and actual creation of the corresponding database table during activation.
	* Creation of view model (JSON formatted **\*.view** descriptor) and actual creation of the corresponding database view during activation.
	* Creation of delimiter separated values (**\*.dsv**) data files and populating the corresponding database table during activation.
	* Importing of data files (**\*.dsv**) on the fly as direct update to corresponding table.
	* Automatic altering of existing tables from the models on compatible changes (new columns added).
* [*Extension Definitions*](extension_definitions.html)
	* Creation of extension points (JSON formatted descriptor)
	* Creation of extensions by a given extension point (JSON formatted descriptor)
* [*Scripting Services*](scripting_services.html)
	* Support of **JavaScript** language by using Mozilla Rhino as runtime container (**\*.js**)
	* Support of **CommonJS** based modularization of JavaScript services (**\*.js**)
	* Support of **Ruby** language by using jRuby as runtime container along with the standard for the language modularization
	* Support of **Groovy** language by using Groovy as runtime container along with the standard for the language modularization
	* Support of predefined API as injected global objects (request, response, datasource, httpclient, repository, etc.) for all supported languages
* [*WebContent*](web_content.html)
	* Support of client-side Web related artifacts, such as HTML, CSS, JS, pictures
* [*WikiContent*](wiki_content.html)
	* Support of Confluence format for wiki pages
	* Support of customizable header, footer and css for wiki pages
* [*Integration Services*](integration_services.html)
	* Support of dynamic routes
	* Shielding services
	* Job scheduling
* [*Mobile Applications*](mobile_apps.html)
	* Support of a native Mobile Applications development via Tabris.js
* [*Tooling*](tooling.html)
	* *Workspace* perspective for full support of project management (New, Cut, Copy, Paste, Delete, Refresh, etc.)
	* *Database* perspective for RDBMS management including SQL Console
	* Enhanced *Code Editor* with highlight support for JavaScript, Ruby, Groovy, HTML, JSON, XML, etc.
	* *Preview* for easy testing of changes in Web, wiki, and scripting services
	* Configurable *Log Viewer*, which provides server-side logs and traces
	* Lots of template-based wizards for creating new content and services
	* *Import* and *Export* of project content
	* *Import of binary* files for external documents and pictures
	* *Repository* perspective for low-level repository content management
* [*Security*](security.html)
	* Role based access management
	* Security Constraints Model (JSON formatted **\*.access**) support
	* Several predefined roles, which can be used out-of-the-box (*Everyone*, *Administrator*, *Manager*, *PowerUser*, *User*, *ReadWrite*, *ReadOnly*)
* [*Registry*](registry.html)
	* Activation support - exposing the artifacts from the user's workspace publicly 
	* Auto-Activation support for usability
	* User-Interface for browsing and searching within the activated content
	* Separate lists of endpoints and viewers per type of services - JavaScript, Ruby, Groovy, Routes
	* Separate browse user interface for Web and wiki content

And more...
