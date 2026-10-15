# Flashcard - Logica Matematica
Formato D/R. Appello 2027-02-08; soglia: 18/32 con almeno 10 nel 1° esercizio (risposta multipla, ogni opzione V/F indipendente). [INT] = esempio/ET integrato da me negli appunti, non dalle fonti. [DA VERIFICARE] = punto dubbio negli appunti.

## 01 - Logica proposizionale

D: Quando è falsa A→B?
R: Solo con A=1 e B=0. Se A=0 è vera per verità vacua (nessun nesso causale richiesto).

D: Come si traduce "A ma B" / "A però B"?
R: A∧B.

D: ∨ è inclusivo o esclusivo? Come si esprime A⊕B?
R: ∨ è inclusivo. A⊕B ≡ ¬(A↔B).

D: Valutazione aritmetica dei connettivi (v in {0,1})?
R: v(¬P)=1-v(P); ∧=min; ∨=max; v(P→Q)=max{1-v(P),v(Q)}; v(P↔Q)=1-|v(P)-v(Q)|.

D: Quante righe ha la tavola con k lettere? Regola di metodo per le conseguenze?
R: 2^k righe. Una SOLA tavola con le colonne di premesse e conclusione (mai tavole separate).

D: Equivalenze dell'implicazione?
R: A→B ≡ ¬A∨B ≡ ¬B→¬A (contronominale); ¬(A→B) ≡ A∧¬B.

D: Leggi di De Morgan?
R: ¬(A∧B) ≡ ¬A∨¬B; ¬(A∨B) ≡ ¬A∧¬B.

D: A→B equivale a B→A?
R: No. Controesempio A=0, B=1 (1 vs 0). Equivale solo alla contronominale ¬B→¬A. [INT]

D: A↔B come si riscrive?
R: (A→B)∧(B→A).

D: (A→B)∧(A→C) a cosa equivale?
R: A→(B∧C).

D: Quali insiemi di connettivi sono funzionalmente completi?
R: {¬,∨}, {¬,∧}, {¬,→}; NAND e NOR da soli. NON completi: {¬,↔} e {¬,⊕}.

D: Come si esprime ¬P e P∧Q con il solo NAND?
R: ¬P ≡ P⊼P; P∧Q ≡ (P⊼Q)⊼(P⊼Q).

D: Modus ponens, legge della disgiunzione, ex falso?
R: P→Q, P ⊧ Q; P∨Q, ¬P ⊧ Q; P∧¬P ⊧ Q (vacuamente vera: nessuna interpretazione rende vere le premesse).

D: Come si costruisce Prop(L)?
R: Prop0 = atomi (A); Prop(n+1) = Prop(n) ∪ {(¬P)} ∪ {(P□Q)}; Prop(L) = unione di tutti gli stadi.

D: Altezza ht(P): valori e regola?
R: Atomo 0; negazione +1; binario = max{ht}+1 (NON la somma). ht = altezza dell'albero - 1.

D: Lunghezza lh: quanto vale per un atomo e che proprietà ha?
R: lh((A))=3; lh è sempre multiplo di 3 (induzione su ht). Se lh non è multiplo di 3 la stringa non è formula.

D: Come si trova il connettivo principale di una stringa?
R: Secondo simbolo ¬ -> negazione. Se "(", contatore parentesi fino alla ")" che chiude (torna a 0): il simbolo subito dopo è il connettivo principale.

D: Priorità e associatività dei connettivi nella scrittura abbreviata?
R: ¬ > ∧ > ∨ > → > ↔, associazione a destra: A→B→C ≡ A→(B→C). ¬A∨B ≠ ¬(A∨B).

D: Cos'è un'interpretazione e una valutazione?
R: i: L→{0,1} sulle lettere; i* è la sua estensione unica a tutte le formule (composizionalità). i*(P) dipende solo dalle lettere che occorrono in P (irrilevanza).

D: Quando i è modello di P? E di un insieme Γ?
R: i ⊧ P se i*(P)=1. i ⊧ Γ se soddisfa ogni elemento di Γ (per Γ finito = la congiunzione).

D: Γ={A,¬A}: ogni elemento è soddisfacibile. L'insieme?
R: Insoddisfacibile. Soddisfacibilità dei singoli elementi non implica quella dell'insieme.

D: Tautologia, soddisfacibile, contraddizione in base alla colonna finale?
R: Tautologia = tutta 1; soddisfacibile = almeno un 1; contraddizione = tutta 0. Ogni tautologia è soddisfacibile; "non contraddizione" ≠ "tautologia".

D: Definizione di Γ ⊧ Q e come si confuta?
R: Ogni interpretazione che rende vere tutte le premesse rende vera Q. Si confuta con un controesempio: premesse a 1, conclusione a 0.

D: Tre "ponti" tra conseguenza, validità e soddisfacibilità?
R: P1..Pn ⊧ Q ⇔ ⊧ (P1∧..∧Pn)→Q; P valida ⇔ ¬P insoddisfacibile; Γ ⊧ Q ⇔ Γ∪{¬Q} insoddisfacibile (metodo per assurdo).

D: Differenza tra ≡ e ↔?
R: ≡ è relazione tra formule (stesse colonne); ↔ è un connettivo dentro una formula. P≡Q ⇔ ⊧P↔Q ⇔ P⊧Q e Q⊧P.

D: A→B, ¬B ⊧ ¬A vale? Perché?
R: Sì (modus tollens). Per assurdo: A=1 e B=0 (da ¬B) rendono falsa A→B, contraddizione. [INT]

