# 响应式设计修复 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复系统各业务模块的响应式设计问题，确保移动端（320px~767px）和平板端（768px~1023px）的可用性。

**Architecture:** 按优先级从高到低修复 5 个问题 + 1 个清理：Split Workspace 移动端布局（P0）、Split 工具栏溢出（P0）、Landing 页移动导航（P1）、上传区内边距（P2）、Lightbox 移动端（P2）、清理死代码 SplitPreview（P3）。所有修改使用 Tailwind 断点 + 项目已有的自定义动画模式，不引入新依赖。

**Tech Stack:** Next.js 16 / React 19 / Tailwind CSS 4 / shadcn-ui / next-intl / bun

---

## 文件映射

| 任务 | 操作 | 文件路径 |
|------|------|---------|
| Task 1 | 修改 | `src/app/[locale]/workspace/page.tsx` |
| Task 1 | 修改 | `src/components/HistorySidebar.tsx` |
| Task 2 | 修改 | `src/components/SplitEditor.tsx` |
| Task 3 | 创建 | `src/components/MobileNav.tsx` |
| Task 3 | 修改 | `src/app/[locale]/page.tsx` |
| Task 3 | 修改 | `src/app/[locale]/grid/page.tsx` |
| Task 3 | 修改 | `src/messages/en.json` |
| Task 3 | 修改 | `src/messages/zh-CN.json` |
| Task 4 | 修改 | `src/components/UploadZone.tsx` |
| Task 4 | 修改 | `src/components/grid/GridUploadZone.tsx` |
| Task 5 | 修改 | `src/components/ResultSheet.tsx` |
| Task 6 | 删除 | `src/components/SplitPreview.tsx`（死代码） |

---

### Task 1: Split Workspace 侧边栏移动端适配 (P0)

**问题：** `HistorySidebar` 固定 `w-64`，在移动端占据过多空间，编辑器几乎不可用。

**方案：** 移动端将侧边栏隐藏，通过浮动按钮触发全屏 overlay 抽屉。桌面端保持不变。

**Files:**
- Modify: `src/components/HistorySidebar.tsx`
- Modify: `src/app/[locale]/workspace/page.tsx`

- [ ] **Step 1: 修改 HistorySidebar 接受 `open` / `onClose` props**

在 `src/components/HistorySidebar.tsx` 中：

1. 新增 props：`open?: boolean`、`onClose?: () => void`
2. 外层容器改为两套 class：
   - 桌面端（`md` 以上）：保持原有 `flex flex-col h-full w-64 border-r bg-card`
   - 移动端（`md` 以下）：`fixed inset-0 z-50` overlay，带 backdrop 和 `transform` 过渡

```tsx
// HistorySidebar props 新增
interface HistorySidebarProps {
  onLoadRecord: (record: { ... }) => void
  onNewCanvas: () => void
  open?: boolean      // 新增：移动端控制显隐
  onClose?: () => void // 新增：移动端关闭回调
}
```

**核心思路：** 使用单个容器 + 条件 className，而非两份 DOM。外层 `<div>` 在桌面端为 static sidebar，在移动端为 fixed overlay drawer。

```tsx
import { X } from "lucide-react"

export function HistorySidebar({
  onLoadRecord,
  onNewCanvas,
  open,
  onClose,
}: HistorySidebarProps) {
  // ... 原有 hooks 保持不变 ...

  const handleClick = useCallback(
    (record: HistoryRecord) => {
      onLoadRecord({
        imageBlob: record.imageBlob,
        lines: record.lines,
        originalFileName: record.originalFileName,
        originalMimeType: record.originalMimeType,
        images: record.images,
      })
      onClose?.() // 移动端点击记录后自动关闭抽屉
    },
    [onLoadRecord, onClose]
  )

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-primary/20 backdrop-blur-[2px] md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          flex flex-col h-full bg-card
          fixed inset-y-0 left-0 z-50 w-72 shadow-[8px_0_32px_rgba(0,0,0,0.08)]
          transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none md:border-r md:transition-none
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground md:hidden"
        >
          <X className="h-4 w-4" />
        </button>

        {/* === 以下为原有侧边栏内容，完全不变 === */}
        <Link href="/" className="flex items-center gap-2 px-3 py-3 border-b ...">
          {/* ... */}
        </Link>
        <div className="flex items-center justify-between p-3 border-b">
          {/* ... */}
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* ... records.map 使用上面修改后的 handleClick ... */}
        </div>
        <div className="border-t p-3">
          <LocaleSwitcher />
        </div>
      </div>
    </>
  )
}
```

