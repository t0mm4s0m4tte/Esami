# Flashcard - Architettura degli Elaboratori

Fonte: appunti/01-12. Convenzioni: [libro] = dettaglio dal testo Patterson-Hennessy, non dalle slide; [DA VERIFICARE] = dato incerto negli appunti.

## 01 - Introduzione, livelli, prestazioni

D: Quali sono i 5 livelli di macchina virtuale del corso e come si passa al livello sotto?
R: 4 linguaggio ad alto livello (compilatore, traduzione); 3 assembly (assemblatore, traduzione); 2 sistema operativo (interpretazione parziale); 1 ISA/linguaggio macchina (esecuzione diretta HW); 0 logica digitale.

D: Differenza tra architettura e organizzazione?
R: Architettura = ciò che è visibile al programmatore (tipi di dato, operazioni, ISA). Organizzazione = unità funzionali e relazioni strutturali, non visibili. Stessa ISA può avere organizzazioni diverse.

D: Idea centrale della macchina di Von Neumann?
R: Istruzioni e dati stanno nella stessa memoria, entrambi come sequenze di bit. La CPU ha unità di controllo, ALU, registri (PC e IR tra gli altri).

D: Che cosa contengono PC e IR?
R: PC = indirizzo della prossima istruzione; IR = istruzione in esecuzione.

D: Elenca i passi del ciclo fetch-decode-execute.
R: 1) prendi l'istruzione dalla memoria in IR; 2) aggiorna PC; 3) determina il tipo; 4) se usa una parola in memoria, trova dove sta; 5) caricala in un registro; 6) esegui; 7) torna a 1.

D: Che cos'è il data path?
R: L'insieme di registri, ALU e bus che li collegano.

D: Il formato binario di un programma è compatibile tra ISA diverse (es. RISC-V e MIPS)?
R: No. Lo stesso programma C produce codice macchina diverso per ogni ISA.

D: Differenza tra tempo di esecuzione e throughput?
R: Tempo di esecuzione = durata di un programma (inizio-fine). Throughput = task completati per unità di tempo. Più processori su task separati migliorano il throughput ma non il tempo del singolo task.

D: Formula del tempo di CPU?
R: Tempo CPU = N. istruzioni x CPI x periodo di clock [formula dal libro; DA VERIFICARE nelle slide].

D: Su quali tre fattori si può agire per ridurre il tempo di CPU?
R: Meno istruzioni, meno cicli per istruzione (CPI), periodo di clock più breve.

D: Un periodo di clock di 250 ps a che frequenza corrisponde?
R: 1/250 ps = 4 GHz.

D: Un programma ha $10^9$ istruzioni, CPI medio 1,5, clock 2 GHz. Tempo di CPU?
R: $10^9$ x 1,5 / (2x10^9) = 0,75 s. [formula dal libro]

D: Calcolo di speedup: macchina A esegue in 12 s, macchina B in 8 s. Di quanto B è più veloce?
R: Speedup = 12/8 = 1,5 (B è 1,5 volte più veloce). [libro; la slide non lo tratta esplicitamente]

D: Legge di Amdahl: enunciato?
R: Il miglioramento complessivo è limitato dalla frazione di tempo non migliorata: speedup = 1 / ((1-f) + f/s). [libro; non nelle slide, DA VERIFICARE se richiesta]

D: Perché dal 2002 si è passati ai multicore?
R: Potenza assorbita, parallelismo implicito limitato e latenza della memoria hanno rallentato la crescita dei monoprocessori (~3,5%/anno).

D: Assembler: due significati?
R: Propriamente il programma traduttore assembly -> macchina; nell'uso comune anche sinonimo di "linguaggio assembly".

D: Come viene eseguito Java?
R: Da un interprete (JVM), che può usare un compilatore JIT per compilare i metodi in codice macchina.

## 02 - ISA RISC-V

