## 技术选型

语言：TypeScript
框架：React + Umijs + AntDesign

## 编码规范

`pages` 存放所有了所有页面，页面层次结构需要尽量对其业务和导航菜单。例如，依赖分析在导航菜单中处于“分析工具”之下，因此文件结构应该是`pages/analysis/dependence`

组件拆分

> 组件主要分为 `逻辑组件(业务组件)` 和 `视觉组件(UI组件)`

- 逻辑组件，包含 API 请求、数据处理、用户流程控制逻辑等等
- 视觉组件，样式、布局的封装或者分离，不负责业务逻辑处理。通过 TypeScript 的类型定义来约束属性

组件文件组织

- 如果组件为单文件，则直接使用组件名对文件命名，不需要额外的目录。比如 `path/component.tsx` 而不是 `path/component/component.tsx`
- 如果组件有多个文件，比如包含样式，则将文件放在用组件名命名的目录下。组件文件则使用 `index.tsx`，使得在引入的时候能缩短路径。例如 `path/component/index.less` + `path/component/index.tsx` 引入时 `import Component from "path/component"`

命名规范：

由于存在 `index.tsx`、`help.md`、`config.ts` 等等小写文件，为了命名统一，均使用小写加 `-` 来命名文件。同时避免了采用驼峰时部分有歧义的命名，比如 `qr-code` 优于 `QrCode`、`QRCode`、`qrCode`，避免部分专业名词缩写命名时不规范问题

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
