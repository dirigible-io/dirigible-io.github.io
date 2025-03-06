---
title: Custom Stack - Branding
---

Custom Stack - Branding
===

## Overview

This section will guide you through the process of rebranding a custom Eclipse Dirigible stack.

### Steps

#### Create Maven Module

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Create `branding` folder and navigate to it.
- Create `pom.xml` file.

=== "pom.xml"

	1. Create new `branding/pom.xml` file.
	1. Paste the following content:

	??? abstract "branding/pom.xml"


		```xml
		<?xml version="1.0" encoding="UTF-8"?>
		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
			<modelVersion>4.0.0</modelVersion>

			<parent>
				<groupId>com.custom.stack</groupId>
				<artifactId>custom-stack-parent</artifactId>
				<version>1.0.0-SNAPSHOT</version>
				<relativePath>../pom.xml</relativePath>
			</parent>

			<name>custom - stack - branding</name>
			<artifactId>custom-stack-branding</artifactId>
			<version>1.0.0-SNAPSHOT</version>
			<packaging>jar</packaging>

		</project>
		```

- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
- Open the `pom.xml` file.
- Navigate to the `<modules>` section.
- Add the following module:

=== "pom.xml"

	```xml hl_lines="3"
	<modules>
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
			<groupId>com.custom.stack</groupId>
			<artifactId>custom-stack-parent</artifactId>
			<version>1.0.0-SNAPSHOT</version>
			<packaging>pom</packaging>

			<inceptionYear>2025</inceptionYear>

			<url>http://your-custom-organization.com</url>
			<organization>
				<name>custom organization</name>
				<url>http://your-custom-organization.com</url>
			</organization>

			<scm>
				<url>https://github.com/dirigiblelabs/tutorial-custom-stack</url>
			</scm>

			<modules>
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

				<!-- Data Access -->
				<dependency>
					<groupId>com.h2database</groupId>
					<artifactId>h2</artifactId>
				</dependency>

			</dependencies>

			<dependencyManagement>
				<dependencies>
					<dependency>
						<groupId>com.custom.stack</groupId>
						<artifactId>custom-stack-branding</artifactId>
						<version>${project.version}</version>
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

				<profile.content.phase>none</profile.content.phase>
			</properties>
		</project>
		```

#### Set Branding Information

- Navigate to the `branding` folder.
- Create `src/main/resources/META-INF/dirigible/custom-branding/` folder structure and navigate to it.
- Create `favicon.ico` and `custom-stack.svg` files.

