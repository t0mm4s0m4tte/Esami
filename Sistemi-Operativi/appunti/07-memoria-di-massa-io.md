# 07 - Memoria di massa e sistemi di I/O (Cap 11-12)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 11-12. `[INT]` = calcolo mio non nelle fonti. Il Cap 11 del doc tratta **solo lo scheduling del disco**: niente RAID, SSD, struttura disco, gestione swap (vedi Dubbi).

## Mappa
Il capitolo ha due parti. Nella prima si analizzano le prestazioni del disco (seek, latenza rotazionale) e gli algoritmi di disk scheduling: FCFS, SSTF, SCAN, C-SCAN, C-LOOK. Nella seconda si passa all'I/O: hardware (porta, bus, controller, registri, memory-mapped I/O), meccanismi di trasferimento (polling, interrupt, DMA), interfaccia applicativa, sottosistema I/O del kernel e ciclo di vita di una richiesta.

## Disk scheduling
Il tempo di accesso al disco è la somma del **seek time** (muovere il braccio, circa proporzionale alla distanza) e della **latenza rotazionale**. Il SO può ottimizzare soltanto il seek, quindi l'obiettivo degli algoritmi è minimizzare il movimento totale della testina; la rotazione non è controllabile dal SO.

**Scenario della fonte**: coda `98, 183, 37, 122, 14, 124, 65, 67`; testina su **53**; cilindri 0-199.
| Algoritmo | Idea | Movimento | Pro/Contro |
|---|---|---|---|
| FCFS | ordine di arrivo | **640** | equo, no starvation; prestazioni scarse |
| SSTF | richiesta più vicina | **236** | throughput alto; **starvation** |
| SCAN (ascensore) | va da un estremo all'altro servendo, poi inverte | **236** (verso 0 poi su) | no starvation; attesa non uniforme |
| C-SCAN | scansione in una direzione, al capolinea ritorno senza servire | **382** [INT]* | attesa più uniforme |
| C-LOOK | come C-SCAN ma si ferma all'ultima richiesta | **322** [INT]* | più efficiente di C-SCAN |
(* la fonte non fornisce il valore.)

