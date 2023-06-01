# mini-vue

## html 部分

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
		<div id="app">
			<h3>{{msg}}</h3>
			<p>{{count}}</p>
			<h1 v-text="msg"></h1>
			<br />
			<input type="text" v-model="count" />
			<button type="button" v-on:click="increase">increase+</button>
			<button type="button" v-on:click="changeMessage">change Message</button>
			<button type="button" v-on:click="recoverMessage">recoverMessage</button>
		</div>
	</body>
	<script src="./mini-vue.js"></script>
	<script>
		const app = new MiniVue({
			el: '#app',
			data: {
				msg: 'hello i am mini.vue.js',
				count: 666,
			},
			methods: {
				increase() {
					this.count++
				},
				changeMessage() {
					this.msg = 'hello evening water'
				},
				recoverMessage() {
					console.log(this)
					this.msg = 'hello mini-vue.js'
				},
			},
		})
	</script>
</html>
```

## JavaScript 部分

```javascript
function isObject(value) {
	return typeof value === 'object' && value
}

function _isNaN(value) {
	return Number.isNaN(value)
}

class MiniVue {
	constructor(options = {}) {
		this.$options = options
		this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
		this.$data = options.data
		this.$methods = options.methods
		this.proxy(this.$data)
		new Observer(this)
		new Compiler(this)
	}

	proxy(data) {
		// 这里简化为只处理对象
		if (!isObject(data)) {
			return
		}
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get() {
					return data[key]
				},
				set(newValue) {
					if (newValue === data[key] || (_isNaN(newValue) && _isNaN(data[key]))) {
						return
					}
					data[key] = newValue
				},
			})
		})
	}
}

class Dep {
	constructor() {
		this.deps = new Set()
	}
	add(dep) {
		if (dep && dep.update) {
			this.deps.add(dep)
		}
	}
	notify() {
		this.deps.forEach((dep) => dep.update && dep.update())
	}
}

class Observer {
	constructor(vm) {
		this.walk(vm)
	}
	walk(context) {
		let data = context.$data
		// 这里不考虑数组
		if (!isObject(data)) {
			return
		}
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key])
		})
	}
	defineReactive(data, key, value) {
		const dep = new Dep()
		const vm = this
		this.walk(value)
		Object.defineProperty(data, key, {
			configurable: true,
			enumerable: true,
			get() {
				Dep.target && dep.add(Dep.target)
				return value
			},
			set(newValue) {
				if (newValue === value || (_isNaN(newValue) && _isNaN(value))) {
					return
				}
				value = newValue
				dep.notify()
			},
		})
	}
}

class Watcher {
	constructor(vm, key, cb) {
		this._vm = vm
		this._key = key
		this._cb = cb
		Dep.target = this
		// 关键一点，存储旧值
		this.__oldValue = vm[key]
		Dep.target = null
	}
	update() {
		const value = this._vm[this._key]
		if (this.__oldValue === value || (_isNaN(this.__oldValue) && _isNaN(value))) {
			return
		}
		this._cb(value)
		this.__oldValue = value
	}
}

class Compiler {
	constructor(vm) {
		this._vm = vm
		this._methods = vm.$methods
		this._data = vm.$data
		this.compile(vm.$el)
	}
	compile(el) {
		const childNodes = el.childNodes
		Array.from(childNodes).forEach((node) => {
			if (this.isTextNode(node)) {
				this.compileText(node)
			} else if (this.isElementNode(node)) {
				this.compileElement(node)
			}
			if (node.childNodes && node.childNodes.length) {
				this.compile(node)
			}
		})
	}
	isTextNode(node) {
		return node.nodeType === 3
	}
	isElementNode(node) {
		return node.nodeType === 1
	}
	compileText(node) {
		const reg = /\{\{(.+?)\}\}/
		const value = node.textContent
		if (reg.test(value)) {
			const key = RegExp.$1.trim()
			node.textContent = this._vm[key]
			new Watcher(this._vm, key, (newValue) => {
				node.textContent = newValue
			})
		}
	}
	compileElement(node) {
		const attributes = node.attributes
		if (attributes.length) {
			Array.from(attributes).forEach((attr) => {
				const { name, value } = attr
				if (this.isDirective(name)) {
					const attrName = name.indexOf(':') > -1 ? name.slice(5) : name.slice(2)
					const key = attr.value
					this.update(node, attrName, key)
				}
			})
		}
	}
	update(node, attrName, key) {
		if (attrName === 'text') {
			node.textContent = this._vm[key]
			new Watcher(this._vm, key, (newValue) => {
				node.textContent = newValue
			})
		} else if (attrName === 'model') {
			node.value = this._vm[key]
			new Watcher(this._vm, key, (newValue) => {
				node.value = newValue
			})
			node.addEventListener('input', (e) => {
				const targetValue = e.target.value
				this._vm[key] = targetValue
			})
		} else if (attrName === 'click') {
			node.addEventListener(attrName, this._methods[key].bind(this._vm))
		}
	}

	isDirective(dir) {
		// v-text v-on:click v-model
		return dir.startsWith('v-')
	}
}
```
