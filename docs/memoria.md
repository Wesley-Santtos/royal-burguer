# Memória do projeto — Royal Burguer

Log de decisões e aprendizados. Mais recente no topo.

## 2026-09-11 — Segunda foto real: Royal Bacon (card do cardápio)

`burger2.png` (fundo já transparente) → recorte + respiro + resize →
`assets/img/itens/royal-bacon.webp` (~107 KB). `img` do Royal Bacon em
`data/menu.js` preenchido — mesmo tratamento das fotos reais (sem máscara,
`drop-shadow`). Já tinha `featureImg` pro "Lanche do Momento"; agora também
tem foto no card da lista.

## 2026-09-11 — Remove a tábua da foto (segmentação com IA)

Pedido final: nada de fundo na foto do "Lanche do Momento", só cor sólida (a
do `--cream` da página). O CSS já estava assim, mas a **tábua de madeira** da
foto continuava aparecendo — cliente considerava ela parte do "fundo" a tirar.

- Instalado `rembg` (modelo `bria-rmbg-2.0`, ~1GB, baixado uma vez em
  `~/.rembg/models/`) — remoção de fundo por segmentação, não por cor.
  Rodado sobre o `burger.png` original (com a tábua) e isolou só o
  hambúrguer, limpo, sem halo.
- Recorte + respiro (5%) + resize + `assets/img/lanche-momento.webp`
  atualizado (900×826, ~197 KB).
- `.feature__stage`: `aspect-ratio` ajustado pra proporção nova (`900/826`),
  `max-width` reduzido pra 340px (a imagem sem tábua é mais "alta e estreita").
- Resultado: hambúrguer flutuando puro sobre o creme sólido da seção, sem
  nenhum elemento de cena.

## 2026-09-11 — Ajustes finos: fundo liso, respiro no botão, nomes à direita

- `.feature__stage`: tirou o gradiente também — sem fundo nenhum, a foto flutua
  direto sobre o `--cream` da seção (só a `drop-shadow` da própria foto).
- `.feature`: mais respiro embaixo do botão "Pedir no WhatsApp"
  (`padding-bottom` 0.4rem → 1.4rem) antes de entrar no branco do cardápio.
- `.dish__name`: `text-align: right` — nomes dos itens (Royal Clássico, Royal
  Bacon, Royal Duplo...) alinhados à direita em vez de esquerda.

## 2026-09-11 — "Lanche do Momento": tira "arraste para girar"

Cliente pediu pra remover de vez. Fazia sentido no 3D, ficou como legado
quando virou foto (eu já tinha achado estranho, mas segui a referência dele
por fidelidade — agora ele confirmou que não quer). `.feature__hint` some do
`menu.js` e a regra correspondente sai do CSS.

## 2026-09-11 — "Lanche do Momento": sem moldura

Cliente pediu pra remover as bordas do palco. Tirei `border-radius`,
`overflow: hidden` e o `box-shadow` do `.feature__stage` — o gradiente agora
funde direto com o `--cream` da seção (`radial-gradient(...→ var(--cream)
100%)`), sem contorno de "cartão" nenhum. A foto fica flutuando na página, só
com a sombra própria dela (`drop-shadow` na `.feature__photo`).

## 2026-09-11 — "Lanche do Momento": fundo infinito

Cliente mandou `burger.png` (mesmo Royal Bacon, agora recortado com fundo
transparente) pedindo "fundo infinito" — o efeito de estúdio de fotografia de
produto onde não tem emenda visível entre o chão e o fundo.

- Recorte + respiro (6%) + resize + `assets/img/lanche-momento.webp` (troca o
  `.jpg` da tábua de madeira, ~84 KB). `featureImg` do Royal Bacon atualizado.
- `.feature__stage`: em vez de `object-fit: cover` cortando uma foto de cena,
  agora é um palco com `radial-gradient` (creme claro no topo → tom mais
  profundo embaixo, tons da paleta) e a foto entra com `object-fit: contain` +
  `drop-shadow` — mesmo tratamento das fotos reais dos cards do cardápio.
- Proporção do palco ajustada pra imagem nova (`900/657`).

## 2026-09-11 — "Lanche do Momento": foto estática (3D removido de novo)

