# 02 - Algebra Relazionale e Calcolo Relazionale

**Fonte:** doc Drive "Basi di Dati - Appunti" (Lezioni 03, 04, 06) + slide. Schema di riferimento: PAZIENTI, REPARTI, MEDICI, RICOVERI (vedi file 01).

## Mappa

1. Operatori base: σ, π, ∪ ∩ −, ρ, ×, join, semi-join
2. Composizione e correttezza sintattica
3. Negazione (inessenziale/essenziale), U−P, massimo, "un solo"
4. Quantificazione universale: divisione (÷)
5. NULL e logica a 3 valori
6. Outer join
7. Proprietà/equivalenze (per ottimizzazione -> file 07)
8. Calcolo relazionale su tuple (TRC) e legame con SQL; limiti

- [1. Operatori](#1-operatori)
- [2. Negazione](#2-negazione)
- [3. Quantificazione universale: quoziente](#3-quantificazione-universale-quoziente)
- [4. NULL e logica a tre valori (3VL)](#4-null-e-logica-a-tre-valori-3vl)
- [5. Outer join](#5-outer-join)
- [6. Proprietà (base dell'ottimizzazione logica)](#6-proprietà-base-dellottimizzazione-logica)
- [7. Calcolo relazionale su tuple (TRC) con range](#7-calcolo-relazionale-su-tuple-trc-con-range)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Operatori

L'algebra relazionale è un linguaggio **procedurale**: si descrive *come* ottenere il risultato componendo operatori che prendono relazioni in ingresso e restituiscono una relazione (virtuale) in uscita. Poiché le relazioni sono insiemi, il risultato non contiene mai duplicati. Questa chiusura rispetto agli operatori è ciò che permette di annidarli liberamente.

Gli operatori si dividono in tre famiglie. La **selezione** σ filtra le righe e la **proiezione** π sceglie le colonne; unione, intersezione e differenza lavorano sulle tuple come insiemi e richiedono schemi identici (la differenza, a differenza delle altre due, non è commutativa). La **ridenominazione** ρ cambia i nomi degli attributi senza toccare i dati, e serve a rendere compatibili due schemi e a fare self-join. Infine prodotto e join combinano relazioni diverse: il prodotto cartesiano genera tutte le combinazioni ed è quasi mai utile da solo; il theta-join è un prodotto seguito da una selezione, ed è lo strumento con cui, in un modello senza puntatori, si seguono i legami fra tabelle.

| Op | Sintassi | Note |
|---|---|---|
| Selezione | σ_p(r) | schema invariato; atomi `Ai Θ c`, `Ai Θ Aj`, Θ ∈ {=,≠,<,≤,>,≥}; 0 ≤ \|σ\| ≤ \|r\| |
| Proiezione | π_{Ai,Aj}(r) | elimina duplicati; se X contiene una superchiave \|π_X(r)\| = \|r\|, altrimenti può scendere |
| Unione/Interse./Differenza | r∪s, r∩s, r−s | schemi identici; − non commutativa |
| Ridenominazione | ρ_{B←A}(r) | cambia nomi, non dati; serve per compatibilità e self-join |
| Prodotto | r×s | tutte le combinazioni, quasi mai utile da solo |
| Theta-join | r ⋈_Θ s = σ_Θ(r×s) | equi-join se Θ è `=`; **natural join** ⋈: equi-join sugli attributi omonimi, colonne duplicate rimosse |
| Semi-join | r ⋉_Θ s | tuple di r con **almeno** una corrispondenza in s (nessuna colonna di s) |

Per evitare ridenominazioni si può usare la dot-notation `RICOVERI.Reparto = REPARTI.COD`.

Un'espressione è **corretta** solo se il predicato di σ usa attributi presenti nell'argomento. L'errore classico è fare π_{COD,Nome} e poi σ_{Residenza=...}: dopo la proiezione l'attributo Residenza non esiste più.

**Esempi**
- Cod. e nome pazienti di TO o VC: π_{COD,Nome}(σ_{Residenza='TO' ∨ Residenza='VC'}(PAZIENTI)).
- Medici non primari: π_{MATR}(MEDICI) − ρ_{MATR←Primario}(π_{Primario}(REPARTI)). Sui dati: primari = 203,574,530,405 -> non primari = 461, 501.
- **Self-join** per "almeno due ricoveri" (l'algebra non sa contare, quindi si confronta una tupla con un'altra dello stesso paziente): σ_{R1.PAZ=R2.PAZ ∧ R1.Inizio<R2.Inizio}(ρ_{R1}(RICOVERI) × ρ_{R2}(RICOVERI)), poi π_{R1.PAZ}. Sui dati: A102 e S555.

## 2. Negazione

Non tutte le negazioni sono uguali. Quella **inessenziale** si risolve con un semplice confronto di disuguaglianza: i pazienti non residenti a TO sono σ_{Residenza≠'TO'}. Quella **essenziale** riguarda invece l'appartenenza a una relazione (i medici che *non* sono primari): non esiste un attributo da confrontare e serve la **differenza**. Dietro c'è la Closed World Assumption: ciò che non è in base di dati è falso.

Per la negazione essenziale esiste un metodo in tre fasi, **U − P**:
1. si calcola l'universo U (per esempio π_MATR(MEDICI));
2. si calcola P, cioè chi soddisfa la condizione *positiva*;
3. il risultato è R = U − P.

L'unico accorgimento è che **gli schemi di U e P devono coincidere** (stessa proiezione), altrimenti la differenza non è definita. Gli stessi ingredienti servono per "mai curati da X", che è U − (curati da X).

Dalla stessa idea nascono altri due schemi ricorrenti. "Un solo ricovero" è "almeno 1" meno "almeno 2": π_PAZ(RICOVERI) − π_{R1.PAZ}(self-join con Inizio diverso). Sui dati: B444. Il **massimo**, per cui non c'è un operatore MAX, si ottiene togliendo tutti gli elementi che hanno qualcuno di più grande: r − π_{N1}(σ_{N1<N2}(ρ_{N1}(r) × ρ_{N2}(r))). Per esempio con {3,5,2} le coppie con N1<N2 danno {2,3} e quindi il massimo è {5}.

## 3. Quantificazione universale: quoziente

Per le richieste con "tutti" o "ogni" non c'è un operatore di base, ma una doppia negazione: "x ha superato tutti i corsi" equivale a "non esiste un corso che x non ha superato". Il **quoziente** ÷ incapsula questo ragionamento:

> **r(A,B) ÷ s(B) = π_A(r) − π_A( (π_A(r) × s) − r )**

Si costruisce cioè tutto ciò che *dovrebbe* esistere (π_A(r) × s), si sottrae ciò che esiste davvero per trovare i "mancanti", si tolgono dall'universo gli A che hanno almeno un mancante. Passi per lo studente che ha superato *tutti* i corsi del piano P:
1. U = π_MATR(ESAMI);
2. teorico U×P;
3. mancanti (U×P) − E;
4. incompleti = π_MATR(mancanti);
5. risultato U − incompleti.

## 4. NULL e logica a tre valori (3VL)

Quando in una tupla c'è un NULL, un confronto non è né vero né falso: è **Unknown**. Gli operatori logici seguono perciò una logica a tre valori:

| AND | T | F | U | | OR | T | F | U | | NOT | |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T | T | F | U | | T | T | T | T | | T | F |
| F | F | F | F | | F | T | F | U | | F | T |
| U | U | F | U | | U | T | U | U | | U | U |

La regola pratica è che una tupla è selezionata **solo se il predicato è True**: Unknown viene scartato come False. Ne seguono due conseguenze da ricordare:
- `A = NULL` non funziona mai, bisogna usare IS [NOT] NULL;
- viene meno il terzo escluso: `Status=10 OR Status<>10` NON restituisce le righe con Status NULL, perché per esse entrambi i disgiunti sono Unknown.

## 5. Outer join

Il join interno elimina le *dangling tuples*, cioè le tuple che non trovano corrispondenza nell'altra relazione. Quando serve conservarle si usa l'outer join, che riempie con NULL i campi mancanti:
- il **Left** (⟕) conserva tutta la sinistra;
- il **Right** (⟖) tutta la destra;
- il **Full** (⟗) entrambe.

Esempio CLIENTI-AGENZIE: Longo (TO) resta nel risultato anche senza agenzia.

## 6. Proprietà (base dell'ottimizzazione logica)

Le equivalenze fra espressioni algebriche sono il materiale con cui l'ottimizzatore riscrive una query in una forma più economica (file 07):
- join e prodotto sono commutativi e associativi;
- le selezioni si possono applicare a cascata, σ_{p∧q}(r) ≡ σ_p(σ_q(r)), e si possono distribuire sulla differenza: σ_p(r−s) ≡ σ_p(r) − σ_p(s);
- una selezione si "spinge" dentro un join, σ_p(r ⋈_Θ s) ≡ σ_p(r) ⋈_Θ s, **solo se** gli attributi di p appartengono a r;
- le proiezioni si distribuiscono sull'unione, π_X(r ∪ s) ≡ π_X(r) ∪ π_X(s), ma **NON sulla differenza**.

Controesempio per la differenza: R={(a,b1)}, S={(a,b2)}. Allora π_A(R−S)={a} (la tupla di R non è in S), mentre π_A(R)−π_A(S)=∅ (dopo la proiezione i due a coincidono).

## 7. Calcolo relazionale su tuple (TRC) con range

Il calcolo relazionale è il linguaggio **dichiarativo** corrispondente all'algebra: dice *cosa* si vuole, non *come* ottenerlo, ed è fondato sulla logica del primo ordine. L'ottimizzazione è lasciata al DBMS. Si studia il calcolo sulle tuple (e non quello sui domini) perché ha ispirato SQL e non richiede la nozione di "safe formulas".

La forma è **{ T | L | F }**:
- **T**, Target list: `x.*`, `x.A`, `x.(A,B)`, alias `Eti: x.A`;
- **L**, Range list: `x(REL)`;
- **F**, Formula: costruita con atomi (`x.A Θ c`, `x.A Θ y.B`), connettivi (∧ ∨ ¬ →) e quantificatori (∃x(R)(F), ∀x(R)(F)).

Le variabili di T sono libere, quelle dei quantificatori vincolate. Il connettivo → serve soprattutto a restringere l'universo nei ∀, grazie a α → β ≡ ¬α ∨ β.

La corrispondenza con SQL è diretta: T = SELECT, L = FROM, F = WHERE, con i join espressi come uguaglianze in WHERE. L'UNION resta fuori dal blocco base, ed è un limite del TRC.

**Pattern**
- Esistenza/join: {m.(Cognome,Nome) | m(MEDICI) | ∃r(RICOVERI)(r.Reparto=m.Reparto ∧ r.PAZ='A102')}
- Negazione: {p.(Cognome,Nome) | p(PAZIENTI) | ¬∃m(MEDICI)(m.Cognome=p.Cognome ∧ m.Nome=p.Nome)} ≡ ∀m(...)(m.Cognome≠p.Cognome ∨ m.Nome≠p.Nome) (De Morgan)
- Divisione (pazienti ricoverati in ogni reparto): {p.* | p(PAZIENTI) | ∀r(REPARTI)(∃r'(RICOVERI)(r.COD=r'.Reparto ∧ p.COD=r'.PAZ))}; in SQL = doppio NOT EXISTS.
- Con implicazione (autori mai unici firmatari): {a.* | a(AUTORI) | ∀f(FIRMA)(f.A=a.COD → ∃f'(FIRMA)(f'.P=f.P ∧ f'.A≠a.COD))}
- Confronto tra tuple (capi i cui subalterni guadagnano tutti di più): {i.* | i(IMPIEGATI) | ∀o(ORGANIGRAMMA)(o.Capo=i.MATR → ∃i'(IMPIEGATI)(i'.MATR=o.Impiegato ∧ i'.Stipendio>i.Stipendio))}

**Limiti**: il TRC non esprime l'unione in un'unica espressione, e né TRC né algebra esprimono la **ricorsione/chiusura transitiva**. Nonni e bisnonni si ottengono con un numero fisso di join, ma "antenati" no, perché il numero di passi non è noto in anticipo. Il rimedio è nelle CTE ricorsive di SQL moderno.

## Cose da saper fare all'esame
- Tradurre una richiesta in algebra: riconoscere negazione essenziale -> U−P; "almeno due" -> self-join; "tutti" -> ÷ / doppia negazione; "massimo" -> r − (esiste uno maggiore).
- Scrivere lo stesso quesito in TRC e poi in SQL.
- Disegnare l'albero sintattico di un'espressione; verificarne la correttezza degli attributi.
- Applicare le equivalenze (push-down di σ), citare il controesempio π/differenza.
- Tabelle di verità 3VL; prevedere cosa restituisce una query con NULL.
- Dire cosa produce left/right/full join su un esempio.

## Dubbi
- [DA VERIFICARE] Nelle note, la sezione "Cardinalità del join (casi particolari)" è vuota (probabile figura nelle slide: caso FK->PK = \|r\| lato FK; caso senza attributi comuni = prodotto).
- [DA VERIFICARE] L'esempio 3VL nelle note ("σ Anno<1980 ∨ Anno≤1980") è confuso: il senso è che una tautologia su attributo NULL non restituisce la riga.
- Differenza esatta tra semi-join e join+proiezione sui dati duplicati: non trattata.
