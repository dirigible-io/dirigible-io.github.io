---
layout: api
title: Workspace
icon: fa-check
---

{{ page.title }}
===

Workspace object gives access to the user's workspaces. It can be used for creating artifacts such as services and web pages programmatically.

Version 4.x
---

- Module: **platform/v4/workspace**
- Alias: **platform/workspace**
- Definition: [https://github.com/eclipse/dirigible/issues/230](https://github.com/eclipse/dirigible/issues/230)
- Source: [/platform/v4/workspace.js](https://github.com/dirigiblelabs/api-platform/blob/master/platform/v4/workspace.js)
- Facade: [WorkspaceFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-workspace/src/main/java/org/eclipse/dirigible/api/v3/workspace/WorkspaceFacade.java)
- Status: **stable**


### Basic Usage

The service which list the available workspaces:

```javascript
var workspaceManager = require("platform/v4/workspace");
var response = require("http/v4/response");

var workspacesNames = workspaceManager.getWorkspacesNames();

response.println("Workspaces: " + workspacesNames);
response.flush();
response.close();

```

### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**createWorkspace(name)**   | Creates a new Workspace programmatically | *Workspace*
**getWorkspace(name)**   | Gets the Workspace by name programmatically | *Workspace*
**getWorkspacesNames()**   | List the names of the available workspaces programmatically | *array of string*
**deleteWorkspace(name)**   | Deletes the Workspace by name programmatically | *-*



#### Objects

---

##### Workspace

Function     | Description | Returns
------------ | ----------- | --------
**getProjects()** | List the names of the available workspaces programmatically | *Projects*
**createProject(name)**   | Creates a new Project programmatically | *Project*
**getProject(name)**   | Gets the Project by name programmatically | *Project*
**deleteProject(name)**   | Deletes the Project by name programmatically | *-*
**exists()** | Check whether this Workspace object does exist programmatically | *boolean*
**existsFolder(path)** | Check whether a Folder by given *path* exists in this Workspace programmatically | *boolean*
**existsFile(path)** | Check whether a File by given *path* exists in this Workspace programmatically | *boolean*
**copyProject(source, target)**   | Copies a given Project programmatically | *-*
**moveProject(source, target)**   | Copies a given Project programmatically | *-*

##### Projects

Function     | Description | Returns
------------ | ----------- | --------
**size()** | Returns the size of this Projects list programmatically | *integer*
**get(index)**   | Gets a Project by index programmatically | *Project*


##### Project

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Returns the *name* of the Project programmatically | *string*
**getPath()** | Returns the *path* of the Project programmatically | *string*
**exists()** | Check whether this Project object does exist programmatically | *boolean*
**createFolder(path)**   | Creates a new Folder by *name* programmatically | *Folder*
**existsFolder(path)** | Check whether a Folder by given *path* exists in this Project programmatically | *boolean*
**getFolder(path)**   | Gets a Folder by *path* programmatically | *Folder*
**getFolders(path)**   | Gets all the Folders under the *path* programmatically | *Folders*
**deletesFolder(path)**   | Deletes a Folder by *path* programmatically | *-*
**createFile(path)**   | Creates a new File by *name* programmatically | *File*
**existsFile(path)** | Check whether a File by given *path* exists in this Project programmatically | *boolean*
**getFile(path)**   | Gets a File by *path* programmatically | *File*
**getFiles(path)**   | Gets all the Files under the *path* programmatically | *Files*
**deletesFile(path)**   | Deletes a File by *path* programmatically | *-*


##### Folders

Function     | Description | Returns
------------ | ----------- | --------
**size()** | Returns the size of this Folders list programmatically | *integer*
**get(index)**   | Gets a Folder by index programmatically | *Folder*


##### Files

Function     | Description | Returns
------------ | ----------- | --------
**size()** | Returns the size of this Files list programmatically | *integer*
**get(index)**   | Gets a File by index programmatically | *File*


##### Folder

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Returns the *name* of the Folder programmatically | *string*
**getPath()** | Returns the *path* of the Folder programmatically | *string*
**exists()** | Check whether this Folder object does exist programmatically | *boolean*
**createFolder(path)**   | Creates a new Folder by *name* programmatically | *Folder*
**existsFolder(path)** | Check whether a Folder by given *path* exists in this Folder programmatically | *boolean*
**getFolder(path)**   | Gets a Folder by *path* programmatically | *Folder*
**getFolders(path)**   | Gets all the Folders under the *path* programmatically | *Folders*
**deletesFolder(path)**   | Deletes a Folder by *path* programmatically | *-*
**createFile(path)**   | Creates a new File by *name* programmatically | *File*
**existsFile(path)** | Check whether a File by given *path* exists in this Folder programmatically | *boolean*
**getFile(path)**   | Gets a File by *path* programmatically | *File*
**getFiles(path)**   | Gets all the Files under the *path* programmatically | *Files*
**deletesFile(path)**   | Deletes a File by *path* programmatically | *-*


##### File

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Returns the *name* of the File programmatically | *string*
**getPath()** | Returns the *path* of the File programmatically | *string*
**exists()** | Check whether this File object does exist programmatically | *boolean*
**getContentType()** | Returns the Content Type of the File programmatically | *string*
**isBinary()** | Returns the Binary flag of the File programmatically | *boolean*
**getContent()** | Returns the *Content* of the File programmatically | *bytes*
**setContent(input)** | Sets the *Content* of the File programmatically by the given bytes *input* | *-*
**getText()** | Returns the *Content* of the File programmatically | *string*
**setText(input)** | Sets the *Content* of the File programmatically by the given string *input* | *-*




### Compatibility

Rhino | Nashorn | V8
----- | ------- | --------
 ✅  | ❌  | ❌

