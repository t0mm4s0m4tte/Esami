# 04 - Progettazione: requisiti, modello E-R, ristrutturazione e traduzione logica

**Fonte:** doc Drive "Basi di Dati - Appunti" (Laboratorio 01, 03, 04, 05) + slide Lab. Corso B.

## Mappa
1. Ciclo di vita e fasi della progettazione
2. Raccolta/pulizia requisiti (glossario)
3. Modello E-R: entità, relazioni, attributi, cardinalità, identificatori, generalizzazioni
4. Pattern e reificazione; strategie; qualità dello schema
5. Progettazione logica: carico, ridondanze, eliminazione generalizzazioni, traduzione
6. Caso Impiegati/Organigramma

## 1. Fasi

La progettazione di una base di dati è un pezzo del ciclo di vita del sistema informativo, che comprende studio di fattibilità, raccolta e analisi dei requisiti, progettazione, implementazione, validazione/collaudo e funzionamento. Dentro la progettazione dei dati si distinguono tre fasi con obiettivi diversi:
1. la **concettuale** stabilisce *cosa* rappresentare, producendo con il modello E-R uno schema indipendente dal DBMS;
2. la **logica** stabilisce *come* rappresentarlo nel modello relazionale, tramite ristrutturazione e normalizzazione;
3. la **fisica** decide la memorizzazione e punta all'efficienza.

L'ordine conta: un errore concettuale non si ripara con l'ottimizzazione fisica.

## 2. Requisiti

I requisiti arrivano da interviste, da normative, regolamenti e modulistica e da eventuali sistemi legacy, e di norma sono ambigui. La pulizia segue cinque regole:
1. costruire un **glossario** che risolva sinonimi e omonimi;
2. astrarre il concetto (per esempio "giudizio finale" diventa "votazione in decimi", che è computabile);
3. standardizzare la sintassi ("Per [entità] rappresentiamo [attributi]");
4. scomporre in frasi atomiche;
5. separare dati e funzioni.

Le specifiche così ottenute si riorganizzano per cluster omogenei e si affianca l'analisi delle **operazioni** con la loro frequenza, che servirà nella fase logica.

## 3. Modello E-R

Il modello E-R descrive la realtà con pochi costrutti. Un'**entità** è una classe di oggetti con esistenza autonoma; le sue occorrenze sono le istanze (per esempio "Sean Penn"). Una **relazione** (associazione) è un legame fra entità, e una sua occorrenza è una ennupla di occorrenze di entità. Di qui una regola sottile: **non possono esistere ennuple identiche**, per cui uno studente non può sostenere due volte lo stesso esame a meno che non ci sia un attributo aggiuntivo come la Data. Le relazioni possono essere binarie, ternarie (in cui contano i ruoli) o **ricorsive**, nel qual caso i ruoli vanno esplicitati se non sono simmetrici (Persona genitore/figlio).

Gli **attributi** descrivono le entità e le relazioni, e hanno una propria cardinalità: obbligatorio (1,1), opzionale (0,1), multivalore (1,N) o (0,N), oppure composto (per esempio Indirizzo = Via, Civico, CAP). La **cardinalità di relazione** (min,max) dice con quante occorrenze della relazione partecipa un'entità: min 0 indica partecipazione opzionale, 1 obbligatoria; max 1 indica univoca, N molti.

Gli **identificatori** sono interni (formati da attributi propri) o esterni (ottenuti tramite una relazione con cardinalità (1,1)); non devono esistere cicli di identificazione esterna, e hanno identificatori solo le entità, non le relazioni.

Le **generalizzazioni (ISA)** modellano che un'entità genitore ha entità figlie e vengono classificate lungo due assi: **totale** (t, ogni occorrenza del genitore appartiene a una figlia) o **parziale** (p); **esclusiva** (e) o **sovrapposta** (s). Le figlie ereditano attributi e relazioni del genitore. Una generalizzazione (p,s) si può rendere (p,e) aggiungendo un'entità "intersezione" (Studente-Lavoratore).

