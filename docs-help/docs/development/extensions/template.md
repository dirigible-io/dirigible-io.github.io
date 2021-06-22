---
title: Template
---

Template
===

## Descriptors
---

To contribute a new Template to the Web IDE you need to create one model (`*.extension`) and one descriptor (in `*.js`) files in your project:

### my-template.extension

```json
{
  "module": "my-project/services/my-template.js",
  "extensionPoint": "ide-template",
  "description": "The description of my template"
}
```

* `module` - Points to the corresponding template descriptor (see below).
* `extensionPoint` - The name of the built-in extension point to which the current plugin will contribute.


### my-template.js

```javascript
exports.getTemplate = function() {
  var template = {
    name: "My Template",
    description: "My cool template",
    extension: "myfile",
    sources: [
      {
        location: "/my-project/my-source.template",
        action: "generate",
        rename: "{{fileName}}.",
        engine: "velocity",
        start : "[[",
        end : "]]"
      }
    ],
    parameters: []
  };
  return template;
};
```

* `name` - The exact name of the template, which will be shown in drop-down boxes.
* `description` - Text associated with the template.
* `extension` - Optional, if present the template will be shown only if a given file with the specified extension is selected.
* `sources` - The list of the templates which will be used during the generation phase.
  * `location` - The relative path to the template.
  * `action` - The type of the processing which will be used for this templates.
  * `rename` - If renaming of the target artifact will be needed.
  * `engine` - The template engine which will be used for this template - "mustache" (default), "velocity" and "javascript".
  * `start` and `end` - Tags if the default "{{" and "}}" are not applicable.
  * `handler` - The javascript transformation service, in case of `javascript` engine.
* `parameters` - The list of parameters if any which will be passed to the generator.


The project structure in this case should look like this:

``` hl_lines="3 5"
| my-project
|---- extensions
     |----> my-template.extension
|---- services
     |----> my-template.js
|---- index.html
|---- js
|---- css
|---- ...

```

The names of the extensions and services can be different following the layout of your project

---

## Implementation
---

```html
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <title>${fileName}</title>
  </head>
  <body ng-app="my-view" ng-controller="MyController as controller" class="view">
    <form class="input-group" name="myForm">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" ng-click="myClick()"><i class="fa fa-bolt"></i></button>
      </span>
    </form>
  </body>
</html>
```

For а real world example you can look at [Bookstore Template](https://github.com/dirigiblelabs/template-bookstore)