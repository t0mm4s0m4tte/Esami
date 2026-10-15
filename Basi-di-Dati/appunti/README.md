# Basi di Dati (9 CFU, UniTO Informatica, Corso B) - Appunti d'esame

Appello: **2027-02-01**. Appunti condensati dal doc Drive "Basi di Dati - Appunti" (Teoria Lez. 01-14, Laboratorio 01-11) e dalle slide di Teoria. Formato: mappa, definizioni, formule/codice, esempi svolti, "Cose da saper fare all'esame", "Dubbi". I punti incerti sono marcati **[DA VERIFICARE]**.

## Indice
| File | Contenuto | Lezioni |
|---|---|---|
| [01-fondamenti-e-modello-relazionale.md](01-fondamenti-e-modello-relazionale.md) | DBMS, ANSI/SPARC, modello relazionale, chiavi, vincoli | T01-02 |
| [02-algebra-e-calcolo-relazionale.md](02-algebra-e-calcolo-relazionale.md) | Algebra, negazione, divisione, 3VL, outer join, TRC | T03, T04, T06 |
| [03-sql.md](03-sql.md) | DDL, DML, join, aggregati, nidificate, EXISTS, PostgreSQL | L07-L11 |
| [04-progettazione-er-e-logica.md](04-progettazione-er-e-logica.md) | Requisiti, E-R, pattern, ristrutturazione, traduzione logica | L01, L03-L05 |
| [05-normalizzazione.md](05-normalizzazione.md) | DF, Armstrong, X⁺, BCNF, 3NF, copertura minimale, esercizi | T08-T10, T14 |
| [06-transazioni-concorrenza-ripristino.md](06-transazioni-concorrenza-ripristino.md) | ACID, storie, lock/2PL, log, UNDO/REDO, checkpoint | T07, T11-T13 |
| [07-ottimizzazione-e-struttura-fisica.md](07-ottimizzazione-e-struttura-fisica.md) | Ottimizzazione logica/fisica, selettività, pagine, B+ | T05, T11 |
| [08-checklist-esame-ed-esercizi-tipo.md](08-checklist-esame-ed-esercizi-tipo.md) | Checklist, 12 esercizi tipo, formulario, dubbi aggregati | tutte |

## Ordine di ripasso consigliato
Si parte da 01 e 02, che fissano modello relazionale e algebra, poi si passa a 03 perché SQL è sempre in esame. Segue 05: la normalizzazione è fatta di esercizi meccanici e ha un'alta resa. Si chiude con 04, 06, 07 e infine 08, che riassume tutto in checklist e formulario. In sintesi: 01 → 02 → 03 → 05 → 04 → 06 → 07 → 08.

## Note sulle fonti
La fonte primaria è il doc "Basi di Dati - Appunti" (id 19dfwWGpXtrzWSpLGfzO-hx24z0WlOoYR3H522FJPnLU), generato a partire dalle slide. Le slide originali stanno in "Slide Decks - Teoria/Lab" e ne sono stati letti solo gli estratti iniziali di alcune (Lez. 10-14, per cross-check). Il doc "Argomenti dei Corsi - II Anno" non include Basi di Dati, quindi il programma ufficiale non è verificato. Gli esempi di query e algoritmi sono ricalcolati sui dati delle note quando indicato come "calcolati".
