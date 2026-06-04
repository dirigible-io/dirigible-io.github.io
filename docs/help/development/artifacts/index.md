---
layout: help
title: Artifacts Overview
icon: fa-code
---

Artifacts Overview
===


## File extensions

### Database

  - [*.table](https://github.com/eclipse/dirigible/tree/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/tables) - a JSON based database table descriptor file. Data structures synchroniser automatically reads all the available *.table files in the repository (including the classpath resources) and creates the underlying database tables into the default database. The definition supports also dependencies which gives the ability to the synchroniser to make a topological sorting before starting the creation of the database artefacts.

  - [*.view](https://github.com/eclipse/dirigible/tree/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/views) - a JSON based database table descriptor file. The synchroniser reads and creates the database views as defined in the model.

  - [*.csvim](https://github.com/eclipse/dirigible/tree/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/csvim) - a JSON based descriptor file containing, pointing to a CSV file to be imported to the configured database table.

### Security

  - [*.access](https://github.com/eclipse/dirigible/blob/master/components/engine/engine-security/src/test/resources/META-INF/dirigible/test/test.access) - security constraints file. It defines the access permissions for the given endpoints.
  - [*.role](https://github.com/eclipse/dirigible/blob/master/components/engine/engine-security/src/test/resources/META-INF/dirigible/test/test.role) - roles definition file.


### Flows

  - [*.listener](https://github.com/eclipse/dirigible/blob/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/listeners/test.listener) - listener definition describing the link between the message queue or topic and the corresponding handler.
  - [*.job](https://github.com/eclipse/dirigible/blob/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/jobs/test.job) - job definition describing the period in which the scheduled handler will be executed.


### Scripting

  - [*.js](https://github.com/eclipse/dirigible/blob/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/datastore/student.mjs) - a JavaScript file supposed to be executed either server-side by the supported engine (GraalJS) or at the client-side by the browser's built-in engine.
  - [*.command](https://github.com/eclipse/dirigible/blob/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/command/uname.command) - a Shell Command service
  - [*.md](https://raw.githubusercontent.com/eclipse/dirigible/master/README.md) - a Markdown Wiki file.

    !!! note "ES6 and TypeScript"

        Starting from version `8.x` of Eclipse Dirigible, it's possible to use also `*.mjs` _(ES6 modules)_ and `*.ts` _(TypeScript)_ for the development of server-side services.

### Modeling

  - [*.dsm](https://github.com/eclipse/dirigible/blob/master/components/engine/engine-odata/src/test/resources/cars/Cars.dsm) - an internal XML based format file containing a database schema model diagram.
  - [*.schema](https://github.com/eclipse/dirigible/blob/master/components/test-project/src/main/resources/META-INF/dirigible/test-project/schemas/test.schema) - a JSON descriptor for a database schema layout produced by the Database Schema Modeler 
  - [*.edm](https://github.com/dirigiblelabs/demo-eclipsecon2018-edm-bookshop-admin/blob/master/bookshop-admin/bookshop.edm) - an internal XML based format file containing an entity data model diagram.
  - [*.model](https://github.com/dirigiblelabs/demo-eclipsecon2018-edm-bookshop-admin/blob/master/bookshop-admin/bookshop.model) - a JSON descriptor for an entity data model produced by the Entity Data Modeler
  - [*.bpmn](https://github.com/dirigiblelabs/sample-bpm/blob/master/sample-bpm/time-entry-request.bpmn) - a BPMN 2.0 XML file containing a definition of a business process.
