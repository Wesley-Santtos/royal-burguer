# Memória do projeto — Royal Burguer

Log de decisões e aprendizados. Mais recente no topo.

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

## Pendências / próximas rodadas
- Deploy em `doutorlead.com/burger` (Hostinger) — pacote + instruções.
- Trocar placeholders por fotos reais quando o cliente tiver.
- Cardápio real (hoje é fictício).
