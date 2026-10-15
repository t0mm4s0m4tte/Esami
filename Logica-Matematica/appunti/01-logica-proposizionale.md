# 01 - Logica proposizionale
Fonte: Drive "Logica Matematica - Appunti" (Schede 1, Simboli logici pt.1-2, Sintassi, Semantica, Conseguenza logica) + "Formulario" + "Sintesi". Esercizi tipo marcati (ET) = svolti da me, non presenti nelle fonti.

## Mappa

Il capitolo parte dai connettivi e dalle loro tavole di verità, passa alle equivalenze notevoli e alla completezza funzionale, poi separa con cura la sintassi (le formule come stringhe: Prop(L), altezza, lunghezza, albero, parsing) dalla semantica (interpretazioni, valutazioni, modelli). Chiude con le nozioni di tautologia, soddisfacibilità e conseguenza logica, che sono il vero oggetto di studio e verranno riprese quasi identiche nel primo ordine (file 04).

- [Connettivi (V=1, F=0)](#connettivi-v1-f0)
- [Equivalenze da sapere a memoria](#equivalenze-da-sapere-a-memoria)
- [Sintassi](#sintassi)
- [Semantica](#semantica)
- [Conseguenza ed equivalenza](#conseguenza-ed-equivalenza)
- [Esempi svolti (dalle fonti)](#esempi-svolti-dalle-fonti)
- [Esercizi tipo (ET)](#esercizi-tipo-et)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Connettivi (V=1, F=0)
La logica proposizionale studia come la verità di una frase composta dipende soltanto dalla verità delle sue parti. Ogni connettivo è quindi una funzione sui valori {0,1}, descritta interamente da una tavola:

| A B | ¬A | A∧B | A∨B | A→B | A↔B | A⊕B | A⊼B | A⊽B |
|---|---|---|---|---|---|---|---|---|
| 1 1 | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 0 |
| 1 0 | 0 | 0 | 1 | 0 | 0 | 1 | 1 | 0 |
| 0 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| 0 0 | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 1 |

Con k lettere servono 2^k righe, e vale una regola di metodo che costa punti se violata: per decidere questioni che coinvolgono più formule (le premesse e la conclusione di una conseguenza, per esempio) si costruisce una sola tavola con tutte le colonne, mai tavole separate, perché solo così si confrontano i valori sulla stessa interpretazione.

Il connettivo che crea più confusione è l'implicazione. A→B è falsa soltanto quando A=1 e B=0; se l'antecedente è falso l'implicazione è vera per verità vacua, e non è richiesto alcun nesso causale tra A e B. Tra le altre corrispondenze con il linguaggio naturale conviene ricordare che "ma" e "però" si traducono con ∧, che ∨ è inclusivo (il latino *vel*) e che A⊕B (o esclusivo) equivale a ¬(A↔B). Quando i valori di verità vengono trattati come numeri, i connettivi diventano operazioni aritmetiche: v(¬P)=1-v(P); v(P∧Q)=min; v(P∨Q)=max; v(P→Q)=max{1-v(P),v(Q)}; v(P↔Q)=1-|v(P)-v(Q)|.

## Equivalenze da sapere a memoria
Due formule sono equivalenti quando hanno la stessa colonna nella tavola di verità; le equivalenze che seguono servono a riscrivere una formula in una forma più comoda, e si usano di continuo sia qui sia nella formalizzazione:
- **implicazione**, che si può sempre eliminare: A→B ≡ ¬A∨B ≡ ¬B→¬A (contronominale), da cui ¬(A→B) ≡ A∧¬B;
- **De Morgan**: ¬(A∧B) ≡ ¬A∨¬B e ¬(A∨B) ≡ ¬A∧¬B; dicono come la negazione scambia ∧ e ∨ e permettono di scrivere ciascuno dei due in termini dell'altro: A∧B ≡ ¬(¬A∨¬B) e A∨B ≡ ¬(¬A∧¬B);
- **distributività** in entrambe le direzioni: A∨(B∧C) ≡ (A∨B)∧(A∨C) e A∧(B∨C) ≡ (A∧B)∨(A∧C);
- **altre**: A↔B ≡ (A→B)∧(B→A), (A→B)∧(A→C) ≡ A→(B∧C), ¬¬A ≡ A.

Queste riscritture hanno una conseguenza profonda, la **completezza funzionale**: bastano pochi connettivi per esprimere tutti gli altri. Gli insiemi {¬,∨}, {¬,∧} e {¬,→} sono completi, e NAND e NOR lo sono addirittura da soli (¬P ≡ P⊼P; P∧Q ≡ (P⊼Q)⊼(P⊼Q)). Al contrario {¬,↔} e {¬,⊕} NON sono completi. Accanto alle equivalenze si usano alcune regole di inferenza:
- **modus ponens**: P→Q, P ⊧ Q;
- **legge della disgiunzione**: P∨Q, ¬P ⊧ Q;
- **ex falso**: P∧¬P ⊧ Q, vacuamente vera perché non esiste interpretazione che renda vere le premesse.

## Sintassi
Per ragionare sulle formule in modo rigoroso bisogna prima definirle come oggetti puramente sintattici, cioè stringhe costruite da regole. Si parte da un insieme L non vuoto di lettere proposizionali; l'alfabeto comprende le lettere, i connettivi ¬,∧,∨,→,↔ e le parentesi. L'insieme delle formule Prop(L) si costruisce per stadi: Prop0(L)={(A) | A∈L} contiene le formule atomiche, e Prop(n+1)=Prop(n) ∪ {(¬P)} ∪ {(P□Q)} aggiunge una negazione o un connettivo binario applicati a formule già costruite; Prop(L) è l'unione di tutti gli stadi. Questa costruzione a strati è ciò che rende possibili le dimostrazioni per induzione sulle formule.

L'altezza ht(P) è il minimo n tale che P∈Prop(n), ed è uguale all'altezza dell'albero sintattico meno uno. Un atomo ha ht=0, una negazione aggiunge 1, un connettivo binario vale max{ht}+1: è il massimo dei due rami, NON la somma. La lunghezza lh(P) è il numero di simboli della stringa (un atomo (A) ha lh=3). Poiché ogni passo di costruzione aggiunge sempre un multiplo di 3 simboli, lh è sempre multiplo di 3 (si prova per induzione su ht), il che fornisce un test rapido di non-buona-formazione: se la lunghezza non è divisibile per 3, la stringa non è una formula.

Per analizzare una stringa serve trovarne il connettivo principale, cioè l'ultimo applicato. Si guarda il secondo simbolo: se è ¬, il connettivo principale è la negazione; se è "(", si cerca la parentesi ")" che la chiude (con un contatore che sale di 1 a ogni "(" e scende di 1 a ogni ")", fino a tornare a 0) e il simbolo subito dopo è il connettivo principale. Nella scrittura abbreviata si omettono le parentesi seguendo le priorità ¬ > ∧ > ∨ > → > ↔, con associazione a destra (A→B→C ≡ A→(B→C)); le parentesi che cambiano il significato restano però ineliminabili: ¬A∨B è diverso da ¬(A∨B).

## Semantica
La semantica dà significato alle stringhe. Un'interpretazione è una funzione i: L→{0,1} che assegna un valore a ogni lettera; per composizionalità essa si estende in modo unico a una valutazione i* su tutte le formule, calcolando dalle foglie verso la radice dell'albero. Vale il principio di irrilevanza: i*(P) dipende solo dalle lettere che occorrono in P, e quindi per valutare una formula basta fissare il valore delle sole lettere presenti.

Un'interpretazione i è un **modello** di P (i ⊧ P) quando i*(P)=1. Per un insieme Γ di formule, i ⊧ Γ significa che i soddisfa ogni P∈Γ, il che per Γ finito equivale a soddisfare la congiunzione. È importante notare che soddisfacibilità di ogni singolo elemento non basta a quella dell'insieme: Γ={A,¬A} è insoddisfacibile benché ogni suo elemento sia soddisfacibile. In base alla colonna finale della tavola una formula è:
- una **tautologia** (⊧P) se è tutta di 1;
- **soddisfacibile** se contiene almeno un 1;
- una **contraddizione** se è tutta di 0.

Ogni tautologia è soddisfacibile, ma attenzione a non confondere "non contraddizione" con "tautologia".

## Conseguenza ed equivalenza
La conseguenza logica formalizza il ragionamento valido. Γ ⊧ Q vuol dire che ogni interpretazione che rende vere tutte le premesse rende vera anche Q; di conseguenza essa è falsa se e solo se esiste un **controesempio**, cioè un'interpretazione con premesse a 1 e conclusione a 0. È questo il modo più rapido di rispondere negativamente: basta esibirne uno.

Conseguenza, validità e soddisfacibilità sono tre facce della stessa nozione, e i ponti tra di esse sono lo strumento standard delle dimostrazioni:
- P1..Pn ⊧ Q equivale a ⊧ (P1∧…∧Pn)→Q;
- una formula P è valida se e solo se ¬P è insoddisfacibile, ed è soddisfacibile se e solo se ¬P non è valida;
- soprattutto, Γ ⊧ Q se e solo se Γ∪{¬Q} è insoddisfacibile: è il metodo per assurdo, che consiste nell'ipotizzare le premesse vere e la conclusione falsa e cercare una contraddizione;
- P ≡ Q equivale a ⊧ P↔Q, a "P⊧Q e Q⊧P" e all'uguaglianza delle colonne.

Va tenuta distinta la relazione ≡, che sta tra formule, dal connettivo ↔, che è parte di una formula.

## Esempi svolti (dalle fonti)
1. ((C→A)∧¬B)→(A∨B): 8 righe, vera ovunque tranne A=B=C=0 (antecedente 1, conseguente 0). Soddisfacibile, non tautologia.
2. A→B, B→C ⊧ ¬A∨C: nelle righe dove le premesse sono vere (righe 1,5,7,8) la conclusione è sempre 1 -> vale.
3. A∨(B→C) ⊭ A∧B: controesempio A=B=C=0 (premessa 1, conclusione 0).
4. "Se io ho ragione tu hai torto, e viceversa: quindi almeno uno ha ragione": ((A→¬B)∧(B→¬A))→(A∨B) non è tautologia; controesempio A=B=0.

## Esercizi tipo (ET)
- **ET1** A→B, ¬B ⊧ ¬A (modus tollens). Per assurdo esiste i con A=1 e premesse vere; ¬B vera => B=0; allora A→B = 1→0 = 0, contraddice la 1ª premessa. Vale.
- **ET2** A→B, B→C ⊧ A→C: se per assurdo A=1,C=0 allora da A→B si ha B=1, ma B→C=0: contraddice le premesse. Vale (sillogismo ipotetico).
- **ET3** ¬(A∧B) ≡ ¬A∨¬B: tabella 4 righe, colonne (0,1,1,1) coincidono.
- **ET4** (A→B) ≡ (¬B→¬A) e (A→B) NON ≡ (B→A): controesempio A=0,B=1 (1 vs 0).
- **ET5** {A∨B, ¬A∨C} ⊧ B∨C (risoluzione): se B=0 e C=0 allora A=1 (1ª) e ¬A=1 cioè A=0 (2ª): impossibile. Vale.

## Cose da saper fare all'esame
- Costruire la tavola completa (2^k righe, colonne intermedie) e classificare: tautologia / soddisfacibile / contraddizione.
- Decidere P1..Pn ⊧ Q con **una tavola unica** o per assurdo (cerca controesempio); decidere P ≡ Q.
- Calcolare ht, lh, albero sintattico, connettivo principale; ripristinare le parentesi dalle convenzioni.
- Calcolare i*(P) per una i data (singola riga).
- Valutare opzioni a risposta multipla ciascuna indipendentemente V/F (una opzione "AND" è falsa se una parte è falsa).

## Dubbi
- [DA VERIFICARE] Formulario: "Insieme di Proposizioni Soddisfacibile: se esiste un'**unica** interpretazione..." è un errore: serve **almeno una** interpretazione che renda vere tutte.
- [DA VERIFICARE] Nelle fonti il simbolo ¬ compare spesso come "≠" (errore di conversione del documento).
- [DA VERIFICARE] Tabella "i1" ripetuta due volte nelle interpretazioni di L={A,B} (la seconda è i2).
