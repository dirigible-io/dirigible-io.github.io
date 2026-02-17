---
layout: help
title: View
icon: none
group: help-features
---

View
===

Views are the most important part of the Dirigible UI platform. Views can be displayed inside layouts, [perspectives](../perspective), dialogs and even outside the Dirigible shell as standalone web apps.

Extension
---

You can register a new view using the `platform-views` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-view/configs/view.js",
    "extensionPoint": "platform-views",
    "description": "Example view"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new view in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
const viewData = {
    id: 'exampleView',
    label: 'New view',
    region: 'center',
    path: '/services/web/new-view/view.html',
    lazyLoad: true,
    autoFocusTab: true,
};
if (typeof exports !== 'undefined') {
    exports.getView = () => viewData;
}
```

* `viewData` - This is the configuration object itself. It must be a const and it must always be called "viewData".
	* `id` - Unique view ID.
	* `path` - Link to the view html file.
	* `label` - User-facing name. Shown in the tab.
    * `region` - The layout region in which the view should be shown. There are four options:
        * left
        * right
        * center
        * bottom
    * `lazyLoad` - When set to true, the view will load only when it becomes visible to the user.
    * `autoFocusTab` - If true, the view will automatically send a focus request to the layout to focus its tab. Center and bottom views should have this enabled.
* `getView` - This function must return the configuration object and it must be exported.

!!! Note
	Since this configuration module is used by both client and server, you must always check if exports is undefined before exporting.

View
---

```html
<!DOCTYPE HTML>
<!-- The app and controller name must be set at the topmost level -->
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="exampleView" ng-controller="ExampleViewController">

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Fake icon -->
		<link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=">
		
        <!-- Title directive that will automatically create a title based on the view config -->
		<title config-title></title>
		
        <!-- View configuration module -->
		<script type="text/javascript" src="/services/web/new-view/configs/view.js"></script>
		
        <!-- View services and styles -->
		<meta name="platform-links" category="ng-view">
		
        <!-- View controller -->
		<script type="text/javascript" src="js/view.js"></script>
	</head>

	<body>
        <bk-message-page glyph="sap-icon--information">
			<bk-message-page-title>{{::title}}</bk-message-page-title>
			<bk-message-page-subtitle>{{::subtitle}}</bk-message-page-subtitle>
		</bk-message-page>
		<!-- Theme support. This must always be placed last -->
		<theme></theme>
	</body>

</html>
```

```javascript
const exampleView = angular.module('exampleView', ['blimpKit', 'platformView']);
// Initialize controller
exampleView.controller('ExampleViewController', ($scope) => {
    $scope.title = 'Example view';
    $scope.subtitle = `Lorem ipsum...`;
});
```

The project structure should look like this:

```
new-view
- extensions
    - view.extension
- configs
    - view.js
- js
    - view.js
- view.html
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).