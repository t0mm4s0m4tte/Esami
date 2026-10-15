# 02 - Processi, IPC e Thread (Cap 3-4)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 03-04 (+ Lab 03 per il lato UNIX, vedi `09-laboratorio-unix.md`). `[INT]` = integrazione standard non nelle fonti.

## Mappa
Il capitolo distingue il processo (entità attiva) dal programma (entità passiva) e i processi indipendenti da quelli cooperanti. Per questi ultimi servono meccanismi di IPC (memoria condivisa o message passing, con socket, RPC e pipe come strumenti concreti). Si passa poi ai thread: benefici, legge di Amdahl, modelli di mapping, librerie, threading implicito, problemi tipici e implementazioni in Windows e Linux.

## Processi e IPC
Un **processo** è un programma in esecuzione; un processo multithread ha più program counter. Quando i processi sono **cooperanti** condividono informazioni, ottengono speedup, modularità e convenienza, ma hanno bisogno di un modo per scambiarsi dati. Nota importante: stati del processo (new, ready, running, waiting, terminated), PCB e context switch **non sono trattati** nel doc di Cap 3 [INT, NON NELLE FONTI]; vanno ripassati dal libro (Silberschatz, 10 ed.) se richiesti. Per UNIX gli stati mostrati da `ps` sono nel Lab 03.

### Shared memory vs message passing
I due modelli di IPC rispondono a un compromesso classico. Con la memoria condivisa i processi leggono e scrivono una regione comune: dopo l'impostazione iniziale non servono system call per scambiare dati, quindi è più veloce, ma la sincronizzazione è tutta a carico del programmatore. Con il message passing è il SO a trasferire i messaggi con `send/receive`: è più lento perché il kernel interviene a ogni messaggio, ma la sincronizzazione è implicita (rendezvous) e funziona anche in ambiente distribuito.

| | Shared memory | Message passing |
|---|---|---|
| Controllo | processi utente | SO (send/receive) |
| Velocità | più veloce (no syscall per scambio) | più lento (kernel a ogni msg) |
| Sincronizzazione | esplicita, a carico del programmatore | implicita (rendezvous) |
| Uso | stessa macchina, molti dati | locale e distribuito |

