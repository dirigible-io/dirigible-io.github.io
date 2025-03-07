---
title: Extensions (Client)
---

Extensions (Client)
===

Used for getting extensions that registered on the platform.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/extensions.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/extensions.js)
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

### Set custom extension points

You can set custom extension points in your shell, right before you initialize anything else. After you do, all nested perspectives/views/etc. will automatically use the new information.

```javascript
setExtPoints({
  perspectives = ['custom-perspectives'],
  shells = ['custom-shells'],
  views = ['custom-views'],
  subviews = ['custom-subviews'],
  editors = ['custom-editors'],
  menus = ['custom-menus'],
  windows = ['custom-windows'],
  themes = ['custom-themes'],
  settings = ['custom-settings'],
});
angular.module('shell', ...
```

Parameter     | Description | Required
------------ | ----------- | -----------
**perspectives**   | List of perspective extension points | no
**shells**   | List of shell extension points | no
**views**   | List of view extension points | no
**subviews**   | List of subview extension points | no
**editors**   | List of editor extension points | no
**menus**   | List of menu extension points | no
**windows**   | List of dialog window extension points | no
**themes**   | List of theme extension points | no
**settings**   | List of setting extension points | no

### Get custom extension points

```javascript
const extPoints = getExtPoints();
```

The extPoints constant will be a reference to the global extension points information object, which will have the same structure as the set function object parameter.

### Add custom extension points

In some cases, you may want to add an extension point to the default/already set ones.

```javascript
addExtPoints({
  perspective = 'custom-perspectives',
  shell = 'custom-shells',
  view = 'custom-views',
  subview = 'custom-subviews',
  editor = 'custom-editors',
  menu = 'custom-menus',
  window = 'custom-windows',
  theme = 'custom-themes',
  setting = 'custom-settings',
});
angular.module('shell', ...
```

Parameter     | Description | Required
------------ | ----------- | -----------
**perspective**   | Perspective extension point | no
**shell**   | Shell extension point | no
**view**   | View extension point | no
**subview**   | Subview extension point | no
**editor**   | Editor extension point | no
**menu**   | Menu extension point | no
**window**   | Dialog window extension point | no
**theme**   | Theme extension point | no
**setting**   | Setting extension point | no

### Remove extension points

In some cases, you may want to remove an extension point from the default/already set ones.

```javascript
removeExtPoints({
  perspective = 'custom-perspectives',
  shell = 'custom-shells',
  view = 'custom-views',
  subview = 'custom-subviews',
  editor = 'custom-editors',
  menu = 'custom-menus',
  window = 'custom-windows',
  theme = 'custom-themes',
  setting = 'custom-settings',
});
angular.module('shell', ...
```

Parameter     | Description | Required
------------ | ----------- | -----------
**perspective**   | Perspective extension point | no
**shell**   | Shell extension point | no
**view**   | View extension point | no
**subview**   | Subview extension point | no
**editor**   | Editor extension point | no
**menu**   | Menu extension point | no
**window**   | Dialog window extension point | no
**theme**   | Theme extension point | no
**setting**   | Setting extension point | no

### Extensions API

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