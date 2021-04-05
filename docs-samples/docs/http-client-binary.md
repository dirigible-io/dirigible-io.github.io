---
title: HTTP Client - Binary Response
hide:
  - toc
---

HTTP Client - Binary Response
===

### Steps


1. Create a project `rest-call-binary-project`.
2. Then create a JavaScript service named `get-call-binary.js`.
3. Within the service code, enter the following content:

```javascript

var client = require("http/v4/client");
var response = require("http/v4/response");

var httpResponse = client.get("https://raw.githubusercontent.com/eclipse/dirigible/master/NOTICE.txt", {
	binary: true
});

response.println(httpResponse.statusMessage);
response.println(JSON.stringify(httpResponse.data));
response.flush();
response.close();

```

---

> For more information, see the *[API](../../api/)* documentation.
