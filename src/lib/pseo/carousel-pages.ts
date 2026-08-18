import type { PseoLocale, RelatedTool, ToolPageData } from "./types"

// ─── Related Tools ───

const relatedToolsByLocale: Record<PseoLocale, RelatedTool[]> = {
  en: [
    { slug: "/grid", title: "Grid Splitter", description: "Split an image into a uniform grid of equal tiles." },
    { slug: "/collage", title: "Photo Collage Maker", description: "Combine multiple images into a single collage layout." },
    { slug: "/social-export", title: "Social Export", description: "Generate multiple social sizes from one source image." },
  ],
  "zh-CN": [
    { slug: "/grid", title: "网格切割", description: "将图片切割为均匀的网格。" },
    { slug: "/collage", title: "图片拼贴", description: "将多张图片合并为一个拼贴版面。" },
    { slug: "/social-export", title: "社媒导出", description: "一张图片生成多个社交平台尺寸。" },
  ],
  ja: [
    { slug: "/grid", title: "グリッド分割", description: "画像を均等なグリッドに分割します。" },
    { slug: "/collage", title: "フォトコラージュ", description: "複数の画像を1つのコラージュにまとめます。" },
    { slug: "/social-export", title: "SNS書き出し", description: "1枚の画像から複数のSNSサイズを生成。" },
  ],
  ko: [
    { slug: "/grid", title: "그리드 분할", description: "이미지를 균일한 그리드 타일로 분할하세요." },
    { slug: "/collage", title: "사진 콜라주", description: "여러 이미지를 하나의 콜라주 레이아웃으로 합치세요." },
    { slug: "/social-export", title: "소셜 내보내기", description: "이미지 한 장에서 여러 소셜 크기를 만드세요." },
  ],
  es: [
    { slug: "/grid", title: "Divisor de cuadrícula", description: "Divide una imagen en una cuadrícula uniforme de mosaicos." },
    { slug: "/collage", title: "Creador de collage", description: "Combina varias imágenes en un único diseño de collage." },
    { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
  ],
  "pt-BR": [
    { slug: "/grid", title: "Divisor de Grade", description: "Divida uma imagem em uma grade uniforme de blocos iguais." },
    { slug: "/collage", title: "Criador de Colagem", description: "Combine várias imagens em um único layout de colagem." },
    { slug: "/social-export", title: "Exportação Social", description: "Gere múltiplos tamanhos para redes sociais a partir de uma imagem." },
  ],
}

// ─── How-To Steps ───

const howToStepsByLocale: Record<PseoLocale, ToolPageData["howToSteps"]> = {
  en: [
    { stepNumber: 1, title: "Upload Your Image", description: "Add a PNG, JPEG, or WebP image. Everything stays in your browser." },
    { stepNumber: 2, title: "Set Carousel Slices", description: "Choose how many panels to split your image into for the carousel." },
    { stepNumber: 3, title: "Download Panels", description: "Export all slices as a ZIP, ready to upload one by one as carousel slides." },
  ],
  "zh-CN": [
    { stepNumber: 1, title: "上传图片", description: "添加 PNG、JPEG 或 WebP，图片保留在浏览器本地。" },
    { stepNumber: 2, title: "设置轮播切割数", description: "选择将图片切分为多少个轮播面板。" },
    { stepNumber: 3, title: "下载面板", description: "以 ZIP 形式导出所有切片，逐一上传为轮播幻灯片。" },
  ],
  ja: [
    { stepNumber: 1, title: "画像をアップロード", description: "PNG、JPEG、WebPを追加。画像はブラウザ内に留まります。" },
    { stepNumber: 2, title: "カルーセルスライス数を設定", description: "画像を何枚のカルーセルパネルに分割するかを選択します。" },
    { stepNumber: 3, title: "パネルをダウンロード", description: "すべてのスライスをZIPで書き出し、カルーセルスライドとして順番にアップロードします。" },
  ],
  ko: [
    { stepNumber: 1, title: "이미지 업로드", description: "PNG, JPEG, WebP 이미지를 추가하세요. 파일은 브라우저에 머뭅니다." },
    { stepNumber: 2, title: "캐러셀 분할 수 설정", description: "이미지를 몇 개의 캐러셀 패널로 나눌지 선택하세요." },
    { stepNumber: 3, title: "패널 다운로드", description: "모든 슬라이스를 ZIP으로 내보내고 캐러셀 슬라이드로 하나씩 업로드하세요." },
  ],
  es: [
    { stepNumber: 1, title: "Sube tu imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
    { stepNumber: 2, title: "Elige el número de paneles", description: "Selecciona en cuántos paneles dividir la imagen para el carrusel." },
    { stepNumber: 3, title: "Descarga los paneles", description: "Exporta todas las secciones en un ZIP listas para subirse como diapositivas del carrusel." },
  ],
  "pt-BR": [
    { stepNumber: 1, title: "Envie sua imagem", description: "Adicione um arquivo PNG, JPEG ou WebP. Tudo fica no seu navegador, sem upload." },
    { stepNumber: 2, title: "Defina os cortes do carrossel", description: "Escolha em quantos painéis a imagem será dividida para o carrossel." },
    { stepNumber: 3, title: "Baixe os painéis", description: "Exporte todos os recortes em um ZIP prontos para publicar, um a um, como slides do carrossel." },
  ],
}

// ─── Pages ───

export const carouselPagesByLocale: Record<PseoLocale, Record<string, ToolPageData>> = {
  en: {
    "canva-image-splitter": {
      slug: "canva-image-splitter",
      category: "use-case",
      seo: {
        title: "Canva Image Splitter - Split Canva Designs for Carousel | ImgSplit",
        description: "Export your Canva design as a PNG or JPEG, then split it into carousel panels directly in your browser. Free, private, and no signup required.",
        ogTitle: "Canva Image Splitter",
        ogDescription: "Split Canva exports into carousel panels instantly.",
      },
      hero: {
        overline: "Canva Carousel Splitter",
        headlinePart1: "Split Canva Designs Into ",
        headlineAccent: "Carousel Panels",
        headlinePart2: "",
        description: "Export your Canva design as a flat image, drop it here, and split it into perfectly aligned carousel panels for Instagram, LinkedIn, or TikTok. No plugins needed.",
      },
      scenarios: [
        { icon: "Layers2", title: "Canva Carousel Workflow", description: "Export a long Canva canvas as one image, then slice it into numbered carousel slides." },
        { icon: "Columns", title: "Seamless Panel Alignment", description: "Each panel edge lines up perfectly so your carousel looks like one continuous image." },
        { icon: "Download", title: "Numbered ZIP Export", description: "Receive panels numbered in order — just upload them in sequence as carousel slides." },
      ],
      howToSteps: [
        { stepNumber: 1, title: "Export from Canva", description: "In Canva, download your design as PNG or JPEG at full size." },
        { stepNumber: 2, title: "Upload and Set Panels", description: "Drop the exported image here and choose how many panels to split into." },
        { stepNumber: 3, title: "Download and Post", description: "Export the numbered panel ZIP and upload slides to your carousel in order." },
      ],
      faqEntries: [
        { question: "How do I export a Canva design for carousel splitting?", answer: "In Canva, go to Share → Download and choose PNG or JPEG. Then upload that file here to split into carousel panels." },
        { question: "Does this work with Canva's multi-page designs?", answer: "This tool splits a single flat image. For multi-page Canva designs, export each page individually or merge pages into one long image first." },
        { question: "Will the panels align perfectly for a seamless carousel?", answer: "Yes. The splitter cuts at exact pixel boundaries so adjacent panels share a clean edge." },
        { question: "Do I need a Canva account to use this?", answer: "No. This tool is independent. You only need a PNG or JPEG file — from Canva or anywhere else." },
      ],
      relatedTools: relatedToolsByLocale.en,
    },
  },
  "zh-CN": {
  },
  ja: {
  },
  ko: {
  },
  es: {
  },
  "pt-BR": {
    "canva-image-splitter": {
      slug: "canva-image-splitter",
      category: "use-case",
      seo: {
        title: "Dividir Imagem do Canva para Carrossel Online | ImgSplit",
        description: "Exporte seu design do Canva em PNG ou JPEG e divida em painéis de carrossel direto no navegador. Gratuito, privado e sem cadastro.",
        ogTitle: "Divisor de Imagens do Canva",
        ogDescription: "Divida exportações do Canva em painéis de carrossel na hora.",
      },
      hero: {
        overline: "Carrossel a partir do Canva",
        headlinePart1: "Divida Designs do Canva em ",
        headlineAccent: "Painéis de Carrossel",
        headlinePart2: "",
        description: "Exporte seu design do Canva como uma imagem única, solte aqui e divida em painéis perfeitamente alinhados para Instagram, LinkedIn ou TikTok. Sem plugins e sem instalar nada.",
      },
      scenarios: [
        { icon: "Layers2", title: "Fluxo de carrossel com Canva", description: "Exporte um canvas longo do Canva como uma única imagem e corte em slides de carrossel numerados." },
        { icon: "Columns", title: "Painéis perfeitamente alinhados", description: "Cada borda de painel se encaixa com precisão, e o carrossel parece uma imagem contínua." },
        { icon: "Download", title: "ZIP numerado", description: "Receba os painéis numerados em ordem — basta publicá-los em sequência como slides do carrossel." },
      ],
      howToSteps: [
        { stepNumber: 1, title: "Exporte do Canva", description: "No Canva, baixe seu design em PNG ou JPEG no tamanho original." },
        { stepNumber: 2, title: "Envie e defina os painéis", description: "Solte a imagem exportada aqui e escolha em quantos painéis dividir." },
        { stepNumber: 3, title: "Baixe e publique", description: "Exporte o ZIP com os painéis numerados e publique os slides do carrossel em ordem." },
      ],
      faqEntries: [
        { question: "Como exportar um design do Canva para dividir em carrossel?", answer: "No Canva, vá em Compartilhar → Baixar e escolha PNG ou JPEG. Depois envie o arquivo aqui para dividir em painéis de carrossel." },
        { question: "Funciona com designs de várias páginas do Canva?", answer: "A ferramenta divide uma única imagem. Para designs com várias páginas, exporte cada página separadamente ou junte tudo em uma imagem longa antes." },
        { question: "Os painéis vão se alinhar perfeitamente no carrossel?", answer: "Sim. O corte é feito em limites exatos de pixel, então painéis vizinhos compartilham uma borda limpa." },
        { question: "Preciso de conta no Canva para usar?", answer: "Não. A ferramenta é independente. Você só precisa de um arquivo PNG ou JPEG — do Canva ou de qualquer outro lugar." },
      ],
      relatedTools: relatedToolsByLocale["pt-BR"],
    },
    "cortar-carrossel": {
      slug: "cortar-carrossel",
      category: "use-case",
      seo: {
        title: "Cortar Carrossel - Divida Imagem para Carrossel Online | ImgSplit",
        description: "Corte uma imagem em partes iguais para publicar como carrossel no Instagram, LinkedIn ou TikTok. Gratuito, direto no navegador, sem instalar nada.",
        ogTitle: "Cortar Carrossel Online",
        ogDescription: "Divida qualquer imagem em partes prontas para carrossel em segundos.",
      },
      hero: {
        overline: "Divisor de Carrossel",
        headlinePart1: "Corte sua imagem em ",
        headlineAccent: "Partes de Carrossel",
        headlinePart2: "",
        description: "Transforme uma imagem larga ou alta em múltiplos painéis de largura igual, perfeitos para carrosséis no Instagram, LinkedIn e TikTok. Tudo no seu navegador, sem upload.",
      },
      scenarios: [
        { icon: "Columns", title: "Carrossel do Instagram", description: "Divida uma imagem panorâmica em 3 a 10 painéis deslizáveis com bordas perfeitas." },
        { icon: "Share2", title: "Carrossel do LinkedIn", description: "Corte infográficos em imagens prontas para carrossel do LinkedIn e aumente o engajamento." },
        { icon: "Smartphone", title: "Slides do TikTok", description: "Crie conjuntos de painéis verticais para carrosséis de fotos no TikTok." },
        { icon: "Package", title: "Download em ZIP numerado", description: "Baixe todos os painéis numerados em ordem, prontos para publicar como slides." },
      ],
      howToSteps: howToStepsByLocale["pt-BR"],
      faqEntries: [
        { question: "Como recortar um carrossel?", answer: "Envie sua imagem aqui, escolha o número de painéis e clique em exportar. O divisor corta a imagem em partes iguais que você publica uma a uma como slides do carrossel." },
        { question: "Como posso cortar um carrossel em partes?", answer: "Selecione de 2 a 10 partes, ajuste a orientação (horizontal ou vertical) e baixe o ZIP com os painéis já numerados na ordem correta." },
        { question: "Qual app cortar carrossel?", answer: "O ImgSplit é uma ferramenta online gratuita que divide imagens para carrossel diretamente no navegador, sem precisar baixar nenhum aplicativo." },
        { question: "Preciso instalar algo para cortar o carrossel?", answer: "Não. O ImgSplit funciona 100% no navegador. Basta acessar o site, enviar sua imagem e baixar as partes do carrossel — sem instalação, sem cadastro." },
      ],
      relatedTools: relatedToolsByLocale["pt-BR"],
    },
  },
}
