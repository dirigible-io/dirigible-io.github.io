---
title: Bookstore Application
---

Bookstore Application
===

This sample shows how to create a simple web application for managing a single entity called **Books**.
It contains a database table definition, a RESTful service and a web page for managing the instances via user interface. 

### Steps

#### Project

1. Create a project named `babylon-project`.
#### Database Descriptor

1. Right click on the `babylon-project` project and select **New &#8594; Folder**.
1. Enter `data` for the name of the folder.
1. Right click on the `data` folder and select **New &#8594; Database Table**.
1. Enter `BABYLON_BOOKS.table` for the name of the database table descriptor.
1. Right click on `BABYLON_BOOKS.table` and select **Open With &#8594; Code Editor**.
1. Replace the content with the following definition:

    ```json
    {
        "name": "BABYLON_BOOKS",
        "type": "TABLE",
        "columns": 
        [
            {
                "name": "BOOK_ID",
                "type": "INTEGER",
                "length": "0",
                "primaryKey": "true",
                "identity": "true",
                "precision": "",
                "scale": ""
            },
            {
                "name": "BOOK_ISBN",
                "type": "CHAR",
                "length": "13",
                "primaryKey": "false",
                "identity": "false",
                "precision": "",
                "scale": ""
            },
            {
                "name": "BOOK_TITLE",
                "type": "VARCHAR",
                "length": "120",
                "primaryKey": "false",
                "identity": "false",
                "precision": "",
                "scale": ""
            },
            {
                "name": "BOOK_PUBLISHER",
                "type": "VARCHAR",
                "length": "120",
                "primaryKey": "false",
                "identity": "false",
                "precision": "",
                "scale": ""
            },
            {
                "name": "BOOK_DATE",
                "type": "DATE",
                "length": "20",
                "primaryKey": "false",
                "identity": "false",
                "precision": "",
                "scale": "",
				"nullable": "true"
            },
            {
                "name": "BOOK_PRICE",
                "type": "DOUBLE",
                "length": "20",
                "primaryKey": "false",
                "identity": "false",
                "precision": "",
                "scale": ""
            }
        ],
      "dependencies": []
    }
    ```

1. Save the changes and close the _`Code Editor`_.
1. Double click on `BABYLON_BOOKS.table` to view the definition with the _`Table Editor`_.

!!! info "Save & Publish"
    
	Saving the file will trigger a _`Publish`_ action, which will create the database table in the target database schema.
	Usually this action should take several seconds to complete, after which the database table would be visible in the `Database Perspective`.

	_**Note:** Manual _`Publish`_ can be performed by right clicking on the artifact and selecting `Publish` from the context menu. The _`Publish`_ action can be performed also on project level._

#### Data Access Object

1. Right click on the `babylon-project` project and select **New &#8594; Folder**.
1. Enter `dao` for the name of the folder.
1. Right click on the `dao` folder and select **New &#8594; JavaScript CJS Service**.
1. Enter `Books.js` for the name of the JavaScript Service.
1. Replace the content with the following code:

    ```javascript
    const daoApi = require("db/v4/dao");

    let dao = daoApi.create({
        table: "BABYLON_BOOKS",
        properties: [
            {
                name: "id",
                column: "BOOK_ID",
                type: "INTEGER",
                id: true,
                required: true
            }, {
                name: "isbn",
                column: "BOOK_ISBN",
                type: "CHAR",
                id: false,
                required: false
            }, {
                name: "title",
                column: "BOOK_TITLE",
                type: "VARCHAR",
                id: false,
                required: false
            }, {
                name: "publisher",
                column: "BOOK_PUBLISHER",
                type: "VARCHAR",
                id: false,
                required: false
            }, {
                name: "date",
                column: "BOOK_DATE",
                type: "DATE",
                id: false,
                required: true
            }, {
                name: "price",
                column: "BOOK_PRICE",
                type: "DOUBLE",
                id: false,
                required: true
            }]
    });
    
    exports.list = function (settings) {
        return dao.list(settings);
    };
    
    exports.get = function (id) {
        return dao.find(id);
    };
    
    exports.create = function (entity) {
        return dao.insert(entity);
    };
    
    exports.update = function (entity) {
        return dao.update(entity);
    };
    
    exports.delete = function (id) {
        dao.remove(id);
    };
    ```

