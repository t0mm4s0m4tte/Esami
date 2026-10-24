# Flashcard - Matematica Discreta e Algebra e Geometria

Formato: D = domanda, R = risposta. Una carta per blocco. Tag nelle risposte: [DA VERIFICARE] = punto non confermato dalle fonti o dal programma; [ASSUNZIONE: da verificare] = affermazione senza fonte (dispense, libro, web) letta e confermata, da controllare; [INT] = ricavato da me con i metodi del corso, non scritto nelle lezioni. Basate sugli appunti 01-15 (calcoli ricontrollati con sympy).

## 01 - Insiemi, funzioni, induzione

D: Come si dimostra che due insiemi A e B coincidono? Perché si usa quasi sempre questo metodo?
R: Doppia inclusione: A = B <=> A ⊆ B e B ⊆ A. Si prende un elemento generico di uno e si mostra che sta nell'altro, e viceversa.

D: Nega: "per ogni x in A vale P(x)" e "esiste x in A con P(x)".
R: Non(per ogni x, P(x)) <=> esiste x in A con non-P(x). Non(esiste x, P(x)) <=> per ogni x in A vale non-P(x).

D: Differenza fra ∅ e {∅}? Quanti elementi ha P(∅) e quanti P({a,b,c})?
R: ∅ non ha elementi; {∅} ne ha uno (l'insieme vuoto). P(∅) = {∅} ha 1 elemento, P({a,b,c}) ne ha 8 (∅, 3 singoletti, 3 coppie, A).

D: Dimostra per induzione che |A| = n implica |P(A)| = $2^n$.
R: Base n=0: P(∅) = {∅} ha 1 = $2^0$ elemento. Passo: A = {a1..$a_{n+1}$}; i sottoinsiemi senza $a_{n+1}$ sono i sottoinsiemi di {a1..an}, $2^n$ per ipotesi induttiva; quelli con $a_{n+1}$ sono in biezione con i primi (si aggiunge/toglie $a_{n+1}$), altri $2^n$. Totale 2·$2^n$ = $2^{n+1}$.

D: Enuncia il principio di induzione (ipotesi!) e dimostra il passo per $\sum _{k=1}^n$ $k^{2}$ = n(n+1)(2n+1)/6.
R: Se P(0) è vera e per ogni n P(n) => P(n+1), allora P vale per ogni n (si può partire da n0 qualsiasi). Passo: n(n+1)(2n+1)/6 + (n+1)^{2} = (n+1)(2n^{2}+7n+6)/6 = (n+1)(n+2)(2n+3)/6. Base n=1: 1 = 1·2·3/6.

D: V/F: "$2^n$ > $n^{2}$ per ogni n >= 1".
R: Falso. Per n=2 (4>4), n=3 (8>9), n=4 (16>16) non vale. Vale per n >= 5 e l'induzione parte da n=5 (stessa cosa per $n^{2}$ > 2n+1, che vale per n >= 3).

D: Ricoprimento vs partizione. R = ∪[n,n+1] è una partizione di R?
R: Ricoprimento: unione = X. Partizione: ricoprimento con pezzi non vuoti e a due a due disgiunti. Gli intervalli [n,n+1] si toccano negli estremi, quindi è un ricoprimento ma NON una partizione.

D: Cos'è il problema della buona definizione per una funzione sull'insieme quoziente? Esempio di fallimento.
R: Definendo f([x]) tramite un rappresentante x bisogna verificare che il valore non dipenda dalla scelta. Funziona f([x]) = (-1)^x su pari/dispari. Fallisce sulla partizione di N per numero di cifre con f($E_n$) = [2x]: 4 e 7 stanno in E1 ma [8]=E1 e [14]=E2.

D: Definizione di funzione. Perché 1/x è una funzione R\{0} -> R ma non R -> R?
R: Terna (A,B,Γ), Γ ⊆ A×B, tale che per ogni a in A esista un unico b con (a,b) in Γ. Dominio e codominio fanno parte della funzione: in 0 la regola 1/x non assegna alcun valore.

D: Criterio per iniettività/suriettività con le controimmagini dei punti.
R: f suriettiva <=> |$f^{-1}$(b)| >= 1 per ogni b; f iniettiva <=> |$f^{-1}$(b)| <= 1 per ogni b. (Es. $x^{2}$ su R: $f^{-1}$(-1) = ∅ e $f^{-1}$(1) ha 2 elementi.)

D: f: Z->Z, f(n) = 2n+1 è iniettiva? suriettiva?
R: Iniettiva (2m+1 = 2n+1 => m = n), non suriettiva perché Im f = 2Z+1 ≠ Z.

D: g∘f iniettiva => cosa si può dire di f e g? E se g∘f è suriettiva?
R: g∘f iniettiva => f iniettiva. g∘f suriettiva => g suriettiva. Non si può dire che g sia iniettiva: f: {1}->{1,2}, g: {1,2}->{1} costante, g∘f è iniettiva ma g no.

D: Quando f ammette inversa? Formula per (g∘f)^{-1} e perché l'ordine si inverte.
R: f ha inversa <=> f è biettiva, e l'inversa è unica. (g∘f)^{-1} = $f^{-1}$∘$g^{-1}$: per disfare "prima f poi g" bisogna disfare prima g.

D: Dimostra l'unicità dell'elemento neutro e dell'inverso (operazione associativa).
R: Neutro: e = e*e' = e' (e neutro, e' neutro). Inverso: se b e b' inversi di a, b = b*e = b*(a*b') = (b*a)*b' = e*b' = b'.

D: Invertibili in (Z,·), (N,+), ($F_X$,∘), (P(X),∩), (P(X),∪).
R: (Z,·): solo ±1. (N,+): solo 0. ($F_X$,∘): le funzioni biettive. (P(X),∩): solo X. (P(X),∪): solo ∅.

D: f(x) = $x^{2}$+2x: come renderla biettiva e qual è l'inversa?
R: Dominio [-1,∞) e codominio [-1,∞): f(x)+1 = (x+1)^{2}. Inversa $f^{-1}$(y) = -1 + √(y+1).

D: Operazione m*n = m+n+1 su N: associativa? commutativa? neutro? [INT]
R: Associativa ((m*n)*p = m+n+p+2 = m*(n*p)) e commutativa. Il neutro e dovrebbe soddisfare m+e+1 = m, cioè e = -1 ∉ N: in N non c'è neutro (in Z sì, e = -1).

## 02 - Cardinalità e combinatorica

D: Quando due insiemi sono equipollenti? Esempi sorprendenti.
R: Se esiste una biezione A -> B. Così N ≈ 2N (n -> 2n), Z ≈ N (0,1,-1,2,-2,...), N×N ≈ N, Q ≈ N.

D: Enuncia Schröder-Bernstein e dà la definizione di |A| <= |B|.
R: |A| <= |B| se esiste una funzione iniettiva A -> B (equivalente: suriettiva B -> A). Schröder-Bernstein: |A| <= |B| e |B| <= |A| => |A| = |B| (enunciato senza dimostrazione negli appunti).

D: Definizione di insieme finito e infinito senza usare i numeri.
R: A è infinito se esiste f: A->A iniettiva non suriettiva (equipollente a un sottoinsieme proprio); finito se ogni f: A->A iniettiva è biettiva. Per A finito: iniettiva <=> suriettiva <=> biettiva.

D: Principio dei cassetti: enunciato e applicazione a 10001 smartphone con PIN a 4 cifre.
R: Se |A| > |B| non esiste f: A->B iniettiva. I PIN sono $10^4$ = 10000 < 10001 smartphone, quindi due hanno lo stesso PIN.

D: Formula di inclusione-esclusione per 2 e 3 insiemi.
R: |A∪B| = |A|+|B|-|A∩B|. |A∪B∪C| = |A|+|B|+|C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|.

D: Quanti n <= 180 non sono divisibili né per 3 né per 5?
R: |D3|=60, |D5|=36, |D15|=12, |D3∪D5| = 60+36-12 = 84. Risposta 180-84 = 96.

D: Quanti n in [1,660] sono divisibili per 5, 6 o 11?
R: 132+110+60 - 22 (D30) - 12 (D55) - 10 (D66) + 2 (D330) = 260. (I divisibili per a e b sono i divisibili per mcm(a,b).)

D: 129 biglietti venduti; spettatori dei film 109, 76, 55; film 1∩2 = 52, 2∩3 = 44, 1∩3 = 28. Quanti hanno visto tutti e tre?
R: Inclusione-esclusione al contrario: 129 = 109+76+55-52-44-28+x = 116+x, quindi x = 13 (calcolo verificato; Mori, cap. 3, Esercizi es. 1, riporta invece 23: incoerenza nel testo di Mori, fonte: Mori; gli appunti 02 riportano 13).

D: Metodo delle scelte successive: quando si moltiplica e quando si somma?
R: Se la situazione richiede k scelte successive con $n_i$ possibilità ciascuna, gli esiti sono n1·...·nk (Prop 3.16). Se i casi sono alternativi (si escludono a vicenda) si sommano. Es. PIN a 4 cifre: $10^4$.

D: Quante sono le funzioni A -> B con |A| = m, |B| = n? Quante le iniettive?
R: $n^m$ (per ogni elemento di A si sceglie l'immagine fra n). Le iniettive (se m <= n) sono n!/(n-m)!, zero se m > n.

D: Anagrammi di MATEMATICA.
R: 10!/(3!·2!·2!) = 151200 (A×3, M×2, T×2). Formula generale n!/(r1!···rk!).

D: Differenza fra disposizioni con e senza ripetizione; podio con 12 atleti.
R: Con ripetizione di ordine k su n elementi: $n^k$. Semplici: n!/(n-k)! (0 se k>n). Podio: 12·11·10 = 1320.

D: Definisci C(n,k) e dimostra la simmetria C(n,k) = C(n,n-k). Calcola C(100,96).
R: C(n,k) = n!/(k!(n-k)!) = numero dei sottoinsiemi di k elementi. Il passaggio al complementare è una biezione fra sottoinsiemi di k e di n-k elementi. C(100,96) = C(100,4) = 3921225.

D: Dimostra la formula di Stiefel C(n,k) = C(n-1,k) + C(n-1,k-1).
R: Si fissa a in A. I sottoinsiemi di k elementi o contengono a (C(n-1,k-1) modi) o non lo contengono (C(n-1,k) modi).

D: Perché $\sum _{k=0}^n$ C(n,k) = $2^n$? Quanto fanno le somme sui k pari e dispari?
R: Newton con x=y=1 (o conteggio di |P(A)| per cardinalità). Con x=1,y=-1 si ha 0 per n >= 1, quindi Σ_pari = Σ_dispari = $2^{n-1}$.

D: Combinazioni con ripetizione: formula e idea della dimostrazione. Monomi di grado 9 in 4 variabili.
R: C(n+k-1,k) (stelle e barre: k caselle e n-1 separatori in k+n-1 posizioni). Monomi: n=4, k=9: C(12,3) = 220.

D: 12 rose di 5 colori, tutti presenti: quante scelte?
R: Si assegna una rosa per colore e si distribuiscono le 7 rimaste: C(7+5-1,7) = C(11,7) = 330.

D: Quante rose servono per essere sicuri di averne almeno 5 dello stesso colore (5 colori)?
R: Principio dei cassetti: 5·4+1 = 21.

D: Tabella: ordine/ripetizioni -> formula.
R: Ordine sì, tutti gli n: n!. Ordine sì, k su n, no rip.: n!/(n-k)!. Ordine sì, rip.: $n^k$. Ordine no, no rip.: C(n,k). Ordine no, rip.: C(n+k-1,k). Anagrammi con ripetizioni: n!/(r1!···rk!).

D: 5 ballerini su 9 e 3 ballerine su 11: quante squadre?
R: C(9,5)·C(11,3) = 126·165 = 20790 (calcolo verificato). (Mori, cap. 3 es. 1, scrive C(9,5)=C(9,4)=84 e 13860 = 84·165, ma C(9,5)=126 e 84 = C(9,3): errore nel testo, fonte: Mori.)

D: Sei amici in fila: quanti modi se Bruno e Daniele devono stare vicini?
R: Si tratta la coppia come un blocco: 5! ordinamenti dei blocchi per 2 ordini interni = 240.

## 03 - Interi e aritmetica modulare
Nota: tutta la teoria oltre il §1 è ricostruita come teoria standard dagli appunti [ASSUNZIONE: da verificare su Mori cap. 4/7] (Mori è leggibile solo fino alla Def 4.3, Facchini è una scansione senza testo); gli esempi numerici sono calcolo verificato.

D: Definizione di divisibilità e casi limite (0, ±1). Invertibili in (Z,·).
R: a | b se esiste k in Z con b = ka. Ogni n divide 0; 0 divide solo 0; ±1 dividono tutto e sono gli unici invertibili di (Z,·).

D: Prop 4.2: come si comporta la divisibilità rispetto alla somma s = a+b?
R: Un divisore comune di a e b divide s; un divisore di s e di uno degli addendi divide anche l'altro (b = s-a).

D: Definizione di irriducibile e relazione con "primo".
R: n ∉ {0,±1} è irriducibile se n = ab implica a o b invertibile (±1). Primo: n | ab => n | a o n | b. In Z le due nozioni sono equivalenti. [DA VERIFICARE la definizione di "primo" usata da Mori]

D: Enuncia la divisione euclidea e la relazione fra MCD e mcm. [ASSUNZIONE: da verificare]
R: Per a in Z e b > 0 esistono unici q, r con a = bq+r e 0 <= r < b. MCD(a,b)·mcm(a,b) = |ab|.

D: Calcola MCD(252,198) con Euclide e scrivi Bézout.
R: 252 = 1·198+54; 198 = 3·54+36; 54 = 1·36+18; 36 = 2·18. MCD = 18 = 4·252 - 5·198 (calcolo verificato). [ASSUNZIONE: da verificare]

D: Enuncia l'identità di Bézout e il criterio di coprimalità. Qual è il lemma "a | bc"?
R: Esistono x,y in Z con ax+by = MCD(a,b). a,b coprimi <=> esistono x,y con ax+by = 1. Se a | bc e MCD(a,b) = 1 allora a | c; se p primo e p | ab allora p | a o p | b. [ASSUNZIONE: da verificare]

D: Cos'è la congruenza mod n e perché le operazioni su $Z_n$ sono ben definite?
R: a ≡ b (mod n) <=> n | a-b (stesso resto). Se a ≡ a' e b ≡ b' allora a+b ≡ a'+b' e ab ≡ a'b', quindi [a]+[b] = [a+b] e [a][b] = [ab] non dipendono dai rappresentanti. [ASSUNZIONE: da verificare]

D: Quando $Z_n$ è un campo? Esempio di zero divisori.
R: $Z_n$ è campo <=> n primo. Per n composto manca la legge di annullamento: in $Z_6$, 2·3 = 0. [ASSUNZIONE: da verificare]

D: Quando [a] è invertibile in $Z_n$? Calcola $7^{-1}$ mod 26.
R: [a] invertibile <=> MCD(a,n) = 1; l'inverso si trova con Bézout (ax+ny = 1 => $a^{-1}$ = x). 7·15 = 105 = 4·26+1, quindi $7^{-1}$ ≡ 15 (mod 26). (calcolo verificato) [ASSUNZIONE: da verificare]

D: Definisci φ(n) e calcola φ(12), φ(36), φ(360).
R: φ(n) = numero dei k in [1,n] coprimi con n = |$Z_n^{*}$|. φ(p) = p-1, φ($p^k$) = $p^k$ - $p^{k-1}$, moltiplicativa su coprimi. φ(12)=4, φ(36)=12, φ(360)=96. (calcolo verificato) [ASSUNZIONE: da verificare]

D: Enuncia Eulero e Fermat con le ipotesi.
R: Eulero: se MCD(a,n) = 1 allora $a^{\varphi (n)}$ ≡ 1 (mod n). Fermat: se p è primo e p ∤ a, $a^{p-1}$ ≡ 1 (mod p) (e $a^p$ ≡ a per ogni a). Entrambi seguono da Lagrange su $Z_n^{*}$. (fonte parziale: Mori, Introduzione: il teorema di Eulero è dimostrato con una proprietà dei gruppi del cap. 6, cioè Lagrange; enunciato esatto non leggibile) [ASSUNZIONE: da verificare]

D: Calcola $3^{100}$ mod 7.
R: $3^6$ ≡ 1 (Fermat), 100 = 96+4, quindi $3^{100}$ ≡ $3^4$ = 81 ≡ 4 (mod 7).

D: Calcola 2^1000 mod 13 e $7^{222}$ mod 10.
R: $2^{12}$ ≡ 1 mod 13, 1000 = 12·83+4, quindi $2^4$ = 16 ≡ 3. Per $7^{222}$ mod 10: φ(10) = 4, 222 = 4·55+2, quindi $7^{2}$ = 49 ≡ 9.

D: Quando ax ≡ b (mod n) ha soluzioni e quante? Risolvi 14x ≡ 21 (mod 35).
R: Ha soluzioni <=> d = MCD(a,n) divide b, e ne ha d modulo n. Qui d=7 | 21: 2x ≡ 3 (mod 5) => x ≡ 4 (mod 5) => x in {4,9,14,19,24,29,34}. (calcolo verificato) [ASSUNZIONE: da verificare]

D: Risolvi 4x ≡ 6 (mod 26) e 6x ≡ 4 (mod 9).
R: Prima: d=2 | 6, 2x ≡ 3 (mod 13) => x ≡ 8 (mod 13) => x in {8, 21}. Seconda: d = 3 non divide 4, nessuna soluzione. (calcolo verificato) [ASSUNZIONE: da verificare]

D: Enuncia il teorema cinese dei resti e risolvi x≡2 (3), x≡3 (5), x≡2 (7).
R: Se m1..mk sono a due a due coprimi, il sistema x ≡ $a_i$ (mod $m_i$) ha soluzione unica mod m1···mk. Qui x ≡ 23 (mod 105). (calcolo verificato) [ASSUNZIONE: da verificare]

D: $Z_7^{*}$ è ciclico? Perché?
R: Sì: le potenze di 3 mod 7 sono 3,2,6,4,5,1, quindi 3 ha ordine 6 = φ(7) e $Z_7^{*}$ = ⟨3⟩. (calcolo verificato) [ASSUNZIONE: da verificare]

## 04 - Permutazioni e gruppi
Nota: oltre la definizione di gruppo/campo (Buzano) il materiale è teoria standard ricostruita [ASSUNZIONE: da verificare su Mori cap. 5-6] (testo non leggibile su Drive).

D: Definizione di gruppo e di gruppo abeliano. Esempi di non-gruppi.
R: (G,*) con associatività, neutro e, inverso per ogni elemento; abeliano se vale anche a*b = b*a. Non sono gruppi (N,+) (manca l'opposto) e (Z\{0},·) (2 non ha inverso).

D: Definizione di campo. Z è un campo? E $Z_p$?
R: (A,+,·) con (A,+) gruppo abeliano di neutro 0, (A\{0},·) gruppo abeliano di neutro 1 e distributività. Z non è un campo; Q, R, C e $Z_p$ (p primo) sì.

D: Quanti elementi ha $S_n$? È abeliano?
R: n! elementi (biezioni di {1..n}); è un gruppo con la composizione, non abeliano per n >= 3. [ASSUNZIONE: da verificare]

D: Scrivi σ = [3 5 1 6 2 4] in cicli, trova il segno e l'ordine.
R: 1->3->1, 2->5->2, 4->6->4, quindi σ = (1 3)(2 5)(4 6), 3 trasposizioni: segno -1; ordine 2 (σ^{2} = id). (calcolo verificato) [ASSUNZIONE: da verificare]

D: Ordine e segno di (0 1 2)(3 4) in $S_5$.
R: Ordine = mcm(3,2) = 6. Un k-ciclo ha segno (-1)^{k-1}: 3-ciclo +1, trasposizione -1, totale segno -1. (calcolo verificato) [ASSUNZIONE: da verificare]

D: Perché il segno è ben definito? Segno di un k-ciclo e ordine di $A_n$.
R: La decomposizione in trasposizioni non è unica, ma la parità del numero sì, quindi sgn(σ) = (-1)^m; sgn(στ) = sgn(σ)sgn(τ). Un k-ciclo ha segno (-1)^{k-1}. $A_n$ (permutazioni pari) ha ordine n!/2. Il segno compare nella definizione del determinante (fonte per questo legame e per sgn=(-1)^k: Buzano, Lezioni_08-10.pdf, Def 9.1); il resto della scheda [ASSUNZIONE: da verificare]

D: Calcola il prodotto (1 2)(1 3) in $S_3$ con la convenzione "si applica prima il fattore di destra". [INT]
R: 1->3->3, 3->1->2, 2->2->1: risulta (1 3 2). Con la convenzione opposta si otterrebbe (1 2 3): la convenzione del docente va verificata. [DA VERIFICARE]

D: Teorema di Lagrange: enunciato, ipotesi e conseguenze.
R: Se G è finito e H ≤ G allora |H| divide |G| (G è unione disgiunta di classi laterali aH tutte di cardinalità |H|). Conseguenze: ord(a) | |G|; $a^{\vert G\vert }$ = e; i gruppi di ordine primo sono ciclici; con G = $Z_n^{*}$ si ottengono Eulero e Fermat. [ASSUNZIONE: da verificare]

D: Criterio per un sottogruppo e definizione di ordine di un elemento.
R: H ≤ G se H ≠ ∅ e a*$b^{-1}$ ∈ H per ogni a,b in H (o: chiuso per prodotto e inverso). ord(a) = minimo n >= 1 con $a^n$ = e = |⟨a⟩|. [ASSUNZIONE: da verificare]

D: Omomorfismo di gruppi: definizione e criterio di iniettività.
R: f(ab) = f(a)f(b); ne seguono f(e) = e' e f($a^{-1}$) = f(a)^{-1}. Ker f = {g | f(g) = e'} è sottogruppo e f è iniettivo <=> Ker f = {e}. Esempio: sgn: $S_n$ -> {±1} con nucleo $A_n$. [ASSUNZIONE: da verificare]

D: V/F: "$Z_n^{*}$ è sempre ciclico".
R: Falso: lo è per n primo ($Z_7^{*}$ = ⟨3⟩) ma $Z_8^{*}$ non lo è. Invece ($Z_n$,+) è sempre ciclico, generato da [1], con φ(n) generatori. (calcolo verificato) [ASSUNZIONE: da verificare]

## 05 - Numeri complessi e polinomi

D: Dimostra che √2 non è razionale.
R: Per assurdo √2 = a/b ridotta ai minimi termini: $a^{2}$ = 2b^{2}, quindi a pari, a = 2k, $b^{2}$ = 2k^{2}, quindi anche b è pari: contraddizione.

D: C è un campo ordinato? Perché?
R: C è un campo ma non è ordinato: in un campo ordinato $i^{2}$ dovrebbe essere >= 0, mentre $i^{2}$ = -1.

D: Come si inverte z ≠ 0? Calcola (2+i)^{-1}.
R: z·z̄ = |z|^{2}, quindi $z^{-1}$ = z̄/|z|^{2}. (2+i)^{-1} = (2-i)/5.

D: Calcola (7+i)(4-i).
R: (ac-bd) + (ad+bc)i = (28+1) + (-7+4)i = 29 - 3i.

D: Proprietà di coniugio e modulo da saper dimostrare.
R: |z| = |z̄|, conj(z+w) = z̄+w̄, conj(zw) = z̄w̄, |zw| = |z||w|, |$z^{-1}$| = 1/|z|, |z+w| <= |z|+|w|. z è reale <=> z = z̄.

D: Forma polare di 1 - i√3 e di -3.
R: |1-i√3| = 2, arg = -π/3: 2e^{-iπ/3}. -3 = 3e^{iπ}.

D: Come si moltiplicano due complessi in forma polare? Calcola (1-i)^3.
R: z1z2 = r1r2 $e^{i(\theta 1+\theta 2)}$ (moduli si moltiplicano, argomenti si sommano). 1-i = √2 $e^{-i\pi /4}$, quindi (1-i)^3 = 2√2 $e^{-3i\pi /4}$ = -2-2i.

D: Quante soluzioni ha $z^n$ = z0 (z0 ≠ 0) e come sono disposte?
R: Esattamente n: $z_k$ = ^{n}√r0 $e^{i(\theta 0/n + 2k\pi /n)}$, k=0..n-1, vertici di un n-gono regolare di raggio ^{n}√r0 centrato nell'origine.

D: Risolvi $z^3$ = -8 e $z^4$ = i.
R: $z^3$ = -8: r=2, argomenti π/3, π, 5π/3: z = 1+√3 i, -2, 1-√3 i. $z^4$ = i: $z_k$ = $e^{i(\pi /8+k\pi /2)}$, k=0..3 (quattro vertici di un quadrato inscritto nel cerchio unitario).

D: Teorema di Ruffini (Prop 4.2): enunciato e dimostrazione.
R: a è radice di p <=> (x-a) | p. Dim.: p = q(x-a)+r0 e sostituendo x=a si ottiene p(a) = r0.

D: Quante radici ha al più un polinomio di grado n? E nel caso complesso?
R: Al più n radici contate con molteplicità (Teo 4.6, per induzione da Ruffini). Su C (teorema fondamentale dell'algebra) ha esattamente n radici con molteplicità.

D: Se p ∈ R[x] e z ∈ C è radice, cosa si può dire di z̄? Conseguenza per i gradi dispari.
R: Anche z̄ è radice (si coniuga p(z)=0 usando coefficienti reali). Un polinomio reale di grado dispari ha almeno una radice reale.

D: Risolvi $x^{2}$+(1-i)x-i = 0.
R: Δ = (1-i)^{2}+4i = 2i, √(2i) = ±(1+i), quindi x = i oppure x = -1.

D: Dividi $x^{3}$+1 per $x^{2}$-1 e fattorizza $x^{3}$+1.
R: $x^{3}$+1 = x($x^{2}$-1) + (x+1), resto x+1. Ruffini: $x^{3}$+1 = (x+1)($x^{2}$-x+1).

D: V/F: "un polinomio reale di grado 4 può avere esattamente una radice non reale".
R: Falso: le radici non reali di un polinomio reale vengono a coppie coniugate (con molteplicità), quindi il numero di radici non reali è pari.

D: Descrivi nel piano complesso {Re z > Im z}, {|z-2| <= 2}, {z + z̄ = i}.
R: Semipiano x > y; disco chiuso di centro 2 e raggio 2; z + z̄ = 2Re z è reale, non può valere i: insieme vuoto [enunciato da ricontrollare negli appunti].

## 06 - Spazi vettoriali

D: Assiomi di spazio vettoriale su K.
R: (V,+) gruppo commutativo con neutro $0_V$; λ(v+w) = λv+λw; (λ+μ)v = λv+μv; (λμ)v = λ(μv); 1v = v.

D: Dimostra 0·v = $0_V$ dagli assiomi.
R: 0v = (0+0)v = 0v+0v; sommando l'opposto di 0v si ottiene 0v = $0_V$.

D: Definizione di sottospazio e test rapido per sottoinsiemi definiti da equazioni.
R: W ⊆ V sottospazio se 0 ∈ W, v+v' ∈ W, λv ∈ W. Un sottoinsieme definito da equazioni lineari omogenee è un sottospazio; se l'equazione non è omogenea (es. x+y-z=1) non contiene 0 e non lo è.

D: I polinomi di grado esattamente k formano un sottospazio di K[x]? E quelli di grado <= k?
R: Esattamente k (k >= 1): no (manca lo 0 e la somma può abbassare il grado). Grado <= k: sì, $K_k$[x] ha dimensione k+1.

D: Dimostra che Span(v1..vk) è un sottospazio.
R: Contiene 0 (tutti i λ nulli); (Σλ_iv_i)+(Σμ_iv_i) = Σ(λ_i+μ_i)$v_i$ e c(Σλ_iv_i) = Σ(cλ_i)$v_i$ sono ancora combinazioni lineari.

D: Definizione di vettori indipendenti. Quando due vettori sono dipendenti?
R: v1..vk indipendenti se Σλ_iv_i = 0 implica tutti i λ_i = 0. Un vettore è dipendente <=> v = 0; due vettori <=> sono multipli.

D: V/F: tre vettori a coppie indipendenti sono indipendenti.
R: Falso: v1=(1,1,0), v2=(0,1,1), v3=(1,0,-1) sono a coppie indipendenti ma v1-v2-v3 = 0.

D: Cos'è una base? Perché la dimensione è ben definita? Dimensioni di $K^{n}$, $K_n$[x], M(m,n).
R: Insieme di vettori indipendenti e generatori. Due basi di V hanno lo stesso numero di elementi (Teo 7.10). dim $K^{n}$ = n, dim $K_n$[x] = n+1, dim M(m,n) = mn, dim K[x] = ∞.

D: Se dim V = n, cosa basta per avere una base? E più o meno di n vettori?
R: n vettori sono base <=> indipendenti <=> generano (Teo 7.12). Più di n vettori sono sempre dipendenti, meno di n non generano.

D: Perché le coordinate di v in una base sono uniche?
R: Se Σλ_iv_i = Σμ_iv_i la differenza dà una combinazione nulla Σ(λ_i-μ_i)$v_i$ = 0, quindi per indipendenza λ_i = μ_i.

D: Coordinate di v = (2,3,3) nella base B = {(1,0,2),(1,1,2),(1,2,1)}.
R: Si risolve λ1(1,0,2)+λ2(1,1,2)+λ3(1,2,1) = (2,3,3): λ3 = 1, λ2 = 1, λ1 = 0. [v]_B = (0,1,1) (verifica: (1,1,2)+(1,2,1) = (2,3,3)).

D: U = ⟨(1,0,1),(1,1,1)⟩, V = ⟨(0,1,2),(0,1,1)⟩: dim(U∩V)? (formula di Grassmann: fonte: Slide MANNO, Lezione18_Alg.pdf)
R: dim U = dim V = 2, dim(U+V) = rango delle quattro colonne = 3. Grassmann: dim(U∩V) = 2+2-3 = 1. La formula dim(U+W) = dim U + dim W - dim(U∩W) è usata nei compiti ma non è nelle lezioni estratte.

## 07 - Matrici e determinante

D: Come si trasforma la trasposta di un prodotto? Quando è definito AB?
R: ᵗ(AB) = ᵗB ᵗA (ordine invertito). AB è definito se il numero di colonne di A è uguale al numero di righe di B: A m×n, B n×p => AB m×p.

D: Il prodotto di matrici è commutativo? Controesempio.
R: No. A = [[1,0],[0,0]], B = [[0,1],[0,0]]: AB = B, BA = 0.

D: Interpreta Ax come combinazione lineare. Perché il prodotto riga per colonna rappresenta la composizione?
R: Ax = x1A^{1}+...+xnA^{n} (combinazione delle colonne di A con coefficienti $x_i$). Per questo $L_A$∘$L_B$ = $L_{AB}$.

D: Dimostra o enuncia tr(AB) = tr(BA). Esempio con taglie diverse.
R: tr(AB) = $\sum _i\sum _j$ $A_{ij}$ $B_{ji}$ è simmetrica nei due fattori; vale anche con AB e BA di taglie diverse. Es. A 3×2 = [[1,2],[3,4],[5,6]], B 2×3 = [[1,2,3],[4,5,6]]: tr(AB) = 9+26+51 = 86 = 22+64 = tr(BA).

D: Definizione di rango. Qual è il legame col rango della trasposta? E rk(A·ᵗA)?
R: rk A = dim Span(colonne) = numero di pivot; rk(ᵗA) = rk(A) (Prop 8.6). Per A reale vale rk(A·ᵗA) = rk(A) (usato nei quiz) [ASSUNZIONE: da verificare] (nessuna fonte trovata su Drive; ragionamento proprio: ‖ᵗAx‖^{2} = ᵗx·A·ᵗA·x, quindi Ker(A·ᵗA) = Ker(ᵗA)).

D: Definizione del determinante e determinanti di triangolari.
R: det A = $\sum _{\sigma \in S_n}$ sgn(σ) $a_{1\sigma (1)}$···$a_{n\sigma (n)}$: n! addendi, uno per riga e colonna. Per le triangolari (e diagonali) è il prodotto degli elementi diagonali; det I = 1; det ᵗA = det A.

D: Come cambia il determinante con le mosse di Gauss? Quanto vale det(cA)?
R: Scambio di due righe: cambia segno. Riga per c: det per c. Riga + multiplo di un'altra: invariato. Quindi det(cA) = $c^{n}$ det A.

D: Enuncia Binet e le conseguenze su inverse e prodotti.
R: det(AB) = det A·det B (senza dimostrazione). Segue det($A^{-1}$) = 1/det A.

D: Elenca le condizioni equivalenti a det A = 0.
R: Una riga (colonna) è combinazione lineare delle altre <=> colonne dipendenti <=> rk A < n <=> Ax = 0 ha soluzioni non banali <=> 0 è autovalore <=> A non è invertibile.

D: Calcola det [[1,2,3],[4,5,6],[7,8,9]] e det [[1,2,3],[4,5,6],[7,8,10]].
R: Primo: R2-R1... si ottiene una riga nulla: det = 0 (rango 2, nucleo ⟨(1,-2,1)⟩). Secondo: det = -3 (rango 3).

D: Calcola con Laplace det [[2,0,1],[3,1,4],[0,0,5]].
R: Sviluppo sulla terza riga: 5·(+1)·det[[2,0],[3,1]] = 5·2 = 10.

D: Quando A è invertibile e formula dell'inversa con i cofattori? Calcola l'inversa di [[2,1],[5,3]].
R: A invertibile <=> det A ≠ 0, $A^{-1}$ = (1/det A)·ᵗcof(A). Per [[2,1],[5,3]]: det = 1, inversa [[3,-1],[-5,2]].

D: Dimostra che A·ᵗcof(A) = det(A)·I (idea) e perché serve.
R: Sviluppando lungo la riga i si ha det A = $\sum _j$ $a_{ij}$ cof_ij (diagonale); moltiplicando una riga per i cofattori di un'altra si ottiene lo sviluppo di una matrice con due righe uguali, quindi 0 (fuori diagonale). Da qui la formula dell'inversa (Prop 10.7-10.8).

D: $A_k$ = [[k,2],[3,k-1]]: per quali k è invertibile e qual è $A_k^{-1}$?
R: det = $k^{2}$-k-6 = (k-3)(k+2): invertibile <=> k ≠ 3, -2. Allora $A_k^{-1}$ = (1/((k-3)(k+2)))·[[k-1,-2],[-3,k]].

D: Determinante di [[1,1,1],[1,x,$x^{2}$],[1,$x^{2}$,$x^{4}$]]?
R: x(x-1)^{3}(x+1) (verificato con sympy).

D: Inversa di un prodotto e della trasposta.
R: (AB)^{-1} = B^{-1}$A^{-1}$ e (ᵗA)^{-1} = ᵗ($A^{-1}$). Il sistema Ax = b con det A ≠ 0 ha l'unica soluzione x = A^{-1}b.

## 08 - Sistemi lineari

D: Quali sono le mosse di Gauss e perché non cambiano le soluzioni?
R: (I) scambiare due righe; (II) moltiplicare una riga per λ ≠ 0; (III) sostituire Ri con Ri + λRj. Trasformano il sistema in uno equivalente (Prop 11.4), quindi S non cambia.

D: Cos'è un pivot e come si calcola il rango? Gauss vs Gauss-Jordan.
R: Pivot = primo elemento non nullo di una riga a scalini. rk A = numero di pivot. Gauss porta a scalini, Gauss-Jordan azzera anche sopra i pivot e li rende 1 (rref), comodo per scrivere le soluzioni.

D: Come si leggono le soluzioni dalla matrice ridotta?
R: Se la colonna dei termini noti ha un pivot (riga 0 = 1) il sistema è impossibile. Altrimenti le variabili senza pivot sono libere (parametri), le altre si esprimono in funzione dei parametri.

D: Enuncia Rouché-Capelli.
R: Ax = b ha soluzioni <=> rk A = rk(A|b); in tal caso l'insieme delle soluzioni è un sottospazio affine di dimensione n - rk A (n = numero delle incognite).

D: Schema delle soluzioni: casi in base ai ranghi.
R: rk(A|b) > rk A: nessuna soluzione. rk A = rk(A|b) = n: una sola. rk A = rk(A|b) < n: infinite (∞^{n-rk A}). Nei quiz "∞^{1}" significa rk = n-1.

D: Struttura delle soluzioni di Ax = b e del sistema omogeneo.
R: $S_{0}$ = soluzioni di Ax = 0 è un sottospazio di $K^{n}$ (= Ker $L_A$). Se S ≠ ∅, S = $x_p$ + $S_{0}$ con $x_p$ soluzione particolare: sottospazio affine con giacitura $S_{0}$. S non è un sottospazio per b ≠ 0 (non contiene 0).

D: V/F: il sistema omogeneo Ax = 0 con 3 equazioni e 4 incognite ha sempre infinite soluzioni.
R: Vero: è compatibile (x=0) e rk A <= 3 < 4, quindi ∞^{4-rk A} soluzioni. (Invece un sistema non omogeneo 3×4 può essere impossibile.)

D: Quando Ax = b (A quadrata) ha una sola soluzione?
R: <=> rk A = n <=> det A ≠ 0, e allora x = A^{-1}b. Per b = 0: solo x = 0 se det ≠ 0, infinite altrimenti.

D: Risolvi x+y+2z=9, 2x+4y-3z=1, 3x+6y-5z=0.
R: Gauss: R2-2R1, R3-3R1, poi R3-(3/2)R2 dà -z/2 = -3/2: z=3, y=2, x=1. Soluzione unica (1,2,3).

D: Risolvi x+2y+z=-1, 2x+y+z=1, 5x+4y+3z=1; poi con termini noti (1,1,1).
R: Gauss-Jordan: z=t libera, x=1-t/3, y=-1-t/3: S = (1,-1,0)+t(-1/3,-1/3,1), rk A = rk(A|b) = 2 < 3. Con (1,1,1): rk A = 2 < rk(A|b) = 3, nessuna soluzione.

D: Discuti x+ky = 4-k, kx+4y = 4 al variare di k.
R: R2-kR1: [[1,k|4-k],[0,4-$k^{2}$|(k-2)^{2}]]. k=2: 0=0, rk=1, ∞^{1} soluzioni. k=-2: 0·y=16, rk A=1 < rk(A|b)=2, nessuna. k ≠ ±2: rk=2, soluzione unica. (k=1: y=1/3, x=8/3.)

D: Nei sistemi con parametro, qual è l'errore da evitare nella riduzione?
R: Non si può dividere per un'espressione che si annulla per certi valori del parametro: i valori critici (zeri dei pivot) vanno trattati a parte.

D: Come si stabilisce con un sistema se v1..vk ∈ $R^{n}$ sono indipendenti o generano $R^{n}$?
R: Indipendenti <=> rk(v1|...|vk) = k; generano $R^{n}$ <=> rk = n; se k = n basta det ≠ 0. Es. (1,1,0),(0,1,1),(1,0,-1) hanno det 0, rango 2: dipendenti.

D: Coordinate di v=(3,4,5) rispetto alla base (1,1,0),(0,1,1),(1,1,-1).
R: Si risolve (w1|w2|w3)λ = v: det = -1 ≠ 0, λ = (7,1,-4) (verifica: 7(1,1,0)+(0,1,1)-4(1,1,-1) = (3,4,5)).

D: Esempio di S = $x_p$ + $S_{0}$: {x-y+z=1, y-z=2}.
R: $S_{0}$ = {(0,t,t)}, soluzione particolare (3,0,-2), quindi S = (3, t, t-2).

## 09 - Applicazioni lineari

D: Definizione di applicazione lineare e test per riconoscere le non lineari.
R: f(v+w) = f(v)+f(w) e f(λv) = λf(v); segue f(0) = 0. Non sono lineari T(a,b) = (a+2,b-1) (T(0) ≠ 0) e T(a,b) = ($a^{2}$, a+b). Test: le componenti devono essere polinomi omogenei di grado 1.

D: Definisci Ker e Im; sono sottospazi? Criterio di iniettività.
R: Ker f = {v | f(v)=0} ⊆ V, Im f = f(V) ⊆ W, entrambi sottospazi. f iniettiva <=> Ker f = {0} (f(v) = f(v') <=> v-v' ∈ Ker); f suriettiva <=> Im f = W.

D: Enuncia il teorema della dimensione e le conseguenze per f: $R^8$ -> $R^4$.
R: Se dim V = n finita, dim Ker f + dim Im f = n. Per f: $R^8$->$R^4$: dim Im <= 4, quindi dim Ker >= 4: mai iniettiva. In generale dim V > dim W => non iniettiva; dim V < dim W => non suriettiva; dim V = dim W => iniettiva <=> suriettiva <=> isomorfismo. (fonte: Buzano, Lezioni_14-16.pdf, Teor. 14.13, Cor. 14.14, Prop. 15.3-15.4; dimostrazione anche in Slide MANNO, Lezione22_Alg.pdf.)

D: Come si trovano Ker e Im di $L_A$?
R: Ker = soluzioni di Ax = 0 (una base ha un vettore per parametro libero). Im = Span(colonne di A): una base è data dalle colonne di A (originale!) corrispondenti ai pivot. Controllo: dim Ker + dim Im = n.

D: f(x,y,z) = (x+y+z, 2x+3y+4z): Ker, Im, suriettiva?
R: A = [[1,1,1],[2,3,4]]: Ker = ⟨(1,-2,1)⟩, dim 1; rk = 2, Im = $R^{2}$, suriettiva; 1+2 = 3.

D: f: $R_2$[x] -> R, f(p) = p(1)+p(-1): Ker e Im.
R: Su a+bx+cx^{2}: f = 2a+2c. Ker = {a = -c}, base {x, 1-$x^{2}$}, dim 2; Im = R, dim 1; 2+1 = 3.

D: f: $M_{2}$(R) -> $M_{2}$(R), f(A) = A - ᵗA: Ker e Im.
R: Ker = matrici simmetriche (dim 3), Im = matrici antisimmetriche (dim 1, generata da [[0,1],[-1,0]]); 3+1 = 4.

D: Quando due spazi vettoriali sono isomorfi? Cosa fanno le coordinate?
R: V ≅ W <=> dim V = dim W. Ogni spazio di dimensione n su K è isomorfo a $K^{n}$ tramite le coordinate (che dipendono dalla base scelta). L'inversa di un isomorfismo è automaticamente lineare.

D: Cosa contengono le colonne della matrice associata [f]_B^C? Qual è la formula per f(v)?
R: La colonna j contiene le coordinate di f($v_j$) rispetto a C (base di arrivo). [f(v)]_C = [f]_B^C [v]_B.

D: f: $R_2$[x] -> $R^{2}$, f(p) = (p(2),p(-2)): matrice nelle basi canoniche e immagine di 3x^{2}+5x+1.
R: f(1) = (1,1), f(x) = (2,-2), f($x^{2}$) = (4,4): [f] = [[1,2,4],[1,-2,4]]. Su (1,5,3): (23,3) = (p(2),p(-2)).

D: Definisci la matrice di cambiamento di base [id]_B^C e come si usa.
R: La colonna j contiene le coordinate di $v_j$ (vecchia base B) rispetto a C; [v]_C = M[v]_B, e l'inversa $M^{-1}$ = [id]_C^B. Es. con B = {(1,2,3),(0,2,1),(0,1,1)}: [id]_A^B = [[1,0,0],[1,1,-1],[-4,-1,2]] (inversa di (w1|w2|w3)).

D: Come si compongono le matrici associate? Cosa dice l'isomorfismo?
R: [g∘f]_B^D = [g]_C^D [f]_B^C (il prodotto di matrici riflette la composizione). f è un isomorfismo <=> [f] invertibile, e [$f^{-1}$] = [f]^{-1}.

D: Come cambia la matrice di un endomorfismo con la base? Definisci matrici simili.
R: Se M = [id]_B^C, [f]_B^B = $M^{-1}$[f]_C^C M. A,B simili se A = M^{-1}BM con M invertibile; è una relazione di equivalenza e rappresenta lo stesso endomorfismo in basi diverse.

D: Invarianti per similitudine.
R: Se A ~ B allora rk A = rk B, det A = det B (Binet), A invertibile <=> B invertibile, stesso polinomio caratteristico.

D: f(x,y) = (x+y,-y), base B = {(1,0),(-1,2)}: matrice in B?
R: [f]_C = [[1,1],[0,-1]], M = [[1,-1],[0,2]]: $M^{-1}$[f]M = diag(1,-1) (f fissa (1,0) e ribalta (-1,2)).

D: Quiz: f(x,y,z) = (x+y,x+y) è iniettiva/suriettiva? E f(x,y,z) = (x+4y,x-2y)?
R: Prima: rk 1, Im = retta, né iniettiva né suriettiva. Seconda: rk 2, suriettiva su $R^{2}$, non iniettiva ($R^{3}$->$R^{2}$) con Ker = ⟨(0,0,1)⟩.

## 10 - Autovalori e diagonalizzazione

D: Definisci autovettore e autovalore. Può essere nullo l'autovettore? E l'autovalore?
R: v ≠ 0 con T(v) = λv; λ è l'autovalore. L'autovettore non può essere nullo, l'autovalore può essere 0. Ogni multiplo μv (μ ≠ 0) è autovettore con lo stesso λ.

D: V/F: la rotazione di angolo θ in $R^{2}$ ha autovettori reali.
R: Falso per θ ≠ 0, π (ruota ogni vettore). Per θ = 0, π è ±id e ogni vettore è autovettore.

D: Quando T è diagonalizzabile e cos'è la matrice diagonalizzante?
R: T è diagonalizzabile <=> esiste una base di autovettori; in tale base la matrice è diag(λ1..λn). Per A: D = M^{-1}AM con M che ha per colonne gli autovettori, nello stesso ordine degli autovalori in D (AM = MD).

D: Come si calcola $A^k$ per A diagonalizzabile? Esempio A = [[3,-4],[0,2]].
R: $A^k$ = M $D^k$ $M^{-1}$. Qui autovettori (1,0) (λ=3), (4,1) (λ=2), M = [[1,4],[0,1]]: $A^{100}$ = [[$3^{100}$, -4($3^{100}$ - $2^{100}$)],[0, $2^{100}$]] (per k=2 dà [[9,-20],[0,4]]).

D: Definisci $p_A$ e dimostra che gli autovalori sono le sue radici.
R: $p_A$(λ) = det(A-λI) (di grado n). λ autovalore <=> esiste x≠0 con (A-λI)x=0 <=> A-λI non invertibile <=> det(A-λI) = 0.

D: Il polinomio caratteristico dipende dalla base? Perché?
R: No: è invariante per similitudine. Se A = M^{-1}BM, A-λI = $M^{-1}$(B-λI)M e per Binet i determinanti coincidono.

D: Relazioni tra $p_A$, traccia e determinante.
R: Il termine noto di $p_A$ è det A e il coefficiente di λ^{n-1} è ±tr A: somma degli autovalori = tr A, prodotto = det A, A invertibile <=> 0 non è autovalore. Prodotto = det A: fonte Slide MANNO, Lezione29_Complementi_Alg.pdf; A invertibile <=> 0 non è autovalore: fonte Buzano Prop 17.13 e 10.8; somma degli autovalori = tr A: [ASSUNZIONE: da verificare] (nessuna fonte trovata).

D: Prop 18.1 e Cor 18.2: enunciati. V/F: $p_T$ con radici non distinte implica non diagonalizzabile.
R: Autovettori di autovalori distinti sono indipendenti; se $p_T$ ha n radici distinte in K, T è diagonalizzabile (condizione sufficiente, non necessaria). Falso: ad esempio I ha autovalore 1 con $m_a$ = n ed è diagonale.

D: Molteplicità algebrica e geometrica: definizioni e disuguaglianza.
R: $m_a$(λ) = molteplicità di λ come radice di $p_T$; $m_g$(λ) = dim $V_\lambda $ = n - rk(A-λI). Sempre 1 <= $m_g$ <= $m_a$; se $m_a$ = 1 allora $m_g$ = 1.

D: Teorema di diagonalizzabilità (Teo 18.10).
R: T è diagonalizzabile <=> (1) $p_T$ ha n radici in K contate con molteplicità (su C sempre vero, su R no) e (2) $m_a$(λ) = $m_g$(λ) per ogni autovalore λ. Dim.: Σm_g <= Σm_a <= n, uguaglianza <=> somma degli autospazi = V.

D: A = [[1,1],[0,1]] è diagonalizzabile?
R: No: p = (λ-1)^{2}, $m_a$(1) = 2, ma A-I = [[0,1],[0,0]] ha rango 1 quindi $m_g$(1) = 1 ≠ 2.

D: A = [[3,0,0],[-4,-1,-8],[0,0,3]]: è diagonalizzabile?
R: p = (3-λ)^{2}(-1-λ). A-3I ha rango 1 quindi $m_g$(3) = 2 = $m_a$; λ=-1 semplice. Sì: $V_3$ = ⟨(-1,1,0),(-2,0,1)⟩, $V_{-1}$ = ⟨(0,1,0)⟩.

D: $A_k$ = [[3,k+4,1],[-1,-3,-1],[0,0,2]]: per quali k è diagonalizzabile su R?
R: p = (2-λ)(λ^{2}+k-5), radici 2, ±√(5-k). k > 5: una sola radice reale, non diagonalizzabile su R. k < 5, k ≠ 1: tre radici reali distinte, sì. k = 1: autovalori -2,2,2 con A-2I di rango 1, m_g(2)=2, sì. k = 5: autovalori 2,0,0 con rk A = 2, m_g(0)=1 ≠ 2, no. Conclusione: diagonalizzabile su R <=> k < 5.

D: [[1,0,0],[k,1,0],[0,0,2]]: per quali k è diagonalizzabile?
R: Autovalore 1 con $m_a$ = 2, A-I = [[0,0,0],[k,0,0],[0,0,1]] ha rango 1 se k=0, 2 se k≠0. Quindi $m_g$ = 2 solo per k = 0: diagonalizzabile solo per k = 0.

D: Quiz: $p_T$(t) = t(t-3)^{3}, T non simmetrico. Cosa si può dire di Ker, Im e $V_3$?
R: dim Ker T = $m_g$(0) = $m_a$(0) = 1, dim Im T = 3, T non suriettivo (0 è autovalore). Su $V_3$ si sa solo $m_g$(3) ∈ {1,2,3}.

D: Quiz: p(λ) = -λ^{3}+3λ^{2}-2λ. Cosa se ne deduce?
R: = -λ(λ-1)(λ-2): tre radici distinte => diagonalizzabile; 0 è autovalore => non biunivoca; autospazi distinti si intersecano solo in 0.

## 11 - Prodotti scalari

D: Assiomi di prodotto scalare reale; cosa significano degenere e definito positivo?
R: Bilineare (additività e omogeneità nel primo argomento) e simmetrica ⟨v,w⟩ = ⟨w,v⟩. Degenere: esiste v ≠ 0 con ⟨v,w⟩ = 0 per ogni w. Definito positivo: ⟨v,v⟩ > 0 per ogni v ≠ 0.

D: Perché un prodotto definito positivo è non degenere?
R: Se v ≠ 0 fosse degenere avremmo ⟨v,v⟩ = 0, contro ⟨v,v⟩ > 0 (Prop 19.3).

D: Su $R_2$[x] classifica ⟨p,q⟩ = p(0)q(0)+p(1)q(1)+p(2)q(2), poi con solo i punti 0,1, poi con -p(2)q(2).
R: Con tre punti: definito positivo (⟨p,p⟩ = 0 dà 3 radici ma deg <= 2). Con due punti: degenere (p = x(1-x) è ortogonale a tutto). Con -p(2)q(2): non degenere ma non definito positivo (p = x-1 ha ⟨p,p⟩ = 1+0-1 = 0).

D: Come si associa una matrice a un prodotto scalare e come si calcola g(v,w)?
R: Base B: $S_{ij}$ = g($v_i$,$v_j$); g(v,w) = ᵗ[v]_B S [w]_B. Viceversa S simmetrica dà $g_S$(x,y) = ᵗxSy. Es. euclideo su $R^{2}$ in base {(1,0),(1,1)}: S = [[1,1],[1,2]].

D: Come cambia S cambiando base? Differenza fra congruenza e similitudine.
R: S' = ᵗM S M con M = [id]_{B'}^B (congruenza); per gli endomorfismi invece A' = M^{-1}AM (similitudine). La congruenza non conserva il determinante ma ne conserva il segno (det S' = (det M)^{2} det S).

D: Scrivi la matrice simmetrica di q = $x1^{2}$+4x1x2-$x2^{2}$+4x3^{2}.
R: Termini quadratici sulla diagonale, coefficienti misti divisi a metà: S = [[1,2,0],[2,-1,0],[0,0,4]].

D: Definisci norma, enuncia Cauchy-Schwarz e disuguaglianza triangolare.
R: ‖v‖ = √⟨v,v⟩. |⟨v,w⟩| <= ‖v‖‖w‖ e ‖v+w‖ <= ‖v‖+‖w‖.

D: Dimostra Cauchy-Schwarz.
R: 0 <= ‖av+bw‖^{2} = $a^{2}$‖v‖^{2}+$b^{2}$‖w‖^{2}+2ab⟨v,w⟩; con a = ‖w‖^{2}, b = -⟨v,w⟩ si ottiene 0 <= ‖w‖^{4}‖v‖^{2}-⟨v,w⟩^{2}‖w‖^{2}; dividendo per ‖w‖^{2} (w ≠ 0): ⟨v,w⟩^{2} <= ‖v‖^{2}‖w‖^{2}.

D: Come si definisce l'angolo fra v,w ≠ 0 e perché è ben definito?
R: cosθ = ⟨v,w⟩/(‖v‖‖w‖), θ ∈ [0,π]. È ben definito perché Cauchy-Schwarz garantisce che il rapporto stia in [-1,1]. Acuto/retto/ottuso se ⟨v,w⟩ è >0, =0, <0.

D: Formula della proiezione ortogonale di v su w e coefficiente di Fourier. Proietta (-1,3,4) su (1,2,0) e su (2,4,0).
R: $p_w$(v) = (⟨v,w⟩/⟨w,w⟩) w, e k = ⟨v,w⟩/⟨w,w⟩ è il coefficiente di Fourier. Su (1,2,0): ⟨v,w⟩ = 5, ‖w‖^{2} = 5: p = (1,2,0). Su (2,4,0): 10/20 = 1/2: p = (1,2,0).

D: Proietta (1,-1,1) sul piano x+y+z=0.
R: Si toglie la componente lungo n=(1,1,1): v - (⟨v,n⟩/‖n‖^{2})n = (1,-1,1) - (1/3)(1,1,1) = (2/3,-4/3,2/3).

D: Complemento ortogonale: definizione e proprietà (prodotto definito positivo).
R: W^⊥ = {v | ⟨v,w⟩ = 0 per ogni w ∈ W}, sottospazio. Con prodotto definito positivo V = W ⊕ W^⊥, quindi dim W + dim W^⊥ = dim V (fonte: Slide MANNO, Lezione24_Alg.pdf, enunciato per sottospazi di $R^n$ con prodotto euclideo, lasciato per esercizio; per prodotto definito positivo generico [ASSUNZIONE: da verificare]).

D: Coordinate in una base ortogonale {v_i}.
R: v = Σ (⟨v,$v_i$⟩/⟨$v_i$,$v_i$⟩) $v_i$: le coordinate sono i coefficienti di Fourier, ottenuti con un prodotto scalare ciascuna.

D: Descrivi Gram-Schmidt e proprietà.
R: w1 = v1; $w_i$ = $v_i$ - $\sum _{j<i}$(⟨$v_i$,$w_j$⟩/⟨$w_j$,$w_j$⟩) $w_j$. I $w_i$ sono ortogonali, Span(w1..wi) = Span(v1..vi); dividendo per le norme si ha una base ortonormale.

D: Applica Gram-Schmidt a v1=(1,1,0), v2=(0,1,1), v3=(1,0,1).
R: w1 = (1,1,0); w2 = (0,1,1)-(1/2)(1,1,0) = (-1/2,1/2,1); w3 = (1,0,1) - (1/2)w1 - (1/3)w2 = (2/3,-2/3,2/3). Controllo: i prodotti scalari a coppie sono nulli.

## 12 - Geometria analitica: isometrie, prodotto vettoriale, rette e piani

D: Cos'è una matrice ortogonale e quanto vale il suo determinante?
R: A con ᵗAA = I: le colonne sono una base ortonormale, $A^{-1}$ = ᵗA, $L_A$ è un'isometria di $R^{n}$ euclideo. Da Binet det A = ±1.

D: Classifica le matrici ortogonali 2×2 e le isometrie di $R^{2}$.
R: Rotazioni Rot_θ = [[cosθ,-sinθ],[sinθ,cosθ]] (det +1) e riflessioni Rif_θ = [[cosθ,sinθ],[sinθ,-cosθ]] (det -1, rispetto alla retta per l'origine con angolo θ/2). Le isometrie di $R^{2}$ sono rotazioni e riflessioni. [Segni ricostruiti dagli appunti]

D: Definisci v×w in $R^{3}$ e calcola (1,2,-1)×(2,0,3).
R: v×w = (v2w3-v3w2, v3w1-v1w3, v1w2-v2w1). Qui (6,-5,-4); controlli: ortogonale a v (6-10+4=0) e a w (12-12=0).

D: Proprietà fondamentali di v×w.
R: Ortogonale a v e w; =0 <=> v,w dipendenti; (v,w,v×w) è base positiva se indipendenti; antisimmetrico e bilineare ma non associativo; identità di Lagrange ‖v×w‖^{2}+⟨v,w⟩^{2} = ‖v‖^{2}‖w‖^{2}; ‖v×w‖ = ‖v‖‖w‖sinθ = area del parallelogramma.

D: Il prodotto vettoriale è associativo?
R: No: (e1×e2)×e2 = e3×e2 = -e1, mentre e1×(e2×e2) = 0.

D: Cos'è un sottospazio affine e quando x+W e x'+W' sono lo stesso insieme?
R: S = x+W con W sottospazio (giacitura), dim S = dim W. Descrivono lo stesso insieme <=> W = W' e x-x' ∈ W. Es. (1,0)+⟨(1,1)⟩ e (0,-1)+⟨(1,1)⟩ sono la stessa retta y = x-1.

D: Da piano parametrico a cartesiano: π = (1,2,-3)+t(1,0,1)+s(2,-1,0).
R: n = (1,0,1)×(2,-1,0) = (1,2,-1), quindi x+2y-z = d; con P0: d = 1+4+3 = 8, cioè π: x+2y-z = 8.

D: Piano per A=(1,0,0), B=(0,1,0), C=(0,0,1). [INT]
R: (B-A)×(C-A) = (-1,1,0)×(-1,0,1) = (1,1,1); d = 1 da A: x+y+z = 1.

D: Come si trova la direzione di una retta data da due piani?
R: È il prodotto vettoriale delle due normali: v = n1×n2 (in forma cartesiana la retta è l'intersezione dei due piani).

D: Intersezione di sottospazi affini: struttura e criterio di incidenza.
R: Se S∩S' ≠ ∅ e x è un punto comune, S∩S' = x+(W∩W'). Se giac(S)+giac(S') = $R^{n}$ allora S e S' sono incidenti (es. due piani non paralleli in $R^{3}$ si incontrano in una retta).

D: Posizione reciproca di due rette r=P+tv, s=Q+uw in $R^{3}$. [INT]
R: v×w=0: parallele (coincidenti se Q-P ∈ ⟨v⟩). v×w≠0: se det[v|w|Q-P] = 0 incidenti in un punto, altrimenti sghembe. Ortogonali se ⟨v,w⟩ = 0 (anche sghembe).

D: Posizione di una retta r=P+tv rispetto al piano ax+by+cz=d. [INT]
R: Con n=(a,b,c): ⟨v,n⟩≠0 => incontra π in un punto; ⟨v,n⟩=0 => parallela a π, contenuta se un punto soddisfa l'equazione. Ortogonale <=> v ∥ n.

D: Posizione di due piani. [INT]
R: n1×n2 ≠ 0: si incontrano in una retta di direzione n1×n2. n1×n2 = 0: paralleli, coincidenti se i termini noti sono proporzionali come i coefficienti.

D: Compito 14/07/2023: r: x-y=2, y+z=0; s: (t,-t,-t). Posizione? [INT]
R: Direzioni (1,-1,0)×(0,1,1) = (-1,-1,1) e (1,-1,-1): non parallele (prodotto (2,0,2)), non ortogonali (⟨v,w⟩=-1). Con P=(2,0,0), Q=(0,0,0): det[v|w|Q-P] = -4 ≠ 0, quindi sghembe.

D: Compito 28/06/2023: r: x-z=0, x-y+4=0; s: (t,-t+2,2t+1). Posizione? [INT]
R: Direzioni (-1,-1,-1) e (1,-1,2): non parallele e non ortogonali (⟨v,w⟩=-2); il determinante con P=(0,4,0), Q=(0,2,1) è 0, quindi incidenti nel punto (-1,3,-1) (t=-1 su s). La chiave del compito non è negli appunti.

## 13 - Angoli e distanze

D: Angolo fra due rette incidenti con direzioni v,v'.
R: cosθ = |⟨v,v'⟩|/(‖v‖‖v'‖), convenzionalmente acuto (cambiare il verso di v sostituisce θ con π-θ).

D: Angolo fra retta e piano: formula con la normale.
R: Se α è l'angolo fra v e la normale n, θ = π/2 - α, cioè sinθ = |⟨v,n⟩|/(‖v‖‖n‖) (Prop 24.4). Equivale all'angolo fra v e la sua proiezione su π.

D: Angolo fra e3 e il piano x+y-z = 0.
R: n = (1,1,-1), cosα = 1/√3, sinθ = 1/√3, θ = π/2 - arccos(1/√3) = arccos(√6/3) ≈ 0.615 rad ≈ 35.3°. Con proiezione: (1/3)(1,1,2) di norma √6/3.

D: Angolo fra i piani x+y-z=3 e x-y-z=9.
R: È l'angolo fra le normali: n1=(1,1,-1), n2=(1,-1,-1), ⟨n1,n2⟩ = 1, ‖$n_i$‖ = √3: cosθ = 1/3, θ ≈ 70.5°.

D: Angolo fra la retta di direzione (1,1,0) e il piano x+y+z = 0. [INT]
R: sinθ = |⟨v,n⟩|/(‖v‖‖n‖) = 2/(√2√3) = 2/√6, θ ≈ 54.7°.

D: Formula della distanza punto-retta e dimostrazione.
R: d(P,r) = ‖v0×v1‖/‖v0‖ con r = P0+⟨v0⟩, v1 = P-P0. Il parallelogramma di lati v0,v1 ha area ‖v0×v1‖ e anche base·altezza = ‖v0‖·d.

D: Calcola d(P,r) per v0=(3,2,1), v1=(2,-2,2).
R: v0×v1 = (6,-4,-10), norma √152, ‖v0‖ = √14: d = √(76/7) = 2√133/7.

D: Distanza di P=(1,2,3) dalla retta ⟨(1,1,0)⟩ per l'origine. [INT]
R: (1,1,0)×(1,2,3) = (3,-3,1), norma √19; d = √19/√2 = √38/2.

D: Distanza fra rette parallele e sghembe.
R: Parallele: d(r,r') = d(P0,r'). Sghembe: d = |det(v|v'|v'')|/‖v×v'‖ con v'' = P0'-P0 (volume del parallelepipedo = area base × altezza).

D: r = ⟨(1,1,0)⟩, r' = (1,0,1)+u(0,1,1): distanza? [INT]
R: v×v' = (1,-1,1), norma √3; det[v|v'|v''] = 2 ≠ 0 (sghembe); d = 2/√3 = 2√3/3.

D: Distanza punto-piano e dimostrazione.
R: d(P0,π) = |ax0+by0+cz0-d|/√($a^{2}$+$b^{2}$+$c^{2}$): lunghezza della proiezione di P0-Q0 (Q0 ∈ π) lungo n, |⟨P0-Q0,n⟩|/‖n‖ [dimostrazione INT, non negli appunti].

D: Distanza di P0=(2,1,-2) dal piano 2x-y+z = 4.
R: |4-1-2-4|/√6 = 3/√6 = √6/2.

D: Distanza fra i piani paralleli 2x-y+2z=3 e 2x-y+2z=-6. [INT]
R: |d1-d2|/√($a^{2}$+$b^{2}$+$c^{2}$) = 9/3 = 3.

D: Area del triangolo A=(1,0,0), B=(0,2,0), C=(0,0,3). [INT]
R: ‖(B-A)×(C-A)‖/2 = ‖(-1,2,0)×(-1,0,3)‖/2 = ‖(6,3,2)‖/2 = 7/2.

D: Distanza retta-piano e volume del parallelepipedo. [INT]
R: Retta e piano incidenti: 0; retta parallela al piano: distanza di un suo punto dal piano. Volume del parallelepipedo di spigoli u,v,w: |det[u|v|w]|.

## 14 - Teorema spettrale e forme quadratiche

D: Definizione di prodotto hermitiano e perché il coniugio.
R: ⟨·,·⟩: V×V -> C lineare nel primo argomento con ⟨v,w⟩ = conj(⟨w,v⟩). Il coniugio garantisce che ⟨v,v⟩ sia reale (uguale al suo coniugato), così si può chiedere ⟨v,v⟩ > 0. È sesquilineare: ⟨v,λw⟩ = conj(λ)⟨v,w⟩. Euclideo su $C^{n}$: ⟨x,y⟩ = ᵗx conj(y).

D: Cos'è una matrice hermitiana? Esempio. Quando una reale è hermitiana?
R: ᵗH = conj(H), cioè $H_{ij}$ = conj($H_{ji}$); la diagonale è reale. Es. [[2,1+i],[1-i,1]]. Una matrice reale è hermitiana <=> simmetrica.

D: Definisci T autoaggiunto. Quando la sua matrice è simmetrica/hermitiana?
R: ⟨T(v),w⟩ = ⟨v,T(w)⟩ per ogni v,w. In una base ORTONORMALE B: T autoaggiunto <=> [T]_B è hermitiana (reale: simmetrica). La condizione "ortonormale" è essenziale: A = [[2,1],[1,1]] in una base non ortonormale può diventare non simmetrica ([[0,1],[-1,3]]).

D: Prop 25.10: se U è T-invariante (T autoaggiunto), cosa si può dire di U^⊥? Dimostralo.
R: Anche U^⊥ è T-invariante. Per v ∈ U^⊥, u ∈ U: ⟨T(v),u⟩ = ⟨v,T(u)⟩ = 0 perché T(u) ∈ U.

D: Enuncia il teorema spettrale (Teo 26.1).
R: T: V->V è autoaggiunto <=> ha una base ortonormale di autovettori e tutti i suoi autovalori sono reali.

D: Dimostra che gli autovalori di un autoaggiunto sono reali.
R: Se T(v) = λv, v ≠ 0: λ⟨v,v⟩ = ⟨T(v),v⟩ = ⟨v,T(v)⟩ = conj(λ)⟨v,v⟩ e ⟨v,v⟩ > 0, quindi λ = conj(λ).

D: Schema della dimostrazione di (=>) del teorema spettrale per induzione.
R: n=1 banale. n>1: esiste un autovettore v (teorema fondamentale dell'algebra); Span(v) è T-invariante, quindi lo è U = Span(v)^⊥ (Prop 25.10); T|_U è autoaggiunto di dimensione n-1, ha base ortonormale di autovettori per ipotesi induttiva; aggiungendo v/‖v‖ si ottiene la base di V.

D: Versione matriciale del teorema spettrale (Cor 26.2).
R: Per A ∈ M(n,R) equivalgono: A simmetrica; $L_A$ ha una base ortonormale di autovettori; esiste M ortogonale con ᵗMAM = M^{-1}AM = D diagonale.

D: Procedura per diagonalizzare ortogonalmente una simmetrica.
R: Polinomio caratteristico e autovalori (tutti reali); per ogni autovalore base dell'autospazio, ortogonalizzata con Gram-Schmidt se la dimensione è >= 2 (autospazi di autovalori diversi sono già ortogonali); normalizzare e mettere i vettori in colonna in M.

D: A = [[1,0,1],[0,2,0],[1,0,1]]: diagonalizza ortogonalmente.
R: p = λ(λ-2)^{2}; $V_0$ = ⟨(1,0,-1)⟩, $V_2$ = ⟨(1,0,1),(0,1,0)⟩ (già ortogonali). M = [(1,0,-1)/√2 | (1,0,1)/√2 | (0,1,0)], ᵗMAM = diag(0,2,2).

D: B = [[3,1],[0,1]]: esiste una base ortonormale di autovettori?
R: No: B non è simmetrica; autovettori (1,0) (λ=3) e (-1,2) (λ=1) hanno ⟨v1,v2⟩ = -1 ≠ 0 e ogni autovettore è multiplo di uno dei due.

D: Cos'è la forma canonica di una forma quadratica?
R: Con P ortogonale tale che ᵗPAP = diag(λ1..λn), nelle coordinate X (x = PX) q = λ1X1^{2}+...+λnXn^{2}, dove λ_i sono gli autovalori di A (reali).

D: Classifica una forma quadratica con gli autovalori.
R: Definita positiva: tutti >0; semidefinita positiva: tutti >=0 e uno =0; definita negativa: tutti <0; semidefinita negativa: tutti <=0 con uno =0; indefinita: autovalori di segno opposto.

D: q = 5x^{2}+14y^{2}+4yz+11z^{2} è definita?
R: Matrice [[5,0,0],[0,14,2],[0,2,11]], autovalori 5,10,15: forma canonica 5X^{2}+10Y^{2}+15Z^{2}, definita positiva.

D: q = 2xy+2xz+2yz: carattere?
R: Matrice con zeri sulla diagonale e 1 altrove, autovalori 2,-1,-1: forma 2X^{2}-$Y^{2}$-$Z^{2}$, indefinita.

D: q = $x^{2}$-2xy+$y^{2}$: carattere? Su quali vettori si annulla?
R: Autovalori 0,2: semidefinita positiva (q=(x-y)^{2}). In generale q si annulla su Ker A (qui x=y).

D: V/F: "q(x,y,z) = 0 <=> (x,y,z) = 0" per q con autovalori 1,2,0.
R: Falso: è vero solo se q è definita (positiva o negativa); con un autovalore nullo (semidefinita) q si annulla su Ker A ≠ 0.

D: Come si studia "q(x,y,x-y) >= 0 per ogni x,y"?
R: Si sostituisce il vincolo z=x-y e si studia la forma ristretta in due variabili (restrizione a un sottospazio), non la q di partenza.

D: Regola di Cartesio per i segni degli autovalori di una simmetrica. [DA VERIFICARE se in programma: solo in Manno 33]
R: Per polinomi reali con TUTTE le radici reali (come $p_A$ di una simmetrica): estrarre $t^k$ per le radici nulle, rendere positivo il coefficiente direttore, scrivere i segni (zeri come +); ogni coppia attigua concorde = una radice negativa, discorde = una radice positiva.

D: Applica Cartesio a $t^{5}$-13t^{3}-12t^{2} e a -$t^{3}$+7t^{2}-9t+3. [DA VERIFICARE se in programma]
R: $t^{2}$($t^{3}$-13t-12): due radici nulle; $t^{3}$+0t^{2}-13t-12 ha segni + + − −: due concordi, una discorde, quindi 2 negative e 1 positiva (radici 0,0,-1,-3,4). -$t^{3}$+7t^{2}-9t+3 -> +,-,+,-: tre discordanze, 3 positive (q definita positiva).

D: Criterio di Sylvester (enunciato). [DA VERIFICARE se in programma; non in nessuna fonte letta]
R: Δ_k = determinante del minore principale k×k in alto a sinistra. A simmetrica è definita positiva <=> Δ_k > 0 per ogni k; definita negativa <=> (-1)^kΔ_k > 0. Se qualche Δ_k = 0 il criterio non è conclusivo per i semidefiniti (servono tutti i minori principali).

D: Studia $A_k$ = [[1,0,1],[0,2,0],[1,0,k]] con Sylvester. [DA VERIFICARE se in programma]
R: Δ = 1, 2, 2k-2. Definita positiva <=> k > 1. k = 1: semidefinita positiva (autovalori 0,2,2). k < 1: indefinita (Δ1,Δ2 > 0 ma det < 0).

D: In dimensione 2, quando una simmetrica è definita positiva (det/traccia)? [DA VERIFICARE se in programma]
R: <=> det > 0 e traccia > 0 (equivalente a Δ1 > 0 e Δ2 > 0). Es. [[2,1],[1,3]]: Δ1 = 2, Δ2 = 5, definita positiva; [[1,2],[2,1]]: Δ2 = -3, indefinita (autovalori 3,-1).

D: Come si riconosce una conica ax^{2}+bxy+cy^{2}+dx+ey+f=0? [DA VERIFICARE se in programma: solo Manno 33]
R: 1) Centro: 2au+bv+d=0, bu+2cv+e=0. 2) Traslare x=X+u, y=Y+v. 3) Ruotare con P ortogonale che diagonalizza [[a,b/2],[b/2,c]]: λ1X̃^{2}+λ2Ỹ^{2}=-F(u,v). Autovalori concordi e concordi a -F: ellisse; discordi: iperbole; -F=0: degenere.

D: Riconosci 3x^{2}+2xy+3y^{2}-8x-8y+4=0. [INT]
R: Centro (1,1), F(1,1)=-4; A=[[3,1],[1,3]] ha autovalori 2 (autovettore (-1,1)) e 4 (autovettore (1,1)); equazione 2X̃^{2}+4Ỹ^{2}=4, cioè X̃^{2}/2+Ỹ^{2}=1: ellisse con assi lungo (1,1) e (-1,1).

## 15 - Esercizi su endomorfismi

D: Qual è lo schema standard di un esercizio sugli endomorfismi?
R: (1) matrice in una base data (colonne = coordinate delle immagini; attenzione all'ordine della base); (2) base di Ker (Gauss) e Im (colonne pivot); (3) autovalori, $m_a$ e $m_g$ (rk(A-λI)), autospazi, diagonalizzabilità. In $R_2$[x] riscrivere gli autovettori come polinomi.

D: Compito 29/06/2022: f(a+bx+cx^{2}) = a·p1+b·p2+c·p3, p1=-2+x-3x^{2}, p2=-1+x-$x^{2}$, p3=2-x+3x^{2}. Matrice, Ker, Im.
R: A = [[-2,-1,2],[1,1,-1],[-3,-1,3]], rk 2. p1+p3 = 0, quindi Ker f = ⟨1+$x^{2}$⟩; base di Im: {p1,p2}.

D: Stesso esercizio: autovalori e diagonalizzabilità.
R: $p_A$ = t(t-1)^{2}; $V_0$ = Ker f. Per λ=1: A-I ha rango 2, $m_g$(1) = 1 < 2 = $m_a$: non diagonalizzabile (autovettore 1-x+$x^{2}$).

D: Stesso schema con p1=-4-4x^{2}, p2=-2-x-3x^{2}, p3=2-x+$x^{2}$.
R: A = [[-4,-2,2],[0,-1,-1],[-4,-3,1]]; p1-p2+p3 = 0 => Ker f = ⟨1-x+$x^{2}$⟩; p = t(t+2)^{2}; A+2I ha rango 2 => $m_g$(-2) = 1 < 2, non diagonalizzabile (autovettore x+$x^{2}$).

D: $A_k$ = [[1,0,0],[k,2,0],[2,k-3,1]] (lettura incerta): invertibile? Diagonalizzabile? [DA VERIFICARE sul PDF originale]
R: Triangolare: det = 2 ≠ 0 per ogni k, sempre invertibile. Autovalori 1 ($m_a$=2), 2 (semplice). A-I ha rango 2 se $k^{2}$-3k-2 ≠ 0, rango 1 se k = (3±√17)/2: diagonalizzabile <=> k = (3±√17)/2. Per k=3: $m_g$(1)=1, non diagonalizzabile. La matrice potrebbe essere letta male dal PDF.

D: f(x,y,z) = (x+2y, 2x+y, 3z): Ker, Im, autovalori, diagonalizzabilità.
R: A simmetrica con det -9 ≠ 0: Ker = {0}, Im = $R^{3}$. p = (t+1)(t-3)^{2}; $m_g$(3) = 2; $V_{-1}$ = ⟨(-1,1,0)⟩, $V_3$ = ⟨(1,1,0),(0,0,1)⟩. Diagonalizzabile con base ortonormale: ᵗMAM = diag(-1,3,3).

D: f(X) = ᵗX su $R^{2,2}$: autovalori e diagonalizzabilità.
R: $f^{2}$ = id, autovalori ±1: $V_1$ = simmetriche (dim 3), $V_{-1}$ = antisimmetriche (dim 1). $m_g$ = $m_a$ per entrambi: diagonalizzabile, p = (t-1)^{3}(t+1), Ker f = {0}, det = -1.

D: $A_k$ = [[1,1],[k,1]]: diagonalizzabilità al variare di k.
R: p = (1-t)^{2}-k, radici 1±√k. k>0: due reali distinte, diagonalizzabile su R. k=0: autovalore 1 doppio, A-I di rango 1, non diagonalizzabile. k<0: non su R, ma su C (1±i√|k|). Su R <=> k>0; su C <=> k≠0.

D: Per $A_k$ = [[1,1],[k,1]], risolvi $A_k$ x = 0.
R: det = 1-k. k≠1: solo x=0. k=1: [[1,1],[1,1]] rango 1, nucleo ⟨(1,-1)⟩; in accordo con gli autovalori 0 e 2 per k=1.

D: Piano per l'origine che contiene la retta (1,0,2)+t(1,1,-1); distanza da P=(1,1,1). [INT]
R: Normale ⟂ a v=(1,1,-1) e a (1,0,2): n = (2,-3,-1) (a meno di segno), π: 2x-3y-z=0. Distanza |2-3-1|/√14 = 2/√14 = √14/7.

D: q = 2x^{2}+2y^{2}+2z^{2}+2xy+2xz+2yz: autovalori, forma canonica, min/max su ‖x‖=1. [INT]
R: A = [[2,1,1],[1,2,1],[1,1,2]]: autovalori 1 (doppio, piano x+y+z=0) e 4 (autovettore (1,1,1)). Base ortonormale {(-1,1,0)/√2, (-1,-1,2)/√6, (1,1,1)/√3}, forma $Y1^{2}$+$Y2^{2}$+4Y3^{2}, definita positiva. Su ‖x‖=1 minimo 1, massimo 4.

D: V/F: in $R^{2,2}$ un autovettore di f(X)=ᵗX relativo a λ=-1 è una matrice simmetrica.
R: Falso: gli autovettori di λ=-1 sono le matrici antisimmetriche (ᵗX = -X); le simmetriche sono per λ=1.