D: A→B, B→C ⊧ A→C vale?
R: Sì (sillogismo ipotetico). Se A=1, C=0: da A→B si ha B=1 ma allora B→C=0. [INT]

D: A∨(B→C) ⊧ A∧B? 
R: No. Controesempio A=B=C=0 (premessa 1, conclusione 0).

D: {A∨B, ¬A∨C} ⊧ B∨C?
R: Sì (risoluzione). Se B=C=0 allora A=1 e A=0, impossibile. [INT]

D: ((A→¬B)∧(B→¬A))→(A∨B) è tautologia?
R: No. Controesempio A=B=0.

D: ((C→A)∧¬B)→(A∨B): classificazione?
R: Vera ovunque tranne A=B=C=0: soddisfacibile, non tautologia.

D: Errore del Formulario sulla soddisfacibilità di un insieme?
R: Dice "un'unica interpretazione": serve ALMENO UNA interpretazione che renda vere tutte le formule. [DA VERIFICARE]

## 02 - Insiemi, relazioni, funzioni

D: Principio di estensionalità e come si prova A=B?
R: A=B ⇔ ∀x(x∈A↔x∈B). Si prova con la doppia inclusione A⊆B e B⊆A. Ordine e ripetizioni non contano.

D: Appartenenza vs inclusione? ∅ e inclusione?
R: 1∈ℕ ma pari ⊆ ℕ. ∅⊆A per ogni A (verità vacua).

D: Corrispondenza connettivi-operazioni insiemistiche?
R: ∩ ↔ ∧; ∪ ↔ ∨; A∖B = x∈A∧x∉B; A△B=(A∪B)∖(A∩B); A^C=U∖A.

D: Unione e intersezione di famiglia (Ai)i∈I?
R: ∪ = {x | ∃i x∈Ai}; ∩ = {x | ∀i x∈Ai}.

D: De Morgan per insiemi?
R: (A∪B)^C = A^C∩B^C; (A∩B)^C = A^C∪B^C. (La fonte scrive ∩ nel secondo: refuso.) [DA VERIFICARE]

D: Come si confuta un'identità insiemistica con la tavola di verità?
R: La riga con esito F indica il tipo di punto x controesempio. Es. A∩(B∪C) ≠ A∪(B∩C): A={1}, B=C=∅ -> sx=∅, dx={1}. [INT]

D: |P(A)| se |A|=n? P({1}) e P(P({1}))?
R: 2^n. Con A={1}: P(A)={∅,A}; P(P(A))={∅,{∅},{A},{∅,A}}.

D: Prodotto A×B e A^n?
R: A×B = coppie ordinate ((0,1)≠(1,0)); A^n = n-uple.

D: Definizione di relazione n-aria e di dom, rng, inversa?
R: Sottoinsieme di A0×..×A(n-1). dom(R)={a|∃b aRb}; rng(R)={b|∃a aRb}; R⁻¹={(b,a)|(a,b)∈R}.

D: Definisci riflessiva, simmetrica, antisimmetrica, transitiva, irriflessiva.
R: ∀x xRx; xRy→yRx; xRy∧yRx→x=y; xRy∧yRz→xRz; ∀x¬xRx.

D: Antisimmetria è il contrario di simmetria?
R: NO. Una relazione può essere simmetrica e antisimmetrica (la sola diagonale), oppure nessuna delle due.

D: Preordine, ordine parziale, ordine stretto, equivalenza?
R: Preordine = rifl+trans; ordine = rifl+antisim+trans; ordine stretto = irrifl+trans; equivalenza = rifl+sim+trans.

D: "Avere intersezione non vuota" tra insiemi: che proprietà ha?
R: Riflessiva e simmetrica, non transitiva.

D: Ortogonalità tra rette: proprietà? Parallelismo?
R: Ortogonalità: simmetrica, né riflessiva né transitiva. Parallelismo: equivalenza.

D: Equivalenza e partizione: cosa corrisponde?
R: Classi [a]={x|xEa} formano una partizione (blocchi non vuoti, disgiunti, unione = A); quoziente A/E = insieme delle classi. Ogni partizione dà un'equivalenza.

D: R su ℤ: xRy ⇔ 3 | x-y. Che relazione è? Quante classi?
R: Equivalenza (rifl: 0; sim: x-y→y-x; trans: somma). 3 classi [0],[1],[2]; ℤ/R ha 3 elementi. [INT]

D: R={(1,1),(1,2),(2,2)} su {1,2}?
R: Riflessiva, antisimmetrica, transitiva: ordine; non simmetrica. [INT]

D: Divisibilità in ℕ: minimo e massimo?
R: 1 è minimo, 0 è massimo (ogni numero divide 0).

D: Regole del diagramma di Hasse?
R: Punti = elementi; linea tra x e y (y sopra) solo se y copre x. Si omettono cappi e archi derivati dalla transitività.

D: Coperture di Div(20)?
R: 1-2, 1-5, 2-4, 2-10, 5-10, 4-20, 10-20. [INT]

D: Hasse di Div(105)?
R: Coperture 1-3,1-5,1-7; 3-15,3-21; 5-15,5-35; 7-21,7-35; 15-105,21-105,35-105: cubo booleano (3 primi). [INT]

D: Quando f: A→B è funzione?
R: Totalità (∀a∃b) e univocità (un solo b per ogni a).

D: Dominio, codominio, immagine: differenza?
R: Dominio A, codominio B, immagine rng(f)={f(a)} ⊆ B. La suriettività dipende dal codominio dichiarato.

