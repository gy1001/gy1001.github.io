# 20-事件轮询：如何理解浏览器中的 EventLoop？

上一讲我们探讨了 JavaScript 引擎的内存管理及垃圾回收机制，那么这一讲依然要讨论和 JS 引擎相关的 Eventloop，我会带你深入理解 JavaScript 引擎所做的工作。

我会先讲解浏览器端的 Eventloop 的运行机制，待你对浏览器端有了一定的理解之后，再带你设计一些 Node.js 的 Eventloop 的底层逻辑。

你可以发现，无论是浏览器端还是服务端，都在使用 Eventloop，虽然两者机制不同，但都利用了 JavaScript 语言的单线程和非阻塞的特点。希望你能扎实地掌握这部分内容，因为这对你在工作中编写高性能的 JavaScript 代码有所帮助。

那么依照惯例，在课程开始前请你先思考两个问题：

- 浏览器端的 Eventloop 起到了什么作用？
- Node.js 服务端的 Eventloop 的作用又表现在哪？

现在开始跟着我一起探究浏览器端的 Eventloop 吧。

## 1. 浏览器的 Eventloop

Eventloop 是 JavaScript 引擎异步编程背后需要特别关注的知识点。JS 在单线程上执行所有操作，虽然是单线程，但是能够高效地解决问题，并能给我们带来一种“多线程”的错觉，这其实是通过使用一些比较合理的数据结构来达到此效果的。我们一起来看下 JavaScript 引擎背后都有哪些东西在同时运转。

1.**调用堆栈（call stack）负责跟踪所有要执行的代码**。每当一个函数执行完成时，就会从堆栈中弹出（pop）该执行完成函数；它遵循 stack 的数据结构特性，后进先出，如果有代码需要进去执行的话，就进行 push 操作，如下图所示：

![img](./assets/1745313941108-e1f1af13-9514-4277-8d8f-849ed94fca5b.png)

2.**事件队列（event queue）负责将新的 function 发送到队列中进行处理**。它遵循 queue 的数据结构特性，先进先出，在该顺序下发送所有操作以进行执行。如下图所示：
![img](./assets/1745313941549-c3008fc8-8363-4e4f-b7de-484f91392a3c.png)
3.**每当调用事件队列（event queue）中的异步函数时，都会将其发送到浏览器 API**。根据从调用堆栈收到的命令，API 开始自己的单线程操作。其中 setTimeout 方法就是一个比较典型的例子，在堆栈中处理 setTimeout 操作时，会将其发送到相应的 API，该 API 一直等到指定的时间将此操作送回进行处理。它将操作发送到哪里去呢？答案是事件队列（event queue)。这样，就有了一个循环系统，用于在 JavaScript 中运行异步操作。

4.**JavaScript 语言本身是单线程的，而浏览器 API 充当单独的线程**。事件循环（Eventloop）促进了这一过程，它会不断检查调用堆栈是否为空。如果为空，则从事件队列中添加新的函数进入调用栈（call stack）；如果不为空，则处理当前函数的调用。我们把整个过程串起来就是这样的一个循环执行流程，如下图所示： 

### 1.1. JS 引擎的全局流程图

![img](./assets/1745313941978-942a0c16-cfcc-4c73-bfd1-b7e312d61a8e.png)
通过上面这张图就能很清晰地看出调用栈、事件队列以及 Eventloop 和它们之间相互配合的关系。

那么看完了 JS 引擎的全局流程图，我们再看看 Eventloop 的内部都有哪些东西呢？简单来说 Eventloop 通过内部两个队列来实现 Event Queue 放进来的异步任务。以 setTimeout 为代表的任务被称为宏任务，放到宏任务队列（macrotask queue）中；而以 Promise 为代表的任务被称为微任务，放到微任务队列（microtask queue）中。我们来看一下日常工作中经常遇到的哪些是宏任务，哪些是微任务，如下所示。

### 1.2. macrotasks(宏任务):

script(整体代码),setTimeout,setInterval,setImmediate,I/O,UI rendering,event listener 

### 1.3. microtasks(微任务):

process.nextTick, Promise.then, Object.observe, MutationObserver

我把主要的宏任务和微任务都列了出来，其实 Eventloop 在处理宏任务和微任务的逻辑其实还是有些不一样的，执行的情况大致如下：

