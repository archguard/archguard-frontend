# ArchGuard

## 项目简介
代码分析的前端项目，实现代码分析的数据可视化
dependence_visual为主要项目，目前功能：依赖展示及配置管理

## 技术选型
- 开发语言：javascript
- 框架：React
- 代码规范：ESLint
- 依赖管理：yarn

## 本地构建
### 打包
执行 build.sh
### 创建镜像
docker build -t dependence_visual .
### 本地启动
cd ./dependence_visual
yarn install
yarn start

## 领域模型
- ClassDependences 类依赖
- MethodInvokesGraph 函数调用图
- MethodInvokesTable 函数调用表
- Config 配置

## 测试策略

## 技术架构

## 部署架构

## 外部依赖
- code-analysis-api
- code-analysis-configure


## 环境信息
线上环境：http://analysis-dev.archguard.org

## 编码实践
异常统一配置处理，提示出错信息


## FAQ
