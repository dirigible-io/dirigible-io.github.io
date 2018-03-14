---
title: Eclipse Dirigible
author: yordan.pavlov
---

This article was republished from [Eclipse Newsletter](https://www.eclipse.org/community/eclipse_newsletter/2018/february/dirigible.php), February 2018

# Eclipse Dirigible

## Overview

**Dirigible** is an open-source cloud development platform, part of the Eclipse foundation and the top-level **Eclipse Cloud Development** project. The ultimate goal of the platform is to provide software developers with the right toolset for building, running, and operating business applications in the cloud. To achieve this goal, Dirigible provides both independent **Design Time** and **Runtime** components.

## Mission
 
Nowadays, providing a full-stack application development platform is not enough. Building and running on top of it has to be fast and smooth! Having that in mind, slow and cumbersome _"Build"_, _"CI"_, and _"Deployment"_ processes have a direct impact on development productivity. In this line of thought, it isn't hard to imagine that the Java development model for web applications doesn't fit in the cloud world. Luckily, one of the strongest advantages of Dirigible comes at hand - the **In-System Development** model.  Right from the early days of Dirigible, it was clear that it is going to be the platform for **Business Applications Development** in the cloud and not just another general purpose IDE in the browser. The reason for that decision is pretty simple - **_"One size doesn't fit all"_**! Making a choice between providing "In-System Development" in the cloud and adding support for a new language _(Java, C#, PHP, ...)_, is really easy. The new language doesn't really add much to the uniqueness and usability of the platform, as the In-System development model does!

## Architecture

The goal of the In-System development model is to ultimately change the state of the system while it's up and running, without affecting the overall performance and without service degradation. You can easily think of several such systems like Programmable Microcontrollers, Relational Database Management Systems, ABAP. As mentioned earlier, Dirigible provides a suitable design time and runtime for that, so let's talk a little bit about the architecture. The Dirigible stack is pretty simple:

![Dirigible Architecture](/img/posts/20180222/architecture.png){: .img-responsive }

The building blocks are:

- **Application Server** _(provided)_
- **Runtime** _(built-in)_
  - **Engine(s)** - _(Rhino/Nashorn/V8)_
  - **Repository** - _(fs/database)_
- **Design Time** _(built-in)_
  - **Web IDE** _(workspace/database/git/... perspective)_
- **Applications** _(developed)_
  - Application _(database/rest/ui)_
  - Application _(indexing/messaging/job)_
  - Application _(extensionpoint/extension)_
  - ...

## Enterprise JavaScript

The language of choice in the Dirigible business application platform is **JavaScript**! But why JavaScript? Why not Java? Is it mature enough, is it scalable, can it satisfy the business application needs? The answer is: It sure does! The code that is being written is similar to Java. The developers can write their business logic in a synchronous fashion and can leverage a large set of Enterprise JavaScript APIs. For heavy loads, the Dirigible stack performs better than the NodeJS due to multithreading of the underlying JVM and the application server, and using the same V8 engine underneath.

### Examples

- _**Request/Response API**_

    ```javascript
    var response = require('http/v3/response');

    response.println("Hello World!");
    response.flush();
    response.close();
    ```

- _**Database API**_:

    ```javascript
    var database = require('db/v3/database');
    var response = require('http/v3/response');

    var connection = database.getConnection();
    try {
        var statement = connection.prepareStatement("select * from MY_TABLE where MY_PATH like ?");
        var i = 0;
        statement.setString(++i, "%");
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            response.println("[path]: " + resultSet.getString("MY_PATH"));
        }
        resultSet.close();
        statement.close();
    } catch(e) {
        console.trace(e);
        response.println(e.message);
    } finally {
        connection.close();
    }

    response.flush();
    response.close();
    ```

The provided **Enterprise JavaScript APIs** leverage some of the mature Java specifications and de facto standards (e.g. JDBC, Servlet, CMIS, ActiveMQ, File System, Streams, etc.). Eliminating the build process _(due to the lack of compilation)_ and at the same time exposing proven frameworks _(that does the heavy lifting)_, results in having the perfect environment for in-system development of business applications, with close to **_"Zero Turn-Around-Time"_**. In conclusion, the Dirigible platform is really tailored to the needs of _Business Application Developers_.

## Getting Started

1. **_Download_**
    - Get the latest **_release_** from: [http://download.eclipse.org/dirigible](http://download.eclipse.org/dirigible)
    - The latest **_master_** branch can be found at: [https://github.com/eclipse/dirigible](https://github.com/eclipse/dirigible)
    - Download the latest _Tomcat 8.x_ from: [https://tomcat.apache.org/download-80.cgi](https://tomcat.apache.org/download-80.cgi)
    > _**NOTE:** You can use the **try out** instance, that is available at [http://dirigible.eclipse.org](http://dirigible.eclipse.org) and skip through the **Develop** section_

1. **_Start_**
    - Put the **_ROOT.war_** into the _**${tomcat-dir}/webapps**_ directory
    - Execute _**./catalina.sh start**_ from the _**${tomcat-dir}/bin**_ directory
1. **_Login_**
    - Open: [http://localhost:8080](http://localhost:8080)
    - Log in with the default _**dirigible/dirigible**_ credentials
    ![Login](/img/posts/20180222/login.gif){: .img-responsive }
1. **_Develop_**
    - Project
        1. Create a project
            - Click _**+ -> Project**_

            ![Create Project](/img/posts/20180222/project.gif){: .img-responsive }

    - Database table
        1. Generate a _**Database Table**_
            - Right-click _**New > Generate > Database table**_
            ![Generate a Database Table](/img/posts/20180222/generate.gif){: .img-responsive }
        1. Edit the _**students.table**_ definition
            ```json
            {
                "name": "Students",
                "type": "TABLE",
                "columns": [{
                    "name": "ID",
                    "type": "INTEGER",
                    "primaryKey": "true"
                }, {
                    "name": "FIRST_NAME",
                    "type": "VARCHAR",
                    "length": "50"
                }, {
                    "name": "LAST_NAME",
                    "type": "VARCHAR",
                    "length": "50"
                }, {
                    "name": "AGE",
                    "type": "INTEGER"
                }]
            }
            ```
        1. Publish
            - Right-click the project and select _**Publish**_
            > _**NOTE:** The auto publish function is enabled by default_
        1. Explore
            - The database scheme can be explored from the **_Database perspective_**
            - Click _**Window > Open Perspective > Database**_
            - Insert some sample data
                ```sql
                insert into students values(1, 'John', 'Doe', 25)
                insert into students values(2, 'Jane', 'Doe', 23)
                ```
            > _**Note:** The perspectives are available also from the side menu_
    - REST service
        1. Generate a _**Hello World**_ service
            - Right-click _**New > Generate > Hello World**_
        1. Edit the _**students.js**_ service
            ```javascript
            var database = require('db/v3/database');
            var response = require('http/v3/response');

            var students = listStudents();

            response.println(students);
            response.flush();
            response.close();

            function listStudents() {
                let students = [];
                var connection = database.getConnection();
                try {
                    var statement = connection.prepareStatement("select * from STUDENTS");
                    var resultSet = statement.executeQuery();
                    while (resultSet.next()) {
                        students.push({
                            'id': resultSet.getInt('ID'),
                            'firstName': resultSet.getString('FIRST_NAME'),
                            'lastName': resultSet.getString('LAST_NAME'),
                            'age': resultSet.getInt('AGE')
                        });
                    }
                    resultSet.close();
                    statement.close();
                } catch(e) {
                    console.error(e);
                   response.println(e.message);
                } finally {
                    connection.close();
                }
                return students;
            }
            ```
        1. Explore
            - The _**student.js**_ service is accessible through the _**Preview**_ view
        > _**NOTE:** All backend services are up and running after save/publish, due to the In-System Development_
    - Create a UI
        1. Generate a  _**HTML5 (AngularJS)**_ page
            - Right-click _**New > Generate > HTML5 (AngularJS)**_
        1. Edit the page
            ```html
            <!DOCTYPE html>
            <html lang="en" ng-app="page">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="description" content="">
                <meta name="author" content="">

                <link type="text/css" rel="stylesheet" href="/services/v3/core/theme/bootstrap.min.css">
                <link type="text/css" rel="stylesheet" href="/services/v3/web/resources/font-awesome-4.7.0/css/font-awesome.min.css">

                <script type="text/javascript" src="/services/v3/web/resources/angular/1.4.7/angular.min.js"></script>
                <script type="text/javascript" src="/services/v3/web/resources/angular/1.4.7/angular-resource.min.js"></script>
            </head>

            <body ng-controller="PageController">
                <div>
                    <div class="page-header">
                        <h1>Students</h1>
                    </div>
                    <div class="container">
                        <table class="table table-hover">
                            <thead>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                            </thead>
                            <tbody>
                                <tr ng-repeat="student in students">
                                    {% raw %}<td>{{student.id}}</td>
                                    <td>{{student.firstName}}</td>
                                    <td>{{student.lastName}}</td>
                                    <td>{{student.age}}</td>{% endraw %}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <script type="text/javascript">
                    angular.module('page', []);
                    angular.module('page').controller('PageController', function ($scope, $http) {

                        $http.get('../../js/university/students.js')
                        .success(function(data) {
                            $scope.students = data;
                        });
                    });
                </script>

            </body>
            </html>
            ```

## "What's next?"

The _In-System Development_ model provides the _business application developers_ with the right toolset for rapid application development. By leveraging a few built-in _templates_ and the _Enterprise JavaScript API_, whole vertical scenarios can be set up in several minutes. With the close to _Zero Turn-Around-Time_, changes in the backend can be made and applied on the fly, through an elegant Web IDE. The perfect fit for your _digital transformation_!

> The goal of the Dirigible platform is clear - ease the developers as much as possible and let them concentrate on the development of critical business logic.

So, what's next? Can I provide my own set of templates? Can I expose a new Enterprise JavaScript API? Can I provide a new perspective/view? Can I build my own Dirigible stack? Can it be integrated with the services of my cloud provider?

To all these questions, the answer is simple: **_Yes_**, you can do it!

## Resources

- Site: [http://www.dirigible.io](http://www.dirigible.io)
- Help: [http://www.dirigible.io/help/](http://www.dirigible.io/help/)
- API: [http://www.dirigible.io/api/](http://www.dirigible.io/api/)
- YouTube: [https://www.youtube.com/c/dirigibleio](https://www.youtube.com/c/dirigibleio)
- Facebook: [https://www.facebook.com/dirigible.io](https://www.facebook.com/dirigible.io)
- Twitter: [https://twitter.com/dirigible_io](https://twitter.com/dirigible_io)

**Enjoy!**
