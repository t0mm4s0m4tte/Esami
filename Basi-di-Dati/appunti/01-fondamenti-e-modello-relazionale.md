# 01 - Fondamenti e Modello Relazionale

**Fonte:** doc Drive "Basi di Dati - Appunti" (Teoria, Lezioni 01-02) + slide Lezioni 01-02. Corso B, UniTO.

## Mappa

- [Concetti base](#concetti-base)
- [ANSI/SPARC (1975, 3 livelli)](#ansisparc-1975-3-livelli)
- [Ciclo di progettazione](#ciclo-di-progettazione)
- [Modello relazionale](#modello-relazionale)
- [Storia (1 riga)](#storia-1-riga)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Concetti base

Ogni organizzazione ha un **sistema informativo**: il sottosistema che acquisisce, elabora, conserva e distribuisce le informazioni necessarie al suo funzionamento (ciclo: raccolta, archiviazione, elaborazione, distribuzione). Il **sistema informatico** è soltanto la parte di questo sistema che è automatizzata: un'azienda ha un sistema informativo anche se tiene tutto su fogli di carta. Su questo sfondo va distinto il **dato**, una rappresentazione formalizzata come "Mario 275", dall'**informazione**, che è il dato interpretato nel suo contesto (275 è il numero di una stanza? un importo?). Una **base di dati** è allora una collezione di dati *strutturati, persistenti* (con vita indipendente dai programmi che li usano) e *a minima ridondanza*.

L'idea di base di dati nasce come reazione al modello degli **archivi indipendenti**, in cui ogni applicazione gestisce i propri file. Il risultato è eterogeneità dei formati, difficoltà di interscambio, ridondanza (e quindi incoerenza tra copie dello stesso dato) e mancanza di una visione unitaria dell'organizzazione. Lo slogan che riassume il cambio di prospettiva è "Prima i dati, poi le applicazioni": si progetta il patrimonio informativo una volta sola e le applicazioni vi si appoggiano. A garantirlo è il **DBMS**, che offre:
- la definizione degli schemi (i metadati);
- i vincoli di integrità;
- la gestione degli accessi e della concorrenza;
- il recovery dopo i guasti.

Sono tutte funzioni che con i file sparsi toccherebbe reimplementare in ogni programma.

## ANSI/SPARC (1975, 3 livelli)

L'architettura ANSI/SPARC organizza il DBMS su tre livelli, pensati per isolare chi usa i dati dai dettagli di come sono memorizzati. Il livello **logico** è il perno: descrive l'intero patrimonio informativo con un unico schema. Sotto di esso il livello **interno** si occupa della memorizzazione fisica e delle vie d'accesso; sopra, il livello **esterno** offre a ogni utente o applicazione la propria vista, cioè solo la porzione di dati che gli interessa.

| Livello | Contenuto | Indipendenza |
|---|---|---|
| Esterno | viste utente/applicazione | logica (solo in parte) |
| Logico | schema dell'intero patrimonio informativo | perno |
| Interno | memorizzazione fisica, vie d'accesso | fisica (garantita) |

Questa stratificazione produce i due tipi di indipendenza, che sono la ragione pratica per cui l'architettura esiste e una domanda teorica ricorrente. L'**indipendenza fisica** significa che si possono cambiare indici, disco o organizzazione dei file senza toccare i programmi. L'**indipendenza logica** significa che si può modificare lo schema logico senza rompere le applicazioni che non usano i dati modificati (le viste fanno da cuscinetto, ma solo in parte, per questo nella tabella è indicata come parziale).

## Ciclo di progettazione

La costruzione di una base di dati procede per livelli di astrazione decrescente:
1. **analisi dei requisiti** (indipendente dal DBMS);
2. progettazione **concettuale** (modello E-R, anch'essa indipendente dal DBMS);
3. progettazione **logica** (modello relazionale, che dipende dal tipo di DBMS);
4. progettazione **fisica** (dipende dal DBMS specifico).

Dettagli in `04-progettazione-er-e-logica.md`.

## Modello relazionale

Il modello relazionale distingue con nettezza lo **schema** (l'intensione, statico) dall'**istanza** o stato (l'estensione, dinamica). Lo schema è l'insieme di attributi con i rispettivi tipi {A1:T1,...,An:Tn}; l'istanza è un insieme r di tuple che cambia nel tempo mentre lo schema resta fisso. Si parla di **relazione di Codd** perché l'ordine degli attributi è irrilevante e la tupla è definita come funzione totale t: A -> D, non come sequenza di valori. Il modello è *value-oriented*: non esistono puntatori e ci si "muove" fra tabelle soltanto confrontando valori, ed è proprio questo che renderà naturale il join. Per questo motivo conviene evitare omonimie e sinonimie nei nomi degli attributi.

L'informazione mancante o ignota si rappresenta con **NULL**, che appartiene a ogni dominio. È preferibile ai dati fittizi (per esempio uno 0 al posto di un'età sconosciuta) perché questi falsano i calcoli, come le medie. Due misure descrivono una relazione: il **grado** è il numero di attributi (proprietà dello schema, almeno 1), la **cardinalità** è il numero di tuple (proprietà dell'istanza, anche 0).

### Vincoli

Non tutte le istanze costruibili sono accettabili: i vincoli dicono quali lo sono. I vincoli **locali** (intra-relazionali) riguardano una sola relazione: il dominio (l'atomicità dei valori è la 1NF), il NOT NULL, le restrizioni e i confronti (per esempio Inizio < Fine, età < 120).

La nozione centrale è quella di chiave:
- una **superchiave** sk ⊆ A è un insieme di attributi che identifica univocamente le tuple: t_i[sk]=t_j[sk] => t_i=t_j;
- una **chiave candidata** è una superchiave *minimale*, cioè a cui non si può togliere alcun attributo senza perdere la proprietà;
- la **chiave primaria** è la candidata scelta dal progettista, e tutti i suoi attributi sono NOT NULL.

Il secondo vincolo fondamentale è l'**integrità referenziale** (chiave esterna, FK): ∀ t ∈ r(Rs) ∃ t' ∈ r(Rh) con t[B]=t'[PK], con domini compatibili. A parole: ogni valore della FK deve comparire come chiave nella relazione referenziata. Oltre ai vincoli di schema ci sono le **business rules** (per esempio "ogni titolare di mutuo è titolare di c/c"). Lo **stato di una BD** è l'insieme delle istanze che soddisfano tutti i vincoli, locali e globali.

**Esempio** (RICOVERI(PAZ, Inizio, Fine, Reparto)): {PAZ,Inizio,Fine} è superchiave; {PAZ,Inizio} è chiave candidata, ed è minimale perché né PAZ né Inizio da soli bastano (un paziente può essere ricoverato più volte e in una data possono iniziare molti ricoveri).

### Schema di riferimento "RicoveriOspedalieri"
Lo schema usato in tutto il corso (e in questi appunti) è:
- PAZIENTI(COD, Cognome, Nome, Residenza, AnnoNascita);
- MEDICI(MATR, Cognome, Nome, Residenza, Reparto -> REPARTI);
- REPARTI(COD, Nome-Rep, Primario -> MEDICI);
- RICOVERI(PAZ -> PAZIENTI, Inizio, Fine, Reparto -> REPARTI).

Da notare la dipendenza circolare MEDICI-REPARTI (un medico appartiene a un reparto, un reparto ha un primario che è un medico), che avrà conseguenze sulla creazione delle tabelle in SQL.

## Storia (1 riga)
Anni '60 file system, gerarchico (IBM), reticolare (CODASYL) -> 1970 Codd, relazionale -> '80-'90 SQL-89/99, OO, distribuiti, OLAP -> oggi Big Data, NoSQL/NewSQL/GraphDB, coesistenza di tecnologie.

## Cose da saper fare all'esame
- Distinguere schema/istanza, grado/cardinalità, superchiave/candidata/primaria e **trovare le chiavi** di una tabella data.
- Scrivere il vincolo di integrità referenziale a parole e formalmente; dire se un'istanza lo viola.
- Spiegare ANSI/SPARC e i due tipi di indipendenza (domanda teorica ricorrente).
- Motivare perché il NULL è meglio di un valore fittizio.

## Dubbi
- [DA VERIFICARE] "crescita quadratica N·M" delle interfacce (nelle note scritto con ⍴ al posto di ×): solo concetto, non formula d'esame.
