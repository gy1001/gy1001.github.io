# 56-模块化实践案例二

一个页面的内容如何展示，往往需接口请求之后才能完全确认。

因此，大多数页面在默认时，都会展示一个 Loading 提示，或者是骨架展示。等到接口请求完成之后，再切换成想要展示的内容。

这是我们日常开发中最常见的需求。那么在没有 React/Vue 等框架的帮助下，我们如何能够方便快捷的做到展示内容的切换呢？

## 1-项目准备

首先，使用 create react app 创建一个项目。

本文的实例项目地址：[点击这里](https://github.com/yangbo5207/jsCore/tree/master/6.9模块化开发实例/zhihunew)

因为默认的 demo 中，有了自己的 DOM 渲染，因此我们需要清空他们。将 App.tsx 修改为如下即可

```javascript
import React from 'react'
function App() {
  return <div className='App'></div>
}

export default App
```

## 2-请求接口的工具模块

我们需要一个类似于 `axios.get` 或者 `$.get` 这样的方法，去请求接口。代码封装如下，该方法单独成为一个模块，

实践中，我们还要根据需求，扩展 post、put、delete 方法

```javascript
// src/request.ts
// 简易版，未考虑参数情况，请勿运用于实践
export function get<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const XHR = new XMLHttpRequest()
    XHR.open('GET', url, true)
    XHR.send()

    XHR.onreadystatechange = () => {
      if (XHR.readyState == 4) {
        if (XHR.status == 200) {
          try {
            resolve(JSON.parse(XHR.responseText))
          } catch (e) {
            reject(e)
          }
        } else {
          reject(new Error(XHR.statusText))
        }
      }
    }
  })
}
```

## 3-api 模块

实践项目中，有许多要从后端请求数据的接口。我们统一封装在一个模块里

```javascript
// src/api.ts
import { get } from './request'
import news, { Newspaper } from './data'

export function newsApi() {
  // 本来应该如此请求接口，但是由于跨域限制，因此我们这里模拟该接口的行为返回数据 mock
  // return get<any>('https://news-at.zhihu.com/api/4/news/latest')
  return (
    new Promise() <
    Newspaper >
    ((resolve) => {
      setTimeout(() => {
        resolve(news)
      }, 1000)
    })
  )
}

export function other1Api(url: string) {}

export function other2Api(url: string) {}

export function other3Api(url: string) {}

// 实践中可能还会有更多 api 请求
```

此处特殊的地方：由于跨域的限制，get 请求在开发中并不能请求成功。因此我们使用 mock 的方法模拟请求。

> 我们可以使用配置本地代理的方式来解决跨域问题。

因此这里会额外弄一个数据来源的模块

```javascript
// src/data.ts
export interface Story {
  ga_prefix: string,
  hint: string,
  id: number,
  image_hue: string,
  title: string,
  type: number,
  url: string
}

export interface TopStore extends Story {
  image: string
}

export interface ListStore extends Story {
  images: string[]
}

export interface Newspaper {
  date: string,
  stories: ListStore[]
  top_stories: TopStore[]
}

const news: Newspaper = {
  "date": "20210112",
  "stories": [
    { "image_hue": "0xb37b99", "title": "在儿童教育中该不该运用惩罚？怎么用？", "url": "https://daily.zhihu.com/story/9731933", "hint": "鸽子Gezi · 3 分钟阅读", "ga_prefix": "011207", "images": ["https://pic4.zhimg.com/v2-23d60782cb5b0b39698364438a24547b.jpg?source=8673f162"], "type": 0, "id": 9731933 },
    { "image_hue": "0x2f3964", "title": "中国不同城市的夜景都有哪些特色？", "url": "https://daily.zhihu.com/story/9731939", "hint": "星球研究所 · 8 分钟阅读", "ga_prefix": "011207", "images": ["https://pic1.zhimg.com/v2-c99ea0a523f595b142380603b7086a78.jpg?source=8673f162"], "type": 0, "id": 9731939 },
    { "image_hue": "0x0c729e", "title": "在游戏公司的音频部门工作是一种怎样的体验？", "url": "https://daily.zhihu.com/story/9731921", "hint": "腾讯天美工作室群 · 8 分钟阅读", "ga_prefix": "011207", "images": ["https://pic3.zhimg.com/v2-9013f69bfdf8c61b3232c43ee55971cb.jpg?source=8673f162"], "type": 0, "id": 9731921 },
    { "image_hue": "0x241e19", "title": "如果不得已要熬夜，怎么将熬夜的伤害减到最轻？", "url": "https://daily.zhihu.com/story/9731911", "hint": "浩浩耗 · 2 分钟阅读", "ga_prefix": "011207", "images": ["https://pic4.zhimg.com/v2-d327b0dcdabff3ad1121900dd26ec646.jpg?source=8673f162"], "type": 0, "id": 9731911 },
    { "image_hue": "0x342a18", "title": "哪双球鞋适合春节穿？", "url": "https://daily.zhihu.com/story/9731924", "hint": "Ricki · 6 分钟阅读", "ga_prefix": "011207", "images": ["https://pic2.zhimg.com/v2-388a92dae4d8c9fe3423ef2a02c25f06.jpg?source=8673f162"], "type": 0, "id": 9731924 },
    { "image_hue": "0x959199", "title": "瞎扯 · 如何正确地吐槽", "url": "https://daily.zhihu.com/story/9731914", "hint": "VOL.2569", "ga_prefix": "011206", "images": ["https://pic1.zhimg.com/v2-6e6a28ec3807dd74a29f4502c5bb25ce.jpg?source=8673f162"], "type": 0, "id": 9731914 }
  ],
  "top_stories": [
    { "image_hue": "0x45252b", "hint": "作者 / 混乱博物馆", "url": "https://daily.zhihu.com/story/9731891", "image": "https://pic1.zhimg.com/v2-ca39463c945a2d8decc21575a42edcf0.jpg?source=8673f162", "title": "人类可以只吃肉不吃菜吗？", "ga_prefix": "011107", "type": 0, "id": 9731891 },
    { "image_hue": "0x402d39", "hint": "作者 / Justin Lee", "url": "https://daily.zhihu.com/story/9731821", "image": "https://pic2.zhimg.com/v2-41051830be11f2cecb10dad435d67f40.jpg?source=8673f162", "title": "法国人很浪漫，或许只是一种错误的刻板印象？", "ga_prefix": "010907", "type": 0, "id": 9731821 },
    { "image_hue": "0x2a301e", "hint": "作者 / 知乎用户", "url": "https://daily.zhihu.com/story/9731797", "image": "https://pic1.zhimg.com/v2-20daa7834321aee53f4a87ca2907b596.jpg?source=8673f162", "title": "接到了不同的 OFFER 应该怎么比较？", "ga_prefix": "010807", "type": 0, "id": 9731797 },
    { "image_hue": "0x999391", "hint": "作者 / Derrick Zhang", "url": "https://daily.zhihu.com/story/9731703", "image": "https://pic4.zhimg.com/v2-da79a55f96ace676c433a7c5adde99ab.jpg?source=8673f162", "title": "2021 年了，你还愿意买 Kindle 吗？", "ga_prefix": "010607", "type": 0, "id": 9731703 },
    { "image_hue": "0x172121", "hint": "作者 / 苏澄宇", "url": "https://daily.zhihu.com/story/9731647", "image": "https://pic2.zhimg.com/v2-ef49f243658edb316fd306be39e2f9be.jpg?source=8673f162", "title": "野生动物吃鱼不会被刺卡住吗？", "ga_prefix": "010407", "type": 0, "id": 9731647 }
  ]
}

export default news;
```

## 4-页面模块 / render 模块

针对某一个功能的处理。此处页面模块的作用，就是请求数据，并且渲染页面。

首先在 index.html 中，添加一个容器标签，我们会将内容渲染到该容器中。

```html
<div id="news"></div>
```

然后处理页面逻辑

```javascript
// src/render.ts
import { newsApi } from './api'

const news = document.querySelector('#news')

if (!news) {
  throw new Error('容器元素不存在')
}

// 初始值
news.innerHTML = '数据加载中...'

newsApi().then((res) => {
  const top = `
    <div class="top-container">
      ${res.top_stories
        .map(
          (item) =>
            `<a class="item" href="${item.url}">
          <img src="${item.image}" alt="" />
          <div>${item.title}</div>
        </a>`,
        )
        .join('')}
    </div>
  `

  const list = `
    <div class="list-container">
      ${res.stories
        .map(
          (item) =>
            `<a class="item" href="${item.url}">
          <img src="${item.images[0]}" alt="" />
          <div>${item.title}</div>
        </a>`,
        )
        .join('')}
    </div>
  `
  news.innerHTML = `${top}${list}`
})
```

## 5-最后

最后在入口模块 `index.tsx` 中，引入 render 模块即可。

```javascript
// src/index.tsx
import './render'
```

一个简单的模块化案例，就这样完成了。
