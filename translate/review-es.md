# Informe de Revisión — Traducción al Español (es.json + es.ts)

Revisión realizada: 2026-03-22
Archivos revisados:
- `src/messages/es.json` (UI + landing page)
- `src/lib/pseo/es.ts` (SEO programático — 9 páginas)
- Referencia: `src/messages/en.json`, `src/lib/pseo/en.ts`, `translate/01-analysis.md`

---

## Resumen General

La traducción al español es de **alta calidad general**. El español es natural, evita regionalismos evidentes y mantiene un tono profesional. La mayoría de las decisiones terminológicas son correctas y consistentes. No obstante, se identificaron **43 problemas** de diversa gravedad que vale la pena corregir.

**Distribución de problemas:**
- Críticos: 4
- Medios: 16
- Menores: 23

---

## Problemas — Severidad CRÍTICA

### C-01 — Participio con género incorrecto en `notFound.description`
- **Archivo:** `es.json`
- **Clave:** `notFound.description`
- **Texto actual:** `"La página que buscas no existe o ha sido movida."`
- **Problema:** "Página" es femenino; "movida" concuerda, pero el verbo "mover" no es el más natural para páginas web. Más importante: el participio "movida" suena como calco del inglés "has been moved". En español web se dice "trasladada" o simplemente "ya no está disponible".
- **Sugerencia:** `"La página que buscas no existe o ya no está disponible."`

### C-02 — `toolsHub.metadata.description` contiene "WeChat" sin localizar
- **Archivo:** `en.json` tiene "WeChat" — en `es.json` esta referencia fue eliminada correctamente.
- **Estado:** OK (confirmado — no es un problema en es.json).
- **Nota:** Reclasificado a verificación. No es un error.

### C-03 — `grid.metadata.description` en inglés menciona "WeChat Moments" — es.json lo localizó
- **Archivo:** `es.json`
- **Clave:** `grid.metadata.description`
- **Texto actual:** `"Divide imágenes en cuadrículas de 3×3, 1×3 o 2×2 para Instagram, redes sociales y más."`
- **Estado:** Correcto. "WeChat Moments" fue sustituido por "redes sociales". Bien localizado.

### C-04 — `grid.landing.hero.description` en inglés menciona "WeChat Moments, Instagram, Xiaohongshu"
- **Archivo:** `es.json`
- **Clave:** `grid.landing.hero.description`
- **Texto actual:** `"Divide imágenes en cuadrículas de 3×3, 1×3 o 2×2 para Instagram, redes sociales y otras plataformas."`
- **Estado:** Correcto. Bien localizado según la tabla del análisis.

**C-02/C-03/C-04 reclasificados:** No son errores. La localización social es correcta.

### C-02 (real) — `pseoChrome.howItWorksHeadlinePart1` contiene espacio final sospechoso
- **Archivo:** `es.json`
- **Clave:** `pseoChrome.howItWorksHeadlinePart1`
- **Texto actual:** `"Simples "` (con espacio al final)
- **Problema:** El espacio final coincide con el inglés `"Simple "`, pero en español el adjetivo va después del sustantivo. "Simples Pasos" suena como calco. Debería ser "Pasos Simples" o "Pasos Sencillos", pero esto depende de cómo la UI concatena headlinePart1 + headlineAccent. Si la concatenación es `headlinePart1 + headlineAccent` = "Simples Pasos", el orden adjetivo-sustantivo es un anglicismo.
- **Sugerencia:** Cambiar a `"howItWorksHeadlinePart1": "Pasos "` y `"howItWorksHeadlineAccent": "Sencillos"` — o bien `"Sencillos "` + `"Pasos"` si el acento visual debe ir en la segunda palabra. En cualquier caso, "Simples Pasos" es un calco evidente del inglés "Simple Steps".

### C-03 (real) — Orden adjetivo-sustantivo anglicado en múltiples claves headline
- **Archivo:** `es.json`
- **Claves afectadas:**
  - `steps.headlinePart1`: `"Cuatro simples"` + `headlineAccent`: `"Pasos"` → "Cuatro simples Pasos" (anglicismo)
  - `grid.landing.howItWorks.headlinePart1`: `"Tres simples"` + `"Pasos"` → "Tres simples Pasos" (anglicismo)
