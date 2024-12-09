---
layout: help
title: Subview
icon: none
group: help-features
---

Subview
===

Subviews are views that are meant to be embedded inside other views.

Extension
---

You can register a new subview using the `platform-subviews` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-subview/configs/subview.js",
    "extensionPoint": "platform-subviews",
    "description": "Example subview"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new subview in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
const viewData = {
    id: 'exampleSubview',
    label: 'Subview example',
    path: '/services/web/new-subview/subview.html',
    lazyLoad: false,
};
if (typeof exports !== 'undefined') {
    exports.getView = () => viewData;
}
```

* `viewData` - This is the configuration object itself. It must be a const and it must always be called "viewData".
	* `id` - Unique view ID.
	* `path` - Link to the subview html file.
	* `label` - User-facing name. Shown when listing available subviews.
    * `lazyLoad` - When set to true, the view will load only when it becomes visible to the user.
* `getView` - This function must return the configuration object and it must be exported.

!!! Note
	Since this configuration module is used by both client and server, you must always check if exports is undefined before exporting.

Subview
---

```html
<!DOCTYPE HTML>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="exampleSubview" ng-controller="ExampleSubviewController">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Fake icon -->
        <link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=">
        
        <!-- Title directive that will automatically create a title based on the subview config -->
        <title config-title></title>
        
        <!-- Subview configuration module -->
        <script type="text/javascript" src="/services/web/new-subview/configs/subview.js"></script>
        
        <!-- Base view services and styles -->
        <script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=view-js"></script>
        <link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?id=view-css" />
    </head>

    <body>
        <bk-message-page glyph="sap-icon--information">
			<bk-message-page-title>{{::title}}</bk-message-page-title>
			<bk-message-page-subtitle>{{::subtitle}}</bk-message-page-subtitle>
		</bk-message-page>

        <!-- View controller -->
        <script type="text/javascript">
            const exampleSubview = angular.module('exampleSubview', ['blimpKit', 'platformView']);
            exampleSubview.controller('ExampleSubviewController', ($scope) => {
                $scope.title = 'Example subview';
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
new-subview
- extensions
    - subview.extension
- configs
    - subview.js
- subview.html
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).