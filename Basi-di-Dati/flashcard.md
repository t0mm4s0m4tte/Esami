# Flashcard - Basi di Dati

Formato: D: domanda / R: risposta. Le carte con [DA VERIFICARE] poggiano su punti dubbi degli appunti.

## 01 - Fondamenti e modello relazionale

D: Differenza tra sistema informativo e sistema informatico?
R: Il sistema informativo acquisisce, elabora, conserva e distribuisce le informazioni di un'organizzazione (esiste anche su carta); il sistema informatico è solo la sua parte automatizzata.

D: Differenza tra dato e informazione?
R: Il dato è una rappresentazione formalizzata ("Mario 275"); l'informazione è il dato interpretato nel suo contesto.

D: Cos'è una base di dati?
R: Collezione di dati strutturati, persistenti (vita indipendente dai programmi) e a minima ridondanza.

D: Quali problemi ha il modello ad archivi indipendenti rispetto al DBMS?
R: Eterogeneità dei formati, difficoltà di interscambio, ridondanza e incoerenza tra copie, nessuna visione unitaria. Slogan DBMS: "prima i dati, poi le applicazioni".

D: Quali funzioni offre un DBMS che con i file sparsi vanno reimplementate in ogni programma?
R: Definizione degli schemi (metadati), vincoli di integrità, gestione di accessi e concorrenza, recovery dopo i guasti.

D: Descrivi i tre livelli ANSI/SPARC.
R: Esterno (viste per utente/applicazione), logico (schema dell'intero patrimonio informativo, il perno), interno (memorizzazione fisica e vie d'accesso).

D: Cosa sono indipendenza fisica e indipendenza logica?
R: Fisica: si cambiano indici, disco, organizzazione dei file senza toccare i programmi (garantita). Logica: si modifica lo schema logico senza rompere le applicazioni che non usano i dati modificati (le viste aiutano, ma solo in parte).

D: Ordine delle fasi del ciclo di progettazione e dipendenza dal DBMS?
R: Requisiti, concettuale (E-R, indipendente dal DBMS), logica (relazionale, dipende dal tipo di DBMS), fisica (dipende dal DBMS specifico).

D: Schema e istanza di una relazione?
R: Schema = intensione, statico, insieme di attributi con tipi {A1:T1,...,An:Tn}; istanza = estensione, insieme di tuple che varia nel tempo.

D: Perché si parla di "relazione di Codd" e di modello value-oriented?
R: L'ordine degli attributi è irrilevante (tupla = funzione t: A -> D) e non esistono puntatori: ci si muove fra tabelle solo confrontando valori (da qui il join).

D: Perché usare NULL invece di un valore fittizio (es. età 0)?
R: I valori fittizi falsano i calcoli (es. le medie); NULL appartiene a ogni dominio e rappresenta informazione mancante o ignota.

D: Grado e cardinalità di una relazione?
R: Grado = numero di attributi (schema, almeno 1); cardinalità = numero di tuple (istanza, anche 0).

D: Definisci superchiave, chiave candidata, chiave primaria.
R: Superchiave: insieme di attributi che identifica univocamente le tuple. Candidata: superchiave minimale (nessun attributo eliminabile). Primaria: candidata scelta dal progettista, tutti gli attributi NOT NULL.

D: RICOVERI(PAZ, Inizio, Fine, Reparto): {PAZ,Inizio,Fine} e {PAZ,Inizio} cosa sono?
R: {PAZ,Inizio,Fine} è superchiave non minimale; {PAZ,Inizio} è chiave candidata (minimale: un paziente può avere più ricoveri e in una data iniziano molti ricoveri).

D: Formula dell'integrità referenziale?
R: ∀ t ∈ r(Rs) ∃ t' ∈ r(Rh) con t[B]=t'[PK], domini compatibili: ogni valore della FK compare come chiave nella relazione referenziata.

D: Cosa sono i vincoli locali (intra-relazionali)?
R: Vincoli su una sola relazione: dominio (atomicità = 1NF), NOT NULL, restrizioni e confronti (Inizio < Fine, età < 120).

D: Perché lo schema Ricoveri ha una dipendenza circolare e che conseguenza ha in SQL?
R: MEDICI.Reparto -> REPARTI e REPARTI.Primario -> MEDICI: si crea una tabella senza la FK e la si aggiunge dopo con ALTER TABLE.

## 02 - Algebra e calcolo relazionale

D: Perché l'algebra relazionale è "procedurale" e il risultato non ha duplicati?
R: Si descrive come ottenere il risultato componendo operatori; le relazioni sono insiemi, quindi niente duplicati. La chiusura degli operatori permette di annidarli.

D: Quali requisiti per unione, intersezione e differenza? Quale non è commutativa?
R: Schemi identici (compatibili). La differenza non è commutativa.

D: A cosa serve la ridenominazione ρ?
R: Cambia i nomi degli attributi senza toccare i dati: rende compatibili due schemi e permette il self-join.

D: Definisci theta-join, equi-join, natural join.
R: Theta-join r ⋈_Θ s = σ_Θ(r×s). Equi-join: Θ è uguaglianza. Natural join: equi-join sugli attributi omonimi, con colonne duplicate rimosse.

D: Cos'è il semi-join r ⋉ s?
R: Le tuple di r con almeno una corrispondenza in s, senza colonne di s.

D: Quando π_X(r) ha la stessa cardinalità di r?
R: Quando X contiene una superchiave; altrimenti la cardinalità può scendere (duplicati eliminati).

D: Perché π_{COD,Nome} seguita da σ_{Residenza='TO'} è sbagliata?
R: Dopo la proiezione Residenza non esiste più: il predicato di σ deve usare attributi presenti nell'argomento.

D: Algebra: codice e nome dei pazienti residenti a TO o VC.
R: π_{COD,Nome}(σ_{Residenza='TO' ∨ Residenza='VC'}(PAZIENTI))

