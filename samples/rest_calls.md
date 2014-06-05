
h1. REST Call

Create a *Project* *RESTCall* and a *JavaScript* service *rest_call.js* with the following content:

*GET Call*
{code}
var ioLib = require('io');

var url = 'http://rest.call/example';

var getRequest = http.createGet(url);
var httpClient = http.createHttpClient();
var httpResponse = httpClient.execute(getRequest);
var entity = httpResponse.getEntity();
var content = entity.getContent();

var input = ioLib.read(content);
http.consume(entity);

response.getWriter().println(input);
{code}

{warning}
The present restriction is that you can make REST calls only to services in the current domain
{warning}

Parsing *input* to JSON 
{code}
var json = JSON.parse(input);
{code}

*POST Call*
{code}
var postRequest = http.creatPost(url);
{code}

*PUT Call*
{code}
var putRequest = http.createPut(url);
{code}

*DELETE Call*
{code}
var deleteRequest = http.createDelete(url);
{code}

For more information check the *[API|../help/api.wiki]* documentation