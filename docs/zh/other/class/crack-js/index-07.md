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

