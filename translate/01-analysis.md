# 内容分析 — ImgSplit 多语言审校

## 产品领域
在线图片分割/裁剪工具（Browser-based SaaS）。核心卖点：免费、隐私安全（纯浏览器处理）、像素级精准、无需安装。

## 内容类型

| 类型 | 位置 | 特点 | 翻译要求 |
|------|------|------|----------|
| UI 短文本 | messages/*.json (nav, upload, workspace, results, history) | 按钮标签、提示信息、状态文本 | 简洁精准，符合 UI 惯用语 |
| 营销文案 | messages/*.json (hero, benefits, features, cta, useCases) | Landing page 标题、副标题、卖点描述 | 有感染力，符合目标市场文化习惯 |
| SEO 文案 | messages/*.json (metadata, faq) + pseo/*.ts | Title/Description、FAQ、场景描述 | 包含搜索关键词，自然可读 |
| 结构化数据 | messages/*.json (jsonLd) | Schema.org feature list | 简短、描述性 |

## 目标受众
- 电商运营人员（切割商品长图）
- UI 设计师（替代 Photoshop 切片）
- 社交媒体用户（九宫格、Instagram 轮播）
- 普通用户（日常图片分割需求）

## 语气与风格
- **英文**: 直接、action-oriented、conversational。避免过度正式。
- **日文**: 丁寧語（です/ます体）、自然で分かりやすい。過度な敬語は避ける。
- **韩文**: 해요체 为主，亲切但专业。避免过于口语化。
- **西班牙语**: Neutral/international Spanish (tú form for informal, usted for formal contexts)。避免地区特有词汇。

## 核心术语表

| 英文 | 中文 | 日文 | 韩文 | 西班牙语 | 备注 |
|------|------|------|------|----------|------|
| split line | 分割线 | 分割線 | 분할선 | línea de corte | 核心概念 |
| snap alignment | 磁吸对齐 | スナップ整列 | 스냅 정렬 | alineación automática | 功能名 |
| pixel-perfect | 像素级精准 | ピクセル精度 | 픽셀 단위 정밀 | precisión de píxeles | 卖点 |
| browser-based | 纯浏览器处理 | ブラウザ完結 | 브라우저 기반 | basado en el navegador | 卖点 |
| grid splitting | 网格分割 | グリッド分割 | 그리드 분할 | división en cuadrícula | 功能名 |
| lossless | 无损 | ロスレス/劣化なし | 무손실 | sin pérdida de calidad | 卖点 |
| drag and drop | 拖拽 | ドラッグ＆ドロップ | 드래그 앤 드롭 | arrastrar y soltar | 操作 |
| ZIP download | ZIP 打包下载 | ZIP ダウンロード | ZIP 다운로드 | descarga ZIP | 功能 |
| upload | 上传 | アップロード | 업로드 | subir/cargar | 操作 |
| tile | 瓦片/子图 | タイル | 타일 | mosaico/sección | 结果 |
| nine-grid / 3×3 | 九宫格 | 九分割 | 9분할 | cuadrícula 3×3 | 布局 |
| carousel (IG) | 轮播帖 | カルーセル | 캐러셀 | carrusel | 平台特有 |
| WeChat Moments | 微信朋友圈 | — | — | — | 中文专有 |
| split/slice | 分割/切割/裁切 | 分割/カット | 분할/자르기 | dividir/cortar | 动作 |

## 社交平台本地化

| 语言 | 替代 "WeChat Moments" | 替代 "小红书" |
|------|----------------------|--------------|
| ja | SNS、LINE タイムライン | SNS |
| ko | SNS、카카오스토리 | SNS |
| es | redes sociales | redes sociales |

## 审校重点

### 通用
1. **术语一致性**: 同一概念在 messages.json 和 pseo 数据中是否使用相同译法
2. **占位符完整性**: {count}, {name}, {size} 等变量是否保留
3. **格式保留**: 技术术语(PNG/JPG/WebP/ZIP)、数字(20MB/3×3)、品牌名(ImgSplit/Photoshop/Instagram)
4. **SEO 关键词**: title/description 是否包含目标语言的高搜索量关键词

### 英文
- 是否有 awkward phrasing 或 unnecessarily verbose 的表达
- SEO title 是否过长（建议 ≤60 字符）
- CTA 是否有力 (action verbs)

### 日文
- 是否有不自然的直译（翻译腔）
- 是否统一使用です/ます体
- カタカナ vs 漢字 的使用是否适当
- 是否有多余的英文借词（有自然日文词时不应用片假名）

### 韩文
- 是否有不自然的翻译腔
- 경어체 是否统一
- 한자어 vs 고유어 是否使用得当
- 띄어쓰기(spacing) 是否正确

### 西班牙语
- 是否使用了地区限定词汇（应使用国际西班牙语）
- 动词时态/语气是否统一
- 性数一致 (gender/number agreement)
- 是否有直译英文句式的情况

## 输出格式
每种语言的审校报告格式：
```
## [语言] 审校报告

### 问题汇总 (按严重程度排序)
1. [严重] key.path: 问题描述 → 建议修改
2. [中等] key.path: 问题描述 → 建议修改
3. [轻微] key.path: 问题描述 → 建议修改

### 术语一致性检查
- ✅ 一致 / ❌ 不一致: 具体问题
```
