---
title: Create View
---

Create View
===

All views in Eclipse Dirigible are loaded via the `ide-view` extension point. List with all extension points can be found at the [Extensions Overview](/help/development/extensions/) page. To develop a new view, _extension_, _view definition_ and _frontend resources_ should be created. The following example is using [AngularJS](https://angularjs.org/) and [Fundamental Library](https://sap.github.io/fundamental/).

### Steps

1. Start Eclipse Dirigible.

    !!! info 

        You can find more information on how to do that by following:

        - [Getting Started](https://www.dirigible.io/help/development/) section.
        - [Setup](https://www.dirigible.io/help/setup/) section.

1. Go to the `Projects` perspective and create `New Project`.

    - Enter `my-view` for the name of the project.
    - The project will appear under the projects list.

1. Create view extension:

    - Right click on the `my-view` project and select **New &#8594; Folder**.
    - Enter `view` for the name of the folder.
    - Create `view.extension` and `view.js` files.

    === "view.extension"

        1. Right click on the `view` folder and select **New &#8594; Extension**.
        1. Enter `view.extension` for the name of the file.
        1. Right click on the `view.extension` file and select **Open With &#8594; Code Editor**.
        1. Replace the content with the following definition:

            ```json
            {
                "module": "my-view/view/view.js",
                "extensionPoint": "ide-view",
                "description": "My View"
            }
            ```
        
        1. Save the changes and close the _Code Editor_.
        1. _(optional)_ Double click on the `view.extension` file to open the extension with the _Extension Editor_. 

    === "view.js"

        1. Right click on the `view` folder and select **New &#8594; JavaScript CJS Service**.
        1. Enter `view.js` for the name of the file.
        1. Double click on the `view.js` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```javascript
            const viewData = {
                id: "my-view",
                label: "My View",
                factory: "frame",
                region: "bottom",
                link: "../my-view/index.html",
            };
            
            if (typeof exports !== 'undefined') {
                exports.getView = function () {
                    return viewData;
                }
            }
            ```

        1. Save the changes and close the _Code Editor_.

1. Create view frontend resources:

    - Create `index.html` and `controller.js` files.

    === "index.html"

        1. Right click on the `my-view` project and select **New &#8594; HTML5 Page**.
        1. Enter `index.html` for the name of the file.
        1. Double click on the `index.html` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```html
            <!DOCTYPE HTML>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="myView" ng-controller="MyViewController as mvc">
            
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
            
                    <!-- Fake favicon to silent console errors and not waste a get request -->
                    <link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=">
            
                    <!-- Title directive -->
                    <title dg-view-title></title>
            
                    <!-- View data -->
                    <script type="text/javascript" src="/services/v4/web/ide-example/services/game-view.js"></script>
            
                    <!-- jQuery -->
                    <script type="text/javascript" src="/webjars/jquery/3.6.0/jquery.min.js"></script>
                    <!-- AngularJS -->
                    <script type="text/javascript" src="/webjars/angularjs/1.8.2/angular.min.js"></script>
                    <script type="text/javascript" src="/webjars/angularjs/1.8.2/angular-resource.min.js"></script>
                    <script type="text/javascript" src="/webjars/angular-aria/1.8.2/angular-aria.min.js"></script>
            
                    <!-- Fundamental-styles -->
                    <link type="text/css" rel="stylesheet" href="/webjars/fundamental-styles/0.24.0/dist/fundamental-styles.css">
                    <theme></theme>
            
                    <!-- Dirigible styles -->
                    <link type="text/css" rel="stylesheet" href="/services/v4/web/resources/styles/core.css" />
                    <link type="text/css" rel="stylesheet" href="/services/v4/web/resources/styles/widgets.css" />
            
                    <!-- MessageHub -->
                    <script type="text/javascript" src="/services/v4/web/ide-core/core/message-hub.js"></script>
                    <script type="text/javascript" src="/services/v4/web/ide-core/core/ide-message-hub.js"></script>
            
                    <!-- IDE Core UI -->
                    <script type="text/javascript" src="/services/v4/web/ide-core/ui/theming.js"></script>
                    <script type="text/javascript" src="/services/v4/web/ide-core/ui/widgets.js"></script>
                    <script type="text/javascript" src="/services/v4/web/ide-core/ui/view.js"></script>
            
                    <!-- Project-specific stuff -->
                    <script type="text/javascript" src="controller.js"></script>
                </head>
            
                <body class="fd-scrollbar" dg-contextmenu="contextMenuContent">
            
                    <fd-fieldset>
                        <fd-form-group dg-header="My Form">
                            <fd-form-item horizontal="true">
                                <fd-form-label for="idName" dg-required="true" dg-colon="true">Name</fd-form-label>
                                <fd-input id="idName" type="text" placeholder="Enter name here" ng-model="inputData.name">
                                </fd-input>
                            </fd-form-item>
                            <fd-form-item horizontal="true">
                                <fd-form-label for="idEmail" dg-required="true" dg-colon="true">Email</fd-form-label>
                                <fd-input id="idEmail" type="text" placeholder="Enter email here" ng-model="inputData.email">
                                </fd-input>
                            </fd-form-item>
                        </fd-form-group>
                    </fd-fieldset>
            
                    <button class="fd-button fd-button--emphasized" ng-click="saveForm()" style="margin: 6px;">Save</button>
            
                    <table fd-table display-mode="compact" style="margin-top: 20px">
                        <thead fd-table-header>
                            <tr fd-table-row>
                                <th fd-table-header-cell>Name</th>
                                <th fd-table-header-cell>Email</th>
                            </tr>
                        </thead>
                        <tbody fd-table-body>
                            <tr fd-table-row hoverable="true" ng-repeat="next in data">
                                <td fd-table-cell>{{next.name}}</td>
                                <td fd-table-cell activable="true"><a class="fd-link">{{next.email}}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </body>
            
            </html>

            ```

        1. Save the changes and close the _Code Editor_.

    === "controller.js"

        1. Right click on the `my-view` project and select **New &#8594; File**.
        1. Enter `controller.js` for the name of the file.
        1. Double click on the `controller.js` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```javascript
            let myView = angular.module("myView", ["ideUI", "ideView"]);

            myView.config(["messageHubProvider", function (messageHubProvider) {
                messageHubProvider.eventIdPrefix = "myView";
            }]);
            
            myView.controller("MyViewController", ["$scope", "$http", "messageHub", function ($scope, $http, messageHub) {
            
                $scope.inputData = {};
            
                $scope.data = [{
                    name: "John Doe",
                    email: "john.doe@email.com"
                }, {
                    name: "Jane Doe",
                    email: "jane.doe@email.com"
                }];
            
                $scope.saveForm = function () {
                    messageHub.showAlertInfo(
                        "Form Successfully Save",
                        `Name: ${$scope.inputData.name}, Email: ${$scope.inputData.email}`
                    );
                };
            
            }]);
            ```

        1. Save the changes and close the _Code Editor_.

1. Refresh the browser.

    !!! info 

        In some cases you may want to go to **Theme &#8594; Reset** to clean Web IDE state.

1. Go to **Window &#8594; Show View &#8594; My View** to open the new view.