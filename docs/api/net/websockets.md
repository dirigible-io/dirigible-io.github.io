# Websockets

## Overview

::: tip Module
- package: `@aerokit/sdk/net`
- source: [net/websockets.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/net/websockets.ts)
- last updated: 
:::

The Websockets module provides an API for managing WebSocket clients and handling lifecycle events within the application context. It abstracts the complexities of WebSocket communication, allowing developers to easily create and manage WebSocket connections, send messages, and handle events such as connection openings, messages, errors, and closures.

### Key Features:
- **WebSocket Client Management**: Create and manage WebSocket clients with ease, including sending messages and closing connections.
- **Event Handling**: Access event details such as messages and errors within the context of WebSocket event handlers.

### Use Cases:
- **Real-Time Communication**: This module is ideal for applications that require real-time communication between clients and the server using WebSockets.
- **Integration with WebSocket Systems**: By providing a high-level API for WebSocket management, developers can easily integrate their applications with WebSocket-based systems and protocols.

### Example Usage:
```ts
import { Websockets } from "@aerokit/sdk/net";

// Create a new WebSocket client connection
const client = Websockets.createWebsocket("ws://example.com/socket", "myHandler");
client.send("Hello, WebSocket!");

// Access event details in an 'onmessage' handler
if (Websockets.isOnMessage()) {
    const message = Websockets.getMessage();
    console.log("Received message:", message);
}

// Close the WebSocket connection when done
client.close();
```

## Classes

### Websockets

#### createWebsocket()

Creates a new WebSocket client connection to a specified URI, managed by a handler script.

> ```ts
> static createWebsocket(uri: string, handler: string): WebsocketClient;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `uri` | `string` | The target WebSocket URI (e.g., 'ws://example.com/socket'). |
> | `handler` | `string` | The identifier or path of the script handling the WebSocket events. |
>
> ::: info Returns
> - **Type**: `WebsocketClient`
> - **Description**: A wrapper object for the new WebSocket session.
> :::

#### getClients()

Retrieves a list of all active WebSocket clients.

> ```ts
> static getClients(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of objects detailing the URI and handler of each client.
> :::

#### getClient()

Retrieves a specific WebSocket client wrapper by its session ID.

> ```ts
> static getClient(id: string): WebsocketClient;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `id` | `string` | The session ID of the client. |
>
> ::: info Returns
> - **Type**: `WebsocketClient`
> - **Description**: The client wrapper or undefined if not found.
> :::

#### getClientByHandler()

Retrieves a specific WebSocket client wrapper by its handler identifier.

> ```ts
> static getClientByHandler(handler: string): WebsocketClient;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `handler` | `string` | The handler identifier associated with the client. |
>
> ::: info Returns
> - **Type**: `WebsocketClient`
> - **Description**: The client wrapper or undefined if not found.
> :::

#### getMessage()

Retrieves the message payload from the current context, typically used inside an 'onmessage' handler.

> ```ts
> static getMessage(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The message content.
> :::

#### getError()

Retrieves error details from the current context, typically used inside an 'onerror' handler.

> ```ts
> static getError(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The error object or string.
> :::

#### getMethod()

Retrieves the event method name that triggered the current script execution (e.g., "onopen", "onmessage").

> ```ts
> static getMethod(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The name of the event method.
> :::

#### isOnOpen()

Checks if the current event context is 'onopen'.

> ```ts
> static isOnOpen(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the method is 'onopen'.
> :::

#### isOnMessage()

Checks if the current event context is 'onmessage'.

> ```ts
> static isOnMessage(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the method is 'onmessage'.
> :::

#### isOnError()

Checks if the current event context is 'onerror'.

> ```ts
> static isOnError(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the method is 'onerror'.
> :::

#### isOnClose()

Checks if the current event context is 'onclose'.

> ```ts
> static isOnClose(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the method is 'onclose'.
> :::

