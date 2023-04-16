# 10-Vue3 框架升级: 大型前端项目 Vue2 升级 Vue3 实战

## 01：为什么要升级 vue3——vue3 与 vue2 对比

### Vue3 和 Vue2 的对比

#### vue2 的缺陷

- vue2 代码复用困难，vue2 的代码复用方式有 Mixin，但是容易出现命名冲突，且无法解决业务逻辑复用
- Vue2 对于 TypeScript 的支持不足
- Vue2 内部过度依赖 this, 导致无法 treeshaking

#### vue3 的优势

- vue3 支持 vue2 的大多数特性，能够实现对 vue2 的向下兼容
- vue3 对比 vue2 具有明显的性能提升
  - 打包大小减少 41%
  - 初次渲染快 55% 更新快 133%
  - 内存使用减少 54%
- vue3 具有 composition API 实现逻辑块化和重用
- vue3.2 通过 setup 语法糖进一步简化开发，可以编写更加优雅的代码
- vue3 脚手架默认实现对 typeScript 的支持
- 增加了很多新特性，如 Fragment、Teleport、Suspense

## 02：vue3 升级流程分析+vue3 依赖升级

## 03：vue2-elm 项目启动脚本升级

## 04：项目 vue3 升级后编译错误的解决

### vue 全家桶依赖升级

1. 删除项目中原有 vue 全家桶依赖：删除原项目中的 package.json 中的 vue 全家桶依赖

   ```javascript
   "vue": "^2.1.0",
   "vue-router": "^2.1.1",
   "vuex": "^2.0.0"

   // 或者也可以执行以下命令
   npm uninstall vue vue-router vuex
   ```

2. 升级 vue 全家桶依赖，替换 vue3 版本的依赖

   ```javascript
   "vue": "^3.0.0",
   "vue-router": "^4.0.0-0",
   "vuex": "^4.0.0"
   ```

3. 配置 vue3 所需要的依赖(把原有 devDependencies 全部删除), 并修改执行脚本

   ```json
   {
     "devDependencies": {
       "@vue/cli-service": "^5.0.8",
       "@vue/compiler-sfc": "^3.2.47",
       "sass": "^1.62.0",
       "sass-loader": "^13.2.2",
       "better-scroll": "^2.5.1",
       "showdown": "^2.1.0"
     },
     "scripts": {
       "dev": "vue-cli-service serve",
       "build": "vue-cli serve build"
     }
   }
   ```

4. 安装项目依赖

   ```shell
   npm install
   ```

5. 执行脚本命令

   ```shell
   npm run dev
   ```

6. 修改项目文件引用地址：启动项目后根据报错信息修改项目文件中的引用地址

   > 原项目寻找文件是直接从 src 下寻找的，直接使用会报错需要修改成相对路径。不能够直接替换，需要根据使用文件的位置进行修改 These dependencies were not found

- ```scss
   @include fj(left) p { // 此处报错
    text-align: left;
    line-height: 1.39rem;
    @include sc(0.7rem, #999);
    margin-right: 0.2rem;
    font-weight: 100;
    font-family: Arial;
  }
   
  // 改为
   @include fj(left);
  p {
    ...
  }
  ```

- ```javascript
  // Can't resolve 'src/config/env' in '/Users/yuangao/Desktop/vue2-elm-master/src/store'
  ```

- 上个错误就是别名的一个错误，我们需要移植`build/webpack.base.config.js`中的 resolve 别名配置

  ```json
  resolve: {
    extensions: ["", ".js", ".vue", ".less", ".css", ".scss"],
    fallback: [path.join(__dirname, "../node_modules")],
    alias: {
      vue$: "vue/dist/vue.common.js",
      src: path.resolve(__dirname, "../src"),
      assets: path.resolve(__dirname, "../src/assets"),
      components: path.resolve(__dirname, "../src/components"),
    },
  },
  ```

- 新建`vue.config.js`,把上述 `resolve` 配置粘贴进入

  ```javascript
  var path = require('path')

  module.exports = {
    configureWebpack: {
      resolve: {
        extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
        alias: {
          src: path.resolve(__dirname, './src'), // 注意这里路径有所更改
          assets: path.resolve(__dirname, './src/assets'), // 注意这里路径有所更改
          components: path.resolve(__dirname, './src/components'), // 注意这里路径有所更改
        },
      },
    },
  }
  ```

- 这一次有新的报错

  ```json
  at /Users/yuangao/Desktop/vue2-elm-master/src/components/common/shoplist.vue:10:60
  8  |  				<hgroup class="shop_right">
  9  |  					<header class="shop_detail_header">
  10 |  						<h4 :class="item.is_premium? 'premium': ''" class="" class="shop_title ellipsis">{{item.name}}</h4>
     |                                                             ^
  11 |  						<ul class="shop_detail_ul">
  12 |  							<li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
  ```