D: Algebra: medici che non sono primari.
R: π_MATR(MEDICI) − ρ_{MATR←Primario}(π_Primario(REPARTI)). Sui dati: 461, 501.

D: Algebra: pazienti con almeno due ricoveri.
R: Self-join: π_{R1.PAZ}(σ_{R1.PAZ=R2.PAZ ∧ R1.Inizio<R2.Inizio}(ρ_R1(RICOVERI) × ρ_R2(RICOVERI))). L'algebra non sa contare.

D: Algebra: pazienti con un solo ricovero.
R: π_PAZ(RICOVERI) − π_{R1.PAZ}(σ_{R1.PAZ=R2.PAZ ∧ R1.Inizio≠R2.Inizio}(ρ_R1(RICOVERI)×ρ_R2(RICOVERI))) ("almeno 1" meno "almeno 2"). Sui dati: B444.

D: Differenza tra negazione inessenziale ed essenziale?
R: Inessenziale: basta un confronto ≠ (non residenti a TO). Essenziale: riguarda l'appartenenza a una relazione (non sono primari) e serve la differenza (Closed World Assumption).

D: Metodo U − P per la negazione essenziale?
R: Calcola l'universo U, calcola P (chi soddisfa la condizione positiva), risultato R = U − P. Gli schemi di U e P devono coincidere (stessa proiezione).

D: Algebra: come si ottiene il massimo di r(N) senza operatore MAX?
R: r − π_{N1}(σ_{N1<N2}(ρ_{N1}(r) × ρ_{N2}(r))): si tolgono gli elementi che hanno qualcuno più grande. Con {3,5,2} si ottiene {5}.

D: Formula del quoziente r(A,B) ÷ s(B)?
R: π_A(r) − π_A((π_A(r) × s) − r). Costruisco ciò che dovrebbe esistere, sottraggo l'esistente per avere i mancanti, tolgo dall'universo gli A con almeno un mancante.

D: Algebra: studenti che hanno superato tutti i corsi del PIANO.
R: π_MATR(ESAMI) − π_MATR((π_MATR(ESAMI)×PIANO) − π_{MATR,Corso}(ESAMI)).

D: Tabelle di verità 3VL: T AND U, F AND U, T OR U, F OR U, NOT U?
R: T AND U = U; F AND U = F; T OR U = T; F OR U = U; NOT U = U.

D: Quando una tupla è selezionata con la logica a 3 valori?
R: Solo se il predicato è True; Unknown è scartato come False.

D: Perché `Status=10 OR Status<>10` non restituisce le righe con Status NULL?
R: Per esse entrambi i disgiunti sono Unknown, quindi la disgiunzione è Unknown: il terzo escluso non vale. `A = NULL` non funziona mai, si usa IS [NOT] NULL.

