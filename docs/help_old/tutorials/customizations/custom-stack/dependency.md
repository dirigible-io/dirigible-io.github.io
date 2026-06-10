---
title: Custom Stack - Dependency
---

Custom Stack - Dependency
===

## Overview

This section will guide you through the process of adding external Maven dependency for generating barcodes and using it in the Eclipse Dirigible Custom Stack without creating separate Java Facade and/or TypeScript API.

::: info

Creating TypeScript APIs is always recommended, as there is no out of the box code completion for native Java objects.
:::
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
		&lt;dependency&gt;
			&lt;groupId&gt;uk.org.okapibarcode&lt;/groupId&gt;
			&lt;artifactId&gt;okapibarcode&lt;/artifactId&gt;
			&lt;version&gt;0.3.3&lt;/version&gt;
		&lt;/dependency&gt;
		```

=== "Final pom.xml"

	```xml
	<project xmlns="http://maven.apache.org/POM/4.0.0"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
		&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

		&lt;parent&gt;
			&lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
			&lt;artifactId&gt;custom-stack-parent&lt;/artifactId&gt;
			&lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;
			&lt;relativePath&gt;../pom.xml&lt;/relativePath&gt;
		&lt;/parent&gt;

		&lt;name&gt;custom - stack - application&lt;/name&gt;
		&lt;artifactId&gt;custom-stack-application&lt;/artifactId&gt;
		&lt;packaging&gt;jar&lt;/packaging&gt;


		&lt;dependencies&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
				&lt;artifactId&gt;custom-stack-apis&lt;/artifactId&gt;
				&lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
				&lt;artifactId&gt;custom-stack-branding&lt;/artifactId&gt;
				&lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;uk.org.okapibarcode&lt;/groupId&gt;
				&lt;artifactId&gt;okapibarcode&lt;/artifactId&gt;
				&lt;version&gt;0.3.3&lt;/version&gt;
			&lt;/dependency&gt;

			<!-- Core -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-core&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
				&lt;exclusions&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;com.zaxxer&lt;/groupId&gt;
						&lt;artifactId&gt;HikariCP-java7&lt;/artifactId&gt;
					&lt;/exclusion&gt;
				&lt;/exclusions&gt;
			&lt;/dependency&gt;
			
			<!-- Security -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-security-basic&lt;/artifactId&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-security-keycloak&lt;/artifactId&gt;
			&lt;/dependency&gt;
			
			<!-- Data -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-database&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
			&lt;/dependency&gt;
			
			<!-- Engine -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-engines&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
				&lt;exclusions&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;javax.validation&lt;/groupId&gt;
						&lt;artifactId&gt;validation-api&lt;/artifactId&gt;
					&lt;/exclusion&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;javax.servlet&lt;/groupId&gt;
						&lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
					&lt;/exclusion&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;org.apache.cxf&lt;/groupId&gt;
						&lt;artifactId&gt;cxf-rt-frontend-jaxrs&lt;/artifactId&gt;
					&lt;/exclusion&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;org.apache.cxf&lt;/groupId&gt;
						&lt;artifactId&gt;
							cxf-spring-boot-starter-jaxrs
						&lt;/artifactId&gt;
					&lt;/exclusion&gt;
				&lt;/exclusions&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-engine-command&lt;/artifactId&gt;
			&lt;/dependency&gt;
			
			<!-- IDE -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-ide&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
				&lt;exclusions&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
						&lt;artifactId&gt;dirigible-components-ide-ui-branding&lt;/artifactId&gt;
					&lt;/exclusion&gt;
				&lt;/exclusions&gt;
			&lt;/dependency&gt;
			
			<!-- API -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-api&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
			&lt;/dependency&gt;
			
			<!-- Resources -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-resources&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
			&lt;/dependency&gt;

			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-security-oauth2&lt;/artifactId&gt;
			&lt;/dependency&gt;
			
			<!-- Templates -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-components-group-templates&lt;/artifactId&gt;
				&lt;type&gt;pom&lt;/type&gt;
			&lt;/dependency&gt;
			
			&lt;dependency&gt;
				&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
				&lt;artifactId&gt;spring-boot-starter-validation&lt;/artifactId&gt;
			&lt;/dependency&gt;

			&lt;dependency&gt;
				&lt;groupId&gt;com.codeborne&lt;/groupId&gt;
				&lt;artifactId&gt;selenide&lt;/artifactId&gt;
				&lt;version&gt;7.2.2&lt;/version&gt;
				&lt;scope&gt;test&lt;/scope&gt;
			&lt;/dependency&gt;

			<!-- Drivers -->
			&lt;dependency&gt;
				&lt;groupId&gt;org.postgresql&lt;/groupId&gt;
				&lt;artifactId&gt;postgresql&lt;/artifactId&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-database-mongodb-jdbc&lt;/artifactId&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;com.sap.cloud.db.jdbc&lt;/groupId&gt;
				&lt;artifactId&gt;ngdbc&lt;/artifactId&gt;
				&lt;version&gt;${ngdbc.version}&lt;/version&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;net.snowflake&lt;/groupId&gt;
				&lt;artifactId&gt;snowflake-jdbc&lt;/artifactId&gt;
				&lt;version&gt;${snowflake.version}&lt;/version&gt;
			&lt;/dependency&gt;
			&lt;dependency&gt;
				&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
				&lt;artifactId&gt;dirigible-tests-framework&lt;/artifactId&gt;
			&lt;/dependency&gt;

		&lt;/dependencies&gt;

		&lt;build&gt;
			&lt;plugins&gt;
				&lt;plugin&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
					&lt;configuration&gt;
						&lt;mainClass&gt;io.dirigible.samples.CustomStackApplication&lt;/mainClass&gt;
					&lt;/configuration&gt;
					&lt;executions&gt;
						&lt;execution&gt;
							&lt;goals&gt;
								&lt;goal&gt;repackage&lt;/goal&gt;
							&lt;/goals&gt;
						&lt;/execution&gt;
					&lt;/executions&gt;
				&lt;/plugin&gt;
				<!-- 
					Note: Uncomment for git repositories, as this plugin would get the last commit id.
					This is needed for the info in the "About" view.
				-->
				<!--
				&lt;plugin&gt;
					&lt;groupId&gt;pl.project13.maven&lt;/groupId&gt;
					&lt;artifactId&gt;git-commit-id-plugin&lt;/artifactId&gt;
					&lt;version&gt;${git-commit-id-plugin.version}&lt;/version&gt;
					&lt;executions&gt;
						&lt;execution&gt;
							&lt;id&gt;get-the-git-infos&lt;/id&gt;
							&lt;goals&gt;
								&lt;goal&gt;revision&lt;/goal&gt;
							&lt;/goals&gt;
						&lt;/execution&gt;
					&lt;/executions&gt;
					&lt;configuration&gt;
						&lt;dotGitDirectory&gt;../.git&lt;/dotGitDirectory&gt;
					&lt;/configuration&gt;
				&lt;/plugin&gt;
				-->
			&lt;/plugins&gt;
			&lt;resources&gt;
				&lt;resource&gt;
					&lt;directory&gt;src/main/resources&lt;/directory&gt;
					&lt;filtering&gt;true&lt;/filtering&gt;
				&lt;/resource&gt;
			&lt;/resources&gt;
		&lt;/build&gt;

	&lt;/project&gt;
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
- Right click on the `demo-application` project and select **New &#8594; TypeScript Service**.
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

