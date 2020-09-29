## 技术选型

语言：TypeScript
框架：React + Umijs + AntDesign

## 文件夹和文件命名规范
- `该文件/文件夹是否为组件` ？`首字母大写+驼峰命名` **:** `首字母小写+驼峰命名`
- 若存在子组件，则应该新建`components`文件夹放入
> 配置文件命名以 `.config.ts` 结尾。（例如：DemoComponent.config.ts）

## 脚手架使用
> 为了保证代码规范和提高开发便捷性，该项目定制了一个脚手架`arch-guard-cli`，请使用脚手架新建`组件`和`页面`

### 安装
```bash
npm install arch-guard-cli -g
```

### 常用命令(必须在项目的**src**目录下运行)
- 创建页面：`ag g p systemEvaluation/Demo 页面菜单名`
> 上述命令会在 `pages/systemEvaluation`文件夹下新建`Demo`页面，并且自动配置好`路由`和`菜单`（菜单名设置为最后一个参数：页面菜单名）
- 创建基础组件：`ag g c 组件名 -ba `
- 创建业务组件：`ag g c 组件名 -bu `

### 命令缩写解释
- `g =>  generate`
- `c => component` 
- `-ba => --basic `
- `-bu => --business`
 
## 编码规范
## 页面开发规范
- `pages` 存放所有了所有页面，页面的目录结构需要和`路由路径`保持一致。这样的好处是通过网页的`url`我们就能很快的找到对应的页面文件，例如`http://localhost:8080/systemEvaluation/Redundancy`，我们可以知道该页面存放于 `pages`目录下的`systemEvaluation`的文件夹内

## 组件开发规范
- 组件分为 基础组件（`Basic`） 和 业务组件（`Business`），分别对应 `components` 文件夹下的 `Basic` 和 `Business`文件夹
- 基础组件（Basic） 和 业务组件（Business）区别
  - 基础组件粒度最小，无法继续拆分
  - 业务组件基于 `基础组件`封装组合
- 命名规范
  - 基础组件（`Basic`） 以 简写`Ba` 开头，例如 `<BaXXX> </BaXXX>`
  - 业务组件（`Business`） 以 简写`Bu` 开头，例如 `<BuXXX> </BuXXX>`
  - 组件文件名不用加对应的前缀
  - 组件样式使用`BEM`手动加命名空间解决样式冲突问题，不建议使用`css module`,因为`css module`使用者无法覆盖样式

## vscode 设置文件


## 目录结构
- pages 页面
- components 公共组件
- api 后端请求
- models 全局ts类型定义
- hooks 全局逻辑复用
- umirc.ts 路由配置

## 依赖管理工具
yarn

### 安装 yarn
npm install -g yarn

## 安装依赖
yarn install

## 运行
yarn start

## 打包
yarn build
