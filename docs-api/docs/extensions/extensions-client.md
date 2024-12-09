---
title: Extensions (Client)
---

Extensions (Client)
===

Used for getting extensions that registered on the platform.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/extensions.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/extensions.js)
- Web Link: `/services/web/platform-core/ui/platform/extensions.js`
- Status: `stable`
- Group: `platform`

### Extension files

Extensions are used for creating custom modules and extend the functionality of the platform. They can be used both for client and server modules.

An extension must first be registered with an [extension point](../extension-point/). It is a simple JSON formatted `*.extension` file and can be placed anywhere in your project, although it's recommended to place it inside an `extensions` folder, in the root of your project.

```json
{
    "module": "module.js",
    "extensionPoint": "extension-point-name",
    "description": "Example extension"
}
```

The module is a simple JavaScript file that exports functions and/or data.

```javascript
exports.getFunc = () => ({
	id: 'id-data',
	path: '/uri/path/to/an/api/',
	...
});
```

### Basic Usage

If you are using the standard Dirigible view configuration, extensions support is enabled automatically. All you have to do is to include `Extensions` in your controller.

```javascript
exampleView.controller('ExampleViewController', ($scope, Extensions) => {
    Extensions.getViews().then((response) => {
        console.log(response.data);
    }, (error) => {
        console.error(error);
    });
});
```

If you are making a custom view, you can include the API (called `platformExtensions`) using the web link above, include it in your app module and then include `Extensions` in your controller:

```javascript
const exampleView = angular.module('exampleView', [
    ...
    'platformExtensions',
]);
exampleView.controller('ExampleViewController', ($scope, Extensions) => {...});
```

If you have custom extension points and extensions, then you can call your [extension service](../extensions-server/) using any HTTP capable library (like $http or fetch) and get the data.

```javascript
$http.get('/services/js/project-name/services/new-service.js').then((response) => {
	console.log(response);
});
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getViews(ExPointArray)**   | Returns all registered views. | *Promise*
**getSubviews(ExPointArray)**   | Returns all registered subviews. | *Promise*
**getWindows(ExPointArray)**   | Returns all registered windows. | *Promise*
**getSettings(ExPointArray)**   | Returns all registered settings. | *Promise*
**getEditors(ExPointArray)**   | Returns all registered editors. | *Promise*
**getPerspectives(ExPointArray)**   | Returns all registered perspectives. | *Promise*
**getShells(ExPointArray)**   | Returns all registered shells. | *Promise*
**getMenus(ExPointArray)**   | Returns all registered menus. | *Promise*
**getThemes(ExPointArray)**   | Returns all registered themes. | *Promise*

!!! Note
	Params in square brackets are optional.

## Typedefs

<a name="ExPointArray"></a>

## ExPointArray : <code>Array</code>

| Type | Description |
| --- | --- |
| string | Extension point id. |

## Example

```javascript
Extensions.getViews().then((response) => {
    console.log(response.data);
}, (error) => {
    console.error(error);
});
```

If you have a custom extension point for your own views:

```javascript
const views = Extensions.getViews(['custom-point']);
```

If you want to mix extensions from the built-in extension-point and your custom one:

```javascript
const views = Extensions.getViews(['platform-views', 'custom-point']);
```