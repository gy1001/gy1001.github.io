# 04-tsconfig.json 核心配置和系列相关问题

## 01: tsconfig,json 核心配置详讲-1

1. moduleResolution 是模块解析

* 模块解析是 typescript 编译器用何种方式来确定导入所指内容
* moduleResolution : "node" => 采用 node 模块解析的方式查找文件【从内层到最高目录的外层查找，import 引入的文件】
* moduleResolution: "classic" => 采用 classic 模块解析的方式查找文件【从外层到内层方式查找，查找 import 引入的文件】

2. outDir: 通过 tsc 编译后输出目录
3. 

## 02：tsconfig,json 核心配置详讲-2

## 03：tsconfig.json核心配置详解

## 04：容易被忽视的重要的 tsconfig.json核心配置详解

## 05：tsconfig.json 更多核心配置详解

## 06：tsconfig 配置——类型声明和声明文件归属+纠正被误导的问题

## 07：tsconfig 配置——多级路径简化问题设置

## 08：tsconfig 配置包含和继承

