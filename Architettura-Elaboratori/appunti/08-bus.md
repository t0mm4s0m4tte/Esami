# 08 - Il Bus

Fonte: Lezione 08 (Bus).

## Mappa
- Architettura classica a bus condiviso vs moderni punto-punto
- Linee dati / indirizzi / controllo
- Dispositivi attivi e passivi
- Larghezza, clocking (sincrono/asincrono), arbitraggio
- Da bus paralleli a seriali

## Definizione
Il **bus** è l'insieme di linee elettriche che collegano i moduli di un elaboratore (CPU, memoria, I/O), e il **protocollo del bus** è l'insieme di regole che governa la comunicazione sulle sue linee. Esistono bus di sistema (che collegano CPU, memoria e I/O) e bus interni al chip.

Le linee del bus si dividono per funzione. Le linee **dati** determinano, con la loro larghezza, quanti bit si trasferiscono per volta, e quindi influenzano le prestazioni. Le linee **indirizzi** individuano sorgente e destinazione. Le linee **controllo** regolano l'accesso e l'uso delle altre linee. Dal lato della CPU, n piedini di indirizzo permettono di indirizzare 2^n locazioni (valori tipici 16, 20, 32, 64), m piedini di dato trasferiscono una parola di m bit in una operazione, e ci sono poi i piedini di controllo (bus control, interrupt, arbitraggio, coprocessore, stato).

## Dispositivi
Sul bus i dispositivi hanno ruoli diversi. Quelli **attivi (master)** possono iniziare un trasferimento e si collegano con un *bus driver*; quelli **passivi (slave)** attendono richieste e si collegano con un *bus receiver*. I dispositivi che possono essere entrambi, come la CPU, usano un *bus transceiver*.

## Progettazione: tre problemi
Progettare un bus significa risolvere tre problemi:
1. **Larghezza** (numero di linee): le linee di indirizzo fissano la memoria massima indirizzabile, quelle di dato l'informazione per operazione;
2. **Arbitraggio**: chi diventa master quando due dispositivi lo vogliono;
3. **Funzionamento**: come avviene il trasferimento (temporizzazione).

## Bus sincrono
In un bus sincrono una linea di clock, generata da un oscillatore, scandisce tutto: ogni attività dura un numero intero di cicli, e le durate sono note a entrambi i dispositivi, mentre è incognito solo l'inizio (segnalato da **MREQ**). Nell'esempio della slide (ciclo di lettura) il clock è a 100 MHz (ciclo di 10 ns) e la lettura della memoria richiede 15 ns da indirizzo stabile. La sequenza è:
1. la CPU mette l'indirizzo sul bus; dopo il tempo di stabilizzazione (TAD) esso resta disponibile;
2. a indirizzi stabili la CPU attiva MREQ (richiesta) e RD (lettura);
3. la memoria attiva **WAIT** all'inizio del ciclo T2 per dire alla CPU di aspettare (15 ns > 1 ciclo, quindi un wait state);
4. la memoria mette il dato sulle linee dati;
5. la CPU legge il dato e disattiva MREQ e RD.

Il vantaggio è la semplicità dei dispositivi: se la durata è fissa, la linea wait non serve. Gli svantaggi sono che ogni operazione dura un numero intero di cicli e che il bus deve adattarsi al dispositivo più lento.

## Bus asincrono
Il bus asincrono non ha un clock globale e si sincronizza con un **handshake** (le slide parlano di un segnale SYNchronization; i nomi MSYN/SSYN sono quelli di Tanenbaum, [DA VERIFICARE]). Il full handshake si compone di quattro azioni:
1. il master mette l'indirizzo e attiva MREQ, RD e **MSYN**;
2. lo slave fa il lavoro e attiva **SSYN**;
3. il master legge il dato e nega MREQ, RD e MSYN;
4. lo slave vede la negazione e nega SSYN.

Il vantaggio è la flessibilità, perché la durata dipende dalla coppia di dispositivi coinvolta. Gli svantaggi sono le 4 azioni per ogni operazione e i circuiti che ogni dispositivo deve avere per gestire il protocollo.

## Arbitraggio
L'arbitraggio è necessario quando più dispositivi chiedono il bus nello stesso momento. In quello **centralizzato** un arbitro riceve le richieste su una linea di *bus request* e concede l'uso con una linea di *bus grant*. Nella variante **daisy chaining** il grant scorre lungo la catena di dispositivi finché uno lo accetta: vince il più vicino all'arbitro, quindi la priorità è fissa e dipende dalla posizione. Con **più livelli di priorità** si hanno più linee request/grant, una daisy chain per livello, e i dispositivi a priorità alta hanno precedenza; c'è anche una linea di acknowledge, e le priorità vanno scelte con attenzione per il rischio di starvation.

Nell'arbitraggio **decentralizzato** non c'è nessun arbitro: si usano tanti linee quanti sono i dispositivi, oppure una soluzione a 3 linee (bus request, busy, linea di arbitraggio), e ogni dispositivo osserva le linee prima di fare richiesta. È più economico e veloce del daisy chaining centralizzato, ma meno flessibile.

## Dal parallelo al seriale; sistemi attuali
I bus paralleli tradizionali (ISA, EISA, PCI) trasportano tutti i bit di una parola su più linee, ma hanno limiti di crosstalk, sincronizzazione (skew), costi e distanze brevi. I bus seriali ad alta velocità (PCIe, USB 3.x, SATA, Thunderbolt) trasferiscono un bit alla volta, con codifica/serializzazione e velocità molto maggiori, meno interferenza e costo ridotto. Esempi della slide: PCIe 6.0 fino a 64 GT/s per corsia; USB4/Thunderbolt 4 fino a 40 Gbps; SATA III 6 Gbps.

I sistemi moderni usano connessioni **punto-punto** con controller dedicati (memory controller, I/O controller); nei SoC c'è un interconnect (AMBA, AXI, NoC). L'evoluzione storica va da Northbridge/Southbridge (fino a circa il 2010) all'Intel PCH (fino a circa il 2020).

## Cose da saper fare all'esame
- Elencare linee (dati/indirizzi/controllo) e calcolare la memoria indirizzabile (2^n) e il dato per ciclo.
- Disegnare/descrivere un ciclo di lettura in bus sincrono (con wait state) e uno asincrono (handshake a 4 fasi).
- Confrontare sincrono/asincrono (vantaggi e svantaggi).
- Spiegare l'arbitraggio daisy chain e la priorità; centralizzato vs decentralizzato.
- Spiegare perché i bus moderni sono seriali/punto-punto.

## Dubbi
- Nessun esercizio numerico oltre l'esempio 100 MHz / 15 ns nelle slide; esercizi tipo su calcolo larghezza di banda del bus [DA VERIFICARE]: banda = frequenza x larghezza dati / cicli per trasferimento (formula generica, non nelle slide).
