---
title: Custom Stack - Facade
---

Custom Stack - Facade
===

## Overview

This section will guide you through the process of creation of `Java Facade` and `TypeScript API` for the Eclipse Dirigible Custom Stack.

::: info Prerequisites

- Node.js 18+ - Node.js versions can be found [here](https://nodejs.org/en/download)
- esbuild 0.19+ - esbuild versions can be found [here](https://esbuild.github.io/getting-started/#install-esbuild)
- tsc 5.2+ - tsc versions can be found [here](https://www.typescriptlang.org/download)
:::
### Steps

#### Create APIs Module

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Create `apis` folder and navigate to it.
- Create `pom.xml`, `MyFacade.java`, `MyApi.ts`, `project.json` and `tsconfig.json` files.

=== "pom.xml"

	1. Create new `apis/pom.xml` file.
	1. Paste the following content:

	??? abstract "apis/pom.xml"

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

			&lt;name&gt;custom - stack - apis&lt;/name&gt;
			&lt;artifactId&gt;custom-stack-apis&lt;/artifactId&gt;
			&lt;packaging&gt;jar&lt;/packaging&gt;

		&lt;/project&gt;
		```

=== "MyFacade.java"

	!!! note

		The creation of a Java facade is optional, as the same logic can be wrapped/implemented in the TypeScript API only by using the `Java.type()` function.

	1. Create `src/main/java/io/dirigible/samples/` folder stucture and navigate to it.
	1. Create new `apis/src/main/java/io/dirigible/samples/MyFacade.java` file.
	1. Paste the following content:

	??? abstract "apis/src/main/java/io/dirigible/samples/MyFacade.java"
		
		```java
		package io.dirigible.samples;

		public class MyFacade {
			
			public static String greet() {
				return "Hello, welcome to my custom Eclipse Dirigible stack!";
			}

			public int add(int a, int b) {
				return a + b;
			}

			public int multiply(int a, int b) {
				return a * b;
			}

			public String customMethod(String input) {
				// Your custom logic here
				return "Processed input: " + input;
			}

		}
		```

=== "MyApi.ts"

	1. Create `src/main/resources/META-INF/dirigible/custom-api/` folder stucture and navigate to it.
	1. Create new `apis/src/main/resources/META-INF/dirigible/custom-api/MyApi.ts` file.
	1. Paste the following content:

	??? abstract "apis/src/main/resources/META-INF/dirigible/custom-api/MyApi.ts"

		```typescript
		const MyFacade = Java.type("io.dirigible.samples.MyFacade");

		export class MyApi {

			private facadeInstance = new MyFacade();

			public static greet(): string {
				return MyFacade.greet();
			}

			public add(a: number, b: number): number {
				return this.facadeInstance.add(a, b);
			}

			public multiply(a: number, b: number): number {
				return this.facadeInstance.multiply(a, b);
			}

			public customMethod(input: string): string {
				return this.facadeInstance.customMethod(input);
			}
		}
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

#### Add Module Dependency

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the `pom.xml` file.
- Make the following changes:

=== "Add APIs Module"

	1. Navigate to the `<modules>` section.
	1. Add the following module:

		```xml hl_lines="2"
		&lt;modules&gt;
			&lt;module&gt;apis&lt;/module&gt;
			&lt;module&gt;application&lt;/module&gt;
			&lt;module&gt;branding&lt;/module&gt;
		&lt;/modules&gt;
		```

=== "Final pom.xml"

	??? abstract "pom.xml"

		```xml
		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
			&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

			&lt;parent&gt;
				&lt;groupId&gt;org.sonatype.oss&lt;/groupId&gt;
				&lt;artifactId&gt;oss-parent&lt;/artifactId&gt;
				&lt;version&gt;7&lt;/version&gt;
			&lt;/parent&gt;

			&lt;name&gt;custom - stack - parent&lt;/name&gt;
			&lt;description&gt;Custom Stack - Sample&lt;/description&gt;
			&lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
			&lt;artifactId&gt;custom-stack-parent&lt;/artifactId&gt;
			&lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;
			&lt;packaging&gt;pom&lt;/packaging&gt;

			&lt;inceptionYear&gt;2024&lt;/inceptionYear&gt;

			&lt;url&gt;https://www.dirigible.io&lt;/url&gt;
			&lt;organization&gt;
				&lt;name&gt;Eclipse Foundation&lt;/name&gt;
				&lt;url&gt;https://www.eclipse.org&lt;/url&gt;
			&lt;/organization&gt;
			&lt;scm&gt;
				&lt;url&gt;https://github.com/dirigiblelabs/tutorial-custom-stack&lt;/url&gt;
			&lt;/scm&gt;

			&lt;modules&gt;
				&lt;module&gt;apis&lt;/module&gt;
				&lt;module&gt;application&lt;/module&gt;
				&lt;module&gt;branding&lt;/module&gt;
			&lt;/modules&gt;

			&lt;dependencies&gt;

				<!-- Platform -->
				&lt;dependency&gt;
					&lt;groupId&gt;org.slf4j&lt;/groupId&gt;
					&lt;artifactId&gt;slf4j-api&lt;/artifactId&gt;
					&lt;scope&gt;compile&lt;/scope&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
					&lt;artifactId&gt;logback-core&lt;/artifactId&gt;
					&lt;scope&gt;compile&lt;/scope&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
					&lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
					&lt;scope&gt;compile&lt;/scope&gt;
				&lt;/dependency&gt;

				<!-- Commons -->
				&lt;dependency&gt;
					&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
					&lt;artifactId&gt;dirigible-commons-config&lt;/artifactId&gt;
				&lt;/dependency&gt;

				<!-- Spring Boot -->
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
					&lt;exclusions&gt;
						&lt;exclusion&gt;
							&lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;
							&lt;artifactId&gt;log4j-to-slf4j&lt;/artifactId&gt;
						&lt;/exclusion&gt;
					&lt;/exclusions&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-websocket&lt;/artifactId&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-data-jdbc&lt;/artifactId&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-validation&lt;/artifactId&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
				&lt;/dependency&gt;

				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.security&lt;/groupId&gt;
					&lt;artifactId&gt;spring-security-web&lt;/artifactId&gt;
				&lt;/dependency&gt;

				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
					&lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;
					&lt;scope&gt;test&lt;/scope&gt;
					&lt;exclusions&gt;
					&lt;exclusion&gt;
						&lt;groupId&gt;org.junit.vintage&lt;/groupId&gt;
						&lt;artifactId&gt;junit-vintage-engine&lt;/artifactId&gt;
					&lt;/exclusion&gt;
				&lt;/exclusions&gt;
				&lt;/dependency&gt;
				&lt;dependency&gt;
					&lt;groupId&gt;org.springframework.security&lt;/groupId&gt;
					&lt;artifactId&gt;spring-security-test&lt;/artifactId&gt;
					&lt;scope&gt;test&lt;/scope&gt;
				&lt;/dependency&gt;

				<!-- Date Type Utils -->
				&lt;dependency&gt;
					&lt;groupId&gt;com.fasterxml.jackson.datatype&lt;/groupId&gt;
					&lt;artifactId&gt;jackson-datatype-joda&lt;/artifactId&gt;
				&lt;/dependency&gt;

				<!-- Swagger -->
				&lt;dependency&gt;
					&lt;groupId&gt;org.springdoc&lt;/groupId&gt;
					&lt;artifactId&gt;springdoc-openapi-ui&lt;/artifactId&gt;
					&lt;version&gt;${org.springdoc.openapi.ui.version}&lt;/version&gt;
				&lt;/dependency&gt;

				<!-- Data Access -->
				&lt;dependency&gt;
					&lt;groupId&gt;com.h2database&lt;/groupId&gt;
					&lt;artifactId&gt;h2&lt;/artifactId&gt;
				&lt;/dependency&gt;

				<!-- WebJars -->
				&lt;dependency&gt;
					&lt;groupId&gt;org.webjars&lt;/groupId&gt;
					&lt;artifactId&gt;webjars-locator&lt;/artifactId&gt;
					&lt;version&gt;${webjars-locator}&lt;/version&gt;
				&lt;/dependency&gt;

				<!-- Olingo -->
				&lt;dependency&gt;
					&lt;groupId&gt;org.apache.olingo&lt;/groupId&gt;
					&lt;artifactId&gt;olingo-odata2-lib&lt;/artifactId&gt;
					&lt;version&gt;${olingo.version}&lt;/version&gt;
					&lt;type&gt;pom&lt;/type&gt;
					&lt;exclusions&gt;
						&lt;exclusion&gt;
							&lt;groupId&gt;javax.ws.rs&lt;/groupId&gt;
							&lt;artifactId&gt;javax.ws.rs-api&lt;/artifactId&gt;
						&lt;/exclusion&gt;
					&lt;/exclusions&gt;
				&lt;/dependency&gt;

				&lt;dependency&gt;
					&lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
					&lt;artifactId&gt;gson&lt;/artifactId&gt;
				&lt;/dependency&gt;

			&lt;/dependencies&gt;

			&lt;dependencyManagement&gt;
				&lt;dependencies&gt;
					&lt;dependency&gt;
						&lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
						&lt;artifactId&gt;dirigible-dependencies&lt;/artifactId&gt;
						&lt;version&gt;${dirigible.version}&lt;/version&gt;
						&lt;type&gt;pom&lt;/type&gt;
						&lt;scope&gt;import&lt;/scope&gt;
					&lt;/dependency&gt;
				&lt;/dependencies&gt;
			&lt;/dependencyManagement&gt;

			&lt;profiles&gt;
				&lt;profile&gt;
					&lt;id&gt;default&lt;/id&gt;
					&lt;activation&gt;
						&lt;activeByDefault&gt;true&lt;/activeByDefault&gt;
					&lt;/activation&gt;
					&lt;build&gt;
						&lt;plugins&gt;
							&lt;plugin&gt;
								&lt;groupId&gt;org.jacoco&lt;/groupId&gt;
								&lt;artifactId&gt;jacoco-maven-plugin&lt;/artifactId&gt;
								&lt;version&gt;${jacoco.version}&lt;/version&gt;
								&lt;executions&gt;
									&lt;execution&gt;
										&lt;id&gt;prepare-agent&lt;/id&gt;
										&lt;goals&gt;
											&lt;goal&gt;prepare-agent&lt;/goal&gt;
										&lt;/goals&gt;
									&lt;/execution&gt;
								&lt;/executions&gt;
								&lt;configuration&gt;
									&lt;rules&gt;
										&lt;rule&gt;
											&lt;element&gt;SOURCEFILE&lt;/element&gt;
											&lt;excludes&gt;
												&lt;exclude&gt;*src/test/*&lt;/exclude&gt;
											&lt;/excludes&gt;
										&lt;/rule&gt;
									&lt;/rules&gt;
								&lt;/configuration&gt;
							&lt;/plugin&gt;
							&lt;plugin&gt;
								&lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
								&lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
								&lt;version&gt;${maven.compiler.plugin.version}&lt;/version&gt;
								&lt;configuration&gt;
									<source>${maven.compiler.source}</source>
									&lt;target&gt;${maven.compiler.target}&lt;/target&gt;
									&lt;debug&gt;true&lt;/debug&gt;
									&lt;debuglevel&gt;lines,vars,source&lt;/debuglevel&gt;
								&lt;/configuration&gt;
							&lt;/plugin&gt;
						&lt;/plugins&gt;
					&lt;/build&gt;
				&lt;/profile&gt;
			&lt;/profiles&gt;

			&lt;properties&gt;
				&lt;project.title&gt;custom stack&lt;/project.title&gt;

				&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;

				&lt;dirigible.version&gt;10.2.7&lt;/dirigible.version&gt;

				&lt;java.version&gt;17&lt;/java.version&gt;
				&lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
				&lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;

				&lt;maven.resource.plugin.version&gt;3.3.0&lt;/maven.resource.plugin.version&gt;
				&lt;maven.clean.plugin.version&gt;3.2.0&lt;/maven.clean.plugin.version&gt;
				&lt;maven.clean.plugin.directory&gt;src/main/resources/META-INF/dirigible&lt;/maven.clean.plugin.directory&gt;
				&lt;maven.compiler.plugin.version&gt;3.13.0&lt;/maven.compiler.plugin.version&gt;
				&lt;maven-surefire-plugin.version&gt;2.22.2&lt;/maven-surefire-plugin.version&gt;
				&lt;maven.scm.plugin.version&gt;1.13.0&lt;/maven.scm.plugin.version&gt;
				&lt;scmVersionType&gt;branch&lt;/scmVersionType&gt;
				&lt;commons.io&gt;2.11.0&lt;/commons.io&gt;
				&lt;commons.codec&gt;1.15&lt;/commons.codec&gt;
				&lt;commons.lang3&gt;3.12.0&lt;/commons.lang3&gt;
				&lt;commons.exec&gt;1.3&lt;/commons.exec&gt;
				&lt;commons.text&gt;1.10.0&lt;/commons.text&gt;
				&lt;gson.version&gt;2.10.1&lt;/gson.version&gt;
				&lt;mockito.version&gt;4.11.0&lt;/mockito.version&gt;
				&lt;hamcrest.all.version&gt;1.3&lt;/hamcrest.all.version&gt;
				&lt;retrofit.version&gt;1.8.0&lt;/retrofit.version&gt;
				&lt;okhttp3.version&gt;4.10.0&lt;/okhttp3.version&gt;
				&lt;slf4j.version&gt;1.7.36&lt;/slf4j.version&gt;
				&lt;slf4j.simple.version&gt;1.7.12&lt;/slf4j.simple.version&gt;
				&lt;logback.version&gt;1.4.5&lt;/logback.version&gt;
				&lt;commons-dbcp2.version&gt;2.9.0&lt;/commons-dbcp2.version&gt;

				&lt;postgresql.version&gt;42.7.0&lt;/postgresql.version&gt;
				&lt;ngdbc.version&gt;2.20.11&lt;/ngdbc.version&gt;
				&lt;snowflake.version&gt;3.15.0&lt;/snowflake.version&gt;
				
				&lt;activemq.version&gt;5.17.3&lt;/activemq.version&gt;
				&lt;jsr250-api.version&gt;1.0&lt;/jsr250-api.version&gt;
				&lt;jetty.version&gt;9.4.48.v20220622&lt;/jetty.version&gt;
				&lt;lucene.version&gt;9.4.2&lt;/lucene.version&gt;
				&lt;chemistry.version&gt;1.1.0&lt;/chemistry.version&gt;
				&lt;flowable.version&gt;6.8.0&lt;/flowable.version&gt;
				&lt;jaxb.version&gt;2.3.0&lt;/jaxb.version&gt;
				&lt;jaxws.version&gt;2.3.3&lt;/jaxws.version&gt;
				&lt;jakarta.ws.rs-api.version&gt;2.1.5&lt;/jakarta.ws.rs-api.version&gt;
				&lt;license-maven-plugin.version&gt;4.3&lt;/license-maven-plugin.version&gt;
				&lt;persistence.api.version&gt;2.2.3&lt;/persistence.api.version&gt;
				&lt;jgit.version&gt;6.4.0.202211300538-r&lt;/jgit.version&gt;
				&lt;javax.mail.api.version&gt;1.6.4&lt;/javax.mail.api.version&gt;
				&lt;olingo.version&gt;2.0.13&lt;/olingo.version&gt;
				&lt;kafka.version&gt;3.3.1&lt;/kafka.version&gt;
				&lt;git-commit-id-plugin.version&gt;4.9.10&lt;/git-commit-id-plugin.version&gt;
				&lt;mongodb.version&gt;3.12.11&lt;/mongodb.version&gt;
				&lt;caffeine.version&gt;3.1.2&lt;/caffeine.version&gt;
				&lt;liquibase-core.version&gt;4.16.1&lt;/liquibase-core.version&gt;
				&lt;commons-csv.version&gt;1.9.0&lt;/commons-csv.version&gt;
				&lt;jquery-ui.version&gt;1.13.0&lt;/jquery-ui.version&gt;
				&lt;sap-theming__theming-base-content.version&gt;11.1.42&lt;/sap-theming__theming-base-content.version&gt;
				&lt;fundamental-styles.version&gt;0.24.4&lt;/fundamental-styles.version&gt;
				&lt;angular-aria.version&gt;1.8.2&lt;/angular-aria.version&gt;
				&lt;split.js.version&gt;1.6.5&lt;/split.js.version&gt;
				&lt;diff.version&gt;5.1.0&lt;/diff.version&gt;
				&lt;monaco-editor.version&gt;0.33.0&lt;/monaco-editor.version&gt;
				&lt;requirejs.version&gt;2.3.6&lt;/requirejs.version&gt;
				&lt;jstree.version&gt;3.3.12&lt;/jstree.version&gt;
				&lt;jquery.version&gt;3.6.0&lt;/jquery.version&gt;
				&lt;jqplot.version&gt;1.0.8r1250&lt;/jqplot.version&gt;
				&lt;bootstrap.version&gt;3.3.7&lt;/bootstrap.version&gt;
				&lt;es5-shim.version&gt;4.6.7&lt;/es5-shim.version&gt;
				&lt;angular-file-upload.version&gt;2.6.1&lt;/angular-file-upload.version&gt;
				&lt;angularjs.version&gt;1.8.2&lt;/angularjs.version&gt;
				&lt;fontawesome.version&gt;4.7.0&lt;/fontawesome.version&gt;
				&lt;classgraph.version&gt;4.8.154&lt;/classgraph.version&gt;
				&lt;commons-compress.version&gt;1.22&lt;/commons-compress.version&gt;
				&lt;testcontainers.elasticsearch.version&gt;1.17.6&lt;/testcontainers.elasticsearch.version&gt;
				&lt;testcontainers.version&gt;1.17.6&lt;/testcontainers.version&gt;
				&lt;testcontainers.rabbitmq.version&gt;1.17.6&lt;/testcontainers.rabbitmq.version&gt;
				&lt;amqp.client.version&gt;5.16.0&lt;/amqp.client.version&gt;
				&lt;elasticsearch.client.version&gt;7.7.1&lt;/elasticsearch.client.version&gt;
				&lt;jetcd.core.version&gt;0.7.5&lt;/jetcd.core.version&gt;
				&lt;jetcd.test.version&gt;0.5.4&lt;/jetcd.test.version&gt;
				&lt;logcaptor.version&gt;2.7.10&lt;/logcaptor.version&gt;
				&lt;exec.maven.plugin&gt;3.0.0&lt;/exec.maven.plugin&gt;

				&lt;spring-context-support.version&gt;5.3.24&lt;/spring-context-support.version&gt;
				&lt;webjars-locator&gt;0.51&lt;/webjars-locator&gt;

				&lt;keycloak-adapter-bom.version&gt;20.0.2&lt;/keycloak-adapter-bom.version&gt;
				&lt;hikaricp.version&gt;5.0.1&lt;/hikaricp.version&gt;
				&lt;validator.version&gt;1.7&lt;/validator.version&gt;
				&lt;quartz.version&gt;2.3.2&lt;/quartz.version&gt;
				&lt;c3p0.version&gt;0.9.5.5&lt;/c3p0.version&gt;
				&lt;graalvm.version&gt;22.3.1&lt;/graalvm.version&gt;
				&lt;guava.version&gt;31.1-jre&lt;/guava.version&gt;
				&lt;icu4j.version&gt;72.1&lt;/icu4j.version&gt;
				&lt;commons-collections.version&gt;3.2.2&lt;/commons-collections.version&gt;
				&lt;commons-collections4.version&gt;4.4&lt;/commons-collections4.version&gt;
				&lt;velocity.version&gt;2.3&lt;/velocity.version&gt;
				&lt;wikitext.version&gt;3.0.45.202211090110&lt;/wikitext.version&gt;
				&lt;flexmark.version&gt;0.64.0&lt;/flexmark.version&gt;
				&lt;qldb.driver.version&gt;2.3.1&lt;/qldb.driver.version&gt;
				&lt;qldb.sdk.version&gt;1.12.386&lt;/qldb.sdk.version&gt;
				&lt;cassandra.version&gt;1.17.6&lt;/cassandra.version&gt;
				&lt;cassandra.driver.version&gt;3.11.3&lt;/cassandra.driver.version&gt;
				&lt;jedis.version&gt;4.3.1&lt;/jedis.version&gt;
				&lt;spark.version&gt;3.3.1&lt;/spark.version&gt;
				&lt;path-to-regexp.version&gt;6.2.1&lt;/path-to-regexp.version&gt;
				&lt;javax.websocket-api.version&gt;1.1&lt;/javax.websocket-api.version&gt;
				&lt;jacoco.version&gt;0.8.11&lt;/jacoco.version&gt;

				&lt;jakarta.validation.version&gt;3.0.2&lt;/jakarta.validation.version&gt;
				&lt;org.springdoc.openapi.ui.version&gt;1.7.0&lt;/org.springdoc.openapi.ui.version&gt;
				&lt;swagger-annotations.version&gt;1.6.9&lt;/swagger-annotations.version&gt;

				&lt;profile.content.phase&gt;none&lt;/profile.content.phase&gt;

			&lt;/properties&gt;
		&lt;/project&gt;
		```

- Navigate to the `application` folder.
- Open the `pom.xml` file.
- Make the following changes:

	=== "Add APIs Dependency"

		1. Navigate to the `<dependencies>` section.
		1. Add the following dependency:

			```xml
			&lt;dependency&gt;
				&lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
				&lt;artifactId&gt;custom-stack-apis&lt;/artifactId&gt;
				&lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;
			&lt;/dependency&gt;
			```

	=== "Final pom.xml"

		??? abstract "application/pom.xml"

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

#### Test the TypeScript API

- Create a project named `demo-application`.
- Right click on the `demo-application` project and select **New &#8594; TypeScript CJS Service**.
- Enter `demo.ts` for the name of the TypeScript Service.
- Replace the content with the following code:

	```typescript
	import { response } from "sdk/http";
	import { MyApi } from "custom-api/MyApi";

	const myApiInstance = new MyApi();

	const firstNumber = myApiInstance.add(5, 3);
	const secondNumber = myApiInstance.multiply(5, 3);
	const customMethod = myApiInstance.customMethod("tutorial-custom-stack");
	const greetingMessage = MyApi.greet();

	const data = {
		firstNumber: firstNumber,
		secondNumber: secondNumber,
		customMethod: customMethod,
		greetingMessage: greetingMessage,
	};

	response.println(JSON.stringify(data, null, 2));
	```

- Save the changes.
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
- Right click on the `demo-application` project and select **Publish**.
- Select the `demo.ts` from the **Projects** explorer and open the **Preview** view to see the result.

## Next Steps

::: tip Section Completed

After completing the steps in this tutorial, you would have:

- APIs Maven Module.
- Java Facade `io.dirigible.samples.MyFacade`.
- TypeScript API `custom-api/MyApi` exposing the Java Facade.
- Sample project utilizing the TypeScript API.

Continue either to the the [Advanced Facade](../advanced-facade/) section or to the [Dependency](../dependency/) section where external Maven dependency is added and used in the Custom Stack without creating a Java Facade and TypeScript API.

_**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_:::
