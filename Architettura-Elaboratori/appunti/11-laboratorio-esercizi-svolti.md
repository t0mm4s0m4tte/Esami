# 11 - Laboratorio: RARS, esercizi tipo con soluzioni

Fonte: slide Lab 1-6, 8, 9, 10 (cartella "Slide Deck - Laboratorio"). **Lab 7 (Ricorsione) non è nel Drive.** Le soluzioni marcate "(slide)" sono quelle delle slide; le altre sono **mie** (scritte per queste note, non testate in RARS: [DA VERIFICARE eseguendole]).

## RARS (Lab 1)
RARS è il simulatore RISC-V (RV32 e RV64) su cui si fa tutto il laboratorio: permette di scrivere, eseguire e ispezionare programmi assembly senza una macchina reale. Conviene usare il fork di Drago `github.com/idrago/rars` ("vi aiuterà per l'esame"), che richiede la JVM 8. Offre breakpoint, esecuzione a passi e statistiche (Tools > Instruction Counter / Statistics: numero di istruzioni per tipo, accessi a memoria), utili per contare le istruzioni eseguite.

L'interfaccia è divisa in finestre: l'Editor; il Segmento Testo, che mostra indirizzi, codifica macchina e sorgente, distinguendo le pseudo-istruzioni dalle istruzioni "basic"; il Segmento Dati, che parte da 0x10010000; i Registri, con nome ABI e x0..x31; e la finestra di I/O.

Un programma ha sempre la stessa struttura: una sezione `.data` per i dati, una `.text` per il codice e un'etichetta `_start` che fa da punto d'ingresso (il "main"), come in questo scheletro:
```
.globl _start
.data              # dati
v1: .word 8
.text
_start:
   ...
exit: addi x17, x0, 10    # ecall 10 = exit  (equivale a li a7,10)
      ecall
```
I commenti iniziano con `#` e le etichette si scrivono `nome:`. Per i servizi di sistema si usa `ecall`, con `a7` che contiene il numero del servizio (1 = print int, 10 = exit) e `a0` l'argomento. Le direttive principali sono `.globl`, `.text`, `.data`, `.word`, `.byte`, `.string` e `.eqv NAME VALUE`. Per ottenere l'indirizzo di un dato si usa `la t0, v1`, una pseudo-istruzione che carica l'indirizzo di un'etichetta (si espande in `auipc`+`addi`): è preferibile a indirizzi "hard-coded" come `li t0, 0x10010000`, che rendono il codice fragile.

## Lab 1
I primi due esercizi servono a prendere confidenza con le istruzioni aritmetiche e con il problema dell'overflow, che in RV32I non è segnalato da alcun flag e va dedotto a mano.
**Es. 1 - somma di 41, 43, 47 (slide):**
```
addi x5,x0,41 ; addi x6,x0,43 ; addi x7,x0,47
add  x28,x5,x6 ; add x28,x28,x7      # x28 = 131
```
**Es. 2 - overflow** con x5=0x80000000, x6=0xD0000000 (slide). Il caso istruttivo è la somma di due negativi: `add x30,x5,x6` dà 0x50000000, un risultato positivo, quindi c'è **overflow**. La sottrazione `sub x30,x5,x6` dà invece 0xB0000000 e non produce overflow. Nella sequenza `add x30,x5,x6; add x30,x30,x5` il risultato finale è 0xD0000000 ma l'overflow si è verificato già nel primo add (RV32I non lo segnala: nessun flag, lo si deduce).

## Lab 2 - logiche e load/store
Qui si lavora su shift, maschere e accesso alla memoria: sono gli strumenti con cui si manipolano bit e byte, che tornano in molti esercizi d'esame.
**Es. 1 (slide):** x5=0xAAAAAAAA, x6=0x12345678: `slli x7,x5,4; or x7,x7,x6` -> 0xBABEFEF8; `slli x28,x6,4` -> 0x23456780; `srli x29,x5,3; andi x29,x29,0xFF` -> 0x55.

**Es. 2 - media di due pari** (x7 = (x5+x6)/2, solo rv32i):
```
add  x7, x5, x6
srai x7, x7, 1       # srai (non srli) per supportare negativi; con pari non c'è resto
```
**Es. 3 - media di 4 interi in memoria** (floor; slide Lab 4):
```
la t1, v1 ; lw t2,0(t1) ; lw t3,4(t1) ; add t4,t2,t3
lw t3,8(t1) ; add t4,t4,t3 ; lw t3,12(t1) ; add t4,t4,t3
srai t4,t4,2 ; sw t4,16(t1)
```
Nota: le slide dicono "solo rv32i" nel Lab 2 e "rv64i" nel Lab 4 (stesso esercizio) [DA VERIFICARE: probabilmente refuso]. srai arrotonda per difetto (verso -inf).