关键点：
- **单个容器**，不重复 DOM
- 移动端：`fixed inset-y-0 left-0 z-50 w-72` + `translate-x` 动画
- 桌面端：`md:static md:w-64 md:translate-x-0 md:border-r` 覆盖移动端样式
- `handleClick` 中新增 `onClose?.()` 实现点击记录后自动关闭抽屉

- [ ] **Step 2: 修改 workspace/page.tsx 添加移动端 toggle 按钮**

在 `src/app/[locale]/workspace/page.tsx` 中：

1. 新增 `sidebarOpen` state
2. 在 `<main>` 区域添加浮动 toggle 按钮（仅移动端可见）
3. 将 `open` / `onClose` 传给 `HistorySidebar`

```tsx
export default function WorkspacePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // ... 原有 state ...

  return (
    <div className="flex h-screen">
      <HistorySidebar
        onLoadRecord={handleLoadRecord}
        onNewCanvas={handleNewCanvas}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with sidebar toggle */}
        <div className="flex items-center gap-2 p-2 border-b md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground"
          >
            <Menu className="h-4 w-4" />
          </button>
          <LogoIcon className="h-3.5 w-3.5 text-foreground" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium">ImgSplit</span>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden p-2 md:p-4">
          {/* ... DynamicSplitEditor ... */}
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: 浏览器验证**

Run: `bun run dev`

验证要点：
- 桌面端（>= 768px）：侧边栏始终可见，行为不变
- 移动端（< 768px）：侧边栏隐藏，左上角显示 Menu 按钮，点击弹出抽屉，点击 backdrop 或 X 关闭
- 抽屉内历史记录点击后正常加载并自动关闭

- [ ] **Step 4: Commit**

```bash
git add src/components/HistorySidebar.tsx src/app/\[locale\]/workspace/page.tsx
git commit -m "fix(workspace): 侧边栏移动端改为抽屉式布局"
```

---

### Task 2: SplitEditor 工具栏响应式折叠 (P0)

**问题：** 工具栏在一行内放置了 10+ 个按钮，移动端会溢出或极度拥挤。

**方案：** 工具栏在移动端分两行显示：第一行放核心操作（添加线条、撤销重做、生成），第二行放辅助操作（添加图片、重置、快捷键提示）。

**Files:**
- Modify: `src/components/SplitEditor.tsx`

- [ ] **Step 1: 重构工具栏为 flex-wrap 布局**

在 `src/components/SplitEditor.tsx` 约第 756 行，将工具栏 `<div>` 改为：

```tsx
<div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
  {/* Row 1: Core actions */}
  <Button size="xs" variant="outline" onClick={() => addLine("horizontal")} disabled={!canAddHorizontal}>
    <span className="hidden sm:inline">{t("addHorizontal")}</span>
    <span className="sm:hidden">H</span>
  </Button>
  <Button size="xs" variant="outline" onClick={() => addLine("vertical")} disabled={!canAddVertical}>
    <span className="hidden sm:inline">{t("addVertical")}</span>
    <span className="sm:hidden">V</span>
  </Button>
  <div className="w-px h-5 bg-border mx-0.5" />
  {/* Undo/Redo - 保持不变 */}
  {/* ... */}
  <div className="w-px h-5 bg-border mx-0.5" />
  <Button size="xs" onClick={handleGenerate} disabled={isSplitting}>
    {isSplitting ? t("generating") : isMultiImage ? t("batchGenerate", { count: images.length }) : t("generate")}
  </Button>
  {splitResults.length > 0 && (
    <Button size="xs" variant="secondary" onClick={() => setSheetOpen(true)}>{t("viewResults")}</Button>
  )}
  <div className="flex-1 min-w-0" />
  {/* Row 2 items: wrap to next line on mobile */}
  {isMultiImage && (
    <span className="text-[10px] text-muted-foreground hidden sm:inline">
      {t("imageCount", { count: images.length })}
    </span>
  )}
  <div className="hidden sm:block w-px h-5 bg-border mx-0.5" />
  {/* ... append / refresh / keyboard buttons 保持不变 ... */}
