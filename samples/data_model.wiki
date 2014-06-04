
h1. Data Model

Data models a.k.a [domain models|http://en.wikipedia.org/wiki/Domain_model] is the set of the entities of your application and also their relations.
In Dirigible we use also the term [data structures|../help/data_structures.wiki], which is more related to the actual artifact - the data descriptor.
Let create the first model entity of the [BookStore|bookstore.wikis] sample - the books table.

Select the DataStructures sub-folder of a project and open the pop-up menu (right-click).
From the menu go to *New->Data Structure*

!bookstore/6_books_new_ds_menu.png!

The first page of this wizard let you choose from the several artifacts related to the domain model. In this case we need a table where to store the books metadata like ISBN, Title, Author, etc.
Choose "Database Table" and click Next

!bookstore/7_books_new_ds_wizard_1.png!

Use Add/Remove buttons to create the actual layout of the table

!bookstore/8_books_new_ds_wizard_2.png!

{code}
BOOK_ID                 INTEGER         not null    primaryKey
BOOK_ISBN               CHAR        13  not null
BOOK_TITLE              VARCHAR     200 not null
BOOK_AUTHOR             VARCHAR     100 not null
BOOK_EDITOR             VARCHAR     100
BOOK_PUBLISHER          VARCHAR     100
BOOK_FORMAT             VARCHAR     100
BOOK_PUBLICATION_DATE   DATE
BOOK_PRICE              DOUBLE          not null
{code}

!bookstore/9_books_new_ds_wizard_3.png!

Give a name and click finish

!bookstore/10_books_new_ds_wizard_4.png!

The table descriptor should be generated, based on your input and the file itself should be opened in the editors area

!bookstore/11_books_new_ds_content.png!

{code}
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
{code}

More about the data structure types and their descriptors can be found [here|../help/data_structures.wiki]
Now we have to create the real database artifact in the underlying database. This can be done via publish action from the project's popup menu.

!bookstore/12_books_new_ds_publish.png!

In this case (data structures artifacts) you can do the same also with activation action. Follow the links for more information about the differences between [activation|../help/activation.wiki] and [publishing|../help/publishing.wiki].

Once we have published successfuly the project, we can go to Database perspective to double-check the table definition.
From main menu go to Window->Show Perspective->Database

!bookstore/13_books_db_perspective.png!

Open the database schema node and find the BOOKS table. Right-click and choose "Open Table Definition"

!bookstore/14_books_db_check_table.png!

This will open the Table Definition Viewer

!bookstore/15_books_db_table_def.png!

