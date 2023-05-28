# 07-如果不用 vue，react 框架，如何操作 DOM？

## 01: 玩转Node节点：不应被忽视的 nodeType

```html
<!DOCTYPE html>
<html lang="en">

<body>
  <!--标题-->
  <div> JavaScript<span>进阶</span>
  </div>
</body>

</html>
```

### 对应的对象模型

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/108a02db0d0b4194a54a9305842de35e~tplv-k3u1fbpfcp-watermark.image?)

### 手写查看继承关系的方法

```javascript
function getParents(el) {
  if (typeof el !== 'object' || el === null) {
    throw new Error('el应该是一个对象')
  }
  var _el = el
  var result = []
  while (_el.__proto__ !== null) {
    result.push(_el.__proto__.constructor.name)
    _el = _el.__proto__
  }
  return result
}
```

运行如下代码

```javascript
getParents(document)
['HTMLDocument', 'Document', 'Node', 'EventTarget', 'Object']

getParents(document.createElement("span"))
(6) ['HTMLSpanElement', 'HTMLElement', 'Element', 'Node', 'EventTarget', 'Object']

getParents(new Text(123))
(5) ['Text', 'CharacterData', 'Node', 'EventTarget', 'Object']
```

### Node的 nodeType

* 元素节点：例如 div span等
* 文本：对象模型：Text
* 注释：对象模型：Comment
* 文档：对象模型：Document
* 文档类型：对象模型：DocumentType
* 文档碎片；对象模型 DocumentFragment