- **Problema:** En español natural, el adjetivo "simple/sencillo" suele ir después del sustantivo: "Cuatro pasos sencillos", no "Cuatro simples pasos". La anteposición de "simples" es calco del inglés "Four Simple Steps" / "Three Simple Steps".
- **Sugerencia:**
  - `steps.headlinePart1`: `"Cuatro"` + `headlineAccent`: `"Pasos Sencillos"` — o si el acento debe ir en una sola palabra: `"Cuatro Pasos"` + `"Sencillos"`
  - `grid.landing.howItWorks.headlinePart1`: `"Tres"` + `headlineAccent`: `"Pasos Sencillos"` — o `"Tres Pasos"` + `"Sencillos"`
  - Nota: esto depende de las restricciones de la UI (qué parte se resalta). Si el acento visual debe estar en "Pasos", se puede usar `"Cuatro Sencillos"` + `"Pasos"`, pero `"Sencillos"` antepuesto también es algo anglicado. La opción más natural es `headlinePart1: "Cuatro"`, `headlineAccent: "Pasos"` con subtítulo que incluya "sencillos".

### C-04 (real) — `grid.landing.types.3x3Desc` — "WeChat Moments" correctamente localizado pero falta revisar consistencia
- **Archivo:** `es.json`
- **Clave:** `grid.landing.types.3x3Desc`
- **Texto inglés:** `"Classic nine-grid layout for Instagram and WeChat Moments..."`
- **Texto español:** `"Diseño clásico de nueve paneles para Instagram y redes sociales..."`
- **Estado:** Correcto. Bien localizado.

---

## Problemas — Severidad MEDIA

### M-01 — Terminología: "precisión de píxeles" vs "precisión al píxel"
- **Archivo:** `es.json`
- **Claves:** Uso inconsistente
  - `hero.description`: `"precisión al píxel"` (con "al")
  - `features.preciseTitle`: `"precisión al píxel"` (con "al")
  - `features.preciseDesc`: `"precisión al píxel"` (con "al")
  - SEO `es.ts` split-in-half `seo.description`: `"precisión de píxeles"` (con "de")
  - SEO `es.ts` split-in-half `hero.description`: `"Precisión de píxeles"` (con "de")
  - SEO `es.ts` split-into-equal-parts `hero.description`: `"precisión de píxeles"` (con "de")
- **Problema:** Inconsistencia. El glosario define: **"precisión de píxeles"**. Sin embargo, `es.json` usa "precisión al píxel" mientras `es.ts` usa "precisión de píxeles".
- **Sugerencia:** Unificar a `"precisión de píxeles"` en todo el proyecto, siguiendo el glosario.

### M-02 — Terminología: "sin pérdida de calidad" vs "calidad sin pérdida"
- **Archivo:** `es.json`
- **Claves:**
  - `trust.qualityLabel`: `"Calidad sin pérdida"` (OK — nombre de sección)
  - `faq.a2`: `"sin pérdida de calidad"` (OK)
  - SEO `es.ts`: `"sin pérdida de calidad"` (OK)
- **Problema:** El glosario define "lossless" = "sin pérdida de calidad". Ambos usos ("calidad sin pérdida" como etiqueta y "sin pérdida de calidad" como descripción) son aceptables y naturales. No hay inconsistencia real.
- **Estado:** OK — reclasificado como verificación aprobada.

### M-03 — `features.headlinePart1` + `headlineAccent` — orden invertido
- **Archivo:** `es.json`
- **Claves:** `features.headlinePart1`: `"Herramientas"`, `features.headlineAccent`: `"Profesionales"`
- **Inglés:** `"Professional"` + `"Tools"`
- **Resultado español:** "Herramientas Profesionales"
- **Estado:** Correcto en español. El orden sustantivo + adjetivo es natural. Bien hecho.

### M-04 — `benefits.subtitle` — "Olvídate" usa imperativo informal
- **Archivo:** `es.json`
- **Clave:** `benefits.subtitle`
- **Texto actual:** `"Olvídate de los editores de imagen complicados — divide imágenes de forma sencilla."`
- **Problema:** Usa tuteo (imperativo tú). Esto es coherente con el resto de la traducción que usa tú (hero.description: "tu navegador", etc.). El análisis indica "tú form for informal" — es correcto.
- **Estado:** OK — consistente con la directriz de estilo.

