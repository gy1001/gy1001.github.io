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

## 03：场景一：自前向后的 diff 对比

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

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5bc768565154ffc9d95261a9186d9d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

2. 由上图中所示，在`patchKeyedChildren`方法中程序会进入`while (i <= e1 && i <= e2)`而在**第一次循环**中，因为 `n1`和`n2`的`key`和`type`都相同，所以会进入`if`执行`patch`方法，进行打补丁。最后`i++`变为`1`。因为此时仍然满足`i<=e1 && i<=e2`，所以会**第二次进入循环**

   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c354a9325aa4e6baf35a3b1728abe39~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

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
