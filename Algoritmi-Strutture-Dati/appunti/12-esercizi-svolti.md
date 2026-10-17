# 12 - Esercizi svolti dell'eserciziario (tipologie d'esame)

Fonte: eserciziario ufficiale "Esercizi_ASD.pdf" (con soluzioni, 41 pagine) dal Moodle del corso, edizione 2026/27, identico a quello 2025/26. Non sono tracce d'esame datate: sono gli esercizi del docente, che nelle prove scritte tornano spesso quasi uguali. Le soluzioni sono riscritte in prosa e riassunte; per il testo completo di ogni dimostrazione fa fede il PDF. Il PDF è stato letto per intero, ma il testo estratto ha perso alcuni simboli matematici e tutte le figure (alberi, grafi, albero delle decisioni a 4 elementi): dove un risultato dipende da una figura o da un simbolo perso è segnato [DA VERIFICARE sul PDF]. I valori numerici di Dijkstra e della BFS sono stati ricalcolati a mano per controllo.

## Mappa

- [1. Correttezza e invarianti](#1-correttezza-e-invarianti)
- [2. Crescita asintotica](#2-crescita-asintotica)
- [3. Ordinamento quadratico](#3-ordinamento-quadratico)
- [4. Relazioni di ricorrenza](#4-relazioni-di-ricorrenza)
- [5. Analisi di algoritmi](#5-analisi-di-algoritmi)
- [6. Liste](#6-liste)
- [7. Tabelle hash](#7-tabelle-hash)
- [8. Alberi](#8-alberi)
- [9. Alberi e ordinamento](#9-alberi-e-ordinamento)
- [10. Grafi](#10-grafi)
- [Trucchi ricorrenti](#trucchi-ricorrenti)
- [Cosa resta da integrare](#cosa-resta-da-integrare)

## 1. Correttezza e invarianti

Teoria: [01 Fondamenti e correttezza](01-fondamenti-correttezza-iterazione.md#correttezza-e-terminazione), [03 Esponenziale veloce](03-confini-esponenziale-programmazione-dinamica.md).

Il primo esercizio è il quadrato `Square(z)`: si parte da x=0, y=0 e a ogni giro si fa y ← y+2x+1, x ← x+1. L'invariante è `y = x² ∧ x ≤ z`. È vero all'inizio (0=0² e 0≤z per la precondizione), si conserva (se x<z allora x+1≤z, e y+2x+1 = x²+2x+1 = (x+1)²) e all'uscita, con x≥z e x≤z, vale x=z e quindi y=z².

Per l'esponenziale veloce le equazioni sono x^(2k) = x^k·x^k e x^(2k+1) = x^k·x^k·x. La versione ricorsiva le implementa direttamente. Quella iterativa usa l'invariante `x^n = y^k · z`, con y=x, k=n, z=1 all'inizio: se k è dispari si moltiplica z per y, poi si fa y←y·y e k←⌊k/2⌋, e a k=0 si ritorna z. Le moltiplicazioni sono proporzionali a log₂ n, contro le n−1 della versione ingenua.

Per la ricerca lineare ricorsiva si distinguono tre casi: intervallo vuoto (si ritorna −1), A[i]=a (si ritorna i), altrimenti si cerca in A[i+1..j]. Quella iterativa ha invariante "per ogni h in i..k−1, A[h]≠a": all'uscita o A[k]=a oppure k=j+1 e quindi a non c'è. Per la ricerca dicotomica la versione ricorsiva si dimostra per induzione completa sulla lunghezza dell'intervallo: se a<A[k], essendo l'array ordinato, ogni elemento di A[k..j] è maggiore di a, quindi a può stare solo in i..k−1 (e simmetricamente a destra). L'iterativa tiene l'invariante "se a è in A[i..j] allora è in A[p..q]"; quando p>q l'intervallo è vuoto e si ritorna −1.

Il Bubble-Sort (Cormen 2-2) si dimostra con due invarianti. Per il ciclo interno (j da n verso i+1) l'invariante è `A[j] = min A[j..n]`: se A[j]<A[j−1] lo scambio porta il minore in A[j−1], altrimenti A[j−1] era già il minimo. Per il ciclo esterno l'invariante è "A[1..i−1] è ordinato e tutti gli elementi di A[i..n] sono maggiori o uguali a quelli di A[1..i−1]": a ciclo interno finito (j=i), A[i] è il minimo di A[i..n] e quindi estende la parte ordinata. All'uscita (i=n) A[1..n−1] è ordinato e A[n] li maggiora tutti.

La regola di Horner calcola P(x) con l'invariante `y = Σ_{k=0}^{n−(i+1)} a_{k+i+1} x^k`. A i=n la somma è vuota (y=0), a ogni giro y ← a_i + x·y mantiene l'invariante (perché x·x^(n−(i+1)) = x^(n−i)), e a i=−1 si ottiene Σ a_k x^k. Horner fa n moltiplicazioni ed è ottimo, perché ne serve almeno una per ciascun coefficiente da a₁ ad aₙ. L'algoritmo ingenuo che ricalcola ogni potenza ne fa n(n+1)/2 (Θ(n²)); la via di mezzo che accumula la potenza in z (z ← z·x) ne fa 2n.

## 2. Crescita asintotica

Teoria: [02 Notazioni e regole](02-complessita-asintotica-ricorsione.md#notazioni-definizioni).

Gli esercizi chiedono di dimostrare appartenenze e di trovare controesempi. Per 3n−2 ∈ O(n) basta c=3 (3n−2 < 3n). Per log n ∈ o(n) si usa de l'Hôpital: il limite di log n / n è 0. Una coppia con f ∈ Θ(g) e f < g per ogni n è f(n)=n, g(n)=2n, perché Θ ammette costanti moltiplicative.

C'è un esercizio in cui si deve mostrare falsa un'implicazione sulle O: la soluzione prende f₁=g₁=g₂=n e f₂=n², ma il testo estratto ha perso i simboli che distinguono le ipotesi, quindi l'enunciato esatto non è ricostruibile [DA VERIFICARE sul PDF]. Per 2^(n+1), 2^(2n), 4ⁿ rispetto a O(2ⁿ): 2^(n+1)=2·2ⁿ è in O(2ⁿ) con c=2, mentre 2^(2n)=2ⁿ·2ⁿ e 4ⁿ non lo sono, perché nessuna costante c limita 2ⁿ. Per confrontare O(n log n) con 2^(O(log n)) (le funzioni limitate da n^c): n² sta nel secondo e non nel primo, e n log n = o(n²), quindi O(n log n) ⊂ 2^(O(log n)) con inclusione stretta. Che Σ iʰ sia O(n^(h+1)) si dimostra per induzione su h maggiorando Σ iʰ ≤ n·Σ i^(h−1). Infine, se lim f/g = λ > 0 allora f ∈ Θ(g): si prende ε=λ/4 e si ottengono sia la maggiorazione con (λ+2ε)g sia la minorazione con (λ−2ε)g.

## 3. Ordinamento quadratico

Teoria: [01 Ordinamenti elementari: costi](01-fondamenti-correttezza-iterazione.md#ordinamenti-elementari-costi).

L'esercizio chiede casi migliore e peggiore di Insertion-Sort e Select-Sort e le tabelle di confronti C e spostamenti S. Per Insertion-Sort il caso migliore è l'array già ordinato (il while fallisce subito), il peggiore è l'array decrescente. Per Select-Sort il numero di confronti non dipende dai dati, cambia solo quante volte si esegue l'assegnamento k←j, che non conta né come confronto né come spostamento. Le formule da ricordare:

| | Insertion | Select |
|---|---|---|
| C min | n−1 | n(n−1)/2 |
| C max | n(n+1)/2 − 1 (la tabella finale del PDF riporta n(n+1)/2; dalla somma Σ(j+1) per j=1..n−1 si ottiene −1) [DA VERIFICARE] | n(n−1)/2 |
| S min | 2(n−1) | 3(n−1) |
| S max | (n−1)(n+4)/2 | 3(n−1) |

Il confronto finale: Select-Sort è migliore negli spostamenti nel caso peggiore, Insertion-Sort lo è nettamente nei confronti nel caso migliore; i confronti nel caso peggiore e gli spostamenti nel caso migliore sono quasi uguali.

## 4. Relazioni di ricorrenza

Teoria: [02 Divide et impera e Master theorem](02-complessita-asintotica-ricorsione.md#il-master-theorem-int).

Si risolvono per srotolamento, senza Master theorem, finché l'esercizio non lo chiede.
- T(n)=T(n/2)+n con T(1)=1: dopo k passi si ha T(n/2^k) + n·Σ(1/2)^i; per k=log n la somma geometrica dà 2n−2, quindi T(n)=Θ(n).
- T(n)=2T(n−1)+n con T(0)=1: T(n) ≈ 2ⁿ + n(2ⁿ−1), quindi O(n·2ⁿ). Per scrivere un algoritmo con tempo Θ(T(n)) basta chiamare T(n−1) due volte e fare un ciclo di n passi, perché il tempo dell'algoritmo ha esattamente la stessa ricorrenza.
- T(n)=T(√n)+1 si risolve con il **cambio di variabile** n=2^m: S(m)=T(2^m) soddisfa S(m)=S(m/2)+1, quindi S(m)=O(log m) e T(n)=O(log log n).
- T(n)=2T(⌊n/2⌋+17)+n si risolve col cambio f(n)=2n+34, per cui f(n)/2+17=f(n/2): si ottiene S(m)=2S(m/2)+m e quindi O(n log n).
- T(n)=2T(⌈n/2⌉)+b con T(1)=a dà n·a+(n−1)·b=Θ(n). È la ricorrenza di `Max(A[i..j])`, che divide l'array a metà e restituisce il massimo dei due massimi (con l'intervallo vuoto che restituisce −∞).

## 5. Analisi di algoritmi

Teoria: [02 Regole per pseudocodice](02-complessita-asintotica-ricorsione.md#regole-per-pseudocodice), [03 Jack e Fast-Jack](03-confini-esponenziale-programmazione-dinamica.md#jack--fast-jack-lunghezza-massima-di-una-sequenza-consecutiva-di-dispari-in-v0n-1).

Sono gli esercizi più "da scritto": si legge il codice, si dice cosa calcola, si trova la ricorrenza e si propone una versione migliore.
- `Pow(x,n)` (esponenziale veloce) ha T(n)=T(n/2)+1=Θ(log n). `Gai(n,r)` chiama Pow(x,r) per n+1 volte, quindi costa Θ(n log r).
- `Jack(V)` calcola il massimo numero di elementi dispari consecutivi; è quadratica nel caso peggiore (tutti dispari: Σi = Θ(n²)). Si fa lineare con un contatore p dei dispari consecutivi, azzerato a ogni pari, e un massimo m.
- `P(A,l,r)` stampa tutte le permutazioni (scambia A[l] con A[i], ricorre su l+1, ripristina). La ricorrenza è a due variabili: T(n,1)=n e T(n,k)=k·T(n,k−1) per k>1, quindi T(n,n)=n·n! ∈ O(n·n!). Il Master theorem non si applica perché il coefficiente k non è costante.
- `Bump(n)` ha T(n)=8T(n/2)+n² e vale Θ(n³), perché 8^(log n)=n³ domina.
- `Bart` somma log i per i=2..n, cioè log(n!), che è Θ(n log n) (lo si ricava dal limite log(n!)/(n log n)=1). `Homer` ha T=2T(n/2)+cn quindi Θ(n log n); `Marge` ha T=2T(n/2)+cn² quindi Θ(n²). Col Master theorem si confronta α = log a / log b con l'esponente di f: se coincidono si ottiene n^α log n, se f cresce di più comanda f, se cresce di meno comanda n^α.
- `Moo(A)` calcola la massima differenza in valore assoluto fra due elementi ed è quadratica. Poiché quel valore è |max−min|, `Goo` lo calcola in Θ(n) con una sola scansione.
- `Tim` e `Kim` calcolano entrambi la somma di A[i..j] e hanno entrambi complessità Θ(n): Tim ha T(n)=2T(n/2)+b, Kim ha S(n)=S(n/2)+b·n, che si sommano rispettivamente a n·a+(n−1)b e a a+b(2n−2).
- `Sam(A)` cerca la **mediana** (il valore con tanti minoranti quanti maggioranti) provando ogni A[i]. Con n dispari ed elementi distinti la mediana esiste, quindi termina; nel caso peggiore costa Θ(n²). Si può fare in O(n log n) ordinando e prendendo l'elemento centrale.

## 6. Liste

Teoria: [04 Liste semplici](04-array-liste-pile-code.md#liste-semplici-nodo-info-next).

Le liste sono record con campi `head` e `next`, con le funzioni Head, Tail e Cons.
- `Multiples(L)` (quanti elementi hanno almeno un doppione): la versione ovvia con Member è O(n²); una seconda con Count è ancora O(n²) ma più semplice; la versione O(n log n) ordina una copia e conta i segmenti di elementi uguali di lunghezza maggiore di 1.
- `Rank(L)` sostituisce ogni elemento con la somma di sé e dei successivi, ricorsivamente: dopo `Rank(Tail(L))` la testa della coda contiene già la somma di tutti i successivi. È O(n), quindi ottimo (il lower bound banale è Ω(n)).
- `Reverse(L)` non distruttivo: si scorre L inserendo ogni elemento in testa a una lista R (come una pila), in O(n).
- `Palindrome(L)`: si calcola R=Reverse(L) e si confronta membro a membro con `Equal(L,R)`, tutto in O(n).
- `OddEven(L)` mette i dispari prima dei pari in modo stabile e distruttivo. Una funzione ausiliare ricorsiva restituisce la tripla (Odd, Last, Even), dove Last è l'ultimo elemento della lista dei dispari, che serve per attaccarci Even; bisogna gestire il caso senza dispari (Odd=Last=nil). È O(n), quindi ottimo.
- Le operazioni sugli **insiemi come liste ordinate senza ripetizioni** (Intersection, Union, Difference, SymDifference) hanno tutte lo stesso impianto, simile al merge, ricorsivo e lineare nella somma delle lunghezze. Si confrontano Head(A) e Head(B): se uguali, l'intersezione e l'unione ne tengono uno solo (la differenza e la differenza simmetrica li scartano); se Head(A)<Head(B) si tratta Head(A) e si scorre A, e viceversa.
- `Foo(L)` costruisce la lista dei suffissi sommati (l'i-esimo elemento è la somma di L dal posto i in poi) con due while annidati, Θ(n²). `Goo` la fa in Θ(n) ricorsivamente: N[i]=L[i]+N[i+1].

## 7. Tabelle hash

Teoria: [05 Indirizzamento aperto](05-tabelle-hash.md#indirizzamento-aperto).

Con indirizzamento aperto lineare, h(k)=k mod 10 e chiavi 88, 12, 2, 22, 33 si ottiene T = (nil, nil, 12, 2, 22, 33, nil, nil, 88, nil). Il 2 e il 22 finiscono nelle posizioni 3 e 4 perché la 2 è occupata da 12, e il 33 va in 5 perché la 3 è già occupata.

Con ispezione quadratica h(k,i) = (k mod 11 + 2i + i²) mod 11 e chiavi 18, 32, 7, 15 in una tabella da 11: 18→7, 32→10, 7→7 (occupata), poi 10 (occupata), poi 4; 15→4 (occupata), poi 7 (occupata), poi 1. Risultato: T[1]=15, T[4]=7, T[7]=18, T[10]=32. Quando la funzione è h(k,i)=(k mod 12 + 6i) mod 12, l'ispezione visita solo due celle (k mod 12 e quella a distanza 6): le chiavi 0, 6, 12 riempiono le celle 0 e 6, e l'inserimento di 12 non è più possibile pur essendo la tabella quasi vuota. Lezione: una sequenza di ispezione deve essere una permutazione di tutte le celle, altrimenti l'inserimento può fallire anche con la tabella non piena.

## 8. Alberi

Teoria: [06 Alberi e BST](06-alberi-e-bst.md), [07 Alberi rosso-neri](07-alberi-rosso-neri.md#altezza).

Per gli alberi k-ari si usa la rappresentazione `child` / `sibling`.
- `FatherChildSum(T)` scorre i figli sommando le chiavi e ricorrendo su ciascuno; ritorna vero se la chiave di T è uguale alla somma dei figli e tutti i sottoalberi soddisfano la proprietà. È O(n).
- `SommaRamo(T)` aggiunge a ogni foglia un figlio con la somma delle chiavi dalla radice alla foglia, usando una funzione ausiliare `SommaCammino(S,k)` che accumula k scendendo.
- `NumNodiProfondi(T,h)` conta i nodi a livello ≥ h senza funzioni ausiliarie né campi in più: se h=0 conta tutti i nodi del sottoalbero, altrimenti somma i risultati dei figli con h−1 (più 1 per la radice).
- **Albero completo**: il livello k ha 2^k nodi per ogni k ≤ altezza. Il metodo più semplice confronta la cardinalità con 2^(h+1)−1 (due visite). La versione con una sola BFS tiene una coda di coppie (nodo, livello) e conta i nodi di ogni livello, controllando che siano 2^livello. La definizione ricorsiva equivalente (un solo nodo, oppure due sottoalberi completi della stessa altezza) si dimostra equivalente per induzione sull'altezza. Applicata alla lettera sarebbe O(n²) perché ricalcola le altezze a ogni livello; `DFS-Complete` restituisce la coppia (booleano, altezza) in un'unica visita, quindi è O(n).
- `PrintInt(T,a,b)` stampa in ordine crescente le chiavi di un BST comprese in [a,b] con una visita inordine che entra a sinistra solo se a < T.key e a destra solo se b > T.key. È una visita, quindi O(n).
- `AntenatoComune(T,a,b)` (BST): si scende finché si trova un nodo con a ≤ chiave ≤ b, andando a sinistra se b<chiave e a destra se a>chiave. Costa come una ricerca: il lower bound è Ω(n) per alberi degeneri e O(log n) in un albero rosso-nero.
- `IsBinSearch(T)` decide in O(n) se un albero binario è di ricerca: ogni chiamata restituisce la tripla (è di ricerca, minimo, massimo) e al nodo si verifica che massimo(sinistro) < chiave < minimo(destro).

## 9. Alberi e ordinamento

Teoria: [08 Heap](08-code-di-priorita-heap.md#operazioni), [03 Confini](03-confini-esponenziale-programmazione-dinamica.md#confini).

Uno **heap minimo** è un albero binario semi-completo a sinistra in cui la chiave di ogni padre è ≤ quelle dei figli; in forma di array i figli di H[i] sono H[2i] e H[2i+1]. Estrazione del minimo da (1, 2, 3, 10, 8, 9, 7, 14, 15, 16, 13): si prende la radice 1 e si mette al suo posto l'ultimo elemento (13), ottenendo (13, 2, 3, 10, 8, 9, 7, 14, 15, 16). Poi 13 si scambia col figlio minore, 2: (2, 13, 3, 10, 8, …); poi col figlio minore di 13 in posizione 2, cioè 8: (2, 8, 3, 10, 13, 9, 7, 14, 15, 16). Qui si ferma, perché l'unico figlio di 13 (il 16) è maggiore.

Dimostrazione importante: costruire un BST con confronti richiede Ω(n log n). Per assurdo, se esistesse `BuildTree` in o(n log n), basterebbe costruire il BST e visitarlo in ordine (O(n)) copiando le chiavi in un array per ottenere un ordinamento per confronti in o(n log n), il che contraddice il lower bound. L'ultimo esercizio chiede di disegnare l'albero di decisione per 4 elementi assumendo a>b (metà albero): è una figura e non è stata riportata [DA VERIFICARE sul PDF].

## 10. Grafi

Teoria: [09 Grafi e visite](09-grafi-visite-ordinamento-topologico.md#bfs-e-dfs), [10 MST e Dijkstra](10-greedy-mst-dijkstra.md#cammini-minimi-sorgente-singola).

- **BFS** sul grafo con liste a: d,e / b: a,c,e,f / c: a,e / d: b,c,e / e: a,d / f: d,e, partendo da a (ricalcolata a mano). Si inseriscono d ed e (coda: d, e); da d si scoprono b e c (coda: e, b, c); da e non c'è nulla di nuovo; da b si scopre f (coda: c, f). L'albero ha a come radice con figli d ed e, d ha figli b e c, b ha figlio f. In un grafo completo con n+1 vertici la BFS da r produce un albero in cui tutti gli altri n vertici sono figli di r.
- **Dijkstra** sul primo grafo (A: B(3), C(6), D(7) / B: C(2), E(1) / C: D(1) / E: D(4)), ricalcolato a mano: l'ordine di estrazione è A(0), B(3), E(4), C(5), D(6). C scende da 6 a 5 passando per B, D scende da 7 a 6 passando per C (non conviene passare per E, che darebbe 8). Per il secondo grafo (A: B(3), C(2), D(7); B: E(4); C: B(5), D(4), E(6), F(6), G(9); D: E(7), G(3); E: F(4), G(4); F: G(2)) i cammini minimi da A sono: C=2, B=3, D=6 (via C), E=7 (via B), F=8 (via C), G=9 (via C e D). La coda di priorità contiene i nodi di cui non si conosce ancora il cammino minimo, con priorità uguale alla stima corrente; estrarre il minimo significa aver trovato il suo cammino minimo, e a quel punto si rilassano gli archi uscenti verso i nodi ancora in coda.
- **Grafo bipartito**: una BFS modificata che colora a due colori i vertici scoperti (v prende il colore opposto di u) e segnala non bipartito se trova un arco fra due vertici dello stesso colore; va ripetuta per ogni componente connessa. Costa O(|V|+|E|).
- **Aciclicità di un grafo orientato**: G è ciclico se e solo se una DFS trova un arco all'indietro (verso un vertice grigio, cioè ancora sulla pila). Basta far restituire false alla DFS alla prima scoperta di un arco all'indietro: O(|V|+|E|).
- **Esistenza dell'MST**: in un grafo connesso pesato gli alberi di copertura sono un insieme finito e non vuoto (una visita ne produce uno), quindi i loro pesi hanno un minimo.

## Trucchi ricorrenti

Un algoritmo "ottimo" si giustifica trovando un lower bound banale (di solito Ω(n), perché bisogna leggere i dati) e mostrando un algoritmo che lo raggiunge. Per le liste e gli alberi la strategia ricorrente è far restituire alla funzione ricorsiva più valori (tripla o coppia: per esempio booleano più altezza, o booleano più minimo e massimo), così da fare una sola visita invece di ricalcolare. Per la correttezza si parte sempre dall'invariante che esprime "ciò che ho già fatto" e si controllano inizio, mantenimento e uscita. Quando l'esercizio dice di non usare il Master theorem si srotola la ricorrenza e si usa la somma geometrica.

## Cosa resta da integrare

Nella cartella `_moodle-raw/Algoritmi-Strutture-Dati` ci sono altri file non ancora letti: l'eserciziario dell'edizione A (con e senza soluzione, `ASD-A`), gli esercizi aggiuntivi su liste/hash e alberi (`Esercizi_ASD_ListeHash.pdf`, `Es_Alberi_sol.pdf`), le soluzioni di correttezza, ordinamento quadratico, ricorrenze e analisi (`Correttezza_svolgimenti.pdf`, `OrdQuadratico_svolgimenti.pdf`, `RelRic-sol.pdf`, `Analisi-algo-sol.pdf`), i file Dafny (`Euclide.dfy`, `Kadane.dfy`, `Divisione.dfy`) e le strutture dati C del laboratorio CodeRunner. I quiz del Moodle (58 nei corsi scaricati, dove stanno le vere simulazioni) non sono stati scaricati.
