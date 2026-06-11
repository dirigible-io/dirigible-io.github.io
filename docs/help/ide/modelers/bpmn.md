---
title: BPMN Modeler
description: Flowable BPMN 2.0 modeler for *.bpmn process definitions.
---

# BPMN Modeler

A Flowable-based BPMN 2.0 modeler. It authors `*.bpmn` process definitions that the embedded Flowable engine executes at runtime.

## Files

- `*.bpmn` - BPMN 2.0 XML. Reconciled by `BpmnSynchronizer` and deployed to the Flowable engine.

## Authoring

Drag stencils from the palette onto the canvas.

- **Events** - start, end, intermediate (timer, message, signal, error, escalation), boundary.
- **Activities** - user task, service task, script task, send task, receive task, manual task, business rule task, call activity, sub-process.
- **Gateways** - exclusive, parallel, inclusive, event-based.
- **Sequence flows** - with optional condition expressions.
- **Pools and lanes** - participant decomposition.

Selecting an element opens the property panel on the right. Each stencil exposes its own set of properties (id, name, documentation, assignments, listeners, async / compensation flags, ...).

## Service-task handlers

Service tasks invoke handler code. Set the handler from the property panel's *Assignments* editor:

- **JavaScript / TypeScript** - delegate expression `${JSTask}` plus a `handler` field whose string value is the path to the JS/TS file (e.g. `my-project/handlers/MyHandler.ts`).
- **Java** - delegate expression `${JavaTask}` plus a `handler` field whose value is the fully-qualified Java class name. The class must implement `org.flowable.engine.delegate.JavaDelegate` and is compiled by `engine-java`. The `${JavaTask}` form is hot-reload-safe. The alternative `flowable:class="..."` binding works but pins the first generation of the class until restart.

## See also

- [Process artefacts](/help/artefacts/process/bpmn)
- [Processes perspective](/help/ide/perspectives/processes)
- [@aerokit/sdk/bpm](/sdk/) - start processes and complete tasks from JS/TS code
