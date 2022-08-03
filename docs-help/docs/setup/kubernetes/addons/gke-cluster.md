---
title: Create GKE cluster
---

Create Google Kubernetes cluster Setup
===

!!! info "Prerequisites"
    - First you will need to add your billing information
    - Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install)
    - Install kubectl and [configure cluster access](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#default_cluster_kubectl)

## Steps
---

1. [Create organization](https://cloud.google.com/resource-manager/docs/creating-managing-organization)

1. Create project

  - List the organizations

    `gcloud organizations list`

    `gcloud projects create  dirigible-demo --name=dirigible --organization=<your-organization-id>` 

  - You can check for the new project with:
    `gcloud projects list --filter 'parent.id=<your-organization-id>'`

1. Enable Engine Api

    Go to `Kubernetes Engine`-> `Clusters` and click on `Enable` to allow creating cluster.

1. Create cluster

  !!! info "Set the project"

      - Set the project on which you will create DNS Zone `gcloud config set project PROJECT_ID`
      - Set the project in every command `--project <your-project-id>`.

  - Create an IAM service account with the minimum permissions required to operate GKE

    SA_NAME: the name of the new service account.
    DISPLAY_NAME: the display name for the new service account, which makes the account easier to identify.
    PROJECT_ID: the project ID of the project in which you want to create the new service account.
    ```
    SA_NAME=sa-minimum-pemissions-gke-demo \
    DISPLAY_NAME='SA minimum permissions required to operate GKE' \
    PROJECT_ID=<your-project-id>
    ```

    ```
    gcloud iam service-accounts create $SA_NAME \
      --display-name="$DISPLAY_NAME" \
      --project $PROJECT_ID

    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member "serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
      --role roles/logging.logWriter

    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member "serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
      --role roles/monitoring.metricWriter

    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member "serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
      --role roles/monitoring.viewer

    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member "serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
      --role roles/stackdriver.resourceMetadata.writer
    ```

  - Create the cluster

    ```
    gcloud container clusters create <your-cluster-name> \
        --region europe-west1-b \
        --project=$PROJECT_ID \
        --service-account=$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com
    ```

1. Get connection to the cluster

`gcloud container clusters get-credentials <your-cluster-demo>`

!!! info "Note"
    - How to [create Google DNS Zone](addons/google-dns-zone.md) 
    - How to [setup Istio](addons/istio.md).
    - How to [create certificate for your domain](addons/letsencrypt.md).