D: Che cos'è RISC-V e dove nasce?
R: Una ISA (specifica, non una CPU né un'azienda) aperta e senza licenze, nata a Berkeley nel 2010.

D: Cosa sono RV32I, RV64I, RV64M, RV64F, RV32E?
R: Base intera a 32 bit; base a 64 bit; estensione moltiplicazione/divisione; virgola mobile; versione ridotta con 16 registri.

D: I tre principi di progetto RISC?
R: La semplicità favorisce la regolarità; minori sono le dimensioni, maggiore è la velocità; un buon progetto richiede buoni compromessi.

D: Quanti registri interi ha RV32I e quanto sono larghi? E il PC?
R: 32 registri x0..x31 a 32 bit; un PC; memoria indirizzata a byte (fino a $2^{32}$-1).

D: Che cosa vale x0 e cosa permette?
R: Sempre 0 (non scrivibile). Permette: negare `sub x19,x0,x19`, copiare `add x19,x0,x18` (mv).

D: Nomi ABI: zero, ra, sp, gp, tp, fp?
R: x0 zero; x1 ra (return address); x2 sp; x3 gp; x4 tp; x8 s0/fp.

D: Quali registri sono a0-a7, t0-t6, s0-s11 (numeri)?
R: a0-a7 = x10-x17 (argomenti/ritorno); t0-t2 = x5-x7 e t3-t6 = x28-x31 (temporanei); s0 = x8, s1 = x9, s2-s11 = x18-x27 (da salvare).

D: Quanti operandi hanno le istruzioni aritmetiche e dove stanno?
R: Sempre tre, sempre in registri (la ALU opera solo su registri).

D: Traduci `f = (g+h)-(i+j)` con g..j in x20..x23, f in x19.
R: add x5,x20,x21 / add x6,x22,x23 / sub x19,x5,x6

D: Range dell'immediato di addi? Esiste subi?
R: 12 bit con segno, [-2048, +2047]. No subi: si usa addi con costante negativa.

D: Che differenza c'è tra istruzione e pseudoistruzione? Esempio con li.
R: La pseudoistruzione è un alias espanso dall'assemblatore. `li rd,const` a 32 bit se non entra in 12 bit diventa lui+addi [libro].

D: Come si calcola l'indirizzo in load/store? Range offset?
R: Registro base + offset; offset a 12 bit con segno [-2048, +2047].

D: Differenza tra lb e lbu?
R: lb estende il segno, lbu estende con zeri. Byte 0xAC: lb -> 0xFFFFFFAC; lbu -> 0x000000AC.

D: Cosa fanno sb e sh?
R: Scrivono in memoria i 8 / 16 bit meno significativi del registro.

D: Quali istruzioni sono solo RV64I?
R: ld, sd (doubleword) e lwu.

D: Little endian vs big endian; chi usa cosa?
R: Little endian: l'indirizzo della word identifica il byte meno significativo. RISC-V e Intel little; SPARC e IBM mainframe big.

D: Vincoli di allineamento per lw/sw e lh/sh?
R: lw/sw: indirizzo multiplo di 4; lh/sh: multiplo di 2. Non allineato = più lento; in RARS `lw t1,1(t0)` dà errore.

D: A che indirizzo sta v[i] per array di int, short, char, long (RV64)?
R: base + 4i, +2i, +i, +8i.

D: Traduci `g = h + v[3]; v[6] = g - f` (v->x21, g->x5, h->x9, f->x19).
R: lw x10,12(x21) / add x5,x9,x10 / sub x6,x5,x19 / sw x6,24(x21)

D: Schema generale per v[i] con i variabile (int)?
R: calcola indice in un registro; `slli rd,rd,2`; `add rd,rd,base`; poi `lw/sw 0(rd)`.

D: Differenza tra srl, sra e sll? Esiste shift aritmetico a sinistra?
R: srl riempie con 0, sra replica il segno, sll sposta a sinistra. Non esiste sla perché identico a sll.

D: Cosa fanno slli di k e srai di k aritmeticamente?
R: slli k = moltiplica per $2^k$; srai k = divide per $2^k$ con segno, arrotondando verso -inf.

D: Come si fa NOT in RISC-V?
R: Pseudoistruzione `not` = `xori rd,rs,-1`.

D: Cosa servono and e or con una maschera?
R: and con maschera seleziona alcuni bit; or con maschera forza a 1 i bit della maschera.

D: Con x5=0xAAAAAAAA e x6=0x12345678: valore di x7 dopo `slli x7,x5,4; or x7,x7,x6`?
R: slli -> 0xAAAAAAA0; or con 0x12345678 = 0xBABEFEF8.

D: Con x5=0xAAAAAAAA: valore di x29 dopo `srli x29,x5,3; andi x29,x29,0xFF`?
R: 0x55.

D: Struttura (campi) del formato R, da bit 31 a 0?
R: funz7(7) rs2(5) rs1(5) funz3(3) rd(5) codop(7).

D: Struttura del formato I?
R: imm[11:0](12) rs1(5) funz3(3) rd(5) codop(7). Usato per addi, load, jalr.

D: Struttura del formato S e perché l'immediato è spezzato?
R: imm[11:5](7) rs2(5) rs1(5) funz3(3) imm[4:0](5) codop(7). Spezzato per tenere rs1 e rs2 nelle stesse posizioni del tipo R.

D: Struttura del formato SB (branch)?
R: imm[12] imm[10:5] rs2 rs1 funz3 imm[4:1] imm[11] codop. Offset in multipli di 2, range [-4096, +4094].

D: Codop di tipo R, addi, load, store, branch, jal, jalr?
R: R 0110011; addi 0010011; load 0000011; store 0100011; branch 1100011; jal 1101111; jalr 1100111. (Quelli di R/load/store/beq sono nelle slide; gli altri [libro, DA VERIFICARE].)

D: Funz3 di add/sub, and, or, xor, sll, slt?
R: add/sub 000, sll 001, slt 010, xor 100, srl/sra 101, or 110, and 111 [libro]. funz7: add 0000000, sub 0100000.

D: Codifica di `add x5,x9,x10`.
R: 0000000 01010 01001 000 00101 0110011.

D: Codifica di `sub x18,x19,x5`.
R: 0100000 00101 10011 000 10010 0110011.

D: Codifica di `lw x9,176(x22)`.
R: 000010110000 10110 010 01001 0000011.

D: Codifica di `addi x7,x5,-6`.
R: 111111111010 00101 000 00111 0010011 (-6 in 12 bit).

D: Codifica di `sw x9,24(x22)`.
R: 0000000 01001 10110 010 11000 0100011 (imm[11:5]=0000000, imm[4:0]=11000).

D: Come si decodifica una word a 32 bit?
R: Leggi codop (bit 6:0) -> formato; poi rs1=19:15, rs2=24:20, rd=11:7, funz3=14:12, funz7=31:25.

D: Passi per codificare a mano un'istruzione?
R: 1) formato e codop/funz; 2) registri in 5 bit; 3) immediato in 12 bit complemento a due (spezzato per S); 4) concatena i campi.

D: Come si distinguono slli/srli/srai da sll/srl/sra nei formati?
R: sll/srl/sra sono tipo R; slli/srli/srai tipo I con shamt nei bit bassi dell'immediato; srai ha funz7=0100000 [libro].

## 03 - Decisioni, procedure, stack

D: Quali sono le istruzioni di branch e di che formato?
R: beq, bne, blt, bge, bltu, bgeu; formato SB. bgt, ble, beqz, bnez sono pseudoistruzioni (operandi scambiati).

