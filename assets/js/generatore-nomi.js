/*******************************************************************************
 * Generatore di nomi. Stessa logica dello script Python che gira nel vault:
 * un nome femminile, uno maschile, e un cognome ricavato da un terzo nome
 * maschile a cui si toglie l'ultima lettera e si attacca una "i".
 ******************************************************************************/

(function () {
  "use strict";

  var radice = document.querySelector("[data-generatore]");
  if (!radice) return;

  var contenitore = document.getElementById("nomi-dati");
  if (!contenitore) return;

  var nomi;
  try {
    nomi = JSON.parse(contenitore.textContent);
  } catch (e) {
    return;
  }
  if (!nomi || !nomi.maschili || !nomi.femminili) return;

  var uscita = radice.querySelector("[data-uscita]");
  var bottone = radice.querySelector("[data-genera]");

  function pesca(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // "Bertoldo" -> "Bertold" -> "Bertoldi"; "Baigio" -> "Baigi" (finisce già in i).
  function cognomeDa(nome) {
    var c = nome.slice(0, -1);
    return c.slice(-1) === "i" ? c : c + "i";
  }

  function genera() {
    var femminile = pesca(nomi.femminili);
    var maschile = pesca(nomi.maschili);
    var cognome = cognomeDa(pesca(nomi.maschili));

    uscita.textContent =
      "Paesani : " + femminile + " e " + maschile + " " + cognome + "\n" +
      "Nobili  : " + femminile + " e " + maschile + " de " + cognome;
  }

  if (bottone) bottone.addEventListener("click", genera);
  genera();
})();