Il classico banco di prova è il **produttore-consumatore** con un buffer circolare limitato, gestito con due indici: `in` (primo posto libero) e `out` (primo posto pieno). Il buffer è pieno quando `(in+1)%BUFFER_SIZE == out` (si spreca quindi uno slot) ed è vuoto quando `in == out`. In POSIX la memoria condivisa si crea con `shm_open()` (crea l'oggetto e ritorna un fd), `ftruncate()` (ne fissa la dimensione) e `mmap()` (ne ottiene un puntatore locale).

Nel message passing le scelte di progetto sono tre. Il collegamento può essere **diretto** (`send(P,msg)`, un link per coppia di processi, creato automaticamente) o **indiretto** (mailbox/porte, link condiviso da più processi). La sincronizzazione può essere con send/receive **bloccanti** (sincrono) o **non bloccanti** (asincrono); se entrambe sono bloccanti si ha il **rendezvous**. Il buffer può avere capacità **zero** (rendezvous), **limitata** (n) o **illimitata**. Esempi reali: Mach usa solo message passing (mailbox Kernel e Notify per ogni task); Windows usa **LPC**, valido solo sulla macchina locale, con porte (una connection port e due porte private di comunicazione).

Tre strumenti concreti completano il quadro. Un **socket** è un endpoint identificato da IP e porta. Una **RPC** si realizza con uno stub lato client (che fa il marshalling dei parametri in un formato indipendente dalla macchina, ad esempio XDR, per risolvere i problemi di endianness) e uno stub lato server. Le **pipe ordinarie** sono unidirezionali e richiedono una relazione di parentela; le **named pipe** sono bidirezionali e collegano anche processi non correlati.

## Thread
Un **thread** è l'unità di utilizzo della CPU e condivide con gli altri thread dello stesso processo codice, dati e file aperti. I benefici sono la condivisione delle risorse, l'economia (creazione e context switch più leggeri di quelli di un processo), la scalabilità sui multicore e la reattività. Due termini vanno distinti con cura: la **concorrenza** significa che più task fanno progressi (anche su un solo core, con interleaving), il **parallelismo** significa esecuzione realmente simultanea (multicore). Il parallelismo si divide in *data parallelism* (stessa operazione su sottoinsiemi di dati) e *task parallelism* (thread diversi con operazioni diverse).

Il guadagno ottenibile dal parallelismo ha un limite, espresso dalla **legge di Amdahl**: `speedup <= 1 / (S + (1-S)/N)`, dove S è la frazione seriale del programma e N il numero di core. Per N che tende a infinito lo speedup tende a `1/S`: la parte seriale domina. Esempio della fonte: S=0.25, N=2 dà 1/(0.25+0.375) = **1.6**, con limite 1/0.25 = **4**.

### Modelli di thread
Il modo in cui i thread utente si mappano su quelli kernel definisce concorrenza e costi. Nel many-to-one una syscall bloccante blocca tutto e non si sfruttano i multicore; l'one-to-one dà più concorrenza e parallelismo ma ha overhead e un limite al numero di thread; il many-to-many è un compromesso; il two-level aggiunge la possibilità di legare un thread utente a un kernel thread.

| Modello | Mapping | Note |
|---|---|---|
| Many-to-One | molti user -> 1 kernel | syscall bloccante blocca tutto; no multicore; Green Threads |
| One-to-One | 1:1 | più concorrenza e parallelismo; overhead, limite al n. di thread; Windows, Linux, Solaris recenti |
| Many-to-Many | m user -> n <= m kernel | compromesso |
| Two-level | M:M + possibilità di legare un thread a un kernel thread | IRIX, HP-UX, Tru64, Solaris vecchio |

### Librerie e threading implicito
Le librerie principali sono Pthreads (standard IEEE 1003.1c, con `pthread_create` e `pthread_join`), quella di Windows (`CreateThread`, `WaitForSingleObject`) e Java (`Thread`/`Runnable`, `start()` che invoca `run()`, `join()`). Il **threading implicito** sposta la gestione dei thread da programmatore a compilatore/runtime: il *thread pool* tiene thread pre-creati da riusare e limita il loro numero; *OpenMP* usa direttive come `#pragma omp parallel for` per marcare regioni parallele; *GCD* di Apple usa blocchi `^{}` messi in dispatch queue **serial** (FIFO) o **concurrent**, con 3 code globali per priorità.

### Problemi con i thread
Il multithreading complica alcune operazioni classiche, che conviene ricordare per tipo di problema:
- **`fork()`** in un processo multithread: duplica solo il thread chiamante o tutti? Esistono due versioni; `exec()` invece sostituisce l'intero processo.
- **Segnali**: la consegna può avvenire a un thread specifico, a tutti, ad alcuni o a un thread designato.
- **Cancellazione**: *asincrona* (immediata, rischiosa) oppure *differita* (ai cancellation points, è il default).
- **TLS** (thread-local storage): dati privati del thread che persistono tra chiamate, diversi da variabili locali e statiche condivise.
- **Scheduler activations**: un LWP (processore virtuale per la libreria) più upcall dal kernel.

### Windows e Linux
In Windows i thread sono one-to-one e descritti da tre strutture: ETHREAD (kernel; puntatore al processo e al KTHREAD), KTHREAD (kernel; informazioni di scheduling e stack kernel) e TEB (user; id del thread, stack user, TLS). In Linux processi e thread sono entrambi *task* e vengono creati con `clone()`, i cui flag di condivisione sono `CLONE_VM`, `CLONE_FILES`, `CLONE_SIGHAND` e `CLONE_FS`: più flag si passano, più il nuovo task assomiglia a un thread.

## Cose da saper fare all'esame
- Confrontare shared memory e message passing; descrivere blocking/non-blocking e capacità del buffer.
- Scrivere la logica del buffer circolare e dire quando è pieno/vuoto.
- Calcolare speedup con Amdahl (dato S e N).
- Descrivere i 4 modelli di threading con vantaggi/svantaggi.
- Spiegare cancellazione asincrona vs differita, TLS, thread pool.
- Spiegare come Linux crea thread (clone + flag).

## Dubbi
- [DA VERIFICARE] Nelle fonti manca la parte su stati, PCB e context switch (Cap 3 del libro): decidere se serve integrarla.
