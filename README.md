# ArchGuard Frontend

[![CI](https://github.com/archguard/archguard-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/archguard/archguard-frontend/actions/workflows/ci.yml)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/archguard/archguard-frontend)

## Development

### Tech decision (framework)

- language：TypeScript
- framework：React, UMI
- graph engine: 
  - Antv/g6 for **Package** dependencies analysis
  - Cytoscape for **Class**, **Method** dependencies analysis
  - D3.js for custom layout in Dashboard
  - bizcharts for badsmell overview
- lint：ESLint
- build tool：yarn

### local setup

```
yarn install
yarn build
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

[ServiceMap graph](archguard/src/pages/servicesMap/graph) copy from ElasticSearch with SSPL license.

@ 2020 ~ Thoughtworks. This code is distributed under the MPL license. See `LICENSE` in this directory.

