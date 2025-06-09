# What is iSCSI?

iSCSI, or Internet Small Computer Systems Interface, is a transport protocol that enables SCSI commands to be transmitted over IP networks. It allows storage devices to be accessed and managed using standard Ethernet infrastructure, without requiring specialized Fibre Channel hardware. By encapsulating SCSI commands inside TCP packets, [iSCSI](https://en.wikipedia.org/wiki/ISCSI) delivers block-level storage over LAN or WAN connections, presenting remote disks to hosts as if they were locally attached.

The protocol supports raw block access, making it ideal for applications like databases, virtual machines, and filesystems that need direct disk control. iSCSI is widely used in SAN environments where performance, cost-efficiency, and broad compatibility matter.

## How iSCSI Works Over IP Networks

iSCSI follows a client-server model. The initiator (typically a server or hypervisor) sends SCSI commands to a remote target (the storage system) over TCP/IP. These connections are made using IP networking infrastructure, and communication is secured and managed using authentication protocols and persistent sessions.

The storage target presents block devices, also known as LUNs, which are accessed by the initiator as if they were locally attached disks. Unlike file-level protocols like NFS or SMB, iSCSI enables direct block access, which is critical for performance-sensitive workloads like virtual machines and databases.

On Linux systems, the standard utility for managing iSCSI sessions is [`iscsiadm`](https://linux.die.net/man/8/iscsiadm), which supports target discovery, login/logout, and session persistence.


## Benefits of Using iSCSI in Storage Architectures

iSCSI remains widely adopted in mid-sized to enterprise storage setups due to its balance of performance, cost-efficiency, and flexibility. Key benefits include:

- **Leverages existing IP infrastructure** – no need for dedicated Fibre Channel hardware  
- **Works with commodity Ethernet switches** – reducing hardware costs  
- **Supports long-distance replication** – over WANs using TCP/IP  
- **Scales with standard networking practices** – including VLANs and QoS policies  
- **Compatible with most operating systems and hypervisors**

Its simplicity and reliability make iSCSI suitable for many environments that don't need the ultra-low latency of NVMe but still require persistent, block-level access across distributed systems.

## iSCSI vs Other Block Storage Protocols

Compared to protocols like NVMe-over-Fabrics or Fibre Channel, iSCSI is easier to deploy and widely supported, though it often introduces slightly higher latency. It's well-suited to environments where performance is important, but so are compatibility, maintainability, and cost.

Even as NVMe/TCP gains traction, iSCSI continues to support critical functions in [software-defined storage](https://www.simplyblock.io/use-cases/software-defined-storage/), [backup and recovery](https://www.simplyblock.io/use-cases/fast-backups-and-disaster-recovery/), and [VM infrastructure](https://www.simplyblock.io/use-cases/vmware-migration-kubernetes/), especially in scenarios where deterministic throughput isn’t the top priority.

It also remains a common choice for [database performance optimization](https://www.simplyblock.io/use-cases/database-performance-optimization/) in systems that rely on intelligent caching or tiered storage designs.

## Simplyblock™ as a Next-Gen Block Storage Approach

While iSCSI offers a solid foundation for many storage environments, its design shows limitations in high-performance or distributed workloads. Simplyblock delivers NVMe-over-TCP, an evolution of IP-based block storage that keeps the simplicity of iSCSI but significantly increases throughput and reduces latency.

Running entirely over standard Ethernet, Simplyblock removes the need for RDMA or Fibre Channel while providing dynamic provisioning, CSI integration, and snapshot support. It’s a clean fit for modern Kubernetes clusters and multi-tenant platforms that expect better IOPS performance without giving up operational flexibility.

## Why iSCSI Still Has a Place in Modern Infrastructure

iSCSI continues to be a practical solution in many infrastructure stacks. Legacy systems that rely on iSCSI-based SANs remain in production due to their reliability and long-term vendor support. For environments without NVMe-capable infrastructure, iSCSI still offers a compatible and predictable way to deliver block storage across IP.

It also proves useful in network-constrained architectures or setups where simplicity and OS-level support are more important than low latency. iSCSI integrates easily with hypervisors and backup tooling, making it a dependable choice for teams managing mixed environments. For new deployments where performance is a primary goal, however, NVMe-over-TCP is often the better long-term option.
