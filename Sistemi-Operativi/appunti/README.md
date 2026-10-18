# Sistemi Operativi (9 CFU) - Appunti d'esame condensati

UniTO Informatica, II anno. Appelli target: **2027-01-22** o **2027-02-17**.
Formato: agente `riassuntore` (mappa argomenti, definizioni, algoritmi/formule, esempi, "Cose da saper fare all'esame", "Dubbi").

## Fonti usate
La fonte principale è il Google Doc **"Sistemi Operativi - Appunti"** (id `1jhKaeePmN6Oo-k9_AHapXI5krwnP9Lwau7bsW6DIvpU`, ~350 KB), che contiene la Teoria Cap 01-14 e 16, il Laboratorio 01-11 e la sezione "Handmade" (appunti a mano da Cap 1-2); è stato letto per intero. Per il programma si è usato il Doc **"Argomenti dei Corsi - II Anno"** (Teoria Cap 1-14 + 16, Lab 01-11; tutto segnato come completato).

Non sono stati letti il PDF "Sistemi Operativi (Teoria) - Appunti" (export dello stesso doc, id `1XWFAujJ49LYxcluhK6BZBFkqCDya7WmT`) né il libro e le slide nella sottocartella "PDF " (`Sistemi operativi - Concetti ed Esempi - 10 ED.pdf` 17 MB, "Slide Deck - Teoria", "Slide Deck - Laboratorio"): servono per colmare le lacune elencate più sotto.

Convenzione: `[INT]` = integrazione standard o calcolo mio, **non** presente nelle fonti (da ricontrollare); `[DA VERIFICARE]` = ambiguo/da controllare.

## Indice
| File | Contenuto |
|---|---|
| [01-fondamenti-strutture.md](01-fondamenti-strutture.md) | Cap 1-2: interrupt, dual mode, multicore/NUMA, servizi, syscall/API, strutture del SO, boot |
| [02-processi-thread.md](02-processi-thread.md) | Cap 3-4: IPC (shm vs messaggi), socket/RPC/pipe, thread, Amdahl, modelli, Windows/Linux |
| [03-scheduling-cpu.md](03-scheduling-cpu.md) | Cap 5: FCFS, SJF/SRTF, Priority, RR, MLQ/MLFQ, real-time + esempio svolto |
| [04-sincronizzazione.md](04-sincronizzazione.md) | Cap 6-7: sezione critica, Peterson, TAS/CAS, semafori, monitor, problemi classici, SO reali |
| [05-deadlock.md](05-deadlock.md) | Cap 8: 4 condizioni, grafi, prevenzione, Banchiere (Safety), rilevamento, ripristino |
| [06-memoria.md](06-memoria.md) | Cap 9-10: base/limit, paging/segmentazione, TLB/EAT, page table, swapping, FIFO/OPT/LRU, thrashing |
| [07-memoria-di-massa-io.md](07-memoria-di-massa-io.md) | Cap 11-12: disk scheduling (FCFS/SSTF/SCAN/C-SCAN/C-LOOK), polling/interrupt/DMA, kernel I/O |
| [08-file-system-e-sicurezza.md](08-file-system-e-sicurezza.md) | Cap 13-14-16: permessi Unix/ACL, allocazione file (contigua/FAT/indicizzata/inode), sicurezza e crittografia |
| [09-laboratorio-unix.md](09-laboratorio-unix.md) | Lab 01-11: shell, C/gcc/make, fork/exec/wait, file, gdb, segnali, pipe/FIFO, code di messaggi, semafori, shm, bash |
| [10-esercizi-tipo-esame.md](10-esercizi-tipo-esame.md) | Procedure ed esercizi svolti, domande teoriche ricorrenti |
| [11-esercizi-ed-esami-svolti.md](11-esercizi-ed-esami-svolti.md) | Prova dimostrativa 25/12/2024, esercitazioni pipe/FIFO e code di messaggi (soluzioni del docente commentate), progetto 2025/26, POSIX vs System V |

