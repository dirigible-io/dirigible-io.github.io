---
title: Job Scheduler
---

Job Scheduler
===

Job Scheduler provides convenient API for managing Job state and execution.

=== "Overview"
- Module: `job/v4/scheduler`
- Alias: `job/scheduler`
- Source: [/job/v4/scheduler.js](https://github.com/dirigiblelabs/api-job/blob/master/job/v3/scheduler.js)
- Facade: [JobFacade](https://github.com/eclipse/dirigible/blob/master/api/api-facade/api-job/src/main/java/org/eclipse/dirigible/api/v4/job/JobFacade.java)
- Status: `stable`


### Basic Usage

```javascript
var scheduler = require("job/v4/scheduler");

let job = scheduler.getJob("/sample-job/myjob.job");

let stringParam = job.getParameter("stringParam");

console.log('echo stringParam: ' + stringParam);
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getJobs()**   | Returns the list of all the registered user jobs | *Job array*
**getJob(name)**   | Gets a Job object by its name | *Job*
**enableJob(name)**   | Enables the Job regular execution | *-*
**disableJob(name)**   | Disables the Job regular execution | *-*
**triggerJob(name, parameters)**   | Triggers the Job regular execution with parameters | *-*

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










