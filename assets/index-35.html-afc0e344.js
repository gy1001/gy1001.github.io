import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const t="/assets/5f86578500016aa806400426-b783cd5f.jpg",l={},p=e('<h1 id="_35-容器化守护进程-daemonset" tabindex="-1"><a class="header-anchor" href="#_35-容器化守护进程-daemonset" aria-hidden="true">#</a> 35-<strong>容器化守护进程 DaemonSet</strong></h1><p><img src="'+t+`" alt="img"></p><blockquote><p>能够生存下来的物种,并不是那些最强壮的,也不是那些最聪明的,而是那些对变化作出快速反应的。——达尔文</p></blockquote><p>在 Linux 系统中，有一种进程叫守护进程，英文是 daemon，这是一类在后台运行的特殊进程，用户执行特殊的系统任务。比如我们在 Linux 系统中，很多以 d 结尾的进程都是守护进程。</p><p>在 Kubernetes 中的 DaemonSet 严格意义上来说和守护进程关系其实不大。DaemonSet 的主要作用是用来控制 Daemon Pod。那么什么是 Daemon Pod 呢？Daemon Pod 具有如下一些特性：</p><ul><li>这个 Pod 运行在 Kubernetes 集群中的每一个节点（Node）上；</li><li>每个节点上只能运行一个 Deamon Pod 实例；</li><li>当有新的节点（Node）加入到 Kubernetes 集群时，Daemon Pod 会被自动拉起；</li><li>当有旧节点被删除时，其上运行的 Daemon Pod 也将被删除。</li></ul><p>DaemonSet 的典型应用场景如下：</p><ul><li>在集群每个节点上启动一个存储守护进程，比如 <code>glusted</code> 或者 <code>ceph</code>；</li><li>在每个节点上启动一个日志收集进程，比如 <code>fluentd</code> 或者 <code>filebeat</code>；</li><li>在集群的每个节点上面启动监控的守护进程，比如 Prometheus 的 <code>node-exporter</code>。</li></ul><h2 id="_1-创建-daemonset" tabindex="-1"><a class="header-anchor" href="#_1-创建-daemonset" aria-hidden="true">#</a> 1. 创建 DaemonSet</h2><p>我们可以创建一个描述 DaemonSet 的 yaml 文件，下面是一个简单的例子。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd
        <span class="token key atrule">image</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">:</span>v2.5.2
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单介绍一下其中的重要部分：</p><ul><li><p><code>kind</code>：指定 DaemonSet；</p></li><li><p><code>.spec.template</code> ：是 Pod 模板，对应的 DaemonSet 启动的 Pod 的信息描述；</p></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.selector
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>：用来和 Pod 匹配的 selector，需要和</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.template
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>中描诉的 Pod 的 label 匹配上。从 Kubernetes 1.8 版本之后，这个字段必须指定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.selector
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>支持两种：</p><ul><li><p><code>matchLabels</code> ：和 Pod 的 label 进行匹配。</p></li><li><p><code>matchExpression</code> ：更加灵活的匹配，支持集合匹配，Operator 包括 <code>In</code> 和 <code>NotIn</code>。下面是一个简单的 matchExpression 示例，表示：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/e2e<span class="token punctuation">-</span>az<span class="token punctuation">-</span>name
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
    <span class="token key atrule">values</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> e2e<span class="token punctuation">-</span>az1
    <span class="token punctuation">-</span> e2e<span class="token punctuation">-</span>az2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h2 id="_2-使用-daemonset" tabindex="-1"><a class="header-anchor" href="#_2-使用-daemonset" aria-hidden="true">#</a> 2. 使用 DaemonSet</h2><p>同样的，我们可以通过 <code>kubectl apply</code> 创建 DaemonSet。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> fluentd.yaml <span class="token parameter variable">-n</span> imooc
daemonset.apps/fluentd-app configured
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>apply 成功之后，我们可以查看一下集群中的 Pod，如下，因为我们集群只有三个 worker 节点，所以一共有三个 Pod。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get po <span class="token parameter variable">-n</span> imooc
NAME                               READY   STATUS              RESTARTS   AGE
fluentd-app-6ml24                  <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          8s
fluentd-app-6sxz9                  <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          8s
fluentd-app-fknkb                  <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          8s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再来看一下集群中 DaemonSet 对象。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get daemonset <span class="token parameter variable">-n</span> imooc
NAME          DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
fluentd-app   <span class="token number">3</span>         <span class="token number">3</span>         <span class="token number">3</span>       <span class="token number">3</span>            <span class="token number">3</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>          4m26s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 DaemonSet 对象的简略描述信息中可以看到该 DaemonSet 控制的 Pod 的状态：</p><ul><li>DESIRED：期望运行的 Pod 实例的个数；</li><li>CURRENT：当前运行的 Pod 实例的个数；</li><li>READY：状态 ready 的 Pod 实例的个数；</li><li>…</li></ul><p>我们再通过 <code>kubectl describe ds</code> 查看一下 DaemonSet 的明细信息，没错，这里的 ds 是 DaemonSet 的缩写。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe ds fluentd-app <span class="token parameter variable">-n</span> imooc
Name:           fluentd-app
Selector:       <span class="token assign-left variable">name</span><span class="token operator">=</span>fluentd-app
Node-Selector:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Labels:         k8s-app<span class="token operator">=</span>fluentd
Annotations:    deprecated.daemonset.template.generation: <span class="token number">2</span>
                kubectl.kubernetes.io/last-applied-configuration:
                  <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;apps/v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;DaemonSet&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;labels&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;k8s-app&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;fluentd&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;fluentd-app&quot;</span>,<span class="token string">&quot;namespace&quot;</span>:&quot;i<span class="token punctuation">..</span>.
Desired Number of Nodes Scheduled: <span class="token number">3</span>
Current Number of Nodes Scheduled: <span class="token number">3</span>
Number of Nodes Scheduled with Up-to-date Pods: <span class="token number">3</span>
Number of Nodes Scheduled with Available Pods: <span class="token number">3</span>
Number of Nodes Misscheduled: <span class="token number">0</span>
Pods Status:  <span class="token number">3</span> Running / <span class="token number">0</span> Waiting / <span class="token number">0</span> Succeeded / <span class="token number">0</span> Failed
Pod Template:
  Labels:  <span class="token assign-left variable">name</span><span class="token operator">=</span>fluentd-app
  Containers:
   fluentd:
    Image:      fluentd
    Port:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Host Port:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Limits:
      cpu:     100m
      memory:  200Mi
    Requests:
      cpu:        100m
      memory:     200Mi
    Environment:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
  Volumes:        <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Events:
  Type    Reason            Age    From                  Message
  ----    ------            ----   ----                  -------
  Normal  SuccessfulCreate  6m24s  daemonset-controller  Created pod: fluentd-app-6sxz9
  Normal  SuccessfulCreate  6m24s  daemonset-controller  Created pod: fluentd-app-6ml24
  Normal  SuccessfulCreate  6m24s  daemonset-controller  Created pod: fluentd-app-fknkb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从这个输出里面我们可以看到几点信息：</p><ul><li>DaemonSet 的基本信息，包括名字，label 等；</li><li>Pod 的调度情况；</li><li>Pod 模板，也就是 Pod Template；</li><li>Events：主要包括创建 pod 的事件；</li></ul><p>下面我们看一下 DaemonSet 的自动拉起功能的特性。</p><p>为了展示自动拉起，很简单，我们只要删除 DaemonSet 之前拉起的 Pod，然后观察有没有新的 Pod 创建出来即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                               READY   STATUS    RESTARTS   AGE
fluentd-app-6ml24                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          35m
fluentd-app-6sxz9                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          35m
fluentd-app-fknkb                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          35m
nginx-deployment-57f49c59d-8dzn4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          20h
nginx-deployment-57f49c59d-9jvrp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          20h
nginx-deployment-57f49c59d-m57sr   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          20h
$ kubectl delete pods fluentd-app-6ml24 <span class="token parameter variable">-n</span> imooc
pod <span class="token string">&quot;fluentd-app-6ml24&quot;</span> deleted
$ kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                               READY   STATUS    RESTARTS   AGE
fluentd-app-2xjmg                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          12s
fluentd-app-6sxz9                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          36m
fluentd-app-fknkb                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          36m
nginx-deployment-57f49c59d-8dzn4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          20h
nginx-deployment-57f49c59d-9jvrp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          20h
nginx-deployment-57f49c59d-m57sr   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          20h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，在老的 Pod <code>fluentd-app-6ml24</code> 被删除之后，新的 Pod <code>fluentd-app-2xjmg</code> 立刻就被创建出来了。</p><p>DaemonSet 在新创建的 Kubernetes 的 Node 节点上自动创建的特性，这里就不再展示了。</p><p>虽然 DaemonSet 默认会在所有的节点上启动相同的 Pod，但是有时候我们还是希望只在某些指定的节点上面运行 Pod。对于这个问题有两种解决方案：</p><ul><li>指定 <code>.spec.template.spec.nodeSelector</code> ，DaemonSet 将在能够与 Node Selector 匹配的节点上创建 Pod。</li><li>指定 <code>.spec.template.spec.affinity</code> ，然后 DaemonSet 将在能够与 nodeAffinity 匹配的节点上创建 Pod。</li></ul><h4 id="nodeselector-示例" tabindex="-1"><a class="header-anchor" href="#nodeselector-示例" aria-hidden="true">#</a> nodeSelector 示例</h4><p>我们首先给某个节点打上特定的 label，使用命令 <code>kubectl labels</code> 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl label nodes <span class="token operator">&lt;</span>node-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>label_key<span class="token operator">&gt;=</span><span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在 DaemonSet 的 yaml 文件中指定 nodeSelector。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
    		<span class="token key atrule">&lt;key&gt;</span><span class="token punctuation">:</span> &lt;value<span class="token punctuation">&gt;</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd
        <span class="token key atrule">image</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">:</span>v2.5.2
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nodeaffinity-示例" tabindex="-1"><a class="header-anchor" href="#nodeaffinity-示例" aria-hidden="true">#</a> nodeAffinity 示例</h4><p>nodeAffinity 目前支持 4 种策略，分别是：</p><ul><li>requiredDuringSchedulingIgnoredDuringExecution：表示 Pod 必须部署到满足条件的节点上，如果没有满足条件的节点，就不停重试。</li><li>requiredDuringSchedulingRequiredDuringExecution：类似 <code>requiredDuringSchedulingIgnoredDuringExecution</code>，不过如果节点标签发生了变化，不再满足pod指定的条件，则重新选择符合要求的节点。</li><li>preferredDuringSchedulingIgnoredDuringExecution：表示优先部署到满足条件的节点上，如果没有满足条件的节点，就忽略这些条件，按照正常逻辑部署。</li><li>preferredDuringSchedulingIgnoredDuringExecution：表示优先部署到满足条件的节点上，如果没有满足条件的节点，就忽略这些条件，按照正常逻辑部署。其中RequiredDuringExecution表示如果后面节点标签发生了变化，满足了条件，则重新调度到满足条件的节点。</li></ul><p>下面我们以 requiredDuringSchedulingIgnoredDuringExecution 举例，看一下 DaemonSet 的一个示例 yaml。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>app
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
  			<span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
  				<span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
  					<span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
  					<span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
  			  		<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> &lt;label<span class="token punctuation">-</span>name<span class="token punctuation">&gt;</span>
  			    		<span class="token key atrule">operator</span><span class="token punctuation">:</span> In
  			    		<span class="token key atrule">values</span><span class="token punctuation">:</span>
  			    		<span class="token punctuation">-</span> &lt;value1<span class="token punctuation">&gt;</span>
  			    		<span class="token punctuation">-</span> &lt;value2<span class="token punctuation">&gt;</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd
        <span class="token key atrule">image</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">:</span>v2.5.2
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-更新-daemonset" tabindex="-1"><a class="header-anchor" href="#_3-更新-daemonset" aria-hidden="true">#</a> 3. 更新 DaemonSet</h2><p>如果 Node 节点的 label 发生改变，DaemonSet 会立刻根据节点的新 label 来做选择并调度 Pod，对于满足标签选择器的节点会将 Pod 调度上去，对于不满足标签选择器的节点则会删除上面的 Pod。</p><p>删除 DaemonSet 的时候，如果选择了参数 <code>--cascade=false</code> 则会保留之前 DaemonSet 创建出来的 Pod。然后可以创建具有不同模板的新 DaemonSet。具有不同模板的新 DaemonSet 将能够通过标签匹配并识别所有已经存在的 Pod。 如果有任何 Pod 需要替换，则 DaemonSet 根据它的 <code>updateStrategy</code> 来替换。</p><h2 id="_4-daemonset-工作原理" tabindex="-1"><a class="header-anchor" href="#_4-daemonset-工作原理" aria-hidden="true">#</a> 4. DaemonSet 工作原理</h2><p>DaemonSet 的工作原理核心问题是要弄懂如何保证每个 Node 上有且只有一个被管理的 Pod。</p><p>这个好解决，我们只要拿到 Node 列表，然后检查每个 Node 节点上是不是运行指定的 label 的 Pod 就行了。而这正好是 DaemonSet Controller 做的事情，关于 Kubernetes 的控制器我们前面有介绍过，控制器会不断的检查状态是不是预期的，如果不是预期的就做一些处理。对于 DaemonSet Controller 这里遍历所有的 Node，然后状态会有如下几种情况：</p><ul><li>没有指定 label 的 Pod 在运行，则需要在这个 Node 节点上创建一个这样的 Pod；</li><li>有指定 label 的 Pod 在运行，但是数量不是 1 个，可能是 2 个或者 3 个，则需要将多余的 Pod 删除；</li><li>正好有一个指定 label 的 Pod 在运行，这个是预期的行为，不做处理。</li></ul><p>那么如何在新创建出来的 Node 创建新的 Pod 呢？或者说怎么将 Pod 调度到指定 Node 上呢？还记得我们之前 Pod 使用那章介绍的亲和性吗？是的，没错，这里使用的就是亲和性调度。</p><p>亲和性调度里面有一个是 nodeAffinity，就是用来将 Pod 调度到指定的 Node 节点上的。下面是一个简单的例子。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
    <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
      <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>name
            <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
            <span class="token key atrule">values</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> &lt;new node name<span class="token punctuation">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这个例子有几点需要说明的是：</p><ul><li>requiredDuringSchedulingIgnoredDuringExecution：每次调度的时候才考虑这个亲和性条件，如果之后 Node 节点的信息发生变更，并不会影响之前运行的 Pod。</li><li>nodeSelectorTerms：具体的筛选条件，我们这里使用的 matchExpression，通过 node name 来进行比对选择。</li></ul><p>看到这里，我们应该明白了，DaemonSet 的控制器在新的 Node 几点上创建 Pod 的时候，只需要加上类似这样一个 nodeAffinity 定义，然后在 select 选项里面通过新 Node 节点的名字进行匹配即可。</p>`,56),i=[p];function o(c,u){return s(),a("div",null,i)}const r=n(l,[["render",o],["__file","index-35.html.vue"]]);export{r as default};
