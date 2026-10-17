# Reti e Sicurezza delle Reti (9 CFU, 3° anno)

Slide su Drive: Terzo anno/Reti e Sicurezza delle Reti (Slide Deck - Reti, Slide Deck - Sicurezza, Libri). Testo: Kurose-Ross, Computer Networking. Date appelli: ignote.

Appunti in `appunti/`, scritti con l'agente `riassuntore` (mappa degli argomenti, definizioni, formule, esempi, "Cose da saper fare all'esame", "Dubbi"). Convenzione: `[INT]` = integrazione o calcolo mio, non presente nelle fonti (da ricontrollare); `[DA VERIFICARE]` = punto ambiguo.

## Indice
| File | Contenuto |
|---|---|
| [01-introduzione-reti.md](appunti/01-introduzione-reti.md) | Cap. 1: Internet e protocolli, accesso e mezzi fisici, packet/circuit switching, struttura di Internet, ritardo/perdita/throughput, sicurezza, livelli e incapsulamento, storia |
| [02-livello-applicazione.md](appunti/02-livello-applicazione.md) | Cap. 2 (fino a client-server vs P2P): architetture e socket, servizi di trasporto, HTTP, cookie, cache, HTTP/2-3, SMTP/IMAP, DNS |
| [03-principi-di-sicurezza.md](appunti/03-principi-di-sicurezza.md) | Sicurezza, lezione 01: triade CIA e obiettivi estesi, terminologia, avversari, conseguenze degli attacchi, vulnerabilità degli asset, controlli, defense in depth, attack tree |
| [04-p2p-streaming-cdn.md](appunti/04-p2p-streaming-cdn.md) | Cap. 2 (parte finale): tempo di distribuzione client-server vs P2P, codifica video, streaming, DASH, CDN e Netflix |
| [05-socket-programming.md](appunti/05-socket-programming.md) | Socket UDP e TCP, esempio uppercase (Python), confronto fra i due servizi |
| [06-fondamenti-crittografici.md](appunti/06-fondamenti-crittografici.md) | Sicurezza, lezione 02: cifratura simmetrica (DES, 3DES, AES), hash, MAC e HMAC, chiave pubblica (RSA, DH, ECC), firma digitale, numeri casuali, protocolli |
| [07-autenticazione-utenti.md](appunti/07-autenticazione-utenti.md) | Sicurezza, lezione 03: NIST 800-63, password (UNIX, Linux, bcrypt), token e smart card, TOTP, biometria, challenge-response, FIDO2, attacchi e difese |
| [08-esercizi-cap2.md](appunti/08-esercizi-cap2.md) | Soluzioni del cap. 2: GET HTTP, tempi con DNS e HTTP, cache Web, distribuzione file client-server/P2P |

## Fonti usate e lacune
Sono state lette le slide "01 - Introduzione alle Reti" e "02 - Livello di Applicazione" (Slide Deck - Reti) e "01 - Secutiry Principles" (Slide Deck - Sicurezza) da Drive; il Moodle del corso (`_moodle-raw/Reti-Sicurezza-Reti/generale`) ha aggiunto: le slide del cap. 2 di Kurose-Ross (P2P, streaming, CDN, socket), le slide di Sicurezza 02 (fondamenti crittografici) e 03 (autenticazione degli utenti), le soluzioni del cap. 2 e gli esempi di socket in Python/Java. Non ci sono tracce d'esame su Moodle di Reti: il file `tracce.zip` contiene catture Wireshark (ARP, DNS, HTTP, SMTP/IMAP con TLS, ping, traceroute, telnet, FTP), non esami. Non sono stati letti: i capitoli 1 e 3 di Kurose in formato pptx/pdf (il cap. 1 è già coperto da `01`), le slide `00_introduzione`, `01_intro_security` (già coperta da `03`), il notebook `cryptography_slides_examples.ipynb`, i sorgenti Java dei socket e le catture pcap. I due libri nella cartella "Libri" di Drive non sono stati usati. Mancano ancora i capitoli successivi di Kurose (trasporto, rete, link) e le altre lezioni di Sicurezza (controllo degli accessi, malware, ecc.).
