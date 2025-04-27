上一节课，我们介绍了两种读取命令行参数的方式：`process.argv`和第三方库`command-line-args`。这一节课，为了让程序可以和用户交互，我们将学习两种命令行交互的方式：`process.stdin`和`readline`模块。

## 用户的输入与监听

在命令行运行时，通过 process 模块的 stdin 对象可以获取用户输入。stdin 是一个异步模块，它通过监听输入时间并执行回调来处理用户输入，因此它的使用方式和之前那些模块有些区别。我们先通过一个简单的例子体会下它的用法。

```js
console.log('请输入一个要求和的整数，以0结束输入');

process.stdin.setEncoding('utf8');

let sum = 0;
process.stdin.on('readable', () => {
  const chunk = process.stdin.read(); // 获取当前输入的字符，包含回车
  const n = Number(chunk.slice(0, -1));
  sum += n;
  if(n === 0) process.stdin.emit('end');
  process.stdin.read(); // 再调用一次，返回的是null，并继续监听
});

process.stdin.on('end', () => {
  console.log(`求和结果是：${sum}`);
});
```

上面的代码是一个累加求和的交互程序，依次累加用户输入的数值，直到输入 0 为止，然后打印累加的结果。它执行的效果如下：

![](https://p4.ssl.qhimg.com/t01cd056009030ce833.jpg)

`process.stdin.setEncoding('utf8')`表示将用户交互的编码设定为`utf-8`，如果你要输入中文，这个必须要设置。

当用户输入字符串并回车，注册在`process.stdin`对象上的`readable`事件就会被触发。然后，在这个事件回调函数中，我们可以通过`process.stdin.read()`读取用户输入的数字（用户的输入是字符串类型，所以需要对它进行类型转换）。注意，在这个回调函数中，当我们对输入的数字完成加法操作后，我们又调用了一次`process.stdin.read()`方法，这是为什么呢？

这是因为`process.stdin.read()`从标准输入流中读取内容，如果有内容，就会把读到的内容返回，如果没有内容，则会返回 null，并继续处于`readable`状态，监听下一次输入。所以如果我们不在`readable`事件回调函数里多调用一次`process.stdin.read()`，它只会将读到的内容返回，不会继续监听下一次输入。

第一次读取出来的值是用户输入的字符串和末尾的回车，我们通过`chunk.slice(0, -1)`把最后的回车符抛弃掉，把前面的内容通过`Number`转为数值，就拿到了我们要的输入结果。

如果这个数值是 0，我们通过`process.stdin.emit('end')`派发一个结束输入的事件，然后在`process.stdin.on`监听`end`事件中，输出求和结果。`process.stdin`是异步的，它继承`EventEmitter`对象，能够派发和监听事件。关于异步编程和EventEmitter，在后续的课程中会有详细介绍。

了解了`process.stdin`的用法之后，我们再用它来实现用户交互过程。

## 实现文章生成器的交互过程

首先，我们设计一个问题数据结构：

```js
[
  {text: '请输入文章主题', value: title},
  {text: '请输入最小字数', value: 6000},
  {text: '请输入最大字数', value: 10000},
]
```

它是一个数组，包含了 3 个问题对象，属性 text 是问题的文字描述，value 表示问题的默认值。然后根据问题，我们实现一个 interact.js 的模块，让它接受我们定义好的一系列问题，并等待用户一一回答：

```js
// interact.js
export function interact(questions) {
  // questions 是一个数组，内容如 {text, value}
  process.stdin.setEncoding('utf8');

  return new Promise((resolve) => {
    const answers = [];
    let i = 0;
    let {text, value} = questions[i++];
    console.log(`${text}(${value})`);
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read().slice(0, -1);
      answers.push(chunk || value); // 保存用户的输入，如果用户输入为空，则使用缺省值
      const nextQuestion = questions[i++];
      if(nextQuestion) { //如果问题还未结束，继续监听用户输入
        process.stdin.read();
        text = nextQuestion.text;
        value = nextQuestion.value;
        console.log(`${text}(${value})`);
      } else { // 如果问题结束了，结束readable监听事件
        resolve(answers);
      }
    });
  });
}
```

如果用户回答了当前问题，还有下一个问题，就等待下一次`readable`事件，否则就`resolve`当前的 promise。

💡注意，这里我们采用了和上一个例子不一样的结束监听方式。上一个例子中，我们使用`process.stdin.emit('end')`发送一个结束事件来结束`readable`事件的监听。这里，我们利用异步机制—— Promise 来结束用户输入的监听事件。

然后，我们可以在`index.js`中，通过`async/await`方式，等待用户回答所有问题后，再进行文章生成的操作：

```js
const corpus = loadCorpus('corpus/data.json');
let title = options.title || createRandomPicker(corpus.title)();

(async function () {
  if(Object.keys(options).length <= 0) {
    const answers = await interact([
      {text: '请输入文章主题', value: title},
      {text: '请输入最小字数', value: 6000},
      {text: '请输入最大字数', value: 10000},
    ]);
    title = answers[0];
    options.min = answers[1];
    options.max = answers[2];
  }

  const article = generate(title, {corpus, ...options});
  const output = saveCorpus(title, article);

  console.log(`生成成功！文章保存于：${output}`);
}());
```

![](https://p4.ssl.qhimg.com/t015e026b29951f7bba.jpg)

这样我们就实现了用户互动的方式完成文章生成器。

### process.stdout.write

除了`process.stdin.read`之外，对应的还有`process.stdout.write`可以向终端输出字符，不过在这个例子里我们并没有用到。这是因为，`process.stdout.write`在命令行终端里效果基本上和`console.log`一样，区别是`console.log`支持多个参数，且能够格式化字符串并自动输出回车符。也就是说，`console.log`基本上可以替代`process.stdout.write`功能且更强大，所以我们就基本上不需要使用`process.stdout.write`了。

不过，如果我们不希望输出回车换行到终端，那还是可以使用`process.stdout.write`的。

## 使用 readline 模块

用 process.stdin 实现命令行交互，需要在`readable`事件中多调一次`process.stdin.read()`方法，这看起来似乎很奇怪，代码的可读性不高。幸好，node.js 为我们提供了一个比 process.stdin 更好用的内置模块—— readline，它是专门用来实现可交互命令行的。

我们用它来改写一下`interact.js`模块：

```js
import readline from 'readline';

function question(rl, {text, value}) {
  const q = `${text}(${value})\n`;
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
}

export async function interact(questions) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answers = [];
  for(let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q); // 等待问题的输入
    answers.push(answer);
  }
  rl.close();
  return answers;
}
```

这段代码中，我们通过`readline.createInterface`创建一个可交互的命令行对象。然后，我们遍历`questions`数组，等待每一个问题的答案，并将答案存放在`answers`数组中`readline.createInterface`返回的对象有一个`question`方法，它是个异步方法，接受一个问题描述和一个回调函数 —— 用于接受用户的输入。

我们每次输出一个提问并等待用户输入答案，所以将它封装成一个返回 Promise 的异步方法：

```js
function question(rl, {text, value}) {
  const q = `${text}(${value})\n`;
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
}
```

这么写的话，代码量虽然和直接使用`process.stdin`差不多，但可读性要好很多。

## 总结

这一节课，我们介绍了 process.stdin 和 readline 模块的使用，让我们的文章生成器应用实现了交互式的命令行功能。

process 模块是一个比较常用的内置模块，我们学完了 process 的 argv、stdin 和 stdout 的基本用法。在后续的课程中，我们还会继续用到这些 API，以及 process 模块的其他 API。

readline 模块是用来实现交互式命令行的，对于编写需要在终端与用户交互的 JavaScript 应用有很大帮助，在后续工程化主题里，我们还会使用它来实现一个自动化的项目脚手架。

至于 process 和 readline 模块的其他内容，如果你有兴趣可以查看 [Node.js 官方文档](https://nodejs.org/dist/latest-v13.x/docs/api)。

到这里为止，我们的文章生成器功能就全部实现了。我们在这个项目使用了`ES Modules`。使用这个新的规范有一个好处，就是我们可以直接在浏览器中加载并使用同样的模块，因为最新的Chrome浏览器已经支持了`ES Modules`规范。

在下一节课中（加餐部分），我们将暂时偏离一下 Node.js 的主题，来看看如何在浏览器中复用我们写的代码，给这个应用添加一个网页版。
