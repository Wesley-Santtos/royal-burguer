# Royal Burguer — Cardápio Digital com Hero 3D

**Data:** 2026-09-10
**Status:** aprovado (design), aguardando plano de implementação

---

## 1. Objetivo

Site de página única para a hamburgueria fictícia **Royal Burguer**: um cardápio
digital com todas as categorias visíveis, tendo como estrela um **hambúrguer 3D
rotacionável** no hero. É uma peça de demonstração/portfólio — dados fictícios,
mas com acabamento de site real.

Não é objetivo agora: colocar no ar. O deploy (Hostinger, `doutorlead.com/burger`)
fica para depois da aprovação do resultado local.

---

## 2. Decisões fechadas

| Item | Definição |
|---|---|
| Escopo | Página única: hero + cardápio completo (4 categorias) + diferenciais + footer |
| Hero | Hambúrguer 3D real em Three.js, estilo cartoon, gira 360° com arraste + auto-rotação |
| Dados | Cardápio fictício (detalhado na seção 6) |
| Fotos dos itens | Placeholders no código (gradiente + emoji + nome) — sem gerar imagens |
| Pedido | 1 CTA geral "Pedir no WhatsApp" (flutuante + no hero), número fictício, sem carrinho |
| Idioma | Só PT-BR |
| Stack | Estático: HTML + CSS + JS modular (ES modules). Three.js via CDN. Sem framework, sem build. |
| Deploy | Fora de escopo nesta rodada |

---

## 3. Arquitetura

Site estático, sem etapa de build. Servido como arquivos — em dev por um servidor
local simples (para os ES modules funcionarem), em produção subindo a pasta.

```
Burger/
├─ CLAUDE.md                    # regras do agente (cérebro) — lido a cada sessão
├─ index.html                   # marcação única da página
├─ assets/
│  ├─ css/
│  │  └─ style.css              # todo o estilo (tokens + componentes + responsivo)
│  └─ js/
│     ├─ main.js                # bootstrap: importa os módulos, liga tudo
│     ├─ burger3d.js            # cena Three.js do hambúrguer
│     ├─ menu.js                # renderiza o cardápio a partir de data/menu.js
│     └─ ui.js                  # header fixo, scroll suave, botão flutuante, scroll-reveal
├─ data/
│  └─ menu.js                   # export const MENU = [...]  (edição fácil dos itens/preços)
├─ referencias/
│  ├─ royal-burguer-ref-1.png   # imagens do ChatGPT (base do visual)
│  └─ royal-burguer-ref-2.png
├─ .claude/
│  └─ launch.json               # servidor local para o preview
└─ docs/
   ├─ spec-design.md            # fonte de verdade visual (paleta/tipo/tom) — resumo desta spec
   ├─ memoria.md                # decisões e aprendizados, atualizado durante o projeto
   └─ superpowers/specs/2026-09-10-royal-burger-cardapio-design.md   # este arquivo
```

### Módulos (o que cada um faz, como se usa, do que depende)

- **`data/menu.js`** — só dados. `export const MENU` (array de categorias). Nenhuma
  dependência. É o arquivo que o cliente edita para mexer no cardápio.
- **`assets/js/menu.js`** — recebe `MENU`, gera o HTML dos blocos de categoria e
  cards, injeta no container `#cardapio`. Depende de `data/menu.js` e do DOM.
- **`assets/js/burger3d.js`** — exporta `initBurger3D(canvasEl)`. Cria cena, câmera,
  luzes, monta o hambúrguer procedural, trata arraste/auto-rotação/zoom, controla o
  render loop. Depende de `THREE` (global via CDN). Sem dependência do resto do site.
- **`assets/js/ui.js`** — comportamentos de página: header que encolhe no scroll,
  scroll suave das âncoras, botão WhatsApp flutuante (aparece após rolar o hero),
  scroll-reveal dos cards via `IntersectionObserver`. Depende só do DOM.
- **`assets/js/main.js`** — ponto de entrada (`<script type="module">`). Importa os
  módulos acima e chama os inicializadores quando o DOM está pronto.

