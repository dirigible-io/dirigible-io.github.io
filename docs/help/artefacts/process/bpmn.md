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

The handler FQN must implement `org.flowable.engine.delegate.JavaDelegate`. Compiled in the same `engine-java` cycle as all other client `.java` - it can reference sibling client classes by FQN.

Pure Flowable binding via `flowable:class="com.acme.MyJavaTask"` is also wired, and only `flowable:class` lets Flowable inject the declared `<flowable:field>` values as delegate fields. Both bindings pick up a recompiled handler without a restart.

### Collaborators

A delegate takes its collaborators by **injection**, on both bindings - declare a constructor (or `@Inject` fields) and the client bean container wires the instance the engine builds:

```java
public class IssueInvoice implements JavaDelegate {

    private final DocumentNumbering numbering;   // a @Component

    public IssueInvoice(DocumentNumbering numbering) {
        this.numbering = numbering;
    }

    @Override
    public void execute(DelegateExecution execution) { ... }
}
```

::: warning Never annotate a delegate `@Component`
The engine creates a delegate, so it never becomes a managed bean. Annotating one makes the container build a *second*, fully-injected singleton that never runs, beside the un-injected instance that does - and the fields read `null` at runtime while the container looks correctly wired.
:::

A delegate with a plain public no-arg constructor and nothing to inject keeps working exactly as before, and `Beans.get(...)` inside `execute` remains available for a lookup that must be lazy. An `<flowable:field>` value is applied after injection, so a field name declared in the BPMN must not collide with an injected member. A dependency the container cannot satisfy unambiguously is refused, and the refusal fails that **step** - it never blocks a publish.

## Variables, gateways, user tasks, messages

All standard Flowable constructs work:

- **Variables** - set with `execution.setVariable(name, value)` (Java) or `process.setVariable(...)` from `@aerokit/sdk/bpm`. Variables flow through gateways and into user-task forms.
- **Gateways** - exclusive (`<exclusiveGateway>`), parallel, inclusive, event-based. Condition expressions on outgoing sequence flows: `${amount > 100}`.
- **User tasks** - appear in the inbox (`BpmInboxEndpoint`). Completed via `tasks.complete(taskId, variables)`.
- **Messages and signals** - Flowable's `messageEventReceived` / `signalEventReceived`. Trigger from JS via `@aerokit/sdk/bpm`.

## Tenancy

Process definitions are reconciled per tenant; running process instances are system-level (not isolated per tenant).
