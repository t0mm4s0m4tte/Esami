# 09 - Laboratorio UNIX/C (Lab 01-11)

**Fonte**: Doc "Sistemi Operativi - Appunti", sezione "Laboratorio" (01 UNIX, 02 C, 03 processi, 04 file, 05 GDB, 06 segnali, 07 pipe/FIFO, 08 code di messaggi, 09 semafori, 10 shared memory, 11 bash). `[INT]` = scheletro di codice standard non presente nel doc.

## Lab 01 - UNIX
UNIX si compone di kernel, shell (sh, csh, ksh; bash), file system e utilities, ed è costruito attorno a una filosofia precisa: semplicità, programmi con un solo scopo, riuso, **filtri** da combinare tra loro, formati aperti (ASCII) e flessibilità. Gli account sono di tre tipi: root (nessuna restrizione), di sistema e utente. I permessi `rwx` si assegnano a **u/g/o** in forma simbolica (`chmod o+wx f`) o assoluta (`chmod 754 f`), mentre `chown user file` può essere eseguito solo da root.

Il lavoro quotidiano passa dai comandi base: `ls [-l -t -a -i -R]`, `cd`, `cat [-n -v]`, `more/less`, `mv`, `cp`, `rm [-i -r -f]`, `grep [-i -r -n -v]` e `man 1/3 printf` per la documentazione. A questi si aggiungono i wildcard `? * []`, la redirezione `> >> <` e la pipe `|`, che è ciò che permette di concatenare i filtri.

## Lab 02 - C
La compilazione avviene in quattro fasi, ciascuna ispezionabile con un'opzione di `gcc`:
1. il **preprocessore** (`gcc -E`) gestisce `#include <>` contro `""`, `#define` (le macro vanno parentesizzate: `#define SUM(x,y) ((x)+(y))`), `#ifdef` con `-D` e le costanti `__LINE__ __FILE__ __DATE__ __TIME__`;
2. il **compilatore** produce assembly (`-S`) e accetta `-g` per i simboli, `-O0/-O2/-Os` per l'ottimizzazione, `-Wall`, `-std=c89 -pedantic` e `-lm`;
3. l'**assemblatore** genera il file oggetto (`gcc -c` -> `.o`, ispezionabile con `hexdump -C`);
4. il **linker** unisce i `.o` (`gcc a.o b.o -o exe`), richiede un solo `main` e le librerie dinamiche si vedono con `ldd`.

Per la memoria contano le storage class e i segmenti. Le storage class sono:
- `auto`: vive sullo stack con valore indefinito;
- `register`: suggerisce un registro;
- `static`: per una locale la fa persistere, per una globale la rende visibile solo nel file (con init a 0);
- `extern`: dichiara senza allocare.

I segmenti sono:
- **BSS**: globali/static non inizializzate = 0;
- **stack**: LIFO, locali e parametri;
- **heap**: `malloc/calloc/realloc`, con `free` per evitare memory leak.

Un programma si organizza in moduli: `.h` per l'interfaccia e `.c` per l'implementazione, con **header guard** `#ifndef X_H / #define X_H / #endif`. La costruzione si automatizza con **make**: una regola è `target: dipendenze` seguita dal comando preceduto da TAB, il target di default è il primo, i target phony (`clean`, `run`) non corrispondono a file e le variabili usuali sono `CC CFLAGS LDFLAGS`. Infine, per l'ambiente si usano `extern char **environ;` e `char *getenv(const char *name)`.

## Lab 03 - Processi
Ogni processo conosce il proprio PID e quello del padre (`getpid()`, `getppid()`), e la radice dell'albero è `init` (PID 1). Il comando `ps` mostra lo stato con un codice: **S** sleeping, **R** runnable/running, **D** uninterruptible (I/O), **T** stopped, **Z** zombie, più i modificatori N (nice), `<` (alta priorità), `l` (multithread) e `+` (foreground). Si usano `ps -aux`, `ps -la`, `ps -axjf` e `top`.

La creazione di un processo avviene con `fork()`, che ritorna il **PID del figlio al padre, 0 al figlio, -1 in caso di errore**. Il figlio riceve una copia di text, data, heap e stack, ma gli spazi di indirizzamento restano **separati** (esempio della fonte: nel figlio `idata=333 istack=666`, nel padre `111 222`). L'**ordine di esecuzione è indeterminato** (race), mentre l'**offset dei file descriptor è condiviso** tra padre e figlio.

```c
switch (childPid = fork()) { case -1: /*errore*/ break; case 0: /*figlio*/ break; default: /*padre*/ break; }
```