D: f[C] e f⁻¹[D]?
R: f[C] immagine di C⊆A; f⁻¹[D]={a|f(a)∈D} è sempre un insieme (anche vuoto). f⁻¹(b) è ambigua: evitarla.

D: (g∘f)(x) con f=x², g=2x+3?
R: 2x²+3; (g∘f)(2)=11.

D: Perché la sottrazione non è operazione su ℕ? E ⟨ℕ,−⟩ è struttura?
R: 3-5∉ℕ: non è chiusa/totale. Non è L-struttura. Su ℤ invece sì.

D: Definisci iniettiva, suriettiva, biettiva.
R: Inj: f(a1)=f(a2)⇒a1=a2 (al più una freccia in arrivo); surj: ∀b∃a f(a)=b; bij: entrambe, esiste l'inversa f⁻¹.

D: Test grafico di iniettività e suriettività?
R: Retta orizzontale taglia il grafico in al più un punto = inj; in almeno un punto = surj.

D: Iniettiva e suriettiva coincidono?
R: Solo tra insiemi finiti di pari cardinalità (cassetti). Nell'infinito no: n↦n+1 in ℕ è inj non surj; + : ℕ²→ℕ è surj non inj.

D: f(x)=3x+4 ℝ→ℝ?
R: Biettiva. 

D: h(x)=2|x| ℝ→ℝ?
R: Né iniettiva (h(1)=h(-1)) né suriettiva (niente negativi).

D: k(x)=-2|x| ℝ→ℝ?
R: Non iniettiva; suriettiva sul codominio ≤0 (b≤0 ← x=-b/2), ma NON suriettiva come ℝ→ℝ. Attenzione al codominio dichiarato.

D: g: ℚ→ℝ, g(x)=3x+4: controesempio corretto di non suriettività?
R: 4+3√2 (irrazionale) non è raggiunto. Il controesempio 1/2 degli Esercizi è sbagliato (x=-7/6∈ℚ). [DA VERIFICARE]

D: Vero o falso: f iniettiva e B finito ⇒ A finito?
R: Vero. Anche: f suriettiva e A finito ⇒ B finito.

D: Vero o falso: f iniettiva ⇒ ogni controimmagine ha esattamente un elemento?
R: Falso (può essere vuota). Falso anche: f iniettiva e B infinito ⇒ A infinito.

D: Equivalenza indotta da f: X→Y?
R: x1 R_f x2 ⇔ f(x1)=f(x2); proiezione canonica X→X/R_f. Per x² le classi sono {r,-r}; per la congruenza mod n z1≡z2 mod n.

## 03 - Cardinalità e induzione

D: Quando X ≃ Y (equipotenti)? E |X|≤|Y|?
R: ≃: esiste una biezione (relazione di equivalenza). |X|≤|Y|: esiste un'iniezione X→Y (per X≠∅ equivale a una suriezione Y→X).

D: Enuncia Cantor-Schröder-Bernstein.
R: Se |X|≤|Y| e |Y|≤|X| allora |X|=|Y|. Utile perché due iniezioni sono più facili di una biezione (es. [0,1] e (0,1)).

D: Idea della prova di CSB?
R: Date f:X→Y, g:Y→X, F(A)=g[Y∖f[X∖A]] è monotona su P(X) (reticolo completo); per Tarski-Knaster ha un punto fisso A; biezione = f su A, g⁻¹ fuori da A. [la prova completa nelle fonti è troncata] [DA VERIFICARE]

D: Definizione di insieme finito e caratterizzazione dell'infinito?
R: Finito = equipotente a {0..n-1}. Infinito = non finito: ha una biezione con un suo sottoinsieme proprio e contiene una copia di ℕ.

D: Quali sono numerabili: ℕ, ℤ, ℚ, ℕ×ℕ, primi?
R: Tutti numerabili. ℤ: 0,-1,1,-2,2..; ℕ×ℕ: diagonale; ℚ: suriezione da ℤ×ℕ*.

D: Biezione ℤ↔ℕ?
R: f(n)=n/2 se n pari, -(n+1)/2 se dispari. [INT]

D: Perché ℚ è numerabile (via CSB)?
R: ℚ≾ℤ×ℕ* con p/q↦(p,q) in forma ridotta (iniettiva) e ℕ⊆ℚ; poi CSB. [INT]

D: Cardinalità di ℝ, P(ℕ), {0,1}^ℕ, ℕ^ℕ, [a,b], ℝ²?
R: Tutti il continuo = |P(ℕ)|, più che numerabili.

D: Sequenze finite vs infinite su un alfabeto?
R: Finite (A*, ℕ^{<ℕ}, programmi Java) numerabili, codifica f(<m0..mk>)=p0^{m0+1}·..·pk^{mk+1}. Infinite A^ℕ con |A|≥2: continuo.

D: Quali operazioni preservano la numerabilità e quali regole su A infinito?
R: Prodotto, unione e intersezione di numerabili sono numerabili. A infinito, |B|≤|A| ⇒ |A×B|=|A|; A infinito, B finito ⇒ |A∖B|=|A| (A∖B infinito).

D: Enuncia il principio dei cassetti.
R: Se m>n oggetti sono in n cassetti, un cassetto ne contiene almeno 2.

D: Teorema di Cantor e sua prova?
R: |X|<|P(X)|. Se g:X→P(X) fosse suriettiva, Y={x|x∉g(x)}=g(x̄) darebbe x̄∈Y⇔x̄∉Y: assurdo.

