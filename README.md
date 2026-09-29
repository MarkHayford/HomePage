# HomePage

暗色个人主页静态站点：玉色强调、中英切换、开源项目与奖项目录、项目详情页、文章页，以及一个轻量头像彩蛋页。

无构建步骤、无后端依赖。克隆后用任意静态服务器打开即可；也可 fork 后改成自己的作品集。

[![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## 目录

- [功能特性](#功能特性)
- [仓库结构](#仓库结构)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [改成自己的](#改成自己的)
- [部署说明](#部署说明)
- [贡献指南](#贡献指南)
- [安全须知](#安全须知)
- [许可证](#许可证)

## 功能特性

| 模块 | 能力 |
| --- | --- |
| **首页** | 介绍、技术栈轮播、奖项 / 作品 / 文章入口、联系方式 |
| **开源项目** | 可搜索筛选的项目列表 + 各项目详情页 |
| **奖项** | 按年份 / 赛事筛选的奖项目录，支持 PDF 证书 |
| **文章** | 文章列表与正文页 |
| **i18n** | 中 / 英切换（`?lang=` 或本地存储） |
| **彩蛋** | `meow/` 头像点击进入的轻量动画页 |

## 仓库结构

```text
index.html          首页
styles.css          全局样式（含自托管字体引用）
script.js           交互与 i18n 文案
catalog.js          项目 / 奖项 / 文章目录数据
beian.css           页脚备案徽章样式（可选）
assets/             头像、 OG 图、favicon、字体、图标
awards/             奖项列表页与证书 PDF
projects/           项目列表与各项目详情
articles/           文章列表与正文
meow/               头像彩蛋（帧动画 + 音频）
robots.txt          爬虫规则（请替换 example.com）
sitemap.xml         站点地图（请替换 example.com）
LICENSE             MIT
```

> 资源路径均为相对路径，不依赖任何外部个人站点或 CDN。  
> 本仓库**不包含**真实密钥或生产环境配置。

## 环境要求

- 任意静态文件服务器（或 `npx serve`）
- 现代浏览器（需支持 ES 模块级语法之外的常规 ES2018+ 与 CSS 变量）

无需 Node 构建、无需数据库。

## 快速开始

### 1. 获取源码

```bash
git clone https://github.com/MarkHayford/HomePage.git
cd HomePage
```

### 2. 本地预览

```bash
npx --yes serve .
```

浏览器打开提示的本地地址（通常是 `http://127.0.0.1:3000`）。也可用 Python：

```bash
python3 -m http.server 8080
```

### 3. 语言切换

- 地址栏加 `?lang=en` 或 `?lang=zh`
- 或使用页内语言切换；偏好会写入 `localStorage`

## 改成自己的

1. 替换 `assets/avatar.png`、`assets/favicon.png`、`assets/og.png`。
2. 编辑 `index.html`：名字、介绍、奖项摘要、项目卡片、联系方式。
3. 在 `catalog.js` / `projects/` / `awards/` / `articles/` 中增删条目与详情页。
4. 按需修改 `script.js` 内的 i18n 字符串。
5. 部署前把 `robots.txt` 与 `sitemap.xml` 里的 `https://example.com` 换成你的公网源站。

页内品牌名、文案与联系邮箱都可以整站替换；结构无需改动。

## 部署说明

把仓库根目录整棵静态树同步到任意静态托管即可，例如：

- nginx / Caddy 根目录
- GitHub Pages / Cloudflare Pages / Netlify / 对象存储静态网站

建议：

- 为 `styles.css` / `script.js` / `catalog.js` 配置合理缓存；改内容时可用文件名 hash 或查询参数刷新。
- 字体已自托管于 `assets/fonts/`，无需再拉第三方字体 CDN。
- `sitemap.xml` / Open Graph 若需要绝对 URL，请换成你的公网域名。

## 贡献指南

1. Fork 本仓库并创建特性分支
2. 保持密钥、本机 `.env`、私钥在仓库之外
3. 改 UI 时请同时检查中英文案（`script.js`）
4. 用静态服务器自测首页、列表页、详情页与彩蛋页
5. 通过 Pull Request 说明动机与测试步骤

Issue / PR 欢迎中英文。

## 安全须知

请勿提交或公开分发：

- 含真实密钥的 `.env` / 部署私密
- 私人证书、未授权的第三方资源账号
- 仅用于生产域名验证的校验文件（若你 fork 后自行加入）

发现疑似泄露请立即轮换凭证并开 Issue（勿在公开讨论中粘贴密钥）。

## 许可证

[MIT](./LICENSE)

---

维护者：Mark Hayford · 问题反馈请开 [Issues](https://github.com/MarkHayford/HomePage/issues)。
