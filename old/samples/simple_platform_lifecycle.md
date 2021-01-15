---
layout: samples
title: Platform Lifecycle
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **platform-lifecycle-test**.
2. Then create a JavaScript service named **platform-lifecycle.js**.
3. Within the service code, enter the following content:

#### Log Levels

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

---

For more information, see the *[API](../api/)* documentation.