### Config central

Um objeto no topo de `main.js` (ou `data/menu.js`) com os valores que o cliente
troca com mais frequência:

```js
export const CONFIG = {
  whatsapp: "5511987654321",           // número fictício
  mensagemPadrao: "Olá! Quero fazer um pedido no Royal Burguer.",
  instagram: "https://instagram.com/royalburguer",
  endereco: "Rua das Brasas, 123 — Centro, São Paulo/SP",
  horario: "Ter a Dom, 18h às 23h30",
};
```

O link de WhatsApp é montado como
`https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagemPadrao)}`.

---

## 4. Design visual

Derivado das duas imagens de referência (`referencias/`).

### Paleta (tokens CSS)

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#F7EEDD` | fundo principal |
| `--cream-deep` | `#EFE0C6` | fundo alternado de seção, cards |
| `--brown-900` | `#3D2415` | texto principal, wordmark |
| `--brown-600` | `#9B4B2A` | faixas onduladas, seção "diferenciais" |
| `--gold` | `#F2A93B` | CTAs, preços, destaques, ícones |
| `--gold-dark` | `#D98E1F` | hover de botão dourado |
| `--red` | `#D8452B` | accent / urgência / badge "novo" |
| `--white` | `#FFFFFF` | contraste, texto sobre marrom |

Contraste: texto marrom-900 sobre creme e sobre dourado passa AA. Texto branco
sobre marrom-600 passa AA. Não usar dourado para texto pequeno sobre creme.

### Tipografia (Google Fonts)

| Papel | Fonte | Peso / tamanho |
|---|---|---|
| Wordmark "Royal Burguer" | **Baloo 2** | 800 · ~clamp(2rem, 6vw, 3.5rem) |
| Títulos de seção | **Poppins** | 700 · clamp(1.6rem, 4vw, 2.5rem) |
| Nome de item / subtítulos | **Poppins** | 600 · 1.1rem |
| Corpo, descrições | **Inter** | 400/500 · 1rem (16px), linha 1.6 |
| Preço | **Poppins** | 700 · 1.15rem, cor `--gold-dark` |

Fallback: `Baloo 2` → `system-ui`; `Poppins`/`Inter` → `system-ui, sans-serif`.

### Assinatura visual

- **Divisórias em onda** entre seções: SVG inline com curva orgânica (não a onda
  genérica de gerador — curva mais "derretida", combinando com as refs).
- **Cards**: cantos ~16px, sombra macia (`0 8px 24px rgba(61,36,21,.12)`), hover
  levanta 4px e intensifica a sombra, transição 200ms.
- **Logo**: coroa 👑 estilizada sobre um hambúrguer simplificado + wordmark. Feito
  em SVG inline (não emoji) para nitidez.
- **Textura**: leve grão/ruído opcional no fundo creme via `background-image` data-URI
  de baixo peso — só se não pesar.

### Tom de voz

Apetitoso, caloroso, "premium acessível". Frases curtas.
- Slogan hero: **"Sabor de verdade em cada mordida."**
- Apoio: **"Mais que um hambúrguer, uma experiência."**
- CTA: **"Pedir no WhatsApp"**, **"Ver Cardápio"**.

---

## 5. Estrutura da página

### 5.1 Header (fixo)
Logo à esquerda; à direita âncoras **Cardápio** e **Contato** + botão **Pedir no
WhatsApp** (dourado). No scroll além de ~80px: reduz altura, ganha sombra e fundo
creme sólido. Em mobile: âncoras viram um menu compacto (ou somem, deixando só o
logo + botão WhatsApp).

### 5.2 Hero
- Coluna de texto: wordmark, slogan, parágrafo curto, botões "Ver Cardápio"
  (rola até `#cardapio`) e "Pedir no WhatsApp".
- Coluna visual: `<canvas>` com o hambúrguer 3D. Abaixo, dica discreta
  "🖱️ arraste para girar" + botões `–`/`+` de zoom.
- Fundo creme com divisória em onda marrom-600 na base.
- Desktop: 2 colunas (texto | 3D). Tablet/mobile: empilha — 3D primeiro, depois texto.

