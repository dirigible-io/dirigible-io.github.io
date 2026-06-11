# Soap

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.net`
- source: [net/Soap.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/net/Soap.java)
:::

Minimal SOAP envelope helpers - create an empty message, parse one from an XML string, or synchronously invoke a remote SOAP endpoint. Built directly on `jakarta.xml.soap`, which is part of every Dirigible runtime; no separate WSDL tooling is needed for simple integrations.

Reach for a generated client (Apache CXF, JAX-WS) when the service is complex and you want type-safe stubs - these helpers shine for one-off integrations and for inspecting / repairing SOAP traffic from an existing pipeline.

### Key Features:
- **Zero dependencies** - `jakarta.xml.soap` ships with every Dirigible runtime.
- **Three primitives** - `createMessage()`, `parseMessage(xml)`, `call(endpoint, request)`.
- **Native `SOAPMessage`** - full control over envelope, headers, body.

### Example Usage:
```java
import jakarta.xml.soap.SOAPMessage;
import jakarta.xml.soap.SOAPBody;
import org.eclipse.dirigible.sdk.net.Soap;

SOAPMessage request = Soap.createMessage();
SOAPBody body = request.getSOAPBody();
body.addBodyElement(request.getSOAPPart().getEnvelope().createName("Ping", "ex", "http://example.com/"));

SOAPMessage reply = Soap.call("https://example.com/soap", request);
```

## Methods

### createMessage()

Creates an empty SOAP message.

> ```java
> public static SOAPMessage createMessage() throws SOAPException;
> ```
>
> ::: info Returns
> - **Type**: `SOAPMessage`
> - **Description**: An empty SOAP envelope ready to populate.
> :::

### parseMessage()

Parses an XML string into a SOAP message.

> ```java
> public static SOAPMessage parseMessage(String xml) throws SOAPException, IOException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `xml` | `String` | XML payload (UTF-8). |
>
> ::: info Returns
> - **Type**: `SOAPMessage`
> - **Description**: Parsed SOAP message.
> :::

### call()

Synchronously invokes a remote SOAP endpoint.

> ```java
> public static SOAPMessage call(String endpoint, SOAPMessage request) throws SOAPException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `endpoint` | `String` | Target SOAP service URL. |
> | `request` | `SOAPMessage` | Request envelope. |
>
> ::: info Returns
> - **Type**: `SOAPMessage`
> - **Description**: Response envelope returned by the service.
> :::
