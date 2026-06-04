# SOAP

## Overview

::: tip Module
- package: `@aerokit/sdk/net`
- source: [net/soap.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/net/soap.ts)
- last updated: 
:::

The SOAP module provides a set of classes and methods for working with SOAP messages in JavaScript. It allows developers to create, parse, and send SOAP messages to SOAP endpoints, abstracting the complexities of the underlying Java SOAP API. This module is essential for integrating with SOAP-based web services and enables seamless communication using the SOAP protocol.

### Key Features:
- **Message Creation**: The `SOAP` class provides methods to create new SOAP messages, including the ability to add namespaces, headers, and body elements.
- **Message Parsing**: The module allows parsing of incoming SOAP messages from HTTP requests, enabling developers to handle SOAP requests in their applications.
- **SOAP Calls**: The `call` method enables sending SOAP messages to specified endpoints and receiving responses, facilitating communication with SOAP-based web services.

### Use Cases:
- **Integrating with SOAP Web Services**: Developers can use this module to interact with existing SOAP web services, sending requests and processing responses in a structured manner.
- **Building SOAP Endpoints**: By parsing incoming SOAP messages, developers can create applications that act as SOAP endpoints, handling requests and providing appropriate responses.

### Example Usage:
```ts
import { SOAP } from "@aerokit/sdk/net";

// Create a new SOAP message
const message = SOAP.createMessage();
const envelope = message.getPart().getEnvelope();
envelope.addNamespaceDeclaration("ns", "http://example.com/namespace");
const body = envelope.getBody();
const element = body.addChildElement("MyRequest", "ns");
element.addTextNode("Request data");

// Send the SOAP message to an endpoint
const response = SOAP.call(message, "http://example.com/soap-endpoint");
console.log(response.getText());
```

## Classes

### SOAP

#### call()

Call a given SOAP endpoint with a given request message

> ```ts
> static call(message: Message, url: string): Message;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `Message` | The SOAP Message wrapper object. |
> | `url` | `string` | The target SOAP endpoint URL. |
>
> ::: info Returns
> - **Type**: `Message`
> - **Description**: 
> :::

#### trustAll()



> ```ts
> static trustAll(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createMessage()

Creates a new, empty SOAP message.

> ```ts
> static createMessage(): Message;
> ```
>
>
> ::: info Returns
> - **Type**: `Message`
> - **Description**: 
> :::

#### parseMessage()

Parses a SOAP message from an InputStream and MimeHeaders.

> ```ts
> static parseMessage(mimeHeaders: MimeHeaders, inputStream: InputStream): Message;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `mimeHeaders` | `MimeHeaders` | The MimeHeaders wrapper object. |
> | `inputStream` | `InputStream` | The InputStream wrapper object. |
>
> ::: info Returns
> - **Type**: `Message`
> - **Description**: 
> :::

#### parseRequest()

Parses a SOAP message from the current HTTP request input stream.

> ```ts
> static parseRequest(): Message;
> ```
>
>
> ::: info Returns
> - **Type**: `Message`
> - **Description**: 
> :::

#### createMimeHeaders()

Creates a new, empty MimeHeaders object.

> ```ts
> static createMimeHeaders(): MimeHeaders;
> ```
>
>
> ::: info Returns
> - **Type**: `MimeHeaders`
> - **Description**: 
> :::

