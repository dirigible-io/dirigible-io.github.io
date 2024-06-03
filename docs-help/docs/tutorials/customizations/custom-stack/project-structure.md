---
title: Custom Stack - Project Structure
---

Custom Stack - Project Structure
===

## Overview

This section shows how to create the project structure of the Custom Stack.
It contains the creation of several Maven `pom.xml` files, static content resources, `application.properties` configuration files and a `Spring Boot` Java class.

!!! note "Prerequisites"
    
	- JDK 21+ - OpenJDK versions can be found [here](https://adoptopenjdk.net/).
	- Maven 3.5+ - Maven version 3.5.3 can be found [here](https://maven.apache.org/docs/3.5.3/release-notes.html).

### Steps

#### Create Maven Project

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
                <version>9</version>
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
                <url>https://github.com/dirigiblelabs/tutorial-custom-stack</url>
            </scm>
        
            <modules>
                <module>apis</module>
                <module>application</module>
                <module>branding</module>
            </modules>
        
            <properties>
                <project.title>custom stack</project.title>
        
                <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
                <java.version>17</java.version>
        
                <dirigible.version>10.5.3</dirigible.version>
        
                <maven.compiler.source>${java.version}</maven.compiler.source>
                <maven.compiler.target>${java.version}</maven.compiler.target>
        
                <maven-spring-boot-plugin.version>3.3.0</maven-spring-boot-plugin.version>
                <maven-compiler-plugin.version>3.13.0</maven-compiler-plugin.version>
                <maven-surefire-plugin.version>3.2.5</maven-surefire-plugin.version>
                <maven-failsafe-plugin.version>3.2.5</maven-failsafe-plugin.version>
                <maven-git-commit-id-plugin.version>4.9.10</maven-git-commit-id-plugin.version>
        
                <scmVersionType>branch</scmVersionType>
        
                <profile.content.phase>none</profile.content.phase>
        
                <skipTests>false</skipTests>
                <skipITs>true</skipITs>
        
            </properties>
        
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
                    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
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
                </dependency>
        
                <!-- Olingo -->
                <dependency>
                    <groupId>com.codbex.olingo</groupId>
                    <artifactId>olingo-odata2-lib</artifactId>
                    <type>pom</type>
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
                    <dependency>
                        <groupId>io.dirigible.samples</groupId>
                        <artifactId>custom-stack-apis</artifactId>
                        <version>${project.version}</version>
                    </dependency>
                    <dependency>
                        <groupId>io.dirigible.samples</groupId>
                        <artifactId>custom-stack-branding</artifactId>
                        <version>${project.version}</version>
                    </dependency>
                </dependencies>
            </dependencyManagement>
        
            <build>
                <plugins>
                    <plugin>
                        <groupId>pl.project13.maven</groupId>
                        <artifactId>git-commit-id-plugin</artifactId>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-compiler-plugin</artifactId>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-surefire-plugin</artifactId>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-failsafe-plugin</artifactId>
                    </plugin>
                </plugins>
        
                <pluginManagement>
                    <plugins>
                        <plugin>
                            <groupId>org.apache.maven.plugins</groupId>
                            <artifactId>maven-surefire-plugin</artifactId>
                            <version>${maven-surefire-plugin.version}</version>
                            <configuration>
                                <skipTests>${skipTests}</skipTests>
                            </configuration>
                        </plugin>
                        <plugin>
                            <groupId>org.apache.maven.plugins</groupId>
                            <artifactId>maven-failsafe-plugin</artifactId>
                            <version>${maven-failsafe-plugin.version}</version>
                            <configuration>
                                <skipITs>${skipITs}</skipITs>
                                <classesDirectory>${project.build.outputDirectory}</classesDirectory>
                            </configuration>
                            <executions>
                                <execution>
                                    <goals>
                                        <goal>integration-test</goal>
                                        <goal>verify</goal>
                                    </goals>
                                </execution>
                            </executions>
                        </plugin>
                        <plugin>
                            <groupId>pl.project13.maven</groupId>
                            <artifactId>git-commit-id-plugin</artifactId>
                            <version>${maven-git-commit-id-plugin.version}</version>
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
                        <plugin>
                            <groupId>org.apache.maven.plugins</groupId>
                            <artifactId>maven-compiler-plugin</artifactId>
                            <version>${maven-compiler-plugin.version}</version>
                            <configuration>
                                <source>${maven.compiler.source}</source>
                                <target>${maven.compiler.target}</target>
                                <debug>true</debug>
                                <debuglevel>lines,vars,source</debuglevel>
                            </configuration>
                        </plugin>
                        <plugin>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-maven-plugin</artifactId>
                            <version>${maven-spring-boot-plugin.version}</version>
                            <executions>
                                <execution>
                                    <goals>
                                        <goal>repackage</goal>
                                    </goals>
                                </execution>
                            </executions>
                        </plugin>
                    </plugins>
                </pluginManagement>
            </build>
        
            <profiles>
                <profile>
                    <id>tests</id>
                    <properties>
                        <skipTests>false</skipTests>
                        <skipITs>false</skipITs>
                    </properties>
                </profile>
                <profile>
                    <id>unit-tests</id>
                    <properties>
                        <skipTests>false</skipTests>
                        <skipITs>true</skipITs>
                    </properties>
                </profile>
                <profile>
                    <id>integration-tests</id>
                    <properties>
                        <skipITs>false</skipITs>
                        <skip.code.formatting>true</skip.code.formatting>
                    </properties>
                    <build>
                        <plugins>
                            <plugin>
                                <groupId>org.apache.maven.plugins</groupId>
                                <artifactId>maven-surefire-plugin</artifactId>
                                <configuration>
                                    <skipTests>true</skipTests>
                                </configuration>
                            </plugin>
                        </plugins>
                    </build>
                </profile>
                <profile>
                    <id>quick-build</id>
                    <properties>
                        <skipTests>true</skipTests>
                        <skipITs>true</skipITs>
                    </properties>
                </profile>
            </profiles>
        
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
				<configuration>
					<dotGitDirectory>../.git</dotGitDirectory>
				</configuration>
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
                </dependency>
                <dependency>
                    <groupId>io.dirigible.samples</groupId>
                    <artifactId>custom-stack-branding</artifactId>
                </dependency>
                <dependency>
                    <groupId>uk.org.okapibarcode</groupId>
                    <artifactId>okapibarcode</artifactId>
                    <version>0.4.6</version>
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
                </dependency>
                <dependency>
                    <groupId>net.snowflake</groupId>
                    <artifactId>snowflake-jdbc</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.eclipse.dirigible</groupId>
                    <artifactId>dirigible-tests-framework</artifactId>
                </dependency>
            </dependencies>
        
            <build>
        
                <resources>
                    <resource>
                        <directory>src/main/resources</directory>
                        <filtering>true</filtering>
                    </resource>
                </resources>
        
                <plugins>
                    <plugin>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-maven-plugin</artifactId>
                    </plugin>
                </plugins>
        
            </build>
        
        </project>
		```

#### Create Eclipse Dirigible Resources

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
        DIRIGIBLE_PRODUCT_REPOSITORY=https://github.com/dirigiblelabs/tutorial-custom-stack
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
	1. Create `application/src/main/resources/static/index.html` file.
	1. Paste the following content:

	??? abstract "application/src/main/resources/static/index.html"

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

	??? abstract "application/src/main/resources/static/index-busy.html"

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

#### _(optional)_ Create Eclipse Dirigible Error Resources

- Navigate to the `application/src/main/resources` folder.
- Create `public` folder and navigate to it.
- Create `error.html`, `403.html` and `404.html` files.

=== "error.html"

	- Create `application/src/main/resources/public/error/error.html` file.
	- Paste the following content:

	??? abstract "application/src/main/resources/public/error/error.html"

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

	??? abstract "application/src/main/resources/error/403.html"

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

	??? abstract "application/src/main/resources/error/404.html"

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

#### Create Spring Boot Resources

- Navigate to the `application` folder.
- Create `application.properties`, `quartz.properties` and `CustomStackApplication.java` files.

=== "application.properties"

	1. Navigate to the `src/main/resources/` folder.
	1. Create `application/src/main/resources/application.properties` file.
	1. Paste the following content:

	??? abstract "application/src/main/resources/application.properties"

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
        
        terminal.enabled=${DIRIGIBLE_TERMINAL_ENABLED:true}
        
        management.metrics.mongo.command.enabled=false
        management.metrics.mongo.connectionpool.enabled=false
        
        cxf.path=/odata/v2
        
        management.endpoints.web.exposure.include=*
        
        springdoc.api-docs.path=/api-docs
        
        # the following are used to force the Spring to create QUARTZ tables
        # quartz properties are manged in quartz.properties don't try to add them here
        spring.quartz.job-store-type=jdbc
        spring.quartz.jdbc.initialize-schema=always

		```

=== "quartz.properties"

	1. Navigate to the `src/main/resources/` folder.
	1. Create `application/src/main/resources/quartz.properties` file.
	1. Paste the following content:

	??? abstract "application/src/main/resources/quartz.properties"

		```
        org.quartz.jobStore.class=org.quartz.impl.jdbcjobstore.JobStoreTX
        org.quartz.jobStore.driverDelegateClass=org.quartz.impl.jdbcjobstore.StdJDBCDelegate
        
        # will be set by QuartzConfig
        org.quartz.jobStore.dataSource=WILL_BE_SET_BY_THE_CODE
        
        org.quartz.jobStore.isClustered=true
        org.quartz.jobStore.useProperties=false
        org.quartz.jobStore.clusterCheckinInterval=2000
        org.quartz.jobStore.misfireThreshold=40000
        
        org.quartz.scheduler.instanceName=EclipseDirigibleScheduler
        org.quartz.scheduler.instanceId=AUTO
        
        # thread-pool
        org.quartz.threadPool.class=org.quartz.simpl.SimpleThreadPool
        org.quartz.threadPool.threadCount=5
        org.quartz.threadPool.threadPriority=5
        
        # job-store
        # Enable this property for RAMJobStore
        # org.quartz.jobStore.class=org.quartz.simpl.RAMJobStore
        
        # Enable these properties for a JDBCJobStore using JobStoreTX
        #org.quartz.jobStore.class=org.quartz.impl.jdbcjobstore.JobStoreTX
        #org.quartz.jobStore.driverDelegateClass=org.quartz.impl.jdbcjobstore.StdJDBCDelegate
        #org.quartz.jobStore.dataSource=quartzDataSource
        # Enable this property for JobStoreCMT
        #org.quartz.jobStore.nonManagedTXDataSource=quartzDataSource
        
        # H2 database
        # use an in-memory database & initialise Quartz using their standard SQL script
        #org.quartz.dataSource.quartzDataSource.URL=jdbc:h2:mem:spring-quartz;INIT=RUNSCRIPT FROM 'classpath:/org/quartz/impl/jdbcjobstore/tables_h2.sql'
        #org.quartz.dataSource.quartzDataSource.driver=org.h2.Driver
        #org.quartz.dataSource.quartzDataSource.user=sa
        #org.quartz.dataSource.quartzDataSource.password=
        #org.quartz.jdbc.initialize-schema=never
		```

=== "CustomStackApplication.java"

	1. Navigate to the `src/main` folder.
	1. Create `java/io/dirigible/samples/` and navigate to it.
	1. Create `application/src/main/java/io/dirigible/samples/CustomStackApplication.java` file.
	1. Paste the following content:

	??? abstract "application/src/main/java/io/dirigible/samples/CustomStackApplication.java"

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

#### Build the Custom Stack

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the **Terminal** and execute the following command to build the _Custom Stack_:

	```
	mvn clean install
	```

#### Run the Custom Stack

- Navigate to the root folder of the project _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the **Terminal** and execute the following command to run the _Custom Stack_:

	```
	java -jar application/target/custom-stack-application-*.jar
	```

	!!! info "Debugging"

		To run in debug mode, execute the following command:

		```
		java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 -jar application/target/custom-stack-application-*.jar
		```

- Go to [http://localhost:8080](http://localhost:8080/) to access the _Custom Stack_.

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - Maven project structure.
    - Spring Boot application.
    - Eclipse Dirigible Stack running at [http://localhost:8080](http://localhost:8080/).

    Continue to the [Branding](../branding/) section to customize the branding of the Custom Stack.

    _**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_