</div>
```

关键改动：
1. 外层 `div` 添加 `flex-wrap`
2. 「添加水平线」「添加垂直线」按钮在小屏用缩写（H / V）
3. 图片计数、分隔线等次要元素在 `sm` 以下隐藏
4. `flex-1` 加 `min-w-0` 允许换行

- [ ] **Step 2: 编辑器区域最小高度调整**

将 `containerRef` 的 `style={{ minHeight: 400 }}` 改为响应式：

```tsx
style={{ minHeight: "min(400px, calc(100vh - 160px))" }}
```

这确保在小屏上编辑器区域不会超出视口。

- [ ] **Step 3: 浏览器验证**

Run: `bun run dev`

验证要点：
- 桌面端：工具栏单行显示，所有按钮可见
- 移动端（< 640px）：按钮文字缩短为 H/V，次要元素隐藏，flex-wrap 允许换行
- 编辑器区域不超出视口

- [ ] **Step 4: Commit**

```bash
git add src/components/SplitEditor.tsx
git commit -m "fix(workspace): 工具栏移动端响应式折叠"
```

---

### Task 3: Landing 页面移动端导航菜单 (P1)

**问题：** 两个 Landing 页面（首页和 Grid 页）在移动端隐藏了导航链接（`hidden md:inline`），但没有提供汉堡菜单替代方案。

**方案：** 创建一个共享的 `MobileNav` 组件，使用固定 overlay + 右侧滑入面板（与 ResultSheet 设计一致）。

**Files:**
- Create: `src/components/MobileNav.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/grid/page.tsx`
- Modify: `src/messages/en.json`
- Modify: `src/messages/zh-CN.json`

- [ ] **Step 1: 添加 i18n key**

在 `src/messages/en.json` 的 `nav` 对象中添加：

```json
"nav": {
  ...existing keys...,
  "menu": "Menu",
  "close": "Close"
}
```

在 `src/messages/zh-CN.json` 的 `nav` 对象中添加：

```json
"nav": {
  ...existing keys...,
  "menu": "菜单",
  "close": "关闭"
}
```

- [ ] **Step 2: 创建 MobileNav 组件**

创建 `src/components/MobileNav.tsx`：

```tsx
"use client"

import { useState, useCallback } from "react"
import { Menu, X, ArrowRight } from "lucide-react"

interface NavLink {
  href: string
  label: string
}

interface MobileNavProps {
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
  menuLabel?: string  // aria-label for accessibility
  closeLabel?: string // aria-label for close button
}

