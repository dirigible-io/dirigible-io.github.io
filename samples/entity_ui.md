---
layout: samples
title: Entity User Interface
icon: fa-picture-o
group: simple
---

Entity User Interface
===

After creating the data model and the entity service, let's now generate user interface for entity management (list, new, edit, delete...)

1. Select **books.entity** and open the pop-up menu. 
2. Choose *Generate* -> *User Interface for Entity Service*.

<br>

![Entity Service UI 1](bookstore/27_books_entity_service_ui_1.png)

<br>

3. From the wizard, select the template **List and Manage View**.

<br>

![Entity Service UI 2](bookstore/28_books_entity_service_ui_2.png)

<br>

4. Click *Next*.
5. Select all columns from the list. You can use the *Select All* button.

<br>

![Entity Service UI 3](bookstore/29_books_entity_service_ui_3.png)

<br>

6. On the next page, enter the name **books_manage.html** and click *Next*.

<br>

![Entity Service UI 4](bookstore/30_books_entity_service_ui_4.png)

<br>

7. In _Page Title_, enter **Manage Books**.

<br>

![Entity Service UI 5](bookstore/31_books_entity_service_ui_5.png)

<br>

8. Click *Finish*.
The generation is triggered. You can see the result under the **WebContent** folder.
9. When you select the file with active *Preview*, you should see the running result page.

<br>

![Entity Service UI 6](bookstore/32_books_entity_service_ui_6.png)

<br>

10. For the real test of the Web page and the entity service, you can [Publish](../help/publishing.html) the project.

<br>

![Project Publish](bookstore/104_books_project_publish.png)

<br>

or

<br>

![Project Publish Popup](bookstore/106_books_project_publish_popup.png)

<br>

Now, go to the **Registry** perspective to find the page link.
11. From the **Registry** embedded page menu, choose *Web* -> *Content* to open it in an external browser.

<br>

![Entity Service UI 7](bookstore/33_books_entity_service_ui_7.png)

<br>

12. Drill-down in the **BookStore** project folder and click on the page which is listed.
13. To open the page in a new tab, click on the icon on the right-hand side.

<br>

![Entity Service UI 8](bookstore/34_books_entity_service_ui_8.png)

<br>

14. Click the *Edit* button and input the information about the first book you want to have in your store.

<br>

![Entity Service UI 9](bookstore/35_books_entity_service_ui_9.png)

<br>

15. Click the *Save* button and see the record inserted in the table above.

<br>

![Entity Service UI 10](bookstore/36_books_entity_service_ui_10.png)

