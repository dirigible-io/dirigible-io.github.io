---
title: Branding
---

Branding
===

This tutorial will guide you through the process of rebranding of Eclipse Dirigible Custom Stack.

!!! note "Prerequisites"

	This tutorial is assuming, that you've successfully completed the [Custom Stack](https://www.dirigible.io/samples/tutorials/customizations/custom-stack/) tutorial.

### Steps

1. Create Maven Modules:

	- Navigate to the root folder of the custom stack _(e.g. `<my-custom-stack-path>/custom-stack`)_.
	- Create `modules` folder and navigate to it.
	- Create `pom.xml`, `all/pom.xml` and `branding/pom.xml` files.

	=== "pom.xml"

	    1. Create new `modules/pom.xml` file.
		1. Paste the following content:

    	```xml
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    		<modelVersion>4.0.0</modelVersion>
    	
    		<parent>
    			<groupId>io.dirigible.custom.stack</groupId>
    			<artifactId>custom-stack-parent</artifactId>
    			<version>1.0.0-SNAPSHOT</version>
    			<relativePath>../pom.xml</relativePath>
    		</parent>

    		<name>Custom Stack - Modules - Parent</name>
    		<artifactId>custom-stack-modules-parent</artifactId>
    		<packaging>pom</packaging>

    		<modules>
    			<module>all</module>
    			<module>branding</module>
    		</modules>

    	</project>
    	```

    === "all/pom.xml"

	    1. Create new folder `all` and navigate to it.
		1. Create new `modules/all/pom.xml` file.
		1. Paste the following content:

		```xml
		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
			<modelVersion>4.0.0</modelVersion>

			<parent>
				<groupId>io.dirigible.custom.stack</groupId>
				<artifactId>custom-stack-modules-parent</artifactId>
				<version>1.0.0-SNAPSHOT</version>
				<relativePath>../pom.xml</relativePath>
			</parent>

			<name>Custom Stack - Modules - All</name>
			<artifactId>custom-stack-modules-all</artifactId>
			<packaging>jar</packaging>

			<dependencies>
				<dependency>
					<groupId>io.dirigible.custom.stack</groupId>
					<artifactId>custom-stack-modules-branding</artifactId>
					<version>1.0.0-SNAPSHOT</version>
				</dependency>
			</dependencies>

		</project>
		```

    === "branding/pom.xml"

	    1. Create new folder `branding` and navigate to it.
		1. Create new `modules/branding/pom.xml` file.
		1. Paste the following content:

		```xml
		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
			<modelVersion>4.0.0</modelVersion>

			<parent>
				<groupId>io.dirigible.custom.stack</groupId>
				<artifactId>custom-stack-modules-parent</artifactId>
				<version>1.0.0-SNAPSHOT</version>
				<relativePath>../pom.xml</relativePath>
			</parent>

			<name>Custom Stack - Modules - Branding</name>
			<artifactId>custom-stack-modules-branding</artifactId>
			<packaging>jar</packaging>

		</project>
		```

1. Create Branding resources:

	- Navigate to the `branding` folder.
	- Create `src/main/resources/META-INF/dirigible/ide-branding/` folder structure and navigate to it.
	- Create `branding.js` and `custom-stack.svg` files.

	=== "branding.js"

	    1. Create new `modules/branding/src/main/resources/META-INF/dirigible/ide-branding/branding.js` file.
		1. Paste the following content:

    	```javascript
		const brandingInfo = {
    	    name: 'Custom Stack',
    	    brand: 'Custom Stack',
    	    brandUrl: 'https://www.dirigible.io',
    	    icons: {
    	        faviconIco: '/services/v4/web/ide-branding/favicon.ico',
    	        favicon32: '/services/v4/web/ide-branding/favicon-32x32.png',
    	        favicon16: '/services/v4/web/ide-branding/favicon-16x16.png',
    	    },
    	    logo: '/services/v4/web/ide-branding/custom-stack.svg'
    	};
		```

		!!! warning "Favicons"

		    For the sake of simplicity, the favicon files were omitted.

	=== "custom-stack.svg"

	    1. Create new `modules/branding/src/main/resources/META-INF/dirigible/ide-branding/custom-stack.svg` file.
		1. Paste the following content:

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

1. Add Modules Dependency:

    - Navigate to the `releng` folder.
	- Open the `pom.xml` file.
	- Make the following changes:

    === "Add Modules Dependency"

        1. Navigate to the `<dependencies>` section.
    	1. Add the following dependency:

    	    ```xml
    		<!-- Custom Stack Modules -->
            <dependency>
                <groupId>io.dirigible.custom.stack</groupId>
                <artifactId>custom-stack-modules-all</artifactId>
                <version>1.0.0-SNAPSHOT</version>
            </dependency>
    		```

    === "Exclude Default Branding"

        1. Navigate to the `<dependencies>` section.
    	1. Edit the `dirigible-server-spring` dependency:

    	    ```xml hl_lines="6 11"
    		<!-- Dirigible -->
            <dependency>
                <groupId>org.eclipse.dirigible</groupId>
                <artifactId>dirigible-server-spring</artifactId>
                <version>${dirigible.version}</version>
                <exclusions>
                    <exclusion>
                        <groupId>org.eclipse.dirigible</groupId>
                        <artifactId>dirigible-ide-ui-branding</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
    		```

    === "Final pom.xml"

    	```xml
    	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/    maven-v4_0_0.xsd">
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

    	        <!-- Custom Stack Modules -->
    	        <dependency>
    	            <groupId>io.dirigible.custom.stack</groupId>
    	            <artifactId>custom-stack-modules-all</artifactId>
    	            <version>1.0.0-SNAPSHOT</version>
    	        </dependency>

    	        <!-- Dirigible -->
    	        <dependency>
    	            <groupId>org.eclipse.dirigible</groupId>
    	            <artifactId>dirigible-server-spring</artifactId>
    	            <version>${dirigible.version}</version>
    	            <exclusions>
    	                <exclusion>
    	                    <groupId>org.eclipse.dirigible</groupId>
    	                    <artifactId>dirigible-ide-ui-branding</artifactId>
    	                </exclusion>
    	            </exclusions>
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
