# 13-【高手必学-memo与性能优化】掌握几种必备的memo应

## 01: memo与性能优化函数式组件和class组件拦截多余渲染

### memo 解决了什么问题

* 避免多余渲染
  * 函数式组件：React.memo(): 允许你的组件在 props 没有改变的情况下跳过重新渲染。[https://zh-hans.react.dev/reference/react/memo](https://zh-hans.react.dev/reference/react/memo)
  * class 组件：shouldComponentUpdate()
* 避免重复计算、重新创建对象

### memo与性能优化函数式组件

```jsx
// react.memo 示例如下

// infoView.jsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import MemoDemo from './MemoDemo';

export default () => {
  const [infoState, setInfoState] = React.useState({});
  const handleClick = () => {
    setInfoState({name: '张三', age: 18, gender: '男性'});
  };
  return (
    <View>
      <Text>Hello World</Text>
      <Button onPress={handleClick} title="点击我"></Button>
      <MemoDemo info={infoState}></MemoDemo>
    </View>
  );
};

// MemoDemo.jsx
import React from 'react';
import {View, Text} from 'react-native';

export default function MyComponent(props) {
  console.log('MyComponent重新渲染了');
  return (
    <View>
      <Text>姓名：{props.info.name}</Text>
      <Text>年龄：{props.info.age}</Text>
      <Text>性别：{props.info.gender}</Text>
    </View>
  );
}
```

以上文件最后的显示效果：当点击按钮时候，触发 info 属性的变更，结果会触发 MemoDemo 中的导出函数的执行，触发：MyComponent重新渲染了. 日志输出。当再次点击按钮时候，还是会触发此条log 输出，说明函数被重新执行了

但是我们发现即使点击按钮时候，设置父组件中 infoState 变量变为发生变化，仍然会触发子组件的渲染，显然这样就浪费了一些性能。

使用 React.memo 可以进行优化

```jsx
// MemoDemo.jsx
import React, {memo} from 'react';
import {View, Text} from 'react-native';

export default memo(
  function MyComponent(props) {
    console.log('MyComponent重新渲染了');
    return (
      <View>
        <Text>姓名：{props.info.name}</Text>
        <Text>年龄：{props.info.age}</Text>
        <Text>性别：{props.info.gender}</Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // 返回true时，组件将不会重新渲染
    // 返回false时，组件会重新渲染
    return JSON.stringify(prevProps.info) === JSON.stringify(nextProps.info);
  },
);
```

使用上述代码，点击按钮时候会触发函数执行，日志更新。但是后续在进行点击，并不会导致函数的执行，日志的输出。这样优化了一些性能。（只会针对有效的数据变更的重绘）

### class组件拦截多余渲染

```jsx
// MemoDemo2.jsx

import React from 'react';
import {View, Text} from 'react-native';

export default class MemoDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    // 返回true时，组件将不会重新渲染
    return JSON.stringify(this.props.info) !== JSON.stringify(nextProps.info);
  }
  render() {
    const {info} = this.props;
    console.log('MemoDemo重新渲染了');
    return (
      <View>
        <Text>姓名：{info.name}</Text>
        <Text>年龄：{info.age}</Text>
        <Text>性别：{info.gender}</Text>
      </View>
    );
  }
}
```

## 02: 使用useMemo缓存计算结果

### 避免重复创建对象

* useMemo 缓存数据：比如列表时候计算数据总和：[https://zh-hans.react.dev/reference/react/useMemo](https://zh-hans.react.dev/reference/react/useMemo)
* useMemo 缓存UI 渲染
* useCallback 缓存回调函数

> 官网资料如下
>
> * [跳过代价昂贵的重新计算](https://zh-hans.react.dev/reference/react/useMemo#skipping-expensive-recalculations)
> * [跳过组件的重新渲染](https://zh-hans.react.dev/reference/react/useMemo#skipping-re-rendering-of-components)
> * [记忆另一个 Hook 的依赖](https://zh-hans.react.dev/reference/react/useMemo#memoizing-a-dependency-of-another-hook)
> * [记忆一个函数](https://zh-hans.react.dev/reference/react/useMemo#memoizing-a-function)

有如下列表数据

```js
// src/constans/Data.js
export const SectionData = [
    {type: 'A', data: ['阿林', '阿强', '阿冬', '阿旺', '安可', '安庆', '艾青', 'Alex', ]},
    {type: 'B', data: ['柏树', '柏志', '伯父', '爸爸', '北星', '贝贝', '巴金', 'Blues', ]},
    {type: 'C', data: ['陈琳', '陈兵', '陈青青', '蔡小飞', '蔡小军', 'Candy', 'Clinla', 'CoCo', ]},
    {type: 'D', data: ['嗒嗒', '杜冰', '杜非', '豆瓣', '德德', 'Dity' ]},
    {type: 'F', data: ['冯小琴', '冯天强', '冯倩倩', 'Felix', ]},
    {type: 'G', data: ['哥哥', '姑姑', '嘎嘎', '鬼鬼', '隔壁老王', 'Groovy', ]},
    {type: 'H', data: ['哈哈', '呵呵', '黄强', '黄小超', '黄海', '胡彬', '胡丽丽', ]},
];

export const ListData = [
    {index: 1, name: '去菜场买菜', amount: 98, type: '食'},
    {index: 2, name: '王者荣耀充值', amount: 648, type: '玩'},
    {index: 3, name: '给楼下小黑买烤肠', amount: 12, type: '食'},
    {index: 4, name: '买过年衣服', amount: 465, type: '衣'},
    {index: 5, name: '慕课网买课程', amount: 599, type: '学'},
    {index: 6, name: '停车费', amount: 500, type: '行'},
    {index: 7, name: '家庭宽带费用', amount: 1200, type: '住'},
    {index: 8, name: '汽车加油', amount: 280, type: '行'},
    {index: 9, name: '和同学聚餐', amount: 300, type: '食'},
    {index: 10, name: '下个月房租', amount: 1000, type: '住'},
    {index: 11, name: '买过年衣服', amount: 465, type: '衣'},
    {index: 12, name: '慕课网买课程', amount: 599, type: '学'},
    {index: 13, name: '停车费', amount: 500, type: '行'},
    {index: 14, name: '家庭宽带费用', amount: 1200, type: '住'},
    {index: 15, name: '汽车加油', amount: 280, type: '行'},
];

export const ListData2 = [
    {index: 1, name: '去菜场买菜', amount: 198, type: '食'},
    {index: 2, name: '王者荣耀充值', amount: 248, type: '玩'},
    {index: 3, name: '给楼下小黑买烤肠', amount: 68, type: '食'},
    {index: 4, name: '买过年衣服', amount: 65, type: '衣'},
    {index: 5, name: '慕课网买课程', amount: 399, type: '学'},
    {index: 6, name: '停车费', amount: 350, type: '行'},
    {index: 7, name: '家庭宽带费用', amount: 1200, type: '住'},
    {index: 8, name: '汽车加油', amount: 480, type: '行'},
    {index: 9, name: '和同学聚餐', amount: 110, type: '食'},
    {index: 10, name: '下个月房租', amount: 600, type: '住'},
    {index: 11, name: '慕课网买课程', amount: 399, type: '学'},
    {index: 12, name: '停车费', amount: 350, type: '行'},
    {index: 13, name: '家庭宽带费用', amount: 1800, type: '住'},
    {index: 14, name: '汽车加油', amount: 480, type: '行'},
    {index: 15, name: '和同学聚餐', amount:96, type: '食'},
];
```

### 不用 useMemo 缓存时候的问题

> 如下页面，渲染了一个 list, 并且计算了一个总和属性
>
> 这里我们写了 consol.log
>
> * 当 renderItem 被重新执行时，就会打印： ”renderItem 被渲染了“
> * 当总和被重新计算时候，就会打印：”totalMoney被重新计算了“
> * 点击事件：触发的是与以上视图无关的变量

```jsx
// src/memo/listDemo.jsx
import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {ListData, ListData2} from '../../constants/Data';

export default function ListDemo() {
  const [selectFlag, setSelectFlag] = useState(false);
  const [flatListData, setFlatListData] = useState(ListData);

  const renderItem = ({item, index}) => {
    console.log('renderItem 被渲染了');
    const styles = StyleSheet.create({
      rootView: {
        flexDirection: 'row',
        padding: 10,
      },
    });
    return (
      <View style={styles.rootView}>
        <Text>索引：{index}</Text>
        <Text>金额：{item.amount}</Text>
        <Text>索引：{item.index}</Text>
        <Text>名字：{item.name}</Text>
        <Text>类型：{item.type}</Text>
      </View>
    );
  };

  const handleBtnClick = () => {
    setSelectFlag(!selectFlag);
    console.log('点击了按钮');
  };

  const totalMoney = () => {
    console.log('totalMoney被重新计算了');
    return flatListData.reduce((pre, item) => {
      return pre + item.amount;
    }, 0);
  };
  return (
    <View>
      <Text>选中flag: {selectFlag}</Text>
      <Button title="切换数据" onPress={handleBtnClick}></Button>
      <FlatList data={flatListData} renderItem={renderItem}></FlatList>
      <Text>总金额：{totalMoney()}</Text>
    </View>
  );
}
```

上述效果运行时候，会执行打印：renderItem 被渲染了、totalMoney被重新计算了(第一次页面渲染时候执行)

当我们点击按钮，触发组件内部的变量更新时，会发现同样触发了上述日志打印，显然消耗了一定的性能

* list 组件数据没有发生变化
* 数量总和变量也没有发生变化

但是上述视图都重新渲染了，下面使用 useMemo 来缓存数据

### 使用 useMemo 来缓存计算属性 

> 使用钩子函数 useMemo 来缓存计算后的数量总和
>
> 第一个参数是：要缓存计算值的函数。它应该是一个没有任何参数的纯函数，并且可以返回任意类型
>
> 第二个参数是函数中使用的响应式变量组成的数组

```jsx
// src/memo/listDemo.jsx
import React, {useState, useMemo} from 'react';


export default function ListDemo() {
  const totalMoney = useMemo(() => {
    console.log('totalMoney被重新计算了');
    return flatListData.reduce((pre, item) => {
      return pre + item.amount;
    }, 0);
  }, [flatListData]);
  
  return (
    <View>
      <Text>总金额：{totalMoney}</Text> // 注意使用 useMomo 包裹后返回的是是一个函数返回值
    </View>
  )
}
```

这时候我们运行后，进行观察

点击按钮触发变量更新时， totalMoney 函数中的日志：totalMoney被重新计算了 没有重新打印出来，说明计算属性进行了打印

那么更新 list 数据时候呢，也就是依赖数据有变化时候会重新执行吗？？？

```jsx
export default function ListDemo() {
  const handleBtnClick = () => {
    setSelectFlag(!selectFlag);
    console.log('点击了按钮');
    setFlatListData(ListData2); // 更新 List 数据
  };
}
```

再次点击按钮，我们可以发现 totalMoney 被重新计算了 被重新打印了，页面中的变量同步更新了，然后再去点击时候，发现同样不会再触发 totalMoney 的计算

### 使用 useMemo 来缓存UI 渲染

> 上述视图中列表数据一直有触发渲染，无论是更新数据，还是更新不相关的变量，显然也可以进行优化

点击按钮，我们先不触发列表数据的变化，看看效果

```jsx
export default function ListDemo() {
 
  const handleBtnClick = () => {
    setSelectFlag(!selectFlag);
    console.log('点击了按钮');
    // setFlatListData(ListData2);
  };
  
  const FlatListCom = useMemo(() => {
    console.log('FlatListCom被重新计算了');
    return <FlatList data={flatListData} renderItem={renderItem}></FlatList>;
  }, [flatListData]);
  
  return (
    <View>
       {FlatListCom}
    </View>
  )
}
```

此时页面渲染完毕后，我们去触发点击事件，可以看到 `console.log('FlatListCom被重新计算了');` 并没有执行，当然的，renderItem 中的打印同样是没有执行，节省了一部分开销

我们放开点击按钮后触发列表的更新

```jsx
 const handleBtnClick = () => {
    setSelectFlag(!selectFlag);
    console.log('点击了按钮');
    setFlatListData(ListData2);
  };
```

再次点击，就可以看到 `FlatListCom`重新执行，同样的其中的`renderItem` 函数也被执行了

由此就完成了 UI 渲染的缓存

### 使用 useCallback 缓存回调函数

> 假使我们目前增加以下功能，列表中每一列都要增加点击事件，那么我们就会修改为如下代码

```jsx
import {TouchableOpacity} from "ract-native"

export default function ListDemo() {
  const renderItem = ({item, index}) => {
    console.log('renderItem 被渲染了');
    const styles = StyleSheet.create({
      rootView: {
        flexDirection: 'row',
        padding: 10,
      },
    });
    const handleItemClick = (item, index) => {
      console.log('点击了第', index, '个item', item);
    };
    return (
      <TouchableOpacity
        style={styles.rootView}
        onPress={() => handleItemClick(item, index)}>
        <Text>索引：{index}</Text>
        <Text>金额：{item.amount}</Text>
        <Text>索引：{item.index}</Text>
        <Text>名字：{item.name}</Text>
        <Text>类型：{item.type}</Text>
      </TouchableOpacity>
    );
  };
  
  
  return ...
}
```

这里其实每次 renderItem 重新渲染时候都会重新生成一个 onPress 对应的函数，也会重新生成 handleItemClick 

如果我们把 handleItemClick 更改为以下方式呢

```jsx
import {useCallback} from 'react';

export default function ListDemo() {
  
  // 注意：使用 useCallback 必须在组件内部第一层，
  const handleItemClick = useCallback((item, index) => {
    console.log('点击了第', index, '个item', item);
  }, []);
  
  const renderItem = ({item, index}) => {
    // 如果在这里生成，就会提示报错：Error: Invalid hook call. Hooks can only be called inside of the body of a function component. 
    // const handleItemClick = useCallback((item, index) => {}, [])
    console.log('renderItem 被渲染了');
    const styles = StyleSheet.create({
      rootView: {
        flexDirection: 'row',
        padding: 10,
      },
    });

    return (
      <TouchableOpacity
        style={styles.rootView}
        onPress={() => handleItemClick(item, index)}>
        
      </TouchableOpacity>
    );
  };
}
```

这里是否觉得已经缓存了回调函数，其实并没有，为什么呢？？？

因为 renderItem 每次渲染时候，就会触发组件的重新渲染那,而`onPress={() => handleItemClick(item, index)}` 这里可以看到 onPress 对应的是一个 `{}` ，每次同样会重新渲染，那么该如何更改呢？并且保证传入参数对应

```jsx
export default function ListDemo() {
  // 把 handleItemClick 变成一个高阶函数
  const handleItemClick = useCallback(
    (item, index) => () => {
      console.log('点击了第', index, '个item', item);
    },
    [],
  );
  
  const renderItem = ({item, index}) => {
    
    return (
      <TouchableOpacity
        style={styles.rootView}
        onPress={handleItemClick(item, index)}>
      </TouchableOpacity>
    );
  }
}
```

这样每次生成的 onPress 函数都会优先使用缓存中的

## 03：Hermes 引擎

> [官方地址之hermes](https://reactnative.cn/docs/next/hermes)

> 目前版本默认开启

* 提升启动速度
* 压缩包体积

### Android

编辑 `android/app/gradle.properties` 文件并修改`hermesEnabled`项为 true：

```text
# 使用此属性启用或禁用 Hermes JS 引擎。
# 如果设置为false，则将使用 JSC引擎。
hermesEnabled=true
```

备注：此属性自 React Native 0.71 版本开始才支持，如果在`gradle.properties` 文件中找不到，请在网站顶部导航条选择你当前的 React Native 版本，切换到那个版本的文档查看相应的操作。