D: A cosa equivale `j label`?
R: A `jal x0, label`.

D: Come si calcola la destinazione di un branch?
R: PC-relativo: PC dell'istruzione di branch + (offset a 12 bit << 1, esteso col segno). Range [-4096, +4094].

D: Quando si salta traducendo `if (cond) A else B`?
R: Quando la condizione è FALSA: il ramo "vero" segue subito il branch.

D: Schema assembly di un while e di un do-while.
R: while: `loop: B(cond falsa) end; corpo; j loop; end:`. do-while: corpo; `B(cond vera) loop`.

D: Traduci `x = x - y; if (x < 0) x = 0; y = y - 1` (x->t0, y->t1).
R: sub t0,t0,t1 / bge t0,zero,end1 / li t0,0 / end1: addi t1,t1,-1

D: Cosa fa `jal ra, label`? E il ritorno?
R: Salta a label e salva PC+4 in ra. Ritorno: `jalr zero,0(ra)` = `jr ra` = `ret`.

D: Perché si ritorna con jr ra e non con un j?
R: La procedura può essere chiamata da punti diversi e deve sapere dove tornare.

D: I sei passi di una chiamata a procedura?
R: Parametri in posto accessibile; trasferisci controllo; acquisisci risorse (stack); esegui; risultato in posto accessibile; torna al chiamante.

D: Dove passano parametri e valori di ritorno? Dove sta l'indirizzo di ritorno?
R: Parametri/ritorno in a0-a7 (ritorno in a0, a1); indirizzo di ritorno in ra.

D: Verso dove cresce lo stack e come si fanno push e pop?
R: Verso indirizzi bassi. Push: `addi sp,sp,-N` poi `sw`; pop: `lw` poi `addi sp,sp,N`.

D: Che cos'è il register spilling?
R: Il trasferimento di variabili da registri alla memoria (stack) quando i registri non bastano; è costoso.

D: Che cos'è il frame (record di attivazione)?
R: La porzione di stack di una procedura: registri salvati, variabili locali, argomenti extra. fp (x8) viene inizializzato a sp all'ingresso.

D: Quali registri sono preservati e quali no tra le chiamate?
R: Preservati: s0-s11, sp, ra [libro]. Non preservati: t0-t6, a0-a7.

D: Chi salva cosa nella convenzione di chiamata?
R: Chiamante: parametri in a*, e se servono dopo salva t*, a* e ra. Chiamato: alloca frame, salva gli s* che usa (e ra se chiama altre procedure), li ripristina prima di ret.

D: Dopo una chiamata a multiply, che succede a s1 e t0 del chiamante?
R: s1 è preservato; t0 può essere sovrascritto (è un temporaneo).

D: Perché una procedura non foglia deve salvare ra?
R: Perché il suo `jal` interno sovrascrive ra; senza salvarlo non saprebbe più dove tornare.

D: Scrivi il template di procedura non foglia che usa s1.
R: addi sp,sp,-8 / sw ra,0(sp) / sw s1,4(sp) / ... jal g / lw s1,4(sp) / lw ra,0(sp) / addi sp,sp,8 / ret

D: Nella procedura ricorsiva fib: cosa fanno i casi base rispetto allo stack?
R: Non toccano lo stack (beq a0,zero / n==1 saltano a ret). Il caso generale salva ra e n (poi fib(n-1)) in un frame da 8 byte.

D: Regola sul numero di byte nell'addi sp di ingresso e uscita?
R: Devono coincidere (stessa quantità allocata e rilasciata).

D: Quale istruzione carica un carattere e quale lo scrive? Come termina una stringa C?
R: `lbu` per leggere, `sb` per scrivere; termina con byte 0.

D: Scrivi strlen in assembly (a0=stringa, risultato in a0).
R: li t0,0 / sl: add t1,a0,t0 / lbu t2,0(t1) / beqz t2,se / addi t0,t0,1 / j sl / se: mv a0,t0 / ret

D: Che cosa calcola l'hash djb2?
R: hash = hash*33 + c, con valore iniziale 5381 (nel codice: slli t1,t0,5; add t0,t1,t0; add t0,t0,c).

D: MCD con sole sottrazioni: perché è una procedura foglia?
R: Usa solo a0,a1 e non chiama altre procedure: niente sp, fp o registri s da salvare. 7 istruzioni (beq, bge, sub, j, sub, j, ret).

D: In mcm = a*b/mcd(a,b) perché si salva ra? E il problema di s1 nella slide?
R: `jal mcd` sovrascrive ra. La slide usa s1 senza salvarlo: per convenzione andrebbe salvato, o si usa un t* non toccato da mcd [osservazione negli appunti].

## 04 - Assembler, linker, loader

D: Differenza tra pseudo-istruzione, direttiva, macro, istruzione?
R: Pseudo-istruzione = alias espanso dall'assemblatore (li, la, mv, ret). Direttiva = comando all'assemblatore, inizia con "." (.data, .word). Macro = nome per una sequenza, espansa in linea (senza jal/ret). Istruzione = codice ISA.

D: Elenca alcune direttive.
R: .text, .data, .globl, .word, .byte, .string, .eqv NOME VALORE.

D: Macro vs procedura?
R: La macro è espansa in linea dall'assemblatore a ogni uso; la procedura è un codice unico che si chiama (jal/ret).

D: In che cosa si espande `la`?
R: auipc (+ addi) [Lab 4, dettaglio in RARS].

D: Che cos'è una forward reference e perché servono due passi?
R: Etichetta usata prima di essere definita, indirizzo ancora ignoto. Passo 1 costruisce la symbol table; passo 2 traduce usando symbol table e tabella opcode.

