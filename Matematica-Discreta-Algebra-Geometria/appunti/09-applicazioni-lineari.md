# 09 - Applicazioni lineari (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 14-16 (`Lezioni_14-16.pdf`), con esercizi 14.15, 15.14, 16.3 e esempi 15.8-16.10. Alcuni segni persi nell'estrazione sono stati ricostruiti controllando i risultati (indicato dove).

## Mappa

---

- [1. Definizione](#1-definizione)
- [2. Nucleo e immagine](#2-nucleo-e-immagine)
- [3. Isomorfismi](#3-isomorfismi)
- [4. Matrice associata](#4-matrice-associata)
- [5. Cambiamento di base](#5-cambiamento-di-base)
- [6. Endomorfismi e similitudine](#6-endomorfismi-e-similitudine)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Definizione

Un'applicazione lineare è una funzione fra spazi vettoriali che rispetta la struttura, cioè somma e prodotto per scalare. Formalmente $f: V\to W$ (con $V$, $W$ sullo stesso campo $K$) è **lineare** se (i) $f(v+w)=f(v)+f(w)$ e (ii) $f(\lambda v)=\lambda f(v)$. Ne seguono subito $f(0)=0$ (quindi se $T(0)\ne 0$ la mappa non è lineare) e $f(\sum\lambda_iv_i)=\sum\lambda_if(v_i)$: una lineare è completamente determinata dai valori che assume su una base, ed è questo che permette di descriverla con una matrice.

Fra gli **esempi di lineari** ci sono:
- $T(a,b)=(2a+b,\ a+3b)$, che è $L_A$ con $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$;
- l'applicazione nulla e l'identità;
- la mappa $\boldsymbol{L_A: K^n\to K^m,\ x\mapsto Ax}$ per $A$ di taglia $m\times n$;
- la traccia $\text{Tr}: M(n,K)\to K$;
- la derivata $D: \mathbb{R}_n[x]\to\mathbb{R}_{n-1}[x]$;
- la valutazione $p\mapsto(p(2),p(-2))$.

Non sono lineari $T(a,b)=(a+2,\ b-1)$ (perché $T(0)\ne 0$) e $T(a,b)=(a^2,\ a+b)$: con $v=(2,1)$, $w=(2,0)$ si ha $T(v+w)=(16,5) \ne T(v)+T(w)=(8,5)$. Il test rapido: se le componenti sono **polinomi omogenei di grado 1** nelle variabili la mappa è lineare; termini noti, quadrati o prodotti la rendono non lineare.

## 2. Nucleo e immagine

Due sottoinsiemi misurano quanto una lineare perde e quanto raggiunge: il **nucleo $\text{Ker} f$** $= \lbrace v\in V \mid f(v)=0\rbrace \subseteq V$ e l'**immagine $\text{Im} f$** $= \lbrace f(v)\rbrace \subseteq W$. Entrambi sono sottospazi (Prop 14.11). Il loro legame con iniettività e suriettività è diretto: **$f$ è iniettiva $\iff \text{Ker} f=\lbrace 0\rbrace$**, e $f$ è suriettiva $\iff \text{Im} f=W$ (Prop 14.12); per il primo punto basta osservare che $f(v)=f(v')$ equivale a $v-v'\in\text{Ker}$. Inoltre, se $v_1..v_n$ generano $V$ allora $f(v_1)..f(v_n)$ generano $\text{Im} f$. Per $L_A$ questo si traduce in $\boldsymbol{\text{Im} L_A = \text{Span}(\text{colonne di } A)}$, quindi $\dim\text{Im} L_A = \text{rk} A$, e in $\boldsymbol{\text{Ker} L_A = \lbrace x \mid Ax=0\rbrace = S_0}$, lo spazio delle soluzioni del sistema omogeneo (file 08).

Il risultato centrale è il **teorema della dimensione** (14.13): se $\dim V = n$ è finita, allora $\boldsymbol{\dim\text{Ker} f + \dim\text{Im} f = n}$. Intuitivamente, ciò che il nucleo "schiaccia" e ciò che l'immagine "conserva" si spartiscono le $n$ dimensioni di partenza. Applicato a $L_A$ dà $\dim S_0 = n - \text{rk} A$, cioè proprio il contenuto di Rouché-Capelli. Il Cor 14.14 ne trae le conseguenze:
- $\dim\text{Im} f \le \dim V$;
- $f$ è iniettiva $\iff \dim\text{Im} f = \dim V$;
- $f$ è suriettiva $\iff \dim\text{Im} f = \dim W$.

Perciò se $\dim V > \dim W$ la mappa non è mai iniettiva (per esempio $f: \mathbb{R}^8\to\mathbb{R}^4$ ha $\dim\text{Ker}\ge 4$, e $f: \mathbb{R}^6\to\mathbb{R}^3$ ha $\dim\text{Ker}\ge 3$ e non è isomorfismo), se $\dim V < \dim W$ non è mai suriettiva, e se $\dim V = \dim W$ le tre condizioni iniettiva, suriettiva, isomorfismo sono equivalenti.

La procedura di calcolo, da usare sempre, è la seguente.
1. Scrivere la matrice $A$ di $f$ rispetto a basi (di solito canoniche): la colonna $j$ è l'immagine del $j$-esimo vettore di base.
2. **$\text{Ker} f$**: risolvere $Ax=0$ (Gauss-Jordan); una base del nucleo ha un vettore per ogni parametro libero.
3. **$\text{Im} f$**: prendere le colonne di $A$ corrispondenti ai **pivot** (colonne indipendenti): sono le coordinate di una base di $\text{Im} f$.
4. Controllo: $\dim\text{Ker} + \dim\text{Im} = n$.

**Esempi svolti (Es. 14.15)**, correggendo il testo estratto ($f_1: \mathbb{R}^3\to\mathbb{R}^2$, $f_1(x,y,z)=(x+y+z,\ 2x+3y+4z)$):
- $f_1$: $A=\begin{pmatrix}1&1&1\\2&3&4\end{pmatrix}$; Ker: $x+y+z=0$, $y+2z=0 \Rightarrow (z,-2z,z) \Rightarrow$ base $(1,-2,1)$, dim 1; Im: rk 2 $\Rightarrow \text{Im}=\mathbb{R}^2$ (suriettiva); $1+2=3$ ✓.
- $f_2: \mathbb{R}_2[x]\to\mathbb{R}$, $f_2(p)=p(1)+p(-1)$: su $a+bx+cx^2$ vale $2a+2c \Rightarrow \text{Ker}=\lbrace a=-c\rbrace$: base $\lbrace x,\ 1-x^2\rbrace$, dim 2; $\text{Im}=\mathbb{R}$ (dim 1); $2+1=3$ ✓.
- $f_3: M_2(\mathbb{R})\to M_2(\mathbb{R})$, $f_3(A)=A-{}^tA$: Ker = matrici simmetriche (dim 3), Im = antisimmetriche (dim 1, generata da $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$); $3+1=4$ ✓.

## 3. Isomorfismi

Un **isomorfismo** è una lineare biettiva, e la sua inversa è automaticamente lineare (Prop 15.2): due spazi isomorfi sono "lo stesso spazio con nomi diversi". Per le Prop 15.3-15.4, $f$ iniettiva implica $\dim V\le\dim W$ e $f$ suriettiva implica $\dim V\ge\dim W$, da cui $\boldsymbol{V\cong W \iff \dim V=\dim W}$. Il Cor 15.5 dice che ogni spazio di dimensione $n$ su $K$ è isomorfo a $K^n$ tramite l'applicazione delle **coordinate** (che però dipende dalla scelta della base): è la giustificazione teorica del fatto che in dimensione finita si può sempre lavorare con colonne di numeri.

## 4. Matrice associata

Fissate una base $B=\lbrace v_1..v_n\rbrace$ di $V$ e una base $C=\lbrace w_1..w_m\rbrace$ di $W$, ogni lineare $f$ si codifica in una matrice. Se $f(v_j)=\sum_i a_{ij}w_i$, la **matrice associata** è $A=[f]_B^C=(a_{ij})$ ($m\times n$): **la colonna $j$ contiene le coordinate di $f(v_j)$ rispetto a $C$** ($B$, la base di partenza, in alto; $C$, la base di arrivo, in basso). La **Prop 15.10** dice che $\boldsymbol{[f(v)]_C = [f]_B^C\cdot[v]_B}$: in coordinate, $f$ diventa semplicemente $L_A$. Rispetto alle basi canoniche $[L_A]$ è $A$ stessa, $[\text{id}]_B^B = I_n$, e le applicazioni lineari $V\to W$ formano uno spazio vettoriale isomorfo a $M(m,n)$ (Teo 15.13).

**Esempio svolto** (15.8): $f: \mathbb{R}_2[x]\to\mathbb{R}^2$, $f(p)=(p(2),p(-2))$, basi $B=(1,x,x^2)$, $C$ canonica: $f(1)=(1,1)$, $f(x)=(2,-2)$, $f(x^2)=(4,4)$ $\Rightarrow$ $[f]=\begin{pmatrix}1&2&4\\1&-2&4\end{pmatrix}$. Immagine di $p=3x^2+5x+1$ (coordinate $(1,5,3)$): $\begin{pmatrix}1&2&4\\1&-2&4\end{pmatrix}(1,5,3)^T = (1+10+12,\ 1-10+12) = \boldsymbol{(23,3)} = (p(2),p(-2))$ ✓.
Con base di arrivo $C'=\lbrace(1,-1),(0,1)\rbrace$ (segni ricostruiti dal risultato): $f(1)=(1,1)=1(1,-1)+2(0,1)$, $f(x)=(2,-2)=2(1,-1)+0(0,1)$, $f(x^2)=(4,4)=4(1,-1)+8(0,1)$ $\Rightarrow$ $[f]_B^{C'}=\begin{pmatrix}1&2&4\\2&0&8\end{pmatrix}$.

## 5. Cambiamento di base

Cambiare base significa riscrivere le stesse coordinate in un altro sistema di riferimento, e lo si fa con una matrice. La **matrice di cambiamento di base** da $B$ a $C$ è $M=[\text{id}]_B^C$, la cui colonna $j$ contiene le coordinate del vettore $v_j$ della vecchia base $B$ rispetto a $C$; essa soddisfa $[v]_C = M[v]_B$, e l'inversa $M^{-1}=[\text{id}]_C^B$ ha per colonne le coordinate dei vettori di $C$ rispetto a $B$.

**Esempio 16.3**: $A$ = base canonica di $\mathbb{R}^3$, $B=\lbrace w_1=(1,2,3),\ w_2=(0,2,1),\ w_3=(0,1,1)\rbrace$ (colonne): $[\text{id}]_B^A = (w_1\mid w_2\mid w_3) = \begin{pmatrix}1&0&0\\2&2&1\\3&1&1\end{pmatrix}$; la matrice richiesta $[\text{id}]_A^B$ (da canonica a $B$) è la sua inversa: $\boldsymbol{\begin{pmatrix}1&0&0\\1&1&-1\\-4&-1&2\end{pmatrix}}$ (verificata).

Sulla **composizione**, $f\circ g$ è lineare, $L_A\circ L_B = L_{AB}$ e $\boldsymbol{[g\circ f]_B^D = [g]_C^D\,[f]_B^C}$: il prodotto di matrici riflette esattamente la composizione di funzioni, ed è questa la vera ragione per cui il prodotto riga per colonna ha quella forma. Ne segue che $f$ è un isomorfismo $\iff [f]$ è invertibile, e allora $[f^{-1}]=[f]^{-1}$. Quando si cambiano contemporaneamente le basi di partenza e di arrivo vale il Cor 16.8: $[f]_{B_2}^{C_2} = [\text{id}_W]_{C_1}^{C_2}\cdot[f]_{B_1}^{C_1}\cdot[\text{id}_V]_{B_2}^{B_1}$.

## 6. Endomorfismi e similitudine

Un endomorfismo è una lineare $f: V\to V$; con una sola base $B$ si scrive $A=[f]_B^B$ e vale $[f\circ g]=[f][g]$. Se $M=[\text{id}]_B^C$, allora $\boldsymbol{[f]_B^B = M^{-1}\,[f]_C^C\,M}$. Due matrici $A,B\in M(n)$ si dicono **simili** ($A\sim B$) se esiste $M$ invertibile con $A=M^{-1}BM$: rappresentano lo stesso endomorfismo in basi diverse. La similitudine è una relazione di equivalenza (riflessiva con $M=I$, simmetrica, transitiva usando $(NM)^{-1}$). Se $A\sim B$ allora $\boldsymbol{\text{rk} A=\text{rk} B}$ **e** $\boldsymbol{\det A=\det B}$ (per Binet: $\det M^{-1}\det B\det M$), $A$ è invertibile $\iff B$ lo è, e hanno lo stesso polinomio caratteristico (file 10). Trovare una base in cui la matrice di $f$ è la più semplice possibile (diagonale) è proprio il problema della diagonalizzazione.

**Esempio 16.10** (segni ricostruiti): $f(x,y)=(x+y,\ -y)$ su $\mathbb{R}^2$; $[f]_C^C=\begin{pmatrix}1&1\\0&-1\end{pmatrix}$; $B=\lbrace(1,0),(-1,2)\rbrace$, $M=[\text{id}]_B^C=\begin{pmatrix}1&-1\\0&2\end{pmatrix}$, $M^{-1}=\begin{pmatrix}1&1/2\\0&1/2\end{pmatrix}$ $\Rightarrow$ $[f]_B^B=M^{-1}[f]M=\text{diag}(1,-1)$: $f$ fissa il primo vettore e ribalta il secondo ($f(-1,2)=(1,-2)=-(-1,2)$ ✓).

---

## Esercizi svolti collegati

Nucleo e immagine di endomorfismi di $\mathbb{R}_2[x]$, composizione, rango, cambi di base e teorema della dimensione sono nel quiz; un endomorfismo da formula (matrice, inversa, autovalori) è svolto come Esempio 2 in [17-esami-ag-2024-2025.md](17-esami-ag-2024-2025.md).

## Cose da saper fare all'esame
- Stabilire se una mappa è lineare; scrivere la matrice (basi canoniche o no); trovare base di Ker e di Im; verificare il teorema della dimensione; dire se è iniettiva/suriettiva/isomorfismo.
- Scrivere $[f]_B^C$ con basi qualsiasi (calcolare le coordinate delle immagini con sistemi lineari); calcolare $f(v)$ tramite $[f(v)]_C=[f]\cdot[v]_B$.
- Calcolare matrici di cambiamento di base e usarle per cambiare la matrice di un endomorfismo.
- Dimostrare: Ker e Im sottospazi; iniettiva $\iff$ Ker$=0$; inversa lineare; composizione $\leftrightarrow$ prodotto; similitudine è equivalenza; matrici simili hanno stesso det e rango.
- Quiz tipici: $f: \mathbb{R}^3\to\mathbb{R}^2$, $f(x,y,z)=(x+y,\ x+y)$ $\Rightarrow$ non iniettiva, non suriettiva (Im = retta); $(x+4y,\ x-2y)$ $\Rightarrow$ suriettiva (rk 2), Ker generato da $(0,0,1)$.

## Dubbi
- Il teorema della dimensione è enunciato senza dimostrazione nelle lezioni estratte (14.13): idea standard = completare una base di Ker a base di $V$ e mostrare che le immagini dei vettori aggiunti sono base di Im. [DA VERIFICARE se va dimostrato.]
- Es. 15.14: matrice di $f: \mathbb{C}^2\to\mathbb{C}^3$ rispetto a basi non canoniche: l'enunciato di $f$ ha segni persi, risultato nel PDF $\begin{pmatrix}1/2&5/2\\3/2&-1/2\\-1/2&-1/2\end{pmatrix}$ non verificato qui.