### 5.3 Barra de categorias
Faixa com 4 itens clicáveis (ícone SVG + rótulo): **Hambúrgueres · Porções ·
Bebidas · Sobremesas**. Clique = scroll suave até o bloco correspondente.
Sticky logo abaixo do header (opcional) para navegar o cardápio longo.

### 5.4 Cardápio (`#cardapio`)
Quatro blocos, um por categoria. Cada bloco: título + (opcional) linha de apoio +
grid de cards.

**Card de item:**
- Área visual (proporção 4:3): gradiente da categoria + emoji grande centralizado
  + nome curto em marca d'água. Cada categoria tem seu par de cores de gradiente.
- Nome do item (Poppins 600).
- Descrição (Inter, 2–3 linhas, `line-clamp` se estourar).
- Preço (Poppins 700, dourado-escuro).
- Badge opcional no canto: "Mais pedido" ou "Novo" (fundo `--red`).

Grid: `repeat(auto-fill, minmax(260px, 1fr))`, gap 24px. Cards aparecem com
scroll-reveal (fade + subida de 12px), escalonado por índice.

Gradientes por categoria (placeholder visual):
- Hambúrgueres: `#F2A93B → #D8452B` · emoji 🍔
- Porções: `#F2A93B → #9B4B2A` · emoji 🍟
- Bebidas: `#E8B24A → #6BA292` · emoji 🥤
- Sobremesas: `#E88AA0 → #9B4B2A` · emoji 🍨

### 5.5 Diferenciais
Faixa marrom-600, texto branco. 3 colunas com ícone SVG + título + 1 linha:
- **Ingredientes frescos** — pão e blend feitos todo dia.
- **Feito na hora** — seu pedido começa quando você pede.
- **Entrega rápida** — quentinho na sua porta.

### 5.6 Footer
Fundo marrom-900, texto creme. Logo reduzido; colunas: contato (endereço/horário
fictícios), WhatsApp, Instagram. Linha final: "© 2026 Royal Burguer — Cardápio
digital. Projeto demonstrativo." + observação discreta "Dados e preços fictícios."

### 5.7 Botão flutuante WhatsApp
Canto inferior direito, círculo dourado com ícone do WhatsApp. Escondido enquanto
o hero está visível; entra (fade + slide) depois. `aria-label` descritivo.

---

## 6. Cardápio fictício (conteúdo)

Preços em BRL. Estrutura em `data/menu.js`:
`{ categoria, emoji, itens: [{ nome, descricao, preco, tag? }] }`.

### 🍔 Hambúrgueres
| Item | Descrição | Preço | Tag |
|---|---|---|---|
| Royal Clássico | Blend 180g, queijo prato, alface, tomate, cebola roxa e molho da casa no pão brioche. | R$ 28,00 | Mais pedido |
| Royal Bacon | Blend 180g, cheddar, bacon crocante, cebola caramelizada e maionese defumada. | R$ 34,00 | — |
| Royal Duplo | Dois blends de 160g, queijo prato duplo, picles e molho especial. | R$ 39,00 | — |
| Royal Cheddar | Blend 180g afogado em cheddar cremoso, com cebola crispy. | R$ 33,00 | — |
| Royal Veggie | Hambúrguer de grão-de-bico e beterraba, queijo, rúcula e tomate seco. | R$ 30,00 | Novo |

### 🍟 Porções
| Item | Descrição | Preço | Tag |
|---|---|---|---|
| Batata Rústica | 400g com alecrim e páprica defumada. | R$ 22,00 | — |
| Onion Rings | 10 anéis de cebola empanados, com molho barbecue. | R$ 24,00 | — |
| Batata Cheddar & Bacon | Batata palito coberta com cheddar cremoso e bacon. | R$ 29,00 | Mais pedido |
| Frango Crispy | 8 iscas de frango empanadas, com molho honey mustard. | R$ 27,00 | — |

