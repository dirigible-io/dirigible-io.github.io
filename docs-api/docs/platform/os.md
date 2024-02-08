---
title: OS
---

OS
===

OS object is used to get OS details.

=== "Overview"
- Module: `platform/os`
- Source: [/platform/os.ts](https://github.com/eclipse/dirigible/blob/master/components/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/platform/os.ts)
- Status: `stable`
- Group: `platform`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { os } from "sdk/platform";

    if (os.isWindows()) {
        // Windows logic here
    }

    if (os.isUnix()) {
        // Unix logic here
    }

    const osName = os.name;
    console.log("OS is: " + osName);
    ```

<!-- === "CommonJS"

    ```javascript
    const os = require('platform/os');

    if (os.isWindows()) {
        // Windows logic here
    }

    if (os.isUnix()) {
        // Unix logic here
    }

    const osName = os.name;
    console.log("OS is: " + osName);
    ``` -->

### Constants

---

Constant     | Description | Returns
------------ | ----------- | --------
**name**   | The name of the current OS which corresponds to the `os.name` system property | *string*

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**isWindows()**   | Check whether current OS is Windows | *boolean*
**isUnix()**   | Check whether current OS is Unix | *boolean*

