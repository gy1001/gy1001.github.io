# Require.js

## Home 主页

RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. Using a modular script loader like RequireJS will improve the speed and quality of your code.

RequireJS 是一个 JavaScript 文件和模块加载器。它针对浏览器内使用进行了优化，但可以在其他 JavaScript 环境中使用，例如 Rhino 和 Node。使用像 RequireJS 这样的模块化脚本加载器将提高代码的速度和质量。

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

此设置假定您将所有 JavaScript 文件都保留在项目的"scripts"目录中。例如，如果您有一个包含 project.html 页面的项目，其中包含一些脚本，则目录布局可能如下所示：

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

为了充分利用优化工具，建议您将所有内联脚本都保留在 HTML 之外，并且仅通过 requirejs 调用引用 require.js 即可加载脚本：

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

如果您不想加载 require.js 脚本来阻止渲染，也可以将 script 标签放在`<body>`部分的末尾。对于支持它的浏览器，您还可以在 script 标签中添加 async 属性。

Inside of main.js, you can use requirejs() to load any other scripts you need to run. This ensures a single entry point, since the data-main script you specify is loaded asynchronously.

在 main.js 内部，您可以使用 requirejs()来加载需要运行的其他脚本。这确保了一个入口点，因为您指定的数据主脚本是异步加载。

```javascript
requirejs(['helper/util'], function (util) {
	//This function is called when scripts/helper/util.js is loaded.
	//If util.js calls define(), then this function is not fired until
	//util's dependencies have loaded, and the util argument will hold
	//the module value for "helper/util".
})
```

这将加载 helper/util.js 脚本。要充分利用 RequireJS，请参阅 API 文档，以了解有关定义和使用模块的更多信息。

### 优化

Once you are finished doing development and want to deploy your code for your end users, you can use the optimizer to combine the JavaScript files together and minify it. In the example above, it can combine main.js and helper/util.js into one file and minify the result.

一旦完成开发并希望为最终用户部署代码，就可以使用优化器将 JavaScript 文件组合在一起并进行最小化。在上面的示例中，它可以将 main.js 和 helper/util.js 合并到一个文件中并最小化结果。

## API

### 使用

#### 加载 JavaScript 文件

RequireJS takes a different approach to script loading than traditional `<script>` tags. While it can also run fast and optimize well, the primary goal is to encourage modular code. As part of that, it encourages using module IDs instead of URLs for script tags.

与传统的`<script>`标记相比，RequireJS 采用了不同的方法来加载脚本。尽管它还可以快速运行并优化得很好，但主要目标是鼓励使用模块化代码。作为其一部分，它鼓励使用模块 ID 代替脚本标记的 URL。

RequireJS loads all code relative to a baseUrl.The baseUrl is normally set to the same directory as the script used in a data-main attribute for the top level script to load for a page.The data-main attribute is a special attribute that require.js will check to start script loading.This example will end up with a baseUrl of scripts:

RequireJS 加载相对于 baseUrl 的所有代码。通常，将 baseUrl 设置为与 data-main 属性中使用的脚本相同的目录，以使顶级脚本加载页面。该数据主要属性是一个特殊的属性，require.js 将检查启动脚本加载。本示例将以脚本的 baseUrl 结尾：

```javascript
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

Or, baseUrl can be set manually via the RequireJS config.If there is no explicit config and data-main is not used, then the default baseUrl is the directory that contains the HTML page running RequireJS.

或者，可以通过 RequireJS config 手动设置 baseUrl。如果没有显式配置并且未使用 data-main，则默认的 baseUrl 是包含运行 RequireJS 的 HTML 页面的目录。

RequireJS also assumes by default that all dependencies are scripts, so it does not expect to see a trailing ".js" suffix on module IDs.RequireJS will automatically add it when translating the module ID to a path.With the paths config, you can set up locations of a group of scripts. All of these capabilities allow you to use smaller strings for scripts as compared to traditional `<script>` tags.

默认情况下，RequireJS 还假定所有依赖项都是脚本，因此它不希望在模块 ID 上看到尾随的".js"后缀。在将模块 ID 转换为路径时，RequireJS 将自动添加它。使用 path config，您可以设置一组脚本的位置。与传统的 `<script>` 标记相比，所有这些函数都允许您为脚本使用较小的字符串。

There may be times when you do want to reference a script directly and not conform to the "baseUrl + paths" rules for finding it.If a module ID has one of the following characteristics, the ID will not be passed through the "baseUrl + paths" configuration, and just be treated like a regular URL that is relative to the document:

有时您确实希望直接引用脚本，而又不遵循"baseUrl +路径"规则来查找脚本。如果模块 ID 具有以下特征之一，则该 ID 将不会通过"baseUrl +路径"配置传递，而只会被视为与文档相关的常规 URL：

- Ends in ".js".
- Starts with a "/".
- Contains an URL protocol, like "http:" or "https:".

* 以".js"结尾。
* 以"/"开头。
* 包含 URL 协议，例如"http："或"https："

In general though, it is best to use the baseUrl and "paths" config to set paths for module IDs.
By doing so, it gives you more flexibility in renaming and configuring the paths to different locations for optimization builds.

通常，最好使用 baseUrl 和"paths"配置来设置模块 ID 的路径。这样，您可以在重命名和配置指向不同位置的路径以进行优化构建时更加灵活。

Similarly, to avoid a bunch of configuration, it is best to avoid deep folder hierarchies for scripts, and instead either keep all the scripts in baseUrl, or if you want to separate your library/vendor-supplied code from your app code, use a directory layout like this:

同样，为避免进行大量配置，最好避免对脚本使用较深的文件夹层次结构，而是将所有脚本都保留在 baseUrl 中，或者如果要从应用程序代码中分离库/供应商提供的代码，请使用目录布局如下：

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
在 inde.html 中

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

请注意，作为该示例的一部分，像 jQuery 这样的供应商库在文件名中没有其版本号。如果要跟踪版本信息，建议将其存储在单独的文本文件中，或者如果使用诸如 volo 之类的工具，它将在 package.json 中标记版本信息，但将文件保留在磁盘上为"jquery"。 js"。这使您可以进行非常小的配置，而不必在每个库的"路径"配置中放置一个条目。例如，将"jquery"配置为"jquery-1.7.2"。

Ideally the scripts you load will be modules that are defined by calling define().However, you may need to use some traditional/legacy "browser globals" scripts that do not express their dependencies via define().For those, you can use the shim config. To properly express their dependencies.

理想情况下，您加载的脚本将是通过调用 define（）定义的模块。但是，您可能需要使用某些传统/旧版的"浏览器全局变量"脚本，这些脚本无法通过 define（）表达它们的依赖性。对于那些，您可以使用 shim config。正确表达其依赖性。

If you do not express the dependencies, you will likely get loading errors since RequireJS loads scripts asynchronously and out of order for speed.

如果不表达依赖关系，则由于 RequireJS 异步加载脚本且速度不佳，可能会导致加载错误。

### data-main Entry Point

The data-main attribute is a special attribute that require.js will check to start script loading:

data-main 属性是 require.js 将检查以开始加载脚本的特殊属性：

```html
<!--when require.js loads it will inject another script tag
    (with async attribute) for scripts/main.js-->
<script data-main="scripts/main" src="scripts/require.js"></script>
```

You will typically use a data-main script to set configuration options and then load the first application module. Note: the script tag require.js generates for your data-main module includes the async attribute. This means that you cannot assume that the load and execution of your data-main script will finish prior to other scripts referenced later in the same page.

通常，您将使用数据主脚本来设置配置选项，然后加载第一个应用程序模块。注意：为您的数据主模块生成的脚本标签 require.js 包含 async 属性。这意味着您不能假定数据主脚本的加载和执行将在同一页面稍后引用的其他脚本之前完成。

For example, this arrangement will fail randomly when the require.config path for the 'foo' module has not been set prior to it being require()'d later:

例如，当在稍后需要 require（）之前未设置'foo'模块的 require.config 路径时，此安排将随机失败：

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

如果要 require()在 HTML 页面中进行调用，则最好不要使用 data-main。data-main 仅在页面只有一个主要入口点 data-main 脚本时使用。对于要进行内联 require()调用的页面，最好将其嵌套 require()在配置调用中：

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

模块与传统脚本文件的不同之处在于，它定义了一个范围广泛的对象，可避免污染全局名称空间。它可以显式列出其依赖关系，并在不需要引用全局对象的情况下获取这些依赖关系的句柄，而是将依赖关系作为定义模块的函数的参数来接收。RequireJS 中的模块是 Module Pattern 的扩展，其优点是不需要全局变量来引用其他模块。

The RequireJS syntax for modules allows them to be loaded as fast as possible, even out of order, but evaluated in the correct dependency order, and since global variables are not created, it makes it possible to load multiple versions of a module in a page.

模块的 RequireJS 语法允许它们以尽可能快的速度加载，即使不按顺序加载，但以正确的依赖关系顺序进行评估，并且由于未创建全局变量，因此可以在页面中加载模块的多个版本。

(If you are familiar with or are using CommonJS modules, then please also see CommonJS Notes for information on how the RequireJS module format maps to CommonJS modules).

（如果您熟悉或正在使用 CommonJS 模块，那么也请参阅 CommonJS Notes 以获取有关 RequireJS 模块格式如何映射到 CommonJS 模块的信息）。

There should only be one module definition per file on disk. The modules can be grouped into optimized bundles by the optimization tool.

磁盘上每个文件应该只有一个模块定义。可以通过优化工具将模块分组为优化的包。

#### Simple Name/Value Pairs

If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():

如果模块没有任何依赖关系，而只是名称/值对的集合，则只需将对象文字传递给 define（）：

```javascript
// Inside file my/shirt.js:
define({
	color: 'black',
	size: 'unisize',
})
```

#### Definition Functions

If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():

如果模块没有依赖项，但是需要使用函数来完成一些设置工作，则定义自己，然后将函数传递给 define（）：

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

如果模块具有依赖项，则第一个参数应为依赖项名称数组，第二个参数应为定义函数。加载所有依赖项后，将调用该函数以定义模块。该函数应返回定义模块的对象。依赖项将作为函数参数传递给定义函数，列出的顺序与依赖项数组中的顺序相同：

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

上面的函数调用指定了两个参数："cart"和"inventory"。这些是由"./cart"和"./inventory"模块名称表示的模块。

The function is not called until the my/cart and my/inventory modules have been loaded, and the function receives the modules as the "cart" and "inventory" arguments.

在加载了 my/cart 和 my/inventory 模块之后，该函数才被调用，并且该函数将这些模块作为"cart"和"inventory"参数接收。

Modules that define globals are explicitly discouraged, so that multiple versions of a module can exist in a page at a time (see Advanced Usage). Also, the order of the function arguments should match the order of the dependencies.

明确建议不要使用定义全局变量的模块，以便一次在一个页面中可以存在一个模块的多个版本（请参阅高级用法）。此外，函数参数的顺序应与依赖项的顺序匹配。

The return object from the function call defines the "my/shirt" module. By defining modules in this way, "my/shirt" does not exist as a global object.

函数调用的返回对象定义 "my/shirt" 模块。通过以这种方式定义模块，"my/shirt"就不会作为全局对象存在。

#### Define a Module as a Function

Modules do not have to return objects. Any valid return value from a function is allowed. Here is a module that returns a function as its module definition:

模块不必返回对象。允许从函数返回任何有效的返回值。这是一个返回函数作为其模块定义的模块：

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

如果您希望重用以传统 CommonJS 模块格式编写的某些代码，则可能难以对上面使用的依赖项数组进行重新处理，并且您可能更希望将依赖项名称直接与用于此的本地变量对齐依赖性。在以下情况下，可以使用简化的 CommonJS 包装器：

```javascript
define(function (require, exports, module) {
	var a = require('a'),
		b = require('b')

	//Return the module value
	return function () {}
})
```

This wrapper relies on Function.prototype.toString() to give a useful string value of the function contents. This does not work on some devices like the PS3 and some older Opera mobile browsers. Use the optimizer to pull out the dependencies in the array format for use on those devices.

该包装器依赖于 Function.prototype.toString（）给出函数内容的有用字符串值。这在某些设备（例如 PS3 和某些较旧的 Opera 移动浏览器）上不起作用。使用优化器以数组格式提取依赖项，以在这些设备上使用。

More information is available on the CommonJS page, and in the "Sugar" section in the Why AMD page.

有关更多信息，请参见 CommonJS 页面，以及"为什么选择 AMD"页面的"糖"部分。

#### Define a Module with a Name

You may encounter some define() calls that include a name for the module as the first argument to define():

您可能会遇到一些 define（）调用，其中包含模块的名称作为 define（）的第一个参数：

```javascript
//Explicitly defines the "foo/title" module:
define('foo/title', ['my/cart', 'my/inventory'], function (cart, inventory) {
	//Define foo/title object in here.
})
```

These are normally generated by the optimization tool. You can explicitly name modules yourself, but it makes the modules less portable -- if you move the file to another directory you will need to change the name. It is normally best to avoid coding in a name for the module and just let the optimization tool burn in the module names. The optimization tool needs to add the names so that more than one module can be bundled in a file, to allow for faster loading in the browser.

这些通常是由优化工具生成的。您可以自己显式命名模块，但这会使模块的可移植性降低-如果将文件移动到另一个目录，则需要更改名称。通常最好避免为模块的名称编码，而让优化工具以模块名称的形式进行刻录。优化工具需要添加名称，以便一个文件中可以捆绑多个模块，以允许在浏览器中更快地加载。

#### Other Module Notes

**One module per file**: Only one module should be defined per JavaScript file, given the nature of the module name-to-file-path lookup algorithm. You should only use the optimization tool to group multiple modules into optimized files.

**每个文件一个模块**: 鉴于模块名称到文件路径查找算法的性质，每个 JavaScript 文件只能定义一个模块。您仅应使用优化工具将多个模块分组为优化文件。

**Relative module names inside define()**: For require("./relative/name") calls that can happen inside a define() function call, be sure to ask for "require" as a dependency, so that the relative name is resolved correctly:

**define()中的相对模块名**: 对于在 define（）函数调用中可能发生的 require（"./ relative/name"）调用，请务必要求"require"作为依赖项，以便解析相对名称正确地：

```javascript
define(['require', './relative/name'], function (require) {
	var mod = require('./relative/name')
})
```

Or better yet, use the shortened syntax that is available for use with translating CommonJS modules:

或更妙的是，使用可用于翻译 CommonJS 模块的缩短的语法：

```javascript
define(function (require) {
	var mod = require('./relative/name')
})
```

This form will use Function.prototype.toString() to find the require() calls, and add them to the dependency array, along with "require", so the code will work correctly with relative paths.

这种形式将使用 Function.prototype.toString（）查找 require（）调用，并将它们与"require"一起添加到依赖项数组中，因此代码可以在相对路径下正常工作。

Relative paths are really useful if you are creating a few modules inside a directory, so that you can share the directory with other people or other projects, and you want to be able to get a handle on the sibling modules in that directory without having to know the directory's name.

如果要在目录中创建一些模块，则相对路径非常有用，这样您就可以与其他人或其他项目共享目录，并且希望能够获得该目录中同级模块的句柄而不必知道目录的名称。

Relative module names are relative to other names, not paths: The loader stores modules by their name and not by their path internally. So for relative name references, those are resolved relative to the module name making the reference, then that module name, or ID, is converted to a path if needs to be loaded. Example code for a 'compute' package that has a 'main' and 'extras' modules in it:

相对模块名称相对于其他名称，而不是路径: 加载程序按模块名称而不是内部路径存储模块。因此，对于相对名称引用，相对于引用的模块名称进行解析，然后如果需要加载，则将该模块名称或 ID 转换为路径。其中具有"main"和"extras"模块的"compute"包的示例代码：

```
* lib/
    * compute/
        * main.js
        * extras.js
