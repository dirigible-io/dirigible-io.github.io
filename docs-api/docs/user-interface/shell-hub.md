---
title: ShellHub
---

ShellHub
===

Controls the shell. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/shell-hub.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/shell-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/shell-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, shell hub support is automatically enabled.

If you are making a custom view, you can include the API using the web link above.

To initialize it:

```javascript
const shellHub = new ShellHub();
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**showPerspective(IdParamObject)**   | Shows a perspective. | -
**onShowPerspective(handlerFunc)**   | Registers a listener. Triggered when a perspective should be shown. Returns a function to unregister the listener. | *function*

## Typedefs

<dl>
<dt><a href="#IdParamObject">IdParamObject</a> : <code>Object</code></dt>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="IdParamObject"></a>

### IdParamObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Perspective id. |
| [params] | <code>object</code> | Custom parameters. See [ViewParameters](../viewParameters). |

## Example

```javascript
shellHub.openView({
    id: 'exampleView',
    params: {
        title: 'Example',
    }
});
```