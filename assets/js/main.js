/* =============================================================
   Royal Burguer — bootstrap
   ============================================================= */
(function (RB) {
  "use strict";

  function waLink(cfg) {
    var base = "https://wa.me/" + cfg.whatsapp;
    return cfg.mensagemPadrao
      ? base + "?text=" + encodeURIComponent(cfg.mensagemPadrao)
      : base;
  }

  function fillConfig() {
    var cfg = window.RB_CONFIG || {};
    var href = waLink(cfg);

    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.setAttribute("href", href);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    document.querySelectorAll("[data-cfg]").forEach(function (n) {
      var key = n.getAttribute("data-cfg");
      if (cfg[key] == null) return;
      if (n.tagName === "A") n.setAttribute("href", cfg[key]);
      else n.textContent = cfg[key];
    });
    var year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  function boot() {
    var lista = document.getElementById("menu-lista");
    var cats = document.getElementById("cats");
    var feat = document.getElementById("destaque");

    if (RB.renderFeature) RB.renderFeature(feat);
    if (lista && RB.renderMenu) RB.renderMenu(lista, cats);

    fillConfig(); // depois do render: pega os [data-wa] criados dinamicamente
    if (RB.initUI) RB.initUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})((window.RB = window.RB || {}));
