---
title: Features
---

Features
===

!!! note
	The feature set listed bellow contains only the major part of what is currently available. For more insights on what can be done with Eclipse Dirigible, we recommend to [try it out](http://trial.dirigible.io).


### Data Structures

* Creation of table model (JSON formatted `*.table` descriptor) and actual creation of the corresponding database table during publishing.
* Creation of view model (JSON formatted `*.view` descriptor) and actual creation of the corresponding database view during publishing.
* Creation of delimiter separated values (`*.append`, `*.update`, `*.delete`, `*.replace`) data files and populating the corresponding database table during publishing.
* Automatic altering of existing tables from the models on compatible changes (new columns added).
* [Modeling](../../development/ide/modelers/database-schema) of the database schema (`*.dsm` and `*.schema`) files and creation of the tables, views, and constraints during publishing.
	
### Scripting Services

* Support of *JavaScript* language by using [GraalVM JS](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-javascript-graalvm) as runtime execution engine (`*.js`).
* Support of *CommonJS* based modularization of `JavaScript` services (`*.js`).
* Support of strictly defined enterprise [ API](../../../api/) for JavaScript to be used by the business application developers.

### Web Content

* Support of client-side [Web](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-web) related artifacts, such as HTML, CSS, JS, pictures, etc.
	
### Wiki Content

* Support of [Markdown](https://daringfireball.net/projects/markdown/syntax) format for [Wiki](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-wiki) pages.
	
### Integration Services
	
* Support of listeners for messages from the built-in message bus (`*.listener`).
* Support of scheduled jobs as triggers for backend services invocation (`*.job`).
* Support of business processes defined in BPMN 2.0 and executed by the underlying [BPM](https://github.com/eclipse/dirigible/tree/master/modules/bpm/bpm-flowable) process engine (`*.bpmn`).
* Support of shell commands execution (`*.command`).
* Support of [OData 2.0](https://olingo.apache.org/) (`*.odata`).
* Support of websockets (`*.websocket`).
	
### Mobile Applications

* Support of native mobile application development via [Tabris.js](https://tabris.com/).
	
### Extension Definitions

* Creation of [extension points](../../development/concepts/extensions) (JSON formatted descriptor - `*.extensionpoint`).
* Creation of [extensions](../../development/concepts/extensions) by a given extension point (JSON formatted descriptor - `*.extension`).
	
### Tooling

* [`Workbench` perspective](../../development/ide/perspectives/workbench) for full support of project management (New, Cut, Copy, Paste, Delete, Refresh, Import, Export, etc.)
* [`Database` perspective](../../development/ide/perspectives/database) for RDBMS management including SQL Console
* Enhanced [code editor](https://microsoft.github.io/monaco-editor/) with highlight support for JavaScript, HTML, JSON, XML, etc.
* [`Preview` view](../../development/ide/views/preview) for easy testing of changes in Web, Wiki, and Scripting Services
* Configurable [`Logs` view](../../development/ide/views/logs), which provides server-side logs and traces
* Lots of template-based wizards for creating new content and services
* Import and export of project content
* [`Documents` perspective](../../development/ide/perspectives/documents) for import of binary files for external documents and pictures
* [`Repository` perspective](../../development/ide/perspectives/repository) for low-level repository content management
* [`Debugger` perspective](../../development/ide/perspectives/debugger) for debugging backend JavaScript services
* [`Terminal` perspective](../../development/ide/perspectives/terminal) with the corresponding main view for execution of shell commands on the target instance's OS

### Modeling

* Modeling of database schema (`*.dsm` and `*.schema`) files with [Database Schema Modeler](../../development/ide/modelers/database-schema)
* Modeling of entity data model (`*.edm` and `*.model`) files with [Entity Data Modeler](../../development/ide/modelers/entity-data)
* Modeling of BPMN process (`*.bpmn`) files with [BPMN Modeler](../../development/ide/modelers/bpmn)
* Modeling of Web form layout (`*.form`) files with [Form Designer](../../development/ide/modelers/form-designer)

### Security

* Role-based access management for Web services as well as the document repository
* Security constraints model (JSON formatted `*.access`) support
* Several predefined roles, which can be used out-of-the-box _(`Everyone`, `Administrator`, `Manager`, `PowerUser`, `User`, `ReadWrite`, `ReadOnly`)_

### Registry
	
* Publishing support - exposing the artifacts from the user's workspace publicly 
* Auto-publishing support for better usability
* User interface for browsing and searching within the published content
* Separate lists of endpoints and viewers per type of services - JavaScript, Web, wiki, etc.
* Separate browse user interface for Web and wiki content