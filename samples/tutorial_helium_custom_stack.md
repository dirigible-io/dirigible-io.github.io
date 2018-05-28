---
layout: samples
title: Helium Custom Stack
icon: fa-caret-right
group: tutorial
---

{{ page.title }}
===

This tutorial will guide you on how to create a custom Dirigible stack for production.
Such a custom stack contains only the core components of Dirigible plus the custom services, user interfaces and descriptor files of your Dirigible application.
It shows also how to create a facade of a functionality written in Java and to expose it via API bridge to the application layer - JavaScript.

### Prerequisites

* A Dirigible project containing the **data** artifacts pushed to a repository e.g. [https://github.com/dirigiblelabs/sample-v3-helium-data](https://github.com/dirigiblelabs/sample-v3-helium-data)
* A Dirigible project with the **backend services** e.g. [https://github.com/dirigiblelabs/sample-v3-helium-javascript](https://github.com/dirigiblelabs/sample-v3-helium-javascript)
* A Dirigible project for the **user interfaces** e.g. [https://github.com/dirigiblelabs/sample-v3-helium-html](https://github.com/dirigiblelabs/sample-v3-helium-html)

### Project Structure

* Create a packaging project - a standard Maven based project with a parent a dependency modules e.g. [https://github.com/dirigiblelabs/sample-v3-helium-custom-stack](https://github.com/dirigiblelabs/sample-v3-helium-custom-stack)

* Create three sub-folders under the root:
  ** **modules** - for the parts which are developed with Dirigible itself
  ** **core** - for the plain Java components and API bridges
  ** **application** - for the packaging project

The project structure should look like the example above.

### Components

#### Dirigible's Module Structure

The project representing a Dirigible's project in the Maven based parent project structure usually contains only a single file - the **pom.xml** itself.
The main goal is to *pull* the latest sources from the SCM repository (e.g. GitHub) and to put them under the standard *resources* folder - **src/main/resources**

A sample *pom.xml* should look like this:

```xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>io.dirigible.helium</groupId>
		<artifactId>helium-modules</artifactId>
		<version>0.0.1-SNAPSHOT</version>
		<relativePath>../pom.xml</relativePath>
	</parent>

	<name>Helium - Data</name>
	<artifactId>helium-data</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<scm>
		<url>${content.scm.url}</url>
		<connection>${content.scm.connection}</connection>
		<developerConnection>${content.scm.developerConnection}</developerConnection>
	</scm>

	<properties>
		<maven.clean.plugin.version>3.0.0</maven.clean.plugin.version>

		<content.repository.name>sample-v3-helium-data</content.repository.name>
		<content.project.name>helium-data</content.project.name>

		<content.scm.url>https://github.com/dirigiblelabs/${content.repository.name}</content.scm.url>
		<content.scm.connection>scm:git:git://github.com/dirigiblelabs/${content.repository.name}.git</content.scm.connection>
		<content.scm.developerConnection>scm:git:https://github.com/dirigiblelabs/${content.repository.name}</content.scm.developerConnection>
	</properties>
</project>

```

[https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/blob/master/helium/modules/data/pom.xml](https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/blob/master/helium/modules/data/pom.xml)

The parent project of all the modules defines the *profile* **content** with the **maven-scm-plugin** Maven plugin. 

```xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>io.dirigible.helium</groupId>
		<artifactId>helium-parent</artifactId>
		<version>0.0.1-SNAPSHOT</version>
		<relativePath>../pom.xml</relativePath>
	</parent>

	<name>Helium - Modules</name>
	<artifactId>helium-modules</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>pom</packaging>

	<scm>
		<url>${content.scm.url}</url>
		<connection>${content.scm.connection}</connection>
		<developerConnection>${content.scm.developerConnection}</developerConnection>
	</scm>

	<modules>
		<module>data</module>
		<module>javascript</module>
		<module>html</module>
	</modules>

	<properties>
		<maven.clean.plugin.version>3.0.0</maven.clean.plugin.version>

		<content.repository.name>dirigiblelabs</content.repository.name>
		<content.project.name>dirigiblelabs</content.project.name>

		<content.scm.url>https://github.com/dirigiblelabs/${content.repository.name}</content.scm.url>
		<content.scm.connection>scm:git:git://github.com/dirigiblelabs/${content.repository.name}.git</content.scm.connection>
		<content.scm.developerConnection>scm:git:https://github.com/dirigiblelabs/${content.repository.name}</content.scm.developerConnection>

		<content.scm.server>github</content.scm.server>
		<content.scm.checkoutDirectory>target</content.scm.checkoutDirectory>
		<content.source.directory>target/${content.project.name}</content.source.directory>
		<content.output.directory>${basedir}/src/main/resources/${content.project.name}</content.output.directory>
	</properties>

    <profiles>
		<profile>
			<id>content</id>
			<activation>
				<activeByDefault>false</activeByDefault>
			</activation>
			<build>
				<finalName>${project.artifactId}</finalName>
				<plugins>
					<plugin>
						<groupId>org.apache.maven.plugins</groupId>
						<artifactId>maven-clean-plugin</artifactId>
						<version>${maven.clean.plugin.version}</version>
						<configuration>
							<filesets>
								<fileset>
									<directory>src/main/resources</directory>
								</fileset>
							</filesets>
						</configuration>
					</plugin>
					<plugin>
						<groupId>org.apache.maven.plugins</groupId>
						<artifactId>maven-scm-plugin</artifactId>
						<version>${maven.scm.plugin.version}</version>
						<configuration>
							<goals>checkout</goals>
							<checkoutDirectory>${content.scm.checkoutDirectory}</checkoutDirectory>
							<server>${content.scm.server}</server>
						</configuration>
						<executions>
							<execution>
								<id>generated-sources</id>
								<phase>generate-sources</phase>
								<goals>
									<goal>checkout</goal>
								</goals>
							</execution>
						</executions>
					</plugin>
					<plugin>
						<artifactId>maven-resources-plugin</artifactId>
						<version>${maven.resource.plugin.version}</version>
						<executions>
							<execution>
								<id>copy-content-resources</id>
								<phase>compile</phase>
								<goals>
									<goal>copy-resources</goal>
								</goals>
								<configuration>
									<outputDirectory>${content.output.directory}</outputDirectory>
									<resources>
										<resource>
											<directory>${content.source.directory}</directory>
											<filtering>true</filtering>
										</resource>
									</resources>
								</configuration>
							</execution>
						</executions>
					</plugin>
				</plugins>
			</build>
		</profile>
	</profiles>
</project>

```

It can be triggered by choosing the **content** profile as:

> mvn clean install -Pcontent

After synchronizing all the content you would like to run the regular build for actual packaging as:

> mvn clean install

The other modules in these project next to the **data** module, contains the **backend services** in JavaScript and the **user interface** web content.

#### Java Standard Module with API Bridge

The Java code can be integrated nicely into the custom stack not only as a side-car 3-thd party component, but also as a custom functionality exposed to the Dirigible's layer via an API bridge.

You can have a look at the sub-project here [https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/tree/master/helium/core/java](https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/tree/master/helium/core/java)

The Java side is a facade class which expose a given functionality to the above layer:

```java

package io.dirigible.helium;

public class HeliumFacade {
	
	public static final boolean isInert() {
		return true;
	}

}

```

In our case it is over-simplified to just return a boolean flag and no input parameters present. In general you can use more complex functions described here: [https://github.com/eclipse/dirigible/wiki/api-v3-guidelines](https://github.com/eclipse/dirigible/wiki/api-v3-guidelines)

At the JavaScript side you have an API module, which performs the actual call via the Java bridge:

```javascript

var java = require('core/v3/java');

exports.isInert = function() {
	var output = java.call('io.dirigible.helium.HeliumFacade', 'isInert', []);
	return output;
};

```

In this way you can use de-facto arbitrary Java class and method from your favorite framework as JavaScript function in Dirigible's layer. The sample module shows how to use the API bridge afterwards:

```javascript

var helium = require("sample/helium");
var isInert = helium.isInert();
console.info(isInert);

var response = require("http/v3/response");
response.println("Is Helium an inert gas? - " + isInert);
response.flush();
response.close();

```

### Build and Package

Once we have all the artifacts in place, we can run the standard build and package command:

> mvn clean install

Then under the **application/target** folder we can find the *ROOT.war* file containing all the modules packaged properly in a standard Java Web Application archive.

### Deploy

Now we can use one of the deploy options to setup our application [here](../help/setup.html).

### Test

Open a browser and go to:

> http://localhost:8080

or at the host you are using, if not the *local* one.

You should be able to see a table with some of the Helium properties as well as the link to the *test* service for the API bridge. 


