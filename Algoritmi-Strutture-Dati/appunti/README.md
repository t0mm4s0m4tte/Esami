# Algoritmi e Strutture Dati - Appunti d'esame (9 CFU, UniTO Informatica)

Scritto: 2027-01-27. Orale: da definire. Docenti slide: de'Liguoro, Horvath.

Le fonti sono su Drive, nella cartella "Algoritmi e Strutture Dati": il doc "Algoritmi e Strutture Dati - Appunti" (letto per intero, ~420k caratteri), le slide di teoria (PDF 18, 15, 17, 14, 13, 11, 19 consultate per integrare codice e dimostrazioni) e il programma "Argomenti dei Corsi - II Anno". I PDF "Teoria/Laboratorio - Appunti" sono l'export PDF dello stesso doc e non sono stati riletti. Le altre slide (00-10, 12, 16) e il Cormen non sono state rilette [DA VERIFICARE per esercizi non presenti nel doc]. Gli "Esercizi svolti" (11.2, 13.2) e la cartella `laboratorio-algoritmi-2025-2026` (ex1-ex4, .git) non sono stati aperti.

## Indice

Gli appunti seguono l'ordine del corso: prima i fondamenti (correttezza, complessità, programmazione dinamica), poi le strutture dati (array, liste, hash, alberi, heap), poi i grafi e gli algoritmi greedy, e in coda il laboratorio.

| File | Contenuto |
|---|---|
| [01-fondamenti-correttezza-iterazione.md](01-fondamenti-correttezza-iterazione.md) | Algoritmo, Euclide, Kadane, halting, specifica pre/post, induzione, invarianti, terminazione, invariant-first, Selection/Insertion, ricerca lineare/binaria |
| [02-complessita-asintotica-ricorsione.md](02-complessita-asintotica-ricorsione.md) | O/Ω/Θ/o, regole, PARTITION, divide et impera, Merge/Quick sort, Master theorem [INT], ricorsione (lineare/coda/albero), Hanoi |
| [03-confini-esponenziale-programmazione-dinamica.md](03-confini-esponenziale-programmazione-dinamica.md) | Lower bound (alberi di decisione, Ω(n log n)), Counting sort, Jack/Fast-Jack, fastExp, DP (Fibonacci, LCS) |
| [04-array-liste-pile-code.md](04-array-liste-pile-code.md) | Array statici/dinamici, analisi ammortizzata, liste (reverse, union, mergesort), pile e code |
| [05-tabelle-hash.md](05-tabelle-hash.md) | Indirizzamento diretto, funzioni hash, concatenamento e indirizzamento aperto, analisi |
| [06-alberi-e-bst.md](06-alberi-e-bst.md) | Alberi, DFS/BFS su alberi, BST (search, succ, insert, delete, inorder, preorder) |
| [07-alberi-rosso-neri.md](07-alberi-rosso-neri.md) | Proprietà R-N, altezza 2log2(n+1), rotazioni, insert/delete con tutti i casi |
| [08-code-di-priorita-heap.md](08-code-di-priorita-heap.md) | Heap, Insert/Extract/Heapify/BuildHeap, Heapsort |
| [09-grafi-visite-ordinamento-topologico.md](09-grafi-visite-ordinamento-topologico.md) | Grafi, BFS/DFS, DFS temporizzata, classificazione archi, ordinamento topologico, cfc (Kosaraju) |
| [10-greedy-mst-dijkstra.md](10-greedy-mst-dijkstra.md) | Teorema del taglio, Kruskal+Union-Find, Prim, cammini minimi, Dijkstra e correttezza |
| [11-laboratorio.md](11-laboratorio.md) | Git, TDD/Unity/Makefile, Doxygen/debug, HybridSort, hash table, heap ternario, grafi sparsi |

## Cose da saper fare all'esame (sintesi globale)

