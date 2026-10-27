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

Niente sezioni: tutto sta direttamente in `content/`, e la home e la sidebar
elencano ogni pagina, dalla più recente. Ogni pagina comincia con il front
matter:

```yaml
---
title: "Titolo della pagina"
date: 2026-09-01
description: ""   # solo meta tag, non compare in pagina
tags: []
draft: true       # fuori dal sito, ma visibile con hugo server -D
---
```

`linkTitle` (facoltativo) è il nome che compare negli elenchi al posto di
`title`.

**Solo testo**: un file `.md` in `content/`.

**Con file allegati** (immagini, PDF): una **cartella** (*page bundle*) in
`content/`, con i file accanto a `index.md` e linkati per nome dal markdown,
per esempio `![](uno.png)`. È il caso della tesi.

```
content/nome-della-pagina/
├── index.md
├── uno.png
└── due.jpg
```

### Due cose da sapere

**I wikilink di Obsidian** (`[[Nota]]`) Hugo non li rende: in pagina
resterebbero le parentesi quadre. Vanno sistemati a mano quando si porta qui una
nota dal vault.

**I disegni fatti in Obsidian** vanno esportati in PNG prima: i file
`PENSIERI/Ink/*.drawing` e `*.excalidraw.md` non sono immagini.

## Come è fatto il sito

- `hugo.toml` — configurazione. `baseURL`, la palette di colorazione del
  codice.
- `layouts/` — template, nella struttura introdotta da Hugo 0.146:
  `baseof.html`, `home.html`, `page.html`, i partial in `_partials/`.
- `assets/css/` — file numerati, concatenati e minificati in un unico bundle.
  I numeri sono l'ordine di caricamento: `06_responsive.css` va per ultimo
  perché sovrascrive gli altri.
- `assets/js/ui.js` — apertura della sidebar sotto i 900px.
- `wrangler.jsonc` — configurazione Cloudflare.

L'aspetto è ispirato al tema Hugo
[dark-theme-editor](https://github.com/JingWangTW/dark-theme-editor)
di Jing Wang (Apache-2.0): palette One Dark, cornice da editor, sidebar. I template e il CSS di questo repo sono però scritti da zero.

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
