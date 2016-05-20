---
layout: post
title: "Tutorial - How to implement a plugin for SQL language support"
category: blogs
tag: blogs
author: nedelcho.delchev
brief: <h4><a href='blogs/2015/10/21/blogs_dirigible_impl_sql_plugin.html'>Tutorial - How to implement a plugin for SQL language support</a></h4> <sub class="post-info">October 21, 2015 by Nedelcho Delchev</sub></br> What does vertical scenario mean? Why building applications covering such scenarios need special tools and why all these relates to Dirigible?...<br>
---

Tutorial - How to implement a plugin for SQL language support
===

<br>
<img class="img-responsive" src="/img/team/nedelcho.delchev.png" style="border-radius: 50%;">
<br>

<sub class="post-info">October 21, 2015 by Nedelcho Delchev</sub>

How to implement a custom plugin for Dirigible, which brings custom execution engine for a custom development language?
Hmmm ... why at all you would need this?

In general you do not. You can rely on the standard JavaScript, supported by default as a primary language for services in Dirigible. If you prefer Java you are still in the supported default options. But, what if you want to use your preferred language like Ruby, Groovy, Pyton, Scala and many other JVM and non-JVM modern languages? The good news - it's not so difficult. In this tutorial we will give you the major steps and directions, which can guide you throughout such integrations.

Let's take something simple e.g. SQL script. The engine, which executes this language is the underlying RDBMS itself, but from Dirigible's point of view the database is abstracted via JDBC interface. So, let's create a new feature - 'SQL Services' support. It will provide the following:

1. Editor for SQL script with highlighting of the keywords
2. Icon in Workspace and Repository views showing that *.sql files are recognized
3. Activator/Publisher, which will take care of the transfer of the SQL artifacts to Sandbox/Registry
4. Runtime dispatcher, which will provide the endpoint for access for these services
5. Runtime executor, which will take the artifact and will do the processing
6. Infrastructure - pom.xml, config.ini, feature.xml
7. User interface for endpoints in Registry
8. Sample template for SQL Service

*If you are Eclipse RCP/RAP and OSGi developer, you can skip this blog and go directly by cloning the sources and looking for the Java and JavaScript plugins as example.*

Let's start...

---


Editor for SQL
----

Luckily we support two web editors in Dirigible - Orion and ACE. The later has good support for SQL Language, hence we can use it directly.
Be sure that you enable the support of your language in the corresponding editor by adding the file extension to the editor's 'extensions' parameter in the plugin.xml. In this case in plugin **org.eclipse.dirigible.ide.editor.ace**, extension point **org.eclipse.ui.editors**, class **org.eclipse.dirigible.ide.editor.ace.AceEditor**.

<br>
<img src="/img/posts/ace_sql.png"/>
<br>

---

Icon for *.sql files
----

Add an icon in the **resources** folder of the **org.eclipse.dirigible.ide.repository.ui** plugin, e.g. **icon-sql.png**.
Add a reference of the icon and the necessary file extension in **org.eclipse.dirigible.ide.repository.ui.viewer.AbstractArtifactLabelProvider** similar like the other cases.

<br>
<img src="/img/posts/icon_sql.png"/>
<br>


---

Publisher adaptation
----

There are a few adaptation that can enable *.sql artifact to be considered as supported scripting services.
To do that:

1. Add the corresponding constant for SQL extension in **ARTIFACT_EXTENSION** in the class **org.eclipse.dirigible.repository.api.ICommonConstants** e.g. <code>public static final String SQL = ".sql";</code>
2. Add **SQL_CONTAINER_MAPPING** and **SQL_SANDBOX_MAPPING** in class **org.eclipse.dirigible.ide.common.CommonParameters** in similar way like the others.
3. Add the corresponding artifact extension and mappings in the static list and maps in class **org.eclipse.dirigible.ide.scripts.publish.ScriptsPublisher** in similar way like the others.

---

We are done at the IDE side! Now we go to the Runtime to implement the execution engine.

---

Engine for SQL
----

Create a new plugin which will contain all the execution engine related artifacts for the SQL support. As a template you can use already available for Java **org.eclipse.dirigible.runtime.java** - e.g. **org.eclipse.dirigible.runtime.sql**

Add corresponding **ENGINE_TYPE** <code>public static final String SQL = "sql";</code> in **org.eclipse.dirigible.repository.api.ICommonConstants**

Do the same for **ENGINE_ALIAS**

Modify/check:

