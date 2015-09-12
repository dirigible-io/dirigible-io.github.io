---
layout: samples
title: Test Scenario
icon: fa-gift
group: test
---

Test Scenario
===

## Prerequisites ##

If you want to skip the prerequisites steps, open Dirigible from [here](http://trial.dirigible.io).

---


1. Go to [Dirigible's](http://www.dirigible.io/) official site
2. Click the **GET STARTED** button
3. Follow the *getting started* steps
4. Open the project's address in a new browser

## Initial experience ##

1. When dirigible is opened in the browser, the registry page should be displayed

	![Landing page](images/test_scenario/1.png)

2. Then click the **IDE** icon
3. A new tab should be opened with the IDE itself

	![Landing page](images/test_scenario/2.png)

4. If this is the first time you use dirigible (or this instance) the **Workspace Explorer** should be empty
5. Explore the other perspectives by clicking the **other...** button

	![Landing page](images/test_scenario/3.png)

6. There should be a list of all available perspectives
7. From the list, select **Database** and press **OK**
8. The **Database** perspective should open

	![Landing page](images/test_scenario/4.png)

9. Depending on the roles your user has, under the **SQL Console** view you should see the following:
	* **Query** and **Update** buttons, if you have assigned role **Operator**
	* **Query** button, if you don't have assigned the **Operator** role
10. Switch back to the workspace perspective, by clicking the **Workspace** button

## Simple project ##

1. Right click in the **Workspace Explorer** view
2. From the menu select **New->Project**

	![Landing page](images/test_scenario/5.png)

3. Enter a name for the project, for example **test_project** and click **Next >**
4. A list of all available project templates should be displayed
5. Choose **Blank Application** and click **Finish**

	![Landing page](images/test_scenario/6.png)

6. A new project should be created in the **Workspace Explorer**
7. Expand the initial empty project and list of all project artifacts should be displayed

	![Landing page](images/test_scenario/7.png)

8. Right click on the project, and from the menu choose **New->Scripting Service**

	![Landing page](images/test_scenario/8.png)

9. From the list of all available *Scripting Services* select **Server-Side JavaScript Service** and click **Next >**

	![Landing page](images/test_scenario/9.png)

10. Give the service some meaningful name like **hello_world.js** and click the **Finish** button
11. Under the **Scripting Service** folder, a new generated service should appear

	![Landing page](images/test_scenario/10.png)

12. Switch to the **Preview** view
13. The service should be executed and the response in the **Preview** view should be **Hello World!**

	![Landing page](images/test_scenario/11.png)

14. Right click on the project and from the menu choose **Publish**

	![Landing page](images/test_scenario/12.png)

15. In the **Preview** tab click the *Sandbox/Public* button

	![Landing page](images/test_scenario/13.png)

16. The URL should be changed from 

	> https://[host]:[port]/dirigible/**js-sandbox**/[project-name]/[service-name]

 	to 

	> https://[host]:[port]/dirigible/**js**/[project-name]/[service-name]

17. Copy the URL and open it in a anonymous browser session
18. The service should be executed without asking you for credentials
19. Change the URL path from **.../js/...** to **.../js-sandbox/...**
20. You should be asked to authenticate before the execution of the service

## Full-fledged application ##

1. Right click in the **Workspace Explorer** view
2. From the menu select **New->Project**

	![Landing page](images/test_scenario/5.png)

3. Enter a name for the project, for example **test_project** and click **Next >**
4. A list of all available project templates should be displayed
5. Choose **Blank Application** and click **Finish**

	![Landing page](images/test_scenario/6.png)

6. A new project should be created in the **Workspace Explorer**
7. Expand the initial empty project and list of all project artifacts should be displayed

	![Landing page](images/test_scenario/7.png)

8. Right click on the project and from the menu select **New->Data Structure**

	![Landing page](images/test_scenario/14.png)

9. A list of all available **Data Structure** templates should be displayed
10. Choose **Database Table** and click **Next >**

	![Landing page](images/test_scenario/15.png)

11. Page for managing table fields should be opened

	![Landing page](images/test_scenario/16.png)

12. Click on the **Add** button
13. **Add Column** dialog should be displayed
14. Fill the fields and click **OK**

	![Landing page](images/test_scenario/17.png)

15. Add several more fields.
16. The final result should look like this

	![Landing page](images/test_scenario/18.png)

17. Click **Next >**
18. Give the table some meaningful name like **students.table** and click **Finish**
19. From the **Workspace Explorer** select the project and from the bar above, click on the **Activate** button

	![Landing page](images/test_scenario/19.png)

20. Switch to the **Database** perspective
21. In the **SQL Console** enter the following script and click **Query**
	> select * from students

	![Landing page](images/test_scenario/20.png)

22. The result, of executing the SQL script, should be empty table
23. Switch back to the **Workspace** perspective
24. Right click on the project and from the menu select **New->Scripting Service**
25. From the list of available templates, choose **Entity Service on Table** and click **Next >**
26. All available database table should be listed
27. Select the **STUDENTS** table and click **Next >**

	![Landing page](images/test_scenario/21.png)

28. Give the service some meaningful name like **students_service.js** and click **Finish**
29. Under the **ScriptingServices** folder 3 files should be generated

	![Landing page](images/test_scenario/22.png)

30. From the **Workspace Explorer** view, select the project and from the bar above, click on the **Publish** button

	![Landing page](images/test_scenario/23.png)

31. Select **students_service.js** and open the **Preview** view
32. The result should be empty JSON array `[]`
33. Right click on **students_service.entity** and from the menu select **Generate->User Interface for Entity Service**

	![Landing page](images/test_scenario/24.png)

34. A list of all available UI templates should be opened
35. Select the **List and Manage View** and click **Next >**

	![Landing page](images/test_scenario/25.png)

36. A list of all available fields, for which will be generated the UI, should be displayed
37. Click **Select All** and then click **Next >** button

	![Landing page](images/test_scenario/26.png)

38. Give some meaningful name for the page, like **students.html** and click **Next >**
39. Enter **Students** for **Page Title** and click **Finish**
40. In the **Preview** view, the page should be displayed

	![Landing page](images/test_scenario/27.png)

41. Select the project and **Publish** it again
42. Try adding some entries
43. Switch to the **Database** perspective
44. In the **SQL Console** view execute again the same query
	> select * from students
45. This time the query should return the entries you had enter


