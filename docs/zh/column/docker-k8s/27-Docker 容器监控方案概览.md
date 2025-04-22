# 27-Docker 容器监控方案概览

![img](./assets/5f6170ce0001fce406400425.jpg)

> 自信和希望是青年的特权。——大仲马

# Docker 容器监控

这篇文章介绍了一下如何对 Docker 容器进行监控。

在正式说 Docker 容器监控之前，我们先来说一下简单的监控。监控一般根据监控目标的不同而不同，比如我们要监控一台主机，那么我们需要监控这台集群的内存和 CPU 使用，内存包括总内存、当前使用内存、剩余内存、甚至 Cache/Buffer 等，CPU 指标包括 CPU 使用率、CPU 用户态使用率、内核态使用率等。如果我们要监控一个进程，那么我们需要监控这个进程的 CPU 使用率和内存使用率等。比如我们在生产环境遇到服务器的 CPU 飙升到一个比较高的值，我们就需要知道各个进程的 CPU 使用率。下图是我本机的 htop （htop 命令类似系统命令 top）命令的显示截图。

![图片描述](./assets/5f61713a000170a018770697.png)

那我们监控 Docker 容器要监控的一部分主要信息就是各个容器的资源使用情况，比如 CPU、内存等。下面介绍一下监控 Docker 容器的常用方式。

## 1. Docker Stats

首先介绍的是 Docker 自带的原生命令 stats，我们可以通过命令 `docker stats --help` 查看 stats 命令的介绍。

```bash
➜  ~ docker stats --help

Usage:	docker stats [OPTIONS] [CONTAINER...]

Display a live stream of container(s) resource usage statistics

Options:
  -a, --all             Show all containers (default shows just running)
      --format string   Pretty-print images using a Go template
      --no-stream       Disable streaming stats and only pull the first result
      --no-trunc        Do not truncate output
```

如上所示，stats 命令用来实时显示容器的资源使用统计。我们下面以一个运行中的 busybox 容器为例 `docker stats --all <busybox-container-id>` 。显示的资源使用主要包括 CPU、内存、网络 IO、磁盘 IO 等。

![图片描述](./assets/5f61714f00011b3135600100.png)

Docker Stats 命令用来监控容器有点类似系统自带的 top 命令，用来实时查看一个运行中的容器的资源使用情况，优点是命令是原生命令，简单易用，缺点也很明显，历史数据不会存储，所以一般需要和外部系统结合起来使用。

## 2. cAdvisor

cAdvisor 是 Container Advisor 的简称，Advisor 一般中文翻译成指导、顾问。从名字我们可以看出 cAdvisor 的定位是想充当用户的容器 “指导”，通过 cAdvisor 我们可以了解到容器的资源使用和性能情况。

如果我们要监控 Java 进程的资源使用情况，一般是使用 Java Agent 来做，在目标进程启动的时候把一个 Java Agent Class 作为参数传递进去，然后每个 Java Agent 再将进程的指标暴露出来。但是这种方式对于容器监控来说非常的繁琐，本来一个容器就是一个镜像的运行时实例，我们要添加 Java Agent 不是特别好加的。

通过 cAdvisor 来监控 Docker 容器，我们只需要在目标 Docker 容器的同一个主机上启动一个 cAdvisor 容器即可。也就是说 cAdvisor 容器可以监控这台机器上的所有的 Docker 容器。下面我们演示一下。

首先通过 docker pull 下载 cAdvisor 镜像，注意 cAdvisor 镜像的全称是 google/cadvisor，在 docker pull 的时候需要指定全称，不然会下载失败。

```bash
➜  ~ docker pull google/cadvisor
Using default tag: latest
latest: Pulling from google/cadvisor
Digest: sha256:815386ebbe9a3490f38785ab11bda34ec8dacf4634af77b8912832d4f85dca04
...
```

cAdvisor 启动也比较简单，通过下面命令

```bash
➜  ~ docker run \
    --volume=/:/rootfs:ro \
    --volume=/var/run:/var/run:rw \
    --volume=/sys:/sys:ro \
    --volume=/var/lib/docker/:/var/lib/docker:ro \
    --publish=8081:8080 \
    --detach=true \
    --name=cadvisor \
    google/cadvisor:latest
8a2fda9bb419544173e8a6ae7f0fb3b13d5b71a6fcddfc4fbaa74f6ccf8e2124
```

主要其中的 publish 参数是将 cAdvisor 内部的 8080 端口映射到主机的 8081 端口，然后我们用浏览器打开 `localhost:8081` 即可访问到容器的监控概括。

![图片描述](./assets/5f6171650001a33817281027.png)

监控数据主要包括几个模块：

### 1.1 监控数据

#### Isolation

表示资源隔离情况。

![图片描述](./assets/5f6171700001a61511010387.png)

#### 资源使用概览

首先是资源使用概览，是以仪表盘来表示的，包括 CPU、内存、文件系统等。其中文件系统中的 #1、#2 表示的是不同的挂载点。

![图片描述](./assets/5f617179000108a910990248.png)

#### CPU 使用率

CPU 使用率包括三个部分，总的使用率，每个 core 使用率和用户态内核态使用率。我们可以看到三个图的曲线形状基本一致。

![图片描述](./assets/5f617181000195e409770945.png)

#### 内存使用

![图片描述](./assets/5f61718e0001375109770414.png)

#### 网络使用

![图片描述](./assets/5f6171970001929209810674.png)

#### 文件系统使用

![图片描述](./assets/5f6171a10001609709800379.png)

### 1.2 监控多个容器

