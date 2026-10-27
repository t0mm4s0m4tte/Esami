# 08 - Sistemi lineari (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 11-13 (`Lezioni_11-13.pdf`) e compiti d'esame 2019-2023 (quiz sui sistemi). Esempi 11.7-13.6 e Es. 11.11, 12.9 del PDF verificati.

## Mappa

---

- [1. Sistema, matrici, mosse di Gauss](#1-sistema-matrici-mosse-di-gauss)
- [2. Algoritmo di Gauss e Gauss-Jordan](#2-algoritmo-di-gauss-e-gauss-jordan)
- [3. Descrizione esplicita delle soluzioni](#3-descrizione-esplicita-delle-soluzioni)
- [4. Sistema omogeneo associato e struttura di S](#4-sistema-omogeneo-associato-e-struttura-di-s)
- [5. Teorema di Rouché-Capelli](#5-teorema-di-rouché-capelli)
- [6. Applicazioni (Lezione 13)](#6-applicazioni-lezione-13)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Sistema, matrici, mosse di Gauss

Un sistema lineare di $k$ equazioni in $n$ incognite, $\sum_j a_{ij}x_j = b_i$, si codifica in due matrici: $\boldsymbol{A}$, la matrice dei coefficienti ($k\times n$), e $\boldsymbol{b}$, il vettore dei termini noti; affiancandole si ottiene la **matrice completa $C = (A\mid b)$** ($k\times(n+1)$). In forma matriciale il sistema è $\boldsymbol{Ax = b}$, che si può leggere anche come $x_1A^1+\dots+x_nA^n = b$, dove le $A^j$ sono le colonne di $A$: risolvere il sistema significa cercare i modi di scrivere $b$ come combinazione lineare delle colonne. Questa doppia lettura è la chiave per collegare i sistemi a tutto il resto del corso.

L'idea per risolvere è sostituire il sistema con uno equivalente ma più semplice, usando le **mosse di Gauss**, che non cambiano l'insieme $S\subset K^n$ delle soluzioni (Prop 11.4):
- **(I)** scambiare due righe $R_i\leftrightarrow R_j$;
- **(II)** moltiplicare una riga per $\lambda\ne 0$;
- **(III)** sostituire $R_i$ con $R_i + \lambda R_j$.

## 2. Algoritmo di Gauss e Gauss-Jordan

Si chiama **pivot** di una riga il suo primo elemento non nullo, e **matrice a scalini** una matrice in cui il pivot di ogni riga sta strettamente a destra del pivot della riga precedente (con le righe nulle in fondo). L'algoritmo di **Gauss** porta una matrice in questa forma procedendo colonna per colonna:
1. se $C_{11}=0$ si scambia con una riga che abbia $C_{i1}\ne 0$ (se l'intera colonna è nulla si passa alla successiva);
2. per ogni $i\ge 2$ si fa $R_i \to R_i - (C_{i1}/C_{11})R_1$ per azzerare la colonna sotto il pivot;
3. si ripete tutto sulla sottomatrice senza la prima riga e la prima colonna.

Il **Gauss-Jordan** prosegue oltre: dopo Gauss si azzerano gli elementi **sopra** ogni pivot con mosse (III) e si rendono i pivot uguali a 1 con mosse (II), ottenendo la matrice ridotta (rref).

Il **rango** $\text{rk}(A)$ è il numero di pivot di una qualsiasi riduzione a scalini (le mosse non lo cambiano). Per calcolare il solo rango basta Gauss; per scrivere le soluzioni di solito conviene Gauss-Jordan.

**Esempio svolto** (Es. 11.11): $x+y+2z=9$, $2x+4y-3z=1$, $3x+6y-5z=0$.

$$
(A\mid b)=\left(\begin{array}{ccc|c}1&1&2&9\\2&4&-3&1\\3&6&-5&0\end{array}\right)
\xrightarrow{R_2-2R_1,\ R_3-3R_1}
\left(\begin{array}{ccc|c}1&1&2&9\\0&2&-7&-17\\0&3&-11&-27\end{array}\right)
\xrightarrow{R_3-\frac{3}{2}R_2}
\left(\begin{array}{ccc|c}1&1&2&9\\0&2&-7&-17\\0&0&-\frac12&-\frac32\end{array}\right)
$$

$\Rightarrow z=3$; poi $2y-21=-17 \Rightarrow y=2$; $x+2+6=9 \Rightarrow x=1$. **Soluzione unica $(1,2,3)$** (verifica nelle tre equazioni: $9$; $2+8-9=1$; $3+12-15=0$ ✓).

## 3. Descrizione esplicita delle soluzioni

Una volta ridotta la matrice con Gauss-Jordan, leggere le soluzioni è immediato. Se la colonna dei termini noti contiene un pivot, una delle righe dice $0=1$ e il sistema è impossibile: $\boldsymbol{S=\emptyset}$. Altrimenti le variabili corrispondenti alle colonne **senza pivot** sono *libere*, cioè possono assumere qualunque valore: le si chiama $t_1, t_2,\dots$ e le variabili pivot si ricavano in funzione dei parametri. Il risultato è la forma parametrica $S = x_0 + \lbrace\text{combinazioni di } t_1v_1+\dots\rbrace$, cioè una soluzione particolare più un'arbitraria combinazione di direzioni.

**Esempio** (quiz 2023): $x+2y+z=-1$, $2x+y+z=1$, $5x+4y+3z=1$. Gauss-Jordan $\Rightarrow \left(\begin{array}{ccc|c}1&0&\frac13&1\\0&1&\frac13&-1\\0&0&0&0\end{array}\right)$. Pivot in col. 1, 2; $z$ libera ($z=t$): $x=1-t/3$, $y=-1-t/3$. $\boldsymbol{S = (1,-1,0) + t\,(-\tfrac13,-\tfrac13,1)}$: $\infty^1$ soluzioni ($\text{rk}\,A = \text{rk}(A\mid b) = 2 < 3$).
Stesso sistema con termini noti $(1,1,1)$: l'ultima riga diventa $0=1 \Rightarrow$ **nessuna soluzione** ($\text{rk}\,A=2$, $\text{rk}(A\mid b)=3$).

## 4. Sistema omogeneo associato e struttura di S

Accanto a $Ax=b$ conviene sempre considerare il sistema **omogeneo associato** $Ax=0$. L'insieme $\boldsymbol{S_0}$ **delle sue soluzioni è un sottospazio vettoriale di $K^n$** (Prop 12.2): contiene 0 ed è chiuso per somma e prodotto per scalare; in altre parole è il nucleo $\text{Ker}\,L_A$ dell'applicazione associata ad $A$ (file 09). Invece l'insieme $S$ delle soluzioni di $Ax=b$ non è un sottospazio, perché per $b\ne 0$ non contiene 0. Tuttavia, se $S\ne\emptyset$, ha una struttura molto precisa (Prop 12.3): $\boldsymbol{S = x_p + S_0}$, dove $x_p$ è una soluzione particolare qualsiasi. La dimostrazione è breve: se $x,x'\in S$ allora $x-x'\in S_0$; viceversa, se $x_0\in S_0$ allora $x+x_0\in S$.

Si dice allora che $S$ è un **sottospazio affine**, cioè un insieme del tipo $x + W$ con $W$ sottospazio vettoriale (detto *giacitura*), e si pone $\dim S := \dim W$. Geometricamente è il sottospazio $S_0$ "traslato" via da 0 di un vettore $x_p$.

**Esempio** (12.4): $\lbrace x-y+z=1,\ y-z=2\rbrace$ in $\mathbb{R}^3$: $S_0=\lbrace(0,t,t)\rbrace$, particolare $(3,0,-2) \Rightarrow S = (3,\ t,\ t-2)$.

## 5. Teorema di Rouché-Capelli

Il teorema dice quando un sistema ha soluzioni e quante. **Teo 12.6**: $Ax=b$ ha soluzioni $\iff \boldsymbol{\text{rk}(A) = \text{rk}(A\mid b)}$, e in tal caso $S$ è sottospazio affine di dimensione $\boldsymbol{n - \text{rk}(A)}$ ($n$ = numero di incognite). Il perché è naturale: $Ax=b$ ha soluzione se e solo se $b\in\text{Span}(\text{colonne di } A)$, cioè $\text{Span}(A^1..A^n,b)=\text{Span}(A^1..A^n)$, cioè $\text{rk}(A\mid b)=\text{rk}(A)$; la dimensione è poi $\dim S=\dim S_0 = n - (\text{numero di pivot})$.

Su un campo infinito ne segue il **Cor 12.7**: le soluzioni sono 0, 1 oppure infinite, secondo questo schema.
- $\text{rk}(A\mid b) > \text{rk}\,A \Rightarrow$ nessuna soluzione;
- $\text{rk}(A\mid b) = \text{rk}\,A = n \Rightarrow$ una sola soluzione;
- $\text{rk}(A\mid b) = \text{rk}\,A < n \Rightarrow$ infinite ($\infty^{n-\text{rk}A}$).

Per le matrici quadrate (**Cor 12.8**), $Ax=b$ ha un'unica soluzione $\iff \text{rk}\,A=n \iff \det A\ne 0$, e allora $x=A^{-1}b$; per il sistema omogeneo $Ax=0$ ciò significa che c'è solo $x=0$ se $\det\ne 0$ e infinite soluzioni altrimenti. Nel gergo d'esame "$\infty^1$ soluzioni" vuol dire $\text{rk}\,A = \text{rk}(A\mid b) = n-1$ e "$\infty^2$ soluzioni" vuol dire $n-2$ (per $n=3$: $\text{rk}=1$). I quiz tipici sul rango sono, per un sistema $3\times 3$:
- infinite soluzioni $\Rightarrow \text{rk}(A)=\text{rk}(A\mid b)<3$ (in particolare $\det A=0$, $\text{rk}(A\mid b)<3$);
- senza soluzioni $\Rightarrow \text{rk}\,A < \text{rk}(A\mid b)$;
- una sola soluzione $\Rightarrow \text{rk}\,A = 3$.

**Esempio con parametro** (12.9): $x+ky=4-k$, $kx+4y=4$, $k\in\mathbb{R}$. $R_2\to R_2-kR_1$: $\left(\begin{array}{cc|c}1&k&4-k\\0&4-k^2&4-4k+k^2\end{array}\right)$, con $4-4k+k^2 = (k-2)^2$.
- $k=2$: seconda riga $0=0 \Rightarrow \text{rk}\,A=\text{rk}(A\mid b)=1 \Rightarrow \infty^1$ soluzioni (una retta).
- $k=-2$: seconda riga $0\cdot y=16 \Rightarrow \text{rk}\,A=1 < \text{rk}(A\mid b)=2 \Rightarrow$ nessuna soluzione.
- $k\ne\pm 2$: $\text{rk}=2 \Rightarrow$ soluzione unica (punto).

Per $k=1$: $3y=1 \Rightarrow y=1/3$, $x=3-y=8/3$.

**Procedura per sistemi con parametro**: si riduce a scalini lavorando con il parametro, ricordando che non si può dividere per un'espressione che si annulla per certi valori; quindi i valori critici (gli zeri dei pivot) vanno trattati a parte.

## 6. Applicazioni (Lezione 13)

I sistemi lineari sono lo strumento di calcolo per tutte le questioni di algebra lineare viste nel file 06, perché ogni condizione su combinazioni di vettori diventa un sistema. Per l'**indipendenza**: $v_1..v_k\in K^n$ sono indipendenti $\iff \sum\lambda_iv_i=0$ ha solo la soluzione banale $\iff$ il sistema omogeneo con matrice $(v_1\mid\dots\mid v_k)$ ha solo 0 $\iff \text{rk}(v_1\mid\dots\mid v_k)=k$; se $k=n$ basta $\det\ne 0$. Nell'Es. 13.1, $v_1=(1,1,0)$, $v_2=(0,1,1)$, $v_3=(1,0,-1)$ danno la matrice $\begin{pmatrix}1&0&1\\1&1&0\\0&1&-1\end{pmatrix}$ con $\det 0$ e rango 2, quindi sono dipendenti. Per i **generatori**: $v_1..v_k$ generano $K^n$ $\iff \text{rk}(v_1\mid\dots\mid v_k)=n$; nell'Es. 13.2, $w_1=(1,1,0)$, $w_2=(0,1,1)$, $w_3=(1,1,-1)$ hanno $\det = -1 \ne 0$, dunque sono una base di $\mathbb{R}^3$ (generano e sono indipendenti). Poiché $n$ vettori in uno spazio di dimensione $n$ formano una base appena una delle due condizioni è vera, basta verificarne una.

Le **coordinate** (Def 13.5) di $v$ nella base $B$ sono la soluzione di $(w_1\mid\dots\mid w_n)\lambda = v$, cioè $\lambda = A^{-1}v$ con $A=(w_1\mid\dots\mid w_n)$. Per $v=(3,4,5)$ rispetto alla base dell'Es. 13.2 si ottiene $\boldsymbol{\lambda=(7,1,-4)}$, infatti $7(1,1,0)+1(0,1,1)-4(1,1,-1) = (3,4,5)$ ✓.

Un'applicazione pratica sono i **codici correttori (Reed-Solomon, QR code)**: si inviano i coefficienti di un polinomio $s(x)$ con $s(1)=s(2)=0$, dove le condizioni sono un sistema lineare nelle cifre di controllo. Se la ricezione non verifica le condizioni, si risolve il sistema per ipotizzare l'errore in una posizione alla volta; con più condizioni si correggono più errori.

---

## Esercizi svolti collegati

Il numero di soluzioni dalla matrice completa (Rouché-Capelli) è una domanda fissa del quiz, e il Problema 11 usa i sistemi con parametro: [17-esami-ag-2024-2025.md](17-esami-ag-2024-2025.md#quiz-le-domande-che-tornano) e l'esempio 1 (sistema $A\cdot x=b$ con infinite soluzioni).

## Cose da saper fare all'esame
- Risolvere un sistema con Gauss/Gauss-Jordan e scrivere le soluzioni in forma parametrica $x_p + t_1v_1+\dots$; verificare sostituendo.
- Discutere un sistema al variare di un parametro con Rouché-Capelli (numero di soluzioni e dimensione).
- Dire, dalle caratteristiche (rango, det), se un sistema ha 0, 1, $\infty$ soluzioni e di che tipo (quiz con affermazioni su $\text{rango}(A)$, $\text{rango}(A\mid B)$).
- Stabilire indipendenza, generazione, base, coordinate usando i sistemi.
- Dimostrare: Prop 11.4 (le mosse conservano $S$), Prop 12.2 ($S_0$ sottospazio), Prop 12.3 ($S=x_p+S_0$), Rouché-Capelli.
- Collegare con le applicazioni lineari: $\text{Ker}\,L_A = S_0$ e il teorema della dimensione dà $\dim S_0 = n - \text{rk}\,A$ (file 09).

## Dubbi
- Es. 12.10-12.11 hanno entrate/segni ambigui nell'estrazione: non risolti.
- La riduzione dell'Es. 11.7 (matrice $3\times 4$ iniziale) non è completamente leggibile: l'algoritmo è però descritto per intero sopra.