# 16-仿写小红书

## 01- 项目初始化

### 初始化项目

```bash
npx react-native init RedBookDemo
```

此时最终运行`npm run start` 选择 `a` => andorid 后可以在模拟器中看到如下界面

<img src="./assets/image-20240128181926650.png" alt="image-20240128181926650" style="zoom:50%;" />

### 修改应用姓名

RedBookDemo/android/app/src/main/res/values/strings.xml

```xml
// 修改为如下代码
<resources>
    <string name="app_name">小红书</string>
</resources>
```

也可以通过以下路径来修改 applicationId

`RedBookDemo/android/app/build.gradle`

```gradle
defaultConfig {
  applicationId "com.redbookdemo"
}
```

### 修改应用图标

路径：`RedBookDemo/android/app/src/main/res`

导入相关静态资源文件

* 新建 `RedBookDemo/src/assets` 文件夹，并把需要的文件放进去即可

## 02：项目配置 TS 和 AsyncStorage

### 安装 TS

* 安装 TS

  ```shell
  npm install --save-dev typescript
  ```

* 生成 tsconfig.json
  ```shell
  tsc --init
  ```

* 安装类型声明（众多）

  ```shell
  npm install --save-dev @types/react @types/react-native
  ```

 ### 安装 AsyncStorage

* 集成 async-storage
  * `@react-native-async-storage/async-storage`

* 保存数据：AsyncStorage.setItem()
* 读取数据：AsyncStorage.getItem()

新建`RedBookDemo/src/utils/Storage.ts` 文件，内容如下

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, value);
};

export const getData = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeData = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export const clearData = async () => {
  return await AsyncStorage.clear();
};
```

## 03：路由管理安装和介绍

### 集成 react-navigation

```shell
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-gesture-handler
npm install react-native-safe-area-context
npm install react-native-screens
```

### 构建导航栈

* 在 App.tsx 根节点构建导航栈
* 配置导航栈属性

### 代码内容如下

`app.tsx`

```jsx

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import PageA from './src/modules/PageA';
import PageB from './src/modules/PageB';
const Stack = createStackNavigator();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PageA1"
          screenOptions={{
            cardStyle: {elevation: 1},
          }}>
          <Stack.Screen
            name="PageA1"
            component={PageA}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PageB1"
            component={PageB}
            options={{...TransitionPresets.SlideFromRightIOS}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
```

`./src/modules/PageB`

```jsx
import React from 'react';
import {View, Text} from 'react-native';

export default () => {
  return (
    <View>
      <Text>Page B</Text>
    </View>
  );
};
```

`./src/modules/PageA`

```jsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const myHandler = () => {
    // if (na`vigation.canGoBack) {
    //   navigation.goBack();
    // }
    navigation.push('PageB1');
    // navigation.replace('PageB1');
  };
  return (
    <View>
      <Text>Page A</Text>
      <Button title="点击跳转" onPress={myHandler} />
    </View>
  );
};
```

## 04: 欢迎页面、登录页面

* 开发欢迎页面、并设置 3秒倒计时
* 开发登录页面，并设置 3秒倒计时
* 三页面连续跳转

设计图如下

![image-20240201115557703](./assets/image-20240201115557703.png)
