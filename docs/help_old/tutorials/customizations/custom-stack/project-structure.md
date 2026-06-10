---
title: Custom Stack - Project Structure
---

Custom Stack - Project Structure
===

## Overview

This section shows how to create the project structure of the Custom Stack.
It contains the creation of several Maven `pom.xml` files, static content resources, `application.properties` configuration files and a `Spring Boot` Java class.

::: info Prerequisites

- JDK 21+ - OpenJDK versions can be found [here](https://adoptopenjdk.net/).
- Maven 3.5+ - Maven version 3.5.3 can be found [here](https://maven.apache.org/docs/3.5.3/release-notes.html).
:::
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
        &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
        
            &lt;parent&gt;
                &lt;groupId&gt;org.sonatype.oss&lt;/groupId&gt;
                &lt;artifactId&gt;oss-parent&lt;/artifactId&gt;
                &lt;version&gt;9&lt;/version&gt;
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
        
            &lt;properties&gt;
                &lt;project.title&gt;custom stack&lt;/project.title&gt;
        
                &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
                &lt;java.version&gt;17&lt;/java.version&gt;
        
                &lt;dirigible.version&gt;10.5.3&lt;/dirigible.version&gt;
        
                &lt;maven.compiler.source&gt;${java.version}&lt;/maven.compiler.source&gt;
                &lt;maven.compiler.target&gt;${java.version}&lt;/maven.compiler.target&gt;
        
                &lt;maven-spring-boot-plugin.version&gt;3.3.0&lt;/maven-spring-boot-plugin.version&gt;
                &lt;maven-compiler-plugin.version&gt;3.13.0&lt;/maven-compiler-plugin.version&gt;
                &lt;maven-surefire-plugin.version&gt;3.2.5&lt;/maven-surefire-plugin.version&gt;
                &lt;maven-failsafe-plugin.version&gt;3.2.5&lt;/maven-failsafe-plugin.version&gt;
                &lt;maven-git-commit-id-plugin.version&gt;4.9.10&lt;/maven-git-commit-id-plugin.version&gt;
        
                &lt;scmVersionType&gt;branch&lt;/scmVersionType&gt;
        
                &lt;profile.content.phase&gt;none&lt;/profile.content.phase&gt;
        
                &lt;skipTests&gt;false&lt;/skipTests&gt;
                &lt;skipITs&gt;true&lt;/skipITs&gt;
        
            &lt;/properties&gt;
        
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
                    &lt;artifactId&gt;springdoc-openapi-starter-webmvc-ui&lt;/artifactId&gt;
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
                &lt;/dependency&gt;
        
                <!-- Olingo -->
                &lt;dependency&gt;
                    &lt;groupId&gt;com.codbex.olingo&lt;/groupId&gt;
                    &lt;artifactId&gt;olingo-odata2-lib&lt;/artifactId&gt;
                    &lt;type&gt;pom&lt;/type&gt;
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
                    &lt;dependency&gt;
                        &lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
                        &lt;artifactId&gt;custom-stack-apis&lt;/artifactId&gt;
                        &lt;version&gt;${project.version}&lt;/version&gt;
                    &lt;/dependency&gt;
                    &lt;dependency&gt;
                        &lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
                        &lt;artifactId&gt;custom-stack-branding&lt;/artifactId&gt;
                        &lt;version&gt;${project.version}&lt;/version&gt;
                    &lt;/dependency&gt;
                &lt;/dependencies&gt;
            &lt;/dependencyManagement&gt;
        
            &lt;build&gt;
                &lt;plugins&gt;
                    &lt;plugin&gt;
                        &lt;groupId&gt;pl.project13.maven&lt;/groupId&gt;
                        &lt;artifactId&gt;git-commit-id-plugin&lt;/artifactId&gt;
                    &lt;/plugin&gt;
                    &lt;plugin&gt;
                        &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                        &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                    &lt;/plugin&gt;
                    &lt;plugin&gt;
                        &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                        &lt;artifactId&gt;maven-surefire-plugin&lt;/artifactId&gt;
                    &lt;/plugin&gt;
                    &lt;plugin&gt;
                        &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                        &lt;artifactId&gt;maven-failsafe-plugin&lt;/artifactId&gt;
                    &lt;/plugin&gt;
                &lt;/plugins&gt;
        
                &lt;pluginManagement&gt;
                    &lt;plugins&gt;
                        &lt;plugin&gt;
                            &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                            &lt;artifactId&gt;maven-surefire-plugin&lt;/artifactId&gt;
                            &lt;version&gt;${maven-surefire-plugin.version}&lt;/version&gt;
                            &lt;configuration&gt;
                                &lt;skipTests&gt;${skipTests}&lt;/skipTests&gt;
                            &lt;/configuration&gt;
                        &lt;/plugin&gt;
                        &lt;plugin&gt;
                            &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                            &lt;artifactId&gt;maven-failsafe-plugin&lt;/artifactId&gt;
                            &lt;version&gt;${maven-failsafe-plugin.version}&lt;/version&gt;
                            &lt;configuration&gt;
                                &lt;skipITs&gt;${skipITs}&lt;/skipITs&gt;
                                &lt;classesDirectory&gt;${project.build.outputDirectory}&lt;/classesDirectory&gt;
                            &lt;/configuration&gt;
                            &lt;executions&gt;
                                &lt;execution&gt;
                                    &lt;goals&gt;
                                        &lt;goal&gt;integration-test&lt;/goal&gt;
                                        &lt;goal&gt;verify&lt;/goal&gt;
                                    &lt;/goals&gt;
                                &lt;/execution&gt;
                            &lt;/executions&gt;
                        &lt;/plugin&gt;
                        &lt;plugin&gt;
                            &lt;groupId&gt;pl.project13.maven&lt;/groupId&gt;
                            &lt;artifactId&gt;git-commit-id-plugin&lt;/artifactId&gt;
                            &lt;version&gt;${maven-git-commit-id-plugin.version}&lt;/version&gt;
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
                        &lt;plugin&gt;
                            &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                            &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                            &lt;version&gt;${maven-compiler-plugin.version}&lt;/version&gt;
                            &lt;configuration&gt;
                                <source>${maven.compiler.source}</source>
                                &lt;target&gt;${maven.compiler.target}&lt;/target&gt;
                                &lt;debug&gt;true&lt;/debug&gt;
                                &lt;debuglevel&gt;lines,vars,source&lt;/debuglevel&gt;
                            &lt;/configuration&gt;
                        &lt;/plugin&gt;
                        &lt;plugin&gt;
                            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                            &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                            &lt;version&gt;${maven-spring-boot-plugin.version}&lt;/version&gt;
                            &lt;executions&gt;
                                &lt;execution&gt;
                                    &lt;goals&gt;
                                        &lt;goal&gt;repackage&lt;/goal&gt;
                                    &lt;/goals&gt;
                                &lt;/execution&gt;
                            &lt;/executions&gt;
                        &lt;/plugin&gt;
                    &lt;/plugins&gt;
                &lt;/pluginManagement&gt;
            &lt;/build&gt;
        
            &lt;profiles&gt;
                &lt;profile&gt;
                    &lt;id&gt;tests&lt;/id&gt;
                    &lt;properties&gt;
                        &lt;skipTests&gt;false&lt;/skipTests&gt;
                        &lt;skipITs&gt;false&lt;/skipITs&gt;
                    &lt;/properties&gt;
                &lt;/profile&gt;
                &lt;profile&gt;
                    &lt;id&gt;unit-tests&lt;/id&gt;
                    &lt;properties&gt;
                        &lt;skipTests&gt;false&lt;/skipTests&gt;
                        &lt;skipITs&gt;true&lt;/skipITs&gt;
                    &lt;/properties&gt;
                &lt;/profile&gt;
                &lt;profile&gt;
                    &lt;id&gt;integration-tests&lt;/id&gt;
                    &lt;properties&gt;
                        &lt;skipITs&gt;false&lt;/skipITs&gt;
                        &lt;skip.code.formatting&gt;true&lt;/skip.code.formatting&gt;
                    &lt;/properties&gt;
                    &lt;build&gt;
                        &lt;plugins&gt;
                            &lt;plugin&gt;
                                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                                &lt;artifactId&gt;maven-surefire-plugin&lt;/artifactId&gt;
                                &lt;configuration&gt;
                                    &lt;skipTests&gt;true&lt;/skipTests&gt;
                                &lt;/configuration&gt;
                            &lt;/plugin&gt;
                        &lt;/plugins&gt;
                    &lt;/build&gt;
                &lt;/profile&gt;
                &lt;profile&gt;
                    &lt;id&gt;quick-build&lt;/id&gt;
                    &lt;properties&gt;
                        &lt;skipTests&gt;true&lt;/skipTests&gt;
                        &lt;skipITs&gt;true&lt;/skipITs&gt;
                    &lt;/properties&gt;
                &lt;/profile&gt;
            &lt;/profiles&gt;
        
        &lt;/project&gt;
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
			```

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
                &lt;/dependency&gt;
                &lt;dependency&gt;
                    &lt;groupId&gt;io.dirigible.samples&lt;/groupId&gt;
                    &lt;artifactId&gt;custom-stack-branding&lt;/artifactId&gt;
                &lt;/dependency&gt;
                &lt;dependency&gt;
                    &lt;groupId&gt;uk.org.okapibarcode&lt;/groupId&gt;
                    &lt;artifactId&gt;okapibarcode&lt;/artifactId&gt;
                    &lt;version&gt;0.4.6&lt;/version&gt;
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
                &lt;/dependency&gt;
                &lt;dependency&gt;
                    &lt;groupId&gt;net.snowflake&lt;/groupId&gt;
                    &lt;artifactId&gt;snowflake-jdbc&lt;/artifactId&gt;
                &lt;/dependency&gt;
                &lt;dependency&gt;
                    &lt;groupId&gt;org.eclipse.dirigible&lt;/groupId&gt;
                    &lt;artifactId&gt;dirigible-tests-framework&lt;/artifactId&gt;
                &lt;/dependency&gt;
            &lt;/dependencies&gt;
        
            &lt;build&gt;
        
                &lt;resources&gt;
                    &lt;resource&gt;
                        &lt;directory&gt;src/main/resources&lt;/directory&gt;
                        &lt;filtering&gt;true&lt;/filtering&gt;
                    &lt;/resource&gt;
                &lt;/resources&gt;
        
                &lt;plugins&gt;
                    &lt;plugin&gt;
                        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                        &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                    &lt;/plugin&gt;
                &lt;/plugins&gt;
        
            &lt;/build&gt;
        
        &lt;/project&gt;
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
				&lt;theme&gt;&lt;/theme&gt;
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
					&lt;fd-list&gt;
						&lt;fd-list-item ng-repeat="job in jobs"&gt;
							<span fd-object-status status="&#123;&#123;job.status&#125;&#125;" glyph="&#123;&#123;job.statusIcon&#125;&#125;"
								text="&#123;&#123;job.name&#125;&#125;"></span>
						&lt;/fd-list-item&gt;
					&lt;/fd-list&gt;
					&lt;fd-busy-indicator style="margin-top: 3rem;" dg-size="l"&gt;&lt;/fd-busy-indicator&gt;
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
				&lt;theme&gt;&lt;/theme&gt;
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="height: 600px; width: 100%;">
					&lt;fd-message-page glyph="sap-icon--error"&gt;
						&lt;fd-message-page-title&gt;Unexpected Error Occurred&lt;/fd-message-page-title&gt;
						&lt;fd-message-page-subtitle&gt;
							**There was a problem serving the requested page**.
							<br>
							Usually this means that an enexpected error
							happened while processing your request. Here's what you can try next:
							<br>
							<br>
							***Reload the page**, the problem may be temporary. If the problem persists, **contact us**
								and we'll
								help get you on your way.*
						&lt;/fd-message-page-subtitle&gt;
						&lt;fd-message-page-actions&gt;
							<fd-button compact="true" dg-label="Reload Page" dg-type="emphasized" style="margin: 0 0.25rem;"
								ng-click="reloadPage()">
							&lt;/fd-button&gt;
							&lt;fd-button compact="true" dg-label="Contact Support" ng-click="contactSupport()"&gt;&lt;/fd-button&gt;
						&lt;/fd-message-page-actions&gt;
					&lt;/fd-message-page&gt;
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
				&lt;theme&gt;&lt;/theme&gt;
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="height: 600px; width: 100%;">
					&lt;fd-message-page glyph="sap-icon--alert"&gt;
						&lt;fd-message-page-title&gt;Access Denied&lt;/fd-message-page-title&gt;
						&lt;fd-message-page-subtitle&gt;
							**The page you're trying to access has resctricted access**.
							<br>
							Pleace contact your system administrator for more details.
						&lt;/fd-message-page-subtitle&gt;
					&lt;/fd-message-page&gt;
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
				&lt;theme&gt;&lt;/theme&gt;
				<script type="text/javascript" src="/services/js/resources-core/services/loader.js?id=application-view-js">
				</script>
				<link type="text/css" rel="stylesheet"
					href="/services/js/resources-core/services/loader.js?id=application-view-css" />
			</head>

			<body class="fd-scrollbar" dg-contextmenu="contextMenuContent">

				<div style="height: 600px; width: 100%;">
					&lt;fd-message-page glyph="sap-icon--documents"&gt;
						&lt;fd-message-page-title&gt;Page Not Found&lt;/fd-message-page-title&gt;
						&lt;fd-message-page-subtitle&gt;
							**It looks like you've reached a URL that doesn't exist**.
							<br>
							The page you are looking for is no longer here, or never existed in the first place.
							<br>
							<br>
							*You can go to the **previous page**, or start over from the **home page**.*
						&lt;/fd-message-page-subtitle&gt;
						&lt;fd-message-page-actions&gt;
							<fd-button compact="true" dg-label="Go Back" dg-type="emphasized" style="margin: 0 0.25rem;"
								ng-click="goBack()">
							&lt;/fd-button&gt;
							&lt;fd-button compact="true" dg-label="Take Me Home" ng-click="goHome()" ng-click="goHome()"&gt;
							&lt;/fd-button&gt;
						&lt;/fd-message-page-actions&gt;
					&lt;/fd-message-page&gt;
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

::: tip Section Completed

After completing the steps in this tutorial, you would have:

- Maven project structure.
- Spring Boot application.
- Eclipse Dirigible Stack running at [http://localhost:8080](http://localhost:8080/).

Continue to the [Branding](../branding/) section to customize the branding of the Custom Stack.

_**Note:** The complete content of the Custom Stack tutorial is available at: [https://github.com/dirigiblelabs/tutorial-custom-stack](https://github.com/dirigiblelabs/tutorial-custom-stack)_
:::
