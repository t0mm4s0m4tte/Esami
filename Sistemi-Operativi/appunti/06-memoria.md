# 06 - Memoria principale e virtuale (Cap 9-10)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 09-10. `[INT]` = integrazione/calcolo mio non nelle fonti. Il Cap 10 del doc **non** descrive la gestione del page fault passo-passo, il COW, la formula EAT del demand paging: vedi "Dubbi".

## Mappa
Il capitolo segue il percorso che va dallo spazio logico a quello fisico: base/limit, address binding e MMU; allocazione contigua con frammentazione e compattazione; segmentazione e paging con TLB/EAT, protezione e pagine condivise; strutture alternative per la page table; swapping e architetture reali (Intel IA-32/x86-64, ARM). Il Cap 10 aggiunge la memoria virtuale: demand paging, page replacement (FIFO, OPT, LRU, second-chance), allocazione dei frame, thrashing e working set.

## Memoria principale
La CPU accede direttamente solo a registri (1 ciclo) e RAM (con stall); la **cache** attenua il divario. Poiché più processi condividono la RAM serve una protezione hardware, realizzata con una coppia **base + limit register**: un indirizzo logico è valido se `0 <= addr < limit`, l'indirizzo fisico è `base + addr` e una violazione genera un trap al SO.

Il legame tra indirizzi simbolici e fisici (**address binding**) può avvenire in tre momenti: a *compile time* (codice assoluto), a *load time* (codice rilocabile, ci pensa il loader) o a *execution time*, che è il più flessibile ma richiede hardware dedicato e permette di spostare il processo mentre gira. Questo hardware è la **MMU**, che traduce logico->fisico a runtime; nello schema più semplice un **registro di rilocazione** viene sommato a ogni indirizzo.

### Allocazione contigua (partizioni variabili)
Quando i processi occupano blocchi contigui, per scegliere il buco in cui collocarne uno nuovo (*dynamic storage-allocation problem*) esistono tre strategie: **first-fit** (primo buco sufficiente), **best-fit** (il più piccolo sufficiente, richiede scansione completa) e **worst-fit** (il più grande). First e best-fit sono migliori di worst in velocità e utilizzo.

Il prezzo è la frammentazione. La **frammentazione esterna** si ha quando lo spazio libero totale basterebbe ma non è contiguo; quella **interna** quando il blocco allocato è maggiore della richiesta. La *regola del 50%* dice che per ogni N blocchi allocati se ne perdono circa 0.5N (fino a 1/3 della memoria). La **compattazione** rimedia ma è costosa e richiede rilocazione dinamica a execution time.

### Segmentazione
Con la segmentazione l'indirizzo logico è `<segment-number, offset>`. Ogni processo ha una **segment table** con `base` e `limit` per segmento; i registri **STBR** (indirizzo della tabella) e **STLR** (numero di segmenti, con controllo `s < STLR`) permettono i controlli: s valido, `offset < limit`; l'indirizzo fisico è `base + offset`. Ogni segmento ha bit di validità e permessi (r/w/x) e può essere condiviso. Soffre ancora di frammentazione esterna.

