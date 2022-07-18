---
title: Custom Stack
hide:
  - toc
---

Custom Stack
===

This tutorial will guide you through the creation of a custom Dirigible stack for production. It also explains how to create a facade of a functionality written in Java and to expose it via API bridge to the application layer - JavaScript.
Such a custom stack contains only the core components of Dirigible plus the custom services, user interfaces and descriptor files of your Dirigible application.


### Prerequisites

* A Dirigible project containing the **data** artifacts pushed to a repository e.g. [https://github.com/dirigiblelabs/sample-v3-helium-data](https://github.com/dirigiblelabs/sample-v3-helium-data)
* A Dirigible project with the **backend services** e.g. [https://github.com/dirigiblelabs/sample-v3-helium-javascript](https://github.com/dirigiblelabs/sample-v3-helium-javascript)
* A Dirigible project for the **user interfaces** e.g. [https://github.com/dirigiblelabs/sample-v3-helium-html](https://github.com/dirigiblelabs/sample-v3-helium-html)

### Project Structure

* Create a packaging project - a standard Maven-based project with a parent dependency modules e.g. [https://github.com/dirigiblelabs/sample-v3-helium-custom-stack](https://github.com/dirigiblelabs/sample-v3-helium-custom-stack)

* Create three sub-folders under the root:

  * **modules** - for the parts which are developed with Dirigible itself
  
  * **core** - for the plain Java components and API bridges
  
  * **application** - for the packaging project

The project structure should look like the example below.

### Components

#### Dirigible's Module Structure

##### Parent Project

The project representing a Dirigible's project in the Maven-based parent project structure usually contains only a single file - the **pom.xml** itself.

The parent **pom.xml** should look like this:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>org.sonatype.oss</groupId>
		<artifactId>oss-parent</artifactId>
		<version>7</version>
	</parent>

	<name>Helium - Parent</name>
	<description>Helium Parent</description>
	<groupId>io.dirigible.helium</groupId>
	<artifactId>helium-parent</artifactId>
	<version>0.0.2-SNAPSHOT</version>
	<packaging>pom</packaging>

	<inceptionYear>2018</inceptionYear>

	<licenses>
		<license>
			<name>Eclipse Public License - v 1.0</name>
			<url>https://www.eclipse.org/legal/epl-v10.html</url>
			<distribution>repo</distribution>
		</license>
	</licenses>

	<url>http://www.dirigible.io</url>
	<organization>
		<name>Eclipse Foundation</name>
		<url>http://www.eclipse.org</url>
	</organization>
	<scm>
		<url>https://github.com/eclipse/dirigible</url>
	</scm>

	<modules>
		<module>core</module>
		<module>modules</module>
		<module>application</module>
	</modules>

	<properties>
		<dirigible.version>5.7.0</dirigible.version>
		<maven.resource.plugin.version>3.0.2</maven.resource.plugin.version>
		<maven.clean.plugin.version>3.0.0</maven.clean.plugin.version>
		<maven.compiler.plugin.version>2.3.2</maven.compiler.plugin.version>
		<maven.scm.plugin.version>1.9</maven.scm.plugin.version>
		<maven.compiler.source>11</maven.compiler.source>
    	        <maven.compiler.target>11</maven.compiler.target>
	</properties>
</project>
```

> The Java compiler version is set to 11 (or above) in our case

> The version of Eclipse Dirigible is set to 5.7.0 or above

##### Modules Project

The main goal is to *pull* the latest sources from the SCM repository (e.g. GitHub) and to put them under the standard *resources* folder - **src/main/resources**

A modules **pom.xml** should look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>io.dirigible.helium</groupId>
		<artifactId>helium-parent</artifactId>
		<version>0.0.2-SNAPSHOT</version>
		<relativePath>../pom.xml</relativePath>
	</parent>

	<name>Helium - Modules</name>
	<artifactId>helium-modules</artifactId>
	<version>0.0.2-SNAPSHOT</version>
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

[https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/blob/master/helium/modules/data/pom.xml](https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/blob/master/helium/modules/data/pom.xml)

The ***modules*** project of all the modules defines the *profile* **content** with the **maven-scm-plugin** Maven plugin. 

It can be triggered by choosing the **content** profile as:

> mvn clean install -Pcontent

After synchronizing all the content, you should run the regular build for actual packaging:

> mvn clean install

The other modules in these project next to the **data** module, contain the **backend services** in JavaScript and the **user interface** web content.

#### Java Standard Module with API Bridge

The Java code can be integrated nicely into the custom stack not only as a side-car 3-thd party component, but also as a custom functionality exposed to the Dirigible's layer via an API bridge.

You can have a look at the sub-project here [https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/tree/master/helium/core/java](https://github.com/dirigiblelabs/sample-v3-helium-custom-stack/tree/master/helium/core/java)

The Java side is a facade class which exposes a given functionality to the above layer:

```java
package io.dirigible.helium;

public class HeliumFacade {
	
	public static final boolean isInert() {
		return true;
	}

}
```

In our case it is over-simplified to just return a boolean flag and no input parameters present. In general, you can use more complex functions described here: [https://github.com/eclipse/dirigible/wiki/api-v4-guidelines](https://github.com/eclipse/dirigible/wiki/api-v4-guidelines)

At the JavaScript side you have an API module, which performs the actual call via the Java bridge:

```javascript
exports.isInert = function() {
	var output = Packages.io.dirigible.helium.HeliumFacade.isInert();
	return output;
};
```

In this way you can use de-facto arbitrary Java class and method from your favorite framework as JavaScript function in Dirigible's layer. The sample module shows how to use the API bridge afterwards:

```javascript
var helium = require("sample/helium");
var isInert = JSON.stringify(helium.isInert());
console.info(isInert);

var response = require("http/v4/response");
response.println("Is Helium an inert gas? - " + isInert);
response.flush();
response.close();
```

### Build and Package

Once we have all the artifacts in place, we can run the standard build and package command:

> mvn clean install

Then under the **application/target** folder we can find the *ROOT.war* file containing all the modules packaged properly in a standard Java Web Application archive.

### Deploy

Now we can use one of the deploy options in [Setup](https://www.dirigible.io/help/setup/) to setup our application.

### Test

Open a browser and go to:

> http://localhost:8080

or at the host you are using, if not the *local* one.

You should be able to see a table with some of the Helium properties as well as the link to the *test* service for the API bridge. 


