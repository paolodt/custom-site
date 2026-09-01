---
title: "Name Generator"
date: 2026-02-10
description: "Un generatore di nomi italiani medievaleggianti. Gira qui in pagina."
tags: ["obsidian", "python", "gdr"]
---

Quando servono nomi per una campagna, inventarli sul momento produce sempre lo
stesso nome. Così ho messo due liste in Obsidian e uno script che pesca a caso.

{{< generatore-nomi >}}

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

Il pezzo che mi diverte di più è il cognome: prende un nome maschile a caso, gli
toglie l'ultima lettera e ci attacca una *i*, come i cognomi italiani veri —
*Bertoldo* → *Bertoldi*, *Lapo* → *Lapi*. Se dopo il taglio finisce già per *i*
resta com'è: *Baigio* → *Baigi*.

E la stessa coppia esce due volte, una da paesani e una da nobili. La differenza
è tutta in un `de` in mezzo: due righe, due classi sociali.

Il riquadro qui sopra fa esattamente questo, in JavaScript, sulle stesse liste:
`data/nomi.json` in questo repo è copiato dalle due note del vault.
