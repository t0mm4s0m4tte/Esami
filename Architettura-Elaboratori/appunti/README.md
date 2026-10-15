# Architettura degli Elaboratori - Appunti d'esame

UniTO Informatica, 6 CFU (Teoria 4 + Lab 2), corso B (Drago), a.a. 2024/25 - appello **2027-02-01**.
Testo: Patterson-Hennessy, *Struttura e progetto dei calcolatori - Progettare con RISC-V*, 2a ed.
Fonti: Drive > "Architettura degli Elaboratori" > PDF > "Slide Deck - Teoria" (Lez. 00-10) e "Slide Deck - Laboratorio" (Lab 1-6, 8-10). Programma: doc "Argomenti dei Corsi - I Anno".

Convenzioni: `[DA VERIFICARE]` = dato ambiguo, perso nell'estrazione o non presente nelle slide; `[libro]` = conoscenza standard del testo non presente nelle slide estratte; "mie" = soluzioni scritte per queste note, non testate in RARS.

## Indice
| File | Contenuto | Sorgente |
|---|---|---|
| [01-introduzione-livelli-prestazioni.md](01-introduzione-livelli-prestazioni.md) | Corso/esame, livelli di macchina virtuale, Von Neumann, fetch-decode-execute, prestazioni | Lez. 00-01 |
| [02-isa-riscv.md](02-isa-riscv.md) | Registri, memoria, aritmetiche, load/store, endian, logiche, formati R/I/S/SB e codifica | Lez. 02, Lab 1-2 |
| [03-decisioni-procedure-stack.md](03-decisioni-procedure-stack.md) | Branch, cicli, jal/jalr, stack, convenzioni, ricorsione, stringhe | Lab 3, 5, 6; Lez. 09 |
| [04-assembler-linker-loader.md](04-assembler-linker-loader.md) | Pseudo-istruzioni, direttive, macro, due passi, linker, ELF, loader, DLL | Lez. 03 |
| [05-logica-digitale-alu.md](05-logica-digitale-alu.md) | Boole, decoder, mux, addizionatori, ALU (sub, NOR, slt, overflow, zero) | Lez. 04, Lab 8 |
| [06-reti-sequenziali-memorie.md](06-reti-sequenziali-memorie.md) | Latch SR/D, flip-flop, registri, register file, RAM/ROM | Lez. 05, Lab 9 |
| [07-processore-datapath-controller.md](07-processore-datapath-controller.md) | Datapath a ciclo singolo, controllo ALU e principale, RISC-TO | Lez. 06-07, Lab 10 |
| [08-bus.md](08-bus.md) | Bus sincrono/asincrono, arbitraggio, bus seriali | Lez. 08 |
| [09-memoria-cache.md](09-memoria-cache.md) | Gerarchia, località, cache diretta/associativa/set-associativa | Lez. 09 |
| [10-io-interrupt-eccezioni.md](10-io-interrupt-eccezioni.md) | Polling, interrupt, trap, DMA, eccezioni RISC-V | Lez. 10 |
| [11-laboratorio-esercizi-svolti.md](11-laboratorio-esercizi-svolti.md) | RARS e tutti gli esercizi di lab con soluzioni | Lab 1-6, 8-10 |
| [12-cose-da-saper-fare-e-dubbi.md](12-cose-da-saper-fare-e-dubbi.md) | Checklist esame, esercizi tipo, lacune, dubbi per il tutor | tutto |

## Percorso di studio consigliato
02 -> 03 -> 11 (ISA e programmazione assembly) -> 05 -> 06 -> 07 (hardware) -> 09 -> 08 -> 10 -> 04 -> 01 -> 12.

## Programma ufficiale (dal doc "Argomenti dei Corsi - I Anno")
Teoria: ISA RISC-V parte 1 e 2; Assembler, Linker e Loader; Logica digitale (combinatori e sequenziali); Processore RISC-V (Datapath e Controller); Il Bus; Gerarchia della memoria e cache; IO.
Laboratorio: Lab 1 RARS e istruzioni aritmetiche; 2 operazioni logiche; 3 decisioni; 4 operandi in memoria e array; 5 stringhe e procedure; 6 procedure annidate; 7 ricorsione; 8 ALU a 4 bit; 9 register file/sequenziali; 10 processore "RISC-TO".