- 打开`src/components/common/shoplist`文件，可以看到他是有两个`class`属性，删除一个即可

- 再次运行`npm run dev`，发现编译成功，接下里我们解决语法上的错误

## 05：vue-router 和 vuex 语法升级

1. 修改`main.js`中`vue-router`引用方式,  改为如下方式

   ```javascript
   import { createApp } from "vue"; // vue 引入方式发生改变
   import { createRouter, createWebHistory } from "vue-router"; // vue-router 引入方式也有改变
   import routes from "./router/router";
   import store from "./store/";
   import "./config/rem";
   // 引入 App.vue
   import App from "./App.vue";
   
   // router 的产生也发生了变化
   const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
     strict: process.env.NODE_ENV !== "production",
     scrollBehavior(to, from, savedPosition) {
       if (savedPosition) {
         return savedPosition;
       } else {
         if (from.meta.keepAlive) {
           from.meta.savedPosition = document.body.scrollTop;
         }
         return { x: 0, y: to.meta.savedPosition || 0 };
       }
     },
   });
   
   // 实例的调用方式也有改变
   createApp(App).use(router).use(store).mount("#app");
   ```

2. 接着我们更改`store/index.js`,更新结果如下

   ```javascript
   import { createStore } from "vuex";
   import mutations from "./mutations";
   import actions from "./action";
   import getters from "./getters";
   
   const state = { ... }
   export default createStore({
     state,
     getters,
     actions,
     mutations,
   });
   ```

3. `Appv.vue`更改为如下

   > 报错信息如下
   >
   > vue-router.mjs?23bd:35 [Vue Router warn]: \<router-view\> can no longer be used directly inside \<transition\> or \<keep-alive\>
   
   ```vue
   // 更改为如下包裹方式
   <template>
     <div>
       <router-view v-slot="{ Component }">
         <keep-alive v-if="$route.meta.keepAlive">
           <transition>
             <component :is="Component" />
           </transition>
         </keep-alive>
         <transition name="router-fade" mode="out-in">
           <component :is="Component" />
         </transition>
       </router-view>
       <svg-icon></svg-icon>
     </div>
   </template>
   ```
   
4. `router.js`中有报错，需要更改

   报错信息如下

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fa1871041074148823d02c3f8e81f8f~tplv-k3u1fbpfcp-watermark.image?)

   修改为如下方式

   ```javascript
   // 引入方式统一改为如下方式
   const home = () => import("../page/home/home.vue");
   ....
   ```

5. 目前可以看到页面已经可以显示，虽然有些错误

   ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34c82cbe8b82490d8d3cd6f3bbed97b5~tplv-k3u1fbpfcp-watermark.image?)

## 06：接口升级+图片链接升级

1. 修改`src/config/fetch.js`中的借口地址

   ```javascript
   // 40 行改为如下 
   const response = await fetch("http://cangdu.org:8001" + url, requestConfig);
   ```

2. 这样回到浏览器就可以看到页面中已经正常请求返回

3. 下面我们来处理图片的一个请求错误问题

4. 打开`src/config/env.js`可以看到这里配置了图片地址（根据不同的环境返回不同的配置）,更改为如下

   ```javascript
   if (process.env.NODE_ENV == "development") {
     // imgBaseUrl = "/img/";
     imgBaseUrl = "//elm.cangdu.org/img/"; // 把本地的图片改为线上
   } else if (process.env.NODE_ENV == "production") {
     baseUrl = "//elm.cangdu.org";
     imgBaseUrl = "//elm.cangdu.org/img/";
   }
   ```

5. 目前图片就可以正常渲染了

6. 接着我们回到首页`http://localhost:8081/home`可以看到，首页的一个样式有所丢失导致页面渲染效果不对

   ```html
   // 页面中显示
   <ul class="citylistul clear">
     <router-link
       tag="li"
       v-for="item in hotcity"
       :to="'/city/' + item.id"
       :key="item.id"
     >
       {{ item.name }}
     </router-link>
   </ul>
   ```

   这里我们看到`router-link`写了一个`tag="li"`属性，在旧版本中是会渲染成`li`标签的，旧版本中对应的`css`也是依照这个逻辑

   ```scss
   .citylistul {
     li {
       float: left;
       text-align: center;
       color: $blue;
       border-bottom: 0.025rem solid $bc;
       border-right: 0.025rem solid $bc;
       @include wh(25%, 1.75rem);
       @include font(0.6rem, 1.75rem);
     }
     li:nth-of-type(4n) {
       border-right: none;
     }
   }
   ```

   但是目前在新版本中查看浏览器可以看到，渲染的是一个`a`标签

   ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e337caef235f4e09aada892e689e26e2~tplv-k3u1fbpfcp-watermark.image?)

   所以需要进行更改`css`中的`li`问`a`即可

   ```scss
   .citylistul {
     a { ... }
     a:nth-of-type(4n) { ... }
   }
   ```

   这样首页渲染效果就正常了

