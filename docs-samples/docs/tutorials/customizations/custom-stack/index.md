---
title: Custom Stack
---

Custom Stack
===

This tutorial will guide you through the creation of a custom Eclipse Dirigible stack.

!!! note "Prerequisites"
    
	- JDK 11+ - OpenJDK versions can be found [here](https://adoptopenjdk.net/).
	- Maven 3.5+ - Maven version 3.5.3 can be found [here](https://maven.apache.org/docs/3.5.3/release-notes.html).

### Steps

1. Create Maven `pom.xml` files:

	- Create new folder on your machine, for the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Create `pom.xml` and `releng/pom.xml` files.

	=== "pom.xml"

	    1. Create new `pom.xml` file.
		1. Paste the following content:

    	```xml hl_lines="65"
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>

            <parent>
                <groupId>org.sonatype.oss</groupId>
                <artifactId>oss-parent</artifactId>
                <version>7</version>
            </parent>

            <name>Custom Stack - Parent</name>
            <description>Custom Stack</description>
            <groupId>io.dirigible.custom.stack</groupId>
            <artifactId>custom-stack-parent</artifactId>
            <version>1.0.0-SNAPSHOT</version>
            <packaging>pom</packaging>

            <modules>
                <module>releng</module>
            </modules>

            <profiles>
                <profile>
                    <id>default</id>
                    <activation>
                        <activeByDefault>true</activeByDefault>
                    </activation>
                    <build>
                        <plugins>
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
                        </plugins>
                    </build>
                </profile>
            </profiles>

            <properties>
                <dirigible.version>6.3.12</dirigible.version>

                <java.version>11</java.version>

                <spring.boot.version>2.7.2</spring.boot.version>

                <maven.compiler.plugin.version>3.10.1</maven.compiler.plugin.version>
                <maven.compiler.source>11</maven.compiler.source>
                <maven.compiler.target>11</maven.compiler.target>

                <slf4j.version>1.7.36</slf4j.version>
                <logback.version>1.2.11</logback.version>
                <commons.lang3>3.12.0</commons.lang3>

                <git-commit-id-plugin.version>4.9.10</git-commit-id-plugin.version>
            </properties>
        </project>
    	```

		!!! tip "Eclipse Dirigible version"

			The tutorial is using Eclipse Dirigible version `6.3.12` as highlighted on line **65**. To check for a more recent and stable version go to [Eclipse Dirigible Releases](https://github.com/eclipse/dirigible/releases/).

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

    === "releng/pom.xml"

	    1. Create new folder `releng` and navigate to it.
		1. Create new `pom.xml` file.
		1. Paste the following content:

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

				<!-- Dirigible -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-server-spring</artifactId>
					<version>${dirigible.version}</version>
				</dependency>
			</dependencies>
		
		</project>
		```

1. Create Eclipse Dirigible resources:

    - Navigate to the `releng` folder.
	- Create `src/main/resources` folder structure.
	- Create `dirigible.properties`, `index.html` and `index-busy.html` files.

	=== "dirigible.properties"

	    1. Navigate to the `src/main/resouces` folder.
		1. Create `dirigible.properties` file.
		1. Paste the following content:

		```
		DIRIGIBLE_PRODUCT_NAME=Custom Platform
		DIRIGIBLE_PRODUCT_VERSION=${project.version}
		DIRIGIBLE_PRODUCT_COMMIT_ID=${git.commit.id}
		DIRIGIBLE_PRODUCT_REPOSITORY=https://github.com/eclipse/dirigible
		DIRIGIBLE_PRODUCT_TYPE=custom
		DIRIGIBLE_INSTANCE_NAME=custom-platform-spring-boot
		DIRIGIBLE_DATABASE_PROVIDER=local
		DIRIGIBLE_JAVASCRIPT_HANDLER_CLASS_NAME=org.eclipse.dirigible.graalium.web.GraaliumJavascriptHandler
		DIRIGIBLE_GRAALIUM_ENABLE_DEBUG=true
		```

		!!! info "Environment Variables"

		    The properties file will be packaged inside the _Custom Stack_, and the above environment variables will be set by default. These environment variables could be overridden during _`Deployment`_ or at _`Runtime`_. To learn more about the supported configurations go to [Environment Variables](https://www.dirigible.io/help/setup/setup-environment-variables/).

    === "index.html"

	    1. Navigate to the `src/main/resouces` folder.
		1. Create `static` folder and navigate to it.
		1. Create `index.html` file.
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

    === "index-busy.html"

	    1. Navigate to the `src/main/resouces` folder.
		1. Create `static` folder and navigate to it.
		1. Create `index-busy.html` file.
		1. Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" ng-app="busy" ng-controller="BusyController as busy">
			<head>
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta charset="utf-8">

				<link type="text/css" rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css">

		    	<link type="text/css" href="/webjars/fontawesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

				<style>
					.busy-indicator {
					  display: inline-block;
					  position: relative;
					  width: 64px;
					  height: 64px;
					}
					.busy-indicator div {
					  animation: busy-indicator 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
					  transform-origin: 32px 32px;
					}
					.busy-indicator div:after {
					  content: " ";
					  display: block;
					  position: absolute;
					  width: 6px;
					  height: 6px;
					  border-radius: 50%;
					  background: #cef;
					  margin: -3px 0 0 -3px;
					}
					.busy-indicator div:nth-child(1) {
					  animation-delay: -0.036s;
					}
					.busy-indicator div:nth-child(1):after {
					  top: 50px;
					  left: 50px;
					}
					.busy-indicator div:nth-child(2) {
					  animation-delay: -0.072s;
					}
					.busy-indicator div:nth-child(2):after {
					  top: 54px;
					  left: 45px;
					}
					.busy-indicator div:nth-child(3) {
					  animation-delay: -0.108s;
					}
					.busy-indicator div:nth-child(3):after {
					  top: 57px;
					  left: 39px;
					}
					.busy-indicator div:nth-child(4) {
					  animation-delay: -0.144s;
					}
					.busy-indicator div:nth-child(4):after {
					  top: 58px;
					  left: 32px;
					}
					.busy-indicator div:nth-child(5) {
					  animation-delay: -0.18s;
					}
					.busy-indicator div:nth-child(5):after {
					  top: 57px;
					  left: 25px;
					}
					.busy-indicator div:nth-child(6) {
					  animation-delay: -0.216s;
					}
					.busy-indicator div:nth-child(6):after {
					  top: 54px;
					  left: 19px;
					}
					.busy-indicator div:nth-child(7) {
					  animation-delay: -0.252s;
					}
					.busy-indicator div:nth-child(7):after {
					  top: 50px;
					  left: 14px;
					}
					.busy-indicator div:nth-child(8) {
					  animation-delay: -0.288s;
					}
					.busy-indicator div:nth-child(8):after {
					  top: 45px;
					  left: 10px;
					}
					@keyframes busy-indicator {
					  0% {
					    transform: rotate(0deg);
					  }
					  100% {
					    transform: rotate(360deg);
					  }
					}

					.Running:before {
					    font-family: 'FontAwesome';
					    font-size:1.3em;
					    color: yellow;
					    content: '\f054';  /* the chevron right icon */
					    padding-right: 4px; /* plus 4px spacing */
					}

					.Succeeded:before {
					    font-family: 'FontAwesome';
					    font-size:1.3em;
					    color: green;
					    content: '\f00c';  /* the check icon */
					    padding-right: 4px; /* plus 4px spacing */
					}

					.Failed:before {
					    font-family: 'FontAwesome';
					    font-size:1.3em;
					    color: red;
					    content: '\f00d';  /* the times icon */
					    padding-right: 4px; /* plus 4px spacing */
					}

				</style>

				<script src="/webjars/jquery/3.6.0/jquery.min.js"></script>

				<script type="text/javascript" src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js" async></script>

				<script type="text/javascript" src="/webjars/angularjs/1.8.2/angular.min.js"></script>
				<script type="text/javascript" src="/webjars/angularjs/1.8.2/angular-resource.min.js"></script>

			</head>

			<body>
				<div class="container text-center">
					<br><br><br><br><br>
					<h1>Preparing your Custom Platform environment... <span class="badge badge-secondary"><div class="busy-indicator">
					<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></span></h1>

					<table class="table table-striped">
				    <thead>
				        <tr>
				            <td>Name</td>
				            <td>Status</td>
				        </tr>
				    </thead>
				    <tbody>
				        <tr ng-repeat="job in jobs">
						   <td>{{job.name}}</td>
						   <td class="{{job.status}}">{{job.status}}</td>
						</tr>
				    </tbody>
				</table>

				</div>
			</body>

			<script>
				angular.module('busy', ['ngResource'])
					.controller('BusyController', ['$scope', '$http', function ($scope, $http) {

					setInterval(function() {

						$http({
				            method: 'GET',
				            url: 'services/v4/healthcheck'
				        }).then(function(healthStatus){
				        	if (healthStatus.data.status === "Ready") {
								window.location='home';
							}
							var jobs = [];
							for (const [key, value] of Object.entries(healthStatus.data.jobs.statuses)) {
								var job = new Object();
								job.name = key;
								job.status = value;
								jobs.push(job);
							}
				        	$scope.jobs = jobs.sort((x, y) => x.name > y.name ? 1 : -1);
						}), (function(e){
				            console.error("Error retreiving the health status", e);
				        });
					}, 1000);
				}]);
			</script>
		</html>
		```

1. _(optional)_ Create Eclipse Dirigible error resources:

    - Navigate to the `releng/src/main/resources` folder.
	- Create `public` folder.
	- Create `error.html`, `403.html` and `404.html` files.

    === "error.html"

	    - Create `error.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
		    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		    <meta name="viewport" content="width=device-width, initial-scale=1">

		    <title>Custom Platform | Error</title>

			<link type="text/css" rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css">

			<link rel="shortcut icon" type="image/png" href="/services/v4/web/resources/images/favicon.png" />
		</head>
		<body>
		<div class="container">
		    <div class="row">
		    <div class="error-template">
			    <h2>Oops!</h2>
			    <h3>Unexpected error occurred</h3>
			    <div class="error-details">
				Sorry, an error has occurred<br>
			    </div>
			    <div class="error-actions">
				<a href="/" class="btn btn-primary">
				    <i class="icon-home icon-white"></i> Take Me Home </a>
				<a href="https://www.dirigible.io" class="btn btn-default">
				    <i class="icon-envelope"></i> Contact Support </a>
			    </div>
			</div>
		    </div>
		</div>
		</body>
		</html>
		```

    === "403.html"

	    - Create `error` folder and navigate to it. 
		- Create `403.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
		    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		    <meta name="viewport" content="width=device-width, initial-scale=1">

		    <title>Custom Platform | Error 403</title>

			<link type="text/css" rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css">

			<link rel="shortcut icon" type="image/png" href="/services/v4/web/resources/images/favicon.png" />
		</head>
		<body>
		<div class="container">
		    <div class="row">
		    <div class="error-template">
			    <h3>403 Forbidden</h3>
			    <div class="error-details">
				Sorry, an error has occurred, this page is forbidden<br>
			    </div>
			    <div class="error-actions">
				<a href="/" class="btn btn-primary">
				    <i class="icon-home icon-white"></i> Take Me Home </a>
				<a href="https://www.dirigible.io" class="btn btn-default">
				    <i class="icon-envelope"></i> Contact Support </a>
			    </div>
			</div>
		    </div>
		</div>
		</body>
		</html>
		```

    === "404.html"

	    - Create `error` folder and navigate to it. 
		- Create `404.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
		    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		    <meta name="viewport" content="width=device-width, initial-scale=1">

		    <title>Custom Platform | Error 404</title>

			<link type="text/css" rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css">

			<link rel="shortcut icon" type="image/png" href="/services/v4/web/resources/images/favicon.png" />
		</head>
		<body>
		<div class="container">
		    <div class="row">
		    <div class="error-template">
			    <h3>404 Not Found</h3>
			    <div class="error-details">
				Sorry, an error has occurred, requested page not found!<br>
			    </div>
			    <div class="error-actions">
				<a href="/" class="btn btn-primary">
				    <i class="icon-home icon-white"></i> Take Me Home </a>
				<a href="https://www.dirigible.io" class="btn btn-default">
				    <i class="icon-envelope"></i> Contact Support </a>
			    </div>
			</div>
		    </div>
		</div>
		</body>
		</html>
		```

1. Create Spring Boot files:

    - Navigate to the `releng` folder.
	- Create `application.yaml` and `CustomPlatformApplication.java` files.

    === "application.yaml"

		1. Navigate to the `src/main/resouces` folder.
		1. Create `application.yaml` file.
		1. Paste the following content:

		```yaml
		cxf:
		  path: /services/v4
		  jaxrs:
		    client:
		      headers:
		        accept: text/plain
		      classes-scan-packages: org.eclipse.dirigible
		      address: http://localhost:8080/services/v4

		keycloak:
		  enabled: ${DIRIGIBLE_KEYCLOAK_ENABLED:false}
		  realm: ${DIRIGIBLE_KEYCLOAK_REALM}
		  auth-server-url: ${DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL}
		  ssl-required: ${DIRIGIBLE_KEYCLOAK_SSL_REQUIRED:external}
		  resource: ${DIRIGIBLE_KEYCLOAK_CLIENT_ID}
		  public-client: true
		  principal-attribute: "preferred_username"
		  confidential-port: ${DIRIGIBLE_KEYCLOAK_CONFIDENTIAL_PORT:443}
		  use-resource-role-mappings: true
		  securityConstraints:
		    - securityCollections:
		      - name: Landing Page
		        patterns: [/, /home, /index.html]
		      authRoles: [Everyone]
		    - securityCollections:
		      - name: Themes
		        patterns: [/services/v4/core/theme/*, /services/v4/web/resources/*]
		    - securityCollections:
		      - name: Public Engine Services
		        patterns: [/public/v4/web/*, /public/v4/js/*, /public/v4/wiki/*, /public/v4/command/*]
		    - securityCollections:
		      - name: IDE Services
		        patterns: [/services/v4/ide/*, /websockets/v4/ide/*]
		      authRoles: [Developer]
		    - securityCollections:
		      - name: Core Services
		        patterns: [/services/v4/core/*, /websockets/v4/core/*]
		      authRoles: [Operator]
		    - securityCollections:
		      - name: Operations Services
		        patterns: [/services/v4/ops/*, /websockets/v4/ops/*]
		      authRoles: [Operator]
		    - securityCollections:
		      - name: Transport Services
		        patterns: [/services/v4/transport/*]
		      authRoles: [Operator]
		```

    === "CustomPlatformApplication.java"

		1. Navigate to the `src/main` folder.
		1. Create `java/io/dirigible/custom/platform` and navigate to it.
		1. Create `CustomPlatformApplication.java` file.
		1. Paste the following content:

		```java
		package io.dirigible.custom.platform;

		import org.eclipse.dirigible.DirigibleSpringConfiguration;
		import org.springframework.boot.SpringApplication;
		import org.springframework.boot.autoconfigure.SpringBootApplication;

		@SpringBootApplication
		public class CustomPlatformApplication extends DirigibleSpringConfiguration {

			public static void main(String[] args) {
				SpringApplication.run(CustomPlatformApplication.class, args);
			}

		}
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