D: Perché |ℝ|=|P(ℕ)|?
R: ℝ≾P(ℚ) via r↦{q∈ℚ|q<r} (iniettiva per densità di ℚ); P(ℕ)≾ℝ; poi CSB. ℝ²≃ℝ intrecciando i decimali (0,499..=0,500.. risolto con CSB).

D: Funzioni ℕ→{0,1}: cardinalità e diagonale?
R: Continuo (≃P(ℕ) via funzione caratteristica). Dato un elenco f0,f1,.., g(n)=1-f_n(n) differisce da ogni f_n. [INT]

D: Ogni sottoinsieme infinito S⊆ℕ è numerabile: perché?
R: s0=min S, s_{k+1}=min(S∖{s0..sk}) (principio del minimo): k↦s_k è biezione. [INT]

D: Schema dell'induzione semplice.
R: Base P(0) + passo ∀n(P(n)→P(n+1)) (P(n) ipotesi induttiva, P(n+1) tesi) ⇒ ∀n P(n). Base può partire da k, passo per n≥k.

D: Induzione forte?
R: ∀n(∀m<n P(m) → P(n)) ⇒ ∀n P(n). Adatta quando il passo usa casi molto più piccoli di n-1 (es. fattorizzazioni).

D: Principio del minimo e uso?
R: Ogni A⊆ℕ non vuoto ha minimo (≡ nessuna catena discendente infinita). Per terminazione dei cicli: funzione variante in ℕ strettamente decrescente.

D: Induzione strutturale?
R: Per insiemi definiti ricorsivamente (Prop(L), Term, Fml): proprietà vera sugli atomi e trasmessa dalle regole di costruzione; equivale all'induzione su ht.

D: Invariante di ciclo; correttezza parziale vs totale?
R: Per while(b) S: proprietà vera prima del ciclo e preservata da S. Parziale = se termina, output corretto; totale = termina ed è corretto. Divisione per sottrazioni: X=q·D+r.

D: Σ_{i=0}^n i e Σ_{i=0}^n (2i+1)?
R: n(n+1)/2 (passo: n(n+1)/2+(n+1)=(n+1)(n+2)/2) e (n+1)² (passo: (n+1)²+2(n+1)+1=(n+2)²).

D: Induzione: 3 | n³-n.
R: (n+1)³-(n+1) = (n³-n)+3(n²+n) = 3k+3(n²+n), divisibile per 3.

D: 2n+1<2^n: per quali n vale e come si prova?
R: Falsa per n=0,1,2; vera ∀n≥3. Base P(3): 7<8. Passo: 2(n+1)+1=(2n+1)+2<2^n+2≤2^n+2^n=2^{n+1} (2^n≥2). Trappola: la base parte da 3.

D: 16^n termina in 6 (n≥1): passo?
R: 16^{n+1}=16^n·16, ultima cifra 6·6=36 -> 6. [INT]

D: Ogni n≥2 è prodotto di primi: schema di prova?
R: Induzione forte / minimo controesempio: n composto, n=m·l con m,l<n, ciascuno prodotto di primi -> contraddizione.

D: Dove fallisce la "dimostrazione" induttiva sulle n rette per un punto?
R: Nel passo da n=2 a n=3: le due sotto-famiglie non condividono due rette. Il passo non regge per i primi n.

D: Ricoprimento di un quadrato 2^n senza un quadretto con tessere a L?
R: Si divide in 4 blocchi 2^{n-1}, una tessera L al centro (tocca i 3 blocchi senza buco) e si applica l'ipotesi induttiva ai 4 blocchi.

## 04 - Logica del primo ordine

D: Componenti di un linguaggio del primo ordine?
R: L = Const ∪ Fun ∪ Rel (con arietà), variabili Vbl, uguaglianza =, connettivi ¬∧∨→↔, quantificatori ∀∃.

D: Differenza fondamentale tra termini e formule?
R: I termini denotano ELEMENTI (variabili, costanti, f(t1..tk)); le formule hanno valore di verità. Una relazione non costruisce termini: f(R(x,y)) è un errore.

D: Formule atomiche?
R: R(t1..tn) con n=ar(R), oppure t1=t2.

D: Come si riconosce se una stringa senza virgole è un termine?
R: Primo simbolo variabile/costante = primo argomento; se è funzione h, l'argomento arriva alla ")" che bilancia h; si ripete per ar(f) argomenti. Arietà violata (f(xx) con ar f=1) -> non è termine.

D: Cosa sono i termini in L={+,·,1}?
R: I polinomi a coefficienti in ℕ: +(+(·(x,x),·(+(1,1),x)),1) è x²+2x+1; 3 = 1+(1+1).

D: Priorità in FOL?
R: ¬,∀,∃ legano più di tutti ma solo la formula atomica o parentesizzata seguente; poi ∧,∨; poi →,↔ (associazione a destra). ∀zP(z)→Q(z) = (∀zP(z))→Q(z); serve ∀z(P(z)→Q(z)). [DA VERIFICARE se ∧ e ∨ si possono mescolare senza parentesi]

D: Occorrenza libera o vincolata?
R: Si parla di occorrenze, non di lettere: vincolata se subito dopo ∀/∃ o nel raggio di un quantificatore su quella variabile. La stessa lettera può essere libera e vincolata nella stessa formula.

D: Calcolo ricorsivo di FV?
R: Atomica: tutte le variabili; FV(¬ψ)=FV(ψ); FV(ψ□χ)=FV(ψ)∪FV(χ); FV(∀xψ)=FV(∃xψ)=FV(ψ)∖{x}.

