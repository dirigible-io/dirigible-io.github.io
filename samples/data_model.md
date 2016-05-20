---
layout: samples
title: Data Model
icon: fa-th-large
group: simple
---

Data Model
===

Data models a.k.a [domain models](http://en.htmlpedia.org/wiki/Domain_model) is the set of entities of your application and also their relations.
In Dirigible, we also useo the term [data structures](../help/data_structures.html), which is more related to the actual artifact - the data descriptor.
Let's create the first model entity of the [BookStore](bookstore.html) sample - the books table.

1. Select the **DataStructures** sub-folder of a project and open the pop-up menu using right-click.
2. From the menu, choose *New* -> *Data Structure*.

<br>

![New DataStructures Menu](bookstore/6_books_new_ds_menu.png)

<br>

The first page of this wizard lets you choose among several artifacts related to the domain model. In this case, you need a table to store the books metadata, such as ISBN, Title, Author, etc.
3. Choose *Database Table* and click *Next*.

<br>

![New DataStructures Wizard 1](bookstore/7_books_new_ds_wizard_1.png)

<br>

4. Use the *Add*/*Remove* buttons to create the actual table layout.

<br>

![New DataStructures Wizard 2](bookstore/8_books_new_ds_wizard_2.png)

<br>

	BOOK_ID                 INTEGER         not null    primaryKey
	BOOK_ISBN               CHAR        13  not null
	BOOK_TITLE              VARCHAR     200 not null
	BOOK_AUTHOR             VARCHAR     100 not null
	BOOK_EDITOR             VARCHAR     100
	BOOK_PUBLISHER          VARCHAR     100
	BOOK_FORMAT             VARCHAR     100
	BOOK_PUBLICATION_DATE   DATE
	BOOK_PRICE              DOUBLE          not null

<br>

![New DataStructures Wizard 3](bookstore/9_books_new_ds_wizard_3.png)

<br>

5. Enter a name and click *Finish*.
<br>

![New DataStructures Wizard 4](bookstore/10_books_new_ds_wizard_4.png)

<br>

6. The table descriptor should be generated based on your input, and the file itself should be opened in the editor's area.
<br>

![New DataStructures Content](bookstore/11_books_new_ds_content.png)

<br>

```javascript

	{
	  "tableName":"BOOKS",
	  "columns":
	    [
	      {
	        "name":"BOOK_ID",
	        "type":"INTEGER",
	        "length":"0",
	        "notNull":"true",
	        "primaryKey":"true",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_ISBN",
	        "type":"CHAR",
	        "length":"13",
	        "notNull":"true",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_TITLE",
	        "type":"VARCHAR",
	        "length":"200",
	        "notNull":"true",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_AUTHOR",
	        "type":"VARCHAR",
	        "length":"100",
	        "notNull":"true",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_EDITOR",
	        "type":"VARCHAR",
	        "length":"100",
	        "notNull":"false",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_PUBLISHER",
	        "type":"VARCHAR",
	        "length":"100",
	        "notNull":"false",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_FORMAT",
	        "type":"VARCHAR",
	        "length":"100",
	        "notNull":"false",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_PUBLICATION_DATE",
	        "type":"DATE",
	        "length":"0",
	        "notNull":"false",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	      ,
	      {
	        "name":"BOOK_PRICE",
	        "type":"DOUBLE",
	        "length":"0",
	        "notNull":"true",
	        "primaryKey":"false",
	        "defaultValue":""
	      }
	    ]
	}

```

For more information about data structure types and their descriptors, see [Data Structures](../help/data_structures.html)
Now, you have to create the real database artifact in the underlying database. 
7. Choose the *Publish* action from the project's popup menu.

<br>

![New DataStructures Publish](bookstore/12_books_new_ds_publish.png)

<br>

In this case (data structures artifacts), you can do the same also with the *Activate* action. For more information about the differences between these two actions, see [activation](../help/activation.html) and [publishing](../help/publishing.html).

<br>

Once you have published the project successfully, you can go to the **Database** perspective to double check the table definition.
8. From the main menu, go to *Window* -> *Show Perspective* -> *Database*.

<br>

![New DataBase Perspective](bookstore/13_books_db_perspective.png)

<br>

9. Open the database schema node and find the **BOOKS** table. Right-click and choose *Open Table Definition*.
<br>

![Check Table](bookstore/14_books_db_check_table.png)

<br>

This will open the **Table Definition Viewer**.

<br>

![Table Definition](bookstore/15_books_db_table_def.png)

