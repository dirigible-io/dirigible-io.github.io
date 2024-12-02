---
title: ViewParameters
---

ViewParameters
===

In Dirigible all [Views](/help/development/platform-ui/view/), [Subviews](/help/development/platform-ui/subview/), [Editors](/help/development/platform-ui/editor/), [Windows](/help/development/platform-ui/window/) and [Perspectives](/help/development/platform-ui/perspective/) have parameters assigned to them using the `data-parameter` attribute.

`ViewParameters` is used to get and parse those parameters to a JavaScript object.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/view.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/view.js)
- Web Link: `/services/web/platform-core/ui/platform/view.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, ViewParameters support is enabled automatically.

To initialize it, place this in your code:

```javascript
exampleView.controller('ExampleViewController', ($scope, ViewParameters) => {...});
```

If you are making a custom view, you can manually get the parameters:

```javascript
let dataParameters;
if (window.frameElement && window.frameElement.hasAttribute('data-parameters')) {
    dataParameters = JSON.parse($window.frameElement.getAttribute('data-parameters'));
}
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**get()**   | Returns all view parameters. | *Promise*

## Example

```javascript
let dataParameters = ViewParameters.get();
```