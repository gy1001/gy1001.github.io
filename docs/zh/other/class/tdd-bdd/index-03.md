# 03-Jest难点进阶

> 本章主要讲解 Jest中 snapshot 以及高级 mock 技巧，帮助大家深入理解在不同情况下，如何使用高级知识点完成不同的测试需求。

## 01: snapshot 快照测试

### toMatchSnapshot

第一次进行快照测试后，会保存一个快照文件。再次进行快照测试后，会检测新的快照是否与之前保存的快照文件相匹配。如果不匹配，就会进行报错提示
比如如下代码

```javascript
// demo.js
export const generateConfig = () => {
  return {
    server: "http://localhost",
    port: 8080
  }
}
```

对应的测试文件

```javascript
// demo.test.js
import { generateConfig } from "./demo"

test('测试 generateConfig 函数', () => {
  expect(generateConfig()).toEqual({
    server: "http://localhost",
    port: 8080
  })
})
```

此时如果运行`npm run test`就会通过

以上过程未免过于麻烦，比如：如果更改了`demo.js`中的配置信息，我们需要相应的在`demo.test.js`中进行修改，过于繁琐，使用快照测试就可以避免这种麻烦

修改`demo.test.js`文件

```javascript
// demo.test.js
import { generateConfig } from "./demo"

test('测试 generateConfig 函数', () => {
  expect(generateConfig()).toMatchSnapshot()
})
```

此时如果运行`npm run test`就会通过，并产生一个`__snapshots__/demo.test.js.snap`文件，内容如下

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`测试 generateConfig 函数 1`] = `
{
  "port": 8080,
  "server": "http://localhost",
}
`;
```

此时如果更改了`demo.js`文件，比如改为如下代码

```javascript
export const generateConfig = () => {
  return {
    server: "http://localhost",
    port: 8081 // 更改为 8081
  }
}
```

再次运行`npm run test`,就会报错，错误如下

![image-20230817120502602](./assets/image-20230817120502602.png)

后面还有一句话: 检查你的代码更改的或者 运行`npm test --u` 来更新他们，使下次测试不会报错

```text
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `npm test -- -u` to update them.
```

如果我们的代码中有一个动态数据，比如如下

```javascript
// demo.js
export const generateAppConfig = () => {
  return {
    server: "http://localhost",
    port: 8082,
    time: new Date() // 每次运行测试，都是一个新的时间
  }
}
```

```javascript
// demo.test.js
test( '测试 generateAppConfig 函数', () => {
  expect(generateAppConfig()).toMatchSnapshot();
})
```

对于上述代码，我们执行`npm run test`还是`npm run test -u` 后再次运行`npm run test`，结果都是测试不通过。因为时间和快照时间不一致，那么怎么办呢？我们需要更改测试代码如下

```javascript
test( '测试 generateAppConfig 函数', () => {
  expect(generateAppConfig()).toMatchSnapshot({
    time: expect.any(Date) // 这样再次进行快照测试时候，只要类型一致即可
  })
})
```

再次运行`npm run test` 测试就通过了

### toMatchInlineSnapshot

> 内联快照和普通快照(`.snap` 文件)表现一致，只是会将快照值自动写会源代码中。 这意味着你可以从自动生成的快照中受益，并且不用切换到额外生成的快照文件中保证值的正确性。

```javascript
// demo.test.js
test('测试 generateConfig InlineSnapShot', () => {
  expect(generateConfig()).toMatchInlineSnapshot()
})

test('测试 generateConfig InlineSnapShot', () => {
  expect(generateAppConfig()).toMatchInlineSnapshot()
})
```

执行完`npm run test` 你会发现，他没有在快照的单独文件中体现，而是在测试文件中体现，内容如下

```javascript
test('测试 generateConfig InlineSnapShot', () => {
  expect(generateConfig()).toMatchInlineSnapshot(`
    {
      "port": 8081,
      "server": "http://localhost",
    }
  `)
})

test('测试 generateAppConfig InlineSnapShot', () => {
  expect(generateAppConfig()).toMatchInlineSnapshot({
    time: expect.any(Date) // 这样再次进行快照测试时候，只要类型一致即可
  }, `
  {
    "port": 8082,
    "server": "http://localhost",
    "time": Any<Date>,
  }
  `)
})
```

## 02: mock 深入学习



## 03: mock timers



## 04:【讨论题】Jest 中的 Mock得实现

## 05: ES6 中类的测试

## 06: Jest 中对 DOM 节点操作的测试
