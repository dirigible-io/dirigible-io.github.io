---
title: Workspace (Client)
redirect_from:
  - /api/platform_workspace.html
  - /api/workspace_manager.html
---

Workspace client service
===

The workspace client service is used to communicate with the back-end API. You may also want to check out the [WorkspaceHub](../workspace-hub).

=== "Overview"
- Module: `platform-core`
- Source: [service-workspace/workspace.js](https://github.com/eclipse/dirigible/blob/master/components/ui/service-workspace/src/main/resources/META-INF/dirigible/service-workspace/workspace.js)
- Web Link: `/services/web/service-workspace/workspace.js`
- Status: `stable`
- Group: `platform`


### Basic Usage

Include the service using the web link above. If you are making a standard Dirigible [editor](../../user-interface/editor/), the workspace service is already included.

Add it to your app module and controller:

```javascript
const exampleView = angular.module('example', [
  ...
  'WorkspaceService',
]);
exampleView.controller('ExampleViewController', ($scope, WorkspaceService) => {...});
```


## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**setWorkspace(workspace)**   | Saves the workspace name in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). | -
**getCurrentWorkspace()**   | Returns the currently selected workspace. | -
**listWorkspaceNames()**   | Lists all available workspaces. | *Promise*
**list(resourcePath)**   | List the contents of a path. | *Promise*
**resourceExists(resourcePath)**   | Checkes if a resource exists. | *Promise*
**loadContent(resourcePath)**   | Loades file content. | *Promise*
**saveContent(resourcePath)**   | Saves content to a file. | *Promise*
**getMetadataByUrl(resourcePath)**   | Get metadata, from a full URL path. | *Promise*
**getMetadata(resourcePath)**   | Gets metadata, from a full resource path. | *Promise*
**rename(oldName, newName, resourcePath)**   | Renames a file/folder. | *Promise*
**remove(resourcePath)**   | Deletes a file/folder. | *Promise*
**copy(sourcePath, targetPath)**   | Copies a file/folder. | *Promise*
**move(sourcePath, targetPath)**   | Moves a file/folder. | *Promise*
**createFile(name, targetPath, content)**   | Creates a new file. | *Promise*
**createFolder(name, targetPath)**   | Creates a new folder. | *Promise*
**createWorkspace(workspace)**   | Creates a new workspace. | *Promise*
**deleteWorkspace(workspace)**   | Deletes a workspace. | *Promise*
**createProject(workspace, projectName)**   | Creates a project inside a workspace. | *Promise*
**deleteProject(workspace, projectName)**   | Deletes a project inside a workspace. | *Promise*
**search(searchPath, searchTerm)**   | Performs a search. | *Promise*
**getFullURL(resourcePath)**   | Creates a direct web path to a resource. | *Promise*

## Param definitions

| Param | Type | Description |
| --- | --- | --- |
| resourcePath | <code>string</code> | Full resource path, including workspace name. |
| oldName | <code>string</code> | Old name of the resource. |
| newName | <code>string</code> | New name of the resource. |
| sourcePath | <code>string|Array.<string></code> | Full folder(s) path, including workspace name. |
| targetPath | <code>string</code> | Full target path, including workspace name. |
| name | <code>string</code> | File/folder name. |
| content | <code>string</code> | File content. |
| workspace | <code>string</code> | Workspace name. |
| projectName | <code>string</code> | Project name. |
| searchPath | <code>string</code> | Full path, including the workspace name. |
| searchTerm | <code>string</code> | File content to search for. |

!!! Note
	Params in square brackets are optional.

## Example

```javascript
let selectedWorkspace = WorkspaceService.getCurrentWorkspace();
console.log(selectedWorkspace);

WorkspaceService.list('/workspace/new-project').then((response) => {
    console.log(response.data.folders);
    console.log(response.data.files);
}, (error) => {
    console.error(error);
});

WorkspaceService.copy(
  ['/workspace/new-project/file1.js', '/workspace/new-project/file2.js'],
  '/workspace/old-project'
).then((response) => {
    for (let r = 0; r < response.data.length; r++) {
      console.log(`Moved ${response.data[r].from} to ${response.data[r].to}`);
    }
}, (error) => {
    console.error(error);
});

```