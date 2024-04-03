---
title: Custom Stack
---

Custom Stack
===

This tutorial will guide you through the creation of a custom Eclipse Dirigible stack.

!!! note "Prerequisites"
    
	- JDK 21+ - OpenJDK versions can be found [here](https://adoptopenjdk.net/).
	- Maven 3.5+ - Maven version 3.5.3 can be found [here](https://maven.apache.org/docs/3.5.3/release-notes.html).

### Steps

1. Create Maven `pom.xml` files:

	- Create new folder on your machine, for the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Create `pom.xml` and `application/pom.xml` files.

	=== "pom.xml"

	    1. Create new `pom.xml` file.
		1. Paste the following content:

		??? abstract "pom.xml"

			```xml hl_lines="229"
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

		!!! tip "Eclipse Dirigible version"

			The tutorial is using Eclipse Dirigible version `10.2.7` as highlighted on line **229**. To check for a more recent and stable version go to [Eclipse Dirigible Releases](https://github.com/eclipse/dirigible/releases/).

    === "application/pom.xml"

	    1. Create new folder `application` and navigate to it.
		1. Create new `application/pom.xml` file.
		1. Paste the following content:

		??? abstract "application/pom.xml"

			!!! info "Git Repository"

				For git repositories uncomment the following lines, in order to receive the `Commit Id` information in the **About** view:

				```xml
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
				</plugin>
				-->
				```

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

1. Create Eclipse Dirigible resources:

    - Navigate to the `application` folder.
	- Create `src/main/resources/` folder structure and navigate to it.
	- Create `dirigible.properties`, `index.html` and `index-busy.html` files.

    === "dirigible.properties"

		1. Create `application/src/main/resources/dirigible.properties` file.
		1. Paste the following content:

		??? abstract "application/src/main/resources/dirigible.properties"

			```
			# General
			DIRIGIBLE_PRODUCT_NAME=${project.title}
			DIRIGIBLE_PRODUCT_VERSION=${project.version}
			DIRIGIBLE_PRODUCT_COMMIT_ID=${git.commit.id}
			DIRIGIBLE_PRODUCT_REPOSITORY=https://github.com/dirigiblelabs/sample-custom-stack
			DIRIGIBLE_PRODUCT_TYPE=all
			DIRIGIBLE_INSTANCE_NAME=custom-stack
			DIRIGIBLE_DATABASE_PROVIDER=local
			DIRIGIBLE_JAVASCRIPT_HANDLER_CLASS_NAME=org.eclipse.dirigible.graalium.handler.GraaliumJavascriptHandler
			DIRIGIBLE_GRAALIUM_ENABLE_DEBUG=true
			DIRIGIBLE_HOME_URL=services/web/ide/
			DIRIGIBLE_FTP_PORT=22
			```

		!!! info "Environment Variables"

		    The properties file will be packaged inside the _Custom Stack_, and the above environment variables will be set by default. These environment variables could be overridden during _`Deployment`_ or at _`Runtime`_. To learn more about the supported configurations go to [Environment Variables](https://www.dirigible.io/help/setup/setup-environment-variables/).

    === "static/index.html"

		1. Create `static` folder and navigate to it.
		1. Create `releng/src/main/resources/static/index.html` file.
		1. Paste the following content:

		```html
		<!DOCTYPE html>
		<html lang="en-US">
		    <meta charset="utf-8">
		    <title>Redirecting&hellip;</title>
		    <link rel="canonical" href="/home">
		    <script>location="/home"</script>
		    <meta http-equiv="refresh" content="0; url=/home">
		    <meta name="robots" content="noindex">
		    <h1>Redirecting&hellip;</h1>
		    <a href="/home">Click here if you are not redirected.</a>
		</html>
		```

    === "static/index-busy.html"

		1. Create `static` folder and navigate to it.
		1. Create `application/src/main/resources/static/index-busy.html` file.
		1. Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="busyPage" ng-controller="BusyController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/web/resources/images/favicon.ico" />
				<title>Loading ...</title>
				<theme></theme>
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="padding-left: 10rem; padding-right: 10rem; margin-top: 3rem;">
					<div class="fd-panel fd-panel--fixed">
						<div class="fd-panel__header">
							<h4 class="fd-panel__title">Preparing Custom Stack Instance</h4>
						</div>
					</div>
					<fd-list>
						<fd-list-item ng-repeat="job in jobs">
							<span fd-object-status status="{{job.status}}" glyph="{{job.statusIcon}}"
								text="{{job.name}}"></span>
						</fd-list-item>
					</fd-list>
					<fd-busy-indicator style="margin-top: 3rem;" dg-size="l"></fd-busy-indicator>
				</div>

				<script>
					let busyPage = angular.module('busyPage', ['ideUI', 'ideView']);

					busyPage.controller('BusyController', ['$scope', '$http', 'theming', function ($scope, $http, theming) {

						setInterval(function() {

							$http({
								method: 'GET',
								url: '/services/healthcheck'
							}).then(function(healthStatus){
								if (healthStatus.data.status === "Ready") {
									window.location='/home';
								}
								let jobs = [];
								for (const [key, value] of Object.entries(healthStatus.data.jobs.statuses)) {
									let job = new Object();
									job.name = key;
									switch(value) {
										case "Succeeded":
											job.status = "positive";
											job.statusIcon = "sap-icon--message-success"
											break;
										case "Failed":
											job.status = "negative";
											job.statusIcon = "sap-icon--message-error";
										default:
											job.status = "informative";
											job.statusIcon = "sap-icon--message-information"
											break;
									}
									jobs.push(job);
								}
								$scope.jobs = jobs.sort((x, y) => x.name > y.name ? 1 : -1);
							}), (function(e){
								console.error("Error retreiving the health status", e);
							});

						}, 1000);
					}]);
				</script>
			</body>

		</html>
		```

1. _(optional)_ Create Eclipse Dirigible error resources:

    - Navigate to the `application/src/main/resources` folder.
	- Create `public` folder and navigate to it.
	- Create `error.html`, `403.html` and `404.html` files.

    === "error.html"

	    - Create `application/src/main/resources/public/error/error.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="errorPage" ng-controller="ErrorPageController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/web/resources/images/favicon.ico" />
				<title>Custom Stack | Unexpected Error Occurred</title>
				<theme></theme>
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="height: 600px; width: 100%;">
					<fd-message-page glyph="sap-icon--error">
						<fd-message-page-title>Unexpected Error Occurred</fd-message-page-title>
						<fd-message-page-subtitle>
							<b>There was a problem serving the requested page</b>.
							<br>
							Usually this means that an enexpected error
							happened while processing your request. Here's what you can try next:
							<br>
							<br>
							<i><b>Reload the page</b>, the problem may be temporary. If the problem persists, <b>contact us</b>
								and we'll
								help get you on your way.</i>
						</fd-message-page-subtitle>
						<fd-message-page-actions>
							<fd-button compact="true" dg-label="Reload Page" dg-type="emphasized" style="margin: 0 0.25rem;"
								ng-click="reloadPage()">
							</fd-button>
							<fd-button compact="true" dg-label="Contact Support" ng-click="contactSupport()"></fd-button>
						</fd-message-page-actions>
					</fd-message-page>
				</div>

				<script>
					let errorPage = angular.module('errorPage', ['ideUI', 'ideView']);

					errorPage.controller('ErrorPageController', ['$scope', 'theming', function ($scope, theming) {

						$scope.reloadPage = function() {
							location.reload();
						};

						$scope.contactSupport = function() {
							window.open("https://bugs.dirigible.io", "_blank");
						};
					}]);
				</script>
			</body>

		</html>
		```

    === "403.html"

	    - Create `error` folder and navigate to it. 
		- Create `application/src/main/resources/error/403.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="errorPage" ng-controller="ErrorPageController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/web/resources/images/favicon.ico" />
				<title>Custom Stack | Access Denied</title>
				<theme></theme>
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="height: 600px; width: 100%;">
					<fd-message-page glyph="sap-icon--alert">
						<fd-message-page-title>Access Denied</fd-message-page-title>
						<fd-message-page-subtitle>
							<b>The page you're trying to access has resctricted access</b>.
							<br>
							Pleace contact your system administrator for more details.
						</fd-message-page-subtitle>
					</fd-message-page>
				</div>

				<script>
					let errorPage = angular.module('errorPage', ['ideUI', 'ideView']);

					errorPage.controller('ErrorPageController', ['$scope', 'theming', function ($scope, theming) {

					}]);
				</script>
			</body>

		</html>
		```

    === "404.html"

	    - Create `error` folder and navigate to it. 
		- Create `application/src/main/resources/error/404.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="errorPage" ng-controller="ErrorPageController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/web/resources/images/favicon.ico" />
				<title>Custom Stack | Page Not Found</title>
				<theme></theme>
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="height: 600px; width: 100%;">
					<fd-message-page glyph="sap-icon--documents">
						<fd-message-page-title>Page Not Found</fd-message-page-title>
						<fd-message-page-subtitle>
							<b>It looks like you've reached a URL that doesn't exist</b>.
							<br>
							The page you are looking for is no longer here, or never existed in the first place.
							<br>
							<br>
							<i>You can go to the <b>previous page</b>, or start over from the <b>home page</b>.</i>
						</fd-message-page-subtitle>
						<fd-message-page-actions>
							<fd-button compact="true" dg-label="Go Back" dg-type="emphasized" style="margin: 0 0.25rem;"
								ng-click="goBack()">
							</fd-button>
							<fd-button compact="true" dg-label="Take Me Home" ng-click="goHome()" ng-click="goHome()">
							</fd-button>
						</fd-message-page-actions>
					</fd-message-page>
				</div>

				<script>
					let errorPage = angular.module('errorPage', ['ideUI', 'ideView']);

					errorPage.controller('ErrorPageController', ['$scope', 'theming', function ($scope, theming) {

						$scope.goBack = function() {
							history.back();
						};

						$scope.goHome = function() {
							window.location = "/home";
						};

					}]);
				</script>
			</body>

		</html>
		```

1. Create Spring Boot files:

    - Navigate to the `application` folder.
	- Create `application.properties`, `application-keycloak.properties` and `CustomStackApplication.java` files.

    === "application.properties"

		1. Navigate to the `src/main/resources/` folder.
		1. Create `application/src/main/resources/application.properties` file.
		1. Paste the following content:

		```
		server.port=8080

		spring.main.allow-bean-definition-overriding=true
		server.error.include-message=always

		spring.servlet.multipart.enabled=true
		spring.servlet.multipart.file-size-threshold=2KB
		spring.servlet.multipart.max-file-size=1GB
		spring.servlet.multipart.max-request-size=1GB
		spring.servlet.multipart.max-file-size=200MB
		spring.servlet.multipart.max-request-size=215MB
		spring.servlet.multipart.location=${java.io.tmpdir}

		spring.datasource.hikari.connectionTimeout=3600000
		spring.mvc.async.request-timeout=3600000

		basic.enabled=${DIRIGIBLE_BASIC_ENABLED:true}

		terminal.enabled=${DIRIGIBLE_TERMINAL_ENABLED:false}

		keycloak.enabled=${DIRIGIBLE_KEYCLOAK_ENABLED:false}
		keycloak.realm=${DIRIGIBLE_KEYCLOAK_REALM:null}
		keycloak.auth-server-url=${DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL:null}
		keycloak.ssl-required=${DIRIGIBLE_KEYCLOAK_SSL_REQUIRED:external}
		keycloak.resource=${DIRIGIBLE_KEYCLOAK_CLIENT_ID:null}
		keycloak.public-client=true
		keycloak.principal-attribute=preferred_username
		keycloak.confidential-port=${DIRIGIBLE_KEYCLOAK_CONFIDENTIAL_PORT:443}
		keycloak.use-resource-role-mappings=true

		management.metrics.mongo.command.enabled=false
		management.metrics.mongo.connectionpool.enabled=false

		management.endpoints.jmx.exposure.include=*
		management.endpoints.jmx.exposure.exclude=
		management.endpoints.web.exposure.include=*
		management.endpoints.web.exposure.exclude=
		management.endpoint.health.show-details=always

		springdoc.api-docs.path=/api-docs

		cxf.path=/odata/v2

		# the following are used to force the Spring to create QUARTZ tables
		# quartz properties are manged in quartz.properties don't try to add them here
		spring.quartz.job-store-type=jdbc
		spring.quartz.jdbc.initialize-schema=always
		```

    === "application-keycloak.properties"

		1. Navigate to the `src/main/resources/` folder.
		1. Create `application/src/main/resources/application.properties` file.
		1. Paste the following content:

		```
		basic.enabled=false

		# example https://keycloak.apps.dirigible.io/auth/realms/dirigible
		spring.security.oauth2.client.provider.keycloak.issuer-uri=${DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL}

		spring.security.oauth2.client.registration.keycloak.provider=keycloak
		spring.security.oauth2.client.registration.keycloak.client-id=${DIRIGIBLE_KEYCLOAK_CLIENT_ID}
		spring.security.oauth2.client.registration.keycloak.scope=openid,profile,roles,microprofile-jwt,email,phone,web-origins,address,offline_access
		spring.security.oauth2.client.registration.keycloak.authorization-grant-type=authorization_code

		spring.security.oauth2.client.provider.keycloak.user-name-attribute=preferred_username
		```

    === "CustomStackApplication.java"

		1. Navigate to the `src/main` folder.
		1. Create `java/io/dirigible/samples/` and navigate to it.
		1. Create `application/src/main/java/io/dirigible/samples/CustomStackApplication.java` file.
		1. Paste the following content:

		```java
		package io.dirigible.samples;

		import org.springframework.boot.SpringApplication;
		import org.springframework.boot.autoconfigure.SpringBootApplication;
		import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
		import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
		import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
		import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
		import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
		import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
		import org.springframework.scheduling.annotation.EnableScheduling;

		@EnableJpaAuditing
		@EnableJpaRepositories
		@SpringBootApplication(scanBasePackages = {"io.dirigible.samples", "org.eclipse.dirigible.components"},
			exclude = {DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class,
				HibernateJpaAutoConfiguration.class, JdbcTemplateAutoConfiguration.class})
		@EnableScheduling
		public class CustomStackApplication {
			
			public static void main(String[] args) {
				SpringApplication.run(CustomStackApplication.class, args);
			}

		}
		```

1. Build the _Custom Stack_.

    - Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Open the **Terminal** and execute the following command to build the _Custom Stack_:

	    ```
		mvn clean install
		```

1. Run the _Custom Stack_.

    - Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Open the **Terminal** and execute the following command to run the _Custom Stack_:

	    ```
		java --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -jar application/target/custom-stack-application-*.jar
		```

		!!! info "Debugging"

			To run in debug mode, execute the following command:

			```
			java --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 -jar application/target/custom-stack-application-*.jar
			```

	- Go to [http://localhost:8080](http://localhost:8080/) to access the _Custom Stack_.
