# 09: runtime 统一运行时- 构建 renderer 渲染器

## 01: 前言

从本章开始我们将要在 `VNode` 的基础上构建 `renderer 渲染器`

根据上一章中的描述我们知道，在 `packages/runtime-core/src/renderer.ts`中存放渲染相关的内容

Vue  提供了一个 `baseCreateRenderer`  的函数，该函数会返回一个对象，我们把这个返回的这个对象叫做 `renderer 渲染器`

对于该对象而言，提供了三个方法

1. `render: 渲染函数`
2. `hydrate: 服务端渲染相关`
3. `createApp：构建vue项目的开始`

查看`baseCreateRenderer`的代码，我们也可以发现整个 baseCreateRenderer  包含了2000行代码，可见整个渲染器是非常复杂的

所以说，对于我们的实现而言，还是和之前一样，我们将谨遵**没有使用就当不存在**和**最少代码的实现逻辑**这两个核心思想，类构建整个 render 的过程

在实现 render 的过程中，我们也会和学习 h函数 一样，利用 h函数 时的测试实例，配合上 render 函数来分类型进行依次处理

那么明确好了这些内容之后 ，我们下面就来进入渲染器的世界吧

## 02: 源码阅读：初见render函数，ELEMENT节点的挂载操作

在上一小节，我们实现过一个这样的测试案例：packages/vue/examples/mine/runtime/h-element.html 

```html
<script>
  const { h, render } = Vue
  // <div :class="{ red: true }"></div>
  const vnode = h('div', { class: 'test' }, 'hello render')
  render(vnode, document.querySelector('#app'))
</script>
```

这样我们可以得到一个对应的 VNode，我们可以使用 render 函数来渲染它

```typescript
render(vnode, document.querySelector('#app'))
```

我们可以在 `packages/runtime-core/src/renderer.ts`的第 2327行，增加 debugger

1. 进入 `render 函数` 

2. `render 函数`接收三个参数

   1. `vnode 虚拟节点`
   2. `container 容器`
   3. `isSVG 是否是SVG`