JavaScript 引擎首先从宏任务队列（macrotask queue）中取出第一个任务；

执行完毕后，再将微任务（microtask queue）中的所有任务取出，**按照顺序分别全部执行（这里包括不仅指开始执行时队列里的微任务），如果在这一步过程中产生新的微任务，也需要执行**；

然后再从宏任务队列中取下一个，执行完毕后，再次将 microtask queue 中的全部取出，循环往复，直到两个 queue 中的任务都取完。

**总结起来就是：一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。**

关于宏任务和微任务暂时先说到这里，更详细的内容我会在“21 | 引擎进阶（上）：探究宏任务&微任务的运行机制”中详细讲解。

那么初步看完了浏览器中 Eventloop 的情况，我们再来看下在 Node.js 服务端的 Eventloop 是怎么运作的。

## 2. Node.js 的 Eventloop

### 2.1. Node.js 服务端 Eventloop

关于在 Node.js 服务端 Eventloop，[Node.js 官网](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)是这么描述的：

When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the REPL, which is not covered in this document) which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.

简单翻译过来就是：**当 Node.js 开始启动时，会初始化一个 Eventloop**，处理输入的代码脚本，这些脚本会进行 API 异步调用，process.nextTick() 方法会开始处理事件循环。下面就是 Node.js 官网提供的 Eventloop 事件循环参考流程。
![img](https://cdn.nlark.com/yuque/0/2025/png/1358855/1745313941775-e948663e-2b0c-4629-9ad9-e39d6acee01f.png)
整个流程分为六个阶段，当这六个阶段执行完一次之后，才可以算得上执行了一次 Eventloop 的循环过程。
我们来分别看下这六个阶段都做了哪些事情。

- Timers 阶段：这个阶段执行 setTimeout 和 setInterval。
- I/O callbacks 阶段：这个阶段主要执行系统级别的回调函数，比如 TCP 连接失败的回调。
- idle，prepare 阶段：只是 Node.js 内部闲置、准备，可以忽略。
- poll 阶段：poll 阶段是一个重要且复杂的阶段，

几乎所有 I/O 相关的回调，都在这个阶段执行（除了setTimeout、setInterval、setImmediate
以及一些因为 exception 意外关闭产生的回调），
这个阶段的主要流程如下图所示。
![img](https://cdn.nlark.com/yuque/0/2025/png/1358855/1745313942157-e6efe5e0-7a71-444d-b8dc-15310de70289.png)

- check 阶段：执行 setImmediate() 设定的 callbacks。
- close callbacks 阶段：执行关闭请求的回调函数，比如 socket.on(‘close’, …)。

除了把 Eventloop 的宏任务细分到不同阶段外。

### 2.2. 新的任务队列 Process.nextTick()

node 还引入了一个新的任务队列 Process.nextTick()。根据官方文档的解释：

process.nextTick()is not technically part of the event loop. Instead, thenextTickQueuewill be processed after the current operation is completed, regardless of the current phase of the event loop. Here, an operation is defined as a transition from the underlying C/C++ handler, and handling the JavaScript that needs to be executed.

可以认为，Process.nextTick() 会在上述各个阶段结束时，在进入下一个阶段之前立即执行（优先级甚至超过 microtask 队列）

### 2.3. Node.js 和浏览器端:宏任务队列的另一个很重要的不同点是:

- 浏览器端任务队列每轮事件循环仅出队一个回调函数接着去执行微任务队列；
- 而 Node.js 端只要轮到执行某个宏任务队列，则会执行完队列中所有的当前任务，但是当前轮次新添加到队尾的任务则会等到下一轮次才会执行。

这部分比较绕，你需要多琢磨几遍。那么讲完了 Eventloop，你以为可能就够用了，但是很快你就会发现，Eventloop 也会影响到渲染，下面的内容也许对你有帮助。

## 3. EventLoop 对渲染的影响

### 3.1. requestAnimationFrame: 高级版的 setInterval

想必你之前在业务开发中也遇到过 requestIdlecallback 和 requestAnimationFrame，这两个函数在我们之前的内容中没有讲过，但是当你开始考虑它们在 Eventloop 的生命周期的哪一步触发，或者这两个方法的回调会在微任务队列还是宏任务队列执行的时候，才发现好像没有想象中那么简单。**这两个方法其实也并不属于 JS 的原生方法，而是浏览器宿主环境提供的方法**，因为它们牵扯到另一个问题：**渲染**。

我们知道浏览器作为一个复杂的应用是**多线程工作**的，除了运行 JS 的线程外，还有**渲染线程、定时器触发线程、HTTP 请求线程，**等等。JS 线程可以读取并且修改 DOM，而渲染线程也需要读取 DOM，这是一个典型的多**线程竞争临界资源的问题**。所以**浏览器就把这两个线程设计成互斥的，即同时只能有一个线程在执行**。

渲染原本就不应该出现在 Eventloop 相关的知识体系里，但是因为 Eventloop 显然是在讨论 JS 如何运行的问题，而渲染则是浏览器另外一个线程的工作。但是 [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) 的出现却把这两件事情给关联起来，你可以看下 RAF 的英文解释：

requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.

通过调用 requestAnimationFrame 我们可以在下次渲染之前执行回调函数。那下次渲染具体是哪个时间点呢？渲染和 Eventloop 有什么关系呢？我们在 HTML协议对 Eventloop 的规范 里找到了答案。简单来说，就是在每一次 Eventloop 的末尾，判断当前页面是否处于渲染时机，就是重新渲染。而这个所谓的渲染时机是这样定义的：

Rendering opportunities are determined based on hardware constraints such as display refresh rates and other factors such as page performance or whether the page is in the background. Rendering opportunities typically occur at regular intervals.

有屏幕的硬件限制，比如 60Hz 刷新率，简而言之就是 1 秒刷新了 60 次，16.6ms 刷新一次。这个时候浏览器的渲染间隔时间就没必要小于 16.6ms，因为就算渲染了屏幕上也看不到。当然浏览器也不能保证一定会每 16.6ms 会渲染一次，因为还会受到处理器的性能、JavaScript 执行效率等其他因素影响。

**回到 \****requestAnimationFrame，这个 API 保证在下次浏览器渲染之前一定会被调用**，实际上我们完全可以把它看成是一个高级版的 setInterval。它们**都是在一段时间后执行回调**，但是前者的间隔时间是由浏览器自己不断调整的，而后者只能由用户指定。这样的特性也决定了 requestAnimationFrame 更适合用来做针对每一帧来修改的动画效果。

当然 **requestAnimationFrame 不是 Eventloop 里的宏任务**，或者说它并不在 Eventloop 的生命周期里，只是浏览器又开放的一个在渲染之前发生的新的 hook。另外需要注意的是微任务的认知概念也需要更新，在执行 animation callback 时也有可能产生微任务（比如 promise 的 callback），会放到 animation queue 处理完后再执行。所以微任务并不是像之前说的那样在每一轮 Eventloop 后处理，而是在 JS 的函数调用栈清空后处理。

### 3.2. requestIdlecallback

但是 requestIdlecallback 却是一个更好理解的概念。**当宏任务队列中没有任务可以处理时，浏览器可能存在“空闲状态”。这段空闲时间可以被 requestIdlecallback 利用起来执行一些优先级不高、不必立即执行的任务**，
如下图所示：
![img](./assets/1745313941822-8a9e69be-f402-40e1-9f94-9ced6e3cac1f.png)
当然为了防止浏览器一直处于繁忙状态，导致 requestIdlecallback 可能永远无法执行回调，它还提供了一个额外的 timeout 参数，为这个任务设置一个截止时间。浏览器就可以根据这个截止时间规划这个任务的执行。

## 4. 总结

那么现在让你回答我在开头提出的两个问题，你能准确说出来吗？回过头到文中仔细看看，相信不难回答。

到这里，你基本就能理解 Eventloop 在不同的端上的情况了。
虽然说 Eventloop 本身并不是一个难理解的概念，但是由于 JS 不同平台的实现的差异，让这个知识点很难一下说清楚，因此我就拿出这一讲带你来分析 Eventloop。希望你可以反复琢磨这一概念，将它理解透彻。

下一讲我们来聊聊 JS 的代码是如何被编译执行的。如果本讲的内容对你有帮助，就留言和我说说你的学习感悟吧。我们下一讲再见。