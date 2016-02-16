---
layout: help
title: Scripting Services
icon: fa-pencil-square-o
group: help-features
---

Scripting Services
===

###JavaScript###

**Services**	

Primary language used to implement services in Dirigible is JavaScript. Being quite popular as client-side scripting, it became also the preferable language for server-side business logic. For the underlying execution engine is used the most mature JavaScript engine written in Java - [Rhino](https://developer.mozilla.org/en-US/docs/Rhino) by Mozilla.
You can write your algorithms in **\*.js** files and store them within the *ScriptingServices* folder. After the activation or publishing, they can be executed by accessing the endpoint at [sandbox](activation.html) or [public registry](publication.html), respectively.

Exemplary JavaScript service:

		var systemLib = require('system');
		
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


This example shows two major benefits:

*	Modularization based on built-in [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) ('require' function on the first line)
*	Native usage of Java objects as [API](api.html) injected in the execution context (database, response)

###Libraries (Modules)###

You can create your own library modules in **\*.js** files. Just do not forget to add the public parts in the *exports*.

		exports.generateGuid = function() {
		    var guid = uuid.randomUUID();
		    return guid;
		};


> Libraries are exposed as services, hence they have accessible endpoints in the registry.

The reference of the library module from the service is performed by using the standard function *require()*, where the parameter is the location of the module.

Module path includes the full path to the module in the project structure without the predefined folder *ScriptingServices*, and also without the extension **\*.js**.


		/sample_project
		    /ScriptingServices
		        /service.js
		        /library.js
        
library.js is refered in service.js:

		...
		var library = require('library');
		...


> Relative paths ('.', '..') are not supported. The project name must be explicitly defined.



###Groovy###

Groovy is yet another powerful language for Web development nowadays with its static types, OOP abilities, and many more.

Corresponding examples in Groovy:

**Service (sample.groovy):**
		
		import sample_project.module1;
		
		def object = new Module1();
		object.hello(response);


**Module (module1.groovy):**

		class Module1{
		    void hello(def response){
		        response.getWriter().println("Hello from Module1")
		    }
		}


###Java###

Beyond the scope of scripting runtimes, we can benefit from the mature and well known [Java](http://en.wikipedia.org/wiki/Java_programming_language). Taking advantage from the standard and third-party class libraries is crucial when writing enterprise software.

**Services**

Combining the idea of [Injected Objects](http://www.dirigible.io/help/api.html) in the execution context and [Servlet](http://en.wikipedia.org/wiki/Java_Servlet) specification results in very familiar and handy code:

		package src.test.java;
		
		import java.util.Map;
		import javax.servlet.http.HttpServletRequest;
		import javax.servlet.http.HttpServletResponse;
		
		public class HelloWorld {
		
		    public void service(HttpServletRequest request, HttpServletResponse response, Map<String, Object> scope) throws Exception {
		        response.getWriter().println("Hello World!");
		        response.setContentType("text/html");
		    }
		}


**Classes**

Besides [Servlet](http://en.wikipedia.org/wiki/Java_Servlet)-like classes, we can also create ordinary objects ([POJO](http://en.wikipedia.org/wiki/Plain_Old_Java_Object)), while making the best of inheritance, polymorphism, generics, and so on.

		package src.test.java;
		
		public class Calculator {
		
		    public static int sum(int x, int y) {
		        return x + y;
		    }
		}


The final project structure looks like this:


		test
		    /ScriptingServices
		                      /src
		                           /test
		                                 /HelloWorld.java
		                                 /Calculator.java


> Note that the package name starts with the name of the *test* project, followed by the subfolders names under *ScriptingServices*.
