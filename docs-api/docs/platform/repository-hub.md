---
title: Repository Hub
---

Repository Hub
===

The repository hub is used to send and receive events on the client, regarding workspace operations. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [service-repository/repository-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/service-workspace/src/main/resources/META-INF/dirigible/service-repository/repository-hub.js)
- Web Link: `/services/web/service-repository/repository-hub.js`
- Status: `stable`
- Group: `platform`


### Basic Usage

Include the hub using the web link above. If you are making a standard Dirigible [editor](../../user-interface/editor/), the repository hub is already included.

```html
<script type="text/javascript" src="/services/web/service-repository/repository-hub.js"></script>
```

```javascript
exampleView.controller('ExampleViewController', ($scope) => {
    const repositoryHub = new RepositoryHub();
});
```


## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**announceRepositoryModified(DataParams)**   | Sends a message containing information on which workspace has been changed. | -
**onWorkspaceChanged(handlerFunc)**   | Triggered when a workspace has been changed. | *function*

## Param definitions

## Typedefs

<dl>
<dt><a href="#DataParams">DataParams</a> : <code>Object</code></dt>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="DataParams"></a>

## Params : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object.&lt;any, any&gt;</code> | Sends a message containing information on what has changed. |

## Example

```javascript
repositoryHub.announceRepositoryModified({
    data: {
        folderAdded: true;
    }
});

const modifiedListener = repositoryHub.onFileSelected((data) => {
    if (data.folderAdded) console.log('Folder has been added.');
});
```