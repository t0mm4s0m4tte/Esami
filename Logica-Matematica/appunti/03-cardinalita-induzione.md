# 03 - Cardinalità e induzione
Fonte: Drive "Logica Matematica - Appunti" (Cenni di Cardinalità, Le diverse forme del Principio di Induzione), "Formulario" (tabelle cardinalità), "Sintesi" §8. (ET) = esercizio tipo svolto da me.

## Mappa
Il capitolo ha due metà legate da un tema comune: ragionare sull'infinito. La prima misura la "taglia" degli insiemi tramite biezioni e iniezioni (equipotenza, ≾, Cantor-Schröder-Bernstein, numerabili, teorema di Cantor su P(X), continuo). La seconda studia le diverse forme del principio di induzione (semplice, da k, forte, strutturale, principio del minimo, invarianti di ciclo), che sono lo strumento per dimostrare proprietà di infiniti oggetti costruiti passo dopo passo.

## Cardinalità
Per confrontare insiemi infiniti non si possono contare gli elementi, ma si possono accoppiare. Due insiemi sono equipotenti, X≃Y (|X|=|Y|), quando esiste una biezione tra loro, e questa è una relazione di equivalenza. Si scrive |X|≤|Y| (X≾Y) quando esiste un'iniezione X→Y, il che per X≠∅ equivale a dire che esiste una suriezione Y→X. Un insieme è finito se è equipotente a {0,…,n-1}; l'infinito è semplicemente il non-finito, e lo si riconosce perché ha una biezione con un suo sottoinsieme proprio (n↦n+1 tra ℕ e ℕ∖{0}) e contiene una copia di ℕ.

Il teorema che rende maneggevole questo confronto è quello di **Cantor-Schröder-Bernstein (CSB)**: se |X|≤|Y| e |Y|≤|X| allora |X|=|Y|. È utilissimo perché costruire due iniezioni è quasi sempre più facile che costruire una biezione (per esempio per [0,1] contro (0,1)). L'idea della prova: date le iniezioni f:X→Y e g:Y→X, si definisce F(A)=g[Y∖f[X∖A]], una funzione monotona su P(X), che è un reticolo completo; per il teorema di Tarski-Knaster ha un punto fisso A, e la biezione usa f su A e g⁻¹ fuori da A (i dettagli nel file 06).

Un insieme è **numerabile** se è equipotente a ℕ, cioè se si può elencare come x0,x1,…. Il quadro dei casi principali è il seguente.

| Insieme | Cardinalità | Tecnica |
|---|---|---|
| ℕ, ℤ, ℚ, ℕ×ℕ, primi | numerabile | ℤ: 0,-1,1,-2,2…; ℕ×ℕ: diagonale/quadrata; ℚ: suriezione da ℤ×ℕ* |
| ℕ^{<ℕ} (sequenze finite), programmi Java, A* | numerabile | f(⟨m0..mk⟩)=p0^{m0+1}·…·pk^{mk+1} |
| ℝ, P(ℕ), {0,1}^ℕ, ℕ^ℕ, [a,b], ℝ² | continuo = |P(ℕ)| | più che numerabile |

Alcune regole di calcolo:
- il prodotto, l'unione e l'intersezione di insiemi numerabili sono numerabili;
- se A è infinito e |B|≤|A| allora |A×B|=|A|;
- se A è infinito e B finito allora A∖B ha ancora cardinalità |A|.

La distinzione da non perdere è tra le sequenze **finite** su un alfabeto numerabile, che sono numerabili (si codificano con i numeri primi come in tabella), e le sequenze **infinite** A^ℕ con |A|≥2, che sono più che numerabili. Vale anche il principio dei cassetti: se m>n oggetti sono in n cassetti, un cassetto ne contiene almeno 2.

Che esistano insiemi non numerabili lo mostra **Cantor**: |X|<|P(X)|. La prova è diagonale: se esistesse una g:X→P(X) suriettiva, l'insieme Y={x|x∉g(x)} sarebbe g(x̄) per qualche x̄, e allora x̄∈Y⇔x̄∉Y, assurdo. Ne segue |ℕ|<|P(ℕ)| e quindi una gerarchia infinita di infiniti sempre più grandi. Il continuo è proprio la cardinalità di P(ℕ): |ℝ|=|P(ℕ)|, perché ℝ≾P(ℚ) tramite r↦{q∈ℚ|q<r} (iniettiva per la densità di ℚ), e ℝ²≃ℝ intrecciando le espansioni decimali (con l'avvertenza che 0,499…=0,500…, che si risolve con CSB).

## Induzione
L'induzione serve a dimostrare ∀n P(n) senza verificare infiniti casi. Nella forma **semplice** si dimostra la base P(0) e il passo ∀n(P(n)→P(n+1)), dove P(n) è l'ipotesi induttiva e P(n+1) la tesi: l'idea è una catena di modus ponens che da P(0) arriva a ogni P(n). Se serve, la base può essere un k qualunque e il passo vale per n≥k. La forma **forte** assume l'ipotesi per tutti i casi precedenti, ∀n(∀m<n P(m) → P(n)) ⇒ ∀nP(n), ed è quella adatta quando il passo richiede un caso molto più piccolo di n-1 (per esempio le fattorizzazioni, dove servono divisori ≪ n-1).