D: Che cos'è l'ILC?
R: Instruction Location Counter: indirizzo della prossima istruzione; avanza di 4 per ogni istruzione RISC-V.

D: Compiti del linker (4 mosse)?
R: Tabella dei moduli e lunghezze; indirizzo di inizio per ciascuno; somma la relocation constant (indirizzo di partenza) agli indirizzi; aggiorna i riferimenti esterni.

D: A=0x400000, B=0x400100. Offset della jal da A a B (a 0x400000) e da B ad A (jal a 0x400100)?
R: A->B: 0x400100 - 0x400004 = 252 [valore nella slide]. B->A: 0x400000 - 0x400104 = -260 [valore nella slide, come da appunti].

D: Che sezioni ha un file oggetto ELF?
R: Header, text segment, static data segment, relocation information, symbol table, debugging info. (Windows: PE.)

D: Passi del loader?
R: Legge header per dimensioni; riserva spazio; copia programma e dati; copia sullo stack i parametri di main; inizializza registri e sp; salta alla routine che passa i parametri ai registri e chiama main.

D: Linking statico vs dinamico (DLL) vs lazy?
R: Statico: librerie nell'eseguibile (binario grande, versione congelata). Dinamico: collegate a runtime. Lazy: caricata alla prima chiamata tramite dummy con salto indiretto verso il linker dinamico, che poi aggiorna l'indirizzo.

D: Che cos'è il binding time?
R: Il momento in cui i nomi simbolici sono legati agli indirizzi fisici: scrittura, traduzione, link, load, esecuzione.

D: Layout di memoria in RARS?
R: Testo 0x00400000; dati statici 0x10010000; stack in alto, cresce verso il basso (sp compact 0x7FFFEFFC).

## 05 - Logica combinatoria e ALU

D: Combinatorio vs sequenziale?
R: Combinatorio: uscita funzione solo degli ingressi. Sequenziale: dipende anche da uno stato interno.

D: Enuncia De Morgan.
R: ¬(AB) = Ā + B̄; ¬(A+B) = Ā·B̄.

D: Forme canoniche FND e FNC?
R: FND = somma di prodotti (mintermini); FNC = prodotto di somme (maxtermini). Duali.

D: Come si ricava un circuito dalla FND?
R: Tabella di verità; invertitori per i complementi; un AND per ogni riga con uscita 1; collega gli ingressi; OR di tutti gli AND.

D: Che cos'è un don't care?
R: Ingresso che non influenza l'uscita (X); si sfrutta per semplificare (es. controllo ALU).

D: Decoder: ingressi/uscite?
R: n ingressi, $2^n$ uscite, esattamente una asserita per combinazione. Usi: abilitare componenti, scegliere un banco, scrivere un solo registro del register file.

D: Multiplexer: struttura e formula del mux 2:1?
R: $2^n$ ingressi dati, n controlli, 1 uscita. C = (~S & A) | (S & B) = S ? B : A. Un mux a 32 bit = 32 mux da 1 bit con stesso controllo.

D: Half adder: formule? Perché non basta?
R: Sum = a XOR b, Carry = a AND b. Manca il riporto in ingresso.

D: Full adder: formule e realizzazione?
R: Sum = a XOR b XOR CIn; COut = a·b + CIn·(a XOR b). Due half adder + un OR dei carry.

D: Che cos'è il ripple carry?
R: Full adder in cascata: COut del bit i è CIn del bit i+1.

D: Ingressi/uscite e funzioni della ALU a 1 bit base?
R: Ingressi a, b, CarryIn, Operation(2 bit); uscite Result, CarryOut. Mux a 4: 00 AND, 01 OR, 10 SUM, 11 LESS.

D: Come si ottiene la sottrazione nella ALU?
R: a - b = a + b̄ + 1: mux Binvert su b e CarryIn del bit 0 = 1; unica linea Bnegate.

D: Come si ottiene il NOR nella ALU?
R: NOR(a,b) = ā AND b̄: Ainvert=1, Bnegate=1, Operation=00.

D: Come si implementa slt nella ALU?
R: Sottrazione, Operation=11, Bnegate=1; ingresso Less = 0 per i bit 1..31; per il bit 0 prende Set (segno della somma del MSB). Risultato tutti 0 tranne il bit 0.

D: Limite del metodo slt basato sul segno?
R: Sbaglia quando la sottrazione va in overflow. Correzione: Set = segno XOR overflow [deduzione dal libro; DA VERIFICARE].

D: Quando si ha overflow in complemento a 2?
R: Somma di operandi di segno uguale con risultato di segno opposto; equivale a CarryIn e CarryOut del MSB discordi.

D: Come si ottiene Zero e a cosa serve?
R: NOR a 32 ingressi sul risultato (1 se tutti 0). Serve a beq: a - b == 0.

D: Linee di controllo ALU (4 bit) per AND, OR, add, sub, slt, NOR?
R: AND 0000, OR 0001, add 0010, sub 0110, slt 0111, NOR 1100 (Ainvert|Bnegate|Op).

D: Calcola 0x80000000 + 0xD0000000: risultato e overflow?
R: 0x50000000, overflow (due negativi danno un positivo).

D: Calcola 0x80000000 - 0xD0000000: risultato e overflow?
R: 0xB0000000, nessun overflow.

D: RV32I segnala l'overflow con un flag?
R: No: nessun flag, va dedotto a mano.

## 06 - Reti sequenziali e memorie

D: Latch SR con NOR: comportamento per le combinazioni di S,R?
R: 00 hold; S=1,R=0 stato 1 (Q=1); S=0,R=1 stato 0; S=R=1 vietata (Q e Q̄ entrambi 0, stato imprevedibile al rilascio).

