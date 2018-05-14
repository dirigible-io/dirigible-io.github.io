---
layout: samples
title: REST Service
icon: fa-caret-right
group: simple
---

{{ page.title }}
===

### Steps


1. Create a project **rest_service_project**.
2. Then create a JavaScript service named **rs_service.js**.
3. Within the service code, enter the following content:

#### Simple Hello World Service

```javascript

var rs = require('http/v3/rs');

// serve GET HTTP requests sent to resource path ""
rs.service()
    .resource("")
      .get(function(ctx, request, response){
         response.println("Hello World!");
       })
  .execute();

```

---

For more information, see the *[API](../api/)* documentation and the guide [here](../help/concepts_rest.html).
