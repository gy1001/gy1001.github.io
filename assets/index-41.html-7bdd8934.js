import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const t="/assets/5f9b7196000164e606400426-cbe2b9ad.jpg",p={},i=e('<h1 id="_41-使用-service-访问一组特定的-pod" tabindex="-1"><a class="header-anchor" href="#_41-使用-service-访问一组特定的-pod" aria-hidden="true">#</a> 41-使用 Service 访问一组特定的 Pod</h1><p><img src="'+t+`" alt="img"></p><blockquote><p>成功的奥秘在于目标的坚定。——迪斯雷利</p></blockquote><p>试想这么一种场景，我们的应用程序都通过 Deployment 来管理，Deployment 后端管理了一组 Pod，每个 Pod 都有自己的 IP 地址。而且对于 Deployment 这种模式，Pod 挂掉之后 Deployment 会重新启动一个新的 Pod。</p><p>这就引入了一个问题，如果其他应用想要访问这个 Deployment 提供的服务，直接去访问 Pod 肯定是不行的，那么有没有一种类似服务发现的机制帮助我们做这件事情呢？</p><h2 id="_1-service-介绍" tabindex="-1"><a class="header-anchor" href="#_1-service-介绍" aria-hidden="true">#</a> 1. Service 介绍</h2><p>针对上面说的这个问题，Kubernetes 提供了一种 API 对象叫做 Service。Service 可以理解为一种访问一组特定 Pod 的策略。</p><p>举个例子，考虑一个图片处理应用程序，通过 Pod 运行了 3 个副本，并且是无状态的。前端访问该应用程序时，不需要关心实际是调用了那个 Pod 实例。后端的 Pod 发生重启时，前端不应该也不需要感知到。对于这种解耦关系，我们就可以通过 Service 来做。Service 与后端的多个 Pod 进行关联（通过 selector），前端只需要访问 Service 即可。</p><h2 id="_2-创建-service" tabindex="-1"><a class="header-anchor" href="#_2-创建-service" aria-hidden="true">#</a> 2. 创建 Service</h2><p>在 Kubernetes 中，Service 对象也可以通过一个 yaml 文件来定义，下面就是一个简单 Service 定义。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 Service 对象做的事情也比较简单，创建一个名称为 my-service 的 Service 对象，它会将对 80 端口的 TCP 请求转发到一组 Pod 上，这些 Pod 的特点是被打上标签 <code>app=nginx</code>，并且使用 TCP 端口 80。这些 Pod 我们暂时还没有创建，我们先把这个 Service 通过 <code>kubectl apply</code> 创建出来。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> nginx-service.yaml <span class="token parameter variable">-n</span> imooc
service/nginx-service created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，我们通过 <code>kubectl describe service</code> 来查看一下我们创建出来的 Service 对象。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe <span class="token function">service</span> nginx-service <span class="token parameter variable">-n</span> imooc
Name:              nginx-service
Namespace:         imooc
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:       kubectl.kubernetes.io/last-applied-configuration:
                     <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Service&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx-service&quot;</span>,<span class="token string">&quot;namespace&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;imooc&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;spec&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;ports&quot;</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">&quot;port&quot;</span>:80,&quot;<span class="token punctuation">..</span>.
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Type:              ClusterIP
IP:                <span class="token number">10.0</span>.213.149
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">80</span>/TCP
Endpoints:         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有几个关键的信息，包括：</p><ul><li>selector：Service 会根据 selector 条件去选择 label 满足条件的 Pod 进行请求转发；</li><li>Type: Service 的类型，这里是 ClusterIP 类似，也是默认的类型。简单来说，ClusterIP 类型会分配一个固定的 IP，然后只能通过集群内部进行访问；</li><li>IP：Service 对象分配的 IP，可以认为是一个 vip；</li><li>Port/TargetPort：前者是 Service 对象监听的端口，后者是转发的目标 Pod 的端口；</li><li>Endpoints：是一个列表，表示转发到后端的 Pod 的 IP 集合。</li></ul><p>这其中比较重要的一个点就是 endpoints，因为现在集群内没有满足条件的 Pod 可以供转发，所以 endpoints 字段目前为空。</p><h2 id="_3-请求转发" tabindex="-1"><a class="header-anchor" href="#_3-请求转发" aria-hidden="true">#</a> 3. 请求转发</h2><p>下面我们创建一组满足条件的 nginx 的 Pod：具有 label <code>app=nginx</code> 和使用端口 80。下面就是我们的 Deployment 的定义。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code>kubectl apply</code> 创建该 Deployment。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> nginx-dm.yaml <span class="token parameter variable">-n</span> imooc
deployment.apps/nginx-deployment created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过 <code>kubectl get pods</code> 看一下改 deployment 创建的 pod 情况，通过 <code>-o wide</code> 参数可以显示更多的字段，比如 IP，节点名称，我们这里主要是为了查看 IP，所以其他字段域暂时先隐藏掉。记住下面的几个 Pod 的 IP。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-n</span> imooc <span class="token parameter variable">-o</span> wide <span class="token operator">|</span> <span class="token function">grep</span> nginx
nginx-deployment-c464767dd-6ts4x   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          85s     <span class="token number">10.1</span>.1.154
nginx-deployment-c464767dd-d9mh7   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          85s     <span class="token number">10.1</span>.2.159
nginx-deployment-c464767dd-qd22h   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          85s     <span class="token number">10.1</span>.2.31
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在再回过头来查看一下之前创建的 Service 对象。如下所示，我们可以看到其中的 Endpoints 字段域不再为空了，而是上面的三个 Pod 的 IP:Port 集合。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe <span class="token function">service</span> nginx-service <span class="token parameter variable">-n</span> imooc
Name:              nginx-service
Namespace:         imooc
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:       kubectl.kubernetes.io/last-applied-configuration:
                     <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Service&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nginx-service&quot;</span>,<span class="token string">&quot;namespace&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;imooc&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;spec&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;ports&quot;</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">&quot;port&quot;</span>:80,&quot;<span class="token punctuation">..</span>.
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
Type:              ClusterIP
IP:                <span class="token number">10.0</span>.213.149
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">80</span>/TCP
Endpoints:         <span class="token number">10.1</span>.1.154:80,10.1.2.159:80,10.1.2.31:80
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，Service 对象会创建一个 endpoints 对象，我们可以通过 <code>kubectl get endpoints</code> 来查看。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get endpoints <span class="token parameter variable">-n</span> imooc
NAME            ENDPOINTS                                  AGE
nginx-service   <span class="token number">10.1</span>.1.154:80,10.1.2.159:80,10.1.2.31:80   113m
$ kubectl describe endpoints nginx-service <span class="token parameter variable">-n</span> imooc
Name:         nginx-service
Namespace:    imooc
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  endpoints.kubernetes.io/last-change-trigger-time: <span class="token number">2020</span>-04-19T12:55:17+08:00
Subsets:
  Addresses:          <span class="token number">10.1</span>.1.154,10.1.2.159,10.1.2.31
  NotReadyAddresses:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
  Ports:
    Name     Port  Protocol
    ----     ----  --------
    <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>    TCP

Events:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们已经创建出来了后端应用，我们看一下请求是如何进行转发的。所有到 Service IP 的 80 端口的请求都会被转发到后端的三个 Pod 中的一个，转发到哪个 Pod 对应到不同的负载均衡策略。还有一点需要注意的是，ClusterIP 类型的 Service 只能在集群内部进行访问。如下所示，我们直接访问 Service IP 对应的端口 80，直接返回了 Nginx 的欢迎页面，也就是转发到了运行 nginx 的 Pod 中了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token number">10.0</span>.213.149:80
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
    body <span class="token punctuation">{</span>
        width: 35em<span class="token punctuation">;</span>
        margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
        font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.org/&quot;</span><span class="token operator">&gt;</span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.com/&quot;</span><span class="token operator">&gt;</span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">&gt;</span><span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-多端口-service" tabindex="-1"><a class="header-anchor" href="#_4-多端口-service" aria-hidden="true">#</a> 4. 多端口 Service</h2><p>有时候我们会为同一个应用分配多个端口，比如开放 http 端口 80，开放 https 端口 443，我们同样可以在 Service 对象中配置多个端口。但是需要注意的是，当使用多个端口时，必须提供所有端口名称，以他们无歧义。端口名称只能包含小写字母数字字符和中划线，并且必须以字母数字字符开头和结尾。如下是一个多端口 Service 的定义描述。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - name: http
      protocol: TCP
      port: <span class="token number">80</span>
      targetPort: <span class="token number">9376</span>
    - name: https
      protocol: TCP
      port: <span class="token number">443</span>
      targetPort: <span class="token number">9377</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-设置固定-ip" tabindex="-1"><a class="header-anchor" href="#_5-设置固定-ip" aria-hidden="true">#</a> 5. 设置固定 IP</h2><p>前面的 Service 都是分配了随机 IP，随机 IP 在 ApiServer 的启动参数 <code>service-cluster-ip-range</code> 的 CIDR 范围内。</p><p>如果我们想要对 IP 有更强的掌控力，那么我们可以在 Service 的定义中通过参数 <code>spec.clusterIP</code> 指定自己的 clusterIP，比如希望替换一个已存在的 DNS 条目，或者遗留系统中已经配置了一个固定 IP 并且修改起来比较麻烦。</p><h2 id="_6-服务发现" tabindex="-1"><a class="header-anchor" href="#_6-服务发现" aria-hidden="true">#</a> 6. 服务发现</h2><p>Kubernetes 提供了两种服务发现模式：环境变量和 DNS。</p><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4><p>环境变量的方式指的是 Kubernetes 会将集群中的 Service 对象以环境变量的方式注入到 Pod 中，形如 <code>{SVCNAME}_SERVICE_HOST</code> 和 <code>{SVCNAME}_SERVICE_PORT</code> 。</p><p>举个例子，一个 redis 实例 <code>redis-master</code> 的 Service 暴露了 TCP 端口 6379，同时分配了 ClusterIP 地址 10.0.0.11，对应的环境变量如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">REDIS_MASTER_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.0</span>.0.11
<span class="token assign-left variable">REDIS_MASTER_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">6379</span>
<span class="token assign-left variable">REDIS_MASTER_PORT</span><span class="token operator">=</span>tcp://10.0.0.11:6379
<span class="token assign-left variable">REDIS_MASTER_PORT_6379_TCP</span><span class="token operator">=</span>tcp://10.0.0.11:6379
<span class="token assign-left variable">REDIS_MASTER_PORT_6379_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">REDIS_MASTER_PORT_6379_TCP_PORT</span><span class="token operator">=</span><span class="token number">6379</span>
<span class="token assign-left variable">REDIS_MASTER_PORT_6379_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.0</span>.0.11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境变量这种方式有个比较明显的弊端：环境变量不会自动更新。如果 Service 在 Pod 启动之后才创建成功，那么这个 Service 在该 Pod 内的环境变量中是找不到的。</p><h4 id="dns" tabindex="-1"><a class="header-anchor" href="#dns" aria-hidden="true">#</a> DNS</h4><p>Kubernetes 集群的 DNS 服务器，比如 CoreDNS，会监控集群中的新服务，并为每个服务创建一组 DNS 记录。如果整个集群中都启用了 DNS，则所有的 Pod 都应该能够通过其 DNS 名称自动解析服务。</p><p>举个例子，如果在 Namespace <code>my-ns</code> 中有一个名称为 <code>my-svc</code> 的服务，则 DNS 服务器会为该服务创建一个 DNS 条目 <code>my-svc.my-ns</code> 。位于 Namespace <code>my-ns</code> 下的 Pod 则可以通过名称 <code>my-svc</code> 或者 <code>my-svc.my-ns</code> 来进行服务发现。其他 Namespace 下的 Pod 则可以通过 <code>my-svc.my-ns</code> 来进行服务发现。</p><h2 id="_7-headless-service" tabindex="-1"><a class="header-anchor" href="#_7-headless-service" aria-hidden="true">#</a> 7. Headless Service</h2><p>对于拥有 ClusterIP 的 Service，当我们访问其 ClusterIP 时，其会自动为我们做负载均衡。但是有的时候我们想要嵌入我们自己的负载均衡策略，那么对于这种情况，可以通过指定 ClusterIP 的值为 <code>None</code> ，这个时候创建出来的 Service 则为 <code>Headless</code> Service。我们在做服务发现时，这个 Service 返回的为后端的 Pod 列表，这个时候我们就可以灵活发挥了。下面举个例子。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个是一个很简单的 Headless Service，后端代理了多个具有 label: app=nginx 的 Pod。我们将该 Service 进行部署，然后在 Kubernetes 集群中的某个 Pod 内部通过 nslookup 来查询该服务。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/ $ <span class="token function">nslookup</span> nginx-service

Name:      nginx-service
Address <span class="token number">1</span>: <span class="token number">10.1</span>.1.154 <span class="token number">10</span>-1-1-154.nginx-service.imooc.svc.cluster.local
Address <span class="token number">2</span>: <span class="token number">10.1</span>.2.31 <span class="token number">10</span>-1-2-31.nginx-service.imooc.svc.cluster.local
Address <span class="token number">3</span>: <span class="token number">10.1</span>.2.159 <span class="token number">10</span>-1-2-159.nginx-service.imooc.svc.cluster.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到服务发现时候，直接将后端的 Pod 列表返回了，每个 Pod 对应的 DNS 条目为 ip.<code>&lt;svc-name&gt;.&lt;namespace&gt;.svc.cluster.local</code>，这个时候我们就可以根据需求来做进一步操作了。</p><h2 id="_8-总结" tabindex="-1"><a class="header-anchor" href="#_8-总结" aria-hidden="true">#</a> 8. 总结</h2><p>本篇文章介绍了 Kubernetes 中的 API 对象 Service 的基本情况，下一篇文章将会和大家介绍 Kubernetes 提供的多种 Service 类型。</p>`,55),l=[i];function o(c,r){return s(),a("div",null,l)}const u=n(p,[["render",o],["__file","index-41.html.vue"]]);export{u as default};
