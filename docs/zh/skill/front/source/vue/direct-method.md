# 源码探秘之指令和生命周期

## 1、基本框架的搭建

1. 执行以下命令

   ```shell
   mkdir vue-direcitve-method
   cd vue-direcitve-method
   npm install webpack webpack-cli webpack-dev-server --save-dev
   npm install html-webpack-plugin --save
   ```

2. 新建`webpack.config.js`文件，内容如下

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const path = require('path')

   module.exports = {
     mode: 'development',
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
   }
   ```

3. 修改`package.json`,添加脚本

   ```javascript
   {
     ...
     "scripts": {
       "dev": "webpack server"
     }
   }
   ```

4. 新建`src/index.html`和`src/index.js`文件，内容就是基本的内容（自定义）

5. 执行运行命令`npm run dev`,就可以打开浏览器输入地址，看到效果了

## 2、逻辑分析以及代码展示

1. 逻辑分析
   - 本章节涉及到之前课程的内容，比如：`Watcher、Dep、observe、Observer、defineReactive`等等函数
   - 新内容可能涉及到编译模板的内容，循环遍历子节点(涉及到递归子节点)，然后判断节点类型是文本类型、还是元素类型
   - 具体代码可以参考 [mini-vue 章节的代码](../../mini-frame/mini-vue.md)，这里就不在赘述了
