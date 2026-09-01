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

Due comandi: `nuovo` crea la pagina, `pubblica` la fa uscire dalla bozza.
Nessuno dei due tocca git.

### `./nuovo`

```sh
./nuovo pensiero "Pocket World"              # content/pensieri/pocket-world.md
./nuovo progetto "Map Generator"
./nuovo disegno "Studio di mani" schizzo.png # cartella + immagine dentro
./nuovo pensiero --da ~/Obsidian/PENSIERI/Bozze/"2026-04-15 Pocket World.md"
```

Scrive il front matter, mette il file nella cartella giusta e apre `$EDITOR`
(`--no-editor` per saltarlo). La pagina nasce con `draft: true`, quindi non
finisce online finché non la pubblichi.

Gli accenti nel titolo diventano lettere semplici nel nome del file: *Città di
notte* → `citta-di-notte.md`. Se il file esiste già si rifiuta di sovrascriverlo.

Con `--da` importa una nota dal vault: se il nome comincia con una data —
`2026-04-15 Pocket World.md`, come le tue in `Bozze/` — **titolo e data li
ricava da lì**.

### `./pubblica`

```sh
./pubblica                                    # tutte le bozze
./pubblica content/pensieri/pocket-world.md   # solo questa
```

Toglie `draft: true` e ricostruisce il sito, così un errore salta fuori adesso e
non dopo il push. Se il build fallisce rimette tutto in bozza. Alla fine stampa
il comando git da lanciare, ma non committa e non pusha: quello lo fai tu.

### Due cose da sapere

**I wikilink di Obsidian** (`[[Nota]]`) Hugo non li rende: resterebbero le
parentesi quadre in pagina. `nuovo --da` non li converte, ti avvisa e basta —
decidi nota per nota. Convertirli in automatico è un lavoro a sé: bisogna sapere
se la nota di destinazione è pubblicata o no.

**I disegni fatti in Obsidian** vanno esportati in PNG prima: i file
`PENSIERI/Ink/*.drawing` e `*.excalidraw.md` non sono immagini. Ogni disegno è
una cartella con dentro `index.md` e i file immagine; la prima immagine diventa
la copertina nella galleria.

## Come è fatto il sito

- `hugo.toml` — configurazione. `baseURL`, le sezioni, la palette di
  colorazione del codice.
- `layouts/` — template, nella struttura introdotta da Hugo 0.146:
  `baseof.html`, `home.html`, `section.html`, `page.html`, i partial in
  `_partials/`, le varianti di sezione in `disegni/`.
- `assets/css/` — file numerati, concatenati e minificati in un unico bundle.
  I numeri sono l'ordine di caricamento: `06_responsive.css` va per ultimo
  perché sovrascrive gli altri.
- `nuovo` e `pubblica` — gli script qui sopra.
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
