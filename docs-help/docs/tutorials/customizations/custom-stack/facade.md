---
title: Custom Stack - Facade
---

Custom Stack - Facade
===

## Overview

This section will guide you through the process of creation of `Java Facade` and `TypeScript API` for the Eclipse Dirigible Custom Stack.

!!! note "Prerequisites"

    - Node.js 18+ - Node.js versions can be found [here](https://nodejs.org/en/download)
    - esbuild 0.19+ - esbuild versions can be found [here](https://esbuild.github.io/getting-started/#install-esbuild)
    - tsc 5.2+ - tsc versions can be found [here](https://www.typescriptlang.org/download)

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
			<modelVersion>4.0.0</modelVersion>

			<parent>
				<groupId>io.dirigible.samples</groupId>
				<artifactId>custom-stack-parent</artifactId>
				<version>1.0.0-SNAPSHOT</version>
				<relativePath>../pom.xml</relativePath>
			</parent>

			<name>custom - stack - apis</name>
			<artifactId>custom-stack-apis</artifactId>
			<packaging>jar</packaging>

		</project>
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
		<modules>
			<module>apis</module>
			<module>application</module>
			<module>branding</module>
		</modules>
		```

=== "Final pom.xml"

	??? abstract "pom.xml"

		```xml
		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
			<modelVersion>4.0.0</modelVersion>

			<parent>
				<groupId>org.sonatype.oss</groupId>
				<artifactId>oss-parent</artifactId>
				<version>7</version>
			</parent>

			<name>custom - stack - parent</name>
			<description>Custom Stack - Sample</description>
			<groupId>io.dirigible.samples</groupId>
			<artifactId>custom-stack-parent</artifactId>
			<version>1.0.0-SNAPSHOT</version>
			<packaging>pom</packaging>

			<inceptionYear>2024</inceptionYear>

			<url>https://www.dirigible.io</url>
			<organization>
				<name>Eclipse Foundation</name>
				<url>https://www.eclipse.org</url>
			</organization>
			<scm>
				<url>https://github.com/dirigiblelabs/sample-custom-stack</url>
			</scm>

			<modules>
				<module>apis</module>
				<module>application</module>
				<module>branding</module>
			</modules>

			<dependencies>

				<!-- Platform -->
				<dependency>
					<groupId>org.slf4j</groupId>
					<artifactId>slf4j-api</artifactId>
					<scope>compile</scope>
				</dependency>
				<dependency>
					<groupId>ch.qos.logback</groupId>
					<artifactId>logback-core</artifactId>
					<scope>compile</scope>
				</dependency>
				<dependency>
					<groupId>ch.qos.logback</groupId>
					<artifactId>logback-classic</artifactId>
					<scope>compile</scope>
				</dependency>

				<!-- Commons -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-commons-config</artifactId>
				</dependency>

				<!-- Spring Boot -->
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-web</artifactId>
					<exclusions>
						<exclusion>
							<groupId>org.apache.logging.log4j</groupId>
							<artifactId>log4j-to-slf4j</artifactId>
						</exclusion>
					</exclusions>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-websocket</artifactId>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-data-jdbc</artifactId>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-data-jpa</artifactId>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-security</artifactId>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-validation</artifactId>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-actuator</artifactId>
				</dependency>

				<dependency>
					<groupId>org.springframework.security</groupId>
					<artifactId>spring-security-web</artifactId>
				</dependency>

				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-test</artifactId>
					<scope>test</scope>
					<exclusions>
					<exclusion>
						<groupId>org.junit.vintage</groupId>
						<artifactId>junit-vintage-engine</artifactId>
					</exclusion>
				</exclusions>
				</dependency>
				<dependency>
					<groupId>org.springframework.security</groupId>
					<artifactId>spring-security-test</artifactId>
					<scope>test</scope>
				</dependency>

				<!-- Date Type Utils -->
				<dependency>
					<groupId>com.fasterxml.jackson.datatype</groupId>
					<artifactId>jackson-datatype-joda</artifactId>
				</dependency>

				<!-- Swagger -->
				<dependency>
					<groupId>org.springdoc</groupId>
					<artifactId>springdoc-openapi-ui</artifactId>
					<version>${org.springdoc.openapi.ui.version}</version>
				</dependency>

				<!-- Data Access -->
				<dependency>
					<groupId>com.h2database</groupId>
					<artifactId>h2</artifactId>
				</dependency>

				<!-- WebJars -->
				<dependency>
					<groupId>org.webjars</groupId>
					<artifactId>webjars-locator</artifactId>
					<version>${webjars-locator}</version>
				</dependency>

				<!-- Olingo -->
				<dependency>
					<groupId>org.apache.olingo</groupId>
					<artifactId>olingo-odata2-lib</artifactId>
					<version>${olingo.version}</version>
					<type>pom</type>
					<exclusions>
						<exclusion>
							<groupId>javax.ws.rs</groupId>
							<artifactId>javax.ws.rs-api</artifactId>
						</exclusion>
					</exclusions>
				</dependency>

				<dependency>
					<groupId>com.google.code.gson</groupId>
					<artifactId>gson</artifactId>
				</dependency>

			</dependencies>

			<dependencyManagement>
				<dependencies>
					<dependency>
						<groupId>org.eclipse.dirigible</groupId>
						<artifactId>dirigible-dependencies</artifactId>
						<version>${dirigible.version}</version>
						<type>pom</type>
						<scope>import</scope>
					</dependency>
				</dependencies>
			</dependencyManagement>

			<profiles>
				<profile>
					<id>default</id>
					<activation>
						<activeByDefault>true</activeByDefault>
					</activation>
					<build>
						<plugins>
							<plugin>
								<groupId>org.jacoco</groupId>
								<artifactId>jacoco-maven-plugin</artifactId>
								<version>${jacoco.version}</version>
								<executions>
									<execution>
										<id>prepare-agent</id>
										<goals>
											<goal>prepare-agent</goal>
										</goals>
									</execution>
								</executions>
								<configuration>
									<rules>
										<rule>
											<element>SOURCEFILE</element>
											<excludes>
												<exclude>*src/test/*</exclude>
											</excludes>
										</rule>
									</rules>
								</configuration>
							</plugin>
							<plugin>
								<groupId>org.apache.maven.plugins</groupId>
								<artifactId>maven-compiler-plugin</artifactId>
								<version>${maven.compiler.plugin.version}</version>
								<configuration>
									<source>${maven.compiler.source}</source>
									<target>${maven.compiler.target}</target>
									<debug>true</debug>
									<debuglevel>lines,vars,source</debuglevel>
								</configuration>
							</plugin>
						</plugins>
					</build>
				</profile>
			</profiles>

			<properties>
				<project.title>custom stack</project.title>

				<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

				<dirigible.version>10.2.7</dirigible.version>

				<java.version>17</java.version>
				<maven.compiler.source>17</maven.compiler.source>
				<maven.compiler.target>17</maven.compiler.target>

				<maven.resource.plugin.version>3.3.0</maven.resource.plugin.version>
				<maven.clean.plugin.version>3.2.0</maven.clean.plugin.version>
				<maven.clean.plugin.directory>src/main/resources/META-INF/dirigible</maven.clean.plugin.directory>
				<maven.compiler.plugin.version>3.13.0</maven.compiler.plugin.version>
				<maven-surefire-plugin.version>2.22.2</maven-surefire-plugin.version>
				<maven.scm.plugin.version>1.13.0</maven.scm.plugin.version>
				<scmVersionType>branch</scmVersionType>
				<commons.io>2.11.0</commons.io>
				<commons.codec>1.15</commons.codec>
				<commons.lang3>3.12.0</commons.lang3>
				<commons.exec>1.3</commons.exec>
				<commons.text>1.10.0</commons.text>
				<gson.version>2.10.1</gson.version>
				<mockito.version>4.11.0</mockito.version>
				<hamcrest.all.version>1.3</hamcrest.all.version>
				<retrofit.version>1.8.0</retrofit.version>
				<okhttp3.version>4.10.0</okhttp3.version>
				<slf4j.version>1.7.36</slf4j.version>
				<slf4j.simple.version>1.7.12</slf4j.simple.version>
				<logback.version>1.4.5</logback.version>
				<commons-dbcp2.version>2.9.0</commons-dbcp2.version>

				<postgresql.version>42.7.0</postgresql.version>
				<ngdbc.version>2.20.11</ngdbc.version>
				<snowflake.version>3.15.0</snowflake.version>
				
				<activemq.version>5.17.3</activemq.version>
				<jsr250-api.version>1.0</jsr250-api.version>
				<jetty.version>9.4.48.v20220622</jetty.version>
				<lucene.version>9.4.2</lucene.version>
				<chemistry.version>1.1.0</chemistry.version>
				<flowable.version>6.8.0</flowable.version>
				<jaxb.version>2.3.0</jaxb.version>
				<jaxws.version>2.3.3</jaxws.version>
				<jakarta.ws.rs-api.version>2.1.5</jakarta.ws.rs-api.version>
				<license-maven-plugin.version>4.3</license-maven-plugin.version>
				<persistence.api.version>2.2.3</persistence.api.version>
				<jgit.version>6.4.0.202211300538-r</jgit.version>
				<javax.mail.api.version>1.6.4</javax.mail.api.version>
				<olingo.version>2.0.13</olingo.version>
				<kafka.version>3.3.1</kafka.version>
				<git-commit-id-plugin.version>4.9.10</git-commit-id-plugin.version>
				<mongodb.version>3.12.11</mongodb.version>
				<caffeine.version>3.1.2</caffeine.version>
				<liquibase-core.version>4.16.1</liquibase-core.version>
				<commons-csv.version>1.9.0</commons-csv.version>
				<jquery-ui.version>1.13.0</jquery-ui.version>
				<sap-theming__theming-base-content.version>11.1.42</sap-theming__theming-base-content.version>
				<fundamental-styles.version>0.24.4</fundamental-styles.version>
				<angular-aria.version>1.8.2</angular-aria.version>
				<split.js.version>1.6.5</split.js.version>
				<diff.version>5.1.0</diff.version>
				<monaco-editor.version>0.33.0</monaco-editor.version>
				<requirejs.version>2.3.6</requirejs.version>
				<jstree.version>3.3.12</jstree.version>
				<jquery.version>3.6.0</jquery.version>
				<jqplot.version>1.0.8r1250</jqplot.version>
				<bootstrap.version>3.3.7</bootstrap.version>
				<es5-shim.version>4.6.7</es5-shim.version>
				<angular-file-upload.version>2.6.1</angular-file-upload.version>
				<angularjs.version>1.8.2</angularjs.version>
				<fontawesome.version>4.7.0</fontawesome.version>
				<classgraph.version>4.8.154</classgraph.version>
				<commons-compress.version>1.22</commons-compress.version>
				<testcontainers.elasticsearch.version>1.17.6</testcontainers.elasticsearch.version>
				<testcontainers.version>1.17.6</testcontainers.version>
				<testcontainers.rabbitmq.version>1.17.6</testcontainers.rabbitmq.version>
				<amqp.client.version>5.16.0</amqp.client.version>
				<elasticsearch.client.version>7.7.1</elasticsearch.client.version>
				<jetcd.core.version>0.7.5</jetcd.core.version>
				<jetcd.test.version>0.5.4</jetcd.test.version>
				<logcaptor.version>2.7.10</logcaptor.version>
				<exec.maven.plugin>3.0.0</exec.maven.plugin>

				<spring-context-support.version>5.3.24</spring-context-support.version>
				<webjars-locator>0.51</webjars-locator>

				<keycloak-adapter-bom.version>20.0.2</keycloak-adapter-bom.version>
				<hikaricp.version>5.0.1</hikaricp.version>
				<validator.version>1.7</validator.version>
				<quartz.version>2.3.2</quartz.version>
				<c3p0.version>0.9.5.5</c3p0.version>
				<graalvm.version>22.3.1</graalvm.version>
				<guava.version>31.1-jre</guava.version>
				<icu4j.version>72.1</icu4j.version>
				<commons-collections.version>3.2.2</commons-collections.version>
				<commons-collections4.version>4.4</commons-collections4.version>
				<velocity.version>2.3</velocity.version>
				<wikitext.version>3.0.45.202211090110</wikitext.version>
				<flexmark.version>0.64.0</flexmark.version>
				<qldb.driver.version>2.3.1</qldb.driver.version>
				<qldb.sdk.version>1.12.386</qldb.sdk.version>
				<cassandra.version>1.17.6</cassandra.version>
				<cassandra.driver.version>3.11.3</cassandra.driver.version>
				<jedis.version>4.3.1</jedis.version>
				<spark.version>3.3.1</spark.version>
				<path-to-regexp.version>6.2.1</path-to-regexp.version>
				<javax.websocket-api.version>1.1</javax.websocket-api.version>
				<jacoco.version>0.8.11</jacoco.version>

				<jakarta.validation.version>3.0.2</jakarta.validation.version>
				<org.springdoc.openapi.ui.version>1.7.0</org.springdoc.openapi.ui.version>
				<swagger-annotations.version>1.6.9</swagger-annotations.version>

				<profile.content.phase>none</profile.content.phase>

			</properties>
		</project>
		```

- Navigate to the `application` folder.
- Open the `pom.xml` file.
- Make the following changes:

	=== "Add APIs Dependency"

		1. Navigate to the `<dependencies>` section.
		1. Add the following dependency:

			```xml
			<dependency>
				<groupId>io.dirigible.samples</groupId>
				<artifactId>custom-stack-apis</artifactId>
				<version>1.0.0-SNAPSHOT</version>
			</dependency>
			```

	=== "Final pom.xml"

		??? abstract "application/pom.xml"

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
	const customMethod = myApiInstance.customMethod("sample-custom-stack");
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

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - APIs Maven Module.
    - Java Facade `io.dirigible.samples.MyFacade`.
	- TypeScript API `custom-api/MyApi` exposing the Java Facade.
    - Sample project utilizing the TypeScript API.

    Continue either to the the [Advanced Facade](../advanced-facade/) section or to the [Dependency](../dependency/) section where external Maven dependency is added and used in the Custom Stack without creating a Java Facade and TypeScript API.

    _**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/sample-custom-stack](https://github.com/dirigiblelabs/sample-custom-stack)_