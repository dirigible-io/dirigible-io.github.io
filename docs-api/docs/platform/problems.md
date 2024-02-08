---
title: Problems
---

Problems
===

Problems module provides utility functions for managing and logging problems/issues in the `Problems` perspective

=== "Overview"
- Module: `platform/problems`
- Definition: https://github.com/eclipse/dirigible/issues/1021
- Source: [/platform/problems.js](https://github.com/eclipse/dirigible/blob/master/components/api-platform/src/main/resources/META-INF/dirigible/platform/problems.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { problems } from "sdk/platform";
    import { response } from "sdk/http";

    problems.save("/my-project/my-file", problems.ACTIVE, "line: 4", "row: 10", "", "Some problem / at line 4", "Expected end of line ;", "ProblemsModule", "my-file.mjs", "my-file.mjs");

    let myProblems = problems.fetchAllProblems();

    response.println(myProblems);

    problems.clearAllProblems();
    ```

<!-- === "CommonJS"

    ```javascript
    const problems = require("platform/problems");
    const response = require("http/response");

    problems.save("/my-project/my-file", problems.ACTIVE, "line: 4", "row: 10", "", "Some problem / at line 4", "Expected end of line ;", "ProblemsModule", "my-file.mjs", "my-file.mjs");

    let myProblems = problems.fetchAllProblems();

    response.println(myProblems);

    problems.clearAllProblems();
    ``` -->


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**save(location, type, line, column, cause, expected, category, module, source, program)**   | Save a problem | 
**findProblem(id)**   | Find a problem by given id | *string*
**fetchAllProblems()**   | Fetch all problems | *string*
**fetchProblemsBatch(condition, limit)**   | Fetch problems by batch | *string*
**deleteProblem(id)**   | Delete problem by given id |
**deleteMultipleProblemsById(ids[])**   | Delete multiple problems by given list of ids | *string*
**clearAllProblems()**   | Clear all problems |
**updateStatus(id, status)**   | Update status of a problem - ACTIVE, SOLVED, IGNORED |
**updateStatusMultiple(ids[], status)**   | Update status of multiple problems |

