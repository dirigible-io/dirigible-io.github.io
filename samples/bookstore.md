---
layout: samples
title: BookStore
icon: fa-book
group: solution
---

BookStore
---

The *BookStore* sample demonstrates how you can build a simple online shop. It shows how to create a domain model in the target database, how to generate RESTful services on top of the modeled entities, and finally how to generate simple management user interface as a basis for the actual Web design.

Project Creation
---

<ol> 
<li>

First, open the perspective where you want to create a project. The _Workspace_ perspective is the default one. </li>

<li> From the main menu, select <i>File</i> -> <i>New</i> -> <i>Project</i>.

![New Project Menu](bookstore/2_books_new_project_menu.png)

</li>

<li> In the wizard, enter the project name <b>bookstore</b> and click <i>Next</i>.  </li>
<br></br>
<li> From the list you can choose from several predefined project templates. In this case, just go to the first one - <b>Blank Dynamic Application</b>. 

![New Project Wizard Template](bookstore/4_books_new_project_wizard_template.png)
</li>

<li> Click <i>Finish<i> and open the project in the workspace to see the folder layout.

![New Project Layout](bookstore/5_books_new_project_layout.png) </li>

</ol>

<p>There are several predefined folders, tightly related to the artifact types, which can be placed there as well as the corresponding activities you can make on them.</p>


Data Model
---

Data models a.k.a [domain models](http://en.htmlpedia.org/wiki/Domain_model) is the set of entities of your application and also their relations.
In Dirigible, we use also the term [data structures](../help/data_structures.html), which is more related to the actual artifact - the data descriptor.
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



Entity Service
===

Entity Service meaning in terms of Dirigible is a RESTful service, which exposes the [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete] methods on top of the database table.
The following steps shows how to generate such an entity service on top of existing table.

Select the ScriptingServices sub-folder of the project and open the pop-up menu
From the menu go to *New->Scripting Service*

![Entity Service](bookstore/16_books_entity_service_menu.png)

From the opened wizard select the "Entity Service" from the list of available templates.

![Entity Service](bookstore/17_books_entity_service_wizard_1.png)

Once you have selected the "Entity Service" template and click "Next", the page which will be shown is specific one - lists all the available tables from the current database schema.

![Entity Service](bookstore/18_books_entity_service_wizard_2.png)

Give the name of your entity service on the next page and click finish

![Entity Service](bookstore/19_books_entity_service_wizard_3.png)

The generated service should be opened in the editors area.

![Entity Service](bookstore/20_books_entity_service_content.png)

Now we can use activation action from the project's pop-up menu to enable the service

![Entity Service](bookstore/21_books_entity_service_activate.png)

During the activation the artifact goes to the sandbox of the logged-in user. We can see the result of calling the service right away in the Preview (sould be opened by default in the Workspace Perspective), so find it (next to Properties view) and select it. Now go to the Workspace Explorer where the project is managed and select the service artifact (books.js). This will trigger the construction of the right URL of the service endpoint in the sandbox, hence you will see the result in the Preview.

![Entity Service](bookstore/22_books_entity_service_test.png)

in this case just an empty JSON array.

If you like the result in the sandbox you can publish the service, so that it become accessible by the other users. 

![Entity Service](bookstore/23_books_entity_service_publish.png)

To find the URL you can go to the Registry Perspective. From the main menu go to Window->Show Pespective->Registry
The Registry Perspective is representing a view to the enabled runtime content. From its menu choose Scripting->JavaScript to open the currently available server-side JavaScript service endpoints.

![Entity Service](bookstore/24_books_entity_service_registry_1.png)

You can see the list of the available end-points, where you can find yours by naming convention <project>.<service path>

![Entity Service](bookstore/25_books_entity_service_registry_2.png)

The link to the service can be copied to the clipboard via the first image at the right side of the row or can be directly opened by clicking on the second image.

![Entity Service](bookstore/26_books_entity_service_registry_3.png)

The naming convension for the service' endpoints URLs is as follows:

> *[protocol]://[host]:[port]/[dirigible's runtime application context]/[scripting container mapping]/[project]/[service path]*

e.g.

> *https ://dirigibleide.hana.ondemand.com/dirigible/js/bookstore/books.js*


The scripting containers mappings are:

*	JavaScript
	*	/js
	*	/js-secured
*	Ruby
	*	/rb
	*	/rb-secured
*	Groovy
	*	/groovy
	*	/groovy-secured
*	Test
	*	/test

The suffix "-secured" above shows the access point for the secured end-points. More info can be found [here](../help/security.html).


There are some specific requirement for the table to be able to be exposed as entity service (e.g. primary key have to be defined, it should be a single column, etc.).
Also the entity service itself support a bit more operations than the standard ones defined by HTTP. More about the entity services can be found [here](../help/entity_service.html).


Entity User Interface
===

After the creation of the data model and the entity service, now we will going to generate an user interface for entity management (list, new, edit, delete...)

Select the *books.entity* and open the pop-up menu. Choose *Generate->User Interface for Entity Service*

![Entity Service UI 1](bookstore/27_books_entity_service_ui_1.png)

From the wizard select the template "List and Manage View"

![Entity Service UI 2](bookstore/28_books_entity_service_ui_2.png)

Click Next and select all the columns from the list. You can use "Select All" button

![Entity Service UI 3](bookstore/29_books_entity_service_ui_3.png)

On the next page enter the name of the page *books_manage.html*

![Entity Service UI 4](bookstore/30_books_entity_service_ui_4.png)

For the Title on the next page you can enter *Manage Books*

![Entity Service UI 5](bookstore/31_books_entity_service_ui_5.png)

After clicking Finish button the generation is triggered. You can see the result under the WebContent folder
When you select the file with active Preview you shall see the resulted running page.

![Entity Service UI 6](bookstore/32_books_entity_service_ui_6.png)

For the real test of the web page and the entity service you can [Publish](../help/publishing.html) the project

![Project Publish](bookstore/104_books_project_publish.png)

or

![Project Publish Popup](bookstore/106_books_project_publish_popup.png)

Now fo to the Registry perspective to find the link to the page, so that we can open it in an external browser.
From the Registry embedded page menu choose Web->Content

![Entity Service UI 7](bookstore/33_books_entity_service_ui_7.png)

Drill-down in the bookstore project folder and click on the page which is listed.
To open the page in a new tab click on the icon on the right side

![Entity Service UI 8](bookstore/34_books_entity_service_ui_8.png)

Click on "Edit" button and input the information about the first book you want to have in your store.

![Entity Service UI 9](bookstore/35_books_entity_service_ui_9.png)

Click Save button and see the inserted record in the table above

![Entity Service UI 10](bookstore/36_books_entity_service_ui_10.png)