## Cose da saper fare all'esame (riepilogo globale)
1. **Scheduling**: Gantt + waiting/turnaround medi (FCFS, SJF, SRTF, Priority, RR).
2. **Sincronizzazione**: trovare una race condition; scrivere soluzioni con semafori (bounded buffer, readers-writers); verificare i 3 requisiti della CS.
3. **Deadlock**: applicare Safety Algorithm / richiesta del Banchiere; rilevamento; grafo di allocazione.
4. **Memoria**: traduzione indirizzi (paging/segmentazione), EAT, dimensione page table, first/best/worst-fit; **FIFO/LRU/OPT** su stringa di riferimento.
5. **Disco**: movimento testina per FCFS, SSTF, SCAN, C-SCAN, (C-)LOOK.
6. **File system**: confronto metodi di allocazione, inode, permessi `rwx`/ottale.
7. **Lab**: programmi C con fork/exec/wait, pipe/dup2, FIFO, sigaction, msg queue, semop, shm; script bash.
8. **Teoria**: confronti (shm vs msg, modelli thread, microkernel vs monolitico, polling/interrupt/DMA, simmetrica vs asimmetrica).

## Lacune delle fonti (da colmare con libro/slide) - [DA VERIFICARE]
Le fonti lasciano scoperti alcuni punti, da integrare con libro e slide:
- **Cap 3**: stati del processo, PCB, context switch e creazione/terminazione in generale (c'è solo la parte UNIX nel Lab 03);
- **Cap 10**: gestione del page fault, copy-on-write, EAT con page fault, allocazione proporzionale, kernel memory;
- **Cap 11**: struttura di HDD/SSD, RAID, gestione dello swap space;
- **Cap 13-14**: directory, mount, free-space management, journaling, VFS, link;
- esempi numerici di scheduling oltre FCFS (24,3,3), testi d'esame e modalità d'esame (scritto/orale/laboratorio).

## Errori/incoerenze trovate nelle fonti
Le fonti contengono qualche imprecisione:
- i numeri dei segnali nella tabella del Lab 06 sono quelli BSD/macOS e non quelli Linux (SIGSTOP 17, SIGCHLD 20, SIGUSR1 30);
- "XDL" nel Cap 3 è in realtà XDR;
- per `lseek` su pipe l'errno su Linux è `ESPIPE` (non `EPIPE`);
- nel Cap 11 per C-SCAN e C-LOOK la fonte non dà il movimento totale, che è stato calcolato in `07` (382 e 322).

## Materiale Moodle (esami ed esercizi)
Il file [11](11-esercizi-ed-esami-svolti.md) integra il Moodle (`_moodle-raw/Sistemi-Operativi`). **Temi d'esame datati: ne esiste uno solo**, la "Prova Scritta 25 Dicembre 2024" di SO-B, dichiarata "a scopi puramente dimostrativi" (tre esercizi: processi 8 punti, sincronizzazione 8, memoria 7; senza soluzioni, svolta qui da me); le richieste d'esame dedotte per gli altri argomenti (scheduling, disco, file system) restano quindi `[DA VERIFICARE]` finché non c'è una traccia vera. Il Moodle del laboratorio T4 ha le esercitazioni su pipe/FIFO e code di messaggi con le soluzioni in C del docente (commentate nel file, con due difetti trovati: la corsa critica fra `write` e `sigsuspend` e l'`unlink` mancante), la traccia del progetto 2025/26 ("Servizio Mensa", voto minimo 18/30, peso 1/3) e le slide del turno T4 sul progetto, sul confronto POSIX contro System V e su gdb. La lacuna "stati del processo, PCB, context switch" del Cap. 3, indicata sopra, è colmata dalle slide `Cap_03` (il PCB è chiesto nella prova dimostrativa). Il codice C non è stato compilato né eseguito. Le sedici dispense di teoria e il testo sulla concorrenza (`20250301_Calcolo_ParDistr.pdf`) non contengono esercizi e non sono stati riletti riga per riga. I quiz Moodle non sono stati scaricati.
