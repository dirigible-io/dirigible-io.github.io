---
title: StatusBarHub
---

StatusBarHub
===

Used to control the status bar. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/status-bar-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/status-bar-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/status-bar-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, status bar support is enabled automatically.

If you are making a custom view, you can include the API using the web link above.

To initialize it, place this in your code:

```javascript
const statusBarHub = new StatusBarHub();
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**showMessage(message)**   | Shows an informational message strip. | -
**onMessage(handlerFunc)**   | Registers a listener. Triggered when an informational message should be shown. Returns a function to unregister the listener. | *function*
**showError(message)**   | Shows an error message strip. | -
**onError(handlerFunc)**   | Registers a listener. Triggered when an error message should be shown. Returns a function to unregister the listener. | *function*
**showLabel(message)**   | Shows an short message at the end of the status bar. | -
**onLabel(handlerFunc)**   | Registers a listener. Triggered when a short message should be shown. Returns a function to unregister the listener. | *function*
**showBusy(message)**   | Shows a busy indicator with message. | -
**hideBusy()**   | Hides the busy indicator. | -
**onBusy(handlerFunc)**   | Registers a listener. Triggered when a busy indicator should be shown. Returns a function to unregister the listener. | *function*

## Example

```javascript
statusBarHub.showMessage('Some message');
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).