### 🥤 Bebidas
| Item | Descrição | Preço | Tag |
|---|---|---|---|
| Refrigerante Lata | Coca-Cola, Guaraná, Sprite ou Fanta — 350ml. | R$ 6,00 | — |
| Suco Natural | Laranja, limão ou maracujá — 400ml. | R$ 9,00 | — |
| Milkshake | Chocolate, morango ou ovomaltine — 400ml. | R$ 18,00 | Mais pedido |
| Água | Sem gás ou com gás — 500ml. | R$ 4,00 | — |
| Cerveja Long Neck | Puro malte, gelada. | R$ 10,00 | — |

### 🍨 Sobremesas
| Item | Descrição | Preço | Tag |
|---|---|---|---|
| Brownie com Sorvete | Brownie quente de chocolate meio amargo com bola de creme. | R$ 16,00 | — |
| Petit Gâteau | Bolinho com recheio de chocolate quente e sorvete de creme. | R$ 18,00 | Mais pedido |
| Cheesecake de Frutas Vermelhas | Fatia cremosa com calda de frutas vermelhas. | R$ 15,00 | — |

Total: 17 itens.

---

## 7. Hambúrguer 3D (Three.js)

**Entrega:** `assets/js/burger3d.js` exportando `initBurger3D(canvasEl)`.

### Cena
- `WebGLRenderer` com `antialias: true`, `alpha: true` (fundo transparente para
  aparecer o creme), `setPixelRatio(Math.min(devicePixelRatio, 2))`.
- Câmera `PerspectiveCamera`, fov ~40, olhando levemente de cima.
- Luzes: `AmbientLight` suave + `DirectionalLight` principal (com sombra) +
  `PointLight` de preenchimento quente. `PCFSoftShadowMap`.
- Chão invisível recebendo sombra (`ShadowMaterial`), para o hambúrguer "assentar".

### Modelo (procedural, cartoon — sem texturas)
Grupo com camadas empilhadas de baixo para cima, cada uma `MeshStandardMaterial`
com `roughness` alto:
1. **Pão inferior** — cilindro achatado, topo levemente abaulado. Cor `#D9A15B`.
2. **Carne** — cilindro de perfil irregular (leve deslocamento de vértices ou
   `TorusGeometry` achatado), cor `#5A3825`.
3. **Queijo** — placa fina (box escalado) girada ~4°, com "pontas" descendo nos
   cantos. Cor `#F2B33D`.
4. **Alface** — anel ondulado (torus com ruído no perfil, ou várias esferas
   achatadas na borda), verde `#6FBF3B`.
5. **Tomate** — disco fino vermelho `#C8402C`.
6. **Pão superior** — meia-esfera (`SphereGeometry` com `thetaLength = π/2`)
   escalada, cor `#E0A85C`, + 6–8 sementes (mini esferas bege) na superfície.

Escala final normalizada para caber na câmera. `castShadow`/`receiveShadow` nas
camadas.

### Interação
- **Arraste** (mouse + touch): gira o grupo em Y (horizontal) e X (vertical,
  com limite ±0.5rad para não virar de cabeça para baixo). Sem biblioteca de
  controles — handler próprio de `pointerdown/move/up`.
- **Auto-rotação**: quando não há interação há >2s, gira devagar em Y
  (~0.3 rad/s). Retoma após cada interação.
- **Zoom**: botões `–`/`+` na UI aproximam/afastam a câmera entre limites.
  **Não** capturar `wheel` (deixa a página rolar normalmente).
- Cursor: `grab` / `grabbing`.

### Performance e robustez
- `IntersectionObserver` no canvas: `requestAnimationFrame` só roda enquanto o
  canvas está visível; pausa quando sai da viewport.
- `ResizeObserver` para reajustar renderer/câmera ao container.
- Respeitar `prefers-reduced-motion`: desliga a auto-rotação.
- **Fallback sem WebGL**: se `WebGLRenderingContext` indisponível ou o contexto
  falhar, esconde o canvas e mostra um bloco com emoji 🍔 grande + a mesma dica
  textual. O site continua 100% funcional.
