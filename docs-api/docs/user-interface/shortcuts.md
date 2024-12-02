---
title: Shortcuts
---

Shortcuts
===

Directive used to assign keyboard shortcuts to a vew or to a specific element.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/shortcuts.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/shortcuts.js)
- Web Link: `/services/web/platform-core/ui/platform/shortcuts.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, shortcuts support is included automatically but not enabled.

If you are making a custom view, you can include the API using the web link above.

To enable it, add it to your app module:

```javascript
const exampleView = angular.module('exampleView', [
    ...
    'platformShortcuts',
]);
```

## Directive options

* `shortcut` - String containing the shortcut or shortcuts. There can be multiple shortcuts for a single action. You can separate the shortcuts using '|'.
* `shortcut-action` - The name of the function that will get called. It has two parameters:
    * `keySet` - The keyboard shortcut activated.
    * `event` - The JavaScript key event.
* `shortcut-desc` - Description of the shortcut(s).
* `ignore-inputs` - If this attribute is present, then events from 'input' and 'textarea' controls will be ignored.
* `separate-ctrl` - On macOS, by default, the ctrl key is replaced with the meta (cmd) key, so shortcuts like 'Ctrl+S' are automatically translated to 'Cmd+S'. If you want the ctrl key to match the ctrl and be separate from the meta on a mac, then use this attribute.


## Example

```html
<div shortcut="'ctrl+s|ctrl+k'" shortcut-action="saveShortcut" ignore-inputs separate-ctrl>
```

```javascript
$scope.saveShortcut = (keySet, event) => {
    event.preventDefault();
    if (keySet === 'ctrl+s') {
        // save
    } else if (keySet === 'ctrl+k') {
        // do something
    }
};
```