# ImgSplit 全站样式改造：Ink Edition（以参考文件为准）

## 目标
将全站（营销页 + 编辑器工作台）视觉语言从「编辑风 ivory/gold」整体迁移到参考文件 `imgsplit-ink-edition.html` 的 **Ink Edition** 风格：报刊版画框、纸色/墨色/琥珀信号色 OKLCH 体系、Bodoni Moda 大标题 + Archivo Narrow 窄体标签 + Manrope 正文、1px 墨色分割线、墨色扫入/反相按钮、刊头式工具表格。

## 参考设计要点（已从参考文件提取）
- **调色板（OKLCH）**：paper `0.94 0.018 78` / paper-soft / ink `0.19 0.028 256` / ink-soft / rule / rule-soft / signal `0.67 0.19 43`（琥珀，替代现有金色）/ accent-deep / signal-ink / success / error / focus（蓝，focus ring）
- **动效令牌**：`--press: 90ms`、`--state: 160ms`、`--ink-travel: 240ms`、`--layout: 320ms` + 三组 cubic-bezier 缓动
- **版式**：`.page` 版画框（`width: min(1320px, calc(100% - 28px))`、`margin: 14px auto 34px`、四周 `1px solid var(--ink)`）；masthead 三栏刊头（出版标记 30px 墨方块 + 窄体大写刊名 + 信号下划线导航 + meta 区 + nav-cta 反相按钮）；hero（kicker 信号条、Bodoni 巨号标题带斜体琥珀 em、hero-bottom 简介 + 3px 墨线原则句、A/B/C/D 墨色序号索引栏）；signature-stage 上传区（80px 间距竖向列线 repeating-linear-gradient + 右下角微标签 + 状态行）；ink-button（`1fr 48px` 网格、hover 信号色扫入 + 标签右移 7px + 图标格反相、active 90ms 墨色填充、aria-busy 打印进度条、focus-visible 3px 蓝色描边）；tool-grid 2 列 1px rule 发丝网格、hover 整格墨色从底部扫入、Bodoni 序号 + 箭头格；step-row 用 **ink 色** 分隔线 + 巨号 Bodoni 数字；inspector 栏（eyebrow 标签、specs 规格表、绿点 state-list、event log）；benefits 墨底区块（信号色 Bodoni 数字）；FAQ 编辑风 tabs + rail；CTA band；footer 4 列墨线分隔 + footer-base 微标签
- **响应式**：980px / 680px 两档断点（当前 Tailwind sm/md/lg 同理）

## 实施步骤

### 1. 设计令牌与字体（地基）
- `src/app/[locale]/layout.tsx`：`Playfair_Display`/`Inter` → `Bodoni_Moda`（--font-serif）+ `Manrope`（--font-sans）+ `Archivo_Narrow`（新增 --font-condensed），CJK 用系统字体回退（PingFang SC / 游明朝 / Apple SD Gothic Neo 等）
- `src/app/globals.css`：
  - `:root` 全部替换为参考 OKLCH 值；语义映射保持 Tailwind 名（background→paper、foreground→ink、primary→ink、primary-foreground→paper、accent→signal、accent-foreground→signal-ink、muted→paper-soft、muted-foreground→ink-soft、border→rule、ring→focus、destructive→error），新增 `--paper-soft/--rule/--rule-soft/--signal/--accent-deep/--success` 等 token
  - 动效令牌（press/state/ink-travel/layout + 缓动），替换 ease-luxury 为参考缓动
  - body 加参考的竖向中心线背景；`color-scheme: light`；.dark 块保持不动（维持现状死代码，不接主题切换）
  - 新增组件类：`.kicker`、`.eyebrow`、`.section-code`、`.amplitude`、`.state-tag`、`.lab` 系列、`.edition`（版画框）、`.tool-grid/.tool-cell`、`.step-row/.step`、`.specs/.spec`、`.state-list/.state-item`、`.benefit`、`.footer` 系列（按参考 CSS 复刻）
  - 全局 focus-visible：3px `var(--focus)` 描边；保留 prefers-reduced-motion
  - 移除 `.noise-overlay`（参考文件没有该元素）
- 检查 `GridLines` 组件：用参考的 body 中心线 + 上传区列线替代，从首页移除固定列线层

### 2. 按钮体系
- 新建 `src/components/ui/InkButton.tsx`：完整复刻参考 ink-button（bordered 1fr+icon-cell 网格、signal 扫入、标签位移、active 反相 press、busy 进度条、success/error 态），尺寸 default(48px)/hero(82px)/dense(36px)/icon，变体 default/inverse(墨底纸字)/ghost
- 迁移主要 CTA：营销页主 CTA（SmartCTA、首页、tools、ToolLanding、grid landing）、nav-cta、上传区 hero 按钮、工作台主操作（下载、导出）、编辑器工具条主按钮
- 保留 `ui/button.tsx` API，但重设其视觉为 ink 语言（0 圆角、uppercase 微字、无阴影扁平化、sweep、press、focus ring），供工具条次级按钮/icon 按钮使用——保证全站无旧样式残留