#### REST Service

1. Right click on the `babylon-project` project and select **New &#8594; Folder**.
1. Enter `service` for the name of the folder.
1. Right click on the `service` folder and select **New &#8594; JavaScript CJS Service**.
1. Enter `Books.js` for the name of the JavaScript Service.
1. Replace the content the following code:

    ```javascript
    const rs = require("http/v4/rs");
    const dao = require("babylon-project/dao/Books");
    
    rs.service()
        .resource("")
        .get(function (ctx, request, response) {
            let entities = dao.list();
            response.setContentType("application/json");
            response.setStatus(response.OK);
            response.println(JSON.stringify(entities));
        })
    
        .resource("{id}")
        .get(function (ctx, request, response) {
            let id = ctx.pathParameters.id;
            let entity = dao.get(id);
            response.setContentType("application/json");
            if (entity) {
                response.setStatus(response.OK);
                response.println(JSON.stringify(entities));
            } else {
                response.setStatus(response.NOT_FOUND);
                response.println(JSON.stringify({
                    code: response.NOT_FOUND,
                    message: "Book not found"
                }));
            }
        })
    
        .resource("")
        .post(function (ctx, request, response) {
            let entity = request.getJSON();
            entity.id = dao.create(entity);
            response.setHeader("Content-Location", `/services/v4/js/babylon-project/service/Books.js/${entity.id}`);
            response.setStatus(response.CREATED);
        })
    
        .resource("{id}")
        .put(function (ctx, request, response) {
            let entity = request.getJSON();
            entity.id = ctx.pathParameters.id;
            dao.update(entity);
            response.setStatus(response.OK);
        })
    
        .resource("{id}")
        .delete(function (ctx, request, response) {
            let id = ctx.pathParameters.id;
            let entity = dao.get(id);
            if (entity) {
                dao.delete(id);
                response.setStatus(response.NO_CONTENT);
            } else {
                response.setStatus(response.NOT_FOUND);
                response.println(JSON.stringify({
                    code: response.NOT_FOUND,
                    message: "Book not found"
                }));
            }
        })
        .execute();
    ```

#### User Interface