D: Cosa fanno left, right e full outer join?
R: Conservano tutta la tabella sinistra / destra / entrambe, riempiendo con NULL i campi mancanti (le dangling tuples dell'inner join non spariscono).

D: Equivalenza: selezione e join.
R: σ_p(r ⋈_Θ s) ≡ σ_p(r) ⋈_Θ s solo se gli attributi di p appartengono a r. Anche σ_{p∧q}(r) ≡ σ_p(σ_q(r)) e σ_p(r−s) ≡ σ_p(r) − σ_p(s).

D: La proiezione si distribuisce su unione e differenza?
R: Sull'unione sì: π_X(r∪s) ≡ π_X(r) ∪ π_X(s). Sulla differenza NO.

D: Controesempio per π_A(R−S) ≠ π_A(R) − π_A(S)?
R: R={(a,b1)}, S={(a,b2)}: π_A(R−S)={a}, mentre π_A(R)−π_A(S)=∅.

D: Forma di una espressione del calcolo su tuple (TRC) e corrispondenza con SQL?
R: { T | L | F }: Target list, Range list, Formula. Corrispondono a SELECT, FROM, WHERE (join come uguaglianze nel WHERE).

D: TRC: medici (cognome, nome) del reparto in cui è stato ricoverato A102.
R: {m.(Cognome,Nome) | m(MEDICI) | ∃r(RICOVERI)(r.Reparto=m.Reparto ∧ r.PAZ='A102')}

D: TRC: pazienti ricoverati in ogni reparto.
R: {p.* | p(PAZIENTI) | ∀r(REPARTI)(∃r'(RICOVERI)(r.COD=r'.Reparto ∧ p.COD=r'.PAZ))}. In SQL: doppio NOT EXISTS.

D: A cosa serve l'implicazione → nel TRC?
R: A restringere l'universo nei ∀, grazie a α → β ≡ ¬α ∨ β.

D: Limiti di TRC e algebra?
R: Il TRC non esprime l'unione in una sola espressione; né TRC né algebra esprimono la ricorsione (chiusura transitiva, es. antenati). Rimedio: CTE ricorsive di SQL moderno.

D: Cardinalità del join nei casi particolari. [DA VERIFICARE]
R: Appunti vuoti; dalle slide (da confermare): join FK->PK ha cardinalità del lato FK; senza attributi comuni degenera in prodotto.

## 03 - SQL

D: Che differenza c'è tra char(n), varchar(n), numeric(p,s), decimal(p,s)?
R: char(n) lunghezza fissa, varchar(n) variabile; numeric(p,s) esatto, decimal(p,s) con precisione minima. Non è ammesso `interval year to minute` (mesi e giorni hanno durata variabile).

D: SQL: crea un dominio Temperatura decimal(3,1) tra 35.0 e 42.0, default NULL.
R: CREATE DOMAIN Temperatura AS decimal(3,1) DEFAULT NULL CHECK (value >= 35.0 AND value <= 42.0);

D: SQL: come si cambia il default di un dominio?
R: ALTER DOMAIN Temperatura SET DEFAULT 37.0; (il dominio va dichiarato prima dell'uso).

D: Differenza tra `Nome UNIQUE, Cognome UNIQUE` e `UNIQUE(Nome,Cognome)`?
R: Il primo vieta due "Mario" o due "Rossi"; il secondo vieta solo la coppia identica. UNIQUE dichiara una superchiave e ammette NULL.

D: Master e Slave nell'integrità referenziale: che modifiche sono rifiutate e quali configurabili?
R: Una modifica illegale sullo Slave (FK che non punta a nulla) è rifiutata; per le modifiche sul Master (la tabella referenziata) si dichiara la reazione.

D: Reazioni ON UPDATE/ON DELETE e loro effetto?
R: CASCADE propaga; SET NULL pone la FK a NULL; SET DEFAULT pone il default; NO ACTION blocca l'operazione sul Master (default).

D: SQL: crea Ricoveri(PAZ, Inizio, Fine, Reparto) con PK (PAZ,Inizio) e FK verso Pazienti(COD) e Reparti(COD).
R: CREATE TABLE Ricoveri (PAZ varchar(4) NOT NULL, Inizio date NOT NULL, Fine date, Reparto char NOT NULL, PRIMARY KEY (PAZ,Inizio), FOREIGN KEY (PAZ) REFERENCES Pazienti(COD) ON UPDATE CASCADE, FOREIGN KEY (Reparto) REFERENCES Reparti(COD) ON UPDATE CASCADE);

D: Nello script Ricoveri delle note, cosa è incoerente? [DA VERIFICARE]
R: `Reparto char NOT NULL` con `ON DELETE SET NULL`: SET NULL su una colonna NOT NULL fallisce.

D: Come si risolve la dipendenza circolare MEDICI-REPARTI in SQL?
R: Si crea Reparti senza la FK su Primario, poi Medici, poi ALTER TABLE Reparti ADD FOREIGN KEY (Primario) REFERENCES Medici(MATR).

D: SQL: aggiungi la colonna Referto, elimina il vincolo fk_RicPaz, elimina una tabella con le dipendenze.
R: ALTER TABLE Ricoveri ADD COLUMN Referto varchar(50); ALTER TABLE Ricoveri DROP CONSTRAINT fk_RicPaz; DROP TABLE t CASCADE; (CASCADE elimina anche gli oggetti dipendenti, es. le FK).

D: Cosa fa DELETE FROM T senza WHERE? E INSERT senza lista attributi?
R: DELETE senza WHERE cancella tutte le righe. INSERT senza lista di attributi è sconsigliato: il codice si rompe se la tabella cambia.

D: Ordine logico di valutazione di SELECT-FROM-WHERE?
R: Prodotto cartesiano (FROM), selezione (WHERE), proiezione (SELECT). SQL tiene i duplicati: DISTINCT per il rigore insiemistico.

D: Significato di `_` e `%` in LIKE; `'%a_k%'` equivale a `'%a%k%'`?
R: `_` = esattamente un carattere, `%` = sequenza qualunque anche vuota. No: `'%a_k%'` richiede esattamente un carattere tra a e k.

D: Come si mostrano i NULL con un valore sostitutivo?
R: COALESCE(Status,0); per cercarli si usa IS NULL.

D: Qual è la trappola del join implicito?
R: Dimenticare la condizione di join (FROM S, SP WHERE ...) produce un prodotto cartesiano.

D: SQL (S-P-SP): coppie di fornitori della stessa città senza auto-coppie né coppie speculari.
R: SELECT DISTINCT S1.SNum, S2.SNum, S1.City FROM S S1 JOIN S S2 ON S1.City=S2.City WHERE S1.SNum < S2.SNum; (`<` e non `<>`).

D: Trappola S5: perché `(S LEFT JOIN SP ON ...) JOIN P ON SP.PNum=P.PNum` perde S5?
R: Per S5 SP.PNum è NULL e il NULL non soddisfa la condizione del join interno successivo. Per tenerlo anche il secondo join deve essere LEFT.

D: Come trattano i NULL COUNT(*), COUNT(attr), SUM, AVG?
R: COUNT(*) conta tutte le righe; COUNT(attr) solo i non-NULL (accetta DISTINCT); SUM e AVG ignorano i NULL. MAX/MIN anche su stringhe.

D: Ordine di esecuzione di WHERE, GROUP BY, HAVING e conseguenze?
R: WHERE (righe) -> GROUP BY -> SELECT/aggregati -> HAVING (gruppi). Niente aggregati nel WHERE; condizione sulla riga in WHERE, sul gruppo in HAVING.

D: SQL: città con almeno 2 fornitori di status >= 20.
R: SELECT City, COUNT(*) FROM S WHERE Status >= 20 GROUP BY City HAVING COUNT(*) >= 2; -> London, 2

D: SQL: quantità totale fornita da ogni fornitore.
R: SELECT SNum, SUM(QTY) FROM SP GROUP BY SNum; -> S1 1300, S2 700, S3 200, S4 900.

D: Regola SQL-92 vs SQL-99/PostgreSQL sugli attributi del SELECT con GROUP BY?
R: SQL-92: ogni attributo nel SELECT o è aggregato o è nel GROUP BY. SQL-99 e PostgreSQL ammettono anche attributi funzionalmente dipendenti dal raggruppamento.

D: UNION, INTERSECT, EXCEPT: requisiti e duplicati?
R: Stesso numero di colonne e tipi corrispondenti; eliminano i duplicati, ALL li mantiene. EXCEPT non è riproducibile con join semplici.

D: Differenza tra subquery stratificata e correlata; dove possono comparire?
R: Stratificata: valutata una volta, indipendente dall'esterno. Correlata: rivalutata per ogni riga esterna. Compaiono in WHERE, FROM (qui non correlate), SELECT (scalari).

D: SQL: fornitori con status inferiore alla media.
R: SELECT SNum FROM S WHERE Status < (SELECT AVG(Status) FROM S); (media 22 -> S1, S2, S4). Per "sopra la media" -> S3, S5.

D: Equivalenza tra IN, NOT IN e ANY/ALL?
R: IN equivale a = ANY; NOT IN equivale a <> ALL. ANY = almeno uno, ALL = tutti.

D: Pericolo di NOT IN / ALL con NULL?
R: Un NULL nell'insieme rende Unknown il predicato e il risultato può diventare vuoto (3VL).

D: SQL: fornitori che non forniscono parti blu.
R: SELECT DISTINCT SNum FROM S WHERE SNum NOT IN (SELECT SNum FROM SP WHERE PNum IN (SELECT PNum FROM P WHERE Color='Blue')); -> S2, S3, S5.

D: SQL: fornitori che forniscono tutte le parti.
R: SELECT SNum FROM S WHERE NOT EXISTS (SELECT * FROM P WHERE NOT EXISTS (SELECT * FROM SP WHERE SP.SNum=S.SNum AND SP.PNum=P.PNum)); -> S1. [DA VERIFICARE sulle slide: schema standard non scritto nelle note]

D: SQL: fornitori di Londra che non forniscono P4.
R: SELECT SNum FROM S WHERE City='London' AND NOT EXISTS (SELECT * FROM SP WHERE SNum=S.SNum AND PNum='P4'); -> nessuno (S1 e S4 forniscono P4).

D: Come funziona la valutazione di EXISTS?
R: Per ogni riga esterna si sostituiscono i suoi valori nella subquery e la si esegue: EXISTS è TRUE se produce almeno una riga. Visibilità: le variabili esterne sono visibili nelle subquery annidate, non tra subquery sorelle.

D: Quando usare join, insiemistici, nidificate?
R: Join per combinare dati, insiemistici per classificare, nidificate (EXISTS/NOT EXISTS) per esistenza e negazione.

D: Cosa significa che PostgreSQL è object-relational?
R: Supporta tipi definiti dall'utente, ereditarietà di tabelle (capitals eredita cities) e funzioni definite dall'utente; risolve l'impedance mismatch SQL/OO.

D: Cos'è MVCC e a cosa serve VACUUM?
R: Ogni transazione lavora su uno snapshot (XID): lettori e scrittori non si bloccano; le modifiche creano nuove versioni e VACUUM recupera quelle obsolete.

D: Perché usare i trigger invece di controlli nell'applicazione?
R: Sono procedure automatiche su INSERT/UPDATE/DELETE: spostano i controlli nel database e valgono per ogni client. EXPLAIN mostra il piano di esecuzione.

## 04 - Progettazione E-R e logica

D: Cosa stabiliscono le fasi concettuale, logica, fisica?
R: Concettuale: cosa rappresentare (E-R, indipendente dal DBMS). Logica: come rappresentarlo nel relazionale (ristrutturazione e normalizzazione). Fisica: memorizzazione, efficienza. Un errore concettuale non si ripara con l'ottimizzazione fisica.

D: Le 5 regole di pulizia dei requisiti?
R: Glossario (sinonimi/omonimi); astrarre il concetto; standardizzare la sintassi; scomporre in frasi atomiche; separare dati e funzioni.

D: Cos'è un'occorrenza di relazione e perché non esistono ennuple identiche?
R: È una ennupla di occorrenze di entità; le ennuple identiche non esistono, quindi per ripetere un esame serve un attributo aggiuntivo (la Data).

D: Cardinalità degli attributi e delle relazioni in E-R?
R: Attributo: (1,1) obbligatorio, (0,1) opzionale, (1,N)/(0,N) multivalore, o composto. Relazione (min,max): min 0 partecipazione opzionale, 1 obbligatoria; max 1 univoca, N molti.

D: Identificatori interni ed esterni: vincoli?
R: Interno: attributi propri; esterno: ottenuto tramite relazione con cardinalità (1,1). Niente cicli di identificazione esterna; hanno identificatori solo le entità, non le relazioni.

D: Classificazione delle generalizzazioni (ISA)?
R: Totale (t) o parziale (p); esclusiva (e) o sovrapposta (s). Le figlie ereditano attributi e relazioni. Una (p,s) si rende (p,e) aggiungendo l'entità intersezione.

D: Cosa non esprime il diagramma E-R e come si documenta?
R: Regole aziendali: asserzioni (vincoli) e derivazioni (es. budget = 3 × somma stipendi); si documentano nel dizionario dei dati e nelle regole.

D: Punti del vademecum per controllare uno schema E-R?
R: Ogni entità ha un identificatore; identificatori esterni (1,1); niente cicli esterni né ISA; min ≤ max; attributi composti per raggruppare; niente identificatori sulle relazioni.

D: Pattern part-of e instance-of?
R: Part-of: dipendenza esistenziale (Cinema -(1,N)- Sala(1,1)). Instance-of: concetto astratto e istanze concrete (Volo -(1,N)- Volo Reale con data e orario).

D: Come si modella la storicizzazione?
R: Con un'entità intermedia con le date: Persona -(1,1)- Impiego -(0,N)- Azienda, con DataInizio/DataFine su Impiego.

D: Cos'è la reificazione, con esempio?
R: Promuovere una relazione (o attributo) a entità. Esame, relazione N:M Studente-Corso con Voto e Data, diventa un'entità Esame con due relazioni 1:N.

D: Strategie di costruzione dello schema e criteri di qualità?
R: Top-down, bottom-up, inside-out, mista (standard industriale, scheletro da raffinare). Qualità: correttezza, completezza, leggibilità, minimalità.

D: Cosa si considera nel valutare le prestazioni della progettazione logica?
R: Spazio (volume) e tempo (occorrenze visitate); operazioni interattive (frequenti, puntuali) e batch (rare, massive); regola 80-20; accessi in scrittura pesano 2× la lettura.

D: Analisi di ridondanza: attributo derivato "n° abitanti" in Città (200) da Persona ($10^6$); op1 500 inserimenti/giorno, op2 stampa città con abitanti 2/giorno. Conviene? [DA VERIFICARE]
R: Senza: op1 500 S = 1000; op2 2L + 10.000L = 10.002 -> circa 11.000. Con: op1 500S+500L+500S = 2500; op2 = 2 -> circa 2.500. Conviene (le note dicono 3.500 vs 12.000, stesso verdetto).

D: Vantaggi e svantaggi di una ridondanza?
R: Vantaggi: query più semplici, letture veloci. Svantaggi: update più costosi, rischio di incoerenza, più spazio.

D: Tre modi di eliminare una generalizzazione, quando e pro/contro?
R: Accorpamento nel padre (accessi contestuali; meno join, molti NULL). Accorpamento nelle figlie (accessi distinti, generalizzazione totale; accessi rapidi, duplicazione attributi del padre). Sostituzione con relazioni (generalizzazione parziale; zero NULL, più accessi per ricomporre).

D: Regole di traduzione delle associazioni E-R in relazionale?
R: N:N -> nuova relazione con le PK delle entità (+ attributi). 1:N -> FK nell'entità con max 1 (nullable se (0,1)). 1:1 -> accorpare se accessi simultanei. Ricorsiva -> relazione con due FK sulla stessa entità, ruoli ridenominati.

D: Quando servono le chiavi surrogate?
R: Quando la PK naturale non è immutabile, semplice e non opzionale.

D: Traduzione della relazione ricorsiva Capo-Impiegato?
R: ORGANIGRAMMA(Capo, Impiegato) con entrambe le FK su IMPIEGATI.MATR; navigabile con self-join.

D: Dipartimento è identificato da Nome+Sede: come si traduce e quali FK?
R: Dipartimento(Nome, Sede, Telefono, Direttore) con PK (Nome,Sede); FK Sede -> Sede e Direttore -> Impiegato. Impiegato(Codice,..., NomeDip*, SedeDip*) con FK composta verso Dipartimento (NULL per i non assegnati).

## 05 - Normalizzazione

D: Le tre anomalie di una tabella non normalizzata?
R: Inserzione (non posso inserire uno studente senza esami), cancellazione (cancellare un esame perde l'anagrafica del docente), update (la modifica va replicata in tutte le tuple, rischio di incoerenza).

D: Definizione di dipendenza funzionale X → Y?
R: Per ogni coppia di tuple t1,t2 di r: t1[X]=t2[X] ⇒ t1[Y]=t2[Y]. Le DF sono scelte semantiche del progettista, non si deducono dai dati.

D: Assiomi di Armstrong usati nel corso e regole derivate?
R: Riflessività (Y⊆X ⇒ X→Y), unione, transitività. Derivate: espansione (X→Y ⇒ WX→WY), decomposizione, pseudo-transitività (X→Y, WY→Z ⇒ WX→Z), prodotto.

D: Quando due insiemi di DF sono equivalenti?
R: Quando $F^{+}$ = $G^{+}$, cioè F ⊦ G e G ⊦ F.

D: Cos'è un attributo estraneo? Esempio.
R: Attributo la cui rimozione da una DF non cambia la chiusura. F={ABCD→E, B→C}: C è estraneo in ABCD→E perché ABD→B→C; F ≡ {ABD→E, B→C}.

D: Algoritmo di chiusura $X^{+}$ e test di membership?
R: C:=X; finché esiste Y→Z in F con Y⊆C, C:=C∪Z. X→Y ∈ $F^{+}$ ⇔ Y ⊆ $X^{+}$. Polinomiale ($F^{+}$ è esponenziale).

D: Come si riconosce una superchiave e una chiave con la chiusura?
R: K è superchiave ⇔ $K^{+}$ = tutti gli attributi; chiave = superchiave minimale. Gli attributi che non compaiono mai a destra stanno in ogni chiave.

D: ESAMI: MATR→NS,IS,CF,DN; CF→MATR; IS→CAP; MATR,Co→Vo,DE,CP; CP→NP,Q; Q→TU; CP→Co. Chiavi?
R: {MATR,Co} è chiave ({MATR,Co,NS} è superchiave non minimale). Con CP→Co anche {MATR,CP}, {CF,Co}, {CF,CP}.

D: Cosa sono le tuple spurie e quale relazione vale tra r e il join delle parti?
R: Tuple inventate dal join di una scomposizione errata; vale r ⊆ r1 ⋈ r2, si possono solo guadagnare tuple.

D: Condizione di lossless join per R1(A1), R2(A2)?
R: (A1∩A2 → A1) ∨ (A1∩A2 → A2): l'intersezione è superchiave di almeno una delle due.

D: Cosa significa preservare le DF e come si formalizza?
R: Le DF originarie si verificano sulle singole relazioni senza join. Restrizione Fi = {X→Y ∈ $F^{+}$ : XY ⊆ Ri}; conservativa se (F1∪F2)^{+} = $F^{+}$ (calcolo esponenziale).

D: R(A,B,C), F={A→B}: sono lossless {AB,AC} e {AB,BC}?
R: {AB,AC}: sì, A→AB. {AB,BC}: no, B non determina né AB né BC, possibili tuple spurie.

D: Definizione di BCNF.
R: Per ogni X→Y non banale (Y⊄X), X è superchiave. "Dalla chiave, da tutta la chiave, nient'altro che dalla chiave". Più chiavi candidate non violano la BCNF; BCNF implica 3NF.

D: Algoritmo di scomposizione in BCNF?
R: Finché c'è X→Y violante in Ri: sostituire Ri con R1(Ai−Y) e R2(XY), ricontrollare entrambe. È sempre lossless (X è chiave di R2) ma può perdere DF.

D: Limite della BCNF e rimedio?
R: Può perdere DF (es. AGENZIE); in tal caso si ripiega sulla 3NF.

D: Definizione di 3NF.
R: Per ogni X→Y vale almeno una: Y⊆X, X superchiave, oppure Y sono attributi primi (appartengono ad almeno una chiave). Garantisce sempre una scomposizione lossless che preserva le DF.

D: ESAMI(MATR,Co,Vo,CP) con F={MATR,Co→Vo,CP; CP→Co}: BCNF o 3NF?
R: CP→Co viola la BCNF (CP non superchiave) ma è 3NF perché Co è primo. Chiavi {MATR,Co}, {MATR,CP}.

D: AGENZIE(NAgenzia,CittaAgenzia,Direttore) con {NAgenzia,CittaAgenzia}→Direttore e Direttore→CittaAgenzia: forma normale?
R: 3NF ma non BCNF (CittaAgenzia è primo); scomporla ancora farebbe perdere la località.

D: ESAMI(MATR,Co,Vo,DE,CP) è BCNF come dicono le note? [DA VERIFICARE]
R: Se vale CP→Co (docente con un solo corso) NON è BCNF, solo 3NF. Occorre verificare quali DF usa la Lez. 09.

D: Requisiti di una copertura minimale F'?
R: F'≡F; un solo attributo a destra; nessun attributo estraneo a sinistra; nessuna DF ridondante.

D: Ordine tassativo per la copertura minimale e controesempio?
R: 1) RHS singoli, 2) togli estranei, 3) togli ridondanti. F={AB→C, C→A, B→A}: tolto A estraneo in AB→C si ha {B→C, C→A, B→A} e B→A è ridondante (B→C→A), invisibile cercando prima le ridondanze.

D: Algoritmo di sintesi 3NF?
R: 1) copertura minimale F'; 2) raggruppa DF con stesso antecedente; 3) una relazione per gruppo; 4) se nessuna contiene una chiave dell'originale, aggiungine una con gli attributi di una chiave; 5) fondi relazioni con stessa chiave ed elimina le contenute. Polinomiale, lossless, preserva le DF.

