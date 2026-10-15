# 10 - Input/Output, interrupt, eccezioni

Fonte: Lezione 10 (IO).

## Mappa

Il capitolo parte da come la CPU parla con le periferiche (controllori e registri di I/O, memory mapped o isolated), passa ai tre modi di gestire il trasferimento (polling con busy waiting, interrupt, DMA), distingue interrupt asincroni e trap sincrone, e chiude con il meccanismo di eccezione di RISC-V (CSR, SEPC, SCAUSE, STVEC, ecc.).

- [Comunicazione CPU - dispositivi](#comunicazione-cpu---dispositivi)
- [Tre modi di I/O](#tre-modi-di-io)
- [Eccezioni in RISC-V (materiale aggiuntivo, slide da Giorgi)](#eccezioni-in-risc-v-materiale-aggiuntivo-slide-da-giorgi)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Comunicazione CPU - dispositivi
La CPU non pilota direttamente una periferica: tra i due sta un **controllore**, che traduce i comandi della CPU in segnali comprensibili alla periferica e, al contrario, i segnali della periferica in dati utilizzabili dalla CPU. L'intuizione è che per la CPU ogni dispositivo si riduce a un piccolo insieme di **registri** (di dati, di comando, di stato), ciascuno con un proprio indirizzo: leggere e scrivere quei registri è il modo di "parlare" col dispositivo.
Resta da decidere dove vivono quegli indirizzi. Nel **memory-mapped I/O** appartengono allo stesso spazio di indirizzi della memoria, per cui si accede ai registri con le normali `lw`/`sw` e non servono istruzioni dedicate. Nell'**isolated I/O** esiste invece uno spazio di indirizzi separato, riservato ai dispositivi. Esempi tipici sono la tastiera (un registro di stato con un bit *ready* e un registro buffer con il codice ASCII del tasto), il display e la stampante.

## Tre modi di I/O
Il problema di fondo è la differenza di velocità: le periferiche sono lentissime rispetto alla CPU, e i tre modi di gestire l'I/O sono tre risposte via via più raffinate a come non sprecare tempo di CPU: l'**I/O programmato con busy waiting**, l'**I/O controllato da interrupt** e il **DMA** (Direct Memory Access).

### I/O programmato (polling)
È la soluzione più ingenua: la CPU esegue un ciclo in cui controlla ripetutamente il bit READY del registro di stato, finché il dispositivo non è pronto. Il difetto è il **busy waiting**: la CPU resta occupata a fare domande a vuoto invece di lavorare.
Per la lettura da tastiera:
1. quando viene premuto un tasto il controller mette a 1 il bit di stato e inserisce l'ASCII nel buffer;
2. la CPU intanto legge lo stato in un ciclo;
3. quando lo trova a 1 legge il buffer, elabora il carattere e azzera il bit.

Per la scrittura su display la logica è speculare: la CPU attende Ready=1 e scrive il carattere nel display buffer; il controller azzera Ready, visualizza il carattere e infine rimette Ready=1.

### Interrupt
Per evitare l'attesa attiva si capovolge l'iniziativa: è il dispositivo, a lavoro finito, a segnalare alla CPU con un **interrupt**, che la CPU può abilitare o disabilitare tramite un bit. Gli interrupt viaggiano quindi **dai dispositivi alla CPU**, sono **asincroni** rispetto al programma (possono arrivare in qualunque istante) e devono essere gestiti in modo **trasparente**: dopo la gestione lo stato del programma interrotto deve essere identico a quello di prima, come se nulla fosse successo.
La gestione si divide tra hardware e software. Dal lato **hardware**:
1. il controller attiva la linea di interrupt del bus;
2. quando la CPU è pronta risponde con un ack;
3. il controller invia sulle linee dati il **vettore di interrupt**;
4. la CPU lo salva, impila il PC e i registri di stato, usa il vettore come indice per trovare il PC del gestore e modifica di conseguenza il PC (a volte disabilitando altre interruzioni).

Dal lato **software**, il gestore:
1. salva tutti i registri;
2. legge il buffer del dispositivo, gestisce eventuali errori e aggiorna le variabili (nell'esempio di stampa di una riga carattere per carattere si aggiornano ptr e count e, se restano caratteri, se ne copia un altro nel buffer);
3. invia l'ack di fine;
4. ripristina i registri ed esegue l'istruzione di ritorno (RETI nel modello generico, **SRET** in RISC-V).
Quando più dispositivi possono interrompere, o il gestore disabilita le interruzioni mentre lavora, oppure si usano le **priorità**, che crescono con la criticità del dispositivo; gli interrupt possono essere mascherabili o non mascherabili. Se la CPU non supporta le priorità, un chip dedicato può gestirle al posto suo.

### Trap (eccezioni sincrone)
Le trap sono chiamate automatiche a procedure causate da condizioni eccezionali o da istruzioni apposite (i servizi del sistema operativo). A differenza degli interrupt sono **sincrone** al programma, cioè nascono dall'istruzione che si sta eseguendo, e il gestore ha un indirizzo in una locazione fissa. L'esempio classico è l'overflow: senza trap il programmatore dovrebbe testare un registro dopo ogni operazione a rischio, aggiungendo molte istruzioni ISA; con la trap l'hardware controlla a fine istruzione aritmetica e salta da solo al gestore.

### DMA
Il DMA è in sostanza I/O programmato eseguito da un componente con accesso diretto al bus, così la CPU non deve occuparsi di ogni singolo dato. Il software (il SO) lo inizializza scrivendo i suoi registri (indirizzo, quantità di dati, direzione del trasferimento); CPU e DMA si contendono poi il bus, e la contesa si risolve con l'arbitraggio. Durante il trasferimento la CPU è libera di fare altro.

## Eccezioni in RISC-V (materiale aggiuntivo, slide da Giorgi)
Un'**eccezione** è un trasferimento del flusso di controllo non legato al codice utente: il sistema smette di eseguire il programma e lancia il **gestore dell'eccezione**, a cui si ritorna con **SRET** (Supervisor Return). Il meccanismo è pensato per essere trasparente per l'applicazione. All'eccezione la CPU salva il PC dell'istruzione "colpevole" in **SEPC**, ne salva la causa in **SCAUSE** e passa il controllo al gestore. Il gestore non deve alterare lo stato dell'applicazione: nessun registro x1..x31 o f0..f31 deve risultare modificato, quindi salva su stack quelli che usa. Gira in **modalità protetta (supervisor/kernel mode)** con le eccezioni disabilitate, perché le eccezioni si servono una alla volta (il gestore può comunque riabilitarle). Le modalità sono due: user per le applicazioni, con accesso controllato, e supervisor/kernel per il sistema operativo, privilegiata.

I tipi di eccezione sono quattro:
- **Interrupt**: asincrono, dovuto a eventi esterni (tasto, mouse);
- **Errore**: sincrono e interno (overflow, divisione per zero, istruzione illegale);
- **Environment call** (`ecall`): sincrona, richiede un servizio di sistema (stampare, uscire); il codice del servizio è in a7, per cui `addi x17,x0,10; ecall` equivale a exit;
- **Environment break** (`ebreak`): serve per il debug.

Per **arrivare al gestore** ci sono due strategie:
- *salto diretto*: PC <- base, dove la base è nel registro **STVEC** con i 2 bit bassi MODE = 00, e il gestore legge SCAUSE per capire la causa;
- *vettore di interruzione*: PC <- MEM[base + causa*4] (STVEC.MODE = 01), così la causa seleziona direttamente il gestore giusto.

Anche il **salvataggio dello stato** si può fare in tre modi:
- sullo stack (Vax, 68k, x86: l'intero set di registri);
- in registri ausiliari "shadow" (ARM);
- in registri speciali (RISC-V, MIPS: si salva solo ciò che serve, anche zero registri).

Le informazioni di controllo stanno nei **CSR** (control status registers), elencati qui con il loro indirizzo:
- STATUS (0x100), SIE (0x104), STVEC (0x105), SSCRATCH (0x140);
- SEPC (0x141), SCAUSE (0x142);
- STVAL (0x143, l'indirizzo "sbagliato" di accesso), SIP (0x144, interrupt pendenti);
- SSTATUS (abilitazione globale degli interrupt).

Al verificarsi di un'eccezione la CPU modifica SEPC, SSTATUS, SCAUSE e PC.

**SCAUSE** contiene il bit Int (1 = interrupt, 0 = eccezione) e un Code di 4 bit. Codici:
- 0 instruction address misaligned, 2 illegal instruction, 3 breakpoint;
- 4 load address misaligned, 5 load address fault;
- 6 store address misaligned, 7 store address fault;
- 8 ecall da U-mode, 9 ecall da S-mode, C(12) instruction page fault, ... (altri nelle slide).

Le istruzioni speciali per i CSR (`csrr/csrw`...): [la slide "Le istruzioni speciali" è vuota nell'estrazione: DA VERIFICARE].

## Cose da saper fare all'esame
- Confrontare polling, interrupt, DMA (vantaggi/svantaggi, quando usare cosa).
- Descrivere passo passo (HW e SW) la gestione di un interrupt (vettore, stack, gestore, ritorno).
- Distinguere interrupt (asincrono) / trap-eccezione (sincrono); fare esempi.
- Scrivere un ciclo di polling in assembly (leggi bit ready, ciclo, leggi buffer) [schema: `loop: lw t0, STATUS(a0); andi t0,t0,1; beqz t0,loop; lw t1, DATA(a0)`; indirizzi simbolici].
- Elencare CSR e funzione di SEPC/SCAUSE/STVEC; salto diretto vs vettore.
- Spiegare ecall e le modalità user/supervisor.

## Dubbi
Il programma ufficiale del corso (Argomenti dei Corsi) elenca "IO" in generale, e non è chiaro quanto i dettagli CSR siano richiesti (slide marcate "materiale aggiuntivo"). [DA VERIFICARE col docente]
