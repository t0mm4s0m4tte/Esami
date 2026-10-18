# 12 - Cose da saper fare all'esame (riepilogo) e dubbi

Appello: 2027-02-01. Esame: secondo le slide introduttive del Moodle, tre parti (E1 test a risposta multipla 0-8, E2 esercizi di laboratorio 0-10, orale 0-14; dettagli e dubbi nel [file 13 §1](13-esercizi-ed-esami-svolti.md#1-come-è-fatto-lesame)); il Lab 10 dice che il progetto RISC-TO "potrà essere argomento dell'esame orale". [DA VERIFICARE sul PDF condizioni di passaggio, durata, tabelle ammesse]

## Checklist per blocco
Il corso è una salita graduale dall'alto verso il basso e poi di nuovo verso l'alto: si parte dai livelli e dall'ISA, si scende alla logica digitale e al processore, e si risale con memoria, bus e I/O. La checklist segue questo ordine, un blocco per file di appunti, e per ognuno elenca ciò che bisogna saper fare senza guardare le slide.

1. **Livelli e prestazioni** (file 01): livelli 0-4, compilatore/assemblatore/SO, Von Neumann, fetch-decode-execute, CPI/clock/throughput.
2. **ISA RISC-V** (02): registri e ABI, add/addi/sub, load/store (lb/lbu/lh/lw), endian, allineamento, shift/logiche, codifica R/I/S/SB con esempi. Saper codificare e decodificare a mano.
3. **Decisioni e procedure** (03): if/else, loop, branch PC-relativi, jal/jalr/ret, stack, convenzioni t/s/a, procedure annidate e ricorsive (fib), stringhe.
4. **Assembler/Linker/Loader** (04): pseudo-istruzioni, direttive, macro, 2 passi + symbol table/ILC, relocation, calcolo offset dopo link, ELF, loader, statico/dinamico (lazy).
5. **Logica combinatoria e ALU** (05): algebra di Boole, FND, decoder, mux, half/full adder, ALU 1 bit -> n bit, Binvert/Ainvert, slt, overflow, Zero.
6. **Reti sequenziali** (06): latch SR, D latch, flip-flop D, clock, setup/hold, registri, register file, SRAM/DRAM/ROM.
7. **Processore** (07): datapath per R/lw/sw/beq, segnali di controllo, ALUOp, tabella controllo, esecuzione passo-passo, RISC-TO.
8. **Bus** (08): sincrono/asincrono, ciclo di lettura, arbitraggio, bus seriali.
9. **Cache** (09): località, mappatura diretta/associativa/set-associativa, tag/indice/offset, LRU, write-through/back.
10. **I/O** (10): polling, interrupt (HW+SW), trap, DMA, eccezioni RISC-V (SEPC, SCAUSE, STVEC).

## Esercizi tipo da allenare (con riferimento)
Gli esercizi sono il modo più sicuro di verificare la comprensione, perché all'esame ci si aspetta di svolgerli a mano. Ognuno rimanda al file in cui è già svolto.
- Tradurre C -> RISC-V con array: file 02 e 11.
- Prevedere il valore di registri dopo shift/maschere/lb vs lbu: file 02 (Lab 2 Es.1).
- Codificare `lw x9,176(x22)`, `sw x9,24(x22)`, `addi x7,x5,-6`, `sub x18,x19,x5` e controllare con le soluzioni del file 02.
- Cicli (somma, max, contauno, quadrati, annidati) e conteggio istruzioni eseguite: file 11 (Lab 3).
- Stringhe: strlen, strcmp, strchridx, hash: file 11 (Lab 5).
- Procedure: MCD/MCM, procedura che chiama un'altra, fib ricorsivo con disegno dello stack: file 03 e 11.
- Overflow somma/sottrazione a 32 bit (0x80000000 +/- 0xD0000000): file 05 e 11.
- Costruire FND/circuito da tabella di verità (maggioranza); full adder da half adder; ALU 4 bit con flag.
- Datapath: indicare segnali di controllo e percorso del dato per add/lw/sw/beq; calcolare target del branch.
- Cache: sequenza di richieste su direct-mapped 8 blocchi (file 09), poi variante 2-way LRU.
- Bus: ciclo di lettura sincrono con wait state (clock 100 MHz, memoria 15 ns).
- I/O: descrivere interrupt hardware/software; confronto polling/interrupt/DMA.

## Strategia di recupero (suggerita, a partire da oggi = 2026-10-13)
1. ISA e procedure (file 02-03) insieme al laboratorio (11): sono il cuore pratico del corso e vanno esercitati scrivendo il codice a mano.
2. Logica e ALU (05-06) e datapath (07): si ripassano meglio rifacendo i disegni.
3. Cache, bus e I/O (08-10): soprattutto teoria, da ripassare con due o tre esercizi.
4. Assembler/linker (04): bastano i passi memorizzati e un esempio numerico.

In parallelo bisogna procurarsi i temi d'esame passati e le tabelle del libro (RISC-V reference card) [DA VERIFICARE se disponibili su Moodle: non in Drive].

## Lacune del materiale (dichiarate)
Gli appunti sono stati ricavati dal materiale disponibile e hanno dei buchi che è bene conoscere:
- il **Lab 7 (Ricorsione)** manca nel Drive;
- per la **teoria "ISA parte 3"** (salti, procedure, stack) non c'è una lezione dedicata: è stata ricavata dai Lab 3, 5, 6 e da snippet della Lez. 9, più la conoscenza standard del libro [dove indicato];
- il **libro** (PDF da ~264 MB: `Struttura e Progetto dei Calcolatori - Progettare con RISC V.pdf`) non è stato letto in questa passata, quindi i dettagli marcati [libro] vanno verificati lì (capitoli 1, 2, 3(ALU), 4, 5; Appendice A (logica) e RISC-V reference card);
- le **figure e tabelle** delle slide (control table, equazioni, diagrammi temporali, valori dell'esempio di linking) non sono estraibili dal testo e sono indicate come [DA VERIFICARE];
- i **temi d'esame passati** sono assenti, quindi il formato reale dello scritto non è noto;
- il documento "Architettura degli Elaboratori - Appunti" su Drive è quasi vuoto (1 KB) e non c'è nulla da integrare.

## Dubbi da passare al tutor
Sono i punti su cui le slide non bastano a decidere cosa studiare in profondità.

1. Cosa si chiede esattamente all'esame (scritto: quanti esercizi di assembly/logica; orale: RISC-TO)?
2. Quanto dettaglio su CSR/eccezioni (slide "materiale aggiuntivo")?
3. Cache: scritture write-back/write-through sono richieste (slide: "non incluso nel programma")? Esercizi su AMAT/CPI?
4. Formati di jal/jalr e istruzioni lui/auipc: richieste le codifiche?
5. Conferma tabella segnali di controllo (ALUSrc, MemtoReg, ...) con quella delle slide originali.
6. slt con overflow: soluzione attesa nel Lab 8?
