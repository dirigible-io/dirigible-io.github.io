---
title: DNS
---

Create Google DNS Zone Setup
===


!!! info "Prerequisites"
    - Enable [Cloud DNS API](https://console.cloud.google.com/start/api?id=dns&credential=client_key&_ga=2.126966857.579303116.1656398157-1033365968.1651760276&_gac=1.127004159.1652717017.CjwKCAjw7IeUBhBbEiwADhiEMXtYrlOvlKhHq7GdYe0GWEh3QVerWtVxivpUWLlvQEVAncBbbn-NsBoC1KQQAvD_BwE).
    - install [gcloud](https://cloud.google.com/sdk/docs/install)
    - install gcloud component `gcloud components install kubectl`
    - Access to Kubernetes cluster `gcloud auth login`.
    - Update the kubectl configuration to use the plugin `gcloud container clusters get-credentials <your-cluster> --zone <your-cluster-zone>`

## Steps
---

1. Create managed DNS Zone

    === "Console"

        !!! note "Google Cloud console"

            1. In the Google Cloud console, go to the Create a DNS zone page.

              `Go to Create a DNS zone`

            2. For the Zone type, select Public.

            3. Enter a Zone name such as my-new-zone.

            4. Enter a DNS name suffix for the zone using a domain name that you own. All records in the zone share this suffix, for example: example.com.

            5. Under DNSSEC, select Off, On, or Transfer. For more information, see Enable DNSSEC for existing managed zones.

            6. Click Create. The Zone details page is displayed.

    === "gcloud"
      
        ```
        gcloud dns managed-zones create NAME \
        --description=DESCRIPTION \
        --dns-name=DNS_SUFFIX \
        --labels=LABELS \
        --visibility=public
        ```

        !!! note "Replace Placeholders"

            - `DESCRIPTION` with your description.
            - `LABELS` with your label.
            - `DNS_SUFFIX` with your main domain or subdomain.

1. Add name servers

    === "Subdomain"

        !!! note "Update name servers"

            If you configure subdomain add Google name servers to your main domain control panel for this subdomain example:
            `ns-cloud-d1.googledomains.com`,`ns-cloud-d2.googledomains.com`,`ns-cloud-d3.googledomains.com`,`ns-cloud-d4.googledomains.com`

    === "Main domain"

        !!! note "Update name servers"

            At the end you need to update your domain's name servers to use Cloud DNS to publish your new records to the internet.
            Example: `ns-cloud-d1.googledomains.com`,`ns-cloud-d2.googledomains.com`,`ns-cloud-d3.googledomains.com`,`ns-cloud-d4.googledomains.com`

1. Create certificate for your domain or subdomain

    Install cert-manager

    Add Jetstack Helm repository: `helm repo add jetstack https://charts.jetstack.io`
    Update your local Helm chart repository cache: `helm repo update`
    Intall CustomResourceDefinitions: `kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.2/cert-manager.crds.yaml`
    Install cert-manager:
    
    ```
    helm install \
    cert-manager jetstack/cert-manager \
    --namespace cert-manager \
    --create-namespace \
    --version v1.8.2
    ```

1. Create Cluster Issuer

    !!! note "Note"
        With this service account we will obtain certificate:

    ```yaml
    apiVersion: cert-manager.io/v1alpha2
    kind: ClusterIssuer
    metadata:
      name: dirigible
      namespace: kube-system
    spec:
      acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        email: <your-email>
        privateKeySecretRef:
          name: dirigible
        solvers:
        - selector: {}
          http01:
            ingress:
              class: istio
    ```

1. Get Ingress IP address

    === "Kubernetes Ingress"

        `kubectl get ingress <your-ingressgateway-name>` and you will see column `ADDRESS`

    === "Istio Ingress"

        `kubectl get service -n istio-system istio-ingressgateway -o jsonpath="{.status.loadBalancer.ingress[0].ip}"`

1. Create A record in Cloud DNS

    Set zone for which you will create records

    `gcloud dns record-sets transaction start --zone=<your-cloud-dns-zone-name>`

    Add `A` record

    ```
    gcloud dns record-sets transaction add <your-ingress-ip> \
       --name=dirigible.<your-cloud-dns-zone-name> \
       --ttl=300 \
       --type=A \
       --zone=<your-cloud-dns-zone-name>
    ```

    Apply the new record

    `gcloud dns record-sets transaction execute --zone=<your-cloud-dns-zone-name>`

    Get your current DNS records for your zone

    `gcloud dns record-sets list --zone=<your-cloud-dns-zone-name>`

    !!! note "Replace Placeholders"
            Before run the commands, replace the following placeholders:

            - `<your-cloud-dns-zone-name>` with your Google cloud dnz zone name.
