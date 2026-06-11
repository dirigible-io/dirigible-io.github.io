---
title: Custom synchronizer
description: Add a new artefact type - entity, synchronizer, engine.
---

# Custom synchronizer

Adding a new artefact type means giving the platform a way to reconcile a file extension into runtime state. Three pieces:

1. A **JPA entity** extending `Artefact` (the persisted projection of the file).
2. A **synchronizer** extending `BaseSynchronizer<A, ID>` or `MultitenantBaseSynchronizer<A, ID>`.
3. An **engine** or **service** that consumes the live artefact.

## 1. The entity

```java
package com.acme.dirigible.reports.domain;

import jakarta.persistence.*;
import org.eclipse.dirigible.components.base.artefact.Artefact;

@Entity
@Table(name = "ACME_REPORTS")
public class Report extends Artefact {

    @Id
    @Column(name = "REPORT_LOCATION", nullable = false, length = 500)
    private String location;

    @Column(name = "REPORT_TITLE")
    private String title;

    // getters / setters / equals / hashCode
}
```

`Artefact` carries the lifecycle state (`NEW`, `MODIFIED`, `RELOAD`, `BROKEN`) and the lifecycle phase.

## 2. The synchronizer

```java
@Component
@Order(SynchronizersOrder.REPORT)   // pick a stable order
public class ReportSynchronizer extends BaseSynchronizer<Report, String> {

    @Override
    public String getFileExtension() {
        return ".report";
    }

    @Override
    protected List<Report> parseImpl(String location, byte[] content) {
        Report r = new Report();
        r.setLocation(location);
        // parse content (JSON / YAML / XML / whatever)
        return List.of(r);
    }

    @Override
    public boolean completeImpl(TopologyWrapper<Report> wrapper, ArtefactPhase flow) {
        Report r = wrapper.getArtefact();
        switch (flow) {
            case CREATE, UPDATE -> { /* install into your engine */ }
            case DELETE -> { /* tear down */ }
            case START, STOP -> { /* if your engine has lifecycle */ }
        }
        return true;
    }
}
```

Register the module's order constant in `SynchronizersOrder` so other synchronizer authors can target it.

## 3. The engine / service

The synchronizer hands the live artefact to whatever runtime consumes it. Patterns:

- A REST endpoint that resolves the artefact at request time.
- A scheduled job that fires per artefact.
- A Camel route that registers a consumer per artefact.

## Group registration

Add the module to `components/group/group-engines/pom.xml` (or the appropriate aggregator) so the assembly picks it up.

## Multi-tenant variant

If artefacts need per-tenant reconciliation, extend `MultitenantBaseSynchronizer` instead. The framework iterates per tenant and the entity carries the tenant id.

## See also

- [The synchronizer model](/help/concepts/synchronizer-model)
- [Custom engine](/help/extend/custom-engine)
- [Custom editor](/help/extend/custom-editor)