### Paging
Il paging divide la memoria logica in **pagine** e quella fisica in **frame** (stessa dimensione, potenza di 2), con allocazione non contigua. Elimina la frammentazione esterna ma lascia quella **interna** (nell'ultima pagina). L'indirizzo è `(p, d)`: `p` indice nella page table (che restituisce il numero di frame), `d` offset; il fisico è `frame*size + d`. Il SO gestisce una **free-frame list**.

**Esempio della fonte**: un processo di 72.766 B con pagina di 2.048 B occupa 35 pagine piene più 1.086 B, cioè **36 pagine**, e la frammentazione interna è 2.048 - 1.086 = **962 B**. Pagine piccole significano meno frammentazione interna ma tabella più grande.

Poiché la page table sta in RAM servono due accessi per ogni riferimento. La soluzione è il **TLB**, una cache associativa pagina->frame: un *hit* evita l'accesso alla tabella, un *miss* richiede l'accesso alla page table e l'aggiornamento del TLB. Il tempo medio di accesso è `EAT = a*100 + (1-a)*200` (con memoria a 100 ns e a = hit ratio): con a=80% si ottiene **120 ns**, con a=99% **101 ns**. [INT] Se il TLB ha un costo non nullo, si somma il tempo di ricerca.

La **protezione** si ottiene con bit *valid/invalid* (che causano un trap), pagine read-only o execute-only. Il codice *reentrant* (read-only) può essere condiviso mappando lo stesso frame in più tabelle, mentre i dati restano privati. Come esempio di dimensione della tabella, con indirizzi a 32 bit e pagine da 4 KB ci sono 2^20 pagine e, con 4 B per voce, **4 MB** per processo.

### Strutture della page table
Con spazi di indirizzi grandi la tabella lineare diventa troppo pesante, quindi si usano tre alternative. La tabella **gerarchica** (a 2 o più livelli) divide l'indirizzo in `(p1, p2, d)` e crea le tabelle interne solo per le regioni usate (*forward-mapped*); a 64 bit servono 3-4 o più livelli. La tabella **hashed** applica una funzione hash al numero di pagina virtuale e gestisce le collisioni con una lista concatenata (voce: pagina virtuale, frame, next); la variante *clustered* per 64 bit associa una voce a più pagine (es. 16). La tabella **invertita** è una sola per tutto il sistema, con una voce per **frame fisico** (pagina virtuale + PID): risparmia memoria ma la ricerca è lenta, quindi si abbina a un hash.

### Swapping
Lo swapping sposta un intero processo tra RAM e **backing store**. Esempio della fonte: 100 MB a 50 MB/s richiedono 2000 ms di swap out più 2000 ms di swap in, cioè **4 s** aggiunti al context switch. Un processo con I/O pendente non si può swappare. I SO moderni fanno swapping solo sotto *memory pressure* e per pagine singole. Sui mobile non si fa swapping (flash a cicli di scrittura limitati, poco spazio): **iOS** chiede alle app di rilasciare memoria, altrimenti le termina; **Android** termina i processi a bassa priorità salvandone lo stato su flash.

### Architetture
In **IA-32** l'indirizzo logico (selettore + offset) passa per la segmentazione (GDT/LDT) e diventa un **indirizzo lineare** a 32 bit, poi il paging a 2 livelli (pagine da 4 KB o 4 MB); con **PAE** il paging è a 3 livelli e i fisici sono a 36 bit (64 GB). In **x86-64** si usano 48 bit virtuali effettivi, paging a **4 livelli**, pagine da 4 KB/2 MB/1 GB e, con PAE, fisici fino a 52 bit. In **ARM** le pagine sono da 4 KB/16 KB e le sezioni da 1 MB/16 MB, con 1 o 2 livelli di tabelle e TLB a due livelli (micro TLB per istruzioni e dati, poi main TLB, poi page table walk).

## Memoria virtuale (Cap 10)
Separare la memoria logica da quella fisica permette programmi più grandi della RAM, più multiprogrammazione e meno I/O. Il **demand paging** (lazy) carica una pagina solo al primo riferimento; un **page fault** è un riferimento a una pagina non in memoria. Se non ci sono frame liberi si ricorre al **page replacement**, scegliendo una *vittima*.

### Algoritmi di sostituzione
Stringa di riferimento della fonte: `7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1` con **3 frame**. La logica è che OPT è il limite teorico irraggiungibile, LRU lo approssima guardando il passato, FIFO è semplice ma può peggiorare aggiungendo frame (anomalia di Belady), e second-chance è il compromesso pratico.
| Algoritmo | Idea | Fault (fonte) | Note |
|---|---|---|---|
| **FIFO** | sostituisce la pagina più vecchia (coda) | **15** | semplice; **anomalia di Belady** (più frame => più fault) |
| **OPT** | sostituisce la pagina non usata per più tempo in futuro | **9** | irrealizzabile, benchmark (minimo possibile) |
| **LRU** | sostituisce la meno recentemente usata | **12** | *stack algorithm*: no Belady; implementazione costosa (contatori/timestamp o stack) |
| **Second-chance (clock)** | FIFO + reference bit: se bit=1 lo azzera e sposta in fondo, se 0 sostituisce | n.d. | approssimazione di LRU |
| **Enhanced second-chance** | coppia (reference, modify); classi (0,0) migliore, (0,1), (1,0), (1,1) peggiore | n.d. | preferisce non sporche e non recenti |

Le tracce di verifica sono le seguenti. **Traccia FIFO verificata** [INT] (frame dopo ogni fault): 7 / 7,0 / 7,0,1 / 2,0,1 / (0 hit) / 2,3,1 / 2,3,0 / 4,3,0 / 4,2,0 / 4,2,3 / 0,2,3 / (3,0,3,2 hit) / 0,1,3 / 0,1,2 / (0,1 hit) / 7,1,2 / 7,0,2 / 7,0,1 = 15 fault. **Traccia LRU verificata** [INT]: fault a posizioni 1,2,3,4,6,8,9,10,11,16,18,20 = 12.

L'**allocazione dei frame** può essere *globale* (la vittima è scelta tra tutti i processi: più throughput, è la scelta comune) o *locale* (solo tra i propri frame: prestazioni più stabili ma sottoutilizzo). Se un processo ha troppo pochi frame si va in **thrashing**: troppi page fault, CPU quasi inattiva e sistema che pagina in continuazione. Il **working set model** vi pone rimedio: il working set è l'insieme delle pagine referenziate nella *working-set window* e va tenuto interamente in RAM; se la somma dei working set supera la memoria, si sospendono dei processi.

## Cose da saper fare all'esame
- Tradurre un indirizzo logico in fisico: base/limit, segmentazione (`<s,d>` con controlli), paging (p,d con page table data).
- Calcolare frammentazione interna, numero pagine, dimensione page table (2^bit_pagine x byte per voce), EAT con TLB.
- Applicare first/best/worst-fit a una lista di buchi.
- **Eseguire FIFO / LRU / OPT** su una stringa di riferimento con n frame e contare i fault; riconoscere Belady.
- Confrontare tabelle gerarchiche / hashed / invertite.
- Spiegare thrashing e working set.

## Dubbi
- [DA VERIFICARE] Il doc non copre: valid/invalid bit nel demand paging, passi della gestione del page fault, copy-on-write, `EAT = (1-p)*ma + p*tempo_fault`, allocazione proporzionale, kernel memory (slab/buddy). Chiedere se sono nel programma o controllare le slide "Slide Deck - Teoria".
- Il valore 4 MB della tabella assume voci da 4 byte (esempio della fonte).
