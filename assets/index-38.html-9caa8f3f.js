import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const t="/assets/5f92347000018d1006400359-508df3bd.jpg",i={},l=e('<h1 id="_38-kubernetes-批处理介绍-job-和-cronjob" tabindex="-1"><a class="header-anchor" href="#_38-kubernetes-批处理介绍-job-和-cronjob" aria-hidden="true">#</a> 38-<strong>Kubernetes 批处理介绍：Job 和 CronJob</strong></h1><p><img src="'+t+`" alt="img"></p><blockquote><p>书籍乃世人积累智慧之长明灯。——寇第斯</p></blockquote><p>Kubernetes 诞生之初是为在线应用服务的，或者说 long-running 类型的应用服务。但是随着越累越多的企业开始拥抱 Kubernetes，批处理的需求也逐渐显现出来。那么到底什么是批处理呢？</p><p>简单来说，所有有明确结束标志的应用都可以统称为批处理应用。比如大数据领域就将作业 (Application) 分为两种：实时处理和批处理，其中批处理就是类似于 MapReduce 这种作业。</p><p>Kubernetes 对于批处理作业提供了两种 API 对象参考：Job 和 CronJob，从名字我们也可以看出来 CronJob 就是 Job 的定时调度。</p><h2 id="_1-job" tabindex="-1"><a class="header-anchor" href="#_1-job" aria-hidden="true">#</a> 1. Job</h2><h4 id="_1-1-运行一个-job-demo" tabindex="-1"><a class="header-anchor" href="#_1-1-运行一个-job-demo" aria-hidden="true">#</a> 1.1 运行一个 Job Demo</h4><p>下面是一个非常简单的 Job 的描述文件，这个 Job 会通过 perl 计算 pi 的小数点后两千位数，并输出。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
        <span class="token key atrule">image</span><span class="token punctuation">:</span> perl
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span><span class="token punctuation">,</span>  <span class="token string">&quot;-Mbignum=bpi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-wle&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
  <span class="token key atrule">backoffLimit</span><span class="token punctuation">:</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样地，我们还是使用 <code>kubectl apply</code> 去运行这个 Job，然后通过 <code>kubectl get</code> 查看一些概览信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> pi-job.yaml <span class="token parameter variable">-n</span> imooc
job.batch/pi created
$ kubectl get <span class="token function">jobs</span> <span class="token parameter variable">-n</span> imooc
NAME   COMPLETIONS   DURATION   AGE
pi     <span class="token number">0</span>/1           20s        20s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到 Job 的概览信息包括：</p><ul><li>NAME：Job 的名字；</li><li>COMPLETIONS：是否完成，因为 Job 也有可能包含多个容器，或者说 Task，所以这里 COMPLETIONS 的表示左边是完成的 task 数，右边是 task 总数。</li><li>DURATION：Job 的作业持续时间；</li><li>AGE：Job 的存活时间，关于 DURATION 和 AGE 的区别，我们过 20s 再看一下就能看出来。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl get <span class="token function">jobs</span> <span class="token parameter variable">-n</span> imooc
NAME   COMPLETIONS   DURATION   AGE
pi     <span class="token number">1</span>/1           44s        3m42s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没错，如上显示，DURATION 为 task 执行的时间，而 AGE 为 Job 存活的时间，Job 执行完之后 Job 对象还是存在的。</p><p>安装惯例，我们还要通过 <code>kubectl describe jobs</code> 查看一下这个 Job 运行起来都包含哪些信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl describe <span class="token function">jobs</span> pi <span class="token parameter variable">-n</span> imooc
Name:           pi
Namespace:      imooc
Selector:       controller-uid<span class="token operator">=</span>63385de0-7da9-11ea-a328-00163e16aee6
Labels:         controller-uid<span class="token operator">=</span>63385de0-7da9-11ea-a328-00163e16aee6
                job-name<span class="token operator">=</span>pi
Annotations:    kubectl.kubernetes.io/last-applied-configuration:
                  <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;batch/v1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;Job&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;pi&quot;</span>,<span class="token string">&quot;namespace&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;imooc&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;spec&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;backoffLimit&quot;</span>:4,<span class="token string">&quot;template&quot;</span>:<span class="token punctuation">{</span>&quot;<span class="token punctuation">..</span>.
Parallelism:    <span class="token number">1</span>
Completions:    <span class="token number">1</span>
Start Time:     Tue, <span class="token number">14</span> Apr <span class="token number">2020</span> 01:08:25 +0800
Completed At:   Tue, <span class="token number">14</span> Apr <span class="token number">2020</span> 01:09:09 +0800
Duration:       44s
Pods Statuses:  <span class="token number">0</span> Running / <span class="token number">1</span> Succeeded / <span class="token number">0</span> Failed
Pod Template:
  Labels:  controller-uid<span class="token operator">=</span>63385de0-7da9-11ea-a328-00163e16aee6
           job-name<span class="token operator">=</span>pi
  Containers:
   pi:
    Image:      perl
    Port:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Host Port:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Command:
      perl
      <span class="token parameter variable">-Mbignum</span><span class="token operator">=</span>bpi
      <span class="token parameter variable">-wle</span>
      print bpi<span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span>
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
  Type    Reason            Age   From            Message
  ----    ------            ----  ----            -------
  Normal  SuccessfulCreate  7m2s  job-controller  Created pod: pi-wsgmm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 Job 的描述信息中主要包括：</p><ul><li>基本信息：包括名字、标签（labels）、注释（annotations）等；</li><li>Parallelism：并行度，这个下一小节再细说；</li><li>Completions：完成的 Task 个数；</li><li>Duration：Task 执行持续时间；</li><li>Events：主要包括创建 Pod 的事件信息，因为 Pod 作为 Kubernetes 的基本调度单温，Job 的执行最后也是通过 Pod 来运行的，对于这个示例要查看最后的运行结果，我们可以通过 <code>kubectl logs</code> 来查看 Pod 的日志。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl logs pi-wsgmm <span class="token parameter variable">-n</span> imooc
<span class="token number">3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275901</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-编写-job-对象描述" tabindex="-1"><a class="header-anchor" href="#_1-2-编写-job-对象描述" aria-hidden="true">#</a> 1.2 编写 Job 对象描述</h4><p>还是以下面这个简单的 Job 描述文件为例看一下 Job 对象的 yaml 文件或者说 spec 如何编写。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span>,  <span class="token string">&quot;-Mbignum=bpi&quot;</span>, <span class="token string">&quot;-wle&quot;</span>, <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>
        resources:
          limits:
            cpu: 100m
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 200Mi
      restartPolicy: Never
  backoffLimit: <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Job 对象的描述主要包括：</p><ul><li><p><strong>apiVersion</strong>：batch/v1；</p></li><li><p><strong>kind</strong>：Job；</p></li><li><p><strong>metadata</strong>：比如 name，labels 等；</p></li><li><p>spec</p><p>：主要信息都包含在 spec 中：</p><ul><li><em><strong>template</strong></em>：唯一必填字段，Pod 模板，定义和 Pod 的编写一致，除了不需要 apiVersion 和 kind；</li><li><em><strong>selector</strong></em>：表示 Pod 选择器，默认空缺即可。</li></ul></li></ul><p>下面再介绍一下 Job 的并行度。Job 可以用来运行三种类型的任务，包括：</p><ul><li><strong>非并行任务</strong>：一般情况下，只会启动一个 Pod，Pod 成功结束就表示 Job 正常完成了。</li><li><strong>带有固定 completion 数目的并行任务</strong>：spec.completions 定义 Job 至少要完成的 Pod 数据，即 Job 的最小完成数。</li><li><strong>具有工作队列的并行任务</strong>：通过参数 spec.parallelism 指定一个 Job 在任意时间最多可以启动运行的 Pod 数。</li></ul><h4 id="_1-3-job-结束和清理" tabindex="-1"><a class="header-anchor" href="#_1-3-job-结束和清理" aria-hidden="true">#</a> 1.3 Job 结束和清理</h4><p>当 Job 完成时，为了方便查看任务执行状态或者日志，Job 创建的 Job 和 Pod 对象一般情况下不会被自动清理。我们可以通过命令 <code>kubectl delete jobs</code> 来删除指定的 Job，这样 Job 以及连带的 Pod 都会被删除。</p><h4 id="_1-4-job-自动清理" tabindex="-1"><a class="header-anchor" href="#_1-4-job-自动清理" aria-hidden="true">#</a> 1.4 Job 自动清理</h4><p>很多情况下，Job 结束了之后我们是期望可以清理掉的，因为残留的 Job 对象会额外增加 Kubernetes 的 ApiServer 的压力。那么如何自动清理结束的 Job 呢？</p><ol><li><p>通过上层控制器来清理，比如 CronJob。</p></li><li><p>TTL：引入 TTL 控制器，TTL 是 Time To Live 的简称，也就是存活时间。很多存储系统中都有这么一个叫做 TTL 的参数。要使用 TTL 控制器非常简单，只需要在 Job 的 spec 中增加参数 <code>ttlSecondsAfterFinished</code> 即可，这个参数的含义很明显，就是 Job 结束之后的存活时间。下面是一个添加了该参数的 Job 资源文件示例。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pi<span class="token punctuation">-</span>with<span class="token punctuation">-</span>ttl
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ttlSecondsAfterFinished</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
        <span class="token key atrule">image</span><span class="token punctuation">:</span> perl
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span><span class="token punctuation">,</span>  <span class="token string">&quot;-Mbignum=bpi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-wle&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_2-cronjob" tabindex="-1"><a class="header-anchor" href="#_2-cronjob" aria-hidden="true">#</a> 2. CronJob</h2><p>在正式介绍 Kubernetes 的 CronJob 之前，我们先介绍一下 Linux 系统的 Crontab，对 Linux 熟悉的同学肯定都使用过，简而言之，Crontab 可以用来设置定时和周期性的任务。Crontab 常用命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token punctuation">[</span>-u username<span class="token punctuation">]</span>
		<span class="token parameter variable">-e</span>	<span class="token punctuation">(</span>编辑任务表<span class="token punctuation">)</span>
		<span class="token parameter variable">-l</span>	<span class="token punctuation">(</span>列出任务表<span class="token punctuation">)</span>
		<span class="token parameter variable">-r</span>	<span class="token punctuation">(</span>删除任务表<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过命令 <code>crontab -e</code> 进入当前用户的任务表编辑页面，每行是一条命令，格式为时间 + 任务。其中时间共有五个域，分别是分、时、日、月、周五种，任务可以是一个 shell 命令或者一个可执行程序。其中对时间的操作符有四种：</p><ul><li><code>*</code> 取值范围内的所有数字</li><li><code>/</code> 每过多少个数字</li><li><code>-</code> 从 X 到 Z</li><li><code>,</code> 一组数字集合</li></ul><p>下面举几个具体的任务例子。</p><p>每分钟都执行一次 job。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>* * * * * job
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每小时的第 3 和第 30 分钟执行一次 job。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> * * * * job
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上午 8 点到 11 点的第 3 和第 15 分钟执行一次 job。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> <span class="token number">8</span>-11 * * * job
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每隔两天的上午 8 点到 11 点的第 3 和第 15 分钟执行一次 job。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> <span class="token number">8</span>-11 */2 * * job
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-1-创建-cronjob" tabindex="-1"><a class="header-anchor" href="#_2-1-创建-cronjob" aria-hidden="true">#</a> 2.1 创建 CronJob</h4><p>下面正式开始介绍 Kubernetes 的 CronJob API。CronJob 和 Linux 的 Crontab 非常类似，只不过 CronJob 的周期性任务是相对于整个 Kubernetes 集群而言的，而 Crontab 执行的任务被限定在一台 Linux 机器上。我们先看一个 CronJob 示例。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CronJob
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
	<span class="token key atrule">name</span><span class="token punctuation">:</span> cronjob<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
	<span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">&quot;*/2 * * * *&quot;</span>
	<span class="token key atrule">jobTemplate</span><span class="token punctuation">:</span>
		<span class="token key atrule">spec</span><span class="token punctuation">:</span>
			<span class="token key atrule">template</span><span class="token punctuation">:</span>
				<span class="token key atrule">spec</span><span class="token punctuation">:</span>
					<span class="token key atrule">containers</span><span class="token punctuation">:</span>
					<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
						<span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
						<span class="token key atrule">args</span><span class="token punctuation">:</span>
						<span class="token punctuation">-</span> /bin/sh
						<span class="token punctuation">-</span> <span class="token punctuation">-</span>c
						<span class="token punctuation">-</span> date; echo Hello from the Kubernetes cluster
					<span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> OnFailure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 CronJob 做的事情非常简单，每隔 2 分钟输出当前时间和一串文本信息 “Hello from the Kubernetes cluster”。下面我们部署一下来看看效果。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜  kubectl apply <span class="token parameter variable">-f</span> cronjob-demo.yaml
cronjob.batch/cronjob-demo created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>和其他 API 对象一样，我们通过 <code>kubectl get cronjob</code> 来查看我们刚刚部署的 CronJob。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜  kubectl get cronjob
NAME           SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
cronjob-demo   */2 * * * *   False     <span class="token number">0</span>        <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>          39s
➜  kubectl get cronjob
NAME           SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
cronjob-demo   */2 * * * *   False     <span class="token number">1</span>        64s             2m3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一次查看的时候可以看到 <code>LAST SCHEDULE</code> 字段为 <code>&lt;none&gt;</code> 就表示没有被调度，然后过了 2 分钟再次查看可以看到上一次的调度时间。</p><p>下面我们再通过 <code>kubectl describe cronjob</code> 来查看一下 CronJob 的明细信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜ kubectl describe cronjob cronjob-demo
Name:                          cronjob-demo
Namespace:                     default
Labels:                        <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:                   kubectl.kubernetes.io/last-applied-configuration:
                                 <span class="token punctuation">{</span><span class="token string">&quot;apiVersion&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;batch/v1beta1&quot;</span>,<span class="token string">&quot;kind&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;CronJob&quot;</span>,<span class="token string">&quot;metadata&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;annotations&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;cronjob-demo&quot;</span>,<span class="token string">&quot;namespace&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">}</span>,<span class="token string">&quot;spec&quot;</span>:<span class="token punctuation">{</span>&quot;jobTempl<span class="token punctuation">..</span>.
Schedule:                      */2 * * * *
Concurrency Policy:            Allow
Suspend:                       False
Successful Job History Limit:  <span class="token number">3</span>
Failed Job History Limit:      <span class="token number">1</span>
Starting Deadline Seconds:     <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>
Selector:                      <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>
Parallelism:                   <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>
Completions:                   <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>
Pod Template:
  Labels:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
  Containers:
   busybox:
    Image:      busybox
    Port:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Host Port:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Args:
      /bin/sh
      <span class="token parameter variable">-c</span>
      <span class="token function">date</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> Hello from the Kubernetes cluster
    Environment:     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:          <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
  Volumes:           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Last Schedule Time:  Sat, <span class="token number">23</span> May <span class="token number">2020</span> <span class="token number">15</span>:46:00 +0800
Active Jobs:         cronjob-demo-1590219720, cronjob-demo-1590219840, cronjob-demo-1590219960
Events:
  Type    Reason            Age    From                Message
  ----    ------            ----   ----                -------
  Normal  SuccessfulCreate  4m33s  cronjob-controller  Created job cronjob-demo-1590219720
  Normal  SuccessfulCreate  2m33s  cronjob-controller  Created job cronjob-demo-1590219840
  Normal  SuccessfulCreate  33s    cronjob-controller  Created job cronjob-demo-1590219960
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在 Events 中看到每隔两分钟，CronJob 对象就会创建出来一个新的 Job。</p><h4 id="_2-2-删除-cronjob" tabindex="-1"><a class="header-anchor" href="#_2-2-删除-cronjob" aria-hidden="true">#</a> 2.2 删除 CronJob</h4><p>删除 CronJob 和删除其他资源类似。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>➜ kubectl delete cronjob cronjob-demo
cronjob.batch <span class="token string">&quot;cronjob-demo&quot;</span> deleted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-spec-说明" tabindex="-1"><a class="header-anchor" href="#_2-3-spec-说明" aria-hidden="true">#</a> 2.3 Spec 说明</h4><p>CronJob 的资源文件编写主要包括：</p><ul><li><p><strong>apiVersion</strong>：batch/v1beta1</p></li><li><p><strong>kind</strong>：cronjob</p></li><li><p><strong>metadata</strong>：一些元信息，比如 name 之类的</p></li><li><p><strong>spec</strong>：CronJob 的主要信息都在 spec 域下</p><ul><li><p><em><strong>schedule</strong></em>：调度策略，格式遵从 Linux 的 Cron 标准</p></li><li><p><em><strong>jobTemplate</strong></em>：任务模板，和 Job API 的语法完全一样，只不过缺少一些 apiVersion 和 kind 等信息</p></li><li><p><em><strong>startingDeadlineSeconds</strong></em>：可选，表示任务如果由于某种原因错过了调度时间，开始该任务的截止时间的秒数。过了截止时间，CronJob 就不会再调度任务了，这种任务被统计为失败任务。如果该域没有声明，那么任务就没有最后期限。</p></li><li><p><strong>concurrencyPolicy</strong></p><p>：可选，定义任务执行时发生重叠如何处理，支持下面三种方式：</p><ul><li>Allow：允许并发任务执行。默认选项为 Allow。</li><li>Forbid：不允许并发任务执行，也就是说如果新任务的执行时间到了而老的任务还没有执行完，则不会执行新的任务。这种情况在某些情况下是必要的，比如多个任务同时操作一个共享资源时可能出错。</li><li>Replace：如果新任务的执行时间到了而老任务没有执行完，CronJob 会用新的任务替换当前正在运行的任务。</li></ul></li><li><p><em><strong>suspend</strong></em>：可选，如果设置为 <code>true</code>，后续发生的执行都会被挂起。这个设置对已经开始的执行不起作用。默认关闭。</p></li></ul></li><li><p><strong>successfulJobsHistoryLimit</strong>：可选，表示多少执行完成的任务会被保留，默认值为 3。</p></li><li><p><strong>failedJobHistoryLimit</strong>：可选，表示多少执行失败的任务会被保留，默认值为 1。有的时候保留执行失败的任务对于我们排查任务失败的原因比较有用。</p></li></ul><h2 id="_3-总结" tabindex="-1"><a class="header-anchor" href="#_3-总结" aria-hidden="true">#</a> 3. 总结</h2><p>本篇文章介绍了 Kubernetes 中的批处理调度 Job 和 CronJob。尽管 Kubernetes 的主要应用场景是 Long-Running 的应用，但是某些情况下批处理调度还是需要的，比如我们通过 Job 去初始化环境，通过 CronJob 去定时清理集群中的某些资源等。</p>`,66),o=[l];function p(c,r){return s(),a("div",null,o)}const d=n(i,[["render",p],["__file","index-38.html.vue"]]);export{d as default};
