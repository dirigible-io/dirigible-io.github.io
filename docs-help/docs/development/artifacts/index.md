---
layout: help
title: Artifacts Overview
icon: fa-code
---

Artifacts Overview
===


## File extensions

### Database

  - [*.table](https://github.com/eclipse/dirigible/tree/master/modules/database/database-data-structures) - a JSON based database table descriptor file. Data structures synchroniser automatically reads all the available *.table files in the repository (including the classpath resources) and creates the underlying database tables into the default database. The definition supports also dependencies which gives the ability to the synchroniser to make a topological sorting before starting the creation of the database artefacts. Sample can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database/database-data-structures/src/test/resources/orders.table).
  - [*.view](https://github.com/eclipse/dirigible/tree/master/modules/database/database-data-structures) - a JSON based database table descriptor file. The synchroniser reads and creates the database views as defined in the model. Sample can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database/database-data-structures/src/test/resources/orders.view)
  - [*.replace](https://github.com/eclipse/dirigible/tree/master/modules/database/database-data-structures) - a data file containing list of records to be imported with 'replace' mode to the corresponding database table. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database/database-data-structures/src/test/resources/orders.replace)
  - [*.append](https://github.com/eclipse/dirigible/tree/master/modules/database/database-data-structures) - a data file containing list of records to be imported with 'append' mode to the corresponding database table.
  - [*.delete](https://github.com/eclipse/dirigible/tree/master/modules/database/database-data-structures) - a data file containing list of records to be deleted from the corresponding database table. For deleting all of the records use '*' symbol.
  - [*.update](https://github.com/eclipse/dirigible/tree/master/modules/database/database-data-structures) - a data file containing list of records to be imported with 'update' mode to the corresponding database table.
 
### Security

  - [*.access](https://github.com/eclipse/dirigible/tree/master/modules/core/core-security) - security constraints file. It defines the access permissions for the given endpoints. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/core/core-security/src/test/resources/access/test.access).
  - [*.roles](https://github.com/eclipse/dirigible/tree/master/modules/core/core-security) - roles definition file. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/core/core-security/src/test/resources/access/test.roles).

### Flows

  - [*.listener](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-listener) - listener definition describing the link between the message queue or topic and the corresponding handler. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/engines/engine-listener/src/test/resources/control/control.listener).
  - [*.job](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-job) - job definition describing the period in which the scheduled handler will be executed. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/engines/engine-job/src/test/resources/control/control.job).

### Scripting

  - [*.js](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-javascript-graalvm) - a Javascript file supposed to be executed either server side by the supported engine (GraalJS) or at the client side by the browser's built-in engine.
  - [*.md](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-wiki) - a Markdown Wiki file.
  - [*.command](https://github.com/eclipse/dirigible/tree/master/modules/engines/engine-command) - a Shell Command service

### Modeling

  - `*.dsm` - an internal XML based format file containing a database schema model diagram.
  - `*.schema` - a JSON descriptor for a database schema layout produced by the Database Schema Modeler 
  - `*.edm` - an internal XML based format file containing an entity data model diagram.
  - `*.model` - a JSON descriptor for an entity data model produced by the Entity Data Modeler
  - `*.bpmn` - a BPMN 2.0 XML file containing a definition of a business process.
