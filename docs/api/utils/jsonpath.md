# JSONPath

## Overview

::: tip Module
- package: `@aerokit/sdk/utils`
- source: [utils/jsonpath.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/utils/jsonpath.ts)
- last updated: 
:::

The JSONPath class provides a powerful and flexible way to query and manipulate JSON data structures using a path expression syntax. It allows developers to extract specific values, paths, or parent information from complex JSON objects and arrays based on defined criteria. The class supports various result types, including values, paths, pointers, and parent references, making it a versatile tool for working with JSON data in JavaScript applications.

### Key Features:
- **Path Expression Syntax**: JSONPath expressions allow for complex querying of JSON structures, including wildcard searches, recursive descent, filtering, and more.
- **Multiple Result Types**: Developers can specify the desired output format, such as values, paths, pointers, or parent references, to suit their specific use cases.
- **Callback Support**: The class provides callback functionality to handle results as they are found during the evaluation of JSONPath expressions.
- **Sandboxed Evaluation**: JSONPath expressions can be evaluated in a sandboxed environment to prevent potential security risks associated with evaluating arbitrary code.

### Use Cases:
- **Data Extraction**: Extract specific values or paths from large and complex JSON objects without needing to manually traverse the structure.
- **Data Transformation**: Use JSONPath expressions to identify and transform specific parts of a JSON object based on certain criteria.
- **Filtering Data**: Apply filters to JSON data to retrieve only the relevant information based on conditions defined in the JSONPath expression.

### Example Usage:
```ts
import { JSONPath } from "@aerokit/sdk/utils";
const data = {
 store: {
  book: [
    { category: "reference", author: "Nigel Rees", title: "Sayings of the Century", price: 8.95 },
    { category: "fiction", author: "Evelyn Waugh", title: "Sword of Honour", price: 12.99 },
    { category: "fiction", author: "Herman Melville", title: "Moby Dick", price: 8.99 },
    { category: "fiction", author: "J. R. R. Tolkien", title: "The Lord of the Rings", price: 22.99 }
  ],
  bicycle: { color: "red", price: 19.95 }
}
// Extract the authors of all books in the store
const authors = JSONPath({ path: "$.store.book[*].author", json: data });
console.log(authors); // Output: ["Nigel Rees", "Evelyn Waugh", "Herman Melville", "J. R. R. Tolkien"]
// Extract the price of the bicycle
const bicyclePrice = JSONPath({ path: "$.store.bicycle.price", json: data });
console.log(bicyclePrice); // Output: 19.95
// Extract all items in the store with a price less than 10
const cheapItems = JSONPath({ path: "$.store..[?(@.price<10)]", json: data });
console.log(cheapItems); // Output: [{ category: "reference", author: "Nigel Rees", title: "Sayings of the Century", price: 8.95 }, { category: "fiction", author: "Herman Melville", title: "Moby Dick", price: 8.99 }]
```

## Classes

