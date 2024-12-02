---
title: Workspace Hub
---

Workspace Hub
===

The workspace hub is used to send and receive events on the client, regarding workspace operations. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [service-workspace/workspace-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/service-workspace/src/main/resources/META-INF/dirigible/service-workspace/workspace-hub.js)
- Web Link: `/services/web/service-workspace/workspace-hub.js`
- Status: `stable`
- Group: `platform`


### Basic Usage

Include the hub using the web link above. If you are making a standard Dirigible [editor](../../user-interface/editor/), the workspace hub is already included.

```html
<script type="text/javascript" src="/services/web/service-workspace/workspace-hub.js"></script>
```

```javascript
exampleView.controller('ExampleViewController', ($scope) => {
    const workspaceHub = new WorkspaceHub();
});
```


## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**announceWorkspaceChanged(WorkspaceExtraParams)**   | Sends a message containing information on which workspace has been changed. | -
**onWorkspaceChanged(handlerFunc)**   | Triggered when a workspace has been changed. | *function*
**openFile(OpenFileParams)**   | Sends a message containing information on which file has to be opened. | -
**onOpenFile(handlerFunc)**   | Triggered when a file has to be opened. | *function*
**closeFile(PathParams)**   | Sends a message containing information on which file has to be closed. | -
**onCloseFile(handlerFunc)**   | Triggered when a file has to be closed. | *function*
**closeAllFiles(Params)**   | Sends a message when all files should be closed. | -
**onCloseAllFiles(handlerFunc)**   | Triggered when files have to be closed. | *function*
**setFileDirty(FileDirtyParams)**   | Sends a message containing information on which file has to be set to dirty. | -
**onSetFileDirty(handlerFunc)**   | Triggered when a file has to be set as dirty. | *function*
**isFileDirty(PathParams)**   | Gets the dirty state of a file. | *Promise*
**onIsFileDirty(handlerFunc)**   | Triggered when a file dirty state is requested. | *function*
**isFileOpen(PathParams)**   | Checks if a file is open. | *Promise*
**onIsFileOpen(handlerFunc)**   | Triggered when a file open state check is called. | *function*
**announceFileSaved(FileSavedParams)**   | Sends a message containing information on which file has been saved. | -
**onFileSaved(handlerFunc)**   | Triggered when a file has been saved. | *function*
**saveFile(FileSavedParams)**   | Sends a message containing information on which file should be saved. | -
**onSaveFile(handlerFunc)**   | Triggered when a file has to be saved. | *function*
**saveFile(PathParams)**   | Sends a message containing information on which file should be saved. | -
**onSaveFile(handlerFunc)**   | Triggered when a file has to be saved. | *function*
**saveAll()**   | Tells all open editors to save their content. | -
**onSaveAll(handlerFunc)**   | Triggered when all files should be saved. | *function*
**announcePublished(PathParams)**   | Sends a message containing information on which file, folder or project has been published. | -
**onPublished(handlerFunc)**   | Triggered when a file, folder or project has been published. | *function*
**announceUnpublished(PathParams)**   | Sends a message containing information on which file, folder or project has been unpublished. | -
**onUnpublished(handlerFunc)**   | Triggered when a file, folder or project has been unpublished. | *function*
**announceFileSelected(FileSelectedParams)**   | Sends a message containing information on which file has been selected. | -
**onFileSelected(handlerFunc)**   | Triggered when a file has been deleted. | *function*
**announceFileDeleted(PathParams)**   | Sends a message containing information on which file has been deleted. | -
**onFileDeleted(handlerFunc)**   | Triggered when a file has been deleted. | *function*
**announceFileRenamed(RenamedParams)**   | Sends a message containing information on which file has been renamed. | -
**onFileRenamed(handlerFunc)**   | Triggered when a file has been renamed. | *function*
**announceFileMoved(MovedParams)**   | Sends a message containing information on which file has been moved. | -
**onFileMoved(handlerFunc)**   | Triggered when a file has been moved. | *function*
**reloadEditorParams(PathParams)**   | Tells an editor that it should reload its view parameters. | -
**onReloadEditorParams(handlerFunc)**   | Triggered when an editor should reload its view parameters. | *function*
**announceFolderDeleted(PathParams)**   | Sends a message containing information on which folder has been deleted. | -
**onFolderDeleted(handlerFunc)**   | Triggered when a folder has been deleted. | *function*
**announceFolderRenamed(RenamedParams)**   | Sends a message containing information on which folder has been renamed. | -
**onFolderRenamed(handlerFunc)**   | Triggered when a folder has been renamed. | *function*
**announceFolderMoved(MovedParams)**   | Sends a message containing information on which folder has been moved. | -
**onFolderMoved(handlerFunc)**   | Triggered when a file has been moved. | *function*
**announceProjectDeleted(ProjectParams)**   | Sends a message containing information on which project has been deleted. | -
**onProjectDeleted(handlerFunc)**   | Triggered when a project has been deleted. | *function*
**announceWorkspaceCreated(WorkspaceParams)**   | Sends a message containing information on which workspace has been created. | -
**onWorkspaceCreated(handlerFunc)**   | Triggered when a workspace has been created. | *function*
**announceWorkspaceModified(WorkspaceParams)**   | Sends a message containing information on which workspace has been modified. | -
**onWorkspaceModified(handlerFunc)**   | Triggered when a workspace has been modified. | *function*
**announceWorkspaceDeleted(WorkspaceParams)**   | Sends a message containing information on which workspace has been deleted. | -
**onWorkspaceDeleted(handlerFunc)**   | Triggered when a workspace has been created. | *function*
**getCurrentlyOpenedFiles(GetOpenedParams)**   | Gets all file paths from the currently opened editors. | *Promise*
**onGetCurrentlyOpenedFiles(handlerFunc)**   | Triggered when a list of opened files is requested. | *function*

