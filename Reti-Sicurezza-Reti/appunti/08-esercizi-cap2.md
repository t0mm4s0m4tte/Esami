# 08 - Esercizi del capitolo 2 (livello applicazione) e soluzioni

Fonte: `SoluzioniProblemCapitolo2.pdf` dal Moodle del corso (`_moodle-raw/Reti-Sicurezza-Reti/generale`). Il PDF contiene **solo le soluzioni**, senza i testi dei problemi (sono quelli di Kurose-Ross, cap. 2): in questo file ogni esercizio è ricostruito dalla soluzione, e dove l'enunciato non si ricava dal testo estratto è segnato [DA VERIFICARE sul PDF e sul libro]. Il testo estratto ha perso diverse formule (i valori RTT). Non sono tracce d'esame datate: non ne ho trovate nel Moodle di Reti. Il file `tracce.zip` della stessa cartella contiene **catture di pacchetti** (pcap/pcapng: ARP, DNS, HTTP, SMTP e IMAP con TLS, ping, traceroute, telnet, FTP), da aprire con Wireshark, non esami; non le ho analizzate.

## Mappa

- [Esercizio 1: vero/falso](#esercizio-1-verofalso)
- [Esercizio 2: lettura di un messaggio HTTP GET](#esercizio-2-lettura-di-un-messaggio-http-get)
- [Esercizio 3: tempo di risposta con DNS e HTTP](#esercizio-3-tempo-di-risposta-con-dns-e-http)
- [Esercizio 4: effetto di una cache Web](#esercizio-4-effetto-di-una-cache-web)
- [Esercizio 5: distribuzione client-server e P2P](#esercizio-5-distribuzione-client-server-e-p2p)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)

Teoria collegata: [02-livello-applicazione.md](02-livello-applicazione.md) (HTTP, cookie, cache, DNS) e [04-p2p-streaming-cdn.md](04-p2p-streaming-cdn.md) (distribuzione di file).

## Esercizio 1: vero/falso

Le risposte nel PDF sono a) F, b) T, c) F, d) F, e) F. L'enunciato (probabilmente sulle connessioni persistenti e non persistenti) non è riportato [DA VERIFICARE sul libro].

## Esercizio 2: lettura di un messaggio HTTP GET

