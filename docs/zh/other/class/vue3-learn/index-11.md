# 11-runtime 运行时-diff 算法核心实现

## 01:前言

我们之前完成过一个`patchChldren`的方法，该方法的主要作用是为了**更新子节点**，即：**为子节点打补丁**

子节点的类型多种多样，如果两个`ELEMENT`的子节点都是`TEXT_CHILDREN`的话，那么直接通过`setText`赋值新值即可

但是如果**新旧 ELEMENT 的子节点都为 ARRAY_CHILDREN**的话，那么想要完成一个**高效**的更新就会比较复杂了。这个时候，我们就需要，**比较两组子节点**，以达到一个高效的更新功能。这种**比较的算法**就是**diff 算法**

`vue`中对`diff`算法的描述在`packages/runtime-core/src/renderer.ts`的`patchKeyedChildren（1759行）`方法中

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bf49fea8b8849599b6b3d2fb47299e3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

观察该方法，可以发现该方法内部被分为了`5`块（5 种场景）

1. `sync from start`：自前行后的对比
2. `sync from end`：自后向前的对比
3. `common sequence + mount`：新节点多余旧节点，需要挂载
4. `common sequence + unmount`：旧节点多于新节点，需要挂载
5. `unknown sequence`：乱序

这`5`块就是`diff`的**核心逻辑**。我们本章就是围绕这 5 种场景进行**分析**和**实现**。现在，就让我们开始循序渐进的解开`diff`算法的神秘面纱吧~~

## 02：前置知识：VNode 虚拟节点 Key 属性的作用

在学习`diff`算法前，有一个属性我们必须先了解一下,那就是`key`

我们知道在`v-for`循环的时候，我们就必须要指定一个`key`值，那么这个`key`值的作用是什么呢？

如果大家有看过我前几篇关于渲染器的文章，应该还记得我们写过一个方法：在`packages/runtime-core/src/vnode.ts`中的`isSameNodeType`方法

```typescript
/**
 * 根据 key || type 判断是否为相同类型节点
 */
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  return n1.type === n2.type && n1.key === n2.key
}
```

`type`和`key`都是`vnode`的`props`

可以看出`vue`是通过两个`vnode`的`type`和`key`这两个属性是否相同来判断两个`vnode`是否是**相同**的`vnode`

这个概念在`diff`中非常重要，它决定了`ELEMENT`的**复用**逻辑。因为我们目前的代码并没有`key`这个属性，我们现在就来把`key`加一下

1. 在`packages/runtime-core/src/vnode.ts`的`createBaseVNode`中，增加`key`属性

   ```typescript
   const vnode = {
     __v_isVNode: true,
     type,
     props,
     shapeFlag,
     key: props?.key || null, // 增加
   } as VNode
   ```

   这样，我们的`vnode`就可以具备`key`属性了

## 03：源码阅读：场景一：自前向后的 diff 对比

我们创建如下测试示例

