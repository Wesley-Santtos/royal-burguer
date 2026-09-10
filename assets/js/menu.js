/* =============================================================
   Royal Burguer — render do cardápio a partir de window.RB_MENU
   Uso:  RB.renderMenu(containerEl, navEl)
   ============================================================= */
(function (RB) {
  "use strict";

  var brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function card(item, gradiente, emoji) {
    var art = el("article", "item-card reveal");

    var media = el("div", "item-media");
    media.style.backgroundImage = gradiente;
    media.appendChild(el("span", "item-media__emoji", emoji));
    media.appendChild(el("span", "item-media__wm", item.nome));
    if (item.tag) media.appendChild(el("span", "item-badge", item.tag));
    art.appendChild(media);

    var body = el("div", "item-body");
    body.appendChild(el("h4", "item-name", item.nome));
    body.appendChild(el("p", "item-desc", item.descricao));
    body.appendChild(el("p", "item-price", brl.format(item.preco)));
    art.appendChild(body);

    return art;
  }

  RB.renderMenu = function (container, nav) {
    var menu = window.RB_MENU || [];
    container.innerHTML = "";
    if (nav) nav.innerHTML = "";

    menu.forEach(function (cat) {
      // navegação de categorias
      if (nav) {
        var link = el("a", "cat-nav__item");
        link.href = "#cat-" + cat.id;
        link.innerHTML =
          '<span class="cat-nav__emoji" aria-hidden="true">' +
          cat.emoji +
          "</span><span>" +
          cat.categoria +
          "</span>";
        nav.appendChild(link);
      }

      // bloco da categoria
      var section = el("section", "menu-category");
      section.id = "cat-" + cat.id;

      var head = el("div", "menu-category__head");
      head.appendChild(
        el("h3", "menu-category__title", cat.emoji + "  " + cat.categoria)
      );
      section.appendChild(head);

      var grid = el("div", "menu-grid");
      cat.itens.forEach(function (item) {
        grid.appendChild(card(item, cat.gradiente, cat.emoji));
      });
      section.appendChild(grid);

      container.appendChild(section);
    });
  };
})((window.RB = window.RB || {}));
