---
layout: help
---

Extension Definitions
===

Extensibility is important requirement for the business applications built to follow the custom processes in LoB areas.
There are well known patterns already in the most popular languages and frameworks such as plugins in Eclipse, BAdIs in ABAP, services in Java, etc.
In the toolkit it has been choosen the simplest yet most powerful way to define extensions. It provides just a generic description of the extension points and extensions, without explicitly define the contract.

h3. Extension Points
The Extension Point is the place in the core module, where it is expected to be enhanced by the custom created modules.
It is a simple JSON formated file with extension *.extensionpoint* placed in the project folder "Extension_Definitions".

<pre><code>{
  "extension-point":"/project1/extensionPoint1",
  "description":"description for the extension point 1"
}
</code></pre>

h3. Extensions
The Extension is the actual plugin in the custom module, which extends the core functionality
It is also a simple JSON formated file with extension *.extension* in the same folder.

<pre><code>{
  "extension":"/project1/extension1",
  "extension-point":"/project1/extensionPoint1",
  "description":"description for the extension 1"
}
</code></pre>

<pre><code>The *"extension"* parameter above should point to a valid [Scripting Service](scripting_services.html) in the same language.
</code></pre>

Calling Extensions
---

Within the core module you can iterate over the defined extensions and call theirs functions:

<pre><code>var extensions = extensionManager.getExtensions("/project1/extensionPoint1");
for (var i=0;i\<extensions.length;i++) {
    var extension = require(extensions[i]);
    response.getWriter().println(extension.enhanceProcess());
}
</code></pre>

In the code above the extension is a JavaScript Service Library (*extension1.jslib*) within the same project, which has exposed function *enhanceProcess()*