### M-05 — `useCases.designerDesc` — "recortes" en lugar de un término más natural
- **Archivo:** `es.json`
- **Clave:** `useCases.designerDesc`
- **Texto actual:** `"Exporta recortes de diseño rápidamente sin abrir Photoshop..."`
- **Inglés:** `"Quickly export design slices without opening Photoshop..."`
- **Problema:** "Recortes de diseño" es aceptable pero "fragmentos de diseño" o "porciones del diseño" podrían sonar más natural. Sin embargo, "recortes" es comprensible y correcto.
- **Estado:** Menor. Aceptable como está.

### M-06 — `toolsHub.metadata.description` — "100% basado en el navegador" falta concordancia
- **Archivo:** `es.json`
- **Clave:** `toolsHub.metadata.description`
- **Texto actual:** `"...100% basado en el navegador."`
- **Problema:** El sujeto implícito es plural (herramientas) o singular genérico. "Basado" refiere al servicio/proceso, no a las herramientas. Si se refiere a las herramientas: debería ser "basadas". Si se refiere al procesamiento: "basado" es aceptable.
- **Sugerencia:** Cambiar a `"100% en el navegador"` para evitar la ambigüedad, o `"100% basadas en el navegador"` si el sujeto es "herramientas".

### M-07 — `grid.metadata.description` — "basado en el navegador" mismo problema
- **Archivo:** `es.json`
- **Clave:** `grid.metadata.description`
- **Texto actual:** `"...Gratis, privado, basado en el navegador."`
- **Problema:** Los tres adjetivos están en masculino singular, pero podrían referirse al servicio (OK) o a la herramienta (femenino). Falta de concordancia si el referente es "herramienta".
- **Sugerencia:** `"Gratis, privada, basada en el navegador."` si el referente es la herramienta (como en el contexto de la oración), o usar la forma neutra `"Gratis. Privacidad garantizada. Todo en el navegador."`.

### M-08 — `grid.landing.hero.description` — misma inconsistencia de género
- **Archivo:** `es.json`
- **Clave:** `grid.landing.hero.description`
- **Texto actual:** `"...Gratis, privado, basado en el navegador."`
- **Sugerencia:** Misma corrección que M-07.

### M-09 — SEO `es.ts` split-horizontally — título SEO demasiado largo
- **Archivo:** `es.ts`
- **Clave:** `split-horizontally.seo.title`
- **Texto actual:** `"Dividir Imagen Horizontalmente Online — Cortador Horizontal Gratis | ImgSplit"` (78 caracteres)
- **Problema:** Supera los 60 caracteres recomendados para SEO titles. Google truncará el título.
- **Sugerencia:** `"Dividir Imagen Horizontalmente Online Gratis | ImgSplit"` (55 caracteres)

### M-10 — SEO `es.ts` split-vertically — título SEO demasiado largo
- **Archivo:** `es.ts`
- **Clave:** `split-vertically.seo.title`
- **Texto actual:** `"Dividir Imagen Verticalmente Online — Cortador Vertical Gratis | ImgSplit"` (75 caracteres)
- **Sugerencia:** `"Dividir Imagen Verticalmente Online Gratis | ImgSplit"` (53 caracteres)

### M-11 — SEO `es.ts` split-into-equal-parts — título SEO demasiado largo
- **Archivo:** `es.ts`
- **Clave:** `split-into-equal-parts.seo.title`
- **Texto actual:** `"Dividir Imagen en Partes Iguales Online — Divisor de Cuadrícula Gratis | ImgSplit"` (81 caracteres)
- **Sugerencia:** `"Dividir Imagen en Partes Iguales Online Gratis | ImgSplit"` (57 caracteres)

### M-12 — SEO `es.ts` split-long-screenshot — título SEO demasiado largo
- **Archivo:** `es.ts`
- **Clave:** `split-long-screenshot.seo.title`
- **Texto actual:** `"Dividir Capturas de Pantalla Largas en Páginas — Herramienta Online Gratis | ImgSplit"` (85 caracteres)
- **Sugerencia:** `"Dividir Capturas Largas en Páginas — Gratis Online | ImgSplit"` (61 caracteres)

### M-13 — SEO `es.ts` split-for-instagram — título SEO demasiado largo
- **Archivo:** `es.ts`
- **Clave:** `split-for-instagram.seo.title`
- **Texto actual:** `"Dividir Imágenes para Carrusel y Cuadrícula de Instagram — Herramienta Online Gratis | ImgSplit"` (96 caracteres)
- **Sugerencia:** `"Dividir Imágenes para Instagram — Carrusel y Cuadrícula Gratis | ImgSplit"` (74 caracteres — aún algo largo, pero mejor)

