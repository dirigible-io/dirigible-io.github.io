# Searcher

## Overview

::: tip Module
- package: `@aerokit/sdk/indexing`
- source: [indexing/searcher.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/indexing/searcher.ts)
- last updated: 
:::

The Searcher class provides a static façade for performing term-based and time-based queries against a native indexing service. It allows developers to execute keyword searches and filter indexed entries based on their indexing timestamps, facilitating efficient retrieval of relevant data from the index.

### Key Features:
- **Keyword Search**: The `search` method enables searching for entries in a specified index using keywords or search phrases.
- **Time-Based Queries**: The `before`, `after`, and `between` methods allow filtering indexed entries based on their indexing timestamps, enabling retrieval of entries indexed before, after, or within a specific date range.

### Use Cases:
- **Data Retrieval**: Developers can use the Searcher class to retrieve relevant data from an index based on keywords or time criteria, which is essential for applications that rely on indexed data for search functionality.
- **Index Management**: The time-based query methods can be useful for managing and maintaining the index by identifying entries that may need to be updated or removed based on their age.

### Example Usage:
```ts
import { Searcher } from "@aerokit/sdk/indexing";

// Perform a keyword search in the 'documents' index
const results = Searcher.search('documents', 'example search term');
console.log(results);

// Find entries indexed before a specific date
const oldEntries = Searcher.before('documents', new Date('2023-01-01'));
console.log(oldEntries);

// Find entries indexed after a specific date
const recentEntries = Searcher.after('documents', new Date('2023-06-01'));
console.log(recentEntries);

// Find entries indexed between two dates
const entriesInRange = Searcher.between('documents', new Date('2023-01-01'), new Date('2023-06-01'));
console.log(entriesInRange);
```

## Classes

### Searcher

#### search()

Executes a keyword search against a specified index.

> ```ts
> static search(index: string, term: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `string` | The name or identifier of the index to search (e.g., 'documents', 'products'). |
> | `term` | `string` | The keyword or search phrase to look for. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of result objects, parsed from the native JSON string output.
> :::

#### before()

Finds all entries in the index that were indexed before the specified date.

> ```ts
> static before(index: string, date: Date): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `string` | The name or identifier of the index. |
> | `date` | `Date` | The Date object representing the upper bound (exclusive) of the time range. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of result objects, parsed from the native JSON string output.
> :::

#### after()

Finds all entries in the index that were indexed after the specified date.

> ```ts
> static after(index: string, date: Date): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `string` | The name or identifier of the index. |
> | `date` | `Date` | The Date object representing the lower bound (exclusive) of the time range. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of result objects, parsed from the native JSON string output.
> :::

#### between()

Finds all entries in the index that were indexed within the specified date range.

> ```ts
> static between(index: string, lower: Date, upper: Date): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `index` | `string` | The name or identifier of the index. |
> | `lower` | `Date` | The Date object for the lower bound (exclusive). |
> | `upper` | `Date` | The Date object for the upper bound (exclusive). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: An array of result objects, parsed from the native JSON string output.
> :::

