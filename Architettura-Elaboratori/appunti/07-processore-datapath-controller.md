# 07 - Il processore RISC-V: datapath e unità di controllo

Fonte: Lezione 06 (DataPath), Lezione 07 (Controller), Lab 10 (RISC-TO). Processore a **ciclo singolo** (un'istruzione per ciclo di clock). Le tabelle dei segnali nel PDF sono immagini: le righe marcate [libro] sono ricostruite dal libro e vanno verificate.

## Mappa
- Istruzioni supportate, componenti, temporizzazione
- Datapath per R, load/store, beq; datapath unificato
- Controllo ALU (ALUOp) e unità di controllo principale
- Esecuzione passo-passo
- RISC-TO (Lab 10)

## Obiettivo e componenti
Questo capitolo mette insieme i blocchi dei capitoli precedenti (register file, ALU, memorie) per costruire un vero processore. Per semplicità si considera un sottoinsieme di istruzioni, sufficiente a mostrare tutte le idee: le istruzioni di tipo R (`add, sub, and, or`), `lw`, `sw` e `beq`. Il processore è a ciclo singolo: ogni istruzione si esegue interamente in un ciclo di clock.

I componenti sono:
- il **PC**;
- la **memoria istruzioni** (read-only; è separata dalla memoria dati);
- il **sommatore PC+4**;
- il **register file** (2 letture, 1 scrittura);
- la **ALU**;
- la **memoria dati** (con segnali MemRead/MemWrite);
- l'**unità di generazione della costante / estensione del segno**;
- i **multiplexer**;
- il **sommatore per il target del branch**.

La metodologia di temporizzazione è **edge-triggered** (sensibile ai fronti): tutti gli elementi di stato (PC, registri, memorie) cambiano sul fronte di salita del clock, e poiché la scrittura avviene solo sul fronte è possibile leggere e scrivere un elemento di stato nello stesso ciclo. Il ciclo di clock deve essere abbastanza lungo da far arrivare ingressi stabili prima del fronte. Gli elementi di stato sono dunque PC, register file e memoria dati (scrittura sul fronte); sono invece combinatori ALU, mux, sommatori e controllo.

## Fetch
Il fetch parte dal PC, che indirizza la memoria istruzioni e fornisce l'istruzione; un sommatore calcola `PC + 4`, perché le istruzioni sono a 32 bit e la memoria è "byte addressed". Gli indirizzi tipici in RARS sono 0x00400000 per il testo e 0x10010000 per i dati.

## Datapath tipo R (`add x1,x2,x3`)
L'esecuzione di un'istruzione di tipo R segue quattro passi:
1. fetch e calcolo di PC+4;
2. il register file legge x2 e x3 (numeri su 5 bit, bus dati su 32);
3. la ALU esegue l'operazione (segnale "Operazione ALU", 4 bit);
4. il risultato è scritto in x1 con **RegWrite**=1 sul fronte di clock.

## Load/store
Per `lw x1, off(x2)` la ALU somma x2 e l'immediato (12 bit esteso a 32 con segno), e la somma è l'indirizzo della memoria dati; con **MemRead** il dato è letto e scritto in x1 (MemtoReg=1, RegWrite=1). Per `sw x1, off(x2)` la ALU calcola l'indirizzo allo stesso modo, ma il dato letto da rs2 va nella memoria dati con **MemWrite**=1 e non c'è nessuna scrittura di registro. L'unità di generazione della costante estrae i 12 bit dall'istruzione (in posizioni diverse per i tipi I, S, SB) ed estende il segno.

## beq (tipo SB)
Per `beq` la ALU esegue una **sottrazione** rs1 - rs2 e l'uscita **Zero**=1 indica che gli operandi sono uguali. Il target del salto è **PC + (imm << 1)**: l'immediato SB, esteso con segno, è shiftato di un bit perché l'offset conta mezze parole (range -4096..+4094). Se il branch è preso, PC <- target; altrimenti PC <- PC+4. Un mux seleziona il nuovo PC con **PCSrc = Branch AND Zero**, cioè una porta AND tra il segnale Branch del controllo e Zero. I salti incondizionati sono assimilati a branch sempre eseguiti.

## Datapath unificato
I datapath delle singole classi di istruzioni sono fusi in uno solo per mezzo di **multiplexer**, che scelgono da dove arrivano i dati. Sono tre:
- **ALUSrc**: secondo operando ALU = rs2 (0) oppure immediato (1);
- **MemtoReg**: dato da scrivere nel registro = risultato ALU (0) oppure dato letto dalla memoria (1);
- **PCSrc**: PC+4 (0) o target branch (1).

Poiché ogni risorsa si può usare al più una volta per istruzione (ciclo singolo), alcuni componenti sono duplicati: memoria istruzioni e memoria dati distinte, due sommatori oltre alla ALU.

## Controllo della ALU (livello 2, a due stadi di decodifica)
Decidere l'operazione della ALU richiede informazioni sia dal codop sia da funz7/funz3, e per semplificare l'hardware la decodifica è divisa in due stadi. L'unità principale genera **ALUOp** (2 bit); un'unità di controllo ALU, che riceve anche funz7 e funz3, genera i 4 bit di controllo della ALU. Il significato di ALUOp è:
- ALUOp = 00 -> somma (lw, sw)
- ALUOp = 01 -> sottrazione (beq)
- ALUOp = 10 -> dipende da funz7/funz3 (tipo R)

| ALUOp | funz7 | funz3 | Operazione | Controllo ALU (4 bit) |
|---|---|---|---|---|
| 00 | X | X | add (lw/sw) | 0010 |
| 01 | X | X | sub (beq) | 0110 |
| 10 | 0000000 | 000 | add | 0010 |
| 10 | 0100000 | 000 | sub | 0110 |
| 10 | 0000000 | 111 | and | 0000 |
| 10 | 0000000 | 110 | or | 0001 |

(X = don't care. Le righe sono coerenti con la tabella delle linee ALU del Lab 8; tabella esatta della slide non estratta [DA VERIFICARE].) I livelli multipli di decodifica riducono la dimensione del controllo principale e la latenza; il controllo può essere un elemento critico per la durata del ciclo. Le equazioni si scrivono in forma normale (disgiuntiva/congiuntiva) dalla tabella di verità sfruttando i don't care; la soluzione "minimale" del libro usa il fatto che alcuni bit sono sempre uguali.

## Unità di controllo principale
L'unità di controllo principale prende in ingresso il **codop** (bit 6:0), i cui valori sono: tipo R = 51 (0110011), load = 3 (0000011), store = 35 (0100011), beq = 99 (1100011). I campi fissi dell'istruzione, che non dipendono dal tipo, sono rs1 = bit 19:15, rs2 = 24:20, rd = 11:7, funz3 = 14:12, funz7 = 31:25.

Le uscite sono 8 bit: ALUSrc, MemtoReg, RegWrite, MemRead, MemWrite, Branch (1 bit ciascuno) più ALUOp (2 bit). PCSrc non è generato dal controllo, ma è Branch AND Zero.

| Istruzione | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch | ALUOp |
|---|---|---|---|---|---|---|---|
| tipo R | 0 | 0 | 1 | 0 | 0 | 0 | 10 |
| lw | 1 | 1 | 1 | 1 | 0 | 0 | 00 |
| sw | 1 | X | 0 | 0 | 1 | 0 | 00 |
| beq | 0 | X | 0 | 0 | 0 | 1 | 01 |

[tabella ricostruita dal libro: la slide la mostra come immagine; DA VERIFICARE]

## Esecuzione passo-passo (tutte: fetch + PC+4)
Riassumendo quanto visto, ogni istruzione compie il fetch con PC+4 e poi:
- **add x1,x2,x3**: legge x2 e x3, il controllo imposta i segnali, la ALU opera e il risultato si scrive in x1;
- **lw x1,off(x2)**: legge x2, la ALU calcola x2 + imm esteso, la somma è usata come indirizzo della memoria dati e il dato letto si scrive in x1;
- **beq x1,x2,off**: legge x1 e x2, la ALU sottrae; in parallelo il sommatore calcola PC + (imm<<1); Zero e Branch decidono il PCSrc.

## RISC-TO (Lab 10)
RISC-TO è un processore RISC-V **semplificato a 8 bit**, "inesistente", da completare in CircuitVerse. Supporta `lb, sb, beq, add` (e, non testate, altre istruzioni di tipo R). Ha 256 B di memoria istruzioni (EPROM, un solo programma), 256 B di memoria dati e 8 registri `x0..x7`, e usa lo stesso formato istruzioni RISC-V a 32 bit.

Il lavoro da svolgere riguarda l'**unità di controllo centrale** (sottocircuiti `r-type`, `load`, ..., `control_unit`, a partire dal codop) e il **register file** (Lab 9). Il segnale `reset`=1 azzera PC, registri e memoria dati (non il programma). Il programma di prova carica tre byte, somma i primi due, confronta il risultato con il terzo e salva il risultato o il doppio del primo. La consegna è un file Verilog su Moodle; il progetto **può essere argomento dell'esame orale**.

## Cose da saper fare all'esame
- Disegnare il datapath completo con i multiplexer e indicare i valori dei segnali di controllo per R, lw, sw, beq.
- Seguire l'esecuzione di una data istruzione indicando quali blocchi e linee sono attivi (e quali segnali valgono 1/0/X).
- Ricavare ALUOp -> controllo ALU (tabella di verità, don't care) e le equazioni del controllo principale.
- Calcolare il target di un branch (PC + imm<<1) e il valore del PC dopo l'istruzione.
- Spiegare perché memoria istruzioni e dati sono separate e perché il ciclo di clock è lungo (ciclo singolo).
- Saper spiegare e (se serve) modificare il progetto RISC-TO.

## Dubbi
- Istruzioni oltre add/sub/and/or/lw/sw/beq (jal, addi, ecc.) nel datapath non trattate nelle slide: [DA VERIFICARE se richieste modifiche del datapath].
- Pipeline non nel programma (nessun riferimento nelle slide).