D: Perché il passo 4 della sintesi (relazione con la chiave)?
R: Senza di esso si può perdere il legame tra gli attributi (es. CC senza $R_{key}$(Titolare,NConto) perde il legame con il titolare).

D: Esercizio: R(A,B,C,D,E,F,G), F={AB→EF, B→G, A→CDG, C→B, E→F}. Chiave?
R: A non compare mai a destra, $A^{+}$ = A→CDG, C→B, AB→EF = tutti: A è l'unica chiave.

D: Stesso esercizio: copertura minimale?
R: Fmin = {A→C, A→D, A→E, B→G, C→B, E→F} (B estraneo in AB→E/F; ridondanti A→F e A→G).

D: Stesso esercizio: è in 3NF? Scomposizione.
R: No: B→G, C→B, E→F con sinistra non superchiave e destra non prima. Sintesi: R1(A,C,D,E), R2(C,B), R3(B,G), R4(E,F); R1 contiene la chiave A.

D: PARTITA(SC,SO,DP,PSC,PSO,A,C,S): chiave e perché non 3NF?
R: SC e DP mai a destra; {SC,DP}^{+} = tutto, chiave {SC,DP}. Non 3NF: dipendenza parziale SC→S e transitiva A→C.

D: PARTITA: scomposizione delle note e punto dubbio. [DA VERIFICARE]
R: RPartita(SC,DP,SO,PSC,PSO), RStadio(SC,S), RArbitro(A,C), RDesignazione(C,DP,A). La sintesi standard aggiunge R(SC,SO,C) per preservare SC,SO→C, assente nelle note.

