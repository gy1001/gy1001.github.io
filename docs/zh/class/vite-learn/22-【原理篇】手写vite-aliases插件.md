整个插件：就是在 vite 的生命周期的不同阶段去做不同的事情

比如说 vue 和 react 会给你提供一些生命周期函数

- created
- mounted

## 1. vite 官网插件 API

[https://vitejs.cn/vite3-cn/guide/api-plugin.html](https://vitejs.cn/vite3-cn/guide/api-plugin.html)

## 2. 手写 vite-aliases

我们去手写 vite-aliases 其实就是抢在 vite 执行配置文件之前去改写配置文件

[https://vitejs.cn/vite3-cn/guide/api-plugin.html#vite-specific-hooks](https://vitejs.cn/vite3-cn/guide/api-plugin.html#vite-specific-hooks)

可以看到官网在上述地址中给出了可以更改 vite config 的一个钩子

### 2.1. 在 src 目录下新建多个文件夹

- components
- views
- stores
- utils

### 2.2. 在 scr 统计目录新建 pulgins/viteAliases.js，内容如下

```
// vite的插件必须返回一个配置对象，
// 为什么必须是函数呢？因为函数的话，比较灵活，内容可以满足各种定制要求

const fs = require("fs");
const path = require("path");

function difDirAndFile(dirFiles, basePath = "") {
  const result = {
    dir: [],
    files: [],
  };
  dirFiles.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, basePath, name),
    );
    const isDirectory = currentFileStat.isDirectory();
    if (isDirectory) {
      result.dir.push(name);
    } else {
      result.files.push(name);
    }
  });

  return result;
}

function getTotalSrcDir({keyName, rootDir}) {
  const result = fs.readdirSync(path.resolve(__dirname, rootDir));
  // console.log(result) // [ '.DS_Store', 'assets', 'components', 'store', 'utils', 'views' ]
  const diffResult = difDirAndFile(result, rootDir);
  // console.log(diffResult)
  // {
  //   dir: [ 'assets', 'components', 'store', 'utils', 'views' ],
  //   files: [ '.DS_Store' ]
  // }

  const resolveAliasesObj = {};
  diffResult.dir.forEach((dirName) => {
    resolveAliasesObj[`${keyName}${dirName}`] = path.resolve(
      __dirname,
      `${rootDir}/${dirName}`,
    );
  });
  // console.log(resolveAliasesObj)
  // {
  //   '@assets': '/Users/gaoyuan/WebstormProjects/smallApp/test-vue/src/assets',
  //   '@components': '/Users/gaoyuan/WebstormProjects/smallApp/test-vue/src/components',
  //   '@store': '/Users/gaoyuan/WebstormProjects/smallApp/test-vue/src/store',
  //   '@utils': '/Users/gaoyuan/WebstormProjects/smallApp/test-vue/src/utils',
  //   '@views': '/Users/gaoyuan/WebstormProjects/smallApp/test-vue/src/views'
  // }
  return resolveAliasesObj;
}

export default function viteAliases({
  keyName = "@",
  rootDir = "../src",
} = {}) {
  return {
    config(config, env) {
      // config: 目前的一个配置对象
      // production  development  serve build yarn dev yarn build
      // env: mode: string, command: string
      // config函数可以返回一个对象, 这个对象是部分的 viteconfig 配置【其实就是你想改的那一部分】

      return {
        // 在这里我们要返回一个 resolve 出去
        resolve: {
          alias: getTotalSrcDir({keyName, rootDir}),
        },
      };
    },
  };
}
```

### 2.3. vite.config.js 中引入插件

这里我们修改 config/vite.base.config.js 文件，

```
import {defineConfig} from 'vite'
import ViteAliases from "../plugins/viteAliases"

export default defineConfig({
  plugins: [
    ViteAliases()
  ],
})
```

### 2.4. 重新运行终端，可以看到效果正常