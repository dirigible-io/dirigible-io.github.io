---
title: Alphanumeric
---

Alphanumeric
===

Alphanumeric object is used to check whether a given string is alpha-numeric and to generate random strings.

=== "Overview"
- Module: `utils/alphanumeric`
- Definition: N/A
- Source: [/utils/alphanumeric.js](https://github.com/eclipse/dirigible/blob/master/components/api-utils/src/main/resources/META-INF/dirigible/utils/alphanumeric.js)
- Status: `stable`

### Basic Usage

```javascript
var alphanumeric = require("utils/alphanumeric");
var response = require("http/response");

response.println(alphanumeric.toAlphanumeric("@mystring123!#="));

response.flush();
response.close();
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**toAlphanumeric(input)**   | Remove non-alpha-numeric letters | *string*
**randomString(length, charset)**   | Generates alpha-numeric string in a given charset and with given length | *string*
**alphanumeric(length, lowercase)**   | Generates alpha-numeric string | *string*
**alpha(length, lowercase)**   | Generates alpha string | *string*
**numeric(length)**   | Generates alpha-numeric string | *string*
**isNumeric(input)**   | Checks is the input is a numeric string | *string*
**isAlphanumeric(input)**   | Checks is the input is a alpha-numeric string | *string*

