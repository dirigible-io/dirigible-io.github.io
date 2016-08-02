---
title: Why Enterprise JavaScript?
author: nedelcho.delchev
---


Enterprise JavaScript - it sounds like an oxymoron isn't it? JavaScript evolved last years not only as "the language" for the browsers, but also as a server-side scripting language. There are already some implementations based on different underlying engines, which leads to different features sets. Let's name a few engines e.g. Mozilla Rhino, Nashorn, V8, SpiderMonkey and a couple of frameworks enhancing each of these base JavaScript engines - Node.js, RingoJS, Narwhal and many more. Here we don't even count the JavaScript derivative intermediate languages like Objective-J, TypeScript, CoffeeScript, etc.

How can the business application developer choose where to start from? Which engine best meets the developer’s needs? Is it true that the fastest engine is always the best one? Are there others non-functional requirements like maintainability, portability, supportability, compatibility, testability, usability, etc. which can have even bigger priority than the particular engine's and framework's performance?

If we talk about the biggest enterprises, the questions like "shall we invest in a given language, engine, framework or platform?" are never so simple to answer. There are many different viewpoints, various aspects that have to be considered, and last but not least, the quality attributes of the given component have to be precisely evaluated.

What we did so far in Eclipse Dirigible when it comes to consciousness and pragmatism? We already set **JavaScript** as the major scripting language supported by the platform. The availability - engines and tooling, maturity and popularity were the main driving forces in our case. The dynamic typing nature of the language itself is a perfect match with the concept of *dynamic applications* we focus on, but has never been the strongest reason for choosing it.

So far so good. Now, what can the developers do with this JavaScript language? Shall they start building all the required commodity frameworks for HTTP communication, database access, encryption and many more, which are de-facto standard basis in the other languages? Obviously, this is not exactly the perspective that the business developers see for themselves by starting to use one of the most powerful cloud development platforms, which Eclipse Dirigible claims to be. Coming from the *Java* world as many of you, the natural question is - can I reuse somehow the frameworks and APIs that I am already familiar with? But in the same time, should I go to JavaScript only modules to keep the source code clean, or I can mix Java classes and JavaScript? How easy would it be to port my source code from *Java* based engines like Rhino and Nashorn to non-Java ones e.g V8 later on?

Having in mind all these questions, we can define our mission statement for the Enterprise JavaScript:

**The ultimate goal of the "Enterprise JavaScript" is to provide a set of a standard yet powerful APIs, which can be used by the business applications developer right away.**

The benefits are:

* Completeness
  * Rich, but still standardized APIs;
  * Expose legacy components and frameworks to the new environment;
* Portability
  * No tight vendor lock-in to the currently chosen underlying JavaScript platform;
  * OS, platform and database agnostic;
  * Developers can stick to native JavaScript objects and primitives only in their source code;
* Usability
  * The API itself is a standard Eclipse Dirigible project, hence can have the same life-cycle as the rest of the projects;


Let's see a few examples what we are targeting on:


#### Database Access