```

where the main.js module looks like this:

main.js 模块如下所示：

```javascript
define(['./extras'], function (extras) {
	//Uses extras in here.
})
```

If this was the paths config:

如果这是路径配置：

```javascript
require.config({
	baseUrl: 'lib',
	paths: {
		compute: 'compute/main',
	},
})
```

And a require(['compute']) is done, then lib/compute/main.js will have the module name of 'compute'. When it asks for './extras', that is resolved relative to 'compute', so 'compute/./extras', which normalizes to just 'extras'. Since there is no paths config for that module name, the path generated will be for 'lib/extras.js', which is incorrect.

并且 require(['compute'])做了，那么 LIB /计算/ main.js 将有"计算"的模块名称。当它要求"./extras"时，相对于"compute"可以解决，因此"compute /./ extras"将其标准化为"extras"。由于没有用于该模块名称的路径配置，因此生成的路径将用于"lib/extras.js"，这是不正确的。

For this case, packages config is a better option, since it allows setting the main module up as 'compute', but internally the loader will store the module with the ID of 'compute/main' so that the relative reference for './extras' works.

在这种情况下，packages config 是一个更好的选择，因为它允许将主模块设置为"compute"，但是在内部加载程序将以 ID"compute/main"存储该模块，以便"./演员的作品。

Another option is to construct a module at lib/compute.js that is just define(['./compute/main'], function(m) { return m; });, then there is no need for paths or packages config.

另一个选择是在 lib/compute.js 处构建一个模块 just define(['./compute/main'], function(m) { return m; });，那么就不需要路径或程序包配置了。

Or, do not set that paths or packages config and do the top level require call as require(['compute/main']).

或者，不要设置路径或程序包配置，并且不要在顶层要求调用 as require(['compute/main'])。

Generate URLs relative to module: You may need to generate an URL that is relative to a module. To do so, ask for "require" as a dependency and then use require.toUrl() to generate the URL:

生成相对于模块的 URL: 您可能需要生成相对于模块的 URL。为此，要求"require"作为依赖项，然后使用 require.toUrl（）生成 URL：

```javascript
define(['require'], function (require) {
	var cssUrl = require.toUrl('./style.css')
})
```

Console debugging: If you need to work with a module you already loaded via a require(["module/name"], function(){}) call in the JavaScript console, then you can use the require() form that just uses the string name of the module to fetch it:

控制台调试: 如果需要使用已经通过 require(["module/name"], function(){})JavaScript 控制台中的调用加载的模块，则可以使用 require（）表单，该表单仅使用模块的字符串名称来获取它：

```javascript
require('module/name').callSomeFunction()
```

Note this only works if "module/name" was previously loaded via the async version of require: require(["module/name"]). If using a relative path, like './module/name', those only work inside define

请注意，这仅在先前通过 require：的异步版本加载"模块/名称"时有效 require(["module/name"])。如果使用相对路径，例如"./module/name"，则这些仅在内部定义

#### Dependencies

If you define a circular dependency ("a" needs "b" and "b" needs "a"), then in this case when "b"'s module function is called, it will get an undefined value for "a". "b" can fetch "a" later after modules have been defined by using the require() method (be sure to specify require as a dependency so the right context is used to look up "a"):

如果定义循环依赖关系（"a"需要"b"，"b"需要"a"），则在这种情况下，当调用"b"的模块函数时，它将获得"a"的未定义值。在使用 require（）方法定义模块之后，"b"可以稍后获取"a"（请确保将 require 指定为依赖项，以便使用正确的上下文查找"a"）：

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

通常，您不需要使用 require（）来获取模块，而是依靠将模块作为参数传递给函数。循环依赖很少见，通常是您可能需要重新考虑设计的信号。但是，有时需要它们，在这种情况下，请使用上面指定的 require（）。

If you are familiar with CommonJS modules, you could instead use exports to create an empty object for the module that is available immediately for reference by other modules. By doing this on both sides of a circular dependency, you can then safely hold on to the the other module. This only works if each module is exporting an object for the module value, not a function:

如果您熟悉 CommonJS 模块，则可以使用导出为该模块创建一个空对象，该空对象可立即供其他模块引用。通过在循环依赖关系的两侧执行此操作，然后可以安全地保留另一个模块。仅当每个模块都为模块值而不是函数导出对象时，此方法才有效：

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

或者，如果您使用的是依赖项数组方法，则要求特殊的 "exports"依赖项：

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

JSONP 是使用 JavaScript 调用某些服务的一种方式。它跨域工作，并且是一种仅通过脚本标签仅需要 HTTP GET 即可调用服务的既定方法。

To use a JSONP service in RequireJS, specify "define" as the callback parameter's value. This means you can get the value of a JSONP URL as if it was a module definition.

要在 RequireJS 中使用 JSONP 服务，请指定"define"作为回调参数的值。这意味着您可以获得 JSONP URL 的值，就好像它是模块定义一样。

Here is an example that calls a JSONP API endpoint. In this example, the JSONP callback parameter is called "callback", so "callback=define" tells the API to wrap the JSON response in a "define()" wrapper:

这是一个调用 JSONP API 端点的示例。在此示例中，JSONP 回调参数称为"callback"，因此"callback = define"告诉 API 将 JSON 响应包装在"define（）"包装器中：

```javascript
require(['http://example.com/api/data.json?callback=define'], function (data) {
	//The data object will be the API response for the
	//JSONP data call.
	console.log(data)
})
```

This use of JSONP should be limited to JSONP services for initial application setup. If the JSONP service times out, it means other modules you define via define() may not get executed, so the error handling is not robust.

JSONP 的这种使用应限于初始应用程序设置的 JSONP 服务。如果 JSONP 服务超时，则意味着可能无法执行通过 define（）定义的其他模块，因此错误处理不可靠。

Only JSONP return values that are JSON objects are supported. A JSONP response that is an array, a string or a number will not work.

仅支持作为 JSON 对象的 JSONP 返回值.数组，字符串或数字的 JSONP 响应将不起作用。

This functionality should not be used for long-polling JSONP connections -- APIs that deal with real time streaming. Those kinds of APIs should do more script cleanup after receiving each response, and RequireJS will only fetch a JSONP URL once -- subsequent uses of the same URL as a dependency in a require() or define() call will get a cached value.

此函数不应用于长轮询 JSONP 连接-用于处理实时流的 API。这类 API 在收到每个响应后应该执行更多的脚本清理工作，并且 RequireJS 仅会提取一次 JSONP URL-随后将相同的 URL 作为 require（）或 define（）调用中的依赖项使用，将获得一个缓存的值。

Errors in loading a JSONP service are normally surfaced via timeouts for the service, since script tag loading does not give much detail into network problems. To detect errors, you can override requirejs.onError() to get errors. There is more information in the Handling Errors section.

加载 JSONP 服务的错误通常会通过该服务的超时而浮出水面，因为脚本标记加载不会为网络问题提供太多详细信息。要检测错误，可以重写 requirejs.onError（）以获取错误。在"处理错误"部分中有更多信息。

#### Undefining a Module

There is a global function, requirejs.undef(), that allows undefining a module. It will reset the loader's internal state to forget about the previous definition of the module.

有一个全局函数 requirejs.undef（），它允许取消定义模块。它将重置加载程序的内部状态，以忽略模块的先前定义。

However, it will not remove the module from other modules that are already defined and got a handle on that module as a dependency when they executed. So it is really only useful to use in error situations when no other modules have gotten a handle on a module value, or as part of any future module loading that may use that module. See the errback section for an example.

但是，它将不会从其他已定义的模块中删除该模块，并且在执行时会将该模块作为依赖项获得该模块的句柄。因此，只有在没有其他模块都无法处理该模块值的错误情况下使用它，或者作为将来可能使用该模块的模块加载的一部分，它才真正有用。有关示例，请参见 errback 部分。

If you want to do more sophisticated dependency graph analysis for undefining work, the semi-private onResourceLoad API may be helpful.

如果要进行更复杂的依赖关系图分析以进行未定义的工作，则半私有的 onResourceLoad API 可能会有所帮助。

### MECHANICS

RequireJS loads each dependency as a script tag, using head.appendChild().

RequireJS 使用 head.appendChild（）将每个依赖项作为脚本标签加载。

RequireJS waits for all dependencies to load, figures out the right order in which to call the functions that define the modules, then calls the module definition functions once the dependencies for those functions have been called. Note that the dependencies for a given module definition function could be called in any order, due to their sub-dependency relationships and network load order.

RequireJS 等待所有依赖项加载，找出正确的顺序来调用定义模块的函数，然后在调用这些函数的依赖项后调用模块定义函数。请注意，由于给定模块定义函数的子依赖关系和网络负载顺序，可以按任何顺序调用它们的依赖关系。

Using RequireJS in a server-side JavaScript environment that has synchronous loading should be as easy as redefining require.load(). The build system does this, the require.load method for that environment can be found in build/jslib/requirePatch.js.

在具有同步加载的服务器端 JavaScript 环境中使用 RequireJS 就像重新定义 require.load（）一样容易。构建系统会执行此操作，可以在 build/jslib/requirePatch.js 中找到该环境的 require.load 方法。

In the future, this code may be pulled into the require/ directory as an optional module that you can load in your env to get the right load behavior based on the host environment.

将来，此代码可能作为可选模块被拉入 require /目录，您可以在环境中加载该模块以根据主机环境获得正确的加载行为。

### CONFIGURATION OPTIONS

When using require() in the top-level HTML page (or top-level script file that does not define a module), a configuration object can be passed as the first option:

在顶层 HTML 页面（或未定义模块的顶层脚本文件）中使用 require（）时，可以将配置对象作为第一个选项传递：

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

您也可以从数据主入口点调用 require.config ，但是请注意，数据主脚本是异步加载的。避免使用其他入口点脚本，这些脚本错误地假定 data-main 及其 require.config 将始终在脚本加载之前执行。

Also, you can define the config object as the global variable require before require.js is loaded, and have the values applied automatically. This example specifies some dependencies to load as soon as require.js defines require():

另外，可以 require 在加载 require.js 之前将 config 对象定义为全局变量，并自动应用值。此示例指定了一些要在 require.js 定义 require（）时加载的依赖项：

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

注意: 最好使用 var require = {}并且不要使用 window.require = {}，它将在 IE 中无法正确运行。

There are some patterns for separating the config from main module loading.

这有一些从主模块加载中分离配置的模式

Supported configuration options:

支持的配置项：

**baseUrl**: the root path to use for all module lookups. So in the above example, "my/module"'s script tag will have a src="/another/path/my/module.js". baseUrl is not used when loading plain .js files (indicated by a dependency string starting with a slash, has a protocol, or ends in .js), those strings are used as-is, so a.js and b.js will be loaded from the same directory as the HTML page that contains the above snippet.

If no baseUrl is explicitly set in the configuration, the default value will be the location of the HTML page that loads require.js. If a data-main attribute is used, that path will become the baseUrl.

The baseUrl can be a URL on a different domain as the page that will load require.js. RequireJS script loading works across domains. The only restriction is on text content loaded by text! plugins: those paths should be on the same domain as the page, at least during development. The optimization tool will inline text! plugin resources so after using the optimization tool, you can use resources that reference text! plugin resources from another domain.

**baseUrl**: 用于所有模块查找的根路径。因此，在上面的示例中，"my/module"的脚本标签将具有 src ="/another/path/my/module.js"。是的 baseUrl 不装入普通.js 文件时使用的（由一个依赖字符串指示开始以斜线，具有协议，或在端部的.js），这些字符串被原样使用，所以 a.js 和 b.js 将从与包含上述代码段的 HTML 页面相同的目录中加载。

如果在配置中未显式设置 baseUrl，则默认值将是加载 require.js 的 HTML 页面的位置。如果使用 data-main 属性，则该路径将成为 baseUrl。

baseUrl 可以是与将加载 require.js 的页面不同的域上的 URL。RequireJS 脚本加载跨域工作。唯一的限制是文本加载的文本内容！插件：至少在开发过程中，这些路径应与页面位于同一域。优化工具将内联文本！插件资源，因此在使用优化工具后，您可以使用引用文本的资源！来自另一个域的插件资源。

**paths**: path mappings for module names not found directly under baseUrl. The path settings are assumed to be relative to baseUrl, unless the paths setting starts with a "/" or has a URL protocol in it ("like http:"). Using the above sample config, "some/module"'s script tag will be src="/another/path/some/v1.0/module.js".

The path that is used for a module name should not include an extension, since the path mapping could be for a directory. The path mapping code will automatically add the .js extension when mapping the module name to a path. If require.toUrl() is used, it will add the appropriate extension, if it is for something like a text template.

When run in a browser, paths fallbacks can be specified, to allow trying a load from a CDN location, but falling back to a local location if the CDN location fails to load.

**paths** ：在 baseUrl 的正下方找不到模块名称的路径映射。除非路径设置以"/"开头或其中包含 URL 协议（例如"http："），否则假定该路径设置相对于 baseUrl。使用上面的示例配置，"some/module"的脚本标签将为 src ="/another/path/some/v1.0/module.js"。

被用于模块名称应该路径不包括扩展名，因为 path 映射可能是一个目录。当将模块名称映射到路径时，路径映射代码将自动添加.js 扩展名。如果使用了 require.toUrl（），它将添加适当的扩展名（如果用于文本模板）。

在浏览器中运行时，可以指定路径回退，以允许尝试从 CDN 位置进行加载，但是如果 CDN 位置无法加载，则回退到本地位置。

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

该配置指出：模块"main"，"util"，"text"和"text！template.html"将通过加载模块 ID"primary"来找到。可以通过加载模块 ID"secondary"来找到模块 ​​"text！secondary.html"。

This only sets up where to find a module inside a script that has multiple define()'d modules in it. It does not automatically bind those modules to the bundle's module ID. The bundle's module ID is just used for locating the set of modules.

这仅设置了在脚本中包含多个 define（）模块的模块中查找模块的位置。它不会自动将那些模块绑定到捆绑软件的模块 ID。捆绑软件的模块 ID 仅用于查找模块集。

Something similar is possible with paths config, but it is much wordier, and the paths config route does not allow loader plugin resource IDs in its configuration, since the paths config values are path segments, not IDs.

使用 path config 可能会发生类似的事情，但是它要复杂得多，并且 path config 路由不允许在其配置中使用加载程序插件资源 ID，因为 path config 的值是路径段而不是 ID。

bundles config is useful if doing a build and that build target was not an existing module ID, or if you have loader plugin resources in built JS files that should not be loaded by the loader plugin. Note that the keys and values are module IDs, not path segments. They are absolute module IDs, not a module ID prefix like paths config or map config. Also, bundle config is different from map config in that map config is a one-to-one module ID relationship, where bundle config is for pointing multiple module IDs to a bundle's module ID.

如果执行构建并且该构建目标不是现有的模块 ID，或者如果已构建的 JS 文件中包含不应由加载程序插件加载的加载程序插件资源，则 bundles config 很有用。请注意，键和值是模块 ID，而不是路径段。它们是绝对模块 ID，而不是像 path config 或 map config 这样的模块 ID 前缀。另外，bundle config 与 map config 的不同之处在于 map config 是一对一的模块 ID 关系，其中 bundle config 用于将多个模块 ID 指向 bundle 的模块 ID。

As of RequireJS 2.2.0, the optimizer can generate the bundles config and insert it into the top level requirejs.config() call. See the bundlesConfigOutFile build config option for more details.

从 RequireJS 2.2.0 开始，优化器可以生成 bundle config 并将其插入到顶层 requirejs.config（）调用中。有关更多详细信息，请参见 bundlesConfigOutFile 构建配置选项。

**shim**: Configure the dependencies, exports, and custom initialization for older, traditional "browser globals" scripts that do not use define() to declare the dependencies and set a module value.

shim: 为不使用 define（）声明依赖关系和设置模块值的较旧的传统"浏览器全局变量"脚本配置依赖关系，导出和自定义初始化。

Here is an example. It requires RequireJS 2.1.0+, and assumes backbone.js, underscore.js and jquery.js have been installed in the baseUrl directory. If not, then you may need to set a paths config for them:

这是一个例子。它需要 RequireJS 2.1.0+，并假定在 baseUrl 目录中已安装了 ribs.js，underscore.js 和 jquery.js。如果没有，那么您可能需要为它们设置路径配置：

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

在 RequireJS 2.0。\*中，shim 配置中的"exports"属性可能是函数而不是字符串。在这种情况下，它的函数与上述"init"属性相同。"init"模式在 RequireJS 2.1.0+中使用，因此 exports 可以将字符串值用于 forceDefine，但是一旦已知已加载库，就可以进行函数工作。

For "modules" that are just jQuery or Backbone plugins that do not need to export any module value, the shim config can just be an array of dependencies:

对于只是 jQuery 或 Backbone 插件的"模块"，不需要导出任何模块值，shim 配置可以只是一个依赖项数组：

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
但是请注意，如果要在 IE 中进行 404 负载检测，以便可以使用路径回退或 errbacks，则应提供字符串输出值，以便加载程序可以检查脚本是否实际加载（init 的返回不用于 enforceDefine 检查）：

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

"shim"配置的重要说明：

- The shim config only sets up code relationships. To load modules that are part of or use shim config, a normal require/define call is needed. Setting shim by itself does not trigger code to load.

shim 配置仅设置代码关系。要加载属于 shim config 或使用 shim config 的模块，需要一个正常的 require/define 调用。本身设置填充程序不会触发代码加载。

- Only use other "shim" modules as dependencies for shimmed scripts, or AMD libraries that have no dependencies and call define() after they also create a global (like jQuery or lodash). Otherwise, if you use an AMD module as a dependency for a shim config module, after a build, that AMD module may not be evaluated until after the shimmed code in the build executes, and an error will occur. The ultimate fix is to upgrade all the shimmed code to have optional AMD define() calls.

只使用其他 shim 模块作为 shimmed 脚本模块的依赖项，或者 那些没有依赖项的 AMD 库并在他们创建全局(例如 jQuery 或者 lodash)后调用 define().否则，如果你使用一个 AMD 模块作为 shim 配置模块的依赖 ，在构建之后，那个 AMD 模块可能直到构建中的 shimmed 代码被执行以后才会被评估，并且一会出现错误。最终的解决方案是升级所有的 shimmed 代码来使得可选的 AMD define() 调用。

- If it is not possible to upgrade the shimmed code to use AMD define() calls, as of RequireJS 2.1.11, the optimizer has a wrapShim build option that will try to automatically wrap the shimmed code in a define() for a build. This changes the scope of shimmed dependencies, so it is not guaranteed to always work, but, for example, for shimmed dependencies that depend on an AMD version of Backbone, it can be helpful.

从 RequireJS 2.1.11 开始，如果无法升级填充代码以使用 AMD define（）调用，则优化器具有 wrapShim 构建选项，该选项将尝试自动将填充代码包装在 define（）中以进行构建。这会更改填充的依赖项的范围，因此不能保证始终起作用，但是，例如，对于依赖于 AMD 版本的 Backbone 的填充的依赖项，它可能会有所帮助。

如果不能升级 shimmed 代码来使用 AMD define()调用，从 RequireJS 2.1.11 开始，这个优化器有一个 wrapShim 构建选项，他会尝试自动将 shimmed 代码 包装在一个 define() 中去构建。这改变了 shimmed 依赖项的范围，因此它不能确保总是工作，例如，对于依赖于一个 AMD 的版本的 Backbone 的 shimmed 依赖，他是有用的。

- The init function will not be called for AMD modules. For example, you cannot use a shim init function to call jQuery's noConflict. See Mapping Modules to use noConflict for an alternate approach to jQuery.

对于 AMD 模块，不会调用 init 函数。例如，您不能使用 shim init 函数来调用 jQuery 的 noConflict。请参阅映射模块以将 noConflict 用于 jQuery 的替代方法。

- Shim config is not supported when running AMD modules in node via RequireJS (it works for optimizer use though). Depending on the module being shimmed, it may fail in Node because Node does not have the same global environment as browsers. As of RequireJS 2.1.7, it will warn you in the console that shim config is not supported, and it may or may not work. If you wish to suppress that message, you can pass requirejs.config({ suppress: { nodeShim: true }});.

通过 RequireJS 在 Node 中运行 AMD 模块时，不支持 Shim config（尽管它可用于优化程序）。取决于要填充的模块，它可能在 Node 中失败，因为 Node 与浏览器没有相同的全局环境。从 RequireJS 2.1.7 开始，它将在控制台中警告您不支持 shim config，并且它可能会或可能不会起作用。如果您希望隐藏该消息，则可以通过 requirejs.config({ suppress: { nodeShim: true }});。

Important optimizer notes for "shim" config:

“shim”配置的重要优化注意事项:

- You should use the mainConfigFile build option to specify the file where to find the shim config. Otherwise the optimizer will not know of the shim config. The other option is to duplicate the shim config in the build profile.

您应该使用 mainConfigFile 构建选项来指定可在其中找到垫片配置的文件。否则，优化程序将不了解填充程序配置。另一个选项是在构建配置文件中复制填充程序配置。

- Do not mix CDN loading with shim config in a build. Example scenario: you load jQuery from the CDN but use the shim config to load something like the stock version of Backbone that depends on jQuery. When you do the build, be sure to inline jQuery in the built file and do not load it from the CDN. Otherwise, Backbone will be inlined in the built file and it will execute before the CDN-loaded jQuery will load. This is because the shim config just delays loading of the files until dependencies are loaded, but does not do any auto-wrapping of define. After a build, the dependencies are already inlined, the shim config cannot delay execution of the non-define()'d code until later. define()'d modules do work with CDN loaded code after a build because they properly wrap their source in define factory function that will not execute until dependencies are loaded. So the lesson: shim config is a stop-gap measure for non-modular code, legacy code. define()'d modules are better.

不要在构建中将 CDN 加载与 shim config 混合使用。示例方案：从 CDN 加载 jQuery，但使用 shim 配置加载类似于 jQuery 的 Backbone 的普通版本。在执行构建时，请确保在内建文件中内联 jQuery，并且不要从 CDN 加载它。否则，Backbone 将内联到生成的文件中，并在 CDN 加载的 jQuery 加载之前执行。这是因为 shim config 只是延迟文件的加载，直到加载依赖项为止，但不对 define 进行任何自动包装。构建后，依赖关系已经内联，shim 配置无法将 non-define（）代码的执行推迟到以后。限定（）' d 模块在构建后确实可以处理 CDN 加载的代码，因为它们将其源代码正确包装在 define factory 函数中，只有在加载依赖项后才能执行。因此，课程：shim config 是非模块化代码，传统代码的权宜之计。define（）的模块更好。

- For local, multi-file builds, the above CDN advice also applies. For any shimmed script, its dependencies must be loaded before the shimmed script executes. This means either building its dependencies directly in the buid layer that includes the shimmed script, or loading its dependencies with a require([], function (){}) call, then doing a nested require([]) call for the build layer that has the shimmed script.

对于本地的多文件构建，上述 CDN 建议也适用。对于任何匀场脚本，必须在匀场脚本执行之前加载其依赖项。这意味着要么直接在包含填充脚本的 buid 层中构建其依赖项，要么通过 require([], function (){})调用加载其依赖项，然后 require([])对具有填充脚本的构建层进行嵌套调用。

- If you are using uglifyjs to minify the code, do not set the uglify option toplevel to true, or if using the command line do not pass -mt. That option mangles the global names that shim uses to find exports.

如果您使用 uglifyjs 缩小代码，请不要将 uglify 选项设置 toplevel 为 true，或者如果使用命令 行不通过-mt。该选项会破坏 shim 用于查找出口的全局名称。

**map**: For the given module prefix, instead of loading the module with the given ID, substitute a different module ID.

**map**： 对于给定的模块前缀，而不是使用给定的 ID 加载模块，而是使用其他模块 ID。

This sort of capability is really important for larger projects which may have two sets of modules that need to use two different versions of 'foo', but they still need to cooperate with each other.

这种函数对于大型项目而言非常重要，因为大型项目可能有两组模块需要使用两个不同的'foo'版本，但是它们仍然需要彼此合作。

This is not possible with the context-backed multiversion support. In addition, the paths config is only for setting up root paths for module IDs, not for mapping one module ID to another one.

使用上下文支持的多版本支持是不可能的。另外，路径配置仅用于设置模块 ID 的根路径，而不用于将一个模块 ID 映射到另一个模块。

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

当 'some/newmodule' 做  `require('foo')` 时候，它将获得 foo1.2.js 文件，而当 'some/oldmodule' 做`require('foo')`时候，它将获得 foo1.0.js 文件

This feature only works well for scripts that are real AMD modules that call define() and register as anonymous modules. Also, only use absolute module IDs for map config. Relative IDs (like '../some/thing') do not work.

该函数仅适用于调用了 define（）并注册为匿名模块的真实 AMD 模块的脚本。另外，仅对映射配置使用绝对模块 ID。相对 ID（如'../some/thing'）不起作用。

There is also support for a "\*" map value which means "for all modules loaded, use this map config". If there is a more specific map config, that one will take precedence over the star config. Example:

还支持"\*"映射值，这意味着"对于所有加载的模块，请使用此映射配置"。如果有更具体的地图配置，则该配置优先于星型配置。例：

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

表示对于除"some/oldmodule"以外的任何模块，当需要"foo"时，请改用"foo1.2"。仅对于"some/oldmodule"，当要求"foo"时使用"foo1.0"。

Note: when doing builds with map config, the map config needs to be fed to the optimizer, and the build output must still contain a requirejs config call that sets up the map config. The optimizer does not do ID renaming during the build, because some dependency references in a project could depend on runtime variable state. So the optimizer does not invalidate the need for a map config after the build.

注意: 使用 map config 进行构建时，需要将 map config 馈送到优化器，并且 build 输出必须仍然包含 requirejs config 调用来设置 map config。优化器在构建期间不会进行 ID 重命名，因为项目中的某些依赖项引用可能取决于运行时变量状态。因此，优化器不会在构建后使对映射配置的需求无效。

config: There is a common need to pass configuration info to a module. That configuration info is usually known as part of the application, and there needs to be a way to pass that down to a module. In RequireJS, that is done with the config option for requirejs.config(). Modules can then read that info by asking for the special dependency "module" and calling module.config(). Example:

config：通常需要将配置信息传递给模块。该配置信息通常被称为应用程序的一部分，并且需要一种将其传递给模块的方法。在 RequireJS 中，这是通过 requirejs.config（）的 config 选项完成的。然后，模块可以通过请求特殊的依赖项"模块"并调用 module.config（）来读取该信息。例：

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

要将 config 传递给软件包，请以软件包中的主模块为目标，而不是软件包 ID 为目标：

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

**packages**: 配置来自 CommonJS 包的加载模块。请参阅软件包主题以获取更多信息。

**nodeIdCompat**: Node treats module ID example.js and example the same. By default these are two different IDs in RequireJS. If you end up using modules installed from npm, then you may need to set this config value to true to avoid resolution issues. This option only applies to treating the ".js" suffix differently, it does not do any other node resolution and evaluation matching such as .json file handling (JSON handling needs a 'json!' loader plugin anyway). Available in 2.1.10 and greater.

**nodeIdCompat**： Node 治疗模块 IDexample.js 和 example 相同的。默认情况下，这是 RequireJS 中的两个不同 ID。如果最终使用的是从 npm 安装的模块，则可能需要设置此配置值 true 以避免出现解析问题。此选项仅适用于以不同方式处理".js"后缀，它不执行任何其他 Node 解析和评估匹配，例如.json 文件处理（JSON 处理仍然需要"json！"加载程序插件）。在 2.1.10 及更高版本中可用。

**waitSeconds**: The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.

**waitSeconds**：放弃放弃加载脚本之前要等待的秒数。将其设置为 0 将禁用超时。默认值为 7 秒。

**context**: A name to give to a loading context. This allows require.js to load multiple versions of modules in a page, as long as each top-level require call specifies a unique context string. To use it correctly, see the Multiversion Support section.

**context**: 赋予加载上下文的名称。只要每个顶级 require 调用指定一个唯一的上下文字符串，这都允许 require.js 在页面中加载模块的多个版本。要正确使用它，请参阅"Multiversion 支持"部分。

**deps**: An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration. It does not block any other require() calls from starting their requests for modules, it is just a way to specify some modules to load asynchronously as part of a config block.

**deps**: 要加载的依赖项数组。当在 require.js 加载之前将 require 定义为配置对象时，并且您要指定要在 require（）定义后立即加载的依赖项时，此选项很有用。使用 deps 就像进行 require([])调用一样，但是在加载程序处理完配置后立即使用。它不会阻止 其他任何 require（）调用启动对模块的请求，它只是指定某些模块作为 config 块的一部分异步加载的一种方法。

**callback**: A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's deps array has been loaded.

**callback**: 加载 deps 后执行的函数。在将 require.js 加载之前，将 require 定义为配置对象，并且您希望在加载配置的 deps 数组后指定要使用的函数时，此选项很有用。

**enforceDefine**: If set to true, an error will be thrown if a script loads that does not call define() or have a shim exports string value that can be checked. See Catching load failures in IE for more information.

**enforceDefine**: 设置为 true 时，如果加载的脚本未调用 define（）或具有可检查的填充程序导出字符串值，则将引发错误。有关更多信息，请参见在 IE 中捕获负载故障。

**xhtml**: If set to true, document.createElementNS() will be used to create script elements.

**xhtml**: 如果设置为 true，则 document.createElementNS（）将用于创建脚本元素。

**urlArgs**: Extra query string arguments appended to URLs that RequireJS uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example cache bust setting for urlArgs:

**urlArgs**: 附加到 RequireJS 用于获取资源的 URL 的附加查询字符串参数。当浏览器或服务器配置不正确时，最有用的方法是缓存崩溃。urlArgs 的高速缓存半身设置示例：

```javascript
urlArgs: 'bust=' + new Date().getTime()
```

As of RequireJS 2.2.0, urlArgs can be a function. If a function, it will receive the module ID and the URL as parameters, and it should return a string that will be added to the end of the URL. Return an empty string if no args. Be sure to take care of adding the '?' or '&' depending on the existing state of the URL. Example:

从 RequireJS 2.2.0 开始，urlArgs 可以是一个函数。如果是函数，它将接收模块 ID 和 URL 作为参数，并且应返回将添加到 URL 末尾的字符串。如果没有参数，则返回一个空字符串。请务必注意添加"？" 或"＆"（取决于 URL 的现有状态）。例：

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

在开发过程中，使用它可能会很有用，但是请确保在部署代码之前将其删除。

**scriptType**: Specify the value for the type="" attribute used for script tags inserted into the document by RequireJS. Default is "text/javascript". To use Firefox's JavaScript 1.8 features, use "text/javascript;version=1.8".

**scriptType**: 指定 type =""属性的值，该属性用于 RequireJS 插入文档中的脚本标签。默认值为"文本/ javascript"。要使用 Firefox 的 JavaScript 1.8 函数，请使用"text/javascript; version = 1.8"。

**skipDataMain**: Introduced in RequireJS 2.1.9: If set to true, skips the data-main attribute scanning done to start module loading. Useful if RequireJS is embedded in a utility library that may interact with other RequireJS library on the page, and the embedded version should not do data-main loading.

**skipDataMain**：在 RequireJS 2.1.9 中引入：如果设置为 true，则跳过对数据主属性的扫描以开始加载模块。如果 RequireJS 嵌入在可以与页面上的其他 RequireJS 库进行交互的实用程序库中，并且嵌入的版本不应进行数据主加载，则很有用。

### ADVANCED USAGE

#### Loading Modules from Packages

RequireJS supports loading modules that are in a CommonJS Packages directory structure, but some additional configuration needs to be specified for it to work. Specifically, there is support for the following CommonJS Packages features:

RequireJS 支持加载 CommonJS Packages 目录结构中的模块，但是需要指定一些其他配置才能使其正常工作。具体来说，它支持以下 CommonJS Packages 函数：

- A package can be associated with a module name/prefix.
- The package config can specify the following properties for a specific package:
  - name: The name of the package (used for the module name/prefix mapping)
  - location: The location on disk. Locations are relative to the baseUrl configuration value, unless they contain a protocol or start with a front slash (/).
  - main: The name of the module inside the package that should be used when someone does a require for "packageName". The default value is "main", so only \* specify it if it differs from the default. The value is relative to the package folder.

* 包可以与模块名称/前缀关联。
* 程序包配置可以为特定程序包指定以下属性：
  - name: 包的名称（用于模块名称/前缀映射）
  - location: 磁盘上的位置。位置相对于 baseUrl 配置值，除非它们包含协议或以反斜杠（/）开头。
  * main：某人对"packageName"的要求时应使用的包装内部模块的名称。默认值为"main"，因此仅当它不同于默认值时才指定它。该值相对于包文件夹。

##### IMPORTANT NOTES

- While the packages can have the CommonJS directory layout, the modules themselves should be in a module format that RequireJS can understand. Exception to the rule: if you are using the r.js Node adapter, the modules can be in the traditional CommonJS module format. You can use the CommonJS converter tool if you need to convert traditional CommonJS modules into the async module format that RequireJS uses.

* 尽管软件包可以具有 CommonJS 目录布局，但模块本身应采用 RequireJS 可以理解的模块格式。规则的例外：如果使用 r.jsNode 适配器，则模块可以采用传统的 CommonJS 模块格式。如果需要将传统的 CommonJS 模块转换为 RequireJS 使用的异步模块格式，则可以使用 CommonJS 转换工具。

* Only one version of a package can be used in a project context at a time. You can use RequireJS multiversion support to load two different module contexts, but if you want to use Package A and B in one context and they depend on different versions of Package C, then that will be a problem. This may change in the future.

* 一次只能在项目上下文中使用软件包的一个版本。您可以使用 RequireJS 多版本支持来加载两个不同的模块上下文，但是如果您想在一个上下文中使用程序包 A 和 B，并且它们依赖于程序包 C 的不同版本，那么这将是一个问题。将来可能会改变。

If you use a similar project layout as specified in the Start Guide, the start of your web project would look something like this (Node/Rhino-based projects are similar, just use the contents of the scripts directory as the top-level project directory):

如果您使用《入门指南》中指定的类似项目布局，则 Web 项目的开始将看起来像这样（基于 Node/Rhino 的项目是类似的，只需使用 scripts 目录的内容作为顶级项目目录）：

```
project-directory/
	project.html
	scripts/
		require.js
