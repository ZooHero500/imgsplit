# 图片压缩 & 格式转换 — 设计文档

> 日期: 2026-05-26
> 状态: 已批准
> 工具编号: ImgSplit 扩展工具 #1

## 概述

新增浏览器端图片压缩与格式转换工具。支持 PNG/JPEG/WebP 互转，实时预览压缩效果，批量处理。所有处理在浏览器端完成，不上传到服务器。

## 核心决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 交互模式 | 融合模式（单张预览 + 多图自动切批量） | 两种场景都是最优体验 |
| pSEO 策略 | 预设参数入口 (`/compress?format=webp&quality=80`) | 用户从落地页进入直接看到预期的转换界面 |
| 编辑器布局 | 上下结构（对比预览在上，控制条在下） | 预览面积最大化，控件只有格式+质量，不需要侧边栏 |

## 架构

### 编辑器路由

`/compress` — 独立 Next.js 页面，与 `/resize` 同级。不走 pSEO 动态路由 `[toolSlug]`。

### 核心处理流程

```
File → validateFiles() → loadImage() → canvas.toBlob(mimeType, quality) → download
```

不走 `exportArtboard()`（无需 transform/crop），直接用原图尺寸 canvas 导出。

### 格式支持

- PNG（无损，无质量滑块）
- JPEG（有损，质量滑块 10-100，默认 80）
- WebP（有损，质量滑块 10-100，默认 80）

### 文件限制

复用现有约束：单文件 20MB，总计 50MB。

## 单张模式

### 页面状态流

```
初始状态 → 全屏 UploadZone（拖拽 + 点击）
上传后 → UploadZone 消失，显示对比预览 + 控制条
```

### 对比预览（上方）

- 左侧：原始图（格式标签 + 文件大小）
- 右侧：压缩后图（目标格式标签 + 压缩后大小 + 节省百分比）
- 两侧图片用 `<img>` + `object-fit: contain` 展示，不使用 Konva canvas
- 原始图 URL：`URL.createObjectURL(file)`
- 压缩后 URL：`URL.createObjectURL(compressedBlob)`
- 压缩流程：离屏 canvas `drawImage` → `toBlob(mimeType, quality)` → 获得 Blob

### 底部控制条（一行排列）

```
[ PNG | JPEG | WebP ]  ——  质量 ===●======= 80%  ——  [ 下载 WebP (186 KB) ]
```

- 格式按钮组：点击切换，立即重新压缩
- 质量滑块：**拖动结束（onChangeEnd）** 时触发压缩
- PNG 选中时：质量滑块自动隐藏
- 下载按钮：文案动态显示 `下载 {格式} ({大小})`

### 其他交互

- 左上角「换一张」按钮可重新上传
- 压缩处理 <100ms（canvas.toBlob），无需 loading 状态
- 文件大小从 `Blob.size` 精确读取

## 批量模式

### 触发条件

- 单张模式下点击「+ 添加更多图片」→ 切换为批量视图
- 单张模式下再次拖入文件 → 切换为批量视图
- 初始上传时选择多张文件 → 直接进入批量视图

### 批量视图布局

```
┌─────────────────────────────────────────────┐
│  输出设置:  [ PNG | JPEG | WebP ]  质量 80% │  ← 顶部设置条
├─────────────────────────────────────────────┤
│  photo-1.png    2.4 MB → 186 KB   ↓92%  ✓  │
│  screenshot.jpg 1.1 MB → 95 KB    ↓91%  ✓  │
│  banner.png     5.7 MB → 420 KB   ↓93%  ✓  │
│                                             │
│        + 拖拽添加更多图片                     │
├─────────────────────────────────────────────┤
│  3 个文件  总节省 8.5 MB (92%)   [ 下载 ZIP ] │  ← 底部统计
└─────────────────────────────────────────────┘
```

### 文件列表行为

- 每行：文件名、原始大小 → 压缩大小、节省百分比、状态（处理中 spinner / 就绪 ✓）
- Hover 显示 ✕ 可删除单个文件
- 格式/质量变更时，`Promise.all` 并行重新压缩所有文件

### 下载

- ZIP 打包下载，文件名: `{原文件名}.{目标格式后缀}`
- 复用 `zip-exporter.ts` 的 JSZip 模式

### 回退

- 删除至只剩 1 个文件 → 自动切回单张对比预览模式

## pSEO 落地页

### 首批 10 个 slug

| slug | 预设参数 | 搜索意图 |
|------|---------|---------|
| `compress-image` | 无 | 通用压缩 |
| `compress-jpeg` | `?format=jpeg&quality=75` | JPEG 压缩 |
| `compress-png` | `?format=png` | PNG 压缩 |
| `png-to-webp` | `?format=webp&quality=80` | 格式转换 |
| `png-to-jpg` | `?format=jpeg&quality=85` | 格式转换 |
| `jpg-to-png` | `?format=png` | 格式转换 |
| `jpg-to-webp` | `?format=webp&quality=80` | 格式转换 |
| `webp-to-png` | `?format=png` | 格式转换 |
| `webp-to-jpg` | `?format=jpeg&quality=85` | 格式转换 |
| `reduce-image-size` | `?format=webp&quality=70` | 减小文件大小 |

### 元数据文件

每个 slug 在 `src/lib/pseo/{locale}/` 下创建 `.md` 文件（5 语言 × 10 slug = 50 个文件），包含：
- SEO metadata（title, description, ogTitle, ogDescription）
- Hero section（overline, headline, description）
- Scenarios（3-4 个使用场景卡片）
- How-to steps（3-4 步操作指南）
- FAQ entries（3-5 个常见问题）
- Related tools（关联现有工具）

### 落地页 CTA

每个落地页的 CTA 按钮跳转到 `/compress` 并携带预设 URL 参数。编辑器页面读取 `searchParams` 预填格式和质量。

## 集成点

| 集成位置 | 操作 |
|---------|------|
| `src/lib/pseo/index.ts` | `slugMeta` 注册 10 个 slug，category: `"use-case"` |
| 顶部导航 | 添加 "Compress" 入口（与 Split / Grid / Resize 同级） |
| Footer | 添加 "Compress" 链接 |
| Tools Hub | 自动展示（`slugMeta` 注册即生效） |
| Sitemap | 自动收录（`getAllToolSlugs()` 自动包含） |

## 不做的事

- 不支持 AVIF（浏览器兼容性不够，v2 再考虑）
- 不做图片尺寸调整（Resize 工具的职责）
- 不做 Web Worker（canvas.toBlob 足够快）
- 不做服务端处理（隐私优先原则）

## 技术依赖

| 依赖 | 用途 | 状态 |
|------|------|------|
| Canvas API `toBlob()` | 格式转换 + 压缩 | 浏览器原生 |
| `upload-utils.ts` | 文件验证 + 图片加载 | 已有 |
| `zip-exporter.ts` / JSZip | 批量 ZIP 下载 | 已有 |
| `UploadZone` 组件 | 拖拽上传 UI | 已有 |
| next-intl | i18n | 已有 |
