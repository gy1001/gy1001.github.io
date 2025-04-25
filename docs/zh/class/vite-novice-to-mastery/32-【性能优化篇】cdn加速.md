CDN: content delivery network 内容分发网络

我们的所有依赖以及文件在我们打包以后（npm run build）后都会放到我们的服务器上去

比如我们的服务器在深圳，你在纽约，访问这个网站，稍微有点卡

将我们依赖的第三方模块全部写成 CDN 的形式，然后保证我们代码的一个小体积（体积小服务器和客户端的传输压力就没有那么大：由于你的 lodash 是通过 CDN 加速获得的，那么你自身的体积就会小了）

[https://www.jsdelivr.com/](https://www.jsdelivr.com/)

比如 lodash，在上述页面进行搜索

[https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js](https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js)

它会根据你的访问地，就近请求获得

## 1. vite-plugin-cdn-import

[https://www.npmjs.com/package/vite-plugin-cdn-import](https://www.npmjs.com/package/vite-plugin-cdn-import)

```bash
npm install vite-plugin-cdn-import -D
```

```javascript
import { defineConfig } from 'vite'
import importToCDN from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    importToCDN({
      modules: [
        {
          name: 'lodash',
          var: '_', // 默认导出的名称
          path: '<https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.fp.min.js>' // cdn地址
        }
      ]
    }),
  ]
})
```


```js
// 步骤 会注入标签 修改rollup配置 上述注入这边
module.exports = {
  build: {
    rollupOptions: {
      external: ['lodash'],
      externalGlobal: {
        var: '_', // 默认导出的名称
        path : '<https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.fp.min.js>' // cdn地址
      },
    }
  }
}
```

[https://juejin.cn/post/7242113868554059836](https://juejin.cn/post/7242113868554059836)