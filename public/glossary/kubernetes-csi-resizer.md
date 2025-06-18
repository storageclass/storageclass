---
title: How Kubernetes CSI Resizer Expands Volumes
description: Kubernetes CSI Resizer works with volumeMode File and Block to scale storage transparently in running Kubernetes workloads.
---
# What is Kubernetes CSI Resizer?

The Kubernetes CSI Resizer lets you increase the size of a persistent volume without shutting down your pod or reattaching the volume. It works as a controller that watches for updates to PersistentVolumeClaims (PVCs) and coordinates with the CSI driver to perform a live volume expansion.

This tool is part of the broader CSI ecosystem in Kubernetes. Before the CSI resizer existed, resizing volumes often meant downtime or pod disruption. Now, with CSI and proper configuration, you can scale storage as easily as CPU or memory—without restarting services or remounting volumes.

## Why Volume Expansion Needs to Be Automatic

Storage isn’t static. Logs grow, databases get bloated, and analytics workloads balloon unexpectedly. You don’t always want to overprovision just in case.

With the CSI resizer, you can define PVCs that grow on demand. Kubernetes handles the orchestration; the resizer ensures the driver and volume backend complete the operation safely. This lets you right-size volumes based on real usage, improving both cost efficiency and reliability.

In setups focused on [cloud cost optimization](https://www.simplyblock.io/use-cases/cloud-cost-optimization-aws-storage-tiering/), this flexibility becomes even more valuable—scaling as needed without provisioning waste.

## What the CSI Resizer Brings to Kubernetes

- Expands persistent volumes without unmounting or restarting the pod  
- Works with StatefulSets, Deployments, and standalone PVCs  
- Allows StorageClasses to define whether volumes can grow  
- Supports ext4 and XFS filesystems with online expansion  
- Ensures that node-level and controller-level components cooperate

For workloads like [databases on Kubernetes](https://www.simplyblock.io/use-cases/database-on-kubernetes/), volume expansion helps avoid unnecessary downtime during growth phases.

## Simplyblock Support for Stateful Expansion

Simplyblock™ supports volume resizing through its CSI driver, using NVMe-over-TCP for near-local performance. That means you get the scale and flexibility of Kubernetes-native storage with the speed you'd expect from local disks.

Teams running [Kubernetes storage](https://www.simplyblock.io/supported-environments/kubernetes-storage/) often use this to avoid downtime when resizing volumes in production. It fits into architectures where [software-defined storage](https://www.simplyblock.io/use-cases/software-defined-storage/) is already the foundation.

## What to Know Before Turning It On

Not every CSI driver supports resizing. Make sure yours handles both controller and node-side expansion. The [CSI volume resizing guide](https://kubernetes-csi.github.io/docs/volume-resizing.html) explains the requirements.

Also, check that your `StorageClass` includes `allowVolumeExpansion: true`. The [Kubernetes PVC expansion documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#expanding-persistent-volumes-claims) outlines how this works and when to use it.

In production, you should monitor usage and set up alerts. Volume resizing should be part of your overall storage policy—not a last-minute fix.
