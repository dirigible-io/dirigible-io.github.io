---
layout: post
title: "Tutorial - How to re-brand Dirigible workbench"
category: blogs
tag: blogs
author: nedelcho.delchev
brief: <h4><a href='blogs/2015/10/28/blogs_dirigible_branding.html'>Tutorial - How to re-brand Dirigible workbench</a></h4> <sub class="post-info">October 28, 2015 by Nedelcho Delchev</sub></br> Being a cloud platform provider or development tools provider company, most probably you would like to have your own logo and a name...<br>
---

Tutorial - How to re-brand Dirigible workbench
===

<img class="img-responsive" src="/img/team/nedelcho.delchev.png" style="border-radius: 50%;">
<br>

<sub class="post-info">October 28, 2015 by Nedelcho Delchev</sub>

Being a cloud platform provider or development tools provider company, most probably you would like to have your own logo and a name following your products naming convention instead of Dirigible's ones. It is very easy following the [Eclipse RAP Branding](http://help.eclipse.org/mars/index.jsp?topic=%2Forg.eclipse.rap.doc%2Fguide%2Farticles%2Fbranding.html&cp=65_4_2) approach.


Create a plugin for your theme
----

You can use the existing plugin **org.eclipse.rap.design.example** as a template: 
[https://github.com/eclipse/rap/tree/master/examples/org.eclipse.rap.design.example](https://github.com/eclipse/rap/tree/master/examples/org.eclipse.rap.design.example).

---

Create an entry point
----

Let's assume that we just use the existing example plugin with the existing sample theme with id **org.eclipse.rap.design.example.business.branding** or **org.eclipse.rap.design.example.fancy.branding**. 

The new entrypoint declaration in the **plugin.xml** in the project **org.eclipse.dirigible.ide.ui.rap** should look like:

```xml

	...
	<extension
	       point="org.eclipse.rap.ui.entrypoint">
	    <entrypoint
	          brandingId="org.eclipse.rap.design.example.business.branding"
	          class="org.eclipse.dirigible.ide.ui.rap.entry.DirigibleWorkbench"
	          id="org.eclipse.dirigible.ide.ui.rap.entry.DefaultEntrypoint"
	          path="/business">
	    </entrypoint>
	</extension> 
	...

```

---

Add the branding plugin to parent's pom.xml
----

Do not forget to add the branding plugin as a module definition in the parent's pom.xml

---

Include the branding plugin as a feature
----

There is a feature for the ide plugins in the project **p2.ide.feature**
Add your branding plugin to the feature.xml accordingly

---

Include the branding plugin for packaging
----

You have to include branding plugin into the configuration files for Equinox OSGi:

* In the project **releng/dirigible-all-tomcat** > sub-folder **src/main/webapp/WEB-INF/configuration** > file **config.ini**

     be very careful with the white spaces in the beginning of the line

---

Below you can get an impression what is achievable.


Business Theme - /business
-----

<br>
<img src="/img/posts/branding_business.png" width="700px"/>
<br>

Fancy Theme - /fancy
-----

<br>
<img src="/img/posts/branding_fancy.png" width="700px"/>
<br>

Enjoy Branding!

