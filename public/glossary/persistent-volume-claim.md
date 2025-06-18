---
title: What is Persistent Volume Claim
description: Persistent Volume Claim allows pods to request storage with specific size and access modes from available volume pools.
---
# What is Persistent Volume Claim?

A Persistent Volume Claim (PVC) in Kubernetes is a user-defined request for storage. It allows a pod to claim and bind to a Persistent Volume (PV) without needing to know the underlying infrastructure. PVCs make storage requests portable, declarative, and dynamically provisionable, helping developers and platform teams stay focused on workloads—not disk configurations.

The PVC abstraction plays a critical role in [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) storage architecture. While PVs represent actual storage resources, PVCs act as the access layer—decoupling workloads from storage provisioning logic. This design allows for a flexible binding model between compute and storage in dynamic environments.

## What a PVC Does Inside a Kubernetes Cluster

A PVC describes how much storage a pod needs, the access mode (e.g., ReadWriteOnce, ReadOnlyMany), and which storage class it belongs to. Kubernetes uses this definition to either match the claim with an existing PV or dynamically create one if a compatible StorageClass is available.

Once bound, the PVC becomes the bridge between the pod and the actual storage volume. The pod references the PVC in its spec, and Kubernetes ensures the volume is mounted into the pod's container runtime, preserving data even when pods are deleted or rescheduled.

This model is key to maintaining stateful workloads such as databases, caching systems, and data pipelines inside Kubernetes clusters.

## When to Use PVCs Over Ephemeral Storage

PVCs are essential when durability and flexibility matter. Here’s when they’re the better choice:

- You need data to survive pod restarts or rescheduling  
- Workloads require persistent write access  
- You want to separate storage lifecycle from compute  
- Infrastructure uses CSI drivers for on-demand provisioning  
- Storage must support access modes or multi-zone resilience

For example, [Kubernetes-based databases](https://www.simplyblock.io/use-cases/database-on-kubernetes/) often rely on PVCs to provide block-level storage that persists across restarts and supports features like snapshotting or replication.

## Dynamic Provisioning and StorageClass Binding

When a PVC is created with a specified StorageClass, Kubernetes can automatically provision a new PV using the cluster’s CSI driver. This provisioning flow is part of the [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) mechanism, enabling storage to be created dynamically based on workload needs.

Many cloud-native storage backends—including Amazon EBS, Ceph RBD, and NVMe-over-TCP systems—support dynamic provisioning. Teams can apply granular control over volume types and sizes while staying Kubernetes-native.

## Integrating PVCs with Stateful Workloads

In stateful sets and deployments, PVCs ensure pods get the same volume even after termination or relocation. This is critical for services like MySQL, Redis, and message brokers, where losing data would compromise the entire system.

PVCs also integrate with volume snapshotting, cloning, and expansion—making them compatible with [Kubernetes backup strategies](https://www.simplyblock.io/use-cases/kubernetes-backup/) and disaster recovery workflows.

Beyond storage persistence, PVCs help platform teams standardize access policies, monitor usage, and align workloads with infrastructure-level SLAs.

## How Simplyblock Supports Persistent Volume Claims

Simplyblock™ delivers high-performance block storage designed for Kubernetes-native environments. With native CSI support, Simplyblock allows PVCs to dynamically bind to NVMe-over-TCP volumes—offering near-local latency over standard networks.

It supports advanced features like volume expansion, performance tiering, and cross-node attachment policies. Whether you're managing [multi-tenant cloud-native workloads](https://www.simplyblock.io/use-cases/databases-as-a-service/) or planning for [disaster recovery across zones](https://www.simplyblock.io/use-cases/multi-availability-zone-disaster-recovery/), Simplyblock lets you work with PVCs the same way you'd expect from public cloud-native services—but on your terms.

This flexibility lets DevOps teams define and consume storage programmatically while ensuring reliability and scale in production.

## Simplifying Stateful Infrastructure

PVCs help decouple storage operations from application logic, creating a clean interface between workloads and infrastructure. They're foundational for building stateful platforms on Kubernetes, where scaling, failover, and durability need to be orchestrated, not improvised.

Used properly, PVCs provide the glue that lets apps keep their data no matter where or how they run. When paired with performant storage backends and CSI integrations, they become the simplest way to bring persistent storage into cloud-native environments—whether you're running on-prem, across multiple zones, or in the public cloud.