Il dettaglio per argomento è in fondo a ogni file. Le richieste d'esame qui sotto sono dedotte dal programma e dalla struttura del materiale, non da testi d'esame [DA VERIFICARE con le tracce d'esame passate].

### Scritto

Lo scritto ruota attorno a cinque famiglie di richieste. La prima è la **correttezza**: scrivere o trovare l'invariante di un ciclo e dimostrarne inizializzazione, mantenimento e terminazione, usare l'induzione sui ricorsivi e trovare una misura di terminazione (01). La seconda è la **complessità**: dimostrare f∈O/Ω/Θ(g) con c e n0 o con i limiti, analizzare pseudocodice annidato e risolvere T(n)=aT(n/b)+f con albero di ricorsione o sostituzione (Merge sort, fastExp, slowExp, Quick sort nel caso peggiore), controllando se possibile col Master theorem [INT] (02, 03). La terza sono lower bound e ottimalità: Ω(n log n) per l'ordinamento con gli alberi di decisione, Somma17, Gemelli (03).

La quarta sono gli **algoritmi da scrivere**: ricerca binaria, alla russa, fastExp iterativo, Kadane, Fast-Jack, DP (Fibonacci e LCS con tabella e frecce), liste ricorsive e iterative (reverse, delete, insert ordinato, union), heapify/insert/extract, BST insert/delete/succ, BFS/DFS, topological sort, Kruskal, Prim e Dijkstra (01, 03, 04, 06, 08, 09, 10). La quinta sono le **esecuzioni a mano**: tabelle hash (concatenamento, lineare, quadratico, doppio), BST da una sequenza, insert e delete R-N con tutti i casi, heap e heapsort, DFS temporizzata con d/f e classificazione degli archi, Dijkstra e MST con tabelle, LCS (05, 06, 07, 08, 09, 10, 03).

Le dimostrazioni ricorrenti da saper rifare sono: halting; Ω(n log n); costo ammortizzato del raddoppio < 3m; h ≤ 2log2(n+1) per gli R-N; correttezza del topological sort (v.f<u.f); teorema del taglio; correttezza di Dijkstra e perché i pesi negativi la rompono.

### Orale

All'orale contano soprattutto definizioni, confronti e "perché". Sul versante delle definizioni: algoritmo, correttezza parziale e totale, Θ come relazione di equivalenza e O come pre-ordine, limiti superiore e inferiore e gap, algoritmo ottimo, e la distinzione fra sottostruttura ottima con sottoproblemi ripetuti (programmazione dinamica) e greedy. Sul versante dei confronti: Merge vs Quick vs Heap (casi e spazio), array vs liste, concatenamento vs indirizzamento aperto, BST vs R-N, BFS vs DFS, Kruskal vs Prim, matrice vs liste di adiacenza.

Le domande "perché" attese sono queste:
- perché Counting sort non viola il limite n log n;
- perché si inserisce rosso;
- perché la rotazione preserva il BST;
- perché un back edge è un ciclo;
- perché Dijkstra non funziona con archi negativi;
- perché il successore ha al più un figlio.

Sono possibili anche domande sul lab (specifiche ex2-ex4, complessità richieste, TDD) [DA VERIFICARE se l'orale le include].

## Dubbi aperti da passare al tutor

Alcuni punti sono presenti nel doc solo come enunciati, senza dimostrazione completa: BuildHeap O(n), costo ammortizzato < 3m, bound medio del Quicksort, Stirling per log(n!). Il Master theorem non è presente nel materiale letto: la sezione in 02 è un'integrazione [INT], da verificare se serve per l'esame. Non sono trattati il post-order, la cancellazione in indirizzamento aperto (marcatura) e il numero massimo di rotazioni R-N. Union-Find con rango e compressione è solo descritto, e Kruskal e Prim compaiono solo come invarianti, senza pseudocodice completo nel doc. Gli esercizi svolti 11.2 / 13.2 / 05.3 / 02.3 menzionati nel programma non sono stati verificati.
