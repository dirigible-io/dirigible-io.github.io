# Client

## Overview

::: tip Module
- package: `@aerokit/sdk/etcd`
- source: [etcd/client.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/etcd/client.ts)
- last updated: 
:::

This module provides a `Client` class for interacting with the Etcd key-value store within the Dirigible environment. The `Client` class allows developers to perform basic operations such as putting (writing) values, getting values, and deleting keys in Etcd. It also includes utility functions for converting between JavaScript types and the native Java/Etcd types used by the underlying Etcd client library.

### Key Features
- Put string or byte array values to Etcd keys.
- Get values from Etcd keys with options for string or byte array formats.
- Retrieve metadata about the Etcd cluster and key-value store through response headers.
- Delete keys from Etcd.

### Use Cases
- Storing configuration data or application state in Etcd for distributed applications.
- Retrieving and managing key-value pairs in Etcd for service discovery, configuration management, or coordination tasks.
- Integrating with other modules that require a consistent interface for interacting with Etcd as a backend store.

### Example Usage
```ts
import { Client } from "@aerokit/sdk/etcd";

const etcdClient = new Client();

// Put a string value to a key
etcdClient.putStringValue("config/appName", "MyApp");

// Get the string value of a key
const appName = etcdClient.getKvsStringValue("config/appName");
console.log(appName); // Output: { "config/appName": "MyApp" }

// Delete a key
etcdClient.delete("config/appName");
```

## Classes

### Header

#### getRevision()

The revision of the key-value store when the request was processed.

> ```ts
> getRevision(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getClusterId()

The ID of the cluster which the request was sent to.

> ```ts
> getClusterId(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getMemberId()

The ID of the member which the request was handled by.

> ```ts
> getMemberId(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

#### getRaftTerm()

The Raft term.

> ```ts
> getRaftTerm(): string;
> ```
>
>
> ::: info Returns
> - **Type**: `string`
> - **Description**: 
> :::

### GetResponse

#### getHeader()

Retrieves the response header containing cluster metadata.

> ```ts
> getHeader(): Header;
> ```
>
>
> ::: info Returns
> - **Type**: `Header`
> - **Description**: 
> :::

#### getKvsString()

Retrieves the Key-Value pairs with values converted to strings.

> ```ts
> getKvsString(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getKvsByteArray()

Retrieves the Key-Value pairs with values converted to Int8Array (byte arrays).

> ```ts
> getKvsByteArray(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getCount()

Retrieves the number of Key-Value pairs returned.

> ```ts
> getCount(): number;
> ```
>
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: 
> :::

### Client

#### putStringValue()

Puts (writes) a string value to the specified key.

> ```ts
> putStringValue(key: string, value: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to write to. |
> | `value` | `string` | The string value. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### putByteArrayValue()

Puts (writes) a byte array value to the specified key.

> ```ts
> putByteArrayValue(key: string, value: Int8Array): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to write to. |
> | `value` | `Int8Array` | The Int8Array (byte array) value. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getHeader()

Retrieves the response header metadata for a key.

> ```ts
> getHeader(key: string): Header;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to query. |
>
> ::: info Returns
> - **Type**: `Header`
> - **Description**: The Header object.
> :::

#### getKvsStringValue()

Retrieves the Key-Value pairs as a JavaScript object with string values.

> ```ts
> getKvsStringValue(key: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key (or key prefix) to query. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An object mapping keys to string values.
> :::

#### getKvsByteArrayValue()

Retrieves the Key-Value pairs as a JavaScript object with Int8Array values.

> ```ts
> getKvsByteArrayValue(key: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key (or key prefix) to query. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An object mapping keys to Int8Array values.
> :::

#### getCount()

Retrieves the count of Key-Value pairs matching the key (or key prefix).

> ```ts
> getCount(key: string): number;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key (or key prefix) to query. |
>
> ::: info Returns
> - **Type**: `number`
> - **Description**: The count of matching entries.
> :::

#### delete()

Deletes the specified key.

> ```ts
> delete(key: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `key` | `string` | The key to delete. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

