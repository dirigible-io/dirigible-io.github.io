---
title: Console
hide:
  - toc
---

# Console

### Steps

1. Create a project `sample-builtin-console`.
2. Then create a JavaScript service named `console-log.js`.
3. Within the service code, enter the following content:

```javascript
// Info
console.info("Info message.");
// Error
console.error("Error message.");
// Warning
console.warn("Warning message.");

// Arguments
var firstName = "John";
var lastName = "Smith";
console.log(`First name: ${firstName}, last name: ${lastName}`);
```

---

> For more information, see the _[API](https://www.dirigible.io/api/console/)_ documentation.
