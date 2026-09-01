# paolodellatorre.com

Sito personale. Hugo genera i file statici, Cloudflare Workers li serve.
Ogni push su `main` fa partire una build e va in produzione da solo.

## In locale

Serve Hugo (edizione standard, niente extended: qui non si usa SCSS).

```sh
mise use -g hugo@0.165.0     # una volta sola
hugo server -D               # anteprima su http://localhost:1313, bozze incluse
hugo --gc --minify           # build come su Cloudflare, output in public/
```

## Aggiungere contenuti

Tre sezioni, tre cartelle sotto `content/`.

### Un pensiero

Le note nascono nel vault Obsidian (`PENSIERI/`). Per pubblicarne una, copiala
in `content/pensieri/` e mettici il front matter:

```yaml
---
title: "Titolo della nota"
date: 2026-09-01
description: "Una riga, compare negli elenchi."
tags: ["gioco"]
---
```

`draft: true` la tiene fuori dal sito ma visibile con `hugo server -D`.

### Un progetto

Uguale, in `content/progetti/`.

### Un disegno

Ogni disegno è una **cartella** (un *page bundle*) dentro `content/disegni/`:

```
content/disegni/nome-del-disegno/
├── index.md          title, date, description
├── uno.png
└── due.jpg
```

Le immagini stanno accanto a `index.md`, Hugo genera le miniature da solo. La
prima immagine della cartella diventa la copertina nella galleria.

I disegni fatti in Obsidian vanno **esportati in PNG prima**: i file
`PENSIERI/Ink/*.drawing` e `*.excalidraw.md` non sono immagini.

Scorciatoia per una pagina nuova: `hugo new content/pensieri/titolo.md`.

## Come è fatto il sito

- `hugo.toml` — configurazione. `baseURL`, le sezioni, la palette di
  colorazione del codice.
- `layouts/` — template, nella struttura introdotta da Hugo 0.146:
  `baseof.html`, `home.html`, `section.html`, `page.html`, i partial in
  `_partials/`, le varianti di sezione in `disegni/`.
- `assets/css/` — cinque file numerati, concatenati e minificati in un unico
  bundle. `04_responsive.css` va per ultimo perché sovrascrive gli altri.
- `assets/js/ui.js` — apertura della sidebar sotto i 900px. Le cartelle
  dell'albero si aprono con `<details>`, senza JavaScript.
- `wrangler.jsonc` — configurazione Cloudflare.

L'aspetto è ispirato al tema Hugo
[dark-theme-editor](https://github.com/JingWangTW/dark-theme-editor)
di Jing Wang (Apache-2.0): palette One Dark, cornice da editor, sidebar ad
albero. I template e il CSS di questo repo sono però scritti da zero.

## Deploy

Cloudflare Workers Builds è collegato a questo repo e non ha bisogno di nessuna
impostazione nella dashboard: il comando di build sta in `wrangler.jsonc`, e
`wrangler deploy` lo esegue da solo prima di caricare gli asset.

L'immagine di build di Cloudflare ha Hugo già installato. La sua versione è più
vecchia di quella usata in locale (0.147 contro 0.165), ma il sito viene
identico — verificato, date in italiano comprese — quindi non serve pinnare
`HUGO_VERSION`.

Un push su un branch diverso da `main` produce un deployment di **preview** con
un URL suo, senza toccare la produzione.
