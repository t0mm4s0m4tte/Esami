# Flashcard - Sistemi Operativi

Formato: D = domanda, R = risposta. Carte marcate [INT] = integrazione standard non presente nelle fonti (da ricontrollare); [DA VERIFICARE] = punto incerto negli appunti.

## 01 - Fondamenti e strutture

D: Quali sono le due funzioni complementari del SO?
R: (1) Macchina virtuale: estende l'ISA offrendo un'interfaccia piu comoda. (2) Gestore di risorse: alloca e controlla CPU, memoria e I/O tra i programmi.

D: Il kernel e i programmi di sistema (shell, utility) sono la stessa cosa?
R: No. Il kernel e l'unico programma sempre in esecuzione; i programmi di sistema sono normali programmi in user context e non fanno parte del kernel.

D: Differenza tra interrupt ed eccezione (trap)?
R: Interrupt: evento asincrono generato dall'hardware (mascherabile o non). Eccezione/trap: evento sincrono generato dall'istruzione stessa (errore o system call).

D: Descrivi il ciclo di gestione di un interrupt.
R: A fine istruzione la CPU controlla la linea INT; se attiva salva lo stato (PC, registri), usa il numero dell'interrupt come indice nella interrupt vector table, esegue l'handler, ripristina lo stato e riprende il programma interrotto.

D: A cosa serve il PIC nei multicore?
R: Instrada ogni interrupt a un solo core.

D: Cos'e il dual mode e perche serve?
R: Un bit di modalita distingue user (1) e kernel (0). Interrupt, eccezioni e syscall portano in kernel mode; le istruzioni privilegiate (es. I/O) sono eseguibili solo in kernel mode. Serve alla protezione: i programmi utente non toccano direttamente l'hardware. Su Intel: ring 0 (kernel) - 3 (user).

D: Perche serve il timer?
R: Genera interrupt a intervalli regolari, cosi nessun programma puo monopolizzare la CPU o restare in un loop infinito.

D: Multiprogrammazione vs multitasking (time-sharing)?
R: Multiprogrammazione: piu processi in memoria perche la CPU non sia mai idle. Multitasking: cambio rapido di processo per garantire reattivita.

D: Perche si e passati ai multicore?
R: Fine del Dennard scaling (~2002): la frequenza non cresce piu, quindi si aumenta il numero di core per chip.

D: UMA vs NUMA: differenze e implicazione per il SO.
R: UMA/SMP: accesso uniforme alla memoria, ma il bus e collo di bottiglia. NUMA: memoria locale veloce, remota lenta; il SO deve essere locality-aware (processo e sua memoria sullo stesso nodo).

D: Come e garantita la coerenza delle cache nei sistemi multiprocessore?
R: In hardware.

D: Per l'I/O quando si usano interrupt e quando DMA?
R: Piccoli trasferimenti con interrupt, grandi trasferimenti con DMA.

D: Virtualizzazione vs emulazione?
R: Virtualizzazione: stessa CPU, SO guest su host. Emulazione: CPU diversa, le istruzioni vanno tradotte.

D: Protezione vs sicurezza?
R: Protezione: controllo degli accessi alle risorse interne. Sicurezza: difesa da minacce esterne (autenticazione, ecc.).

D: Come avviene una system call e cosa sono API e ABI?
R: Ogni syscall ha un numero; il kernel ha una tabella indicizzata dal numero; l'invocazione avviene tramite trap e al ritorno si ha un codice di stato. Il programmatore usa le API (Win32, POSIX, Java: semplicita e portabilita); l'ABI e l'interfaccia a livello binario (dimensione indirizzi, passaggio parametri, stack, formato librerie).

D: Tre modi di passare i parametri a una syscall?
R: Nei registri (veloce ma limitato); in un blocco di memoria il cui indirizzo e in un registro (Linux, Solaris); sullo stack. Nota [DA VERIFICARE]: "fino a 5 parametri nei registri" e un valore d'esempio, non un limite generale.

D: Corrispondenze Windows - UNIX per le syscall.
R: CreateProcess = fork()+exec(); CreateFile/ReadFile/WriteFile/CloseHandle = open/read/write/close; CreatePipe, CreateFileMapping/MapViewOfFile = pipe, shmget/mmap; SetFileSecurity = chmod/umask/chown.

D: Confronta le strutture del SO: semplice, monolitica, layered, microkernel.
R: Semplice (MS-DOS): nessuna separazione, fragile. Monolitica (UNIX): kernel in un solo spazio di indirizzi, prestazioni ottime, difficile da estendere/debug. Layered: strato N usa solo N-1, modulare ma con overhead di attraversamento. Microkernel (Mach): nel kernel solo IPC e gestione base di memoria/CPU, resto in server user; affidabile e sicuro ma overhead di message passing.

D: Cosa sono i moduli caricabili e i sistemi ibridi? Esempi.
R: Moduli: kernel base + moduli caricati a runtime che si chiamano tra loro (flessibilita + efficienza). Ibridi: Linux (monolitico + moduli), Windows (parte microkernel), macOS/iOS (Mach + BSD).

D: Policy vs mechanism?
R: Il meccanismo e il "come", la policy il "cosa". Esempio: il timer e un meccanismo usabile da molte policy di scheduling.

D: Vero o falso: "un crash dump e un core dump sono la stessa cosa".
R: Falso. Core dump = crash di un'applicazione; crash dump = crash del kernel.

D: Sequenza di boot e cos'e SYSGEN?
R: Firmware (ROM/EEPROM) lancia il bootstrap loader, che carica il kernel in RAM (GRUB puo far scegliere kernel/opzioni). SYSGEN e la configurazione/compilazione del kernel per l'hardware specifico.

D: Catena di produzione di un programma: compilatore, linker, loader?
R: Il sorgente diventa oggetto col compilatore, eseguibile col linker, ed e portato in memoria dal loader.

## 02 - Processi e thread

D: Processo vs programma?
R: Il programma e entita passiva, il processo e un programma in esecuzione (entita attiva). Un processo multithread ha piu program counter.

D: Perche servono processi cooperanti?
R: Condivisione di informazioni, speedup, modularita, convenienza; richiedono IPC.

D: Stati del processo, PCB e context switch: sono negli appunti?
R: No, non sono trattati nel Cap 3 delle fonti [INT, non nelle fonti]: vanno ripassati dal libro (Silberschatz, 10 ed.). Per UNIX gli stati di `ps` sono nel Lab 03.

D: Shared memory vs message passing.
R: Shared memory: piu veloce (dopo il setup niente syscall per scambiare dati), sincronizzazione esplicita a carico del programmatore, stessa macchina. Message passing: piu lento (kernel a ogni messaggio), sincronizzazione implicita (rendezvous), funziona anche in ambiente distribuito.

D: Buffer circolare del produttore-consumatore: quando e pieno e quando vuoto?
R: Indici `in` (primo posto libero) e `out` (primo posto pieno). Vuoto: in == out. Pieno: (in+1) % BUFFER_SIZE == out (si spreca uno slot).

