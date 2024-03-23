import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const i="/assets/5f16cee40001861c06400426-cf7bb829.jpg",l={},p=e('<h1 id="_34-配置管理configmap-和-secret" tabindex="-1"><a class="header-anchor" href="#_34-配置管理configmap-和-secret" aria-hidden="true">#</a> 34-配置管理ConfigMap 和 Secret</h1><p><img src="'+i+`" alt="img"></p><blockquote><p>天才免不了有障碍，因为障碍会创造天才。——罗曼·罗兰</p></blockquote><p>在我们日常的开发中，肯定会涉及到多种环境，比如日常开发环境、预发环境、生产环境，我们将这些环境区分开一般都是通过配置，不同环境对应不同的配置。这是一种将代码和配置分离的思想，在 Kubernetes 中，就相当于是将镜像和配置分离。</p><p>在 Kubernetes 中对于配置提供了两种对象：</p><ul><li>ConfigMap：普通配置存储。</li><li>Secret：密文存储，比如数据库密码等。</li></ul><p>下面我们就来看一下这两种配置的基本使用方法。</p><h2 id="_1-configmap-创建" tabindex="-1"><a class="header-anchor" href="#_1-configmap-创建" aria-hidden="true">#</a> 1. ConfigMap 创建</h2><p>我们可以通过命令 <code>kubectl create ConfigMap &lt;cm-name&gt; &lt;data-source&gt;</code> 命令创建 ConfigMap，通过 <code>kubectl get ConfigMap &lt;cm-name&gt;</code> 查看指定的 ConfigMap 的内容。</p><h4 id="通过目录创建" tabindex="-1"><a class="header-anchor" href="#通过目录创建" aria-hidden="true">#</a> 通过目录创建</h4><p>我们先在本地创建一个目录，然后将官方示例的两个配置文件 <code>https://kubernetes.io/examples/ConfigMap/game.properties</code> 和 <code>https://kubernetes.io/examples/ConfigMap/game.properties</code> 下载到指定目录中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> ConfigMap
$ <span class="token function">wget</span> https://kubernetes.io/examples/ConfigMap/game.properties
$ <span class="token function">wget</span> https://kubernetes.io/examples/ConfigMap/ui.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以简单看一下文件内容。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> game.properties
<span class="token assign-left variable">enemies</span><span class="token operator">=</span>aliens
<span class="token assign-left variable">lives</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token assign-left variable">enemies.cheat</span><span class="token operator">=</span>true
<span class="token assign-left variable">enemies.cheat.level</span><span class="token operator">=</span>noGoodRotten
<span class="token assign-left variable">secret.code.passphrase</span><span class="token operator">=</span>UUDDLRLRBABAS
<span class="token assign-left variable">secret.code.allowed</span><span class="token operator">=</span>true
<span class="token assign-left variable">secret.code.lives</span><span class="token operator">=</span><span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面开始创建 ConfigMap。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create ConfigMap game-config --from-file<span class="token operator">=</span>/path-to-ConfigMap/ConfigMap/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 ConfigMap 内容如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get ConfigMap game-config <span class="token parameter variable">-o</span> yaml
apiVersion: v1
data:
  game.properties: <span class="token operator">|</span>-
    <span class="token assign-left variable">enemies</span><span class="token operator">=</span>aliens
    <span class="token assign-left variable">lives</span><span class="token operator">=</span><span class="token number">3</span>
    <span class="token assign-left variable">enemies.cheat</span><span class="token operator">=</span>true
    <span class="token assign-left variable">enemies.cheat.level</span><span class="token operator">=</span>noGoodRotten
    <span class="token assign-left variable">secret.code.passphrase</span><span class="token operator">=</span>UUDDLRLRBABAS
    <span class="token assign-left variable">secret.code.allowed</span><span class="token operator">=</span>true
    <span class="token assign-left variable">secret.code.lives</span><span class="token operator">=</span><span class="token number">30</span>
  ui.properties: <span class="token operator">|</span>
    <span class="token assign-left variable">color.good</span><span class="token operator">=</span>purple
    <span class="token assign-left variable">color.bad</span><span class="token operator">=</span>yellow
    <span class="token assign-left variable">allow.textmode</span><span class="token operator">=</span>true
    <span class="token assign-left variable">how.nice.to.look</span><span class="token operator">=</span>fairlyNice
kind: ConfigMap
metadata:
  creationTimestamp: <span class="token string">&quot;2020-04-07T02:02:43Z&quot;</span>
  name: game-config
  namespace: default
  resourceVersion: <span class="token string">&quot;35384497&quot;</span>
  selfLink: /api/v1/namespaces/default/ConfigMaps/game-config
  uid: de85b232-7873-11ea-a328-00163e16aee6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过文件创建" tabindex="-1"><a class="header-anchor" href="#通过文件创建" aria-hidden="true">#</a> 通过文件创建</h4><p>类似的我们也可以指定通过某个文件创建，只要将上面的最后一个参数的目录改成文件既可，可以连接多个 <code>--from-file</code> 参数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create ConfigMap game-config-file --from-file<span class="token operator">=</span>/path-to-ConfigMap/ConfigMap/game.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后查看该 ConfigMap。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get ConfigMap game-config-file <span class="token parameter variable">-o</span> yaml
apiVersion: v1
data:
  game.properties: <span class="token operator">|</span>-
    <span class="token assign-left variable">enemies</span><span class="token operator">=</span>aliens
    <span class="token assign-left variable">lives</span><span class="token operator">=</span><span class="token number">3</span>
    <span class="token assign-left variable">enemies.cheat</span><span class="token operator">=</span>true
    <span class="token assign-left variable">enemies.cheat.level</span><span class="token operator">=</span>noGoodRotten
    <span class="token assign-left variable">secret.code.passphrase</span><span class="token operator">=</span>UUDDLRLRBABAS
    <span class="token assign-left variable">secret.code.allowed</span><span class="token operator">=</span>true
    <span class="token assign-left variable">secret.code.lives</span><span class="token operator">=</span><span class="token number">30</span>
kind: ConfigMap
metadata:
  creationTimestamp: <span class="token string">&quot;2020-04-07T02:09:18Z&quot;</span>
  name: game-config-file
  namespace: default
  resourceVersion: <span class="token string">&quot;35385556&quot;</span>
  selfLink: /api/v1/namespaces/default/ConfigMaps/game-config-file
  uid: c9a01ad0-7874-11ea-a312-00163e16aa1b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过环境变量文件" tabindex="-1"><a class="header-anchor" href="#通过环境变量文件" aria-hidden="true">#</a> 通过环境变量文件</h4><p>通过环境变量文件创建 ConfigMap 和通过文件创建的方式类似，将参数 <code>--from-file</code> 改成 <code>--from-env-file</code> 即可。还有一个重要的区别的是通过环境变量文件创建 ConfigMap 只能使用一个文件。下面是示例。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create ConfigMap game-config-env --from-env-file<span class="token operator">=</span>/path-to-ConfigMap/ConfigMap/game.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们再通过 <code>kubectl get</code> 获取 ConfigMap 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get ConfigMap game-config-env <span class="token parameter variable">-o</span> yaml
apiVersion: v1
data:
  enemies: aliens
  enemies.cheat: <span class="token string">&quot;true&quot;</span>
  enemies.cheat.level: noGoodRotten
  lives: <span class="token string">&quot;3&quot;</span>
  secret.code.allowed: <span class="token string">&quot;true&quot;</span>
  secret.code.lives: <span class="token string">&quot;30&quot;</span>
  secret.code.passphrase: UUDDLRLRBABAS
kind: ConfigMap
metadata:
  creationTimestamp: <span class="token string">&quot;2020-04-07T15:32:45Z&quot;</span>
  name: game-config-env
  namespace: default
  resourceVersion: <span class="token string">&quot;35514135&quot;</span>
  selfLink: /api/v1/namespaces/default/ConfigMaps/game-config-env
  uid: 075dabd9-78e5-11ea-a312-00163e16aa1b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比上面的通过文件创建 ConfigMap 的对象，可以看出来区别在于 data 字段。前面两种方式通过文件创建出来的 ConfigMap 有一个 key 对应到文件名，好处是我们可以通过多个配置文件创建 ConfigMap，然后在不同的配置文件中使用相同名字的 key。</p><h4 id="直接编写-configmap" tabindex="-1"><a class="header-anchor" href="#直接编写-configmap" aria-hidden="true">#</a> 直接编写 ConfigMap</h4><p>除了通过文件来创建 ConfigMap 外，我们也可以直接编写一个 ConfigMap 对象的 yaml 文件，然后通过 <code>kubectl apply</code> 去创建 ConfigMap。</p><h2 id="_2-configmap-使用" tabindex="-1"><a class="header-anchor" href="#_2-configmap-使用" aria-hidden="true">#</a> 2. ConfigMap 使用</h2><p>我们使用 ConfigMap 主要可以通过两种方式来使用：</p><ol><li>通过环境变量</li><li>通过 volume 挂载</li></ol><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4><p>通过环境变量的方式使用 ConfigMap，只能使用形如下面这样的 ConfigMap，也就是通过环境变量文件创建的 ConfigMap。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get ConfigMap game-config-env <span class="token parameter variable">-o</span> yaml
apiVersion: v1
data:
  enemies: aliens
  enemies.cheat: <span class="token string">&quot;true&quot;</span>
  enemies.cheat.level: noGoodRotten
  lives: <span class="token string">&quot;3&quot;</span>
  secret.code.allowed: <span class="token string">&quot;true&quot;</span>
  secret.code.lives: <span class="token string">&quot;30&quot;</span>
  secret.code.passphrase: UUDDLRLRBABAS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用的时候可以使用 ConfigMap 中指定的 key 或者 ConfigMap 中所有的 key，下面是示例。</p><h5 id="使用指定的-key" tabindex="-1"><a class="header-anchor" href="#使用指定的-key" aria-hidden="true">#</a> 使用指定的 key</h5><p>下面的示例是引用 ConfigMap <code>game-config-env</code> 中的 key 为 lives 的变量，值为 3。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod2
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo Hello Kubernetes! &amp;&amp; sleep 3600&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ENV_LIVES
        <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
          <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> game<span class="token punctuation">-</span>config<span class="token punctuation">-</span>env
            <span class="token key atrule">key</span><span class="token punctuation">:</span> lives
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还是通过 <code>kubectl apply</code> ，然后通过 <code>kubectl exec</code> 登录到 Pod 里面查看环境变量。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> myapp-pod2 <span class="token parameter variable">-n</span> imooc -- <span class="token function">sh</span>
/ <span class="token comment"># / # env | grep LIVES</span>
<span class="token assign-left variable">ENV_LIVES</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="使用所有的-key" tabindex="-1"><a class="header-anchor" href="#使用所有的-key" aria-hidden="true">#</a> 使用所有的 key</h5><p>除了像上面这种使用 ConfigMap 中某个特定的 key，还可以将 ConfigMap 中所有的 key 直接映射到容器内，下面是一个使用示例。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod3
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo Hello Kubernetes! &amp;&amp; sleep 3600&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">envFrom</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">configMapRef</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> game<span class="token punctuation">-</span>config<span class="token punctuation">-</span>env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，我们也是通过 <code>kubectl apply</code> 创建 Pod，然后通过 <code>kubectl exec</code> 登录到 Pod 内部查看环境变量情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> myapp-pod3 <span class="token parameter variable">-n</span> imooc -- <span class="token function">sh</span>
/ <span class="token comment"># env</span>
<span class="token assign-left variable">MYSERVICE_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.0</span>.211.41
<span class="token assign-left variable">KUBERNETES_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">443</span>
<span class="token assign-left variable">KUBERNETES_PORT</span><span class="token operator">=</span>tcp://10.0.0.1:443
<span class="token assign-left variable">MYDB_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token assign-left variable">MYDB_PORT</span><span class="token operator">=</span>tcp://10.0.51.122:80
<span class="token assign-left variable"><span class="token environment constant">HOSTNAME</span></span><span class="token operator">=</span>myapp-pod3
<span class="token assign-left variable"><span class="token environment constant">SHLVL</span></span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable"><span class="token environment constant">HOME</span></span><span class="token operator">=</span>/root
<span class="token assign-left variable">MYSERVICE_PORT</span><span class="token operator">=</span>tcp://10.0.211.41:80
<span class="token assign-left variable">MYSERVICE_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token assign-left variable">MYDB_PORT_80_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.0</span>.51.122
<span class="token assign-left variable">MYDB_PORT_80_TCP_PORT</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token assign-left variable">MYDB_PORT_80_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">lives</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token assign-left variable">MYSERVICE_PORT_80_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.0</span>.211.41
<span class="token assign-left variable">secret.code.passphrase</span><span class="token operator">=</span>UUDDLRLRBABAS
<span class="token assign-left variable">MYSERVICE_PORT_80_TCP_PORT</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token assign-left variable">MYSERVICE_PORT_80_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable"><span class="token environment constant">TERM</span></span><span class="token operator">=</span>xterm
<span class="token assign-left variable">enemies</span><span class="token operator">=</span>aliens
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.0</span>.0.1
<span class="token assign-left variable">MYDB_PORT_80_TCP</span><span class="token operator">=</span>tcp://10.0.51.122:80
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP_PORT</span><span class="token operator">=</span><span class="token number">443</span>
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">MYSERVICE_PORT_80_TCP</span><span class="token operator">=</span>tcp://10.0.211.41:80
<span class="token assign-left variable">secret.code.lives</span><span class="token operator">=</span><span class="token number">30</span>
<span class="token assign-left variable">secret.code.allowed</span><span class="token operator">=</span>true
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP</span><span class="token operator">=</span>tcp://10.0.0.1:443
<span class="token assign-left variable">KUBERNETES_SERVICE_PORT_HTTPS</span><span class="token operator">=</span><span class="token number">443</span>
<span class="token assign-left variable">enemies.cheat.level</span><span class="token operator">=</span>noGoodRotten
<span class="token assign-left variable">KUBERNETES_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.0</span>.0.1
<span class="token assign-left variable"><span class="token environment constant">PWD</span></span><span class="token operator">=</span>/
<span class="token assign-left variable">MYDB_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.0</span>.51.122
<span class="token assign-left variable">enemies.cheat</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的输出可以看到确实是所有环境变量都映射进来了。</p><h4 id="通过-volume-挂载" tabindex="-1"><a class="header-anchor" href="#通过-volume-挂载" aria-hidden="true">#</a> 通过 volume 挂载</h4><p>在 Pod 中可以定义多种 volume，比如 <code>emptyDir</code>、<code>hostPath</code> 等，ConfigMap 也可以作为一种类型的 volume 使用。下面是一个使用 ConfigMap 作为 volume 的使用示例：</p><ul><li>首先在 Pod 的 spec 字段域定义一个 volumes 字段，下面包含了两个 ConfigMap 类型的 volume： config-volume 和 env-config-volume，分别映射到名字叫 game-config 和 game-config-env 的两个 ConfigMap。</li><li>在 spec.containers 下的某个 container 的定义中通过 volumeMounts 将上面的 volume 挂载到目录：/etc/config 和 /etc/env-config</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod1
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo Hello Kubernetes! &amp;&amp; sleep 3600&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/config
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> env<span class="token punctuation">-</span>config<span class="token punctuation">-</span>volume
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/env<span class="token punctuation">-</span>config
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
      <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> game<span class="token punctuation">-</span>config
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> env<span class="token punctuation">-</span>config<span class="token punctuation">-</span>volume
      <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> game<span class="token punctuation">-</span>config<span class="token punctuation">-</span>env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过 <code>kubectl apply</code> 启动 Pod，然后通过 <code>kubectl exec</code> 登录进去看一下挂载点的情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> myapp-pod1 <span class="token parameter variable">-n</span> imooc -- <span class="token function">sh</span>
/ <span class="token comment"># ls /etc/env-config/</span>
enemies                 enemies.cheat.level     secret.code.allowed     secret.code.passphrase
enemies.cheat           lives                   secret.code.lives
/ <span class="token comment"># ls /etc/config</span>
game.properties  ui.properties
/ <span class="token comment"># cat /etc/config/game.properties</span>
<span class="token assign-left variable">enemies</span><span class="token operator">=</span>aliens
<span class="token assign-left variable">lives</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token assign-left variable">enemies.cheat</span><span class="token operator">=</span>true
<span class="token assign-left variable">enemies.cheat.level</span><span class="token operator">=</span>noGoodRotten
<span class="token assign-left variable">secret.code.passphrase</span><span class="token operator">=</span>UUDDLRLRBABAS
<span class="token assign-left variable">secret.code.allowed</span><span class="token operator">=</span>true
<span class="token assign-left variable">secret.code.lives</span><span class="token operator">=</span><span class="token number">30</span>
/ <span class="token comment"># cat /etc/env-config/lives</span>
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面输出我们可以看到对于通过文件创建的 ConfigMap 在挂载目录下是每个文件对应一个配置文件，而通过环境变量文件创建的 ConfigMap 在挂载目录下是每个 key 对应一个配置文件。</p><h2 id="_3-configmap-使用限制" tabindex="-1"><a class="header-anchor" href="#_3-configmap-使用限制" aria-hidden="true">#</a> 3. ConfigMap 使用限制</h2><p>对于 ConfigMap 的两种使用方式：环境变量方式和挂载 volume 的方式，在生产环境中一般建议使用第二种方式。对于使用 ConfigMap 的几个限制这里简单提一下：</p><ol><li>ConfigMap 是通过 etcd 存储的（实际上 kubernetes 中所有 API 对象都是存储在 etcd 中的），etcd 的 value 默认有一个限制是 1M 大小，这个在使用的时候需要注意。</li><li>更新问题。有些情况我需要更新 ConfigMap，这个时候就涉及到能不能即时在 Pod 内生效的问题。 <ul><li>环境变量方式如果 Pod 不重启 ConfigMap 是不会自动更新的。</li><li>通过 volume 挂载的方式可以在 10s 左右自动更新。</li></ul></li></ol><h2 id="_4-secret-创建" tabindex="-1"><a class="header-anchor" href="#_4-secret-创建" aria-hidden="true">#</a> 4. Secret 创建</h2><p>Secret 对象类型一般用来保存敏感信息，比如密码、令牌和 ssh key 等。将这些信息放在 secret 中比放在 Pod 的定义 spec 或者容器镜像中来说更加的安全和灵活，也可以更好的控制。</p><p>下面我们来看一下如何创建 secret 对象，有两种方式，一种是通过 kubectl 命令行创建，一种是手动创建。</p><h4 id="kubectl-命令行创建" tabindex="-1"><a class="header-anchor" href="#kubectl-命令行创建" aria-hidden="true">#</a> kubectl 命令行创建</h4><p>假设我们现在要用 secret 来保存用户名密码，我们先将用户名和密码保存到两个本地文件中 <code>username.txt</code> 和 <code>password.txt</code> 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;admin&#39;</span> <span class="token operator">&gt;</span> ./username.txt
$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;1f2d1e2e67df&#39;</span> <span class="token operator">&gt;</span> ./password.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面使用 <code>kubectl create secret</code> 命令行的方式通过引用文件来创建。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create secret generic db-user-pass --from-file<span class="token operator">=</span>./username.txt --from-file<span class="token operator">=</span>./password.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以通过 <code>kubectl get secret</code> 的方式来查看 secret 的内容。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get secret db-user-pass <span class="token parameter variable">-n</span> imooc <span class="token parameter variable">-o</span> yaml
apiVersion: v1
data:
  password.txt: MWYyZDFlMmU2N2Rm
  username.txt: <span class="token assign-left variable">YWRtaW4</span><span class="token operator">=</span>
kind: Secret
metadata:
  creationTimestamp: <span class="token string">&quot;2020-04-08T02:57:28Z&quot;</span>
  name: db-user-pass
  namespace: imooc
  resourceVersion: <span class="token string">&quot;35623868&quot;</span>
  selfLink: /api/v1/namespaces/imooc/secrets/db-user-pass
  uid: aee2388b-7944-11ea-a328-00163e16aee6
type: Opaque
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到 data 字段的数据被加密了，其实这里说加密是不准确的，这个数据其实是被做了 base64 编码。我们可以通过 base64 解码看一下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;YWRtaW4=&#39;</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span>
admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="手动创建" tabindex="-1"><a class="header-anchor" href="#手动创建" aria-hidden="true">#</a> 手动创建</h4><p>手动创建就是手动创建一个类似上面的 secret 对象的 yaml 文件，然后通过 <code>kubectl apply</code> 创建，这里就不赘述了。</p><h2 id="_5-secret-使用" tabindex="-1"><a class="header-anchor" href="#_5-secret-使用" aria-hidden="true">#</a> 5. Secret 使用</h2><p>Secret 对象的使用主要也是通过两种方式：</p><ol><li>环境变量</li><li>通过 volume 挂载</li></ol><h4 id="环境变量-1" tabindex="-1"><a class="header-anchor" href="#环境变量-1" aria-hidden="true">#</a> 环境变量</h4><p>和 ConfigMap 比较类似，下面是 secret 作为通过环境变量使用的例子。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>env<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mycontainer
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> SECRET_USERNAME
        <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
          <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> mysecret
            <span class="token key atrule">key</span><span class="token punctuation">:</span> username
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> SECRET_PASSWORD
        <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
          <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> mysecret
            <span class="token key atrule">key</span><span class="token punctuation">:</span> password
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过-volume-挂载-1" tabindex="-1"><a class="header-anchor" href="#通过-volume-挂载-1" aria-hidden="true">#</a> 通过 volume 挂载</h4><p>下面是将 secret 通过 volume 挂载到 Pod 内部的一个例子。我们可以看到最后的 volume 定义里面有一个 mode 字段，没错，这个就是文件模式。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> foo
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> <span class="token string">&quot;/etc/foo&quot;</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> foo
    <span class="token key atrule">secret</span><span class="token punctuation">:</span>
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> mysecret
      <span class="token key atrule">items</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> username
        <span class="token key atrule">path</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>group/my<span class="token punctuation">-</span>username
        <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token number">511</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结" aria-hidden="true">#</a> 6. 总结</h2><p>本文介绍了 Kubernetes 中配置管理的两种方式：ConfigMap 和 Secret，总体来说还比较简单。</p>`,84),t=[p];function c(o,r){return s(),a("div",null,t)}const u=n(l,[["render",c],["__file","index-34.html.vue"]]);export{u as default};