D: Perché serve il clock?
R: S e R vengono da circuiti combinatori con transitori, che possono passare per S=R=1; il clock decide quando i dati entrano.

D: Come il D latch elimina S=R=1? E qual è il suo difetto?
R: Un solo ingresso D con S=D, R=D̄. Difetto: trasparente finché Clock=1 (Q segue D), quindi un valore "sporco" in retroazione può essere memorizzato.

D: Latch vs flip-flop?
R: Il latch è sensibile al livello; il flip-flop al fronte (di salita o discesa). Il fronte rende la memorizzazione quasi istantanea.

D: Setup time e hold time?
R: D deve essere stabile prima (setup) e dopo (hold) il fronte di campionamento.

D: Realizzazione didattica di un flip-flop D?
R: D-latch con clock = CLK AND NOT(ritardato CLK): impulso brevissimo dopo il fronte di salita.

D: Buffer tri-state?
R: Con Control=1 è un filo; con Control=0 disconnette (alta impedenza). Serve a collegare più sorgenti sullo stesso bus.

D: Che cos'è un registro?
R: Insieme di flip-flop D con lo stesso clock; un enable lo collega al bus tramite tri-state.

D: Come è fatto il register file RISC-V del corso?
R: 2 porte di lettura (mux, combinatoria), 1 di scrittura (decoder + RegWrite abilita il clock del solo destinatario), 32 registri a 32 bit, indici su 5 bit; x0=0 [libro].

D: Si può leggere e scrivere lo stesso registro nello stesso ciclo (add x1,x1,x1)?
R: Sì: scrittura sul fronte, la lettura vede il vecchio valore; il nuovo è visibile al ciclo dopo.

D: Dimensioni di una memoria con n linee di indirizzo e b linee dati?
R: $2^n$ righe x b colonne = $2^n$ x b bit, più Write enable. Es. 4x2: 2 bit indirizzo, 2 bit dato.

D: SRAM vs DRAM?
R: SRAM: flip-flop D, velocissima, usata per cache. DRAM: transistor + condensatore, va rinfrescata, più capace e lenta.

D: Tipi di ROM?
R: PROM, EPROM (UV), EEPROM (elettrica, più lenta), Flash (EEPROM cancellabile a blocchi).

D: Frequenza di un clock con tempo di ciclo 2 ns?
R: 500 MHz.

## 07 - Processore: datapath e controllo

D: Quali istruzioni supporta il datapath studiato?
R: Tipo R (add, sub, and, or), lw, sw, beq. Ciclo singolo: un'istruzione per ciclo.

D: Perché memoria istruzioni e dati sono separate? Perché alcuni componenti sono duplicati?
R: Ogni risorsa si può usare al più una volta per istruzione (ciclo singolo): servono 2 memorie e 2 sommatori oltre alla ALU.

D: Quali elementi sono di stato e quali combinatori?
R: Stato: PC, register file, memoria dati (scrittura sul fronte). Combinatori: ALU, mux, sommatori, controllo.

D: Cosa significa temporizzazione edge-triggered?
R: Gli elementi di stato cambiano sul fronte di salita; si può leggere e scrivere uno stesso elemento nello stesso ciclo.

D: Passi di un'istruzione R (add x1,x2,x3)?
R: Fetch e PC+4; lettura di x2,x3; ALU opera; risultato scritto in x1 con RegWrite=1 sul fronte.

D: Come lavora lw x1,off(x2) nel datapath?
R: ALU somma x2 + imm esteso; somma = indirizzo; MemRead legge; dato in x1 (MemtoReg=1, RegWrite=1).

D: E sw x1,off(x2)?
R: ALU calcola l'indirizzo; il dato di rs2 va alla memoria con MemWrite=1; nessuna scrittura di registro.

D: Come lavora beq?
R: ALU sottrae rs1-rs2; Zero=1 se uguali. Target = PC + (imm<<1). PCSrc = Branch AND Zero: se 1, PC <- target, altrimenti PC+4.

D: Perché l'immediato del branch viene shiftato di 1?
R: L'offset conta mezze parole (multipli di 2): range -4096..+4094.

D: Quali sono i tre mux del datapath unificato?
R: ALUSrc (rs2 / immediato), MemtoReg (risultato ALU / dato memoria), PCSrc (PC+4 / target branch).

D: Significato di ALUOp (2 bit)?
R: 00 somma (lw/sw); 01 sottrazione (beq); 10 dipende da funz7/funz3 (tipo R).

D: Tabella controllo ALU per ALUOp=10: add, sub, and, or?
R: add (funz7 0000000, funz3 000) -> 0010; sub (0100000, 000) -> 0110; and (0000000, 111) -> 0000; or (0000000, 110) -> 0001. [DA VERIFICARE sulle slide originali]

D: Perché il controllo ALU è a due stadi?
R: Per semplificare l'hardware: riduce dimensione e latenza del controllo principale (che può essere critico per il ciclo).

D: Quali sono le 8 uscite del controllo principale?
R: ALUSrc, MemtoReg, RegWrite, MemRead, MemWrite, Branch (1 bit ciascuno) + ALUOp (2 bit). PCSrc non è generato dal controllo (= Branch AND Zero).

D: Segnali di controllo per tipo R (ALUSrc, MemtoReg, RegWrite, MemRead, MemWrite, Branch, ALUOp)?
R: 0, 0, 1, 0, 0, 0, 10. [ricostruito dal libro; DA VERIFICARE]

D: Segnali di controllo per lw?
R: 1, 1, 1, 1, 0, 0, 00. [libro; DA VERIFICARE]

D: Segnali di controllo per sw?
R: ALUSrc 1, MemtoReg X, RegWrite 0, MemRead 0, MemWrite 1, Branch 0, ALUOp 00. [libro; DA VERIFICARE]

