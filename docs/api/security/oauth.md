# OAuthClient

## Overview

::: tip Module
- package: `@aerokit/sdk/security`
- source: [security/oauth.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/security/oauth.ts)
- last updated: 
:::

The OAuthClient class provides a simple interface for obtaining OAuth access tokens using the client credentials grant type. It abstracts the process of making HTTP requests to an OAuth token endpoint, allowing developers to easily integrate OAuth authentication into their applications. By providing the necessary configuration parameters such as the token endpoint URL, client ID, and client secret, developers can use this class to retrieve access tokens that can be used for authenticating API requests or accessing protected resources.

### Key Features:
- **Token Retrieval**: The `getToken` method sends a POST request to the specified OAuth token endpoint with the client credentials and retrieves the access token.
- **Configurable Grant Type**: While the default grant type is set to 'client_credentials', developers can specify other grant types if needed by providing it in the configuration.

### Use Cases:
- **API Authentication**: The OAuthClient can be used to authenticate API requests by obtaining access tokens that are required for accessing protected endpoints.
- **Integration with OAuth Providers**: Developers can use this class to integrate their applications with various OAuth providers that support the client credentials grant type, enabling secure access to resources.

### Example Usage:
```ts
import { OAuthClient } from "@aerokit/sdk/security";

const oauthClient = new OAuthClient({
  url: "https://example.com/oauth/token",
  clientId: "your-client-id",
  clientSecret: "your-client-secret"
});
```

## Classes

### OAuthClient

#### getToken()

Executes the OAuth token request and returns the parsed response.

The request uses the client credentials grant type (default) and
sends credentials as URL-encoded parameters in the body.

> ```ts
> getToken(): any;
> ```
>
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: A parsed JSON object containing the OAuth token (e.g., { access_token: string, expires_in: number, ... }).
> :::

