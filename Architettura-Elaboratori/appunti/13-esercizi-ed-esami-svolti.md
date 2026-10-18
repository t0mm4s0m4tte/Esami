# 13 - Esercizi, esempi di codice e verifica in RARS
Fonte: Moodle di Architettura degli Elaboratori, corso B (I. Drago), cartella scaricata in `_moodle-raw/Architettura-Elaboratori`. I quiz Moodle non sono scaricati (solo i file).

Nel Moodle di questa materia **non ci sono esami passati, simulazioni né eserciziari con soluzioni del docente**. Ci sono le slide dei laboratori 1-6 e 8-10 (versioni 2.0/3.0: gli stessi esercizi del Drive già integrati nel file 11), la mappa di lettura sul libro, le slide introduttive con la struttura dell'esame, sette PDF di teoria (già integrati dai file 02-10), il simulatore `rars.jar`, due archivi di esempi di codice assembly sulla **ricorsione** (il Lab 7, che nel Drive mancava), e un progetto CircuitVerse per i Lab 9-10. Il contributo di questo file è triplice: ricavare la struttura dell'esame, **eseguire davvero in RARS le soluzioni del file 11** (finora "non testate") correggendo ciò che non funzionava, e documentare gli esempi di ricorsione. Tutti i risultati qui sotto sono stati ottenuti con il `rars.jar` fornito (RARS 2003-2019, RV32, opzione `ic` per contare le istruzioni eseguite); le soluzioni che non sono del docente sono mie e le indico con [INT].

## Mappa

