---
title: Perspective
---

Perspective
===

## Descriptors
---

To contribute a new Perspective to the Web IDE you need to create one model (`*.extension`) and one descriptor (in `*.js`) files in your project:

### my-perspective.extension

```json
{
    "module": "my-project/services/my-perspective.js",
    "extensionPoint": "ide-perspective",
    "description": "The description of my perspective"
}
```

* `module` - Points to the corresponding perspective descriptor (see below).
* `extensionPoint` - Where and how this perspective will be shown. Some of the possible values are:

    - ide-perspective
    - ide-view
    - ide-editor
    - ide-database-menu
    - ide-documents-content-type
    - ide-workspace-menu-new-template


### my-perspective.js

```javascript
exports.getPerspective = function() {
    var perspective = {
        name: "My Perspective",
        link: "../my-project/index.html",
        order: "901",
        image: "files-o"
    };
    return perspective;
};
```

* `name` - The exact name of the perspective.
* `link` - The location within the same or external project pointing to the entry HTML file which will be rendered as a perspective
* `order` - Used to sort the perspective tabs in the sidebar.
* `image` - The name of the image which will be used for this perspective. This is a Font awesome icon name.


The project structure in this case should look like this:

``` hl_lines="3 5"
| my-project
|---- extensions
     |----> my-perspective.extension
|---- services
     |----> my-perspective.js
|---- index.html
|---- js
|---- css
|---- ...

```

The names of the extensions and services can be different following the layout of your project.

---

## Implementation
---

In general you can embed any valid HTML in the `index.html` file and it will be rendered in the place where the perspective should be embedded.

For a full example you can look at [sample-ide-perspective](https://github.com/dirigiblelabs/sample-ide-perspective).

For а real world example you can look at [Database Perspective Project](https://github.com/dirigiblelabs/ide-database).