D: COMUNE(Co,No,NA,Pr,Re) con No→Pr, Pr→Re: copertura e 3NF? [DA VERIFICARE]
R: F' = {Co→No, Co→NA, No→Pr, Pr→Re}; 3NF: R1(Co,No,NA), R2(No,Pr), R3(Pr,Re). Dubbio: No→Pr implica nomi unici, in contrasto con la motivazione sulle omonimie.

D: Da ER a DF: come si traducono entità, 1:N, N:M, entità debole?
R: Entità K→A; 1:N: chiave del lato (1,1) dipende da quella del lato (1,N) (FK); N:M: {K1,K2}→attributi in relazione separata; entità debole {Kid,A}→B.

D: Cosa non emerge dall'E-R ma dalla normalizzazione?
R: Gli intrecci di vincoli (es. CP→Co, ogni docente ha un solo corso): richiedono una regola aziendale e la normalizzazione come test ex-post.

D: Cos'è la de-normalizzazione e la frammentazione?
R: De-normalizzazione: ridondanza voluta (es. CAP in STUDENTI per evitare il join), accettando le anomalie. Frammentazione: separare dati con ritmi di aggiornamento diversi (ANAGRAFECC statica, STATOCC con saldo).

## 06 - Transazioni, concorrenza, ripristino