- [1. Come è fatto l'esame](#1-come-è-fatto-lesame)
- [2. Le soluzioni dei Lab 1-6 eseguite in RARS](#2-le-soluzioni-dei-lab-1-6-eseguite-in-rars)
- [3. Il Lab 7: ricorsione, gli esempi del docente](#3-il-lab-7-ricorsione-gli-esempi-del-docente)
- [4. Il progetto CircuitVerse dei Lab 8-10](#4-il-progetto-circuitverse-dei-lab-8-10)
- [5. Errori e imprecisioni nei materiali](#5-errori-e-imprecisioni-nei-materiali)
- [Cosa resta da integrare](#cosa-resta-da-integrare)
- [Dubbi](#dubbi)

## 1. Come è fatto l'esame

Teoria: [01 - Introduzione](01-introduzione-livelli-prestazioni.md), [12 - Cose da saper fare](12-cose-da-saper-fare-e-dubbi.md).

Le slide `introduzione-corso-B.pdf` contengono lo schema dell'esame, che finora le note davano come ignoto ("scritto + probabile orale"). Dal testo estratto (lo schema è un diagramma di flusso, quindi l'estrazione è frammentata e va riletta sul PDF) risulta una prova in **tre parti**, con iscrizione unica all'appello. La prima, E1 (primo esonero), è un test **a risposta multipla** con punteggio da 0 a 8: servono almeno 4 punti per proseguire. La seconda, E2 (secondo esonero), consiste negli **esercizi di laboratorio** e vale da 0 a 10: serve E2 ≥ 5 *e* almeno un punto in ogni esercizio. La terza, O, è l'**orale**, un colloquio su tutti gli argomenti, che vale da 0 a 14. Sommando i massimi (8 + 10 + 14) si arriva a 32, coerente con il 30 e lode. Il diagramma contiene anche condizioni sull'orale ("sufficiente", "ritirato") che l'estrazione non permette di ricostruire. Il Lab 10 aggiunge, già nelle note, che il progetto RISC-TO "potrà essere argomento dell'esame orale". [DA VERIFICARE sul PDF: ordine delle prove, condizioni esatte di passaggio e come si combinano i punteggi; per i corsi da 6 o 9 CFU la tabella rimanda a un "contattare il docente".]

Altre regole delle stesse slide: il corso B è per i cognomi E-O e non sono permessi passaggi di corso; la valutazione del corso va compilata prima di potersi iscrivere all'esame; il voto va accettato entro 5 giorni; il libro di testo (Patterson-Hennessy, 2a ed.) non è sostituito dalle slide. La `ReadingMap.pdf` dice cosa leggere sul libro: capitolo 2 (da 2.1 a 2.10, 2.12, 2.13, 2.15), capitolo 3 (3.1 e 3.2) e l'appendice A per i sistemi digitali; capitolo 4 (da 4.1 a 4.4) e le appendici B.1-B.2 per il processore; capitolo 5 (da 5.1 a 5.4) per la gerarchia di memoria; per I/O ed eccezioni le sezioni 1.4, 4.9, 5.2, 5.11, 5.14 e 6.9.

## 2. Le soluzioni dei Lab 1-6 eseguite in RARS

Teoria: [02 - ISA RISC-V](02-isa-riscv.md), [03 - Salti e decisioni](03-decisioni-procedure-stack.md#salti-e-decisioni), [03 - Procedure](03-decisioni-procedure-stack.md#procedure), [03 - Stack e convenzioni](03-decisioni-procedure-stack.md#stack-e-convenzioni-di-chiamata), [11 - Laboratorio](11-laboratorio-esercizi-svolti.md).

Ho incorniciato ogni soluzione del file 11 in un piccolo programma (dati, registri iniziali, frammento, stampa del risultato con `ecall`) e l'ho eseguito, contando le istruzioni con `ic` e sottraendo quelle del contorno. La tabella riporta il valore di prova, il risultato ottenuto e le istruzioni eseguite dal solo frammento. I risultati coincidono con quelli attesi dalle slide e dalle note tranne dove indicato sotto la tabella.

| Esercizio | Prova | Risultato in RARS | Istruzioni eseguite |
|---|---|---|---|
| Lab 1 Es. 1 somma 41+43+47 | - | x28 = 131 | 5 |
| Lab 1 Es. 2 `add` | x5 = 0x80000000, x6 = 0xD0000000 | x30 = 0x50000000 (overflow) | 1 |
| Lab 1 Es. 2 `sub` | idem | x30 = 0xB0000000 (nessun overflow) | 1 |
| Lab 1 Es. 2 due `add` | idem | x30 = 0xD0000000 (overflow nel primo) | 2 |
| Lab 2 Es. 1 | x5 = 0xAAAAAAAA, x6 = 0x12345678 | x7 = 0xBABEFEF8, x28 = 0x23456780, x29 = 0x55 | 5 |
| Lab 2 Es. 2 media di due pari | 10 e 20; -10 e -20 | 15; -15 | 2 |
| Lab 2 Es. 3 / Lab 4 Es. 1 media di 4 | 10, 20, 30, 41 | 25 (101/4 per difetto) | 12 |
| Lab 2 Es. 4 somma di quadrati | 3 e 4 | 25 | 9 |
| Lab 2 Es. 5 con segno / senza segno | byte 130, 150, 200 | -288 e 480 | 16 |
| Lab 2 Es. 6 byte di 0x12345678 | - | 0x78, 0x56, 0x34, 0x12 | 31 |
| Lab 2 Es. 7 bit 2-3 → 6-7 | x5 = 0, x6 = 0xFFFFFFFF; x5 = 0xC, x6 = 0 | 0xFFFFFF3F; 0x000000C0 | 4 |
| Lab 2 Es. 7 variante bit 11-16 → 26-31 | x5 = 0x1F800, x6 = 0xFFFF | 0xFC00FFFF | 6 |
| Lab 3 Es. 1 frammento 1 | (x,y) = (2,1); (1,3) | (1,0); (0,2) | 3; 4 |
| Lab 3 Es. 1 frammento 2 | (x,y) = (1,2); (5,2) | (2,2); (5,3) | 5; 4 |
| Lab 3 Es. 2 max | 2, 9, 5; 2, 3, 5 | 9; 5 | 5 |
| Lab 3 Es. 3 Fibonacci | N = 8; 1; 0 | R = 34; 1; 1 | 52; 10; 4 |
| Lab 3 Es. 4 somma dei quadrati | N = 10 | 385 | 53 |
| Lab 3 Es. 5 contauno | t0 = 37; 0xF0F0; 0; -1 | 3; 8; 0; 32 | sempre 162 |
| Lab 3 Es. 6 cicli annidati | (a,b,R) = (3,2,1); (10,5,0) | 103; -138547343 (overflow) | 53; 352 |
| Lab 4 Es. 2 max di tre in memoria | 4, 11, 7 | 11 | 11 |
| Lab 4 Es. 3 somma array | 3, 9, -2, 7, 4 | 21 | 40 |
| Lab 4 Es. 4 max array | idem | 9 | 37 |
| Lab 4 Es. 5 dispari (byte) | 1, 2, 3, 4, 5, 7 | 4 | 52 |
| Lab 4 Es. 6 sorted | 1, 2, 2, 5, 9; 3, 9, -2, 7, 4 | 1; 0 | 39; 23 |
| Lab 4 Es. 7 invert | 3, 9, -2, 7, 4 | 4, 7, -2, 9, 3 | 31 |
| Lab 4 Es. 8 bubble sort | idem | -2, 3, 4, 7, 9 | 125 |

Il risultato negativo del Lab 3 Es. 6 con (10, 5, 0) è corretto: `R = 2R + i + j` raddoppia a ogni iterazione e dopo 50 iterazioni supera i 32 bit; ho ricalcolato in Python lo stesso valore ridotto a 32 bit con segno (-138547343).

Per il Lab 5 le sei funzioni sono corrette: `charAt("hello", 3)` restituisce 108 (la 'l'), `strlen("first")` 5 e `strlen("")` 0, `digit` dà 1 per '7' e 0 per 'a', per '/' (47) e per ':' (58), cioè i due caratteri adiacenti all'intervallo, `strcmp("first","second")` 1 (come atteso dalla slide), `strcmp("abc","abc")` 0, `strcmp("abc","abd")` 1, `strcmp("ab","abc")` 1, `strchridx("hello",'l')` 2 e con 'z' -1, `hash("hello")` 261238937 (calcolato anche in Python con la ricorrenza `h = 33*h + c`, partendo da 5381) e `hash("")` 5381. Le istruzioni eseguite dipendono dalla lunghezza della stringa e non sono riportate.

Per il Lab 6, `mcd(24,30)` restituisce 6 con **18 istruzioni eseguite** (comprese il `beq` finale e il `ret`; ricalcolate a mano: quattro iterazioni da 4 istruzioni, più `beq` e `ret`), e `mcd(30,24)` ne esegue le stesse 18; `mcd(7,7)` ne esegue 2; `mcd(12,9)` restituisce 3 con 14 istruzioni. Il numero di istruzioni *necessarie* è 7 (`beq`, `bge`, `sub`, `j`, `sub`, `j`, `ret`). `mcm(24,30)` restituisce 120 e `mcm(12,9)`, il caso richiesto dalla slide, restituisce 36 eseguendo **22 istruzioni** (14 di `mcd` più 8 di `mcm`: `addi`, `sw`, `mul`, `jal`, `div`, `lw`, `addi`, `ret`); le istruzioni necessarie per `mcm` sono 8.

### Cosa non torna

La verifica ha fatto emergere quattro punti da correggere nelle note. Il primo è un errore vero: nel Lab 3 Es. 2 (max) il file 11 usa le etichette **`s1` e `s2`**, che sono nomi di registri (`s1` = x9, `s2` = x18); RARS risponde `"s1": operand is of incorrect type` e il programma non si assembla. Con etichette diverse (`L1`, `L2`) il frammento funziona e dà 9 e 5. Il secondo riguarda il Lab 6: la riga `mcd: mcd_while: beq ...` con due etichette sulla stessa riga, come nelle note, non è accettata da RARS (non assembla: `"mcd_while" is not a recognized operator`); basta andare a capo. Il terzo è una conferma importante per l'esame: la `mcm` della slide usa `s1` per salvare `a*b` senza salvarlo e ripristinarlo, e infatti, partendo con `s1 = 777`, dopo `mcm(4,6)` il registro vale 24: **la procedura viola la convenzione dei registri salvati dal chiamato** (la slide chiede "è possibile farlo senza riversare i registri in memoria?"; la risposta è usare un temporaneo `t*` che `mcd` non tocca, oppure salvare `s1` sullo stack). Il quarto riguarda Fibonacci: il frammento del Lab 3 imposta `R = 1` prima del ciclo, quindi per N = 0 e N = 1 restituisce 1 e per N = 8 restituisce 34: calcola il (N+1)-esimo termine della successione 1, 1, 2, 3, 5, ... e non il termine N della sequenza che parte da 0; non è un errore, ma conviene saperlo se l'esame chiede "cosa restituisce per N = ...".

Altre osservazioni sui conteggi: la domanda "istruzioni eseguite con N = 8" ha risposta 52 se si contano solo ciclo e inizializzazioni (come nel file 11) e 53 se si include il `li t0,8`; analogamente 162 per contauno e 352 per i cicli annidati sono conteggi **del frammento** senza il caricamento delle variabili di ingresso. Il contauno con il test in coda, come nel file 11, esegue sempre 162 istruzioni qualunque sia `t0`, mentre una versione che si ferma quando il registro diventa 0 ne esegue meno per i numeri piccoli.

Un'ultima nota di ambiente: il Lab 4 chiede "soltanto il set rv64i" mentre il Lab 2 per lo stesso esercizio dice "rv32i"; le istruzioni usate (`lw`, `add`, `srai`) esistono in entrambe, e il `rars.jar` fornito parte in modalità RV32 (l'opzione `rv64` è esplicita).

## 3. Il Lab 7: ricorsione, gli esempi del docente

Teoria: [03 - Ricorsione](03-decisioni-procedure-stack.md#ricorsione-snippet-fib-dalla-lezione-9), [03 - Stack e convenzioni](03-decisioni-procedure-stack.md#stack-e-convenzioni-di-chiamata), [04 - Assembler, linker, loader](04-assembler-linker-loader.md).

I due archivi `code_examples_1.zip` e `code_examples_2.zip` contengono tre programmi (`factorial`, `triangle`, `prime`), ciascuno scritto due volte: in C e in assembly RISC-V per l'assemblatore GNU, più una piccola libreria di supporto (`support.c` e `support.S`) che fornisce `__num_print`, la stampa di un intero in decimale tramite la chiamata di sistema `write` (numero 64), e uno script `assembler.sh` che compila con `riscv64-linux-gnu-gcc -march=rv32im -mabi=ilp32 -static -nostartfiles -nostdlib` ed esegue con `qemu-riscv32`. Sono la parte "assembler, linker e loader" della teoria: si vede un programma completo, con punto di ingresso `_start`, sezioni `.text`, `.rodata` e `.data`, e uscita con la chiamata di sistema 93. Il mio ambiente non ha la toolchain né QEMU, quindi li ho adattati a RARS (tabella sotto) e li ho eseguiti lì: i risultati sono quelli attesi dal codice C.

**Fattoriale** (`factorial.S`). Il `_start` salva `ra`, `s0` e `s1`, carica n = 5 in `s1`, chiama `fact`, tiene il risultato in una variabile locale sullo stack e lo stampa insieme a n. La procedura ricorsiva `fact` alloca ogni volta un frame di 12 byte e vi salva, nell'ordine, `a0` (cioè n) a offset 8, `ra` a offset 4 e il vecchio frame pointer a offset 0, quindi aggiorna `fp`. Se n è 0 restituisce 1 (`addi a0, zero, 1` e salto alla chiusura); altrimenti decrementa `a0`, chiama `fact`, **ricarica n dallo stack** (`lw t0, 8(sp)`, necessario perché `a0` contiene ora il risultato della chiamata interna) e moltiplica (`mul a0, a0, t0`). La lezione da ricordare è che ciò che serve *dopo* la chiamata ricorsiva va salvato prima nel frame: qui n e `ra`. In RARS il programma stampa `5` e `120`, eseguendo 233 istruzioni; con n = 10 stampa 3628800 e ne esegue 353, cioè 24 istruzioni per ogni livello di ricorsione in più. Per n = 5 lo stack arriva a 6 frame da 12 byte, 72 byte in totale, più quello del `_start`.

**Triangolo** (`triangle.S`). Calcola l'area di un triangolo di base 20 e altezza 23 come `moltiplicazione(base, altezza) / 2`, dove la moltiplicazione è fatta per somme ripetute. Contiene due coppie di procedure per confrontare l'impatto delle convenzioni: `area` e `multiplication` costruiscono un frame completo (salvando `ra`, `s0`, `s1`, `s2` e i parametri), mentre `area_opt` e `multiplication_opt` sono ottimizzate: `multiplication_opt` è una procedura **foglia** e non salva nulla, usando solo registri temporanei, e `area_opt` salva soltanto `ra` perché chiama un'altra procedura. Il `_start` chiama la versione non ottimizzata; il risultato in RARS è `20`, `23`, `230` con 356 istruzioni eseguite. Sostituendo la chiamata con `area_opt` il risultato è identico e le istruzioni scendono a **337** (19 in meno), un buon esempio della differenza fra procedura foglia e non foglia. Due osservazioni critiche: in `multiplication` il registro `s0` viene prima impostato come frame pointer e subito dopo sovrascritto con `a`, quindi il commento "frame pointer" è fuorviante (il ripristino finale resta corretto); e la moltiplicazione per somme ripetute restituisce `a` anche quando `b ≤ 0`, perché parte da `result = a` con il ciclo da 1 a `b-1` (come il C), quindi è corretta solo per `b ≥ 1`. Anche `srli a0, a0, 1` per dividere per 2 è valido solo per aree non negative.

**Primi** (`prime.S`). `isprime` è una procedura foglia (usa solo registri temporanei) che prova tutti i divisori da 2 a n-1 con `rem`; `allprime` scorre un array e usa `jal` per chiamare `isprime`, salvando `ra` e `s1`-`s3` sullo stack. Con l'array {2, 3, 5, 7, 11} stampa `1` (tutti primi) con 251 istruzioni. Il test arriva fino a n-1 e non a √n, quindi è corretto ma non efficiente.

Le differenze fra l'assemblatore GNU dei file del docente e RARS, che servono se si vuole rifare l'esperimento:

| GNU as (nei file del docente) | RARS | Cosa fare |
|---|---|---|
| `#include "support.S"` | non esiste | accodare il contenuto di `support.S` dopo il programma |
| `.equ NOME, valore` | avviso "direttiva non riconosciuta, ignorata" | scrivere `.eqv NOME valore` |
| `.section .text`, `.section .rodata` | errore ("deve essere seguita da un nome di sezione") | usare `.text` e `.data` |
| etichette numeriche `1:`, `1f`, `1b` | errore ("Invalid language element: 1b") | dare nomi alle etichette |
| `move rd, rs` | [non provata: io l'ho sostituita con `mv`] | usare `mv rd, rs` |
| esecuzione da `_start` | RARS parte dalla prima istruzione di `.text` ("Instruction load access error" se la prima è una procedura) | mettere il programma prima della libreria, oppure `.globl main` accanto a `_start` e opzione `sm` |
| `ecall` 64 (`write`) e 93 (`exit`) | funzionano | nessuna modifica |

Il frammento `fib` ricorsivo del file 03 è anch'esso verificato: `fib(0)=0`, `fib(1)=1`, `fib(2)=1`, `fib(7)=13` e `fib(10)=55`, con 8, 10, 29, 414 e 1790 istruzioni eseguite, comprese quelle del contorno. Il numero di istruzioni cresce come il numero di chiamate (esponenziale), a differenza del fattoriale (lineare), che è il motivo per cui il Fibonacci ricorsivo è un esempio di ricorsione "inefficiente".

## 4. Il progetto CircuitVerse dei Lab 8-10

Teoria: [05 - Logica digitale e ALU](05-logica-digitale-alu.md), [06 - Reti sequenziali e memorie](06-reti-sequenziali-memorie.md), [07 - Processore](07-processore-datapath-controller.md).

Il file `ArchElab_RISC-TO_Labs_9_10.cv` è un progetto CircuitVerse (JSON) che contiene, con questi nomi, i circuiti della sequenza di laboratorio: `half_adder`, `full_adder`, `ALU_1bit_v0`, `ALU_1bit_v1`, `ALU_1bit_v2`, `ALU_4bit` (Lab 8), `latch_SR`, `latch_D`, `flipflop_D_rising`, `flipflop_D_falling`, `8bit-register`, `8x8_register_file` (Lab 9), e per il processore RISC-TO (Lab 10) `instruction_memory`, `r-type`, `load`, `store`, `branch`, `control_unit`, `ALU_8bit`, `ALU_control`, `imm_gen` e il circuito principale `RISC-TO`. Ho letto solo l'elenco dei circuiti: i collegamenti interni non sono stati ricostruiti e non l'ho aperto in CircuitVerse, quindi non posso dire se contenga le soluzioni complete o solo gli scheletri da completare.

## 5. Errori e imprecisioni nei materiali

| Dove | Problema | Verifica | Correzione |
|---|---|---|---|
| file 11, Lab 3 Es. 2 | etichette `s1`, `s2` sono nomi di registri | RARS: operando di tipo errato | usare altre etichette |
| file 11, Lab 6 `mcd` | due etichette su una riga | non assembla in RARS | una per riga |
| slide Lab 6 `mcm` | `s1` usato senza salvarlo | `s1` passa da 777 a 24 | temporaneo `t*` oppure salvare `s1` |
| slide Lab 3 Es. 3 | `R = 1` iniziale | N = 0 e N = 1 danno 1; N = 8 dà 34 | sapere che calcola il termine N+1 |
| slide Lab 4 Es. 8 (bubble) | `for (i < size)` accede a `array[size]`; `chance` invece di `change` | già segnalato nel file 11; la mia versione con `size - 1` ordina correttamente | limite `size - 1` |
| slide Lab 4 (esempio) | `lw t1, 1(t0)` con offset non allineato | non provato in RARS | offset multipli di 4 [DA VERIFICARE] |
| `triangle.S` | `s0` frame pointer sovrascritto; corretto solo per `b ≥ 1` | letto, non è un errore di risultato | commento fuorviante |

## Cosa resta da integrare

- **I quiz Moodle** (E1 è a risposta multipla) non sono nel materiale scaricato: non so che domande contengano.
- **Esami passati e simulazioni**: non ce ne sono nel Moodle. Il README segnala la mancanza.
- **Le slide di teoria** del Moodle (`05_gerarchia-memorie-cache`, `06_bus_01`, `IO`, `Il Processore RISC-V` parte 1 e 2, `assembler-linker-loader`, `logica-digitale-v1.3`, `logica-digitale-reti-sequenziali`, `RISC-V_ISA` parte 1 e 2) sono già integrate nei file 02-10 a partire dal Drive e **non le ho rilette** qui: non ho confrontato le versioni, che potrebbero differire.
- **Le slide dei Lab 8, 9 e 10** non sono state rilette: il contenuto è già nei file 05-07 e 11. Il progetto `.cv` è stato solo elencato (§4).
- **Lo schema dell'esame** della §1 è estratto da un diagramma e va controllato sul PDF.
- **Esercizi assembly senza soluzione nel Moodle** (Lab 3 Es. 5 e 6, Lab 4 Es. 2-8, Lab 5): le soluzioni sono mie [INT] e verificate in RARS, non del docente.

## Dubbi

- [DA VERIFICARE] Struttura dell'esame (E1, E2, O) e condizioni di passaggio, sul PDF `introduzione-corso-B.pdf` (figura).
- [DA VERIFICARE] Se all'esame di laboratorio (E2) il simulatore sia RARS standard o il fork di Drago indicato dal Lab 1.
- [INT] Tutti i conteggi di istruzioni "eseguite" dipendono dalla soluzione scelta e dal contorno; quelli della tabella sono per le soluzioni del file 11.
