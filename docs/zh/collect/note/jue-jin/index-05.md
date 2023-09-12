# Vue 组件间的属性、事件透传 (05)–实际应用

经过以上几个章节的学习，我们大概了解了在 Vue 中的属性透传、以及事件透传的基本概念和用法。那么他有什么实际意义呢？

其实它对于我们组件间的通信十分有用。在父组件时中调用子组件时，可以直接在子组件中绑定它半身支持的属性、事件（当然这个要求它是根节点）。

其实对于不是根节点的元素，Vue 同样提供了一些方法来帮助我们更好的开发($attrs)。不得不承认尤大确实是个很吊的人

好了，talk is cheap.

下面就用代码来做演示，我们在项目中经常会用到第三方库，我们这里安装 移动端 Vant 库作为示例

1. 新建 `vue3` 项目，此处不再详述，使用命令如下

   ```shell
   vue create vue3-demo // 选择默认的模板即可
   npm install vant
   ```

2. 在`App.vue`中引入 vant 库样式文件

   ```javascript
   import 'vant/lib/index.css'
   ```

3. 我们以 Vant 中的弹出层 popup 组件为例，我们对其进行封装处理，代码如下

   ```vue
   <!-- vue3-demo/src/components/MyPopup.vue -->
   <template>
     <Popup
       :closeable="true"
       :show="visible"
       position="bottom"
       :style="{ height: '30%' }"
     >
       我是弹框内容
     </Popup>
   </template>

   <script setup>
   import { Popup } from 'vant'
   defineProps({
     visible: {
       type: Boolean,
       default: false,
     },
   })
   </script>
   ```

   上面代码中我们封装了一个 MyPopup 组件，实际上就是对 Vant 中的 Popup 组件进行了二次封装处理。同时我们在 Vant 官网中可以看到 popup 支持很多事件和属性，而我们在自定义封装组件中并没有过多使用。

   **Events**

   | 事件名           | 说明                       | 回调参数            |
   | :--------------- | :------------------------- | :------------------ |
   | click            | 点击弹出层时触发           | _event: MouseEvent_ |
   | click-overlay    | 点击遮罩层时触发           | _event: MouseEvent_ |
   | click-close-icon | 点击关闭图标时触发         | _event: MouseEvent_ |
   | open             | 打开弹出层时立即触发       | -                   |
   | close            | 关闭弹出层时立即触发       | -                   |
   | opened           | 打开弹出层且动画结束后触发 | -                   |
   | closed           | 关闭弹出层且动画结束后触发 | -                   |

4. 在 App.vue 中引入该组件，代码如下

   ```vue
   <template>
     <div>
       <MyPopup
         :visible="visible"
         @click-overlay="handleCloseIcon"
         @click-close-icon="handleCloseIcon"
       ></MyPopup>
       <Button type="primary" @click="handleOpenPopup">打开弹框</Button>
     </div>
   </template>

   <script>
   export default {
     name: 'App',
   }
   </script>

   <script setup>
   import { Button } from 'vant'
   import { ref } from 'vue'
   import MyPopup from './components/MyPopup.vue'
   const visible = ref(false)
   const handleOpenPopup = () => {
     visible.value = true
   }
   const handleCloseIcon = () => {
     visible.value = false
   }
   </script>

   <style></style>
   ```

   我们在代码中可以看到，我们在组件身上直接使用了 `@click-overlay`、`@click-close-icon`事件处理函数，通过以上章节学习，它会直接透传到子组件的根元素上。

   而子元素的根元素是 popup 组件，可以想象，它是直接回调函数的；实际应用中我们也可以看到，虽然在自定义组件内部并没有写关闭逻辑， 但是在父组件上响应点击事件关闭， 一样是可以的。

   页面中的效果如下

   ![2023-09-13 00-05-14.2023-09-13 00_05_53](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45f0b8dbc4fc49ef84ee0fb38f7afc6f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=374&h=666&s=143242&e=gif&f=93&b=ffffff)
