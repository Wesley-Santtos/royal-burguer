/* =============================================================
   Royal Burguer — comportamentos de página
   Uso:  RB.initUI()
   ============================================================= */
(function (RB) {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // botão flutuante aparece depois do hero
  function revealChromeOnScroll() {
    var floatBtn = document.querySelector(".wa-float");
    var hero = document.querySelector(".hero");
    if (!floatBtn || !hero) return;

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        floatBtn.classList.toggle("is-visible", !entries[0].isIntersecting);
      }, { rootMargin: "-70px 0px 0px 0px" }).observe(hero);
    } else {
      floatBtn.classList.add("is-visible");
    }
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

  // destaca a categoria ativa na barra sticky
  function activeCategory() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".cats__item")
    );
    var secs = links
      .map(function (l) {
        return document.querySelector(l.getAttribute("href"));
      })
      .filter(Boolean);
    if (!secs.length || !window.IntersectionObserver) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var i = secs.indexOf(en.target);
          links.forEach(function (l, j) {
            l.classList.toggle("is-active", j === i);
          });
        });
      },
      { rootMargin: "-20% 0px -72% 0px" }
    );
    secs.forEach(function (s) {
      io.observe(s);
    });
  }

  function scrollReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (reduceMotion || !window.IntersectionObserver) return;

    document.documentElement.classList.add("js-anim");

    function show(n) {
      if (n.classList.contains("is-visible")) return;
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

    var t;
    function sweep() {
      items.forEach(function (n) {
        if (
          !n.classList.contains("is-visible") &&
          n.getBoundingClientRect().top < window.innerHeight * 1.15
        )
          show(n);
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
    revealChromeOnScroll();
    smoothAnchors();
    activeCategory();
    scrollReveal();
  };
})((window.RB = window.RB || {}));
