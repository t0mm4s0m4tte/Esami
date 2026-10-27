# 04 - Permutazioni e gruppi (Matematica Discreta)

**Fonti e AVVERTENZA**
Nelle fonti leggibili compaiono solo: la definizione di **gruppo** e di **campo** (Buzano-Radeschi, Lezione 5), il simbolo $S_n$ e il segno di una permutazione usato nella definizione del determinante (Lezione 9: "$\text{sgn}(\sigma) = (-1)^k$ se $\sigma$ è prodotto di $k$ trasposizioni"), il concetto di operazione/neutro/inverso/potenze (Mori cap. 2).
I capitoli 5 (Permutazioni), 6 (Gruppi) di Mori **non erano leggibili** (estrazione troncata a metà cap. 4; Facchini è una scansione vuota). Tutto il resto è **teoria standard ricostruita [ASSUNZIONE: da verificare su Mori cap. 5-6]**: ho verificato su Drive che Mori si interrompe all'inizio del cap. 4 (l'indice conferma che i cap. 5 Permutazioni e 6 Gruppi esistono, ma il testo non è leggibile) e che Facchini è una scansione senza testo, quindi è conoscenza propria (livello 4). Dalle fonti leggibili provengono solo le definizioni di gruppo e campo (Buzano, Def 5.2-5.3) e il segno come $(-1)^k$ con $k$ trasposizioni (Buzano, Def 9.1). Gli esempi sono ricalcolati con software (calcolo verificato, ma ciò non verifica la teoria).

## Mappa

1. Gruppo: definizione ed esempi (da Buzano + Mori cap. 2)
2. Permutazioni: notazione a due righe, cicli, prodotto, inversa [ASSUNZIONE: da verificare]
3. Scambi/trasposizioni, segno, parità [ASSUNZIONE: da verificare]
4. Ordine (periodo) di una permutazione [ASSUNZIONE: da verificare]
5. Sottogruppi, Lagrange, ordine di un elemento [ASSUNZIONE: da verificare]
6. Omomorfismi, nucleo e immagine [ASSUNZIONE: da verificare]
7. Gruppi ciclici [ASSUNZIONE: da verificare]
---

