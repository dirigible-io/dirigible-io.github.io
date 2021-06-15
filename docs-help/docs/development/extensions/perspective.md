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

* `module` points to the corresponding perspective descriptor (see below)
* `extensionPoint` is the name of the built-in extension point to which the current plugin will contribute


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

* `name` is the exact name of the perspective, which will be shown in the e.g. menu
* `link` is the location within the same or external project pointing to the entry HTML file which will be rendered as a perspective
* `order` a number used in sorting of the perspectives
* `image` is the name of the image which will be used for this perspective


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

In general you can embed any valid HTML in the `index.html` file above and will will be rendered in the place where the perspective should be embedded.
In case you would like to align with the overall styling of the Web IDE as well to enable the messaging between your perspective and the Web IDE core, status bar, side bar, etc., you may want to use the template below:

```html
<!DOCTYPE html>
<html lang="en" ng-app="my-perspective" ng-controller="MyPerspectiveController as controller">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title brandtitle perspective-name="My Perspective"></title>
    <link brandicon/>
    <!-- FontAwesome icon set -->
    <link type="text/css" href="../../../../services/v4/web/resources/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <!-- Twitter Bootstrap with Theme Support -->
    <link type="text/css" rel="stylesheet" href="../../../../services/v4/js/theme/resources.js/bootstrap.min.css">
    <!-- GoldenLayout with Theme Support -->
    <link type="text/css" rel="stylesheet" href="../../../../services/v4/web/resources/goldenlayout/1.5.9/goldenlayout-base.css" />
    <link type="text/css" rel="stylesheet" href="../../../../services/v4/js/theme/resources.js/goldenlayout-theme.css" />
    <!-- Custom IDE Styles -->
    <link type="text/css" rel="stylesheet" href="../../../../services/v4/js/theme/resources.js/ide.css" />
  </head>
  <body>
    <div menu menu-data-url="../../js/my-project/services/menu-my-perspective.js"></div>
    <div class="shell">
      <div class="sidebar list-group" sidebar active="my-perspective"></div>
      <div id="my-perspective" class="plane" views-layout views-layout-model="controller.layoutModel"></div>
    </div>
    <div class="statusbar" status-bar>{{message}}</div>
    <!-- jQuery -->
    <script type="text/javascript" src="../../../../services/v4/web/resources/jquery/2.0.3/jquery.min.js"></script>
    <!-- Twitter Bootstrap with Theme Support -->
    <script type="text/javascript" src="../../../../services/v4/web/resources/bootstrap/3.3.7/bootstrap.min.js"></script>
    <!-- AngularJS -->
    <script type="text/javascript" src="../../../../services/v4/web/resources/angular/1.4.7/angular.min.js"></script>
    <script type="text/javascript" src="../../../../services/v4/web/resources/angular/1.4.7/angular-resource.min.js"></script>
    <!-- GoldenLayout with Theme Support -->
    <script type="text/javascript" src="../../../../services/v4/web/resources/goldenlayout/1.5.9/goldenlayout.min.js"></script>
    <script type="text/javascript" src="../../../../services/v4/web/ide-core/ui/message-hub.js"></script>	
    <script type="text/javascript" src="../../../../services/v4/web/ide-core/ui/ui-layout.js"></script>
    <script type="text/javascript" src="../../../../services/v4/web/ide-core/ui/ui-core-ng-modules.js"></script>
    <script type="text/javascript">
      angular.module('controller', ['ngResource', 'ideUiCore'])
          .config(["messageHubProvider", function(messageHubProvider) {
              messageHubProvider.evtNamePrefix = 'my-perspective';
          }])	
          .controller('MyPerspectiveController', ['Layouts', function (Layouts) {
              this.layoutModel = {
                  views: ['console'],
          };
          var messageHub = new FramesMessageHub();
          var send = function(evtName, data, absolute){
              messageHub.post({data: data}, (absolute ? '' : 'my-perspective.') + evtName);
          };
          var run = function() {
              send("repository.run", metadata, false);
          }
      }]);
      window.addEventListener('beforeunload', function (e) {
          e.preventDefault();
          e.returnValue = '';
      });
    </script>	
  </body>
</html>
```

For а real world example you can look at [Database Perspective Project](https://github.com/dirigiblelabs/ide-database)




