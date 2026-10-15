# 03 - SQL (DDL, DML, query) e PostgreSQL

**Fonte:** doc Drive "Basi di Dati - Appunti" (Laboratorio 07, 08, 09, 10, 11) + slide Lab. Standard di riferimento: SQL-92. DBMS di laboratorio: PostgreSQL (pgAdmin 4).

## Mappa

1. DDL: domini, tabelle, vincoli, integrità referenziale, ALTER, DROP
2. DML: INSERT/DELETE/UPDATE
3. Query: SELECT-FROM-WHERE, join, outer join, self-join
4. Aggregati, GROUP BY, HAVING
5. Operatori insiemistici, query nidificate, ANY/ALL/IN, EXISTS
6. PostgreSQL (object-relational, MVCC, trigger, EXPLAIN)

- [1. DDL](#1-ddl)
- [2. DML](#2-dml)
- [3. Query base](#3-query-base)
- [4. Join (sintassi esplicita)](#4-join-sintassi-esplicita)
- [5. Aggregati e raggruppamenti](#5-aggregati-e-raggruppamenti)
- [6. Insiemistici e nidificate](#6-insiemistici-e-nidificate)
- [7. PostgreSQL (Lab 07)](#7-postgresql-lab-07)
- [Query tipo (schema S-P-SP; risultati calcolati sui dati delle note)](#query-tipo-schema-s-p-sp-risultati-calcolati-sui-dati-delle-note)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. DDL

Il DDL è la parte di SQL che traduce lo schema logico in oggetti del DBMS. Si parte dai **tipi**:
- stringhe: `char(n)` a lunghezza fissa e `varchar(n)`;
- numerici: `numeric(p,s)` esatto, `decimal(p,s)` con precisione *minima*, `float/real`;
- temporali: `date, time, timestamp, interval` (NON è ammesso `interval year to minute`, perché mesi e giorni hanno durata variabile);
- `boolean, bigint`;
- `blob/clob` (in PostgreSQL `bytea`/`text`).

Sopra i tipi si possono definire **domini**, che centralizzano vincoli e default così da modificarli in un punto solo:

```sql
CREATE DOMAIN Temperatura AS decimal(3,1) DEFAULT NULL CHECK (value >= 35.0 AND value <= 42.0);
ALTER DOMAIN Temperatura SET DEFAULT 37.0;
```
Il tipo o dominio va dichiarato **prima** dell'uso.

I vincoli **intra-relazionali** sono:
- `NOT NULL`;
- `UNIQUE`: dichiara una superchiave e ammette NULL;
- `PRIMARY KEY`: unico + NOT NULL, spesso anche criterio di organizzazione fisica;
- `CHECK`;
- `DEFAULT`.

Una sottigliezza ricorrente riguarda UNIQUE: `Nome UNIQUE, Cognome UNIQUE` (vieta due "Mario" o due "Rossi") è ben diverso da `UNIQUE(Nome,Cognome)`, che vieta solo la coppia identica.

L'**integrità referenziale** coinvolge due tabelle, chiamate Master (la referenziata) e Slave (quella che porta la FK). Il comportamento è asimmetrico: una modifica *illegale* sullo Slave (una FK che non punta a nulla) viene rifiutata, mentre per una modifica sul Master si può dichiarare la reazione desiderata.

| Reazione (ON UPDATE / ON DELETE) | Effetto sullo Slave |
|---|---|
| CASCADE | propaga modifica/cancellazione |
| SET NULL | FK = NULL |
| SET DEFAULT | FK = valore di default |
| NO ACTION | blocca l'operazione sul Master (default) |

Sulla portabilità le note dicono che Oracle non ha ON UPDATE né SET DEFAULT, che MySQL/InnoDB non ha SET DEFAULT e accetta le FK solo con sintassi esplicita (non inline), mentre PostgreSQL è il più aderente allo standard.

**Esempio completo (Ricoveri).** L'ordine di creazione segue le dipendenze: prima le tabelle Master. La dipendenza circolare MEDICI<->REPARTI si risolve creando Reparti senza la FK su Primario e aggiungendola dopo con ALTER TABLE.
```sql
CREATE TABLE Pazienti (COD varchar(4) PRIMARY KEY, Cognome varchar(20) NOT NULL,
                       Nome varchar(20) NOT NULL, Residenza char(2) NOT NULL);
CREATE TABLE Reparti  (COD char PRIMARY KEY, Nome varchar(20) NOT NULL, Primario varchar(4)); -- FK a Medici aggiunta dopo
CREATE TABLE Medici   (MATR varchar(4) PRIMARY KEY, Cognome varchar(20) NOT NULL, Nome varchar(20) NOT NULL,
                       Residenza char(2) NOT NULL, Reparto char NOT NULL REFERENCES Reparti(COD));
CREATE TABLE Ricoveri (PAZ varchar(4) NOT NULL, Inizio date NOT NULL, Fine date, Reparto char NOT NULL,
  PRIMARY KEY (PAZ, Inizio),
  FOREIGN KEY (PAZ) REFERENCES Pazienti(COD) ON UPDATE CASCADE,
  FOREIGN KEY (Reparto) REFERENCES Reparti(COD) ON UPDATE CASCADE ON DELETE SET NULL);
```
(Nota: `Reparto char NOT NULL` con `ON DELETE SET NULL` è incoerente: riportato dalle note, vedi Dubbi.)

Per modificare o eliminare oggetti esistenti: `ALTER TABLE Ricoveri ADD COLUMN Referto varchar(50);` · `ALTER TABLE Ricoveri DROP CONSTRAINT fk_RicPaz;` · `DROP TABLE attori_docente CASCADE;` (CASCADE elimina anche gli oggetti dipendenti, per esempio le FK in altre tabelle).

## 2. DML

Il DML modifica il contenuto delle tabelle:
- `INSERT INTO T(attr,...) VALUES (...)` inserisce una riga: omettere la lista degli attributi è sconsigliato perché il codice si rompe se la tabella cambia;
- `DELETE FROM T WHERE ...` cancella le righe che soddisfano la condizione; senza WHERE cancella **tutto**;
- `UPDATE T SET ... WHERE ...` modifica le righe selezionate.

## 3. Query base

La forma base è `SELECT [DISTINCT] target FROM tabelle [WHERE cond] [ORDER BY ...]`. Per capire cosa produce, conviene seguire l'**ordine logico** di valutazione: prodotto cartesiano (FROM), selezione (WHERE), proiezione (SELECT); il DBMS poi lo ottimizza ma il risultato deve essere quello. Rispetto all'algebra, SQL **tiene i duplicati**, per cui serve DISTINCT quando si vuole il rigore insiemistico. Nel SELECT si possono usare espressioni (`Weight*1000`). Il confronto fra stringhe con `LIKE` usa `_` per esattamente un carattere e `%` per una sequenza qualunque, anche vuota; per questo `'%a_k%'` ≠ `'%a%k%'`. L'ordinamento si ottiene con `ORDER BY Status DESC, SName ASC`; i commenti sono `-- riga` e `/* blocco */`.

Sul **NULL** valgono le regole della logica a tre valori (file 02): il confronto con NULL dà Unknown, quindi `WHERE Status=10 OR Status<>10` perde i NULL e per cercarli si usa `IS NULL`. Per mostrarli con un valore sostitutivo c'è `COALESCE(Status,0)`.

Il join implicito (`FROM S, SP WHERE S.SNum=SP.SNum`) è la traduzione diretta di prodotto più selezione, e la trappola è evidente: **dimenticare la condizione produce un prodotto cartesiano**. Si possono dare alias alle tabelle (`FROM S F, P P, SP FT`). Il legame con l'algebra è immediato: `SELECT SName,City FROM S` è una π; `SELECT SName FROM S WHERE Status>20` è π(σ(S)).

## 4. Join (sintassi esplicita)

La sintassi esplicita separa le condizioni di join da quelle di selezione e rende più leggibile la query:
```sql
SELECT * FROM S INNER JOIN SP ON S.SNum = SP.SNum WHERE S.City='London' AND SP.PNum='P4';
```
Gli **outer join** LEFT / RIGHT / FULL conservano le righe senza corrispondenza riempiendo con NULL. Su `S.City=P.City`: il LEFT include Adams (Atene, nessuna parte); il RIGHT include Screw P3 (Roma, nessun fornitore).

Una trappola nota è la **S5**: `(S LEFT JOIN SP ON ...) JOIN P ON SP.PNum=P.PNum` perde S5, perché in S5 il valore SP.PNum è NULL e il NULL non soddisfa la condizione del join interno successivo. Per tenerlo, anche il secondo join deve essere LEFT.

Il **self join** serve per confrontare righe della stessa tabella, per esempio le coppie di fornitori della stessa città:
`SELECT DISTINCT S1.SNum,S2.SNum,S1.City FROM S S1 JOIN S S2 ON S1.City=S2.City WHERE S1.SNum < S2.SNum;`
La scelta di `<` (e non `<>`) evita sia le auto-coppie sia le coppie speculari.

## 5. Aggregati e raggruppamenti

Le funzioni aggregate riducono un insieme di righe a un valore. Hanno comportamenti da conoscere rispetto ai NULL, riassunti in tabella:

| Funzione | Nota |
|---|---|
| COUNT(*) | conta tutte le righe (anche NULL) |
| COUNT(attr) | non-NULL, accetta DISTINCT (PG: no `COUNT(DISTINCT *)`) |
| SUM, AVG | ignorano NULL (AVG(QTY) su SP = 258,33) |
| MAX, MIN | anche su stringhe |

Il punto concettuale è l'ordine in cui il DBMS opera:
1. WHERE: restrizione sulle righe;
2. GROUP BY: partizione in gruppi;
3. calcolo di SELECT e aggregati;
4. HAVING: filtro sui gruppi.

Da qui discende che **non si usano aggregati nel WHERE**, che agisce sulle righe prima dell'aggregazione, e che non si mescolano attributi "sciolti" e aggregati senza GROUP BY. Il criterio per scegliere tra WHERE e HAVING è dunque: condizione sulla riga -> WHERE, condizione sul gruppo -> HAVING.

Sul GROUP BY, lo standard SQL-92 richiede che ogni attributo nel SELECT sia aggregato o presente nel GROUP BY (Oracle è rigoroso); SQL-99 e PostgreSQL ammettono anche attributi funzionalmente dipendenti dal raggruppamento (GROUP BY P.PNum, SELECT P.PName).
```sql
SELECT City, COUNT(*) FROM S WHERE Status >= 20 GROUP BY City HAVING COUNT(*) >= 2;  -- -> London, 2
```

## 6. Insiemistici e nidificate

Gli operatori `UNION`, `INTERSECT`, `EXCEPT` combinano risultati di query diverse e richiedono **compatibilità** (stesso numero di colonne, tipi corrispondenti); eliminano i duplicati, che `ALL` mantiene. EXCEPT è il caso non riproducibile con join semplici. Esempio: parti con peso>16 (P2,P3,P6) contro parti fornite da S2 (P1,P2): UNION {P1,P2,P3,P6}; INTERSECT {P2}; EXCEPT {P3,P6}.

Le **query nidificate** permettono di usare il risultato di una query dentro un'altra. Si distinguono la subquery *semplice* o *stratificata*, valutata una volta sola perché indipendente dall'esterno, e quella *correlata*, rivalutata per ogni riga esterna (binding passing). Possono comparire in WHERE, in FROM (dove **non** possono essere correlate) e in SELECT (dove devono produrre uno scalare). Esempio: `SELECT SNum FROM S WHERE Status < (SELECT AVG(Status) FROM S);` -> media 22 -> S1,S2,S4.

Per confrontare un valore con un insieme servono i **quantificatori**: `ANY` significa almeno uno (un OR espanso), `ALL` tutti; `IN` equivale a `= ANY` e `NOT IN` a `<> ALL`. Attenzione ai NULL: con ALL e NOT IN, un NULL nell'insieme rende Unknown il predicato e il risultato può diventare l'insieme vuoto (3VL). Un esempio corretto e stratificato, i fornitori mai di parti blu (-> S2,S3,S5):
```sql
SELECT DISTINCT SNum FROM S WHERE SNum NOT IN (SELECT SNum FROM SP WHERE PNum IN (SELECT PNum FROM P WHERE Color='Blue'));
```

**EXISTS / NOT EXISTS** sono veri se la subquery ha almeno una riga / è vuota, e sono lo strumento naturale per esistenza e negazione. La valutazione procede così:
1. si prende una riga esterna;
2. si sostituiscono i suoi valori nella subquery;
3. la si esegue: se produce almeno una riga, EXISTS è TRUE;
4. si itera sulla riga successiva.

Per esempio `... WHERE NOT EXISTS (SELECT * FROM SP WHERE SNum=S.SNum AND PNum='P4')` è equivalente a `SNum NOT IN (SELECT SNum FROM SP WHERE PNum='P4')`.

Sulla **visibilità**: le variabili esterne sono visibili nelle subquery annidate (top-down), mentre non c'è alcuna visibilità tra subquery sorelle (si ottiene l'errore "identificatore non definito"). Come regola di scelta: join per combinare dati, insiemistici per classificare, nidificate per esistenza e negazione.

## 7. PostgreSQL (Lab 07)

PostgreSQL discende da INGRES -> POSTGRES (Berkeley, Stonebraker, 1985) -> Postgres95 (interprete SQL, 1994) -> PostgreSQL (1996). È **Object-Relational**: supporta tipi definiti dall'utente (UDT), ereditarietà di tabelle (`capitals` eredita `cities`) e funzioni definite dall'utente (UDF), e così risolve l'*impedance mismatch* tra SQL e programmazione a oggetti (che arriva a costare fino al 40% del tempo di sviluppo).

Per la concorrenza usa **MVCC**: ogni transazione ha un XID e lavora su uno *snapshot*, per cui i lettori non bloccano gli scrittori e viceversa; le modifiche creano nuove versioni delle righe e **VACUUM** recupera quelle obsolete. Così garantisce ACID (file 06). I **trigger** sono procedure automatiche su INSERT/UPDATE/DELETE: spostano i controlli dall'applicazione al database, e valgono quindi per ogni client. **EXPLAIN** mostra il piano di esecuzione (per esempio un Hash Inner Join); PostgreSQL è anche multi-model, perché gestisce JSON con ACID. Per il laboratorio si usa pgAdmin 4, con accesso al server del dipartimento via tunnel SSH.

## Query tipo (schema S-P-SP; risultati calcolati sui dati delle note)
- **S**: S1 Smith 20 London · S2 Jones 10 Paris · S3 Blake 30 Paris · S4 Clark 20 London · S5 Adams 30 Athens.
- **P**: P1 Nut Red 12 London · P2 Bolt Green 17 Paris · P3 Screw Blue 17 Rome · P4 Screw Red 14 London · P5 Cam Blue 12 Paris · P6 Cog Red 19 London.
- **SP**: S1 fornisce P1-P6 (300,200,400,200,100,100); S2: P1 300, P2 400; S3: P2 200; S4: P2 200, P4 300, P5 400.

1. Quantità totale per fornitore: `SELECT SNum, SUM(QTY) FROM SP GROUP BY SNum` -> S1 1300, S2 700, S3 200, S4 900.
2. Fornitori che forniscono **tutte** le parti (doppia negazione, schema tipico [DA VERIFICARE sulle slide]):
   `SELECT SNum FROM S WHERE NOT EXISTS (SELECT * FROM P WHERE NOT EXISTS (SELECT * FROM SP WHERE SP.SNum=S.SNum AND SP.PNum=P.PNum))` -> S1.
3. Fornitori di Londra che non forniscono P4: `... City='London' AND NOT EXISTS (...)` -> nessuno (S1, S4 forniscono P4).
4. Fornitori con status sopra la media: `Status > (SELECT AVG(Status) FROM S)` -> S3, S5.

## Cose da saper fare all'esame
- Scrivere un `CREATE TABLE` completo con PK, FK (reazioni), CHECK, DEFAULT, e capire l'ordine di creazione/ALTER per dipendenze circolari.
- Dire cosa succede (CASCADE/SET NULL/NO ACTION) a una modifica sul Master.
- Tradurre in SQL una query algebrica / TRC e viceversa; scegliere tra join, insiemistici, IN, EXISTS.
- Query con GROUP BY/HAVING: sapere dove va la condizione (WHERE vs HAVING).
- Prevedere il risultato con NULL (NOT IN, ALL, confronti).
- Outer join: dire quali righe compaiono e dove ci sono NULL; accorgersi della trappola S5.
- Spiegare MVCC, trigger, perché non simulare il join nel codice applicativo.

## Dubbi
- [DA VERIFICARE] Nello script Ricoveri delle note `Reparto char NOT NULL` + `ON DELETE SET NULL` si contraddicono (SET NULL su colonna NOT NULL fallisce).
- [DA VERIFICARE] Le note dicono che Oracle non supporta ON UPDATE: controllare se l'esame chiede questa portabilità.
- Le subquery "doppia negazione" per la divisione non sono scritte esplicitamente nelle note: schema standard, da confrontare con le slide.
