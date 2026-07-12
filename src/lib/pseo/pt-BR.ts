import type { ToolPageData } from "./types"

const data: Record<string, ToolPageData> = {
  "split-in-half": {
    slug: "split-in-half",
    category: "direction",
    seo: {
      title: "Dividir Imagem ao Meio Online — Divisor 50/50 Grátis | ImgSplit",
      description: "Divida qualquer imagem ao meio na hora — na horizontal ou na vertical. Ferramenta online gratuita com precisão de pixel, sem upload para servidores, 100% no navegador.",
      ogTitle: "Dividir Imagem ao Meio — Ferramenta Online Grátis",
      ogDescription: "Divida qualquer foto em duas metades iguais com um clique. Sem upload, direto no navegador.",
    },
    hero: {
      overline: "Ferramenta de Divisão de Imagem",
      headlinePart1: "Divida a Imagem",
      headlineAccent: "ao Meio",
      headlinePart2: "— na Hora",
      description: "Divida qualquer imagem em duas partes iguais — na horizontal ou na vertical. Precisão de pixel, zero perda de qualidade, tudo no seu navegador.",
    },
    scenarios: [
      {
        icon: "Columns2",
        title: "Comparações Antes e Depois",
        description: "Separe imagens de comparação em arquivos individuais para apresentações lado a lado, demonstrações de produto ou documentação de testes A/B.",
      },
      {
        icon: "Smartphone",
        title: "Capas Divididas para Redes Sociais",
        description: "Divida um banner largo em duas metades para publicações duplas nas redes sociais que criam um efeito panorâmico contínuo.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Arraste e solte ou clique para enviar a imagem que você quer dividir ao meio." },
      { stepNumber: 2, title: "Posicione a Linha de Corte", description: "Adicione uma única linha horizontal ou vertical no centro para dividir a imagem em duas partes iguais." },
      { stepNumber: 3, title: "Baixe as Duas Metades", description: "Visualize as duas metades e baixe cada uma individualmente ou em um arquivo ZIP." },
    ],
    faqEntries: [
      { question: "Posso dividir uma imagem em duas partes desiguais?", answer: "Sim. A ferramenta posiciona a linha no centro por padrão, mas você pode arrastá-la para qualquer posição e criar metades desiguais — por exemplo, uma divisão 30/70." },
      { question: "Dividir ao meio reduz a qualidade da imagem?", answer: "Não. Cada metade mantém a resolução e os pixels originais. Não há compressão nem redimensionamento no processo." },
      { question: "Posso dividir na horizontal e na vertical ao mesmo tempo?", answer: "Claro. Adicione uma linha horizontal e uma vertical para dividir a imagem em quatro quadrantes em vez de duas metades." },
    ],
    relatedTools: [
      { slug: "/split-horizontally", title: "Dividir na Horizontal", description: "Divida imagens com linhas horizontais em seções superior e inferior." },
      { slug: "/split-vertically", title: "Dividir na Vertical", description: "Divida imagens com linhas verticais em seções esquerda e direita." },
      { slug: "/split-into-equal-parts", title: "Divisor em Partes Iguais", description: "Divida imagens em vários segmentos iguais em qualquer direção." },
      { slug: "/", title: "Divisor de Imagens", description: "Divisor completo com linhas de corte de arrastar e soltar." },
    ],
  },

  "split-horizontally": {
    slug: "split-horizontally",
    category: "direction",
    seo: {
      title: "Dividir Imagem Horizontalmente Online — Grátis | ImgSplit",
      description: "Divida imagens na horizontal em seções superior e inferior. Adicione várias linhas horizontais para cortes precisos em faixas. Grátis, no navegador, sem upload.",
      ogTitle: "Dividir Imagem Horizontalmente — Cortador Online Grátis",
      ogDescription: "Adicione linhas horizontais para dividir imagens em faixas. Grátis e direto no navegador.",
    },
    hero: {
      overline: "Divisão Horizontal",
      headlinePart1: "Divida Imagens",
      headlineAccent: "Horizontalmente",
      headlinePart2: "— Faixa por Faixa",
      description: "Adicione linhas de corte horizontais para dividir qualquer imagem em seções superior e inferior, tiras ou faixas. Perfeito para fatiar imagens altas ou criar segmentos horizontais.",
    },
    scenarios: [
      {
        icon: "LayoutList",
        title: "Fatiar Imagens Longas de Produto",
        description: "Divida imagens altas de produtos de e-commerce em seções horizontais menores para carregamento otimizado e exibição organizada.",
      },
      {
        icon: "FileText",
        title: "Segmentar Documentos Digitalizados",
        description: "Divida documentos digitalizados com várias seções — recibos, notas fiscais ou formulários — em tiras horizontais individuais para arquivamento separado.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Solte ou selecione qualquer imagem — PNG, JPG ou WebP de até 20 MB." },
      { stepNumber: 2, title: "Adicione Linhas Horizontais", description: "Clique em 'Adicionar Linha Horizontal' para inserir uma ou mais linhas de corte. Arraste cada linha até a posição exata." },
      { stepNumber: 3, title: "Baixe as Faixas", description: "Visualize cada faixa horizontal e baixe tudo de uma vez em ZIP ou escolha faixas específicas." },
    ],
    faqEntries: [
      { question: "Quantas linhas horizontais posso adicionar?", answer: "Você pode adicionar até 20 linhas de corte horizontais, criando até 21 faixas a partir de uma única imagem." },
      { question: "Posso combinar linhas horizontais e verticais?", answer: "Sim. Usar as duas cria uma grade — para faixas puramente horizontais, adicione apenas linhas horizontais." },
      { question: "Existe encaixe automático para posicionamento preciso?", answer: "Sim. As linhas de corte se alinham automaticamente às bordas próximas e à linha central, ajudando você a posicioná-las com precisão de pixel." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir ao Meio", description: "Divida uma imagem em duas partes iguais com uma única linha." },
      { slug: "/split-vertically", title: "Dividir na Vertical", description: "Corte imagens com linhas verticais em colunas esquerda e direita." },
      { slug: "/split-long-screenshot", title: "Divisor de Print Longo", description: "Divida capturas de tela longas em segmentos legíveis do tamanho de uma página." },
      { slug: "/grid", title: "Divisor em Grade", description: "Divida imagens em blocos de grade 3×3, 1×3 ou 2×2." },
    ],
  },

  "split-vertically": {
    slug: "split-vertically",
    category: "direction",
    seo: {
      title: "Dividir Imagem Verticalmente Online — Grátis | ImgSplit",
      description: "Divida imagens na vertical em colunas esquerda e direita. Adicione várias linhas verticais para cortes em colunas. Grátis, privado, roda no navegador.",
      ogTitle: "Dividir Imagem Verticalmente — Cortador de Colunas Grátis",
      ogDescription: "Adicione linhas verticais para dividir imagens em colunas. No navegador e com privacidade.",
    },
    hero: {
      overline: "Divisão Vertical",
      headlinePart1: "Divida Imagens",
      headlineAccent: "Verticalmente",
      headlinePart2: "— Coluna por Coluna",
      description: "Posicione linhas de corte verticais para dividir qualquer imagem em seções esquerda e direita, colunas ou tiras verticais. Ideal para imagens largas e layouts com várias colunas.",
    },
    scenarios: [
      {
        icon: "Columns3",
        title: "Tirinhas e Quadrinhos",
        description: "Separe quadros de tirinhas ou storyboards dispostos lado a lado em painéis verticais individuais.",
      },
      {
        icon: "LayoutDashboard",
        title: "Colunas de Capturas de Dashboards",
        description: "Extraia colunas específicas de capturas largas de dashboards ou planilhas para relatórios e apresentações focados.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Envie a imagem larga ou panorâmica que você quer dividir em colunas verticais." },
      { stepNumber: 2, title: "Adicione Linhas Verticais", description: "Insira uma ou mais linhas de corte verticais e arraste-as para definir os limites das colunas." },
      { stepNumber: 3, title: "Baixe as Colunas", description: "Revise cada coluna e baixe individualmente ou exporte tudo em um arquivo ZIP." },
    ],
    faqEntries: [
      { question: "Qual é o número máximo de divisões verticais?", answer: "Até 20 linhas verticais, produzindo no máximo 21 colunas a partir de uma única imagem." },
      { question: "Dividir uma panorâmica perde pixels nas bordas?", answer: "Não. A ferramenta usa limites exatos de pixel — nenhum pixel é perdido ou borrado nas bordas do corte." },
      { question: "Posso dividir verticalmente uma imagem em retrato?", answer: "Sim, embora as divisões verticais funcionem melhor em imagens de paisagem ou largas. Imagens em retrato vão gerar tiras verticais estreitas." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir ao Meio", description: "Uma linha, duas partes iguais — o jeito mais simples de dividir uma imagem." },
      { slug: "/split-horizontally", title: "Dividir na Horizontal", description: "Corte imagens em faixas e tiras horizontais." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divida imagens largas em blocos para carrosséis do Instagram." },
      { slug: "/grid", title: "Divisor em Grade", description: "Crie blocos em grade 3×3 ou personalizada a partir de qualquer imagem." },
    ],
  },

  "split-into-equal-parts": {
    slug: "split-into-equal-parts",
    category: "direction",
    seo: {
      title: "Dividir Imagem em Partes Iguais — Online e Grátis | ImgSplit",
      description: "Divida qualquer imagem em partes iguais — 2, 3, 4 ou mais segmentos. Ferramenta online gratuita com alinhamento automático para cortes uniformes. Sem upload.",
      ogTitle: "Dividir Imagem em Partes Iguais — Ferramenta Grátis",
      ogDescription: "Divida imagens em segmentos perfeitamente iguais com linhas de corte alinhadas automaticamente.",
    },
    hero: {
      overline: "Divisor em Partes Iguais",
      headlinePart1: "Divida em",
      headlineAccent: "Partes Iguais",
      headlinePart2: "— com Precisão",
      description: "Divida qualquer imagem em 2, 3, 4 ou mais segmentos perfeitamente iguais. O alinhamento automático garante cortes uniformes com precisão de pixel.",
    },
    scenarios: [
      {
        icon: "Grid2X2",
        title: "Quebra-Cabeças e Colagens",
        description: "Divida uma imagem em blocos iguais para criar quebra-cabeças, materiais educativos ou peças prontas para colagem.",
      },
      {
        icon: "Printer",
        title: "Blocos Uniformes para Impressão",
        description: "Divida uma imagem grande em blocos de impressão do mesmo tamanho para que cada parte caiba em folhas padrão e a montagem fique perfeita.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Selecione a imagem que você quer dividir em seções iguais." },
      { stepNumber: 2, title: "Adicione Linhas Uniformes", description: "Adicione linhas horizontais ou verticais. Use o alinhamento automático para distribuí-las uniformemente pela imagem." },
      { stepNumber: 3, title: "Baixe os Segmentos Iguais", description: "Confira se todas as partes estão iguais e baixe cada segmento ou o conjunto completo em ZIP." },
    ],
    faqEntries: [
      { question: "Como garantir que as partes fiquem perfeitamente iguais?", answer: "Use o alinhamento automático — as linhas se encaixam em posições de intervalos iguais. Para dividir em 3 partes, adicione 2 linhas e elas se alinham nas marcas de 1/3 e 2/3." },
      { question: "Posso criar uma grade de retângulos iguais?", answer: "Sim. Adicione linhas horizontais e verticais equidistantes para criar uma grade de retângulos idênticos — perfeito para fluxos de trabalho baseados em blocos." },
      { question: "O que acontece se as dimensões da imagem não forem divisíveis por igual?", answer: "O último segmento pode variar em um pixel. A ferramenta distribui os pixels da forma mais uniforme possível para minimizar qualquer diferença de tamanho." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir ao Meio", description: "A divisão igual mais simples — divida uma imagem em exatamente duas metades." },
      { slug: "/split-for-print", title: "Divisor para Impressão", description: "Divida imagens grandes em blocos no tamanho de folhas padrão." },
      { slug: "/no-photoshop-slicer", title: "Fatiador sem Photoshop", description: "Uma alternativa gratuita à ferramenta de fatias do Photoshop para dividir imagens rapidamente." },
      { slug: "/grid", title: "Divisor em Grade", description: "Layouts de grade predefinidos: 3×3, 1×3 e 2×2." },
    ],
  },

  "split-long-screenshot": {
    slug: "split-long-screenshot",
    category: "use-case",
    seo: {
      title: "Dividir Print Longo em Páginas — Ferramenta Grátis | ImgSplit",
      description: "Divida capturas de tela longas em segmentos do tamanho de uma página para compartilhar e ler com facilidade. Grátis, no navegador, sem upload, funciona com qualquer imagem alta.",
      ogTitle: "Dividir Prints Longos — Divisor de Páginas Grátis",
      ogDescription: "Transforme prints longos em partes legíveis do tamanho de uma página. Sem upload.",
    },
    hero: {
      overline: "Divisor de Imagens Longas",
      headlinePart1: "Divida Prints",
      headlineAccent: "Longos",
      headlinePart2: "em Páginas",
      description: "Transforme capturas de tela longas em segmentos do tamanho de uma página, fáceis de compartilhar, ler e arquivar. Funciona com qualquer imagem alta.",
    },
    scenarios: [
      {
        icon: "MessageSquare",
        title: "Arquivo de Conversas",
        description: "Divida prints de conversas inteiras de aplicativos de mensagens em imagens do tamanho da tela para armazenar de forma organizada e compartilhar só o que quiser.",
      },
      {
        icon: "FileSearch",
        title: "Documentação de Páginas Web",
        description: "Divida capturas longas de páginas em seções digeríveis para relatórios de bugs, revisões de design ou documentação de conformidade.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie o Print Longo", description: "Envie sua captura de tela longa — a ferramenta aceita imagens de qualquer altura." },
      { stepNumber: 2, title: "Posicione as Quebras", description: "Adicione linhas horizontais onde quiser as quebras de página. Use o alinhamento automático para um espaçamento uniforme." },
      { stepNumber: 3, title: "Baixe os Segmentos", description: "Visualize cada segmento e baixe todas as páginas em um ZIP para compartilhar com facilidade." },
    ],
    faqEntries: [
      { question: "Existe uma altura máxima para prints longos?", answer: "A ferramenta aceita arquivos de até 20 MB. Imagens muito altas (acima de 10.000 px) podem demorar um pouco mais para processar, mas são totalmente suportadas." },
      { question: "Posso dividir um print em segmentos de altura igual?", answer: "Sim. Adicione várias linhas horizontais e use o alinhamento automático para espaçá-las por igual, criando segmentos com a mesma altura de página." },
      { question: "O texto do meu print continua nítido depois da divisão?", answer: "Com certeza. A ferramenta recorta na resolução original, sem redimensionar, então o texto permanece nítido e legível." },
    ],
    relatedTools: [
      { slug: "/split-horizontally", title: "Divisor Horizontal", description: "Adicione linhas horizontais para dividir qualquer imagem em faixas." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divida imagens em slides de carrossel com várias telas." },
      { slug: "/split-for-wechat", title: "Divisor de Grade para Redes Sociais", description: "Divida imagens em blocos de grade para perfis de redes sociais." },
      { slug: "/", title: "Divisor de Imagens", description: "Divisor completo com linhas de arrastar e soltar." },
    ],
  },

  "split-for-instagram": {
    slug: "split-for-instagram",
    category: "use-case",
    seo: {
      title: "Divisor de Imagens para Instagram — Carrossel e Grade | ImgSplit",
      description: "Divida imagens para carrosséis e grades de perfil do Instagram em 1080 x 1080 px. Grátis, no navegador, sem upload e sem marca d'água.",
      ogTitle: "Divisor para Instagram — Carrossel e Grade Grátis",
      ogDescription: "Divida imagens em blocos prontos para o Instagram. Otimizado para posts de 1080×1080 px.",
    },
    hero: {
      overline: "Divisor para Instagram",
      headlinePart1: "Divida para o",
      headlineAccent: "Instagram",
      headlinePart2: "— Carrossel e Grade",
      description: "Crie slides de carrossel e layouts de grade incríveis para o Instagram dividindo suas imagens em blocos do tamanho perfeito. Otimizado para as dimensões nativas do Instagram.",
    },
    platformInfo: "Tamanho recomendado de post no Instagram: 1080 × 1080 px (quadrado 1:1). O carrossel aceita até 10 slides.",
    scenarios: [
      {
        icon: "LayoutGrid",
        title: "Grade de Perfil Contínua",
        description: "Divida uma única imagem larga em 3, 6 ou 9 blocos que criam um efeito panorâmico contínuo na grade do seu perfil do Instagram.",
      },
      {
        icon: "GalleryHorizontal",
        title: "Slides de Carrossel",
        description: "Divida uma foto panorâmica ou um infográfico em slides deslizáveis que contam uma história visual em vários quadros.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Envie a imagem ou panorâmica que você quer dividir para o Instagram." },
      { stepNumber: 2, title: "Monte sua Grade", description: "Adicione linhas verticais para slides de carrossel ou crie uma grade para o layout do perfil. Use o alinhamento automático para um espaçamento igual." },
      { stepNumber: 3, title: "Baixe os Blocos Prontos para o Instagram", description: "Baixe todos os blocos em um ZIP. Publique-os no Instagram na ordem indicada para um resultado contínuo." },
    ],
    faqEntries: [
      { question: "Qual deve ser o tamanho de cada bloco do Instagram?", answer: "O Instagram exibe posts em 1080×1080 px (quadrado). Para carrosséis, cada slide deve ter 1080 px de largura. A ferramenta permite dividir em qualquer ponto." },
      { question: "Quantos slides um carrossel do Instagram pode ter?", answer: "O Instagram permite até 10 slides por carrossel. Divida sua imagem em 2 a 10 segmentos verticais para criar uma panorâmica deslizável." },
      { question: "Os blocos ficam na ordem certa de publicação?", answer: "Sim. Os blocos são numerados da esquerda para a direita (divisões verticais) ou de cima para baixo (divisões horizontais), seguindo a ordem de upload do Instagram." },
    ],
    relatedTools: [
      { slug: "/split-into-equal-parts", title: "Divisor em Partes Iguais", description: "Divida imagens em segmentos perfeitamente iguais para qualquer plataforma." },
      { slug: "/split-long-screenshot", title: "Divisor de Print Longo", description: "Divida imagens altas em segmentos fáceis de compartilhar." },
      { slug: "/split-for-wechat", title: "Divisor de Grade para Redes Sociais", description: "Divida imagens em blocos de grade para perfis de redes sociais." },
      { slug: "/grid", title: "Divisor em Grade", description: "Divisões rápidas em grade 3×3 otimizadas para redes sociais." },
    ],
  },

  "split-for-wechat": {
    slug: "split-for-wechat",
    category: "use-case",
    seo: {
      title: "Dividir Imagens em Grade para Redes Sociais — Grátis | ImgSplit",
      description: "Divida imagens em blocos de grade para perfis de redes sociais. Crie grades 3x3, 2x2 ou personalizadas para Instagram, Facebook e mais. Grátis, no navegador.",
      ogTitle: "Divisor de Grade para Redes Sociais — Ferramenta Grátis",
      ogDescription: "Divida imagens em blocos de grade para redes sociais. Grátis e no navegador.",
    },
    hero: {
      overline: "Divisor de Grade para Redes Sociais",
      headlinePart1: "Divida Imagens",
      headlineAccent: "em Grades Sociais",
      headlinePart2: "— Destaque-se Online",
      description: "Crie layouts de grade impressionantes para o seu perfil. Divida qualquer imagem em blocos do tamanho perfeito para Instagram, Facebook e outras plataformas.",
    },
    scenarios: [
      {
        icon: "Share2",
        title: "Grades de Perfil",
        description: "Divida uma única imagem em blocos 3x3 ou 2x2 que formam um mosaico contínuo no seu perfil, criando um impacto visual marcante.",
      },
      {
        icon: "Maximize2",
        title: "Narrativas em Vários Posts",
        description: "Divida uma panorâmica ou um infográfico em blocos sequenciais que contam uma história visual em vários posts, em qualquer rede social.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Envie a foto que você quer dividir em blocos de grade para redes sociais." },
      { stepNumber: 2, title: "Crie sua Grade", description: "Adicione linhas horizontais e verticais para definir o layout. Use o alinhamento automático para grades 3x3, 2x2 ou personalizadas perfeitamente uniformes." },
      { stepNumber: 3, title: "Baixe e Publique", description: "Baixe todos os blocos em um ZIP e publique-os em ordem na sua rede social para um resultado contínuo." },
    ],
    faqEntries: [
      { question: "Qual tamanho de grade funciona melhor para perfis de redes sociais?", answer: "A grade 3x3 (9 blocos) é a escolha mais popular para a estética de perfis no Instagram e Facebook. Para layouts mais simples, a grade 2x2 também funciona muito bem." },
      { question: "Preciso publicar os blocos em uma ordem específica?", answer: "Sim. Os blocos são numerados da esquerda para a direita, de cima para baixo. Publique-os em ordem inversa (último bloco primeiro) para que apareçam corretamente na grade do perfil." },
      { question: "Os blocos vão se alinhar perfeitamente no meu perfil?", answer: "Sim — a ferramenta divide em limites exatos de pixel, sem perda de qualidade, então os blocos se encaixam perfeitamente quando vistos no seu perfil." },
    ],
    relatedTools: [
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divida imagens especificamente para carrosséis e grades do Instagram." },
      { slug: "/split-long-screenshot", title: "Divisor de Print Longo", description: "Divida capturas altas em segmentos do tamanho de uma página." },
      { slug: "/", title: "Divisor de Imagens", description: "Divisor completo com linhas de corte personalizadas." },
      { slug: "/grid", title: "Divisor em Grade", description: "Divisões rápidas predefinidas: 3×3, 1×3, 2×2." },
    ],
  },

  "split-for-print": {
    slug: "split-for-print",
    category: "use-case",
    seo: {
      title: "Dividir Imagem para Impressão — Blocos Grátis | ImgSplit",
      description: "Divida imagens grandes em blocos imprimíveis que cabem em folhas padrão. Imprima e monte pôsteres, banners e artes em grande formato. Grátis, no navegador.",
      ogTitle: "Dividir Imagem para Impressão — Ferramenta Grátis",
      ogDescription: "Divida imagens grandes em blocos do tamanho de folhas para imprimir e montar.",
    },
    hero: {
      overline: "Divisor para Impressão",
      headlinePart1: "Divida para",
      headlineAccent: "Impressão",
      headlinePart2: "— Imprima e Monte",
      description: "Divida imagens grandes em blocos do tamanho de uma folha para imprimir em papel comum e montar pôsteres, banners ou quadros de parede.",
    },
    scenarios: [
      {
        icon: "Image",
        title: "Pôster Faça Você Mesmo",
        description: "Transforme qualquer imagem em alta resolução em um pôster de várias páginas — divida em blocos A4 ou Carta, imprima em casa e junte as partes para um resultado em grande formato.",
      },
      {
        icon: "Ruler",
        title: "Plantas e Projetos Técnicos",
        description: "Divida desenhos técnicos ou plantas baixas grandes em seções imprimíveis para que cada página mostre uma parte gerenciável do projeto.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie a Imagem Grande", description: "Envie a imagem em alta resolução, o pôster ou a planta que você quer imprimir em blocos." },
      { stepNumber: 2, title: "Defina os Blocos", description: "Adicione linhas de corte uniformes para criar blocos que combinem com o tamanho do papel. Use o alinhamento automático para um espaçamento uniforme." },
      { stepNumber: 3, title: "Imprima e Monte", description: "Baixe todos os blocos, imprima cada um em uma página e monte-os para reconstruir a imagem completa." },
    ],
    faqEntries: [
      { question: "Qual tamanho de papel devo usar para os blocos?", answer: "Para impressoras domésticas, A4 (210×297 mm) ou Carta (8,5×11 pol) são os padrões. Calcule o número de blocos com base na proporção da imagem e no tamanho final desejado." },
      { question: "A ferramenta adiciona margens de sobreposição para a montagem?", answer: "A ferramenta divide em limites exatos de pixel. Para margens de sobreposição, aumente ligeiramente o número de blocos para que as peças adjacentes compartilhem uma faixa fina de alinhamento." },
      { question: "Posso dividir uma imagem de altíssima resolução (ex.: 8000×6000)?", answer: "Sim. A ferramenta aceita imagens de até 20 MB. Para arquivos de resolução extrema, considere usar o formato WebP para reduzir o tamanho do arquivo." },
    ],
    relatedTools: [
      { slug: "/split-into-equal-parts", title: "Divisor em Partes Iguais", description: "Divida imagens em segmentos perfeitamente iguais para blocos uniformes." },
      { slug: "/split-horizontally", title: "Divisor Horizontal", description: "Divida imagens em faixas para impressão em tiras." },
      { slug: "/no-photoshop-slicer", title: "Fatiador sem Photoshop", description: "Uma alternativa online gratuita ao fluxo de fatiar e exportar do Photoshop." },
      { slug: "/", title: "Divisor de Imagens", description: "Divisão completa de imagens com linhas personalizadas." },
    ],
  },

  "no-photoshop-slicer": {
    slug: "no-photoshop-slicer",
    category: "use-case",
    seo: {
      title: "Fatiador de Imagens Online Grátis — Sem Photoshop | ImgSplit",
      description: "Uma alternativa gratuita à ferramenta de fatias do Photoshop. Divida imagens em regiões sem instalar nenhum software. No navegador, privado e instantâneo.",
      ogTitle: "Fatiador de Imagens sem Photoshop — Ferramenta Grátis",
      ogDescription: "Dispense o Photoshop. Fatie imagens em regiões na hora, direto no navegador.",
    },
    hero: {
      overline: "Fatiador sem Photoshop",
      headlinePart1: "Fatiador de Imagens",
      headlineAccent: "sem Photoshop",
      headlinePart2: "— Nada para Instalar",
      description: "Dispense assinaturas caras de software. Divida e fatie imagens em qualquer layout com linhas de arrastar e soltar — totalmente grátis, direto no navegador.",
    },
    scenarios: [
      {
        icon: "DollarSign",
        title: "Economize a Assinatura",
        description: "Tenha fatias de imagem com qualidade de Photoshop sem pagar a assinatura mensal do Creative Cloud — grátis e acessível para todos.",
      },
      {
        icon: "GraduationCap",
        title: "Fluxo Amigável para Iniciantes",
        description: "Sem camadas, sem barras de ferramentas, sem curva de aprendizado. Basta arrastar as linhas onde quer cortar e baixar as partes — qualquer pessoa consegue em segundos.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Arraste e solte ou clique para enviar. Sem conta, sem instalar nenhum software." },
      { stepNumber: 2, title: "Arraste as Linhas de Corte", description: "Adicione linhas horizontais e verticais para definir as regiões de fatia. O alinhamento automático garante a precisão." },
      { stepNumber: 3, title: "Exporte as Fatias", description: "Baixe todas as regiões fatiadas em um ZIP — prontas para web, redes sociais ou qualquer outro uso." },
    ],
    faqEntries: [
      { question: "É realmente tão preciso quanto a ferramenta de fatias do Photoshop?", answer: "Sim. A ferramenta divide em limites exatos de pixel com alinhamento automático — você tem a mesma precisão de pixel sem a complexidade." },
      { question: "Posso fatiar imagens para templates de e-mail em HTML?", answer: "Com certeza. Fatie o design do e-mail em seções, exporte cada região e referencie-as no seu template HTML para layouts de e-mail perfeitos." },
      { question: "Preciso criar uma conta?", answer: "Não. A ferramenta é totalmente gratuita e não exige cadastro. Abra a página, envie, fatie e baixe — só isso." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir ao Meio", description: "A divisão mais simples — qualquer imagem em duas partes iguais." },
      { slug: "/split-for-print", title: "Divisor para Impressão", description: "Divida imagens grandes em blocos imprimíveis do tamanho de uma página." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divida imagens para carrosséis e grades do Instagram." },
      { slug: "/", title: "Divisor de Imagens", description: "Ferramenta completa de divisão com arrastar e soltar." },
    ],
  },

  "photo-splitter": {
    slug: "photo-splitter",
    category: "use-case",
    seo: {
      title: "Divisor de Fotos Online — Grátis | ImgSplit",
      description: "Divisor de fotos online gratuito — divida qualquer foto em várias partes com precisão de arrastar e soltar. Sem upload para servidores, 100% no navegador, funciona em qualquer dispositivo.",
      ogTitle: "Divisor de Fotos — Ferramenta Online Grátis",
      ogDescription: "Divida qualquer foto em várias partes na hora. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Ferramenta de Divisão de Fotos",
      headlinePart1: "Divisor de",
      headlineAccent: "Fotos",
      headlinePart2: "— Grátis e Instantâneo",
      description: "Divida qualquer foto em várias partes com precisão de pixel. Linhas de arrastar e soltar, alinhamento automático e download imediato — tudo no seu navegador.",
    },
    scenarios: [
      {
        icon: "Camera",
        title: "Pós-Produção Fotográfica",
        description: "Divida fotos de grupo, panorâmicas ou composições em seções individuais para editar, compartilhar ou imprimir separadamente.",
      },
      {
        icon: "Smartphone",
        title: "Gestão de Fotos no Celular",
        description: "Divida fotos tiradas no celular em seções — extraia rostos, recorte detalhes ou separe o primeiro plano do fundo.",
      },
      {
        icon: "ShoppingBag",
        title: "Preparação de Fotos de Produto",
        description: "Divida fotos de produto em imagens de detalhe para anúncios de e-commerce — mostre ângulos, recursos ou close-ups a partir de uma única foto original.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Foto", description: "Arraste e solte ou clique para enviar qualquer foto — PNG, JPG ou WebP de até 20 MB." },
      { stepNumber: 2, title: "Posicione as Linhas de Corte", description: "Adicione linhas horizontais ou verticais e arraste-as para dividir a foto exatamente onde quiser." },
      { stepNumber: 3, title: "Visualize e Ajuste", description: "Veja cada parte em tempo real. Faça o ajuste fino das linhas com o alinhamento automático para máxima precisão." },
      { stepNumber: 4, title: "Baixe as Partes", description: "Baixe todas as partes em um arquivo ZIP ou salve seções individuais uma a uma." },
    ],
    faqEntries: [
      { question: "Quais formatos de foto são aceitos?", answer: "Fotos PNG, JPG/JPEG e WebP são aceitas, com tamanho máximo de 20 MB por foto." },
      { question: "Dividir reduz a qualidade da minha foto?", answer: "Não. Cada parte mantém a resolução e os pixels originais. Não há compressão nem redimensionamento — zero perda de qualidade garantida." },
      { question: "Posso dividir uma foto em partes desiguais?", answer: "Sim. Arraste as linhas de corte para qualquer posição e crie partes de tamanhos personalizados. Você não está limitado a divisões iguais." },
      { question: "Existe limite de quantas partes posso criar?", answer: "Você pode adicionar até 20 linhas horizontais e 20 verticais, criando centenas de partes a partir de uma única foto." },
      { question: "Funciona com fotos do celular?", answer: "Sim — funciona com qualquer foto de qualquer dispositivo. A ferramenta roda no navegador do celular também, então você pode dividir fotos direto no smartphone." },
    ],
    relatedTools: [
      { slug: "/split-in-half", title: "Dividir ao Meio", description: "A divisão mais simples — qualquer imagem em duas metades iguais." },
      { slug: "/split-into-equal-parts", title: "Divisor em Partes Iguais", description: "Divida imagens em segmentos perfeitamente iguais." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divida fotos para carrosséis e grades do Instagram." },
      { slug: "/", title: "Divisor de Imagens", description: "Divisão completa de imagens com linhas personalizadas de arrastar e soltar." },
    ],
  },

  "image-cutter": {
    slug: "image-cutter",
    category: "use-case",
    seo: {
      title: "Cortador de Imagem Online — Grátis | ImgSplit",
      description: "Cortador de imagem online gratuito — corte qualquer imagem em partes com controle preciso. Arraste linhas de corte, use o encaixe automático e baixe na hora. Sem upload, 100% no navegador.",
      ogTitle: "Cortador de Imagem Online — Ferramenta Grátis",
      ogDescription: "Corte qualquer imagem em partes com precisão de arrastar e soltar. Grátis e no navegador.",
    },
    hero: {
      overline: "Ferramenta de Corte de Imagem",
      headlinePart1: "Cortador de",
      headlineAccent: "Imagem",
      headlinePart2: "— Corte com Precisão",
      description: "Corte qualquer imagem em várias partes com linhas de arrastar e soltar. Precisão de pixel, alinhamento automático e download imediato — sem instalar nenhum software.",
    },
    scenarios: [
      {
        icon: "Scissors",
        title: "Recursos para Web Design",
        description: "Corte mockups de design em recursos individuais — cabeçalhos, botões, ícones e seções de conteúdo — prontos para implementação em HTML/CSS.",
      },
      {
        icon: "Mail",
        title: "Fatias para Templates de E-mail",
        description: "Corte designs de e-mail em seções de imagem otimizadas para templates HTML que renderizam perfeitamente em todos os clientes de e-mail.",
      },
      {
        icon: "FileImage",
        title: "Extração de Regiões de Documentos",
        description: "Corte regiões específicas de documentos digitalizados, certificados ou capturas de tela — extraia exatamente a seção que precisa sem descartar o resto.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Envie qualquer imagem — PNG, JPG ou WebP. Arraste e solte ou clique para selecionar." },
      { stepNumber: 2, title: "Posicione as Linhas de Corte", description: "Adicione linhas horizontais e verticais. Arraste-as para definir exatamente onde a imagem deve ser dividida." },
      { stepNumber: 3, title: "Baixe as Partes Cortadas", description: "Visualize cada parte e baixe tudo de uma vez em ZIP ou escolha seções individuais." },
    ],
    faqEntries: [
      { question: "Qual é a diferença entre cortar e recortar (crop)?", answer: "O recorte (crop) remove as bordas externas da imagem para manter uma região. O corte divide a imagem inteira em várias partes — nada é descartado, cada pixel é preservado em uma das partes." },
      { question: "Posso cortar uma imagem em formas irregulares?", answer: "A ferramenta usa linhas retas horizontais e verticais, produzindo partes retangulares. Para formas não retangulares, considere usar uma ferramenta de máscara dedicada." },
      { question: "Qual é a precisão das linhas de corte?", answer: "As linhas se encaixam nos limites de pixel e permitem um arrasto refinado. Você pode posicioná-las com precisão de um pixel." },
      { question: "Existe um tamanho máximo de imagem?", answer: "Arquivos de até 20 MB são aceitos. Não há limite de dimensões em pixels, mas imagens muito grandes podem levar um instante para processar." },
    ],
    relatedTools: [
      { slug: "/no-photoshop-slicer", title: "Fatiador sem Photoshop", description: "Uma alternativa gratuita à ferramenta de fatias do Photoshop para dividir imagens rapidamente." },
      { slug: "/split-horizontally", title: "Divisor Horizontal", description: "Corte imagens em faixas e tiras horizontais." },
      { slug: "/split-vertically", title: "Divisor Vertical", description: "Corte imagens em colunas verticais." },
      { slug: "/", title: "Divisor de Imagens", description: "Divisão completa com linhas de arrastar e soltar." },
    ],
  },

  "grid-maker": {
    slug: "grid-maker",
    category: "use-case",
    seo: {
      title: "Criador de Grade de Imagens — Grátis Online | ImgSplit",
      description: "Criador de grade de imagens online gratuito — crie grades 2x2, 3x3, 4x4 ou personalizadas a partir de qualquer imagem. Perfeito para redes sociais, moodboards e colagens. No navegador.",
      ogTitle: "Criador de Grade de Imagens — Ferramenta Grátis",
      ogDescription: "Crie grades de imagem para redes sociais, moodboards e mais. Grátis e no navegador.",
    },
    hero: {
      overline: "Ferramenta de Criação de Grades",
      headlinePart1: "Criador de",
      headlineAccent: "Grade de Imagens",
      headlinePart2: "— Qualquer Layout",
      description: "Crie grades de imagem perfeitas — 2x2, 3x3, 4x4 ou qualquer layout personalizado. Ideal para perfis de redes sociais, moodboards e narrativas visuais.",
    },
    scenarios: [
      {
        icon: "LayoutGrid",
        title: "Perfis em Grade nas Redes Sociais",
        description: "Crie layouts de grade impressionantes que transformam seu perfil em uma galeria visual coesa — cada bloco é parte de uma imagem maior.",
      },
      {
        icon: "Palette",
        title: "Moodboards e Painéis de Inspiração",
        description: "Divida imagens de referência em blocos organizados para moodboards de design, exploração de paletas de cores ou sessões de brainstorming visual.",
      },
      {
        icon: "Presentation",
        title: "Visuais para Apresentações",
        description: "Crie visuais em grade para apresentações — divida infográficos, quadros comparativos ou visualizações de dados em blocos limpos e organizados.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Envie a imagem que você quer dividir em grade. Aceita PNG, JPG e WebP." },
      { stepNumber: 2, title: "Defina sua Grade", description: "Adicione linhas horizontais e verticais uniformes para criar o layout desejado — 2x2, 3x3 ou qualquer configuração personalizada." },
      { stepNumber: 3, title: "Baixe os Blocos da Grade", description: "Visualize todos os blocos e baixe-os em um ZIP. Os blocos são numerados para facilitar a ordenação." },
    ],
    faqEntries: [
      { question: "Quais tamanhos de grade posso criar?", answer: "Qualquer tamanho — de 2x2 a 10x10 e além. Adicione quantas linhas horizontais e verticais precisar (até 20 de cada)." },
      { question: "Os blocos da grade ficam perfeitamente iguais?", answer: "Use o alinhamento automático para distribuir as linhas por igual. As linhas se encaixam em posições de intervalos iguais, gerando blocos perfeitamente uniformes." },
      { question: "Posso criar grades não quadradas, como 2x3 ou 3x4?", answer: "Sim. Adicione números diferentes de linhas horizontais e verticais para criar qualquer layout de grade retangular." },
      { question: "Qual é a melhor grade para o Instagram?", answer: "Uma grade 1x3 (3 blocos verticais) é ótima para carrosséis. Uma grade 3x3 (9 blocos) cria um efeito de mosaico impressionante na página do seu perfil." },
    ],
    relatedTools: [
      { slug: "/grid", title: "Divisor em Grade", description: "Divisões rápidas predefinidas: 3×3, 1×3, 2×2 — otimizadas para redes sociais." },
      { slug: "/split-for-instagram", title: "Divisor para Instagram", description: "Divida imagens especificamente para carrosséis e grades do Instagram." },
      { slug: "/split-into-equal-parts", title: "Divisor em Partes Iguais", description: "Divida imagens em segmentos perfeitamente iguais." },
      { slug: "/split-for-wechat", title: "Grade para Redes Sociais", description: "Divida imagens em blocos de grade para perfis de redes sociais." },
    ],
  },

  "compress-image": {
    slug: "compress-image",
    category: "use-case",
    seo: {
      title: "Comprimir Imagem Online — Grátis e Privado | ImgSplit",
      description: "Comprima imagens online de graça — reduza o tamanho do arquivo mantendo a qualidade visual. No navegador, sem upload para servidores, aceita JPEG, PNG e WebP.",
      ogTitle: "Comprimir Imagem Online — Grátis e Privado",
      ogDescription: "Reduza o tamanho de arquivos de imagem na hora, no navegador. Grátis, privado, sem upload.",
    },
    hero: {
      overline: "Ferramenta de Compressão de Imagem",
      headlinePart1: "Comprima",
      headlineAccent: "Imagens",
      headlinePart2: "— na Hora",
      description: "Reduza o tamanho de arquivos de imagem sem perda visível de qualidade. Aceita JPEG, PNG e WebP — tudo roda no navegador, nada sai do seu dispositivo.",
    },
    scenarios: [
      {
        icon: "Globe",
        title: "Otimização para Web",
        description: "Comprima imagens antes de enviar para o seu site — páginas mais rápidas, melhores Core Web Vitals e melhor posicionamento no Google sem sacrificar a qualidade visual.",
      },
      {
        icon: "Mail",
        title: "Anexos de E-mail",
        description: "Diminua anexos de imagem para caber nos limites de e-mail. Mantenha suas fotos bonitas ficando abaixo do limite de 10 MB ou 25 MB por anexo.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Arraste e solte ou clique para enviar qualquer imagem JPEG, PNG ou WebP que você quer comprimir." },
      { stepNumber: 2, title: "Ajuste a Qualidade", description: "Use o controle de qualidade para equilibrar tamanho de arquivo e qualidade visual. Visualize o resultado em tempo real antes de baixar." },
      { stepNumber: 3, title: "Baixe o Arquivo Comprimido", description: "Baixe sua imagem otimizada — arquivo menor, mesma ótima aparência. Compare os tamanhos antes e depois na hora." },
    ],
    faqEntries: [
      { question: "Comprimir uma imagem reduz a qualidade?", answer: "A compressão reduz o tamanho do arquivo removendo dados redundantes. Em configurações de qualidade acima de 70%, a diferença visual costuma ser imperceptível ao olho humano." },
      { question: "Quais formatos de imagem posso comprimir?", answer: "Você pode comprimir imagens JPEG, PNG e WebP. Para compressão máxima, considere converter para WebP, que oferece a melhor relação entre tamanho e qualidade." },
      { question: "Existe limite de tamanho de arquivo para envio?", answer: "Você pode enviar imagens de até 20 MB. A ferramenta processa tudo no navegador, então arquivos maiores podem levar um pouco mais de tempo." },
    ],
    relatedTools: [
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Compressão especializada de JPEG com controle de qualidade." },
      { slug: "/png-to-webp", title: "PNG para WebP", description: "Converta PNG para WebP para compressão máxima." },
      { slug: "/resize", title: "Redimensionar Imagem", description: "Redimensione imagens para dimensões exatas ou porcentagens." },
      { slug: "/", title: "Divisor de Imagens", description: "Divida imagens em várias partes com linhas de arrastar e soltar." },
    ],
  },

  "compress-jpeg": {
    slug: "compress-jpeg",
    category: "use-case",
    seo: {
      title: "Comprimir JPEG Online — Reduza o Tamanho do JPG | ImgSplit",
      description: "Comprima imagens JPEG e JPG online de graça. Reduza o tamanho do arquivo com controle de qualidade ajustável. No navegador, privado, sem upload para servidores.",
      ogTitle: "Comprimir JPEG Online — Reduza o Tamanho do JPG",
      ogDescription: "Reduza o tamanho de arquivos JPEG com qualidade ajustável. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Compressão de JPEG",
      headlinePart1: "Comprima",
      headlineAccent: "JPEG",
      headlinePart2: "— Reduza o Tamanho",
      description: "Reduza o tamanho de arquivos JPEG e JPG com controle fino de qualidade. Perfeito para fotógrafos, blogueiros e desenvolvedores web que precisam de arquivos menores sem perda visível de qualidade.",
    },
    scenarios: [
      {
        icon: "Camera",
        title: "Fluxo de Trabalho Fotográfico",
        description: "Comprima fotos JPEG em alta resolução da sua câmera para galerias web, provas para clientes ou redes sociais — reduza arquivos de 10 MB para menos de 1 MB mantendo os detalhes.",
      },
      {
        icon: "Globe",
        title: "Imagens de Blog",
        description: "Otimize imagens JPEG para posts e artigos. Carregamento mais rápido significa mais engajamento dos leitores e melhor posicionamento nos buscadores.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu JPEG", description: "Arraste e solte ou selecione o arquivo JPEG/JPG que você quer comprimir." },
      { stepNumber: 2, title: "Defina o Nível de Qualidade", description: "Ajuste o controle de qualidade — valores menores geram arquivos menores. Visualize o resultado para achar o ponto ideal entre tamanho e qualidade." },
      { stepNumber: 3, title: "Baixe o JPEG Comprimido", description: "Salve seu JPEG comprimido. A ferramenta mostra exatamente quanto espaço foi economizado." },
    ],
    faqEntries: [
      { question: "Qual é uma boa configuração de qualidade para comprimir JPEG?", answer: "Para uso na web, 75-85% de qualidade oferece um excelente equilíbrio — normalmente 60-80% de redução no tamanho com diferença visual mínima. Para impressão, mantenha a qualidade em 90% ou mais." },
      { question: "Posso comprimir um JPEG várias vezes?", answer: "Pode, mas cada nova compressão introduz pequenos artefatos. Para melhores resultados, sempre comprima a partir do arquivo original, e não de um JPEG já comprimido." },
      { question: "Qual é a diferença entre JPEG e JPG?", answer: "Nenhuma — JPG e JPEG são o mesmo formato. A extensão '.jpg', mais curta, se popularizou no Windows, que originalmente limitava as extensões a 3 caracteres." },
    ],
    relatedTools: [
      { slug: "/compress-image", title: "Comprimir Imagem", description: "Compressão de imagem de uso geral para qualquer formato." },
      { slug: "/jpg-to-webp", title: "JPG para WebP", description: "Converta JPEG para WebP e obtenha arquivos ainda menores." },
      { slug: "/reduce-image-size", title: "Reduzir Tamanho de Imagem", description: "Otimize qualquer imagem para o menor tamanho de arquivo." },
    ],
  },

  "compress-png": {
    slug: "compress-png",
    category: "use-case",
    seo: {
      title: "Comprimir PNG Online — Reduza o Tamanho do PNG | ImgSplit",
      description: "Comprima imagens PNG online preservando a transparência. Reduza o tamanho do arquivo com compressão sem perdas. Grátis, no navegador, sem upload para servidores.",
      ogTitle: "Comprimir PNG Online — Reduza o Tamanho do PNG",
      ogDescription: "Reduza o tamanho de PNGs mantendo a transparência. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Compressão de PNG",
      headlinePart1: "Comprima",
      headlineAccent: "PNG",
      headlinePart2: "— Mantenha a Transparência",
      description: "Reduza o tamanho de arquivos PNG preservando o suporte total à transparência. Ideal para capturas de interface, recursos de design e gráficos que precisam de canal alfa.",
    },
    scenarios: [
      {
        icon: "Smartphone",
        title: "Capturas de Interface",
        description: "Comprima capturas PNG de ferramentas de design e prints de tela. Reduza o tamanho para carregamento mais rápido em documentação, relatórios de bugs e revisões de design.",
      },
      {
        icon: "Layers",
        title: "Recursos de Design",
        description: "Otimize recursos de design em PNG — ícones, logos e elementos de interface — para web e desenvolvimento de apps preservando bordas nítidas e transparência.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu PNG", description: "Arraste e solte ou selecione o arquivo PNG que você quer comprimir. A transparência é totalmente preservada." },
      { stepNumber: 2, title: "Otimize o PNG", description: "Mantenha a saída em PNG. O ImgSplit recodifica a imagem sem perdas e mantém o arquivo original sempre que a recodificação o deixaria maior." },
      { stepNumber: 3, title: "Baixe o PNG Otimizado", description: "Salve seu PNG comprimido. Transparência, profundidade de cor e qualidade visual são mantidas." },
    ],
    faqEntries: [
      { question: "A compressão remove a transparência do meu PNG?", answer: "Não. O processo de compressão preserva completamente o canal alfa. Seus fundos transparentes permanecem intactos." },
      { question: "Por que arquivos PNG são tão grandes em comparação com JPEG?", answer: "O PNG usa compressão sem perdas, que preserva cada pixel exatamente, além de armazenar dados de transparência. Para fotos sem transparência, converter para JPEG ou WebP gera arquivos bem menores." },
      { question: "Devo converter meu PNG para WebP em vez de comprimir?", answer: "Se você precisa da redução máxima e sua plataforma suporta WebP, a conversão pode reduzir o tamanho em 50-80% em relação ao PNG otimizado, mantendo o suporte à transparência." },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG para WebP", description: "Converta PNG para WebP e obtenha arquivos muito menores com transparência." },
      { slug: "/png-to-jpg", title: "PNG para JPG", description: "Converta PNG para JPEG e obtenha arquivos menores quando não precisar de transparência." },
      { slug: "/compress-image", title: "Comprimir Imagem", description: "Compressão de imagem de uso geral para qualquer formato." },
    ],
  },

  "png-to-webp": {
    slug: "png-to-webp",
    category: "use-case",
    seo: {
      title: "Converter PNG para WebP Online — Grátis e Rápido | ImgSplit",
      description: "Converta imagens PNG para o formato WebP e obtenha arquivos muito menores. Preserva a transparência. Conversor gratuito no navegador, sem upload para servidores.",
      ogTitle: "Converter PNG para WebP — Conversor Online Grátis",
      ogDescription: "Converta PNG para WebP e obtenha arquivos menores com transparência. Grátis e no navegador.",
    },
    hero: {
      overline: "Conversor de PNG para WebP",
      headlinePart1: "Converta PNG para",
      headlineAccent: "WebP",
      headlinePart2: "— Arquivos Menores",
      description: "Transforme imagens PNG em WebP e obtenha arquivos até 80% menores preservando a transparência. O formato de imagem moderno para sites e apps mais rápidos.",
    },
    scenarios: [
      {
        icon: "Zap",
        title: "Desempenho do Site",
        description: "Troque os recursos PNG do seu site por WebP — as páginas carregam mais rápido, o consumo de banda cai e os Core Web Vitals melhoram. A maioria dos navegadores suporta WebP nativamente.",
      },
      {
        icon: "Smartphone",
        title: "Recursos de Apps",
        description: "Converta ícones, elementos de interface e gráficos de PNG para WebP. Recursos menores significam instalação mais rápida, carregamento ágil e menos armazenamento.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu PNG", description: "Arraste e solte ou selecione a imagem PNG que você quer converter para o formato WebP." },
      { stepNumber: 2, title: "Configure a Saída", description: "Ajuste as configurações de qualidade do WebP. Qualidade maior significa arquivos maiores — visualize para encontrar o equilíbrio certo." },
      { stepNumber: 3, title: "Baixe o Arquivo WebP", description: "Salve sua imagem WebP convertida. Compare os tamanhos e veja a redução impressionante." },
    ],
    faqEntries: [
      { question: "O WebP suporta transparência como o PNG?", answer: "Sim. O WebP suporta transparência alfa completa, sendo um excelente substituto do PNG na maioria dos casos — com arquivos significativamente menores." },
      { question: "Quais navegadores suportam WebP?", answer: "Todos os navegadores modernos suportam WebP: Chrome, Firefox, Safari, Edge e Opera. Apenas o Internet Explorer e versões muito antigas não têm suporte." },
      { question: "Quanto menor é o WebP em relação ao PNG?", answer: "Arquivos WebP costumam ser 50-80% menores que os PNGs equivalentes. A economia exata depende do conteúdo da imagem, mas a redução é consistentemente expressiva." },
    ],
    relatedTools: [
      { slug: "/png-to-jpg", title: "PNG para JPG", description: "Converta PNG para JPEG quando não precisar de transparência." },
      { slug: "/jpg-to-webp", title: "JPG para WebP", description: "Converta imagens JPEG para o formato moderno WebP." },
      { slug: "/compress-png", title: "Comprimir PNG", description: "Reduza o tamanho do PNG mantendo o formato PNG." },
    ],
  },

  "png-to-jpg": {
    slug: "png-to-jpg",
    category: "use-case",
    seo: {
      title: "Converter PNG para JPG Online — Conversor Grátis | ImgSplit",
      description: "Converta imagens PNG para JPG online de graça. Remova a transparência e reduza o tamanho do arquivo. No navegador, privado, sem upload para servidores.",
      ogTitle: "Converter PNG para JPG — Conversor Online Grátis",
      ogDescription: "Converta PNG para JPG para remover a transparência e reduzir o tamanho. Grátis e no navegador.",
    },
    hero: {
      overline: "Conversor de PNG para JPG",
      headlinePart1: "Converta PNG para",
      headlineAccent: "JPG",
      headlinePart2: "— Remova a Transparência",
      description: "Converta imagens PNG para JPG e obtenha arquivos menores com compatibilidade universal. Áreas transparentes são preenchidas com a cor de fundo que você escolher.",
    },
    scenarios: [
      {
        icon: "Globe",
        title: "Publicação em Redes Sociais",
        description: "Converta capturas de tela e gráficos PNG para JPG antes de publicar em plataformas que comprimem PNGs agressivamente. Envie um JPG limpo para uma qualidade previsível.",
      },
      {
        icon: "Mail",
        title: "Compartilhamento de Documentos",
        description: "Converta gráficos PNG para JPG para anexos de e-mail, apresentações e documentos. Arquivos JPG são menores e abrem em qualquer dispositivo.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu PNG", description: "Arraste e solte ou selecione o arquivo PNG que você quer converter para o formato JPG." },
      { stepNumber: 2, title: "Defina Fundo e Qualidade", description: "Escolha uma cor de fundo para as áreas transparentes (padrão: branco) e defina o nível de qualidade do JPEG." },
      { stepNumber: 3, title: "Baixe o Arquivo JPG", description: "Salve sua imagem JPG convertida. As áreas transparentes são substituídas pela cor de fundo escolhida." },
    ],
    faqEntries: [
      { question: "O que acontece com as áreas transparentes do meu PNG?", answer: "As áreas transparentes são preenchidas com uma cor de fundo sólida — branco por padrão. Você pode escolher qualquer cor antes de converter." },
      { question: "A qualidade da imagem muda ao converter PNG para JPG?", answer: "O JPEG usa compressão com perdas, então pode haver pequenas diferenças de qualidade em configurações mais baixas. Com qualidade de 90% ou mais, a diferença é praticamente invisível." },
      { question: "Quando devo manter o PNG em vez de converter para JPG?", answer: "Mantenha o PNG quando precisar de transparência, precisão de pixel para texto ou arte de linha, ou qualidade sem perdas. Converta para JPG em fotografias ou quando precisar de arquivos menores." },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG para WebP", description: "Converta PNG para WebP em navegadores modernos, com arquivos ainda menores." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduza ainda mais o tamanho do JPEG após a conversão." },
      { slug: "/jpg-to-png", title: "JPG para PNG", description: "Converta JPG de volta para PNG quando precisar de qualidade sem perdas." },
    ],
  },

  "jpg-to-png": {
    slug: "jpg-to-png",
    category: "use-case",
    seo: {
      title: "Converter JPG para PNG Online — Conversor Grátis | ImgSplit",
      description: "Converta imagens JPG e JPEG para PNG e obtenha qualidade sem perdas para edições de design. Conversor gratuito no navegador, sem upload para servidores.",
      ogTitle: "Converter JPG para PNG — Conversor Online Grátis",
      ogDescription: "Converta JPEG para PNG e obtenha qualidade sem perdas. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Conversor de JPG para PNG",
      headlinePart1: "Converta JPG para",
      headlineAccent: "PNG",
      headlinePart2: "— Qualidade Sem Perdas",
      description: "Converta imagens JPEG para o formato PNG e obtenha qualidade sem perdas e suporte à transparência. Ideal para trabalhos de design, edição e qualquer fluxo que exija resultado perfeito em pixels.",
    },
    scenarios: [
      {
        icon: "Layers",
        title: "Trabalho de Design",
        description: "Converta fotos para PNG para usar em projetos de design — composições em camadas, sobreposições e mockups funcionam melhor com a qualidade sem perdas e o suporte à transparência do PNG.",
      },
      {
        icon: "Shield",
        title: "Necessidade de Transparência",
        description: "Precisa adicionar transparência a uma foto? Converta para PNG primeiro e depois edite o canal alfa na sua ferramenta de design para recortes e sobreposições limpos.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu JPG", description: "Arraste e solte ou selecione o arquivo JPG/JPEG que você quer converter para o formato PNG." },
      { stepNumber: 2, title: "Visualize o Resultado", description: "Revise a prévia do PNG. A conversão preserva todo o conteúdo visual do JPEG original em qualidade total." },
      { stepNumber: 3, title: "Baixe o Arquivo PNG", description: "Salve sua imagem PNG sem perdas. O arquivo será maior que o JPEG original, mas sem nenhum artefato adicional de compressão." },
    ],
    faqEntries: [
      { question: "Converter JPG para PNG melhora a qualidade da imagem?", answer: "A conversão para PNG evita novas perdas de qualidade, mas não recupera detalhes perdidos na compressão original do JPEG. O PNG convertido preserva perfeitamente o estado atual do JPEG." },
      { question: "Por que o PNG fica maior que o JPG original?", answer: "O PNG usa compressão sem perdas, que preserva cada pixel exatamente, resultando em arquivos maiores. O JPEG usa compressão com perdas, que descarta alguns dados para gerar arquivos menores." },
      { question: "Posso adicionar transparência depois de converter para PNG?", answer: "Sim. No formato PNG, você pode editar o canal alfa em qualquer ferramenta de design (Photoshop, GIMP, Figma) para adicionar transparência — algo impossível com JPEG." },
    ],
    relatedTools: [
      { slug: "/jpg-to-webp", title: "JPG para WebP", description: "Converta JPEG para WebP e obtenha arquivos menores com compressão moderna." },
      { slug: "/compress-png", title: "Comprimir PNG", description: "Reduza o tamanho do arquivo PNG após a conversão." },
      { slug: "/png-to-jpg", title: "PNG para JPG", description: "Converta de volta para JPG quando precisar de arquivos menores." },
    ],
  },

  "jpg-to-webp": {
    slug: "jpg-to-webp",
    category: "use-case",
    seo: {
      title: "Converter JPG para WebP Online — Formato Moderno | ImgSplit",
      description: "Converta imagens JPG e JPEG para WebP e obtenha compressão máxima. Arquivos até 80% menores. Conversor gratuito no navegador, sem upload para servidores.",
      ogTitle: "Converter JPG para WebP — Conversor de Formato Moderno",
      ogDescription: "Converta JPEG para WebP e obtenha arquivos até 80% menores. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Conversor de JPG para WebP",
      headlinePart1: "Converta JPG para",
      headlineAccent: "WebP",
      headlinePart2: "— Compressão Máxima",
      description: "Transforme imagens JPEG no formato moderno WebP e obtenha arquivos drasticamente menores. Redução de até 80% no tamanho com qualidade visual comparável — a escolha inteligente para desempenho web.",
    },
    scenarios: [
      {
        icon: "RefreshCw",
        title: "Migração de Site",
        description: "Converta em lote os JPEGs do seu site para WebP durante uma otimização de desempenho. Páginas mais rápidas, custos menores de hospedagem e notas melhores no Google PageSpeed.",
      },
      {
        icon: "Zap",
        title: "Otimização de Desempenho",
        description: "Substitua imagens de destaque e fotos de produto pesadas em JPEG por versões WebP. Seus visitantes têm a mesma experiência visual com uma fração do tempo de download.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu JPG", description: "Arraste e solte ou selecione o arquivo JPEG que você quer converter para WebP." },
      { stepNumber: 2, title: "Ajuste a Qualidade do WebP", description: "Faça o ajuste fino da qualidade. Mesmo a 80%, os arquivos WebP ficam drasticamente menores que o JPEG equivalente." },
      { stepNumber: 3, title: "Baixe o Arquivo WebP", description: "Salve sua imagem WebP e compare a economia de tamanho. A maioria dos usuários vê redução de 50-80%." },
    ],
    faqEntries: [
      { question: "Quanto menor é o WebP em relação ao JPEG?", answer: "O WebP costuma ser 25-34% menor que o JPEG em qualidade visual equivalente (segundo estudos do Google). Em muitas imagens, a economia chega a 50% ou mais." },
      { question: "O WebP é suportado em todo lugar?", answer: "Sim, todos os navegadores modernos (Chrome, Firefox, Safari 14+, Edge) suportam WebP. Para navegadores antigos raros, sirva o JPEG como alternativa usando o elemento HTML <picture>." },
      { question: "Converter de JPEG para WebP perde qualidade?", answer: "Tanto JPEG quanto WebP são formatos com perdas, então a recodificação introduz artefatos adicionais mínimos. Para melhores resultados, converta a partir do JPEG de maior qualidade que você tiver." },
    ],
    relatedTools: [
      { slug: "/png-to-webp", title: "PNG para WebP", description: "Converta imagens PNG para WebP com suporte à transparência." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduza o tamanho do JPEG mantendo o formato JPEG." },
      { slug: "/jpg-to-png", title: "JPG para PNG", description: "Converta JPEG para o formato PNG sem perdas." },
    ],
  },

  "webp-to-png": {
    slug: "webp-to-png",
    category: "use-case",
    seo: {
      title: "Converter WebP para PNG Online — Conversor Grátis | ImgSplit",
      description: "Converta imagens WebP para PNG e obtenha compatibilidade universal. Preserva a transparência. Conversor gratuito no navegador, sem upload para servidores.",
      ogTitle: "Converter WebP para PNG — Conversor Online Grátis",
      ogDescription: "Converta WebP para PNG e obtenha compatibilidade universal. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Conversor de WebP para PNG",
      headlinePart1: "Converta WebP para",
      headlineAccent: "PNG",
      headlinePart2: "— Formato Universal",
      description: "Converta imagens WebP para PNG e garanta compatibilidade máxima com softwares antigos, fluxos de impressão e ferramentas de design que ainda não suportam WebP.",
    },
    scenarios: [
      {
        icon: "ArrowRightLeft",
        title: "Necessidade de Compatibilidade",
        description: "Baixou uma imagem WebP e seu software não abre? Converta para PNG e tenha compatibilidade imediata com Photoshop, PowerPoint, Word e todas as outras ferramentas.",
      },
      {
        icon: "Image",
        title: "Edição em Ferramentas Antigas",
        description: "Editores de imagem e ferramentas de design mais antigos podem não abrir arquivos WebP. Converta para PNG primeiro, faça suas edições e converta de volta se precisar.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu WebP", description: "Arraste e solte ou selecione a imagem WebP que você quer converter para o formato PNG." },
      { stepNumber: 2, title: "Visualize a Conversão", description: "Revise a prévia do PNG. Todo o conteúdo visual e a transparência do arquivo WebP são preservados perfeitamente." },
      { stepNumber: 3, title: "Baixe o Arquivo PNG", description: "Salve sua imagem PNG — agora compatível com praticamente qualquer visualizador, editor e plataforma." },
    ],
    faqEntries: [
      { question: "Vou perder qualidade convertendo WebP para PNG?", answer: "Nenhuma qualidade é perdida na conversão. O PNG é um formato sem perdas, então cada pixel do WebP de origem é preservado exatamente. O arquivo fica maior porque o PNG não comprime de forma tão agressiva." },
      { question: "A transparência é preservada ao converter WebP para PNG?", answer: "Sim. Tanto WebP quanto PNG suportam transparência alfa. Qualquer área transparente da sua imagem WebP é perfeitamente preservada no PNG de saída." },
      { question: "Por que converter WebP para PNG em vez de JPG?", answer: "Escolha PNG quando precisar de suporte à transparência ou qualidade sem perdas. Escolha JPG se quiser o menor arquivo possível e não precisar de transparência." },
    ],
    relatedTools: [
      { slug: "/webp-to-jpg", title: "WebP para JPG", description: "Converta WebP para JPG e obtenha arquivos menores sem transparência." },
      { slug: "/compress-png", title: "Comprimir PNG", description: "Reduza o tamanho do PNG após a conversão." },
      { slug: "/png-to-webp", title: "PNG para WebP", description: "Converta de volta para WebP quando precisar de arquivos menores." },
    ],
  },

  "webp-to-jpg": {
    slug: "webp-to-jpg",
    category: "use-case",
    seo: {
      title: "Converter WebP para JPG Online — Conversor Grátis | ImgSplit",
      description: "Converta imagens WebP para JPG e garanta compatibilidade máxima com apps, sites e compartilhamento. Conversor gratuito no navegador, sem upload.",
      ogTitle: "Converter WebP para JPG — Conversor Online Grátis",
      ogDescription: "Converta WebP para JPG e garanta compatibilidade máxima. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Conversor de WebP para JPG",
      headlinePart1: "Converta WebP para",
      headlineAccent: "JPG",
      headlinePart2: "— Compatibilidade Máxima",
      description: "Converta imagens WebP para o formato JPG, aceito universalmente. Perfeito para compartilhar, imprimir e usar em qualquer software ou plataforma — sem dores de cabeça com compatibilidade.",
    },
    scenarios: [
      {
        icon: "Mail",
        title: "Compartilhar com Todos",
        description: "Nem todo dispositivo abre WebP. Converta para JPG antes de compartilhar por e-mail, apps de mensagem ou transferências de arquivos para garantir que todos consigam abrir suas imagens.",
      },
      {
        icon: "FileDown",
        title: "Preparação para Impressão",
        description: "A maioria das gráficas e serviços de impressão sob demanda espera arquivos JPG. Converta imagens WebP para JPG e imprima sem complicações, com cores previsíveis.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie seu WebP", description: "Arraste e solte ou selecione a imagem WebP que você quer converter para o formato JPG." },
      { stepNumber: 2, title: "Defina a Qualidade do JPG", description: "Ajuste o controle de qualidade. Áreas transparentes são preenchidas com a cor de fundo que você escolher (padrão: branco)." },
      { stepNumber: 3, title: "Baixe o Arquivo JPG", description: "Salve sua imagem JPG — pronta para compartilhar, imprimir ou usar em qualquer aplicativo." },
    ],
    faqEntries: [
      { question: "O que acontece com a transparência ao converter WebP para JPG?", answer: "O JPG não suporta transparência. Qualquer área transparente da imagem WebP é preenchida com uma cor de fundo sólida — branco por padrão. Você pode escolher outra cor antes de converter." },
      { question: "JPG é o formato de imagem mais compatível?", answer: "Sim. JPG/JPEG é suportado por praticamente todo dispositivo, navegador, cliente de e-mail e software existente. É a escolha mais segura quando a compatibilidade é a prioridade." },
      { question: "O tamanho do arquivo aumenta ao converter WebP para JPG?", answer: "Normalmente sim, já que o WebP comprime melhor que o JPG. Mas você pode ajustar a qualidade do JPG para encontrar o equilíbrio certo entre tamanho de arquivo e qualidade visual." },
    ],
    relatedTools: [
      { slug: "/webp-to-png", title: "WebP para PNG", description: "Converta WebP para PNG quando precisar de transparência e qualidade sem perdas." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Reduza ainda mais o tamanho do JPEG após a conversão." },
      { slug: "/jpg-to-webp", title: "JPG para WebP", description: "Converta de volta para WebP quando precisar de arquivos menores." },
    ],
  },

  "reduce-image-size": {
    slug: "reduce-image-size",
    category: "use-case",
    seo: {
      title: "Reduzir Tamanho de Imagem Online — Grátis | ImgSplit",
      description: "Reduza o tamanho de arquivos de imagem online de graça. Otimize imagens JPEG, PNG e WebP para web, e-mail e armazenamento. No navegador, privado, sem upload.",
      ogTitle: "Reduzir Tamanho de Imagem — Otimizador Online Grátis",
      ogDescription: "Otimize e reduza o tamanho de imagens na hora. Grátis, privado, no navegador.",
    },
    hero: {
      overline: "Redutor de Tamanho de Imagem",
      headlinePart1: "Reduza o Tamanho",
      headlineAccent: "da Imagem",
      headlinePart2: "— Otimização Instantânea",
      description: "Otimize qualquer imagem para o menor tamanho de arquivo possível. Compressão inteligente para JPEG, PNG e WebP — perfeito para sites mais rápidos, menos armazenamento e uploads mais ágeis.",
    },
    scenarios: [
      {
        icon: "Zap",
        title: "Velocidade do Site",
        description: "Imagens grandes são a principal causa de sites lentos. Reduza o tamanho das imagens para melhorar drasticamente o tempo de carregamento, a taxa de rejeição e o posicionamento nos buscadores.",
      },
      {
        icon: "FileDown",
        title: "Otimização de Armazenamento",
        description: "Pouco espaço na nuvem ou no dispositivo? Reduza o tamanho das imagens da sua biblioteca de fotos e libere gigabytes sem apagar nenhuma imagem.",
      },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Arraste e solte ou selecione qualquer imagem JPEG, PNG ou WebP que você quer diminuir." },
      { stepNumber: 2, title: "Otimize as Configurações", description: "Ajuste a qualidade de compressão e, se quiser, mude o formato de saída. O WebP costuma oferecer a melhor redução de tamanho." },
      { stepNumber: 3, title: "Baixe a Imagem Otimizada", description: "Salve o arquivo menor. A ferramenta mostra exatamente os bytes economizados e a porcentagem de redução." },
    ],
    faqEntries: [
      { question: "Qual é a melhor forma de reduzir o tamanho de uma imagem?", answer: "Três estratégias funcionam melhor: comprimir ajustando a qualidade (mais rápido), converter para o formato WebP (mais eficaz) ou redimensionar para dimensões menores (mais agressivo). Combinar as três gera os menores arquivos." },
      { question: "Quanto posso reduzir o tamanho de uma imagem?", answer: "Reduções típicas ficam entre 40-80%, dependendo da imagem de origem e das configurações. Converter um JPEG de 5 MB para WebP com qualidade 80 facilmente gera um arquivo de 500 KB." },
      { question: "Reduzir o tamanho do arquivo afeta a qualidade de impressão?", answer: "Para web e telas, uma imagem bem comprimida fica idêntica à original. Para impressão profissional, mantenha a qualidade acima de 90% e evite compressão excessiva." },
    ],
    relatedTools: [
      { slug: "/compress-image", title: "Comprimir Imagem", description: "Compressão de imagem de uso geral com opções de formato." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Compressão especializada para fotos JPEG." },
      { slug: "/png-to-webp", title: "PNG para WebP", description: "Converta para WebP e obtenha a melhor taxa de compressão." },
    ],
  },

  "crop-image": {
    slug: "crop-image",
    category: "use-case",
    seo: { title: "Cortar Imagem Online — Grátis para Redes Sociais | ImgSplit", description: "Corte imagens online nos tamanhos exatos de redes sociais para Instagram, YouTube, Facebook e mais. Recorte gratuito e privado no navegador, sem upload.", ogTitle: "Cortar Imagem Online — Ferramenta Grátis", ogDescription: "Corte fotos nos tamanhos de redes sociais direto no navegador." },
    hero: { overline: "Ferramenta de Corte de Imagem", headlinePart1: "Corte Imagens", headlineAccent: "Online", headlinePart2: "— Tamanhos Exatos", description: "Redimensione e corte qualquer imagem nas dimensões exatas de redes sociais. Escolha um preset, posicione a foto, aplique o corte e exporte sem enviar seu arquivo." },
    scenarios: [
      { icon: "Crop", title: "Proporções Exatas", description: "Trave o corte em proporções quadradas, verticais ou widescreen antes de exportar." },
      { icon: "Smartphone", title: "Pronto para Redes Sociais", description: "Use presets para posts do Instagram, stories, miniaturas do YouTube e capas do Facebook." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Abra o Redimensionar e adicione sua imagem PNG, JPEG ou WebP." },
      { stepNumber: 2, title: "Escolha um Preset", description: "Selecione um preset de tamanho social e use o Corte para ajustar a área visível." },
      { stepNumber: 3, title: "Baixe", description: "Aplique o corte e baixe a imagem final em PNG, JPEG ou WebP." },
    ],
    faqEntries: [
      { question: "Este é um editor de corte separado?", answer: "Não. É o editor de Redimensionar com presets de tamanhos sociais e controles de corte em destaque." },
      { question: "Minha imagem será enviada para algum servidor?", answer: "Não. O corte roda no seu navegador. Sua imagem permanece no seu dispositivo." },
      { question: "Posso usar tamanhos personalizados?", answer: "Sim. Você pode alterar as dimensões da tela e a proporção do corte manualmente." },
    ],
    relatedTools: [
      { slug: "/resize", title: "Redimensionador de Imagem", description: "Defina dimensões exatas, posicione imagens e exporte." },
      { slug: "/crop-for-instagram", title: "Cortar para Instagram", description: "Corte posts quadrados do Instagram rapidamente." },
      { slug: "/youtube-thumbnail-crop", title: "Corte de Miniatura do YouTube", description: "Corte imagens no tamanho 16:9 de miniatura." },
    ],
  },

  "crop-for-instagram": {
    slug: "crop-for-instagram",
    category: "use-case",
    seo: { title: "Cortar Imagem para Instagram — Post 1:1 Grátis | ImgSplit", description: "Corte imagens no tamanho de post do Instagram com preset quadrado de 1080 x 1080, edição privada no navegador e sem upload para servidores.", ogTitle: "Cortar Imagem para Instagram — Ferramenta Grátis", ogDescription: "Crie posts quadrados para o Instagram sem enviar sua foto." },
    hero: { overline: "Corte para Instagram", headlinePart1: "Corte para o", headlineAccent: "Instagram", headlinePart2: "— Posts 1:1", description: "Crie cortes limpos de 1080 x 1080 para posts do Instagram a partir de qualquer imagem. Mantenha o assunto principal centralizado e exporte um quadrado pronto para a plataforma." },
    scenarios: [
      { icon: "Crop", title: "Posts Quadrados no Feed", description: "Transforme fotos em retrato ou paisagem em posts 1:1 limpos para o Instagram." },
      { icon: "Smartphone", title: "Compartilhamento no Celular", description: "Prepare imagens para o Instagram em qualquer navegador antes de enviá-las para o celular ou para o agendador." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Foto", description: "Comece pelo preset quadrado do Instagram e adicione sua imagem." },
      { stepNumber: 2, title: "Posicione o Corte", description: "Arraste a imagem ou a caixa de corte até o assunto se encaixar no quadro quadrado." },
      { stepNumber: 3, title: "Baixe", description: "Aplique o corte e salve a imagem final no tamanho do Instagram." },
    ],
    faqEntries: [
      { question: "Qual tamanho este preset usa?", answer: "O preset quadrado do Instagram usa 1080 x 1080 pixels com proporção de corte 1:1." },
      { question: "Posso cortar conteúdo vertical para o Instagram?", answer: "Use o preset de Story para conteúdo vertical 9:16 ou defina dimensões personalizadas no Redimensionar." },
      { question: "O corte reduz a qualidade?", answer: "A ferramenta exporta no tamanho de tela que você escolher. Para posts do Instagram, 1080 x 1080 é o tamanho de saída ideal." },
    ],
    relatedTools: [
      { slug: "/instagram-story-crop", title: "Corte de Story do Instagram", description: "Corte imagens verticais 9:16 para stories." },
      { slug: "/resize", title: "Redimensionador de Imagem", description: "Redimensione e corte em qualquer dimensão." },
      { slug: "/compress-image", title: "Comprimir Imagem", description: "Reduza o tamanho final da imagem antes de compartilhar." },
    ],
  },

  "instagram-story-crop": {
    slug: "instagram-story-crop",
    category: "use-case",
    seo: { title: "Cortar Story do Instagram — Recorte 9:16 Grátis | ImgSplit", description: "Corte imagens no tamanho de Story do Instagram com preset vertical de 1080 x 1920. Edição privada no navegador mantém as fotos no seu dispositivo até a exportação.", ogTitle: "Cortar Story do Instagram — Recorte 9:16 Grátis", ogDescription: "Corte stories verticais no navegador com preset de 1080 x 1920." },
    hero: { overline: "Corte de Story do Instagram", headlinePart1: "Corte Stories do", headlineAccent: "Instagram", headlinePart2: "— Vertical 9:16", description: "Prepare stories em tela cheia para o Instagram com o preset de corte de 1080 x 1920. Reposicione a imagem, aplique o corte e exporte com privacidade." },
    scenarios: [
      { icon: "Smartphone", title: "Stories em Tela Cheia", description: "Converta imagens largas ou quadradas em peças verticais para stories, sem distorcer." },
      { icon: "Crop", title: "Controle do Assunto", description: "Mova a área de corte para manter rostos, produtos ou textos dentro do quadro visível do story." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Abra o Preset de Story", description: "Use o preset de 1080 x 1920 do Story do Instagram no Redimensionar." },
      { stepNumber: 2, title: "Ajuste o Corte", description: "Arraste os cantos ou reposicione a imagem para manter o conteúdo importante visível." },
      { stepNumber: 3, title: "Exporte o Story", description: "Baixe a imagem vertical para o Instagram, capas de Reels ou outros formatos 9:16." },
    ],
    faqEntries: [
      { question: "Qual é o tamanho de corte do Story do Instagram?", answer: "O preset usa 1080 x 1920 pixels, uma proporção vertical de 9:16." },
      { question: "Posso usar para TikTok ou Reels?", answer: "Sim. A saída 9:16 também funciona muito bem para vídeos curtos e outros formatos sociais verticais." },
      { question: "Posso manter a imagem inteira em vez de cortar?", answer: "Use o modo Ajustar se quiser a imagem completa visível com espaço vazio em vez de preencher o quadro." },
    ],
    relatedTools: [
      { slug: "/crop-for-instagram", title: "Cortar para Instagram", description: "Crie cortes quadrados para posts do Instagram." },
      { slug: "/resize", title: "Redimensionador de Imagem", description: "Redimensione e corte com dimensões personalizadas." },
      { slug: "/jpg-to-webp", title: "JPG para WebP", description: "Converta as peças finais para WebP." },
    ],
  },

  "youtube-thumbnail-crop": {
    slug: "youtube-thumbnail-crop",
    category: "use-case",
    seo: { title: "Cortar Miniatura do YouTube — 1280x720 Grátis | ImgSplit", description: "Corte imagens no tamanho de miniatura do YouTube com preset 16:9 de 1280 x 720, prévia no navegador e exportação rápida sem upload.", ogTitle: "Cortar Miniatura do YouTube — Recorte 16:9 Grátis", ogDescription: "Corte imagens de miniatura em 1280 x 720 direto no navegador." },
    hero: { overline: "Corte de Miniatura do YouTube", headlinePart1: "Corte Miniaturas do", headlineAccent: "YouTube", headlinePart2: "— 16:9", description: "Crie cortes de miniatura de 1280 x 720 para o YouTube a partir de qualquer imagem. Use o preset 16:9, posicione o assunto e exporte uma miniatura pronta para upload." },
    scenarios: [
      { icon: "Youtube", title: "Preparação de Miniaturas", description: "Corte fotos, capturas de tela ou artes no tamanho de 1280 x 720 recomendado pelo YouTube." },
      { icon: "Crop", title: "Controle de Composição", description: "Mantenha rostos, produtos e áreas de título dentro do quadro seguro da miniatura." },
    ],
    howToSteps: [
      { stepNumber: 1, title: "Envie sua Imagem", description: "Abra o preset de miniatura do YouTube e adicione a imagem de origem." },
      { stepNumber: 2, title: "Enquadre a Miniatura", description: "Use a caixa de corte 16:9 para escolher a composição mais atrativa." },
      { stepNumber: 3, title: "Baixe", description: "Exporte a miniatura final de 1280 x 720 em PNG, JPEG ou WebP." },
    ],
    faqEntries: [
      { question: "Qual é o tamanho do preset de miniatura do YouTube?", answer: "O preset usa 1280 x 720 pixels com proporção 16:9." },
      { question: "Posso exportar JPG para o YouTube?", answer: "Sim. Use o menu de download para exportar em JPEG, PNG ou WebP." },
      { question: "A ferramenta adiciona texto às miniaturas?", answer: "Não. O foco aqui é cortar e redimensionar. Adicione o texto na sua ferramenta de design e depois use o ImgSplit para cortar e exportar a imagem final." },
    ],
    relatedTools: [
      { slug: "/resize", title: "Redimensionador de Imagem", description: "Redimensione imagens para qualquer tamanho de tela." },
      { slug: "/compress-jpeg", title: "Comprimir JPEG", description: "Diminua o tamanho das miniaturas finais." },
      { slug: "/crop-image", title: "Cortar Imagem", description: "Ferramenta geral de corte online." },
    ],
  },

}

export default data
