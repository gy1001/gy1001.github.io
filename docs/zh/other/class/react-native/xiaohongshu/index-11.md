# 11-【进阶学习-Context上下文】深刻理解解耦的精髓

## 01: Context上下文介绍和演示

### Context 解决了什么问题

> 当一个应用中有多个组件需要访问同一个数据时，如果采用**传统的逐层传递属性**的方式，可能会导致组件结构嵌套过深，代码可读性和维护性较差。而且，如果需要更新共享数据，也需要逐个组件进行更新，比较繁琐。
>
> `Context`提供了一种在 **组件树中跨组件传递数据的方式** ，它允许组件通过订阅`Context`来获取共享数据，而不必关心数据的来源和更新。
>
> 使用`Context`，可以将共享数据存储在一个`Provider`组件中，并通过`Consumer`组件来订阅和使用这些数据。当共享数据发生变化时，所有订阅了该数据的组件都会自动更新。
>
> `Context`还提供了一些有用的特性，如传递默认值、支持传递多个值以及可组合性等。
>
> 需要注意的是，使用`Context`时要谨慎处理，避免滥用导致性能问题。对于简单的数据共享，也可以考虑其他更简单的方式，如使用 props 或状态提升。只有在确实需要跨多个组件共享数据且数据更新频繁时，才考虑使用`Context`。

### context 应用场景

应用场景包括但不限于以下几种情况：

1. **全局状态管理**：当应用中需要在多个组件之间共享状态时，可以使用`Context`来进行全局状态管理。通过将状态存储在`Context`中，所有订阅该`Context`的组件都能够获取到最新的状态。
2. **主题定制**：如果应用支持用户自定义主题，例如更改颜色、字体等，可以使用`Context`来传递主题相关的数据。这样，不同的组件可以根据当前的主题显示相应的样式。
3. **国际化**：应用可能需要支持多种语言。通过使用`Context`，可以在应用的顶层提供语言配置，然后让其他组件根据当前的语言环境显示相应的文本。
4. **权限管理**：在一些应用中，不同的用户可能具有不同的权限级别。通过使用`Context`，可以在应用的某个位置（如路由守卫）管理和传递权限信息，以便其他组件根据用户的权限进行相应的操作。
5. **数据缓存**：当某些数据需要在多个组件之间共享，并且这些数据的获取比较耗时或资源密集时，可以使用`Context`来缓存数据。这样，已经获取到数据的组件可以直接从`Context`中获取，而不必再次请求。
6. **第三方库集成**：某些第三方库可能需要在应用的多个组件之间共享配置或数据。通过使用`Context`，可以方便地将第三方库的配置传递到相关组件中。

需要注意的是，使用`Context`时要谨慎考虑数据的范围和更新方式，避免产生不必要的性能开销。对于一些简单的数据共享需求，也可以考虑使用其他方式，如`props`或状态提升。

这些只是`Context`的一些常见应用场景，具体的使用方式取决于你的项目需求和架构。

## 02: 实例演示，应用主题配置

* 分析实现效果，思考传统实现思路及问题
* 对比 Context 实现方式，体会 Context 的简洁和解耦
* 使用 state 维护动态 Context 值

> 以下示例中我们使用两层传递，当然其实也可以使用三层，四层，因为 context 本来就是为了解决多层传递的问题

1. 创建 src/context/ThemeContext.js 文件, 内容如下

   ```jsx
   import {createContext} from 'react';
   
   export const ThemeContext = createContext('dark');
   ```

2. 书写父级页面

   > 有一个按钮，点击时候，会进行样式状态的切换，并提供给 context

   ```jsx
   // RootView.jsx
   import React, {useState} from 'react';
   import {View, Button, StyleSheet} from 'react-native';
   import PageView from './PageView';
   import {ThemeContext} from '../context/ThemeContext';
   export default () => {
     const styles = StyleSheet.create({
       root: {
         width: '100%',
         height: '100%',
       },
       btnView: {
         with: '100%',
         alignItems: 'center',
         marginTop: 20,
         position: 'absolute',
         top: 0,
         left: 20,
         zIndex: 10,
       },
     });
     const [theme, setTheme] = useState('dark');
     const toggleTheme = () => {
       setTheme(theme === 'dark' ? 'light' : 'dark'); // 切换主题
     };
     return (
       <ThemeContext.Provider value={theme}>
         <View style={styles.root}>
           <View style={styles.btnView}>
             <Button onPress={toggleTheme} title="切换主题"></Button>
           </View>
           <PageView></PageView>
         </View>
       </ThemeContext.Provider>
     );
   };
   ```

3. 书写子级（或者多写几层均可，这里为了简单，只写了子级）

   > 这里准备了两套样式，一个 lightStyles，一个 darkStyles，从 context 中取出样式后，做判断处理，来用哪一套

   ```jsx
   // PageView.js
   import React, {useContext} from 'react';
   import {StyleSheet, Text, View, Image} from 'react-native';
   import AvatarIcon from '../assets/images/default_avatar.png';
   import {ThemeContext} from '../context/ThemeContext';
   
   export default () => {
     const lightStyles = StyleSheet.create({
       root: {
         width: '100%',
         height: '100%',
         alignItems: 'center',
         paddingTop: 50,
       },
       img: {
         width: 100,
         height: 100,
         borderRadius: 50,
       },
       title: {
         fontWeight: 'bold',
         fontSize: 20,
         marginTop: 20,
       },
       desc: {
         width: '80%',
         backgroundColor: '#DEB887',
         paddingHorizontal: 20,
         paddingVertical: 10,
         marginTop: 20,
         borderRadius: 10,
         color: '#fff',
       },
     });
     const darkStyles = StyleSheet.create({
       root: {
         width: '100%',
         height: '100%',
         alignItems: 'center',
         paddingTop: 50,
         backgroundColor: '#333',
       },
       img: {
         width: 100,
         height: 100,
         borderRadius: 50,
       },
       title: {
         fontWeight: 'bold',
         fontSize: 20,
         marginTop: 20,
         color: 'white',
       },
       desc: {
         width: '80%',
         backgroundColor: '#999',
         paddingHorizontal: 20,
         paddingVertical: 10,
         marginTop: 20,
         borderRadius: 10,
         color: '#fff',
       },
     });
     const theme = useContext(ThemeContext);
     const styles = theme === 'dark' ? darkStyles : lightStyles;
     return (
       <View style={styles.root}>
         <Image source={AvatarIcon} style={styles.img}></Image>
         <Text style={styles.title}>个人信息介绍</Text>
         <Text style={styles.desc}>
           各位产品经理大家好，我是个人开发者，我学习 RN
           两年半了，我喜欢安卓、RN、鸿蒙。
         </Text>
       </View>
     );
   };
   ```

4. 效果如下

   这是dark 模式下

   ![image-20240118223921908](./assets/image-20240118223921908.png)

   这是 light 模式下

   ![image-20240118223954699](./assets/image-20240118223954699.png)

## 03：Context 内容小结

### 使用Context 的思考

* 因为 Context 本质上就是全局变量，大量使用 Context 会导致组件失去独立性，使组件复用性变差
* 对于常规的组件间传值，可优先使用组件组合、状态管理、单例导出等方式，不要过度使用 Context
