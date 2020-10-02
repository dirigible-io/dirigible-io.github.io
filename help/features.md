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
* Modelling of the database schema (**\*.dsm** and **\*.schema**) files and creation of the tables, views and constraints during publishing.
	
### Scripting Services

* Support of **JavaScript** language by using Mozilla Rhino, Nashorn or V8 as runtime execution engine (**\*.js**)
* Support of **CommonJS** based modularization of JavaScript services (**\*.js**)
* Support of strictly defined [Enterprise API](../api/) for JavaScript to be used by the business application developers

### WebContent

* Support of client-side Web related artifacts, such as HTML, CSS, JS, pictures, etc.
	
### WikiContent

* Support of Markdown format for wiki pages
	
### Integration Services
	
* Support of Listeners for messages from the built-in message bus (**\*.listener**)
* Support of scheduled Jobs as triggers for backend services invokation (**\*.job**)
* Support of Business Processes defined in BPMN 2.0 and executed by the underlying process engine (**\*.bpmn**)
* Support of Shell Commands execution (**\*.command**)
* Support of OData 2.0 (**\*.odata**)
* Support of Websockets (**\*.websocket**)
	
### Mobile Applications

* Support of a native Mobile Applications development via Tabris.js
	
### Extension Definitions

* Creation of extension points (JSON formatted descriptor - **\*.extensionpoint**)
* Creation of extensions by a given extension point (JSON formatted descriptor - **\*.extension**)
	
### Tooling

* *Workbench* perspective for full support of project management (New, Cut, Copy, Paste, Delete, Refresh, Import, Export, etc.)
* *Database* perspective for RDBMS management including SQL Console
* Enhanced *Code Editor* with highlight support for JavaScript, HTML, JSON, XML, etc.
* *Preview* for easy testing of changes in Web, Wiki, and Scripting Services
* Configurable *Log Viewer*, which provides server-side logs and traces
* Lots of template-based wizards for creating new content and services
* *Import* and *Export* of project content
* *Document* perspective for *import of binary* files for external documents and pictures
* *Repository* perspective for low-level repository content management
* *Debug* perspective for debugging backend JavaScript services
* *Terminal* perspective with the corresponding main view for execution of shell commands on the target instance's OS

### Modeling

* Modeling of database schema (**\*.dsm** and **\*.schema**) files
* Modeling of entity data model (**\*.edm** and **\*.model**) files
* Modeling of BPMN process (**\*.bpmn**) files
* Modeling of form layout (**\*.form**) files with Form Designer

### Security

* Role based access management for web services as well as the document repository
* Security Constraints Model (JSON formatted **\*.access**) support
* Several predefined roles, which can be used out-of-the-box (*Everyone*, *Administrator*, *Manager*, *PowerUser*, *User*, *ReadWrite*, *ReadOnly*)

### Registry
	
* Publishing support - exposing the artifacts from the user's workspace publicly 
* Auto-Publishing support for better usability
* User-Interface for browsing and searching within the published content
* Separate lists of endpoints and viewers per type of services - JavaScript, Web, Wiki, etc.
* Separate browse user interface for Web and Wiki content

> Note: Features set listed above contains only the major part of what is available currently. For better insight what can be done with Dirigible we recommend to [try it out](http://trial.dirigible.io).
