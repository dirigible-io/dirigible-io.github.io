---
layout: samples
title: Samples - REST Call
icon: fa-phone-square
group: simple
---

REST Call
===

Create a *Project* *RESTCall* and a *JavaScript* service *rest_call.js* with the following content:

*GET Call*
<pre><code>var ioLib = require('io');

var url = 'http://rest.call/example';

var getRequest = http.createGet(url);
var httpClient = http.createHttpClient();
var httpResponse = httpClient.execute(getRequest);
var entity = httpResponse.getEntity();
var content = entity.getContent();

var input = ioLib.read(content);
http.consume(entity);

response.getWriter().println(input);
</code></pre>

> The present restriction is that you can make REST calls only to services in the current domain

Parsing *input* to JSON 

<pre><code>var json = JSON.parse(input);
</code></pre>

*POST Call*

<pre><code>var postRequest = http.creatPost(url);
</code></pre>

*PUT Call*

<pre><code>var putRequest = http.createPut(url);
</code></pre>

*DELETE Call*
<pre><code>var deleteRequest = http.createDelete(url);
</code></pre>

For more information check the *[API](../help/api.html)* documentation