D: Segnali di controllo per beq?
R: ALUSrc 0, MemtoReg X, RegWrite 0, MemRead 0, MemWrite 0, Branch 1, ALUOp 01. [libro; DA VERIFICARE]

D: Quale codop riceve il controllo principale e quali valori ha?
R: Bit 6:0: tipo R 0110011 (51), load 0000011 (3), store 0100011 (35), beq 1100011 (99).

D: Se beq a PC=0x400010 ha imm (campo) = 8 e Zero=1, quanto vale il nuovo PC?
R: Target = PC + (imm<<1) = 0x400010 + 16 = 0x400020. Se Zero=0: 0x400014.

D: Che cos'è RISC-TO?
R: Processore RISC-V semplificato a 8 bit (Lab 10): lb, sb, beq, add; 256 B mem. istruzioni, 256 B mem. dati, 8 registri x0..x7. Da completare: unità di controllo e register file. Può essere argomento dell'orale.

## 08 - Bus

D: Che cos'è un bus e il protocollo del bus?
R: Insieme di linee che collegano i moduli (CPU, memoria, I/O); il protocollo è l'insieme di regole di comunicazione sulle linee.

D: Funzione delle linee dati, indirizzi, controllo?
R: Dati: larghezza = bit per trasferimento (prestazioni). Indirizzi: sorgente/destinazione ($2^n$ locazioni). Controllo: regolano accesso e uso delle altre linee.

D: Dispositivi master vs slave e interfacce?
R: Master (attivi) iniziano il trasferimento, bus driver. Slave (passivi) aspettano, bus receiver. Entrambi (CPU): bus transceiver.

D: I tre problemi di progetto di un bus?
R: Larghezza, arbitraggio, funzionamento (temporizzazione).

D: Sequenza di lettura in un bus sincrono (clock 100 MHz, memoria 15 ns)?
R: CPU mette indirizzo; a indirizzi stabili attiva MREQ e RD; la memoria attiva WAIT (15 ns > 1 ciclo da 10 ns: un wait state); mette il dato; la CPU lo legge e disattiva MREQ e RD.

D: Vantaggi e svantaggi del bus sincrono?
R: + semplicità dei dispositivi. - ogni operazione dura un numero intero di cicli; il bus si adatta al dispositivo più lento.

D: Handshake completo del bus asincrono (4 azioni)?
R: 1) master: indirizzo, MREQ, RD, MSYN; 2) slave lavora e attiva SSYN; 3) master legge e nega MREQ, RD, MSYN; 4) slave nega SSYN. (Nomi MSYN/SSYN da Tanenbaum [DA VERIFICARE].)

D: Vantaggi e svantaggi del bus asincrono?
R: + flessibile (durata dipende dalla coppia di dispositivi). - 4 azioni per operazione e circuiti di gestione del protocollo.

D: Arbitraggio centralizzato daisy chain: come funziona?
R: Arbitro riceve bus request e concede con bus grant, che scorre nella catena fino a chi lo accetta. Priorità fissa: vince il più vicino all'arbitro.

D: Come si estende la daisy chain con più livelli di priorità? Rischio?
R: Più linee request/grant (una catena per livello). Rischio di starvation per i livelli bassi.

D: Arbitraggio decentralizzato?
R: Nessun arbitro: una linea per dispositivo, oppure 3 linee (request, busy, arbitraggio). Più economico e veloce, meno flessibile.

D: Perché si è passati a bus seriali e punto-punto?
R: I paralleli (ISA, PCI) soffrono crosstalk, skew, costi e distanze brevi. I seriali (PCIe, USB 3, SATA) vanno a velocità molto maggiori con meno interferenze; i sistemi moderni usano controller dedicati.

D: Quanta memoria indirizza una CPU con n linee di indirizzo?
R: $2^n$ locazioni (es. 32 linee -> $2^{32}$ celle).

D: Banda di un bus sincrono: formula?
R: Banda = frequenza x larghezza dati / cicli per trasferimento (formula generica, non nelle slide; DA VERIFICARE).

D: Esempio: bus a 100 MHz, 32 bit di dato, 1 trasferimento per ciclo. Banda?
R: 100x10^6 x 4 B = 400 MB/s. Con 1 wait state (2 cicli per trasferimento): 200 MB/s. [applicazione della formula generica]

## 09 - Memoria e cache

D: Perché la gerarchia di memoria funziona?
R: Per la località: temporale (riaccedo presto alla stessa locazione, es. loop) e spaziale (accedo a locazioni vicine, es. array); la spaziale giustifica i blocchi.

D: Hit, miss, penalità di miss?
R: Hit: parola già in cache. Miss: il blocco va caricato dalla memoria; il tempo extra è la penalità di miss.

D: Formula della mappatura diretta?
R: linea = (indirizzo del blocco) mod (numero di linee in cache).

D: Scomposizione di un indirizzo in cache a mappatura diretta?
R: [tag | indice | offset]: offset = log2(byte/blocco); indice = log2(n. linee); tag = resto. Con indirizzo a 32 bit, $2^n$ linee, blocco $2^m$ byte: tag = 32 - n - m.

D: A cosa servono tag e bit di validità?
R: Il tag dice quale blocco è nella linea (più blocchi condividono la stessa); il bit di validità dice se la linea contiene dati validi.

D: Bit totali di una cache a mappatura diretta?
R: $2^n$ linee x (bit dato + bit tag + 1 bit validità).

D: Cache diretta, 16 KiB, blocchi da 4 parole (16 B), indirizzo a 32 bit: n. linee, tag, bit totali?
R: 1024 linee (n=10), offset 4 bit, tag 32-10-4 = 18 bit; totale 1024 x (128+18+1) = 150528 bit (~18,4 KiB). [applicazione delle formule standard]

