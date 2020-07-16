## 技术选型

语言：TypeScript
框架：React + Umijs + AntDesign

## 命名规范

`pages` 存放所有了所有页面，页面层次结构需要尽量对其业务和导航菜单。例如，依赖分析在导航菜单中处于“依赖分析”之下，因此文件结构应该是`pages/analysis/dependence`

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
