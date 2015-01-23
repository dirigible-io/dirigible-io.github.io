---
layout: help
title: Eclipse
icon: fa-cogs
group: help-setup
---

Setup Development Environment on Eclipse
===




Dirigible can be run directly via Eclipse. This is useful when testing new features during development.

##### Prerequisites

- [Maven 3.0.x](http://maven.apache.org/)
- [Eclipse IDE](https://www.eclipse.org/)

##### Steps

1. Import the project as existing Maven project into your local Eclipse environment.
2. Go to project `com.sap.dirigible/com.sap.dirigible.parent/platform/com.sap.dirigible.platform.target` and open the file `com.sap.dirigible.platform.base.target` using the Target Editor.
3. Click on the `Set as Target Platform` link and wait until the required bundles get synchronized.
4. Use `dirigible-local.launch` file for `Run As` configuration.
5. Open a web browser and go to:

        http://localhost:8080/dirigible
