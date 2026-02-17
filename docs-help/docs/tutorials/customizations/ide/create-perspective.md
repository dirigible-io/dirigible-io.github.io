---
title: Create Perspective
---

# Create Perspective

All perspectives in Eclipse Dirigible are loaded via the `platform-perspectives` extension point. List with all extension points can be found at the [Extensions Overview](/help/development/extensions/) page. To develop a new perspective, _extension_, _perspective definition_ and _frontend resources_ should be created. The following example is using [AngularJS](https://angularjs.org/) and [BlimpKit UI Library](https://blimpkit.dev/).

### Steps

1.  Start Eclipse Dirigible.

    !!! info

        You can find more information on how to do that by following:

        - [Getting Started](https://www.dirigible.io/help/development/) section.
        - [Setup](https://www.dirigible.io/help/setup/) section.

1.  Go to the `Projects` perspective and create `New Project`.
    - Enter `my-perspective` for the name of the project.
    - The project will appear under the projects list.

1.  Create perspective extension:
    - Right click on the `my-perspective` project and select **New &#8594; Folder**.
    - Enter `extensions` for the name of the folder.
    - Right click on the `my-perspective` project and select **New &#8594; Folder**.
    - Enter `configs` for the name of the folder.
    - Right click on the `my-perspective` project and select **New &#8594; Folder**.
    - Enter `js` for the name of the folder.
    - In the `extensions` folder, create the `perspective.extension` and `perspective-menu.extension` files.

    === "perspective.extension"

        1. Right click on the `extensions` folder and select **New &#8594; Extension**.
        1. Enter `perspective.extension` for the name of the file.
        1. Right click on the `perspective.extension` file and select **Open With &#8594; Code Editor**.
        1. Replace the content with the following definition:

            ```json
            {
                "module": "my-perspective/configs/perspective.js",
                "extensionPoint": "platform-perspectives",
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
                "module": "my-perspective/configs/perspective-menu.js",
                "extensionPoint": "platform-menus",
                "description": "My Perspective Menu"
            }
            ```

        1. Save the changes and close the _Code Editor_.
        1. _(optional)_ Double click on the `perspective-menu.extension` file to open the extension with the _Extension Editor_.

1.  Create perspective definition: - Create `perspective.js` and `perspective-menu.js` files.

        === "perspective.js"

            1. Right click on the `config` folder and select **New &#8594; File**.
            1. Enter `perspective.js` for the name of the file.
            1. Double click on the `perspective.js` file to open it with the _Code Editor_.
            1. Replace the content with the following code:

                ```javascript
                const perspectiveData = {
                    id: 'my-perspective',
                    label: 'My perspective',
                    path: '/services/web/my-perspective/index.html',
                    order: 1,
                    icon: '/services/web/resources/images/unknown.svg',
                };
                if (typeof exports !== 'undefined') {
                    exports.getPerspective = () => perspectiveData;
                }
                ```

            1. Save the changes and close the _Code Editor_.

        === "perspective-menu.js"

            1. Right click on the `configs` folder and select **New &#8594; File**.
            1. Enter `perspective-menu.js` for the name of the file.
            1. Double click on the `perspective-menu.js` file to open it with the _Code Editor_.
            1. Replace the content with the following code:

                ```javascript
                exports.getMenu = () => ({
                    perspectiveId: 'my-perspective',
                    include: {
                        window: true,
                        help: true,
                    },
                    items: [
                        {
                            label: 'My Menu',
                            items: [
                                {
                                    label: 'Empty item',
                                    order: 1,
                                    items: [
                                        {
                                            label: 'Empty subitem with separator',
                                            order: 1,
                                            action: 'event',
                                            data: {
                                                topic: 'my-perspective.some.event'
                                            },
                                        },
                                        {
                                            label: 'Empty subitem',
                                            order: 2,
                                            action: 'open',
                                            link: 'https://github.com/eclipse-dirigible/dirigible/issues',
                                        },
                                    ],
                                },
                            ]
                        },
                    ]

                });
                ```

            1. Save the changes and close the _Code Editor_.

1.  Create perspective frontend resources:
    - Create `index.html` in the base of the project and `controller.js` in the `js` folder.

    === "index.html"

        1. Right click on the `my-perspective` project and select **New &#8594; File**.
        1. Enter `index.html` for the name of the file.
        1. Double click on the `index.html` file to open it with the _Code Editor_.
        1. Replace the content with the following code:

            ```html
            <!DOCTYPE HTML>
            <html lang="en" ng-app="myPerspective" ng-controller="MyPerspectiveController" xmlns="http://www.w3.org/1999/xhtml">

                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title config-title></title>
                    <link rel="icon" sizes="any" href="data:;base64,iVBORw0KGgo=" />
                    <script type="text/javascript" src="/services/web/my-perspective/configs/perspective.js"></script>
                    <meta name="platform-links" category="ng-view,ng-perspective">
                    <script type="text/javascript" src="js/controller.js"></script>
                </head>

                <body ng-on-contextmenu="showContextMenu($event)">
                    <layout config="::layoutConfig"></layout>
                    <theme></theme>
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
            const myPerspective = angular.module('workbench', ['platformView', 'platformLayout', 'blimpKit']);

            workbench.controller('WorkbenchController', ($scope, Layout) => {
                const contextMenuHub = new ContextMenuHub();
                const messageHub = new MessageHubApi();

                $scope.layoutConfig = {
                    // Array of view ids
                    views: ["projects", "welcome", "console"],
                    viewSettings: {},
                    layoutSettings: {
                        hideCenterPane: false,
                        leftPaneMinSize: 355
                    },
                };

                $scope.showContextMenu = (event) => {
                    event.preventDefault();
                    contextMenuHub.showContextMenu({
                        ariaLabel: 'my perspective contextmenu',
                        posX: event.clientX,
                        posY: event.clientY,
                        icons: false,
                        items: [
                            {
                                id: 'action1',
                                label: 'Action One',
                                separator: true,
                            },
                            {
                                id: 'action2',
                                label: 'Action Two',
                            }
                        ]
                    }).then((id) => {
                        if (id === 'action1') {
                            console.log('action one');
                        } else {
                            console.log('action two');
                        }
                    });
                };

                messageHub.addMessageListener({
                    topic: 'my-perspective.some.event',
                    handler: () => {
                        console.log('from empty subitem');
                    },
                });

            });
            ```

        1. Save the changes and close the _Code Editor_.

1.  Refresh the browser.

    !!! info

        In some cases you may want to open DevTools, go to the Network tab, disable cache and refresh again.

1.  The new perspective should be visibile at the bottom of the perspectives list.

    !!! info

        Alternatively go to **Window &#8594; Open Perspective &#8594; My Perspective** to open the new perspective.
