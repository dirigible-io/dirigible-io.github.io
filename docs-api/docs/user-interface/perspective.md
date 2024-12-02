---
layout: help
title: Perspective
icon: none
group: help-features
---

Perspective
===

The perspective is what sits inside a [shell's](../shell) main container. This is the part that holds the layout, the views inside the layout and it can act as a data hub for those views.

There are two types of perspective:

* Perspective - This is default one.
* Utility perspective - Same as the default but it will be listed at the bottom of the vertical navigation.

Extension
---

You can register a new perspective using the `platform-perspectives` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-perspective/configs/perspective.js",
    "extensionPoint": "platform-perspectives",
    "description": "Example perspective"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new perspective in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
const perspectiveData = {
	id: 'examplePerspective',
	label: 'Example',
	path: '/services/web/new-perspective/perspective.html',
	groupId: 'examplePerspectiveGroup',
	order: 1000,
	icon: '/services/web/new-perspective/images/sample.svg',
};
if (typeof exports !== 'undefined') {
	exports.getPerspective = () => perspectiveData;
    // or for utility
    exports.getUtilityPerspective = () => perspectiveData;
}
```

* `perspectiveData` - This is the configuration object itself. It must be a const and it must always be called "perspectiveData".
	* `id` - Unique perspective ID.
	* `path` - Link to the perspective html file.
	* `label` - User-facing name. Shown in the vertical navigation.
    * `groupId` - If the perspective is part of a perspective group, you must provide the group id here.
    * `order` - Used to sort the tabs in the vertical navigation (or in the group it belongs to).
    * `icon` - Path to an SVG icon, that will be shown in the vertical navigation.
* `getPerspective` - This function must return the configuration object and it must be exported.
* `getUtilityPerspective` - Same as "getPerspective" but used for utility perspectives.

!!! Note
	Since this configuration module is used by both client and server, you must always check if exports is undefined before exporting.

Perspective
---

Perspective with a default layout:

```html
<!DOCTYPE HTML>
<!-- The app and controller name must be set at the topmost level -->
<html lang="en" ng-app="example" ng-controller="ExamplePerspectiveController" xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- Title directive that will automatically create a title based on the perspective config -->
		<title config-title></title>

		<!-- Fake icon -->
		<link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=" />

		<!-- Perspective config -->
		<script type="text/javascript" src="/services/web/new-perspective/configs/perspective.js"></script>

		<!-- Perspective services and styles -->
		<script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=perspective-js"></script>
		<link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?id=perspective-css" />

		<!-- Perspective controller -->
		<script type="text/javascript" src="js/perspective.js"></script>

	</head>

	<body>
		<!-- Default layout -->
		<layout config="::layoutConfig"></layout>
		
        <!-- Theme support -->
		<theme></theme>
	</body>

</html>
```

```javascript
const examplePerspective = angular.module('example', ['platformView', 'platformLayout', 'blimpKit']);
// Initialize controller
examplePerspective.controller('ExamplePerspectiveController', ($scope) => {
    $scope.layoutConfig = {
        // Array of view ids
        views: ['exampleViewLeft', 'exampleViewBottom', 'exampleViewCenter'],
        viewSettings: {
            'exampleViewLeft': { expanded: true },
            'exampleViewCenter': { closable: true },
        },
        layoutSettings: {
            hideCenterPane: false,
            leftPaneMinSize: 240
        },
    };
});
```

The `layoutConfig` will be used for creating the layout and populating it with views.

* `views` - This is an array that holds the IDs of the views that should be inside the layout.
* `viewSettings` - This is an object that you can use to set some view-specific settings by using the view ID as key. There are two settings available:
    * `expanded` - If the view is positioned on the left or right side, it will have the ability to be expanded or collapsed. By default, the first one will be expanded.
    * `closable` - If the view is positioned in the center of the layout, it will be closable by default. You can set this to false to stop the view from being closed.
* `layoutSettings` - Layout configuration
    * `hideCenterPane` - The center pane is shown by default. If set to true, the bottom pane will be expanded to cover the center pane.
    * `hideCenterTabs` - Center pane will be shown but the tab bar will be hidden.
    * `hideBottomTabs` - Bottom pane will be shown but the tab bar will be hidden.
    * `leftPaneSize` - Size the left pane in percentages.
    * `leftPaneMinSize` - Minimum size of the left pane in pixels.
    * `leftPaneMaxSize` - Maximum size of the left pane in pixels.
    * `rightPaneSize` - Size the right pane in percentages.
    * `rightPaneMinSize` - Minimum size of the right pane in pixels.
    * `rightPaneMaxSize` - Maximum size of the left pane in pixels.
    * `bottomPaneSize` - Size the bottom pane in percentages.


Perspective with a custom layout:

```html
<!DOCTYPE html>
<!-- The app and controller name must be set at the topmost level -->
<html lang="en" ng-app="example" ng-controller="ExamplePerspectiveController" xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Title directive that will automatically create a title based on the perspective config -->
        <title config-title></title>

        <!-- Fake icon -->
        <link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=" />

        <!-- Perspective config -->
        <script type="text/javascript" src="/services/web/new-perspective/configs/perspective.js"></script>

        <!-- Base perspective services and styles -->
        <script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=perspective-js"></script>
        <link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?id=perspective-css" />
    </head>

    <body>
        <!-- Custom layout -->
        <split direction="horizontal">
            <split-pane size="50" min-size="0" snap-offset="100">
                <embedded-view view-id="exampleViewLeft"></embedded-view>
            </split-pane>
            <split-pane size="50" min-size="0" snap-offset="100">
                <embedded-view view-id="exampleViewRight"></embedded-view>
            </split-pane>
        </split>
        
        <!-- Perspective controller. This can be a separate file, if the controller is too big. -->
        <script type="text/javascript">
            angular.module('example', ['platformView', 'platformSplit', 'blimpKit'])
                .controller('ExamplePerspectiveController', ($scope) => {});
        </script>
        
        <!-- Theme support -->
        <theme></theme>
    </body>

</html>
```

The project structure should look like this:

```
new-perspective
- extensions
    - perspective.extension
- configs
    - perspective.js
- js
    - perspective.js
- perspective.html
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).