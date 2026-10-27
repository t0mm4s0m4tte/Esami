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

Il modello da tenere in mente per tutto il corso è $\mathbb{R}^n$, il prodotto cartesiano di $n$ copie di $\mathbb{R}$. Un suo elemento $x=(x_1,\dots,x_n)$ è visto come punto oppure come vettore (la freccia dall'origine 0) e si scrive come **vettore colonna**. Le operazioni sono componente per componente: la somma corrisponde alla regola del parallelogramma in $\mathbb{R}^2$, e il prodotto per uno scalare $\lambda x = (\lambda x_1,\dots,\lambda x_n)$ allunga il vettore di $\lvert\lambda\rvert$ e lo ribalta se $\lambda<0$.

## 2. Spazio vettoriale

Gli spazi vettoriali astraggono proprio ciò che accade in $\mathbb{R}^n$: ciò che serve è poter sommare vettori e scalare per un numero. Per gruppo e campo si veda il file 04 (Def 5.2, 5.3). Uno **spazio vettoriale su $K$** ($K$ campo, di solito $\mathbb{R}$ o $\mathbb{C}$) è un insieme $V$ con una somma $V\times V\to V$ e un prodotto per scalare $K\times V\to V$ tali che:
1. $(V,+)$ è un gruppo commutativo, con neutro $0_V$ ("origine", da non confondere con lo 0 di $K$);
2. $\lambda(v+w) = \lambda v+\lambda w$;
3. $(\lambda+\mu)v = \lambda v+\mu v$;
4. $(\lambda\mu)v = \lambda(\mu v)$;
5. $1v = v$.

Dagli assiomi si ricava, per esempio, la **Prop 5.5**: $0\cdot v = 0_V$ (infatti $0v=(0+0)v=0v+0v \Rightarrow 0v=0$). L'Esercizio 5.11 aggiunge $\lambda 0_V=0$, $(-\lambda)v = -(\lambda v) = \lambda(-v)$ e $\lambda(v-w)=\lambda v-\lambda w$.

Gli esempi sono molti e vari:
- $K$ su se stesso;
- $\boldsymbol{K^n}$ (operazioni termine a termine);
- le successioni in $K$;
- le funzioni $[0,1]\to K$ (somma e prodotto puntuali);
- $\boldsymbol{K[x]}$;
- $K_k[x]$, i polinomi di grado $\le k$ (ma NON quelli di grado esattamente $k$ per $k\ge 1$, perché la somma può abbassare il grado e manca lo 0);
- $\mathbb{C}$, che è spazio su $\mathbb{C}$ e anche su $\mathbb{R}$;
- le matrici $M(m,n,K)$ $m\times n$ con somma e prodotto per scalare termine a termine; $M(m,1,K)=K^m$.

Gli Es. 5.9-5.10 ricordano che $\lbrace 0,1\rbrace$ con $1+1=0$ è il campo $\mathbb{Z}_2$ e che $\mathbb{Z}_p$ con $p$ primo è un campo.

## 3. Matrici speciali (Def 6.3) e sottospazi

Fra le matrici quadrate $n\times n$ ce ne sono di cinque tipi con struttura particolare:
- **diagonale**: $a_{ij}=0$ per $i\ne j$;
- **triangolare superiore**: $a_{ij}=0$ per $i>j$;
- **triangolare inferiore**: $a_{ij}=0$ per $i<j$;
- **simmetrica**: $a_{ij}=a_{ji}$, equivalente a ${}^tA=A$;
- **antisimmetrica**: $a_{ij}=-a_{ji}$, equivalente a ${}^tA=-A$, e ha diagonale nulla.

La matrice nulla è di tutti e cinque i tipi. Gli insiemi $D(n)$, $T_s(n)$, $T_i(n)$, $S(n)$, $A(n)$ sono **sottospazi** di $M(n)$.

Un **sottospazio** (Def 6.2) di $V$ è un sottoinsieme $W\subseteq V$ che soddisfa:
1. $0\in W$;
2. $v,v'\in W \Rightarrow v+v'\in W$;
3. $v\in W,\ \lambda\in K \Rightarrow \lambda v\in W$.

In tal caso $W$ è esso stesso uno spazio vettoriale. Valgono sempre $\lbrace 0\rbrace \subseteq W \subseteq V$ (sottospazi banali).

Nella pratica c'è un test rapido: un sottoinsieme definito da equazioni lineari **omogenee** è un sottospazio (ad esempio $W=\lbrace x+y-z=0\rbrace\subset\mathbb{R}^3$ ha dimensione 2 e base $(1,0,1),(0,1,1)$); se l'equazione non è omogenea ($x+y-z=1$) il sottoinsieme non contiene 0 e dunque non è un sottospazio (è un sottospazio affine, vedi file 08/12). Per lo stesso motivo una retta non passante per l'origine non è un sottospazio.

## 4. Combinazioni lineari e Span

Una **combinazione lineare** di $v_1..v_k$ è un vettore $\lambda_1v_1+\dots+\lambda_kv_k$. L'insieme di tutte le combinazioni, $\boldsymbol{\text{Span}(v_1,\dots,v_k)}$, è un **sottospazio** (Prop 6.7: contiene 0 con tutti i $\lambda$ nulli, ed è chiuso per somma e prodotto per scalare) e rappresenta ciò che si "raggiunge" usando quei vettori. $\text{Span}(v)$ è la retta $\lbrace\lambda v\rbrace$; $\text{Span}(e_1,e_2)$ in $\mathbb{R}^3$ è il piano $z=0$; per $v=(1,2)$, $\text{Span}(v)$ è la retta $y=2x$.

## 5. Indipendenza, basi, dimensione

I vettori $v_1..v_k$ sono **dipendenti** se esistono $\lambda$ non tutti nulli con $\sum\lambda_i v_i = 0$ (cioè c'è ridondanza fra loro), **indipendenti** se $\sum\lambda_i v_i=0$ implica che tutti i $\lambda_i$ siano 0. Per la Prop 7.2 sono dipendenti $\iff$ uno di essi è combinazione degli altri. Un solo vettore è dipendente $\iff v=0$, e due vettori sono dipendenti $\iff$ sono multipli. I sottoinsiemi di vettori indipendenti sono indipendenti (Prop 7.6), quindi vettori indipendenti sono $\ne 0$ e a coppie non multipli; **ma** per $k\ge 3$ queste condizioni non bastano: $v_1=(1,1,0)$, $v_2=(0,1,1)$, $v_3=(1,0,-1)$ sono a coppie indipendenti, eppure $v_1-v_2-v_3=0$.

Una **base** (Def 7.7) è un insieme $v_1..v_n$ di vettori indipendenti **e** generatori ($V=\text{Span}$). Le basi canoniche sono $e_1..e_n$ per $K^n$, $1,x,\dots,x^n$ per $K_n[x]$, e le matrici $e_{ij}$ (un 1 in posizione $(i,j)$) per $M(m,n)$, da cui $\dim M(m,n)=mn$. Il **Teo 7.10** garantisce che due basi di $V$ hanno lo stesso numero di elementi, quindi la **dimensione $\dim V$** è ben definita: $\dim K^n=n$, $\dim K_n[x]=n+1$, $\dim K[x]=\infty$. Quando la dimensione è nota basta metà del lavoro (**Teo 7.12**): se $\dim V=n$, $n$ vettori sono una base $\iff$ sono indipendenti $\iff$ generano; più di $n$ vettori sono sempre dipendenti, meno di $n$ non generano.

Con una base fissata ogni vettore ha un indirizzo preciso: dati $v_1..v_n$ base, ogni $v$ si scrive in modo UNICO come $\sum\lambda_i v_i$ (Prop 13.4), e $(\lambda_1..\lambda_n)$ sono le **coordinate** $[v]_B$. L'unicità segue dal fatto che la differenza di due scritture darebbe una combinazione nulla, quindi i coefficienti coincidono.

**Calcolo pratico (con le matrici, v. file 07/08)**: per provare che $k$ vettori di $\mathbb{R}^n$ sono indipendenti si mette la matrice con i vettori per colonne e si calcola il rango ($\text{rango} = k$) o il determinante (se $n=k$: $\det\ne 0$).

**Esempio svolto**: $B=\lbrace(1,0,2),(1,1,2),(1,2,1)\rbrace$, $v=(2,3,3)$ (quiz 2023): risolvere $\lambda_1(1,0,2)+\lambda_2(1,1,2)+\lambda_3(1,2,1)=(2,3,3)$: $\lambda_1+\lambda_2+\lambda_3=2$, $\lambda_2+2\lambda_3=3$, $2\lambda_1+2\lambda_2+\lambda_3=3 \Rightarrow$ ($2\cdot$prima $-$ terza) dà $\lambda_3=1$, poi $\lambda_2=3-2=1$, $\lambda_1=2-1-1=0$; verifica: $0+1+1=2$ ✓; $1+2=3$ ✓; $0+2+1=3$ ✓ $\Rightarrow$ $\boldsymbol{[v]_B = (0,1,1)}$. (Con $v=(2,1,4) \to (1,1,0)$: $1+1=2$ ✓, $1=1$ ✓, $2+2=4$ ✓.)

---

## Esercizi svolti collegati

Sottospazi, dimensione di insiemi di polinomi con vincolo, generatori/indipendenza e coordinate in una base di polinomi tornano nel quiz di Algebra Lineare: [17-esami-ag-2024-2025.md](17-esami-ag-2024-2025.md#quiz-le-domande-che-tornano).

## Cose da saper fare all'esame
- Verificare se un sottoinsieme (definito da equazioni, da condizioni su matrici/polinomi) è sottospazio: controllare 0, somma, scalare. Trovare base e dimensione.
- Stabilire indipendenza/dipendenza di vettori (anche con parametro), trovare una relazione di dipendenza.
- Estrarre una base da un insieme di generatori; completare a una base; trovare le coordinate in una base data.
- Dimostrare Prop 5.5, Prop 6.7 (Span è sottospazio), Prop 7.6, unicità delle coordinate; esercizi 5.7 ($K_k[x]$ sì, grado esattamente $k$ no), 7.13 (basi di $M(m,n)$).
- (Dai compiti) Con $U=\langle(1,0,1),(1,1,1)\rangle$, $V=\langle(0,1,2),(0,1,1)\rangle$: $\dim U=\dim V=2$ e $\dim(U+V)=\text{rk}$ delle quattro colonne $=3 \Rightarrow \dim(U\cap V)=2+2-3=1$ (Grassmann: $\dim(U+W)=\dim U+\dim W-\dim(U\cap W)$, **formula usata nei compiti, assente dalle Lezioni Buzano 1-26 ma presente con dimostrazione nelle slide Manno** (fonte: Slide MANNO, Lezione18_Alg.pdf, "Formula di Grassmann"; calcolo verificato: $\dim=1$)).

## Dubbi
- Es. 7.15 ($v_1,v_2,v_3$ dipendenti, $v_1,v_2,v_4$ indipendenti) ha segni persi: non ho riportato valori numerici.
- Somma/somma diretta di sottospazi e formula di Grassmann: introdotte solo per autospazi (Lezione 18, v. file 10) nelle fonti estratte.