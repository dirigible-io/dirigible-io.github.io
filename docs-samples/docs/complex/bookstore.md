---
title: Bookstore Application
hide:
  - toc
---

Bookstore Application
===

This sample shows how to create a simple web application for managing a single entity called **Books**.
It contains a database table definition, a RESTful service and a web page for managing the instances via user interface. 

### Steps

#### Project

1. Create a project **babylon_project**

#### Database Descriptor


1. Then create a database table description named **BABYLON_BOOKS.table** under the folder **data**
2. Replace the service code with the following content:

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
            "scale": ""
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

#### Data Access Object

1. Create a JavaScript service named **Books.js** under the folder **dao**.
2. Replace the service code with the following content:

```javascript

var daoApi = require('db/v4/dao');
var dao = daoApi.create({
	'table': 'BABYLON_BOOKS',
	'properties': [
		{
			'name':  'id',
			'column': 'BOOK_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'isbn',
			'column': 'BOOK_ISBN',
			'type':'CHAR',
			'id': false,
			'required': false
		},		{
			'name':  'title',
			'column': 'BOOK_TITLE',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'publisher',
			'column': 'BOOK_PUBLISHER',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'date',
			'column': 'BOOK_DATE',
			'type':'DATE',
			'id': false,
			'required': true
		},		{
			'name':  'price',
			'column': 'BOOK_PRICE',
			'type':'DOUBLE',
			'id': false,
			'required': true
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};

```

#### RESTful Service

1. Then create a **Books.js** service file under the folder **service**
2. Replace the content with the following code:

```javascript

var rs = require('http/v4/rs');
var dao = require('babylon_project/dao/Books');
var response = require('http/v4/response');

// HTTP 200
var sendResponseOk = function(entity) {
	sendResponse(200, entity);
};

// HTTP 201
var sendResponseCreated = function(entity) {
	sendResponse(201, entity);
};

// HTTP 200
var sendResponseNoContent = function() {
	sendResponse(204);
};

// HTTP 400
var sendResponseBadRequest = function(message) {
	sendResponse(404, {
		'code': 400,
		'message': message
	});
};

// HTTP 404
var sendResponseNotFound = function(message) {
	sendResponse(404, {
		'code': 404,
		'message': message
	});
};

// Generic
var sendResponse = function(status, body) {
	response.setContentType('application/json');
	response.setStatus(status);
	if (body) {
		response.println(JSON.stringify(body));
	}
};


rs.service()
	.resource('')
		.get(function() {
			var entities = dao.list();
			sendResponseOk(entities);
		})
	.resource('{id}')
		.get(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
			    sendResponseOk(entity);
			} else {
				sendResponseNotFound('Books not found');
			}
		})
	.resource('')
		.post(function(ctx, request, response) {
			var entity = request.getJSON();
			entity.id = dao.create(entity);
			response.setHeader('Content-Location', '/services/v4/js/babylon_project/service/Books.js/' + entity.id);
			sendResponseCreated(entity);
		})
	.resource('{id}')
		.put(function(ctx, request) {
			var entity = request.getJSON();
			entity.id = ctx.pathParameters.id;
			dao.update(entity);
			sendResponseOk(entity);
		})
	.resource('{id}')
		.delete(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
				dao.delete(id);
				sendResponseNoContent();
			} else {
				sendResponseNotFound('Books not found');
			}
		})
.execute();

```

#### User Interface

1. Then create a **index.html** web page under the folder **view**
2. Replace the content with the following code:

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
	<link type="text/css" rel="stylesheet" href="/services/v4/web/resources/font-awesome-4.7.0/css/font-awesome.min.css">
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
					<th class="text-capitalize">id</th>
					<th class="text-capitalize">isbn</th>
					<th class="text-capitalize">title</th>
					<th class="text-capitalize">publisher</th>
					<th class="text-capitalize">date</th>
					<th class="text-capitalize">price</th>
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
						<i class="close fa fa-2x fa-pencil" ng-click="openEditDialog(next)" style="margin-right: 0.5em"></i>
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
					<h3 ng-show="actionType === 'update'" class="modal-title" id="exampleModalLabel">Update entity</h3>
					<h3 ng-show="actionType === 'delete'" class="modal-title" id="exampleModalLabel">Delete entity</h3>
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
							<input type="text" class="form-control" placeholder="Enter title" ng-model="entity.title">
						</div>
						<div class="form-group">
							<label>Publisher</label>
							<input type="text" class="form-control" placeholder="Enter publisher" ng-model="entity.publisher">
						</div>
						<div class="form-group">
							<label>Date</label>
							<input type="date" class="form-control" placeholder="Enter date" ng-model="entity.date">
						</div>
						<div class="form-group">
							<label>price</label>
							<input type="number" class="form-control" placeholder="Enter price" ng-model="entity.price">
						</div>
					</form>
					<div ng-show="actionType === 'delete'">
						You are going to delete <b>Books</b> with <b>id = {{entity.id}}</b>.
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" ng-show="actionType === 'new'" ng-click="create()">Save</button>
					<button type="button" class="btn btn-primary" ng-show="actionType === 'update'" ng-click="update()">Update</button>
					<button type="button" class="btn btn-primary" ng-show="actionType === 'delete'" ng-click="delete()">Delete</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<script type="text/javascript" src="/services/v4/web/resources/jquery/2.0.3/jquery.min.js"></script>
	<script type="text/javascript" src="/services/v4/web/resources/bootstrap/3.3.7/bootstrap.min.js" async></script>
	<script type="text/javascript" src="/services/v4/web/resources/angular/1.4.7/angular.min.js"></script>
	<script type="text/javascript" src="/services/v4/web/resources/angular/1.4.7/angular-resource.min.js"></script>

	<script type="text/javascript" src="controller.js"></script>

</body>
</html>

```

3. Create the controller file as **controller.js** under the same **view** folder next to the *index.html*
4. Replace the content with the following code:

```javascript

angular.module('page', []);
angular.module('page').controller('PageController', function ($scope, $http) {

	var api = '/services/v4/js/babylon_project/service/Books.js';



	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.id)
		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};


	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});

```

#### Publish and Preview

5. Publish the project
6. Select the *index.html* in the *Workspace* view
7. In the *Preview* window you should see the web page for books management.
8. Try to enter a few book descriptions to test how it works.

---

For more information, see the *[API](../api/)* documentation.
