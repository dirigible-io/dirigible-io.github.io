# Session

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/session.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/session.ts)
- last updated: 
:::

The Session module provides a static façade (`Session` class) for accessing and manipulating the HTTP session associated with the current request. This module is often used to store user-specific data during their interaction with the application, such as authentication status, user preferences, or temporary data that should persist across multiple requests within the same session.

### Key Features:
- **Session Management**: Provides methods to check session validity, retrieve and set attributes, manage session lifetime, and invalidate sessions.
- **Attribute Handling**: Allows storing and retrieving named attributes in the session, which can be used to maintain user state across requests.
- **Session Metadata**: Offers access to session metadata such as creation time, last accessed time, and session ID.

### Use Cases:
- **User Authentication**: Storing user authentication status or tokens in the session to maintain login state across requests.
- **User Preferences**: Keeping user-specific settings or preferences that should persist during the session.
- **Temporary Data Storage**: Holding temporary data that is relevant for the duration of the user's interaction with the application but does not need to be stored permanently.

### Example Usage:
```ts
import { Session } from "@aerokit/sdk/http";

// Check if the session is valid
if (Session.isValid()) {
    // Set a user attribute in the session
    Session.setAttribute("userId", "12345");
    // Retrieve the user attribute from the session
    const userId = Session.getAttribute("userId");
    // Get session metadata
    const creationTime = Session.getCreationTime();
    const lastAccessedTime = Session.getLastAccessedTime();
    // Invalidate the session when done
    Session.invalidate();
}
```

## Classes

### Session

#### isValid()

Checks if a session is currently valid and active for the request context.

> ```ts
> static isValid(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the session is valid, false otherwise (e.g., if it has been invalidated or timed out).
> :::

#### getAttribute()

Retrieves the value of a named attribute stored in the session.
Note: The underlying Java facade typically stores strings, but the value may represent
   * serialized data that should be parsed if complex.

> ```ts
> static getAttribute(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the attribute. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The attribute value as a string, or null/undefined if not found.
> :::

#### getAttributeNames()

Retrieves an array of all attribute names currently stored in the session.
The names are retrieved as a JSON string from the facade and then parsed.

> ```ts
> static getAttributeNames(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of attribute names (strings), or an empty array if no attributes are present.
> :::

#### getCreationTime()

Returns the time at which this session was created, converted to a JavaScript Date object.

> ```ts
> static getCreationTime(): Date;
> ```
>
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: A Date object representing the session's creation time.
> :::

#### getId()

Returns the unique identifier assigned to this session.

> ```ts
> static getId(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The session ID string.
> :::

#### getLastAccessedTime()

Returns the last time the client accessed this session, converted to a JavaScript Date object.
Access includes requests that retrieve or set session attributes.

> ```ts
> static getLastAccessedTime(): Date;
> ```
>
>
> ::: info Returns
> - **Type**: `Date`
> - **Description**: A Date object representing the last access time.
> :::

#### getMaxInactiveInterval()

Returns the maximum time interval, in seconds, that the server should keep this session open
between client requests. After this interval, the session will be invalidated.

> ```ts
> static getMaxInactiveInterval(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The maximum inactive interval in seconds.
> :::

#### invalidate()

Invalidates this session, unbinding any objects bound to it.
After this call, the session is no longer valid.

> ```ts
> static invalidate(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### isNew()

Checks if the client does not yet know about the session, typically meaning
the server has not yet returned the session ID via a cookie or encoded URL.

> ```ts
> static isNew(): boolean;
> ```
>
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the session is new (not yet used in a response), false otherwise.
> :::

#### setAttribute()

Binds an object to this session, using the specified name.
This is the primary way to store data in the user's session.

> ```ts
> static setAttribute(name: string, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name to bind the object under. |
> | `value` | `any` | The value/object to store in the session. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### removeAttribute()

Removes the attribute with the given name from the session.

> ```ts
> static removeAttribute(name: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the attribute to remove. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setMaxInactiveInterval()

Specifies the maximum time interval, in seconds, that the server should keep this session open
between client requests before automatically invalidating it.

> ```ts
> static setMaxInactiveInterval(interval: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `interval` | `number` | The new interval in seconds. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

