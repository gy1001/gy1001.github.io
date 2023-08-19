# 04-Vue 中的 TDD 与 单元测试

## 01：什么是 TDD ？

> Test Driven Development:TDD 测试驱动开发

### TDD 的开发流程

> 也叫做 Red-Green Development

1. 编写测试用例
2. 运行测试，测试用例无法通过测试
3. 编写代码，使测试用例通过测试
4. 优化代码，完成开发
5. 新增功能，重复以上步骤

### TDD 的优势

1. 长期减少回归 bug
2. 代码质量更好（阻止，可维护性高）
3. 测试覆盖率高
4. 错误测试代码不容易出现

## 02：Vue 环境中配置 Jest

1. 使用 vue-cli 初始化一个项目

   ```bash
   npm install @vue/cli -g
   vue create jest-vue // 按照相关提示选择就可以
   ```

2. 在脚手架中可以看到相关测试代码

   ```json
   // package.json
   {
      "scripts": {
        "test:unit": "vue-cli-service test:unit"
     },
   }
   ```

   ```javascript
   // jest.config.js
   module.exports = {
     preset: '@vue/cli-plugin-unit-jest'
   }
   ```

   ```javascript
   // tests/unit/example.spec.js
   import { shallowMount } from '@vue/test-utils'
   import HelloWorld from '@/components/HelloWorld.vue'
   
   describe('HelloWorld.vue', () => {
     it('renders props.msg when passed', () => {
       const msg = 'new message'
       const wrapper = shallowMount(HelloWorld, {
         propsData: { msg }
       })
       expect(wrapper.text()).toMatch(msg)
     })
   })
   ```

3. 脚手架生成的内容如下

4. 如果没有使用脚手架生成，我们可以在`package.json`中添加命令

   ```javascript
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

5. 然后执行 jest 初始化命令，生成配置文件`jest.config.js`

   ```bash
   npx jest --init
   ```

6. 然后根据需要修改`jest.config.js`

## 03：vue-test-utils 的配置及使用

1. 我们发现上一节中测试文件路径为`tests/unit/example.spec.js`,与我们之前的不是很相符，我们可以改名字为`hello.test.js`

2. 运行`npm run test:unit`后会提示没有文件匹配

   > 根据错误信息，我们可以看到默认读取的文件路径有两个，分别是
   >
   > `**/tests/unit/**/*.spec.[jt]s?(x)`
   >
   > `**/__tests__/*.[jt]s?(x) - 0 matches`

   ```text
   > vue-cli-service test:unit
   
   No tests found, exiting with code 1
   Run with `--passWithNoTests` to exit with code 0
   In /Users/yuangao/Code/Learn/MyGithub/Javascript/TDD-BDD/lesson-14/jest-vue
     11 files checked.
     testMatch: **/tests/unit/**/*.spec.[jt]s?(x), **/__tests__/*.[jt]s?(x) - 0 matches
     testPathIgnorePatterns: /node_modules/ - 11 matches
     testRegex:  - 0 matches
   Pattern:  - 0 matches
   ```

3. 我们目前的文件为`test/unit/hello.test.js`，均不符合上述正则匹配，我们可以修改`jest.config.js`，增加 testMatch选项

   ```javascript
   // jest.config.js
   module.exports = {
     preset: '@vue/cli-plugin-unit-jest',
     testMatch: [
       "**/tests/**/?(*.)+(spec|test).[jt]s?(x)"
     ]
   }
   ```

4. 再次运行`npm run test:unit`, 就可以正常通过了

接着我们看`hello.test.js`文件内容，目前看不懂，我们可以先按照简单的方式，修改为如下代码

```javascript
// hello.test.js

import  Vue from "vue"
import helloWorld from "@/components/HelloWorld.vue";

describe("测试 dom 正常渲染", () => {
  it("render props.msg when passed", () => {
    const divEl = document.createElement('div')
    divEl.className = "root"
    document.body.appendChild(divEl)
    new Vue({
      render: h => h(helloWorld),
      props: {
        msg: '我是孙悟空'
      }
    }).$mount(".root")
    expect(document.getElementsByClassName('hello').length).toBe(1)
  })
})
```

运行`npm run test:unit`后，正常通过

可以看出上面过程未免太过麻烦，那么有没有相应的工具来简化呢。当然是有的，就是`@vue/test-utils`

```javascript
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
// shallowMount: 浅层渲染，只渲染外层组件，不处理子组件中的同名属性
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    // wrapper 还有很多其他的属性、方法
    expect(wrapper.text()).toMatch(msg)
  })
})
```

[shallowmount 官方文档](https://v1.test-utils.vuejs.org/zh/api/#shallowmount)

## 04：使用 TDD 的方式开发 Header 组件(1)

### 写测试相关代码

```javascript
// jest-vue/tests/unit/Header.test.js
import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