```

Here is how the example directory layout looks with two packages, cart and store:

这是带有两个包 cart 和 store 的示例目录布局的外观：

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

这将指示 require.js 加载脚本/main.js。main.js 使用"packages"配置来设置相对于 require.js 的软件包，在这种情况下，它们是源软件包"cart"和"store"：

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

"cart"的需求意味着它将从 scripts/cart/main.js 加载，因为"main"是 RequireJS 支持的默认主模块设置。将从 scripts/store/util.js 加载"store/util"的需求。

If the "store" package did not follow the "main.js" convention, and looked more like this:

如果"store"包未遵循"main.js"约定，则看起来更像这样：

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

为避免冗长，强烈建议始终使用在其结构中使用"主要"约定的软件包。

#### Multiversion Support

As mentioned in Configuration Options, multiple versions of a module can be loaded in a page by using different "context" configuration options. require.config() returns a require function that will use the context configuration. Here is an example that loads two different versions of the alpha and beta modules (this example is taken from one of the test files):

如配置选项中所述，可以使用不同的"上下文"配置选项将模块的多个版本加载到页面中。require.config（）返回一个使用上下文配置的 require 函数。这是加载两个不同版本的 alpha 和 beta 模块的示例（此示例摘自一个测试文件）：

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

注意，"require"被指定为模块的依赖项。这允许传递给函数回调的 require（）函数使用正确的上下文正确加载模块以支持多版本。如果未将"require"指定为依赖项，则可能会出现错误。

#### Loading Code After Page Load

The example above in the Multiversion Support section shows how code can later be loaded by nested require() calls.

上面"Multiversion 支持"部分中的示例显示了以后如何通过嵌套的 require（）调用来加载代码。

#### Web Worker Support

As of release 0.12, RequireJS can be run inside a Web Worker. Just use importScripts() inside a web worker to load require.js (or the JS file that contains the require() definition), then call require.

从 0.12 版开始，RequireJS 可以在 Web Worker 中运行。只需在网络工作者中使用 importScripts（）来加载 require.js（或包含 require（）定义的 JS 文件），然后调用 require。

You will likely need to set the baseUrl configuration option to make sure require() can find the scripts to load.

您可能需要设置 baseUrl 配置选项，以确保 require（）可以找到要加载的脚本。

You can see an example of its use by looking at one of the files used in the unit test.

通过查看单元测试中使用的文件之一，可以看到其用法示例。

#### Rhino Support

RequireJS can be used in Rhino via the r.js adapter. See the r.js README for more information.

RequireJS 可以通过 r.js 适配器在 Rhino 中使用。有关更多信息，请参见 r.js 自述文件。

#### Nashorn Support

As of RequireJS 2.1.16, RequireJS can be used in Nashorn, Java 8+'s JavaScript engine, via the r.js adapter. See the r.js README for more information.

从 RequireJS 2.1.16 开始，RequireJS 可以通过 r.js 适配器在 Java 8+的 JavaScript 引擎 Nashorn 中使用。有关更多信息，请参见 r.js 自述文件。

#### Handling Errors

The general class of errors are 404s for scripts (not found), network timeouts or errors in the scripts that are loaded. RequireJS has a few tools to deal with them: require-specific errbacks, a "paths" array config, and a global requirejs.onError.

错误的一般类别是脚本（未找到）的 404，网络超时或加载的脚本中的错误。RequireJS 有一些用于处理它们的工具：特定于需求的 errback，"paths"数组配置以及全局的 requirejs.onError。

The error object passed to errbacks and the global requirejs.onError function will usually contain two custom properties:

传递给 errbacks 的错误对象和全局 requirejs.onError 函数通常将包含两个自定义属性：

- requireType: A string value with a general classification, like "timeout", "nodefine", "scripterror".

* requireModules: an array of module names/URLs that timed out.

* requireType: 具有一般分类的字符串值，例如"timeout"，"nodefine"，"scripterror"。
* requireModules： 超时的模块名称/ URL 的数组。

If you get an error with a requireModules, it probably means other modules that depend on the modules in that requireModules array are not defined.

如果您在 requireModules 中遇到错误，则可能意味着未定义依赖于 requireModules 数组中模块的其他模块。

#### Catching load failures in IE

Internet Explorer has a set of problems that make it difficult to detect load failures for errbacks/paths fallbacks:

Internet Explorer 存在一系列问题，使得难以检测到错误/路径后备的加载失败：

- script.onerror does not work in IE 6-8. There is no way to know if loading a script generates a 404, worse, it triggers the onreadystatechange with a complete state even in a 404 case.

* script.onerror does work in IE 9+, but it has a bug where it does not fire script.onload event handlers right after execution of script, so it cannot support the standard method of allowing anonymous AMD modules. So script.onreadystatechange is still used. However, onreadystatechange fires with a complete state before the script.onerror function fires.

* script.onerror 在 IE 6-8 中不起作用。无法知道加载脚本是否会生成 404，更糟糕的是，即使在 404 情况下，它也会以完整状态触发 onreadystatechange。
* script.onerror 确实可以在 IE 9+中运行，但存在一个错误，即在执行脚本后不立即触发 script.onload 事件处理程序，因此它不支持允许匿名 AMD 模块的标准方法。因此仍使用 script.onreadystatechange。但是，在 script.onerror 函数启动之前，onreadystatechange 会以完整状态启动。

So it is very difficult with IE to allow both anonymous AMD modules, which are a core benefit of AMD modules, and reliable detect errors.

因此，使用 IE 很难同时允许匿名的 AMD 模块和可靠的检测错误，匿名的 AMD 模块是 AMD 模块的核心优势。

However, if you are in a project that you know uses define() to declare all of its modules, or it uses the shim config to specify string exports for anything that does not use define(), then if you set the enforceDefine config value to true, the loader can confirm if a script load by checking for the define() call or the existence of the shim's exports global value.

但是，如果您知道在一个项目中使用 define（）声明其所有模块，或者它使用 shim config 为不使用 define（）的任何内容指定字符串导出，那么如果您设置了 defineDefine 配置值确实，加载器可以通过检查 define（）调用或填充程序的导出全局值的存在来确认脚本是否已加载。

So if you want to support Internet Explorer, catch load errors, and have modular code either through direct define() calls or shim config, always set enforceDefine to be true. See the next section for an example.

因此，如果要支持 Internet Explorer，捕获负载错误并通过直接 define（）调用或 shim config 获得模块化代码，请始终将 forcedDefine 设置为 true。有关示例，请参见下一部分。

NOTE: If you do set enforceDefine: true, and you use data-main="" to load your main JS module, then that main JS module must call define() instead of require() to load the code it needs. The main JS module can still call require/requirejs to set config values, but for loading modules it should use define().

注意: 如果您确实设置了 forceDefine：true，并且使用 data-main =""来加载主 JS 模块，则该主 JS 模块必须调用 define（）而不是 require（）来加载所需的代码。JS 主模块仍然可以调用 require/requirejs 来设置配置值，但是对于加载模块，它应该使用 define（）。

If you then also use almond to build your code without require.js, be sure to use the insertRequire build setting to insert a require call for the main module -- that serves the same purpose of the initial require() call that data-main does.

如果然后还使用 almond 来构建没有 require.js 的代码，请确保使用 insertRequire 构建设置为主模块插入一个 require 调用-达到与最初的 require（）调用相同的目的，即调用 data-main 做。

#### require([]) errbacks

**Errbacks**, when used with requirejs.undef(), will allow you to detect if a module fails to load, undefine that module, reset the config to a another location, then try again.

当与 requirejs.undef（）一起使用时，**Errbacks** 将允许您检测模块是否无法加载，取消定义该模块，将配置重置到另一个位置，然后重试。

A common use case for this is to use a CDN-hosted version of a library, but if that fails, switch to loading the file locally:

一个常见的用例是使用 CDN 托管的库版本，但是如果失败，请切换到本地加载文件：

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

使用`requirejs.undef（）`，如果您稍后设置其他配置并尝试加载相同的模块，则加载器仍会记住哪些模块需要该依赖关系，并在新配置的模块加载时完成加载。

Note: errbacks only work with callback-style require calls, not define() calls. define() is only for declaring modules.

Note：errbacks 仅适用于回调样式的 require 调用，而不适用 define（）调用。define（）仅用于声明模块。

#### paths config fallbacks

The above pattern for detecting a load failure, undef()ing a module, modifying paths and reloading is a common enough request that there is also a shorthand for it. The paths config allows array values:

上面的用于检测负载故障，对模块进行 undef（），修改路径和重新加载的模式是一个足够普遍的要求，它也有一个简写形式。路径配置允许数组值：

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

上面的代码将尝试 CDN 位置，但是如果失败，请退回到本地 lib/jquery.js 位置。

Note: paths fallbacks only work for exact module ID matches. This is different from normal paths config which can apply to any part of a module ID prefix segment. Fallbacks are targeted more for unusual error recovery, not a generic path search path solution, since those are inefficient in the browser.

注意：路径回退仅适用于确切的模块 ID 匹配。这与可应用于模块 ID 前缀段的任何部分的普通路径配置不同。后备的目标更多是针对异常错误的恢复，而不是通用的路径搜索路径解决方案，因为它们在浏览器中效率低下。

#### Global requirejs.onError function

To detect errors that are not caught by local errbacks, you can override requirejs.onError():

要检测本地错误未捕获的错误，可以覆盖 requirejs.onError（）：

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

RequireJS 支持加载程序插件。这是一种支持依赖关系的方法，该依赖关系不是普通的 JS 文件，但是对于脚本在执行工作之前已加载仍然很重要。RequireJS Wiki 有一个插件列表。本节讨论与 RequireJS 一起维护的一些特定插件：

##### Specify a Text File Dependency

It is nice to build HTML using regular HTML tags, instead of building up DOM structures in script. However, there is no good way to embed HTML in a JavaScript file. The best that can be done is using a string of HTML, but that can be hard to manage, particularly for multi-line HTML.

使用常规 HTML 标签构建 HTML 很好，而不是在脚本中构建 DOM 结构。但是，没有很好的方法将 HTML 嵌入 JavaScript 文件中。最好的办法是使用 HTML 字符串，但这可能很难管理，尤其是对于多行 HTML。

RequireJS has a plugin, text.js, that can help with this issue. It will automatically be loaded if the text! prefix is used for a dependency. See the text.js README for more information.

RequireJS 有一个插件 text.js，可以帮助解决此问题。如果文本将自动加载！前缀用于依赖项。有关更多信息，请参见 text.js 自述文件。

#### Page Load Event Support/DOM Ready

It is possible when using RequireJS to load scripts quickly enough that they complete before the DOM is ready. Any work that tries to interact with the DOM should wait for the DOM to be ready. For modern browsers, this is done by waiting for the DOMContentLoaded event.

使用 RequireJS 足够快地加载脚本以使其在 DOM 准备好之前完成时，这是可能的。任何尝试与 DOM 交互的工作都应等待 DOM 准备就绪。对于现代浏览器，这是通过等待 DOMContentLoaded 事件来完成的。

However, not all browsers in use support DOMContentLoaded. The domReady module implements a cross-browser method to determine when the DOM is ready. Download the module and use it in your project like so:

但是，并非所有使用中的浏览器都支持 DOMContentLoaded。domReady 模块实现了跨浏览器方法来确定 DOM 准备就绪的时间。下载模块，并在您的项目中使用它，如下所示：

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

由于 DOM ready 是常见的应用程序需求，因此理想情况下可以避免上面 API 中的嵌套函数。domReady 模块还实现了 Loader Plugin API，因此您可以使用 loader 插件语法（注意 domReady 依赖项中的！）来强制 require（）回调函数在执行之前等待 DOM 准备就绪。

```
domReady
```

will return the current document when used as a loader plugin:

用作加载程序插件时，将返回当前文档：

```javascript
require(['domReady!'], function (doc) {
	//This function is called once the DOM is ready,
	//notice the value for 'domReady!' is the current
	//document.
})
```

Note: If the document takes a while to load (maybe it is a very large document, or has HTML script tags loading large JS files that block DOM completion until they are done), using domReady as a loader plugin may result in a RequireJS "timeout" error. If this is a problem either increase the waitSeconds configuration, or just use domReady as a module and call domReady() inside the require() callback.

注意: 如果文档加载时间较长（可能是非常大的文档，或者 HTML 脚本标签加载了大型 JS 文件，这些文件会阻止 DOM 完成直到完成），那么使用 domReady 作为加载程序插件可能会导致 RequireJS"超时"错误。如果这是一个问题，请增加 waitSeconds 配置，或者仅使用 domReady 作为模块并在 require（）回调内调用 domReady（）。

#### Define an I18N Bundle

Once your web app gets to a certain size and popularity, localizing the strings in the interface and providing other locale-specific information becomes more useful. However, it can be cumbersome to work out a scheme that scales well for supporting multiple locales.

一旦您的 Web 应用达到一定的大小和流行度，在界面中本地化字符串并提供其他特定于语言环境的信息就变得更加有用。但是，制定一个可以很好地扩展以支持多个语言环境的方案可能很麻烦。

RequireJS allows you to set up a basic module that has localized information without forcing you to provide all locale-specific information up front. It can be added over time, and only strings/values that change between locales can be defined in the locale-specific file.

RequireJS 允许您设置具有本地化信息的基本模块，而不必强制您预先提供所有特定于语言环境的信息。它可以随时间添加，并且只能在特定于语言环境的文件中定义在语言环境之间更改的字符串/值。

i18n bundle support is provided by the i18n.js plugin. It is automatically loaded when a module or dependency specifies the i18n! prefix (more info below). Download the plugin and put it in the same directory as your app's main JS file.

i18n.js 插件提供了对 i18n 包的支持。当模块或依赖项指定 i18n 时，它将自动加载！前缀（下面有更多信息）。下载插件，并将其与应用程序的主 JS 文件放在同一目录中。

To define a bundle, put it in a directory called "nls" -- the i18n! plugin assumes a module name with "nls" in it indicates an i18n bundle. The "nls" marker in the name tells the i18n plugin where to expect the locale directories (they should be immediate children of the nls directory). If you wanted to provide a bundle of color names in your "my" set of modules, create the directory structure like so:

要定义包，请将其放在名为"nls"的目录中-i18n！插件假定模块名称中带有"nls"，表示一个 i18n 软件包。名称中的"nls"标记告诉 i18n 插件在哪里可以看到语言环境目录（它们应该是 nls 目录的直接子目录）。如果要在"我的"模块集中提供一组颜色名称，请按以下方式创建目录结构：

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

属性为"root"的对象文字定义了此模块。您要做的就是为以后的本地化工作奠定基础。

You can then use the above module in another module, say, in a my/lamps.js file:

然后，您可以在 my/lamps.js 文件的另一个模块中使用上述模块：

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

my/lamps 模块具有一个名为"testMessage"的属性，该属性使用 colors.red 来显示红色的本地化值。

稍后，当您想向文件添加特定的翻译时，例如使用 fr-fr 语言环境，请将 my/nls/colors 更改为如下所示：

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

然后在 my/nls/fr-fr/colors.js 定义一个文件，该文件包含以下内容：

```javascript
//Contents of my/nls/fr-fr/colors.js
define({
	red: 'rouge',
	blue: 'bleu',
	green: 'vert',
})
```

RequireJS will use the browser's navigator.languages, navigator.language or navigator.userLanguage property to determine what locale values to use for my/nls/colors, so your app does not have to change. If you prefer to set the locale, you can use the module config to pass the locale to the plugin:

RequireJS 将使用浏览器的 navigator.languages，navigator.language 或 navigator.userLanguage 属性来确定要用于 my/nls/colors 的语言环境值，因此您的应用程序不必更改。如果您希望设置语言环境，则可以使用模块配置将语言环境传递给插件：

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

注意 RequireJS 将始终使用小写版本的语言环境，以避免出现大小写问题，因此，i18n 软件包的磁盘上的所有目录和文件都应使用小写语言环境。

RequireJS is also smart enough to pick the right locale bundle, the one that most closely matches the ones provided by my/nls/colors. For instance, if the locale is "en-us", then the "root" bundle will be used. If the locale is "fr-fr-paris" then the "fr-fr" bundle will be used.

RequireJS 也足够聪明，可以选择正确的语言环境包，该语言包与 my/nls/colors 提供的语言包最匹配。例如，如果区域设置为"en-us"，则将使用"root"捆绑包。如果区域设置为"fr-fr-paris"，则将使用"fr-fr"捆绑包。

RequireJS also combines bundles together, so for instance, if the french bundle was defined like so (omitting a value for red):

RequireJS 还将捆绑包合并在一起，因此，例如，如果法式捆绑包是这样定义的（将红色值省略）：

```javascript
//Contents of my/nls/fr-fr/colors.js
define({
	blue: 'bleu',
	green: 'vert',
})
```

Then the value for red in "root" will be used. This works for all locale pieces. If all the bundles listed below were defined, then RequireJS will use the values in the following priority order (the one at the top takes the most precedence):

然后将使用"root"中 red 的值。这适用于所有语言环境。如果定义了下面列出的所有捆绑包，那么 RequireJS 将按照以下优先级顺序使用值（顶部的优先级最高）：

- my/nls/fr-fr-paris/colors.js
- my/nls/fr-fr/colors.js
- my/nls/fr/colors.js
- my/nls/colors.js

If you prefer to not include the root bundle in the top level module, you can define it like a normal locale bundle. In that case, the top level module would look like:

如果您不希望在顶级模块中包含根包，则可以像普通语言环境包一样定义它。在这种情况下，顶层模块如下所示：

```javascript
//my/nls/colors.js contents:
define({
	root: true,
	'fr-fr': true,
	'fr-fr-paris': true,
})
```

and the root bundle would look like:

根束看起来像：

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

RequireJS 有一个优化工具，可以执行以下操作

- Combines related scripts together into build layers and minifies them via UglifyJS (the default) or Closure Compiler (an option when using Java).

* 将相关脚本组合到构建层中，并通过 UglifyJS (默认设置)或 Closure Compiler(使用 Java 时的选项)将它们最小化。

- Optimizes CSS by inlining CSS files referenced by @import and removing comments.

* 通过内联@import 引用的 CSS 文件并删除注释来优化 CSS。

The optimizer is part of the r.js adapter for Node and Nashorn, and it is designed to be run as part of a build or packaging step after you are done with development and are ready to deploy the code for your users.

优化程序是用于 Node 和 Nashorn 的 r.js 适配器的一部分，它被设计为在完成开发并准备为用户部署代码后，作为构建或打包步骤的一部分运行。

The optimizer will only combine modules that are specified in arrays of string literals that are passed to top-level require and define calls, or the require('name') string literal calls in a simplified CommonJS wrapping. So, it will not find modules that are loaded via a variable name:

优化器将仅组合在传递给顶级 require 和 define 调用的字符串常量数组中指定的模块，或在简化的 CommonJS 包装中使用 require('name')字符串常量调用。因此，它将找不到通过变量名称加载的模块：

```javascript
var mods = someCondition ? ['a', 'b'] : ['c', 'd']
require(mods)
```

but 'a' and 'b' will be included if specified like so:

但如果这样指定，将包括"a"和"b"：

```javascript
require(['a', 'b'])
```

or:

```javascript
define(['a', 'b'], function (a, b) {})
```

This behavior allows dynamic loading of modules even after optimization. You can always explicitly add modules that are not found via the optimizer's static analysis by using the include option.

此行为即使在优化后也允许动态加载模块。您始终可以使用 include 选项来显式添加通过优化器的静态分析找不到的模块。

### Requirements

The optimizer can be run using Node, Java with Rhino or Nashorn, or in the browser. The requirements for each option:

可以使用 Node，带有 Rhino 或 Nashorn 的 Java 或在浏览器中运行优化器。每个选项的要求：

- Node: (preferred) Node 0.4.0 or later.
- Java: Java 1.6 or later.
- Browser: as of 2.1.2, the optimizer can run in a web browser that has array extras. While the optimizer options are the same as shown below, it is called via JavaScript instead of command line options. It is also only good for generating optimized single files, not a directory optimization. See the browser example. This option is really only useful for providing web-based custom builds of your library.

* Node: (首选)Node 0.4.0 或更高版本。
* Java: Java 1.6 或更高版本。
* 浏览器: 从 2.1.2 开始，优化器可以在具有 extras 数组的 Web 浏览器中运行。尽管优化程序选项与以下所示相同，但 ​​ 它是通过 JavaScript 而不是命令行选项调用的。它也仅适用于生成优化的单个文件，而不是目录优化。请参阅浏览器示例。此选项实际上仅对提供库的基于 Web 的自定义版本有用。

For command line use, Node is the preferred execution environment. The optimizer runs **much faster** with Node.

对于命令行使用，Node 是首选的执行环境。优化器通过 Node 运行得更快。

All the example commands in this page assume Node usage, and running on a Linux/OS X command line. See the r.js README for how to run it in Java.

此页面中的所有示例命令均假定使用 Node，并且在 Linux/OS X 命令行上运行。有关如何在 Java 中运行它的信息，请参见 r.js 自述文件。

### Download

1. You can download the tool on the download page.

2. If you are using Node with NPM, you can install r.js globally as part of the "requirejs" package in NPM:

1): 您可以在下载页面上下载该工具。

2):如果将 Node 与 NPM 一起使用，则可以将 R.js 全局安装为 NPM 中"requirejs"软件包的一部分：

```javascript
npm install -g requirejs
r.js -o app.build.js
```

If on Windows, you may need to type r.js.cmd instead of r.js. Or, you can use DOSKEY:

如果在 Windows 上，则可能需要键入 r.js.cmd 而不是 r.js。或者，您可以使用 DOSKEY：

```javascript
DOSKEY r.js=r.js.cmd $\*
```

If you want to install requirejs locally in a project as an npm package, instead of globally:

如果要以 npm 软件包的形式在项目中本地安装 requirejs，而不是全局安装：

```javascript
npm install requirejs
```

With this local install, you can run the optimizer by running the r.js or r.js.cmd file found in the project's node_modules/.bin directory.

使用此本地安装，您可以通过运行项目目录中的 r.js 或 r.js.cmd 文件来运行优化器 node_modules/.bin。

With the local install, you can also use the optimizer via a function call inside a node program.

在本地安装中，您还可以通过 Node 程序内部的函数调用来使用优化器。

The rest of this page assumes that r.js is just downloaded manually from the download page. It is normally the clearest, most portable way to use the optimizer.

该页面的其余部分假定 r.js 只是从下载页面手动下载的。通常，这是使用优化器的最清晰，最便捷的方法。

### Example setup

The examples in this page will assume you downloaded and saved r.js in a directory that is a sibling to your project directory. The optimizer that is part of r.js can live anywhere you want, but you will likely need to adjust the paths accordingly in these examples.

此页面中的示例将假定您已将 r.js 下载并保存在项目目录的同级目录中。作为 r.js 一部分的优化器可以放在您想要的任何位置，但是在这些示例中，您可能需要相应地调整路径。

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

main.html 具有 require.js 的脚本标签，并通过 require 调用加载 main.js，如下所示：

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

main.js 通过 require 调用加载 one.js，two.js 和 three.js：

```javascript
require(['one', 'two', 'three'], function (one, two, three) {})
```

main.css has content like the following:

main.css 的内容如下：

```css
@import url('common.css');
.app {
	background: transparent url(../../img/app.png);
}
```

### Basics

Command line arguments are interchangeable with a build profile properties

命令行参数可与构建配置文件属性互换

You can either specify options on the command line:

您可以在命令行中指定选项：

```
node r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js
```

or in a build profile. In a build.js, the same command line arguments can be specified like so:

或在构建配置文件中。在 build.js 中，可以像下面这样指定相同的命令行参数：

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

然后只需将构建配置文件的文件名传递给优化器：

```
node r.js -o build.js
```

Command line arguments take precedence over build profile settings, and you can mix them together:

命令行参数优先于构建配置文件设置，您可以将它们混合在一起：

```
node r.js -o build.js optimize=none
```

There is a limitation on the command line argument syntax. Dots are viewed as object property separators, to allow something like paths.jquery=lib/jquery to be transformed to the following in the optimizer:

命令行参数语法有限制。点被视为对象属性分隔符，以允许 paths.jquery=lib/jquery 在优化器中将类似的内容转换为以下内容：

```
paths: {
    jquery: 'lib/jquery'
}
```

but this means you cannot set the value for a paths property of "core/jquery.tabs" to a value. This would not work: paths.core/jquery.tabs=empty:, since it would result in this incorrect structure:

但这意味着您不能将"core/jquery.tabs"的 paths 属性的值设置为一个值。这将不起作用：paths.core/jquery.tabs=empty:，因为它会导致此错误的结构：

```
paths: {
    'core/jquery': {
        tabs: 'empty:'
    }
}
```

If you need to set a path like the "core/jquery.tabs" one, use a build.js file with the build options specified as a JavaScript object instead of using command line arguments.

如果您需要设置类似"core/jquery.tabs"的路径，请使用带有指定为 JavaScript 对象的构建选项的 build.js 文件，而不要使用命令行参数。

For a list of all options, see all configuration options.

有关所有选项的列表，请参阅所有配置选项。

Relative path resolution rules:

相对路径解析规则：

In general, if it is a path, it is relative to the build.js file used to hold the build options, or if just using command line arguments, relative to the current working directory. Example of properties that are file paths: appDir, dir, mainConfigFile, out, wrap.startFile, wrap.endFile.

通常，如果它是路径，则相对于用于保存构建选项的 build.js 文件，或者仅相对于当前工作目录而言，如果仅使用命令行参数。文件路径属性的示例：appDir，dir，mainConfigFile，out，wrap.startFile，wrap.endFile。

For baseUrl, it is relative to appDir. If no appDir, then baseUrl is relative to the build.js file, or if just using command line arguments, the current working directory.

对于的 baseUrl，它是相对于 APPDIR。如果没有 appDir，则 baseUrl 相对于 build.js 文件，或者如果仅使用命令行参数，则相对于当前工作目录。

For paths and packages, they are relative to baseUrl, just as they are for require.js.

对于路径和包，它们是相对的 baseUrl，只是因为他们是 require.js。

For properties that are module IDs, they should be module IDs, and not file paths. Examples are name, include, exclude, excludeShallow, deps.

对于作为模块 ID 的属性，它们应该是模块 ID，而不是文件路径。示例包括 name，include，exclude，excludeShallow，deps。

Config settings in your main JS module that is loaded in the browser at runtime are not read by default by the optimizer

优化器默认不会读取运行时在浏览器中加载的主 JS 模块中的配置设置

This is because the config settings for a build can be very different, with multiple optimization targets. So a separate set of config options need to be specified for the optimizer.

这是因为构建的配置设置可能非常不同，有多个优化目标。因此，需要为优化程序指定一组单独的配置选项。

In version 1.0.5+ of the optimizer, the mainConfigFile option can be used to specify the location of the runtime config. If specified with the path to your main JS file, the first requirejs({}), requirejs.config({}), require({}), or require.config({}) found in that file will be parsed out and used as part of the configuration options passed to the optimizer:

在优化程序的 1.0.5+版本中，mainConfigFile 选项可用于指定运行时配置的位置。如果使用主 JS 文件的路径指定，requirejs({}), requirejs.config({}), require({}), or require.config({})则将解析出该文件中的第一个文件，并将其用作传递给优化器的配置选项的一部分：

```
mainConfigFile: 'path/to/main.js'
```

The precedence for config: command line, build profile, mainConfigFile. In other words, the mainConfigFile configuration has the lowest priority.

config 的优先级：命令行，构建配置文件，mainConfigFile。换句话说，mainConfigFile 配置的优先级最低。

### Optimizing one JavaScript file

Use the above example setup, if you just wanted to optimize main.js, you could use this command, from inside the appdirectory/scripts directory:

使用上面的示例设置，如果您只想优化 main.js，则可以在 appdirectory/scripts 目录内部使用此命令：

```
node ../../r.js -o name=main out=main-built.js baseUrl=.
```

This will create a file called appdirectory/scripts/main-built.js that will include the contents of main.js, one.js, two.js and three.js.

这将创建一个名为 appdirectory/scripts/main-built.js 的文件，其中将包含 main.js，one.js，two.js 和 three.js 的内容。

Normally you should not save optimized files with your pristine project source. Normally you would save them to a copy of your project, but to make this example easier it is saved with the source. Change the out= option to any directory you like, that has a copy of your source. Then, you can change the main-built.js file name to just main.js so the HTML page will load the optimized version of the file.

通常你应该不保存优化后的文件与原始的项目源。通常，您会将它们保存到项目的副本中，但是为了使此示例更加容易，它与源一起保存。将 out =选项更改为您喜欢的任何包含源副本的目录。然后，您可以将 main-built.js 文件名更改为 main.js，以便 HTML 页面将加载文件的优化版本。

If you want to include require.js with the main.js source, you can use this kind of command:

如果要在 main.js 源代码中包含 require.js，则可以使用以下命令：

```
node ../../r.js -o baseUrl=. paths.requireLib=../../require name=main include=requireLib out=main-built.js
```

Since "require" is a reserved dependency name, you create a "requireLib" dependency and map it to the require.js file.

由于"require"是保留的依赖项名称，因此您将创建"requireLib"依赖项并将其映射到 require.js 文件。

Once that optimization is done, you can change the script tag to reference "main-built.js" instead of "require.js", and your optimized project will only need to make one script request.

优化完成后，您可以更改脚本标记以引用"main-built.js"而不是"require.js"，并且优化后的项目仅需要发出一个脚本请求。

If you want to wrap your built file so it can be used in pages that do not have an AMD loader like RequireJS, see the Optimization FAQ.

如果您想打包生成的文件，以便可以在没有 AMD 加载器的页面(如 RequireJS)中使用它，请参阅优化常见问题解答.

### Shallow exclusions for fast development

You can use the one JavaScript file optimization approach to make your development experience faster. By optimizing all the modules in your project into one file, except the one you are currently developing, you can reload your project quickly in the browser, but still give you the option of fine grained debugging in a module.

您可以使用一种 JavaScript 文件优化方法来加快您的开发体验。通过将项目中的所有模块优化为一个文件(当前正在开发的文件除外)，可以在浏览器中快速重新加载项目，但仍可以选择在模块中进行精细调试。

You can do this by using the excludeShallow option. Using the example setup above, assume you are currently building out or debugging two.js. You could use this optimization command:

您可以使用 excludeShallow 选项来执行此操作。使用上面的示例设置，假设您当前正在构建或调试 two.js。您可以使用以下优化命令：

```
node ../../r.js -o name=main excludeShallow=two out=main-built.js baseUrl=.
```

If you do not want the main-build.js file minified, pass optimize=none in the command above.

如果您不想缩小 main-build.js 文件，请在上面的命令中传递 optimize = none。

Then configure the HTML page to load the main-built.js file instead of main.js by configuring the path used for "main" to be "main-built":

然后通过将用于"main"的路径配置为"main-built"，将 HTML 页面配置为加载 main-built.js 文件而不是 main.js：

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

现在，当加载此页面时，"main"的 require()将加载 main-built.js 文件。由于 excludeShallow 告诉它只是要排除 two.js，因此 two.js 仍将作为独立文件加载，使您可以在浏览器的调试器中将其视为独立文件，因此可以设置断点并更好地跟踪其各个更改。

### empty: paths for network/CDN resources

You may have a script you want to load from a Content Delivery Network (CDN) or any other server on a different domain.

您可能具有要从 Content Delivery Network(CDN)或其他域上的任何其他服务器加载的脚本。

The optimizer cannot load network resources, so if you want it included in the build, be sure to create a paths config to map the file to a module name. Then, for running the optimizer, download the CDN script and pass a paths config to the optimizer that maps the module name to the local file path.

优化器无法加载网络资源，因此，如果您希望将其包含在构建中，请确保创建路径配置以将文件映射到模块名称。然后，要运行优化器，请下载 CDN 脚本，然后将路径配置传递给优化器，以将模块名称映射到本地文件路径。

However, it is more likely that you do not want to include that resource in the build. If the script does not have any dependencies, or you do not want to include its dependencies or will be including them in another way, then you can use the special 'empty:' scheme in the paths config to just skip the file when doing an optimization.

但是，您很可能不想在构建中包括该资源。如果脚本没有任何依赖关系，或者您不想包含其依赖关系或将以其他方式包含它们，则可以在 paths 配置中使用特殊的"empty："方案在执行操作时跳过该文件。优化。

In your main.js file, create a paths config that gives the script a module name. This can be done even if the script does not define a module via a call to define(). paths config are just used to map short module/script IDs to an URL. This allows you to use a different paths config for the optimization. In main.js:

在 main.js 文件中，创建一个路径配置，为脚本提供模块名称。即使脚本没有通过调用 define()来定义模块，也可以这样做。路径配置仅用于将简短的模块/脚本 ID 映射到 URL。这使您可以使用其他路径配置进行优化。在 main.js 中：

```javascript
requirejs.config({
	paths: {
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
	},
})

