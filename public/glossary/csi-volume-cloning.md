# What is CSI Volume Cloning?

CSI volume cloning provides a native way to replicate PersistentVolumeClaim (PVC) data in Kubernetes without relying on snapshots, external backup systems, or user-space copying. It allows the creation of a new PVC that is a direct duplicate of an existing one, preserving data at the storage layer.

Unlike backup and restore methods that pass data through the application stack, cloning occurs within the storage backend via CSI. This ensures faster provisioning with less operational overhead.

## What Cloning Actually Does

When a clone is created, it replicates the contents of a bound PVC using the same StorageClass. The new PVC uses the original as its `dataSource`. The Kubernetes control plane works with the CSI driver to request a new volume that mirrors the original data — immediately usable by another pod.

The Kubernetes documentation on [volume cloning via PVC data sources](https://kubernetes.io/docs/concepts/storage/volume-pvc-datasource/#volume-cloning) provides the formal API structure and configuration.

## Use Cases That Benefit From Cloning

CSI cloning is often used where temporary replicas of live data are needed. It avoids complex backup workflows and integrates cleanly into declarative environments. Some common use cases include:

- Spinning up test environments with real production data  
- Validating schema changes without modifying the original PVC  
- Duplicating volume states for disaster recovery testing  
- Staging pipelines that rely on consistent datasets  
- Copying read-heavy workloads for scale-out performance tuning  

## Cloning Support in Simplyblock

Simplyblock™ supports PVC cloning with its NVMe-over-TCP storage platform, allowing teams to copy volumes across nodes without application awareness. Cloning can be integrated into environments such as [Kubernetes-native backup strategies](https://www.simplyblock.io/use-cases/kubernetes-backup/) and [database branching](https://www.simplyblock.io/use-cases/database-branching/), where state isolation is critical.

It also works in scenarios involving [multi-availability zone deployments](https://www.simplyblock.io/use-cases/multi-availability-zone-disaster-recovery/), providing zone-aware clone creation.

## What the CSI Driver Needs to Support

Before cloning can work, the CSI driver must advertise `CLONE_VOLUME` capability. The PVC must reference a valid source in the same namespace, using the same StorageClass.

The cluster must also run a version of Kubernetes v1.18 or later, where cloning reached stable status. Without these conditions, the provisioning will fail or default to standard PVC behavior without data duplication.

## Key Differences Between Cloning and Snapshots

A clone creates an independent volume, immediately usable and modifiable. A snapshot, by contrast, is a point-in-time reference that requires restoration before use. Snapshots are best suited for backups or rollback plans. Clones are better when a new, working volume is needed based on existing state.

This distinction mirrors traditional concepts described in [disk cloning systems](https://en.wikipedia.org/wiki/Disk_cloning), where duplication enables parallel usage while snapshots preserve a read-only reference.

## How Teams Use CSI Cloning in Practice

Teams working in DevOps or CI/CD environments often embed CSI volume cloning directly into their pipelines. It helps reduce setup time and ensures that test runs, [rollback strategies](https://www.simplyblock.io/use-cases/fast-backups-and-disaster-recovery/), or isolated environments use accurate data without the risk of data drift. By automating this process, they can support multiple stateful workloads in parallel and minimize disruption during application changes.