**Es. 4 - somma dei quadrati** (mul, estensione M):
```
la t0,num1 ; lw t1,0(t0) ; lw t2,4(t0)
mul t1,t1,t1 ; mul t2,t2,t2 ; add t3,t1,t2 ; sw t3,8(t0)
```
**Es. 5 - signed vs unsigned** (array .byte 130,150,200):
```
la t0,array
lb  t1,0(t0) ; lb t2,1(t0) ; lb t3,2(t0) ; add t4,t1,t2 ; add t4,t4,t3   # -126-106-56 = -288
lbu t1,0(t0) ; lbu t2,1(t0) ; lbu t3,2(t0) ; add t5,t1,t2 ; add t5,t5,t3 # 480
la t6,result1 ; sw t4,0(t6) ; sw t5,4(t6)
```
**Es. 6 - estrarre i byte di var1=0x12345678** (byte1 = meno significativo):
```
la t0,var1 ; lw t1,0(t0)
andi t2,t1,0xFF      ; la t3,byte1 ; sb t2,0(t3)    # 0x78
srli t2,t1,8  ; andi t2,t2,0xFF ; la t3,byte2 ; sb t2,0(t3)   # 0x56
srli t2,t1,16 ; andi t2,t2,0xFF ; la t3,byte3 ; sb t2,0(t3)   # 0x34
srli t2,t1,24 ; la t3,byte4 ; sb t2,0(t3)                      # 0x12
```
**Es. 7 - estrarre bit 2-3 di x5 e metterli nei bit 6-7 di x6** (altri bit invariati). Test con x5=0, x6=0xFFFFFFFF -> atteso 0xFFFFFF3F ("svista comune": non azzerare prima i bit di destinazione).
```
andi t0,x5,0xC        # isola bit 2-3
slli t0,t0,4          # li sposta in 6-7
andi x6,x6,-193       # -193 = ~0xC0: azzera bit 6-7 di x6 (entra in 12 bit)
or   x6,x6,t0
```
Variante: bit 11-16 di x5 -> bit 26-31 di x6:
```
srli t0,x5,11 ; andi t0,t0,0x3F ; slli t0,t0,26
slli x6,x6,6 ; srli x6,x6,6        # azzera i 6 bit alti
or   x6,x6,t0
```

## Lab 3 - decisioni (slide)
Gli esercizi di questo laboratorio traducono costrutti if/else e cicli in salti condizionati; quasi tutti chiedono anche di contare le istruzioni statiche ed eseguite, per capire il costo di un ciclo.

