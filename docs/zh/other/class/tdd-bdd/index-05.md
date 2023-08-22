<<<<<<< Updated upstream

# 05-Vue 中的 BDD 与 集成测试

## 01: BDD 的概念以及与 TDD 的对比

### BDD

> Behavior Driven Development 行为驱动开发
>
> 先写业务逻辑代码，在基于用户行为进行测试代码的编写

### 直接写测试代码

```javascript
// /jest-vue/tests/intergration/TodoList.test.js
import { mount } from '@vue/test-utils'
import TodoList from '@/container/TodoList/TodoList.vue'
import { nextTick } from 'vue'

it(`
  1. 用户会在 header 输入框输入内容
  2. 用户会点击回车按钮
  3. 列表项应该增加用户输入内容的列表项 
`, async () => {
  const wrapper = mount(TodoList)
  const inputEl = wrapper.find('input.header-input')
  const content = '我是代办事项1'
  inputEl.setValue(content)
  inputEl.trigger('change')
  inputEl.trigger('keyup.enter')
  await nextTick()
  const listItems = wrapper.findAll('li.item')
  expect(listItems.length).toBe(1)
  expect(listItems.at(0).find('.text').text()).toBe(content)
  // 如果不想具体选择，也可以使用 toContain 方法来做判断
  // expect(listItems.at(0).text()).toContain(content)
})
```

对应的`/jest-vue/src/components/UndoList.vue` 有改动: 为元素增加一个类名，方便测试中的类选择器

![image-20230821130800903](./assets/image-20230821130800903.png)

### 对比

**TDD**

1. 先写测试在写代码
2. 一般结合单元测试使用，是白盒测试
3. 测试重点在代码
4. 安全感低
5. 速度快

### BDD

1. 先写代码再测试
2. 一般结合集成测试使用，是黑盒测试
3. 测试重点在 UI（DOM）
4. 安全感高
5. 速度慢

## 02: 使用 BDD 和集成测试进行 Vuex 项目的测试（1）

## 03: 使用 BDD 和集成测试进行 Vuex 项目的测试（2）

## 04：异步测试 (1)

## 05：异步测试(2)

## 06：路由页面的代码组织