Dato un messaggio di richiesta, la soluzione ricava che la richiesta è per `http://gaia.cs.umass.edu/cs453/index.html`: il campo `Host:` indica il nome del server e `/cs453/index.html` il nome del file. Il browser usa HTTP/1.1 (lo dice l'intestazione della prima riga) e chiede una **connessione persistente** (`Connection: keep-alive`). L'indirizzo IP dell'host che manda la richiesta **non** si ricava dal messaggio HTTP: è una domanda trabocchetto, perché serve il datagramma IP che trasporta il segmento TCP che trasporta il GET. Il campo `User-Agent` (Mozilla/5.0 su Windows) serve perché il server possa mandare la versione adatta al browser. Teoria: la struttura dei messaggi HTTP e le connessioni persistenti in [02](02-livello-applicazione.md).

## Esercizio 3: tempo di risposta con DNS e HTTP

Il tempo per ottenere l'indirizzo IP dall'host name è RTT₁ + RTT₂ + ... + RTT_n (le query DNS in sequenza). Una volta noto l'IP, un RTT₀ serve per stabilire la connessione TCP e un altro RTT₀ per richiedere e ricevere il piccolo oggetto: il tempo totale per il primo oggetto è quindi RTT₁ + ... + RTT_n + 2·RTT₀. Con 8 oggetti piccoli referenziati dalla pagina, la soluzione distingue tre casi (il testo estratto ha perso gli esatti coefficienti, quelli sotto seguono lo schema standard del problema e vanno controllati sul PDF [DA VERIFICARE]): (a) HTTP non persistente senza connessioni parallele: ogni oggetto costa 2·RTT₀, quindi 18·RTT₀ + ΣRTTᵢ per pagina e otto oggetti; (b) non persistente con un numero limitato di connessioni parallele (nel problema di Kurose-Ross sono 5): la pagina costa 2·RTT₀ e gli 8 oggetti si scaricano in due round da 2·RTT₀ (5 + 3), quindi 6·RTT₀ + ΣRTTᵢ; il PDF mostra una somma con cinque termini, il numero esatto dei round dipende dall'enunciato [DA VERIFICARE]; (c) persistente senza pipeline: 10·RTT₀ + ΣRTTᵢ (2 RTT₀ per la pagina e 1 RTT₀ per ciascuno degli 8 oggetti).

## Esercizio 4: effetto di una cache Web

Il problema confronta il ritardo con e senza cache istituzionale. Dati ricavabili dalla soluzione: oggetti di 850.000 bit, link di accesso a 15 Mbps, 16 richieste al secondo, ritardo Internet di 3 secondi. Il tempo di trasmissione di un oggetto è L/R = 850.000 / 15.000.000 ≈ 0,06 s (valore arrotondato usato nel PDF); l'**intensità di traffico** sul link è β = 16 · 0,06 ≈ 0,96; il ritardo medio di accesso è Δ/(1−β) = 0,06/(1−0,96) = 1,5 s; il tempo di risposta medio è 1,5 + 3 = 4,5 s.

Con una cache che soddisfa il 60% delle richieste, il traffico sul link di accesso si riduce al 40%: β = 0,4 · 0,96 = 0,384. Il PDF scrive 0,06/[1−(0,4)(0,96)] = 0,15625 s, ma 0,06/0,384 = 0,15625: sembra una svista nel calcolo (il denominatore corretto è 1−0,384 = 0,616). **Ricalcolato**: ritardo di accesso 0,06/0,616 ≈ 0,097 s; tempo di risposta per i miss 0,097 + 3 ≈ 3,097 s; tempo medio = 0,6 · 0 + 0,4 · 3,097 ≈ **1,24 s** (contro i 1,2625 s del PDF). In entrambi i casi la conclusione è la stessa: la cache riduce il tempo medio da 4,5 s a circa 1,2-1,3 s. Teoria: cache Web e GET condizionale in [02](02-livello-applicazione.md); la formula Δ/(1−β) è il ritardo di coda con intensità di traffico β = a·L/R, vista nel cap. 1 ([01](01-introduzione-reti.md)).

## Esercizio 5: distribuzione client-server e P2P

Le formule usate dal PDF sono D_cs = max{ N·F/u_s , F/d_min } e D_P2P = max{ F/u_s , F/d_min , N·F/(u_s + Σu_i) }, già spiegate in [04-p2p-streaming-cdn.md](04-p2p-streaming-cdn.md). I dati dell'esempio sono F = 15 Gbit, u_s = 30 Mbps, d_min = 2 Mbps, e velocità di upload dei peer di 300 kbps, 700 kbps o 2 Mbps; N = 10, 100, 1000. Valori che si leggono con certezza: F/u_s = 15·1000 Mbit / 30 Mbps = 500 s; F/d_min = 15000 Mbit / 2 Mbps = 7500 s. Il resto del PDF contiene una seconda tabella per F = 100 KB e valori che sembrano incoerenti fra loro (per esempio calcoli con "100 KB" che usano 1024 e 15 Gbit nello stesso conto): non sono affidabili nel testo estratto [DA VERIFICARE sul PDF]. Schema di soluzione da applicare: per ogni coppia (N, u) si calcolano i tre termini e si prende il massimo; in client-server domina N·F/u_s per N grande, in P2P domina il termine N·F/(u_s + N·u) quando u è piccolo.

## Cose da saper fare all'esame

- Leggere un messaggio di richiesta HTTP e ricavare nome del server, file, versione, tipo di connessione e client; sapere che l'IP del client non è nel messaggio HTTP.
- Calcolare il tempo di risposta di una pagina con N oggetti in HTTP non persistente (con e senza connessioni parallele) e persistente, includendo i RTT del DNS.
- Calcolare il ritardo medio con e senza cache usando β = a·L/R e Δ/(1−β), ricordando che i miss pagano anche il ritardo di Internet.
- Calcolare il tempo di distribuzione di un file con le formule client-server e P2P e dire quale termine è il collo di bottiglia.