require(['jquery'], function ($) {})
```

Then, when running the optimizer, use 'empty:' for the paths config:

然后，在运行优化程序时，将"empty："用于路径配置：

```
node ../../r.js -o name=main out=main-built.js baseUrl=. paths.jquery=empty:
```

Or, in a build profile:

或者，在构建配置文件中：

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

使用上面的示例设置，如果您只想优化 main.css，则可以在 appdirectory/css 目录中使用以下命令：

```
node ../../r.js -o cssIn=main.css out=main-built.css
```

This will create a file called appdirectory/css/main-build.css that will include the contents of main.css, have the url() paths properly adjusted, and have comments removed.

这将创建一个名为 appdirectory/css/main-build.css 的文件，该文件将包含 main.css 的内容，已正确调整 url()路径，并删除了注释。

See the notes for the Optimizing one JavaScript file about avoiding saving optimized files in your pristine source tree. It is only done here to make the example simpler.

Note: The url() path fixing will always fix the paths relative to the cssIn build option path, not the out build option.

请参阅"优化一个 JavaScript 文件"的注释，有关避免在原始源代码树中保存优化的文件。仅在此处进行操作以简化示例。

注意：url()路径固定将始终固定相对于 cssIn 构建选项路径的路径，而不是 out 构建选项的路径。

### Optimizing a whole project

The optimizer can take care of optimizing all the CSS and JS files in your project by using a build profile.

优化器可以使用构建配置文件来优化项目中的所有 CSS 和 JS 文件。

Create a build profile, call it app.build.js, and put it in the scripts directory. The app.build.js file can live anywhere, but just be sure to adjust the paths accordingly in the example below -- all paths will be relative to where the app.build.js is located. Example app.build.js:

创建一个构建配置文件，将其称为 app.build.js，并将其放在脚本目录中。app.build.js 文件可以存在于任何地方，但是请确保在下面的示例中相应地调整路径-所有路径都将相对于 app.build.js 所在的位置。示例 app.build.js：

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

该构建配置文件告诉 RequireJS 将所有 appdirectory 复制到一个名为 appdirectory-build 的兄弟目录中，并在 appdirectory-build 目录中应用所有优化。强烈建议您使用与源目录不同的输出目录-否则，当优化程序覆盖源时，可能会发生不良情况。

RequireJS will use baseUrl to resolve the paths for any module names. The baseUrl should be relative to appDir.

RequireJS 将使用 baseUrl 解析任何模块名称的路径。该的 baseUrl 应该是相对于 APPDIR。

In the modules array, specify the module names that you want to optimize, in the example, "main". "main" will be mapped to appdirectory/scripts/main.js in your project. The build system will then trace the dependencies for main.js and inject them into the appdirectory-build/scripts/main.js file.

在模块数组中，指定要优化的模块名称，例如"main"。"main"将映射到您项目中的 appdirectory/scripts/main.js。然后，构建系统将跟踪 main.js 的依赖项，并将其注入到 appdirectory-build/scripts/main.js 文件中。

It will also optimize any CSS files it finds inside appdirectory-build.

它还会优化在 appdirectory-build 中找到的所有 CSS 文件。

To run the build, run this command from inside the appdirectory/scripts directory:

要运行构建，请从 appdirectory/scripts 目录内部运行以下命令：

```
node ../../r.js -o app.build.js
```

Once the build is done, you can use appdirectory-build as your optimized project, ready for deployment.

构建完成后，您可以将 appdirectory-build 用作优化的项目，准备进行部署。

### Optimizing a multi-page project

requirejs/example-multipage is an example of a project that has multiple pages, but shares a common configuration and a common optimized build layer.

requirejs/example-multipage 是一个项目的示例，该项目具有多个页面，但是共享一个公共配置和一个公共的优化构建层。

### Turbo options

The default for the optimizer is to do the safest, most robust set of actions that avoid surprises after a build. However, depending on your project setup, you may want to turn off some of these features to get faster builds:

优化器的默认设置是执行最安全，最可靠的一组操作，以避免在构建后出现意外情况。但是，根据您的项目设置，您可能需要关闭其中一些函数以获得更快的构建：

- The biggest time drain is minification. If you are just doing builds as part of a dev workflow, then set optimize to "none".
- If doing a whole project optimization, but only want to minify the build layers specified in modules options and not the rest of the JS files in the build output directory, you can set skipDirOptimize to true.
- Normally each run of a whole project optimization will delete the output build directory specified by dir for cleanliness. Some build options, like onBuildWrite, will modify the output directory in a way that is hazardous to do twice over the same files. However, if you are doing simple builds with no extra file transforms besides build layer minification, then you can set keepBuildDir to true to keep the build directory between runs. Then, only files that have changed between build runs will be copied.

* 最大的时间流失是缩小。如果您只是将构建作为开发工作流程的一部分，则将 optimize 设置为"none"。
* 如果要进行整个项目的优化，而只希望最小化模块选项中指定的构建层，而不是最小化构建输出目录中的其余 JS 文件，则可以将 skipDirOptimize 设置为 true。
* 通常，整个项目优化的每次运行都会删除 dir 指定的输出构建目录，以保持整洁。某些构建选项(如 onBuildWrite)将以危险的方式修改输出目录，从而对同一文件执行两次。但是，如果您执行的是简单构建，并且除了最小化构建层之外，没有其他文件转换，则可以将 keepBuildDir 设置为 true 在两次运行之间保留构建目录。然后，将仅复制在两次构建运行之间已更改的文件。

As of version 2.1.2, there are some speed shortcuts the optimizer will take by default if optimize is set to "none". However, if you are using "none" for optimize and you are planning to minify the built files after the optimizer runs, then you should turn set normalizeDirDefines to "all" so that define() calls are normalized correctly to withstand minification. If you are doing minification via the optimize option, then you do not need to worry about setting this option.

从 2.1.2 版开始，如果将 optimize 设置为，则优化器默认会采用一些速度快捷方式"none"。但是，如果你正在使用"none"的优化和您所规划的优化运行后，来缩小内置文件，那么你应该把一套 normalizeDirDefines 以"all"使定义()调用正确归承受微小。如果要通过优化选项进行缩小，则无需担心设置此选项。

### Integration with has.js

has.js is a great tool to that adds easy feature detection for your project. There is some optimizer support for optimizing code paths for has.js tests.

has.js 是一个很棒的工具，可以为您的项目添加简单的函数检测。有一些优化器支持可优化 has.js 测试的代码路径。

If your code uses tests like the following:

如果您的代码使用如下测试：

```javascript
if (has('someThing')) {
	//use native someThing
} else {
	//do some workaround
}
```

You can define a has object in the build config with true or false values for some has() tests, and the optimizer will replace the has() test with the true or false value.

您可以在构建配置中为某些 has()测试使用 true 或 false 值定义 has 对象，并且优化程序将用 true 或 false 值替换 has()测试。

If your build profile looked like so:

如果您的构建配置文件如下所示：

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

然后，优化器会将上面的代码示例转换为：

```javascript
if (true) {
	//use native someThing
} else {
	//do some workaround
}
```

Then, if you use the default optimize setting of "uglify" in r.js 0.26.0 or later, or if the optimize setting is set to "closure" (when run under Java), the minifier will optimize out the dead code branch! So you can do custom builds of your code that are optimized for a set of has() tests.

然后，如果您在 r.js 0.26.0 或更高版本中使用默认的优化设置"uglify"，或者如果将优化设置设置为"closure"(在 Java 下运行)，则压缩程序将优化无效代码分支！因此，您可以对代码进行自定义构建，这些构建针对一组 has()测试进行了优化。

### Source maps

Version 2.1.6 and higher have experimental support for source maps. It works for mapping minified, bundled code to unminified, separate modules and only when optimize is set to "uglify2". optimize set to "closure" allows only mapping minified, bundled code to unminified bundled code (closure only available when running under Java with Rhino). The unminified files will show up in the developer tools with a ".src.js" file extension.

2.1.6 版或更高版本具有对源映射的实验性支持。仅在将 optimize 设置为时，它才能将缩小的捆绑代码映射到未缩小的单独模块"uglify2"。最优化设置为"closure"只允许将缩小的捆绑代码映射到最小的捆绑代码(仅当在具有 Rhino 的 Java 下运行时，闭包才可用)。未缩小的文件将以".src.js"文件扩展名显示在开发人员工具中。

To enable the source map generation, set generateSourceMaps to true. Since the minifier needs to have full control over the minified file to generate the source map, the preserveLicenseComments should be explicitly set to false. There is is a way to get some license comments in the minified source though.

要启用源地图生成，请将 generateSourceMaps 设置为 true。由于 minifier 需要有完全控制权缩小的文件生成源图，preserveLicenseComments 应明确设定 false。不过，有一种方法可以在缩小的源代码中获得一 些许可证注释。

The optimizer has supported sourceURL (by setting useSourceUrl to true), for debugging combined modules as individual files. However, that only works with non-minified code. Source maps translate a minified file to a non-minified version. It does not make sense to use useSourceUrl with generateSourceMaps since useSourceUrl needs the source values as strings, which prohibits the useful minification done in combination with generateSourceMaps.

优化器支持 sourceURL(通过将 useSourceUrl 设置为 true)，用于将组合的模块作为单个文件进行调试。但是，这仅适用于未缩小的代码。源映射将缩小的文件转换为非缩小的版本。将 useSourceUrl 与 generateSourceMaps 一起使用是没有意义的，因为 useSourceUrl 需要将源值作为字符串使用，这禁止了与 generateSourceMaps 一起进行的有用缩小。

### All configuration options

There is an example.build.js file in the requirejs/build directory that details all of the allowed optimizer configuration options.

requirejs/build 目录中有一个 example.build.js 文件，其中详述了所有允许的优化器配置选项。

### Deployment techniques

The r.js optimizer is designed to offer some primitives that can be used for different deployment scenarios by adding other code on top of it. See the deployment techniques wiki page for ideas on how to use the optimizer in that fashion.

r.js 优化器旨在通过在其之上添加其他代码来提供一些可用于不同部署方案的原语。有关如何以这种方式使用优化器的想法，请参阅部署技术 Wiki 页面。

### Common pitfalls

If you are having trouble with the examples below, here are some common pitfalls that might be the source of the problem:

如果您在使用以下示例时遇到问题，请注意以下常见问题，这可能是问题的根源：

Do not specify the output directory to within the source area for your JavaScript

不要将输出目录指定为 JavaScript 的源区域内

For instance, if your baseUrl is 'js' and your build output goes into 'js/build', there will likely be problems with extra, nested files generated on each optimization run. This guidance is only for optimizations that are not single file optimizations.

例如，如果您的 baseUrl 是'js'，而您的构建输出进入了'js/build'，则每次优化运行时生成的额外的嵌套文件可能会出现问题。本指南仅适用于不是单文件优化的优化。

Avoid optimization names that are outside the baseUrl

避免使用 baseUrl 之外的优化名称

For instance, if your baseUrl is 'js', and your optimization targets:

例如，如果您的 baseUrl 是'js'，并且您的优化目标是：

```
name: '../main'
```

the optimization could overwrite or place files outside the output directory. For those cases, create a paths config to map that file to a local name, like:

优化可能会覆盖文件或将文件放置在输出目录之外。对于这些情况，请创建路径配置以将该文件映射到本地名称，例如：

```
paths: {
    main: '../main'
}
```

then use name:

然后使用名称：

```
name: 'main'
```

for the optimization target.

用于优化目标。

Note the build limitations of shim config. In particular, you cannot load dependencies for shimmed libraries from a CDN. See the shim config section for more information.

请注意垫片配置的构建限制。特别是，您不能从 CDN 加载填充程序库的依赖项。有关更多信息，请参见垫片配置部分。

## How to use RequireJS with jQuery

### Introduction

While RequireJS loads jQuery just like any other dependency, jQuery's wide use and extensive plugin ecosystem mean you'll likely have other scripts in your project that also depend on jQuery. You might approach your jQuery RequireJS configuration differently depending on whether you are starting a new project or whether you are adapting existing code.

尽管 RequireJS 像其他依赖项一样加载 jQuery，但 jQuery 的广泛使用和广泛的插件生态系统意味着您可能在项目中拥有也依赖 jQuery 的其他脚本。您可能会以不同的方式来处理 jQuery RequireJS 配置，具体取决于您是开始一个新项目还是正在改编现有的

### Global Functions

jQuery registers itself as the global variables "$" and "jQuery", even when it detects AMD/RequireJS. The AMD approach advises against the use of global functions, but the decision to turn off these jQuery globals hinges on whether you have non-AMD code that depends on them. jQuery has a noConflict function that supports releasing control of the global variables and this can be automated in your requirejs.config, as we will see later.

jQuery 将自己注册为全局变量"$"和"jQuery"，即使它检测到 AMD/RequireJS。AMD 方法建议不要使用全局函数，但是关闭这些 jQuery 全局变量的决定取决于您是否拥有依赖于它们的非 AMD 代码。jQuery 具有一个 noConflict 函数，该函数支持释放对全局变量的控制，并且可以在您的 requirejs.config 中将其自动化，这将在后面介绍。

### Module Name

jQuery defines named AMD module 'jquery' (all lower case) when it detects AMD/RequireJS. To reduce confusion, we recommend using 'jquery' as the module name in your requirejs.config.

jQuery 在检测到 AMD/RequireJS 时定义了命名为 AMD 的模块 "jquery"(全部小写)。为了减少混乱，我们建议在您的 requirejs.config 中使用"jquery"作为模块名称。

```javascript
requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		// the left side is the module ID,
		// the right side is the path to
		// the jQuery file, relative to baseUrl.
		// Also, the path should NOT include
		// the '.js' file extension. This example
		// is using jQuery 1.9.0 located at
		// js/lib/jquery-1.9.0.js, relative to
		// the HTML page.
		jquery: 'jquery-1.9.0',
	},
})
```

The other (recommended) solution is to just name the file 'jquery.js' and place it in the baseUrl directory. Then the above paths entry is not needed.

另一个(推荐)解决方案是仅将文件命名为"jquery.js"并将其放置在 baseUrl 目录中。然后，不需要上述路径条目。

You can avoid lots of configuration lines by placing the files according to the default ID-to-path convention of baseUrl + moduleID + '.js'. The examples below show how to set baseUrl to be the directory for third-party, library code, and use one extra paths config for your app code.

通过根据默认的 ID 到路径约定放置文件，可以避免很多配置行 baseUrl + moduleID + '.js'。以下示例显示了如何将 baseUrl 设置为第三方库代码的目录，以及如何为您的应用程序代码使用一个额外的路径配置。

So to reiterate, you will likely get an error if you refer to jQuery with another module name, like 'lib/jquery'. **This example will not work**:

因此，重申一下，如果使用其他模块名称(如)引用 jQuery，则可能会出现错误'lib/jquery'。这个例子不起作用：

```javascript
	// THIS WILL NOT WORK
	define(['lib/jquery'], function ($) {...});
