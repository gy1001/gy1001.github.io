# 11- 项目设计

## 01: 面试为何会考察组件和状态设计

### 组件和状态设计

- 框架（vue React）的使用（和高级特性）是必要条件
- 能独立负责项目？还是需要别人带着？-----考察设计能力
- 面试必考（二/三面），场景题

### 考察重点

- 数据驱动视图
- 状态：数据结构设计（react-state, vue-data）
- 视图：组件结构和拆分

### 回顾面试题

- React 设计 todoList （组件结构，redux state 数据结构）
- Vue 设计购物车（组件结构，vuex state 数据结构）

## 02: 状态设计的思路和要点

### React 实现 Todo List

- state 数据结构设计
- 组件设计（拆分、组合）和组件通讯
- 代码演示

### 设计原型图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30d56180a13d4651ae9ab7c5ba6d9d27~tplv-k3u1fbpfcp-watermark.image?)

### state 数据结构设计

- 用数据描述所有的内容
- 数据要结构化，易于程序操作（遍历、查找）
- 数据要可扩展，以便增加新的功能

```javascript
this.state = {
  list: [
    {
      id: 1,
      title: '标题1',
      complete: false,
    },
    // ...
  ],
}
```

## 03: 组件设计的思路和要点

### 组件设计原则

- 从功能上拆分层次
- 尽量让组件原子化
- 容器组件（只管理数据）&& UI 组件（只显示视图）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e17bb66af80f46278808ec7b68ad45f4~tplv-k3u1fbpfcp-watermark.image?)

### 组件设计

```javascript
// APP: 只负责数据管理
// Input 只负责输入，将数据结果传递给父组件
// List: 只负责列表显示，从父组件获取数据
// ListItem: 显式单条数据，删除、切换完成状态
<App>
  <Input />
  <List>
    <ListItem></ListItem>
    <ListItem></ListItem>
    <ListItem></ListItem>
    <ListItem></ListItem>
  </List>
</App>
```

## 04:React 实现 TodoList 代码演示

[代码演示](https://github.com/gy1001/Javascript/tree/main/frame-project-interview/react-code-demo/src/components/TodoLIst)

### React 实现 Todo List -- 总结

- state 数据结构设计
- 组件设计组件通讯
- 结合 redux

## 05: Vue 实现购物车-你将如何设计

- data 数据结构设计
- 组件设计和组件通讯
- 代码演示

### 设想原型图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16a6620d3eeb448aa025048a78357d51~tplv-k3u1fbpfcp-watermark.image?)

## 06: Vue 实现购物车 data 如何设计

```javascript
{
  productList: [
    {
      id: 1,
      title: '商品1',
      price: 10,
    },
    // ...
  ],
  cartList: [
    {
      id: 1,
      quantity: 1
    },
    // ...
  ]
}
```

## 07: Vue 实现购物车-组件设计和代码演示

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42828ac20f0d4f168c89949ddc15c394~tplv-k3u1fbpfcp-watermark.image?)

```javascript
// App: 管理所有数据
// ProductList：商品列表
// CartList：购物车列表和总价
<App>
  <ProductList>
    <ProductListItem></ProductListItem>
    <ProductListItem></ProductListItem>
    <ProductListItem></ProductListItem>
  </ProductList>
  <CartList>
    <CartItem></CartItem>
    <CartItem></CartItem>
  </CartList>
</App>
```

[代码演示](https://github.com/gy1001/Javascript/blob/main/frame-project-interview/vue-code-demo/src/components/Cart/index.vue)

## 08: 结合 vuex 实现购物车

[https://github.com/gy1001/Javascript/blob/main/frame-project-interview/vuex-shopping-cart-demo/app.js](https://github.com/gy1001/Javascript/blob/main/frame-project-interview/vuex-shopping-cart-demo/app.js)

## 09: 状态设计和组件设计的考点总结

- data 数据结构设计
- 组件设计和组件通讯
- 结合 redux

### data 数据结构设计

- 用数据描述所有的内容
- 数据要结构化，易于程序操作（遍历、查找）
- 数据要可扩展，以便增加新的功能

### 组件设计

- 从功能上拆分层次
- 尽量让组件原子化
- 容器组件（只管理数据）&& UI 组件（只显示视图）
