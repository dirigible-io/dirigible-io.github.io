---
title: Node.js in Dirigible?
author: nedelcho.delchev
---

Node.js in Dirigible? Are you kidding?

### Why do I need Node.js, when I already have Enterprise JavaScript?

Well, it was a few years ago when we defined what the Enterprise JavaScript is. We described it as a set of stable API facades in the JavaScript language, which can be used by the business application developers to reliably code against them. For simplicity, we chose the synchronous model with blocking API, handled in a multi-threaded environment to lower the entry barrier for our target group of developers. More details can be found in [Why Enterprise JavaScript?](http://www.dirigible.io/blogs/2016/08/01/blogs_why_enterprise_js.html) and also in [Understanding Dirigible](http://www.dirigible.io/blogs/2016/02/26/blogs_understanding_dirigible.html) blog posts.

Having these reasons in mind, we set a border line between how we understand the usage of the JavaScript language and how Node.js guys have implemented it. We are targeting different scenarios, that is why we have never striven for a compatibility with it. This is still true, for the main scenarios we target.

What about the "Function as a Service" scenarios? No doubt, there are cases and type of functionality, which are simple (e.g. single action), short-living (fast execution), rarely triggered, state-less, context-less, and atomic enough (no external dependencies), that can be run as "functions" only. This can significantly reduce the required computation power for the execution in scale i.e. to reduce the cost.

The current Java based runtime of Dirigible is not quite suitable for such cases. It has longer bootstrap time, as well as bigger memory footprint for the initialization in comparison to more lightweight frameworks like Node.js and Go. Hence, the natural path forward is to introduce Node.js and Go support to be able to off-load the main state-full business application instances by moving the state-less modules out as "functions". This can be beneficial in a well managed, highly distributed environment such as Kubernetes clusters, otherwise we recommend the standard built-in message-driven approach as well as BPM capabilities of Dirigible.

### Command Engine

Recently, we introduced a feature, which allow the developer to write a module in any native language supported by the underlying operation system and execute it as a regular service. We pipe the input and output streams and provide the result of the execution as a response to the HTTP call. The main purpose of this functionality is the developer to be able to implement complementary extensions for its business applications by using arbitrary integration channels not supported by the core Dirigible runtime out-of-the-box. The simplest example is just to run a shell script.

There are three noteworthy features of the Command Engine:
1. You can have different command line arguments per target OS e.g. linux, mac, windows
2. You can define a set of environment variables to be set before the execution and those which have to be cleared, if any
3. The target directory of the execution is set as the root directory of the Registry space of the Dirigible's Repository (in case of File-System Repository)

### How to execute my Node.js code?

#### Prerequisites

Let assume that you already have Node.js installed on the machine or container, where the Dirigible instance is running. To test that go to the Terminal perspective and write:

> node -v

In case the command is unknown, select the proper way to install Node.js depending on your operating system - [package-manager](https://nodejs.org/en/download/package-manager/)

---

#### Hello World Example

1. Go to Workspace perspective
2. Create a new project called **hello_node**.
3. Create a new file named **hello.js**.
4. Open the file in the editor and write the following line:

> console.log('Hello from Node!');

5. Save the file (auto publish on save is set by default).

> Note: If you have noticed the "Hello from Node!" message in the Console view, it is still executed by the built-in JavaScript engine - be patient.

6. Create a new file named **run.command**
7. Open the file in the editor and write the following lines:

```javascript
{
   "description":"command description",
   "contentType":"text/plain",
   "commands":[
      {
         "os":"linux",
         "command":"node hello_node/hello.js"
      },
      {
         "os":"mac",
         "command":"node hello_node/hello.js"
      },
      {
         "os":"windows",
         "command":"node hello_node/hello.js"
      }
   ]
}
```

8. Save the file, select it in the Workspace view and look into the Preview window to see the result of the execution.

![Node Command](/img/posts/20181124/node_command.png){: .img-responsive }

---
 
#### What about dependencies?

The simplest scenario with a single script file works well, what about multiple files with cross references?

1. Create a new project names **complex_node**
2. Create a file, which will play a role of a library module - **node_lib.js**
3. Enter the following lines:

```javascript
exports.sum = function(a, b) {
	return a + b;
}
```

4. Create a new file, which will play a role of the service module - **node_service.js**
5. Enter the following lines:

```javascript
var node_lib = require("../complex_node/node_lib");
var sum = node_lib.sum(2, 3);
console.log("The Sum is: " + sum);
```

6. Now, create the command file with name **run.command** and with the following content:

```javascript
{
   "description":"command description",
   "contentType":"text/plain",
   "commands":[
      {
         "os":"linux",
         "command":"node complex_node/node_service.js"
      },
      {
         "os":"mac",
         "command":"node complex_node/node_service.js"
      },
      {
         "os":"windows",
         "command":"node complex_node/node_service.js"
      }
   ]
}
```

7. Select the the file in the Workspace Explorer and see the result of the execution in the Preview window:

> The Sum is: 5

![Node Complex](/img/posts/20181124/node_complex.png){: .img-responsive }

---

#### Node.js is cool, but it is still JavaScript. What about Go?

Well, let try a simple **Go** program following the same approach. If you do not have Go installed on your machine or container just follow these [instructions](https://golang.org/doc/install)

1. Create a project called **hello_go**
2. Create a file with name **hello.go** with the following content:

```go
package main
import "fmt"
func main() {
    fmt.Println("hello world")
}
```

3. Create the **run.command** with the following content:

```javascript
{
   "description":"command description",
   "contentType":"text/plain",
   "commands":[
      {
         "os":"linux",
         "command":"go run ./hello_go/hello.go"
      },
      {
         "os":"mac",
         "command":"go run ./hello_go/hello.go"
      },
      {
         "os":"windows",
         "command":"go run ./hello_go/hello.go"
      }
   ]
}
```

4. Now, after publish and selecting the run.command file in the Workspace Explorer you should see the following result in the Preview window:

> hello world

![Go Command](/img/posts/20181124/go_command.png){: .img-responsive }

---

#### That was nice! Can I run Java maybe?

Let assume that by some reason you would like to write a "function" module in Java programming language (e.g. with the newest GraalVM). In this case we will need a preliminary step, which have to compile the Java class before the execution.

1. Create a project named **hello_java**
2. Create a file named **Hello.java** with the following content:

```java
package hello_java;

public class Hello {
	
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
	
}
```

3. Create a shell command script **run.sh**, which will first compile and then execute the class:

```
javac ./hello_java/Hello.java
java hello_java.Hello
```

4. Finally create the command file **run.command** with the following content:

```javascript
{
   "description":"command description",
   "contentType":"text/plain",
   "commands":[
      {
         "os":"linux",
         "command":"sh hello_java/run.sh"
      },
      {
         "os":"mac",
         "command":"sh hello_java/run.sh"
      },
      {
         "os":"windows",
         "command":"hello_java/run.bat"
      }
   ]
}
```

5. Save all, publish and voila - you have a running Java program as a service in Dirigible!



---

#### What's next?

We have to admit that the introduction of the Command engine is just the first step in the direction of the native multi-language support in Dirigible.

There is still lots of work in adaptation of Language Server Protocol extensions for the different languages. Fortunately, there are already very good examples available on how to do this at the backend like Eclipse standalone IDE and in the editors - Monaco and Orion. But still it is not a trivial task.

Another idea is to have a pool of running native servers, e.g Express nodes, to push the code and to use them as external executors. In this case we can pipe not the standard in/out streams, but the network Socket streams. This approach can open many more scenarios as well.

Integration with the actual "Function as a Service" offerings by the Cloud platforms is also something that is ahead of time. For instance, a tooling for building Docker images based on these native modules and publish them to a target Registry in the Cloud platform, would be very useful feature of the Dirigible's Web IDE.

#### Summary?

Well, for those who read blog posts too fast, above was explained how to write native modules in **Node.js**, **Go** and **Java** and use them as integrated services in Dirigible environment.

### Enjoy!


 
