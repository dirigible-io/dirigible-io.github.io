---
layout: post
title: "Developer - Remote debugging Dirigible source code"
category: blogs
tag: blogs
author: georgi.pavlov
brief: <h4><a href='blogs/2015/12/10/blogs_dirigible_remote_debugging.html'>Developer - Remote debugging Dirigible source code</a></h4> <sub class="post-info">December 10, 2015 by Georgi Pavlov</sub></br>While a significant part of the Dirigible development can be conveniently supported by in-Eclipse debugging using the generated 'dirigible-local' OSGi Framework launch configuration, there is also a couple of use cases that cannot be implemented using this approach...<br>
---

### Developer - Remote debugging Dirigible source code

<sub class="post-info">December 10, 2015 by Georgi Pavlov</sub>

While a significant part of the Dirigible development can be conveniently supported by in-Eclipse debugging using the generated 'dirigible-local' OSGi Framework launch configuration, there is also a couple of use cases that cannot be implemented using this approach.

More specifically, this is the case when Dirigible is deployed in a web container and you need to debug it remotely e.g. from Eclipse.
This very much affects both supportability but also partially development process too. 

Wrt **supportability**, being able to debug remotely is very important so that issues can be inspected directly in the defective deployments.

Wrt **development process**, it is the only valid way to debug components that rely on external components and their execution environment.
One such example is the configurable database access in the repository services. To set the scene in brief, suppose that one needs to integrate yet another database and debug end-to-end if it worked out (or why exactly it didn't work) in a real setup with Dirigible deployed in Tomcat with the DB drivers provisioned by Tomcat and exposed as a JNDI-bound DataSource in web.xml. Currently, you can't do this in OSGi-only environment.

You could think that setting up remote debugging is as trivial as with any other web application and mostly it is with a few caveats that can ruin your day.
The two important specific steps that i needed to perform before i had remote debugging working for me were:

#### 1.Build Dirigible with debug info

	
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>2.4</version>
			<configuration>
				<source>1.7</source>
				<target>1.7</target>
		        <debug>true</debug>
		        <debuglevel>lines,vars,source</debuglevel> 
			</configuration>
		</plugin>
		
#### 2.Clear the work directory in Tomcat (!) 


...because in my case I had previously deployed Dirigible. OSGi is using it for its bundles and it will interfere with fresh deployments

#### Summing up the steps:

1.Build Dirigible with debug info

2.Clear previous deployments if any and make sure the work directory is clear (very important!), and deploy

3.Start Tomcat in debug mode:

> catalina jpda start

4.In Eclipse, launch a Debug launch configuration with default settings.

 
Set breakpoints and debug happily.

It would be lovely to have some shortcut for the first two steps (and particularly the second) but I can't figure out anything more suitable than manual work for now. 

Enjoy!

