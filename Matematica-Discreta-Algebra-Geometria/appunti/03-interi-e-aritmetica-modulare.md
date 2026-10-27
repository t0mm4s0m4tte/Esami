# 03 - Numeri interi e aritmetica modulare (Matematica Discreta)

**Fonti e AVVERTENZA IMPORTANTE**
Mori, *Lezioni di Matematica Discreta*, cap. 4 e cap. 7: dal PDF su Drive l'estrazione del testo si interrompe all'inizio del cap. 4 (definizione di divisibilità e di elemento irriducibile). Il resto del cap. 4 (divisione euclidea, teorema fondamentale dell'aritmetica) e tutto il cap. 7 (classi resto, gruppo moltiplicativo, congruenze, applicazioni) NON erano leggibili nelle fonti; il libro di Facchini è una scansione non leggibile (testo vuoto).
Quanto segue oltre il §1 è **teoria standard ricostruita (non estratta dalle fonti)**: [ASSUNZIONE: da verificare su Mori cap. 4/7]. Ho verificato su Drive che l'estrazione di Mori si interrompe all'inizio del cap. 4 (dopo la Def 4.3) e che Facchini è una scansione senza testo, quindi per le sezioni 2-5 non esiste fonte leggibile: sono conoscenza propria (livello 4). Gli esempi numerici sono stati ricalcolati con software (calcolo verificato, ma ciò non verifica la teoria).

## Mappa degli argomenti

1. Divisibilità, invertibili, irriducibili/primi (da Mori)
2. Divisione euclidea, MCD, algoritmo di Euclide, identità di Bézout [ASSUNZIONE: da verificare]
3. Teorema fondamentale dell'aritmetica [ASSUNZIONE: da verificare]
4. Congruenze, classi resto $\mathbb{Z}_n$, operazioni ben definite [ASSUNZIONE: da verificare]
5. $\mathbb{Z}_n^{*}$, funzione di Eulero, Eulero-Fermat, equazioni congruenziali, CRT [ASSUNZIONE: da verificare]
---

- [1. Divisibilità (Mori 4.1-4.3)](#1-divisibilità-mori-41-43)
- [2. Divisione euclidea, MCD, Euclide, Bézout [ASSUNZIONE: da verificare]](#2-divisione-euclidea-mcd-euclide-bézout-assunzione-da-verificare)
- [3. Teorema fondamentale dell'aritmetica [ASSUNZIONE: da verificare]](#3-teorema-fondamentale-dellaritmetica-assunzione-da-verificare)
- [4. Congruenze e classi resto [ASSUNZIONE: da verificare]](#4-congruenze-e-classi-resto-assunzione-da-verificare)
- [5. Z_n*, Eulero, equazioni, CRT [ASSUNZIONE: da verificare]](#5-z_n-eulero-equazioni-crt-assunzione-da-verificare)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Divisibilità (Mori 4.1-4.3)

L'aritmetica degli interi ruota attorno alla relazione di divisibilità: $a$ divide $b$ ($a \mid b$) se esiste $k\in\mathbb{Z}$ con $b = ka$. Per esempio $-4 \mid 20$ mentre $3 \nmid 10$. Alcuni casi limite vanno ricordati:
- ogni $n$ divide 0 ($0 = n\cdot 0$);
- 0 divide solo 0;
- gli invertibili $\pm 1$ dividono tutto e sono gli unici a farlo.

In $(\mathbb{Z},\cdot)$ gli invertibili sono infatti solo $\pm 1$ (Mori, cap. 2 e 4). In $\mathbb{Z}$ l'addizione ha tutti gli elementi invertibili (l'opposto), mentre la moltiplicazione ha come invertibili solo $\pm 1$: è questa asimmetria a rendere interessante lo studio dei divisori.

La **Prop 4.2** dice come la divisibilità si comporta rispetto alla somma: se $s = a+b$,
1. un divisore comune di $a$ e $b$ divide $s$;
2. un divisore di $s$ e di uno degli addendi divide anche l'altro (perché $b = s-a$).

Un intero $n \notin \lbrace 0,\pm 1\rbrace$ è **irriducibile** (Def 4.3) se $n=ab$ implica che uno fra $a$ e $b$ è invertibile ($\pm 1$). Mori distingue questa nozione dalla definizione di "primo" ($n$ primo se $n \mid ab \Rightarrow n \mid a$ oppure $n \mid b$); in $\mathbb{Z}$ le due nozioni sono equivalenti. [DA VERIFICARE la definizione esatta usata da Mori per "primo".]

## 2. Divisione euclidea, MCD, Euclide, Bézout [ASSUNZIONE: da verificare]

Lo strumento fondamentale è la **divisione euclidea**: per ogni $a\in\mathbb{Z}$ e $b>0$ esistono unici $q,r$ con $a = bq + r$ e $0 \le r < b$. Dal resto discende il $\text{MCD}(a,b)$, il massimo divisore comune positivo; vale $\text{mcm}(a,b)\cdot\text{MCD}(a,b) = \lvert ab\rvert$, e $a,b$ sono **coprimi** se $\text{MCD}=1$. L'**algoritmo di Euclide** sfrutta l'identità $\text{MCD}(a,b) = \text{MCD}(b,\ a \bmod b)$: si divide ripetutamente, e l'ultimo resto non nullo è il MCD.

Risalendo i passaggi dell'algoritmo (algoritmo esteso) si ottiene l'**identità di Bézout**: esistono $x,y\in\mathbb{Z}$ con $ax+by = \text{MCD}(a,b)$. Ne segue che $a,b$ sono coprimi se e solo se esistono $x,y$ con $ax+by=1$, e questo è il cuore di tutto ciò che riguarda gli inversi modulari. Altri due risultati usati di continuo: il lemma di Euclide ($p$ primo, $p \mid ab \Rightarrow p \mid a$ o $p \mid b$) e il fatto che se $a \mid bc$ e $\text{MCD}(a,b)=1$ allora $a \mid c$.

**Esempio svolto** $\text{MCD}(252,198)$: $252 = 1\cdot 198 + 54$; $198 = 3\cdot 54 + 36$; $54 = 1\cdot 36 + 18$; $36 = 2\cdot 18 + 0 \Rightarrow \text{MCD} = 18$.
Risalendo: $18 = 54 - 36 = 54 - (198 - 3\cdot 54) = 4\cdot 54 - 198 = 4(252-198) - 198 = \mathbf{4\cdot 252 - 5\cdot 198}$. ($x=4$, $y=-5$, verificato numericamente.)
**Esempio**: $\text{MCD}(87,25)=1$ con $1 = -2\cdot 87 + 7\cdot 25 \Rightarrow 25^{-1} \equiv 7 \pmod{87}$.

## 3. Teorema fondamentale dell'aritmetica [ASSUNZIONE: da verificare]

Ogni $n \ge 2$ si scrive in modo unico (a meno dell'ordine) come prodotto di primi: $n = p_1^{e_1}\cdots p_k^{e_k}$. Per esempio $360 = 2^3\cdot 3^2\cdot 5$. La fattorizzazione dà un modo alternativo di calcolare MCD (prodotto dei primi comuni col minimo esponente) e mcm (col massimo esponente), e permette di calcolare la funzione $\varphi$ di Eulero.

## 4. Congruenze e classi resto [ASSUNZIONE: da verificare]

Due interi sono **congruenti modulo $n$** ($a \equiv b \pmod n$) se $n \mid (a-b)$, il che equivale a dire che hanno lo stesso resto nella divisione per $n$. La congruenza è una relazione di equivalenza: le classi $[a]_n$ formano una partizione di $\mathbb{Z}$ in $n$ blocchi $[0],\dots,[n-1]$, e l'insieme quoziente si chiama $\boldsymbol{\mathbb{Z}_n}$ ($=\mathbb{Z}/n\mathbb{Z}$), con $\lvert\mathbb{Z}_n\rvert = n$. È l'esempio concreto dell'idea di quoziente del file 01.

Le operazioni si definiscono sulle classi tramite i rappresentanti, $[a]+[b] = [a+b]$ e $[a]\cdot[b] = [ab]$, e vanno quindi controllate **ben definite**: se $a\equiv a'$ e $b\equiv b'$ allora $a+b\equiv a'+b'$ e $ab\equiv a'b'$. Questo è esattamente il "problema della buona definizione" di Mori (Nota 2.3). Con queste operazioni $(\mathbb{Z}_n,+)$ è un gruppo abeliano ciclico di ordine $n$ (generato da $[1]$) e $(\mathbb{Z}_n,+,\cdot)$ è un anello commutativo; è un **campo $\iff n$ primo**. Un esempio che compare anche in Algebra Lineare (Buzano, Es. 5.9) è $\lbrace 0,1\rbrace$ con $1+1=0$, cioè il campo $\mathbb{Z}_2$. Se $n$ è composto cade la legge di annullamento del prodotto: in $\mathbb{Z}_6$, ad esempio, $2\cdot 3 = 0$ (zero divisori).

## 5. Z_n*, Eulero, equazioni, CRT [ASSUNZIONE: da verificare]

Quali classi di $\mathbb{Z}_n$ si possono invertire? Una classe $[a]$ è **invertibile $\iff \text{MCD}(a,n)=1$**, e l'inverso si trova con Bézout (da $ax + ny = 1$ segue $a^{-1} \equiv x$). L'insieme $\mathbb{Z}_n^{*}$ degli invertibili è un gruppo moltiplicativo di ordine $\boldsymbol{\varphi(n)}$, dove la funzione di Eulero $\varphi(n)$ conta i $k\in[1,n]$ coprimi con $n$. Valgono:
- $\varphi(p) = p-1$;
- $\varphi(p^k) = p^k - p^{k-1}$;
- $\varphi(mn)=\varphi(m)\varphi(n)$ se $\text{MCD}(m,n)=1$.

Esempi: $\varphi(12)=4$ ($\mathbb{Z}_{12}^{*} = \lbrace 1,5,7,11\rbrace$), $\varphi(36)=12$, $\varphi(35)=24$, $\varphi(360)=96$.

Due teoremi permettono di semplificare le potenze modulari. Il **teorema di Eulero**: se $\text{MCD}(a,n)=1$ allora $a^{\varphi(n)} \equiv 1 \pmod n$. Il **piccolo teorema di Fermat** ne è il caso particolare $n=p$: se $p$ è primo e $p\nmid a$, $a^{p-1} \equiv 1 \pmod p$ (e per ogni $a$, $a^p \equiv a$). Entrambi discendono dal teorema di Lagrange applicato al gruppo $\mathbb{Z}_n^{*}$ (vedi file 04).

Le equazioni lineari in $\mathbb{Z}_n$ seguono dal criterio di invertibilità. L'**equazione $ax \equiv b \pmod n$** ha soluzione $\iff d = \text{MCD}(a,n)$ divide $b$; in tal caso ha $d$ soluzioni modulo $n$: si divide tutto per $d$ ($a'x \equiv b' \pmod{n/d}$, con $a'$ invertibile) e si aggiungono i multipli di $n/d$. Per i sistemi vale il **teorema cinese dei resti**: se $m_1,\dots,m_k$ sono a due a due coprimi, il sistema $x \equiv a_i \pmod{m_i}$ ha una soluzione unica modulo $m_1\cdots m_k$.

**Esempi svolti (verificati numericamente)**
1. $7^{-1} \bmod 26 = 15$ ($7\cdot 15 = 105 = 4\cdot 26 + 1$).
2. $14x \equiv 21 \pmod{35}$: $d = 7 \mid 21 \Rightarrow 2x \equiv 3 \pmod 5 \Rightarrow x \equiv 4 \pmod 5 \Rightarrow \mathbf{x \in \lbrace 4, 9, 14, 19, 24, 29, 34\rbrace}$ (7 soluzioni mod 35).
3. $4x \equiv 6 \pmod{26}$: $d = 2 \mid 6 \Rightarrow 2x \equiv 3 \pmod{13} \Rightarrow x \equiv 8 \pmod{13} \Rightarrow x \in \lbrace 8, 21\rbrace$.
4. Sistema $x\equiv 2 \pmod 3$, $x\equiv 3 \pmod 5$, $x\equiv 2 \pmod 7$: $x = 23 \pmod{105}$.
5. Calcolo di potenze: $3^{100} \bmod 7$: $3^6\equiv 1 \Rightarrow 3^{100} = 3^{96+4} \equiv 3^4 = 81 \equiv \mathbf{4}$. $2^{1000} \bmod 13$: $2^{12}\equiv 1$, $1000 = 12\cdot 83+4 \Rightarrow 2^4=16\equiv\mathbf{3}$. $7^{222} \bmod 10$: $\varphi(10)=4$, $222=4\cdot 55+2 \Rightarrow 7^2=49\equiv\mathbf{9}$.
6. Potenze di 3 mod 7: 3, 2, 6, 4, 5, 1: 3 ha ordine 6 $\Rightarrow \mathbb{Z}_7^{*} = \langle 3\rangle$ è ciclico (3 generatore).

---

## Esercizi svolti collegati

Inversi con Euclide esteso, resti di grosse potenze con Eulero, congruenze lineari con gcd, divisori dello zero e CRT sono nel Problema 1 di quasi ogni appello di Discreta; esempi con numeri e soluzioni in [16-esami-md-2024-2025.md](16-esami-md-2024-2025.md) (sezione "Aritmetica modulare, $\mathbb{Z}_n$, $\mathbb{Z}_n^{*}$, congruenze") e le domande del quiz sul resto e sulle congruenze con una sola soluzione.

## Cose da saper fare all'esame
- Calcolare MCD con Euclide e trovare coefficienti di Bézout; verificare la coprimalità.
- Risolvere congruenze lineari e sistemi (CRT), determinare l'inverso modulo $n$ e decidere se esiste.
- Calcolare potenze modulari grandi (ridurre l'esponente con Eulero/Fermat), ultime cifre di un numero.
- Elencare $\mathbb{Z}_n^{*}$, calcolare $\varphi(n)$; scrivere le tavole di operazioni di $\mathbb{Z}_n$ piccoli; stabilire quando $\mathbb{Z}_n$ è campo.
- Dimostrare che le operazioni su $\mathbb{Z}_n$ sono ben definite; dimostrare Prop 4.2.

## Dubbi
- Tutto il §2-§5 è da verificare sul libro Mori (cap. 4 seconda parte e cap. 7) o sulle slide del docente: non ho potuto leggere i capitoli. Chiedere al tutor quali dimostrazioni sono "obbligatorie" (es. Bézout, CRT, Fermat).
- Nelle edizioni passate del corso (UniTO) la parte di Discreta può includere anche relazioni d'ordine e grafi [DA VERIFICARE: non presenti nell'indice di Mori; l'indice di Mori ha solo: Insiemi, Funzioni, Combinatorica, Numeri Interi, Permutazioni, Gruppi, Aritmetica Modulare].