=== "favicon.ico"

	Create your own or as a temporary solution, [copy this](https://github.com/dirigiblelabs/sample-platform/blob/master/platform-samples/images/favicon.ico)

=== "custom-stack.svg"

	1. Create new `branding/src/main/resources/META-INF/dirigible/custom-branding/custom-stack.svg` file.
	1. Paste the following content:

	??? abstract "branding/src/main/resources/META-INF/dirigible/custom-branding/custom-stack.svg"

		```xml
		<?xml version="1.0" encoding="UTF-8"?>
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
		<path fill-rule="nonzero" fill="rgb(99.607843%, 80%, 1.568627%)" fill-opacity="1" d="M 16 29.683594 C 8.433594 29.683594 2.316406 23.566406 2.316406 16 C 2.316406 8.433594 8.433594 2.316406 16 2.316406 C 23.566406 2.316406 29.683594 8.433594 29.683594 16 C 29.683594 23.566406 23.566406 29.683594 16 29.683594 Z M 16 29.683594 "/>
		<path fill-rule="nonzero" fill="rgb(100%, 100%, 100%)" fill-opacity="1" d="M 2.5 11.5 L 29.5 11.5 C 30.609375 11.5 31.5 12.390625 31.5 13.5 L 31.5 18.5 C 31.5 19.609375 30.609375 20.5 29.5 20.5 L 2.5 20.5 C 1.390625 20.5 0.5 19.609375 0.5 18.5 L 0.5 13.5 C 0.5 12.390625 1.390625 11.5 2.5 11.5 Z M 2.5 11.5 "/>
		<path fill-rule="nonzero" fill="rgb(0%, 0%, 0%)" fill-opacity="1" d="M 5.539062 17.144531 C 5.539062 17.449219 5.464844 17.714844 5.316406 17.9375 C 5.167969 18.164062 4.949219 18.339844 4.667969 18.464844 C 4.386719 18.585938 4.046875 18.644531 3.644531 18.644531 C 3.464844 18.644531 3.289062 18.632812 3.117188 18.609375 C 2.949219 18.585938 2.785156 18.550781 2.628906 18.507812 C 2.472656 18.460938 2.328125 18.402344 2.1875 18.335938 L 2.1875 17.320312 C 2.433594 17.425781 2.683594 17.523438 2.945312 17.613281 C 3.207031 17.699219 3.46875 17.746094 3.730469 17.746094 C 3.90625 17.746094 4.050781 17.71875 4.15625 17.671875 C 4.265625 17.625 4.34375 17.558594 4.394531 17.476562 C 4.445312 17.394531 4.472656 17.300781 4.472656 17.195312 C 4.472656 17.066406 4.425781 16.957031 4.335938 16.863281 C 4.25 16.773438 4.132812 16.6875 3.984375 16.613281 C 3.832031 16.53125 3.664062 16.445312 3.46875 16.351562 C 3.351562 16.296875 3.222656 16.226562 3.082031 16.152344 C 2.941406 16.070312 2.808594 15.972656 2.675781 15.855469 C 2.554688 15.734375 2.449219 15.589844 2.367188 15.421875 C 2.285156 15.253906 2.246094 15.054688 2.246094 14.816406 C 2.246094 14.511719 2.316406 14.246094 2.453125 14.03125 C 2.597656 13.8125 2.800781 13.640625 3.058594 13.527344 C 3.324219 13.410156 3.632812 13.355469 3.988281 13.355469 C 4.257812 13.355469 4.511719 13.386719 4.753906 13.449219 C 5 13.511719 5.253906 13.597656 5.519531 13.714844 L 5.164062 14.566406 C 4.929688 14.46875 4.71875 14.394531 4.53125 14.339844 C 4.34375 14.289062 4.152344 14.261719 3.953125 14.261719 C 3.820312 14.261719 3.703125 14.285156 3.609375 14.328125 C 3.511719 14.371094 3.4375 14.429688 3.382812 14.507812 C 3.335938 14.585938 3.3125 14.675781 3.3125 14.78125 C 3.3125 14.902344 3.347656 15.003906 3.421875 15.089844 C 3.492188 15.171875 3.601562 15.253906 3.746094 15.328125 C 3.890625 15.40625 4.070312 15.496094 4.285156 15.601562 C 4.550781 15.726562 4.773438 15.859375 4.957031 15.992188 C 5.144531 16.128906 5.289062 16.285156 5.386719 16.46875 C 5.488281 16.652344 5.539062 16.875 5.539062 17.144531 Z M 9.628906 18.574219 L 9.253906 17.347656 L 7.378906 17.347656 L 7.003906 18.574219 L 5.828125 18.574219 L 7.644531 13.40625 L 8.976562 13.40625 L 10.800781 18.574219 Z M 8.617188 15.234375 C 8.59375 15.152344 8.5625 15.050781 8.523438 14.925781 C 8.484375 14.800781 8.449219 14.671875 8.410156 14.542969 C 8.371094 14.414062 8.339844 14.300781 8.316406 14.203125 C 8.292969 14.300781 8.257812 14.421875 8.214844 14.566406 C 8.175781 14.703125 8.136719 14.839844 8.097656 14.96875 C 8.066406 15.09375 8.039062 15.183594 8.019531 15.234375 L 7.652344 16.433594 L 8.992188 16.433594 Z M 13.628906 18.574219 L 12.386719 14.535156 L 12.359375 14.535156 C 12.363281 14.632812 12.371094 14.777344 12.382812 14.96875 C 12.390625 15.160156 12.398438 15.367188 12.410156 15.589844 C 12.417969 15.804688 12.425781 16.003906 12.425781 16.179688 L 12.425781 18.574219 L 11.449219 18.574219 L 11.449219 13.425781 L 12.9375 13.425781 L 14.15625 17.363281 L 14.175781 17.363281 L 15.464844 13.425781 L 16.953125 13.425781 L 16.953125 18.574219 L 15.933594 18.574219 L 15.933594 16.136719 C 15.933594 15.972656 15.9375 15.785156 15.941406 15.574219 C 15.953125 15.363281 15.960938 15.164062 15.964844 14.976562 C 15.972656 14.785156 15.980469 14.640625 15.984375 14.542969 L 15.957031 14.542969 L 14.628906 18.574219 Z M 19.894531 13.425781 C 20.554688 13.425781 21.039062 13.570312 21.34375 13.859375 C 21.648438 14.140625 21.804688 14.535156 21.804688 15.035156 C 21.804688 15.257812 21.769531 15.476562 21.703125 15.683594 C 21.636719 15.882812 21.523438 16.066406 21.363281 16.230469 C 21.210938 16.390625 21.003906 16.515625 20.75 16.605469 C 20.496094 16.695312 20.179688 16.742188 19.804688 16.742188 L 19.335938 16.742188 L 19.335938 18.574219 L 18.25 18.574219 L 18.25 13.425781 Z M 19.835938 14.320312 L 19.335938 14.320312 L 19.335938 15.847656 L 19.699219 15.847656 C 19.90625 15.847656 20.082031 15.820312 20.230469 15.769531 C 20.378906 15.714844 20.496094 15.632812 20.578125 15.515625 C 20.660156 15.402344 20.699219 15.253906 20.699219 15.070312 C 20.699219 14.816406 20.628906 14.628906 20.492188 14.507812 C 20.351562 14.382812 20.132812 14.320312 19.835938 14.320312 Z M 22.777344 18.574219 L 22.777344 13.425781 L 23.863281 13.425781 L 23.863281 17.671875 L 25.957031 17.671875 L 25.957031 18.574219 Z M 29.8125 18.574219 L 26.847656 18.574219 L 26.847656 13.425781 L 29.8125 13.425781 L 29.8125 14.320312 L 27.9375 14.320312 L 27.9375 15.453125 L 29.683594 15.453125 L 29.683594 16.347656 L 27.9375 16.347656 L 27.9375 17.671875 L 29.8125 17.671875 Z M 29.8125 18.574219 "/>
		<path fill-rule="nonzero" fill="rgb(0%, 0%, 0%)" fill-opacity="1" d="M 16 1.320312 C 9.628906 1.320312 4.21875 5.359375 2.183594 11.023438 C 0.953125 11.179688 0 12.230469 0 13.5 L 0 18.5 C 0 19.769531 0.953125 20.820312 2.183594 20.976562 C 4.21875 26.640625 9.628906 30.683594 16 30.683594 C 22.371094 30.683594 27.78125 26.640625 29.816406 20.976562 C 31.046875 20.820312 32 19.769531 32 18.5 L 32 13.5 C 32 12.230469 31.046875 11.179688 29.816406 11.023438 C 27.785156 5.359375 22.371094 1.320312 16 1.320312 Z M 16 2.320312 C 21.800781 2.320312 26.746094 5.914062 28.738281 11 L 3.261719 11 C 5.253906 5.914062 10.199219 2.320312 16 2.320312 Z M 2.5 12 L 29.5 12 C 30.339844 12 31 12.660156 31 13.5 L 31 18.5 C 31 19.339844 30.339844 20 29.5 20 L 2.5 20 C 1.660156 20 1 19.339844 1 18.5 L 1 13.5 C 1 12.660156 1.660156 12 2.5 12 Z M 3.261719 21 L 28.738281 21 C 26.746094 26.085938 21.800781 29.679688 16 29.679688 C 10.199219 29.679688 5.257812 26.085938 3.261719 21 Z M 3.261719 21 "/>
		</svg>
		```

#### Add Branding Dependency

- Navigate to the `application` folder.
- Open the `pom.xml` file.
- Make the following changes:

=== "Add Branding Dependency"

	1. Navigate to the `<dependencies>` section.
	1. Add the following dependency:

		```xml
		<dependency>
            <groupId>com.custom.stack</groupId>
            <artifactId>custom-stack-branding</artifactId>
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
				<groupId>com.custom.stack</groupId>
				<artifactId>custom-stack-parent</artifactId>
				<version>1.0.0-SNAPSHOT</version>
				<relativePath>../pom.xml</relativePath>
			</parent>

			<name>custom - stack - application</name>
			<artifactId>custom-stack-application</artifactId>
			<packaging>jar</packaging>


			<dependencies>
				<dependency>
					<groupId>com.custom.stack</groupId>
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
					<artifactId>dirigible-components-group-engines-core</artifactId>
					<type>pom</type>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-engine-template-mustache</artifactId>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-engine-cms</artifactId>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-engine-cms-internal</artifactId>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-engine-sftp</artifactId>
				</dependency>
				
				<!-- API -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-group-api-platform</artifactId>
					<type>pom</type>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-api-cms</artifactId>
				</dependency>
				
				<!-- Resources -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-group-resources-core</artifactId>
					<type>pom</type>
				</dependency>

				<!-- UI Editors -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-editor-monaco</artifactId>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-editor-monaco-extensions</artifactId>
				</dependency>

				<!-- UI Views -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-view-properties</artifactId>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-view-projects</artifactId>
				</dependency>

				<!-- UI Perspectives -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-perspective-workbench</artifactId>
				</dependency>
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-perspective-settings</artifactId>
				</dependency>

				<!-- UI Shell -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-components-ui-shell-ide</artifactId>
				</dependency>

				<!-- Tests -->
				<dependency>
					<groupId>org.eclipse.dirigible</groupId>
					<artifactId>dirigible-tests-framework</artifactId>
					<scope>test</scope>
				</dependency>

			</dependencies>

			<build>
				<plugins>
					<plugin>
						<groupId>org.codehaus.mojo</groupId>
						<artifactId>build-helper-maven-plugin</artifactId>
					</plugin>
					<plugin>
						<groupId>org.springframework.boot</groupId>
						<artifactId>spring-boot-maven-plugin</artifactId>
					</plugin>
				</plugins>
			</build>
		</project>
		```

#### Set the Branding Information

- Navigate to the `application/src/main/resources` folder.
- Create/open the `dirigible.properties` file.
- Set the environment variables:

	```
	DIRIGIBLE_BRANDING_NAME=Stack
	DIRIGIBLE_BRANDING_BRAND=Custom
	DIRIGIBLE_BRANDING_BRAND_URL=http://your-custom-organization.com
	DIRIGIBLE_BRANDING_FAVICON=/services/web/custom-branding/favicon.ico
	DIRIGIBLE_BRANDING_LOGO=/services/web/custom-branding/custom-stack.svg
	DIRIGIBLE_BRANDING_THEME=blimpkit-auto
	DIRIGIBLE_KEY_PREFIX=customStack
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

!!! info "Reset Theme"

	If the branding changes aren't visible, clear the browser cache and reset the theme by selecting **Theme &#8594; Reset** in the top right corner.

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - Branding Maven Module.
    - Eclipse Dirigible Stack wih custom branding running at [http://localhost:8080](http://localhost:8080/).

    Continue to the [Facade](../facade/) section to create Java facade and TypeScript API for the Custom Stack.

    _**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_
