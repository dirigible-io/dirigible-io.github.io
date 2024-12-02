---
title: Layout
---

Layout
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
**showPerspective(IdParamObject)**   | Shows a perspective. | -
**onShowPerspective(handlerFunc)**   | Registers a listener. Triggered when a perspective should be shown. Returns a function to unregister the listener. | *function*
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

## Typedefs

<dl>
<dt><a href="#IdParamObject">IdParamObject</a> : <code>Object</code></dt>
</dd>
<dt><a href="#ParamsObject">ParamsObject</a> : <code>Object</code></dt>
</dd>
<dt><a href="#ViewDirtyObject">ViewDirtyObject</a> : <code>Object</code></dt>
</dd>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="IdParamObject"></a>

## IdParamObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | View id. |
| [params] | <code>object</code> | Custom parameters. See [ViewParameters](../viewParameters). |

<a name="ParamsObject"></a>

## ParamsObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>object</code> | Custom parameters. See ViewParameters. |

<a name="ViewDirtyObject"></a>

## ViewDirtyObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | View id. |
| dirty | <code>boolean</code> | Dirty state. |
| [params] | <code>object</code> | Custom parameters. See ViewParameters. |


## Example

```javascript
layoutHub.openView({
    id: 'exampleView',
    params: {
        title: 'Example',
    }
});
```