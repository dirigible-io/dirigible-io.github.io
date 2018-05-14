---
layout: samples
title: HTTP Request
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **http_service_project**.
2. Then create a JavaScript service named **http_service.js**.
3. Within the service code, enter the following content:

#### Simple HTTP Service

```javascript

var request = require('http/v3/request');
var response = require('http/v3/response');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();

```

---

For more information, see the *[API](../api/)* documentation.
