(function () {
  "use strict";

  // Année courante dans le pied de page.
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Ombre du header au défilement.
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Apparition douce des blocs à l'écran.
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Copie du numéro de téléphone.
  var copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";
      var label = button.textContent;
      var done = function () {
        button.textContent = "Numéro copié ✓";
        window.setTimeout(function () { button.textContent = label; }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
      } else {
        fallbackCopy(value, done);
      }
    });
  });

  function fallbackCopy(text, callback) {
    var input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try { document.execCommand("copy"); callback(); } catch (e) { /* rien */ }
    document.body.removeChild(input);
  }
})();
