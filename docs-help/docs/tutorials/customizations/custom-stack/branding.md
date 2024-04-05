---
title: Custom Stack - Branding
---

Custom Stack - Branding
===

## Overview

This section will guide you through the process of rebranding of Eclipse Dirigible Custom Stack.

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
				<groupId>io.dirigible.samples</groupId>
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

#### Create Branding Resources

- Navigate to the `branding` folder.
- Create `src/main/resources/META-INF/dirigible/ide-branding/` folder structure and navigate to it.
- Create `branding.js` and `custom-stack.svg` files.

=== "branding.js"

	1. Create new `branding/src/main/resources/META-INF/dirigible/ide-branding/branding.js` file.
	1. Paste the following content:

	??? abstract "branding/src/main/resources/META-INF/dirigible/ide-branding/branding.js"

		```javascript
		const brandingInfo = {
			name: 'Custom Stack',
			brand: 'Custom Stack',
			brandUrl: 'https://github.com/dirigiblelabs/tutorial-custom-stack',
			icons: {
				faviconIco: '/services/web/ide-branding/favicon.ico',
				favicon32: '/services/web/ide-branding/favicon-32x32.png',
				favicon16: '/services/web/ide-branding/favicon-16x16.png',
			},
			logo: '/services/web/ide-branding/custom-stack.svg'
		};
		```

	!!! warning "Favicons"

		For the sake of simplicity, the favicon files were omitted.

=== "custom-stack.svg"

	1. Create new `branding/src/main/resources/META-INF/dirigible/ide-branding/custom-stack.svg` file.
	1. Paste the following content:

	??? abstract "branding/src/main/resources/META-INF/dirigible/ide-branding/custom-stack.svg"

		```xml
		<?xml version="1.0" encoding="UTF-8" standalone="no"?>
		<svg style="filter: invert(100%);"
			width="24"
			height="24"
			viewBox="0 0 6.3499999 6.3500002"
			version="1.1"
			id="svg5"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:svg="http://www.w3.org/2000/svg">
			<defs
				id="defs2" />
			<g
				id="layer1"
				transform="matrix(1.0590909,0,0,1.0590909,-0.18761367,-0.18761367)">
			<path
				id="path1074"
				style="fill-opacity:1;stroke:none;stroke-width:2.8;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
				d="M 12,1 A 11,11 0 0 0 1,12 11,11 0 0 0 12,23 11,11 0 0 0 23,12 11,11 0 0 0 12,1 Z m -0.101562,4.3378906 c 0.955078,0 1.796875,0.15625 2.523437,0.4667969 0.732422,0.3046875 1.294922,0.7558594 1.6875,1.3535156 0.392578,0.5976562 0.603516,1.2734376 0.632813,2.0292969 L 15.107422,9.3105469 C 15.019531,8.4960938 14.720703,7.8808594 14.210938,7.4648438 13.707031,7.0488281 12.958984,6.8417969 11.96875,6.8417969 c -1.03125,0 -1.783203,0.1894531 -2.2578125,0.5703125 -0.46875,0.375 -0.703125,0.8300781 -0.703125,1.3632812 0,0.4628906 0.1660156,0.84375 0.5,1.1425782 0.328125,0.2988282 1.1835935,0.6054692 2.5664065,0.9218752 1.388672,0.310547 2.341797,0.583984 2.857422,0.818359 0.75,0.345703 1.302734,0.785156 1.660156,1.318359 0.357422,0.527344 0.537109,1.136719 0.537109,1.828126 0,0.685546 -0.197265,1.332031 -0.589844,1.941406 -0.392578,0.603515 -0.957031,1.074219 -1.695312,1.414062 -0.732422,0.333985 -1.558594,0.501953 -2.478516,0.501953 -1.166015,0 -2.144531,-0.169922 -2.9355465,-0.509765 C 8.6445313,17.8125 8.0253906,17.302734 7.5742188,16.623047 7.1289063,15.9375 6.8945312,15.164062 6.8710938,14.302734 l 1.609375,-0.140625 c 0.076172,0.644532 0.2519531,1.173829 0.5273437,1.589844 0.28125,0.410156 0.7148438,0.744141 1.3007815,1.001953 0.585937,0.251953 1.24414,0.378906 1.976562,0.378906 0.650391,0 1.22461,-0.09766 1.722656,-0.291015 0.498047,-0.193359 0.867188,-0.457031 1.107422,-0.791016 0.246094,-0.339843 0.369141,-0.707031 0.369141,-1.105469 0,-0.404296 -0.117188,-0.755859 -0.351563,-1.054687 C 14.898438,13.585938 14.511719,13.330078 13.972656,13.125 13.626953,12.990234 12.863281,12.783203 11.679688,12.501953 10.496094,12.214844 9.6660156,11.945312 9.1914062,11.693359 8.5761719,11.371094 8.1171875,10.972656 7.8125,10.498047 7.5136719,10.017578 7.3632812,9.4804687 7.3632812,8.8886719 c 10e-8,-0.6503906 0.1855469,-1.2558594 0.5546876,-1.8183594 0.3691406,-0.5683593 0.9082031,-1 1.6171874,-1.2929687 C 10.244141,5.484375 11.03125,5.3378906 11.898438,5.3378906 Z"
				transform="scale(0.26458334)" />
			</g>
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
            <groupId>io.dirigible.samples</groupId>
            <artifactId>custom-stack-branding</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>
		```

=== "Exclude Default Branding"

	1. Navigate to the `<dependencies>` section.
	1. Edit the `dirigible-components-group-ide` dependency:

		```xml hl_lines="6 11"
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

!!! info "Reset Theme"

	If the branding changes aren't visible, clear the browser cache and reset the theme by selecting **Theme &#8594; Reset** in the top right corner.

## Next Steps

!!! success "Section Completed"

    After completing the steps in this tutorial, you would have:

    - Branding Maven Module.
    - Eclipse Dirigible Stack wih custom branding running at [http://localhost:8080](http://localhost:8080/).

    Continue to the [Facade](../facade/) section to create Java facade and TypeScript API for the Custom Stack.

    _**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_
