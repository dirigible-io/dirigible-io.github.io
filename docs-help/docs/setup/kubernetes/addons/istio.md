---
title: Istio
---


Istio Setup
===

!!! info "Prerequisites"
    - Install [istioctl](https://istio.io/downloadIstio /).
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/)
    - Access to Kubernetes cluster.
1. Create `istio-system` namespace

  `kubectl create namespace istio-system`

1. Install Istio conrol plane service istiod

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      labels:
        app: istiod
        istio: pilot
        release: istio
      name: istiod
      namespace: istio-system
    spec:
      type: ClusterIP  
      ports:
      - name: grpc-xds
        port: 15010
      - name: https-dns
        port: 15012
      - name: https-webhook
        port: 443
        targetPort: 15017
      - name: http-monitoring
        port: 15014
      selector:
        app: istiod
    ```

1. Install minimal and reduce gateway config.
    * Create `control-plane.yaml` file

    ```yaml
    apiVersion: install.istio.io/v1alpha1
    kind: IstioOperator
    metadata:
      name: control-plane
    spec:
      profile: minimal
      components:
      pilot:
        k8s:
          env: 
          - name: PILOT_FILTER_GATEWAY_CLUSTER_CONFIG
            value: "true"
      meshConfig:              
        defaultConfig:       
          proxyMetadata:      
            ISTIO_META_DNS_CAPTURE: "true"
        enablePrometheusMerge: true  
    ```

    * Check the latest version `https://github.com/istio/istio/releases`

    `istioctl install -y -n istio-system -f control-plane.yaml --revision 1-14-3`

1. Add Istio injection

    `kubectl label namespace default istio-injection=enabled --overwrite`

1. Enable istio-ingressgateway component

    `kubectl create namespace istio-ingress`

    * Create `istio-ingress-gw-install.yaml`

    ```yaml
    apiVersion: install.istio.io/v1alpha1
    kind: IstioOperator
    metadata:
      name: istio-ingress-gw-install
    spec:
      profile: empty
      values:
        gateways:
          istio-ingressgateway:
            autoscaleEnabled: false
      components:
        ingressGateways:
        - name: istio-ingressgateway
          namespace: istio-ingress
          enabled: true
          k8s:
            overlays:
            - apiVersion: apps/v1
              kind: Deployment
              name: istio-ingressgateway
              patches:
              - path: spec.template.spec.containers[name:istio-proxy].lifecycle
                value:
                  preStop:
                    exec:
                      command: ["sh", "-c", "sleep 5"]
    ```

    `istioctl install -y -n istio-ingress -f istio-ingress-gw-install.yaml --revision 1-14-3`

1. Apply Strict mTLS

    ```yaml
    apiVersion: security.istio.io/v1beta1
    kind: PeerAuthentication
    metadata:
      name: default
      namespace: istio-system
    spec:
      mtls:
        mode: STRICT
    ```