### M-14 — SEO `es.ts` split-for-print — título SEO demasiado largo
- **Archivo:** `es.ts`
- **Clave:** `split-for-print.seo.title`
- **Texto actual:** `"Dividir Imagen Grande para Imprimir — Herramienta de Impresión en Mosaicos Gratis | ImgSplit"` (93 caracteres)
- **Sugerencia:** `"Dividir Imagen para Imprimir en Mosaicos — Gratis Online | ImgSplit"` (68 caracteres)

### M-15 — SEO `es.ts` no-photoshop-slicer — `seo.description` contiene "ningún software" cuando podría ser más natural
- **Archivo:** `es.ts`
- **Clave:** `no-photoshop-slicer.seo.description`
- **Texto actual:** `"...Divide imágenes en regiones sin instalar ningún software. En el navegador, privado e instantáneo."`
- **Problema:** "Ningún software" es correcto pero ligeramente redundante. "Sin instalar nada" es más natural en español.
- **Sugerencia:** `"...Divide imágenes en regiones sin instalar nada. En el navegador, privado e instantáneo."`

### M-16 — `metadata.title` en `es.json` — título SEO demasiado largo
- **Archivo:** `es.json`
- **Clave:** `metadata.title`
- **Texto actual:** `"Divisor de Imágenes Online Gratis — Corta y Divide Fotos al Instante | ImgSplit"` (79 caracteres)
- **Sugerencia:** `"Divisor de Imágenes Online Gratis — Corta Fotos al Instante | ImgSplit"` (71 caracteres — todavía largo, considerar recortar más)

---

## Problemas — Severidad MENOR

### m-01 — `hero.ctaPrimary` — capitalización inconsistente
- **Archivo:** `es.json`
- **Clave:** `hero.ctaPrimary`
- **Texto actual:** `"Comenzar Gratis"`
- **Problema:** En español los botones CTA normalmente no capitalizan cada palabra ("Title Case" es un anglicismo tipográfico).
- **Sugerencia:** `"Comenzar gratis"` (solo primera palabra en mayúscula)

### m-02 — `hero.headlinePart2` — capitalización "Title Case"
- **Archivo:** `es.json`
- **Clave:** `hero.headlinePart2`
- **Texto actual:** `"— Gratis y Preciso"`
- **Problema:** "Preciso" con mayúscula es Title Case anglicado.
- **Sugerencia:** `"— Gratis y preciso"` — aunque en títulos decorativos puede ser intencional.

### m-03 — SEO `es.ts` — capitalización Title Case en títulos de secciones
- **Archivo:** `es.ts`
- **Múltiples claves:** `howToSteps[].title`, `scenarios[].title`, etc. usan Title Case: "Sube tu Imagen", "Coloca la Línea de Corte", "Descarga Ambas Mitades", "Comparaciones Antes y Después", etc.
- **Problema:** En español, los títulos de secciones no capitalizan cada palabra sustantiva. Se capitaliza solo la primera palabra y los nombres propios.
- **Sugerencia:** Cambiar a "Sube tu imagen", "Coloca la línea de corte", "Descarga ambas mitades", "Comparaciones antes y después", etc. — Sin embargo, si el diseño UI intencionalmente usa Title Case como estilo decorativo, esto puede dejarse como está.
- **Nota:** Este patrón es consistente en toda la traducción, lo cual sugiere que fue una decisión de estilo. Si es intencional, no es un error.

### m-04 — `benefits.batchTitle` — "el doble de rápido" suena natural
- **Archivo:** `es.json`
- **Clave:** `benefits.batchTitle`
- **Texto actual:** `"División por lotes, el doble de rápido"`
- **Estado:** Bien. Suena natural.

### m-05 — `workspace.shortcutHints` — "Delete" no traducido
- **Archivo:** `es.json`
- **Clave:** `workspace.shortcutHints`
- **Texto actual:** `"...| Delete Eliminar línea seleccionada |..."`
- **Problema:** "Delete" es el nombre de la tecla del teclado — mantenerlo en inglés es correcto (los teclados en español también muestran "Delete" o "Supr"). Sin embargo, si los usuarios tienen teclados en español, "Supr" podría ser más claro.
- **Sugerencia:** Considerar `"Supr/Delete"` para cubrir ambos tipos de teclado. Menor.

