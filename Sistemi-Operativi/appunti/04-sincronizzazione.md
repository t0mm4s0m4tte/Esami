# 04 - Sincronizzazione (Cap 6-7)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 06-07. Il codice di `test_and_set`/`compare_and_swap` per il lock manca nel doc: lo scheletro sotto è `[INT]` standard.

## Mappa
Il capitolo parte dalla race condition e dal problema della sezione critica (con i suoi 3 requisiti), presenta le soluzioni software (Peterson) e hardware (TAS, CAS, mutex/spinlock), poi gli strumenti di livello più alto (semafori, monitor). Discute i problemi tipici (deadlock, starvation, priority inversion, usi scorretti), i problemi classici (bounded buffer, readers-writers, dining philosophers) e come i SO reali (Solaris, Windows, Linux), Pthreads e alcune alternative affrontano la questione.

## Race condition
Quando più processi accedono a dati condivisi e il risultato dipende dall'ordine in cui le istruzioni si intrecciano, si ha una race condition. L'esempio base è `counter++` / `counter--`, che **non sono atomici**: ciascuno si compila in load, add e store sui registri. Esempio della fonte (counter=5): P esegue r1=counter; r1=r1+1; C esegue r2=counter; r2=r2-1; poi P fa counter=r1 (6) e C fa counter=r2 (**4**). Il risultato 4 è errato, perché ci si aspettava 5.

## Sezione critica
Il rimedio è racchiudere gli accessi ai dati condivisi in una sezione critica con struttura entry section / **critical section** / exit section / remainder section. Una soluzione corretta deve rispettare tre requisiti, nell'ipotesi che ogni processo abbia velocità non nulla e che non si faccia alcuna ipotesi sulla velocità relativa:
1. **Mutua esclusione**: uno solo in CS.
2. **Progresso**: se la CS è libera e qualcuno vuole entrare, la scelta non può essere rimandata indefinitamente e coinvolge solo chi non è nella remainder.
3. **Attesa limitata**: limite al n. di ingressi altrui dopo la mia richiesta (no starvation).

## Soluzioni base
La soluzione software classica per due processi è quella di **Peterson**, che richiede load/store atomici e usa le variabili `int turn; boolean flag[2];`. Ogni processo dichiara l'intenzione di entrare (`flag[i]=true`) e concede il turno all'altro (`turn=j`), poi attende finché l'altro vuole entrare ed è il suo turno. Soddisfa tutti e 3 i requisiti.
```c
do { flag[i]=true; turn=j; while(flag[j] && turn==j); /*CS*/ flag[i]=false; /*RS*/ } while(true);
```

Disabilitare gli interrupt funziona solo su uniprocessore ed è inefficiente. Le soluzioni pratiche si appoggiano a istruzioni **atomiche** dell'hardware: `test_and_set(target)` ritorna il valore vecchio e imposta TRUE; `compare_and_swap(value, expected, new)` ritorna il valore vecchio e scrive new solo se il valore è uguale a expected. `[INT]` I lock corrispondenti sono `while(test_and_set(&lock)); /*CS*/ lock=false;` e `while(compare_and_swap(&lock,0,1)!=0); /*CS*/ lock=0;`. Garantiscono la mutua esclusione ma **non l'attesa limitata**, quindi la starvation resta possibile. Sulla stessa idea si basa il **mutex lock** con `acquire()/release()` atomiche; la sua implementazione base fa **busy waiting** ed è detta **spinlock**.

## Semafori
Un semaforo è un intero S con due operazioni atomiche: `wait(S)` (P: `while(S<=0); S--`) e `signal(S)` (V: `S++`). Il **counting** ha dominio libero e rappresenta n istanze di una risorsa, il **binario** vale 0/1 e si comporta come un mutex. Un uso tipico è imporre un ordine: se S1 in P1 deve precedere S2 in P2, si usa un semaforo `synch=0`; P1 esegue `S1; signal(synch)`, P2 esegue `wait(synch); S2`.

Per evitare il busy waiting, un semaforo può avere una coda di attesa: quando `wait` trova S<=0 chiama `block()` (il processo passa da running a waiting), mentre `signal` chiama `wakeup()` (da waiting a ready).

