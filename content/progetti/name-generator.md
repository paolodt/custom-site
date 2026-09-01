---
title: "Name Generator"
date: 2026-02-10
description: "Un generatore di nomi italiani medievaleggianti che gira dentro Obsidian."
tags: ["obsidian", "python", "gdr"]
---

Quando servono nomi per una campagna, inventarli sul momento produce sempre lo
stesso nome. Così ho messo due liste in Obsidian e uno script che pesca a caso.

Le liste sono di nomi italiani medievaleggianti — *Aldobrando*, *Ghislaberto*,
*Perinotto*, *Vuillermo* — divise in maschili e femminili. Lo script sta in una
nota accanto e si esegue direttamente dal vault:

```python
import os, random

nomi_maschili = open(position + "/1 - Nomi_Maschili.md").read().split("\n")
nomi_femminili = open(position + "/1 - Nomi_Femminili.md").read().split("\n")

cognome = nomi_maschili[random.randint(0, len(nomi_maschili) - 1)][:-1]
if cognome[len(cognome) - 1] != "i":
    cognome = cognome + "i"

print("Paesani :", nome_femminile, "e", nome_maschile, cognome)
print("Nobili  :", nome_femminile, "e", nome_maschile, "de", cognome)
```

Il pezzo che mi diverte di più è il cognome: prende un nome maschile a caso e lo
declina al plurale attaccandogli una *i*, come i cognomi italiani veri —
*Bertoldo* → *Bertoldi*. E la stessa coppia esce due volte, una da paesani e una
da nobili, che è solo un `de` in mezzo:

> Paesani : Allasina e Numbaldo Guidotti
> Nobili&nbsp;&nbsp;: Allasina e Numbaldo de Guidotti

Due righe di differenza, due classi sociali.
