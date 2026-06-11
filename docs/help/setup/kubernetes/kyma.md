---
title: SAP BTP Kyma
description: Run Dirigible on SAP BTP Kyma Runtime.
---

# SAP BTP Kyma

Kyma is BTP's managed Kubernetes runtime. The chart installs the same way as on any K8s cluster; a few BTP-specific integrations are worth wiring up.

## Cluster

Provision a Kyma environment from BTP cockpit. Bind the SAP BTP IAS (Identity Authentication Service) instance when you want SSO.

## Helm install

```bash
helm install dirigible dirigible/dirigible \
    --namespace dirigible --create-namespace \
    -f values.kyma.yaml
```

## API rule (Kyma's ingress wrapper)

Kyma uses `APIRule` resources for HTTP exposure. The chart can emit an `APIRule` or you can apply one separately:

```yaml
apiVersion: gateway.kyma-project.io/v1beta1
kind: APIRule
metadata:
  name: dirigible
spec:
  host: dirigible.<cluster-domain>
  service:
    name: dirigible
    port: 8080
  rules:
  - path: /.*
    methods: ["GET","POST","PUT","PATCH","DELETE"]
    accessStrategies:
    - handler: allow
```

## SSO via SAP IAS

Use the OAuth client registration flow with the BTP IAS tenant. See [`/help/artefacts/security/client-registration`](/help/artefacts/security/client-registration) and [`/help/setup/authentication/`](/help/setup/authentication/).

## PostgreSQL

Bind a SAP HANA Cloud or PostgreSQL on Hyperscaler service instance through BTP cockpit, then map the credentials into the standard `DIRIGIBLE_DATASOURCE_DEFAULT_*` env vars.

## See also

- [Helm install](/help/setup/kubernetes/helm)
- [SAP HANA database](/help/setup/databases/hana)