```

It will not work, since jQuery registers itself with the name of 'jquery' and not 'lib/jquery'. In general, explicitly naming modules in the define() call are discouraged, but jQuery has some special constraints.

由于 jQuery 使用'jquery'而不是'lib/jquery'的名称进行注册，因此无法使用。通常，不建议在 define()调用中显式命名模块，但是 jQuery 有一些特殊的约束。

### Example using shim config

This example shows how to use the shim config to specify dependencies for jQuery plugins that do not call define(). This example is useful if you have an existing jQuery project you want to convert and do not want to modify the sources of the jQuery plugins to call define().

此示例显示如何使用 shim config 为不调用 define()的 jQuery 插件指定依赖项。如果您有一个现有的 jQuery 项目要转换并且不想修改 jQuery 插件的源以调用 define()，则此示例很有用。

[Example using jQuery with shim config](https://github.com/requirejs/example-jquery-shim)

### Example loading jquery from a CDN

This example shows how to load and optimize your code while loading jQuery from a Content Delivery Network (CDN). This example requires all your jQuery plugins to call define() to properly express their dependencies. Shim config does not work after optimization builds with CDN resources.

本示例说明了如何从 Content Delivery Network(CDN)加载 jQuery 时加载和优化代码。这个例子要求您所有的 jQuery 插件都调用 define()来正确表达它们的依赖关系。使用 CDN 资源进行优化构建后，shim config 不起作用。

[Example using jQuery from a CDN](https://github.com/requirejs/example-jquery-cdn)

### Mapping Modules to use noConflict

If all of your modules (including any third party jQuery plugins or library code that depend on jQuery) are AMD compatible and you want to avoid having $ or jQuery in the global namespace when they call requirejs(['jquery']), you can use the map config to map the use of jQuery to a module that calls noConflict and returns that value of jQuery for the 'jquery' module ID.

如果您所有模块(包括依赖 jQuery 的任何第三方 jQuery 插件或库代码)都与 AMD 兼容，并且您希望避免在调用它们时在全局命名空间中使用$或 jQuery，则 requirejs(['jquery'])可以使用 map config 映射使用将 jQuery 转换为一个调用 noConflict 的模块，并返回 jQuery 的值作为'jquery'模块 ID。

You can use this example with the CDN example above -- the shim example will not work since shimmed libraries need a global jQuery.

您可以将此示例与上面的 CDN 示例一起使用-shim 示例将不起作用，因为填充的库需要全局 jQuery。

```javascript
requirejs.config({
	// Add this map config in addition to any baseUrl or
	// paths config you may already have in the project.
	map: {
		// '*' means all modules will get 'jquery-private'
		// for their 'jquery' dependency.
		'*': { jquery: 'jquery-private' },

		// 'jquery-private' wants the real jQuery module
		// though. If this line was not here, there would
		// be an unresolvable cyclic dependency.
		'jquery-private': { jquery: 'jquery' },
	},
})

