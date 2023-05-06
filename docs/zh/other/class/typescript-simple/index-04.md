# 04-TypeScript 语法进阶

[TypeScript配置文件官方文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

## 01: TypeScript中的配置文件

## 02: TypeScript中的配置文件

1. 上一节中，我们新建项目后，会运行`tsc --init`命令，然后在文件夹下就会生成一个`tsconfig.json`文件，这里就是`ts`的配置文件

2. 注意：

   * 运行`tsc xxx.ts`文件，把指定文件编译时**不会**读取`tsconfig.json`中的配置项，
   * 运行`tsc`时候，**会**根据`tsconfig.json`中的配置项进行编译
   * 使用`ts-node`命令，**会**根据`tsconfig.json`中的配置项进行编译

3. 文件配置项中`include`/`exlcude`/`files`说明：[官方文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

   ```json
   {
     "include": [],
     "exclude": [],
     "files": []
   }
   ```

4. 接着就是`compilerOptions`选项（以下列举部分）:[官方文档:编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

   | **选项**           | **类型** | **默认值** | **描述**                                                     |
   | ------------------ | -------- | ---------- | ------------------------------------------------------------ |
   | noImplicitAny      | boolean  | false      | 在表达式和声明上有隐含的 `any`类型时报错。                   |
   | strictNullChecks   | boolean  | false      | 在严格的 `null`检查模式下， `null`和 `undefined`值不包含在任何类型里，只允许用它们自己和 `any`来赋值（有个例外， `undefined`可以赋值到 `void`）。 |
   | rootDir            | string   |            | 仅用来控制输出的目录结构 `--outDir`                          |
   | outDir             | string   |            | 重定向输出目录。                                             |
   | incremental        | boolean  | true       | 增量编译                                                     |
   | allowJs            | boolean  | false      | 允许编译javascript文件。                                     |
   | checkJs            | boolean  | false      | 在 `.js`文件中报告错误。与 `--allowJs`配合使用。             |
   | noUnusedLocals     | boolean  | false      | 若有未使用的局部变量则抛错。                                 |
   | noUnusedParameters | boolean  | false      | 若有未使用的参数则抛错。                                     |
   |                    |          |            |                                                              |

   

   



