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

RequireJS 使用了不同于传统 script 标签的脚本加载方式。可以用它来加速、优化代码，但是它的主要目标还是为了代码的模块化。它鼓励在使用脚本时以 module IDs 替代 URL 地址

RequireJS loads all code relative to a baseUrl.The baseUrl is normally set to the same directory as the script used in a data-main attribute for the top level script to load for a page.The data-main attribute is a special attribute that require.js will check to start script loading.This example will end up with a baseUrl of scripts:

RequireJS 加载与 baseUrl 相关的所有 code。这个 baseUrl 通常设置为与用于为页面加载的顶级脚本的 data-main 属性中的脚本相同的目录。这个 data-main 属性是一个特殊的属性，RequireJS 将检查来开始加载脚本。这个例子将以含有 baseUrl 的脚本结束

```javascript
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

Or, baseUrl can be set manually via the RequireJS config.If there is no explicit config and data-main is not used, then the default baseUrl is the directory that contains the HTML page running RequireJS.

或者 baseUrl 也可以通过 RequireJS config 来手动设置。如果没有明确的配置，并且 data-main 也没有被使用， 那么默认的 baseUrl 就是 包含运行 RequireJS 的 HTML 页面的目录

RequireJS also assumes by default that all dependencies are scripts, so it does not expect to see a trailing ".js" suffix on module IDs.RequireJS will automatically add it when translating the module ID to a path.With the paths config, you can set up locations of a group of scripts. All of these capabilities allow you to use smaller strings for scripts as compared to traditional `<script>` tags.

RequireJS 也会默认假定所有依赖的都是脚本，所以他不期望在 模块 ids 上看到 ".js"后缀。RequireJS 将在转换 模块 id 为路径时候， 自动添加它。
使用设置的 path,你能设置一组脚本的位置。所有这些功能，都允许你使用比传统的 script 标签 更小的脚本字符串。

There may be times when you do want to reference a script directly and not conform to the "baseUrl + paths" rules for finding it.If a module ID has one of the following characteristics, the ID will not be passed through the "baseUrl + paths" configuration, and just be treated like a regular URL that is relative to the document:

这里也许有多次你想直接引用一个脚本，并且它不遵守 "baseUrl + paths" 规则来找到它。如果一个 module ID 有以下其中一个特点，这个 ID 将不会通过 "baseUrl + paths" 配置传递，并且只会当做被视为与文件相关的常规 url 来对待。

- Ends in ".js".--- 以 .js 结尾的
- Starts with a "/". --- 以 / 开头的
- Contains an URL protocol, like "http:" or "https:". --- 包含一个 URL 协议，例如 http htpps

In general though, it is best to use the baseUrl and "paths" config to set paths for module IDs.
By doing so, it gives you more flexibility in renaming and configuring the paths to different locations for optimization builds.

不过一般来说，最好是使用 baseUrl 和 paths 设置属性来为 module IDs 设置路径。因为这样做， 它会给你带来额外的灵活性，如便于脚本的重命名，重定位等。

Similarly, to avoid a bunch of configuration, it is best to avoid deep folder hierarchies for scripts, and instead either keep all the scripts in baseUrl, or if you want to separate your library/vendor-supplied code from your app code, use a directory layout like this:

同样的，为了避免凌乱的配置，最好不要使用多级嵌套的目录层次来组织代码，而是要么将所有的脚本都放置到 baseUrl，要么要么分置为项目库/第三方库的一个扁平结构，如下：

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

注意在示例中，三方库如 jQuery 没有将版本号包含在他们的文件中。我们建议将版本信息放置在单独的文件中进行追踪，使用如何 volo 这来的工具，可以将 package.json 打上版本信息，并在磁盘上保持文件名为 jquery.js。 这有助于你保持配置的最小化，避免为每一个库版本设置一条 path。例如，将 jquery 设置为 jquery-1.7.2

Ideally the scripts you load will be modules that are defined by calling define().However, you may need to use some traditional/legacy "browser globals" scripts that do not express their dependencies via define().For those, you can use the shim config. To properly express their dependencies.

理想状况下，每个加载的脚本都是通过 define()来定义的一个模块；但有些"浏览器全局变量注入"型的传统/遗留库并没有使用 define()来定义它们的依赖关系，你必须为此使用 shim config 来指明它们的依赖关系。

If you do not express the dependencies, you will likely get loading errors since RequireJS loads scripts asynchronously and out of order for speed.

如果你没有指明依赖关系，加载可能报错。这是因为基于速度的原因，RequireJS 会异步地以无序的形式加载这些库。

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

模块不同于传统的脚本文件，它良好地定义了一个作用域来避免全局名称空间污染。它可以显式地列出其依赖关系，并以函数(定义此模块的那个函数)参数的形式将这些依赖进行注入，而无需引用全局变量。RequireJS 的模块是模块模式的一个扩展，其好处是无需全局地引用其他模块。

The RequireJS syntax for modules allows them to be loaded as fast as possible, even out of order, but evaluated in the correct dependency order, and since global variables are not created, it makes it possible to load multiple versions of a module in a page.

RequireJS 的模块语法允许它尽快地加载多个模块，虽然加载的顺序不定，但依赖的顺序最终是正确的。同时因为无需创建全局变量，甚至可以做到在同一个页面上同时加载同一模块的不同版本。

(If you are familiar with or are using CommonJS modules, then please also see CommonJS Notes for information on how the RequireJS module format maps to CommonJS modules).

如果你很熟悉或者正在使用 CommonJS 模块，那也请看看 CommonJS 笔记 以了解有关 RequireJS 模块怎么样把格式映射到 CommonJS 模块的信息

(如果你熟悉 ConmmonJS，可参看 CommonJS 的注释信息以了解 RequireJS 模块到 CommonJS 模块的映射关系)。

There should only be one module definition per file on disk. The modules can be grouped into optimized bundles by the optimization tool.

一个磁盘文件应该只定义 1 个模块。多个模块可以使用内置优化工具将其组织打包。

#### Simple Name/Value Pairs

If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():

如果一个模块仅含值对，没有任何依赖，则在 define()中定义这些值对就好了

```javascript
// Inside file my/shirt.js:
define({
	color: 'black',
	size: 'unisize',
})
```

#### Definition Functions

If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():

如果一个模块没有任何依赖，但需要一个做 setup 工作的函数，则在 define()中定义该函数，并将其传给 define()

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

If the module has dependencies, the first argument should be an array of dependency names, and the second argument should be a definition function. The function will be called to define the module once all dependencies have loaded. The function should return an object that defines the module. The dependencies will be passed to the definition function as function arguments, listed in the same order as the order in the dependency array:

如果一个模块有依赖项，第一个参数应该是 依赖项名字组成的数组 ，并且第二个参数应该是一个定义的函数。一旦所有的依赖加载完成，这个函数将会被调用来定义模块。这个函数返回应该一个定义这个模块的对象。这些依赖项目将会被当做函数参数传递给定义个函数，按照与依赖数组中相同的顺序列出。

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

In this example, a my/shirt module is created. It depends on my/cart and my/inventory. On disk, the files are structured like this:

本示例创建了一个 my/shirt 模块，它依赖于 my/cart 及 my/inventory。磁盘上各文件分布如下：

```
my/cart.js
my/inventory.js
my/shirt.js
```

The function call above specifies two arguments, "cart" and "inventory". These are the modules represented by the "./cart" and "./inventory" module names.

这个函数指定了以上两个参数："cart" and "inventory".这里有被 "./cart" and "./inventory" 模块名字 代表的模块。

The function is not called until the my/cart and my/inventory modules have been loaded, and the function receives the modules as the "cart" and "inventory" arguments.

模块函数以参数"cart"及"inventory"使用这两个以"./cart"及"./inventory"名称指定的模块。在这两个模块加载完毕之前，模块函数不会被调用。

Modules that define globals are explicitly discouraged, so that multiple versions of a module can exist in a page at a time (see Advanced Usage). Also, the order of the function arguments should match the order of the dependencies.

严重不鼓励模块定义全局变量。遵循此处的定义模式，可以使得同一模块的不同版本并存于同一个页面上(参见 高级用法 )。另外，函参的顺序应与依赖顺序保存一致。

The return object from the function call defines the "my/shirt" module. By defining modules in this way, "my/shirt" does not exist as a global object.

返回的 object 定义了"my/shirt"模块。这种定义模式下，"my/shirt"不作为一个全局变量而存在。

#### Define a Module as a Function

Modules do not have to return objects. Any valid return value from a function is allowed. Here is a module that returns a function as its module definition:

对模块的返回值类型并没有强制为一定是个 object，任何函数的返回值都是允许的。此处是一个返回了函数的模块定义：

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

If you wish to reuse some code that was written in the traditional CommonJS module format it may be difficult to re-work to the array of dependencies used above, and you may prefer to have direct alignment of dependency name to the local variable used for that dependency. You can use the simplified CommonJS wrapper for those cases:

如果你想重用一些 通过传统的 CommonJS 模块格式来书写的的代码，那么重新处理上面的依赖项数组就会比较困难，并且你也许更喜欢将依赖项目名称与用于该依赖的本地变量直接对齐

```javascript
define(function (require, exports, module) {
	var a = require('a'),
		b = require('b')

	//Return the module value
	return function () {}
})
```

This wrapper relies on Function.prototype.toString() to give a useful string value of the function contents. This does not work on some devices like the PS3 and some older Opera mobile browsers. Use the optimizer to pull out the dependencies in the array format for use on those devices.

该包装方法依靠 Function.prototype.toString()将函数内容赋予一个有意义的字串值，但在一些设备如 PS3 及一些老的 Opera 手机浏览器中不起作用。考虑在这些设备上使用优化器将依赖导出为数组形式。

More information is available on the CommonJS page, and in the "Sugar" section in the Why AMD page.

更多的信息可参看 CommonJS Notes 页面，以及"Why AMD"页面的"Sugar"段落。

#### Define a Module with a Name

You may encounter some define() calls that include a name for the module as the first argument to define():

你可能会看到一些 define()中包含了一个模块名称作为首个参数：

```javascript
//Explicitly defines the "foo/title" module:
define('foo/title', ['my/cart', 'my/inventory'], function (cart, inventory) {
	//Define foo/title object in here.
})
```

These are normally generated by the optimization tool. You can explicitly name modules yourself, but it makes the modules less portable -- if you move the file to another directory you will need to change the name. It is normally best to avoid coding in a name for the module and just let the optimization tool burn in the module names. The optimization tool needs to add the names so that more than one module can be bundled in a file, to allow for faster loading in the browser.

这些常由优化工具生成。你也可以自己显式指定模块名称，但这使模块更不具备移植性——就是说若你将文件移动到其他目录下，你就得重命名。一般最好避免对模块硬编码，而是交给优化工具去生成。优化工具需要生成模块名以将多个模块打成一个包，加快到浏览器的载人速度。

#### Other Module Notes

**One module per file**: Only one module should be defined per JavaScript file, given the nature of the module name-to-file-path lookup algorithm. You should only use the optimization tool to group multiple modules into optimized files.

**一个文件一个模块**: 每个 Javascript 文件应该只定义一个模块，这是模块名-至-文件名查找机制的自然要求。多个模块会被优化工具组织优化，但你在使用优化工具时应将多个模块放置到一个文件中。

**Relative module names inside define()**: For require("./relative/name") calls that can happen inside a define() function call, be sure to ask for "require" as a dependency, so that the relative name is resolved correctly:

**define()中的相对模块名**: 为了可以在 define()内部使用诸如 require("./relative/name")的调用以正确解析相对名称，记得将"require"本身作为一个依赖注入到模块中：

```javascript
define(['require', './relative/name'], function (require) {
	var mod = require('./relative/name')
})
```

Or better yet, use the shortened syntax that is available for use with translating CommonJS modules:

或者更好地，使用下述为转换 CommonJS 模块所设的更短的语法：

```javascript
define(function (require) {
	var mod = require('./relative/name')
})
```

This form will use Function.prototype.toString() to find the require() calls, and add them to the dependency array, along with "require", so the code will work correctly with relative paths.

该形式利用了 Function.prototype.toString()去查找 require()调用，然后将其与"require"一起加入到依赖数组中，这样代码可以正确地解析相对路径了。

Relative paths are really useful if you are creating a few modules inside a directory, so that you can share the directory with other people or other projects, and you want to be able to get a handle on the sibling modules in that directory without having to know the directory's name.

相对路径在一些场景下格外有用，例如：为了以便于将代码共享给其他人或项目，你在某个目录下创建了一些模块。你可以访问模块的相邻模块，无需知道该目录的名称。

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

生成相对于模块的 URL 地址: 你可能需要生成一个相对于模块的 URL 地址。你可以将"require"作为一个依赖注入进来，然后调用 require.toUrl()以生成该 URL:

```javascript
define(['require'], function (require) {
	var cssUrl = require.toUrl('./style.css')
})
```

Console debugging: If you need to work with a module you already loaded via a require(["module/name"], function(){}) call in the JavaScript console, then you can use the require() form that just uses the string name of the module to fetch it:

控制台调试: 如果你需要处理一个已通过 require(["module/name"], function(){})调用加载了的模块，可以使用模块名作为字符串参数的 require()调用来获取它:

```javascript
require('module/name').callSomeFunction()
```

Note this only works if "module/name" was previously loaded via the async version of require: require(["module/name"]). If using a relative path, like './module/name', those only work inside define

注意这种形式仅在"module/name"已经由其异步形式的 require(["module/name"])加载了后才有效。只能在 define 内部使用形如"./module/name"的相对路径。

#### Dependencies

If you define a circular dependency ("a" needs "b" and "b" needs "a"), then in this case when "b"'s module function is called, it will get an undefined value for "a". "b" can fetch "a" later after modules have been defined by using the require() method (be sure to specify require as a dependency so the right context is used to look up "a"):

如果你定义了一个循环依赖(a 依赖 b，b 同时依赖 a)，则在这种情形下当 b 的模块函数被调用的时候，它会得到一个 undefined 的 a。b 可以在模块已经定义好后用 require()方法再获取(记得将 require 作为依赖注入进来)：

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

一般说来你无需使用 require()去获取一个模块，而是应当使用注入到模块函数参数中的依赖。循环依赖比较罕见，它也是一个重构代码重新设计的警示灯。但不管怎样，有时候还是要用到循环依赖，这种情形下就使用上述的 require()方式来解决。

If you are familiar with CommonJS modules, you could instead use exports to create an empty object for the module that is available immediately for reference by other modules. By doing this on both sides of a circular dependency, you can then safely hold on to the the other module. This only works if each module is exporting an object for the module value, not a function:

如果你熟悉 CommonJS，你可以考虑使用 exports 为模块建立一个空 object，该 object 可以立即被其他模块引用。在循环依赖的两头都如此操作之后，你就可以安全地持有其他模块了。这种方法仅在每个模块都是输出 object 作为模块值的时候有效，换成函数无效。

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

或者，如果你使用依赖注入数组的步骤，则可用注入特殊的"exports"来解决：

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

JSONP 是在 javascript 中服务调用的一种方式。它仅需简单地通过一个 script 标签发起 HTTP GET 请求，是实现跨域服务调用一种公认手段。

To use a JSONP service in RequireJS, specify "define" as the callback parameter's value. This means you can get the value of a JSONP URL as if it was a module definition.

为了在 RequireJS 中使用 JSON 服务，须要将 callback 参数的值指定为"define"。这意味着你可将获取到的 JSONP URL 的值看成是一个模块定义。

Here is an example that calls a JSONP API endpoint. In this example, the JSONP callback parameter is called "callback", so "callback=define" tells the API to wrap the JSON response in a "define()" wrapper:

下面是一个调用 JSONP API 端点的示例。该示例中，JSONP 的 callback 参数为"callback"，因此"callback=define"告诉 API 将 JSON 响应包裹到一个"define()"中：

```javascript
require(['http://example.com/api/data.json?callback=define'], function (data) {
	//The data object will be the API response for the
	//JSONP data call.
	console.log(data)
})
```

This use of JSONP should be limited to JSONP services for initial application setup. If the JSONP service times out, it means other modules you define via define() may not get executed, so the error handling is not robust.

JSONP 的这种用法应仅限于应用的初始化中。一旦 JSONP 服务超时，其他通过 define()定义了的模块也可能得不得执行，错误处理不是十分健壮。

Only JSONP return values that are JSON objects are supported. A JSONP response that is an array, a string or a number will not work.

仅支持返回值类型为 JSON object 的 JSONP 服务，其他返回类型如数组、字串、数字等都不能支持。

This functionality should not be used for long-polling JSONP connections -- APIs that deal with real time streaming. Those kinds of APIs should do more script cleanup after receiving each response, and RequireJS will only fetch a JSONP URL once -- subsequent uses of the same URL as a dependency in a require() or define() call will get a cached value.

这种功能不该用于 long-polling 类的 JSONP 连接——那些用来处理实时流的 API。这些 API 在接收响应后一般会做 script 的清理，而 RequireJS 则只能获取该 JSONP URL 一次——后继使用 require()或 define()发起的的对同一 URL 的依赖(请求)只会得到一个缓存过的值。

Errors in loading a JSONP service are normally surfaced via timeouts for the service, since script tag loading does not give much detail into network problems. To detect errors, you can override requirejs.onError() to get errors. There is more information in the Handling Errors section.

JSONP 调用错误一般以服务超时的形式出现，因为简单加载一个 script 标签一般不会得到很 详细的网络错误信息。你可以 override requirejs.onError()来过去错误。更多的信息请参看错误处理部分。

#### Undefining a Module

There is a global function, requirejs.undef(), that allows undefining a module. It will reset the loader's internal state to forget about the previous definition of the module.

有一个全局函数 requirejs.undef()用来 undefine 一个模块。它会重置 loader 的内部状态以使其忘记之前定义的一个模块。

However, it will not remove the module from other modules that are already defined and got a handle on that module as a dependency when they executed. So it is really only useful to use in error situations when no other modules have gotten a handle on a module value, or as part of any future module loading that may use that module. See the errback section for an example.

但是若有其他模块已将此模块作为依赖使用了，该模块就不会被清除，所以该功能仅在无其他模块持有该模块时的错误处理中，或者当未来需要加载该模块时有点用。参见备错(errbacks)段的示例。

If you want to do more sophisticated dependency graph analysis for undefining work, the semi-private onResourceLoad API may be helpful.

如果你打算在 undefine 时做一些复杂的依赖图分析，则半私有的 onResourceLoad API 可能对你有用。

### MECHANICS

RequireJS loads each dependency as a script tag, using head.appendChild().

RequireJS 使用 head.appendChild()将每一个依赖加载为一个 script 标签。

RequireJS waits for all dependencies to load, figures out the right order in which to call the functions that define the modules, then calls the module definition functions once the dependencies for those functions have been called. Note that the dependencies for a given module definition function could be called in any order, due to their sub-dependency relationships and network load order.

RequireJS 等待所有的依赖加载完毕，计算出模块定义函数正确调用顺序,然后一旦这些函数依赖项被调用时候就触发这些模块定义。注意一个给定的被定义的模块可以以任何顺序被调用，这依赖于他们的子依赖关系和网络记载熟顺序。

Using RequireJS in a server-side JavaScript environment that has synchronous loading should be as easy as redefining require.load(). The build system does this, the require.load method for that environment can be found in build/jslib/requirePatch.js.

在同步加载的服务端 JavaScript 环境中，可简单地重定义 require.load()来使用 RequireJS。build 系统就是这么做的。该环境中的 require.load 实现可在 build/jslib/requirePatch.js 中找到。

In the future, this code may be pulled into the require/ directory as an optional module that you can load in your env to get the right load behavior based on the host environment.

未来可能将该部分代码置入 require/目录下作为一个可选模块，这样你可以在你的宿主环境中使用它来获得正确的加载顺序。

### CONFIGURATION OPTIONS

When using require() in the top-level HTML page (or top-level script file that does not define a module), a configuration object can be passed as the first option:

当在顶层 HTML 页面(或不作为一个模块定义的顶层脚本文件)中，可将配置作为首项放入：

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

或者，你将配置作为全局变量"require"在 require.js 加载之前进行定义，它会被自动应用。下面的示例定义的依赖会在 require.js 一旦定义了 require()之后即被加载：

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

注意：最好使用 var require = {} 的形式而不是 window.require = {}的形式。后者在 IE 中运行不正常。

There are some patterns for separating the config from main module loading.

这有一些从主模块加载中分离配置的模式

Supported configuration options:

支持的配置项：

**baseUrl**: the root path to use for all module lookups. So in the above example, "my/module"'s script tag will have a src="/another/path/my/module.js". baseUrl is not used when loading plain .js files (indicated by a dependency string starting with a slash, has a protocol, or ends in .js), those strings are used as-is, so a.js and b.js will be loaded from the same directory as the HTML page that contains the above snippet.

If no baseUrl is explicitly set in the configuration, the default value will be the location of the HTML page that loads require.js. If a data-main attribute is used, that path will become the baseUrl.

The baseUrl can be a URL on a different domain as the page that will load require.js. RequireJS script loading works across domains. The only restriction is on text content loaded by text! plugins: those paths should be on the same domain as the page, at least during development. The optimization tool will inline text! plugin resources so after using the optimization tool, you can use resources that reference text! plugin resources from another domain.

**baseUrl**: 用来查找所有模块的主路径。在以上例子中， "my/module"的脚本 将会拥有一个 地址指向 /another/path/my/module.js. baseUrl 在加载普通的 js 文件(明确以斜杠开头、有协议或以 .js 结尾的) 时并不适用，这些字符串将会原样适用，并且 a.js 和 b.js 将会从 包含上述代码段的 HTML 页面的同级目录中加载。

如未显式设置 baseUrl，则默认值是加载 require.js 的 HTML 所处的位置。如果用了 data-main 属性，则该路径就变成 baseUrl。

baseUrl 可跟 require.js 页面处于不同的域下，RequireJS 脚本的加载是跨域的。唯一的限制是使用 text! plugins 加载文本内容时，这些路径应跟页面同域，至少在开发时应这样。优化工具会将 text! plugin 资源内联，因此在使用优化工具之后你可以使用跨域引用 text! plugin 资源的那些资源。

**paths**: path mappings for module names not found directly under baseUrl. The path settings are assumed to be relative to baseUrl, unless the paths setting starts with a "/" or has a URL protocol in it ("like http:"). Using the above sample config, "some/module"'s script tag will be src="/another/path/some/v1.0/module.js".

The path that is used for a module name should not include an extension, since the path mapping could be for a directory. The path mapping code will automatically add the .js extension when mapping the module name to a path. If require.toUrl() is used, it will add the appropriate extension, if it is for something like a text template.

When run in a browser, paths fallbacks can be specified, to allow trying a load from a CDN location, but falling back to a local location if the CDN location fails to load.

**paths** ：path 映射那些不直接放置于 baseUrl 下的模块名。设置 path 时起始位置是相对于 baseUrl 的，除非该 path 设置以"/"开头或含有 URL 协议（如 http:）。在上述的配置下，"some/module"的 script 标签 src 值是"/another/path/some/v1.0/module.js"。

用于模块名的 path 不应含有.js 后缀，因为一个 path 有可能映射到一个目录。路径解析机制会自动在映射模块名到 path 时添加上.js 后缀。在文本模版之类的场景中使用 require.toUrl()时它也会添加合适的后缀。

在浏览器中运行时，可指定路径的备选(fallbacks)，以实现诸如首先指定了从 CDN 中加载，一旦 CDN 加载失败则从本地位置中加载这类的机制。

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

要将一个配置传递给一个包，目标是包中的主模块，而不是包 ID

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

**packages**: configures loading modules from CommonJS packages. See the packages topic for more information.

**packages**: 关于从 commonjs 包中加载模块的配置。有关更多信息，参阅 packages 主题

**nodeIdCompat**: Node treats module ID example.js and example the same. By default these are two different IDs in RequireJS. If you end up using modules installed from npm, then you may need to set this config value to true to avoid resolution issues. This option only applies to treating the ".js" suffix differently, it does not do any other node resolution and evaluation matching such as .json file handling (JSON handling needs a 'json!' loader plugin anyway). Available in 2.1.10 and greater.

**nodeIdCompat**： node 对于模块 id example.js 和 example 是一样的。默认情况下，这是 requireJS 中两个不同的 ids. 如果你最终使用了从 npm 安装的模块，那么你可能需要设置这个选项值为 true 来避免解决问题。这个选项只适用与不同的处理 js 后缀，他不做任何其他节点解析和评估匹配，如 json 文件处理(JSON 处理无论如何需要 json! 插件)。可在 2.1.10 及以上版本中使用

**waitSeconds**: The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.

**waitSeconds**：在放弃加载脚本之前等待的秒数。设置为 0 表示禁用超时，默认是 7 秒

**context**: A name to give to a loading context. This allows require.js to load multiple versions of modules in a page, as long as each top-level require call specifies a unique context string. To use it correctly, see the Multiversion Support section.

**context**: 给加载上下文的一个名字。这个允许 require.js 来在一个页面加载不同版本的模块，只要每个顶级 require 调用指定一个唯一的上下文字符串，参阅多版本支持部分

**deps**: An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration. It does not block any other require() calls from starting their requests for modules, it is just a way to specify some modules to load asynchronously as part of a config block.

**deps**: 要加载的数组依赖项。 在 require.js 被加载前被定义为一个配置对象时时候，并且你希望在 require()被定义后立即加载指定的依赖项时候，这个方法很有用。使用 deps 很像使用 require([]) 调用，但是在加载器处理完配置后立即执行。它不会阻止任何其他 require() 调用启动它们对模块的请求，它只是指定一些模块作为配置块的一部分来异步加载的一种方式。

**callback**: A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's deps array has been loaded.

**callback**: 一个当 deps 已经被加载完执行的函数。当 require 在 require.js 被加载前被定义为一个配置对象，并且你想在配置的 deps 数组被执行完指定执行一个函数来 require 时候非常有用。

**enforceDefine**: If set to true, an error will be thrown if a script loads that does not call define() or have a shim exports string value that can be checked. See Catching load failures in IE for more information.

**enforceDefine**: 如果设置为 true, 那么如果加载的脚本(没有调用 define()或者没有一个 shim 来导出一个可被检查的字符串）将抛出一个错误。查看 Catching load failures in IE 获得更多信息。

**xhtml**: If set to true, document.createElementNS() will be used to create script elements.

**xhtml**: 如果设置为 true, document.createElementNS() 将会被用来创建脚本元素。

**urlArgs**: Extra query string arguments appended to URLs that RequireJS uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example cache bust setting for urlArgs:

**urlArgs**: 附加到 RequiresJS 用来获取资源的 URLS 的额外的查询字符串参数。当浏览器或者服务器没有配置正确时候，更多的用来缓存 bust。urlArgs 的缓存 bust 设置例子如下

```javascript
urlArgs: 'bust=' + new Date().getTime()
```

As of RequireJS 2.2.0, urlArgs can be a function. If a function, it will receive the module ID and the URL as parameters, and it should return a string that will be added to the end of the URL. Return an empty string if no args. Be sure to take care of adding the '?' or '&' depending on the existing state of the URL. Example:

作为 RequireJS 2.2.0，urlArgs 可以是一个函数。如果是一个函数，它将接收模块 id 和 URL 作为参数，并且它应该返回一个字符串 用来添加到 URL 的结尾处。如果没有参数将返回空。一定要注意添加 ? 或者 &, 这取决于 URL 的现存状态。例如：

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

在开发环境使用这个将会非常有用，但是确保在部署代码之前删除它。

**scriptType**: Specify the value for the type="" attribute used for script tags inserted into the document by RequireJS. Default is "text/javascript". To use Firefox's JavaScript 1.8 features, use "text/javascript;version=1.8".

**scriptType**: 指定 type= 属性的值，该属性用来用于由 requireJS 插入到文档中的脚本标签。默认为 "text/javascript". 为了使用 火狐的 JavaScript 1.8 特性，使用 "text/javascript;version=1.8".

**skipDataMain**: Introduced in RequireJS 2.1.9: If set to true, skips the data-main attribute scanning done to start module loading. Useful if RequireJS is embedded in a utility library that may interact with other RequireJS library on the page, and the embedded version should not do data-main loading.

**skipDataMain**：RequireJS 2.1.9 引进： 如果设置为 true, 将跳过为开始加载模块而进行的 data-main 属性扫描。如果 RequireJS 被嵌入到一个 可能会在页面中与其他 RequireJS 进行交互的并且这个嵌入的版本不应该处理 data-main 加载的公共的库中，将会很有用。

### ADVANCED USAGE

#### Loading Modules from Packages

RequireJS supports loading modules that are in a CommonJS Packages directory structure, but some additional configuration needs to be specified for it to work. Specifically, there is support for the following CommonJS Packages features:

RequireJS 支持加载 在 CommonJS Packages 目录结构中的模块，但是一些额外的配置需要被指明才能工作。具体来说，它支持以下 CommonJS Packages 特性

- A package can be associated with a module name/prefix.
- The package config can specify the following properties for a specific package:
  - name: The name of the package (used for the module name/prefix mapping)
  - location: The location on disk. Locations are relative to the baseUrl configuration value, unless they contain a protocol or start with a front slash (/).
  - main: The name of the module inside the package that should be used when someone does a require for "packageName". The default value is "main", so only \* specify it if it differs from the default. The value is relative to the package folder.

* 包可以与模块名/前缀相关联
* 包配置可以为特定的包指定以下属性
  - name: 这个包的名字（用于模块名/前缀映射）
  - location: 磁盘上的位置。Locations 是相对于设置的 baseUrl 的值，除非他们还能有协议(http、https) 或者以 前缀 / 开头
  * main：当有人要求 packageName 时，包中的模块名应该被使用。默认值的 main, 因此 仅当 如果它不同于默认值时，\* 指定它。这个值是相对于包文件夹的

##### IMPORTANT NOTES

- While the packages can have the CommonJS directory layout, the modules themselves should be in a module format that RequireJS can understand. Exception to the rule: if you are using the r.js Node adapter, the modules can be in the traditional CommonJS module format. You can use the CommonJS converter tool if you need to convert traditional CommonJS modules into the async module format that RequireJS uses.

* 虽然包可以有 commonJS 目录布局，但是模块本身应该是一个 RequireJS 可以理解的模块格式。规则期望是：如果你正在使用 r.js Node 适配器，模块可以采用传统的 CommonJS 模块格式。如果你需要把传统的 CommonJS 模块转换为 RequireJS 使用的异步模块格式，你可以使用 CommonJS 转换工具。

* Only one version of a package can be used in a project context at a time. You can use RequireJS multiversion support to load two different module contexts, but if you want to use Package A and B in one context and they depend on different versions of Package C, then that will be a problem. This may change in the future.

* 在同一时间，在一个项目上下文中，仅仅一个版本的包可以被使用。你可以使用 RequireJS 多版本支持来加载两个不同的模块上下文，但是如果你想在一个上下文中使用 包 A 和 B, 并且他们都依赖于不同版本的 包 C, 这将是一个问题。 它也许将在将来进行改变。

If you use a similar project layout as specified in the Start Guide, the start of your web project would look something like this (Node/Rhino-based projects are similar, just use the contents of the scripts directory as the top-level project directory):

在开始指南中，如果你使用一个类似的项目布局，你的 web 项目开始时将看起来像这样(Node/Rhino-based 项目是类似的，仅仅使用 scripts 目录的内容作为顶级项目目录)

```
project-directory/
	project.html
	scripts/
		require.js
