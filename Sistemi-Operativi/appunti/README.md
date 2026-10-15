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
Le fonti lasciano scoperti alcuni punti, da integrare con libro e slide. Per il Cap 3 mancano stati del processo, PCB, context switch e creazione/terminazione in generale (c'è solo la parte UNIX nel Lab 03). Per il Cap 10 mancano la gestione del page fault, il copy-on-write, l'EAT con page fault, l'allocazione proporzionale e la kernel memory. Nel Cap 11 mancano la struttura di HDD/SSD, il RAID e la gestione dello swap space, e nei Cap 13-14 directory, mount, free-space management, journaling, VFS e link. Mancano inoltre esempi numerici di scheduling oltre FCFS (24,3,3), così come i testi d'esame e le modalità d'esame (scritto/orale/laboratorio).

## Errori/incoerenze trovate nelle fonti
Le fonti contengono qualche imprecisione. I numeri dei segnali nella tabella del Lab 06 sono quelli BSD/macOS e non quelli Linux (SIGSTOP 17, SIGCHLD 20, SIGUSR1 30). "XDL" nel Cap 3 è in realtà XDR, e per `lseek` su pipe l'errno su Linux è `ESPIPE` (non `EPIPE`). Nel Cap 11, infine, per C-SCAN e C-LOOK la fonte non dà il movimento totale, che è stato calcolato in `07` (382 e 322).
