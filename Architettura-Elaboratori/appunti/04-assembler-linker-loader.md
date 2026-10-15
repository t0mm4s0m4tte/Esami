# 04 - Livello assembly: assemblatore, linker, loader

Fonte: Lezione 03 (Assembler, Linker e Loader), Lab 1 (direttive, RARS).

## Mappa

- [Assembly](#assembly)
- [Assemblatore](#assemblatore)
- [Linker](#linker)
- [ELF (file oggetto UNIX)](#elf-file-oggetto-unix)
- [Loader](#loader)
- [Binding, linking statico/dinamico](#binding-linking-staticodinamico)
- [Layout di memoria (da Lab 1, RARS)](#layout-di-memoria-da-lab-1-rars)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Assembly
Il linguaggio assembly ha una corrispondenza quasi uno-a-uno con le istruzioni dell'ISA, ma offre alcune comodità al programmatore: etichette simboliche, allocazione di variabili, costanti e macro. Per questo bisogna distinguere con attenzione quattro cose diverse che compaiono in un sorgente.

Le **pseudo-istruzioni** sono alias per una o più istruzioni vere e non compaiono come tali nel programma oggetto: tipici esempi sono `li`, `la`, `mv`, `not`, `j`, `ret`, `bgt`, `ble`, `nop`. La `la` è espansa con `auipc` (+ `addi`) [Lab 4; il dettaglio in RARS]. Le **direttive** iniziano con il punto e istruiscono l'assemblatore senza generare istruzioni:
- `.text`: codice;
- `.data`: dati;
- `.globl label`: simbolo globale;
- `.word` (32 bit), `.byte`, `.string`: allocazione di dati;
- `.eqv NOME VALORE`: costante.

Una **macro** è un nome dato a una sequenza di istruzioni; richiede un header (il nome), un corpo e una direttiva di fine definizione. L'esempio della slide è lo scambio di due registri con un terzo di appoggio. Non va confusa con una procedura: la macro è espansa in linea dall'assemblatore (nessun jal/ret), mentre la procedura è un unico codice che viene chiamato.

## Assemblatore
L'assemblatore traduce (non interpreta) il sorgente assembly in un **modulo oggetto**, controllando la sintassi. La difficoltà principale è la **forward reference**: un'etichetta usata prima di essere definita, di cui a quel punto non si conosce ancora l'indirizzo (la backward reference, al contrario, è già nota). Per risolvere il problema l'assemblatore lavora in due passi.

Nel primo passo scandisce il programma, individua tutte le etichette e costruisce la **Symbol Table**, che associa a ogni simbolo un valore pari alla posizione relativa. Per sapere a che indirizzo si trova ogni istruzione usa l'**ILC** (Instruction Location Counter), che tiene l'indirizzo della prossima istruzione e avanza di 4 per ogni istruzione RISC-V a 32 bit. Nel secondo passo traduce mnemonici, operandi ed etichette nei codici numerici, consultando la Symbol Table e la tabella degli opcode.

Esempio della slide: etichette `is_sorted`, `.L18` (0x432?), `.L20`... con ILC. Es. `0x43a: bgt a2,a3,0x28`.

## Linker
Un programma reale è formato da più moduli tradotti separatamente, e ciascun modulo ha un proprio spazio di indirizzi. Il compito del linker è fonderli in un unico **eseguibile**, sistemando gli indirizzi in modo che i riferimenti tra moduli diventino corretti. Opera in quattro mosse:
1. costruisce una tabella dei moduli e delle loro lunghezze;
2. assegna un indirizzo di inizio a ciascun modulo;
3. aggiunge a ogni indirizzo di memoria una **relocation constant** (= indirizzo di partenza del modulo);
4. aggiorna le istruzioni che riferiscono altri moduli con l'indirizzo corretto (riferimenti esterni).

**Esempio svolto (slide)**: procedure A e B in due moduli, con il risultato che A sta a 0x400000 e B a 0x400100. `jal` usa indirizzamento relativo al PC, quindi la `jal` da A a B vale 0x400100 - 0x400004 = 252 dec, mentre la `jal` da B ad A vale 0x400000 - 0x400104 = -260 dec. La procedura di calcolo è:
1. si ricavano le lunghezze dei moduli;
2. si fissa la base di ciascuno;
3. per ogni jal/dato si ricalcola offset = indirizzo_dest - indirizzo_istruzione (per il PC-relative) oppure base_dati + offset (gp-relative).

Nell'esempio l'indirizzo di Y viene aggiornato rispetto al registro `gp` (x3), con valore indicato sulla slide come "0000 0000 1000 0000" esa [DA VERIFICARE quante cifre/valore]. Non ricostruibile dal testo estratto.

## ELF (file oggetto UNIX)
Il file oggetto in formato ELF è organizzato in sezioni:
- **object file header**: dimensione e posizione delle altre parti;
- **text segment**: codice macchina;
- **static data segment**: dati statici/dinamici;
- **relocation information**: istruzioni e dati che dipendono da indirizzi assoluti;
- **symbol table**: etichette non risolte, per esempio riferimenti a moduli esterni;
- informazioni di debugging.

Su Windows il formato equivalente è PE.

## Loader
Al momento dell'esecuzione il sistema operativo carica l'eseguibile dal disco in memoria. I passi del loader sono:
1. legge l'intestazione per le dimensioni di programma e dati;
2. riserva spazio sufficiente;
3. copia programma e dati;
4. copia sullo stack i parametri di `main`;
5. inizializza registri e stack pointer;
6. salta a una routine che copia i parametri dallo stack ai registri e chiama `main`.

## Binding, linking statico/dinamico
Il **binding time** è il momento in cui i nomi simbolici vengono legati agli indirizzi fisici, e può cadere in fasi diverse: scrittura, traduzione, link, load oppure esecuzione (con un registro base). Un programma già linkato che viene spostato in memoria ha indirizzi sbagliati, da cui la necessità di una rilocazione dinamica tramite registro base.

Anche il modo di collegare le librerie cambia il momento del binding. Nel **linking statico** le librerie diventano parte dell'eseguibile: i binari sono grandi e la versione della libreria resta "congelata". Nel **linking dinamico (DLL)** le funzioni di libreria sono collegate a runtime. Nella variante **lazy** la funzione è caricata solo alla prima chiamata: questa passa per un *dummy* con un salto indiretto verso il linker/loader dinamico, che trova la funzione, la mappa e aggiorna l'indirizzo nel salto indiretto, così che le chiamate successive saltino direttamente.

## Layout di memoria (da Lab 1, RARS)
Gli indirizzi seguono una convenzione software: il testo sta in basso (RARS: 0x00400000), i dati statici più sopra (0x10010000) e lo stack in alto, crescendo verso il basso (compact: 0x7FFFEFFC per sp).

## Cose da saper fare all'esame
- Spiegare perché servono due passi e costruire la symbol table di un breve programma (con ILC a +4).
- Elencare i compiti di assemblatore, linker, loader e cosa contiene un file oggetto.
- Calcolare gli indirizzi aggiornati dopo il linking e gli offset dei jal.
- Spiegare differenza statico/dinamico e lazy.
- Distinguere pseudo-istruzione/istruzione/direttiva/macro.

## Dubbi
- Valori numerici esatti dell'esempio di linking (dimensioni dei moduli, gp) leggibili solo da figure: [DA VERIFICARE sulle slide originali].