```

Here is how the example directory layout looks with two packages, cart and store:

下面是两个包的目录布局示例，购物车和商店。

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

这将直到 require.js 来加载 scripts/main.js. main.js 使用 packages 配置来设置相对于 require.js 的包，在本例中是资源包 cart 和 store

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

cart require 意味着 它将从 scripts/cart/main.js 中加载，因为 main 是 RequireJS 支持的默认主模块设置。A require of "store/util" 将从 scripts/store/util.js 中被加载。

If the "store" package did not follow the "main.js" convention, and looked more like this:

如果 store 包 没有 遵循 main.js 约定，并且看起来类似这样

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

然后 RequireJS 配置将看起来像这样

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

为了避免冗长，强烈建议总是在其结构中使用 main 约定的包。

#### Multiversion Support

As mentioned in Configuration Options, multiple versions of a module can be loaded in a page by using different "context" configuration options. require.config() returns a require function that will use the context configuration. Here is an example that loads two different versions of the alpha and beta modules (this example is taken from one of the test files):

如配置选项中所述的，在一个页面中一个模块的多版本可以通过使用不同的上下文配合选项来被加载。require.config() 返回一个函数，这个函数将使用上下文配置。这有一个例子，它加载了 alpha 和 beta 模块的 两个不同的版本(这个例子取自其中一个测试文件)

```javascript
<script src="../require.js"></script>
<script>
var reqOne = require.config({
  context: "version1",
  baseUrl: "version1"
});

