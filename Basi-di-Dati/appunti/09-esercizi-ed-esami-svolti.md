# 09 - Esercizi ed esami svolti (temi 2025-2026, simulazione, fogli del docente)

Fonte: Moodle del corso BD-B 2025/26 (canale B, prof. Pensa; laboratorio Pensa/Vernero), cartella `_moodle-raw/Basi-di-Dati/generale`. I materiali usati sono: i testi con soluzione dei nove appelli `scritto20250609`, `scritto20250709`, `scritto20250910`, `scritto20251217`, `scritto20260123`, `scritto20260611`, `scritto20260709`, `scritto20260903`, `scritto20260914` (nel seguito indicati per data, aaaa-mm-gg); la `simulazione_scritto_2024-25` con soluzioni; il tema del 15/06/2023 `scritto_1_no_sol` (solo parte SQL, con soluzione); i fogli di esercizi `Esercizi_1..7_sql`, `bdb_esercizi_calcolo_relazionale`, `bdb_soluzioni_algebra`, `bdb_esercizi_normalizzazione`, `esercizi_riepilogativi 1-3` con le soluzioni in `soluzioni.zip`; gli esercizi di progettazione `Esercizio_1..5, 8, 9`, `esercizio_biblioteca`, `soluzioni.pdf`; la traccia del progetto di laboratorio 2025/26 (`progetto_laboratorio_2526.zip`) e `Modalità Esame-25-26`. I file `scritto20260611.pdf`, `…0709.pdf`, `…0903.pdf`, `…0914.pdf` senza `_soluzione` sono le stesse tracce senza soluzione e non aggiungono nulla.

Come leggere questo file. Le soluzioni dei temi d'esame sono quelle del docente, riscritte in prosa e ricontrollate; dove nella soluzione ufficiale ho trovato un errore o un'imprecisione lo dico esplicitamente (ce ne sono parecchie, raccolte nella sezione finale). I fogli di esercizi del docente, invece, hanno spesso soluzioni solo "a voce in aula" o come immagini: in quei casi la soluzione è **mia** e la segno con "(soluzione mia)". Le soluzioni SQL su schema S-P-SP sono state eseguite su SQLite con i dati di `S_P_SP.sql` (con `case_sensitive_like` attivo per imitare PostgreSQL); le chiavi, le coperture minimali, le scomposizioni 3NF e le stime di costo sono state ricalcolate con Python; 2PL e view-equivalenza sono state verificate con un piccolo programma. Il testo estratto dai PDF ha perso quasi tutti i simboli matematici (π, σ, ⋈, ∀, ∃, ∧, ∨, ⇒, ÷) e le figure: dove un'espressione dipende da simboli perduti la segno `[DA VERIFICARE sul PDF]`, e le espressioni algebriche che scrivo qui sono ricostruite da me sul testo della soluzione.

## Mappa

