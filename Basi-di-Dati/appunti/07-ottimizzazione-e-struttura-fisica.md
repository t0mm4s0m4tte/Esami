# 07 - Ottimizzazione delle query e struttura fisica (pagine, indici, B+)

**Fonte:** doc Drive "Basi di Dati - Appunti" (Lezione 05; Lezione 11 §3-7) + slide Lez. 11. Corso B.

## Mappa
1. Perché: costo I/O
2. Ottimizzazione logica (euristiche, 7 passi) e fisica
3. Dizionario dati e fattore di selettività; stima join
4. Pagine, RID, metodi di accesso e costi
5. B+ alberi e data entries; euristiche di progettazione fisica
6. Ottimizzatore fisico e algoritmi di join

## 1. Costo

Tutta l'ottimizzazione parte da un fatto hardware: la RAM risponde in nanosecondi (50-70 ns), il disco o l'SSD in millisecondi (5-20 ms), un fattore di circa **10⁶**. Il tempo di una query è quindi dominato dal numero di accessi al disco, e l'obiettivo dell'ottimizzatore è **ridurre i trasferimenti di pagina**.

## 2. Ottimizzazione

Una query Q viene prima tradotta in un albero di parsificazione, poi passa per due stadi. L'**ottimizzazione logica** è una trasformazione algebrica indipendente dalle strutture fisiche; l'**ottimizzazione fisica** sceglie gli algoritmi concreti (Nested Loop, Sort-Merge o Hash join) sfruttando indici, statistiche e caratteristiche dell'hardware.

L'idea guida dell'ottimizzazione logica, l'**euristica d'oro**, è ridurre presto il numero di tuple: si spingono le selezioni verso le foglie dell'albero, in modo che i join successivi lavorino su tabelle piccole. Questo è reso possibile dalle equivalenze algebriche viste nel file 02.

**Algoritmo logico in 7 passi**
1. **Decomporre gli AND**: σ_{p1∧p2} → σ_{p1}(σ_{p2}).
2. **Spingere le selezioni** verso le foglie.
3. **Spingere le proiezioni** verso le foglie (tuple più strette).
4. **Ricombinare le selezioni** consecutive.
5. **Riconoscere i join**: σ_Θ(r×s) → r ⋈_Θ s (il prodotto cartesiano è un "incubo").
6. **Ricombinare le proiezioni**.
7. **Varianti associative** dei join: scegliere l'ordine che minimizza i risultati intermedi (join prima con la tabella più piccola/filtrata).

## 3. Statistiche e selettività

Per scegliere fra piani alternativi il DBMS ha bisogno di stimare le dimensioni dei risultati intermedi, e lo fa con le statistiche del **dizionario dati**:
- CARD(r): numero di tuple;
- SIZE(t): ampiezza media di una tupla;
- VAL(A,r): numero di valori distinti di A;
- NPAGE(r) = CARD(r)/fattore di bloccaggio.

Da queste si ricava il **fattore di selettività f_p** di un predicato, cioè la frazione di tuple che lo soddisfa, assumendo una distribuzione uniforme:

| Predicato | f |
|---|---|
| A = v | 1 / VAL(A,r) |
| A ≤ v | (v − MIN) / (MAX − MIN) |
| p1 ∧ p2 | f1 · f2 |
| ¬p | 1 − f_p |
| p1 ∨ p2 | 1 − (1−f1)(1−f2) |

Per i **join**, con vincolo FK→PK la cardinalità è quella del lato FK: \|r⋈s\| = CARD del lato FK (es. CARD(RICOVERI)). Nel caso generale di equi-join A=B: \|r ⋈ s\| ≈ min(1/VAL(A,r), 1/VAL(B,s)) · CARD(r) · CARD(s). Dopo una selezione, il numero di valori distinti si aggiorna come VAL_nuovo = min{VAL_vecchio, CARD_risultato}.

**Caso di studio** che mostra quanto contino i passi: Pazienti 10⁵ tuple, VAL(Residenza)=100 → f=1/100; Ricoveri 10⁵, VAL(Inizio)=10 → f=1/10; Medici 10², con selezione su chiave MATR → 1 tupla.
| Piano | Massa tuple | Motivo |
|---|---|---|
| Non ottimizzato (join su tabelle intere) | 10¹⁰ | prodotto 10⁵×10⁵ |
| Selezioni spinte (passi 1-6) | 10⁷ | 10³ pazienti × 10⁴ ricoveri |
| + associatività (Medici per primi) | 10⁶ | tabella con una sola tupla |

