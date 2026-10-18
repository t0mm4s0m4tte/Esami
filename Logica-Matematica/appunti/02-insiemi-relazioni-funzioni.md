# 02 - Insiemi, relazioni, funzioni
Fonte: Drive "Logica Matematica - Appunti" (Insiemi, Relazioni, Funzioni), "Formulario", "Sintesi", "Esercizi" (es. 1-2). (ET) = esercizio tipo svolto da me.

## Mappa

Il capitolo costruisce il vocabolario matematico che userà tutto il resto del corso. Si parte dagli insiemi (estensionalità, inclusione, operazioni, insieme potenza, prodotto), si passa alle relazioni (n-arie e binarie, le loro proprietà, equivalenze e partizioni, ordini e diagrammi di Hasse) e si arriva alle funzioni come relazioni speciali (immagine e controimmagine, iniettività, suriettività, biettività, inversa).

- [Insiemi](#insiemi)
- [Relazioni](#relazioni)
- [Funzioni](#funzioni)
- [Esempi / esercizi svolti](#esempi--esercizi-svolti)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Insiemi
Un insieme è determinato esclusivamente dai suoi elementi: è il principio di **estensionalità**, A=B ⇔ ∀x(x∈A↔x∈B). Ne segue che ordine e ripetizioni non contano ({3,2,3,-1}={-1,2,3}) e che per provare un'uguaglianza si dimostra la doppia inclusione, A=B ⇔ A⊆B e B⊆A. Occorre distinguere con cura l'appartenenza dall'inclusione: 1∈ℕ, mentre l'insieme dei pari è ⊆ℕ. L'insieme vuoto è incluso in ogni insieme per verità vacua (∅⊆A sempre). Le inclusioni numeriche ℕ⊂ℤ⊂ℚ⊂ℝ sono tutte strette (√2∈ℝ∖ℚ; si ricordi anche che 0,999…=1).

Le operazioni insiemistiche sono la traduzione dei connettivi logici:
- l'intersezione ∩ corrisponde a ∧;
- l'unione ∪ a ∨;
- la differenza ∖ a "x∈A∧x∉B";
- la differenza simmetrica △ è (A∪B)∖(A∩B);
- il complemento è A^C=U∖A.

Si estendono a famiglie arbitrarie: ∪_{i∈I}Ai={x|∃i x∈Ai} e ∩_{i}={x|∀i x∈Ai}, dove il quantificatore fa lo stesso lavoro di ∨ e ∧ su infiniti addendi. Valgono le leggi di De Morgan, (A∪B)^C = A^C∩B^C e (A∩B)^C = A^C∪B^C, e la distribuzione A∩(B∪C)=(A∩B)∪(A∩C).

Questa corrispondenza non è un'analogia: ogni tautologia proposizionale dà un'identità insiemistica, e viceversa per confutare un'identità si può usare la tavola di verità, perché la riga con esito F indica il tipo di punto x che fa da controesempio. Due costruzioni importanti completano il quadro. L'insieme potenza P(A) ha 2^n elementi se |A|=n (P({0,1,2}) ne ha 8); se A={1} si ha P(A)={∅,A} e P(P(A))={∅,{∅},{A},{∅,A}}. Il prodotto A×B è l'insieme delle coppie ordinate, per cui (0,1)≠(1,0), e A^n è l'insieme delle n-uple.

## Relazioni
Una relazione n-aria è un sottoinsieme di un prodotto A0×…×A(n-1): quella unaria è un predicato (un sottoinsieme), e una tabella di database è proprio una relazione n-aria in cui ogni riga è una n-upla. Nel caso binario si scrive a R b per (a,b)∈R; il dominio è dom(R)={a|∃b aRb}, il range è rng(R)={b|∃a aRb} e l'inversa è R⁻¹={(b,a)|(a,b)∈R}.

Per una relazione su un insieme A contano cinque proprietà:
- **riflessiva**: ∀x xRx;
- **simmetrica**: xRy→yRx;
- **antisimmetrica**: xRy∧yRx→x=y;
- **transitiva**: xRy∧yRz→xRz;
- **irriflessiva**: ∀x¬xRx.

L'antisimmetria va maneggiata con cautela, perché NON è il contrario della simmetria: una relazione può essere simmetrica e antisimmetrica insieme (la sola diagonale), oppure nessuna delle due. Combinando le proprietà si ottengono i tipi che interessano davvero:
- **preordine**: riflessiva e transitiva;
- **ordine parziale**: riflessiva, antisimmetrica, transitiva (≤, la divisibilità |, l'inclusione ⊆);
- **ordine stretto**: irriflessiva e transitiva (<);
- **equivalenza**: riflessiva, simmetrica, transitiva.

Gli esempi geometrici aiutano a ricordare le differenze: il parallelismo è un'equivalenza, "avere intersezione non vuota" è riflessiva e simmetrica ma non transitiva, l'ortogonalità è simmetrica ma né riflessiva né transitiva.

Il legame più importante è quello tra equivalenze e partizioni. Data un'equivalenza E su A, la classe di a è [a]_E={x|xEa} e l'insieme delle classi è il quoziente A/E; le classi sono blocchi non vuoti, a due a due disgiunti, la cui unione è A, cioè una partizione, e viceversa ogni partizione definisce un'equivalenza (quella "stare nello stesso blocco"). Ad esempio la congruenza mod 2 su ℤ ha due classi, [0] i pari e [1] i dispari. Un'osservazione sulla divisibilità in ℕ: è un ordine con 1 minimo e **0 massimo**, perché ogni numero divide 0.

Gli ordini si disegnano con il **diagramma di Hasse**: i punti sono gli elementi, si traccia una linea tra x e y (con y più in alto) solo quando y "copre" x, e si omettono sia i cappi sia gli archi che discendono dalla transitività. Un ordine in cui ogni coppia ha estremo superiore e inferiore è un reticolo, tema del file 06.

## Funzioni
Una funzione f: A→B è una relazione che soddisfa due condizioni, **totalità** (∀a∃b) e **univocità** (a ogni a corrisponde un solo b). Il dominio è A, il codominio è B, e l'immagine (range) rng(f)={f(a)} è un sottoinsieme del codominio: non vanno confusi, perché molte questioni (a partire dalla suriettività) dipendono dal codominio dichiarato. Per C⊆A l'immagine è f[C], per D⊆B la controimmagine è f⁻¹[D]={a|f(a)∈D}, sempre un insieme, anche se vuoto; la scrittura f⁻¹(b) è ambigua (insieme o elemento) e conviene evitarla. Si usano inoltre la restrizione f↾C e la composizione (g∘f)(a)=g(f(a)): con f=x² e g=2x+3 si ha (g∘f)(2)=11 e (g∘f)(x)=2x²+3. Un'operazione n-aria su A è una funzione f:A^n→A (chiusura): la sottrazione non è un'operazione su ℕ perché 3-5∉ℕ, lo è invece su ℤ.

Le tre proprietà fondamentali si leggono in termini di frecce:
- **iniettiva**: f(a1)=f(a2)⇒a1=a2 (al più una freccia in arrivo su ogni elemento di B);
- **suriettiva**: ∀b∃a f(a)=b (almeno una freccia);
- **biettiva**: quando valgono entrambe, nel qual caso esiste la vera funzione inversa f⁻¹.

Sul grafico cartesiano una retta verticale taglia il grafico in al più un punto se è una funzione; una retta orizzontale lo taglia in al più un punto se è iniettiva e in almeno un punto se è suriettiva.

La differenza tra finito e infinito è il tranello ricorrente. Tra insiemi finiti di pari cardinalità iniettiva e suriettiva sono equivalenti (principio dei cassetti), ma nell'infinito questo cade: n↦n+1 in ℕ è iniettiva non suriettiva, mentre la somma +:ℕ²→ℕ è suriettiva non iniettiva ((1,1) e (0,2) vanno entrambi in 2). Restano valide alcune implicazioni: se f è iniettiva e B finito allora A è finito, se f è suriettiva e A finito allora B è finito. Sono invece **false** "f iniettiva ⇒ ogni controimmagine ha esattamente un elemento" (può essere vuota) e "f iniettiva e B infinito ⇒ A infinito". Infine ogni f: X→Y induce l'equivalenza x1 R_f x2 ⇔ f(x1)=f(x2), con la proiezione canonica X→X/R_f; per la congruenza mod n si ha z1≡z2 mod n, per x² le classi sono {r,-r}.

## Esempi / esercizi svolti
1. **Hasse Div(20)** (elementi 1,2,4,5,10,20): coperture 1-2, 1-5, 2-4, 2-10, 5-10, 4-20, 10-20. (ET: ricavate da me.)
2. **Hasse Div(105)** (1,3,5,7,15,21,35,105): coperture 1-3,1-5,1-7, 3-15,3-21, 5-15,5-35, 7-21,7-35, 15-105,21-105,35-105 = cubo booleano (3 primi). (ET)
3. **Funzioni (Esercizi es. 2)**: f(x)=3x+4 ℝ→ℝ biettiva; g: ℚ→ℝ iniettiva non suriettiva; h(x)=2|x| ℝ→ℝ né iniettiva (h(1)=h(-1)) né suriettiva (niente negativi); k(x)=-2|x| ℝ→ℝ≤0 non iniettiva, suriettiva (b≤0 ← x=-b/2).
4. (ET) Dimostrare A∩(B∪C)=(A∩B)∪(A∩C): x∈sx ⇔ x∈A∧(x∈B∨x∈C) ⇔ (x∈A∧x∈B)∨(x∈A∧x∈C). Refutare A∩(B∪C)=A∪(B∩C): A={1}, B=C=∅ -> sx=∅, dx={1}.
5. (ET) R su ℤ: xRy ⇔ 3 | x-y. Rifl (0), sim (x-y→y-x), trans (somma): equivalenza; 3 classi [0],[1],[2]; ℤ/R ha 3 elementi.
6. (ET) R={(1,1),(1,2),(2,2)} su {1,2}: rifl, antisim, trans -> ordine; non simmetrica.

## Esercizi svolti collegati

Gli esercizi su insiemi, relazioni e funzioni sono in [file 08 §6](08-esercizi-ed-esami-svolti.md#6-insiemi-relazioni-funzioni): le sette equazioni fra insiemi con prove o controesempi, la relazione di divisibilità come ordine con minimo 1 e massimo 0, le proprietà che si conservano per unione, intersezione, composizione, inversa e complemento di relazioni transitive o simmetriche (verificate su tutte le relazioni di tre elementi), e le funzioni con la classificazione iniettiva/suriettiva/biettiva (compresa la biezione N² → N). All'esame le stesse competenze tornano nel [primo esercizio](08-esercizi-ed-esami-svolti.md#1-esercizio-1-quesiti-a-risposta-multipla) come proprietà di relazioni come "essere nati in giorni differenti" e "n e m hanno un divisore primo comune", dove l'unica risposta corretta è quasi sempre "simmetrica"; il file segnala anche i due casi dove la chiave ufficiale dell'8 settembre è discutibile (la relazione "coprima" non è irriflessiva perché 1 R 1).

## Cose da saper fare all'esame
- Disegnare Hasse di Div(n), P(A) con ⊆, di una relazione data; trovare minimo/massimo/minimali.
- Decidere rifl/sim/antisim/trans con giustificazione (o controesempio); riconoscere equivalenza/ordine; trovare classi e quoziente.
- Per ogni f dire inj/surj/bij **giustificando** (controesempio per iniettività; esibire preimmagine per suriettività; attenzione al codominio dichiarato).
- Calcolare f∘g, f[C], f⁻¹[D].
- Dimostrare identità insiemistiche (doppia inclusione o tavola) e trovare controesempi.

## Dubbi
- [DA VERIFICARE] Fonte "Insiemi": "(A∩B)^C = A^C ∩ B^C" è un refuso (corretto: A^C ∪ B^C).
- [DA VERIFICARE] **Errore nei tuoi Esercizi (es. 2, g)**: il controesempio "3x+4 = 1/2 → x=-7/6 non appartiene al dominio" è sbagliato perché -7/6 ∈ ℚ, quindi 1/2 è raggiunto. Un valore non raggiunto è ad es. 4+3√2 (irrazionale). Conclusione (g non suriettiva) corretta.
- [DA VERIFICARE] Esercizi es. 1: i diagrammi di Hasse sono immagini non leggibili dal testo; coperture qui ricalcolate, da confrontare col tuo disegno. Es. 3 vuoto nel documento.
- [DA VERIFICARE] Nel testo "Funzioni" il simbolo × compare come "·" (conversione).
