# Integrations

## Overview

::: tip Module
- package: `@aerokit/sdk/integrations`
- source: [integrations/integrations.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/integrations/integrations.ts)
- last updated: 
:::

The Integrations class provides utility methods for triggering and interacting with predefined Apache Camel integration routes. It allows JavaScript code to synchronously invoke Camel routes by their unique identifiers, passing in a payload, headers, and exchange properties. Additionally, it provides access to the current message being processed within the integration context, enabling developers to read and modify message content and metadata during route execution.

### Key Features:
- **Route Invocation**: The `invokeRoute` method allows developers to execute a specific Camel route by its ID, providing the necessary input data and context for the route to process.
- **Message Access**: The `getInvokingRouteMessage` method provides access to the current message being processed in the integration context, allowing for dynamic interaction with the message's body, headers, and exchange properties.

### Use Cases:
- **Integration Testing**: Developers can use the `invokeRoute` method to test individual Camel routes in isolation by providing controlled inputs and examining the outputs.
- **Dynamic Message Manipulation**: By accessing the current message through `getInvokingRouteMessage`, developers can implement dynamic logic within their routes, such as modifying headers or altering the message body based on certain conditions.

### Example Usage:
```ts
import { Integrations } from "@aerokit/sdk/integrations";

// Invoke a Camel route with specific payload, headers, and exchange properties
const result = Integrations.invokeRoute('myRouteId', { key: 'value' }, { header1: 'value1' }, { property1: 'value1' });
console.log(result);

// Access the current message within a route endpoint
const currentMessage = Integrations.getInvokingRouteMessage();
console.log(currentMessage.getBody());
```

## Classes

### Integrations

#### invokeRoute()

Synchronously invokes a specified Camel route.

> ```ts
> static invokeRoute(routeId: string, payload: any, headers: HeadersMap, exchangeProperties: ExchangeProperties): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `routeId` | `string` | The unique identifier of the Camel route to be executed. |
> | `payload` | `any` | The initial message body/payload for the route. |
> | `headers` | `HeadersMap` | A map of headers to set on the initial Camel Message. |
> | `exchangeProperties` | `ExchangeProperties` | A map of properties to set on the Camel Exchange context. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The final result (the body of the resulting Camel Message) after the route has completed execution.
> :::

#### getInvokingRouteMessage()

Retrieves the current message being processed by the underlying integration
engine's context. This is typically used within a route endpoint (e.g., a script component)
to access or modify the message.

Note: '__context' is assumed to be a global or context-injected variable.

> ```ts
> static getInvokingRouteMessage(): IntegrationMessage;
> ```
>
>
> ::: info Returns
> - **Type**: `IntegrationMessage`
> - **Description**: The current IntegrationMessage wrapper.
> :::

