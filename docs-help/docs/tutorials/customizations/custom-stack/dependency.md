---
title: Custom Stack - Dependency
---

Custom Stack - Dependency
===

## Overview

This section will guide you through the process of adding external Maven dependency for generating barcodes and using it in the Eclipse Dirigible Custom Stack without creating separate Java Facade and/or TypeScript API.

!!! note

	Creating TypeScript APIs is always recommended, as there is no out of the box code completion for native Java objects.

### Steps

#### Add External Dependency:

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Navigate to the `application` folder.
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
	<project xmlns="http://maven.apache.org/POM/4.0.0"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
		<modelVersion>4.0.0</modelVersion>

		<parent>
			<groupId>io.dirigible.samples</groupId>
			<artifactId>custom-stack-parent</artifactId>
			<version>1.0.0-SNAPSHOT</version>
			<relativePath>../pom.xml</relativePath>
		</parent>

		<name>custom - stack - application</name>
		<artifactId>custom-stack-application</artifactId>
		<packaging>jar</packaging>


		<dependencies>
			<dependency>
				<groupId>io.dirigible.samples</groupId>
				<artifactId>custom-stack-apis</artifactId>
				<version>1.0.0-SNAPSHOT</version>
			</dependency>
			<dependency>
				<groupId>io.dirigible.samples</groupId>
				<artifactId>custom-stack-branding</artifactId>
				<version>1.0.0-SNAPSHOT</version>
			</dependency>
			<dependency>
				<groupId>uk.org.okapibarcode</groupId>
				<artifactId>okapibarcode</artifactId>
				<version>0.3.3</version>
			</dependency>

			<!-- Core -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-core</artifactId>
				<type>pom</type>
				<exclusions>
					<exclusion>
						<groupId>com.zaxxer</groupId>
						<artifactId>HikariCP-java7</artifactId>
					</exclusion>
				</exclusions>
			</dependency>
			
			<!-- Security -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-security-basic</artifactId>
			</dependency>
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-security-keycloak</artifactId>
			</dependency>
			
			<!-- Data -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-database</artifactId>
				<type>pom</type>
			</dependency>
			
			<!-- Engine -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-engines</artifactId>
				<type>pom</type>
				<exclusions>
					<exclusion>
						<groupId>javax.validation</groupId>
						<artifactId>validation-api</artifactId>
					</exclusion>
					<exclusion>
						<groupId>javax.servlet</groupId>
						<artifactId>javax.servlet-api</artifactId>
					</exclusion>
					<exclusion>
						<groupId>org.apache.cxf</groupId>
						<artifactId>cxf-rt-frontend-jaxrs</artifactId>
					</exclusion>
					<exclusion>
						<groupId>org.apache.cxf</groupId>
						<artifactId>
							cxf-spring-boot-starter-jaxrs
						</artifactId>
					</exclusion>
				</exclusions>
			</dependency>
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-engine-command</artifactId>
			</dependency>
			
			<!-- IDE -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-ide</artifactId>
				<type>pom</type>
				<exclusions>
					<exclusion>
						<groupId>org.eclipse.dirigible</groupId>
						<artifactId>dirigible-components-ide-ui-branding</artifactId>
					</exclusion>
				</exclusions>
			</dependency>
			
			<!-- API -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-api</artifactId>
				<type>pom</type>
			</dependency>
			
			<!-- Resources -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-resources</artifactId>
				<type>pom</type>
			</dependency>

			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-security-oauth2</artifactId>
			</dependency>
			
			<!-- Templates -->
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-components-group-templates</artifactId>
				<type>pom</type>
			</dependency>
			
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-starter-validation</artifactId>
			</dependency>

			<dependency>
				<groupId>com.codeborne</groupId>
				<artifactId>selenide</artifactId>
				<version>7.2.2</version>
				<scope>test</scope>
			</dependency>

			<!-- Drivers -->
			<dependency>
				<groupId>org.postgresql</groupId>
				<artifactId>postgresql</artifactId>
			</dependency>
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-database-mongodb-jdbc</artifactId>
			</dependency>
			<dependency>
				<groupId>com.sap.cloud.db.jdbc</groupId>
				<artifactId>ngdbc</artifactId>
				<version>${ngdbc.version}</version>
			</dependency>
			<dependency>
				<groupId>net.snowflake</groupId>
				<artifactId>snowflake-jdbc</artifactId>
				<version>${snowflake.version}</version>
			</dependency>
			<dependency>
				<groupId>org.eclipse.dirigible</groupId>
				<artifactId>dirigible-tests-framework</artifactId>
			</dependency>

		</dependencies>

		<build>
			<plugins>
				<plugin>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-maven-plugin</artifactId>
					<configuration>
						<mainClass>io.dirigible.samples.CustomStackApplication</mainClass>
					</configuration>
					<executions>
						<execution>
							<goals>
								<goal>repackage</goal>
							</goals>
						</execution>
					</executions>
				</plugin>
				<!-- 
					Note: Uncomment for git repositories, as this plugin would get the last commit id.
					This is needed for the info in the "About" view.
				-->
				<!--
				<plugin>
					<groupId>pl.project13.maven</groupId>
					<artifactId>git-commit-id-plugin</artifactId>
					<version>${git-commit-id-plugin.version}</version>
					<executions>
						<execution>
							<id>get-the-git-infos</id>
							<goals>
								<goal>revision</goal>
							</goals>
						</execution>
					</executions>
					<configuration>
						<dotGitDirectory>../.git</dotGitDirectory>
					</configuration>
				</plugin>
				-->
			</plugins>
			<resources>
				<resource>
					<directory>src/main/resources</directory>
					<filtering>true</filtering>
				</resource>
			</resources>
		</build>

	</project>
	```

#### Build the Custom Platform

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the **Terminal** and execute the following command to build the _Custom Platform_:

	```
	mvn clean install
	```

#### Run the Custom Platform

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the **Terminal** and execute the following command to run the _Custom Stack_:

	```
	java --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -jar application/target/custom-stack-application-*.jar
	```

- Go to [http://localhost:8080](http://localhost:8080/) to access the _Custom Stack_.

#### Test the Changes

- Create a project named `demo-application`.
- Right click on the `demo-application` project and select **New &#8594; TypeScript CJS Service**.
- Enter `barcode.ts` for the name of the TypeScript Service.
- Replace the content with the following code:

	```typescript
	import { response } from "sdk/http";

	const Code128 = Java.type("uk.org.okapibarcode.backend.Code128");
	const BufferedImage = Java.type("java.awt.image.BufferedImage");
	const Java2DRenderer = Java.type("uk.org.okapibarcode.output.Java2DRenderer");
	const Color = Java.type("java.awt.Color");
	const File = Java.type("java.io.File");
	const ImageIO = Java.type("javax.imageio.ImageIO");
	const FileUtils = Java.type("org.apache.commons.io.FileUtils");

	const barcode = new Code128();
	barcode.setFontName("Monospaced");
	barcode.setFontSize(16);
	barcode.setContent("custom-stack-1234");

	const image = new BufferedImage(barcode.getWidth(), barcode.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
	const g2d = image.createGraphics();
	const renderer = new Java2DRenderer(g2d, 1, Color.WHITE, Color.BLACK);
	renderer.render(barcode);

	const file = new File("code128.png");
	ImageIO.write(image, "png", file);

	const bytes = FileUtils.readFileToByteArray(file);

	response.setContentType("image/png");
	response.write(bytes);
	response.flush();
	response.close();
	```

	!!! note "Access to Java Classes"
		
		Java classes can be accessed through the `Java.type()` function by providing the Fully Qualified Name (FQN) _(e.g. `io.dirigible.samples.MyFacade`)_:
		
		```typescript
		const MyFacade = Java.type("io.dirigible.samples.MyFacade");
		```

		To invoke `static` method of the `MyFacade` class:
		
		```typescript
		const MyFacade = Java.type("io.dirigible.samples.MyFacade");
		MyFacade.greet();
		```

		To create class instance and call a method:

		```typescript
		const MyFacade = Java.type("io.dirigible.samples.MyFacade");
		const facadeInstance = new MyFacade();
		facadeInstance.add(5, 3);
		```

1. Save the changes.
1. Open the **Preview** view to see the result.

## Summary

!!! success "Tutorial Completed"

    After completing all steps in this tutorial, you would have:

    - Custom Eclipse Dirigible Stack.
    - Custom branding of the Eclipse Dirigible Stack.
    - Custom Java Facade and TypeScript API.

    _**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_