```html
<script>
  const { h, render } = Vue
  const vnode = h('ul', [
    h('li', { key: 1 }, 'a'),
    h('li', { key: 2 }, 'b'),
    h('li', { key: 3 }, 'c'),
  ])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [
      h('li', { key: 1 }, 'a'),
      h('li', { key: 2 }, 'b'),
      h('li', { key: 3 }, 'd'),
    ])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

在上面的测试示例中，我们利用`vnode2`更新`vnode`节点

它们的子节点都是可以`ARRAY_CHILDREN`，需要注意的是它们的**子节点具备相同顺序下的相同`vnode`(type、key 相等)**。唯一不同的地方在于**第三个`li`**标签显示的内容不同

那么我们来看一下这种情况下`vue`是如何来处理对应的`diff`的

1. 在`patchKeyedChildren`中，进行`debugger`，等待`2s`，进入`debugger`

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeb3a6798ea0458496332ecf2bcb46a0~tplv-k3u1fbpfcp-watermark.image?)

2. 由上图中所示，在`patchKeyedChildren`方法中程序会进入`while (i <= e1 && i <= e2)`而在**第一次循环**中，因为 `n1`和`n2`的`key`和`type`都相同，所以会进入`if`执行`patch`方法，进行打补丁。最后`i++`变为`1`。因为此时仍然满足`i<=e1 && i<=e2`，所以会**第二次进入循环**

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7cc79e98b59453aac3c807d3fae63a3~tplv-k3u1fbpfcp-watermark.image?)

3. 因为第二次的`n1`和`n2`的`type`和`key`仍然相同，所以仍然会进入`if`和第一步执行相同操作，接着`i++`变为`2`，此时**会进入第三次循环**。而第三次的`n1`和`n2`也是相同的`vnode`，所以与前两次一样执行`patch`

4. 三次循环全部完成，此时我们查看浏览器，可以看到`children`的**更新**操作**已经完成**

5. 后续的代码无需关心

### 总结

由以上过程代码可知：

1. `diff`所面临的第一个场景就是：**自前向后的 diff 对比**
2. 在这样的一个比对中，会\*\*依次获取相同下标的 `oldChild`和`newChild`
3. 如果`oldChild`和`newChild`为相同的`VNode`，则直接通过`patch`进行打补丁即可
4. 如果`oldChild`和`newChild`为不相同的`VNode`，则会跳出循环
5. 每次处理成功，则会自增加`i`标记，表示：**自前向后已经处理过的节点数量**

## 04：框架实现：场景一：自前向后的 diff 对比

根据上一小节的原码阅读，我们实现对应逻辑

1. 首先想让我们的代码支持`ARRAY_CHILDREN`的渲染，在`packages/runtime-core/src/render.ts`中触发`mountElement`方法

   ```typescript
   export function baseCreateRender(options: RendererOptions) {
     const mountElement = (vnode, container, anchor) => {
       const { type, props, children, shapeFlag } = vnode

       //  2. 设置文本
       if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
       } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
         mountChildren(vnode.children, el, anchor) // 新增加，我们之前已经实现过了 mountChildren 方法
       }
     }
   }
   ```

2. 接下来，我们处理`diff`函数，在`packages/runtime-core/src/renderer.ts`中，创建`patchKeyedChildren`方法

   ```typescript
   export function baseCreateRender(options: RendererOptions) {
     const patchChildren = (oldVNode, newVNode, container, anchor) => {
       const c1 = oldVNode && oldVNode.children
       const prevShapeFlag = oldVNode ? oldVNode.shapeFlag : 0
       const c2 = newVNode && newVNode.children
       const { shapeFlag } = newVNode
       if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
         if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
           // TODO 卸载旧子节点
         }
         if (c2 !== c1) {
           // 挂在新子节点的文本即可
           hostSetElementText(container, c2)
         }
       } else {
         if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
           if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
             // ----------------------------------这里实现 Diff --------------
             patchKeyedChildren(c1, c2, container, anchor)
           } else {
             // TODO 卸载式操作
           }
         } else {
           if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
             // 删除纠结点的text
             hostSetElementText(container, '')
           }
           if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
             // TODO 单独新子节点的挂载
           }
         }
       }
     }
     // diff
     const patchKeyedChildren = (
       oldChildren,
       newChildren,
       container,
       parentAnchor
     ) => {
       // 索引
       let i = 0
       // 新的子节点的长度
       const newChildrenLength = newChildren.length
       // 旧的子节点最大（最后一个）下标
       let oldChildrenEnd = oldChildren.length - 1
       // 新的子节点最大（最后一个）下标
       let newChildrenEnd = newChildrenLength - 1
       while (i <= oldChildrenEnd && i <= newChildrenEnd) {
         const oldVNode = oldChildren[i]
         const newVNode = normalizeVNode(newChildren[i])
         // 如果 oldVNode 和 newVNode 被认为是同一个 vnode，则直接patch 即可
         if (isSameVNodeType(oldVNode, newVNode)) {
           patch(oldVNode, newVNode, container, null)
         } else {
           // 如果 不认为同一个 vnode,则直接跳出循环
           break
         }
         // 下标自增
         i++
       }
     }
   }
   ```

3. 最后，创建对应测试示例`packages/vue/examples/runtime/render-element-diff-1.html`，内容如下

   ```html
   <script>
     const { h, render } = Vue
     const vnode = h('ul', [
       h('li', { key: 1 }, 'a'),
       h('li', { key: 2 }, 'b'),
       h('li', { key: 3 }, 'c'),
     ])
     // 挂载
     render(vnode, document.querySelector('#app'))

     // 延迟两秒，生成新的 vnode，进行更新操作
     setTimeout(() => {
       const vnode2 = h('ul', [
         h('li', { key: 1 }, 'a'),
         h('li', { key: 2 }, 'b'),
         h('li', { key: 3 }, 'd'),
       ])
       render(vnode2, document.querySelector('#app'))
     }, 2000)
   </script>
   ```

## 05：源码阅读：场景二：自后向前的 diff 对比

1. 我们新建测试示例:

   ```html
   <script>
     const { h, render } = Vue

     const vnode = h('ul', [
       h('li', { key: 1 }, 'a'),
       h('li', { key: 2 }, 'b'),
       h('li', { key: 3 }, 'c'),
     ])
     // 挂载
     render(vnode, document.querySelector('#app'))

     // 延迟两秒，生成新的 vnode，进行更新操作
     setTimeout(() => {
       const vnode2 = h('ul', [
         h('li', { key: 4 }, 'a'),
         h('li', { key: 2 }, 'b'),
         h('li', { key: 3 }, 'd'),
       ])
       render(vnode2, document.querySelector('#app'))
     }, 2000)
   </script>
   ```

   在这个例子中，`vnode2`的第一个节点的`key=4`,这就会导致一个情况：**如果我们从前往后进行对比 diff,那么第一个`child`无法满足`isSameVNodeType`,就会直接跳出循环**

   我们去调试，看下源码中是怎么处理的

2. 进入`patchKeyedChildren`方法，因为前面的赋值都是一样的我们直接来到第一个`while`循环

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13a8799db04546f88794fb5b192eff1f~tplv-k3u1fbpfcp-watermark.image?)

3. 当进入第一个`while`的第一次循环时，此时`n1`的`key`为 `1`，`n2`的`key`为`4`,所以，`isSameVNodeType(n1, n2)`为`false`,会执行`else`中的`break`跳出当前`while`.第一个`while`结束，来到第二个`while`开始**第一次循环**

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb06ae7a0e3d49cda4acd818a37c1999~tplv-k3u1fbpfcp-watermark.image?)

4. 由上图可知，第二个`while`循环是从后往前遍历的，且第一次进入循环会比较两个列表的最后一个`vnode`节点，因为此时两个节点不相同所以会进行`patch`打补丁，完成第三个节点的更新后,`e1 -e2`,`e1`和`e2`此时都是`1`，所以会进入**第二次循环**

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ea2d27c645b460db493f27cf9384c89~tplv-k3u1fbpfcp-watermark.image?)

5. 由于第二次进入循环`n1`和`n2`的`type`和`key`还是相同的，所以会再次执行`patch`操作，此时`e1`和`e2`都为`0`,满足`i<=e1 && i<=e2`，所以会进行**第三次循环**

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09620a8056d346ca8613d106de3d897f~tplv-k3u1fbpfcp-watermark.image?)

6. 此时 `n1.key = 1` `n2.key = 4` 所以会执行 `break` 跳出循环。

7. 此时，各变量的值为：`e1 = 0` `e2 = 0` `i = 0` `l2 = 3`

8. 三次循环全部完成，此时，我们查看浏览器，可以发现`children`的**更新**操作已经完成。后续的代码无需关心

### 总结

由以上代码可知，

1. `vue`的`diff`首先会**自前向后**和**自后向前**，处理所有的**相同的**`VNode`节点
2. 每次处理成功之后，会自减`e1`和`e2`,表示**新、旧节点中已经处理完成的节点（自后向前）**

## 06：框架实现：场景二：自后向前的 diff 对比

明确好了自后向前的`diff`对比之后，接下来我们就可以直接进行对应的实现了

1. 在`patchKeyedChildren`方法中，处理自后向前的场景

   ```typescript
   // 2. 自后向前的 diff 对比，经过循环之后，从后开始的相同 vnode 将被处理
   while (i <= oldChildrenEnd && i <= newChildrenEnd) {
     const oldVNode = oldChildren[oldChildrenEnd]
     const newVNode = normalizeVNode(newChildren[newChildrenEnd])
     if (isSameVNodeType(oldVNode, newVNode)) {
       patch(oldVNode, newVNode, container, null)
     } else {
       break
     }
     oldChildrenEnd--
     newChildrenEnd--
   }
   ```

2. 创建测试示例`packages/vue/examples/runtime/render-element-diff-2.html`

   ```html
   <script>
     const { h, render } = Vue
     const vnode = h('ul', [
       h('li', { key: 1 }, 'a'),
       h('li', { key: 2 }, 'b'),
       h('li', { key: 3 }, 'c'),
     ])
     // 挂载
     render(vnode, document.querySelector('#app'))
     // 延迟两秒，生成新的 vnode，进行更新操作
     setTimeout(() => {
       const vnode2 = h('ul', [
         h('li', { key: 4 }, 'a'),
         h('li', { key: 2 }, 'b'),
         h('li', { key: 3 }, 'd'),
       ])
       render(vnode2, document.querySelector('#app'))
     }, 2000)
   </script>
   ```

## 07: 源码阅读：场景三：新节点多于旧节点的 diff 对比

以上两种场景，新节点数量和旧节点数量都是完全一致的

但是我们也知道一旦产生更新，那么新旧节点的数量是可能会存在不一致的抢矿，具体的不一致情况分为以下两种：

1. 新节点的数量多于旧节点的数量
2. 旧节点的数量多于新节点的数量

本小节我们先来研究一下**新节点的数量多于旧节点的数量**的抢矿

新节点的数量多于旧节点的数量的场景下，依然可以被细分为两种具体的场景

1. 多出的新节点位于**头部**
2. 多出的新节点位于**尾部**

明确好了以上内容之后，我们来看如下测试示例

```html
<script>
  const { h, render } = Vue

  const vnode = h('ul', [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b')])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [
      h('li', { key: 1 }, 'a'),
      h('li', { key: 2 }, 'b'),
      h('li', { key: 3 }, 'c'),
    ])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

