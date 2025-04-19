## 1. 跨域产生

同源策略：仅在浏览器发生，是浏览器的规则：http 交互默认情况下只能在同协议、同域名、同端口的两台终端进行

**发送请求的时候是不可能拦截的，因为浏览器不能确保请求的服务器地址是否允许跨域访问**

浏览器同源策略，协议 域名 端口，会先发一个options请求

浏览器请求 ——-》 自己的服务器 ——〉 请求目标服务器。 ——》 返回到浏览器

vite的开发服务器

**跨域限制是服务器已经响应了东西，但是浏览器不给你，不是说服务端没有响应**

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://www.baidu.com',
        changeOrigin: true,// 如果配置为true
        rewrite: path => path.replace(/^api/, '')
      }
    }
  }
})
```

模拟 vite 服务端做的

```javascript
if (ctx.request.url.includes('/api')) {
	// 请求目标服务器
	const target = proxy.target
	// 进行重写路径
	const rewrite = str => str
	// 路径重写
	const result = await request(target + rewrite('/api'))
	ctx.body = result
}
```

## 2. 跨域解决

### 2.1. 开发环境

我们一般就你用构建工具或者脚手架或者第三方的 proxy 代理配置，或者我们自己搭建一个开发服务器来解决这个问题

### 2.2. 生产环境

我们一般都是交给后端去跨域处理的

- nginx：代理服务
- 配置身份标识

- Access-Control-Allow-Origin: 代表那些域是我的朋友，标记了朋友以后，浏览器就不会拦截了