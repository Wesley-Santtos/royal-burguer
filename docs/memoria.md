# Memória do projeto — Royal Burguer

Log de decisões e aprendizados. Mais recente no topo.

## 2026-09-10 — Implementação inicial

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