根据以上代码进入`debugger`,忽略掉前两种场景，直接从第三种场景开始

代码进入场景三: `3. common sequence + mount`，以下图示逻辑为：多出的新节点位于**尾部**的场景

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f6fb10d5fff4df7a871a4480210bc92~tplv-k3u1fbpfcp-watermark.image?)

那么接下来我们来看：多出的新节点位于**头部**的场景

```html
<script>
  const { h, render } = Vue

  const vnode = h('ul', [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b')])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [
      h('li', { key: 3 }, 'c'),
      h('li', { key: 1 }, 'a'),
      h('li', { key: 2 }, 'b'),
    ])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

根据以上代码，再次进入场景三：`3. common sequence + mount`:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94857afe9b25445fac85dd272007e7ef~tplv-k3u1fbpfcp-watermark.image?)

### 总结

由以上代码可知

1. 对于新节点多于旧节点的场景具体可以再细分为以下两种情况
   1. 多出的新节点位于**尾部**
   2. 多出的新节点位于**头部**
2. 这两种情况下的区别在于：**插入的位置不同**
3. 明确好插入的位置之后，直接通过`patch`进行打补丁即可

## 08：框架实现：场景三：新节点多于旧节点的 diff 对比

根据上一小节的分析，我们可以直接在`packages/runtime-core/src/renderer.ts`中的`patchKeyedChildren`方法下，实现如下代码

```typescript
// 3. 新节点多余旧节点时的 diff 比对。
if (i > oldChildrenEnd) {
  if (i <= newChildrenEnd) {
    const nextPos = newChildrenEnd + 1
    const anchor =
      nextPos < newChildrenLength ? newChildren[nextPos].el : parentAnchor
    while (i <= newChildrenEnd) {
      patch(null, normalizeVNode(newChildren[i]), container, anchor)
      i++
    }
  }
}
```

创建对应测试示例`packages/vue/examples/runtime/render-element-diff-3.html`

```html
<script>
  const { h, render } = Vue
  const vnode = h('ul', [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b')])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [
      h('li', { key: 1 }, 'a'),
      h('li', { key: 2 }, 'b'),
      h('li', { key: 3 }, 'c'),
    ])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

