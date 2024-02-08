---
title: Template Engines
---

Template Engines
===

Template Engines group creates instances for Velocity, Mustache and JavaScript template engines.

=== "Overview"
- Module: `template/engines`
- Definition: N/A
- Source: [/template/engines.js](https://github.com/eclipse/dirigible/blob/master/components/api-template/src/main/resources/META-INF/dirigible/template/engines.js)
- Status: `stable`
- Group: `platform`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { engines } from "sdk/template"
    import { response } from "sdk/http";

    let mustache = engines.getMustacheEngine();
    let generated = mustache.generate('Hello {{name}}', [['name', 'John Smith']]);

    response.println(generated);

    response.flush();
    response.close();
    ```

<!-- === "CommonJS"

    ```javascript
    const engines = require("template/engines");
    const response = require("http/response");

    let mustache = engines.getMustacheEngine();
    let generated = mustache.generate('Hello {{name}}', [['name', 'John Smith']]);

    response.println(generated);

    response.flush();
    response.close();
    ``` -->

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getDefaultEngine()**   | Creates a default template engine (Velocity) | *TemplateEngine*
**getVelocityEngine()**   | Creates the Velocity template engine | *TemplateEngine*
**getMustacheEngine()**   | Creates the Mustache template engine | *TemplateEngine*
**getJavascriptEngine()**   | Creates the Javascript template engine | *TemplateEngine*
**generate(template, parameters)**   | Generate content using the provided `template` and the default engine and `parameters` provided | *string*
**generateFromFile(location, parameters)**   | Generate content using the template from `location` and the default engine and `parameters` provided | *string*

### Objects

---

#### TemplateEngine

Function     | Description | Returns
------------ | ----------- | --------
**generate(template, parameters)**   | Generate content using the provided `template` with `parameters` | *string*
**setSm(sm)**   | Set start markup for parameters | *-*
**setEm(em)**   | Set end markup for parameters | *-*



