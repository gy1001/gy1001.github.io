# 05-工程结构和React必备知识

## 01-工程目录结构

### 工程目录结构，了解关键文件作用

* inex.js、app.js
* package.json、package-lock.json
* babel.config.js、app.json
* node_modules
* android、ios

## 02-构建通用源码目录结构

> 新建 src 文件夹

* 职责清晰：每个目录划分都规定具体的职责
* 功能全面：包含 UI、数据、网络、常量、工具、环境等
* 独立解耦: 一级目录之间没有职责交叉和耦合

```tex
-- src
	-- modules
	-- assets
	-- components
	-- constants
	-- env
	-- hooks
	-- stores
	-- utils
	-- apis
	-- themes
```

## 03-package.json 全局大管家文件

* 基础字段：`name`、`version`、`private`
* 自定义脚本：`scripts`
* 包依赖: `dependecies`、`devDependencies`

## 04-入口函数、import、export

* index.js
* 自定义模块导出
* 使用自动以模块导入

src/utils/index.js

```js
export function test() {
  console.log('test...');
}

export function test2() {
  console.log('test2...');
}
```

index.js

```js
import {test, test2} from './src/utils';
test();
test2();
```

输出如下

![image-20231210143607069](./assets/image-20231210143607069.png)

## 05-class组件的标准写法和生命周期

### class 组件

* 有状态 state: 每次都是修改的同一个状态
* 基于生命周期的管理
* 面向对象的好处：易于理解，适合新手

### 函数式组件

* 无状态，每次刷新都是生成一个新的状态
* 基于状态变化的管理
* 函数式的好处：简洁、模板代码少，易于复用

### class 组件的标准写法和组件生命周期

src/components/ClassView.js

```js
import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
});

class ClassView extends React.Component {
  constructor(props) {
    console.log('constructor....');
    super(props);
  }
  componentDidMount() {
    console.log('componentDidMount....');\
  }
  componentWillUnmount() {
    console.log('componentWillUnmount...');
  }
  render() {
    console.log('render....');
    return <View style={styles.container} />;
  }
}

export default ClassView;
```

app.tsx

```tsx
import ClassView from './src/components/ClassView';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>121212</Text>
          <ClassView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

挂载组件时候的执行顺序

```txt
constructor....
render....
componentDidMount....
// 即将卸载前执行
componentWillUnmount...
```

### props 与 state 管理UI数据

### state 和 setState

src/components/ClassView.js

```js
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

class ClassView extends React.Component {
  constructor(props) {
    // const {name, age, level} = props;
    super(props);
    this.state = {
      address: '北京市北京市朝阳区',
    };
  }
  componentDidMount() {
    setTimeout(() => {
      // 更新 state 中的 address
      this.setState({
        address: '通州区万达广场',
      });
    }, 2000);
  }
  render() {
    const {name, age, level} = this.props;
    const {address} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>name: {name}</Text>
        <Text style={styles.text}>age: {age}</Text>
        <Text style={styles.text}>level: {level}</Text>
        <Text style={styles.text}>address: {address}</Text>
      </View>
    );
  }
}

export default ClassView;
```

app.tsx

```tsx
<ClassView name="唐僧" age="500" level="top" />
```

## 06-函数式组件的优势和常用 hook

### 函数式组件的3中写法

* 没有 this
* 没有 state, 需要使用 hook

src/components/FunctionView.js

```js
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

function FunctionView(props) {
  const {name, age, level} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {name}</Text>
      <Text style={styles.text}>age: {age}</Text>
      <Text style={styles.text}>level: {level}</Text>
    </View>
  );
}
export default functionView;
```

```js
export default (props)=>{
  
}
```

```js
export default const FunctionView = (props) => {
  
}
```

### props和 useState 管理 UI数据

src/components/FunctionView.js

```js
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

function FunctionView(props) {
  const {name, age, level} = props;
  const [address, setAddress] = useState('北京市北京市');

  //  useEffect 第二个参数为空数组时，会在第一次渲染后执行一次。。
  useEffect(() => {
    setTimeout(() => {
      setAddress('通州区万达广场');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {name}</Text>
      <Text style={styles.text}>age: {age}</Text>
      <Text style={styles.text}>level: {level}</Text>
      <Text style={styles.text}>address: {address}</Text>
    </View>
  );
}
export default FunctionView;
```

### 常用Hook: useState、useEffect、useRef、useWindowDimension、useColorScheme

#### 使用 useRef: 不推荐使用，更推荐通过改变数据，来自动更新视图，但是在某些场景下，更为便捷

```js
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  blueText: {
    color: 'blue',
  },
});

function FunctionView(props) {
  const {name, age, level} = props;
  const [address, setAddress] = useState('北京市北京市');
  const scrollViewRef = useRef(null);

  //  useEffect 第二个参数为空数组时，会在第一次渲染后执行一次。。
  useEffect(() => {
    setTimeout(() => {
      setAddress('通州区万达广场');
      scrollViewRef.current.scrollToEnd({animate: true});
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {name}</Text>
      <Text style={styles.text}>age: {age}</Text>
      <Text style={styles.text}>level: {level}</Text>
      <Text style={styles.text}>address: {address}</Text>
      <ScrollView ref={scrollViewRef}>
        <Text style={styles.blueText}>AAAA</Text>
        <Text style={styles.blueText}>BBBB</Text>
        <Text style={styles.blueText}>CCCC</Text>
        <Text style={styles.blueText}>DDDD</Text>
        <Text style={styles.blueText}>EEEE</Text>
        <Text style={styles.blueText}>FFFF</Text>
        <Text style={styles.blueText}>GGGG</Text>
        <Text style={styles.blueText}>HHHH</Text>
      </ScrollView>
    </View>
  );
}
export default FunctionView;
```

#### useWindowDimension

```js
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

function FunctionView(){
  const {width, height} = useWindowDimensions();
  console.log(width, height);
  
  return ()
}
```

结果

```tex
392.72727272727275 783.2727272727273
```

#### useColorScheme

```js
import { useColorScheme, } from 'react-native';

function FunctionView(){
  const colorScheme = useColorScheme();
  console.log('colorScheme:', colorScheme);
  
  return ()
}
```

结果: 

```txt
colorScheme: light // 白日模式， 如果是黑夜模式，就是 dark
```

## 07-JSX语法:高效开发源自于此

* 拆分渲染、内联样式与样式表、样式组合

* 标准写法和简略写法
* 条件渲染：三元表达式、列表渲染、数组渲染等

## 08-课后练习：计数器练习

* 计数器效果
* 使用函数式组件、setInterval 定时器实现演示效果

注意：闭包陷阱: 在useState中使用闭包，主要是因为useState的参数只会在组件挂载时执行一次。如果我们在useState中使用闭包，那么闭包中的变量值会被缓存，这意味着当我们在组件中更新状态时，闭包中的变量值不会随之更新。

[一文讲透 React Hooks 闭包陷阱](https://juejin.cn/post/7230819482012237861)

## 09-答案

方法1

```js
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

function TimerView() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 这里我们使用 setCount 的第一个参数来获取最新的count 值
      setCount(data => {
        return data + 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text>{count}</Text>;
}

export default TimerView;
```

方法2

```js
function TimerView() {
  const [count, setCount] = useState(0);
  // 因为声明了 count 依赖
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return <Text>{count}</Text>;
}
```



如果采用下面的方式，就会进入闭包陷阱

```js
function TimerView() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount( count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text>{count}</Text>;
}
```

