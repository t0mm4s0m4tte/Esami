# 06 - Fondamenti crittografici

Fonte: slide di Sicurezza "02 - Cryptographic Foundations" (`02_cryptographic_foundations.pdf`) dal Moodle del corso, in `_moodle-raw/Reti-Sicurezza-Reti/generale`. Il notebook `cryptography_slides_examples.ipynb` (esempi del corso) non è stato letto. Prosegue [03-principi-di-sicurezza.md](03-principi-di-sicurezza.md) e precede [07-autenticazione-utenti.md](07-autenticazione-utenti.md). Le slide contengono alcune figure (tempi di ricerca esaustiva della chiave, esempio RSA, firma digitale, pinguino ECB) non leggibili nel testo estratto [DA VERIFICARE sul PDF dove segnato].

## Mappa

- [Cifratura simmetrica](#cifratura-simmetrica)
- [Algoritmi simmetrici, attacchi e modi d'uso](#algoritmi-simmetrici-attacchi-e-modi-duso)
- [Funzioni hash](#funzioni-hash)
- [MAC e HMAC](#mac-e-hmac)
- [Crittografia a chiave pubblica](#crittografia-a-chiave-pubblica)
- [Firma digitale](#firma-digitale)
- [Numeri casuali e protocolli](#numeri-casuali-e-protocolli)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Cifratura simmetrica

Nel modello base le due parti condividono la stessa chiave segreta K. Il testo in chiaro X diventa testo cifrato Y = E[K, X], e il destinatario ricava X = D[K, Y]: la decifratura deve invertire la cifratura quando la chiave è quella giusta. Un algoritmo forte produce un testo cifrato che appare casuale a chi non ha la chiave. Il problema fondamentale è la **distribuzione della chiave**: le due parti devono ottenere la stessa chiave attraverso canali sicuri e autenticati, ed è proprio ciò che la crittografia a chiave pubblica risolve.

I requisiti, in due gruppi. Sul versante dell'algoritmo: sicurezza computazionale (anche con risorse enormi, rompere la cifratura senza la chiave deve richiedere un tempo impraticabile), **trasparenza dell'algoritmo** (la sicurezza non deve dipendere dalla segretezza dell'algoritmo: principio di Kerckhoffs) e resistenza alla crittanalisi nota, a testo in chiaro scelto e a testo cifrato scelto. Sul versante della gestione delle chiavi: generazione con generatori casuali o pseudocasuali sicuri, distribuzione iniziale su canali autenticati e riservati, conservazione protetta (moduli hardware, archivi cifrati) e rotazione periodica per limitare l'esposizione.

## Algoritmi simmetrici, attacchi e modi d'uso

**DES** ha blocco da 64 bit e chiave efficace da 56 bit, ed è considerato rotto proprio per la chiave troppo corta. **Triple DES** applica DES tre volte con chiavi diverse (sicurezza effettiva 112 o 168 bit), più sicuro ma lento e in via di sostituzione. **AES** ha blocco da 128 bit e chiave da 128, 192 o 256 bit, ottimizzato per software e hardware, ed è usato ovunque (WPA2/WPA3, file, VPN, protocolli sicuri). Tabella riassuntiva delle slide: DES blocco 64, chiave 56; 3DES blocco 64, chiave 112 o 168; AES blocco 128, chiave 128/192/256. Il tempo di una ricerca esaustiva della chiave è riportato in una tabella nelle slide [DA VERIFICARE sul PDF].

Gli attacchi alla cifratura sono: **known-plaintext** (l'attaccante ha coppie testo in chiaro/cifrato), **chosen-plaintext** (può scegliere testi in chiaro e ottenerne i cifrati), **chosen-ciphertext** (sottopone testi cifrati scelti alla decifratura), **analisi delle frequenze** (statistica di lettere o byte), **man-in-the-middle** e **brute force** (provare tutte le chiavi). Due esempi di errore: un algoritmo cattivo, come il cifrario a sostituzione (per esempio Cesare), conserva la frequenza delle lettere; un buon algoritmo usato male, come AES in modalità **ECB**, cifra ogni blocco in chiaro con la stessa chiave indipendentemente dagli altri, quindi blocchi uguali producono cifrati uguali (il celebre "pinguino ECB": una bitmap cifrata in ECB conserva la forma). Per cifrare dati più lunghi di un blocco esistono modi più sicuri dell'ECB. Dal punto di vista del funzionamento, i cifrari si dividono in **a blocchi** (un blocco di input alla volta, un blocco di output per ognuno) e **a flusso** (elaborano l'input continuamente, un elemento alla volta, più veloci).

## Funzioni hash

Una funzione hash crittografica calcola h = H(M) con queste proprietà: è **unidirezionale** (calcolare l'hash è facile, trovare un input che produca un hash dato è infattibile), ha **uscita di lunghezza fissa** (per esempio 256 bit per SHA-256, qualunque sia la dimensione dell'input), è **deterministica** (stesso input, stesso output) e mostra l'**effetto valanga** (cambiando un bit dell'input l'output cambia radicalmente). Usi tipici: memorizzare l'hash di una password invece della password, firmare l'hash di un messaggio invece del messaggio intero, concatenare i blocchi di una blockchain con hash che rendono la cronologia a prova di manomissione.

Le tre proprietà di sicurezza sono la **resistenza alla preimmagine** (dato h, è infattibile trovare un m con H(m) = h), la **resistenza alla seconda preimmagine** (dato $m_{1}$, è infattibile trovare $m_{2}$ ≠ $m_{1}$ con lo stesso hash) e la **resistenza alle collisioni** (è infattibile trovare due messaggi diversi con lo stesso hash). Per il **paradosso del compleanno** trovare una collisione per un hash a n bit richiede solo circa $2^{n/2}$ operazioni, non $2^{n}$. Algoritmi: MD5 (128 bit, Rivest 1991) è rotto per collisioni, ma si usa ancora per controlli di integrità non critici; SHA-1 (160 bit) ha collisioni pratiche dimostrate da Google nel 2017 e i browser smisero di accettare certificati SHA-1 nello stesso anno; la famiglia SHA-2 (SHA-224/256/384/512) non ha attacchi pratici noti ed è considerata sicura; SHA-3 (Keccak) ha una struttura diversa ed è un'alternativa scelta con una competizione NIST.

## MAC e HMAC

Un **MAC** (Message Authentication Code) dà integrità dei dati e autenticazione del mittente grazie a una chiave condivisa: l'algoritmo prende il messaggio e la chiave segreta e produce un tag di lunghezza fissa; il ricevente ricalcola il MAC con la stessa chiave e lo confronta con quello ricevuto. Per l'**unforgeability** è infattibile costruire un MAC valido per un messaggio senza conoscere la chiave. Usare una funzione hash per l'autenticazione ha tre varianti: cifrare l'hash con la chiave simmetrica; cifrarlo con la chiave privata del mittente (è la firma digitale); concatenare il segreto e il messaggio prima di calcolare l'hash. Quest'ultima è delicata: con MAC = Hash(K ‖ messaggio) un attacco di **length extension** permette, a chi vede il messaggio e il suo MAC, di costruire un MAC valido per un messaggio esteso senza conoscere K. Esempio delle slide: da MAC = MD5("KEY" ‖ "send \$10") si ricava un MAC valido per "send \$10" + padding + "send \$999 to X", usando il vecchio MAC come stato iniziale. La soluzione standard è **HMAC** (RFC 2104), che combina in modo sicuro una funzione hash con la chiave: è dimostrato sicuro se l'hash ha le proprietà di preimmagine e collisione richieste, ed è presente in tutte le librerie crittografiche e nei protocolli di Internet.

## Crittografia a chiave pubblica

Proposta da Diffie e Hellman nel 1976, è asimmetrica: usa due chiavi distinte, una **pubblica** (nota a tutti) e una **privata**. Se si cifra con la chiave pubblica del destinatario, solo il destinatario, con la sua chiave privata, può decifrare. Se invece si cifra con la propria chiave privata, chiunque conosca la chiave pubblica può decifrare, e questo è il meccanismo della firma. I requisiti sono: generare coppie di chiavi è facile, cifrare conoscendo la chiave pubblica è facile, decifrare conoscendo la chiave privata è facile, e invece è infattibile per un avversario recuperare il messaggio altrimenti, o ricavare la chiave privata dalla pubblica.

Algoritmi: **RSA** (Rivest, Shamir, Adleman, 1977) è un cifrario a blocchi in cui testo in chiaro e cifrato sono interi tra 0 e n−1, ed è stato a lungo l'approccio più diffuso; **Diffie-Hellman** permette a due utenti di accordarsi su un segreto condiviso da usare come chiave per una successiva cifratura simmetrica, ed è limitato allo scambio di chiavi; **DSS** fornisce solo la firma, non cifratura né scambio chiavi; la **crittografia a curve ellittiche** (ECC) offre una sicurezza analoga a RSA con chiavi molto più piccole. L'esempio RSA "a mano" nelle slide (con numeri piccoli) è accompagnato da un avvertimento esplicito: **non va mai fatto così**, perché è deterministico (stesso messaggio, stesso cifrato), vulnerabile a messaggi piccoli (basta calcolare la radice e-esima), non protegge l'integrità; si usa il padding come OAEP (Optimal Asymmetric Encryption Padding). I valori numerici dell'esempio sono in figure [DA VERIFICARE sul PDF].

## Firma digitale

Il NIST (FIPS 186-4) definisce la firma digitale come il risultato di una trasformazione crittografica dei dati che, se implementata correttamente, permette di verificare **l'origine (autenticazione), l'integrità dei dati e il non ripudio** del firmatario. FIPS 186-4 prevede tre algoritmi: DSA, RSA Digital Signature Algorithm ed ECDSA (curve ellittiche). In pratica si firma l'hash del messaggio con la chiave privata, e chi verifica ricalcola l'hash e lo confronta con quello ottenuto decifrando la firma con la chiave pubblica.

## Numeri casuali e protocolli

I numeri casuali devono avere **distribuzione uniforme** (ogni valore ugualmente frequente) e **indipendenza** (nessun valore ricavabile dagli altri; l'avversario non deve poter predire gli elementi futuri da quelli passati). Gli algoritmi software sono deterministici, quindi producono sequenze **pseudocasuali**: passano i test statistici ma possono essere predicibili. Un **TRNG** (true random number generator) usa una sorgente non deterministica, misurando processi naturali imprevedibili (radiazione, scarica nei gas, condensatori che perdono), ed è sempre più presente nei processori moderni.

I protocolli crittografici comuni sono: **SSL/TLS** (traffico web, HTTPS, crittografia ibrida: simmetrica più chiave pubblica con certificati), **SSH** (accesso remoto sicuro con autenticazione a chiave pubblica e canale cifrato), **PGP/GPG** (email, firme, modello "web of trust" invece di autorità di certificazione gerarchiche), **Signal Protocol** (cifratura end-to-end con forward secrecy), **IPsec** e **WireGuard** (tunnel sicuri su reti non fidate). I fallimenti tipici in pratica: generazione debole delle chiavi (numeri casuali prevedibili), bug di implementazione (Heartbleed, validazione errata dei certificati, attacchi di temporizzazione), cattiva gestione delle chiavi (chiavi nel codice, condivisione di chiavi private, assenza di rotazione), attacchi ai protocolli (SSL stripping, downgrade, man-in-the-middle) e **side channel** (analisi di potenza, di tempi, emissioni elettromagnetiche).

## Cose da saper fare all'esame

- Distinguere cifratura simmetrica e a chiave pubblica, dicendo quale problema (distribuzione della chiave) risolve la seconda.
- Elencare le proprietà di una funzione hash crittografica e le tre resistenze, e spiegare il paradosso del compleanno ($2^{n/2}$).
- Spiegare perché MAC = Hash(K ‖ M) è vulnerabile al length extension e cosa risolve HMAC.
- Dire cosa garantisce una firma digitale (origine, integrità, non ripudio) e come si calcola.
- Spiegare perché ECB è insicuro e perché RSA "manuale" va sempre usato con padding.
- Confrontare DES, 3DES e AES per dimensione di blocco e chiave.

## Dubbi

- Nelle slide lette non ci sono né il funzionamento interno di AES/DES né il dettaglio dell'algoritmo RSA (generazione di e, d, n): l'esempio è in figura [DA VERIFICARE].
- I tempi di ricerca esaustiva sono in una tabella-immagine.
- Gli esempi del notebook `cryptography_slides_examples.ipynb` non sono stati letti.
