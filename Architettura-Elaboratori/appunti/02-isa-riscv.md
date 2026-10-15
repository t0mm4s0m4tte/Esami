# 02 - ISA RISC-V: registri, memoria, istruzioni, formati

Fonte: Lezione 02 (ISA parte 2), Lab 1-2-4 (slide). Dove segnalato "[libro]" il dettaglio proviene dalla conoscenza standard del libro Patterson-Hennessy / specifica RISC-V, non dalle slide estratte.

## Mappa

- [RISC-V in breve](#risc-v-in-breve)
- [Registri e memoria](#registri-e-memoria)
- [Istruzioni aritmetiche](#istruzioni-aritmetiche)
- [Accesso alla memoria](#accesso-alla-memoria)
- [Operazioni logiche e shift](#operazioni-logiche-e-shift)
- [Formati delle istruzioni (tutte lunghe 32 bit)](#formati-delle-istruzioni-tutte-lunghe-32-bit)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## RISC-V in breve
RISC-V nasce a Berkeley nel 2010 (Waterman, Lee, Asanovic). Non è un'azienda né una CPU: è una ISA, cioè una specifica, ed è uno standard aperto e privo di licenze. Questo è ciò che lo distingue dalle ISA proprietarie e lo rende adatto a un corso come questo.

La ISA è modulare e si articola in estensioni:
- RV32I: base a 32 bit;
- RV64I: base a 64 bit;
- RV64M: aggiunge moltiplicazione e divisione;
- RV64F: virgola mobile;
- RV32E/RV64E: riducono i registri a 16.

Dopo la Lezione 2 si fa riferimento esclusivamente a RV32I.

RISC significa Reduced Instruction Set Computer, e la filosofia si riassume in tre principi:
1. la semplicità favorisce la regolarità;
2. minori sono le dimensioni, maggiore è la velocità;
3. un buon progetto richiede buoni compromessi.

Vedremo questi principi applicarsi più volte: le istruzioni hanno sempre tre operandi, tutte sono lunghe 32 bit, i formati sono pochi e simili.

## Registri e memoria
Il modello di programmazione di RV32I comprende 32 registri interi `x0..x31` (a 32 bit in RV32I, a 64 in RV64I), 32 registri in virgola mobile `f0..f31`, un PC, 4096 CSR (control status registers) e una memoria con indirizzi a byte (fino a 2^32-1 in RV32I). Una parola (word) è di 32 bit, una doppia parola (doubleword) di 64.

I registri hanno anche un nome ABI, che esprime la convenzione d'uso: `zero` per la costante 0, `ra` per l'indirizzo di ritorno, `sp` per lo stack pointer, `a0-a7` per argomenti e valori di ritorno, `t*` per i temporanei e `s*` per i registri da salvare. Dal Lab 3 in poi si usano solo questi nomi.

| Registro | Nome ABI | Uso |
|---|---|---|
| x0 | zero | costante 0 (non scrivibile) |
| x1 | ra | return address |
| x2 | sp | stack pointer |
| x3 | gp | global pointer |
| x4 | tp | thread pointer |
| x5-x7, x28-x31 | t0-t2, t3-t6 | temporanei, NON salvati nelle chiamate |
| x8 | s0/fp | frame pointer (salvato) |
| x9, x18-x27 | s1, s2-s11 | da salvare: se usati dal chiamato, il contenuto va preservato |
| x10-x17 | a0-a7 | argomenti e valori di ritorno |

(Mappatura dei nomi t/s/a: slide Lab 3 "Useremo solo i nomi da adesso in poi"; assegnazione numerica da slide Lez. 2 e libro.)

## Istruzioni aritmetiche
Le istruzioni aritmetiche seguono una notazione rigida: sempre tre operandi, in ordine fisso, e sempre registri, perché la ALU lavora solo su registri. `add rd, rs1, rs2` calcola a = b + c e `sub rd, rs1, rs2` la differenza, con interi in complemento a due. La regolarità ha un prezzo: una riga di C può diventare più istruzioni. Per esempio `f = (g+h)-(i+j)` diventa `add x5,x20,x21; add x6,x22,x23; sub x19,x5,x6`.

Il registro `x0`, che vale sempre zero, permette di ottenere alcune operazioni gratis. Per negare si scrive `sub x19, x0, x19`; per copiare un registro `add x19, x0, x18` (la pseudoistruzione `mv`).

Per lavorare con costanti si usano gli **immediati**: `addi rd, rs1, imm` accetta un imm a 12 bit nell'intervallo [-2048, +2047]. Non esiste `subi`, perché basta usare una costante negativa. La pseudoistruzione `li rd, const` carica una costante a 32 bit: se non entra in 12 bit viene espansa (lui + addi) [libro]. Occorre quindi distinguere istruzione e pseudoistruzione: le istruzioni "immediate" hanno solo 12 bit.

## Accesso alla memoria
La ALU opera solo sui registri, mentre i dati risiedono in memoria, che è più lenta; per questo il compilatore tiene nei registri le variabili più usate e usa load e store per spostare i dati. L'indirizzo di un accesso si calcola sempre come **registro base + offset**, con offset a 12 bit con segno nell'intervallo [-2048, +2047]. Le istruzioni di trasferimento sono:

| Istruzione | Effetto |
|---|---|
| `lw rd, off(rs1)` | carica word (32 bit) |
| `lh` / `lhu` | half-word (16 bit) con estensione del segno / con zeri |
| `lb` / `lbu` | byte con estensione segno / zeri |
| `sw rs2, off(rs1)` | scrive word |
| `sh`, `sb` | scrive 16 / 8 bit (i bit meno significativi del registro) |
| `ld`, `sd` | solo RV64I (doubleword) |
| `lwu` | solo RV64 |

Quando si carica un byte o una half-word in un registro a 32 bit, bisogna decidere come riempire i bit alti. Con `lb` e `lh` il valore è **esteso nel segno**, con `lbu` e `lhu` si estende con zeri. L'esempio della slide: il byte 0xAC, con bit alto 1, dà 0xFFFFFFAC con `lb` e 0x000000AC con `lbu`; il byte 0x23 dà 0x00000023 con `lb`.

Altro aspetto è l'ordine dei byte in memoria. In un sistema **little endian** l'indirizzo della word identifica il byte meno significativo (byte 0): RISC-V e Intel sono little endian, mentre SPARC e i mainframe IBM sono big endian. Quanto all'**allineamento**, `lw/sw` dovrebbero avere indirizzo multiplo di 4 e `lh/sh` multiplo di 2; un accesso non allineato è più lento (slide), e nel simulatore RARS `lw t1, 1(t0)` genera errore (word non allineata).

Poiché la memoria è indirizzata a byte, l'indirizzo di un elemento di array dipende dalla dimensione del tipo. Per un array di int (4 byte) `v[i]` sta a `base + 4*i`; per gli short a `+2*i`; per i char a `+i`; per i long (RV64) a `+8*i`.

### Esempi svolti (dalle slide)
```
// g = h + v[3]; v[6] = g - f      (int, v->x21, g->x5, h->x9, f->x19)
lw  x10, 12(x21)     # v[3]
add x5,  x9, x10     # g = h + v[3]
sub x6,  x5, x19
sw  x6,  24(x21)     # v[6]

// v[i] = v[j]       (i->x9, j->x21, v->x19)
addi x6,x21,0 ; slli x6,x6,2 ; add x6,x6,x19 ; lw x6,0(x6)   # x6 = v[j]
addi x7,x9,0  ; slli x7,x7,2 ; add x7,x7,x19 ; sw x6,0(x7)   # v[i] = x6

// v[i+d] = v[j+2]   : stesso schema con  addi x6,x21,2  e  add x7,x9,x5
```
Con indice costante lo scostamento si calcola a mano (v[3] sta a offset 12). Con indice variabile vale uno schema generale:
1. calcola l'indice;
2. moltiplicalo per la dimensione con `slli rd,rd,2` (x4);
3. somma la base con `add rd,rd,base`;
4. accedi con `lw/sw 0(rd)`.

## Operazioni logiche e shift
Gli shift logici sono `sll/slli` (a sinistra) e `srl/srli` (a destra, riempiendo con 0); lo shift aritmetico a destra `sra/srai` replica invece il segno. Non esiste uno shift aritmetico a sinistra, perché sarebbe identico a `sll`. Gli shift hanno un significato aritmetico utile: uno shift a sinistra di k posizioni moltiplica per 2^k, e `srai` di k divide per 2^k gli interi con segno (con arrotondamento verso -inf).

Le operazioni bit a bit sono `and/andi`, `or/ori`, `xor/xori`; `not` è una pseudoistruzione (`xori rd,rs,-1`). Un `and` con una maschera seleziona alcuni bit, mentre un `or` con una maschera forza a 1 i bit della maschera.

Esempio della slide, con `x5=0xAAAAAAAA` e `x6=0x12345678`: `slli x7,x5,4; or x7,x7,x6` dà `x7 = 0xBABEFEF8`; `slli x28,x6,4` dà `0x23456780`; `srli x29,x5,3; andi x29,x29,0xFF` dà `0x55`.

## Formati delle istruzioni (tutte lunghe 32 bit)
Tutte le istruzioni occupano 32 bit, ma sono organizzate in pochi formati che si distinguono per la funzione dei campi. Si numerano i bit da 31 a 0.

| Formato | Campi (da bit 31 a 0) | Usato per |
|---|---|---|
| **R** | funz7(7) rs2(5) rs1(5) funz3(3) rd(5) codop(7) | add, sub, and, or, xor, sll, srl, sra, slt, mul... |
| **I** | imm[11:0](12) rs1(5) funz3(3) rd(5) codop(7) | addi, andi, ori, slli..., load, jalr |
| **S** | imm[11:5](7) rs2(5) rs1(5) funz3(3) imm[4:0](5) codop(7) | store |
| **SB** (B) | imm[12](1) imm[10:5](6) rs2(5) rs1(5) funz3(3) imm[4:1](4) imm[11](1) codop(7) | branch |

Nel formato S l'immediato dello store è spezzato in due parti: la scelta ha una ragione precisa, mantenere rs1 e rs2 nelle stesse posizioni del tipo R, così che l'hardware li legga sempre dallo stesso punto. Gli immediati sono in complemento a due, nell'intervallo [-2048, +2047] per I e S; nei branch l'offset è espresso in multipli di 2 (mezze parole) e ha range [-4096, +4094] (vedi file 03). Per gli shift, `sll/srl/sra` sono di tipo R mentre `slli/srli/srai` sono di tipo I e usano i bit bassi dell'immediato per lo shamt; per `srai` il funz7 (bit alti) vale 0100000 [libro].

### Codopi e funz (da libro, verificati sugli esempi delle slide)
| Istruzione | codop | funz3 | funz7 |
|---|---|---|---|
| tipo R (add, sub, and, or...) | 0110011 | add/sub 000, sll 001, slt 010, sltu 011, xor 100, srl/sra 101, or 110, and 111 | add 0000000, sub 0100000 |
| tipo I aritmetico (addi...) | 0010011 | addi 000 | - |
| load | 0000011 | lb 000, lh 001, lw 010, lbu 100, lhu 101 | - |
| store | 0100011 | sb 000, sh 001, sw 010 | - |
| branch | 1100011 | beq 000, bne 001, blt 100, bge 101, bltu 110, bgeu 111 | - |
| jal | 1101111 | - | - |
| jalr | 1100111 | 000 | - |

(Slide: add=0110011, load=3 dec (0000011), store=35 (0100011), beq=99 (1100011), tipo R=51 (0110011). Le altre righe [libro: DA VERIFICARE].)

### Esempi di codifica (slide)
- `add x5,x9,x10` -> `0000000 01010 01001 000 00101 0110011`
- `sub x18,x19,x5` -> `0100000 00101 10011 000 10010 0110011`
- `lw x9,176(x22)` -> `000010110000 10110 010 01001 0000011` (176 = 0b000010110000)
- `addi x7,x5,-6` -> `111111111010 00101 000 00111 0010011` (-6 in 12 bit)
- `sw x9,24(x22)` -> `0000000 01001 10110 010 11000 0100011` (imm=24: [11:5]=0000000, [4:0]=11000)

Per codificare a mano un'istruzione si procede così:
1. identifica formato e codop/funz;
2. converti i numeri dei registri in 5 bit;
3. converti l'immediato in 12 bit in complemento a due (spezzandolo per il tipo S);
4. concatena i campi nell'ordine del formato.

Per decodificare una word si legge prima il codop (bit 6:0), che determina il formato, e poi si estraggono i campi: rs1 = bit 19:15, rs2 = 24:20, rd = 11:7, funz3 = 14:12, funz7 = 31:25.

## Cose da saper fare all'esame
- Tradurre espressioni C (anche con array e indici variabili) in assembly RISC-V.
- Codificare un'istruzione in binario/esadecimale e decodificare una word a 32 bit.
- Prevedere il contenuto dei registri dopo sequenze con shift/and/or/lb/lbu/lh.
- Spiegare little endian, allineamento, estensione del segno.
- Spiegare perché immediato a 12 bit, perché lo store spezza l'immediato.

## Dubbi
- Elenco completo di istruzioni richieste a memoria all'esame non è nelle slide; il docente rimanda al libro (tabella di riferimento RISC-V). Portare sul foglio/summary la tabella delle istruzioni base. [DA VERIFICARE se è consentita all'esame]
