---
layout: samples
title: REST Call with Binary Response
icon: fa-caret-right
group: basic
---

{{ page.title }}
===

### Steps


1. Create a project **rest_call_binary_project**.
2. Then create a JavaScript service named **get_call_binary.js**.
3. Within the service code, enter the following content:

#### GET Call

```javascript

var client = require('http/v3/client');
var response = require('http/v3/response');

var httpResponse = client.get('https://raw.githubusercontent.com/eclipse/dirigible/master/NOTICE.txt', {'binary': true});

response.println(httpResponse.statusMessage);
response.println(JSON.stringify(httpResponse.data));
response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