// and the 'jquery-private' module, in the
// jquery-private.js file:
define(['jquery'], function (jq) {
	return jq.noConflict(true)
})
```

This means that any module which uses jQuery will need to use the AMD return value rather than depending on the global $:

这意味着任何使用 jQuery 的模块都将需要使用 AMD 返回值，而不是依赖于全局$：

```javascript
requirejs(['jquery'], function ($) {
	console.log($) // OK
})

requirejs(['jquery'], function (jq) {
	console.log(jq) // OK
})

requirejs(['jquery'], function () {
	console.log($) // UNDEFINED!
})
```

### The previous example with a concatenated require-jquery file

Previously, we've been pointing to an example using a special require-jquery file, which consisted of require.js and jQuery concatenated. This is no longer the recommended way to use jQuery with require.js, but if you're looking for the (no longer maintained) example, you can find require-jquery here.

以前，我们一直在使用一个特殊的 require-jquery 文件指向一个示例，该文件由 require.js 和 jQuery 串联而成。这不再是将 jQuery 与 require.js 一起使用的推荐方法，但是如果您正在寻找(不再维护)示例，则可以在此处找到 require-jquery。

## RequireJS in Node

### Doesn't Node already have a module loader?

Yes Node does. That loader uses the CommonJS module format. The CommonJS module format is non-optimal for the browser, and I do not agree with some of the trade-offs made in the CommonJS module format. By using RequireJS on the server, you can use one format for all your modules, whether they are running server side or in the browser. That way you can preserve the speed benefits and easy debugging you get with RequireJS in the browser, and not have to worry about extra translation costs for moving between two formats.

If you want to use define() for your modules but still run them in Node without needing to run RequireJS on the server, see the section below about using amdefine.

是的，Node 可以。该加载器使用 CommonJS 模块格式。对于浏览器来说，CommonJS 模块格式不是最佳的，我不同意使用 CommonJS 模块格式进行的一些折衷。通过在服务器上使用 RequireJS，您可以对所有模块使用一种格式，无论它们是在服务器端还是在浏览器中运行。这样，您可以保留在浏览器中使用 RequireJS 所获得的速度优势和简便的调试函数，而不必担心在两种格式之间移动会产生额外的解析成本。

如果要对模块使用 define()，但仍在 Node 中运行它们而不需要在服务器上运行 RequireJS，请参阅下面有关使用 amdefine 的部分。

### Can I use Node modules already written in the CommonJS module format?

Yes! The Node adapter for RequireJS, called r.js, will use Node's implementation of require and Node's search paths if the module is not found with the configuration used by RequireJS, so you can continue to use your existing Node-based modules without having to do changes to them.

RequireJS will use its Configuration Options first to find modules. If RequireJS cannot find the module with its configuration, it is assumed to be a module that uses Node's type of modules and configuration. So, only configure module locations with RequireJS if they use the RequireJS API. For modules that expect Node's APIs and configuration/paths, just install them with a Node package manager, like npm, and do not configure their locations with RequireJS.

Best practice: Use npm to install Node-only packages/modules into the projects node_modules directory, but do not configure RequireJS to look inside the node_modules directory. Also avoid using relative module IDs to reference modules that are Node-only modules. So, do not do something like require("./node_modules/foo/foo").

Other notes:

- RequireJS in Node can only load modules that are on the local disk -- fetching modules across http, for instance, is not supported at this time.
- RequireJS config options like map, packages, paths are only applied if RequireJS loads the module. If RequireJS needs to ask the node module system, the original ID is passed to Node. If you need a node module to work with a map config, inline define() calls work, as shown in this email list thread.

如果未通过 RequireJS 使用的配置找到模块，则 RequireJS 的 Node 适配器 r.js 将使用 Node 的 require 实现和 Node 的搜索路径，因此您可以继续使用现有的基于 Node 的模块，而不必这样做改变他们。

RequireJS 将首先使用其配置选项来查找模块。如果 RequireJS 找不到具有其配置的模块，则将其假定为使用 Node 的模块类型和配置的模块。因此，如果模块位置使用 RequireJS API，则仅使用 RequireJS 配置模块位置。对于需要 Node API 和配置/路径的模块，只需使用 Node 软件包管理器(如 npm)安装它们，而不用 RequireJS 配置它们的位置。

最佳实践: 使用 npm 将仅 Node 的软件包/模块安装到项目的 node_modules 目录中，但不要将 RequireJS 配置为在 node_modules 目录中查找。还要避免使用相对模块 ID 来引用作为仅 Node 模块的模块。因此，请勿执行 require(“./node_modules/foo/foo")之类的操作。

其他说明:

- Node 中的 RequireJS 只能加载本地磁盘上的模块-例如，目前不支持跨 http 提取模块。
- 仅在 RequireJS 加载模块时才应用诸如 map，包，路径之类的 RequireJS 配置选项。如果 RequireJS 需要询问 Node 模块系统，则将原始 ID 传递给 Node。如果您需要 Node 模块来处理 map config，则内联 define()调用可以正常工作。

### How do I use it?

There are two ways to get the Node adapter:

有两种获取 Node 适配器的方法：

#### npm

Use npm to install it:

```
npm install requirejs
```

This option will install the latest release.

#### Download r.js

If you prefer to not use npm, you can get r.js directly:

- Download r.js from the [the download page](https://requirejs.org/docs/download.html#rjs) and place it in your project.
- Get the source from the [r.js repo](https://github.com/requirejs/r.js) and either generate the r.js via "node dist.js", or grab a snapshot from the dist directory.

* 从下载页面下载 r.js 并将其放在您的项目中。
* 从 r.js 仓库获取源代码，或者通过"node dist.js"生成 r.js，或者从 dist 目录中获取快照。

#### Usage

These instructions assume an npm installation of 'requirejs'. If you are using the r.js file directly, replace require('requirejs') with require('./path/to/r.js'). Basic usage is:

这些说明假定 npm 安装了'requirejs'。如果直接使用 r.js 文件，则将 require('requirejs')替换为 require('./path/to/r.js')。基本用法是：

- require('requirejs')
- Pass the main js file's "require" function in the configuration to requirejs.

* require('requirejs')
* 在配置中将主 js 文件的"require"函数传递给 requirejs。

```javascript
var requirejs = require('requirejs')

