import type { PseoLocale, RelatedTool, ToolPageData } from "./types"

type LocaleWatermarkPages = Record<PseoLocale, Record<string, ToolPageData>>

const relatedTools: Record<PseoLocale, RelatedTool[]> = {
  en: [
    { slug: "/watermark", title: "Watermark Tool", description: "Add text and logo watermarks directly in your browser." },
    { slug: "/compress", title: "Compress Image", description: "Reduce the size of the finished watermarked image." },
    { slug: "/resize", title: "Resize Image", description: "Resize or crop before adding a watermark." },
  ],
  "zh-CN": [
    { slug: "/watermark", title: "水印工具", description: "在浏览器中添加文字水印和 Logo 水印。" },
    { slug: "/compress", title: "压缩图片", description: "压缩加水印后的成品图片。" },
    { slug: "/resize", title: "调整图片尺寸", description: "加水印前先调整尺寸或裁剪。" },
  ],
  ja: [
    { slug: "/watermark", title: "透かしツール", description: "ブラウザでテキスト透かしやロゴ透かしを追加。" },
    { slug: "/compress", title: "画像圧縮", description: "透かし入り画像を軽量化。" },
    { slug: "/resize", title: "画像リサイズ", description: "透かしを入れる前にサイズや切り抜きを調整。" },
  ],
  ko: [
    { slug: "/watermark", title: "워터마크 도구", description: "브라우저에서 텍스트와 로고 워터마크를 추가하세요." },
    { slug: "/compress", title: "이미지 압축", description: "워터마크가 적용된 이미지를 더 작게 만드세요." },
    { slug: "/resize", title: "이미지 크기 조정", description: "워터마크 전에 크기 조정이나 자르기를 하세요." },
  ],
  es: [
    { slug: "/watermark", title: "Herramienta de Marca de Agua", description: "Añade marcas de agua de texto y logo en el navegador." },
    { slug: "/compress", title: "Comprimir Imagen", description: "Reduce el tamaño de la imagen final con marca de agua." },
    { slug: "/resize", title: "Redimensionar Imagen", description: "Redimensiona o recorta antes de añadir la marca de agua." },
  ],
  "pt-BR": [
    { slug: "/watermark", title: "Ferramenta de Marca d'Água", description: "Adicione marcas d'água de texto e logo direto no navegador." },
    { slug: "/compress", title: "Comprimir Imagem", description: "Reduza o tamanho da imagem final com marca d'água." },
    { slug: "/resize", title: "Redimensionar Imagem", description: "Redimensione ou corte a imagem antes de adicionar a marca d'água." },
  ],
}

