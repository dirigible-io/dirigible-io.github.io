# Translator

## Overview

::: tip Module
- package: `@aerokit/sdk/db`
- source: [db/translator.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/db/translator.ts)
- last updated: 
:::

This module provides static methods for translating entity properties based on a dedicated language table.
Translation is achieved by querying a separate table (e.g., 'BASE_TABLE_LANG') and merging
the translated fields back into the original data.

### Key Features
- Translates properties for a list of entities based on a specified language code.
- Translates properties for a single entity based on its ID and a specified language code.
- Handles cases where the language table may not be present, providing error logging.

### Use Cases
- Supporting multilingual applications by translating entity properties according to user preferences or locale settings.
- Integrating with existing database schemas that use separate language tables for translations.
- Providing a consistent translation mechanism across different modules that require localized data.

### Example Usage
```ts
import { Translator } from "@aerokit/sdk/db";

// Example: Translating a list of products to German
const products = [
  { Id: 1, Name: "Laptop", Description: "A portable computer" },
  { Id: 2, Name: "Phone", Description: "A mobile device" }
];
const translatedProducts = Translator.translateList(products, 'de', 'PRODUCTS');
console.log(translatedProducts);

// Example: Translating a single user entity to French
const user = { Id: 1, FirstName: "John", LastName: "Doe" };
const translatedUser = Translator.translateEntity(user, 1, 'fr', 'USERS');
console.log(translatedUser);
```

## Classes

### Translator

#### translateList()

Translates properties for a list of entities by querying the corresponding language table.

> ```ts
> static translateList(list: any, language: string, basetTable: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `list` | `any` | The array of entities to be translated. |
> | `language` | `string` | The target language code (e.g., 'en', 'de'). If undefined, no translation occurs. |
> | `basetTable` | `string` | The name of the base entity table (used to derive the language table name). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: The translated array of entities.
> :::

#### translateEntity()

Translates properties for a single entity by querying the corresponding language table.

> ```ts
> static translateEntity(entity: any, id: any, language: string, basetTable: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `entity` | `any` | The entity object to be translated. |
> | `id` | `any` | The ID of the entity. |
> | `language` | `string` | The target language code (e.g., 'en', 'de'). If undefined, no translation occurs. |
> | `basetTable` | `string` | The name of the base entity table. |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: The translated entity object.
> :::