**Es. 1** (frammenti if/else): vedi file 03. **Es. 2 - max di t0,t1,t2 in t3:**
```
mv t3,t0 ; bge t3,t1,s1 ; mv t3,t1
s1: bge t3,t2,s2 ; mv t3,t2
s2:
```
**Es. 3 - Fibonacci iterativo** (slide; N in t0, R in t1, A=t2, B=t3):
```
li t1,1 ; li t2,0 ; li t3,1
loop1: ble t0,zero,end1
       add t1,t2,t3 ; add t2,t3,zero ; add t3,t1,zero ; addi t0,t0,-1 ; j loop1
end1:
```
Istruzioni statiche: 9 (3 di setup + 6 del ciclo), 10 contando `li t0,N`. Eseguite per N=8: 3 + 8x6 + 1 = **52** (nella slide c'è anche `li t0,8` -> 53). [conteggio mio]. Idea di riduzione: ciclo con test in coda.

**Es. 4 - somma dei primi N quadrati** (N in t0, risultato t1):
```
li t1,0 ; li t2,1
loop: bgt t2,t0,end ; mul t3,t2,t2 ; add t1,t1,t3 ; addi t2,t2,1 ; j loop
end:
```
Eseguite per N=10: 2 + 10x5 + 1 = 53 [conteggio mio].

**Es. 5 - contauno** (slide pseudocodice: `M=1; R=0; i=32; do{R+=N&M; N>>=1; i--}while(i>0)`):
```
li t2,0 ; li t3,32
loop: andi t4,t0,1 ; add t2,t2,t4 ; srli t0,t0,1 ; addi t3,t3,-1 ; bnez t3,loop
```
Statiche 7; eseguite: 2 + 32x5 = **162** indipendentemente da t0 [conteggio mio].

**Es. 6 - for annidati** `for i<a for j<b R = 2R+i+j` (a,b,R in t0,t1,t2):
```
li t3,0
Li: bge t3,t0,end
    li t4,0
Lj: bge t4,t1,nexti
    slli t2,t2,1 ; add t2,t2,t3 ; add t2,t2,t4 ; addi t4,t4,1 ; j Lj
nexti: addi t3,t3,1 ; j Li
end:
```
Per a=10, b=5: 1 + 10x(1+1+5x6+1+1+1) + 1 = 352 [conteggio mio, dipende dalla soluzione].

## Lab 4 - array (esercizi; soluzioni mie)
Gli array si scorrono con un puntatore che avanza di 4 byte per parola (1 per i byte) e un contatore che scende fino a zero; la dimensione è memorizzata subito prima dei dati.
Formato dati: `size: .word N` seguita da `array: .word ...`; `result: .word 0`.
**Es. 3 - somma array:**
```
la t0,size ; lw t1,0(t0) ; addi t0,t0,4 ; li t2,0
loop: beqz t1,end ; lw t3,0(t0) ; add t2,t2,t3 ; addi t0,t0,4 ; addi t1,t1,-1 ; j loop
end: la t4,result ; sw t2,0(t4)
```
**Es. 4 - max array (size>0):**
```
la t0,size ; lw t1,0(t0) ; addi t0,t0,4 ; lw t2,0(t0)   # max = primo
addi t1,t1,-1 ; addi t0,t0,4
loop: beqz t1,end ; lw t3,0(t0) ; ble t3,t2,skip ; mv t2,t3
skip: addi t0,t0,4 ; addi t1,t1,-1 ; j loop
end: la t4,result ; sw t2,0(t4)
```
**Es. 5 - conta dispari (array di byte dopo size):**
```
la t0,size ; lw t1,0(t0) ; addi t0,t0,4 ; li t2,0
loop: beqz t1,end ; lbu t3,0(t0) ; andi t3,t3,1 ; add t2,t2,t3 ; addi t0,t0,1 ; addi t1,t1,-1 ; j loop
end: la t4,result ; sw t2,0(t4)
```
(`andi x,1` è il bit meno significativo: 1 se dispari.)
**Es. 6 - sorted (slide: `result=1; for i<size-1 if a[i]>a[i+1] {result=0;break}`):**
```
la t0,size ; lw t1,0(t0) ; addi t0,t0,4 ; li t2,1 ; addi t1,t1,-1
loop: blez t1,end ; lw t3,0(t0) ; lw t4,4(t0) ; ble t3,t4,ok ; li t2,0 ; j end
ok: addi t0,t0,4 ; addi t1,t1,-1 ; j loop
end: la t5,result ; sw t2,0(t5)
```
**Es. 7 - invert (due puntatori):**
```
la t0,size ; lw t1,0(t0) ; addi t2,t0,4              # t2 = &a[0]
slli t3,t1,2 ; add t3,t2,t3 ; addi t3,t3,-4           # t3 = &a[size-1]
loop: bge t2,t3,end ; lw t4,0(t2) ; lw t5,0(t3) ; sw t5,0(t2) ; sw t4,0(t3)
      addi t2,t2,4 ; addi t3,t3,-4 ; j loop
end:
```
**Es. 8 - bubble sort:** la slide ha `for i<size` con `array[i+1]`: accede fuori dall'array, il limite corretto è `i < size-1` [errore nella slide, DA VERIFICARE]. Schema:
```
       la t0,size ; lw t5,0(t0) ; addi t5,t5,-1      # t5 = size-1 confronti per passata
outer: li t6,0                 # change = 0
       addi t2,t0,4 ; mv t1,t5                       # t2 = &array[0]
inner: beqz t1,check ; lw t3,0(t2) ; lw t4,4(t2) ; ble t3,t4,noswap
       sw t4,0(t2) ; sw t3,4(t2) ; li t6,1
noswap: addi t2,t2,4 ; addi t1,t1,-1 ; j inner
check: bnez t6,outer
```

## Lab 5 - stringhe e procedure (soluzioni mie)
Le stringhe sono sequenze di byte terminate da zero, quindi si scorrono con `lbu` fino al terminatore; ogni funzione riceve gli argomenti in a0, a1 e restituisce il risultato in a0.
```
charAt:  add a0,a0,a1 ; lbu a0,0(a0) ; ret

strlen:  li t0,0
sl:      add t1,a0,t0 ; lbu t2,0(t1) ; beqz t2,se ; addi t0,t0,1 ; j sl
se:      mv a0,t0 ; ret

digit:   li t0,48 ; blt a0,t0,no ; li t0,57 ; bgt a0,t0,no ; li a0,1 ; ret
no:      li a0,0 ; ret

strcmp:  lbu t0,0(a0) ; lbu t1,0(a1) ; bne t0,t1,diff ; beqz t0,eq
         addi a0,a0,1 ; addi a1,a1,1 ; j strcmp
eq:      li a0,0 ; ret
diff:    li a0,1 ; ret

strchridx(a0=str, a1=c):
         li t0,0
sc:      add t1,a0,t0 ; lbu t2,0(t1) ; beqz t2,nf ; beq t2,a1,found ; addi t0,t0,1 ; j sc
found:   mv a0,t0 ; ret
nf:      li a0,-1 ; ret

hash (djb2, a0=str):
         li t0,5381
h:       lbu t2,0(a0) ; beqz t2,he ; slli t1,t0,5 ; add t0,t1,t0 ; add t0,t0,t2 ; addi a0,a0,1 ; j h
he:      mv a0,t0 ; ret
```
Lo chiamante: `la a0,str ; jal strlen`. Esempi nel lab: `strcmp("first","second")` -> a0 = 1.

## Lab 6 - procedure, stack (slide)
Il laboratorio mostra la differenza tra procedura foglia, che non chiama altre procedure e non ha bisogno di salvare nulla, e procedura che ne chiama un'altra, che deve preservare `ra` sullo stack.
**MCD (Euclide, solo sottrazioni):**
```
mcd: mcd_while: beq a0,a1,mcd_end
                bge a1,a0,mcd_else ; sub a0,a0,a1 ; j mcd_while
     mcd_else:  sub a1,a1,a0 ; j mcd_while
     mcd_end:   ret
```
Ottimizzata: non usa sp/fp né registri s -> niente salvataggi (procedura foglia). Domande: istruzioni necessarie = 7 (beq, bge, sub, j, sub, j, ret); eseguite per a=24, b=30 [conteggio da fare in RARS].
**MCM(a,b) = a*b / MCD(a,b)** (slide): 
```
mcm: addi sp,sp,-4 ; sw ra,0(sp)
     mul s1,a0,a1 ; jal ra,mcd ; div a0,s1,a0
     lw ra,0(sp) ; addi sp,sp,4 ; ret
```
`ra` va salvato perché `jal mcd` lo sovrascrive. La slide usa `s1` senza salvarlo: per la convenzione il chiamato dovrebbe preservarlo (salvarlo sullo stack) oppure usare un temporaneo `t*` non toccato da mcd (mcd usa solo a0,a1) [mia osservazione]. Senza spilling su memoria è possibile solo parcheggiando `ra` in un registro libero (`mv t1,ra ... mv ra,t1`).

## Lab 8 - circuiti combinatori (CircuitVerse)
Es. 1 half_adder; Es. 2 full_adder (con half adder); Es. 3 ALU_1bit_v0 (AND/OR/SUM, Operation 2 bit); Es. 4 ALU_1bit_v1 (Ainvert, Binvert, Less); Es. 5 ALU_1bit_v2 (bit più significativo: Set, Overflow); Es. 6 ALU_4bit (AND, OR, add, subtract, slt, NOR + Zero + Overflow, controllo 4 bit: 0000, 0001, 0010, 0110, 0111, 1100); Es. 7 "sanity check" con casi numerici (estrarre 2 bit bassi di 1101, 5+3, 5+(-3), -5-3, A=B, NOR) e verifica di slt con overflow. Consegna: file Verilog su Moodle, nomi moduli vincolati (vedi file 05).

## Lab 9 - circuiti sequenziali
SR latch NOR -> D latch -> flip-flop D (fronte salita) -> con reset -> fronte discesa -> registro 8 bit -> register file 8 registri (dettagli file 06).

## Lab 10 - RISC-TO
Completare unità di controllo e register file del processore a 8 bit (dettagli file 07). Programma di prova in assembly e binario nelle slide.

## Cose da saper fare all'esame (pratico)
- Scrivere a mano, senza simulatore, cicli/array/stringhe/procedure in RISC-V corretti.
- Contare le istruzioni eseguite di un ciclo.
- Usare lbu/lb, sb, shift, maschere per manipolare bit e byte.
- Rispettare convenzioni di chiamata e stack.
- Costruire a mano ALU/registri/controllo (se prova logica).
