# 06 - Transazioni, concorrenza, ripristino

**Fonte:** doc Drive "Basi di Dati - Appunti" (Lezioni 07, 11 §1-2, 12, 13) + slide Lez. 11-13 (es. T1/T2 bancarie, log T1-T5). Corso B.

## Mappa

1. Transazione, COMMIT/ROLLBACK, verifica differita, ciclo di vita
2. ACID e componenti responsabili
3. Concorrenza: interleaving, storie, view-equivalenza, lock, 2PL, granularità
4. Ripristino: memoria stabile, log, FORCE LOG, UNDO/REDO, checkpoint, dump/restore

- [1. Transazione](#1-transazione)
- [2. ACID e responsabili](#2-acid-e-responsabili)
- [3. Concorrenza](#3-concorrenza)
- [4. Ripristino (Lez. 13)](#4-ripristino-lez-13)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Transazione

Una **transazione** è un'unità di programma che porta la base di dati da uno stato coerente a un altro stato coerente. Comincia con `begin transaction`, esegue comandi DML e termina con `COMMIT WORK`, che esegue la verifica globale dei vincoli e rende le modifiche definitive (S1→S2), oppure con `ROLLBACK WORK`, che le annulla (S1→S1). Una SELECT non altera lo stato; INSERT, DELETE e UPDATE sì, e quindi richiedono il controllo di concorrenza.

Il motivo per cui il concetto serve si vede con un vincolo come "un nuovo cliente può esistere solo se titolare di un conto": inserire il CLIENTE fallisce senza il TITOLARE, e inserire il TITOLARE fallisce senza il CLIENTE (integrità referenziale). Con la **verifica differita** al COMMIT, le istruzioni intermedie possono violare temporaneamente i vincoli, purché alla fine lo stato sia coerente.

Il ciclo di vita è descritto da un automa: Attiva -> (commit) Parzialmente terminata [verifica vincoli] -> Committed (vincoli ok) oppure Aborted (vincoli violati o rollback). L'applicazione deve controllare l'esito e non ignorare un Aborted. Come buona pratica, nei gestionali le transazioni vanno tenute **brevi** (alta concorrenza); possono essere lunghe nelle applicazioni analitiche o CAD.

## 2. ACID e responsabili

Le proprietà che il DBMS garantisce per le transazioni si riassumono nell'acronimo ACID, e a ciascuna corrisponde un componente del DBMS che se ne occupa:

| Proprietà | Significato | Componente |
|---|---|---|
| **A**tomicità | tutto o niente | Gestore del ripristino |
| **C**onsistenza | stato valido → stato valido; DBMS controlla i vincoli dichiarati, il progettista garantisce la correttezza logica | Gestore transazioni / Serializzatore |
| **I**solamento | come se fosse l'unica transazione; risultati intermedi non visibili | Serializzatore |
| **D**urabilità | effetti persistenti dopo commit anche con guasti | Gestore del buffer (con log) |

L'architettura comprende il Gestore delle transazioni (ciclo di vita, smista i DML), il Serializzatore, il Gestore del ripristino (log, dump) e il Gestore del buffer (RAM ↔ disco). La memoria è temporanea (RAM, pagine) oppure permanente, e quest'ultima è standard (DB, indici) o **stabile** (log, dump).

## 3. Concorrenza

Il parallelismo non è un lusso. I tempi morti di I/O (il disco è circa 10⁶ volte più lento della RAM) renderebbero insostenibile un'esecuzione seriale, quindi il DBMS mescola le operazioni di più transazioni (**interleaving**) per massimizzare il throughput. Il prezzo è che un interleaving scorretto può produrre stati sbagliati.

**Esempio** (A=1000, B=2000): T1 sposta 50 da A a B; T2 sposta il 10% di A su B. Eseguite in serie, T1T2 dà A=855, B=2145; T2T1 dà A=850, B=2150 (somma 3000 in entrambi i casi). La storia errata r1(A) r2(A) w2(A) r2(B) w1(A) r1(B) w1(B) w2(B) produce A=950, B=2100, quindi **A+B=3050**: è un *lost update*, perché w1(A) ignora w2(A).

Per ragionare in modo preciso si definisce **storia** (schedulazione) la sequenza delle azioni r_i(X), w_i(X); è seriale se T1 viene eseguita per intero e poi T2. Una storia si considera corretta se equivale a una seriale, e l'equivalenza usata è la **view-equivalenza**: S ~ S' seriale se
1. hanno lo stesso input (se r_i(X) legge il valore iniziale in S lo fa anche in S');
2. hanno le stesse relazioni lettura-da (se r_i(X) legge da w_j(X) in S, vale lo stesso in S');
3. hanno lo stesso stato finale (l'ultima w(X) è della stessa transazione).

**Corretta = serializzabile**.

Per ottenere storie corrette ci sono due filosofie:
- l'approccio *ottimistico* presuppone che i conflitti siano rari, verifica al commit e fa rollback se c'è conflitto;
- quello *pessimistico* previene i conflitti con i lock.

Nel mercato prevale il pessimistico.

I **lock** sono di due tipi, più l'operazione di rilascio:
- `LS(X)` shared, per la lettura;
- `LX(X)` exclusive, per la scrittura;
- `UN(X)` per rilasciare.

Letture concorrenti sono innocue, tutto il resto no, e la matrice di compatibilità lo dice:

| Posseduto \ Richiesto | LS | LX |
|---|---|---|
| LS | concede | nega |
| LX | nega | nega |

Un lock negato mette la transazione in **WAIT**, con coda **FIFO** (fairness, niente starvation). Un **upgrade** LS→LX è possibile solo se la transazione è l'unica con LS su X.

La regola che rende i lock sufficienti a garantire la correttezza è il **2PL (Two-Phase Locking)**:
1. una fase di crescita in cui si acquisiscono solo lock (nessun unlock);
2. un punto di lock;
3. una fase di rilascio in cui si fanno solo unlock (nessun nuovo lock).

**Il 2PL garantisce la serializzabilità** delle storie generate.

Resta da scegliere la **granularità** dei lock, che è un compromesso tra concorrenza e overhead:
- tupla: la più comune, massima concorrenza ma lock table grande;
- attributo: raro, con molto overhead;
- pagina: usata nei sistemi distribuiti, meno parallelismo ma gestione semplice;
- file/tabella: per manutenzione massiva e indici.

## 4. Ripristino (Lez. 13)

Il gestore del ripristino deve garantire atomicità e durabilità anche in presenza di guasti. I **guasti** considerati sono:
- guasto hardware dell'unità centrale (si perde la RAM);
- crash di sistema (interrompe le transazioni attive);
- errore di programma o locale (rollback della singola transazione);
- guasto di periferica (*);
- evento catastrofico (*).

Il gestore gestisce tutto **tranne (*)**, per cui servono dump e duplicazione.

Il perno è la **memoria stabile**, un concetto teorico che si approssima con la duplicazione (log copiato in siti distanti, RAID). Il **log** è un file strettamente sequenziale, in sola aggiunta (append), che registra:
- `<Tj,start>`;
- `<Tj,X,BS(X),AS(X)>` (Before State e After State di ogni modifica);
- `<Tj,commit>`;
- `<Tj,abort>`.

Il log è esso stesso una storia serializzabile corretta.

Il meccanismo chiave è il **FORCE LOG**, la scrittura forzata delle pagine di log dal buffer alla memoria stabile **al commit/abort**, prima di confermare all'utente. Se una transazione fallisce si esegue UNDO(Ti) + `<Ti,abort>` + FORCE LOG. Al commit si verificano i vincoli, si scrive `<Ti,commit>` e si fa FORCE LOG.

Dopo un crash si divide l'insieme delle transazioni in LA (attive, non terminate) e LC (committate), e si procede con due operazioni:
- **REDO(LC)**, con scansione **in avanti** (ordine cronologico): per ogni record si rilegge la pagina, si applica AS(X) nel buffer e si fa FORCE della pagina. È necessario perché le modifiche possono essere andate perse (politica *no flush*).
- **UNDO(LA)**, con scansione **a ritroso**: si ripristina BS(X), garantendo l'atomicità.

Le transazioni con `<abort>` si **ignorano**, perché UNDO e FORCE sono già stati fatti a runtime. Esempio: T1,T2 committate, T3 solo iniziata ⇒ REDO(T1,T2) in ordine, UNDO(T3).

Rifare il log dall'inizio sarebbe troppo lungo, quindi si usa il **checkpoint**, che riduce il tempo di recovery. Passi:
1. sospendere le transazioni;
2. scrivere il record di checkpoint (lista transazioni attive + puntatori ai loro start);
3. FORCE LOG;
4. FORCE delle pagine (effetti delle committate);
5. scrivere il flag OK;
6. riprendere.

Rispetto all'ultimo checkpoint con OK, le transazioni si trattano così:

| Tx (rispetto all'ultimo CP con OK) | Lista | Azione |
|---|---|---|
| T2: committata prima del CP | - | nessuna (già persistente) |
| T1: iniziata prima del CP, committata dopo | LC | REDO |
| T4: iniziata dopo il CP, committata prima del crash | LC | REDO |
| T3: iniziata prima del CP, attiva al crash | LA | UNDO |
| T5: iniziata dopo il CP, attiva al crash | LA | UNDO |

Per il **guasto di periferica** il log non basta, perché è andato perso il disco con i dati. Si fa un **Dump** periodico su memoria stabile; dopo il guasto si esegue il **Restore** dell'ultimo dump e poi il REDO delle committate (LC) dal dump al guasto.

Questi meccanismi sono ciò che giustifica i **vantaggi del DBMS**:
- integrazione (ER/relazionale);
- integrità (vincoli);
- consistenza (normalizzazione, ACID, ripristino);
- affidabilità (log, checkpoint);
- indipendenza logica (ANSI/SPARC, viste);
- indipendenza fisica (metodi d'accesso, indici);
- concorrenza (serializzatore, 2PL).

## Cose da saper fare all'esame
- Spiegare ACID e **a quale componente** compete ciascuna proprietà.
- Dato un interleaving, dire se è **serializzabile** (view-equivalenza con T1T2/T2T1) e calcolare i valori finali (es. A+B).
- Dire se una sequenza di lock/unlock rispetta il **2PL**; usare la matrice di compatibilità; dire chi va in WAIT.
- Dato un **log** (con eventuale checkpoint): compilare LA e LC, indicare REDO/UNDO e il loro ordine.
- Descrivere checkpoint e dump/restore; chi gestisce quali guasti.
- Confrontare ottimistico/pessimistico e le granularità di lock.

## Dubbi
- [DA VERIFICARE] Deadlock, 2PL stretto (strict) e rollback a cascata non compaiono nelle note: verificare se sono nel programma d'esame.
- [DA VERIFICARE] Notazione dell'esame per il log (`BF`/`BS`, `AS`): le slide usano sia BF sia BS.
- Le note sul 2PL citano la serializzabilità senza dimostrazione.