D: Cache diretta di 8 blocchi (1 parola), richieste ai blocchi 22,26,22,26,16,3,16,18: esiti?
R: 22 miss, 26 miss, 22 hit, 26 hit, 16 miss, 3 miss, 16 hit, 18 miss (indice 2, sostituisce 26). Hit rate 3/8. (Esempio dal libro; valori delle slide DA VERIFICARE.)

D: Indici (blocco mod 8) di 22, 26, 16, 3, 18?
R: 6, 2, 0, 3, 2.

D: Cache completamente associativa: pro e contro?
R: Un blocco può stare in qualsiasi linea: nessun conflitto, ma un comparatore per linea (costoso), adatta a poche linee.

D: Cache set-associativa a k vie?
R: Cache divisa in insiemi di k blocchi; blocco nell'insieme (n. blocco) mod (n. insiemi), cercato in tutte le vie. 1 via = diretta; 1 solo insieme = completamente associativa.

D: Hardware di una cache a 4 vie?
R: 4 comparatori di tag (uno per via) + mux a 4 ingressi pilotato dagli hit.

D: Effetto dell'aumento di associatività?
R: Meno miss rate (meno conflitti), ma più costo e più tempo di hit.

D: Che cos'è LRU?
R: Least Recently Used: nell'insieme pieno si sostituisce il blocco inutilizzato da più tempo.

D: Perché aumentare la dimensione del blocco non è sempre vantaggioso?
R: Ci sono meno blocchi in cache e la penalità di miss cresce.

D: Come si gestisce un miss di istruzione (4 passi)?
R: 1) invia PC originale alla memoria; 2) comanda lettura e attendi; 3) scrivi parola in cache, aggiorna tag e validità; 4) riavvia l'istruzione dalla fetch.

D: Write-through vs write-back?
R: Write-through: ogni scrittura aggiorna anche la memoria (lento; si usa un buffer di scrittura). Write-back: si scrive solo in cache, la memoria è aggiornata alla sostituzione (serve bit dirty [libro]).

D: Che cos'è una cache Harvard (separata)?
R: Cache distinte per istruzioni e dati, accessibili in parallelo.

D: Tempo medio di accesso (AMAT)?
R: AMAT = tempo di hit + miss rate x penalità di miss [libro; non nelle slide, DA VERIFICARE se richiesto].

D: Cache set-associativa 2 vie con 4 insiemi, blocco di 1 parola. In quale insieme vanno i blocchi 0, 4, 8?
R: Tutti nell'insieme 0 (blocco mod 4 = 0). Con 2 vie, 0 e 4 coesistono; 8 sostituisce quello meno recente (LRU).

## 10 - I/O, interrupt, eccezioni

D: Ruolo del controllore di periferica?
R: Traduce comandi della CPU in segnali per la periferica e viceversa. Per la CPU il dispositivo è un insieme di registri (dati, comando, stato) con un indirizzo.

D: Memory-mapped I/O vs isolated I/O?
R: Memory-mapped: registri nello stesso spazio di indirizzi della memoria, si usano lw/sw. Isolated: spazio di indirizzi separato per i dispositivi.

D: Che cos'è l'I/O programmato con busy waiting e il suo difetto?
R: La CPU legge ciclicamente il bit READY del registro di stato finché il dispositivo è pronto. Difetto: la CPU resta occupata a vuoto.

D: Scrivi un ciclo di polling in assembly.
R: loop: lw t0,STATUS(a0) / andi t0,t0,1 / beqz t0,loop / lw t1,DATA(a0) (indirizzi simbolici).

D: Descrivi la lettura da tastiera con polling.
R: Il tasto premuto fa mettere a 1 il bit di stato e l'ASCII nel buffer; la CPU, quando trova il bit a 1, legge il buffer, elabora e azzera il bit.

D: Caratteristiche degli interrupt?
R: Vanno dai dispositivi alla CPU, sono asincroni e devono essere gestiti in modo trasparente (stato del programma identico dopo). La CPU può abilitarli/disabilitarli.

D: Parte hardware della gestione di un interrupt?
R: Il controller attiva la linea di interrupt; la CPU risponde con ack; il controller invia il vettore di interrupt; la CPU lo salva, impila PC e registri di stato, usa il vettore come indice per trovare il PC del gestore.

D: Parte software della gestione di un interrupt?
R: Il gestore salva i registri, legge il buffer, gestisce errori e aggiorna variabili, invia l'ack di fine, ripristina i registri, esegue l'istruzione di ritorno (RETI generico; SRET in RISC-V).

D: Come si gestiscono più interrupt contemporanei?
R: O il gestore disabilita le interruzioni, o si usano le priorità (crescono con la criticità). Interrupt mascherabili o non mascherabili.

