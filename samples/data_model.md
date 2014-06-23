---
layout: help
title: Samples
icon: fa-gift
---

Data Model
===

Data models a.k.a [domain models](http://en.htmlpedia.org/wiki/Domain_model) is the set of the entities of your application and also their relations.
In Dirigible we use also the term [data structures](../help/data_structures.html), which is more related to the actual artifact - the data descriptor.
Let create the first model entity of the [BookStore](bookstore.html) sample - the books table.

Select the DataStructures sub-folder of a project and open the pop-up menu (right-click).
From the menu go to *New->Data Structure*

![New DataStructures Menu](bookstore/6_books_new_ds_menu.png)

The first page of this wizard let you choose from the several artifacts related to the domain model. In this case we need a table where to store the books metadata like ISBN, Title, Author, etc.
Choose "Database Table" and click Next

![New DataStructures Wizard 1](bookstore/7_books_new_ds_wizard_1.png)

Use Add/Remove buttons to create the actual layout of the table

![New DataStructures Wizard 2](bookstore/8_books_new_ds_wizard_2.png)

<pre><code>BOOK_ID                 INTEGER         not null    primaryKey
BOOK_ISBN               CHAR        13  not null
BOOK_TITLE              VARCHAR     200 not null
BOOK_AUTHOR             VARCHAR     100 not null
BOOK_EDITOR             VARCHAR     100
BOOK_PUBLISHER          VARCHAR     100
BOOK_FORMAT             VARCHAR     100
BOOK_PUBLICATION_DATE   DATE
BOOK_PRICE              DOUBLE          not null
</code></pre>

![New DataStructures Wizard 3](bookstore/9_books_new_ds_wizard_3.png)

Give a name and click finish

![New DataStructures Wizard 4](bookstore/10_books_new_ds_wizard_4.png)

The table descriptor should be generated, based on your input and the file itself should be opened in the editors area

![New DataStructures Content]bookstore/11_books_new_ds_content.png!

<pre><code>{
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
</code></pre>

More about the data structure types and their descriptors can be found [here](../help/data_structures.html)
Now we have to create the real database artifact in the underlying database. This can be done via publish action from the project's popup menu.

![New DataStructures Publish](bookstore/12_books_new_ds_publish.png)

In this case (data structures artifacts) you can do the same also with activation action. Follow the links for more information about the differences between [activation](../help/activation.html) and [publishing](../help/publishing.html).

Once we have published successfully the project, we can go to Database perspective to double-check the table definition.
From main menu go to Window->Show Perspective->Database

![New DataBase Perspective](bookstore/13_books_db_perspective.png)

Open the database schema node and find the BOOKS table. Right-click and choose "Open Table Definition"

![Check Table](bookstore/14_books_db_check_table.png)

This will open the Table Definition Viewer

![Table Definition](bookstore/15_books_db_table_def.png)