Per eseguire un altro programma si usa `execve(path, argv[], envp[])`, che sostituisce l'immagine del processo: se va a buon fine non ritorna, altrimenti segnala errori come `EACCES, ENOENT, ENOEXEC`, e i file descriptor restano aperti. La famiglia di varianti si legge dalle lettere:
- **p**: cerca in PATH;
- **l**: passa gli argomenti in lista terminata da NULL;
- **v**: li passa come array;
- **e**: fornisce l'ambiente esplicito.

Un processo termina con `_exit(status)`, che conserva solo gli 8 bit bassi (`EXIT_SUCCESS/EXIT_FAILURE`), oppure con `exit()`, che prima esegue gli `atexit()` in ordine inverso e fa il **flush** dei buffer stdio. Alla terminazione le risorse vengono rilasciate, il padre riceve **SIGCHLD** e gli eventuali figli sono adottati da **init**. Il padre raccoglie lo stato del figlio con `wait(&status)` (primo figlio terminato, ritorna il PID) oppure con `waitpid(pid, &status, options)`, dove `pid>0` indica quel figlio, `-1` qualunque, `0` lo stesso gruppo e `<-1` il gruppo |pid|. Le opzioni sono `WNOHANG`, `WUNTRACED`, `WCONTINUED` e lo stato si interpreta con le macro `WIFEXITED/WEXITSTATUS`, `WIFSIGNALED`, `WIFSTOPPED`, `WIFCONTINUED`.

Due situazioni anomale vanno distinte. Un **orfano** è un processo il cui padre è terminato prima: viene adottato da init. Uno **zombie** (Z) è un processo terminato ma non "waitato": occupa ancora una voce della process table e si elimina con la `wait` del padre o terminando il padre, ma **non è uccidibile nemmeno con SIGKILL**. Infine `system(cmd)` fa fork+exec(`/bin/sh`)+wait: è comoda perché supporta redirezioni e pipe, ma è inefficiente (almeno 2 processi extra).

## Lab 04 - File
Il C offre due livelli di accesso ai file, riassunti nella tabella: gli stream `FILE *`, di alto livello e bufferizzati, e i file descriptor `int`, di basso livello e non bufferizzati.

| | Stream `FILE *` | File descriptor `int` |
|---|---|---|
| Livello / buffering | alto, bufferizzato | basso, non bufferizzato |
| Funzioni | `fopen/fclose`, `fgetc/fgets/fscanf`, `fputc/fputs/fprintf`, `fseek/ftell`, `fflush`, `setvbuf` | `open/close`, `read/write`, `dprintf`, `lseek` |

Alcuni dettagli di lettura: `fgetc` ritorna `int` proprio per distinguere `EOF` da 0xFF; `fgets` legge al più `size-1` caratteri e termina con `\0`; `fseek/lseek` usano `SEEK_SET/CUR/END` e non funzionano su pipe e socket. Il buffering può essere unbuffered, **block** o **line**: di default `stdout` è line-buffered, `stderr` unbuffered e i file block-buffered, e lo si cambia con `setvbuf(f, NULL, _IONBF, 0)` (modi `_IONBF/_IOLBF/_IOFBF`).

A basso livello `open(path, flags)` richiede uno tra `O_RDONLY|O_WRONLY|O_RDWR`, combinabile con `O_APPEND, O_CREAT, O_TRUNC` tramite `|` (sono potenze di 2), e `read` ritorna il numero di byte, **0 per EOF**, -1 per errore. I file descriptor standard sono **0 stdin, 1 stdout, 2 stderr**, e la redirezione di shell li richiama con `1> 1>> 2> 2>> &> &>>`.

## Lab 05 - GDB
Per il debug si compila con `gcc -g -O0` e si lancia `gdb prog`. Si parte con `run [args]`, si fissano i breakpoint con `break N` o `break file:N` (`info b` li elenca, `del id` li rimuove) e si avanza con `next` (non entra nelle funzioni) oppure `step` (entra), riprendendo con `cont`. Per ispezionare i valori `print expr` li mostra una volta, `display expr` ad ogni stop, mentre `bt` dà lo stack, `list [N]` il sorgente e `quit` esce. Con i processi figli `set follow-fork-mode parent|child` sceglie chi seguire (default parent), e per agganciarsi a un processo in esecuzione si usa `gdb -p PID`, eventualmente con `sudo`.

