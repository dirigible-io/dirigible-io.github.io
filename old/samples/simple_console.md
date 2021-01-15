---
layout: samples
title: Console Log Levels
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **console_project**.
2. Then create a JavaScript service named **console_test.js**.
3. Within the service code, enter the following content:

#### Log Levels

```javascript

console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.log("Log message.");
console.trace("Trace.");

```

---

For more information, see the *[API](../api/)* documentation.
