# 08 - Checklist d'esame, esercizi tipo, formulario

**Fonte:** sintesi dei file 01-07 (tutti derivati da "Basi di Dati - Appunti" + slide Corso B). Appello: **2027-02-01**.

## Cose da saper fare all'esame (per area)
Questo file raccoglie in un colpo d'occhio tutto ciò che serve per il ripasso finale: una checklist per area che rimanda al file in cui l'argomento è trattato, una dozzina di esercizi tipo con soluzione sintetica, un formulario e i dubbi ancora aperti. La tabella è la mappa: ogni riga dice che cosa deve essere automatico all'esame e dove andare a ripassarlo.

| Area | Saper fare | File |
|---|---|---|
| Relazionale | chiavi (super/candidata/primaria), FK, schema vs istanza | 01 |
| Algebra | negazione U−P, "almeno due" (self-join), "tutti" (÷), massimo, albero sintattico | 02 |
| Calcolo (TRC) | tradurre in {T\|L\|F} con ∃/∀/→ e in SQL | 02 |
| SQL DDL | CREATE TABLE con PK/FK/CHECK/DEFAULT, reazioni CASCADE/SET NULL, ALTER | 03 |
| SQL query | join/outer, GROUP BY/HAVING, IN/ANY/ALL/EXISTS, NULL | 03 |
| ER | requisiti → E-R completo, gerarchie, reificazione, documentazione | 04 |
| Logico | ristrutturazione (ridondanze con pesi S=2L, ISA), traduzione E-R→relazionale | 04 |
| Normalizzazione | X⁺, chiavi, copertura minimale, BCNF, 3NF (sintesi), lossless, preservazione DF | 05 |
| Transazioni | ACID↔componenti, serializzabilità, 2PL, matrice lock | 06 |
| Recovery | log, LA/LC, UNDO/REDO, checkpoint, dump/restore | 06 |
| Ottimizzazione/fisico | 7 passi, f_p, stima join, RID, costi accesso, B+ , euristiche indici | 07 |

## Esercizi tipo (con soluzione sintetica)
Gli esercizi che seguono coprono i pattern ricorrenti, dall'algebra alla normalizzazione fino a storie e log, e ciascuno riporta solo lo schema risolutivo essenziale; vanno letti insieme ai file indicati nella checklist, che ne spiegano il procedimento.

1. **Algebra** — "Pazienti con un solo ricovero": π_PAZ(RICOVERI) − π_{R1.PAZ}(σ_{R1.PAZ=R2.PAZ ∧ R1.Inizio≠R2.Inizio}(ρ_R1(RICOVERI)×ρ_R2(RICOVERI))) → B444.
2. **Algebra/÷** — studenti che hanno superato tutti i corsi del PIANO: π_MATR(ESAMI) − π_MATR((π_MATR(ESAMI)×PIANO) − π_{MATR,Corso}(ESAMI)).
3. **TRC** — medici che hanno curato A102: {m.(Cognome,Nome) | m(MEDICI) | ∃r(RICOVERI)(r.Reparto=m.Reparto ∧ r.PAZ='A102')}.
4. **SQL** — città con ≥2 fornitori di status ≥20: `SELECT City, COUNT(*) FROM S WHERE Status>=20 GROUP BY City HAVING COUNT(*)>=2` → London.
5. **SQL** — fornitori che non danno parti blu: `NOT IN` annidato (file 03) → S2,S3,S5.
6. **Normalizzazione** — R(ABCDEFG), F={AB→EF,B→G,A→CDG,C→B,E→F}: chiave A; Fmin={A→C,A→D,A→E,B→G,C→B,E→F}; 3NF: R1(A,C,D,E), R2(C,B), R3(B,G), R4(E,F).
7. **Normalizzazione** — PARTITA: chiave {SC,DP}; 3NF in RPartita, RStadio, RArbitro, RDesignazione (+ R(SC,SO,C) [DA VERIFICARE]).
8. **Lossless** — R(A,B,C) con F={A→B}: scomposizione {AB, AC}: intersezione A→AB ⇒ lossless; {AB, BC}: B→? B non determina né AB né BC ⇒ possibili tuple spurie.
9. **Storie** — T1,T2 bancarie: r1(A) r2(A) w2(A) r2(B) w1(A) r1(B) w1(B) w2(B) ⇒ non serializzabile (A+B=3050 ≠ 3000).
10. **Log** — T1,T2 committate, T3 attiva al crash: REDO(T1,T2) in avanti, UNDO(T3) a ritroso; con checkpoint si guarda solo dopo il CP (+ transazioni attive al CP).
11. **Ottimizzazione** — selezione su VAL=100 e VAL=10 con AND: f=1/100·1/10; risultato = CARD·f.
12. **Ridondanza** — attributo derivato: confronta pesi (S=2L) di operazioni con/senza ridondanza × frequenza.

## Formulario lampo
Le formule sono quelle da avere a memoria il giorno dell'esame, divise per argomento: algebra, ottimizzazione, dipendenze funzionali, normalizzazione, struttura fisica, concorrenza e ripristino.

- **Divisione**: r÷s = π_A(r) − π_A((π_A(r)×s) − r)
- **Selettività**: AND f1·f2 · OR 1−(1−f1)(1−f2) · NOT 1−f · eq 1/VAL
- **Armstrong**: riflessività, unione, transitività (+ espansione, decomposizione, pseudo-transitività, prodotto)
- **Lossless**: (A1∩A2→A1) ∨ (A1∩A2→A2)
- **BCNF**: ogni X→Y non banale ha X superchiave · **3NF**: o X superchiave o Y primi
- **Copertura minimale**: RHS singolo → togli estranei → togli ridondanti
- **Accesso seriale**: (N+1)/2 successo, N insuccesso · B+: m=100, h=3 → 10⁶ chiavi
- **Lock**: LS-LS compatibili, tutto il resto no · **2PL**: prima solo lock, poi solo unlock
- **Recovery**: REDO(LC) in avanti, UNDO(LA) all'indietro, abort ignorati

## Dubbi aperti da passare al tutor (aggregati)
Le incertezze emerse lungo i file 01-07 sono qui raccolte per essere sottoposte al tutor. Sulla normalizzazione (file 05) ce ne sono tre: lo schema ESAMI dichiarato "in BCNF" nella Lez. 09 contiene CP→Co, quindi in realtà sarebbe solo in 3NF; nella soluzione di PARTITA sembra mancare la relazione R(SC,SO,C); e in COMUNE la dipendenza No→Pr implica nomi unici, in contrasto con la motivazione sulle omonimie. Nel file 03 resta il dubbio sullo script Ricoveri, che combina `NOT NULL` con `ON DELETE SET NULL`. Sulle transazioni (file 06) non è chiaro se deadlock, strict 2PL e cascading rollback rientrino nel programma. Nel file 04 il calcolo di ridondanza su Città dà numeri diversi tra le note (3.500/12.000) e il ricalcolo (≈2.500/≈11.000).

Restano infine lacune delle fonti: mancano Lab 02 e Lab 06 nelle note, i diagrammi E-R non sono disponibili in testo, e il doc "Argomenti dei Corsi - II Anno" non contiene la sezione Basi di Dati (solo SO, ASD, Probabilità), per cui il programma d'esame ufficiale non è verificato.
