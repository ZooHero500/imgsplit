# AGENTS.md

面向在本仓库工作的 AI coding agent。除非用户另有明确指示，本文件优先于通用习惯；同时参考 `CLAUDE.md` 与 `.kiro/steering/`。

## 项目概况

- 产品：ImgSplit，隐私优先的在线图片处理工具站。
- 核心能力：图片分割、九宫格切图、调整尺寸、压缩/格式转换、水印、pSEO 场景工具页。
- 重要原则：图片处理尽量在浏览器端完成，不上传用户图片；公开页面重视 SEO 与多语言。

## 技术栈

- Next.js App Router + TypeScript strict mode。
- `next-intl` 多语言路由，语言列表见 `src/i18n/routing.ts`。
- Tailwind CSS v4，视觉风格偏 editorial/luxury，注意保持现有排版、留白、细边框、慢动画。
- Canvas/编辑器相关逻辑使用 Konva、Canvas API、IndexedDB/localStorage。
- 包管理器：Bun。优先使用 `bun install`、`bun add`、`bun run <script>`，不要主动引入 npm/yarn/pnpm 工作流。

## 常用命令

```bash
bun run dev
bun run build
bun run lint
bun test
```

如果本地端口被占用，换端口运行，例如：

```bash
bun run dev -- --port 3001
```

## 路由与入口架构

- 首页：`src/app/[locale]/page.tsx`
- 工具目录：`src/app/[locale]/tools/page.tsx`
- 核心工具：
  - `/`：图片分割，工作台 `/workspace`
  - `/grid`：九宫格，工作台 `/grid/workspace`
  - `/resize`
  - `/compress`
  - `/watermark`
- pSEO 场景页：`src/app/[locale]/[toolSlug]/page.tsx`，数据在 `src/lib/pseo/`。
- sitemap：`src/app/sitemap.ts`

工具入口的单一数据源是 `src/lib/tools/catalog.ts`。新增或调整核心工具时，同步维护这里，避免 navbar、footer、tools 页、快捷栏、sitemap 分裂。

公开站点导航和页脚使用共享组件：

- `src/components/SiteNav.tsx`
- `src/components/SiteFooter.tsx`

不要在公开页面重新复制一套 footer/nav。编辑器工作台内部 chrome 可以独立维护。

## 多语言与链接

- 内部链接使用 `@/i18n/navigation` 的 `Link` / router，避免绕过 locale 前缀。
- 新增面向用户的文案时，同步更新 `src/messages/*.json`。
- 默认语言是 `en`，`localePrefix` 为 `as-needed`。

## 代码组织

- App Router 页面放在 `src/app/`。
- 通用 UI primitive 放在 `src/components/ui/`。
- 业务组件放在 `src/components/` 或按功能子目录组织。
- 与 UI 无关的逻辑放在 `src/lib/`。
- hooks 放在 `src/hooks/`。
- 类型优先显式、避免 `any`，保持 UI 与核心算法分离。

## 前端修改注意事项

- 延续现有设计系统，不要无故改动整体视觉语言。
- 工具/编辑器界面优先稳定尺寸、避免移动端溢出和文本重叠。
- 按钮、工具入口、导航链接要保证桌面和移动端都可用。
- 修改公开页面后，至少检查首页、`/tools`、一个核心工具页、一个 pSEO 页、一个非英文路径。

## 验证建议

常规改动优先运行：

```bash
bun run build
bun run lint
```

涉及纯逻辑模块或 hooks 时运行相关测试：

```bash
bun test
```

如果全量 lint/test 因既有问题失败，要在最终说明中区分“既有失败”和“本次改动引入的问题”，并尽量对改动文件做 scoped 检查。

## Git 与工作区

- 仓库可能有未跟踪文档、营销脚本、工作树目录或用户本地改动。
- 只暂存与当前任务相关的文件，不要使用 `git add .`。
- 不要回滚用户未明确要求回滚的改动。
- 提交时优先使用 Conventional Commits；如用户要求中文提交，使用简体中文正文说明验证情况。
