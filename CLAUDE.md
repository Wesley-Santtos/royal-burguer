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
- Fotos dos itens: placeholder (emoji da categoria) até ter foto real. Trocar
  preenchendo `img` em `data/menu.js` (ver `docs/imagens.md`). Foto real usa
  `object-fit: contain` + `drop-shadow` (sem máscara) — placeholder usa o blob
  colorido. Ver `docs/memoria.md` 2026-09-11.
- "Lanche do Momento": bloco `#destaque`, item vem do `destaque: true` em
  `data/menu.js` (**só um item** deve ter essa flag). O formato já mudou
  algumas vezes a pedido do cliente (3D Three.js → vídeo → 3D → foto estática
  via `featureImg`) — checar `docs/memoria.md` pra saber a versão atual antes
  de mexer.
- Se um pedido contradiz uma decisão registrada em `docs/memoria.md` ou na spec,
  **pare e avise antes de mudar.**
- Decisão nova de design/arquitetura → registrar em `docs/memoria.md`.

## Rodar local
`python -m http.server 5500` na raiz, abrir `http://localhost:5500/`.
(Config em `.claude/launch.json`.)

## Deploy
- **GitHub Pages** (principal): https://wesley-santtos.github.io/royal-burguer/
  — `git push` na `main`, o Pages rebuilda sozinho.
- **doutorlead.com/burger** (Firebase, projeto `dr-lead`): o cliente decidiu
  usar esse caminho mesmo sabendo que ele é servido pelo projeto do CRM. Pasta
  `D:\2. MINHAS EMPRESAS\14. drlead\public\burger\` recebe uma cópia manual
  deste projeto (`index.html`, `assets/`, `data/` — nunca `docs/` nem
  `referencias/`) a cada mudança; o deploy real (`firebase deploy --only
  hosting`) republica o CRM junto, então normalmente só se sobe pra um canal de
  preview (`firebase hosting:channel:deploy burger-preview`) e o deploy de
  produção fica para o cliente aprovar/rodar.
- Os dois deploys **não compartilham código** — são cópias sincronizadas manualmente.

## Estrutura
```
index.html
assets/css/style.css
assets/img/hero.jpg        imagem do hero (recorte da referência)
assets/img/itens/          fotos reais dos itens (quando existirem)
assets/img/lanche-momento.jpg  foto do bloco "Lanche do Momento" (featureImg)
data/menu.js               RB_CONFIG + RB_MENU — o que o cliente edita
assets/js/menu.js          render do cardápio + bloco destaque + barra de categorias
assets/js/ui.js            botão flutuante, scroll suave, categoria ativa, reveal
assets/js/main.js          liga tudo
referencias/               imagens base do visual (não vão para produção)
```
