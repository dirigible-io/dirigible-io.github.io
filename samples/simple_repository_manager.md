---
layout: samples
title: Repository Manager
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **repository-manager-test**.
2. Then create a JavaScript service named **repository-test.js**.
3. Within the service code, enter the following content:

#### Log Levels

```javascript

var response = require("http/v4/response");
var repositoryManager = require("repository/v4/manager");

repositoryManager.createResource("/registry/public/test/file.js", "console.log('Hello World');", "application/json");
var resource = repositoryManager.getResource("/registry/public/test/file.js");
var content = resource.getText();

response.println(content);
response.flush();
response.close();
```

---

For more information, see the *[API](../api/)* documentation.