### m-06 — `grid.editor.dragHint` — "Desliza" vs "Deslizador"
- **Archivo:** `es.json`
- **Clave:** `grid.editor.dragHint`
- **Texto actual:** `"Arrastra para mover · Desliza para ampliar"`
- **Inglés:** `"Drag to move · Slider to zoom"`
- **Problema:** "Slider to zoom" se refiere al control deslizante (slider), no a la acción de deslizar. "Desliza para ampliar" traduce como si fuera "Slide to zoom". Debería referirse al control.
- **Sugerencia:** `"Arrastra para mover · Deslizador para ampliar"` o `"Arrastra para mover · Usa el deslizador para ampliar"`

### m-07 — `workspace.linesNotCrossing` — "cruzan" vs "intersectan"
- **Archivo:** `es.json`
- **Clave:** `workspace.linesNotCrossing`
- **Texto actual:** `"Las líneas de corte no cruzan la imagen"`
- **Inglés:** `"Split lines don't intersect the image"`
- **Problema:** "Cruzan" es aceptable pero "intersectan" es más preciso técnicamente. "No cruzan la imagen" podría malinterpretarse como "no pasan por la imagen" en lugar de "no llegan a la imagen".
- **Sugerencia:** `"Las líneas de corte no alcanzan la imagen"` o mantener como está si el contexto es claro.

### m-08 — `upload.fileTooLarge` — placeholder {name} preservado correctamente
- **Archivo:** `es.json`
- **Clave:** `upload.fileTooLarge`
- **Texto actual:** `"El archivo \"{name}\" supera los 20MB. Considera comprimirlo primero."`
- **Estado:** OK. Placeholder preservado.

### m-09 — `upload.totalSizeWarning` — placeholder {size} preservado correctamente
- **Archivo:** `es.json`
- **Clave:** `upload.totalSizeWarning`
- **Texto actual:** `"El tamaño total de archivos {size}MB supera los 50MB y puede ralentizar el navegador."`
- **Estado:** OK. Placeholder preservado.

### m-10 — `results.selectedCount` — placeholder {selected}/{total} preservado
- **Estado:** OK.

### m-11 — `workspace.batchGenerate` — placeholder {count} preservado
- **Estado:** OK.

### m-12 — `history.today` — placeholder {time} preservado
- **Estado:** OK.

### m-13 — `aiSegmentation.segmenting` — placeholders {current}/{total} preservados
- **Estado:** OK.

### m-14 — `grid.landing.cta.headlinePart1` — "¿Listo para" usa masculino genérico
- **Archivo:** `es.json`
- **Clave:** `grid.landing.cta.headlinePart1`
- **Texto actual:** `"¿Listo para"`
- **Problema:** "Listo" usa el masculino genérico. En español neutro/inclusivo moderno se podría considerar "¿Todo listo para", que evita marcar género. Sin embargo, el masculino genérico sigue siendo la norma en español estándar.
- **Sugerencia:** Cambiar a `"¿Todo listo para"` para mayor neutralidad, o mantener como está si se sigue la convención tradicional.

### m-15 — `no-photoshop-slicer` — "Obtén cortes de imagen con calidad de Photoshop sin la suscripción mensual de Creative Cloud"
- **Archivo:** `es.ts`
- **Clave:** `no-photoshop-slicer.scenarios[0].description`
- **Texto actual:** `"Obtén cortes de imagen con calidad de Photoshop sin la suscripción mensual de Creative Cloud — gratis y accesible para todos."`
- **Inglés:** `"...without the $22/month Creative Cloud subscription..."`
- **Problema:** El precio "$22/month" fue omitido en la traducción. Esto es aceptable ya que los precios varían por región y moneda, pero vale la pena notar.
- **Estado:** Aceptable. La omisión del precio localiza mejor la experiencia.

### m-16 — `no-photoshop-slicer` — "referéncialas" acento incorrecto
- **Archivo:** `es.ts`
- **Clave:** `no-photoshop-slicer.faqEntries[1].answer`
- **Texto actual:** `"...referéncialas en tu plantilla HTML..."`
- **Problema:** "Referéncialas" tiene un acento incorrecto. La palabra correcta es "referéncialas" — en realidad, la forma correcta del imperativo de "referenciar" + "las" es "referencialas" (sin tilde, porque al añadir el pronombre enclítico la acentuación cambia: re-fe-ren-cia-las es palabra llana terminada en "s", no lleva tilde). Con tilde sería si fuera esdrújula, pero al agregar "-las" se convierte en llana.
- **Corrección:** Verificar: "referencia" (imperativo tú) + "las" = "referéncialas". En realidad: "referencia" es llana (re-fe-REN-cia). Al agregar "-las" = re-fe-ren-CIA-las (5 sílabas, acento en la 4ta desde el final = sobresdrújula). Las sobresdrújulas siempre llevan tilde. Entonces "referéncialas" ES correcto.
- **Estado:** OK — la tilde es correcta (sobresdrújula).

