# ImgSplit 产品分析观察记录

## 本轮范围（2026-10-15）

- 旧中文入口 `/zh` 及其子路径以 308 永久跳转至 `/zh-CN`，保留查询参数。
- 使用现有自托管 Umami，增加操作事件和页面性能采样；忽略 `#upload` 等 hash，避免锚点跳转拆分页面统计。
- 暂不调整首页布局、场景预设和推广，先积累 3–5 天数据。
- 仪表盘：https://analysis.zoohero.me/websites/b40ffc66-c1cd-4c98-b391-f2a8777e8951

## 事件口径

| 事件 | 触发时机与用途 |
| --- | --- |
| `tool_cta_clicked` | 首页/场景页 SmartCTA 点击，区分选图、打开工作台、继续历史任务 |
| `upload_picker_opened` | 共享选图区域点击；仅表示尝试打开选择器，取消选择不会产生 upload_started |
| `upload_started` / `upload_succeeded` / `upload_failed` | 选定文件后开始校验、图片解码完成或失败；upload 指本地读取，不是上传图片到服务器 |
| `processing_started` / `processing_succeeded` / `processing_failed` / `processing_canceled` | 分割、九宫格、轮播、压缩、去背景的实际处理；去背景逐张记录，其他批处理按一次操作记录 |
| `processing_blocked` | 缺少分割线、分割线未经过图片、去背景模型不可用，处理尚未开始 |
| `export_started` / `export_succeeded` / `export_failed` / `export_canceled` | 全部十种核心工具的导出操作；单图、选中项、批量打包分别记录，适用时记录输出数量和格式 |
| `download_triggered` / `download_failed` | 浏览器下载点击已触发或同步失败，不证明操作系统已保存文件 |
| `save_preview_opened` | iOS 保存流程打开图片预览，不等于用户已长按保存 |
| `results_readjusted` / `image_replaced` | 九宫格和轮播工作台的结果重调及更换图片 |

公共属性：`schema_version=1`、`page_path`、`locale`、`tool`。按操作补充 `input_count`、`output_count`、`failure_count`、`format`、`action`、`duration_ms`、`error_code`。耗时属于一次本地操作，不是服务器响应时间。

自定义属性不包含文件名、图片、图片内容、对象 URL、文本水印内容、用户标识或原始异常。自定义事件 URL 使用 pathname，不包含查询参数和 hash。现有 Umami 页面访问仍保留正常来源归因。

默认仅允许 imgsplit.com 和 www.imgsplit.com；localhost 和 Vercel 预览域名不采集。脚本未就绪时最多暂存 50 个事件，队列仅驻留内存。脚本加载后发送，保留操作开始时的页面；统计服务异常不会阻断图片操作。浏览器屏蔽脚本、断网或页面过早关闭时可能丢事件。

调整尺寸、水印、打码、拼图、社媒导出是即时编辑流程，使用“选图成功 → 导出成功”分析，不强行要求中间 processing 事件。去背景的逐图事件量也不能直接与其他工具的批量操作次数比较。

## 上线前基线

读取时间：2026-10-15 19:33 左右，Asia/Shanghai。滚动时间窗、筛选和实时流量会导致后来读数略有不同。

| 指标 | 最近 7 天 | 最近 30 天 |
| --- | ---: | ---: |
| 访客 | 1,813 | 6,852 |
| 访问 | 2,254 | 8,743 |
| 浏览量 | 5,359 | 23,059 |
| 跳出率 | 53.33% | 51.13% |
| 平均访问时长 | 119.48 秒 | 136.56 秒 |
| 自定义事件 | 0 | 0 |
| 性能样本 | 0 | 0 |

30 天访客：中国 4,627（约 67.5%）；笔记本 4,071、手机 2,096、桌面 639、平板 46。来源记录包括 cn.bing.com 1,002、bing.com 401、doubao.com 228、chatgpt.com 112、Google 35；来源行不可简单求和当作去重访客。Doubao 存在 `/zh` 入口访问，修复前实际返回 404。

## 3–5 天后如何复盘

1. 从部署完成后的完整自然日开始，先确认事件和性能样本持续增长；排除部署当晚的人工验收。
2. 按 **工具 × 设备 × 入口页面 × 来源** 比较：有选图成功的访问数 / 落地访问数、有导出成功的访问数 / 有选图成功的访问数。使用同一时间窗内的访问或会话去重，不用事件次数冒充用户转化率。
3. 检查 `upload_failed`、`processing_blocked`、`processing_failed`、`export_failed` 的错误码分布；分析失败次数时明确重试可能重复计数。
4. 优先查看 Bing、Doubao 和 `/zh-CN/split-in-half`、长截图入口，确认用户是否真正完成本地处理。
5. 性能按页面和设备查看 LCP、INP、CLS 及样本量；没有样本不能解释为 0 ms 或“优秀”。
6. 样本少的渠道继续观察到 7–14 天。先处理明确错误和明显流失，再决定是否调整首页上传入口或增加场景预设。

新增事件、hash 合并和真实用户结构都会影响仪表盘数值。不要把上线前后原始 PV、跳出率的变化直接归因于体验改善；旧数据没有操作事件，无法追溯计算旧的导出转化率。

## 验证

- `bun run test`：43 个测试文件、425 项测试通过，包含事件队列、路由归因、统计异常隔离、终态去重、敏感文件名排除和 iOS 保存分支。
- `bun run lint`：通过。
- `bun run build`：通过，370 个静态页面生成完成；Next middleware 和 Sentry annotation 的既有弃用提醒仍存在。
- 本地 HTTP：`/zh`、`/zh/workspace?utm_source=qa`、`/zh/split-in-half` 均 308 到对应中文路径；首页、工具目录、压缩和中文 pSEO 页面返回 200。
