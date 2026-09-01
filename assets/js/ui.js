/*******************************************************************************
 * Interazioni della cornice. Due sole cose:
 *  1. apertura/chiusura della sidebar sotto i 900px;
 *  2. nell'albero il nome della sezione è un <a> dentro a <summary>, e senza
 *     questo il click aprirebbe/chiuderebbe la cartella invece di navigare.
 * L'apertura delle cartelle la fa <details> da solo, senza JavaScript.
 ******************************************************************************/

(function () {
  "use strict";

  var body = document.body;
  var bottone = document.querySelector(".sidebar-toggle");
  var velo = document.querySelector(".scrim");

  function mostraSidebar(aperta) {
    body.classList.toggle("sidebar-open", aperta);
    if (bottone) bottone.setAttribute("aria-expanded", String(aperta));
    if (velo) velo.hidden = !aperta;
  }

  if (bottone) {
    bottone.addEventListener("click", function () {
      mostraSidebar(!body.classList.contains("sidebar-open"));
    });
  }

  if (velo) {
    velo.addEventListener("click", function () {
      mostraSidebar(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") mostraSidebar(false);
  });

  var largo = window.matchMedia("(min-width: 901px)");
  if (largo.addEventListener) {
    largo.addEventListener("change", function (e) {
      if (e.matches) mostraSidebar(false);
    });
  }

  document.querySelectorAll("details.tree-dir > summary").forEach(function (s) {
    s.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link && link.href) {
        e.preventDefault();
        window.location.href = link.href;
      }
    });
  });
})();
