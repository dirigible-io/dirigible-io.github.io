---
title: View
---

Extension - View
===

Descriptors
---

To contribute a new View to the Web IDE you need to create one model _(`*.extension`)_ and one descriptor _(in `*.js`)_ files in your project:

**my-view.extension**

```json
{
	"module": "my-project/services/my-view.js",
	"extensionPoint": "ide-view",
	"description": "The description of my view"
}
```

* `module` points to the corresponding view descriptor (see below)
* `extensionPoint` is the name of the built-in extension point to which the current plugin will contribute


**my-view.js**

```javascript
exports.getView = function() {
	var view = {
		name: "My View",
		factory: "frame",
		region: "center-bottom",
		label: "My View",
		link: "../my-project/index.html"
	};
	return view;
};
```

* `name` is the exact name of the view, which will be shown in the e.g. menu
* `factory` the type of the factory used during instantiating the view
* `region` the region where the view will be placed initially
* `label` the name which will be used in the heading bar
* `link` is the location within the same or external project pointing to the entry HTML file which will be rendered as a view



The project structure in this case should look like this:

``` hl_lines="3 5"
| my-project
|---- extensions
     |----> my-view.extension
|---- services
     |----> my-view.js
|---- index.html
|---- js
|---- css
|---- ...

```

The names of the `extensions` and `services` can be different following the layout of your project.
   
---

Implementation
---

```html
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="utf-8" />
		
		<title>My View</title>
	
		<link href="../../../../services/v4/web/resources/font-awesome-4.7.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">
		
		<!-- AngularJS -->
		<script src="../../../../services/v4/web/resources/angular/1.4.7/angular.min.js"></script>
		<script src="../../../../services/v4/web/resources/angular/1.4.7/angular-resource.min.js"></script>
		
		<!-- jQuery -->
		<script src="../../../../services/v4/web/resources/jquery/2.0.3/jquery.min.js"></script>
		
		<!-- Twitter Bootstrap with Theme Support -->
		<link rel="stylesheet" href="../../../../services/v4/js/theme/resources.js/bootstrap.min.css">
		<script src="../../../../services/v4/web/resources/bootstrap/3.3.7/bootstrap.min.js"></script>
		
		<script src="../../../../services/v4/web/ide-core/ui/message-hub.js"></script>
		<script src="controller.js"></script>
	
		<!-- Custom IDE Styles -->
		<link type="text/css" rel="stylesheet" href="../../../../services/v4/js/theme/resources.js/ide.css" />
		
	</head>
	
	<body ng-app="my-view" ng-controller="MyViewController as myview" class="view">
	    <form class="input-group" name="viewForm">
		  	<span class="input-group-btn">
				<button class="btn btn-default" type="button" ng-click="myViewClick()"><i class="fa fa-bolt"></i></button>
			</span>
	    </form>
	</body>
</html>
```

For а real world example you can look at [Preview View](https://github.com/dirigiblelabs/ide-preview.git)