1. Right click on the `babylon-project` project and select **New &#8594; Folder**.
1. Enter `view` for the name of the folder.
1. Right click on the `view` folder and select **New &#8594; HTML5 Page**.
1. Enter `index.html` for the name of the HTML5 Page.
1. Replace the content with the following code:

    ```html
    <!DOCTYPE html>
    <html lang="en" ng-app="page">

        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="">
            <meta name="author" content="">

            <link type="text/css" rel="stylesheet" href="/services/v4/core/theme/bootstrap.min.css">
            <link type="text/css" rel="stylesheet" href="/webjars/fontawesome/4.7.0/css/font-awesome.min.css">
            <link type="image/png" rel="shortcut icon" href="/services/v4/web/resources/images/favicon.png" />
        </head>

        <body ng-controller="PageController">
            <div class="page-header">
                <h1>Manage Books</h1>
            </div>
            <div class="container">
                <button type="button" ng-click="openNewDialog()" class="btn btn-lg btn-primary pull-right">New</button>
                <table class="table product-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th class="text-capitalize">ID</th>
                            <th class="text-capitalize">ISBN</th>
                            <th class="text-capitalize">Title</th>
                            <th class="text-capitalize">Publisher</th>
                            <th class="text-capitalize">Date</th>
                            <th class="text-capitalize">Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="next in data">
                            <td>{{$index + 1}}</td>
                            <td>{{next.id}}</td>
                            <td>{{next.isbn}}</td>
                            <td>{{next.title}}</td>
                            <td>{{next.publisher}}</td>
                            <td>{{next.date}}</td>
                            <td>{{next.price}}</td>
                            <td>
                                <i class="close fa fa-2x fa-remove" ng-click="openDeleteDialog(next)"></i>
                                <i class="close fa fa-2x fa-pencil" ng-click="openEditDialog(next)"
                                    style="margin-right: 0.5em"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="entityModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 ng-show="actionType === 'new'" class="modal-title" id="exampleModalLabel">Create entity</h3>
                            <h3 ng-show="actionType === 'update'" class="modal-title" id="exampleModalLabel">Update entity
                            </h3>
                            <h3 ng-show="actionType === 'delete'" class="modal-title" id="exampleModalLabel">Delete entity
                            </h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form ng-hide="actionType === 'delete'">
                                <div class="form-group">
                                    <label>ISBN</label>
                                    <input type="text" class="form-control" placeholder="Enter isbn" ng-model="entity.isbn">
                                </div>
                                <div class="form-group">
                                    <label>Title</label>
                                    <input type="text" class="form-control" placeholder="Enter title"
                                        ng-model="entity.title">
                                </div>
                                <div class="form-group">
                                    <label>Publisher</label>
                                    <input type="text" class="form-control" placeholder="Enter publisher"
                                        ng-model="entity.publisher">
                                </div>
                                <div class="form-group">
                                    <label>Date</label>
                                    <input type="date" class="form-control" placeholder="Enter date" ng-model="entity.date">
                                </div>
                                <div class="form-group">
                                    <label>price</label>
                                    <input type="number" class="form-control" placeholder="Enter price"
                                        ng-model="entity.price">
                                </div>
                            </form>
                            <div ng-show="actionType === 'delete'">
                                You are going to delete <b>Books</b> with <b>id = {{entity.id}}</b>.
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" ng-show="actionType === 'new'"
                                ng-click="create()">Save</button>
                            <button type="button" class="btn btn-primary" ng-show="actionType === 'update'"
                                ng-click="update()">Update</button>
                            <button type="button" class="btn btn-primary" ng-show="actionType === 'delete'"
                                ng-click="delete()">Delete</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <script type="text/javascript" src="/webjars/jquery/3.6.0/jquery.min.js"></script>
            <script type="text/javascript" src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js" async></script>
            <script type="text/javascript" src="/webjars/angularjs/1.8.2/angular.min.js"></script>
            <script type="text/javascript" src="/webjars/angularjs/1.8.2/angular-resource.min.js"></script>

            <script type="text/javascript" src="controller.js"></script>

        </body>

    </html>
    ```

1. Right click on the `view` folder and select **New &#8594; File**.
1. Enter `controller.js` for the name of the file.
1. Replace the content with the following code:

```javascript
angular.module('page', []);
angular.module('page').controller('PageController', function ($scope, $http) {

    let api = '/services/v4/js/babylon-project/service/Books.js';

    function load() {
        $http.get(api)
            .then(function (response) {
                $scope.data = response.data;
            });
    }
    load();

    $scope.openNewDialog = function () {
        $scope.actionType = 'new';
        $scope.entity = {};
        toggleEntityModal();
    };

    $scope.openEditDialog = function (entity) {
        $scope.actionType = 'update';
        $scope.entity = entity;
        toggleEntityModal();
    };

    $scope.openDeleteDialog = function (entity) {
        $scope.actionType = 'delete';
        $scope.entity = entity;
        toggleEntityModal();
    };

    $scope.close = function () {
        load();
        toggleEntityModal();
    };

    $scope.create = function () {
        $http.post(api, JSON.stringify($scope.entity))
            .then(function (data) {
                load();
                toggleEntityModal();
            }).error(function (data) {
                alert(JSON.stringify(data));
            });

    };

    $scope.update = function () {
        $http.put(api + '/' + $scope.entity.id, JSON.stringify($scope.entity))
            .then(function (data) {
                load();
                toggleEntityModal();
            }).error(function (data) {
                alert(JSON.stringify(data));
            })
    };

    $scope.delete = function () {
        $http.delete(api + '/' + $scope.entity.id)
            .then(function (data) {
                load();
                toggleEntityModal();
            }).error(function (data) {
                alert(JSON.stringify(data));
            });
    };


    function toggleEntityModal() {
        $('#entityModal').modal('toggle');
    }
});
```

#### Publish and Preview

1. _(optional)_ Right click on the `babylon-project` project and select `Publish`.
1. Select the `index.html` in the `Projects` view
1. In the `Preview` window you should see the web page for books management.
1. Try to enter a few book descriptions to test how it works.
