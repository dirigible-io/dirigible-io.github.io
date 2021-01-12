---
layout: help
title: Overview
icon: none
group: help-features
---

{{ page.title }}
===

### Data Structures

* Creation of table model (JSON formatted **\*.table** descriptor) and actual creation of the corresponding database table during publishing.
* Creation of view model (JSON formatted **\*.view** descriptor) and actual creation of the corresponding database view during publishing.
* Creation of delimiter separated values (**\*.append**, **\*.update**, **\*.delete**, **\*.replace**) data files and populating the corresponding database table during publishing.
* Automatic altering of existing tables from the models on compatible changes (new columns added).
* [Modeling](https://www.dirigible.io/help/ide_modeler_database_schema.html) of the database schema (**\*.dsm** and **\*.schema**) files and creation of the tables, views, and constraints during publishing.
	
### Scripting Services

* Support of *JavaScript* language by using [GraalVM JS](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-javascript-graalvm) as runtime execution engine (**\*.js**).
* Support of *CommonJS* based modularization of *JavaScript* services (**\*.js**).
* Support of strictly defined enterprise [ API](../api/) for JavaScript to be used by the business application developers.

### Web Content

* Support of client-side [Web](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-web) related artifacts, such as HTML, CSS, JS, pictures, etc.
	
### Wiki Content

* Support of [Markdown](https://daringfireball.net/projects/markdown/syntax) format for [Wiki](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-wiki) pages.
	
### Integration Services
	
* Support of listeners for messages from the built-in message bus (**\*.listener**).
* Support of scheduled jobs as triggers for backend services invocation (**\*.job**).
* Support of business processes defined in BPMN 2.0 and executed by the underlying [BPM](https://github.com/eclipse/dirigible/tree/master/modules/bpm/bpm-flowable) process engine (**\*.bpmn**).
* Support of shell commands execution (**\*.command**).
* Support of [OData 2.0](https://olingo.apache.org/) (**\*.odata**).
* Support of websockets (**\*.websocket**).
	
### Mobile Applications

* Support of native mobile application development via [Tabris.js](https://tabris.com/).
	
### Extension Definitions

* Creation of [extension points](https://www.dirigible.io/help/concepts_extensions.html) (JSON formatted descriptor - **\*.extensionpoint**).
* Creation of [extensions](https://www.dirigible.io/help/concepts_extensions.html) by a given extension point (JSON formatted descriptor - **\*.extension**).
	
### Tooling

* [`Workbench` perspective](https://www.dirigible.io/help/ide_perspective_workbench.html) for full support of project management (New, Cut, Copy, Paste, Delete, Refresh, Import, Export, etc.)
* [`Database` perspective](https://www.dirigible.io/help/ide_perspective_database.html) for RDBMS management including SQL Console
* Enhanced [code editor](https://microsoft.github.io/monaco-editor/) with highlight support for JavaScript, HTML, JSON, XML, etc.
* [`Preview` view](https://www.dirigible.io/help/ide_view_preview.html) for easy testing of changes in Web, Wiki, and Scripting Services
* Configurable [`Logs` view](https://www.dirigible.io/help/ide_view_logs.html), which provides server-side logs and traces
* Lots of template-based wizards for creating new content and services
* Import and export of project content
* [`Documents` perspective](https://www.dirigible.io/help/ide_perspective_documents.html) for import of binary files for external documents and pictures
* [`Repository` perspective](https://www.dirigible.io/help/ide_perspective_repository.html) for low-level repository content management
* [`Debugger` perspective](https://www.dirigible.io/help/ide_perspective_debugger.html) for debugging backend JavaScript services
* [`Terminal` perspective](https://www.dirigible.io/help/ide_perspective_terminal.html) with the corresponding main view for execution of shell commands on the target instance's OS

### Modeling

* Modeling of database schema (**\*.dsm** and **\*.schema**) files with [Database Schema Modeler](https://www.dirigible.io/help/ide_modeler_database_schema.html)
* Modeling of entity data model (**\*.edm** and **\*.model**) files with [Entity Data Modeler](https://www.dirigible.io/help/ide_modeler_entity_data.html)
* Modeling of BPMN process (**\*.bpmn**) files with [BPMN modeler](https://www.dirigible.io/help/ide_modeler_bpmn.html)
* Modeling of form layout (**\*.form**) files with Form Designer

### Security

* Role-based access management for Web services as well as the document repository
* Security constraints model (JSON formatted **\*.access**) support
* Several predefined roles, which can be used out-of-the-box (*Everyone*, *Administrator*, *Manager*, *PowerUser*, *User*, *ReadWrite*, *ReadOnly*)

### Registry
	
* Publishing support - exposing the artifacts from the user's workspace publicly 
* Auto-publishing support for better usability
* User interface for browsing and searching within the published content
* Separate lists of endpoints and viewers per type of services - JavaScript, Web, wiki, etc.
* Separate browse user interface for Web and wiki content

> Note: The feature set listed above contains only the major part of what is currently available. For more insights on what can be done with Eclipse Dirigible, we recommend to [try it out](http://trial.dirigible.io).