## Lab 06 - Segnali
I segnali nascono da eccezioni hardware (SIGFPE, SIGSEGV), azioni dell'utente (Ctrl-C = SIGINT, Ctrl-Z = SIGTSTP) o eventi software (SIGALRM, SIGCHLD, SIGPIPE). Il ciclo di vita è **generazione -> pendenza (pending) -> consegna (delivery)**, e si usano sempre i nomi simbolici di `<signal.h>`. Le azioni di default sono ignorare, terminare, **core dump + terminare**, stop e resume, oppure si installa un **signal handler**. Si distinguono i *trap* (generati dal processo stesso) dagli *interrupt* (esterni).

I segnali da conoscere sono questi:
- SIGINT (2): terminate.
- **SIGKILL (9)**: non catturabile, ignorabile né bloccabile.
- SIGSEGV (11): core dump.
- SIGPIPE (13): scrittura su pipe senza lettori.
- SIGALRM (14): generato da `alarm()`.
- SIGTERM (15): richiesta cortese, default di `kill`.
- **SIGSTOP**: non catturabile.
- SIGCHLD: un figlio cambia stato, ignorato per default.
- SIGUSR1/2: liberi per l'applicazione.

Per inviare un segnale da shell si scrive `kill -SIGINT PID`; da programma `kill(pid, sig)` interpreta `pid>0` come quel processo, `0` come lo stesso gruppo, `<-1` come il gruppo |pid| e `-1` come broadcast, mentre `sig=0` serve solo a verificare l'esistenza (`ESRCH` se non esiste, `EPERM` se mancano i permessi). Esistono inoltre `raise(sig)` per inviarlo a se stessi e `alarm(sec)`.

