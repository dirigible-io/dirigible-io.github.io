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
                <dirigible.version>6.3.24</dirigible.version>

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

			The tutorial is using Eclipse Dirigible version `6.3.24` as highlighted on line **65**. To check for a more recent and stable version go to [Eclipse Dirigible Releases](https://github.com/eclipse/dirigible/releases/).

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
		1. Create new `releng/pom.xml` file.
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

				<!-- Dirigible -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-server-spring</artifactId>
					<version>${dirigible.version}</version>
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

1. Create Eclipse Dirigible resources:

    - Navigate to the `releng` folder.
	- Create `src/main/resources/` folder structure and navigate to it.
	- Create `dirigible.properties`, `index.html` and `index-busy.html` files.

	=== "dirigible.properties"

		1. Create `releng/src/main/resources/dirigible.properties` file.
		1. Paste the following content:

		```
		DIRIGIBLE_PRODUCT_NAME=Custom Platform
		DIRIGIBLE_PRODUCT_VERSION=${project.version}
		DIRIGIBLE_PRODUCT_COMMIT_ID=${git.commit.id}
		DIRIGIBLE_PRODUCT_REPOSITORY=https://github.com/eclipse/dirigible
		DIRIGIBLE_PRODUCT_TYPE=custom
		DIRIGIBLE_INSTANCE_NAME=custom-platform-spring-boot
		DIRIGIBLE_DATABASE_PROVIDER=local
		DIRIGIBLE_JAVASCRIPT_HANDLER_CLASS_NAME=org.eclipse.dirigible.graalium.handler.GraaliumJavascriptHandler
		DIRIGIBLE_GRAALIUM_ENABLE_DEBUG=true
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
		1. Create `releng/src/main/resources/static/index-busy.html` file.
		1. Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="busyPage" ng-controller="BusyController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/v4/web/resources/images/favicon.ico" />
				<title>Loading ...</title>
				<theme></theme>
				<script type="text/javascript" src="/services/v4/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/v4/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="padding-left: 10rem; padding-right: 10rem; margin-top: 3rem;">
					<div class="fd-panel fd-panel--fixed">
						<div class="fd-panel__header">
							<h4 class="fd-panel__title">Preparing your Custom Platform environment</h4>
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
								url: '/services/v4/healthcheck'
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

    - Navigate to the `releng/src/main/resources` folder.
	- Create `public` folder and navigate to it.
	- Create `error.html`, `403.html` and `404.html` files.

    === "error.html"

	    - Create `releng/src/main/resources/public/error/error.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="errorPage" ng-controller="ErrorPageController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/v4/web/resources/images/favicon.ico" />
				<title>Custom Platform | Unexpected Error Occurred</title>
				<theme></theme>
				<script type="text/javascript" src="/services/v4/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/v4/js/resources-core/services/loader.js?id=application-view-css" />
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
		- Create `releng/src/main/resources/error/403.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="errorPage" ng-controller="ErrorPageController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/v4/web/resources/images/favicon.ico" />
				<title>Custom Platform | Access Denied</title>
				<theme></theme>
				<script type="text/javascript" src="/services/v4/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/v4/js/resources-core/services/loader.js?id=application-view-css" />
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
		- Create `releng/src/main/resources/error/404.html` file.
		- Paste the following content:

		```html
		<!DOCTYPE HTML>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="errorPage" ng-controller="ErrorPageController">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="icon" href="/services/v4/web/resources/images/favicon.ico" />
				<title>Custom Platform | Page Not Found</title>
				<theme></theme>
				<script type="text/javascript" src="/services/v4/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/v4/js/resources-core/services/loader.js?id=application-view-css" />
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

    - Navigate to the `releng` folder.
	- Create `application.yaml` and `CustomPlatformApplication.java` files.

    === "application.yaml"

		1. Navigate to the `src/main/resources/` folder.
		1. Create `releng/src/main/resources/application.yaml` file.
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
		1. Create `java/io/dirigible/custom/platform/` and navigate to it.
		1. Create `releng/src/main/java/io/dirigible/custom/platform/CustomPlatformApplication.java` file.
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

	- Go to [http://localhost:8080](http://localhost:8080/) to access the _Custom Stack_.
