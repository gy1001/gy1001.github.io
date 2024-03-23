import{_ as n,p as s,q as a,a1 as e}from"./framework-e8cb8151.js";const i="/assets/5f64170a0001253722581500-9ea248aa.jpg",l="/assets/5f6417a90001367208720822-8de2e021.png",t={},p=e('<h1 id="_28-从-0-到-1-构建分布式高可用的-web-应用" tabindex="-1"><a class="header-anchor" href="#_28-从-0-到-1-构建分布式高可用的-web-应用" aria-hidden="true">#</a> 28-从 0 到 1 构建分布式高可用的 web 应用</h1><p><img src="'+i+'" alt="img"></p><blockquote><p>生活永远不像我们想像的那样好，但也不会像我们想像的那样糟。——莫泊桑</p></blockquote><p>这篇文章我们来实践一下稍微复杂一点的场景：构建一个分布式高可用的 web 应用。</p><h2 id="_1-架构" tabindex="-1"><a class="header-anchor" href="#_1-架构" aria-hidden="true">#</a> 1. 架构</h2><p>下图是本文要介绍的系统架构，从上到下依次为：</p><ol><li>用户 client 端的请求；</li><li>HAProxy：开源代理软件，用来提供高可用和负载均衡；</li><li>多个 Web 应用；</li><li>Redis 集群。</li></ol><p>下面我们重点介绍后面三个部分：</p><p><img src="'+l+`" alt="图片描述"></p><h2 id="_2-haproxy" tabindex="-1"><a class="header-anchor" href="#_2-haproxy" aria-hidden="true">#</a> 2. HAProxy</h2><h4 id="haproxy-概览" tabindex="-1"><a class="header-anchor" href="#haproxy-概览" aria-hidden="true">#</a> HAProxy 概览</h4><p>HAProxy 是一个使用 C 语言编写的开源软件，作者是 Willy Tarreau，其提供高可用性、负载均衡等特性，以及基于 TCP(四层) 和 HTTP(七层) 的应用程序代理。功能包括提供基于 cookie 的持久性、基于内容的交互、过载保护的高级流量管理、自动故障切换等。官网：http://www.haproxy.org。</p><p>HAProxy 实现了基于事件驱动的单进程模型，这是其高性能的根本原因。相比于多进程或者多线程模型在并发上的限制，比如内存资源限制、系统调度器限制、锁竞争等，HAProxy 的单进程模型具有天然的优势。同时结合事件驱动模型，可以在用户空间更高效的处理网络请求。</p><p>HAProxy 特别适用于那些负载特大的web站点，比如 github、stackoverflow 等网站就是使用了 HAProxy。这些站点通常又需要会话保持或七层处理。HAProxy运行在当前的硬件上，完全可以支持数以万计的并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中， 同时可以保护你的web服务器不被暴露到网络上。</p><h4 id="haproxy-使用" tabindex="-1"><a class="header-anchor" href="#haproxy-使用" aria-hidden="true">#</a> HAProxy 使用</h4><p>在部署 HAProxy 的镜像之前，我们先手动安装一下看看如何使用。在 CentOS 系统安装比较简单。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@xxx ~<span class="token punctuation">]</span><span class="token comment"># yum install haproxy</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认配置在 <code>/etc/haproxy/haproxy.cfg</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Example configuration for a possible web application.  See the</span>
<span class="token comment"># full configuration options online.</span>
<span class="token comment">#</span>
<span class="token comment">#   http://haproxy.1wt.eu/download/1.4/doc/configuration.txt</span>
<span class="token comment">#</span>
<span class="token comment">#---------------------------------------------------------------------</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># Global settings</span>
<span class="token comment">#---------------------------------------------------------------------</span>
global
    <span class="token comment"># to have these messages end up in /var/log/haproxy.log you will</span>
    <span class="token comment"># need to:</span>
    <span class="token comment">#</span>
    <span class="token comment"># 1) configure syslog to accept network log events.  This is done</span>
    <span class="token comment">#    by adding the &#39;-r&#39; option to the SYSLOGD_OPTIONS in</span>
    <span class="token comment">#    /etc/sysconfig/syslog</span>
    <span class="token comment">#</span>
    <span class="token comment"># 2) configure local2 events to go to the /var/log/haproxy.log</span>
    <span class="token comment">#   file. A line like the following can be added to</span>
    <span class="token comment">#   /etc/sysconfig/syslog</span>
    <span class="token comment">#</span>
    <span class="token comment">#    local2.*                       /var/log/haproxy.log</span>
    <span class="token comment">#</span>
    log         <span class="token number">127.0</span>.0.1 local2

    <span class="token function">chroot</span>      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     <span class="token number">4000</span>
    user        haproxy
    group       haproxy
    daemon

    <span class="token comment"># turn on stats unix socket</span>
    stats socket /var/lib/haproxy/stats

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># common defaults that all the &#39;listen&#39; and &#39;backend&#39; sections will</span>
<span class="token comment"># use if not designated in their block</span>
<span class="token comment">#---------------------------------------------------------------------</span>
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except <span class="token number">127.0</span>.0.0/8
    option                  redispatch
    retries                 <span class="token number">3</span>
    <span class="token function">timeout</span> http-request    10s
    <span class="token function">timeout</span> queue           1m
    <span class="token function">timeout</span> connect         10s
    <span class="token function">timeout</span> client          1m
    <span class="token function">timeout</span> server          1m
    <span class="token function">timeout</span> http-keep-alive 10s
    <span class="token function">timeout</span> check           10s
    maxconn                 <span class="token number">3000</span>

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># main frontend which proxys to the backends</span>
<span class="token comment">#---------------------------------------------------------------------</span>
frontend  main *:5000
    acl url_static       path_beg       <span class="token parameter variable">-i</span> /static /images /javascript /stylesheets
    acl url_static       path_end       <span class="token parameter variable">-i</span> .jpg .gif .png .css .js

    use_backend static          <span class="token keyword">if</span> url_static
    default_backend             app

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># static backend for serving up images, stylesheets and such</span>
<span class="token comment">#---------------------------------------------------------------------</span>
backend static
    balance     roundrobin
    server      static <span class="token number">127.0</span>.0.1:4331 check

<span class="token comment">#---------------------------------------------------------------------</span>
<span class="token comment"># round robin balancing between the various backends</span>
<span class="token comment">#---------------------------------------------------------------------</span>
backend app
    balance     roundrobin
    server  app1 <span class="token number">127.0</span>.0.1:5001 check
    server  app2 <span class="token number">127.0</span>.0.1:5002 check
    server  app3 <span class="token number">127.0</span>.0.1:5003 check
    server  app4 <span class="token number">127.0</span>.0.1:5004 check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来简单看一下其中几个配置：</p><ul><li>global： <ul><li>log: 日志输出配置，所有日志都记录在本机，通过 local2 输出；</li><li>chroot：改变当前工作目录至 /var/lib/haproxy；</li><li>pidfile：进程的 pid 文件。很多软件设计都通过判断 pid 文件存在来判断进程是不是还在；</li><li>maxconn：最大连接数；</li><li>user：进程运行的用户，haproxy；</li><li>group：进程运行的用户组，haproxy；</li><li>daemon：以后台形式运行 HAProxy。</li></ul></li><li>defaults <ul><li>mode：设置启动实例的协议类型，支持 tcp/http；</li><li>log：沿用 global 里面的配置；</li><li>option dontlognull：不记录上级负载均衡发送过来的用于检测状态没有数据的心跳包；</li><li>option redispatch：当 serverId 对应的服务器挂掉后，强制定向到其他健康的服务器；</li><li>retries 3：重试 3 次连接失败就认为服务器不可用；</li><li>maxconn 3000：最大连接数；</li><li>timeout connect：连接超时时间；</li><li>timeout client：客户端连接超时时间；</li><li>timeout server：服务端连接超时时间。</li></ul></li></ul><p>剩下的默认配置暂时先不看了，聚焦一下核心问题，我们要用 HAProxy 来代理我们的服务，应该怎么增加我们的配置项呢？只需要在配置文件的结尾添加 <code>listen</code> 即可。下面是一个简单的例子，这块等我们的 Web 应用部署之后我们再来补充。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>listen http-server <span class="token number">0.0</span>.0.0:8080
		stats <span class="token builtin class-name">enable</span>
		stats uri	/xxx
				server server1 xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-web-app" tabindex="-1"><a class="header-anchor" href="#_3-web-app" aria-hidden="true">#</a> 3. Web APP</h2><p>我们这里实现一个基于 Flask 的 Web 应用对 Redis 实现读写。主要要实现三个功能：</p><ol><li>redis 连接；</li><li>提供一个 route set 实现对 redis 中的值进行设置；</li><li>提供一个 route get 实现对 redis 中的值进行查询。</li></ol><h5 id="redis-连接" tabindex="-1"><a class="header-anchor" href="#redis-连接" aria-hidden="true">#</a> redis 连接</h5><p>redis 连接，我们直接使用 Python 的依赖库 Redis。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> redis

redis_client <span class="token operator">=</span> redis<span class="token punctuation">.</span>Redis<span class="token punctuation">(</span>host<span class="token operator">=</span>redis_host<span class="token punctuation">,</span> port<span class="token operator">=</span>redis_port<span class="token punctuation">,</span> db<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中连接 Redis 需要使用三个参数：</p><ul><li>host: redis 的 host</li><li>port: redis 的端口</li><li>db：redis 中的数据库，我们使用 db = 0 即可。</li></ul><p>这里的一个核心问题是 redis 运行在另外一个 Docker 中，那我们在应用的 Docker 中如何知道 redis 的 host 呢？在 Docker 技术中我们可以在启动 Docker 的时候指定参数 --link 将两个 Docker 的网络进行打通。在下面部署的时候我们再细说。</p><h5 id="set-route" tabindex="-1"><a class="header-anchor" href="#set-route" aria-hidden="true">#</a> set route</h5><p>编写一个 route，可以对 redis 进行写入。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/set&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    key <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span>
    value <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span>
    redis_client<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&#39;OK. We have set &#39;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&#39; to be &#39;</span> <span class="token operator">+</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 request.args 中可以获取到 url 中的参数。但是上面的代码没有做参数校验，key 和 value 可能是空，我们加一个参数校验的逻辑。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/set&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    key <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span>
    value <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> key <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">or</span> value <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&#39;OOps, the key or value is NULL&#39;</span>
    redis_client<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&#39;OK. We have set &#39;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&#39; to be &#39;</span> <span class="token operator">+</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="get-route" tabindex="-1"><a class="header-anchor" href="#get-route" aria-hidden="true">#</a> get route</h5><p>编写一个 route 对 redis 中的值查询</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/get&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    key <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> key <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&#39;OOps, the key is null&#39;</span>
    value <span class="token operator">=</span> redis_client<span class="token punctuation">.</span>get<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们的 web 应用代码编写完成，完整的代码如下，其中 redis-host 现在还是一个 placehold，我们部署的时候会把这个变量注入进来。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask<span class="token punctuation">,</span> request
<span class="token keyword">import</span> redis

redis_client <span class="token operator">=</span> redis<span class="token punctuation">.</span>Redis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;redis-host&#39;</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">,</span> db<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/set&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    key <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
    value <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> key <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">or</span> value <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&#39;OOps, the key or value is NULL&#39;</span>
    redis_client<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&#39;OK. We have set &#39;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&#39; to be &#39;</span> <span class="token operator">+</span> value

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/get&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    key <span class="token operator">=</span> request<span class="token punctuation">.</span>args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> key <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&#39;OOps, the key is null&#39;</span>
    value <span class="token operator">=</span> redis_client<span class="token punctuation">.</span>get<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面编写 Dockerfile。</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">from</span> python:3</span>

<span class="token instruction"><span class="token keyword">RUN</span> pip install flask</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir /data</span>

<span class="token instruction"><span class="token keyword">COPY</span> hello.py /data/</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /data</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 5000</span>
<span class="token instruction"><span class="token keyword">ENV</span> FLASK_APP=/data/hello.py</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;flask&quot;</span>, <span class="token string">&quot;run&quot;</span>, <span class="token string">&quot;-h&quot;</span>, <span class="token string">&quot;0.0.0.0&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过 <code>docker build</code> 来构建我们的应用，由于提前没有拉取依赖镜像，并且要在镜像中安装一些依赖包，所以 build 时间会略久一点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@ixxxZ imooc<span class="token punctuation">]</span><span class="token comment"># docker build -t web:v1 .</span>
Sending build context to Docker daemon  <span class="token number">3</span>.584kB
Step <span class="token number">1</span>/9 <span class="token builtin class-name">:</span> from python:3
<span class="token number">3</span>: Pulling from library/python
e9afc4f90ab0: Pull complete
989e6b19a265: Pull complete
af14b6c2f878: Pull complete
5573c4b30949: Pull complete
11a88e764313: Pull complete
ee776f0e36af: Pull complete
513c90a1afc3: Pull complete
df9b9e95bdb9: Pull complete
86c9edb54464: Pull complete
Digest: sha256:dd6cd8191ccbced2a6af5d0ddb51e6057c1444df14e14bcfd5c7b3ef78738050
Status: Downloaded newer image <span class="token keyword">for</span> python:3
 ---<span class="token operator">&gt;</span> 7f5b6ccd03e9
Step <span class="token number">2</span>/9 <span class="token builtin class-name">:</span> RUN pip <span class="token function">install</span> flask
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 2d701068e85b
Collecting flask
  Downloading Flask-1.1.2-py2.py3-none-any.whl <span class="token punctuation">(</span><span class="token number">94</span> kB<span class="token punctuation">)</span>
Collecting Jinja<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token operator">=</span><span class="token number">2.10</span>.1
  Downloading Jinja2-2.11.2-py2.py3-none-any.whl <span class="token punctuation">(</span><span class="token number">125</span> kB<span class="token punctuation">)</span>
Collecting click<span class="token operator">&gt;=</span><span class="token number">5.1</span>
  Downloading click-7.1.2-py2.py3-none-any.whl <span class="token punctuation">(</span><span class="token number">82</span> kB<span class="token punctuation">)</span>
Collecting itsdangerous<span class="token operator">&gt;=</span><span class="token number">0.24</span>
  Downloading itsdangerous-1.1.0-py2.py3-none-any.whl <span class="token punctuation">(</span><span class="token number">16</span> kB<span class="token punctuation">)</span>
Collecting Werkzeug<span class="token operator">&gt;=</span><span class="token number">0.15</span>
  Downloading Werkzeug-1.0.1-py2.py3-none-any.whl <span class="token punctuation">(</span><span class="token number">298</span> kB<span class="token punctuation">)</span>
Collecting MarkupSafe<span class="token operator">&gt;=</span><span class="token number">0.23</span>
  Downloading MarkupSafe-1.1.1-cp38-cp38-manylinux1_x86_64.whl <span class="token punctuation">(</span><span class="token number">32</span> kB<span class="token punctuation">)</span>
Installing collected packages: MarkupSafe, Jinja2, click, itsdangerous, Werkzeug, flask
Successfully installed Jinja2-2.11.2 MarkupSafe-1.1.1 Werkzeug-1.0.1 click-7.1.2 flask-1.1.2 itsdangerous-1.1.0
Removing intermediate container 2d701068e85b
 ---<span class="token operator">&gt;</span> 40586a8d8950
Step <span class="token number">3</span>/9 <span class="token builtin class-name">:</span> RUN pip <span class="token function">install</span> redis
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> cff9c96c09f2
Collecting redis
  Downloading redis-3.5.3-py2.py3-none-any.whl <span class="token punctuation">(</span><span class="token number">72</span> kB<span class="token punctuation">)</span>
Installing collected packages: redis
Successfully installed redis-3.5.3
Removing intermediate container cff9c96c09f2
 ---<span class="token operator">&gt;</span> f295e0ec8e7e
Step <span class="token number">4</span>/9 <span class="token builtin class-name">:</span> RUN <span class="token function">mkdir</span> /data
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 359538e774ec
Removing intermediate container 359538e774ec
 ---<span class="token operator">&gt;</span> 35935e5e1ba9
Step <span class="token number">5</span>/9 <span class="token builtin class-name">:</span> COPY hello.py /data/
 ---<span class="token operator">&gt;</span> 509d00b301f4
Step <span class="token number">6</span>/9 <span class="token builtin class-name">:</span> WORKDIR /data
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 95d6e233a897
Removing intermediate container 95d6e233a897
 ---<span class="token operator">&gt;</span> 231b90724d66
Step <span class="token number">7</span>/9 <span class="token builtin class-name">:</span> EXPOSE <span class="token number">5000</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 56c9c364235a
Removing intermediate container 56c9c364235a
 ---<span class="token operator">&gt;</span> 773eae476c98
Step <span class="token number">8</span>/9 <span class="token builtin class-name">:</span> ENV <span class="token assign-left variable">FLASK_APP</span><span class="token operator">=</span>/data/hello.py
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> e8a326d03937
Removing intermediate container e8a326d03937
 ---<span class="token operator">&gt;</span> a1bdaa647811
Step <span class="token number">9</span>/9 <span class="token builtin class-name">:</span> ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;flask&quot;</span>, <span class="token string">&quot;run&quot;</span>, <span class="token string">&quot;-h&quot;</span>, <span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 2fec7d6c8628
Removing intermediate container 2fec7d6c8628
 ---<span class="token operator">&gt;</span> 4124bbaadf14
Successfully built 4124bbaadf14
Successfully tagged web:v1
<span class="token punctuation">[</span>root@ixxxZ imooc<span class="token punctuation">]</span><span class="token comment"># docker images</span>
REPOSITORY                                                                TAG                          IMAGE ID            CREATED             SIZE
web                                                                       v1                           4124bbaadf14        <span class="token number">21</span> seconds ago      944MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动的时候可以通过 <code>--link</code> 指定 redis 的地址，类似下面这样。由于我们的 redis 服务还没有部署起来，所以这里是跑不起来的，我们先来部署一下 redis 集群。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token parameter variable">--link</span> redis-test:redis-host <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web web:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-redis-cluster" tabindex="-1"><a class="header-anchor" href="#_4-redis-cluster" aria-hidden="true">#</a> 4. Redis Cluster</h2><p>我们这里要构建一个 Redis 集群，需要修改 Redis 镜像里面的配置，为了方便操作，这里我们先启动容器，设置 entrypoint 为 /bin/bash，然后修改配置，最后手动启动 Redis 实例。</p><h4 id="redis-master" tabindex="-1"><a class="header-anchor" href="#redis-master" aria-hidden="true">#</a> Redis Master</h4><p>先拉去 Redis 镜像，然后先启动 Redis Master 实例。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> redis-master redis /bin/bash
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Redis 的镜像默认没有配置文件，但是我们可以通过 Volume 的方式映射进去。通过命令 <code>docker inspect &lt;container-id&gt;</code> ，我们可以看到容器挂载的 Volume。如下所示，宿主机目录：<code>/var/lib/docker/volumes/d51e68c64fea7241eb5d036ac2f6be3df3af8df982d59694bbccd48f339be42e/_data</code> ，容器内目录：<code>/data</code> 。也就是说我们在宿主机目录下创建的文件都会映射到容器内的 <code>/data</code> 目录下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;volume&quot;</span>,
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;d51e68c64fea7241eb5d036ac2f6be3df3af8df982d59694bbccd48f339be42e&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/d51e68c64fea7241eb5d036ac2f6be3df3af8df982d59694bbccd48f339be42e/_data&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/data&quot;</span>,
                <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个用于 redis 启动的配置文件 redis.conf，如果是默认安装的 redis，只需要修改其中几个字段即可：</p><ul><li>daemonize 从 no 改成 yes；</li><li>logfile 改成 /data/redis.log；</li><li>dir 改成 /var/lib/redis，需要手动创建该目录；</li><li>bind 到 0.0.0.0，默认是 127.0.0.1。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0
protected-mode <span class="token function">yes</span>
port <span class="token number">6379</span>
tcp-backlog <span class="token number">511</span>
<span class="token function">timeout</span> <span class="token number">0</span>
tcp-keepalive <span class="token number">300</span>
supervised no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile /data/redis.log
databases <span class="token number">16</span>
save <span class="token number">900</span> <span class="token number">1</span>
save <span class="token number">300</span> <span class="token number">10</span>
save <span class="token number">60</span> <span class="token number">10000</span>
stop-writes-on-bgsave-error <span class="token function">yes</span>
rdbcompression <span class="token function">yes</span>
rdbchecksum <span class="token function">yes</span>
dbfilename dump.rdb
<span class="token function">dir</span> /var/lib/redis
slave-serve-stale-data <span class="token function">yes</span>
slave-read-only <span class="token function">yes</span>
repl-diskless-sync no
repl-diskless-sync-delay <span class="token number">5</span>
repl-disable-tcp-nodelay no
slave-priority <span class="token number">100</span>
appendonly no
appendfilename <span class="token string">&quot;appendonly.aof&quot;</span>
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage <span class="token number">100</span>
auto-aof-rewrite-min-size 64mb
aof-load-truncated <span class="token function">yes</span>
lua-time-limit <span class="token number">5000</span>
slowlog-log-slower-than <span class="token number">10000</span>
slowlog-max-len <span class="token number">128</span>
latency-monitor-threshold <span class="token number">0</span>
notify-keyspace-events <span class="token string">&quot;&quot;</span>
hash-max-ziplist-entries <span class="token number">512</span>
hash-max-ziplist-value <span class="token number">64</span>
list-max-ziplist-size <span class="token parameter variable">-2</span>
list-compress-depth <span class="token number">0</span>
set-max-intset-entries <span class="token number">512</span>
zset-max-ziplist-entries <span class="token number">128</span>
zset-max-ziplist-value <span class="token number">64</span>
hll-sparse-max-bytes <span class="token number">3000</span>
activerehashing <span class="token function">yes</span>
client-output-buffer-limit normal <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span>
client-output-buffer-limit slave 256mb 64mb <span class="token number">60</span>
client-output-buffer-limit pubsub 32mb 8mb <span class="token number">60</span>
hz <span class="token number">10</span>
aof-rewrite-incremental-fsync <span class="token function">yes</span>
daemonize <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改完配置之后，我们通过下面的命令启动 redis master</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># cd /usr/local/bin
# redis-server /data/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以在容器中启动 redis cli 来验证一下 redis server 是否启动成功。下面就表示 redis-master 启动成功了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@b8d2918d3f73:/usr/local/bin<span class="token comment"># redis-cli</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> abc <span class="token number">123</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get abc
<span class="token string">&quot;123&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="redis-slave" tabindex="-1"><a class="header-anchor" href="#redis-slave" aria-hidden="true">#</a> Redis Slave</h4><p>我们下面启动两个 Redis Slave。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># docker run -ti --name redis-salve2 --link redis-master:master redis /bin/bash</span>
<span class="token comment"># docker run -ti --name redis-salve2 --link redis-master:master redis /bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是启动命令中的 <code>--link</code> 参数，表示将该容器加入到名字为 redis-master 的容器的网络空间，其实就是加入到同一个 network namespace，同时 redis-master 映射到新的 redis 从容器的名字为 master。</p><p>我们下面像修改 redis master 的配置文件一样，通过 Volume 的方式将我们之前的 redis 配置文件拷贝进去，并做如下修改：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>daemonize <span class="token function">yes</span>
slaveof master <span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后一行的 slave 配置表示该 redis 实例为运行在 master:6379 （master 会转换为 ip）的 redis master 的 slave 节点。修改完配置别忘记创建目录配置中的 /var/lib/redis。剩下的启动操作、通过 redis-cli 验证和 redis master 一样。</p><h2 id="_5-应用部署构建" tabindex="-1"><a class="header-anchor" href="#_5-应用部署构建" aria-hidden="true">#</a> 5. 应用部署构建</h2><p>现在 Redis 集群已经创建完成了，我们开始启动我们的 web 应用容器，启动两个 web 应用容器。我们先把 web 端口映射到宿主机。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># docker run -p 5001:5000 --link redis-master:redis-host -d --name web-app1 web:v1</span>
<span class="token comment"># docker run -p 5002:5000 --link redis-master:redis-host -d --name web-app2 web:v1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>两个 web 应用容器分别映射到宿主机的 5001 和 5002 端口。下面我们通过 http 请求来验证一下。</p><p>通过 web-app1 设置一个 key。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&quot;localhost:5001/set?key=imooc&amp;value=imooc.com&quot;</span>
OK. We have <span class="token builtin class-name">set</span> imooc to be imooc.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 web-app2 获取该 Key 的值。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&quot;localhost:5002/get?key=imooc&quot;</span>
imooc.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是为了演示所以将端口映射出来了，实际上端口是没有必要映射出来的。我们将这两个容器停止然后用下面的命令重启一下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">--link</span> redis-master:redis-host <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web-app1 web:v1
$ <span class="token function">docker</span> run <span class="token parameter variable">--link</span> redis-master:redis-host <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web-app2 web:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在解决一下之前一个悬而未决的问题，HAProxy。通过下面的命令参数启动 HAProxy，主要是将两个 web app 的 host 映射进去。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> HAProxy <span class="token parameter variable">--link</span> web-app1:app1 <span class="token parameter variable">--link</span> web-app2:app2 <span class="token parameter variable">-p</span> <span class="token number">6301</span>:6301 <span class="token parameter variable">-v</span> /tmp:/data haproxy /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>细心的同学肯定注意到了我们这里不仅做了宿主机的端口映射还做了数据卷映射 <code>-v /tmp:/data</code> ，这是为了拷贝配置文件。我们修改的配置文件如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>global
    log         <span class="token number">127.0</span>.0.1 local2

    <span class="token function">chroot</span>      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     <span class="token number">4000</span>
    daemon

defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except <span class="token number">127.0</span>.0.0/8
    option                  redispatch
    retries                 <span class="token number">3</span>
    <span class="token function">timeout</span> http-request    10s
    <span class="token function">timeout</span> queue           1m
    <span class="token function">timeout</span> connect         10s
    <span class="token function">timeout</span> client          1m
    <span class="token function">timeout</span> server          1m
    <span class="token function">timeout</span> http-keep-alive 10s
    <span class="token function">timeout</span> check           10s
    maxconn                 <span class="token number">3000</span>

listen webapp
    <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:6301
    stats <span class="token builtin class-name">enable</span>
    stats uri /web-app
        server app1 app1:5000 check inter <span class="token number">2000</span> rise <span class="token number">2</span> fall <span class="token number">5</span>	<span class="token comment">#均衡节点</span>
        server app2 app2:5000 check inter <span class="token number">2000</span> rise <span class="token number">2</span> fall <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的配置文件中有几个需要注意的地方：</p><ol><li>chroot 的目录必须保证是存在的，不如会报 chroot 失败；</li><li>listen 的 bind 参数要写在新的一行，这个应该是新版本的 HAProxy 的参数解析发生的变化；</li></ol><p>我们下面来验证一下。我们将之前请求的 web server 的端口由 5001 改成 HAProxy 映射出来的端口 6301，然后发现 it works！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&quot;localhost:6301/get?key=imooc&quot;</span>
imooc.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结" aria-hidden="true">#</a> 6. 总结</h2><p>本文从实践的角度使用 HAProxy + Web APP + Redis Cluster 构建了一个高可用的服务，虽然这里都是在一个 host 上演示的，但是表达的意思都是一样的。</p><p>本文所有的示例和代码片段都经过实测是可以运行的，运行的操作系统版本如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># lsb_release -a</span>
LSB Version:	:core-4.1-amd64:core-4.1-noarch
Distributor ID:	CentOS
Description:	CentOS Linux release <span class="token number">7.6</span>.1810 <span class="token punctuation">(</span>Core<span class="token punctuation">)</span>
Release:	<span class="token number">7.6</span>.1810
Codename:	Core
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行的 Docker 版本如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># docker --version</span>
Docker version <span class="token number">18.09</span>.2, build <span class="token number">6247962</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,93),o=[p];function c(r,d){return s(),a("div",null,o)}const v=n(t,[["render",c],["__file","index-28.html.vue"]]);export{v as default};
