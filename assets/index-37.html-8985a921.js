import{_ as l,M as i,p as t,q as p,R as s,t as n,N as o,a1 as e}from"./framework-e8cb8151.js";const c="/assets/5f8f90e40001e69b06400426-5ded7e30.jpg",d={},r=e('<h1 id="_37-kubernetes-deployment-使用" tabindex="-1"><a class="header-anchor" href="#_37-kubernetes-deployment-使用" aria-hidden="true">#</a> 37-<strong>Kubernetes Deployment 使用</strong></h1><p><img src="'+c+`" alt="img"></p><blockquote><p>合理安排时间，就等于节约时间。——培根</p></blockquote><p>在上一篇文章介绍完 ReplicationController 和 ReplicaSet 之后，我们这一篇文章来介绍一下目前用来替代这两种控制的 Deployment。</p><h2 id="_1-使用场景" tabindex="-1"><a class="header-anchor" href="#_1-使用场景" aria-hidden="true">#</a> 1. 使用场景</h2><p>目前的 Deployment 的典型使用场景和 ReplicaSet 类似，都是 Pod 的一种多副本控制器，但是相比于 ReplicaSet，Deployment 在一些更新和扩缩容操作上面更加友好，所以现在基本不再直接使用 ReplicaSet，而是使用 Deployment 来代替，下面介绍一些 Deployment 的典型使用场景。</p><h2 id="_2-创建-deployment-对象" tabindex="-1"><a class="header-anchor" href="#_2-创建-deployment-对象" aria-hidden="true">#</a> 2. 创建 Deployment 对象</h2><p>创建 Deployment 对象，我们需要编写一个 Deployment 的描述文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.14.2
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
            <span class="token key atrule">requests</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果对上一篇介绍 ReplicaSet 的文章还有印象的话，可以发现 Deployment 的声明和 ReplicaSet 非常的相似。这个 Deployment 描述会创建一个名字叫 nginx-deployment 拥有三个 Pod 副本的 Deployment。</p><p>这里的标签选择器这里使用的是简单的 kv 选择器 matchLabels，实际上 Deployment 的标签选择器也是支持 matchExpressions 形式的。下面是是 matchExpressions 的举例。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/e2e<span class="token punctuation">-</span>az<span class="token punctuation">-</span>name
      <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
      <span class="token key atrule">values</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> e2e<span class="token punctuation">-</span>az1
        <span class="token punctuation">-</span> e2e<span class="token punctuation">-</span>az2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们通过 <code>kubectl apply</code> 创建这个 Deployment，我们这里是应用到 imooc 这个 namespace。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> nginx-dm.yaml <span class="token parameter variable">-n</span> imooc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后可以通过 <code>kubectl get deployment</code> 检查 Deployment 的创建情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get deployment <span class="token parameter variable">-n</span> imooc
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           2m31s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code>kubectl describe deployment</code> 查看 Deployment 的情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe deployment nginx-deployment <span class="token parameter variable">-n</span> imooc
Name:                   nginx-deployment
Namespace:              imooc
CreationTimestamp:      Sun, <span class="token number">12</span> Apr <span class="token number">2020</span> <span class="token number">11</span>:43:04 +0800
Labels:                 <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Annotations:            deployment.kubernetes.io/revision: <span class="token number">1</span>
                        kubectl.kubernetes.io/last-applied-configuration:
                          <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;apps/v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Deployment&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;labels&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;app&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx-deployment&quot;</span>,<span class="token string">&quot;namespace&quot;</span>:&quot;i<span class="token punctuation">..</span>.
Selector:               <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Replicas:               <span class="token number">3</span> desired <span class="token operator">|</span> <span class="token number">3</span> updated <span class="token operator">|</span> <span class="token number">3</span> total <span class="token operator">|</span> <span class="token number">3</span> available <span class="token operator">|</span> <span class="token number">0</span> unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        <span class="token number">0</span>
RollingUpdateStrategy:  <span class="token number">25</span>% max unavailable, <span class="token number">25</span>% max surge
Pod Template:
  Labels:  <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
  Containers:
   nginx:
    Image:      nginx:1.14.2
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
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
NewReplicaSet:   nginx-deployment-64969b6699 <span class="token punctuation">(</span><span class="token number">3</span>/3 replicas created<span class="token punctuation">)</span>
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  4m8s  deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> nginx-deployment-64969b6699 to <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的输出我们可以看到如下几个重要信息。</p><ul><li>基本信息：包括 Name，Namespace，CreationTimestamp，Labels 等信息；</li><li>selector：标签选择器；；</li><li>Replicas：Pod 副本的运行情况；</li><li>StrategyType：表示升级的时候如何使用新的 Pod 替换旧的 Pod。这里的值是 RollingUpdate，也就是滚动更新；除了 RollingUpdate，还支持 Recreate，表示在新建 Pod 之前将老的 Pod 都删除。Deployment 默认使用 RollingUpdate StrategeType；</li><li>RollingUpdateStrategy：对于使用 RollingUpdate StrategyType 的情况，我们可以指定 maxUnavailable 和 maxSurge 来控制滚动更新操作： <ul><li>maxUnavailable：表示在更新过程中最大不可用的 Pod 数，可以为绝对值也可以是百分比，默认值为 25%；</li><li>maxSurge：表示能够额外创建的副本数。当 maxSurge 为 0 时，maxUnavailble 不能为 0，因为这两个同时为 0 的话就死锁了。maxSurge 取值也可以是百分比或者绝对值，默认值是 25%；</li></ul></li><li>Pod Template：定义了该 Deployment 管理的 Pod；</li><li>oldReplicaSets/NewReplicaSet：这个是什么情况呢？从 old 和 new 我们可以推测一下有可能 Deployment 每次更新都是更新 ReplicaSet，然后 ReplicaSet 是通过 Deployment 来进行管理。实际上确实是这样的，ReplicaSet 作为 Pod 的多副本控制器，很少会直接使用，而是通过 Deployment 来间接管理 ReplicaSet。Deployment 相比 ReplicaSet 在 Pod 的更新，扩缩容上支持的更好；</li><li>Events：我们可以看到该 Deployment 创建了一个 ReplicaSet nginx-deployment-64969b6699，下面我们通过命令 <code>kubectl get rs</code> 来看一下：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get rs <span class="token parameter variable">-n</span> imooc
NAME                          DESIRED   CURRENT   READY   AGE
nginx-deployment-64969b6699   <span class="token number">3</span>         <span class="token number">3</span>         <span class="token number">3</span>       144m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 ReplicaSet 的名字正是上面 Deployment 的描述 event 所显示的。我们通过 <code>kubectl describe rs</code> 看一下该 ReplicaSet 的描述。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe rs nginx-deployment-64969b6699 <span class="token parameter variable">-n</span> imooc
Name:           nginx-deployment-64969b6699
Namespace:      imooc
Selector:       <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx,pod-template-hash<span class="token operator">=</span>64969b6699
Labels:         <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
                pod-template-hash<span class="token operator">=</span>64969b6699
Annotations:    deployment.kubernetes.io/desired-replicas: <span class="token number">3</span>
                deployment.kubernetes.io/max-replicas: <span class="token number">4</span>
                deployment.kubernetes.io/revision: <span class="token number">1</span>
Controlled By:  Deployment/nginx-deployment
Replicas:       <span class="token number">3</span> current / <span class="token number">3</span> desired
Pods Status:    <span class="token number">3</span> Running / <span class="token number">0</span> Waiting / <span class="token number">0</span> Succeeded / <span class="token number">0</span> Failed
Pod Template:
  Labels:  <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
           pod-template-hash<span class="token operator">=</span>64969b6699
  Containers:
   nginx:
    Image:      nginx:1.14.2
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
Events:           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的输出的第 10 行显示的 <code>Controlled By</code> 正是我们所创建的 Deployment。如果是直接创建的 ReplicaSet 是没有这个 <code>Contorlled By</code> 字段域的。</p><p>我们下面通过 <code>kubectl get pods</code> 来查看一下该 Deployment 间接创建出来的 Pod。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜  deployment kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-64969b6699-6rjgj   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          148m
nginx-deployment-64969b6699-gw5fx   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          148m
nginx-deployment-64969b6699-jqvqh   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          148m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出来 pod 的名字是 ReplicaSet 的名字加一个随机的字符串。我们使用 <code>kubectl describe pod</code> 来查看一下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe pod nginx-deployment-64969b6699-6rjgj <span class="token parameter variable">-n</span> imooc
Name:           nginx-deployment-64969b6699-6rjgj
Namespace:      imooc
Priority:       <span class="token number">0</span>
Node:           cn-beijing.172.16.60.188/172.16.60.188
Start Time:     Sun, <span class="token number">12</span> Apr <span class="token number">2020</span> <span class="token number">11</span>:43:05 +0800
Labels:         <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
                pod-template-hash<span class="token operator">=</span>64969b6699
Annotations:    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Status:         Running
IP:             <span class="token number">10.1</span>.1.142
IPs:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Controlled By:  ReplicaSet/nginx-deployment-64969b6699
Containers:
  nginx:
    Container ID:   docker://4f1003385c63d073e59b64b236d210a74b0434a892138df403ee34b75e2ad259
    Image:          nginx:1.14.2
    Image ID:       docker-pullable://nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           <span class="token number">80</span>/TCP
    Host Port:      <span class="token number">0</span>/TCP
    State:          Running
      Started:      Sun, <span class="token number">12</span> Apr <span class="token number">2020</span> <span class="token number">11</span>:43:07 +0800
    Ready:          True
    Restart Count:  <span class="token number">0</span>
    Limits:
      cpu:     100m
      memory:  200Mi
    Requests:
      cpu:        100m
      memory:     200Mi
    Environment:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-84db9 <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-84db9:
    Type:        Secret <span class="token punctuation">(</span>a volume populated by a Secret<span class="token punctuation">)</span>
    SecretName:  default-token-84db9
    Optional:    <span class="token boolean">false</span>
QoS Class:       Guaranteed
Node-Selectors:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tolerations:     node.kubernetes.io/not-ready:NoExecute <span class="token keyword">for</span> 300s
                 node.kubernetes.io/unreachable:NoExecute <span class="token keyword">for</span> 300s
Events:          <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的输出的第 13 行也可以看到一个 <code>Controlled By</code> 字段域，显示为我们上面看到的 ReplicaSet。</p><p>所以这里我们得出一个结论，Deployment 创建的过程会首先创建一个 ReplicaSet，然后由 ReplicaSet 间接创建 Pod。Deployment 负责管理 ReplicaSet，ReplicaSet 负责管理 Pod。</p><p>但是上面 Deployment 描述中的 oldReplicaSet 和 NewReplicaSet 的问题还没有得到解决，我们有理由猜测 Deployment 每次更新都会将老的 ReplicaSet 进行删除，并新建 ReplicaSet。我们下面来看看 Deployment 的更新。</p><h2 id="_3-deployment-的更新" tabindex="-1"><a class="header-anchor" href="#_3-deployment-的更新" aria-hidden="true">#</a> 3. Deployment 的更新</h2><p>Deployment 的更新支持多种方式的更新，比如通过命令行，或者修改 yaml 文件。我们这里演示一下修改 yaml 文件的形式，这种形式是一种类似声明式 API 的方式，不管是创建（create）还是更新（update），都只需要修改同一个 yaml 文件，然后调用 <code>kubectl apply</code> 即可。</p><p>比如我们将上面 yaml 中的 <code>replicas: 3</code> 改为 <code>replicas: 4</code>，然后再调用 <code>kubectl apply</code> 我们就会发现 Pod 变成了 4 个。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> nginx-dm.yaml <span class="token parameter variable">-n</span> imooc
deployment.apps/nginx-deployment configured
$ kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-64969b6699-6rjgj   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          166m
nginx-deployment-64969b6699-gw5fx   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          166m
nginx-deployment-64969b6699-jqvqh   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          166m
nginx-deployment-64969b6699-xnfkz   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m21s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种形式的更新只需要将原 ReplicaSet 管理的 Pod 增加一个即可，并不会涉及到 ReplicaSet 的变动。我们下面看一个涉及到 ReplicaSet 变动的例子，修改 Pod Template 中的镜像的版本，将 nginx 的版本改为 1.9.1 版本</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">4</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.9.1
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
            <span class="token key atrule">requests</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>kubectl apply</code> 将变更应用一下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> nginx-dm.yaml <span class="token parameter variable">-n</span> imooc
deployment.apps/nginx-deployment configured
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你的手速够快，可以通过 <code>kubectl rollout status</code> 查看这个变更过程，幸运的话会看到类似下面的输出。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout status deployment nginx-deployment
Waiting <span class="token keyword">for</span> rollout to finish: <span class="token number">1</span> out of <span class="token number">2</span> new replicas have been updated<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是很多情况下还没有来得及查看就已经变更完成了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout status deployment nginx-deployment
deployment <span class="token string">&quot;nginx-deployment&quot;</span> successfully rolled out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再回到我们之前说的那个 OldReplicaSet 和 NewReplicaSet 的问题，通过 <code>kubectl describe</code> 查看一下 Deployment 的描述信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe deployment nginx-deployment <span class="token parameter variable">-n</span> imooc
Name:                   nginx-deployment
Namespace:              imooc
CreationTimestamp:      Sun, <span class="token number">12</span> Apr <span class="token number">2020</span> <span class="token number">11</span>:43:04 +0800
Labels:                 <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Annotations:            deployment.kubernetes.io/revision: <span class="token number">2</span>
                        kubectl.kubernetes.io/last-applied-configuration:
                          <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;apps/v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Deployment&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;labels&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;app&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx-deployment&quot;</span>,<span class="token string">&quot;namespace&quot;</span>:&quot;i<span class="token punctuation">..</span>.
Selector:               <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Replicas:               <span class="token number">4</span> desired <span class="token operator">|</span> <span class="token number">4</span> updated <span class="token operator">|</span> <span class="token number">4</span> total <span class="token operator">|</span> <span class="token number">4</span> available <span class="token operator">|</span> <span class="token number">0</span> unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        <span class="token number">0</span>
RollingUpdateStrategy:  <span class="token number">25</span>% max unavailable, <span class="token number">25</span>% max surge
Pod Template:
  Labels:  <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
  Containers:
   nginx:
    Image:      nginx:1.9.1
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
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  nginx-deployment-64969b6699 <span class="token punctuation">(</span><span class="token number">4</span>/4 replicas created<span class="token punctuation">)</span>
NewReplicaSet:   nginx-deployment-c464767dd <span class="token punctuation">(</span><span class="token number">4</span>/4 replicas created<span class="token punctuation">)</span>
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  24m    deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> nginx-deployment-64969b6699 to <span class="token number">4</span>
  Normal  ScalingReplicaSet  6m50s  deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> nginx-deployment-c464767dd to <span class="token number">1</span>
  Normal  ScalingReplicaSet  6m50s  deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> nginx-deployment-64969b6699 to <span class="token number">3</span>
  Normal  ScalingReplicaSet  6m50s  deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> nginx-deployment-c464767dd to <span class="token number">2</span>
  Normal  ScalingReplicaSet  6m37s  deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> nginx-deployment-64969b6699 to <span class="token number">2</span>
  Normal  ScalingReplicaSet  6m37s  deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> nginx-deployment-c464767dd to <span class="token number">3</span>
  Normal  ScalingReplicaSet  6m37s  deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> nginx-deployment-64969b6699 to <span class="token number">1</span>
  Normal  ScalingReplicaSet  6m37s  deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> nginx-deployment-c464767dd to <span class="token number">4</span>
  Normal  ScalingReplicaSet  6m35s  deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> nginx-deployment-64969b6699 to <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过输出我们可以看到 Deployment 的描诉信息里面的 OldReplicaSets 显示的确实是老的 ReplicaSet 对象，而 NewReplicaSet 显示的为新的 ReplicaSet 对象。（注：一旦切换完成，OldReplicaSets 就会显示为 <code>&lt;none&gt;</code>，所以有时候虽然发生了变更，但是 OldReplicaSet 显示还是空也是没有问题的）</p><p>我们从 Deployment 的 Events 里面（41 行开始）来看一下变更的具体过程是如何发生的，需要注意的时，此时 maxUnavailable 和 maxSurge 都是 25%，也就是容许最多有 4 * 25% = 1 个 Pod 处于不可用状态，容器最多额外创建出来 1 个 Pod。</p><ol><li>新 ReplicaSet <code>nginx-deployment-c464767dd</code> 做扩容新建出 1 个 Pod；</li><li>老 ReplicaSet <code>nginx-deployment-64969b6699</code> 做缩容，从 4 个 Pod 缩至 3 个 Pod；</li><li>新 ReplicaSet <code>nginx-deployment-c464767dd</code> 做扩容新建出 2 个 Pod；</li><li>老 ReplicaSet <code>nginx-deployment-64969b6699</code> 做缩容，从 3 个 Pod 缩至 2 个 Pod；</li><li>新 ReplicaSet <code>nginx-deployment-c464767dd</code> 做扩容新建出 3 个 Pod；</li><li>老 ReplicaSet <code>nginx-deployment-64969b6699</code> 做缩容，从 2 个 Pod 缩至 1 个 Pod；</li><li>新 ReplicaSet <code>nginx-deployment-c464767dd</code> 做扩容新建出 4 个 Pod；</li><li>老 ReplicaSet <code>nginx-deployment-64969b6699</code> 做缩容，从 1 个 Pod 缩至 0 个 Pod。</li></ol><p>所以可以得出结论，<strong>Deployment 的更新实际上就是两个 ReplicaSet 通过 StrategyType 做更新的过程</strong>。</p><h2 id="_4-deployment-的回滚" tabindex="-1"><a class="header-anchor" href="#_4-deployment-的回滚" aria-hidden="true">#</a> 4. Deployment 的回滚</h2><p>我们在日常开发中有时候在做发布的时候发布了异常的版本，这时候就需要我们做回滚操作将线上版本回滚到上一个版本，在 Kubernetes 中通过 Deployment 管理我们的应用的时候也可以进行回滚。</p><p>首先我们通过 <code>kubectl rollout history</code> 查看历史版本，但是因为我们在做 <code>kubectl apply</code> 操作的时候没有设置 <code>--record=true</code>（这个选项默认为 false），所以这里的 CHANGE-CAUSE 显示为空。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout <span class="token function">history</span> deployment nginx-deployment <span class="token parameter variable">-n</span> imooc
deployment.extensions/nginx-deployment
REVISION  CHANGE-CAUSE
<span class="token number">1</span>         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
<span class="token number">2</span>         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
<span class="token number">3</span>         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们可以通过指定 <code>--revision</code> 参数来显示每个版本具体的行为，如下所示，我们查看一下 #1 版本的信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout <span class="token function">history</span> deployment nginx-deployment <span class="token parameter variable">-n</span> imooc <span class="token parameter variable">--revision</span><span class="token operator">=</span><span class="token number">1</span>
deployment.extensions/nginx-deployment with revision <span class="token comment">#1</span>
Pod Template:
  Labels:	<span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
	pod-template-hash<span class="token operator">=</span>64969b6699
  Containers:
   nginx:
    Image:	nginx:1.14.2
    Port:	<span class="token number">80</span>/TCP
    Host Port:	<span class="token number">0</span>/TCP
    Limits:
      cpu:	100m
      memory:	200Mi
    Requests:
      cpu:	100m
      memory:	200Mi
    Environment:	<span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:	<span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
  Volumes:	<span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回滚的话我们可以回滚到上一次修改的版本。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout undo deployment nginx-deployment <span class="token parameter variable">-n</span> imooc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者回滚到指定的某个版本。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl rollout undo deployment nginx-deployment <span class="token parameter variable">-n</span> imooc --to-revisoin<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>回滚完之后我们可以通过 <code>kubectl descirbe</code> 查看 Deployment 的明细信息来查看是否回滚成功。</p><h2 id="_5-缩放-deployment" tabindex="-1"><a class="header-anchor" href="#_5-缩放-deployment" aria-hidden="true">#</a> 5. 缩放 Deployment</h2><p>缩放 Deployment 也是常用的一个操作，比如流量高峰期，扩容出更多的 Pod。我们可以通过如下的命令来进行自动的扩缩容。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl scale deployment nginx-deployment <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">7</span>
$ kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-57f49c59d-8dzn4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m5s
nginx-deployment-57f49c59d-9jvrp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m5s
nginx-deployment-57f49c59d-lddjm   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m3s
nginx-deployment-57f49c59d-m57sr   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m5s
nginx-deployment-57f49c59d-q6mx6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m4s
$ kubectl scale deployment nginx-deployment <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">7</span>
deployment.extensions/nginx-deployment scaled
$ kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-57f49c59d-8dzn4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m49s
nginx-deployment-57f49c59d-9jvrp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m49s
nginx-deployment-57f49c59d-l89w2   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3s
nginx-deployment-57f49c59d-lddjm   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m47s
nginx-deployment-57f49c59d-m57sr   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m49s
nginx-deployment-57f49c59d-pfpsm   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3s
nginx-deployment-57f49c59d-q6mx6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m48s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是缩容操作。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl scale deployment nginx-deployment <span class="token parameter variable">-n</span> imooc <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
deployment.extensions/nginx-deployment scaled
$ kubectl get pods <span class="token parameter variable">-n</span> imooc
NAME                               READY   STATUS        RESTARTS   AGE
nginx-deployment-57f49c59d-8dzn4   <span class="token number">1</span>/1     Running       <span class="token number">0</span>          6m52s
nginx-deployment-57f49c59d-9jvrp   <span class="token number">1</span>/1     Running       <span class="token number">0</span>          6m52s
nginx-deployment-57f49c59d-l89w2   <span class="token number">0</span>/1     Terminating   <span class="token number">0</span>          66s
nginx-deployment-57f49c59d-m57sr   <span class="token number">1</span>/1     Running       <span class="token number">0</span>          6m52s
nginx-deployment-57f49c59d-pfpsm   <span class="token number">0</span>/1     Terminating   <span class="token number">0</span>          66s
nginx-deployment-57f49c59d-q6mx6   <span class="token number">0</span>/1     Terminating   <span class="token number">0</span>          6m51s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,65),u={href:"https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/",target:"_blank",rel:"noopener noreferrer"},m=s("code",null,"kubectl autoscale",-1),v=e(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl autoscale deployment nginx-deployment <span class="token parameter variable">--min</span><span class="token operator">=</span><span class="token number">10</span> <span class="token parameter variable">--max</span><span class="token operator">=</span><span class="token number">15</span> --cpu-percent<span class="token operator">=</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结" aria-hidden="true">#</a> 6. 总结</h2><p>本文介绍了 Deployment 的适用场景和典型使用 case，包括：创建、更新、回滚、缩放，希望大家可以自动动手操作起来。</p>`,3);function b(k,g){const a=i("ExternalLinkIcon");return t(),p("div",null,[r,s("p",null,[n("如果设置了 "),s("a",u,[n("水平自动缩放 Pod"),o(a)]),n(" ，则可以通过 "),m,n(" 来根据 cpu 使用率来进行自动缩放。")]),v])}const x=l(d,[["render",b],["__file","index-37.html.vue"]]);export{x as default};
