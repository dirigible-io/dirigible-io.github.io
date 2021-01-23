---
title: REST Service
hide:
  - toc
---

REST Service
===

### Steps


1. Create a project `rest-service-project`.
2. Then create a JavaScript service named `rs-service.js`.
3. Within the service code, enter the following content:

```javascript

var rs = require("http/v4/rs");

// serve GET HTTP requests sent to resource path ""
rs.service()
    .resource("")
      .get(function(ctx, request, response){
         response.println("Hello World!");
       })
  .execute();


```

---

> For more information, see the *[API](../../api/)* documentation and the guide [here](../../help/development/concepts/rest).