Il **monitor** è un tipo di dato astratto che offre mutua esclusione implicita (un solo processo attivo alla volta) ed è più sicuro dei semafori perché la disciplina è imposta dal costrutto. All'interno si usano le **condition variable**: `x.wait()` sospende il chiamante e rilascia il monitor, `x.signal()` risveglia un processo in attesa (nessun effetto se non c'è nessuno). Le semantiche possibili sono *signal and wait* (chi segnala si sospende) e *signal and continue* (chi segnala prosegue). Esempio della fonte: un `ResourceAllocator` con variabile busy e `x.wait(priority)`.

## Problemi
La sincronizzazione mal fatta produce quattro tipi di guai. Nel **deadlock** (P0: wait(S), wait(Q); P1: wait(Q), wait(S)) si crea un'attesa circolare. La **starvation** può nascere per esempio da una coda del semaforo gestita LIFO. La **priority inversion** si verifica quando un processo a bassa priorità tiene un lock, uno a media priorità lo prelaziona e quello ad alta priorità resta bloccato; la soluzione è la **priority inheritance**, in cui il possessore del lock eredita la priorità massima tra i processi in attesa. Infine ci sono gli **usi scorretti dei semafori**: invertire `signal(mutex)...wait(mutex)` o dimenticare il `wait` viola la mutua esclusione, dimenticare il `signal` provoca deadlock.

## Problemi classici (soluzioni)
Il **bounded buffer** usa tre semafori: `mutex=1`, `full=0`, `empty=n`. Il produttore esegue `wait(empty); wait(mutex); inserisci; signal(mutex); signal(full)`; il consumatore `wait(full); wait(mutex); preleva; signal(mutex); signal(empty)`. [INT] L'ordine standard dei wait è prima empty/full e poi mutex: invertirlo provoca deadlock.

Nei **readers-writers** si usano `rw_mutex=1` e `mutex=1` (che protegge `read_count=0`): il primo lettore fa `wait(rw_mutex)`, l'ultimo fa `signal(rw_mutex)`. Esistono più varianti per evitare la starvation di scrittori o di lettori.

Nei **dining philosophers** (5) il rischio è il deadlock quando tutti prendono la bacchetta sinistra. La soluzione con monitor assegna a ogni filosofo uno stato THINKING/HUNGRY/EATING; `test(i)` verifica che i vicini `(i+4)%5` e `(i+1)%5` non stiano mangiando, e `pickup()` e `putdown()` (che notifica i vicini) ne fanno uso. Il deadlock è escluso ma la **starvation resta possibile**.

## Sincronizzazione nei SO reali
Ogni sistema adatta i meccanismi generali alle proprie esigenze.

| SO | Meccanismo distintivo |
|---|---|
| Solaris | **mutex adattivi** (spin se il possessore gira su una CPU, altrimenti sleep); condition variable, R/W lock, **turnstile** (coda ordinata per priorità, associata al thread possessore -> priority inheritance) |
| Windows | uniprocessore: interrupt mask; multiprocessore: spinlock (thread in spinning non viene prelazionato); **dispatcher objects** (mutex, semafori, eventi, timer) con stato signaled / non-signaled |
| Linux | fino a 2.6 sezioni brevi con interrupt disabilitati; da 2.6 kernel completamente preemptive; semafori, atomic integers, spinlock (+ versione R/W); su single-CPU spinlock = disabilita/abilita kernel preemption |

Pthreads offre mutex lock e condition variable (R/W lock e spinlock non sono portabili). Tra le alternative più moderne ci sono la transactional memory (una transazione atomica con abort/retry), OpenMP (`#pragma omp critical`) e i linguaggi funzionali come Erlang e Scala, dove le variabili immutabili eliminano le data race.

## Cose da saper fare all'esame
- Mostrare l'interleaving che produce una race condition (tabella passo/registri/counter).
- Elencare e verificare i 3 requisiti della CS per una soluzione data (Peterson).
- Scrivere con semafori: bounded buffer, readers-writers, ordinamento di due istruzioni; individuare errori (deadlock/ME violata) in codice dato.
- Spiegare spinlock vs sleep lock, mutex adattivo, priority inheritance.
- Monitor + condition variable: signal and wait vs signal and continue.

## Dubbi
- [DA VERIFICARE] Le fonti non riportano il codice completo di produttore/consumatore, readers-writers e DiningPhilosophers (solo descrizioni): ricostruito/da riscrivere a mano dal libro.