测试成功

## 09：源码阅读：场景四：旧节点多于新节点时的 diff 对比

接下来我们来看场景四**旧节点多于新节点**时，根据场景三的经验，其实我们也可以明确，对于旧节点多于新节点时，对应的场景也可以细分为两种

1. 多出的旧节点位于**尾部**
2. 多出的旧节点位于**头部**

```html
<script>
  const { h, render } = Vue
  const vnode = h('ul', [
    h('li', { key: 1 }, 'a'),
    h('li', { key: 2 }, 'b'),
    h('li', { key: 3 }, 'c'),
  ])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b')])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

跟踪代码，直接进入场景四，即可

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11f5f6ba0da945cd84c65dcdf3800829~tplv-k3u1fbpfcp-watermark.image?)

1. 因为`i=2,e1=0,e2=1`，所以最后会执行`unmount`方法**卸载**多余出来的第三个`vnode`
2. 以上代码比较简单，对于多出的旧节点位于**头部**的场景，同样执行该逻辑

### 总结

由以上代码可知

旧节点多于新节点时，整体的处理比较简单，只需要**卸载旧节点**即可

## 10：框架实现：场景四：旧节点多于新节点的 diff 对比

根据上一小节的分析，我们可以直接在`packages/runtime-core/src/renderer.ts`中的`patchKeyedChildren`方法，实现如下代码

```typescript
// 4. 旧节点多与新节点时的 diff 比对。
else if (i > newChildrenEnd) {
  while (i <= oldChildrenEnd) {
    unmount(oldChildren[i])
    i++
  }
}
```

创建如下测试示例`packages/vue/examples/runtime/render-element-diff-4.html`

```html
<script>
  const { h, render } = Vue
  const vnode = h('ul', [
    h('li', { key: 1 }, 'a'),
    h('li', { key: 2 }, 'b'),
    h('li', { key: 3 }, 'c'),
  ])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b')])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

