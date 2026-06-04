# Tasks

## Overview

::: tip Module
- package: `@aerokit/sdk/bpm`
- source: [bpm/tasks.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/bpm/tasks.ts)
- last updated: 
:::

This module provides functionalities for managing User Tasks within a Business Process Model and Notation (BPMN) context. It allows users to list tasks, manage task variables, complete tasks, and access task-related services.

### Key Features
- List all user tasks in the system
- Get and set task variables, both globally and locally to the task
- Complete tasks with optional variables and user information
- Access the Task Service for advanced task management operations

### Use Cases
- Managing user tasks in a workflow engine
- Automating task completion and variable management in development and production environments
- Integrating task management into larger application workflows or administrative tools

### Example Usage
```ts
import { Tasks } from "@aerokit/sdk/bpm";
// List all tasks
const tasks = Tasks.list();
console.log(tasks);
// Get a task variable
const variableValue = Tasks.getVariable("taskId", "variableName");
console.log(variableValue);
// Set a task variable
Tasks.setVariable("taskId", "variableName", "newValue");
// Complete a task with variables
Tasks.complete("taskId", { "result": "approved" });
```

## Classes

### Tasks

#### list()



> ```ts
> static list(): void;
> ```
>
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getVariable()



> ```ts
> static getVariable(taskId: string, variableName: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getVariables()

Returns all variables. This will include all variables of parent scopes too.

> ```ts
> static getVariables(taskId: string): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: 
> :::

#### setVariable()



