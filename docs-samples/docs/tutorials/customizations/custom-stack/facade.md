---
title: Facade
---

Facade
===

This tutorial will guide you through the creation of Java facade and JavaScript API for the Eclipse Dirigible Custom Stack.

!!! note "Prerequisites"

	This tutorial is assuming, that you've successfully completed the following tutorials:

	- [Custom Stack](https://www.dirigible.io/samples/tutorials/customizations/custom-stack/).
	- [Branding](https://www.dirigible.io/samples/tutorials/customizations/custom-stack/branding/).

### Steps

1. Create Facade Module:

	- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Navigate to the `modules` folder.
	- Creatae `facade` folder and navigate to it.
	- Create `pom.xml`, `GreetingsFacade.java` and `greetings.js` files.

	=== "pom.xml"

	    1. Create new `pom.xml` file.
		1. Paste the following content:

    	```xml
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    		<modelVersion>4.0.0</modelVersion>

    		<parent>
    			<groupId>io.dirigible.custom.stack</groupId>
    			<artifactId>custom-stack-modules-parent</artifactId>
    			<version>1.0.0-SNAPSHOT</version>
    			<relativePath>../pom.xml</relativePath>
    		</parent>

    		<name>Custom Stack - Modules - Facade</name>
    		<artifactId>custom-stack-modules-facade</artifactId>
    		<packaging>jar</packaging>

    	</project>
    	```

    === "GreetingsFacade.java"

	    1. Create `src/main/java/io/dirigible/custom/platform/facade/` folder stucture and navigate to it.
		1. Create new `GreetingsFacade.java` file.
		1. Paste the following content:

		```java
		package io.dirigible.custom.platform.facade;

		public class GreetingsFacade {

		    public static String getGreeting() {
		        return "Welcome to Eclipse Dirigible!";
		    }

		}
		```

    === "greetings.js"

	    1. Create `src/main/resources/META-INF/dirigible/custom-stack/` folder stucture and navigate to it.
		1. Create new `greetings.js` file.
		1. Paste the following content:

		```javascript
		exports.getMessage = function() {
		    let username = org.eclipse.dirigible.api.v3.security.UserFacade.getName();
		    let greeting = Packages.io.dirigible.custom.platform.facade.GreetingsFacade.getGreeting();
		    return `Hello '${username}'! ${greeting}`;
		};
		```

		!!! note "Access to Packages"
		    
			Java classes are accessed by Fully Qualified Name (FQN). For classes that are not packaged in `java`, `com` or `org` packages, the `Packages` object should be used.

1. Add Modules Dependency:

    - Navigate to the `modules` folder.
	- Open the `pom.xml` file.
	- Make the following changes:

    === "Add Facade Module"

        1. Navigate to the `<modules>` section.
    	1. Add the following module:

    	    ```xml hl_lines="4"
			<modules>
    			<module>all</module>
				<module>branding</module>
				<module>facade</module>
			</modules>
    		```

    === "Final pom.xml"

    	```xml
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    		<modelVersion>4.0.0</modelVersion>

    		<parent>
    			<groupId>io.dirigible.custom.stack</groupId>
    			<artifactId>custom-stack-parent</artifactId>
    			<version>1.0.0-SNAPSHOT</version>
    			<relativePath>../pom.xml</relativePath>
    		</parent>

    		<name>Custom Stack - Modules - Parent</name>
    		<artifactId>custom-stack-modules-parent</artifactId>
    		<packaging>pom</packaging>

    		<modules>
    			<module>all</module>
    			<module>branding</module>
    			<module>facade</module>
    		</modules>

    	</project>
    	```

    - Navigate to the `all` folder.
	- Open the `pom.xml` file.
	- Make the following changes:

    === "Add Facade Dependency"

        1. Navigate to the `<dependencies>` section.
    	1. Add the following dependency:

    	    ```xml
			<dependency>
				<groupId>io.dirigible.custom.stack</groupId>
				<artifactId>custom-stack-modules-facade</artifactId>
				<version>1.0.0-SNAPSHOT</version>
			</dependency>
    		```

    === "Final pom.xml"

    	```xml
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    		<modelVersion>4.0.0</modelVersion>

    		<parent>
    			<groupId>io.dirigible.custom.stack</groupId>
    			<artifactId>custom-stack-modules-parent</artifactId>
    			<version>1.0.0-SNAPSHOT</version>
    			<relativePath>../pom.xml</relativePath>
    		</parent>

    		<name>Custom Stack - Modules - All</name>
    		<artifactId>custom-stack-modules-all</artifactId>
    		<packaging>jar</packaging>

    		<dependencies>
    			<dependency>
    				<groupId>io.dirigible.custom.stack</groupId>
    				<artifactId>custom-stack-modules-branding</artifactId>
    				<version>1.0.0-SNAPSHOT</version>
    			</dependency>
    			<dependency>
    				<groupId>io.dirigible.custom.stack</groupId>
    				<artifactId>custom-stack-modules-facade</artifactId>
    				<version>1.0.0-SNAPSHOT</version>
    			</dependency>
    		</dependencies>

    	</project>
    	```

1. Build the _Custom Platform_.

    - Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Open the **Terminal** and execute the following command to build the _Custom Platform_:

	    ```
		mvn clean install
		```

1. Run the _Custom Platform_.

    - Navigate to the `releng/target` folder.
	- Open the **Terminal** and execute the following command to run the _Custom Platform_:

	    ```
		java -jar custom-stack-spring-boot-*.jar
		```

		!!! info "Debugging"

			To run in debug mode, execute the following command:

			```
			java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 -jar custom-stack-spring-boot-*.jar
			```

	- Go to [http://localhost:8080](http://localhost:8080/) to access the _Custom Stack_.

1. Test the changes.

    1. Create a project named `sample-custom-stack`.
	1. Right click on the `sample-custom-stack` project and select **New &#8594; JavaScript CJS Service**.
	1. Enter `greeting.js` for the name of the JavaScript Service.
	1. Replace the content with the following code:

		```javascript
		var response = require("http/v4/response");
		let greetings = require("custom-stack/greetings");

		let message = greetings.getMessage();

		response.println(message);
		response.flush();
		response.close();
		```

	1. Save the changes.
	1. Open the **Preview** view to see the result.
