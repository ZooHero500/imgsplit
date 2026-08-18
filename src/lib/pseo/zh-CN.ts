import type { ToolPageData } from "./types"

const data: Record<string, ToolPageData> = {
  "split-in-half": {
        slug: "split-in-half",
        category: "direction",
        seo: {
          title: "在线图片对半切割 — 免费一键等分图片 | ImgSplit",
          description: "免费在线图片对半切割工具，横向或纵向一键等分，像素级精准裁切，纯浏览器处理，无需上传。",
          ogTitle: "图片对半切割 — 免费在线工具",
          ogDescription: "一键将图片对半切割，横向或纵向均可，像素级精准，纯浏览器处理。",
        },
        hero: {
          overline: "图片切割工具",
          headlinePart1: "图片",
          headlineAccent: "对半切割",
          headlinePart2: "一键完成",
          description: "将任意图片对半切割——支持横向或纵向等分，像素级精准，零质量损失，全程浏览器本地处理。",
        },
        scenarios: [
          {
            icon: "Columns2",
            title: "对比图拆分",
            description: "将对比图（如修图前后、装修效果对比）拆分为独立文件，方便分开使用或分别编辑。",
          },
          {
            icon: "Smartphone",
            title: "社交媒体双屏封面",
            description: "将宽幅横图对半切割，制作双发布式全景拼接效果，提升社交平台视觉冲击力。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "拖拽或点击上传您要对半切割的图片。" },
          { stepNumber: 2, title: "放置分割线", description: "添加一条横向或纵向分割线到图片中央，将图片均匀分为两半。" },
          { stepNumber: 3, title: "下载两部分", description: "预览两半图片效果，单独下载或打包下载为 ZIP。" },
        ],
        faqEntries: [
          { question: "可以不等分地切割图片吗？", answer: "可以。分割线默认放在中央，但您可以拖拽到任意位置，实现如 30/70 的非等分切割。" },
          { question: "对半切割后画质会下降吗？", answer: "不会。每一半都保持原始分辨率和像素数据，不做任何压缩或缩放处理。" },
          { question: "可以同时横切和纵切吗？", answer: "当然可以。同时添加横向和纵向分割线，就能将图片切成四个象限而非两半。" },
        ],
        relatedTools: [
          { slug: "/split-horizontally", title: "横向切割", description: "用横向分割线将图片分为上下两部分。" },
          { slug: "/split-vertically", title: "纵向切割", description: "用纵向分割线将图片分为左右两部分。" },
          { slug: "/split-into-equal-parts", title: "等分切割", description: "将图片均匀切割成多个等份。" },
          { slug: "/", title: "图片分割工具", description: "支持自由拖拽分割线的全功能图片分割工具。" },
        ],
      },

  "split-horizontally": {
        slug: "split-horizontally",
        category: "direction",
        seo: {
          title: "在线横向切割图片 — 免费水平分割工具 | ImgSplit",
          description: "免费在线横向切割图片，添加多条水平分割线，精确按行裁切。纯浏览器处理，无需上传到服务器。",
          ogTitle: "横向切割图片 — 免费在线工具",
          ogDescription: "添加水平分割线将图片按行切割，免费且在浏览器中完成。",
        },
        hero: {
          overline: "水平分割",
          headlinePart1: "图片",
          headlineAccent: "横向切割",
          headlinePart2: "逐行精准",
          description: "添加水平分割线将任意图片分为上下区段或条状段落。适合裁切长图、分段处理高度较大的图片。",
        },
        scenarios: [
          {
            icon: "LayoutList",
            title: "电商长图分段",
            description: "将电商平台的长条产品详情图按模块横向裁切，优化加载速度，便于分区展示。",
          },
          {
            icon: "FileText",
            title: "文档扫描件分段",
            description: "将扫描的多段文档（收据、发票、表单）横向裁切为独立条段，方便单独归档。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "拖拽或选择要裁切的图片，支持 PNG、JPG、WebP，最大 20MB。" },
          { stepNumber: 2, title: "添加水平分割线", description: "点击「添加横向分割线」，放置一条或多条水平线，拖拽到精确位置。" },
          { stepNumber: 3, title: "下载各行", description: "预览每一横向条段的效果，然后一键打包下载或选择性下载。" },
        ],
        faqEntries: [
          { question: "最多可以添加多少条水平分割线？", answer: "最多支持 20 条水平分割线，可将一张图片最多切成 21 个横向条段。" },
          { question: "可以同时使用水平和垂直分割线吗？", answer: "可以。同时添加会形成网格切割——如果只需横向条段，仅添加水平线即可。" },
          { question: "有磁吸对齐功能帮助精确定位吗？", answer: "有。分割线会自动吸附到边缘和中线位置，帮助您实现像素级精准定位。" },
        ],
        relatedTools: [
          { slug: "/split-in-half", title: "对半切割", description: "一条线将图片均匀分成两部分。" },
          { slug: "/split-vertically", title: "纵向切割", description: "用纵向线将图片分为左右列。" },
          { slug: "/split-long-screenshot", title: "长截图分段", description: "将长截图分割成适合阅读的页面大小。" },
          { slug: "/grid", title: "九宫格切图", description: "将图片切割为 3×3、1×3 或 2×2 网格。" },
        ],
      },

  "split-vertically": {
        slug: "split-vertically",
        category: "direction",
        seo: {
          title: "在线纵向切割图片 — 免费垂直分割工具 | ImgSplit",
          description: "免费在线纵向切割图片，添加多条垂直分割线按列裁切。纯浏览器处理，隐私安全。",
          ogTitle: "纵向切割图片 — 免费在线工具",
          ogDescription: "添加垂直分割线将图片按列切割，免费、安全、浏览器端完成。",
        },
        hero: {
          overline: "垂直分割",
          headlinePart1: "图片",
          headlineAccent: "纵向切割",
          headlinePart2: "逐列精准",
          description: "放置垂直分割线将任意图片分为左右区段或列状条段，适合宽幅图片和多列布局的拆分。",
        },
        scenarios: [
          {
            icon: "Columns3",
            title: "漫画条格拆分",
            description: "将横排排列的漫画分格或故事板帧拆分为独立的纵向画面。",
          },
          {
            icon: "LayoutDashboard",
            title: "仪表盘截图取列",
            description: "从宽幅仪表盘或表格截图中提取特定列区域，用于聚焦汇报和演示。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "上传您要按列切割的宽幅图片或全景图。" },
          { stepNumber: 2, title: "添加垂直分割线", description: "放置一条或多条垂直分割线，拖拽以定义列边界。" },
          { stepNumber: 3, title: "下载各列", description: "查看每列分段效果，单独下载或一键打包导出为 ZIP。" },
        ],
        faqEntries: [
          { question: "最多可以添加多少条垂直分割线？", answer: "最多 20 条垂直线，单张图片最多可切出 21 列。" },
          { question: "切割全景图会丢失边缘像素吗？", answer: "不会。工具使用像素级精确边界，分割边缘不会丢失或模糊任何像素。" },
          { question: "竖版图片也能纵向切割吗？", answer: "可以，但纵向切割更适合横版或宽幅图片。竖版图片纵切后会产生较窄的竖条。" },
        ],
        relatedTools: [
          { slug: "/split-in-half", title: "对半切割", description: "一条线、两等份——最简单的图片分割方式。" },
          { slug: "/split-horizontally", title: "横向切割", description: "将图片按行切割成水平条段。" },
          { slug: "/split-for-instagram", title: "Instagram 切图", description: "将宽图切割成 Instagram 轮播帖瓦片。" },
          { slug: "/grid", title: "九宫格切图", description: "将图片切割为 3×3 或自定义网格。" },
        ],
      },

  "split-into-equal-parts": {
        slug: "split-into-equal-parts",
        category: "direction",
        seo: {
          title: "在线等分切割图片 — 免费均匀分割工具 | ImgSplit",
          description: "免费在线将图片等分为 2、3、4 份或更多等份，磁吸对齐确保均匀间距，像素级精准。无需上传。",
          ogTitle: "等分切割图片 — 免费在线工具",
          ogDescription: "将图片均匀切割为多个等份，磁吸对齐，像素级精准。",
        },
        hero: {
          overline: "等份分割器",
          headlinePart1: "图片",
          headlineAccent: "等分切割",
          headlinePart2: "均匀精准",
          description: "将任意图片均匀切割为 2、3、4 份或更多完全相等的段落。磁吸对齐确保间距均匀，像素级精准。",
        },
        scenarios: [
          {
            icon: "Grid2X2",
            title: "拼图与拼贴素材",
            description: "将图片等分为规则瓦片，制作拼图游戏、教学材料或拼贴画素材。",
          },
          {
            icon: "Printer",
            title: "统一尺寸的打印瓦片",
            description: "将大图等分为统一尺寸的打印瓦片，确保每块适合标准纸张，拼接后还原完整画面。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "选择您要等分切割的图片。" },
          { stepNumber: 2, title: "添加等距分割线", description: "添加水平或垂直分割线，利用磁吸对齐功能使其均匀分布。" },
          { stepNumber: 3, title: "下载等份段落", description: "确认所有部分尺寸相等，然后逐个下载或打包下载为 ZIP。" },
        ],
        faqEntries: [
          { question: "如何确保每份完全相等？", answer: "使用磁吸对齐功能——分割线会自动吸附到等距位置。例如三等分时，放置 2 条线，它们会自动对齐到 1/3 和 2/3 处。" },
          { question: "能创建由相同矩形组成的网格吗？", answer: "可以。同时添加等距的水平和垂直分割线，就能创建尺寸完全一致的矩形网格。" },
          { question: "如果图片尺寸不能整除怎么办？", answer: "最后一段可能会差一个像素。工具会尽可能均匀分配像素，最大程度减少尺寸差异。" },
        ],
        relatedTools: [
          { slug: "/split-in-half", title: "对半切割", description: "最简单的等分——将图片分成两个完全相等的半。" },
          { slug: "/split-for-print", title: "打印切割", description: "将大图切割成适合标准纸张打印的瓦片。" },
          { slug: "/no-photoshop-slicer", title: "替代 PS 切片", description: "无需 Photoshop 的免费在线切片工具。" },
          { slug: "/grid", title: "九宫格切图", description: "预设网格布局：3×3、1×3 和 2×2。" },
        ],
      },

  "split-long-screenshot": {
        slug: "split-long-screenshot",
        category: "use-case",
        seo: {
          title: "长截图分段切割 — 免费在线长图裁切工具 | ImgSplit",
          description: "免费在线长截图分段工具，将超长截图切割为页面大小的段落，方便分享和阅读。纯浏览器处理。",
          ogTitle: "长截图分段 — 免费在线工具",
          ogDescription: "将长截图切割为适合阅读的页面大小段落，免费浏览器端处理。",
        },
        hero: {
          overline: "长图分段",
          headlinePart1: "长截图",
          headlineAccent: "分段切割",
          headlinePart2: "轻松分享",
          description: "将超长滚动截图切割为页面大小的段落，方便分享、阅读和归档。支持任意高度的长图。",
        },
        scenarios: [
          {
            icon: "MessageSquare",
            title: "聊天记录整理",
            description: "将完整的聊天截图按屏幕大小分割，方便分类存储和选择性分享。",
          },
          {
            icon: "FileSearch",
            title: "网页内容存档",
            description: "将长网页截图按章节分段，用于 Bug 报告、设计评审或合规文档归档。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传长截图", description: "上传您的长截图——工具可处理任意高度的图片。" },
          { stepNumber: 2, title: "添加分页线", description: "在需要分页的位置添加水平分割线，利用磁吸对齐实现均匀间距。" },
          { stepNumber: 3, title: "下载分页段落", description: "预览各段效果，打包下载所有页面为 ZIP，方便分享。" },
        ],
        faqEntries: [
          { question: "长截图的高度有上限吗？", answer: "工具可处理最大 20MB 的图片。超高图片（10000 像素以上）处理速度可能稍慢，但完全支持。" },
          { question: "能将长截图等分为相同长度的页面吗？", answer: "可以。添加多条水平线并利用磁吸对齐均匀分布，即可创建统一页面高度的段落。" },
          { question: "截图中的文字分割后还清晰吗？", answer: "当然清晰。工具以原始分辨率裁切，不做任何重采样，文字保持锐利可读。" },
        ],
        relatedTools: [
          { slug: "/split-horizontally", title: "横向切割", description: "添加水平线将图片分为行段。" },
          { slug: "/split-for-instagram", title: "Instagram 切图", description: "将图片切割为多张轮播帖素材。" },
          { slug: "/split-for-wechat", title: "朋友圈切图", description: "为微信朋友圈九宫格准备图片。" },
          { slug: "/", title: "图片分割工具", description: "支持拖拽分割线的全功能分割工具。" },
        ],
      },

  "split-for-instagram": {
        slug: "split-for-instagram",
        category: "use-case",
        seo: {
          title: "Instagram 切图工具 — 免费轮播图和九宫格分割 | ImgSplit",
          description: "免费在线 Instagram 切图工具，将图片分割为轮播帖和主页九宫格瓦片，适配 1080×1080px。纯浏览器处理。",
          ogTitle: "Instagram 切图 — 免费在线工具",
          ogDescription: "将图片切割为 Instagram 轮播帖和九宫格瓦片，适配 1080×1080px。",
        },
        hero: {
          overline: "Instagram 切图",
          headlinePart1: "切图发",
          headlineAccent: "Instagram",
          headlinePart2: "轮播与九宫格",
          description: "将图片切割为完美尺寸的 Instagram 轮播帖和主页九宫格瓦片，适配 Instagram 原生尺寸。",
        },
        platformInfo: "Instagram 推荐帖子尺寸：1080 × 1080 px（1:1 正方形）。轮播帖最多支持 10 张幻灯片。",
        scenarios: [
          {
            icon: "LayoutGrid",
            title: "主页无缝九宫格",
            description: "将一张宽幅图片切割为 3、6 或 9 张瓦片，在 Instagram 主页形成无缝全景拼接效果。",
          },
          {
            icon: "GalleryHorizontal",
            title: "轮播帖幻灯片",
            description: "将全景照片或信息图分割为可滑动的轮播帖幻灯片，跨多帧讲述视觉故事。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "上传您要为 Instagram 切割的图片或全景照片。" },
          { stepNumber: 2, title: "设置网格", description: "为轮播帖添加垂直分割线，或创建主页九宫格布局。利用磁吸对齐确保等距。" },
          { stepNumber: 3, title: "下载切图瓦片", description: "打包下载所有瓦片为 ZIP，按顺序上传到 Instagram 即可呈现无缝效果。" },
        ],
        faqEntries: [
          { question: "Instagram 每张瓦片应该是什么尺寸？", answer: "Instagram 以 1080×1080px（正方形）显示帖子。轮播帖每张幻灯片宽度为 1080px。工具可在任意边界切割。" },
          { question: "Instagram 轮播帖最多支持几张幻灯片？", answer: "Instagram 每条轮播帖最多支持 10 张。将图片纵向切割为 2-10 段即可制作可滑动的全景效果。" },
          { question: "切割后瓦片的顺序正确吗？", answer: "正确。瓦片按从左到右（纵切）或从上到下（横切）编号，与 Instagram 的上传顺序一致。" },
        ],
        relatedTools: [
          { slug: "/split-into-equal-parts", title: "等分切割", description: "将图片均匀分割为等份，适用于任何平台。" },
          { slug: "/split-long-screenshot", title: "长截图分段", description: "将长图分割为适合分享的页面大小。" },
          { slug: "/split-for-wechat", title: "朋友圈切图", description: "为微信朋友圈九宫格准备切图。" },
          { slug: "/grid", title: "九宫格切图", description: "快速 3×3 网格切割，针对社交媒体优化。" },
        ],
      },

  "split-for-wechat": {
        slug: "split-for-wechat",
        category: "use-case",
        seo: {
          title: "微信朋友圈九宫格切图 — 免费在线切图工具 | ImgSplit",
          description: "免费在线微信朋友圈九宫格切图工具，一键将图片切割为 3×3 九宫格、1×3 三联图等，适配朋友圈发布。纯浏览器处理，隐私安全。",
          ogTitle: "朋友圈九宫格切图 — 免费在线工具",
          ogDescription: "一键将图片切割为微信朋友圈九宫格，免费、隐私安全、浏览器端完成。",
        },
        hero: {
          overline: "朋友圈切图",
          headlinePart1: "朋友圈",
          headlineAccent: "九宫格切图",
          headlinePart2: "一键搞定",
          description: "将任意图片一键切割为微信朋友圈九宫格、三联图等格式，让你的朋友圈更有视觉冲击力。",
        },
        scenarios: [
          {
            icon: "Share2",
            title: "朋友圈九宫格拼图",
            description: "将一张完整图片切割成 9 张瓦片，发布到朋友圈后自动拼合为完整画面，打造高级感视觉效果。",
          },
          {
            icon: "Camera",
            title: "旅行照片创意展示",
            description: "将旅行全景照或风景大图切割成九宫格，在朋友圈中展现壮阔场景，获得更多点赞。",
          },
          {
            icon: "Sparkles",
            title: "个人品牌形象打造",
            description: "将个人作品集或品牌海报切割为九宫格排列，让朋友圈主页呈现统一的视觉风格。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "拖拽或点击上传您要切割为九宫格的图片。" },
          { stepNumber: 2, title: "设置九宫格", description: "添加横向和纵向分割线创建 3×3 网格，利用磁吸对齐确保均匀等分。" },
          { stepNumber: 3, title: "下载并发布", description: "打包下载所有九宫格瓦片，按顺序发布到微信朋友圈。" },
        ],
        faqEntries: [
          { question: "微信朋友圈九宫格最佳尺寸是多少？", answer: "微信朋友圈会自动裁切为正方形缩略图，建议原图使用 1:1 正方形比例，每张推荐 1080×1080px 以获得最佳清晰度。" },
          { question: "切好的九宫格图片发朋友圈顺序对吗？", answer: "对的。图片按从左到右、从上到下的顺序编号（1-9），按照编号顺序选择图片即可正确拼合。" },
          { question: "除了九宫格还支持什么布局？", answer: "支持任意布局。除了经典 3×3 九宫格外，您也可以制作 1×3 三联图、2×2 四宫格或其他自定义布局。" },
          { question: "切割后的图片质量会下降吗？", answer: "不会。工具以原始分辨率裁切，不做任何压缩处理，保持与原图完全一致的画质。" },
        ],
        relatedTools: [
          { slug: "/split-for-instagram", title: "Instagram 切图", description: "为 Instagram 轮播帖和主页九宫格切割图片。" },
          { slug: "/split-long-screenshot", title: "长截图分段", description: "将长截图分割为适合阅读的段落。" },
          { slug: "/", title: "图片分割工具", description: "支持自定义分割线的全功能图片切割工具。" },
          { slug: "/grid", title: "九宫格切图", description: "快速 3×3、1×3、2×2 网格切图。" },
        ],
      },

  "split-for-print": {
        slug: "split-for-print",
        category: "use-case",
        seo: {
          title: "大图打印切割 — 免费在线海报分割打印工具 | ImgSplit",
          description: "免费在线将大图切割为适合标准纸张打印的瓦片，打印后拼合为海报、横幅或墙面装饰画。纯浏览器处理。",
          ogTitle: "大图打印切割 — 免费在线工具",
          ogDescription: "将大图切割为可打印瓦片，拼合为海报或大幅面作品。",
        },
        hero: {
          overline: "打印切割",
          headlinePart1: "大图",
          headlineAccent: "打印切割",
          headlinePart2: "拼合输出",
          description: "将大尺寸图片切割为标准纸张大小的瓦片，打印后拼合成海报、横幅或墙面装饰画。",
        },
        scenarios: [
          {
            icon: "Image",
            title: "DIY 海报打印",
            description: "将高分辨率图片切割为 A4 瓦片，在家用打印机上分页打印，拼贴组合成大幅面海报。",
          },
          {
            icon: "Ruler",
            title: "建筑图纸分割打印",
            description: "将超大技术图纸或户型图分割为可打印的区段，每页展示可管理的设计区域。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传大图", description: "上传您要分割打印的高分辨率图片、海报或图纸。" },
          { stepNumber: 2, title: "设置瓦片边界", description: "添加等距分割线创建与纸张尺寸匹配的瓦片，利用磁吸对齐确保均匀。" },
          { stepNumber: 3, title: "打印与拼合", description: "下载所有瓦片，逐页打印，按顺序排列拼合还原完整图像。" },
        ],
        faqEntries: [
          { question: "瓦片应该按什么纸张尺寸切割？", answer: "家用打印机推荐 A4（210×297mm）。根据图片比例和目标最终尺寸计算所需瓦片数量。" },
          { question: "工具会为拼接添加重叠边距吗？", answer: "工具按精确像素边界切割。如需重叠边距，可适当增加瓦片数量，使相邻块共享一小条对齐区域。" },
          { question: "能处理超高分辨率图片（如 8000×6000）吗？", answer: "可以。工具支持最大 20MB 的图片。超高分辨率文件建议使用 WebP 格式以减小文件大小。" },
        ],
        relatedTools: [
          { slug: "/split-into-equal-parts", title: "等分切割", description: "将图片均匀切割为等份瓦片。" },
          { slug: "/split-horizontally", title: "横向切割", description: "将图片按行切割，用于条状打印。" },
          { slug: "/no-photoshop-slicer", title: "替代 PS 切片", description: "免费在线替代 Photoshop 的切片导出功能。" },
          { slug: "/", title: "图片分割工具", description: "支持自定义分割线的全功能分割工具。" },
        ],
      },

  "no-photoshop-slicer": {
        slug: "no-photoshop-slicer",
        category: "use-case",
        seo: {
          title: "免费在线切片工具 — 替代 Photoshop 切片功能 | ImgSplit",
          description: "免费在线图片切片工具，无需安装 Photoshop，拖拽分割线即可将图片切割为任意区域。浏览器端完成，即开即用。",
          ogTitle: "替代 PS 切片 — 免费在线切片工具",
          ogDescription: "无需 Photoshop，在浏览器中拖拽分割线即可切割图片。",
        },
        hero: {
          overline: "免费切片工具",
          headlinePart1: "图片切片",
          headlineAccent: "无需 PS",
          headlinePart2: "即开即用",
          description: "告别昂贵的软件订阅费。用拖拽分割线的方式将图片切割为任意布局——完全免费，完全在浏览器中完成。",
        },
        scenarios: [
          {
            icon: "DollarSign",
            title: "省下订阅费",
            description: "无需每月支付 Creative Cloud 订阅费即可获得 Photoshop 级别的切片效果——免费且人人可用。",
          },
          {
            icon: "GraduationCap",
            title: "新手友好的操作流程",
            description: "没有图层、没有工具栏、没有学习门槛。只需拖拽分割线到目标位置，即可下载切割结果。",
          },
        ],
        howToSteps: [
          { stepNumber: 1, title: "上传图片", description: "拖拽或点击上传，无需注册账号，无需安装软件。" },
          { stepNumber: 2, title: "拖拽分割线", description: "添加横向和纵向分割线定义切片区域，磁吸对齐确保精准。" },
          { stepNumber: 3, title: "导出切片", description: "将所有切片区域打包下载为 ZIP——可直接用于网页、社交媒体或其他用途。" },
        ],
        faqEntries: [
          { question: "精度真的和 Photoshop 的切片工具一样吗？", answer: "是的。工具在精确的像素边界处切割，配合磁吸对齐功能，提供与 Photoshop 相同的像素级精度，但没有复杂的操作。" },
          { question: "可以用来切割 HTML 邮件模板的图片吗？", answer: "当然可以。将邮件设计稿切割为各个区域，导出每个区域，然后在 HTML 模板中引用，实现像素级精准的邮件布局。" },
          { question: "需要注册账号吗？", answer: "不需要。工具完全免费，无需任何注册。打开页面、上传、切割、下载——就这么简单。" },
        ],
        relatedTools: [
          { slug: "/split-in-half", title: "对半切割", description: "最简单的切割——将图片一分为二。" },
          { slug: "/split-for-print", title: "打印切割", description: "将大图切割为可打印的页面瓦片。" },
          { slug: "/split-for-instagram", title: "Instagram 切图", description: "为 Instagram 轮播帖和九宫格切割图片。" },
          { slug: "/", title: "图片分割工具", description: "支持拖拽分割线的全功能图片分割工具。" },
        ],
      },





  "compress-jpeg": {
    slug: "compress-jpeg",
    category: "use-case",
    seo: {
      title: "在线压缩 JPEG — 缩小 JPG 文件大小 | ImgSplit",
      description: "免费在线压缩 JPEG 和 JPG 图片。可调节质量设置，缩小文件大小。纯浏览器处理，隐私安全，无需上传至服务器。",
      ogTitle: "在线压缩 JPEG — 缩小 JPG 文件大小",
      ogDescription: "可调节质量压缩 JPEG 文件大小。免费、隐私安全、浏览器端处理。",
    },
    hero: {
      overline: "JPEG 压缩",
      headlinePart1: "压缩",
      headlineAccent: "JPEG",
      headlinePart2: "缩小体积",
      description: "通过精细的质量控制缩小 JPEG 和 JPG 文件大小。适合摄影师、博主和网页开发者——在无可见质量损失的前提下获得更小的文件。",
    },
    scenarios: [
      {
        icon: "Camera",
        title: "摄影工作流程",
        description: "压缩相机拍摄的高分辨率 JPEG 照片，用于网络画廊、客户预览或社交媒体——将 10MB 的文件缩小到 1MB 以下，同时保留细节。",
      },
      {
        icon: "Globe",
        title: "博客配图",
        description: "优化博客文章和文章的 JPEG 图片。更快的加载速度意味着更好的读者参与度和更高的搜索引擎排名。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 JPEG", description: "拖拽或选择您要压缩的 JPEG/JPG 文件。" },
      { stepNumber: 2, title: "设置质量级别", description: "调整质量滑块——更低的值意味着更小的文件。预览输出效果，找到大小和质量之间的最佳平衡点。" },
      { stepNumber: 3, title: "下载压缩后的 JPEG", description: "保存压缩后的 JPEG。工具会显示您节省了多少文件大小。" },
    ],
    faqEntries: [
      { question: "JPEG 压缩的最佳质量设置是多少？", answer: "网页用途建议 75-85% 质量，通常可实现 60-80% 的文件大小减少，且视觉差异极小。印刷用途建议保持 90% 以上。" },
      { question: "可以多次压缩同一张 JPEG 吗？", answer: "可以，但每次重新压缩都会引入轻微的压缩伪影。为获得最佳效果，建议始终从原始文件压缩，而不是对已压缩的 JPEG 再次压缩。" },
      { question: "JPEG 和 JPG 有什么区别？", answer: "没有区别——JPG 和 JPEG 指的是同一种格式。较短的 '.jpg' 扩展名在 Windows 上变得普遍，因为早期 Windows 将扩展名限制为 3 个字符。" },
    ],
    relatedTools: [
      { slug: "/compress", title: "压缩图片", description: "适用于任何格式的通用图片压缩。" },
      { slug: "/jpg-to-webp", title: "JPG 转 WebP", description: "将 JPEG 转换为 WebP 以获得更小的文件大小。" },
      { slug: "/png-to-webp", title: "PNG 转 WebP", description: "将 PNG 转换为 WebP 以获得更小的文件大小。" },
    ],
  },

  "compress-png": {
    slug: "compress-png",
    category: "use-case",
    seo: {
      title: "在线压缩 PNG — 缩小 PNG 文件大小 | ImgSplit",
      description: "在线压缩 PNG 图片，同时保留透明度。支持无损或有损压缩缩小文件大小。免费、浏览器端处理、无需上传至服务器。",
      ogTitle: "在线压缩 PNG — 缩小 PNG 文件大小",
      ogDescription: "缩小 PNG 文件大小，同时保留透明度。免费、隐私安全、浏览器端处理。",
    },
    hero: {
      overline: "PNG 压缩",
      headlinePart1: "压缩",
      headlineAccent: "PNG",
      headlinePart2: "保留透明度",
      description: "缩小 PNG 文件大小，同时完整保留透明度支持。适合 UI 截图、设计素材和需要 Alpha 通道的图形。",
    },
    scenarios: [
      {
        icon: "Smartphone",
        title: "UI 截图",
        description: "压缩来自设计工具和屏幕截图的 PNG 文件。减小文件大小以加快文档、Bug 报告和设计评审中的加载速度。",
      },
      {
        icon: "Layers",
        title: "设计素材",
        description: "优化 PNG 设计素材——图标、Logo 和 UI 元素——用于网页和应用开发，同时保留清晰的边缘和透明度。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 PNG", description: "拖拽或选择您要压缩的 PNG 文件。透明度将完整保留。" },
      { stepNumber: 2, title: "优化 PNG", description: "保持 PNG 输出。ImgSplit 会无损重新编码图片，并在重新编码变大时保留原始文件。" },
      { stepNumber: 3, title: "下载优化后的 PNG", description: "保存压缩后的 PNG。透明度、色深和视觉质量均得到保持。" },
    ],
    faqEntries: [
      { question: "压缩会移除 PNG 的透明度吗？", answer: "不会。压缩过程完整保留 Alpha 通道。您的透明背景将保持不变。" },
      { question: "为什么 PNG 文件比 JPEG 大很多？", answer: "PNG 使用无损压缩，精确保留每个像素，并且存储透明度数据。如果照片不需要透明度，转换为 JPEG 或 WebP 可以获得更小的文件。" },
      { question: "应该将 PNG 转换为 WebP 还是直接压缩？", answer: "如果需要最大程度的体积缩减且您的平台支持 WebP，转换为 WebP 可以在保留透明度的同时将文件大小减少 50-80%。" },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG 转 WebP", description: "将 PNG 转换为 WebP，在保留透明度的同时大幅缩小文件。" },
      { slug: "/png-to-jpg", title: "PNG 转 JPG", description: "当不需要透明度时将 PNG 转换为 JPEG 以缩小文件。" },
      { slug: "/compress", title: "压缩图片", description: "适用于任何格式的通用图片压缩。" },
    ],
  },

  "png-to-webp": {
    slug: "png-to-webp",
    category: "use-case",
    seo: {
      title: "在线将 PNG 转换为 WebP — 免费且快速 | ImgSplit",
      description: "将 PNG 图片转换为 WebP 格式，大幅缩小文件大小。保留透明度。免费浏览器端转换器，无需上传至服务器。",
      ogTitle: "PNG 转 WebP — 免费在线转换器",
      ogDescription: "将 PNG 转换为 WebP，在保留透明度的同时缩小文件。免费、浏览器端处理。",
    },
    hero: {
      overline: "PNG 转 WebP 转换器",
      headlinePart1: "将 PNG 转换为",
      headlineAccent: "WebP",
      headlinePart2: "更小的文件",
      description: "将 PNG 图片转换为 WebP 格式，文件最多缩小 80%，同时保留透明度。现代图片格式，让网站和应用加载更快。",
    },
    scenarios: [
      {
        icon: "Zap",
        title: "网站性能优化",
        description: "将网站的 PNG 素材切换为 WebP——页面加载更快，带宽降低，Core Web Vitals 指标提升。大多数浏览器原生支持 WebP。",
      },
      {
        icon: "Smartphone",
        title: "应用素材",
        description: "将应用图标、UI 元素和图形从 PNG 转换为 WebP。更小的素材意味着更快的安装、更快的加载和更少的存储占用。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 PNG", description: "拖拽或选择您要转换为 WebP 格式的 PNG 图片。" },
      { stepNumber: 2, title: "配置输出", description: "调整 WebP 输出的质量设置。更高的质量意味着更大的文件——预览以找到合适的平衡点。" },
      { stepNumber: 3, title: "下载 WebP 文件", description: "保存转换后的 WebP 图片。对比文件大小，查看显著的缩减效果。" },
    ],
    faqEntries: [
      { question: "WebP 像 PNG 一样支持透明度吗？", answer: "是的。WebP 完全支持 Alpha 透明度，使其成为大多数场景下 PNG 的优秀替代方案——文件大小显著缩小。" },
      { question: "哪些浏览器支持 WebP？", answer: "所有现代浏览器都支持 WebP：Chrome、Firefox、Safari、Edge 和 Opera。只有 Internet Explorer 和非常旧的浏览器版本不支持。" },
      { question: "WebP 比 PNG 小多少？", answer: "WebP 文件通常比等效的 PNG 文件小 50-80%。具体节省取决于图片内容，但缩减效果始终非常显著。" },
    ],
    relatedTools: [
      { slug: "/png-to-jpg", title: "PNG 转 JPG", description: "当不需要透明度时将 PNG 转换为 JPEG。" },
      { slug: "/jpg-to-webp", title: "JPG 转 WebP", description: "将 JPEG 图片转换为现代 WebP 格式。" },
      { slug: "/compress-png", title: "压缩 PNG", description: "在保留 PNG 格式的同时缩小文件大小。" },
    ],
  },

  "png-to-jpg": {
    slug: "png-to-jpg",
    category: "use-case",
    seo: {
      title: "在线将 PNG 转换为 JPG — 免费转换器 | ImgSplit",
      description: "免费在线将 PNG 图片转换为 JPG 格式。去除透明度并缩小文件大小。浏览器端处理，隐私安全，无需上传至服务器。",
      ogTitle: "PNG 转 JPG — 免费在线转换器",
      ogDescription: "将 PNG 转换为 JPG 以去除透明度并缩小文件。免费、浏览器端处理。",
    },
    hero: {
      overline: "PNG 转 JPG 转换器",
      headlinePart1: "将 PNG 转换为",
      headlineAccent: "JPG",
      headlinePart2: "去除透明度",
      description: "将 PNG 图片转换为 JPG 格式，获得更小的文件大小和通用兼容性。透明区域将填充为您选择的纯色背景。",
    },
    scenarios: [
      {
        icon: "Globe",
        title: "社交媒体发布",
        description: "将 PNG 截图和图形转换为 JPG，用于社交媒体平台。避免平台对 PNG 的重度压缩，上传干净的 JPG 获得可预测的质量。",
      },
      {
        icon: "Mail",
        title: "文档分享",
        description: "将 PNG 图形转换为 JPG 用于邮件附件、演示文稿和文档。JPG 文件更小且在任何设备上都能查看。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 PNG", description: "拖拽或选择您要转换为 JPG 格式的 PNG 文件。" },
      { stepNumber: 2, title: "设置背景色和质量", description: "选择透明区域的背景色（默认白色）并设置 JPEG 质量级别。" },
      { stepNumber: 3, title: "下载 JPG 文件", description: "保存转换后的 JPG 图片。透明区域已替换为所选背景色。" },
    ],
    faqEntries: [
      { question: "PNG 中的透明区域会怎样？", answer: "透明区域将填充为纯色背景——默认为白色。您可以在转换前选择任意颜色。" },
      { question: "PNG 转 JPG 后图片质量会变化吗？", answer: "JPEG 使用有损压缩，在较低设置下可能存在轻微的质量差异。在 90% 以上的质量下，差异几乎不可见。" },
      { question: "什么时候应该保留 PNG 而不转换为 JPG？", answer: "当您需要透明度、文字或线条的像素级精准度，或无损品质时保留 PNG。当需要照片或更小的文件大小时转换为 JPG。" },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG 转 WebP", description: "将 PNG 转换为 WebP，在现代浏览器中获得更小的文件。" },
      { slug: "/compress-jpeg", title: "压缩 JPEG", description: "转换后进一步缩小 JPEG 文件大小。" },
      { slug: "/jpg-to-png", title: "JPG 转 PNG", description: "当需要无损质量时将 JPG 转回 PNG。" },
    ],
  },

  "jpg-to-png": {
    slug: "jpg-to-png",
    category: "use-case",
    seo: {
      title: "在线将 JPG 转换为 PNG — 免费转换器 | ImgSplit",
      description: "免费在线将 JPG 和 JPEG 图片转换为 PNG 格式，获得无损质量。浏览器端转换器，无需上传至服务器，即时下载。",
      ogTitle: "JPG 转 PNG — 免费在线转换器",
      ogDescription: "将 JPEG 转换为 PNG 获得无损质量。免费、隐私安全、浏览器端处理。",
    },
    hero: {
      overline: "JPG 转 PNG 转换器",
      headlinePart1: "将 JPG 转换为",
      headlineAccent: "PNG",
      headlinePart2: "无损质量",
      description: "将 JPEG 图片转换为 PNG 格式，获得无损质量和透明度支持。适合设计工作、编辑和任何需要像素级精准输出的工作流程。",
    },
    scenarios: [
      {
        icon: "Layers",
        title: "设计工作",
        description: "将照片转换为 PNG 用于设计项目——图层合成、叠加和效果图最适合使用 PNG 的无损质量和透明度支持。",
      },
      {
        icon: "Shield",
        title: "透明度需求",
        description: "需要为照片添加透明度？先转换为 PNG，然后在设计工具中编辑 Alpha 通道，实现干净的抠图和叠加效果。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 JPG", description: "拖拽或选择您要转换为 PNG 格式的 JPG/JPEG 文件。" },
      { stepNumber: 2, title: "预览结果", description: "查看 PNG 预览。转换过程以完整质量保留原始 JPEG 的所有视觉内容。" },
      { stepNumber: 3, title: "下载 PNG 文件", description: "保存无损 PNG 图片。文件会比原始 JPEG 大，但不会有额外的压缩伪影。" },
    ],
    faqEntries: [
      { question: "将 JPG 转换为 PNG 会提升图片质量吗？", answer: "转换为 PNG 可以防止进一步的质量损失，但无法恢复原始 JPEG 压缩中丢失的细节。转换后的 PNG 完美保留了 JPEG 的当前状态。" },
      { question: "为什么 PNG 文件比原始 JPG 大？", answer: "PNG 使用无损压缩精确保留每个像素，因此文件更大。JPEG 使用有损压缩丢弃部分数据以获得更小的文件大小。" },
      { question: "转换为 PNG 后可以添加透明度吗？", answer: "可以。一旦转为 PNG 格式，您就可以在任何设计工具（Photoshop、GIMP、Figma）中编辑 Alpha 通道添加透明度——这在 JPEG 格式下无法实现。" },
    ],
    relatedTools: [
      { slug: "/jpg-to-webp", title: "JPG 转 WebP", description: "将 JPEG 转换为 WebP，使用现代压缩获得更小的文件。" },
      { slug: "/compress-png", title: "压缩 PNG", description: "转换后缩小 PNG 文件大小。" },
      { slug: "/png-to-jpg", title: "PNG 转 JPG", description: "当需要更小文件时转回 JPG。" },
    ],
  },

  "jpg-to-webp": {
    slug: "jpg-to-webp",
    category: "use-case",
    seo: {
      title: "在线将 JPG 转换为 WebP — 现代格式 | ImgSplit",
      description: "将 JPG 和 JPEG 图片转换为 WebP 格式以获得最大压缩效果。最多缩小 80%。免费浏览器端转换器，无需上传至服务器。",
      ogTitle: "JPG 转 WebP — 现代格式转换器",
      ogDescription: "将 JPEG 转换为 WebP，最多缩小 80%。免费、隐私安全、浏览器端处理。",
    },
    hero: {
      overline: "JPG 转 WebP 转换器",
      headlinePart1: "将 JPG 转换为",
      headlineAccent: "WebP",
      headlinePart2: "极致压缩",
      description: "将 JPEG 图片转换为现代 WebP 格式，文件大幅缩小。最高可实现 80% 的体积缩减，同时保持相当的视觉质量——网页性能的明智之选。",
    },
    scenarios: [
      {
        icon: "RefreshCw",
        title: "网站迁移",
        description: "在性能优化过程中批量将网站的 JPEG 图片转换为 WebP。更快的页面加载、更低的托管成本和更好的 Google PageSpeed 得分。",
      },
      {
        icon: "Zap",
        title: "性能优化",
        description: "将沉重的 JPEG 首屏大图和产品照片替换为 WebP 版本。访客获得同样的视觉体验，下载时间只需一小部分。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 JPG", description: "拖拽或选择您要转换为 WebP 的 JPEG 文件。" },
      { stepNumber: 2, title: "调整 WebP 质量", description: "微调质量设置。即使在 80% 质量下，WebP 文件也比等效的 JPEG 小得多。" },
      { stepNumber: 3, title: "下载 WebP 文件", description: "保存 WebP 图片并对比文件大小节省。大多数用户可以看到 50-80% 的缩减。" },
    ],
    faqEntries: [
      { question: "WebP 比 JPEG 小多少？", answer: "在同等视觉质量下，WebP 通常比 JPEG 小 25-34%（根据 Google 的研究）。对于许多图片，节省可达 50% 或更多。" },
      { question: "WebP 在所有地方都受支持吗？", answer: "是的，所有现代浏览器（Chrome、Firefox、Safari 14+、Edge）都支持 WebP。对于极少数旧版浏览器，可以使用 HTML <picture> 元素提供 JPEG 作为后备方案。" },
      { question: "从 JPEG 转换为 WebP 会丢失质量吗？", answer: "JPEG 和 WebP 都是有损格式，因此重新编码会引入极少量的额外伪影。为获得最佳效果，请从您拥有的最高质量 JPEG 原始文件进行转换。" },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG 转 WebP", description: "将 PNG 图片转换为 WebP，支持透明度。" },
      { slug: "/compress-jpeg", title: "压缩 JPEG", description: "在保留 JPEG 格式的同时缩小文件大小。" },
      { slug: "/jpg-to-png", title: "JPG 转 PNG", description: "将 JPEG 转换为无损 PNG 格式。" },
    ],
  },

  "webp-to-png": {
    slug: "webp-to-png",
    category: "use-case",
    seo: {
      title: "在线将 WebP 转换为 PNG — 免费转换器 | ImgSplit",
      description: "将 WebP 图片转换为 PNG 格式以获得通用兼容性。保留透明度。免费浏览器端转换器，无需上传至服务器。",
      ogTitle: "WebP 转 PNG — 免费在线转换器",
      ogDescription: "将 WebP 转换为 PNG 以获得通用兼容性。免费、隐私安全、浏览器端处理。",
    },
    hero: {
      overline: "WebP 转 PNG 转换器",
      headlinePart1: "将 WebP 转换为",
      headlineAccent: "PNG",
      headlinePart2: "通用格式",
      description: "将 WebP 图片转换为 PNG，以获得与旧版软件、打印工作流程和尚不支持 WebP 的设计工具的最大兼容性。",
    },
    scenarios: [
      {
        icon: "ArrowRightLeft",
        title: "兼容性需求",
        description: "下载了 WebP 图片但您的软件不支持？转换为 PNG 即可与 Photoshop、PowerPoint、Word 等所有工具兼容。",
      },
      {
        icon: "Image",
        title: "在旧版工具中编辑",
        description: "部分旧版图片编辑器和设计工具可能无法打开 WebP 文件。先转换为 PNG，完成编辑后如需再转回。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 WebP", description: "拖拽或选择您要转换为 PNG 格式的 WebP 图片。" },
      { stepNumber: 2, title: "预览转换效果", description: "查看 PNG 预览。WebP 文件的所有视觉内容和透明度都被完美保留。" },
      { stepNumber: 3, title: "下载 PNG 文件", description: "保存 PNG 图片——现在可与几乎所有图片查看器、编辑器和平台兼容。" },
    ],
    faqEntries: [
      { question: "WebP 转 PNG 会丢失质量吗？", answer: "转换过程中不会丢失质量。PNG 是无损格式，因此 WebP 源文件的每个像素都被精确保留。文件大小会更大，因为 PNG 的压缩不如 WebP 激进。" },
      { question: "WebP 转 PNG 时透明度会保留吗？", answer: "是的。WebP 和 PNG 都支持 Alpha 透明度。WebP 图片中的任何透明区域在 PNG 输出中都被完美保留。" },
      { question: "为什么选择转换为 PNG 而不是 JPG？", answer: "当您需要透明度支持或无损质量时选择 PNG。当您想要最小的文件大小且不需要透明度时选择 JPG。" },
    ],
    relatedTools: [
      { slug: "/webp-to-jpg", title: "WebP 转 JPG", description: "将 WebP 转换为 JPG，获得更小的文件（不含透明度）。" },
      { slug: "/compress-png", title: "压缩 PNG", description: "转换后缩小 PNG 文件大小。" },
      { slug: "/png-to-webp", title: "PNG 转 WebP", description: "当需要更小文件时转回 WebP。" },
    ],
  },

  "webp-to-jpg": {
    slug: "webp-to-jpg",
    category: "use-case",
    seo: {
      title: "在线将 WebP 转换为 JPG — 免费转换器 | ImgSplit",
      description: "将 WebP 图片转换为 JPG 格式以获得最大兼容性。免费浏览器端转换器，无需上传至服务器，即时下载。",
      ogTitle: "WebP 转 JPG — 免费在线转换器",
      ogDescription: "将 WebP 转换为 JPG 以获得最大兼容性。免费、隐私安全、浏览器端处理。",
    },
    hero: {
      overline: "WebP 转 JPG 转换器",
      headlinePart1: "将 WebP 转换为",
      headlineAccent: "JPG",
      headlinePart2: "最大兼容性",
      description: "将 WebP 图片转换为通用支持的 JPG 格式。适合分享、打印以及在任何软件或平台上使用——无需担心兼容性问题。",
    },
    scenarios: [
      {
        icon: "Mail",
        title: "与他人分享",
        description: "并非所有设备都能处理 WebP。通过邮件、即时通讯应用或文件传输分享之前，先转换为 JPG 以确保所有人都能打开您的图片。",
      },
      {
        icon: "FileDown",
        title: "打印准备",
        description: "大多数打印店和按需打印服务期望使用 JPG 文件。将 WebP 图片转换为 JPG，轻松打印，获得可预测的色彩输出。",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传 WebP", description: "拖拽或选择您要转换为 JPG 格式的 WebP 图片。" },
      { stepNumber: 2, title: "设置 JPG 质量", description: "调整质量滑块。透明区域将填充为您选择的背景色（默认白色）。" },
      { stepNumber: 3, title: "下载 JPG 文件", description: "保存 JPG 图片——可立即用于分享、打印或在任何应用程序中使用。" },
    ],
    faqEntries: [
      { question: "WebP 转 JPG 时透明度会怎样？", answer: "JPG 不支持透明度。WebP 图片中的任何透明区域将填充为纯色背景——默认为白色。您可以在转换前选择其他颜色。" },
      { question: "JPG 是兼容性最好的图片格式吗？", answer: "是的。JPG/JPEG 几乎被所有设备、浏览器、邮件客户端和软件应用程序支持。当兼容性是首要考虑因素时，它是最安全的选择。" },
      { question: "WebP 转 JPG 后文件大小会增加吗？", answer: "通常会增加，因为 WebP 比 JPG 提供更好的压缩。不过您可以调整 JPG 质量设置，在文件大小和视觉质量之间找到合适的平衡。" },
    ],
    relatedTools: [
      { slug: "/webp-to-png", title: "WebP 转 PNG", description: "当需要透明度和无损质量时将 WebP 转换为 PNG。" },
      { slug: "/compress-jpeg", title: "压缩 JPEG", description: "转换后进一步缩小 JPEG 文件大小。" },
      { slug: "/jpg-to-webp", title: "JPG 转 WebP", description: "当需要更小文件时转回 WebP。" },
    ],
  },


  "crop-image": {
    slug: "crop-image",
    category: "use-case",
    seo: { title: "在线裁剪图片 — 免费社媒裁剪工具 | ImgSplit", description: "在线裁剪图片到 Instagram、YouTube、Facebook 等社媒尺寸。免费、隐私安全、浏览器端处理。", ogTitle: "在线裁剪图片 — 免费社媒裁剪工具", ogDescription: "在浏览器中裁剪照片到社媒尺寸。" },
    hero: { overline: "图片裁剪工具", headlinePart1: "在线裁剪", headlineAccent: "图片", headlinePart2: "精确尺寸", description: "将任意图片调整并裁剪到精确社媒尺寸。选择预设、定位图片、应用裁剪，然后在本地导出。" },
    scenarios: [
      { icon: "Crop", title: "精确比例", description: "导出前锁定正方形、竖版或宽屏比例。" },
      { icon: "Smartphone", title: "社媒即用", description: "使用 Instagram 帖子、Story、YouTube 缩略图和 Facebook 封面预设。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传图片", description: "打开 Resize 并添加 PNG、JPEG 或 WebP 图片。" },
      { stepNumber: 2, title: "选择预设", description: "选择社媒尺寸预设，然后用裁剪工具微调可见区域。" },
      { stepNumber: 3, title: "下载", description: "应用裁剪并下载 PNG、JPEG 或 WebP。" },
    ],
    faqEntries: [
      { question: "这是单独的裁剪编辑器吗？", answer: "不是。它是 Resize 编辑器中的社媒预设和裁剪控制。" },
      { question: "图片会上传吗？", answer: "不会。裁剪在浏览器中完成，图片留在你的设备上。" },
      { question: "可以自定义尺寸吗？", answer: "可以。你可以手动修改画布尺寸和裁剪比例。" },
    ],
    relatedTools: [
      { slug: "/resize", title: "图片调整尺寸", description: "设置精确尺寸、定位图片并导出。" },
      { slug: "/crop-for-instagram", title: "Instagram 裁剪", description: "快速裁剪正方形 Instagram 帖子。" },
      { slug: "/youtube-thumbnail-crop", title: "YouTube 缩略图裁剪", description: "裁剪到 16:9 缩略图尺寸。" },
    ],
  },

  "crop-for-instagram": {
    slug: "crop-for-instagram",
    category: "use-case",
    seo: { title: "Instagram 图片裁剪 — 免费 1:1 帖子裁剪 | ImgSplit", description: "在线裁剪 Instagram 帖子尺寸。1080 x 1080 正方形预设，浏览器端私密导出。", ogTitle: "Instagram 图片裁剪 — 免费在线工具", ogDescription: "无需上传即可制作 Instagram 正方形帖子。" },
    hero: { overline: "Instagram 裁剪工具", headlinePart1: "裁剪为", headlineAccent: "Instagram", headlinePart2: "1:1 帖子", description: "从任意图片创建 1080 x 1080 Instagram 帖子裁剪。居中主体并导出平台即用的正方形图片。" },
    scenarios: [
      { icon: "Crop", title: "正方形动态帖", description: "把横图或竖图转成干净的 1:1 Instagram 帖子。" },
      { icon: "Smartphone", title: "移动端分享", description: "在浏览器里先准备好图片，再发送到手机或发布工具。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传照片", description: "从 Instagram 正方形预设开始并添加图片。" },
      { stepNumber: 2, title: "调整裁剪", description: "拖动图片或裁剪框，让主体适合正方形画面。" },
      { stepNumber: 3, title: "下载", description: "应用裁剪并保存 Instagram 尺寸图片。" },
    ],
    faqEntries: [
      { question: "这个预设是什么尺寸？", answer: "Instagram 正方形预设使用 1080 x 1080 像素，比例为 1:1。" },
      { question: "也能裁剪竖版内容吗？", answer: "可以使用 Story 预设处理 9:16 竖版内容，或在 Resize 中自定义尺寸。" },
      { question: "裁剪会降低质量吗？", answer: "工具会按你选择的画布尺寸导出。Instagram 帖子的目标输出是 1080 x 1080。" },
    ],
    relatedTools: [
      { slug: "/instagram-story-crop", title: "Instagram Story 裁剪", description: "裁剪 9:16 竖版 Story 图片。" },
      { slug: "/resize", title: "图片调整尺寸", description: "按任意尺寸调整和裁剪。" },
      { slug: "/compress", title: "压缩图片", description: "分享前缩小最终图片体积。" },
    ],
  },

  "instagram-story-crop": {
    slug: "instagram-story-crop",
    category: "use-case",
    seo: { title: "Instagram Story 裁剪 — 免费 9:16 图片裁剪 | ImgSplit", description: "在线裁剪 Instagram Story 尺寸。1080 x 1920 竖版预设，浏览器端私密编辑。", ogTitle: "Instagram Story 裁剪 — 免费 9:16 裁剪", ogDescription: "用 1080 x 1920 预设在浏览器中裁剪竖版 Story。" },
    hero: { overline: "Instagram Story 裁剪", headlinePart1: "裁剪 Instagram", headlineAccent: "Story", headlinePart2: "9:16 竖版", description: "使用 1080 x 1920 预设准备全屏 Instagram Story。重新定位图片、应用裁剪并私密导出。" },
    scenarios: [
      { icon: "Smartphone", title: "全屏 Story", description: "把宽图或方图转成竖版 Story 素材，不拉伸图片。" },
      { icon: "Crop", title: "主体控制", description: "移动裁剪区域，让人物、产品或文字保留在可见画面中。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "打开 Story 预设", description: "在 Resize 中使用 1080 x 1920 Instagram Story 预设。" },
      { stepNumber: 2, title: "调整裁剪", description: "拖动四角或移动图片，让关键内容保持可见。" },
      { stepNumber: 3, title: "导出 Story", description: "下载竖版图片，用于 Instagram、Reels 封面或其他 9:16 场景。" },
    ],
    faqEntries: [
      { question: "Instagram Story 裁剪尺寸是多少？", answer: "预设使用 1080 x 1920 像素，比例为 9:16。" },
      { question: "可以用于 TikTok 或 Reels 吗？", answer: "可以。9:16 输出也适合很多短视频和竖版社媒场景。" },
      { question: "可以保留完整图片不裁剪吗？", answer: "可以使用 Fit 模式，让完整图片可见并保留空白区域。" },
    ],
    relatedTools: [
      { slug: "/crop-for-instagram", title: "Instagram 帖子裁剪", description: "制作正方形 Instagram 帖子。" },
      { slug: "/resize", title: "图片调整尺寸", description: "自定义尺寸调整和裁剪。" },
      { slug: "/jpg-to-webp", title: "JPG 转 WebP", description: "将完成的素材转换为 WebP。" },
    ],
  },

  "youtube-thumbnail-crop": {
    slug: "youtube-thumbnail-crop",
    category: "use-case",
    seo: { title: "YouTube 缩略图裁剪 — 免费 1280x720 裁剪 | ImgSplit", description: "在线裁剪 YouTube 缩略图尺寸。1280 x 720 16:9 预设，浏览器端处理，无需上传。", ogTitle: "YouTube 缩略图裁剪 — 免费 16:9 裁剪", ogDescription: "在浏览器中裁剪 1280 x 720 缩略图。" },
    hero: { overline: "YouTube 缩略图裁剪", headlinePart1: "裁剪 YouTube", headlineAccent: "缩略图", headlinePart2: "16:9", description: "从任意图片创建 1280 x 720 YouTube 缩略图裁剪。使用 16:9 预设、定位主体并导出可上传图片。" },
    scenarios: [
      { icon: "Youtube", title: "缩略图准备", description: "将照片、截图或设计图裁剪为 YouTube 推荐的 1280 x 720 尺寸。" },
      { icon: "Crop", title: "构图控制", description: "确保人物、产品和标题区域保留在缩略图安全画面中。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传图片", description: "打开 YouTube 缩略图预设并添加源图片。" },
      { stepNumber: 2, title: "调整画面", description: "使用 16:9 裁剪框选择更有点击感的构图。" },
      { stepNumber: 3, title: "下载", description: "将最终 1280 x 720 缩略图导出为 PNG、JPEG 或 WebP。" },
    ],
    faqEntries: [
      { question: "YouTube 缩略图预设是什么尺寸？", answer: "预设使用 1280 x 720 像素，比例为 16:9。" },
      { question: "可以导出 JPG 吗？", answer: "可以。下载菜单支持 JPEG、PNG 或 WebP。" },
      { question: "这个工具能给缩略图加文字吗？", answer: "不能。这里专注裁剪和调整尺寸。你可以先在设计工具里加文字，再用 ImgSplit 裁剪/导出最终图片。" },
    ],
    relatedTools: [
      { slug: "/resize", title: "图片调整尺寸", description: "将图片调整到任意画布尺寸。" },
      { slug: "/compress-jpeg", title: "压缩 JPEG", description: "缩小完成后的缩略图。" },
      { slug: "/crop-image", title: "裁剪图片", description: "通用在线裁剪工具。" },
    ],
  },

  "social-media-image-sizes": {
    slug: "social-media-image-sizes",
    category: "use-case",
    seo: { title: "社交媒体图片尺寸大全与导出工具 | ImgSplit", description: "在浏览器中一站式生成 Instagram、YouTube、Facebook、X、LinkedIn 和 TikTok 的最新图片尺寸，隐私安全，无需上传。", ogTitle: "社交媒体图片尺寸大全", ogDescription: "一键导出各社交平台真正在用的图片尺寸。" },
    hero: { overline: "社媒图片尺寸", headlinePart1: "一键生成", headlineAccent: "全平台图片尺寸", headlinePart2: "", description: "用一张源图导出 Instagram 帖子和 Story、YouTube 缩略图、Facebook 封面、X 头图、LinkedIn 帖子以及 TikTok 竖版素材。" },
    scenarios: [
      { icon: "Ruler", title: "尺寸速查", description: "直接使用各平台实用预设，无需手动记忆和换算尺寸。" },
      { icon: "Package", title: "批量导出", description: "把选中的尺寸打包为一个 ZIP，按平台分文件夹并在文件名中标注尺寸。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传一张图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
      { stepNumber: 2, title: "选择平台尺寸", description: "勾选小红书、微信、抖音/TikTok、Instagram、YouTube、Facebook、X 或 LinkedIn 输出。" },
      { stepNumber: 3, title: "导出 ZIP", description: "微调裁剪，选择格式，然后下载按平台命名的 ZIP。" },
    ],
    faqEntries: [
      { question: "包含哪些社交媒体图片尺寸？", answer: "编辑器内置 Instagram 帖子和 Story、YouTube 缩略图、Facebook 封面、X/Twitter 头图、LinkedIn 帖子、TikTok 竖版、小红书封面和微信公众号封面等预设。" },
      { question: "可以只选海外平台的尺寸吗？", answer: "可以。使用海外平台预设包，一次导出 Instagram、YouTube、Facebook、X/Twitter、LinkedIn 和 TikTok 尺寸。" },
      { question: "还能导出国内平台的尺寸吗？", answer: "可以。使用中文创作者包导出小红书、微信和竖版短视频尺寸。" },
    ],
    relatedTools: [
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
      { slug: "/resize", title: "图片调整尺寸", description: "制作自定义裁剪或单个社媒尺寸。" },
      { slug: "/compress", title: "图片压缩", description: "导出后压缩图片，方便上传。" },
    ],
  },

  "instagram-post-size": {
    slug: "instagram-post-size",
    category: "use-case",
    seo: { title: "Instagram 帖子尺寸导出 — 1080x1080 与 1080x1350 | ImgSplit", description: "一张图生成 Instagram 帖子尺寸：正方形帖子、竖版帖子及配套 Story 裁剪。浏览器端私密导出，无需上传。", ogTitle: "Instagram 帖子尺寸导出", ogDescription: "制作 1080x1080 和 1080x1350 的 Instagram 帖子图片。" },
    hero: { overline: "Instagram 帖子尺寸", headlinePart1: "导出", headlineAccent: "Instagram 帖子", headlinePart2: "", description: "一次上传即可生成 1080x1080 正方形和 1080x1350 竖版帖子，下载前还能逐一微调裁剪。" },
    scenarios: [
      { icon: "Instagram", title: "动态帖子", description: "一次生成正方形和竖版动态图片，不用重复手动调整尺寸。" },
      { icon: "Crop", title: "按比例裁剪", description: "在每个 Instagram 比例下都让人物、产品和文字保持在画面内。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传一张图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
      { stepNumber: 2, title: "选择平台尺寸", description: "勾选小红书、微信、抖音/TikTok、Instagram、YouTube、Facebook、X 或 LinkedIn 输出。" },
      { stepNumber: 3, title: "导出 ZIP", description: "微调裁剪，选择格式，然后下载按平台命名的 ZIP。" },
    ],
    faqEntries: [
      { question: "会导出哪些 Instagram 帖子尺寸？", answer: "主要动态预设导出 1080 x 1080 正方形帖子和 1080 x 1350 竖版帖子。" },
      { question: "同一张图可以顺便做 Story 吗？", answer: "可以。保持勾选 1080 x 1920 的 Story/Reel 预设，并单独调整该裁剪。" },
      { question: "ImgSplit 会上传我的图片吗？", answer: "不会。图片渲染和 ZIP 打包都在浏览器本地完成。" },
    ],
    relatedTools: [
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
      { slug: "/resize", title: "图片调整尺寸", description: "制作自定义裁剪或单个社媒尺寸。" },
      { slug: "/compress", title: "图片压缩", description: "导出后压缩图片，方便上传。" },
    ],
  },

  "instagram-story-size": {
    slug: "instagram-story-size",
    category: "use-case",
    seo: { title: "Instagram Story 尺寸导出 — 1080x1920 | ImgSplit", description: "将图片调整为 1080x1920 的 Instagram Story 尺寸，并可从同一张源图导出动态配套尺寸。浏览器本地处理，无需上传。", ogTitle: "Instagram Story 尺寸导出", ogDescription: "在浏览器中制作 1080x1920 的 Instagram Story 图片。" },
    hero: { overline: "Instagram Story 尺寸", headlinePart1: "导出", headlineAccent: "1080x1920", headlinePart2: "Story", description: "把一张图片变成竖版 Instagram Story 或 Reel 风格素材，还能在同一个 ZIP 中加入动态、YouTube 或 X 配套尺寸。" },
    scenarios: [
      { icon: "Smartphone", title: "竖版 Story", description: "为移动端优先的发布准备 9:16 全屏图片。" },
      { icon: "Share2", title: "活动配套图", description: "同时导出 Story 和动态尺寸，让同一视觉在整场活动中保持一致。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传一张图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
      { stepNumber: 2, title: "选择平台尺寸", description: "勾选小红书、微信、抖音/TikTok、Instagram、YouTube、Facebook、X 或 LinkedIn 输出。" },
      { stepNumber: 3, title: "导出 ZIP", description: "微调裁剪，选择格式，然后下载按平台命名的 ZIP。" },
    ],
    faqEntries: [
      { question: "Instagram Story 预设是多大？", answer: "Story 预设导出 1080 x 1920 像素的 9:16 竖版图片。" },
      { question: "可以重新调整图片位置吗？", answer: "可以。选中 Story 输出后拖动预览，并调整填充、适配和缩放。" },
      { question: "可以导出 WebP 吗？", answer: "可以。下载 ZIP 前选择 PNG、JPEG 或 WebP。" },
    ],
    relatedTools: [
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
      { slug: "/resize", title: "图片调整尺寸", description: "制作自定义裁剪或单个社媒尺寸。" },
      { slug: "/compress", title: "图片压缩", description: "导出后压缩图片，方便上传。" },
    ],
  },

  "facebook-cover-photo-size": {
    slug: "facebook-cover-photo-size",
    category: "use-case",
    seo: { title: "Facebook 封面图片尺寸导出 | ImgSplit", description: "一张源图生成 Facebook 主页封面图，并可附带小组封面样式裁剪。免费、私密的浏览器端工具，无需上传。", ogTitle: "Facebook 封面图片尺寸", ogDescription: "导出可控裁剪的 Facebook 封面图片。" },
    hero: { overline: "Facebook 封面尺寸", headlinePart1: "制作", headlineAccent: "Facebook 封面", headlinePart2: "", description: "把一张图片裁剪为 Facebook 主页封面及相关封面样式，每个输出都有独立的裁剪控制。" },
    scenarios: [
      { icon: "Image", title: "主页封面", description: "准备横版 Facebook 主页封面，让主体位置恰到好处。" },
      { icon: "LayoutTemplate", title: "封面变体", description: "用同一张源图导出主页封面和小组封面样式的裁剪。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传一张图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
      { stepNumber: 2, title: "选择平台尺寸", description: "勾选小红书、微信、抖音/TikTok、Instagram、YouTube、Facebook、X 或 LinkedIn 输出。" },
      { stepNumber: 3, title: "导出 ZIP", description: "微调裁剪，选择格式，然后下载按平台命名的 ZIP。" },
    ],
    faqEntries: [
      { question: "包含哪种 Facebook 封面尺寸？", answer: "主页封面预设导出 851 x 315 像素，小组封面样式预设导出 1640 x 856 像素。" },
      { question: "能让文字远离边缘吗？", answer: "可以。下载前在预览中拖动裁剪位置即可。" },
      { question: "可以只导出 Facebook 封面吗？", answer: "可以。只勾选 Facebook 输出，然后下载 ZIP。" },
    ],
    relatedTools: [
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
      { slug: "/resize", title: "图片调整尺寸", description: "制作自定义裁剪或单个社媒尺寸。" },
      { slug: "/compress", title: "图片压缩", description: "导出后压缩图片，方便上传。" },
    ],
  },

  "linkedin-post-size": {
    slug: "linkedin-post-size",
    category: "use-case",
    seo: { title: "LinkedIn 帖子图片尺寸导出 — 1200x628 | ImgSplit", description: "将图片调整为 1200x628 的 LinkedIn 帖子尺寸，并可选导出其他社媒配套尺寸。浏览器端私密处理，无需上传。", ogTitle: "LinkedIn 帖子尺寸导出", ogDescription: "制作 1200x628 的 LinkedIn 帖子图片。" },
    hero: { overline: "LinkedIn 帖子尺寸", headlinePart1: "导出", headlineAccent: "LinkedIn 帖子", headlinePart2: "", description: "上传任意图片即可生成 1200x628 的 LinkedIn 帖子图，还可以同时导出 Instagram、YouTube、Facebook 或 X 配套素材。" },
    scenarios: [
      { icon: "Share2", title: "职场内容", description: "为 LinkedIn 动态准备公告、发布和文章配图。" },
      { icon: "Layers", title: "跨渠道素材", description: "一次导出，让同一视觉同时适配 LinkedIn 和其他平台。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传一张图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
      { stepNumber: 2, title: "选择平台尺寸", description: "勾选小红书、微信、抖音/TikTok、Instagram、YouTube、Facebook、X 或 LinkedIn 输出。" },
      { stepNumber: 3, title: "导出 ZIP", description: "微调裁剪，选择格式，然后下载按平台命名的 ZIP。" },
    ],
    faqEntries: [
      { question: "导出的 LinkedIn 帖子尺寸是多少？", answer: "LinkedIn 预设导出 1200 x 628 像素。" },
      { question: "可以修改裁剪吗？", answer: "可以。选中 LinkedIn 输出后调整填充、适配、缩放和位置。" },
      { question: "不上传图片也能用吗？", answer: "可以。图片始终保留在你的浏览器中。" },
    ],
    relatedTools: [
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
      { slug: "/resize", title: "图片调整尺寸", description: "制作自定义裁剪或单个社媒尺寸。" },
      { slug: "/compress", title: "图片压缩", description: "导出后压缩图片，方便上传。" },
    ],
  },

  "twitter-header-size": {
    slug: "twitter-header-size",
    category: "use-case",
    seo: { title: "Twitter 头图尺寸导出 — X 封面 1500x500 | ImgSplit", description: "一张图生成 1500x500 的 Twitter/X 头图，支持裁剪控制和浏览器端私密导出。无需上传，ZIP 打包输出。", ogTitle: "Twitter 头图尺寸导出", ogDescription: "制作 1500x500 的 X/Twitter 头图。" },
    hero: { overline: "Twitter/X 头图尺寸", headlinePart1: "导出", headlineAccent: "1500x500", headlinePart2: "头图", description: "把任意图片裁剪为 1500x500 的 X/Twitter 个人主页头图，并可用同一张源图导出相关社媒尺寸。" },
    scenarios: [
      { icon: "Maximize2", title: "主页头图", description: "制作主体居中、远离边缘的横版头图裁剪。" },
      { icon: "Package", title: "社媒 ZIP", description: "需要时把帖子、缩略图和动态尺寸加入同一个按平台命名的 ZIP。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "上传一张图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
      { stepNumber: 2, title: "选择平台尺寸", description: "勾选小红书、微信、抖音/TikTok、Instagram、YouTube、Facebook、X 或 LinkedIn 输出。" },
      { stepNumber: 3, title: "导出 ZIP", description: "微调裁剪，选择格式，然后下载按平台命名的 ZIP。" },
    ],
    faqEntries: [
      { question: "使用的 Twitter/X 头图尺寸是多少？", answer: "头图预设导出 1500 x 500 像素。" },
      { question: "也能导出 X 帖子图片吗？", answer: "可以。保持勾选 X 横版帖子预设，或直接选择全部预设包。" },
      { question: "可以用 JPEG 吗？", answer: "可以。导出前选择 PNG、JPEG 或 WebP。" },
    ],
    relatedTools: [
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
      { slug: "/resize", title: "图片调整尺寸", description: "制作自定义裁剪或单个社媒尺寸。" },
      { slug: "/compress", title: "图片压缩", description: "导出后压缩图片，方便上传。" },
    ],
  },

  "canva-image-splitter": {
    slug: "canva-image-splitter",
    category: "use-case",
    seo: { title: "Canva 图片切割工具 — 把 Canva 设计切成轮播图 | ImgSplit", description: "把 Canva 导出的 PNG 或 JPEG 直接在浏览器中切割为轮播面板。免费、私密，无需注册。", ogTitle: "Canva 图片切割工具", ogDescription: "秒切 Canva 导出图为轮播面板。" },
    hero: { overline: "Canva 轮播切割", headlinePart1: "将 Canva 设计切割为", headlineAccent: "轮播面板", headlinePart2: "", description: "在 Canva 中把设计导出为一张图片，拖进来即可切割成完美对齐的轮播面板，用于 Instagram、小红书或 LinkedIn，无需任何插件。" },
    scenarios: [
      { icon: "Layers2", title: "Canva 轮播工作流", description: "把长版 Canva 画布导出为一张图，再切成按顺序编号的轮播幻灯片。" },
      { icon: "Columns", title: "面板无缝对齐", description: "每个面板的边缘精准衔接，轮播看起来就像一张连续的长图。" },
      { icon: "Download", title: "编号 ZIP 导出", description: "面板按顺序编号，直接依次上传为轮播幻灯片即可。" },
    ],
    howToSteps: [
      { stepNumber: 1, title: "从 Canva 导出", description: "在 Canva 中将设计以原尺寸下载为 PNG 或 JPEG。" },
      { stepNumber: 2, title: "上传并设置面板数", description: "把导出的图片拖进来，选择要切割的面板数量。" },
      { stepNumber: 3, title: "下载并发布", description: "导出按编号排序的面板 ZIP，按顺序上传到你的轮播贴文。" },
    ],
    faqEntries: [
      { question: "如何从 Canva 导出设计用于轮播切割？", answer: "在 Canva 中打开「分享 → 下载」，选择 PNG 或 JPEG，然后把文件上传到这里切割为轮播面板。" },
      { question: "支持 Canva 的多页设计吗？", answer: "本工具切割的是单张平面图片。多页 Canva 设计请逐页导出，或先把多页合并成一张长图。" },
      { question: "切出来的面板能无缝拼接吗？", answer: "可以。切割按精确像素边界进行，相邻面板共享干净的接缝。" },
      { question: "需要 Canva 账号才能用吗？", answer: "不需要。这个工具完全独立，你只需要一张 PNG 或 JPEG 图片——来自 Canva 或其他任何地方都行。" },
    ],
    relatedTools: [
      { slug: "/grid", title: "网格切割", description: "将图片切割为均匀的网格。" },
      { slug: "/collage", title: "图片拼贴", description: "将多张图片合并为一个拼贴版面。" },
      { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
    ],
  },

}

export default data
