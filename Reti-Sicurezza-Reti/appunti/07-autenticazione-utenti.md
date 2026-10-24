# 07 - Autenticazione degli utenti

Fonte: slide di Sicurezza "03 - User Authentication" (`03_user_authentication.pdf`, basate sul cap. 3 di *Computer Security: Principles and Practice*) dal Moodle del corso, in `_moodle-raw/Reti-Sicurezza-Reti/generale`. Si appoggia a [06-fondamenti-crittografici.md](06-fondamenti-crittografici.md) (hash, HMAC, chiavi pubbliche) e a [03-principi-di-sicurezza.md](03-principi-di-sicurezza.md) (CIA e controlli). Alcune figure (curve ROC, tabelle di costo/accuratezza, schemi) non sono leggibili nel testo estratto.

## Mappa

- [Autenticazione e autorizzazione](#autenticazione-e-autorizzazione)
- [Requisiti NIST e modello di e-authentication](#requisiti-nist-e-modello-di-e-authentication)
- [I quattro fattori e i livelli di garanzia](#i-quattro-fattori-e-i-livelli-di-garanzia)
- [Password](#password)
- [Token e carte](#token-e-carte)
- [Biometria](#biometria)
- [Protocolli challenge-response](#protocolli-challenge-response)
- [Attacchi e difese](#attacchi-e-difese)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Autenticazione e autorizzazione

L'**autenticazione** (AuthN) risponde a "chi sei?": verifica l'identità di un utente, dispositivo o sistema (login con password, impronta, smart card). L'**autorizzazione** (AuthZ) risponde a "cosa puoi fare?": decide a cosa può accedere un utente già autenticato (diritti sui file, privilegi di amministratore, accesso basato sui ruoli). L'autenticazione viene prima dell'autorizzazione: non si possono concedere permessi finché non si sa chi li chiede.

## Requisiti NIST e modello di e-authentication

Lo standard NIST SP 800-171 definisce i requisiti di identificazione e autenticazione. Quelli di base: identificare utenti, processi e dispositivi, e autenticarli come presupposto dell'accesso. Quelli derivati: autenticazione multifattore per gli account privilegiati (locali e di rete) e per l'accesso di rete a quelli non privilegiati; meccanismi resistenti al replay; divieto di riuso degli identificatori per un periodo; disattivazione degli identificatori dopo inattività; complessità minima delle password e cambio di caratteri alla creazione di una nuova; divieto di riuso per un certo numero di generazioni; password temporanee da cambiare subito; memorizzare e trasmettere solo password protette crittograficamente; oscurare il feedback di autenticazione.

Il modello **NIST SP 800-63-3** separa il processo in entità funzionali. La **Registration Authority** (RA) fa l'identity proofing alla registrazione; il **Credential Service Provider** (CSP) emette e gestisce le credenziali; il **Verifier** valida le credenziali presentate; la **Relying Party** (RP) è il servizio che richiede l'accesso autenticato. Questo modello federato permette una sola credenziale per più servizi. Esempio italiano con SPID: RA e CSP coincidono nei gestori di identità (Poste Italiane, Aruba, InfoCert, Namirial...), il cittadino è il subscriber/claimant, il verifier è il sistema di autenticazione dell'Identity Provider, le relying party sono INPS, Agenzia delle Entrate, la banca, il portale dell'università.

## I quattro fattori e i livelli di garanzia

Per autenticare l'identità di un utente si usa qualcosa che **sa** (password, PIN, risposte a domande), qualcosa che **possiede** (smart card, tessera elettronica, chiave fisica: un token), qualcosa che **è** (biometria statica: impronta, retina, volto) o qualcosa che **fa** (biometria dinamica: voce, scrittura, ritmo di battitura). L'autenticazione **multifattore** combina più categorie.

Il NIST definisce tre **Identity Assurance Level** (IAL): IAL1 non lega il richiedente a una specifica identità reale; IAL2 richiede prove dell'identità dichiarata, con verifica remota o in presenza; IAL3 richiede la presenza fisica. E tre **Authenticator Assurance Level** (AAL): AAL1 dà una certa garanzia con ID e password dell'utente; AAL2 dà alta fiducia con la prova di possesso e controllo di due fattori di autenticazione; AAL3 dà fiducia molto alta con prova di due fattori, con un token hardware resistente alla manomissione (la differenza fra AAL2 e AAL3 nelle slide è descritta in modo quasi identico: [DA VERIFICARE sul PDF]).

## Password

La password è la prima linea di difesa: l'utente fornisce login e password, il sistema confronta la password con quella memorizzata per quel login; l'identificativo determina se l'utente è autorizzato e quali privilegi ha, e si usa nel controllo di accesso discrezionale. Gli **attacchi** elencati sono: dizionario offline, attacco a un account specifico, attacco con password popolari, indovinare la password di un singolo utente, dirottamento di una postazione, sfruttamento di errori dell'utente e del riuso di password, monitoraggio elettronico.

**Schema UNIX originale**: password fino a 8 caratteri stampabili, salt di 12 bit che modifica DES per trasformarlo in una funzione hash unidirezionale, il valore zero cifrato ripetutamente 25 volte, uscita tradotta in 11 caratteri. Le slide lo giudicano **completamente inadeguato** (anche se il libro dice che è ancora usato per compatibilità). Schemi più forti: hash basato su MD5 con salt fino a 48 bit, password di lunghezza illimitata, hash a 128 bit e un ciclo interno di 1000 iterazioni per rallentare; **bcrypt** su OpenBSD, basato sul cifrario Blowfish, con salt a 128 bit e hash a 192 bit, la versione più sicura dello schema hash/salt. Linux non usa MD5: usa SHA-512 (con round configurabili, tipicamente 5000 o più, e salt fino a 128 bit) e, nei sistemi più recenti, **yescrypt**. L'hash sta in `/etc/shadow`, leggibile solo dal superutente o da programmi autorizzati come `passwd`. I prefissi nel file indicano l'algoritmo: `$1$` MD5 (obsoleto), `$5$` SHA-256, `$6$` SHA-512 (default comune), `$2a$ $2b$ $2y$` bcrypt, `$y$` o `$7$` yescrypt. Linux usa **PAM** (Pluggable Authentication Modules) per centralizzare le politiche di autenticazione (complessità, MFA, biometria) nei file di `/etc/pam.d/`, valide per tutte le applicazioni PAM-aware.

**Debolezze**: attacchi a dizionario (ogni password del dizionario va hashata con ogni salt disponibile e confrontata) e **rainbow table** (tabelle precalcolate di hash per tutti i salt), contrastate con un salt abbastanza grande e un hash abbastanza lungo. Gli strumenti di cracking, come John the Ripper, combinano forza bruta e dizionario, sfruttando il fatto che le persone scelgono password facili da indovinare; la capacità di calcolo e gli algoritmi di generazione sono migliorati molto. **Strategie di scelta**: educazione degli utenti; password generate dal computer; controllo reattivo (il sistema fa girare periodicamente un proprio cracker per scovare password indovinabili); politica di complessità (l'utente sceglie ma il sistema controlla). Un servizio utile è haveibeenpwned.com.

## Token e carte

Qualcosa che si possiede: carte **in rilievo**, a **banda magnetica** (memory card), **smart card** a contatto o senza contatto. Le **memory card** memorizzano ma non elaborano dati (la più comune è la banda magnetica) e sono più sicure se combinate con una password o un PIN. Gli **smart token** includono un microprocessore incorporato, a volte tastiera e display, con interfacce a contatto o senza, e protocolli di autenticazione statici, a generazione dinamica di password o challenge-response. La **smart card** è la categoria più importante e ha un intero microprocessore con processore, memoria e porte di I/O: ROM (dati immutabili), EEPROM (programmi e dati dell'applicazione), RAM (dati temporanei).

Le **carte d'identità elettroniche** (eID) sono smart card verificate dallo Stato come valide e autentiche; la CIE italiana contiene un microprocessore con nome, cognome, luogo e data di nascita, residenza, foto e due impronte digitali (una per mano). I protocolli comuni nell'autenticazione con eID: **SAML 2.0** (federazione fra service provider e identity provider, usato in eIDAS e nel SSO aziendale), **OpenID Connect / OAuth 2.0** (OAuth 2.0 è un framework di autorizzazione, non di autenticazione, ma è combinato con OIDC per l'identità) e **PKI con certificati digitali** (crittografia asimmetrica e challenge-response con la smart card). Per la CIE l'Identity Provider è il Ministero dell'Interno.

I **token hardware OTP** (one-time password) contengono una chiave segreta con cui generano una password monouso, e usano un cifrario a blocchi o una funzione hash per combinare chiave e tempo o nonce; hanno un modulo antimanomissione per custodire la chiave. Nel **TOTP** (RFC 6238, basato su HOTP, RFC 4226) la password si calcola dall'ora Unix: il segreto condiviso viene memorizzato al setup (per esempio con QR code), l'ora è divisa in intervalli di 30 secondi, e il server fa lo stesso calcolo. La formula è TOTP(K, T) = Truncate(HMAC-SHA1(K, T)) mod $10^{6}$, con T = floor(Unix_time / 30), che dà un codice a 6 cifre. È sicuro perché il codice scade in 30 secondi, il segreto non viene mai trasmesso e senza il segreto non si può prevedere il codice successivo; i sistemi devono tollerare lo scarto di orologio tra token e server. Esempi: Google Authenticator, Authy, Microsoft Authenticator, KeePass.

## Biometria

Autentica una persona in base a caratteristiche fisiche uniche, con il riconoscimento di pattern, ed è tecnicamente complessa e costosa rispetto a password e token. Le caratteristiche usate sono: volto, impronte, geometria della mano, retina, iride, firma, voce. Costi e accuratezza oggi (slide): impronta con sensore da circa 10 dollari e circa 99% di accuratezza; volto 2D con camera integrata e 95-99%; volto 3D con sensore da circa 50 dollari e oltre il 99%; iride ancora costosa; voce economica ma vulnerabile ad attacchi. Oltre a costo e accuratezza contano la resistenza agli attacchi (presentation attack, deepfake), la privacy (sorveglianza con riconoscimento facciale), l'accettazione degli utenti (l'iride è meno accettata dell'impronta) e la possibilità di rilevare che il campione è "vivo" (liveness detection).

Un sistema biometrico generico ha una fase di **enrollment** (si crea l'associazione fra utente e caratteristiche biometriche) e poi la **verifica** (conferma che l'utente dichiarato sia quello reale) o l'**identificazione** (di un utente sconosciuto). Il confronto tra caratteristica presentata e di riferimento si riduce a un singolo valore numerico s: se supera una soglia t si dichiara una corrispondenza. La scelta della soglia fa compromesso fra falsi accetti e falsi rifiuti, descritto dalle curve operative (figura non letta [DA VERIFICARE]). Benchmark moderni (slide): iride FMR circa 0,00001% con FNMR 0,1%; impronta FMR circa 0,01% con FNMR 1%; volto con deep learning FMR circa 0,1% con FNMR 1%; voce FMR 1-2% con FNMR 5-10%. I rischi sono i presentation attack e i replay.

## Protocolli challenge-response

Su Internet l'autenticazione è più complicata: ci sono intercettazione, cattura di password e replay di sequenze di autenticazione. Si usa quasi sempre un protocollo **challenge-response**. Nella versione classica: (1) l'utente invia il nome U all'host; (2) l'host genera un numero casuale r e rimanda (r, h(), f()), dove h e f sono funzioni hash/crittografiche; (3) il client calcola f(r, h(P)) con la password; (4) lo invia all'host; (5) l'host verifica che il valore coincida con quello calcolato dalla password memorizzata per U; (6) l'host risponde sì o no. Limiti: replay, assenza di autenticazione reciproca, password conservata sull'host. Protocolli moderni come **SRP** (Secure Remote Password) non inviano mai la password, nemmeno hashata, e danno autenticazione reciproca.

Un "template" biometrico sul server non andrebbe tenuto. Con **FIDO2/WebAuthn** la verifica biometrica è locale: la biometria sblocca una chiave privata sul dispositivo, e al server arriva solo una prova crittografica a chiave pubblica; i dati biometrici non lasciano il dispositivo. Le **passkey** sono il nome consumer per le credenziali FIDO2.

## Attacchi e difese

Le slide classificano: **client attack** (l'avversario tenta di autenticarsi senza accesso all'host né al canale), **host attack** (diretto al file degli utenti sull'host dove stanno password, codici dei token o template biometrici), **eavesdropping** (osservazione da vicino, per esempio shoulder surfing), **replay** (ripetere una risposta già catturata), **Trojan horse** (applicazione o dispositivo che finge di essere autentico per catturare password, codice o dato biometrico), **denial of service** (bloccare il servizio con molti tentativi), **MFA fatigue** (inondare l'utente di richieste di approvazione MFA finché accetta per stanchezza: esempio, violazione Uber 2022).

Difese tipiche per tipo di attacco e di autenticatore: contro i client attack su password, grandi spazi di chiavi e tentativi limitati; contro gli host attack, hashing, grande entropia e protezione del file delle password, e per i template biometrici l'autenticazione del dispositivo di cattura; contro l'eavesdropping, diligenza dell'utente e revoca rapida da parte dell'amministratore, multifattore; contro il replay, challenge-response e password monouso; contro il Trojan horse, autenticazione del client o del dispositivo di cattura dentro il perimetro di sicurezza; contro il DoS, il blocco dopo molti tentativi falliti e l'uso di un token insieme alla password.

## Cose da saper fare all'esame

- Distinguere autenticazione e autorizzazione e dire perché la prima precede la seconda.
- Elencare i quattro fattori con esempi e spiegare l'autenticazione multifattore.
- Spiegare salt, dizionario e rainbow table, e confrontare schema UNIX originale, MD5-crypt, bcrypt e SHA-512/yescrypt; riconoscere i prefissi di `/etc/shadow`.
- Scrivere la formula del TOTP e spiegare perché è resistente al replay.
- Descrivere il ciclo enrollment-verifica di un sistema biometrico, la soglia e il compromesso FMR/FNMR.
- Descrivere il challenge-response classico, i suoi limiti e come FIDO2/SRP li superano.
- Elencare attacchi (client, host, eavesdropping, replay, Trojan, DoS, MFA fatigue) con la difesa corrispondente.

## Dubbi

- Le curve operative della biometria, il grafico di costo-accuratezza e la figura sul modello NIST sono immagini non lette [DA VERIFICARE sul PDF].
- Le slide non spiegano come funziona la "dynamic truncation" del TOTP (dettaglio dell'RFC 4226): non è nel materiale.
- Differenza fra AAL2 e AAL3: nel testo estratto le due descrizioni sono quasi identiche [DA VERIFICARE].