D: Cos'è una transazione e come termina?
R: Unità di programma che porta la BD da uno stato coerente a un altro. COMMIT WORK verifica i vincoli e rende definitive le modifiche (S1→S2); ROLLBACK WORK le annulla (S1→S1).

D: Cos'è la verifica differita dei vincoli?
R: I vincoli sono controllati al COMMIT: le istruzioni intermedie possono violarli temporaneamente (es. cliente e titolare di conto inseriti in ordine qualsiasi).

D: Ciclo di vita di una transazione?
R: Attiva -> (commit) parzialmente terminata [verifica vincoli] -> Committed (vincoli ok) oppure Aborted (vincoli violati o rollback).

D: Le quattro proprietà ACID e il componente responsabile?
R: Atomicità: gestore del ripristino. Consistenza: gestore transazioni/serializzatore (il DBMS controlla i vincoli, la correttezza logica è del progettista). Isolamento: serializzatore. Durabilità: gestore del buffer (con log).

D: Tipi di memoria nel recovery?
R: Temporanea (RAM) e permanente: standard (DB, indici) o stabile (log, dump).

D: Perché serve l'interleaving?
R: I tempi morti di I/O (disco ~$10^6$ volte più lento della RAM) renderebbero insostenibile l'esecuzione seriale; l'interleaving massimizza il throughput ma può produrre stati errati.

