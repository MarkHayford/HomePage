"use strict";

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;

  /* ---------- i18n ---------- */
  const LANG_KEY = "0nyx-lang";
  const I18N = {
    zh: {
      "lang.toggle": "切换为英文",
      "nav.about": "关于",
      "nav.awards": "奖项",
      "nav.work": "作品",
      "nav.articles": "文章",
      "nav.contact": "联系",
      "nav.main": "主导航",
      "nav.mobile": "移动端导航",
      "nav.open": "打开导航",
      "nav.close": "关闭导航",
      "nav.scrim": "关闭导航",
      "skip.about": "跳到关于",
      "skip.project": "跳到项目",
      "skip.list": "跳到列表",
      "skip.article": "跳到文章",
      "brand.home": "0Nyx 首页",
      "hero.status": "个人作品展示",
      "hero.role": "全栈开发者 · Full-stack developer",
      "hero.about": "关于",
      "hero.lede": "目前就读于内蒙古师范大学计算机科学技术学院软件工程专业，2025 级。做 Web、移动端和 AI 方向的项目，从后端、数据到界面，再到部署上线，都能够独立完成。",
      "hero.viewWork": "查看作品",
      "hero.contactMe": "联系我",
      "hero.avatarAlt": "0Nyx 的头像",
      "hero.easterTitle": "彩蛋：月薪喵",
      "hero.easterAria": "打开彩蛋：月薪喵",
      "hero.scroll": "向下滚动",
      "hero.stack": "常用语言和工具",
      "term.aria": "交互式终端，输入 help 查看可用命令",
      "term.inputAria": "终端命令输入，输入 help 查看命令，Tab 补全，上下方向键翻历史",
      "term.tip": "tip: 输入 help 查看命令",
      "awards.title": "奖项",
      "awards.year": "年份",
      "awards.event": "赛事",
      "awards.place": "名次",
      "awards.cert": "证书",
      "awards.more": "更多奖项",
      "awards.eventName": "中国高校计算机大赛 · AIGC 创新赛",
      "awards.placeName": "华北赛区二等奖",
      "awards.viewCert": "查看证书",
      "awards.pageTitle": "奖项",
      "awards.lede": "拿过的都在这儿。可以搜赛事，也可以按年份和名次筛。",
      "awards.search": "搜索奖项",
      "awards.searchPh": "搜赛事、名次…",
      "awards.empty": "没有匹配的奖项。",
      "awards.second": "二等奖",
      "work.title": "开源项目",
      "work.more": "更多项目",
      "work.stack": "技术栈",
      "work.crumb": "开源项目",
      "work.listene.desc": "面向英语学习的 Android AI Agent。生成听力素材与练习卡片，支持精听和错因复盘。",
      "work.mqlt.title": "蒙企链探",
      "work.mqlt.tag": "大创赛 / 全栈",
      "work.mqlt.desc": "内蒙古食品产业研学平台。预约、导览打卡、成果沉淀，再接到积分商城和运营后台。",
      "work.homepage.tag": "个人主页 / 开源",
      "work.homepage.desc": "这个站的源码。暗色页面、项目列表和详情页，喜欢的话可以直接拿去改。",
      "work.equa.title": "方程剧场",
      "work.equa.tag": "Godot / 3D 物理",
      "work.equa.desc": "在 3D 实验室里搭物理场景，改参数看运动，再对照公式。目前是概念版。",
      "work.pill": "概念版",
      "articles.title": "文章",
      "articles.more": "更多文章",
      "articles.read": "阅读文章",
      "articles.emptyAria": "文章占位",
      "articles.wasabi.status": "对象存储",
      "articles.wasabi.title": "性价比超高的对象储存-Wasabi",
      "articles.wasabi.desc": "流量不收费，请求也不收费，一个月最低按 1 TB 算，6.99 美元一个月。新人免费试用 30 天。实测下载速度最高能到 30 MB/s 左右。",
      "articles.pageTitle": "文章",
      "articles.lede": "写过的都在这儿。可以搜标题，也可以按标签筛。",
      "articles.search": "搜索文章",
      "articles.searchPh": "搜标题、标签…",
      "articles.empty": "没有匹配的文章。",
      "articles.storage": "对象存储",
      "contact.line1": "想聊技术",
      "contact.line2": "可以直接写信。",
      "contact.lede": "对某个项目有问题，或只是想交流，发邮件就好。",
      "contact.copy": "复制邮箱",
      "contact.social": "社交链接",
      "contact.wechat": "微信 · ITGao06",
      "footer.links": "站点链接",
      "copy.ok": "已复制",
      "copy.email": "邮箱已复制",
      "copy.wechat": "微信号已复制",
      "copy.fail": "复制失败，请手动复制",
      "catalog.all": "全部",
      "catalog.fullstack": "全栈",
      "catalog.wip": "开发中",
      "catalog.home": "首页",
      "catalog.projectsTitle": "开源项目",
      "catalog.projectsLede": "全部项目都在这儿。可以搜名字，也可以按标签筛。",
      "catalog.searchProjects": "搜索项目",
      "catalog.searchProjectsPh": "搜名字、技术栈…",
      "catalog.emptyProjects": "没有匹配的项目。",
      "meta.homeTitle": "0Nyx — 全栈开发者",
      "meta.homeDesc": "0Nyx，个人开发者。这里放我在 Web、移动端和 AI 方向做过的项目。",
      "meta.projectsTitle": "开源项目 - 0Nyx",
      "meta.projectsDesc": "0Nyx 的开源项目列表。可以按名字、技术栈搜索和筛选。",
      "meta.awardsTitle": "奖项 - 0Nyx",
      "meta.awardsDesc": "0Nyx 的奖项列表。可以按年份、赛事和名次搜索筛选。",
      "meta.articlesTitle": "文章 - 0Nyx",
      "meta.articlesDesc": "0Nyx 的文章列表。可以按标题、标签搜索和筛选。",
      "meta.listeneTitle": "ListenE - 0Nyx",
      "meta.listeneDesc": "面向英语学习的 Android AI Agent。生成听力素材与练习卡片，支持精听和错因复盘。",
      "meta.mqltTitle": "蒙企链探 - 0Nyx",
      "meta.mqltDesc": "内蒙古食品产业研学平台。预约、导览打卡、成果沉淀，再接到积分商城和运营后台。",
      "meta.homepageTitle": "HomePage - 0Nyx",
      "meta.homepageDesc": "这个站的源码。暗色页面、项目列表和详情页，喜欢的话可以直接拿去改。",
      "meta.equaTitle": "方程剧场 - 0Nyx",
      "meta.equaDesc": "在 3D 实验室里搭物理场景，改参数看运动，再对照公式。目前是概念版。",
      "meta.wasabiTitle": "性价比超高的对象储存-Wasabi - 0Nyx",
      "meta.wasabiDesc": "Wasabi 流量不收费，请求也不收费，一个月最低按 1 TB 算，6.99 美元一个月。新人免费试用 30 天。实测下载速度最高能到 30 MB/s 左右。",
      "p.role": "角色",
      "p.status": "状态",
      "p.year": "年份",
      "p.date": "日期",
      "p.type": "类型",
      "p.minFee": "最低月费",
      "p.indie": "独立开发",
      "p.indieFull": "独立全栈",
      "p.public": "公开仓库",
      "p.concept": "概念版",
      "p.recommend": "推荐",
      "p.github": "GitHub 仓库",
      "p.mirror": "打不开 GitHub？直接下载",
      "p.openRepo": "打开仓库",
      "p.what": "这个项目做什么",
      "p.did": "自己做了什么",
      "p.stack": "技术栈",
      "listene.lede": "一个面向英语学习的 Android AI Agent。把听力生成、练习卡片和错因复盘收进可持续的工作区。",
      "listene.p1": "ListenE 不是题库 App。用户用自然语言提出学习需求，Agent 生成听力素材、练习卡片和音频，再把过程沉淀进工作区。",
      "listene.p2": "客户端是 Kotlin 与 Jetpack Compose。后端用 NestJS 和 PostgreSQL 管会话、卡片、进度和 TTS 生成。",
      "listene.b1": "自己写 Android 客户端：聊天、卡片练习、精听回放、词句复盘。",
      "listene.b2": "自己搭 NestJS 后端：听力生成、卡片契约、学习工作区和进度。",
      "listene.b3": "把大模型和 TTS 接到真实学习流程里，而不是停在演示对话。",
      "listene.bubble1": "生成一段雅思听力练习",
      "listene.bubble2": "已生成 · 对话 + 5 题 + 音频",
      "mqlt.lede": "大学生创新创业大赛项目。把内蒙古食品企业资源做成可预约、可导览打卡、可沉淀成果的研学闭环。",
      "mqlt.p1": "蒙企链探面向内蒙古食品产业研学。学生端是 UniApp X 微信小程序，运营后台是 Vue 3，后端是 NestJS、Prisma 和 PostgreSQL。",
      "mqlt.p2": "完整链路包括研学预约、现场导览打卡、知识任务、成果档案、积分成长、文创商城和权限后台。",
      "mqlt.b1": "设计并实现研学预约、打卡、任务、证书和积分兑换。",
      "mqlt.b2": "同时做学生端小程序、运营后台和后端数据模型。",
      "mqlt.b3": "自己完成部署和联调，把小程序、后台和后端接到同一套接口上。",
      "mqlt.canvas": "蒙企链探研学运营数据看板示意图",
      "mqlt.preview": "研学项目示意",
      "mqlt.m1": "研学项目",
      "mqlt.m2": "本月打卡",
      "mqlt.m3": "成果档案",
      "mqlt.trend": "打卡趋势",
      "mqlt.days": "近 7 日",
      "mqlt.live": "实时动态",
      "mqlt.a1": "示例路线",
      "mqlt.a2": "成果提交",
      "mqlt.a3": "学习记录",
      "mqlt.done": "已完成",
      "mqlt.pending": "待审核",
      "hp.lede": "这个网站本身的源码。静态 HTML / CSS / JS，没有框架。喜欢这个设计的话，可以直接下载改成自己的。",
      "hp.p1": "这是 0nyx.cn 个人主页的源码。首页介绍、奖项、开源项目列表、项目详情页和技术栈轮播都在这个仓库里。",
      "hp.p2": "静态站，没有构建步骤。资源用相对路径，下载后就能本地打开。喜欢这个设计的话，可以直接 fork 或下载后改成自己的。",
      "hp.b1": "自己做完整页面结构、样式和交互，包括项目列表和详情页。",
      "hp.b2": "把源码整理成可直接下载复用的静态仓库。",
      "hp.b3": "字体、头像和页面资源都放在仓库里，不依赖外部站点也能跑。",
      "equa.kicker": "Godot / 概念版",
      "equa.lede": "Equamotion。在 3D 实验室里把力学过程摆出来看，改参数，对照公式。目前是概念版。",
      "equa.p1": "方程剧场想让力学不再停在纸面。走进一个 3D 实验室，摆出场景，改参数，看运动怎么变，再和公式对上。",
      "equa.p2": "现在还是概念版，先把「能走进去、能搭场景、能对照公式」这条主路径立住。",
      "equa.b1": "用 Godot 搭第一人称 3D 实验室。",
      "equa.b2": "能生成刚体场景，并改物理参数。",
      "equa.b3": "把运动过程和公式放在同一空间里对照。",
      "equa.note": "源码尚未公开。需要了解细节可以直接联系我。",
      "equa.canvas": "方程剧场第一人称实验室示意动画",
      "wasabi.kicker": "对象存储 / CDN",
      "wasabi.lede": "Wasabi 流量不收费，请求也不收费，一个月最低按 1 TB 算，6.99 美元一个月。新人免费试用 30 天。实测下载速度最高能到 30 MB/s 左右。",
      "wasabi.h1": "为啥推荐",
      "wasabi.p1": "别的对象存储，流量要钱，请求也要钱。文件一多，月底账单就难看。Wasabi 跟 S3 兼容，流量和请求都不管，就按你存了多少收。",
      "wasabi.p1html": "别的对象存储，流量要钱，请求也要钱。文件一多，月底账单就难看。<a href=\"https://wasabi.com/\" rel=\"noopener\" target=\"_blank\">Wasabi</a> 跟 S3 兼容，流量和请求都不管，就按你存了多少收。",
      "wasabi.p2": "新注册能免费试用 30 天，先传点东西试试。官网在 wasabi.com。",
      "wasabi.p2html": "新注册能免费试用 30 天，先传点东西试试。官网在 <a href=\"https://wasabi.com/\" rel=\"noopener\" target=\"_blank\">wasabi.com</a>。",
      "wasabi.h2": "怎么收费",
      "wasabi.p3": "一个月最低按 1 TB 算，6.99 美元。你只存了 200 GB，也按 1 TB 收。超过 1 TB 还是这个价，多 1 TB 再加 6.99。",
      "wasabi.b1": "200 GB：6.99 美元",
      "wasabi.b2": "1 TB：6.99 美元",
      "wasabi.b3": "2 TB：13.98 美元",
      "wasabi.b4": "3 TB：20.97 美元",
      "wasabi.p4": "文件传上去没满 90 天就删，也按 90 天收费。拿新文件把旧的盖掉，一样。满 90 天后再删，这条就不算了，按你实际还存着的量收。别拿它当临时盘，长期放着更合适。",
      "wasabi.h3": "有哪些区域",
      "wasabi.p5": "北美有弗吉尼亚、得克萨斯、俄勒冈，加拿大还有多伦多。欧洲是阿姆斯特丹和伦敦。亚太是东京、新加坡、悉尼。挑近的就行。",
      "wasabi.h4": "桶不能随便公开",
      "wasabi.p6": "Wasabi 默认不让把桶设成公开的，怕被人拿去乱传东西。真要把桶改成公开，得发邮件提工单，等他们开。",
      "wasabi.h5": "挂个免费 EdgeOne",
      "wasabi.p7": "不一定非要把桶改公开。前面挂腾讯免费的 EdgeOne，用密钥回源 Wasabi。外面走 CDN，桶还是私有的，文件照样能打开。",
      "wasabi.p7html": "不一定非要把桶改公开。前面挂腾讯免费的 <a href=\"https://cloud.tencent.com/product/teo\" rel=\"noopener\" target=\"_blank\">EdgeOne</a>，用密钥回源 Wasabi。外面走 CDN，桶还是私有的，文件照样能打开。",
      "wasabi.p8": "国内还有节点，缓存一下会快一些。我这边实测下载速度最高能到 30 MB/s 左右。个人站用免费计划够了，流量真爆了再说。",
      "wasabi.p9": "价格和试用规则以后可能会变，下单前看一眼官网：Wasabi 价格、EdgeOne。",
      "wasabi.p9html": "价格和试用规则以后可能会变，下单前看一眼官网：<a href=\"https://wasabi.com/pricing\" rel=\"noopener\" target=\"_blank\">Wasabi 价格</a>、<a href=\"https://cloud.tencent.com/product/teo\" rel=\"noopener\" target=\"_blank\">EdgeOne</a>。",
      "wasabi.official": "官网",
      "wasabi.back": "返回文章",
      "term.help": "查看可用命令",
      "term.helpHead": "可用命令：",
      "term.helpMore": "还有一些经典命令也能用：ls / cat / echo / pwd / date …",
      "term.helpHint": "Tab 补全 · ↑↓ 历史",
      "term.aboutMe": "关于我",
      "term.about1": "我是 0Nyx，全栈开发者。",
      "term.about2": "目前就读于内蒙古师范大学计算机科学技术学院软件工程专业，2025 级。",
      "term.about3": "做 Web、移动端和 AI 方向的项目，从后端、数据到界面，再到部署上线，都能够独立完成。",
      "term.about4": "奖项：2026 中国高校计算机大赛 AIGC 创新赛 · 华北赛区二等奖",
      "term.skills": "技术栈",
      "term.projects": "开源项目",
      "term.status": "站点状态",
      "term.contact": "联系方式",
      "term.open": "打开站点",
      "term.meow": "像素小猫",
      "term.clear": "清屏（Ctrl+L）",
      "term.who": "我是谁",
      "term.helpOpen": "打开站点（open 查看列表）",
      "term.cat": "一只像素小猫",
      "term.projectsHint": "（彩蛋藏在头像里，试试 meow）",
      "term.contactHint": "想交流技术的话，欢迎发邮件。",
      "term.openUsage": "用法：open <site>",
      "term.openSites": "可用站点：",
      "term.openUnknown": "open: 不认识 “{0}”，可用：",
      "term.opening": "正在打开 ",
      "term.meowLine": " ( o.o )  喵～",
      "term.meowLink": "完整版在这里 → ",
      "term.lsMiss": "ls: 无法访问 '{0}': 没有那个文件或目录",
      "term.catMiss": "cat: 缺少文件名，试试 cat about.txt",
      "term.catNo": "cat: {0}: 没有那个文件或目录",
      "term.sudo": "sudo: 权限不足。这里只有一个 root，而你正在看他的主页 :)",
      "term.rm": "rm: 只读文件系统。想得美 :)",
      "term.cd": "这是个静态站，哪儿也去不了。试试 open <site>。",
      "term.exit": "你可以关掉标签页，但为什么要走呢 :)",
      "term.editor": "{0}: 在别人的终端里写代码可不礼貌 :)",
      "term.notFound": "输入 help 查看可用命令",
      "term.listene": "ListenE       Android AI Agent → ",
      "term.mqlt": "蒙企链探      研学全栈平台 → ",
      "term.homepage": "HomePage      个人主页源码 → ",
      "term.equa": "方程剧场      3D 物理实验室 → ",
      "term.moreCode": "更多代码      ",
      "term.skillM": "移动端    Kotlin · Jetpack Compose · Material 3 · UniApp X",
      "term.skillB": "后端      NestJS · Node.js · TypeScript · Fastify · Prisma · PostgreSQL · Redis",
      "term.skillF": "前端      Vue 3 · Vite · HTML / CSS · Canvas",
      "term.skillA": "AI        LLM 集成 · TTS / ASR · Agent 编排",
      "term.skillG": "游戏      Godot 4.7 · GDScript · Jolt Physics",
      "term.skillD": "部署      Git · Docker · AWS S3",
    },
    en: {
      "lang.toggle": "Switch to Chinese",
      "nav.about": "About",
      "nav.awards": "Awards",
      "nav.work": "Work",
      "nav.articles": "Notes",
      "nav.contact": "Contact",
      "nav.main": "Primary navigation",
      "nav.mobile": "Mobile navigation",
      "nav.open": "Open menu",
      "nav.close": "Close menu",
      "nav.scrim": "Close menu",
      "skip.about": "Skip to about",
      "skip.project": "Skip to project",
      "skip.list": "Skip to list",
      "skip.article": "Skip to article",
      "brand.home": "0Nyx home",
      "hero.status": "Selected work",
      "hero.role": "Full-stack developer",
      "hero.about": "About",
      "hero.lede": "Software Engineering student at Inner Mongolia Normal University, School of Computer Science and Technology, class of 2025. I build web, mobile, and AI projects end to end — backend, data, UI, and production deploys.",
      "hero.viewWork": "See work",
      "hero.contactMe": "Contact",
      "hero.avatarAlt": "Portrait of 0Nyx",
      "hero.easterTitle": "Easter egg: salary cat",
      "hero.easterAria": "Open easter egg: salary cat",
      "hero.scroll": "Scroll down",
      "hero.stack": "Languages and tools",
      "term.aria": "Interactive terminal. Type help for commands",
      "term.inputAria": "Terminal input. Type help, Tab to complete, up/down for history",
      "term.tip": "tip: type help for commands",
      "awards.title": "Awards",
      "awards.year": "Year",
      "awards.event": "Event",
      "awards.place": "Place",
      "awards.cert": "Certificate",
      "awards.more": "All awards",
      "awards.eventName": "China Collegiate Computing Contest · AIGC Innovation",
      "awards.placeName": "North China Regional · Second Prize",
      "awards.viewCert": "View certificate",
      "awards.pageTitle": "Awards",
      "awards.lede": "Everything I have won. Search by contest, or filter by year and place.",
      "awards.search": "Search awards",
      "awards.searchPh": "Search contest or place…",
      "awards.empty": "No matching awards.",
      "awards.second": "Second prize",
      "work.title": "Open source",
      "work.more": "All projects",
      "work.stack": "Stack",
      "work.crumb": "Open source",
      "work.listene.desc": "An Android AI agent for English listening. It generates audio, practice cards, and error review.",
      "work.mqlt.title": "MQLT",
      "work.mqlt.tag": "Competition / full-stack",
      "work.mqlt.desc": "A field-study platform for Inner Mongolia’s food industry: booking, on-site check-in, archives, a points shop, and an ops console.",
      "work.homepage.tag": "Personal site / open source",
      "work.homepage.desc": "Source for this site. Dark pages, project list and detail views — fork it if you like the design.",
      "work.equa.title": "Equamotion",
      "work.equa.tag": "Godot / 3D physics",
      "work.equa.desc": "Build physics scenes in a 3D lab, tweak parameters, and read them against the equations. Concept build.",
      "work.pill": "Concept",
      "articles.title": "Notes",
      "articles.more": "All notes",
      "articles.read": "Read",
      "articles.emptyAria": "Note placeholder",
      "articles.wasabi.status": "Object storage",
      "articles.wasabi.title": "Wasabi: cheap object storage that does not meter egress",
      "articles.wasabi.desc": "No egress fees, no request fees. Billed at $6.99 / month for the first 1 TB. 30-day trial. I have seen download peaks around 30 MB/s.",
      "articles.pageTitle": "Notes",
      "articles.lede": "Everything I have written. Search titles, or filter by tag.",
      "articles.search": "Search notes",
      "articles.searchPh": "Search title or tag…",
      "articles.empty": "No matching notes.",
      "articles.storage": "Object storage",
      "contact.line1": "Want to talk",
      "contact.line2": "just write.",
      "contact.lede": "Questions about a project, or just a hello — email is enough.",
      "contact.copy": "Copy email",
      "contact.social": "Social links",
      "contact.wechat": "WeChat · ITGao06",
      "footer.links": "Site links",
      "copy.ok": "Copied",
      "copy.email": "Email copied",
      "copy.wechat": "WeChat ID copied",
      "copy.fail": "Copy failed — please copy it manually",
      "catalog.all": "All",
      "catalog.fullstack": "Full-stack",
      "catalog.wip": "In progress",
      "catalog.home": "Home",
      "catalog.projectsTitle": "Open source",
      "catalog.projectsLede": "Every project is here. Search by name, or filter by tag.",
      "catalog.searchProjects": "Search projects",
      "catalog.searchProjectsPh": "Search name or stack…",
      "catalog.emptyProjects": "No matching projects.",
      "meta.homeTitle": "0Nyx — Full-stack developer",
      "meta.homeDesc": "0Nyx, independent developer. Web, mobile, and AI work.",
      "meta.projectsTitle": "Open source - 0Nyx",
      "meta.projectsDesc": "0Nyx’s open-source projects. Search by name or stack.",
      "meta.awardsTitle": "Awards - 0Nyx",
      "meta.awardsDesc": "Awards. Search by year, contest, or place.",
      "meta.articlesTitle": "Notes - 0Nyx",
      "meta.articlesDesc": "Notes. Search by title or tag.",
      "meta.listeneTitle": "ListenE - 0Nyx",
      "meta.listeneDesc": "An Android AI agent for English listening: generated audio, practice cards, and error review.",
      "meta.mqltTitle": "MQLT - 0Nyx",
      "meta.mqltDesc": "A field-study platform for Inner Mongolia’s food industry: booking, check-in, archives, a points shop, and an ops console.",
      "meta.homepageTitle": "HomePage - 0Nyx",
      "meta.homepageDesc": "Source for this site. Dark pages, project list and detail views — fork it if you like the design.",
      "meta.equaTitle": "Equamotion - 0Nyx",
      "meta.equaDesc": "Build physics scenes in a 3D lab, tweak parameters, and read them against the equations. Concept build.",
      "meta.wasabiTitle": "Wasabi object storage - 0Nyx",
      "meta.wasabiDesc": "No egress or request fees. $6.99 / month for the first 1 TB. 30-day trial. Download peaks around 30 MB/s.",
      "p.role": "Role",
      "p.status": "Status",
      "p.year": "Year",
      "p.date": "Date",
      "p.type": "Type",
      "p.minFee": "Floor price",
      "p.indie": "Solo",
      "p.indieFull": "Solo full-stack",
      "p.public": "Public repo",
      "p.concept": "Concept",
      "p.recommend": "Note",
      "p.github": "GitHub repo",
      "p.mirror": "Can’t open GitHub? Download the zip",
      "p.openRepo": "Open repo",
      "p.what": "What it is",
      "p.did": "What I built",
      "p.stack": "Stack",
      "listene.lede": "An Android AI agent for English study. Listening generation, practice cards, and error review live in one workspace.",
      "listene.p1": "ListenE is not a question bank. You describe what you need in natural language; the agent generates audio, cards, and speech, then stores the work.",
      "listene.p2": "The client is Kotlin and Jetpack Compose. The backend is NestJS and PostgreSQL for sessions, cards, progress, and TTS.",
      "listene.b1": "Android client: chat, card drills, intensive replay, and phrase review.",
      "listene.b2": "NestJS backend: listening generation, card contracts, workspace, and progress.",
      "listene.b3": "Wired LLMs and TTS into a real study loop, not a demo chat.",
      "listene.bubble1": "Generate an IELTS listening drill",
      "listene.bubble2": "Ready · dialogue + 5 items + audio",
      "mqlt.lede": "A collegiate innovation contest project. Food-industry resources in Inner Mongolia become a loop you can book, walk, stamp, and archive.",
      "mqlt.p1": "MQLT is built for food-industry field study in Inner Mongolia. Students use a UniApp X WeChat mini program; ops is Vue 3; the API is NestJS, Prisma, and PostgreSQL.",
      "mqlt.p2": "The loop covers booking, on-site stamps, knowledge tasks, archives, points, a merch shop, and a permissioned console.",
      "mqlt.b1": "Designed booking, stamps, tasks, certificates, and points redemption.",
      "mqlt.b2": "Built the student mini program, ops console, and data model together.",
      "mqlt.b3": "Deployed and wired the mini program, console, and API onto one contract.",
      "mqlt.canvas": "Illustration of the MQLT field-study ops dashboard",
      "mqlt.preview": "Field-study preview",
      "mqlt.m1": "Programs",
      "mqlt.m2": "Check-ins",
      "mqlt.m3": "Archives",
      "mqlt.trend": "Check-in trend",
      "mqlt.days": "Last 7 days",
      "mqlt.live": "Live feed",
      "mqlt.a1": "Sample route",
      "mqlt.a2": "Archive upload",
      "mqlt.a3": "Study log",
      "mqlt.done": "Done",
      "mqlt.pending": "In review",
      "hp.lede": "Source for this website. Static HTML / CSS / JS, no framework. If you like the design, download it and make it yours.",
      "hp.p1": "This is the 0nyx.cn homepage. Intro, awards, the project list, detail pages, and the stack marquee all live in this repo.",
      "hp.p2": "Static site, no build step. Assets use relative paths, so it runs locally after download. Fork it or grab the zip.",
      "hp.b1": "Laid out the pages, styles, and interaction, including the project list and details.",
      "hp.b2": "Packaged the source as a static repo you can download and reuse.",
      "hp.b3": "Fonts, avatar, and page assets ship in the repo, so it runs without this domain.",
      "equa.kicker": "Godot / concept",
      "equa.lede": "Equamotion. Stage mechanics in a 3D lab, change the numbers, and match them to the equations. Concept build.",
      "equa.p1": "Equamotion is meant to get mechanics off the page. Walk into a 3D lab, set a scene, change parameters, watch the motion, and read it against the formula.",
      "equa.p2": "It is still a concept: walk in, build a scene, and line it up with the equation.",
      "equa.b1": "First-person 3D lab in Godot.",
      "equa.b2": "Rigid-body scenes with editable physics parameters.",
      "equa.b3": "Motion and formulas in the same space.",
      "equa.note": "Source is not public yet. Email me if you want the details.",
      "equa.canvas": "First-person Equamotion lab preview",
      "wasabi.kicker": "Object storage / CDN",
      "wasabi.lede": "Wasabi does not charge for egress or requests. Floor price is $6.99 / month for 1 TB. 30-day trial. I have seen download peaks around 30 MB/s.",
      "wasabi.h1": "Why I use it",
      "wasabi.p1": "Most object stores bill egress and requests. That gets ugly fast. Wasabi is S3-compatible and only charges for what you store.",
      "wasabi.p1html": "Most object stores bill egress and requests. That gets ugly fast. <a href=\"https://wasabi.com/\" rel=\"noopener\" target=\"_blank\">Wasabi</a> is S3-compatible and only charges for what you store.",
      "wasabi.p2": "New accounts get a 30-day trial. Upload a few files and see. Site: wasabi.com.",
      "wasabi.p2html": "New accounts get a 30-day trial. Upload a few files and see. Site: <a href=\"https://wasabi.com/\" rel=\"noopener\" target=\"_blank\">wasabi.com</a>.",
      "wasabi.h2": "Pricing",
      "wasabi.p3": "The monthly floor is 1 TB at $6.99. 200 GB still costs 1 TB. Past 1 TB, each extra TB is another $6.99.",
      "wasabi.b1": "200 GB: $6.99",
      "wasabi.b2": "1 TB: $6.99",
      "wasabi.b3": "2 TB: $13.98",
      "wasabi.b4": "3 TB: $20.97",
      "wasabi.p4": "Delete an object before 90 days and you still pay for 90 days. Overwrites count the same. After 90 days, you only pay for what remains. It is a poor scratch disk and a good long-term store.",
      "wasabi.h3": "Regions",
      "wasabi.p5": "North America: Virginia, Texas, Oregon, plus Toronto. Europe: Amsterdam and London. APAC: Tokyo, Singapore, Sydney. Pick the closest.",
      "wasabi.h4": "Buckets stay private by default",
      "wasabi.p6": "Wasabi does not let you flip a bucket public without a ticket. They want a human in the loop so people do not host random files.",
      "wasabi.h5": "Put free EdgeOne in front",
      "wasabi.p7": "You do not have to make the bucket public. Put Tencent’s free EdgeOne in front and origin-pull Wasabi with a key. Visitors hit the CDN; the bucket stays private.",
      "wasabi.p7html": "You do not have to make the bucket public. Put Tencent’s free <a href=\"https://cloud.tencent.com/product/teo\" rel=\"noopener\" target=\"_blank\">EdgeOne</a> in front and origin-pull Wasabi with a key. Visitors hit the CDN; the bucket stays private.",
      "wasabi.p8": "There are nodes in China, so a cache helps. I have seen peaks around 30 MB/s. The free plan is enough for a personal site until traffic actually explodes.",
      "wasabi.p9": "Pricing and trial terms can change. Check Wasabi pricing and EdgeOne before you buy.",
      "wasabi.p9html": "Pricing and trial terms can change. Check <a href=\"https://wasabi.com/pricing\" rel=\"noopener\" target=\"_blank\">Wasabi pricing</a> and <a href=\"https://cloud.tencent.com/product/teo\" rel=\"noopener\" target=\"_blank\">EdgeOne</a> before you buy.",
      "wasabi.official": "Links",
      "wasabi.back": "Back to notes",
      "term.help": "list commands",
      "term.helpHead": "commands:",
      "term.helpMore": "unix classics work too: ls / cat / echo / pwd / date …",
      "term.helpHint": "Tab completes · ↑↓ history",
      "term.aboutMe": "about me",
      "term.about1": "I am 0Nyx, a full-stack developer.",
      "term.about2": "Software Engineering at Inner Mongolia Normal University, School of Computer Science and Technology, class of 2025.",
      "term.about3": "I ship web, mobile, and AI projects — backend, data, UI, and deploys.",
      "term.about4": "Award: 2026 China Collegiate Computing Contest AIGC Innovation · North China Regional Second Prize",
      "term.skills": "stack",
      "term.projects": "open source",
      "term.status": "site status",
      "term.contact": "contact",
      "term.open": "open a page",
      "term.meow": "pixel cat",
      "term.clear": "clear screen (Ctrl+L)",
      "term.who": "who I am",
      "term.helpOpen": "open a page (open for the list)",
      "term.cat": "a pixel cat",
      "term.projectsHint": "(easter egg is in the avatar — try meow)",
      "term.contactHint": "Want to talk shop? Email is welcome.",
      "term.openUsage": "usage: open <site>",
      "term.openSites": "sites: ",
      "term.openUnknown": "open: unknown “{0}”. try: ",
      "term.opening": "opening ",
      "term.meowLine": " ( o.o )  meow",
      "term.meowLink": "full version → ",
      "term.lsMiss": "ls: cannot access '{0}': No such file or directory",
      "term.catMiss": "cat: missing file, try cat about.txt",
      "term.catNo": "cat: {0}: No such file or directory",
      "term.sudo": "sudo: permission denied. there is one root here, and you are on his homepage :)",
      "term.rm": "rm: read-only file system. nice try :)",
      "term.cd": "static site. nowhere to go. try open <site>.",
      "term.exit": "you can close the tab, but why leave :)",
      "term.editor": "{0}: rude to write code in someone else's terminal :)",
      "term.notFound": "type help for commands",
      "term.listene": "ListenE       Android AI agent → ",
      "term.mqlt": "MQLT          field-study stack → ",
      "term.homepage": "HomePage      this site → ",
      "term.equa": "Equamotion    3D physics lab → ",
      "term.moreCode": "more code     ",
      "term.skillM": "mobile    Kotlin · Jetpack Compose · Material 3 · UniApp X",
      "term.skillB": "backend   NestJS · Node.js · TypeScript · Fastify · Prisma · PostgreSQL · Redis",
      "term.skillF": "frontend  Vue 3 · Vite · HTML / CSS · Canvas",
      "term.skillA": "AI        LLM glue · TTS / ASR · agent orchestration",
      "term.skillG": "games     Godot 4.7 · GDScript · Jolt Physics",
      "term.skillD": "ops       Git · Docker · AWS S3",
    },
  };

  const readLang = () => {
    const attr = document.documentElement.getAttribute("data-lang");
    if (attr === "en" || attr === "zh") return attr;
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "zh") return stored;
    } catch (err) {}
    return "zh";
  };

  let lang = readLang();
  const t = (key, vars) => {
    let value = (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        value = value.replace("{" + k + "}", vars[k]);
      });
    }
    return value;
  };

  const applyI18n = () => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = t(key);
      else el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      el.setAttribute("content", t(el.getAttribute("data-i18n-content")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });
    const titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey) document.title = t(titleKey);
    const langBtn = document.getElementById("langToggle");
    if (langBtn) langBtn.setAttribute("aria-label", t(lang === "en" ? "lang.toggle" : "lang.toggle"));
    if (langBtn) {
      langBtn.setAttribute("aria-label", lang === "en" ? I18N.en["lang.toggle"] : I18N.zh["lang.toggle"]);
    }
    const navToggle = document.getElementById("navToggle");
    if (navToggle) {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", t(open ? "nav.close" : "nav.open"));
    }
  };

  const setLang = (next) => {
    lang = next === "en" ? "en" : "zh";
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.documentElement.setAttribute("data-lang", lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (err) {}
    applyI18n();
    document.documentElement.classList.add("i18n-ready");
    document.dispatchEvent(new CustomEvent("onyx:lang", { detail: { lang } }));
  };

  window.onyxI18n = { t, getLang: () => lang, setLang, apply: applyI18n };

  setLang(lang);

  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => setLang(lang === "en" ? "zh" : "en"));
  }

  /* ---------- always enter at the top (keep hash links working) ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!window.location.hash) {
    window.scrollTo(0, 0);
    window.addEventListener("load", () => {
      if (!window.location.hash) window.scrollTo(0, 0);
    });
  }

  /* ---------- year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    const start = 2026;
    const now = new Date().getFullYear();
    const end = Math.max(now, start + 1);
    yearEl.textContent = start + "\u2013" + end;
  }

  /* ---------- header scroll state ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile navigation ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const navScrim = document.getElementById("navScrim");
  if (header && navToggle && mobileNav && navScrim) {
    const inertTargets = Array.from(document.querySelectorAll("main, .site-footer"));
    const setMenuOpen = (open, restoreFocus = false) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", t(open ? "nav.close" : "nav.open"));
      mobileNav.hidden = !open;
      navScrim.hidden = !open;
      header.classList.toggle("is-menu-open", open);
      document.body.classList.toggle("is-nav-open", open);
      inertTargets.forEach((target) => {
        target.inert = open;
      });
      if (!open && restoreFocus) navToggle.focus();
    };

    navToggle.addEventListener("click", () => {
      setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false, true));
    });
    navScrim.addEventListener("click", () => setMenuOpen(false, true));
    const brand = header.querySelector(".brand");
    if (brand) brand.addEventListener("click", () => setMenuOpen(false));
    document.addEventListener("keydown", (event) => {
      if (navToggle.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") {
        setMenuOpen(false, true);
        return;
      }
      if (event.key !== "Tab") return;
      const menuLinks = Array.from(mobileNav.querySelectorAll("a"));
      const lastLink = menuLinks[menuLinks.length - 1];
      if (event.shiftKey && document.activeElement === navToggle) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        navToggle.focus();
      }
    });
    window.matchMedia("(min-width: 561px)").addEventListener("change", (event) => {
      if (event.matches) setMenuOpen(false);
    });
  }

  /* ---------- nav scrollspy ---------- */
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"], .mobile-nav a[href^="#"]'));
  const spyTargets = Array.from(
    new Set(
      navLinks
        .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
        .filter(Boolean)
    )
  );
  if (spyTargets.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
      navLinks.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + id)
      );
    };
    const spyOpts = { rootMargin: "-35% 0px -60% 0px", threshold: 0 };
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, spyOpts);
    spyTargets.forEach((t) => spy.observe(t));
  }

  /* ---------- reveal on scroll (enhances visible baseline) ---------- */
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  const revealAll = () => revealEls.forEach((el) => el.classList.add("is-in"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    // Stagger items that share a parent for a more orchestrated feel.
    const byParent = new Map();
    revealEls.forEach((el) => {
      const key = el.parentElement;
      if (!byParent.has(key)) byParent.set(key, []);
      byParent.get(key).push(el);
    });
    byParent.forEach((group) => {
      group.forEach((el, i) => {
        el.style.transitionDelay = Math.min(i * 70, 420) + "ms";
      });
    });

    revealEls.forEach((el) => io.observe(el));

    // Failsafe: never ship blank content near the viewport if the observer
    // misses, while leaving below-fold items to reveal on scroll.
    const revealInView = () => {
      revealEls.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 1.08) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    };
    window.setTimeout(revealInView, 1800);
    window.addEventListener("load", () => window.setTimeout(revealInView, 200));
  }

  /* ---------- full-page pointer field (page-space lattice) ---------- */
  const glow = document.getElementById("glow");
  const canvas = document.getElementById("field");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const animateField = !reduceMotion && finePointer && !saveData;
    const COLOR = [95, 233, 170]; // jade, approx of --signal
    const SPACING = 36;
    const DOT = 1.15;
    const INFLUENCE = 170;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    /** Smoothed pointer in document/page space */
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let lastClientX = -9999;
    let lastClientY = -9999;
    let hasPointer = false;
    let raf = 0;
    let resizeTimer = 0;
    let scrollRedrawTimer = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / SPACING) + 3;
      rows = Math.ceil(h / SPACING) + 3;
    };

    const syncPointerFromClient = () => {
      if (!hasPointer) {
        pointer.tx = -9999;
        pointer.ty = -9999;
        return;
      }
      const sx = window.scrollX || window.pageXOffset || 0;
      const sy = window.scrollY || window.pageYOffset || 0;
      pointer.tx = lastClientX + sx;
      pointer.ty = lastClientY + sy;
      if (glow && finePointer && !reduceMotion) {
        glow.style.setProperty("--mx", (lastClientX / window.innerWidth) * 100 + "%");
        glow.style.setProperty("--my", (lastClientY / window.innerHeight) * 100 + "%");
      }
    };

    /**
     * Lattice is laid out in page space, then projected into the viewport so
     * dots ride with the document on scroll (not a sticky HUD).
     */
    const paint = (t, animated) => {
      const sx = window.scrollX || window.pageXOffset || 0;
      const sy = window.scrollY || window.pageYOffset || 0;

      syncPointerFromClient();
      if (animated) {
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
      } else {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }

      ctx.clearRect(0, 0, w, h);

      const baseCol = Math.floor(sx / SPACING) - 1;
      const baseRow = Math.floor(sy / SPACING) - 1;
      const time = animated ? t * 0.0011 : 0;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const pageX = (baseCol + i) * SPACING;
          const pageY = (baseRow + j) * SPACING;
          const wave = animated
            ? Math.sin(time + (baseCol + i) * 0.35 + (baseRow + j) * 0.22) * 3
            : 0;
          const x = pageX - sx;
          const y = pageY - sy + wave;

          let alpha = 0.06;
          let radius = DOT;

          if (animated && hasPointer) {
            const dist = Math.hypot(pageX - pointer.x, pageY - pointer.y);
            if (dist < INFLUENCE) {
              const f = 1 - dist / INFLUENCE;
              alpha += f * 0.85;
              radius += f * 1.4;
            }
          } else if (!animated) {
            alpha = 0.07;
          }

          ctx.beginPath();
          ctx.fillStyle =
            "rgba(" + COLOR[0] + "," + COLOR[1] + "," + COLOR[2] + "," + alpha.toFixed(3) + ")";
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const draw = (t) => {
      paint(t, true);
      raf = window.requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      paint(0, false);
    };

    const start = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
      if (!animateField) {
        drawStatic();
      } else if (!document.hidden) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (e) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      hasPointer = true;
      syncPointerFromClient();
    };

    const onPointerLeave = () => {
      hasPointer = false;
      lastClientX = -9999;
      lastClientY = -9999;
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    if (animateField) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);
    } else {
      window.addEventListener(
        "scroll",
        () => {
          window.clearTimeout(scrollRedrawTimer);
          scrollRedrawTimer = window.setTimeout(drawStatic, 16);
        },
        { passive: true }
      );
    }

    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (!animateField) drawStatic();
      }, 160);
    });

    document.addEventListener("visibilitychange", () => {
      start();
    });

    resize();
    start();
  }

  /* ---------- mqlt canvas preview ---------- */
  const mqltCanvas = document.getElementById("mqltCanvas");
  if (mqltCanvas && mqltCanvas.getContext) {
    const ctx = mqltCanvas.getContext("2d");
    const animatePreview = !reduceMotion && finePointer && !saveData;
    const baseWidth = 430;
    const baseHeight = 272;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;

    const roundedRect = (x, y, w, h, radius) => {
      const r = Math.min(radius, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const label = (text, x, y, size, color, weight = 500, align = "left", mono = false) => {
      ctx.fillStyle = color;
      ctx.font =
        weight + " " + size + "px " +
        (mono ? '"JetBrains Mono", monospace' : '"Noto Sans SC Subset", sans-serif');
      ctx.textAlign = align;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(text, x, y);
    };

    const draw = (time) => {
      if (!width || !height) return;
      const phase = time * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.scale(width / baseWidth, height / baseHeight);

      const background = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
      background.addColorStop(0, "#101b18");
      background.addColorStop(0.58, "#101412");
      background.addColorStop(1, "#08100d");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, baseWidth, baseHeight);

      ctx.strokeStyle = "rgba(95, 233, 170, 0.055)";
      ctx.lineWidth = 1;
      for (let x = 18; x < baseWidth; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 32);
        ctx.lineTo(x, baseHeight);
        ctx.stroke();
      }
      for (let y = 48; y < baseHeight; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(baseWidth, y);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(255,255,255,0.035)";
      ctx.fillRect(0, 0, baseWidth, 32);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, 31.5);
      ctx.lineTo(baseWidth, 31.5);
      ctx.stroke();
      ["#ff6b6b", "#ffd166", "#5fe9aa"].forEach((color, index) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.72;
        ctx.arc(15 + index * 12, 16, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      label("github.com/MarkHayford/MQLT", 58, 20, 7.5, "rgba(255,255,255,0.46)", 400, "left", true);

      label(t("mqlt.preview"), 20, 56, 13, "#f2f5f3", 700);
      ctx.beginPath();
      ctx.fillStyle = "#5fe9aa";
      ctx.arc(362, 52, 3 + Math.sin(phase * 2.2) * 0.7, 0, Math.PI * 2);
      ctx.fill();
      label("LIVE", 372, 55, 7.5, "#5fe9aa", 500, "left", true);

      const metrics = [
        [t("mqlt.m1"), "24", "+3"],
        [t("mqlt.m2"), "128", "+8"],
        [t("mqlt.m3"), "846", "+12%"]
      ];
      metrics.forEach((metric, index) => {
        const x = 20 + index * 134;
        roundedRect(x, 68, 122, 48, 8);
        ctx.fillStyle = "rgba(255,255,255,0.035)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.stroke();
        label(metric[0], x + 10, 83, 7.5, "rgba(255,255,255,0.46)", 500);
        label(metric[1], x + 10, 105, 15, "#f2f5f3", 700, "left", true);
        label(metric[2], x + 112, 104, 7, "#5fe9aa", 500, "right", true);
      });

      roundedRect(20, 128, 252, 124, 9);
      ctx.fillStyle = "rgba(255,255,255,0.025)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.stroke();
      label(t("mqlt.trend"), 32, 146, 8, "rgba(255,255,255,0.6)", 600);
      label(t("mqlt.days"), 258, 146, 6.8, "rgba(255,255,255,0.35)", 400, "right");

      const values = [0.38, 0.58, 0.46, 0.72, 0.62, 0.86, 0.78];
      values.forEach((value, index) => {
        const x = 34 + index * 31;
        const pulse = animatePreview ? Math.sin(phase * 1.6 + index * 0.55) * 0.025 : 0;
        const barHeight = (value + pulse) * 72;
        const gradient = ctx.createLinearGradient(0, 235 - barHeight, 0, 235);
        gradient.addColorStop(0, "rgba(95,233,170,0.9)");
        gradient.addColorStop(1, "rgba(95,233,170,0.18)");
        roundedRect(x, 235 - barHeight, 18, barHeight, 4);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      roundedRect(284, 128, 126, 124, 9);
      ctx.fillStyle = "rgba(255,255,255,0.025)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.stroke();
      label(t("mqlt.live"), 296, 146, 8, "rgba(255,255,255,0.6)", 600);

      const activity = [
        [t("mqlt.a1"), t("mqlt.done")],
        [t("mqlt.a2"), t("mqlt.pending")],
        [t("mqlt.a3"), t("mqlt.done")]
      ];
      activity.forEach((item, index) => {
        const y = 166 + index * 27;
        ctx.beginPath();
        ctx.fillStyle = index === 1 ? "#ffd166" : "#5fe9aa";
        ctx.arc(300, y, 3, 0, Math.PI * 2);
        ctx.fill();
        label(item[0], 310, y + 3, 7.2, "rgba(255,255,255,0.72)", 500);
        label(item[1], 398, y + 3, 6.5, "rgba(255,255,255,0.34)", 400, "right");
        if (index < activity.length - 1) {
          ctx.strokeStyle = "rgba(255,255,255,0.055)";
          ctx.beginPath();
          ctx.moveTo(296, y + 13);
          ctx.lineTo(398, y + 13);
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const resize = () => {
      const rect = mqltCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      mqltCanvas.width = Math.floor(width * dpr);
      mqltCanvas.height = Math.floor(height * dpr);
      draw(performance.now());
    };

    const frame = (time) => {
      draw(time);
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      window.cancelAnimationFrame(raf);
      if (animatePreview && visible && !document.hidden) {
        raf = window.requestAnimationFrame(frame);
      } else {
        draw(1000);
      }
    };

    if ("ResizeObserver" in window) {
      new ResizeObserver(() => {
        resize();
        start();
      }).observe(mqltCanvas);
    } else {
      window.addEventListener("resize", () => {
        resize();
        start();
      });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        start();
      }).observe(mqltCanvas);
    }

    document.addEventListener("visibilitychange", start);
    document.addEventListener("onyx:lang", start);
    document.fonts.ready.then(() => {
      resize();
      start();
    });
    resize();
    start();
  }

  /* ---------- equamotion canvas preview (first-person lab) ---------- */
  const eqCanvas = document.getElementById("eqCanvas");
  if (eqCanvas && eqCanvas.getContext) {
    const ctx = eqCanvas.getContext("2d");
    const animateEq = !reduceMotion && !saveData;
    const baseWidth = 430;
    const baseHeight = 272;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;

    const label = (text, x, y, size, color, align = "left") => {
      ctx.fillStyle = color;
      ctx.font = "500 " + size + 'px "JetBrains Mono", monospace';
      ctx.textAlign = align;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(text, x, y);
    };

    const project = (x, y, z, cam, focal) => {
      const dx = x - cam.x;
      const dy = y - cam.y;
      const dz = z - cam.z;
      const cs = Math.cos(cam.yaw);
      const sn = Math.sin(cam.yaw);
      const rx = dx * cs - dz * sn;
      const rz = dx * sn + dz * cs;
      const ry = dy;
      const depth = Math.max(0.35, rz);
      return [
        baseWidth * 0.5 + (rx * focal) / depth,
        148 - (ry * focal) / depth,
        depth,
      ];
    };

    const fillPoly = (pts, color) => {
      if (pts.length < 3) return;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const strokePoly = (pts, color, w) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.stroke();
    };

    const cube = (cx, cy, cz, sx, sy, sz, cam, focal, fill, edge) => {
      const hx = sx / 2;
      const hy = sy / 2;
      const hz = sz / 2;
      const corners = [
        [cx - hx, cy - hy, cz - hz],
        [cx + hx, cy - hy, cz - hz],
        [cx + hx, cy + hy, cz - hz],
        [cx - hx, cy + hy, cz - hz],
        [cx - hx, cy - hy, cz + hz],
        [cx + hx, cy - hy, cz + hz],
        [cx + hx, cy + hy, cz + hz],
        [cx - hx, cy + hy, cz + hz],
      ].map((p) => project(p[0], p[1], p[2], cam, focal));
      const faces = [
        [0, 1, 2, 3],
        [5, 4, 7, 6],
        [4, 0, 3, 7],
        [1, 5, 6, 2],
        [3, 2, 6, 7],
        [4, 5, 1, 0],
      ];
      faces
        .map((f) => {
          const pts = f.map((i) => corners[i]);
          const depth = (pts[0][2] + pts[1][2] + pts[2][2] + pts[3][2]) / 4;
          return { pts, depth };
        })
        .sort((a, b) => b.depth - a.depth)
        .forEach((face, i) => {
          const shade = 0.55 + i * 0.07;
          fillPoly(face.pts, fill.replace("ALPHA", (0.16 + shade * 0.12).toFixed(2)));
          strokePoly(face.pts, edge, 0.8);
        });
    };

    const sphere = (x, y, z, r, cam, focal, color) => {
      const p = project(x, y, z, cam, focal);
      const rad = Math.max(2.2, (r * focal) / p[2]);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(p[0], p[1], rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.arc(p[0], p[1], rad + 2.2, 0, Math.PI * 2);
      ctx.stroke();
      return p;
    };

    const draw = (time) => {
      if (!width || !height) return;
      const t = animateEq ? time / 1000 : 1.2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.scale(width / baseWidth, height / baseHeight);

      const background = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
      background.addColorStop(0, "#10161c");
      background.addColorStop(1, "#07090c");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, baseWidth, baseHeight);

      ctx.fillStyle = "rgba(255,255,255,0.035)";
      ctx.fillRect(0, 0, baseWidth, 30);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, 29.5);
      ctx.lineTo(baseWidth, 29.5);
      ctx.stroke();
      ["#ff6b6b", "#ffd166", "#5fe9aa"].forEach((color, index) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.72;
        ctx.arc(15 + index * 12, 15, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      label("equamotion / concept", 58, 19, 7.5, "rgba(255,255,255,0.46)");

      const cam = {
        x: Math.sin(t * 0.35) * 0.55,
        y: 1.55,
        z: -4.2,
        yaw: Math.sin(t * 0.22) * 0.16,
      };
      const focal = 210;

      ctx.fillStyle = "rgba(95, 180, 233, 0.05)";
      ctx.fillRect(0, 148, baseWidth, 124);
      for (let gz = 2; gz <= 14; gz += 2) {
        const a = project(-6, 0, gz, cam, focal);
        const b = project(6, 0, gz, cam, focal);
        ctx.beginPath();
        ctx.strokeStyle = "rgba(127, 181, 255, 0.08)";
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }

      cube(0, 0.12, 8.4, 10.5, 0.24, 10.5, cam, focal, "rgba(70,82,96,ALPHA)", "rgba(255,255,255,0.06)");
      cube(-3.1, 0.7, 7.2, 2.4, 1.4, 1.6, cam, focal, "rgba(90,98,110,ALPHA)", "rgba(255,255,255,0.1)");
      cube(2.6, 0.22, 6.4, 3.4, 0.18, 1.5, cam, focal, "rgba(140,128,108,ALPHA)", "rgba(255,209,102,0.18)");

      const ballX = 0.35 + Math.sin(t * 1.15) * 1.15;
      const ballZ = 4.8 + Math.cos(t * 0.9) * 0.35;
      const ballY = 0.55 + Math.abs(Math.sin(t * 2.1)) * 0.55;
      cube(-0.2, 0.45, 5.4, 0.9, 0.9, 0.9, cam, focal, "rgba(74,163,222,ALPHA)", "rgba(127,181,255,0.35)");
      const ball = sphere(ballX, ballY, ballZ, 0.42, cam, focal, "#5fe9aa");

      const hand = project(0.55, 0.85, 1.35, cam, focal);
      ctx.strokeStyle = "rgba(95, 233, 170, 0.55)";
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.moveTo(baseWidth * 0.5 + 18, 210);
      ctx.lineTo(ball[0], ball[1]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.strokeStyle = "rgba(242,245,243,0.55)";
      ctx.lineWidth = 1.4;
      ctx.moveTo(baseWidth * 0.5 - 8, 148);
      ctx.lineTo(baseWidth * 0.5 + 8, 148);
      ctx.moveTo(baseWidth * 0.5, 140);
      ctx.lineTo(baseWidth * 0.5, 156);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(12, 42, 168, 70, 8);
      else ctx.rect(12, 42, 168, 70);
      ctx.fill();
      ctx.stroke();
      label("CONCEPT", 24, 62, 8.4, "rgba(95,233,170,0.9)");
      label("scene  params  formula", 24, 80, 7.6, "rgba(242,245,243,0.72)");
      label("Godot  4.7", 24, 98, 7.6, "rgba(127,181,255,0.85)");

      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(baseWidth - 158, 42, 146, 54, 8);
      else ctx.rect(baseWidth - 158, 42, 146, 54);
      ctx.fill();
      ctx.stroke();
      label("3D lab", baseWidth - 146, 62, 7.6, "rgba(242,245,243,0.78)");
      label("concept build", baseWidth - 146, 80, 7.4, "rgba(255,209,102,0.8)");

      const slots = ["场", "参", "动", "式"];
      slots.forEach((glyph, i) => {
        const x = 128 + i * 44;
        const y = 236;
        ctx.fillStyle = i === 0 ? "rgba(95,233,170,0.16)" : "rgba(255,255,255,0.04)";
        ctx.strokeStyle = i === 0 ? "rgba(95,233,170,0.45)" : "rgba(255,255,255,0.1)";
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, 36, 26, 5);
        else ctx.rect(x, y, 36, 26);
        ctx.fill();
        ctx.stroke();
        label(glyph, x + 18, y + 17, 8, "rgba(242,245,243,0.82)", "center");
      });

      ctx.restore();
    };

    const resize = () => {
      const rect = eqCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      eqCanvas.width = Math.floor(width * dpr);
      eqCanvas.height = Math.floor(height * dpr);
      draw(performance.now());
    };

    const frame = (time) => {
      draw(time);
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      window.cancelAnimationFrame(raf);
      if (animateEq && visible && !document.hidden) {
        raf = window.requestAnimationFrame(frame);
      } else {
        draw(1000);
      }
    };

    if ("ResizeObserver" in window) {
      new ResizeObserver(() => {
        resize();
        start();
      }).observe(eqCanvas);
    } else {
      window.addEventListener("resize", () => {
        resize();
        start();
      });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        start();
      }).observe(eqCanvas);
    }

    document.addEventListener("visibilitychange", start);
    document.fonts.ready.then(() => {
      resize();
      start();
    });
    resize();
    start();
  }

  /* ---------- magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn").forEach((btn) => {
      const strength = 0.28;
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + mx * strength + "px," + my * strength + "px)";
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });

    /* ---------- subtle tilt on featured card ---------- */
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const max = 4;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(1000px) rotateX(" + (-py * max).toFixed(2) + "deg) rotateY(" + (px * max).toFixed(2) + "deg)";
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- copy email ---------- */
  const toast = document.getElementById("toast");
  let toastTimer = 0;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-shown");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-shown"), 2200);
  };

  const copyText = async (value, okMsg, trigger) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(okMsg);
      if (trigger) {
        trigger.textContent = t("copy.ok");
        trigger.classList.add("is-copied");
        window.setTimeout(() => {
          trigger.classList.remove("is-copied");
          applyI18n();
        }, 1800);
      }
    } catch (err) {
      showToast(t("copy.fail"));
    }
  };

  const copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", () =>
      copyText(copyBtn.getAttribute("data-email") || "", t("copy.email"), copyBtn)
    );
  }

  const copyWechat = document.getElementById("copyWechat");
  if (copyWechat) {
    copyWechat.addEventListener("click", () =>
      copyText(copyWechat.getAttribute("data-wechat") || "", t("copy.wechat"))
    );
  }

  /* ---------- work gallery (album carousel) ---------- */
  const gallery = document.getElementById("workGallery");
  if (gallery) {
    const viewport = document.getElementById("galleryViewport");
    const slides = Array.from(viewport.querySelectorAll(".gallery__slide"));
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");
    const dotsWrap = document.getElementById("galleryDots");
    let active = 0;

    const goTo = (i) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      viewport.scrollTo({
        left: slides[clamped].offsetLeft - slides[0].offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    const dots = slides.map((slide, i) => {
      const dot = document.createElement("button");
      dot.className = "gallery__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "第 " + (i + 1) + " 页，共 " + slides.length + " 页");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    const update = () => {
      const pos = viewport.scrollLeft;
      let nearest = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - slides[0].offsetLeft - pos);
        if (dist < bestDist) {
          bestDist = dist;
          nearest = i;
        }
      });
      active = nearest;
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === active);
        if (i === active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      prevBtn.disabled = active === 0;
      nextBtn.disabled = active === slides.length - 1;
    };

    let scrollRaf = 0;
    viewport.addEventListener(
      "scroll",
      () => {
        window.cancelAnimationFrame(scrollRaf);
        scrollRaf = window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    prevBtn.addEventListener("click", () => goTo(active - 1));
    nextBtn.addEventListener("click", () => goTo(active + 1));
    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(active - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(active + 1);
      }
    });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- interactive hero terminal ---------- */
  const term = document.getElementById("term");
  const termBody = document.getElementById("termBody");
  const termOut = document.getElementById("termOut");
  const termCaretLine = document.getElementById("termCaretLine");
  if (term && termBody && termOut && termCaretLine) {
    const MAX_LINES = 300;
    const SITES = {
      github: "https://github.com/MarkHayford",
      listene: "/projects/listene/",
      mqlt: "/projects/mqlt/",
      homepage: "/projects/homepage/",
      equamotion: "/projects/equamotion/",
      meow: "/meow/",
    };
    const history = [];
    let histIdx = -1;
    let draft = "";
    let input = null;
    let activated = false;

    const scrollDown = () => {
      termBody.scrollTop = termBody.scrollHeight;
    };

    const trimLines = () => {
      while (termOut.children.length > MAX_LINES) termOut.firstElementChild.remove();
    };

    const makeLine = (cls) => {
      const p = document.createElement("p");
      p.className = "term__line term__line--wrap" + (cls ? " " + cls : "");
      return p;
    };

    // print("text") | print(["text", "term__line--out"]) | print(node)
    const print = (content, cls) => {
      const p = makeLine(cls);
      if (content instanceof Node) p.appendChild(content);
      else p.textContent = content;
      termOut.appendChild(p);
      trimLines();
      scrollDown();
      return p;
    };
    const out = (text) => print(text, "term__line--out");
    const err = (text) => print(text, "term__line--err");

    const printEcho = (cmdText) => {
      const p = makeLine();
      const prompt = document.createElement("span");
      prompt.className = "term__prompt";
      prompt.textContent = "$";
      p.appendChild(prompt);
      p.appendChild(document.createTextNode(" " + cmdText));
      termOut.appendChild(p);
      trimLines();
      scrollDown();
    };

    const printLink = (label, url) => {
      const p = makeLine("term__line--out");
      p.appendChild(document.createTextNode(label));
      const a = document.createElement("a");
      a.className = "term__link";
      a.href = url;
      if (!url.startsWith("/")) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      a.textContent = url;
      p.appendChild(a);
      termOut.appendChild(p);
      trimLines();
      scrollDown();
    };

    const commands = {
      help: {
        desc: () => t("term.help"),
        run() {
          out(t("term.helpHead"));
          [
            ["help", t("term.help")],
            ["about", t("term.aboutMe")],
            ["skills", t("term.skills")],
            ["projects", t("term.projects")],
            ["status", t("term.status")],
            ["contact", t("term.contact")],
            ["open <site>", t("term.helpOpen")],
            ["meow", t("term.cat")],
            ["clear", t("term.clear")],
          ].forEach(([name, desc]) => out("  " + name.padEnd(14, " ") + desc));
          out(t("term.helpMore"));
          out(t("term.helpHint"));
        },
      },
      whoami: {
        desc: () => t("term.who"),
        run() {
          out("0Nyx · full-stack developer");
        },
      },
      about: {
        desc: () => t("term.aboutMe"),
        run() {
          out(t("term.about1"));
          out(t("term.about2"));
          out(t("term.about3"));
          out(t("term.about4"));
        },
      },
      skills: {
        desc: () => t("term.skills"),
        run() {
          out(t("term.skillM"));
          out(t("term.skillB"));
          out(t("term.skillF"));
          out(t("term.skillA"));
          out(t("term.skillG"));
          out(t("term.skillD"));
        },
      },
      projects: {
        desc: () => t("term.projects"),
        run() {
          printLink(t("term.listene"), "/projects/listene/");
          printLink(t("term.mqlt"), "/projects/mqlt/");
          printLink(t("term.homepage"), "/projects/homepage/");
          printLink(t("term.equa"), "/projects/equamotion/");
          printLink(t("term.moreCode"), "https://github.com/MarkHayford");
          out(t("term.projectsHint"));
        },
      },
      status: {
        desc: () => t("term.status"),
        run() {
          const p = makeLine("term__line--out");
          const ok = document.createElement("span");
          ok.className = "term__ok";
          ok.textContent = "●";
          p.appendChild(ok);
          p.appendChild(document.createTextNode(" personal site · learning"));
          termOut.appendChild(p);
          scrollDown();
        },
      },
      contact: {
        desc: () => t("term.contact"),
        run() {
          out("email   markhayford816@icloud.com");
          out("wechat  ITGao06");
          printLink("github  ", "https://github.com/MarkHayford");
          out(t("term.contactHint"));
        },
      },
      open: {
        desc: () => t("term.open"),
        run(args) {
          const target = (args[0] || "").toLowerCase().replace(/\/$/, "");
          if (!target) {
            out(t("term.openUsage"));
            out(t("term.openSites") + Object.keys(SITES).join(" · "));
            return;
          }
          if (!SITES[target]) {
            err(t("term.openUnknown", { 0: target }) + Object.keys(SITES).join(" · "));
            return;
          }
          printLink(t("term.opening"), SITES[target]);
          window.open(SITES[target], "_blank", "noopener");
        },
      },
      meow: {
        desc: () => t("term.meow"),
        run() {
          out("  /\\_/\\");
          out(t("term.meowLine"));
          out("  > ^ <");
          printLink(t("term.meowLink"), "/meow/");
        },
      },
      clear: {
        desc: () => t("term.clear"),
        run() {
          termOut.textContent = "";
        },
      },
      ls: {
        desc: "列目录",
        run(args) {
          const dir = (args[0] || "").replace(/\/$/, "");
          if (!dir || dir === ".") out("skills/  projects/  about.txt  contact.txt");
          else if (dir === "skills") out("android/  web/  backend/  ai/");
          else if (dir === "projects") out("listene/  mqlt/  homepage/  equamotion/");
          else err(t("term.lsMiss", { 0: dir }));
        },
      },
      cat: {
        desc: "查看文件",
        run(args) {
          const file = args[0] || "";
          if (file === "about.txt") commands.about.run([]);
          else if (file === "contact.txt") commands.contact.run([]);
          else if (!file) err(t("term.catMiss"));
          else err(t("term.catNo", { 0: file }));
        },
      },
      echo: {
        desc: "回显",
        run(args, raw) {
          out(raw.length ? raw : "");
        },
      },
      pwd: {
        desc: "当前目录",
        run() {
          out("/home/0nyx");
        },
      },
      date: {
        desc: "当前时间",
        run() {
          out(new Date().toString());
        },
      },
      uname: {
        desc: "系统信息",
        run(args) {
          out(args[0] === "-a" ? "0Nyx-Cloud 1.0.0 static-nginx x86_64 · uptime: 一直在线" : "0Nyx-Cloud");
        },
      },
      history: {
        desc: "命令历史",
        run() {
          history.forEach((cmd, i) => out(String(i + 1).padStart(3, " ") + "  " + cmd));
        },
      },
    };
    const aliases = {
      work: "projects",
      hi: "about",
      hello: "about",
    };

    const respond = (raw) => {
      const parts = raw.split(/\s+/);
      let name = parts[0].toLowerCase();
      if (aliases[name]) name = aliases[name];
      const args = parts.slice(1);

      if (name === "sudo") {
        err(t("term.sudo"));
        return;
      }
      if (name === "rm") {
        err(t("term.rm"));
        return;
      }
      if (name === "cd") {
        out(t("term.cd"));
        return;
      }
      if (name === "exit" || name === "logout") {
        out(t("term.exit"));
        return;
      }
      if (name === "vim" || name === "vi" || name === "nano" || name === "emacs") {
        out(t("term.editor", { 0: name }));
        return;
      }
      if (commands[name]) {
        commands[name].run(args, raw.slice(parts[0].length).trim());
        return;
      }
      err("zsh: command not found: " + name);
      out(t("term.notFound"));
    };

    const completions = () => Object.keys(commands).concat(["sudo", "cd", "exit", "work"]);

    const onKeydown = (event) => {
      if (event.key === "ArrowUp") {
        if (!history.length) return;
        event.preventDefault();
        if (histIdx === -1) {
          draft = input.value;
          histIdx = history.length - 1;
        } else if (histIdx > 0) {
          histIdx -= 1;
        }
        input.value = history[histIdx];
        window.requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
        return;
      }
      if (event.key === "ArrowDown") {
        if (histIdx === -1) return;
        event.preventDefault();
        if (histIdx < history.length - 1) {
          histIdx += 1;
          input.value = history[histIdx];
        } else {
          histIdx = -1;
          input.value = draft;
        }
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        const value = input.value;
        if (!value) return;
        if (/^open\s+\S*$/i.test(value)) {
          const prefix = value.replace(/^open\s+/i, "").toLowerCase();
          const hits = Object.keys(SITES).filter((site) => site.startsWith(prefix));
          if (hits.length === 1) input.value = "open " + hits[0];
          else if (hits.length > 1) out(hits.join("  "));
          return;
        }
        if (!value.includes(" ")) {
          const hits = completions().filter((c) => c.startsWith(value.toLowerCase()));
          if (hits.length === 1) input.value = hits[0] + " ";
          else if (hits.length > 1) out(hits.join("  "));
        }
        return;
      }
      if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        commands.clear.run([]);
        return;
      }
      if (event.key === "c" && event.ctrlKey && !window.getSelection().toString()) {
        event.preventDefault();
        printEcho(input.value + "^C");
        input.value = "";
        histIdx = -1;
        return;
      }
    };

    const activate = () => {
      if (activated) return;
      activated = true;

      const form = document.createElement("form");
      form.className = "term__form";
      form.autocomplete = "off";
      const label = document.createElement("label");
      label.className = "term__prompt";
      label.htmlFor = "termInput";
      label.textContent = "$";
      input = document.createElement("input");
      input.id = "termInput";
      input.className = "term__input";
      input.type = "text";
      input.setAttribute("autocapitalize", "off");
      input.setAttribute("autocorrect", "off");
      input.setAttribute("spellcheck", "false");
      input.setAttribute("enterkeyhint", "send");
      input.setAttribute("aria-label", t("term.inputAria"));
      form.appendChild(label);
      form.appendChild(input);
      termCaretLine.replaceWith(form);

      out(t("term.tip"));

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const raw = input.value.trim();
        printEcho(input.value);
        input.value = "";
        histIdx = -1;
        draft = "";
        if (!raw) return;
        if (history[history.length - 1] !== raw) history.push(raw);
        if (history.length > 100) history.shift();
        respond(raw);
      });
      input.addEventListener("keydown", onKeydown);
    };

    // Activate once the boot animation has played (or immediately without motion).
    if (reduceMotion) {
      window.setTimeout(activate, 400);
    } else {
      termBody.addEventListener("animationend", (event) => {
        if (event.target === termCaretLine) activate();
      });
      window.setTimeout(activate, 4200); // fallback if the reveal never fires
    }

    // Click-to-focus without breaking text selection.
    termBody.addEventListener("click", () => {
      activate();
      if (input && !window.getSelection().toString()) {
        input.focus({ preventScroll: true });
      }
    });
  }
})();
