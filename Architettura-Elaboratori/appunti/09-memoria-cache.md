# 09 - Gerarchia della memoria e cache

Fonte: Lezione 09 (Gerarchia della Memoria e Cache). Gli esempi numerici "dal libro" sono segnalati. Sezioni 5.8 (write) e 5.9 (miss) del libro sono "approfondimenti non inclusi nel programma" secondo le slide.

## Mappa
- Memoria principale, endianness
- Gerarchia, località temporale e spaziale
- Cache: hit/miss, blocchi, tag, bit di validità
- Mappatura diretta, completamente associativa, set-associativa
- Politica di rimpiazzo (LRU), scrittura (write-through / write-back), gestione miss

## Memoria principale
La memoria principale è un insieme di celle (locazioni) tutte della stessa dimensione, ciascuna con un indirizzo da 0 a n-1. La cella è l'unità minima indirizzabile: oggi è di 8 bit (un byte), mentre 4 o 8 byte formano una parola. Il numero di bit dell'indirizzo determina quante celle si possono indirizzare. Sull'ordine dei byte in una parola si distinguono **big endian** (SPARC, IBM) e **little endian** (Intel, RISC-V).

## Gerarchia e località
Le CPU sono molto più veloci delle memorie, e nessuna tecnologia è insieme veloce, grande ed economica. Si combinano allora una memoria piccola, veloce e costosa con una grande, lenta ed economica, organizzandole in una gerarchia: più in alto significa più veloce, più costosa e più piccola (registri, cache, RAM, disco). La gerarchia funziona perché i programmi hanno **località**, e questo vale sia per i dati sia per le istruzioni:
- **località temporale**: se accedo a una locazione, probabilmente la riaccedo presto (per esempio le istruzioni di un ciclo, o lo snippet `fib` ricorsivo);
- **località spaziale**: è probabile accedere a locazioni vicine (array, istruzioni sequenziali); giustifica i **blocchi** (linee) di k byte.

## Cache: concetti
La memoria principale, di 2^n byte, si può vedere come M = 2^n/k blocchi di k byte, mentre la cache ha C linee di k byte con C << M. Quando la CPU chiede una parola può accadere un **hit**, se la parola è già in cache e va subito alla CPU (si parla di hit rate e tempo di hit), oppure un **miss**, se il blocco va caricato dalla memoria in cache e poi inviato alla CPU (miss rate e **penalità di miss**).

Nel progettare una cache si affrontano diversi problemi: la dimensione totale (più grande significa più prestazioni e più costo), la dimensione della linea, il modo di tracciare il contenuto, la scelta tra cache unificata o separata per istruzioni e dati (architettura Harvard, con accessi in parallelo) e il numero di livelli (oggi fino a 3). Aumentare la dimensione del blocco non è sempre vantaggioso: ci sono meno blocchi e la penalità di miss cresce.

## Mappatura diretta (direct mapped)
Nella mappatura diretta ogni blocco di memoria ha **una sola** posizione possibile in cache: `linea = (indirizzo del blocco) mod (numero di blocchi in cache)`. Poiché più blocchi condividono la stessa linea, per sapere se la linea contiene il blocco giusto servono un **tag** (i bit alti dell'indirizzo) e un **bit di validità**. L'indirizzo si scompone in [ tag | indice | offset di byte nel blocco ]: l'offset vale log2(byte per blocco), l'indice log2(numero di linee) e il tag è il resto.

### Esempio (dal libro, non dalle slide): cache a mappatura diretta di 8 blocchi da 1 parola, richieste a indirizzi di blocco 22, 26, 22, 26, 16, 3, 16, 18
indice = blocco mod 8: 22->6, 26->2, 16->0, 3->3, 18->2.
| Rich. | Indice | Esito |
|---|---|---|
| 22 | 6 | miss (cold) |
| 26 | 2 | miss |
| 22 | 6 | hit |
| 26 | 2 | hit |
| 16 | 0 | miss |
| 3 | 3 | miss |
| 16 | 0 | hit |
| 18 | 2 | miss (conflitto con 26: sostituisce) |
Hit rate 3/8. (Le slide usano una cache di 8 blocchi con i 3 bit meno significativi come indice e un elenco di nove richieste: [DA VERIFICARE i valori].)

### Dimensionamento (formule standard)
I bit totali di una cache a mappatura diretta sono 2^n linee x (dimensione dato + dimensione tag + 1 bit validità). Con indirizzo a 32 bit, 2^n linee e blocco da 2^m byte, il tag è lungo 32 - n - m.

## Completamente associativa
All'estremo opposto, un blocco può stare in **qualsiasi** linea. Non ci sono conflitti, ma la ricerca avviene su tutte le linee in parallelo con un comparatore per linea, il che è costoso: la soluzione è adatta solo a poche linee.

## Set-associativa a k vie
La soluzione intermedia divide la cache in insiemi (set); ogni insieme contiene più blocchi (k "vie"). Il blocco va nell'insieme `(numero del blocco) mod (numero degli insiemi)` ed è cercato in tutte le vie dell'insieme confrontando i tag. La mappatura diretta è il caso con 1 via, la completamente associativa quello con 1 solo insieme. Con più associatività cala il miss rate (meno conflitti) ma crescono costo e tempo di hit.

L'implementazione a 4 vie richiede **4 comparatori** (uno per via, che confrontano il tag dell'indirizzo con quello del blocco) e un **multiplexer a 4 ingressi** pilotato dai segnali di hit, che seleziona il dato della via corretta. Quando un insieme è pieno occorre scegliere quale blocco sostituire: la politica tipica è **LRU** (Least Recently Used), che sostituisce il blocco inutilizzato da più tempo.

## Gestione di miss e scritture
Un **miss di istruzione** si gestisce in quattro passi (richiede una modifica al controllo del processore):
1. invia il PC originale alla memoria;
2. comanda la lettura e attendi;
3. scrivi la parola nel blocco di cache, aggiorna il tag con i bit alti dell'indirizzo e metti a 1 il bit di validità;
4. riavvia l'istruzione dalla fetch (troverà l'istruzione in cache).

I miss sui dati sono analoghi. Per le scritture esistono due politiche. Nel **write-through** ogni scrittura modifica anche la memoria (se il dato non è in cache lo si carica prima): le prestazioni sono scarse, perciò si usa un **buffer di scrittura**. Nel **write-back** si scrive solo in cache e la memoria viene aggiornata quando il blocco viene sostituito (serve un bit di "dirty" [libro]); è più complesso ma più efficiente.

## Cose da saper fare all'esame
- Spiegare località temporale/spaziale con un esempio di codice (loop, array).
- Dato un indirizzo e i parametri della cache (dimensione, blocco, vie): ricavare offset/indice/tag e dire hit/miss per una sequenza di richieste (mappatura diretta e set-associativa con LRU).
- Calcolare i bit di tag e la dimensione totale di una cache.
- Confrontare diretta/associativa/set-associativa (costi, conflitti, comparatori).
- Differenza tra write-through e write-back.

## Dubbi
- Esercizi numerici sul tempo medio di accesso (AMAT) o CPI con miss: non presenti nelle slide; [DA VERIFICARE se in programma].
