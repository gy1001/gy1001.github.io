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

![image.png](./assets/108a02db0d0b4194a54a9305842de35e~tplv-k3u1fbpfcp-watermark.png)

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

## 04: 慧眼区分几个近亲属性

### innerText VS Node.textContent

* HTMLElement.innerText：表示一个节点以及后代被**渲染**的文本内容
* Node.textContent 表示一个节点以及其后代节点的文本内容

### innerText 与 Node.textContent 的区别

| aa                                                        | Node.textContent | HTMLElement.innerText |
| --------------------------------------------------------- | ---------------- | --------------------- |
| style<br />script 标签<br />隐藏的类容(比如display: none) | 包含             | 不包含                |
| `<br/ >`                                                  | 无效             | 有效                  |
| \t \r \n 等                                               | 有效             | 剔除                  |
| 连续空格                                                  | 有效             | 合兵为一个            |

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 0
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0
    }
  </style>
</head>

<body>
  <div style="display: flex">
    <p id="source">
      <style>
        #source {
          color: red;
          font-size: 30px;
        }
      </style>
      <script>
        document.getElementById("source");
      </script> JS <br /> 进阶 实战 空格<br /> 讲解 下一层. <span style="display:none">隐藏文本</span>
    </p>
    <div>
      <xmp>
        <style>
          #source {
            color: red;
            font-size: 20px;
          }
        </style>
        <script>
          document.getElementById("source");
        </script> JS <br /> 进阶 实战 空格<br /> 讲解 下一层. <span style="display:none">隐藏文本</span>
      </xmp>
    </div>
  </div>
  <div style="display: flex">
    <div>
      <h3>Node.textContent:</h3>
      <textarea id="textContentOutput" rows="15" cols="50" readonly></textarea>
    </div>
    <div>
      <h3>HTMLElement.innerText:</h3>
      <textarea id="innerTextOutput" rows="15" cols="50" readonly></textarea>
    </div>
  </div>
  <script>
    const source = document.getElementById('source')
    const textContentOutput = document.getElementById('textContentOutput')
    const innerTextOutput = document.getElementById('innerTextOutput')

    textContentOutput.innerHTML = source.textContent
    innerTextOutput.innerHTML = source.innerText;
  </script>
</body>

</html>
```

### 总结

* 最大区别：innerText 可操作已经被渲染的内容，而 textContent 不会
* innerText 受样式影响会触发浏览器绘制部分或者全部页面，带来性能问题，尽可能使用 textContent

### Node.nodeValue VS value:nodeValue

* 对于 text，comment, 和 CDATA 节点来说，nodeValue 返回该节点的文本内容
* 对于 attribute 节点来说，返回改属性的属性值

### value

* 特定的一些 HTMLElement 元素，用 value 属性获取其值
* HTMLInputElelement、HTELTextAreaElement、HTMLButtonElement、HTMLDataElement、HlMLSelectElement等.value

### Node.nodeValue与value的区别

* nodeValue 是文本节点，属性节点，注释节点等类型的节点用来取文本/值的属性
* value 是特定的元素节点用来取值的属性

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
  <div id="elementNode">elementNodeText</div>
  <div id="textNode">textNodeText</div>
  <div id="attrNode" test="1">attrNodeText</div>
  <script>
    console.log("document.nodeValue:", document.nodeName, "=nodeType=", document.nodeType, "=nodeValue=", document.nodeValue)
    const text = document.getElementById("elementNode")
    console.log("elementNode:", text.nodeName, "=nodeType=", text.nodeType, "=nodeValue=", text.nodeValue)

    const textNode = document.getElementById("textNode")
    console.log("textNode:", textNode.childNodes[0].nodeName, "=nodeType=", textNode.childNodes[0].nodeType, "=nodeValue=", textNode.childNodes[0].nodeValue)


    const attrNode = document.getElementById("attrNode")
    const attrNode1 = attrNode.getAttributeNode("test")
    console.log("attrNode:", attrNode1.nodeName, "=nodeType=", attrNode1.nodeType, "=nodeValue=", attrNode1.nodeValue);

  </script>
</body>

</html>

// 打印结果如下
document.nodeValue: #document =nodeType= 9 =nodeValue= null
elementNode: DIV =nodeType= 1 =nodeValue= null
textNode: #text =nodeType= 3 =nodeValue= textNodeText
attrNode: test =nodeType= 2 =nodeValue= 1
```

### clientWidth,offsetWidth,scrollWidth 

* 内容：content
* 内边距：padding
* 边框：border
* 外边距：margin
* 滚动条

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b975a2f533b449db2ae0c8b2f031f63~tplv-k3u1fbpfcp-watermark.image?)

### clientWidth

* Element.clientWidth（元素宽度）
* width + 左右 padding (不包含 border, margin, 滚动条)

### offsetWidth

* HTMLElement.offsetWidth（元素布局宽度）
* width + 左右 padding + 左右 border + 滚动条 (不包含 margin)

![image.png](./assets/ddf05a16b1a04136a7bc21948ae33137~tplv-k3u1fbpfcp-watermark.png)

### scrollWidth

* Element.scrollWidth(元素内容宽度)
* scrollWidth 是测量元素内容宽度，包括由于 overflow 溢出而在屏幕上 **不可见的内容**

| 分类                   | Element.clientWidth | HTMLElelemt.offsetWidth | Element.scrollWidth |
| ---------------------- | ------------------- | ----------------------- | ------------------- |
| 作用于                 | 元素自身            | 元素布局                | 元素的内容          |
| width                  | 包含                | 包含                    | 包含                |
| padding                | 包含                | 包含                    | 包含                |
| border                 |                     | 包含                    |                     |
| margin                 |                     |                         |                     |
| 滚动条                 |                     | 包含                    |                     |
| 元素 overflow 溢出内容 |                     |                         | 包含                |

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    /* .scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .scrollbar::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #82adda;
    }
    .scrollbar::-webkit-scrollbar-track {
      border-radius: 3px;
      background: #0e2e6a;
    } */
    .box {
        box-sizing: content-box;
        position: relative;
        width: 300px;
        height: 300px;
        overflow: auto;
        border: 5px solid blue;
        padding: 10px;
        margin: 0 40px;
        background: yellow;
    }

    .content {
        position: relative;
        width: 1000px;
        height: 150px;
        background: red;
        color: #fff;
        font-size: 30px;
    }
</style>

<body>
    <div id="box" class="box scrollbar">
        <div class="content"> 内容展示-js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战，js进阶实战
        </div>
    </div>
    <script>
        const box = document.getElementById("box")
        console.log("clientWidth==", box.clientWidth)
        console.log("offsetWidth==", box.offsetWidth)
        console.log("scrollWidth==", box.scrollWidth);
    </script>
</body>

</html>

clientWidth== 320
offsetWidth== 330
scrollWidth== 1020
```

### 节点位置关系-Node.comparaDocumentPosition

* 定义：比较当前节点与任意文档中的另一个节点的位置关系

* 语法：compareMask = node.compareDocumentPosition(otherNode)

* 返回值是一个觉有以下值的位掩码

  | 常量名                                    | 十进制值 | 含义                   |
  | ----------------------------------------- | -------- | ---------------------- |
  | DOCUMENT_POSITION_DISCONNECTED            | 1        | 不在同一文档中         |
  | DOCUMENT_POSITION_PRECEDING               | 2        | otherNode在node 之前   |
  | DOCUMENT_POSITION_FOLLOWING               | 4        | otherNode在node 之后   |
  | DOCUMENT_POSITION_CONTAINS                | 8        | otherNode 包含 node    |
  | DOCUMENT_POSITION_CONTAINED_BY            | 16       | otherNode 被 node 包含 |
  | DOCUMENT_POSITION_IMPLEMENATION_SPECUIFIC | 32       | 待定                   |

### 节点位置关系-Node.contains

* 定义：返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点

###  节点位置关系-总结

* comparaDocumentPosition 返回的是数字，带组合意义的数据，不仅仅可以返回包含，还可以返回在之前之后等信息
* contains 返回的是布尔值，仅仅告诉你是否有包含关系

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>节点位置关系</title>
</head>

<body>
    <div id="parent">
        <div id="child"></div>
    </div>
    <script>
        const pEl = document.getElementById("parent")
        const cEl = document.getElementById("child")
        // node.compareDocumentPosition(otherNode )
        // 不在同一文档中        1
        // otherNode在node之前  2
        // otherNode在node之后 	4  ✔
        // otherNode包含node    8
        // otherNode被node包含  16 ✔
        console.log("compareDocumentPosition:", pEl.compareDocumentPosition(cEl))  // 20

        console.log("contains:", pEl.contains(cEl)); // true
    </script>
</body>

</html>
```

### 大小/位置-Element.getBoundingClientRect