我们点击页面顶部的 ***Docker Containers*** 可以查看这台机器上运行的所有 Docker 容器的情况，要想查看单个容器的监控数据直接点击 ***Subcontainers*** 列表中的容器即可，然后即可展示 1.1 中所示的内存。

![图片描述](./assets/5f6171a900015d2a10010876.png)

## 3. Sysdig

在 Sysdig 的 [github 链接](https://github.com/draios/sysdig) 上下面的这句话来描述 sysdig:

> Linux system exploration and troubleshooting tool with first class support for containers.

简单翻译一下

> 原生支持容器的Linux 系统探测和故障排查工具。

具体来说，Sysdig 由两个单词组成：system（系统）+ dig（挖掘），由此可以对 Sysdig 的定位窥见一斑：系统监控。实际上 Sysdig 是一个开源监控命令工具集，提供了操作系统层级的监控命令行功能，还原生支持 docker 的监控。另外 Sysdig 还提供了 Csysdig 工具，一个可以在命令行环境中交互式地、易用地、可视化监控信息查看界面。

Sysdig 是一款非常强大的 “瑞士军刀” 式的系统监控工具，通过 Sysdig 我们可以全方位的获取系统的性能指标，包括 CPU、内存、网络、IO 等。除了直接提供数据之外，Sysdig 还提供了丰富的命令行诊断工具直接对系统进行诊断式获取数据，比如：

- 按照 CPU 的使用率对进程进行排序，找到 CPU 使用率最高的那个；
- 按照发送网络数据报文的多少对进程进行排序；
- 找到打开最多文件描述符的进程；
- 查看哪些进程修改了指定的文件；
- 打印出某个进程的 HTTP 请求报文；
- 找到用时最久的系统调用；
- 查看系统中所有的用户都执行了哪些命令。
- ……

Sysdig 的强大得益于它的工作原理，简单来说，Sysdig 通过在内核模块中多种系统调用注册特定的 hook，这样当有系统调用发生和完成的时候，它会把系统调用相关的 metric 信息拷贝到特定的 buffer，然后用户模块的组件对数据信息处理（解压、解析、过滤等），并最终通过 sysdig 命令行和用户进行交互。

![图片描述](./assets/5f6171b80001f55110240886.png)

下面我们简单演示一下 Sysdig 的使用。首先我们通过命令 `curl -s https://s3.amazonaws.com/download.draios.com/stable/install-sysdig | sudo bash` 进行安装，这条命令会自动检测我们的系统版本，选择合适的版本进行安装。我这里测试的系统的 Ubuntu 系统可以安装成功，Mac OS 和 CentOS 都安装失败了。

```bash
root@xxx:~# curl -s https://s3.amazonaws.com/download.draios.com/stable/install-sysdig | sudo bash
* Detecting operating system
* Installing Sysdig public key
OK
* Installing sysdig repository
* Installing kernel headers
* Installing sysdig

Selecting previously unselected package dkms.
(Reading database ... 113127 files and directories currently installed.)
Preparing to unpack .../dkms_2.8.1-5ubuntu1_all.deb ...
Unpacking dkms (2.8.1-5ubuntu1) ...
Selecting previously unselected package sysdig.
Preparing to unpack .../sysdig_0.26.7_amd64.deb ...
Unpacking sysdig (0.26.7) ...
Setting up dkms (2.8.1-5ubuntu1) ...
Setting up sysdig (0.26.7) ...
Loading new sysdig-0.26.7 DKMS files...
Building for 5.4.0-31-generic
Building initial module for 5.4.0-31-generic
Done.
sysdig-probe.ko:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.4.0-31-generic/updates/dkms/

depmod....

DKMS: install completed.
Processing triggers for man-db (2.9.1-1) ...
```

下面我们简单演示一下通过 sysdig 获取系统信息。

```bash
root@xxx:~# sysdig -c topprocs_net	//获取使用网络最多的进程
```

![图片描述](./assets/5f6171c300015d2a10010876.png)

```bash
root@xxx:~# sysdig -c topprocs_cpu	//获取 CPU 使用率最高的进程列表
```

![图片描述](./assets/5f6171d00001340317960588.png)

```bash
root@xxx:~# sysdig -c topprocs_file		//查看磁盘使用最多的进程列表
```

![图片描述](./assets/5f6171da00018fec18480386.png)

当然 Sysdig 最强大的还是 Csysdig，我们来一起看一下。

```bash
root@xxx:~# csysdig
```

![图片描述](./assets/5f6171e500013f0233821980.png)

如上图所示，Csysdig 初始显示类似 top 命令显示的进程列表，包括 PID、CPU、内存、磁盘使用，网络等。我们注意看最下面一行的有一个 F2 Views，我们点击 F2 看一下。
![图片描述](./assets/5f6171f20001b1c429221980.png)

我们可以看到 Csysdig 支持的 View 非常多，包括：

- Connections；
- Containers；
- Containers Errors；
- Directories。

值得一提的是还有几个 Kubernetes 的对象的 View，也就是说 Sysdig 也是可以用来监控 Kubernetes 的。

切换到 Containers View 模块上就能看到这台机器上面运行的所有容器的信息（我当前这台集群上面只运行了一个 busybox），如下。

![图片描述](./assets/5f6171ff00011a3628500220.png)

## 4. 总结

本篇文章介绍了 Docker 监控的几种工具：

- Docker Stats，原生的命令；
- cAdvisor，Google 出品的专门用来监控 Docker 的工具；
- Sysdig，瑞士军刀式的系统监控工具，原生支持 Docker。

综合来看背靠一个好爹且专一的 cAdvisor 使用的更加广泛，比如 Kubernetes 中就自动集成了 cAdvisor。在这里我也推荐各位使用 cAdvisor 来扩展自己的监控系统。