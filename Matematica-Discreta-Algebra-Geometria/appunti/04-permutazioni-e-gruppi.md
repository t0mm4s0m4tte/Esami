# 04 - Permutazioni e gruppi (Matematica Discreta)

**Fonti e AVVERTENZA**
Nelle fonti leggibili compaiono solo: la definizione di **gruppo** e di **campo** (Buzano-Radeschi, Lezione 5), il simbolo S_n e il segno di una permutazione usato nella definizione del determinante (Lezione 9: "sgn(σ) = (-1)^k se σ è prodotto di k trasposizioni"), il concetto di operazione/neutro/inverso/potenze (Mori cap. 2).
I capitoli 5 (Permutazioni), 6 (Gruppi) di Mori **non erano leggibili** (estrazione troncata a metà cap. 4; Facchini è una scansione vuota). Tutto il resto è **teoria standard ricostruita [DA VERIFICARE su Mori cap. 5-6]**. Gli esempi sono calcolati e controllati con software.

## Mappa
1. Gruppo: definizione ed esempi (da Buzano + Mori cap. 2)
2. Permutazioni: notazione a due righe, cicli, prodotto, inversa [DA VERIFICARE]
3. Scambi/trasposizioni, segno, parità [DA VERIFICARE]
4. Ordine (periodo) di una permutazione [DA VERIFICARE]
5. Sottogruppi, Lagrange, ordine di un elemento [DA VERIFICARE]
6. Omomorfismi, nucleo e immagine [DA VERIFICARE]
7. Gruppi ciclici [DA VERIFICARE]

---

## 1. Gruppo

Un gruppo è la struttura algebrica più semplice in cui si può "fare e disfare": un'operazione associativa, con un elemento che non cambia nulla e la possibilità di tornare indietro. Formalmente (Buzano, Def 5.2) è un insieme G con operazione binaria * tale che:
1. esiste e∈G con e*a = a*e = a per ogni a (neutro);
2. a*(b*c) = (a*b)*c per ogni a,b,c (associatività);
3. per ogni a esiste a' con a*a' = a'*a = e (inverso).

Il gruppo è **commutativo (abeliano)** se vale anche a*b = b*a. Sono gruppi abeliani (Z,+), (Q,+), (R,+), (C,+) e (Q\{0},·), (R\{0},·), (C\{0},·). NON sono gruppi (N,+), perché manca l'opposto, e (Z\{0},·), perché manca l'inverso (2 non ne ha uno).

Dalle sole proprietà della definizione seguono che neutro e inversi sono unici (Mori Prop 2.29, 2.31), che (a*b)⁻¹ = b⁻¹*a⁻¹ e che le potenze a^n, per n∈Z, soddisfano a^(m+n)=a^m a^n (Mori Prop 2.33). Altri esempi fondamentali: (Z_n,+); (Z_n*,·); le biezioni di X con la composizione, cioè gli invertibili di F_X, che formano il **gruppo simmetrico**. In generale gli invertibili di un insieme con operazione associativa e neutro formano sempre un gruppo (Mori Prop 2.35).

Un **campo** (Buzano, Def 5.3) è un insieme (A,+,·) in cui (A,+) è un gruppo abeliano di neutro 0, (A\{0},·) è un gruppo abeliano di neutro 1, e vale la distributività. Sono campi Q, R, C, Z_p (p primo); Z non lo è.

## 2. Permutazioni [DA VERIFICARE]

Le permutazioni sono il caso concreto più importante di gruppo non commutativo. **S_n** è l'insieme delle biezioni σ: {1,...,n}→{1,...,n}; ha |S_n| = n! elementi (è il numero degli ordinamenti del file 02) e con la composizione è un gruppo con neutro id, **non abeliano per n ≥ 3**. Una permutazione si scrive con la notazione a due righe (i sopra, σ(i) sotto) oppure "a una riga" [σ(1) ... σ(n)], usata da Buzano per il determinante.

Il modo più efficiente di capire una permutazione è scomporla in cicli. Un **ciclo** (a1 a2 ... ak) manda a1→a2→...→ak→a1 lasciando fissi gli altri elementi (k è la lunghezza). Ogni permutazione è prodotto di cicli **disgiunti**, che commutano fra loro, in modo unico a meno dell'ordine; i punti fissi si omettono. Il prodotto di permutazioni è la composizione (convenzione adottata qui: si applica prima il fattore di destra, come g∘f; [DA VERIFICARE la convenzione del docente]). L'inversa si ottiene invertendo i cicli: (a1 ... ak)⁻¹ = (ak ... a1).

**Esempio svolto**: σ = [3 5 1 6 2 4] in S_6 (1→3, 2→5, 3→1, 4→6, 5→2, 6→4). Cicli: 1→3→1; 2→5→2; 4→6→4 ⇒ **σ = (1 3)(2 5)(4 6)**, prodotto di 3 trasposizioni disgiunte; σ² = id.

## 3. Scambi (trasposizioni) e segno [DA VERIFICARE, parzialmente confermato da Buzano Lez. 9]

Il mattone più piccolo è la **trasposizione** (a b), che scambia due elementi. Ogni permutazione è prodotto di trasposizioni: un k-ciclo si scrive (a1 a2)(a2 a3)...(a_{k-1} a_k) con convenzione fissata, quindi con **k-1 trasposizioni**. Il numero di trasposizioni non è unico, ma la sua parità sì: il **segno** sgn(σ) = (-1)^m, dove m è il numero di trasposizioni in una qualsiasi decomposizione, non dipende dalla decomposizione scelta. Le permutazioni pari hanno segno +1, le dispari -1. Un k-ciclo ha segno (-1)^(k-1); inoltre sgn(στ) = sgn(σ)sgn(τ), e le permutazioni pari formano il sottogruppo alterno A_n di ordine n!/2.

