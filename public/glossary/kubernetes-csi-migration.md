---
title: Kubernetes CSI Migration for In-Tree Plugins
description: Kubernetes CSI Migration moves in-tree storage plugins to external CSI drivers, improving modularity and maintainability.
---
# What is Kubernetes CSI Migration?

Kubernetes CSI Migration refers to the process of shifting from legacy in-tree volume plugins to the out-of-tree Container Storage Interface (CSI) model. This change allows Kubernetes to interact with third-party storage solutions through a standardized API, without embedding vendor-specific logic into the Kubernetes core.

Initially, Kubernetes handled storage integrations through tightly coupled in-tree plugins. These plugins made maintenance difficult, as any bug fixes or upgrades required changes to Kubernetes itself. With the CSI standard, vendors now provide and maintain their own drivers outside the Kubernetes codebase. That shift not only simplifies cluster upgrades but also improves modularity and storage feature velocity.

## Why Kubernetes Is Moving Away from In-Tree Drivers

Legacy in-tree volume plugins created several challenges. They tied Kubernetes releases to the development cycle of storage vendors. That meant any bug or security patch related to a volume plugin needed to be bundled into a Kubernetes update.

In contrast, CSI offers a vendor-agnostic approach. Vendors build CSI drivers based on the [Container Storage Interface specification](https://github.com/container-storage-interface/spec), and Kubernetes interacts with those drivers through a common interface. This model supports fast, decoupled storage innovation while making Kubernetes itself easier to maintain.

## How CSI Migration Works in Practice

The migration is controlled by Kubernetes feature gates. When enabled, Kubernetes reroutes in-tree volume operations to their corresponding CSI drivers under the hood. For instance, when a PVC requests an AWS EBS volume, Kubernetes will use the `ebs.csi.aws.com` driver, even if the PVC still uses older annotations or formatting.

This backward compatibility lets existing workloads continue functioning while taking advantage of CSI-based improvements like volume snapshots, dynamic provisioning, and more consistent logging. The CSI driver handles operations like attach, mount, and resize, without relying on in-tree code paths.

## What to Evaluate Before Migrating to CSI

Before transitioning to CSI, DevOps teams need to validate a few critical factors:

- **StorageClass compatibility**: Existing workloads may reference legacy configurations.
- **Kubernetes version support**: Not all CSI drivers work on older cluster versions.
- **Driver maturity**: Ensure the CSI driver supports features like expansion or snapshotting.
- **Operational tooling**: Backup systems and monitoring stacks may need updates.

Smooth migration depends on ensuring CSI drivers are production-ready and integrated into your automation pipelines.

## Simplyblock and CSI-Native Storage

Simplyblock™ is built specifically for CSI-native Kubernetes environments. It offers high-performance block storage using NVMe-over-TCP, managed entirely through CSI-based provisioning. No kernel modules, no side-loaded drivers—just full compliance with Kubernetes expectations.

In deployments where resilience is critical—like [fast backup and disaster recovery](https://www.simplyblock.io/use-cases/fast-backups-and-disaster-recovery/) or [multi-zone Kubernetes environments](https://www.simplyblock.io/use-cases/multi-availability-zone-disaster-recovery/)—Simplyblock leverages the CSI model to deliver snapshot, replication, and dynamic volume capabilities natively.

Teams already migrating off in-tree plugins will find Simplyblock’s CSI architecture a clean fit for modern infrastructure pipelines.

## Supported Drivers and Migration Status

Kubernetes supports CSI migration for multiple legacy plugins, including AWS EBS, GCE PD, Azure Disk, Cinder, and vSphere. These migrations are tied to specific feature gates like `CSIMigrationAWS` or `CSIMigrationGCE`. Over time, more in-tree plugins are being phased out in favor of their CSI equivalents.

A full list of supported migrations is maintained in the [Kubernetes CSI migration documentation](https://kubernetes.io/docs/concepts/storage/volumes/#csi-migration). Cluster admins can enable or disable feature gates to control which drivers are redirected.

## Planning for CSI-First Workflows

For teams building new clusters or replatforming workloads, CSI should be the default choice. Unlike legacy plugins, CSI allows for fine-grained lifecycle control, supports declarative volume policies, and works across diverse environments—cloud, on-prem, and edge.

Workloads that depend on [persistent volume provisioning](https://www.simplyblock.io/use-cases/database-on-kubernetes/) or [automated Kubernetes backups](https://www.simplyblock.io/use-cases/kubernetes-backup/) benefit directly from the CSI model. CSI enables modern capabilities like topology-aware provisioning and snapshot scheduling, which aren’t available in most in-tree plugins.

## Why CSI Migration Makes Long-Term Sense

While CSI migration requires planning and testing, it solves real problems that in-tree plugins couldn’t. Teams gain vendor independence, faster update cycles, and access to a broader range of features. In complex environments—like those combining [hybrid storage stacks](https://www.simplyblock.io/supported-environments/kubernetes-storage/) with cloud-native automation—this flexibility translates to lower risk and better scalability.

The CSI ecosystem is now mature and well-documented. Migrating early means fewer surprises down the line as Kubernetes sunsets its legacy storage paths. CSI is no longer optional—it’s the default path forward for Kubernetes storage.
