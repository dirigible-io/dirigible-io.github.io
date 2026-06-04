---
title: Release 6.2
category: release
tag: release
---

New version [6.2](https://github.com/eclipse/dirigible/releases/tag/v6.2.0) has been released.

Release is of *Type A*

#### Features

* Add ability to customize the generated SQL for OData
* Update Tomcat version
* Replace status labels inside ide-problems with icons
* Problems - Cause to be expanded on click
* Problems - Location to be clickable
* Add extension for ESM services
* Introduce Artefact State Metadata
* JSDoc comments in \*d.ts files
* Introduce corresponding types for the supported artefacts 
* Keycloak integration on trial
* Adopt latest monaco version
* Update acorn.js version in ide-monaco and specify ECMA version on parse
* Add loading overview when loading or saving files
* Format code automatically when save action is triggered
* Enable css formatting in editor
* DAO - create table in SystemDB
* Update kubernetes version for Trial
* CSVIM Synchronizer
* Show modified lines in the editor
* Make Monaco show the difference between commited and modified files in edit mode
* Add option for creating a new csvim file
* Hide technical implementation details
* CLI package for test purposes
* Eclipse Vert.x package to be provided
* XSOdata files not loaded in Preview view
* Implement GraalVM file system for ES6 modules resolution
* Add Monaco editor support for ES6 modules
* Add .d.ts files for each Dirigible JS API
* Loading indicator
* Safety closing connections opened from user code
* XSK Web IDE and Runtime Hangs
* Expose Git API
* Fix the logs location in the Docker deployments
* Incorrect Content Encoding header
* User schema search for DB artefacts
* Extension points for custom Publish handlers
* Support for transaction handling in SQL Processor
* Batch support for OData
* Sorting with pagination and expand not working
* ide-bpm does not have modules.json and could not be imported with the ESM syntax
* Mail configuration provider
* Improve ZIP Import REST API functionality
* Option to publish/unpublish file selection
* Make all editors take advantage of the new frame parameter functionality
* OpenAPI descriptors collector service
* Ordered Synchronizer
* Disable cache by default, except for Runtime distributions

#### Documentation and Samples

* Sample for \*.changelog integration
* Exec API
* Database Perspective Perspective
* Git API
* Docker/Helm - Security Report
* Overwrite images is not working


#### Fixes

* CSV path in CSVIM files should not contain the workspace name
* Make 'workspace' the default workspace
* CSVIM does not select the current workspace
* Error handling and proper alerts
* Alerts not working
* Delete file to close editor tab
* Not showing local or remote branches
* Preview downloads files
* .hdbtable indeces type in not taken into account
* .hdbtable tableType is not taken into account
* Console view not working locally in Safari
* BPMN Modeller has to use older version of AngularJS
* Can't close welcome screen
* Cut operation in workbench is crashing the whole IDE
* Monaco not formatting HTML correctly
* Roles editor writes $$hashKey to json on save
* ES6 Truffle File System has wrong handling of paths on windows
* DAO - Insert into table fails
* "command + x" is not executing all or selected sql statements 
* XML files are not formatted
* Navigation to calculation view end up in SQL error
* Multiple CWE-200 vulnerabilities
* Errors about missing favicons
* Disabled SCE causing a cross-site scripting vulnerability
* Incorrect property metadata
* Replace var with let/const
* Add d.ts files for ext-modules
* Synonym target objects search now works only with a given schema
* Some files don't have an 'Open' option on right click
* Check internal dirigible reference dependency versions
* Git facade is not included in the API JavaScript maven group
* Parent stack objects not visible
* Git - Default branch when cloning is expected to be "master", clone fails if it is "main"
* OData for table synonyms doesn't work
* Debugger is not working locally
* Git - Unstaged files are tracked per push attempt, not per successful push
* CSVIM Editor not opening csv files in the csv editor
* Nested expand not working
* Debugger - JS files debugging is weird
* Configuration credentials logged
* XSJS service NPE through Postman
* Minor fixes


#### Statistics

* 69K+ Users
* 99K+ Sessions
* 188 Countries
* 462 Repositories in DirigibleLabs

#### Operational

* Available packages for download - [https://github.com/eclipse/dirigible/releases/tag/v6.2.0](https://github.com/eclipse/dirigible/releases/tag/v6.2.0)
* Docker images at Docker Hub under DirigibleLabs organization:	[https://hub.docker.com/u/dirigiblelabs/](https://hub.docker.com/u/dirigiblelabs/)
* Maven Central artifacts by org.eclipse.dirigible namespace: [https://search.maven.org/search?q=org.eclipse.dirigible](https://search.maven.org/search?q=org.eclipse.dirigible)
* The full list of bug-fixes and enhancements can be found here: [https://github.com/eclipse/dirigible/milestone/51?closed=1](https://github.com/eclipse/dirigible/milestone/51?closed=1)
* The source code is available at GitHub repository here: [https://github.com/eclipse/dirigible/tree/6.2.0](https://github.com/eclipse/dirigible/tree/6.2.0)
* The instant trial is updated accordingly with the released version here: [http://trial.dirigible.io](http://trial.dirigible.io)

#### Enjoy!