- [0. Com'è fatta la prova](#0-comè-fatta-la-prova)
- [1. Algebra relazionale](#1-algebra-relazionale)
- [2. Calcolo relazionale su tuple](#2-calcolo-relazionale-su-tuple)
- [3. SQL](#3-sql)
- [4. Normalizzazione](#4-normalizzazione)
- [5. Transazioni: 2PL e view-equivalenza](#5-transazioni-2pl-e-view-equivalenza)
- [6. Ottimizzazione logica e conteggio delle tuple "mosse"](#6-ottimizzazione-logica-e-conteggio-delle-tuple-mosse)
- [7. Progettazione E-R e progetto di laboratorio](#7-progettazione-e-r-e-progetto-di-laboratorio)
- [8. Domande teoriche a risposta aperta](#8-domande-teoriche-a-risposta-aperta)
- [Errori e imprecisioni nelle soluzioni del docente](#errori-e-imprecisioni-nelle-soluzioni-del-docente)
- [Cosa resta da integrare](#cosa-resta-da-integrare)
- [Dubbi](#dubbi)

## 0. Com'è fatta la prova

Teoria: [01 Fondamenti](01-fondamenti-e-modello-relazionale.md), [08 Checklist d'esame](08-checklist-esame-ed-esercizi-tipo.md).

Ogni appello ha due valutazioni obbligatorie: lo scritto e la discussione del progetto di laboratorio (`Modalità Esame-25-26`). Lo scritto è una prova sola ma con due parti: SQL (peso 30%) e teoria (peso 70%); è superato con almeno 18/30 di media e con almeno 15/30 in ciascuna parte. Il voto dello scritto vale per la sola sessione in cui è stato preso, si hanno tre correzioni per anno accademico, non sono ammessi libri né dispositivi e per accedere allo scritto bisogna aver consegnato il progetto su Moodle entro la chiusura delle iscrizioni. La discussione del progetto vale per le edizioni 2025-26 e 2026-27; il voto finale è la media pesata scritto 70% e laboratorio 30%, con 18/30 minimo in entrambi.

La parte SQL dei temi ha sempre la stessa forma: tre domande di complessità crescente (bassa, media, alta) su una base di dati nuova, con punteggi che premiano la combinazione e non la singola risposta: le domande 1 e 2 corrette valgono 26, la 1 e la 3 valgono 28, la 2 e la 3 valgono 30, tutte e tre 33. Una sola domanda giusta non fa la sufficienza. Spesso la traccia vieta le sottoquery nelle prime due domande (si risolvono con join, GROUP BY e HAVING) e le ammette nella terza (massimi, quantificazione universale). La parte di teoria (tre o quattro domande, 33 punti in tutto nei temi 2025-26) segue uno schema altrettanto stabile: un'interrogazione in algebra relazionale e una in calcolo su tuple con range (14 punti), un esercizio di normalizzazione (9-10 punti), una domanda su transazioni/2PL oppure sull'ottimizzazione con il calcolo delle tuple mosse (9-10 punti), a volte una domanda di teoria pura (definizione di BCNF, B-tree contro B+-tree, 2PL).

## 1. Algebra relazionale

Teoria: [02 §1 Operatori](02-algebra-e-calcolo-relazionale.md#1-operatori), [§2 Negazione](02-algebra-e-calcolo-relazionale.md#2-negazione), [§3 Quantificazione universale: quoziente](02-algebra-e-calcolo-relazionale.md#3-quantificazione-universale-quoziente).

Nei temi la domanda di algebra è quasi sempre una di due: una **negazione** ("elencare i X che non…", "solo…", "uno e uno solo") oppure una **quantificazione universale** ("tutti i…"). La prima si risolve con una differenza: si prende l'insieme delle tuple candidate e si sottrae quello delle tuple che violano la condizione. La seconda con il quoziente: il dividendo contiene le coppie (candidato, elemento) e il divisore l'insieme di tutti gli elementi che il candidato deve avere. Una terza famiglia, "il massimo / il più basso", si risolve con una differenza fra la relazione e il suo theta-join con una copia di se stessa che confronta due valori.

**Il prezzo più basso (2025-06-09, BloodyMary, schema ANALISI(Nome, Tipo, Digiuno, Prezzo, ValoreMin, ValoreMax)).** L'analisi con il prezzo più basso è quella per cui non ne esiste una più economica. Si rinomina la relazione in due copie A1 e A2, si fa il theta-join A1.Prezzo > A2.Prezzo, si proiettano gli attributi della copia A1 (le analisi che hanno qualcuna meno cara di loro, cioè le non minime) e le si sottrae alla relazione di partenza. La soluzione ufficiale è del tipo π_{Nome}(ρ(analisi)) − π_{A1.*}(ρ_{A1}(analisi) ⋈_{A1.Prezzo>A2.Prezzo} ρ_{A2}(analisi)) [indici dei rinomini da ricostruire, DA VERIFICARE sul PDF]. Dà tutte le analisi a pari prezzo minimo, non una sola.

**Strade a senso unico con tutti i tipi di edificio (2025-07-09, DeeBeeCity).** È un quoziente: dividendo π_{Strada, Tipo}(σ_{SensoUnico}(strada ⋈ edificio)), divisore π_{Tipo}(edificio). Il testo avverte che in EDIFICIO c'è almeno un edificio per ogni Tipo, e questo garantisce che il divisore sia l'insieme completo dei cinque tipi ('Abitazione', 'EsercizioCommerciale', 'EdificioPubblico', 'AreaVerde', 'Altro'): il risultato sono le strade a senso unico che compaiono in EDIFICIO in coppia con ciascuno di essi.

**Stand che vendono solo prodotti con glutine (2025-09-10, SagraBugliano).** "Non vendono alcun prodotto senza glutine" è una negazione: π_{NumeroStand}(prezzario) − π_{NumeroStand}(σ_{GlutenFree=TRUE}(prezzario)). Il primo termine contiene gli stand che hanno almeno un prodotto in listino, il secondo quelli che ne hanno almeno uno senza glutine; la differenza lascia quelli che hanno prodotti ma nessuno senza glutine. Uno stand senza alcun prodotto in PREZZARIO non comparirebbe (e non è chiaro se debba): è un caso limite che la soluzione ufficiale ignora.

**Partecipanti che hanno prenotato via app tutte le lezioni di "Calcio Binario" (2025-12-17).** Quoziente puro: dividendo π_{Partecipante, Data, Ora, Struttura}(σ_{Modalità='APP'}(prenotazione)), divisore π_{Data, Ora, Struttura}(σ_{Titolo='Calcio Binario'}(lezione ⋈_{Corso=Codice} corso)). Il divisore è l'insieme delle lezioni (identificate da Data, Ora, Struttura) del corso; il risultato è l'insieme dei partecipanti che compaiono nel dividendo con ognuna di esse.

**Utenti con una e una sola squadra (2026-01-23, FantaSanremo).** "Uno e uno solo" si ottiene come "almeno uno" meno "almeno due". Il primo termine è π_{Email}(σ_{AnnoNascita IS NOT NULL}(utente ⋈ squadra)); il secondo è l'insieme delle email che compaiono in due squadre diverse, ottenuto con un auto-join della relazione squadra rinominata in s1 e s2 sulla condizione α: s1.Email = s2.Email ∧ ¬(s1.NomeS = s2.NomeS ∧ s1.Lega = s2.Lega). Due squadre sono "diverse" se differisce la coppia (NomeS, Lega), non il solo nome.

**Case editrici che hanno vinto il Premio Strega solo prima del 1980 (2026-06-11, Premi Letterari).** Differenza fra chi ha vinto lo Strega almeno una volta e chi lo ha vinto nel 1980 o dopo: π_{NomeCasaEditrice, AnnoFondazione}(σ_{NomePremio='Premio Strega'}(casaeditrice ⋈ assegnazione)) − π_{NomeCasaEditrice, AnnoFondazione}(σ_{NomePremio='Premio Strega' ∧ AnnoAssegnazione≥1980}(casaeditrice ⋈ assegnazione)). Il testo estratto riporta l'attributo del premio come "NomeTitolo" (refuso del PDF o del docente: nello schema è `NomePremio`) [DA VERIFICARE sul PDF].

**Il premio più alto e i km necessari (2026-07-09, Open Bike).** Massimo con auto-confronto: premio − π_{P1.*}(ρ_{P1}(premio) ⋈_{P1.PremioEuro < P2.PremioEuro} ρ_{P2}(premio)). Il sottraendo è l'insieme dei premi che hanno almeno un premio più alto; ciò che resta di PREMIO(KmPremio, PremioEuro) è la riga con il premio massimo e i suoi chilometri.

**Gruppi che NON hanno prenotato tutte le aule con più di 100 posti (2026-09-03, DoveStudio).** È il complemento di un quoziente: l'insieme di tutti i gruppi meno il quoziente π_{Gruppo, Aula}(prenotazione) ÷ ρ_{Aula←Codice}(π_{Codice}(σ_{NumPosti>100}(aula))). I gruppi che non hanno mai prenotato nulla compaiono nel risultato, ed è corretto (non hanno prenotato tutte le aule). La rinomina serve ad allineare i nomi degli attributi del dividendo e del divisore, e le prenotazioni individuali (Gruppo NULL) non disturbano perché la sottrazione parte dall'insieme dei soli gruppi della relazione GRUPPO.

**Mostre con didascalia in tutte le lingue (2026-09-14, Mooseo).** Quoziente semplice: π_{NomeMostra, Lingua}(DIDASCALIA) ÷ π_{Lingua}(DIDASCALIA). Qui il divisore è l'insieme delle lingue presenti nella relazione stessa, quindi dividendo e divisore vengono dalla stessa tabella.

**Clienti che hanno prenotato in ogni piano in cui c'è una suite (simulazione 2024-25).** Quoziente R(Cliente, Piano) ÷ S(Piano), con R = π_{Cliente, Piano}(prenota) e S = π_{Piano}(σ_{Tipo='suite'}(camera)). La soluzione confronta solo il numero di piano: se hotel diversi hanno suite a piani diversi, il quoziente richiede il cliente su tutti quei piani senza guardare la città (si può raffinare usando la coppia (Città, Piano)).

**Fogli di esercizi (soluzioni mie, il docente le ha mostrate a lezione).** Sul database dei ricoveri (PAZIENTI, MEDICI, REPARTI, RICOVERI) i due esercizi duali sono "pazienti curati da tutti i medici" e "medici che hanno curato tutti i pazienti", dove "curato" vuol dire che il paziente è stato ricoverato nel reparto in cui il medico lavora. Si costruisce la relazione di appoggio Cura(Paz, MATR) = π_{Paz, MATR}(ricoveri ⋈_{ricoveri.Reparto = medici.Reparto} medici) e poi si divide: Cura ÷ π_{MATR}(medici) per i pazienti, π_{MATR, Paz}(Cura) ÷ ρ_{Paz←COD}(π_{COD}(pazienti)) per i medici (qui "tutti i pazienti" sono quelli in PAZIENTI, anche chi non è mai stato ricoverato). Sulla base "F1" l'esercizio "piloti che non hanno partecipato a gare nelle nazioni in cui si sono disputati almeno due gran premi" richiede prima di trovare le nazioni con almeno due GP, cioè quelle per cui esistono due tuple di GRANPREMIO con stessa Nazione e Anno diverso: N2 = π_{Nazione}(ρ_{G1}(granpremio) ⋈_{G1.Nazione = G2.Nazione ∧ G1.Anno ≠ G2.Anno} ρ_{G2}(granpremio)); poi π_{Nome}(pilota) − π_{Pilota}(piazzamento ⋈ N2). Sulla base "Torneo" l'esercizio dei "giocatori che hanno sempre vinto contro giocatori della loro stessa squadra" si imposta così: si individuano le partite fra compagni (Partita con Giocatore1 e Giocatore2 della stessa squadra), si prendono i giocatori coinvolti in almeno una di queste, e si sottraggono quelli che in almeno una di esse sono lo sconfitto (Vincitore diverso dal giocatore). Chiamata Intra l'insieme di queste partite, i partecipanti sono π_{G1}(Intra) ∪ π_{G2}(Intra) (con le dovute rinomine) e i perdenti sono π_{G1}(σ_{Vincitore≠G1}(Intra)) ∪ π_{G2}(σ_{Vincitore≠G2}(Intra)). Infine "serie TV doppiate in tutte le lingue tranne l'inglese" (NerdFlix, con l'ipotesi che ogni lingua abbia almeno una tupla in AUDIO): (π_{NomeSerie, Lingua}(audio) ÷ π_{Lingua}(σ_{Lingua≠'Inglese'}(audio))) − π_{NomeSerie}(σ_{Lingua='Inglese'}(audio)). Il quoziente richiede tutte le lingue diverse dall'inglese, e la differenza toglie le serie doppiate anche in inglese.

## 2. Calcolo relazionale su tuple

Teoria: [02 §7 Calcolo relazionale su tuple con range](02-algebra-e-calcolo-relazionale.md#7-calcolo-relazionale-su-tuple-trc-con-range), [§3 Quoziente](02-algebra-e-calcolo-relazionale.md#3-quantificazione-universale-quoziente).

Il calcolo con dichiarazione di range ha la forma {t.A, … | t(R) | formula}: la variabile libera percorre la relazione R e la formula usa ∃ e ∀ con altre variabili di range. Le richieste si dividono in tre famiglie: esistenza (∃), "solo / sempre" (∀ con implicazione, oppure ∃ e ¬∃) e "uno solo / almeno due" (∃ con un secondo ∃ o con ¬∃). Il trucco è l'implicazione: "tutti i referti dell'utente u sono nella norma" si scrive ∀r(r.Utente = u ⇒ condizione), che è vera anche se u non ha nessun referto. Quando la richiesta presuppone che l'utente ne abbia almeno uno, bisogna aggiungere un ∃.

**Utenti con solo analisi nella norma (2025-06-09).** {u.Nome, u.Cognome | u(utente) | ∀r(referto)((r.Nome=u.Nome ∧ r.Cognome=u.Cognome) ⇒ ∃a(analisi)(a.Nome=r.Analisi ∧ r.Valore > a.ValoreMin ∧ r.Valore < a.ValoreMax))}. Due imprecisioni: la soluzione ufficiale usa disuguaglianze strette, quindi un valore esattamente uguale al minimo o al massimo conta come "fuori norma", mentre nella domanda SQL della stessa prova "fuori norma" è `valore < valoremin OR valore > valoremax` (quindi gli estremi sono nella norma); per coerenza andrebbero ≥ e ≤. Inoltre l'implicazione include gli utenti senza referti.

**Strade principali lunghe più di 1 km con un solo incrocio (2025-07-09).** {s.Nome | s(strada) | s.Lunghezza>1 ∧ ∃i(incrocio)(s.Nome=i.Strada1 ∧ ¬∃i'(incrocio)((i.Strada1=i'.Strada1 ∧ i.Strada2≠i'.Strada2) ∨ i.Strada1=i'.Strada2))}. Letto a voce: esiste un incrocio i in cui la strada è la principale, e non esiste un altro incrocio i' in cui la stessa strada è principale con un'altra secondaria, né uno in cui è secondaria. I due disgiunti coprono i due ruoli che la strada può avere in un incrocio. I connettivi sono ricostruiti perché i simboli sono andati persi [DA VERIFICARE sul PDF].

**Ordini con solo prodotti vegani (2025-09-10).** {o.NumeroOrdine, o.DataOrdine, o.OraOrdine | $o(ORDINE)$ | ∃l(lineaordine)(l.NumeroOrdine=o.NumeroOrdine ∧ l.DataOrdine=o.DataOrdine ∧ ¬∃l'(lineaordine)(l'.NumeroOrdine=l.NumeroOrdine ∧ l'.DataOrdine=l.DataOrdine ∧ ∃p(prezzario)(p.NumeroStand=l'.NumeroStand ∧ p.NomeProdotto=l'.NomeProdotto ∧ p.VeganOK=FALSE)))}. Il "solo" è reso con un ∃ di partenza (l'ordine ha almeno una riga, escludendo gli ordini vuoti) e un ¬∃ che nega l'esistenza di una riga con un prodotto non vegano. È la forma "∃ … ∧ ¬∃ …", equivalente a un ∀ con implicazione ma più sicura.

**Corsi con lezioni di almeno due istruttori diversi (2025-12-17).** {c.Titolo, c.TotaleOre | c(Corso) | ∃l(LEZIONE)(l.Corso=c.Codice ∧ ∃l'(LEZIONE)(l'.Corso=c.Codice ∧ l.Istruttore≠l'.Istruttore))}: esistono due lezioni dello stesso corso con istruttori diversi.

**Cantanti con solo punteggi minori di 5 (2026-01-23).** {c.NomeC, c.TitoloCanzone | c(CANTANTE) | ∀p(PUNTEGGIO)(p.NomeC=c.NomeC ⇒ p.Punti<5)}. Qui il ∀ con implicazione è proprio ciò che serve ("nelle serate in cui hanno partecipato"); includere i cantanti che non hanno partecipato ad alcuna serata è accettabile.

**Case editrici fondate prima del 1900 con tutti i premi nazionali (2026-06-11).** {c.* | c(CasaEditrice) | c.AnnoFondazione<1900 ∧ ∀p(Premio)(p.Tipo='Nazionale' ⇒ ∃a(Assegnazione)(a.NomeCasaEditrice=c.NomeCasaEditrice ∧ a.NomePremio=p.NomePremio))}. È la traduzione diretta del quoziente: per ogni premio nazionale esiste un'assegnazione a quella casa. Nel testo estratto i quantificatori sono scomparsi [DA VERIFICARE sul PDF]: la formula è mia ma rispetta le parole della soluzione.

**Utenti nati prima del 2000 con soli tragitti casa-lavoro e lavoro-casa (2026-07-09).** La formula ufficiale è {u.* | u(Utente) | u.AnnoNascita<2000 ∧ ∀p(Percorso)(p.EmailUtente=u.Email ⇒ ((u.IndirizzoCasa=p.IndirizzoPartenza ∧ u.IndirizzoLavoro=p.IndirizzoArrivo) ∨ (u.IndirizzoLavoro=p.IndirizzoPartenza ∧ u.IndirizzoCasa=p.IndirizzoArrivo)))}. Nel PDF la soluzione scrive `u.IndirizzoLavoro=u.IndirizzoArrivo` (e il simile `u.IndirizzoCasa=u.IndirizzoArrivo`): è un refuso, l'indirizzo di arrivo appartiene a `p`. I quantificatori sono andati persi [DA VERIFICARE sul PDF].

**Gruppi che hanno sempre prenotato la stessa aula (2026-09-03).** Due formule equivalenti nella soluzione: la prima dice che per il gruppo esiste una prenotazione p e non esiste una prenotazione p' dello stesso gruppo con un'aula diversa; la seconda è la variante ∀: per ogni prenotazione del gruppo l'aula coincide con quella indicata. Il risultato mostra anche il nome dell'aula, per cui la variabile `a(AULA)` entra nell'intestazione {s.Gruppo, a.Nome | s(STUDENTE), a(AULA) | …}.

**Mostre di fotografia con didascalie in spagnolo e in inglese (2026-09-14).** {m.NomeMostra, m.EnteOrganizzatore | m(MOSTRA) | m.Tema='Fotografia' ∧ ∃d(DIDASCALIA)(d.NomeMostra=m.NomeMostra ∧ d.Lingua='Spagnolo') ∧ ∃d'(DIDASCALIA)(d'.NomeMostra=m.NomeMostra ∧ d'.Lingua='Inglese')}. Due ∃ indipendenti, perché le due didascalie possono riguardare opere diverse (è esplicitato dal testo).

**Camere a un posto in overbooking (simulazione 2024-25).** Due versioni. Nella prima l'overbooking è "stessa data di arrivo": {p.Num, p.Piano | p(PRENOTA) | ∃c(CAMERA)(c.NumPostiLetto=1 ∧ stessa camera di p) ∧ ∃p'(PRENOTA)(stessa camera ∧ p.Cliente≠p'.Cliente ∧ p.DataArrivo=p'.DataArrivo)}. Nella seconda "periodi che si sovrappongono anche in parte": si sostituisce l'ultima uguaglianza con l'intersezione di intervalli, (p.DataArrivo ≤ p'.DataArrivo < p.DataPartenza) ∨ (p'.DataArrivo ≤ p.DataArrivo < p'.DataPartenza). Per due intervalli, basta che l'inizio dell'uno cada dentro l'altro.

**Fogli di calcolo (soluzioni mie).** Sulla base dei ricoveri: pazienti ricoverati in tutti i reparti {p.Nome, p.Cognome | p(pazienti) | ∀r(reparti)(∃v(ricoveri)(v.PAZ=p.COD ∧ v.Reparto=r.COD))}; pazienti ricoverati in tutti i reparti diretti dal primario '203' (stessa formula con la guardia r.Primario='203' ⇒); medici che dirigono un solo reparto {m.Cognome, m.Nome | m(medici) | ∃r(reparti)(r.Primario=m.MATR ∧ ¬∃r'(reparti)(r'.Primario=m.MATR ∧ r'.COD≠r.COD))}. Sulla base F1, "piloti mai piazzati prima dei compagni di scuderia nella stessa stagione": {p.Nome, p.Nazione | p(pilota) | ¬∃a(piazzamento)(a.Pilota=p.Nome ∧ ∃b(piazzamento)(b.Anno=a.Anno ∧ b.Scuderia=a.Scuderia ∧ b.Pilota≠a.Pilota ∧ a.PosizioneInGara<b.PosizioneInGara))}, assumendo che "stagione" sia `Anno` e che si usi la posizione in gara (il testo non dice quale). Su NerdFlix, "serie drammatiche dirette interamente dal produttore": {s.NomeSerie, s.Nazione | s(SERIETV) | s.Genere='Drammatico' ∧ ∀e(EPISODIO)(e.NomeSerie=s.NomeSerie ⇒ e.Regista=s.Produttore)} (il valore esatto di Genere è un'assunzione; le serie senza episodi rientrano per vacuità, e per escluderle serve un ∃e).

## 3. SQL

Teoria: [03 SQL](03-sql.md) (§4 join, §5 aggregati, §6 insiemistici e nidificate).

Le tre domande dei temi sono tre tecniche: **(1) join + selezione + ORDER BY** (spesso con DISTINCT e con attenzione ai NULL), **(2) join + GROUP BY + HAVING** (conteggi e somme per gruppo), **(3) massimo, "tutti" e confronti fra gruppi** con WITH, sottoquery e NOT EXISTS. Per ogni query riporto lo schema in breve, la logica e la soluzione (corretta quando quella ufficiale ha un refuso).

### 3.1 Domande a bassa complessità (join, filtro, ordinamento)

Teoria: [03 §4 Join](03-sql.md#4-join-sintassi-esplicita).

**Utenti senza età con analisi fuori norma (2025-06-09).** Schema UTENTE(Nome, Cognome, Eta, Sesso), REFERTO(Nome, Cognome, Data, Analisi, Valore), ANALISI(Nome, Tipo, Digiuno, Prezzo, ValoreMin, ValoreMax); chiave esterna composta (Nome, Cognome). Si fa il join con la condizione su entrambi gli attributi, si controlla `Eta IS NULL` (con NULL non si usa `=`) e `valore < valoremin OR valore > valoremax`, e si usa DISTINCT perché un utente può avere più analisi fuori norma.

```sql
SELECT DISTINCT u.cognome, u.nome
FROM utente u JOIN referto r ON u.nome=r.nome AND u.cognome=r.cognome
              JOIN analisi a ON r.analisi=a.nome
WHERE eta IS NULL AND (valore < valoremin OR valore > valoremax)
ORDER BY u.cognome, u.nome;
```

**Edifici pubblici vicini a un incrocio (2025-07-09).** STRADA(Nome, Lunghezza, SensoUnico), INCROCIO(Strada1, Strada2, KmStrada1, KmStrada2), EDIFICIO(Strada, NumeroCivico, Km, Tipo, Nome*). Si cercano edifici pubblici di nome noto su una strada che, entro 100 metri (0,10 km) dall'edificio, incrocia una strada secondaria. L'edificio si collega alla strada come Strada1 dell'incrocio (la principale, così l'altra è secondaria) e la distanza si misura con `ABS(e.km − i.KmStrada1) < 0.10`, che copre sia gli incroci prima sia quelli dopo l'edificio.

```sql
SELECT e.Nome, e.Strada
FROM edificio e JOIN incrocio i ON (e.strada=i.strada1)
WHERE ABS(e.km - i.KmStrada1) < 0.10 AND e.Nome IS NOT NULL AND Tipo='EdificioPubblico'
ORDER BY e.Nome DESC, e.Strada DESC;
```

**Stand con prodotti vegani o senza glutine non pagati con Satispay (2025-09-10).** SagraBugliano: STAND, PREZZARIO(NumeroStand, NomeProdotto, VeganOK, GlutenFree, Prezzo), ORDINE, LINEAORDINE. Catena di join STAND → PREZZARIO → LINEAORDINE → ORDINE con le chiavi composte, filtro `(VeganOK OR GlutenFree) AND NOT (TipoPagamento='Satispay')`. Come scritta nella soluzione ufficiale manca `DISTINCT`: uno stand che ha venduto molti prodotti idonei comparirebbe tante volte, mentre la richiesta è un elenco di stand.

```sql
SELECT DISTINCT s.NomeStand, s.TipoStand
FROM stand s JOIN prezzario p ON s.NumeroStand=p.NumeroStand
     JOIN lineaordine l ON p.NumeroStand=l.NumeroStand AND p.NomeProdotto=l.NomeProdotto
     JOIN ordine o ON l.NumeroOrdine=o.NumeroOrdine AND l.DataOrdine=o.DataOrdine
WHERE (p.VeganOK='True' OR p.GlutenFree='True') AND NOT (o.TipoPagamento='Satispay')
ORDER BY s.NomeStand;
```

**Corsi con lezioni prenotate via app da adulti o tipo sconosciuto (2025-12-17).** Partecipante(Codice, Cognome, Nome, Tipo*), Corso, Istruttore, Lezione(Data, Ora, Struttura, Corso, Istruttore), Prenotazione(Data, Ora, Struttura, Partecipante, Modalità). Tipo può essere NULL, perciò l'espressione è `Tipo='Adulto' OR Tipo IS NULL`; il confronto `Tipo<>'Bambino'` sarebbe sbagliato perché scarta i NULL. Ordinamento per ore decrescenti e titolo crescente.

```sql
SELECT DISTINCT c.Codice, c.Titolo
FROM partecipante par JOIN prenotazione pre ON par.Codice=pre.Partecipante
     JOIN lezione l ON l.Data=pre.Data AND l.Ora=pre.Ora AND l.Struttura=pre.Struttura
     JOIN corso c ON l.Corso=c.Codice
WHERE Modalità='APP' AND (Tipo='Adulto' OR Tipo IS NULL)
ORDER BY c.TotaleOre DESC, c.Titolo ASC;
```

**Squadre di una lega con capitani economici o utenti senza anno di nascita (2026-01-23).** FantaSanremo: Utente(Email, Nickname, Cognome, Nome, AnnoNascita*), Cantante(NomeC, TitoloCanzone, Baudi), Squadra(NomeS, Lega, Email), ComposizioneSquadra(NomeS, Lega, NomeC, Capitano), Punteggio. Il capitano si individua con `Capitano=TRUE`, quattro tabelle in join. La soluzione ufficiale scrive `SELECT s.NomeS, Nickname, Email`, ma `Email` esiste sia in Utente sia in Squadra e PostgreSQL darebbe "column reference is ambiguous": va scritto `u.Email`.

```sql
SELECT s.NomeS, u.Nickname, u.Email
FROM Squadra s JOIN ComposizioneSquadra cs ON s.NomeS=cs.NomeS AND s.Lega=cs.Lega
     JOIN Cantante c ON cs.NomeC=c.NomeC JOIN Utente u ON u.Email=s.Email
WHERE cs.Capitano=TRUE AND s.Lega='PessiNet12' AND (u.AnnoNascita IS NULL OR c.Baudi<15)
ORDER BY s.NomeS DESC;
```

**Case editrici che hanno vinto lo Strega nell'anno di fondazione, per città (2026-06-11).** Si confronta `c.AnnoFondazione = a.AnnoAssegnazione`, si filtra sul premio e si raggruppa per città. Nel PDF la condizione `a.NomePremio='Premio Strega'` è finita sopra la query a causa dell'impaginazione; la versione corretta è:

```sql
SELECT c.Città, COUNT(c.NomeCasaEditrice)
FROM casaeditrice c JOIN assegnazione a ON c.NomeCasaEditrice=a.NomeCasaEditrice
WHERE c.AnnoFondazione=a.AnnoAssegnazione AND a.NomePremio='Premio Strega'
GROUP BY c.Città;
```

**Km totali sul tragitto casa-lavoro per utente (2026-07-09, Open Bike).** Utente(Email, Nickname, AnnoNascita, IndirizzoCasa, IndirizzoLavoro*), Percorso(EmailUtente, DataOraPartenza, DataOraArrivo, IndirizzoPartenza, IndirizzoArrivo, KmPercosi). Il tragitto casa→lavoro e quello lavoro→casa sono due casi di una stessa condizione OR sui due indirizzi; si somma e si raggruppa per Email (chiave, quindi Nickname e AnnoNascita sono ammessi nel SELECT). Nello schema del PDF l'attributo si chiama `KmPercosi` (refuso nel testo) mentre la soluzione scrive `pKMPercorsi`: i nomi vanno adattati.

```sql
SELECT Nickname, AnnoNascita, SUM(KmPercorsi) AS TotKM
FROM utente u JOIN percorso p ON u.Email=p.EmailUtente
WHERE (p.IndirizzoPartenza=u.IndirizzoCasa AND p.IndirizzoArrivo=u.IndirizzoLavoro)
   OR (p.IndirizzoPartenza=u.IndirizzoLavoro AND p.IndirizzoArrivo=u.IndirizzoCasa)
GROUP BY u.Email
ORDER BY u.AnnoNascita DESC, u.Nickname ASC;
```

**Studenti con prenotazione di gruppo nel pomeriggio (2026-09-03 e 2023-06-15, DoveStudio).** STUDENTE(Matricola, Ateneo, Cognome, Nome, DataNascita, Gruppo*), AULA, PRENOTAZIONE(Matricola, Ateneo, Data, Aula, FasciaOraria, Gruppo*), GRUPPO. Una prenotazione "per il proprio gruppo" ha `Gruppo IS NOT NULL`, una "solo per sé" ha `Gruppo IS NULL`. La fascia "almeno il pomeriggio" comprende 'pomeriggio' e 'intera giornata'. "In ordine crescente di età" significa data di nascita **decrescente**. Nel tema del 2023 la stessa domanda chiede "solo per sé" e "almeno la mattinata".

```sql
SELECT s.Cognome, s.Ateneo, s.DataNascita, a.Nome
FROM studente s JOIN prenotazione p ON s.Matricola=p.Matricola AND s.Ateneo=p.Ateneo
     JOIN aula a ON a.Codice=p.Aula
WHERE p.Data='20260903' AND p.Gruppo IS NOT NULL
  AND (FasciaOraria='pomeriggio' OR FasciaOraria='intera giornata')
ORDER BY DataNascita DESC, Cognome ASC, s.Nome ASC;
```

**Mostre tedesche di archeologia con didascalia in inglese (2026-09-14, Mooseo).** Un join MOSTRA–DIDASCALIA, i filtri, DISTINCT e ORDER BY:

```sql
SELECT DISTINCT m.NomeMostra
FROM MOSTRA m JOIN DIDASCALIA d ON m.NomeMostra=d.NomeMostra
WHERE m.Nazione='Germania' AND m.Tema='Archeologia' AND d.Lingua='Inglese'
ORDER BY m.NomeMostra;
```

**Clienti con due prenotazioni di camere con numero di letti diverso (simulazione 2024-25).** Self-join di PRENOTA sul cliente e join di entrambe con CAMERA per leggere `NumPostiLetto`, condizione `c1.NumPostiLetto <> c2.NumPostiLetto`.

```sql
SELECT DISTINCT p1.Cliente
FROM prenota p1 JOIN prenota p2 ON p1.Cliente=p2.Cliente
     JOIN camera c1 ON p1.Città=c1.Città AND p1.Num=c1.Num AND p1.Piano=c1.Piano
     JOIN camera c2 ON p2.Città=c2.Città AND p2.Num=c2.Num AND p2.Piano=c2.Piano
WHERE c1.NumPostiLetto<>c2.NumPostiLetto;
```

### 3.2 Domande a media complessità (GROUP BY e HAVING)

Teoria: [03 §5 Aggregati e raggruppamenti](03-sql.md#5-aggregati-e-raggruppamenti).

La regola che questi temi mettono alla prova è la distinzione fra WHERE (filtro sulle singole righe, prima del raggruppamento) e HAVING (filtro sul gruppo, su un aggregato). Le condizioni sulle singole tuple vanno in WHERE, i conteggi e le somme in HAVING. L'altro punto è COUNT(DISTINCT …) per contare entità distinte quando il join moltiplica le righe.

**Analisi sotto i 50 € con oltre 100 mila € di ricavi nel 2024 (2025-06-09).** Il ricavo è la somma dei prezzi delle righe di REFERTO (ogni riga è un'analisi effettuata). La soluzione ufficiale fa il join anche con UTENTE, che non serve:

```sql
SELECT a.nome, SUM(prezzo), MAX(data)
FROM referto r JOIN analisi a ON r.analisi=a.nome
WHERE data >= '20240101' AND data <= '20241231' AND prezzo < 50
GROUP BY a.nome
HAVING SUM(prezzo) > 100000;
```

**Strade a senso unico più corte di 5 km con più di 20 incroci (2025-07-09).** La strada può essere principale o secondaria, quindi il join ha una condizione OR; il filtro su senso unico e lunghezza è per riga (WHERE), quello sul numero di incroci è per gruppo (HAVING COUNT(*) > 20).

```sql
SELECT s.Nome, s.Lunghezza
FROM strada s JOIN incrocio i ON s.Nome=i.Strada1 OR s.Nome=i.Strada2
WHERE s.SensoUnico='True' AND s.Lunghezza<5
GROUP BY s.Nome
HAVING COUNT(*) > 20;
```

**Ordini con almeno due stand diversi dello stesso tipo (2025-09-10).** Si raggruppa per ordine e tipo di stand, e la condizione `COUNT(DISTINCT s.NumeroStand) >= 2` seleziona i gruppi (ordine, tipo) con due stand diversi; `SUM(Prezzo*Quantità)` dà il totale pagato in quel tipo. Nella soluzione ufficiale la condizione del primo join è `l.NumeroStand = l.NumeroStand` (sempre vera): è un refuso, deve essere `p.NumeroStand = l.NumeroStand`, altrimenti il join accoppia ogni riga d'ordine con tutti i prodotti dello stesso nome di qualunque stand.

```sql
SELECT l.NumeroOrdine, l.DataOrdine, s.TipoStand, SUM(p.Prezzo*l.Quantità)
FROM lineaordine l JOIN prezzario p
       ON l.NumeroStand=p.NumeroStand AND l.NomeProdotto=p.NomeProdotto
     JOIN stand s ON p.NumeroStand=s.NumeroStand
GROUP BY l.NumeroOrdine, l.DataOrdine, s.TipoStand
HAVING COUNT(DISTINCT s.NumeroStand) >= 2;
```

**Istruttori non dilettanti con lezioni affollate (2025-12-17).** Qui il raggruppamento è per **lezione** (Data, Ora, Struttura) più istruttore e corso, e HAVING conta le prenotazioni adulte di ciascuna lezione: `COUNT(*) > 50`. In PostgreSQL si può selezionare `c.Titolo` perché `c.Codice` è chiave primaria e sta nel GROUP BY.

```sql
SELECT i.Codice, c.Titolo
FROM partecipante par JOIN prenotazione pre ON par.Codice=pre.Partecipante
     JOIN lezione l ON l.Data=pre.Data AND l.Ora=pre.Ora AND l.Struttura=pre.Struttura
     JOIN corso c ON l.Corso=c.Codice JOIN istruttore i ON l.Istruttore=i.Codice
WHERE par.Tipo='Adulto' AND i.Qualifica<>'DIL'
GROUP BY i.Codice, c.Codice, pre.Data, pre.Ora, pre.Struttura
HAVING COUNT(*) > 50;
```

**Squadre di utenti maggiorenni (o età ignota) con più di 100 Baudi o più di 7 cantanti (2026-01-23).** Condizione d'età in WHERE (`CURRENTYEAR()-AnnoNascita >= 18 OR AnnoNascita IS NULL`), raggruppamento per squadra (NomeS, Lega) e HAVING con l'OR fra i due aggregati: `COUNT(DISTINCT c.NomeC) > 7 OR SUM(c.Baudi) > 100`. Il DISTINCT sul conteggio è prudente quando il join può duplicare le righe.

**Percorsi "lontani da casa" (2026-07-09).** Per gli utenti che lavorano a un indirizzo dato o non lo hanno dichiarato, con almeno 10 percorsi con partenza diversa dalla casa, la data e l'ora di arrivo dell'ultimo percorso. Il vincolo "no LIMIT/TOP/ROWNUM, no sottoquery" si rispetta con `MAX(DataOraArrivo)`:

```sql
SELECT u.Email, MAX(DataOraArrivo)
FROM utente u JOIN percorso p ON u.Email=p.EmailUtente
WHERE (u.IndirizzoLavoro='Via Pessinetto 12' OR u.IndirizzoLavoro IS NULL)
  AND p.IndirizzoPartenza<>u.IndirizzoCasa
GROUP BY u.Email
HAVING COUNT(*) >= 10;
```

**Case editrici con tripletta di premi nello stesso anno (2026-06-11).** Senza sottoquery, la condizione "ha vinto Strega e Campiello nello stesso anno e anche Bancarella o Flaiano" si risolve con un triplo auto-join di ASSEGNAZIONE sulla stessa casa e sullo stesso anno, ognuno con la sua condizione sul nome del premio (a3 con un OR). Si usa DISTINCT perché lo stesso anno può dare più combinazioni (Bancarella e Flaiano insieme).

```sql
SELECT DISTINCT a1.NomeCasaEditrice, a1.AnnoAssegnazione
FROM Assegnazione a1
 JOIN Assegnazione a2 ON a1.NomeCasaEditrice=a2.NomeCasaEditrice AND a1.AnnoAssegnazione=a2.AnnoAssegnazione
 JOIN Assegnazione a3 ON a1.NomeCasaEditrice=a3.NomeCasaEditrice AND a1.AnnoAssegnazione=a3.AnnoAssegnazione
WHERE a1.NomePremio='Premio Strega' AND a2.NomePremio='Premio Campiello'
  AND (a3.NomePremio='Premio Bancarella' OR a3.NomePremio='Premio Flaiano');
```

**Gruppi creati nel 2025 con almeno cinque aule distinte da più di 100 posti nel 2026 (2026-09-03).** Le date sono stringhe 'AAAAMMGG', quindi `LIKE '2025%'` funziona. Nel PDF il filtro `a.NumPosti>100` è finito fuori posto: va in WHERE. Il numero di prenotazioni è `COUNT(*)`, le aule distinte `COUNT(DISTINCT p.Aula) >= 5`.

```sql
SELECT g.NomeGruppo, COUNT(*) AS NumPrenotazioni
FROM gruppo g JOIN prenotazione p ON g.NomeGruppo=p.Gruppo JOIN aula a ON p.Aula=a.Codice
WHERE g.DataCreazione LIKE '2025%' AND p.Data LIKE '2026%' AND a.NumPosti>100
GROUP BY g.NomeGruppo
HAVING COUNT(DISTINCT p.Aula) >= 5;
```

**Gruppi del 2020 con almeno tre aule distinte nel 2021 (2023-06-15).** Stessa struttura, soglia 3, e `COUNT(DISTINCT Data)` per il numero di prenotazioni (vale perché UNIQUE(Data, Gruppo)). Il join con STUDENTE nella soluzione ufficiale è ridondante.

**Mostre con almeno cinque sezioni con un'opera ante 1950 e audioguida originale in spagnolo (2026-09-14).** Un join OPERA–AUDIOGUIDA sulla chiave composta, filtri su anno, lingua e `Originale = TRUE`, raggruppamento per mostra e `HAVING COUNT(DISTINCT o.Sezione) >= 5` (il DISTINCT conta le sezioni e non le opere).

```sql
SELECT o.NomeMostra
FROM OPERA o JOIN AUDIOGUIDA a ON a.NomeMostra=o.NomeMostra AND a.Sezione=o.Sezione AND a.NumeroOpera=o.NumeroOpera
WHERE o.Anno<1950 AND a.Lingua='Spagnolo' AND a.Originale=TRUE
GROUP BY o.NomeMostra
HAVING COUNT(DISTINCT o.Sezione) >= 5;
```

**Clienti che pagano più della media della propria città (simulazione 2024-25).** Non si può usare WITH: serve una sottoquery **correlata** che calcola la media del prezzo a notte per la città di residenza del cliente esterno. La soluzione ufficiale ha i riferimenti di colonna invertiti (`cl.Cliente=p.NumTessera` invece di `cl.NumTessera=p.Cliente`) e la sottoquery dimentica di unire anche `Città`. Versione corretta:

```sql
SELECT DISTINCT cl.NumTessera, cl.Nome, cl.CittàResidenza
FROM cliente cl JOIN prenota p ON cl.NumTessera=p.Cliente
     JOIN camera ca ON p.Città=ca.Città AND p.Num=ca.Num AND p.Piano=ca.Piano
WHERE ca.Prezzo > (SELECT AVG(ca1.Prezzo)
                   FROM cliente cl1 JOIN prenota p1 ON cl1.NumTessera=p1.Cliente
                        JOIN camera ca1 ON p1.Città=ca1.Città AND p1.Num=ca1.Num AND p1.Piano=ca1.Piano
                   WHERE cl1.CittàResidenza=cl.CittàResidenza);
```

### 3.3 Domande ad alta complessità (massimi, "tutti", WITH)

Teoria: [03 §6 Insiemistici e nidificate](03-sql.md#6-insiemistici-e-nidificate).

La domanda alta è quasi sempre una di queste: **(a) "tutti"** con doppio NOT EXISTS (quantificazione universale: non esiste un elemento per cui non esista…); **(b) "il massimo"** con una CTE che calcola un aggregato per gruppo e una query esterna che lo confronta con `MAX` di quella CTE (più robusto di `ORDER BY … LIMIT 1` perché gestisce i pari merito, e il testo spesso vieta LIMIT); **(c) un confronto fra due aggregati di uno stesso gruppo**, da costruire con due CTE o con un'esclusione ("NOT IN le eccezioni").

**Utenti che hanno fatto tutte le analisi senza digiuno (2025-06-09).** Doppio NOT EXISTS, senza aggregati: non esiste un'analisi senza digiuno che l'utente non abbia fatto. La NOT IN interna cerca fra i referti dello stesso utente.

```sql
SELECT DISTINCT nome, cognome
FROM referto r
WHERE NOT EXISTS (
  SELECT * FROM analisi a
  WHERE a.digiuno=false AND a.nome NOT IN (
        SELECT r1.analisi FROM referto r1
        WHERE r1.nome=r.nome AND r1.cognome=r.cognome));
```

**Strade "residenziali" con il maggior numero di incroci (2025-07-09).** Prima CTE: le strade senza edifici di tipo diverso da 'Abitazione' (`NOT IN` sui tipi diversi). Seconda CTE: per ciascuna, il numero di incroci contati come principale o secondaria. Query esterna: quelle col massimo.

```sql
WITH StradeResidenziali AS (
  SELECT s.Nome FROM strada s
  WHERE s.Nome NOT IN (SELECT e.Strada FROM edificio e WHERE e.Tipo<>'Abitazione')),
StradeResidenzialiIncroci AS (
  SELECT sr.Nome, COUNT(*) AS NumIncroci
  FROM StradeResidenziali sr JOIN incrocio i ON sr.Nome=i.Strada1 OR sr.Nome=i.Strada2
  GROUP BY sr.Nome)
SELECT Nome FROM StradeResidenzialiIncroci
WHERE NumIncroci = (SELECT MAX(NumIncroci) FROM StradeResidenzialiIncroci);
```

**Stand che hanno venduto tutti i loro prodotti (2025-09-10).** Ancora il doppio NOT EXISTS, con il vincolo di non usare aggregati: non esiste un prodotto dello stand che non compaia in nessuna riga d'ordine.

```sql
SELECT s.NumeroStand, s.NomeStand
FROM stand s
WHERE NOT EXISTS (
  SELECT * FROM prezzario p
  WHERE p.NumeroStand=s.NumeroStand AND NOT EXISTS (
    SELECT * FROM lineaordine l
    WHERE l.NumeroStand=p.NumeroStand AND l.NomeProdotto=p.NomeProdotto));
```

**Istruttori professionisti: corsi in cui ogni lezione ha più prenotati via app che via web (2025-12-17).** Si costruiscono due CTE con il numero di prenotati per lezione (app, web); le "eccezioni" sono le lezioni con app ≤ web; si escludono i corsi che hanno almeno un'eccezione e si contano i corsi rimasti per istruttore (COUNT DISTINCT, perché un corso ha più lezioni). C'è un'imprecisione: con i join interni fra le due CTE, una lezione con zero prenotati via web (o via app) non compare in una delle due e non viene mai considerata un'eccezione, mentre una lezione con 0 app e qualche web dovrebbe esserlo. Per rimediare servirebbe un FULL JOIN o un LEFT JOIN a partire da LEZIONE con `COALESCE(…, 0)`.

```sql
WITH NumPartecipantiApp AS (
  SELECT Data, Ora, Struttura, COUNT(*) AS NumPartApp FROM prenotazione WHERE Modalità='APP'
  GROUP BY Data, Ora, Struttura),
NumPartecipantiWeb AS (
  SELECT Data, Ora, Struttura, COUNT(*) AS NumPartWeb FROM prenotazione WHERE Modalità='WEB'
  GROUP BY Data, Ora, Struttura)
SELECT i.Codice, i.Cognome, i.Nome, COUNT(DISTINCT l.Corso)
FROM istruttore i JOIN lezione l ON i.Codice=l.Istruttore
WHERE i.Qualifica='PROF' AND l.Corso NOT IN (
  SELECT Corso FROM lezione l2
  JOIN NumPartecipantiApp npa ON npa.Data=l2.Data AND npa.Ora=l2.Ora AND npa.Struttura=l2.Struttura
  JOIN NumPartecipantiWeb npw ON npw.Data=l2.Data AND npw.Ora=l2.Ora AND npw.Struttura=l2.Struttura
  WHERE NumPartApp <= NumPartWeb)
GROUP BY i.Codice;
```

**Squadra vincitrice di ogni lega, capitano a punti doppi (2026-01-23).** L'idea è calcolare i punti dei non capitani e i punti dei capitani (moltiplicati per 2), sommarli per squadra e scegliere in ogni lega il massimo con una sottoquery correlata sulla lega. La soluzione ufficiale ha due difetti: mancano le virgole in `SELECT cs.NomeS, cs.Lega SUM(p.Punti)` e in `SELECT cs.NomeS, cs.Lega 2*p.Punti`, e la CTE dei capitani non aggrega: se il capitano ha punteggi in più serate si ottengono più righe e il join con la CTE dei non capitani le moltiplica. Versione corretta con un'unica CTE:

```sql
WITH PuntiSquadra AS (
  SELECT cs.NomeS, cs.Lega,
         SUM(CASE WHEN cs.Capitano THEN 2*p.Punti ELSE p.Punti END) AS PuntiTot
  FROM ComposizioneSquadra cs JOIN Punteggio p ON cs.NomeC=p.NomeC
  GROUP BY cs.NomeS, cs.Lega)
SELECT p.Lega, p.NomeS AS SquadraVincitrice
FROM PuntiSquadra p
WHERE p.PuntiTot = (SELECT MAX(p2.PuntiTot) FROM PuntiSquadra p2 WHERE p2.Lega=p.Lega);
```

**Case editrici senza premi internazionali dal 2000 con il maggior numero di Premi Strega (2026-06-11).** Prima CTE: le case con `NOT EXISTS` di un premio internazionale dal 2000; seconda CTE: il conteggio di Premi Strega dal 2000 per ciascuna; esterna: il massimo. Nella versione ufficiale il LEFT JOIN è annullato dal `WHERE a.NomePremio='Premio Strega'` (che scarta le righe con NULL), quindi le case senza Strega non compaiono e il massimo è calcolato solo fra chi ne ha almeno uno: è accettabile, ma il LEFT JOIN è inutile.

**Utenti con meno percorsi del massimo, con il premio vinto (2026-07-09).** Si calcola per ogni utente numero di percorsi e totale chilometri; il premio è `MAX(PremioEuro)` fra quelli con `KmPremio <= TotKM`, preso con un LEFT JOIN così chi non raggiunge nessuna soglia ottiene `COALESCE(…, 0)`. La condizione `NumPercorsi < (SELECT MAX(NumPercorsi) …)` esclude tutti gli utenti che hanno il massimo numero di percorsi (ex aequo compresi). Un utente senza alcun percorso non appare perché non ha righe in PERCORSO.

```sql
WITH UtentePercorsi AS (
  SELECT EmailUtente, COUNT(*) AS NumPercorsi, SUM(KmPercorsi) AS TotKM
  FROM percorso GROUP BY EmailUtente),
PremioVinto AS (
  SELECT up.EmailUtente, up.NumPercorsi, COALESCE(MAX(p.PremioEuro),0) AS Vincita
  FROM UtentePercorsi up LEFT JOIN premio p ON up.TotKM >= p.KmPremio
  GROUP BY up.EmailUtente, up.NumPercorsi)
SELECT EmailUtente, Vincita FROM PremioVinto
WHERE NumPercorsi < (SELECT MAX(NumPercorsi) FROM PremioVinto);
```

**Gruppi in cui ogni componente ha prenotato a nome del gruppo, ma solo nel 2025 (2026-09-03).** È la più complessa. La prima CTE tiene le prenotazioni di gruppo del 2025 fatte da persone che **non** hanno fatto prenotazioni di gruppo in altri anni (NOT EXISTS su una prenotazione di gruppo non 2025 con stessa matricola e ateneo). La query esterna prende i gruppi per cui non esiste un componente (riga di STUDENTE con quel gruppo) che non compaia fra gli autori di quelle prenotazioni: il consueto doppio NOT EXISTS per il "ogni".

```sql
WITH PrenotazioniGruppiSolo2025 AS (
  SELECT * FROM prenotazione p
  WHERE p.Data LIKE '2025%' AND p.Gruppo IS NOT NULL AND NOT EXISTS (
    SELECT * FROM prenotazione p1
    WHERE NOT (p1.Data LIKE '2025%') AND p1.Gruppo IS NOT NULL
      AND p1.Ateneo=p.Ateneo AND p1.Matricola=p.Matricola))
SELECT DISTINCT p.Gruppo
FROM PrenotazioniGruppiSolo2025 p
WHERE NOT EXISTS (
  SELECT * FROM studente s
  WHERE s.Gruppo=p.Gruppo AND NOT EXISTS (
    SELECT * FROM PrenotazioniGruppiSolo2025 p1
    WHERE s.Matricola=p1.Matricola AND s.Ateneo=p1.Ateneo AND s.Gruppo=p.Gruppo));
```

**Mostre con meno sezioni del massimo e il maggior numero di opere (2026-09-14).** Prima CTE `Statistiche` con numero di sezioni e di opere per mostra (LEFT JOIN, per includere le mostre senza opere: `COUNT(o.NumeroOpera)` conta solo i non NULL); seconda `Candidate` con le mostre sotto il massimo di sezioni; la query finale prende il massimo di opere fra le candidate, ex aequo compresi.

```sql
WITH Statistiche AS (
  SELECT m.NomeMostra, COUNT(DISTINCT o.Sezione) AS NumeroSezioni, COUNT(o.NumeroOpera) AS NumeroOpere
  FROM MOSTRA m LEFT JOIN OPERA o ON o.NomeMostra=m.NomeMostra GROUP BY m.NomeMostra),
Candidate AS (
  SELECT * FROM Statistiche WHERE NumeroSezioni < (SELECT MAX(NumeroSezioni) FROM Statistiche))
SELECT NomeMostra FROM Candidate
WHERE NumeroOpere = (SELECT MAX(NumeroOpere) FROM Candidate);
```

**Aule in cui i posti della mattina non sono mai stati esauriti (2023-06-15, operatori insiemistici ammessi).** Si uniscono con UNION le prenotazioni individuali (Gruppo NULL) e quelle di gruppo espanse ai componenti (join STUDENTE–PRENOTAZIONE sul gruppo) in fascia mattina o intera giornata; si contano gli studenti per aula e data e si escludono le aule in cui `NumStud >= NumPosti` in almeno una data. La soluzione scrive `'mattina'` mentre il dominio nel testo è `'mattino'`: refuso da correggere.

**Clienti che hanno sempre e solo prenotato suite all'ultimo piano (simulazione 2024-25).** Si calcola per ogni città il piano massimo (CTE), si escludono con NOT IN i clienti che hanno almeno una prenotazione che non è una suite oppure non è all'ultimo piano, e si contano i clienti rimasti:

```sql
WITH HotelMaxPiano AS (SELECT Città, MAX(Piano) AS MaxPiano FROM camera GROUP BY Città)
SELECT COUNT(DISTINCT Cliente) FROM prenota
WHERE Cliente NOT IN (
  SELECT p.Cliente
  FROM prenota p JOIN camera c ON p.Città=c.Città AND p.Num=c.Num AND p.Piano=c.Piano
       JOIN HotelMaxPiano h ON h.Città=p.Città
  WHERE c.Tipo<>'suite' OR p.Piano<h.MaxPiano);
```

### 3.4 Foglio di esercizi sullo schema fornitori-parti (S, P, SP)

Teoria: [03 §7 PostgreSQL e query tipo](03-sql.md#7-postgresql-lab-07), [§4 Join](03-sql.md#4-join-sintassi-esplicita), [§5 Aggregati](03-sql.md#5-aggregati-e-raggruppamenti), [§6 Nidificate](03-sql.md#6-insiemistici-e-nidificate).

I sette fogli `Esercizi_1..7_sql` lavorano tutti sul database classico di Date, con S(SNum, SName, Status, City), P(PNum, PName, Color, Weight, City) e SP(SNum, PNum, QTY). I dati stanno in `S_P_SP.sql`: S1 Smith 20 London, S2 Jones 10 Paris, S3 Blake 30 Paris, S4 Clark 20 London, S5 Adams 30 Athens; P1 Nut Red 12 London, P2 Bolt Green 17 Paris, P3 Screw Blue 17 Rome, P4 Screw Red 14 London, P5 Cam Blue 12 Paris, P6 Cog Red 19 London; SP: S1 con P1…P6 (300, 200, 400, 200, 100, 100), S2 con P1 300 e P2 400, S3 con P2 200, S4 con P2 200, P4 300, P5 400. I fogli non hanno soluzioni pubblicate; le query sono mie e i risultati sono stati eseguiti su questi dati.

Il primo foglio chiede di creare le tabelle con vincoli e `ON DELETE CASCADE` e di sperimentare inserimenti, modifiche e cancellazioni; lo script `S_P_SP.sql` crea S, P, SP con le chiavi primarie e le due chiavi esterne con cascade. È una pratica sul DBMS più che una query: cancellando un fornitore si cancellano a cascata le sue forniture.

Foglio 2 (selezione, LIKE, join semplici). I pattern: nome con una h `SName LIKE '%h%'` → Smith; con una s → Jones, Adams (PostgreSQL distingue maiuscole e minuscole, la S di Smith non conta); con una a e che termina con s `LIKE '%a%s'` → Adams; con a ed e `LIKE '%a%' AND LIKE '%e%'` → Blake; con tutte le vocali → nessuno; con nome uguale a quello di una parte `SName IN (SELECT PName FROM P)` → nessuno; parti con nome di almeno 4 caratteri `LENGTH(PName) >= 4` → Bolt, Screw, Screw. Parti rosse con peso fra 13 e 17 `Color='Red' AND Weight BETWEEN 13 AND 17` → Screw (P4). Fornitori di Atene con status sotto 20 → nessuno (S5 ha 30). Parti disponibili nella stessa città di un fornitore: join P–S su City, con DISTINCT, 10 righe (Nut, Screw e Cog con Smith e Clark a Londra; Bolt e Cam con Jones e Blake a Parigi). Fornitori che hanno evaso almeno una volta ordini di almeno 300 bulloni o 300 dadi, e fornitori che hanno fornito parti con peso fuori dall'intervallo [14, 17]:

```sql
SELECT DISTINCT SName FROM S JOIN SP USING(SNum) JOIN P USING(PNum)
WHERE SP.QTY>=300 AND P.PName IN ('Bolt','Nut') ORDER BY SName;   -- Jones, Smith
SELECT DISTINCT SName, Status FROM S JOIN SP USING(SNum) JOIN P USING(PNum)
WHERE Weight<14 OR Weight>17 ORDER BY Status DESC;                  -- Smith 20, Clark 20, Jones 10
```

Foglio 3 (outer join, self-join). Fornitori con status maggiore di 20 e la quantità delle parti eventualmente fornite: `S LEFT JOIN SP … WHERE Status>20` → Blake 200, Adams NULL. Parti verdi con le città dei loro eventuali fornitori: due LEFT JOIN a partire da P, filtro `Color='Green'`, dà Bolt con London, Paris, Paris, London. Fornitori con forniture minori di 200, compresi quelli senza forniture: `LEFT JOIN … WHERE SP.QTY<200 OR SP.QTY IS NULL` → Smith (100, 100), Adams (NULL); attenzione che mettere `QTY<200` nell'ON, invece che nel WHERE, restituirebbe tutti e cinque i fornitori (con NULL dove la condizione fallisce). Coppie di parti nella stessa città ma di colore diverso: self-join con `p1.City=p2.City AND p1.Color<>p2.Color AND p1.PNum<p2.PNum` → (P2, P5, Paris). Coppie di parti fornite dallo stesso fornitore: self-join di SP sul fornitore con `a.PNum < b.PNum`, poi il join con S e due volte con P per i nomi (19 righe: 15 per Smith, 1 per Jones, 3 per Clark). Il suggerimento del foglio è appunto scrivere prima la query sulle coppie di codici.

Foglio 4 (aggregati, join come filtro). Quantità di parti rosse per fornitore, escludendo chi non ne fornisce: join e `GROUP BY` → Smith 600, Jones 300, Clark 300. Includendo chi non fornisce nulla con 0: si parte da S con LEFT JOIN, `COALESCE(SUM(CASE WHEN P.Color='Red' THEN QTY END), 0)` → anche Blake 0 e Adams 0. La terza richiesta, "sfruttare la condizione del join", sposta il filtro sul colore dentro l'ON del join con P (o di una tabella derivata) per non perdere i fornitori senza parti rosse: stesso risultato. Città in cui i fornitori forniscono insieme almeno 1000 parti considerando solo le forniture oltre 100: `WHERE QTY>100 GROUP BY S.City HAVING SUM(QTY)>=1000` → London 2000. Città con almeno due fornitori che hanno ciascuno fornito almeno due colori diversi: prima si trovano i fornitori con `COUNT(DISTINCT Color) >= 2`, poi si raggruppa per città con `HAVING COUNT(*) >= 2`:

```sql
WITH ok AS (SELECT SNum FROM SP JOIN P USING(PNum) GROUP BY SNum HAVING COUNT(DISTINCT Color) >= 2)
SELECT City FROM S JOIN ok USING(SNum) GROUP BY City HAVING COUNT(*) >= 2;   -- London (Smith e Clark)
```

Foglio 5 (IN/NOT IN, ANY/ALL). Fornitori che forniscono parti disponibili a Londra: `SNum IN (SELECT SNum FROM SP WHERE PNum IN (SELECT PNum FROM P WHERE City='London'))` oppure con `= ANY` → Smith, Jones, Clark. Città in cui non vi sono fornitori con status minore della media: la media è 22, i fornitori sotto media sono S1 (20), S2 (10), S4 (20) a Londra e Parigi, quindi `City NOT IN (SELECT City FROM S WHERE Status < (SELECT AVG(Status) FROM S))` → Athens; con ALL `City <> ALL (…)`.

Foglio 6 (query correlate, universale). Parti di peso massimo: versione "non inferiore a tutti" `Weight >= ALL (SELECT Weight FROM P)` e versione con `NOT EXISTS (SELECT * FROM P q WHERE q.Weight > p.Weight)` → P6 (19). Fornitori che forniscono tutte le parti senza aggregati, partendo dal suggerimento (parti non fornite da S2) e generalizzando a ogni fornitore:

```sql
SELECT SName FROM S WHERE NOT EXISTS
  (SELECT * FROM P WHERE NOT EXISTS
     (SELECT * FROM SP WHERE SP.SNum=S.SNum AND SP.PNum=P.PNum));       -- Smith
SELECT SName FROM S WHERE NOT EXISTS
  (SELECT * FROM SP a WHERE a.SNum='S2' AND NOT EXISTS
     (SELECT * FROM SP b WHERE b.SNum=S.SNum AND b.PNum=a.PNum));       -- Smith, Jones
```

La seconda interroga i fornitori che forniscono almeno tutte le parti fornite da S2 e include S2 stesso (Jones).

Foglio 7 (copie, viste, schemi nuovi). Si lavora su copie $S_x$, $P_x$, SP_x con il numero di matricola come suffisso; `CREATE TABLE SP_x AS SELECT * FROM SP` copia i dati ma **non** i vincoli, che vanno rimessi con `ALTER TABLE … ADD PRIMARY KEY` e `ADD FOREIGN KEY`. Poi ci sono esercizi su schemi nuovi, trattati in 3.5 (stadi e moto) e 3.6 (NerdFlix).

### 3.5 Esercizi riepilogativi 1-10 (soluzioni del docente, con correzioni)

Teoria: [03 §6 Insiemistici e nidificate](03-sql.md#6-insiemistici-e-nidificate), [§5 Aggregati](03-sql.md#5-aggregati-e-raggruppamenti).

Le tre dispense `esercizi_riepilogativi 1-3` hanno soluzioni in `soluzioni.zip` (slide con testo estraibile). Sono vecchi esercizi su schemi diversi; le soluzioni del docente contengono qualche errore che segnalo.

*Stadi e nazionali.* STADIO(Nome, Città, Capienza), INCONTRO(NomeStadio, Data, Ora, Squadra1, Squadra2), NAZIONALE(Paese, Continente, Categoria). Gli stadi in cui non gioca nessuna nazionale europea: `Nome NOT IN (SELECT NomeStadio FROM Incontro WHERE Squadra1 IN (SELECT Paese FROM Nazionale WHERE Continente='Europa') OR Squadra2 IN (…))`. La capienza complessiva delle partite con prima squadra sudamericana (sommando la capienza per ogni gara): join Stadio–Incontro e `SUM(Capienza)` con `Squadra1 IN (…Sudamerica)`.

*Moto.* MOTO(Targa, Cilindrata, Marca, Nazione, Tasse), PROPRIETARIO(Nome, Targa). Proprietari di sole moto giapponesi di almeno due marche: `Nome NOT IN (proprietari con moto non giapponesi) GROUP BY Nome HAVING COUNT(DISTINCT Marca) >= 2`. L'altra versione, con self-join, scrive `P1.Marca <> M2.Marca`, ma la marca appartiene a MOTO: deve essere `M1.Marca <> M2.Marca`.

*Aeroporti.* AEROPORTO(Città, Nazione, NumPiste), VOLO(IdVolo, GiornoSett, CittàPart, OraPart, CittàArr, OraArr, TipoAereo), AEREO(TipoAereo, NumPasseggeri, QtaMerci). Gli aeroporti italiani con soli voli interni in quattro modi: (1) `EXCEPT` fra gli aeroporti italiani di partenza e quelli italiani con almeno un volo verso l'estero; (2) `NOT IN` con la stessa sottoquery; (3) `NOT EXISTS` correlata (nella soluzione la correlazione `A1.Città=CittàPart` dentro la sottoquery è ambigua, perché `CittàPart` compare anche nella VOLO interna: va qualificata); (4) outer join e conteggio: LEFT JOIN verso l'aeroporto di arrivo estero e `HAVING COUNT(A2.Nazione) = 0`. Le città servite dall'aereo con più passeggeri: due query unite con UNION, una su `CittàPart` e una su `CittàArr`, entrambe con `NumPasseggeri = (SELECT MAX(NumPasseggeri) FROM AEREO)`.

*Studenti ed esami.* Per ogni studente il numero di esami superati e la media: `WHERE voto >= 18 GROUP BY matricola` (la soluzione raggruppa per nome e cognome, ma due omonimi si fonderebbero; meglio raggruppare per matricola).

*Cinema.* REGISTA, ATTORE, INTERPRETA(Attore, Film, Personaggio), FILM(Titolo, NomeRegista, Anno), PROIEZIONE(NomeCin, CittàCin, TitoloFilm), CINEMA. (1) Nazionalità dei registi con film nel 1992 e nessuno nel 1993: join e `NOT IN (SELECT NomeRegista FROM FILM WHERE Anno=1993)`. (2) Registi con più film nel 1993 che nel 1992: la soluzione usa una CTE `NumPerAnno(Regista, Anno, Num)` e una `NOT IN` con `N1.Num <= N2.Num`: sceglie i registi del 1993 per cui nessuna riga del 1992 ha un numero di film maggiore o uguale; include quindi anche chi nel 1992 non ha diretto nulla, il che è coerente con "più film" (la soluzione scrive `Ann = 93` con l'anno a due cifre). (3) Date di nascita dei registi con film in proiezione sia a Torino sia a Milano: due `IN` su `PROIEZIONE` per le due città; il SELECT del foglio proietta anche `NomeRegista`, non richiesto. (4) Film proiettati nel maggior numero di cinema di Milano: CTE di conteggi e massimo (la soluzione scrive `WHERE Città = 'Milano'` mentre l'attributo è `CittàCin`). (5) Film con un solo attore che interpreta più personaggi: `GROUP BY Film HAVING COUNT(*) > 1 AND COUNT(DISTINCT Attore) = 1`. (6) Attori italiani che non hanno mai recitato con altri italiani: `NOT IN` con un self-join di INTERPRETA sul film (la soluzione scrive `I1.Titolo = I2.Titolo` ma l'attributo è `Film`).

*Agenti di vendita.* AGENTE(Nome, Percentuale), ARTICOLO(Nome, Descrizione, Tipo), CLIENTE(Nome, Indirizzo, Telefono), VENDITA(NomeCli, NomeArt, NomeAg, Data, Quantità, Importo, Validità). (1) Agenti che hanno venduto più di 5 articoli di tipo "automobile" nel 1993: CTE con le vendite del tipo e dell'anno, `GROUP BY Nome HAVING SUM(Quantità) > 5`. (2) Agenti con qualche scarpa venduta e nulla venduto a clienti di "via Po, Milano": `IN` per il primo vincolo, `NOT IN` per il secondo; la soluzione mescola gli alias `Vendite`/`Vendita` e `NomeComp`/`NomeCli`. (3) Il guadagno totale degli agenti sugli immobili: somma degli importi per agente moltiplicata per `Percentuale/100`.

*Alberghi.* HOTEL, CLIENTE, PRENOTAZIONE(CodiceCliente, CodiceHotel, DataPartenza, CostoGiornaliero, Durata). (1) Hotel in cui nel 2006 qualche cliente ha soggiornato almeno due volte: CTE con `COUNT(*)` per (hotel, cliente) nel 2006 e filtro `>= 2`. (2) Il soggiorno più costoso per i clienti che non hanno mai prenotato oltre 7 giorni: CTE `COSTOSOGGIORNO = CostoGiornaliero*Durata`, massimo correlato per cliente e `NOT IN` per chi ha `Durata > 7`; la soluzione ha alcuni nomi di colonna sbagliati (`NomeHotel` invece di `NomeH`, e la CTE perde la data di partenza).

*Biblioteca.* AUTORE(Nome, Cognome, Data_N, Nazionalità), AUTORELIBRO(Nome, Cognome, Segnatura), LIBRO(Segnatura, Scaffale, Argomento, Lingua). (1) Cognomi degli autori tedeschi di libri italiani di filosofia o logica: join a tre tabelle (la soluzione scrive `A.Segnatura = L.Segnatura`, ma la segnatura sta in AUTORELIBRO e LIBRO, non in AUTORE). (2) Date di nascita degli autori italiani di libri inglesi di informatica che non sono autori di matematica: `(Nome, Cognome) NOT IN (sottoquery correlata)` con confronto di tupla; le costanti di dominio sono scritte in modo incoerente fra le soluzioni ("tedesca"/"italiano" nella prima, "IT"/"ING"/"INF" nella seconda). (3) Autori con più di 10 libri nel terzo scaffale: `GROUP BY Cognome, Nome HAVING COUNT(*) > 10`.

*Telefonia.* CLIENTE, PIANOTARIFFARIO(codice, costoScattoAllaRisposta, costoAlSecondo), TELEFONATA, BOLLETTA(codicefiscale, mese, anno, cifra). (1) Clienti con bollette 2006 oltre il 20% sopra il 2005: `HAVING SUM(cifra) > 1.20 * (SELECT SUM(cifra) FROM BOLLETTA B2 WHERE B1.codfiscale = B2.codfiscale AND B2.anno = 2005)` (nel foglio compare `1,20` con la virgola italiana: in SQL è `1.20`). (2) Clienti con costo vivo medio per telefonata **inferiore** allo scatto alla risposta: la soluzione ufficiale scrive `HAVING avg(costo) > ALL (…)`, che dice l'opposto; il testo chiede "inferiore", quindi il confronto deve essere `<` (e la CTE è tagliata male nell'estrazione, con la clausola ON fuori posto).

*Motori.* Motore(Codice, Nome, CostoTotale), ComponentiMotore(CodiceMotore, CodiceComponente), Componente(Codice, Nome, Costo). (1) Il motore con più componenti: `HAVING COUNT(*) >= ALL (SELECT COUNT(*) … GROUP BY CodiceMotore)`. (2) I motori con soli componenti da più di 40 €: `NOT IN` dei motori che hanno un componente con `Costo <= 40`. (3) Il motore con massima differenza fra costo totale e somma dei costi dei componenti: CTE con la somma dei costi e `>= ALL` sulla differenza. Nel foglio il terzo esercizio ha un carattere speciale al posto del meno nella sottoquery [DA VERIFICARE sul PDF].

### 3.6 Esercizi NerdFlix (foglio 7)

Teoria: [03 §5](03-sql.md#5-aggregati-e-raggruppamenti), [§6](03-sql.md#6-insiemistici-e-nidificate).

NerdFlix: SERIETV(NomeSerie, Produttore, Nazione, Genere), EPISODIO(NomeSerie, NumStagione, NumEpisodio, TitoloEpisodio, Anno), AUDIO(NomeSerie, NumStagione, NumEpisodio, Lingua), SOTTOTITOLI(stessa chiave e Lingua). Gli esercizi SQL sono due; le soluzioni sono mie. *Tra le lingue mai usate per l'audio, quelle più usate per i sottotitoli* (lingua più usata = lingua per cui è massimo il numero di serie con almeno un episodio sottotitolato): si contano le serie distinte per lingua di sottotitoli, restando alle lingue che non compaiono in AUDIO, e si prende il massimo.

```sql
WITH LingueSott AS (
  SELECT Lingua, COUNT(DISTINCT NomeSerie) AS NumSerie
  FROM SOTTOTITOLI WHERE Lingua NOT IN (SELECT Lingua FROM AUDIO)
  GROUP BY Lingua)
SELECT Lingua FROM LingueSott WHERE NumSerie = (SELECT MAX(NumSerie) FROM LingueSott);
```

*Tra le serie che non hanno il numero massimo di episodi, quelle con più stagioni* (senza LIMIT):

```sql
WITH Stat AS (
  SELECT s.NomeSerie, COUNT(e.NumEpisodio) AS NumEp, COUNT(DISTINCT e.NumStagione) AS NumStag
  FROM SERIETV s LEFT JOIN EPISODIO e ON s.NomeSerie=e.NomeSerie GROUP BY s.NomeSerie),
Cand AS (SELECT * FROM Stat WHERE NumEp < (SELECT MAX(NumEp) FROM Stat))
SELECT NomeSerie FROM Cand WHERE NumStag = (SELECT MAX(NumStag) FROM Cand);
```

Per le interrogazioni algebriche e di calcolo su NerdFlix vedi [§1](#1-algebra-relazionale) e [§2](#2-calcolo-relazionale-su-tuple).

## 4. Normalizzazione

Teoria: [05 Normalizzazione](05-normalizzazione.md) ([§5 BCNF](05-normalizzazione.md#5-bcnf), [§6 3NF e copertura minimale](05-normalizzazione.md#6-3nf), [§8 esercizi del foglio](05-normalizzazione.md#8-esercizi-svolti)).

Ogni appello ha un esercizio che segue lo stesso protocollo: (1) **trovare le chiavi** calcolando la chiusura (gli attributi che non compaiono mai a destra stanno in ogni chiave; quelli che compaiono solo a destra in nessuna); (2) **dire se la relazione è in 3NF**, cioè controllare per ogni dipendenza X → A non banale che X sia superchiave oppure A sia un attributo primo (cioè parte di una chiave); (3) se non lo è, **calcolare una copertura minimale** (forma canonica con un solo attributo a destra, eliminazione degli attributi estranei a sinistra, eliminazione delle dipendenze ridondanti) e **raggruppare per lo stesso antecedente**, ottenendo una relazione per gruppo; (4) **aggiungere una relazione con la chiave** se nessuna scomposizione la contiene; (5) rispondere se il risultato è in BCNF (ogni dipendenza ha come antecedente una superchiave). Ho ricontrollato con un programma (chiusura, chiavi, copertura minimale, sintesi 3NF) tutti gli insiemi seguenti: i risultati coincidono con le soluzioni ufficiali.

| Tema | Schema e F | Chiavi | Esito |
|---|---|---|---|
| 2025-06-09 | R(A,B,C,D,E,F,G), F = {D→BG, C→ABF, BC→DE, G→CD} | {C}, {D}, {G} | già in 3NF e in BCNF, ogni antecedente è chiave |
| 2025-07-09 e 2025-12-17 | R(A,B,C,D,E,F), F = {AB→CE, A→B, C→B, C→AF} | {A,D}, {C,D} | non 3NF; copertura minimale {A→C, A→E, C→B, C→A, C→F}; raggruppata {A→CE, C→ABF}; scomposizione R1(ACE), R2(CABF), R3(AD); il risultato è anche BCNF (verificato, vedi sotto) |
| 2026-06-11 | Fornitori(NomeF, IndirizzoF, Prodotto, Prezzo), F = {NomeF→IndirizzoF, NomeF Prodotto→Prezzo IndirizzoF} | {NomeF, Prodotto} | non 3NF; copertura {NomeF→IndirizzoF, NomeF Prodotto→Prezzo}; R1(NomeF, IndirizzoF), R2(NomeF, Prodotto, Prezzo) |
| 2026-07-09 | CuccioliPucciosi(Targhetta, CF, Nome, Specie, Razza, Pedigree, Sesso) | {Targhetta}, {CF, Nome} | non 3NF; R1(Pedigree, Razza, Specie), R2(CF, Nome, Pedigree, Targhetta), R3(Nome, Sesso); tutti BCNF |
| 2026-09-03 | R(T,U,V,W,X,Y,Z), F = {W→TY, X→UYZ, XY→VW, T→WX} | {T}, {W}, {X} | già in 3NF e BCNF |
| 2026-09-14 | PRESENZA_MOSTRA(CodMostra, Sede, CodOpera, Autore), F = {CodMostra→Sede, CodOpera→Autore} | {CodMostra, CodOpera} | non 3NF; R1(CodMostra, Sede), R2(CodOpera, Autore), R3(CodMostra, CodOpera); BCNF |
| simulazione 2024-25 | R(L,M,N,O,P,Q,R), F = {O→MR, N→LMQ, MN→OP, R→NO} | {N}, {O}, {R} | già in 3NF e BCNF |

**Quando tutti gli antecedenti sono chiavi.** Nei temi 2025-06-09, 2026-09-03 e nella simulazione l'insieme F è fatto di antecedenti che sono tutti chiavi candidate (cicli di equivalenze come D → G → C → D). Ogni dipendenza ha come antecedente una superchiave, quindi lo schema è già in BCNF (e a maggior ragione in 3NF) e non va decomposto. È la domanda trabocchetto di questi temi: la tentazione è lanciarsi nell'algoritmo di sintesi, ma il primo passo (trovare le chiavi) già chiude l'esercizio.

**Il caso AB→CE, A→B, C→B, C→AF (2025-07-09 e 2025-12-17).** Le chiavi sono {AD} e {CD} perché D non compare mai a destra. Nessuna dipendenza ha come antecedente una superchiave (AB, A, C non contengono D) e nessun conseguente è primo se non A e C in C→A e A→…: dopo i controlli, per esempio B in C→B non è primo, quindi non è in 3NF. La copertura minimale si ottiene così: dopo la forma canonica {AB→C, AB→E, A→B, C→B, C→A, C→F}, B è estraneo in AB→C e AB→E perché A→B, quindi diventano A→C e A→E; poi A→B è ridondante (A→C e C→B). Il risultato {A→C, A→E, C→B, C→A, C→F}, raggruppato, dà {A→CE, C→ABF}; la scomposizione è R1(A,C,E), R2(C,A,B,F) e, poiché nessuna delle due contiene {A,D} né {C,D}, si aggiunge R3(A,D). Il risultato è anche BCNF: in R1 e in R2 sia A sia C sono chiavi (A→C e C→A), e tutte le dipendenze della proiezione hanno come antecedente A oppure C; R3 ha solo dipendenze banali. Il testo del 2025-07-09 chiede "il risultato è BCNF?" ma la soluzione ufficiale non risponde; quello del 2025-12-17 chiede solo la 3NF.

**Equivalenza di due insiemi (2025-09-10).** F1 = {A→CE, C→AB, AE→F} e F2 = {AB→CE, A→B, C→B, C→AF}. Due insiemi sono equivalenti quando ciascuno è contenuto nella chiusura dell'altro. Con le coperture minimali (F1' = {A→C, A→E, A→F, C→A, C→B}, F2' = {A→B, A→C, A→E, C→A, C→B, C→F}) basta controllare le sole dipendenze non incluse sintatticamente nell'altro insieme. Le dipendenze di F1' che mancano in F2' sono A→F: in F2' si ha A→C e C→F, quindi $A^{+}$ contiene F. Quelle di F2' che mancano in F1' sono A→B (in F1' si ha A→C e C→B) e C→F (in F1' si ha C→A e A→F). Quindi i due insiemi sono equivalenti, e il programma conferma.

**Ricostruire F dalla scomposizione (2026-01-23).** Dalla scomposizione R1(L,N,P) con N→L, R2(N,L,M,Q) con L→N e Q→N, R3(L,O) si risale a un possibile F ragionando sull'algoritmo di sintesi: ogni relazione corrisponde al gruppo di dipendenze di uno stesso antecedente, quindi L→NP e N→LMQ; Q→N compare nella proiezione di R2 e vale quindi anche in R; R3(L,O) è la relazione con una chiave di R, e O, non comparendo altrove, non appare in nessuna dipendenza. Un possibile F è {L→NP, N→LMQ, Q→N}, e con questo F il programma trova le chiavi {L,O}, {N,O} e {Q,O}.

**Decomposizione senza perdita (2026-06-11).** Una scomposizione di R in R1 e R2 è senza perdita di informazione se (A1 ∩ A2) determina A1 o A2 secondo $F^{+}$, cioè se A1 ∩ A2 → A1 oppure A1 ∩ A2 → A2. Per Fornitori, R1(NomeF, IndirizzoF) e R2(NomeF, Prodotto, Prezzo) hanno intersezione {NomeF}, che è chiave di R1 (NomeF → IndirizzoF), quindi la scomposizione è senza perdita. La stessa condizione necessaria e sufficiente è la domanda A del 2026-09-03 (la risposta è nelle slide/appunti).

**Foglio di normalizzazione (R(A..G), PARTITA e COMUNE).** Sono risolti nelle note, [05 §8](05-normalizzazione.md#8-esercizi-svolti). Ricalcolati con il programma: per R(A,B,C,D,E,F,G) la chiave è {A} e la copertura minimale è {A→C, A→D, A→E, B→G, C→B, E→F}; per PARTITA la chiave è {SC, DP} e la sintesi corretta produce R(SC,SO,C) (che preserva SC,SO→C), R(SC,S), R(SC,DP,SO,PSC,PSO) e R(C,DP,A); in particolare la relazione RArbitro(A,C) delle note 05 è contenuta in R(C,DP,A), e manca la relazione per SC,SO→C: è quanto già segnalato nel [DA VERIFICARE] di 05 §8.2. Le soluzioni passo passo di questi fogli sono slide animate in cui il testo estratto ripete soltanto l'enunciato; le soluzioni sono quindi quelle già scritte nelle note.

## 5. Transazioni: 2PL e view-equivalenza

Teoria: [06 §3 Concorrenza](06-transazioni-concorrenza-ripristino.md#3-concorrenza).

Due domande tornano sulle storie interfogliate. La prima: la storia è compatibile con il 2PL? Significa che si possono inserire lock condivisi/esclusivi e unlock in modo che ogni transazione acquisisca tutti i lock prima di rilasciarne uno. Il trucco è che i lock si possono acquisire **in anticipo** (prima della prima operazione che li usa) per arrivare al punto di lock prima di dover rilasciare l'oggetto su cui un'altra transazione sta aspettando. La seconda: la storia è view-equivalente a una seriale data? Si confrontano le tre cose del [file 06](06-transazioni-concorrenza-ripristino.md#3-concorrenza): letture dello stato iniziale, relazioni lettura-da, ultima scrittura per oggetto.

**S = r1(x), r2(x), r3(x), w2(y), w3(x), w1(z), r3(z), w3(z) (2025-07-09 e 2026-01-23).** *Compatibile con 2PL.* T3 deve scrivere x, ma T1 e T2 hanno letto x con lock condiviso: per far procedere w3(x) devono averlo rilasciato. T2, dopo w2(y), non ha più nulla da fare, e rilascia x e y. T1 invece deve ancora scrivere z: prende LX(z) **in anticipo**, prima di rilasciare x (nessun altro tocca z fino a w1(z), quindi l'anticipo non dà fastidio a nessuno). La sequenza data dal docente è LS1(x), r1(x), LS2(x), r2(x), LS3(x), r3(x), LX2(y), w2(y), LX1(z), UN1(x), UN2(x,y), LX3(x), w3(x), w1(z), UN1(z), LX3(z), r3(z), w3(z), UN3(x,z). Il programma (che cerca il punto di lock di ciascuna transazione) conferma la compatibilità.

*View-equivalenza con le seriali (2026-01-23).* In S le tre letture di x leggono il valore iniziale; r3(z) legge il valore scritto da T1 (w1(z)); l'ultimo scrittore di x è T3, di z è T3, di y è T2. S1 = T2 T1 T3: T1, T2 e T3 leggono x prima che qualcuno l'abbia scritto, r3(z) legge da w1(z), ultimo scrittore T3 ⇒ **view-equivalente**. S2 = T3 T1 T2: T1 e T2 leggono x dopo che T3 l'ha scritto, r3(z) non legge da T1 (T3 viene prima di T1), e l'ultimo a scrivere z è T1 ⇒ **non equivalente**. S3 = T1 T2 T3: stesse ragioni di S1 ⇒ **equivalente**. Anche questi tre verdetti sono stati ricontrollati da un programma (si confrontano insiemi di relazioni "legge da" e ultimo scrittore).

**S = r1(x), r2(x), r3(x), w2(y), r4(y), w4(x), w4(z), w1(z), w3(y) (2026-07-09).** *Non compatibile con 2PL.* T4 deve scrivere x, quindi T1, T2, T3 (che l'hanno letto) devono aver rilasciato x. T1 però deve ancora acquisire il lock su z, e non può farlo in anticipo perché T4 prende LX(z) per w4(z) **prima** di w1(z): T1 dovrebbe rilasciare x prima di avere z, violando la fase di crescita. Il programma conferma che nessuna scelta dei punti di lock lo rende possibile.

**S = r1(x), r1(y), r2(x), r3(y), w1(y), r2(y), w2(x) (simulazione 2024-25).** *Compatibile con 2PL.* La sequenza del docente: LS1(x), r1(x), LS1(y), r1(y), LS2(x), r2(x), LS3(y), r3(y), UN3(y), LX1(y), w1(y), UN1(x), UN1(y), LS2(y), r2(y), LX2(x), w2(x), UN2(y), UN2(x). Si noti l'upgrade da LS1(y) a LX1(y) dopo che T3 ha rilasciato y: T1 non rilascia nulla prima di avere tutti i lock che gli servono.

## 6. Ottimizzazione logica e conteggio delle tuple "mosse"

Teoria: [07 §2 Ottimizzazione](07-ottimizzazione-e-struttura-fisica.md#2-ottimizzazione), [§3 Statistiche e selettività](07-ottimizzazione-e-struttura-fisica.md#3-statistiche-e-selettività).

La domanda chiede: disegna l'albero della query prima e dopo l'ottimizzazione logica e calcola il numero di tuple "mosse" in entrambi i casi. Gli alberi non sono nell'estratto (sono figure; le soluzioni ufficiali stesse scrivono "alberi sintattici omessi"), ma la procedura è sempre la stessa: la selezione composta σ_{p1 ∧ p2 ∧ …} sopra un join si decompone, e ogni predicato si spinge sul ramo dell'operando a cui si riferisce; il join resta in cima. Le convenzioni di costo dei temi: il costo di un join è il prodotto delle cardinalità degli operandi (nested loop), il costo di una selezione è la cardinalità del suo input, la cardinalità di un equi-join lungo una chiave esterna è la cardinalità del lato della chiave esterna, la cardinalità di una selezione si stima con la selettività f (prodotto per gli AND, 1−f per la negazione, 1−(1−f1)(1−f2) per l'OR, 1/VAL per l'uguaglianza, (MAX−c)/(MAX−MIN) per i confronti con costante sull'intervallo). Il costo totale è la somma dei costi dei nodi.

| Tema | Query e dati | Prima | Dopo |
|---|---|---|---|
| 2025-06-09 | σ(data='20250609' ∧ tipo='ematologia' ∧ digiuno=TRUE)(referto ⋈ analisi); CARD(referto)=36 500, CARD(analisi)=VAL=200, VAL(data)=365 | join 36 500×200 = 7,3·$10^{6}$ più selezione su 36 500 ⇒ ≈ 7,3·$10^{6}$ | σ1: 36 500 tuple lette, 100 prodotte; σ2: 200 lette, 200/(4·2) = 25 prodotte; join 100×25 = 2 500 ⇒ 36 500+200+2 500 ≈ 3,9·$10^{4}$ |
| 2025-09-10 | σ(Quantità≥6 ∧ TipoPagamento<>'contanti' ∧ NomeProdotto='pizza ananas')(lineaordine ⋈ ordine); CARD(ordine)=$10^{5}$, CARD(lineaordine)=5·$10^{5}$, VAL(nomeprodotto)=100, quantità in [1,11] | $10^{5}$×5·$10^{5}$ = 5·$10^{10}$ | σ1: 5·$10^{5}$ letti, (11−6)/(11−1)·1/100·5·$10^{5}$ = 2 500 prodotti; σ2 su ordine: $10^{5}$ letti, 4/5·$10^{5}$ = 80 000 prodotti (VAL(tipopagamento)=5); join 2 500×80 000 = 2·$10^{8}$ ⇒ ≈ 2·$10^{8}$ |
| 2025-12-17 | σ(Qualifica≠'PROF' ∧ Corso='CB' ∧ Struttura='A100')(lezione ⋈ istruttore); CARD(istruttore)=100, CARD(lezione)=5 000, VAL(corso)=50, VAL(struttura)=10 | 5 000×100 = 5·$10^{5}$ (+5 000) | σ1: 100 letti, (1−1/5)·100 = 80 (5 qualifiche); σ2: 5 000 letti, 1/50·1/10·5 000 = 10; join 80×10 = 800 ⇒ 100+5 000+800 = 5 900 ≈ 6·$10^{3}$ |
| 2026-09-03 | σ((Ateneo='Politecnico' ∨ FasciaOraria='intera giornata') ∧ NumPosti>100)(aula ⋈ prenotazione); CARD(aula)=30, CARD(prenotazione)=$10^{7}$, VAL(Ateneo)=5, posti in [50,150] | 30×$10^{7}$ = 3·$10^{8}$ (+$10^{7}$) | σ1 (aula): 30 letti, (150−100)/(150−50)·30 = 15; σ2 (prenotazione): $10^{7}$ letti, 1−(1−1/5)(1−1/3) = 7/15 ⇒ 7/15·$10^{7}$ prodotte; join 15×(7/15·$10^{7}$) = 7·$10^{7}$ ⇒ ≈ 8·$10^{7}$ |
| 2026-09-14 | σ(Sezione='Cubismo' ∧ Tema='Pittura' ∧ Anno=1912)(mostra ⋈ opera); CARD(mostra)=1 000, CARD(opera)=20 000, VAL(tema)=4, VAL(sezione)=20, VAL(anno)=100 | 1 000×20 000 = 2·$10^{7}$ (+2·$10^{4}$) | σ1: 1 000 letti, 250 prodotti; σ2: 20 000 letti, 20 000/(20·100) = 10 prodotti; join 250×10 = 2 500 ⇒ 1 000+20 000+2 500 = 23 500 ≈ 2,35·$10^{4}$ (circa tre ordini di grandezza risparmiati) |
| simulazione 2024-25 | σ(Anno in un intervallo ∧ autore specifico)(articolo ⋈ pubblicazione); CARD(articolo)=6 000, CARD(pubblicazione)=$10^{5}$, VAL(NomeAutore)=2 000, anni in [1972,2022] | 6 000×$10^{5}$ = 6·$10^{8}$ (+$10^{5}$) | σ1: 6 000 letti, (2022−2002)/(2022−1972)·6 000 = 2 400 prodotti; σ2: $10^{5}$ letti, $10^{5}$/2 000 = 50 prodotti; join 2 400×50 = 1,2·$10^{5}$ ⇒ 6 000+$10^{5}$+1,2·$10^{5}$ ≈ 2,3·$10^{5}$ |

Le cifre sono state ricalcolate con Python e coincidono con le soluzioni ufficiali nei primi cinque temi. **Per la simulazione** il testo estratto ha perso gli esponenti (compaiono ad esempio come "6 ⋅ $10^{9}$" al posto di 6 ⋅ $10^{3}$ per CARD(articolo)) e il predicato esatto della selezione, che è andato in simboli illeggibili: i valori sopra sono quelli che si ottengono con i dati forniti (CARD, VAL, MIN, MAX) e con le stesse formule di selettività, ma l'enunciato esatto della σ (una disuguaglianza su Anno con soglia 2002 e un'uguaglianza su NomeAutore) è ricostruito da me sulla soluzione [DA VERIFICARE sul PDF]. Il dato VAL(Nazionalità, autore) = 150 non viene usato nella soluzione.

Un caso da notare è quello del 2026-09-03, dove la selezione è un OR fra due uguaglianze sulle sole colonne di PRENOTAZIONE (Ateneo, FasciaOraria), in congiunzione con NumPosti>100 su AULA: la selezione si spinge in due parti diverse (σ1 su aula, σ2 su prenotazione) e la selettività dell'OR si calcola con 1−(1−f1)(1−f2). Il valore VAL(FasciaOraria)=3 non è fornito nei dati ma si deduce dai tre valori ammessi dal dominio (mattino, pomeriggio, intera giornata); è un'assunzione della soluzione ufficiale. Il testo estratto ha perso i simboli ∨/∧ nel predicato, quindi la struttura (A ∨ B) ∧ C è ricostruita dalla soluzione [DA VERIFICARE sul PDF].

## 7. Progettazione E-R e progetto di laboratorio

Teoria: [04 Progettazione](04-progettazione-er-e-logica.md) ([§2 Requisiti](04-progettazione-er-e-logica.md#2-requisiti), [§3 Modello E-R](04-progettazione-er-e-logica.md#3-modello-e-r), [§4 Pattern e reificazione](04-progettazione-er-e-logica.md#4-pattern-reificazione-strategie), [§5 Progettazione logica](04-progettazione-er-e-logica.md#5-progettazione-logica)).

Gli esercizi di progettazione stanno nei fogli `Esercizio_1..5, 8, 9` e nella lezione 2 con soluzione; le soluzioni del docente sono **diagrammi** (immagini), e `soluzioni.pdf` e `Soluzione_esercizio_1.pdf` riportano nel testo estratto solo le etichette e le cardinalità senza i collegamenti. Quello che segue è quindi la mia lettura dei requisiti, con le cardinalità che si leggono nelle etichette; ogni punto in cui il diagramma ufficiale non è ricostruibile è segnato.

**Esercizio 1 (azienda con sedi, dipartimenti, impiegati e progetti).** Entità: SEDE (identificata dalla città, perché c'è una sola sede per città; con indirizzo), DIPARTIMENTO (nome, indirizzo, telefono) con identificatore esterno dalla sede (un dipartimento appartiene a una sola sede: cardinalità (1,1) lato dipartimento, (1,N) lato sede), IMPIEGATO, PROGETTO (nome, budget, data di consegna). Le associazioni: *Afferenza* impiegato–dipartimento con attributo `Data` (un impiegato afferisce al più a un dipartimento: (0,1), un dipartimento può non avere impiegati: (0,N)); *Direzione* impiegato–dipartimento ((0,1) lato impiegato perché dirige al più un dipartimento, (1,N) lato dipartimento perché ha almeno un direttore); *Partecipazione* impiegato–progetto con attributo `Data` (un impiegato lavora su più progetti). Le cardinalità dei progetti nella figura del docente non sono leggibili dal testo estratto [DA VERIFICARE sul PDF]. Il punto del problema è che *Afferenza* e *Direzione* sono due associazioni distinte con cardinalità diverse sulla stessa coppia di entità.

**Esercizio 2 (veicoli).** La soluzione ufficiale (`soluzione_esercizio_2.pdf`) è un'immagine senza testo, quindi la proposta è mia. Il VEICOLO (numero di telaio, nome, cilindrata, colore) si specializza in AUTOMOBILE, MOTOCICLO, CAMION, TRATTORE con una generalizzazione **totale ed esclusiva**. Le classificazioni delle automobili (utilitaria/familiare per la lunghezza; piccola/media/grossa per la cilindrata) sono due criteri indipendenti sullo stesso insieme, quindi non possono essere due sotto-entità esclusive nella stessa generalizzazione: la classe di cilindrata si deriva dall'attributo `cilindrata` già presente nel veicolo, e la distinzione utilitaria/familiare dalla `lunghezza` di AUTOMOBILE, per cui conviene tenere questi due fatti come attributi con regole di derivazione (business rules) e non come sotto-entità; in alternativa, due generalizzazioni parziali e sovrapposte sulla stessa entità. Lo stesso vale per i motocicli (motorino sotto 125 cc, moto sopra). I camion hanno un peso e un rimorchio facoltativo (attributo opzionale, oppure entità RIMORCHIO in associazione (0,1)).

**Esercizio 3 (ternaria o binarie).** Tre casi sul legame IMPIEGATO–PROGETTO–CONSULENTE. Dalle etichette di `soluzioni.pdf` si capisce l'esito: (1) quando impiegato e consulente collaborano *indipendentemente* dal progetto in cui sono coinvolti entrambi, la ternaria va sostituita da **tre associazioni binarie** (partecipazione impiegato–progetto, consulenza consulente–progetto, collaborazione impiegato–consulente); (2) quando ogni progetto coinvolge *coppie* impiegato–consulente specifiche (non tutte le combinazioni), l'informazione di coppia per progetto non è scomponibile: si tiene la ternaria, oppure la si reifica in un'entità TEAM (la coppia) collegata a impiegato e consulente (composizione) e al progetto (partecipazione); (3) quando i due interagiscono se e solo se esiste un progetto in cui sono entrambi coinvolti, bastano **due binarie** (partecipazione e consulenza) e l'interazione si deriva. Le cardinalità esatte nelle figure sono da riverificare sul PDF [DA VERIFICARE sul PDF].

**Esercizio 4 (corsi, materie, professori, testi).** La figura iniziale ha una ternaria professore–testo–materia con un'associazione "intervento" verso il corso di studio, da scomporre con le specifiche: per ogni materia più corsi (anche con professori diversi), ogni corso ha **una** materia, **un** professore e **un** corso di studio, per ogni corso di studio **al più un** corso di una data materia, tutti i corsi di una materia hanno lo stesso libro di testo. Dalle etichette di `soluzioni.pdf` si leggono tre associazioni: *adozione* materia–testo ((1,1) lato materia, (0,N) lato testo), *docenza* professore–corso ((0,N) professore, (1,1) corso), *offerta formativa* corso–corso di studio ((1,1) corso, (1,N) corso di studio). Il resto è mia ricostruzione: il corso ha come identificatore esterno la coppia (materia, corso di studio), che realizza il vincolo "al più un corso di una materia per corso di studio", e il corso è legato alla propria materia con cardinalità (1,1) lato corso. Il ruolo dell'etichetta "argomento" nella figura non è ricostruibile [DA VERIFICARE sul PDF].

**Esercizio 5 (voli).** La compagnia ha *tratte* con numero, aeroporto di partenza e di arrivo, ora di partenza e arrivo; un *volo reale* appartiene a una tratta e ha una data. Dalle etichette: TRATTA (ora arrivo, ora partenza) con associazioni *partenza* e *arrivo* verso AEROPORTO ((1,1) lato tratta, (0,N) lato aeroporto), generalizzazione in VOLO NAZIONALE e VOLO INTERNAZIONALE (totale ed esclusiva), VOLO INTERNAZIONALE con *scalo* verso AEROPORTO ((0,N) e (0,N)), e VOLO REALE (identificato da tratta e data, attributo data) con la generalizzazione in VOLO PASSATO (orari reali di partenza e arrivo) e VOLO FUTURO (posti disponibili), anch'essa totale ed esclusiva; il volo reale appartiene a una sola tratta ((1,1)). L'esatta attribuzione dei tipi nazionale/internazionale alla tratta o al volo reale è ricostruita da me.

**Esercizi 8 e 9 (da E-R a relazionale).** Chiedono la traduzione di due schemi E-R (film, cinema, attori, produttori, registi) in schemi relazionali; i diagrammi sono figure e il testo estratto contiene solo etichette sparse (Titolo, Anno, Nome, Sede, Cinema, Orario, Tel, Indirizzo…). Non è possibile ricostruire gli schemi: restano da fare con il PDF. Le regole da applicare sono quelle del [file 04 §5](04-progettazione-er-e-logica.md#5-progettazione-logica) (entità → relazione, (1,1) → chiave esterna, (0,N)-(0,N) → relazione a parte, identificatori esterni composti). L'`Esercizio_9.pdf` è un PDF di due pagine con sola immagine (nessun testo estraibile).

**Esercizio 7 / "biblioteca" (requisiti di un sistema di prestiti).** È l'esercizio guida della lezione 2 con soluzione. Il passaggio chiave è l'analisi dei requisiti: il docente riscrive il testo per eliminare le ambiguità. "Libro" è usato per due cose diverse (titolo catalogato ed esemplare fisico): si distinguono LIBRO (identificato dall'ISBN, con titolo e lista di autori) e COPIA (identificata da un codice, con scaffale e stato disponibile/in prestito), e il lettore ha un codice tessera oltre a nome e indirizzo. Poi il testo è riorganizzato in gruppi di frasi omogenee (lettori, libri, copie, prestiti) e il prestito registra data e ora di acquisizione e di riconsegna. Lo schema E-R ufficiale non c'è nel testo estratto; la mia proposta: LETTORE(Codice, Nome, Indirizzo), LIBRO(ISBN, Titolo), AUTORE collegato a LIBRO con (1,N)-(0,N) (la "lista di autori"), COPIA(Codice, Scaffale) in associazione (1,1)-(0,N) con LIBRO, PRESTITO tra LETTORE e COPIA con attributi di data/ora di acquisizione e di riconsegna (prestito come entità, perché lo stesso lettore può prendere la stessa copia più volte e occorre lo storico). Lo stato "in prestito" è derivabile (esiste un prestito senza riconsegna) e va dichiarato come ridondanza se lo si memorizza.

**Il progetto di laboratorio 2025/26 ("Parcheggi", Blinkin' Park).** L'elaborato di gruppo (fino a 3 persone) parte da requisiti testuali: parcheggi all'aperto (per zone) e garage con orario di apertura, biglietti singoli a tariffa oraria dipendente dalla zona e abbonamenti annuali nominali, veicoli, valutazioni dei parcheggi, personale (operatori di garage con un responsabile, controllori con turni che elevano sanzioni), sconti generici o per area, storico anche degli abbonamenti scaduti, statistiche mensili e ricavi trimestrali per zona e garage, con volumi indicati (ca. 50 abbonamenti al mese, 1 000 ingressi/uscite al giorno, 100 accessi al giorno alla disponibilità). Lo schema guida per la consegna fissa il PDF finale in tre parti: progettazione concettuale (requisiti iniziali, glossario, requisiti rivisti in gruppi omogenei, schema E-R più business rules), progettazione logica (tavola dei volumi, tavola delle operazioni, ristrutturazione con analisi di **una** ridondanza in dettaglio con schemi di navigazione e tavole degli accessi, eliminazione delle generalizzazioni, scelta degli identificatori, E-R ristrutturato, schema relazionale con vincoli di integrità referenziale) e implementazione (DDL, DML di popolamento, qualche cancellazione e modifica per verificare i vincoli). La checklist per evitare errori chiede in particolare: le entità hanno solo attributi nominati nei requisiti rivisti; ogni entità ha un identificatore; niente ID o codici come identificatori nell'E-R principale (solo nel ristrutturato, per efficienza); niente attributi che siano identificatori di altre entità (i collegamenti sono associazioni); le associazioni non hanno identificatori; le ternarie dicono che ogni combinazione è possibile; ogni generalizzazione ha il tipo (totale/parziale, esclusiva/sovrapposta); le business rules sono solo regole non esprimibili con l'E-R e sono verificabili sui dati; per ogni ridondanza c'è una regola di coerenza o di derivazione. Le regole su identificatori e generalizzazioni sono anche in [04 §3](04-progettazione-er-e-logica.md#3-modello-e-r). La traccia del progetto 2019/20 (`consegna_laboratorio_2019_20.zip`) è lo stesso schema di consegna di un'edizione precedente e non è stata letta nel dettaglio.

## 8. Domande teoriche a risposta aperta

Nei temi compaiono anche domande puramente teoriche, con la risposta "si vedano gli appunti" nella soluzione ufficiale. Le risposte sono nei file di teoria:

- *Forma normale di Boyce-Codd (2026-09-14)*: R è in BCNF se per ogni dipendenza funzionale non banale X → Y in R, X è superchiave di R. → [05 §5](05-normalizzazione.md#5-bcnf).
- *Insieme di copertura minimale (simulazione)*: insieme equivalente a F con un solo attributo a destra, senza attributi estranei e senza dipendenze ridondanti. → [05 §6](05-normalizzazione.md#6-3nf).
- *Condizione necessaria e sufficiente per una scomposizione senza perdita (2026-09-03)*: (A1 ∩ A2) → A1 oppure (A1 ∩ A2) → A2 nella chiusura di F. → [05 §4](05-normalizzazione.md#4-scomposizione).
- *Differenza fra B-tree e B+-tree e perché i B+ sono preferiti (2026-06-11)*: nel B+ i dati (o i puntatori ai dati) stanno solo nelle foglie, collegate in una lista, e i nodi interni contengono solo chiavi guida; ne risultano nodi interni più piccoli (più chiavi per pagina, altezza minore) e scansioni per intervallo sequenziali sulle foglie. → [07 §5 B+ alberi](07-ottimizzazione-e-struttura-fisica.md#5-b-alberi).
- *In cosa consiste il 2PL (2026-07-09)*: ogni transazione acquisisce tutti i lock prima di rilasciarne uno (fase di crescita, punto di lock, fase di rilascio) e questo garantisce la serializzabilità. → [06 §3](06-transazioni-concorrenza-ripristino.md#3-concorrenza).

## Errori e imprecisioni nelle soluzioni del docente

Raccolgo qui, in un posto solo, gli errori trovati nel materiale ufficiale, perché in un compito vanno scritte le versioni corrette.

| Dove | Problema | Correzione |
|---|---|---|
| 2025-09-10 SQL Q2 | `l.NumeroStand = l.NumeroStand` (sempre vero) | `p.NumeroStand = l.NumeroStand` |
| 2025-09-10 SQL Q1 | manca DISTINCT: stand ripetuti | `SELECT DISTINCT` |
| 2025-06-09 SQL Q2 | join inutile con UTENTE | togliere UTENTE |
| 2025-06-09 teoria Q1B | disuguaglianze strette per "nella norma", incoerente con la SQL | usare ≥ e ≤; aggiungere ∃ per escludere utenti senza referti |
| 2025-12-17 SQL Q3 | join interni fra le CTE: lezioni con 0 prenotati app o web non vengono mai considerate eccezioni | LEFT/FULL JOIN con COALESCE |
| 2026-01-23 SQL Q1 | `Email` ambiguo | `u.Email` |
| 2026-01-23 SQL Q3 | virgole mancanti; CTE dei capitani non aggrega | un'unica CTE con SUM(CASE …) |
| 2026-06-11 SQL Q1 | la condizione sul premio è finita fuori dal WHERE nell'impaginazione | `AND a.NomePremio='Premio Strega'` |
| 2026-06-11 SQL Q3 | LEFT JOIN annullato dal WHERE | usare join interno |
| 2026-07-09 SQL Q1 | `pKMPercorsi`, e `KmPercosi` nello schema | usare il nome dello schema |
| 2026-07-09 teoria Q1B | `u.IndirizzoLavoro=u.IndirizzoArrivo` | `p.IndirizzoArrivo` |
| 2026-09-03 SQL Q2 | `a.NumPosti>100` fuori posto | metterlo nel WHERE |
| 2023-06-15 SQL Q3 | `'mattina'` invece di `'mattino'` | `'mattino'` |
| simulazione SQL Q2 | colonne del join invertite, join senza Città nella sottoquery | vedi §3.2 |
| riepilogativi 9 (telefonia) | `avg(costo) > ALL(…)` dove la traccia dice "inferiore" | `<` |
| riepilogativi (varie) | nomi di colonna o alias sbagliati (Segnatura, Titolo/Film, Città/CittàCin, NomeHotel/NomeH, Vendite/Vendita) | vedi §3.5 |
| note 05 §8.2 | RArbitro(A,C) contenuta in RDesignazione(C,DP,A), manca R(SC,SO,C) | già in [DA VERIFICARE] di 05 |

## Cosa resta da integrare

Letto per intero (testo): i nove temi con soluzione, la simulazione con soluzioni, `scritto_1_no_sol` (2023), i fogli SQL 1-7, `esercizi_riepilogativi 1-3` e le soluzioni nello zip, `bdb_esercizi_calcolo_relazionale`, `bdb_soluzioni_algebra`, `bdb_esercizi_normalizzazione`, `soluzioni.pdf`, `Esercizio_1-5`, `Esercizio_8`, `esercizio_biblioteca`, `Soluzione_esercizio_1`, `Modalità Esame-25-26`, `laboratorio_introduzione`, e dello zip del progetto 2025/26 requisiti, schema guida e checklist.

**Non letti o non leggibili.** (1) `Esercizio_9.pdf` e `soluzione_esercizio_2.pdf` sono immagini senza testo (nessun carattere estraibile): non sono stati letti. (2) Le figure dei diagrammi E-R (esercizi 1-5, 8, soluzioni) non sono nel testo estratto. (3) Le slide di teoria (`lezione_1..5_sql`, `lezione_1..3_progettazione`, `bdb_algebra_relazionale_parteII`, `bdb_calcolo_relazionale`, `bdb_moduli_dbms I-III`, `bdb_normalizzazione I-III`, `bdb_ottimizzazione`, `bdb_transazioni`, `PostgreSQL slide (v2026)`) e i due articoli (`codd_1970`, `armstrong_paper_1974`) non sono stati riletti riga per riga: gli appunti 01-08 sono già costruiti sul doc Drive e sulle slide, e qui mi sono limitato agli esercizi; la lezione 2 con soluzione è stata letta solo nella parte dell'esercizio biblioteca. (4) Le versioni `_stampa` dei PDF sono duplicati per la stampa e non sono state aperte. (5) `progetto.pdf` (la presentazione sull'esempio "film/serie/programma") è stato letto in parte: è il caso svolto in aula a lezione di laboratorio e non aggiunge esercizi. (6) `consegna_laboratorio_2019_20.zip` non è stato letto; `S_P_SP.sql` è stato usato per i dati. (7) I quiz Moodle non sono stati scaricati (solo file). Nessun file con lo stesso nome risulta sovrascritto durante il download: `scritto20260611.pdf`, `…0709.pdf`, `…0903.pdf`, `…0914.pdf` e le loro `_soluzione` sono file distinti.

## Dubbi

- Le regole di esame e il formato dello scritto (SQL con tre domande e punteggi 26/28/30/33, teoria da 33 punti) sono quelli dell'anno accademico 2025-26; per la sessione del 2027-02-01 vanno riconfermati.
- Le soluzioni ufficiali dichiarano esplicitamente di essere "una possibile soluzione": in algebra e in calcolo ne esistono altre equivalenti, e la scelta fra quoziente e doppia negazione dipende da quello che il testo chiede.
- Il significato di "tuple mosse" nell'ottimizzazione è quello del docente (somma dei costi dei nodi con le convenzioni sopra); i temi non lo definiscono nel testo, quindi vanno scritti i passaggi per intero come nelle soluzioni.
- Per le soluzioni di progettazione (esercizi 1-5, 8, 9) serve il PDF con i diagrammi: la parte di §7 che le riguarda è una ricostruzione da etichette e va verificata.