> ```ts
> static setVariable(taskId: string, variableName: string, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setVariables()



> ```ts
> static setVariables(taskId: string, variables: Map): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variables` | `Map` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### complete()



> ```ts
> static complete(taskId: string, variables: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variables` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getTaskService()



> ```ts
> static getTaskService(): TaskService;
> ```
>
>
> ::: info Returns
> - **Type**: `TaskService`
> - **Description**: 
> :::

### TaskService

#### newTask()

Creates a new task that is not related to any process instance.

The returned task is transient and must be saved with #saveTask(Task) 'manually'.

> ```ts
> newTask(taskId: string): Task;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
>
> ::: info Returns
> - **Type**: `Task`
> - **Description**: 
> :::

#### createTaskBuilder()

Create a builder for the task

> ```ts
> createTaskBuilder(): TaskBuilder;
> ```
>
>
> ::: info Returns
> - **Type**: `TaskBuilder`
> - **Description**: task builder
> :::

#### saveTask()

Saves the given task to the persistent data store. If the task is already present in the persistent store, it is updated. After a new task has been saved, the task instance passed into this
method is updated with the id of the newly created task.

> ```ts
> saveTask(task: Task): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `task` | `Task` | the task, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### bulkSaveTasks()

Saves the given tasks to the persistent data store. If the tasks are already present in the persistent store, it is updated. After a new task has been saved, the task instance passed into this
method is updated with the id of the newly created task.

> ```ts
> bulkSaveTasks(taskList: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskList` | `any` | the list of task instances, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteTask()

Deletes the given task, not deleting historic information that is related to this task.

> ```ts
> deleteTask(taskId: string, cascade: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | The id of the task that will be deleted, cannot be null. If no task exists with the given taskId, the operation is ignored. |
> | `cascade` | `boolean` | If cascade is true, also the historic information related to this task is deleted. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteTasks()

Deletes all tasks of the given collection, not deleting historic information that is related to these tasks.

> ```ts
> deleteTasks(taskIds: any, cascade: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskIds` | `any` | The id's of the tasks that will be deleted, cannot be null. All id's in the list that don't have an existing task will be ignored. |
> | `cascade` | `boolean` | If cascade is true, also the historic information related to this task is deleted. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteTaskWithReason()

Deletes the given task, not deleting historic information that is related to this task..

> ```ts
> deleteTaskWithReason(taskId: string, deleteReason: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | The id of the task that will be deleted, cannot be null. If no task exists with the given taskId, the operation is ignored. |
> | `deleteReason` | `string` | reason the task is deleted. Is recorded in history, if enabled. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteTasksWithReason()

Deletes all tasks of the given collection, not deleting historic information that is related to these tasks.

> ```ts
> deleteTasksWithReason(taskIds: any, deleteReason: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskIds` | `any` | The id's of the tasks that will be deleted, cannot be null. All id's in the list that don't have an existing task will be ignored. |
> | `deleteReason` | `string` | reason the task is deleted. Is recorded in history, if enabled. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### claim()

Claim responsibility for a task: the given user is made assignee for the task. The difference with #setAssignee(String, String) is that here a check is done if the task already has a
user assigned to it. No check is done whether the user is known by the identity component.

> ```ts
> claim(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | task to claim, cannot be null. |
> | `userId` | `string` | user that claims the task. When userId is null the task is unclaimed, assigned to no one. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### unclaim()

A shortcut to #claim with null user in order to unclaim the task

> ```ts
> unclaim(taskId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | task to unclaim, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### startProgress()

Set the task state to in progress. No check is done whether the user is known by the identity component.

> ```ts
> startProgress(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | task to change the state, cannot be null. |
> | `userId` | `string` | user that puts the task in progress. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### suspendTask()

Suspends the task. No check is done whether the user is known by the identity component.

> ```ts
> suspendTask(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | task to suspend, cannot be null. |
> | `userId` | `string` | user that suspends the task. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### activateTask()

Activates the task. No check is done whether the user is known by the identity component.

> ```ts
> activateTask(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | task to activate, cannot be null. |
> | `userId` | `string` | user that activates the task. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### delegateTask()

Delegates the task to another user. This means that the assignee is set and the delegation state is set to DelegationState#PENDING. If no owner is set on the task, the owner is set to
the current assignee of the task.

> ```ts
> delegateTask(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | The id of the task that will be delegated. |
> | `userId` | `string` | The id of the user that will be set as assignee. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### resolveTask()

Marks that the assignee is done with this task and that it can be send back to the owner. Can only be called when this task is DelegationState#PENDING delegation. After this method
returns, the () delegationState is set to DelegationState#RESOLVED.

> ```ts
> resolveTask(taskId: string, variables: Map, transientVariables: Map): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | the id of the task to resolve, cannot be null. |
> | `variables` | `Map` |  |
> | `transientVariables` | `Map` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### complete()

Called when the task is successfully executed.

> ```ts
> complete(taskId: string, userId: string, variables: Map, transientVariables: Map, localScope: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | the id of the task to complete, cannot be null. |
> | `userId` | `string` | user that completes the task. |
> | `variables` | `Map` | task parameters. May be null or empty. |
> | `transientVariables` | `Map` | task parameters. May be null or empty. |
> | `localScope` | `boolean` | If true, the provided variables will be stored task-local, instead of process instance wide (which is the default behaviour). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### completeTaskWithForm()

Called when the task is successfully executed, and the task form has been submitted.

> ```ts
> completeTaskWithForm(taskId: string, formDefinitionId: string, outcome: string, variables: Map, userId: string, transientVariables: Map, localScope: boolean): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | the id of the task to complete, cannot be null. |
> | `formDefinitionId` | `string` | the id of the form definition that is filled-in to complete the task, cannot be null. |
> | `outcome` | `string` | the outcome of the completed form, can be null. |
> | `variables` | `Map` | values of the completed form. May be null or empty. |
> | `userId` | `string` | user that completes the task. |
> | `transientVariables` | `Map` | additional transient values that need to added to the process instance transient variables. May be null or empty. |
> | `localScope` | `boolean` | If true, the provided variables will be stored task-local, instead of process instance wide (which is the default for #complete(String, Map)). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getTaskFormModel()

Gets a Form model instance of the task form of a specific task

> ```ts
> getTaskFormModel(taskId: string, ignoreVariables: boolean): FormInfo;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `ignoreVariables` | `boolean` | should the variables be ignored when fetching the form model? |
>
> ::: info Returns
> - **Type**: `FormInfo`
> - **Description**: 
> :::

#### setAssignee()

Changes the assignee of the given task to the given userId. No check is done whether the user is known by the identity component.

> ```ts
> setAssignee(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `userId` | `string` | id of the user to use as assignee. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setOwner()

Transfers ownership of this task to another user. No check is done whether the user is known by the identity component.

> ```ts
> setOwner(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `userId` | `string` | of the person that is receiving ownership. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getIdentityLinksForTask()

Retrieves the IdentityLinks associated with the given task. Such an IdentityLink informs how a certain identity (eg. group or user) is associated with a certain task (eg. as
candidate, assignee, etc.)

> ```ts
> getIdentityLinksForTask(taskId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addCandidateUser()

Convenience shorthand for #addUserIdentityLink(String, String, String); with type IdentityLinkType#CANDIDATE

> ```ts
> addCandidateUser(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `userId` | `string` | id of the user to use as candidate, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addCandidateGroup()

Convenience shorthand for #addGroupIdentityLink(String, String, String); with type IdentityLinkType#CANDIDATE

> ```ts
> addCandidateGroup(taskId: string, groupId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `groupId` | `string` | id of the group to use as candidate, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addUserIdentityLink()

Involves a user with a task. The type of identity link is defined by the given identityLinkType.

> ```ts
> addUserIdentityLink(taskId: string, userId: string, identityLinkType: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `userId` | `string` | id of the user involve, cannot be null. |
> | `identityLinkType` | `string` | type of identityLink, cannot be null (@see IdentityLinkType). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### addGroupIdentityLink()

Involves a group with a task. The type of identityLink is defined by the given identityLink.

> ```ts
> addGroupIdentityLink(taskId: string, groupId: string, identityLinkType: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `groupId` | `string` | id of the group to involve, cannot be null. |
> | `identityLinkType` | `string` | type of identity, cannot be null (@see IdentityLinkType). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteCandidateUser()

Convenience shorthand for #deleteUserIdentityLink(String, String, String); with type IdentityLinkType#CANDIDATE

> ```ts
> deleteCandidateUser(taskId: string, userId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `userId` | `string` | id of the user to use as candidate, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteCandidateGroup()

Convenience shorthand for #deleteGroupIdentityLink(String, String, String); with type IdentityLinkType#CANDIDATE

> ```ts
> deleteCandidateGroup(taskId: string, groupId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `groupId` | `string` | id of the group to use as candidate, cannot be null. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteUserIdentityLink()

Removes the association between a user and a task for the given identityLinkType.

> ```ts
> deleteUserIdentityLink(taskId: string, userId: string, identityLinkType: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `userId` | `string` | id of the user involve, cannot be null. |
> | `identityLinkType` | `string` | type of identityLink, cannot be null (@see IdentityLinkType). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteGroupIdentityLink()

Removes the association between a group and a task for the given identityLinkType.

> ```ts
> deleteGroupIdentityLink(taskId: string, groupId: string, identityLinkType: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `groupId` | `string` | id of the group to involve, cannot be null. |
> | `identityLinkType` | `string` | type of identity, cannot be null (@see IdentityLinkType). |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setPriority()

Changes the priority of the task.

Authorization: actual owner / business admin

> ```ts
> setPriority(taskId: string, priority: number): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `priority` | `number` | the new priority for the task. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setDueDate()

Changes the due date of the task

> ```ts
> setDueDate(taskId: string, dueDate: Date): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of the task, cannot be null. |
> | `dueDate` | `Date` | the new due date for the task |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setVariable()

set variable on a task. If the variable is not already existing, it will be created in the most outer scope. This means the process instance in case this task is related to an execution.

> ```ts
> setVariable(taskId: string, variableName: string, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setVariables()

set variables on a task. If the variable is not already existing, it will be created in the most outer scope. This means the process instance in case this task is related to an execution.

> ```ts
> setVariables(taskId: string, variables: Map): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variables` | `Map` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setVariableLocal()

set variable on a task. If the variable is not already existing, it will be created in the task.

> ```ts
> setVariableLocal(taskId: string, variableName: string, value: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
> | `value` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### setVariablesLocal()

set variables on a task. If the variable is not already existing, it will be created in the task.

> ```ts
> setVariablesLocal(taskId: string, variables: Map): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variables` | `Map` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getVariable()

get a variables and search in the task scope and if available also the execution scopes.

> ```ts
> getVariable(taskId: string, variableName: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getVariableInstance()

The variable. Searching for the variable is done in all scopes that are visible to the given task (including parent scopes). Returns null when no variable value is found with the given name.

> ```ts
> getVariableInstance(taskId: string, variableName: string): VariableInstance;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of task, cannot be null. |
> | `variableName` | `string` | name of variable, cannot be null. |
>
> ::: info Returns
> - **Type**: `VariableInstance`
> - **Description**: the variable or null if the variable is undefined.
> :::

#### hasVariable()

checks whether or not the task has a variable defined with the given name, in the task scope and if available also the execution scopes.

> ```ts
> hasVariable(taskId: string, variableName: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getVariableLocal()

checks whether or not the task has a variable defined with the given name.

> ```ts
> getVariableLocal(taskId: string, variableName: string): any;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `any`
> - **Description**: 
> :::

#### getVariableInstanceLocal()

The variable for a task. Returns the variable when it is set for the task (and not searching parent scopes). Returns null when no variable is found with the given name.

> ```ts
> getVariableInstanceLocal(taskId: string, variableName: string): VariableInstance;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of task, cannot be null. |
> | `variableName` | `string` | name of variable, cannot be null. |
>
> ::: info Returns
> - **Type**: `VariableInstance`
> - **Description**: the variable or null if the variable is undefined.
> :::

#### hasVariableLocal()

checks whether or not the task has a variable defined with the given name, local task scope only.

> ```ts
> hasVariableLocal(taskId: string, variableName: string): boolean;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: 
> :::

#### getVariables()

get all variables and search in the task scope and if available also the execution scopes. If you have many variables and you only need a few, consider using
#getVariables(String, Collection) for better performance.

> ```ts
> getVariables(taskId: string, variableNames: any): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableNames` | `any` |  |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: 
> :::

#### getVariableInstances()

All variables visible from the given task scope (including parent scopes).

> ```ts
> getVariableInstances(taskId: string, variableNames: any): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of task, cannot be null. |
> | `variableNames` | `any` | the collection of variable names that should be retrieved. |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: the variable instances or an empty map if no such variables are found.
> :::

#### getVariablesLocal()

get all variables and search only in the task scope. If you have many task local variables and you only need a few, consider using #getVariablesLocal(String, Collection) for better
performance.

> ```ts
> getVariablesLocal(taskId: string, variableNames: any): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableNames` | `any` |  |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: 
> :::

#### getVariableInstancesLocalByTaskIds()

get all variables and search only in the task scope.

> ```ts
> getVariableInstancesLocalByTaskIds(taskIds: Set): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskIds` | `Set` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getVariableInstancesLocal()

All variable values that are defined in the task scope, without taking outer scopes into account. If you have many task local variables and you only need a few, consider using
#getVariableInstancesLocal(String, Collection) for better performance.

> ```ts
> getVariableInstancesLocal(taskId: string, variableNames: any): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of task, cannot be null. |
> | `variableNames` | `any` |  |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: the variables or an empty map if no such variables are found.
> :::

#### removeVariable()

Removes the variable from the task. When the variable does not exist, nothing happens.

> ```ts
> removeVariable(taskId: string, variableName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### removeVariableLocal()

Removes the variable from the task (not considering parent scopes). When the variable does not exist, nothing happens.

> ```ts
> removeVariableLocal(taskId: string, variableName: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableName` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### removeVariables()

Removes all variables in the given collection from the task. Non existing variable names are simply ignored.

> ```ts
> removeVariables(taskId: string, variableNames: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableNames` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### removeVariablesLocal()

Removes all variables in the given collection from the task (not considering parent scopes). Non existing variable names are simply ignored.

> ```ts
> removeVariablesLocal(taskId: string, variableNames: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `variableNames` | `any` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getDataObjects()

All DataObjects visible from the given execution scope (including parent scopes).

> ```ts
> getDataObjects(taskId: string, dataObjectNames: any, locale: string, withLocalizationFallback: boolean): Map;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of task, cannot be null. |
> | `dataObjectNames` | `any` | the collection of DataObject names that should be retrieved. |
> | `locale` | `string` | locale the DataObject name and description should be returned in (if available). |
> | `withLocalizationFallback` | `boolean` | When true localization will fallback to more general locales if the specified locale is not found. |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: the DataObjects or an empty map if no such variables are found.
> :::

#### getDataObject()

The DataObject. Searching for the DataObject is done in all scopes that are visible to the given task (including parent scopes). Returns null when no DataObject value is found with the given
name.

> ```ts
> getDataObject(taskId: string, dataObject: string, locale: string, withLocalizationFallback: boolean): DataObject;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` | id of task, cannot be null. |
> | `dataObject` | `string` | name of DataObject, cannot be null. |
> | `locale` | `string` | locale the DataObject name and description should be returned in (if available). |
> | `withLocalizationFallback` | `boolean` | When true localization will fallback to more general locales including the default locale of the JVM if the specified locale is not found. |
>
> ::: info Returns
> - **Type**: `DataObject`
> - **Description**: the DataObject or null if the variable is undefined.
> :::

#### addComment()

Add a comment to a task and/or process instance.

> ```ts
> addComment(taskId: string, processInstanceId: string, message: string, type: string): Comment;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `processInstanceId` | `string` |  |
> | `message` | `string` |  |
> | `type` | `string` |  |
>
> ::: info Returns
> - **Type**: `Comment`
> - **Description**: 
> :::

#### saveComment()

Update a comment to a task and/or process instance.

> ```ts
> saveComment(comment: Comment): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `comment` | `Comment` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getComment()

Returns an individual comment with the given id. Returns null if no comment exists with the given id.

> ```ts
> getComment(commentId: string): Comment;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `commentId` | `string` |  |
>
> ::: info Returns
> - **Type**: `Comment`
> - **Description**: 
> :::

#### deleteComments()

Removes all comments from the provided task and/or process instance

> ```ts
> deleteComments(taskId: string, processInstanceId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `processInstanceId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteComment()

Removes an individual comment with the given id.

> ```ts
> deleteComment(commentId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `commentId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getTaskComments()

The comments related to the given task.

> ```ts
> getTaskComments(taskId: string, type: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
> | `type` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getCommentsByType()

All comments of a given type.

> ```ts
> getCommentsByType(type: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `type` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getTaskEvents()

The all events related to the given task.

> ```ts
> getTaskEvents(taskId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getEvent()

Returns an individual event with the given id. Returns null if no event exists with the given id.

> ```ts
> getEvent(eventId: string): TaskEvent;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `eventId` | `string` |  |
>
> ::: info Returns
> - **Type**: `TaskEvent`
> - **Description**: 
> :::

#### getProcessInstanceComments()

The comments related to the given process instance.

> ```ts
> getProcessInstanceComments(processInstanceId: string, type: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` |  |
> | `type` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### createAttachment()

Add a new attachment to a task and/or a process instance and use an input stream to provide the content

> ```ts
> createAttachment(attachmentType: string, taskId: string, processInstanceId: string, attachmentName: string, attachmentDescription: string, content: any, url: string): Attachment;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `attachmentType` | `string` |  |
> | `taskId` | `string` |  |
> | `processInstanceId` | `string` |  |
> | `attachmentName` | `string` |  |
> | `attachmentDescription` | `string` |  |
> | `content` | `any` |  |
> | `url` | `string` |  |
>
> ::: info Returns
> - **Type**: `Attachment`
> - **Description**: 
> :::

#### saveAttachment()

Update the name and description of an attachment

> ```ts
> saveAttachment(attachment: Attachment): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `attachment` | `Attachment` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getAttachment()

Retrieve a particular attachment

> ```ts
> getAttachment(attachmentId: string): Attachment;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `attachmentId` | `string` |  |
>
> ::: info Returns
> - **Type**: `Attachment`
> - **Description**: 
> :::

#### getAttachmentContent()

Retrieve stream content of a particular attachment

> ```ts
> getAttachmentContent(attachmentId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `attachmentId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getTaskAttachments()

The list of attachments associated to a task

> ```ts
> getTaskAttachments(taskId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `taskId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getProcessInstanceAttachments()

The list of attachments associated to a process instance

> ```ts
> getProcessInstanceAttachments(processInstanceId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `processInstanceId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### deleteAttachment()

Delete an attachment

> ```ts
> deleteAttachment(attachmentId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `attachmentId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### getSubTasks()

The list of subtasks for this parent task

> ```ts
> getSubTasks(parentTaskId: string): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `parentTaskId` | `string` |  |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

