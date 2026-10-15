# 01 - Fondamenti e strutture del SO (Cap 1-2)

**Fonte**: Google Doc "Sistemi Operativi - Appunti" (Teoria Cap 01-02 + sezione "Handmade" Cap 1-2). Tag `[INT]` = integrazione standard NON presente nelle fonti.

## Mappa
Il capitolo parte dal ruolo del SO (macchina virtuale e gestore di risorse), distingue kernel, programmi di sistema e middleware, poi spiega i meccanismi hardware che rendono possibile il controllo (interrupt, eccezioni, dual mode, timer, system call). Passa quindi alle architetture (single-core, multicore, UMA/NUMA, cluster, big.LITTLE), ai servizi offerti, alle diverse strutture interne e infine a boot e debugging.

## Ruolo del sistema operativo
Il SO è l'intermediario tra l'hardware e le applicazioni, e svolge due funzioni complementari: da un lato estende l'ISA della macchina fornendo una macchina virtuale più comoda da programmare, dall'altro alloca e controlla le risorse (CPU, memoria, I/O) tra i programmi che le richiedono. Il **kernel** è l'unico programma sempre in esecuzione; i *programmi di sistema* (shell, utility) sono invece normali programmi che girano in user context e non fanno parte del kernel. Sui dispositivi mobili all'insieme si aggiunge il middleware, che offre servizi alle applicazioni sopra il kernel.

## Interrupt, eccezioni e dual mode
Il controllo del SO sull'hardware poggia su pochi meccanismi. Un **interrupt** è un evento asincrono generato dall'hardware (può essere mascherabile o non mascherabile), mentre un'**eccezione (trap)** è sincrona, cioè generata da un'istruzione del programma stesso: un errore oppure una system call. La differenza è quindi chi origina l'evento e se arriva "a sorpresa" rispetto al flusso di istruzioni.

Il ciclo di gestione di un interrupt segue sempre la stessa logica. A fine istruzione la CPU controlla la linea INT; se è attiva salva lo stato (PC e registri), usa il numero dell'interrupt come indice nella *interrupt vector table* per trovare l'*interrupt handler*, lo esegue e infine ripristina lo stato riprendendo il programma interrotto. Nel multicore il **PIC** instrada ogni interrupt a un solo core. Esistono poi l'interrupt chaining (più handler sulla stessa linea provati in sequenza) e i livelli di priorità.

Perché tutto questo sia sicuro serve il **dual mode**: un bit di modalità distingue user (1) e kernel (0). Interrupt, eccezione e system call portano la CPU in kernel mode (bit 0), e prima di restituire il controllo all'utente il bit torna a 1. Su Intel il concetto si estende ai ring, da 0 (kernel) a 3 (user). Le istruzioni privilegiate, come quelle di I/O, sono eseguibili solo in kernel mode: è così che il SO impedisce ai programmi utente di toccare direttamente l'hardware. Il **timer**, che genera interrupt a intervalli regolari, completa il quadro evitando che un programma monopolizzi la CPU o resti in un loop infinito.

## Multiprogrammazione, multicore e architetture
La **multiprogrammazione** tiene più processi in memoria perché la CPU non sia mai idle, mentre il **multitasking** (time-sharing) cambia rapidamente processo per garantire reattività. Con i multicore si passa dal pseudo-parallelismo (interleaving) al vero parallelismo. La spinta verso i multicore nasce dalla fine del Dennard scaling (~2002): la frequenza non cresce più, quindi si aumenta il numero di core per chip. La crescita delle prestazioni single-core lo mostra bene: 52%/anno (1978-86), poi 25%, 23%, 12% e infine 3.5%.

Le architetture differiscono per come i processori accedono alla memoria. Nei sistemi UMA/SMP l'accesso è uniforme ma il bus diventa un collo di bottiglia. Nei NUMA la memoria locale è veloce e quella remota lenta, per cui il SO deve essere *locality-aware* e tenere un processo e la sua memoria sullo stesso nodo. I cluster hanno memoria distribuita, un SO per nodo e comunicano per scambio di messaggi (asimmetrico: uno attivo più uno standby; simmetrico: tutti attivi). Nei sistemi big.LITTLE i core sono eterogenei. In tutti i casi la coerenza delle cache è garantita **in hardware**.

La gerarchia di memoria completa il quadro: registri (1 ciclo), cache, RAM (la CPU subisce uno stall), disco. La CPU accede direttamente solo a registri e RAM. Per l'I/O, i piccoli trasferimenti avvengono a interrupt, i grandi via DMA.

Due concetti di contorno: la **virtualizzazione** (stessa CPU, SO guest su host) si distingue dall'**emulazione** (CPU diversa, traduzione delle istruzioni); il cloud può essere pubblico, privato o ibrido e offre SaaS, PaaS e IaaS; i sistemi real-time embedded devono rispettare scadenze (deadline).

## Servizi del SO
Il SO offre due famiglie di servizi. Quelli rivolti all'utente sono: interfaccia (CLI, GUI, batch, touch), esecuzione di programmi, operazioni di I/O, file system, comunicazioni (shared memory o message passing) e rilevamento errori. Quelli rivolti all'efficienza del sistema comprendono l'allocazione delle risorse, l'accounting e la difesa. Qui è importante distinguere **protezione** (controllo degli accessi alle risorse *interne*) da **sicurezza** (difesa da minacce *esterne*, autenticazione).