Con l'induzione forte è strettamente imparentato il **principio del minimo** (buon ordinamento): ogni A⊆ℕ non vuoto ha un minimo, che equivale all'assenza di catene discendenti infinite. Lo si usa anche per la terminazione dei cicli, esibendo una funzione variante a valori in ℕ che decresce strettamente a ogni iterazione. L'induzione **strutturale** estende lo schema agli insiemi definiti ricorsivamente (Prop(L), Term, Fml): si verifica la proprietà sugli atomi e si mostra che si trasmette lungo le regole di costruzione, il che equivale a un'induzione sull'altezza ht.

In informatica l'induzione si presenta come **invariante di ciclo**: per `while(b) S` si trova una proprietà vera prima del ciclo e preservata da S. Si distingue la correttezza parziale (se il programma termina, l'output è corretto) dalla totale (termina ed è corretto). Per la divisione per sottrazioni l'invariante è X=q·D+r. Alcuni casi classici completano il quadro:
- **fallacia**: nella "dimostrazione" sulle n rette per un punto il passo da n=2 a 3 fallisce, perché le due sotto-famiglie non condividono due rette;
- **ricoprimento**: un quadrato 2^n a cui manca un quadretto si ricopre con tessere a L dividendolo in 4 blocchi 2^{n-1} e mettendo una tessera L al centro;
- **Chomp**: su una tavoletta n×n si toglie un blocco (n-1)×(n-1) e si replica simmetricamente.

## Esercizi svolti (dalle fonti)
1. Σ_{i=0}^n i = n(n+1)/2: base 0=0; passo: n(n+1)/2+(n+1)=(n+1)(n+2)/2.
2. Σ_{i=0}^n (2i+1)=(n+1)²: passo (n+1)²+2(n+1)+1=(n+2)².
3. 3 | n³-n: (n+1)³-(n+1)=(n³-n)+3(n²+n) = 3k+3(n²+n).
4. 2n+1<2^n falsa per n=0,1,2, vera ∀n≥3: base P(3): 7<8.
5. 16^n termina in 6 (n≥1).
6. Ogni n≥2 si scrive come prodotto di primi: minimo controesempio n è composto n=m·l, m,l<n -> contraddizione.
7. lh(P) multiplo di 3 (induzione su ht, vedi file 01).

## Esercizi tipo (ET)
- **ET1** Passo di 2n+1<2^n da n≥3: 2(n+1)+1=(2n+1)+2<2^n+2≤2^n+2^n=2^{n+1} (usa 2^n≥2 per n≥1).
- **ET2** Passo di 16^n: 16^{n+1}=16^n·16; ultima cifra 6·6=36 -> 6.
- **ET3** ℚ numerabile: ℚ≾ℤ×ℕ* via p/q↦(p,q) in forma ridotta (iniettiva) e ℕ⊆ℚ, poi CSB; oppure ℤ×ℕ* numerabile e suriezione su ℚ.
- **ET4** L'insieme delle funzioni f:ℕ→{0,1} ha cardinalità continua: ≃P(ℕ) via funzione caratteristica. Diagonale: dato un elenco f0,f1,… la g(n)=1-f_n(n) differisce da ogni f_n.
- **ET5** Ogni sottoinsieme infinito S di ℕ è numerabile: elenco in ordine crescente s0=min S, s_{k+1}=min(S∖{s0..sk}) (principio del minimo) -> biezione k↦s_k.
- **ET6** Dim. |ℤ|=|ℕ|: f(n)=n/2 se n pari, -(n+1)/2 se dispari (biezione).

## Cose da saper fare all'esame
- Classificare un insieme (finito / numerabile / continuo) e **motivare** (biezione o iniezione+CSB; diagonale; sequenze finite vs infinite).
- Dimostrazioni per induzione (sommatorie, divisibilità, disuguaglianze con base k), scrivendo base / ipotesi / passo / tesi.
- Spiegare l'argomento diagonale di Cantor; enunciare CSB.
- Individuare l'errore in una "dimostrazione" induttiva (passo che non regge per i primi n).

## Dubbi
- [DA VERIFICARE] Fonte Cardinalità: la sfida "X numerabile ⇒ X^ℕ numerabile" è scritta con notazione ambigua (X^ℕ è il continuo); intende X^{<ℕ} (sequenze finite). Stessa ambiguità in "A^ℕ numerabile" per programmi Java.
- [DA VERIFICARE] Fonte Induzione: nel passo della somma 1 il risultato finale è scritto "n(n+1)/2" per errore di conversione; corretto (n+1)(n+2)/2. La disuguaglianza "2n+1<2n" è 2n+1<2^n.
- [DA VERIFICARE] Dimostrazione completa di CSB: il documento "Appunti" termina bruscamente al punto 2 della sezione Reticoli/CSB ("Questo implica che…"); completare dalle slide 2.4 e 7.2.
- ET5 e ET6 (e gli altri ET) sono miei, non tratti dalle fonti: controllare con le slide.
