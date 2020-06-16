---
layout: api
title: Workspaces
icon: fa-check
---

{{ page.title }}
===

> ⚠ Deprecated

Workspaces object gives access to the user's workspace. It can be used for creating artifacts such as services and web pages programmatically.

Version 3.x  ⚠
---

Moved to [Workspace Manager](workspace_manager.html)

---


Version 2.x
---

- Module: **platform/workspaces**
- Definition: [/core_api/issues/45](https://github.com/dirigiblelabs/core_api/issues/45)
- Source: [/platform/workspaces.js](https://github.com/dirigiblelabs/core_api/blob/master/core_api/ScriptingServices/platform/workspaces.js)
- Status: **beta**

Basic Usage
---

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var workspaces = require('platform/workspaces');
var response = require('net/http/response');
var streams = require('io/streams');

// Get the logged-in user's workspace
var workspace = workspaces.getWorkspace();
var workspaceRoot = workspace.getRoot();

response.println("Create a project programmatically...");

var project = workspaceRoot.getProject("A_Programmatic_Project");
if (!project.exists()) {
	project.create();
}

response.println("Project created.");

project.open();

response.println("Project opened.");

var folderScriptingServices = project.getFolder("ScriptingServices");
if (!folderScriptingServices.exists()) {
	folderScriptingServices.create();
}

response.println("Folder ScriptingServices created.");

var fileProgrammaticService = folderScriptingServices.getFile("programmatic_service.js");
if (!fileProgrammaticService.exists()) {
	var bytes = streams.textToByteArray("var response = require('net/http/response');\nresponse.println('Hello World!');\nresponse.flush();\nresponse.close();");
	fileProgrammaticService.create(streams.createByteArrayInputStream(bytes));
}
response.println("File programmatic_service.js created.");

response.flush();
response.close();
```

Definition
---

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getWorkspace()**   | Returns the default user's workspace | *Workspace*
**getUserWorkspace(user)**   | Returns the workspace for the provided user name | *Workspace*


### Objects

---

#### Workspace

Function     | Description | Returns
------------ | ----------- | --------
**getRoot()**   | Returns the root object of this Workspace | *WorkspaceRoot*


#### WorkspaceRoot

Function     | Description | Returns
------------ | ----------- | --------
**getProjects()**   | Returns all the projects in this Workspace | *array of Project*
**getProject(name)**   | Returns a Project object from this Workspace | *Project*


#### Project

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of this Project | *string*
**getFolder(name)**   | Returns a Folder object from this Project | *Folder*
**getFile(name)**   | Returns a File object  from this Project | *File*
**create()**   | Creates the Project | *-*
**delete()**   | Deletes the Project | *-*
**open()**   | Opens the Project | *-*
**close()**   | Closes the Project | *-*
**exists()**   | Returns true if the Project already exists in this Workspace and false otherwise | *boolean*


#### Folder

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of this Folder | *string*
**getFullPath()**   | Returns the full path of this Folder | *string*
**getFolder(name)**   | Returns a Folder object from this Folder | *Folder*
**getFile(name)**   | Returns a File object  from this Folder | *File*
**create()**   | Creates the Folder | *-*
**delete()**   | Deletes the Folder | *-*
**exists()**   | Returns true if the Folder already exists in this Project and false otherwise | *boolean*


#### File

Function     | Description | Returns
------------ | ----------- | --------
**getName()**   | Returns the name of this File | *string*
**getFullPath()**   | Returns the full path of this File | *string*
**create(inputStream)**   | Creates the File | *-*
**delete()**   | Deletes the File | *-*
**exists()**   | Returns true if the File already exists in this Project and false otherwise | *boolean*
**getContents()**   | Returns the body of this File | *InputStream*
**setContents(inputStream)**   | Sets the body of this File | *-*



Compatibility
---

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ✅  | ❌