reqOne(["require", "alpha", "beta",], function(require,   alpha,   beta) {
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

reqTwo(["require", "alpha", "beta"], function(require,   alpha,   beta) {
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

注意 require 被指定为模块的依赖项。这允许传递给函数回调的 require()函数类使用正确的上下文来正确的模块以获取多版本支持。如果 require 不是作为依赖项被指名，则可能会出现错误。

#### Loading Code After Page Load

The example above in the Multiversion Support section shows how code can later be loaded by nested require() calls.

上面多版本支持一节中的例子展示了被嵌套的 require()调用之后如何加载代码的。

#### Web Worker Support

As of release 0.12, RequireJS can be run inside a Web Worker. Just use importScripts() inside a web worker to load require.js (or the JS file that contains the require() definition), then call require.

在 发布的 0.12 版本中，RequireJS 可以在 Web Worker 中运行。 仅仅在一个 web worker 中使用 importScripts()来加载 require.js(或者包含 require()定义的 JS 文件)。然后调用 require

You will likely need to set the baseUrl configuration option to make sure require() can find the scripts to load.

你可能需要设置 baseUrl 配置选项来确保 require() 可以找到需要加载的脚本。

You can see an example of its use by looking at one of the files used in the unit test.

通过查看单元测试中使用的一个文件，你可以看到它的使用示例。

#### Rhino Support

RequireJS can be used in Rhino via the r.js adapter. See the r.js README for more information.

RequireJS 可以通过 r.js 适配器 在 Rhino 使用。查看 r.js README 来获取更多信息

#### Nashorn Support

As of RequireJS 2.1.16, RequireJS can be used in Nashorn, Java 8+'s JavaScript engine, via the r.js adapter. See the r.js README for more information.

从 RequireJS 2.1.16 起，RequireJS 可以在通过使用 r.js 适配器在 Nashorn java8+的 JS 引擎中使用。参阅 r.js README 来获取更多信息

#### Handling Errors

The general class of errors are 404s for scripts (not found), network timeouts or errors in the scripts that are loaded. RequireJS has a few tools to deal with them: require-specific errbacks, a "paths" array config, and a global requirejs.onError.

通常错误类型是 404(脚本未找到)、网络超时、加载脚本错误。 RequireJS 有一些工具来处理它们：require-specific errbacks， 一个 paths 数组配置，和一个全局的 requirejs.onError

The error object passed to errbacks and the global requirejs.onError function will usually contain two custom properties:

传递给 errbacks 的 error 对象和全局的 requirejs.onError 函数通常包含两部分自定义的属性

- requireType: A string value with a general classification, like "timeout", "nodefine", "scripterror".

* requireType: 一个具有一般分类的值，例如： timeout、nodefine、scripterror

* requireModules: an array of module names/URLs that timed out.

* requireModules： 一个超时的模块名/urls 数组

If you get an error with a requireModules, it probably means other modules that depend on the modules in that requireModules array are not defined.

如果你在使用 requireModules 时候出现错误，它可能意味着在 其他依赖于 requireModules 数组中的模块的模块没有定义。

#### Catching load failures in IE

Internet Explorer has a set of problems that make it difficult to detect load failures for errbacks/paths fallbacks:

Internet Explorer 有一组问题，使它很难检测 errbacks/paths 回退的加载故障

- script.onerror does not work in IE 6-8. There is no way to know if loading a script generates a 404, worse, it triggers the onreadystatechange with a complete state even in a 404 case.

* script.onerror 在 IE6-8 中不能工作。这里没有办法知道加载一个脚本是否会产生一个 404，更坏的是，即使在 404 状态下，它也会用一个完整的状态触发 onreadystatechange

* script.onerror does work in IE 9+, but it has a bug where it does not fire script.onload event handlers right after execution of script, so it cannot support the standard method of allowing anonymous AMD modules. So script.onreadystatechange is still used. However, onreadystatechange fires with a complete state before the script.onerror function fires.

* script.onerror 在 IE9.0 中可以运行，但是它有一个问题，在脚本执行后，它不能触发 script.onload 事件，因此它不能支持允许匿名 AMD 模块的标准方法。

So it is very difficult with IE to allow both anonymous AMD modules, which are a core benefit of AMD modules, and reliable detect errors.

因此在 IE 中很难同时允许匿名 AMD 模块（这是 AMD 模块的核心优势）和可靠的错误检测

However, if you are in a project that you know uses define() to declare all of its modules, or it uses the shim config to specify string exports for anything that does not use define(), then if you set the enforceDefine config value to true, the loader can confirm if a script load by checking for the define() call or the existence of the shim's exports global value.

但是，如果你在一个你知道使用 define() 来声明所有模块的工程中，或者它使用 shim 配置来为其他不使用 define()的任何东西指定字符串导出值，那么如果你设置 enforceDefine 为 true, 这个加载器可以通过检查 define() 调用或者 shim 的全局导出值的存在来确认脚本是否加载。

So if you want to support Internet Explorer, catch load errors, and have modular code either through direct define() calls or shim config, always set enforceDefine to be true. See the next section for an example.

如果你想支持 Internet Explorer，捕获加载 errors，并通过直接 define()调用或者 shim 配置类获得模块化代码，请始终设置 enforceDefine 为 true.查看下面的区域获取例子

NOTE: If you do set enforceDefine: true, and you use data-main="" to load your main JS module, then that main JS module must call define() instead of require() to load the code it needs. The main JS module can still call require/requirejs to set config values, but for loading modules it should use define().

注意：如果你设置 enforceDefine 为 true, 并且你使用 data-main="" 来加载你的 main JS 模块，然后 main JS 模块必须调用 define() 而不是 require()来加载它需要的代码。

If you then also use almond to build your code without require.js, be sure to use the insertRequire build setting to insert a require call for the main module -- that serves the same purpose of the initial require() call that data-main does.

如果你也使用 almond 在不适用 require.js 情况下来构建代码，请确保使用 insertRequire 构建设置来为主模块插入一个 require 调用 -- 这与初始化 require()调用和 data-main 调用的目的相同。

#### require([]) errbacks

**Errbacks**, when used with requirejs.undef(), will allow you to detect if a module fails to load, undefine that module, reset the config to a another location, then try again.

**Errbacks**： 当使用 requirejs.undef()时，将允许你检测模块是否加载失败，取消模块定义，重置配置到另一个位置，然后重试。

A common use case for this is to use a CDN-hosted version of a library, but if that fails, switch to loading the file locally:

一个常见的用例是使用 cdn 托管的库版本，但是如果加载失败，切换到本地加载文件

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

使用 `requirejs.undef()`，如果你稍后设置了不同的配置并尝试加载相同的模块，这个加载器仍然会记住哪些模块需要这些依赖，并在新配置加载后完成加载。

Note: errbacks only work with callback-style require calls, not define() calls. define() is only for declaring modules.

笔记： errbacks 仅仅在 callback-style require 调用时候起作用，而不是 define() 调用。define() 仅仅用来声明模块。

#### paths config fallbacks

The above pattern for detecting a load failure, undef()ing a module, modifying paths and reloading is a common enough request that there is also a shorthand for it. The paths config allows array values:

以上用于检测加载失败、undef()ing 一个模块、修复路径并重载模型的模型是一个非常常见的请求，它也有一个简写。路径配置允许使用数组值

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

以上的代码将先尝试使用 CDN 位置，但是如果它失败了，会回退到本地的 lib/jquery.js 位置

Note: paths fallbacks only work for exact module ID matches. This is different from normal paths config which can apply to any part of a module ID prefix segment. Fallbacks are targeted more for unusual error recovery, not a generic path search path solution, since those are inefficient in the browser.

笔记：paths 回退仅仅适用于完全匹配的 模块 ID。这与普通的路径配置不同，后者可以用于模块 ID 前缀的任何部分。回退方法更多的针对不寻常的错误恢复，而不是通用的路径搜索路径解决方案，因为在浏览器中它们效率很低。

#### Global requirejs.onError function

To detect errors that are not caught by local errbacks, you can override requirejs.onError():

为了检测那些没有被本地 errbacks 捕获的错误，你可以重写 requirejs.onError():

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

RequireJS 支持加载插件。这是一种支持非纯 JS 文件依赖的方法，但是在脚本工作之前加载脚本仍然很重要。The RequireJS wiki 有一些插件的列表。这里讨论了一些与 RequireJS 一起维护的特定插件

##### Specify a Text File Dependency

It is nice to build HTML using regular HTML tags, instead of building up DOM structures in script. However, there is no good way to embed HTML in a JavaScript file. The best that can be done is using a string of HTML, but that can be hard to manage, particularly for multi-line HTML.

使用常规的 HTML 标签而不是在脚本中构建脚本结构来构建 HTML 是非常好的。但是，这里没有好办法来在 JavaScript 文件中来嵌入 HTML. 能做的最好的办法就是使用一个 HTML 字符串，但是这很难管理，特别是对于多行 HTML.

RequireJS has a plugin, text.js, that can help with this issue. It will automatically be loaded if the text! prefix is used for a dependency. See the text.js README for more information.

RequireJS 有一个插件, text.js.它能帮助解决这个问题。如果 text! 前缀被用来做为一个依赖项，它将自动加载。查看 text.js README 获取更多信息。

#### Page Load Event Support/DOM Ready

It is possible when using RequireJS to load scripts quickly enough that they complete before the DOM is ready. Any work that tries to interact with the DOM should wait for the DOM to be ready. For modern browsers, this is done by waiting for the DOMContentLoaded event.

当使用 RequireJS 加载脚本足够快时，它们在 DOM 准备好之前加载完成是很有可能的。任何试图与 DOM 有交互的工作都应该等待 DOM 准备好之后进行。对于现代的浏览器，等待 DOMContentLoaded 事件已经被做了。

However, not all browsers in use support DOMContentLoaded. The domReady module implements a cross-browser method to determine when the DOM is ready. Download the module and use it in your project like so:

但是，并不是所有的浏览器都支持 DOMContentLoaded。domReady 模块实现了一个跨浏览器的方法来确定何时 Dom 准备好。下载这个模块并且在项目中这样使用：

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

因为 DOM ready 是一种常见的应用需求，理想情况下可以避免上述 API 中的嵌套函数。domReady 模块还实现了 Loader Plugin API，所以你可以使用 Loader plugin 语法(注意在 domReady 依赖中的 ！)来强制 require() 回调函数在执行前等待 DOM 准备好

```
domReady
```

will return the current document when used as a loader plugin:

- 当它作为一个加载插件使用时，将会返回一个当前的元素

```javascript
require(['domReady!'], function (doc) {
	//This function is called once the DOM is ready,
	//notice the value for 'domReady!' is the current
	//document.
})
```

Note: If the document takes a while to load (maybe it is a very large document, or has HTML script tags loading large JS files that block DOM completion until they are done), using domReady as a loader plugin may result in a RequireJS "timeout" error. If this is a problem either increase the waitSeconds configuration, or just use domReady as a module and call domReady() inside the require() callback.

笔记：如果元素加载需要一段时间（也许它是一个很大的文件，或者有 HTML 脚本标签加载阻止 DOM 完成知道它们完成的大型 JS 文件），使用 domReady 作为加载器可能会导致 Requirejs 超时错误。如果这是一个问题，可以增加 waitSeconds 配置，或者只是使用 domReady 作为一个模块，并在 require() 回调函数中 调用 domReady()

#### Define an I18N Bundle

Once your web app gets to a certain size and popularity, localizing the strings in the interface and providing other locale-specific information becomes more useful. However, it can be cumbersome to work out a scheme that scales well for supporting multiple locales.

一旦你的网页 app 达到一定规模和流行度，在界面中本地化字符串并提供其他特定于区域设置的信息变得更加有用。然而，要定制出一种能够很好地扩展以支持多个地区的方案可能会变得很繁琐。

RequireJS allows you to set up a basic module that has localized information without forcing you to provide all locale-specific information up front. It can be added over time, and only strings/values that change between locales can be defined in the locale-specific file.

RequireJS 允许你设置一个包含本地化信息的基本模块，而不是强制你预先提供所有的特定于地区的信息。它可以随着时间的推移而添加，并且仅特定于语言环境的文件中的在本地之间改变的 string/values 可以被定义。

i18n bundle support is provided by the i18n.js plugin. It is automatically loaded when a module or dependency specifies the i18n! prefix (more info below). Download the plugin and put it in the same directory as your app's main JS file.

i18n.js 插件已经提供了 i18n 包支持。当一个模块或者依赖指明了 i18n! 前缀，它将会自动加载。下载这个插件并且把它放在与你的 app 的主 JS 文件同样的目录下。

To define a bundle, put it in a directory called "nls" -- the i18n! plugin assumes a module name with "nls" in it indicates an i18n bundle. The "nls" marker in the name tells the i18n plugin where to expect the locale directories (they should be immediate children of the nls directory). If you wanted to provide a bundle of color names in your "my" set of modules, create the directory structure like so:

为了定义一个包，将它放在一个名为 nls 的文件夹中--这个 i18n! 插件假设一个带有 nls 的模块名字表示一个 i18n 包。这个名字中的 nls 标记告诉 i18n 插件在哪里可以找到 本地的文件夹(它们应该是 nls 目录中的直接子目录)。如果你想要在你的“my”模块中提供一束颜色名称，可以创建类似这样的目录结构：

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

带有 root 属性的对象字面量定义了这个模块。这就是为以后的本地化工作奠定基础所需要的一切。

You can then use the above module in another module, say, in a my/lamps.js file:

你可以在其他模块中使用以上模块，例如在 my/lamps.js 文件中

```javascript
//Contents of my/lamps.js
define(['i18n!my/nls/colors'], function (colors) {
	return {
		testMessage: 'The name for red in this locale is: ' + colors.red,
	}
})
```

The my/lamps module has one property called "testMessage" that uses colors.red to show the localized value for the color red.

这个 my/lamps 模块一个叫做 testMessage 的属性，它使用 colors.red 来展示 本地的红色的值

Later, when you want to add a specific translation to a file, say for the fr-fr locale, change my/nls/colors to look like so:

然后，当你想要添加一个指定的翻译到一个文件，离去 fr-fr 区域，更改 my/nls/colors 看起来像这样

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

然后定义一个包含如下内容的在 my/nls/fr-fr/colors.js 文件

```javascript
//Contents of my/nls/fr-fr/colors.js
define({
	red: 'rouge',
	blue: 'bleu',
	green: 'vert',
})
```

RequireJS will use the browser's navigator.languages, navigator.language or navigator.userLanguage property to determine what locale values to use for my/nls/colors, so your app does not have to change. If you prefer to set the locale, you can use the module config to pass the locale to the plugin:

RequireJS 将使用 浏览器的 navigator.languages, navigator.language or navigator.userLanguage 属性来决定为 my/nls/colors 使用什么样的本地值，这样你的 app 没有必要改变。如果你更想设置本地，你可以使用模块配置将本地值传递给插件

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

注意为了避免大小写问题， RequireJS 将始终使用本地的一个小写版本，因此磁盘中的 i18n 包中的所有文件夹和文件都应该使用小写的语言环境。

RequireJS is also smart enough to pick the right locale bundle, the one that most closely matches the ones provided by my/nls/colors. For instance, if the locale is "en-us", then the "root" bundle will be used. If the locale is "fr-fr-paris" then the "fr-fr" bundle will be used.

RequireJS 同时也足够聪明来选择正确的本地捆绑，与 my/nls/colors 提供的最接近的那个。例如，如果区域是 “en-us”，那么将使用 root 包.如果本地是 "fr-fr-paris"，那么 fr-fr 包将会被使用。

RequireJS also combines bundles together, so for instance, if the french bundle was defined like so (omitting a value for red):

RequireJS 也把 bundle 组合在一起，例如，如果 french bundle 是这样定义到

```javascript
//Contents of my/nls/fr-fr/colors.js
define({
	blue: 'bleu',
	green: 'vert',
})
```

Then the value for red in "root" will be used. This works for all locale pieces. If all the bundles listed below were defined, then RequireJS will use the values in the following priority order (the one at the top takes the most precedence):

那么将会使用在 root 中的 red 值。这个为本地所有的片段服务。如果下面列出的所有 bundle 都被定义了，那么 RequireJS 将会按照以下优先级使用这些值（最上面的优先级最高）

- my/nls/fr-fr-paris/colors.js
- my/nls/fr-fr/colors.js
- my/nls/fr/colors.js
- my/nls/colors.js

If you prefer to not include the root bundle in the top level module, you can define it like a normal locale bundle. In that case, the top level module would look like:

如果你不希望在顶级模块中包含 根包，那么你可以像定义普通本地包那样定义它。在这种情况下，顶层模块看起来像这样：

```javascript
//my/nls/colors.js contents:
define({
	root: true,
	'fr-fr': true,
	'fr-fr-paris': true,
})
```

and the root bundle would look like:

根目录像这样

```javascript
//Contents of my/nls/root/colors.js
define({
	red: 'red',
	blue: 'blue',
	green: 'green',
})
```

## RequireJS Optimizer

RequireJS has an optimization tool that does the following

RequireJS 有一个优化工具，可以做如下的工作

- Combines related scripts together into build layers and minifies them via UglifyJS (the default) or Closure Compiler (an option when using Java).

* 将相关脚本组合成构架层，并通过 UglifyJS(默认值)或者 Closure Compiler(使用 java 时候的一个选项)缩小它们

- Optimizes CSS by inlining CSS files referenced by @import and removing comments.

* 通过内联@import 引用 css 文件和删除注释来优化 CSS

The optimizer is part of the r.js adapter for Node and Nashorn, and it is designed to be run as part of a build or packaging step after you are done with development and are ready to deploy the code for your users.

这个加载器是 Node 和 Nashorn 的 r.js 适配器的一部分，并且它被设计成在你完成开发并准备好为你的用户部署代码之后，作为构建或者打包步骤的一部分运行。

The optimizer will only combine modules that are specified in arrays of string literals that are passed to top-level require and define calls, or the require('name') string literal calls in a simplified CommonJS wrapping. So, it will not find modules that are loaded via a variable name:

这个优化器将只会组合传递给顶层 require 和定义调用的字符串字面量数组中指定的模块，或者在简化 CommonJS 包装中组合 require('name')字符串字面量调用。因此，它不会找到通过变量名加载的模块

```javascript
var mods = someCondition ? ['a', 'b'] : ['c', 'd']
require(mods)
```

but 'a' and 'b' will be included if specified like so:

但如果像这样声明， a 和 b 将会包括

```javascript
require(['a', 'b'])
```

or:

```javascript
define(['a', 'b'], function (a, b) {})
```

This behavior allows dynamic loading of modules even after optimization. You can always explicitly add modules that are not found via the optimizer's static analysis by using the include option.

这种行为允许在优化之后动态加载模块。通过使用 include 选项，你总是可以显式地添加没有通过优化器的静态分析找到的模块。

### Requirements

The optimizer can be run using Node, Java with Rhino or Nashorn, or in the browser. The requirements for each option:

这个优化器可以通过使用 Node, Java with Rhino or Nashorn, 或者 in the browser 来运行。每一个选项要求如下

- Node: (preferred) Node 0.4.0 or later.
- Java: Java 1.6 or later.
- Browser: as of 2.1.2, the optimizer can run in a web browser that has array extras. While the optimizer options are the same as shown below, it is called via JavaScript instead of command line options. It is also only good for generating optimized single files, not a directory optimization. See the browser example. This option is really only useful for providing web-based custom builds of your library.

* Browser: 从 2.1.2 之后，这个优化器可以运行在一个拥有额外数组的浏览器中。虽然优化器选项如下所示，它通过 JavaScript 来调用，而不是命令行选项。它也适用于生成优化的单个文件，而不是适用于目录优化。这个选项只对提供了 web-based 自定义的构建有用。

For command line use, Node is the preferred execution environment. The optimizer runs **much faster** with Node.

对于命令行，Node 是首选的额执行环境。使用 Node, 优化器运行起来要更快

All the example commands in this page assume Node usage, and running on a Linux/OS X command line. See the r.js README for how to run it in Java.

本页中的所有示例命令都假定使用 Node,并且运行在 Linux/OS 命令行。查看 r.js README 来查看它在 java 中如何运行

### Download

1. You can download the tool on the download page.

2. If you are using Node with NPM, you can install r.js globally as part of the "requirejs" package in NPM:

```javascript
npm install -g requirejs
r.js -o app.build.js
```

If on Windows, you may need to type r.js.cmd instead of r.js. Or, you can use DOSKEY:

```javascript
DOSKEY r.js=r.js.cmd $\*
```

If you want to install requirejs locally in a project as an npm package, instead of globally:

```javascript
npm install requirejs
```

With this local install, you can run the optimizer by running the r.js or r.js.cmd file found in the project's node_modules/.bin directory.

With the local install, you can also use the optimizer via a function call inside a node program.

The rest of this page assumes that r.js is just downloaded manually from the download page. It is normally the clearest, most portable way to use the optimizer.

### Example setup

The examples in this page will assume you downloaded and saved r.js in a directory that is a sibling to your project directory. The optimizer that is part of r.js can live anywhere you want, but you will likely need to adjust the paths accordingly in these examples.

Example setup:

```
appdirectory
	main.html
	css
		common.css
		main.css
	scripts
		require.js
		main.js
		one.js
		two.js
		three.js
r.js (The r.js optimizer from download page)
```

main.html has script tags for require.js and loads main.js via a require call, like so:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My App</title>
		<link rel="stylesheet" type="text/css" href="css/main.css" />
		<script data-main="scripts/main" src="scripts/require.js"></script>
	</head>
	<body>
		<h1>My App</h1>
	</body>
</html>
```

main.js loads one.js, two.js and three.js via a require call:

```javascript
require(['one', 'two', 'three'], function (one, two, three) {})
```

main.css has content like the following:

```css
@import url('common.css');
.app {
	background: transparent url(../../img/app.png);
}
```

### Basics

Command line arguments are interchangeable with a build profile properties

You can either specify options on the command line:

```
node r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js
```

or in a build profile. In a build.js, the same command line arguments can be specified like so:

```javascript
;({
	baseUrl: '.',
	paths: {
		jquery: 'some/other/jquery',
	},
	name: 'main',
	out: 'main-built.js',
})
```

then just pass the build profile's file name to the optimizer:

```
node r.js -o build.js
```

Command line arguments take precedence over build profile settings, and you can mix them together:

```
node r.js -o build.js optimize=none
```

There is a limitation on the command line argument syntax. Dots are viewed as object property separators, to allow something like paths.jquery=lib/jquery to be transformed to the following in the optimizer:

```
paths: {
    jquery: 'lib/jquery'
}
```

but this means you cannot set the value for a paths property of "core/jquery.tabs" to a value. This would not work: paths.core/jquery.tabs=empty:, since it would result in this incorrect structure:

```
paths: {
    'core/jquery': {
        tabs: 'empty:'
    }
}
```

If you need to set a path like the "core/jquery.tabs" one, use a build.js file with the build options specified as a JavaScript object instead of using command line arguments.

For a list of all options, see all configuration options.

Relative path resolution rules::

In general, if it is a path, it is relative to the build.js file used to hold the build options, or if just using command line arguments, relative to the current working directory. Example of properties that are file paths: appDir, dir, mainConfigFile, out, wrap.startFile, wrap.endFile.

For baseUrl, it is relative to appDir. If no appDir, then baseUrl is relative to the build.js file, or if just using command line arguments, the current working directory.

For paths and packages, they are relative to baseUrl, just as they are for require.js.

For properties that are module IDs, they should be module IDs, and not file paths. Examples are name, include, exclude, excludeShallow, deps.

Config settings in your main JS module that is loaded in the browser at runtime are not read by default by the optimizer

This is because the config settings for a build can be very different, with multiple optimization targets. So a separate set of config options need to be specified for the optimizer.

In version 1.0.5+ of the optimizer, the mainConfigFile option can be used to specify the location of the runtime config. If specified with the path to your main JS file, the first requirejs({}), requirejs.config({}), require({}), or require.config({}) found in that file will be parsed out and used as part of the configuration options passed to the optimizer:

```
mainConfigFile: 'path/to/main.js'
```

The precedence for config: command line, build profile, mainConfigFile. In other words, the mainConfigFile configuration has the lowest priority.

### Optimizing one JavaScript file

Use the above example setup, if you just wanted to optimize main.js, you could use this command, from inside the appdirectory/scripts directory:

```
node ../../r.js -o name=main out=main-built.js baseUrl=.
```

This will create a file called appdirectory/scripts/main-built.js that will include the contents of main.js, one.js, two.js and three.js.

Normally you should not save optimized files with your pristine project source. Normally you would save them to a copy of your project, but to make this example easier it is saved with the source. Change the out= option to any directory you like, that has a copy of your source. Then, you can change the main-built.js file name to just main.js so the HTML page will load the optimized version of the file.

If you want to include require.js with the main.js source, you can use this kind of command:

```
node ../../r.js -o baseUrl=. paths.requireLib=../../require name=main include=requireLib out=main-built.js
```

Since "require" is a reserved dependency name, you create a "requireLib" dependency and map it to the require.js file.

Once that optimization is done, you can change the script tag to reference "main-built.js" instead of "require.js", and your optimized project will only need to make one script request.

If you want to wrap your built file so it can be used in pages that do not have an AMD loader like RequireJS, see the Optimization FAQ.

### Shallow exclusions for fast development

You can use the one JavaScript file optimization approach to make your development experience faster. By optimizing all the modules in your project into one file, except the one you are currently developing, you can reload your project quickly in the browser, but still give you the option of fine grained debugging in a module.

You can do this by using the excludeShallow option. Using the example setup above, assume you are currently building out or debugging two.js. You could use this optimization command:

```
node ../../r.js -o name=main excludeShallow=two out=main-built.js baseUrl=.
```

If you do not want the main-build.js file minified, pass optimize=none in the command above.

Then configure the HTML page to load the main-built.js file instead of main.js by configuring the path used for "main" to be "main-built":

```html
!DOCTYPE html>
<html>
	<head>
		<title>My App</title>
		<link rel="stylesheet" type="text/css" href="css/main.css" />
		<script src="scripts/require.js"></script>
		<script>
			require.config({
				paths: {
					//Comment out this line to go back to loading
					//the non-optimized main.js source file.
					main: 'main-built',
				},
			})
			require(['main'])
		</script>
	</head>
	<body>
		<h1>My App</h1>
	</body>
</html>
```

Now, when this page is loaded, the require() for "main" will load the main-built.js file. Since excludeShallow told it just to exclude two.js, two.js will still be loaded as a separate file, allowing you to see it as a separate file in the browser's debugger, so you can set breakpoints and better track its individual changes.

### empty: paths for network/CDN resources

You may have a script you want to load from a Content Delivery Network (CDN) or any other server on a different domain.

The optimizer cannot load network resources, so if you want it included in the build, be sure to create a paths config to map the file to a module name. Then, for running the optimizer, download the CDN script and pass a paths config to the optimizer that maps the module name to the local file path.

However, it is more likely that you do not want to include that resource in the build. If the script does not have any dependencies, or you do not want to include its dependencies or will be including them in another way, then you can use the special 'empty:' scheme in the paths config to just skip the file when doing an optimization.

In your main.js file, create a paths config that gives the script a module name. This can be done even if the script does not define a module via a call to define(). paths config are just used to map short module/script IDs to an URL. This allows you to use a different paths config for the optimization. In main.js:

```javascript
requirejs.config({
	paths: {
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
	},
})

require(['jquery'], function ($) {})
```

Then, when running the optimizer, use 'empty:' for the paths config:

```
node ../../r.js -o name=main out=main-built.js baseUrl=. paths.jquery=empty:
```

Or, in a build profile:

```
({
    baseUrl: ".",
    name: "main",
    out: "main-built.js",
    paths: {
        jquery: "empty:"
    }
})
```

### Optimizing one CSS file

Use the above example setup, if you just wanted to optimize main.css, you could use this command, from inside the appdirectory/css directory:

```
node ../../r.js -o cssIn=main.css out=main-built.css
```

This will create a file called appdirectory/css/main-build.css that will include the contents of main.css, have the url() paths properly adjusted, and have comments removed.

See the notes for the Optimizing one JavaScript file about avoiding saving optimized files in your pristine source tree. It is only done here to make the example simpler.
Note: The url() path fixing will always fix the paths relative to the cssIn build option path, not the out build option.

### Optimizing a whole project

The optimizer can take care of optimizing all the CSS and JS files in your project by using a build profile.

Create a build profile, call it app.build.js, and put it in the scripts directory. The app.build.js file can live anywhere, but just be sure to adjust the paths accordingly in the example below -- all paths will be relative to where the app.build.js is located. Example app.build.js:

```
({
    appDir: "../",
    baseUrl: "scripts",
    dir: "../../appdirectory-build",
    modules: [
        {
            name: "main"
        }
    ]
})
```

This build profile tells RequireJS to copy all of appdirectory to a sibling directory called appdirectory-build and apply all the optimizations in the appdirectory-build directory. It is strongly suggested you use a different output directory than the source directory -- otherwise bad things will likely happen as the optimizer overwrites your source.

RequireJS will use baseUrl to resolve the paths for any module names. The baseUrl should be relative to appDir.

In the modules array, specify the module names that you want to optimize, in the example, "main". "main" will be mapped to appdirectory/scripts/main.js in your project. The build system will then trace the dependencies for main.js and inject them into the appdirectory-build/scripts/main.js file.

It will also optimize any CSS files it finds inside appdirectory-build.

To run the build, run this command from inside the appdirectory/scripts directory:

```
node ../../r.js -o app.build.js
```

Once the build is done, you can use appdirectory-build as your optimized project, ready for deployment.

### Optimizing a multi-page project

requirejs/example-multipage is an example of a project that has multiple pages, but shares a common configuration and a common optimized build layer.

### Turbo options

The default for the optimizer is to do the safest, most robust set of actions that avoid surprises after a build. However, depending on your project setup, you may want to turn off some of these features to get faster builds:

- The biggest time drain is minification. If you are just doing builds as part of a dev workflow, then set optimize to "none".
- If doing a whole project optimization, but only want to minify the build layers specified in modules options and not the rest of the JS files in the build output directory, you can set skipDirOptimize to true.
- Normally each run of a whole project optimization will delete the output build directory specified by dir for cleanliness. Some build options, like onBuildWrite, will modify the output directory in a way that is hazardous to do twice over the same files. However, if you are doing simple builds with no extra file transforms besides build layer minification, then you can set keepBuildDir to true to keep the build directory between runs. Then, only files that have changed between build runs will be copied.

As of version 2.1.2, there are some speed shortcuts the optimizer will take by default if optimize is set to "none". However, if you are using "none" for optimize and you are planning to minify the built files after the optimizer runs, then you should turn set normalizeDirDefines to "all" so that define() calls are normalized correctly to withstand minification. If you are doing minification via the optimize option, then you do not need to worry about setting this option.

### Integration with has.js

has.js is a great tool to that adds easy feature detection for your project. There is some optimizer support for optimizing code paths for has.js tests.

If your code uses tests like the following:

```javascript
if (has('someThing')) {
	//use native someThing
} else {
	//do some workaround
}
```

You can define a has object in the build config with true or false values for some has() tests, and the optimizer will replace the has() test with the true or false value.

If your build profile looked like so:

```
({
    baseUrl: ".",
    name: "hasTestModule",
    out: "builds/hasTestModule.js",
    has: {
        someThing: true
    }
})
```

Then the optimizer will transform the above code sample to:

```javascript
if (true) {
	//use native someThing
} else {
	//do some workaround
}
```

Then, if you use the default optimize setting of "uglify" in r.js 0.26.0 or later, or if the optimize setting is set to "closure" (when run under Java), the minifier will optimize out the dead code branch! So you can do custom builds of your code that are optimized for a set of has() tests.

### Source maps

Version 2.1.6 and higher have experimental support for source maps. It works for mapping minified, bundled code to unminified, separate modules and only when optimize is set to "uglify2". optimize set to "closure" allows only mapping minified, bundled code to unminified bundled code (closure only available when running under Java with Rhino). The unminified files will show up in the developer tools with a ".src.js" file extension.

To enable the source map generation, set generateSourceMaps to true. Since the minifier needs to have full control over the minified file to generate the source map, the preserveLicenseComments should be explicitly set to false. There is is a way to get some license comments in the minified source though.

The optimizer has supported sourceURL (by setting useSourceUrl to true), for debugging combined modules as individual files. However, that only works with non-minified code. Source maps translate a minified file to a non-minified version. It does not make sense to use useSourceUrl with generateSourceMaps since useSourceUrl needs the source values as strings, which prohibits the useful minification done in combination with generateSourceMaps.

### All configuration options

There is an example.build.js file in the requirejs/build directory that details all of the allowed optimizer configuration options.

### Deployment techniques

The r.js optimizer is designed to offer some primitives that can be used for different deployment scenarios by adding other code on top of it. See the deployment techniques wiki page for ideas on how to use the optimizer in that fashion.

### Common pitfalls

If you are having trouble with the examples below, here are some common pitfalls that might be the source of the problem:

Do not specify the output directory to within the source area for your JavaScript

For instance, if your baseUrl is 'js' and your build output goes into 'js/build', there will likely be problems with extra, nested files generated on each optimization run. This guidance is only for optimizations that are not single file optimizations.

Avoid optimization names that are outside the baseUrl

For instance, if your baseUrl is 'js', and your optimization targets:

```
name: '../main'
```

the optimization could overwrite or place files outside the output directory. For those cases, create a paths config to map that file to a local name, like:

```
paths: {
    main: '../main'
}
```

then use name:

```
name: 'main'
```

for the optimization target.

Note the build limitations of shim config. In particular, you cannot load dependencies for shimmed libraries from a CDN. See the shim config section for more information.
