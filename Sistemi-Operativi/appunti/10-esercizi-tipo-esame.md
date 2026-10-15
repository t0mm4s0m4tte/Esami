# 10 - Esercizi tipo e cheat-sheet d'esame

**Nota**: i testi d'esame reali NON sono nelle fonti. Gli esercizi sotto sono costruiti sugli esempi/algoritmi delle fonti e svolti da me (`[INT]`): servono ad allenare le procedure. Struttura reale dell'esame **[DA VERIFICARE]** (scritto/orale/prova di laboratorio): chiedere al docente.

## Procedure da saper eseguire (con esempio svolto)
Questa sezione raccoglie, argomento per argomento, la procedura da seguire e un caso numerico già risolto. Serve a ricordare il metodo, non a sostituire la teoria dei file precedenti, a cui si rimanda per i dettagli.

### 1. Scheduling (Gantt + waiting)
Processi (arrivo, burst): P1(0,7) P2(2,4) P3(4,1) P4(5,4). Risultati completi in `03-scheduling-cpu.md`: FCFS 4.75, SJF 4.00, SRTF 3.00, RR(q=3) 7.00. Il metodo è costruire una tabella tempo / ready queue / processo in CPU e calcolare `waiting = completion - arrival - burst`.

### 2. Amdahl
Con S = 0.25 e N = 2 si ha `1/(0.25 + 0.75/2) = 1.6`; per N -> inf il limite è 4. Con S=0.1, N=4 [INT]: `1/(0.1+0.225) = 3.08`.

### 3. Banchiere - richiesta
Stato della fonte (Available 3,3,2). P1 richiede (1,0,2) [INT]: `(1,0,2) <= Need_P1 (1,2,2)` ok; `<= Available (3,3,2)` ok. Nuovo stato: Available (2,3,0); Alloc_P1 (3,0,2); Need_P1 (0,2,0). Safety: Work=(2,3,0): P1 (need 020 <= 230) -> Work 5,3,2; P3 (011) -> 7,4,3; P4 (431) -> 7,4,5; P0 (743) -> 7,5,5; P2 (600) -> 10,5,7 => **sicuro**, richiesta concessa (sequenza `<P1,P3,P4,P0,P2>`).

### 4. Page replacement
Stringa fonte `7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1`, 3 frame: FIFO 15, LRU 12, OPT 9 (tracce in `06-memoria.md`). Esercizio: rifare con 4 frame (FIFO e LRU) e verificare. Belady (classico, [INT]): stringa `1,2,3,4,1,2,5,1,2,3,4,5` -> FIFO 3 frame = 9 fault, 4 frame = 10 fault.

### 5. Paging
Con indirizzo logico a 32 bit e pagina di 4 KB l'offset è di 12 bit e `p` di 20 bit; la page table ha 2^20 voci x 4 B = 4 MB. Un processo di 72.766 B con pagina di 2.048 B occupa 36 pagine e lascia 962 B di frammentazione interna. L'EAT con hit 80% e RAM 100 ns è 120 ns.

### 6. Disk scheduling
Coda `98,183,37,122,14,124,65,67`, testina 53: FCFS 640, SSTF 236, SCAN 236, C-SCAN 382, C-LOOK 322 (dettagli in `07-memoria-di-massa-io.md`).

### 7. Race condition (interleaving)
Con counter=5, il producer fa r1=counter, r1++; il consumer fa r2=counter, r2--; il producer salva 6; il consumer salva 4. Il risultato è 4 anziché 5.

### 8. Semafori - schemi
Gli schemi base da ricordare sono quattro:
- Mutex: `semaphore mutex=1; wait(mutex); CS; signal(mutex);`
- Ordine S1 < S2: `synch=0`; P1: `S1; signal(synch)`; P2: `wait(synch); S2`.
- Bounded buffer: `mutex=1, empty=n, full=0`.
- Readers-writers: `rw_mutex=1, mutex=1, read_count=0`.

### 9. Programmazione C/UNIX - traccia
Per predire le stampe: `fork(); fork(); printf("x");` produce 4 processi e quindi 4 stampe [INT]. Con `printf("x")` senza `\n` prima di un `fork` e stdout su file/pipe (block buffered), il buffer viene duplicato [INT: verificare in laboratorio]. Lo schema padre-figlio con pipe è: il padre esegue `close(fd[0]); write(fd[1],...); close(fd[1]); wait(NULL);` e il figlio `close(fd[1]); read(fd[0],...); close(fd[0]);`.

### 10. Permessi
`rwxr-x--x` = 751; `chmod 640 f` = `rw-r-----`.

## Domande teoriche ricorrenti (da saper rispondere in 3-5 righe)
- Differenza interrupt/trap; cos'è e a cosa serve il dual mode.
- Processo vs thread; shared memory vs message passing; many-to-one vs one-to-one.
- 3 requisiti della sezione critica; spinlock vs semaforo con coda; priority inversion.
- 4 condizioni del deadlock; prevenzione vs evitamento vs rilevamento.
- Segmentazione vs paging; frammentazione interna/esterna; ruolo del TLB; cos'è il thrashing.
- Polling vs interrupt vs DMA; buffering vs caching vs spooling.
- Allocazione contigua/collegata/indicizzata; cos'è un inode.
- Simmetrica vs asimmetrica; firma digitale; buffer overflow.

## Dubbi globali
- [DA VERIFICARE] Programma ufficiale: il doc "Argomenti dei Corsi - II Anno" elenca Teoria Cap 1-14 e 16 (no Cap 15) + Lab 01-11; tutti i capitoli risultano barrati (completati) dallo studente.
- [DA VERIFICARE] Modalità d'esame (scritto con esercizi? prova di programmazione C? orale?) e peso della parte di laboratorio.
