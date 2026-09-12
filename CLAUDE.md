# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概况

ImgSplit（imgsplit.com）—— 隐私优先的在线图片处理工具站（分割、九宫格、轮播切图、调整尺寸、压缩、水印、马赛克、拼图、社媒导出、AI 抠图）。核心原则：**图片处理全部在浏览器端完成，不上传用户图片**；公开页面重视 SEO 与多语言。更多 agent 约定见 `AGENTS.md`，项目级规则见 `.kiro/steering/`（product/tech/structure）。

## 常用命令

包管理器强制使用 **bun**，禁止 npm/yarn/pnpm。

```bash
bun install               # 安装依赖
bun run dev               # 开发服务器（端口占用时: bun run dev -- --port 3001）
bun run build             # 生产构建
bun run lint              # ESLint
bun run test              # 全部测试（vitest run）
bun run test src/lib/__tests__/image-splitter.test.ts   # 单个测试文件
```

注意：跑测试用 `bun run test`（走 vitest），不要用 `bun test`（会调用 Bun 内置 runner）。测试环境为 jsdom + fake-indexeddb，测试文件位于 `src/lib/__tests__/`、`src/hooks/__tests__/`。

其他脚本：`bun run models:background-removal`（下载本地 AI 抠图模型）、`bun run seo:indexnow`。

## 架构

Next.js 16 App Router + React 19 + TypeScript strict（严禁 `any`）。混合渲染：公开/SEO 页面走 SSR/SSG，编辑器工作台为客户端渲染。

### 分层与依赖方向（单向，禁止反向）

```
src/app/[locale]/   页面路由（next-intl 多语言）
src/components/     业务组件（含 Konva 画布编辑器）；src/components/ui/ 为 shadcn 基础组件，无业务逻辑
src/hooks/          可复用 hooks（编辑器状态、undo/redo、viewport 等）
src/lib/            与 UI 无关的纯逻辑（各工具的切图/压缩/水印算法、storage-service、zip 导出）
src/workers/        Web Worker（本地 AI 抠图，@huggingface/transformers）
```

依赖方向：`components/` → `hooks/` → `lib/`。核心算法必须放在 `lib/`，组件只负责展示。路径别名 `@/` → `src/`。

### 关键单一数据源

- **工具入口目录**: `src/lib/tools/catalog.ts`（`CORE_TOOLS`）。新增/调整核心工具必须同步维护这里——navbar、footer、`/tools` 页、快捷栏、sitemap 均由它驱动，不要各处复制。
- **pSEO 场景页**: 动态路由 `src/app/[locale]/[toolSlug]/page.tsx`，页面数据在 `src/lib/pseo/`（按 locale 与工具分文件）。
- **sitemap**: `src/app/sitemap.ts`。
- 公开页面共享 `src/components/SiteNav.tsx` 与 `SiteFooter.tsx`，不要重新实现 nav/footer；编辑器工作台内部 chrome 可独立维护。

### 多语言（next-intl）

- 语言列表见 `src/i18n/routing.ts`：en（默认）、zh-CN、ja、ko、es、pt-BR；`localePrefix: "as-needed"`，localeDetection 关闭。
- 内部链接必须使用 `@/i18n/navigation` 的 `Link`/router，不要用 `next/link` 绕过 locale 前缀。
- 新增面向用户的文案时，同步更新全部 `src/messages/*.json`。

### 数据与状态

- 图片等大数据存 IndexedDB（Dexie），元数据/配置存 localStorage，封装在 `src/lib/storage-service.ts`。
- 工具页 → 工作台间的图片传递用 `src/lib/pending-*-upload.ts`。
- 画布交互用 Konva.js + react-konva（分割线拖拽、磁吸、标尺参考线）。
- 服务端 API 仅限 AI 功能：`src/app/api/analyze`、`src/app/api/segment`（openai/replicate）；本地 AI 抠图完全在浏览器 Worker 中运行。

## 命名与代码规范

- React 组件文件 PascalCase（`SplitEditor.tsx`）；lib/hooks 文件 kebab-case（`use-split-lines.ts`、`image-splitter.ts`）。
- 错误状态用 discriminated unions 表达。
- 视觉风格为 luxury/editorial（暖白/炭黑/金、零圆角、慢动画、Playfair Display + Inter），不要无故改动整体视觉语言。

## 验证与 Git

- 常规改动至少跑 `bun run build` + `bun run lint`；涉及 `lib/`/`hooks/` 纯逻辑时跑相关测试。
- 修改公开页面后，检查首页、`/tools`、一个核心工具页、一个 pSEO 页、一个非英文路径。
- 若全量 lint/test 因既有问题失败，最终说明中区分「既有失败」与「本次引入」。
- 只暂存与当前任务相关的文件，不要 `git add .`；提交用 Conventional Commits。

# AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Context

### Paths
- Steering: `.kiro/steering/`
- Specs: `.kiro/specs/`

### Steering vs Specification

**Steering** (`.kiro/steering/`) - Guide AI with project-wide rules and context
**Specs** (`.kiro/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `.kiro/specs/` for active specifications
- Use `/kiro:spec-status [feature-name]` to check progress

## Development Guidelines
- Think in English, generate responses in Simplified Chinese. All Markdown content written to project files (e.g., requirements.md, design.md, tasks.md, research.md, validation reports) MUST be written in the target language configured for this specification (see spec.json.language).

## Minimal Workflow
- Phase 0 (optional): `/kiro:steering`, `/kiro:steering-custom`
- Phase 1 (Specification):
  - `/kiro:spec-init "description"`
  - `/kiro:spec-requirements {feature}`
  - `/kiro:validate-gap {feature}` (optional: for existing codebase)
  - `/kiro:spec-design {feature} [-y]`
  - `/kiro:validate-design {feature}` (optional: design review)
  - `/kiro:spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/kiro:spec-impl {feature} [tasks]`
  - `/kiro:validate-impl {feature}` (optional: after implementation)
- Progress check: `/kiro:spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/kiro:spec-status`
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

## Steering Configuration
- Load entire `.kiro/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/kiro:steering-custom`)
