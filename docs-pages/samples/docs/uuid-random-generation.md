---
title: UUID - Random Generation
hide:
  - toc
---

UUID - Random Generation
===

### Steps

1. Create a project `utils-uuid`.
2. Create a JavaScript service with the name `uuid-random-generator.js`.
3. Enter the following content:

```javascript

var uuid = require("utils/v4/uuid");
var response = require("http/v4/response");

var generated = uuid.random();

console.log(generated);
uuid.validate(generated);

console.log("Randomly Generated UUID: " + generated);
response.println(JSON.stringify("Randomly Generated UUID: " + generated));

response.flush();
response.close();

```

---

> For more information, see the *[API](../api/)* documentation.
