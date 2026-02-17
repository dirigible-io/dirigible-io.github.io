---
layout: help
title: Shell
icon: none
group: help-features
---

Shell
===

The shell is the topmost part of the Dirigible UI platform and it cannot be shown inside an iframe. It contains all the perspectives and views, and it acts as the centrilized event hub.

Extension
---

You can register a new shell using the `platform-shells` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-shell/configs/shell.js",
    "extensionPoint": "platform-shells",
    "description": "Dirigible IDE Shell"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new shell in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
const shellData = {
	id: 'exampleShell',
	path: '/services/web/new-shell/shell.html',
	label: 'Example Shell'
};
if (typeof exports !== 'undefined') {
	exports.getShell = () => shellData;
}
```

* `shellData` - This is the configuration object itself. It must be a const and it must always be called "shellData".
	* `id` - Unique shell ID.
	* `path` - Link to the shell html file.
	* `label` - User-facing name. Used when listing all shells.
* `getShell` - The "getShell" function must return the configuration object and it must be exported.

!!! Note
	Since this configuration module is used by both client and server, you must always check if exports is undefined before exporting.

Shell
---

Example of a basic shell:

```html
<!DOCTYPE html>
<!-- The app and controller name must be set at the topmost level -->
<html lang="en" ng-app="shell" ng-controller="ShellController" xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- The brand-icon directive will automatically set the icon from the brand config -->
        <link brand-icon rel="icon" href="data:;base64,iVBORw0KGgo=" />
        
		<!-- The brand-title directive will automatically set the title based on the currently selected perspective -->
        <title brand-title></title>
        
		<!-- Shell config. Place this before the shell services -->
        <script type="text/javascript" src="/services/web/new-shell/configs/shell.js"></script>
        
		<!-- Shell services and styles -->
        <meta name="platform-links" category="ng-view,ng-shell">
    </head>

    <body>
        <!-- Shell header. Contains brand logo and title, menus, notification popover, user info, etc -->
        <shell-header></shell-header>
        
		<!-- Perspective container. It contains the sidebar and all registered perspectives -->
        <perspective-container condensed="false"></perspective-container>
        
		<!-- Shell status bar. It contains a loading indicator, information strip, error strip and a selection label -->
        <status-bar></status-bar>

        <!-- Platform dialog functionality -->
        <dialogs></dialogs>
        
		<!-- Global context menu -->
        <context-menu></context-menu>

        <!-- Shell controller. This can be a separate file, if the controller is too big. -->
        <script type="text/javascript">
            angular.module('shell', ['platformShell', 'blimpKit'])
                .controller('ShellController', ($scope) => { });
        </script>

        <!-- Theme support. This must always be placed last -->
        <theme></theme>
    </body>

</html>
```

#### Shell URL parameters

You can control which perspective and which view will be focused on initial load using url parameters.

**Parameters**

| Param | Type | Description |
| --- | --- | --- |
| perspective | <code>string</code> | Perspective id. |
| view | <code>string</code> | View id. |

Example:
```
/services/web/shell-ide/?perspective=operations&view=jobs
```

#### Custom sidebar list

You can manually set the perspective list. Just add `config="sidebarConfig"` as an attribute the the `perspective-container` directive.

```html
<perspective-container condensed="false" config="sidebarConfig"></perspective-container>
```

The following is an example sidebar config:

```javascript
$scope.sidebarConfig = {
    perspectives: [
        {
            id: 'examplePerspectiveGroup',
            label: 'Group',
            expanded: true,
            icon: '/services/web/example-project/images/example.svg',
            headerLabel: 'Group header',
            items: [
                {
                    id: 'examplePerspective',
                    label: 'Example',
                    path: '/services/web/example-project/perspectives/perspective.html',
                    groupId: 'examplePerspectiveGroup',
                    icon: '/services/web/example-project/images/example.svg'
                }
            ]
        },
        {
            id: 'examplePerspective2',
            label: 'Example 2',
            path: '/services/web/example-project/perspectives/custom-layout.html',
            icon: '/services/web/example-project/images/example.svg',
            headerLabel: 'Perspective header'
        }
    ],
    utilities: [
        {
            id: 'exampleUtilityPerspective',
            label: 'Utility',
            path: '/services/web/example-project/perspectives/utility.html',
            icon: '/services/web/example-project/images/example.svg',
        }
    ]
};
```

The project structure should look like this:

```
new-shell
- extensions
    - shell.extension
- configs
    - shell.js
- shell.html
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).