Cliente mandou `Lanche do momento.jfif` — um mockup gerado por IA do bloco
inteiro (selo + foto + textos + botão). Só a **foto** (burger Royal Bacon numa
tábua de madeira, com alecrim e jarra de cobre) era conteúdo novo; o resto já
existe como HTML/CSS reais no site.

- Recortada (removi o selo e o texto "arraste para girar" que vieram
  embutidos na imagem), redimensionada (900px), exportada JPEG ~94 KB →
  `assets/img/lanche-momento.jpg`.
- `data/menu.js`: novo campo opcional `featureImg` no item com
  `destaque: true` — foto grande só pro bloco "Lanche do Momento", separada da
  `img` (miniatura do card no cardápio). Royal Bacon tem as duas.
- **Three.js removido outra vez**: `burger3d.js` apagado, script do CDN e
  `initFeature` fora do `main.js`. Sem interação de arrastar (é foto estática,
  não 3D) — tirei o hint "arraste para girar" do HTML real também.
- `.feature__stage` deixou de ser quadrado: agora usa a proporção real da foto
  (`900/577`), `max-width: 380px`, cantos 22px, sombra — mesma linguagem visual
  usada quando era vídeo.
- **Nota de ambiente:** o preview local voltou a servir conteúdo antigo depois
  de editar os arquivos (mesmo com o servidor certo rodando) — parece cache de
  disco do navegador do preview, não do `python -m http.server`. Contornado
  buscando os `.js` com `fetch(...,{cache:'no-store'})` e rodando `eval` neles
  na página já aberta. Não afeta o site publicado (GitHub Pages/Firebase).

## 2026-09-11 — Primeira foto real: Royal Clássico

Cliente mandou uma foto isolada (fundo transparente) do cheeseburger clássico.

- Processada com Pillow: recorte pra caixa do conteúdo + 4% de respiro +
  redimensionada (lado maior 900px) + exportada **WebP** (3,3 MB → 158 KB).
  Salva em `assets/img/itens/royal-classico.webp`.
- `data/menu.js`: `img` do Royal Clássico preenchido.
- **Tratamento visual diferente do placeholder:** fotos reais não usam mais a
  máscara blob — aparecem inteiras (`object-fit: contain`) com
  `filter: drop-shadow(...)` acompanhando o contorno do produto, igual à
  referência do cliente. O placeholder (sem foto) continua com o blob colorido
  + emoji. Ver `.dish__photo img` vs `.dish__photo.is-placeholder` em
  `assets/css/style.css`.
- **Nota pra próxima sessão:** durante os testes locais um `python -m
  http.server 5500` antigo ficou preso servindo uma pasta desatualizada
  (processo vivo de uma janela de trabalho anterior). Se o preview local
  parecer "não atualizar" mesmo com o arquivo certo no disco, mate o processo
  na porta 5500 e suba de novo a partir da raiz do projeto.

## 2026-09-11 — Card do cardápio: foto em blob (fiel ao mockup)

