# 13-compiler 编译器-构建 compile 编译器

## 01: 前言

在上一章节我们了解了 compiler  的作用和大致流程之后，那么这一章节我们将要在 vue-next-mine中实现一个自己的编译器

但是我们知道，compiler  是一个非常复杂的概念，我们无法在有限的课程中实现一个完善的编译器，所以，我们将会和之前一样，严格遵循：**没有使用就当不存在**和**最少代码的实现逻辑**这两个标准。只关注**核心**和**当前业务**相关的内容，而忽略其他

那么明确好了以上内容之后，接下来，就让我们进入编译器的学习把~~~

## 02：扩展知识：JavaScript与有限状态机

我们知道想要实现 compiler  第一步是构建 AST 对象，那么想要构建 AST，就需要利用 [有限状态机](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)的概念

有限状态机也被叫做**有限自动状态机**，表示**有限个[状态](https://zh.wikipedia.org/wiki/状态)以及在这些状态之间的转移和动作等行为的[数学计算模型](https://zh.wikipedia.org/wiki/计算模型_(数学))**。

光看着概念，可能难以理解，那么下面我们来看一个具体的例子

根据`packages/compiler-core/src/compile.ts`中的代码可知，`ast`对象的生成是通过`baseParse`方法得到的，

而对于`baseParse`方法而言，接收一个`template`作为参数，返回一个`ast`对象

即：**通过 parse方法，解析 template,得到ast  对象**。中键解析的过程，就需要使用到**有限自动状态机**

我们来写如下模板（template)

```html
<div>hello world</div>
```

`vue`想要把改模板解析成`AST`，那么就需要利用有限自动状态机队该模板进行分析，分析的过程中主要包含了三个特性

> 摘自：https://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html
> 1. 状态总数是有限的
> 	1. 初识状态
> 	2. 标签开始状态
> 	3. 标签名称状态
> 	4. 文本状态
> 	5. 结束标签状态
> 	6. 结束标签名称状态
> 	7. 。。。
> 2. 任一时刻，只处在一种状态之中
> 3. 某种条件下，会从一种状态转变为另一种状态
> 	1. 比如，从 1 到 2 意味着从初识状态切换到了标签开始状态

如下图所示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42c6b3e56ccd42da86110967a41f08ff~tplv-k3u1fbpfcp-watermark.image?)

1. 解析`<`：由**初始状态**进入到**标签开始状态**
2. 解析`div`：由**标签开始状态**进入到**标签名称状态**
3. 解析`>`：由**标签名称状态**进入**初始状态**
4. 解析`hello world`：由**初始状态**进入到**文本状态**
5. 解析`<`：由**文本状态**进入到**标签开始状态**
6. 解析`/`：由**标签开始状态**进入到**结束标签状态**
7. 解析`div`：由**结束标签状态**进入**结束标签名称状态**

经过这样一系列的解析，对于

```html
<div>hello world</div>
```

而言，我们将得到三个`token`：

```text
开始标签：<div>
文本标签：hello world
结束标签：</div>
```

而这样一个利用有限状态机的状态迁移，来获取`tokens`的过程，可以叫做：**对模板的标记化**

### 总结

那么这一小节，我们了解了什么是有限自动状态机，也知道了它的三个特性

`vue`利用它来实现了对模板的标记化，得到了对应的`token`

那么这样的一个`tokens`有什么用呢？我们下一个小节再说

## 03：扩展知识：扫描 tokens 构建 AST 结构的方案

在上一小节中，我们已经知道可以通过自动状态机解析模板为`tokens`，那么解析出来的`tokens`就是声场`AST`的关键

生成`AST`的过程，就是**`tokens`扫描的过程**

我们以以下`html`结构为例

```html
<div>
  <p>hello</p>
  <p>world</p>
</div>
```

该`html`可以被解析为以下`tokens`

```text
开始标签：<div>
开始标签：<p>
文本节点：hello
结束标签：</p>
开始标签：<p>
文本节点：world
结束标签：</p>
结束标签：</div>
```

具体的扫描过程为（文档中仅显示初始状态和结束状态）

### 初始状态

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e38871574ed40a3b1b11383ede9b89d~tplv-k3u1fbpfcp-watermark.image?)

### 结束状态

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d855e474f8f440198334ee3e0b6aca0d~tplv-k3u1fbpfcp-watermark.image?)

在刚才的图示中，我们通过[递归下降算法](https://zh.wikipedia.org/wiki/递归下降解析器)这样的一种扫描形式把`tokens`解析**栈**解析成了`AST(抽象语法树)`

## 04:源码阅读：编译器第一步：依据模板，生成 AST 抽象语法树

通过上一下节的学习我们知道，生成`AST`抽象语法树是在`packages/compile-core/src/compile.ts`中的第 85 行` const ast = isString(template) ? baseParse(template, options) : template`生成的

而当`template`是数组时就会调用`baseParse`这个函数，它



















## 05：框架实现：构建 parse 方法，生成 context 方法

## 06：框架实现：构建有限自动状态机解析模板，扫描 token 生成 AST 结构
