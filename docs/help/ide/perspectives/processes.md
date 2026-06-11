---
title: Processes
description: Running BPMN process instances and the user task inbox.
---

# Processes

`perspective-processes` is the operational surface for BPMN processes. Backed by Flowable (`engine-bpm-flowable`).

## Layout

- **Definitions** - deployed BPMN process definitions, with version and deployment time.
- **Instances** - running process instances; start time, current activity, business key, variables.
- **Inbox** - user tasks claimable / assignable to the current user.
- **History** - completed instances and their execution paths.

## Inbox

The inbox lists every user task whose assignment includes the current user (direct assignee, candidate user, or candidate group). Claim, complete, delegate, or release tasks from here. Task forms render in the central editor area when defined.

## Authoring

Process definitions are authored in the [BPMN modeler](/help/ide/modelers/bpmn) and deployed via `.bpmn` artefacts. See [BPMN artefact](/help/artefacts/process/bpmn).

## Related

- [BPMN artefact](/help/artefacts/process/bpmn)
- [BPMN modeler](/help/ide/modelers/bpmn)
- [`@aerokit/sdk/bpm`](/api/bpm/) (JavaScript / TypeScript)
