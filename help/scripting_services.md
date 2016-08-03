---
layout: help
title: Scripting Services
icon: none
group: help-features
---

{{ page.title }}
===

JavaScript
---

**Services**	

Primary language used to implement services in Eclipse Dirigible is JavaScript. Being quite popular for client-side scripting, it became also the preferable language for server-side business logic. [Rhino](https://developer.mozilla.org/en-US/docs/Rhino) by Mozilla is used as the underlying execution engine as it is one of the most mature JavaScript engines written in Java.


You can write your algorithms in **\*.js** files and store them within the *ScriptingServices* folder. After activation or publishing, they can be executed by accessing the endpoint at the [sandbox](activation.html) or the [public registry](publication.html) respectively.

Example JavaScript service:

```javascript

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
	
```

This example shows two major benefits:

*	Modularization based on built-in [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) (the 'require' function on the first line)
*	Native usage of Java objects as [API](api.html) injected in the execution context (database, response)

### Libraries (Modules)

You can create your own library modules in **\*.js** files. Make sure you add the public parts in the *exports*.

```javascript

	exports.generateGuid = function() {
	    var guid = uuid.randomUUID();
	    return guid;
	};
	
```

> Libraries are exposed as services so that they have accessible endpoints in the registry.

The reference of the library module from the service is made by using the standard function *require()*, where the parameter is the location of the module.

The module path includes the full path to the module in the project structure without the predefined *ScriptingServices* folder and without the **\*.js** extension.


		/sample_project
		    /ScriptingServices
		        /service.js
		        /library.js
        
library.js is refered in service.js:

```javascript

	...
	var library = require('library');
	...
		
```

> Relative paths ('.', '..') are not supported. The project name must be explicitly defined.



Groovy
---

Groovy is yet another powerful language for Web development nowadays with its static types, OOP abilities, and more.

Corresponding examples in Groovy:

**Service (sample.groovy):**
		
```groovy

	import sample_project.module1;
	
	def object = new Module1();
	object.hello(response);
	
```

**Module (module1.groovy):**

```groovy

	class Module1{
	    void hello(def response){
	        response.getWriter().println("Hello from Module1")
	    }
	}
	
```

Java
---

Beyond the scope of scripting runtimes, we can benefit from the mature and well known [Java](http://en.wikipedia.org/wiki/Java_programming_language). You can take advantage from the standard and third-party class libraries when writing enterprise software.

**Services**

Combining the idea of [Injected Objects](http://www.dirigible.io/help/api.html) in the execution context and [Servlet](http://en.wikipedia.org/wiki/Java_Servlet) specification results in a very familiar and handy code:

```java

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
```

**Classes**

Besides [Servlet](http://en.wikipedia.org/wiki/Java_Servlet)-like classes, we can also create ordinary ([POJO](http://en.wikipedia.org/wiki/Plain_Old_Java_Object)) objects, making the best of inheritance, polymorphism, generics, and so on.

```java

	package src.test.java;
	
	public class Calculator {
	
	    public static int sum(int x, int y) {
	        return x + y;
	    }
	}
	
```

The final project structure looks like this:


		test
		    /ScriptingServices
		                      /src
		                           /test
		                                 /HelloWorld.java
		                                 /Calculator.java


> Note that the package name starts with the name of the *test* project, followed by the subfolders names under *ScriptingServices*.