## 07：首页 vue3 语法升级

1. 目前首页的`js`代码还是按照之前的老的方式`data、methods、components`等等方式，

2. 接下来我们使用`vue3`的新语法特性`setup`来进行改造

   ```vue
   <script>
   import { ref, computed, onMounted, reactive } from "vue";
   import headTop from "../../components/header/head";
   import {
     cityGuess,
     hotcity as hotcityApi,
     groupcity as groupcityApi,
   } from "../../service/getData";
   
   export default {
     components: {
       headTop,
     },
     setup() {
       const guessCity = ref(""); //当前城市
       const guessCityid = ref(""); //当前城市id
       let hotcity = reactive([]); //热门城市列表
       const groupcity = ref({}); //所有城市列表
       //将获取的数据按照A-Z字母开头排序
       const sortgroupcity = computed(() => {
         let sortobj = {};
         for (let i = 65; i <= 90; i++) {
           if (groupcity.value[String.fromCharCode(i)]) {
             sortobj[String.fromCharCode(i)] =
               groupcity.value[String.fromCharCode(i)];
           }
         }
         return sortobj;
       });
   
       onMounted(() => {
         // 获取当前城市
         cityGuess().then((res) => {
           guessCity.value = res.name;
           guessCityid.value = res.id;
         });
   
         //获取热门城市
         hotcityApi().then((res) => {
           hotcity = res;
         });
   
         //获取所有城市
         groupcityApi().then((res) => {
           groupcity.value = res;
         });
       });
       const reload = () => {
         window.location.reload();
       };
       return {
         guessCity,
         guessCityid,
         hotcity,
         groupcity,
         sortgroupcity,
         reload,
       };
     },
   };
   </script>
   ```

## 08：vuex 和 vue-router 移植要点解析

1. 这里可以参照之前的`main.js`中引入`vue-router`、`vuex`，以及`router.js`、`store.js`作为参考

2. `vuex`中`store`的获取，参考文档[https://vuex.vuejs.org/zh/guide/composition-api.html](https://vuex.vuejs.org/zh/guide/composition-api.html)

   ```javascript
   import { useStore } from 'vuex'
   
   export default {
     setup () {
       const store = useStore()
     }
   }
   ```

3. `vue-router`的获取参考文档[https://router.vuejs.org/zh/guide/advanced/composition-api.html](https://router.vuejs.org/zh/guide/advanced/composition-api.html)

   ```javascript
   import { useRouter, useRoute } from 'vue-router'
   
   export default {
     setup() {
       const router = useRouter()
       const route = useRoute()
   
       function pushWithQuery(query) {
         router.push({
           name: 'search',
           query: {
             ...route.query,
           },
         })
       }
     },
   }
   ```

## 09：vue3.2 setup 语法糖升级

Vue 3.2 以后增加了 setup 语法糖，首页语法可以更改为如下

```vue
// script 标签中增加 setup 属性，代表使用 setupy 语法糖特性
<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import headTop from "../../components/header/head";
import {
  cityGuess,
  hotcity as hotcityApi,
  groupcity as groupcityApi,
} from "../../service/getData";

const guessCity = ref(""); //当前城市
const guessCityid = ref(""); //当前城市id
let hotcity = reactive([]); //热门城市列表
const groupcity = ref({}); //所有城市列表
//将获取的数据按照A-Z字母开头排序
const sortgroupcity = computed(() => {
  let sortobj = {};
  for (let i = 65; i <= 90; i++) {
    if (groupcity.value[String.fromCharCode(i)]) {
      sortobj[String.fromCharCode(i)] = groupcity.value[String.fromCharCode(i)];
    }
  }
  return sortobj;
});

onMounted(() => {
  // 获取当前城市
  cityGuess().then((res) => {
    guessCity.value = res.name;
    guessCityid.value = res.id;
  });

  //获取热门城市
  hotcityApi().then((res) => {
    hotcity = res;
  });

  //获取所有城市
  groupcityApi().then((res) => {
    groupcity.value = res;
  });
});
const reload = () => {
  window.location.reload();
};
</script>
```

