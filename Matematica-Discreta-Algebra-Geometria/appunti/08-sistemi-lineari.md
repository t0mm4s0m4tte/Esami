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

Un sistema lineare di k equazioni in n incognite, Σ_j a_ij x_j = b_i, si codifica in due matrici: **A**, la matrice dei coefficienti (k×n), e **b**, il vettore dei termini noti; affiancandole si ottiene la **matrice completa C = (A|b)** (k×(n+1)). In forma matriciale il sistema è **Ax = b**, che si può leggere anche come x1A¹+...+xnAⁿ = b, dove le Aʲ sono le colonne di A: risolvere il sistema significa cercare i modi di scrivere b come combinazione lineare delle colonne. Questa doppia lettura è la chiave per collegare i sistemi a tutto il resto del corso.

L'idea per risolvere è sostituire il sistema con uno equivalente ma più semplice, usando le **mosse di Gauss**, che non cambiano l'insieme S⊂Kⁿ delle soluzioni (Prop 11.4):
- **(I)** scambiare due righe Ri↔Rj;
- **(II)** moltiplicare una riga per λ≠0;
- **(III)** sostituire Ri con Ri + λRj.

## 2. Algoritmo di Gauss e Gauss-Jordan

Si chiama **pivot** di una riga il suo primo elemento non nullo, e **matrice a scalini** una matrice in cui il pivot di ogni riga sta strettamente a destra del pivot della riga precedente (con le righe nulle in fondo). L'algoritmo di **Gauss** porta una matrice in questa forma procedendo colonna per colonna:
1. se C11=0 si scambia con una riga che abbia C_i1≠0 (se l'intera colonna è nulla si passa alla successiva);
2. per ogni i≥2 si fa Ri → Ri - (C_i1/C11)R1 per azzerare la colonna sotto il pivot;
3. si ripete tutto sulla sottomatrice senza la prima riga e la prima colonna.

Il **Gauss-Jordan** prosegue oltre: dopo Gauss si azzerano gli elementi **sopra** ogni pivot con mosse (III) e si rendono i pivot uguali a 1 con mosse (II), ottenendo la matrice ridotta (rref).

Il **rango** rk(A) è il numero di pivot di una qualsiasi riduzione a scalini (le mosse non lo cambiano). Per calcolare il solo rango basta Gauss; per scrivere le soluzioni di solito conviene Gauss-Jordan.

**Esempio svolto** (Es. 11.11): x+y+2z=9, 2x+4y-3z=1, 3x+6y-5z=0.
(A|b)= [[1,1,2|9],[2,4,-3|1],[3,6,-5|0]] → R2-2R1, R3-3R1: [[1,1,2|9],[0,2,-7|-17],[0,3,-11|-27]] → R3 - (3/2)R2: [[...],[0,0,-1/2|-3/2]] ⇒ z=3; poi 2y-21=-17 ⇒ y=2; x+2+6=9 ⇒ x=1. **Soluzione unica (1,2,3)** (verifica nelle tre equazioni: 9; 2+8-9=1; 3+12-15=0 ✓).

## 3. Descrizione esplicita delle soluzioni

Una volta ridotta la matrice con Gauss-Jordan, leggere le soluzioni è immediato. Se la colonna dei termini noti contiene un pivot, una delle righe dice 0=1 e il sistema è impossibile: **S=∅**. Altrimenti le variabili corrispondenti alle colonne **senza pivot** sono *libere*, cioè possono assumere qualunque valore: le si chiama t1, t2, ... e le variabili pivot si ricavano in funzione dei parametri. Il risultato è la forma parametrica S = x0 + {combinazioni di t1v1+...}, cioè una soluzione particolare più un'arbitraria combinazione di direzioni.

**Esempio** (quiz 2023): x+2y+z=-1, 2x+y+z=1, 5x+4y+3z=1. Gauss-Jordan ⇒ [[1,0,1/3|1],[0,1,1/3|-1],[0,0,0|0]]. Pivot in col. 1,2; z libera (z=t): x=1-t/3, y=-1-t/3. **S = (1,-1,0) + t(-1/3,-1/3,1)**: ∞¹ soluzioni (rk A = rk(A|b) = 2 < 3).
Stesso sistema con termini noti (1,1,1): l'ultima riga diventa 0=1 ⇒ **nessuna soluzione** (rk A=2, rk(A|b)=3).

## 4. Sistema omogeneo associato e struttura di S

Accanto a Ax=b conviene sempre considerare il sistema **omogeneo associato** Ax=0. L'insieme **S₀ delle sue soluzioni è un sottospazio vettoriale di Kⁿ** (Prop 12.2): contiene 0 ed è chiuso per somma e prodotto per scalare; in altre parole è il nucleo Ker L_A dell'applicazione associata ad A (file 09). Invece l'insieme S delle soluzioni di Ax=b non è un sottospazio, perché per b≠0 non contiene 0. Tuttavia, se S≠∅, ha una struttura molto precisa (Prop 12.3): **S = x_p + S₀**, dove x_p è una soluzione particolare qualsiasi. La dimostrazione è breve: se x,x' ∈ S allora x-x'∈S₀; viceversa, se x₀∈S₀ allora x+x₀ ∈ S.

Si dice allora che S è un **sottospazio affine**, cioè un insieme del tipo x + W con W sottospazio vettoriale (detto *giacitura*), e si pone dim S := dim W. Geometricamente è il sottospazio S₀ "traslato" via da 0 di un vettore x_p.

**Esempio** (12.4): {x-y+z=1, y-z=2} in R³: S₀={(0,t,t)}, particolare (3,0,-2) ⇒ S = (3, t, t-2).

## 5. Teorema di Rouché-Capelli

Il teorema dice quando un sistema ha soluzioni e quante. **Teo 12.6**: Ax=b ha soluzioni ⇔ **rk(A) = rk(A|b)**, e in tal caso S è sottospazio affine di dimensione **n - rk(A)** (n = numero di incognite). Il perché è naturale: Ax=b ha soluzione se e solo se b∈Span(colonne di A), cioè Span(A¹..Aⁿ,b)=Span(A¹..Aⁿ), cioè rk(A|b)=rk(A); la dimensione è poi dim S=dim S₀ = n - (numero di pivot).

Su un campo infinito ne segue il **Cor 12.7**: le soluzioni sono 0, 1 oppure infinite, secondo questo schema.
- rk(A|b) > rk A ⇒ nessuna soluzione;
- rk(A|b) = rk A = n ⇒ una sola soluzione;
- rk(A|b) = rk A < n ⇒ infinite (∞^{n-rk A}).

Per le matrici quadrate (**Cor 12.8**), Ax=b ha un'unica soluzione ⇔ rk A=n ⇔ det A≠0, e allora x=A⁻¹b; per il sistema omogeneo Ax=0 ciò significa che c'è solo x=0 se det≠0 e infinite soluzioni altrimenti. Nel gergo d'esame "∞¹ soluzioni" vuol dire rk A = rk(A|b) = n-1 e "∞² soluzioni" vuol dire n-2 (per n=3: rk=1). I quiz tipici sul rango sono, per un sistema 3×3:
- infinite soluzioni ⇒ rk(A)=rk(A|b)<3 (in particolare det A=0, rk(A|b)<3);
- senza soluzioni ⇒ rk A < rk(A|b);
- una sola soluzione ⇒ rk A = 3.

**Esempio con parametro** (12.9): x+ky=4-k, kx+4y=4, k∈R. R2→R2-kR1: [[1,k|4-k],[0,4-k²|4-4k+k²]], con 4-4k+k² = (k-2)².
- k=2: seconda riga 0=0 ⇒ rk A=rk(A|b)=1 ⇒ ∞¹ soluzioni (una retta).
- k=-2: seconda riga 0·y=16 ⇒ rk A=1 < rk(A|b)=2 ⇒ nessuna soluzione.
- k≠±2: rk=2 ⇒ soluzione unica (punto).

Per k=1: 3y=1 ⇒ y=1/3, x=3-y=8/3.

**Procedura per sistemi con parametro**: si riduce a scalini lavorando con il parametro, ricordando che non si può dividere per un'espressione che si annulla per certi valori; quindi i valori critici (gli zeri dei pivot) vanno trattati a parte.

## 6. Applicazioni (Lezione 13)

I sistemi lineari sono lo strumento di calcolo per tutte le questioni di algebra lineare viste nel file 06, perché ogni condizione su combinazioni di vettori diventa un sistema. Per l'**indipendenza**: v1..vk ∈ Kⁿ sono indipendenti ⇔ Σλ_iv_i=0 ha solo la soluzione banale ⇔ il sistema omogeneo con matrice (v1|...|vk) ha solo 0 ⇔ rk(v1|...|vk)=k; se k=n basta det≠0. Nell'Es. 13.1, v1=(1,1,0), v2=(0,1,1), v3=(1,0,-1) danno la matrice [[1,0,1],[1,1,0],[0,1,-1]] con det 0 e rango 2, quindi sono dipendenti. Per i **generatori**: v1..vk generano Kⁿ ⇔ rk(v1|...|vk)=n; nell'Es. 13.2, w1=(1,1,0), w2=(0,1,1), w3=(1,1,-1) hanno det = -1 ≠ 0, dunque sono una base di R³ (generano e sono indipendenti). Poiché n vettori in uno spazio di dimensione n formano una base appena una delle due condizioni è vera, basta verificarne una.

Le **coordinate** (Def 13.5) di v nella base B sono la soluzione di (w1|...|wn)λ = v, cioè λ = A⁻¹v con A=(w1|...|wn). Per v=(3,4,5) rispetto alla base dell'Es. 13.2 si ottiene **λ=(7,1,-4)**, infatti 7(1,1,0)+1(0,1,1)-4(1,1,-1) = (3,4,5) ✓.

Un'applicazione pratica sono i **codici correttori (Reed-Solomon, QR code)**: si inviano i coefficienti di un polinomio s(x) con s(1)=s(2)=0, dove le condizioni sono un sistema lineare nelle cifre di controllo. Se la ricezione non verifica le condizioni, si risolve il sistema per ipotizzare l'errore in una posizione alla volta; con più condizioni si correggono più errori.

---

## Cose da saper fare all'esame
- Risolvere un sistema con Gauss/Gauss-Jordan e scrivere le soluzioni in forma parametrica x_p + t1v1+...; verificare sostituendo.
- Discutere un sistema al variare di un parametro con Rouché-Capelli (numero di soluzioni e dimensione).
- Dire, dalle caratteristiche (rango, det), se un sistema ha 0, 1, ∞ soluzioni e di che tipo (quiz con affermazioni su rango(A), rango(A|B)).
- Stabilire indipendenza, generazione, base, coordinate usando i sistemi.
- Dimostrare: Prop 11.4 (le mosse conservano S), Prop 12.2 (S₀ sottospazio), Prop 12.3 (S=x_p+S₀), Rouché-Capelli.
- Collegare con le applicazioni lineari: Ker L_A = S₀ e il teorema della dimensione dà dim S₀ = n - rk A (file 09).

## Dubbi
- Es. 12.10-12.11 hanno entrate/segni ambigui nell'estrazione: non risolti.
- La riduzione dell'Es. 11.7 (matrice 3×4 iniziale) non è completamente leggibile: l'algoritmo è però descritto per intero sopra.