D: Cos'è un enunciato? Cosa significa φ(x1..xn)?
R: Formula con FV=∅ (a cui ha senso chiedere se vale in una struttura). φ(x1..xn) significa FV(φ)⊆{x1..xn} (limite superiore).

D: FV e ht di (∀x(P(x,y)→∃z R(z,x)))∨S(z)?
R: FV={y,z} (z di S(z) libera, z di R(z,x) vincolata). ht=4. [INT]

D: Definizione di L-struttura.
R: Dominio A≠∅; ogni relazione R -> R^A⊆A^n; ogni funzione f -> f^A:A^n→A TOTALE; ogni costante c -> c^A∈A. ⟨ℕ,−⟩ non è struttura.

D: Come si valuta un termine in una struttura con assegnazione?
R: Variabile = elemento assegnato; costante c^A; f(t1..tk) = f^A(t1^A,..,tk^A). Dipende solo dalle variabili che occorrono.

D: Quando A ⊧ ∃yψ e A ⊧ ∀yψ?
R: ∃: esiste b∈A tale che ψ è vera sostituendo b a y; ∀: per ogni b∈A. L'assegnazione data a y viene ignorata (sovrascritta).

D: Quali occorrenze contano nell'assegnazione?
R: Solo quelle LIBERE. In ∃z(P(x,z)∧P(z,y)) in ⟨ℕ,<⟩ con 2/x, 4/y, 4/z: vera con z=3; 4/z non conta.

D: Definisci validità, soddisfacibilità, insoddisfacibilità in FOL.
R: Valida (⊧φ): vera in OGNI struttura; soddisfacibile: esiste A⊧φ; insoddisfacibile: nessuna. Γ ⊧ φ: ogni A⊧Γ ha A⊧φ (Γ anche infinito).

D: Tre usi di ⊧ in FOL?
R: A⊧φ[ā/x̄] (soddisfazione), ⊧φ (validità), Γ⊧φ (conseguenza).

D: Ponti in FOL?
R: φ valida ⇔ ¬φ insoddisfacibile; Γ⊧φ ⇔ Γ∪{¬φ} insoddisfacibile; ψ1..ψn⊧φ ⇔ ⊧(ψ1∧..∧ψn)→φ; φ≡ψ ⇔ stessi modelli ⇔ ⊧φ↔ψ.

D: Metodo di dimostrazione in FOL (nessuna tavola di verità)?
R: Soddisfacibilità, non-validità, non-conseguenza: si ESIBISCE una struttura (modello/contromodello). Validità e conseguenza: argomento generale PER OGNI struttura.

D: Negazione dei quantificatori?
R: ¬∀xP ≡ ∃x¬P; ¬∃xP ≡ ∀x¬P.

D: ∃ distribuisce su ∧? ∀ su ∨?
R: ∃x(P∧Q) ⊧ ∃xP∧∃xQ ma non viceversa. ∀ distribuisce su ∧ con equivalenza; su ∨ vale solo (∀xP∨∀xQ) ⊧ ∀x(P∨Q) (tutti pari o dispari, non tutti pari o tutti dispari). ∃ distribuisce su ∨ con equivalenza.

D: Controesempio a ∃xP(x)∧∃xQ(x) ⊧ ∃x(P(x)∧Q(x))?
R: A=⟨{0,1}, P={0}, Q={1}⟩: ∃xP∧∃xQ è vera ma ∃x(P∧Q) è falsa. [INT]

D: ∀x∃y x<y e ∃y∀x x<y in ⟨ℕ,<⟩? Che ne segue?
R: Prima vera (y=x+1), seconda falsa (nessun massimo, nemmeno y<y). Quindi ∀x∃yP ⊭ ∃y∀xP; contromodello ⟨ℕ,<⟩. L'implicazione inversa ∃y∀x ⊧ ∀x∃y vale.

D: ∃z(x<z∧z<y) in ⟨ℕ,<⟩ con 2/x, 3/y; poi con 2/x, 4/y?
R: Falsa (nessun n con 2<n<3); vera con 4 (n=3). [INT]

D: ∀x∀y∃z(z+y=x): in ℤ, ℕ, ℤ con + letto come prodotto?
R: Vera in ℤ; falsa in ℕ (manca la sottrazione); falsa in ℤ con prodotto.

D: ∃x∀y P(x,y) in ⟨ℕ,≤⟩, ⟨ℤ,≤⟩, ⟨ℕ,≥⟩?
R: Vera in ⟨ℕ,≤⟩ (x=0); falsa in ⟨ℤ,≤⟩ (nessun minimo) e in ⟨ℕ,≥⟩ (nessun massimo).

D: Densità ∀x∀y(R(x,y)→∃z(z≠x∧z≠y∧R(x,z)∧R(z,y))): dove vale?
R: Vera in ⟨ℝ,<⟩, falsa in ⟨ℤ,<⟩.

D: ∀x R(x,x) è valida? Soddisfacibile?
R: Soddisfacibile (⟨ℕ,≤⟩), non valida (⟨ℕ,<⟩). [INT]

D: ∀y∃x f(x)=y: valida?
R: Soddisfacibile (f identità) ma non valida (f costante in un dominio con 2 elementi).

D: Assiomi di equivalenza e di ordine come enunciati?
R: Equivalenza: ∀xR(x,x), ∀x∀y(R(x,y)→R(y,x)), trans. Ordine: rifl, antisim ∀x∀y(R(x,y)∧R(y,x)→x=y), trans. Indipendenza: ⟨ℕ,≤⟩ soddisfa rifl+trans ma non sim.