D: A=1000, B=2000: T1 sposta 50 da A a B, T2 sposta il 10% di A su B. Risultati seriali e storia errata r1(A) r2(A) w2(A) r2(B) w1(A) r1(B) w1(B) w2(B)?
R: T1T2: A=855, B=2145; T2T1: A=850, B=2150 (somma 3000). La storia errata dà A=950, B=2100 (A+B=3050): lost update, w1(A) ignora w2(A). Non serializzabile.

D: Cos'è una storia e quando è seriale/corretta?
R: Sequenza delle azioni $r_i$(X), $w_i$(X). Seriale: una transazione per intero dopo l'altra. Corretta = equivalente a una seriale = serializzabile.

D: Le tre condizioni della view-equivalenza?
R: Stesso input (letture del valore iniziale); stesse relazioni lettura-da; stesso stato finale (l'ultima w(X) è della stessa transazione).

D: Approccio ottimistico vs pessimistico?
R: Ottimistico: conflitti rari, verifica al commit e rollback se conflitto. Pessimistico: previene i conflitti con i lock (prevale sul mercato).

D: Tipi di lock e matrice di compatibilità?
R: LS (shared, lettura), LX (exclusive, scrittura), UN (rilascio). LS-LS concesso; LS-LX, LX-LS, LX-LX negati.

D: Cosa succede a un lock negato e cos'è l'upgrade?
R: La transazione va in WAIT con coda FIFO (niente starvation). Upgrade LS→LX possibile solo se la transazione è l'unica con LS su X.

D: Cos'è il 2PL e cosa garantisce?
R: Two-Phase Locking: fase di crescita (solo lock), punto di lock, fase di rilascio (solo unlock, nessun nuovo lock). Garantisce la serializzabilità delle storie generate.

D: Una transazione fa LS(A), UN(A), LX(B), UN(B): rispetta il 2PL?
R: No: acquisisce LX(B) dopo aver rilasciato UN(A); nel 2PL nessun lock dopo il primo unlock.

D: Granularità dei lock?
R: Tupla (più comune, massima concorrenza, lock table grande); attributo (raro, molto overhead); pagina (sistemi distribuiti, meno parallelismo); tabella/file (manutenzione massiva, indici).

D: Tipi di guasto e cosa gestisce il gestore del ripristino?
R: Hardware dell'unità centrale (si perde la RAM), crash di sistema, errore di programma, guasto di periferica (*), evento catastrofico (*). Gestisce tutto tranne (*), per cui servono dump e duplicazione.

D: Cos'è il log e cosa contiene?
R: File sequenziale in sola aggiunta su memoria stabile: <Tj,start>, <Tj,X,BS(X),AS(X)> (before/after state), <Tj,commit>, <Tj,abort>.

D: Cos'è il FORCE LOG e quando si fa?
R: Scrittura forzata delle pagine di log dal buffer alla memoria stabile al commit/abort, prima di confermare all'utente. Se la transazione fallisce: UNDO + <abort> + FORCE LOG.

D: Dopo un crash: ruoli di LA e LC, verso delle scansioni?
R: LC (committate) -> REDO in avanti (applica AS(X) e FORCE delle pagine, serve per le modifiche perse). LA (attive) -> UNDO a ritroso (ripristina BS(X)). Le transazioni con <abort> si ignorano.

D: Log: T1,T2 committate, T3 solo iniziata al crash. Azioni?
R: REDO(T1,T2) in ordine cronologico, UNDO(T3) a ritroso.

D: Passi del checkpoint?
R: Sospendere le transazioni; scrivere il record di checkpoint (transazioni attive + puntatori ai loro start); FORCE LOG; FORCE delle pagine delle committate; scrivere il flag OK; riprendere.

D: Con checkpoint: come si trattano T2 (commit prima del CP), T1 (start prima, commit dopo), T4 (start e commit dopo CP), T3 (start prima, attiva al crash), T5 (start dopo, attiva)?
R: T2 nessuna azione; T1 REDO; T4 REDO; T3 UNDO; T5 UNDO.

D: Come si recupera da un guasto di periferica?
R: Il log non basta: Restore dell'ultimo dump (su memoria stabile) e poi REDO delle committate (LC) dal dump al guasto.

D: Come si rimedia a deadlock, 2PL stretto e rollback a cascata? [DA VERIFICARE]
R: Non compaiono negli appunti: verificare se sono nel programma d'esame.

D: Notazione del log: BS o BF? [DA VERIFICARE]
R: Le slide usano sia BF sia BS (before state): controllare la notazione dell'esame.

## 07 - Ottimizzazione e struttura fisica

D: Perché il costo di una query è dominato dagli accessi a disco?
R: RAM ~50-70 ns, disco/SSD 5-20 ms, fattore ~$10^6$: l'ottimizzatore mira a ridurre i trasferimenti di pagina.

D: Differenza tra ottimizzazione logica e fisica?
R: Logica: trasformazione algebrica indipendente dalle strutture fisiche. Fisica: sceglie gli algoritmi (Nested Loop, Sort-Merge, Hash join) usando indici, statistiche e hardware.

D: Euristica d'oro dell'ottimizzazione logica?
R: Ridurre presto il numero di tuple: spingere le selezioni verso le foglie, così i join lavorano su tabelle piccole.

D: I 7 passi dell'algoritmo logico?
R: 1) decomporre gli AND; 2) spingere le selezioni; 3) spingere le proiezioni; 4) ricombinare le selezioni; 5) riconoscere i join (σ_Θ(r×s) → r⋈_Θ s); 6) ricombinare le proiezioni; 7) varianti associative dei join (minimizzare i risultati intermedi).

