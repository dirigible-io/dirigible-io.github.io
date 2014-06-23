---
layout: help
title: Samples - Entity Service
icon: fa-gift
---

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

During the activation the artifact goes to the sandbox of the logged-in user. We can see the result of calling the service right away in the Web Viewer (sould be opened by default in the Workspace Perspective), so find it (next to Properties view) and select it. Now go to the Workspace Explorer where the project is managed and select the service artifact (books.js). This will trigger the construction of the right URL of the service endpoint in the sandbox, hence you will see the result in the Web Viewer.

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


