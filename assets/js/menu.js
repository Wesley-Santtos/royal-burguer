/* =============================================================
   Royal Burguer — render do cardápio (window.RB_MENU)
   Uso:  RB.renderMenu(listaEl, catsEl)
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

  // ícones de categoria (linha, marrom) — combinam com a identidade
  var ICONS = {
    hamburgueres:
      '<path d="M4 13c0-4.4 5.4-8 12-8s12 3.6 12 8"/><path d="M4 13h24"/><path d="M6 18h20"/><path d="M4 18c0 3.9 5 7 12 7s12-3.1 12-7"/>',
    porcoes:
      '<path d="M8 12h16l-1.7 15H9.7z"/><path d="M12 12V5M16 12V3M20 12V6"/>',
    bebidas:
      '<path d="M9 10h14l-1.6 17H10.6z"/><path d="M9.6 15h12.8"/><path d="M12 10l1.6-4H20"/>',
    sobremesas:
      '<path d="M11 13h10l-2.2 14h-5.6z"/><path d="M10 13a6 6 0 0 1 12 0"/><path d="M16 7V4"/>',
  };
  function catIcon(id) {
    return (
      '<svg class="cats__ico" viewBox="0 0 32 32" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[id] || "") +
      "</svg>"
    );
  }

  function card(item, emoji) {
    var art = el("article", "dish reveal");

    var photo = el("div", "dish__photo");
    if (item.img) {
      var im = document.createElement("img");
      im.src = item.img;
      im.alt = item.nome;
      im.loading = "lazy";
      photo.appendChild(im);
    } else {
      photo.classList.add("is-placeholder");
      photo.appendChild(el("span", "dish__ph", emoji || "🍔"));
    }
    if (item.tag) photo.appendChild(el("span", "dish__tag", item.tag));
    art.appendChild(photo);

    var body = el("div", "dish__body");
    body.appendChild(el("h3", "dish__name", item.nome));

    var panel = el("div", "dish__panel");
    panel.appendChild(el("p", "dish__desc", item.descricao));
    panel.appendChild(el("span", "dish__price", brl.format(item.preco)));
    body.appendChild(panel);

    art.appendChild(body);
    return art;
  }

  // bloco "Lanche do Momento" com foto do item em destaque
  RB.renderFeature = function (host) {
    var menu = window.RB_MENU || [];
    var item = null;
    menu.forEach(function (cat) {
      cat.itens.forEach(function (it) {
        if (it.destaque && !item) item = it;
      });
    });
    if (!item || !host) {
      if (host) host.hidden = true;
      return;
    }

    host.innerHTML =
      '<p class="feature__kicker">⭐ Lanche do Momento</p>' +
      '<div class="feature__stage">' +
      '<img class="feature__photo" src="' +
      (item.featureImg || item.img) +
      '" alt="' +
      item.nome +
      '" />' +
      "</div>" +
      '<h2 class="feature__name">' +
      item.nome +
      "</h2>" +
      '<p class="feature__desc">' +
      item.descricao +
      "</p>" +
      '<span class="feature__price">' +
      brl.format(item.preco) +
      "</span>" +
      '<a class="btn btn--gold" data-wa href="#">Pedir no WhatsApp</a>';
  };

  RB.renderMenu = function (lista, cats) {
    var menu = window.RB_MENU || [];
    lista.innerHTML = "";
    if (cats) cats.innerHTML = "";

    menu.forEach(function (cat) {
      if (cats) {
        var a = el("a", "cats__item");
        a.href = "#cat-" + cat.id;
        a.innerHTML =
          catIcon(cat.id) +
          '<span class="cats__label">' +
          cat.categoria +
          "</span>";
        cats.appendChild(a);
      }

      var sec = el("section", "menu-cat");
      sec.id = "cat-" + cat.id;
      sec.appendChild(
        el("h2", "menu-cat__title", cat.emoji + "  " + cat.categoria)
      );

      var list = el("div", "menu-cat__list");
      cat.itens.forEach(function (item) {
        list.appendChild(card(item, cat.emoji));
      });
      sec.appendChild(list);
      lista.appendChild(sec);
    });
  };
})((window.RB = window.RB || {}));
