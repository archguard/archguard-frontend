# ArchGuard Frontend

[![CI](https://github.com/archguard/archguard-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/archguard/archguard-frontend/actions/workflows/ci.yml)

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/archguard/archguard-frontend)

Todo

- [ ] C4
- [ ] Services Map
  - [ ] analysis frontend API
  - [ ] analysis backend API (Java)
  - [ ] import Swagger

## 技术选型

- 开发语言：javascript
- 框架：React, UMI
- 代码规范：ESLint
- 依赖管理：yarn

## 本地构建

```
yarn install
yarn build
```

## Docker 运行

```
cd archguard
docker build -t archguard-frontend:latest .
docker run -it --rm -p 3000:80 archguard-frontend:latest
```

License
---

@ 2020 ~ Thoughtworks. This code is distributed under the MPL license. See `LICENSE` in this directory.

