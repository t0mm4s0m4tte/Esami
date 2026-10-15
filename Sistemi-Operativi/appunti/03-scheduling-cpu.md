# 03 - Scheduling della CPU (Cap 5)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 05. `[INT]` = integrazione standard/calcolo mio, non nelle fonti: **ricontrollare a mano** gli esempi numerici `[INT]`.

## Mappa
Il capitolo spiega perché serve uno scheduler (alternanza di burst CPU e I/O), come si distinguono scheduling preemptive e nonpreemptive, quali criteri si usano per giudicare un algoritmo (utilizzo, throughput, turnaround, waiting, response) e poi passa in rassegna FCFS, SJF/SRTF, Priority, Round Robin, Multilevel Queue e Multilevel Feedback Queue. Chiude con il real-time.

## Concetti
Un processo alterna **CPU burst** e **I/O burst**: il multiprogramming funziona perché mentre un processo attende l'I/O la CPU può servirne un altro. Lo **CPU scheduler** sceglie quale processo della *ready queue* eseguire; il **dispatcher** concretizza la scelta (context switch, passaggio a user mode, salto al punto giusto del programma) e il tempo che impiega si chiama **dispatch latency**.

Le decisioni di scheduling possono avvenire in quattro casi: (1) running->waiting, (2) running->ready, (3) waiting->ready, (4) terminazione. Se si decide solo nei casi 1 e 4 lo scheduling è **nonpreemptive** (il processo rilascia la CPU spontaneamente); se si decide in tutti e 4 è **preemptive**, con il rischio di problemi di consistenza sui dati condivisi e nel kernel.

Per confrontare gli algoritmi si usano cinque criteri: la **CPU utilization** (da massimizzare), il **throughput** (processi completati per unità di tempo, da massimizzare), il **turnaround** (dalla sottomissione al completamento, da minimizzare), il **waiting** (somma dei tempi passati nella ready queue, da minimizzare) e il **response** (dalla sottomissione alla prima risposta, da minimizzare). Due relazioni tornano utili negli esercizi: `turnaround = completion - arrival` e `waiting = turnaround - burst` (senza I/O).

## Algoritmi
**FCFS** è la coda FIFO, nonpreemptive. È semplice ma soffre del *convoy effect*: un processo CPU-bound davanti a tanti I/O-bound li fa aspettare tutti, e il waiting medio dipende molto dall'ordine di arrivo. Esempio della fonte: P1=24, P2=3, P3=3 (arrivo 0). Con ordine P1,P2,P3 i waiting sono 0,24,27 e la media è **17 ms**; con ordine P2,P3,P1 sono 0,3,6 e la media è **3 ms**.

**SJF** sceglie il processo con il prossimo CPU burst più breve ed è **ottimo** per il waiting medio. Il problema è che la durata del burst non è nota e va stimata con una **media esponenziale**: [INT] `tau_{n+1} = alpha*t_n + (1-alpha)*tau_n`. La versione preemptive è **SRTF** (Shortest-Remaining-Time-First).

Lo scheduling a **Priority** assegna la CPU al processo più prioritario (un numero minore indica priorità maggiore) ed è preemptive o no. SJF ne è un caso particolare (priorità = 1/burst previsto). Il difetto è la **starvation**, risolta con l'**aging**: la priorità cresce con il tempo di attesa.

**Round Robin** assegna a ciascun processo un time quantum q (10-100 ms) e, scaduto il tempo, lo mette a fine coda con preemption. Se q è molto grande degenera in FCFS; se è molto piccolo si hanno troppi context switch. Una regola pratica è scegliere q tale che circa l'80% dei burst sia più corto di q. Il turnaround medio è peggiore di SJF ma la **response** è migliore, ideale per il time-sharing.

La **Multilevel Queue** divide i processi in code permanenti per tipo (ad esempio foreground con RR e background con FCFS; oppure 5 code: sistema, interattivi, editing, batch, studenti). Tra le code si usa una **priorità fissa** (con rischio di starvation) oppure una **time slice** (ad esempio 80% / 20%). La **Multilevel Feedback Queue** permette invece ai processi di muoversi tra le code: i CPU-bound vengono retrocessi, gli I/O-bound restano in alto e la promozione fa da aging. I parametri di progetto sono il numero di code, l'algoritmo di ciascuna, le regole di promozione e retrocessione e la coda iniziale. Esempio della fonte: Q0 RR q=8, Q1 RR q=16, Q2 FCFS; un nuovo processo entra in Q0, se non finisce in 8 passa in Q1, se non finisce in altri 16 passa in Q2.

Come regola di scelta, per i sistemi batch va bene SJF nonpreemptive (o un semplice FCFS); per gli interattivi RR o multilevel con RR in foreground; per il real-time priorità con preemption.

| Algoritmo | Forza | Debolezza |
|---|---|---|
| FCFS | semplice | convoy effect, waiting alto |
| SJF | waiting minimo | burst ignoto |
| Priority | flessibile | starvation (-> aging) |
| RR | response ottimo | dipende da q, overhead CS |

## Real-time
Nei sistemi **soft real-time** i processi critici hanno priorità alta ma nessuna garanzia; nei **hard real-time** la deadline è garantita e mancarla equivale a un fallimento. Due latenze contano: la **interrupt latency** (dall'arrivo dell'interrupt all'inizio dell'handler) e la **dispatch latency**, che include una fase di conflitto in cui si attendono risorse tenute da processi a bassa priorità e operazioni kernel non interrompibili. Servono quindi scheduling a **priorità e preemptive**; FCFS e SJF sono inadatti.

## Esempio svolto `[INT]` (calcolato da me, standard)
Processi (arrivo, burst): P1(0,7) P2(2,4) P3(4,1) P4(5,4).
| Algoritmo | Gantt | Waiting (P1,P2,P3,P4) | Media |
|---|---|---|---|
| FCFS | P1 0-7, P2 7-11, P3 11-12, P4 12-16 | 0,5,7,7 | 4.75 |
| SJF nonpreemptive | P1 0-7, P3 7-8, P2 8-12, P4 12-16 | 0,6,3,7 | 4.00 |
| SRTF | P1 0-2, P2 2-4, P3 4-5, P2 5-7, P4 7-11, P1 11-16 | 9,1,0,2 | 3.00 |
| RR q=3 | P1 0-3, P2 3-6, P1 6-9, P3 9-10, P4 10-13, P2 13-14, P1 14-15, P4 15-16 | 8,8,5,7 | 7.00 |
(RR: convenzione = i nuovi arrivi entrano in coda *prima* del processo appena preempted.) Waiting = completion - arrival - burst.

## Cose da saper fare all'esame
- Disegnare il diagramma di Gantt e calcolare waiting/turnaround/response medi per FCFS, SJF, SRTF, Priority, RR (con arrivi diversi e q dato).
- Spiegare convoy effect, starvation/aging, effetto di q in RR.
- Descrivere una multilevel feedback queue (esempio Q0/Q1/Q2).
- Preemptive vs nonpreemptive: quando avvengono le decisioni.
- Real-time: hard vs soft, due latenze.

## Dubbi
- [DA VERIFICARE] Il doc non contiene esempi numerici oltre FCFS (24,3,3): gli altri esercizi vanno cercati nelle slide del corso "Slide Deck - Teoria" (Drive).
- Convenzione RR sui pari tempo (arrivo vs rientro in coda): chiedere cosa usa il docente.
