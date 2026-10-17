# 04 - Distribuzione di contenuti: client-server vs P2P, video streaming, CDN

Fonte: slide Kurose-Ross cap. 2 (`unito_Chapter_2_v8.2-V2.pdf`, slide 2-83...2-104), dal Moodle del corso (materiale in `_moodle-raw/Reti-Sicurezza-Reti/generale`). Completa [02-livello-applicazione.md](02-livello-applicazione.md), che si fermava alla distribuzione di file client-server.

## Mappa

- [Distribuzione di un file: client-server vs P2P](#distribuzione-di-un-file-client-server-vs-p2p)
- [Video: codifica e streaming](#video-codifica-e-streaming)
- [DASH](#dash)
- [CDN](#cdn)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Distribuzione di un file: client-server vs P2P

La domanda di partenza è quanto tempo serve per distribuire un file di dimensione F da un server a N peer, dove la banda è la risorsa limitata. Sia u_s la capacità di upload del server, u_i e d_i la capacità di upload e di download del peer i, e d_min = min d_i la capacità di download del peer più lento.

Nel modello **client-server** il server deve inviare N copie del file in sequenza, quindi spende N·F/u_s, e il client più lento ha bisogno di almeno F/d_min per scaricare. Il tempo minimo di distribuzione è quindi D_cs ≥ max{ N·F/u_s , F/d_min }, e cresce linearmente con N perché il server è il collo di bottiglia.

Nel modello **P2P** il server deve caricare almeno una copia (F/u_s), il client più lento ha ancora il vincolo F/d_min, e in aggregato i peer devono scaricare N·F bit, con una capacità massima di upload dell'intero sistema pari a u_s + Σu_i. Quindi D_P2P ≥ max{ F/u_s , F/d_min , N·F/(u_s + Σu_i) }. Anche qui il tempo cresce con N, ma più lentamente, perché ogni peer che arriva porta anche capacità di servizio: è questa la scalabilità intrinseca del P2P. Nell'esempio delle slide (upload dei client u, F/u = 1 ora, u_s = 10u, d_min ≥ u_s) il tempo client-server cresce linearmente con N, mentre quello P2P resta sotto 1,5 ore anche per N grandi (grafico a pagina 2-86; è una figura e non è riportata qui [DA VERIFICARE sul PDF]).

Esempio con numeri: [08-esercizi-cap2.md](08-esercizi-cap2.md) applica queste formule con F = 15 Gbit, u_s = 30 Mbps e d_min = 2 Mbps. I calcoli intermedi sono F/u_s = 500 s e F/d_min = 7500 s.

## Video: codifica e streaming

Un video è una sequenza di immagini mostrate a velocità costante (per esempio 24 al secondo), e ogni immagine è una matrice di pixel codificati in bit. La compressione sfrutta due ridondanze: la **codifica spaziale** (all'interno di un'immagine, per esempio mandando "colore viola, ripetuto N volte" invece di N valori uguali) e la **codifica temporale** (tra immagini consecutive, mandando solo le differenze rispetto al fotogramma precedente). La codifica può essere a bit rate costante (CBR) o variabile (VBR, che cambia con la quantità di ridondanza spaziale e temporale). Esempi: MPEG-1 (CD-ROM) 1,5 Mbps, MPEG-2 (DVD) 3-6 Mbps, MPEG-4 (spesso su Internet) da 64 kbps a 12 Mbps.

Lo **streaming di video memorizzato** ha due difficoltà. La banda server-client varia nel tempo con la congestione, e perdite e ritardi ritardano la riproduzione. Inoltre c'è il vincolo di **riproduzione continua**: il tempo di playout deve rispettare la temporizzazione originale, ma i ritardi di rete sono variabili (jitter), quindi il client mette in un **buffer** parte del video prima di cominciare a riprodurlo. Il ritardo di playout del client compensa il ritardo aggiunto dalla rete e il jitter. A tutto questo si aggiungono l'interattività (pausa, avanti veloce, salto) e la gestione dei pacchetti persi e ritrasmessi.

## DASH

DASH (Dynamic, Adaptive Streaming over HTTP) sposta l'intelligenza nel client. Il **server** divide il video in blocchi (chunk), codifica ciascun blocco a più bitrate memorizzati in file diversi, replica i file in vari nodi CDN e pubblica un **manifest file** con gli URL dei blocchi alle varie qualità. Il **client** stima periodicamente la banda server-client, consulta il manifest e richiede un blocco alla volta scegliendo il bitrate massimo sostenibile con la banda del momento, che può cambiare durante la riproduzione e anche da un server all'altro. Il client decide dunque quando chiedere un blocco (per evitare che il buffer si svuoti o trabocchi), che qualità chiedere e da dove chiederlo (un server vicino o con molta banda). In una formula: streaming video = codifica + DASH + buffering di playout.

## CDN

Un unico "mega-server" non scala: è un singolo punto di guasto e di congestione, e il percorso verso i client lontani è lungo e magari congestionato. Una **CDN** (content distribution network) conserva più copie dei video in siti distribuiti geograficamente. Ci sono due filosofie. **Enter deep**: server CDN spinti in profondità dentro molte reti d'accesso, vicino agli utenti (Akamai: oltre 240.000 server in più di 120 paesi, dato 2015). **Bring home**: un numero minore (decine) di cluster più grandi nei POP vicini alle reti d'accesso (Limelight). Il fornitore di contenuti OTT ("over the top") deve decidere da quale nodo servire ogni cliente, come comportarsi con la congestione e quali contenuti mettere in quale nodo.

L'accesso a un contenuto in una CDN si risolve con il DNS: l'utente (Bob) clicca sull'URL `http://netcinema.com/6Y7B23V`, il suo DNS locale risolve il nome e il DNS autoritativo di netcinema.com risponde con un **CNAME** che punta a `KingCDN.com/NetC6y&B23V`; il DNS locale interroga allora il DNS autoritativo di KingCDN, che restituisce l'indirizzo IP del server CDN scelto, e il video viene trasmesso con HTTP da quel server. **Netflix** (OpenConnect CDN) funziona così: carica più versioni di ogni video dal cloud Amazon nei server CDN, il client riceve dal servizio un manifest, sceglie un server CDN e inizia lo streaming con DASH, cambiando bitrate o copia se il percorso è congestionato.

Teoria collegata: il DNS e il CNAME sono in [02-livello-applicazione.md](02-livello-applicazione.md); il calcolo del tempo di distribuzione si esercita in [08-esercizi-cap2.md](08-esercizi-cap2.md).

## Cose da saper fare all'esame

- Scrivere le due formule del tempo minimo di distribuzione (client-server e P2P) e usarle per un file e N peer dati, dicendo quale termine è il collo di bottiglia.
- Spiegare perché il P2P scala meglio del client-server (ogni peer aggiunge capacità di servizio).
- Descrivere il ruolo di buffer, playout e DASH nello streaming, e cosa contiene il manifest.
- Spiegare come un browser arriva al video in una CDN passando per il CNAME del DNS.

## Dubbi

- Le slide non spiegano come si decida la scelta del nodo CDN (geografica, per RTT, per carico): è solo posta come problema.
- Il grafico di confronto client-server/P2P (2-86) è una figura e non è stato letto [DA VERIFICARE sul PDF].
