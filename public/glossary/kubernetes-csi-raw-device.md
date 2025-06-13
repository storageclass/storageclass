# What is Kubernetes CSI Raw Device?

Kubernetes CSI raw devices refer to block volumes exposed to pods as unformatted raw devices instead of mounted filesystems. This approach enables applications to format, partition, or use the storage device in ways that are not possible with traditional file-based mounts. It’s often used for performance-intensive workloads like databases, streaming engines, and virtual machines.

## Understanding Volume Modes in Kubernetes

Kubernetes allows Persistent Volumes (PVs) to operate in two modes: `Filesystem` and `Block`. The former mounts a volume with a filesystem, while the latter exposes the device directly as a raw block.

[Volume mode support](https://kubernetes.io/docs/concepts/storage/volumes/#volume-mode) is implemented via CSI drivers that signal compatibility with raw block provisioning. When pods request a volume in `Block` mode, Kubernetes skips the mount step and attaches the device directly to the container.

Raw devices allow applications with strict I/O patterns or storage requirements to handle formatting and data placement independently.

## Why Raw Block Devices Are Still Needed

Even with modern cloud-native storage, raw block devices serve a vital role. They offer predictable latency, eliminate filesystem overhead, and support direct disk access patterns that some workloads depend on.

Use cases that benefit from raw access include:

- Databases that handle their own journaling and caching  
- High-frequency trading systems or time-series databases  
- Virtual machine disks managed by KubeVirt  
- Backup targets requiring unbuffered I/O paths

In Kubernetes, CSI-based raw devices give operators fine-grained control over how volumes are consumed by pods.

## Configuration Patterns for CSI Raw Devices

To use raw devices, a pod must request a Persistent Volume Claim (PVC) with `volumeMode: Block`. The backing storage class and CSI driver must support raw volume allocation.

For example, a pod spec would look like this:

```yaml
volumeDevices:
  - name: raw-data
    devicePath: /dev/xvdb
```
The CSI driver ensures the raw volume is attached to the node and exposed at the specified path. There is no filesystem mount — the application takes full responsibility for how data is written and structured.

Some CSI plugins also support shared access and zonal awareness, which is critical when deploying in [multi-AZ disaster recovery configurations](https://www.simplyblock.io/use-cases/multi-availability-zone-disaster-recovery/).

## Trade-Offs and Operational Overhead

While raw devices are powerful, they come with operational considerations. Kubernetes does not manage formatting, so any pre-flight checks, partitioning, or encryption must be handled by init containers or the application itself.

Snapshotting, resizing, and backup processes also differ. File-level tools won't work on unformatted volumes, requiring block-level snapshot strategies or volume replication.

Teams leveraging [fast backup and disaster recovery](https://www.simplyblock.io/use-cases/fast-backups-and-disaster-recovery/) architectures often integrate raw device support with CSI snapshot APIs or external controllers to maintain consistency.

## Simplyblock Support for Kubernetes CSI Raw Devices

Simplyblock™ supports raw block mode via its CSI driver, enabling Kubernetes users to attach NVMe-over-TCP devices directly to pods. The volumes operate in `Block` mode, giving full access to the underlying device with no filesystem interference.

This is useful for IOPS-intensive applications, such as those using [databases on Kubernetes](https://www.simplyblock.io/use-cases/database-on-kubernetes/) or VM workloads with [KubeVirt storage requirements](https://www.simplyblock.io/use-cases/kubevirt-storage/). Because the driver supports multi-zone deployments, it enables raw volume access with failover and performance guarantees.

## Practical Guidance for Using Raw Devices Safely

For stable operation, raw block volumes should be paired with strict access control. Kubernetes access modes like `ReadWriteOnce` help prevent multiple writers unless the CSI driver explicitly supports shared block access.

Monitoring I/O, provisioning thresholds, and disk health is essential, as errors in a raw device are often unrecoverable. Alerts and logs should be tied to the block layer, not just the pod level.

Background on how raw devices have evolved from legacy Unix systems can be found in the [Wikipedia article on raw device usage](https://en.wikipedia.org/wiki/Raw_device), which explains how direct device access shaped early storage stacks.
