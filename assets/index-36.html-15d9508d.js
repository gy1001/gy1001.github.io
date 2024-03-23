import{_ as l,M as t,p as i,q as p,R as s,t as n,N as o,a1 as a}from"./framework-e8cb8151.js";const c="/assets/5f8cf1d700011d5f06400426-3d545349.jpg",r={},d=a('<h1 id="_36-kubernetes-replicationcontroller-和-replicaset-介绍" tabindex="-1"><a class="header-anchor" href="#_36-kubernetes-replicationcontroller-和-replicaset-介绍" aria-hidden="true">#</a> 36-Kubernetes ReplicationController 和 ReplicaSet 介绍</h1><p><img src="'+c+`" alt="img"></p><blockquote><p>人生太短，要干的事太多，我要争分夺秒。——爱迪生</p></blockquote><p>前面我们的示例中都是单个 Pod 的介绍，但是实际在生产应用中并不推荐直接使用 Pod 对象来部署应用，而是使用控制器来管理我们的应用，常见的控制有：ReplicationController 、ReplicaSet 和 Deployment 等。这章我们介绍一下 ReplicationController 和 ReplicaSet。</p><h2 id="_1-replicationcontroller" tabindex="-1"><a class="header-anchor" href="#_1-replicationcontroller" aria-hidden="true">#</a> 1. ReplicationController</h2><p>ReplicationController 确保集群内任何时刻都有指定的 Pod 副本处于运行状态，这样我们就能保证应用的高可用。</p><h4 id="_1-1-创建" tabindex="-1"><a class="header-anchor" href="#_1-1-创建" aria-hidden="true">#</a> 1.1 创建</h4><p>下面的示例是使用 ReplicationController 运行 nginx web 服务器的三副本。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ReplicationController
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 yaml 文件中有几个重要的地方：</p><ul><li>kind: 指定为 ReplicationController；</li><li>metadata: 指定该 ReplicationController 的一些元信息，比如 name 等；</li><li>spec：该 ReplicationController 的核心定义，包括几个部分： <ul><li>replicas：定义要运行的 Pod 的副本数；</li><li>selector：控制器用来筛选 Pod，需要和下面的 Pod template 定义中的 metadata 信息一致；</li><li>template：该 ReplicationController 管理的 Pod 的定义模板，下面定义和 Pod 的定义一致。</li></ul></li></ul><h4 id="_1-2-使用" tabindex="-1"><a class="header-anchor" href="#_1-2-使用" aria-hidden="true">#</a> 1.2 使用</h4><p>通过 <code>kubectl apply</code> 创建 ReplicationController 对象，下面命令中的 imooc 是我自己创建的用来跑 demo 的 namespace，大家实践的使用可以替换成自己的 namespace 名字。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> nginx-rc.yaml <span class="token parameter variable">-n</span> imooc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以通过 <code>kubectl describe rc</code> 来查看该 ReplicationController，这里的 rc 就是 ReplicationController 的简写。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe rc nginx <span class="token parameter variable">-n</span> imooc
Name:         nginx
Namespace:    imooc
Selector:     <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Labels:       <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;ReplicationController&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx&quot;</span>,<span class="token string">&quot;namespace&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;imooc&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;spec&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;replicas&quot;</span>:3,&quot;s<span class="token punctuation">..</span>.
Replicas:     <span class="token number">3</span> current / <span class="token number">3</span> desired
Pods Status:  <span class="token number">3</span> Running / <span class="token number">0</span> Waiting / <span class="token number">0</span> Succeeded / <span class="token number">0</span> Failed
Pod Template:
  Labels:  <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
  Containers:
   nginx:
    Image:      nginx
    Port:       <span class="token number">80</span>/TCP
    Host Port:  <span class="token number">0</span>/TCP
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
  Type    Reason            Age    From                    Message
  ----    ------            ----   ----                    -------
  Normal  SuccessfulCreate  3m43s  replication-controller  Created pod: nginx-q5pdl
  Normal  SuccessfulCreate  3m43s  replication-controller  Created pod: nginx-2qkhd
  Normal  SuccessfulCreate  3m43s  replication-controller  Created pod: nginx-xggxr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的输出中有几点值得关注的是：</p><ul><li>Replicas：表示当前集群中有几个 Pod 副本在运行，<code>3 current / 3 desired</code> 表示期望运行的 Pod 是 3 个，当前运行的Pod 也是 3 个，也就是正常；</li><li>Pods Status：表示集群中运行的 Pod 的状态。<code>3 Running / 0 Waiting / 0 Succeeded / 0 Failed</code> 表示目前有 3 个 Pod 处于 Running 状态；</li><li>Events：events 在 Kubernetes 是非常重要的信息，基本每个 Kubernetes 对象都有 events 字段。我们看到这里的 events 创建了三个以 nginx 作为前缀命名的 Pod。</li></ul><p>我们可以通过 <code>kubectl get pods</code> 来查看一下这个 ReplicationController 创建出来的 pod。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get pods <span class="token parameter variable">-n</span> imooc <span class="token operator">|</span> <span class="token function">grep</span> nginx
nginx-2qkhd           <span class="token number">1</span>/1     Running   <span class="token number">0</span>          <span class="token number">1</span>
nginx-q5pdl           <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4h30m
nginx-xggxr           <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4h30m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们展示一下 ReplicationController 自动拉起的功能。首先将上面的三个 Pod 任选一个删除，比如第一个。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl delete po nginx-2qkhd <span class="token parameter variable">-n</span> imooc
pod <span class="token string">&quot;nginx-2qkhd&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们再通过 <code>kubectl get pods</code> 来查看一下运行状态的 Pod。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜  rc kubectl get pods <span class="token parameter variable">-n</span> imooc <span class="token operator">|</span> <span class="token function">grep</span> nginx
nginx-lctmn           <span class="token number">1</span>/1     Running   <span class="token number">0</span>          54s
nginx-q5pdl           <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7h29m
nginx-xggxr           <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7h29m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再查看一下 ReplicationController 的 events 情况。会发现多了一条如下的记录：创建新的 Pod。这就是 ReplicationController 对失败 Pod 自动拉起的直观展示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Events:
  Type    Reason            Age    From                    Message
  ----    ------            ----   ----                    -------
  Normal  SuccessfulCreate  2m12s  replication-controller  Created pod: nginx-lctmn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-删除-replicationcontroller" tabindex="-1"><a class="header-anchor" href="#_1-3-删除-replicationcontroller" aria-hidden="true">#</a> 1.3 删除 ReplicationController</h4><p>Kubernetes 中所有的对象删除操作都可以通过 <code>kubectl delete</code> 来操作，对于 ReplicationController 也是一样。如下显示，我们删除完之后再通过 <code>kubectl get</code> 已经查不到了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl delete rc nginx <span class="token parameter variable">-n</span> imooc
replicationcontroller <span class="token string">&quot;nginx&quot;</span> deleted
$ kubectl get rc  <span class="token parameter variable">-n</span> imooc
No resources found <span class="token keyword">in</span> imooc namespace.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有个问题：删除完 ReplicationController 之后，之前通过 ReplicationController 启动的 Pod 会被删除吗？答案是会的。如果只想删除 ReplicationController，而不想删除 Pod，可以在 <code>kubectl delete</code> 的参数上增加选项 <code>--cascade=false</code>。</p><h4 id="_1-4-工作原理" tabindex="-1"><a class="header-anchor" href="#_1-4-工作原理" aria-hidden="true">#</a> 1.4 工作原理</h4><p>ReplicationController 会监听 Kubernetes 集群内运行的 Pod 的个数，如果多于指定的副本数，则删除多余的 Pod；如果少于指定的副本数，则启动缺少的 Pod。这里所有的删除和启动操作都是通过 ReplicationController 来自动完成的。与手动创建的 Pod 不同的是，由 ReplicationController 创建的 Pod 在失败、删除或者终止时会被自动替换，比如在系统升级之后，节点上的 Pod 会被重建。</p><p>在使用中，即使应用程序只需要一个 Pod，也建议使用 ReplicationController 来创建 Pod。可以将 ReplicationController 类比成 supervisor 这种进程管理器，不同在于 ReplicationController 不是管理单个进程，而是监控管理集群内部跨多个节点的多个 Pod。</p><h2 id="_2-replicaset" tabindex="-1"><a class="header-anchor" href="#_2-replicaset" aria-hidden="true">#</a> 2. ReplicaSet</h2><p>ReplicaSet 可以认为是下一代 Replication Controller，改进的地方主要在于选择器的支持上。ReplicaSet 支持新的基于集合的选择器，其实不光是 ReplicaSet，像 Deployment，DaemonSet 等都支持，只能说 ReplicationController 是老一代的失败产物。关于选择器，我们这里举个例子。</p><p>ReplicationController 支持的选择器类似下面。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">selector</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>而 ReplicaSet 支持的选择器则更加的灵活，如下所示 matchExpressions 提供了一种基于集合的选择器，包括 <code>In</code> 和 <code>NotIn</code> 。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">selector</span><span class="token punctuation">:</span>
  <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> tier<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>cache<span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> environment<span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> NotIn<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>dev<span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-创建-replicaset" tabindex="-1"><a class="header-anchor" href="#_2-1-创建-replicaset" aria-hidden="true">#</a> 2.1 创建 ReplicaSet</h4><p>和 Replication Controller 类似，我们创建 ReplicaSet 也只需要编写一个 ReplicaSet 对象的 yaml 文件即可，下面是一个示例。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ReplicaSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> frontend
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> guestbook
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> frontend
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">tier</span><span class="token punctuation">:</span> frontend
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">tier</span><span class="token punctuation">:</span> frontend
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到 ReplicaSet 的 spec 和 Replication Controller 非常的类似，主要包括几个域：</p><ul><li><p>kind：指定为 ReplicaSet；</p></li><li><p>.spec.replicas：同时运行的 Pod 的副本个数；</p></li><li><p>.spec.selector：选择器。ReplicaSet 管理所有标签匹配与标签选择器的 Pod。它不区分自己创建或删除的 Pod 和其他人或进程创建或删除的pod。</p><p>这允许在不影响运行中的 Pod 的情况下替换副本集。需要注意的是 <code>.spec.template.metadata.labels</code> 必须匹配 <code>.spec.selector</code>，否则 Kubernetes 则认为是非法的；</p></li><li><p>.spec.template：Pod 模板。</p></li></ul><h4 id="_2-2-使用" tabindex="-1"><a class="header-anchor" href="#_2-2-使用" aria-hidden="true">#</a> 2.2 使用</h4><p>我们仍然可以通过 <code>kubectl apply</code> 来创建 ReplicaSet 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> nginx-rs.yaml <span class="token parameter variable">-n</span> imooc
replicaset.apps/frontend created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们通过 <code>kubectl describe</code> 来查看我们创建出来的 ReplicaSet，rs 是 ReplicaSet 的缩写。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe rs frontend <span class="token parameter variable">-n</span> imooc
Name:         frontend
Namespace:    imooc
Selector:     <span class="token assign-left variable">tier</span><span class="token operator">=</span>frontend
Labels:       <span class="token assign-left variable">app</span><span class="token operator">=</span>guestbook
              <span class="token assign-left variable">tier</span><span class="token operator">=</span>frontend
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;apps/v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;ReplicaSet&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;labels&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;app&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;guestbook&quot;</span>,<span class="token string">&quot;tier&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;frontend&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;frontend&quot;</span>,<span class="token punctuation">..</span>.
Replicas:     <span class="token number">3</span> current / <span class="token number">3</span> desired
Pods Status:  <span class="token number">3</span> Running / <span class="token number">0</span> Waiting / <span class="token number">0</span> Succeeded / <span class="token number">0</span> Failed
Pod Template:
  Labels:  <span class="token assign-left variable">tier</span><span class="token operator">=</span>frontend
  Containers:
   nginx:
    Image:      nginx
    Port:       <span class="token number">80</span>/TCP
    Host Port:  <span class="token number">0</span>/TCP
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
  Type    Reason            Age   From                   Message
  ----    ------            ----  ----                   -------
  Normal  SuccessfulCreate  99s   replicaset-controller  Created pod: frontend-9klqt
  Normal  SuccessfulCreate  99s   replicaset-controller  Created pod: frontend-tr696
  Normal  SuccessfulCreate  99s   replicaset-controller  Created pod: frontend-7h6rq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到通过 <code>kubectl describe</code> 显示出来的 ReplicaSet 的详情和前面的 Replication Controller 非常的类似。在 events 的列表里面我们也可以看到创建了三个 Pod 的事件。我们查看一下 Pod 情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get pods <span class="token parameter variable">-n</span> imooc <span class="token operator">|</span> <span class="token function">grep</span> frontend
frontend-7h6rq        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m4s
frontend-9klqt        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m4s
frontend-tr696        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m4s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以将第一个 Pod 删除，然后查看有没有新的 Pod 被创建出来，同时查看 ReplicaSet 的 event 事件中有没有类似上面 Replication Controller 中新建 Pod 的 event。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl delete pods frontend-7h6rq <span class="token parameter variable">-n</span> imooc
pod <span class="token string">&quot;frontend-7h6rq&quot;</span> deleted
$ kubectl get pods <span class="token parameter variable">-n</span> imooc <span class="token operator">|</span> <span class="token function">grep</span> frontend
frontend-9klqt        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          9m34s
frontend-n9vsb        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          79s
frontend-tr696        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          9m34s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ReplicaSet 中新增的 event 如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Events:
  Type    Reason            Age   From                   Message
  ----    ------            ----  ----                   -------
  Normal  SuccessfulCreate  10m   replicaset-controller  Created pod: frontend-9klqt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-删除" tabindex="-1"><a class="header-anchor" href="#_2-3-删除" aria-hidden="true">#</a> 2.3 删除</h4><p>如果我们要同时删除 ReplicaSet 和 Pod，则直接使用 <code>kubectl delete</code> 删除即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl delete rs frontend <span class="token parameter variable">-n</span> imooc
replicaset.extensions <span class="token string">&quot;frontend&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们只想删除 ReplicaSet，但是想保留 Pod，则将 <code>kubectl delete</code> 命令后面添加参数 <code>--cascade=false</code> 即可。</p><h4 id="_2-4-replicaset-高级使用" tabindex="-1"><a class="header-anchor" href="#_2-4-replicaset-高级使用" aria-hidden="true">#</a> 2.4 ReplicaSet 高级使用</h4><p>我们可以通过修改 ReplicaSet 中的 <code>.spec.replicas</code> 字段来实现运行的 Pod 个数伸缩限制。我们更新完 yaml 文件之后直接使用 <code>kubectl apply</code> 重新应用一下即可。</p>`,61),u={href:"https://git.k8s.io/community/contributors/design-proposals/instrumentation/custom-metrics-api.md",target:"_blank",rel:"noopener noreferrer"},m=a(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>controllers/hpa<span class="token punctuation">-</span>rs.yaml 

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> frontend<span class="token punctuation">-</span>scaler
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> ReplicaSet
    <span class="token key atrule">name</span><span class="token punctuation">:</span> frontend
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">targetCPUUtilizationPercentage</span><span class="token punctuation">:</span> <span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-总结" tabindex="-1"><a class="header-anchor" href="#_3-总结" aria-hidden="true">#</a> 3. 总结</h2><p>本文介绍了 Kubernetes 中两种基本的多副本控制器：Replication Controller 和 ReplicaSet。实际上这两种多副本控制器都不推荐使用了，而是使用 Deployment 来替代，但是 Deployment 实际上却是通过委托 ReplicaSet 来实现的，所以这一章相当于 Deployment 的背景知识，下面一章我们重点介绍 Deployment。</p>`,3);function v(k,b){const e=t("ExternalLinkIcon");return i(),p("div",null,[d,s("p",null,[n("ReplicaSet 还可以结合 HorizontalPodAutoscaler（中文可以叫作水平 Pod 缩放器，可以简写为 HPA） 来使用。HAP 可以基于CPU利用率自动伸缩 replication controller、deployment和 replica set 中的 pod 数量，（除了 CPU 利用率）也可以 基于其他应程序提供的度量指标"),s("a",u,[n("custom metrics"),o(e)]),n("。下面就是基于 CPU 使用来做弹性伸缩的示例，当 CPU 使用率达到 50 时则进行自动伸缩。")]),m])}const h=l(r,[["render",v],["__file","index-36.html.vue"]]);export{h as default};
