---
layout: api
title: Template Engines
icon: fa-check
---

{{ page.title }}
===

The object is used for processing of templates

Version 4.x
---

- Module: **platform/v4/template-engines**
- Alias: **platform/template-engines**
- Definition: [https://github.com/eclipse/dirigible/issues/507](https://github.com/eclipse/dirigible/issues/507)
- Source: [/platform/v4/template-engines.js](https://github.com/dirigiblelabs/api-platform/blob/master/platform/v4/template-engines.js)
- Facade: [TemplateEngineFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/TemplateEngineFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var response = require("http/v4/response");
var templateEngines = require("platform/v4/template-engines");

var template = 
    "Dear ${name},\n\n"
    + "You have the following bills:\n"
    + "#foreach($next in $bills)"
    + "- ${next.name}: ${next.currencySymbol}${next.value}\n"
    + "#end";

var parameters = {
    name: "John Doe",
    bills: [{
        name: "Electricity",
        currencySymbol: "$",
        value: 150
    }, {
        name: "Cable & Internet",
        currencySymbol: "$",
        value: 80
    }, {
        name: "Phone",
        currencySymbol: "$",
        value: 35
    }]
};

var result = templateEngines.generate(template, parameters);

response.println(result);
```


### Definition

#### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**generate(template, parameters)**   | Returns the result of the generation | *string*
**generateFromFile(location, parameters)**   | Returns the result of the generation | *string*
**getDefaultEngine()**   | Returns the default template engine | *TemplateEngine*
**getMustacheEngine()**   | Returns the [Mustache](https://mustache.github.io/) template engine | *TemplateEngine*
**getVelocityEngine()**   | Returns the [Velocity](https://velocity.apache.org/) template engine | *TemplateEngine*
**getJavascriptEngine()**   | Returns the Javascript template engine | *TemplateEngine*

#### TemplateEngine

---

Function     | Description | Returns
------------ | ----------- | --------
**generate(template, parameters)**   | Returns the result of the generation | *string*
**setSm(sm)**   | (mustache only) Sets the expression start symbol, default is *\{{* | *-*
**setEm(em)**   | (mustache only) Sets the expression end symbol, default is *\}}* | *-*


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
