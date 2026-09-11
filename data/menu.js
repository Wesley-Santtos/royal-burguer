/* =============================================================
   Royal Burguer — dados do site
   Edite este arquivo para mudar contato e cardápio.
   - preco: número (ex.: 28  ->  R$ 28,00). Dados fictícios.
   - img:   caminho da foto do item (ex.: "assets/img/itens/royal-classico.jpg").
            Deixe "" para usar o placeholder.
   ============================================================= */

window.RB_CONFIG = {
  whatsapp: "5511987654321",
  mensagemPadrao: "Olá! Quero fazer um pedido no Royal Burguer.",
  instagram: "https://instagram.com/royalburguer",
  endereco: "Rua das Brasas, 123 — Centro, São Paulo/SP",
  horario: "Terça a domingo, 18h às 23h30",
};

window.RB_MENU = [
  {
    id: "hamburgueres",
    categoria: "Hambúrgueres",
    emoji: "🍔",
    itens: [
      {
        nome: "Royal Clássico",
        descricao:
          "Blend 180g, queijo prato, alface, tomate, cebola roxa e molho da casa no pão brioche.",
        preco: 28,
        tag: "Mais pedido",
        img: "assets/img/itens/royal-classico.webp",
      },
      {
        nome: "Royal Bacon",
        descricao:
          "Blend 180g, cheddar, bacon crocante, cebola caramelizada e maionese defumada.",
        preco: 34,
        img: "",
        destaque: true, // aparece no bloco 3D "Lanche do Momento" (só um item)
      },
      {
        nome: "Royal Duplo",
        descricao:
          "Dois blends de 160g, queijo prato duplo, picles e molho especial.",
        preco: 39,
        img: "",
      },
      {
        nome: "Royal Cheddar",
        descricao: "Blend 180g afogado em cheddar cremoso, com cebola crispy.",
        preco: 33,
        img: "",
      },
      {
        nome: "Royal Veggie",
        descricao:
          "Hambúrguer de grão-de-bico e beterraba, queijo, rúcula e tomate seco.",
        preco: 30,
        tag: "Novo",
        img: "",
      },
    ],
  },
  {
    id: "porcoes",
    categoria: "Porções",
    emoji: "🍟",
    itens: [
      {
        nome: "Batata Rústica",
        descricao: "400g de batata com casca, alecrim e páprica defumada.",
        preco: 22,
        img: "",
      },
      {
        nome: "Onion Rings",
        descricao: "10 anéis de cebola empanados, com molho barbecue.",
        preco: 24,
        img: "",
      },
      {
        nome: "Batata Cheddar & Bacon",
        descricao: "Batata palito coberta com cheddar cremoso e bacon.",
        preco: 29,
        tag: "Mais pedido",
        img: "",
      },
      {
        nome: "Frango Crispy",
        descricao: "8 iscas de frango empanadas, com molho honey mustard.",
        preco: 27,
        img: "",
      },
    ],
  },
  {
    id: "bebidas",
    categoria: "Bebidas",
    emoji: "🥤",
    itens: [
      {
        nome: "Refrigerante Lata",
        descricao: "Coca-Cola, Guaraná, Sprite ou Fanta — 350ml.",
        preco: 6,
        img: "",
      },
      {
        nome: "Suco Natural",
        descricao: "Laranja, limão ou maracujá — 400ml.",
        preco: 9,
        img: "",
      },
      {
        nome: "Milkshake",
        descricao: "Chocolate, morango ou ovomaltine — 400ml.",
        preco: 18,
        tag: "Mais pedido",
        img: "",
      },
      {
        nome: "Água",
        descricao: "Sem gás ou com gás — 500ml.",
        preco: 4,
        img: "",
      },
      {
        nome: "Cerveja Long Neck",
        descricao: "Puro malte, bem gelada.",
        preco: 10,
        img: "",
      },
    ],
  },
  {
    id: "sobremesas",
    categoria: "Sobremesas",
    emoji: "🍨",
    itens: [
      {
        nome: "Brownie com Sorvete",
        descricao:
          "Brownie quente de chocolate meio amargo com bola de sorvete de creme.",
        preco: 16,
        img: "",
      },
      {
        nome: "Petit Gâteau",
        descricao:
          "Bolinho com recheio de chocolate quente e sorvete de creme.",
        preco: 18,
        tag: "Mais pedido",
        img: "",
      },
      {
        nome: "Cheesecake de Frutas Vermelhas",
        descricao: "Fatia cremosa com calda de frutas vermelhas.",
        preco: 15,
        img: "",
      },
    ],
  },
];
