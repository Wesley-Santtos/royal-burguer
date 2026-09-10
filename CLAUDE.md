# Royal Burguer — Cardápio Digital

Site estático de página única: cardápio digital de hamburgueria (fictícia) com um
hambúrguer 3D no hero.

## Sempre leia antes de trabalhar
- `docs/spec-design.md` — fonte de verdade visual (paleta, tipografia, tom)
- `docs/memoria.md` — decisões e aprendizados do projeto
- `docs/superpowers/specs/2026-09-10-royal-burger-cardapio-design.md` — spec completa

## Regras
- **Stack fixa:** HTML + CSS + JavaScript puro. Não migrar para React/Vue/framework.
  Não adicionar bundler/etapa de build. Three.js só via CDN.
- **Dados são fictícios** (cardápio, preços, WhatsApp, endereço). Editáveis em
  `data/menu.js`.
- Se um pedido contradiz uma decisão registrada em `docs/memoria.md` ou na spec,
  **pare e avise antes de mudar.**
- Toda decisão nova de design/arquitetura vai para `docs/memoria.md`.
- Mudança visual (cor, fonte, espaçamento estrutural) atualiza `docs/spec-design.md`.

## Rodar local
Servidor estático na porta 5500 (config em `.claude/launch.json`):
`python -m http.server 5500` na raiz do projeto, depois abrir `http://localhost:5500/`.

## Estrutura
```
index.html              marcação única
assets/css/style.css     todo o estilo
data/menu.js             RB_CONFIG + RB_MENU — dados do cardápio (o que o cliente edita)
assets/js/burger3d.js    cena Three.js
assets/js/menu.js        renderiza o cardápio
assets/js/ui.js          header, scroll suave, botão flutuante, scroll-reveal
assets/js/main.js        liga tudo
referencias/             imagens base do visual (não vão para produção)
```