1. **.project** file
2. **MANIFEST.MF** file names, dependencies, exported packages
3. In **OSGi-INF** folder create a sql-executor.xml with corresponding references
4. **plugin.xml** fill the corresponding servlets and filters
5. **pom.xml**
6. Add the module definition in the parent's pom.xml, e.g. <code>< module>org.eclipse.dirigible.runtime.sql< /module></code>

In the source folder (*src*), you should finally have at least:

1. **org.eclipse.dirigible.runtime.filter.SQLRegistrySecureFilter.java**


```java
	package org.eclipse.dirigible.runtime.filter;
	
	public class SQLRegistrySecureFilter extends AbstractRegistrySecureFilter {
	
		private static final String SQL_SECURED_MAPPING = "/services/sql-secured"; //$NON-NLS-1$
	
		@Override
		protected String getSecuredMapping() {
			return SQL_SECURED_MAPPING;
		}
	}
```

2. **org.eclipse.dirigible.runtime.registry.SQLRegistryServlet.java**


```java

	package org.eclipse.dirigible.runtime.registry;
	
	public class SQLRegistryServlet extends AbstractRegistryServiceServlet {
	
		private static final long serialVersionUID = -7292896045277229573L;
	
		@Override
		protected String getServletMapping() {
			return "/sql/";
		}
	
		@Override
		protected String getFileExtension() {
			return ".sql";
		}
	
		@Override
		protected String getRequestProcessingFailedMessage() {
			return Messages.getString("JavascriptRegistryServlet.REQUEST_PROCESSING_FAILED_S");
		}
	}
```


3. **org.eclipse.dirigible.runtime.sql.SQLExecutor.java**

```java

	package org.eclipse.dirigible.runtime.sql;
	
	import java.io.IOException;
	import java.sql.Connection;
	import java.sql.PreparedStatement;
	import java.sql.ResultSet;
	import java.sql.ResultSetMetaData;
	import java.util.ArrayList;
	import java.util.HashMap;
	import java.util.List;
	import java.util.Map;
	
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import javax.sql.DataSource;
	
	import org.eclipse.dirigible.repository.api.ICommonConstants;
	import org.eclipse.dirigible.repository.api.IRepository;
	import org.eclipse.dirigible.repository.logging.Logger;
	import org.eclipse.dirigible.runtime.repository.RepositoryFacade;
	import org.eclipse.dirigible.runtime.scripting.AbstractScriptExecutor;
	
	import com.google.gson.Gson;
	import com.google.gson.JsonArray;
	import com.google.gson.JsonObject;
	import com.google.gson.JsonPrimitive;
	
	public class SQLExecutor extends AbstractScriptExecutor {
	
		private static final String SQL_MODULE_NAME_CANNOT_BE_NULL = "SQL module name cannot be null.";
	
		private static final Logger logger = Logger.getLogger(SQLExecutor.class);
	
		private IRepository repository;
		private String[] rootPaths;
		private Map<String, Object> defaultVariables;
	
		private String classpath;
	
		public SQLExecutor(IRepository repository, String... rootPaths) {
			this.repository = repository;
			this.rootPaths = rootPaths;
			this.defaultVariables = new HashMap<String, Object>();
			this.classpath = classpath;
		}
	
		@Override
		public Object executeServiceModule(HttpServletRequest request, HttpServletResponse response, Object input, String module,
				Map<Object, Object> executionContext) throws IOException {
	
			String result = null;
			try {
				logger.debug("entering: executeServiceModule()"); //$NON-NLS-1$
				logger.debug("module=" + module); //$NON-NLS-1$
	
				if (module == null) {
					throw new IOException(SQL_MODULE_NAME_CANNOT_BE_NULL);
				}
	
				String sqlSource = new String(retrieveModule(repository, module, "", rootPaths).getContent());
	
				DataSource dataSource = RepositoryFacade.getInstance().getDataSource();
				Connection connection = null;
				try {
					connection = dataSource.getConnection();
					PreparedStatement pstmt = connection.prepareStatement(sqlSource);
					ResultSet rs = pstmt.executeQuery();
	
					// get column names
					ResultSetMetaData rsmd = rs.getMetaData();
					int columnCnt = rsmd.getColumnCount();
					List<String> columnNames = new ArrayList<String>();
					for (int i = 1; i <= columnCnt; i++) {
						columnNames.add(rsmd.getColumnName(i).toUpperCase());
					}
	
					JsonArray array = new JsonArray();
					while (rs.next()) {
						JsonObject obj = new JsonObject();
						for (int i = 1; i <= columnCnt; i++) {
							String key = columnNames.get(i - 1);
							String value = rs.getString(i);
							obj.add(key, new JsonPrimitive(value != null ? value : ""));
						}
						array.add(obj);
					}
	
					result = new Gson().toJson(array);
	
					rs.close();
					pstmt.close();
				} finally {
					if (connection != null) {
						connection.close();
					}
				}
	
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				throw new IOException(e);
			}
	
			return result;
		}
	
		@Override
		protected void registerDefaultVariable(Object scope, String name, Object value) {
			defaultVariables.put(name, value);
		}
	
		@Override
		protected String getModuleType(String path) {
			return ICommonConstants.ARTIFACT_TYPE.SCRIPTING_SERVICES;
		}
	}
```