Lo schema E-R si completa con la **documentazione**: un dizionario dei dati (entità e relazioni) e le **regole aziendali**, che sono o asserzioni, cioè vincoli ("il direttore afferisce al suo dipartimento"), o derivazioni ("budget = 3 × somma stipendi"), che il diagramma non riesce a esprimere. Come controllo finale vale il **vademecum**:
- ogni entità ha un identificatore;
- gli identificatori esterni sono (1,1);
- niente cicli esterni né cicli ISA;
- min ≤ max;
- gli attributi composti servono a raggruppare;
- niente identificatori sulle relazioni.

**Esempi svolti**: Azienda -> Dipartimento identificato da Nome + Sede (identificazione esterna 1,1); l'attributo Indirizzo del dipartimento è eliminato perché ridondante (è quello della Sede). Veicoli -> ISA Veicolo(Telaio) con Camion, Motocicli (Motorini <125cc, Moto >125cc), Automobile (per lunghezza e cilindrata).

## 4. Pattern, reificazione, strategie

Alcune situazioni si ripresentano e hanno una soluzione tipica:
- il **part-of** modella una dipendenza esistenziale: Cinema --(1,N)-- Sala(1,1);
- l'**instance-of** separa un concetto astratto dalle sue istanze concrete: Volo (astratto) --(1,N)-- Volo Reale (data, orario);
- la **storicizzazione** si ottiene con un'entità intermedia che porta le date: Persona -(1,1)- Impiego -(0,N)- Azienda, con DataInizio/DataFine su Impiego;
- l'**evoluzione di concetto** è il caso Progetto -> Progetto Accettato, in cui solo la figlia ha il Finanziamento;
- per le **ternarie**, se esistono dipendenze funzionali (per esempio un operatore svolge sempre la stessa attività in una sede) si può scomporle in binarie.

La **reificazione** è la tecnica che unifica molti di questi casi: promuovere una relazione (o un attributo) a entità. Per esempio l'Esame, relazione N:M tra Studente e Corso con attributi Voto e Data, diventa un'entità Esame con due relazioni 1:N.