Verifica [INT]: FCFS = 45+85+146+85+108+110+59+2 = 640. SSTF: 53->65->67->37->14->98->122->124->183 = 12+2+30+23+84+24+2+59 = 236. SCAN: 53->0 (53) + 0->183 (183) = 236. C-SCAN (verso 199): 53->199 (146) + salto 199->0 (199) + 0->37 (37) = 382 (180 se non si conta il salto). C-LOOK: 53->183 (130) + salto a 14 (169) + 14->37 (23) = 322. LOOK (SCAN che inverte all'ultima richiesta, verso 0 prima) = 53->14 (39) + 14->183 (169) = 208.

Come scelta pratica, con carico pesante conviene SCAN/C-SCAN; come default generico SSTF o LOOK; in ogni caso l'algoritmo deve essere un **modulo sostituibile** del SO.

## Hardware I/O
Un dispositivo si collega al sistema tramite una **porta** o un **bus** (PCI/PCIe) e un **controller/host adapter**, che può avere processore e memoria propri. Il controller espone registri: data-in, data-out, status, control. La CPU li raggiunge con **istruzioni I/O dirette** oppure con **memory-mapped I/O**, in cui i registri stanno nello spazio di indirizzamento e si usano normali load/store (tipico per la grafica).

## Meccanismi di trasferimento
Ci sono tre modi di far dialogare CPU e dispositivo, e la scelta dipende dalla velocità del dispositivo e dal volume di dati:
- **polling** (busy waiting): la CPU legge il *busy bit* finché vale 0, scrive comando e dati e imposta *command-ready*; il controller mette busy=1, esegue, poi azzera busy e command-ready. È ragionevole solo per dispositivi molto veloci;
- **interrupt**: il dispositivo segnala sulla *interrupt-request line* e la CPU salta all'handler tramite il vettore degli interrupt (interrupt chaining, mascherabilità, priorità); il costo è il context switch. Nel vettore Intel Pentium, 0 è la divisione per zero, 14 il page fault e 32-255 sono gli interrupt mascherabili;
- **DMA**, per i grandi volumi di dati: il driver scrive un blocco di comandi DMA (sorgente, destinazione, byte) e il controller DMA trasferisce direttamente in RAM (bus mastering, **cycle stealing**), generando **un solo interrupt** a fine trasferimento.

## Interfaccia applicativa
I dispositivi si classificano per carattere/blocco, sequenziale/random, sincrono/asincrono, dedicato/condivisibile, sola lettura/scrittura. Le categorie principali sono:
- **block device**: `read/write/seek`;
- **character device**: `get/put`;
- **network device**: socket.

`ioctl()` è la via di fuga per comandi specifici al driver. Il modello di I/O può essere:
- **bloccante**;
- **non bloccante**: ritorna subito, ad esempio con `select()`;
- **asincrono**: la notifica arriva a fine I/O con un segnale o callback; è reso possibile da interrupt e DMA.

Il **vectored I/O** (`readv`) permette di usare più buffer in una sola syscall.

## Sottosistema I/O del kernel
Il kernel offre servizi comuni a tutti i dispositivi:
- lo **scheduling** ordina le richieste per dispositivo in una coda (con QoS);
- il **buffering** assorbe differenze di velocità e di dimensione e garantisce la *copy semantics* (double buffering, copy-on-write);
- il **caching** tiene una copia in memoria più veloce per eliminare trasferimenti futuri; la differenza dal buffering è che quest'ultimo gestisce un singolo trasferimento;
- lo **spooling** serve per dispositivi come le stampanti (coda su disco più un demone);
- la **device reservation** richiede attenzione al deadlock (A riserva lo scanner e chiede la stampante, B il contrario).

Il kernel gestisce anche gli errori (retry per quelli transienti), la **protezione I/O** (le istruzioni I/O sono privilegiate, quindi si passa dalle syscall) e il power management (wake lock, power collapse).

Il **ciclo di vita di una richiesta** (ad esempio una `read`) segue questi passi:
1. la syscall entra nel kernel;
2. si controlla la cache: se c'è hit ritorna subito;
3. in caso di cache miss la richiesta passa al driver e il processo attende;
4. il driver scrive i comandi nei registri del controller;
5. l'hardware esegue e genera un interrupt;
6. l'interrupt handler sblocca il driver;
7. il driver notifica il kernel;
8. i dati sono copiati al processo, che passa da waiting a ready, e la syscall ritorna.

Sul fronte delle prestazioni, i costi sono CPU, context switch, copia dei dati e traffico di rete. Le ottimizzazioni consistono nel ridurre context switch, copie e interrupt, nell'usare il DMA e hardware più intelligente e nel bilanciare CPU, memoria, bus e I/O. Inoltre le funzionalità migrano verso il basso (ad esempio il checksum: app -> kernel TCP/IP -> offload sulla NIC). [INT, ordini di grandezza dal Cap 14 della fonte] HDD ~250 IOPS (CPU: ~630 milioni di istruzioni per I/O); SSD ~60.000 IOPS (~2,65 milioni).

## Cose da saper fare all'esame
- **Disegnare il percorso della testina e calcolare il movimento totale** per FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK dati coda e posizione/direzione iniziale.
- Confrontare polling / interrupt / DMA e dire quando usare cosa.
- Descrivere i passi di un trasferimento DMA e di una read bloccante.
- Distinguere buffering/caching/spooling; bloccante/non bloccante/asincrono.

## Dubbi
- [DA VERIFICARE] Cap 11 del libro (struttura HDD/SSD, formattazione, RAID, gestione swap) non presente nel doc: controllare programma ufficiale / slide.
- Direzione iniziale della testina: nelle fonti SCAN parte verso 0; in esercizi d'esame di solito è specificata.
