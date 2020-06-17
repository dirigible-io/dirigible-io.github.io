---
layout: api
title: Lifecycle
icon: fa-ellipsis-h
---

{{ page.title }}
===

Lifecycle module provides utility functions for managing the lifecycle of the projects in the system


Version 4.x
---


- Module: **platform/v4/lifecycle**
- Alias: **platform/lifecycle**
- Definition: https://github.com/eclipse/dirigible/issues/233
- Source: [/platform/v4/lifecycle.js](https://github.com/dirigiblelabs/api-platform/blob/master/platform/v4/lifecycle.js)
- Facade: [LifecycleFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-platform/src/main/java/org/eclipse/dirigible/api/v3/platform/LifecycleFacade.java)
- Status: **stable**


### Basic Usage

```javascript
var response = require("http/v4/response");
var user = require("security/v4/user");
var workspace = require("workspace/v4/manager");
var lifecycle = require("platform/v4/lifecycle");
var bytes = require("io/v4/bytes");

var user = user.getName();
var workspaceName = "workspace";
var projectName = "project";

var myWorkspace = workspace.createWorkspace(workspaceName);
var myProject = myWorkspace.createProject(projectName);
var myFile = myProject.createFile("file.js");
myFile.setContent(bytes.textToByteArray("console.log('Hello World!');"));

var publishResult = lifecycle.publish(user, workspaceName, projectName);

response.println("publishResult: " + publishResult)
```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**publish(user, workspace, project)**   | Publish project from the workspace, the **project** parameter is optional | *boolean*
**unpublish(user, workspace, project)**   | Unpublish project from the workspace, the **project** parameter is optional | *boolean*

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
