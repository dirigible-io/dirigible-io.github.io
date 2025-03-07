---
title: MessageHub
---

MessageHub
===

In order to maximize extensibility and isolation, all perspectives, views, editors, windows, etc are loaded inside iframes. Those UI modules must comunicate between eachother and that is what MessageHub is for. It's a library based on the [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API and it uses the observer pattern.

=== "Overview"
- Module: `platform-core`
- Source: [platform-core/ui/platform/message-hub.js](https://github.com/eclipse/dirigible/blob/master/components/ui/platform-core/src/main/resources/META-INF/dirigible/platform-core/ui/platform/message-hub.js)
- Web Link: `/services/web/platform-core/ui/platform/message-hub.js`
- Status: `stable`
- Group: `platform`

### Basic Usage

If you are using the standard Dirigible view configuration, Message Hub support is automatically enabled.

If you are making a custom view, you can include the API using the web link above.

To initialize it:

```javascript
const messageHub = new MessageHubApi();
// or
const messageHub = new MessageHubApi({
	hubWindow = window,
	targetOrigin = location.origin,
	allowedOrigins = [location.origin],
});
```

## Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**triggerEvent(topic)**   | Sends an empty message to a topic | -
**postMessage(PostObject)**   | Sends a message/data to a topic | -
**addMessageListener(ListenerObject)**   | Registers a listener. Triggered when a message is posted. Returns a function to unregister the listener. | *function*
**removeMessageListener(handlerReference)**   | Unregisters a listener | -

## Typedefs

<dl>
<dt><a href="#InitObject">InitObject</a> : <code>Object</code></dt>
<dt><a href="#PostObject">PostObject</a> : <code>Object</code></dt>
<dt><a href="#ListenerObject">ListenerObject</a> : <code>Object</code></dt>
</dl>

!!! Note
	Params in square brackets are optional.

<a name="InitObject"></a>

### InitObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| hubWindow | <code>window</code> | The top level browser window object. |
| targetOrigin | <code>string</code> | Origin the sender. |
| allowedOrigins | <code>array.<string></code> | List of allowed origins who can send a message. |

<a name="PostObject"></a>

### PostObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic to listen to. |
| data |  | Message/data that will be transmitted. |

<a name="ListenerObject"></a>

### ListenerObject : <code>Object</code>

**Properties**

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic to listen to. |
| handler |  | Callback function that will handle the incomming message/data. |

## Example

```javascript
messageHub.triggerEvent('some-topic');

messageHub.postMessage({
	topic: 'some-topic',
	data: 'some-data'
});

const topicListener = messageHub.addMessageListener({
	topic: 'some-topic',
	handler: (data) => {
		if (data) {
            console.log(data);
            messageHub.removeMessageListener(topicListener);
        }
	}
});
```