4. **org.eclipse.dirigible.runtime.sql.SQLServlet.java**
5. **org.eclipse.dirigible.runtime.sql.SQLSandboxServlet.java**
6. **org.eclipse.dirigible.runtime.sql.SQLSecuredServlet.java**
7. **org.eclipse.dirigible.runtime.sql.SQLScriptExecutorProvider.java**

---

Include the Plugin as a Feature
----

There is a feature for the runtime plugins in the project **p2.runtime.feature**
Add the SQL plugin to the feature.xml accordingly

---

Include the Plugin for Packaging
----

You have to include just created plugin into the configuration files for Equinox OSGi:

1. In the project **releng/dirigible-all-tomcat** > sub-folder **src/main/webapp/WEB-INF/configuration** > file **config.ini**
2. In the project **releng/dirigible-runtime-tomcat** > sub-folder **src/main/webapp/WEB-INF/configuration** > file **config.ini**

     be very careful with the white spaces in the beginning of the line

---

Security Constrains in web.xml
----

1. In the project **releng/dirigible-all-tomcat** > sub-folder **src/web/** > all files **web.xml** excluding **trial**
2. In the project **releng/dirigible-runtime-tomcat** > sub-folder **src/web/** > all files **web.xml** excluding **trial**

---

Flows and Jobs Integration
----

Luckily we have already implemented the extensibility in a way that **SQLScriptExecutorProvider** from above is automatically registered and can be used in Flows.

---

Registry Section for SQL Services
----

The plugin containing the registry user interface is **org.eclipse.dirigible.runtime.ui**

1. Create a file **sql.html** in the sub-folder **resources/ui/templates/scripting/sql**

```html

	<div id="content" ng-include="'templates/default.html'"></div>
	
```

2. Adapt **$routeProvider** in the **app.js** file by adding routing for **sql** pages
3. In the same file add a corresponding section in **$scope.homeData**
4. Add the controller itself in **default.js**
		defaultControllers.controller('SQLCtrl', function($scope, $resource) {
			$scope.restService = $resource('../scripting/sql');
		});
5. Do not forget to add some image file also
6. Add a manu item in the main menu - **menu.json**

---

Template for SQL Scripting Service
----

To complete the SQL support we can add at least one template to be available in the **New->ScriptinService** wizard.
To do that, in the plugin **org.eclipse.dirigible.ide.template.ui.js**

1. Create file **sql-service.sql** under the folder **src/org/eclipse/dirigible/ide/template/ui/js/templates**

```sql

	SELECT * FROM DGB_FILES

```
		
2. Add the definition in the **plugin.xml** accordingly

```xml

	<template
        category="ScriptingServices"
        image="/icons/sql-service.png"
        location="/org/eclipse/dirigible/ide/template/ui/js/templates/sql-service.sql"
        text="SQL Sample Query Service">
  	</template>

```

3. Do not forget the icon as well
4. Add the default extension file recognition in **org.eclipse.dirigible.ide.template.ui.js.wizard.JavascriptServiceTemplateTargetLocationPage**

```java

	...
	} else if ("/org/eclipse/dirigible/ide/template/ui/js/templates/sql-service.sql" //$NON-NLS-1$
			.equals(model.getTemplate().getLocation())) {
		jsOrLibExt = "sql"; //$NON-NLS-1$
	}
	...

```
		
<br>
<img src="/img/posts/sql_template.png"/>
<br>

Congratulations!
===

If you managed to follow all this - you are a hero!

The git commit for reference is [here](https://github.com/eclipse/dirigible/commit/30a85e9c4420ab71176ba1cb0ab5e1047442f0e3)
  