D: Statistiche del dizionario dati?
R: CARD(r) numero di tuple; SIZE(t) ampiezza media; VAL(A,r) valori distinti di A; NPAGE(r) = CARD(r)/fattore di bloccaggio.

D: Fattore di selettività dei predicati?
R: A=v: 1/VAL(A,r); A≤v: (v−MIN)/(MAX−MIN); AND: f1·f2; NOT: 1−$f_p$; OR: 1−(1−f1)(1−f2). Distribuzione uniforme.

D: La formula del NOT nelle note è "1 − $f_{p2}$". [DA VERIFICARE]
R: Probabile refuso: la formula corretta è 1 − $f_p$.

D: Stima della cardinalità di un join?
R: FK→PK: cardinalità del lato FK (es. CARD(RICOVERI)). Equi-join generale: ≈ min(1/VAL(A,r), 1/VAL(B,s))·CARD(r)·CARD(s) [formula da confrontare con le slide]. Dopo una selezione VAL_nuovo = min{VAL_vecchio, CARD_risultato}.

D: Pazienti $10^5$ (VAL Residenza=100), Ricoveri $10^5$ (VAL Inizio=10): massa di tuple dei piani non ottimizzato, con selezioni spinte, con associatività? [DA VERIFICARE]
R: $10^{10}$ (prodotto $10^5$×$10^5$); $10^7$ ($10^3$ pazienti × $10^4$ ricoveri); $10^6$ (Medici per primi, una tupla): miglioramento ~10.000×. Esponenti ricostruiti, appiattiti nelle note.

D: Cosa contiene una pagina e cos'è il RID?
R: PID, array degli offset (in testa), stack dei record, bit di parità. RID = [PID, i], i indice nell'array: permette di spostare i record nella pagina senza cambiare l'indirizzo, base dell'indipendenza fisica.

D: Metodi di accesso e costi di ricerca seriale e sequenziale (N pagine)?
R: Seriale: (N+1)/2 con successo, N con insuccesso. Sequenziale: insuccesso (N+1)/2 (si ferma superato il valore). Altri: tabellare (indici), diretto (hash, $O(1)$).

D: Perché il B+ albero e non il B albero?
R: Le chiavi interne sono solo separatori e tutte le chiavi effettive stanno nelle foglie collegate: permettono scansioni di range. Con m=100 e h=3 si indicizzano $10^6$ chiavi.

D: I tre tipi di data entry k*?
R: Tipo 1 ⟨k, tupla⟩ (clusterizzato); tipo 2 ⟨k, RID⟩; tipo 3 ⟨k, lista di RID⟩ (tipico dei secondari).

D: Le 8 euristiche di progettazione fisica degli indici?
R: 1) no su tabelle piccole (~10 pagine); 2) no su attributi volatili; 3) solo se fs < 20%; 4) evitare chiavi sbilanciate; 5) max 4-5 indici per relazione; 6) privilegiare PK/FK; 7) utili per ORDER BY; 8) conoscere il DBMS.

D: Come si definisce fs nell'euristica del 20%?
R: fs = pagine restituite da σ_{k=c}(T) / pagine totali di T. L'indice conviene se fs < 20%.

D: Due strategie per selezioni congiuntive σ_{p1∧p2∧...}?
R: (a) intersezione in RAM dei RID restituiti dagli indici disponibili; (b) usare l'indice più selettivo (min f) e verificare gli altri predicati sulle tuple caricate.

D: Algoritmi di join e perché non simulare il join nell'applicazione?
R: Nested Loop, Merge Join (input ordinati), Hash Join, scelti da DBMS in base a buffer e statistiche (EXPLAIN mostra il piano). Il join è l'operatore più oneroso: i cicli nidificati nell'applicazione sono peggiori.

## 08 - Checklist d'esame e formulario

D: Formulario: formule da ricordare per la divisione e la selettività.
R: r÷s = π_A(r) − π_A((π_A(r)×s) − r). Selettività: eq 1/VAL; AND f1·f2; OR 1−(1−f1)(1−f2); NOT 1−f.

D: Formulario: lossless, BCNF, 3NF, copertura minimale.
R: Lossless (A1∩A2→A1) ∨ (A1∩A2→A2). BCNF: X superchiave per ogni X→Y non banale. 3NF: X superchiave o Y primi. Copertura: RHS singolo, togli estranei, togli ridondanti.

D: Formulario: lock, recovery, costi.
R: LS-LS compatibili, tutto il resto no; 2PL prima solo lock poi solo unlock. Recovery: REDO(LC) in avanti, UNDO(LA) a ritroso, abort ignorati. Accesso seriale (N+1)/2 successo, N insuccesso; B+ m=100, h=3 -> $10^6$ chiavi.

D: Esercizio: query con AND di selettività su VAL=100 e VAL=10, come si stima il risultato?
R: f = 1/100 · 1/10 = 1/1000; risultato = CARD · f.

D: Esame: da cosa si riconosce quale strumento algebrico usare?
R: Negazione essenziale -> U−P; "almeno due" -> self-join; "tutti" -> ÷ / doppia negazione; "massimo" -> r − (esiste uno maggiore).

D: Qual è la data dell'appello e cosa manca nelle fonti? [DA VERIFICARE]
R: Appello 2027-02-01. Mancano Lab 02 e Lab 06, i diagrammi E-R e il programma ufficiale d'esame di Basi di Dati non è verificato.