* 定义：返回元素的大小以及其相对可视化窗口（视口）的位置

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
        #container {
            top: 100px;
            left: 100px;
            position: relative;
            width: 100px;
            height: 100px;
            background-color: red;
        }
    </style>
    <div id="container">
    </div>
    <div>
        <button id="btnGet">获取</button>
    </div>
    <script>
        btnGet.addEventListener("click", function () {
            const rect = container.getBoundingClientRect()
            console.log(rect)
        })
    </script>
</body>

</html>

// 结果如下
{
    "x": 108,
    "y": 108,
    "width": 100,
    "height": 100,
    "top": 108,
    "right": 208,
    "bottom": 208,
    "left": 108
}
```

### 大小/位置-Element.getClientRects

* 定义：返回盒子的边界矩形集合
* 定义：对于行内元素，**元素内部的每一行都会有一个边框**，对于块级元素，如果里面没有其他元素，一整块元素只有一个边框

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .multi-client-rects {
      display: inline-block;
      width: 100px;
      position: relative;
    }
  </style>
</head>

<body>
  <p class="single-client-rects">
    <span>Paragraph that spans single line</span>
  </p>
  <p class="multi-client-rects">
    <span>Paragraph that spans multiple lines</span>
  </p>
  <div>
    <button id="btnAddByBorder">添加边框(Border)</button>
    <button id="btnAddByRect">添加边框(DOMRect)</button>
  </div>
  <script>

    const $ = (selector) => document.querySelector(selector)

    var elSingle = $(".single-client-rects span")
    var elMulti = $(".multi-client-rects span")

    console.log("elSingle length:", elSingle.getClientRects().length)
    console.log("elMulti length:", elMulti.getClientRects().length)


    console.log("elSingle ClientRects:", elSingle.getClientRects())
    console.log("elMulti ClientRects:", elMulti.getClientRects())

    btnAddByRect.addEventListener("click", function () {
      addBorder(elMulti)
    })

    btnAddByBorder.addEventListener("click", function () {
      elMulti.style.cssText = "border:solid 1px red;"
    })

    function addBorder(el) {
      var rects = el.getClientRects()

      var scrollEl = document.scrollingElement
      for (var i = 0; i != rects.length; i++) {
        var rect = rects[i]
        var elDiv = document.createElement('div')
        elDiv.style.position = 'absolute'
        elDiv.style.border = '1px solid red'
        var scrollTop = scrollEl.scrollTop
        var scrollLeft = scrollEl.scrollLeft
        elDiv.style.margin = elDiv.style.padding = '0'
        elDiv.style.top = (rect.top + scrollTop) + 'px'
        elDiv.style.left = (rect.left + scrollLeft) + 'px'

        // 减掉border的2px
        elDiv.style.width = (rect.width - 2) + 'px'
        elDiv.style.height = (rect.height - 2) + 'px'
        document.body.appendChild(elDiv)
      }
    }


  </script>
</body>

</html>
```

### 加载完毕事件监听-window.onload

* 定义：在文档装载完成后会触发 load 事件，此时，在文档中的所有对象都在 DOM 中，所有图片，脚本，链接以及子框架都完成了装载

### 加载完毕事件监听-DOMContentLoaded

* 定义：当初始化的 HTML 文档被完全加载和解析完成之后， DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架(iframe)的完全加载

* jQuery的方法

  ```javascript
  $(function(){
    // codes
  })
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
  <img
    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F34%2F03%2Fd0%2F3403d0bf98ee104cf69fc25f0bb35f9d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647851046&t=7d6765ebd76d9c3292878f94384e62f1">
  <script>
    let contentLoadedTime
    let onloadTime
    document.addEventListener('DOMContentLoaded', function () {
      console.log('DOMContentLoaded:')
      contentLoadedTime = performance.now()
    })
    window.onload = function () {
      console.log('onload:')
      onloadTime = performance.now()

      console.log('gap:', onloadTime - contentLoadedTime)
    }
  </script>
</body>

</html>

// 运行打印如下
DOMContentLoaded:
onload:
gap: 243.19999999925494
```

### 节点复制

* Document.adoptNode
* Document.importNode
* Document.cloneNode

### Node.cloneNode 注意点

* cloneNode deep 参数在不同版本的浏览器实现中，默认值可能不一样，所以强烈建议写上值
* cloneNode 会克隆一个元素节点会拷贝它所有的属性以及属性值，当然也就包括了属性上绑定的事件(比如onclick="alert(1)"), 但不拷贝那些使用addEventListener 方法或者 node.onclick = fn 这用 JavaScript 动态绑定的事件

### 节点复制总结

* adoptNode 从外部文档进行拷贝
* importNode 从外部文档进行拷贝，并从外部文档删除
* cloneNode 从本文档进行复制，有浅复制和深复制

### 添加节点 append appendChild

* Node.appendChild 将一个节点附加到指定父节点的子节点列表的末尾处
* Element.append 在 parentNode 的最后一个子节点之后插入一组 Node 对象或者 DOMString 对象

### 添加节点 append appendChild 的区别

|                    | Element.append | Element.appendChild |
| ------------------ | -------------- | ------------------- |
| 允许追加 DOMString | 是             | 否                  |
| 允许追加 Node 对象 | 是             | 是                  |
| 返回值             | 没有           | 追加的 Node 对象    |
| 追加节点个数       | 多个           | 一个                |

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
        function createEl(type, innerHTML) {
            const el = document.createElement(type)
            el.innerHTML = innerHTML
            return el
        }
        const rootEl = document.getElementById("root")

        rootEl.append("我们", createEl("div", "都是"), "好孩子");
    </script>
</body>

</html>
```

### 子节点集合 childNodes children

* Node.childNodes：节点的子节点集合，包括元素节点、文本节点、注释节点等
* Element.children：返回的只是节点的元素节点列表，即 nodeType 为 1 的节点

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
    <div id="root"> 1 <span>2</span> 3 <!-- <div></div> -->
        <!CDATA[[ 4 ]]>
    </div>
    <script>
        const rootEl = document.getElementById("root")
        console.log(rootEl.children) // HTMLCollection(1)
        console.log(rootEl.childNodes); // NodeList(7)
    </script>
</body>

</html>
```

### 本节内容

#### 文本

* HTMLElement.innerText
* Node.textContent

#### 节点值

* value
* Node.nodeValue

#### 宽高

* Element.clientWidth/clientHeight
* HTMLElement.offsetWidth/offsetHeight
* Element.scrollWidth/scrollHeight

#### 位置关系

* Node.contains
* Node.compareDocumentPosition

#### 大小/位置

* Element.getBoundingClientRect
* Element.getClientRects

#### 加载

* window.onload
* DOMContentLoaded

#### 子节点集合

* Node.childNodes
* Element.children

#### 添加节点

* Node.appendChild
* Element.append

#### 克隆/导入

* Document.adoptNode
* Document.importNode
* Node.cloneNode

## 05：自定义元素：web component, 任性的开始

### 两个问题

* vue slot 和 scoped css 借鉴了谁的思想
* scoped CSS 在 vue 里面的实现原理是什么

### vue scoped css

![image.png](./assets/ab90f0e078f549e9892f24c2eea28008~tplv-k3u1fbpfcp-watermark.png)

### web component 使用步骤

* 编写 Web Component 组件
* 注册 Web Component 组件
* 使用

### 一个简单的例子

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo</title>
</head>

<body>
  <my-text></my-text>
  <div></div>
  <!-- 放在后面不行 -->
  <my-text></my-text>
  <script>
    class MyText extends HTMLElement {
      constructor() {
        super()
        this.append("我的文本")
      }
    }
    window.customElements.define("my-text", MyText);
  </script>
</body>

</html>
```

### web Component 三项主要技术

* Custom elements （自定义元素）
* HTML templates （HTML模板）
* shadow DOM （影子 DOM）

### Custom elements：自定义元素

* 自主定制元素：是独立的元素，它不继承其他内建的 HTML 元素。你可以直接把它们写成 HTML 标签的形式，来在页面上使用。例如我们刚才自定义的 `<my-text>`
* 自定义内置元素：继承于基本的 HTML 元素。指定所需扩展的元素。使用时，需要通过 is 属性指定 custom element 的名称
* 继承与内置的元素
* 注册的时候指定 extends 的属性
* 节点用 is 指定 name. **其必须包含一个短横线**，所以`<my-text>`和`<my-text-text>`是合法的name,而 `<text>`、`<my_text>`、`<myText>`不行

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
  <p color="red" is="color-p"> 这是color-p的内容 </p>
  <script>
    class ColorP extends HTMLParagraphElement {
      constructor() {
        super()
        this.style.color = this.getAttribute("color")
        console.log(this.style.color)
      }
    }
    window.customElements.define("color-p", ColorP, { extends: "p" });
  </script>
</body>

</html>
```

