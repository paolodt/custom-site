---
title: "Nota di esempio"
date: 2026-09-01
description: "Pagina di prova: serve a vedere come vengono impaginati i testi. Cancellala quando metti la prima nota vera."
tags: ["meta"]
---

Questa nota esiste solo per far vedere come viene impaginato il testo. Quando
metti la prima nota vera, cancella il file `content/pensieri/nota-di-esempio.md`.

## Come arriva qui una nota

Le note nascono nel vault Obsidian, in `PENSIERI/`. Per pubblicarne una:

1. copiala in `content/pensieri/`;
2. aggiungi in cima il *front matter* con `title`, `date` e `description`;
3. `git push` — Cloudflare fa il resto.

Le note senza `date` finiscono in fondo agli elenchi, quindi conviene metterla
sempre. Se una nota non è pronta, `draft: true` la tiene fuori dal sito ma
visibile in locale con `hugo server -D`.

## Cosa si può usare nel testo

Il grassetto, il **corsivo**, il `codice inline` e i link funzionano come
sempre. Le citazioni vengono così:

> Le idee migliori arrivano quando non hai un foglio.

Gli elenchi puntati e numerati sono quelli sopra. Le tabelle:

| campo         | serve a                          | obbligatorio |
| ------------- | -------------------------------- | ------------ |
| `title`       | titolo in pagina e nell'albero    | sì           |
| `date`        | ordinamento negli elenchi         | di fatto sì  |
| `description` | riga sotto il titolo negli elenchi | no          |
| `tags`        | raggruppare le note               | no           |

E il codice, con la colorazione One Dark:

```python
def pensiero(x):
    return x if x else pensiero(x)
```

---

Il resto è testo normale, con la colonna larga circa 72 caratteri perché è la
misura in cui l'occhio non perde la riga.