D: Enunciato di primalità in L={f,c}: φ: ∀x∀y(f(x,y)=c→∀z f(x,z)=z ∨ ∀z f(y,z)=z)?
R: Vera in ⟨ℕ,·,17⟩, falsa in ⟨ℕ,·,12⟩. ∀z f(x,z)=z definisce x=1.

D: Linearità ∀x∀y(R(x,y)∨R(y,x)) in ⟨Div(k),|⟩: per quali k vale?
R: Se e solo se k è potenza di un primo: per 1≤k≤10, k∈{1,2,3,4,5,7,8,9}; non per 6 e 10.

D: ∀x∃y(x<y) ∧ irriflessività ∧ transitività: modelli?
R: Soddisfacibile (⟨ℕ,<⟩) ma senza modelli finiti. [INT]

D: ET: ∀x(S(x)→P(x)), ∀x(A(x,c)→S(x)) ⊧ ∀x(A(x,c)→P(x))?
R: Sì. Sia A⊧premesse, a con A(a,c): dalla 2ª S(a), dalla 1ª P(a). Vale per ogni A e a. [INT]

## 05 - Formalizzazione

D: Procedura di formalizzazione?
R: 1) Fissa linguaggio e universo (se universo ℝ serve N(x) per ℕ). 2) Costanti = nomi propri, predicati = proprietà/legami, funzioni. 3) Traduci con le regole d'oro e controlla le variabili libere. 4) Se manca una costante, de-sugaring (2 = 1+1).

D: Traduzione di "Ogni P è Q" e "Esiste un P che è Q"?
R: ∀x(P(x)→Q(x)) e ∃x(P(x)∧Q(x)).

D: Perché ∀x(P∧Q) e ∃x(P→Q) sono quasi sempre errori?
R: ∀x(P∧Q) dice che TUTTO è P; ∃x(P→Q) è banalmente vera appena c'è un elemento non-P.

D: "Nessun P è Q"?
R: ∀x(P(x)→¬Q(x)) ≡ ¬∃x(P(x)∧Q(x)).

D: "Non tutti i P sono Q"?
R: ∃x(P(x)∧¬Q(x)). Diverso da "tutti i P sono non-Q".

D: "Arbitrariamente grandi" vs "sufficientemente grandi" per P?
R: Arbitrariamente: ∀x∃y(x<y∧P(y)). Sufficientemente: ∃x∀y(x<y→P(y)).

D: Quando serve il predicato di restrizione?
R: Solo se l'universo è più grande del dominio dell'enunciato (es. universo ℝ e frase su ℕ).

D: "x è pari" e "x è dispari" in ⟨ℕ,+⟩?
R: ∃y(x=y+y); ¬∃y(x=y+y).

D: Come definire "x è zero" in ⟨ℕ,+⟩ e "x è uno" in ⟨ℕ,·⟩?
R: ψ0(x): ∀y(x+y=y); ψ1(x): ∀y(x·y=y).

D: "x è primo" in ⟨ℕ,+,·⟩?
R: ¬ψ0(x)∧¬ψ1(x)∧∀y∀z(y·z=x→y=x∨z=x).

D: "x è primo" in ⟨ℕ,·,1⟩ e in ⟨ℕ,1,<,+,|⟩?
R: ¬(x=1)∧∀y∀z(y·z=x→y=1∨z=1); 1<x∧∀y(y|x→y=1∨y=x).

D: "z = sup{x,y}" come formula?
R: ψ(x,y,z)∧∀w(ψ(x,y,w)→z≤w), con ψ = x≤z∧y≤z (maggiorante). Sup = minimo dei maggioranti.

D: "Ogni primo >2 è dispari" senza la costante 2?
R: ∀x(1+1<x∧pr(x)→¬((1+1)|x)).

D: "Ogni elemento non nullo ha inverso" (in ·)?
R: ∀x(¬∀z(z·x=x)→∃y∀z((y·x)·z=z)).

D: "Almeno due P" e "almeno tre P"?
R: ∃x∃y(x≠y∧P(x)∧P(y)); ∃x∃y∃z(x≠y∧x≠z∧y≠z∧P(x)∧P(y)∧P(z)).

D: "Al più uno P" e "esiste un unico P"?
R: ∀x∀y(P(x)∧P(y)→x=y); ∃x(P(x)∧∀y(P(y)→y=x)).

D: "Al più 2 Q" ed "esattamente 2"?
R: Al più 2: ¬∃x∃y∃z(distinti∧Q(x)∧Q(y)∧Q(z)). Esattamente 2 = almeno 2 ∧ al più 2.

D: f iniettiva e f suriettiva come enunciati?
R: ∀x∀y(f(x)=f(y)→x=y); ∀y∃x f(x)=y.

D: Parentele con B(x,y)=x genitore di y: fratelli y,z?
R: ∃x(B(x,y)∧B(x,z)∧y≠z).

D: Nonno x di y; zio y di z?
R: Nonno: ∃w(B(x,w)∧B(w,y)). Zio y di z: ∃w∃x(B(w,z)∧B(x,w)∧B(x,y)∧w≠y)∧D(y) (zia: ¬D(y)).

D: Primo tra due quadrati consecutivi (L={·,<,1,+,P})?
R: ∀x(1<x→∃z(P(z)∧x·x<z∧z<(x+1)·(x+1))).

D: "Ogni naturale ≠0 è somma di due naturali distinti" in ℕ e in ℝ?
R: ℕ: ∀x(x≠0→∃y∃z(y≠z∧y+z=x)). In ℝ servono N(x), N(y), N(z).

