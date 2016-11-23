---
layout: help
title: Eclipse
icon: none
group: help-setup
---

Setup Development Environment on Eclipse
===




Eclipse Dirigible can be run directly in Eclipse. This is useful for testing new features during the development process.

Prerequisites
---

- [Maven 3.0.x](http://maven.apache.org/)
- [Eclipse IDE](https://www.eclipse.org/)

Steps
---

1. Import the project as existing Maven project into your local Eclipse environment.
2. Go to project **org.eclipse.dirigible/org.eclipse.dirigible.parent/platform/org.eclipse.dirigible.platform.target** and open the file **org.eclipse.dirigible.platform.base.target** using the Target Editor.
3. Click on the **Set as Target Platform** link and wait until the required bundles get synchronized.
4. Use **dirigible-local.launch** file for **Run As** configuration.
5. Open a web browser and go to:

[http://localhost:8080/index.html](http://localhost:8080/index.html)
