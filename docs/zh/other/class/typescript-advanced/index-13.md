# 13- 运用 TS 手写 Promise 源码

## 01：Promise 的三种状态和注意细节

**Promise的三种状态**：pending resolve reject。 pending 就是等待，resolve 可以理解为成功，reject 可以理解为拒绝

**pending 状态理解**：代表等待的状态，pending 状态下，可能执行 resolve() 的方法，也肯能执行 reject() 方法。创建好 Promise 对象后，但在执行 resolve()或者 reject() 前为 Pending 状态

**resolve状态理解**：代表成功态，执行 resolve() 方法后的状态

**rejected状态理解**：代表成功态，执行 reject() 方法后的状态

**状态特性**：一旦成功了就不能失败，反过来也是一样

**then 方法**：每个 promise 都有一个 then 方法

**其他也执行 reject 的场景**：正在执行 resolve()方法报错，也进入 reject 失败状态

## 02：Promise 第一步—— Promise 回调 +then 初步 实现

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
export default class MyPromise<T = any> {
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
import MyPromise from './Promise'

let promise = new MyPromise((resolve, reject) => {
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

## 03: resolve 方法 执行失败后的处理

```typescript
export default class MyPromise<T = any> {
  constructor(executor: Executor) {
    this.resolve = (value: any): any => {
      if (this.status === 'pending') {
				// ....
        value[10] = '100' // 模拟错误
      }
    }
    this.reject = (value: any): any => {
  
    }
    try {
      // 执行函数
      executor(this.resolve, this.reject)
    } catch (error: any) {
      this.status = 'pending'
      // 失败则直接执行 reject 函数
      this.reject(error.toString())
      // throw new Error('程序终止...')
    }
  }

  then(resolveInThen: ResolveType, rejectInThen: RejectType) { }
}
```

重新执行命令`ts-node test.ts,`可以看到如下信息

```shell
status change: pending => reject TypeError: Cannot create property '10' on string '成功了'
rejectInThen 被执行了
then 函数执行失败回调
```

## 04: 同步级联 then 方法实现

1. 把上一节测试代码`value[10] = '100'`删掉

2. 修改`then`回调，实现代码如下

   ```typescript
   export default class MyPromise<T = any> {
     
     then(resolveInThen: ResolveType, rejectInThen: RejectType) {
       // 返回 Promise 
       return new Promise((resolve: ResolveType, reject: RejectType) => {
         if (this.status === 'success') {
           console.log('resolveInThen 被执行了')
           const result = resolveInThen(this.resolve_executor_value)
           resolve(result)
         } else if (this.status === 'fail') {
           console.log('rejectInThen 被执行了')
           const rejectValue = rejectInThen(this.reject_executor_value)
           reject(rejectValue)
         }
       })
     }
   }
   ```

3. 修改测试类如下

   ```typescript
   // test.ts
   import MyPromise from './Promise'
   
   let promise = new MyPromise((resolve, reject) => {
     resolve('成功了')
   })
   promise
     .then(
       (resolve) => {
         console.log('then 函数执行成功回调')
         return 'ok1'
       },
       (reject) => {
         console.log('then 函数执行失败回调')
         return 'fail1'
       },
     )
     .then(
       (resolveData2: any) => {
         console.log('第二个then 执行成功了', resolveData2)
         return 'resolve2'
       },
       (rejectData2: any) => {
         console.log('第二个then 执行失败了了', rejectData2)
         return 'reject2'
       },
     )
     .then(
       (resolveData3: any) => {
         console.log('第三个then 执行成功了', resolveData3)
         console.log('resolveData3', resolveData3)
       },
       (rejectData3: any) => {
         console.log('第三个then 执行失败了了', rejectData3)
         console.log('rejectData3', rejectData3)
       },
     )
   ```

4. 重新执行命令`ts-node test.ts,`可以看到如下信息

   ```shell
   status change: pending => resolve 成功了
   resolveInThen 被执行了
   then 函数执行成功回调
   第二个then 执行成功了 ok1
   第三个then 执行成功了 resolve2
   resolveData3 resolve2
   ```

## 05: 实现单级异步+单级 then 方法

1. 我们修改测试文件`test.ts`，代码如下

   ```typescript
   import MyPromise from './Promise'
   
   let promise = new MyPromise((resolve, reject) => {
     setTimeout(() => {
       resolve('成功了')
     }, 1000)
   })
   // 本节我们先实现单级
   promise.then(
     (resolve) => {
       console.log('then 函数执行成功回调')
       return 'ok1'
     },
     (reject) => {
       console.log('then 函数执行失败回调')
       return 'fail1'
     },
   )
   ```

2. 修改`Promise.ts`，代码如下

   ```typescript
   export default class MyPromise<T = any> {
     // 增加成功回调属性、失败回调属性
   	public resolve_then_callbacks: (() => void)[] = []
     public reject_then_callbacks: (() => void)[] = []
     
     constructor(executor: Executor) {
       this.status = 'pending'
       
       this.resolve = (value: any): any => {
         if (this.status === 'pending') {
           this.status = 'success'
           this.resolve_executor_value = value
           console.log('status change: pending => resolve', value)
           // 增加成功回调代码处理
           this.resolve_then_callbacks.forEach((callback) => {
             callback()
           })
         }
       }
       
      	this.reject = (value: any): any => {
         if (this.status === 'pending') {
           this.status = 'fail'
           console.log('status change: pending => reject', value)
           this.reject_executor_value = value
           // 增加失败回调代码处理
           this.reject_then_callbacks.forEach((callback) => {
             callback()
           })
         }
       }
     }
     // then 回调这里增加处理异步回调存储处理
     then(resolveInThen: ResolveType, rejectInThen: RejectType) {
       return new MyPromise((resolve: ResolveType, reject: RejectType) => {
         if (this.status === 'success') {
          
         } else if (this.status === 'fail') {
           
         } else if (this.status === 'pending') {
           // 存储成功回调
           this.resolve_then_callbacks.push(() => {
             let result = resolveInThen(this.resolve_executor_value)
             console.log('then中函数 resolve 参数执行的结果', result)
           })
           // 存储失败回调
           this.reject_then_callbacks.push(() => {
             let result = rejectInThen(this.reject_executor_value)
             console.log('then中函数 reject 参数执行的结果', result)
           })
         }
       })
     }
   }
   ```

3. 重新执行命令`ts-node test.ts,`可以看到如下信息

   ```shell
   status change: pending => resolve 成功了
   then 函数执行成功回调
   then中函数 resolve 参数执行的结果 ok1
   ```

## 06：实现单级异步+级联 then 方法 +难点化解

1. 修改`test.ts`,代码如下

   ```typescript
   promise
     .then(
       (resolve) => {
         console.log('then 函数执行成功回调')
         return 'ok1'
       },
       (reject) => {
         console.log('then 函数执行失败回调')
         return 'fail1'
       },
     )
     .then(
       (resolveData2: any) => {
         console.log('第二个then 执行成功了', resolveData2)
         return 'resolve2'
       },
       (rejectData2: any) => {
         console.log('第二个then 执行失败了了', rejectData2)
         return 'reject2'
       },
     )
     .then(
       (resolveData3: any) => {
         console.log('第三个then 执行成功了', resolveData3)
         console.log('resolveData3', resolveData3)
       },
       (rejectData3: any) => {
         console.log('第三个then 执行失败了了', rejectData3)
         console.log('rejectData3', rejectData3)
       },
     )
   ```

2. 修改`Promise.ts`,代码如下

   ```typescript
   export default class MyPromise<T = any> {
    
     then(resolveInThen: ResolveType, rejectInThen: RejectType) {
       return new MyPromise((resolve: ResolveType, reject: RejectType) => {
         if (this.status === 'success') {
          
         } else if (this.status === 'fail') {
           
         } else if (this.status === 'pending') {
           // 存储成功回调
           this.resolve_then_callbacks.push(() => {
             let result = resolveInThen(this.resolve_executor_value)
             console.log('then中函数 resolve 参数执行的结果', result)
             resolve(result)
           })
           // 存储失败回调
           this.reject_then_callbacks.push(() => {
             let result = rejectInThen(this.reject_executor_value)
             console.log('then中函数 reject 参数执行的结果', result)
             reject(result)
           })
         }
       })
     }
   }
   ```

3. 重新执行命令`ts-node test.ts,`定时器执行后，过一段时间, 可以看到如下信息

   ```shell
   status change: pending => resolve 成功了
   then 函数执行成功回调
   then中函数 resolve 参数执行的结果 ok1
   第二个then 执行成功了 ok1
   第三个then 执行成功了 resolve2
   resolveData3 resolve2
   ```

## 07: 构建多异步+级联 then【第一种实现方式】

1. 修改测试代码`test.ts` ,代码如下

   ```typescript
   import MyPromise from './Promise'
   
   let promise = new MyPromise((resolve, reject) => {
     setTimeout(() => {
       resolve('成功了')
     }, 1000)
   })
   
   promise
     .then(
       (resolve) => {
         console.log('then 第一个then成功了')
         // 模拟宏任务异步执行过程
         return new MyPromise((resolve) => {
           setTimeout(() => {
             resolve('第二个异步操作')
           }, 1000)
         })
       },
       (reject) => {
         console.log('then 第一个then 失败了')
         return 'fail1'
       },
     )
     .then(
       (resolveData2: any) => {
         console.log('第二个then 执行成功了', resolveData2)
         return 'resolve2'
       },
       (rejectData2: any) => {
         console.log('第二个then 执行失败了了', rejectData2)
         return 'reject2'
       },
     )
     .then(
       (resolveData3: any) => {
         console.log('第三个then 执行成功了', resolveData3)
         console.log('resolveData3', resolveData3)
       },
       (rejectData3: any) => {
         console.log('第三个then 执行失败了了', rejectData3)
         console.log('rejectData3', rejectData3)
       },
     )
   ```

2. 修改`Promise.ts`，代码如下

   ```typescript
   export default class MyPromise {
     
      then(resolveInThen: ResolveType, rejectInThen: RejectType) {
       return new MyPromise((resolve: ResolveType, reject: RejectType) => {
         if (this.status === 'success') {
           
         } else if (this.status === 'fail') {
           
         } else if (this.status === 'pending') {
           this.resolve_then_callbacks.push(() => {
             let result: any = resolveInThen(this.resolve_executor_value)
             if (isMyPromise(result)) {
               // 使用定时器来处理
               setTimeout(() => {
                 resolve(result.resolve_executor_value)
               }, 5)
             } else {
               console.log('then中函数 resolve 参数执行的结果', result)
               resolve(result)
             }
           })
           this.reject_then_callbacks.push(() => {
             let result = rejectInThen(this.reject_executor_value)
             console.log('then中函数 reject 参数执行的结果', result)
             reject(result)
           })
         }
       })    
     })
   }
   
   function isMyPromise(val: any): val is MyPromise {
     return isObject(val) && isFunction(val.then)
   }
   
   function isObject(val: any): val is Record<any, any> {
     return !!(val !== null && typeof val === 'object')
   }
   
   function isFunction(data: any): data is Function {
     return typeof data === 'function'
   }
   ```

3. 重新执行命令`ts-node test.ts,`定时器执行后，过一段时间, 可以看到如下信息

   ```shell
   // 1s 后先执行
   status change: pending => resolve 成功了
   then 第一个then成功了
   status change: pending => resolve undefined
   第二个then 执行成功了 undefined
   then中函数 resolve 参数执行的结果 resolve2
   status change: pending => resolve resolve2
   第三个then 执行成功了 resolve2
   resolveData3 resolve2
   then中函数 resolve 参数执行的结果 resolve3
   status change: pending => resolve resolve3
   
   // 5ms 后在执行
   status change: pending => resolve 第二个异步操作
   ```

## 08 优化上节代码

```typescript
// 修改 Promise.ts 
import { Executor, RejectType, ResolveType } from './actiontype'
export default class MyPromise {
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolve_executor_value!: any
  public reject_executor_value!: any
  public resolve_then_callbacks: (() => void)[] = []
  public reject_then_callbacks: (() => void)[] = []
  constructor(executor: Executor) {
    
  }

  then(resolveInThen: ResolveType, rejectInThen: RejectType) {
    return new MyPromise((resolve: ResolveType, reject: RejectType) => {
      if (this.status === 'success') {
      } else if (this.status === 'fail') {
        
      } else if (this.status === 'pending') {
        this.processManyAsyncAndSync(
          resolveInThen,
          rejectInThen,
          resolve,
          reject,
        )
      }
    })
  }

  // 执行同步或者异步
  processManyAsyncAndSync(
    resolveInThen: ResolveType,
    rejectInThen: RejectType,
    resolve: ResolveType,
    reject: RejectType,
  ) {
    this.resolve_then_callbacks.push(() => {
      let result: any = resolveInThen(this.resolve_executor_value)
      if (isMyPromise(result)) {
        setTimeout(() => {
          resolve(result.resolve_executor_value)
        }, 5)
      } else {
        console.log('then中函数 resolve 参数执行的结果', result)
        resolve(result)
      }
    })
    this.reject_then_callbacks.push(() => {
      let result = rejectInThen(this.reject_executor_value)
      console.log('then中函数 reject 参数执行的结果', result)
      reject(result)
    })
  }
}
```

