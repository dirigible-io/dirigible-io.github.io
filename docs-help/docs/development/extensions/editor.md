----
title: Editor
----

Editor
===

## Descriptors
----

To contribute a new Editor (text-based or form-based) to the Web IDE you need to create one model _(`*.extension`)_ and one descriptor _(in `*.js`)_ files in your project:

### my-editor.extension

```json
{
	"module": "my-project/services/my-editor.js",
	"extensionPoint": "ide-editor",
	"description": "The description of my editor"
}
```

- `module` points to the corresponding view descriptor (see below)
- `extensionPoint` is the name of the built-in extension point to which the current plugin will contribute


### my-editor.js

```javascript
exports.getView = function() {
	var view = {
		name: "My Editor",
		factory: "frame",
		region: "center-top",
		link: "../my-project/index.html",
		contentTypes: [ "application/json" ]
	};
	return view;
};
```


- `name` is the exact name of the view, which will be shown in the e.g. menu
- `factory` the type of the factory used during instantiating the view
- `region` the region where the view will be placed initially
- `link` is the location within the same or external project pointing to the entry HTML file which will be rendered as a view
- `contentTypes` the content types array of supported files



The project structure in this case should look like this:

``` hl_lines="3 5"
| my-project
|---- extensions
     |----> my-editor.extension
|---- services
     |----> my-editor.js
|---- index.html
|---- js
|---- css
|---- ...

```

The names of the extensions and services can be different following the layout of your project
   
----

## Implementation
----

```html
<!DOCTYPE html>
<html lang="en" ng-app="editor">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
	
		<link type="text/css" rel="stylesheet" href="../../../../../services/v4/js/theme/resources.js/bootstrap.min.css">
		<link type="text/css" rel="stylesheet" href="../../../../../services/v4/web/resources/font-awesome-4.7.0/css/font-awesome.min.css">
		<link type="image/png" rel="shortcut icon" href="../../../../../services/v4/web/resources/images/favicon.png" />
		
		<!-- Custom IDE Styles -->
		<link type="text/css" rel="stylesheet" href="../../../../../services/v4/js/theme/resources.js/ide.css" />
	</head>
	<body ng-controller="EditorController">
		<div class="container">
			<div class="page-header">
				<h1>My Editor Description: {{file}}</h1>
			</div>
			<form>
				<div class="form-group">
					<label>Group</label>
					<input type="text" class="form-control" ng-model="myModel.group" value="">
				</div>
				
				...
				
				<button type="button" class="btn btn-primary" ng-click="save()">Save</button>
			</form>
		</div>
	
	
		<script type="text/javascript" src="../../../../../services/v4/web/resources/jquery/2.0.3/jquery.min.js"></script>
		<script type="text/javascript" src="../../../../../services/v4/web/resources/bootstrap/3.3.7/bootstrap.min.js" async></script>
		<script type="text/javascript" src="../../../../../services/v4/web/resources/angular/1.4.7/angular.min.js"></script>
		<script type="text/javascript" src="../../../../../services/v4/web/resources/angular/1.4.7/angular-resource.min.js"></script>
	
		<script src="../../../../../services/v4/web/ide-core/ui/message-hub.js"></script>
	
		<script type="text/javascript" src="editor.js"></script>
	
	</body>
</html>
```
For а real world example you can look at [Jobs Plugin](https://github.com/dirigiblelabs/ide-jobs) or [Monaco Editor](https://github.com/dirigiblelabs/ide-monaco)

