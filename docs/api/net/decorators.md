# Decorators

## Overview

::: tip Module
- package: `@aerokit/sdk/net`
- source: [net/decorators.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/net/decorators.ts)
- last updated: 
:::

This module provides a set of decorators for defining WebSocket endpoints in a declarative manner. The decorators allow developers to annotate classes to specify that they should act as WebSocket handlers, defining the endpoint and associated metadata. This makes it easier to create and manage WebSocket-based communication within the application.

### Key Features:
- **WebSocket Decorator**: The `@Websocket` decorator is used to mark a class as a WebSocket handler, specifying the endpoint and associated metadata.

### Use Cases:
- **Real-Time Communication**: These decorators are primarily used for defining components that handle WebSocket connections, enabling real-time communication between clients and the server.
- **Integration with WebSocket Systems**: By using these decorators, developers can easily integrate their applications with WebSocket-based systems and protocols.

### Example Usage:
```ts
import { Websocket } from "@aerokit/sdk/net";

@Websocket({ name: "MyWebsocket", endpoint: "my-ws" })
class MyWebsocketHandler {
    // Logic to handle WebSocket connections at the 'my-ws' endpoint
}

// The WebSocket handler will be automatically registered based on the provided metadata.
```

## Classes