### 位置问题

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo</title>
</head>

<body>
  <my-text></my-text>
  <script>
    class MyText extends HTMLElement {
      constructor() {
        super()
        this.append("我的文本")
      }
    }
    window.customElements.define("my-text", MyText);
  </script>
  <!-- 放在后面不行 -->
  <my-text></my-text>
</body>

</html>
```

### 延迟注册

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo</title>
</head>

<body>
  <my-text></my-text>
  <script>
    class MyText extends HTMLElement {
      constructor() {
        super()
        this.append("我的文本")
      }
    }
    // window.customElements.define("my-text", MyText);
    setTimeout(() => window.customElements.define("my-text", MyText))
  </script>
  <div></div>
  <my-text></my-text>
</body>

</html>
```

###  在 connectedCallback 声明周期中使用

> 这样就不会受位置影响了

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo</title>
</head>

<body>
  <my-text></my-text>
  <script>
    class MyText extends HTMLElement {
      constructor() {
        super()

      }
      connectedCallback() {
        this.append("我的文本")
      }
    }
    window.customElements.define("my-text", MyText);
  </script>
  <div></div>
  <my-text></my-text>
</body>

</html>
```

### 生命周期

* connectedCallback: 插入文档时
* disconnectedCallback: 从文档删除时
* adoptedCallback: 被移动新文档时
* attributeChangedCallback: 属性变化时

### 动作触发的生命周期

#### 插入的时候

* 触发 attributeChangedCallback
* 触发 connectedCallback

#### 属性更新时

* attributeChangedCallback

#### 删除时

* disconnectedCallback

#### 跨文档移动时

* 触发 disconnectedCallback
* 触发 adoptedCallback
* 触发 connectedCallback

### 生命周期：attributeChangedCallback

* 配合 observedAttributess 属性一起使用，指定监听的属性
* 使用 setAtrribute 方法更新属性

### 生命周期：connectedCallback

* 对节点的操作应该位于此生命周期
* 可能被多次触发。比如删除后又添加到文档中，所以 disconnectedCallback 可配置做清理工作

```html
// 生命周期 + 属性接受.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo</title>
</head>

<body>
  <div id="container1">
    <p is="my-text" text="大家好" id="myText"></p>
  </div>
  <div id="container2">
  </div>
  <div>
    <button id="btnUpdateText">更新属性</button><br />
    <button id="btnRemove">删除节点</button>
    <button id="btnRestore">恢复节点</button>
  </div>
  <script>
    class MyText extends HTMLParagraphElement {
      constructor() {
        super()
      }

      connectedCallback() {
        console.log("生命周期:connectedCallback")
        this.append("我说:" + this.getAttribute("text"))
      }

      disconnectedCallback() {
        console.log("生命周期:disconnectedCallback")
        this.innerHTML = ""
      }

      static get observedAttributes() {
        // return [''];
        return ['text']
      }

      attributeChangedCallback(name, oldValue, newValue) {
        console.log("生命周期:attributeChangedCallback", name, oldValue, newValue)
        // 先触发changed再触发 connectedCallback
        // 所以这里判断是不是一次触发 changed
        // 第一次的话，交给connectedCallback处理
        if (oldValue != null) {
          this.replaceChildren("我说:" + newValue)
        }
      }

      adoptedCallback() {
        console.log("生命周期:adoptedCallback")
      }
    }

    window.customElements.define("my-text", MyText, { extends: "p" })

    var myTextEl = document.getElementById("myText")
    btnUpdateText.addEventListener("click", function (e) {
      myTextEl.setAttribute("text", "随机的文本" + Math.random())
    })

    btnRemove.addEventListener("click", function (e) {
      myTextEl.remove()
    })

    btnRestore.addEventListener("click", function (e) {
      container1.appendChild(myTextEl)
    });

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
  <div id="container"></div>
  <button id="btnAdopt">adoptNode</button>
  <iframe id="ifr" src="./生命周期 + 属性接受.html">
  </iframe>
  <script type="text/javascript">
    btnAdopt.addEventListener("click", function (e) {
      const textNode = ifr.contentWindow.document.getElementById("myText")
      container.appendChild(document.adoptNode(textNode))
    })
  </script>
</body>

</html>
```

### 创建节点的痛点

* 使用 JS 对象模型创建节点过于复杂
* ES6 字符串模板，不友好，缺乏提示灯
* 复用性差

```html
// ES6 模板字符串
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>

  <body>
    <product-item
      name="关东煮"
      img="//img10.360buyimg.com/seckillcms/s200x200_jfs/t1/121953/18/20515/175357/61e7dc79Ee0acbf20/4f4f56abd2ea2f75.jpg!cc_200x200.webp"
      ,
      price="49.8"
    ></product-item>

    <script>
      class ProductItem extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = `
                    <img class="img" src="https://misc.360buyimg.com/lib/skin/e/i/error-jd.gif" />
                    <div class="name"></div>
                    <div class="price"></div>
                `
          this.innerHTML = content
          this.querySelector('.img').src = this.getAttribute('img')
          this.querySelector('.name').innerText = this.getAttribute('name')
          this.querySelector('.price').innerText = this.getAttribute('price')
        }
      }
      window.customElements.define('product-item', ProductItem)
    </script>
  </body>
</html>
```

```html
// template
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>demo</title>
  </head>

  <body>
    <template id="tpl-product-item">
      <img
        class="img"
        src="https://misc.360buyimg.com/lib/skin/e/i/error-jd.gif"
      />
      <div class="name"></div>
      <div class="price"></div>
    </template>

    <product-item
      name="关东煮"
      img="//img10.360buyimg.com/seckillcms/s200x200_jfs/t1/121953/18/20515/175357/61e7dc79Ee0acbf20/4f4f56abd2ea2f75.jpg!cc_200x200.webp"
      ,
      price="49.8"
    ></product-item>

    <script>
      class ProductItem extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = document
            .getElementById('tpl-product-item')
            .content.cloneNode(true)
          this.append(content)
          this.querySelector('.img').src = this.getAttribute('img')
          this.querySelector('.name').innerText = this.getAttribute('name')
          this.querySelector('.price').innerText = this.getAttribute('price')
        }
      }
      window.customElements.define('product-item', ProductItem)
    </script>
  </body>
</html>
```

### HTML templates

```html
<template id="tpl-test">
  <style type="text/css">
      .title {
          color: red;
      }
  </style>
  <div class="title">标题</div>
  <slot name="slot-des">默认内容</slot>
</template>

<test-item>
  <div slot="slot-des">不是默认内容哦</div>
</test-item>
```

#### slot

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <template id="tpl-test">
      <style type="text/css">
        .title {
          color: red;
        }
      </style>
      <div class="title">标题</div>
      <slot name="slot-des">默认内容</slot>
    </template>

    <test-item>
      <div slot="slot-des">不是默认内容哦</div>
    </test-item>

    <script>
      class TestItem extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = document
            .getElementById('tpl-test')
            .content.cloneNode(true)

          // 结果呢？ 不生效
          this.append(content)
          //
          // const shadow = this.attachShadow({mode: "open"});
          // shadow.append(content);
        }
      }
      window.customElements.define('test-item', TestItem)
    </script>
  </body>
</html>

```

#### slot shadowdom

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <template id="tpl-test">
      <style type="text/css">
        .title {
          color: red;
        }
      </style>
      <div class="title">标题</div>
      <slot name="slot-des">默认内容</slot>
    </template>

    <test-item>
      <div slot="slot-des">不是默认内容哦</div>
    </test-item>

    <script>
      class TestItem extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = document
            .getElementById('tpl-test')
            .content.cloneNode(true)

          // 结果呢？ 不生效
          // this.append(content);
          //
          const shadow = this.attachShadow({ mode: 'open' })
          shadow.append(content)
        }
      }
      window.customElements.define('test-item', TestItem)
    </script>
  </body>
</html>
```

### video中就有 shadowDom

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
    <video controls></video>
</body>
</html>
```

打开浏览器设置中的`Show user agent shadow DOM`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84af833f891b47dc80474771a4e48000~tplv-k3u1fbpfcp-watermark.image?)

然后查看元素可以看到如下

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85c22284c1424b6586616f556eb99a74~tplv-k3u1fbpfcp-watermark.image?)

### 一些概念

* Document Tree
* shadow Tree
* shadow root
* shadow host 
* ...

![image.png](./assets/ae8c040e932e40ef844cea8807a866ae~tplv-k3u1fbpfcp-watermark.png)

