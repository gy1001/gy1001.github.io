# 03-实战-歌词滚动效果

## 准备数据部分

```js
// data/data.js 歌词部分：注意此处歌词与音频不是很匹配，所以我在 js 逻辑中增加了一定的时间错位处理
const data = `[00:02.92]夜曲
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
[03:44.72]`
```

```html
<audio src="audio.mp3" src="./assets/夜曲.mp3" preload="none" controls loop>
  你的浏览器不支持 audio 标签。
</audio>
```

## html 部分

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    html {
      width: 100%;
    }
    body {
      background-color: black;
      color: #666;
      text-align: center;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    ul,
    li,
    body,
    html {
      margin: 0;
      padding: 0;
    }
    audio {
      width: 90%;
      margin-bottom: 20px;
      margin: 40px 0;
    }
    div.container {
      width: 100%;
      flex: 2;
      margin: 0 auto;
      box-sizing: border-box;
      overflow: hidden;
    }
    div.container .lrc-list {
      transition: all 0.3s;
    }
    ul.lrc-list li {
      height: 40px;
      line-height: 40px;
      list-style: none;
      white-space: nowrap;
      transition: all 0.3s;
    }
    ul.lrc-list li.active {
      color: white;
      transform: scale(1.5);
    }
  </style>
  <body>
    <audio autoplay loop controls src="./data/夜曲.mp3"></audio>
    <div class="container">
      <ul class="lrc-list"></ul>
    </div>
  </body>
  <script src="./data/data.js"></script>
  <script src="./index.js"></script>
</html>
```

## JavaScript 部分

大致思路如下

* 根据歌词，得出数组对象：包含对应的时间、单词

* 根据数组对象，渲染至页面中

* 根据音频播放时间，得出当前需要高亮的行，进行高亮、放大（使用动画）

* 根据高亮的行，算出 list 容易需要滚动的距离，注意边界

  > 滚动的距离 = 当前高亮的行 之前的所有行的高度 + 行的一半 - container 容器高度的一半
  >
  > 滚动的最大距离 = list 容器的高度 - container 容器的高度

  * 如果滚动距离 < 0, 滚动距离为 0 即可
  * 如果滚动距离 > 可滚动的最大距离，滚动距离 = 最大距离
  * 其他，滚动距离 就是按照上述公式算出类的距离

```javascript
function parseLrc(string) {
  const arr = string.split('\n')
  const result = []
  arr.forEach((item) => {
    const itemArr = item.split(']')
    result.push({
      time: parseTime(itemArr[0].slice(1)),
      text: itemArr[1],
    })
  })
  return result
}

function parseTime(timeStr) {
  const arr = timeStr.split(':')
  return Number(arr[0] * 60) + Number(arr[1])
}

function findActiveIndex(time) {
  for (let index = 0; index < arr.length; index++) {
    const elStr = arr[index]
    //  注意：这里歌词与音频不是很同步，歌词延后了 2.5s 这里进行增加
    if (elStr.time > time + 2.5) {
      return index - 1
    }
  }
  // 如果都没有，那就是最后一行
  return arr.length - 1
}

function formatLrcToContainer() {
  const fragment = new DocumentFragment()
  arr.forEach((item) => {
    const elItem = document.createElement('li')
    elItem.textContent = item.text
    fragment.appendChild(elItem)
  })
  doms.lrcListEl.appendChild(fragment)
}

function toggleActiveClass(currentTime) {
  const activeIndex = findActiveIndex(currentTime)
  const active = document.querySelector('li.active')
  if (active) {
    active.classList.remove('active')
  }
  const currentActiveEl = doms.lrcListEl.children[activeIndex]
  if (currentActiveEl) {
    currentActiveEl.classList.add('active')
  }
}

//  渲染歌词
const arr = parseLrc(data)
const doms = {
  container: document.querySelector('.container'),
  lrcListEl: document.querySelector('.container .lrc-list'),
  audio: document.querySelector('audio'),
}
formatLrcToContainer()

const containerHeight = doms.container.clientHeight
const liElHeight = doms.lrcListEl.children[0].clientHeight
// 最大偏移量
const maxOffset = doms.lrcListEl.clientHeight - containerHeight

function scrollToOffset() {
  const currentTime = doms.audio.currentTime
  toggleActiveClass(currentTime)
  const activeIndex = findActiveIndex(currentTime)
  let calcOffsetTop =
    activeIndex * liElHeight + liElHeight * 0.5 - containerHeight * 0.5
  if (calcOffsetTop < 0) {
    calcOffsetTop = 0
  }
  if (calcOffsetTop > maxOffset) {
    calcOffsetTop = maxOffset
  }
  doms.lrcListEl.style.transform = `translateY(-${calcOffsetTop}px)`
}

doms.audio.addEventListener('timeupdate', scrollToOffset)
```

