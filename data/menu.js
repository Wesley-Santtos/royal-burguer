/* =============================================================
   Royal Burguer — dados do site
   Edite este arquivo para mudar contato e cardápio.
   Preços são números (ex.: 28 = R$ 28,00). Dados fictícios.
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
    gradiente: "linear-gradient(140deg, #F2A93B 0%, #D8452B 100%)",
    itens: [
      {
        nome: "Royal Clássico",
        descricao:
          "Blend 180g, queijo prato, alface, tomate, cebola roxa e molho da casa no pão brioche.",
        preco: 28,
        tag: "Mais pedido",
      },
      {
        nome: "Royal Bacon",
        descricao:
          "Blend 180g, cheddar, bacon crocante, cebola caramelizada e maionese defumada.",
        preco: 34,
      },
      {
        nome: "Royal Duplo",
        descricao:
          "Dois blends de 160g, queijo prato duplo, picles e molho especial.",
        preco: 39,
      },
      {
        nome: "Royal Cheddar",
        descricao: "Blend 180g afogado em cheddar cremoso, com cebola crispy.",
        preco: 33,
      },
      {
        nome: "Royal Veggie",
        descricao:
          "Hambúrguer de grão-de-bico e beterraba, queijo, rúcula e tomate seco.",
        preco: 30,
        tag: "Novo",
      },
    ],
  },
  {
    id: "porcoes",
    categoria: "Porções",
    emoji: "🍟",
    gradiente: "linear-gradient(140deg, #F2A93B 0%, #9B4B2A 100%)",
    itens: [
      {
        nome: "Batata Rústica",
        descricao: "400g de batata com casca, alecrim e páprica defumada.",
        preco: 22,
      },
      {
        nome: "Onion Rings",
        descricao: "10 anéis de cebola empanados, com molho barbecue.",
        preco: 24,
      },
      {
        nome: "Batata Cheddar & Bacon",
        descricao: "Batata palito coberta com cheddar cremoso e bacon.",
        preco: 29,
        tag: "Mais pedido",
      },
      {
        nome: "Frango Crispy",
        descricao: "8 iscas de frango empanadas, com molho honey mustard.",
        preco: 27,
      },
    ],
  },
  {
    id: "bebidas",
    categoria: "Bebidas",
    emoji: "🥤",
    gradiente: "linear-gradient(140deg, #E8B24A 0%, #6BA292 100%)",
    itens: [
      {
        nome: "Refrigerante Lata",
        descricao: "Coca-Cola, Guaraná, Sprite ou Fanta — 350ml.",
        preco: 6,
      },
      {
        nome: "Suco Natural",
        descricao: "Laranja, limão ou maracujá — 400ml.",
        preco: 9,
      },
      {
        nome: "Milkshake",
        descricao: "Chocolate, morango ou ovomaltine — 400ml.",
        preco: 18,
        tag: "Mais pedido",
      },
      {
        nome: "Água",
        descricao: "Sem gás ou com gás — 500ml.",
        preco: 4,
      },
      {
        nome: "Cerveja Long Neck",
        descricao: "Puro malte, bem gelada.",
        preco: 10,
      },
    ],
  },
  {
    id: "sobremesas",
    categoria: "Sobremesas",
    emoji: "🍨",
    gradiente: "linear-gradient(140deg, #E88AA0 0%, #9B4B2A 100%)",
    itens: [
      {
        nome: "Brownie com Sorvete",
        descricao:
          "Brownie quente de chocolate meio amargo com bola de sorvete de creme.",
        preco: 16,
      },
      {
        nome: "Petit Gâteau",
        descricao:
          "Bolinho com recheio de chocolate quente e sorvete de creme.",
        preco: 18,
        tag: "Mais pedido",
      },
      {
        nome: "Cheesecake de Frutas Vermelhas",
        descricao: "Fatia cremosa com calda de frutas vermelhas.",
        preco: 15,
      },
    ],
  },
];