测试成功

## 11：局部总结：前四种 diff 场景的总结与乱序场景

那么到目前为止，我们已经实现了 `4` 种 `diff` 场景对应的处理，经过前面的学习我们可以知道，对于前四中 `diff` 场景而言，`diff` 处理本质上是比较简单的

1. 自前向后的 `diff` 对比：主要处理从前到后的相同`VNode`。例如:`(a b) c` 对应 `(a b) d e`
2. 自后向前的 `diff` 对比：主要处理从后到前的相同`VNode`。例如：`a (b c)` 对应 `d e (b c)`
3. 新节点多于旧节点的`diff`对比：主要处理新增节点
4. 旧节点多于新节点的`diff`对比：主要处理删除节点

但是仅靠前四种场景的话，那么是无法满足实际开发中的所有逻辑的。所以我们还需要最关键的一种场景需要处理，那就是**乱序场景**

那么什么情况下我们需要乱序场景呢？

我们来看以下的`diff`场景

```html
<script>
  const { h, render } = Vue

  const vnode = h('ul', [
    h('li', { key: 1 }, 'a'),
    h('li', { key: 2 }, 'b'),
    h('li', { key: 3 }, 'c'),
    h('li', { key: 4 }, 'd'),
    h('li', { key: 5 }, 'e'),
  ])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [
      h('li', { key: 1 }, 'new-a'),
      h('li', { key: 3 }, 'new-c'),
      h('li', { key: 2 }, 'new-b'),
      h('li', { key: 6 }, 'new-f'),
      h('li', { key: 5 }, 'new-e'),
    ])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

该测试示例经过前四个`while`的过程为

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b51d01e1e0948429454c1f6899a6599~tplv-k3u1fbpfcp-watermark.image?)

1. 初始状态：索引`i = 0`。旧节点结束索引`e1 = 4`。新节点索引`e2 = 4`
1. 自前向后的索引：索引`i = 1`。旧节点结束索引`e1 = 4`。新节点索引`e2 = 4`
1. 自后向前的索引：索引`i = 1`。旧节点结束索引`e1 = 3`。新节点索引`e2 = 3`
1. 增加新节点：无任何变化
1. 删除旧节点：无任何变化

1. 此时中间还剩下三对节点没有处理，该怎么办呢？

## 12：前置知识：场景五：最长递增子序列

在场景 5 的`diff`中，`vue`使用了**最长递增子序列**这样的一个概念，所以想要更好的理解场景 5，那么我们需要先搞明白，两个问题

1. 什么是最长递增子序列？
2. 最长递增子序列在`diff`中的作用是什么？

### 什么是最长递增子序列

> [维基百科-最长递增子序列](https://zh.m.wikipedia.org/zh-hans/%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97)：在一个给定的数组序列中，找到一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能地大

只看概念可能难以理解，我们来看一个具体的例子

假设，我们现在有一个这样的两组节点

```typescript
旧节点：1、2、3、4、5、6
新节点：1、3、2、4、6、5
```

我们可以根据**新节点**生成**递增子序列（非最长）（注意：并不是唯一的）**，其结果为

1. `1、3、6`
2. `1、2、4、6`
3. ...

### 最长递增子序列在`diff`中的作用是什么

那么现在我们成功得到了 递增子序列，那么下面我们来看，这两个递增子序列在我们接下来的 diff 中起到了什么作用？

根据我们之前的四中场景可知，所谓的`diff`，其实说白了就是对**一组节点**进行**添加、删除、打补丁**的对应操作。但是除了以上三种操作之外，其实还有最后一种操作方式，那就是**移动**

我们来看下面这个例子

那么接下来，我们来分析一下移动的策略，整个移动根据递增子序列的不同，将拥有两种移动策略

1. `1、3、6`递增序列下
   1. 因为`1、3、6`的递增已确认，所以它们三个是不需要移动的，那么我们所需要移动的节点无非就是三个`2、4、5`
   2. 所以我们需要经过**三次**移动
2. `1、2、4、6`递增如下
   1. 因为`1、2、4、6`的递增已经确认，所以他们四个是不需要移动的，那么我们所需要移动的节点无非就是来**两个**`3、5`
   2. 所以我们需要讲过**两次**移动

所以由以上分析，我们可知：**最长递增自序列的确定，可以帮助我们减少移动的次数**

所以，当我们需要进行节点移动时，移动需要事先构建出最长递增子序列，以保证我们的移动方案

## 13：源码逻辑：场景五：求解最长递增子序列

`vue`中关于求**求解最长递增子序列**的代码在`packages/runtime-core/src/render.ts`中的第`2410`行代码，可以看到存在一个`getSequence`的函数

```typescript
/**
 * 获取最长递增子序列下标
 * 维基百科：https://en.wikipedia.org/wiki/Longest_increasing_subsequence
 * 百度百科：https://baike.baidu.com/item/%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97/22828111
 */
