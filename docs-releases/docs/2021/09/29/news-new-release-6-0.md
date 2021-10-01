---
title: Release 6.0
category: release
tag: release
---

New version [6.0](https://github.com/eclipse/dirigible/releases/tag/v6.0.0) has been released.

Release is of *Type B*

#### Features

* Adding NCLOB data type
* Аllow creating of table without PK definition
* Added CSV support, updated preview
* Improved REST Services Exception Handling
* Console - Adds auto scroll
* Added odata navigation unit test
* Expose command line execution via api-core
* Enabled Monaco CSV/CSVIM support
* CSV form editor
* Alter existing table with data
* Adding int - byte array conversion to BytesFacade
* Add UTF8Facade to api-utils
* Support of non-master branches for content
* WebJars adoption
* Implementing Drop/Create Builder for TableTypе
* Implementation of merge entity with reference id for OData
* Implementation of insert with referenced entity for OData
* Added new CSVIM editor
* swagger-ui updated to 3.51.2
* Add support for Buildpacks
* h2 database version updated to 1.4.200
* SAP CF - Add Support for Binding of HANA Cloud
* Create Pre-release Workflow
* Liquibase integration
* Added Problems View
* Create SECURITY.md
* Added symbol column to Problems Model
* Simplify content profile usage
* Busy Welcome Page - sorting of the jobs
* Documents - Access Constraints Layering
* Documents - adding "readOnly" & "writeOnly" permissions
* Use System Datasource by Default
* Added Image View
* Initial Spring Boot based distro
* OData addition to Spring Boot distro
* Added Cors filter to Spring Boot distro
* Configured error pages for Spring Boot distro
* Added built-in websockets for Spring Boot distro
* Implement full commonjs require
* Implement assert module and add it to js tests
* Set angularjs version to 1.8.2
* Added method for searching and limiting problems results


#### Fixes

* ODATA update/create of entities
* Console - Undefined message breaks the execution flow
* Console - Trace method is not showing the trace stack
* Console - Fix logging of Java native objects
* Use better error message when the configuration of odata join column is
* Check of synonym existence
* Fixed table fk generation and tests on alter
* ByteOrder.BIG_ENDIAN.name instead of string literal BytesFacade
* OData load artifacts for a specific schema
* Health and Timeout as separate modules
* Added mapping from exception to status code for OData
* Customizing the property value on read for OData
* Guice removed
* template-form-builder-angularjs name fix
* Modules ordering
* Collect BPM related modules under a single parent
* Collect all the modules related to CMS/Documents under a single group
* Delete Orion from the main repository
* Delete ACE from the main repository
* CMS references fixes
* Proper handling in case terminal is not available
* Added get headers for the HTTP API upload
* Added test for create with reference key for OData
* Fixed connection closing on update/delete/create
* Added test for update reference ID
* Added test for create with reference key
* Reduce RabbitMQ's image version to 3.8.19 for testcontainers
* Using workspace path for caching
* Using caffeine for the repository cache
* Separate templating related functionality
* Running nightly build on windows and linux
* Retrieval OData using API
* Bootstrap optimization
* Unable to create publish request, due to long User ID fix
* Move the content jars under different root
* Remove Javascript and Database grouping modules
* Removing discussions perspective from default packaging
* Silent SystemDB setting
* Data name for references column
* OData associations fixes
* OData schema test fix
* Documents - Import Export functionality for constraints
* Use properties for switching off modules from content profile
* Remove v3 APIs from API modules
* License plugin fixes
* JavaScript API tests fix
* Adjusting TableTypeBuilders to support primary keys for Type definition
* Fix delete statement and simplify content profile usage
* Files & Zip - Read/Write Native Bytes
* Repository & Registry - Read/Write Native Bytes
* Exec - fix code completion
* Increased PROBLEM_EXPECTED size for parser error messages
* Improved unit tests of the OData module
* Improved unit tests - deleted unused dependencies and refactored tests
* Documents - updates project structure
* Removing jboss-rmi-api_1.0_spec optional dependency
* Аdding schema for checking existance on sequence
* Serialization for jackson fixes
* Adds "Dirigible-Editor" header to Publish/Unpublish actions
* Change css styles
* Global enable/disable synchronizers service
* Logging optimization
* Employee sample added
* Expand on member property for OData fix
* Add shema to foreign keys constraint 
* Fix Module.js paths
* Create fallback context in executor
* Fix a bug on updating and deleting entities with composite keys
* Fix delete entity to use the column names instead of Entity fields
* Added delete entity test
* Remove built-in Discussions in favor of GitHub Discussions
* Fixed empty criteria and date searches
* Added selected count and total row count to problems search
* Repository not able to delete files
* Repository not opening files
* Registry view not opening files
* Minor fixes


#### Statistics

* 65K+ Users
* 93K+ Sessions
* 188 Countries
* 439 Repositories in DirigibleLabs

#### Operational

* Available packages for download - [https://github.com/eclipse/dirigible/releases/tag/v6.0.0](https://github.com/eclipse/dirigible/releases/tag/v6.0.0)
* Docker images at Docker Hub under DirigibleLabs organization:	[https://hub.docker.com/u/dirigiblelabs/](https://hub.docker.com/u/dirigiblelabs/)
* Maven Central artifacts by org.eclipse.dirigible namespace: [https://search.maven.org/search?q=org.eclipse.dirigible](https://search.maven.org/search?q=org.eclipse.dirigible)
* The full list of bug-fixes and enhancements can be found here: [https://github.com/eclipse/dirigible/milestone/47?closed=1](https://github.com/eclipse/dirigible/milestone/47?closed=1)
* The source code is available at GitHub repository here: [https://github.com/eclipse/dirigible/tree/6.0.0](https://github.com/eclipse/dirigible/tree/6.0.0)
* The instant trial is updated accordingly with the released version here: [http://trial.dirigible.io](http://trial.dirigible.io)

#### Enjoy!
