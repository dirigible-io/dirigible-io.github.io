---
layout: samples
title: Generate a Random Universally Unique Identifier
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps

1. Create a project **utils_uuid**.
2. Create a JavaScript service with the name **uuid_random_generator.js**.
3. Enter the following content:

```javascript

var uuid = require('utils/modules').getUuid();
var response = require('http/v3/response');

var generated = uuid.random();

console.log(generated);
uuid.validate(generated);

console.log('Randomly Generated UUID: ' + generated);
response.println(JSON.stringify('Randomly Generated UUID: ' + generated));

response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