Quanto alla **strategia** di costruzione dello schema, si può procedere top-down, bottom-up, inside-out (a macchia d'olio) oppure in modo **misto**, con uno schema scheletro da raffinare, che è lo standard industriale. La **qualità** di uno schema si misura su correttezza, completezza, leggibilità e minimalità.

**Caso Società di Formazione**: il perno è l'Edizione (instance-of di Corso) collegata a Partecipanti e Docente; lo storico lavorativo è reificato (Impiego); ci sono le gerarchie Partecipante (Libero professionista / Dipendente) e Docente (Interno / Collaboratore esterno); la votazione è in decimi.

## 5. Progettazione logica

Il prodotto della fase logica è lo schema relazionale; i passi sono la **ristrutturazione dello schema E-R** e la successiva traduzione. Il motivo della ristrutturazione è che lo schema concettuale non è ancora direttamente implementabile (il modello relazionale è "piatto") né ottimizzato; l'obiettivo è garantire l'integrità minimizzando il degrado prestazionale.

Per valutare le prestazioni si considerano lo **spazio** (volume delle occorrenze) e il **tempo** (numero di occorrenze visitate). Le operazioni si dividono in **interattive** (frequenti e puntuali) e **batch** (rare e massive), con la regola **80-20** che dice che poche operazioni generano la gran parte del carico. Negli accessi, quelli in **scrittura pesano 2×** la lettura.

L'**analisi di ridondanza** confronta il costo di mantenere un dato derivato con quello di ricalcolarlo. Esempio con Città (200 occorrenze) e Persona (1.000.000) e l'attributo derivato "n° abitanti" in Città:
- Op1: 500 inserimenti persona/giorno. Senza ridondanza 500 S = 1000. Con: 500 S + 500 L + 500 S (Città) = 1000+500+1000 = 2500.
- Op2: stampa città con abitanti, 2/giorno. Senza: 2 L + 10.000 L (residenze) = 10.002. Con: 2.
- Totale (calcolo mio): senza ≈ 11.000, con ≈ 2.500. La ridondanza conviene (costo memoria < 1KB).

Il bilancio qualitativo è riassunto in tabella:

| Vantaggi ridondanza | Svantaggi |
|---|---|
| query più semplici, letture veloci | update più costosi, rischio incoerenza, più spazio |

Poiché il relazionale non ha le gerarchie, le **generalizzazioni vanno eliminate**, e le tre opzioni dipendono da come si accede ai dati:

| Opzione | Quando | + | − |
|---|---|---|---|
| Accorpamento nel padre | accessi a padre e figlie contestuali | meno join | molti NULL |
| Accorpamento nelle figlie | accessi alle figlie distinti; generalizzazione **totale** | accessi rapidi | duplicazione attributi del padre |
| Sostituzione con relazioni | accessi separati; generalizzazione **parziale** | zero NULL | più accessi per ricomporre |

Un'altra ristrutturazione è il **partizionamento/accorpamento** di concetti, per esempio separare dati anagrafici e lavorativi, o dividere la Composizione Giocatore-Squadra in Attuale e Passata.

**Traduzione in relazionale.** Ogni entità diventa una tabella R(A1..An) con PK uguale all'identificatore. Per le associazioni la regola dipende dalla cardinalità:
- **N:N** -> nuova relazione con le PK delle entità coinvolte (+ attributi dell'associazione).
- **1:N** -> la FK va nell'entità con max 1 (fusione); se la partecipazione è (0,1) l'attributo è nullable (*).
- **1:1** -> accorpare se gli accessi sono simultanei, altrimenti tenere separate.
- **Ricorsive** -> es. Composizione(Composto, Componente, Quantità) con entrambi FK su Prodotto(Codice), ruoli ridenominati.

Sugli identificatori: la PK dev'essere immutabile, semplice e non opzionale; altrimenti si introducono **chiavi surrogate**.

**Caso Sede-Dipartimento-Impiegato-Progetto**:
- Sede(Città,Via,CAP);
- Progetto(Nome,Budget);
- Dipartimento(Nome,Sede,Telefono,Direttore);
- Impiegato(Codice,Cognome,NomeDip*,SedeDip*,Data*);
- Partecipazione(Impiegato,Progetto).

FK: Dipartimento.Sede -> Sede, Dipartimento.Direttore -> Impiegato, Impiegato(NomeDip,SedeDip) -> Dipartimento, Partecipazione -> Impiegato/Progetto. La scelta è mettere la FK nell'Impiegato (NULL per i non assegnati), evitando un join; se i senza-dipartimento sono tanti, meglio una tabella di afferenza separata.

## 6. Caso Impiegati

IMPIEGATI(MATR, Cognome, Nome, Età, Stipendio) · ORGANIGRAMMA(Capo, Impiegato), entrambi FK su IMPIEGATI.MATR: è una relazione ricorsiva Capo-Impiegato, navigabile con self-join. Gerarchia: 574 -> {203 -> {405 -> 461, 501}, 530}. Dati: 203 Neri 50 anni 40; 574 Bisi 60/60; 461 Bargio 30/61; 530 Belli 40/38; 405 Mizzi 55/60; 501 Monti 25/35.

## Cose da saper fare all'esame
- Da un testo: ripulire con glossario, individuare entità/relazioni/attributi/cardinalità/identificatori, disegnare lo schema E-R con gerarchie e documentarlo (dizionario + regole).
- Riconoscere quando reificare (relazione con attributi propri, storicizzazione, instance-of).
- Ristrutturare: valutare una ridondanza con la tabella degli accessi (pesi S=2); scegliere come eliminare una ISA motivando (totale/parziale, accessi).
- Tradurre E-R -> schema relazionale con PK/FK/nullable e disegnare i vincoli referenziali.
- Derivare le dipendenze funzionali da uno schema E-R (vedi file 05).

## Dubbi
- [DA VERIFICARE] Il calcolo ridondanza nelle note riporta "circa 3.500 vs 12.000 accessi/giorno"; coi dati dell'esempio io ottengo ≈2.500 vs ≈11.000 (stesso verdetto). Controllare sulle slide.
- [DA VERIFICARE] Notazione grafica E-R (simboli per ISA, cardinalità, identificatori esterni): le note sono testuali, non ho i diagrammi.
- [DA VERIFICARE] Lab 02 e Lab 06 non compaiono nelle note (numerazione salta): verificare se esistono nelle slide Lab.
