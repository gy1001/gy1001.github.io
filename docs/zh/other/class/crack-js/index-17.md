# 17-综合案例-事件分析库

> 工作中，我们会对window, DOM节点，WebSoket, 或者单纯的事件中心等注册事件监听函数。本章分析事件监听，并排查因此可能导致的内存泄漏。 本章节主要讨论和分析几个技术点：
>
> 1. 怎么准确知道某个对象或者函数是否被回收 
> 2. 常见事件监听函数的本质 
> 3. 拦截方法常见方式 
> 4. 弱引用回收问题 
> 5. 如何裁定事件监...

## 01：事件分析库简介

### 常见的事件美誉移除造成的事件泄漏

#### 常见事件

* window
* DOM
* Websocket
* 单纯的事件中心
* XMLHttpRequest
* ...

#### SPA 加剧了事件泄漏

* 比如 React 组件加载后，在 window 上注册了监听，组件卸载没有删除，极有可能像滚雪球一样，一发不可收拾

### 自研事件分析库-功能

#### 报警

* 同一事件从属对象，比如 window, Socket 等同一个实例
* 事件类型，比如 message , resize等
* 事件回调函数
* 事件回调函数参数

#### 高危统计

#### 事件统计

#### 支持多种事件类型

* EventTarget
* DOM 节点 + window + document 其继承于 EventTarget
* XMLHttpRequest 其继承于 EventTarget
* 原生的 WebSocket继承于 EventTarget
* nodejs 标准的 events
* MQTT 基于 events 库
* sockte.io 基于 events 库
* socket.io-client 基于 component-emitter 库

