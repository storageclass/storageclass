# What is Static Provisioning in Kubernetes?

Static provisioning in Kubernetes refers to the manual process of creating and managing PersistentVolumes (PVs) ahead of time. These pre-created volumes are then matched to user-defined PersistentVolumeClaims (PVCs) based on resource requests and selectors.

This model gives administrators precise control over where and how storage is allocated but trades off the automation benefits of dynamic provisioning.

## How Static Provisioning Works

An administrator provisions a volume on a backend storage system — for example, creating a disk on a cloud provider or allocating a specific path on a shared NFS server. A PersistentVolume resource is then created in the Kubernetes API, referencing this external resource directly.

When a user submits a PVC that matches the PV’s criteria (like storage class, size, and access mode), Kubernetes binds the claim to the existing volume. Unlike dynamic provisioning, the volume isn't created in response to the claim — it must already exist.

This method is described in the [Kubernetes PersistentVolume documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), which outlines how statically provisioned volumes are integrated with claims and policies.

## When Static Provisioning Makes Sense

While dynamic provisioning is the default in most environments, static provisioning is still relevant when you need fine-grained control. For example, legacy systems with fixed disk paths or specialized hardware that cannot be provisioned through CSI may require static configuration.

It also fits well in environments where storage is pre-allocated by compliance or cost constraints — such as air-gapped environments or infrastructure with hardware zoning rules.

## Manual Volume Setup and Risks

Administrators must manage the lifecycle of statically provisioned volumes outside Kubernetes. If a pod deletes its PVC, the volume is not destroyed. Unless the reclaim policy is explicitly set to delete, the volume will persist and may become orphaned.

This can lead to resource leaks, data exposure, or configuration drift. Monitoring tools and documentation are essential to prevent these issues from affecting long-term operations.

The risks of unmanaged state are similar to what system administrators faced in early Unix-based systems, where storage abstraction was minimal and manual oversight was required. A relevant comparison can be found in [Wikipedia’s article on volume managers](https://en.wikipedia.org/wiki/Volume_manager).

## Simplyblock Integration for Legacy Storage Use Cases

Simplyblock™ supports environments where dynamic provisioning isn't possible or preferred. In these cases, operators can manually attach NVMe-over-TCP volumes to Kubernetes nodes and expose them using PersistentVolumes.

This is particularly useful for teams operating in [air-gapped edge environments](https://www.simplyblock.io/supported-environments/edge-air-gapped-storage/) or [hybrid multi-cloud infrastructure](https://www.simplyblock.io/supported-environments/hybrid-multi-cloud-storage/), where automation may be limited or unavailable.

## Static Provisioning in Mixed Storage Environments

Static provisioning can co-exist with dynamic provisioning in the same cluster. You might run [stateful services on Kubernetes](https://www.simplyblock.io/use-cases/database-on-kubernetes/) using dynamic volumes, while certain legacy workloads rely on pre-provisioned disks.

This hybrid model allows organizations to gradually adopt CSI-based automation without overhauling existing storage strategies. However, careful planning is required to avoid conflicts in reclaim policies and binding behavior.

## Best Practices for Static Provisioning

To use static provisioning effectively:

- Document each statically created PV and its corresponding backend resource  
- Use clear naming conventions to distinguish static from dynamic volumes  
- Set reclaim policies (`Retain`, `Recycle`, or `Delete`) according to lifecycle expectations  
- Monitor volume usage and orphaned state through storage metrics  
- Avoid sharing static PVs unless access control is enforced at the backend

Done right, static provisioning ensures reliability for workloads that can’t rely on automation — but it demands strict operational hygiene.
