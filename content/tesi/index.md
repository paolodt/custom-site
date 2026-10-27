---
title: "Ottimizzazione dell'assemblatore genomico Flye attraverso parallelizzazione su GPU"
linkTitle: "Tesi"
date: 2026-10-14
description: "Porting su GPU della fase di polishing di Flye, un assemblatore genomico per long read."
tags: []
---

Elaborato finale, Università degli Studi di Milano, Dipartimento di Informatica
"Giovanni degli Antoni".

[Leggi la tesi in PDF](tesi_Paolo_Giorgio_Della_Torre.pdf)

## Abstract

L'assemblaggio genomico è il processo di ricostruzione del genoma completo di un
organismo a partire da *read*, sequenze di caratteri che rappresentano letture
di frammenti di DNA. Un assemblatore è un software che implementa questo
processo.

Il lavoro di questa tesi si basa su Flye, un assemblatore che elabora *read*
lunghe centinaia di migliaia di caratteri, dette *long read*, le quali
presentano un tasso di errore fino al 13%.

Flye, per assemblare il genoma, esegue una serie di passaggi partendo
dall'insieme di *read* in input:

- unisce le *read* in base alle sovrapposizioni tra le loro estremità in modo
  arbitrario, e forma delle catene chiamate *disjointig*;
- costruisce il grafo delle ripetizioni allineando i *disjointig* con sé stessi
  per individuare le regioni ripetute del genoma;
- allinea le *read* sul grafo per trovare i percorsi che fa il genoma su di
  esso;
- estrae dal grafo i *contig*, ovvero i percorsi nel grafo che rappresentano
  tratti di genoma contigui e che insieme formano la bozza del genoma.

La bozza del genoma così costruito però mantiene gli errori presenti nelle
*read* di input, ed è per questo che occorre applicare un ultimo passaggio,
detto *polishing*, per correggerli.

Il *polishing* divide la bozza del genoma in numerosi frammenti chiamati bolle.
Una bolla è una struttura contenente la sequenza del frammento di genoma, o
sequenza *candidato*, e pezzi *read* appartenenti a quella zona del genoma,
chiamati *rami*.

Per ogni bolla viene calcolata la sequenza candidato statisticamente più
probabile in base ai *rami* a disposizione, esprimendo questa probabilità con
uno *score* intero calcolato con l'algoritmo di Needleman–Wunsch.

Il problema principale dell'assemblaggio è l'elevato costo computazionale su
grossi genomi. Questo lavoro di tesi punta quindi alla riduzione dei tempi di
calcolo di Flye facendo un *porting* su GPU della costosa fase di correzione
delle bolle del *polishing*, in modo da accelerarne i tempi di esecuzione.

Il *porting*, testato su uno stesso genoma, al variare del numero di *thread*
CPU ha ottenuto dei fattori di *speedup* rispetto alla versione originale di
Flye compresi tra 4,9 e 9,4. Con una scelta di 16 *thread* CPU per i test su un
insieme di genomi, i fattori di *speedup* oscillano tra 5,9 e 9,6. Sull'intera
*pipeline* di Flye questo ha un impatto sul tempo di esecuzione che varia da una
riduzione del 3% ad una del 39%.

Mediamente, sui dataset utilizzati, il tempo che occupa la fase di correzione
delle bolle nell'intera *pipeline* scende dal 19,2% al 3,6%. Il passo ora più
ovvio è quindi provare ad applicare lo stesso tipo di *porting* su altre fasi di
Flye.

La tesi è strutturata nel seguente modo: nel primo capitolo presento il problema
dell'assemblaggio genomico con *read* lunghe; nel secondo descrivo lo stato
dell'arte e nello specifico l'assemblatore Flye; nel terzo capitolo spiego la
fase di *polishing* di Flye, su cui si concentra il lavoro svolto; nel quarto
capitolo illustro l'approccio che ho adottato per fare il *porting* del
*polishing* su GPU e come lo ho implementato; nel quinto capitolo discuto i
risultati che ho ottenuto; nel sesto espongo quali sono i possibili sviluppi
futuri per ridurre ulteriormente i tempi di esecuzione di Flye.