### 样式隔离

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <my-item></my-item>
    <my-item-s></my-item-s>
    <div class="container">My item</div>
    <div class="container2">My item</div>

    <style>
      .container {
        color: blue;
      }
    </style>
    <template id="tpl-my-item">
      <style>
        .container {
          color: red;
        }

        .container2 {
          color: blue;
        }
      </style>
      <div class="container">My Item</div>
    </template>

    <script>
      class MyItem extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = document
            .getElementById('tpl-my-item')
            .content.cloneNode(true)
          this.append(content)
        }
      }

      class MyItemShadow extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = document
            .getElementById('tpl-my-item')
            .content.cloneNode(true)

          const shadow = this.attachShadow({ mode: 'open' })

          shadow.append(content)
        }
      }

      window.customElements.define('my-item', MyItem)
      window.customElements.define('my-item-s', MyItemShadow)
    </script>
  </body>
</html>

```

### Shadow DOM 的可访问性

* 影子 DOM，其内部样式不共享
* 影子 DOM，其内部元素不可以直接被访问到

### 一个重要的参数

* open: shadow root 元素可以从 js 外部访问根节点
* closed: 拒绝从 js 外部访问关闭的 shadow root 节点

```javascript
const shadow = this.attachShadow({ mode: 'closed' })

const shadow = this.attachShadow({ mode: 'open' })
```

```html
// closed
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <template id="tpl-note">
      <style>
        .title {
          color: red;
          font-size: 22px;
          font-weight: bold;
        }

        .des {
          color: #999;
        }
      </style>
      <div class="title"></div>
      <div class="des"></div>
    </template>

    <note-item
      class="note-item"
      title="冬奥会"
      ,
      des="中国队加油! 祝贺运动员们获得好成绩......."
    ></note-item>

    <script>
      class NoteItem extends HTMLElement {
        constructor() {
          super()
        }

        connectedCallback() {
          const content = document
            .getElementById('tpl-note')
            .content.cloneNode(true)

          const shadow = this.attachShadow({ mode: 'closed' }) // 分别改为 open、closed 看看效果
          shadow.append(content)

          shadow.querySelector('.title').textContent =
            this.getAttribute('title')
          shadow.querySelector('.des').textContent = this.getAttribute('des')
        }
      }
      window.customElements.define('note-item', NoteItem)
    </script>
  </body>
</html>
```

### 引用外部样式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <my-item-s></my-item-s>
    <div class="container">My item</div>
    <div class="container2">My item</div>
    <template id="tpl-my-item">
      <div class="container">My Item</div>
    </template>

    <script>
      class MyItemShadow extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {
          const content = document
            .getElementById('tpl-my-item')
            .content.cloneNode(true)

          const shadow = this.attachShadow({ mode: 'open' })

          shadow.append(content)

          const linkElem = document.createElement('link')
          linkElem.setAttribute('rel', 'stylesheet')
          linkElem.setAttribute('href', 'xxxx.css')
          shadow.appendChild(linkElem)
        }
      }

      window.customElements.define('my-item-s', MyItemShadow)
    </script>
  </body>
</html>

xxx.css

.container {
    color: red;
}

.container2 {
    color: blue;
}
```

```html
// 第二种
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <my-item-s></my-item-s>
    <div class="container">My item</div>
    <div class="container2">My item</div>
    <template id="tpl-my-item">
      <link rel="stylesheet" href="4.css" />
      <div class="container">My Item</div>
    </template>

    <script>
      class MyItemShadow extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {
          const content = document
            .getElementById('tpl-my-item')
            .content.cloneNode(true)

          const shadow = this.attachShadow({ mode: 'open' })

          shadow.append(content)

          // const linkElem = document.createElement('link');
          // linkElem.setAttribute('rel', 'stylesheet');
          // linkElem.setAttribute('href', '4.css');
          // shadow.appendChild(linkElem);
        }
      }

      window.customElements.define('my-item-s', MyItemShadow)
    </script>
  </body>
</html>

```

### 动态创建 Web Component 组件节点例子

* 获取商品
* 动态创建元素节点
* 点击商品，跳转（事件）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>

  <body>
    <div id="product-list" style="display: flex"></div>

    <template id="product-item">
      <style>
        .product-item {
          margin-left: 15px;
          cursor: pointer;
        }

        .img {
          width: 100px;
        }

        .name {
          text-align: center;
        }

        .price {
          color: #999;
          text-align: center;
        }
      </style>
      <div class="product-item">
        <img
          class="img"
          src="https://misc.360buyimg.com/lib/skin/e/i/error-jd.gif"
        />
        <div class="name"></div>
        <div class="price"></div>
      </div>
    </template>

    <script>
      class ProductItemElement extends HTMLElement {
        constructor(props) {
          super(props)
          this.addEventListener('click', () => {
            window.open(`https://item.jd.com/${this.id}.html`)
          })
        }

        connectedCallback() {
          var shadow = this.attachShadow({ mode: 'open' })
          var doc = document
          var templateElem = doc.getElementById('product-item')
          var content = templateElem.content.cloneNode(true)

          content.querySelector('.img').src = this.img
          content.querySelector('.name').innerText = this.name
          content.querySelector('.price').innerText = this.price

          shadow.appendChild(content)
        }
      }
      window.customElements.define('product-item', ProductItemElement)
    </script>

    <script>
      var products = [
        {
          name: '关东煮',
          img: '//img10.360buyimg.com/seckillcms/s200x200_jfs/t1/121953/18/20515/175357/61e7dc79Ee0acbf20/4f4f56abd2ea2f75.jpg!cc_200x200.webp',
          id: '10026249568453',
          price: 49.8,
        },
        {
          name: '土鸡蛋',
          img: '//img11.360buyimg.com/seckillcms/s200x200_jfs/t1/172777/32/27438/130981/61fbd2e0E236000e0/7f5284367e2f5da6.jpg!cc_200x200.webp',
          id: '10024773802639',
          price: 49.8,
        },
        {
          name: '东北蜜枣粽子',
          img: '//img20.360buyimg.com/seckillcms/s200x200_jfs/t1/129546/31/19459/110768/60b1f4b4Efd47366c/3a5b80c5193bc6ce.jpg!cc_200x200.webp',
          id: '10035808728318',
          price: 15,
        },
      ]

      var proList = document.getElementById('product-list')

      function createProductItem(attrs) {
        const el = document.createElement('product-item')
        el.img = attrs.img
        el.name = attrs.name
        el.price = attrs.price
        el.id = attrs.id
        return el
      }
      var elList = products.map(createProductItem)
      proList.append.apply(proList, elList)
    </script>
  </body>
</html>
```

### web component的优点

* W3C web 标准
* 主流浏览器均以支持，兼容性相对较好
* 天然模块化，自带样式隔离
* 开箱即用

### web Component 的前景

* 组件库: 例如[fluentui web components](https://github.com/microsoft/fluentui). [fast-github](https://github.com/microsoft/fast)
* 微前端

## 06: DOM事件原理和避坑指南

### DOM 树：这个很关键

```html
<div>Hello world!</div>
```

![image.png](./assets/a733dd9f1d114e50885502eeb5cbd8ac~tplv-k3u1fbpfcp-watermark.png)

### window 和 document 的关系

* BOM（Browser Object Model）：浏览器对象模型，没有相关标准，一些和网页无关的浏览器功能。如：window、location、navigator、screen、histroy 等对象
* DOM（Document Object Model）:文档对象模型，W3C的标准，HTML和 XML文档的编程接口
* window 属于 BOM， document 是 DOM 中的核心，但是 window 引用这 document, 仅此而已。

### DOM0 级的事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <button id="btn1" onclick="console.log('按钮1被点击了')">按钮1(代码)</button>
    </div>
    <div>
      <button onclick="onClick2()">按钮2(函数)</button>
    </div>
    <div>
      <button onclick="console.log(this.className,this);" class="button3">
        按钮3(this)
      </button>
    </div>

    <div>
      <button onclick="onClick4()" class="button3">按钮4(全局作用域)</button>
    </div>

    <script>
      function onClick2() {
        console.log("按钮2被点击了");
      }

      ;(function () {
        function onClick4() {
          console.log("按钮4被点击了");
        }
      })();
    </script>
  </body>
</html>
```

### DOM0 级的事件的优点

* 效率高
* 节点上 onclick 属性被 Node.cloneNode 克隆，通过 JS 赋值的 onclick 不可以
* 移除事件非常简单
* 兼容性好

### DOM0 级的事件注意事项

* 事件处理函数中，this 是当前的节点
* 如果调用函数，会在全局作用域查找
* 唯一性，只能定义一个的事件回调函数

