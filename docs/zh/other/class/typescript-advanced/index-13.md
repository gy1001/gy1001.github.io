# 13- 运用 TS 手写 Promise 源码

## 01:【准备】Promise 的三种状态和注意细节

**Promise的三种状态**：pending resolve reject。 pending 就是等待，resolve 可以理解为成功，reject 可以理解为拒绝

**pending 状态理解**：代表等待的状态，pending 状态下，可能执行 resolve() 的方法，也肯能执行 reject() 方法。创建好 Promise 对象后，但在执行 resolve()或者 reject() 前为 Pending 状态

**resolve状态理解**：代表成功态，执行 resolve() 方法后的状态

**rejected状态理解**：代表成功态，执行 reject() 方法后的状态

**状态特性**：一旦成功了就不能失败，反过来也是一样

**then 方法**：每个 promise 都有一个 then 方法

**其他也执行 reject 的场景**：正在执行 resolve()方法报错，也进入 reject 失败状态

## 02:【 手写源码】 Promise 第一步—— Promise 回调 +then 初步 实现

课程安排

1. 实现 actiontype
2. Promise 回调实现
3. 测试类实现

### 1. 实现 actiontype

```typescript
// 新建 actiontype.ts
type ResolveType = (value: any) => void
type RejectType = (value: any) => void
type Executor = (resolve: ResolveType, reject: RejectType) => void
export { RejectType, ResolveType, Executor }
```

### 2. Promise 回调实现

```typescript
// 新建 promise.ts 
import { Executor, RejectType, ResolveType } from './actiontype'
export default class Promiose<T = any> {
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolve_executor_value!: any
  public reject_executor_value!: any
  constructor(executor: Executor) {
    this.status = 'pending' // 起始等待状态
    this.resolve = (value: any): any => {
      // 状态为初始状态时候，才会触发
      if (this.status === 'pending') {
        this.status = 'success'
        this.resolve_executor_value = value
        console.log('status change: pending => resolve', value)
      }
    }
    this.reject = (value: any): any => {
      // 状态为初始状态时候，才会触发
      if (this.status === 'pending') {
        this.status = 'fail'
        console.log('status change: pending => reject', value)
        this.reject_executor_value = value
      }
    }
    executor(this.resolve, this.reject)
  }
  
  then(resolveInThen: ResolveType, rejectInThen: RejectType) {
    if (this.status === 'success') {
      console.log('resolveInThen 被执行了')
      resolveInThen(this.resolve_executor_value)
    } else if (this.status === 'fail') {
      console.log('rejectInThen 被执行了')
      rejectInThen(this.reject_executor_value)
    }
  }
}
```

### 3. 测试类

```typescript
// 新建 test.ts
import Promiose from './Promise'

let promise = new Promiose((resolve, reject) => {
  resolve('成功了')
  reject("失败了")
})

promise.then(
  (resolve) => {
    console.log('then 函数执行成功回调')
  },
  (reject) => {
    console.log('then 函数执行失败回调')
  },
)
```

执行命令`ts-node test.ts,`可以看到如下信息

```shell
status change: pending => resolve 成功了
resolveInThen 被执行了
then 函数执行成功回调
```

## 03:【 手写源码 】 同步级联 then 方法实现

