---
title: Job Scheduler
---

Job Scheduler
===

Job Scheduler provides convenient API for managing Job state and execution.

=== "Overview"
- Module: `job/scheduler`
- Source: [/job/scheduler.js](https://github.com/eclipse/dirigible/blob/master/components/api-job/src/main/resources/META-INF/dirigible/job/scheduler.js)
- Status: `stable`
- Group: `platform`


### Basic Usage

=== "ECMA6"

    ```javascript
    import { scheduler } from "@dirigible/job";

    let job = scheduler.getJob("/sample-job/myjob.job");
    let param = job.getParameter("myParam");

    console.log('Param is: ' + param);
    ```

=== "CommonJS"

    ```javascript
    const scheduler = require("job/scheduler");

    let job = scheduler.getJob("/sample-job/myjob.job");
    let param = job.getParameter("myParam");

    console.log('Param is: ' + param);
    ```


### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getJobs()**   | Returns the list of all the registered user jobs | *Job array*
**getJob(name)**   | Gets a Job object by its name | *Job*
**enable(name)**   | Enables the Job regular execution | *-*
**disable(name)**   | Disables the Job regular execution | *-*
**trigger(name, parameters)**   | Triggers the Job regular execution with parameters | *-*
**log(name, message)**   | Logs a message with normal severity | *-*
**error(name, message)**   | Logs a message with error severity | *-*
**warn(name, message)**   | Logs a message with warn severity | *-*
**info(name, message)**   | Logs a message with info severity | *-*

### Objects

---

#### Job

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Returns the name of the Job | *string*
**getGroup()** | Returns the group of the Job | *string*
**getClazz()** | Returns the clazz of the Job | *string*
**getDescription()** | Returns the description of the Job | *string*
**getExpression()** | Returns the expression of the Job | *string*
**getHandler()** | Returns the handler of the Job | *string*
**getEngine()** | Returns the engine of the Job | *string*
**getSingleton()** | Returns the singleton flag of the Job | *string*
**getEnabled()** | Returns the enabled state of the Job | *string*
**getCreatedBy()** | Returns the created by user of the Job | *string*
**getCreatedAt()** | Returns the created at timestamp of the Job | *string*
**getParameters()** | Returns the parameters object of the Job | *JobParameters*
**getParameter(name)** | Returns the value of the parameter of the Job | *string*
**enable()** | Enables the Job | *-*
**disable()** | Disables the Job | *-*
**trigger()** | Triggers the Job | *-*
**log(message)**   | Logs a message with normal severity | *-*
**error(message)**   | Logs a message with error severity | *-*
**warn(message)**   | Logs a message with warn severity | *-*
**info(message)**   | Logs a message with info severity | *-*


#### JobParameters

Function     | Description | Returns
------------ | ----------- | --------
**get(i)** | Returns the parameter by the index | *JobParameter*
**count()** | Returns the number of the parameters | *number*

#### JobParameter

Function     | Description | Returns
------------ | ----------- | --------
**getName()** | Returns the name of the Parameter | *string*
**getDescription()** | Returns the description of the Parameter | *string*
**getType()** | Returns the type of the Parameter | *string*
**getDefaultValue()** | Returns the default value of the Parameter | *string*
**getChoices()** | Returns the choices of the Parameter | *string*