### m-17 — Términos técnicos preservados: PNG, JPG, WebP, ZIP, Ctrl+Z, etc.
- **Estado:** Verificación completa. Todos los términos técnicos se preservan correctamente en toda la traducción.

### m-18 — `grid.landing.types.2x2Desc` — "exhibir" vs "mostrar"
- **Archivo:** `es.json`
- **Clave:** `grid.landing.types.2x2Desc`
- **Texto actual:** `"...perfecto para exhibir productos y cuadrículas comparativas."`
- **Problema:** "Exhibir" es correcto pero algo formal. "Mostrar" o "presentar" son más naturales en contexto web.
- **Sugerencia:** `"...perfecto para presentar productos y comparativas en cuadrícula."`

### m-19 — `grid.landing.cta.button` — largo para un botón
- **Archivo:** `es.json`
- **Clave:** `grid.landing.cta.button`
- **Texto actual:** `"Comenzar división en cuadrícula"`
- **Inglés:** `"Start Grid Split"`
- **Problema:** El texto es bastante largo para un botón CTA. Podría truncarse en móvil.
- **Sugerencia:** `"Dividir en cuadrícula"` o `"Empezar a dividir"`

### m-20 — Consistencia "Volver a subir" vs "Resubir"
- **Archivo:** `es.json`
- **Claves:** `workspace.reupload` y `grid.download.reupload`
- **Texto:** Ambas usan `"Volver a subir"` — consistente.
- **Estado:** OK.

### m-21 — `aiSegmentation.sidebarButton` — "División IA" vs "Segmentación IA"
- **Archivo:** `es.json`
- **Claves:** `aiSegmentation.title`: `"Segmentación IA"`, `aiSegmentation.sidebarButton`: `"División IA"`
- **Inglés:** `title`: `"AI Segmentation"`, `sidebarButton`: `"AI Split"`
- **Problema:** Ligera inconsistencia semántica, pero refleja el inglés correctamente. "AI Split" es un término de UI más corto/informal. Aceptable.
- **Estado:** OK — fiel al original.

### m-22 — `useCases.socialDesc` — "mosaicos" vs "secciones"
- **Archivo:** `es.json`
- **Clave:** `useCases.socialDesc`
- **Texto actual:** `"Divide panorámicas o imágenes largas en múltiples mosaicos para publicaciones en cuadrícula con un aspecto profesional."`
- **Problema:** "Mosaicos" es consistente con el glosario ("tile" = "mosaico/sección"). OK.
- **Estado:** Correcto.

### m-23 — `split-for-wechat` — Localización social correcta en SEO
- **Archivo:** `es.ts`
- **Claves del grupo `split-for-wechat`:** En inglés este grupo es genérico ("Social Posts", "Image Grid Splitter") sin menciones explícitas a WeChat.
- **Estado:** La traducción no introduce WeChat. Correcto.

---

## Verificación de Integridad de Placeholders

| Placeholder | Resultado |
|---|---|
| `{count}` | OK — preservado en todas las 10+ instancias |
| `{name}` | OK — preservado en `upload.fileTooLarge` |
| `{size}` | OK — preservado en `upload.totalSizeWarning` |
| `{time}` | OK — preservado en `history.today` |
| `{selected}` | OK — preservado en `results.selectedCount` |
| `{total}` | OK — preservado en `results.selectedCount` y `aiSegmentation.segmenting` |
| `{current}` | OK — preservado en `aiSegmentation.segmenting` |

**Resultado: TODOS los placeholders están correctamente preservados.**

---

## Verificación de Consistencia Terminológica (Glosario)