3. 执行 `patch(container._vnode ||null, vnode, container, null, null, null, isSVG)`

   1. 根据我们之前所说，我们知道 `patch` 表示更新节点，这里传递的参数我们主要关注**前三个**

   2. `container._vnode` 表示**旧节点(n1)**,vnode表示**新节点（n2）**，container表示**容器**

   3. 执行 `switch case 到 if(shapeFlag & ShapeFlags.ELEMENT )`

      1. 我们知道此时 `shapeFlag`  为 9，转换为二进制

         ```javascript
         00000000 00000000 00000000 00001001
         ```

      2. `ShapeFlags.ELEMENT` 的值为1，转换为二进制是

         ```javascript
         00000000 00000000 00000000 00000001
         ```

      3. 进行按位与或，得到的二进制结果是

         ```javascript
         00000000 00000000 00000000 00000001 // 十进制 的 1
         ```

      4. 即 `if(shapeFlag & ShapeFlags.ELEMENT ) `

      5. 所以会进入 `if`

   4. 触发 `processElement` 方法

      1. 进入 `processElement` 方法

      2. 因为当前为**挂载操作**，所以**没有旧节点，即 n1 === null**

      3. 触发 `mountElement` 方法，即**挂载方法**

         1. 进入 `mountElemen`  方法

         2. 进入 `el = vnode.el = hostCreateElement(...)`  该方法为创建 Element 的方法

            1. 进入该方法，可以发现该方法指向 `packages/runtime-core/src/nodeOps.ts`  中的 `createElement`  方法
            2. 不知道大家还记不记得，之前我们说过：`vue` 为了保持兼容性，把所有和浏览器相关的 `API `封装到了 `runtime-core` 中
            3. 在 `createElement` 中的代码非常简单就是通过 `document.createElement`  方法`创建 dom`，并返回

         3. 此时 `el` 和 `vnode.el`  的值为 `createElement` 生成的 `div 实例`

         4. 接下来处理 子节点

         5. 执行 `if（shapeFlag & shapeFlags.TEXT_CHILDREN）`同样的按位与或&，大家可以自己进行下二进制的转换

         6. 触发 `hostSetElementText` 方法

            1. 进入该方法，同样指向 `packages/runtime-dom/src/nodeOps.ts`下的 `setElementText`方法
            2. 里面的代码非常简单，只有一行 `el.textContext = text`

         7. 那么至此 `div` 已经生成，并且 `textContent`  存在值，如果此时触发 `div 的 outerHTML`方法，得到 `<div>hello render</div>`

         8. 那么此时我们只缺少 `class` 属性了，所以接下来进入 `props`  的处理

         9. 执行 `for 循环`，进入 `hostPatchProp `方法，此时`key = class`,`props = { class: "text"}`

            1. 进入 `hostPatchProp` 方法

            2. 该方法位于 `packages/runtime-dom/src/patchProp.ts` 下的 `patchProp` 方法

            3. 此时 `key === class` 所以会触发 `patchClass`

               1. 进入 `patchClass`，我们可以看到它内部的代码也比较简单，主要分成了三种情况处理

                  ```typescript
                  export function patchClass(el: Element, value: string | null, isSVG: boolean) {
                    // directly setting className should be faster than setAttribute in theory
                    // if this is an element during a transition, take the temporary transition
                    // classes into account.
                    const transitionClasses = (el as ElementWithTransition)._vtc
                    if (transitionClasses) {
                      value = (
                        value ? [value, ...transitionClasses] : [...transitionClasses]
                      ).join(' ')
                    }
                    //  以下三种方式
                    if (value == null) {
                      el.removeAttribute('class')
                    } else if (isSVG) {
                      el.setAttribute('class', value)
                    } else {
                      el.className = value
                    }
                  }
                  ```

               2. 完成 `class 设定`

         10. 当执行完 `hostPatchProp`  之后，如果此时触发 `div`的`outerHTML`方法，将得到 `<div class="test"\> hello render</div>`

         11. 现在` dom` 已经构建好了，最后就只剩下 **挂载**操作了

         12. 继续执行代码将进入 `hostInsert(el,container,anchor)` 方法

             1. 进入 `hostInsert` 方法
             2. 该方法位于 `/packages/runtime-dom/src/modules` 中的 `insert` 方法
             3. 内部同样只有一行代码： `parent.inserBefore(child, anchor | null)`
             4. 我们知道 `insertBefore` 方法可以插入到 `dom `指定区域

         13. 那么到这里，我们已经成功的把 `div` 插入到`dom树`中，执行完成 `hostInsert`方法之后，浏览器会出现对应的 `div`

      4. 至此，整个 `patchElement` 执行完成

4. 执行` container._vnode = vnode `为**旧节点赋值**

由以上代码可知，

1. 整个挂在 `Element | Text_Children` 的过程可以分为以下步骤
   1. 触发 `patch` 方法
   2. 根据 `shapeFlag` 的值，判断触发 `processElement` 方法
   3. 在 `processElement` 中，根据**是否存在 就VNode**来判定触发**挂载**还是**更新**的操作
      1. 挂载中分成了4大步
      2. 处理 `textContent`
      3. 处理 `patch`
      4. 挂载 `dom`
   4. 通过 `container._vnode = vnode` 为**旧节点赋值**

## 03：框架实现：构建 renderer 基本架构

在上一小节中，我们明确了 `render` 渲染 `Element | Text_Children` 的场景，那么接下来我们就可以根据阅读的源码来实现对应的框架渲染器了

实现渲染器的过程我们将分为两个部分

1. 搭建出 `renderer` 的基本架构，我们知道对于 `renderer` 而言，它内部分为 `core` 和 `dom` 两个部分，那么这两个部分怎么交互，我们都会在基本架构这里进行处理
2. 处理具体的 `procesElement`方法逻辑

那么这一小节，我们就先做一部分：搭建出 `renderer` 的基本架构

整个**基本架构**应该分为**三部分**进行处理

1. `renderer` 渲染器本身，我们需要构建出 `baseCreateRenderer` 方法
2. 我们知道所有和 `dom` 的操作都是与`core` 分离的，而和 `dom` 的操作包含了两个部分
   1. `Element操作`：比如 `insert`、 `createElement`等，这些将被放入到 `runtime-dom` 中
   2. `props操作`：比如设置类名，这些也将被放入到 `runtime-dom` 中

### renderer 渲染器本身

1. 创建`packages/runtime-core/src/renderer.ts`文件