#### DOM0 事件在节点被复制时候的表现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="sourceZone">
      <div>原始区域:</div>

      <div id="sourceButtons">
        <div>
          <button class="btn1" onclick="console.log('按钮1被点击了')">
            按钮1(代码)
          </button>
        </div>
        <div>
          <button class="btn2">按钮2(函数)</button>
        </div>
      </div>
    </div>

    <div id="copyZone">
      <div>复制区域:</div>
    </div>
    <script>
      document.querySelector(".btn2").onclick = onClick2;
      copyZone.append(sourceButtons.cloneNode(true));
      function onClick2() {
        console.log("按钮2被点击了");
      }
      (function () {
        function onClick4() {
          console.log("按钮4被点击了");
        }
      })();
    </script>
  </body>
</html>
```

### DOM2 级的事件

![image.png](./assets/066b27dc6585413bb469dc82f0a30b08~tplv-k3u1fbpfcp-watermark.png)

### DOM2级的事件：事件注册

* 语法

  ```javascript
  target.addEventListener(type, listener, useCapture)
  target.addEventListener(type, listener, options)
  ```

* useCapture：true. 捕获阶段传播到目标的时候触发，反之冒泡阶段传到目标时候触发。默认值 false, 即冒泡时

```html
// 事件捕获冒泡
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <button id="btn">按钮</button>

  <script>
     window.addEventListener("click", function () {
      console.log("捕获:window")
    }, true)

    document.addEventListener("click", function () {
      console.log("捕获:document");
    }, true)

    btn.addEventListener(
      "click",
      function (ev) {
        console.log("捕获:btn");
      },
      true
    );

    btn.addEventListener("click", function (ev) {
      console.log("冒泡:btn");
    });

    document.addEventListener("click", function () {
      console.log("冒泡:document");
    })

    window.addEventListener("click", function () {
      console.log("捕获:window")
    })
  </script>
</body>

</html>
```

### DOM2 级的事件：强大的 options

* 语法：`target.addEventListener(type, listener, options)`

#### options: once

* 是否只相应一次
* 最典型的应用就是视频播放，现代浏览器可能需要用户参与后，视频才可以有声音播放

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <button id="btn">按钮</button>
    <script>
      btn.addEventListener(
        'click',
        function () {
          console.log('按钮被点击了')
        },
        {
          once: true,
        },
      )
    </script>

    <video id="video" controls width="250" autoplay>
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        type="video/webm"
      />

      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
      />

      Sorry, your browser doesn't support embedded videos.
    </video>

    <script>
      document.addEventListener(
        'click',
        () => {
          console.log('播放视频喽')
          video.play()
        },
        {
          once: true,
        },
      )
    </script>
  </body>
</html>
```

#### options: passive

* 设置为 true 时，事件处理不会调用 preventDefault()
* 某些触摸事件（以及其他）的事件监听器在尝试处理滚动时，可能阻止浏览器的主程序，从而导致滚动处理期间性能可能大大降低。

```javascript
var elem = document.getElementById("elem")
elem.addEventListener("touchmove", function listener(){
  // do something
}, { passive: true })
```

#### options: signal

* AbortSignal, 该 AbortSignal 的 abort() 方法被调用时，监听器会被移除
* AbortSignal 也被用于取消 fetch 请求

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <button id="btn">按钮</button>

    <script>
      var controller = new AbortController()
      var signal = controller.signal
			// 点击第二次时候，就不会再有响应了
      btn.addEventListener(
        'click',
        (ev) => {
          console.log('按钮被点击了')
          controller.abort()
        },
        {
          signal,
        },
      )
    </script>
  </body>
</html>
```

### DOM2级的事件：有趣的 useCapture

* 如果这个参数相同并且事件回调函数相同，事件不会被添加

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">按钮</button>

    <script>
      function onClick() {
        console.log('按钮被点击了')
      }
      // capture选项都是false, 只有一个添加成功
      btn.addEventListener('click', onClick)
      btn.addEventListener('click', onClick)

      // capture选项都是true, 只有一个添加成功
      btn.addEventListener('click', onClick, {
        capture: true,
      })
      btn.addEventListener('click', onClick, {
        capture: true,
        once: true,
      })
    </script>
  </body>
</html>
```

### DOM2级的事件：event.preventDefault

* 阻止默认的行为，比如有 href 的属性的 a 标签不会跳转，checkbox 的选中不会生效等
* 事件依旧还会继续传播

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>
      <a id="linkMK" target="_blank" href="https://www.imooc.com/">
        跳转到慕课
      </a>
    </div>
    <div>
      <input id="ckBox" type="checkbox" /><label for="ckBox">我统一</label>
    </div>

    <script>
      linkMK.addEventListener('click', function (ev) {
        ev.preventDefault();
      })

      ckBox.addEventListener('click', function (ev) {
        ev.preventDefault();
      })
    </script>
  </body>
</html>
```

### DOM2级的事件：event.stopPropagation

* 阻止捕获和冒泡阶段中当前事件的进一步传播

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <button id="btn">按钮</button>

  <script>
    btn.addEventListener("click", function (ev) {
      console.log("冒泡:btn");
    });

    btn.addEventListener(
      "click",
      function (ev) {
        console.log("捕获:btn");
      },
      true
    );

    document.addEventListener("click", function () {
      console.log("冒泡:document");
    })

    document.addEventListener("click", function (ev) {
      console.log("捕获:document");
      ev.stopPropagation();
    }, true)

  </script>
</body>

</html>
```

### DOM2级的事件：event.stopImmediatePropagation

* 阻止监听同一事件的其他事件监听器被调用
* 

