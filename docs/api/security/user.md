# User

## Overview

::: tip Module
- package: `@aerokit/sdk/security`
- source: [security/user.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/security/user.ts)
- last updated: 
:::

The User class provides static methods to access the security and session context of the currently authenticated user. It serves as a facade for the underlying UserFacade component, allowing developers to easily retrieve information about the user's identity, roles, session timeout, authentication type, security token, invocation count, and preferred language. This class is essential for implementing role-based access control and managing user sessions within applications built on the platform.

### Key Features:
- **User Identity**: Retrieve the principal name (username or ID) of the currently authenticated user.
- **Role Checking**: Determine if the user is assigned to specific security roles, enabling role-based access control.
- **Session Information**: Access session-related information such as remaining timeout and security tokens.
- **Invocation Tracking**: Monitor the number of requests made by the user during their session.
- **Localization Support**: Retrieve the user's preferred language setting for localization purposes.

### Use Cases:
- **Access Control**: Use the `isInRole` method to enforce role-based access control in your application, ensuring that only authorized users can access certain functionality.
- **Session Management**: Utilize session information to manage user sessions effectively, such as implementing session timeouts or tracking user activity.
- **Localization**: Leverage the user's preferred language to provide localized content and enhance the user experience.

### Example Usage:
```ts
import { User } from "@aerokit/sdk/security";

// Check if the current user is an administrator
if (User.isInRole("Administrator")) {
    console.log(`Welcome, ${User.getName()}! You have administrator access.`);
} else {
    console.log(`Hello, ${User.getName()}. You do not have administrator access.`);
}

// Get session information
const timeout = User.getTimeout();
const authType = User.getAuthType();
const securityToken = User.getSecurityToken();
const invocationCount = User.getInvocationCount();
const preferredLanguage = User.getLanguage();
```

## Classes

### User

#### getName()

Retrieves the principal name (username or ID) of the currently authenticated user.

> ```ts
> static getName(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The user's name or identifier as a string.
> :::

#### isInRole()

Checks if the currently authenticated user is assigned to a specific security role.

> ```ts
> static isInRole(role: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `role` | `string` | The name of the role to check (e.g., 'Administrator', 'User'). |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: True if the user is in the specified role, false otherwise.
> :::

#### getTimeout()

Retrieves the remaining session timeout for the current user session in seconds.

> ```ts
> static getTimeout(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The session timeout duration in seconds.
> :::

#### getAuthType()

Retrieves the authentication mechanism used for the current session (e.g., 'BASIC', 'FORM').

> ```ts
> static getAuthType(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The type of authentication used.
> :::

#### getSecurityToken()

Retrieves the security token associated with the current user session.
This might be a session ID or an access token.

> ```ts
> static getSecurityToken(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The security token as a string.
> :::

#### getInvocationCount()

Retrieves the number of requests (invocations) made by the current user
during the lifecycle of the current session.

> ```ts
> static getInvocationCount(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The total invocation count.
> :::

#### getLanguage()

Retrieves the preferred language setting (e.g., 'en', 'de', 'es') for the current user.

> ```ts
> static getLanguage(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The user's preferred language code.
> :::

