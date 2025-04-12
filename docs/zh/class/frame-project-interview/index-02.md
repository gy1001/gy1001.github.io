# 02-课程介绍

## 01: 先看几个面试题

- 先看几个面试题，先不解答，自己思考
- 思考如何应对这些、以及所有的面试？

### Vue 面试题

- v-show 和 v-if 的面试
- 为何 v-for 中要用 key
- 描述 Vue 组件的生命周期（有父子组件的情况）
- Vue 组件如何通讯
- 描述组件渲染和更新的过程
- 双向数据绑定 v-model 的实现原理

### React 面试题

- React 组件如何通讯
- JSX 本质是什么
- context 是什么，有何用途
- shouldComponentUpdate 的用途
- 描述 Redux 单项数据流
- setState 是同步还是异步，根据实际代码

  ```javascript
  class Example extends React.Component {
    constructor() {
      super()
      this.state = { val: 0 }
    }

    componentDidMount() {
      // this.state.val 初始值是 0

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)

      setTimeout(() => {
        this.setState({ val: this.state.val + 1 })
        console.log(this.state.val)

        this.setState({ val: this.state.val + 1 })
        console.log(this.state.val)
      }, 0)
    }

    render() {
      return <p>{this.state.val}</p>
    }
  }
  ```

### 框架综合应用

1. 基于 React 设计一个 todoList （组件结构，redux state 数据结构）
2. 基于 Vue 设计一个购物车 （组件结构，vuex state 数据结构）

### Webpack 面试题

1. 前端代码为何要进行构建和打包？
2. module chunk bundle 分别事什么意思，有何区别？
3. loader plugin 的区别
4. webpack 如何实现懒加载
5. webpack 常见性能优化
6. babel-runtime 和 babel-polyfill 的区别

### 如何应对上述面试题？

- 框架的使用（基本使用，高级特性，周边插件）
- 框架的原理（基本原理的了解，热门技术的深度，全面性）
- 框架的实际应用，即设计能力（组件结构，数据结构）

### 面试官为何要这样考察？

- 保证候选人能正常工作 --- 考察使用
- 多个候选人竞争时，选择有技术追求的 --- 考察原理
- 看候选人是否能独立承担项目 --- 考察设计能力