![image.png](./assets/0f23b6a55aca4d539f323b9d831f1e98~tplv-k3u1fbpfcp-watermark.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <button id="btn">按钮</button>

  <script>
    btn.addEventListener("click", function (ev) {
      console.log("冒泡:btn");
    });

    btn.addEventListener(
      "click",
      function (ev) {
        console.log("捕获:btn 1");
      },
      true
    );

    btn.addEventListener(
      "click",
      function (ev) {
         ev.stopImmediatePropagation();
        // ev.stopPropagation();
        console.log("捕获:btn 2");
      },
      true
    );

    btn.addEventListener(
      "click",
      function (ev) {
        console.log("捕获:btn 3");
      },
      true
    );


    document.addEventListener("click", function () {
      console.log("冒泡:document");
    })

    document.addEventListener("click", function (ev) {
      console.log("捕获:document");
    }, true)

  </script>
</body>

</html>
```

### DOM2级的事件：event.target 和 event.currentTarget

* target：触发事件的元素，谁触发
* currentTarget: 事件绑定的元素，谁监听的事件监听函数

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">按钮</button>

    <script>
      btn.addEventListener("click", function (ev) {
      });

      document.addEventListener("click", function(ev){
        console.log("ev.target:", ev.target,)
        console.log("ev.currentTarget:", ev.currentTarget)
      })

    </script>
  </body>
</html>

```

### DOM2级的事件：事件委托

* 利用事件传播的机制，利用外层节点处理事件的思路
* 优点
  * 减少内存消耗
  * "动态性" 更好

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .btn-buy {
        cursor: pointer;
      }
    </style>
  </head>

  <body>
    <ul id="ulList">
      <li>
        <div>白菜</div>
        <a class="btn-buy" data-id="1">购买</a>
      </li>
      <li>
        <div>萝卜</div>
        <a class="btn-buy" data-id="2">购买</a>
      </li>
    </ul>

    <script>
      ulList.addEventListener('click', function (ev) {
        // console.log("ev", ev)
        // 识别节点
        if (ev.target.classList.contains('btn-buy')) {
          console.log('商品id:', ev.target.dataset.id)
        }
      })
    </script>
  </body>
</html>

```

### DOM3 级别事件

* DOM3 Events 在 DOM2 Events 基础上重新定义了事件，并增加了新的事件类型

1. 用户界面事件( UIEvent ) : 涉及与BOM交互的通用浏览器事件。比如: load、scroll
2. 焦点事件( FocusEvent ) : 在元素获得和失去焦点时触发。比如focus,blur
3. 鼠标事件( MouseEvent )
4. 滚轮事件( WheelEvent ) : 使用鼠标滚轮(或类似设备)时触发。比如 : mousewheel
5. 输入事件( InputEvent ) : 向文档中输入文本时触发。
6. 键盘事件 ( KeyboardEvent): 使用键盘在页面上执行某些操作时触发，比如如 : keydown、keypress

7. 合成事件( CompositionEvent) : 在使用某种IME (Input Method Editor,输入法编辑器)输入字符时触
   发。

### 注意事项和建议

1. DOM0 级事件一定程序上可以复制
2. DOM0 级别事件不可复制
3. 合理利用选型 once
4. 合理利用选项 passive 提升性能
5. capture 选型相同和事件回调函数相同时，事件不会被重复添加
6. 因为都是继承于 EventTarget, 任何一个节点都是事件中心
7. 合理利用事件代理

## 07: 自定义事件，满足个性化需求，增加代码灵活度

[MDN事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E4%BA%8B%E4%BB%B6%E7%B4%A2%E5%BC%95)

### 内置的事件类型

* 比如点击保存按钮，这就是点击事件(click)
* 某个文本失去焦点后检查输入的内容是否合法，这是 blur 事件
* 鼠标滚动页，页面滚动的，这就是 mousewhell 事件
* 等等

### 触发内置事件

* element.[eventType]\(\)

  ```javascript
   aEl.click()
  ```

* new [Event] + dispatchEvent

```html
// 文件下载 onclick
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <button type="button" id="btnDownload">下载文件</button>
    </div>
    <script>
      function createBlob(content, type) {
        var blob = new Blob([content], { type })
        return blob
      }

      function downloadFile(filename, content, type = 'text/plain') {
        var aEl = document.createElement('a')
        // 指定下载文件名
        aEl.download = filename
        const blob = createBlob(content, type)
        // 生成url地址
        const url = URL.createObjectURL(blob)
        console.log(url) // blob:http://127.0.0.1:5500/828e9f73-7bb8-4549-9f0a-70220a7aac86
        aEl.href = url
        document.body.appendChild(aEl)
        // 触发点击事件
        aEl.click()
        document.body.removeChild(aEl)
        // 释放url
        URL.revokeObjectURL(url)
      }
      const content = '测试的文本'
      btnDownload.addEventListener('click', function () {
        console.log('点击饿了')
        downloadFile('测试.txt', content)
      })
    </script>
  </body>
</html>
// 根据文件名 blob:http://127.0.0.1:5500/828e9f73-7bb8-4549-9f0a-70220a7aac86
可以延伸出一个生成 uid 的方法
uid = URL.createObjectURL(new Blob([''])).split("/").pop()
```

```html
// 文件下载 dispatchEvent
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>
      <button type="button" id="btnDownload">下载文件</button>
    </div>

    <script>
      function createBlob(content, type) {
        var blob = new Blob([content], { type })
        return blob
      }

      function downloadFile(filename, content, type = 'text/plain') {
        var aEl = document.createElement('a')
        // 指定下载文件名
        aEl.download = filename

        const blob = createBlob(content, type)
        // 生成url地址
        const url = URL.createObjectURL(blob)
        console.log(url)
        aEl.href = url
        document.body.appendChild(aEl)

        // ----------触发点击事件-------------------
        var event = new MouseEvent('click')
        aEl.dispatchEvent(event)
        document.body.removeChild(aEl)

        // 释放url
        URL.revokeObjectURL(url)
      }

      const content = '测试的文本'
      btnDownload.addEventListener('click', function () {
        console.log('点击饿了')
        downloadFile('测试.txt', content)
      })
    </script>
  </body>
</html>
```

### 自定义事件

```javascript
btnTrigger.addEventListener('myEvent', function () {
  console.log('DOM2: myEvent')
})
```

### 触发自定义事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="divWrapper">
      <button type="button" id="btnTrigger">触发事件</button>
    </div>

    <script>
      btnTrigger.addEventListener('myEvent', function () {
        console.log('DOM2: myEvent') // 这个会被触发
      })

      btnTrigger.onmyEvent = function (event) {
        console.log('DOM0: myEvent') // 不会被触发
      }

      var event = new Event('myEvent')
      btnTrigger.dispatchEvent(event)
    </script>
  </body>
</html>
```

### 自定义事件三种方式

* document.createEvent (已废弃)
* new Event()
* new CustomEvent() **推荐使用**

### document.createEvent (已废弃)

> MDN: [Document.createEvent()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent)

* 语法：`var event = document.createEvent(type);`
* `event` 就是被创建的 [Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 对象。
* `type` 是一个字符串，表示要创建的事件类型。事件类型可能包括`"UIEvents"`、`"MouseEvents"`、`"MutationEvents"` 或者 `"HTMLEvents"`。请查看[注意](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent#注意)小节获取详细信息。

### new Event

* 语法：` event = new Event(typeArg, eventInit);`

* 参数

  > **typeArg**: 是[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，表示所创建事件的名称。
  >
  > **eventInit**可选是 `EventInit` 类型的字典，接受以下字段：
  >
  > - `"bubbles"`，可选，[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，默认值为 `false`，表示该事件是否冒泡。
  > - `"cancelable"`，可选，[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，默认值为 `false`，表示该事件能否被取消。
  > - `"composed"`，可选，[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)类型，默认值为 `false`，指示事件是否会在影子 DOM 根节点之外触发侦听器。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div class="container">
      <button id="btn">开始吧</button>
    </div>

    <div>
      <div>
        流程1:
        <div id="step1"></div>
      </div>
      <div>
        流程2:
        <div id="step2"></div>
      </div>
    </div>

    <script>
      function dispatchEE(target, type) {
        var event = new Event(type)
        target.dispatchEvent(event)
      }

      btn.addEventListener('click', function () {
        // 做了很多的工作
        setTimeout(() => {
          dispatchEE(step1, 'step-1')
        }, 2000)
      })

      // 解耦
      step1.addEventListener('step-1', function () {
        step1.textContent = '流程1进行中......'
        setTimeout(() => {
          dispatchEE(step2, 'step-2')
        }, 2000)
      })

      // 解耦
      step2.addEventListener('step-2', function () {
        step2.textContent = '流程2进行中......'
        setTimeout(() => {
          dispatchEE(window, 'finished')
        }, 2000)
      })

      window.addEventListener('finished', function () {
        alert('finished successfully')
      })
    </script>
  </body>
</html>
```

### new CustomEvent()

> 可以传递数据

* 语法：` event = new CustomEvent(typeArg, customEventInit);` 

* 参数

  > **typeArg**:一个表示 event 名字的字符串
  >
  > **customEventInit**: Is a `CustomEventInit` dictionary, having the following fields: 一个字典类型参数，有如下字段
  >
  > - `"detail"`, optional and defaulting to `null`, of type any, that is a event-dependant value associated with the event. 可选的默认值是 null 的任意类型数据，是一个与 event 相关的值
  > - bubbles 一个布尔值，表示该事件能否冒泡。来自 [`EventInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)。注意：测试 chrome 默认为不冒泡。
  > - cancelable 一个布尔值，表示该事件是否可以取消。来自 [`EventInit`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div class="container">
      <button id="btn">开始吧</button>
    </div>

    <div>
      <div>
        流程1:
        <div id="step1"></div>
      </div>
      <div>
        流程2:
        <div id="step2"></div>
      </div>
    </div>

    <script>
      function dispatchEE(target, type, data) {
        var event = new CustomEvent(type, {
          detail: data,
        })
        target.dispatchEvent(event)
      }

      btn.addEventListener('click', function () {
        // 做了很多的工作
        setTimeout(() => {
          dispatchEE(step1, 'step-1', { param: 'step1的启动参数' })
        }, 2000)
      })

      // 解耦
      step1.addEventListener('step-1', function (ev) {
        step1.textContent = '流程1进行中......,参数:' + ev.detail.param
        setTimeout(() => {
          dispatchEE(step2, 'step-2', { param: 'step2的启动参数' })
        }, 2000)
      })

      // 解耦
      step2.addEventListener('step-2', function (ev) {
        step2.textContent = '流程2进行中......,参数:' + ev.detail.param
        setTimeout(() => {
          dispatchEE(window, 'finished', '我是结果')
        }, 2000)
      })

      window.addEventListener('finished', function (ev) {
        alert('finished successfully,结果:' + ev.detail)
      })
    </script>
  </body>
</html>
```

### CustomEvent 兼容

```javascript
;(function () {
  if (typeof CustomEvent !== 'function') {
    var CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      }
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail,
      )
      return evt
    }
    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
  }
})()
```

### new Event 与 new CustomEvent 区别

* 从继承关系来看，CustomEvent 是 Event 的扩展
* 参数支持，Event 适合简单的自定义事件，CustomEvent 支持传递数据的自定义事件

### 本质

* 事件模式本质上和**观察者模式**是相同的，所以凡是能够用到观察者这种模式的情形，就可以使用事件来解决
现在我们来列举一个简单的情形并实现它

#### 例子

> 情景：有一个数组arr，每当这个数组添加新的元素之后，我们都要重新打印它一次
> 实现

```javascript
let arr = []

function add(detail) {
  document.dispatchEvent(
    new CustomEvent("onAdd", {
      detail
    })
  )
}
// 监听添加事件
document.addEventListener("onAdd", (e) => {
  e.detail ? arr.push(e.detail.age) : null
  console.log(arr)
})
// 触发事件
add()
add({ age: 18 })
```

如果不使用这种模式，我们在数组改变之后就得手动打印数组。当然，在不需要监听这个事件之后，我们得通过removeEventListener（用法和addEventListener相同）取消对这个事件得监听

## 08：JS操作样式，也可以非常丝滑

### 样式来源

* 浏览器默认样式
* 浏览器用户自定义样式
* link 引入的外部样式
* style 标签
* style 属性：内联样式

### 用户代理样式（就是浏览器默认样式）

![image.png](./assets/00abbcda39c541b98c20a0546cd74833~tplv-k3u1fbpfcp-watermark.png)

### 样式优先级

1. 内联样式: `style = "color: red"`
2. ID 选择器: `#id {  }`
3. 类和伪类选择器: `.div { } `
4. 标签选择器：`div { }`
5. 通配符选择器: *

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>
      <button type="button" id="btnAddClass">添加class</button>
      <button type="button" id="btnAddID">添加id</button>
      <button type="button" id="btnAddStyle">添加内联样式</button>
    </div>
    <div id="container">
      <div>文字</div>
    </div>
    <style>
      #test-div {
        color: blue;
      }
      .test-div {
        color: green;
      }
      div {
        color: pink;
      }
    </style>

    <script>
      const el = container.firstElementChild
      // style="color:red" id="test-div" class="test-div"

      // 添加class
      btnAddClass.addEventListener('click', function () {
        el.classList.add('test-div')
      })
      // 添加id
      btnAddID.addEventListener('click', function () {
        // 或者 el.setAttribute("id","test-div")
        el.id = 'test-div'
      })
      // 添加内联样式
      btnAddStyle.addEventListener('click', function () {
        // 或者 el.setAttribute("id","test-div")
        el.style.color = 'red'
      })
    </script>
  </body>
</html>
```

![image.png](./assets/4f2c6577d46b4fecaf637edf7ccbf0cf~tplv-k3u1fbpfcp-watermark.png)

### 操作元素节点上的 style 属性

* style 属性名是驼峰语法
* style.cssText 是批量赋值
* import! 也是可以生效的

```javascript
el.style.backgroundColor = 'red'
el.style.fontSize = '30px'
```

```javascript
const el = document.getElementById('test-div')
el.style.cssText = 'background-color: green !important; font-size: 40px;'
```

### 操作节点 classList & className 属性

| 属性      | 值类型              | 方法                         |
| --------- | ------------------- | ---------------------------- |
| className | 字符串              | 字符串具备的方法             |
| classList | DOMTokenList 类数组 | add,remove,contains,toggle等 |

### 使用 classList 的 toggle 方法

* 定义：从列表中删除一个给定的标记，并返回 false. 如果标记不存在，则添加并且函数返回 true

* 语法：`el.classList.toggle(token ,force)`

* 参数：

  > `token`: 一个字符串，表示你想要 toggle 的标记。
  >
  > `force` 可选, 如果包含该值，设置后会将方法变成 **单向操作**。如果设置为 `false`，*仅*会删除标记列表中匹配的给定标记，且不会再度添加。如果设置为 `true`，*仅*在标记列表中添加给定标记，且不会再度删除。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>
      <button type="button" id="btnToggleFalse">toggle(false)</button>
      <button type="button" id="btnToggleTrue">toggle(true)</button>
    </div>

    <div id="container">
      <div>文字</div>
    </div>
    <style>
      .test-div {
        color: red;
      }
    </style>

    <script>
      const el = container.firstElementChild
      // toggle false
      btnToggleFalse.addEventListener('click', function () {
        el.classList.toggle('test-div')
      })
      // toggle true
      btnToggleTrue.addEventListener('click', function () {
        el.classList.toggle('test-div', true)
      })
    </script>
  </body>
</html>
```

### 操作 style 节点内容

* 本质还是 Node 节点
* 所以可以直接替换节点内容

```html
// style节点正则替换内容
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style id="ss-test">
      .div {
        background-color: red;
        font-size: 30px;
      }
    </style>
  </head>
  <body>
    <div>
      <button id="btnReplace" type="button">替换</button>
    </div>
    <div class="div">文本</div>
    <script>
      const ssEl = document.getElementById("ss-test");
      btnReplace.addEventListener("click", function () {
        ssEl.textContent = ssEl.textContent.replace(
          "background-color: red",
          "background-color: blue"
        );
      });
    </script>
  </body>
</html>
```

### 创建 style 节点操作

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>

  <body>
    <div>
      <button type="button" id="btnAdd">添加style节点</button>
    </div>
    <div class="div">文本</div>

    <script>
      document
        .getElementById('btnAdd')
        .addEventListener('click', createStyleNode)

      function createStyleNode() {
        const styleNode = document.createElement('style')
        // 设置textContent
        styleNode.textContent = `
          .div {
              background-color: red;
              font-size: 30px;
          }
        `
        document.head.appendChild(styleNode)

        // append
        // styleNode.append(`
        //      .div {
        //          background-color: red;
        //          font-size: 30px;
        //      }
        // `)
        document.head.appendChild(styleNode)
      }
    </script>
  </body>
</html>
```

### 操作已有的 style 节点： 

* CSSOM: CSS Object Model 是一组允许用 JavaScript 操作 CSS 的 API。它是继 DOM 和 HTML API 之后，又一个操作 CSS 的接口，从而能够动态地读取和修改 CSS 样式

### 部分 CSSOM 关系图

![image.png](./assets/a702816c049445e49918c9e4e0030386~tplv-k3u1fbpfcp-watermark.png)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4309c613b4ea46289cc241b5e8c397a7~tplv-k3u1fbpfcp-watermark.image?)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>

  <body>
    <div>
      <button type="button" id="btnUpdate">更改style节点</button>
    </div>
    <div class="div">文本</div>

    <style id="ss-test">
      .div {
        background-color: red;
        font-size: 30px;
      }
      div {
        font-size: 26px;
      }
    </style>

    <script>
      document
        .getElementById('btnUpdate')
        .addEventListener('click', updateStyleNode)

      function updateStyleNode() {
        const styleSheets = Array.from(document.styleSheets)
        // ownerNode获得styleSheet对应的节点
        const st = styleSheets.find((s) => s.ownerNode.id === 'ss-test')
        // 选过选择器找到对应的rule
        const rule = Array.from(st.rules).find((r) => r.selectorText === '.div')

        // 兼容性
        const styleMap = rule.styleMap
        styleMap.set('background-color', 'blue')
      }
    </script>
  </body>
</html>

```

### 外部引入的样式也是 CSSStyleSheet

![image.png](./assets/ab823e8461fc48878ebf7ccd67c496b7~tplv-k3u1fbpfcp-watermark.png)

### 操作外部样式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link rel="stylesheet" href="./abc.css" />
    <link rel="stylesheet" href="./abc2.css" />
  </head>

  <body>
    <div>
      <button type="button" id="btnUpdate">更改style节点</button>
    </div>
    <div class="div">文本</div>

    <style>
      .a {
      }
    </style>
    <script>
      document
        .getElementById('btnUpdate')
        .addEventListener('click', updateStyleNode)

      function updateStyleNode() {
        const styleSheets = Array.from(document.styleSheets)
        const st = styleSheets.find((s) => s.href.endsWith('abc.css'))
        const rule = Array.from(st.rules).find((r) => r.selectorText === '.div')

        // 兼容性
        const styleMap = rule.styleMap
        styleMap.set('background-color', 'green')
      }
    </script>
  </body>
</html>

// abc.css
.div {
  background-color: red;
  font-size: 30px;
}

div {
  font-size: 26px
}

// abc2.css
.div {
  background-color: red;
  font-size: 30px;
}

div {
  font-size: 26px;
}
```

### 动态创建 link 节点引入样式

```javascript
function importCssByUrl (url){
  const link = document.createElement("link")
  link.type = "text/css"
  link.rel = "stylesheet"
  link.href = url
  document.head.appendChild(link)
}
```

### window.getComputeStyle

> MDN: [https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

* 返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值

* 语法：`let style= window.getComputedStyle(element, [pseudoElt])`

* 参数：

  > element: 用于获取计算样式的[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)。
  >
  > pseudoElt 可选, 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）。

### window.getComputeStyle 注意事项

* 计算后的样式不等同于 css 文件，style 标签和属性设置的样式的值
* 可以获取到伪类样式
* 此方法会引起重排

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="div-test" class="div">文本</div>
    <hr />
    <div>
      样式的值
      <pre>
        .div {
          font-size: 1.6rem;
          transform:rotate(2deg);
        }
      </pre>
    </div>
    <hr />
    <div>
      getComputedStyle的值:
      <pre id="divGc"></pre>
    </div>
    <style>
      .div {
        font-size: 1.6rem;
        transform: rotate(2deg);
      }
    </style>

    <script>
      const divEl = document.getElementById('div-test')
      const styleDeclaration = window.getComputedStyle(divEl)
      const fontSize = styleDeclaration.fontSize
      const transform = styleDeclaration.transform

      divGc.textContent = `
        fontSize: ${fontSize}
        transform: ${transform}
    `
    </script>
  </body>
</html>

// 最终页面显示内容如下

getComputedStyle的值:
  fontSize: 25.6px
  transform: matrix(0.999391, 0.0348995, -0.0348995, 0.999391, 0, 0)    
```

```html
// 获取伪类
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="ddddd">
      <div id="div-test" class="div">文本</div>
    </div>

    <hr />
    <div>
      伪类的样式:
      <pre id="divGc"></pre>
    </div>
    <style>
      .div:before {
        content: '(你好)';
        font-size: 1.6rem;
      }
    </style>

    <script>
      const divEl = document.getElementById('div-test')
      const styleDeclaration = window.getComputedStyle(divEl, 'before')
      const fontSize = styleDeclaration.fontSize
      const content = styleDeclaration.content

      divGc.textContent = `
        fontSize: ${fontSize}
        content: ${content}
      `
    </script>
  </body>
</html>

伪类的样式:
  fontSize: 25.6px
  content: "(你好)"
```

### 重排与重绘

* 重排：元素的尺寸、结构或者 某些属性发生变化时，浏览器重新渲染部分或全部文档的过程称为重排。
* 重绘：元素样式的改变并不影响它在文档流中的位置或者尺寸的时候，例如：color, background-color, outline-color 等，浏览器会重新绘制元素，这个过程称为重绘

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>
      <button id="btnAdd">动态创建节点并动画</button>
    </div>
    <div id="container"></div>
    <style>
      .ani {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: blue;
        transition: all 3s;
      }
    </style>
  </body>
</html>
```

```javascript
// 第一种
btnAdd.addEventListener('click', createAni)
function createAni() {
  var div = document.createElement('div')
  div.className = 'ani'
  container.appendChild(div)
  div.style.left = '0px'
  // 这样不会有动画
  div.style.left = '200px'
}
```

```javascript
// 第二种
btnAdd.addEventListener('click', createAni)
function createAni() {
  var div = document.createElement('div')
  div.className = 'ani'
  container.appendChild(div)
  div.style.left = '0px'
  // 有动画
  setTimeout(() => {
    div.style.left = '200px'
  }, 0)
}
```

```javascript
// 第三种
btnAdd.addEventListener('click', createAni)
function createAni() {
  var div = document.createElement('div')
  div.className = 'ani'
  container.appendChild(div)

  div.style.left = '0px'
  window.getComputedStyle(div).height // 加上这行代码就会有动画
  // window.getComputedStyle(div).accentColor // 加上这行代码也可以
  div.style.left = '200px'
}
```

### 总结

1. 样式来源
   * 浏览器样式
   * 浏览器用户自定义样式
   * link 引入的外部样式
   * style 节点
   * style 属性：内联样式
2. 样式优先级
   * 内联样式
   * ID 选择器
   * 类 选择器
   * 标签选择器
3. 操作节点上的属性
   * style 属性是驼峰语法
   * style.cssText 批量修改
   * import! 也是可以生效的
4. 节点 classList 和 className 属性
   * 对比
   * DOMTokenList.toggle
5. 操作 style 标签内容
   * 本质还是 Node 节点
   * 对象模型
   * 动态创建 style 节点
   * 操作已有的 style 节点
6. 操作外部引入样式
   * 动态引入外部样式
   * 更改外部引入的样式
7. window.getComputeStyle
   * 值不一定等于设置的值
   * 可以获取伪类样式
   * 获取一些属性会引起重绘
   * 重绘、重排

## 09: 3行，6行，8行代码实现订阅发布中心

### 订阅发布中心

* 是一种消息通知机制，也是一种发布订阅模式的实际应用
* 应用场景：公众号消息，短信提醒等
* 前端四大手写题目之一

### 最基础的订阅发布中心

* on: 订阅
* once: 订阅，但仅仅接受一次通知
* off: 取消订阅
* emit: 派发事件，通知订阅者

### 3 行代码版本

```javascript
// 4 行版本
window._on = window.addEventListener
window._off = window.removeEventListener
// 上两行可以简写为一行，称为 3行代码
//  (window._on = window.addEventListener, window._off = window.removeEventListener);

window._emit = (type, data) =>  window.dispatchEvent(new CustomEvent(type, { detail: data }))
window._once = (type, listener) => window.addEventListener(type, listener, { once: true, capture: true })
```

```javascript
function onEventX(ev) {
  console.log('event-x 收到数据:', ev.detail)
}

// 订阅
window._on('event-x', onEventX)
window._once('event-once', (ev) => console.log('event-once 收到数据:', ev.detail))

// once
window._emit('event-once', { uid: -100, message: 'you love me' })
window._emit('event-once', { uid: -100, message: 'you love me' })
// 订阅和取消订阅
window._emit('event-x', { uid: 100, message: 'i love you' })
window._off('event-x', onEventX)
window._emit('event-x', { uid: 100, message: 'i love you' })
```

### 原理浅析

* window 是表象，根源是 EventTarget 
* document 和 元素节点也是继承于 EventTarget
* XMLHttpRequest, WebSocket 也继承于 EventTarget

### EventTarget

`EventTarget` 接口由可以接收事件、并且可以创建侦听器的对象实现。换句话说，任何事件目标都会实现与该接口有关的这三个方法。

[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 及其子项、[`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 和 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 是最常见的事件目标，但其他对象也可以是事件目标。比如 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)、[`AudioNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioNode) 和 [`AudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext) 等等。

许多事件目标（包括 `element`、`document` 和 `window`）都支持通过 `onevent` 特性和属性设置[事件处理程序 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers)。

#### [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget#构造函数)

- [`EventTarget()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/EventTarget)

  创建一个新的 `EventTarget` 对象实例。

#### [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget#方法)

- [`EventTarget.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

  在 `EventTarget` 上注册特定事件类型的事件处理程序。

- [`EventTarget.removeEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)

  `EventTarget` 中删除事件侦听器。

- [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)

  将事件分派到此 `EventTarget`。

### 3 行代码存在的问题

1. 不能多实例化
2. 挂载 window 上太丑了
3. 不能传递多参数
4. 参数从 ev.detail 上获取，不合理
5. 不能再 node.js 中使用
6. 。。。

### 6 行版本

```javascript
class EventEmitter extends EventTarget {
  on = this.addEventListener
  off = this.removeEventListener
  emit = (type, data) =>  this.dispatchEvent(new CustomEvent(type, { detail: data }))
  once = (type, listener) => this.on(type, listener, { once: true, capture: true })
}
```

```javascript
var emitter = new EventEmitter()
function onEventX(ev) {
  console.log('event-x 收到数据:', ev.detail)
}

// 订阅
emitter.on('event-x', onEventX)
emitter.once('event-once', (ev) =>
  console.log('event-once 收到数据:', ev.detail),
)

// 发布
emitter.emit('event-once', { uid: -100, message: 'you love me' })
emitter.emit('event-once', { uid: -100, message: 'you love me' })

emitter.emit('event-x', { uid: 100, message: 'i love you' })
emitter.off('event-x', onEventX)
emitter.emit('event-x', { uid: 100, message: 'i love you' })
```

### 6 行代码版本存在的问题

* e.detail 上获取参数
* 不能传递多个参数

### 8 行代码版本

```javascript
class EventEmitter extends EventTarget {
  on = (type, listener, options) =>
    this.addEventListener(
      type,
      function wrap(e) {
        return (
          // 添加函数指向包裹函数
          // apply 调用，可以传递数组
          (listener.__wrap__ = wrap), listener.apply(this, e.detail || [])
        )
      },
      options,
    )

  off = (type, listener) => this.removeEventListener(type, listener.__wrap__) // 删除的是包裹函数
  emit = (type, ...args) => this.dispatchEvent(new CustomEvent(type, { detail: args })) // 剩余参数，接收一个数组参数
  once = (type, listener) => this.on(type, listener, { once: true, capture: true })
}
```

```javascript
var emitter = new EventEmitter()
function onEventX(uid, msg) {
  console.log('event-x 收到数据:', this, uid, msg)
}

// 订阅
emitter.on('event-x', onEventX)
emitter.once('event-once', (uid, msg) =>
  console.log('event-once 收到数据:', uid, msg),
)

// 发布
emitter.emit('event-once', -100, 'you love me')
emitter.emit('event-once', -100, 'you love me')

emitter.emit('event-x', 100, 'i love you')
emitter.off('event-x', onEventX)
emitter.emit('event-x', 100, 'i love you')
```

### 核心知识点

* EventTarget
* CustomEvent
* 分组运算符
* 高阶函数
