## 技术选型

语言：TypeScript
框架：React + Umijs + AntDesign

## 文件夹和文件命名规范
- 文件夹命名规范
  - `该文件夹内是否包含组件` ？`首字母大写+驼峰命名` **:** `驼峰命名`
- 文件命名规范
  - `该文件是否是组件` ？`首字母大写+驼峰命名`  **:** `驼峰命名`
> 配置文件命名以 .config.ts 结尾。（例如：IssuesAndSuggestion.config.ts）


## 编码规范

- `pages` 存放所有了所有页面，页面层次结构需要尽量对其业务和导航菜单。例如，依赖分析在导航菜单中处于“分析工具”之下，因此文件结构应该是`pages/analysis/dependence`
- 代码提交前，必须按照本项目`eslint规则`格式化

## 公共组件开发规范
- 组件分为 基础组件（`Basic`） 和 业务组件（`Business`），分别对应 `components` 文件夹下的 `Basic` 和 `Business`文件夹
- 基础组件（Basic） 和 业务组件（Business）区别
  - 基础组件粒度最小，无法继续拆分
  - 业务组件基于 `基础组件`封装组合
- 命名规范
  - 基础组件（`Basic`） 以 简写`Ba` 开头，例如 `<BaXXX> </BaXXX>`
  - 业务组件（`Business`） 以 简写`Bu` 开头，例如 `<BuXXX> </BuXXX>`
  - 组件文件名不用加对应的前缀
  - 组件样式使用`BEM`手动加命名空间解决样式冲突问题，不建议使用`css module`,因为`css module`使用者无法覆盖样式

### 路由规则

> 路由应和目录层级结构尽量一致，路由配置在 `umirc.ts` 文件中

- URL 传参时，如果是单个参数，则优先使用路径参数比如：`help/:name`
- 如果参数多于一个，使用 searchParmas，比如：`page/some/list?type=a&size=10&page=1`

## 目录结构

- pages 页面
- components 公共组件
- api 后端请求
- mock mock 数据

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
