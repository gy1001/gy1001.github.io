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