function getSequence(arr) {
  // 获取一个数组浅拷贝。注意 p 的元素改变并不会影响 arr
  // p 是一个最终的回溯数组，它会在最终的 result 回溯中被使用
  // 它会在每次 result 发生变化时，记录 result 更新前最后一个索引的值
  const p = arr.slice()
  // 定义返回值（最长递增子序列下标），因为下标从 0 开始，所以它的初始值为 0
  const result = [0]
  let i, j, u, v, c
  // 当前数组的长度
  const len = arr.length
  // 对数组中所有的元素进行 for 循环处理，i = 下标
  for (i = 0; i < len; i++) {
    // 根据下标获取当前对应元素
    const arrI = arr[i]
    //
    if (arrI !== 0) {
      // 获取 result 中的最后一个元素，即：当前 result 中保存的最大值的下标
      j = result[result.length - 1]
      // arr[j] = 当前 result 中所保存的最大值
      // arrI = 当前值
      // 如果 arr[j] < arrI 。那么就证明，当前存在更大的序列，那么该下标就需要被放入到 result 的最后位置
      if (arr[j] < arrI) {
        p[i] = j
        // 把当前的下标 i 放入到 result 的最后位置
        result.push(i)
        continue
      }
      // 不满足 arr[j] < arrI 的条件，就证明目前 result 中的最后位置保存着更大的数值的下标。
      // 但是这个下标并不一定是一个递增的序列，比如： [1, 3] 和 [1, 2]
      // 所以我们还需要确定当前的序列是递增的。
      // 计算方式就是通过：二分查找来进行的

      // 初始下标
      u = 0
      // 最终下标
      v = result.length - 1
      // 只有初始下标 < 最终下标时才需要计算
      while (u < v) {
        // (u + v) 转化为 32 位 2 进制，右移 1 位 === 取中间位置（向下取整）例如：8 >> 1 = 4;  9 >> 1 = 4; 5 >> 1 = 2
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Right_shift
        // c 表示中间位。即：初始下标 + 最终下标 / 2 （向下取整）
        c = (u + v) >> 1
        // 从 result 中根据 c（中间位），取出中间位的下标。
        // 然后利用中间位的下标，从 arr 中取出对应的值。
        // 即：arr[result[c]] = result 中间位的值
        // 如果：result 中间位的值 < arrI，则 u（初始下标）= 中间位 + 1。即：从中间向右移动一位，作为初始下标。 （下次直接从中间开始，往后计算即可）
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          // 否则，则 v（最终下标） = 中间位。即：下次直接从 0 开始，计算到中间位置 即可。
          v = c
        }
      }
      // 最终，经过 while 的二分运算可以计算出：目标下标位 u
      // 利用 u 从 result 中获取下标，然后拿到 arr 中对应的值：arr[result[u]]
      // 如果：arr[result[u]] > arrI 的，则证明当前  result 中存在的下标 《不是》 递增序列，则需要进行替换
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        // 进行替换，替换为递增序列
        result[u] = i
      }
    }
  }
  // 重新定义 u。此时：u = result 的长度
  u = result.length
  // 重新定义 v。此时 v = result 的最后一个元素
  v = result[u - 1]
  // 自后向前处理 result，利用 p 中所保存的索引值，进行最后的一次回溯
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```

这个解法的原理就是通过 `贪心 + 二分查找`，有兴趣的同学可以去 [Leetcode](https://link.juejin.cn/?target=https%3A%2F%2Fleetcode.cn%2Fproblems%2Flongest-increasing-subsequence%2F) 上做些相关的算法题，这里就不详细展开了。。。

## 14：源码阅读：场景五：乱序下的 diff 对比

到目前为止，我们已经明确了：

1. `diff`指的就是：**添加、删除、打补丁、移动**四个行为
2. **最长子序列**是什么，以及在`diff`中的作用
3. 场景五的乱序，是最复杂的场景，将会涉及到**添加、删除、打补丁、移动**这些所有场景

那么明确好了以上内容之后，我们先来看对应**场景五**的测试示例

```html
<script>
  const { h, render } = Vue

  const vnode = h('ul', [
    h('li', { key: 1 }, 'a'),
    h('li', { key: 2 }, 'b'),
    h('li', { key: 3 }, 'c'),
    h('li', { key: 4 }, 'd'),
    h('li', { key: 5 }, 'e'),
  ])
  // 挂载
  render(vnode, document.querySelector('#app'))

  // 延迟两秒，生成新的 vnode，进行更新操作
  setTimeout(() => {
    const vnode2 = h('ul', [
      h('li', { key: 1 }, 'new-a'),
      h('li', { key: 3 }, 'new-c'),
      h('li', { key: 2 }, 'new-b'),
      h('li', { key: 6 }, 'new-f'),
      h('li', { key: 5 }, 'new-e'),
    ])
    render(vnode2, document.querySelector('#app'))
  }, 2000)
