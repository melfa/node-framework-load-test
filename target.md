# Target machine details

```
$ uname -a
Linux load-test.lan 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt25-1 (2016-03-06) x86_64 GNU/Linux

root@devhost2:~# pveversion -v
proxmox-ve-2.6.32: 3.4-156 (running kernel: 2.6.32-39-pve)
pve-manager: 3.4-6 (running version: 3.4-6/102d4547)
pve-kernel-2.6.32-39-pve: 2.6.32-156
lvm2: 2.02.98-pve4
clvm: 2.02.98-pve4
corosync-pve: 1.4.7-1
openais-pve: 1.1.4-3
libqb0: 0.11.1-2
redhat-cluster-pve: 3.2.0-2
resource-agents-pve: 3.9.2-4
fence-agents-pve: 4.0.10-2
pve-cluster: 3.0-17
qemu-server: 3.4-6
pve-firmware: 1.1-4
libpve-common-perl: 3.0-24
libpve-access-control: 3.0-16
libpve-storage-perl: 3.0-33
pve-libspice-server1: 0.12.4-3
vncterm: 1.1-8
vzctl: 4.0-1pve6
vzprocps: 2.0.11-2
vzquota: 3.1-2
pve-qemu-kvm: 2.2-10
ksm-control-daemon: 1.1-1
glusterfs-client: 3.5.2-1
 
root@devhost2:~# tw_cli /c4 show drivestatus
VPort Status         Unit Size      Type  Phy Encl-Slot    Model
------------------------------------------------------------------------------
p0    OK             u0   558.91 GB SAS   0   -            HITACHI HUS156060VL
p1    OK             u0   558.91 GB SAS   1   -            HITACHI HUS156060VL
root@devhost2:~# lshw -short
H/W path            Device      Class      Description
======================================================
                                system     X8DTU (To Be Filled By O.E.M.)
/0                              bus        X8DTU
/0/0                            memory     64KiB BIOS
/0/4                            processor  Intel(R) Xeon(R) CPU           E5630  @ 2.53GHz
/0/4/5                          memory     256KiB L1 cache
/0/4/6                          memory     1MiB L2 cache
/0/4/7                          memory     12MiB L3 cache
/0/8                            processor  Intel(R) Xeon(R) CPU           E5630  @ 2.53GHz
/0/8/9                          memory     256KiB L1 cache
/0/8/a                          memory     1MiB L2 cache
/0/8/b                          memory     12MiB L3 cache
/0/2c                           memory     System Memory
/0/2c/0                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/2c/1                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/2c/2                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/2c/3                         memory     DIMM [empty]
/0/2c/4                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/2c/5                         memory     DIMM [empty]
/0/3a                           memory     System Memory
/0/3a/0                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/3a/1                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/3a/2                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/3a/3                         memory     DIMM [empty]
/0/3a/4                         memory     4GiB DIMM 1066 MHz (0.9 ns)
/0/3a/5                         memory     DIMM [empty]
/0/48                           memory     Flash Memory
/0/48/0                         memory     4MiB FLASH Non-volatile 33 MHz (30.3 ns)
/0/1                            memory    
/0/2                            memory    
/0/100                          bridge     5520 I/O Hub to ESI Port
/0/100/1                        bridge     5520/5500/X58 I/O Hub PCI Express Root Port 1
/0/100/1/0          eth0        network    82576 Gigabit Network Connection
/0/100/1/0.1        eth1        network    82576 Gigabit Network Connection
/0/100/3                        bridge     5520/5500/X58 I/O Hub PCI Express Root Port 3
/0/100/5                        bridge     5520/X58 I/O Hub PCI Express Root Port 5
/0/100/7                        bridge     5520/5500/X58 I/O Hub PCI Express Root Port 7
/0/100/9                        bridge     7500/5520/5500/X58 I/O Hub PCI Express Root Port 9
/0/100/9/0          scsi4       storage    9750 SAS2/SATA-II RAID PCIe
/0/100/9/0/0.0.0    /dev/sda    disk       599GB 9750-4i    DISK
/0/100/9/0/0.0.0/1  /dev/sda1   volume     1006KiB BIOS Boot partition
/0/100/9/0/0.0.0/2  /dev/sda2   volume     126MiB Windows FAT volume
/0/100/9/0/0.0.0/3  /dev/sda3   volume     558GiB LVM Physical Volume
/0/100/13                       generic    7500/5520/5500/X58 I/O Hub I/OxAPIC Interrupt Controller
/0/100/14                       generic    7500/5520/5500/X58 I/O Hub System Management Registers
/0/100/14.1                     generic    7500/5520/5500/X58 I/O Hub GPIO and Scratch Pad Registers
/0/100/14.2                     generic    7500/5520/5500/X58 I/O Hub Control Status and RAS Registers
/0/100/14.3                     generic    7500/5520/5500/X58 I/O Hub Throttle Registers
/0/100/16                       generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.1                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.2                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.3                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.4                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.5                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.6                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/16.7                     generic    5520/5500/X58 Chipset QuickData Technology Device
/0/100/1a                       bus        82801JI (ICH10 Family) USB UHCI Controller #4
/0/100/1a.1                     bus        82801JI (ICH10 Family) USB UHCI Controller #5
/0/100/1a.2                     bus        82801JI (ICH10 Family) USB UHCI Controller #6
/0/100/1a.7                     bus        82801JI (ICH10 Family) USB2 EHCI Controller #2
/0/100/1d                       bus        82801JI (ICH10 Family) USB UHCI Controller #1
/0/100/1d.1                     bus        82801JI (ICH10 Family) USB UHCI Controller #2
/0/100/1d.2                     bus        82801JI (ICH10 Family) USB UHCI Controller #3
/0/100/1d.7                     bus        82801JI (ICH10 Family) USB2 EHCI Controller #1
/0/100/1e                       bridge     82801 PCI Bridge
/0/100/1e/1                     display    MGA G200eW WPCM450
/0/100/1f                       bridge     82801JIR (ICH10R) LPC Interface Controller
/0/100/1f.2                     storage    82801JI (ICH10 Family) 4 port SATA IDE Controller #1
/0/100/1f.3                     bus        82801JI (ICH10 Family) SMBus Controller
/0/100/1f.5         scsi3       storage    82801JI (ICH10 Family) 2 port SATA IDE Controller #2
/0/100/1f.5/0.0.0   /dev/cdrom  disk       DV-28S-V
/1                  tap102i0    network    Ethernet interface
```
