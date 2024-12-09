---
layout: help
title: Editor
icon: none
group: help-features
---

Editor
===

Editors are views that are meant for File IO operations.

Extension
---

You can register a new editor using the `platform-editors` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-editor/configs/editor.js",
    "extensionPoint": "platform-editors",
    "description": "Example editor"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new editor in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
const editorData = {
	id: 'example-editor',
	region: 'center',
	label: 'TXT editor',
	path: '/services/web/new-editor/editor.html',
    defaultEditor: false,
	contentTypes: [
		'text/plain',
	]
};
if (typeof exports !== 'undefined') {
	exports.getEditor = () => editorData;
}
```

* `editorData` - This is the configuration object itself. It must be a const and it must always be called "editorData".
	* `id` - Unique view ID.
	* `path` - Link to the view html file.
	* `label` - User-facing name. Shown in the 'Open with' menu.
    * `region` - The layout region in which the view should be shown. There are four options:
        * left
        * right
        * center
        * bottom
    * `defaultEditor` - Set this as the default editor. If another editor is already set as default, you will get an error.
    * `contentTypes` - List of file mime types that the editor can work with.
* `getEditor` - This function must return the configuration object and it must be exported.

!!! Note
	Since this configuration module is used by both client and server, you must always check if exports is undefined before exporting.

Editor
---

```html
<!DOCTYPE HTML>
<!-- The app and controller name must be set at the topmost level -->
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="editor" ng-controller="EditorController">

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Fake icon -->
		<link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=">
		<!-- Title directive that will automatically create a title based on the view config -->
		<title config-title></title>
		<!-- Editor configuration module -->
		<script type="text/javascript" src="/services/web/new-editor/configs/editor.js"></script>
		<!-- Editor services and view styles -->
		<script type="text/javascript" src="/services/js/platform-core/services/loader.js?id=editor-js"></script>
		<link type="text/css" rel="stylesheet" href="/services/js/platform-core/services/loader.js?id=view-css" />
		<!-- Editor controller -->
		<script type="text/javascript" src="js/editor.js"></script>
	</head>
    <!-- Set the 'Ctrl+S' shortcut, for saving the file -->
	<body class="bk-vbox bk-padding" shortcut="'ctrl+s'" shortcut-action="saveShortcut">
		<!-- Loading indicator -->
		<bk-busy-indicator-extended class="bk-fill-parent" ng-hide="state.error || !state.isBusy" size="l">{{::state.busyText}}</bk-busy-indicator-extended>
		<!-- Editor text area -->
		<bk-form-label for="eta" colon="true">File content</bk-form-label>
		<bk-textarea id="eta" class="bk-fill-parent" ng-model="file.model" ng-change="modelChange()" ng-show="!state.error && !state.isBusy"></bk-textarea>
		<!-- Error page in case loading fails -->
		<bk-message-page glyph="sap-icon--error" ng-if="state.error">
			<bk-message-page-title>Editor encounterd an error!</bk-message-page-title>
			<bk-message-page-subtitle>{{errorMessage}}</bk-message-page-subtitle>
		</bk-message-page>
		<!-- Theme support. This must always be placed last -->
		<theme></theme>
	</body>

</html>
```

```javascript
const editor = angular.module('editor', [
    'blimpKit',
    'platformView',
    'platformShortcuts', // Enable shortcut functionality, using the 'shortcut' directive
    'WorkspaceService']); // Include the WorkspaceService for working with files
editor.controller('EditorController', function ($scope, $window, WorkspaceService, ViewParameters) {
    const statusBarHub = new StatusBarHub(); // This is an API based on MessageHub for communicating with the shell's status bar
    const layoutHub = new LayoutHub(); // This is an API based on MessageHub for communicating with the layout
    $scope.state = {
        isBusy: true,
        error: false,
        busyText: 'Loading...',
    };
    $scope.file = {
        model: '', // Keep the file content/model in an object
    };

    // When the editor is focused, clean the status bar label (or set the proper one).
    angular.element($window).bind('focus', () => {
        statusBarHub.showLabel('');
    });

    // Whenever there is a change to the file model, mark the file as dirty
    $scope.modelChange = () => {
        layoutHub.setEditorDirty({
            path: $scope.dataParameters.filePath,
            dirty: true,
        });
    };

    $scope.saveShortcut = (keySet, event) => {
        event.preventDefault();
        if (keySet === 'ctrl+s') {
            $scope.state.isBusy = true;
            WorkspaceService.saveContent($scope.dataParameters.filePath, $scope.file.model).then(() => {
                // Clean the dirty status, once the file has been saved.
                layoutHub.setEditorDirty({
                    path: $scope.dataParameters.filePath,
                    dirty: false,
                });
                $scope.$evalAsync(() => {
                    $scope.state.isBusy = false;
                });
            }, (response) => {
                console.error(response);
                $scope.$evalAsync(() => {
                    $scope.state.error = true;
                    $scope.errorMessage = 'Error while saving file';
                    $scope.state.isBusy = false;
                });
            });
        }
    };

    const loadFileContents = () => {
        $scope.state.isBusy = true;
        WorkspaceService.loadContent($scope.dataParameters.filePath).then((response) => {
            $scope.$evalAsync(() => {
                $scope.file.model = response.data;
                $scope.state.isBusy = false;
            });
        }, (response) => {
            console.error(response);
            $scope.$evalAsync(() => {
                $scope.state.error = true;
                $scope.errorMessage = 'Error while loading file';
                $scope.state.isBusy = false;
            });
        });
    };

    // If the editor has been focused from the outside, clean the status bar label (or set the proper one).
    layoutHub.onFocusView((data) => {
        if (data.params && data.params.resourcePath === $scope.dataParameters.filePath) statusBarHub.showLabel('');
    });

    // If the file changes (rename, move, etc) outside the editor, parameters will be changed and should be reloaded.
    layoutHub.onReloadEditorParams((data) => {
        if (data.path === $scope.dataParameters.filePath) {
            $scope.$evalAsync(() => {
                $scope.dataParameters = ViewParameters.get();
            });
        };
    });

    // Use ViewParameters to get the editor parameters like 'filePath'
    $scope.dataParameters = ViewParameters.get();
    if (!$scope.dataParameters.hasOwnProperty('filePath')) {
        $scope.state.error = true;
        $scope.errorMessage = "The 'filePath' data parameter is missing.";
    } else {
        loadFileContents();
    }
});
```

The project structure should look like this:

```
new-editor
- extensions
    - editor.extension
- configs
    - editor.js
- js
    - editor.js
- editor.html
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).