Il miglioramento complessivo è di circa 10.000×.

## 4. Organizzazione fisica

La **pagina** (= blocco, 4-8 KB; i blocchi fisici sono 512 B-4 KB) è l'unità di trasferimento fra disco e memoria. Se è troppo piccola si fanno più I/O, se troppo grande si crea inefficienza nel buffer. Ogni pagina contiene un **PID**, un **array degli offset** (in testa), lo stack dei record e un bit di parità. Il gestore del buffer carica le pagine richieste (disco → cache periferica → RAM) e restituisce l'indirizzo in memoria.

Il record è indirizzato da un **RID = [PID, i]**, dove i è l'indice nell'array degli offset. Questa indirezione permette di compattare o riordinare i record dentro la pagina senza cambiare l'indirizzo visto dall'esterno: è la base dell'**indipendenza fisica**.

I **metodi di accesso** sono:
- **seriale**: pagine come nel file system, non ordinate;
- **sequenziale**: ordinate su un attributo;
- **tabellare**: con indici;
- **diretto**: hash, O(1).

Con N = numero di pagine, i costi sono: **seriale** ricerca con successo (N+1)/2, insuccesso N; **sequenziale** insuccesso (N+1)/2, perché la ricerca si ferma superato il valore. Per tabelle grandi la soluzione sono gli indici.

## 5. B+ alberi

L'indice più usato è il B+ albero. Rispetto al B-albero le chiavi dei nodi interni sono *copie* (separatori), mentre **tutte le chiavi effettive stanno nelle foglie**, collegate tra loro in modo da permettere scansioni di range; m è il branching factor (max figli). Ciò che sta nella foglia, il **data entry k\***, può essere di tre tipi:
- Tipo 1: ⟨k, tupla⟩ (indice clusterizzato)
- Tipo 2: ⟨k, RID⟩
- Tipo 3: ⟨k, lista di RID⟩ (tipico dei secondari)

L'efficienza è logaritmica: con m=100 e altezza 3 si indicizzano 10⁶ chiavi; con riempimento al 70% bastano comunque 3-4 accessi a pagina.

Indicizzare tutto non conviene, perché ogni indice appesantisce INSERT/UPDATE/DELETE ("più indici ≠ più velocità"). Le **8 euristiche di progettazione fisica** codificano il buon senso:
1. No indici su tabelle piccole (~10 pagine, già in RAM).
2. No su attributi volatili (es. saldo).
3. Solo se **fs < 20%**, fs = pagine restituite da σ_{k=c}(T) / pagine totali di T.
4. Evitare chiavi sbilanciate.
5. Max 4-5 indici per relazione corposa.
6. Privilegiare chiavi primarie/esterne (join).
7. Utili per ORDER BY (scansioni ordinate).
8. Conoscere il DBMS specifico.

## 6. Ottimizzatore fisico

Per le selezioni congiuntive σ_{p1∧p2∧…} ci sono due strategie:
- fare l'**intersezione dei RID** restituiti dagli indici disponibili, in RAM;
- usare l'indice **più selettivo** (min f) e verificare gli altri predicati sulle tuple caricate.

Il **join** è l'operatore più oneroso, e non va mai simulato con cicli nidificati nell'applicazione: il DBMS sceglie tra **Nested Loop, Merge Join** (input ordinati) e **Hash Join** in base a buffer e statistiche. `EXPLAIN` mostra il piano scelto.

## Cose da saper fare all'esame
- Applicare i 7 passi a un albero di parsificazione e disegnare l'albero ottimizzato.
- Calcolare **f_p** di predicati composti, stimare la cardinalità di selezioni e join, confrontare due piani (ordine di grandezza della massa di tuple).
- Spiegare RID/array degli offset e l'indipendenza fisica.
- Costi di accesso seriale/sequenziale; quando conviene un indice (fs<20%); tipi di data entry; perché B+ e non B.
- Scegliere indici motivando con le 8 euristiche; selezione multipla via RID-intersezione vs indice più selettivo.

## Dubbi
- [DA VERIFICARE] Esponenti del caso di studio: nelle note sono appiattiti ("1010", "107", "106"); li ho ricostruiti come 10¹⁰, 10⁷, 10⁶ (coerenti col miglioramento di 10.000×).
- [DA VERIFICARE] Nelle note la formula del NOT è scritta "1 − f_{p2}" (probabile refuso per 1 − f_p).
- Stima di join "min(1/VAL(A,r), 1/VAL(B,s))·CARD(r)·CARD(s)" (come nelle note): confrontare con la formula esatta delle slide.