| 常量                               | 值   | 描述                                                         |
| :--------------------------------- | :--- | :----------------------------------------------------------- |
| `Node.ELEMENT_NODE`                | `1`  | 一个 [`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点，例如 [`p`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 和 [`div`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)。 |
| `Node.ATTRIBUTE_NODE`              | `2`  | [`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的耦合 [`属性`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr)。 |
| `Node.TEXT_NODE`                   | `3`  | [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 或者 [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr) 中实际的 [`文字`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) |
| `Node.CDATA_SECTION_NODE`          | `4`  | 一个 [`CDATASection`](https://developer.mozilla.org/zh-CN/docs/Web/API/CDATASection)，例如 `<!CDATA[[ … ]]>`。 |
| `Node.PROCESSING_INSTRUCTION_NODE` | `7`  | 一个用于 XML 文档的 [`ProcessingInstruction` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) ，例如 `<?xml-stylesheet ... ?>` 声明。 |
| `Node.COMMENT_NODE`                | `8`  | 一个 [`Comment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment) 节点。 |
| `Node.DOCUMENT_NODE`               | `9`  | 一个 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 节点。 |
| `Node.DOCUMENT_TYPE_NODE`          | `10` | 描述文档类型的 [`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType) 节点。例如 `<!DOCTYPE html>` 就是用于 HTML5 的。 |
| `Node.DOCUMENT_FRAGMENT_NODE`      | `11` | 一个 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 节点 |

### Text: 3 

* 神秘空白的文本节点
* 使用 childNodes 访问
* 使用 nodeValue 访问

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="root"> 啊哈 <span>我们一起学Javascript</span>
  </div>
</body>

</html>
```

```javascript
// 上述有几个节点呢？
root.childNodes
NodeList(3) [text, span, text] // 第三个是一个空白节点
```

### 有趣的拆家和合并

* splitText: 拆家
* Element.normalize

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="div1"> 我们一起学Javascript </div>
  <div>
    <button id="btnSplit">拆分</button>
    <button id="btnNormalize">合并</button>
  </div>
  <script>
    const div1El = document.getElementById("div1")
    btnSplit.addEventListener("click", function () {
      div1El.firstChild.splitText(5)
      console.log(div1El.childNodes.length) // 2
    })
    btnNormalize.addEventListener("click", function () {
      div1El.normalize()
      console.log(div1El.childNodes.length) // 1
    })

  </script>
</body>

</html>
```

### Comment: 8

* 注释为 `<!--`和`-->`之间的内容
* nodeValue 获取其内容

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="div1"> DIV1内容啊 </div>
  <script>
    var cEl = new Comment("这是注释啊")
    div1.appendChild(cEl)
    console.log("注释内容:", cEl.nodeValue); // 注释内容: 这是注释啊
  </script>
</body>

</html>
```

### Document: 9

```javascript
getParents(document)
['HTMLDocument', 'Document', 'Node', 'EventTarget', 'Object']
```

#### Document 重要的方法和属性

* 节点的查找，document.querySelector document.querySelectorAll 等等
* 节点集合信息，document.all、document.forms、document.scripts、document.images、document.links 等等 
* cookie: document.cookie

### XMLDocument

```xml
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        var parser = new DOMParser()
        var xmlDoc = parser.parseFromString(`
            <xml>
                <persons>
                    <person>
                        <name>小明</name>
                        <age>18</age>
                    </person>
                    <person>
                        <name>小红</name>
                        <age>19</age>
                    </person>
                </persons>
            </xml>
        `, "text/xml")

        console.log("constructor:", xmlDoc.__proto__.constructor); // constructor: ƒ XMLDocument() { [native code] }
    </script>
</body>

</html>
```

```xml
// 解析
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        var parser = new DOMParser()
        var xmlDoc = parser.parseFromString(`
            <xml>
                <persons>
                    <person>
                        <name>小明</name>
                        <age>18</age>
                    </person>
                    <person>
                        <name>小红</name>
                        <age>19</age>
                    </person>
                </persons>
            </xml>
        `, "text/xml")

        console.log("constructor:", xmlDoc.__proto__.constructor)  //constructor: ƒ XMLDocument() { [native code] }
        const persons = xmlDoc.querySelectorAll("person")

        const personsJSON = Array.from(persons).map(function (node) {
            return {
                name: node.querySelector("name").childNodes[0].nodeValue,
                age: node.querySelector("age").childNodes[0].nodeValue
            }
        })

        console.log("personsJSON:", personsJSON) // personsJSON: Array(2)
    </script>
</body>

</html>
```

### DocumentType: 10

* 访问方式：document.doctype、document.firstChild
* 有用的属性只有一个，就是 name. 返回值的 “html”

### DocumentFragment: 11

* 就像标准的 document 一样，存储由节点（nodes）组成的文档结构
* 所有的节点都会被一次插入到文档中，而这个操作仅发生一个重渲染的操作
* 常用作批量创建大量节点，提高性能

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <button id="btnBatch">批量创建</button>
        <button id="btnSingle">单独创建</button>
    </div>
    <div id="root" style="height:500px; overflow:auto;">
    </div>
    <script type="text/javascript">
        var items = Array.from({ length: 10000 }, (v, i) => ({
            name: "name" + i,
            age: i,
            sex: i % 2
        }))

        var rootEl = document.getElementById("root")
        function createByS() {
            console.time("createByS")
            items.forEach(function (item) {
                var div = document.createElement("div")
                div.innerHTML = `name:${item.name} - age: ${item.age} - sex: ${item.sex}`
                rootEl.appendChild(div)
            })
            console.timeEnd("createByS")
        }

        function createByB() {
            console.time("createByB")
            var fragment = document.createDocumentFragment()
            items.forEach(function (item) {
                var div = document.createElement("div")
                div.innerHTML = `name:${item.name} - age: ${item.age} - sex: ${item.sex}`
                fragment.appendChild(div)
            })
            rootEl.appendChild(fragment)
            console.timeEnd("createByB")
        }

        btnBatch.addEventListener("click", createByB)
        btnSingle.addEventListener("click", createByS);

    </script>
</body>

</html>
```

### Elment系列：1

* 创建方式：document.createElement
* children(nodeType = 1)和childNodes(全部)
* 获取属性 getAttribute, 设置属性值 setAttribute

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="root">
        <!-- 注释--> 文本1 <span>aa</span>
    </div>
</body>

</html>
```

```javascript
root.children
HTMLCollection [span]

root.childNodes
NodeList(5) [text, comment, text, span, text]
```

### 手写代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>

        // 创建 注释节点
        var commentEl = new Comment("标题")
        document.body.appendChild(commentEl)

        // 创建div
        var divEl = document.createElement("div")

        // 属性复制
        divEl.setAttribute("title", "div的title")
        // 设置样式
        divEl.style.backgroundColor = "red"

        // 添加文本
        divEl.appendChild(new Text("JavaScript"))
        // 创建span
        var spanEl = document.createElement("span")
        spanEl.textContent = "进阶"

        divEl.appendChild(spanEl)
        // 添加到body
        document.body.appendChild(divEl);

    </script>
</body>

</html>
```

## 02：玩转Node节点：查询和遍历，5种方式无敌手

### Node 和 Element

* Node 是一个接口，我们称其为节点吧
* Element 是通用性的基类，nodeType 为1，是Node的一类实现，其子类我们统称为元素
* Node 还有很多其他的实现，比如文本、注释等

### HTMLCollection 和 NodeList

* HTMLCollection: Element 子类的集合
* NodeList：所有 Node 子类的集合
* 我们约定：HTMLCollection 是元素集合，NodeList 是节点列表

### getElementById

* 作用：根据元素的id属性值进行节点查询，返回单一元素
* 属于高效的查询
* 语法：document.getElementById(id)

### getElementById 的注意事项

* 只返回元素，nodeType 为 1 的 Element
* id 是大小敏感的字符串
* 如果有多个元素有相同 id, 只返回第一个元素
* 此方法仅仅存在 Document 的实例上，常见于 document 上

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
  <div id="root"></div>
  <div id="Root"></div>
  <script>
    var log = console.log
    // 只获得一个
    log("root:", document.getElementById("root"))
    // 区分大小写
    log("Root.id:", document.getElementById("Root").id)
  </script>
</body>

</html>
```

### getElementsByClassName

* 作用：根据指定的类名查询元素
* 语法：document.getElementsByClassName(names)
* 语法：rootElement.getElementsByName(names)

### getElementsByClassName 的注意事项

* 返回结果是**实时**元素的集合，但是不是数组
* 可以同时匹配多个 class, class 类名通过空格分隔。匹配的是 and 的关系
* 元素均拥有此方法，不限于 document

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="outer" id="outer">
    <ul class="list list-1">
      <li class="item item2 item3">list-one</li>
      <li class="item">list-two</li>
      <li class="item">list-three</li>
    </ul>
  </div>
  <div class="outer2" id="outer"></div>
  <script>
    var log = console.log
    // Element可以调用
    const items2 = document.getElementById("outer").getElementsByClassName("item")
    // 多个class
    const items3 = document.getElementsByClassName("item item3")
    console.log(items2) // HTMLCollection(3) [li.item.item2.item3, li.item, li.item]
    console.log(items3) // HTMLCollection [li.item.item2.item3]
  </script>
</body>
</html>
```

### getElementsByName

* 作用：根据指定的 name 属性查询元素
* 语法：语法：document.getElementsByName(name)

### getElementsByName 的注意事项

* 返回的是 实时 的节点集合 NodeList
* 包括不能被解析的节点
* 此方法仅仅存在 Document 的实例上，常见于 document 上

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="outer" id="outer">
        <ul class="list list-1">
            <li name="li-item" class="item item2 item3">list-one</li>
            <li class="item">list-two</li>
            <li class="item">list-three</li>
        </ul>
    </div>
    <div class="outer2" id="outer"></div>
    <ccc name="ccc">ccc</ccc>
    <script>
        var log = console.log
        // Element 上不存在调用
        var getElementsByName = document.getElementById("outer").getElementsByName
        console.log("getElementsByName:", getElementsByName) // getElementsByName: undefined
        // 查询能被解析的节点
        var items3 = document.getElementsByName("ccc")
        console.log(items3) // NodeList(1)
    </script>
</body>

</html>
```

### getElementsByTagName

* 作用：根据指定的标签查询元素
* 语法：document.getElementsByTagName(tagName)

### getElementsByTagName 的注意事项

* 返回的是实时的元素集合
* tagName 可以是 *，代表所有元素
* Webkit 旧版本内核的浏览器中可能返回的是一个 NodeList

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="outer" id="outer">
        <ul class="list list-1">
            <li name="li-item" class="item item2 item3">list-one</li>
            <li class="item">list-two</li>
            <li class="item">list-three</li>
        </ul>
    </div>
    <div class="outer2" id="outer"></div>
    <ccc name="ccc">ccc</ccc>
    <script>
        var log = console.log
        var outerEl = document.getElementById("outer")
        // Element也有此方法
        var items2 = outerEl.getElementsByTagName("li")
        // 查询能被解析的节点
        var items3 = document.getElementsByTagName("ccc")
        // 功效等同于 document.all
        console.log(document.getElementsByTagName("*").length === document.all.length) // true

    </script>
</body>

</html>
```

### querySelector

* 作用：根据 css 选择器进行节点查询，返回匹配的第一个元素 Element
* 语法：document.querySelector(selectors)

### querySelector 的注意事项

* 仅仅返回匹配的第一个元素 Element
* 如果传入的不是有效的 CSS 选择器字符串，会抛出异常。故不是绝对安全的方法
* 元素均有此方法，不限于 document
* 注意 css 选择器字符串的转义字符

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="outer" id="outer">
        <ul class="list list-1">
            <li name="li-item" class="item item2 item3">list-one</li>
            <li class="item">list-two</li>
            <li class="item">list-three</li>
        </ul>
    </div>
    <div class="outer2" id="outer"></div>
    <div id="foo\bar">ccc</div>
    <script>
        var log = console.log

        var outerEl = document.getElementById("outer")
        // Element也有此方法
        var items2 = outerEl.querySelector("li")
        // 你必须将它转义两次（一次是为 JavaScript 字符串转义，另一次是为 querySelector 转义）
        var items3 = document.querySelector("#foo\\\\bar") // <div id="foo\bar">ccc</div>

        // 不满足css选择器，异常
        var items4 = document.querySelector("sdasd:::sdsd") // 抛出异常

    </script>
</body>

</html>
```

### querySelectorAll

* 根据 css 选择器进行节点查询，返回节点列表 NodeList

### querySelectorAll 的注意事项

* 其返回的是静态的 NodeList, 随后对 DOM 元素的改动不会影响其集合的内容
* querySelectorAll 可能返回的不是你期望的值，定心丸：scope
* 元素均有此方法，不限于 document

```html
// querySelectorAll static
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="outer" id="outer">
        <ul class="list list-1">
            <li name="li-item" class="item item2 item3">list-one</li>
            <li class="item">list-two</li>
            <li class="item">list-three</li>
        </ul>
    </div>
    <div class="outer2" id="outer"></div>
    <div id="foo\bar">ccc</div>
    <script>
        var nodeList = document.querySelectorAll(".item")
        console.log("len:", nodeList.length)  // 3

        // 添加新的元素
        var liEl = document.createElement("li")
        liEl.className = "item"
        liEl.innerHTML = "list-for"
        document.querySelector(".list").appendChild(liEl)

        console.log("len:", nodeList.length) //3 

        console.log("query again:", document.querySelectorAll(".item").length) // query again: 4
    </script>
</body>

</html>
```

```html
// querySelectorAll scope
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="outer">
    <div class="select">
      <div class="inner">
      </div>
    </div>
  </div>
  <script>
    var select = document.querySelector('.select')
    var inner = select.querySelectorAll('.outer .inner')
    console.log("inner.length:", inner.length) // 1, not 0!

    var select2 = document.querySelector('.select')
    var inner2 = select.querySelectorAll(':scope .outer .inner')
    console.log("inner2.length:", inner2.length) // 0
  </script>
</body>

</html>
```

### 动态

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="outer" id="outer">
        <ul class="list list-1">
            <li name="li-item" class="item item2 item3">list-one</li>
            <li class="item">list-two</li>
            <li class="item">list-three</li>
        </ul>
    </div>
    <div class="outer2" id="outer"></div>
    <div id="foo\bar">ccc</div>
    <script>
        var nodeList = document.getElementsByClassName("item")
        console.log("len:", nodeList.length)  // 3

        // 添加新的元素
        var liEl = document.createElement("li")
        liEl.className = "item"
        liEl.innerHTML = "list-for"
        document.querySelector(".list").appendChild(liEl)

        console.log("len:", nodeList.length) //4 

    </script>
</body>

</html>
```

### 汇总

| 方法名                 | 单个元素 | 节点列表 | 元素集合 | 元素也拥有 | 实时更新 |
| ---------------------- | -------- | -------- | -------- | ---------- | -------- |
| getElementById         | 是       |          |          |            |          |
| querySelector          | 是       |          |          | 是         |          |
| getElementsByClassName |          |          | 是       | 是         | 是       |
| getElementsByName      |          | 是       |          |            | 是       |
| getElementsByTagName   |          |          | 是       | 是         | 是       |
| querySelectorAll       |          | 是       |          | 是         |          |

### 一些特殊查询属性

* document.all 所有的元素
* document.images 所有的图片元素
* document.forms 所有的 form 表单元素
* document.scripts 所有脚本元素
* document.links 所有具有 href 的 area(热点) 和 a 元素
* documents.fonts 所有字体
* document.styleSheets 所有css 的 link 和 style 元素

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="/static/css/main.55b68e13.chunk.css" rel="stylesheet">
    <style>
        html,
        body {}
    </style>
</head>

<body>
    <script>
        console.log("document.styleSheets:", document.styleSheets);
    </script>
</body>

</html>
```

### 怎么查询伪元素

* 答案：不能
* 但是你可以通过 window.getComputedStyle 来获取其样式

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <style>
    .nihao::before {
        content: '你好，';
    }
  </style>
  <div class="nihao" id="nihao"> Tom </div>
  <script>
    var content = window.getComputedStyle(nihao, "before")["content"]
    console.log(content); // "你好，"
  </script>
</body>
</html>
```

### 元素集合和 NodeList 遍历

* for/while 遍历
* NodeList.prototype.forEach 
* 转为数组遍历：Array.from、Array.prototype.slice，拓展运算符等

### 某个节点/元素所有子节点/元素遍历

* children 或者 childNodes

* NodeIterator 或者 TreeWalker

### NodeIterator VS TreeWalker

* TreeWalker 是 NodeIterator 的一个更高级的版本
* 额外支持一些方法：parentNode, firstChild，lastChild, nextSibling

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="outer" id="outer">
    <!-- 测试-->
    <ul class="list list-1">
      <li name="li-item" class="item item2 item3">list-one</li>
      <li class="item">list-two</li>
      <li class="item">list-three</li>
    </ul>
  </div>
  <div class="outer2" id="outer"></div>
  <div id="foo\bar">ccc</div>
  <script>
    const iterator = document.createNodeIterator(
      document.getElementById("outer"),
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          return node.tagName === 'LI' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }
      }
    )
    var currentNode
    while (currentNode = iterator.nextNode()) {
      console.log(currentNode.innerText)
    }

  </script>
</body>nk,

</html>
```

### 总结

#### 查询

* getElementById
* querySelector
* getElementsByClassName
* getElementsByName
* getElementsByTagName
* querySelectorAll

### 遍历

#### 元素集合和NodeList比那里

* for/while遍历
* NodeList.prototype.forEach 
* 转为数组遍历：Array.from、Array.prototype.slice，拓展运算符等

#### 某个节点/元素所有子节点/元素遍历

* children 或者 childNodes

* NodeIterator 或者 TreeWalker

## 03：玩转Node节点：增加，删除，克隆以及如何避免内存泄漏

### 节点创建和挂载

* 创建了节点，未加入文档，是没有任何视觉效果的
* 第一步：创建
* 第二步：挂载

### 显式创建节点

* 对象模型直接 new 
* document.create系列

```javascript
var commentNode = new Comment("注释")
var textNode = new Text("文本")
document.body.append(commentNode)
document.body.append(textNode);
```

```javascript
var el = document.createElement("div")
var commentNode = document.createComment("注释")
var textNode = document.createTextNode("文本")
var fragment = document.createDocumentFragment()
fragment.append('fragment创建的节点')

el.appendChild(textNode)

document.body.appendChild(el)
document.body.appendChild(commentNode)
document.body.appendChild(fragment);
```

### 节点挂载

* Node API 的挂载
* Element API 的挂载

### Node 节点的挂载

* appendChild: 将一个节点附加到指定父节点的子节点列表的末尾
* insertBefore: 在参考节点之前插入一个拥有指定父节点的子节点
* replaceChild: 指定的节点替换当前节点的一个子节点，并返回被替换掉的节点
* textContent: 一个节点及其后代的文本内容

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2.0 Node对象的方法</title>
</head>

<body>
  <div style="margin-left: 50px;">
    <button id="btnAppendChild">appendChild</button>
    <button id="btnInsertBefore">insertBefore</button>
    <button id="btnReplaceChild">replaceChild</button>
    <button id="btnTextContent">textContent</button>
  </div>
  <div style="margin:50px">
    <div id="buttons">
      <button id="btnBase">基准按钮</button>
    </div>
    <div id="contents">
      <span id="textContent">基础文本</span>
    </div>
  </div>
  <script>

    btnAppendChild.addEventListener("click", function (e) {
      var btn = document.createElement("button")
      btn.textContent = "appendChild"
      // parentNode.appendChild();
      buttons.appendChild(btn)
    })

    btnInsertBefore.addEventListener("click", function (e) {
      var btn = document.createElement("button")
      btn.textContent = "btnInsertBefore"
      // 语法： var insertedNode = parentNode.insertBefore(newNode, referenceNode);
      buttons.insertBefore(btn, btnBase)
    })

    btnReplaceChild.addEventListener("click", function () {
      var btn = document.createElement("button")
      btn.textContent = "replaceChild"
      // parentNode.replaceChild(newChild, oldChild);
      buttons.replaceChild(btn, btnBase)
    })

    btnTextContent.addEventListener("click", function () {
      textContent.textContent = "textContent"
    })

  </script>
</body>

</html>
```

### Element 挂载节点

1. after: 在该节点之后插入一组 Node
2. before: 在该节点之后插入一组 Node
3. append: 在节点最后一个子节点插入一组 Node
4. prepend: 在节点的第一个子节点之前插入一组 Node
5. insertAdjacentElement: 将节点插入给定的一组 Node
6. insertAdjacentHTML: 将文本解析为节点并插入到给定的位置
7. insertAdjacentText: 将文本节点插入到给定的位置
8. replaceChildren: 将后代替换为指定节点
9. replaceWith: 将后代替换为指定节点集合

#### after before append prepend

```html
// after before append prepend
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2.0 Node对象的方法</title>
</head>

<body>
  <div style="margin-left: 50px;">
    <button id="btnAfter">after</button>
    <button id="btnBefore">before</button>
    <button id="btnAppend">append</button>
    <button id="btnPrepend">prepend</button>
  </div>
  <div style="margin:50px">
    <div id="buttons">
      <button id="btnBase">基准按钮</button>
    </div>
  </div>
  <script>

    btnAfter.addEventListener("click", function (e) {
      var btn = document.createElement("button")
      btn.textContent = "after button"
      // Element.after(...nodesOrDOMStrings);
      btnBase.after(btn, "after text")
    })

    btnBefore.addEventListener("click", function (e) {
      var btn = document.createElement("button")
      btn.textContent = "before button"
      // Element.before(...nodesOrDOMStrings);
      btnBase.before(btn, "before text")
    })

    btnAppend.addEventListener("click", function () {
      var btn = document.createElement("button")
      btn.textContent = "append button"
      // Element.append(...nodesOrDOMStrings)
      buttons.append(btn, "append text")
    })

    btnPrepend.addEventListener("click", function () {
      var btn = document.createElement("button")
      btn.textContent = "prepend button"
      // Element.prepend(...nodesOrDOMStrings)
      buttons.prepend(btn, "prepend text")
    })

  </script>
</body>
</html>
```

#### insertAdjacentElement、insertAdjacentHTML 、insertAdjacentElement

* 参照节点是自身，一次只能插入一个节点
* 三个方法节点一定要求是：元素，字符串，文本字符串
* 参照位置
  * beforebegin
  * afterbegin
  * beforeend
  * afterend

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="parent">
    <div class="child">child</div>
  </div>
  <script>
    function createDiv(content) {
        var el = document.createElement("div")
        el.innerHTML = content
        return el
    }

    var pEl = document.querySelector(".parent")
    pEl.insertAdjacentElement("afterbegin", createDiv("afterbegin"))
    pEl.insertAdjacentElement("afterend", createDiv("afterend"))
    pEl.insertAdjacentElement("beforebegin", createDiv("beforebegin"))
    pEl.insertAdjacentElement("beforeend", createDiv("beforeend"));
  </script>
</body>

</html>
```

#### replaceChildren、replaceWith

* 都是全面替换子节点
* 参数多多个节点或者字符串

### appendChild 与 append

| 方法        | 参数                          | 返回值    | 来源              |
| ----------- | ----------------------------- | --------- | ----------------- |
| appendChild | Node 节点                     | Node 节点 | Node.prototype    |
| append      | 一组 Node 或者 DOMString 对象 | void      | Element.prototype |

### innerHTML 与 innerText

* innerHTML: 批量创建并生成节点
* innerText: 生成文本节点。本质就是 HTMLElement 上的属性

### 删除节点：单个

* Node.removeNode
* Element.remove
* outerHTML 或者 innerHTML
* Document.adoptNode

### 删除节点：批量

* innerHTML & outerHTML
* replceChildren 和 replaceWith
* 循环删除

```javascript
// 循环删除节点
function clearChildNodes(node) {
  // node.firstChild
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild)
  }
}
```

### 节点克隆

* Node.cloneNode
  * 克隆节点
  * 分为浅克隆、深克隆
* Document.importNode
  * 从外部文档引入节点
  * 可引入节点的后代节点
  * 源节点被保留
* Document.adoptNode
  * 从其他文档获取节点
  * 节点和后代节点会从源节点删除
* Element.innerHTML
* 实际上 textConnt 和 innerText 也具备一定的复制能力
* 节点复制不能复制的 DOM2 事件，一定程序上能复制 DOM0 级别的事件
* importNode 和 adoptNode 在同文档内操作也生效

```html
// iframe
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title></title>
  <style>
    * {
      font-size: 20px;
    }
  </style>
