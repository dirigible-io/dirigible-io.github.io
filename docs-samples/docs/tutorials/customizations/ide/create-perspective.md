---
title: Create Perspective
---

Create Perspective
===

All perspectives in Eclipse Dirigible are loaded via the `ide-perspective` extension point. To develop a new perspective, _extension_, _perspective definition_ and _frontend resources_ should be created. The following example is using [AngularJS](https://angularjs.org/) and [Fundamental Library](https://sap.github.io/fundamental/).

### Steps

1. Start Eclipse Dirigible.

    !!! info 

        You can find more information on how to do that by following:

        - [Getting Started](https://www.dirigible.io/help/development/) section.
        - [Setup](https://www.dirigible.io/help/setup/) section.

1. Go to the `Projects` perspective and create `New Project`.

    - Enter `my-perspective` for the name of the project.
    - The project will appear under the projects list.

1. Create perspective extension:

    - Right click on the `my-perspective` project and select **New &#8594; Folder**.
    - Enter `perspective` for the name of the folder.
    - Right click on the `perspective` folder and select **New &#8594; Folder**.
    - Enter `extensions` for the name of the folder.
    - Create `perspective.extension`, `perspective-menu.extension`, `perspective-menu-window.extension` and `perspective-menu-help.extension` files.

    === "perspective.extension"

        1. Right click on the `extensions` folder and select **New &#8594; Extension**.
        1. Enter `perspective.extension` for the name of the file.
        1. Right click on the `perspective.extension` file and select **Open With &#8594; Code Editor**.
        1. Replace the content with the following definition:

            ```json
            {
                "module": "my-perspective/perspective/perspective.js",
                "extensionPoint": "ide-perspective",
                "description": "My Perspective"
            }
            ```
        
        1. Save the changes and close the _Code Editor_.
        1. _(optional)_ Double click on the `perspective.extension` file to open the extension with the _Extension Editor_.

    === "perspective-menu.extension"

        1. Right click on the `extensions` folder and select **New &#8594; Extension**.
        1. Enter `perspective-menu.extension` for the name of the file.
        1. Right click on the `perspective-menu.extension` file and select **Open With &#8594; Code Editor**.
        1. Replace the content with the following definition:

            ```json
            {
                "module": "my-perspective/perspective/perspective-menu.js",
                "extensionPoint": "my-perspective-menu",
                "description": "My Perspective Menu"
            }
            ```
        
        1. Save the changes and close the _Code Editor_.
        1. _(optional)_ Double click on the `perspective-menu.extension` file to open the extension with the _Extension Editor_.

    === "perspective-menu-window.extension"

        1. Right click on the `extensions` folder and select **New &#8594; Extension**.
        1. Enter `perspective-menu-window.extension` for the name of the file.
        1. Right click on the `perspective-menu-window.extension` file and select **Open With &#8594; Code Editor**.
        1. Replace the content with the following definition:

            ```json
            {
                "module": "ide-core/services/menus/window.js",
                "extensionPoint": "my-perspective-menu",
                "description": "Window Menu"
            }
            ```
        
        1. Save the changes and close the _Code Editor_.
        1. _(optional)_ Double click on the `perspective-menu-window.extension` file to open the extension with the _Extension Editor_.

    === "perspective-menu-help.extension"

        1. Right click on the `extensions` folder and select **New &#8594; Extension**.
        1. Enter `perspective-menu-help.extension` for the name of the file.
        1. Right click on the `perspective-menu-help.extension` file and select **Open With &#8594; Code Editor**.
        1. Replace the content with the following definition:

            ```json
            {
                "module": "ide-core/services/menus/help.js",
                "extensionPoint": "my-perspective-menu",
                "description": "Help Menu"
            }
            ```
        
        1. Save the changes and close the _Code Editor_.
        1. _(optional)_ Double click on the `perspective-menu-help.extension` file to open the extension with the _Extension Editor_.

1. Create perspective definition:

    - Create `perspective.js` and `perspective-menu.js` files.

    === "perspective.js"

        1. Right click on the `perspective` folder and select **New &#8594; JavaScript CJS Service**.
        1. Enter `perspective.js` for the name of the file.
        1. Double click on the `perspective.js` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```javascript
            const perspectiveData = {
                id: "my-perspective",
                name: "My Perspective",
                link: "../my-perspective/index.html",
                order: "1000",
                icon: "../my-perspective/icon.svg",
            };
            
            if (typeof exports !== 'undefined') {
                exports.getPerspective = function () {
                    return perspectiveData;
                }
            }
            ```

        1. Save the changes and close the _Code Editor_.

    === "perspective-menu.js"

        1. Right click on the `perspective` folder and select **New &#8594; JavaScript CJS Service**.
        1. Enter `perspective-menu.js` for the name of the file.
        1. Double click on the `perspective-menu.js` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```javascript
            exports.getMenu = function () {
                return {
                    label: "My Menu",
                    order: 1,
                    items: [
                        {
                            label: "Empty item",
                            order: 1
                        },
                        {
                            label: "Empty item with divider",
                            divider: true,
                            order: 2
                        },
                        {
                            label: "Submenu",
                            order: 3,
                            items: [
                                {
                                    label: "GitHub page",
                                    data: "https://github.com/eclipse/dirigible",
                                    action: "open",
                                    order: 1
                                }
                            ]
                        },
                        {
                            label: "About",
                            action: "openDialogWindow",
                            dialogId: "about",
                            order: 4
                        }
                    ]
                };
            }
            ```

        1. Save the changes and close the _Code Editor_.

1. Create perspective frontend resources:

    - Create `index.html`, `controller.js` and `icon.svg` files.

    === "index.html"

        1. Right click on the `my-perspective` project and select **New &#8594; HTML5 Page**.
        1. Enter `index.html` for the name of the file.
        1. Double click on the `index.html` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```html
            <!DOCTYPE HTML>
            <html lang="en" ng-app="myPerspective" ng-controller="MyPerspectiveController" xmlns="http://www.w3.org/1999/xhtml">
            
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
            
                    <title dg-brand-title></title>
            
                    <!-- 'brandicon' is an AngularJS directive to set the proper favicon. Do this only for perspective and not regular views -->
                    <link rel="icon" href="data:;base64,iVBORw0KGgo=" dg-brand-icon />
            
                    <!-- Perspective data -->
                    <script type="text/javascript" src="/services/v4/web/my-perspective/perspective/perspective.js"></script>
            
                    <theme></theme>
            
                    <script type="text/javascript" src="/services/v4/js/ide-core/services/loader.js?id=ide-perspective-js"></script>
            
                    <link type="text/css" rel="stylesheet"
                        href="/services/v4/js/ide-core/services/loader.js?id=ide-perspective-css" />
            
                    <!-- Project-specific stuff -->
                    <script type="text/javascript" src="controller.js"></script>
            
                </head>
            
                <body dg-contextmenu="contextMenuContent">
            
                    <!-- Top IDE panel and it's contents -->
                    <ide-header menu-ext-id="my-perspective-menu"></ide-header>
                    <!-- Context menu overlay -->
                    <ide-contextmenu></ide-contextmenu>
            
                    <!-- The container which holds the sidebar and this perspective -->
                    <ide-container>
                        <ide-layout views-layout-model="layoutModel"></ide-layout>
                    </ide-container>
            
                    <!-- Alert dialog Overlay for alerts, notifications, dialogs -->
                    <ide-dialogs></ide-dialogs>
                    <!-- Bottom IDE status bar -->
                    <ide-status-bar></ide-status-bar>
                </body>
            </html>
            ```

        1. Save the changes and close the _Code Editor_.

    === "controller.js"

        1. Right click on the `my-perspective` project and select **New &#8594; File**.
        1. Enter `controller.js` for the name of the file.
        1. Double click on the `controller.js` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```javascript
            let myPerspective = angular.module("myPerspective", ["ngResource", "ideLayout", "ideUI"]);

            myPerspective.config(["messageHubProvider", function (messageHubProvider) {
                messageHubProvider.eventIdPrefix = 'example';
            }]);
            
            myPerspective.controller("MyPerspectiveController", ["$scope", "messageHub", function ($scope, messageHub) {
            
                $scope.layoutModel = {
                    // Array of view ids
                    views: ["import", "welcome", "console"],
                    layoutSettings: {
                        hideEditorsPane: false
                    },
                    events: {
                        "example.alert.info": function (msg) {
                            console.info(msg.data.message);
                        }
                    }
                };
            
                $scope.contextMenuContent = function (element) {
                    return {
                        callbackTopic: "example.contextmenu",
                        items: [
                            {
                                id: "new",
                                label: "New",
                                icon: "sap-icon--create",
                                items: [
                                    {
                                        id: "tab",
                                        label: "Tab"
                                    },
                                ]
                            },
                            {
                                id: "other",
                                label: "Other",
                                divider: true,
                                icon: "sap-icon--question-mark"
                            }
                        ]
                    }
                };
            
                messageHub.onDidReceiveMessage(
                    "contextmenu",
                    function (msg) {
                        if (msg.data == "other") {
                            messageHub.showAlertSuccess(
                                "Success",
                                "You have selected the other option!"
                            );
                        } else {
                            messageHub.showAlertInfo(
                                "Nothing will happen",
                                "This is just a demo after all."
                            );
                        }
                    }
                );
            
            }]);
            ```

        1. Save the changes and close the _Code Editor_.

    === "icon.svg"

        1. Right click on the `my-perspective` project and select **New &#8594; File**.
        1. Enter `controller.js` for the name of the file.
        1. Double click on the `controller.js` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

        ```xml
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg
           width="24"
           height="24"
           viewBox="0 0 6.3499999 6.3500002"
           version="1.1"
           id="svg5"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:svg="http://www.w3.org/2000/svg">
          <defs
             id="defs2" />
          <g
             id="layer1"
             transform="matrix(1.0590909,0,0,1.0590909,-0.18761367,-0.18761367)">
            <path
               id="path1074"
               style="fill-opacity:1;stroke:none;stroke-width:2.8;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="M 12,1 A 11,11 0 0 0 1,12 11,11 0 0 0 12,23 11,11 0 0 0 23,12 11,11 0 0 0 12,1 Z m -0.101562,4.3378906 c 0.955078,0 1.796875,0.15625 2.523437,0.4667969 0.732422,0.3046875 1.294922,0.7558594 1.6875,1.3535156 0.392578,0.5976562 0.603516,1.2734376 0.632813,2.0292969 L 15.107422,9.3105469 C 15.019531,8.4960938 14.720703,7.8808594 14.210938,7.4648438 13.707031,7.0488281 12.958984,6.8417969 11.96875,6.8417969 c -1.03125,0 -1.783203,0.1894531 -2.2578125,0.5703125 -0.46875,0.375 -0.703125,0.8300781 -0.703125,1.3632812 0,0.4628906 0.1660156,0.84375 0.5,1.1425782 0.328125,0.2988282 1.1835935,0.6054692 2.5664065,0.9218752 1.388672,0.310547 2.341797,0.583984 2.857422,0.818359 0.75,0.345703 1.302734,0.785156 1.660156,1.318359 0.357422,0.527344 0.537109,1.136719 0.537109,1.828126 0,0.685546 -0.197265,1.332031 -0.589844,1.941406 -0.392578,0.603515 -0.957031,1.074219 -1.695312,1.414062 -0.732422,0.333985 -1.558594,0.501953 -2.478516,0.501953 -1.166015,0 -2.144531,-0.169922 -2.9355465,-0.509765 C 8.6445313,17.8125 8.0253906,17.302734 7.5742188,16.623047 7.1289063,15.9375 6.8945312,15.164062 6.8710938,14.302734 l 1.609375,-0.140625 c 0.076172,0.644532 0.2519531,1.173829 0.5273437,1.589844 0.28125,0.410156 0.7148438,0.744141 1.3007815,1.001953 0.585937,0.251953 1.24414,0.378906 1.976562,0.378906 0.650391,0 1.22461,-0.09766 1.722656,-0.291015 0.498047,-0.193359 0.867188,-0.457031 1.107422,-0.791016 0.246094,-0.339843 0.369141,-0.707031 0.369141,-1.105469 0,-0.404296 -0.117188,-0.755859 -0.351563,-1.054687 C 14.898438,13.585938 14.511719,13.330078 13.972656,13.125 13.626953,12.990234 12.863281,12.783203 11.679688,12.501953 10.496094,12.214844 9.6660156,11.945312 9.1914062,11.693359 8.5761719,11.371094 8.1171875,10.972656 7.8125,10.498047 7.5136719,10.017578 7.3632812,9.4804687 7.3632812,8.8886719 c 10e-8,-0.6503906 0.1855469,-1.2558594 0.5546876,-1.8183594 0.3691406,-0.5683593 0.9082031,-1 1.6171874,-1.2929687 C 10.244141,5.484375 11.03125,5.3378906 11.898438,5.3378906 Z"
               transform="scale(0.26458334)" />
          </g>
        </svg>
        ```

1. Refresh the browser.

    !!! info 

        In some cases you may want to go to **Theme &#8594; Reset** to clean Web IDE state.

1. The new perspective should be visibile at the bottom of the perspectives list.

    !!! info

        Alternatively go to **Window &#8594; Open Perspective &#8594; My Perspective** to open the new perspective.