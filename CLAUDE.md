# Royal Burguer — Cardápio Digital

Site estático de página única, **voltado para celular** (moldura máx. 480px,
centralizada no desktop). Cardápio de hamburgueria fictícia.

## Sempre leia antes de trabalhar
- `docs/spec-design.md` — fonte de verdade visual (paleta, tipografia, tom)
- `docs/memoria.md` — decisões e aprendizados do projeto
- `docs/imagens.md` — prompts para gerar as fotos reais dos itens
- `docs/superpowers/specs/2026-09-10-royal-burger-cardapio-design.md` — spec

## Regras
- **Stack fixa:** HTML + CSS + JavaScript puro (scripts clássicos, sem build,
  sem framework). Nada de bundler.
- **Mobile-first sempre.** O layout de referência é o mockup enviado pelo cliente
  (hero = imagem da identidade; cards horizontais com foto redonda + painel marrom).
- **Dados fictícios** (cardápio, preços, WhatsApp, endereço) — em `data/menu.js`.
- Fotos dos itens: placeholder (emoji da categoria). Trocar por foto preenchendo
  `img` em `data/menu.js` (ver `docs/imagens.md`).
- Se um pedido contradiz uma decisão registrada em `docs/memoria.md` ou na spec,
  **pare e avise antes de mudar.**
- Decisão nova de design/arquitetura → registrar em `docs/memoria.md`.

## Rodar local
`python -m http.server 5500` na raiz, abrir `http://localhost:5500/`.
(Config em `.claude/launch.json`.)

## Estrutura
```
index.html
assets/css/style.css
assets/img/hero.jpg        imagem do hero (recorte da referência)
assets/img/itens/          fotos reais dos itens (quando existirem)
data/menu.js               RB_CONFIG + RB_MENU — o que o cliente edita
assets/js/menu.js          render do cardápio (cards + barra de categorias)
assets/js/ui.js            botão flutuante, scroll suave, categoria ativa, reveal
assets/js/main.js          liga tudo
referencias/               imagens base do visual (não vão para produção)
```
