---
title: LayoutHub
---

LayoutHub
===

Controls the layout. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/layout-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/layout-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/layout-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, layout support is automatically enabled.

If you are making a custom view, you can include the API using the web link above.

To initialize it:

```javascript
const layoutHub = new LayoutHub();
```

This hub is different compared to the others. All hubs listen to changes globally, meaning that, for example, if `View A` in `Perspective A` with `Layout A` sends a message using the [WorkspaceHub](../platform/workspace-hub/) that there is a change to a workspace and `View B` in `Perspective B` with `Layout B` is listening for workspace changes, then `View B` will receive that message despite being in a completely different perspective and layout.

The LayoutHub is going to react to changes only from views that are inside it, not to outside changes. If `View A` in `Perspective A` requests for `View C` to be opened, the view will be opened only in the `Perspective A` layout and `Perspective B` will not change.

## Constructor

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| [layoutId] | <code>string</code> | Layout id. By default, it's the perspective id. |
| [setId] | <code>boolean</code> | When creating a layout, this parameter must be set to true as it will register the current window object as a layout one and set a `layoutId` parameter in it. This will help all child views to get the layout id automatically. |

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getOpenedViews(ParamsObject)**   | Returns a list of opened view ids. | *Promise*
**onGetOpenedViews(handlerFunc)**   | Registers a listener. Triggered when a list of opened views is requested. Returns a function to unregister the listener. | *function*
**isViewOpen(IdParamObject)**   | Returns true if a view is opened. | *Promise*
**onIsViewOpen(handlerFunc)**   | Registers a listener. Triggered when a view opened state check is requested. Returns a function to unregister the listener. | *function*
**openView(IdParamObject)**   | Opens a view. | -
**onOpenView(handlerFunc)**   | Registers a listener. Triggered when a view should be opened. Returns a function to unregister the listener. | *function*
**focusView(IdParamObject)**   | Focuses a view. | -
**onFocusView(handlerFunc)**   | Registers a listener. Triggered when a view should be focused. Returns a function to unregister the listener. | *function*
**closeView(IdParamObject)**   | Closes a view. | -
**onCloseView(handlerFunc)**   | Registers a listener. Triggered when a view should be closed. Returns a function to unregister the listener. | *function*
**closeOtherViews(IdParamObject)**   | Closes all other views. | -
**onCloseOtherViews(handlerFunc)**   | Registers a listener. Triggered when other views should be closed. Returns a function to unregister the listener. | *function*
**closeAllViews(ParamsObject)**   | Closes all views. | -
**onCloseAllViews(handlerFunc)**   | Registers a listener. Triggered when all views should be closed. Returns a function to unregister the listener. | *function*
**setViewDirty(ViewDirtyObject)**   | Sets the dirty state of a view. | -
**onViewDirty(handlerFunc)**   | Registers a listener. Triggered when a view's dirty state should be changed. Returns a function to unregister the listener. | *function*
**openEditor(OpenEditorParams)**   | Sends a message containing information on which editor has to be opened. | -
**onOpenEditor(handlerFunc)**   | Triggered when an editor has to be opened. | *function*
**closeEditor(PathParams)**   | Sends a message containing information on which editor has to be closed. | -
**onCloseEditor(handlerFunc)**   | Triggered when an editor has to be closed. | *function*
**closeAllEditors(Params)**   | Sends a message when all editors should be closed. | -
**onCloseAllEditors(handlerFunc)**   | Triggered when editors have to be closed. | *function*
**focusEditor(FocusParams)**   | Tells an editor that it has been focused. | -
**onFocusEditor()**   | Triggered when an editor gains focus. | *function*
**setEditorDirty(EditorDirtyParams)**   | Sends a message containing information on which editor has to be set to dirty. | -
**onSetEditorDirty(handlerFunc)**   | Triggered when an editor has to be set as dirty. | *function*
**isEditorDirty(PathParams)**   | Gets the dirty state of an editor. | *Promise*
**onIsEditorDirty(handlerFunc)**   | Triggered when an editor's dirty state is requested. | *function*
**isEditorOpen(PathParams)**   | Checks if an editor is open. | *Promise*
**onIsEditorOpen(handlerFunc)**   | Triggered when performing a check for an open editor. | *function*
**getCurrentlyOpenedEditors(GetOpenedParams)**   | Gets all file paths from the currently opened editors. | *Promise*
**onGetCurrentlyOpenedEditors(handlerFunc)**   | Triggered when a list of opened files is requested. | *function*
**reloadEditorParams(PathParams)**   | Tells an editor that it should reload its view parameters. | -
**onReloadEditorParams(handlerFunc)**   | Triggered when an editor should reload its view parameters. | *function*

## Typedefs

<dl>
<dt><a href="#IdParamObject">IdParamObject</a> : <code>Object</code></dt>
<dt><a href="#ParamsObject">ParamsObject</a> : <code>Object</code></dt>
<dt><a href="#ViewDirtyObject">ViewDirtyObject</a> : <code>Object</code></dt>
<dt><a href="#OpenEditorParams">OpenEditorParams</a> : <code>Object</code></dt>
<dt><a href="#PathParams">PathParams</a> : <code>Object</code></dt>
<dt><a href="#Params">Params</a> : <code>Object</code></dt>
<dt><a href="#FocusParams">FocusParams</a> : <code>Object</code></dt>
<dt><a href="#EditorDirtyParams">EditorDirtyParams</a> : <code>Object</code></dt>
<dt><a href="#GetOpenedParams">GetOpenedParams</a> : <code>Object</code></dt>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="IdParamObject"></a>

### IdParamObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | View id. |
| [params] | <code>object</code> | Custom parameters. See [ViewParameters](../viewParameters). |

<a name="ParamsObject"></a>

### ParamsObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>object</code> | Custom parameters. See ViewParameters. |

<a name="ViewDirtyObject"></a>

### ViewDirtyObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | View id. |
| dirty | <code>boolean</code> | Dirty state. |
| [params] | <code>object</code> | Custom parameters. See ViewParameters. |

<a name="OpenEditorParams"></a>

### OpenEditorParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| contentType | <code>string</code> | The file content type. |
| [editorId] | <code>string</code> | The ID of the preffered editor. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters that will be passed to the view parameters of the editor. |

<a name="PathParams"></a>

### PathParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters. |

<a name="Params"></a>

### Params : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters. |

<a name="FocusParams"></a>

### FocusParams : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Editor tab id. |
| [path] | <code>string</code> | Full file path, including file name. |
| [params] | <code>object</code> | Custom parameters. |

<a name="FileDirtyParams"></a>

### EditorDirtyParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Full file path, including file name. |
| dirty | <code>boolean</code> | File dirty state. |
| [params] | <code>Object.&lt;any, any&gt;</code> | Extra parameters. |

<a name="GetOpenedParams"></a>

### GetOpenedParams : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| basePath | <code>string</code> | If provided, it will only return files with a matching base path. |

## Example

If you want your view to just communicate with the layout that it's in:

```javascript
const layoutHub = new LayoutHub();
```

If you want your view to just communicate with the layout that somewere else in the application:

```javascript
const layoutHub = new LayoutHub('other-layout-id');
```

If you want your view/perspective to be registered as a layout or layout-containing and receive layout events:

```javascript
const layoutHub = new LayoutHub('some-layout-id', true);
```

To open a view:

```javascript
layoutHub.openView({
    id: 'exampleView',
    params: {
        title: 'Example',
    }
});
```