Per gestire un segnale va usata **`sigaction(signum, &act, &oldact)`** e non `signal()`. La `struct sigaction` contiene `sa_handler`, `sa_mask` (segnali **aggiuntivi** bloccati durante l'handler) e `sa_flags` (`SA_RESTART`, `SA_NODEFER`); di default il segnale in gestione è bloccato durante il suo handler.

```c
struct sigaction sa; sa.sa_handler = h; sigemptyset(&sa.sa_mask); sa.sa_flags = SA_RESTART; sigaction(SIGINT, &sa, NULL);
```

Nell'handler si devono usare solo funzioni **async-signal-safe** (`write` sì, `printf` no), **salvare e ripristinare `errno`** e trattare con cautela le variabili globali. Per bloccare segnali a livello di processo c'è `sigprocmask(how, set, old)` con `SIG_BLOCK / SIG_UNBLOCK / SIG_SETMASK`, che lavora su un `sigset_t` costruito con `sigemptyset, sigaddset...`; la differenza è che la maschera del processo è persistente, mentre `sa_mask` è temporanea. Una syscall bloccante interrotta da un segnale fallisce con `errno=EINTR`, oppure riparte con `SA_RESTART` (non garantito per tutte). Infine i segnali pending sono **accorpati**, cioè non contati (c'è un solo flag), quindi un handler non può usarli per contare quante volte un segnale è arrivato.

## Lab 07 - Pipe e FIFO
L'IPC (comunicazione tra processi) comprende la comunicazione vera e propria (byte stream con pipe, FIFO e datagram socket; messaggi con le code), la sincronizzazione, i segnali e la memoria condivisa. I meccanismi di data-transfer hanno letture **distruttive** e sincronizzazione automatica.

La **pipe** è unidirezionale, è un byte stream FIFO a capacità limitata (`PIPE_BUF`) e non ammette `lseek`. Si crea con `int fd[2]; pipe(fd);`, dove `fd[0]` è l'estremità di lettura e `fd[1]` quella di scrittura; dopo il `fork()` ogni processo **chiude l'estremità che non usa**. Il comportamento di `read` è questo:
- se ci sono dati li consuma;
- se la pipe è vuota ma ha scrittori **blocca**;
- se è vuota e senza scrittori **ritorna 0 (EOF)**.

Per `write`, se la pipe è piena blocca, e se **non ci sono lettori genera SIGPIPE** (o `EPIPE`).

Chiudere i fd inutilizzati è essenziale: se il lettore non chiude `fd[1]` non vedrà mai EOF e resterà bloccato indefinitamente, e se lo scrittore non chiude `fd[0]` non riceverà SIGPIPE. Una **pipeline di shell** come `ls -al | wc -l` si realizza con una pipe e 2 fork: nel primo figlio `dup2(fd[1],1)`, nel secondo `dup2(fd[0],0)`, così i programmi ignorano di parlare con una pipe. `dup2(src,dst)` copia `src` su `dst`, chiudendo prima `dst`.

La **FIFO** (named pipe) è invece un file speciale persistente nel file system (`p` in `ls -l`), creato con il comando `mkfifo` (opzione `-m`) o con la funzione `mkfifo` e un `mode` come `S_IRUSR`. La sua `open` è **bloccante**: la lettura blocca finché c'è uno scrittore e viceversa, in una sorta di rendez-vous. Serve per processi non correlati, tipicamente in schemi client-server. Il confronto con la pipe è nella tabella.

| | Pipe | FIFO |
|---|---|---|
| Esistenza | solo in memoria | file speciale |
| Identificazione | fd ereditato | pathname |
| Ambito | processi correlati | qualsiasi processo con permessi |
| Creazione | `pipe()` | `mkfifo()` |

## Lab 08 - Code di messaggi (System V)
System V offre tre IPC: **message queue**, **semafori** e **shared memory**. Gli oggetti sono identificati da una **chiave** `key_t`, che può essere un valore fisso, `IPC_PRIVATE` (crea un nuovo oggetto il cui id va propagato via fork o altro) oppure il risultato di `ftok(pathname, proj)`. Le funzioni `xxxget(key, ..., flag)` funzionano come `open`: `IPC_CREAT` crea se manca, `IPC_EXCL` (insieme a CREAT) fallisce con `EEXIST` se l'oggetto esiste, e i permessi stanno nei 9 bit bassi (es. 0644).

Questi oggetti sono **persistenti nel kernel** e *connectionless*: restano finché non vengono rimossi esplicitamente (`ipcs`, `ipcrm`, `ipcmk`; `xxxctl(..., IPC_RMID)`). La rimozione è **immediata** per code e semafori e **differita** per la shm (dopo l'ultimo detach, come `unlink`). `IPC_STAT/IPC_SET` leggono e modificano le strutture `msqid_ds / semid_ds / shmid_ds` (che contengono `ipc_perm`).

Per le code si crea l'oggetto con `msgget(key, flag)`. Con `msgsnd(msqid, &msg, msgsz, flag)` si invia una struct che ha `long mtype` (>0) seguito dal corpo, e `msgsz` conta solo il corpo; `IPC_NOWAIT` fa fallire con `EAGAIN` se la coda è piena. Con `msgrcv(msqid, &msg, maxsz, msgtyp, flag)` la selezione dipende da `msgtyp`:
- **`==0`**: primo messaggio (FIFO);
- **`>0`**: primo con `mtype==msgtyp`;
- **`<0`**: coda a priorità, cioè primo con mtype minimo e `<= |msgtyp|`.

I flag sono `IPC_NOWAIT` (`ENOMSG` se nulla da leggere) e `MSG_NOERROR` (tronca invece di fallire con `E2BIG`); `msgctl(..., IPC_RMID)` sveglia i processi bloccati con `EIDRM`.

Esempio della fonte: una coda con mtype 300,100,200,400,100 e `msgtyp=-300` viene prelevata nell'ordine 100 (pos 2), 100 (pos 5), 200, 300, poi blocca (400 > 300).

La message queue, a differenza di pipe e FIFO, è message-oriented, many-to-many e permette la selezione per tipo.

## Lab 09 - Semafori System V
I semafori non trasferiscono dati ma **sincronizzano**, e in System V esistono sempre in **set** la cui dimensione è fissata alla creazione. Le operazioni sono inizializzazione, decremento (P/wait), incremento (V/signal, mai bloccante) e **attesa di zero**. Si crea con `semget(key, nsems, flag)` e si controlla con `semctl(semid, semnum, cmd, ...)`, che richiede una `union semun { int val; struct semid_ds *buf; unsigned short *array; }` **da dichiarare a mano**; i comandi sono `SETVAL, GETVAL, SETALL, GETALL, GETPID, GETNCNT, GETZCNT, IPC_STAT, IPC_SET, IPC_RMID`.

L'operazione vera e propria è `semop(semid, struct sembuf *sops, nsops)`, con `sembuf {sem_num, sem_op, sem_flg}`:
- `sem_op>0` rilascia;
- `sem_op==0` attende lo zero;
- `sem_op<0` acquisisce e blocca se il valore è < |sem_op|.

L'esecuzione è **atomica tutto-o-niente** sull'intero array. `IPC_NOWAIT` fa fallire con `EAGAIN` e `semtimedop` aggiunge un timeout. Un processo bloccato si sblocca per tre motivi:
- la condizione si verifica;
- il set viene rimosso (`EIDRM`);
- arriva un segnale (`EINTR`, **anche con SA_RESTART**).

È un anti-pattern fare busy-waiting, con `IPC_NOWAIT` in un ciclo o con `while(semctl(GETVAL)>0)`.

Il **semaforo binario** (mutex) si implementa con quattro funzioni di utilità: `initSemAvailable` (SETVAL 1), `initSemInUse` (SETVAL 0), `reserveSem` (`sem_op=-1`) e `releaseSem` (`sem_op=+1`). Esempio della fonte: 10 processi che incrementano un contatore in shm producono una race condition (lost update) se non c'è il semaforo.

## Lab 10 - Shared memory System V
La shared memory mappa lo stesso segmento fisico negli spazi virtuali di più processi. Poiché il kernel non interviene sui dati è veloce, ma richiede **sincronizzazione esplicita (semafori)**.

Il ciclo di vita passa per quattro chiamate:
1. `shmget(key, size, flag)` crea il segmento (la dimensione è arrotondata alla pagina);
2. `shmat(shmid, NULL, flag)` lo attacca e ritorna `void*` (`(void*)-1` in caso di errore; con `SHM_RDONLY` una scrittura causa SIGSEGV; è meglio passare `shmaddr=NULL`);
3. `shmdt(addr)` lo stacca senza distruggerlo;
4. `shmctl(shmid, IPC_RMID, 0)` lo cancella in modo **differito**; la buona pratica è chiamare RMID subito dopo create+attach.

La struttura `shmid_ds` contiene `shm_segsz, shm_nattch, shm_perm`.

Sul comportamento con i processi: **fork** eredita i segmenti, **exec** li stacca (non li distrugge) e la terminazione li stacca. Ridimensionare un segmento non è possibile con `realloc`: occorre
1. bloccare gli accessi (semaforo);
2. creare un nuovo segmento e attaccarlo;
3. copiare i dati;
4. fare RMID del vecchio;
5. comunicare il nuovo id.

```c
id = shmget(KEY, SZ, IPC_CREAT|0666); p = shmat(id, NULL, 0); /* uso */ shmdt(p); shmctl(id, IPC_RMID, 0);
```

## Lab 11 - Bash
Uno script bash inizia con lo shebang `#!/bin/bash`, richiede `chmod +x` e usa `#` per i commenti. Le variabili si assegnano con `var=val` (**senza spazi**) e si leggono con `$var`; i parametri sono `$0 $1 $2`. Sul quoting, `"..."` espande le variabili, `'...'` è letterale e `` `cmd` `` fa la sostituzione di comando; l'aritmetica si scrive con `let "d=$a-$b"`.

Le strutture di controllo sono `while [ $i -lt 3 ]; do ... done`, `if [ ... ]; then ... else ... fi` (gli spazi dentro `[ ]` sono obbligatori), `for f in \`ls *.c\`; do ... done`, l'operatore `&&` e `read var` per l'input. Gli operatori di confronto numerico sono `-eq -ne -gt -lt -ge -le` e i test sui file `-f -s -r -w -x -d -h`; conviene sempre citare `"$1"`. Quanto allo scope, le variabili sono locali alla shell e `export` le rende ereditabili dalle sotto-shell; in `.bashrc` si mettono alias e variabili, ad esempio `export PATH=.:mybin:$PATH`.

## Cose da saper fare all'esame
- Scrivere un programma con **fork + exec + wait** (switch su `fork`, `WIFEXITED/WEXITSTATUS`), spiegando zombie/orfani.
- Prevedere l'output di codice con `fork()` (quante stampe, ordine indeterminato, variabili separate; buffering stdout al `fork`).
- Comunicazione padre-figlio con **pipe** (chiusura estremità) e redirezione con `dup2`; client-server con **FIFO**.
- Installare un handler con `sigaction` (sa_mask, SA_RESTART), bloccare segnali con `sigprocmask`, `kill/alarm`.
- Usare **msgget/msgsnd/msgrcv** (struct con `mtype`); semafori binari con `semop`; shm con `shmget/shmat/shmdt/shmctl` sincronizzata da semaforo.
- Comandi `gcc` per le fasi di build; scrivere un makefile; script bash con if/while/for e parametri.

## Dubbi
- [DA VERIFICARE] Tabella segnali del doc usa numeri BSD/macOS (SIGSTOP=17, SIGCHLD=20, SIGUSR1=30); su Linux sono SIGSTOP=19, SIGCHLD=17, SIGUSR1=10. Usare sempre i nomi simbolici.
- [DA VERIFICARE] "lseek su pipe -> errno=EPIPE": su Linux è normalmente `ESPIPE`.
- Il doc descrive `ls -i` come "indice all'interno del disco": è l'**inode number**.
- Nel doc mancano esempi completi di codice per Lab 08-10 (solo frammenti): rivedere i sorgenti del corso.