## System call e API
Le system call sono il ponte tra user e kernel. Ogni syscall ha un numero, il kernel mantiene una tabella indicizzata da quel numero, l'invocazione avviene tramite **trap** e al ritorno il kernel restituisce un codice di stato. Il programmatore però non le usa direttamente: lavora con le **API** (Win32, POSIX, Java), che garantiscono semplicità e portabilità, mentre l'**ABI** è l'interfaccia a livello binario (dimensione degli indirizzi, passaggio dei parametri, stack, formato delle librerie).

I parametri possono essere passati in tre modi: (1) nei registri, veloce ma limitato (nella fonte "handmade" si parla di fino a 5); (2) in un blocco di memoria il cui indirizzo è in un registro (usato da Linux e Solaris); (3) sullo stack. Le categorie di syscall sono controllo dei processi, gestione dei file, gestione dei dispositivi, informazioni, comunicazioni e protezione.

Windows e Unix offrono le stesse funzioni con nomi diversi:
- `CreateProcess` corrisponde a `fork()`+`exec()`;
- `CreateFile/ReadFile/WriteFile/CloseHandle` a `open/read/write/close`;
- `CreatePipe, CreateFileMapping/MapViewOfFile` a `pipe, shmget/mmap`;
- `SetFileSecurity` a `chmod/umask/chown`.

## Strutture del sistema operativo
Come organizzare il codice del SO è una scelta di compromesso tra prestazioni, modularità e affidabilità. Il sistema semplice (MS-DOS) non separa nulla ed è fragile; la struttura monolitica (UNIX) mette tutto il kernel in un unico spazio di indirizzi, con ottime prestazioni ma difficoltà di estensione e debug; la stratificazione (layered) impone che lo strato N usi solo lo strato N-1, con il costo di attraversare molti livelli; il microkernel (Mach) lascia nel kernel solo IPC e gestione base di memoria e CPU, spostando il resto in server user, a vantaggio di affidabilità e sicurezza ma con overhead di message passing; i moduli caricabili uniscono un kernel base a moduli caricati a runtime che si chiamano tra loro; i sistemi ibridi mescolano le idee (Linux monolitico con moduli, Windows con una parte microkernel, macOS/iOS con Mach + BSD).

| Struttura | Idea | Pro | Contro |
|---|---|---|---|
| Semplice (MS-DOS) | nessuna separazione | poco spazio | fragile, applicazioni accedono all'HW |
| Monolitica (UNIX) | kernel unico spazio indirizzi | prestazioni | difficile da estendere/debuggare |
| Layered | strato N usa solo N-1 | modularità, debug facile | overhead di attraversamento |
| Microkernel (Mach) | in kernel solo IPC + memoria/CPU base; resto server user | affidabilità, sicurezza, estendibilità | overhead message passing |
| Moduli caricabili | kernel base + moduli a runtime, si chiamano a vicenda | flessibilità + efficienza | - |
| Ibrida | Linux (monolitico+moduli), Windows (parte microkernel), macOS/iOS (Mach + BSD) | | |

Un principio di progetto che attraversa tutte queste strutture è la separazione tra **policy e mechanism**: il meccanismo è il *come*, la policy è il *cosa*. Per esempio il timer è un meccanismo che può servire a molte policy di scheduling diverse.

Alcuni esempi di sistemi reali: iOS è organizzato in Core OS, Core Services, Media Services e Cocoa Touch; Android in un kernel Linux modificato, librerie C/C++, runtime Dalvik/ART e app Java; macOS ha l'interfaccia Aqua e Darwin (Mach + BSD) come nucleo.

## Boot e debugging
All'avvio il firmware (ROM/EEPROM) lancia il bootstrap loader, che carica il kernel in RAM; GRUB può permettere di scegliere kernel e opzioni. **SYSGEN** è la configurazione/compilazione del kernel per l'hardware specifico. Per il debugging si usano log file, **core dump** (crash di un'applicazione), **crash dump** (crash del kernel), profiling/tracing e DTrace (probe a basso impatto); c'è anche la legge di Kernighan sul debugging. Quanto alla produzione dei programmi, il sorgente diventa oggetto col compilatore, eseguibile col linker e viene portato in memoria dal loader. Le applicazioni sono portabili grazie a un linguaggio interpretato (Python), a una macchina virtuale (Java) oppure a API standard con compilazione per ciascuna piattaforma.

## Cose da saper fare all'esame
- Distinguere interrupt/trap/syscall e descrivere il ciclo di gestione di un interrupt.
- Spiegare dual mode e perché serve (protezione); perché I/O è privilegiato.
- Confrontare monolitico / layered / microkernel / moduli con pro e contro.
- Spiegare passaggio parametri alle syscall e differenza API/syscall/ABI.
- Distinguere UMA/NUMA/cluster; perché il SO deve essere NUMA-aware.
- Descrivere sequenza di boot.

## Dubbi
Due punti da non dimenticare: il numero massimo di parametri nei registri e il refuso sul nome di un protocollo.
- [DA VERIFICARE] Il doc dice "fino a 5 parametri nei registri" (sezione handmade): è un valore di esempio del libro? Non è un limite generale.
- Typo nelle fonti: "XDL" dovrebbe essere XDR (External Data Representation) in Cap 3 (RPC).
