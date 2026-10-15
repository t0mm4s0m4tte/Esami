# 01 - Introduzione, livelli di macchina virtuale, prestazioni

Fonte: Lezione 00 (Introduzione al corso), Lezione 01 (ISA parte 1) - slide Drago, a.a. 2024/25. Testo di riferimento: Patterson-Hennessy, *Struttura e progetto dei calcolatori - Progettare con RISC-V*, 2a ed. (le slide non lo sostituiscono, dice il docente).

## Mappa degli argomenti
- Organizzazione del corso / esame
- Storia in breve (generazioni)
- Livelli come macchine virtuali (struttura a cipolla)
- Architettura vs organizzazione
- Macchina di Von Neumann, ciclo fetch-decode-execute
- Ciclo di vita del software (compilatore, assemblatore)
- Prestazioni

## Corso ed esame (dalla Lezione 00)
Il corso vale 6 CFU, ripartiti in Teoria (4 CFU, 32 ore) e Laboratorio (2 CFU, 20 ore). Si segue il Corso B (cognomi E-O) con il docente Idilio Drago, ma il programma è identico per A, B e C. Gli obiettivi sono tre:
- capire l'organizzazione dell'hardware attraverso una gerarchia di macchine virtuali;
- conoscere le funzioni hardware che i sistemi operativi sfruttano;
- capire come si passa da un linguaggio ad alto livello al linguaggio macchina.

Si danno per noti la rappresentazione dei numeri (complemento a due, decimali), Programmazione I e l'algebra di Boole.

La domanda che guida l'intero corso è semplice da enunciare e meno da risolvere: come fa un computer costruito con transistor che implementano AND, OR e NOT a "capire" un programma in C? Che cosa c'è in mezzo? Tutto il resto delle dispense è, in sostanza, la risposta a questa domanda, risalendo dal livello delle porte logiche fino al linguaggio ad alto livello.

Per superare l'esame il docente consiglia di studiare sul libro e di seguire esercitazioni e lezioni; per iscriversi all'esame serve compilare la valutazione del corso, e il voto va accettato entro 5 giorni. Dal Lab 10 si legge che "il progetto [RISC-TO] potrà essere argomento dell'esame orale": l'esame ha quindi una parte orale. [DA VERIFICARE formato esatto della prova scritta/orale: non descritto nelle slide lette]

## Storia (cultura, in breve)
Prima dei computer elettronici ci sono le macchine meccaniche: Pascal costruì una macchina per somme e sottrazioni, Leibniz la estese a moltiplicazioni e divisioni, Babbage progettò la Difference engine e poi l'Analytical engine, che aveva già un "magazzino" per i dati. Zuse, con lo Z1 del 1938 a relè, è considerato l'autore del primo computer moderno.

Le generazioni successive si distinguono per la tecnologia di base:
- 1a generazione, valvole (1945-55): Colossus, ENIAC (18.000 valvole, 30 t, 140 kW) e la macchina IAS di von Neumann, che introduce l'aritmetica binaria e tiene dati e istruzioni nella stessa memoria;
- 2a generazione, transistor (1955-65);
- 3a generazione, circuiti integrati (1965-80);
- 4a generazione, VLSI/ULSI (1980-...).

## Livelli come macchine virtuali
Un programma è una sequenza di istruzioni, ma il processore capisce solo il proprio linguaggio macchina, fatto di bit. Scrivere direttamente in quel linguaggio è impraticabile, e per questo si costruiscono livelli di astrazione sovrapposti: ciascun livello è realizzato dal software che lo traduce, oppure lo interpreta, nel livello sottostante. Ogni livello si comporta, per chi lo usa, come una macchina virtuale con un proprio linguaggio, e nasconde i dettagli di quello che c'è sotto. Il risultato è una "struttura a cipolla" in cui un programmatore C non ha bisogno di sapere come sono fatte le porte logiche.

| Livello | Nome | Come si arriva al livello sotto |
|---|---|---|
| 4 | Linguaggio orientato ai problemi (C, Java) | Traduzione (compilatore) |
| 3 | Linguaggio assembly | Traduzione (assemblatore) |
| 2 | Sistema operativo | Interpretazione parziale (SO) |
| 1 | ISA (Instruction Set Architecture) = linguaggio macchina | Esecuzione diretta hardware |
| 0 | Logica digitale (porte, registri, memoria, ALU, data path) | - |

Il corso studia soprattutto i livelli 0 e 1 e in parte il 3, mentre il livello 2 è il campo del sistema operativo, di cui qui interessano i principi di traduzione. Il sistema operativo esiste perché i dispositivi di I/O sono complicati e diversi tra loro: il SO fornisce operazioni uniformi (per esempio sui file) che nascondono queste differenze al programmatore.

Il linguaggio assembly è la rappresentazione simbolica (mnemonica) del linguaggio macchina, quasi in corrispondenza uno-a-uno con le istruzioni dell'ISA. Attenzione a una confusione di nomenclatura segnalata dal docente: "assembler" è propriamente il programma traduttore, ma nell'uso comune lo si adopera spesso come sinonimo di "linguaggio assembly". Quanto a Java, i programmi sono eseguiti da un interprete (la JVM), che può a sua volta servirsi di un compilatore JIT (Just In Time) per compilare i metodi in codice macchina.

