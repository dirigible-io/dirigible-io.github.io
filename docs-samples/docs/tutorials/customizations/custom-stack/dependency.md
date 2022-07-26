---
title: Dependency
---

Dependency
===

This tutorial will guide you through the process of adding external Maven dependency and using it in the Eclipse Dirigible Custom Stack.

!!! note "Prerequisites"

	This tutorial is assuming, that you've successfully completed the following tutorials:

	- [Custom Stack](https://www.dirigible.io/samples/tutorials/customizations/custom-stack/).
	- _(optional)_ [Branding](https://www.dirigible.io/samples/tutorials/customizations/custom-stack/branding/).

### Steps

1. Add External Dependency:

    - Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Navigate to the `releng` folder.
	- Open the `pom.xml` file.
	- Make the following changes:

    === "Add External Dependency"

        1. Navigate to the `<dependencies>` section.
    	1. Add the following dependency:

    	    ```xml
    		<dependency>
				<groupId>uk.org.okapibarcode</groupId>
				<artifactId>okapibarcode</artifactId>
				<version>0.3.3</version>
			</dependency>
    		```

    === "Final pom.xml"

    	```xml
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    	    <modelVersion>4.0.0</modelVersion>

    	    <parent>
    	        <groupId>io.dirigible.custom.stack</groupId>
    	        <artifactId>custom-stack-parent</artifactId>
    	        <version>1.0.0-SNAPSHOT</version>
    	        <relativePath>../pom.xml</relativePath>
    	    </parent>

    	    <name>Custom Stack - Releng - Spring Boot</name>
    	    <artifactId>custom-stack-spring-boot</artifactId>
    	    <version>1.0.0-SNAPSHOT</version>
    	    <packaging>jar</packaging>

    	    <build>
    	        <plugins>
    	            <plugin>
    	                <groupId>org.springframework.boot</groupId>
    	                <artifactId>spring-boot-maven-plugin</artifactId>
    	                <version>${spring.boot.version}</version>
    	                <configuration>
    	                    <mainClass>io.dirigible.custom.platform.CustomPlatformApplication</mainClass>
    	                </configuration>
    	                <executions>
    	                    <execution>
    	                        <goals>
    	                            <goal>repackage</goal>
    	                        </goals>
    	                    </execution>
    	                </executions>
    	            </plugin>
    	        </plugins>
    	        <resources>
    	            <resource>
    	                <directory>src/main/resources</directory>
    	                <filtering>true</filtering>
    	            </resource>
    	        </resources>
    	    </build>

    	    <dependencies>

    	        <!-- Custom Stack Modules -->
    	        <dependency>
    	            <groupId>io.dirigible.custom.stack</groupId>
    	            <artifactId>custom-stack-modules-all</artifactId>
    	            <version>1.0.0-SNAPSHOT</version>
    	        </dependency>
    	        <dependency>
    	            <groupId>uk.org.okapibarcode</groupId>
    	            <artifactId>okapibarcode</artifactId>
    	            <version>0.3.3</version>
    	        </dependency>

    	        <!-- Dirigible -->
    	        <dependency>
    	            <groupId>org.eclipse.dirigible</groupId>
    	            <artifactId>dirigible-server-spring</artifactId>
    	            <version>${dirigible.version}</version>
    	            <exclusions>
    	                <exclusion>
    	                    <groupId>org.eclipse.dirigible</groupId>
    	                    <artifactId>dirigible-ide-ui-branding</artifactId>
    	                </exclusion>
    	            </exclusions>
    	        </dependency>

    	        <!-- Platform -->
    	        <dependency>
    	            <groupId>org.slf4j</groupId>
    	            <artifactId>slf4j-api</artifactId>
    	            <version>${slf4j.version}</version>
    	            <scope>compile</scope>
    	        </dependency>
    	        <dependency>
    	            <groupId>ch.qos.logback</groupId>
    	            <artifactId>logback-core</artifactId>
    	            <version>${logback.version}</version>
    	            <scope>compile</scope>
    	        </dependency>
    	        <dependency>
    	            <groupId>ch.qos.logback</groupId>
    	            <artifactId>logback-classic</artifactId>
    	            <version>${logback.version}</version>
    	            <scope>compile</scope>
    	        </dependency>
    	        <dependency>
    	            <groupId>org.springframework.boot</groupId>
    	            <artifactId>spring-boot-configuration-processor</artifactId>
    	            <optional>true</optional>
    	            <version>${spring.boot.version}</version>
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
	1. Enter `barcode.js` for the name of the JavaScript Service.
	1. Replace the content with the following code:

		```javascript
		var response = require("http/v4/response");

		let barcode = new Packages.uk.org.okapibarcode.backend.Code128();
		barcode.setFontName("Monospaced");
		barcode.setFontSize(16);
		barcode.setContent("123456789");

		let image = new java.awt.image.BufferedImage(barcode.getWidth(), barcode.getHeight(), java.awt.image.BufferedImage.TYPE_BYTE_GRAY);
		let g2d = image.createGraphics();
		let renderer = new Packages.uk.org.okapibarcode.output.Java2DRenderer(g2d, 1, java.awt.Color.WHITE, java.awt.Color.BLACK);
		renderer.render(barcode);

		let file = new java.io.File("code128.png");
		javax.imageio.ImageIO.write(image, "png", file);

		let bytes = org.apache.commons.io.FileUtils.readFileToByteArray(file);

		response.write(bytes);
		response.flush();
		response.close();
		```

		!!! note "Access to Packages"
		    
			Java classes are accessed by Fully Qualified Name (FQN). For classes that are not packaged in `java`, `com` or `org` packages, the `Packages` object should be used.


	1. Save the changes.
	1. Open the **Preview** view to see the result.