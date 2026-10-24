# 05 - Normalizzazione (dipendenze funzionali, BCNF, 3NF)

**Fonte:** doc Drive "Basi di Dati - Appunti" (Lezioni 08, 09, 10, 14) + slide "La teoria della normalizzazione" 1-3 ed esercizi (Lez. 14). Corso B.

## Mappa

1. Perché normalizzare: anomalie
2. Dipendenze funzionali (DF), assiomi di Armstrong, teoremi derivati
3. Chiusura $X^{+}$, ricerca delle chiavi, attributi estranei
4. Scomposizione: lossless join, preservazione delle DF (restrizione)
5. BCNF + algoritmo
6. 3NF, attributi primi, copertura minimale, algoritmo di sintesi
7. ER ↔ normalizzazione; de-normalizzazione
8. Esercizi svolti (R(A..G), PARTITA, COMUNE, da ER)

- [1. Anomalie](#1-anomalie)
- [2. Dipendenze funzionali](#2-dipendenze-funzionali)
- [3. Chiusura X⁺ e chiavi](#3-chiusura-x-e-chiavi)
- [4. Scomposizione](#4-scomposizione)
- [5. BCNF](#5-bcnf)
- [6. 3NF](#6-3nf)
- [7. ER e normalizzazione; pratica](#7-er-e-normalizzazione-pratica)
- [8. Esercizi svolti](#8-esercizi-svolti)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Anomalie

La normalizzazione nasce da un'osservazione pratica: una tabella che mescola concetti diversi in una sola relazione si comporta male quando i dati cambiano. L'esempio guida è lo schema **ESAMI(MATR, NS, IS, CAP, CF, DN, Co, Vo, DE, CP, NP, Q, TU)**, che unisce dati dello studente, del docente e del verbale d'esame. Gli inconvenienti sono tre anomalie classiche:
- **Inserzione**: non posso inserire uno studente che non ha ancora esami (Co, parte della PK, sarebbe NULL).
- **Cancellazione**: cancellare un esame fa perdere l'anagrafica del docente.
- **Update**: se il docente cambia ufficio, la modifica va replicata in tutte le sue tuple, con costo e rischio di inconsistenza.

Gli obiettivi di un buon schema sono esprimibilità, efficienza e leggibilità. La teoria che segue dà strumenti rigorosi per scoprire *quali* legami fra attributi causano le anomalie (le dipendenze funzionali) e per scomporre la relazione senza perdere informazione.

## 2. Dipendenze funzionali

Una **DF X → Y** è soddisfatta in r se per ogni coppia di tuple t1,t2 ∈ r: t1[X]=t2[X] ⇒ t1[Y]=t2[Y], cioè X determina Y. Le DF non si deducono dai dati: sono scelte semantiche del progettista, vere per tutte le istanze lecite.

DF di ESAMI: MATR→NS,IS,CF,DN · CF→MATR · IS→CAP · MATR,Co→Vo,DE,CP · CP→NP,Q · Q→TU · CP→Co (ogni docente ha un solo corso).

Dato un insieme F di DF, altre se ne deducono con gli **assiomi di Armstrong**. Quelli usati nel corso sono tre:
- **Riflessività**: Y⊆X ⇒ X→Y
- **Unione**: X→Y, X→Z ⇒ X→YZ
- **Transitività**: X→Y, Y→Z ⇒ X→Z

Da essi derivano altre regole comode:
- **Espansione**: X→Y ⇒ WX→WY
- **Decomposizione**: X→YZ ⇒ X→Y, X→Z
- **Pseudo-transitività**: X→Y, WY→Z ⇒ WX→Z
- **Prodotto**: X→Y, W→Z ⇒ XW→YZ

(Le dimostrazioni passano da riflessività, transitività e unione, vedi slide.)

Due insiemi di DF sono **equivalenti** se $F^{+}$=$G^{+}$, cioè F ⊦ G e G ⊦ F. Un **attributo estraneo** è un attributo la cui rimozione da una DF non cambia la chiusura. Esempio: F={ABCD→E, B→C}: C è estraneo in ABCD→E perché ABD→B→C, quindi ABD→ABCD→E; ne segue {ABD→E, B→C} ≡ F.

## 3. Chiusura X⁺ e chiavi

Per decidere se una DF segue da F senza calcolare tutta $F^{+}$ (che è esponenziale) si usa la **chiusura** $X^{+}$ di un insieme di attributi, cioè l'insieme di tutti gli attributi determinati da X. L'algoritmo è polinomiale:
1. parti con C:=X;
2. finché esiste una Y→Z in F con Y⊆C, poni C:=C∪Z (variante delle slide: si toglie la DF usata da F');
3. alla fine $X^{+}$=C.

Il test di **membership** è allora: X→Y ∈ $F^{+}$ ⇔ Y ⊆ $X^{+}$.

La chiusura risolve anche la ricerca delle chiavi: K è superchiave ⇔ $K^{+}$ = A (tutti gli attributi). La chiave candidata è una superchiave minimale, e si trova provando i sottoinsiemi. Un'utile scorciatoia è che gli attributi che **non compaiono mai a destra** di alcuna DF stanno in ogni chiave.

Esempio: K={MATR,Co,NS}: MATR→NS,IS,CF,DN; IS→CAP; MATR,Co→Vo,DE,CP; CP→NP,Q; Q→TU ⇒ $K^{+}$=A, ma anche {MATR,Co}^{+}=A ⇒ K è superchiave non minimale e **{MATR,Co} è chiave**. (Con CP→Co sono chiavi anche {MATR,CP}, {CF,Co}, {CF,CP}.)

## 4. Scomposizione

La cura delle anomalie è scomporre la relazione in più relazioni, ma una scomposizione fatta male può inventare informazione: il join delle parti genera **tuple spurie** (per esempio associa Piero/Pensa anche a Demo). In generale vale il lemma r ⊆ r1 ⋈ r2, quindi si può solo guadagnare tuple in più, mai perderne. Una buona scomposizione deve soddisfare due requisiti distinti.

Il primo è il **lossless join** (r = r1⋈r2), garantito da una condizione semplice: (A1∩A2 → A1) ∨ (A1∩A2 → A2), cioè l'intersezione degli attributi delle due parti è superchiave di almeno una delle due.

Il secondo è la **preservazione delle DF** (località): le DF originarie devono poter essere verificate sulle singole relazioni, senza join. Si formalizza con la restrizione Fi = {X→Y ∈ $F^{+}$ : XY ⊆ Ri} (il calcolo è esponenziale perché serve $F^{+}$). La scomposizione è conservativa se (F1∪F2)^{+}=$F^{+}$. Se una DF si perde, per verificarla serve un join, ed è costoso.

## 5. BCNF

La **forma normale di Boyce-Codd** chiede che ogni dipendenza sia giustificata da una chiave. (R,F) è in **BCNF** se ∀ X→Y non banale (Y⊄X): X è superchiave. Lo slogan è "dalla chiave, da tutta la chiave, nient'altro che dalla chiave". Avere più chiavi candidate (come MATR e CF) non viola la BCNF. La BCNF implica la 3NF.

L'**algoritmo di scomposizione** funziona così:
1. si cerca una (Ri,Fi) con una X→Y che viola la BCNF (Y⊄X e X non superchiave);
2. si sostituisce Ri con **R1(Ai−Y)** e **R2(XY)** (con le Fi proiettate);
3. si ricontrollano *entrambe* (R2 può non essere in BCNF) e si ripete finché non ci sono più violazioni.

Come euristica conviene partire dalla "periferia" del grafo delle DF per conservare la località. La scomposizione è sempre lossless, perché l'intersezione X è chiave di R2.

**ESAMI in BCNF** (secondo le note): INDIRIZZI(IS,CAP) · QUALIFICHE(Q,TU) · STUDENTI(MATR,NS,IS,CF,DN) · DOCENTI(CP,NP,Q) · ESAMI(MATR,Co,Vo,DE,CP).

Il **limite della BCNF** è che può perdere DF (esempio AGENZIE sotto): quando succede si ripiega sulla 3NF.

## 6. 3NF

La **terza forma normale** è una BCNF indebolita per garantire che una buona scomposizione esista sempre. (R,F) è in **3NF** se per ogni X→Y vale almeno una di tre condizioni:
- Y⊆X;
- X è superchiave;
- Y sono **attributi primi** (appartengono ad almeno una chiave).

Essendo meno restrittiva della BCNF ammette alcune anomalie "tollerate", ma in cambio **garantisce sempre una scomposizione lossless che preserva le DF**.

Tre esempi illustrano la differenza:
- ESAMI(MATR,Co,Vo,CP), F={MATR,Co→Vo,CP; CP→Co}, chiavi {MATR,Co},{MATR,CP}: CP→Co viola la BCNF ma è 3NF, perché Co è primo.
- AGENZIE(NAgenzia,CittaAgenzia,Direttore), F={NAgenzia,CittaAgenzia→Direttore; Direttore→CittaAgenzia}: è 3NF ma non BCNF; scomporla ancora farebbe perdere la località.
- CC(Titolare,NConto,NAgenzia,CittaAgenzia,Direttore,Saldo), chiave {Titolare,NConto}; in BCNF diventa AGENZIE(NAgenzia,CittaAgenzia,Direttore) + StatoCC(NConto,NAgenzia,CittaAgenzia,Saldo) + TITOLARI(Titolare,NConto).

### Copertura minimale F'
Per costruire una 3NF si parte da una versione "pulita" di F, la **copertura minimale** F', che deve soddisfare quattro requisiti:
1. F'≡F;
2. **forma canonica**: un solo attributo a destra (uno stratagemma algoritmico);
3. **nessun attributo estraneo** a sinistra;
4. **nessuna DF ridondante**.

L'**ordine delle operazioni è tassativo**:
1. si decompongono i secondi membri;
2. si eliminano gli **attributi estranei**;
3. si eliminano le **DF ridondanti**.

Invertire gli ultimi due passi è un errore, come mostra il controesempio: F={AB→C, C→A, B→A}. Cercando prima le ridondanze non se ne trova nessuna; eliminando poi l'estraneo A in AB→C (perché B→A) si ottiene {B→C, C→A, B→A}, e ora B→A è ridondante (B→C→A), cosa che non si vedeva prima.

### Algoritmo di sintesi 3NF
1. Calcola F' (copertura minimale).
2. Raggruppa le DF con lo stesso antecedente.
3. Una relazione per gruppo (antecedente + conseguenti).
4. Se nessuna relazione contiene una chiave dell'originale, aggiungi una relazione con gli attributi di una chiave.
5. **Fusione** (stessa chiave X → R(X,A1,A2..)), **eliminazione** (Rj⊆Ri).

Tempo polinomiale; il risultato è lossless e preserva le DF. Esempio CC: senza $R_{key}$(Titolare,NConto) si perderebbe il legame col titolare, ed è proprio il motivo del passo 4.

## 7. ER e normalizzazione; pratica

Un buon diagramma E-R è già, in larga parte, una "normalizzazione per design":
- un'entità K→A è in BCNF;
- un'associazione 1:N porta la chiave del lato (1,1) come dipendente da quella del lato (1,N) (cioè la FK);
- un'associazione N:M dà {K1,K2}→attributi, in una relazione separata;
- un'entità debole è {Kid,A}→B;
- una gerarchia ha K→attributi specifici.

Tuttavia l'E-R non cattura gli "intrecci di vincoli": per esempio CP→Co (la titolarità del docente) non emerge dal diagramma Esame-Docente-Corso, e richiede una regola aziendale più la normalizzazione come test *ex-post*.

Nella pratica si può anche tornare indietro. La **de-normalizzazione** reintroduce deliberatamente una ridondanza, per esempio il CAP in STUDENTI per evitare il join, accettando consapevolmente le anomalie. La **frammentazione** separa invece dati con ritmi di aggiornamento diversi, come ANAGRAFECC (statica) e STATOCC (saldo/data, update frequenti). In ogni caso, nessun algoritmo sostituisce la comprensione semantica.

## 8. Esercizi svolti

### 8.1 R(A,B,C,D,E,F,G), F={AB→EF, B→G, A→CDG, C→B, E→F}
- **Chiave**: A non compare mai a destra ⇒ in ogni chiave. $A^{+}$: A→CDG ⇒ {A,C,D,G}; C→B ⇒ +B; AB→EF ⇒ +E,F ⇒ tutti. **A unica chiave**.
- **Copertura minimale**: decomposizione {AB→E, AB→F, B→G, A→C, A→D, A→G, C→B, E→F}. B estraneo in AB→E e AB→F (A→C→B) ⇒ A→E, A→F. Ridondanti: A→F (A→E→F), A→G (A→C→B→G). **Fmin = {A→C, A→D, A→E, B→G, C→B, E→F}**.
- **3NF?** No: B→G con B non superchiave e G non primo (idem C→B, E→F). Sintesi: **R1(A,C,D,E), R2(C,B), R3(B,G), R4(E,F)**; R1 contiene la chiave A.

### 8.2 PARTITA(SC,SO,DP,PSC,PSO,A,C,S), F={A→C; SC,SO→C; SC→S; SC,SO,DP→PSC,PSO; SC,DP→SO; C,DP→A}
- **Chiave**: SC e DP mai a destra. {SC,DP}^{+}: →SO; →S (SC→S); →C (SC,SO→C); →A (C,DP→A); →PSC,PSO ⇒ tutti. **Chiave {SC,DP}**.
- Non 3NF: dipendenza parziale SC→S (S non primo) e transitiva A→C.
- Copertura: SO estraneo in SC,SO,DP→PSC,PSO (SC,DP→SO) ⇒ SC,DP→PSC,PSO.
- Scomposizione (note): **RPartita(SC,DP,SO,PSC,PSO)** (chiave SC,DP) · **RStadio(SC,S)** · **RArbitro(A,C)** · **RDesignazione(C,DP,A)** (chiave C,DP: una categoria ha un arbitro per data).
- [DA VERIFICARE] La sintesi standard aggiunge **R(SC,SO,C)** per preservare SC,SO→C (non ridondante: C non è derivabile altrimenti); nella soluzione delle note non compare.

### 8.3 COMUNE(Co,No,NA,Pr,Re), F={No→Pr, Pr→Re}
- F da sola non rende Co chiave ⇒ **F' = {Co→No, Co→NA, No→Pr, Pr→Re}** (minimale: niente estranei né ridondanze).
- 3NF: **R1(Co,No,NA)** (chiave Co), **R2(No,Pr)** (chiave No), **R3(Pr,Re)** (chiave Pr). Vantaggio: una riforma provinciale tocca una riga di R2.
- [DA VERIFICARE] No→Pr rende No chiave di R2 ⇒ implica nomi unici, in contrasto con la giustificazione "omonimie tra province diverse" delle note.

### 8.4 Da ER a DF
Entità E1 (id {Id-11,Id-12}, attr A1), E2 (Id-2, A2), E3 (Id-3, A3); r1 con E1 (1,1) verso E2 e attributo Ar1; r2 N:M E3-E1 con Ar2.
DF: {Id-11,Id-12}→Id-2,Ar1 · {Id-11,Id-12}→A1 · Id-2→A2 · Id-3→A3 · {Id-3,Id-11,Id-12}→Ar2. Logico: E1 include Id-2 come FK; **Rr2(Id-3,Id-11,Id-12,Ar2)** tabella separata (chiave = unione degli identificatori).

## Esercizi svolti collegati

Oltre agli esercizi del foglio nel §8, ogni appello ha un esercizio di normalizzazione, svolti in [file 09 §4](09-esercizi-ed-esami-svolti.md#4-normalizzazione) con le chiavi, la copertura minimale e la scomposizione ricalcolate. Usano la chiusura e la ricerca delle chiavi del §3 (nei temi 2025-06-09, 2026-09-03 e nella simulazione tutti gli antecedenti sono chiavi, quindi la relazione è già in BCNF), il test di 3NF e la sintesi del §6 (2025-07-09 e 2025-12-17, Fornitori 2026-06-11, CuccioliPucciosi 2026-07-09, PRESENZA_MOSTRA 2026-09-14), la BCNF del §5, la condizione di join senza perdita del §4 (2026-06-11 e 2026-09-03) e l'equivalenza di due insiemi di dipendenze (2025-09-10). Il tema 2026-01-23 chiede il percorso inverso, da una scomposizione a un insieme F possibile. La preservazione delle dipendenze compare solo come proprietà della sintesi; Armstrong e le dimostrazioni degli assiomi non hanno esercizi nel materiale Moodle.

## Cose da saper fare all'esame
- **Calcolare $X^{+}*$*, verificare una DF, trovare **tutte le chiavi** (partire dagli attributi mai a destra).
- Calcolare la **copertura minimale** nell'ordine giusto (RHS singoli -> estranei -> ridondanti).
- Dire se una relazione è in BCNF / 3NF e **perché** (indicare la DF violante e se il conseguente è primo).
- Scomporre in BCNF (R1(A−Y), R2(XY), ricorsivo) e in 3NF (sintesi + eventuale relazione con la chiave).
- Verificare **lossless join** (intersezione chiave) e **preservazione delle DF** (calcolo restrizioni).
- Dimostrare Armstrong-derivati; mostrare un attributo estraneo.
- Spiegare quando preferire 3NF a BCNF, quando denormalizzare.
- Derivare DF da un diagramma ER e tradurlo in tabelle.

## Dubbi
- [DA VERIFICARE] Le note (Lez. 09) danno ESAMI(MATR,Co,Vo,DE,CP) come BCNF, ma se vale CP→Co (Lez. 08/10) quella relazione NON è BCNF (è 3NF). Verificare quali DF usa la Lez. 09.
- [DA VERIFICARE] Definizione di "attributo primo": le note dicono "Y⊆K per una chiave K" (slide: "Y sono attributi primi"). Interpreto: ogni attributo di Y appartiene ad almeno una chiave.
- [DA VERIFICARE] 8.2 (R(SC,SO,C)) e 8.3 (nomi unici) come sopra.
- Le dimostrazioni degli assiomi sono nelle note; l'esame le chiede per esteso? Da chiedere al tutor.
