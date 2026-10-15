# 06 - Reti sequenziali, latch, flip-flop, registri, memorie

Fonte: Lezione 05 (Reti Sequenziali), Lab 9 (circuiti sequenziali).

## Mappa
- Circuiti sequenziali vs combinatori
- Latch SR (NOR), clock, latch SR/D sincronizzati, trasparenza
- Flip-flop D (fronte di salita/discesa)
- Buffer tri-state, registri, register file
- Organizzazione di memorie, RAM (SRAM/DRAM), ROM

## Dal combinatorio al sequenziale
I circuiti combinatori non ricordano nulla, ma un calcolatore deve conservare dati. In un circuito sequenziale la funzione calcolata dipende anche da uno **stato interno**, memorizzato in elementi di memoria, e quindi dalla storia degli ingressi. L'elemento più semplice è un latch a 1 bit, specificato così: ingressi `i` e `β` (store), uscita `o`. Se β=1 il nuovo stato è s' = i (store); se β=0 è s' = s (hold). In sintesi, con β=0 l'uscita mantiene lo stato e con β=1 prende i.

## Latch SR (porte NOR)
Il latch SR si costruisce con due porte NOR collegate in retroazione. Ha ingressi S (set) e R (reset), uscite Q e Q̄ e due stati stabili, ed è così che "ricorda" un bit:
- con S=R=0 mantiene lo stato (**hold**);
- con S=1, R=0 va a **stato 1** (Q=1);
- con S=0, R=1 va a **stato 0** (Q=0).

Memorizza dunque l'ultimo tra S e R che è stato asserito.

La combinazione **S=R=1 è vietata**: Q e Q̄ vanno entrambi a 0, e rilasciando insieme i due ingressi lo stato risultante è imprevedibile (oscillazione, anche nei transitori). Poiché in pratica S e R provengono da circuiti combinatori che hanno transitori, non si può garantire che non passino per quella combinazione, e per questo serve il **clock**.

## Clock
Il clock è una serie di impulsi con larghezza e intermittenza specifiche. Il tempo di ciclo è l'intervallo tra fronti corrispondenti di due impulsi, e la frequenza è il suo inverso (500 MHz = 2 ns). Si parla di fronti di salita e di discesa. Per le unità: ms=10^-3 s, µs=10^-6, ns=10^-9; KHz=10^3, MHz=10^6, GHz=10^9 Hz.

## Latch sincronizzati
Il clock permette di decidere quando i dati possono entrare nel latch. Nel **SR sincronizzato** delle porte AND abilitano S e R solo quando Clock=1. Resta però il problema di S=R=1: il **D latch** lo elimina avendo un solo ingresso dato D, con S=D e R=D̄. Con Clock=1 memorizza D, con Clock=0 mantiene.

Il D latch ha tuttavia un difetto: finché Clock=1 è **trasparente**, cioè Q segue D (con un ritardo di propagazione). Se l'uscita di un latch retroagisce su un circuito combinatorio che rientra nello stesso latch nello stesso ciclo, il valore "sporco" viene memorizzato; occorre quindi una commutazione sul fronte. Dal punto di vista della temporizzazione, D deve essere stabile prima (**setup time**) e dopo (**hold time**) il fronte di campionamento.

Emergono così due metodologie: **a livello** (latch) e **sul fronte** (flip-flop). Con il fronte la memorizzazione è quasi istantanea e il segnale di ritorno "sporco" non fa in tempo ad arrivare.

## Flip-flop D
Il latch è azionato dal livello, il **flip-flop dal fronte**. Una realizzazione didattica usa un D-latch con clock = CLK AND (NOT ritardato CLK): ne risulta un impulso brevissimo subito dopo il fronte di salita, perché l'invertitore introduce un piccolo ritardo. La lunghezza dell'impulso di clock non importa.

Combinando livello e fronte si ottengono quattro varianti:
- latch D a livello 1;
- latch D a livello 0;
- flip-flop D su fronte di salita;
- flip-flop D su fronte di discesa.

Nel Lab 9 si realizzano in sequenza:
1. SR latch con NOR;
2. D latch;
3. flip-flop D su fronte di salita;
4. flip-flop D con **reset** asincrono (memorizza 0 indipendentemente da clock e D);
5. flip-flop D su fronte di discesa;
6. registro a 8 bit;
7. register file a 8 registri.

## Buffer tri-state
Il buffer tri-state si comporta come un filo quando Control=1, mentre con Control=0 disconnette ingresso e uscita (alta impedenza). Serve per collegare più sorgenti allo stesso bus senza conflitti.

## Registri e register file
Un **registro** è un insieme di flip-flop D con lo stesso clock; un segnale di `enable` collega o scollega il registro al bus di uscita tramite buffer tri-state.

Il **register file** è un insieme di registri leggibili e scrivibili, indirizzati dal numero di registro in ingresso. Le **porte di lettura** sono una per operando, ciascuna realizzata con un **multiplexer** che seleziona il registro da leggere; la lettura è combinatoria e non richiede segnali di controllo. La **porta di scrittura** usa un **decoder** (con il segnale RegWrite) che abilita il clock del solo registro destinazione. Nel RISC-V del corso si hanno 2 porte di lettura (rs1, rs2), 1 di scrittura (rd), 32 registri a 32 bit e numeri di registro su 5 bit; x0 vale sempre 0 [libro].

La scrittura avviene sul fronte attivo del clock, perciò si può leggere e scrivere lo stesso registro nello stesso ciclo (es. `add x1,x1,x1`): la lettura vede il vecchio valore, mentre il nuovo è visibile al ciclo dopo.

## Memorie
Una memoria ha n linee di indirizzo, che selezionano una tra 2^n righe, e b linee di dato, che formano b colonne, più un Write enable. L'esempio della slide è una memoria 4x2 (2 bit di dato, 2 bit di indirizzo, 1 write enable). Le memorie grandi sono matrici 2^n x b con selezione di riga e colonna (es. SRAM 4M x 8 = 8 array di 4K x 1024, con decoder e mux per scegliere il bit nella riga).

Le **RAM** si dividono in:
- **SRAM**: costruite con flip-flop D; velocissime, usate per le cache;
- **DRAM**: transistor più condensatore; vanno **rinfrescate**, sono più capaci e più lente.

Esistono varianti come FPM, EDO, SDRAM (sincrona) e DDR (legge su entrambi i fronti). Le **ROM** comprendono:
- PROM;
- EPROM (cancellabile con UV);
- EEPROM (cancellabile elettricamente, più lenta);
- Flash (EEPROM cancellabile a blocchi).

## Cose da saper fare all'esame
- Spiegare il funzionamento del latch SR (stati, transizioni, ingresso vietato) e disegnarne l'automa/diagramma temporale.
- Differenza latch/flip-flop; D latch vs D flip-flop; perché il fronte risolve la trasparenza.
- Disegnare un registro a n bit e un register file (mux per lettura, decoder per scrittura).
- Tracciare un diagramma temporale (Q in funzione di D e CLK) per latch D a livello e flip-flop a fronte.
- Distinguere SRAM/DRAM/ROM e dimensionare una memoria (n linee indirizzo, b bit dato -> 2^n x b bit).

## Dubbi
- Dettagli del diagramma temporale (setup/hold) sono nelle figure, non ricavabili dal testo estratto.