### Architettura e organizzazione
Le due parole non sono sinonimi. L'**architettura** è l'insieme dei tipi di dati, delle operazioni e delle caratteristiche di ciascun livello che sono *visibili al programmatore*; l'**organizzazione** comprende invece le unità funzionali e le loro relazioni strutturali, che al programmatore *non sono visibili*. Due processori possono quindi avere la stessa architettura (stessa ISA) pur essendo organizzati in modo molto diverso al loro interno.

## Macchina di Von Neumann
Il modello di riferimento è la macchina di Von Neumann. La CPU contiene l'unità di controllo, la ALU e un insieme di registri; registri, ALU e i bus che li collegano formano il **data path**. Tra i registri ne spiccano due: il **PC** (Program Counter), che indica la prossima istruzione, e l'**IR** (Instruction Register), che contiene l'istruzione in corso. La memoria principale conserva sia le istruzioni sia i dati, entrambi come sequenze di bit: questa è l'idea centrale di von Neumann, ereditata dalla macchina IAS.

Un'operazione elementare del data path consiste nel far passare due operandi attraverso la ALU e nel memorizzare il risultato. Le istruzioni possono essere di tipo registro-registro oppure registro-memoria.

### Ciclo fetch-decode-execute
La CPU ripete senza fine lo stesso ciclo: legge l'istruzione, capisce di che cosa si tratta, la esegue e passa alla successiva. Nel dettaglio i passi sono:
1. Prendi l'istruzione dalla memoria e mettila in IR.
2. Aggiorna il PC verso l'istruzione successiva.
3. Determina il tipo di istruzione.
4. Se usa una parola in memoria, determina dove si trova.
5. Metti la parola in un registro CPU (se serve).
6. Esegui.
7. Torna al punto 1.

Pseudocodice della slide: `while(true){ instr = memory[PC]; PC = PC+1; instr_type = get_instr_type(instr); data_loc = find_data(...); if (data_loc>=0) data = memory[data_loc]; execute(instr_type, data); }`

## Ciclo di vita del software
Un programma in C viene tradotto dal compilatore in assembly RISC-V, e l'assemblatore trasforma l'assembly in linguaggio macchina, con 32 bit per istruzione. L'esempio della slide mostra `scambia(v,k)` in C che diventa `slli x6,x11,3; add x10,x10,x6; lw x5,0(x6); lw x7,8(x6); sw x7,0(x6); sw x5,8(x6); jalr x0,0(x1)`.

Per vedere questo processo in pratica le slide mostrano due comandi: `riscv32-unknown-linux-gnu-gcc -O1 -S` genera l'assembly, mentre `objdump -S` disassembla un eseguibile. gcc può anche produrre "compressed instructions" a 16 bit. Un punto da ricordare è che il formato binario NON è compatibile tra ISA diverse (per esempio RISC-V e MIPS): lo stesso programma C produce codice macchina diverso per ciascuna.

## Prestazioni
Parlare di "prestazioni" richiede di distinguere con cura che cosa si misura. Il **tempo di esecuzione** (o di risposta) è il tempo che passa fra l'inizio e la fine di un programma; il **throughput** (o larghezza di banda) è il numero di task completati per unità di tempo. Le due misure si comportano diversamente: sostituire il processore con uno più veloce migliora entrambe, mentre aggiungere processori per eseguire task separati migliora il throughput ma non il tempo del singolo task. Il **tempo di CPU** è invece il tempo effettivo di computazione, che si divide in tempo utente e tempo di sistema.

Il ritmo di un processore è scandito dal **clock**, un segnale a frequenza costante. Il ciclo (o periodo) di clock è la durata di un ciclo e la frequenza è il suo inverso: per esempio un periodo di 250 ps corrisponde a 4 GHz. Il **CPI** è il numero medio di cicli di clock per istruzione, riferito a un programma o a un suo frammento. Mettendo insieme queste grandezze si ottiene la formula, tratta dal libro e non esplicita nelle slide estratte: Tempo CPU = N. istruzioni x CPI x periodo di clock. [DA VERIFICARE nelle slide, conferma sul libro cap. 1] Per ridurre il tempo si può quindi agire su tre fattori: meno istruzioni, meno cicli per istruzione, ciclo di clock più breve.

Dal punto di vista storico, a partire dal 2002 la potenza assorbita, il parallelismo implicito limitato e la latenza della memoria hanno rallentato la crescita dei monoprocessori (circa il 3,5% l'anno); da qui l'approccio multicore.

## Cose da saper fare all'esame
- Descrivere i livelli di macchina virtuale e il ruolo di compilatore/assemblatore/SO.
- Spiegare il ciclo fetch-decode-execute e il ruolo di PC e IR.
- Distinguere architettura/organizzazione; tempo di esecuzione/throughput.
- Calcolare tempi/frequenze (es. frequenza = 1/periodo; tempo CPU con CPI) [formula dal libro].

## Dubbi
- Formula di prestazione e legge di Amdahl: non presenti nelle slide estratte; verificare se richieste.
