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

=== "ECMA6"

    ```javascript
    import { bytes } from "@dirigible/io";
    import { user } from "@dirigible/security";
    import { workspace, lifecycle } from "@dirigible/platform";
    import { response } from "@dirigible/http";

    const currentUser = user.getName();
    const workspaceName = "workspace";
    const projectName = "project";

    let myWorkspace = workspace.createWorkspace(workspaceName);
    let myProject = myWorkspace.createProject(projectName);
    let myFile = myProject.createFile("file.js");
    myFile.setContent(bytes.textToByteArray("console.log('Hello World!');"));

    let publishResult = lifecycle.publish(currentUser, workspaceName, projectName);

    response.println("publishResult: " + publishResult)
    ```

=== "CommonJS"

    ```javascript
    const response = require("http/response");
    const user = require("security/user");
    const workspace = require("workspace/manager");
    const lifecycle = require("platform/lifecycle");
    const bytes = require("io/bytes");

    const user = user.getName();
    const workspaceName = "workspace";
    const projectName = "project";

    let myWorkspace = workspace.createWorkspace(workspaceName);
    let myProject = myWorkspace.createProject(projectName);
    let myFile = myProject.createFile("file.js");
    myFile.setContent(bytes.textToByteArray("console.log('Hello World!');"));

    let publishResult = lifecycle.publish(user, workspaceName, projectName);

    response.println("publishResult: " + publishResult)
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**publish(user, workspace, project)**   | Publish project from the workspace, the **project** parameter is optional | *boolean*
**unpublish(user, workspace, project)**   | Unpublish project from the workspace, the **project** parameter is optional | *boolean*
