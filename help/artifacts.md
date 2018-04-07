---
layout: help
title: Artifacts
icon: fa-code
---

{{ page.title }}
===


### File extensions of the known artifacts

- Database
  - [*.table](https://github.com/eclipse/dirigible/tree/master/modules/database-data-structures) - a JSON based database table descriptor file. Data structures synchroniser automatically reads all the available *.table files in the repository (including the classpath resources) and creates the underlying database tables into the default database. The definition supports also dependencies which gives the ability to the synchroniser to make a topological sorting before starting the creation of the database artefacts. Sample can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database-data-structures/src/test/resources/orders.table).
  - [*.view](https://github.com/eclipse/dirigible/tree/master/modules/database-data-structures) - a JSON based database table descriptor file. The synchroniser reads and creates the database views as defined in the model. Sample can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database-data-structures/src/test/resources/orders.view)
  - [*.replace](https://github.com/eclipse/dirigible/tree/master/modules/database-data-structures) - a data file containing list of records to be imported with 'replace' mode to the corresponding database table. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/database-data-structures/src/test/resources/orders.replace)
  - [*.append](https://github.com/eclipse/dirigible/tree/master/modules/database-data-structures) - a data file containing list of records to be imported with 'append' mode to the corresponding database table.
  - [*.delete](https://github.com/eclipse/dirigible/tree/master/modules/database-data-structures) - a data file containing list of records to be deleted from the corresponding database table. For deleting all of the records use '*' symbol.
  - [*.update](https://github.com/eclipse/dirigible/tree/master/modules/database-data-structures) - a data file containing list of records to be imported with 'update' mode to the corresponding database table.
- Security
  - [*.access](https://github.com/eclipse/dirigible/tree/master/modules/core-security) - security constraints file. It defines the access permissions for the given endpoints. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/core-security/src/test/resources/access/test.access).
  - [*.roles](https://github.com/eclipse/dirigible/tree/master/modules/core-security) - roles definition file. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/core-security/src/test/resources/access/test.roles).
- Flows
  - [*.listener](https://github.com/eclipse/dirigible/tree/master/modules/engine-listener) - listener definition describing the link between the message queue or topic and the corresponding handler. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/engine-listener/src/test/resources/control/control.listener).
  - [*.job](https://github.com/eclipse/dirigible/tree/master/modules/engine-job) - job definition describing the period in which the scheduled handler will be executed. Sample file can be found [here](https://github.com/eclipse/dirigible/blob/master/modules/engine-job/src/test/resources/control/control.job).
- Scripting
  - [*.js](https://github.com/eclipse/dirigible/tree/master/modules/engine-js) - a Javascript file supposed to be executed either server side by the supported engine (Rhino, Nashorn or V8) or at the client side by the browser's built-in engine.
  - [*.rhino](https://github.com/eclipse/dirigible/tree/master/modules/engine-js-rhino) - a Javascript file supposed to be executed specifically by the Mozilla Rhino engine.
  - [*.nashorn](https://github.com/eclipse/dirigible/tree/master/modules/engine-js-nashorn) - a Javascript file supposed to be executed specifically by the Java Nashorn engine.
  - [*.v8](https://github.com/eclipse/dirigible/tree/master/modules/engine-js-v8) - a Javascript file supposed to be executed specifically by the Chrome V8 engine.
  - [*.md](https://github.com/eclipse/dirigible/tree/master/modules/engine-wiki) - a Markdown Wiki file.

  
The source is [here](https://github.com/eclipse/dirigible/wiki/artefacts-v3-list)
