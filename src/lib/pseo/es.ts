import type { ToolPageData } from "./types"

const data: Record<string, ToolPageData> = {
  "split-in-half": {
    slug: "split-in-half",
    category: "direction",
    seo: {
      title: "Dividir Imagen por la Mitad Online — Divisor 50/50 Gratis | ImgSplit",
      description: "Divide cualquier imagen por la mitad al instante — horizontal o verticalmente. Herramienta online gratuita con precisión de píxeles, 100% en el navegador.",
      ogTitle: "Dividir Imagen por la Mitad — Herramienta Online Gratis",
      ogDescription: "Divide cualquier foto en dos mitades iguales con un clic. Sin subir archivos, funciona en tu navegador.",
    },
    hero: {
      overline: "Herramienta de División de Imágenes",
      headlinePart1: "Divide tu Imagen",
      headlineAccent: "por la Mitad",
      headlinePart2: "— Al Instante",
      description: "Divide cualquier imagen en dos partes iguales — horizontal o verticalmente. Precisión de píxeles sin pérdida de calidad, completamente en tu navegador.",
    },
    scenarios: [
      {
        icon: "Columns2",
        title: "Comparaciones antes y después",
        description: "Divide imágenes comparativas en archivos separados para presentaciones lado a lado, demos de productos o documentación de pruebas A/B.",
      },
      {
        icon: "Smartphone",
        title: "Portadas divididas para redes sociales",
        description: "Divide una imagen panorámica en dos mitades para publicaciones dobles en redes sociales que crean un efecto panorámico continuo.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Arrastra y suelta o haz clic para subir la imagen que deseas dividir por la mitad." },
      { stepNumber: 2, title: "Coloca la línea de corte", description: "Añade una línea de corte horizontal o vertical en el centro para dividir la imagen en dos partes iguales." },
      { stepNumber: 3, title: "Descarga ambas mitades", description: "Previsualiza las dos mitades y descárgalas individualmente o como archivo ZIP." },
    ],
    faqEntries: [
      { question: "¿Puedo dividir una imagen en dos partes desiguales?", answer: "Sí. Aunque la herramienta coloca la línea en el centro por defecto, puedes arrastrarla a cualquier posición para crear mitades desiguales — por ejemplo, una división 30/70." },
      { question: "¿Dividir por la mitad reduce la calidad de la imagen?", answer: "No. Cada mitad conserva la resolución y los datos de píxeles originales. No se aplica compresión ni remuestreo." },
      { question: "¿Puedo dividir horizontal y verticalmente al mismo tiempo?", answer: "Por supuesto. Añade una línea horizontal y una vertical para dividir la imagen en cuatro cuadrantes en lugar de dos mitades." },
    ],
    relatedTools: [
      { slug: "/split-horizontally", title: "Dividir Horizontalmente", description: "Divide imágenes con líneas horizontales en secciones superior e inferior." },
      { slug: "/split-vertically", title: "Dividir Verticalmente", description: "Divide imágenes con líneas verticales en secciones izquierda y derecha." },
      { slug: "/split-into-equal-parts", title: "Divisor en Partes Iguales", description: "Divide imágenes en múltiples segmentos iguales en cualquier dirección." },
      { slug: "/", title: "Divisor de Imágenes", description: "Herramienta completa de división de imágenes con líneas arrastrables." },
    ],
  },

  "split-horizontally": {
    slug: "split-horizontally",
    category: "direction",
    seo: {
      title: "Dividir Imagen Horizontalmente Online Gratis | ImgSplit",
      description: "Divide imágenes horizontalmente en secciones superior e inferior. Añade múltiples líneas horizontales para cortes precisos por filas. Gratis, en el navegador, sin subir archivos.",
      ogTitle: "Dividir Imagen Horizontalmente — Cortador Online Gratis",
      ogDescription: "Añade líneas de corte horizontales para dividir imágenes en filas. Gratis y en el navegador.",
    },
    hero: {
      overline: "División Horizontal",
      headlinePart1: "Divide Imágenes",
      headlineAccent: "Horizontalmente",
      headlinePart2: "— Fila por Fila",
      description: "Añade líneas de corte horizontales para dividir cualquier imagen en secciones superior e inferior, tiras o filas. Perfecto para cortar imágenes altas o crear segmentos horizontales.",
    },
    scenarios: [
      {
        icon: "LayoutList",
        title: "Segmentar imágenes altas de productos",
        description: "Divide imágenes altas de productos de tiendas online en secciones horizontales manejables para optimizar la carga y organizar la visualización.",
      },
      {
        icon: "FileText",
        title: "Segmentar documentos escaneados",
        description: "Divide documentos escaneados con múltiples secciones — recibos, facturas o formularios — en tiras horizontales individuales para archivarlos por separado.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Arrastra o selecciona cualquier imagen — PNG, JPG o WebP de hasta 20 MB." },
      { stepNumber: 2, title: "Añade líneas horizontales", description: "Haz clic en 'Añadir línea horizontal' para colocar una o más líneas de corte. Arrastra cada línea a la posición exacta." },
      { stepNumber: 3, title: "Descarga las filas", description: "Previsualiza cada tira horizontal y descarga todas a la vez como ZIP o selecciona filas específicas." },
    ],
    faqEntries: [
      { question: "¿Cuántas líneas horizontales puedo añadir?", answer: "Puedes añadir hasta 20 líneas de corte horizontales, creando hasta 21 tiras horizontales a partir de una sola imagen." },
      { question: "¿Puedo combinar líneas horizontales y verticales?", answer: "Sí. Añadir ambas crea una cuadrícula — para tiras puramente horizontales, solo añade líneas horizontales." },
      { question: "¿Hay una función de ajuste a cuadrícula para una colocación precisa?", answer: "Sí. Las líneas de corte se ajustan automáticamente a los bordes cercanos y a la línea central, ayudándote a colocarlas con precisión de píxeles." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir por la Mitad", description: "Divide una imagen en dos partes iguales con una sola línea." },
      { slug: "/split-vertically", title: "Dividir Verticalmente", description: "Corta imágenes con líneas verticales en columnas izquierda y derecha." },
      { slug: "/split-long-screenshot", title: "Divisor de Capturas Largas", description: "Divide capturas de pantalla largas en segmentos legibles del tamaño de una página." },
      { slug: "/grid", title: "Divisor en Cuadrícula", description: "Divide imágenes en cuadrículas de 3×3, 1×3 o 2×2." },
    ],
  },

  "split-vertically": {
    slug: "split-vertically",
    category: "direction",
    seo: {
      title: "Dividir Imagen Verticalmente Online Gratis | ImgSplit",
      description: "Divide imágenes verticalmente en columnas izquierda y derecha. Añade múltiples líneas verticales para cortes por columnas. Gratis, privado, funciona en tu navegador.",
      ogTitle: "Dividir Imagen Verticalmente — Cortador de Columnas Gratis",
      ogDescription: "Añade líneas de corte verticales para dividir imágenes en columnas. En el navegador y privado.",
    },
    hero: {
      overline: "División Vertical",
      headlinePart1: "Divide Imágenes",
      headlineAccent: "Verticalmente",
      headlinePart2: "— Columna por Columna",
      description: "Coloca líneas de corte verticales para dividir cualquier imagen en secciones izquierda y derecha, columnas o tiras verticales. Ideal para imágenes panorámicas y diseños multicolumna.",
    },
    scenarios: [
      {
        icon: "Columns3",
        title: "Tiras cómicas multipanel",
        description: "Separa los paneles de tiras cómicas o cuadros de storyboard dispuestos uno al lado del otro en paneles verticales individuales.",
      },
      {
        icon: "LayoutDashboard",
        title: "Columnas de capturas de dashboards",
        description: "Extrae columnas específicas de capturas de dashboards o hojas de cálculo anchas para informes y presentaciones enfocados.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Sube la imagen panorámica o ancha que deseas dividir en columnas verticales." },
      { stepNumber: 2, title: "Añade líneas verticales", description: "Coloca una o más líneas de corte verticales y arrástralas para definir los límites de las columnas." },
      { stepNumber: 3, title: "Descarga las columnas", description: "Revisa cada segmento de columna y descárgalos individualmente o expórtalos todos como archivo ZIP." },
    ],
    faqEntries: [
      { question: "¿Cuál es el número máximo de cortes verticales?", answer: "Hasta 20 líneas verticales, produciendo un máximo de 21 columnas a partir de una sola imagen." },
      { question: "¿Dividir una panorámica perderá píxeles en los bordes?", answer: "No. La herramienta utiliza límites exactos de píxeles — no se pierden ni se difuminan píxeles en los bordes de corte." },
      { question: "¿Puedo dividir verticalmente una imagen en formato retrato?", answer: "Sí, aunque los cortes verticales funcionan mejor en imágenes horizontales o anchas. Las imágenes en retrato producirán tiras verticales estrechas." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir por la Mitad", description: "Una línea, dos partes iguales — la forma más simple de dividir una imagen." },
      { slug: "/split-horizontally", title: "Dividir Horizontalmente", description: "Corta imágenes en filas y tiras horizontales." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divide imágenes anchas en mosaicos para publicaciones en carrusel de Instagram." },
      { slug: "/grid", title: "Divisor en Cuadrícula", description: "Crea mosaicos de cuadrícula 3×3 o personalizados a partir de cualquier imagen." },
    ],
  },

  "split-into-equal-parts": {
    slug: "split-into-equal-parts",
    category: "direction",
    seo: {
      title: "Dividir Imagen en Partes Iguales Online Gratis | ImgSplit",
      description: "Divide cualquier imagen en partes iguales — 2, 3, 4 o más segmentos iguales. Herramienta online gratuita con alineación automática para divisiones uniformes. Sin subir archivos.",
      ogTitle: "Dividir Imagen en Partes Iguales — Herramienta Gratis",
      ogDescription: "Divide imágenes en segmentos perfectamente iguales con líneas de corte alineadas automáticamente.",
    },
    hero: {
      overline: "Divisor en Partes Iguales",
      headlinePart1: "Dividir en",
      headlineAccent: "Partes Iguales",
      headlinePart2: "— Uniforme y Preciso",
      description: "Divide cualquier imagen en 2, 3, 4 o más segmentos perfectamente iguales. La alineación automática garantiza divisiones uniformes con precisión de píxeles.",
    },
    scenarios: [
      {
        icon: "Grid2X2",
        title: "Preparación de puzzles y collages",
        description: "Divide una imagen en mosaicos iguales para crear puzzles tipo rompecabezas, materiales educativos o piezas listas para collage.",
      },
      {
        icon: "Printer",
        title: "Mosaicos de impresión uniformes",
        description: "Divide una imagen grande en mosaicos de impresión del mismo tamaño para que cada pieza se ajuste a tamaños de papel estándar y permita un ensamblaje perfecto.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Selecciona la imagen que deseas dividir en secciones iguales." },
      { stepNumber: 2, title: "Añade líneas equidistantes", description: "Añade líneas horizontales o verticales. Usa la alineación automática para distribuirlas uniformemente en la imagen." },
      { stepNumber: 3, title: "Descarga los segmentos iguales", description: "Verifica que todas las partes sean iguales y luego descarga cada segmento o el conjunto completo como ZIP." },
    ],
    faqEntries: [
      { question: "¿Cómo me aseguro de que las partes sean perfectamente iguales?", answer: "Usa la función de alineación automática — las líneas se ajustan automáticamente a posiciones equidistantes. Para una división en 3 partes, coloca 2 líneas y se alinearán en las marcas de 1/3 y 2/3." },
      { question: "¿Puedo crear una cuadrícula de rectángulos iguales?", answer: "Sí. Añade líneas horizontales y verticales equidistantes para crear una cuadrícula de rectángulos de tamaño idéntico — perfecto para flujos de trabajo basados en mosaicos." },
      { question: "¿Qué pasa si las dimensiones de la imagen no son divisibles exactamente?", answer: "El último segmento puede diferir en un píxel. La herramienta distribuye los píxeles de la manera más uniforme posible para minimizar cualquier diferencia de tamaño." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir por la Mitad", description: "La división igual más simple — divide una imagen exactamente en dos mitades." },
      { slug: "/split-for-print", title: "Divisor para Impresión", description: "Divide imágenes grandes en mosaicos del tamaño de papel estándar para imprimir." },
      { slug: "/no-photoshop-slicer", title: "Cortar sin Photoshop", description: "Una alternativa gratuita a la herramienta de corte de Photoshop para dividir imágenes rápidamente." },
      { slug: "/grid", title: "Divisor en Cuadrícula", description: "Diseños de cuadrícula predefinidos: 3×3, 1×3 y 2×2." },
    ],
  },

  "split-long-screenshot": {
    slug: "split-long-screenshot",
    category: "use-case",
    seo: {
      title: "Dividir Capturas Largas en Páginas — Gratis Online | ImgSplit",
      description: "Divide capturas de pantalla largas en segmentos del tamaño de una página para compartir y leer fácilmente. Herramienta gratuita en el navegador — sin subir archivos, funciona con cualquier imagen alta.",
      ogTitle: "Dividir Capturas Largas — Divisor de Páginas Gratis",
      ogDescription: "Divide capturas de pantalla largas en piezas legibles del tamaño de una página. Sin necesidad de subir archivos.",
    },
    hero: {
      overline: "Divisor de Imágenes Largas",
      headlinePart1: "Divide Capturas",
      headlineAccent: "Largas",
      headlinePart2: "en Páginas",
      description: "Divide capturas de pantalla con desplazamiento largo en segmentos del tamaño de una página para compartir, leer y archivar fácilmente. Funciona con cualquier imagen alta.",
    },
    scenarios: [
      {
        icon: "MessageSquare",
        title: "Archivo de historial de chat",
        description: "Divide capturas completas de conversaciones de aplicaciones de mensajería en imágenes individuales del tamaño de pantalla para almacenamiento organizado y uso compartido selectivo.",
      },
      {
        icon: "FileSearch",
        title: "Documentación de páginas web",
        description: "Divide capturas largas de páginas web en secciones manejables para informes de errores, revisiones de diseño o documentación de cumplimiento.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube la captura larga", description: "Sube tu captura de pantalla con desplazamiento — la herramienta maneja imágenes de cualquier altura." },
      { stepNumber: 2, title: "Coloca los cortes horizontales", description: "Añade líneas de corte horizontales donde desees los saltos de página. Usa la alineación automática para un espaciado uniforme." },
      { stepNumber: 3, title: "Descarga los segmentos", description: "Previsualiza cada segmento y descarga todas las páginas como ZIP para compartir fácilmente." },
    ],
    faqEntries: [
      { question: "¿Hay una altura máxima para las capturas de pantalla largas?", answer: "La herramienta puede manejar imágenes de hasta 20 MB de tamaño. Las imágenes muy altas (más de 10.000 px) pueden procesarse más lentamente, pero son totalmente compatibles." },
      { question: "¿Puedo dividir una captura en segmentos de igual longitud?", answer: "Sí. Añade múltiples líneas horizontales y usa la alineación automática para espaciarlas uniformemente, creando segmentos de altura uniforme." },
      { question: "¿El texto de mi captura seguirá siendo nítido después de dividirla?", answer: "Por supuesto. La herramienta recorta a la resolución original sin ningún remuestreo, por lo que el texto se mantiene nítido y legible." },
    ],
    relatedTools: [
      { slug: "/split-horizontally", title: "Divisor Horizontal", description: "Añade líneas horizontales para dividir cualquier imagen en filas." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divide imágenes en publicaciones de carrusel con múltiples diapositivas." },
      { slug: "/split-for-wechat", title: "Divisor para Redes Sociales", description: "Prepara imágenes en cuadrícula para publicaciones en redes sociales." },
      { slug: "/", title: "Divisor de Imágenes", description: "Herramienta completa de división con líneas arrastrables." },
    ],
  },

  "split-for-instagram": {
    slug: "split-for-instagram",
    category: "use-case",
    seo: {
      title: "Dividir Imágenes para Instagram — Carrusel y Cuadrícula Gratis | ImgSplit",
      description: "Divide imágenes para publicaciones en carrusel y cuadrícula del perfil de Instagram. Optimizado para 1080×1080px. Gratis, en el navegador, sin marcas de agua.",
      ogTitle: "Divisor de Imágenes para Instagram — Herramienta Gratis de Carrusel y Cuadrícula",
      ogDescription: "Divide imágenes en mosaicos listos para Instagram. Optimizado para publicaciones de 1080×1080px.",
    },
    hero: {
      overline: "Divisor para Instagram",
      headlinePart1: "Divide para",
      headlineAccent: "Instagram",
      headlinePart2: "— Carrusel y Cuadrícula",
      description: "Crea impresionantes diapositivas de carrusel y diseños de cuadrícula para tu perfil de Instagram dividiendo tus imágenes en mosaicos perfectamente dimensionados. Optimizado para las dimensiones nativas de Instagram.",
    },
    platformInfo: "Tamaño recomendado de publicación en Instagram: 1080 × 1080 px (1:1 cuadrado). El carrusel admite hasta 10 diapositivas.",
    scenarios: [
      {
        icon: "LayoutGrid",
        title: "Cuadrícula de perfil continua",
        description: "Divide una imagen ancha en 3, 6 o 9 mosaicos que crean un efecto panorámico continuo en la cuadrícula de tu perfil de Instagram.",
      },
      {
        icon: "GalleryHorizontal",
        title: "Diapositivas de publicación en carrusel",
        description: "Divide una foto panorámica o infografía en diapositivas de carrusel deslizables que cuentan una historia visual a través de múltiples fotogramas.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Sube la imagen o panorámica que deseas dividir para Instagram." },
      { stepNumber: 2, title: "Configura tu cuadrícula", description: "Añade líneas verticales para diapositivas de carrusel, o crea una cuadrícula para el diseño del perfil. Usa la alineación automática para un espaciado uniforme." },
      { stepNumber: 3, title: "Descarga los mosaicos para Instagram", description: "Descarga todos los mosaicos como ZIP. Súbelos a Instagram en orden para un resultado perfecto." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño debe tener cada mosaico de Instagram?", answer: "Instagram muestra las publicaciones a 1080×1080px (cuadrado). Para publicaciones en carrusel, cada diapositiva debe tener 1080px de ancho. La herramienta te permite dividir en cualquier límite." },
      { question: "¿Cuántas diapositivas puede tener un carrusel de Instagram?", answer: "Instagram permite hasta 10 diapositivas por publicación en carrusel. Divide tu imagen en 2 a 10 segmentos verticales para crear una panorámica deslizable." },
      { question: "¿Los mosaicos estarán en el orden correcto para publicar?", answer: "Sí. Los mosaicos se numeran de izquierda a derecha (para cortes verticales) o de arriba a abajo (para cortes horizontales), coincidiendo con el orden de subida de Instagram." },
    ],
    relatedTools: [
      { slug: "/split-into-equal-parts", title: "Divisor en Partes Iguales", description: "Divide imágenes en segmentos perfectamente iguales para cualquier plataforma." },
      { slug: "/split-long-screenshot", title: "Divisor de Capturas Largas", description: "Divide imágenes altas en segmentos compartibles del tamaño de una página." },
      { slug: "/split-for-wechat", title: "Divisor para Redes Sociales", description: "Divide imágenes en cuadrícula para publicaciones en redes sociales." },
      { slug: "/grid", title: "Divisor en Cuadrícula", description: "Divisiones rápidas en cuadrícula 3×3 optimizadas para redes sociales." },
    ],
  },

  "split-for-wechat": {
    slug: "split-for-wechat",
    category: "use-case",
    seo: {
      title: "Divisor de Imágenes en Cuadrícula Online Gratis — Divide Fotos al Instante | ImgSplit",
      description: "Divisor de imágenes online gratis con líneas de corte arrastrables. Corta fotos en cualquier cuadrícula o segmentos personalizados. En el navegador, privado, sin subir archivos.",
      ogTitle: "Divisor de Imágenes Gratis — Divide Fotos Online",
      ogDescription: "Divide imágenes en cuadrículas o segmentos personalizados. Gratis y en el navegador.",
    },
    hero: {
      overline: "Divisor de Imágenes en Cuadrícula",
      headlinePart1: "Divide Imágenes",
      headlineAccent: "en Cuadrícula",
      headlinePart2: "— Para Redes Sociales",
      description: "Divide imágenes en mosaicos de cuadrícula para publicaciones en redes sociales. Arrastra las líneas de corte para crear cuadrículas personalizadas o usa el espaciado uniforme para mosaicos regulares.",
    },
    scenarios: [
      {
        icon: "Share2",
        title: "Publicaciones en cuadrícula para redes sociales",
        description: "Crea publicaciones en cuadrícula llamativas dividiendo una imagen en múltiples mosaicos que forman un conjunto visual coherente al verse en tu perfil.",
      },
      {
        icon: "Maximize2",
        title: "Segmentación de imágenes grandes",
        description: "Divide imágenes de gran tamaño en mosaicos de cuadrícula manejables para plataformas con límites de tamaño o dimensiones de subida.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Sube la foto que deseas dividir en mosaicos de cuadrícula." },
      { stepNumber: 2, title: "Crea tu cuadrícula", description: "Añade líneas horizontales y verticales para definir tu diseño de cuadrícula. La alineación automática ayuda a crear un espaciado uniforme." },
      { stepNumber: 3, title: "Descarga los mosaicos", description: "Descarga todas las piezas de la cuadrícula como archivo ZIP, listas para publicar en orden en tu plataforma social." },
    ],
    faqEntries: [
    ],
    relatedTools: [
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divide imágenes específicamente para publicaciones en carrusel y cuadrícula de Instagram." },
      { slug: "/split-long-screenshot", title: "Divisor de Capturas Largas", description: "Divide capturas de pantalla altas en segmentos del tamaño de una página." },
      { slug: "/", title: "Divisor de Imágenes", description: "Herramienta completa de división de imágenes con líneas de corte personalizables." },
      { slug: "/grid", title: "Divisor en Cuadrícula", description: "Divisiones rápidas en cuadrícula predefinida: 3×3, 1×3, 2×2." },
    ],
  },

  "split-for-print": {
    slug: "split-for-print",
    category: "use-case",
    seo: {
      title: "Dividir Imagen para Imprimir en Mosaicos — Gratis Online | ImgSplit",
      description: "Divide imágenes grandes en mosaicos imprimibles que se ajustan a tamaños de papel estándar. Imprime y ensambla pósters, banners y arte de gran formato. Herramienta gratuita en el navegador.",
      ogTitle: "Dividir Imagen para Imprimir — Herramienta de Mosaicos Gratis",
      ogDescription: "Divide imágenes grandes en mosaicos del tamaño de una página para imprimir y ensamblar.",
    },
    hero: {
      overline: "Divisor para Impresión",
      headlinePart1: "Divide para",
      headlineAccent: "Imprimir",
      headlinePart2: "— Mosaicos y Ensamblaje",
      description: "Divide imágenes grandes en mosaicos del tamaño de una página que puedes imprimir en papel estándar y ensamblar en pósters, banners o arte mural.",
    },
    scenarios: [
      {
        icon: "Image",
        title: "Impresión de pósters DIY",
        description: "Convierte cualquier imagen de alta resolución en un póster de varias páginas — divídela en mosaicos A4 o Carta, imprímelos en casa y pégalos para un resultado de gran formato.",
      },
      {
        icon: "Ruler",
        title: "Planos arquitectónicos y diseños técnicos",
        description: "Divide planos técnicos o diseños de planta de gran tamaño en secciones imprimibles para que cada página muestre una porción manejable del diseño.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube la imagen grande", description: "Sube la imagen de alta resolución, póster o plano que deseas imprimir en mosaicos." },
      { stepNumber: 2, title: "Define los límites de los mosaicos", description: "Añade líneas de corte equidistantes para crear mosaicos que coincidan con el tamaño de tu papel. Usa la alineación automática para un espaciado uniforme." },
      { stepNumber: 3, title: "Imprime y ensambla", description: "Descarga todos los mosaicos, imprime cada uno en una página separada y organízalos para reconstruir la imagen completa." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño de papel debo usar para los mosaicos?", answer: "Para impresoras domésticas, A4 (210×297mm) o Carta US (8.5×11 pulgadas) son los estándares. Calcula el número de mosaicos según la proporción de tu imagen y el tamaño final deseado." },
      { question: "¿La herramienta añade márgenes de superposición para el ensamblaje?", answer: "La herramienta divide en los límites exactos de píxeles. Para márgenes de superposición, aumenta ligeramente el número de mosaicos para que las piezas adyacentes compartan una franja delgada para la alineación." },
      { question: "¿Puedo dividir una imagen de muy alta resolución (por ejemplo, 8000×6000)?", answer: "Sí. La herramienta maneja imágenes grandes de hasta 20 MB. Para archivos de resolución extremadamente alta, considera usar el formato WebP para un tamaño de archivo menor." },
    ],
    relatedTools: [
      { slug: "/split-into-equal-parts", title: "Divisor en Partes Iguales", description: "Divide imágenes en segmentos perfectamente iguales para mosaicos uniformes." },
      { slug: "/split-horizontally", title: "Divisor Horizontal", description: "Divide imágenes en filas para impresión en tiras." },
      { slug: "/no-photoshop-slicer", title: "Cortar sin Photoshop", description: "Una alternativa online gratuita al flujo de trabajo de corte y exportación de Photoshop." },
      { slug: "/", title: "Divisor de Imágenes", description: "Herramienta completa de división de imágenes con líneas personalizables." },
    ],
  },

  "no-photoshop-slicer": {
    slug: "no-photoshop-slicer",
    category: "use-case",
    seo: {
      title: "Cortador de Imágenes Online Gratis — Sin Necesidad de Photoshop | ImgSplit",
      description: "Una alternativa gratuita a la herramienta de corte de Photoshop. Divide imágenes en regiones sin instalar nada. En el navegador, privado e instantáneo.",
      ogTitle: "Cortador de Imágenes sin Photoshop — Herramienta Online Gratis",
      ogDescription: "Olvídate de Photoshop. Corta imágenes en regiones al instante en tu navegador.",
    },
    hero: {
      overline: "Cortador sin Photoshop",
      headlinePart1: "Cortador de Imágenes",
      headlineAccent: "Sin Photoshop",
      headlinePart2: "Necesario",
      description: "Olvídate de las costosas suscripciones de software. Divide y corta imágenes en cualquier diseño usando líneas arrastrables — completamente gratis, completamente en tu navegador.",
    },
    scenarios: [
      {
        icon: "DollarSign",
        title: "Ahorra la suscripción",
        description: "Obtén cortes de imagen con calidad de Photoshop sin la suscripción mensual de Creative Cloud — gratis y accesible para todos.",
      },
      {
        icon: "GraduationCap",
        title: "Flujo de trabajo para principiantes",
        description: "Sin capas, sin barras de herramientas, sin curva de aprendizaje. Solo arrastra las líneas donde quieras cortar y descarga las piezas — cualquiera puede hacerlo en segundos.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu imagen", description: "Arrastra y suelta o haz clic para subir. Sin necesidad de cuenta ni software que instalar." },
      { stepNumber: 2, title: "Arrastra las líneas de corte", description: "Añade líneas horizontales y verticales para definir las regiones de corte. La alineación automática garantiza la precisión." },
      { stepNumber: 3, title: "Exporta tus cortes", description: "Descarga todas las regiones cortadas como ZIP — listas para web, redes sociales o cualquier otro uso." },
    ],
    faqEntries: [
      { question: "¿Es realmente tan preciso como la herramienta de corte de Photoshop?", answer: "Sí. La herramienta divide en los límites exactos de píxeles con alineación automática — obtienes la misma precisión de píxeles sin la complejidad." },
      { question: "¿Puedo cortar imágenes para plantillas de correo electrónico HTML?", answer: "Por supuesto. Corta tu diseño de correo electrónico en secciones, exporta cada región y referéncialas en tu plantilla HTML para diseños de correo con precisión de píxeles." },
      { question: "¿Necesito crear una cuenta?", answer: "No. La herramienta es completamente gratuita y no requiere registro. Abre la página, sube, corta y descarga — eso es todo." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir por la Mitad", description: "La división más simple — divide cualquier imagen en dos partes iguales." },
      { slug: "/split-for-print", title: "Divisor para Impresión", description: "Divide imágenes grandes en mosaicos imprimibles del tamaño de una página." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divide imágenes para publicaciones en carrusel y cuadrícula de Instagram." },
      { slug: "/", title: "Divisor de Imágenes", description: "Herramienta completa de división de imágenes con líneas arrastrables." },
    ],
  },





  "compress-jpeg": {
    slug: "compress-jpeg",
    category: "use-case",
    seo: {
      title: "Comprimir JPEG Online — Reducir Tamaño JPG | ImgSplit",
      description: "Comprime imágenes JPEG y JPG online gratis. Reduce el tamaño de archivo con ajustes de calidad configurables. Basado en navegador, privado, sin subir a servidores.",
      ogTitle: "Comprimir JPEG Online — Reducir Tamaño JPG",
      ogDescription: "Reduce el tamaño de archivos JPEG con calidad ajustable. Gratis, privado, basado en navegador.",
    },
    hero: {
      overline: "Compresión JPEG",
      headlinePart1: "Comprime",
      headlineAccent: "JPEG",
      headlinePart2: "— Reduce el Tamaño",
      description: "Reduce el tamaño de archivos JPEG y JPG con control granular de calidad. Perfecto para fotógrafos, bloggers y desarrolladores web que necesitan archivos más pequeños sin pérdida visible de calidad.",
    },
    scenarios: [
      {
        icon: "Camera",
        title: "Flujo de Trabajo Fotográfico",
        description: "Comprime fotos JPEG de alta resolución de tu cámara para galerías web, pruebas para clientes o redes sociales — reduce archivos de 10 MB a menos de 1 MB manteniendo los detalles.",
      },
      {
        icon: "Globe",
        title: "Imágenes para Blog",
        description: "Optimiza imágenes JPEG para publicaciones de blog y artículos. Una carga más rápida significa mayor engagement de los lectores y mejor posicionamiento en buscadores.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu JPEG", description: "Arrastra y suelta o selecciona el archivo JPEG/JPG que deseas comprimir." },
      { stepNumber: 2, title: "Configura el Nivel de Calidad", description: "Ajusta el control deslizante de calidad — valores más bajos significan archivos más pequeños. Previsualiza la salida para encontrar el punto óptimo entre tamaño y calidad." },
      { stepNumber: 3, title: "Descarga el JPEG Comprimido", description: "Guarda tu JPEG comprimido. La herramienta te muestra exactamente cuánto tamaño de archivo se ahorró." },
    ],
    faqEntries: [
      { question: "¿Cuál es un buen ajuste de calidad para la compresión JPEG?", answer: "Para uso web, una calidad del 75-85% ofrece un excelente equilibrio — típicamente una reducción del 60-80% en el tamaño del archivo con una diferencia visual mínima. Para impresión, mantén la calidad al 90% o superior." },
      { question: "¿Puedo comprimir un JPEG varias veces?", answer: "Puedes, pero cada recompresión introduce ligeros artefactos. Para mejores resultados, siempre comprime desde el archivo original en lugar de recomprimir un JPEG ya comprimido." },
      { question: "¿Cuál es la diferencia entre JPEG y JPG?", answer: "No hay diferencia — JPG y JPEG se refieren al mismo formato. La extensión más corta '.jpg' se popularizó en Windows, que originalmente limitaba las extensiones a 3 caracteres." },
    ],
    relatedTools: [
      { slug: "/compress", title: "Comprimir Imagen", description: "Compresión de imágenes de uso general para cualquier formato." },
      { slug: "/jpg-to-webp", title: "JPG a WebP", description: "Convierte JPEG a WebP para tamaños de archivo aún más pequeños." },
      { slug: "/png-to-webp", title: "PNG a WebP", description: "Convierte PNG a WebP para tamaños de archivo aún más pequeños." },
    ],
  },

  "compress-png": {
    slug: "compress-png",
    category: "use-case",
    seo: {
      title: "Comprimir PNG Online — Reducir Tamaño PNG | ImgSplit",
      description: "Comprime imágenes PNG online preservando la transparencia. Reduce el tamaño de archivo con compresión sin pérdida o con pérdida. Gratis, basado en navegador, sin subir a servidores.",
      ogTitle: "Comprimir PNG Online — Reducir Tamaño PNG",
      ogDescription: "Reduce el tamaño de archivos PNG manteniendo la transparencia. Gratis, privado, basado en navegador.",
    },
    hero: {
      overline: "Compresión PNG",
      headlinePart1: "Comprime",
      headlineAccent: "PNG",
      headlinePart2: "— Mantén la Transparencia",
      description: "Reduce el tamaño de archivos PNG preservando completamente la transparencia. Ideal para capturas de UI, recursos de diseño y gráficos que necesitan canales alfa.",
    },
    scenarios: [
      {
        icon: "Smartphone",
        title: "Capturas de UI",
        description: "Comprime capturas de pantalla PNG de herramientas de diseño y capturas de pantalla. Reduce el tamaño de archivo para carga más rápida en documentación, informes de errores y revisiones de diseño.",
      },
      {
        icon: "Layers",
        title: "Recursos de Diseño",
        description: "Optimiza recursos de diseño PNG — iconos, logos y elementos de UI — para desarrollo web y de aplicaciones manteniendo bordes nítidos y transparencia.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu PNG", description: "Arrastra y suelta o selecciona el archivo PNG que deseas comprimir. La transparencia se preserva completamente." },
      { stepNumber: 2, title: "Optimiza el PNG", description: "Mantén PNG como salida. ImgSplit vuelve a codificar la imagen sin pérdida y conserva el archivo original cuando la recodificación lo haría más grande." },
      { stepNumber: 3, title: "Descarga el PNG Optimizado", description: "Guarda tu PNG comprimido. La transparencia, profundidad de color y calidad visual se mantienen." },
    ],
    faqEntries: [
      { question: "¿La compresión eliminará la transparencia de mi PNG?", answer: "No. El proceso de compresión preserva el canal alfa completamente. Tus fondos transparentes permanecen intactos." },
      { question: "¿Por qué los archivos PNG son tan grandes comparados con JPEG?", answer: "PNG usa compresión sin pérdida que preserva cada píxel exactamente, además de almacenar datos de transparencia. Para fotos sin transparencia, convertir a JPEG o WebP produce archivos mucho más pequeños." },
      { question: "¿Debería convertir mi PNG a WebP en lugar de comprimirlo?", answer: "Si necesitas la máxima reducción de tamaño y tu plataforma soporta WebP, convertir a WebP puede reducir el tamaño del archivo un 50-80% comparado con PNG optimizado, manteniendo la transparencia." },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG a WebP", description: "Convierte PNG a WebP para archivos dramáticamente más pequeños con transparencia." },
      { slug: "/png-to-jpg", title: "PNG a JPG", description: "Convierte PNG a JPEG para archivos más pequeños cuando no necesitas transparencia." },
      { slug: "/compress", title: "Comprimir Imagen", description: "Compresión de imágenes de uso general para cualquier formato." },
    ],
  },

  "png-to-webp": {
    slug: "png-to-webp",
    category: "use-case",
    seo: {
      title: "Convertir PNG a WebP Online — Gratis y Rápido | ImgSplit",
      description: "Convierte imágenes PNG a formato WebP para archivos dramáticamente más pequeños. Preserva la transparencia. Conversor gratuito basado en navegador, sin subir a servidores.",
      ogTitle: "Convertir PNG a WebP — Conversor Online Gratis",
      ogDescription: "Convierte PNG a WebP para archivos más pequeños con transparencia. Gratis y basado en navegador.",
    },
    hero: {
      overline: "Conversor PNG a WebP",
      headlinePart1: "Convierte PNG a",
      headlineAccent: "WebP",
      headlinePart2: "— Archivos Más Pequeños",
      description: "Transforma imágenes PNG a formato WebP con hasta un 80% de reducción de tamaño preservando la transparencia. El formato de imagen moderno para sitios web y aplicaciones más rápidos.",
    },
    scenarios: [
      {
        icon: "Zap",
        title: "Rendimiento Web",
        description: "Cambia los recursos PNG de tu sitio a WebP — las páginas cargan más rápido, el ancho de banda se reduce y los Core Web Vitals mejoran. La mayoría de los navegadores soportan WebP de forma nativa.",
      },
      {
        icon: "Smartphone",
        title: "Recursos de Aplicaciones",
        description: "Convierte iconos de aplicación, elementos de UI y gráficos de PNG a WebP. Recursos más pequeños significan instalaciones más rápidas, carga más veloz y menor uso de almacenamiento.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu PNG", description: "Arrastra y suelta o selecciona la imagen PNG que deseas convertir a formato WebP." },
      { stepNumber: 2, title: "Configura la Salida", description: "Ajusta los parámetros de calidad para la salida WebP. Mayor calidad significa archivos más grandes — previsualiza para encontrar el equilibrio adecuado." },
      { stepNumber: 3, title: "Descarga el Archivo WebP", description: "Guarda tu imagen WebP convertida. Compara los tamaños de archivo para ver la reducción dramática." },
    ],
    faqEntries: [
      { question: "¿WebP soporta transparencia como PNG?", answer: "Sí. WebP soporta completamente la transparencia alfa, convirtiéndolo en un excelente reemplazo de PNG en la mayoría de los casos de uso — con tamaños de archivo significativamente más pequeños." },
      { question: "¿Qué navegadores soportan WebP?", answer: "Todos los navegadores modernos soportan WebP: Chrome, Firefox, Safari, Edge y Opera. Solo Internet Explorer y versiones de navegadores muy antiguas carecen de soporte." },
      { question: "¿Cuánto más pequeño es WebP comparado con PNG?", answer: "Los archivos WebP son típicamente un 50-80% más pequeños que los archivos PNG equivalentes. Los ahorros exactos dependen del contenido de la imagen, pero la reducción es consistentemente dramática." },
    ],
    relatedTools: [
      { slug: "/png-to-jpg", title: "PNG a JPG", description: "Convierte PNG a JPEG cuando no necesitas transparencia." },
      { slug: "/jpg-to-webp", title: "JPG a WebP", description: "Convierte imágenes JPEG al formato moderno WebP." },
      { slug: "/compress-png", title: "Comprimir PNG", description: "Reduce el tamaño del archivo PNG manteniendo el formato PNG." },
    ],
  },

  "png-to-jpg": {
    slug: "png-to-jpg",
    category: "use-case",
    seo: {
      title: "Convertir PNG a JPG Online — Conversor Gratis | ImgSplit",
      description: "Convierte imágenes PNG a formato JPG online gratis. Elimina la transparencia y reduce el tamaño del archivo. Basado en navegador, privado, sin subir a servidores.",
      ogTitle: "Convertir PNG a JPG — Conversor Online Gratis",
      ogDescription: "Convierte PNG a JPG para eliminar la transparencia y reducir el tamaño. Gratis y basado en navegador.",
    },
    hero: {
      overline: "Conversor PNG a JPG",
      headlinePart1: "Convierte PNG a",
      headlineAccent: "JPG",
      headlinePart2: "— Elimina la Transparencia",
      description: "Convierte imágenes PNG a formato JPG para archivos más pequeños y compatibilidad universal. Las áreas transparentes se rellenan con un color de fondo sólido de tu elección.",
    },
    scenarios: [
      {
        icon: "Globe",
        title: "Publicación en Redes Sociales",
        description: "Convierte capturas de pantalla y gráficos PNG a JPG para plataformas de redes sociales que comprimen mucho los archivos PNG. Sube un JPG limpio para una calidad predecible.",
      },
      {
        icon: "Mail",
        title: "Compartir Documentos",
        description: "Convierte gráficos PNG a JPG para adjuntos de correo, presentaciones y documentos. Los archivos JPG son más pequeños y se pueden ver universalmente en cualquier dispositivo.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu PNG", description: "Arrastra y suelta o selecciona el archivo PNG que deseas convertir a formato JPG." },
      { stepNumber: 2, title: "Configura Fondo y Calidad", description: "Elige un color de fondo para las áreas transparentes (predeterminado: blanco) y establece el nivel de calidad JPEG." },
      { stepNumber: 3, title: "Descarga el Archivo JPG", description: "Guarda tu imagen JPG convertida. Las áreas transparentes se reemplazan con el color de fondo elegido." },
    ],
    faqEntries: [
      { question: "¿Qué pasa con las áreas transparentes de mi PNG?", answer: "Las áreas transparentes se rellenan con un color de fondo sólido — blanco por defecto. Puedes elegir cualquier color antes de la conversión." },
      { question: "¿La calidad de imagen cambiará al convertir PNG a JPG?", answer: "JPEG usa compresión con pérdida, por lo que puede haber ligeras diferencias de calidad en ajustes bajos. Al 90%+ de calidad, la diferencia es virtualmente invisible." },
      { question: "¿Cuándo debería mantener PNG en lugar de convertir a JPG?", answer: "Mantén PNG cuando necesites transparencia, precisión píxel a píxel para texto o líneas, o calidad sin pérdida. Convierte a JPG para fotografías o cuando necesites archivos más pequeños." },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG a WebP", description: "Convierte PNG a WebP para navegadores modernos con archivos aún más pequeños." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduce aún más el tamaño de tu archivo JPEG después de la conversión." },
      { slug: "/jpg-to-png", title: "JPG a PNG", description: "Convierte JPG de vuelta a PNG cuando necesites calidad sin pérdida." },
    ],
  },

  "jpg-to-png": {
    slug: "jpg-to-png",
    category: "use-case",
    seo: {
      title: "Convertir JPG a PNG Online — Conversor Gratis | ImgSplit",
      description: "Convierte imágenes JPG y JPEG a formato PNG para calidad sin pérdida. Conversor gratuito basado en navegador, sin subir a servidores, descarga instantánea.",
      ogTitle: "Convertir JPG a PNG — Conversor Online Gratis",
      ogDescription: "Convierte JPEG a PNG para calidad sin pérdida. Gratis, privado, basado en navegador.",
    },
    hero: {
      overline: "Conversor JPG a PNG",
      headlinePart1: "Convierte JPG a",
      headlineAccent: "PNG",
      headlinePart2: "— Calidad Sin Pérdida",
      description: "Convierte imágenes JPEG a formato PNG para calidad sin pérdida y soporte de transparencia. Ideal para trabajo de diseño, edición y cualquier flujo de trabajo que requiera salida perfecta a nivel de píxel.",
    },
    scenarios: [
      {
        icon: "Layers",
        title: "Trabajo de Diseño",
        description: "Convierte fotos a PNG para proyectos de diseño — composiciones de capas, superposiciones y mockups funcionan mejor con la calidad sin pérdida y soporte de transparencia de PNG.",
      },
      {
        icon: "Shield",
        title: "Necesidad de Transparencia",
        description: "¿Necesitas añadir transparencia a una foto? Conviértela primero a PNG, luego edita el canal alfa en tu herramienta de diseño para recortes limpios y superposiciones.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu JPG", description: "Arrastra y suelta o selecciona el archivo JPG/JPEG que deseas convertir a formato PNG." },
      { stepNumber: 2, title: "Previsualiza el Resultado", description: "Revisa la vista previa del PNG. La conversión preserva todo el contenido visual del JPEG original a calidad completa." },
      { stepNumber: 3, title: "Descarga el Archivo PNG", description: "Guarda tu imagen PNG sin pérdida. El archivo será más grande que el JPEG original pero sin artefactos de compresión adicionales." },
    ],
    faqEntries: [
      { question: "¿Convertir JPG a PNG mejora la calidad de imagen?", answer: "Convertir a PNG previene mayor pérdida de calidad pero no puede restaurar el detalle perdido durante la compresión JPEG original. El PNG convertido preserva perfectamente el estado actual del JPEG." },
      { question: "¿Por qué el archivo PNG es más grande que el JPG original?", answer: "PNG usa compresión sin pérdida que preserva cada píxel exactamente, resultando en archivos más grandes. JPEG usa compresión con pérdida que descarta algunos datos para lograr tamaños más pequeños." },
      { question: "¿Puedo añadir transparencia después de convertir a PNG?", answer: "Sí. Una vez en formato PNG, puedes editar el canal alfa en cualquier herramienta de diseño (Photoshop, GIMP, Figma) para añadir transparencia — algo no posible con JPEG." },
    ],
    relatedTools: [
      { slug: "/jpg-to-webp", title: "JPG a WebP", description: "Convierte JPEG a WebP para archivos más pequeños con compresión moderna." },
      { slug: "/compress-png", title: "Comprimir PNG", description: "Reduce el tamaño del archivo PNG después de la conversión." },
      { slug: "/png-to-jpg", title: "PNG a JPG", description: "Convierte de vuelta a JPG cuando necesites archivos más pequeños." },
    ],
  },

  "jpg-to-webp": {
    slug: "jpg-to-webp",
    category: "use-case",
    seo: {
      title: "Convertir JPG a WebP Online — Formato Moderno | ImgSplit",
      description: "Convierte imágenes JPG y JPEG a formato WebP para máxima compresión. Hasta un 80% de reducción. Conversor gratuito basado en navegador, sin subir a servidores.",
      ogTitle: "Convertir JPG a WebP — Conversor de Formato Moderno",
      ogDescription: "Convierte JPEG a WebP para archivos hasta un 80% más pequeños. Gratis, privado, basado en navegador.",
    },
    hero: {
      overline: "Conversor JPG a WebP",
      headlinePart1: "Convierte JPG a",
      headlineAccent: "WebP",
      headlinePart2: "— Máxima Compresión",
      description: "Transforma imágenes JPEG al formato moderno WebP para archivos dramáticamente más pequeños. Hasta un 80% de reducción de tamaño con calidad visual comparable — la elección inteligente para el rendimiento web.",
    },
    scenarios: [
      {
        icon: "RefreshCw",
        title: "Migración de Sitio Web",
        description: "Convierte en lote las imágenes JPEG de tu sitio a WebP durante una mejora de rendimiento. Carga de páginas más rápida, menores costos de hosting y mejores puntuaciones en Google PageSpeed.",
      },
      {
        icon: "Zap",
        title: "Optimización de Rendimiento",
        description: "Reemplaza las pesadas imágenes hero JPEG y fotos de productos con versiones WebP. Tus visitantes obtienen la misma experiencia visual con una fracción del tiempo de descarga.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu JPG", description: "Arrastra y suelta o selecciona el archivo JPEG que deseas convertir a WebP." },
      { stepNumber: 2, title: "Ajusta la Calidad WebP", description: "Ajusta finamente la configuración de calidad. Incluso al 80% de calidad, los archivos WebP son dramáticamente más pequeños que el equivalente JPEG." },
      { stepNumber: 3, title: "Descarga el Archivo WebP", description: "Guarda tu imagen WebP y compara el ahorro en tamaño de archivo. La mayoría de los usuarios ven una reducción del 50-80%." },
    ],
    faqEntries: [
      { question: "¿Cuánto más pequeño es WebP comparado con JPEG?", answer: "WebP es típicamente un 25-34% más pequeño que JPEG con calidad visual equivalente (según estudios de Google). Para muchas imágenes, el ahorro alcanza el 50% o más." },
      { question: "¿WebP es compatible en todas partes?", answer: "Sí, todos los navegadores modernos (Chrome, Firefox, Safari 14+, Edge) soportan WebP. Para los raros navegadores antiguos, sirve JPEG como respaldo usando el elemento HTML <picture>." },
      { question: "¿Convertir de JPEG a WebP pierde calidad?", answer: "Tanto JPEG como WebP son formatos con pérdida, así que la recodificación introduce artefactos adicionales mínimos. Para mejores resultados, convierte desde la fuente JPEG de mayor calidad que tengas." },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG a WebP", description: "Convierte imágenes PNG a WebP con soporte de transparencia." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduce el tamaño del archivo JPEG manteniendo el formato JPEG." },
      { slug: "/jpg-to-png", title: "JPG a PNG", description: "Convierte JPEG a formato PNG sin pérdida." },
    ],
  },

  "webp-to-png": {
    slug: "webp-to-png",
    category: "use-case",
    seo: {
      title: "Convertir WebP a PNG Online — Conversor Gratis | ImgSplit",
      description: "Convierte imágenes WebP a formato PNG para compatibilidad universal. Preserva la transparencia. Conversor gratuito basado en navegador, sin subir a servidores.",
      ogTitle: "Convertir WebP a PNG — Conversor Online Gratis",
      ogDescription: "Convierte WebP a PNG para compatibilidad universal. Gratis, privado, basado en navegador.",
    },
    hero: {
      overline: "Conversor WebP a PNG",
      headlinePart1: "Convierte WebP a",
      headlineAccent: "PNG",
      headlinePart2: "— Formato Universal",
      description: "Convierte imágenes WebP a PNG para máxima compatibilidad con software antiguo, flujos de impresión y herramientas de diseño que aún no soportan WebP.",
    },
    scenarios: [
      {
        icon: "ArrowRightLeft",
        title: "Necesidades de Compatibilidad",
        description: "¿Descargaste una imagen WebP pero tu software no la soporta? Conviértela a PNG para compatibilidad instantánea con Photoshop, PowerPoint, Word y todas las demás herramientas.",
      },
      {
        icon: "Image",
        title: "Edición en Herramientas Antiguas",
        description: "Editores de imagen y herramientas de diseño más antiguos pueden no abrir archivos WebP. Conviértelos primero a PNG, haz tus ediciones y luego convierte de vuelta si es necesario.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu WebP", description: "Arrastra y suelta o selecciona la imagen WebP que deseas convertir a formato PNG." },
      { stepNumber: 2, title: "Previsualiza la Conversión", description: "Revisa la vista previa del PNG. Todo el contenido visual y la transparencia del archivo WebP se preservan perfectamente." },
      { stepNumber: 3, title: "Descarga el Archivo PNG", description: "Guarda tu imagen PNG — ahora compatible con virtualmente todos los visores de imágenes, editores y plataformas." },
    ],
    faqEntries: [
      { question: "¿Perderé calidad al convertir WebP a PNG?", answer: "No se pierde calidad en la conversión. PNG es un formato sin pérdida, así que cada píxel de la fuente WebP se preserva exactamente. El tamaño del archivo será mayor porque PNG no comprime tan agresivamente." },
      { question: "¿Se preserva la transparencia al convertir WebP a PNG?", answer: "Sí. Tanto WebP como PNG soportan transparencia alfa. Cualquier área transparente en tu imagen WebP se preserva perfectamente en la salida PNG." },
      { question: "¿Por qué convertir WebP a PNG en lugar de JPG?", answer: "Elige PNG cuando necesites soporte de transparencia o calidad sin pérdida. Elige JPG si quieres el tamaño de archivo más pequeño y no necesitas transparencia." },
    ],
    relatedTools: [
      { slug: "/webp-to-jpg", title: "WebP a JPG", description: "Convierte WebP a JPG para archivos más pequeños sin transparencia." },
      { slug: "/compress-png", title: "Comprimir PNG", description: "Reduce el tamaño del archivo PNG después de la conversión." },
      { slug: "/png-to-webp", title: "PNG a WebP", description: "Convierte de vuelta a WebP cuando necesites archivos más pequeños." },
    ],
  },

  "webp-to-jpg": {
    slug: "webp-to-jpg",
    category: "use-case",
    seo: {
      title: "Convertir WebP a JPG Online — Conversor Gratis | ImgSplit",
      description: "Convierte imágenes WebP a formato JPG para máxima compatibilidad. Conversor gratuito basado en navegador, sin subir a servidores, descarga instantánea.",
      ogTitle: "Convertir WebP a JPG — Conversor Online Gratis",
      ogDescription: "Convierte WebP a JPG para máxima compatibilidad. Gratis, privado, basado en navegador.",
    },
    hero: {
      overline: "Conversor WebP a JPG",
      headlinePart1: "Convierte WebP a",
      headlineAccent: "JPG",
      headlinePart2: "— Máxima Compatibilidad",
      description: "Convierte imágenes WebP al formato JPG universalmente soportado. Perfecto para compartir, imprimir y usar con cualquier software o plataforma — sin preocupaciones de compatibilidad.",
    },
    scenarios: [
      {
        icon: "Mail",
        title: "Compartir con Otros",
        description: "No todos los dispositivos manejan WebP. Convierte a JPG antes de compartir por correo electrónico, aplicaciones de mensajería o transferencias de archivos para asegurar que todos puedan abrir tus imágenes.",
      },
      {
        icon: "FileDown",
        title: "Preparación para Impresión",
        description: "La mayoría de las imprentas y servicios de impresión bajo demanda esperan archivos JPG. Convierte imágenes WebP a JPG para una impresión sin complicaciones con una salida de color predecible.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu WebP", description: "Arrastra y suelta o selecciona la imagen WebP que deseas convertir a formato JPG." },
      { stepNumber: 2, title: "Configura la Calidad JPG", description: "Ajusta el control deslizante de calidad. Las áreas transparentes se rellenan con un color de fondo de tu elección (predeterminado: blanco)." },
      { stepNumber: 3, title: "Descarga el Archivo JPG", description: "Guarda tu imagen JPG — lista para compartir, imprimir o usar en cualquier aplicación." },
    ],
    faqEntries: [
      { question: "¿Qué pasa con la transparencia al convertir WebP a JPG?", answer: "JPG no soporta transparencia. Cualquier área transparente en tu imagen WebP se rellena con un color de fondo sólido — blanco por defecto. Puedes elegir un color diferente antes de la conversión." },
      { question: "¿Es JPG el formato de imagen más compatible?", answer: "Sí. JPG/JPEG es soportado por virtualmente todos los dispositivos, navegadores, clientes de correo y aplicaciones de software en existencia. Es la elección más segura cuando la compatibilidad es tu prioridad." },
      { question: "¿El tamaño del archivo aumentará al convertir WebP a JPG?", answer: "Típicamente sí, ya que WebP ofrece mejor compresión que JPG. Sin embargo, puedes ajustar la configuración de calidad JPG para encontrar el equilibrio adecuado entre tamaño de archivo y calidad visual." },
    ],
    relatedTools: [
      { slug: "/webp-to-png", title: "WebP a PNG", description: "Convierte WebP a PNG cuando necesites transparencia y calidad sin pérdida." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduce aún más el tamaño de tu archivo JPEG después de la conversión." },
      { slug: "/jpg-to-webp", title: "JPG a WebP", description: "Convierte de vuelta a WebP cuando necesites archivos más pequeños." },
    ],
  },


  "crop-image": {
    slug: "crop-image",
    category: "use-case",
    seo: { title: "Recortar Imagen Online — Herramienta Social Gratis | ImgSplit", description: "Recorta imágenes a tamaños para Instagram, YouTube, Facebook y más. Gratis, privado y en el navegador.", ogTitle: "Recortar Imagen Online", ogDescription: "Recorta fotos a tamaños sociales en tu navegador." },
    hero: { overline: "Herramienta de Recorte", headlinePart1: "Recorta", headlineAccent: "Imágenes", headlinePart2: "Tamaños Exactos", description: "Redimensiona y recorta cualquier imagen a dimensiones precisas para redes sociales. Elige un preajuste, ajusta la posición y exporta localmente." },
    scenarios: [
      { icon: "Crop", title: "Proporciones Exactas", description: "Bloquea proporciones cuadradas, verticales o panorámicas antes de exportar." },
      { icon: "Smartphone", title: "Listo para Redes", description: "Usa preajustes para Instagram, historias, YouTube y Facebook." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu Imagen", description: "Abre Resize y añade una imagen PNG, JPEG o WebP." },
      { stepNumber: 2, title: "Elige un Preajuste", description: "Selecciona un tamaño social y usa Crop para ajustar el área visible." },
      { stepNumber: 3, title: "Descarga", description: "Aplica el recorte y guarda como PNG, JPEG o WebP." },
    ],
    faqEntries: [
      { question: "¿Es un editor de recorte separado?", answer: "No. Es el editor Resize con preajustes sociales y controles de recorte." },
      { question: "¿Se sube mi imagen?", answer: "No. El recorte ocurre en tu navegador y la imagen permanece en tu dispositivo." },
      { question: "¿Puedo usar tamaños personalizados?", answer: "Sí. Puedes cambiar las dimensiones del lienzo y la proporción de recorte manualmente." },
    ],
    relatedTools: [
      { slug: "/resize", title: "Redimensionar Imagen", description: "Define dimensiones exactas y exporta." },
      { slug: "/crop-for-instagram", title: "Recortar para Instagram", description: "Crea publicaciones cuadradas rápidamente." },
      { slug: "/youtube-thumbnail-crop", title: "Recorte para YouTube", description: "Recorta a tamaño de miniatura 16:9." },
    ],
  },

  "crop-for-instagram": {
    slug: "crop-for-instagram",
    category: "use-case",
    seo: { title: "Recortar Imagen para Instagram — Gratis 1:1 | ImgSplit", description: "Recorta imágenes al tamaño de publicación de Instagram. Preajuste 1080 x 1080 y exportación privada en navegador.", ogTitle: "Recortar Imagen para Instagram", ogDescription: "Crea publicaciones cuadradas sin subir tu foto." },
    hero: { overline: "Recorte para Instagram", headlinePart1: "Recorta para", headlineAccent: "Instagram", headlinePart2: "Publicaciones 1:1", description: "Crea recortes de Instagram de 1080 x 1080 desde cualquier imagen. Centra el sujeto y exporta un cuadrado listo para publicar." },
    scenarios: [
      { icon: "Crop", title: "Feed Cuadrado", description: "Convierte fotos horizontales o verticales en publicaciones 1:1." },
      { icon: "Smartphone", title: "Compartir en Móvil", description: "Prepara imágenes en el navegador antes de enviarlas al móvil o programador." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu Foto", description: "Empieza desde el preajuste cuadrado de Instagram y añade tu imagen." },
      { stepNumber: 2, title: "Ajusta el Recorte", description: "Arrastra la imagen o el marco hasta que el sujeto encaje en el cuadrado." },
      { stepNumber: 3, title: "Descarga", description: "Aplica el recorte y guarda la imagen en tamaño Instagram." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño usa este preajuste?", answer: "El preajuste cuadrado de Instagram usa 1080 x 1080 píxeles con proporción 1:1." },
      { question: "¿Puedo recortar contenido vertical?", answer: "Usa el preajuste Story para contenido 9:16 o define dimensiones personalizadas en Resize." },
      { question: "¿El recorte reduce calidad?", answer: "La herramienta exporta al tamaño de lienzo elegido. Para Instagram, el objetivo es 1080 x 1080." },
    ],
    relatedTools: [
      { slug: "/instagram-story-crop", title: "Recorte Story", description: "Crea imágenes verticales 9:16." },
      { slug: "/resize", title: "Redimensionar Imagen", description: "Redimensiona y recorta a cualquier tamaño." },
      { slug: "/compress", title: "Comprimir Imagen", description: "Reduce el tamaño antes de compartir." },
    ],
  },

  "instagram-story-crop": {
    slug: "instagram-story-crop",
    category: "use-case",
    seo: { title: "Recorte Instagram Story — Gratis 9:16 | ImgSplit", description: "Recorta imágenes al tamaño de Instagram Story. Preajuste vertical 1080 x 1920 y edición privada en navegador.", ogTitle: "Recorte Instagram Story", ogDescription: "Crea historias verticales con preajuste 1080 x 1920." },
    hero: { overline: "Recorte Instagram Story", headlinePart1: "Recorta", headlineAccent: "Stories", headlinePart2: "Vertical 9:16", description: "Prepara historias de pantalla completa con el preajuste 1080 x 1920. Reposiciona, recorta y exporta de forma privada." },
    scenarios: [
      { icon: "Smartphone", title: "Stories Pantalla Completa", description: "Convierte imágenes anchas o cuadradas en assets verticales sin estirar." },
      { icon: "Crop", title: "Control del Sujeto", description: "Mantén caras, productos o texto dentro del marco visible." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Abre el Preajuste", description: "Usa el preajuste 1080 x 1920 de Instagram Story en Resize." },
      { stepNumber: 2, title: "Ajusta el Recorte", description: "Arrastra esquinas o mueve la imagen para mantener visible el contenido clave." },
      { stepNumber: 3, title: "Exporta", description: "Descarga la imagen vertical para Instagram, Reels u otros formatos 9:16." },
    ],
    faqEntries: [
      { question: "¿Cuál es el tamaño de Story?", answer: "1080 x 1920 píxeles, proporción 9:16." },
      { question: "¿Sirve para TikTok o Reels?", answer: "Sí. El formato 9:16 funciona bien para muchos formatos verticales." },
      { question: "¿Puedo mostrar la imagen completa?", answer: "Usa modo Fit para ver la imagen completa con espacio vacío." },
    ],
    relatedTools: [
      { slug: "/crop-for-instagram", title: "Recorte Instagram", description: "Crea publicaciones cuadradas." },
      { slug: "/resize", title: "Redimensionar Imagen", description: "Ajusta dimensiones personalizadas." },
      { slug: "/jpg-to-webp", title: "JPG a WebP", description: "Convierte assets finales a WebP." },
    ],
  },

  "youtube-thumbnail-crop": {
    slug: "youtube-thumbnail-crop",
    category: "use-case",
    seo: { title: "Recorte Miniatura YouTube — Gratis 1280x720 | ImgSplit", description: "Recorta imágenes al tamaño de miniatura de YouTube. Preajuste 1280 x 720 16:9, navegador privado, sin subir archivos.", ogTitle: "Recorte Miniatura YouTube", ogDescription: "Crea miniaturas 1280 x 720 en el navegador." },
    hero: { overline: "Recorte YouTube", headlinePart1: "Recorta", headlineAccent: "Miniaturas", headlinePart2: "16:9", description: "Crea miniaturas de YouTube de 1280 x 720 desde cualquier imagen. Usa el preajuste 16:9, encuadra el sujeto y exporta." },
    scenarios: [
      { icon: "Youtube", title: "Preparar Miniaturas", description: "Recorta fotos, capturas o diseños al tamaño recomendado de YouTube." },
      { icon: "Crop", title: "Control de Composición", description: "Mantén caras, productos y títulos dentro del marco seguro." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube tu Imagen", description: "Abre el preajuste de miniatura de YouTube y añade la imagen fuente." },
      { stepNumber: 2, title: "Encuadra", description: "Usa el marco 16:9 para elegir una composición más atractiva." },
      { stepNumber: 3, title: "Descarga", description: "Exporta la miniatura final 1280 x 720 como PNG, JPEG o WebP." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño usa el preajuste?", answer: "1280 x 720 píxeles con proporción 16:9." },
      { question: "¿Puedo exportar JPG?", answer: "Sí. Puedes descargar JPEG, PNG o WebP." },
      { question: "¿Añade texto a las miniaturas?", answer: "No. Esta herramienta se enfoca en recorte y redimensionado." },
    ],
    relatedTools: [
      { slug: "/resize", title: "Redimensionar Imagen", description: "Ajusta cualquier tamaño de lienzo." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduce miniaturas terminadas." },
      { slug: "/crop-image", title: "Recortar Imagen", description: "Herramienta general de recorte online." },
    ],
  },

  "social-media-image-sizes": {
    slug: "social-media-image-sizes",
    category: "use-case",
    seo: {
      title: "Tamaños de Imagen para Redes Sociales — Guía y Exportador | ImgSplit",
      description: "Crea los tamaños de imagen actuales para Instagram, YouTube, Facebook, X, LinkedIn y TikTok desde un editor privado en tu navegador, sin subir archivos.",
      ogTitle: "Tamaños de Imagen para Redes Sociales",
      ogDescription: "Exporta los tamaños de imagen que realmente se publican en cada plataforma.",
    },
    hero: {
      overline: "Tamaños para redes sociales",
      headlinePart1: "Crea ",
      headlineAccent: "Tamaños de Plataforma",
      headlinePart2: "Rápido",
      description: "Usa una sola imagen para exportar publicaciones e historias de Instagram, miniaturas de YouTube, portadas de Facebook, encabezados de X, publicaciones de LinkedIn y recursos verticales para TikTok.",
    },
    scenarios: [
      { icon: "Ruler", title: "Referencia de tamaños", description: "Parte de preajustes de plataforma prácticos en lugar de reconstruir las dimensiones a mano." },
      { icon: "Package", title: "Exportación por lotes", description: "Descarga los formatos seleccionados en un único ZIP con carpetas por plataforma y etiquetas de tamaño." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube una imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
      { stepNumber: 2, title: "Elige tamaños", description: "Selecciona salidas para Instagram, YouTube, Facebook, X/Twitter, LinkedIn o TikTok." },
      { stepNumber: 3, title: "Exporta ZIP", description: "Ajusta recortes, elige formato y descarga un ZIP por plataforma." },
    ],
    faqEntries: [
      { question: "¿Qué tamaños de imagen para redes sociales incluye?", answer: "El editor incluye preajustes de feed e historia de Instagram, miniatura de YouTube, portada de Facebook, encabezado de X/Twitter, publicación de LinkedIn, vertical de TikTok, portada de Xiaohongshu y portada de WeChat." },
      { question: "¿Puedo elegir solo tamaños de plataformas occidentales?", answer: "Sí. Usa el paquete de preajustes occidentales para salidas de Instagram, YouTube, Facebook, X/Twitter, LinkedIn y TikTok." },
      { question: "¿Puedo exportar también tamaños de plataformas chinas?", answer: "Sí. Usa el paquete para creadores chinos con salidas de Xiaohongshu, WeChat y formato vertical." },
    ],
    relatedTools: [
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
      { slug: "/resize", title: "Redimensionar imagen", description: "Crea un recorte personalizado o un tamaño puntual." },
      { slug: "/compress", title: "Compresor de imágenes", description: "Comprime los archivos finales para subirlos más rápido." },
    ],
  },

  "instagram-post-size": {
    slug: "instagram-post-size",
    category: "use-case",
    seo: {
      title: "Tamaño de Publicación de Instagram — 1080x1080 y 1080x1350 | ImgSplit",
      description: "Crea tamaños de publicación de Instagram desde una imagen: posts cuadrados, posts verticales y recortes de historia complementarios. Exportación privada en el navegador, sin subir archivos.",
      ogTitle: "Exportador de Tamaño de Publicación de Instagram",
      ogDescription: "Crea imágenes de Instagram de 1080x1080 y 1080x1350.",
    },
    hero: {
      overline: "Tamaño de publicación de Instagram",
      headlinePart1: "Exporta ",
      headlineAccent: "Posts de Instagram",
      headlinePart2: "",
      description: "Prepara posts cuadrados de 1080x1080 y verticales de 1080x1350 desde una sola imagen, y ajusta cada recorte antes de descargar.",
    },
    scenarios: [
      { icon: "Instagram", title: "Posts para el feed", description: "Crea imágenes cuadradas y verticales para el feed sin repetir el trabajo de redimensionar a mano." },
      { icon: "Crop", title: "Recorte por proporción", description: "Mantén rostros, productos y texto dentro del recorte en cada proporción de Instagram." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube una imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
      { stepNumber: 2, title: "Elige tamaños", description: "Selecciona salidas para Instagram, YouTube, Facebook, X/Twitter, LinkedIn o TikTok." },
      { stepNumber: 3, title: "Exporta ZIP", description: "Ajusta recortes, elige formato y descarga un ZIP por plataforma." },
    ],
    faqEntries: [
      { question: "¿Qué tamaños de publicación de Instagram exporta?", answer: "Los preajustes principales de feed exportan posts cuadrados de 1080 x 1080 y verticales de 1080 x 1350." },
      { question: "¿Puedo crear una historia desde la misma imagen?", answer: "Sí. Mantén seleccionado el preajuste de Story/Reel de 1080 x 1920 y ajusta ese recorte por separado." },
      { question: "¿ImgSplit sube mi imagen?", answer: "No. La imagen se procesa y se comprime en ZIP localmente en tu navegador." },
    ],
    relatedTools: [
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
      { slug: "/resize", title: "Redimensionar imagen", description: "Crea un recorte personalizado o un tamaño puntual." },
      { slug: "/compress", title: "Compresor de imágenes", description: "Comprime los archivos finales para subirlos más rápido." },
    ],
  },

  "instagram-story-size": {
    slug: "instagram-story-size",
    category: "use-case",
    seo: {
      title: "Tamaño de Historia de Instagram — 1080x1920 | ImgSplit",
      description: "Redimensiona una imagen al tamaño de historia de Instagram de 1080x1920 y exporta formatos de feed complementarios desde la misma fuente en tu navegador, sin subir archivos.",
      ogTitle: "Exportador de Tamaño de Historia de Instagram",
      ogDescription: "Crea historias de Instagram de 1080x1920 en tu navegador.",
    },
    hero: {
      overline: "Tamaño de historia de Instagram",
      headlinePart1: "Exporta ",
      headlineAccent: "1080x1920",
      headlinePart2: "Historias",
      description: "Convierte una imagen en una historia vertical de Instagram o recurso tipo Reel, y añade salidas complementarias de feed, YouTube o X en el mismo ZIP.",
    },
    scenarios: [
      { icon: "Smartphone", title: "Historias verticales", description: "Prepara imágenes 9:16 a pantalla completa para publicación móvil." },
      { icon: "Share2", title: "Piezas de campaña", description: "Exporta tamaños de historia y feed juntos para que el visual de la campaña se mantenga consistente." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube una imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
      { stepNumber: 2, title: "Elige tamaños", description: "Selecciona salidas para Instagram, YouTube, Facebook, X/Twitter, LinkedIn o TikTok." },
      { stepNumber: 3, title: "Exporta ZIP", description: "Ajusta recortes, elige formato y descarga un ZIP por plataforma." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño tiene el preajuste de historia de Instagram?", answer: "El preajuste de historia exporta 1080 x 1920 píxeles, una imagen vertical 9:16." },
      { question: "¿Puedo reposicionar la imagen?", answer: "Sí. Selecciona la salida de historia, arrastra la vista previa y ajusta relleno, encaje y escala." },
      { question: "¿Puedo exportar WebP?", answer: "Sí. Elige PNG, JPEG o WebP antes de descargar el ZIP." },
    ],
    relatedTools: [
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
      { slug: "/resize", title: "Redimensionar imagen", description: "Crea un recorte personalizado o un tamaño puntual." },
      { slug: "/compress", title: "Compresor de imágenes", description: "Comprime los archivos finales para subirlos más rápido." },
    ],
  },

  "facebook-cover-photo-size": {
    slug: "facebook-cover-photo-size",
    category: "use-case",
    seo: {
      title: "Tamaño de Foto de Portada de Facebook — Exportador Online | ImgSplit",
      description: "Crea portadas para páginas de Facebook y variantes de portada de grupo desde una sola imagen. Herramienta gratuita y privada en el navegador, sin subir archivos.",
      ogTitle: "Tamaño de Foto de Portada de Facebook",
      ogDescription: "Exporta fotos de portada de Facebook con control del recorte.",
    },
    hero: {
      overline: "Tamaño de portada de Facebook",
      headlinePart1: "Crea ",
      headlineAccent: "Portadas de Facebook",
      headlinePart2: "",
      description: "Recorta una imagen como portada de página de Facebook y formatos de portada relacionados, con control de recorte independiente para cada salida.",
    },
    scenarios: [
      { icon: "Image", title: "Portadas de página", description: "Prepara una portada ancha de página de Facebook con el sujeto colocado con intención." },
      { icon: "LayoutTemplate", title: "Variantes de portada", description: "Exporta recortes de portada de página y de grupo desde la misma imagen." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube una imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
      { stepNumber: 2, title: "Elige tamaños", description: "Selecciona salidas para Instagram, YouTube, Facebook, X/Twitter, LinkedIn o TikTok." },
      { stepNumber: 3, title: "Exporta ZIP", description: "Ajusta recortes, elige formato y descarga un ZIP por plataforma." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño de portada de Facebook incluye?", answer: "El preajuste de portada de página exporta 851 x 315 píxeles. El preajuste tipo portada de grupo exporta 1640 x 856 píxeles." },
      { question: "¿Puedo mantener el texto lejos del borde?", answer: "Sí. Usa la vista previa para arrastrar el recorte antes de descargar." },
      { question: "¿Puedo exportar solo portadas de Facebook?", answer: "Sí. Selecciona únicamente las salidas de Facebook y descarga el ZIP." },
    ],
    relatedTools: [
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
      { slug: "/resize", title: "Redimensionar imagen", description: "Crea un recorte personalizado o un tamaño puntual." },
      { slug: "/compress", title: "Compresor de imágenes", description: "Comprime los archivos finales para subirlos más rápido." },
    ],
  },

  "linkedin-post-size": {
    slug: "linkedin-post-size",
    category: "use-case",
    seo: {
      title: "Tamaño de Publicación de LinkedIn — 1200x628 | ImgSplit",
      description: "Redimensiona una imagen al tamaño de publicación de LinkedIn de 1200x628 y exporta tamaños sociales complementarios en un flujo privado del navegador, sin subir archivos.",
      ogTitle: "Exportador de Tamaño de Publicación de LinkedIn",
      ogDescription: "Crea imágenes de publicación de LinkedIn de 1200x628.",
    },
    hero: {
      overline: "Tamaño de publicación de LinkedIn",
      headlinePart1: "Exporta ",
      headlineAccent: "Posts de LinkedIn",
      headlinePart2: "",
      description: "Crea una imagen de publicación de LinkedIn de 1200x628 desde cualquier archivo y exporta opcionalmente piezas complementarias para Instagram, YouTube, Facebook o X.",
    },
    scenarios: [
      { icon: "Share2", title: "Publicaciones profesionales", description: "Prepara imágenes de anuncios, lanzamientos y artículos para el feed de LinkedIn." },
      { icon: "Layers", title: "Piezas multicanal", description: "Mantén el mismo visual listo para LinkedIn y otras plataformas en una sola exportación." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube una imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
      { stepNumber: 2, title: "Elige tamaños", description: "Selecciona salidas para Instagram, YouTube, Facebook, X/Twitter, LinkedIn o TikTok." },
      { stepNumber: 3, title: "Exporta ZIP", description: "Ajusta recortes, elige formato y descarga un ZIP por plataforma." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño de publicación de LinkedIn exporta?", answer: "El preajuste de LinkedIn exporta 1200 x 628 píxeles." },
      { question: "¿Puedo cambiar el recorte?", answer: "Sí. Selecciona la salida de LinkedIn y ajusta relleno, encaje, escala y posición." },
      { question: "¿Funciona sin subir archivos?", answer: "Sí. La imagen permanece en tu navegador." },
    ],
    relatedTools: [
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
      { slug: "/resize", title: "Redimensionar imagen", description: "Crea un recorte personalizado o un tamaño puntual." },
      { slug: "/compress", title: "Compresor de imágenes", description: "Comprime los archivos finales para subirlos más rápido." },
    ],
  },

  "twitter-header-size": {
    slug: "twitter-header-size",
    category: "use-case",
    seo: {
      title: "Tamaño de Encabezado de Twitter — X Header 1500x500 | ImgSplit",
      description: "Crea un encabezado de Twitter/X de 1500x500 desde una sola imagen con control del recorte y exportación privada en el navegador. Sin subir archivos y con salida en ZIP.",
      ogTitle: "Exportador de Encabezados de Twitter/X",
      ogDescription: "Crea encabezados de X/Twitter de 1500x500.",
    },
    hero: {
      overline: "Tamaño de encabezado de Twitter",
      headlinePart1: "Exporta ",
      headlineAccent: "1500x500",
      headlinePart2: "Encabezados",
      description: "Recorta cualquier imagen como encabezado de perfil de X/Twitter de 1500x500 y exporta tamaños sociales relacionados desde la misma fuente.",
    },
    scenarios: [
      { icon: "Maximize2", title: "Encabezados de perfil", description: "Crea un recorte horizontal con el sujeto centrado y alejado de los bordes." },
      { icon: "Package", title: "ZIP social", description: "Añade formatos de post, miniatura y feed al mismo ZIP organizado cuando lo necesites." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Sube una imagen", description: "Añade PNG, JPEG o WebP. El archivo permanece en tu navegador." },
      { stepNumber: 2, title: "Elige tamaños", description: "Selecciona salidas para Instagram, YouTube, Facebook, X/Twitter, LinkedIn o TikTok." },
      { stepNumber: 3, title: "Exporta ZIP", description: "Ajusta recortes, elige formato y descarga un ZIP por plataforma." },
    ],
    faqEntries: [
      { question: "¿Qué tamaño de encabezado de Twitter/X usa?", answer: "El preajuste de encabezado exporta 1500 x 500 píxeles." },
      { question: "¿Puedo exportar también imágenes de post de X?", answer: "Sí. Mantén seleccionado el preajuste de post horizontal de X o elige el paquete con todos los preajustes." },
      { question: "¿Puedo usar JPEG?", answer: "Sí. Elige PNG, JPEG o WebP antes de exportar." },
    ],
    relatedTools: [
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
      { slug: "/resize", title: "Redimensionar imagen", description: "Crea un recorte personalizado o un tamaño puntual." },
      { slug: "/compress", title: "Compresor de imágenes", description: "Comprime los archivos finales para subirlos más rápido." },
    ],
  },

  "canva-image-splitter": {
    slug: "canva-image-splitter",
    category: "use-case",
    seo: {
      title: "Divisor de Imágenes de Canva — Divide Diseños en Carrusel | ImgSplit",
      description: "Exporta tu diseño de Canva como PNG o JPEG y divídelo en paneles de carrusel directamente en tu navegador. Gratis, privado y sin registro.",
      ogTitle: "Divisor de Imágenes de Canva",
      ogDescription: "Divide exportaciones de Canva en paneles de carrusel al instante.",
    },
    hero: {
      overline: "Divisor de carrusel para Canva",
      headlinePart1: "Divide diseños de Canva en ",
      headlineAccent: "Paneles de Carrusel",
      headlinePart2: "",
      description: "Exporta tu diseño de Canva como imagen plana, súbelo aquí y divídelo en paneles de carrusel perfectamente alineados para Instagram, LinkedIn o TikTok. Sin plugins.",
    },
    scenarios: [
      { icon: "Layers2", title: "Flujo de carrusel con Canva", description: "Exporta un lienzo largo de Canva como una sola imagen y córtalo en diapositivas de carrusel numeradas." },
      { icon: "Columns", title: "Paneles alineados sin cortes", description: "Cada borde de panel encaja a la perfección para que el carrusel parezca una imagen continua." },
      { icon: "Download", title: "ZIP numerado", description: "Recibe los paneles numerados en orden: solo súbelos en secuencia como diapositivas del carrusel." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Exporta desde Canva", description: "En Canva, descarga tu diseño como PNG o JPEG a tamaño completo." },
      { stepNumber: 2, title: "Sube y define los paneles", description: "Arrastra la imagen exportada aquí y elige en cuántos paneles dividirla." },
      { stepNumber: 3, title: "Descarga y publica", description: "Exporta el ZIP con paneles numerados y sube las diapositivas a tu carrusel en orden." },
    ],
    faqEntries: [
      { question: "¿Cómo exporto un diseño de Canva para dividirlo en carrusel?", answer: "En Canva, ve a Compartir → Descargar y elige PNG o JPEG. Luego sube ese archivo aquí para dividirlo en paneles de carrusel." },
      { question: "¿Funciona con diseños de varias páginas de Canva?", answer: "Esta herramienta divide una sola imagen plana. Para diseños de varias páginas, exporta cada página por separado o únelas primero en una imagen larga." },
      { question: "¿Los paneles quedarán perfectamente alineados?", answer: "Sí. El divisor corta en límites exactos de píxel, así que los paneles adyacentes comparten un borde limpio." },
      { question: "¿Necesito una cuenta de Canva para usarlo?", answer: "No. Esta herramienta es independiente. Solo necesitas un archivo PNG o JPEG, de Canva o de cualquier otro lugar." },
    ],
    relatedTools: [
      { slug: "/grid", title: "Divisor de cuadrícula", description: "Divide una imagen en una cuadrícula uniforme de mosaicos." },
      { slug: "/collage", title: "Creador de collage", description: "Combina varias imágenes en un único diseño de collage." },
      { slug: "/social-export", title: "Exportación social", description: "Genera varios tamaños sociales desde una imagen." },
    ],
  },

}

export default data
