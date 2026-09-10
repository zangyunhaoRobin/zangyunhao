/* ============================================================
   Yunhao Zang · Personal Academic Homepage
   - sticky nav shadow on scroll
   - mobile menu toggle
   - scrollspy for nav links
   - scroll-reveal via IntersectionObserver
   - dynamic footer year
   ============================================================ */

(function () {
  "use strict";

  /* ---- helpers ---- */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- sticky nav shadow ---- */
  var nav = $("#siteNav");
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = $("#navToggle");
  var menu = $("#navLinks");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close menu after clicking a link
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- scrollspy ---- */
  var navLinks = $$(".nav-link");
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href");
      return id && id.charAt(0) === "#" ? $(id) : null;
    })
    .filter(Boolean);

  var spy = function () {
    if (!sections.length) return;
    var pos = window.scrollY + 120;
    var current = sections[0].id;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= pos) current = sections[i].id;
    }
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  };
  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", spy);
  spy();

  /* ---- reveal on scroll ---- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---- footer year ---- */
  $$("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
