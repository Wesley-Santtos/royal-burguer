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

  function initBurger() {
    var canvas = document.getElementById("burger-canvas");
    var stage = document.querySelector(".hero__stage");
    var ok = RB.initBurger3D && RB.initBurger3D(canvas);

    if (!ok) {
      if (stage) stage.classList.add("no-webgl");
      return;
    }

    var zoomWrap = document.querySelector(".hero__zoom");
    if (zoomWrap) {
      zoomWrap.hidden = false;
      zoomWrap.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-zoom]");
        if (!b) return;
        ok.zoom(b.getAttribute("data-zoom") === "in" ? 1 : -1);
      });
    }
  }

  function boot() {
    fillConfig();

    var container = document.getElementById("cardapio-lista");
    var nav = document.getElementById("cat-nav");
    if (container && RB.renderMenu) RB.renderMenu(container, nav);

    initBurger();
    if (RB.initUI) RB.initUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})((window.RB = window.RB || {}));