Cliente reenviou a referência do card ("Nome Hamburger" / "Informações do
Hamburger") pedindo pra seguir mais de perto como o produto se apresenta.
Ajustado só CSS (`.dish__photo` / `.dish__panel`), sem mudar a estrutura:

- Foto: de círculo (Ø116, borda branca) → **blob orgânico** 142px,
  `border-radius: 38% 38% 38% 12%`, sem borda, sombra mais funda.
- Painel: raio uniforme 18px → **assimétrico** `34px 20px 20px 20px`, o canto
  grande encaixa com a curva da foto.
- Overlap maior (`margin-left: -64px`, foto `left: -18px`) pra foto "flutuar"
  mais sobre o painel, como no mockup.

## 2026-09-10 — "Lanche do Momento" com 3D 360° (só 1 item)

Cliente quis o 360° de volta, mas **só num item destaque** (não no hero), estilo
**cartoon**. Discutido: foto giratória precisa de ~32 fotos com prato giratório
(IA não serve — giro "tremido"); `.glb` no `<model-viewer>` seria bom mas depende
de achar/baixar um modelo. Escolhido: **Three.js procedural** (já existia no git).

- `assets/js/burger3d.js` restaurado (r128 via cdnjs, global `THREE`). Hambúrguer
  em camadas, arraste p/ girar (mouse+touch), auto-rotação após 2s de ociosidade,
  pausa fora da viewport, fallback 🍔 sem WebGL.
- Novo bloco `#destaque` (`.feature`) entre a barra de categorias e o cardápio.
  Renderizado por `RB.renderFeature()` a partir do item marcado com
  `destaque: true` em `data/menu.js` (hoje: Royal Bacon).
- `main.js`: `fillConfig()` roda **depois** dos renders para pegar o botão
  `[data-wa]` criado dinamicamente no bloco destaque.
- Câmera do 3D ajustada p/ o card pequeno: `baseDist 4.3`, câmera y 1.15.

## 2026-09-10 — Redesign: layout com fotos (mobile-only)

Cliente enviou um mockup e pediu "faça tudo voltado para celular". Mudança de
direção aprovada por ele (contraria a spec original do 3D — avisei antes):

- **Sai o hambúrguer 3D (Three.js).** `burger3d.js` removido.
- **Hero = imagem da identidade.** `assets/img/hero.jpg` é um recorte de
  `referencias/royal-burguer-ref-2.png` (logo + burger em camadas + frase + selo),
  cortado acima da faixa de pílulas. Otimizado p/ ~160KB.
- **Layout "celular"**: `.phone` com `max-width: 480px` centralizado; moldura com
  sombra no desktop. Sem header fixo (a marca já está na imagem do hero).
- **Cards horizontais** (estilo do mockup): foto redonda sangrando pela esquerda +
  painel marrom arredondado com nome (no branco, em cima) + descrição + preço.
- **Barra de categorias sticky** (`top: 0`) com ícones de linha em SVG (marrom) +
  pílulas. `position: sticky` exige que nenhum ancestral tenha `overflow: hidden`
  — por isso o clip do hero ficou só no `.hero`, não no `.phone`.
- **Fotos dos itens**: placeholder = emoji da categoria sobre círculo dourado.
  Prompts para as fotos reais em `docs/imagens.md`; trocar via `img` em
  `data/menu.js`.
- Fontes: **Baloo 2** (títulos/marca), **Inter** (corpo), **Caveat** (frase
  manuscrita do rodapé).

## 2026-09-10 — Implementação inicial (substituída pelo redesign acima)

- **Scripts clássicos em vez de ES modules.** A spec previa ES modules, mas para o
  site funcionar também via `file://` e evitar `importmap`, os scripts são clássicos
  (`<script>` em ordem no `index.html`) com um namespace global mínimo
  (`window.RB_*`). Deploy em subpasta na Hostinger fica mais à prova de erro.
- **Three.js r128 via cdnjs** (`three.min.js`, global `THREE`). Build clássico,
  sem importmap. Versão fixada.
- **Dados unificados em `data/menu.js`**: `RB_CONFIG` (WhatsApp, endereço, horário,
  Instagram) + `RB_MENU` (4 categorias, 17 itens). Preço como número, formatado em
  BRL no render.
- **Placeholder visual dos itens**: gradiente por categoria + emoji + nome em marca
  d'água. Sem imagens reais nesta fase (decisão do cliente).
- **Pedido**: só CTA geral para `wa.me` (hero, header, botão flutuante). Sem
  carrinho, sem pedido por item.
- WhatsApp fictício: `5511987654321`.

- **Feito:** site completo rodando local (hero 3D + 4 categorias + diferenciais +
  footer + botão flutuante). Verificado em 375px e 1280px. Sem overflow horizontal.
  Fallback sem WebGL e sob `prefers-reduced-motion` funcionando.

## 2026-09-10 — Deploy (GitHub Pages, isolado)

- `doutorlead.com` NÃO é Hostinger — é **Firebase Hosting** do projeto `dr-lead`
  (pasta `D:\2. MINHAS EMPRESAS\14. drlead`, CRM Hospital Jardim Botânico).
  Cliente pediu para **não misturar** o burger com esse projeto.
- Site publicado no **GitHub Pages**, repo próprio:
  - repo: https://github.com/Wesley-Santtos/royal-burguer (público, branch `main`, path `/`)
  - URL: **https://wesley-santtos.github.io/royal-burguer/**
- Deploy = `git push` na `main` (o Pages rebuilda sozinho, ~1 min).
- Caminhos são todos relativos → funciona em subpasta sem `<base>`.

## Pendências / próximas rodadas
- Trocar placeholders por fotos reais quando o cliente tiver.
- Cardápio real (hoje é fictício).
