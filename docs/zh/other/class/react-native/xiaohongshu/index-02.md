# 02-环境搭建

## 开发环境介绍

https://reactnative.cn/docs/environment-setup

### 环境选择

* MACOS、windows、Linux
* Android IOS

### 开发环境搭建

* React
  * Node
  * watchman
  * vscode
* Native
  * jdk
  * AndroidStudio
  * SDK
  * 模拟器

## 安装 node 和 watchman

* brew install node
* brew install watchman

## 安装 VSCODE

[https://code.visualstudio.com/](https://code.visualstudio.com/)

## 安装JDK和AndroidStudio

### 安装 JDK

* HomeBrew 安装
  * `brew install adopopenjdk/openjdk/adoptopenjdk8`

* 官网下载（推荐）
  * [https://www.oracle.com/java/technologies/downloads/#java11](https://www.oracle.com/java/technologies/downloads/#java11)
  * 注意：如果是 m1 就选择 arm64 文件安装包
  * 如果是 intel 就选择 x64 文件安装包

### 安装 Android Studio

[https://developer.android.google.cn/studio?hl=zh-cn](https://developer.android.google.cn/studio?hl=zh-cn)

### 配置 SDK 和 Tools

preference => Languages & Frameworks => Android Sdk

## 配置环境变量

* 配置 sdk 环境变量

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

* 重新启动配置文件

  ```bash
  soruce ~/.zshrc
  ```

  

## 创建安卓模拟器

* 常规创建方式
  * DeviceManager => Create Device

### M1 芯片创建安卓模拟器

* 下载对应 SDK
  * SDK platform 勾选 Sv2 选项并下载
* 下载对应 SDK Tools
  * SDK Tools 勾选 Android Emulator、Android SDK Platform-Tools、底部三个 Layout Inspector 选项
* 创建模拟器
  * DeviceManager => Create Device 设备类型选择 phone, 屏幕尺寸随便选择，系统镜像选择 SV2 选项，一路 next 完成

## 创建新项目

* 初始化项目（最新 RN 版本）:推荐

  ```bash
  npx react-native init Demo
  ```

* 初始化项目（指定 RN 版本）

  ```bash
  npx react-native init Demo --version X.XX.X
  ```

### 开发安装项目依赖

* 安装 js 依赖
  * `npm install`
* 安装原生依赖
  * 用 android studio 打开 Demo/android 文件夹(注意之前下载过 jdk11或者更高，我们在 file => project structure 中需要选择 SDK location => gradle settings  => 选择对应的 jdk 版本 => 点击 ok 即可)
  * `gradle sync`

### 运行应用程序

* npm run start

  ![image-20231209201104438](./assets/image-20231209201104438.png)

* 然后输入 a

* 就可以在 android studio 的 模拟器中查看到相应界面了（前提打开 device manager中的模拟机运行起来）

![image-20231209201307595](./assets/image-20231209201307595.png)