</head>

<body>
  <div id="content1"> content1 <div>child1</div>
    <div>child2</div>
  </div>
  <div id="content2"> content2 <div>child1</div>
    <div>child2</div>
  </div>
</body>

</html>
```

```html
// adoptNode/importNode
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <div style="display: flex">
    <div style="flex: 0 0 200px">
      <div>
        <button id="btnImportNode">importNode content1</button>
        <button id="btnAdoptNode">adoptNode content2</button>
      </div>
      <div id="container1"></div>
    </div>
    <div>
      <iframe src="./iframe.html" id="ifr"></iframe>
    </div>
  </div>
  <script>

    // importNode
    btnImportNode.addEventListener("click", function () {
      var node = document.importNode(ifr.contentWindow.document.querySelector("#content1"), true)
      container1.append(node)
    })


    // adoptNode
    btnAdoptNode.addEventListener("click", function () {
      var node = document.adoptNode(ifr.contentWindow.document.querySelector("#content2"))
      container1.append(node)
    });
  </script>
</body>

</html>
```

### 内存泄露

* 全局作用域：三思而后行
* console.log: 天降横祸
* 闭包：拈花惹草要小心
* eval: 真像个恶魔

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
  <script>
    // 泄漏
    var root = document.getElementById("root")
    var el = document.createElement("div")
    el.appendChild(new Text("我是文本"))
    root.appendChild(el)

    const wkRef = new WeakRef(el)

    console.log("删除节点")
    root.removeChild(el)
    // console.log(el) 在回收之前，又实用 conosle.log 执行了一下次打印，一直不会回收
    // el = null 置为空以后才会走: el已回收

    setInterval(() => {
      if (wkRef.deref()) {
        console.log("el未回收")
      } else {
        console.log("el已回收")
      }
    }, 2000);

  </script>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="root">
    <button id="btnTest">测试的按钮</button>
  </div>
  <div>
    <button type="button" id="btnRemove">删除按钮</button>
  </div>
  <script>

    ; (function () {

      var btnTest = document.getElementById("btnTest")

      function onClick() {
        console.log("被点击了")
      }

      const wkRef = new WeakRef(onClick)

      btnTest.addEventListener("click", onClick)
      btnRemove.addEventListener("click", function () {
        root.innerHTML = ""
      })

      // 哦豁
      console.log("btnTest", btnTest)
      setInterval(() => {
        if (wkRef.deref()) {
          console.log("onClick未回收")
        } else {
          console.log("onClick已回收")
        }
      }, 2000)

    })();

  </script>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="root">
  </div>
  <div>
    <button type="button" id="btnRemove">删除按钮</button>
  </div>
  <script>

    ; (function () {

      function onClick() {
        console.log("被点击了")
      }

      var wkRefDom
      class TestUtils {
        constructor() {
          this.root = document.getElementById("root")
          this.btnRemove = document.getElementById("btnRemove")
          this.initButton()
        }

        initButton() {
          const btnTest = document.createElement("button")
          btnTest.textContent = "测试的按钮"
          btnTest.addEventListener("click", onClick)

          wkRefDom = new WeakRef(btnTest)

          this.btnTest = btnTest

          this.root.appendChild(this.btnTest)
          btnRemove.addEventListener("click", () => {
            this.removeBtn()
          })
        }

        removeBtn() {
          this.btnTest.removeEventListener("click", onClick)
          this.root.removeChild(this.btnTest)
          this.btnTest = null
          // 闭包的锅
          onClick = null
        }
      }
      var utils = new TestUtils()

      const wkRefEvent = new WeakRef(onClick)

      setInterval(() => {
        console.log(`btnTest ${wkRefDom.deref() ? "未回收" : "回收"}`)

        console.log(`onClick ${wkRefEvent.deref() ? "未回收" : "回收"}`)

      }, 2000)

    })();

  </script>
</body>

</html>
```

