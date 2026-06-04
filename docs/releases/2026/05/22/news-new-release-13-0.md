---
title: Release 13.0
category: release
tag: release
publish_date: May 22, 2026
---

The [13.0.0 milestone](https://github.com/eclipse-dirigible/dirigible/milestone/56?closed=1) is closed, focused on Entity Data Model (EDM) polish, BPM maturity, Form Editor improvements, and platform-level cleanup.

#### Entity Data Model

* New templates that use the decorator pattern
* Icons for *Calculated* and *Not Null* properties shown directly in the EDM editor
* New *Read Only* property option in the UI tab
* Improved *Import Entity* and *Copy Entity* dialogs
* Fix: Text Box and Telephone widgets no longer coerce numeric input to timestamps

#### BPM

* Support for handling `BpmnError` in processes
* Support for Task Listeners on the task lifecycle
* New BPM Tracer API for process-execution observability
* Fix: Flowable Mail Task now honours environment variable configuration
* Fix: Process Inbox no longer fails to claim tasks when `actionName` is undefined

#### Form Editor

* General Form Editor overhaul (large effort)
* Padding for the header control
* Fix: input error state in generated apps

#### Reports

* *Regenerate* button on reports
* Fix: validation error message visibility on report name validation
* Fix: duplicate option in the report generation dialog

#### IDE & UI

* Search added to the Configurations view
* Configurations view masks sensitive information
* Templates descriptions improved for discoverability
* Legacy `loader.js` replaced with the new `platform-links` tag
* Fix: mixed-language label in the Settings reset button

#### API & Engine

* Fix: concurrency issue executing controllers under load when using `@Inject` / `@Injected`
* Fix: UTF-8 file content correctly returned from the API
* Fix: EDM editor no longer auto-populates `feedUsername` / `feedPassword` from Git credentials

#### Operational

* Milestone: [#56](https://github.com/eclipse-dirigible/dirigible/milestone/56?closed=1)
* Eclipse governance: [Eclipse Dirigible project plan](https://projects.eclipse.org/projects/ecd.dirigible/governance)
* Maven Central: [org.eclipse.dirigible](https://search.maven.org/search?q=org.eclipse.dirigible)
* Docker Hub: [dirigiblelabs](https://hub.docker.com/u/dirigiblelabs/)
