# 06 - Spazi vettoriali (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, *Algebra Lineare e Geometria*, Lezioni 5-7 (`Lezioni_05-07.pdf`), con integrazioni dai compiti d'esame (Prove 1-7, Compiti 2019-2023, cartella Prove d'Esame). Esercizi 5.6-7.15 del PDF.

## Mappa

---

- [1. Rⁿ](#1-rⁿ)
- [2. Spazio vettoriale](#2-spazio-vettoriale)
- [3. Matrici speciali (Def 6.3) e sottospazi](#3-matrici-speciali-def-63-e-sottospazi)
- [4. Combinazioni lineari e Span](#4-combinazioni-lineari-e-span)
- [5. Indipendenza, basi, dimensione](#5-indipendenza-basi-dimensione)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Rⁿ

Il modello da tenere in mente per tutto il corso è Rⁿ, il prodotto cartesiano di n copie di R. Un suo elemento x=(x1,...,xn) è visto come punto oppure come vettore (la freccia dall'origine 0) e si scrive come **vettore colonna**. Le operazioni sono componente per componente: la somma corrisponde alla regola del parallelogramma in R², e il prodotto per uno scalare λx = (λx1,...,λxn) allunga il vettore di |λ| e lo ribalta se λ<0.

## 2. Spazio vettoriale

Gli spazi vettoriali astraggono proprio ciò che accade in Rⁿ: ciò che serve è poter sommare vettori e scalare per un numero. Per gruppo e campo si veda il file 04 (Def 5.2, 5.3). Uno **spazio vettoriale su K** (K campo, di solito R o C) è un insieme V con una somma V×V→V e un prodotto per scalare K×V→V tali che:
1. (V,+) è un gruppo commutativo, con neutro 0_V ("origine", da non confondere con lo 0 di K);
2. λ(v+w) = λv+λw;
3. (λ+μ)v = λv+μv;
4. (λμ)v = λ(μv);
5. 1v = v.

Dagli assiomi si ricava, per esempio, la **Prop 5.5**: 0·v = 0_V (infatti 0v=(0+0)v=0v+0v ⇒ 0v=0). L'Esercizio 5.11 aggiunge λ0_V=0, (-λ)v = -(λv) = λ(-v) e λ(v-w)=λv-λw.

Gli esempi sono molti e vari:
- K su se stesso;
- **Kⁿ** (operazioni termine a termine);
- le successioni in K;
- le funzioni [0,1]→K (somma e prodotto puntuali);
- **K[x]**;
- K_k[x], i polinomi di grado ≤k (ma NON quelli di grado esattamente k per k≥1, perché la somma può abbassare il grado e manca lo 0);
- C, che è spazio su C e anche su R;
- le matrici M(m,n,K) m×n con somma e prodotto per scalare termine a termine; M(m,1,K)=K^m.

Gli Es. 5.9-5.10 ricordano che {0,1} con 1+1=0 è il campo Z_2 e che Z_p con p primo è un campo.

## 3. Matrici speciali (Def 6.3) e sottospazi

Fra le matrici quadrate n×n ce ne sono di cinque tipi con struttura particolare:
- **diagonale**: a_ij=0 per i≠j;
- **triangolare superiore**: a_ij=0 per i>j;
- **triangolare inferiore**: a_ij=0 per i<j;
- **simmetrica**: a_ij=a_ji, equivalente a ᵗA=A;
- **antisimmetrica**: a_ij=-a_ji, equivalente a ᵗA=-A, e ha diagonale nulla.

La matrice nulla è di tutti e cinque i tipi. Gli insiemi D(n), T_s(n), T_i(n), S(n), A(n) sono **sottospazi** di M(n).

Un **sottospazio** (Def 6.2) di V è un sottoinsieme W⊆V che soddisfa:
1. 0∈W;
2. v,v'∈W ⇒ v+v'∈W;
3. v∈W, λ∈K ⇒ λv∈W.

In tal caso W è esso stesso uno spazio vettoriale. Valgono sempre {0} ⊆ W ⊆ V (sottospazi banali).

Nella pratica c'è un test rapido: un sottoinsieme definito da equazioni lineari **omogenee** è un sottospazio (ad esempio W={x+y-z=0}⊂R³ ha dimensione 2 e base (1,0,1),(0,1,1)); se l'equazione non è omogenea (x+y-z=1) il sottoinsieme non contiene 0 e dunque non è un sottospazio (è un sottospazio affine, vedi file 08/12). Per lo stesso motivo una retta non passante per l'origine non è un sottospazio.

## 4. Combinazioni lineari e Span

Una **combinazione lineare** di v1..vk è un vettore λ1v1+...+λkvk. L'insieme di tutte le combinazioni, **Span(v1,...,vk)**, è un **sottospazio** (Prop 6.7: contiene 0 con tutti i λ nulli, ed è chiuso per somma e prodotto per scalare) e rappresenta ciò che si "raggiunge" usando quei vettori. Span(v) è la retta {λv}; Span(e1,e2) in R³ è il piano z=0; per v=(1,2), Span(v) è la retta y=2x.

## 5. Indipendenza, basi, dimensione

I vettori v1..vk sono **dipendenti** se esistono λ non tutti nulli con Σλ_i v_i = 0 (cioè c'è ridondanza fra loro), **indipendenti** se Σλ_i v_i=0 implica che tutti i λ_i siano 0. Per la Prop 7.2 sono dipendenti ⇔ uno di essi è combinazione degli altri. Un solo vettore è dipendente ⇔ v=0, e due vettori sono dipendenti ⇔ sono multipli. I sottoinsiemi di vettori indipendenti sono indipendenti (Prop 7.6), quindi vettori indipendenti sono ≠0 e a coppie non multipli; **ma** per k≥3 queste condizioni non bastano: v1=(1,1,0), v2=(0,1,1), v3=(1,0,-1) sono a coppie indipendenti, eppure v1-v2-v3=0.

Una **base** (Def 7.7) è un insieme v1..vn di vettori indipendenti **e** generatori (V=Span). Le basi canoniche sono e1..en per Kⁿ, 1,x,...,xⁿ per K_n[x], e le matrici e_ij (un 1 in posizione (i,j)) per M(m,n), da cui dim M(m,n)=mn. Il **Teo 7.10** garantisce che due basi di V hanno lo stesso numero di elementi, quindi la **dimensione dim V** è ben definita: dim Kⁿ=n, dim K_n[x]=n+1, dim K[x]=∞. Quando la dimensione è nota basta metà del lavoro (**Teo 7.12**): se dim V=n, n vettori sono una base ⇔ sono indipendenti ⇔ generano; più di n vettori sono sempre dipendenti, meno di n non generano.

Con una base fissata ogni vettore ha un indirizzo preciso: dati v1..vn base, ogni v si scrive in modo UNICO come Σλ_i v_i (Prop 13.4), e (λ1..λn) sono le **coordinate** [v]_B. L'unicità segue dal fatto che la differenza di due scritture darebbe una combinazione nulla, quindi i coefficienti coincidono.

**Calcolo pratico (con le matrici, v. file 07/08)**: per provare che k vettori di Rⁿ sono indipendenti si mette la matrice con i vettori per colonne e si calcola il rango (rango = k) o il determinante (se n=k: det≠0).

**Esempio svolto**: B={(1,0,2),(1,1,2),(1,2,1)}, v=(2,3,3) (quiz 2023): risolvere λ1(1,0,2)+λ2(1,1,2)+λ3(1,2,1)=(2,3,3): λ1+λ2+λ3=2, λ2+2λ3=3, 2λ1+2λ2+λ3=3 ⇒ (2·prima − terza) dà λ3=1, poi λ2=3-2=1, λ1=2-1-1=0; verifica: 0+1+1=2 ✓; 1+2=3 ✓; 0+2+1=3 ✓ ⇒ **[v]_B = (0,1,1)**. (Con v=(2,1,4) → (1,1,0): 1+1=2 ✓, 1=1 ✓, 2+2=4 ✓.)

---

## Cose da saper fare all'esame
- Verificare se un sottoinsieme (definito da equazioni, da condizioni su matrici/polinomi) è sottospazio: controllare 0, somma, scalare. Trovare base e dimensione.
- Stabilire indipendenza/dipendenza di vettori (anche con parametro), trovare una relazione di dipendenza.
- Estrarre una base da un insieme di generatori; completare a una base; trovare le coordinate in una base data.
- Dimostrare Prop 5.5, Prop 6.7 (Span è sottospazio), Prop 7.6, unicità delle coordinate; esercizi 5.7 (K_k[x] sì, grado esattamente k no), 7.13 (basi di M(m,n)).
- (Dai compiti) Con U=⟨(1,0,1),(1,1,1)⟩, V=⟨(0,1,2),(0,1,1)⟩: dim U=dim V=2 e dim(U+V)=rk delle quattro colonne = 3 ⇒ dim(U∩V)=2+2-3=1 (Grassmann: dim(U+W)=dim U+dim W-dim(U∩W), **formula usata nei compiti ma non presente nelle Lezioni 1-26 estratte** (è comunque un teorema standard, e il risultato dim=1 è verificato)).

## Dubbi
- Es. 7.15 (v1,v2,v3 dipendenti, v1,v2,v4 indipendenti) ha segni persi: non ho riportato valori numerici.
- Somma/somma diretta di sottospazi e formula di Grassmann: introdotte solo per autospazi (Lezione 18, v. file 10) nelle fonti estratte.
