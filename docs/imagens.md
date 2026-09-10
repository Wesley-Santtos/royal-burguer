# Imagens do cardápio — prompts para gerar no ChatGPT

O site usa um **placeholder** (emoji da categoria sobre um círculo dourado) até
você trazer as fotos reais. Para cada item, gere a imagem, salve em
`assets/img/itens/` e preencha o campo `img` em `data/menu.js`.

## Especificação técnica (vale para todas)
- **Formato:** quadrado 1:1 (o site recorta em círculo)
- **Fundo:** limpo, claro/neutro ou levemente desfocado — nada de cenário poluído
- **Enquadramento:** o produto centralizado, ocupando ~85% do quadro
- **Luz:** natural, quente, apetitosa
- **Tamanho final:** exportar ~800×800px, salvar como `.jpg` qualidade 80
- **Nome do arquivo:** minúsculo, sem acento, com hífen
  (ex.: `royal-classico.jpg`, `batata-rustica.jpg`)

## Prompt base (cole antes de cada prompt específico)
> Professional food photography, square 1:1, single centered subject filling ~85%
> of the frame, clean soft neutral background, warm natural light, shallow depth of
> field, appetizing, high detail, no text, no props clutter.

## Prompts por item

### Hambúrgueres
| arquivo | prompt específico |
|---|---|
| `royal-classico.jpg` | classic cheeseburger on a brioche bun, 180g beef patty, melted prato cheese, lettuce, tomato, red onion, house sauce |
| `royal-bacon.jpg` | bacon cheeseburger, thick beef patty, cheddar, crispy bacon strips, caramelized onions, smoky mayo dripping |
| `royal-duplo.jpg` | double stacked cheeseburger, two beef patties, double cheese, pickles, special sauce |
| `royal-cheddar.jpg` | cheeseburger drowned in creamy cheddar sauce, crispy fried onion strings on top |
| `royal-veggie.jpg` | veggie burger with chickpea-beet patty, cheese, arugula, sun-dried tomato, whole grain bun |

### Porções
| arquivo | prompt específico |
|---|---|
| `batata-rustica.jpg` | rustic skin-on potato wedges pile, rosemary and smoked paprika, in a small basket |
| `onion-rings.jpg` | golden crispy onion rings stacked, small bowl of barbecue sauce beside |
| `batata-cheddar-bacon.jpg` | french fries loaded with melted cheddar sauce and bacon bits |
| `frango-crispy.jpg` | crispy breaded chicken tenders, honey mustard dip |

### Bebidas
| arquivo | prompt específico |
|---|---|
| `refrigerante-lata.jpg` | ice-cold soda can with water droplets, plain generic red or dark can, condensation |
| `suco-natural.jpg` | glass of fresh orange juice with an orange slice, bright and fresh |
| `milkshake.jpg` | tall chocolate milkshake in a glass, whipped cream, straw |
| `agua.jpg` | clear bottle of sparkling water, minimalist, condensation |
| `cerveja-long-neck.jpg` | frosty long neck beer bottle, unbranded, water droplets |

### Sobremesas
| arquivo | prompt específico |
|---|---|
| `brownie-sorvete.jpg` | warm chocolate brownie with a scoop of vanilla ice cream melting on top |
| `petit-gateau.jpg` | petit gâteau with molten chocolate center flowing out, scoop of vanilla ice cream |
| `cheesecake-frutas.jpg` | slice of creamy cheesecake with red berry compote on top |

## Depois de gerar
1. Salve os arquivos em `assets/img/itens/`.
2. Em `data/menu.js`, troque `img: ""` por
   `img: "assets/img/itens/royal-classico.jpg"` no item correspondente.
3. Pronto — o site troca o placeholder pela foto automaticamente.
