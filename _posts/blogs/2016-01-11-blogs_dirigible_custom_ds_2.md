---
layout: post
title: "BYODS (Bring Your Own Data Source) in Dirigible - Part II: Extending supported databases for custom data sources"
category: blogs
tag: blogs
author: georgi.pavlov
brief: <h4><a href='blogs/2016/01/11/blogs_dirigible_custom_ds_2.html'>BYODS (Bring Your Own Data Source) in Dirigible - Part II":" Extending supported databases for custom data sources</a></h4> <sub class="post-info">January 11, 2016 by Georgi Pavlov</sub></br> Dirigible supports multiple database products by means of dialect adapters that can be used to extend the support to new ones...<br>
---

## BYODS (Bring Your Own Data Source) in Dirigible

<sub class="post-info">January 11, 2016 by Georgi Pavlov</sub>

In the previous [Part I](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html) of our series, dedicated to the new multiple custom data sources feature, we introduced you to the routines required to setup a new custom data source representing one of the database brands that Dirigible supports out-of-the-box, and use it. In this Part II of the series we are going to explore what it takes to onboard a new, not yet supported database and make use of data sources configured for it, as discussed in [Part I](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html).

One of the setup steps requires a minimal development and integration effort and in this Part II, we explore in details this particular task that is necessary to accomplish the integration of a new data source kind in Dirigible. It is a one-time job per database product that can then be reused for any concrete instance.


### Part II: Extending supported databases for custom data sources

The relational database world enjoy the standard query language SQL for ages. However, database systems are often not entirely compliant with the standard. For example, it happens that they implement subset or extensions of it and ultimately end up with *variants* of SQL. We call these variants database (SQL) *dialects*. An optimal and correct use of a database requires to take this into account. This is why Dirigible and alike tools need to ‘know’ dialects to be able to truly support the corresponding database. And since the list of databases and applicable dialects out there is quite big, and it grows, it is reasonable to support some sensible, popular minimum of these and provide a mechanism to extend the support.
 
