# 13-通关：前端工程化脚手架设计

## 01: 为什么需要前端工程化脚手架？

### 背景

思考下面几个问题

* 前端项目为什么需要使用脚手架

  * 提供：创建项目、项目运行、项目框架、项目打包、项目发布等一系列能力，提升研发效率，简化复杂流程
  * 如果我们没有脚手架时怎么使用 vue？
    * 创建项目：拷贝或者下载项目模板 VS **交互式项目创建**（询问自主选择）
    * 项目运行和打包：编写 webpack 配置、启动和启动脚本 VS **项目脚手架自动启动和打包命令**
    * 项目框架：手动完成 VUe 全家桶引入和框架搭建 VS **自动生成框架模板代码**

* Vue-Cli 和 CRA（Create-React-App）有什么局限

  * 只能解决本技术域的问题，不同技术域就需要生产不同的脚手架

* 如果解决大前端团队底层工程链路的统一问题

  * 技术栈

    ```mermaid
    graph LR;
    大前端 --> APP--> ReactNative
    大前端 --> 小程序--> Taro
    大前端 --> Web
    大前端 --> 组件库
    
    Web --> 移动端 --> Technology
    Web --> PC端 --> Technology
    
    组件库 --> Technology
    
     subgraph Technology
        Vue
        React
       end
    ```

    

  * 需要生产统一的工程化脚手架，解决项目创建、运行、打包、项目模板代码等问题

    ```mermaid
    graph LR;
       大前端-->project
       subgraph project
         APP
         小程序
         Web
         组件库
       end
        project--> imooc-cli
        project--> imooc-build
      subgraph imooc-cli
        项目创建
        项目发布
       end
       subgraph imooc-build
        项目启动
        项目打包
       end
    ```

    











































