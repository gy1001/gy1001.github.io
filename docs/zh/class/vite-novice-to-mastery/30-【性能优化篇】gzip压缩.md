文件资源大，静态资源进行压缩，服务器 进行压缩 ——→ 浏览器进行解压缩，nginx需要进行相应配置。此处打包是服务器下开启gzip传输，如果有服务器直接拿而不需要自己进行压缩。

**chunk 打包的js文件，块最终映射成js文件，但chunk不是js文件**

静态资源 发送直接使用 gzip 压缩文件，设置相应头 content-enconding gzip 告诉浏览器使用的压缩文件，体积不大不要用gzip

启用 gzip 后吧文件给后端或者运维

**然后前端在请求后，服务端收到响应结果，发现请求头中有 gzip 对应字段，赶紧解压，得到原来的 js 文件（浏览器要承担一定的解压时间的）如果体积不是很大的话，就不要使用 gzip 压缩了**

## 1. 使用 vite-plugin-compression 启用 gzip 压缩

```bash
npm i vite-plugin-compression
```

修改 `vite.config.ts`

```typescript
import viteCompression from 'vite-plugin-compression';

export default () => {
  return {
    plugins: [viteCompression()],
  };
};
```

## 2. 浏览器解析

压缩的代码放到服务器后，需要后端配置一些东西，浏览器才可以解析

### 2.1. Nginx服务器只需要配置

要在 Nginx 中启用 Gzip 压缩，gzip 相关配置可放在 `http{}` 或 `server{}` 或 `location{}` 层级，若不同层级有重复设置优先级为 `location{} > server{} > http{}`

```
http {
  gzip on;  //启用 Gzip 压缩。
}
```

### 2.2. nodejs 启用 gzip

以 express框架为例：

```bash
npm install compression 
npm install @types/compression --save-dev
```

```javascript
import compression from 'compression';
...
const app = express();
app.use(compression());
...
```