/* =============================================================
   Royal Burguer — comportamentos de página
   header no scroll · scroll suave · botão flutuante · scroll-reveal
   Uso:  RB.initUI()
   ============================================================= */
(function (RB) {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function headerOnScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var apply = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 80);
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  function smoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", id);
    });
  }

  function floatingWhatsApp() {
    var btn = document.querySelector(".wa-float");
    var hero = document.querySelector(".hero");
    if (!btn || !hero || !window.IntersectionObserver) {
      if (btn) btn.classList.add("is-visible");
      return;
    }
    new IntersectionObserver(function (entries) {
      btn.classList.toggle("is-visible", !entries[0].isIntersecting);
    }).observe(hero);
  }

  function scrollReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (reduceMotion || !window.IntersectionObserver) return; // ficam visíveis por padrão

    document.documentElement.classList.add("js-anim");

    function show(n) {
      if (n.classList.contains("is-visible")) return;
      var sibs = Array.prototype.slice.call(
        n.parentNode.querySelectorAll(".reveal")
      );
      n.style.transitionDelay = Math.min(sibs.indexOf(n), 6) * 60 + "ms";
      n.classList.add("is-visible");
      io.unobserve(n);
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) show(e.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (n) {
      io.observe(n);
    });

    // failsafe: se um scroll rápido "pular" um item, revela o que já passou da dobra
    var t;
    function sweep() {
      items.forEach(function (n) {
        if (n.classList.contains("is-visible")) return;
        if (n.getBoundingClientRect().top < window.innerHeight * 1.15) show(n);
      });
    }
    window.addEventListener(
      "scroll",
      function () {
        clearTimeout(t);
        t = setTimeout(sweep, 120);
      },
      { passive: true }
    );
    window.addEventListener("load", sweep);
    setTimeout(sweep, 1200);
  }

  RB.initUI = function () {
    headerOnScroll();
    smoothAnchors();
    floatingWhatsApp();
    scrollReveal();
  };
})((window.RB = window.RB || {}));
