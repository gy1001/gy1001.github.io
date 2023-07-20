# 02: 完整的写一个 Button 组件

> 热身项目，简单一个 Button 组件，感受一下整个过程

## 01: 如何完善组件单测

```shell
yarn add @testing-library/react
```

[React Testing Library 入门](https://www.jianshu.com/p/0104595b0123/)
[https://testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro)
[https://www.robinwieruch.de/react-testing-library/](https://www.robinwieruch.de/react-testing-library/)

- 组件渲染 render
- 元素查找 get/query/find
- 事件触发 fireEvent

### render

```javascript
const {
  container: HTMLDivElement, // 组件渲染的容器
  baseElement: HTMLBodyElement, // 相当于 document.body
  debug: Function, // 打印当前 DOM 解构
  rerender: Function, // 重新渲染组件
  unmount: Function, // 组件卸载
} = render(component)
```

### Queries

| search type （单个元素） | search type （多个元素） | function （查询单个元素）                                                                               |                      适用场景                      |
| :----------------------: | :----------------------: | ------------------------------------------------------------------------------------------------------- | :------------------------------------------------: |
|          getBy           |         getAllBy         | getByText、getByRole、 getByLabelText、 getByPlaceholderText、 getByAltText、 getByDisplayValue、       | 由于只返回元素或 error，适用于确定该元素存在的情况 |
|         queryBy          |        queryAllBy        | queryByText、queryByRole、queryByLabelText、queryByPlaceholderText、queryByAltText、queryByDisplayValue |                 用于元素可能不存在                 |
|          findBy          |        findAllBy         | findByText、findByRole、findByLabelText、findByPlaceholderText、 findByAltText、findByDisplayValue      |                    用于异步元素                    |

### fireEvent

> fireEvent(node, event)

```javascript
fireEvent.click(element)
fireEvent.change(screen.getByRole('textbox'), {
  target: { value: 'JavaScript' },
})
```
