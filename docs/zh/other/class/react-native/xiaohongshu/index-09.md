# 09-【小试牛刀-练习项目，账号密码本】巩固强化基础阶段知识

## 01：初始化项目和页面框架

- 新建并初始化工程：新建、安装、编译、运行

- 完成基础项目配置：名称、图标：在原生层进行修改

  ```xml
  // android/app/src/main/res/values/strings.xml: 这里是项目名称
  <resources>
      <string name="app_name">RNDemo</string>
  </resources>
  
  // 更改为
  <resources>
      <string name="app_name">账号管理</string>
  </resources>
  ```

  * 应用图标位置：：`/android/app/src/main/res`: hdpi、mdpi两个文件夹可以删除（适配的是以往的手机）

    ![image-20240107115845198](./assets/image-20240107115845198.png)

    * 在`xhdpi、xxhdpi、xxxhdpi` 文件夹下替换对应的 icon
    * 注意：这里修改了原生代码，所以需要重启终端命令运行，才会生效

- 完成基础页面框架：删除 demo 代码，重写主页标题栏

```jsx
// accountManager.js
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Home from '../modules/Home';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
});
export default function AccountManager() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        darkStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Home />
    </SafeAreaView>
  );
}

// modules/Home
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  titleLayout: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
export default () => {
  const renderTitle = () => {
    // 这里应该返回一个标题组件
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>标题</Text>
      </View>
    );
  };
  return <View style={styles.root}>{renderTitle()}</View>;
};
```

## 03：自定义封装添加账号弹窗

* 首页增加添加按钮，调起弹框
* 自定义添加账号弹框、封装事件、ref转发（预学）
* 实现弹框 UI

```jsx
// Home.js
import React, {useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import IconAdd from '../assets/images/icon_add.png';
import AddAccountModal from '../components/AddAccountModal';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  titleLayout: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  addBtn: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  iconAdd: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
});
export default () => {
  const renderTitle = () => {
    // 这里应该返回一个标题组件
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>账号管理</Text>
      </View>
    );
  };
  const addCountModalRef = useRef(null);
  return (
    <View style={styles.root}>
      {renderTitle()}
      <TouchableOpacity
        onPress={() => addCountModalRef.current.show()}
        style={styles.addBtn}
        activeOpacity={0.5}>
        <Image style={styles.iconAdd} source={IconAdd}></Image>
      </TouchableOpacity>
      <AddAccountModal ref={addCountModalRef}></AddAccountModal>
    </View>
  );
};

// AccountModal.js
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import IconClose from '../assets/images/icon_close_modal.png';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  subTitleTxt: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
  },
});
export default forwardRef(function AddAccountModal(props, ref) {
  const [modalVisible, setModalVisible] = useState(false); // 控制模态框显示的变量
  const [tabIndex, setTabIndex] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [accountCode, setAccountCode] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const show = () => {
    setModalVisible(true);
  };
  const hide = () => {
    setModalVisible(false);
  };
  // 将方法和属性暴露给父组件
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });
  const renderTitle = () => {
    const titleStyles = StyleSheet.create({
      layout: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      closeBtn: {
        position: 'absolute',
        right: 6,
      },
      iconClose: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={titleStyles.layout}>
        <Text style={titleStyles.titleText}>添加账号</Text>
        <TouchableOpacity style={titleStyles.closeBtn}>
          <Image style={titleStyles.iconClose} source={IconClose} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderType = () => {
    const typeStyles = StyleSheet.create({
      typesLayout: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      },
      tabItem: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeTab: {
        backgroundColor: '#007AFF',
      },
      leftTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#c0c0c0',
      },
      middleTab: {
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#c0c0c0',
      },
      rightTab: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: '#c0c0c0',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      tabText: {
        fontSize: 14,
        color: '#666',
      },
      activeText: {
        color: 'white',
      },
    });
    const typesArray = ['游戏', '平台', '银行卡', '其他'];
    return (
      <View style={typeStyles.typesLayout}>
        {typesArray.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setTabIndex(index)}
              key={index}
              style={[
                typeStyles.tabItem,
                index === 0 ? typeStyles.leftTab : '',
                index === typesArray.length - 1 ? typeStyles.rightTab : '',
                index !== 0 && index !== typesArray.length - 1
                  ? typeStyles.middleTab
                  : '',
                index === tabIndex ? typeStyles.activeTab : '',
              ]}>
              <Text
                style={[
                  typeStyles.tabText,
                  tabIndex === index ? typeStyles.activeText : '',
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderName = () => {
    const nameStyles = StyleSheet.create({
      textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
      },
    });
    return (
      <TextInput
        maxLength={20}
        value={accountName}
        onChangeText={text => {
          setAccountName(text || '');
        }}
        placeholder="请输入账户名称"
        style={nameStyles.textInput}></TextInput>
    );
  };

  const renderAccount = () => {
    const nameStyles = StyleSheet.create({
      textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
      },
    });
    return (
      <TextInput
        maxLength={20}
        value={accountCode}
        onChangeText={text => {
          setAccountCode(text || '');
        }}
        placeholder="请输入账号"
        style={nameStyles.textInput}></TextInput>
    );
  };

  const renderPassword = () => {
    const nameStyles = StyleSheet.create({
      textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
      },
    });
    return (
      <TextInput
        maxLength={20}
        value={accountPassword}
        onChangeText={text => {
          setAccountPassword(text || '');
        }}
        placeholder="请输入密码"
        style={nameStyles.textInput}></TextInput>
    );
  };

  const renderButton = () => {
    const styles = StyleSheet.create({
      button: {
        width: '100%',
        height: 40,
        backgroundColor: '#3050ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        borderRadius: 8,
      },
      saveText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
    });
    return (
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.saveText}>保存</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={hide}
      animationType="fade"
      transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.root}>
        <View style={styles.content}>
          {renderTitle()}
          <Text style={styles.subTitleTxt}>账号类型</Text>
          {renderType()}
          <Text style={styles.subTitleTxt}>账号名称</Text>
          {renderName()}
          <Text style={styles.subTitleTxt}>账号</Text>
          {renderAccount()}
          <Text style={styles.subTitleTxt}>密码</Text>
          {renderPassword()}
          {renderButton()}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});
```

## 04：使用UUID和AsyncStorage保存账号数据
