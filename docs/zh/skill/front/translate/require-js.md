# Require.js

## Home 主页

RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. Using a modular script loader like RequireJS will improve the speed and quality of your code.

RequireJs 是一个 js 文件和一个模块加载器。它对浏览器的使用做了优化，但是也可以使用在其他 js 环境中，比如 Rhino 和 Node。用一个类似 RequireJs 的模块化脚本将提高你的代码的质量和加载速度。

兼容性也非常好

IE 6+ .......... 兼容 ✔

Firefox 2+ ..... 兼容 ✔

Safari 3.2+ .... 兼容 ✔

Chrome 3+ ...... 兼容 ✔

Opera 10+ .. ....兼容 ✔

## Start 开始

### 获取 REQUIREJS

Go to the download page and get the file.

去[下载页面](https://requirejs.org/docs/download.html)获得文件

### 添加 REQUIREJS

This setup assumes you keep all your JavaScript files in a "scripts" directory in your project. For example, if you have a project that has a project.html page, with some scripts, the directory layout might look like so:

此设置假定你把所有的 JavaScript 文件 都放在工程下面的 “script” 文件夹下。比如，如果有一个项目有一个带有一些脚本文件 的 project.html 的页面，这个文件夹布局方式像下面：

```
project-directory/
  project.html
  scripts/
    main.js
    require.js
  helper/
   util.js
```

To take full advantage of the optimization tool, it is suggested that you keep all inline script out of the HTML, and only reference require.js with a requirejs call like so to load your script:

为了充分利用优化工具，建议你 把所有的内连脚本保留在 html 之外，并且只引用 require.js 文件来加载你的脚本

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My Sample Project</title>
		<!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
		<script data-main="scripts/main" src="scripts/require.js"></script>
	</head>
	<body>
		<h1>My Sample Project</h1>
	</body>
</html>
```

You could also place the script tag end of the `<body>` section if you do not want the loading of the require.js script to block rendering. For browsers that support it, you could also add an async attribute to the script tag.

如果你不希望因为加载 require.js 而阻断渲染，你可以把 script 标签 放在 `<body>` 区域的最后面。如果浏览器支持，你也可以在 script 标签上使用 async 属性

Inside of main.js, you can use requirejs() to load any other scripts you need to run. This ensures a single entry point, since the data-main script you specify is loaded asynchronously.

在 main.js 内部，你可以使用 requirejs 来加载你需要运行的其他脚本。这个保证了一个单一的入口，因为您指定的数据主脚本是异步加载的。

```javascript
requirejs(['helper/util'], function (util) {
	//This function is called when scripts/helper/util.js is loaded.
	//If util.js calls define(), then this function is not fired until
	//util's dependencies have loaded, and the util argument will hold
	//the module value for "helper/util".
})
```

### 优化

Once you are finished doing development and want to deploy your code for your end users, you can use the optimizer to combine the JavaScript files together and minify it. In the example above, it can combine main.js and helper/util.js into one file and minify the result.

一旦你完成开发并且想为最终使用者部署你的代码，你可以使用 优化器 去组合和压缩你的 javascript 文件。在上面的例子中，它将 main.js 和 helper/util.js 组合为一个文件并进行了压缩。

## API

### 使用

#### 加载 JavaScript 文件

RequireJS takes a different approach to script loading than traditional `<script>` tags. While it can also run fast and optimize well, the primary goal is to encourage modular code. As part of that, it encourages using module IDs instead of URLs for script tags.

RequireJS 采用与传统 script 标签不一样的脚本加载方式。虽然它运行和优化都很不错，但是它的主要目标就是鼓励模块化代码。作为它的一部分，对于脚本标签它鼓励使用 模块 id 而不是 URLs

RequireJS loads all code relative to a baseUrl.
The baseUrl is normally set to the same directory as the script used in a data-main attribute for the top level script to load for a page.
The data-main attribute is a special attribute that require.js will check to start script loading.
This example will end up with a baseUrl of scripts:

RequireJS 加载与 baseUrl 相关的所有 code。
这个 baseUrl 通常设置为与用于为页面加载的顶级脚本的 data-main 属性中的脚本相同的目录。
这个 data-main 属性是一个特殊的属性，RequireJS 将检查来开始加载脚本。
这个例子将以含有 baseUrl 的脚本结束

```javascript
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

Or, baseUrl can be set manually via the RequireJS config.
If there is no explicit config and data-main is not used, then the default baseUrl is the directory that contains the HTML page running RequireJS.

或者 baseUrl 也可以通过 RequireJS config 来手动设置。如果没有明确的配置，并且 data-main 也没有被使用， 那么默认的 baseUrl 就是 包含运行 RequireJS 的 HTML 页面的目录

RequireJS also assumes by default that all dependencies are scripts, so it does not expect to see a trailing ".js" suffix on module IDs.
RequireJS will automatically add it when translating the module ID to a path.
With the paths config, you can set up locations of a group of scripts.
All of these capabilities allow you to use smaller strings for scripts as compared to traditional `<script>` tags.

RequireJS 也会默认假定所有依赖的都是脚本，所以他不期望在 模块 ids 上看到 ".js"后缀。
RequireJS 将在转换 模块 id 为路径时候， 自动添加它。
使用设置的 path,你能设置一组脚本的位置。
所有这些功能，都允许你使用比传统的 script 标签 更小的脚本字符串。

There may be times when you do want to reference a script directly and not conform to the "baseUrl + paths" rules for finding it.
If a module ID has one of the following characteristics, the ID will not be passed through the "baseUrl + paths" configuration, and just be treated like a regular URL that is relative to the document:

这里也许有多次你想直接引用一个脚本，并且它不遵守 "baseUrl + paths" 规则来找到它。
如果一个 module ID 有以下其中一个特点，这个 ID 将不会通过 "baseUrl + paths" 配置传递，并且只会当做被视为与文件相关的常规 url 来对待。

- Ends in ".js".--- 以 .js 结尾的
- Starts with a "/". --- 以 / 开头的
- Contains an URL protocol, like "http:" or "https:". --- 包含一个 URL 协议，例如 http htpps

In general though, it is best to use the baseUrl and "paths" config to set paths for module IDs.
By doing so, it gives you more flexibility in renaming and configuring the paths to different locations for optimization builds.

不过一般来说，最好是使用 baseUrl 和 paths 设置属性来为 module IDs 设置路径
因为这样做，它让你在重命名和为其他优化文件项配置路径时有了更多的灵活性。

Similarly, to avoid a bunch of configuration, it is best to avoid deep folder hierarchies for scripts, and instead either keep all the scripts in baseUrl, or if you want to separate your library/vendor-supplied code from your app code, use a directory layout like this:

同样的，为了避免大量配置，最好是避免脚本的深层文件夹等级结构，取而代之的是，保持所有的搅拌都在 baseUrl 中，或者你想 从你的应用程序中分离出库文件/打包代码，你可以使用类似下面的布局方式

```
www/
	index.html
	js/
		app/
			sub.js
		lib/
			jquery.js
			canvas.js
		app.js
		require.js
```

in index.htm
在 inde.html 文件中

```html
<script data-main="js/app.js" src="js/require.js"></script>
```

and in app.js:
在 app.js 中

```javascript
requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js/lib',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		app: '../app',
	},
})

// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'], function ($, canvas, sub) {
	//jQuery, canvas and the app/sub module are all
	//loaded and can be used here now.
})
```

Notice as part of that example, vendor libraries like jQuery did not have their version numbers in their file names.
It is recommended to store that version info in a separate text file if you want to track it, or if you use a tool like volo, it will stamp the package.json with the version information but keep the file on disk as "jquery.js".
This allows you to have the very minimal configuration instead of having to put an entry in the "paths" config for each library.
For instance, configure "jquery" to be "jquery-1.7.2".

注意作为示例的一部分，类似 jQuery 这样的库供应者在他们的名字中是没有它们的版本号码的。如果你想追踪它，建议你在单独的文本文件中存储下来这个版本信息，或者如果你使用一个类似 volo 的工具，它将在 package.json 文件中 记录下版本信息，但将文件保存在 jquery.js 文件中。这将是你进行最少的配置，而不必在 paths 设置 为每个库都在添加一个入口。例如，设置 jquery 为 jquery-1.7.2

Ideally the scripts you load will be modules that are defined by calling define().
However, you may need to use some traditional/legacy "browser globals" scripts that do not express their dependencies via define().
For those, you can use the shim config. To properly express their dependencies.

理想情况下，这些你加载的脚本将会被被称为 define() 的方式被定义为模块。但是，你也许需要使用一些不能通过 define()表达他们的依赖的 传统的、遗留的 浏览器全局的 脚本。对于这种情况，你可以使用 shim 设置项。来正确的表达出他们的依赖

If you do not express the dependencies, you will likely get loading errors since RequireJS loads scripts asynchronously and out of order for speed.

如果你不想表达依赖关系，你可能会遇到加载失败，因为 RequireJS 是异步加载脚本并且会为了速度而导致乱序。

### data-main Entry Point

The data-main attribute is a special attribute that require.js will check to start script loading:

这个 data-main 属性是 require.js 用来检查以开始加载脚本的一个特殊的属性

```html
<!--when require.js loads it will inject another script tag
    (with async attribute) for scripts/main.js-->
<script data-main="scripts/main" src="scripts/require.js"></script>
```

You will typically use a data-main script to set configuration options and then load the first application module. Note: the script tag require.js generates for your data-main module includes the async attribute. This means that you cannot assume that the load and execution of your data-main script will finish prior to other scripts referenced later in the same page.

你通常会使用一个 data-main 脚本来配置设置选项 ，然后加载第一个应用脚本。注意：这个由 require.js 为你的 data-main 模块生成的脚本标签包含了 async 异步属性. 这意味着你不能假设 这个 data-main 脚本的加载和执行 将在同一个页面引用的其他脚本 之前完成。

For example, this arrangement will fail randomly when the require.config path for the 'foo' module has not been set prior to it being require()'d later:

例如，在为“foo”模块的 require.config 路径未在以后被 require()'d 之前设置时这种安排会随机失败：

```html
<script data-main="scripts/main" src="scripts/require.js"></script>
<script src="scripts/other.js"></script>
```

```javascript
// contents of main.js:
require.config({
	paths: {
		foo: 'libs/foo-1.1.3',
	},
})
```

```javascript
// contents of other.js:

// This code might be called before the require.config() in main.js
// has executed. When that happens, require.js will attempt to
// load 'scripts/foo.js' instead of 'scripts/libs/foo-1.1.3.js'
require(['foo'], function (foo) {})
```

If you want to do require() calls in the HTML page, then it is best to not use data-main. data-main is only intended for use when the page just has one main entry point, the data-main script. For pages that want to do inline require() calls, it is best to nest those inside a require() call for the configuration:

如果你想要在 HTML 页面中使用 require()命令，那么最好不要使用 data-main. data-main 仅仅适用于放页面中仅仅只有一个主入口，即 data-main 脚本的时候。 对于页面中想再行内使用 require.js 命令的，最好是将它们 嵌套在 require() 命令的调用中进行配置。

```javascript
<script src="scripts/require.js"></script>
<script>
require(['scripts/config'], function() {
    // Configuration loaded now, safe to do other require calls
    // that depend on that config.
    require(['foo'], function(foo) {

    });
});
</script>
```

### Define a Module

A module is different from a traditional script file in that it defines a well-scoped object that avoids polluting the global namespace. It can explicitly list its dependencies and get a handle on those dependencies without needing to refer to global objects, but instead receive the dependencies as arguments to the function that defines the module. Modules in RequireJS are an extension of the Module Pattern, with the benefit of not needing globals to refer to other modules.

一个模块是与传统的脚本文件不同的，并且他定义了一个较好作用域的来避免污染全局空间的对象。它能显示地列出它的依赖项，并且在不需要应用全局对象的情况下获得这些依赖项的把手，并且将这些依赖项作为定义模块函数的参数。 在 RequireJs 的模块 是一个模块模型的扩展，它是带有不需要去全局对象来引用其他模块的好处的。

The RequireJS syntax for modules allows them to be loaded as fast as possible, even out of order, but evaluated in the correct dependency order, and since global variables are not created, it makes it possible to load multiple versions of a module in a page.

这个用于模块的 RequireJs 的结构 允许它们尽可能快的进行加载，即使是乱序的，它也会按照正确的依赖顺序进行评估，并且因为全局的变量没有被创造，它使得在一个页面中加载不同版本的模块成为可能。

(If you are familiar with or are using CommonJS modules, then please also see CommonJS Notes for information on how the RequireJS module format maps to CommonJS modules).

如果你很熟悉或者正在使用 CommonJS 模块，那也请看看 CommonJS 笔记 以了解有关 RequireJS 模块怎么样把格式映射到 CommonJS 模块的信息

There should only be one module definition per file on disk. The modules can be grouped into optimized bundles by the optimization tool.

磁盘上的每个文件应该只有一个模块定义。这些模块将会被优化工具有组织地分到优化后的包中。

#### Simple Name/Value Pairs

> If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():
>
> 如果一个模块 没有任何依赖，并且他仅仅是一个 键值对 集合，那就可以仅仅往 define 里面传递一个对象字面量

```javascript
// Inside file my/shirt.js:
define({
	color: 'black',
	size: 'unisize',
})
```

#### Definition Functions

> If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():
>
> 如果一个模块没有依赖，但是需要一个函数来做一些准备工作，那可以 通过往 define() 传递一个函数来定义它自己

```javascript
//my/shirt.js now does setup work
//before returning its module definition.
define(function () {
	//Do setup work here

	return {
		color: 'black',
		size: 'unisize',
	}
})
```

#### Definition Functions with Dependencies

> If the module has dependencies, the first argument should be an array of dependency names, and the second argument should be a definition function. The function will be called to define the module once all dependencies have loaded. The function should return an object that defines the module. The dependencies will be passed to the definition function as function arguments, listed in the same order as the order in the dependency array:
>
> 如果一个模块有依赖项，第一个参数应该是 依赖项名字组成的数组 ，并且第二个参数应该是一个定义的函数。一旦所有的依赖加载完成，这个函数将会被调用来定义模块。这个函数返回应该一个定义这个模块的对象。这些依赖项目将会被当做函数参数传递给定义个函数，按照与依赖数组中相同的顺序列出。

```javascript
//my/shirt.js now has some dependencies, a cart and inventory
//module in the same directory as shirt.js
define(['./cart', './inventory'], function (cart, inventory) {
	//return an object to define the "my/shirt" module.
	return {
		color: 'blue',
		size: 'large',
		addToCart: function () {
			inventory.decrement(this)
			cart.add(this)
		},
	}
})
```

> In this example, a my/shirt module is created. It depends on my/cart and my/inventory. On disk, the files are structured like this:
>
> 在这个例子中，一个 my/shirt 模块被创建。它依赖于 my/cart 和 my/inventory。在磁盘上，这些文件结构类似这样

```
my/cart.js
my/inventory.js
my/shirt.js
```

The function call above specifies two arguments, "cart" and "inventory". These are the modules represented by the "./cart" and "./inventory" module names.

这个函数指定了以上两个参数："cart" and "inventory".这里有被 "./cart" and "./inventory" 模块名字 代表的模块。

The function is not called until the my/cart and my/inventory modules have been loaded, and the function receives the modules as the "cart" and "inventory" arguments.

这个函数在 my/cart 和 my/inventory 都被加载完毕时候会被调用，同时这个函数接收 这个以 "cart" 和 "inventory" 为参数的模块。

Modules that define globals are explicitly discouraged, so that multiple versions of a module can exist in a page at a time (see Advanced Usage). Also, the order of the function arguments should match the order of the dependencies.

声明全局的模块是明确不被鼓励的，这样一个模块的多个版本可以同时共存于一个页面(参阅高级用法章节)。同时，这些函数的参数的顺序应该与依赖项的顺序相匹配。

The return object from the function call defines the "my/shirt" module. By defining modules in this way, "my/shirt" does not exist as a global object.

函数调用返回的对象可以定义了 "my/shirt" 模块。通过这种方法定义模块，"my/shirt"不会以一个全局对象的方式存在。

#### Define a Module as a Function

> Modules do not have to return objects. Any valid return value from a function is allowed. Here is a module that returns a function as its module definition:
>
> 模块不一定必须返回对象。一个函数的任何合法的返回值都是被允许的。这里有一个返回一个函数来做为它的模块定义的模块

```javascript
//A module definition inside foo/title.js. It uses
//my/cart and my/inventory modules from before,
//but since foo/title.js is in a different directory than
//the "my" modules, it uses the "my" in the module dependency
//name to find them. The "my" part of the name can be mapped
//to any directory, but by default, it is assumed to be a
//sibling to the "foo" directory.
define(['my/cart', 'my/inventory'], function (cart, inventory) {
	//return a function to define "foo/title".
	//It gets or sets the window title.
	return function (title) {
		return title ? (window.title = title) : inventory.storeName + ' ' + cart.name
	}
})
```

#### Define a Module with Simplified CommonJS Wrapper:使用简化的 CommonJS Wrapper 定义一个模块：

> If you wish to reuse some code that was written in the traditional CommonJS module format it may be difficult to re-work to the array of dependencies used above, and you may prefer to have direct alignment of dependency name to the local variable used for that dependency. You can use the simplified CommonJS wrapper for those cases:
>
> 如果你想重用一些 通过传统的 CommonJS 模块格式来书写的的代码，那么重新处理上面的依赖项数组就会比较困难，并且你也许更喜欢将依赖项目名称与用于该依赖的本地变量直接对齐

```javascript
define(function (require, exports, module) {
	var a = require('a'),
		b = require('b')

	//Return the module value
	return function () {}
})
```

> This wrapper relies on Function.prototype.toString() to give a useful string value of the function contents. This does not work on some devices like the PS3 and some older Opera mobile browsers. Use the optimizer to pull out the dependencies in the array format for use on those devices.
>
> 这个包装器依赖于 Function.prototype.toString() 来提供一个函数内容的有用的字符串值。这不适用于某些设备例如 PS3 和 一些较旧的 Opera 移动端浏览器。用这个优化器以数组格式来提取依赖项目，以便在这些设备中使用。
>
> More information is available on the CommonJS page, and in the "Sugar" section in the Why AMD page.
>
> 更多的信息可在 CommonJS 页面，和 在 Why AMD 页面的 “Sugar” 区域中

#### Define a Module with a Name

You may encounter some define() calls that include a name for the module as the first argument to define():

你也许遇到一些包含一个模块名字作为 define() 的第一个参数 的 define() 调用

```javascript
//Explicitly defines the "foo/title" module:
define('foo/title', ['my/cart', 'my/inventory'], function (cart, inventory) {
	//Define foo/title object in here.
})
```

These are normally generated by the optimization tool. You can explicitly name modules yourself, but it makes the modules less portable -- if you move the file to another directory you will need to change the name. It is normally best to avoid coding in a name for the module and just let the optimization tool burn in the module names. The optimization tool needs to add the names so that more than one module can be bundled in a file, to allow for faster loading in the browser.

这些通常是由优化工具生成的。你可以自己显式地命名模块，但是这会使模块降低灵活性--如果你移动这些文件到其他文件夹，你需要更改它们的名字。最好是避免编写一个模块的名字并且，仅仅让优化工具来记录它们的名字。这个优化工具需要增加它们的名字，这样的话，不止一个模块可以被打包进一个文件里，以便与在浏览器中被快速被加载

#### Other Module Notes

One module per file.: Only one module should be defined per JavaScript file, given the nature of the module name-to-file-path lookup algorithm. You should only use the optimization tool to group multiple modules into optimized files.

一个模块一个文件：考虑到模块名称到文件路径的查找算法，每一个 JavaScript 文件应该只被定义为一个模块。您应该只使用优化工具将多个模块分组到优化的文件中。

Relative module names inside define(): For require("./relative/name") calls that can happen inside a define() function call, be sure to ask for "require" as a dependency, so that the relative name is resolved correctly:

内部的 define()中相关的模块名字： 对于 可能会发生在 define() 函数内部 的 require("./relative/name") 调用，一定要确保 require 作为依赖，这样相关的名字就会正常解析

```javascript
define(['require', './relative/name'], function (require) {
	var mod = require('./relative/name')
})
```

Or better yet, use the shortened syntax that is available for use with translating CommonJS modules:

或者更好的是，使用可用于翻译 CommonJS 模块的缩写语法

```javascript
define(function (require) {
	var mod = require('./relative/name')
})
```

This form will use Function.prototype.toString() to find the require() calls, and add them to the dependency array, along with "require", so the code will work correctly with relative paths.

这个表单将用 Function.prototype.toString() 来发现 require() 调用，并且将它们与 require 一起添加到依赖数组项，因此这个代码将在相对路径下正常工作。

Relative paths are really useful if you are creating a few modules inside a directory, so that you can share the directory with other people or other projects, and you want to be able to get a handle on the sibling modules in that directory without having to know the directory's name.

如果你正在一个文件夹内创建几个模块，相对路径真的很有用。因为你能与其他人或者其他工程共享文件夹，并且你能获得与该文件夹下的其他模块的句柄，而不必需要知道文件夹的名字。

Relative module names are relative to other names, not paths: The loader stores modules by their name and not by their path internally. So for relative name references, those are resolved relative to the module name making the reference, then that module name, or ID, is converted to a path if needs to be loaded. Example code for a 'compute' package that has a 'main' and 'extras' modules in it:

相对的模块名字是相对于其他名字的，而不是路径：这个加载器内部是通过他们的名字记录模块的而不是通过他们的路径。因为对于相对的名字引用，他们是相对于引用的模块名字来进行解析的，然后如果他们想要被加载的话，这些模块名字、或者模块 id 会被转换为路径。下面是含有 main 和 extras 模块 的 compute 包的示例代码

```
* lib/
    * compute/
        * main.js
        * extras.js
```

where the main.js module looks like this:

main.js 模块像这样

```javascript
define(['./extras'], function (extras) {
	//Uses extras in here.
})
```

If this was the paths config:

这个是路径配置

```javascript
require.config({
	baseUrl: 'lib',
	paths: {
		compute: 'compute/main',
	},
})
```

And a require(['compute']) is done, then lib/compute/main.js will have the module name of 'compute'. When it asks for './extras', that is resolved relative to 'compute', so 'compute/./extras', which normalizes to just 'extras'. Since there is no paths config for that module name, the path generated will be for 'lib/extras.js', which is incorrect.

一个 require(['computed'])加载完成，这个 lib/compute/main.js 就有了一个叫做 'compute' 的模块名字。当它遇到 "./extras" 时候，它是相对于 compute 被解析的，因此 'compute/./extras' 将被规范化地处理为 extras. 因为这个模块名字没有设置，因此生成的路径将用于“lib/extras.js”，这是不正确的

For this case, packages config is a better option, since it allows setting the main module up as 'compute', but internally the loader will store the module with the ID of 'compute/main' so that the relative reference for './extras' works.

对于这个例子，包配置是一个好的选项，因为它允许将主模块设置为 "compute"， 但是在内部这个加载器将记录下 compute/main 的模块 id ，以便 "./extras"的相对引用的工作。

Another option is to construct a module at lib/compute.js that is just define(['./compute/main'], function(m) { return m; });, then there is no need for paths or packages config.

另一个设置是在 lib/compute.js 上构建一个模块，它只是用来 define(['./compute/main'], function(m) { return m; });， 然后这里不需要路径或者包配置。

Or, do not set that paths or packages config and do the top level require call as require(['compute/main']).

或者，不设置路径或者包配置并且，将 require(['compute/main]) 作为顶层 require 调用

Generate URLs relative to module: You may need to generate an URL that is relative to a module. To do so, ask for "require" as a dependency and then use require.toUrl() to generate the URL:

生成相对于模块的 URLS: 你可能需要产生一个相对于某个模块的 URL. 为了达到如此，把 require 作为一个依赖项然后使用 require.toUrl() 来产生一个 URL

```javascript
define(['require'], function (require) {
	var cssUrl = require.toUrl('./style.css')
})
```

Console debugging: If you need to work with a module you already loaded via a require(["module/name"], function(){}) call in the JavaScript console, then you can use the require() form that just uses the string name of the module to fetch it:

调试打印：如果你需要使用一个 你已经在 JavaScript 控制台 通过 require(["module/name"], function(){}) 调用方式来加载的模块，你可以从它里面使用 require() 表单里使用模块名字来获得它

```javascript
require('module/name').callSomeFunction()
```

Note this only works if "module/name" was previously loaded via the async version of require: require(["module/name"]). If using a relative path, like './module/name', those only work inside define

注意这个只在 "module/name" 被 通过异步版本的 require：require(["module/name"]) 先加载的时候工作的。 如果使用了一个相对路径，类似 './module/name' ，这些只会在内部定义里工作

#### Dependencies

If you define a circular dependency ("a" needs "b" and "b" needs "a"), then in this case when "b"'s module function is called, it will get an undefined value for "a". "b" can fetch "a" later after modules have been defined by using the require() method (be sure to specify require as a dependency so the right context is used to look up "a"):

如果有定义一个 环形的依赖项(a 依赖 b，b 依赖 a)，在这个例子中当 b 模块函数被调用时，它将为 a 获得一个未定义的值。在使用 require() 方法定义模块只有，b 可以获取 a (确保 指定 require 为依赖项 以便使用正确的上下文来查找 a )

```javascript
//Inside b.js:
define(['require', 'a'], function (require, a) {
	//"a" in this case will be null if "a" also asked for "b",
	//a circular dependency.
	return function (title) {
		return require('a').doSomething()
	}
})
```

Normally you should not need to use require() to fetch a module, but instead rely on the module being passed in to the function as an argument. Circular dependencies are rare, and usually a sign that you might want to rethink the design. However, sometimes they are needed, and in that case, use require() as specified above.

正常情况下你应该 不需要使用 require() 来获取一个模块，而是依赖于作为参数传递给函数的模块。循环依赖很少见，这通常表明你可能需要重新考虑这个设计。但是，有时也是需要它们的，在这时候，可以如上所述使用 require()

If you are familiar with CommonJS modules, you could instead use exports to create an empty object for the module that is available immediately for reference by other modules. By doing this on both sides of a circular dependency, you can then safely hold on to the the other module. This only works if each module is exporting an object for the module value, not a function:

如果你对 commonJS 模块很熟悉，你可以使用 export 来为那个被其他模块立即引用的模块创建一个空对象。通过在循环引用的两侧执行这个操作，你可以安全地持有另一个模块。这只适用于每个模块导出的模块值是一个对象而不是一个函数。

```javascript
//Inside b.js:
define(function (require, exports, module) {
	//If "a" has used exports, then we have a real
	//object reference here. However, we cannot use
	//any of "a"'s properties until after "b" returns a value.
	var a = require('a')

	exports.foo = function () {
		return a.bar()
	}
})
```

Or, if you are using the dependency array approach, ask for the special 'exports' dependency:

或者，如果你正在使用数组依赖项的方法，可以请求特殊的 exports 依赖

```javascript
//Inside b.js:
define(['a', 'exports'], function (a, exports) {
	//If "a" has used exports, then we have a real
	//object reference here. However, we cannot use
	//any of "a"'s properties until after "b" returns a value.

	exports.foo = function () {
		return a.bar()
	}
})
```

#### Specify a JSONP Service Dependency

JSONP is a way of calling some services in JavaScript. It works across domains and it is an established approach to calling services that just require an HTTP GET via a script tag.

JSONP 在 JavaScript 中是一种调用一些服务的方式。它跨域工作并且是一种仅通过一个 script 标签 来加载一个 http get 请求的既定的服务。

To use a JSONP service in RequireJS, specify "define" as the callback parameter's value. This means you can get the value of a JSONP URL as if it was a module definition.

为了在 requireJS 中调用 JSONP 服务，特殊的 define ，请指定 define 作为回调参数值。这意味着如果一个 JSON URL 是模块定义的话，你能够获取它的值。

Here is an example that calls a JSONP API endpoint. In this example, the JSONP callback parameter is called "callback", so "callback=define" tells the API to wrap the JSON response in a "define()" wrapper:

这有一个调用 JSONP api 端的例子。在这个例子中，JSONP 回调函数参数叫做 callback, 因此 callback=define 就是告诉 API 来 用 define() 包装器来包装 JSON 响应

```javascript
require(['http://example.com/api/data.json?callback=define'], function (data) {
	//The data object will be the API response for the
	//JSONP data call.
	console.log(data)
})
```

This use of JSONP should be limited to JSONP services for initial application setup. If the JSONP service times out, it means other modules you define via define() may not get executed, so the error handling is not robust.

这个 JSONP 的使用 应该被限制于用于初始应用程序设置的 JSONP 服务。如果这个 JSONP 服务超时了，它意味着你通过 define() 定义的其他模块可能没有被执行，这样的错误处理不可靠。

Only JSONP return values that are JSON objects are supported. A JSONP response that is an array, a string or a number will not work.

只有 JSONP 返回 JSONP 对象的值是被支持的。一个 JSONP 响应值为一个数组、一个字符串或者一个数字 将不会工作。

This functionality should not be used for long-polling JSONP connections -- APIs that deal with real time streaming. Those kinds of APIs should do more script cleanup after receiving each response, and RequireJS will only fetch a JSONP URL once -- subsequent uses of the same URL as a dependency in a require() or define() call will get a cached value.

这个泛函数不应该被用于长轮询 JSONP 链接 -- 处理实时流媒体的 APIs。 这些种类的 APIs 在收到每个响应后应该做更多的脚本清理，并且 RequireJS 将一次只获取一个 JSONP URL -- 后续的 在 require() 或者 define() 调用中 使用同样的 URL 将会获得一个缓存的值。

Errors in loading a JSONP service are normally surfaced via timeouts for the service, since script tag loading does not give much detail into network problems. To detect errors, you can override requirejs.onError() to get errors. There is more information in the Handling Errors section.

加载 JSONP 时候的错误服务 一般是通过服务超时来表现出来的，因此 script 标签的加载并在网络问题上并不会给出太多细节。为了查明错误，你可以重写 requirejs.onError() 来获取错误。在处理错误区域中有更多的信息。

#### Undefining a Module

There is a global function, requirejs.undef(), that allows undefining a module. It will reset the loader's internal state to forget about the previous definition of the module.

这个有一个全局函数 requirejs.undef()，它允许取消定义一个模块。它将重置加载器的内部转态 来忘记模块的先前定义。

However, it will not remove the module from other modules that are already defined and got a handle on that module as a dependency when they executed. So it is really only useful to use in error situations when no other modules have gotten a handle on a module value, or as part of any future module loading that may use that module. See the errback section for an example.

但是，它不会将其他 已经被定义并且在它们执行时候已经把这个模块作为依赖项拿到句柄的 模块中移除。因此它真的仅仅在错误情况下才有用，当没有其他模块拿到一个模块值作为句柄时，或者作为一个将来 可能使用那个模块作为模块加载的一部分的时候。有关示例。看 errback 部分。

If you want to do more sophisticated dependency graph analysis for undefining work, the semi-private onResourceLoad API may be helpful.

如果你想做为 未定义的工作做更精确的依赖图表分析，the semi-private onResourceLoad API 将会很有用。

### MECHANICS

RequireJS loads each dependency as a script tag, using head.appendChild().

RequireJS 使用 head.appendChild() 加载每一个依赖项作为一个 script 标签

RequireJS waits for all dependencies to load, figures out the right order in which to call the functions that define the modules, then calls the module definition functions once the dependencies for those functions have been called. Note that the dependencies for a given module definition function could be called in any order, due to their sub-dependency relationships and network load order.

RequireJS 等待所有的依赖项来加载，算出调用定义模块的正确顺序，然后一旦这些函数依赖项被调用时候就触发这些模块定义。注意一个给定的被定义的模块可以以任何顺序被调用，这依赖于他们的子依赖关系和网络记载熟顺序。

Using RequireJS in a server-side JavaScript environment that has synchronous loading should be as easy as redefining require.load(). The build system does this, the require.load method for that environment can be found in build/jslib/requirePatch.js.

在有同步加载的服务端 JavaScript 环境中 使用 requireJS 应该是像像重新定义 require.load 一样简单的。这个构建环境执行此操作，这个环境的 require.load 方法可以在 build/jslib/requirePatch.js 中被发现

In the future, this code may be pulled into the require/ directory as an optional module that you can load in your env to get the right load behavior based on the host environment.

在将来，这个代码也许会被作为 可选模块放在 require/ 文件夹中，这样你可以在你的 env 中加载，以此在主机环境中获得正确的加载行为。

### CONFIGURATION OPTIONS

When using require() in the top-level HTML page (or top-level script file that does not define a module), a configuration object can be passed as the first option:

当在顶层 HTML 页面(或者不是定义模块的顶层的脚本文件)中使用 require()，一个设置对象可以被作为第一个设置项被传递。

```javascript
<script src="scripts/require.js"></script>
<script>
  require.config({
    baseUrl: "/another/path",
    paths: {
        "some": "some/v1.0"
    },
    waitSeconds: 15
  });
  require( ["some/module", "my/module", "a.js", "b.js"],
    function(someModule,    myModule) {
        //This function will be called when all the dependencies
        //listed above are loaded. Note that this function could
        //be called before the page is loaded.
        //This callback is optional.
    }
  );
</script>

```

You may also call require.config from your data-main Entry Point, but be aware that the data-main script is loaded asynchronously. Avoid other entry point scripts which wrongly assume that data-main and its require.config will always execute prior to their script loading.

你也可以在你的 data-main 入口调用 require.config，但是请注意到，data-main 脚本文件是被异步加载的。避免其他的错误地假设 data-main 和它的 require.config 将总是比其他的脚本加载优先执行的脚本入口 。

Also, you can define the config object as the global variable require before require.js is loaded, and have the values applied automatically. This example specifies some dependencies to load as soon as require.js defines require():

同样的，你可以在 require.js 加载前把 config 对象定义为一个全局变量，并自动应用这些值。这个例子明示了一些 一旦 require.js 定义 require()时就要加载的依赖项

```javascript
<script>
    var require = {
        deps: ["some/module1", "my/module2", "a.js", "b.js"],
        callback: function(module1, module2) {
            //This function will be called when all the dependencies
            //listed above in deps are loaded. Note that this
            //function could be called before the page is loaded.
            //This callback is optional.
        }
    };
</script>
<script src="scripts/require.js"></script>
```

Note: It is best to use var require = {} and do not use window.require = {}, it will not behave correctly in IE.

注意：最好使用 var require = {} 而不是使用 window.require = {}, 否则在 IE 中将出现错误

There are some patterns for separating the config from main module loading.

这有一些从主模块加载中分离配置的模式

Supported configuration options:

主持的配置选项

**baseUrl**: the root path to use for all module lookups. So in the above example, "my/module"'s script tag will have a src="/another/path/my/module.js". baseUrl is not used when loading plain .js files (indicated by a dependency string starting with a slash, has a protocol, or ends in .js), those strings are used as-is, so a.js and b.js will be loaded from the same directory as the HTML page that contains the above snippet.

If no baseUrl is explicitly set in the configuration, the default value will be the location of the HTML page that loads require.js. If a data-main attribute is used, that path will become the baseUrl.

The baseUrl can be a URL on a different domain as the page that will load require.js. RequireJS script loading works across domains. The only restriction is on text content loaded by text! plugins: those paths should be on the same domain as the page, at least during development. The optimization tool will inline text! plugin resources so after using the optimization tool, you can use resources that reference text! plugin resources from another domain.

**baseUrl**: 用来查找所有模块的主路径。在以上例子中， "my/module"的脚本 将会拥有一个 地址指向 /another/path/my/module.js. baseUrl 在加载普通的 js 文件(明确以斜杠开头、有协议或以 .js 结尾的) 时并不适用，这些字符串将会原样适用，并且 a.js 和 b.js 将会从 包含上述代码段的 HTML 页面的同级目录中加载。

如果 baseUrl 在配置中没有被明确设置时候，这个默认值将会被定为这个加载 require.js 页面的位置。如果一个 data-main 属性被使用时候，那个路径会变为 baseUrl.

这个 baseUrl 也可以是一个与加载 require.js 页面的不同的域名的 URL. RequireJS 脚本加载可以跨域工作。唯一的限制就是被文本插件加载的文本内容： 至少在开发过程中，这些路径应该是与页面一样的域名。这些优化工具将内联文本插件资源，因此当使用优化工具后，你可以使用 从其他域名引用的文本插件资源的资源。

**paths**: path mappings for module names not found directly under baseUrl. The path settings are assumed to be relative to baseUrl, unless the paths setting starts with a "/" or has a URL protocol in it ("like http:"). Using the above sample config, "some/module"'s script tag will be src="/another/path/some/v1.0/module.js".

The path that is used for a module name should not include an extension, since the path mapping could be for a directory. The path mapping code will automatically add the .js extension when mapping the module name to a path. If require.toUrl() is used, it will add the appropriate extension, if it is for something like a text template.

When run in a browser, paths fallbacks can be specified, to allow trying a load from a CDN location, but falling back to a local location if the CDN location fails to load.

**paths**: 从模块名字中的 path 映射 不是直接在 baseURl 找到。这个路径设置 假设是相对于 baseURL 的，除非 这个路径被设置为 以 / 或者一个 url 协议(例如 http:) 开头的。使用上面的列子配置， "some/module" 的脚本标签将会是 src="/another/path/some/v1.0/module.js"

这个被用来表示模块名字的路径不应该包含扩展名，因为这个路径映射也可以是一个文件夹。在映射模块名字为一个路径时候，这个路径映射代码将会自动添加.js 后缀。如果 require.toUrl()被使用了，他将会加上适当的后缀，如果他是用于类似文本模板的东西。

在浏览器中运行时，路径回调需要被指定，以便允许尝试从一个 CDN 地址 进行加载，但是如果 CDN 位置加载失败了会返回本地位置。

**bundles**: Introduced in RequireJS 2.1.10: allows configuring multiple module IDs to be found in another script. Example:

**bundles**：RequireJS 2.1.10 中介绍：允许设置多个模块 id 来在另一个脚本中被发现。例如

```javascript
requirejs.config({
	bundles: {
		primary: ['main', 'util', 'text', 'text!template.html'],
		secondary: ['text!secondary.html'],
	},
})

require(['util', 'text'], function (util, text) {
	//The script for module ID 'primary' was loaded,
	//and that script included the define()'d
	//modules for 'util' and 'text'
})
```

That config states: modules 'main', 'util', 'text' and 'text!template.html' will be found by loading module ID 'primary'. Module 'text!secondary.html' can be found by loading module ID 'secondary'.

这个设置状态：模块 main util text 和 'text!template.html' 在加载 模块 id "primary"时候被发现。模块 'text!secondary.html' 在 加载模块 id "secondary" 时候被发现

This only sets up where to find a module inside a script that has multiple define()'d modules in it. It does not automatically bind those modules to the bundle's module ID. The bundle's module ID is just used for locating the set of modules.

这只设置在一个有多个 define()的脚本中哪里找到一个模块。它不会自动把这些模块自动绑定到这些包的模块 id 上。这个包的模块 id 仅仅用来定位模块集。

Something similar is possible with paths config, but it is much wordier, and the paths config route does not allow loader plugin resource IDs in its configuration, since the paths config values are path segments, not IDs.

类似的情况也可以通过 路径设置 来实现，但它更冗长，并且这个路径配置路由不允许在它的设置中加载插件资源 ids，因为这个路径设置值是路径片段，而不是 ids

bundles config is useful if doing a build and that build target was not an existing module ID, or if you have loader plugin resources in built JS files that should not be loaded by the loader plugin. Note that the keys and values are module IDs, not path segments. They are absolute module IDs, not a module ID prefix like paths config or map config. Also, bundle config is different from map config in that map config is a one-to-one module ID relationship, where bundle config is for pointing multiple module IDs to a bundle's module ID.

如果你正在做一个构建而且执行构建目标不是一个现有的模块 id， 或者你在构建的 js 文件中有加载插件资源，而这些资源不应该被加载器插件加载 ，包配置是很有用的。请注意，键和值是 模块 ids，而不是路径段。它们是绝对的模块 id，不是一个带类似于 paths config 或者 map config 前缀 的模块 id.此外，包配置是不同于 map 配置的的，因为 map 配置是一对一的模块 id 关系，而包配置是将多个模块 id 指向一个包模块的 id.

As of RequireJS 2.2.0, the optimizer can generate the bundles config and insert it into the top level requirejs.config() call. See the bundlesConfigOutFile build config option for more details.

作为 requireJS 2.2.0, 这个优化器可以产生这个包配置并且将其插入顶层的 requirejs.config()调用。有关更多细节，参阅 bundlesConfigOutFile 构建配置选项

**shim**: Configure the dependencies, exports, and custom initialization for older, traditional "browser globals" scripts that do not use define() to declare the dependencies and set a module value.

shim: 配置依赖项，exports 和 旧版本的自定义初始化，传统的 “浏览器全局” 脚本不使用 define() 来声明依赖关系和设置一个模块值。

Here is an example. It requires RequireJS 2.1.0+, and assumes backbone.js, underscore.js and jquery.js have been installed in the baseUrl directory. If not, then you may need to set a paths config for them:

下面是一个例子。它需要 RequireJS 2.1.0+， 并假设 backbone.js, underscore.js and jquery.js 在 baseUrl 文件夹中已经被安装了。如果没有，你可能需要为它们设置一个路径配置。

```javascript
requirejs.config({
	//Remember: only use shim config for non-AMD scripts,
	//scripts that do not already call define(). The shim
	//config will not work correctly if used on AMD scripts,
	//in particular, the exports and init config will not
	//be triggered, and the deps config will be confusing
	//for those cases.
	shim: {
		backbone: {
			//These script dependencies should be loaded before loading
			//backbone.js
			deps: ['underscore', 'jquery'],
			//Once loaded, use the global 'Backbone' as the
			//module value.
			exports: 'Backbone',
		},
		underscore: {
			exports: '_',
		},
		foo: {
			deps: ['bar'],
			exports: 'Foo',
			init: function (bar) {
				//Using a function allows you to call noConflict for
				//libraries that support it, and do other cleanup.
				//However, plugins for those libraries may still want
				//a global. "this" for the function will be the global
				//object. The dependencies will be passed in as
				//function arguments. If this function returns a value,
				//then that value is used as the module export value
				//instead of the object found via the 'exports' string.
				//Note: jQuery registers as an AMD module via define(),
				//so this will not work for jQuery. See notes section
				//below for an approach for jQuery.
				return this.Foo.noConflict()
			},
		},
	},
})

//Then, later in a separate file, call it 'MyModel.js', a module is
//defined, specifying 'backbone' as a dependency. RequireJS will use
//the shim config to properly load 'backbone' and give a local
//reference to this module. The global Backbone will still exist on
//the page too.
define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({})
})
```

In RequireJS 2.0.\*, the "exports" property in the shim config could have been a function instead of a string. In that case, it functioned the same as the "init" property as shown above. The "init" pattern is used in RequireJS 2.1.0+ so a string value for exports can be used for enforceDefine, but then allow functional work once the library is known to have loaded.

在 RequireJS 2.0.中，这个在 shim 配置中的 exports 属性 可以是一个函数而不是一个字符串。在这种情况下，它的功能与上面的所示 init 属性相同。这个 init 模型可以在 RequireJS 2.1。0+中使用，因此导出的一个字符串值可以用于强定义，但是一旦知道库已经被加载了，就允许函数工作。

For "modules" that are just jQuery or Backbone plugins that do not need to export any module value, the shim config can just be an array of dependencies:

对于那些仅仅是 jQuery or Backbone 插件，不需要导出任何模块值，这个 shim 配置可以是一个依赖性数组。

```javascript
requirejs.config({
	shim: {
		'jquery.colorize': ['jquery'],
		'jquery.scroll': ['jquery'],
		'backbone.layoutmanager': ['backbone'],
	},
})
```

Note however if you want to get 404 load detection in IE so that you can use paths fallbacks or errbacks, then a string exports value should be given so the loader can check if the scripts actually loaded (a return from init is not used for enforceDefine checking):

注意：如果你这 IE 中获得 404 加载提示你可以使用路径回退或者 errbacks, 那么应该给出一个字符串导出值，这样加载器可以检查脚本是否实际加载了（init 返回值不是用来强制执行定义检查的）

```javascript
requirejs.config({
	shim: {
		'jquery.colorize': {
				deps: ['jquery'],
				exports: 'jQuery.fn.colorize'
		},
		'jquery.scroll': {
				deps: ['jquery'],
				exports: 'jQuery.fn.scroll'
		},
		'backbone.layoutmanager': {
				deps: ['backbone']
				exports: 'Backbone.LayoutManager'
		}
	}
});
```

Important notes for "shim" config:

重要的关于 shim 配置的笔记

- The shim config only sets up code relationships. To load modules that are part of or use shim config, a normal require/define call is needed. Setting shim by itself does not trigger code to load.

shim 配置只设置代码关系。为了加载属于或者使用 shim 配置加载模块，需要一个正常的 require/define 调用。自行设置 shim 不会触发加载代码。

- Only use other "shim" modules as dependencies for shimmed scripts, or AMD libraries that have no dependencies and call define() after they also create a global (like jQuery or lodash). Otherwise, if you use an AMD module as a dependency for a shim config module, after a build, that AMD module may not be evaluated until after the shimmed code in the build executes, and an error will occur. The ultimate fix is to upgrade all the shimmed code to have optional AMD define() calls.

只使用其他 shim 模块作为 shimmed 脚本模块的依赖项，或者 那些没有依赖项的 AMD 库并在他们创建全局(例如 jQuery 或者 lodash)后调用 define().否则，如果你使用一个 AMD 模块作为 shim 配置模块的依赖 ，在构建之后，那个 AMD 模块可能直到构建中的 shimmed 代码被执行以后才会被评估，并且一会出现错误。最终的解决方案是升级所有的 shimmed 代码来使得可选的 AMD define() 调用。

- If it is not possible to upgrade the shimmed code to use AMD define() calls, as of RequireJS 2.1.11, the optimizer has a wrapShim build option that will try to automatically wrap the shimmed code in a define() for a build. This changes the scope of shimmed dependencies, so it is not guaranteed to always work, but, for example, for shimmed dependencies that depend on an AMD version of Backbone, it can be helpful.

如果不能升级 shimmed 代码来使用 AMD define()调用，从 RequireJS 2.1.11 开始，这个优化器有一个 wrapShim 构建选项，他会尝试自动将 shimmed 代码 包装在一个 define() 中去构建。这改变了 shimmed 依赖项的范围，因此它不能确保总是工作，例如，对于依赖于一个 AMD 的版本的 Backbone 的 shimmed 依赖，他是有用的。

- The init function will not be called for AMD modules. For example, you cannot use a shim init function to call jQuery's noConflict. See Mapping Modules to use noConflict for an alternate approach to jQuery.

这个初始化函数将不会被 AMD 模块调用。例如，你不能使用一个 shim 初始化函数来调用 jQuery's 的 noConflict. 映射模块来使用 noConflict 作为 jQuery 的替代方法

- Shim config is not supported when running AMD modules in node via RequireJS (it works for optimizer use though). Depending on the module being shimmed, it may fail in Node because Node does not have the same global environment as browsers. As of RequireJS 2.1.7, it will warn you in the console that shim config is not supported, and it may or may not work. If you wish to suppress that message, you can pass requirejs.config({ suppress: { nodeShim: true }});.

当在 node 中 运行 RequireJS 中 AMD 模块时候，shim 配置是不支持的。（它适用于优化器使用）。依赖于被 shimmed 的模块，在 node 中他可能会失败因为 node 没有和浏览器一样的全局环境。在 RequireJS 2.1.7 中，它将在控制台中警告你：shim 配置不被支持，它可能不会工作。如果你想要抑制这个信息，你可以传递 require.config({ suppress: { nodeShim: true }} )

Important optimizer notes for "shim" config:

“shim”配置的重要优化注意事项:

- You should use the mainConfigFile build option to specify the file where to find the shim config. Otherwise the optimizer will not know of the shim config. The other option is to duplicate the shim config in the build profile.

你应该使用 mainConfigFile 构建选项来指定在哪个文件中找到 shim 配置。否则，优化器将不会知道 shim 设置。另一个选项是在构建概要文件中复制 shim 配置的。

- Do not mix CDN loading with shim config in a build. Example scenario: you load jQuery from the CDN but use the shim config to load something like the stock version of Backbone that depends on jQuery. When you do the build, be sure to inline jQuery in the built file and do not load it from the CDN. Otherwise, Backbone will be inlined in the built file and it will execute before the CDN-loaded jQuery will load. This is because the shim config just delays loading of the files until dependencies are loaded, but does not do any auto-wrapping of define. After a build, the dependencies are already inlined, the shim config cannot delay execution of the non-define()'d code until later. define()'d modules do work with CDN loaded code after a build because they properly wrap their source in define factory function that will not execute until dependencies are loaded. So the lesson: shim config is a stop-gap measure for non-modular code, legacy code. define()'d modules are better.

不要在构建中混合 CDN 加载和 shim 配置。示例场景：你从 CDN 中加载 jQuery，但是使用这个 shim 配置来加载一些类似依赖于 jQuery 的库存版本。当你进行构建时候，请确保 jQuery 内联到构建文件中而不是从 CDN 中加载它。否则，Backbone 将内联在构建文件中，并且他将在 cdn-loader jQuery 加载之前执行。这是因为这个 shim 配置会延迟这个文件的加载，直到依赖项加载完毕，但不会对 define 进行任何 auto-wrapping. 在构建之后，这些依赖项已经被内联，shim 配置不能将 非-define()'d 代码的指向延迟到以后。define()的模块确实可以在编译后与 CDN 加载的代码一起工作，因为他们正确地将它们的源代码包装在 define 工厂函数中，该函数在执行依赖加载后才会执行。所以教训是：shim 配置是对非模块化代码、遗留代码的权益措施。Define()'d 模块更好

- For local, multi-file builds, the above CDN advice also applies. For any shimmed script, its dependencies must be loaded before the shimmed script executes. This means either building its dependencies directly in the buid layer that includes the shimmed script, or loading its dependencies with a require([], function (){}) call, then doing a nested require([]) call for the build layer that has the shimmed script.

对于本地的多文件构建，上面的 CDN 建议也适用。对于任何 shimmed 脚本，它的依赖项必须在 shimmed 脚本执行前被加载。这就意味着，要么直接在包含 shimmed 脚本的 buid 层中构建它的依赖项，要么使用 require([],function(){})调用来加载它的依赖项，然后对具有 shimmed 脚本的构建层执行嵌套的 require([]) 调用。

- If you are using uglifyjs to minify the code, do not set the uglify option toplevel to true, or if using the command line do not pass -mt. That option mangles the global names that shim uses to find exports.

如果你正在使用 uglifyjs 来压缩代码，不要将 uglify 选项设置为 true, 或者如果使用命令行，不要传递 -mt。这个选项破坏了 shim 用来寻找出口产品的全局名称。

**map**: For the given module prefix, instead of loading the module with the given ID, substitute a different module ID.

**map**： 对于给定的模块前缀，而不是加载具有给定 ID 的模块，而是替换一个不同的模块 ID

This sort of capability is really important for larger projects which may have two sets of modules that need to use two different versions of 'foo', but they still need to cooperate with each other.

这种排序能力对于大型项目来说非常重要，因为他们也许有两组模块，需要不同版本的 foo， 但是他们仍然需要相互协作。

This is not possible with the context-backed multiversion support. In addition, the paths config is only for setting up root paths for module IDs, not for mapping one module ID to another one.

这在上下文支持的多版本支持下是不可能的。此外，路径配置仅仅用于为模块 ID 设置根路径，而不是映射一个模块 ID 到另一个

map example:

```javascript
requirejs.config({
	map: {
		'some/newmodule': {
			foo: 'foo1.2',
		},
		'some/oldmodule': {
			foo: 'foo1.0',
		},
	},
})
```

If the modules are laid out on disk like this:

如果磁盘上的模块布局类似这样

```
	foo1.0.js
	foo1.2.js
		some/
			newmodule.js
			oldmodule.js

```

When 'some/newmodule' does `require('foo')` it will get the foo1.2.js file, and when 'some/oldmodule' does `require('foo')` it will get the foo1.0.js file.

当 'some/newmodule' 做   `require('foo')` 时候，它将获得 foo1.2.js 文件，而当 'some/oldmodule' 做`require('foo')`时候，它将获得 foo1.0.js 文件

This feature only works well for scripts that are real AMD modules that call define() and register as anonymous modules. Also, only use absolute module IDs for map config. Relative IDs (like '../some/thing') do not work.

这个特征只适用了那些调用了那些调用 define() 并注册为匿名模块的真正的 AMD 模块脚本。同样，map 配置只能适用绝对模块 ids. 相对的 ids(类似 '../some/thing')不起作用。

There is also support for a "\*" map value which means "for all modules loaded, use this map config". If there is a more specific map config, that one will take precedence over the star config. Example:

它还支持一个 "\*" 映射值。意思是"对于所有的加载的模块，使用这个映射配置"。如果有一个更具体的 map 配置，他将优先于开始配置。例如：

```javascript
requirejs.config({
	map: {
		'*': {
			foo: 'foo1.2',
		},
		'some/oldmodule': {
			foo: 'foo1.0',
		},
	},
})
```

Means that for any module except "some/oldmodule", when "foo" is wanted, use "foo1.2" instead. For "some/oldmodule" only, use "foo1.0" when it asks for "foo".

意味着任何除了"some/oldmodule"意外的模块，当需要 foo 时候，使用 "foo1.2" 来代替。 仅对于 "some/oldmodule"，当它请求 "foo"时候，使用 "foo1.0"

Note: when doing builds with map config, the map config needs to be fed to the optimizer, and the build output must still contain a requirejs config call that sets up the map config. The optimizer does not do ID renaming during the build, because some dependency references in a project could depend on runtime variable state. So the optimizer does not invalidate the need for a map config after the build.

笔记：当用 map 设置进行构建时候，map 配置需要提供给优化器，并且构建输出必须仍然包含一个 requirejs 配置用来设置 map 配置。优化器在构建期间不进行 id 重命名，因为项目中引用的一些依赖可以依靠于运行时候的变装状态。因此这个优化器不会在构建之后取消对 map 配置的需求。

config: There is a common need to pass configuration info to a module. That configuration info is usually known as part of the application, and there needs to be a way to pass that down to a module. In RequireJS, that is done with the config option for requirejs.config(). Modules can then read that info by asking for the special dependency "module" and calling module.config(). Example:

配置：通常把配置信息传递给一个模块。配置信息通常被认为是应用程序的一部分，并且需要有一种方法将其传递给一个模块。在 RequireJS 中，这是通过 requireJS.config() 的配置选项来完成的。模块可以通过请求特殊的依赖项模块来读取 和调用 module.config。例如

```javascript
requirejs.config({
	config: {
		bar: {
			size: 'large',
		},
		baz: {
			color: 'blue',
		},
	},
})

//bar.js, which uses simplified CJS wrapping:
//https://requirejs.org/docs/whyamd.html#sugar
define(function (require, exports, module) {
	//Will be the value 'large'
	var size = module.config().size
})

//baz.js which uses a dependency array,
//it asks for the special module ID, 'module':
//https://github.com/requirejs/requirejs/wiki/Differences-between-the-simplified-CommonJS-wrapper-and-standard-AMD-define#wiki-magic
define(['module'], function (module) {
	//Will be the value 'blue'
	var color = module.config().color
})
```

For passing config to a package, target the main module in the package, not the package ID:

要将一个配置传递给一个包，目标是包中的主模块，而不是 包 ID

```javascript
requirejs.config({
	//Pass an API key for use in the pixie package's
	//main module.
	config: {
		'pixie/index': {
			apiKey: 'XJKDLNS',
		},
	},
	//Set up config for the "pixie" package, whose main
	//module is the index.js file in the pixie folder.
	packages: [
		{
			name: 'pixie',
			main: 'index',
		},
	],
})
```

packages: configures loading modules from CommonJS packages. See the packages topic for more information.

nodeIdCompat: Node treats module ID example.js and example the same. By default these are two different IDs in RequireJS. If you end up using modules installed from npm, then you may need to set this config value to true to avoid resolution issues. This option only applies to treating the ".js" suffix differently, it does not do any other node resolution and evaluation matching such as .json file handling (JSON handling needs a 'json!' loader plugin anyway). Available in 2.1.10 and greater.

waitSeconds: The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.

context: A name to give to a loading context. This allows require.js to load multiple versions of modules in a page, as long as each top-level require call specifies a unique context string. To use it correctly, see the Multiversion Support section.

deps: An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration. It does not block any other require() calls from starting their requests for modules, it is just a way to specify some modules to load asynchronously as part of a config block.

callback: A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's deps array has been loaded.

enforceDefine: If set to true, an error will be thrown if a script loads that does not call define() or have a shim exports string value that can be checked. See Catching load failures in IE for more information.

xhtml: If set to true, document.createElementNS() will be used to create script elements.

urlArgs: Extra query string arguments appended to URLs that RequireJS uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example cache bust setting for urlArgs:

```javascript
urlArgs: 'bust=' + new Date().getTime()
```

As of RequireJS 2.2.0, urlArgs can be a function. If a function, it will receive the module ID and the URL as parameters, and it should return a string that will be added to the end of the URL. Return an empty string if no args. Be sure to take care of adding the '?' or '&' depending on the existing state of the URL. Example:

```javascript
requirejs.config({
	urlArgs: function (id, url) {
		var args = 'v=1'
		if (url.indexOf('view.html') !== -1) {
			args = 'v=2'
		}

		return (url.indexOf('?') === -1 ? '?' : '&') + args
	},
})
```

During development it can be useful to use this, however be sure to remove it before deploying your code.

scriptType: Specify the value for the type="" attribute used for script tags inserted into the document by RequireJS. Default is "text/javascript". To use Firefox's JavaScript 1.8 features, use "text/javascript;version=1.8".

skipDataMain: Introduced in RequireJS 2.1.9: If set to true, skips the data-main attribute scanning done to start module loading. Useful if RequireJS is embedded in a utility library that may interact with other RequireJS library on the page, and the embedded version should not do data-main loading.

### ADVANCED USAGE

#### Loading Modules from Packages

RequireJS supports loading modules that are in a CommonJS Packages directory structure, but some additional configuration needs to be specified for it to work. Specifically, there is support for the following CommonJS Packages features:

- A package can be associated with a module name/prefix.
- The package config can specify the following properties for a specific package:
  - name: The name of the package (used for the module name/prefix mapping)
  - location: The location on disk. Locations are relative to the baseUrl configuration value, unless they contain a protocol or start with a front slash (/).
  - main: The name of the module inside the package that should be used when someone does a require for "packageName". The default value is "main", so only \* specify it if it differs from the default. The value is relative to the package folder.

##### IMPORTANT NOTES

- While the packages can have the CommonJS directory layout, the modules themselves should be in a module format that RequireJS can understand. Exception to the rule: if you are using the r.js Node adapter, the modules can be in the traditional CommonJS module format. You can use the CommonJS converter tool if you need to convert traditional CommonJS modules into the async module format that RequireJS uses.

* Only one version of a package can be used in a project context at a time. You can use RequireJS multiversion support to load two different module contexts, but if you want to use Package A and B in one context and they depend on different versions of Package C, then that will be a problem. This may change in the future.

If you use a similar project layout as specified in the Start Guide, the start of your web project would look something like this (Node/Rhino-based projects are similar, just use the contents of the scripts directory as the top-level project directory):

```
project-directory/
	project.html
	scripts/
		require.js
```

Here is how the example directory layout looks with two packages, cart and store:

```
project-directory/
	project.html
	scripts/
		cart/
			main.js
		store/
			main.js
			util.js
		main.js
		require.js
```

project.html will have a script tag like this:

```javascript
<script data-main='scripts/main' src='scripts/require.js'></script>
```

This will instruct require.js to load scripts/main.js. main.js uses the "packages" config to set up packages that are relative to require.js, which in this case are the source packages "cart" and "store":

```javascript
//main.js contents
//Pass a config object to require
require.config({
	packages: ['cart', 'store'],
})

require(['cart', 'store', 'store/util'], function (cart, store, util) {
	//use the modules as usual.
})
```

A require of "cart" means that it will be loaded from scripts/cart/main.js, since "main" is the default main module setting supported by RequireJS. A require of "store/util" will be loaded from scripts/store/util.js.

If the "store" package did not follow the "main.js" convention, and looked more like this:

```
project-directory/
	project.html
	scripts/
		cart/
			main.js
		store/
			store.js
			util.js
	main.js
	package.json
	require.js

```

Then the RequireJS configuration would look like so:

```javascript
require.config({
	packages: [
		'cart',
		{
			name: 'store',
			main: 'store',
		},
	],
})
```

To avoid verbosity, it is strongly suggested to always use packages that use "main" convention in their structure.

#### Multiversion Support

As mentioned in Configuration Options, multiple versions of a module can be loaded in a page by using different "context" configuration options. require.config() returns a require function that will use the context configuration. Here is an example that loads two different versions of the alpha and beta modules (this example is taken from one of the test files):

```javascript
<script src="../require.js"></script>
<script>
var reqOne = require.config({
  context: "version1",
  baseUrl: "version1"
});

reqOne(["require", "alpha", "beta",],
function(require,   alpha,   beta) {
  log("alpha version is: " + alpha.version); //prints 1
  log("beta version is: " + beta.version); //prints 1

  setTimeout(function() {
    require(["omega"],
      function(omega) {
        log("version1 omega loaded with version: " +
             omega.version); //prints 1
      }
    );
  }, 100);
});

var reqTwo = require.config({
      context: "version2",
      baseUrl: "version2"
    });

reqTwo(["require", "alpha", "beta"],
function(require,   alpha,   beta) {
  log("alpha version is: " + alpha.version); //prints 2
  log("beta version is: " + beta.version); //prints 2

  setTimeout(function() {
    require(["omega"],
      function(omega) {
        log("version2 omega loaded with version: " +
            omega.version); //prints 2
      }
    );
  }, 100);
});
</script>
```

Note that "require" is specified as a dependency for the module. This allows the require() function that is passed to the function callback to use the right context to load the modules correctly for multiversion support. If "require" is not specified as a dependency, then there will likely be an error.

#### Loading Code After Page Load

The example above in the Multiversion Support section shows how code can later be loaded by nested require() calls.

#### Web Worker Support

As of release 0.12, RequireJS can be run inside a Web Worker. Just use importScripts() inside a web worker to load require.js (or the JS file that contains the require() definition), then call require.

You will likely need to set the baseUrl configuration option to make sure require() can find the scripts to load.

You can see an example of its use by looking at one of the files used in the unit test.

#### Rhino Support

RequireJS can be used in Rhino via the r.js adapter. See the r.js README for more information.

#### Nashorn Support

As of RequireJS 2.1.16, RequireJS can be used in Nashorn, Java 8+'s JavaScript engine, via the r.js adapter. See the r.js README for more information.

#### Handling Errors

The general class of errors are 404s for scripts (not found), network timeouts or errors in the scripts that are loaded. RequireJS has a few tools to deal with them: require-specific errbacks, a "paths" array config, and a global requirejs.onError.

The error object passed to errbacks and the global requirejs.onError function will usually contain two custom properties:

- requireType: A string value with a general classification, like "timeout", "nodefine", "scripterror".

* requireModules: an array of module names/URLs that timed out.

If you get an error with a requireModules, it probably means other modules that depend on the modules in that requireModules array are not defined.

#### Catching load failures in IE

Internet Explorer has a set of problems that make it difficult to detect load failures for errbacks/paths fallbacks:

- script.onerror does not work in IE 6-8. There is no way to know if loading a script generates a 404, worse, it triggers the onreadystatechange with a complete state even in a 404 case.

* script.onerror does work in IE 9+, but it has a bug where it does not fire script.onload event handlers right after execution of script, so it cannot support the standard method of allowing anonymous AMD modules. So script.onreadystatechange is still used. However, onreadystatechange fires with a complete state before the script.onerror function fires.

So it is very difficult with IE to allow both anonymous AMD modules, which are a core benefit of AMD modules, and reliable detect errors.

However, if you are in a project that you know uses define() to declare all of its modules, or it uses the shim config to specify string exports for anything that does not use define(), then if you set the enforceDefine config value to true, the loader can confirm if a script load by checking for the define() call or the existence of the shim's exports global value.

So if you want to support Internet Explorer, catch load errors, and have modular code either through direct define() calls or shim config, always set enforceDefine to be true. See the next section for an example.

NOTE: If you do set enforceDefine: true, and you use data-main="" to load your main JS module, then that main JS module must call define() instead of require() to load the code it needs. The main JS module can still call require/requirejs to set config values, but for loading modules it should use define().

If you then also use almond to build your code without require.js, be sure to use the insertRequire build setting to insert a require call for the main module -- that serves the same purpose of the initial require() call that data-main does.

#### require([]) errbacks

Errbacks, when used with requirejs.undef(), will allow you to detect if a module fails to load, undefine that module, reset the config to a another location, then try again.

A common use case for this is to use a CDN-hosted version of a library, but if that fails, switch to loading the file locally:

```javascript
requirejs.config({
	enforceDefine: true,
	paths: {
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
	},
})

//Later
require(['jquery'], function ($) {
	//Do something with $ here
}, function (err) {
	//The errback, error callback
	//The error has a list of modules that failed
	var failedId = err.requireModules && err.requireModules[0]
	if (failedId === 'jquery') {
		//undef is function only on the global requirejs object.
		//Use it to clear internal knowledge of jQuery. Any modules
		//that were dependent on jQuery and in the middle of loading
		//will not be loaded yet, they will wait until a valid jQuery
		//does load.
		requirejs.undef(failedId)

		//Set the path to jQuery to local path
		requirejs.config({
			paths: {
				jquery: 'local/jquery',
			},
		})

		//Try again. Note that the above require callback
		//with the "Do something with $ here" comment will
		//be called if this new attempt to load jQuery succeeds.
		require(['jquery'], function () {})
	} else {
		//Some other error. Maybe show message to the user.
	}
})
```

With `requirejs.undef()`, if you later set up a different config and try to load the same module, the loader will still remember which modules needed that dependency and finish loading them when the newly configured module loads.

Note: errbacks only work with callback-style require calls, not define() calls. define() is only for declaring modules.

#### paths config fallbacks

The above pattern for detecting a load failure, undef()ing a module, modifying paths and reloading is a common enough request that there is also a shorthand for it. The paths config allows array values:

```javascript
requirejs.config({
	//To get timely, correct error triggers in IE, force a define/shim exports check.
	enforceDefine: true,
	paths: {
		jquery: [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
			//If the CDN location fails, load from this location
			'lib/jquery',
		],
	},
})

//Later
require(['jquery'], function ($) {})
```

This above code will try the CDN location, but if that fails, fall back to the local lib/jquery.js location.

Note: paths fallbacks only work for exact module ID matches. This is different from normal paths config which can apply to any part of a module ID prefix segment. Fallbacks are targeted more for unusual error recovery, not a generic path search path solution, since those are inefficient in the browser.

#### Global requirejs.onError function

To detect errors that are not caught by local errbacks, you can override requirejs.onError():

```javascript
requirejs.onError = function (err) {
	console.log(err.requireType)
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules)
	}

	throw err
}
```

### LOADER PLUGINS

RequireJS supports loader plugins. This is a way to support dependencies that are not plain JS files, but are still important for a script to have loaded before it can do its work. The RequireJS wiki has a list of plugins. This section talks about some specific plugins that are maintained alongside RequireJS:

##### Specify a Text File Dependency

It is nice to build HTML using regular HTML tags, instead of building up DOM structures in script. However, there is no good way to embed HTML in a JavaScript file. The best that can be done is using a string of HTML, but that can be hard to manage, particularly for multi-line HTML.

RequireJS has a plugin, text.js, that can help with this issue. It will automatically be loaded if the text! prefix is used for a dependency. See the text.js README for more information.

#### Page Load Event Support/DOM Ready

It is possible when using RequireJS to load scripts quickly enough that they complete before the DOM is ready. Any work that tries to interact with the DOM should wait for the DOM to be ready. For modern browsers, this is done by waiting for the DOMContentLoaded event.

However, not all browsers in use support DOMContentLoaded. The domReady module implements a cross-browser method to determine when the DOM is ready. Download the module and use it in your project like so:

```javascript
require(['domReady'], function (domReady) {
	domReady(function () {
		//This function is called once the DOM is ready.
		//It will be safe to query the DOM and manipulate
		//DOM nodes in this function.
	})
})
```

Since DOM ready is a common application need, ideally the nested functions in the API above could be avoided. The domReady module also implements the Loader Plugin API, so you can use the loader plugin syntax (notice the ! in the domReady dependency) to force the require() callback function to wait for the DOM to be ready before executing.

```
domReady
```

will return the current document when used as a loader plugin:

```javascript
require(['domReady!'], function (doc) {
	//This function is called once the DOM is ready,
	//notice the value for 'domReady!' is the current
	//document.
})
```

Note: If the document takes a while to load (maybe it is a very large document, or has HTML script tags loading large JS files that block DOM completion until they are done), using domReady as a loader plugin may result in a RequireJS "timeout" error. If this is a problem either increase the waitSeconds configuration, or just use domReady as a module and call domReady() inside the require() callback.

#### Define an I18N Bundle

Once your web app gets to a certain size and popularity, localizing the strings in the interface and providing other locale-specific information becomes more useful. However, it can be cumbersome to work out a scheme that scales well for supporting multiple locales.

RequireJS allows you to set up a basic module that has localized information without forcing you to provide all locale-specific information up front. It can be added over time, and only strings/values that change between locales can be defined in the locale-specific file.

i18n bundle support is provided by the i18n.js plugin. It is automatically loaded when a module or dependency specifies the i18n! prefix (more info below). Download the plugin and put it in the same directory as your app's main JS file.

To define a bundle, put it in a directory called "nls" -- the i18n! plugin assumes a module name with "nls" in it indicates an i18n bundle. The "nls" marker in the name tells the i18n plugin where to expect the locale directories (they should be immediate children of the nls directory). If you wanted to provide a bundle of color names in your "my" set of modules, create the directory structure like so:

```
my/nls/colors.js
```

The contents of that file should look like so:

```javascript
//my/nls/colors.js contents:
define({
	root: {
		red: 'red',
		blue: 'blue',
		green: 'green',
	},
})
```

An object literal with a property of "root" defines this module. That is all you have to do to set the stage for later localization work.

You can then use the above module in another module, say, in a my/lamps.js file:

```javascript
//Contents of my/lamps.js
define(['i18n!my/nls/colors'], function (colors) {
	return {
		testMessage: 'The name for red in this locale is: ' + colors.red,
	}
})
```

The my/lamps module has one property called "testMessage" that uses colors.red to show the localized value for the color red.

Later, when you want to add a specific translation to a file, say for the fr-fr locale, change my/nls/colors to look like so:

```javascript
//Contents of my/nls/colors.js
define({
	root: {
		red: 'red',
		blue: 'blue',
		green: 'green',
	},
	'fr-fr': true,
})
```

Then define a file at my/nls/fr-fr/colors.js that has the following contents:

```javascript
//Contents of my/nls/fr-fr/colors.js
define({
	red: 'rouge',
	blue: 'bleu',
	green: 'vert',
})
```

RequireJS will use the browser's navigator.languages, navigator.language or navigator.userLanguage property to determine what locale values to use for my/nls/colors, so your app does not have to change. If you prefer to set the locale, you can use the module config to pass the locale to the plugin:

```javascript
requirejs.config({
	config: {
		//Set the config for the i18n
		//module ID
		i18n: {
			locale: 'fr-fr',
		},
	},
})
```

Note that RequireJS will always use a lowercase version of the locale, to avoid case issues, so all of the directories and files on disk for i18n bundles should use lowercase locales.

RequireJS is also smart enough to pick the right locale bundle, the one that most closely matches the ones provided by my/nls/colors. For instance, if the locale is "en-us", then the "root" bundle will be used. If the locale is "fr-fr-paris" then the "fr-fr" bundle will be used.

RequireJS also combines bundles together, so for instance, if the french bundle was defined like so (omitting a value for red):

```javascript
//Contents of my/nls/fr-fr/colors.js
define({
	blue: 'bleu',
	green: 'vert',
})
```

Then the value for red in "root" will be used. This works for all locale pieces. If all the bundles listed below were defined, then RequireJS will use the values in the following priority order (the one at the top takes the most precedence):

- my/nls/fr-fr-paris/colors.js
- my/nls/fr-fr/colors.js
- my/nls/fr/colors.js
- my/nls/colors.js

If you prefer to not include the root bundle in the top level module, you can define it like a normal locale bundle. In that case, the top level module would look like:

```javascript
//my/nls/colors.js contents:
define({
	root: true,
	'fr-fr': true,
	'fr-fr-paris': true,
})
```

and the root bundle would look like:

```javascript
//Contents of my/nls/root/colors.js
define({
	red: 'red',
	blue: 'blue',
	green: 'green',
})
```
