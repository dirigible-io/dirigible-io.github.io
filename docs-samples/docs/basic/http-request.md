---
title: HTTP - Request
hide:
  - toc
---

# HTTP - Request

### Steps

1. Create a project `http-service`.
2. Then create a JavaScript service named `http-service.js`.
3. Within the service code, enter the following content:

#### Simple HTTP Service

    ```javascript
    var request = require("http/v4/request");
    var response = require("http/v4/response");

    var method = request.getMethod();

    response.println("[Method]: " + method);
    response.flush();
    response.close();
    ```

---

> For more information, see the _[API](https://www.dirigible.io/api/http/request/)_ documentation.
