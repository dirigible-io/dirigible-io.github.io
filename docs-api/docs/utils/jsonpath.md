---
title: JSONPath
---

JSONPath
===

JSONPath utility adapted for Dirigible.

=== "Overview"
- Module: `utils/jsonpath`
- Definition: N/A
- Source: [/utils/jsonpath.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/jsonpath.js)
- Status: `stable`
- Group: `core`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { jsonpath } from "@dirigible/utils";

    const json = {
        "store": {
            "book": [
                {
                    "category": "reference",
                    "author": "Nigel Rees",
                    "title": "Sayings of the Century",
                    "price": 8.95
                },
                {
                    "category": "fiction",
                    "author": "Evelyn Waugh",
                    "title": "Sword of Honour",
                    "price": 12.99
                },
                {
                    "category": "fiction",
                    "author": "Herman Melville",
                    "title": "Moby Dick",
                    "isbn": "0-553-21311-3",
                    "price": 8.99
                },
                {
                    "category": "fiction",
                    "author": "J. R. R. Tolkien",
                    "title": "The Lord of the Rings",
                    "isbn": "0-395-19395-8",
                    "price": 22.99
                }
            ],
            "bicycle": {
                "color": "red",
                "price": 19.95
            }
        },
        "expensive": 10
    }

    const actual = jsonpath({
        "path": "$.store..price",
        "json": json
    });

    console.log(actual)
    ```

=== "CommonJS"

    ```javascript
    const jsonpath = require('utils/jsonpath');

    const json = {
        "store": {
            "book": [
                {
                    "category": "reference",
                    "author": "Nigel Rees",
                    "title": "Sayings of the Century",
                    "price": 8.95
                },
                {
                    "category": "fiction",
                    "author": "Evelyn Waugh",
                    "title": "Sword of Honour",
                    "price": 12.99
                },
                {
                    "category": "fiction",
                    "author": "Herman Melville",
                    "title": "Moby Dick",
                    "isbn": "0-553-21311-3",
                    "price": 8.99
                },
                {
                    "category": "fiction",
                    "author": "J. R. R. Tolkien",
                    "title": "The Lord of the Rings",
                    "isbn": "0-395-19395-8",
                    "price": 22.99
                }
            ],
            "bicycle": {
                "color": "red",
                "price": 19.95
            }
        },
        "expensive": 10
    }

    const actual = jsonpath({
        "path": "$.store..price",
        "json": json
    });

    console.log(actual)
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**jsonpath(object)**   | Evaluate JSONPath from given expression and json object | *string*