D: Trap vs interrupt?
R: Trap sincrone (causate dall'istruzione in corso: overflow, servizi SO), gestore in locazione fissa. Interrupt asincroni da dispositivi esterni.

D: Perché una trap per l'overflow è meglio del test software?
R: Il test costringerebbe a controllare dopo ogni operazione a rischio con molte istruzioni; con la trap l'hardware controlla a fine istruzione e salta da solo al gestore.

D: Come funziona il DMA?
R: I/O programmato eseguito da un componente con accesso diretto al bus. Il SO inizializza i registri DMA (indirizzo, quantità, direzione); CPU e DMA si contendono il bus (arbitraggio); la CPU è libera di fare altro.

D: Confronto polling / interrupt / DMA?
R: Polling: semplice ma busy waiting. Interrupt: il dispositivo avvisa a lavoro finito, CPU libera ma interviene per ogni dato. DMA: trasferimento diretto senza la CPU per ogni dato.

D: Che cos'è un'eccezione in RISC-V? Cosa salva la CPU?
R: Trasferimento di controllo non legato al codice utente verso il gestore, trasparente per l'applicazione. Salva il PC dell'istruzione colpevole in SEPC e la causa in SCAUSE; il ritorno è SRET.

D: Quattro tipi di eccezione RISC-V?
R: Interrupt (asincrono, esterno); errore (sincrono interno: overflow, div per zero, istruzione illegale); environment call ecall (servizio di sistema, codice in a7); environment break ebreak (debug).

D: Cosa fa `addi x17,x0,10; ecall`?
R: a7=10 = servizio exit: termina il programma.

D: Due strategie per arrivare al gestore?
R: Salto diretto PC <- base (STVEC, MODE=00), il gestore legge SCAUSE; vettore PC <- MEM[base + causa*4] (STVEC.MODE=01).

D: Tre modi di salvare lo stato all'eccezione?
R: Sullo stack (Vax, 68k, x86); registri shadow (ARM); registri speciali (RISC-V, MIPS: solo ciò che serve).

D: Indirizzi dei CSR principali?
R: STATUS 0x100, SIE 0x104, STVEC 0x105, SSCRATCH 0x140, SEPC 0x141, SCAUSE 0x142, STVAL 0x143, SIP 0x144. (Materiale aggiuntivo; DA VERIFICARE se richiesto.)

D: Cosa contiene SCAUSE e alcuni codici?
R: Bit Int (1 interrupt, 0 eccezione) + Code. 0 istr. disallineata, 2 istruzione illegale, 3 breakpoint, 4/5 load misaligned/fault, 6/7 store misaligned/fault, 8 ecall da U-mode, 9 ecall da S-mode.

D: Che cos'è STVAL?
R: Registro CSR con l'indirizzo "sbagliato" di accesso.

D: Modalità user e supervisor?
R: User per le applicazioni (accesso controllato); supervisor/kernel per il SO (privilegiata). Il gestore gira in supervisor con eccezioni disabilitate e non deve alterare x1..x31 / f0..f31.

## 11 - Laboratorio: codice (cosa fa questo codice)

D: Cosa fa `add x7,x5,x6 ; srai x7,x7,1`?
R: x7 = (x5+x6)/2 con segno (floor). srai e non srli per supportare i negativi.

D: Cosa fa `andi t0,x5,0xC ; slli t0,t0,4 ; andi x6,x6,-193 ; or x6,x6,t0`?
R: Copia i bit 2-3 di x5 nei bit 6-7 di x6 lasciando invariati gli altri (-193 = ~0xC0 azzera i bit 6-7). Con x5=0, x6=0xFFFFFFFF: 0xFFFFFF3F.

D: Array .byte 130,150,200: somma con lb e con lbu?
R: lb: -126 + -106 + -56 = -288; lbu: 130+150+200 = 480.

D: Come si estrae il byte meno significativo e il secondo byte di var1=0x12345678?
R: `andi t2,t1,0xFF` -> 0x78; `srli t2,t1,8 ; andi t2,t2,0xFF` -> 0x56.

D: Cosa fa `la t0,v1` e perché è meglio di `li t0,0x10010000`?
R: Carica l'indirizzo dell'etichetta (auipc+addi); evita indirizzi hard-coded fragili.

D: Fibonacci iterativo (slide): quante istruzioni eseguite per N=8?
R: 3 di setup + 8 x 6 del ciclo + 1 di uscita = 52 (53 se si conta `li t0,8`). [conteggio negli appunti]

D: Contauno su 32 bit (do-while): istruzioni statiche ed eseguite?
R: 7 statiche; 2 + 32x5 = 162 eseguite, indipendentemente dal valore. [conteggio negli appunti]

D: Somma dei primi N quadrati con N=10: istruzioni eseguite?
R: 2 + 10x5 + 1 = 53. [conteggio negli appunti]

D: Cosa calcola `mv t3,t0 ; bge t3,t1,s1 ; mv t3,t1 ; s1: bge t3,t2,s2 ; mv t3,t2 ; s2:`?
R: Il massimo di t0, t1, t2 in t3.

D: Cosa fa `lbu t3,0(t0) ; andi t3,t3,1 ; add t2,t2,t3 ; addi t0,t0,1` in un ciclo?
R: Conta i byte dispari di un array (andi 1 = bit meno significativo).

D: Cosa fa il ciclo con due puntatori t2 (inizio) e t3 (fine), `bge t2,t3,end`, scambio con lw/sw, `addi t2,t2,4 ; addi t3,t3,-4`?
R: Inverte l'array (invert). Termina quando i puntatori si incontrano.

D: Nel bubble sort della slide qual è il difetto?
R: `for i<size` con `array[i+1]` accede fuori dall'array: il limite corretto è i < size-1 [DA VERIFICARE].

D: Cosa fa `strcmp("first","second")`?
R: Restituisce a0 = 1 (stringhe diverse; la funzione degli appunti restituisce 0/1, non il segno).

D: Lab 6: perché mcd è foglia e non servono salvataggi?
R: Usa solo a0, a1 e non chiama procedure: nessun sp/fp o registro s.

## 12 - Esame (meta)

D: Quale appello e quale formato dell'esame?
R: Appello 2027-02-01. Scritto + probabile orale; il progetto RISC-TO può essere argomento dell'orale. [DA VERIFICARE struttura, tabelle ammesse]

D: Quali lacune dichiarano gli appunti?
R: Lab 7 (ricorsione) assente; niente teoria "ISA parte 3" dedicata; libro non letto (punti [libro]); figure/tabelle non estratte; nessun tema d'esame passato.