Very natural for a Java-saurus is to use the JDBC API for access and management of relational databases. It provides classes and methods for the manipulation of the data and the metadata. It is powerful enough and in the same time, well known, so can we reuse it?
The module [db/database](http://www.dirigible.io/api/database.html) gives the port of the main JDBC objects for data management - Datasource, Connection, Statement, ResultSet. An example of how to query the records from a table and print the result into the response stream looks like this:

```javascript

var database = require('db/database');
var response = require('net/http/response');

var datasource = database.getDatasource(); // default

var connection = datasource.getConnection();
try {
    var statement = connection.prepareStatement("select * from DGB_FILES where FILE_PATH like ?");
    var i = 0;
    statement.setString(++i, "%");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println("[path]: " + resultSet.getString("FILE_PATH"));
    }
    resultSet.close();
    statement.close();
} catch(e) {
    console.trace(e);
    response.println(e.message);
} finally {
    connection.close();
}

response.flush();
response.close();

```


#### HTTP Communication

Another very popular API used in the above example is the Servlet API giving the access from the service body to the current Request, Response and Session objects. You can find more info in the modules [net/http/request](http://www.dirigible.io/api/http_request.html), [net/http/response](http://www.dirigible.io/api/http_response.html) and [net/http/session](http://www.dirigible.io/api/http_session.html). What we decided to include also in the Enterprise JavaScript is the de-facto standard component for handling of the uploaded binary files. Here is the moment to send big thanks to the Apache guys. Of course, we simplified a lot the API itself and added some utilities functions to make it convenient for the JavaScript developers:

```javascript

var upload = require('net/http/upload');
var request = require('net/http/request');
var response = require('net/http/response');

if (request.getMethod() === "POST") {
	if (upload.isMultipartContent()) {
		var files = upload.parseRequest();
		files.forEach(function(file) {
			response.println("[File Name] " + file.name);
			response.println("[File Data]");
			// response.println(file.data); // as a raw byte array or as a string below
			response.println(String.fromCharCode.apply(null, file.data));
		});
	} else {
		response.println("The request's content must be 'multipart'");
	}
} else if (request.getMethod() === "GET") {
	response.println("Use POST request.");
}

response.flush();
response.close();

```

More info can be found in module [net/http/upload](http://www.dirigible.io/api/http_upload.html).

We also needed an HTTP client API to call external services. This one we defined similar to jQuery, no matter it is backed by the Apache's HTTPClient. You can use the module [net/http/client](http://www.dirigible.io/api/http_client.html) to retrieve the raw data from an endpoint and print it to the response stream:

```javascript

var http = require('net/http/client');
var response = require('net/http/response');

var options = {
    method: 'GET', // default
    host: 'http://services.odata.org',
    port: 80,
    path: '/V4/Northwind/Northwind.svc/',
    binary: false 
};

var httpResponse = http.request(options);

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();

```

or even simpler:

```javascript

var httpResponse = httpClient.get('http://services.odata.org/V4/Northwind/Northwind.svc/');

```


### WebSockets and SOAP

If you need bi-directional communication channel in your use case, you can utilize the WebSockets module [net/websocket](http://www.dirigible.io/api/websocket.html). You can implement a handler for the received messages as well as to send messages back through the channel of the same session.

Can we name this API "Enterprise" without including the SOAP web services? Of course, not! In the module [net/soap](http://www.dirigible.io/api/soap.html) you can find how to construct a SOAP massage in order to be able to call an external SOAP web service. You can even create your own SOAP web service! Although, we are not completely sure why you would do this, but you can.


### Files and Streams

To standardize the IO access to the underlying file system we added the module [io/files](http://www.dirigible.io/api/files.html). How to create, copy and delete a file with this module is shown below:

```javascript

files.createFile("../temp/file1.txt");
files.copy("../temp/file1.txt", "../temp/file2.txt");
files.delete("../temp/file2.txt");

```

You can also read, write and inspect the file and folders attributes.

Reading from and writing to streams, for example, memory byte arrays, is possible via the module [net/streams](http://www.dirigible.io/api/streams.html).


### Indexing, Messaging, Mail...

The modules under the main package **service** e.g. [service/indexing](http://www.dirigible.io/api/indexing.html), [service/messaging](http://www.dirigible.io/api/messaging.html), and so on represents the underlying platform services. These services, as well as their management and operation, are usually provided by the platform on which Eclipse Dirigible is running. The quality and the performance of the services themselves can differ depending on the platform provider, but the goal here is to provide a unified manner of using such standard services, or at least the common denominator of their capabilities.

For instance if you want to create a free text search index, you can do it like this:

```javascript

var indexing = require('service/indexing');
var response = require('net/http/response');

var index = indexing.getIndex("myIndex");
var document1 = {
       "id": "1",
       "content": "some cool content 1"
    };
var document2 = {
       "id": "2",
       "content": "some cool content 2"
    };

index.add(document1);
index.add(document2);

var results = index.search("cool");
for (var i=0;i<results.length;i++) {
	var result = results[i];
    response.println("[Found for 'cool']: " + result.id);    
}

results = index.search("1");
for (var i=0;i<results.length;i++) {
	result = results[i];
    response.println("[Found for '1']: " + result.id);
}

results = index.search("2");
for (var i=0;i<results.length;i++) {
	result = results[i];
    response.println("[Found for '2']: " + result.id);
}

index.clear();

response.flush();
response.close();


```

Eclipse Dirigible provides default sample implementations of all the service APIs. To be able to redirect the API to the real platform service, you need to implement an adapter plugin to this service if it is not already available and then to configure the usage.


### Utilities

Another set of modules under the package **utils**, provides some commodity functionality backed mainly by the Apache Commons - [utils/base64](http://www.dirigible.io/api/utils_base64.html), [utils/digest](http://www.dirigible.io/api/utils_digest.html), [utils/hex](http://www.dirigible.io/api/utils_hex.html), etc.

```javascript

var hex = require('utils/hex');
var response = require('net/http/response');

response.println(hex.encode('Hex Encoded'));
response.println(hex.decode('48657820456e636f646564'));

response.flush();
response.close();

```


### Threads

What would you say to have thread management API in JavaScript? This is missing even in the most popular - Node.js framework. In the Enterprise JavaScript module [core/threads](http://www.dirigible.io/api/threads.html) you can use a simple function as a "runnable" object. You can start/stop new threads, wait and notify locks and even use of synchronized functions.

```javascript

var threads = require('core/threads');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");

// Define a JavaScript function
function runnable() {
	response.println("Hello World from a Thread!");
};

// Pass a JavaScript function
var worker = threads.create(runnable, "I am a thread");
response.println(worker.getName());
worker.start();
worker.join(); // to be able to print to the response

response.flush();
response.close();

```

> Be sure that you use this module with caution!


## References

Did you like it? Do you plan to base your development on Eclipse Dirigible against the Enterprise JavaScript?
Everything you need to know about it is at [http://api.dirigible.io](http://api.dirigible.io) and [http://samples.dirigible.io](http://samples.dirigible.io).


## Enjoy!
