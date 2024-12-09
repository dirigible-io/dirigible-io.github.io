---
layout: help
title: Menu
icon: none
group: help-features
---

Menu
===

Menus are JavaScript configuration modules that contain menu item objects. Those menus are populated in the shellbar as global menus for the perspective they belong to.

Extension
---

You can register a new menu using the `platform-menus` extension point.

This file is usually put inside a folder named `extensions`, in the root of the project.

Example:

```json
{
    "module": "new-menu/configs/menu.js",
    "extensionPoint": "platform-menus",
    "description": "Example menu"
}
```

!!! Note
	The 'module' parameter above should point to a valid JavaScript configuration module.

Configuration module
---

In order to register a new menu in the platform, you must provide a valid configuration module.

This file is usually put inside a folder named `configs`, in the root of the project.

Example:

```javascript
exports.getMenu = () => ({
	perspectiveId: 'examplePerspective',
	include: {
		help: true,
		window: true
	},
	items: [
		{
			label: 'Example',
			items: [
				{
					label: 'Event',
					action: 'event',
                    data: {
                        topic: 'example.menu.event',
                        message: 'example'
                    }
				},
				{
                    id: 'workbench',
					label: 'Workbench',
					action: 'showPerspective',
				},
                {
					id: 'about',
                    label: 'About',
					action: 'openWindow',
                    hasHeader: true,
				},
                {
					label: 'Submenu',
					items: [
						{
							label: 'Dirigible',
							action: 'open',
                            link: 'https://www.dirigible.io/',
						},
						{
							label: 'Empty item with a separator',
							separator: true,
						},
                        {
                            label: 'Empty item',
                        }
					]
				},
			]
		}
	]
});
```

* `getMenu` - This function must return the configuration object and it must be exported.
* `perspectiveId` - Perspective ID.
* `include` - Eclipse Dirigible contains two system menus. You can inlude or exclude those from your perspective menu.
    * `help` - Platform help menu.
    * `window` - Platform window menu.
* `items` - List of menu item objects.
    * `label` - Menu item label.
    * `separator` - Menu item bottom separator.
    * `action` - Execute action when selected.
        * open - Opens a link in a new tab or browser window
        * openView - Opens a view
        * openWindow - Opens a [window](../window)
        * showPerspective - Shows a perspective
        * event - Message will be sent using MessageHub on the provided topic.
    * `id` - In case of actions "openView", "openWindow" and "showPerspective", this is the id of the view/perspective.
    * `data` - In case of action "event", this is an object with topic and message.
    * `link` - In case of action "open", this is the link that should be opned.
    * `hasHeader` - In case of action "openWindow", you can specify if the window will have a header.

The project structure should look like this:

```
new-menu
- extensions
    - menu.extension
- configs
    - menu.js
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).