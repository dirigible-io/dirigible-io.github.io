---
title: ViewParameters
---

ViewParameters
===

In Dirigible all [Views](/help/development/platform-ui/view/), [Subviews](/help/development/platform-ui/subview/), [Editors](/help/development/platform-ui/editor/), [Windows](/help/development/platform-ui/window/) and [Perspectives](/help/development/platform-ui/perspective/) have parameters assigned to them using the `data-parameter` attribute.

`ViewParameters` is used to get and parse those parameters to a JavaScript object.

=== "Overview"
- Module: `platform-core`
- Source 1: [platform-core/ui/platform/view.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/view.js)
- Source 2: [platform-core/utilities/view-parameters.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/utilities/view-parameters.js)
- Web Link: `/services/web/platform-core/ui/platform/view.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, ViewParameters support is enabled automatically.

To initialize it, place this in your code:

```javascript
exampleView.controller('ExampleViewController', ($scope, ViewParameters) => {...});
```

If you are making a custom view, you can use the second source (Source 2):

```html
<link type="text/css" rel="stylesheet" href="/services/js/platform-core/utilities/view-parameters.js" />
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**ViewParameters.get()**   | Returns all view parameters. | *Object*
**getViewParameters(Params)**   | Returns all view parameters. | *Object*

## Typedefs

<dl>
<dt><a href="#Params">Params</a> : <code>Object</code></dt>
</dl>

!!! Note
    Params in square brackets are optional.

<a name="Params"></a>

### Params : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| [vframe] | <code>[window](https://developer.mozilla.org/en-US/docs/Web/API/Window)</code> | iframe window. |
| [attribute] | <code>string</code> | The attribute to get and parse. By default, it's `data-parameters`. |

!!! Note
	Params in square brackets are optional.

## Example

```javascript
let dataParameters = ViewParameters.get();
// or for custom views (Source 2)
let dataParameters = getViewParameters();
```