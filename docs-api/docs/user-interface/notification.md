---
title: NotificationHub
---

NotificationHub
===

Used to send notifications. Extends [MessageHub](../message-hub).

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/notification-hub.js](https://github.com/eclipse/dirigible/blob/master/components/platform/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/notification-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/notification-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, notification support is enabled automatically.

If you are making a custom view, you can include the API using the web link above.

To initialize it, place this in your code:

```javascript
const notificationHub = new NotificationHub();
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**show(NotifyObject)**   | Shows a notification. | *object*
**onShow(handlerFunc)**   | Registers a listener. Triggered when a notification should be shown. Returns a function to unregister the listener. | *function*

## Typedefs

!!! Note
	Params in square brackets are optional.

<a name="NotifyObject"></a>

### NotifyObject : <code>Object</code>

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;information&#x27;</code> \| <code>&#x27;warning&#x27;</code> \| <code>&#x27;negative&#x27;</code> \| <code>&#x27;positive&#x27;</code> | Type of notification. |
| title | <code>string</code> | Notification title. |
| description | <code>string</code> | Notification description. |

## Example

```javascript
notificationHub.show({
    type: 'information',
    title: 'Information',
    description: 'This is used to show information.',
});
```

For a full example you can look at [sample-platform](https://github.com/dirigiblelabs/sample-platform).