D: Come si crea memoria condivisa POSIX?
R: `shm_open()` crea l'oggetto e ritorna un fd; `ftruncate()` ne fissa la dimensione; `mmap()` ottiene un puntatore locale.

D: Tre scelte di progetto del message passing.
R: Collegamento diretto (send(P,msg)) o indiretto (mailbox/porte); sincronizzazione bloccante o non bloccante (entrambe bloccanti = rendezvous); capacita del buffer zero, limitata o illimitata.

D: Cos'e il rendezvous?
R: Send e receive entrambi bloccanti (buffer a capacita zero): mittente e destinatario si sincronizzano.

D: Message passing in Mach e in Windows?
R: Mach: solo message passing, mailbox Kernel e Notify per ogni task. Windows: LPC, valido solo in locale, con una connection port e due porte private di comunicazione.

D: Cos'e una RPC e a cosa serve il marshalling?
R: Chiamata di procedura remota via stub client (marshalling dei parametri in un formato indipendente dalla macchina, es. XDR, per risolvere l'endianness) e stub server. Nota: "XDL" nelle fonti e un refuso per XDR.

D: Pipe ordinarie vs named pipe?
R: Ordinarie: unidirezionali, richiedono parentela tra i processi. Named (FIFO): bidirezionali secondo la teoria generale del Cap 3, collegano anche processi non correlati. (Nota: nel Lab 07 la FIFO UNIX e un file speciale persistente.)

D: Che cos'e un thread e cosa condivide?
R: Unita di utilizzo della CPU; condivide con gli altri thread dello stesso processo codice, dati e file aperti (ha suo PC, registri, stack).

D: Benefici del multithreading?
R: Condivisione risorse, economia (creazione e context switch piu leggeri), scalabilita su multicore, reattivita.

D: Concorrenza vs parallelismo.
R: Concorrenza: piu task fanno progressi (anche su un core, interleaving). Parallelismo: esecuzione realmente simultanea (multicore). Parallelismo di dati: stessa operazione su sottoinsiemi di dati; di task: thread diversi con operazioni diverse.

D: Legge di Amdahl.
R: speedup <= 1/(S + (1-S)/N), con S frazione seriale e N core. Per N -> inf, speedup -> 1/S.

D: Esercizio: S=0.25, N=2. Speedup e limite?
R: 1/(0.25 + 0.75/2) = 1/0.625 = 1.6. Limite con N infinito: 1/0.25 = 4.

D: Esercizio [INT]: S=0.1, N=4.
R: 1/(0.1 + 0.9/4) = 1/0.325 = 3.08 circa.

D: Modelli di thread: many-to-one, one-to-one, many-to-many, two-level.
R: Many-to-one: molti user su 1 kernel; syscall bloccante blocca tutto, niente multicore (Green Threads). One-to-one: piu concorrenza e parallelismo, ma overhead e limite al numero di thread (Windows, Linux). Many-to-many: m user su n<=m kernel, compromesso. Two-level: many-to-many piu possibilita di legare un thread utente a un kernel thread (IRIX, HP-UX, Tru64, Solaris vecchio).

D: Cos'e il threading implicito? Tre esempi.
R: La gestione dei thread passa da programmatore a compilatore/runtime. Thread pool (thread pre-creati riusati, numero limitato); OpenMP (`#pragma omp parallel for`); GCD di Apple (blocchi `^{}` in dispatch queue serial FIFO o concurrent).

D: Problemi di fork() ed exec() nei multithread.
R: fork() in un processo multithread: duplica solo il thread chiamante o tutti? Esistono due versioni. exec() sostituisce l'intero processo.

D: Cancellazione di thread: asincrona vs differita.
R: Asincrona: immediata, rischiosa. Differita: ai cancellation points, e il default.

D: Cos'e il TLS?
R: Thread-local storage: dati privati del thread che persistono tra chiamate; diversi da variabili locali (non persistenti) e statiche (condivise).

D: Cosa sono le scheduler activations?
R: Meccanismo con LWP (processore virtuale per la libreria) e upcall dal kernel verso la libreria thread.

D: Come Linux crea i thread? E Windows?
R: Linux: processi e thread sono task, creati con `clone()` e flag CLONE_VM, CLONE_FILES, CLONE_SIGHAND, CLONE_FS: piu flag, piu il task somiglia a un thread. Windows: one-to-one con ETHREAD, KTHREAD (kernel) e TEB (user).

## 03 - Scheduling della CPU

D: Scheduler vs dispatcher?
R: Lo scheduler sceglie il processo dalla ready queue; il dispatcher concretizza la scelta (context switch, passaggio a user mode, salto al punto giusto). Il suo tempo e la dispatch latency.

D: Preemptive vs nonpreemptive: quando avvengono le decisioni di scheduling?
R: Casi: (1) running->waiting, (2) running->ready, (3) waiting->ready, (4) terminazione. Nonpreemptive: solo nei casi 1 e 4. Preemptive: in tutti e 4, con rischio di inconsistenza su dati condivisi e nel kernel.

D: Criteri di valutazione dello scheduling e relazioni utili.
R: CPU utilization e throughput (da massimizzare); turnaround, waiting, response (da minimizzare). turnaround = completion - arrival; waiting = turnaround - burst (senza I/O).

D: FCFS: pregi, difetti, esempio.
R: Coda FIFO nonpreemptive; semplice ma convoy effect. P1=24, P2=3, P3=3: ordine P1,P2,P3 waiting 0,24,27 media 17 ms; ordine P2,P3,P1 waiting 0,3,6 media 3 ms.

D: SJF: proprieta e problema?
R: Sceglie il prossimo CPU burst piu breve; e ottimo per il waiting medio. Il burst non e noto: si stima con media esponenziale tau(n+1) = alpha*t(n) + (1-alpha)*tau(n) [INT]. Versione preemptive: SRTF.

D: Priority scheduling: problema e rimedio?
R: Starvation dei processi a bassa priorita; rimedio: aging (la priorita cresce con l'attesa). SJF e un caso particolare (priorita = 1/burst previsto).

D: Round Robin: effetto del quantum q.
R: q molto grande degenera in FCFS; q molto piccolo causa troppi context switch. Regola pratica: ~80% dei burst piu corti di q. Turnaround peggiore di SJF ma response migliore (time-sharing).

D: Multilevel Queue vs Multilevel Feedback Queue.
R: MLQ: code permanenti per tipo di processo; tra le code priorita fissa (rischio starvation) o time slice (es. 80/20). MLFQ: i processi si spostano tra le code; CPU-bound retrocessi, I/O-bound restano in alto, la promozione fa da aging.

D: Esempio di MLFQ della fonte.
R: Q0 RR q=8, Q1 RR q=16, Q2 FCFS. Un processo entra in Q0; se non finisce in 8 passa in Q1; se non finisce in altri 16 passa in Q2.

D: Quale algoritmo per batch, interattivi, real-time?
R: Batch: SJF nonpreemptive o FCFS. Interattivi: RR o multilevel con RR in foreground. Real-time: priorita con preemption.

D: Hard vs soft real-time; due latenze.
R: Soft: processi critici con priorita alta ma senza garanzie. Hard: deadline garantita, mancarla e un fallimento. Interrupt latency: dall'arrivo dell'interrupt all'inizio dell'handler. Dispatch latency: include la fase di conflitto (risorse tenute da processi a bassa priorita, operazioni kernel non interrompibili). FCFS e SJF sono inadatti.

D: Esercizio [INT]: P1(0,7) P2(2,4) P3(4,1) P4(5,4). Waiting medio FCFS e SJF nonpreemptive?
R: FCFS: Gantt P1 0-7, P2 7-11, P3 11-12, P4 12-16; waiting 0,5,7,7, media 4.75. SJF: P1 0-7, P3 7-8, P2 8-12, P4 12-16; waiting 0,6,3,7, media 4.00.

D: Stesso esercizio [INT]: SRTF.
R: Gantt: P1 0-2, P2 2-4, P3 4-5, P2 5-7, P4 7-11, P1 11-16. Waiting 9,1,0,2, media 3.00.

D: Stesso esercizio [INT]: RR q=3.
R: Gantt: P1 0-3, P2 3-6, P1 6-9, P3 9-10, P4 10-13, P2 13-14, P1 14-15, P4 15-16. Waiting 8,8,5,7, media 7.00. Convenzione: i nuovi arrivi entrano in coda prima del processo appena preempted [DA VERIFICARE con il docente].

D: Vero o falso: "SJF nonpreemptive e ottimo per il turnaround e anche per il response".
R: Falso/impreciso: SJF e ottimo per il waiting medio; per il response il migliore e RR, a spese del turnaround.

## 04 - Sincronizzazione

D: Cos'e una race condition? Esempio.
R: Risultato dipendente dall'interleaving di accessi a dati condivisi. counter++ e counter-- non sono atomici (load, add, store). Con counter=5: P r1=counter, r1++; C r2=counter, r2--; P salva 6; C salva 4. Risultato 4 anziche 5.

D: Tre requisiti della sezione critica.
R: Mutua esclusione (uno solo in CS); progresso (se la CS e libera la scelta di chi entra non e rimandata indefinitamente e coinvolge solo chi non e nella remainder); attesa limitata (limite agli ingressi altrui dopo la mia richiesta, no starvation).

D: Struttura di un processo con sezione critica.
R: Entry section, critical section, exit section, remainder section.

D: Scrivi l'algoritmo di Peterson (due processi).
R: Variabili: `int turn; boolean flag[2];`. `do { flag[i]=true; turn=j; while(flag[j] && turn==j); /*CS*/ flag[i]=false; /*RS*/ } while(true);`. Richiede load/store atomici; soddisfa tutti e 3 i requisiti.

D: Perche disabilitare gli interrupt non e una buona soluzione?
R: Funziona solo su uniprocessore ed e inefficiente.

D: test_and_set e compare_and_swap: cosa fanno?
R: Istruzioni atomiche. test_and_set(target) ritorna il vecchio valore e imposta TRUE. compare_and_swap(value, expected, new) ritorna il vecchio valore e scrive new solo se value == expected. Lock [INT]: `while(test_and_set(&lock)); /*CS*/ lock=false;` e `while(compare_and_swap(&lock,0,1)!=0); /*CS*/ lock=0;`.

D: I lock con TAS/CAS garantiscono l'attesa limitata?
R: No: garantiscono la mutua esclusione ma la starvation resta possibile.

D: Cos'e uno spinlock?
R: Mutex lock (acquire/release atomiche) con implementazione a busy waiting.

D: Semaforo: definizione, wait e signal.
R: Intero S con due operazioni atomiche: wait(S) (P): `while(S<=0); S--`; signal(S) (V): `S++`. Counting: n istanze di una risorsa; binario: 0/1, come un mutex.

D: Come si impone con un semaforo che S1 in P1 preceda S2 in P2?
R: `synch=0`; P1: `S1; signal(synch)`; P2: `wait(synch); S2`.

D: Come un semaforo evita il busy waiting?
R: Con una coda di attesa: wait chiama block() se S<=0 (running->waiting), signal chiama wakeup() (waiting->ready).

D: Monitor e condition variable: semantica di wait e signal.
R: ADT con mutua esclusione implicita (un solo processo attivo), piu sicuro dei semafori. x.wait() sospende il chiamante e rilascia il monitor; x.signal() risveglia un processo in attesa (nessun effetto se non c'e nessuno). Semantiche: signal and wait (chi segnala si sospende) o signal and continue.

D: Quattro guai della sincronizzazione.
R: Deadlock (P0: wait(S),wait(Q); P1: wait(Q),wait(S)); starvation (es. coda semaforo LIFO); priority inversion; usi scorretti dei semafori.

D: Priority inversion e rimedio.
R: Un processo a bassa priorita tiene un lock, uno a media priorita lo prelaziona e l'alta priorita resta bloccata. Rimedio: priority inheritance (il possessore eredita la priorita massima tra gli in attesa).

D: Usi scorretti dei semafori: effetti.
R: Invertire signal(mutex)...wait(mutex) o dimenticare il wait viola la mutua esclusione; dimenticare il signal provoca deadlock.

D: Bounded buffer con semafori: scrivi la soluzione.
R: mutex=1, full=0, empty=n. Produttore: wait(empty); wait(mutex); inserisci; signal(mutex); signal(full). Consumatore: wait(full); wait(mutex); preleva; signal(mutex); signal(empty). [INT] Se si invertono i wait (mutex prima di empty/full) si ha deadlock.

D: Readers-writers: semafori e logica.
R: rw_mutex=1, mutex=1 (protegge read_count=0). Il primo lettore fa wait(rw_mutex), l'ultimo fa signal(rw_mutex). Esistono varianti per evitare la starvation di scrittori o lettori. [DA VERIFICARE: codice completo non nelle fonti]

D: Dining philosophers con monitor: come funziona e limite?
R: Stati THINKING/HUNGRY/EATING; test(i) verifica che i vicini (i+4)%5 e (i+1)%5 non mangino; pickup() e putdown() (che notifica i vicini) lo usano. Il deadlock e escluso ma la starvation resta possibile.

D: Mutex adattivi di Solaris e turnstile?
R: Mutex adattivo: spin se il possessore gira su una CPU, altrimenti sleep. Turnstile: coda ordinata per priorita associata al thread possessore, per la priority inheritance.

D: Sincronizzazione in Windows e Linux?
R: Windows: uniprocessore interrupt mask; multiprocessore spinlock (il thread in spinning non e prelazionato); dispatcher objects (mutex, semafori, eventi, timer) signaled/non-signaled. Linux: fino a 2.6 sezioni brevi con interrupt disabilitati; da 2.6 kernel preemptive; semafori, atomic integers, spinlock (anche R/W); su single-CPU lo spinlock disabilita/abilita la kernel preemption.

D: Alternative moderne ai lock?
R: Transactional memory (transazione atomica con abort/retry), OpenMP (`#pragma omp critical`), linguaggi funzionali (Erlang, Scala) con variabili immutabili che eliminano le data race.

## 05 - Deadlock

D: Definizione di deadlock e le 4 condizioni necessarie.
R: Insieme di processi che attendono all'infinito risorse tenute da altri dello stesso insieme. Condizioni simultanee: mutua esclusione, hold and wait, no preemption, attesa circolare.

D: Grafo di allocazione: come si legge?
R: Senza cicli: no deadlock. Ciclo con istanze singole: deadlock. Ciclo con istanze multiple: necessario ma non sufficiente.

D: Quali sono le strategie di gestione del deadlock?
R: Prevenire/evitare; rilevare e ripristinare; ignorarlo (UNIX e la maggior parte dei SO commerciali, perche i deadlock sono rari).

D: Come la prevenzione nega ciascuna condizione?
R: Mutua esclusione: non negabile per risorse non condivisibili. Hold and wait: chiedere tutto all'inizio o solo quando non si possiede nulla (bassa utilizzazione, starvation). No preemption: se la richiesta non e soddisfatta si rilascia tutto e si ricomincia. Attesa circolare: ordine totale sui tipi di risorsa, richieste in ordine crescente.

D: Stato sicuro, non sicuro, deadlock: relazione.
R: Sicuro = esiste una sequenza <P1..Pn> in cui il fabbisogno di ogni Pi e soddisfatto da Available piu risorse dei Pj precedenti; sicuro implica no deadlock. Non sicuro = deadlock possibile, non certo.

D: Evitamento con istanze singole?
R: Grafo con claim edge (arco di pretesa tratteggiato): si concede una richiesta solo se la conversione in arco di assegnazione non crea ciclo. [DA VERIFICARE se esce all'esame]

D: Algoritmo del Banchiere: strutture e Safety.
R: Available[m], Max[n][m], Allocation[n][m], Need = Max - Allocation. Safety: Work=Available, Finish[i]=false; trova i con Finish[i]=false e Need_i <= Work; Work += Allocation_i, Finish[i]=true; ripeti. Sicuro se alla fine tutti Finish true.

D: Banchiere: algoritmo Resource-Request.
R: Controlla Request_i <= Need_i e Request_i <= Available; simula (Available -= Request, Allocation_i += Request, Need_i -= Request); se lo stato risultante e sicuro concede, altrimenti Pi attende.

D: Esercizio: A=10,B=5,C=7; Available (3,3,2); Alloc/Max: P0 010/753, P1 200/322, P2 302/902, P3 211/222, P4 002/433. Need e sequenza sicura?
R: Need: P0 743, P1 122, P2 600, P3 011, P4 431. Sequenza sicura <P1,P3,P4,P2,P0>; Work: 332 -> 532 -> 743 -> 745 -> 1047 -> 1057.

D: Stesso stato: P1 richiede (1,0,2). Si concede?
R: [INT] (1,0,2) <= Need_P1 (1,2,2) e <= Available (3,3,2). Nuovo stato: Available (2,3,0), Alloc_P1 (3,0,2), Need_P1 (0,2,0). Safety: P1 -> Work 532; P3 -> 743; P4 -> 745; P0 -> 755; P2 -> 1057. Sicuro, richiesta concessa (sequenza <P1,P3,P4,P0,P2>).

D: Rilevamento: istanze singole vs multiple.
R: Singole: wait-for graph (solo processi, Pi->Pj se Pi attende una risorsa di Pj); deadlock se e solo se c'e un ciclo. Multiple: algoritmo simile a Safety con Request al posto di Need; Finish[i]=true se Allocation_i e nulla; alla fine Finish[i]=false indica Pi in deadlock.

D: Esempio di rilevamento della fonte: A=7,B=2,C=6; Available 0,0,0; Alloc/Request P0 010/000, P1 200/202, P2 303/000, P3 211/100, P4 002/002. Esito? E se P2 chiede un'altra C?
R: Nessun deadlock, sequenza <P0,P2,P3,P1,P4>. Se P2 richiede un'altra C, nessuna richiesta di P1,P2,P3,P4 e soddisfacibile: deadlock tra P1,P2,P3,P4.

D: Come si sceglie la frequenza di invocazione del rilevamento?
R: Compromesso tra probabilita di deadlock e costo dell'algoritmo.

D: Ripristino da deadlock.
R: Terminazione di tutti i processi coinvolti o di uno alla volta (criteri: priorita, tempo eseguito, risorse usate); oppure prelazione di risorse: scelta della vittima, rollback, evitando la starvation (contare i rollback nel costo).

D: Confronta prevenzione, evitamento, rilevamento+ripristino.
R: Prevenzione: statica e garantita, ma restrizioni, bassa utilizzazione, starvation. Evitamento: piu flessibile, ma serve il massimo a priori e c'e overhead a ogni richiesta. Rilevamento: massima utilizzazione, ma overhead di rilevamento e costo del ripristino.

D: Vero o falso: "uno stato non sicuro e un deadlock".
R: Falso: non sicuro significa che un deadlock e possibile, non certo.

## 06 - Memoria

D: Come funzionano base e limit register?
R: Indirizzo logico valido se 0 <= addr < limit; fisico = base + addr; violazione genera un trap al SO.

D: Address binding: i tre momenti.
R: Compile time (codice assoluto), load time (codice rilocabile, loader), execution time (il piu flessibile, serve hardware dedicato, il processo puo essere spostato mentre gira). L'hardware e la MMU (con registro di rilocazione nello schema semplice).

D: First-fit, best-fit, worst-fit.
R: First: primo buco sufficiente. Best: il piu piccolo sufficiente (scansione completa). Worst: il piu grande. First e best-fit migliori di worst in velocita e utilizzo.

D: Frammentazione esterna vs interna; regola del 50%; compattazione.
R: Esterna: spazio libero totale sufficiente ma non contiguo. Interna: blocco allocato maggiore della richiesta. Regola del 50%: per N blocchi allocati se ne perdono circa 0.5N (fino a 1/3 della memoria). Compattazione: rimedio costoso che richiede rilocazione dinamica a execution time.

D: Traduzione con segmentazione.
R: Indirizzo <s, offset>; segment table con base e limit; STBR (indirizzo tabella) e STLR (numero di segmenti): controllo s < STLR e offset < limit; fisico = base + offset. Bit di validita e permessi r/w/x, segmenti condivisibili; resta la frammentazione esterna.

D: Paging: schema e frammentazione.
R: Pagine logiche e frame fisici della stessa dimensione (potenza di 2), allocazione non contigua. Indirizzo (p,d): p indice nella page table (da cui il frame), d offset; fisico = frame*size + d. Elimina la frammentazione esterna, resta l'interna (ultima pagina). Pagine piccole = meno frammentazione ma tabella piu grande.

D: Esercizio: processo di 72.766 B, pagina da 2.048 B. Pagine e frammentazione interna?
R: 35 pagine piene piu 1.086 B: 36 pagine. Frammentazione interna = 2.048 - 1.086 = 962 B.

D: Esercizio: indirizzi a 32 bit, pagine da 4 KB, voce da 4 B. Dimensione della page table?
R: Offset 12 bit, p 20 bit: 2^20 pagine x 4 B = 4 MB per processo.

D: Cos'e il TLB e formula dell'EAT.
R: Cache associativa pagina->frame: hit evita l'accesso alla page table, miss richiede l'accesso e aggiorna il TLB. Con memoria a 100 ns e hit ratio a: EAT = a*100 + (1-a)*200 (a=80%: 120 ns; a=99%: 101 ns). [INT] Se il TLB ha costo non nullo, si somma il tempo di ricerca.

D: Come funziona la protezione nel paging? Cosa e il codice reentrant?
R: Bit valid/invalid (trap), pagine read-only o execute-only. Il codice reentrant (read-only) si condivide mappando lo stesso frame in piu tabelle; i dati restano privati.

D: Tabelle gerarchica, hashed, invertita.
R: Gerarchica: indirizzo (p1,p2,d), tabelle interne solo per le regioni usate; a 64 bit servono 3-4+ livelli. Hashed: hash del numero di pagina virtuale, collisioni con lista concatenata (clustered: una voce per piu pagine, es. 16). Invertita: una sola tabella di sistema con una voce per frame fisico (pagina virtuale + PID); risparmia memoria ma ricerca lenta, quindi si abbina a hash.

D: Esercizio: swap di 100 MB a 50 MB/s. Tempo aggiunto al context switch?
R: 2000 ms swap out + 2000 ms swap in = 4 s.

D: Perche non si fa swapping sui mobile? Cosa fanno iOS e Android?
R: Flash a cicli di scrittura limitati e poco spazio. iOS chiede alle app di rilasciare memoria, altrimenti le termina; Android termina i processi a bassa priorita salvandone lo stato su flash. Un processo con I/O pendente non si puo swappare.

D: IA-32, PAE e x86-64 a confronto.
R: IA-32: segmentazione (GDT/LDT) -> indirizzo lineare a 32 bit -> paging a 2 livelli (4 KB o 4 MB). PAE: paging a 3 livelli, fisici a 36 bit (64 GB). x86-64: 48 bit virtuali effettivi, paging a 4 livelli, pagine 4 KB/2 MB/1 GB, fisici fino a 52 bit.

D: Demand paging e page fault.
R: Demand paging (lazy): la pagina e caricata solo al primo riferimento. Page fault: riferimento a pagina non in memoria; se non ci sono frame liberi si fa page replacement scegliendo una vittima. [DA VERIFICARE] Gli appunti non coprono i passi della gestione del page fault, copy-on-write, EAT = (1-p)*ma + p*tempo_fault, slab/buddy.

D: Stringa 7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1 con 3 frame: fault FIFO, LRU, OPT?
R: FIFO 15, LRU 12, OPT 9.

D: Traccia FIFO [INT] della stessa stringa (frame dopo ogni fault).
R: 7 / 7,0 / 7,0,1 / 2,0,1 / (0 hit) / 2,3,1 / 2,3,0 / 4,3,0 / 4,2,0 / 4,2,3 / 0,2,3 / (3,0,3,2 hit) / 0,1,3 / 0,1,2 / (0,1 hit) / 7,1,2 / 7,0,2 / 7,0,1 = 15 fault.

D: LRU [INT] sulla stessa stringa: in quali posizioni avvengono i fault?
R: Posizioni 1,2,3,4,6,8,9,10,11,16,18,20: 12 fault.

D: Anomalia di Belady: cos'e e chi la subisce? Esempio [INT].
R: Con piu frame aumentano i fault. Colpisce FIFO; LRU e uno stack algorithm, non la subisce. Stringa 1,2,3,4,1,2,5,1,2,3,4,5: FIFO 3 frame = 9 fault, 4 frame = 10 fault.

D: OPT: perche e importante se non e realizzabile?
R: Sostituisce la pagina non usata per piu tempo in futuro: e il minimo possibile, quindi il benchmark. LRU lo approssima guardando il passato.

D: Second-chance (clock) ed enhanced second-chance.
R: FIFO + reference bit: se bit=1 lo azzera e passa oltre, se 0 sostituisce; approssima LRU. Enhanced: coppia (reference, modify), classi (0,0) migliore, (0,1), (1,0), (1,1) peggiore: preferisce pagine non recenti e non sporche.

D: Allocazione globale vs locale dei frame.
R: Globale: vittima tra tutti i processi, piu throughput (scelta comune). Locale: solo tra i propri frame, prestazioni piu stabili ma sottoutilizzo.

D: Thrashing e working set model.
R: Thrashing: troppi page fault per mancanza di frame, CPU quasi inattiva. Working set = pagine referenziate nella working-set window; va tenuto interamente in RAM; se la somma dei working set supera la memoria si sospendono processi.

D: Vero o falso: "il paging elimina ogni forma di frammentazione".
R: Falso: elimina solo la esterna; resta la interna nell'ultima pagina.

## 07 - Memoria di massa e I/O

D: Da cosa e composto il tempo di accesso al disco e cosa puo ottimizzare il SO?
R: Seek time + latenza rotazionale. Il SO ottimizza solo il seek (minimizzando il movimento della testina); la rotazione non e controllabile.

D: Coda 98,183,37,122,14,124,65,67; testina 53; cilindri 0-199. Movimento FCFS?
R: 640 (45+85+146+85+108+110+59+2).

D: Stessa coda: SSTF?
R: 236: 53->65->67->37->14->98->122->124->183 = 12+2+30+23+84+24+2+59. Rischio starvation.

D: Stessa coda: SCAN verso 0 e poi su?
R: 236: 53->0 (53) + 0->183 (183). Attesa non uniforme, no starvation.

D: Stessa coda: C-SCAN e C-LOOK [INT]?
R: C-SCAN (verso 199): 146 + salto 199 (199) + 37 = 382 (180 senza contare il salto). C-LOOK: 53->183 (130) + salto a 14 (169) + 23 = 322. LOOK verso 0 prima: 39+169 = 208. Valori non forniti dalle fonti [INT]; dipendono dal contare o no il salto di ritorno.

D: Scelta pratica dell'algoritmo di disk scheduling?
R: Carico pesante: SCAN/C-SCAN; default: SSTF o LOOK. L'algoritmo deve essere un modulo sostituibile del SO.

D: Registri del controller e due modi di accederli.
R: data-in, data-out, status, control. Istruzioni I/O dirette oppure memory-mapped I/O (registri nello spazio di indirizzamento, normali load/store, tipico per la grafica).

D: Polling vs interrupt vs DMA: quando usarli?
R: Polling (busy waiting sul busy bit): solo per dispositivi molto veloci. Interrupt: segnale sulla interrupt-request line, la CPU salta all'handler via vettore; costo = context switch. DMA: grandi volumi, il controller DMA trasferisce direttamente in RAM (bus mastering, cycle stealing) con un solo interrupt a fine trasferimento.

D: Passi del polling.
R: La CPU legge il busy bit finche vale 0, scrive comando e dati, imposta command-ready; il controller mette busy=1, esegue, poi azzera busy e command-ready.

D: Interrupt notevoli nel vettore Pentium?
R: 0 divisione per zero, 14 page fault, 32-255 interrupt mascherabili.

D: Block, character e network device; ruolo di ioctl.
R: Block: read/write/seek. Character: get/put. Network: socket. ioctl() e la via di fuga per comandi specifici al driver.

D: I/O bloccante, non bloccante, asincrono.
R: Bloccante: il processo attende. Non bloccante: ritorna subito (es. select()). Asincrono: la notifica arriva a fine I/O (segnale o callback), reso possibile da interrupt e DMA. Vectored I/O (readv): piu buffer in una syscall.

D: Buffering vs caching vs spooling.
R: Buffering: assorbe differenze di velocita/dimensione e garantisce copy semantics (double buffering); riguarda un singolo trasferimento. Caching: copia in memoria piu veloce che evita trasferimenti futuri. Spooling: coda su disco piu demone per dispositivi come le stampanti.

D: Device reservation: rischio?
R: Deadlock (A riserva lo scanner e chiede la stampante, B il contrario).

D: Passi di una read bloccante.
R: Syscall nel kernel; controllo cache (hit: ritorna); miss: richiesta al driver e il processo attende; il driver scrive i comandi nel controller; l'hardware esegue e genera interrupt; l'handler sblocca il driver; il driver notifica il kernel; i dati sono copiati al processo (waiting->ready) e la syscall ritorna.

D: Come migliorare le prestazioni dell'I/O?
R: Ridurre context switch, copie e interrupt; usare DMA e hardware piu intelligente; bilanciare CPU, memoria, bus e I/O. Le funzionalita migrano verso il basso (es. checksum: app -> kernel TCP/IP -> NIC). [INT] HDD ~250 IOPS, SSD ~60.000 IOPS.

D: Vero o falso: "SCAN soffre di starvation come SSTF".
R: Falso: SCAN non ha starvation (attesa non uniforme); SSTF si.

## 08 - File system e sicurezza

D: Modello di protezione Unix e notazione ottale.
R: 3 classi (owner, group, others) x 3 permessi (r=4, w=2, x=1). `chmod 761 game`: owner rwx (7), gruppo rw- (6), altri --x (1). Primo carattere di ls -l: `-` file, `d` directory, `p` FIFO. Comandi: chmod, chgrp, chown.

D: Converti rwxr-x--x in ottale e chmod 640 in simbolico.
R: rwxr-x--x = 751; chmod 640 = rw-r-----.

D: Limite del modello Unix rispetto alle ACL di Windows?
R: Poco flessibile: niente deny esplicito per un singolo utente di un gruppo. Le ACL di Windows hanno colonne Allow e Deny e permessi granulari. (La mancanza di svantaggi delle ACL e un limite della fonte.)

D: Confronta allocazione contigua, collegata (FAT), indicizzata.
R: Contigua: directory = inizio + lunghezza, accesso casuale ottimo (fisico = start + LA/512), frammentazione esterna. Collegata: puntatore al primo blocco, accesso casuale scadente (percorre la lista), niente frammentazione esterna, un puntatore per blocco, puntatore perso = coda del file persa. Indicizzata: puntatore al blocco indice, accesso casuale buono (2 letture), niente frammentazione esterna, un blocco indice per file.

D: Cos'e un extent e come funziona la FAT?
R: Extent: blocco contiguo di dischi; il file e una sequenza di extent. FAT: i puntatori stanno in una tabella centralizzata a inizio volume (una voce per blocco), in cache in RAM; fine file = -1. Piu veloce della lista collegata pura.

D: Indicizzata con file grandi: come si gestisce?
R: Blocchi indice collegati (Q1 = LA/(512*511)) oppure indice a piu livelli (Q1 = LA/(512*512)), con blocchi da 512 B.

D: Inode UFS e dimensione massima del file [INT].
R: Puntatori diretti (file piccoli), indiretto singolo, doppio, triplo. Massimo = n_dirette*B + (B/p)*B + (B/p)^2*B + (B/p)^3*B, con B dimensione del blocco e p del puntatore.

D: Quale metodo di allocazione per quale uso?
R: Contigua/extent: alte prestazioni (video editing, DB). Collegata/FAT: sistemi semplici. Indicizzata/UFS: uso generale.

D: Cosa NON copre il doc sui file system?
R: Directory, mount, free-space management, journaling, VFS, link hard/soft, open-file tables [DA VERIFICARE sulle slide].

D: Threat, attack, e le classi di violazione.
R: Threat: potenziale violazione; attack: tentativo concreto. Violazioni: riservatezza, integrita, disponibilita, furto di servizi, DoS. Metodi: masquerading, replay, man-in-the-middle, session hijacking, privilege escalation. Difesa su 4 livelli: fisico, SO, applicazione, rete (piu fattore umano).

D: Trojan horse, trap door, ransomware, spyware: differenze.
R: Trojan: codice apparentemente benigno che abusa dei privilegi. Trap door: accesso nascosto (es. in un compilatore). Ransomware: cifra i dati e chiede un riscatto. Spyware: raccoglie informazioni. Difesa concettuale: minimo privilegio.

D: Buffer overflow: come nasce e che esiti ha?
R: Es. `strcpy(buffer, argv[1])` con buffer[256] senza controllo: l'input sovrascrive lo stack e l'indirizzo di ritorno. Esiti: nessun effetto; logica sovvertita o crash (DoS); esecuzione di shellcode con i privilegi dell'applicazione. NOP sled: aumenta la tolleranza sull'indirizzo di salto.

D: Virus vs worm.
R: Il virus richiede un ospite; il worm e autonomo e si replica in rete. L'Internet Worm del 1988 sfruttava rsh, bug in finger e sendmail e password guessing.

D: Cos'e un SYN flood?
R: DoS che invia molti SYN senza l'ACK finale dell'handshake TCP, lasciando connessioni semi-aperte.

D: Crittografia simmetrica vs asimmetrica.
R: Simmetrica: stessa chiave (DES insicuro, 3DES, AES, RC4); veloce ma problema di distribuzione della chiave. Asimmetrica: coppia pubblica/privata (RSA, basato sulla difficolta di fattorizzare); si usa per scambiare chiavi simmetriche.

D: Esercizio RSA: p=7, q=13, ke=5, kd=29, m=69.
R: N=91, (p-1)(q-1)=72, 5*29=145=2*72+1. Cifratura: 69^5 mod 91 = 62. Decifratura: 62^29 mod 91 = 69.

D: MAC vs firma digitale vs certificato.
R: MAC = H(msg + chiave segreta): integrita e autenticita. Firma digitale = hash cifrato con la chiave privata, verificabile con la pubblica: aggiunge non ripudio. Certificato firmato da una CA: lega un'identita a una chiave pubblica, difende dal man-in-the-middle.

D: Perche si usa il salt nelle password?
R: L'hash con salt difende dalle rainbow table. MFA = qualcosa che sai / hai / sei.

D: IDS signature-based vs anomaly-based.
R: Signature-based: solo attacchi noti. Anomaly-based: rileva anche zero-day ma con falsi positivi.

D: Sicurezza in Windows: SID, token, descriptor.
R: SID per ogni utente/gruppo/computer; Security Access Token (SID utente + gruppi + privilegi) ereditato dai processi; Security Descriptor con DACL per ogni oggetto; Mandatory Integrity Control (Basso/Medio/Alto): scrive solo se integrita processo >= oggetto.

## 09 - Laboratorio UNIX/C

D: Fasi di compilazione e opzioni gcc per ispezionarle.
R: Preprocessore (`-E`), compilatore verso assembly (`-S`), assemblatore verso .o (`-c`), linker (`gcc a.o b.o -o exe`; un solo main). Altre opzioni: `-g`, `-O0/-O2/-Os`, `-Wall`, `-std=c89 -pedantic`, `-lm`; `ldd` mostra le librerie dinamiche.

D: Storage class e segmenti di memoria in C.
R: auto: stack, valore indefinito. register: suggerisce un registro. static: locale persiste, globale visibile solo nel file (init a 0). extern: dichiara senza allocare. Segmenti: BSS (globali/static non inizializzate = 0), stack (LIFO), heap (malloc/calloc/realloc, free per evitare leak).

D: Header guard e regola di makefile.
R: `#ifndef X_H / #define X_H / #endif`. Regola: `target: dipendenze` seguita dal comando preceduto da TAB; target di default = il primo; phony (clean, run) non corrispondono a file; variabili CC, CFLAGS, LDFLAGS.

D: Cosa ritorna fork()?
R: PID del figlio al padre, 0 al figlio, -1 in caso di errore.

D: Cosa viene copiato con fork()? Cosa e condiviso?
R: Il figlio riceve una copia di text, data, heap e stack, ma gli spazi di indirizzamento restano separati (nel figlio idata=333 e nel padre 111). L'offset dei file descriptor e condiviso. L'ordine di esecuzione e indeterminato.

D: Scheletro di fork con switch.
R: `switch (childPid = fork()) { case -1: /*errore*/ break; case 0: /*figlio*/ break; default: /*padre*/ break; }`.

D: Quante stampe fa `fork(); fork(); printf("x");`?
R: [INT] 4 processi, quindi 4 stampe. Se stdout e su file/pipe (block buffered) e c'e un printf senza \n prima del fork, il buffer viene duplicato [INT: verificare in laboratorio].

D: execve e le lettere della famiglia exec.
R: `execve(path, argv[], envp[])` sostituisce l'immagine del processo; se ha successo non ritorna, altrimenti errori come EACCES, ENOENT, ENOEXEC; i file descriptor restano aperti. p = cerca in PATH, l = argomenti in lista terminata da NULL, v = argomenti come array, e = ambiente esplicito.

D: _exit vs exit.
R: `_exit(status)` conserva solo gli 8 bit bassi. `exit()` prima esegue gli atexit() in ordine inverso e fa il flush dei buffer stdio. Alla terminazione il padre riceve SIGCHLD e i figli sono adottati da init.

D: wait vs waitpid e macro di stato.
R: wait(&status): primo figlio terminato, ritorna il PID. waitpid(pid,&status,options): pid>0 quel figlio, -1 qualunque, 0 stesso gruppo, <-1 gruppo |pid|. Opzioni WNOHANG, WUNTRACED, WCONTINUED. Macro: WIFEXITED/WEXITSTATUS, WIFSIGNALED, WIFSTOPPED, WIFCONTINUED.

D: Zombie vs orfano.
R: Orfano: processo il cui padre e terminato prima, adottato da init. Zombie (Z): terminato ma non "waitato", occupa una voce della process table; si elimina con la wait del padre o terminando il padre; non e uccidibile nemmeno con SIGKILL.

D: Codici di stato di ps.
R: S sleeping, R runnable/running, D uninterruptible (I/O), T stopped, Z zombie; modificatori N (nice), < (alta priorita), l (multithread), + (foreground).

D: Perche system() e inefficiente?
R: Fa fork + exec(/bin/sh) + wait: almeno 2 processi extra; e comoda perche supporta redirezioni e pipe.

D: Stream FILE* vs file descriptor.
R: FILE*: alto livello, bufferizzato (fopen, fgets, fprintf, fseek, fflush, setvbuf). fd (int): basso livello, non bufferizzato (open, read, write, lseek, dprintf).

D: Buffering di stdout, stderr e file; come si cambia?
R: stdout line-buffered, stderr unbuffered, file block-buffered. `setvbuf(f, NULL, _IONBF, 0)`; modi _IONBF, _IOLBF, _IOFBF.

D: Perche fgetc ritorna int? Cosa fa fgets?
R: Per distinguere EOF da 0xFF. fgets legge al piu size-1 caratteri e termina con \0.

D: read/open a basso livello: valori di ritorno e fd standard.
R: read ritorna il numero di byte, 0 per EOF, -1 per errore. open richiede O_RDONLY|O_WRONLY|O_RDWR combinabile con O_APPEND, O_CREAT, O_TRUNC con |. fd: 0 stdin, 1 stdout, 2 stderr. lseek non funziona su pipe e socket.

D: Redirezioni di shell sui descrittori.
R: `1> 1>> 2> 2>> &> &>>`.

D: Comandi GDB essenziali.
R: Compilare con `gcc -g -O0`; run, break N / file:N, info b, del id, next (non entra nelle funzioni), step (entra), cont, print, display, bt, list, quit. `set follow-fork-mode parent|child` (default parent); `gdb -p PID` per agganciarsi.

D: Ciclo di vita di un segnale e azioni di default.
R: Generazione -> pending -> delivery. Default: ignorare, terminare, core dump + terminare, stop, resume; oppure handler installato.

D: Segnali non catturabili e segnali importanti.
R: SIGKILL (9) e SIGSTOP non catturabili ne ignorabili ne bloccabili. SIGINT (Ctrl-C), SIGTSTP (Ctrl-Z), SIGSEGV (core dump), SIGPIPE (scrittura su pipe senza lettori), SIGALRM (alarm()), SIGTERM (default di kill), SIGCHLD (ignorato di default), SIGUSR1/2. [DA VERIFICARE] La tabella del doc ha numeri BSD/macOS; su Linux SIGSTOP=19, SIGCHLD=17, SIGUSR1=10: usare i nomi simbolici.

D: Come funziona kill(pid, sig)?
R: pid>0 quel processo, 0 stesso gruppo, <-1 gruppo |pid|, -1 broadcast. sig=0 verifica solo l'esistenza (ESRCH se non esiste, EPERM se mancano i permessi). Esistono raise(sig) e alarm(sec).

D: Scrivi l'installazione di un handler con sigaction.
R: `struct sigaction sa; sa.sa_handler = h; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART; sigaction(SIGINT, &sa, NULL);`. Meglio di signal(). sa_mask = segnali aggiuntivi bloccati durante l'handler; il segnale in gestione e bloccato di default.

D: Regole per scrivere un signal handler.
R: Solo funzioni async-signal-safe (write si, printf no); salvare e ripristinare errno; cautela con le variabili globali.

D: sigprocmask vs sa_mask.
R: sigprocmask(how,set,old) con SIG_BLOCK/SIG_UNBLOCK/SIG_SETMASK lavora su un sigset_t e la maschera del processo e persistente; sa_mask e temporanea (solo durante l'handler).

D: Cosa succede a una syscall bloccante interrotta da un segnale?
R: Fallisce con errno=EINTR, oppure riparte con SA_RESTART (non garantito per tutte).

D: Vero o falso: "un handler puo contare quante volte e arrivato SIGUSR1".
R: Falso: i segnali pending sono accorpati (un solo flag), non contati.

D: Pipe: proprieta e comportamento di read/write.
R: Unidirezionale, byte stream FIFO a capacita limitata (PIPE_BUF), niente lseek. `int fd[2]; pipe(fd);` fd[0] lettura, fd[1] scrittura. read: dati presenti = li consuma; vuota con scrittori = blocca; vuota senza scrittori = ritorna 0 (EOF). write: piena = blocca; senza lettori = SIGPIPE (o EPIPE).

D: Perche si chiudono i fd inutilizzati delle pipe?
R: Se il lettore non chiude fd[1] non vedra mai EOF e restera bloccato; se lo scrittore non chiude fd[0] non riceve SIGPIPE.

D: Come si realizza `ls -al | wc -l`?
R: Una pipe e 2 fork: nel primo figlio dup2(fd[1],1), nel secondo dup2(fd[0],0), chiudendo gli altri estremi. dup2(src,dst) copia src su dst chiudendo prima dst. [Nota doc: "lseek su pipe -> EPIPE", su Linux di norma ESPIPE, DA VERIFICARE]

D: Schema padre-figlio con pipe.
R: Padre: close(fd[0]); write(fd[1],...); close(fd[1]); wait(NULL). Figlio: close(fd[1]); read(fd[0],...); close(fd[0]).

D: FIFO vs pipe.
R: FIFO: file speciale persistente (p in ls -l), identificata da pathname, per qualsiasi processo con permessi, creata con mkfifo() (anche comando mkfifo -m). Pipe: solo in memoria, fd ereditato, processi correlati, pipe(). La open di una FIFO e bloccante (rendez-vous tra lettore e scrittore).

D: Oggetti IPC System V: chiavi e persistenza.
R: Message queue, semafori, shared memory, identificati da key_t: valore fisso, IPC_PRIVATE o ftok(pathname, proj). xxxget funziona come open: IPC_CREAT crea, IPC_EXCL con CREAT fallisce con EEXIST; permessi nei 9 bit bassi. Oggetti persistenti nel kernel finche non rimossi (ipcs, ipcrm, xxxctl IPC_RMID); rimozione immediata per code e semafori, differita per la shm.

D: msgsnd e msgrcv: parametri e comportamento di msgtyp.
R: Struct con `long mtype` (>0) + corpo; msgsz conta solo il corpo. msgrcv(msqid,&msg,maxsz,msgtyp,flag): msgtyp==0 primo messaggio; >0 primo con mtype==msgtyp; <0 primo con mtype minimo e <= |msgtyp|. Flag: IPC_NOWAIT (ENOMSG / EAGAIN in invio), MSG_NOERROR (tronca invece di E2BIG). IPC_RMID sveglia i bloccati con EIDRM.

D: Coda con mtype 300,100,200,400,100 e msgtyp=-300: ordine di prelievo?
R: 100 (pos 2), 100 (pos 5), 200, 300, poi blocca (400 > 300).

D: Semafori System V: struttura e semop.
R: Sempre in set di dimensione fissa. semget(key,nsems,flag), semctl(semid,semnum,cmd,...) con union semun da dichiarare a mano. semop(semid, sembuf{sem_num,sem_op,sem_flg}, nsops): sem_op>0 rilascia, ==0 attende lo zero, <0 acquisisce e blocca se valore < |sem_op|; esecuzione atomica tutto-o-niente su tutto l'array.

D: Quando si sblocca un processo in semop?
R: Condizione verificata; set rimosso (EIDRM); segnale (EINTR, anche con SA_RESTART). Anti-pattern: busy waiting con IPC_NOWAIT in ciclo o while(semctl(GETVAL)>0).

D: Mutex binario con semafori SysV.
R: initSemAvailable (SETVAL 1), initSemInUse (SETVAL 0), reserveSem (sem_op=-1), releaseSem (sem_op=+1). Senza semaforo 10 processi che incrementano un contatore in shm producono lost update.

D: Ciclo di vita della shared memory System V.
R: shmget(key,size,flag) crea; shmat(shmid,NULL,flag) attacca (ritorna (void*)-1 in errore; SHM_RDONLY: scrivere causa SIGSEGV); shmdt(addr) stacca senza distruggere; shmctl(shmid,IPC_RMID,0) cancella in modo differito (buona pratica: RMID subito dopo create+attach). Richiede sincronizzazione esplicita con semafori.

D: Shm e processi: fork, exec, terminazione, resize.
R: fork eredita i segmenti, exec li stacca, la terminazione li stacca. Niente realloc: bloccare gli accessi (semaforo), creare nuovo segmento, attaccarlo, copiare, RMID del vecchio, comunicare il nuovo id.

D: Elementi base di uno script bash.
R: Shebang `#!/bin/bash`, chmod +x; `var=val` senza spazi, `$var`, parametri $0 $1; "..." espande, '...' letterale, `cmd` sostituzione; `let "d=$a-$b"`; `if [ ... ]; then ... fi` (spazi obbligatori dentro [ ]); confronti -eq -ne -gt -lt -ge -le; test file -f -s -r -w -x -d -h; `export` rende le variabili ereditabili dalle sotto-shell.

## 10 - Domande miste d'esame

D: Differenza tra processo e thread, e tra shared memory e message passing, in 3 righe.
R: Processo = programma in esecuzione con spazio di indirizzi proprio; thread = unita di CPU che condivide codice, dati e file del processo. Shared memory: veloce ma sincronizzazione esplicita; message passing: piu lento, sincronizzazione implicita, anche distribuito.

D: Quale condizione del deadlock nega l'ordinamento totale delle risorse e quale lo hold-and-wait all-at-once?
R: L'ordinamento totale nega l'attesa circolare; richiedere tutto all'inizio nega hold and wait.

D: Segmentazione vs paging.
R: Segmentazione: unita logiche di dimensione variabile, tabella con base/limit, frammentazione esterna. Paging: unita fisiche di dimensione fissa, tabella pagina->frame, solo frammentazione interna, non visibile al programmatore.

D: Quale legame c'e tra thrashing, multiprogrammazione e working set?
R: Troppi processi riducono i frame per ciascuno, aumentano i page fault e la CPU resta inattiva (thrashing); il working set model limita la multiprogrammazione sospendendo processi se la somma dei working set supera la RAM.

D: Quando si usa una FIFO invece di una pipe e una message queue invece di una FIFO?
R: FIFO per processi non correlati (client-server). Message queue quando servono messaggi (message-oriented), many-to-many e selezione per tipo.

D: Struttura e modalita dell'esame: cosa si sa?
R: [DA VERIFICARE] I testi d'esame reali non sono nelle fonti; scritto/orale/prova di laboratorio da chiedere al docente. Programma: Cap 1-14 e 16 (no Cap 15) + Lab 01-11.
