---
title: Database Table
---

## Table Model

**Table Model** is a JSON formatted `*.table` descriptor. It represents the layout of the database table, which will be created during the activation process. Data structures synchroniser automatically reads all the available `*.table` files in the repository (including the classpath resources) and creates the underlying database tables into the default database. The definition supports also dependencies which gives the ability to the synchroniser to make a topological sorting before starting the creation of the database artifacts. 

Example descriptor:

```json

{
	"tableName": "TEST001",
	"columns": [
		{
			"name":"ID",
			"type":"INTEGER",
			"length":"0",
			"notNull":"true",
			"primaryKey":"true",
			"defaultValue":""
		}, {
			"name":"NAME",
			"type":"VARCHAR",
			"length":"20",
			"notNull":"false",
			"primaryKey":"false",
			"defaultValue":""
		}, {
			"name":"DATEOFBIRTH",
			"type":"DATE",
			"length":"0",
			"notNull":"false",
			"primaryKey":"false",
			"defaultValue":""
		}, {
			"name":"SALARY",
			"type":"DOUBLE",
			"length":"0",
			"notNull":"false",
			"primaryKey":"false",
			"defaultValue":""
		}
	]
}
```

The supported database types are:

*	`VARCHAR`     - for text-based fields long up to 2K characters
*	`CHAR`        - for text-based fields with fixed length of up to 255 characters
*	`INTEGER`     - 32 bit
*	`BIGINT`      - 64 bit
*	`SMALLINT`    - 16 bit
*	`REAL`        - 7 digits of mantissa
*	`DOUBLE`      - 15 digits of mantissa
*	`DATE`        - represents a date consisting of day, month, and year
*	`TIME`        - represents a time consisting of hours, minutes, and seconds
*	`TIMESTAMP`   - represents DATE,  TIME, a nanosecond field, and a time zone
*	`BLOB`        - a binary object, such as an image, audio, etc.

The activation of the table descriptor is the process of creating a database table in the target database. The activator constructs a `CREATE TABLE` SQL statement considering the dialect of the target database system. If a particular table name already exists, the activator checks whether there is a compatible change, such as adding new columns, and constructs an `ALTER TABLE` SQL statement. If the change is incompatible, the activator returns an error that has to be solved manually through the SQL console.

## Data Structures

* Creation of table model (JSON formatted `*.table` descriptor) and actual creation of the corresponding database table during publishing.
* Creation of view model (JSON formatted `*.view` descriptor) and actual creation of the corresponding database view during publishing.
* Creation of delimiter separated values (`*.append`, `*.update`, `*.delete`, `*.replace`) data files and populating the corresponding database table during publishing.
* Automatic altering of existing tables from the models on compatible changes (new columns added).
* [Modeling](../../development/ide/modelers/database-schema) of the database schema (`*.dsm` and `*.schema`) files and creation of the tables, views, and constraints during publishing.
	
## Scripting Services

* Support of JavaScript language by using [GraalVM JS](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-javascript-graalvm) as runtime execution engine (`*.js`).
<!-- * Support of CommonJS based modularization of JavaScript services (`*.js`). -->
* Support of strictly defined enterprise [ API](../../../api/) for JavaScript to be used by the business application developers.

## Web Content

* Support of client-side [Web](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-web) related artifacts, such as HTML, CSS, JS, pictures, etc.
	
## Wiki Content

* Support of [Markdown](https://daringfireball.net/projects/markdown/syntax) format for [Wiki](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-wiki) pages.
	
## Integration Services

* Support of listeners for messages from the built-in message bus (`*.listener`).
* Support of scheduled jobs as triggers for backend services invocation (`*.job`).
* Support of business processes defined in BPMN 2.0 and executed by the underlying [BPM](https://github.com/eclipse/dirigible/tree/master/modules/bpm/bpm-flowable) process engine (`*.bpmn`).
* Support of shell commands execution (`*.command`).
* Support of [OData 2.0](https://olingo.apache.org/) (`*.odata`).
* Support of websockets (`*.websocket`).
	
## Mobile Applications

* Support of native mobile application development via [Tabris.js](https://tabris.com/).
	
## Extension Definitions

* Creation of [extension points](../../development/concepts/extensions) (JSON formatted descriptor - `*.extensionpoint`).
* Creation of [extensions](../../development/concepts/extensions) by a given extension point (JSON formatted descriptor - `*.extension`).
	
## Tooling

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

## Modeling

* Modeling of database schema (`*.dsm` and `*.schema`) files with [Database Schema Modeler](../../development/ide/modelers/database-schema)
* Modeling of entity data model (`*.edm` and `*.model`) files with [Entity Data Modeler](../../development/ide/modelers/entity-data)
* Modeling of BPMN process (`*.bpmn`) files with [BPMN Modeler](../../development/ide/modelers/bpmn)
* Modeling of Web form layout (`*.form`) files with [Form Designer](../../development/ide/modelers/form-designer)

## Security

* Role-based access management for Web services as well as the document repository
* Security constraints model (JSON formatted `*.access`) support
* Several predefined roles, which can be used out-of-the-box (Everyone, Administrator, Manager, PowerUser, User, ReadWrite, ReadOnly)

## Registry
	
* Publishing support - exposing the artifacts from the user's workspace publicly 
* Auto-publishing support for better usability
* User interface for browsing and searching within the published content
* Separate lists of endpoints and viewers per type of services - JavaScript, Web, wiki, etc.
* Separate browse user interface for Web and wiki content