## Param definitions

## Typedefs

<dl>
<dt><a href="#WorkspaceExtraParams">WorkspaceExtraParams</a> : <code>Object</code></dt>
<dt><a href="#OpenFileParams">OpenFileParams</a> : <code>Object</code></dt>
<dt><a href="#PathParams">PathParams</a> : <code>Object</code></dt>
<dt><a href="#Params">Params</a> : <code>Object</code></dt>
<dt><a href="#FileDirtyParams">FileDirtyParams</a> : <code>Object</code></dt>
<dt><a href="#FileSavedParams">FileSavedParams</a> : <code>Object</code></dt>
<dt><a href="#FileSelectedParams">FileSelectedParams</a> : <code>Object</code></dt>
<dt><a href="#RenamedParams">RenamedParams</a> : <code>Object</code></dt>
<dt><a href="#MovedParams">MovedParams</a> : <code>Object</code></dt>
<dt><a href="#ProjectParams">ProjectParams</a> : <code>Object</code></dt>
<dt><a href="#WorkspaceParams">WorkspaceParams</a> : <code>Object</code></dt>
<dt><a href="#GetOpenedParams">GetOpenedParams</a> : <code>Object</code></dt>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="WorkspaceExtraParams"></a>

## WorkspaceExtraParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| workspace | <code>string</code> | Name of the changed workspace. |
| params | <code>Object.&lt;any, any&gt;</code> | Any extra parameters. |

<a name="OpenFileParams"></a>

## OpenFileParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| contentType | <code>string</code> | The file content type. |
| [editorId] | <code>string</code> | The ID of the preffered editor. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters that will be passed to the view parameters of the editor. |

<a name="PathParams"></a>

## PathParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters. |

<a name="Params"></a>

## Params : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters. |

<a name="FileDirtyParams"></a>

## FileDirtyParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| dirty | <code>boolean</code> | File dirty state. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters. |

<a name="FileSavedParams"></a>

## FileSavedParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| [status] | <code>string</code> | Git status of the file. |
| [contentType] | <code>string</code> | File content type. |

<a name="FileSelectedParams"></a>

## FileSelectedParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| contentType | <code>string</code> | The file content type. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters that will be passed the listener. |

<a name="RenamedParams"></a>

## RenamedParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>string</code> | Old file path, including file name. |
| newPath | <code>string</code> | New file path, including file name. |
| contentType | <code>string</code> | The file content type. |

<a name="MovedParams"></a>

## MovedParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>string</code> | Old file path, including file name. |
| newPath | <code>string</code> | New file path, including file name. |

<a name="ProjectParams"></a>

## ProjectParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| project | <code>string</code> | Project name. |
| workspace | <code>string</code> | Workspace name. |

<a name="WorkspaceParams"></a>

## WorkspaceParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| workspace | <code>string</code> | Workspace name. |

<a name="GetOpenedParams"></a>

## GetOpenedParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| basePath | <code>string</code> | If provided, it will only return files with a matching base path. |

## Example

```javascript
workspaceHub.announceFileSelected({
    path: '/workspace/project/folder/file.js',
    contentType: 'text/javascript',
});

const selectedListener = workspaceHub.onFileSelected((data) => {
    console.log(data.name);
    console.log(data.path);
    console.log(data.contentType ?? '');
});
```