The databases that are currently supported in Dirigible (in version 2.2 M3) are MySQL, PostgreSQL, Derby, SAPDB, SAP HANA DB, Sybase and MongoDB. Dirigible speaks their dialects already and you can create custom data sources configured for running instances of these databases as discussed in [Part I](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html). Let us now explore what is how to extend this list to support also [H2](http://www.h2database.com/) database and be able to create custom data sources for it too.

#### Hitting the wall
Let us first try to employ the routine from [Part I](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html) with H2 and see what happens.

###### Step 1: Provision the drivers
Supply a copy of the [database JDBC drivers](http://www.h2database.com/html/download.html) in Tomcat’s lib directory. H2 JDBC drivers are bundled together with the DB code so this means the database jar needs to be put there.

###### Step 2: Bind to JNDI
Edit Tomcat’s conf/context.xml to add a resource:

	<Resource name="jdbc/H2" auth="Container" type="javax.sql.DataSource"
				username="sa" password="" driverClassName="org.h2.Driver"
				url="jdbc:h2:mem: "/>

###### Step 3: Configure application reference
Add the following init parameter to the bridge servlet in the web.xml

	<init-param>
		<param-name>jndiCustomDataSource-h2</param-name>
		<param-value>java:comp/env/jdbc/H2</param-value>
	</init-param>

###### Step 4: Register the data source
<br>
	<img src="/img/posts/20160111-0/2-0.png"/>
<br>
 
#### Verify results
Let’s go now and check our H2 database in the Database perspective in Dirigible’s IDE. Ooops:

<br>
	<img src="/img/posts/20160111-0/2-1.png"/>
<br>

What happened? Yep! Dirigible clearly doesn’t speak H2 dialect. Let’s see what we can do to teach it.

#### A new dialect onboard
We need to accomplish the following steps in order to achieve our goal:

- Provide a class implementing the [IDialectSpecifier](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/db/dialect/IDialectSpecifier.java) interface
- Include the class in an [OSGi](https://www.osgi.org/) bundle
- Declare an OSGi [Service](http://wiki.osgi.org/wiki/Declarative_Services) in XML descriptor with the new class and the [IDialectSpecifier](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/db/dialect/IDialectSpecifier.java) interface
- Register the XML descriptor in its container bundle MANIFEST.MF

Except for the first task that is purely development and requires mostly domain knowledge for Dirigible APIs and H2 database, the rest of the tasks are a standard wiring mechanism and component model in OSGi.

Let’s focus on each part now.

#### Implementation
Technologies such as Dirigible delegate to concrete dialects the handling of database-specific statements and the interface [IDialectSpecifier](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/db/dialect/IDialectSpecifier.java) defines this contract. In addition, the interface also specifies some more generic characteristics of a database product kind, such as if it is a schemaless database or not (Yes, we look at you NoSQL! But more on that in a future blog). 

To make things easier and reduce redundant code to the minimum, Dirigible provides an out-of-the-box, convenience, common implementation for relational databases called [RDBGenericDialectSpecifier](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/db/dialect/RDBGenericDialectSpecifier.java).

An absolutely minimal implementation of a dialect is the following

	public class H2DBSpecifier extends RDBGenericDialectSpecifier {
	
		private static final String PRODUCT_NAME = "H2";
		
		@Override
		public boolean isDialectForName(String productName) {
			return PRODUCT_NAME.equalsIgnoreCase(productName);
		}

	}

It doesn’t do much but is just enough to get us going. We will leave it as it is for now and proceed with some plumbing. Later, we shall come back to the class for a more elaborate insight and implementation.

#### Bundling
What we need to achieve on this stage is to declare a new OSGi (declarative) [service](http://wiki.osgi.org/wiki/Declarative_Services) so that Dirigible can find and use it. Each out-of-the-box dialect is declared as a service component, with its service interface ([IDialectSpecifier](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/repository/org.eclipse.dirigible.repository.ext/src/org/eclipse/dirigible/repository/ext/db/dialect/IDialectSpecifier.java)) physically residing in its own bundle (org.eclipse.dirigible.repository.datasource), and an implementation class in another (org.eclipse.dirigible.repository.datasource.dialects). Detaching the interface and its implementations allows seamless, dynamic discovery of available dialects at runtime without disruption when new dialects are onboarded.
 
Let’s get down to it.

First, we need to declare our service component in a XML descriptor file. Normally, such XMLs reside in an OSGI-INF directory. For example, OSGI-INF/h2-dialect.xml:

	<?xml version="1.0" encoding="UTF-8"?>
	<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" immediate="true" name="H2Dialect">
	   <service>
	      <provide interface="org.eclipse.dirigible.repository.datasource.db.dialect.IDialectSpecifier"/>
	   </service>
	   <implementation class="org.eclipse.dirigible.repository.datasource.db.dialect.H2DBSpecifier"/>
	</scr:component>

Here the important variables are the component name and the implementation class. See, the OSGI-INF directory in org.eclipse.dirigible.repository.datasource.dialects for other examples.
 
Next, we need to register the new service component in its bundle MANIFETS.MF in a [Service-Component](http://wiki.osgi.org/wiki/Service-Component) header. Another option that comes in handy is to use a pattern instead (e.g. Service-Component: OSGi-INF/*.xml). See for example the MANIFEST.MF in the bundle with the out-of-the-box dialects.

And that’s all folks! 

If you follow this routine, rebuild Dirigible with a bundle that contains your correctly registered dialect and deploy it, you will be able to happily explore the H2 database:

<br>
	<img src="/img/posts/20160111-0/2-2.png"/>
<br>

### Dissecting IDialectSpecifier
Now, as promised, let’s get back to the main interface for dialects. Its methods can be grouped according to their purpose. We shall review the more important of each one here.

#### SQL statement construction callbacks
There are a number of methods that are invoked during the construction of statements (queries and updates) by the Dirigible database related tools:

- `String specify(String sql);`
- `String createLimitAndOffset(int limit, int offset);`
- `String createTopAndStart(int limit, int offset);`
- `String getAlterAddOpen();`
- `String getAlterAddOpenEach();`
- `String getAlterAddClose();`
- `String getAlterAddCloseEach();`

The `specify` method is concerned with transforming SQL statements into dialect-specific strings, by replacing a set of predefined variables from the input string with database-specific values. The variables are defined as constants in `IDIalectSpecifier`:

- `public static final String DIALECT_TIMESTAMP = "$TIMESTAMP$";`
- `public static final String DIALECT_BLOB = "$BLOB$";`
- `public static final String DIALECT_CLOB = "$CLOB$";`
- `public static final String DIALECT_CURRENT_TIMESTAMP = "$CURRENT_TIMESTAMP$";` 
- `public static final String DIALECT_KEY_VARCHAR = "$KEY_VARCHAR$";`
- `public static final String DIALECT_BIG_VARCHAR = "$BIG_VARCHAR$";`

The `createLimitAndOffset` and `createTopAndStart` methods are concerned with two alternative SQL syntax constructs that "page" results (return a subset form specified cursor position)

The set of `getAlter*` methods are handling the `ALTER <table-name> TABLE ADD` construct in dialect specific manner. There are actually two pairs of methods, each pair concerned with a variant of handling the column ADD syntax. In each pair there is a method handling the opening part of the construction and there is one for the closing part.

#### ResultSet iteration callbacks
The following methods are used by Dirigible while iterating a query ResultSet:

- `InputStream getBinaryStream(ResultSet resultSet, String columnName) throws SQLException;`

#### Common data type model translation
- `String getSpecificType(String commonType);`

The `getSpecificType` method is responsible to translate between the common types used in Dirigible and database-specific ones.

#### Query templates
Dirigible tools such as the SQLConsole and the Database browser collaborate with the action *Show Content* to set a generic query, listing the contents a table and execute it. It is the following method that is invoked to provision that generic query:

- `String getContentQueryScript(String catalogName, String schemaName, String tableName);`

Another one is concerned with provisioning a query that will perform database specific filtering of schemas and show only the applicable for Dirigible:

- `String getSchemaFilterScript();`

#### Database Metadata
There are also methods concerned with the general description of the data base:

- `boolean isSchemaFilterSupported();`
- `boolean isCatalogForSchema();`
- `boolean isSchemaless();`
- `isDialectForName(productName);`

These methods are mostly used to decide on the composition of UI or process. 

For example, `isSchemaless` is used to determine whether the *Open Definition* action in the Database Browser context menu for tables is presented to end user or not. Obviously, it doesn’t make a lot of sense for schemaless databases, at least not with the current view that deals with it. 

Similarly `isSchemaFilterSupported` is used by the Database Browser to invoke upon availability the `getSchemaFilter` method (discussed in previsous section) and reduce the schemas exhibited in the view to the applicable ones. And `isCatalogForSchema` instructs the UI how to handle database layouts of database products that have specific, non-standard handling of catalogs and schemas.  

But above all it's worth mentioning here the `isDialectForName` method. As you probably noted, this was the only one that was part of the minimal implementation of a dialect. What it does essentially is to assess the dialect where it is declared is applicable for the database product name supplied as argument for the `productName` parameter of the method. The value of the `productName` parameter is the string supplied by JDBC drivers implementation of [DatabaseMetaData#getDatabaseProductName](https://docs.oracle.com/javase/7/docs/api/java/sql/DatabaseMetaData.html#getDatabaseProductName()) API. Dirigible uses this to determine, which of the available service implementations of IDialectSpecifier is applicable for a given database.

#### Wrapping up
Summing up what we already know about the `IDialectSpecifier` interface, here is a slightly more elaborated variant of the minimal dialect implementation that we started with:

	public class H2DBSpecifier extends RDBGenericDialectSpecifier {
	
		private static final String PRODUCT_NAME = "H2";
		
		private static final String H2_TIMESTAMP = "TIMESTAMP";
		private static final String H2_CLOB = "CLOB";
		private static final String H2_BLOB = "BLOB";
		private static final String H2_CURRENT_TIMESTAMP = "CURRENT_TIMESTAMP";
		private static final String H2_BIG_VARCHAR = "VARCHAR(1000)";
		private static final String H2_KEY_VARCHAR = "VARCHAR(4000)";
	
		private static final String LIMIT_D_D = "LIMIT %d OFFSET %d";
		
		@Override
		public boolean isDialectForName(String productName) {
			return PRODUCT_NAME.equalsIgnoreCase(productName);
		}
		
		@Override
		public String specify(String sql) {
			if(sql==null || sql.length()<1)
				return sql;
			return sql.replace(DIALECT_TIMESTAMP, H2_TIMESTAMP)
					  	.replace(DIALECT_CLOB, H2_CLOB)
						.replace(DIALECT_BLOB, H2_BLOB)
						.replace(DIALECT_CURRENT_TIMESTAMP, H2_CURRENT_TIMESTAMP)
						.replace(DIALECT_BIG_VARCHAR, H2_BIG_VARCHAR)
						.replace(DIALECT_KEY_VARCHAR, H2_KEY_VARCHAR);
		}
		
		@Override
		public String createLimitAndOffset(int limit, int offset) {
			return String.format(LIMIT_D_D, offset, limit);
		}
		
		@Override
		public String getAlterAddOpen() {
			return " ADD( ";
		}
	
		@Override
		public String getAlterAddClose() {
			return ")";
		}
	
	}
