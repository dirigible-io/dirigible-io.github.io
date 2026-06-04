---
title: Release 7.0
category: release
tag: release
---

New version [7.0](https://github.com/eclipse/dirigible/releases/tag/v7.0.0) has been released.

Release is of *Type B*

#### Features

* Adapting Fundamantals Styles library for the User Interface
* GraalJS integration optimizations
* OData engine improvements
* Debugger integration stabilization
* ECMA 2022 support
* Jobs perspective
* BPM Perspective

#### Improvements & Fixes

* Add 'Ctrl+S' work on all editors
* Multiple "Table Prefix" during generation
* Form dialog doesn't remove hidden inputs from the required items
* Documents perspective is broken under macOS
* Form Base Editors to respond to Save All Event
* Improve front-end performance
* Configure an Object from configurations parameters
* The first input in the form dialog should be automatically focused
* Insert Data for Entities that had CSV data leads to records being deleted
* OAuth - Expired Token Issue
* OAuth - AWS Cognito Integration
* Pdf generation API gives an error when the 'rows' array is empty
* DAO Count Details Error on PostgreSQL
* Use IRestExceptionHandler instead of AbstractExceptionHandler
* Use IDirigibleModule instead of AbstractDirigibleModule
* Table prefix parameter to be used in preprocessing in custom queries in the model at generation
* Exception caused during runtime of dirigible
* Preserve Generation Metadata
* Processing of CSVIM database metadata leads to error on PostgreSQL 
* Extract resources from ide-core to resources-core
* Use h2 in AbstractDirigibleTest
* Update Static Pages with Fundamental Styles
* Restrict the Entity Name to not contain spaces (and special symbols?)
* Disabled SCE causing a cross-site scripting vulnerability
* Add Caption property (in User Interface tab), to be used in the home page (launchpad) section
* Modified files displayed as newly added on the 'Difference' view
* Unrecoverable crash when right-clicking on a file in the Debugger perspective
* Spring - NoClassDefFoundError - StaticLoggerBinder
* Skip Generation for Non-Feed Entities
* In master-details, create detail function must be disabled if no master is selected
* In master-details, master key property to be hidden by default from table view
* UI template with Fundamentals
* EDM - Generator Refactoring
* Template Presentation (Listing)
* Enable/Disable Auto Formatting action
* Remove Derby entirely and replace it with H2
* Logging improvements - reduce unnecessary garbage allocations
* Attempt to clone a huge project leads to infinite error messaging
* File -> Export All shows error
* When creating a new module in the Web IDE with the wrong path, Dirigible stops loading all modules
* Layout - Add right side view panel
* Server shuts down on wrong project.json
* Add create new blank file feature
* Base64 and Hex encode/decode methods do not operate as expected
* Move ide-templating to the right place
* Move api-facade-templating to the right place
* Create the new git views
* Add GraalVM Context out redirect
* Alter existing database tables, if modified in the model
* Enable uploading of more than one file at the same time
* Expand git branch API
* Jasmine and QUnit do not work
* API tests do not run
* Nested projects git status is not reported correctly
* Workspace - upload multiple files into a project
* Git status is not returned in most situations
* Showing more informative result in Result View
* Open file is not working
* Wiki Synchronizer Ignore Paths
* Files Explorer View
* Properties does not have any affect when selected
* Make a menu service
* CSVIM - Schema Should be Optional
* Move file collapses tree
* Cannot create new js service if file.js already exists
* CSVIM - Database type BIT not supported
* CSVIM Batch Processing of Large Content
* Creating a new file or folder should focus it
* Context menu should always be visible
* When creating a new file or folder, the directory tree collapses and has to be expanded manually
* Fix Check for Update in the Help drop-down menu
* Workspace - Add notification to unpublish on delete
* Copy Entity from External Model
* CSVIM not working on PostgreSQL
* Predelivered CSVIM/CSVIM not processed
* Defined Database Type
* Column Names are Missing in the Result View
* Remove unnecessary sliders from the Web IDE in Chrome (Windows 10)
* Link the "Workspace" dropdown boxes for Workspace and Import views
* Renaming a file makes a copy and does not unpublish the old one
* Error at the bottom does not disappear once the problem is fixed
* Folder and files in it are not saved to disk on move
* Mark modified/new/deleted files in Workspace View
* Workspace cannot be deleted
* Confirmation popups to not be browser based
* Can't move editor above console
* Show view menu overflows screen
* Menu does not close after changing focus
* Allow one workspace refresh at a time
* Extendable icons for files
* Refactor the menu json object
* Create file collapses tree
* Import files from zip, does not limit by file type
* Importing files from ZIP does not work
* Search view does not work
* When renaming a file, there are no restrictions which could result in multiple files and folders being created
* When multiple files with same name are opened in tabs, project name should be shown in the tab's title
* No error messages for unsuccessful cloning of projects
* Git statuses are not reported correctly for files
* Imported projects, folders and files should be automatically published
* Multiselect dropdown hides on each option change
* Some views should not be lazy loaded
* Datasource HikariCP
* Missing New File Options
* Spring - Keycloak Integration
* Import project view, does not limit by file type
* Show the latest execution status, message and time of a Job
* Enhance the Job API to support logging of a message which will be retained
* Retention period of the logs to be configurable
* Kebap menu in Workbench, Projects doesn't undisplay as expected
* Job Parameters handling
* Choices support for Job parameters
* Share project at root level
* Fix broken links in the Samples page
* Manually Set Job Parameters support
* Manually Triggering Job
* Preview showing ignored files
* Preview sometimes not updating
* Projects view - Fix rename file type change
* Projects view - fix path for child files and folders on rename
* Generate project.json for non-dirigible projects
* Layout - Left pane views not expanded when called
* BPMN - Open Editor Issue
* Job Parameters - Form Based Editor enhancement
* Job Parameters - Model and Persistence
* Fundamental Styles integration
* Workspace REST service should return metadata at any level
* Add base webjars required by the new design
* Renaming a folder in the workspace does not have any effect on registry
* Share Project Issues
* Change of Log Location
* Projects with root project.json issues
* Java 18 Support - Cannot build project
* Database - Simple data export to CSV
* Import projects with project.json
* Workspace is created in the users directory
* CSV Editor - Total Records Count
* js source code is exposed with /services/v4/web/ url prefix
* Introduce 'exposes' functionality
* Introduce Job Log entity
* Serialize correctly Null and Binary objects
* Introduce a Cleanup Service
* Registry API to be aware of 'webjars' as well
* Create combo service
* Scripting Exception Handler
* Spring Issue with Serialization
* Manage state of the available jobs from jobs view
* OData explicit and derived aggregation support
* Exclude root folders starting with '.' during project import
* Monaco - Pluggable file extensions support
* Monaco - Support for Freemarker Template Language
* Separate Perspective creation in the model
* File status feature
* Properties reorder
* Save button in extension editor doesn't work
* Separate dependent classes for Spring for reuse
* Websocket Handler is null in Spring Boot package
* Spring Boot package failed to load acorn.js module
* Put all the generated artefacts under a 'gen' folder
* Support for DOUBLE PRECISION
* Move the monaco editor to a webjar
* OData now uses row_num value as ID for HANA views
* Wrong URL for Launchpad template
* Table type in h2 is not supported
* SQL Type CHARACTER is not supported
* Wrong location of the launchpad files
* Enumerating files ignores the soft links
* Relation filed generation is incorrect
* OData join clause mapping table
* Copy existing to show prompt
* SearchIndex are not processed
* Procedure - Null Dates Issue
* Procedures - Support for nullable values
* Delete many to prompt only once
* Unable to pull changes from origin
* Close Connection Issue
* Git remote URL is not visible to the user
* Bearer authorization header is not recognized
* Minor fixes


#### Statistics

* 79K+ Users
* 113K+ Sessions
* 195 Countries
* 499 Repositories in DirigibleLabs

#### Operational

* Available packages for download - [https://github.com/eclipse/dirigible/releases/tag/v7.0.0](https://github.com/eclipse/dirigible/releases/tag/v7.0.0)
* Docker images at Docker Hub under DirigibleLabs organization:	[https://hub.docker.com/u/dirigiblelabs/](https://hub.docker.com/u/dirigiblelabs/)
* Maven Central artifacts by org.eclipse.dirigible namespace: [https://search.maven.org/search?q=org.eclipse.dirigible](https://search.maven.org/search?q=org.eclipse.dirigible)
* The full list of bug-fixes and enhancements can be found here: [https://github.com/eclipse/dirigible/milestone/48?closed=1](https://github.com/eclipse/dirigible/milestone/48?closed=1)
* The source code is available at GitHub repository here: [https://github.com/eclipse/dirigible/tree/7.0.0](https://github.com/eclipse/dirigible/tree/7.0.0)
* The instant trial is updated accordingly with the released version here: [http://trial.dirigible.io](http://trial.dirigible.io)

#### Enjoy!
