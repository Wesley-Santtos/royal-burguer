# Royal Burguer — Spec de Design (fonte de verdade visual)

Layout de referência: **mockup do cliente** + `referencias/royal-burguer-ref-2.png`.
Site **voltado para celular** (moldura máx. 480px).

## Paleta (tokens em `assets/css/style.css`)

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#F6EFE0` | fundo da moldura |
| `--cream-2` | `#EFE3CC` | variações |
| `--white` | `#FFFFFF` | fundo do cardápio |
| `--ink` | `#3B2011` | texto, nomes, rodapé |
| `--brown` | `#9E4A1F` | seção CTA, ícone ativo |
| `--brown-soft` | `#B15E33` | painéis dos itens, pílulas de categoria |
| `--gold` | `#F4A93C` | botões, selo, categoria ativa |
| `--gold-dark` | `#D98E1F` | hover |
| `--red` | `#D8452B` | selo do item ("Mais pedido" / "Novo") |

## Tipografia (Google Fonts)

| Papel | Fonte | Peso |
|---|---|---|
| Títulos, nomes de item, marca | Baloo 2 | 700 / 800 |
| Corpo, descrições | Inter | 400–600 |
| Frase manuscrita (rodapé) | Caveat | 700 |

## Componentes

- **Hero:** imagem única `assets/img/hero.jpg`, full-width da moldura.
- **Barra de categorias:** sticky no topo; ícone de linha (SVG marrom) + pílula
  marrom com o nome em caixa alta. Categoria ativa = pílula dourada.
- **Card do item (`.dish`):** foto redonda (Ø ~116px, borda branca 4px, sombra)
  sangrando ~14px para a esquerda; nome em Baloo 2 sobre o branco; painel
  `--brown-soft` arredondado (raio 18px) com descrição branca + preço em `#FFE6BF`.
  Selo opcional em `--red` na base da foto.
- **Lanche do Momento (`.feature`):** bloco em `--cream` entre a barra de
  categorias e o cardápio. Selo dourado "⭐ Lanche do Momento", hambúrguer 3D
  (Three.js, cartoon, gira 360°) em palco de até 300px, dica "↻ arraste para
  girar", nome (Baloo 2), descrição, preço em `--brown`, botão WhatsApp.
- **CTA final:** faixa `--brown`, texto creme, botão dourado.
- **Rodapé:** `--ink`, texto creme, marca + frase manuscrita + contato + links.
- **Botão flutuante WhatsApp:** verde, canto inferior direito, aparece após o hero.

## Movimento
Discreto: scroll-reveal (fade + subida) nos cards, hover/press nos botões.
Tudo desligado sob `prefers-reduced-motion`.
