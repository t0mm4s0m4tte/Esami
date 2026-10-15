# 05 - Numeri reali, complessi e polinomi (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, *MDAG Parte II: Algebra Lineare e Geometria*, Lezioni 1-4 (PDF `Lezioni_01-04.pdf`, Drive, letto per intero). Gli esercizi 2.4-3.8 sono del PDF; le soluzioni sono calcolate qui.
Nota: nell'estrazione del PDF molti segni "-" e simboli sono andati persi; quando un esercizio è ambiguo è segnalato.

## Mappa

---

- [1. Insiemi numerici e R](#1-insiemi-numerici-e-r)
- [2. Numeri complessi](#2-numeri-complessi)
- [3. Forma polare e radici](#3-forma-polare-e-radici)
- [4. Polinomi](#4-polinomi)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Insiemi numerici e R

La scala dei numeri parte da N = {0,1,2,...}, si completa con gli interi Z e con i razionali Q = {a/b | a,b∈Z, b≠0}, e arriva ai reali R. Le inclusioni sono strette: N⊊Z⊊Q⊊R. Il motivo per cui Q non basta è la mancanza di "completezza": R si costruisce come insieme delle classi di equivalenza di **successioni di Cauchy** razionali (due successioni sono equivalenti se la loro differenza tende a 0) ed è **completo**, cioè ogni successione di Cauchy converge, cosa che in Q non accade (an=(1+1/n)ⁿ è di Cauchy in Q ma il limite e è irrazionale).

Un esempio classico di numero non razionale è dato dalla **Prop 1.4**: √2 ∉ Q. Dimostrazione per assurdo: se √2=a/b con la frazione ridotta ai minimi termini, allora a²=2b², quindi a è pari, a=2k, da cui b²=2k² e anche b è pari: contraddizione, perché la frazione non sarebbe ridotta.

R è un **campo** (Prop 1.5, nove proprietà): addizione e moltiplicazione sono commutative e associative con neutri 0 e 1, ogni elemento ha l'opposto, ogni a≠0 ha l'inverso, e vale la distributività; inoltre R (come Q) è **ordinato**. Una nota di notazione: {1,2} è un insieme, (1,2) è un intervallo aperto oppure un punto di R², [1,2] un intervallo chiuso; per i vettori non si usano le graffe.

## 2. Numeri complessi

Poiché x²+1=0 non ha soluzioni reali, si ampliano i reali introducendo un numero i con la sola relazione **i² = -1**: i numeri complessi sono z = a+bi con a,b∈R, dove Re z = a e Im z = b. La somma è (a+bi)+(c+di) = (a+c)+(b+d)i e il prodotto (a+bi)(c+di) = (ac-bd)+(ad+bc)i; ad esempio (7+i)(4-i) = 29-3i. C è un **campo** (le stesse nove proprietà di R) ma **non è ordinato**: in un campo ordinato i² dovrebbe essere ≥0, mentre i²=-1.

Due operazioni caratteristiche sono il coniugio e il modulo. Il **coniugato** z̄ = a-bi è la riflessione rispetto all'asse reale, e z è reale ⇔ z = z̄. Il **modulo** è |z| = √(a²+b²) e vale **z·z̄ = |z|²**; da questa identità segue il metodo per invertire: per z≠0, **z⁻¹ = z̄/|z|²** (moltiplicare numeratore e denominatore per il coniugato). Esempi: (2+i)⁻¹ = (2-i)/5; i⁻¹ = -i. Valgono le proprietà (Es. 2.5):
- |z|=|z̄|;
- conj(z+w)=z̄+w̄;
- conj(zw)=z̄w̄;
- |z+w| ≤ |z|+|w| (triangolare);
- |zw|=|z||w|;
- |z⁻¹| = 1/|z|.

Geometricamente a+bi corrisponde al punto (a,b) del **piano complesso**: la somma è la regola del parallelogramma, l'asse reale è R e l'asse immaginario è {bi}.

**Insiemi nel piano** (Es. 2.6):
- A={Re z>Im z} è il semipiano sotto la bisettrice y=x (cioè x>y);
- C={|z-2|≤2} è il disco chiuso di centro 2 e raggio 2;
- B={z+z̄=i}: poiché z+z̄ = 2Re z è reale, non può valere i ⇒ insieme vuoto [enunciato da ricontrollare];
- z-z̄∈R ⇔ Im z = 0 ⇔ z reale.

## 3. Forma polare e radici

Le coordinate polari (r,θ) (con x=r cosθ, y=r sinθ, r=√(x²+y²)) danno una scrittura molto più comoda per moltiplicare: z = r(cosθ + i sinθ) = **r e^{iθ}**, dove e^{iθ} := cosθ + i sinθ è un simbolo che obbedisce alle proprietà dell'esponenziale, e^{i(θ+φ)} = e^{iθ}e^{iφ}, per le formule di addizione di seno e coseno. Qui r=|z| è il modulo e θ=arg z l'argomento, definito a meno di 2kπ: due numeri in forma polare sono uguali ⇔ stesso r e θ1 = θ0 + 2kπ.

La moltiplicazione diventa trasparente: **z1z2 = r1r2 e^{i(θ1+θ2)}**, cioè i moduli si moltiplicano e gli argomenti si sommano. Di conseguenza z⁻¹ = r⁻¹ e^{-iθ} e il coniugio corrisponde a θ↦-θ. I numeri e^{iθ} formano la circonferenza unitaria; si ritrova l'**identità di Eulero** e^{iπ} = -1, e^{2πi}=1.

La stessa idea risolve le equazioni z^n = z0. Se z0 = r0 e^{iθ0} ≠ 0, l'equazione ha **esattamente n soluzioni**, z_k = ⁿ√r0 · e^{i(θ0/n + 2kπ/n)} con k=0,...,n-1: stesso modulo e argomenti a passo 2π/n, quindi i vertici di un n-gono regolare di raggio ⁿ√r0 centrato nell'origine. Il caso z0=1 dà le **radici dell'unità**, z = e^{2kπi/n}.

**Esempi svolti**
1. z³ = -8: r=2, argomenti π/3, π, 5π/3 ⇒ z = 1+√3 i, -2, 1-√3 i (triangolo equilatero).
2. (1-i)³ in polare: 1-i = √2 e^{-iπ/4} ⇒ (1-i)³ = 2√2 e^{-3iπ/4} = -2-2i. Verifica cartesiana: (1-i)² = -2i, ×(1-i) = -2i+2i² = -2-2i ✓ (Es. 3.8).
3. z⁴ = i (Es. 3.5): |i|=1, arg=π/2 ⇒ z_k = e^{i(π/8 + kπ/2)}, k=0..3: 4 vertici di un quadrato inscritto nella circonferenza unitaria.
4. Coordinate polari (Es. 3.6): -3 = 3e^{iπ}; 1-i√3 = 2e^{-iπ/3}; (1+i)/√2 = e^{iπ/4}.

## 4. Polinomi

Un polinomio è somma di monomi; ne interessano il grado e la forma normale. Si indica con K[x] l'insieme dei polinomi in una variabile a coefficienti in K, e con K_k[x] quelli di grado ≤ k. Come per gli interi, c'è una divisione con resto: se K è un campo, per ogni p e d≠0 esistono unici q,r tali che p = q·d + r con deg r < deg d. Per esempio x³+1 = x·(x²-1) + (x+1). Si dice che d divide p se r=0 (ad esempio (x+1) | x³+1, perché x³+1 = (x²-x+1)(x+1)).

La divisione lega radici e fattori. Una **radice** di p è un a con p(a)=0, e la **Prop 4.2 (Ruffini)** afferma che a è radice di p ⇔ (x-a) | p(x). Dimostrazione: p = q(x-a)+r0, e sostituendo x=a si ottiene p(a)=r0. La **molteplicità** di a è il massimo k con (x-a)^k | p; per esempio x³-2x²+x = x(x-1)² ha la radice 0 di molteplicità 1 e la radice 1 di molteplicità 2. Da Ruffini, per induzione sul grado, segue il **Teo 4.6**: un polinomio di grado n≥1 ha al più n radici contate con molteplicità.

Nel grado 2 con Δ=b²-4ac:
- se Δ>0 ci sono due radici reali;
- se Δ=0 una radice doppia -b/2a;
- se Δ<0 nessuna radice reale.

Proprio questa mancanza giustifica l'introduzione dei complessi, sancita dal **teorema fondamentale dell'algebra (Teo 4.8)**: un polinomio a coefficienti complessi di grado n ha **esattamente n radici in C** contate con molteplicità (dimostrazione omessa). Esempi: x²+1 = 0 ⇒ ±i; x²+(1-i)x-i: Δ = (1-i)²+4i = 2i, √(2i) = ±(1+i) ⇒ x = i, -1.

Quando i coefficienti sono reali le radici complesse vengono a coppie (**Prop 4.11**): se p∈R[x] e z∈C è radice allora anche z̄ lo è. Dimostrazione: coniugando p(z)=0 e usando che i coefficienti sono reali si ottiene p(z̄)=0. Conseguenza: un polinomio reale di grado dispari ha almeno una radice reale.

Un'applicazione sono i codici correttori (Reed-Solomon): si inviano i coefficienti di un polinomio che si annulla in punti fissati, il che permette di rilevare e correggere errori. Esempio: parole (2,-7,8,-2,a,b) con s(1)=s(2)=0 ⇒ a+b=-1, 2a+b=-8 ⇒ a=-7, b=6.

---

## Cose da saper fare all'esame
- Operazioni, coniugio, modulo, inverso in C; parte reale e immaginaria di espressioni razionali in z (moltiplicare per il coniugato del denominatore).
- Passare da forma cartesiana a polare e viceversa; calcolare potenze (formula di De Moivre r^n e^{inθ}) e **tutte** le radici n-esime, disegnarle.
- Disegnare sottoinsiemi del piano complesso definiti da disuguaglianze/equazioni su Re, Im, |·|, arg.
- Dimostrare √2 irrazionale, Prop 4.2, Teo 4.6, Prop 4.11 e le proprietà di coniugio/modulo dell'Es. 2.5.
- Dividere polinomi, trovare radici (anche complesse) e molteplicità; fattorizzare in C[x] e in R[x] (fattori di grado ≤2).

## Dubbi
- La costruzione di R con le successioni di Cauchy è presentata in modo intuitivo: [DA VERIFICARE] se serve saperla all'esame o basta saper dire che R è completo.
- Alcuni esercizi (2.4 su parte reale/immaginaria, 2.7 verifica di radici) hanno segni persi nell'estrazione e non ho potuto riscriverli con certezza.
