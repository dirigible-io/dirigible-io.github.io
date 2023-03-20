---
title: Lifecycle
---

Lifecycle
===

Lifecycle module provides utility functions for managing the lifecycle of the projects in the system

=== "Overview"
- Module: `platform/lifecycle`
- Definition: https://github.com/eclipse/dirigible/issues/233
- Source: [/platform/lifecycle.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/lifecycle.js)
- Status: `stable`


### Basic Usage

```javascript
var response = require("http/response");
var user = require("security/user");
var workspace = require("workspace/manager");
var lifecycle = require("platform/lifecycle");
var bytes = require("io/bytes");

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


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**publish(user, workspace, project)**   | Publish project from the workspace, the **project** parameter is optional | *boolean*
**unpublish(user, workspace, project)**   | Unpublish project from the workspace, the **project** parameter is optional | *boolean*
