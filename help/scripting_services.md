---
layout: help
title: Scripting Services
icon: fa-pencil-square-o
group: help-features
---

Scripting Services
===

JavaScript
---

Services
---

Primary language used to implement services in Dirigible is JavaScript. Being quite popular as a client-side scripting, it became also prefered language for server-side business logic as well.
For the underlying execution engine is used the most mature JavaScript engine written in Java - [Rhino](https://developer.mozilla.org/en-US/docs/Rhino) by Mozilla.
You can write your algorithms in *.js files and store them within the ScriptingServices folder. After the Activation or Publishing they can be executed by accessing the endpoint respectively at the [sandbox](activation.html) or [public registry](publication.html).

An example JavaScript service looks like this:

<pre><code>var systemLib = require('system');

var count;
var connection = datasource.getConnection();
try {
    var statement = connection.createStatement();
    var rs = statement.executeQuery('SELECT COUNT(*) FROM BOOKS');
    while (rs.next()) {
        count = rs.getInt(1);
    }
    systemLib.println('count: '  + count);
} finally {
    connection.close();
}

response.getWriter().println(count);
response.getWriter().flush();
response.getWriter().close();
</code></pre>

This example shows two major benefits:

*	Modularization based on built-in [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) ('require' function on the first line)
*	Native usage of the Java objects as [API](api.html) injected in the execution context (database, response)

Libraries (Modules)
---

You can create your own library modules in *.jslib files. Just do not forget to add the public parts in the *exports*.

<pre><code>exports.generateGuid = function() {
    var guid = uuid.randomUUID();
    return guid;
};
</code></pre>

> The libraries are not directly exposed as services, hence they do not have accessible endpoints in the registry.

The reference of the library module from the service is done by using the standard function *require()* where the parameter is the location of the module constructed as follows:
*<project_name>/<module_path>*
Module path includes the full path to the module in the project structure without the predefined folder ScriptingServices and also without the extension *.jslib.


<pre><code>/sample_project
    /ScriptingServices
        /service1.js
        /library1.jslib
        
library1.jslib is refered in service1.js:
...
var library1 = require('sample_project/library1');
...
</code></pre>

> Relative paths ('.', '..') are not supported. The project name must be explicitly defined.


Ruby
---

Language which also expanding its popularity in web development scenarios last years is [Ruby](http://www.ruby-lang.org/en/).
You can use also the standard modularization provided by the language as well as the injected context objects in the same way as in JavaScript.
The execution engine used as runtime container is [jRuby](http://jruby.org/)

Example service which has reference to a module can be generated from the Scripting Services wizard directly:

Service (sample.rb):

<pre><code>require "/sample_project/module1"
Module1.helloworld("Jim")
</code></pre>

and Module (module1.rb):

<pre><code>module Module1
  def self.helloworld(name)
    puts "Hello, #{name}"
    $response.getWriter().println("Hello World!")
  end
end
</code></pre>

> Note that in Ruby you have to put a dollar sign ('$') in the beginning of the API objects ($response) as they are global objects

Groovy
---

Groovy is yet another powerful language for web development nowadays with its static types, OOP abilities and many more.

Corresponding examples in Groovy:

Service (sample.groovy):
<pre><code>import sample_project.module1;

def object = new Module1();
object.hello(response);
</code></pre>

Module (module1.groovy):

<pre><code>class Module1{
    void hello(def response){
        response.getWriter().println("Hello from Module1")
    }
}
</code></pre>