requirejs.config({
	//Pass the top-level main.js/index.js require
	//function to requirejs so that node modules
	//are loaded relative to the top-level JS file.
	nodeRequire: require,
})

requirejs(['foo', 'bar'], function (foo, bar) {
	//foo and bar are loaded according to requirejs
	//config, but if not found, then node's require
	//is used to load the module.
})
```

Be sure to read the notes in section 2 about configuring RequireJS so that it can load node-only modules installed via npm.

To see a more complete example that loads a module via RequireJS but uses Node-native modules for other things, see the embedded test in the r.js repo.

Note: requirejs([], function() {}) will call the function callback asynchronously in RequireJS 2.1+ (for earlier versions it was synchronously called). However, when running in Node, module loading will be loaded using sync IO calls, and loader plugins should resolve calls to their load method synchronously. This allows sync uses of the requirejs module in node to work via requirejs('stringValue') calls:

确保阅读第 2 节中有关配置 RequireJS 的注释，以便它可以加载通过 npm 安装的仅 Node 模块。

要查看通过 RequireJS 加载模块但将 Node-native 模块用于其他用途的更完整的示例，请参阅 r.js 存储库中的嵌入式测试。

注意: requirejs([], function() {}) 将在 RequireJS 2.1+中异步调用函数回调(对于早期版本，它是同步调用的)。但是，在 Node 中运行时，将使用同步 IO 调用来加载模块加载，并且加载器插件应同步解析对其加载方法的调用。这允许 Node 中对 requirejs 模块的同步使用通过 requirejs('stringValue')调用来工作：

```javascript
//Retrieves the module value for 'a' synchronously
var a = requirejs('a')
```

#### Building node modules with AMD or RequireJS

If you want to code a module so that it works with RequireJS and in Node, without requiring users of your library in Node to use RequireJS, then you can use the amdefine package to do this:

如果要对模块进行编码以使其可与 RequireJS 和 Node 一起使用，而无需 Node 中库的用户使用 RequireJS，则可以使用 amdefine 包来执行此操作：

```javascript
if (typeof define !== 'function') {
	var define = require('amdefine')(module)
}