export const watermarkPagesByLocale: LocaleWatermarkPages = {
  en: {
    "add-watermark-to-photo": {
      slug: "add-watermark-to-photo",
      category: "use-case",
      seo: {
        title: "Add Watermark to Photo Online - Free Tool | ImgSplit",
        description: "Add a watermark to photos online with text or logo layers. Free private browser-based photo watermark tool with no upload to servers and easy export.",
        ogTitle: "Add Watermark to Photo Online",
        ogDescription: "Protect and brand photos with private browser-based watermarking.",
      },
      hero: {
        overline: "Photo Watermark Tool",
        headlinePart1: "Add Watermark ",
        headlineAccent: "to Photos",
        headlinePart2: "Online",
        description: "Mark photos with copyright text, a brand name, or a logo before sharing. Use precise placement controls or repeat the watermark across the photo.",
      },
      scenarios: [
        { icon: "Camera", title: "Photography Proofs", description: "Send client previews with a clear watermark while keeping the final unmarked photo private." },
        { icon: "Share2", title: "Social Sharing", description: "Add a creator name or brand mark before posting photos to social platforms." },
      ],
      howToSteps: [
        { stepNumber: 1, title: "Upload Your Photo", description: "Select a photo from your device. JPEG, PNG, and WebP are supported." },
        { stepNumber: 2, title: "Design the Watermark", description: "Choose a template, edit the text, or add a logo layer for brand marks." },
        { stepNumber: 3, title: "Download the Photo", description: "Export the watermarked photo as PNG, JPEG, or WebP." },
      ],
      faqEntries: [
        { question: "What is the best opacity for a photo watermark?", answer: "For most photos, 25-45% opacity keeps the watermark visible without distracting from the image." },
        { question: "Can I put the watermark in a corner?", answer: "Yes. Use the position controls to place a single watermark in any corner or near the center." },
        { question: "Will the tool change my original photo?", answer: "No. ImgSplit downloads a new watermarked file and leaves the original untouched." },
      ],
      relatedTools: relatedTools.en,
    },
  },

  "zh-CN": {
    "add-watermark-to-photo": {
      slug: "add-watermark-to-photo",
      category: "use-case",
      seo: { title: "在线给照片加水印 - 免费工具 | ImgSplit", description: "在线给照片添加文字或 Logo 水印。免费、私密、浏览器端处理，无需上传。", ogTitle: "在线给照片加水印", ogDescription: "用浏览器端水印工具保护和标记照片。" },
      hero: { overline: "照片水印工具", headlinePart1: "给照片", headlineAccent: "加水印", headlinePart2: "在线完成", description: "分享前给照片加版权文字、品牌名或 Logo。可精准放置，也可以把水印平铺到整张照片。" },
      scenarios: [
        { icon: "Camera", title: "摄影样片", description: "发送客户预览图时添加清晰水印，同时保留无水印原片。" },
        { icon: "Share2", title: "社交分享", description: "发布到社交平台前添加创作者名称或品牌标记。" },
      ],
      howToSteps: [
        { stepNumber: 1, title: "上传照片", description: "从设备选择照片，支持 JPEG、PNG 和 WebP。" },
        { stepNumber: 2, title: "设计水印", description: "选择模板、编辑文字，或添加 Logo 图层。" },
        { stepNumber: 3, title: "下载照片", description: "将加水印照片导出为 PNG、JPEG 或 WebP。" },
      ],
      faqEntries: [
        { question: "照片水印透明度多少合适？", answer: "多数照片使用 25-45% 透明度比较合适，既可见又不太抢画面。" },
        { question: "可以把水印放在角落吗？", answer: "可以。使用位置控制即可放到任意角落或靠近中心的位置。" },
        { question: "会修改我的原照片吗？", answer: "不会。ImgSplit 会下载新的加水印文件，原图保持不变。" },
      ],
      relatedTools: relatedTools["zh-CN"],
    },
  },

  ja: {
    "add-watermark-to-photo": {
      slug: "add-watermark-to-photo",
      category: "use-case",
      seo: { title: "写真に透かしを追加 - 無料オンラインツール | ImgSplit", description: "写真にテキストやロゴ透かしをオンラインで追加。無料、プライベート、アップロード不要のブラウザツール。", ogTitle: "写真に透かしを追加", ogDescription: "ブラウザで写真を保護・ブランド化。" },
      hero: { overline: "写真透かしツール", headlinePart1: "写真に", headlineAccent: "透かし", headlinePart2: "追加", description: "共有前に写真へ著作権テキスト、ブランド名、ロゴを追加。正確な配置や全面への繰り返し表示に対応します。" },
      scenarios: [
        { icon: "Camera", title: "写真校正", description: "クライアントプレビューに透かしを入れ、無透かしの完成データは非公開に保てます。" },
        { icon: "Share2", title: "SNS共有", description: "SNS投稿前にクリエイター名やブランドマークを追加できます。" },
      ],
      howToSteps: [
        { stepNumber: 1, title: "写真をアップロード", description: "JPEG、PNG、WebPの写真を選択します。" },
        { stepNumber: 2, title: "透かしを設計", description: "テンプレートを選び、文字を編集するか、ロゴレイヤーを追加します。" },
        { stepNumber: 3, title: "写真をダウンロード", description: "透かし入り写真をPNG、JPEG、WebPで書き出します。" },
      ],
      faqEntries: [
        { question: "写真透かしの透明度はどれくらいが良いですか？", answer: "多くの写真では25-45%程度が、見やすさと控えめさのバランスを取りやすいです。" },
        { question: "角に透かしを置けますか？", answer: "はい。位置コントロールで任意の角や中央付近に配置できます。" },
        { question: "元の写真は変更されますか？", answer: "いいえ。新しい透かし入りファイルをダウンロードし、元画像はそのままです。" },
      ],
      relatedTools: relatedTools.ja,
    },
  },

  ko: {
    "add-watermark-to-photo": {
      slug: "add-watermark-to-photo",
      category: "use-case",
      seo: { title: "사진에 워터마크 추가 - 무료 온라인 도구 | ImgSplit", description: "사진에 텍스트나 로고 워터마크를 온라인으로 추가하세요. 무료, 비공개, 업로드 없는 브라우저 도구입니다.", ogTitle: "사진에 워터마크 추가", ogDescription: "브라우저에서 사진을 보호하고 브랜딩하세요." },
      hero: { overline: "사진 워터마크 도구", headlinePart1: "사진에", headlineAccent: "워터마크", headlinePart2: "추가", description: "공유 전에 사진에 저작권 텍스트, 브랜드명, 로고를 추가하세요. 정확히 배치하거나 사진 전체에 반복할 수 있습니다." },
      scenarios: [
        { icon: "Camera", title: "사진 시안", description: "클라이언트 미리보기에 워터마크를 넣고 최종 원본은 비공개로 유지하세요." },
        { icon: "Share2", title: "소셜 공유", description: "소셜 플랫폼에 게시하기 전에 제작자명이나 브랜드 표시를 추가하세요." },
      ],
      howToSteps: [
        { stepNumber: 1, title: "사진 업로드", description: "기기에서 사진을 선택하세요. JPEG, PNG, WebP를 지원합니다." },
        { stepNumber: 2, title: "워터마크 디자인", description: "템플릿을 선택하고 텍스트를 편집하거나 로고 레이어를 추가하세요." },
        { stepNumber: 3, title: "사진 다운로드", description: "워터마크가 적용된 사진을 PNG, JPEG, WebP로 내보내세요." },
      ],
      faqEntries: [
        { question: "사진 워터마크 투명도는 어느 정도가 좋나요?", answer: "대부분의 사진에서는 25-45% 투명도가 보기 좋고 방해가 적습니다." },
        { question: "워터마크를 모서리에 둘 수 있나요?", answer: "예. 위치 컨트롤로 원하는 모서리나 중앙 근처에 배치할 수 있습니다." },
        { question: "원본 사진이 바뀌나요?", answer: "아니요. ImgSplit은 새 워터마크 파일을 다운로드하며 원본은 그대로 유지됩니다." },
      ],
      relatedTools: relatedTools.ko,
    },
  },

  es: {
    "add-watermark-to-photo": {
      slug: "add-watermark-to-photo",
      category: "use-case",
      seo: { title: "Añadir Marca de Agua a Foto Online | ImgSplit", description: "Añade una marca de agua a fotos online con texto o logo. Gratis, privado, en el navegador y sin subir archivos.", ogTitle: "Añadir Marca de Agua a Foto", ogDescription: "Protege y marca fotos con una herramienta privada en el navegador." },
      hero: { overline: "Marca de Agua para Fotos", headlinePart1: "Añade Marca ", headlineAccent: "a Fotos", headlinePart2: "Online", description: "Marca fotos con copyright, nombre de marca o logo antes de compartir. Usa controles precisos o repite la marca por toda la foto." },
      scenarios: [
        { icon: "Camera", title: "Pruebas Fotográficas", description: "Envía vistas previas a clientes con una marca clara y conserva la foto final sin marca." },
        { icon: "Share2", title: "Compartir en Redes", description: "Añade nombre de creador o marca antes de publicar en plataformas sociales." },
      ],
      howToSteps: [
        { stepNumber: 1, title: "Sube tu Foto", description: "Selecciona una foto de tu dispositivo. Soporta JPEG, PNG y WebP." },
        { stepNumber: 2, title: "Diseña la Marca", description: "Elige una plantilla, edita el texto o añade una capa de logo." },
        { stepNumber: 3, title: "Descarga la Foto", description: "Exporta la foto con marca como PNG, JPEG o WebP." },
      ],
      faqEntries: [
        { question: "¿Qué opacidad conviene para una foto?", answer: "Para la mayoría de fotos, 25-45% mantiene la marca visible sin distraer." },
        { question: "¿Puedo poner la marca en una esquina?", answer: "Sí. Usa los controles de posición para colocarla en cualquier esquina o cerca del centro." },
        { question: "¿Cambia mi foto original?", answer: "No. ImgSplit descarga un nuevo archivo con marca y deja el original intacto." },
      ],
      relatedTools: relatedTools.es,
    },
  },

  "pt-BR": {
    "add-watermark-to-photo": {
      slug: "add-watermark-to-photo",
      category: "use-case",
      seo: {
        title: "Colocar Marca d'Água em Foto Online - Grátis | ImgSplit",
        description: "Coloque marca d'água em fotos online com camadas de texto ou logo. Ferramenta gratuita e privada no navegador, sem enviar fotos para servidores.",
        ogTitle: "Colocar Marca d'Água em Foto Online",
        ogDescription: "Proteja e assine suas fotos com marca d'água privada no navegador.",
      },
      hero: {
        overline: "Marca d'Água para Fotos",
        headlinePart1: "Coloque Marca d'Água ",
        headlineAccent: "em Fotos",
        headlinePart2: "Online",
        description: "Assine suas fotos com texto de direitos autorais, nome da marca ou logo antes de compartilhar. Use controles precisos de posição ou repita a marca d'água pela foto inteira.",
      },
      scenarios: [
        { icon: "Camera", title: "Provas de Fotografia", description: "Envie prévias para clientes com uma marca d'água visível e mantenha a foto final sem marca em segurança." },
        { icon: "Share2", title: "Compartilhar nas Redes", description: "Adicione o nome do criador ou a sua marca antes de postar fotos nas redes sociais." },
      ],
      howToSteps: [
        { stepNumber: 1, title: "Envie sua Foto", description: "Selecione uma foto do seu dispositivo. JPEG, PNG e WebP são aceitos." },
        { stepNumber: 2, title: "Desenhe a Marca d'Água", description: "Escolha um modelo, edite o texto ou adicione uma camada de logo." },
        { stepNumber: 3, title: "Baixe a Foto", description: "Exporte a foto com marca d'água em PNG, JPEG ou WebP." },
      ],
      faqEntries: [
        { question: "Qual a melhor opacidade para marca d'água em foto?", answer: "Para a maioria das fotos, entre 25% e 45% de opacidade a marca fica visível sem tirar a atenção da imagem." },
        { question: "Posso colocar a marca d'água no canto da foto?", answer: "Sim. Use os controles de posição para colocar uma marca única em qualquer canto ou perto do centro." },
        { question: "A ferramenta altera minha foto original?", answer: "Não. O ImgSplit baixa um novo arquivo com marca d'água e mantém o original intacto." },
      ],
      relatedTools: relatedTools["pt-BR"],
    },
  },
}