D: Ladro gentiluomo: ∀x(L(x)→¬O(x)) ∧ ∃x(L(x)∧G(x)∧O(x)) è coerente?
R: No: le due parti sono contraddittorie (nessun ladro onesto contro un ladro gentiluomo onesto).

D: Goldbach in L={+,·,<,1,P}?
R: ∀x((∃y x=y+y)∧(1+1)<x → ∃u∃v(P(u)∧P(v)∧x=u+v)). [INT]

D: "Esiste un massimo" (L={R}, massimo = R(y,x)) e sua negazione?
R: ∃x∀y R(y,x). Negazione: ∀x∃y¬R(y,x). [INT] [DA VERIFICARE]

D: "Chi studia passa" (S→P): contronominale e trappola?
R: Contronominale ¬P→¬S. NON equivale a ¬S→¬P. [INT]

D: Costante o funzione per "capoufficio"/"Donatella"?
R: Dipende dalla struttura: Donatella (nome proprio) = costante c; capoufficio di x = funzione c(x).

D: Equivalenza utile per spostare quantificatori?
R: ∀x∀y∀z(G(y,x)∧G(z,y)→A(x,z)) ≡ ∀x∀y(∃z(G(z,x)∧G(y,z))→A(x,y)).

D: Massimo/minimo/due predecessori distinti da un Hasse?
R: Massimo: ∀y(y≤x); minimo: ∀y(x≤y); due predecessori: ∃y∃z(y≠z∧R(y,x)∧R(z,x)). Strategia: a strati partendo da minimo e massimo.

D: Retta per due punti distinti, esistenza e unicità?
R: ∀x∀y(P(x)∧P(y)∧x≠y→∃z(R(z)∧Q(x,z)∧Q(y,z)∧∀w(R(w)∧Q(x,w)∧Q(y,w)→z=w))).

## 06 - Ordini e reticoli

D: Definizione di sup e inf di X⊆P.
R: Maggiorante = p ≥ ogni x∈X. sup X = MINIMO dei maggioranti (unico, se esiste); inf X = massimo dei minoranti.

D: Quando il sup non esiste?
R: Se l'insieme dei maggioranti non ha minimo. Es. {a,b,c,d}, a,b<c,d con c,d incomparabili: {a,b} ha maggioranti {c,d} senza minimo, non è reticolo. [INT]

D: Definizione di reticolo; esempi?
R: Poset non vuoto in cui ogni coppia ha sup (join ∨) e inf (meet ∧). Esempi: catene, Div(n) (mcm, MCD), P(X) con ⊆ (∪,∩).

D: Come ordine e operazioni si determinano a vicenda?
R: x≤y ⇔ x∧y=x ⇔ x∨y=y.

D: Principio di dualità?
R: R⁻¹ dà il poset duale; un enunciato valido in tutti i reticoli vale anche col duale (scambiando ∧↔∨ e invertendo ≤).

D: Due assiomatizzazioni del reticolo?
R: L_ord: rifl, antisim, trans + esistenza di sup e inf. L_ret: commutatività e associatività di ∧,∨ + assorbimento (x∨y)∧y=y, (x∧y)∨y=y.

D: Reticolo completo; Dedekind; ℝ?
R: Completo: sup X e inf X esistono per OGNI X⊆P (anche vuoto/infinito); ogni reticolo finito è completo. Dedekind (totali): ogni X≠∅ limitato ha sup. ⟨ℝ,≤⟩ è Dedekind-completo ma NON reticolo completo; [a,b] sì.

D: ⟨ℚ∩[0,1],≤⟩ è reticolo completo?
R: È reticolo (totale) ma non completo: X={q|q²<1/2} non ha sup in ℚ. [INT]

D: Enuncia Tarski-Knaster.
R: P reticolo completo, f:P→P monotona ⇒ f ha almeno un punto fisso.

D: Dimostrazione di Tarski-Knaster?
R: A={x|x≤f(x)}, a=sup A. x∈A ⇒ x≤a ⇒ x≤f(x)≤f(a), quindi a≤f(a). Per monotonia f(a)≤f(f(a)), cioè f(a)∈A, quindi f(a)≤a. Antisimmetria: f(a)=a.

D: f(n)=n+1 su ℕ: contraddice Tarski-Knaster?
R: No: ⟨ℕ,≤⟩ non è reticolo completo (manca sup di ℕ). Su [0,1] ogni f monotona ha punto fisso. [INT]

D: Monotona, antitona, omomorfismo di reticoli?
R: Monotona: x≤y⇒f(x)≤f(y); antitona: f(y)≤f(x). Omomorfismo: f(a∧b)=f(a)∧f(b), f(a∨b)=f(a)∨f(b) (implica monotona); isomorfismo = omomorfismo biettivo.

D: Sottoreticolo e sottoreticolo completo: trappola?
R: Sottoreticolo = chiuso per ∧,∨ di R. S sottoreticolo e reticolo completo NON implica sottoreticolo completo (sup_R(X)≤sup_S(X) per X infinito).