```html
// eval
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
  <script>
    ; (function init() {
      // 泄漏
      var root = document.getElementById("root")
      var el = document.createElement("div")
      el.appendChild(new Text("我是文本"))
      root.appendChild(el)

      const wkRef = new WeakRef(el)

      console.log("删除节点")
      root.removeChild(el)

      setInterval(() => {
        if (wkRef.deref()) {
          console.log("el未回收")
        } else {
          console.log("el已回收")
        }
      }, 2000)

      setTimeout(function () {
        eval('')
      }, 10000000)
    })()
  </script>
</body>

</html>
```

### 总结

#### 批量删除

* outerHTML、innerHTML
* 循环删除

#### 创建节点

* 对象模型直接 new
* document.create 系列

#### 删除节点

* Node.removeNode
* Element.remove
* outerHTML、innerHTML
* Document.adoptNode

#### 节点复制

* Node.cloneNode
* Document.importNode
* Document.adoptNode
* Element.innerHTML

#### Element 对象的方法

* after、befor
* append、prepend
* insertAdjacent 系列
* replaceChildren、replacWith
* innerHTML、innerText

#### Node 对象的方法

* appendChild
* insertBefore
* replaceChild
* textContet

### 性能

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>

<body>
  <div>
    <button id="btnAdd">单个新增</button>
    <button id="btnBatchAdd">批量新增</button>
    <button id="btnClone">克隆</button>
    <button id="btnInnerHTML">innerHTML</button>
  </div>
  <div style="height:600px; overflow-y: auto;" id="container">
    <div>
      <div>name</div>
      <div>des</div>
    </div>
  </div>
  <script>

    const count = 1000

    function addSingle() {
      console.time("addSingle")
      for (let i = 0; i < count; i++) {
        var el = document.createElement("div")
        var elName = document.createElement("div")
        var elDes = document.createElement("div")

        elName.textContent = "name" + i
        elDes.textContent = "des" + i
        el.append(elName, elDes)
        container.appendChild(el)
      }
      console.timeEnd("addSingle")
    }
    btnAdd.addEventListener("click", addSingle)


    function addBatch() {
      console.time("addBatch")

      var fragment = document.createDocumentFragment()
      for (let i = 0; i < count; i++) {
        var el = document.createElement("div")
        var elName = document.createElement("div")
        var elDes = document.createElement("div")
        elName.textContent = "name" + i
        elDes.textContent = "des" + i
        el.append(elName, elDes)
        fragment.appendChild(el)
      }
      container.appendChild(fragment)
      console.timeEnd("addBatch")
    }
    btnBatchAdd.addEventListener("click", addBatch)

    function addClone() {
      console.time("addClone")
      // 不是 firstChild
      const baseEL = container.firstElementChild

      var fragment = document.createDocumentFragment()
      for (let i = 0; i < count; i++) {
        var el = baseEL.cloneNode(true)
        // 节点访问
        el.children[0].textContent = "name" + i
        el.children[1].textContent = "des" + i
        fragment.appendChild(el)
      }
      container.appendChild(fragment)
      console.timeEnd("addClone")
    }

    btnClone.addEventListener("click", addClone)

    function addInnerHTML() {
      console.time("addInnerHTML")
      // var elStrArr = [];
      // for (let i = 0; i < count; i++) {
      //     elStrArr.push(`
      //         <div>name${i}</div>
      //         <div>des${i}</div>
      //     `)
      // }
      // container.innerHTML =  elStrArr.join("")
      var htmlStr = ''
      for (let i = 0; i < count; i++) {
        htmlStr += "<div>name" + i + "</div><div>des" + i + "</div>"
      }
      container.innerHTML = htmlStr
      console.timeEnd("addInnerHTML")
    }
    btnInnerHTML.addEventListener("click", addInnerHTML)
  </script>
</body>

</html>
```

