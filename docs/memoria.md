# Memória do projeto — Royal Burguer

Log de decisões e aprendizados. Mais recente no topo.

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
