---
layout: post
title: "BYODS (Bring Your Own Data Source) in Dirigible - Part III: MongoDB custom data source"
category: blogs
tag: blogs
brief: <h4><a href='blogs/2016/01/21/blogs_dirigible_custom_ds_3.html'>BYODS (Bring Your Own Data Source) in Dirigible - Part III":" MongoDB custom data source</a></h4> <sub class="post-info">January 21, 2016 by Georgi Pavlov</sub></br> Dirigible welcomes Mongo DB onboard! Starting with version 2.2 Mongo DB is supported out-of-the-box...<br>
---

#BYODS (Bring Your Own Data Source) in Dirigible

<sub class="post-info">January 21, 2016 by Georgi Pavlov</sub>

In previous [blogs](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html) in the "BYODS in Dirigible" series we explored how data sources are integrated in general with most examples focusing on relational databases as options. But what about [NoSQL](https://en.wikipedia.org/wiki/NoSQL)?

Dirigible welcomes [Mongo DB](https://www.mongodb.org/) onboard! Starting with version 2.2 Mongo DB is supported out-of-the-box. You can explore it in the IDE and develop scripting services for it. Taking advantage of NoSQL document storage is now an entirely viable option. This is the first stage of our roadmap for onboarding NoSQL development. It uses JDBC as standard communication protocol and API. We are well aware that it is not native to NoSql development and is rather a “quick way in”. On next stage, we plan to explore the options to provision [Apache TinkerPop](https://tinkerpop.incubator.apache.org/) as a well-recognized standard Graph API (to which Mongo DB also complies) to scripting services via the [Injected API](http://www.dirigible.io/help/api.html). We shall seek also for convenient ways to provide access to native Graph APIs of NoSql data stores with all pros and cons that go along with that.

But first things first. We shall now explore what we’ve got for Mongo DB developers in Dirigible 2.2.

##Part III: MongoDB custom data source

What’s in the box? With a Mongo DB custom data source integrated in Dirigible Database tools, you can explore the related database instance list of collections and examine collection documents:

<br>
	<img src="/img/posts/20160121-0/3-0.png"/>
<br>

As with any other relational data source, you can also execute queries and updates but hence, using Mongo’s native BSON-based query language:

<br>
	<img src="/img/posts/20160121-0/3-1.png"/>
<br>

It is integrated also into the InjectedAPI and therefore in your scripting service you can request the data source by its name, get a connection and execute a statement using Mongo’s native query language, and iterate the result set (here, using the JDBC API. Read below for more options):

	var ds = $.getNamedDatasources().get(‘mongodb’);
	var conn = ds.getConnection();
	try {
	    var stmt = conn.createStatement();
	    var rs = stmt.executeQuery(‘{“find”:”testCollection”}’);
	    while (rs.next()) {
	        $.getResponse().getWriter().println(rs.getString(1)+':'+rs.getString(“name”) + '<br>');
	    }
	} finally {
	   conn.close();
	}

Onboarding a Mongo DB data source leverages exactly the same integration mechanism in Dirigible as any other (relational) data source. This feature has been discussed in detail in the previous BYODS [blog](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html) series. The obvious advantage of this approach is that it follows an established path. That simplicity comes at the cost of a few reasonable prerequisites listed below.

####JDBC API
JDBC is the standard API used by Dirigible internally to integrate data sources and by developers to use them. Therefore, you will need a JDBC compliant driver to provision access to a Mongo database. Its role is to reconcile the conceptual differences between the relational model centric JDBC API and the NoSQL document store world.

In Mongo, despite the name “[Java driver](https://docs.mongodb.org/ecosystem/drivers/java/)” that you will find on Mongo DB’s site concerning Java clients, this has nothing to do with JDBC drivers. It is a Java client API. If you look around for available JDBC drivers for Mongo DB, they are not exactly abundant either. What’s more troublesome here is that virtually all available drivers actually try to translate between Mongo DB’s native query language and SQL. While this works perfectly well for us in terms of technical integration, it does not comply with our goal to make Mongo DB’s developers feel at home in Dirigible, because it would be fairly weird for them to write SQL to query a document database. 
To fill this gap and for the sake of this example we’ve prototyped a driver that can send native queries encoded as BSON to Mongo DB. It is available on [Github](https://github.com/eclipselabs/mongodb-jdbc-driver).

The fine print? Once again, this driver is a prototype and as of the time of this writing there’s still nothing comparable (Meaning happily abusing the JDBC API as a standard protocol for Mongo DB but reusing its own query language). Show some love for it and we will further enhance it. The rest of the drivers out there translate to/from SQL, which will work for the InjectedAPI if you are happy with this approach, but not with the Dirigible database tools in the IDE’s Database perspective.

####Query language
In order to execute query or update statements from Dirigible, your back-end needs to be able to interpret a formal language that can be encoded in strings because that’s the input it will get. There are options here, but it would be best to re-use a query language if your database already has one. Developers who are already used to it will feel at home and make the best use of the database capabilities. Other options, but less desirable for the same reasons, are to translate to and from SQL or other suitable language.
MongoDB has a concept of query language. Queries are BSON encoded documents that are input to the operation [find](https://docs.mongodb.org/manual/reference/command/find/#dbcmd.find). Our JDBC driver takes documents in that format as string input to its query operations in the JDBC API, converts internally to BSON documents and invokes the operation find on the Mongo DB Java client. The JDBC query operations string input therefore needs to be compliant with Mongo's `find` operation input parameter [specification](https://docs.mongodb.org/manual/reference/command/find/#dbcmd.find). 

####Result sets
Results are returned as JDBC [ResultSet](https://docs.oracle.com/javase/7/docs/api/java/sql/ResultSet.html), i.e. in a table form. The driver of choice should be capable of transforming internally to this form of results presentation from Mongo's documents format.

- **Row data.** 
Here is the nice part. The Mongo DB JDBC driver we introduced above is capable of a nice trick that can limit greatly your relation to JDBC and keep you more in the real Mongo world. While iterating the result set, and quite frankly slightly abusing the API for [java.sql.ResultSet#getObject(int)](https://docs.oracle.com/javase/7/docs/api/java/sql/ResultSet.html#getObject(int)) method, if you pass `-100` as argument, you will get the native Mongo document for the current iteration, the result of the [MongoCursor<Document>#next()](http://api.mongodb.org/java/current/com/mongodb/client/MongoCursor.html#next--) method. Standard? No. Convenient? Yes. Of course, the JDBC driver still provides you with the option to stick to the JDBC API to explore a row contents if you wanted that. So you have these two options here to choose from.
- **ResultSetMetadata.** 
A major difference between Mongo DB and relational databases is that Mongo DB is schemaless. Although it is not encouraged, the documents that constitute the model do not necessarily follow the same scheme and their properties may vary. One consequence is that the ResultSetMetadata should be handled with care. Since it is the content that defines the schema, first it is possible to deliver some insight on the ResultSetMetadata only if there are some documents stored, and second the metadata concerning the schema change with every new document so it is completely known only at the end of the iteration of the result set and is valid only until the data changes. 
- **The get<Type>(int index) methods.**
Our JDBC driver makes a best effort to return stable value by index, relying on the ordering of the results as provided by Mongo DB. Note that Mongo's [documentation](https://docs.mongodb.org/v2.6/core/document/#document-field-order) states the following: "*Starting in version 2.6, MongoDB actively attempts to preserve the field order in a document. Before version 2.6, MongoDB did not actively preserve the order of the fields in a document.*". The bottom line is that index-based value extraction from a ResultSet row is not working for Mongo DB versions earlier than 2.6, and for 2.6 and newer, the document fields will be as reliably ordered as Mongo DB can do it. 

These are all important considerations when implementing and using the result sets returned by queries.

##Provisioning
The setup of a Mongo DB data source is no different from what we already did in [Part I](http://www.dirigible.io/blogs/2016/01/07/blogs_dirigible_custom_ds_1.html), so here we shall cut short and focus only on the details that you need to provide.

#####Step 1: Provision JDBC drivers classes
Get the JDBC driver source from [Github](https://github.com/eclipselabs/mongodb-jdbc-driver) and use [Maven](https://maven.apache.org/) to build. Copy the build result in Tomcat’s lib directory.

#####Step 2: Bind a Data Source to JNDI
Edit Tomcat’s conf/context.xml to add a resource:

	<Resource name="jdbc/MongoDB" auth="Container"
				type="javax.sql.DataSource" 
				driverClassName="io.dirigible.mongodb.jdbcMongodbJdbcDriver"
				url="jdbc:mongodb://127.0.0.1:5432"
				username="<YOUR_USER_HERE>" password="<YOUR_PASSWORD_HERE>"/>

Note: Remember to change the placeholders in this example with actual values. **<YOUR_NAME_HERE>** and **<YOUR_PASSWORD_HERE>** are respectively the user name and password for a valid user of the database.

#####Step 3: Configure application reference
Add the following init parameter to the bridge servlet in the web.xml

	<init-param>
		<param-name>jndiCustomDataSource-mongodb</param-name>
		<param-value>java:comp/env/jdbc/MongoDB</param-value>
	</init-param> 

#####Step 4: Register the data source
Go to Dirigible IDE Preferences, locate Data Sources and create a new one. Fill in the following details in dialog that pops up:

- Id: `mongodb`
- Name: `MongoDB`
- Type: `JNDI`
- Location: `java:comp/env/jdbc/MongoDB`

Finally, confirm all dialogs.

And that’s pretty much it. You should have a new data source by the name `mongodb` by now.
 
##Putting it to use
Now that we’ve got a Mongo DB data source in Dirigible, put it to some good use. 
 
	/* globals $ */
	/* eslint-env node, dirigible */
	
	$.getResponse().setContentType("text/html; charset=UTF-8");
	$.getResponse().setCharacterEncoding("UTF-8");
	var out = $.getResponse().getWriter();
	
	var ds = $.getNamedDatasources().get("mongodb");
	var conn = ds.getConnection();
	try {
	    var stmt = conn.createStatement();
	    var rs = stmt.executeQuery(‘{find:"testCollection"}’);
	    while (rs.next()) {
		var rsDoc = rs.getObject(-100);
		for(var prop in rsDoc){
	       		out.println(prop + ': ' + rsDoc[prop] + '<br>');	
	}
	    }
	} finally {
	   conn.close();
	}
	
	out.flush();
	out.close();

In this code snippet we have several semantic blocks. First we open a writer to output some data from the service:

	$.getResponse().setContentType("text/html; charset=UTF-8");
	$.getResponse().setCharacterEncoding("UTF-8");
	var out = $.getResponse().getWriter();

Next, we get a connection to the Mongo DB data source that we setup on previous stage:

	var ds = $.getNamedDatasources().get("mongodb");
	var conn = ds.getConnection();

Then, we create a statement and execute it using the standard JDBC API but the native Mongo DB query language:

	var stmt = conn.createStatement();
	var rs = stmt.executeQuery(‘{find:"testCollection"}’);

Now we are ready to iterate on the result set and output some results. Note how we use the standard JDBC API for iteration and the little trick that our Mongo DB JDBC driver is capable of with the `rs.getObject(-100);` statement. Once we get hold of the JSON document for the current iteration we use pure JavaScript and no JDBC to make some use of it:

	while (rs.next()) {
	var rsDoc = rs.getObject(-100);
		for(var prop in rsDoc){
	       		out.println(prop + ': ' + rsDoc[prop] + '<br>');	
		}
	}
	
Finally, as good citizens we close all open resource streams. 
