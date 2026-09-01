---
title: "Name Generator"
date: 2026-02-10
description: "Un generatore di nomi italiani medievaleggianti. Gira qui in pagina."
tags: ["obsidian", "python", "gdr"]
---

{{< generatore-nomi >}}

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