D: Distributività: leggi e semplificazione?
R: x∧(y∨z)=(x∧y)∨(x∧z) e x∨(y∧z)=(x∨y)∧(x∨z); basta che valga una delle due (ciascuna implica l'altra).

D: In ogni reticolo vale (x∧y)∨(x∧z) ≤ x∧(y∨z)?
R: Sì: x∧y≤x∧(y∨z) e x∧z≤x∧(y∨z), quindi anche il sup. L'altra disuguaglianza richiede la distributività. [INT]

D: Teorema di Birkhoff?
R: Un reticolo è distributivo ⇔ non contiene sottoreticoli isomorfi a N5 (pentagono) o M3 (diamante con 3 atomi incomparabili). Div(n) e P(X) sono distributivi.

D: Div(12): elementi, 4∨6, 4∧6, 2∨3? Distributivo?
R: 1,2,3,4,6,12. 4∨6=mcm=12; 4∧6=MCD=2; 2∨3=6. Reticolo distributivo. [INT]

D: Div(30) è distributivo?
R: Sì (Div(n) lo è sempre; Div(30) è il cubo booleano su 2,3,5).

D: Somma disgiunta P⊔Q è un reticolo?
R: Mai (se P,Q non vuoti): mancano i sup tra elementi di P e di Q.

D: Somma lineare P⊕Q e prodotto P×Q?
R: P⊕Q: P sotto Q, è reticolo se lo sono P e Q. P×Q: (p,q)≤(p',q') ⇔ p≤p' e q≤q', operazioni componente per componente.

D: Down(P)?
R: Segmenti iniziali (y≤x∈X⇒y∈X); sottoreticolo di P(P) chiuso per ∪,∩: sempre reticolo distributivo.

D: Punti dubbi su N5 e M3 negli appunti?
R: Le etichette di N5 dipendono dal diagramma non leggibile (verificare sulle slide 7.2); la "nuance" slide 23 (diamante con vertice sdoppiato) non è ricostruita. [DA VERIFICARE]

## 07 - Trappole d'esame

D: Soglia di superamento e struttura del 1° esercizio?
R: ≥18/32 con ≥10 nel 1° esercizio (risposta multipla). Ogni opzione è V/F indipendente; "A e B" è falsa se una parte è falsa. Struttura degli altri esercizi non confermata. [DA VERIFICARE]

D: Trappola: ht binario e lh?
R: ht = max+1 (non somma); ht = altezza albero - 1; lh atomo = 3 e sempre multiplo di 3.

D: Trappola: tavole di verità per conseguenze?
R: Una sola tavola per premesse e conclusione.

D: Trappola: assegnazioni e quantificatori?
R: Contano solo le occorrenze libere; ∃z/∀z sovrascrivono il valore assegnato a z.

D: Trappola: simboli di relazione e di funzione?
R: Una relazione non costruisce termini. Una funzione deve essere totale nella struttura (⟨ℕ,−⟩ non è struttura).

D: Trappola: quantificatori e connettivi?
R: ∀ con →, ∃ con ∧. ∀x∃y ≠ ∃y∀x. In ∀zP→Q il quantificatore copre solo P.

D: Trappola: finito vs infinito (funzioni)?
R: inj⇔surj solo tra finiti di pari cardinalità. f inj e B infinito non dà A infinito; la controimmagine di una inj può essere vuota.

D: Trappola: cardinalità, riepilogo?
R: Sequenze finite numerabili, infinite continuo; ℝ, P(ℕ), ℕ^ℕ, {0,1}^ℕ stesso continuo; ℚ, ℤ, ℕ×ℕ numerabili.

D: V/F: A infinito e B finito ⇒ A∖B infinito?
R: Vero (ha ancora cardinalità |A|).

D: V/F: ∃x∀y R(x,y) ⊧ ∀y∃x R(x,y)? E il viceversa?
R: Vero (dato x0 per tutti, per ogni y prendi x0). Il viceversa è falso: R(x,y)⇔x=y su ℕ.

D: V/F: biezione tra ℚ e ℤ×ℕ?
R: Vero, entrambi numerabili.

D: V/F: sequenze infinite di {0,1} sono numerabili?
R: Falso, continuo.

D: V/F: ⟨ℕ,−⟩ è una L-struttura per L={f}, f binario?
R: Falso (non totale).

D: Trappola: divisibilità e sup?
R: 0 massimo, 1 minimo. Sup = MINIMO dei maggioranti e può non esistere.

D: Trappola: distributività?
R: Div(n) e P(X) sì; con M3 o N5 come sottoreticolo no (Birkhoff).

D: Trappola: induzione con base diversa da 0?
R: Base da k se serve (2n+1<2^n da n≥3) e verificare che il passo regga per tutti gli n della base.

D: Trappola: codominio e immagine?
R: Suriettività dipende dal codominio dichiarato: x↦-2|x| ℝ→ℝ≤0 è suriettiva, x↦2|x| ℝ→ℝ no.

D: Trappola: validità vs soddisfacibilità in FOL?
R: Validità: dimostrazione per ogni struttura; soddisfacibilità (o non-validità): un esempio (contro)modello.

D: "Esiste un massimo" vs "esiste un unico P"?
R: Massimo: ∃x∀y R(y,x). Unico P: ∃x(P(x)∧∀y(P(y)→y=x)). Non confondere: la seconda richiede "=".

D: Formalizza "infiniti primi" e "pari" in L={<,+,P} su ℕ.
R: ∀x∃y(x<y∧P(y)); x pari: ∃z(x=z+z).

D: "Ogni numero tranne un numero finito è somma di due primi"?
R: ∃x∀y(x<y→∃u∃v(P(u)∧P(v)∧y=u+v)).

D: In ⟨{0,1,2},<⟩: esiste minimo? massimo? ∀x∃y(x<y)?
R: Minimo V (x=0); massimo V (x=2); ∀x∃y x<y F (x=2 non ha y).
