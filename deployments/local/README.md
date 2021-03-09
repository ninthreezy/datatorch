# Local

Local is a deployment of the instance that runs the services within a single
docker container.

External services are still required. This provides the advantage so being
extremely easy to deploy, manage and upgrade.

**When to use Local Deployment?**

You want to...

- test out DataTorch
- use DataTorch for small or one-off projects
- run DataTorch on a small VPS or low spec computer

**When not use Local Deployment**

You want...

- have many users concurrently using DataTorch
- large datasets with many annotations
- scale horizontally