- Descarte: função de cleanup libera geometrias/materiais/renderer (bom para
  evitar leak se algum dia virar SPA; aqui é barato incluir).

### Versão do Three.js
Carregar de CDN, versão fixada no `src`. Duas opções (decidir no plano):
- **Build clássico com global `THREE`** (ex.: r128 via cdnjs) — `<script>` simples
  antes do módulo. Mais à prova de erro para host estático em subpasta.
- **ES module + importmap** com build atual — mais moderno, exige `importmap`.

Preferir a primeira salvo motivo forte. Testar servido de uma subpasta
(`/burger/`) para garantir que os caminhos relativos batem no futuro deploy.

---

## 8. Responsividade

Mobile-first. Breakpoints:
- **≤600px**: tudo em 1 coluna. Hero empilha (3D ~320px de altura, depois texto).
  Header só logo + botão WhatsApp. Cards 1 por linha.
- **601–1024px**: cardápio 2 colunas; hero ainda pode empilhar ou ir a 2 colunas
  a partir de ~900px.
- **≥1025px**: hero 2 colunas, cardápio 3–4 colunas conforme largura.

Canvas 3D: altura por `clamp`, largura 100% do container; `ResizeObserver` cuida
do resto. Imagens de referência não vão para produção (ficam só em `referencias/`).

---

## 9. Acessibilidade

- HTML semântico: `<header> <main> <section> <footer>`, um `<h1>` (wordmark/hero),
  `<h2>` por seção, `<h3>` por categoria.
- Todos os botões são `<button>` ou `<a>` reais, com foco visível.
- Links de âncora com `scroll-behavior: smooth` + fallback JS; respeitar
  `prefers-reduced-motion` (sem smooth, sem reveal animado, sem auto-rotação).
- Contraste AA (ver seção 4).
- `<canvas>` com `aria-label="Hambúrguer 3D interativo"` e texto alternativo
  no fallback. Zona de arraste não deve prender o foco do teclado.
- Botão flutuante com `aria-label="Pedir no WhatsApp"`.

---

## 10. Testes / verificação

Sem framework de teste (projeto estático pequeno). Verificação manual + checagens:

1. **Roda local**: `.claude/launch.json` sobe servidor estático; página abre sem
   erro no console.
2. **3D**: hambúrguer aparece, gira no arraste (mouse e touch via devtools),
   auto-rotação após ociosidade, zoom nos botões, scroll da página não é
   sequestrado.
3. **Fallback**: forçar falha de WebGL (flag do navegador) → emoji aparece, resto
   funciona.
4. **Cardápio**: os 17 itens renderizam a partir de `data/menu.js`; editar um
   preço no arquivo reflete na página.
5. **WhatsApp**: os 3 pontos de CTA (hero, header, flutuante) abrem
   `wa.me/5511987654321` com a mensagem padrão.
6. **Responsivo**: 375px, 768px, 1280px, 1920px — sem overflow horizontal, hero
   legível, cards ok.
7. **Reduced motion**: com a preferência ligada, nada anima.
8. **Lighthouse** (informativo): mira ≥90 em Performance/Best Practices/SEO/A11y.

---

## 11. Fora de escopo (YAGNI)

Bilíngue · carrinho/checkout · pedido por item · qualquer backend/CMS · pipeline
de geração de imagens (`imagens.md`) · giro do produto por fotos 360° · múltiplas
páginas · animações além de scroll-reveal + hover · PWA/offline · analytics ·
deploy (rodada seguinte).

---

## 12. Cérebro do projeto (método do vídeo)

Além desta spec, a implementação cria:
- **`CLAUDE.md`** — regras do agente: sempre ler `docs/spec-design.md` e
  `docs/memoria.md`; manter HTML/CSS/JS puro (não migrar para framework); avisar
  antes de contrariar uma decisão registrada; dados são fictícios.
- **`docs/spec-design.md`** — recorte visual desta spec (seções 4 e 5), como fonte
  de verdade de paleta/tipografia/tom para iterações futuras.
- **`docs/memoria.md`** — log de decisões e aprendizados, atualizado ao longo do
  trabalho.
