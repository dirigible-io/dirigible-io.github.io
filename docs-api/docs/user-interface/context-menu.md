---
title: Context menu
---

Context menu
===

Controls the global context menu. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/contextmenu-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/contextmenu-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/contextmenu-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, context menu support is automatically enabled.

If the view is expected to work outside the platform, then you must include `platformContextMenu` in your view:

```javascript
const exampleView = angular.module('exampleView', [
    'blimpKit',
    'platformView',
    'platformContextMenu'
]);
```

If you are making a custom view, you can include the API using the web link above.

To initialize it:

```javascript
const contextMenuHub = new ContextMenuHub();
```

```html
<body>
    <context-menu></context-menu>
</body>
```

!!! Note
	Use the `context-menu` tag <b>only</b> if the view is expected to work outside Dirigible.

You can capture all right-click events, on a perticular element, using the `ng-on-contextmenu` directive:

```html
<div ng-on-contextmenu="showContextMenu($event)"></div>
```

```javascript
$scope.showContextMenu = (event) => {
    event.preventDefault(); // Prevent default context menu
    contextMenuHub.showContextMenu({
        ariaLabel: 'example contextmenu',
        posX: event.clientX,
        posY: event.clientY,
        icons: true,
        items: [
            {
                id: 'item1',
                label: 'Item 1',
                iconClass: 'sap-icon--information',
                separator: true
            },
            {
                id: 'item2',
                label: 'Item 2',
                iconPath: '/path/to/image.svg',
                items: [
                    {
                        id: 'item3',
                        label: 'Item 3',
                        iconClass: 'sap-icon--information',
                        disabled: true
                    },
                    {
                        id: 'item4',
                        label: 'Item 4',
                        iconClass: 'sap-icon--information',
                        disabled: false
                    }
                ]
            },
        ]
    }).then((id) => {
        if (id) console.log(`You selected context menu item with id '${id}'`);
    });
};
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**showContextMenu(MenuObject)**   | Opens a global menu. | *Promise*
**onContextMenu(handlerFunc)**   | Registers a listener. Triggered when a context menu should be shown. Returns a function to unregister the listener. | *function*

## Typedefs

<dl>
<dt><a href="#MenuItem">MenuItem</a> : <code>Object</code></dt>
</dd>
<dt><a href="#MenuSublist">MenuSublist</a> : <code>Object</code></dt>
</dd>
<dt><a href="#MenuObject">MenuObject</a> : <code>Object</code></dt>
</dd>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="MenuItem"></a>

## MenuItem : <code>Object</code>
Menu item parameter.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the item. |
| label | <code>string</code> | Label for the item. |
| [leftIconClass] | <code>string</code> | CSS icon class. Icon will be shown before the label. |
| [rightIconClass] | <code>string</code> | CSS icon class. Icon will be shown after the label. |
| [leftIconPath] | <code>string</code> | Icon url path. Icon will be shown before the label. |
| [rightIconPath] | <code>string</code> | Icon url path. Icon will be shown after the label. |
| [shortcut] | <code>string</code> | Secondary text. Most often used as a shotcut hint. |
| [separator] | <code>boolean</code> | Set a menu item separator after this item. |
| [disabled] | <code>boolean</code> | Disable the menu item. |

<a name="MenuSublist"></a>

## MenuSublist : <code>Object</code>
Menu sublist parameter.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the sublist. |
| label | <code>string</code> | Label for the sublist. |
| [separator] | <code>boolean</code> | Set a menu item separator after this item. |
| [iconClass] | <code>string</code> | CSS icon class. Icon will be shown before the label. |
| [iconPath] | <code>string</code> | Icon url path. Icon will be shown before the label. |
| items | <code>Array.&lt;(MenuItem\|MenuSublist)&gt;</code> | List of menu items and/or sublists. |
| [disabled] | <code>boolean</code> | Disable the sublist. |

<a name="MenuObject"></a>

## MenuObject : <code>Object</code>
Main menu parameter.

**Properties**

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ariaLabel | <code>string</code> |  | Accessibility text. |
| posX | <code>number</code> |  | The position of the cursor at the X axis. |
| posY | <code>number</code> |  | The position of the cursor at the Y axis. |
| [icons] | <code>boolean</code> | <code>false</code> | If the contextmenu items have icons. |
| items | <code>Array.&lt;(MenuItem\|MenuSublist)&gt;</code> |  | List of menu items and/or sublists. |

## Example

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).