### 3. 全局 chrome（版画框 + 刊头）
- 新建 `SiteFrame` 包装（.edition 版画框：1px ink 边框 + 外边距），用于营销页模板（首页、/tools、grid 落地页、ToolLanding/pSEO 共用组件），编辑器保持全屏
- `SiteNav.tsx` → 复刻 masthead：出版标记（LogoIcon 重绘为 30px 墨方块 + 窄体字，gold → signal token）、"ImgSplit" 大写窄体刊名 + 副标、导航链接信号下划线动画、meta 区（Local · Private · Free + issue dot + nav-cta）、工具下拉与移动端抽屉同步换肤；保持 sticky
- `SiteFooter.tsx` → 4 列墨线分隔 footer + footer-base 微标签（"Made with paper & ink" 风格）
- `ReturningUserToolbar`、`MobileNav` 同步换肤

### 4. 营销页逐页改造
- **首页** `src/app/[locale]/page.tsx`：按参考解剖重构——hero（kicker + Bodoni h1 斜体 em + hero-bottom + 索引栏 A/B/C/D）、signature-stage 上传区（列线背景、状态行、hero 按钮；UploadZone 换肤）、Lab A 工具注册表（tool-cell 墨色扫入 + Bodoni 序号 + 箭头格）、Lab B 工作流四步（ink 分隔线）、inspector 规格栏（specs + 绿点承诺清单）、墨底 benefits 四宫格、FAQ（保持折叠交互，视觉改编辑风：墨线行 + 信号 hover；参考的 3-tab 结构仅适配首页文案量少的情况，pSEO 页继续用折叠，不重构内容结构）、CTA band、页脚
- **tools 页**：同一 hero 配方；ToolCard（`src/components/pseo/ToolCard.tsx`）改为 tool-cell（Bodoni 序号、hover 墨色扫入、箭头格）
- **ToolLanding / grid 落地页**（覆盖全部 pSEO 页）：hero 配方、上传面板 → signature-stage 风格、场景卡 → tool-cell/step 风格、CTA band、footer 网格
- 按钮阴影全部移除（参考为扁平墨线）

### 5. 工作台与编辑器
- **分割工作台** `workspace/page.tsx` + SplitEditor：token 换肤（纸底墨线）、工具条 ink 按钮、历史侧栏 1px 墨线 + 微标签、`rounded-lg` → 0、画布底纹 paper-soft
- **九宫格/轮播工作台**：紧凑 masthead-lite 头部（出版标记 + 工具名 + 主 CTA）、GridSteps 徽章改墨方块/信号块、选中态墨色填充、下载按钮 ink 样式
- **全屏编辑器**（resize/compress/watermark/mosaic/collage/social-export）：保持 h-screen，顶部紧凑 ink 工具条（含 icon-cell 下载按钮）、状态条 Archivo Narrow 微标签、输入控件 0 圆角、ResizeCanvas 棋盘格换 paper-soft、`rounded` 泄漏清理（ui/input、select、checkbox、tooltip、ResizeEditor、HistorySidebar）

### 6. 文案与 i18n
- 新增 chrome 文案（刊头副标、Local · Private · Free、kicker 标签、footer-base 等）同步写入 `src/messages/*.json` 全部 6 个语言（en/zh-CN/ja/ko/es/pt-BR），复用现有 key 优先

### 7. 验证
- `bun run build` + `bun run lint`；浏览器抽查：首页、/tools、一个核心工具页、一个 pSEO 页、zh-CN 路径、分割工作台、一个全屏编辑器；确认移动端无溢出（masthead 折叠、tool-grid 单列）

## 关键取舍（默认按此执行）
- 编辑器/工作台：**全屏布局 + 统一 token**，不套版画框（功能页可用空间优先）
- 深色模式：以参考为准仅浅色，.dark 死代码不动
- FAQ：保留现有折叠交互，仅换视觉（参考的 tabs 结构不适配 pSEO 多问答页）
- 字体：换三款参考字体，CJK 不加载 Noto Serif SC（性能优先，系统衬线回退）
- 参考文件中的 demo JS（event log、motion 开关）属于演示道具，不迁移——真实功能由现有应用逻辑承担

## 提交节奏
按步骤分批 Conventional Commits（feat(design)/refactor(design)），每批可独立验证；按 AGENTS.md 只暂存相关文件，不 `git add .`。