define(function (require) {
	var dep = require('dependency')

	//The value returned from the function is
	//used as the module export visible to Node.
	return function () {}
})
```

The RequireJS optimizer, as of version 1.0.3, will strip out the use of 'amdefine' above, so it is safe to use this module for your web-based projects too. Just be sure to use **the exact 'amdefine' if() test and contents as shown above**. Differences in spaces/line breaks are allowed. See the amdefine project for more information.

If you want to use RequireJS directly to code your module, and then export a module value to node so that it can be used in other Node programs without requiring that app to use RequireJS, you can use the approach listed in the next example.

It is best to set the baseUrl specifically to the directory containing the module, so that it works properly when nested inside a node_modules heirarchy. Use the synchronous requirejs('moduleId') to fetch the module using the config and rules in requirejs, then use Node's module.exports to export your module value:

从 1.0.3 版开始，RequireJS 优化器将取消上面的"amdefine"的使用，因此也可以将该模块用于基于 Web 的项目。只要确保使用精确的'amdefine'if()测试和内容即可，如上所示。允许空格/换行符之间存在差异。有关更多信息，请参见 amdefine 项目。

如果要直接使用 RequireJS 对模块进行编码，然后将模块值导出到 Node，以便可以在其他 Node 程序中使用它，而无需该应用程序使用 RequireJS，则可以使用下一个示例中列出的方法。

最好将 baseUrl 专门设置为包含模块的目录，以便嵌套在 node_modules 层次结构中时可以正常工作。使用 requirejs('moduleId')sync 通过 requirejs 中的配置和规则获取模块，然后使用 Node 的 module.exports 导出模块值：

```javascript
var requirejs = require('requirejs')

requirejs.config({
	//Use node's special variable __dirname to
	//get the directory containing this file.
	//Useful if building a library that will
	//be used in node but does not require the
	//use of node outside
	baseUrl: __dirname,

	//Pass the top-level main.js/index.js require
	//function to requirejs so that node modules
	//are loaded relative to the top-level JS file.
	nodeRequire: require,
})

//foo and bar are loaded according to requirejs
//config, and if found, assumed to be an AMD module.
//If they are not found via the requirejs config,
//then node's require is used to load the module,
//and if found, the module is assumed to be a
//node-formatted module. Note: this synchronous
//style of loading a module only works in Node.
var foo = requirejs('foo')
var bar = requirejs('bar')

//Now export a value visible to Node.
module.exports = function () {}
```

#### Using the optimizer as a node module

The node module also exposes the RequireJS Optimizer as an optimize method for using the RequireJS optimizer via a function call instead of a command line tool:

Node 模块也暴露了 RequireJS 优化为优化用于使用该方法 RequireJS 优化器通过一个函数调用，而不是一个命令行工具：

```javascript
var requirejs = require('requirejs')

var config = {
	baseUrl: '../appDir/scripts',
	name: 'main',
	out: '../build/main-built.js',
}

requirejs.optimize(
	config,
	function (buildResponse) {
		//buildResponse is just a text output of the modules
		//included. Load the built file for the contents.
		//Use config.out to get the optimized file contents.
		var contents = fs.readFileSync(config.out, 'utf8')
	},
	function (err) {
		//optimization err callback
	}
)
```

This allows you to build other optimization workflows, like a web builder that can be used if you prefer to always develop with the "one script file included before the `</body>` tag" approach. The optimizer running in Node is fairly fast, but for larger projects that do not want to regenerate the build for every browser request, but just if you modify a script that is part of the build. You could use Node's fs.watchFile() to watch files and then trigger the build when a file changes.

这样，您就可以构建其他优化工作流，例如，如果您希望始终使用"标记之前包含一个脚本文件"的方法进行开发，则可以使用 Web 构建器。在 Node 中运行的优化器运行速度相当快，但是对于那些不想为每个浏览器请求重新生成构建文件的大型项目而言，只是您修改了构建文件中的脚本。您可以使用 Node 的 fs.watchFile()监视文件，然后在文件更改时触发构建。

#### Feedback

If you find you have a problem, and want to report it, use the r.js [GitHub Issues page](http://github.com/requirejs/r.js/issues).
