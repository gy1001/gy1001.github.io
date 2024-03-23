import{_ as n,p as s,q as a,a1 as t}from"./framework-e8cb8151.js";const p={},e=t(`<h1 id="_03-实战-歌词滚动效果" tabindex="-1"><a class="header-anchor" href="#_03-实战-歌词滚动效果" aria-hidden="true">#</a> 03-实战-歌词滚动效果</h1><h2 id="准备数据部分" tabindex="-1"><a class="header-anchor" href="#准备数据部分" aria-hidden="true">#</a> 准备数据部分</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// data/data.js 歌词部分：注意此处歌词与音频不是很匹配，所以我在 js 逻辑中增加了一定的时间错位处理</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">[00:02.92]夜曲
[00:04.92]作词:方文山
[00:06.92]作曲:周杰伦
[00:09.97]演唱:周杰伦
[00:24.92]一群嗜血的蚂蚁 被腐肉所吸引
[00:27.67]我面无表情 看孤独的风景
[00:30.43]失去你 爱恨开始分明
[00:33.23]失去你 还有什么事好关心
[00:35.93]当鸽子不再象征和平
[00:38.24]我终于被提醒
[00:39.59]广场上喂食的是秃鹰
[00:41.59]我用漂亮的押韵
[00:43.09]形容被掠夺一空的爱情
[00:45.59]
[00:46.95]啊 乌云开始遮蔽 夜色不干净
[00:49.40]公园里 葬礼的回音 在漫天飞行
[00:52.30]送你的 白色玫瑰
[00:53.86]在纯黑的环境凋零
[00:55.41]乌鸦在树枝上诡异的很安静
[00:57.91]静静听 我黑色的大衣
[01:00.01]想温暖你 日渐冰冷的回忆
[01:02.41]走过的 走过的 生命
[01:03.87]啊 四周弥漫雾气
[01:05.12]我在空旷的墓地
[01:06.42]老去后还爱你
[01:09.07]为你弹奏萧邦的夜曲
[01:11.77]纪念我死去的爱情
[01:14.72]跟夜风一样的声音
[01:17.32]心碎的很好听
[01:20.08]手在键盘敲很轻
[01:22.88]我给的思念很小心
[01:25.64]你埋葬的地方叫幽冥
[01:29.09]
[01:30.29]为你弹奏萧邦的夜曲
[01:33.89]纪念我死去的爱情
[01:36.70]而我为你隐姓埋名
[01:39.41]在月光下弹琴
[01:42.06]对你心跳的感应
[01:44.96]还是如此温热亲近
[01:47.82]怀念你那鲜红的唇印
[01:51.12]
[02:15.30]那些断翅的蜻蜓 散落在这森林
[02:18.05]而我的眼睛 没有丝毫同情
[02:20.91]失去你 泪水混浊不清
[02:23.66]失去你 我连笑容都有阴影
[02:26.41]风在长满青苔的屋顶
[02:28.51]嘲笑我的伤心
[02:29.76]像一口没有水的枯井
[02:31.77]我用凄美的字型
[02:33.42]描绘后悔莫及的那爱情
[02:37.22]为你弹奏萧邦的夜曲
[02:40.07]纪念我死去的爱情
[02:42.82]跟夜风一样的声音
[02:45.63]心碎的很好听
[02:48.33]手在键盘敲很轻
[02:51.08]我给的思念很小心
[02:53.88]你埋葬的地方叫幽冥
[02:57.03]
[02:58.58]为你弹奏萧邦的夜曲
[03:02.19]纪念我死去的爱情
[03:04.89]而我为你隐姓埋名 在月光下弹琴
[03:10.39]对你心跳的感应 还是如此温热亲近
[03:16.04]怀念你那鲜红的唇印
[03:19.15]
[03:21.55]一群嗜血的蚂蚁 被腐肉所吸引
[03:24.30]我面无表情 看孤独的风景
[03:27.20]失去你 爱恨开始分明
[03:29.80]失去你 还有什么事好关心
[03:32.51]当鸽子不再象征和平
[03:34.51]我终于被提醒
[03:35.91]广场上喂食的是秃鹰
[03:38.11]我用漂亮的押韵
[03:39.72]形容被掠夺一空的爱情
[03:44.72]</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>audio</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>audio.mp3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./assets/夜曲.mp3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">preload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>none<span class="token punctuation">&quot;</span></span> <span class="token attr-name">controls</span> <span class="token attr-name">loop</span><span class="token punctuation">&gt;</span></span>
  你的浏览器不支持 audio 标签。
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>audio</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="html-部分" tabindex="-1"><a class="header-anchor" href="#html-部分" aria-hidden="true">#</a> html 部分</h2><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    <span class="token selector">html</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">body</span> <span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #666<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
      <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
      <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
      <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">ul,
    li,
    body,
    html</span> <span class="token punctuation">{</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">audio</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 90%<span class="token punctuation">;</span>
      <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 40px 0<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">div.container</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
      <span class="token property">flex</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">div.container .lrc-list</span> <span class="token punctuation">{</span>
      <span class="token property">transition</span><span class="token punctuation">:</span> all 0.3s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">ul.lrc-list li</span> <span class="token punctuation">{</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
      <span class="token property">transition</span><span class="token punctuation">:</span> all 0.3s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">ul.lrc-list li.active</span> <span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>audio</span> <span class="token attr-name">autoplay</span> <span class="token attr-name">loop</span> <span class="token attr-name">controls</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./data/夜曲.mp3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>audio</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>lrc-list<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./data/data.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./index.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="javascript-部分" tabindex="-1"><a class="header-anchor" href="#javascript-部分" aria-hidden="true">#</a> JavaScript 部分</h2><p>大致思路如下</p><ul><li><p>根据歌词，得出数组对象：包含对应的时间、单词</p></li><li><p>根据数组对象，渲染至页面中</p></li><li><p>根据音频播放时间，得出当前需要高亮的行，进行高亮、放大（使用动画）</p></li><li><p>根据高亮的行，算出 list 容易需要滚动的距离，注意边界</p><blockquote><p>滚动的距离 = 当前高亮的行 之前的所有行的高度 + 行的一半 - container 容器高度的一半</p><p>滚动的最大距离 = list 容器的高度 - container 容器的高度</p></blockquote><ul><li>如果滚动距离 &lt; 0, 滚动距离为 0 即可</li><li>如果滚动距离 &gt; 可滚动的最大距离，滚动距离 = 最大距离</li><li>其他，滚动距离 就是按照上述公式算出类的距离</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">parseLrc</span><span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> arr <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> itemArr <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;]&#39;</span><span class="token punctuation">)</span>
    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">time</span><span class="token operator">:</span> <span class="token function">parseTime</span><span class="token punctuation">(</span>itemArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">text</span><span class="token operator">:</span> itemArr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">parseTime</span><span class="token punctuation">(</span><span class="token parameter">timeStr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> arr <span class="token operator">=</span> timeStr<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token function">Number</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">Number</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">findActiveIndex</span><span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> elStr <span class="token operator">=</span> arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
    <span class="token comment">//  注意：这里歌词与音频不是很同步，歌词延后了 2.5s 这里进行增加</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>elStr<span class="token punctuation">.</span>time <span class="token operator">&gt;</span> time <span class="token operator">+</span> <span class="token number">2.5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> index <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果都没有，那就是最后一行</span>
  <span class="token keyword">return</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">formatLrcToContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> fragment <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> elItem <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
    elItem<span class="token punctuation">.</span>textContent <span class="token operator">=</span> item<span class="token punctuation">.</span>text
    fragment<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>elItem<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  doms<span class="token punctuation">.</span>lrcListEl<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>fragment<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">toggleActiveClass</span><span class="token punctuation">(</span><span class="token parameter">currentTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> activeIndex <span class="token operator">=</span> <span class="token function">findActiveIndex</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>
  <span class="token keyword">const</span> active <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;li.active&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    active<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> currentActiveEl <span class="token operator">=</span> doms<span class="token punctuation">.</span>lrcListEl<span class="token punctuation">.</span>children<span class="token punctuation">[</span>activeIndex<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>currentActiveEl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentActiveEl<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//  渲染歌词</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token function">parseLrc</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token keyword">const</span> doms <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">container</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.container&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lrcListEl</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.container .lrc-list&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">audio</span><span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;audio&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token function">formatLrcToContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> containerHeight <span class="token operator">=</span> doms<span class="token punctuation">.</span>container<span class="token punctuation">.</span>clientHeight
<span class="token keyword">const</span> liElHeight <span class="token operator">=</span> doms<span class="token punctuation">.</span>lrcListEl<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>clientHeight
<span class="token comment">// 最大偏移量</span>
<span class="token keyword">const</span> maxOffset <span class="token operator">=</span> doms<span class="token punctuation">.</span>lrcListEl<span class="token punctuation">.</span>clientHeight <span class="token operator">-</span> containerHeight

<span class="token keyword">function</span> <span class="token function">scrollToOffset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> currentTime <span class="token operator">=</span> doms<span class="token punctuation">.</span>audio<span class="token punctuation">.</span>currentTime
  <span class="token function">toggleActiveClass</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>
  <span class="token keyword">const</span> activeIndex <span class="token operator">=</span> <span class="token function">findActiveIndex</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>
  <span class="token keyword">let</span> calcOffsetTop <span class="token operator">=</span>
    activeIndex <span class="token operator">*</span> liElHeight <span class="token operator">+</span> liElHeight <span class="token operator">*</span> <span class="token number">0.5</span> <span class="token operator">-</span> containerHeight <span class="token operator">*</span> <span class="token number">0.5</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>calcOffsetTop <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    calcOffsetTop <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>calcOffsetTop <span class="token operator">&gt;</span> maxOffset<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    calcOffsetTop <span class="token operator">=</span> maxOffset
  <span class="token punctuation">}</span>
  doms<span class="token punctuation">.</span>lrcListEl<span class="token punctuation">.</span>style<span class="token punctuation">.</span>transform <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">translateY(-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>calcOffsetTop<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px)</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

doms<span class="token punctuation">.</span>audio<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;timeupdate&#39;</span><span class="token punctuation">,</span> scrollToOffset<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","index-03.html.vue"]]);export{r as default};
