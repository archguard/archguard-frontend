# ArchGuard Frontend

[![CI](https://github.com/archguard/archguard-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/archguard/archguard-frontend/actions/workflows/ci.yml)
[![GitHub release](https://img.shields.io/github/v/release/archguard/archguard-frontend?logo=git&logoColor=white)](https://github.com/archguard/archguard-frontend/releases)
[![languages](https://img.shields.io/badge/language-typescript-blueviolet?logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js support](https://img.shields.io/badge/Node.js-18.x+-green?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/archguard/archguard-frontend?color=4D7A97&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-green?label=gitpod&logo=gitpod&logoColor=white)](https://gitpod.io/#https://github.com/archguard/archguard-frontend)

## Development

Node.js version: 16.x

## ArchGuard 3.0

- [x] custom Markdown parser 
  - [x] ProseMirror as **core** editor
  - [x] MonacoEditor as a **source code** editor
- [ ] paragraph dispatch server
  - [ ] graph dsl to graph
  - [x] model to table
  - [X] multiple notebook run
  - [x] notebook to server
  - [x] notebook return output to graph
- Connection 
  - [x] websocket 

### Tech decision (framework)

- language：TypeScript
- framework：
  - React
  - UMI
- graph engine: 
  - Antv/g6 for **Package** dependencies analysis
  - Cytoscape for **Class**, **Method** dependencies analysis
  - D3.js for custom layout in Dashboard
  - bizcharts for badsmell overview
  - Mermaid for Graph DSL
- Editor:
  - ProseMirror
  - Monaco Editor
- Build tool：yarn
- Test tool：jest

### Local setup

```
cd archguard
npm install
npm start
```

### Docker setup

```
cd archguard
docker build -t archguard-frontend:latest .
docker run -it --rm -p 3000:80 archguard-frontend:latest
```

## Graph Engine

- Antv/g6, for Package dependencies
  - with `ant-design/charts`
- Cytoscape, for Class & Method dependencies 
  - ext: `darge`, `cola`, `fcose`, ~~elk~~

License
---

@ 2019~2022 Thoughtworks. This code is distributed under the MIT license. See `LICENSE` in this directory.

