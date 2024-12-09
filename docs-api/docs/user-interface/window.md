---
layout: help
title: Window
icon: none
group: help-features
---

Window
===

Windows are views that are opened inside a dialog window.

API
---

[DialogHub](/api/user-interface/dialog/)

Extension
---

You can register a new window using the `platform-windows` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-window/configs/window.js",
    "extensionPoint": "platform-windows",
    "description": "Window view"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new window in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
const viewData = {
    id: 'exampleWindow',
    label: 'Example window',
    path: '/services/web/new-window/window.html',
};
if (typeof exports !== 'undefined') {
    exports.getView = () => viewData;
}
```

* `viewData` - This is the configuration object itself. It must be a const and it must always be called "viewData".
	* `id` - Unique window ID.
	* `path` - Link to the window html file.
	* `label` - User-facing name. Shown in the header of the dialog window.
* `getView` - This function must return the configuration object and it must be exported.

!!! Note
	Since this configuration module is used by both client and server, you must always check if exports is undefined before exporting.

Window
---

```html
<!DOCTYPE HTML>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="exampleWindow" ng-controller="ExampleWindowController">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Fake icon -->
        <link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=">
        
        <!-- Title directive that will automatically create a title based on the window config -->
        <title config-title></title>
        
        <!-- Window configuration module -->
        <script type="text/javascript" src="/services/web/new-window/configs/window.js"></script>
        
        <!-- Base view services and styles -->
        <script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=view-js"></script>
        <link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?id=view-css" />
    </head>

    <body>
        <bk-message-page glyph="sap-icon--information">
			<bk-message-page-title>{{::title}}</bk-message-page-title>
			<bk-message-page-subtitle>{{::subtitle}}</bk-message-page-subtitle>
		</bk-message-page>

        <!-- Window controller -->
        <script type="text/javascript">
            const exampleWindow = angular.module('exampleWindow', ['blimpKit', 'platformView']);
            exampleWindow.controller('ExampleWindowController', ($scope) => {
                $scope.title = 'Example window';
                $scope.subtitle = `Lorem ipsum...`;
            });
        </script>
        
        <!-- Theme support. This must always be placed last -->
        <theme></theme>
    </body>

</html>
```

The project structure should look like this:

```
new-window
- extensions
    - window.extension
- configs
    - window.js
- window.html
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).