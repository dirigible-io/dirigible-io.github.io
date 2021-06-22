---
title: View
---

View
===

## Descriptors
---

To contribute a new View to the Web IDE you need to create one model (`*.extension`) and one descriptor (in `*.js`) files in your project:

### my-view.extension

```json
{
	"module": "my-project/services/my-view.js",
	"extensionPoint": "ide-view",
	"description": "The description of my view"
}
```

* `module` - Points to the corresponding view descriptor (see below).
* `extensionPoint` - The name of the built-in extension point to which the current plugin will be shown initially.


### my-view.js

```javascript
exports.getView = function() {
	var view = {
		id: "my-view",
		name: "My View",
		factory: "frame",
		region: "center-bottom",
		label: "My View",
		link: "../my-project/index.html"
	};
	return view;
};
```

* `id` - The unique id of the view.
* `name` - The exact name of the view.
* `factory` - The type of the factory used during instantiating the view.
* `region` - The region where the view will be placed initially.
* `label` - The name which will be used in the heading bar.
* `link` - The location within the same or external project pointing to the entry HTML file which will be rendered as a view.


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

The names of the extensions and services can be different following the layout of your project.

---

Implementation
---

For a full example you can look at [sample-ide-perspective](https://github.com/dirigiblelabs/sample-ide-perspective).

For а real world example you can look at [Preview View](https://github.com/dirigiblelabs/ide-preview.git).