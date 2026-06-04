# Env

## Overview

::: tip Module
- package: `@aerokit/sdk/core`
- source: [core/env.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/core/env.ts)
- last updated: 
:::



## Classes

### Env

#### get()

Retrieves the value of the environment variable with the specified name.

> ```ts
> static get(name: string): string;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `name` | `string` | The name of the environment variable. |
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: The variable's value as a string, or `undefined` if the variable is not set.
> :::

#### list()

Retrieves a map of all environment variables currently exposed to the application.

> ```ts
> static list(): EnvValues;
> ```
>
>
> ::: info Returns
> - **Type**: `EnvValues`
> - **Description**: An EnvValues object containing all environment variables as key-value pairs.
> :::