</script>
```

该测试示例经过前四个`while`的过程为

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b51d01e1e0948429454c1f6899a6599~tplv-k3u1fbpfcp-watermark.image?)

1. 初始状态：索引`i = 0`。旧节点结束索引`e1 = 4`。新节点索引`e2 = 4`
1. 自前向后的索引：索引`i = 1`。旧节点结束索引`e1 = 4`。新节点索引`e2 = 4`
1. 自后向前的索引：索引`i = 1`。旧节点结束索引`e1 = 3`。新节点索引`e2 = 3`
1. 增加新节点：无任何变化
1. 删除旧节点：无任何变化

1. 此时中间还剩下三对节点没有处理，该怎么办呢？

## 15：框架实现：场景五：乱序下的 diff 对比

## 16: 总结

整个的`diff`就分为 5 种场景，前四种场景相对而言，还比较简单。最复杂的就是第 5 种，乱序的场景

整个的`diff`种，涉及到了很多的算法，比如：最长递增子序列

### 总结`runtime`模块，对于`runtime`而言

1. 我们首先是了解了`dom`、节点、节点树和**虚拟 DOM**，虚拟节点之间的概念
2. 然后知道了`render`函数和`h`函数各自的作用。`h`函数可以得到一个`vnode`，而`render`函数可以渲染为一个`vnode`
3. 接着就是**挂载、更新、卸载**这三组概念。知道了针对不同的`vnode`节点，他们的**挂载、更新、卸载**方式也是不同的
4. 之后又深入了组件，我们知道组件本质上就是一个对象（或者函数），组件的挂载本质上是`render`函数的挂载
5. 组件内部维护了一个`effect`对象，已达到响应性渲染的效果
6. 针对于`setup`函数而言，他在实际上反而更加简单，因为不需要改变`this`指向了
7. 结合所学，新旧节点的所有挂载和更新情况，可以被分为九种场景
   1. 旧节点为纯文本时
      1. 新节点为纯文本：执行文本替换操作
      2. 新节点为空：删除旧节点
      3. 新节点数组：清空文本，添加多个节点
   2. 旧节点为空时：
      1. 新节点为纯文本：添加新节点
      2. 新节点为空：不做任何事情
      3. 新节点为数组时：添加过个节点
   3. 旧节点是数组时：
      1. 新节点为纯文本：删除所有旧节点，添加新节点
      2. 新节点为空：删除所有旧节点
      3. 新节点为数组时：进行`diff`操作
8. 最后的`diff`分为`5`种场景，最后一种场景还是比较复杂的
