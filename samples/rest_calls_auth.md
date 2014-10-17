---
layout: samples
title: Authorization
icon: fa-lock
group: simple
---

REST Call with Authorization Header
===

Most of the RESTfull services playing role as remote APIs require some kind of authentication. In the following example, we use *Basic* scheme with authorization header as specified at [RFC 2617](https://www.ietf.org/rfc/rfc2617.txt). The target service could be OData service, from which we explicitly ask for JSON format as well.
 
1. Create a project **Authorization**.
2. Then create a JavaScript service named **rest_call_authorization.js**.
3. Within the service code, enter the following content:

<i><b>GET Call</b></i>
<pre><code>var ioLib = require('io');

var url = 'http://rest.call/example';
var user = 'user1';
var password = 'secret1';

var getRequest = http.createGet(url);
var httpClient = http.createHttpClient(true);
var credentials = http.createUsernamePasswordCredentials(user, password);    
var scheme = http.createBasicScheme();
var authorizationHeader = scheme.authenticate(credentials, getRequest);
getRequest.addHeader(http.createBasicHeader("Accept", "application/json"));
getRequest.addHeader(authorizationHeader);
    
var httpResponse = httpClient.execute(getRequest);
    
var entity = httpResponse.getEntity();
var content = entity.getContent();
    
var input = ioLib.read(content);
http.consume(entity);

response.getWriter().println(input);
</code></pre>

For more information, see the *[API](../help/api.html)* documentation.