const wrapper = shallowMount(Header)
const input = wrapper.find('input[data-test="input"]')

describe('TodoList.vue', () => {
  it('Header 包含 input', () => {
    expect(input.exists()).toBe(true)
  })

  it('Header中 input的初始值为空', () => {
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })

  it('Header中 input输入内容时数据更新', () => {
    input.setValue('hello world')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('hello world')
  })

  it('Header 中input 框输入回车时候，无内容时，无反应', () => {
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })

  it('Header 中input 框输入回车时候，有内容时，向外触发事件 add, 并清空 inputValue', () => {
    input.setValue('111')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.vm.inputValue).toBe('')
  })
})
```

### 写代码实现部分

```vue
<!-- jest-vue/src/components/Header.vue -->
<template>
  <div class="hello">
    <input
      type="text"
      data-test="input"
      v-model="inputValue"
      @keyup.enter="handlerAdd"
    />
  </div>
</template>

<script>
export default {
  name: 'hello-world',
  props: {
    msg: String,
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    handlerAdd() {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    },
  },
}
</script>
```

## 05：使用 TDD 的方式开发 Header 组件(2)

### 写测试相关代码

```javascript
// /jest-vue/tests/unit/TodoList.test.js
import { shallowMount } from '@vue/test-utils'
import TodoList from '@/container/TodoList/TodoList.vue'
const wrapper = shallowMount(TodoList)

describe('测试 TodoList 组件', () => {
  it('TodoLis 组件初始化时，undoList 应该是空的', () => {
    expect(Array.isArray(wrapper.vm.undoList)).toBeTruthy()
    expect(wrapper.vm.undoList.length).toBe(0)
  })

  it('TodoLis 执行 addItem 的时候，会增加一个内容', () => {
    const str = 'i am first todo'
    wrapper.vm.addItem(str)
    expect(wrapper.vm.undoList.length).toBe(1)
    expect(wrapper.vm.undoList[0]).toBe(str)
  })
})
```

### 书写代码实现部分

```vue
<!-- jest-vue/src/container/TodoList/TodoList.vue -->
<template>
  <div>
    <TodoHeader @add="addItem"></TodoHeader>
    {{ undoList }}
  </div>
</template>

<script>
import TodoHeader from '@/components/Header.vue'
export default {
  name: 'todo-list',
  components: {
    TodoHeader,
  },
  data() {
    return {
      undoList: [],
    }
  },
  methods: {
    addItem(value) {
      this.undoList.push(value)
    },
  },
}
</script>

<style lang="stylus" scoped></style>
```

## 06：Header 组件样式新增及快照测试

`app.vue`中增加样式

```css
*{
  margin: 0;
  padding: 0;
}
```

`header.vue`中增加如下样式

```vue

<template>
  <div class="header">
    <div class="header-content">
      TodoList
      <input
        class="header-input"
        placeholder="请输入待办事项"
        type="text"
        data-test="input"
        v-model="inputValue"
        @keyup.enter="handlerAdd"
      />
    </div>
  </div>
</template>
<style scoped lang="stylus">
.header{
  background-color: #666;
  line-height: 60px;
  .header-content{
    width: 600px;
    margin: 0 auto;
    color: #fff;
    font-size: 24px;
    .header-input{
      float: right;
      width: 360px;
      margin-top :16px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
  }
}
</style>
```

`header.test.js`中增加如下页面

```javascript
it('header 样式发生改变，做提示', () => {
  expect(wrapper).toMatchSnapshot() // 进行快照测试
})
```

`npm run test:unit`运行后，文件中会多一个`jest-vue/tests/unit/__snapshots__/Header.test.js.snap`文件，内容如下

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Header.vue header 样式发生改变，做提示 1`] = `
<div class="header">
  <div class="header-content">
    TodoList
    <input placeholder="请输入待办事项" type="text" data-test="input" class="header-input">
  </div>
</div>
`;
```

当页面中 ui 结构发生变化时，再次运行会提示报错