Il segno è il ponte con l'Algebra Lineare, perché compare nella definizione del determinante: det A = Σ_{σ∈S_n} sgn(σ) a_{1σ(1)}···a_{nσ(n)} (Buzano Def 9.1). Per n=2 le permutazioni sono id (segno +) e (1 2) (segno -), da cui ad-bc. Per n=3 le tre trasposizioni hanno segno - e le tre permutazioni "cicliche" (id inclusa) hanno segno +: [1 2 3], [2 3 1], [3 1 2] positive; [1 3 2], [3 2 1], [2 1 3] negative.

Esempi: σ = (1 3)(2 5)(4 6) ha 3 trasposizioni ⇒ sgn = -1. (0 1 2)(3 4) (in S_5 con elementi 0..4): 3-ciclo (pari, 2 trasposizioni) × trasposizione (1) ⇒ 3 trasposizioni ⇒ sgn = -1.

## 4. Periodo (ordine) [DA VERIFICARE]

L'ordine di σ, cioè il minimo m≥1 con σ^m = id, è il **mcm delle lunghezze dei cicli disgiunti**: ogni ciclo torna all'identità dopo un numero di passi pari alla sua lunghezza, e tutti insieme dopo il minimo comune multiplo. Esempio: (0 1 2)(3 4) ha ordine mcm(3,2) = 6; (1 3)(2 5)(4 6) ha ordine 2. In S_n l'ordine massimo si ottiene scegliendo cicli di lunghezze con mcm massimo (es. S_5: max = 6).

## 5. Sottogruppi, Lagrange [DA VERIFICARE]

Un **sottogruppo** H ≤ G è un sottoinsieme non vuoto chiuso per prodotto e inverso (equivalentemente: contiene e ed è chiuso per * e per inverso; oppure a*b⁻¹∈H per ogni a,b∈H). L'**ordine** |G| è il numero di elementi, e l'**ordine di un elemento** ord(a) è il minimo n≥1 con aⁿ=e, pari all'ordine del sottogruppo ciclico ⟨a⟩ = {aⁿ} generato da a.

Il risultato centrale è il **teorema di Lagrange**: se G è finito e H ≤ G allora |H| divide |G|. L'idea è che G è unione disgiunta di classi laterali aH, tutte di cardinalità |H|. Le conseguenze sono molte: ord(a) divide |G|; a^|G| = e; i gruppi di ordine primo sono ciclici; applicandolo a G=Z_n*, con |G|=φ(n), si ottiene **Eulero** a^φ(n)≡1, e con n=p si ottiene **Fermat**. Questo è il legame con il file 03.

## 6. Omomorfismi [DA VERIFICARE]

Un'applicazione f: G→G' è un **omomorfismo** se rispetta l'operazione, f(ab) = f(a)f(b); ne seguono f(e)=e' e f(a⁻¹)=f(a)⁻¹. Il **nucleo** Ker f = {g | f(g)=e'} è un sottogruppo di G e l'**immagine** Im f un sottogruppo di G'; f è iniettivo ⇔ Ker f = {e}. Un **isomorfismo** è un omomorfismo biettivo. Esempi: sgn: S_n→{±1} (nucleo A_n); Z→Z_n, k↦[k] (nucleo nZ); exp: (R,+)→(R>0,·). Il parallelo con l'Algebra Lineare è diretto: Ker e Im di un'applicazione lineare sono quelli di un omomorfismo dei gruppi additivi.

## 7. Gruppi ciclici [DA VERIFICARE]

Un gruppo G è **ciclico** se G = ⟨g⟩ per un opportuno g. Lo sono (Z,+) e (Z_n,+); in Z_n gli elementi [a] con MCD(a,n)=1 sono generatori, e sono φ(n). Ogni sottogruppo di un gruppo ciclico è ciclico, un gruppo ciclico di ordine n ha un unico sottogruppo per ogni divisore di n, e ogni gruppo ciclico di ordine n è isomorfo a (Z_n,+). Invece (Z_n*,·) non sempre è ciclico: lo è per n primo (es. Z_7* = ⟨3⟩ perché 3 ha ordine 6), ma Z_8* non lo è.

---

## Cose da saper fare all'esame
- Verificare gli assiomi di gruppo per un insieme con operazione (è anche il tipo "Es. 2.16": associatività, neutro, inversi), trovare l'inverso, stabilire se abeliano.
- Scrivere una permutazione in cicli disgiunti, calcolare prodotti, inversa, potenze, segno e ordine.
- Elencare i sottogruppi di un gruppo piccolo (Z_n, S_3), calcolare l'ordine di un elemento, applicare Lagrange.
- Verificare che una mappa è omomorfismo e calcolare Ker/Im.
- Applicare Eulero/Fermat con Lagrange (vedi file 03).

## Dubbi
- Convenzione del prodotto di permutazioni (destra-sinistra o sinistra-destra) e notazione usata dal docente.
- Quanto di gruppi (sottogruppi normali, quozienti, Cayley) è effettivamente in programma: il programma ufficiale (doc "Argomenti dei Corsi - I Anno") non elenca la parte di Discreta; ricontrollare il syllabus Moodle.
