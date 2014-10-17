---
layout: samples
title: Entity Service
icon: fa-rss
group: simple
---

Entity Service
===

In the context of Dirigible, the Entity Service means a RESTful service which exposes the [CRUD](http://en.wikipedia.org/wiki/Create,\_read,\_update\_and\_delete) methods on top of the database table. The following steps shows how to generate such an entity service on top of existing table.

1. Select the **ScriptingServices** sub-folder of the project and open the pop-up menu.
2. From the menu, choose *New* -> *Scripting Service*.
<br></br>
![Entity Service](bookstore/16_books_entity_service_menu.png)
<br></br>
3. From the wizard, select **Entity Service on Table** from the list of available templates.
<br></br>
![Entity Service](bookstore/17_books_entity_service_wizard_1.png)
<br></br>
4. Click *Next*.
5. A specific page is opened - it lists all available tables from the current database schema.
<br></br>
![Entity Service](bookstore/18_books_entity_service_wizard_2.png)
<br></br>
6. On the next page, enter a name for your entity service and click *Finish*.
<br></br>
![Entity Service](bookstore/19_books_entity_service_wizard_3.png)
<br></br>
7. The generated service should be opened in the editor's area.
<br></br>
![Entity Service](bookstore/20_books_entity_service_content.png)
<br></br>
8. Now, you can use the *Activate* action from the project's pop-up menu to enable the service.
<br></br>
![Entity Service](bookstore/21_books_entity_service_activate.png)
<br></br>
9. During the activation, the artifact goes to the sandbox of the logged-in user. You can see the result of calling the service right away in the *Preview* (it's opened by default in the **Workspace** perspective next to *Properties* view). Now, go to *Workspace Explorer* where the project is managed and select the service artifact (**books.js**). This will trigger construction of the right URL of the service endpoints in the sandbox, hence you will see the result in the *Preview*.
<br></br>
![Entity Service](bookstore/22_books_entity_service_test.png)
<br></br>
In this case - just an empty JSON array.
<br></br>
10. If you like the result to be displayed in the sandbox, you can publish the service so that it becomes accessible by other users. 
<br></br>
![Entity Service](bookstore/23_books_entity_service_publish.png)
<br></br>
To find the URL, you can go to the **Registry** perspective. 
11. From the main menu, choose *Window* -> *Show Perspective* -> *Registry*.
12. The **Registry** perspective represents a view to the enabled runtime content. From its menu, choose *Scripting* -> *JavaScript* to open the currently available server-side JavaScript service endpoints.
<br></br>
![Entity Service](bookstore/24_books_entity_service_registry_1.png)
<br></br>
13. You can see the list of available endpoints, where you can find yours by naming convention: **<project>.<service path>**
<br></br>
![Entity Service](bookstore/25_books_entity_service_registry_2.png)
<br></br>
14. You can copy to clipboard the link to the service via the first icon at the right side of the row, or can directly open it by clicking on the second icon.
<br></br>
![Entity Service](bookstore/26_books_entity_service_registry_3.png)
<br></br>
The naming convention for the service endpoints URLs is as follows:

> *[protocol]://[host]:[port]/[dirigible's runtime application context]/[scripting container mapping]/[project]/[service path]*

**For example:**

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

The suffix "<samp>-secured</samp>" above shows the access point for the secured endpoints. For more information, see [Security](../help/security.html).


There are some specific requirements for the table to be exposed as an entity service (e.g. primary key has to be defined, it should be a single column, etc.).
Also, the entity service itself supports a bit more operations than the standard ones defined by HTTP. For more information, see [Entity Service](../help/entity_service.html).


