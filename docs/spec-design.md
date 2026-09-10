# Royal Burguer — Spec de Design (fonte de verdade visual)

Recorte da spec completa. Qualquer mudança de cor, fonte ou espaçamento estrutural
é registrada aqui.

## Referências
`referencias/royal-burguer-ref-1.png` e `royal-burguer-ref-2.png` (geradas no
ChatGPT). Base da paleta, do wordmark e das faixas onduladas.

## Paleta (tokens CSS em `assets/css/style.css`)

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#F7EEDD` | fundo principal |
| `--cream-deep` | `#EFE0C6` | fundo alternado, base dos cards |
| `--brown-900` | `#3D2415` | texto principal, wordmark, footer |
| `--brown-600` | `#9B4B2A` | faixas onduladas, seção diferenciais |
| `--gold` | `#F2A93B` | CTAs, preços, destaques |
| `--gold-dark` | `#D98E1F` | hover de botão, texto de preço |
| `--red` | `#D8452B` | accent, badge de item |
| `--white` | `#FFFFFF` | texto sobre marrom |

## Tipografia (Google Fonts)

| Papel | Fonte | Peso |
|---|---|---|
| Wordmark | Baloo 2 | 800 |
| Títulos de seção | Poppins | 700 |
| Nome de item | Poppins | 600 |
| Corpo / descrições | Inter | 400 / 500 |
| Preço | Poppins | 700 (cor `--gold-dark`) |

Fallback: `Baloo 2` → `system-ui`; `Poppins` / `Inter` → `system-ui, sans-serif`.

## Elementos de assinatura
- Divisórias em onda entre seções (SVG inline, curva orgânica).
- Cards: raio 16px, sombra `0 8px 24px rgba(61,36,21,.12)`, hover levanta 4px.
- Logo em SVG inline (coroa + hambúrguer) + wordmark em Baloo 2.
- Gradientes de placeholder por categoria:
  - Hambúrgueres `#F2A93B → #D8452B` · 🍔
  - Porções `#F2A93B → #9B4B2A` · 🍟
  - Bebidas `#E8B24A → #6BA292` · 🥤
  - Sobremesas `#E88AA0 → #9B4B2A` · 🍨

## Tom de voz
Apetitoso, caloroso, premium acessível. Frases curtas.
- Slogan: "Sabor de verdade em cada mordida."
- Apoio: "Mais que um hambúrguer, uma experiência."
- CTA: "Pedir no WhatsApp" / "Ver Cardápio".

## Movimento
Discreto: scroll-reveal (fade + subida 12px) e hover dos cards. Auto-rotação lenta
do 3D quando ocioso. Tudo desligado sob `prefers-reduced-motion`.
