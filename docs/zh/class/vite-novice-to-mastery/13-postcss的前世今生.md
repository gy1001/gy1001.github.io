vite 天生对 postcss 有非常好的支持

## 1. postcss 执行原理

postcss 就好比一个全屋净水系统，自来水从管道先到房间的全屋净水系统，净水系统里面可以做一些插槽 -> 去除砂砾 --> 净化细菌微生物 ---> ... ---> 输送到水龙头 ---> 我们可以喝的纯净水 ( 为了保证我们喝到嘴里的水是万无一失的 )

postcss 他的工作基本和全屋净水系统一致：保证 css 在执行起来是万无一失的。

我们写的 css 代码：--> postcss -->将语法进行编译成原生 css（less或者sass） --> 再次对未来的高级 css 语法进行降级 --> 前缀补全 -->浏览器客户端

目前来说 less 和 sass 等一系列预处理器的 postcss 插件已经停止维护了，现在一般是用 less 或者 sass 编译完了，然后再交给 postcss 去处理。**所以，现在 postcss 也被很多人叫成后处理器**

js 代码：--> babel --> 将最新的 ts 语法进行转换为 js 语法 --> 做语法降级 --> 浏览器客户端执行。( babel ) 就是帮助我们让 js 执行起来万无一失。

**预处理器并不能知道浏览器的兼容性问题。**

1. 对未来的 css 属性使用一些降级问题
2. 前缀不全：例如谷歌的 --webkit

## 2. 使用 postcss

```bash
npm install postcss-cli postcss -D

npm install postcss-preset-env -D
```