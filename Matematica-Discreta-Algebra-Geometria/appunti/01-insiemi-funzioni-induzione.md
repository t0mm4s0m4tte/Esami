# 01 - Insiemi, funzioni, induzione (Matematica Discreta)

**Fonte**: A. Mori, *Lezioni di Matematica Discreta* (Drive, cartella Algebra e Geometria), capp. 1-2 (letti per intero dal PDF). Gli esercizi 1.x e 2.x del libro sono citati come riferimento per allenarsi.
**Parte del corso**: Matematica Discreta (esame unico MDAG, 12 CFU).

## Mappa degli argomenti

---

- [1. Insiemi: definizioni base](#1-insiemi-definizioni-base)
- [2. Numeri naturali e induzione](#2-numeri-naturali-e-induzione)
- [3. Operazioni tra insiemi](#3-operazioni-tra-insiemi)
- [4. Ricoprimenti, partizioni, quozienti](#4-ricoprimenti-partizioni-quozienti)
- [5. Prodotto cartesiano](#5-prodotto-cartesiano)
- [6. Funzioni](#6-funzioni)
- [7. Composizione e inversa](#7-composizione-e-inversa)
- [8. Operazioni binarie](#8-operazioni-binarie)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Insiemi: definizioni base

Tutta la matematica del corso poggia sul linguaggio degli insiemi, quindi conviene fissarlo con precisione. Un **insieme** è una collezione *ben definita* di oggetti distinti: non contano le ripetizioni ($\lbrace 0,0,1\rbrace = \lbrace 0,1\rbrace$) né l'ordine. Gli elementi possono a loro volta essere insiemi, ma attenzione: se $B \in A$, gli elementi di $B$ non sono in generale elementi di $A$. Un insieme si definisce per elenco, $\lbrace a,b,c\rbrace$, oppure per proprietà, $X = \lbrace x \in U \mid P(x)\rbrace$, dove $U$ è l'insieme universale (l'ambiente in cui si lavora).

Quasi ogni dimostrazione successiva richiede di saper **negare un enunciato con quantificatori**. La regola è meccanica: negare "per ogni" significa "ne esiste almeno uno per cui non vale", e negare "esiste" significa "per nessuno vale". In formule:
- $\lnot(\forall x\in A,\ P(x)) \iff \exists x\in A,\ \lnot P(x)$
- $\lnot(\exists x\in A,\ P(x)) \iff \forall x\in A,\ \lnot P(x)$

L'**insieme vuoto** $\emptyset = \lbrace\rbrace$ non ha elementi, e va distinto da $\lbrace\emptyset\rbrace$, che ne ha uno. La cardinalità $\lvert A\rvert$ è il numero di elementi di $A$.

Un insieme $B$ è **sottoinsieme** di $A$ ($B \subseteq A$) se ogni elemento di $B$ sta in $A$; i sottoinsiemi banali sono $\emptyset$ e $A$ stesso. L'**insieme delle parti** $\mathcal{P}(A) = \lbrace B \mid B \subseteq A\rbrace$ raccoglie tutti i sottoinsiemi: ad esempio $\mathcal{P}(\emptyset) = \lbrace\emptyset\rbrace$, mentre $\mathcal{P}(\lbrace a,b,c\rbrace)$ ha 8 elementi ($\emptyset$, 3 singoletti, 3 coppie, $A$). Per dimostrare che due insiemi coincidono si usa quasi sempre la **doppia inclusione**: $A = B \iff A \subseteq B$ e $B \subseteq A$.

## 2. Numeri naturali e induzione

I naturali sono caratterizzati dagli assiomi di Peano:
1. $0\in\mathbb{N}$;
2. ogni $n$ ha un successore $s(n)$;
3. $s$ è iniettiva;
4. $0 \ne s(n)$ per ogni $n$;
5. se $U\subseteq\mathbb{N}$ contiene 0 ed è chiuso per successore allora $U = \mathbb{N}$.

L'ultimo assioma è il **principio di induzione**, ed è il motivo per cui si può dimostrare una proprietà di tutti i naturali verificandola solo su un punto di partenza e sul passaggio da $n$ a $n+1$: la "scala" parte dal primo gradino e ogni gradino sorregge il successivo.

**Teorema (induzione)**: se $P(0)$ è vera e $\forall n\ (P(n) \Rightarrow P(n+1))$, allora $P(n)$ è vera per ogni $n$. Spesso si parte da $n=1$ o da un $n_0$ diverso: si dimostra il passo base e poi il passo induttivo, in cui si assume vera $P(n)$ (ipotesi induttiva) per dedurne $P(n+1)$.

**Esempio svolto 1** - $\displaystyle\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$.
Base $n=1$: $1 = 1\cdot 2\cdot 3/6$ ✓. Passo:

$$
\sum_{k=1}^{n+1} k^2 = \frac{n(n+1)(2n+1)}{6} + (n+1)^2 = \frac{(n+1)\,[\,n(2n+1)+6(n+1)\,]}{6} = \frac{(n+1)(2n^2+7n+6)}{6} = \frac{(n+1)(n+2)(2n+3)}{6}\ ✓
$$

**Esempio svolto 2** - $\lvert A\rvert = n \Rightarrow \lvert\mathcal{P}(A)\rvert = 2^n$.
Base $n=0$: $\mathcal{P}(\emptyset)=\lbrace\emptyset\rbrace$ ha $1 = 2^0$ elemento. Passo: sia $A=\lbrace a_1..a_{n+1}\rbrace$. I sottoinsiemi che NON contengono $a_{n+1}$ sono i sottoinsiemi di $B=\lbrace a_1..a_n\rbrace$, quindi $2^n$ per ipotesi induttiva; quelli che lo contengono sono in corrispondenza biunivoca con i primi (si aggiunge o si toglie $a_{n+1}$) e danno altri $2^n$. Totale $2\cdot 2^n = 2^{n+1}$.

Altre formule da saper dimostrare per induzione (Es. 1.19 Mori):
- $1+2+\dots+n = n(n+1)/2$;
- $1+3+\dots+(2n-1) = n^2$;
- $1^3+\dots+n^3 = n^2(n+1)^2/4$;
- $n^2 > 2n+1$ per $n\ge 3$ (base $n=3$, non $n=0$);
- $2^n > n^2$ per $n\ge 5$ (base $n=5$).

## 3. Operazioni tra insiemi

Dati due insiemi si possono fabbricare nuovi insiemi con le operazioni booleane: l'intersezione $A\cap B = \lbrace x \mid x\in A \text{ e } x\in B\rbrace$ ($A$ e $B$ sono disgiunti se $A\cap B=\emptyset$) e l'unione $A\cup B = \lbrace x \mid x\in A \text{ oppure } x\in B\rbrace$. Le stesse operazioni si estendono a famiglie arbitrarie $\lbrace A_i\rbrace_{i\in I}$: l'intersezione è $\lbrace x \mid x\in A_i\ \forall i\rbrace$ e l'unione $\lbrace x \mid \exists i:\ x\in A_i\rbrace$. Un esempio istruttivo: con $A_n=(-1/n,\,1/n)$ si ha $\bigcap A_n=\lbrace 0\rbrace$, mentre con $B_n=(-n,\,n)$ si ha $\bigcup B_n=\mathbb{R}$.

La differenza $X\setminus A = \lbrace x\in X \mid x\notin A\rbrace$ diventa, quando $A\subseteq X$, il complementare $C_X(A) = X\setminus A$, e vale $C_X(C_X(A)) = A$. Intersezione e unione si distribuiscono l'una sull'altra, e il complementare le scambia (leggi di De Morgan):
- **Distributività**: $(A\cup B)\cap C = (A\cap C)\cup(B\cap C)$; $(A\cap B)\cup C = (A\cup C)\cap(B\cup C)$.
- **De Morgan**: $C(A\cup B) = C(A)\cap C(B)$; $C(A\cap B) = C(A)\cup C(B)$. Valgono anche per famiglie arbitrarie e per la differenza, $X\setminus(A\cap B)=(X\setminus A)\cup(X\setminus B)$.

Il metodo tipico per dimostrarle è la doppia inclusione. Esempio: per $(A\cup B)\cap C \subseteq (A\cap C)\cup(B\cap C)$, sia $x$ nel primo insieme; allora $x\in A\cup B$ e $x\in C$; se $x\in A$ segue $x\in A\cap C$, altrimenti $x\in B$ e quindi $x\in B\cap C$; in ogni caso $x$ sta nel secondo insieme. Il viceversa è analogo.

## 4. Ricoprimenti, partizioni, quozienti

Spezzare un insieme in pezzi è un'operazione ricorrente (lo si userà per costruire $\mathbb{Z}_n$). Un **ricoprimento** di $X$ è una famiglia $\lbrace A_i\rbrace$ la cui unione è $X$; è una **partizione** se inoltre i pezzi non sono vuoti ($A_i \ne \emptyset\ \forall i$) e a due a due disgiunti ($A_i\cap A_j = \emptyset$ per $i\ne j$). $\mathbb{Z} = 2\mathbb{Z} \cup (2\mathbb{Z}+1)$ (pari e dispari) è una partizione; lo è anche $\lbrace A, C_X(A)\rbrace$ con $A$ non banale; invece $\mathbb{R}=\bigcup [n,n+1]$ è un ricoprimento ma NON una partizione, perché gli intervalli si sovrappongono negli estremi.

Una partizione permette di vedere ogni blocco come un unico oggetto: l'**insieme quoziente** $Q = \lbrace A_i\rbrace$ ha per elementi i blocchi, e un blocco si indica con $A=[x]$ per un suo rappresentante $x\in A$. La **funzione quoziente** $q: X\to Q$, che manda $x$ nel proprio blocco, è suriettiva.

Qui nasce il problema della **buona definizione** (Nota 2.3): se si definisce una funzione $f: Q\to B$ scegliendo un rappresentante $[x]$ e usando $x$, bisogna controllare che il valore non dipenda dal rappresentante scelto. Funziona $f([x]) = (-1)^x$ sulle classi pari/dispari; NON funziona invece la partizione di $\mathbb{N}$ per numero di cifre $E_n$ con $f(E_n) = [2x]$: $E_1$ contiene 4, con $[8]=E_1$, ma anche 7, con $[14]=E_2$, quindi il risultato cambia a seconda del rappresentante. Questo è il pilastro per $\mathbb{Z}_n$: le operazioni sulle classi resto vanno sempre controllate "ben definite".

## 5. Prodotto cartesiano

Il prodotto cartesiano $A\times B = \lbrace (a,b) \mid a\in A,\ b\in B\rbrace$ è l'insieme delle coppie ordinate. Se $\lvert A\rvert=m$ e $\lvert B\rvert=n$ sono finiti, $\lvert A\times B\rvert = mn$; se uno dei due è vuoto, $A\times B=\emptyset$. In generale $\lvert A_1\times\dots\times A_k\rvert = n_1\cdot\ldots\cdot n_k$ (Prop. 3.16), formula che regge tutta la combinatorica del file 02. $\mathbb{R}\times\mathbb{R}$ è il piano e $\mathbb{R}\times\mathbb{R}\times\mathbb{R}$ lo spazio.

## 6. Funzioni

Formalmente una **funzione** è una terna $(A, B, \Gamma)$ con $A,B$ non vuoti e $\Gamma \subseteq A\times B$ (il **grafico**) tale che per ogni $a\in A$ esista **un unico** $b$ con $(a,b)\in\Gamma$: la definizione cattura l'idea di "regola che a ogni input associa un solo output". Due funzioni sono uguali se hanno stesso dominio, codominio e grafico; Mori porta l'esempio di due "leggi" apparentemente diverse che definiscono la stessa funzione $\lbrace 0,1,2\rbrace\to\mathbb{R}$ perché coincidono sui tre punti [DA VERIFICARE la seconda legge, illeggibile nell'estrazione]. Dominio e codominio contano: $1/x$ è una funzione $\mathbb{R}\setminus\lbrace 0\rbrace\to\mathbb{R}$, non $\mathbb{R}\to\mathbb{R}$. Esempi ricorrenti: identità $\text{id}_A$, funzioni costanti, proiezioni $p_1$ e $p_2$ (suriettive), successioni (funzioni $\mathbb{N}\to B$), restrizioni $f\vert_S$, funzione quoziente.

Data $f: A\to B$, l'**immagine** di $S\subseteq A$ è $f(S) = \lbrace f(s)\rbrace$ e $\text{Im} f = f(A)$; $f$ è **suriettiva** se $\text{Im} f = B$. La **controimmagine** di $T\subseteq B$ è $f^{-1}(T) = \lbrace a \mid f(a)\in T\rbrace$. Attenzione alla differenza fra le due: $f(S)$ è non vuota se $S$ lo è, mentre $f^{-1}(T)$ può essere vuota anche con $T\ne\emptyset$ (con $f(x)=x^2$, $f^{-1}(-1)=\emptyset$). Una funzione è **iniettiva** se $a_1\ne a_2 \Rightarrow f(a_1)\ne f(a_2)$ e **biettiva** se è iniettiva e suriettiva. Le controimmagini di singoli punti offrono un criterio comodo (Prop 2.11): $f$ è suriettiva $\iff \lvert f^{-1}(b)\rvert \ge 1$ per ogni $b$, ed è iniettiva $\iff \lvert f^{-1}(b)\rvert \le 1$ per ogni $b$. Inoltre ci si può sempre ricondurre a una funzione suriettiva restringendo il codominio a $\text{Im} f$, e a una iniettiva restringendo opportunamente il dominio ($x^2$ su $\mathbb{R}_{\ge 0}$).

**Esempio svolto** - $f: \mathbb{Z}\to\mathbb{Z}$, $f(n)=2n+1$ è iniettiva ($2m+1=2n+1 \Rightarrow m=n$) ma non suriettiva, perché $\text{Im} f = 2\mathbb{Z}+1 \ne \mathbb{Z}$. $f: \mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ non è né iniettiva ($f(1)=f(-1)$) né suriettiva ($\text{Im}=\mathbb{R}_{\ge 0}$); come funzione $\mathbb{R}_{\ge 0}\to\mathbb{R}_{\ge 0}$ è invece biettiva.

## 7. Composizione e inversa

La composizione $(g\circ f)(a) = g(f(a))$ è definita solo se il codominio di $f$ coincide con il dominio di $g$. È associativa ma NON commutativa ($\cos(x)+1$ è diversa da $\cos(x+1)$), e $\text{id}$ è neutra. Il comportamento della composizione rispetto a iniettività e suriettività è:
- Prop 2.16: $f,g$ iniettive $\Rightarrow g\circ f$ iniettiva; $f,g$ suriettive $\Rightarrow g\circ f$ suriettiva; biettive $\Rightarrow$ biettiva.
- Prop 2.17: $g\circ f$ iniettiva $\Rightarrow$ **$f$ iniettiva**; $g\circ f$ suriettiva $\Rightarrow$ **$g$ suriettiva**. Cor 2.18: $g\circ f$ biettiva $\Rightarrow$ $f$ iniettiva e $g$ suriettiva.

Si dice che $f$ e $g$ sono **inverse** se $g\circ f=\text{id}_A$ e $f\circ g=\text{id}_B$. L'inversa esiste (ed è unica, Teo 2.20) se e solo se $f$ è biettiva, e allora $g(b)$ è l'unico elemento di $f^{-1}(b)$. Si indica con $f^{-1}$, con una piccola ambiguità rispetto alla controimmagine che si scioglie dal contesto; $(f^{-1})^{-1} = f$. Per la composizione vale $\boldsymbol{(g\circ f)^{-1} = f^{-1}\circ g^{-1}}$ (Prop 2.24), con l'ordine invertito: per disfare "prima $f$ poi $g$" bisogna disfare prima $g$. Vale anche la cancellazione: se $f$ è biettiva e $g_1\circ f = g_2\circ f$ allora $g_1=g_2$, e $f\circ h_1=f\circ h_2 \Rightarrow h_1=h_2$; la cancellazione è falsa in generale se $f$ non è biettiva. Si può avere $g\circ f=\text{id}$ senza $f\circ g=\text{id}$: per $s: A\to A\times B$, $s(a)=(a,\beta)$, si ha $p_1\circ s=\text{id}$ ma $s\circ p_1\ne\text{id}$.

## 8. Operazioni binarie

Un'operazione binaria su un insieme $A$ non vuoto è una funzione $*: A\times A\to A$. Le proprietà da controllare sono l'associatività $(a*b)*c=a*(b*c)$, la commutatività e l'esistenza di un elemento neutro $e$ ($a*e=e*a=a$), che se esiste è **unico**: $e=e*e'=e'$. Esempi: $+$ e $\cdot$ su $\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R}$ (neutri 0 e 1); la sottrazione non è un'operazione su $\mathbb{N}$ e inoltre non è commutativa né associativa e non ha neutro; $\cap$ e $\cup$ su $\mathcal{P}(X)$ (neutri $X$ e $\emptyset$); la composizione $\circ$ su $F_X = \lbrace f:X\to X\rbrace$ (associativa, non commutativa, neutro $\text{id}_X$).

Un elemento $a$ è **invertibile** (rispetto al neutro $e$) se esiste $b$ con $a*b=b*a=e$. Se $*$ è associativa l'inverso è **unico** ($b=b\cdot e=b(ab')=(ba)b'=b'$), e si scrive $a^{-1}$. Casi concreti:
- in $(\mathbb{Z},\cdot)$ gli invertibili sono $\pm 1$;
- in $(\mathbb{N},+)$ solo 0;
- in $(F_X,\circ)$ le funzioni biettive;
- in $(\mathcal{P}(X),\cap)$ solo $X$ e in $(\mathcal{P}(X),\cup)$ solo $\emptyset$.

L'insieme $U$ degli invertibili è chiuso per $*$, con $(a*b)^{-1} = b^{-1}*a^{-1}$.

Le **potenze** $a^n$ si definiscono per ricorsione e soddisfano $a^{m+n}=a^m a^n$ (se $a$ è invertibile la legge vale per ogni $m,n\in\mathbb{Z}$). Infine un sottoinsieme $S$ è **chiuso** per $*$ se $s_1*s_2\in S$ per ogni $s_1,s_2\in S$ (i pari sono chiusi per $+$, i dispari no).

---

## Esercizi svolti collegati

Le prime domande del quiz di Matematica Discreta sono su appartenenza e inclusione fra insiemi, prodotto cartesiano e funzione inversa di una funzione affine; i problemi usano anche cardinalità di unioni, intersezioni e controimmagini. Vedi [16-esami-md-2024-2025.md](16-esami-md-2024-2025.md#quiz-le-domande-che-tornano) e la sezione sulle cardinalità in [16-esami-md-2024-2025.md](16-esami-md-2024-2025.md#combinatoria). Per l'induzione non ci sono problemi negli appelli 2024-25 letti.

## Cose da saper fare all'esame
- Dimostrare per induzione una formula di somma / una disuguaglianza / $\lvert\mathcal{P}(A)\rvert=2^n$ (base + passo, scrivendo chiaramente l'ipotesi induttiva).
- Dimostrare uguaglianze fra insiemi con la doppia inclusione; applicare De Morgan e distributività.
- Negare enunciati con quantificatori.
- Dire se una famiglia è ricoprimento / partizione e scrivere l'insieme quoziente; stabilire se una funzione definita sui rappresentanti è ben definita.
- Per una funzione data: determinare iniettività, suriettività, immagine, controimmagini (Es. 2.1-2.3); modificare dominio/codominio per renderla biettiva e scrivere l'inversa (Es. 2.8: $f(n)=3n$; $f(x)=x^2+2x$ -> restringere a $x\ge -1$ con codominio $[-1,\infty)$, inversa $-1+\sqrt{y+1}$; $f(x,y)=(x^2,\ x^2+y^2)$).
- Stabilire associatività/commutatività/neutro/invertibili di una operazione (Es. 2.16: $m*n = m+n+1$ su $\mathbb{N}$, $a*b$ su $\mathbb{Z}$...).
- Dimostrare: unicità di neutro e di inverso; $(g\circ f)^{-1} = f^{-1}\circ g^{-1}$; $g\circ f$ iniettiva $\Rightarrow$ $f$ iniettiva.

## Dubbi
- Il libro tratta relazioni di equivalenza solo tramite partizioni/quozienti; il legame partizione <-> relazione di equivalenza ("$a\sim b$ se stesso blocco") e le classi di equivalenza compaiono altrove (aritmetica modulare, similitudine di matrici in Algebra Lineare). [DA VERIFICARE se a lezione si introduce esplicitamente "relazione di equivalenza" e "relazione d'ordine": non presenti in Mori cap. 1-2.]
- Cardinalità infinite (numerabilità, Cantor) sono in cap. 3 (vedi file 02).