export function MobileNav({ links, ctaLabel, ctaHref, menuLabel = "Menu", closeLabel = "Close" }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className="md:hidden">
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label={menuLabel}
      >
        <Menu className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-primary/20 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-background shadow-[-8px_0_32px_rgba(0,0,0,0.08)] transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4 border-b border-border">
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col p-6 gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="py-3 text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-accent transition-colors duration-500 border-b border-border"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-6 border-t border-border">
          <a
            href={ctaHref}
            onClick={handleLinkClick}
            className="group relative flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] overflow-hidden"
          >
            <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
            <span className="relative z-10">{ctaLabel}</span>
            <ArrowRight className="relative z-10 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: 在首页 nav 中集成 MobileNav**

在 `src/app/[locale]/page.tsx` 的 `<nav>` 部分（约第 96 行），在 `<LocaleSwitcher>` 和 `<SmartCTA>` 之间添加：

```tsx
<MobileNav
  links={[
    { href: "#features", label: t("nav.features") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#faq", label: t("nav.faq") },
  ]}
  ctaLabel={t("nav.getStarted")}
  ctaHref="#upload"
  menuLabel={t("nav.menu")}
  closeLabel={t("nav.close")}
/>
```

同时 import `MobileNav`：
```tsx
import { MobileNav } from "@/components/MobileNav"
```

- [ ] **Step 4: 在 Grid Landing 页 nav 中集成 MobileNav**

在 `src/app/[locale]/grid/page.tsx` 的 `<nav>` 部分（约第 68 行），类似集成：

```tsx
<MobileNav
  links={[
    { href: "#grid-types", label: tLanding("types.overline") },
    { href: "#how-it-works", label: tLanding("howItWorks.overline") },
    { href: "#faq", label: tLanding("faq.overline") },
  ]}
  ctaLabel={tLanding("hero.ctaPrimary")}
  ctaHref="#upload"
  menuLabel={t("nav.menu")}
  closeLabel={t("nav.close")}
/>
```

注意：Grid 页面需要额外获取 `nav` 命名空间的翻译：`const tNav = await getTranslations("nav")`，然后使用 `tNav("menu")` / `tNav("close")`。

- [ ] **Step 5: 浏览器验证**

Run: `bun run dev`

验证要点：
- 桌面端（>= 768px）：汉堡按钮不可见，原有导航链接正常
- 移动端（< 768px）：显示汉堡按钮，点击弹出右侧面板，链接可点击并关闭面板，CTA 按钮样式与品牌一致
- 首页和 Grid 页都正常

- [ ] **Step 6: Commit**

```bash
git add src/components/MobileNav.tsx src/app/\[locale\]/page.tsx src/app/\[locale\]/grid/page.tsx src/messages/en.json src/messages/zh-CN.json
git commit -m "feat(nav): 添加移动端汉堡菜单导航"
```

---

### Task 4: UploadZone 小屏内边距优化 (P2)

**问题：** `p-16`（64px 每侧）在 320px 屏幕上只留下 192px 内容区域，过于拥挤。

**方案：** 改为渐进式内边距 `p-8 sm:p-16 md:p-24`。

**Files:**
- Modify: `src/components/UploadZone.tsx`
- Modify: `src/components/grid/GridUploadZone.tsx`

- [ ] **Step 1: 修改 UploadZone.tsx**

在 `src/components/UploadZone.tsx` 约第 89 行，将：

```
p-16 md:p-24
```

改为：

```
p-8 sm:p-16 md:p-24
```

- [ ] **Step 2: 修改 GridUploadZone.tsx**

在 `src/components/grid/GridUploadZone.tsx` 约第 42 行，同样将：

```
p-16 md:p-24
```

改为：

```
p-8 sm:p-16 md:p-24
```

- [ ] **Step 3: 浏览器验证**

Run: `bun run dev`

在 320px 视口下验证上传区域有足够的内容空间，文字不被挤压。

- [ ] **Step 4: Commit**

```bash
git add src/components/UploadZone.tsx src/components/grid/GridUploadZone.tsx
git commit -m "fix(upload): 优化小屏幕上传区域内边距"
```

---

### Task 5: Lightbox 移动端导航优化 (P2)

**问题：** Lightbox 的左右导航按钮使用 `left-6 / right-6`（24px），在窄屏上可能与图片重叠。关闭按钮和底部信息也需要调整。

**方案：** 移动端导航按钮缩小并贴近屏幕边缘，底部信息区调整位置。

**Files:**
- Modify: `src/components/ResultSheet.tsx`

- [ ] **Step 1: 修改 Lightbox 组件中的按钮定位**

在 `src/components/ResultSheet.tsx` 的 `Lightbox` 组件中（约第 56~141 行）：

1. Prev 按钮：`left-6` → `left-2 sm:left-6`，按钮尺寸 `w-10 h-10` → `w-8 h-8 sm:w-10 sm:h-10`
2. Next 按钮：`right-6` → `right-2 sm:right-6`，按钮尺寸同上
3. Close 按钮：`top-6 right-6` → `top-3 right-3 sm:top-6 sm:right-6`，移动端加大点击区 `w-10 h-10 sm:w-auto sm:h-auto`
4. 底部信息：`bottom-6` → `bottom-3 sm:bottom-6`

```tsx
{/* Prev button */}
{hasPrev && (
  <button
    onClick={(e) => { e.stopPropagation(); onPrev() }}
    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-500 z-10"
  >
    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
  </button>
)}

{/* Next button */}
{hasNext && (
  <button
    onClick={(e) => { e.stopPropagation(); onNext() }}
    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground border border-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-500 z-10"
  >
    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
  </button>
)}
```

- [ ] **Step 2: 浏览器验证**

Run: `bun run dev`

在 ResultSheet 中打开 Lightbox，验证移动端按钮不遮挡图片。

- [ ] **Step 3: Commit**

```bash
git add src/components/ResultSheet.tsx
git commit -m "fix(lightbox): 优化移动端导航按钮定位"
```

---

### Task 6: 清理死代码 SplitPreview (P3)

**问题：** `SplitPreview.tsx` 未被任何文件导入，是死代码（功能已被 `ResultSheet` 取代）。其中还有硬编码中文。

**方案：** 直接删除该文件，清理代码库。

**Files:**
- Delete: `src/components/SplitPreview.tsx`

- [ ] **Step 1: 确认无导入引用**

Run: `grep -r "SplitPreview" src/ --include="*.tsx" --include="*.ts"`

预期输出：仅 `SplitPreview.tsx` 自身出现，无其他文件引用。

- [ ] **Step 2: 删除文件**

```bash
rm src/components/SplitPreview.tsx
```

- [ ] **Step 3: 验证构建**

Run: `bun run build`

预期：构建成功，无缺失引用错误。

- [ ] **Step 4: Commit**

```bash
git add -u src/components/SplitPreview.tsx
git commit -m "chore: 删除未使用的 SplitPreview 组件"
```

---

## 验证清单

完成所有 Task 后执行全面验证：

- [ ] `bun run build` 构建成功，无类型错误
- [ ] `bun run lint` 无新增 lint 警告
- [ ] 320px 视口：首页导航可用、上传区域不拥挤
- [ ] 375px 视口（iPhone）：Split Workspace 可正常使用
- [ ] 768px 视口（iPad）：所有页面正常过渡
- [ ] 1440px 视口：桌面端行为无回归
