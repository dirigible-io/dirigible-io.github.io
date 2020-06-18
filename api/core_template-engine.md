---
layout: api
title: Template Engine
icon: fa-check
---

{{ page.title }}
===

> ⚠ Deprecated, migrated to [platform/template-engines](platform_template-engines.html)

The object is used for processing of templates

Version 4.x
---

- Module: **core/v4/template-engine**
- Alias: **core/template-engine**
- Definition: [https://github.com/eclipse/dirigible/issues/507](https://github.com/eclipse/dirigible/issues/507)
- Source: [/core/v4/template-engine.js](https://github.com/dirigiblelabs/api-core/blob/master/core/v4/template-engine.js)
- Facade: [TemplateEngineFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-core/src/main/java/org/eclipse/dirigible/api/v3/core/TemplateEngineFacade.java)
- Status: **stable**

### Basic Usage

```javascript
var response = require("http/v4/response");
var templateEngine = require("core/v4/template-engine");

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

var result = templateEngine.generate(template, parameters);

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

#### TemplateEngine

---

Function     | Description | Returns
------------ | ----------- | --------
**generate(template, parameters)**   | Returns the result of the generation | *string*
**setSm(sm)**   | (mustache only) Sets the expression start symbol, default is *\{{* | *-*
**setEm(Em)**   | (mustache only) Sets the expression end symbol, default is *\}}* | *-*


### Compatibility

Rhino | Nashorn | V8 | Graal |
----- | ------- | ---| ------|
 ✅   | ❌      | ❌  |  ✅   |

---
