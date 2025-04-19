vite 官网搭建 vite 项目文档教程

[https://vitejs.cn/vite3-cn/guide/#scaffolding-your-first-vite-project](https://vitejs.cn/vite3-cn/guide/#scaffolding-your-first-vite-project)

## 1. npm create vite 执行过程

- **初始化项目脚手架创建流程**：当你在命令行中执行 `npm create vite` 时，实际上是在调用 `create-vite` 这个脚手架工具。`npm create` 是 npm 7.0.0 及更高版本提供的一个快捷方式，用于快速启动一个由 `create-<package-name>` 命名的脚手架工具。在这种情况下，`package-name` 就是 `vite`。
- **模板选择与交互**：

- 首先，`create-vite` 会引导你进行一系列交互。它会询问你项目的名称，默认使用当前目录名。
- 接着，它会展示一系列可用的模板选项，例如 `vanilla`（原生 JavaScript）、`vue`、`react`、`preact`、`lit-html`、`svelte` 等。这些模板为不同的前端框架或技术栈提供了预配置的项目结构。
- 对于某些模板，可能还会有进一步的子选项，比如选择 Vue 模板时，可能会询问你要使用的 Vue 版本（如 Vue 2 或 Vue 3）。

- **项目创建与安装依赖**：

- 根据你选择的模板，`create-vite` 会在指定目录（默认是当前目录下以项目名命名的新目录）创建一个项目结构。这个结构包含了该模板预定义的文件和目录，例如对于 Vue 模板，会有 `src` 目录用于存放源代码，`public` 目录用于存放静态资源，以及 `package.json` 文件来管理项目依赖等。
- 完成项目结构创建后，`create-vite` 会自动运行 `npm install`（如果你的环境中安装了 npm）或 `yarn install`（如果你的环境中安装了 yarn）来安装项目所需的依赖包。这些依赖包是模板项目正常运行所必需的，例如对于 Vue 项目，会安装 `vue`、`vite` 以及相关的开发依赖如 `@vitejs/plugin -vue` 等。

## 2. `create-vite` 和 `vite` 的关系

- **功能分工**：

- `create-vite` 是一个脚手架工具，其主要职责是帮助开发者快速搭建基于 Vite 的项目。它提供了一种便捷的方式来初始化项目结构，选择合适的模板，并安装必要的依赖，让开发者可以迅速开始项目开发。它专注于项目的初始化阶段。
- `vite` 本身是一个前端构建工具，主要用于开发和构建前端应用程序。在开发阶段，它利用 ES 模块的动态导入特性实现快速的按需编译和热更新，显著提升开发体验；在生产阶段，它使用 Rollup 进行高效的打包，生成优化后的代码。`vite` 负责项目开发过程中的构建和运行相关的任务。

- **依赖关系**：

- `create-vite` 创建的项目通常依赖 `vite` 作为其构建工具。也就是说，通过 `npm create vite` 创建的项目，在其 `package.json` 文件中会将 `vite` 列为开发依赖或生产依赖（取决于模板的配置）。
- 项目后续的开发和构建流程会借助 `vite` 来完成，而 `create-vite` 只是项目初始化的起点。

例如，通过 `npm create vite my-project --template vue` 创建一个 Vue 项目后，在 `my-project` 目录下的 `package.json` 文件中会看到 `vite` 被列为依赖，项目开发时运行 `npm run dev` 实际就是在调用 `vite` 来启动开发服务器。

## 3. 比如当我们敲了 `npm create vite`

1. 帮我们全局安装了一个东西： create-vite(vite 的脚手架)
2. 直接运行这个 create-vite bin 目录下的一个执行配置

有一个误区：**认为官网中使用对应的 yarn create 构建项目的过程也是 vite 在做的事情**。 这是错误的。

create-vite 内置了 vite，就相当于之前 vue-cli 内置了 webpack 一样

create-vite 预设了一套最佳实践的配置，开箱即用