- Right click on the `demo-application` project and select **New &#8594; File**.
- Enter `tsconfig.json` for the name of the File.

	```json
	{
		"compilerOptions": {
			"module": "ESNext",
			"target": "ES6",
			"moduleResolution": "Node",
			"baseUrl": "../",
			"lib": [
				"ESNext",
				"DOM"
			],
			"paths": {
				"sdk/*": [
					"../modules/src/*"
				],
				"/*": [
					"../*"
				]
			},
			"types": [
				"../modules/types"
			]
		}
	}
	```

- Save the changes.
- Right click on the `demo-application` project and select **New &#8594; File**.
- Enter `project.json` for the name of the File.

	```json
	{
		"guid": "demo-application",
		"actions": [
			{
				"name": "Build TypeScript",
				"commands": [
					{
						"os": "unix",
						"command": "tsc"
					},
					{
						"os": "windows",
						"command": "cmd /c tsc"
					}
				],
				"registry": "true"
			}
		]
	}
	```

- Save the changes.
- Right click on the `demo-application` project and select **Publish**
- Select the `barcode.ts` from the **Projects** explorer and open the **Preview** view to see the result.

## Summary

::: tip Tutorial Completed

After completing all steps in this tutorial, you would have:

- Custom Eclipse Dirigible Stack.
- Custom branding of the Eclipse Dirigible Stack.
- Custom Java Facade and TypeScript API.

_**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_
:::
