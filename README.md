### This repository is for demo-ing rolling Kubernetes-updates.

Nothing to do here, unless *that's what you wanna do*

```bash
helm install stable/mongodb \
  --tiller-namespace=dev-1 \
  --name=mongodb \
  --namespace=dev-1 \
  --set persistence.enabled=false \
  --set replicaSet.enabled=true \
  --set mongodbRootPassword=test \
  --set mongodbUsername=testuser \
  --set mongodbPassword=test \
  --set mongodbDatabase=test-db
```

```bash
# Just in case, when need to step into dark side
kubectl port-forward --namespace dev-1 svc/mongodb 27017:27017
```

```bash
kubectl apply -f deployment.yaml -n dev-1
```

### Proceed only if you OG

```bash
kubectl rollout history deploy/k8s-rollout-deployment -n dev-1
```

```bash
kubectl set image \
  # |=======Deployment-Name=======|
  deployment/k8s-rollout-deployment \
  # |Container| |=======New-Image========|
  k8s-rollout=jaskaranbir/k8s-rollout:2.0.0 \
  -n dev-1
```

```bash
kubectl rollout undo deployment/k8s-rollout-deployment -n dev-1
```

```bash
kubectl set image \
  --record deployment/k8s-rollout-deployment
  # |=======Deployment-Name=======|
  deployment/k8s-rollout-deployment \
  # |Container| |=======New-Image========|
  k8s-rollout=jaskaranbir/k8s-rollout:2.0.0 \
  -n dev-1
```

```bash
kubectl set image \
  # |=======Deployment-Name=======|
  deployment/k8s-rollout-deployment \
  # |Container| |=======New-Image========|
  k8s-rollout=i_crash_without_splash:2.0.0 \
  -n dev-1
```

### Moar fancy commands:

```bash
# Scale a deployment “test” to 3 replicas:
kubectl scale deploy/test --replicas=3

# Watch update status for deployment “test”:
kubectl rollout status deploy/test

# Pause deployment on “test”:
kubectl rollout pause deploy/test

# Resume deployment on “test”:
kubectl rollout resume deploy/test

# View rollout history on “test”:
kubectl rollout history deploy/test

# Undo most recent update on “test”:
kubectl rollout undo deploy/test

# Rollback to specific revision on “test”:
kubectl rollout undo deploy/test --to-revision=1
```