- [1. Gruppo](#1-gruppo)
- [2. Permutazioni [ASSUNZIONE: da verificare]](#2-permutazioni-assunzione-da-verificare)
- [3. Scambi (trasposizioni) e segno [ASSUNZIONE: da verificare]](#3-scambi-trasposizioni-e-segno-assunzione-da-verificare)
- [4. Periodo (ordine) [ASSUNZIONE: da verificare]](#4-periodo-ordine-assunzione-da-verificare)
- [5. Sottogruppi, Lagrange [ASSUNZIONE: da verificare]](#5-sottogruppi-lagrange-assunzione-da-verificare)
- [6. Omomorfismi [ASSUNZIONE: da verificare]](#6-omomorfismi-assunzione-da-verificare)
- [7. Gruppi ciclici [ASSUNZIONE: da verificare]](#7-gruppi-ciclici-assunzione-da-verificare)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Gruppo

Un gruppo è la struttura algebrica più semplice in cui si può "fare e disfare": un'operazione associativa, con un elemento che non cambia nulla e la possibilità di tornare indietro. Formalmente (Buzano, Def 5.2) è un insieme $G$ con operazione binaria $*$ tale che:
1. esiste $e\in G$ con $e*a = a*e = a$ per ogni $a$ (neutro);
2. $a*(b*c) = (a*b)*c$ per ogni $a,b,c$ (associatività);
3. per ogni $a$ esiste $a'$ con $a*a' = a'*a = e$ (inverso).

Il gruppo è **commutativo (abeliano)** se vale anche $a*b = b*a$. Sono gruppi abeliani $(\mathbb{Z},+)$, $(\mathbb{Q},+)$, $(\mathbb{R},+)$, $(\mathbb{C},+)$ e $(\mathbb{Q}\setminus\lbrace 0\rbrace,\cdot)$, $(\mathbb{R}\setminus\lbrace 0\rbrace,\cdot)$, $(\mathbb{C}\setminus\lbrace 0\rbrace,\cdot)$. NON sono gruppi $(\mathbb{N},+)$, perché manca l'opposto, e $(\mathbb{Z}\setminus\lbrace 0\rbrace,\cdot)$, perché manca l'inverso (2 non ne ha uno).

Dalle sole proprietà della definizione seguono che neutro e inversi sono unici (Mori Prop 2.29, 2.31), che $(a*b)^{-1} = b^{-1}*a^{-1}$ e che le potenze $a^n$, per $n\in\mathbb{Z}$, soddisfano $a^{m+n}=a^m a^n$ (Mori Prop 2.33). Altri esempi fondamentali: $(\mathbb{Z}_n,+)$; $(\mathbb{Z}_n^{*},\cdot)$; le biezioni di $X$ con la composizione, cioè gli invertibili di $F_X$, che formano il **gruppo simmetrico**. In generale gli invertibili di un insieme con operazione associativa e neutro formano sempre un gruppo (Mori Prop 2.35).

Un **campo** (Buzano, Def 5.3) è un insieme $(A,+,\cdot)$ in cui $(A,+)$ è un gruppo abeliano di neutro 0, $(A\setminus\lbrace 0\rbrace,\cdot)$ è un gruppo abeliano di neutro 1, e vale la distributività. Sono campi $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$, $\mathbb{Z}_p$ ($p$ primo); $\mathbb{Z}$ non lo è.

## 2. Permutazioni [ASSUNZIONE: da verificare]

Le permutazioni sono il caso concreto più importante di gruppo non commutativo. **$S_n$** è l'insieme delle biezioni $\sigma: \lbrace 1,\dots,n\rbrace\to\lbrace 1,\dots,n\rbrace$; ha $\lvert S_n\rvert = n!$ elementi (è il numero degli ordinamenti del file 02) e con la composizione è un gruppo con neutro $\text{id}$, **non abeliano per $n \ge 3$**. Una permutazione si scrive con la notazione a due righe ($i$ sopra, $\sigma(i)$ sotto) oppure "a una riga" $[\sigma(1)\ \dots\ \sigma(n)]$, usata da Buzano per il determinante.

Il modo più efficiente di capire una permutazione è scomporla in cicli. Un **ciclo** $(a_1\ a_2\ \dots\ a_k)$ manda $a_1\to a_2\to\dots\to a_k\to a_1$ lasciando fissi gli altri elementi ($k$ è la lunghezza). Ogni permutazione è prodotto di cicli **disgiunti**, che commutano fra loro, in modo unico a meno dell'ordine; i punti fissi si omettono. Il prodotto di permutazioni è la composizione (convenzione adottata qui: si applica prima il fattore di destra, come $g\circ f$; [DA VERIFICARE la convenzione del docente]). L'inversa si ottiene invertendo i cicli: $(a_1\ \dots\ a_k)^{-1} = (a_k\ \dots\ a_1)$.

**Esempio svolto**: $\sigma = [3\ 5\ 1\ 6\ 2\ 4]$ in $S_6$ ($1\to3$, $2\to5$, $3\to1$, $4\to6$, $5\to2$, $6\to4$). Cicli: $1\to3\to1$; $2\to5\to2$; $4\to6\to4$ $\Rightarrow$ $\boldsymbol{\sigma = (1\ 3)(2\ 5)(4\ 6)}$, prodotto di 3 trasposizioni disgiunte; $\sigma^2 = \text{id}$.

## 3. Scambi (trasposizioni) e segno [ASSUNZIONE: da verificare]

Il mattone più piccolo è la **trasposizione** $(a\ b)$, che scambia due elementi. Ogni permutazione è prodotto di trasposizioni: un $k$-ciclo si scrive $(a_1\ a_2)(a_2\ a_3)\cdots(a_{k-1}\ a_k)$ con convenzione fissata, quindi con **$k-1$ trasposizioni**. Il numero di trasposizioni non è unico, ma la sua parità sì: il **segno** $\text{sgn}(\sigma) = (-1)^m$, dove $m$ è il numero di trasposizioni in una qualsiasi decomposizione, non dipende dalla decomposizione scelta. Le permutazioni pari hanno segno $+1$, le dispari $-1$. Un $k$-ciclo ha segno $(-1)^{k-1}$; inoltre $\text{sgn}(\sigma\tau) = \text{sgn}(\sigma)\,\text{sgn}(\tau)$, e le permutazioni pari formano il sottogruppo alterno $A_n$ di ordine $n!/2$.

Il segno è il ponte con l'Algebra Lineare, perché compare nella definizione del determinante:

$$
\det A = \sum_{\sigma \in S_n} \text{sgn}(\sigma)\, a_{1\sigma(1)}\cdots a_{n\sigma(n)} \qquad \text{(Buzano Def 9.1)}
$$

Per $n=2$ le permutazioni sono $\text{id}$ (segno $+$) e $(1\ 2)$ (segno $-$), da cui $ad-bc$. Per $n=3$ le tre trasposizioni hanno segno $-$ e le tre permutazioni "cicliche" ($\text{id}$ inclusa) hanno segno $+$: $[1\ 2\ 3]$, $[2\ 3\ 1]$, $[3\ 1\ 2]$ positive; $[1\ 3\ 2]$, $[3\ 2\ 1]$, $[2\ 1\ 3]$ negative.

Esempi: $\sigma = (1\ 3)(2\ 5)(4\ 6)$ ha 3 trasposizioni $\Rightarrow \text{sgn} = -1$. $(0\ 1\ 2)(3\ 4)$ (in $S_5$ con elementi $0..4$): 3-ciclo (pari, 2 trasposizioni) $\times$ trasposizione (1) $\Rightarrow$ 3 trasposizioni $\Rightarrow \text{sgn} = -1$.

## 4. Periodo (ordine) [ASSUNZIONE: da verificare]

L'ordine di $\sigma$, cioè il minimo $m\ge 1$ con $\sigma^m = \text{id}$, è il **mcm delle lunghezze dei cicli disgiunti**: ogni ciclo torna all'identità dopo un numero di passi pari alla sua lunghezza, e tutti insieme dopo il minimo comune multiplo. Esempio: $(0\ 1\ 2)(3\ 4)$ ha ordine $\text{mcm}(3,2) = 6$; $(1\ 3)(2\ 5)(4\ 6)$ ha ordine 2. In $S_n$ l'ordine massimo si ottiene scegliendo cicli di lunghezze con mcm massimo (es. $S_5$: max $= 6$).

## 5. Sottogruppi, Lagrange [ASSUNZIONE: da verificare]

Un **sottogruppo** $H \le G$ è un sottoinsieme non vuoto chiuso per prodotto e inverso (equivalentemente: contiene $e$ ed è chiuso per $*$ e per inverso; oppure $a*b^{-1}\in H$ per ogni $a,b\in H$). L'**ordine** $\lvert G\rvert$ è il numero di elementi, e l'**ordine di un elemento** $\text{ord}(a)$ è il minimo $n\ge 1$ con $a^n=e$, pari all'ordine del sottogruppo ciclico $\langle a\rangle = \lbrace a^n\rbrace$ generato da $a$.

Il risultato centrale è il **teorema di Lagrange**: se $G$ è finito e $H \le G$ allora $\lvert H\rvert$ divide $\lvert G\rvert$. L'idea è che $G$ è unione disgiunta di classi laterali $aH$, tutte di cardinalità $\lvert H\rvert$. Le conseguenze sono molte:
- $\text{ord}(a)$ divide $\lvert G\rvert$;
- $a^{\lvert G\rvert} = e$;
- i gruppi di ordine primo sono ciclici;
- applicandolo a $G=\mathbb{Z}_n^{*}$, con $\lvert G\rvert=\varphi(n)$, si ottiene **Eulero** $a^{\varphi(n)}\equiv 1$, e con $n=p$ si ottiene **Fermat**. Questo è il legame con il file 03.

## 6. Omomorfismi [ASSUNZIONE: da verificare]

Un'applicazione $f: G\to G'$ è un **omomorfismo** se rispetta l'operazione, $f(ab) = f(a)f(b)$; ne seguono $f(e)=e'$ e $f(a^{-1})=f(a)^{-1}$. Il **nucleo** $\text{Ker} f = \lbrace g \mid f(g)=e'\rbrace$ è un sottogruppo di $G$ e l'**immagine** $\text{Im} f$ un sottogruppo di $G'$; $f$ è iniettivo $\iff \text{Ker} f = \lbrace e\rbrace$. Un **isomorfismo** è un omomorfismo biettivo. Esempi: $\text{sgn}: S_n\to\lbrace\pm 1\rbrace$ (nucleo $A_n$); $\mathbb{Z}\to\mathbb{Z}_n$, $k\mapsto[k]$ (nucleo $n\mathbb{Z}$); $\exp: (\mathbb{R},+)\to(\mathbb{R}_{>0},\cdot)$. Il parallelo con l'Algebra Lineare è diretto: $\text{Ker}$ e $\text{Im}$ di un'applicazione lineare sono quelli di un omomorfismo dei gruppi additivi.

## 7. Gruppi ciclici [ASSUNZIONE: da verificare]

Un gruppo $G$ è **ciclico** se $G = \langle g\rangle$ per un opportuno $g$. Lo sono $(\mathbb{Z},+)$ e $(\mathbb{Z}_n,+)$; in $\mathbb{Z}_n$ gli elementi $[a]$ con $\text{MCD}(a,n)=1$ sono generatori, e sono $\varphi(n)$. Valgono tre proprietà:
- ogni sottogruppo di un gruppo ciclico è ciclico;
- un gruppo ciclico di ordine $n$ ha un unico sottogruppo per ogni divisore di $n$;
- ogni gruppo ciclico di ordine $n$ è isomorfo a $(\mathbb{Z}_n,+)$.

Invece $(\mathbb{Z}_n^{*},\cdot)$ non sempre è ciclico: lo è per $n$ primo (es. $\mathbb{Z}_7^{*} = \langle 3\rangle$ perché 3 ha ordine 6), ma $\mathbb{Z}_8^{*}$ non lo è.

---

## Esercizi svolti collegati

Tipo, periodo e parità di una permutazione, equazioni in $S_n$, ciclicità di prodotti di gruppi, gruppi definiti da un'operazione sulle coppie e omomorfismi con nucleo e controimmagini sono svolti in [16-esami-md-2024-2025.md](16-esami-md-2024-2025.md#gruppi-ciclicità-omomorfismi) e [16-esami-md-2024-2025.md](16-esami-md-2024-2025.md#permutazioni).

## Cose da saper fare all'esame
- Verificare gli assiomi di gruppo per un insieme con operazione (è anche il tipo "Es. 2.16": associatività, neutro, inversi), trovare l'inverso, stabilire se abeliano.
- Scrivere una permutazione in cicli disgiunti, calcolare prodotti, inversa, potenze, segno e ordine.
- Elencare i sottogruppi di un gruppo piccolo ($\mathbb{Z}_n$, $S_3$), calcolare l'ordine di un elemento, applicare Lagrange.
- Verificare che una mappa è omomorfismo e calcolare Ker/Im.
- Applicare Eulero/Fermat con Lagrange (vedi file 03).

## Dubbi
- Convenzione del prodotto di permutazioni (destra-sinistra o sinistra-destra) e notazione usata dal docente.
- Quanto di gruppi (sottogruppi normali, quozienti, Cayley) è effettivamente in programma: il programma ufficiale (doc "Argomenti dei Corsi - I Anno") non elenca la parte di Discreta; ricontrollare il syllabus Moodle.