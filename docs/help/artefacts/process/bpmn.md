---
title: BPMN process
description: Flowable 2.0 process definition. *.bpmn artefact.
---

# BPMN process

`*.bpmn` is a Flowable 2.0 BPMN process definition. The platform deploys it into the embedded Flowable engine and exposes the process for start / signal / message + a task inbox.

- **File format.** Standard BPMN 2.0 XML (`bpmn:definitions`).
- **Synchronizer.** `BpmnSynchronizer` (multitenant - process definitions are deployed per tenant, but running instances are system-level).
- **Engine.** `engine-bpm-flowable` (Flowable). REST surface at `BpmFlowableEndpoint`, inbox at `BpmInboxEndpoint`.
- **Editor.** [BPMN Modeler](/help/ide/modelers/bpmn).
- **Runtime perspective.** [Processes](/help/ide/perspectives/processes).
- **JS / TS API.** [`@aerokit/sdk/bpm`](/api/bpm/process) - start process, complete task, set / get variables.

## Service-task handlers

Two delegate styles are supported on a service task:

### JS / TS handler - `${JSTask}`

```xml
<serviceTask id="task1" flowable:delegateExpression="${JSTask}">
  <extensionElements>
    <flowable:field name="handler">
      <flowable:string>project/handlers/myTask.ts</flowable:string>
    </flowable:field>
  </extensionElements>
</serviceTask>
```

The `handler` field is a registry path to a `.js` / `.mjs` / `.ts` module. The module reads / writes process variables via `@aerokit/sdk/bpm`.

`${JSTask}` is hot-reload-safe - the module is resolved per execution.

### Java handler - `${JavaTask}` or `flowable:class`

```xml
<serviceTask id="task2" flowable:delegateExpression="${JavaTask}">
  <extensionElements>
    <flowable:field name="handler">
      <flowable:string>com.acme.MyJavaTask</flowable:string>
    </flowable:field>
  </extensionElements>
</serviceTask>
```

The handler FQN must implement `org.flowable.engine.delegate.JavaDelegate` and have a public no-arg constructor. Compiled in the same `engine-java` cycle as all other client `.java` - it can reference sibling client classes by FQN.

Pure Flowable binding via `flowable:class="com.acme.MyJavaTask"` is also wired. **Caveat:** `flowable:class` resolves the first generation of the class only - restart to pick up a recompiled handler. Use `${JavaTask}` for hot-reload.

## Variables, gateways, user tasks, messages

All standard Flowable constructs work:

- **Variables** - set with `execution.setVariable(name, value)` (Java) or `process.setVariable(...)` from `@aerokit/sdk/bpm`. Variables flow through gateways and into user-task forms.
- **Gateways** - exclusive (`<exclusiveGateway>`), parallel, inclusive, event-based. Condition expressions on outgoing sequence flows: `${amount > 100}`.
- **User tasks** - appear in the inbox (`BpmInboxEndpoint`). Completed via `tasks.complete(taskId, variables)`.
- **Messages and signals** - Flowable's `messageEventReceived` / `signalEventReceived`. Trigger from JS via `@aerokit/sdk/bpm`.

## Tenancy

Process definitions are reconciled per tenant; running process instances are system-level (not isolated per tenant).