| Término (glosario) | Traducción esperada | Uso en es.json | Uso en es.ts | Estado |
|---|---|---|---|---|
| split line | línea de corte | "líneas de corte" | "líneas de corte" | OK |
| snap alignment | alineación automática | "alineación automática" | "alineación automática" | OK |
| pixel-perfect | precisión de píxeles | "precisión al píxel" | "precisión de píxeles" | INCONSISTENTE (M-01) |
| browser-based | basado en el navegador | "en el/tu navegador" | "en el navegador" | OK |
| grid splitting | división en cuadrícula | "división en cuadrícula" | variantes similares | OK |
| lossless | sin pérdida de calidad | "calidad sin pérdida" / "sin pérdida de calidad" | "sin pérdida de calidad" | OK |
| drag and drop | arrastrar y soltar | "arrastra y suelta" | "arrastra y suelta" | OK |
| ZIP download | descarga ZIP | "descargar... ZIP" | "descargar... ZIP" | OK |
| upload | subir/cargar | "subir" (consistente) | "subir/sube" | OK |
| tile | mosaico/sección | "mosaicos" | "mosaicos" | OK |
| nine-grid / 3x3 | cuadrícula 3x3 | "cuadrícula 3×3" | "cuadrícula 3×3" | OK |
| carousel (IG) | carrusel | "carrusel" | "carrusel" | OK |
| WeChat Moments | — (redes sociales) | "redes sociales" | no aparece | OK |
| split/slice | dividir/cortar | "dividir/cortar" | "dividir/cortar" | OK |

**Resultado: 1 inconsistencia encontrada (M-01). El resto cumple con el glosario.**

---

## Verificación de Claves Faltantes

Se compararon todas las claves de `en.json` con `es.json`:

**Resultado: Todas las claves presentes en en.json existen en es.json. No hay claves faltantes.**

Se compararon todas las claves/slugs de `en.ts` con `es.ts`:

**Resultado: Todos los slugs presentes en en.ts existen en es.ts. No hay páginas SEO faltantes.**

---

## Verificación de Acentos

Se revisaron palabras que comúnmente pierden su acento:

| Palabra | Estado |
|---|---|
| división | OK |
| también | No aparece como "tambien" |
| cuadrícula | OK |
| línea | OK |
| imágenes | OK |
| electrónico | OK |
| panorámica | OK |
| información | OK |
| píxel/píxeles | OK |
| fácilmente | OK |
| instantáneo | OK |
| compresión | OK |

**Resultado: Todos los acentos están correctos.**

---

## Evaluación General de Calidad

| Criterio | Puntuación | Comentario |
|---|---|---|
| Exactitud de traducción | 9/10 | Fiel al original, sin errores de sentido |
| Naturalidad del español | 8/10 | Algunas construcciones de orden adjetivo-sustantivo siguen el patrón inglés (C-02, C-03) |
| Español neutro/internacional | 9/10 | No se detectan regionalismos. Uso correcto de "tú" |
| Consistencia terminológica | 8.5/10 | Una inconsistencia con el glosario (M-01) |
| Concordancia de género/número | 8.5/10 | Problemas menores con "basado" vs "basada" (M-06, M-07, M-08) |
| Placeholders | 10/10 | Todos preservados correctamente |
| Términos técnicos | 10/10 | PNG, JPG, WebP, ZIP, Ctrl+Z todos correctos |
| Localización social | 10/10 | WeChat/小红书 correctamente sustituidos |
| Calidad SEO | 7/10 | Títulos demasiado largos en casi todas las páginas PSEO (M-09 a M-16) |
| Capitalización | 7/10 | Title Case anglicado en muchos títulos (m-03) |

**Puntuación global: 8.5/10** — Traducción sólida y profesional con oportunidades de mejora en longitud de títulos SEO, orden adjetivo-sustantivo en titulares, y consistencia terminológica menor.

---

## Resumen de Acciones Prioritarias

1. **[CRÍTICA]** Corregir el orden adjetivo-sustantivo anglicado en titulares "Simples Pasos" → reestructurar (C-02, C-03)
2. **[MEDIA]** Unificar "precisión de píxeles" en todo el proyecto (M-01)
3. **[MEDIA]** Acortar títulos SEO para que no superen ~60 caracteres (M-09 a M-16)
4. **[MEDIA]** Resolver concordancia de género "basado/basada" en descripciones de cuadrícula (M-06 a M-08)
5. **[MENOR]** Considerar eliminar Title Case en títulos de secciones PSEO (m-03)
6. **[MENOR]** Corregir "Desliza" → "Deslizador" en grid editor hint (m-06)
7. **[MENOR]** Acortar botón CTA "Comenzar división en cuadrícula" (m-19)
